"use server";
import db from "@/db/db";
import { posts } from "@/db/schema/post";
import type { NewPost, Post } from "@/types/post";
import { and, eq } from "drizzle-orm/sqlite-core/expressions";

const getPosts = async (userId: string) => {
  return await db.query.posts.findMany({
    where: eq(posts.userId, userId),
  });
};

const getPost = async (postId: string, userId: string) => {
  return await db.query.posts.findFirst({
    where: and(eq(posts.id, postId), eq(posts.userId, userId)),
  });
};

const deletePost = async (postId: string) => {
  return await db.delete(posts).where(eq(posts.id, postId));
};

const updatePost = async (
  postId: string,
  post: Partial<Post> & { userId: string },
) => {
  return await db
    .update(posts)
    .set(post)
    .where(and(eq(posts.id, postId), eq(posts.userId, post.userId)));
};

const createPost = async (post: NewPost) => {
  return await db.insert(posts).values(post);
};

export { getPosts, getPost, deletePost, updatePost, createPost };
