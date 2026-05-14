export default function AmenitiesGrid({ amenities }: { amenities: string[] }) {
  if (!amenities?.length) return null;
  return (
    <section className="mx-auto max-w-6xl px-6 mt-14">
      <h2 className="font-display text-3xl font-bold tracking-tight mb-6">Amenities</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {amenities.map((a, i) => (
          <div
            key={i}
            className="bg-(--color-card) border border-(--color-border) rounded-md px-4 py-3 text-sm text-(--color-subtle) hover:border-(--color-foreground) transition"
          >
            {a}
          </div>
        ))}
      </div>
    </section>
  );
}
