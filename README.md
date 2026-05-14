# jinay-site

Public-facing catalog of pre-construction projects represented by Jinay Shah.

Built with Next.js 15 App Router + Tailwind v4 (CSS-first). Data comes from
`data/projects.json`, written by the `jinay-agent` pipeline (`jinay-agent
export-site` or `jinay-agent publish <slug>`).

## Local dev

```bash
pnpm install
cp .env.example .env.local   # fill in values
pnpm dev                      # localhost:3000
pnpm typecheck                # tsc --noEmit
```

## Data refresh

This site never reads the SQLite DB directly. The pipeline writes
`data/projects.json` and pushes to this repo; Vercel auto-deploys. After
each pipeline publish, the pipeline also POSTs `/api/revalidate` so
in-flight visitors see the new project before the deploy completes.

## Deploy notes

- **Vercel plan**: Hobby is NOT permitted (fair-use bars real-estate
  lead-gen). Use Pro ($20/mo).
- **Domain**: Cloudflare doesn't sell `.ca` — use Namecheap or easyDNS.
  Delegate NS to `ns1.vercel-dns.com` / `ns2.vercel-dns.com`.
- **Env vars to set on Vercel** (Production + Preview):
  - `NEXT_PUBLIC_SITE_URL`
  - `REVALIDATE_SECRET` (must match pipeline)
  - `GHL_LOCATION_API_KEY`, `GHL_LOCATION_ID`, `GHL_LEAD_TAG_PREFIX`
