# flykit-web

The public landing page for [flykit](https://github.com/flykit-cc/flykit), an
open-source Claude Code plugin marketplace. Deploys to
[flykit.cc](https://flykit.cc).

## Thinking of contributing?

**Plugin data comes from the [flykit](https://github.com/flykit-cc/flykit)
repo, not this one.** If you want to add or edit a plugin — its tagline,
features, skills, or tags — that's a PR against `flykit-cc/flykit`. This site
re-fetches plugin data on every build and via 1-hour ISR, so changes there
show up here automatically.

What belongs in *this* repo:

- Design, copy, or layout tweaks on the site itself
- New pages (e.g. `/blog`, `/showcase`)
- Bug fixes, accessibility improvements, perf tuning
- SEO metadata, OG image updates

PRs welcome for any of the above.

## Stack

- Next.js 15 (App Router)
- React 19
- TypeScript 5
- Tailwind CSS 3 + shadcn/ui
- Geist Mono (chrome) + Inter (prose)
- Deployed to Vercel via GitHub Actions

## Develop

```bash
pnpm install
pnpm dev
```

The site builds against a local `lib/plugins-fallback.json` so it works even
when the upstream `flykit-cc/flykit` repo isn't reachable. At runtime it tries
to fetch
`https://raw.githubusercontent.com/flykit-cc/flykit/main/.claude-plugin/marketplace.json`
with ISR (1-hour revalidation) and falls back to the local file on failure.

## Build

```bash
pnpm build
pnpm start
```

## Deploy

Pushes to `main` trigger `.github/workflows/deploy.yml`, which uses the Vercel
CLI to build and deploy in production. We do **not** use the Vercel GitHub
integration (free-tier Hobby plan can't link to org repos).

Required repository secrets:

| Secret              | Where to find it                           |
| ------------------- | ------------------------------------------ |
| `VERCEL_TOKEN`      | <https://vercel.com/account/tokens>        |
| `VERCEL_ORG_ID`     | `.vercel/project.json` after `vercel link` |
| `VERCEL_PROJECT_ID` | `.vercel/project.json` after `vercel link` |

When `flykit-cc/flykit` pushes plugin changes, its `notify-web.yml` workflow
dispatches this repo's `deploy.yml` via the GitHub API (using a PAT stored in
the upstream repo as `FLYKIT_WEB_DEPLOY_PAT`). Without that PAT set, ISR still
refreshes plugin data within 1 hour on its own.

## Project layout

```
app/
  layout.tsx           Root layout (fonts, header, footer)
  globals.css          Tailwind + design tokens + grid-paper utility
  page.tsx             Home (hero, plugins, how-it-works, OSS, FAQ)
  docs/page.tsx        Getting-started doc
  plugins/[slug]/      Plugin detail pages
components/
  ui/                  shadcn primitives (Button, Card, Badge, ...)
  site-header.tsx      Sticky nav
  site-footer.tsx      4-column footer
  announcement-bar.tsx Top black announcement bar
  code-block.tsx       Copy-to-clipboard code block
  rotating-word.tsx    Hero rotating word + blinking cursor
lib/
  plugins.ts           Marketplace fetcher (GitHub raw + fallback)
  plugins-fallback.json
  utils.ts             cn() helper
.github/workflows/
  deploy.yml           Vercel deploy on push to main
```

## License

MIT — see [LICENSE](./LICENSE).
