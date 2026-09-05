import { createFileRoute, Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { BELLY_PANELS, FAIRING_SHEETS, bellyZones } from "@/data/fairings";
import { PANELS, ZONE_META, OVERHEAD_LAYOUT } from "@/data/panels";
import type { BellyPanel, PanelZone } from "@/data/types";
import { FairingPlate } from "@/components/fairing-plate";
import { StationsGuide } from "@/components/stations-guide";
import { Disclaimer } from "@/components/disclaimer";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useLayoutEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/panels")({ component: PanelsPage });

type Tab = "belly" | "stations" | "cockpit";

function tabFromHash(raw: string): Tab | null {
  const id = raw.replace("#", "").toUpperCase();
  if (!id) return null;
  if (BELLY_PANELS.some((p) => p.id === id) || id === "BELLY" || id === "FAIRING") return "belly";
  if (id === "STATIONS" || id.startsWith("FR") || id.startsWith("STGR") || id === "SEC" || id === "SEKTION" || id === "SKIN" || id === "HAUT") return "stations";
  if (id === "COCKPIT" || id === "VU") return "cockpit";
  return null;
}

function PanelsPage() {
  const [tab, setTab] = useState<Tab>("belly");
  const [sheet, setSheet] = useState<1 | 2>(1);
  const [zone, setZone] = useState<string>("all");
  const [q, setQ] = useState("");
  const [active, setActive] = useState(BELLY_PANELS[0]?.id ?? "191AT");

  useLayoutEffect(() => {
    function apply() {
      const raw = window.location.hash.replace("#", "");
      const next = tabFromHash(raw);
      if (next) setTab(next);
      const id = raw.toUpperCase();
      const hit = BELLY_PANELS.find((p) => p.id === id);
      if (hit) { setSheet(hit.sheet); setActive(hit.id); }
    }
    apply();
    window.addEventListener("hashchange", apply);
    return () => window.removeEventListener("hashchange", apply);
  }, []);

  const onSheet = useMemo(() => BELLY_PANELS.filter((p) => p.sheet === sheet), [sheet]);
  const zones = bellyZones(sheet);
  const list = useMemo(() => {
    const t = q.trim().toLowerCase();
    return onSheet.filter((p) => {
      if (zone !== "all" && p.zone !== zone) return false;
      if (!t) return true;
      return `${p.designation} ${p.nameDe} ${p.behind} ${p.frames} ${p.ata.join(" ")}`.toLowerCase().includes(t);
    });
  }, [onSheet, zone, q]);
  const sel = BELLY_PANELS.find((p) => p.id === active) ?? list[0];

  function select(id: string) {
    const p = BELLY_PANELS.find((x) => x.id === id);
    if (!p) return;
    setActive(id);
    if (p.sheet !== sheet) { setSheet(p.sheet); setZone("all"); }
    history.replaceState(null, "", `#${id}`);
  }
  function go(next: Tab) {
    setTab(next);
    if (next === "stations") history.replaceState(null, "", "#stations");
    else if (next === "cockpit") history.replaceState(null, "", "#cockpit");
    else history.replaceState(null, "", sel ? `#${sel.id}` : "#belly");
  }

  return (
    <div className="space-y-6">
      <header>
        <p className="font-mono text-2xs tracking-[0.18em] text-accent">ATA 53 · STRUKTUR</p>
        <h1 className="text-2xl font-medium tracking-tight">Belly & Frames</h1>
        <p className="mt-1 text-sm text-muted">Zugangstafeln Kielverkleidung, Spante/Stationen/Stringer, Cockpit-VU. AMM 53-00-00 / 06-41-53 des MSN ist führend.</p>
      </header>
      <Disclaimer compact />
      <div className="flex gap-2 overflow-x-auto">
        <TabChip active={tab === "belly"} onClick={() => go("belly")}>Belly Fairing</TabChip>
        <TabChip active={tab === "stations"} onClick={() => go("stations")}>Stations / Frames</TabChip>
        <TabChip active={tab === "cockpit"} onClick={() => go("cockpit")}>Cockpit VU</TabChip>
      </div>
      {tab === "belly" ? (
        <BellySection sheet={sheet} setSheet={(s) => { setSheet(s); setZone("all"); const first = BELLY_PANELS.find((p) => p.sheet === s); if (first) select(first.id); }}
          zone={zone} setZone={setZone} q={q} setQ={setQ} list={list} sel={sel} zones={zones} select={select} />
      ) : tab === "stations" ? <StationsGuide /> : <CockpitSection />}
    </div>
  );
}

function BellySection({ sheet, setSheet, zone, setZone, q, setQ, list, sel, zones, select }: {
  sheet: 1 | 2; setSheet: (s: 1 | 2) => void; zone: string; setZone: (z: string) => void; q: string; setQ: (v: string) => void;
  list: BellyPanel[]; sel: BellyPanel | undefined; zones: string[]; select: (id: string) => void;
}) {
  const meta = FAIRING_SHEETS.find((s) => s.id === sheet)!;
  return (
    <div className="space-y-5">
      <div className="flex gap-2 overflow-x-auto">
        {FAIRING_SHEETS.map((s) => (
          <button key={s.id} type="button" onClick={() => setSheet(s.id)} className={cn("h-11 shrink-0 rounded-full border px-4 text-sm", sheet === s.id ? "border-accent bg-accent/15 text-accent" : "border-border bg-surface text-muted")}>
            {s.title}<span className="ml-2 font-mono text-2xs opacity-70">{s.side}</span>
          </button>
        ))}
      </div>
      <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="191AT, Pack, Waste, FR42…" />
      <div className="flex gap-2 overflow-x-auto">
        <Chip active={zone === "all"} onClick={() => setZone("all")}>Alle Zonen</Chip>
        {zones.map((z) => <Chip key={z} active={zone === z} onClick={() => setZone(z)}>{z}</Chip>)}
      </div>
      <FairingPlate sheet={sheet} items={list} activeId={sel?.id} onSelect={select} />
      {sel && (
        <div className="rounded-xl border border-border bg-surface p-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="font-mono text-xs text-accent">{sel.designation}</p>
              <h2 className="text-xl font-medium">{sel.nameDe}</h2>
              <div className="mt-2 flex flex-wrap gap-1.5">
                <Badge tone="accent">Zone {sel.zone}</Badge>
                <Badge>{sel.side === "L" ? "Links" : "Rechts"}</Badge>
                <Badge>{sel.frames}</Badge>
              </div>
            </div>
            <Link to="/panels/$id" params={{ id: sel.id }} className="h-11 rounded-md border border-border px-3 text-sm leading-[2.75rem] hover:border-accent">Detail</Link>
          </div>
          <p className="mt-3 text-sm text-muted">{sel.behind}</p>
          {sel.note && <p className="mt-2 rounded-md border border-caution/30 bg-caution/8 px-3 py-2 text-sm">{sel.note}</p>}
          <p className="mt-3 font-mono text-2xs text-subtle">{list.length} Tafeln · {meta.fsn}</p>
        </div>
      )}
      <ul className="grid gap-2 sm:grid-cols-2">
        {list.map((p) => (
          <li key={p.id} id={p.id}>
            <button type="button" onClick={() => select(p.id)} className={cn("flex min-h-11 w-full items-center justify-between gap-3 rounded-lg border px-4 py-3 text-left", p.id === sel?.id ? "border-accent bg-accent/10" : "border-border bg-surface")}>
              <span className="min-w-0">
                <span className="block font-mono text-xs text-accent">{p.designation}</span>
                <span className="block truncate text-sm">{p.nameDe}</span>
              </span>
              <Badge>Z{p.zone}</Badge>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function CockpitSection() {
  const [q, setQ] = useState("");
  const [zone, setZone] = useState<PanelZone | "all">("all");
  const zones = (Object.keys(ZONE_META) as PanelZone[]).sort((a, b) => ZONE_META[a].order - ZONE_META[b].order);
  const list = useMemo(() => {
    const t = q.trim().toLowerCase();
    return PANELS.filter((p) => {
      if (zone !== "all" && p.zone !== zone) return false;
      if (!t) return true;
      return `${p.designation} ${p.name} ${p.nameDe} ${p.location}`.toLowerCase().includes(t);
    });
  }, [q, zone]);
  return (
    <div className="space-y-5">
      <p className="text-sm text-muted">Cockpit-Tafeln (VU) bleiben verlinkt aus ATA/Resets. Hauptlageplan ist die Belly Fairing.</p>
      <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
        {OVERHEAD_LAYOUT.map((cell) => {
          const p = PANELS.find((x) => x.id === cell.id);
          if (!p) return null;
          return (
            <Link key={cell.id} to="/panels/$id" params={{ id: p.id }} className="rounded-md border border-border bg-surface px-2 py-2 hover:border-accent">
              <span className="block font-mono text-2xs text-accent">{p.designation}</span>
              <span className="block text-xs">{p.nameDe}</span>
            </Link>
          );
        })}
      </div>
      <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="20VU, FCU, FIRE…" />
      <div className="flex gap-2 overflow-x-auto">
        <Chip active={zone === "all"} onClick={() => setZone("all")}>Alle</Chip>
        {zones.map((z) => <Chip key={z} active={zone === z} onClick={() => setZone(z)}>{ZONE_META[z].labelDe}</Chip>)}
      </div>
      <ul className="grid gap-2 sm:grid-cols-2">
        {list.map((p) => (
          <li key={p.id}>
            <Link to="/panels/$id" params={{ id: p.id }} className="block rounded-lg border border-border bg-surface px-4 py-3 hover:bg-elevated">
              <span className="font-mono text-xs text-accent">{p.designation}</span>
              <span className="mt-0.5 block font-medium">{p.nameDe}</span>
              <span className="block text-sm text-muted">{p.location}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function TabChip({ active, onClick, children }: { active: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button type="button" onClick={onClick} className={cn("h-11 shrink-0 rounded-full border px-4 text-sm", active ? "border-accent bg-accent/15 text-accent" : "border-border bg-surface text-muted")}>{children}</button>
  );
}
function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button type="button" onClick={onClick} className={cn("h-9 shrink-0 rounded-full border px-3 text-xs", active ? "border-accent bg-accent/15 text-accent" : "border-border bg-surface text-muted")}>{children}</button>
  );
}
