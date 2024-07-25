import { SignUpForm } from "./form";
import Link from "next/link";
import { redirect } from "next/navigation";
import { signIn, auth, providerMap } from "@/auth";
import { AuthError } from "next-auth"

export default async function SignUp(){
    return (
        <div className="w-full h-full grid place-content-center">
            <div className="flex flex-col justify-center gap-3">
                <SignUpForm/>
                <div>
                    <Link href="/login" className="border rounded-lg px-3 py-2">login</Link>
                </div>
            </div>
        </div>
    );
    // return(
    //     <div className="w-full h-full grid place-content-center gap-10">
    //     {Object.values(providerMap).map((provider) => (
    //       <form
    //         action={async () => {
    //           "use server"
    //           try {
    //             await signIn(provider.id)
    //           } catch (error) {
    //             // Signin can fail for a number of reasons, such as the user
    //             // not existing, or the user not having the correct role.
    //             // In some cases, you may want to redirect to a custom error
    //             if (error instanceof AuthError) {
    //               return redirect(`$?error=${error.type}`)
    //             }
    
    //             // Otherwise if a redirects happens NextJS can handle it
    //             // so you can just re-thrown the error and let NextJS handle it.
    //             // Docs:
    //             // https://nextjs.org/docs/app/api-reference/functions/redirect#server-component
    //             throw error
    //           }
    //         }}
    //       >
    //         <button type="submit">
    //           <span className="border border-white p-2">Sign in with {provider.name}</span>
    //         </button>
    //       </form>
    //     ))}
    //   </div>
    // )
}