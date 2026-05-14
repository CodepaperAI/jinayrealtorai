"use client";

import { useMemo, useState } from "react";
import type { Project } from "@/lib/types";
import ProjectCard from "./ProjectCard";

type Props = {
  projects: Project[];
  cities: string[];
  developers: string[];
  statuses: string[];
};

const ANY = "Any";

export default function ProjectFilters({ projects, cities, developers, statuses }: Props) {
  const [city, setCity] = useState(ANY);
  const [developer, setDeveloper] = useState(ANY);
  const [status, setStatus] = useState(ANY);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      if (city !== ANY && p.city !== city) return false;
      if (developer !== ANY && p.developer !== developer) return false;
      if (status !== ANY && p.status !== status) return false;
      if (maxPrice !== null && p.starting_price !== null && p.starting_price > maxPrice) return false;
      return true;
    });
  }, [projects, city, developer, status, maxPrice]);

  const resetAll = () => {
    setCity(ANY);
    setDeveloper(ANY);
    setStatus(ANY);
    setMaxPrice(null);
  };

  return (
    <>
      <div className="mb-8 p-6 bg-(--color-card) border border-(--color-border) rounded-md">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <FilterSelect label="City" value={city} options={[ANY, ...cities]} onChange={setCity} />
          <FilterSelect label="Developer" value={developer} options={[ANY, ...developers]} onChange={setDeveloper} />
          <FilterSelect label="Status" value={status} options={[ANY, ...statuses]} onChange={setStatus} />
          <FilterSelect
            label="Max price"
            value={maxPrice === null ? ANY : `${maxPrice}`}
            options={[ANY, "500000", "750000", "1000000", "1500000", "2000000"]}
            display={(v) => (v === ANY ? ANY : `Up to $${(Number(v) / 1000).toFixed(0)}K`)}
            onChange={(v) => setMaxPrice(v === ANY ? null : Number(v))}
          />
        </div>
        <div className="mt-4 flex items-center justify-between text-sm">
          <div className="text-(--color-muted)">
            {filtered.length} of {projects.length} {projects.length === 1 ? "project" : "projects"}
          </div>
          <button
            type="button"
            onClick={resetAll}
            className="text-(--color-accent) hover:underline"
          >
            Reset filters
          </button>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16 text-(--color-muted)">
          No projects match these filters yet.
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      )}
    </>
  );
}

function FilterSelect({
  label,
  value,
  options,
  onChange,
  display,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
  display?: (v: string) => string;
}) {
  return (
    <label className="block">
      <span className="block text-xs font-medium text-(--color-muted) uppercase tracking-wider mb-1.5">
        {label}
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-(--color-background) border border-(--color-border) rounded px-3 py-2 text-sm focus:outline-none focus:border-(--color-foreground)"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {display ? display(opt) : opt}
          </option>
        ))}
      </select>
    </label>
  );
}
