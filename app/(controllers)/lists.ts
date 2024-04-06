import { cache } from "react";
import { db } from "@/app/lib/database";
import { NewList, ListUpdate, User } from "@/app/lib/definitions";
import { userExists } from "./users";
import { revalidatePath } from "next/cache";
import { getItems } from "./items";

export const getLists = cache(async (user: User) => {
  if (!(await userExists(user)))
    return { failed: 1, message: "Invalid user", data: [] };

  try {
    const data = await db
      .selectFrom("lists")
      .selectAll()
      .where("user_id", "=", user.id)
      .orderBy("lists.id")
      .execute();

    return { failed: 0, message: "Lists successfully retrieved", data };
  } catch (err) {
    console.log(err);
    return {
      failed: 1,
      message: err,
      data: [],
    };
  }
});

export const createList = cache(async (user: User, list: NewList) => {
  if (!(await userExists(user))) return { failed: 1, message: "Invalid user" };

  try {
    await db.insertInto("lists").values(list).execute();

    revalidatePath("/dashboard");
    return { failed: 0, message: "List successfully created" };
  } catch (err) {
    console.log(err);
    return {
      failed: 1,
      message: err,
    };
  }
});

export const updateList = cache(
  async (listId: number, updatedList: ListUpdate) => {
    if (
      !(await db
        .selectFrom("users")
        .selectAll()
        .where("id", "=", updatedList.user_id!)
        .execute())
    )
      return { failed: 1, message: "Invalid user" };

    try {
      const [data] = await db
        .updateTable("lists")
        .set(updatedList)
        .where("id", "=", listId)
        .returningAll()
        .execute();

      revalidatePath(`/dashboard?expanded${listId}`);
      return {
        failed: 0,
        message: "List successfully updated",
        updatedList: data,
      };
    } catch (err) {
      console.log(err);
      return {
        failed: 1,
        message: err,
      };
    }
  }
);

export const deleteList = cache(async (listId: number) => {
  try {
    await db.deleteFrom("lists").where("id", "=", listId).execute();

    revalidatePath("/dashboard");
    return { failed: 0, message: "List successfully deleted" };
  } catch (err) {
    console.log(err);
    return {
      failed: 1,
      message: err,
    };
  }
});

export const reorderListItems = cache(async (listId: number) => {
  try {
    const result = await getItems(listId);
    const items = result.data;

    for (let i = 0, length = items.length; i < length; i++) {
      const item = items[i];
      const index = i;
      const temp = { ...item, item_order: index };

      await db
        .updateTable("items")
        .set(temp)
        .where("id", "=", item.id)
        .returningAll()
        .execute();
    }

    return { failed: 0, message: "Item successfully deleted" };
  } catch (err) {
    console.log(err);
    return {
      failed: 1,
      message: err,
    };
  }
});
