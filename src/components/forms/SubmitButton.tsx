"use client";
import { useFormStatus } from "react-dom";
import { Button, type ButtonProps } from "../ui/button";
import { Loader2 } from "lucide-react";

interface SubmitButtonProps extends ButtonProps {}

const SubmitButton = ({ children, ...props }: SubmitButtonProps) => {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} {...props}>
      {pending ? <Loader2 className="w-4 h-4 animate-spin" /> : children}
    </Button>
  );
};

export default SubmitButton;
