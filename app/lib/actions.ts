"use server";

import { z } from "zod";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import { db } from "./database";
import { NewUser } from "./definitions";

const createUserFormSchema = z
  .object({
    username: z.string().min(1, { message: "Username is required" }),
    email: z
      .string()
      .min(1, { message: "Email is required" })
      .email({ message: "This email is not valid" }),
    password: z
      .string()
      .regex(
        new RegExp(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%.^&*]).{8,23}$/
        ),
        "Password not strong enough"
      ),
    passwordConfirmation: z
      .string()
      .regex(
        new RegExp(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%.^&*]).{8,23}$/
        ),
        "Password not strong enough"
      ),
    firstName: z.string().min(1, { message: "First name is required" }),
    lastName: z.string().min(1, { message: "Last name is required" }),
  })
  .superRefine(({ password, passwordConfirmation }, ctx) => {
    if (password !== passwordConfirmation) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords don't match",
        path: ["matchPassword"],
      });
    }
  });

export type State = {
  errors?: {
    firstName?: string[];
    lastName?: string[];
    username?: string[];
    email?: string[];
    password?: string[];
    passwordConfirmation?: string[];
    matchPassword?: string[];
  };
  message?: string | null;
};

export async function createUser(user: NewUser) {
  return await db
    .insertInto("users")
    .values(user)
    .returningAll()
    .executeTakeFirstOrThrow();
}

export async function SignUp(prevState: State, formData: FormData) {
  const validatedFields = createUserFormSchema.safeParse({
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    passwordConfirmation: formData.get("passwordConfirmation"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing or incorrect fields",
    };
  }

  const { firstName, lastName, username, email, password } =
    validatedFields.data;

  const hash = await bcrypt.hash(password, 10);
  const createdUser = await createUser({
    username: username,
    email: email,
    password: hash,
    first_name: firstName,
    last_name: lastName,
  });

  console.log(createdUser);
  redirect("/dashboard");
}
