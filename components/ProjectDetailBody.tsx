import type { Project } from "@/lib/types";
import { renderSimpleMarkdown } from "@/lib/markdown";

export default function ProjectDetailBody({ project }: { project: Project }) {
  const desc = project.page_copy?.description_md || "";
  const features = project.page_copy?.key_features ?? [];
  const neighborhood = project.page_copy?.neighborhood_blurb || "";

  return (
    <div className="space-y-10">
      {desc && (
        <section>
          <div
            className="prose-jinay text-(--color-subtle)"
            dangerouslySetInnerHTML={{ __html: renderSimpleMarkdown(desc) }}
          />
        </section>
      )}

      {features.length > 0 && (
        <section>
          <h2 className="font-display text-2xl font-semibold mb-4">Key features</h2>
          <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-3 text-(--color-subtle)">
            {features.map((f, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-2 size-1.5 rounded-full bg-(--color-accent) shrink-0" aria-hidden />
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {neighborhood && (
        <section>
          <h2 className="font-display text-2xl font-semibold mb-3">Location</h2>
          <p className="text-(--color-subtle) leading-relaxed">{neighborhood}</p>
        </section>
      )}
    </div>
  );
}
