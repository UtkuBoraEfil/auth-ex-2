"use client";

import { login } from "@/app/auth/actions";
import { useFormState, useFormStatus } from "react-dom";

export function LoginForm() {
  const [state, action] = useFormState(login, undefined);

  return (
    <form
      action={action}
      className="w-full flex flex-col gap-5 max-w-[300px] border border-purple-500 p-20 rounded-md"
    >
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
            {state.errors.password}
        </div>
      )}
      {state?.message && (
          <p className="text-sm text-red-500">{state.message}</p>
      )}

      <button className="border border-purple-500 rounded-xl">Login</button>
    </form>
  );
}
