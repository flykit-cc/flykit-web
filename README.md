# flykit-web

The public landing page for [flykit](https://github.com/flykit-cc/flykit), an
open-source Claude Code plugin marketplace. Deploys to
[flykit.cc](https://flykit.cc).

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
integration.

Required GitHub secrets:

| Secret              | Where to find it                        |
| ------------------- | --------------------------------------- |
| `VERCEL_TOKEN`      | <https://vercel.com/account/tokens>     |
| `VERCEL_ORG_ID`     | `.vercel/project.json` after `vercel link` |
| `VERCEL_PROJECT_ID` | `.vercel/project.json` after `vercel link` |

To force a redeploy after upstream plugin changes, the cross-repo workflow in
`flykit-cc/flykit` should hit Vercel's deploy hook (or trigger this workflow
via `workflow_dispatch`).

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
