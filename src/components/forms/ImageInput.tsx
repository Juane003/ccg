"use client";

import { Button } from "../ui/button";
import { Upload, XIcon } from "lucide-react";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface ImageInputProps {
  onImageChange: (image: File | null) => void;
  image: File | null;
  className?: string;
}

const ImageInput = ({ onImageChange, image, className }: ImageInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  return (
    <>
      {!image && (
        <div
          className={cn(
            "h-full w-full relative flex flex-col items-center justify-center gap-2 border border-dashed border-primary/50 rounded-md p-8",
            className
          )}
        >
          <button
            className="absolute inset-0 z-10"
            onClick={handleClick}
            type="button"
          />
          <Upload className="w-4 h-4" />
          <Button variant="outline" type="button" onClick={handleClick}>
            Upload Image
          </Button>
        </div>
      )}
      {image && (
        <div
          className={cn(
            "p-4 w-full h-full relative rounded-md border",
            className
          )}
        >
          <Button
            variant="ghost"
            type="button"
            onClick={() => onImageChange(null)}
          >
            <XIcon className="w-6 h-6" />
          </Button>
          <img
            className="object-cover aspect-video"
            src={URL.createObjectURL(image)}
            alt="Uploaded"
          />
        </div>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        name="image"
        required
        className="hidden"
        onChange={(e) => onImageChange(e.target.files?.[0] ?? null)}
      />
    </>
  );
};

export default ImageInput;
