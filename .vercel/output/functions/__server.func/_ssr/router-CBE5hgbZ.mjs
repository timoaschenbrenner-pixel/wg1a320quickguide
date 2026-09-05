import { i as __toESM } from "../_runtime.mjs";
import { V as require_react, _ as createRootRoute, b as useRouter, d as useRouterState, g as createFileRoute, h as lazyRouteComponent, l as Scripts, m as Outlet, p as createRouter, u as HeadContent, v as Link, x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as PanelsTopLeft, d as CircuitBoard, f as BookOpen, i as TriangleAlert, o as Search, p as Antenna, s as RotateCcw, u as House } from "../_libs/lucide-react.mjs";
import { a as union, i as string, n as number, r as object, t as literal } from "../_libs/zod.mjs";
import { t as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-CBE5hgbZ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-red-500",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-semibold",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-zinc-500 dark:text-zinc-400",
				children: error.message || "An unexpected error occurred. Try reloading the page."
			})
		]
	});
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	if (typeof window === "undefined") return () => {};
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	const parentOrigin = resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		if (envelope.data.type === "hello") {
			if (!HelloSchema.safeParse(event.data).success) return;
			announce();
			return;
		}
		if (envelope.data.type === "navigate") {
			const parsed = NavigateSchema.safeParse(event.data);
			if (!parsed.success) return;
			navigate(parsed.data.path);
			queueMicrotask(reportLocation);
			return;
		}
		if (envelope.data.type === "history") {
			const parsed = HistorySchema.safeParse(event.data);
			if (!parsed.success) return;
			if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
			window.history.go(parsed.data.delta);
		}
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
var ATA_SYSTEMS = [
	{
		id: "00",
		chapter: "00",
		title: "GENERAL",
		titleDe: "Allgemein / Cockpit",
		summary: "Cockpit-Layout A320-Familie: Overhead 20VU, Glareshield FCU, MIP Classic CRT / Enhanced LCD + ISIS, Center Pedestal.",
		functions: [
			"Systembedienung überwiegend Overhead 20VU",
			"FCU auf Glareshield für AFS/EFIS",
			"ECAM EWD + SD zentral"
		],
		computers: [],
		components: [
			{
				name: "Overhead 20VU",
				note: "FWD Systempanels, AFT 49VU CBs"
			},
			{
				name: "Glareshield 13VU",
				note: "FCU, Master WARN/CAUT"
			},
			{
				name: "Center Pedestal",
				note: "MCDU, RMP, ACP, ECP, Start, Park Brake"
			}
		],
		panels: [
			"20VU",
			"13VU",
			"8VU",
			"105VU"
		],
		buses: [],
		notes: ["Quick Guide ersetzt AMM/TSM/ASM nicht.", "Enhanced vs Classic: LCD statt CRT, ISIS, ACSC statt Pack/Zone Controller."],
		relatedResets: [],
		relatedCbs: []
	},
	{
		id: "21",
		chapter: "21",
		title: "AIR CONDITIONING",
		titleDe: "Klima / Avionics Ventilation",
		summary: "Zwei Packs (ACM) speisen Mixer Unit und Trim-Air. AEVC kühlt Avionics im Open/Closed/Partial Circuit. Pack 1 Zone 191, Pack 2 Zone 192.",
		functions: [
			"Pack-Regelung PC (Classic) bzw. ACSC (Enhanced)",
			"Zonen Cockpit / FWD / AFT Cabin via Trim Air",
			"Avionics: Blower + Extract Fan"
		],
		computers: [
			{
				name: "AEVC",
				fin: "10HQ",
				note: "88VU – Ventile und Fans, Smoke, GND/FLT"
			},
			{
				name: "ACSC 1/2",
				note: "Enhanced – Pack + Zone, zwei Lanes"
			},
			{
				name: "Pack Controller 1/2",
				note: "Classic"
			}
		],
		components: [{
			name: "Pack 1 / 2",
			note: "Belly Zone 191 / 192, FR36+"
		}, {
			name: "Mixer Unit",
			note: "Zone 147/148"
		}],
		panels: [
			"191AT",
			"192AT",
			"20VU"
		],
		buses: [
			"AC1",
			"AC2",
			"DC1",
			"DC2"
		],
		notes: ["Pack-Bay: Packs OFF, Residual Heat, Bleed runter vor Öffnen."],
		relatedResets: ["acsc", "aevc"],
		relatedCbs: ["acsc1", "acsc2"],
		configs: [{
			id: "open",
			name: "Open Circuit",
			when: "GND, low TAT",
			items: [{
				label: "Skin Valve",
				state: "OPEN"
			}, {
				label: "Blower",
				state: "ON"
			}]
		}, {
			id: "closed",
			name: "Closed Circuit",
			when: "FLT / Smoke",
			items: [{
				label: "Skin Valve",
				state: "CLSD"
			}, {
				label: "Extract",
				state: "ON"
			}]
		}]
	},
	{
		id: "22",
		chapter: "22",
		title: "AUTO FLIGHT",
		titleDe: "Autopilot / FMGS",
		summary: "Zwei FMGC, zwei FAC, FCU. AP/FD/A/THR. Sidestick + FCU.",
		functions: [
			"AP 1/2, FD, A/THR",
			"Managed / Selected Guidance",
			"FAC: Yaw Damper, Rudder Trim, RTLU"
		],
		computers: [
			{
				name: "FMGC 1/2",
				note: "MCDU, FMS + Flight Guidance"
			},
			{
				name: "FAC 1/2",
				note: "Yaw, Rudder, Limit"
			},
			{
				name: "FCU",
				fin: "13VU",
				note: "Glareshield"
			}
		],
		components: [{
			name: "MCDU 1/2",
			note: "Pedestal"
		}],
		panels: ["13VU", "8VU"],
		buses: [
			"AC1",
			"AC2",
			"DC ESS"
		],
		notes: ["FAC Reset nur am Boden nach TSM. FMGC Reset: MCDU MENU oder CB."],
		relatedResets: ["fmgc", "fac"],
		relatedCbs: ["fmgc1", "fac1"]
	},
	{
		id: "23",
		chapter: "23",
		title: "COMMUNICATIONS",
		titleDe: "Funk / CIDS / Cabin",
		summary: "VHF/HF/ACP/RMP, CIDS (CIDS DIR + DEU-A/B), FAP, AMU. CIDS steuert Cabin Lights, Pax Signs, PSU.",
		functions: [
			"VHF 1/2/3, HF, SATCOM option",
			"CIDS: Cabin, FAP, DEU",
			"Cockpit Interphone / PA"
		],
		computers: [{
			name: "CIDS 1/2",
			note: "Director, AFT galley area / avionics"
		}, {
			name: "AMU",
			note: "Audio Management"
		}],
		components: [{
			name: "VHF antennas",
			note: "Crown + Belly, siehe Antennen"
		}, {
			name: "FAP",
			note: "FWD Attendant Panel"
		}],
		panels: ["8VU"],
		buses: ["AC1", "DC ESS"],
		notes: ["CIDS Reset: 3s am FAP oder CB. Cabin dunkel nach Reset kurz normal."],
		relatedResets: ["cids"],
		relatedCbs: ["cids1"]
	},
	{
		id: "24",
		chapter: "24",
		title: "ELECTRICAL POWER",
		titleDe: "Elektrik",
		summary: "IDG 1/2, APU GEN, EXT PWR, TR, ESS TR, BAT 1/2, EMER GEN (CSM/G). AC1/AC2/AC ESS/AC EMER, DC1/DC2/DC ESS/DC BAT/DC EMER.",
		functions: [
			"IDG + GCU je Triebwerk",
			"APU GEN + GCU",
			"STAT INV + EMER GEN bei Not"
		],
		computers: [
			{
				name: "GCU 1/2",
				note: "IDG control / protect"
			},
			{
				name: "BCL",
				note: "Battery Charge Limiter"
			},
			{
				name: "GPCU",
				note: "Ground Power"
			}
		],
		components: [
			{
				name: "IDG 1/2",
				note: "Engine gearbox"
			},
			{
				name: "TR 1/2 / ESS TR",
				note: "Avionics / elec bay"
			},
			{
				name: "BAT 1/2",
				note: "Avionics, 23/24 Ah"
			}
		],
		panels: ["20VU", "105VU"],
		buses: [
			"AC1",
			"AC2",
			"AC ESS",
			"DC BAT"
		],
		notes: ["IDG disconnect ist one-shot bis Maintenance. GCU Reset nach TSM."],
		relatedResets: ["gcu"],
		relatedCbs: ["gcu1"]
	},
	{
		id: "26",
		chapter: "26",
		title: "FIRE PROTECTION",
		titleDe: "Brand / Smoke",
		summary: "ENG 1/2 FIRE, APU FIRE, Cargo Smoke. squib + bottle. AEVC smoke für Avionics.",
		functions: [
			"Loop detection ENG/APU",
			"Cargo smoke AFT/FWD",
			"Agent discharge guarded"
		],
		computers: [{
			name: "FDU",
			note: "Fire Detection Unit"
		}],
		components: [{
			name: "Fire handles",
			note: "Overhead FWD 20VU"
		}],
		panels: ["20VU"],
		buses: ["DC ESS", "HOT BAT"],
		notes: ["Fire-Test am Overhead. Agent nur nach TSM/QRH."],
		relatedResets: ["fire-test"],
		relatedCbs: []
	},
	{
		id: "27",
		chapter: "27",
		title: "FLIGHT CONTROLS",
		titleDe: "Flugsteuerung",
		summary: "ELAC 1/2, SEC 1/2/3, FCDC 1/2. Sidestick, Elevator, Aileron, Spoiler, THS, Flaps/Slats (SFCC), Speedbrake.",
		functions: [
			"Normal / Alternate / Direct Law",
			"ELAC: Elevator + Aileron + THS",
			"SEC: Spoiler + Standby elevator"
		],
		computers: [
			{
				name: "ELAC 1/2",
				note: "Elevator Aileron Computer"
			},
			{
				name: "SEC 1/2/3",
				note: "Spoiler Elevator Computer"
			},
			{
				name: "FCDC 1/2",
				note: "Status an ECAM"
			},
			{
				name: "SFCC 1/2",
				note: "Slat/Flap"
			}
		],
		components: [{
			name: "Sidestick L/R",
			note: "Priority Takeover"
		}],
		panels: ["20VU"],
		buses: [
			"AC1",
			"AC2",
			"DC ESS"
		],
		notes: ["ELAC/SEC Reset am Overhead: OFF 5–10s ON. Nur nach TSM, Konfig prüfen (GND, no hyd demand)."],
		relatedResets: ["elac", "sec"],
		relatedCbs: ["elac1", "elac2"]
	},
	{
		id: "28",
		chapter: "28",
		title: "FUEL",
		titleDe: "Kraftstoff",
		summary: "Wing tanks L/R, Center, ACT option. FQI, pumps, mode select AUTO/MAN. APU fuel from left feed.",
		functions: [
			"Inner/outer transfer",
			"Center to wing auto",
			"APU LP valve"
		],
		computers: [{
			name: "FQIC",
			note: "Fuel Quantity Indication Computer"
		}],
		components: [{
			name: "Center tank pumps",
			note: "Belly / wing box, Zone 147/148"
		}],
		panels: ["20VU", "147CB"],
		buses: ["AC1", "AC2"],
		notes: ["Belly: Fuel-Leitungen Center. Bonding nach Panel."],
		relatedResets: ["fqi"],
		relatedCbs: []
	},
	{
		id: "29",
		chapter: "29",
		title: "HYDRAULIC POWER",
		titleDe: "Hydraulik",
		summary: "Green (ENG1 + PTU + RAT), Blue (ELEC pump + EMER), Yellow (ENG2 + ELEC + PTU). RSVR, leak measurement.",
		functions: [
			"PTU G↔Y",
			"RAT für Green EMER",
			"Blue ELEC pump"
		],
		computers: [{
			name: "HSMU",
			note: "option / leak"
		}],
		components: [{
			name: "Green RSVR",
			note: "Belly / MLG area"
		}, {
			name: "PTU",
			note: "Belly RH / Y system"
		}],
		panels: ["20VU"],
		buses: [
			"AC1",
			"AC2",
			"DC ESS"
		],
		notes: ["Hyd-Leitungen unter Belly 193/194/148. Residual pressure."],
		relatedResets: [],
		relatedCbs: []
	},
	{
		id: "30",
		chapter: "30",
		title: "ICE AND RAIN",
		titleDe: "Eis / Regen",
		summary: "Wing/Engine anti-ice (bleed), Probe/Window heat (WHC/PHC), Wipers.",
		functions: [
			"WAI + EAI from bleed",
			"Pitot/AOA/TAT/Static heat",
			"Window heat L/R"
		],
		computers: [{
			name: "WHC",
			note: "Window Heat Computer"
		}, {
			name: "PHC",
			note: "Probe Heat Computer"
		}],
		components: [{
			name: "Pitot L/C/R",
			note: "Nase, siehe Antennen/Probes"
		}],
		panels: ["20VU"],
		buses: ["AC1", "AC2"],
		notes: ["Probe heat GND/FLT logic. Kein Reset im FLT außer TSM."],
		relatedResets: ["phc", "whc"],
		relatedCbs: []
	},
	{
		id: "31",
		chapter: "31",
		title: "INDICATING / RECORDING",
		titleDe: "ECAM / Recorder",
		summary: "FWC 1/2, SDAC 1/2, DMC 1/2/3, EWD/SD, DFDR, CVR, CLOCK.",
		functions: [
			"E/WD + SD",
			"PFR nach Flight",
			"CVR/DFDR"
		],
		computers: [
			{
				name: "FWC 1/2",
				note: "Flight Warning"
			},
			{
				name: "SDAC 1/2",
				note: "System Data Acquisition"
			},
			{
				name: "DMC 1/2/3",
				note: "Display Management"
			}
		],
		components: [{
			name: "ECP",
			note: "ECAM Control Panel, Pedestal"
		}],
		panels: ["8VU"],
		buses: ["AC ESS", "DC ESS"],
		notes: ["FWC/SDAC Reset nur TSM. PFR am PRINTER oder ATSU."],
		relatedResets: ["fwc", "cvr"],
		relatedCbs: []
	},
	{
		id: "32",
		chapter: "32",
		title: "LANDING GEAR",
		titleDe: "Fahrwerk / Bremsen",
		summary: "LGCIU 1/2, BSCU, NWS, Park Brake, Autobrake, Brake temps.",
		functions: [
			"Gear up/down + doors",
			"Normal / Alt braking",
			"NWS via BSCU"
		],
		computers: [{
			name: "LGCIU 1/2",
			note: "Gear proximity"
		}, {
			name: "BSCU",
			note: "Braking/Steering dual channel"
		}],
		components: [{
			name: "MLG",
			note: "FR47–FR54"
		}],
		panels: ["20VU"],
		buses: [
			"DC1",
			"DC2",
			"DC ESS"
		],
		notes: ["BSCU Reset: A/SKID & N/W STRG OFF 10s ON. GND, chock."],
		relatedResets: ["bscu"],
		relatedCbs: ["bscu"]
	},
	{
		id: "33",
		chapter: "33",
		title: "LIGHTS",
		titleDe: "Beleuchtung",
		summary: "Cockpit, Cabin (CIDS), EXT: Nav/Logo/Strobe/Beacon/Land/Taxi/T.O., Emergency (EPSU).",
		functions: [
			"EXT lights Overhead",
			"Cabin via CIDS/FAP",
			"Emergency independent"
		],
		computers: [{
			name: "EPSU",
			note: "Emergency Power Supply Unit"
		}],
		components: [{
			name: "Beacon / Strobe",
			note: "siehe Antennen/Lichter-Tafel"
		}],
		panels: ["20VU"],
		buses: ["AC1", "DC ESS"],
		notes: ["Strobe/Beacon auf Unterseite-Tafel."],
		relatedResets: [],
		relatedCbs: []
	},
	{
		id: "34",
		chapter: "34",
		title: "NAVIGATION",
		titleDe: "Navigation / ADIRS",
		summary: "ADIRU 1/2/3, MMR (ILS/GPS), VOR/DME, ADF, RA 1/2, ATC, TCAS, WXR, ISIS.",
		functions: [
			"ADIRS ALIGN 3–10 min",
			"MMR GPS+ILS",
			"RA, ATC/TCAS, WXR"
		],
		computers: [
			{
				name: "ADIRU 1/2/3",
				note: "ADR + IR"
			},
			{
				name: "MMR 1/2",
				note: "ILS + GPS"
			},
			{
				name: "T2CAS / TCAS",
				note: "plus RA input"
			}
		],
		components: [{
			name: "GPS antennas",
			note: "Crown, siehe Antennen"
		}, {
			name: "Radome WXR",
			note: "FR1"
		}],
		panels: ["20VU"],
		buses: [
			"AC1",
			"AC2",
			"DC ESS"
		],
		notes: ["ADIRU ALIGN: NAV, GND, no move. Fast align only if TSM erlaubt."],
		relatedResets: ["adiru"],
		relatedCbs: ["adiru1"]
	},
	{
		id: "35",
		chapter: "35",
		title: "OXYGEN",
		titleDe: "Sauerstoff",
		summary: "Crew O2 bottle, Pax chemical generators, masks.",
		functions: ["Crew mask + bottle pressure", "Pax automatic drop"],
		computers: [],
		components: [{
			name: "Crew O2 bottle",
			note: "Cockpit / avionics"
		}],
		panels: ["20VU"],
		buses: [],
		notes: ["High pressure. Nur nach AMM."],
		relatedResets: [],
		relatedCbs: []
	},
	{
		id: "36",
		chapter: "36",
		title: "PNEUMATIC",
		titleDe: "Bleed / Pneumatik",
		summary: "IP/HP bleed ENG, APU bleed, BMC 1/2, crossbleed, packs, WAI, engine start.",
		functions: [
			"BMC overheat / leak",
			"X-Bleed auto/man",
			"APU bleed GND"
		],
		computers: [{
			name: "BMC 1/2",
			note: "Bleed Monitoring Computer"
		}],
		components: [{
			name: "Bleed ducts",
			note: "Pylon → wing → belly packs"
		}],
		panels: ["20VU"],
		buses: ["DC2", "DC ESS"],
		notes: ["Hot ducts in Pack-Bay. Packs OFF + bleed off vor Access."],
		relatedResets: ["bmc"],
		relatedCbs: ["bmc1"]
	},
	{
		id: "38",
		chapter: "38",
		title: "WATER / WASTE",
		titleDe: "Wasser / Abwasser",
		summary: "Potable water, waste tanks, vacuum toilets. Service panels AFT belly 197/198.",
		functions: [
			"Water fill/drain",
			"Waste service",
			"Vacuum generator"
		],
		computers: [],
		components: [{
			name: "Waste tank",
			note: "AFT, Zone 197/198"
		}],
		panels: ["197AB", "198DB"],
		buses: ["AC1"],
		notes: ["Belly AFT: Waste/Water. Hygiene + bonding."],
		relatedResets: [],
		relatedCbs: []
	},
	{
		id: "46",
		chapter: "46",
		title: "INFORMATION SYSTEMS",
		titleDe: "ATSU / Datalink",
		summary: "ATSU, ACARS, Printer, optional FMS AOC.",
		functions: [
			"AOC/ATC datalink",
			"PFR print",
			"Init via ATSU"
		],
		computers: [{
			name: "ATSU",
			note: "Avionics rack"
		}],
		components: [{
			name: "Printer",
			note: "Pedestal / side"
		}],
		panels: [],
		buses: ["AC1"],
		notes: ["ATSU CB reset nach TSM."],
		relatedResets: ["atsu"],
		relatedCbs: ["atsu"]
	},
	{
		id: "49",
		chapter: "49",
		title: "AIRBORNE AUXILIARY POWER",
		titleDe: "APU",
		summary: "APU in Tail Cone FR80+, ECB, starter, bleed, gen. APU fire bottle.",
		functions: ["ECB auto start/protect", "APU GEN + bleed GND/FLT limited"],
		computers: [{
			name: "ECB",
			note: "Electronic Control Box"
		}],
		components: [{
			name: "APU",
			note: "FR80–FR94 Tail Cone"
		}],
		panels: ["20VU"],
		buses: ["DC BAT", "AC APU"],
		notes: ["APU-Fuel-Line unter Belly 197/198. Fire test vor Start je Procedure."],
		relatedResets: ["apu"],
		relatedCbs: ["apu"]
	},
	{
		id: "52",
		chapter: "52",
		title: "DOORS",
		titleDe: "Türen",
		summary: "Pax 1/2 L/R, Overwing, FWD/AFT Cargo, Avionics, APU. Proximity, warning.",
		functions: ["Pax door escape slides", "Cargo doors hyd Yellow (FWD) / manual"],
		computers: [{
			name: "PSC",
			note: "Proximity Switch Control Unit"
		}],
		components: [{
			name: "Pax Door 1",
			note: "FR16–20"
		}],
		panels: [],
		buses: ["DC ESS"],
		notes: ["Door warnings oft proximity/rigging, kein Reset."],
		relatedResets: [],
		relatedCbs: []
	},
	{
		id: "53",
		chapter: "53",
		title: "FUSELAGE / BELLY FAIRING",
		titleDe: "Rumpf / Kielverkleidung",
		summary: "Belly Fairing unter Center: Zonen 147/148 und 191–198. Pack-Bays, Bleed, Fuel/Hyd, Waste/Water, APU-Fuel. Frame/STA/Stringer AMM 53-00-00.",
		functions: [
			"Zugang Pack 1 (Zone 191) und Pack 2 (Zone 192)",
			"Lage am Rumpf: Zone · Frame · STA mm · Stringer (X/Y/Z)",
			"AFT: Waste/Water, APU-Fuel (197/198)"
		],
		computers: [],
		components: [
			{
				name: "Belly Fairing L",
				note: "Zonen 147, 191, 193, 195, 197 — Fig 06-41-53-15500"
			},
			{
				name: "Belly Fairing R",
				note: "Zonen 148, 192, 194, 196, 198 — Fig 06-41-53-15600"
			},
			{
				name: "Frame / STA",
				note: "Spant + Station mm ab STA 0. AMM 53-00-00 Fig 001/003."
			},
			{
				name: "Stringer STGR 1–44",
				note: "STGR 1 Crown, 20 Kabinenboden, 43/44 Kiel."
			}
		],
		panels: [
			"191AT",
			"191CB",
			"192AT",
			"192AB",
			"147CB",
			"148CB",
			"197AB",
			"198DB"
		],
		buses: [],
		notes: [
			"Kein Tritt auf unverstärkte Tafeln. Bonding-Straps nach Einbau.",
			"A319/A321: Rumpf-Plugs — STA hinter Center weicht ab. Immer AMM des MSN.",
			"Lage: LH FR36 STGR 24 Zone 191. Stations/Frames-Reiter unter Struktur."
		],
		relatedResets: ["acsc", "bmc"],
		relatedCbs: ["acsc1", "acsc2"]
	},
	{
		id: "70",
		chapter: "71-80",
		title: "POWERPLANT CFM56-5",
		titleDe: "Triebwerk CFM56-5",
		summary: "CFM56-5A/5B. FADEC (ECU dual channel) + HMU. Start: Air Starter von Bleed.",
		functions: [
			"FADEC scheduling/limiting/BITE",
			"Ignition A/B",
			"Reverse"
		],
		computers: [{
			name: "ECU / EEC 1/2",
			note: "Dual Channel A/B"
		}, {
			name: "EIU 1/2",
			note: "Engine Interface Unit"
		}],
		components: [{
			name: "IDG / FADEC on engine",
			note: "Nacelle Zone 400"
		}],
		panels: ["105VU", "22VU"],
		buses: ["AC1", "AC2"],
		notes: ["FADEC Reset: ENG MASTER OFF, CBs nach TSM. Nicht im FLT improvisieren."],
		relatedResets: ["fadec"],
		relatedCbs: ["fadec1"]
	}
];
function getAta(id) {
	return ATA_SYSTEMS.find((s) => s.id === id);
}
var ZONE_META = {
	overhead: {
		labelDe: "Overhead",
		order: 1
	},
	glareshield: {
		labelDe: "Glareshield",
		order: 2
	},
	mip: {
		labelDe: "MIP",
		order: 3
	},
	pedestal: {
		labelDe: "Pedestal",
		order: 4
	},
	"cockpit-side": {
		labelDe: "Seite",
		order: 5
	},
	avionics: {
		labelDe: "Avionics",
		order: 6
	},
	external: {
		labelDe: "External",
		order: 7
	},
	cargo: {
		labelDe: "Cargo",
		order: 8
	},
	"wing-gear": {
		labelDe: "Flügel / Gear",
		order: 9
	}
};
var PANELS = [
	{
		id: "20VU",
		designation: "20VU",
		name: "Overhead",
		nameDe: "Overhead Systempanels",
		zone: "overhead",
		ata: ["00"],
		location: "Overhead FWD",
		controls: [{
			label: "System PBs",
			type: "pb"
		}],
		notes: "FWD fire/elec, AFT 49VU CBs."
	},
	{
		id: "13VU",
		designation: "13VU",
		name: "FCU / Glareshield",
		nameDe: "FCU Glareshield",
		zone: "glareshield",
		ata: ["22"],
		location: "Glareshield",
		controls: [{
			label: "FCU",
			type: "knob"
		}]
	},
	{
		id: "8VU",
		designation: "8VU",
		name: "Pedestal",
		nameDe: "Center Pedestal",
		zone: "pedestal",
		ata: ["22", "23"],
		location: "Pedestal",
		controls: [{
			label: "MCDU / RMP / ECP",
			type: "display"
		}]
	},
	{
		id: "105VU",
		designation: "105VU",
		name: "ENG / FIRE",
		nameDe: "ENG START / FIRE",
		zone: "overhead",
		ata: ["26", "70"],
		location: "Overhead FWD",
		controls: [{
			label: "ENG MASTER",
			type: "switch"
		}, {
			label: "FIRE",
			type: "guard"
		}]
	},
	{
		id: "22VU",
		designation: "22VU",
		name: "ENG MAN START",
		nameDe: "Manual Start",
		zone: "overhead",
		ata: ["70"],
		location: "Overhead",
		controls: [{
			label: "MAN START",
			type: "pb"
		}]
	},
	{
		id: "49VU",
		designation: "49VU",
		name: "CB Overhead AFT",
		nameDe: "CBs 49VU",
		zone: "overhead",
		ata: ["24"],
		location: "Overhead AFT",
		controls: [{
			label: "CBs",
			type: "cb"
		}]
	},
	{
		id: "121VU",
		designation: "121VU",
		name: "CB Rear",
		nameDe: "CBs 121VU",
		zone: "avionics",
		ata: ["24"],
		location: "Rear CB panel",
		controls: [{
			label: "CBs",
			type: "cb"
		}]
	},
	{
		id: "122VU",
		designation: "122VU",
		name: "CB Rear",
		nameDe: "CBs 122VU",
		zone: "avionics",
		ata: ["24"],
		location: "Rear CB panel",
		controls: [{
			label: "CBs",
			type: "cb"
		}]
	},
	{
		id: "35VU",
		designation: "35VU",
		name: "Oxy / Misc",
		nameDe: "35VU",
		zone: "overhead",
		ata: ["35"],
		location: "Overhead",
		controls: []
	},
	{
		id: "50VU",
		designation: "50VU",
		name: "Overhead AFT",
		nameDe: "50VU",
		zone: "overhead",
		ata: ["00"],
		location: "Overhead AFT",
		controls: []
	}
];
var OVERHEAD_LAYOUT = [
	{ id: "105VU" },
	{ id: "20VU" },
	{ id: "22VU" },
	{ id: "49VU" },
	{ id: "13VU" },
	{ id: "8VU" },
	{ id: "35VU" },
	{ id: "50VU" }
];
function getPanel(id) {
	return PANELS.find((p) => p.id === id);
}
var FAIRING_SHEETS = [{
	id: 1,
	title: "Links",
	side: "LH",
	fig: "06-41-53-15500",
	fsn: "FSN ALL",
	src: "/fairings/sheet-1.webp"
}, {
	id: 2,
	title: "Rechts",
	side: "RH",
	fig: "06-41-53-15600",
	fsn: "FSN ALL",
	src: "/fairings/sheet-2.webp"
}];
var L = (id, nameDe, zone, frames, ata, behind, x, y, note) => ({
	id,
	designation: id,
	name: id,
	nameDe,
	side: "L",
	zone,
	frames,
	ata,
	behind,
	sheet: 1,
	x,
	y,
	note
});
var R = (id, nameDe, zone, frames, ata, behind, x, y, note) => ({
	id,
	designation: id,
	name: id,
	nameDe,
	side: "R",
	zone,
	frames,
	ata,
	behind,
	sheet: 2,
	x,
	y,
	note
});
var BELLY_PANELS = [
	L("191AT", "Zugang 191AT · FWD oben", "191", "FR36–FR42", ["53", "21"], "Pack 1, ACM, Ram-Air. Residual Heat.", 22, 28, "Packs OFF vor Öffnen."),
	L("191BT", "Zugang 191BT · FWD oben", "191", "FR36–FR42", ["53", "21"], "Pack 1 Ducts / Trim.", 30, 28),
	L("191AB", "Zugang 191AB · FWD außen", "191", "FR36–FR42", ["53", "21"], "Pack 1 seitlich.", 18, 42),
	L("191CB", "Zugang 191CB · FWD unten", "191", "FR36–FR42", ["53", "21"], "Pack 1 unten, Drain.", 24, 58),
	L("191BB", "Zugang 191BB", "191", "FR36–FR42", ["53", "21"], "Pack 1.", 32, 52),
	L("191EB", "Zugang 191EB · oben", "191", "FR38–FR44", ["53", "21"], "Pack 1 / Mix-Übergang.", 38, 32),
	L("191CT", "Zugang 191CT · oben", "191", "FR40–FR45", ["53", "21"], "Pack 1 AFT.", 44, 28),
	L("195AB", "Zugang 195AB · Mid", "195", "FR40–FR47", ["53", "21"], "Mid fairing, Mix-Ducts.", 48, 40),
	L("195CB", "Zugang 195CB · Mid", "195", "FR40–FR47", ["53"], "Mid fairing.", 52, 52),
	L("147CB", "Zugang 147CB · Center", "147", "FR35–FR47", [
		"53",
		"28",
		"29"
	], "Mix-Unit, Center Tank, Hyd-Rohre.", 58, 48),
	L("147AB", "Zugang 147AB · Center unten", "147", "FR35–FR47", ["53", "28"], "Center lower.", 56, 62),
	L("193AB", "Zugang 193AB · Mid-Aft", "193", "FR42–FR47", ["53", "29"], "Hyd-Leitungen, Wing TE.", 64, 40),
	L("193AT", "Zugang 193AT · Mid-Aft oben", "193", "FR42–FR47", ["53", "29"], "Hyd / bleed runs.", 66, 28),
	L("197FB", "Zugang 197FB · AFT oben", "197", "FR47–FR59", [
		"53",
		"38",
		"49"
	], "Waste/Water, APU-Fuel-Line.", 78, 30),
	L("197AB", "Zugang 197AB · AFT unten", "197", "FR47–FR59", ["53", "38"], "Waste tank / water service.", 80, 58, "Hygiene. Bonding."),
	L("197CB", "Zugang 197CB · AFT unten", "197", "FR50–FR59", ["53", "38"], "Waste/Water.", 84, 62),
	L("197EB", "Zugang 197EB · AFT hinten", "197", "FR54–FR59", ["53", "49"], "APU fuel line / aft fairing.", 88, 48),
	R("192AT", "Zugang 192AT · FWD oben", "192", "FR36–FR42", ["53", "21"], "Pack 2, ACM, Ram-Air. Residual Heat.", 22, 28, "Packs OFF vor Öffnen."),
	R("192AB", "Zugang 192AB · FWD", "192", "FR36–FR42", ["53", "21"], "Pack 2.", 24, 44),
	R("192BB", "Zugang 192BB", "192", "FR36–FR42", ["53", "21"], "Pack 2 unten.", 28, 56),
	R("196AB", "Zugang 196AB · Mid", "196", "FR40–FR47", ["53", "21"], "Mid fairing RH.", 48, 40),
	R("148CB", "Zugang 148CB · Center", "148", "FR35–FR47", [
		"53",
		"28",
		"29"
	], "Mix-Unit RH, Fuel/Hyd.", 58, 48),
	R("194AB", "Zugang 194AB · Mid-Aft", "194", "FR42–FR47", ["53", "29"], "Hyd Yellow/Green RH.", 64, 40),
	R("198DB", "Zugang 198DB · AFT", "198", "FR47–FR59", [
		"53",
		"38",
		"49"
	], "Waste/Water RH, APU-Fuel.", 80, 52),
	R("198AB", "Zugang 198AB · AFT unten", "198", "FR47–FR59", ["53", "38"], "Waste/Water RH.", 82, 62)
];
function getBellyPanel(id) {
	return BELLY_PANELS.find((p) => p.id === id);
}
function bellyZones(sheet) {
	return [...new Set(BELLY_PANELS.filter((p) => p.sheet === sheet).map((p) => p.zone))];
}
var STATION_FIGS = [
	{
		id: "sec",
		src: "/stations/fig-001.webp",
		fig: "001 / 53-00-00",
		title: "Sektionen",
		caption: "Fuselage — Section Division. STA in mm. Nose → Tail Cone."
	},
	{
		id: "skin",
		src: "/stations/fig-002.webp",
		fig: "002 / 53-00-00",
		title: "Hautfelder",
		caption: "Main Panel and Section Configuration. Oben LH, unten RH."
	},
	{
		id: "frames",
		src: "/stations/fig-004.webp",
		fig: "003 / 53-00-00",
		title: "Frames / STA",
		caption: "Frame- und Station-Nummern. Alle STA-Maße in mm."
	},
	{
		id: "frames-full",
		src: "/stations/fig-003.webp",
		fig: "003 / 53-00-00",
		title: "Frames beidseitig",
		caption: "FR/STA oben und unten am Rumpf. Bezug für Damage/Access."
	},
	{
		id: "stgr",
		src: "/stations/fig-005.webp",
		fig: "06-30-00-11700",
		title: "Stringer",
		caption: "STGR 1–44 am Spant. Kabinenboden = STGR 20. FSN ALL."
	}
];
var FUSELAGE_SECTIONS = [
	{
		id: "nose",
		amm: "53-10-00",
		name: "Nose / Forward",
		nameDe: "Nase / FWD Rumpf",
		from: "FR1 · STA 0",
		to: "FR24 · STA 6800",
		note: "Radome, Cockpit, FWD Pressure Bulkhead bei FR24. Avionics darunter."
	},
	{
		id: "fwd",
		amm: "53-20-00",
		name: "Forward Fuselage",
		nameDe: "Vorderrumpf",
		from: "FR24 · STA 6800",
		to: "FR35/36 · STA 10367 / 10804",
		note: "FWD Kabine, FWD Cargo, Pax-Tür 1 L/R. Übergang auf Center bei FR35/36."
	},
	{
		id: "center",
		amm: "53-30-00",
		name: "Center Fuselage",
		nameDe: "Mittelrumpf + Belly Fairing",
		from: "FR35/36 · STA 10367",
		to: "FR54 · STA 16415",
		note: "Wing Box, Belly Fairing (Pack-Bays), Overwing-Exits, Center Tank. FR47 STA 13808."
	},
	{
		id: "aft-ctr",
		amm: "53-30-00",
		name: "AFT Center",
		nameDe: "AFT Center",
		from: "FR54 · STA 16415",
		to: "FR65 · STA 19804",
		note: "MLG-Anschluss, AFT Cargo-Beginn. Hyd Green/Yellow im MLG-Bereich."
	},
	{
		id: "rear",
		amm: "53-40-00",
		name: "Rear Fuselage",
		nameDe: "Hinterrumpf",
		from: "FR65 · STA 19804",
		to: "FR80 · STA 24980",
		note: "AFT Pax-Tür, AFT Cargo, Rear Pressure Bulkhead Richtung FR70 STA 21647."
	},
	{
		id: "cone",
		amm: "53-50-00",
		name: "AFT Cone / Tail",
		nameDe: "Heckkonus / Tail",
		from: "FR80 · STA 24980",
		to: "FR94 · STA 29547",
		note: "APU-Bay, Tail Cone. FR84 STA 26347. VS/THS-Anschluss."
	}
];
var KEY_FRAMES = [
	{
		id: "FR1",
		fr: "FR1",
		sta: "0",
		where: "Nase / Radome",
		note: "STA-Null. WXR hinter Radome."
	},
	{
		id: "FR11",
		fr: "FR11",
		sta: "3865",
		where: "Cockpit / FWD",
		note: "Windschutz, LOC/G/S-Nase dahinter."
	},
	{
		id: "FR16",
		fr: "FR16",
		sta: "—",
		where: "Pax Door 1",
		note: "FWD Pax L/R, typ. um FR16–20."
	},
	{
		id: "FR24",
		fr: "FR24",
		sta: "6800",
		where: "FWD Pressure Bulkhead",
		note: "Cockpit → Kabine. FWD Cargo beginnt. Avionics darunter."
	},
	{
		id: "FR35",
		fr: "FR35",
		sta: "10367",
		where: "Center-Beginn",
		note: "Übergang Forward → Center. Overwing-Nähe."
	},
	{
		id: "FR36",
		fr: "FR36",
		sta: "10804",
		where: "Wing LE / Belly FWD",
		note: "Pack-Bay FWD (Zonen 191/192). Belly-Tafeln ab hier."
	},
	{
		id: "FR42",
		fr: "FR42",
		sta: "—",
		where: "Wing Box Mitte",
		note: "Belly 191/195/147. Mix-Unit-Ducts, Fuel Center."
	},
	{
		id: "FR47",
		fr: "FR47",
		sta: "13808",
		where: "Wing TE / MLG FWD",
		note: "Belly 193/194/148. Hyd-Leitungen."
	},
	{
		id: "FR54",
		fr: "FR54",
		sta: "16415",
		where: "MLG / AFT Center",
		note: "Fahrwerkskasten. Belly AFT-Beginn 197/198."
	},
	{
		id: "FR57",
		fr: "FR57",
		sta: "—",
		where: "Belly AFT",
		note: "Waste/Water, APU-Fuel-Line unter der Fairing."
	},
	{
		id: "FR65",
		fr: "FR65",
		sta: "19804",
		where: "AFT Cargo / Pax 2",
		note: "Hinterrumpf-Beginn. AFT Pax-Tür in diesem Band."
	},
	{
		id: "FR70",
		fr: "FR70",
		sta: "21647",
		where: "Rear Pressure Bulkhead",
		note: "Druckende. AFT Cone danach unpressurized + APU."
	},
	{
		id: "FR80",
		fr: "FR80",
		sta: "24980",
		where: "APU / Cone",
		note: "APU-Bay-Beginn. FR84 STA 26347."
	},
	{
		id: "FR84",
		fr: "FR84",
		sta: "26347",
		where: "Tail Cone",
		note: "VS Front Spar-Nähe, APU-Zugang."
	},
	{
		id: "FR94",
		fr: "FR94",
		sta: "29547",
		where: "Heckabschluss",
		note: "Letzter Spant der Zeichnung. THS/VS."
	}
];
var STRINGER_BANDS = [
	{
		id: "crown",
		range: "STGR 1",
		nameDe: "First / Crown",
		note: "Oben Mitte (12 Uhr). Antennen GPS/VHF/TCAS auf der Crown."
	},
	{
		id: "upper",
		range: "STGR 2–9",
		nameDe: "Oberrumpf",
		note: "Crown bis Fensterband. Cabin-Ceiling, PSU-Bereich innen."
	},
	{
		id: "win",
		range: "STGR 10–13",
		nameDe: "Fensterband",
		note: "Cabin Windows. Y ≈ 1975. DEU-A, Window Seals."
	},
	{
		id: "to-floor",
		range: "STGR 14–19",
		nameDe: "Fenster → Boden",
		note: "Seitenwand, Dado Panel, Cabin-Floor-Anschluss bei STGR 20."
	},
	{
		id: "floor",
		range: "STGR 20",
		nameDe: "Kabinenboden",
		note: "Floor Grid. Darüber Cabin, darunter Cargo/Belly."
	},
	{
		id: "cargo",
		range: "STGR 21–32",
		nameDe: "Unterflur / Cargo",
		note: "Cargo-Liner, System-Runs (Elec, Air, Fuel, Hyd)."
	},
	{
		id: "lobe",
		range: "STGR 33–42",
		nameDe: "Lower Lobe",
		note: "Unterer Rumpf, Übergang Belly Fairing."
	},
	{
		id: "keel",
		range: "STGR 43–44",
		nameDe: "Kiel",
		note: "6 Uhr. Belly Fairing sitzt hier. Z ≈ 2166 an der Tafel."
	}
];
var LOCATION_RULES = [
	{
		id: "zone",
		title: "Zone (3-stellig)",
		body: "ATA-Zone steht vorn in der Panel-FIN: 191AT → Zone 191. Ungerade = links, gerade = rechts (191 L / 192 R). 100er Nase/FWD, 140er Center-Lower, 190er Belly Fairing, 200 Flügel, 300 Leitwerk, 700 Fahrwerk."
	},
	{
		id: "fr",
		title: "Frame (FR)",
		body: "Spant, von der Nase nach hinten nummeriert. Damage, Access und Belly-Tafeln werden mit nächstem FR angegeben. FR24 Druckschott FWD, FR36 Wing/Pack, FR47 MLG, FR70 Druckschott AFT."
	},
	{
		id: "sta",
		title: "Station (STA)",
		body: "Längsmaße in Millimetern ab STA 0 (Nase). X-Achse des Flugzeugs. A319/A321 haben Rumpf-Plugs — STA hinter dem Center weicht ab. Immer AMM 53-00-00 des MSN."
	},
	{
		id: "stgr",
		title: "Stringer (STGR)",
		body: "Längsholme um den Spant. STGR 1 = oben, STGR 20 = Kabinenboden, STGR 43/44 = Kiel. LH und RH spiegeln (gleiche Nummer, andere Seite)."
	},
	{
		id: "xyz",
		title: "X / Y / Z",
		body: "X = längs (STA, positiv achtern). Y = quer, positiv rechts (RH). Z = hoch. AMM gibt Puncture/Dent oft als X/Y/Z in mm."
	},
	{
		id: "write",
		title: "Lage schreiben",
		body: "Kurz: „LH FR36 STGR 24 Zone 191“ oder Panel-FIN „191CB“. Seite zuerst, dann FR, dann STGR, dann Zone/Panel. Foto + PFR-ATA dazu."
	}
];
var FINDING_EXAMPLE = {
	title: "Befund schreiben",
	lines: [
		"LH FR36–FR37 STGR 24  Zone 191",
		"180 mm aft FR36 · 40 mm below STGR 24",
		"DENT 2,1 mm deep · 45 × 30 mm"
	],
	note: "Seite zuerst, dann FR, STGR, Zone/Panel. Foto + PFR-ATA. Tiefe/Abmessung in mm. AMM/SRM des MSN."
};
var FAMILY_NOTE = "A320-Tafel. A319 kürzer, A321 mit Plugs (u. a. FR35.1–FR35.8 FWD). STA hinter dem Center am MSN prüfen. AMM 53-00-00 / 06-00-00 des MSN ist führend.";
var ATA_ZONES = [
	{
		id: "z100",
		range: "100",
		nameDe: "Rumpf gesamt"
	},
	{
		id: "z110",
		range: "110",
		nameDe: "Nase / Radome"
	},
	{
		id: "z120",
		range: "120",
		nameDe: "Cockpit"
	},
	{
		id: "z130",
		range: "130",
		nameDe: "FWD Fuselage"
	},
	{
		id: "z140",
		range: "140",
		nameDe: "Center / Wing Box"
	},
	{
		id: "z147",
		range: "147 / 148",
		nameDe: "Center-Lower Mix/Fuel/Hyd"
	},
	{
		id: "z150",
		range: "150",
		nameDe: "AFT Fuselage"
	},
	{
		id: "z190",
		range: "191–198",
		nameDe: "Belly Fairing"
	},
	{
		id: "z200",
		range: "200",
		nameDe: "Flügel"
	},
	{
		id: "z300",
		range: "300",
		nameDe: "Leitwerk"
	},
	{
		id: "z400",
		range: "400",
		nameDe: "Nacelle / Pylon"
	},
	{
		id: "z500",
		range: "500",
		nameDe: "Türen"
	},
	{
		id: "z700",
		range: "700",
		nameDe: "Fahrwerk"
	}
];
var SKIN_SECTIONS = [
	{
		id: "s1112",
		name: "SECTION 11/12",
		where: "Nase / FWD"
	},
	{
		id: "s1314",
		name: "SECTION 13/14",
		where: "FWD Kabine"
	},
	{
		id: "s14a",
		name: "SECTION 14A",
		where: "Übergang Center"
	},
	{
		id: "s1521",
		name: "SECTION 15/21",
		where: "Center / Wing Box"
	},
	{
		id: "s1617",
		name: "SECTION 16/17",
		where: "AFT Center"
	},
	{
		id: "s16a",
		name: "SECTION 16A",
		where: "AFT Center Zusatz"
	},
	{
		id: "s18",
		name: "SECTION 18",
		where: "Hinterrumpf"
	},
	{
		id: "s19",
		name: "SECTION 19",
		where: "AFT / Cone"
	},
	{
		id: "s191",
		name: "SECTION 19.1",
		where: "Tail Cone"
	}
];
var ANTENNA_SHEETS = [{
	id: 1,
	title: "Oberseite",
	src: "/antennas/sheet-1.webp",
	fig: "05-50-00-991 Sh 1"
}, {
	id: 2,
	title: "Unterseite",
	src: "/antennas/sheet-2.webp",
	fig: "05-50-00-991 Sh 2"
}];
var ANTENNA_KINDS = [
	{
		id: "antenna",
		label: "Antennen"
	},
	{
		id: "probe",
		label: "Probes"
	},
	{
		id: "sensor",
		label: "Sensoren"
	},
	{
		id: "light",
		label: "Lichter"
	}
];
var ANTENNAS = [
	{
		id: "gps1",
		designation: "GPS 1",
		name: "GPS / MMR 1",
		location: "Crown FWD",
		ata: "34",
		kind: "antenna",
		side: "C",
		sheet: 1,
		x: 28,
		y: 42,
		note: "MMR. GPS option vs GPS-MMR mutually exclusive."
	},
	{
		id: "gps2",
		designation: "GPS 2",
		name: "GPS / MMR 2",
		location: "Crown FWD",
		ata: "34",
		kind: "antenna",
		side: "C",
		sheet: 1,
		x: 32,
		y: 42
	},
	{
		id: "vhf1",
		designation: "VHF 1",
		name: "VHF Comm 1",
		location: "Crown",
		ata: "23",
		kind: "antenna",
		side: "C",
		sheet: 1,
		x: 40,
		y: 40,
		frequency: "118–137 MHz"
	},
	{
		id: "vhf2",
		designation: "VHF 2",
		name: "VHF Comm 2",
		location: "Belly",
		ata: "23",
		kind: "antenna",
		side: "C",
		sheet: 2,
		x: 42,
		y: 48,
		frequency: "118–137 MHz"
	},
	{
		id: "vhf3",
		designation: "VHF 3",
		name: "VHF Comm 3",
		location: "Crown AFT",
		ata: "23",
		kind: "antenna",
		side: "C",
		sheet: 1,
		x: 62,
		y: 40
	},
	{
		id: "tcas-up",
		designation: "TCAS UP",
		name: "TCAS directional upper",
		location: "Crown",
		ata: "34",
		kind: "antenna",
		side: "C",
		sheet: 1,
		x: 50,
		y: 38
	},
	{
		id: "tcas-dn",
		designation: "TCAS DN",
		name: "TCAS directional lower",
		location: "Belly",
		ata: "34",
		kind: "antenna",
		side: "C",
		sheet: 2,
		x: 50,
		y: 50
	},
	{
		id: "atc1",
		designation: "ATC 1",
		name: "Transponder 1",
		location: "Belly",
		ata: "34",
		kind: "antenna",
		side: "C",
		sheet: 2,
		x: 36,
		y: 52
	},
	{
		id: "atc2",
		designation: "ATC 2",
		name: "Transponder 2",
		location: "Crown",
		ata: "34",
		kind: "antenna",
		side: "C",
		sheet: 1,
		x: 56,
		y: 40
	},
	{
		id: "adf",
		designation: "ADF",
		name: "ADF Loop/Sense",
		location: "Belly FWD",
		ata: "34",
		kind: "antenna",
		side: "C",
		sheet: 2,
		x: 24,
		y: 48,
		optional: true
	},
	{
		id: "vor-l",
		designation: "VOR L",
		name: "VOR/LOC",
		location: "VS / Tail",
		ata: "34",
		kind: "antenna",
		side: "L",
		sheet: 1,
		x: 88,
		y: 30
	},
	{
		id: "gs",
		designation: "G/S",
		name: "Glide Slope",
		location: "Nase unter Windschutz",
		ata: "34",
		kind: "antenna",
		side: "C",
		sheet: 1,
		x: 12,
		y: 48
	},
	{
		id: "loc",
		designation: "LOC",
		name: "Localizer",
		location: "Nase",
		ata: "34",
		kind: "antenna",
		side: "C",
		sheet: 1,
		x: 10,
		y: 44
	},
	{
		id: "ra1",
		designation: "RA 1",
		name: "Radio Altimeter 1",
		location: "Belly",
		ata: "34",
		kind: "antenna",
		side: "L",
		sheet: 2,
		x: 46,
		y: 58
	},
	{
		id: "ra2",
		designation: "RA 2",
		name: "Radio Altimeter 2",
		location: "Belly",
		ata: "34",
		kind: "antenna",
		side: "R",
		sheet: 2,
		x: 54,
		y: 58
	},
	{
		id: "wxr",
		designation: "WXR",
		name: "Weather Radar",
		location: "Radome FR1",
		ata: "34",
		kind: "antenna",
		side: "C",
		sheet: 1,
		x: 6,
		y: 44
	},
	{
		id: "elt",
		designation: "ELT",
		name: "Emergency Locator",
		location: "Crown AFT",
		ata: "23",
		kind: "antenna",
		side: "C",
		sheet: 1,
		x: 78,
		y: 38
	},
	{
		id: "satcom",
		designation: "SATCOM",
		name: "SATCOM (opt)",
		location: "Crown",
		ata: "23",
		kind: "antenna",
		side: "C",
		sheet: 1,
		x: 70,
		y: 36,
		optional: true
	},
	{
		id: "marker",
		designation: "MKR",
		name: "Marker Beacon",
		location: "Belly FWD",
		ata: "34",
		kind: "antenna",
		side: "C",
		sheet: 2,
		x: 30,
		y: 50
	},
	{
		id: "dme",
		designation: "DME",
		name: "DME",
		location: "Belly",
		ata: "34",
		kind: "antenna",
		side: "C",
		sheet: 2,
		x: 40,
		y: 54
	},
	{
		id: "pitot-l",
		designation: "PITOT L",
		name: "Pitot Captain",
		location: "Nase LH",
		ata: "34",
		kind: "probe",
		side: "L",
		sheet: 1,
		x: 14,
		y: 36
	},
	{
		id: "pitot-r",
		designation: "PITOT R",
		name: "Pitot F/O",
		location: "Nase RH",
		ata: "34",
		kind: "probe",
		side: "R",
		sheet: 1,
		x: 14,
		y: 56
	},
	{
		id: "pitot-s",
		designation: "PITOT STBY",
		name: "Pitot Standby",
		location: "Nase",
		ata: "34",
		kind: "probe",
		side: "C",
		sheet: 1,
		x: 16,
		y: 46
	},
	{
		id: "aoa-l",
		designation: "AOA L",
		name: "AOA Captain",
		location: "Nase LH",
		ata: "34",
		kind: "probe",
		side: "L",
		sheet: 1,
		x: 18,
		y: 34
	},
	{
		id: "aoa-r",
		designation: "AOA R",
		name: "AOA F/O",
		location: "Nase RH",
		ata: "34",
		kind: "probe",
		side: "R",
		sheet: 1,
		x: 18,
		y: 58
	},
	{
		id: "tat",
		designation: "TAT",
		name: "Total Air Temperature",
		location: "Nase",
		ata: "34",
		kind: "probe",
		side: "C",
		sheet: 1,
		x: 20,
		y: 44
	},
	{
		id: "static-l",
		designation: "STATIC L",
		name: "Static ports",
		location: "FWD fuselage LH",
		ata: "34",
		kind: "sensor",
		side: "L",
		sheet: 1,
		x: 22,
		y: 32
	},
	{
		id: "static-r",
		designation: "STATIC R",
		name: "Static ports",
		location: "FWD fuselage RH",
		ata: "34",
		kind: "sensor",
		side: "R",
		sheet: 1,
		x: 22,
		y: 60
	},
	{
		id: "beacon-top",
		designation: "BEACON",
		name: "Anti-collision upper",
		location: "Crown",
		ata: "33",
		kind: "light",
		side: "C",
		sheet: 1,
		x: 48,
		y: 36
	},
	{
		id: "beacon-bot",
		designation: "BEACON BOT",
		name: "Anti-collision lower",
		location: "Belly",
		ata: "33",
		kind: "light",
		side: "C",
		sheet: 2,
		x: 48,
		y: 44
	},
	{
		id: "logo",
		designation: "LOGO",
		name: "Logo light",
		location: "VS / Tail",
		ata: "33",
		kind: "light",
		side: "C",
		sheet: 1,
		x: 90,
		y: 34
	}
];
var CBS = [
	{
		id: "elac1",
		fin: "5CC",
		name: "ELAC 1",
		nameDe: "ELAC 1",
		panel: "49VU",
		bus: "AC ESS",
		ata: "27",
		rating: "5A"
	},
	{
		id: "elac2",
		fin: "6CC",
		name: "ELAC 2",
		nameDe: "ELAC 2",
		panel: "49VU",
		bus: "AC2",
		ata: "27",
		rating: "5A"
	},
	{
		id: "sec1",
		fin: "7CC",
		name: "SEC 1",
		nameDe: "SEC 1",
		panel: "49VU",
		bus: "AC ESS",
		ata: "27"
	},
	{
		id: "sec2",
		fin: "8CC",
		name: "SEC 2",
		nameDe: "SEC 2",
		panel: "49VU",
		bus: "AC2",
		ata: "27"
	},
	{
		id: "sec3",
		fin: "9CC",
		name: "SEC 3",
		nameDe: "SEC 3",
		panel: "49VU",
		bus: "AC1",
		ata: "27"
	},
	{
		id: "fac1",
		fin: "5CA",
		name: "FAC 1",
		nameDe: "FAC 1",
		panel: "49VU",
		bus: "AC ESS",
		ata: "22"
	},
	{
		id: "fac2",
		fin: "6CA",
		name: "FAC 2",
		nameDe: "FAC 2",
		panel: "49VU",
		bus: "AC2",
		ata: "22"
	},
	{
		id: "fmgc1",
		fin: "1CA",
		name: "FMGC 1",
		nameDe: "FMGC 1",
		panel: "49VU",
		bus: "AC ESS",
		ata: "22"
	},
	{
		id: "fmgc2",
		fin: "2CA",
		name: "FMGC 2",
		nameDe: "FMGC 2",
		panel: "49VU",
		bus: "AC2",
		ata: "22"
	},
	{
		id: "adiru1",
		fin: "1FP",
		name: "ADIRU 1",
		nameDe: "ADIRU 1",
		panel: "49VU",
		bus: "AC ESS",
		ata: "34"
	},
	{
		id: "adiru2",
		fin: "2FP",
		name: "ADIRU 2",
		nameDe: "ADIRU 2",
		panel: "49VU",
		bus: "AC2",
		ata: "34"
	},
	{
		id: "adiru3",
		fin: "3FP",
		name: "ADIRU 3",
		nameDe: "ADIRU 3",
		panel: "49VU",
		bus: "AC1",
		ata: "34"
	},
	{
		id: "cids1",
		fin: "1WN",
		name: "CIDS 1",
		nameDe: "CIDS DIR 1",
		panel: "121VU",
		bus: "AC1",
		ata: "23"
	},
	{
		id: "cids2",
		fin: "2WN",
		name: "CIDS 2",
		nameDe: "CIDS DIR 2",
		panel: "122VU",
		bus: "AC2",
		ata: "23"
	},
	{
		id: "acsc1",
		fin: "10HN",
		name: "ACSC 1",
		nameDe: "ACSC 1",
		panel: "49VU",
		bus: "AC1",
		ata: "21"
	},
	{
		id: "acsc2",
		fin: "11HN",
		name: "ACSC 2",
		nameDe: "ACSC 2",
		panel: "49VU",
		bus: "AC2",
		ata: "21"
	},
	{
		id: "aevc",
		fin: "1HQ",
		name: "AEVC",
		nameDe: "Avionics Vent",
		panel: "49VU",
		bus: "DC1",
		ata: "21"
	},
	{
		id: "bscu",
		fin: "1GG",
		name: "BSCU",
		nameDe: "BSCU",
		panel: "49VU",
		bus: "DC1",
		ata: "32"
	},
	{
		id: "lgciu1",
		fin: "5GA",
		name: "LGCIU 1",
		nameDe: "LGCIU 1",
		panel: "49VU",
		bus: "DC ESS",
		ata: "32"
	},
	{
		id: "lgciu2",
		fin: "6GA",
		name: "LGCIU 2",
		nameDe: "LGCIU 2",
		panel: "49VU",
		bus: "DC2",
		ata: "32"
	},
	{
		id: "gcu1",
		fin: "1XU",
		name: "GCU 1",
		nameDe: "GCU IDG 1",
		panel: "121VU",
		bus: "DC1",
		ata: "24"
	},
	{
		id: "gcu2",
		fin: "2XU",
		name: "GCU 2",
		nameDe: "GCU IDG 2",
		panel: "122VU",
		bus: "DC2",
		ata: "24"
	},
	{
		id: "bmc1",
		fin: "10HL",
		name: "BMC 1",
		nameDe: "BMC 1",
		panel: "49VU",
		bus: "DC2",
		ata: "36"
	},
	{
		id: "bmc2",
		fin: "11HL",
		name: "BMC 2",
		nameDe: "BMC 2",
		panel: "49VU",
		bus: "DC ESS",
		ata: "36"
	},
	{
		id: "fwc1",
		fin: "1WW",
		name: "FWC 1",
		nameDe: "FWC 1",
		panel: "49VU",
		bus: "DC ESS",
		ata: "31"
	},
	{
		id: "fwc2",
		fin: "2WW",
		name: "FWC 2",
		nameDe: "FWC 2",
		panel: "49VU",
		bus: "DC2",
		ata: "31"
	},
	{
		id: "sdac1",
		fin: "1WX",
		name: "SDAC 1",
		nameDe: "SDAC 1",
		panel: "49VU",
		bus: "DC ESS",
		ata: "31"
	},
	{
		id: "cvr",
		fin: "1WU",
		name: "CVR",
		nameDe: "CVR",
		panel: "121VU",
		bus: "AC ESS",
		ata: "31"
	},
	{
		id: "atsu",
		fin: "1T1",
		name: "ATSU",
		nameDe: "ATSU",
		panel: "121VU",
		bus: "AC1",
		ata: "46"
	},
	{
		id: "apu",
		fin: "1KP",
		name: "APU ECB",
		nameDe: "APU ECB",
		panel: "49VU",
		bus: "DC BAT",
		ata: "49"
	},
	{
		id: "fadec1",
		fin: "1KS",
		name: "EIU 1 / FADEC",
		nameDe: "EIU 1",
		panel: "121VU",
		bus: "AC1",
		ata: "70"
	},
	{
		id: "fadec2",
		fin: "2KS",
		name: "EIU 2 / FADEC",
		nameDe: "EIU 2",
		panel: "122VU",
		bus: "AC2",
		ata: "70"
	},
	{
		id: "iggs",
		fin: "1WG",
		name: "IGGS / ICU",
		nameDe: "IGGS",
		panel: "121VU",
		bus: "AC1",
		ata: "47",
		note: "FIN 1WG – nicht doppelt."
	}
];
function getCb(id) {
	return CBS.find((c) => c.id === id);
}
var s = (id, name, ata, kind, when, wait, after, steps, extra = {}) => ({
	id,
	name,
	ata,
	kind,
	when,
	wait,
	after,
	steps: steps.map((text, i) => ({
		n: i + 1,
		text
	})),
	...extra
});
var RESETS = [
	s("elac", "ELAC 1/2 Reset", "27", "switch", "ELAC FAULT, pitch/roll law degradation", "OFF 10 s, dann ON", "ELAC FAULT weg, Normal Law wenn Hyd ok", [
		"TSM/ECAM bestätigen. GND, Hyd verfügbar.",
		"Overhead ELAC 1 (bzw. 2) OFF.",
		"10 s warten.",
		"ELAC ON. Status prüfen."
	], {
		ecam: "ELAC 1(2) FAULT",
		amm: "TSM 27",
		hot: true,
		aliases: ["elac1", "elac2"],
		relatedCbs: ["elac1", "elac2"]
	}),
	s("sec", "SEC 1/2/3 Reset", "27", "switch", "SEC FAULT, spoiler/elev standby", "OFF 10 s", "SEC FAULT weg", ["TSM. Overhead SEC pb OFF 10 s ON.", "Spoiler/speedbrake Status."], {
		ecam: "SEC FAULT",
		hot: true
	}),
	s("fac", "FAC 1/2 Reset", "22", "switch", "FAC FAULT, yaw damper / rudder trim / RTLU", "OFF 10 s", "FAC FAULT weg, Yaw ok", ["GND. FAC pb Overhead OFF 10 s ON.", "Rudder trim zero, yaw damper check."], {
		ecam: "FAC FAULT",
		aliases: ["fac1"]
	}),
	s("fmgc", "FMGC / MCDU Reset", "22", "computer", "FMGC fail, MCDU blank, opposite range/mode", "30–60 s", "MCDU A/C STATUS, FMGC aligned", [
		"MCDU MENU → MCDU RESET wenn angeboten.",
		"Sonst CB FMGC 1/2 pull 1 min, push.",
		"FMS position / IRS check."
	], {
		ecam: "FMGC FAULT",
		relatedCbs: ["fmgc1", "fmgc2"]
	}),
	s("adiru", "ADIRU Align / Reset", "34", "switch", "ADIRU FAULT, ATT/HDG flag, ALIGN", "Full align 3–10 min", "ALIGN weg, IRS NAV", [
		"GND, Aircraft still. ADIRS rotary NAV.",
		"Nicht bewegen. Fast Align nur nach TSM.",
		"ADR/IR pb nur nach TSM OFF/ON."
	], {
		ecam: "ADIRU FAULT",
		hot: true,
		aliases: ["adirs", "irs"]
	}),
	s("cids", "CIDS Reset", "23", "switch", "Cabin lights/PSU/PA fail, CIDS FAULT", "3–10 s + boot", "Cabin normal, FAP ok", [
		"FAP: CIDS RESET 3 s (je AMM).",
		"Oder CB CIDS 1/2 pull 10 s.",
		"Cabin kurz dunkel = normal."
	], {
		ecam: "CIDS FAULT",
		hot: true,
		relatedCbs: ["cids1"]
	}),
	s("bscu", "BSCU Reset", "32", "switch", "BRAKES, NWS, A/SKID FAULT", "OFF 10 s", "A/SKID normal, NWS ok", [
		"GND, chock, Park Brake je TSM.",
		"A/SKID & N/W STRG OFF 10 s ON.",
		"Pedal/NWS check ohne bewegen wenn verboten."
	], {
		ecam: "ANTI SKID / NWS",
		hot: true,
		relatedCbs: ["bscu"]
	}),
	s("aevc", "AEVC / Avionics Vent", "21", "computer", "VENT, BLOWER/EXTRACT FAULT, AVNCS SYS", "CB 1 min", "VENT normal, no smoke config stuck", [
		"Konfig GND/FLT prüfen.",
		"AEVC CB pull 60 s, push.",
		"Blower/Extract laufen hören."
	], {
		ecam: "VENT / AVNCS SYS",
		aliases: ["ventavncssys", "vent"],
		relatedCbs: ["aevc"]
	}),
	s("acsc", "ACSC / Pack Reset", "21", "switch", "PACK FAULT, ZONE, TRIM AIR", "OFF 30 s", "PACK FLOW, Zone temp ok", [
		"Pack pb OFF. 30 s. ON.",
		"ACSC CB nur TSM.",
		"Hot air / trim prüfen."
	], {
		ecam: "PACK FAULT",
		relatedCbs: ["acsc1"]
	}),
	s("gcu", "GCU / GEN Reset", "24", "procedure", "GEN FAULT, IDG, GEN 1(2)", "je TSM", "GEN online, no FAULT", [
		"IDG disconnect nicht als Reset missbrauchen (one shot).",
		"GCU CB nach TSM.",
		"EXT/APU vor IDG-Versuchen."
	], {
		ecam: "GEN FAULT",
		aliases: ["idg"],
		relatedCbs: ["gcu1"]
	}),
	s("bmc", "BMC / Bleed Reset", "36", "computer", "AIR ENG 1(2) BLEED, BMC", "CB 10 s", "Bleed pressure normal", [
		"Bleed pb OFF. Cool down.",
		"BMC CB pull/push nach TSM.",
		"Leak/OHEAT nicht totresetten."
	], {
		ecam: "AIR BLEED",
		relatedCbs: ["bmc1"]
	}),
	s("fwc", "FWC / SDAC", "31", "cb", "E/WD locked, FWC FAULT, SDAC", "1 min", "E/WD refresh, warnings ok", ["Nur TSM. FWC/SDAC CB.", "PFR nachher ziehen."], {
		ecam: "FWC FAULT",
		relatedCbs: ["fwc1"]
	}),
	s("cvr", "CVR", "31", "cb", "CVR FAULT", "10 s", "CVR gong / test", ["CVR CB. Test am panel.", "CVR erase nur authorized."], { relatedCbs: ["cvr"] }),
	s("lgciu", "LGCIU", "32", "cb", "L/G, DOOR, LGCIU FAULT", "10 s", "Gear indications ok", ["GND. LGCIU CB nach TSM.", "Proximity/rigging oft Ursache, kein Reset."]),
	s("apu", "APU ECB", "49", "switch", "APU FAULT, AUTO SHUTDOWN", "Cool down + master", "APU AVAIL", [
		"MASTER OFF, cool (typ. 2 min nach TSM).",
		"Nicht gegen Fire-Loop resetten.",
		"ECB CB nur TSM."
	], {
		ecam: "APU FAULT",
		relatedCbs: ["apu"]
	}),
	s("fadec", "FADEC / ECU", "70", "cb", "ENG FADEC FAULT, EIU", "MASTER OFF + TSM", "Channel in control", ["ENG MASTER OFF.", "EIU/FADEC CB nach TSM, nicht im FLT improvisieren."], { relatedCbs: ["fadec1"] }),
	s("atsu", "ATSU", "46", "cb", "ATSU FAULT, no AOC", "1 min", "ATSU INIT ok", ["ATSU CB pull 60 s.", "INIT/DATALINK check."], { relatedCbs: ["atsu"] }),
	s("phc", "Probe Heat", "30", "cb", "PITOT/AOA/TAT HEAT", "10 s", "Heat am GND/FLT je logic", ["PHC CB nach TSM.", "GND heat logic beachten."]),
	s("whc", "Window Heat", "30", "cb", "WINDOW HEAT FAULT", "10 s", "Window heat on", ["WHC CB. Window clear."]),
	s("fire-test", "FIRE TEST", "26", "procedure", "Test vor Flight / nach Arbeit", "Test cycle", "CRC + lights, agent not discharged", [
		"Overhead FIRE TEST.",
		"Agent squib nicht triggern.",
		"Loop fail → TSM nicht Test-Spam."
	]),
	s("isis", "ISIS", "34", "cb", "ISIS FAULT (Enhanced)", "Align", "ISIS flags clear", ["ISIS CB / brightness.", "Att/alt flags nach TSM."]),
	s("wxr", "WXR", "34", "switch", "WXR FAULT, ND image", "OFF/ON", "WXR image", ["WXR SYS OFF, 10 s, ON.", "Radome/waveguide nicht als Reset."]),
	s("fqi", "FQIS", "28", "cb", "FUEL QTY, FQI", "1 min", "Quantity indicated", ["FQI CB. BITE über CFDS."])
];
function getReset(id) {
	const t = id.toLowerCase();
	return RESETS.find((r) => r.id === t || r.aliases?.includes(t));
}
var SCHEMATICS = [
	{
		id: "fig-001",
		src: "/schematics/fig-001.webp",
		fig: "1",
		title: "Fig 1 · ATA 00",
		ata: ["00"]
	},
	{
		id: "fig-002",
		src: "/schematics/fig-002.webp",
		fig: "2",
		title: "Fig 2 · ATA 00",
		ata: ["00"]
	},
	{
		id: "fig-003",
		src: "/schematics/fig-003.webp",
		fig: "3",
		title: "Fig 3 · ATA 00",
		ata: ["00"]
	},
	{
		id: "fig-004",
		src: "/schematics/fig-004.webp",
		fig: "4",
		title: "Fig 4 · ATA 00",
		ata: ["00"]
	},
	{
		id: "fig-005",
		src: "/schematics/fig-005.webp",
		fig: "5",
		title: "Fig 5 · ATA 00",
		ata: ["00"]
	},
	{
		id: "fig-006",
		src: "/schematics/fig-006.webp",
		fig: "6",
		title: "Fig 6 · ATA 00",
		ata: ["00"]
	},
	{
		id: "fig-007",
		src: "/schematics/fig-007.webp",
		fig: "7",
		title: "Fig 7 · ATA 00",
		ata: ["00"]
	},
	{
		id: "fig-008",
		src: "/schematics/fig-008.webp",
		fig: "8",
		title: "Fig 8 · ATA 00",
		ata: ["00"]
	},
	{
		id: "fig-009",
		src: "/schematics/fig-009.webp",
		fig: "9",
		title: "Fig 9 · ATA 00",
		ata: ["00"]
	},
	{
		id: "fig-010",
		src: "/schematics/fig-010.webp",
		fig: "10",
		title: "Fig 10 · ATA 00",
		ata: ["00"]
	},
	{
		id: "fig-011",
		src: "/schematics/fig-011.webp",
		fig: "11",
		title: "Fig 11 · ATA 00",
		ata: ["00"]
	},
	{
		id: "fig-012",
		src: "/schematics/fig-012.webp",
		fig: "12",
		title: "Fig 12 · ATA 00",
		ata: ["00"]
	},
	{
		id: "fig-013",
		src: "/schematics/fig-013.webp",
		fig: "13",
		title: "Fig 13 · ATA 00",
		ata: ["00"]
	},
	{
		id: "fig-014",
		src: "/schematics/fig-014.webp",
		fig: "14",
		title: "Fig 14 · ATA 00",
		ata: ["00"]
	},
	{
		id: "fig-015",
		src: "/schematics/fig-015.webp",
		fig: "15",
		title: "Fig 15 · ATA 00",
		ata: ["00"]
	},
	{
		id: "fig-016",
		src: "/schematics/fig-016.webp",
		fig: "16",
		title: "Fig 16 · ATA 21",
		ata: ["21"]
	},
	{
		id: "fig-017",
		src: "/schematics/fig-017.webp",
		fig: "17",
		title: "Fig 17 · ATA 21",
		ata: ["21"]
	},
	{
		id: "fig-018",
		src: "/schematics/fig-018.webp",
		fig: "18",
		title: "Fig 18 · ATA 21",
		ata: ["21"]
	},
	{
		id: "fig-019",
		src: "/schematics/fig-019.webp",
		fig: "19",
		title: "Fig 19 · ATA 21",
		ata: ["21"]
	},
	{
		id: "fig-020",
		src: "/schematics/fig-020.webp",
		fig: "20",
		title: "Fig 20 · ATA 21",
		ata: ["21"]
	},
	{
		id: "fig-021",
		src: "/schematics/fig-021.webp",
		fig: "21",
		title: "Fig 21 · ATA 21",
		ata: ["21"]
	},
	{
		id: "fig-022",
		src: "/schematics/fig-022.webp",
		fig: "22",
		title: "Fig 22 · ATA 21",
		ata: ["21"]
	},
	{
		id: "fig-023",
		src: "/schematics/fig-023.webp",
		fig: "23",
		title: "Fig 23 · ATA 21",
		ata: ["21"]
	},
	{
		id: "fig-024",
		src: "/schematics/fig-024.webp",
		fig: "24",
		title: "Fig 24 · ATA 21",
		ata: ["21"]
	},
	{
		id: "fig-025",
		src: "/schematics/fig-025.webp",
		fig: "25",
		title: "Fig 25 · ATA 21",
		ata: ["21"]
	},
	{
		id: "fig-026",
		src: "/schematics/fig-026.webp",
		fig: "26",
		title: "Fig 26 · ATA 21",
		ata: ["21"]
	},
	{
		id: "fig-027",
		src: "/schematics/fig-027.webp",
		fig: "27",
		title: "Fig 27 · ATA 21",
		ata: ["21"]
	},
	{
		id: "fig-028",
		src: "/schematics/fig-028.webp",
		fig: "28",
		title: "Fig 28 · ATA 21",
		ata: ["21"]
	},
	{
		id: "fig-029",
		src: "/schematics/fig-029.webp",
		fig: "29",
		title: "Fig 29 · ATA 21",
		ata: ["21"]
	},
	{
		id: "fig-030",
		src: "/schematics/fig-030.webp",
		fig: "30",
		title: "Fig 30 · ATA 21",
		ata: ["21"]
	},
	{
		id: "fig-031",
		src: "/schematics/fig-031.webp",
		fig: "31",
		title: "Fig 31 · ATA 21",
		ata: ["21"]
	},
	{
		id: "fig-032",
		src: "/schematics/fig-032.webp",
		fig: "32",
		title: "Fig 32 · ATA 21",
		ata: ["21"]
	},
	{
		id: "fig-033",
		src: "/schematics/fig-033.webp",
		fig: "33",
		title: "Fig 33 · ATA 21",
		ata: ["21"]
	},
	{
		id: "fig-034",
		src: "/schematics/fig-034.webp",
		fig: "34",
		title: "Fig 34 · ATA 21",
		ata: ["21"]
	},
	{
		id: "fig-035",
		src: "/schematics/fig-035.webp",
		fig: "35",
		title: "Fig 35 · ATA 21",
		ata: ["21"]
	},
	{
		id: "fig-036",
		src: "/schematics/fig-036.webp",
		fig: "36",
		title: "Fig 36 · ATA 21",
		ata: ["21"]
	},
	{
		id: "fig-037",
		src: "/schematics/fig-037.webp",
		fig: "37",
		title: "Fig 37 · ATA 21",
		ata: ["21"]
	},
	{
		id: "fig-038",
		src: "/schematics/fig-038.webp",
		fig: "38",
		title: "Fig 38 · ATA 21",
		ata: ["21"]
	},
	{
		id: "fig-039",
		src: "/schematics/fig-039.webp",
		fig: "39",
		title: "Fig 39 · ATA 22",
		ata: ["22"]
	},
	{
		id: "fig-040",
		src: "/schematics/fig-040.webp",
		fig: "40",
		title: "Fig 40 · ATA 22",
		ata: ["22"]
	},
	{
		id: "fig-041",
		src: "/schematics/fig-041.webp",
		fig: "41",
		title: "Fig 41 · ATA 22",
		ata: ["22"]
	},
	{
		id: "fig-042",
		src: "/schematics/fig-042.webp",
		fig: "42",
		title: "Fig 42 · ATA 22",
		ata: ["22"]
	},
	{
		id: "fig-043",
		src: "/schematics/fig-043.webp",
		fig: "43",
		title: "Fig 43 · ATA 22",
		ata: ["22"]
	},
	{
		id: "fig-044",
		src: "/schematics/fig-044.webp",
		fig: "44",
		title: "Fig 44 · ATA 22",
		ata: ["22"]
	},
	{
		id: "fig-045",
		src: "/schematics/fig-045.webp",
		fig: "45",
		title: "Fig 45 · ATA 22",
		ata: ["22"]
	},
	{
		id: "fig-046",
		src: "/schematics/fig-046.webp",
		fig: "46",
		title: "Fig 46 · ATA 22",
		ata: ["22"]
	},
	{
		id: "fig-047",
		src: "/schematics/fig-047.webp",
		fig: "47",
		title: "Fig 47 · ATA 22",
		ata: ["22"]
	},
	{
		id: "fig-048",
		src: "/schematics/fig-048.webp",
		fig: "48",
		title: "Fig 48 · ATA 22",
		ata: ["22"]
	},
	{
		id: "fig-049",
		src: "/schematics/fig-049.webp",
		fig: "49",
		title: "Fig 49 · ATA 22",
		ata: ["22"]
	},
	{
		id: "fig-050",
		src: "/schematics/fig-050.webp",
		fig: "50",
		title: "Fig 50 · ATA 22",
		ata: ["22"]
	},
	{
		id: "fig-051",
		src: "/schematics/fig-051.webp",
		fig: "51",
		title: "Fig 51 · ATA 22",
		ata: ["22"]
	},
	{
		id: "fig-052",
		src: "/schematics/fig-052.webp",
		fig: "52",
		title: "Fig 52 · ATA 22",
		ata: ["22"]
	},
	{
		id: "fig-053",
		src: "/schematics/fig-053.webp",
		fig: "53",
		title: "Fig 53 · ATA 22",
		ata: ["22"]
	},
	{
		id: "fig-054",
		src: "/schematics/fig-054.webp",
		fig: "54",
		title: "Fig 54 · ATA 22",
		ata: ["22"]
	},
	{
		id: "fig-055",
		src: "/schematics/fig-055.webp",
		fig: "55",
		title: "Fig 55 · ATA 23",
		ata: ["23"]
	},
	{
		id: "fig-056",
		src: "/schematics/fig-056.webp",
		fig: "56",
		title: "Fig 56 · ATA 23",
		ata: ["23"]
	},
	{
		id: "fig-057",
		src: "/schematics/fig-057.webp",
		fig: "57",
		title: "Fig 57 · ATA 23",
		ata: ["23"]
	},
	{
		id: "fig-058",
		src: "/schematics/fig-058.webp",
		fig: "58",
		title: "Fig 58 · ATA 23",
		ata: ["23"]
	},
	{
		id: "fig-059",
		src: "/schematics/fig-059.webp",
		fig: "59",
		title: "Fig 59 · ATA 23",
		ata: ["23"]
	},
	{
		id: "fig-060",
		src: "/schematics/fig-060.webp",
		fig: "60",
		title: "Fig 60 · ATA 23",
		ata: ["23"]
	},
	{
		id: "fig-061",
		src: "/schematics/fig-061.webp",
		fig: "61",
		title: "Fig 61 · ATA 23",
		ata: ["23"]
	},
	{
		id: "fig-062",
		src: "/schematics/fig-062.webp",
		fig: "62",
		title: "Fig 62 · ATA 23",
		ata: ["23"]
	},
	{
		id: "fig-063",
		src: "/schematics/fig-063.webp",
		fig: "63",
		title: "Fig 63 · ATA 23",
		ata: ["23"]
	},
	{
		id: "fig-064",
		src: "/schematics/fig-064.webp",
		fig: "64",
		title: "Fig 64 · ATA 23",
		ata: ["23"]
	},
	{
		id: "fig-065",
		src: "/schematics/fig-065.webp",
		fig: "65",
		title: "Fig 65 · ATA 23",
		ata: ["23"]
	},
	{
		id: "fig-066",
		src: "/schematics/fig-066.webp",
		fig: "66",
		title: "Fig 66 · ATA 23",
		ata: ["23"]
	},
	{
		id: "fig-067",
		src: "/schematics/fig-067.webp",
		fig: "67",
		title: "Fig 67 · ATA 23",
		ata: ["23"]
	},
	{
		id: "fig-068",
		src: "/schematics/fig-068.webp",
		fig: "68",
		title: "Fig 68 · ATA 23",
		ata: ["23"]
	},
	{
		id: "fig-069",
		src: "/schematics/fig-069.webp",
		fig: "69",
		title: "Fig 69 · ATA 23",
		ata: ["23"]
	},
	{
		id: "fig-070",
		src: "/schematics/fig-070.webp",
		fig: "70",
		title: "Fig 70 · ATA 23",
		ata: ["23"]
	},
	{
		id: "fig-071",
		src: "/schematics/fig-071.webp",
		fig: "71",
		title: "Fig 71 · ATA 23",
		ata: ["23"]
	},
	{
		id: "fig-072",
		src: "/schematics/fig-072.webp",
		fig: "72",
		title: "Fig 72 · ATA 23",
		ata: ["23"]
	},
	{
		id: "fig-073",
		src: "/schematics/fig-073.webp",
		fig: "73",
		title: "Fig 73 · ATA 23",
		ata: ["23"]
	},
	{
		id: "fig-074",
		src: "/schematics/fig-074.webp",
		fig: "74",
		title: "Fig 74 · ATA 23",
		ata: ["23"]
	},
	{
		id: "fig-075",
		src: "/schematics/fig-075.webp",
		fig: "75",
		title: "Fig 75 · ATA 24",
		ata: ["24"]
	},
	{
		id: "fig-076",
		src: "/schematics/fig-076.webp",
		fig: "76",
		title: "Fig 76 · ATA 24",
		ata: ["24"]
	},
	{
		id: "fig-077",
		src: "/schematics/fig-077.webp",
		fig: "77",
		title: "Fig 77 · ATA 24",
		ata: ["24"]
	},
	{
		id: "fig-078",
		src: "/schematics/fig-078.webp",
		fig: "78",
		title: "Fig 78 · ATA 24",
		ata: ["24"]
	},
	{
		id: "fig-079",
		src: "/schematics/fig-079.webp",
		fig: "79",
		title: "Fig 79 · ATA 24",
		ata: ["24"]
	},
	{
		id: "fig-080",
		src: "/schematics/fig-080.webp",
		fig: "80",
		title: "Fig 80 · ATA 24",
		ata: ["24"]
	},
	{
		id: "fig-081",
		src: "/schematics/fig-081.webp",
		fig: "81",
		title: "Fig 81 · ATA 24",
		ata: ["24"]
	},
	{
		id: "fig-082",
		src: "/schematics/fig-082.webp",
		fig: "82",
		title: "Fig 82 · ATA 24",
		ata: ["24"]
	},
	{
		id: "fig-083",
		src: "/schematics/fig-083.webp",
		fig: "83",
		title: "Fig 83 · ATA 24",
		ata: ["24"]
	},
	{
		id: "fig-084",
		src: "/schematics/fig-084.webp",
		fig: "84",
		title: "Fig 84 · ATA 24",
		ata: ["24"]
	},
	{
		id: "fig-085",
		src: "/schematics/fig-085.webp",
		fig: "85",
		title: "Fig 85 · ATA 24",
		ata: ["24"]
	},
	{
		id: "fig-086",
		src: "/schematics/fig-086.webp",
		fig: "86",
		title: "Fig 86 · ATA 24",
		ata: ["24"]
	},
	{
		id: "fig-087",
		src: "/schematics/fig-087.webp",
		fig: "87",
		title: "Fig 87 · ATA 24",
		ata: ["24"]
	},
	{
		id: "fig-088",
		src: "/schematics/fig-088.webp",
		fig: "88",
		title: "Fig 88 · ATA 24",
		ata: ["24"]
	},
	{
		id: "fig-089",
		src: "/schematics/fig-089.webp",
		fig: "89",
		title: "Fig 89 · ATA 24",
		ata: ["24"]
	},
	{
		id: "fig-090",
		src: "/schematics/fig-090.webp",
		fig: "90",
		title: "Fig 90 · ATA 24",
		ata: ["24"]
	},
	{
		id: "fig-091",
		src: "/schematics/fig-091.webp",
		fig: "91",
		title: "Fig 91 · ATA 24",
		ata: ["24"]
	},
	{
		id: "fig-092",
		src: "/schematics/fig-092.webp",
		fig: "92",
		title: "Fig 92 · ATA 24",
		ata: ["24"]
	},
	{
		id: "fig-093",
		src: "/schematics/fig-093.webp",
		fig: "93",
		title: "Fig 93 · ATA 24",
		ata: ["24"]
	},
	{
		id: "fig-094",
		src: "/schematics/fig-094.webp",
		fig: "94",
		title: "Fig 94 · ATA 24",
		ata: ["24"]
	},
	{
		id: "fig-095",
		src: "/schematics/fig-095.webp",
		fig: "95",
		title: "Fig 95 · ATA 26",
		ata: ["26"]
	},
	{
		id: "fig-096",
		src: "/schematics/fig-096.webp",
		fig: "96",
		title: "Fig 96 · ATA 26",
		ata: ["26"]
	},
	{
		id: "fig-097",
		src: "/schematics/fig-097.webp",
		fig: "97",
		title: "Fig 97 · ATA 26",
		ata: ["26"]
	},
	{
		id: "fig-098",
		src: "/schematics/fig-098.webp",
		fig: "98",
		title: "Fig 98 · ATA 26",
		ata: ["26"]
	},
	{
		id: "fig-099",
		src: "/schematics/fig-099.webp",
		fig: "99",
		title: "Fig 99 · ATA 26",
		ata: ["26"]
	},
	{
		id: "fig-100",
		src: "/schematics/fig-100.webp",
		fig: "100",
		title: "Fig 100 · ATA 26",
		ata: ["26"]
	},
	{
		id: "fig-101",
		src: "/schematics/fig-101.webp",
		fig: "101",
		title: "Fig 101 · ATA 26",
		ata: ["26"]
	},
	{
		id: "fig-102",
		src: "/schematics/fig-102.webp",
		fig: "102",
		title: "Fig 102 · ATA 26",
		ata: ["26"]
	},
	{
		id: "fig-103",
		src: "/schematics/fig-103.webp",
		fig: "103",
		title: "Fig 103 · ATA 26",
		ata: ["26"]
	},
	{
		id: "fig-104",
		src: "/schematics/fig-104.webp",
		fig: "104",
		title: "Fig 104 · ATA 26",
		ata: ["26"]
	},
	{
		id: "fig-105",
		src: "/schematics/fig-105.webp",
		fig: "105",
		title: "Fig 105 · ATA 27",
		ata: ["27"]
	},
	{
		id: "fig-106",
		src: "/schematics/fig-106.webp",
		fig: "106",
		title: "Fig 106 · ATA 27",
		ata: ["27"]
	},
	{
		id: "fig-107",
		src: "/schematics/fig-107.webp",
		fig: "107",
		title: "Fig 107 · ATA 27",
		ata: ["27"]
	},
	{
		id: "fig-108",
		src: "/schematics/fig-108.webp",
		fig: "108",
		title: "Fig 108 · ATA 27",
		ata: ["27"]
	},
	{
		id: "fig-109",
		src: "/schematics/fig-109.webp",
		fig: "109",
		title: "Fig 109 · ATA 27",
		ata: ["27"]
	},
	{
		id: "fig-110",
		src: "/schematics/fig-110.webp",
		fig: "110",
		title: "Fig 110 · ATA 27",
		ata: ["27"]
	},
	{
		id: "fig-111",
		src: "/schematics/fig-111.webp",
		fig: "111",
		title: "Fig 111 · ATA 27",
		ata: ["27"]
	},
	{
		id: "fig-112",
		src: "/schematics/fig-112.webp",
		fig: "112",
		title: "Fig 112 · ATA 27",
		ata: ["27"]
	},
	{
		id: "fig-113",
		src: "/schematics/fig-113.webp",
		fig: "113",
		title: "Fig 113 · ATA 27",
		ata: ["27"]
	},
	{
		id: "fig-114",
		src: "/schematics/fig-114.webp",
		fig: "114",
		title: "Fig 114 · ATA 27",
		ata: ["27"]
	},
	{
		id: "fig-115",
		src: "/schematics/fig-115.webp",
		fig: "115",
		title: "Fig 115 · ATA 27",
		ata: ["27"]
	},
	{
		id: "fig-116",
		src: "/schematics/fig-116.webp",
		fig: "116",
		title: "Fig 116 · ATA 27",
		ata: ["27"]
	},
	{
		id: "fig-117",
		src: "/schematics/fig-117.webp",
		fig: "117",
		title: "Fig 117 · ATA 27",
		ata: ["27"]
	},
	{
		id: "fig-118",
		src: "/schematics/fig-118.webp",
		fig: "118",
		title: "Fig 118 · ATA 27",
		ata: ["27"]
	},
	{
		id: "fig-119",
		src: "/schematics/fig-119.webp",
		fig: "119",
		title: "Fig 119 · ATA 27",
		ata: ["27"]
	},
	{
		id: "fig-120",
		src: "/schematics/fig-120.webp",
		fig: "120",
		title: "Fig 120 · ATA 27",
		ata: ["27"]
	},
	{
		id: "fig-121",
		src: "/schematics/fig-121.webp",
		fig: "121",
		title: "Fig 121 · ATA 27",
		ata: ["27"]
	},
	{
		id: "fig-122",
		src: "/schematics/fig-122.webp",
		fig: "122",
		title: "Fig 122 · ATA 27",
		ata: ["27"]
	},
	{
		id: "fig-123",
		src: "/schematics/fig-123.webp",
		fig: "123",
		title: "Fig 123 · ATA 27",
		ata: ["27"]
	},
	{
		id: "fig-124",
		src: "/schematics/fig-124.webp",
		fig: "124",
		title: "Fig 124 · ATA 27",
		ata: ["27"]
	},
	{
		id: "fig-125",
		src: "/schematics/fig-125.webp",
		fig: "125",
		title: "Fig 125 · ATA 28",
		ata: ["28"]
	},
	{
		id: "fig-126",
		src: "/schematics/fig-126.webp",
		fig: "126",
		title: "Fig 126 · ATA 28",
		ata: ["28"]
	},
	{
		id: "fig-127",
		src: "/schematics/fig-127.webp",
		fig: "127",
		title: "Fig 127 · ATA 28",
		ata: ["28"]
	},
	{
		id: "fig-128",
		src: "/schematics/fig-128.webp",
		fig: "128",
		title: "Fig 128 · ATA 28",
		ata: ["28"]
	},
	{
		id: "fig-129",
		src: "/schematics/fig-129.webp",
		fig: "129",
		title: "Fig 129 · ATA 28",
		ata: ["28"]
	},
	{
		id: "fig-130",
		src: "/schematics/fig-130.webp",
		fig: "130",
		title: "Fig 130 · ATA 28",
		ata: ["28"]
	},
	{
		id: "fig-131",
		src: "/schematics/fig-131.webp",
		fig: "131",
		title: "Fig 131 · ATA 28",
		ata: ["28"]
	},
	{
		id: "fig-132",
		src: "/schematics/fig-132.webp",
		fig: "132",
		title: "Fig 132 · ATA 28",
		ata: ["28"]
	},
	{
		id: "fig-133",
		src: "/schematics/fig-133.webp",
		fig: "133",
		title: "Fig 133 · ATA 28",
		ata: ["28"]
	},
	{
		id: "fig-134",
		src: "/schematics/fig-134.webp",
		fig: "134",
		title: "Fig 134 · ATA 28",
		ata: ["28"]
	},
	{
		id: "fig-135",
		src: "/schematics/fig-135.webp",
		fig: "135",
		title: "Fig 135 · ATA 28",
		ata: ["28"]
	},
	{
		id: "fig-136",
		src: "/schematics/fig-136.webp",
		fig: "136",
		title: "Fig 136 · ATA 28",
		ata: ["28"]
	},
	{
		id: "fig-137",
		src: "/schematics/fig-137.webp",
		fig: "137",
		title: "Fig 137 · ATA 29",
		ata: ["29"]
	},
	{
		id: "fig-138",
		src: "/schematics/fig-138.webp",
		fig: "138",
		title: "Fig 138 · ATA 29",
		ata: ["29"]
	},
	{
		id: "fig-139",
		src: "/schematics/fig-139.webp",
		fig: "139",
		title: "Fig 139 · ATA 29",
		ata: ["29"]
	},
	{
		id: "fig-140",
		src: "/schematics/fig-140.webp",
		fig: "140",
		title: "Fig 140 · ATA 29",
		ata: ["29"]
	},
	{
		id: "fig-141",
		src: "/schematics/fig-141.webp",
		fig: "141",
		title: "Fig 141 · ATA 29",
		ata: ["29"]
	},
	{
		id: "fig-142",
		src: "/schematics/fig-142.webp",
		fig: "142",
		title: "Fig 142 · ATA 29",
		ata: ["29"]
	},
	{
		id: "fig-143",
		src: "/schematics/fig-143.webp",
		fig: "143",
		title: "Fig 143 · ATA 29",
		ata: ["29"]
	},
	{
		id: "fig-144",
		src: "/schematics/fig-144.webp",
		fig: "144",
		title: "Fig 144 · ATA 29",
		ata: ["29"]
	},
	{
		id: "fig-145",
		src: "/schematics/fig-145.webp",
		fig: "145",
		title: "Fig 145 · ATA 29",
		ata: ["29"]
	},
	{
		id: "fig-146",
		src: "/schematics/fig-146.webp",
		fig: "146",
		title: "Fig 146 · ATA 29",
		ata: ["29"]
	},
	{
		id: "fig-147",
		src: "/schematics/fig-147.webp",
		fig: "147",
		title: "Fig 147 · ATA 30",
		ata: ["30"]
	},
	{
		id: "fig-148",
		src: "/schematics/fig-148.webp",
		fig: "148",
		title: "Fig 148 · ATA 30",
		ata: ["30"]
	},
	{
		id: "fig-149",
		src: "/schematics/fig-149.webp",
		fig: "149",
		title: "Fig 149 · ATA 30",
		ata: ["30"]
	},
	{
		id: "fig-150",
		src: "/schematics/fig-150.webp",
		fig: "150",
		title: "Fig 150 · ATA 30",
		ata: ["30"]
	},
	{
		id: "fig-151",
		src: "/schematics/fig-151.webp",
		fig: "151",
		title: "Fig 151 · ATA 30",
		ata: ["30"]
	},
	{
		id: "fig-152",
		src: "/schematics/fig-152.webp",
		fig: "152",
		title: "Fig 152 · ATA 30",
		ata: ["30"]
	},
	{
		id: "fig-153",
		src: "/schematics/fig-153.webp",
		fig: "153",
		title: "Fig 153 · ATA 30",
		ata: ["30"]
	},
	{
		id: "fig-154",
		src: "/schematics/fig-154.webp",
		fig: "154",
		title: "Fig 154 · ATA 30",
		ata: ["30"]
	},
	{
		id: "fig-155",
		src: "/schematics/fig-155.webp",
		fig: "155",
		title: "Fig 155 · ATA 31",
		ata: ["31"]
	},
	{
		id: "fig-156",
		src: "/schematics/fig-156.webp",
		fig: "156",
		title: "Fig 156 · ATA 31",
		ata: ["31"]
	},
	{
		id: "fig-157",
		src: "/schematics/fig-157.webp",
		fig: "157",
		title: "Fig 157 · ATA 31",
		ata: ["31"]
	},
	{
		id: "fig-158",
		src: "/schematics/fig-158.webp",
		fig: "158",
		title: "Fig 158 · ATA 31",
		ata: ["31"]
	},
	{
		id: "fig-159",
		src: "/schematics/fig-159.webp",
		fig: "159",
		title: "Fig 159 · ATA 31",
		ata: ["31"]
	},
	{
		id: "fig-160",
		src: "/schematics/fig-160.webp",
		fig: "160",
		title: "Fig 160 · ATA 31",
		ata: ["31"]
	},
	{
		id: "fig-161",
		src: "/schematics/fig-161.webp",
		fig: "161",
		title: "Fig 161 · ATA 31",
		ata: ["31"]
	},
	{
		id: "fig-162",
		src: "/schematics/fig-162.webp",
		fig: "162",
		title: "Fig 162 · ATA 31",
		ata: ["31"]
	},
	{
		id: "fig-163",
		src: "/schematics/fig-163.webp",
		fig: "163",
		title: "Fig 163 · ATA 31",
		ata: ["31"]
	},
	{
		id: "fig-164",
		src: "/schematics/fig-164.webp",
		fig: "164",
		title: "Fig 164 · ATA 31",
		ata: ["31"]
	},
	{
		id: "fig-165",
		src: "/schematics/fig-165.webp",
		fig: "165",
		title: "Fig 165 · ATA 31",
		ata: ["31"]
	},
	{
		id: "fig-166",
		src: "/schematics/fig-166.webp",
		fig: "166",
		title: "Fig 166 · ATA 31",
		ata: ["31"]
	},
	{
		id: "fig-167",
		src: "/schematics/fig-167.webp",
		fig: "167",
		title: "Fig 167 · ATA 32",
		ata: ["32"]
	},
	{
		id: "fig-168",
		src: "/schematics/fig-168.webp",
		fig: "168",
		title: "Fig 168 · ATA 32",
		ata: ["32"]
	},
	{
		id: "fig-169",
		src: "/schematics/fig-169.webp",
		fig: "169",
		title: "Fig 169 · ATA 32",
		ata: ["32"]
	},
	{
		id: "fig-170",
		src: "/schematics/fig-170.webp",
		fig: "170",
		title: "Fig 170 · ATA 32",
		ata: ["32"]
	},
	{
		id: "fig-171",
		src: "/schematics/fig-171.webp",
		fig: "171",
		title: "Fig 171 · ATA 32",
		ata: ["32"]
	},
	{
		id: "fig-172",
		src: "/schematics/fig-172.webp",
		fig: "172",
		title: "Fig 172 · ATA 32",
		ata: ["32"]
	},
	{
		id: "fig-173",
		src: "/schematics/fig-173.webp",
		fig: "173",
		title: "Fig 173 · ATA 32",
		ata: ["32"]
	},
	{
		id: "fig-174",
		src: "/schematics/fig-174.webp",
		fig: "174",
		title: "Fig 174 · ATA 32",
		ata: ["32"]
	},
	{
		id: "fig-175",
		src: "/schematics/fig-175.webp",
		fig: "175",
		title: "Fig 175 · ATA 32",
		ata: ["32"]
	},
	{
		id: "fig-176",
		src: "/schematics/fig-176.webp",
		fig: "176",
		title: "Fig 176 · ATA 32",
		ata: ["32"]
	},
	{
		id: "fig-177",
		src: "/schematics/fig-177.webp",
		fig: "177",
		title: "Fig 177 · ATA 32",
		ata: ["32"]
	},
	{
		id: "fig-178",
		src: "/schematics/fig-178.webp",
		fig: "178",
		title: "Fig 178 · ATA 33",
		ata: ["33"]
	},
	{
		id: "fig-179",
		src: "/schematics/fig-179.webp",
		fig: "179",
		title: "Fig 179 · ATA 33",
		ata: ["33"]
	},
	{
		id: "fig-180",
		src: "/schematics/fig-180.webp",
		fig: "180",
		title: "Fig 180 · ATA 33",
		ata: ["33"]
	},
	{
		id: "fig-181",
		src: "/schematics/fig-181.webp",
		fig: "181",
		title: "Fig 181 · ATA 33",
		ata: ["33"]
	},
	{
		id: "fig-182",
		src: "/schematics/fig-182.webp",
		fig: "182",
		title: "Fig 182 · ATA 33",
		ata: ["33"]
	},
	{
		id: "fig-183",
		src: "/schematics/fig-183.webp",
		fig: "183",
		title: "Fig 183 · ATA 33",
		ata: ["33"]
	},
	{
		id: "fig-184",
		src: "/schematics/fig-184.webp",
		fig: "184",
		title: "Fig 184 · ATA 33",
		ata: ["33"]
	},
	{
		id: "fig-185",
		src: "/schematics/fig-185.webp",
		fig: "185",
		title: "Fig 185 · ATA 33",
		ata: ["33"]
	},
	{
		id: "fig-186",
		src: "/schematics/fig-186.webp",
		fig: "186",
		title: "Fig 186 · ATA 34",
		ata: ["34"]
	},
	{
		id: "fig-187",
		src: "/schematics/fig-187.webp",
		fig: "187",
		title: "Fig 187 · ATA 34",
		ata: ["34"]
	},
	{
		id: "fig-188",
		src: "/schematics/fig-188.webp",
		fig: "188",
		title: "Fig 188 · ATA 34",
		ata: ["34"]
	},
	{
		id: "fig-189",
		src: "/schematics/fig-189.webp",
		fig: "189",
		title: "Fig 189 · ATA 34",
		ata: ["34"]
	},
	{
		id: "fig-190",
		src: "/schematics/fig-190.webp",
		fig: "190",
		title: "Fig 190 · ATA 34",
		ata: ["34"]
	},
	{
		id: "fig-191",
		src: "/schematics/fig-191.webp",
		fig: "191",
		title: "Fig 191 · ATA 34",
		ata: ["34"]
	},
	{
		id: "fig-192",
		src: "/schematics/fig-192.webp",
		fig: "192",
		title: "Fig 192 · ATA 34",
		ata: ["34"]
	},
	{
		id: "fig-193",
		src: "/schematics/fig-193.webp",
		fig: "193",
		title: "Fig 193 · ATA 34",
		ata: ["34"]
	},
	{
		id: "fig-194",
		src: "/schematics/fig-194.webp",
		fig: "194",
		title: "Fig 194 · ATA 34",
		ata: ["34"]
	},
	{
		id: "fig-195",
		src: "/schematics/fig-195.webp",
		fig: "195",
		title: "Fig 195 · ATA 34",
		ata: ["34"]
	},
	{
		id: "fig-196",
		src: "/schematics/fig-196.webp",
		fig: "196",
		title: "Fig 196 · ATA 36",
		ata: ["36"]
	},
	{
		id: "fig-197",
		src: "/schematics/fig-197.webp",
		fig: "197",
		title: "Fig 197 · ATA 36",
		ata: ["36"]
	},
	{
		id: "fig-198",
		src: "/schematics/fig-198.webp",
		fig: "198",
		title: "Fig 198 · ATA 36",
		ata: ["36"]
	},
	{
		id: "fig-199",
		src: "/schematics/fig-199.webp",
		fig: "199",
		title: "Fig 199 · ATA 36",
		ata: ["36"]
	},
	{
		id: "fig-200",
		src: "/schematics/fig-200.webp",
		fig: "200",
		title: "Fig 200 · ATA 36",
		ata: ["36"]
	},
	{
		id: "fig-201",
		src: "/schematics/fig-201.webp",
		fig: "201",
		title: "Fig 201 · ATA 36",
		ata: ["36"]
	},
	{
		id: "fig-202",
		src: "/schematics/fig-202.webp",
		fig: "202",
		title: "Fig 202 · ATA 49",
		ata: ["49"]
	},
	{
		id: "fig-203",
		src: "/schematics/fig-203.webp",
		fig: "203",
		title: "Fig 203 · ATA 49",
		ata: ["49"]
	},
	{
		id: "fig-204",
		src: "/schematics/fig-204.webp",
		fig: "204",
		title: "Fig 204 · ATA 49",
		ata: ["49"]
	},
	{
		id: "fig-205",
		src: "/schematics/fig-205.webp",
		fig: "205",
		title: "Fig 205 · ATA 49",
		ata: ["49"]
	},
	{
		id: "fig-206",
		src: "/schematics/fig-206.webp",
		fig: "206",
		title: "Fig 206 · ATA 49",
		ata: ["49"]
	},
	{
		id: "fig-207",
		src: "/schematics/fig-207.webp",
		fig: "207",
		title: "Fig 207 · ATA 49",
		ata: ["49"]
	},
	{
		id: "fig-208",
		src: "/schematics/fig-208.webp",
		fig: "208",
		title: "Fig 208 · ATA 49",
		ata: ["49"]
	}
];
function schematicsForAta(ata) {
	return SCHEMATICS.filter((s) => s.ata.includes(ata));
}
function hay(...parts) {
	return parts.filter(Boolean).join(" ").toLowerCase();
}
function match(q, text) {
	return q.toLowerCase().split(/\s+/).filter(Boolean).every((t) => text.includes(t));
}
function searchAll(query, limit = 40) {
	const q = query.trim();
	if (q.length < 1) return [];
	const hits = [];
	for (const s of ATA_SYSTEMS) if (match(q, hay(s.chapter, s.title, s.titleDe, s.summary))) hits.push({
		kind: "ata",
		id: s.id,
		title: `ATA ${s.chapter} ${s.title}`,
		subtitle: s.titleDe,
		href: `/ata/${s.id}`
	});
	for (const f of SCHEMATICS) if (match(q, hay(`fig ${f.fig}`, f.title, ...f.ata, "schematic"))) hits.push({
		kind: "ata",
		id: f.id,
		title: `Fig ${f.fig}  ${f.title}`,
		subtitle: `ATA ${f.ata[0]} Schematic`,
		href: `/ata/${f.ata[0]}#${f.id}`
	});
	for (const p of PANELS) if (match(q, hay(p.designation, p.name, p.nameDe, p.location))) hits.push({
		kind: "panel",
		id: p.id,
		title: p.designation,
		subtitle: `${p.nameDe} · ${p.location}`,
		href: `/panels/${p.id}`
	});
	for (const p of BELLY_PANELS) if (match(q, hay(p.designation, p.nameDe, p.zone, p.frames, p.behind))) hits.push({
		kind: "panel",
		id: p.id,
		title: p.designation,
		subtitle: `${p.nameDe} · Zone ${p.zone}`,
		href: `/panels/${p.id}`
	});
	for (const f of KEY_FRAMES) if (match(q, hay(f.fr, f.sta, f.where, f.note, "frame", "station"))) hits.push({
		kind: "panel",
		id: f.id,
		title: f.sta !== "—" ? `${f.fr}  STA ${f.sta}` : f.fr,
		subtitle: f.where,
		href: `/panels#${f.id}`
	});
	for (const s of FUSELAGE_SECTIONS) if (match(q, hay(s.name, s.nameDe, s.amm, s.note, "sektion"))) hits.push({
		kind: "panel",
		id: s.id,
		title: s.nameDe,
		subtitle: s.amm,
		href: "/panels#stations"
	});
	for (const b of STRINGER_BANDS) if (match(q, hay(b.range, b.nameDe, b.note, "stringer", "stgr"))) hits.push({
		kind: "panel",
		id: b.id,
		title: b.range,
		subtitle: b.nameDe,
		href: "/panels#STGR"
	});
	for (const z of ATA_ZONES) if (match(q, hay(z.range, z.nameDe, "zone"))) hits.push({
		kind: "panel",
		id: z.id,
		title: `Zone ${z.range}`,
		subtitle: z.nameDe,
		href: "/panels#stations"
	});
	for (const a of ANTENNAS) if (match(q, hay(a.name, a.designation, a.location, a.ata, a.kind))) hits.push({
		kind: "antenna",
		id: a.id,
		title: a.designation,
		subtitle: `${a.name} · ${a.location}`,
		href: `/antennas#${a.id}`
	});
	for (const c of CBS) if (match(q, hay(c.fin, c.name, c.nameDe, c.panel, c.bus, c.ata))) hits.push({
		kind: "cb",
		id: c.id,
		title: `${c.fin}  ${c.name}`,
		subtitle: `${c.panel} · ${c.bus}`,
		href: `/cbs#${c.id}`
	});
	for (const r of RESETS) if (match(q, hay(r.name, r.when, r.after, r.ata, r.ecam, ...r.aliases ?? []))) hits.push({
		kind: "reset",
		id: r.id,
		title: r.name,
		subtitle: `ATA ${r.ata} · ${r.wait}`,
		href: `/resets/${r.id}`
	});
	return hits.slice(0, limit);
}
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var ICONS = {
	ata: BookOpen,
	panel: PanelsTopLeft,
	antenna: Antenna,
	cb: CircuitBoard,
	reset: RotateCcw
};
var KIND_DE = {
	ata: "ATA",
	panel: "Panel",
	antenna: "Antenne",
	cb: "CB",
	reset: "Reset"
};
function SearchPalette({ open, onClose }) {
	const [q, setQ] = (0, import_react.useState)("");
	const router = useRouter();
	const hits = (0, import_react.useMemo)(() => searchAll(q, 24), [q]);
	(0, import_react.useEffect)(() => {
		if (!open) setQ("");
	}, [open]);
	(0, import_react.useEffect)(() => {
		function onKey(e) {
			if (e.key === "Escape") onClose();
		}
		if (open) window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [open, onClose]);
	if (!open) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-50 flex items-start justify-center bg-bg/70 px-3 pt-[12vh] backdrop-blur-sm",
		onClick: onClose,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-xl overflow-hidden rounded-xl border border-border bg-surface shadow-[0_24px_80px_rgba(0,0,0,0.45)]",
			onClick: (e) => e.stopPropagation(),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2 border-b border-border px-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "size-4 text-muted" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					autoFocus: true,
					value: q,
					onChange: (e) => setQ(e.target.value),
					placeholder: "ATA, Panel, FIN, Antenne, Reset, FR36…",
					className: "h-12 w-full bg-transparent text-sm text-fg outline-none placeholder:text-subtle"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
				className: "max-h-[50vh] overflow-y-auto p-2",
				children: [
					q && hits.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "px-3 py-6 text-center text-sm text-muted",
						children: "Nichts gefunden"
					}),
					!q && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "px-3 py-6 text-center text-sm text-muted",
						children: "z. B. ELAC, 191AT, VHF, FR36, CIDS"
					}),
					hits.map((h) => {
						const Icon = ICONS[h.kind];
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: "flex w-full items-start gap-3 rounded-md px-3 py-2.5 text-left hover:bg-elevated",
							onClick: () => {
								onClose();
								router.history.push(h.href);
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "mt-0.5 size-4 text-accent" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block truncate text-sm",
									children: h.title
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "block truncate text-xs text-muted",
									children: [
										KIND_DE[h.kind],
										" · ",
										h.subtitle
									]
								})]
							})]
						}) }, `${h.kind}-${h.id}`);
					})
				]
			})]
		})
	});
}
function SearchTrigger({ onOpen }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick: onOpen,
		className: cn("flex h-11 w-full max-w-md items-center gap-2 rounded-md border border-border bg-elevated px-3 text-sm text-muted"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "size-4" }),
			"Suche ATA, Panel, CB…",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("kbd", {
				className: "ml-auto rounded-sm border border-border px-1.5 py-0.5 font-mono text-2xs",
				children: "/"
			})
		]
	});
}
var NAV = [
	{
		to: "/",
		label: "Home",
		icon: House
	},
	{
		to: "/ata",
		label: "Systeme",
		icon: BookOpen
	},
	{
		to: "/panels",
		label: "Struktur",
		icon: PanelsTopLeft
	},
	{
		to: "/antennas",
		label: "Antennen",
		icon: Antenna
	},
	{
		to: "/cbs",
		label: "CBs",
		icon: CircuitBoard
	},
	{
		to: "/resets",
		label: "Resets",
		icon: RotateCcw
	}
];
function isActive(pathname, to) {
	if (to === "/") return pathname === "/";
	return pathname === to || pathname.startsWith(`${to}/`);
}
function AppShell({ children }) {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const [searchOpen, setSearchOpen] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		function onKey(e) {
			if (e.key === "/" && !(e.target instanceof HTMLInputElement) && !(e.target instanceof HTMLTextAreaElement)) {
				e.preventDefault();
				setSearchOpen(true);
			}
		}
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-bg text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "sticky top-0 z-40 border-b border-border bg-bg/92 pt-[env(safe-area-inset-top)] backdrop-blur-md",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-6xl items-center gap-3 px-4 py-2.5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/",
							className: "flex min-w-0 items-center gap-2.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "flex size-9 items-center justify-center rounded-sm border border-accent/40 bg-elevated",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
									viewBox: "0 0 32 32",
									className: "size-6 text-accent",
									"aria-hidden": true,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
										fill: "currentColor",
										d: "M16 4 6 14h4l6-6 6 6h4L16 4zm-9 12 9 12 9-12h-4l-5 7-5-7H7z"
									})
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block font-mono text-2xs tracking-[0.18em] text-accent",
									children: "MUC WG1"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block truncate text-sm font-medium leading-tight",
									children: "A320FAM QUICK GUIDE"
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "hidden flex-1 md:block",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchTrigger, { onOpen: () => setSearchOpen(true) })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "ml-auto flex size-11 items-center justify-center rounded-md border border-border md:hidden",
							onClick: () => setSearchOpen(true),
							"aria-label": "Suche",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "size-5" })
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "mx-auto flex max-w-6xl gap-1 overflow-x-auto px-2 pb-2",
					children: NAV.map((n) => {
						const Icon = n.icon;
						const active = isActive(pathname, n.to);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: n.to,
							className: cn("flex h-11 shrink-0 items-center gap-1.5 rounded-md px-3 text-sm", active ? "bg-accent/15 text-accent" : "text-muted hover:text-fg"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4" }), n.label]
						}, n.to);
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "mx-auto max-w-6xl px-4 py-6 pb-24",
				children
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchPalette, {
				open: searchOpen,
				onClose: () => setSearchOpen(false)
			})
		]
	});
}
var styles_default = "/assets/styles-B3Akao_M.css";
var APP_NAME = "MUC WG1 A320FAM QUICK GUIDE";
var Route$9 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: APP_NAME },
			{
				name: "theme-color",
				content: "#090c10"
			},
			{
				name: "description",
				content: "A320 Family Line Quick Guide — ATA, Belly, Frames, Antennen, CBs, Resets. Training only."
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:wght@400;500;600&display=swap"
			}
		]
	}),
	component: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "de",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
		] })]
	})
});
var $$splitComponentImporter$8 = () => import("./routes-D9dItvzR.mjs");
var Route$8 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$8, "component") });
var $$splitComponentImporter$7 = () => import("./antennas-VLohLOYS.mjs");
var Route$7 = createFileRoute("/antennas")({ component: lazyRouteComponent($$splitComponentImporter$7, "component") });
var $$splitComponentImporter$6 = () => import("./ata-D111Sa2q.mjs");
var Route$6 = createFileRoute("/ata")({ component: lazyRouteComponent($$splitComponentImporter$6, "component") });
var $$splitComponentImporter$5 = () => import("./cbs-C6vIKt_o.mjs");
var Route$5 = createFileRoute("/cbs")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
var $$splitComponentImporter$4 = () => import("./panels-Cfk0qwJ9.mjs");
var Route$4 = createFileRoute("/panels")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var $$splitComponentImporter$3 = () => import("./resets-CT5pf2Tw.mjs");
var Route$3 = createFileRoute("/resets")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var $$splitComponentImporter$2 = () => import("./ata_._id-BrZUTFnQ.mjs");
var Route$2 = createFileRoute("/ata_/$id")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("./panels_._id-DGHgPT8F.mjs");
var Route$1 = createFileRoute("/panels_/$id")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./resets_._id-DEEm71a5.mjs");
var Route = createFileRoute("/resets_/$id")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var rootRouteChildren = {
	IndexRoute: Route$8.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$9
	}),
	AntennasRoute: Route$7.update({
		id: "/antennas",
		path: "/antennas",
		getParentRoute: () => Route$9
	}),
	AtaRoute: Route$6.update({
		id: "/ata",
		path: "/ata",
		getParentRoute: () => Route$9
	}),
	CbsRoute: Route$5.update({
		id: "/cbs",
		path: "/cbs",
		getParentRoute: () => Route$9
	}),
	PanelsRoute: Route$4.update({
		id: "/panels",
		path: "/panels",
		getParentRoute: () => Route$9
	}),
	ResetsRoute: Route$3.update({
		id: "/resets",
		path: "/resets",
		getParentRoute: () => Route$9
	}),
	AtaIdRoute: Route$2.update({
		id: "/ata_/$id",
		path: "/ata/$id",
		getParentRoute: () => Route$9
	}),
	PanelsIdRoute: Route$1.update({
		id: "/panels_/$id",
		path: "/panels/$id",
		getParentRoute: () => Route$9
	}),
	ResetsIdRoute: Route.update({
		id: "/resets_/$id",
		path: "/resets/$id",
		getParentRoute: () => Route$9
	})
};
var routeTree = Route$9._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		defaultErrorComponent: AppErrorComponent
	});
}
//#endregion
export { getPanel as A, BELLY_PANELS as C, OVERHEAD_LAYOUT as D, getBellyPanel as E, getAta as M, PANELS as O, STRINGER_BANDS as S, bellyZones as T, FUSELAGE_SECTIONS as _, cn as a, SKIN_SECTIONS as b, getReset as c, ANTENNAS as d, ANTENNA_KINDS as f, FINDING_EXAMPLE as g, FAMILY_NOTE as h, Route$2 as i, ATA_SYSTEMS as j, ZONE_META as k, CBS as l, ATA_ZONES as m, Route as n, schematicsForAta as o, ANTENNA_SHEETS as p, Route$1 as r, RESETS as s, router_exports as t, getCb as u, KEY_FRAMES as v, FAIRING_SHEETS as w, STATION_FIGS as x, LOCATION_RULES as y };
