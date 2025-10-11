import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Separator from "@/components/Separator";
import { Button } from "@/components/ui/button";
import Post from "@/components/post/Post";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { Post as PostType } from "@/types/post";

const post: PostType = {
  hashtags: ["test", "test2"],
  imageUrl: "https://via.placeholder.com/150",
  id: "1",
  userId: "1",
  title: "Test Post",
  content: "Test Content",
  platform: ["twitter", "linkedin"],
  createdAt: new Date(),
  updatedAt: new Date(),
  draft: false,
  publishedAt: new Date(),
};

export default function Home() {
  return (
    <ProtectedRoute>
      <section className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Content Generator</h1>
          <p className="text-muted-foreground">
            Generate and manage your social media content
          </p>
        </div>
        <Link href="/new-post" className="flex items-center gap-2">
          <Button variant="ghost">
            <PlusIcon className="w-4 h-4" />
            New Post
          </Button>
        </Link>
      </section>
      <Separator />
      <Post post={post} />
    </ProtectedRoute>
  );
}
