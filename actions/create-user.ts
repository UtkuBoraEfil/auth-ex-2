"use server";

import prisma from "@/app/lib/prisma";
import { saltAndHashPassword } from "@/utils/password";

export async function createUser({ email, password }) {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (user) {
    throw new Error("User already exists");
  }

  const hash = await saltAndHashPassword(password);
  const newUser = await prisma.user.create({
    data: {
      email,
      name: email,
      password: hash,
    },
  });

  return newUser;
}
