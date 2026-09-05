import type { CockpitPanel, PanelZone } from "./types";

export const ZONE_META: Record<PanelZone, { labelDe: string; order: number }> = {
  overhead: { labelDe: "Overhead", order: 1 },
  glareshield: { labelDe: "Glareshield", order: 2 },
  mip: { labelDe: "MIP", order: 3 },
  pedestal: { labelDe: "Pedestal", order: 4 },
  "cockpit-side": { labelDe: "Seite", order: 5 },
  avionics: { labelDe: "Avionics", order: 6 },
  external: { labelDe: "External", order: 7 },
  cargo: { labelDe: "Cargo", order: 8 },
  "wing-gear": { labelDe: "Flügel / Gear", order: 9 },
};

export const PANELS: CockpitPanel[] = [
  { id: "20VU", designation: "20VU", name: "Overhead", nameDe: "Overhead Systempanels", zone: "overhead", ata: ["00"], location: "Overhead FWD", controls: [{ label: "System PBs", type: "pb" }], notes: "FWD fire/elec, AFT 49VU CBs." },
  { id: "13VU", designation: "13VU", name: "FCU / Glareshield", nameDe: "FCU Glareshield", zone: "glareshield", ata: ["22"], location: "Glareshield", controls: [{ label: "FCU", type: "knob" }] },
  { id: "8VU", designation: "8VU", name: "Pedestal", nameDe: "Center Pedestal", zone: "pedestal", ata: ["22", "23"], location: "Pedestal", controls: [{ label: "MCDU / RMP / ECP", type: "display" }] },
  { id: "105VU", designation: "105VU", name: "ENG / FIRE", nameDe: "ENG START / FIRE", zone: "overhead", ata: ["26", "70"], location: "Overhead FWD", controls: [{ label: "ENG MASTER", type: "switch" }, { label: "FIRE", type: "guard" }] },
  { id: "22VU", designation: "22VU", name: "ENG MAN START", nameDe: "Manual Start", zone: "overhead", ata: ["70"], location: "Overhead", controls: [{ label: "MAN START", type: "pb" }] },
  { id: "49VU", designation: "49VU", name: "CB Overhead AFT", nameDe: "CBs 49VU", zone: "overhead", ata: ["24"], location: "Overhead AFT", controls: [{ label: "CBs", type: "cb" }] },
  { id: "121VU", designation: "121VU", name: "CB Rear", nameDe: "CBs 121VU", zone: "avionics", ata: ["24"], location: "Rear CB panel", controls: [{ label: "CBs", type: "cb" }] },
  { id: "122VU", designation: "122VU", name: "CB Rear", nameDe: "CBs 122VU", zone: "avionics", ata: ["24"], location: "Rear CB panel", controls: [{ label: "CBs", type: "cb" }] },
  { id: "35VU", designation: "35VU", name: "Oxy / Misc", nameDe: "35VU", zone: "overhead", ata: ["35"], location: "Overhead", controls: [] },
  { id: "50VU", designation: "50VU", name: "Overhead AFT", nameDe: "50VU", zone: "overhead", ata: ["00"], location: "Overhead AFT", controls: [] },
];

export const OVERHEAD_LAYOUT = [
  { id: "105VU" }, { id: "20VU" }, { id: "22VU" }, { id: "49VU" },
  { id: "13VU" }, { id: "8VU" }, { id: "35VU" }, { id: "50VU" },
];

export function getPanel(id: string) {
  return PANELS.find((p) => p.id === id);
}
