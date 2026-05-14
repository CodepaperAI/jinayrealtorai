import type { DeveloperProfile } from "@/lib/types";

export default function DeveloperCard({ developer }: { developer?: DeveloperProfile }) {
  if (!developer?.name && !developer?.blurb) return null;
  return (
    <section className="mx-auto max-w-6xl px-6 mt-14">
      <div className="bg-(--color-card) border border-(--color-border) rounded-md p-6">
        <div className="text-xs uppercase tracking-widest text-(--color-muted) mb-2">
          About the builder
        </div>
        {developer.name && (
          <h2 className="font-display text-2xl font-semibold mb-2">{developer.name}</h2>
        )}
        {developer.blurb && (
          <p className="text-(--color-subtle) leading-relaxed">{developer.blurb}</p>
        )}
      </div>
    </section>
  );
}
