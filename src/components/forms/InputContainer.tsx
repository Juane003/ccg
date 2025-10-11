import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

interface InputContainerProps
  extends PropsWithChildren,
    React.HTMLAttributes<HTMLDivElement> {}

const InputContainer = ({
  children,
  className,
  ...props
}: InputContainerProps) => {
  return (
    <div
      className={cn("border rounded-md p-4 space-y-4", className)}
      {...props}
    >
      {children}
    </div>
  );
};

export default InputContainer;
