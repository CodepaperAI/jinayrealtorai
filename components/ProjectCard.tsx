import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/types";
import { titleCase, formatPrice } from "@/lib/format";
import PlaceholderCover from "./PlaceholderCover";

export default function ProjectCard({ project }: { project: Project }) {
  const name = project.project_name ?? project.slug;
  const plan = project.page_plan ?? {};
  const headline = plan.hero?.headline || name;
  const urgency = plan.hero?.urgency_chip || (project.status ? titleCase(project.status) : null);
  const savings = plan.hero?.savings_chip;

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group block bg-(--color-card) border border-(--color-border) hover:border-(--color-foreground) transition overflow-hidden rounded-md shadow-sm hover:shadow-lg"
    >
      <div className="relative aspect-[4/3] bg-(--color-background)">
        {project.cover_image_url ? (
          <Image
            src={project.cover_image_url}
            alt={name}
            fill
            className="object-cover group-hover:scale-105 transition duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <PlaceholderCover
            slug={project.slug}
            projectName={name}
            developer={project.developer}
            city={project.city}
            variant="card"
          />
        )}
        {urgency && (
          <div className="absolute top-3 left-3 inline-flex items-center gap-1 bg-(--color-accent) text-white px-2.5 py-1 text-xs font-semibold tracking-wider uppercase rounded">
            <span aria-hidden>★</span>
            {urgency}
          </div>
        )}
        {savings && (
          <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur text-white px-2.5 py-1 text-xs font-medium rounded">
            {savings}
          </div>
        )}
      </div>
      <div className="p-5">
        <div className="text-xs uppercase tracking-wider text-(--color-muted) mb-2">
          {project.developer ? `By ${project.developer}` : "Pre-construction"}
          {project.city ? ` · ${project.city}` : ""}
        </div>
        <h3 className="font-display text-lg font-semibold leading-snug group-hover:text-(--color-accent) transition">
          {headline}
        </h3>
        <div className="mt-3 flex items-center justify-between text-sm">
          <span className="text-(--color-muted)">From {formatPrice(project.starting_price)}</span>
          <span className="text-(--color-accent) group-hover:translate-x-1 transition">
            View →
          </span>
        </div>
      </div>
    </Link>
  );
}
