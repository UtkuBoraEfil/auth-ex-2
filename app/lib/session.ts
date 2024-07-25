import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import type { SessionPayload } from "@/app/lib/definitions";
import prisma from "./prisma";
import { redirect } from "next/navigation";

const secretKey = process.env.SECRET;
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1hr")
    .sign(key);
}

export async function decrypt(session: string | undefined = "") {
  try {
    // console.log("[SESSION.TS_DECRYPT_TOKEN]", session);

    if (!session) return null;
    const { payload } = await jwtVerify(session, key, {
      algorithms: ["HS256"],
    });
    console.log("[SESSION.TS_PAYLOAD]", payload);
    return payload;
  } catch (error) {
    console.log("[SESSION.TS_DECRYPT]", error);
    // console.error("[SESSION.TS_DECRYPT_TOKEN_ON_ERROR]", session); // Log the token on error

    return null;
  }
}

export async function createSession(id: number) {
  try {
    const expiresAt = new Date(Date.now() + 30 * 1000); //7 * 24 * 60 * 60 * 1000)

    // 1. Create a session in the database
    await prisma.sessions.create({
      data: {
        userId: id,
        expiresAt,
      },
    });
    // 2. Encrypt the session ID
    const session = await encrypt({ userId: id, expiresAt });

    // 3. Store the session in cookies for optimistic auth checks
    cookies().set("session", session, {
      httpOnly: true,
      // secure: true,
      expires: expiresAt,
      sameSite: "lax",
      path: "/dashboard",
    });
  } catch (error) {
    console.log("[SESSION.TS_CREATE_SESSION]", error);
  }
}

export async function verifySession() {
  try {
    const cookie = cookies().get("session")?.value;
    console.log("[SESSION.TS_COOKIE]", cookie);
    const session = await decrypt(cookie);

    if (!session?.userId) {
      redirect("/login");
    }

    return { isAuth: true, userId: Number(session.userId) };
  } catch (error) {
    console.log("[SESSION.TS_VERIFY_SESSION]", error);
  }
}
