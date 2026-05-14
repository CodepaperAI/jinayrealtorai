const AGENT_NAME = process.env.NEXT_PUBLIC_AGENT_NAME || "Jinay Shah";
const AGENT_EMAIL = process.env.NEXT_PUBLIC_AGENT_EMAIL || "";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-(--color-border) bg-(--color-card)">
      <div className="mx-auto max-w-6xl px-6 py-10 text-sm text-(--color-muted)">
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <div className="font-display font-semibold text-(--color-foreground) mb-1">
              {AGENT_NAME}
            </div>
            <div>HomeLife/Miracle Realty Ltd., Brokerage</div>
            <div className="mt-2">Greater Toronto Area</div>
          </div>
          <div className="sm:text-right">
            {AGENT_EMAIL && (
              <div>
                <a className="hover:text-(--color-foreground)" href={`mailto:${AGENT_EMAIL}`}>
                  {AGENT_EMAIL}
                </a>
              </div>
            )}
            <div className="mt-2 text-xs">
              All information believed accurate but not guaranteed. Prices and
              availability subject to change.
            </div>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-(--color-border) text-xs">
          © {new Date().getFullYear()} {AGENT_NAME}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
