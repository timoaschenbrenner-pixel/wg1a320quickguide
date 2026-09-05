export type AtaId = string;

export type ComponentItem = { name: string; fin?: string; note: string };
export type ConfigItem = { label: string; state: string };
export type SystemConfig = { id: string; name: string; when: string; items: ConfigItem[] };
export type DataTable = { title: string; headers: string[]; rows: string[][] };

export type AtaSystem = {
  id: AtaId;
  chapter: string;
  title: string;
  titleDe: string;
  summary: string;
  functions: string[];
  computers: ComponentItem[];
  components: ComponentItem[];
  panels: string[];
  buses: string[];
  notes: string[];
  relatedResets: string[];
  relatedCbs: string[];
  configs?: SystemConfig[];
  tables?: DataTable[];
};

export type PanelZone =
  | "overhead"
  | "glareshield"
  | "mip"
  | "pedestal"
  | "cockpit-side"
  | "avionics"
  | "external"
  | "cargo"
  | "wing-gear";

export type PanelControl = {
  label: string;
  type: "pb" | "knob" | "switch" | "guard" | "display" | "handle" | "cb";
  note?: string;
};

export type CockpitPanel = {
  id: string;
  designation: string;
  name: string;
  nameDe: string;
  zone: PanelZone;
  ata: string[];
  location: string;
  controls: PanelControl[];
  notes?: string;
};

export type FairingSide = "L" | "R";

export type BellyPanel = {
  id: string;
  designation: string;
  name: string;
  nameDe: string;
  side: FairingSide;
  zone: string;
  frames: string;
  ata: string[];
  behind: string;
  note?: string;
  sheet: 1 | 2;
  x: number;
  y: number;
};

export type AntennaKind = "antenna" | "probe" | "sensor" | "light";
export type AntennaSheet = 1 | 2;

export type AntennaItem = {
  id: string;
  designation: string;
  name: string;
  location: string;
  ata: string;
  kind: AntennaKind;
  side: "L" | "R" | "C";
  sheet: AntennaSheet;
  frequency?: string;
  note?: string;
  optional?: boolean;
  x: number;
  y: number;
};

export type CircuitBreaker = {
  id: string;
  fin: string;
  name: string;
  nameDe: string;
  panel: string;
  bus: string;
  ata: string;
  rating?: string;
  note?: string;
};

export type ResetStep = { n?: number; text: string };

export type SystemReset = {
  id: string;
  name: string;
  ata: string;
  kind: "cb" | "computer" | "switch" | "procedure";
  when: string;
  wait: string;
  after: string;
  steps: ResetStep[];
  ecam?: string;
  config?: string;
  pass?: string;
  fail?: string;
  amm?: string;
  mel?: string;
  aliases?: string[];
  source?: string;
  hot?: boolean;
  relatedCbs?: string[];
};

export type SchematicFig = {
  id: string;
  src: string;
  fig: string;
  title: string;
  ata: string[];
};

export type SearchKind = "ata" | "panel" | "antenna" | "cb" | "reset";
export type SearchHit = {
  kind: SearchKind;
  id: string;
  title: string;
  subtitle: string;
  href: string;
};
