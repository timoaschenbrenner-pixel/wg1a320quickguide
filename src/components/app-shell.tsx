import { Link, useRouterState } from "@tanstack/react-router";
import { Antenna, BookOpen, CircuitBoard, House, PanelsTopLeft, RotateCcw, Search } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { SearchPalette, SearchTrigger } from "./search-palette";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", label: "Home", icon: House },
  { to: "/ata", label: "Systeme", icon: BookOpen },
  { to: "/panels", label: "Struktur", icon: PanelsTopLeft },
  { to: "/antennas", label: "Antennen", icon: Antenna },
  { to: "/cbs", label: "CBs", icon: CircuitBoard },
  { to: "/resets", label: "Resets", icon: RotateCcw },
] as const;

function isActive(pathname: string, to: string) {
  if (to === "/") return pathname === "/";
  return pathname === to || pathname.startsWith(`${to}/`);
}

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "/" && !(e.target instanceof HTMLInputElement) && !(e.target instanceof HTMLTextAreaElement)) {
        e.preventDefault();
        setSearchOpen(true);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="min-h-dvh bg-bg text-fg">
      <header className="sticky top-0 z-40 border-b border-border bg-bg/92 pt-[env(safe-area-inset-top)] backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-2.5">
          <Link to="/" className="flex min-w-0 items-center gap-2.5">
            <span className="flex size-9 items-center justify-center rounded-sm border border-accent/40 bg-elevated">
              <svg viewBox="0 0 32 32" className="size-6 text-accent" aria-hidden>
                <path fill="currentColor" d="M16 4 6 14h4l6-6 6 6h4L16 4zm-9 12 9 12 9-12h-4l-5 7-5-7H7z" />
              </svg>
            </span>
            <span className="min-w-0">
              <span className="block font-mono text-2xs tracking-[0.18em] text-accent">MUC WG1</span>
              <span className="block truncate text-sm font-medium leading-tight">A320FAM QUICK GUIDE</span>
            </span>
          </Link>
          <div className="hidden flex-1 md:block">
            <SearchTrigger onOpen={() => setSearchOpen(true)} />
          </div>
          <button type="button" className="ml-auto flex size-11 items-center justify-center rounded-md border border-border md:hidden" onClick={() => setSearchOpen(true)} aria-label="Suche">
            <Search className="size-5" />
          </button>
        </div>
        <nav className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-2 pb-2">
          {NAV.map((n) => {
            const Icon = n.icon;
            const active = isActive(pathname, n.to);
            return (
              <Link key={n.to} to={n.to} className={cn("flex h-11 shrink-0 items-center gap-1.5 rounded-md px-3 text-sm", active ? "bg-accent/15 text-accent" : "text-muted hover:text-fg")}>
                <Icon className="size-4" />
                {n.label}
              </Link>
            );
          })}
        </nav>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-6 pb-24">{children}</main>
      <SearchPalette open={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
}
