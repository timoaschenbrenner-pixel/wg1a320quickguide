import type { BellyPanel } from "./types";

export const FAIRING_SHEETS = [
  { id: 1 as const, title: "Links", side: "LH", fig: "06-41-53-15500", fsn: "FSN ALL", src: "/fairings/sheet-1.webp" },
  { id: 2 as const, title: "Rechts", side: "RH", fig: "06-41-53-15600", fsn: "FSN ALL", src: "/fairings/sheet-2.webp" },
];

const L = (
  id: string, nameDe: string, zone: string, frames: string, ata: string[], behind: string, x: number, y: number, note?: string,
): BellyPanel => ({
  id, designation: id, name: id, nameDe, side: "L", zone, frames, ata, behind, sheet: 1, x, y, note,
});
const R = (
  id: string, nameDe: string, zone: string, frames: string, ata: string[], behind: string, x: number, y: number, note?: string,
): BellyPanel => ({
  id, designation: id, name: id, nameDe, side: "R", zone, frames, ata, behind, sheet: 2, x, y, note,
});

export const BELLY_PANELS: BellyPanel[] = [
  L("191AT", "Zugang 191AT · FWD oben", "191", "FR36–FR42", ["53", "21"], "Pack 1, ACM, Ram-Air. Residual Heat.", 22, 28, "Packs OFF vor Öffnen."),
  L("191BT", "Zugang 191BT · FWD oben", "191", "FR36–FR42", ["53", "21"], "Pack 1 Ducts / Trim.", 30, 28),
  L("191AB", "Zugang 191AB · FWD außen", "191", "FR36–FR42", ["53", "21"], "Pack 1 seitlich.", 18, 42),
  L("191CB", "Zugang 191CB · FWD unten", "191", "FR36–FR42", ["53", "21"], "Pack 1 unten, Drain.", 24, 58),
  L("191BB", "Zugang 191BB", "191", "FR36–FR42", ["53", "21"], "Pack 1.", 32, 52),
  L("191EB", "Zugang 191EB · oben", "191", "FR38–FR44", ["53", "21"], "Pack 1 / Mix-Übergang.", 38, 32),
  L("191CT", "Zugang 191CT · oben", "191", "FR40–FR45", ["53", "21"], "Pack 1 AFT.", 44, 28),
  L("195AB", "Zugang 195AB · Mid", "195", "FR40–FR47", ["53", "21"], "Mid fairing, Mix-Ducts.", 48, 40),
  L("195CB", "Zugang 195CB · Mid", "195", "FR40–FR47", ["53"], "Mid fairing.", 52, 52),
  L("147CB", "Zugang 147CB · Center", "147", "FR35–FR47", ["53", "28", "29"], "Mix-Unit, Center Tank, Hyd-Rohre.", 58, 48),
  L("147AB", "Zugang 147AB · Center unten", "147", "FR35–FR47", ["53", "28"], "Center lower.", 56, 62),
  L("193AB", "Zugang 193AB · Mid-Aft", "193", "FR42–FR47", ["53", "29"], "Hyd-Leitungen, Wing TE.", 64, 40),
  L("193AT", "Zugang 193AT · Mid-Aft oben", "193", "FR42–FR47", ["53", "29"], "Hyd / bleed runs.", 66, 28),
  L("197FB", "Zugang 197FB · AFT oben", "197", "FR47–FR59", ["53", "38", "49"], "Waste/Water, APU-Fuel-Line.", 78, 30),
  L("197AB", "Zugang 197AB · AFT unten", "197", "FR47–FR59", ["53", "38"], "Waste tank / water service.", 80, 58, "Hygiene. Bonding."),
  L("197CB", "Zugang 197CB · AFT unten", "197", "FR50–FR59", ["53", "38"], "Waste/Water.", 84, 62),
  L("197EB", "Zugang 197EB · AFT hinten", "197", "FR54–FR59", ["53", "49"], "APU fuel line / aft fairing.", 88, 48),

  R("192AT", "Zugang 192AT · FWD oben", "192", "FR36–FR42", ["53", "21"], "Pack 2, ACM, Ram-Air. Residual Heat.", 22, 28, "Packs OFF vor Öffnen."),
  R("192AB", "Zugang 192AB · FWD", "192", "FR36–FR42", ["53", "21"], "Pack 2.", 24, 44),
  R("192BB", "Zugang 192BB", "192", "FR36–FR42", ["53", "21"], "Pack 2 unten.", 28, 56),
  R("196AB", "Zugang 196AB · Mid", "196", "FR40–FR47", ["53", "21"], "Mid fairing RH.", 48, 40),
  R("148CB", "Zugang 148CB · Center", "148", "FR35–FR47", ["53", "28", "29"], "Mix-Unit RH, Fuel/Hyd.", 58, 48),
  R("194AB", "Zugang 194AB · Mid-Aft", "194", "FR42–FR47", ["53", "29"], "Hyd Yellow/Green RH.", 64, 40),
  R("198DB", "Zugang 198DB · AFT", "198", "FR47–FR59", ["53", "38", "49"], "Waste/Water RH, APU-Fuel.", 80, 52),
  R("198AB", "Zugang 198AB · AFT unten", "198", "FR47–FR59", ["53", "38"], "Waste/Water RH.", 82, 62),
];

export function getBellyPanel(id: string) {
  return BELLY_PANELS.find((p) => p.id === id);
}
export function bellyZones(sheet: 1 | 2) {
  return [...new Set(BELLY_PANELS.filter((p) => p.sheet === sheet).map((p) => p.zone))];
}
