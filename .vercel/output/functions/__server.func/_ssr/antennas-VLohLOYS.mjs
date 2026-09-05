import { i as __toESM } from "../_runtime.mjs";
import { V as require_react, x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { l as Maximize2, r as X } from "../_libs/lucide-react.mjs";
import { a as cn, d as ANTENNAS, f as ANTENNA_KINDS, p as ANTENNA_SHEETS } from "./router-CBE5hgbZ.mjs";
import { t as Badge } from "./badge-DTxJD0v_.mjs";
import { t as Disclaimer } from "./disclaimer-DKxL-wCV.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/antennas-VLohLOYS.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var KIND_COLOR = {
	antenna: "bg-accent border-accent",
	probe: "bg-caution border-caution",
	sensor: "bg-ok border-ok",
	light: "bg-warn border-warn"
};
function AntennaPlate({ sheet, items, activeId, onSelect }) {
	const meta = ANTENNA_SHEETS.find((s) => s.id === sheet);
	const [open, setOpen] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (!open) return;
		const onKey = (e) => {
			if (e.key === "Escape") setOpen(false);
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [open]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "overflow-hidden rounded-xl border border-border bg-elevated",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between px-3 py-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "font-mono text-2xs text-subtle",
				children: [
					meta.fig,
					" · ",
					meta.title
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => setOpen(true),
				className: "flex h-11 items-center gap-1 px-2 text-xs",
				"aria-label": "Tafel vergrößern",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Maximize2, { className: "size-4" }), " Zoom"]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: meta.src,
				alt: meta.title,
				className: "block h-auto w-full"
			}), items.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => onSelect(a.id),
				style: {
					left: `${a.x}%`,
					top: `${a.y}%`
				},
				className: cn("absolute size-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2", KIND_COLOR[a.kind], a.id === activeId && "ring-2 ring-fg"),
				"aria-label": a.designation
			}, a.id))]
		})]
	}), open && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed inset-0 z-50 flex flex-col bg-bg/96",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "flex items-center justify-between px-3 py-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm",
				children: meta.title
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "size-11",
				onClick: () => setOpen(false),
				"aria-label": "Schließen",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "mx-auto size-5" })
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "min-h-0 flex-1 overflow-auto",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: meta.src,
				alt: meta.title,
				className: "w-full"
			})
		})]
	})] });
}
function AntennasPage() {
	const [sheet, setSheet] = (0, import_react.useState)(1);
	const [kind, setKind] = (0, import_react.useState)("all");
	const [active, setActive] = (0, import_react.useState)(ANTENNAS[0]?.id);
	const list = (0, import_react.useMemo)(() => ANTENNAS.filter((a) => a.sheet === sheet && (kind === "all" || a.kind === kind)), [sheet, kind]);
	const sel = ANTENNAS.find((a) => a.id === active) ?? list[0];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-2xs tracking-[0.18em] text-accent",
					children: "ATA 23 / 34 / 33"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-2xl font-medium",
					children: "Antennen · Probes · Sensoren"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted",
					children: "AMM 05-50-00-991. GPS option vs GPS-MMR nicht gleichzeitig."
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Disclaimer, { compact: true }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex gap-2 overflow-x-auto",
				children: ANTENNA_SHEETS.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setSheet(s.id),
					className: cn("h-11 shrink-0 rounded-full border px-4 text-sm", sheet === s.id ? "border-accent bg-accent/15 text-accent" : "border-border bg-surface text-muted"),
					children: s.title
				}, s.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2 overflow-x-auto",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
					active: kind === "all",
					onClick: () => setKind("all"),
					children: "Alle"
				}), ANTENNA_KINDS.map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
					active: kind === k.id,
					onClick: () => setKind(k.id),
					children: k.label
				}, k.id))]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AntennaPlate, {
				sheet,
				items: list,
				activeId: sel?.id,
				onSelect: setActive
			}),
			sel && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl border border-border bg-surface p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-xs text-accent",
						children: sel.designation
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-xl font-medium",
						children: sel.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-2 flex flex-wrap gap-1.5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
								tone: "accent",
								children: ["ATA ", sel.ata]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: sel.kind }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: sel.side === "C" ? "CL" : sel.side }),
							sel.optional && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								tone: "caution",
								children: "Option"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm text-muted",
						children: sel.location
					}),
					sel.frequency && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 font-mono text-xs text-subtle",
						children: sel.frequency
					}),
					sel.note && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm",
						children: sel.note
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "grid gap-2 sm:grid-cols-2",
				children: list.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => setActive(a.id),
					className: cn("w-full rounded-lg border px-4 py-3 text-left", a.id === sel?.id ? "border-accent bg-accent/10" : "border-border bg-surface"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-mono text-xs text-accent",
						children: a.designation
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "block text-sm",
						children: a.name
					})]
				}) }, a.id))
			})
		]
	});
}
function Chip({ active, onClick, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick,
		className: cn("h-9 shrink-0 rounded-full border px-3 text-xs", active ? "border-accent bg-accent/15 text-accent" : "border-border bg-surface text-muted"),
		children
	});
}
//#endregion
export { AntennasPage as component };
