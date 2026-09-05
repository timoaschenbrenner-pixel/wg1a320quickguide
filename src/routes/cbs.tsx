import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { CBS } from "@/data/cbs";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Disclaimer } from "@/components/disclaimer";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/cbs")({ component: CbsPage });

function CbsPage() {
  const [q, setQ] = useState("");
  const list = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return CBS;
    return CBS.filter((c) => `${c.fin} ${c.name} ${c.nameDe} ${c.panel} ${c.bus} ${c.ata}`.toLowerCase().includes(t));
  }, [q]);

  return (
    <div className="space-y-6">
      <header>
        <p className="font-mono text-2xs tracking-[0.18em] text-accent">ATA 24</p>
        <h1 className="text-2xl font-medium">Circuit Breakers</h1>
        <p className="mt-1 text-sm text-muted">Line-CBs. CBL des MSN ist führend. FIN/Lage je FSN prüfen.</p>
      </header>
      <Disclaimer compact />
      <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="ELAC, 5CC, 49VU…" />
      <ul className="overflow-hidden rounded-lg border border-border">
        {list.map((c) => (
          <li key={c.id} id={c.id} className={cn("border-t border-border bg-surface px-4 py-3 first:border-t-0")}>
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <p><span className="font-mono text-sm text-accent">{c.fin}</span> <span className="font-medium">{c.name}</span></p>
              <div className="flex gap-1.5">
                <Badge>{c.panel}</Badge>
                <Badge tone="accent">ATA {c.ata}</Badge>
              </div>
            </div>
            <p className="mt-1 text-sm text-muted">{c.nameDe} · {c.bus}{c.rating ? ` · ${c.rating}` : ""}</p>
            {c.note && <p className="mt-1 text-xs text-subtle">{c.note}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
}
