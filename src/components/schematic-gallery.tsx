import { useEffect, useState } from "react";
import { Maximize2, X } from "lucide-react";
import { schematicsForAta } from "@/data/schematics";

export function SchematicGallery({ ata }: { ata: string }) {
  const figs = schematicsForAta(ata);
  const [open, setOpen] = useState<string | null>(null);
  const cur = figs.find((f) => f.id === open);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(null); };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  if (figs.length === 0) return null;
  return (
    <section>
      <h2 className="mb-3 font-mono text-2xs uppercase tracking-[0.16em] text-subtle">Schematics</h2>
      <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {figs.map((f) => (
          <li key={f.id} id={f.id}>
            <button type="button" onClick={() => setOpen(f.id)} className="overflow-hidden rounded-lg border border-border bg-elevated text-left hover:border-accent">
              <img src={f.src} alt={f.title} className="aspect-[4/3] w-full object-cover object-top bg-fg" />
              <span className="block truncate px-2 py-1.5 font-mono text-2xs text-muted">Fig {f.fig}</span>
            </button>
          </li>
        ))}
      </ul>
      {cur && (
        <div className="fixed inset-0 z-50 flex flex-col bg-bg/96" role="dialog" aria-modal="true">
          <header className="flex items-center gap-2 border-b border-border px-3 py-2">
            <p className="min-w-0 flex-1 truncate text-sm"><span className="font-mono text-accent">Fig {cur.fig}</span> {cur.title}</p>
            <button type="button" className="flex size-11 items-center justify-center" onClick={() => setOpen(null)} aria-label="Schließen"><X className="size-5" /></button>
          </header>
          <div className="min-h-0 flex-1 overflow-auto bg-fg">
            <img src={cur.src} alt={cur.title} className="mx-auto block w-full max-w-5xl" />
          </div>
        </div>
      )}
    </section>
  );
}
