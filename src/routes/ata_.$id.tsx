import type { ReactNode } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getAta } from "@/data/ata";
import { StarButton } from "@/components/star-button";
import { Badge } from "@/components/ui/badge";
import { SchematicGallery } from "@/components/schematic-gallery";
import { getReset } from "@/data/resets";
import { getCb } from "@/data/cbs";
import { getPanel } from "@/data/panels";
import { getBellyPanel } from "@/data/fairings";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/ata_/$id")({ component: AtaDetail });

function AtaDetail() {
  const { id } = Route.useParams();
  const sys = getAta(id);
  if (!sys) throw notFound();

  return (
    <article className="space-y-8">
      <header className="flex items-start justify-between gap-3">
        <div>
          <p className="font-mono text-2xs tracking-[0.18em] text-accent">ATA {sys.chapter}</p>
          <h1 className="text-2xl font-medium tracking-tight">{sys.title}</h1>
          <p className="text-muted">{sys.titleDe}</p>
        </div>
        <StarButton item={{ kind: "ata", id: sys.id, title: `ATA ${sys.chapter} ${sys.title}`, href: `/ata/${sys.id}` }} />
      </header>
      <p className="max-w-2xl text-pretty text-sm leading-relaxed text-muted">{sys.summary}</p>
      <SchematicGallery ata={sys.id} />
      {sys.functions.length > 0 && (
        <Section title="Funktion">
          <ul className="space-y-2 text-sm">
            {sys.functions.map((f) => (
              <li key={f} className="flex gap-2"><span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />{f}</li>
            ))}
          </ul>
        </Section>
      )}
      {sys.configs && sys.configs.length > 0 && (
        <Section title="Konfigurationen">
          <div className="grid gap-3 sm:grid-cols-2">
            {sys.configs.map((c) => (
              <div key={c.id} className="rounded-lg border border-border bg-surface p-4">
                <h3 className="font-medium">{c.name}</h3>
                <p className="mt-0.5 text-xs text-muted">{c.when}</p>
                <ul className="mt-3 space-y-1.5">
                  {c.items.map((it) => (
                    <li key={it.label} className="flex items-center justify-between gap-2 text-sm">
                      <span className="text-muted">{it.label}</span>
                      <span className="font-mono text-2xs uppercase">{it.state}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>
      )}
      {sys.computers.length > 0 && (
        <Section title="Computer / LRU">
          <dl className="grid gap-2 sm:grid-cols-2">
            {sys.computers.map((c) => (
              <div key={c.name} className="rounded-md border border-border bg-surface px-3 py-2">
                <dt className="font-medium">{c.name} {c.fin && <span className="font-mono text-xs text-accent">{c.fin}</span>}</dt>
                <dd className="text-sm text-muted">{c.note}</dd>
              </div>
            ))}
          </dl>
        </Section>
      )}
      {sys.components.length > 0 && (
        <Section title="Komponenten">
          <ul className="divide-y divide-border overflow-hidden rounded-lg border border-border bg-surface">
            {sys.components.map((c) => (
              <li key={c.name} className="px-4 py-2.5">
                <p className="text-sm font-medium">{c.name}</p>
                <p className="text-sm text-muted">{c.note}</p>
              </li>
            ))}
          </ul>
        </Section>
      )}
      {sys.notes.length > 0 && (
        <Section title="Hinweise">
          <ul className="space-y-2 text-sm text-muted">
            {sys.notes.map((n) => (
              <li key={n} className="rounded-md border border-border bg-elevated px-3 py-2 text-fg/90">{n}</li>
            ))}
          </ul>
        </Section>
      )}
      {sys.panels.length > 0 && (
        <Section title="Panels">
          <div className="flex flex-wrap gap-2">
            {sys.panels.map((pid) => {
              const p = getPanel(pid) ?? getBellyPanel(pid);
              return (
                <Link key={pid} to="/panels/$id" params={{ id: p?.id ?? pid }} className="rounded-sm border border-border bg-surface px-2.5 py-1 font-mono text-xs hover:border-accent">
                  {p?.designation ?? pid}
                </Link>
              );
            })}
          </div>
        </Section>
      )}
      {sys.relatedResets.length > 0 && (
        <Section title="Resets">
          <ul className="grid gap-2 sm:grid-cols-2">
            {sys.relatedResets.map((rid) => {
              const r = getReset(rid);
              if (!r) return null;
              return (
                <li key={rid}>
                  <Link to="/resets/$id" params={{ id: r.id }} className="block rounded-md border border-border bg-surface px-3 py-2 hover:border-border-strong">
                    <span className="font-medium">{r.name}</span>
                    <span className="block text-xs text-muted">{r.wait}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </Section>
      )}
      {sys.relatedCbs.length > 0 && (
        <Section title="CBs">
          <div className="flex flex-wrap gap-2">
            {sys.relatedCbs.map((cid) => {
              const c = getCb(cid);
              return c ? <Badge key={cid} tone="accent">{c.fin} {c.name}</Badge> : null;
            })}
          </div>
        </Section>
      )}
    </article>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h2 className={cn("mb-3 font-mono text-2xs uppercase tracking-[0.16em] text-subtle")}>{title}</h2>
      {children}
    </section>
  );
}
