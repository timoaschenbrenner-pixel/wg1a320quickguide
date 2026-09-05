import { useEffect, useMemo, useState } from "react";
import { useRouter } from "@tanstack/react-router";
import { Antenna, BookOpen, CircuitBoard, PanelsTopLeft, RotateCcw, Search } from "lucide-react";
import { searchAll } from "@/lib/search";
import type { SearchKind } from "@/data/types";
import { cn } from "@/lib/utils";

const ICONS: Record<SearchKind, typeof BookOpen> = {
  ata: BookOpen, panel: PanelsTopLeft, antenna: Antenna, cb: CircuitBoard, reset: RotateCcw,
};
const KIND_DE: Record<SearchKind, string> = {
  ata: "ATA", panel: "Panel", antenna: "Antenne", cb: "CB", reset: "Reset",
};

export function SearchPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [q, setQ] = useState("");
  const router = useRouter();
  const hits = useMemo(() => searchAll(q, 24), [q]);

  useEffect(() => {
    if (!open) setQ("");
  }, [open]);
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-bg/70 px-3 pt-[12vh] backdrop-blur-sm" onClick={onClose}>
      <div className="w-full max-w-xl overflow-hidden rounded-xl border border-border bg-surface shadow-[0_24px_80px_rgba(0,0,0,0.45)]" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-2 border-b border-border px-3">
          <Search className="size-4 text-muted" />
          <input autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder="ATA, Panel, FIN, Antenne, Reset, FR36…" className="h-12 w-full bg-transparent text-sm text-fg outline-none placeholder:text-subtle" />
        </div>
        <ul className="max-h-[50vh] overflow-y-auto p-2">
          {q && hits.length === 0 && <li className="px-3 py-6 text-center text-sm text-muted">Nichts gefunden</li>}
          {!q && <li className="px-3 py-6 text-center text-sm text-muted">z. B. ELAC, 191AT, VHF, FR36, CIDS</li>}
          {hits.map((h) => {
            const Icon = ICONS[h.kind];
            return (
              <li key={`${h.kind}-${h.id}`}>
                <button
                  type="button"
                  className="flex w-full items-start gap-3 rounded-md px-3 py-2.5 text-left hover:bg-elevated"
                  onClick={() => {
                    onClose();
                    router.history.push(h.href);
                  }}
                >
                  <Icon className="mt-0.5 size-4 text-accent" />
                  <span className="min-w-0">
                    <span className="block truncate text-sm">{h.title}</span>
                    <span className="block truncate text-xs text-muted">{KIND_DE[h.kind]} · {h.subtitle}</span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export function SearchTrigger({ onOpen }: { onOpen: () => void }) {
  return (
    <button type="button" onClick={onOpen} className={cn("flex h-11 w-full max-w-md items-center gap-2 rounded-md border border-border bg-elevated px-3 text-sm text-muted")}>
      <Search className="size-4" />
      Suche ATA, Panel, CB…
      <kbd className="ml-auto rounded-sm border border-border px-1.5 py-0.5 font-mono text-2xs">/</kbd>
    </button>
  );
}
