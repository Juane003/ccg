"use client";

import { useActionState, useState } from "react";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import ImageInput from "../forms/ImageInput";
import { Label } from "../ui/label";
import InputContainer from "../forms/InputContainer";
import EnhanceWithAiLabel from "../forms/EnhanceWithAiLabel";
import SubmitButton from "../forms/SubmitButton";
import { createPost } from "@/actions/post";
import { authClient } from "@/lib/authClient";
import { Platform } from "@/types/post";

const PLATFORMS: Platform[] = ["twitter", "linkedin", "instagram", "facebook"];

const NewPostForm = () => {
  const { data: session } = authClient.useSession();
  const [state, formAction] = useActionState(createPost, null);
  const [platforms, setPlatforms] = useState<Platform[]>([]);
  const [image, setImage] = useState<File | null>(null);

  const handlePlatformClick = (platform: Platform) => {
    setPlatforms((prev) => {
      if (prev.includes(platform)) {
        return prev.filter((p) => p !== platform);
      }
      return [...prev, platform];
    });
  };

  const renderPlatforms = (platform: Platform) => {
    const isSelected = platforms.includes(platform);
    const onPlatformClick = () => handlePlatformClick(platform);

    return (
      <button
        key={platform}
        type="button"
        className={cn(
          "capitalize",
          isSelected ? "text-primary" : "text-muted-foreground",
        )}
        onClick={onPlatformClick}
      >
        <Badge variant="outline">{platform}</Badge>
      </button>
    );
  };

  return (
    <form action={formAction}>
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 h-full">
        <div className="w-full md:w-1/2 space-y-4">
          <ImageInput
            className={"h-84"}
            image={image}
            onImageChange={(image) => {
              setImage(image);
            }}
          />
          <InputContainer>
            <EnhanceWithAiLabel text="Hashtags" id="hashtags" />
            <Textarea
              id="hashtags"
              placeholder="Hashtags"
              name="hashtags"
              required
              className="resize-none"
            />
          </InputContainer>
        </div>
        <div className="space-y-2 w-full md:w-1/2">
          <InputContainer>
            <EnhanceWithAiLabel text="Title" id="title" />
            <Input
              type="text"
              placeholder="Enter your title or generate one with our agent..."
              name="title"
              required
              id="title"
            />
          </InputContainer>
          <InputContainer>
            <EnhanceWithAiLabel text="Caption" id="content" />
            <Textarea
              id="caption"
              placeholder="Write your caption here..."
              name="content"
              required
              className="resize-none h-48"
            />
          </InputContainer>
          <InputContainer>
            <Label htmlFor="platforms">Platforms</Label>
            <div className="space-x-2">{PLATFORMS.map(renderPlatforms)}</div>
          </InputContainer>
        </div>
        <input type="hidden" name="userId" value={session?.user.id || ""} />
        <input type="hidden" name="platforms" value={platforms} />
      </div>
      {state?.error && <p className="text-red-500">{state.error}</p>}
      <SubmitButton className="w-full mt-4" variant="outline" type="submit">
        Create Post
      </SubmitButton>
    </form>
  );
};

export default NewPostForm;
