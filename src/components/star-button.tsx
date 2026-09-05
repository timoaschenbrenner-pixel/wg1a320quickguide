import { Star } from "lucide-react";
import { useFavorites, type FavItem } from "@/lib/favorites";
import { cn } from "@/lib/utils";

export function StarButton({ item }: { item: FavItem }) {
  const has = useFavorites((s) => s.has(item.kind, item.id));
  const toggle = useFavorites((s) => s.toggle);
  return (
    <button
      type="button"
      onClick={() => toggle(item)}
      className="flex size-11 items-center justify-center rounded-md border border-border"
      aria-label={has ? "Favorit entfernen" : "Favorit"}
    >
      <Star className={cn("size-5", has ? "fill-accent text-accent" : "text-muted")} />
    </button>
  );
}
