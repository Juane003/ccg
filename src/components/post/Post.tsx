import { PencilIcon, TrashIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Post as PostType } from "@/types/post";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { DeletePostModal } from "./DeletePostModal";
import Link from "next/link";

const BADGE_COLORS = {
  Published: "bg-emerald-400",
  Draft: "bg-yellow-400",
} as const;

const Post = ({ post }: { post: PostType }) => {
  const draftStatus = post.draft ? "Draft" : "Published";

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between gap-2">
          <div className="space-x-4">
            <Badge className={cn("capitalize", BADGE_COLORS[draftStatus])}>
              {post.draft ? "Draft" : "Published"}
            </Badge>
            <span className="text-xl font-bold">{post.title}</span>
          </div>
          <div className="space-x-2">
            <Button asChild variant="ghost">
              <Link href={`/post/${post.id}`}>
                <PencilIcon />
              </Link>
            </Button>
            <DeletePostModal postId={post.id} />
          </div>
        </CardTitle>
        <CardDescription className="capitalize">
          {post.platform?.join(", ")}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>{post.content}</p>
      </CardContent>
    </Card>
  );
};

export default Post;
