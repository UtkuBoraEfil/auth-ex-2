'use client'

import Image from "next/image";
import { deletePost } from "@/actions/comment";


export  function ButtonComp({id}: {id: number}) {

    return(
        <button className="pl-3" onClick={()=>deletePost(id)} >
            <Image src="/trash.png" alt="Image" width={20} height={20} />
        </button>
    );
}