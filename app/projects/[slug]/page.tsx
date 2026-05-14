import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getProject, projectSlugs } from "@/lib/projects";
import HeroBanner from "@/components/HeroBanner";
import QuickStatsStrip from "@/components/QuickStatsStrip";
import UrgencyChips from "@/components/UrgencyChips";
import IncentivesBanner from "@/components/IncentivesBanner";
import SellingPointsGrid from "@/components/SellingPointsGrid";
import Gallery from "@/components/Gallery";
import SuiteMixTable from "@/components/SuiteMixTable";
import DepositTimeline from "@/components/DepositTimeline";
import LocationBlock from "@/components/LocationBlock";
import AmenitiesGrid from "@/components/AmenitiesGrid";
import DeveloperCard from "@/components/DeveloperCard";
import FaqAccordion from "@/components/FaqAccordion";
import LeadForm from "@/components/LeadForm";
import { renderSimpleMarkdown } from "@/lib/markdown";

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
  const plan = project.page_plan ?? {};
  const title = plan.meta?.title || `${name} | Pre-Construction`;
  const description =
    plan.meta?.description ||
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

  const plan = project.page_plan ?? {};
  const faq = plan.faq ?? [];
  const projectName = project.project_name ?? project.slug;

  return (
    <>
      <HeroBanner project={project} />
      <QuickStatsStrip stats={plan.quick_stats ?? []} />
      <UrgencyChips signals={plan.urgency_signals ?? []} />
      <IncentivesBanner incentives={plan.incentives ?? []} />

      <section className="mx-auto max-w-6xl px-6 mt-14">
        <div className="grid lg:grid-cols-[1fr_360px] gap-10 lg:gap-14 items-start">
          <div>
            {plan.story_md && (
              <div
                className="prose-jinay text-(--color-subtle) max-w-3xl"
                dangerouslySetInnerHTML={{ __html: renderSimpleMarkdown(plan.story_md) }}
              />
            )}
          </div>

          <aside id="inquire" className="lg:sticky lg:top-8">
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

      <SellingPointsGrid points={plan.selling_points ?? []} />
      <Gallery images={plan.gallery ?? []} projectName={projectName} />
      <SuiteMixTable suites={plan.suites ?? []} />
      <DepositTimeline steps={plan.deposit_timeline ?? []} />
      <LocationBlock location={plan.location} />
      <AmenitiesGrid amenities={plan.amenities ?? []} />
      <DeveloperCard developer={plan.developer} />

      {faq.length > 0 && (
        <section className="mx-auto max-w-6xl px-6 mt-14">
          <h2 className="font-display text-3xl font-bold tracking-tight mb-6">Questions</h2>
          <FaqAccordion items={faq} />
        </section>
      )}

      {project.drive_folder_url && (
        <section className="mx-auto max-w-6xl px-6 mt-14">
          <div className="bg-(--color-card) border border-(--color-border) rounded-md p-5">
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
        </section>
      )}

      <section className="mx-auto max-w-3xl px-6 mt-20 mb-4 text-center">
        <h2 className="font-display text-2xl font-semibold mb-3">
          Ready to learn more about {projectName}?
        </h2>
        <p className="text-(--color-subtle) mb-5">
          Pricing, floor plans, and first-look access — direct from Jinay.
        </p>
        <Link
          href="#inquire"
          className="inline-flex items-center gap-2 bg-(--color-accent) hover:bg-(--color-accent-dark) text-white font-semibold px-6 py-3 rounded transition"
        >
          Inquire Now <span aria-hidden>→</span>
        </Link>
      </section>
    </>
  );
}
