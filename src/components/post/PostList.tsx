import { use } from "react";
import type { TryCatchResult } from "@/lib/tryCatch";
import type { Post as PostType } from "@/types/post";
import Post from "./Post";
import PostListEmpty from "./PostListEmpty";

const PostList = ({
  postsPromise,
}: {
  postsPromise: Promise<TryCatchResult<PostType[] | null>>;
}) => {
  const posts = use(postsPromise);

  if (posts.error) {
    return <div>Error: {posts.error.message}</div>;
  }

  if (!posts.data || posts.data.length === 0) {
    return <PostListEmpty />;
  }

  return (
    <div>
      {posts.data.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};

export default PostList;
