import { useEffect, useState } from "react";
import { Maximize2, X } from "lucide-react";
import { ANTENNA_SHEETS } from "@/data/antennas";
import type { AntennaItem, AntennaKind } from "@/data/types";
import { cn } from "@/lib/utils";

const KIND_COLOR: Record<AntennaKind, string> = {
  antenna: "bg-accent border-accent",
  probe: "bg-caution border-caution",
  sensor: "bg-ok border-ok",
  light: "bg-warn border-warn",
};

export function AntennaPlate({
  sheet, items, activeId, onSelect,
}: {
  sheet: 1 | 2;
  items: AntennaItem[];
  activeId?: string;
  onSelect: (id: string) => void;
}) {
  const meta = ANTENNA_SHEETS.find((s) => s.id === sheet)!;
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <div className="overflow-hidden rounded-xl border border-border bg-elevated">
        <div className="flex items-center justify-between px-3 py-2">
          <p className="font-mono text-2xs text-subtle">{meta.fig} · {meta.title}</p>
          <button type="button" onClick={() => setOpen(true)} className="flex h-11 items-center gap-1 px-2 text-xs" aria-label="Tafel vergrößern">
            <Maximize2 className="size-4" /> Zoom
          </button>
        </div>
        <div className="relative">
          <img src={meta.src} alt={meta.title} className="block h-auto w-full" />
          {items.map((a) => (
            <button
              key={a.id}
              type="button"
              onClick={() => onSelect(a.id)}
              style={{ left: `${a.x}%`, top: `${a.y}%` }}
              className={cn("absolute size-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2", KIND_COLOR[a.kind], a.id === activeId && "ring-2 ring-fg")}
              aria-label={a.designation}
            />
          ))}
        </div>
      </div>
      {open && (
        <div className="fixed inset-0 z-50 flex flex-col bg-bg/96">
          <header className="flex items-center justify-between px-3 py-2">
            <p className="text-sm">{meta.title}</p>
            <button type="button" className="size-11" onClick={() => setOpen(false)} aria-label="Schließen"><X className="mx-auto size-5" /></button>
          </header>
          <div className="min-h-0 flex-1 overflow-auto">
            <img src={meta.src} alt={meta.title} className="w-full" />
          </div>
        </div>
      )}
    </>
  );
}
