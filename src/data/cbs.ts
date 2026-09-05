import type { CircuitBreaker } from "./types";

export const CBS: CircuitBreaker[] = [
  { id: "elac1", fin: "5CC", name: "ELAC 1", nameDe: "ELAC 1", panel: "49VU", bus: "AC ESS", ata: "27", rating: "5A" },
  { id: "elac2", fin: "6CC", name: "ELAC 2", nameDe: "ELAC 2", panel: "49VU", bus: "AC2", ata: "27", rating: "5A" },
  { id: "sec1", fin: "7CC", name: "SEC 1", nameDe: "SEC 1", panel: "49VU", bus: "AC ESS", ata: "27" },
  { id: "sec2", fin: "8CC", name: "SEC 2", nameDe: "SEC 2", panel: "49VU", bus: "AC2", ata: "27" },
  { id: "sec3", fin: "9CC", name: "SEC 3", nameDe: "SEC 3", panel: "49VU", bus: "AC1", ata: "27" },
  { id: "fac1", fin: "5CA", name: "FAC 1", nameDe: "FAC 1", panel: "49VU", bus: "AC ESS", ata: "22" },
  { id: "fac2", fin: "6CA", name: "FAC 2", nameDe: "FAC 2", panel: "49VU", bus: "AC2", ata: "22" },
  { id: "fmgc1", fin: "1CA", name: "FMGC 1", nameDe: "FMGC 1", panel: "49VU", bus: "AC ESS", ata: "22" },
  { id: "fmgc2", fin: "2CA", name: "FMGC 2", nameDe: "FMGC 2", panel: "49VU", bus: "AC2", ata: "22" },
  { id: "adiru1", fin: "1FP", name: "ADIRU 1", nameDe: "ADIRU 1", panel: "49VU", bus: "AC ESS", ata: "34" },
  { id: "adiru2", fin: "2FP", name: "ADIRU 2", nameDe: "ADIRU 2", panel: "49VU", bus: "AC2", ata: "34" },
  { id: "adiru3", fin: "3FP", name: "ADIRU 3", nameDe: "ADIRU 3", panel: "49VU", bus: "AC1", ata: "34" },
  { id: "cids1", fin: "1WN", name: "CIDS 1", nameDe: "CIDS DIR 1", panel: "121VU", bus: "AC1", ata: "23" },
  { id: "cids2", fin: "2WN", name: "CIDS 2", nameDe: "CIDS DIR 2", panel: "122VU", bus: "AC2", ata: "23" },
  { id: "acsc1", fin: "10HN", name: "ACSC 1", nameDe: "ACSC 1", panel: "49VU", bus: "AC1", ata: "21" },
  { id: "acsc2", fin: "11HN", name: "ACSC 2", nameDe: "ACSC 2", panel: "49VU", bus: "AC2", ata: "21" },
  { id: "aevc", fin: "1HQ", name: "AEVC", nameDe: "Avionics Vent", panel: "49VU", bus: "DC1", ata: "21" },
  { id: "bscu", fin: "1GG", name: "BSCU", nameDe: "BSCU", panel: "49VU", bus: "DC1", ata: "32" },
  { id: "lgciu1", fin: "5GA", name: "LGCIU 1", nameDe: "LGCIU 1", panel: "49VU", bus: "DC ESS", ata: "32" },
  { id: "lgciu2", fin: "6GA", name: "LGCIU 2", nameDe: "LGCIU 2", panel: "49VU", bus: "DC2", ata: "32" },
  { id: "gcu1", fin: "1XU", name: "GCU 1", nameDe: "GCU IDG 1", panel: "121VU", bus: "DC1", ata: "24" },
  { id: "gcu2", fin: "2XU", name: "GCU 2", nameDe: "GCU IDG 2", panel: "122VU", bus: "DC2", ata: "24" },
  { id: "bmc1", fin: "10HL", name: "BMC 1", nameDe: "BMC 1", panel: "49VU", bus: "DC2", ata: "36" },
  { id: "bmc2", fin: "11HL", name: "BMC 2", nameDe: "BMC 2", panel: "49VU", bus: "DC ESS", ata: "36" },
  { id: "fwc1", fin: "1WW", name: "FWC 1", nameDe: "FWC 1", panel: "49VU", bus: "DC ESS", ata: "31" },
  { id: "fwc2", fin: "2WW", name: "FWC 2", nameDe: "FWC 2", panel: "49VU", bus: "DC2", ata: "31" },
  { id: "sdac1", fin: "1WX", name: "SDAC 1", nameDe: "SDAC 1", panel: "49VU", bus: "DC ESS", ata: "31" },
  { id: "cvr", fin: "1WU", name: "CVR", nameDe: "CVR", panel: "121VU", bus: "AC ESS", ata: "31" },
  { id: "atsu", fin: "1T1", name: "ATSU", nameDe: "ATSU", panel: "121VU", bus: "AC1", ata: "46" },
  { id: "apu", fin: "1KP", name: "APU ECB", nameDe: "APU ECB", panel: "49VU", bus: "DC BAT", ata: "49" },
  { id: "fadec1", fin: "1KS", name: "EIU 1 / FADEC", nameDe: "EIU 1", panel: "121VU", bus: "AC1", ata: "70" },
  { id: "fadec2", fin: "2KS", name: "EIU 2 / FADEC", nameDe: "EIU 2", panel: "122VU", bus: "AC2", ata: "70" },
  { id: "iggs", fin: "1WG", name: "IGGS / ICU", nameDe: "IGGS", panel: "121VU", bus: "AC1", ata: "47", note: "FIN 1WG – nicht doppelt." },
];

export function getCb(id: string) {
  return CBS.find((c) => c.id === id);
}
