"use client";

import { signup } from "@/app/auth/actions";
import { useFormState, useFormStatus } from "react-dom";

export function SignUpForm() {
  const [state, action] = useFormState(signup, undefined);

  return (
    <form
      action={action}
      className="w-full flex flex-col gap-5 max-w-[300px] border border-purple-500 p-20 rounded-md"
    >
      <input
        type="text"
        name="name"
        className="rounded-xl pl-4 text-sm h-6 text-black"
        placeholder="John Doe"
      />
      {state?.errors?.name && (
        <p className="text-sm text-red-500">{state.errors.name}</p>
      )}
      <input
        type="text"
        name="email"
        className="rounded-xl pl-4 text-xs min-h-6  text-black"
        placeholder="john@example.com"
      />
      {state?.errors?.email && (
        <p className="text-sm text-red-500">{state.errors.email}</p>
      )}
      <input
        type="password"
        name="password"
        className="rounded-xl pl-4 text-xs min-h-6 text-black"
        placeholder="password"
      />
      {state?.errors?.password && (
        <div className="text-sm text-red-500">
          <p>Password must:</p>
          <ul>
            {state.errors.password.map((error) => (
              <li key={error}>- {error}</li>
            ))}
          </ul>
        </div>
      )}

      <button className="border border-purple-500 rounded-xl">Sign up</button>
    </form>
  );
}
