import { cn } from "@/lib/utils";

export function Disclaimer({ compact }: { compact?: boolean }) {
  return (
    <p
      className={cn(
        "rounded-md border border-caution/30 bg-caution/8 text-caution",
        compact ? "px-3 py-2 text-xs" : "px-4 py-3 text-sm",
      )}
    >
      Training only. AMM / TSM / CBL des MSN führen — dieser Guide ersetzt sie nicht.
    </p>
  );
}
