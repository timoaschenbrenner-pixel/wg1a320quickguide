import { i as __toESM } from "../_runtime.mjs";
import { B as notFound, V as require_react, v as Link, x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as X } from "../_libs/lucide-react.mjs";
import { A as getPanel, E as getBellyPanel, M as getAta, a as cn, c as getReset, i as Route$2, o as schematicsForAta, u as getCb } from "./router-CBE5hgbZ.mjs";
import { t as Badge } from "./badge-DTxJD0v_.mjs";
import { t as StarButton } from "./star-button-wEnMS6ro.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ata_._id-BrZUTFnQ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SchematicGallery({ ata }) {
	const figs = schematicsForAta(ata);
	const [open, setOpen] = (0, import_react.useState)(null);
	const cur = figs.find((f) => f.id === open);
	(0, import_react.useEffect)(() => {
		if (!open) return;
		const prev = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		const onKey = (e) => {
			if (e.key === "Escape") setOpen(null);
		};
		window.addEventListener("keydown", onKey);
		return () => {
			document.body.style.overflow = prev;
			window.removeEventListener("keydown", onKey);
		};
	}, [open]);
	if (figs.length === 0) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mb-3 font-mono text-2xs uppercase tracking-[0.16em] text-subtle",
			children: "Schematics"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "grid grid-cols-2 gap-2 sm:grid-cols-3",
			children: figs.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
				id: f.id,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => setOpen(f.id),
					className: "overflow-hidden rounded-lg border border-border bg-elevated text-left hover:border-accent",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: f.src,
						alt: f.title,
						className: "aspect-[4/3] w-full object-cover object-top bg-fg"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "block truncate px-2 py-1.5 font-mono text-2xs text-muted",
						children: ["Fig ", f.fig]
					})]
				})
			}, f.id))
		}),
		cur && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "fixed inset-0 z-50 flex flex-col bg-bg/96",
			role: "dialog",
			"aria-modal": "true",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex items-center gap-2 border-b border-border px-3 py-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "min-w-0 flex-1 truncate text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-mono text-accent",
							children: ["Fig ", cur.fig]
						}),
						" ",
						cur.title
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "flex size-11 items-center justify-center",
					onClick: () => setOpen(null),
					"aria-label": "Schließen",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" })
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "min-h-0 flex-1 overflow-auto bg-fg",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: cur.src,
					alt: cur.title,
					className: "mx-auto block w-full max-w-5xl"
				})
			})]
		})
	] });
}
function AtaDetail() {
	const { id } = Route$2.useParams();
	const sys = getAta(id);
	if (!sys) throw notFound();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "space-y-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex items-start justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "font-mono text-2xs tracking-[0.18em] text-accent",
						children: ["ATA ", sys.chapter]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-2xl font-medium tracking-tight",
						children: sys.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-muted",
						children: sys.titleDe
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StarButton, { item: {
					kind: "ata",
					id: sys.id,
					title: `ATA ${sys.chapter} ${sys.title}`,
					href: `/ata/${sys.id}`
				} })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-2xl text-pretty text-sm leading-relaxed text-muted",
				children: sys.summary
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SchematicGallery, { ata: sys.id }),
			sys.functions.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
				title: "Funktion",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "space-y-2 text-sm",
					children: sys.functions.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mt-2 size-1.5 shrink-0 rounded-full bg-accent" }), f]
					}, f))
				})
			}),
			sys.configs && sys.configs.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
				title: "Konfigurationen",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-3 sm:grid-cols-2",
					children: sys.configs.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-lg border border-border bg-surface p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-medium",
								children: c.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-0.5 text-xs text-muted",
								children: c.when
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "mt-3 space-y-1.5",
								children: c.items.map((it) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex items-center justify-between gap-2 text-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted",
										children: it.label
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-mono text-2xs uppercase",
										children: it.state
									})]
								}, it.label))
							})
						]
					}, c.id))
				})
			}),
			sys.computers.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
				title: "Computer / LRU",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
					className: "grid gap-2 sm:grid-cols-2",
					children: sys.computers.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-md border border-border bg-surface px-3 py-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dt", {
							className: "font-medium",
							children: [
								c.name,
								" ",
								c.fin && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-xs text-accent",
									children: c.fin
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "text-sm text-muted",
							children: c.note
						})]
					}, c.name))
				})
			}),
			sys.components.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
				title: "Komponenten",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "divide-y divide-border overflow-hidden rounded-lg border border-border bg-surface",
					children: sys.components.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "px-4 py-2.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-medium",
							children: c.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted",
							children: c.note
						})]
					}, c.name))
				})
			}),
			sys.notes.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
				title: "Hinweise",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "space-y-2 text-sm text-muted",
					children: sys.notes.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "rounded-md border border-border bg-elevated px-3 py-2 text-fg/90",
						children: n
					}, n))
				})
			}),
			sys.panels.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
				title: "Panels",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap gap-2",
					children: sys.panels.map((pid) => {
						const p = getPanel(pid) ?? getBellyPanel(pid);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/panels/$id",
							params: { id: p?.id ?? pid },
							className: "rounded-sm border border-border bg-surface px-2.5 py-1 font-mono text-xs hover:border-accent",
							children: p?.designation ?? pid
						}, pid);
					})
				})
			}),
			sys.relatedResets.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
				title: "Resets",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "grid gap-2 sm:grid-cols-2",
					children: sys.relatedResets.map((rid) => {
						const r = getReset(rid);
						if (!r) return null;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/resets/$id",
							params: { id: r.id },
							className: "block rounded-md border border-border bg-surface px-3 py-2 hover:border-border-strong",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium",
								children: r.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block text-xs text-muted",
								children: r.wait
							})]
						}) }, rid);
					})
				})
			}),
			sys.relatedCbs.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
				title: "CBs",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap gap-2",
					children: sys.relatedCbs.map((cid) => {
						const c = getCb(cid);
						return c ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
							tone: "accent",
							children: [
								c.fin,
								" ",
								c.name
							]
						}, cid) : null;
					})
				})
			})
		]
	});
}
function Section({ title, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
		className: cn("mb-3 font-mono text-2xs uppercase tracking-[0.16em] text-subtle"),
		children: title
	}), children] });
}
//#endregion
export { AtaDetail as component };
