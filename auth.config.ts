import type { NextAuthConfig, User } from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";

import bcrypt from "bcryptjs";

import { findUser } from "./actions/find-user";

export default {
  providers: [
    GitHub,
    Google,
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // const user = await findUser({ email: credentials.email });
        // if (
        //   user &&
        //   (await bcrypt.compare(credentials.password, user.password))
        // ) {
        //   return user;
        // } else {
        //   return null;
        // }
        const user: User = {
          id: "1",
          email: credentials.email as string,
          name: "test",
        };
        return user;
      },
    }),
  ],
} satisfies NextAuthConfig;
