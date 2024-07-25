"use client"; // Ensure this is a client component

import { useState } from "react";
import { signIn } from "next-auth/react";
import { createUser } from "@/actions/create-user";

export function SignInCredentials() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const createdUser = await createUser({ email, password });

    if (!createdUser) return null;

    const result = await signIn("credentials", {
      email,
      password,
    });

    if (result.error) {
      // Handle sign-in error
      console.error("Sign-in error:", result.error);
    } else {
      // Handle successful sign-in (you might want to redirect the user)
      console.log("Sign-in successful");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email
        <input
          className="bg-gray-800"
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label>
        Password
        <input
          className="bg-gray-800"
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <button type="submit">Sign In</button>
    </form>
  );
}
