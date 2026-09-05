import { i as __toESM } from "../_runtime.mjs";
import { V as require_react, x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as cn, l as CBS } from "./router-CBE5hgbZ.mjs";
import { t as Badge } from "./badge-DTxJD0v_.mjs";
import { t as Disclaimer } from "./disclaimer-DKxL-wCV.mjs";
import { t as Input } from "./input-BMGMgrXH.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/cbs-C6vIKt_o.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function CbsPage() {
	const [q, setQ] = (0, import_react.useState)("");
	const list = (0, import_react.useMemo)(() => {
		const t = q.trim().toLowerCase();
		if (!t) return CBS;
		return CBS.filter((c) => `${c.fin} ${c.name} ${c.nameDe} ${c.panel} ${c.bus} ${c.ata}`.toLowerCase().includes(t));
	}, [q]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-2xs tracking-[0.18em] text-accent",
					children: "ATA 24"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-2xl font-medium",
					children: "Circuit Breakers"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted",
					children: "Line-CBs. CBL des MSN ist führend. FIN/Lage je FSN prüfen."
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Disclaimer, { compact: true }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				value: q,
				onChange: (e) => setQ(e.target.value),
				placeholder: "ELAC, 5CC, 49VU…"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "overflow-hidden rounded-lg border border-border",
				children: list.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					id: c.id,
					className: cn("border-t border-border bg-surface px-4 py-3 first:border-t-0"),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-baseline justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-sm text-accent",
									children: c.fin
								}),
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-medium",
									children: c.name
								})
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: c.panel }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
									tone: "accent",
									children: ["ATA ", c.ata]
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 text-sm text-muted",
							children: [
								c.nameDe,
								" · ",
								c.bus,
								c.rating ? ` · ${c.rating}` : ""
							]
						}),
						c.note && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs text-subtle",
							children: c.note
						})
					]
				}, c.id))
			})
		]
	});
}
//#endregion
export { CbsPage as component };
