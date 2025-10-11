import { SparklesIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";

const EnhanceWithAiLabel = ({ text, id }: { text: string; id: string }) => {
  return (
    <div className="flex items-center justify-between">
      <Label htmlFor={id}>{text}</Label>
      <Button
        type="button"
        variant="ghost"
        className="text-purple-300 hover:text-purple-400 active:text-purple-500"
        onClick={() => {}}
      >
        <span>Enhance</span>
        <SparklesIcon className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default EnhanceWithAiLabel;
