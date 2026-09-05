import { createFileRoute, Link } from "@tanstack/react-router";
import { ATA_SYSTEMS } from "@/data/ata";

export const Route = createFileRoute("/ata")({ component: AtaIndex });

function AtaIndex() {
  return (
    <div className="space-y-6">
      <header>
        <p className="font-mono text-2xs tracking-[0.18em] text-accent">ATA</p>
        <h1 className="text-2xl font-medium">Systeme</h1>
        <p className="mt-1 text-sm text-muted">Kapitel-Übersicht. Schematics in der Detailansicht.</p>
      </header>
      <ul className="grid gap-2 sm:grid-cols-2">
        {ATA_SYSTEMS.map((s) => (
          <li key={s.id}>
            <Link to="/ata/$id" params={{ id: s.id }} className="block rounded-lg border border-border bg-surface px-4 py-3 hover:border-accent">
              <span className="font-mono text-xs text-accent">ATA {s.chapter}</span>
              <span className="mt-0.5 block font-medium">{s.title}</span>
              <span className="block text-sm text-muted">{s.titleDe}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
