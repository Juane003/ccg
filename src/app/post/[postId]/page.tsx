import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Separator from "@/components/Separator";
import PostLayoutHeader from "@/components/post/PostLayoutHeader";
import NewPostForm from "@/components/post/NewPostForm";
import { Suspense } from "react";
import tryCatch from "@/lib/tryCatch";
import { getPost } from "@/repository/post.repository";
import { getUserId } from "@/actions/login";

const PostDetailPage = async ({
  params,
}: {
  params: Promise<{ postId: string }>;
}) => {
  const userId = await getUserId();
  const { postId } = await params;

  const postPromise = tryCatch(getPost(postId, userId));

  return (
    <ProtectedRoute>
      <PostLayoutHeader showActions />
      <Separator />
      <Suspense fallback={<div>Loading...</div>}>
        <NewPostForm postPromise={postPromise} />
      </Suspense>
    </ProtectedRoute>
  );
};

export default PostDetailPage;
