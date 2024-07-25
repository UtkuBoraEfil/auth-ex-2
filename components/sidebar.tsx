import { Inter } from "next/font/google";
import prisma from "@/app/lib/prisma";
import Link from "next/link";
import SideItems from "./sideItems";
import { useState } from "react";
import { getUser } from "@/app/auth/user";

export default async function Sidebar() {
  const user = await getUser();
  let posts: any[] = [];
  if(user){
  posts = await prisma.post.findMany({
    where: {
      authorId: user[0].id
    },
    orderBy: {
      createdAt: "desc"
    }
  });
  }


    return(
        <div  className="min-w-56 flex flex-col py-16 px-4 bg-slate-900 gap-6" >
          {posts.map((post?)=>(
            <SideItems key={post?.id} post={post!}/>
          ))}
        </div>
    );
}