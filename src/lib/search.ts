import { ATA_SYSTEMS } from "@/data/ata";
import { PANELS } from "@/data/panels";
import { BELLY_PANELS } from "@/data/fairings";
import { KEY_FRAMES, FUSELAGE_SECTIONS, STRINGER_BANDS, ATA_ZONES } from "@/data/stations";
import { ANTENNAS } from "@/data/antennas";
import { CBS } from "@/data/cbs";
import { RESETS } from "@/data/resets";
import { SCHEMATICS } from "@/data/schematics";
import type { SearchHit } from "@/data/types";

function hay(...parts: (string | undefined)[]) {
  return parts.filter(Boolean).join(" ").toLowerCase();
}
function match(q: string, text: string) {
  const tokens = q.toLowerCase().split(/\s+/).filter(Boolean);
  return tokens.every((t) => text.includes(t));
}

export function searchAll(query: string, limit = 40): SearchHit[] {
  const q = query.trim();
  if (q.length < 1) return [];
  const hits: SearchHit[] = [];

  for (const s of ATA_SYSTEMS) {
    if (match(q, hay(s.chapter, s.title, s.titleDe, s.summary))) {
      hits.push({ kind: "ata", id: s.id, title: `ATA ${s.chapter} ${s.title}`, subtitle: s.titleDe, href: `/ata/${s.id}` });
    }
  }
  for (const f of SCHEMATICS) {
    if (match(q, hay(`fig ${f.fig}`, f.title, ...f.ata, "schematic"))) {
      hits.push({ kind: "ata", id: f.id, title: `Fig ${f.fig}  ${f.title}`, subtitle: `ATA ${f.ata[0]} Schematic`, href: `/ata/${f.ata[0]}#${f.id}` });
    }
  }
  for (const p of PANELS) {
    if (match(q, hay(p.designation, p.name, p.nameDe, p.location))) {
      hits.push({ kind: "panel", id: p.id, title: p.designation, subtitle: `${p.nameDe} · ${p.location}`, href: `/panels/${p.id}` });
    }
  }
  for (const p of BELLY_PANELS) {
    if (match(q, hay(p.designation, p.nameDe, p.zone, p.frames, p.behind))) {
      hits.push({ kind: "panel", id: p.id, title: p.designation, subtitle: `${p.nameDe} · Zone ${p.zone}`, href: `/panels/${p.id}` });
    }
  }
  for (const f of KEY_FRAMES) {
    if (match(q, hay(f.fr, f.sta, f.where, f.note, "frame", "station"))) {
      hits.push({ kind: "panel", id: f.id, title: f.sta !== "—" ? `${f.fr}  STA ${f.sta}` : f.fr, subtitle: f.where, href: `/panels#${f.id}` });
    }
  }
  for (const s of FUSELAGE_SECTIONS) {
    if (match(q, hay(s.name, s.nameDe, s.amm, s.note, "sektion"))) {
      hits.push({ kind: "panel", id: s.id, title: s.nameDe, subtitle: s.amm, href: "/panels#stations" });
    }
  }
  for (const b of STRINGER_BANDS) {
    if (match(q, hay(b.range, b.nameDe, b.note, "stringer", "stgr"))) {
      hits.push({ kind: "panel", id: b.id, title: b.range, subtitle: b.nameDe, href: "/panels#STGR" });
    }
  }
  for (const z of ATA_ZONES) {
    if (match(q, hay(z.range, z.nameDe, "zone"))) {
      hits.push({ kind: "panel", id: z.id, title: `Zone ${z.range}`, subtitle: z.nameDe, href: "/panels#stations" });
    }
  }
  for (const a of ANTENNAS) {
    if (match(q, hay(a.name, a.designation, a.location, a.ata, a.kind))) {
      hits.push({ kind: "antenna", id: a.id, title: a.designation, subtitle: `${a.name} · ${a.location}`, href: `/antennas#${a.id}` });
    }
  }
  for (const c of CBS) {
    if (match(q, hay(c.fin, c.name, c.nameDe, c.panel, c.bus, c.ata))) {
      hits.push({ kind: "cb", id: c.id, title: `${c.fin}  ${c.name}`, subtitle: `${c.panel} · ${c.bus}`, href: `/cbs#${c.id}` });
    }
  }
  for (const r of RESETS) {
    if (match(q, hay(r.name, r.when, r.after, r.ata, r.ecam, ...(r.aliases ?? [])))) {
      hits.push({ kind: "reset", id: r.id, title: r.name, subtitle: `ATA ${r.ata} · ${r.wait}`, href: `/resets/${r.id}` });
    }
  }
  return hits.slice(0, limit);
}
