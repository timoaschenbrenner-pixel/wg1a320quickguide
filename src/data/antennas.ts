import type { AntennaItem } from "./types";

export const ANTENNA_SHEETS = [
  { id: 1 as const, title: "Oberseite", src: "/antennas/sheet-1.webp", fig: "05-50-00-991 Sh 1" },
  { id: 2 as const, title: "Unterseite", src: "/antennas/sheet-2.webp", fig: "05-50-00-991 Sh 2" },
];

export const ANTENNA_KINDS = [
  { id: "antenna" as const, label: "Antennen" },
  { id: "probe" as const, label: "Probes" },
  { id: "sensor" as const, label: "Sensoren" },
  { id: "light" as const, label: "Lichter" },
];

export const ANTENNAS: AntennaItem[] = [
  { id: "gps1", designation: "GPS 1", name: "GPS / MMR 1", location: "Crown FWD", ata: "34", kind: "antenna", side: "C", sheet: 1, x: 28, y: 42, note: "MMR. GPS option vs GPS-MMR mutually exclusive." },
  { id: "gps2", designation: "GPS 2", name: "GPS / MMR 2", location: "Crown FWD", ata: "34", kind: "antenna", side: "C", sheet: 1, x: 32, y: 42 },
  { id: "vhf1", designation: "VHF 1", name: "VHF Comm 1", location: "Crown", ata: "23", kind: "antenna", side: "C", sheet: 1, x: 40, y: 40, frequency: "118–137 MHz" },
  { id: "vhf2", designation: "VHF 2", name: "VHF Comm 2", location: "Belly", ata: "23", kind: "antenna", side: "C", sheet: 2, x: 42, y: 48, frequency: "118–137 MHz" },
  { id: "vhf3", designation: "VHF 3", name: "VHF Comm 3", location: "Crown AFT", ata: "23", kind: "antenna", side: "C", sheet: 1, x: 62, y: 40 },
  { id: "tcas-up", designation: "TCAS UP", name: "TCAS directional upper", location: "Crown", ata: "34", kind: "antenna", side: "C", sheet: 1, x: 50, y: 38 },
  { id: "tcas-dn", designation: "TCAS DN", name: "TCAS directional lower", location: "Belly", ata: "34", kind: "antenna", side: "C", sheet: 2, x: 50, y: 50 },
  { id: "atc1", designation: "ATC 1", name: "Transponder 1", location: "Belly", ata: "34", kind: "antenna", side: "C", sheet: 2, x: 36, y: 52 },
  { id: "atc2", designation: "ATC 2", name: "Transponder 2", location: "Crown", ata: "34", kind: "antenna", side: "C", sheet: 1, x: 56, y: 40 },
  { id: "adf", designation: "ADF", name: "ADF Loop/Sense", location: "Belly FWD", ata: "34", kind: "antenna", side: "C", sheet: 2, x: 24, y: 48, optional: true },
  { id: "vor-l", designation: "VOR L", name: "VOR/LOC", location: "VS / Tail", ata: "34", kind: "antenna", side: "L", sheet: 1, x: 88, y: 30 },
  { id: "gs", designation: "G/S", name: "Glide Slope", location: "Nase unter Windschutz", ata: "34", kind: "antenna", side: "C", sheet: 1, x: 12, y: 48 },
  { id: "loc", designation: "LOC", name: "Localizer", location: "Nase", ata: "34", kind: "antenna", side: "C", sheet: 1, x: 10, y: 44 },
  { id: "ra1", designation: "RA 1", name: "Radio Altimeter 1", location: "Belly", ata: "34", kind: "antenna", side: "L", sheet: 2, x: 46, y: 58 },
  { id: "ra2", designation: "RA 2", name: "Radio Altimeter 2", location: "Belly", ata: "34", kind: "antenna", side: "R", sheet: 2, x: 54, y: 58 },
  { id: "wxr", designation: "WXR", name: "Weather Radar", location: "Radome FR1", ata: "34", kind: "antenna", side: "C", sheet: 1, x: 6, y: 44 },
  { id: "elt", designation: "ELT", name: "Emergency Locator", location: "Crown AFT", ata: "23", kind: "antenna", side: "C", sheet: 1, x: 78, y: 38 },
  { id: "satcom", designation: "SATCOM", name: "SATCOM (opt)", location: "Crown", ata: "23", kind: "antenna", side: "C", sheet: 1, x: 70, y: 36, optional: true },
  { id: "marker", designation: "MKR", name: "Marker Beacon", location: "Belly FWD", ata: "34", kind: "antenna", side: "C", sheet: 2, x: 30, y: 50 },
  { id: "dme", designation: "DME", name: "DME", location: "Belly", ata: "34", kind: "antenna", side: "C", sheet: 2, x: 40, y: 54 },
  { id: "pitot-l", designation: "PITOT L", name: "Pitot Captain", location: "Nase LH", ata: "34", kind: "probe", side: "L", sheet: 1, x: 14, y: 36 },
  { id: "pitot-r", designation: "PITOT R", name: "Pitot F/O", location: "Nase RH", ata: "34", kind: "probe", side: "R", sheet: 1, x: 14, y: 56 },
  { id: "pitot-s", designation: "PITOT STBY", name: "Pitot Standby", location: "Nase", ata: "34", kind: "probe", side: "C", sheet: 1, x: 16, y: 46 },
  { id: "aoa-l", designation: "AOA L", name: "AOA Captain", location: "Nase LH", ata: "34", kind: "probe", side: "L", sheet: 1, x: 18, y: 34 },
  { id: "aoa-r", designation: "AOA R", name: "AOA F/O", location: "Nase RH", ata: "34", kind: "probe", side: "R", sheet: 1, x: 18, y: 58 },
  { id: "tat", designation: "TAT", name: "Total Air Temperature", location: "Nase", ata: "34", kind: "probe", side: "C", sheet: 1, x: 20, y: 44 },
  { id: "static-l", designation: "STATIC L", name: "Static ports", location: "FWD fuselage LH", ata: "34", kind: "sensor", side: "L", sheet: 1, x: 22, y: 32 },
  { id: "static-r", designation: "STATIC R", name: "Static ports", location: "FWD fuselage RH", ata: "34", kind: "sensor", side: "R", sheet: 1, x: 22, y: 60 },
  { id: "beacon-top", designation: "BEACON", name: "Anti-collision upper", location: "Crown", ata: "33", kind: "light", side: "C", sheet: 1, x: 48, y: 36 },
  { id: "beacon-bot", designation: "BEACON BOT", name: "Anti-collision lower", location: "Belly", ata: "33", kind: "light", side: "C", sheet: 2, x: 48, y: 44 },
  { id: "logo", designation: "LOGO", name: "Logo light", location: "VS / Tail", ata: "33", kind: "light", side: "C", sheet: 1, x: 90, y: 34 },
];

export function getAntenna(id: string) {
  return ANTENNAS.find((a) => a.id === id);
}
