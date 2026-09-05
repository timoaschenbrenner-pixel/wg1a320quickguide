import { B as notFound, v as Link, x as require_jsx_runtime, y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { A as getPanel, C as BELLY_PANELS, E as getBellyPanel, r as Route$1, w as FAIRING_SHEETS } from "./router-CBE5hgbZ.mjs";
import { t as Badge } from "./badge-DTxJD0v_.mjs";
import { t as Disclaimer } from "./disclaimer-DKxL-wCV.mjs";
import { t as StarButton } from "./star-button-wEnMS6ro.mjs";
import { t as FairingPlate } from "./fairing-plate-CS_xaOKh.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/panels_._id-DGHgPT8F.js
var import_jsx_runtime = require_jsx_runtime();
function PanelDetail() {
	const { id } = Route$1.useParams();
	if (getBellyPanel(id)) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BellyDetail, { id });
	const p = getPanel(id);
	if (!p) throw notFound();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex items-start justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-2xs tracking-[0.18em] text-accent",
						children: p.designation
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-2xl font-medium",
						children: p.nameDe
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: p.location
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StarButton, { item: {
					kind: "panel",
					id: p.id,
					title: p.designation,
					href: `/panels/${p.id}`
				} })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Disclaimer, { compact: true }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-1.5",
				children: p.ata.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/ata/$id",
					params: { id: a },
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
						tone: "accent",
						children: ["ATA ", a]
					})
				}, a))
			}),
			p.notes && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: p.notes
			}),
			p.controls.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "divide-y divide-border rounded-lg border border-border bg-surface",
				children: p.controls.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "px-4 py-2.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-medium",
						children: c.label
					}), c.note && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: c.note
					})]
				}, c.label))
			})
		]
	});
}
function BellyDetail({ id }) {
	const p = getBellyPanel(id);
	const nav = useNavigate();
	const same = BELLY_PANELS.filter((x) => x.sheet === p.sheet);
	const meta = FAIRING_SHEETS.find((s) => s.id === p.sheet);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex items-start justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "font-mono text-2xs tracking-[0.18em] text-accent",
						children: [
							p.designation,
							" · Zone ",
							p.zone
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-2xl font-medium",
						children: p.nameDe
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-muted",
						children: [
							p.frames,
							" · ",
							p.side === "L" ? "Links" : "Rechts",
							" · ",
							meta.fig
						]
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StarButton, { item: {
					kind: "panel",
					id: p.id,
					title: p.designation,
					href: `/panels/${p.id}`
				} })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Disclaimer, { compact: true }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FairingPlate, {
				sheet: p.sheet,
				items: same,
				activeId: p.id,
				onSelect: (nid) => nav({
					to: "/panels/$id",
					params: { id: nid }
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: p.behind
			}),
			p.note && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "rounded-md border border-caution/30 bg-caution/8 px-3 py-2 text-sm",
				children: p.note
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-1.5",
				children: p.ata.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/ata/$id",
					params: { id: a },
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
						tone: "accent",
						children: ["ATA ", a]
					})
				}, a))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mb-2 font-mono text-2xs uppercase tracking-wide text-subtle",
				children: "Gleiche Zone"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-2",
				children: BELLY_PANELS.filter((x) => x.zone === p.zone && x.id !== p.id).map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/panels/$id",
					params: { id: x.id },
					className: "rounded-sm border border-border px-2 py-1 font-mono text-xs hover:border-accent",
					children: x.designation
				}, x.id))
			})] })
		]
	});
}
//#endregion
export { PanelDetail as component };
