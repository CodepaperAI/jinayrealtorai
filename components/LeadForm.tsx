"use client";

import { useState } from "react";

type Props = {
  projectSlug: string;
  projectName?: string;
};

type Status = "idle" | "submitting" | "ok" | "error";

export default function LeadForm({ projectSlug, projectName }: Props) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;
    setStatus("submitting");
    setError(null);

    const fd = new FormData(e.currentTarget);
    const payload = {
      fullName: String(fd.get("fullName") || "").trim(),
      email: String(fd.get("email") || "").trim(),
      phone: String(fd.get("phone") || "").trim() || undefined,
      message: String(fd.get("message") || "").trim() || undefined,
      projectSlug,
      projectName,
    };

    if (!payload.fullName || !payload.email) {
      setStatus("error");
      setError("Name and email are required.");
      return;
    }

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        setStatus("error");
        setError(body?.error || `Submit failed (${res.status})`);
        return;
      }
      setStatus("ok");
      e.currentTarget.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Submit failed");
    }
  }

  if (status === "ok") {
    return (
      <div className="border border-(--color-border) rounded-md bg-(--color-card) p-6">
        <div className="font-semibold mb-1">Thanks — message received.</div>
        <p className="text-sm text-(--color-subtle)">
          {projectName ? `Pricing and floor plans for ${projectName} are on the way.` : "Pricing and floor plans are on the way."}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="border border-(--color-border) rounded-md bg-(--color-card) p-6 space-y-4">
      <h3 className="font-display text-lg font-semibold">
        {projectName ? `Inquire about ${projectName}` : "Get in touch"}
      </h3>
      <p className="text-sm text-(--color-subtle)">
        Pricing, floor plans, and deposit structure — direct from Jinay, no aggregator.
      </p>
      <Field name="fullName" label="Full name" required autoComplete="name" />
      <Field name="email" label="Email" type="email" required autoComplete="email" />
      <Field name="phone" label="Phone (optional)" type="tel" autoComplete="tel" />
      <label className="block">
        <span className="block text-xs font-medium text-(--color-muted) uppercase tracking-wider mb-1.5">
          Anything specific you want to know?
        </span>
        <textarea
          name="message"
          rows={3}
          className="w-full bg-(--color-background) border border-(--color-border) rounded px-3 py-2 text-sm focus:outline-none focus:border-(--color-foreground)"
        />
      </label>
      {error && <div className="text-sm text-(--color-accent)">{error}</div>}
      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full bg-(--color-accent) hover:bg-(--color-accent-dark) disabled:opacity-60 text-white font-medium py-2.5 rounded transition"
      >
        {status === "submitting" ? "Sending..." : "Send inquiry"}
      </button>
    </form>
  );
}

function Field({
  name,
  label,
  type = "text",
  required = false,
  autoComplete,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <label className="block">
      <span className="block text-xs font-medium text-(--color-muted) uppercase tracking-wider mb-1.5">
        {label}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        className="w-full bg-(--color-background) border border-(--color-border) rounded px-3 py-2 text-sm focus:outline-none focus:border-(--color-foreground)"
      />
    </label>
  );
}
