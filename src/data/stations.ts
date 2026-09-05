export const STATION_FIGS = [
  {
    id: "sec",
    src: "/stations/fig-001.webp",
    fig: "001 / 53-00-00",
    title: "Sektionen",
    caption: "Fuselage — Section Division. STA in mm. Nose → Tail Cone.",
  },
  {
    id: "skin",
    src: "/stations/fig-002.webp",
    fig: "002 / 53-00-00",
    title: "Hautfelder",
    caption: "Main Panel and Section Configuration. Oben LH, unten RH.",
  },
  {
    id: "frames",
    src: "/stations/fig-004.webp",
    fig: "003 / 53-00-00",
    title: "Frames / STA",
    caption: "Frame- und Station-Nummern. Alle STA-Maße in mm.",
  },
  {
    id: "frames-full",
    src: "/stations/fig-003.webp",
    fig: "003 / 53-00-00",
    title: "Frames beidseitig",
    caption: "FR/STA oben und unten am Rumpf. Bezug für Damage/Access.",
  },
  {
    id: "stgr",
    src: "/stations/fig-005.webp",
    fig: "06-30-00-11700",
    title: "Stringer",
    caption: "STGR 1–44 am Spant. Kabinenboden = STGR 20. FSN ALL.",
  },
] as const;

export type FuselageSection = {
  id: string;
  amm: string;
  name: string;
  nameDe: string;
  from: string;
  to: string;
  note: string;
};

export const FUSELAGE_SECTIONS: FuselageSection[] = [
  { id: "nose", amm: "53-10-00", name: "Nose / Forward", nameDe: "Nase / FWD Rumpf", from: "FR1 · STA 0", to: "FR24 · STA 6800", note: "Radome, Cockpit, FWD Pressure Bulkhead bei FR24. Avionics darunter." },
  { id: "fwd", amm: "53-20-00", name: "Forward Fuselage", nameDe: "Vorderrumpf", from: "FR24 · STA 6800", to: "FR35/36 · STA 10367 / 10804", note: "FWD Kabine, FWD Cargo, Pax-Tür 1 L/R. Übergang auf Center bei FR35/36." },
  { id: "center", amm: "53-30-00", name: "Center Fuselage", nameDe: "Mittelrumpf + Belly Fairing", from: "FR35/36 · STA 10367", to: "FR54 · STA 16415", note: "Wing Box, Belly Fairing (Pack-Bays), Overwing-Exits, Center Tank. FR47 STA 13808." },
  { id: "aft-ctr", amm: "53-30-00", name: "AFT Center", nameDe: "AFT Center", from: "FR54 · STA 16415", to: "FR65 · STA 19804", note: "MLG-Anschluss, AFT Cargo-Beginn. Hyd Green/Yellow im MLG-Bereich." },
  { id: "rear", amm: "53-40-00", name: "Rear Fuselage", nameDe: "Hinterrumpf", from: "FR65 · STA 19804", to: "FR80 · STA 24980", note: "AFT Pax-Tür, AFT Cargo, Rear Pressure Bulkhead Richtung FR70 STA 21647." },
  { id: "cone", amm: "53-50-00", name: "AFT Cone / Tail", nameDe: "Heckkonus / Tail", from: "FR80 · STA 24980", to: "FR94 · STA 29547", note: "APU-Bay, Tail Cone. FR84 STA 26347. VS/THS-Anschluss." },
];

export type FrameRef = { id: string; fr: string; sta: string; where: string; note: string };

export const KEY_FRAMES: FrameRef[] = [
  { id: "FR1", fr: "FR1", sta: "0", where: "Nase / Radome", note: "STA-Null. WXR hinter Radome." },
  { id: "FR11", fr: "FR11", sta: "3865", where: "Cockpit / FWD", note: "Windschutz, LOC/G/S-Nase dahinter." },
  { id: "FR16", fr: "FR16", sta: "—", where: "Pax Door 1", note: "FWD Pax L/R, typ. um FR16–20." },
  { id: "FR24", fr: "FR24", sta: "6800", where: "FWD Pressure Bulkhead", note: "Cockpit → Kabine. FWD Cargo beginnt. Avionics darunter." },
  { id: "FR35", fr: "FR35", sta: "10367", where: "Center-Beginn", note: "Übergang Forward → Center. Overwing-Nähe." },
  { id: "FR36", fr: "FR36", sta: "10804", where: "Wing LE / Belly FWD", note: "Pack-Bay FWD (Zonen 191/192). Belly-Tafeln ab hier." },
  { id: "FR42", fr: "FR42", sta: "—", where: "Wing Box Mitte", note: "Belly 191/195/147. Mix-Unit-Ducts, Fuel Center." },
  { id: "FR47", fr: "FR47", sta: "13808", where: "Wing TE / MLG FWD", note: "Belly 193/194/148. Hyd-Leitungen." },
  { id: "FR54", fr: "FR54", sta: "16415", where: "MLG / AFT Center", note: "Fahrwerkskasten. Belly AFT-Beginn 197/198." },
  { id: "FR57", fr: "FR57", sta: "—", where: "Belly AFT", note: "Waste/Water, APU-Fuel-Line unter der Fairing." },
  { id: "FR65", fr: "FR65", sta: "19804", where: "AFT Cargo / Pax 2", note: "Hinterrumpf-Beginn. AFT Pax-Tür in diesem Band." },
  { id: "FR70", fr: "FR70", sta: "21647", where: "Rear Pressure Bulkhead", note: "Druckende. AFT Cone danach unpressurized + APU." },
  { id: "FR80", fr: "FR80", sta: "24980", where: "APU / Cone", note: "APU-Bay-Beginn. FR84 STA 26347." },
  { id: "FR84", fr: "FR84", sta: "26347", where: "Tail Cone", note: "VS Front Spar-Nähe, APU-Zugang." },
  { id: "FR94", fr: "FR94", sta: "29547", where: "Heckabschluss", note: "Letzter Spant der Zeichnung. THS/VS." },
];

export type StringerBand = { id: string; range: string; nameDe: string; note: string };

export const STRINGER_BANDS: StringerBand[] = [
  { id: "crown", range: "STGR 1", nameDe: "First / Crown", note: "Oben Mitte (12 Uhr). Antennen GPS/VHF/TCAS auf der Crown." },
  { id: "upper", range: "STGR 2–9", nameDe: "Oberrumpf", note: "Crown bis Fensterband. Cabin-Ceiling, PSU-Bereich innen." },
  { id: "win", range: "STGR 10–13", nameDe: "Fensterband", note: "Cabin Windows. Y ≈ 1975. DEU-A, Window Seals." },
  { id: "to-floor", range: "STGR 14–19", nameDe: "Fenster → Boden", note: "Seitenwand, Dado Panel, Cabin-Floor-Anschluss bei STGR 20." },
  { id: "floor", range: "STGR 20", nameDe: "Kabinenboden", note: "Floor Grid. Darüber Cabin, darunter Cargo/Belly." },
  { id: "cargo", range: "STGR 21–32", nameDe: "Unterflur / Cargo", note: "Cargo-Liner, System-Runs (Elec, Air, Fuel, Hyd)." },
  { id: "lobe", range: "STGR 33–42", nameDe: "Lower Lobe", note: "Unterer Rumpf, Übergang Belly Fairing." },
  { id: "keel", range: "STGR 43–44", nameDe: "Kiel", note: "6 Uhr. Belly Fairing sitzt hier. Z ≈ 2166 an der Tafel." },
];

export const LOCATION_RULES: { id: string; title: string; body: string }[] = [
  { id: "zone", title: "Zone (3-stellig)", body: "ATA-Zone steht vorn in der Panel-FIN: 191AT → Zone 191. Ungerade = links, gerade = rechts (191 L / 192 R). 100er Nase/FWD, 140er Center-Lower, 190er Belly Fairing, 200 Flügel, 300 Leitwerk, 700 Fahrwerk." },
  { id: "fr", title: "Frame (FR)", body: "Spant, von der Nase nach hinten nummeriert. Damage, Access und Belly-Tafeln werden mit nächstem FR angegeben. FR24 Druckschott FWD, FR36 Wing/Pack, FR47 MLG, FR70 Druckschott AFT." },
  { id: "sta", title: "Station (STA)", body: "Längsmaße in Millimetern ab STA 0 (Nase). X-Achse des Flugzeugs. A319/A321 haben Rumpf-Plugs — STA hinter dem Center weicht ab. Immer AMM 53-00-00 des MSN." },
  { id: "stgr", title: "Stringer (STGR)", body: "Längsholme um den Spant. STGR 1 = oben, STGR 20 = Kabinenboden, STGR 43/44 = Kiel. LH und RH spiegeln (gleiche Nummer, andere Seite)." },
  { id: "xyz", title: "X / Y / Z", body: "X = längs (STA, positiv achtern). Y = quer, positiv rechts (RH). Z = hoch. AMM gibt Puncture/Dent oft als X/Y/Z in mm." },
  { id: "write", title: "Lage schreiben", body: "Kurz: „LH FR36 STGR 24 Zone 191“ oder Panel-FIN „191CB“. Seite zuerst, dann FR, dann STGR, dann Zone/Panel. Foto + PFR-ATA dazu." },
];

export const FINDING_EXAMPLE = {
  title: "Befund schreiben",
  lines: [
    "LH FR36–FR37 STGR 24  Zone 191",
    "180 mm aft FR36 · 40 mm below STGR 24",
    "DENT 2,1 mm deep · 45 × 30 mm",
  ],
  note: "Seite zuerst, dann FR, STGR, Zone/Panel. Foto + PFR-ATA. Tiefe/Abmessung in mm. AMM/SRM des MSN.",
};

export const FAMILY_NOTE =
  "A320-Tafel. A319 kürzer, A321 mit Plugs (u. a. FR35.1–FR35.8 FWD). STA hinter dem Center am MSN prüfen. AMM 53-00-00 / 06-00-00 des MSN ist führend.";

export const ATA_ZONES: { id: string; range: string; nameDe: string }[] = [
  { id: "z100", range: "100", nameDe: "Rumpf gesamt" },
  { id: "z110", range: "110", nameDe: "Nase / Radome" },
  { id: "z120", range: "120", nameDe: "Cockpit" },
  { id: "z130", range: "130", nameDe: "FWD Fuselage" },
  { id: "z140", range: "140", nameDe: "Center / Wing Box" },
  { id: "z147", range: "147 / 148", nameDe: "Center-Lower Mix/Fuel/Hyd" },
  { id: "z150", range: "150", nameDe: "AFT Fuselage" },
  { id: "z190", range: "191–198", nameDe: "Belly Fairing" },
  { id: "z200", range: "200", nameDe: "Flügel" },
  { id: "z300", range: "300", nameDe: "Leitwerk" },
  { id: "z400", range: "400", nameDe: "Nacelle / Pylon" },
  { id: "z500", range: "500", nameDe: "Türen" },
  { id: "z700", range: "700", nameDe: "Fahrwerk" },
];

export const SKIN_SECTIONS: { id: string; name: string; where: string }[] = [
  { id: "s1112", name: "SECTION 11/12", where: "Nase / FWD" },
  { id: "s1314", name: "SECTION 13/14", where: "FWD Kabine" },
  { id: "s14a", name: "SECTION 14A", where: "Übergang Center" },
  { id: "s1521", name: "SECTION 15/21", where: "Center / Wing Box" },
  { id: "s1617", name: "SECTION 16/17", where: "AFT Center" },
  { id: "s16a", name: "SECTION 16A", where: "AFT Center Zusatz" },
  { id: "s18", name: "SECTION 18", where: "Hinterrumpf" },
  { id: "s19", name: "SECTION 19", where: "AFT / Cone" },
  { id: "s191", name: "SECTION 19.1", where: "Tail Cone" },
];
