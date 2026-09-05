import * as React from "react";
import { cn } from "@/lib/utils";

export const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={cn(
      "flex h-11 w-full rounded-md border border-border bg-elevated px-3 text-sm text-fg placeholder:text-subtle",
      "transition-colors duration-150 focus-visible:border-accent focus-visible:outline-none",
      className,
    )}
    {...props}
  />
));
Input.displayName = "Input";
