"use server";

import { cache } from "react";
import { db } from "@/app/lib/database";
import { NewList, User } from "@/app/lib/definitions";
import { userExists } from "./users";
import { revalidatePath } from "next/cache";

export const createList = cache(async (user: User, list: NewList) => {
  if (await userExists(user)) return "Please provide a valid user";

  const result = await db.insertInto("lists").values(list).execute();

  console.log("result", result);

  revalidatePath("/dashboard");
});
