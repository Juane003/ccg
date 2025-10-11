import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { PlusIcon } from "lucide-react";

const PostListEmpty = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>No posts found</CardTitle>
      </CardHeader>
      <CardContent>
        <p>
          You haven't created any posts yet. Create a new post to get started.
        </p>
        <Link href="/new-post">
          <Button>
            <PlusIcon />
            Create a new post
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default PostListEmpty;
