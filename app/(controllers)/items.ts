import { cache } from "react";
import { db } from "@/app/lib/database";

export const getItems = cache(async () => {
  const result = await db.selectFrom("items").selectAll().execute();

  return result;
});
