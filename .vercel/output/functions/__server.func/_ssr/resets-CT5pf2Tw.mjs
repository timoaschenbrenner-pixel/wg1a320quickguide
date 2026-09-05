import { i as __toESM } from "../_runtime.mjs";
import { V as require_react, v as Link, x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { s as RESETS } from "./router-CBE5hgbZ.mjs";
import { t as Badge } from "./badge-DTxJD0v_.mjs";
import { t as Disclaimer } from "./disclaimer-DKxL-wCV.mjs";
import { t as Input } from "./input-BMGMgrXH.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/resets-CT5pf2Tw.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ResetsPage() {
	const [q, setQ] = (0, import_react.useState)("");
	const list = (0, import_react.useMemo)(() => {
		const t = q.trim().toLowerCase();
		if (!t) return RESETS;
		return RESETS.filter((r) => `${r.name} ${r.when} ${r.ata} ${r.ecam ?? ""} ${(r.aliases ?? []).join(" ")}`.toLowerCase().includes(t));
	}, [q]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-2xs tracking-[0.18em] text-accent",
					children: "TSM"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-2xl font-medium",
					children: "Quick Reset"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted",
					children: "Erste Orientierung. TSM-Task und Konfig des MSN führen."
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Disclaimer, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				value: q,
				onChange: (e) => setQ(e.target.value),
				placeholder: "ELAC, CIDS, ADIRU, VENT…"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "grid gap-2 sm:grid-cols-2",
				children: list.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/resets/$id",
					params: { id: r.id },
					className: "block rounded-lg border border-border bg-surface px-4 py-3 hover:border-accent",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium",
								children: r.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
								tone: "accent",
								children: ["ATA ", r.ata]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted",
							children: r.when
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 font-mono text-2xs text-subtle",
							children: r.wait
						})
					]
				}) }, r.id))
			})
		]
	});
}
//#endregion
export { ResetsPage as component };
