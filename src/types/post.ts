import * as schema from "@/db/schema/post";

export type Post = typeof schema.posts.$inferSelect;
export type NewPost = typeof schema.posts.$inferInsert;
export type Platform = (typeof schema.posts.platform)["_"]["$type"][number];
