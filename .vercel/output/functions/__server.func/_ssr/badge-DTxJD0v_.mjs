import { x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as cn } from "./router-CBE5hgbZ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/badge-DTxJD0v_.js
var import_jsx_runtime = require_jsx_runtime();
function Badge({ children, tone = "default", className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("inline-flex items-center rounded-sm px-1.5 py-0.5 font-mono text-2xs tracking-wide", tone === "accent" && "bg-accent/15 text-accent", tone === "caution" && "bg-caution/15 text-caution", tone === "default" && "bg-elevated text-muted", className),
		children
	});
}
//#endregion
export { Badge as t };
