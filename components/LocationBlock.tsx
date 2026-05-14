import type { LocationBlock as LocationBlockType } from "@/lib/types";

const COLUMNS: Array<{ key: keyof Pick<LocationBlockType, "transit" | "schools" | "retail">; label: string; icon: string }> = [
  { key: "transit", label: "Transit", icon: "🚆" },
  { key: "schools", label: "Schools", icon: "🎓" },
  { key: "retail", label: "Retail & dining", icon: "🛍" },
];

export default function LocationBlock({ location }: { location?: LocationBlockType }) {
  if (!location) return null;
  const hasAny = location.blurb || location.transit?.length || location.schools?.length || location.retail?.length;
  if (!hasAny) return null;

  return (
    <section className="mx-auto max-w-6xl px-6 mt-14">
      <h2 className="font-display text-3xl font-bold tracking-tight mb-6">Location</h2>
      {location.blurb && (
        <p className="text-(--color-subtle) leading-relaxed max-w-3xl mb-8">
          {location.blurb}
        </p>
      )}
      <div className="grid sm:grid-cols-3 gap-5">
        {COLUMNS.map(({ key, label, icon }) => {
          const items = location[key] ?? [];
          if (!items.length) return null;
          return (
            <div key={key} className="bg-(--color-card) border border-(--color-border) rounded-md p-5">
              <div className="text-sm font-semibold mb-3 flex items-center gap-2">
                <span aria-hidden>{icon}</span>
                {label}
              </div>
              <ul className="space-y-2 text-sm text-(--color-subtle)">
                {items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}
