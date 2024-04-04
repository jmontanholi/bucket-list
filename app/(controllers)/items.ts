import { cache } from "react";
import { db } from "@/app/lib/database";
import { NewItem } from "../lib/definitions";
import { revalidatePath } from "next/cache";

export const getItems = cache(async (listId: number) => {
  try {
    const data = await db
      .selectFrom("items")
      .selectAll()
      .where("list_id", "=", listId)
      .orderBy("item_order")
      .execute();

    return { failed: 0, message: "Items successfully retrieved", data };
  } catch (err) {
    console.log(err);
    return {
      failed: 1,
      message: err,
      data: [],
    };
  }
});

export const createItem = cache(async (item: NewItem) => {
  try {
    const [createdItem] = await db
      .insertInto("items")
      .values(item)
      .returningAll()
      .execute();

    revalidatePath("/dashboard");
    return { failed: 0, message: "Item successfully created", createdItem };
  } catch (err) {
    console.log(err);
    return {
      failed: 1,
      message: err,
    };
  }
});
