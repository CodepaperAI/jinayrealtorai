import type { DepositStep } from "@/lib/types";

export default function DepositTimeline({ steps }: { steps: DepositStep[] }) {
  if (!steps?.length) return null;
  return (
    <section className="mx-auto max-w-6xl px-6 mt-14">
      <h2 className="font-display text-3xl font-bold tracking-tight mb-6">Deposit structure</h2>
      <ol className="relative border-l-2 border-(--color-accent)/30 ml-4 space-y-6">
        {steps.map((s, i) => (
          <li key={i} className="ml-6">
            <span className="absolute -left-[11px] flex items-center justify-center size-5 rounded-full bg-(--color-accent) text-white text-xs font-bold">
              {i + 1}
            </span>
            <div className="bg-(--color-card) border border-(--color-border) rounded-md p-4">
              <div className="flex items-baseline justify-between gap-4">
                <div className="font-display font-semibold">{s.label}</div>
                <div className="text-(--color-accent) font-semibold">{s.value}</div>
              </div>
              {s.due_at && (
                <div className="text-xs text-(--color-muted) mt-1">Due: {s.due_at}</div>
              )}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
