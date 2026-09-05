import { i as __toESM } from "../_runtime.mjs";
import { V as require_react, x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as cn } from "./router-CBE5hgbZ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/input-BMGMgrXH.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Input = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
	ref,
	className: cn("flex h-11 w-full rounded-md border border-border bg-elevated px-3 text-sm text-fg placeholder:text-subtle", "transition-colors duration-150 focus-visible:border-accent focus-visible:outline-none", className),
	...props
}));
Input.displayName = "Input";
//#endregion
export { Input as t };
