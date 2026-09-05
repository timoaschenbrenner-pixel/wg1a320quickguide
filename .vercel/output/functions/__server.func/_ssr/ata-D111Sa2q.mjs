import { v as Link, x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { j as ATA_SYSTEMS } from "./router-CBE5hgbZ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ata-D111Sa2q.js
var import_jsx_runtime = require_jsx_runtime();
function AtaIndex() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-mono text-2xs tracking-[0.18em] text-accent",
				children: "ATA"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-2xl font-medium",
				children: "Systeme"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted",
				children: "Kapitel-Übersicht. Schematics in der Detailansicht."
			})
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "grid gap-2 sm:grid-cols-2",
			children: ATA_SYSTEMS.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/ata/$id",
				params: { id: s.id },
				className: "block rounded-lg border border-border bg-surface px-4 py-3 hover:border-accent",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "font-mono text-xs text-accent",
						children: ["ATA ", s.chapter]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mt-0.5 block font-medium",
						children: s.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "block text-sm text-muted",
						children: s.titleDe
					})
				]
			}) }, s.id))
		})]
	});
}
//#endregion
export { AtaIndex as component };
