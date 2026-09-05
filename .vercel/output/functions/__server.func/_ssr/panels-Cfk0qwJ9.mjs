import { i as __toESM } from "../_runtime.mjs";
import { V as require_react, d as useRouterState, v as Link, x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { l as Maximize2, n as ZoomOut, r as X, t as ZoomIn } from "../_libs/lucide-react.mjs";
import { C as BELLY_PANELS, D as OVERHEAD_LAYOUT, O as PANELS, S as STRINGER_BANDS, T as bellyZones, _ as FUSELAGE_SECTIONS, a as cn, b as SKIN_SECTIONS, g as FINDING_EXAMPLE, h as FAMILY_NOTE, k as ZONE_META, m as ATA_ZONES, v as KEY_FRAMES, w as FAIRING_SHEETS, x as STATION_FIGS, y as LOCATION_RULES } from "./router-CBE5hgbZ.mjs";
import { t as Badge } from "./badge-DTxJD0v_.mjs";
import { t as Disclaimer } from "./disclaimer-DKxL-wCV.mjs";
import { t as Input } from "./input-BMGMgrXH.mjs";
import { t as FairingPlate } from "./fairing-plate-CS_xaOKh.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/panels-Cfk0qwJ9.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var ZOOM = [
	1,
	1.5,
	2,
	2.5
];
function StationPlate({ figId }) {
	const meta = STATION_FIGS.find((f) => f.id === figId) ?? STATION_FIGS[0];
	const [open, setOpen] = (0, import_react.useState)(false);
	const [zoom, setZoom] = (0, import_react.useState)(1);
	(0, import_react.useEffect)(() => {
		if (!open) return;
		const prev = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		const onKey = (e) => {
			if (e.key === "Escape") setOpen(false);
		};
		window.addEventListener("keydown", onKey);
		return () => {
			document.body.style.overflow = prev;
			window.removeEventListener("keydown", onKey);
		};
	}, [open]);
	(0, import_react.useEffect)(() => {
		setZoom(1);
	}, [open, figId]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "overflow-hidden rounded-xl border border-border bg-elevated",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between gap-2 border-b border-border px-3 py-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "min-w-0 truncate font-mono text-2xs text-subtle",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-accent",
						children: ["Fig ", meta.fig]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mx-1.5 text-border-strong",
						children: "·"
					}),
					meta.caption
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => setOpen(true),
				className: "flex h-11 shrink-0 items-center gap-1.5 px-2 text-xs text-muted",
				"aria-label": "Tafel vergrößern",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Maximize2, { className: "size-4" }), " Zoom"]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			onClick: () => setOpen(true),
			className: "block w-full bg-fg",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: meta.src,
				alt: meta.caption,
				className: "mx-auto block h-auto max-h-[min(70vh,36rem)] w-full object-contain"
			})
		})]
	}), open && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed inset-0 z-50 flex flex-col bg-bg/96 pt-[env(safe-area-inset-top)]",
		role: "dialog",
		"aria-modal": "true",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "flex items-center gap-2 border-b border-border px-3 py-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "min-w-0 flex-1 truncate text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-mono text-accent",
							children: ["Fig ", meta.fig]
						}),
						" ",
						meta.title
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "size-11",
					disabled: ZOOM.indexOf(zoom) <= 0,
					onClick: () => setZoom(ZOOM[Math.max(0, ZOOM.indexOf(zoom) - 1)]),
					"aria-label": "Verkleinern",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ZoomOut, { className: "mx-auto size-5" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "size-11",
					disabled: ZOOM.indexOf(zoom) >= ZOOM.length - 1,
					onClick: () => setZoom(ZOOM[Math.min(ZOOM.length - 1, ZOOM.indexOf(zoom) + 1)]),
					"aria-label": "Vergrößern",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ZoomIn, { className: "mx-auto size-5" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "size-11",
					onClick: () => setOpen(false),
					"aria-label": "Schließen",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "mx-auto size-5" })
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "min-h-0 flex-1 overflow-auto bg-fg",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: meta.src,
				alt: meta.caption,
				className: "mx-auto block max-w-none",
				style: { width: `${zoom * 100}%` }
			})
		})]
	})] });
}
function FigChip({ active, onClick, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick,
		className: cn("h-11 shrink-0 rounded-full border px-3 text-xs", active ? "border-accent bg-accent/15 text-accent" : "border-border bg-surface text-muted"),
		children
	});
}
function StationsGuide() {
	const [fig, setFig] = (0, import_react.useState)(STATION_FIGS[0].id);
	const [q, setQ] = (0, import_react.useState)("");
	const [activeFr, setActiveFr] = (0, import_react.useState)(null);
	const hash = useRouterState({ select: (s) => s.location.hash });
	(0, import_react.useLayoutEffect)(() => {
		const raw = (hash || (typeof window !== "undefined" ? window.location.hash : "")).replace("#", "").toUpperCase();
		if (!raw || raw === "STATIONS") return;
		const fr = KEY_FRAMES.find((f) => f.id === raw || f.fr === raw);
		if (fr) {
			setActiveFr(fr.id);
			setFig("frames");
		}
		if (raw === "STGR" || raw.startsWith("STGR")) setFig("stgr");
		if (raw === "SEC" || raw === "SEKTION") setFig("sec");
		if (raw === "SKIN" || raw === "HAUT") setFig("skin");
	}, [hash]);
	const frames = (0, import_react.useMemo)(() => {
		const t = q.trim().toLowerCase();
		if (!t) return KEY_FRAMES;
		return KEY_FRAMES.filter((f) => `${f.fr} ${f.sta} ${f.where} ${f.note}`.toLowerCase().includes(t));
	}, [q]);
	function pickFig(id) {
		setFig(id);
		history.replaceState(null, "", `#${{
			stgr: "STGR",
			sec: "SEC",
			skin: "SKIN",
			frames: "stations",
			"frames-full": "stations"
		}[id] ?? "stations"}`);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "Lage am Rumpf: Zone · Frame · Station (mm) · Stringer. Werte aus AMM 53-00-00 dieser Tafel."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "rounded-lg border border-caution/35 bg-caution/8 px-4 py-3 text-sm",
				children: FAMILY_NOTE
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex gap-2 overflow-x-auto",
				children: STATION_FIGS.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FigChip, {
					active: fig === f.id,
					onClick: () => pickFig(f.id),
					children: f.title
				}, f.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StationPlate, { figId: fig }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mb-3 font-mono text-2xs uppercase tracking-[0.16em] text-subtle",
				children: "Lage beschreiben"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "grid gap-2 sm:grid-cols-2",
				children: LOCATION_RULES.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "rounded-lg border border-border bg-surface px-4 py-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-xs text-accent",
						children: r.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted",
						children: r.body
					})]
				}, r.id))
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-xl border border-accent/35 bg-accent/8 px-4 py-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-mono text-2xs uppercase tracking-[0.16em] text-accent",
						children: FINDING_EXAMPLE.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
						className: "mt-3 overflow-x-auto font-mono text-sm leading-relaxed",
						children: FINDING_EXAMPLE.lines.join("\n")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm text-muted",
						children: FINDING_EXAMPLE.note
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mb-3 font-mono text-2xs uppercase tracking-[0.16em] text-subtle",
					children: "Zonen ATA 06"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-2 text-xs text-muted",
					children: "Ungerade = links · gerade = rechts · x0 = Mitte"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4",
					children: ATA_ZONES.map((z) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "rounded-lg border border-border bg-surface px-3 py-2.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-xs text-accent",
							children: z.range
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm",
							children: z.nameDe
						})]
					}, z.id))
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mb-3 font-mono text-2xs uppercase tracking-[0.16em] text-subtle",
				children: "Sektionen"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "grid gap-2",
				children: FUSELAGE_SECTIONS.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "rounded-lg border border-border bg-surface px-4 py-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-baseline justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-medium",
								children: s.nameDe
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-2xs text-accent",
								children: s.amm
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 font-mono text-xs text-muted",
							children: [
								s.from,
								" → ",
								s.to
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted",
							children: s.note
						})
					]
				}, s.id))
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mb-3 font-mono text-2xs uppercase tracking-[0.16em] text-subtle",
				children: "Hautfelder Fig 002"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "grid gap-2 sm:grid-cols-2",
				children: SKIN_SECTIONS.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "rounded-lg border border-border bg-surface px-4 py-2.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-xs text-accent",
						children: s.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: s.where
					})]
				}, s.id))
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-3 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-mono text-2xs uppercase tracking-[0.16em] text-subtle",
					children: "Leit-Spante"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: q,
					onChange: (e) => setQ(e.target.value),
					placeholder: "FR36, Pack, STA 6800…",
					className: "sm:max-w-xs"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "overflow-hidden rounded-lg border border-border",
				children: frames.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					id: f.id,
					onClick: () => {
						setActiveFr(f.id);
						setFig("frames");
						history.replaceState(null, "", `#${f.id}`);
					},
					className: cn("grid w-full grid-cols-[4.5rem_1fr] gap-x-3 border-t border-border px-3 py-2.5 text-left sm:grid-cols-[4.5rem_6rem_1fr]", activeFr === f.id ? "bg-accent/10" : "bg-surface hover:bg-elevated"),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono text-sm text-accent",
							children: f.fr
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "hidden font-mono text-xs text-muted sm:block",
							children: f.sta
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block text-sm",
							children: f.where
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "block text-xs text-muted",
							children: [f.sta !== "—" ? `STA ${f.sta} mm · ` : "", f.note]
						})] })
					]
				}) }, f.id))
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mb-3 font-mono text-2xs uppercase tracking-[0.16em] text-subtle",
				children: "Stringer-Uhr"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "grid gap-2 sm:grid-cols-2",
				children: STRINGER_BANDS.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "rounded-lg border border-border bg-surface px-4 py-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-xs text-accent",
							children: b.range
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-medium",
							children: b.nameDe
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted",
							children: b.note
						})
					]
				}, b.id))
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-xs text-muted",
				children: [
					"Belly-Tafeln sitzen unter STGR 43/44 zwischen FR28 und FR59.",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/ata/$id",
						params: { id: "53" },
						className: "text-accent hover:underline",
						children: "ATA 53"
					}),
					" · ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/panels",
						hash: "belly",
						className: "text-accent hover:underline",
						children: "Belly Fairing"
					})
				]
			})
		]
	});
}
function tabFromHash(raw) {
	const id = raw.replace("#", "").toUpperCase();
	if (!id) return null;
	if (BELLY_PANELS.some((p) => p.id === id) || id === "BELLY" || id === "FAIRING") return "belly";
	if (id === "STATIONS" || id.startsWith("FR") || id.startsWith("STGR") || id === "SEC" || id === "SEKTION" || id === "SKIN" || id === "HAUT") return "stations";
	if (id === "COCKPIT" || id === "VU") return "cockpit";
	return null;
}
function PanelsPage() {
	const [tab, setTab] = (0, import_react.useState)("belly");
	const [sheet, setSheet] = (0, import_react.useState)(1);
	const [zone, setZone] = (0, import_react.useState)("all");
	const [q, setQ] = (0, import_react.useState)("");
	const [active, setActive] = (0, import_react.useState)(BELLY_PANELS[0]?.id ?? "191AT");
	(0, import_react.useLayoutEffect)(() => {
		function apply() {
			const raw = window.location.hash.replace("#", "");
			const next = tabFromHash(raw);
			if (next) setTab(next);
			const id = raw.toUpperCase();
			const hit = BELLY_PANELS.find((p) => p.id === id);
			if (hit) {
				setSheet(hit.sheet);
				setActive(hit.id);
			}
		}
		apply();
		window.addEventListener("hashchange", apply);
		return () => window.removeEventListener("hashchange", apply);
	}, []);
	const onSheet = (0, import_react.useMemo)(() => BELLY_PANELS.filter((p) => p.sheet === sheet), [sheet]);
	const zones = bellyZones(sheet);
	const list = (0, import_react.useMemo)(() => {
		const t = q.trim().toLowerCase();
		return onSheet.filter((p) => {
			if (zone !== "all" && p.zone !== zone) return false;
			if (!t) return true;
			return `${p.designation} ${p.nameDe} ${p.behind} ${p.frames} ${p.ata.join(" ")}`.toLowerCase().includes(t);
		});
	}, [
		onSheet,
		zone,
		q
	]);
	const sel = BELLY_PANELS.find((p) => p.id === active) ?? list[0];
	function select(id) {
		const p = BELLY_PANELS.find((x) => x.id === id);
		if (!p) return;
		setActive(id);
		if (p.sheet !== sheet) {
			setSheet(p.sheet);
			setZone("all");
		}
		history.replaceState(null, "", `#${id}`);
	}
	function go(next) {
		setTab(next);
		if (next === "stations") history.replaceState(null, "", "#stations");
		else if (next === "cockpit") history.replaceState(null, "", "#cockpit");
		else history.replaceState(null, "", sel ? `#${sel.id}` : "#belly");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-2xs tracking-[0.18em] text-accent",
					children: "ATA 53 · STRUKTUR"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-2xl font-medium tracking-tight",
					children: "Belly & Frames"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted",
					children: "Zugangstafeln Kielverkleidung, Spante/Stationen/Stringer, Cockpit-VU. AMM 53-00-00 / 06-41-53 des MSN ist führend."
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Disclaimer, { compact: true }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2 overflow-x-auto",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabChip, {
						active: tab === "belly",
						onClick: () => go("belly"),
						children: "Belly Fairing"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabChip, {
						active: tab === "stations",
						onClick: () => go("stations"),
						children: "Stations / Frames"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabChip, {
						active: tab === "cockpit",
						onClick: () => go("cockpit"),
						children: "Cockpit VU"
					})
				]
			}),
			tab === "belly" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BellySection, {
				sheet,
				setSheet: (s) => {
					setSheet(s);
					setZone("all");
					const first = BELLY_PANELS.find((p) => p.sheet === s);
					if (first) select(first.id);
				},
				zone,
				setZone,
				q,
				setQ,
				list,
				sel,
				zones,
				select
			}) : tab === "stations" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StationsGuide, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CockpitSection, {})
		]
	});
}
function BellySection({ sheet, setSheet, zone, setZone, q, setQ, list, sel, zones, select }) {
	const meta = FAIRING_SHEETS.find((s) => s.id === sheet);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex gap-2 overflow-x-auto",
				children: FAIRING_SHEETS.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => setSheet(s.id),
					className: cn("h-11 shrink-0 rounded-full border px-4 text-sm", sheet === s.id ? "border-accent bg-accent/15 text-accent" : "border-border bg-surface text-muted"),
					children: [s.title, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "ml-2 font-mono text-2xs opacity-70",
						children: s.side
					})]
				}, s.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				value: q,
				onChange: (e) => setQ(e.target.value),
				placeholder: "191AT, Pack, Waste, FR42…"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2 overflow-x-auto",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
					active: zone === "all",
					onClick: () => setZone("all"),
					children: "Alle Zonen"
				}), zones.map((z) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
					active: zone === z,
					onClick: () => setZone(z),
					children: z
				}, z))]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FairingPlate, {
				sheet,
				items: list,
				activeId: sel?.id,
				onSelect: select
			}),
			sel && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl border border-border bg-surface p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-start justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-mono text-xs text-accent",
								children: sel.designation
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-xl font-medium",
								children: sel.nameDe
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-2 flex flex-wrap gap-1.5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
										tone: "accent",
										children: ["Zone ", sel.zone]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: sel.side === "L" ? "Links" : "Rechts" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: sel.frames })
								]
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/panels/$id",
							params: { id: sel.id },
							className: "h-11 rounded-md border border-border px-3 text-sm leading-[2.75rem] hover:border-accent",
							children: "Detail"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm text-muted",
						children: sel.behind
					}),
					sel.note && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 rounded-md border border-caution/30 bg-caution/8 px-3 py-2 text-sm",
						children: sel.note
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-3 font-mono text-2xs text-subtle",
						children: [
							list.length,
							" Tafeln · ",
							meta.fsn
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "grid gap-2 sm:grid-cols-2",
				children: list.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					id: p.id,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => select(p.id),
						className: cn("flex min-h-11 w-full items-center justify-between gap-3 rounded-lg border px-4 py-3 text-left", p.id === sel?.id ? "border-accent bg-accent/10" : "border-border bg-surface"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block font-mono text-xs text-accent",
								children: p.designation
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block truncate text-sm",
								children: p.nameDe
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, { children: ["Z", p.zone] })]
					})
				}, p.id))
			})
		]
	});
}
function CockpitSection() {
	const [q, setQ] = (0, import_react.useState)("");
	const [zone, setZone] = (0, import_react.useState)("all");
	const zones = Object.keys(ZONE_META).sort((a, b) => ZONE_META[a].order - ZONE_META[b].order);
	const list = (0, import_react.useMemo)(() => {
		const t = q.trim().toLowerCase();
		return PANELS.filter((p) => {
			if (zone !== "all" && p.zone !== zone) return false;
			if (!t) return true;
			return `${p.designation} ${p.name} ${p.nameDe} ${p.location}`.toLowerCase().includes(t);
		});
	}, [q, zone]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "Cockpit-Tafeln (VU) bleiben verlinkt aus ATA/Resets. Hauptlageplan ist die Belly Fairing."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-2 gap-2 md:grid-cols-4",
				children: OVERHEAD_LAYOUT.map((cell) => {
					const p = PANELS.find((x) => x.id === cell.id);
					if (!p) return null;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/panels/$id",
						params: { id: p.id },
						className: "rounded-md border border-border bg-surface px-2 py-2 hover:border-accent",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block font-mono text-2xs text-accent",
							children: p.designation
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block text-xs",
							children: p.nameDe
						})]
					}, cell.id);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				value: q,
				onChange: (e) => setQ(e.target.value),
				placeholder: "20VU, FCU, FIRE…"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2 overflow-x-auto",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
					active: zone === "all",
					onClick: () => setZone("all"),
					children: "Alle"
				}), zones.map((z) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
					active: zone === z,
					onClick: () => setZone(z),
					children: ZONE_META[z].labelDe
				}, z))]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "grid gap-2 sm:grid-cols-2",
				children: list.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/panels/$id",
					params: { id: p.id },
					className: "block rounded-lg border border-border bg-surface px-4 py-3 hover:bg-elevated",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono text-xs text-accent",
							children: p.designation
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mt-0.5 block font-medium",
							children: p.nameDe
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block text-sm text-muted",
							children: p.location
						})
					]
				}) }, p.id))
			})
		]
	});
}
function TabChip({ active, onClick, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick,
		className: cn("h-11 shrink-0 rounded-full border px-4 text-sm", active ? "border-accent bg-accent/15 text-accent" : "border-border bg-surface text-muted"),
		children
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
export { PanelsPage as component };
