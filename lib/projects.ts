import snapshot from "@/data/projects.json";
import type { Project, ProjectsSnapshot } from "./types";

const TYPED = snapshot as unknown as ProjectsSnapshot;

export function allProjects(): Project[] {
  return TYPED.projects ?? [];
}

export function getProject(slug: string): Project | undefined {
  return allProjects().find((p) => p.slug === slug);
}

export function projectSlugs(): string[] {
  return allProjects().map((p) => p.slug);
}

export function featuredProjects(limit = 3): Project[] {
  // Most recently updated first — already ordered by the export step.
  return allProjects().slice(0, limit);
}

export function uniqueCities(): string[] {
  const cities = new Set<string>();
  for (const p of allProjects()) {
    if (p.city) cities.add(p.city);
  }
  return [...cities].sort();
}

export function uniqueDevelopers(): string[] {
  const devs = new Set<string>();
  for (const p of allProjects()) {
    if (p.developer) devs.add(p.developer);
  }
  return [...devs].sort();
}

export function uniqueStatuses(): string[] {
  const statuses = new Set<string>();
  for (const p of allProjects()) {
    if (p.status) statuses.add(p.status);
  }
  return [...statuses].sort();
}
