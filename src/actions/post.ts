"use server";

import db from "@/db/db";
import { posts } from "@/db/schema/post";
import { eq } from "drizzle-orm/sqlite-core/expressions";
import { z } from "zod";

const platformEnum = z.enum(["twitter", "linkedin", "instagram", "facebook"]);

const updatePostSchema = z.object({
  id: z.string(),
  title: z.string().optional(),
  content: z.string().optional(),
  platform: z.array(platformEnum).optional(),
  draft: z.boolean().optional(),
  publishedAt: z.date().optional(),
});

const createPostSchema = z.object({
  title: z.string(),
  content: z.string(),
  platforms: z.array(platformEnum),
  userId: z.string(),
  hashtags: z.string(),
});

const createPost = async (initialData: any, formData: FormData) => {
  const parsedPlatforms = formData.get("platforms")?.toString().split(",");

  const validatedData = createPostSchema.safeParse({
    title: formData.get("title"),
    content: formData.get("content"),
    platforms: parsedPlatforms,
    userId: formData.get("userId"),
    hashtags: formData.get("hashtags"),
  });

  if (!validatedData.success) {
    return {
      error: validatedData.error.message,
      data: null,
    };
  }

  const { title, content, platforms, userId, hashtags } = validatedData.data;

  const post = await db
    .insert(posts)
    .values({
      id: crypto.randomUUID(),
      title,
      content,
      platform: platforms,
      userId,
    })
    .returning();

  return {
    error: null,
    data: post,
  };
};

const updatePost = async (formData: FormData) => {
  const validatedData = updatePostSchema.safeParse({
    id: formData.get("id"),
    title: formData.get("title"),
    content: formData.get("content"),
    platform: formData.get("platform"),
    draft: formData.get("draft"),
    publishedAt: formData.get("publishedAt"),
  });

  if (!validatedData.success) {
    return {
      error: validatedData.error.message,
      data: null,
    };
  }

  const { id, title, content, platform, draft, publishedAt } =
    validatedData.data;

  const post = await db
    .update(posts)
    .set({
      title,
      content,
      platform,
      draft,
      publishedAt,
    })
    .where(eq(posts.id, id));

  return {
    error: null,
    data: post,
  };
};
export { updatePost, createPost };
