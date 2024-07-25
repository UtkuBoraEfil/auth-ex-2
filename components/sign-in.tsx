import { signIn } from "next-auth/react";

export function SignIn() {
  return (
    <button
      className="border border-white rounded-lg p-2"
      onClick={() => signIn("github", { redirectTo: "/dashboard" })}
    >
      Sign In with Github
    </button>
  );
}
