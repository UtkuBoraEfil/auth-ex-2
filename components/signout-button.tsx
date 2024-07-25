import { signOut } from "next-auth/react"
 
export default function SignOut() {
  return <button className="border border-white rounded-lg p-2" onClick={() => signOut()}>Sign Out</button>
}