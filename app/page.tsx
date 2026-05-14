import Link from "next/link";
import { featuredProjects } from "@/lib/projects";
import ProjectCard from "@/components/ProjectCard";

const AGENT_NAME = process.env.NEXT_PUBLIC_AGENT_NAME || "Jinay Shah";

export default function HomePage() {
  const featured = featuredProjects(3);

  return (
    <>
      <section className="border-b border-(--color-border) bg-(--color-card)">
        <div className="mx-auto max-w-6xl px-6 pt-20 pb-24">
          <div className="text-xs uppercase tracking-wider text-(--color-muted) mb-4">
            Pre-construction · Greater Toronto Area
          </div>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.05] tracking-tight max-w-3xl">
            Direct access to the GTA&apos;s pre-construction launches.
          </h1>
          <p className="mt-6 text-lg text-(--color-subtle) leading-relaxed max-w-2xl">
            Curated condominium and townhome opportunities — pricing, deposit terms,
            floor plans, and first-look access without the aggregator middleware.
            Built and represented by {AGENT_NAME}.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/projects"
              className="bg-(--color-foreground) text-white px-5 py-2.5 rounded font-medium hover:bg-(--color-accent) transition"
            >
              Browse projects
            </Link>
            <Link
              href="/contact"
              className="border border-(--color-border) px-5 py-2.5 rounded font-medium hover:border-(--color-foreground) transition"
            >
              Get in touch
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="flex items-end justify-between mb-8">
          <h2 className="font-display text-2xl font-semibold">Recent launches</h2>
          <Link
            href="/projects"
            className="text-sm text-(--color-accent) hover:underline"
          >
            View all →
          </Link>
        </div>
        {featured.length === 0 ? (
          <div className="border border-dashed border-(--color-border) rounded-md p-12 text-center text-(--color-muted)">
            New projects publishing soon. Check back shortly.
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
