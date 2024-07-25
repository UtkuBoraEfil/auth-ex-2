import { updatePost } from "@/actions/comment";
import UpdateComp from "@/components/updateComp";
import prisma from "@/app/lib/prisma";
import Link from "next/link";

export default async function PostPage({ params }: { params: any }) {
  const posts = await prisma.post.findUnique({
    where: {
      slug: params.slug,
    },
  });

  // const handleSubmit = async (event) => {
  //   event.preventDefault(); // Prevent the default form submission behavior
  //   const formData = new FormData(event.target);
  //   await updatePost(formData, posts.id); // Call your updatePost function with form data and post ID
  // };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="border border-purple-500 p-9 rounded-md">
        <UpdateComp id={posts!.id} />
      </div>
      <Link href={"/dashboard"}> geri don </Link>
    </div>
  );
}
