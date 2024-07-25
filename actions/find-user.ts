"use server";

import prisma from "@/app/lib/prisma";

export async function findUser({ email }) {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  return user;
}
