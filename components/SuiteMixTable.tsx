import type { Suite } from "@/lib/types";

export default function SuiteMixTable({ suites }: { suites: Suite[] }) {
  if (!suites?.length) return null;
  return (
    <section className="mx-auto max-w-6xl px-6 mt-14">
      <h2 className="font-display text-3xl font-bold tracking-tight mb-6">Suite mix</h2>
      <div className="bg-(--color-card) border border-(--color-border) rounded-md overflow-hidden">
        <table className="w-full text-left hidden sm:table">
          <thead className="bg-(--color-background) border-b border-(--color-border) text-xs uppercase tracking-wider text-(--color-muted)">
            <tr>
              <th className="px-5 py-3">Type</th>
              <th className="px-5 py-3">Size</th>
              <th className="px-5 py-3">Starting from</th>
              <th className="px-5 py-3">Notes</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-(--color-border)">
            {suites.map((s, i) => (
              <tr key={i} className="hover:bg-(--color-background)/50 transition">
                <td className="px-5 py-4 font-display font-semibold">{s.type}</td>
                <td className="px-5 py-4 text-(--color-subtle)">{s.sqft || "—"}</td>
                <td className="px-5 py-4 text-(--color-accent) font-semibold">{s.price_from || "—"}</td>
                <td className="px-5 py-4 text-(--color-muted) text-sm">{s.notes || ""}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <ul className="sm:hidden divide-y divide-(--color-border)">
          {suites.map((s, i) => (
            <li key={i} className="p-4">
              <div className="font-display font-semibold">{s.type}</div>
              <div className="mt-1 text-sm text-(--color-subtle)">
                {[s.sqft, s.price_from].filter(Boolean).join(" · ") || "—"}
              </div>
              {s.notes && <div className="mt-1 text-xs text-(--color-muted)">{s.notes}</div>}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
