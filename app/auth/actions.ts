"use server";

import { SignupFormSchema, FormState, LoginFormSchema } from "@/app/lib/definitions";
import bcrypt from "bcrypt";
import prisma from "@/app/lib/prisma";
import { redirect } from "next/navigation";
import { createSession, decrypt } from "@/app/lib/session";

export async function signup(state: any, data: FormData) {
  console.log("signup action");
  const validationResult = SignupFormSchema.safeParse({
    name: data.get("name"),
    email: data.get("email"),
    password: data.get("password"),
  });
  if (!validationResult.success) {
    console.log(validationResult);
    console.log(validationResult.error.flatten().fieldErrors);
    return {
      errors: validationResult.error.flatten().fieldErrors,
    };
  }

  const { name, email, password } = validationResult.data;

  //check if he user's email already exists
  const user = await isExist(email);
  console.log(user);

  if (!user) {
    const hashedPassword = await bcrypt.hash(password, 10);

    const login = await prisma.users.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    console.log(login);
    await createSession(login.id);
    redirect("/dashboard");
  } else {
    console.log("Email already exists, please use a different email or login.");
  }
}

export async function login(
  state: FormState,
  formData: FormData,
): Promise<FormState>{

  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });

  const errorMessage = { message: 'Invalid login credentials.' };

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const user = await prisma.users.findUnique({
    where: {
      email: validatedFields.data.email,
    },
  });

  if (!user) {
    return errorMessage;
  }

  const passwordMatch = await bcrypt.compare(
    validatedFields.data.password,
    user.password,
  );

  if (!passwordMatch) {
    console.log(errorMessage);
    return errorMessage;
  }

  const userId = user.id.toString();
  await createSession(parseInt(userId));
  redirect("/dashboard");

}




export async function isExist(email: string) {
  const user = await prisma.users.findUnique({
    where: {
      email,
    },
  });

  return user;
}

export async function findUser(email: any, password: any){
  const user = await prisma.users.findUnique({
    where: {
      email: email,
    },
  });
  if (!user) {
    return null;
  }
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    console.log("Password does not match");
    return null;
  }
  return user;
}




