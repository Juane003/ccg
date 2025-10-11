import Separator from "@/components/Separator";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-[70vw] mx-auto pt-8">
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
    </div>
  );
}
