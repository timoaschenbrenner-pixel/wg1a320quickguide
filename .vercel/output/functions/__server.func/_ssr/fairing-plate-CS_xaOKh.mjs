import { i as __toESM } from "../_runtime.mjs";
import { V as require_react, x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { l as Maximize2, r as X } from "../_libs/lucide-react.mjs";
import { a as cn, w as FAIRING_SHEETS } from "./router-CBE5hgbZ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/fairing-plate-CS_xaOKh.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function FairingPlate({ sheet, items, activeId, onSelect }) {
	const meta = FAIRING_SHEETS.find((s) => s.id === sheet);
	const [open, setOpen] = (0, import_react.useState)(false);
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "overflow-hidden rounded-xl border border-border bg-elevated",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between gap-2 border-b border-border px-3 py-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "font-mono text-2xs text-subtle",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-accent",
						children: meta.fig
					}),
					" · ",
					meta.side
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => setOpen(true),
				className: "flex h-11 items-center gap-1.5 px-2 text-xs text-muted",
				"aria-label": "Tafel vergrößern",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Maximize2, { className: "size-4" }), " Zoom"]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative bg-fg",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => setOpen(true),
				className: "block w-full",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: meta.src,
					alt: meta.title,
					className: "block h-auto w-full"
				})
			}), items.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: (e) => {
					e.stopPropagation();
					onSelect(p.id);
				},
				style: {
					left: `${p.x}%`,
					top: `${p.y}%`
				},
				className: cn("absolute size-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2", p.id === activeId ? "border-accent bg-accent" : "border-accent/80 bg-accent/40"),
				"aria-label": p.designation
			}, p.id))]
		})]
	}), open && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed inset-0 z-50 flex flex-col bg-bg/96",
		role: "dialog",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "flex items-center justify-between border-b border-border px-3 py-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-mono text-sm text-accent",
				children: meta.fig
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "size-11",
				onClick: () => setOpen(false),
				"aria-label": "Schließen",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "mx-auto size-5" })
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "min-h-0 flex-1 overflow-auto bg-fg",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: meta.src,
				alt: meta.title,
				className: "mx-auto block w-full max-w-5xl"
			})
		})]
	})] });
}
//#endregion
export { FairingPlate as t };
