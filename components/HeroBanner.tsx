import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/types";
import { formatPrice } from "@/lib/format";
import PlaceholderCover from "./PlaceholderCover";

export default function HeroBanner({ project }: { project: Project }) {
  const name = project.project_name ?? project.slug;
  const plan = project.page_plan ?? {};
  const hero = plan.hero ?? { headline: name, subhead: "", urgency_chip: null, savings_chip: null };
  const coverUrl = project.cover_image_url || hero.image_url;

  return (
    <section className="relative bg-(--color-foreground) text-white overflow-hidden">
      {coverUrl ? (
        <div className="absolute inset-0">
          <Image
            src={coverUrl}
            alt={name}
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/70" />
        </div>
      ) : (
        <>
          <PlaceholderCover
            slug={project.slug}
            projectName={name}
            developer={project.developer}
            city={project.city}
            variant="hero"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50" />
        </>
      )}

      <div className="relative mx-auto max-w-6xl px-6 pt-12 pb-16 lg:pt-16 lg:pb-24">
        <div className="flex items-center gap-3 mb-6 text-xs uppercase tracking-widest">
          {hero.urgency_chip && (
            <span className="inline-flex items-center gap-1.5 bg-(--color-accent) text-white px-3 py-1.5 font-semibold rounded">
              <span aria-hidden>★</span>
              {hero.urgency_chip}
            </span>
          )}
          {hero.savings_chip && (
            <span className="bg-white/15 backdrop-blur px-3 py-1.5 font-medium rounded">
              {hero.savings_chip}
            </span>
          )}
        </div>

        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight max-w-3xl">
          {hero.headline || name}
        </h1>
        {hero.subhead && (
          <p className="mt-4 text-lg lg:text-xl text-white/85 leading-relaxed max-w-2xl">
            {hero.subhead}
          </p>
        )}

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <div className="text-2xl lg:text-3xl font-display font-semibold">
            From {formatPrice(project.starting_price)}
          </div>
          <Link
            href="#inquire"
            className="inline-flex items-center gap-2 bg-(--color-accent) hover:bg-(--color-accent-dark) text-white font-semibold px-6 py-3 rounded transition shadow-lg"
          >
            Inquire Now <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
