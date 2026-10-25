import Link from "next/link";
import { Button } from "../ui/button";
import { PlusIcon } from "lucide-react";
import { Empty, EmptyContent, EmptyDescription, EmptyTitle } from "../ui/empty";

const PostListEmpty = () => {
  return (
    <Empty>
      <EmptyTitle>No posts found</EmptyTitle>
      <EmptyDescription>
        You haven't created any posts yet. Create a new post to get started.
      </EmptyDescription>
      <EmptyContent>
        <Button asChild variant="outline">
          <Link href="/post">
            <PlusIcon />
            Create a new post
          </Link>
        </Button>
      </EmptyContent>
    </Empty>
  );
};

export default PostListEmpty;
