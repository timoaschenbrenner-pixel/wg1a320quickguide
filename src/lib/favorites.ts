import { create } from "zustand";
import { persist } from "zustand/middleware";

export type FavItem = {
  kind: string;
  id: string;
  title: string;
  href: string;
};

type FavState = {
  items: FavItem[];
  toggle: (item: FavItem) => void;
  has: (kind: string, id: string) => boolean;
};

export const useFavorites = create<FavState>()(
  persist(
    (set, get) => ({
      items: [],
      toggle: (item) =>
        set((s) => {
          const exists = s.items.some((x) => x.kind === item.kind && x.id === item.id);
          return {
            items: exists
              ? s.items.filter((x) => !(x.kind === item.kind && x.id === item.id))
              : [item, ...s.items],
          };
        }),
      has: (kind, id) => get().items.some((x) => x.kind === kind && x.id === id),
    }),
    { name: "muc-wg1-favs" },
  ),
);
