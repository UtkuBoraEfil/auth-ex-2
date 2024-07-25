import { updatePost } from "@/actions/comment";
import prisma from "@/app/lib/prisma";

export default async function UpdateComp({ id }: { id: number }) {
  const posts = await prisma.post.findUnique({
    where: {
      id,
    },
  });

  const updatePostWithId = updatePost.bind(null, posts?.id!);

  return (
    <form
      className=" p-5  mt-4 flex flex-col gap-2 text-lg font-semibold antialiased text-white"
      action={updatePostWithId}
    >
      <input
        defaultValue={posts?.title ?? ""}
        type="text"
        name="title"
        placeholder="Title"
        className="border border-purple-500  rounded-xl p-2 bg-transparent indent-3 outline-none "
        required
      />
      <textarea
        defaultValue={posts?.content ?? ""}
        name="comment"
        placeholder="Comment"
        className="border border-purple-500 rounded-xl p-2 bg-transparent indent-3   outline-none"
        required
      />
      <button
        type="submit"
        className="border border-white rounded xl text-white p-3 mt-3 hover:bg-purple-500 hover:text-black hover:border-black transition-all duration-300 "
      >
        Update Comment
      </button>
    </form>
  );
}
