import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-24 text-center">
      <div className="text-xs uppercase tracking-wider text-(--color-muted) mb-3">
        404
      </div>
      <h1 className="font-display text-3xl font-semibold tracking-tight mb-3">
        Project not found
      </h1>
      <p className="text-(--color-subtle)">
        This page may have moved or been retired.{" "}
        <Link href="/projects" className="text-(--color-accent) hover:underline">
          Browse all projects →
        </Link>
      </p>
    </div>
  );
}
