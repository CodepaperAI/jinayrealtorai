import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/types";
import { titleCase, formatPrice } from "@/lib/format";

export default function ProjectCard({ project }: { project: Project }) {
  const name = project.project_name ?? project.slug;
  const headline = project.page_copy?.hero_headline || name;

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group block bg-(--color-card) border border-(--color-border) hover:border-(--color-foreground) transition overflow-hidden rounded-md"
    >
      <div className="relative aspect-[4/3] bg-(--color-background)">
        {project.cover_image_url ? (
          <Image
            src={project.cover_image_url}
            alt={name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-(--color-muted) text-sm">
            No cover yet
          </div>
        )}
        {project.status && (
          <div className="absolute top-3 left-3 bg-(--color-card)/95 backdrop-blur px-2 py-1 text-xs font-medium uppercase tracking-wider">
            {titleCase(project.status)}
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
          <span className="text-(--color-muted)">{formatPrice(project.starting_price)}</span>
          <span className="text-(--color-accent) group-hover:translate-x-1 transition">
            View →
          </span>
        </div>
      </div>
    </Link>
  );
}
