import {LoginForm} from "./form";
import Link from "next/link";

export default async function SignUp(){
    return (
        <div className="w-full h-full grid place-content-center">
            <div className="flex flex-col gap-4 ">
                <LoginForm/>
                <div>
                    <Link href="/signup" className="border rounded-lg px-3 py-2">signup</Link>
                </div>
            </div>
        </div>
    );
}