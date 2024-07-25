import Link from "next/link";

interface SideItemsProps {
    post: {
        slug?: string;
        title: string;
    };
}

export default function SideItems({post}: SideItemsProps) {

    return(
            <Link
             href={`/dashboard/posts/${post?.slug}`}
             className="py-2 min-w-full  border border-purple-700 rounded-md p-2 hover:bg-purple-700 hover:text-white"
             >
                {post.title}
            </Link>

    )
}