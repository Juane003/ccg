import { ArrowLeftIcon, CheckIcon, EyeIcon, SaveIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

const PostLayoutHeader = ({
  showActions = false,
}: {
  showActions?: boolean;
}) => {
  return (
    <header className="flex items-center justify-between">
      <Link href="/">
        <Button variant="ghost">
          <ArrowLeftIcon className="w-4 h-4" />
          Back
        </Button>
      </Link>

      {showActions && (
        <div className="flex items-center gap-2">
          <Link href="/preview">
            <Button variant="ghost">
              <EyeIcon className="w-4 h-4" />
              Preview
            </Button>
          </Link>
          <Button variant="ghost" type="button">
            <SaveIcon className="w-4 h-4" />
            Save As Draft
          </Button>
          <Button type="button" variant="ghost">
            <CheckIcon className="w-4 h-4" />
            Mark as Published
          </Button>
        </div>
      )}
    </header>
  );
};

export default PostLayoutHeader;
