# flykit-web — landing page for flykit.cc

## What this repo is

Public landing page for the flykit Claude Code plugin marketplace. Deploys to **flykit.cc**.

## Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS **3** (v4 avoided — shadcn HSL tokens need v3 idiom)
- shadcn/ui primitives (local files, not installed via CLI — match shadcn API so you can swap later)
- Geist Mono (UI chrome) + Inter (prose). The mono/sans split is the core typographic signal.
- Deploys to Vercel via GitHub Action (`.github/workflows/deploy.yml`), **not** Vercel's GitHub integration (free tier blocks org integration).

## Design system

Copies mcpmarket.com closely. Tokens in `app/globals.css`:
- Near-pure grayscale palette + single `--terminal-green` accent (`#27c93f`)
- Zero shadows, zero gradients (except 2-tone hero H1 using solid color spans)
- 1px borders, 8px max border-radius
- Grid-paper hero background via stacked linear-gradients at 64px
- Two-tone H1 with rotating word + blinking cursor — see `components/rotating-word.tsx`

## Pages

- `/` — hero, available plugins grid, how-it-works, FAQ, footer
- `/plugins/[slug]` — static pages generated from marketplace data (`generateStaticParams`)
- `/docs` — getting started long-form

## Companion repo — where plugin data comes from

Plugin metadata is **not stored here**. It lives in **`github.com/flykit-cc/flykit`** — the marketplace repo. Locally, most contributors keep it as a sibling folder.

Flow:
1. `lib/plugins.ts` fetches `.claude-plugin/marketplace.json` + plugin READMEs from the flykit repo via GitHub raw URLs at build time (ISR: refresh every hour)
2. Falls back to `lib/plugins-fallback.json` if GitHub is unreachable (offline/first builds)
3. When flykit pushes, its GitHub Action pings this project's Vercel deploy hook → rebuild → fresh data

**Do not duplicate plugin metadata here.** If a plugin needs to be added or edited, do it in the flykit repo — this site will pick it up automatically.

## Deploy

On push to `main`, `.github/workflows/deploy.yml` runs Vercel CLI with these secrets:
- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

PRs from contributors also deploy via the same action using the maintainer's Vercel credentials (free-tier workaround).

## Status

- [x] Scaffolded, `pnpm build` succeeds, 6 static pages generated
- [ ] Not yet pushed to GitHub
- [ ] Vercel project not yet created
- [ ] Secrets not yet added
- [ ] DNS not yet pointed at Vercel

Full setup steps are in the flykit repo at `SETUP.md`.

## Conventions

- `.claude/` is gitignored — contributors' personal Claude Code setup doesn't belong in project state.
- The monochrome + mono-font aesthetic is deliberate. Don't introduce brand colors without intent.
- Attribution: handle is `kaiomp`, license is MIT.
