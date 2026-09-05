import { B as notFound, v as Link, x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as getReset, n as Route, u as getCb } from "./router-CBE5hgbZ.mjs";
import { t as Badge } from "./badge-DTxJD0v_.mjs";
import { t as Disclaimer } from "./disclaimer-DKxL-wCV.mjs";
import { t as StarButton } from "./star-button-wEnMS6ro.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/resets_._id-DEEm71a5.js
var import_jsx_runtime = require_jsx_runtime();
function ResetDetail() {
	const { id } = Route.useParams();
	const r = getReset(id);
	if (!r) throw notFound();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex items-start justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "font-mono text-2xs tracking-[0.18em] text-accent",
						children: [
							"ATA ",
							r.ata,
							" · ",
							r.kind.toUpperCase()
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-2xl font-medium",
						children: r.name
					}),
					r.ecam && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 font-mono text-sm text-caution",
						children: r.ecam
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StarButton, { item: {
					kind: "reset",
					id: r.id,
					title: r.name,
					href: `/resets/${r.id}`
				} })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Disclaimer, { compact: true }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
				className: "grid gap-3 sm:grid-cols-2 text-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "text-2xs uppercase tracking-wide text-subtle",
						children: "Wann"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: r.when })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "text-2xs uppercase tracking-wide text-subtle",
						children: "Warten"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
						className: "font-mono text-accent",
						children: r.wait
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "sm:col-span-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-2xs uppercase tracking-wide text-subtle",
							children: "Danach"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: r.after })]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "space-y-2",
				children: r.steps.map((st) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex gap-3 rounded-lg border border-border bg-surface px-4 py-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-mono text-sm text-accent",
						children: st.n
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm",
						children: st.text
					})]
				}, st.n))
			}),
			r.relatedCbs && r.relatedCbs.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-2",
				children: r.relatedCbs.map((cid) => {
					const c = getCb(cid);
					return c ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/cbs",
						hash: c.id,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
							tone: "accent",
							children: [
								c.fin,
								" ",
								c.name
							]
						})
					}, cid) : null;
				})
			}),
			r.amm && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted",
				children: r.amm
			})
		]
	});
}
//#endregion
export { ResetDetail as component };
