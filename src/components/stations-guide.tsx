import { useLayoutEffect, useMemo, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { ATA_ZONES, FAMILY_NOTE, FINDING_EXAMPLE, FUSELAGE_SECTIONS, KEY_FRAMES, LOCATION_RULES, SKIN_SECTIONS, STATION_FIGS, STRINGER_BANDS } from "@/data/stations";
import { StationPlate, FigChip } from "@/components/station-plate";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export function StationsGuide() {
  const [fig, setFig] = useState<string>(STATION_FIGS[0].id);
  const [q, setQ] = useState("");
  const [activeFr, setActiveFr] = useState<string | null>(null);
  const hash = useRouterState({ select: (s) => s.location.hash });

  useLayoutEffect(() => {
    const raw = (hash || (typeof window !== "undefined" ? window.location.hash : "")).replace("#", "").toUpperCase();
    if (!raw || raw === "STATIONS") return;
    const fr = KEY_FRAMES.find((f) => f.id === raw || f.fr === raw);
    if (fr) { setActiveFr(fr.id); setFig("frames"); }
    if (raw === "STGR" || raw.startsWith("STGR")) setFig("stgr");
    if (raw === "SEC" || raw === "SEKTION") setFig("sec");
    if (raw === "SKIN" || raw === "HAUT") setFig("skin");
  }, [hash]);

  const frames = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return KEY_FRAMES;
    return KEY_FRAMES.filter((f) => `${f.fr} ${f.sta} ${f.where} ${f.note}`.toLowerCase().includes(t));
  }, [q]);

  function pickFig(id: string) {
    setFig(id);
    const map: Record<string, string> = { stgr: "STGR", sec: "SEC", skin: "SKIN", frames: "stations", "frames-full": "stations" };
    history.replaceState(null, "", `#${map[id] ?? "stations"}`);
  }

  return (
    <div className="space-y-6">
      <p className="text-sm text-muted">Lage am Rumpf: Zone · Frame · Station (mm) · Stringer. Werte aus AMM 53-00-00 dieser Tafel.</p>
      <p className="rounded-lg border border-caution/35 bg-caution/8 px-4 py-3 text-sm">{FAMILY_NOTE}</p>
      <div className="flex gap-2 overflow-x-auto">
        {STATION_FIGS.map((f) => (
          <FigChip key={f.id} active={fig === f.id} onClick={() => pickFig(f.id)}>{f.title}</FigChip>
        ))}
      </div>
      <StationPlate figId={fig} />
      <section>
        <h2 className="mb-3 font-mono text-2xs uppercase tracking-[0.16em] text-subtle">Lage beschreiben</h2>
        <ul className="grid gap-2 sm:grid-cols-2">
          {LOCATION_RULES.map((r) => (
            <li key={r.id} className="rounded-lg border border-border bg-surface px-4 py-3">
              <p className="font-mono text-xs text-accent">{r.title}</p>
              <p className="mt-1 text-sm text-muted">{r.body}</p>
            </li>
          ))}
        </ul>
      </section>
      <section className="rounded-xl border border-accent/35 bg-accent/8 px-4 py-4">
        <h2 className="font-mono text-2xs uppercase tracking-[0.16em] text-accent">{FINDING_EXAMPLE.title}</h2>
        <pre className="mt-3 overflow-x-auto font-mono text-sm leading-relaxed">{FINDING_EXAMPLE.lines.join("\n")}</pre>
        <p className="mt-3 text-sm text-muted">{FINDING_EXAMPLE.note}</p>
      </section>
      <section>
        <h2 className="mb-3 font-mono text-2xs uppercase tracking-[0.16em] text-subtle">Zonen ATA 06</h2>
        <p className="mb-2 text-xs text-muted">Ungerade = links · gerade = rechts · x0 = Mitte</p>
        <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
          {ATA_ZONES.map((z) => (
            <li key={z.id} className="rounded-lg border border-border bg-surface px-3 py-2.5">
              <p className="font-mono text-xs text-accent">{z.range}</p>
              <p className="text-sm">{z.nameDe}</p>
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h2 className="mb-3 font-mono text-2xs uppercase tracking-[0.16em] text-subtle">Sektionen</h2>
        <ul className="grid gap-2">
          {FUSELAGE_SECTIONS.map((s) => (
            <li key={s.id} className="rounded-lg border border-border bg-surface px-4 py-3">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <p className="font-medium">{s.nameDe}</p>
                <span className="font-mono text-2xs text-accent">{s.amm}</span>
              </div>
              <p className="mt-1 font-mono text-xs text-muted">{s.from} → {s.to}</p>
              <p className="mt-1 text-sm text-muted">{s.note}</p>
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h2 className="mb-3 font-mono text-2xs uppercase tracking-[0.16em] text-subtle">Hautfelder Fig 002</h2>
        <ul className="grid gap-2 sm:grid-cols-2">
          {SKIN_SECTIONS.map((s) => (
            <li key={s.id} className="rounded-lg border border-border bg-surface px-4 py-2.5">
              <p className="font-mono text-xs text-accent">{s.name}</p>
              <p className="text-sm text-muted">{s.where}</p>
            </li>
          ))}
        </ul>
      </section>
      <section>
        <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="font-mono text-2xs uppercase tracking-[0.16em] text-subtle">Leit-Spante</h2>
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="FR36, Pack, STA 6800…" className="sm:max-w-xs" />
        </div>
        <ul className="overflow-hidden rounded-lg border border-border">
          {frames.map((f) => (
            <li key={f.id}>
              <button type="button" id={f.id} onClick={() => { setActiveFr(f.id); setFig("frames"); history.replaceState(null, "", `#${f.id}`); }}
                className={cn("grid w-full grid-cols-[4.5rem_1fr] gap-x-3 border-t border-border px-3 py-2.5 text-left sm:grid-cols-[4.5rem_6rem_1fr]", activeFr === f.id ? "bg-accent/10" : "bg-surface hover:bg-elevated")}>
                <span className="font-mono text-sm text-accent">{f.fr}</span>
                <span className="hidden font-mono text-xs text-muted sm:block">{f.sta}</span>
                <span>
                  <span className="block text-sm">{f.where}</span>
                  <span className="block text-xs text-muted">{f.sta !== "—" ? `STA ${f.sta} mm · ` : ""}{f.note}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h2 className="mb-3 font-mono text-2xs uppercase tracking-[0.16em] text-subtle">Stringer-Uhr</h2>
        <ul className="grid gap-2 sm:grid-cols-2">
          {STRINGER_BANDS.map((b) => (
            <li key={b.id} className="rounded-lg border border-border bg-surface px-4 py-3">
              <p className="font-mono text-xs text-accent">{b.range}</p>
              <p className="font-medium">{b.nameDe}</p>
              <p className="mt-1 text-sm text-muted">{b.note}</p>
            </li>
          ))}
        </ul>
      </section>
      <p className="text-xs text-muted">
        Belly-Tafeln sitzen unter STGR 43/44 zwischen FR28 und FR59.{" "}
        <Link to="/ata/$id" params={{ id: "53" }} className="text-accent hover:underline">ATA 53</Link>
        {" · "}
        <Link to="/panels" hash="belly" className="text-accent hover:underline">Belly Fairing</Link>
      </p>
    </div>
  );
}
