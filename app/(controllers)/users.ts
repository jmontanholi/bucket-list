"use server";

import { db } from "@/app/lib/database";
import { User, NewUser } from "@/app/lib/definitions";

export async function createUser(user: NewUser) {
  return await db
    .insertInto("users")
    .values(user)
    .returningAll()
    .executeTakeFirstOrThrow();
}

export async function userExists(user: User) {
  if (!user) return "Provide all parameters";

  const result = await db
    .selectFrom("users")
    .selectAll()
    .where("id", "=", user.id)
    .execute();

  return result.length > 0;
}

export async function findUser(user: User) {
  if (!user) return "Provide all parameters";

  const result = await db
    .selectFrom("users")
    .selectAll()
    .where("id", "=", user.id)
    .execute();

  const [resultUser] = result;

  return resultUser;
}
