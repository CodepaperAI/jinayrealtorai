import type { Incentive } from "@/lib/types";

export default function IncentivesBanner({ incentives }: { incentives: Incentive[] }) {
  if (!incentives?.length) return null;
  return (
    <section className="mx-auto max-w-6xl px-6 mt-8">
      <div className="bg-(--color-accent)/10 border border-(--color-accent)/30 rounded-md p-5">
        <div className="text-xs uppercase tracking-widest text-(--color-accent) font-semibold mb-3">
          Incentives
        </div>
        <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2.5">
          {incentives.map((inc, i) => (
            <li key={i} className="flex items-start gap-2.5 text-(--color-foreground)">
              <span aria-hidden className="text-(--color-accent) mt-0.5">★</span>
              <span>
                <span className="font-medium">{inc.title}</span>
                {inc.value && <span className="text-(--color-muted) ml-1">— {inc.value}</span>}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
