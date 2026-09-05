import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getReset } from "@/data/resets";
import { getCb } from "@/data/cbs";
import { StarButton } from "@/components/star-button";
import { Badge } from "@/components/ui/badge";
import { Disclaimer } from "@/components/disclaimer";

export const Route = createFileRoute("/resets_/$id")({ component: ResetDetail });

function ResetDetail() {
  const { id } = Route.useParams();
  const r = getReset(id);
  if (!r) throw notFound();
  return (
    <article className="space-y-6">
      <header className="flex items-start justify-between gap-3">
        <div>
          <p className="font-mono text-2xs tracking-[0.18em] text-accent">ATA {r.ata} · {r.kind.toUpperCase()}</p>
          <h1 className="text-2xl font-medium">{r.name}</h1>
          {r.ecam && <p className="mt-1 font-mono text-sm text-caution">{r.ecam}</p>}
        </div>
        <StarButton item={{ kind: "reset", id: r.id, title: r.name, href: `/resets/${r.id}` }} />
      </header>
      <Disclaimer compact />
      <dl className="grid gap-3 sm:grid-cols-2 text-sm">
        <div><dt className="text-2xs uppercase tracking-wide text-subtle">Wann</dt><dd>{r.when}</dd></div>
        <div><dt className="text-2xs uppercase tracking-wide text-subtle">Warten</dt><dd className="font-mono text-accent">{r.wait}</dd></div>
        <div className="sm:col-span-2"><dt className="text-2xs uppercase tracking-wide text-subtle">Danach</dt><dd>{r.after}</dd></div>
      </dl>
      <ol className="space-y-2">
        {r.steps.map((st) => (
          <li key={st.n} className="flex gap-3 rounded-lg border border-border bg-surface px-4 py-3">
            <span className="font-mono text-sm text-accent">{st.n}</span>
            <span className="text-sm">{st.text}</span>
          </li>
        ))}
      </ol>
      {r.relatedCbs && r.relatedCbs.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {r.relatedCbs.map((cid) => {
            const c = getCb(cid);
            return c ? <Link key={cid} to="/cbs" hash={c.id}><Badge tone="accent">{c.fin} {c.name}</Badge></Link> : null;
          })}
        </div>
      )}
      {r.amm && <p className="text-xs text-muted">{r.amm}</p>}
    </article>
  );
}
