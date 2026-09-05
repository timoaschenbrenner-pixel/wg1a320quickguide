import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Badge({
  children,
  tone = "default",
  className,
}: {
  children: ReactNode;
  tone?: "default" | "accent" | "caution";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-sm px-1.5 py-0.5 font-mono text-2xs tracking-wide",
        tone === "accent" && "bg-accent/15 text-accent",
        tone === "caution" && "bg-caution/15 text-caution",
        tone === "default" && "bg-elevated text-muted",
        className,
      )}
    >
      {children}
    </span>
  );
}
