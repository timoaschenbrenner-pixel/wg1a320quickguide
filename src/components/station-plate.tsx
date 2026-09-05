import { useEffect, useState, type ReactNode } from "react";
import { Maximize2, X, ZoomIn, ZoomOut } from "lucide-react";
import { STATION_FIGS } from "@/data/stations";
import { cn } from "@/lib/utils";

const ZOOM = [1, 1.5, 2, 2.5] as const;

export function StationPlate({ figId }: { figId: string }) {
  const meta = STATION_FIGS.find((f) => f.id === figId) ?? STATION_FIGS[0];
  const [open, setOpen] = useState(false);
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = prev; window.removeEventListener("keydown", onKey); };
  }, [open]);
  useEffect(() => { setZoom(1); }, [open, figId]);

  return (
    <>
      <div className="overflow-hidden rounded-xl border border-border bg-elevated">
        <div className="flex items-center justify-between gap-2 border-b border-border px-3 py-2">
          <p className="min-w-0 truncate font-mono text-2xs text-subtle">
            <span className="text-accent">Fig {meta.fig}</span>
            <span className="mx-1.5 text-border-strong">·</span>
            {meta.caption}
          </p>
          <button type="button" onClick={() => setOpen(true)} className="flex h-11 shrink-0 items-center gap-1.5 px-2 text-xs text-muted" aria-label="Tafel vergrößern">
            <Maximize2 className="size-4" /> Zoom
          </button>
        </div>
        <button type="button" onClick={() => setOpen(true)} className="block w-full bg-fg">
          <img src={meta.src} alt={meta.caption} className="mx-auto block h-auto max-h-[min(70vh,36rem)] w-full object-contain" />
        </button>
      </div>
      {open && (
        <div className="fixed inset-0 z-50 flex flex-col bg-bg/96 pt-[env(safe-area-inset-top)]" role="dialog" aria-modal="true">
          <header className="flex items-center gap-2 border-b border-border px-3 py-2">
            <p className="min-w-0 flex-1 truncate text-sm"><span className="font-mono text-accent">Fig {meta.fig}</span> {meta.title}</p>
            <button type="button" className="size-11" disabled={ZOOM.indexOf(zoom as (typeof ZOOM)[number]) <= 0} onClick={() => setZoom(ZOOM[Math.max(0, ZOOM.indexOf(zoom as (typeof ZOOM)[number]) - 1)])} aria-label="Verkleinern"><ZoomOut className="mx-auto size-5" /></button>
            <button type="button" className="size-11" disabled={ZOOM.indexOf(zoom as (typeof ZOOM)[number]) >= ZOOM.length - 1} onClick={() => setZoom(ZOOM[Math.min(ZOOM.length - 1, ZOOM.indexOf(zoom as (typeof ZOOM)[number]) + 1)])} aria-label="Vergrößern"><ZoomIn className="mx-auto size-5" /></button>
            <button type="button" className="size-11" onClick={() => setOpen(false)} aria-label="Schließen"><X className="mx-auto size-5" /></button>
          </header>
          <div className="min-h-0 flex-1 overflow-auto bg-fg">
            <img src={meta.src} alt={meta.caption} className="mx-auto block max-w-none" style={{ width: `${zoom * 100}%` }} />
          </div>
        </div>
      )}
    </>
  );
}

export function FigChip({ active, onClick, children }: { active: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button type="button" onClick={onClick} className={cn("h-11 shrink-0 rounded-full border px-3 text-xs", active ? "border-accent bg-accent/15 text-accent" : "border-border bg-surface text-muted")}>
      {children}
    </button>
  );
}
