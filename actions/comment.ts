"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import prisma from "@/app/lib/prisma";
import exp from "constants";
import { getUser } from "@/app/auth/user";

export async function pushComment(data: FormData) {
  const title = data.get("title") as string;
  const content = data.get("comment") as string;

  if (title === "" || content === "") return;

  const user = await getUser();

  if (!user) {
    return;
  }
  await prisma.post.create({
    data: {
      title,
      content,
      slug: title.replace(/\s+/g, "-").toLowerCase(),
      authorId: user[0].id,
    },
  });

  revalidatePath("/");
}

export async function deletePost(id: number) {
  await prisma.post.delete({ where: { id } });
  revalidatePath("/"); 
}

export async function updatePost(postId: number, data: FormData) {
  console.log("postId ", postId);
  const id = Number(postId);
  const title = data.get("title") as string;
  const content = data.get("comment") as string;

  const newData = await prisma.post.update({
    where: { id: Number(id) },
    data: {
      title,
      content,
      slug: title.replace(/\s+/g, "-").toLowerCase(),
    },
  });
  console.log(newData);
  redirect(`/dashboard/posts/${newData.slug}`);
  //   revalidatePath("/");
}
