import { drizzle } from "drizzle-orm/libsql";
import "dotenv/config";
import * as posts from "@/db/schema/post";
import * as auth from "@/db/schema/auth";

const db = drizzle({
  connection: {
    url: process.env.TURSO_DATABASE_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN!,
  },
  schema: {
    ...posts,
    ...auth,
  },
});

export default db;
