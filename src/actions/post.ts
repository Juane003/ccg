"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import tryCatch from "@/lib/tryCatch";
import {
  createPost,
  deletePost,
  updatePost,
} from "@/repository/post.repository";
import { revalidatePath } from "next/cache";

const platformEnum = z.enum(["twitter", "linkedin", "instagram", "facebook"]);

const updatePostSchema = z.object({
  id: z.string(),
  title: z.string().optional(),
  content: z.string().optional(),
  platform: z.array(platformEnum).optional(),
  draft: z.boolean().optional(),
  publishedAt: z.date().optional(),
  userId: z.string(),
});

const createPostSchema = z.object({
  title: z.string(),
  content: z.string(),
  platforms: z.array(platformEnum),
  userId: z.string(),
  hashtags: z.array(z.string()),
});

const createPostAction = async (_initialData: unknown, formData: FormData) => {
  const parsedPlatforms = formData.get("platforms")?.toString().split(",");
  const parsedHashtags = formData.get("hashtags")?.toString().split(" ");

  console.log({
    parsedPlatforms,
    parsedHashtags,
  });

  const validatedData = createPostSchema.safeParse({
    title: formData.get("title"),
    content: formData.get("content"),
    platforms: parsedPlatforms,
    userId: formData.get("userId"),
    hashtags: parsedHashtags,
  });

  if (!validatedData.success) {
    return {
      error: validatedData.error.message,
      data: null,
    };
  }

  const { title, content, platforms, userId, hashtags } = validatedData.data;

  await createPost({
    id: crypto.randomUUID(),
    title,
    content,
    platform: platforms,
    userId,
    hashtags,
  });
  redirect("/");
};

const updatePostAction = async (_initialData: unknown, formData: FormData) => {
  const data = {
    id: formData.get("id"),
    title: formData.get("title"),
    content: formData.get("content"),
    platform: formData.get("platforms")?.toString().split(",") || [],
    draft: formData.get("draft") ? Boolean(formData.get("draft")) : undefined,
    publishedAt: formData.get("publishedAt") ?? undefined,
    userId: formData.get("userId"),
  };

  console.log({ data });
  const validatedData = updatePostSchema.safeParse(data);

  console.log({ validatedData });

  if (!validatedData.success) {
    return {
      error: validatedData.error.message,
      data: null,
    };
  }

  const { id } = validatedData.data;

  await updatePost(id, validatedData.data);
  revalidatePath("/");
  redirect(`/`);
};

const deletePostAction = async (formData: FormData) => {
  const id = formData.get("id");

  const validatedData = z.string().safeParse(id);

  if (!validatedData.success) {
    return {
      error: validatedData.error,
      data: null,
    };
  }

  const postId = validatedData.data;

  const { data, error } = await tryCatch(deletePost(postId));

  if (error) {
    return {
      error: error,
      data: null,
    };
  }

  return {
    error: null,
    data,
  };
};

export { updatePostAction, deletePostAction, createPostAction };
