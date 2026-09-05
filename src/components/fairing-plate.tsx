import { useEffect, useState } from "react";
import { Maximize2, X } from "lucide-react";
import { FAIRING_SHEETS } from "@/data/fairings";
import type { BellyPanel } from "@/data/types";
import { cn } from "@/lib/utils";

export function FairingPlate({
  sheet, items, activeId, onSelect,
}: {
  sheet: 1 | 2;
  items: BellyPanel[];
  activeId?: string;
  onSelect: (id: string) => void;
}) {
  const meta = FAIRING_SHEETS.find((s) => s.id === sheet)!;
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = prev; window.removeEventListener("keydown", onKey); };
  }, [open]);

  return (
    <>
      <div className="overflow-hidden rounded-xl border border-border bg-elevated">
        <div className="flex items-center justify-between gap-2 border-b border-border px-3 py-2">
          <p className="font-mono text-2xs text-subtle"><span className="text-accent">{meta.fig}</span> · {meta.side}</p>
          <button type="button" onClick={() => setOpen(true)} className="flex h-11 items-center gap-1.5 px-2 text-xs text-muted" aria-label="Tafel vergrößern">
            <Maximize2 className="size-4" /> Zoom
          </button>
        </div>
        <div className="relative bg-fg">
          <button type="button" onClick={() => setOpen(true)} className="block w-full">
            <img src={meta.src} alt={meta.title} className="block h-auto w-full" />
          </button>
          {items.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={(e) => { e.stopPropagation(); onSelect(p.id); }}
              style={{ left: `${p.x}%`, top: `${p.y}%` }}
              className={cn(
                "absolute size-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2",
                p.id === activeId ? "border-accent bg-accent" : "border-accent/80 bg-accent/40",
              )}
              aria-label={p.designation}
            />
          ))}
        </div>
      </div>
      {open && (
        <div className="fixed inset-0 z-50 flex flex-col bg-bg/96" role="dialog">
          <header className="flex items-center justify-between border-b border-border px-3 py-2">
            <p className="font-mono text-sm text-accent">{meta.fig}</p>
            <button type="button" className="size-11" onClick={() => setOpen(false)} aria-label="Schließen"><X className="mx-auto size-5" /></button>
          </header>
          <div className="min-h-0 flex-1 overflow-auto bg-fg">
            <img src={meta.src} alt={meta.title} className="mx-auto block w-full max-w-5xl" />
          </div>
        </div>
      )}
    </>
  );
}
