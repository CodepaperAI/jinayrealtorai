import type { Metadata } from "next";
import { allProjects, uniqueCities, uniqueDevelopers, uniqueStatuses } from "@/lib/projects";
import ProjectFilters from "@/components/ProjectFilters";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Pre-construction condominiums and townhomes available across the Greater Toronto Area.",
};

export default function ProjectsListingPage() {
  const projects = allProjects();
  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <div className="mb-10">
        <div className="text-xs uppercase tracking-wider text-(--color-muted) mb-2">
          Catalog
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight">
          All projects
        </h1>
        <p className="mt-3 text-(--color-subtle) max-w-2xl">
          Filter by city, developer, status, or price range.
        </p>
      </div>
      <ProjectFilters
        projects={projects}
        cities={uniqueCities()}
        developers={uniqueDevelopers()}
        statuses={uniqueStatuses()}
      />
    </div>
  );
}
