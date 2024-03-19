import { Database } from "./definitions.js"; // this is the Database interface we defined earlier
import { createKysely } from "@vercel/postgres-kysely";

export const db = createKysely<Database>();
