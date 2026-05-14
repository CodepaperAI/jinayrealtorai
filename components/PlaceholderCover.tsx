/**
 * Typographic fallback cover.
 *
 * Used when the gallery pipeline yielded no scrapeable images
 * (developer site is bot-blocked / JS-rendered / non-existent).
 *
 * Renders a deterministic gradient + initials + project name in the
 * display font. Two callers:
 *   - `<ProjectCard>` uses the small variant (fills aspect-[4/3] box)
 *   - `<HeroBanner>` uses the hero variant as a full-bleed background
 *     when `cover_image_url` is null
 *
 * "Deterministic" = same slug always produces the same gradient, so a
 * project's identity stays stable as we re-run the pipeline.
 */

type Variant = "card" | "hero";

type Props = {
  slug: string;
  projectName: string;
  developer?: string | null;
  city?: string | null;
  variant?: Variant;
};

const PALETTE: Array<[string, string]> = [
  ["#1A1A1A", "#C8102E"], // jinay-dark → accent red
  ["#1A6535", "#0F3B22"], // forest green → deep green
  ["#1E3A8A", "#0C1E4D"], // navy
  ["#7C2D12", "#3F1707"], // burnt sienna
  ["#0F4C5C", "#062731"], // teal
  ["#4C1D6F", "#2B0F44"], // plum
];

function hash(slug: string): number {
  let h = 0;
  for (const ch of slug) {
    h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  }
  return h;
}

function pick<T>(arr: T[], slug: string, offset = 0): T {
  return arr[(hash(slug) + offset) % arr.length];
}

function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return "—";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export default function PlaceholderCover({
  slug,
  projectName,
  developer,
  city,
  variant = "card",
}: Props) {
  const [from, to] = pick(PALETTE, slug);
  const inits = initials(projectName);

  if (variant === "hero") {
    return (
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(135deg, ${from} 0%, ${to} 100%)`,
        }}
      >
        <PatternOverlay seed={hash(slug)} />
      </div>
    );
  }

  return (
    <div
      className="absolute inset-0 flex flex-col items-center justify-center text-white p-6"
      style={{ background: `linear-gradient(135deg, ${from} 0%, ${to} 100%)` }}
    >
      <PatternOverlay seed={hash(slug)} />
      <div className="relative font-display text-5xl sm:text-6xl font-bold tracking-tight opacity-95">
        {inits}
      </div>
      <div className="relative mt-3 text-center font-display text-base sm:text-lg font-semibold leading-tight max-w-[80%]">
        {projectName}
      </div>
      {(developer || city) && (
        <div className="relative mt-2 text-xs uppercase tracking-widest text-white/70">
          {[developer, city].filter(Boolean).join(" · ")}
        </div>
      )}
    </div>
  );
}

/**
 * Subtle dot grid so the placeholder doesn't look like a flat solid.
 * Deterministic via slug hash → fixed phase offset.
 */
function PatternOverlay({ seed }: { seed: number }) {
  const offsetX = seed % 17;
  const offsetY = (seed >> 4) % 13;
  return (
    <div
      className="absolute inset-0 opacity-25 pointer-events-none"
      style={{
        backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1.2px)",
        backgroundSize: "18px 18px",
        backgroundPosition: `${offsetX}px ${offsetY}px`,
      }}
      aria-hidden
    />
  );
}
