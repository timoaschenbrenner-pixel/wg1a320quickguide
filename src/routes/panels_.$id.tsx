import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { getBellyPanel, BELLY_PANELS, FAIRING_SHEETS } from "@/data/fairings";
import { getPanel } from "@/data/panels";
import { FairingPlate } from "@/components/fairing-plate";
import { StarButton } from "@/components/star-button";
import { Badge } from "@/components/ui/badge";
import { Disclaimer } from "@/components/disclaimer";

export const Route = createFileRoute("/panels_/$id")({ component: PanelDetail });

function PanelDetail() {
  const { id } = Route.useParams();
  const belly = getBellyPanel(id);
  if (belly) return <BellyDetail id={id} />;
  const p = getPanel(id);
  if (!p) throw notFound();
  return (
    <article className="space-y-6">
      <header className="flex items-start justify-between gap-3">
        <div>
          <p className="font-mono text-2xs tracking-[0.18em] text-accent">{p.designation}</p>
          <h1 className="text-2xl font-medium">{p.nameDe}</h1>
          <p className="text-sm text-muted">{p.location}</p>
        </div>
        <StarButton item={{ kind: "panel", id: p.id, title: p.designation, href: `/panels/${p.id}` }} />
      </header>
      <Disclaimer compact />
      <div className="flex flex-wrap gap-1.5">{p.ata.map((a) => <Link key={a} to="/ata/$id" params={{ id: a }}><Badge tone="accent">ATA {a}</Badge></Link>)}</div>
      {p.notes && <p className="text-sm text-muted">{p.notes}</p>}
      {p.controls.length > 0 && (
        <ul className="divide-y divide-border rounded-lg border border-border bg-surface">
          {p.controls.map((c) => (
            <li key={c.label} className="px-4 py-2.5">
              <p className="text-sm font-medium">{c.label}</p>
              {c.note && <p className="text-sm text-muted">{c.note}</p>}
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}

function BellyDetail({ id }: { id: string }) {
  const p = getBellyPanel(id)!;
  const nav = useNavigate();
  const same = BELLY_PANELS.filter((x) => x.sheet === p.sheet);
  const meta = FAIRING_SHEETS.find((s) => s.id === p.sheet)!;
  return (
    <article className="space-y-6">
      <header className="flex items-start justify-between gap-3">
        <div>
          <p className="font-mono text-2xs tracking-[0.18em] text-accent">{p.designation} · Zone {p.zone}</p>
          <h1 className="text-2xl font-medium">{p.nameDe}</h1>
          <p className="text-sm text-muted">{p.frames} · {p.side === "L" ? "Links" : "Rechts"} · {meta.fig}</p>
        </div>
        <StarButton item={{ kind: "panel", id: p.id, title: p.designation, href: `/panels/${p.id}` }} />
      </header>
      <Disclaimer compact />
      <FairingPlate sheet={p.sheet} items={same} activeId={p.id} onSelect={(nid) => nav({ to: "/panels/$id", params: { id: nid } })} />
      <p className="text-sm text-muted">{p.behind}</p>
      {p.note && <p className="rounded-md border border-caution/30 bg-caution/8 px-3 py-2 text-sm">{p.note}</p>}
      <div className="flex flex-wrap gap-1.5">{p.ata.map((a) => <Link key={a} to="/ata/$id" params={{ id: a }}><Badge tone="accent">ATA {a}</Badge></Link>)}</div>
      <section>
        <h2 className="mb-2 font-mono text-2xs uppercase tracking-wide text-subtle">Gleiche Zone</h2>
        <div className="flex flex-wrap gap-2">
          {BELLY_PANELS.filter((x) => x.zone === p.zone && x.id !== p.id).map((x) => (
            <Link key={x.id} to="/panels/$id" params={{ id: x.id }} className="rounded-sm border border-border px-2 py-1 font-mono text-xs hover:border-accent">{x.designation}</Link>
          ))}
        </div>
      </section>
    </article>
  );
}
