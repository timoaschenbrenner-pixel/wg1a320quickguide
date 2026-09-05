import { useRouter } from "@tanstack/react-router";
import type { ReactNode } from "react";

export function AppLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: ReactNode;
}) {
  const router = useRouter();
  return (
    <a
      href={href}
      className={className}
      onClick={(e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
        e.preventDefault();
        router.history.push(href);
      }}
    >
      {children}
    </a>
  );
}
