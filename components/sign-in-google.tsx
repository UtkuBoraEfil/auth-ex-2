
import { signIn } from "next-auth/react"
 
export  function SignInGoogle() {
  return (
    <button className="border border-white rounded-lg p-2" onClick={() => signIn("google", { redirectTo: "/dashboard" })}>
      Sign In with Google
    </button>
  )
} 