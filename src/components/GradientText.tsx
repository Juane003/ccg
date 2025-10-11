import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

type GradientClassNames = {
  from: `from-${string}`;
  via: `via-${string}`;
  to: `to-${string}`;
};

interface GradientTextProps extends PropsWithChildren {
  as?: React.ElementType;
  className?: string;
  gradientClassNames: GradientClassNames;
}

const GradientText = ({
  children,
  gradientClassNames,
  as = "span",
  className,
}: GradientTextProps) => {
  const Comp = as;
  return (
    <Comp
      className={cn(
        "bg-gradient-to-r text-transparent bg-clip-text",
        gradientClassNames.from,
        gradientClassNames.via,
        gradientClassNames.to,
        className
      )}
    >
      {children}
    </Comp>
  );
};

export default GradientText;
