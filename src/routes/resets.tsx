import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { RESETS } from "@/data/resets";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Disclaimer } from "@/components/disclaimer";

export const Route = createFileRoute("/resets")({ component: ResetsPage });

function ResetsPage() {
  const [q, setQ] = useState("");
  const list = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return RESETS;
    return RESETS.filter((r) => `${r.name} ${r.when} ${r.ata} ${r.ecam ?? ""} ${(r.aliases ?? []).join(" ")}`.toLowerCase().includes(t));
  }, [q]);

  return (
    <div className="space-y-6">
      <header>
        <p className="font-mono text-2xs tracking-[0.18em] text-accent">TSM</p>
        <h1 className="text-2xl font-medium">Quick Reset</h1>
        <p className="mt-1 text-sm text-muted">Erste Orientierung. TSM-Task und Konfig des MSN führen.</p>
      </header>
      <Disclaimer />
      <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="ELAC, CIDS, ADIRU, VENT…" />
      <ul className="grid gap-2 sm:grid-cols-2">
        {list.map((r) => (
          <li key={r.id}>
            <Link to="/resets/$id" params={{ id: r.id }} className="block rounded-lg border border-border bg-surface px-4 py-3 hover:border-accent">
              <div className="flex items-start justify-between gap-2">
                <span className="font-medium">{r.name}</span>
                <Badge tone="accent">ATA {r.ata}</Badge>
              </div>
              <p className="mt-1 text-sm text-muted">{r.when}</p>
              <p className="mt-1 font-mono text-2xs text-subtle">{r.wait}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
