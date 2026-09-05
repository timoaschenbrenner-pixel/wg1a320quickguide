import { b as useRouter, v as Link, x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Star, c as PanelsTopLeft, d as CircuitBoard, f as BookOpen, p as Antenna, s as RotateCcw } from "../_libs/lucide-react.mjs";
import { C as BELLY_PANELS, d as ANTENNAS, j as ATA_SYSTEMS, l as CBS, s as RESETS } from "./router-CBE5hgbZ.mjs";
import { t as Disclaimer } from "./disclaimer-DKxL-wCV.mjs";
import { t as useFavorites } from "./favorites-Df1L7mxm.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-D9dItvzR.js
var import_jsx_runtime = require_jsx_runtime();
function AppLink({ href, className, children }) {
	const router = useRouter();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
		href,
		className,
		onClick: (e) => {
			if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
			e.preventDefault();
			router.history.push(href);
		},
		children
	});
}
var MODULES = [
	{
		to: "/ata",
		title: "ATA Systeme",
		body: "Kapitel 00–80. Funktion, Computer, Konfigs.",
		icon: BookOpen,
		meta: `${ATA_SYSTEMS.length} Kapitel`
	},
	{
		to: "/panels",
		title: "Belly & Frames",
		body: "Kielverkleidung, Spante, Stationen, Cockpit-VU.",
		icon: PanelsTopLeft,
		meta: `${BELLY_PANELS.length} Zugangstafeln`
	},
	{
		to: "/antennas",
		title: "Antennen",
		body: "AMM-Lageplan Ober-/Unterseite, Probes, Lichter.",
		icon: Antenna,
		meta: `${ANTENNAS.length} Antennen`
	},
	{
		to: "/cbs",
		title: "Circuit Breakers",
		body: "49VU, 121/122VU, FIN, Bus, Rating.",
		icon: CircuitBoard,
		meta: `${CBS.length} Line-CBs`
	},
	{
		to: "/resets",
		title: "Quick Reset",
		body: "ELAC, FMGC, ADIRU, CIDS, GCU, BSCU…",
		icon: RotateCcw,
		meta: `${RESETS.length} Resets`
	}
];
var HOT = [
	{
		href: "/resets/elac",
		label: "ELAC Reset",
		tag: "27"
	},
	{
		href: "/resets/cids",
		label: "CIDS Reset",
		tag: "23"
	},
	{
		href: "/resets/adiru",
		label: "ADIRU Align",
		tag: "34"
	},
	{
		href: "/resets/aevc",
		label: "AEVC / Vent",
		tag: "21"
	},
	{
		href: "/resets/gcu",
		label: "GCU / GEN",
		tag: "24"
	},
	{
		href: "/resets/bscu",
		label: "BSCU",
		tag: "32"
	},
	{
		href: "/ata/21",
		label: "Avionics Vent Konfig",
		tag: "21"
	},
	{
		href: "/panels#FR36",
		label: "FR36 Pack-Bay",
		tag: "53"
	}
];
function Home() {
	const favs = useFavorites((s) => s.items);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "relative overflow-hidden rounded-xl border border-border bg-surface px-5 py-8 hangar-grid",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-2xs tracking-[0.22em] text-accent",
						children: "LHT MUC · WERKGRUPPE 1 · LINE"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
						className: "mt-2 max-w-xl text-3xl font-medium tracking-tight",
						children: ["A320 Family", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block text-muted",
							children: "Schnellübersicht am Gate"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 max-w-lg text-sm text-muted",
						children: "A318 / A319 / A320 / A321 · CFM56-5. Erste Orientierung für Fluggerätmechaniker – ATA, Panels, Antennen, CBs und gängige Resets."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 font-mono text-2xs text-subtle",
						children: "Quelle: A3 Schematic Manual L3 · Training only · AMM/TSM/CBL führen"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Disclaimer, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mb-3 font-mono text-2xs uppercase tracking-[0.16em] text-subtle",
				children: "Direkt"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex gap-2 overflow-x-auto pb-1",
				children: HOT.map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppLink, {
					href: h.href,
					className: "inline-flex h-11 shrink-0 items-center gap-2 rounded-md border border-border bg-surface px-3 text-sm hover:border-border-strong hover:bg-elevated",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-mono text-2xs text-accent",
						children: h.tag
					}), h.label]
				}, h.href))
			})] }),
			favs.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
				className: "mb-3 flex items-center gap-2 font-mono text-2xs uppercase tracking-[0.16em] text-subtle",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "size-3.5" }), " Favoriten"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "grid gap-2 sm:grid-cols-2",
				children: favs.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppLink, {
					href: f.href,
					className: "block rounded-lg border border-border bg-surface px-4 py-3 text-sm hover:border-accent",
					children: f.title
				}) }, `${f.kind}-${f.id}`))
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-3",
				children: MODULES.map((m) => {
					const Icon = m.icon;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: m.to,
						className: "group rounded-xl border border-border bg-surface p-5 transition-colors hover:border-border-strong hover:bg-elevated",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-5 text-accent" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-3 font-medium",
								children: m.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-muted",
								children: m.body
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 font-mono text-2xs text-subtle",
								children: m.meta
							})
						]
					}, m.to);
				})
			})
		]
	});
}
//#endregion
export { Home as component };
