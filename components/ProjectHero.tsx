import Image from "next/image";
import type { Project } from "@/lib/types";
import { titleCase, formatPrice } from "@/lib/format";

export default function ProjectHero({ project }: { project: Project }) {
  const name = project.project_name ?? project.slug;
  const headline = project.page_copy?.hero_headline || name;
  const subhead = project.page_copy?.hero_subhead;

  return (
    <section className="border-b border-(--color-border) bg-(--color-card)">
      <div className="mx-auto max-w-6xl px-6 pt-10 pb-14">
        <div className="text-xs uppercase tracking-wider text-(--color-muted) mb-3">
          {project.developer ? `${project.developer}` : "Pre-construction"}
          {project.city ? ` · ${project.city}` : ""}
          {project.status ? ` · ${titleCase(project.status)}` : ""}
        </div>
        <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight tracking-tight max-w-3xl">
          {headline}
        </h1>
        {subhead && (
          <p className="mt-4 text-lg text-(--color-subtle) leading-relaxed max-w-2xl">
            {subhead}
          </p>
        )}

        {project.cover_image_url && (
          <div className="mt-8 relative aspect-[16/9] rounded-md overflow-hidden bg-(--color-background)">
            <Image
              src={project.cover_image_url}
              alt={name}
              fill
              priority
              sizes="(max-width: 1200px) 100vw, 1200px"
              className="object-cover"
            />
          </div>
        )}

        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          <Stat label="Starting from" value={formatPrice(project.starting_price)} />
          <Stat label="Project type" value={project.project_type ? titleCase(project.project_type) : "—"} />
          <Stat
            label="Occupancy"
            value={project.completion_date || "TBD"}
          />
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-xs uppercase tracking-wider text-(--color-muted) mb-1">{label}</div>
      <div className="font-display text-xl font-medium">{value}</div>
    </div>
  );
}
