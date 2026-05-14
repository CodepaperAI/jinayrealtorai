import type { Metadata } from "next";
import LeadForm from "@/components/LeadForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch about pre-construction opportunities in the GTA.",
};

const AGENT_NAME = process.env.NEXT_PUBLIC_AGENT_NAME || "Jinay Shah";

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <div className="text-xs uppercase tracking-wider text-(--color-muted) mb-2">
        Get in touch
      </div>
      <h1 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight">
        Talk to {AGENT_NAME}
      </h1>
      <p className="mt-3 text-(--color-subtle) max-w-xl">
        Tell us what you&apos;re looking for — buyer profile, price range,
        timing — and we&apos;ll send a short list of fits within 24 hours.
      </p>
      <div className="mt-10 max-w-md">
        <LeadForm projectSlug="general-inquiry" projectName="GTA Pre-Construction" />
      </div>
    </div>
  );
}
