import type { SellingPoint } from "@/lib/types";

export default function SellingPointsGrid({ points }: { points: SellingPoint[] }) {
  if (!points?.length) return null;
  return (
    <section className="mx-auto max-w-6xl px-6 mt-14">
      <h2 className="font-display text-3xl font-bold tracking-tight mb-8">
        Why this project?
      </h2>
      <div className="grid sm:grid-cols-2 gap-5">
        {points.map((p, i) => (
          <div
            key={i}
            className="bg-(--color-card) border border-(--color-border) rounded-md p-6 hover:border-(--color-foreground) transition"
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="inline-flex items-center justify-center size-8 rounded-full bg-(--color-accent) text-white font-bold text-sm">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display text-lg font-semibold">{p.title}</h3>
            </div>
            <p className="text-(--color-subtle) leading-relaxed">{p.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
