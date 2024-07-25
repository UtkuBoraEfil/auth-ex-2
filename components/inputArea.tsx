import {pushComment} from "@/actions/comment";

export default async function InputArea(){
    return (
        <form
         action={pushComment}
         className=" p-5 border border-purple-500 rounded-md mt-4 flex flex-col gap-2 text-lg font-semibold antialiased text-white"    
        >
            <input
                type="text"
                name="title"
                placeholder="Title"
                className="rounded-xl p-2 bg-transparent indent-3 focus:outline-purple-500 transition-all duration-300 outline-none "
                required
            />
            <textarea
                name="comment" 
                placeholder="Comment"
                className="rounded-xl p-2 bg-transparent indent-3 focus:outline-purple-500 transition-all duration-300 outline-none"
                required
            />
            <button type="submit" className="border border-white rounded xl text-white p-3 mt-3 hover:bg-purple-500 hover:text-black hover:border-black transition-all duration-300 " >
                Push Comment
            </button>

        </form>
    );
}