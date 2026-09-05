import { n as create, t as persist } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/favorites-Df1L7mxm.js
var useFavorites = create()(persist((set, get) => ({
	items: [],
	toggle: (item) => set((s) => {
		return { items: s.items.some((x) => x.kind === item.kind && x.id === item.id) ? s.items.filter((x) => !(x.kind === item.kind && x.id === item.id)) : [item, ...s.items] };
	}),
	has: (kind, id) => get().items.some((x) => x.kind === kind && x.id === id)
}), { name: "muc-wg1-favs" }));
//#endregion
export { useFavorites as t };
