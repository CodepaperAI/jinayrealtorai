export default function UrgencyChips({ signals }: { signals: string[] }) {
  if (!signals?.length) return null;
  return (
    <div className="mx-auto max-w-6xl px-6 pt-8">
      <div className="flex flex-wrap gap-2">
        {signals.map((s, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-1.5 bg-(--color-card) border border-(--color-border) text-(--color-subtle) text-sm px-3 py-1.5 rounded-full"
          >
            <span className="size-1.5 rounded-full bg-(--color-accent)" aria-hidden />
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}
