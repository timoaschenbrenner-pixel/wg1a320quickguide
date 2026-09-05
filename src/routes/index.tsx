import { createFileRoute, Link } from "@tanstack/react-router";
import { Antenna, BookOpen, CircuitBoard, PanelsTopLeft, RotateCcw, Star } from "lucide-react";
import { AppLink } from "@/components/app-link";
import { Disclaimer } from "@/components/disclaimer";
import { useFavorites } from "@/lib/favorites";
import { ATA_SYSTEMS } from "@/data/ata";
import { BELLY_PANELS } from "@/data/fairings";
import { ANTENNAS } from "@/data/antennas";
import { CBS } from "@/data/cbs";
import { RESETS } from "@/data/resets";

export const Route = createFileRoute("/")({ component: Home });

const MODULES = [
  { to: "/ata", title: "ATA Systeme", body: "Kapitel 00–80. Funktion, Computer, Konfigs.", icon: BookOpen, meta: `${ATA_SYSTEMS.length} Kapitel` },
  { to: "/panels", title: "Belly & Frames", body: "Kielverkleidung, Spante, Stationen, Cockpit-VU.", icon: PanelsTopLeft, meta: `${BELLY_PANELS.length} Zugangstafeln` },
  { to: "/antennas", title: "Antennen", body: "AMM-Lageplan Ober-/Unterseite, Probes, Lichter.", icon: Antenna, meta: `${ANTENNAS.length} Antennen` },
  { to: "/cbs", title: "Circuit Breakers", body: "49VU, 121/122VU, FIN, Bus, Rating.", icon: CircuitBoard, meta: `${CBS.length} Line-CBs` },
  { to: "/resets", title: "Quick Reset", body: "ELAC, FMGC, ADIRU, CIDS, GCU, BSCU…", icon: RotateCcw, meta: `${RESETS.length} Resets` },
] as const;

const HOT = [
  { href: "/resets/elac", label: "ELAC Reset", tag: "27" },
  { href: "/resets/cids", label: "CIDS Reset", tag: "23" },
  { href: "/resets/adiru", label: "ADIRU Align", tag: "34" },
  { href: "/resets/aevc", label: "AEVC / Vent", tag: "21" },
  { href: "/resets/gcu", label: "GCU / GEN", tag: "24" },
  { href: "/resets/bscu", label: "BSCU", tag: "32" },
  { href: "/ata/21", label: "Avionics Vent Konfig", tag: "21" },
  { href: "/panels#FR36", label: "FR36 Pack-Bay", tag: "53" },
];

function Home() {
  const favs = useFavorites((s) => s.items);
  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-xl border border-border bg-surface px-5 py-8 hangar-grid">
        <p className="font-mono text-2xs tracking-[0.22em] text-accent">LHT MUC · WERKGRUPPE 1 · LINE</p>
        <h1 className="mt-2 max-w-xl text-3xl font-medium tracking-tight">
          A320 Family
          <span className="block text-muted">Schnellübersicht am Gate</span>
        </h1>
        <p className="mt-3 max-w-lg text-sm text-muted">
          A318 / A319 / A320 / A321 · CFM56-5. Erste Orientierung für Fluggerätmechaniker – ATA, Panels, Antennen, CBs und gängige Resets.
        </p>
        <p className="mt-4 font-mono text-2xs text-subtle">Quelle: A3 Schematic Manual L3 · Training only · AMM/TSM/CBL führen</p>
      </section>
      <Disclaimer />
      <section>
        <h2 className="mb-3 font-mono text-2xs uppercase tracking-[0.16em] text-subtle">Direkt</h2>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {HOT.map((h) => (
            <AppLink key={h.href} href={h.href} className="inline-flex h-11 shrink-0 items-center gap-2 rounded-md border border-border bg-surface px-3 text-sm hover:border-border-strong hover:bg-elevated">
              <span className="font-mono text-2xs text-accent">{h.tag}</span>
              {h.label}
            </AppLink>
          ))}
        </div>
      </section>
      {favs.length > 0 && (
        <section>
          <h2 className="mb-3 flex items-center gap-2 font-mono text-2xs uppercase tracking-[0.16em] text-subtle"><Star className="size-3.5" /> Favoriten</h2>
          <ul className="grid gap-2 sm:grid-cols-2">
            {favs.map((f) => (
              <li key={`${f.kind}-${f.id}`}>
                <AppLink href={f.href} className="block rounded-lg border border-border bg-surface px-4 py-3 text-sm hover:border-accent">{f.title}</AppLink>
              </li>
            ))}
          </ul>
        </section>
      )}
      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {MODULES.map((m) => {
          const Icon = m.icon;
          return (
            <Link key={m.to} to={m.to} className="group rounded-xl border border-border bg-surface p-5 transition-colors hover:border-border-strong hover:bg-elevated">
              <Icon className="size-5 text-accent" />
              <h2 className="mt-3 font-medium">{m.title}</h2>
              <p className="mt-1 text-sm text-muted">{m.body}</p>
              <p className="mt-3 font-mono text-2xs text-subtle">{m.meta}</p>
            </Link>
          );
        })}
      </section>
    </div>
  );
}
