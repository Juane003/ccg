import ProtectedRoute from "@/components/auth/ProtectedRoute";
import NewPostForm from "@/components/post/NewPostForm";
import PostLayoutHeader from "@/components/post/PostLayoutHeader";
import Separator from "@/components/Separator";

const NewPostPage = () => {
  return (
    <ProtectedRoute>
      <PostLayoutHeader />
      <Separator />
      <div>
        <NewPostForm />
      </div>
    </ProtectedRoute>
  );
};

export default NewPostPage;
