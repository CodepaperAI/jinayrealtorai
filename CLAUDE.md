# Claude Code context — Jinay Site

Public-facing catalog of pre-construction projects represented by Jinay Shah. Built with **Next.js 15** App Router + **Tailwind v4** (CSS-first). All project data comes from `data/projects.json`, which is written and pushed by the sibling repo `jinay-agent`.

This site is **read-only at the data layer** — it never queries the agent's SQLite DB; it consumes a static JSON snapshot. Cache invalidation happens via on-demand revalidation (`/api/revalidate`), not redeploy.

## Where this fits

```
[Inbound aggregator email]
        ↓
   jinay-agent (Python, runs on Mac via launchd)
        ↓  research → image-hunt → vision-QA → blob upload
        ↓
   data/projects.json  ──(git push)──▶  this repo  ──(Vercel auto-deploy)──▶  https://<domain>/projects/<slug>
                                              ↑
                                  /api/revalidate ← agent POSTs after each publish
```

Sibling agent repo: `~/Code/jinay-agent` (private). See its CLAUDE.md for the full pipeline.

## Routes

- `/` — homepage with active-sales project grid (`app/page.tsx`)
- `/projects/[slug]` — project detail page (`app/projects/[slug]/page.tsx`)
- `/contact` — lead-capture form (POSTs to `/api/lead`)
- `/api/lead` — server route, validates payload, forwards to GHL Locations API as a contact + tags
- `/api/revalidate` — server route, calls `revalidatePath('/projects/[slug]')` when the agent POSTs with the correct `REVALIDATE_SECRET`

## Components (`components/*.tsx`)

Project detail page composes these blocks in order:
- `HeroBanner` — full-bleed cover + VIP chip + CTA bar
- `QuickStatsStrip` — price / suites / completion / unit count
- `UrgencyChips` — incentive deadlines, phase signals
- `IncentivesBanner` — flagship offer line
- `Gallery` — 3-col grid + `<dialog>` lightbox (keyboard nav)
- `SellingPointsGrid`, `SuiteMixTable`, `DepositTimeline`, `LocationBlock`, `AmenitiesGrid`, `DeveloperCard`

`PlaceholderCover.tsx` is used when `cover_image_url` is missing (image-hunter returned zero survivors).

Homepage cards: `ProjectCard.tsx`.

## Data shape (`lib/types.ts`)

`Project` mirrors the agent's `PagePlan` plus DB fields (`project_slug`, `cover_image_url`, etc). All optional fields must render gracefully when missing — the agent does not guarantee any non-required field.

`data/projects.json` envelope: `{ version: 1, generated_at: ISO8601, projects: Project[] }`.

## Local dev

```bash
npm install
cp .env.example .env.local   # fill in values
npm run dev                  # localhost:3000 (or PORT=3001 npm run dev if 3000 taken)
npm run typecheck            # tsc --noEmit
```

## Deploy notes

- **Vercel plan**: Hobby fair-use bars real-estate lead-gen — use **Pro ($20/mo)**.
- **Domain (.ca)**: Cloudflare doesn't sell `.ca`. Use Namecheap or easyDNS, delegate NS to `ns1.vercel-dns.com` / `ns2.vercel-dns.com`.
- **Env vars on Vercel** (Production + Preview):
  - `NEXT_PUBLIC_SITE_URL` (e.g. `https://jinay.ca`)
  - `NEXT_PUBLIC_AGENT_NAME`, `NEXT_PUBLIC_AGENT_EMAIL`, `NEXT_PUBLIC_AGENT_WHATSAPP`
  - `REVALIDATE_SECRET` (must match the value in `~/Code/jinay-agent/.env`)
  - `GHL_LOCATION_API_KEY`, `GHL_LOCATION_ID`, `GHL_LEAD_TAG_PREFIX`
- **Vercel Blob** is optional. When the agent has `BLOB_READ_WRITE_TOKEN`, images get uploaded there; otherwise they hot-link to source CDNs. `next.config.ts` uses permissive `remotePatterns` so hot-linking just works.

## Secrets (paths only — no values in this file or repo)

| Credential | Location | Used by |
|---|---|---|
| `REVALIDATE_SECRET` | Vercel env (Production+Preview) **and** `~/Code/jinay-agent/.env` | `/api/revalidate` route + agent's `revalidate.ping()` |
| `GHL_LOCATION_API_KEY` | Vercel env only | `/api/lead` route |
| `GHL_LOCATION_ID` | Vercel env (also in agent .env) | `/api/lead` |
| `BLOB_READ_WRITE_TOKEN` | agent `.env` only (the site does not need it; URLs are baked into JSON) | `gallery_builder._upload_to_blob` |

`.gitignore` excludes `.env`, `.env.*` (except `.env.example`), and `.claude/settings.local.json`. Never paste a real token into source / commit message / log / CLAUDE.md.

## Operator handoff (remote agent / WhatsApp-driven)

A future agent operating this site over WhatsApp should default to **read-only operations** and only invoke deploys when explicitly asked.

**Safe-to-answer queries:**
- "What projects are live?" → `git ls-files data/` + parse `data/projects.json` (or `curl https://<domain>/api/projects` if you add such a route)
- "When was X last updated?" → `git log --oneline data/projects.json | head -5` or check the JSON's `generated_at`
- "Did the latest pipeline push succeed?" → `git log --oneline -1`
- "Is the live site responding?" → `curl -s -o /dev/null -w "%{http_code}\n" https://<domain>`

**Safe-to-act:**
- Re-trigger Vercel deployment: `vercel --prod` (requires user logged into Vercel CLI on the same machine) — but usually unnecessary because the agent's git push auto-deploys.
- Manually force a page refresh: `curl -X POST "https://<domain>/api/revalidate?path=/projects/<slug>&secret=$REVALIDATE_SECRET"` (must read secret from agent's `.env`; do NOT log the response if it echoes the secret).

**MUST NOT:**
- Edit `data/projects.json` by hand — it is the agent's output; manual edits get clobbered on the next publish.
- Force-push to `main`.
- Commit `.env` or any secret from Vercel.
- Disable the `REVALIDATE_SECRET` check on `/api/revalidate`.

## Project conventions

- **No client-side fetches for project data.** Pages are statically rendered with ISR (revalidate by tag). Data is read at build time from `data/projects.json`.
- **Images**: Vercel Blob URLs if available, otherwise source CDNs. `next.config.ts` allows arbitrary HTTPS hosts; do not narrow this without checking which developer CDNs are currently in use.
- **Tailwind v4 (CSS-first)**: theme tokens are in `app/globals.css` via `@theme`. No `tailwind.config.js`.
- **Server routes are NOT public APIs.** `/api/lead` requires a CSRF-ish nonce and the WhatsApp/contact form is the only intended caller. `/api/revalidate` requires the shared secret.
