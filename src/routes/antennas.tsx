import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ANTENNA_KINDS, ANTENNA_SHEETS, ANTENNAS } from "@/data/antennas";
import { AntennaPlate } from "@/components/antenna-plate";
import { Badge } from "@/components/ui/badge";
import { Disclaimer } from "@/components/disclaimer";
import { cn } from "@/lib/utils";
import type { AntennaKind } from "@/data/types";

export const Route = createFileRoute("/antennas")({ component: AntennasPage });

function AntennasPage() {
  const [sheet, setSheet] = useState<1 | 2>(1);
  const [kind, setKind] = useState<AntennaKind | "all">("all");
  const [active, setActive] = useState(ANTENNAS[0]?.id);
  const list = useMemo(
    () => ANTENNAS.filter((a) => a.sheet === sheet && (kind === "all" || a.kind === kind)),
    [sheet, kind],
  );
  const sel = ANTENNAS.find((a) => a.id === active) ?? list[0];

  return (
    <div className="space-y-6">
      <header>
        <p className="font-mono text-2xs tracking-[0.18em] text-accent">ATA 23 / 34 / 33</p>
        <h1 className="text-2xl font-medium">Antennen · Probes · Sensoren</h1>
        <p className="mt-1 text-sm text-muted">AMM 05-50-00-991. GPS option vs GPS-MMR nicht gleichzeitig.</p>
      </header>
      <Disclaimer compact />
      <div className="flex gap-2 overflow-x-auto">
        {ANTENNA_SHEETS.map((s) => (
          <button key={s.id} type="button" onClick={() => setSheet(s.id)} className={cn("h-11 shrink-0 rounded-full border px-4 text-sm", sheet === s.id ? "border-accent bg-accent/15 text-accent" : "border-border bg-surface text-muted")}>
            {s.title}
          </button>
        ))}
      </div>
      <div className="flex gap-2 overflow-x-auto">
        <Chip active={kind === "all"} onClick={() => setKind("all")}>Alle</Chip>
        {ANTENNA_KINDS.map((k) => (
          <Chip key={k.id} active={kind === k.id} onClick={() => setKind(k.id)}>{k.label}</Chip>
        ))}
      </div>
      <AntennaPlate sheet={sheet} items={list} activeId={sel?.id} onSelect={setActive} />
      {sel && (
        <div className="rounded-xl border border-border bg-surface p-5">
          <p className="font-mono text-xs text-accent">{sel.designation}</p>
          <h2 className="text-xl font-medium">{sel.name}</h2>
          <div className="mt-2 flex flex-wrap gap-1.5">
            <Badge tone="accent">ATA {sel.ata}</Badge>
            <Badge>{sel.kind}</Badge>
            <Badge>{sel.side === "C" ? "CL" : sel.side}</Badge>
            {sel.optional && <Badge tone="caution">Option</Badge>}
          </div>
          <p className="mt-3 text-sm text-muted">{sel.location}</p>
          {sel.frequency && <p className="mt-1 font-mono text-xs text-subtle">{sel.frequency}</p>}
          {sel.note && <p className="mt-2 text-sm">{sel.note}</p>}
        </div>
      )}
      <ul className="grid gap-2 sm:grid-cols-2">
        {list.map((a) => (
          <li key={a.id}>
            <button type="button" onClick={() => setActive(a.id)} className={cn("w-full rounded-lg border px-4 py-3 text-left", a.id === sel?.id ? "border-accent bg-accent/10" : "border-border bg-surface")}>
              <span className="font-mono text-xs text-accent">{a.designation}</span>
              <span className="block text-sm">{a.name}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: string }) {
  return (
    <button type="button" onClick={onClick} className={cn("h-9 shrink-0 rounded-full border px-3 text-xs", active ? "border-accent bg-accent/15 text-accent" : "border-border bg-surface text-muted")}>
      {children}
    </button>
  );
}
