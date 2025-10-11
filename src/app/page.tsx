import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Separator from "@/components/Separator";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { getPosts } from "@/actions/post";
import tryCatch from "@/lib/tryCatch";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import PostList from "@/components/post/PostList";

export default async function Home() {
  const userId = (await auth.api.getSession({ headers: await headers() }))?.user
    ?.id;

  if (!userId) {
    redirect("/auth");
  }

  const postsPromise = tryCatch(getPosts(userId));

  return (
    <ProtectedRoute>
      <section className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Content Generator</h1>
          <p className="text-muted-foreground">
            Generate and manage your social media content
          </p>
        </div>
        <Link href="/post" className="flex items-center gap-2">
          <Button variant="ghost">
            <PlusIcon className="w-4 h-4" />
            New Post
          </Button>
        </Link>
      </section>
      <Separator />
      <Suspense fallback={<div>Loading...</div>}>
        <PostList postsPromise={postsPromise} />
      </Suspense>
    </ProtectedRoute>
  );
}
