import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getProject, projectSlugs } from "@/lib/projects";
import ProjectHero from "@/components/ProjectHero";
import ProjectDetailBody from "@/components/ProjectDetailBody";
import FaqAccordion from "@/components/FaqAccordion";
import LeadForm from "@/components/LeadForm";

export const revalidate = 3600;

export async function generateStaticParams() {
  return projectSlugs().map((slug) => ({ slug }));
}

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Project not found" };
  const name = project.project_name ?? slug;
  const title = project.page_copy?.meta_title || `${name} | Pre-Construction`;
  const description =
    project.page_copy?.meta_description ||
    `${name}${project.city ? ` in ${project.city}` : ""}. Pre-construction pricing and floor plans.`;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: project.cover_image_url ? [{ url: project.cover_image_url }] : undefined,
    },
  };
}

export default async function ProjectDetailPage({ params }: Params) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const faq = project.page_copy?.faq ?? [];

  return (
    <>
      <ProjectHero project={project} />

      <section className="mx-auto max-w-6xl px-6 py-12 lg:py-16">
        <div className="grid lg:grid-cols-[1fr_360px] gap-10 lg:gap-16 items-start">
          <div>
            <ProjectDetailBody project={project} />

            {faq.length > 0 && (
              <div className="mt-12">
                <h2 className="font-display text-2xl font-semibold mb-4">Questions</h2>
                <FaqAccordion items={faq} />
              </div>
            )}

            {project.drive_folder_url && (
              <div className="mt-12 p-5 border border-(--color-border) rounded-md bg-(--color-card)">
                <div className="text-xs uppercase tracking-wider text-(--color-muted) mb-1.5">
                  Full brochure
                </div>
                <a
                  href={project.drive_folder_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-(--color-foreground) font-medium hover:text-(--color-accent) transition"
                >
                  Open project files →
                </a>
              </div>
            )}
          </div>

          <aside className="lg:sticky lg:top-8">
            <LeadForm
              projectSlug={project.slug}
              projectName={project.project_name ?? undefined}
            />
            <div className="mt-6 text-center">
              <Link
                href="/projects"
                className="text-sm text-(--color-muted) hover:text-(--color-foreground) transition"
              >
                ← Back to all projects
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
