import Link from "next/link";

const AGENT_NAME = process.env.NEXT_PUBLIC_AGENT_NAME || "Jinay Shah";

export default function Header() {
  return (
    <header className="border-b border-(--color-border) bg-(--color-card)">
      <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
        <Link href="/" className="font-display text-lg font-semibold tracking-tight">
          {AGENT_NAME}
        </Link>
        <nav className="flex items-center gap-7 text-sm">
          <Link
            href="/projects"
            className="text-(--color-subtle) hover:text-(--color-foreground) transition"
          >
            Projects
          </Link>
          <Link
            href="/contact"
            className="text-(--color-subtle) hover:text-(--color-foreground) transition"
          >
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}
