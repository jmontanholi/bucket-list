"use server";

import { z } from "zod";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import { db } from "./database";
import { User, NewUser } from "./definitions";

export async function createUser(user: NewUser) {
  return await db
    .insertInto("users")
    .values(user)
    .returningAll()
    .executeTakeFirstOrThrow();
}

export async function userExists(user: User) {
  const result = await db
    .selectFrom("users")
    .selectAll()
    .where("id", "=", user.id)
    .execute();

  return result.length > 0;
}

export async function findUser(user: User) {
  const result = await db
    .selectFrom("users")
    .selectAll()
    .where("id", "=", user.id)
    .execute();

  const [resultUser] = result;

  return resultUser;
}
