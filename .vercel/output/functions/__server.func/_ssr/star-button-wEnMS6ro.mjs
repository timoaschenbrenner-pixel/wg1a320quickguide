import { x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Star } from "../_libs/lucide-react.mjs";
import { a as cn } from "./router-CBE5hgbZ.mjs";
import { t as useFavorites } from "./favorites-Df1L7mxm.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/star-button-wEnMS6ro.js
var import_jsx_runtime = require_jsx_runtime();
function StarButton({ item }) {
	const has = useFavorites((s) => s.has(item.kind, item.id));
	const toggle = useFavorites((s) => s.toggle);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick: () => toggle(item),
		className: "flex size-11 items-center justify-center rounded-md border border-border",
		"aria-label": has ? "Favorit entfernen" : "Favorit",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: cn("size-5", has ? "fill-accent text-accent" : "text-muted") })
	});
}
//#endregion
export { StarButton as t };
