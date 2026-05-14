import type { QuickStat } from "@/lib/types";

export default function QuickStatsStrip({ stats }: { stats: QuickStat[] }) {
  if (!stats?.length) return null;
  return (
    <section className="bg-(--color-card) border-b border-(--color-border)">
      <div className="mx-auto max-w-6xl px-6 py-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
        {stats.slice(0, 4).map((s, i) => (
          <div
            key={i}
            className="text-center sm:text-left border-l border-(--color-border) first:border-l-0 sm:pl-6 first:pl-0"
          >
            <div className="text-xs uppercase tracking-widest text-(--color-muted) mb-1">
              {s.label}
            </div>
            <div className="font-display text-xl sm:text-2xl font-semibold text-(--color-foreground)">
              {s.value}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
