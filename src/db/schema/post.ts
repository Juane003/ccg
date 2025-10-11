import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

const posts = sqliteTable("posts", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  createdAt: integer("created_at", { mode: "timestamp_ms" })
    .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
    .notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp_ms" })
    .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
    .$onUpdate(() => new Date())
    .notNull(),
  draft: integer("draft", { mode: "boolean" }).default(true).notNull(),
  publishedAt: integer("published_at", { mode: "timestamp_ms" }),
  platform: text("platform", {
    mode: "json",
  })
    .$type<("twitter" | "linkedin" | "instagram" | "facebook")[]>()
    .default([]),
  hashtags: text("hashtags", { mode: "json" }).$type<string[]>().default([]),
  imageUrl: text("image_url"),
});

export { posts };
