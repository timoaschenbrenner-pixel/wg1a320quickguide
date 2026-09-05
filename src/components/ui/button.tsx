import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Button({ className, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        "inline-flex h-11 items-center justify-center rounded-md border border-border bg-surface px-4 text-sm hover:border-accent",
        className,
      )}
      {...props}
    />
  );
}
