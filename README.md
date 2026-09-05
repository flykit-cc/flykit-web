<div align="center">

<img src="./public/logo.svg" width="64" height="64" alt="flykit" />

# flykit-web

**The public landing page at [flykit.cc](https://flykit.cc).**

[![MIT License](https://img.shields.io/github/license/flykit-cc/flykit-web?style=flat-square&labelColor=111&color=000)](./LICENSE)
[![Next.js 15](https://img.shields.io/badge/Next.js-15-000?style=flat-square&labelColor=111)](https://nextjs.org)
[![React 19](https://img.shields.io/badge/React-19-000?style=flat-square&labelColor=111)](https://react.dev)
[![Tailwind 3](https://img.shields.io/badge/Tailwind-3-000?style=flat-square&labelColor=111)](https://tailwindcss.com)
[![Vercel](https://img.shields.io/badge/live-flykit.cc-27c93f?style=flat-square&labelColor=111)](https://flykit.cc)

<br/>

<a href="https://flykit.cc">
  <img src="https://flykit.cc/opengraph-image" alt="flykit — a cockpit for agentic development" width="720" />
</a>

</div>

---

The site for [flykit](https://flykit.cc) — a cockpit for agentic development, and the
registry that fills it. This repo is also the hub: it holds the tool catalog and pulls
the rest from each product's own repo.

## Where the data lives

| Data | Where | Why |
|---|---|---|
| Tool catalog, screenshots, announcement | here, in `content/` and `public/screenshots/` | this site is the only reader |
| Claude Code plugin list | [flykit-cc/plugins](https://github.com/flykit-cc/plugins) | Claude Code reads that manifest too |
| A plugin's or tool's readme, stars, latest commits | its own repo, fetched hourly | facts that change when you ship |

The rule: copy you write by hand lives here. Facts that change when you ship live with
the code.

## Thinking of contributing?

- **Adding or editing a tool** — PR here, against `content/tools.json` and `content/tools/<slug>.json`.
- **Adding a Claude Code plugin** — PR against [flykit-cc/plugins](https://github.com/flykit-cc/plugins); see its CONTRIBUTING.
- **Design, copy, pages, accessibility, SEO** — PR here.

## Stack

- **Next.js 15** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS 3** + **shadcn/ui** primitives
- **Geist Mono** (chrome) + **Inter** (prose) — the mono/sans split is the core typographic signal
- Deploys to Vercel via GitHub Actions on every push to `main`

## Develop

```bash
pnpm install
pnpm dev        # http://localhost:3000
```

The tool catalog is local, so it needs no network. The plugin half fetches
`marketplace.json` from `flykit-cc/plugins`, then each plugin's `web.json`, `README.md`
and star count from the repo that manifest names, with 1-hour ISR and
`lib/plugins-fallback.json` as the offline fallback.

## Build

```bash
pnpm build
pnpm start
```

## Project layout

```
app/
  layout.tsx              Root layout (fonts, header, footer)
  globals.css             Design tokens + grid-paper utility
  page.tsx                Home
  docs/                   Getting-started
  plugins/[slug]/         Plugin detail (static, generated from marketplace.json)
  tools/[slug]/           Tool detail (static, generated from tools.json)
  privacy/, terms/        Legal
  opengraph-image.tsx     OG + Twitter card, rendered from _og/image.tsx
  _og/                    the card and its fonts
  icon.tsx, apple-icon.tsx Favicons
  not-found.tsx           404 with ASCII countdown
components/
  ui/                     shadcn primitives
  site-header.tsx         Sticky nav
  site-footer.tsx         4-col footer
  logo.tsx                Wing mark
  rotating-word.tsx       Hero rotating word + blinking cursor
  code-block.tsx
  announcement-bar.tsx
lib/
  plugins.ts              Marketplace fetcher (GitHub raw + fallback + stars)
  plugins-fallback.json
  tools.ts                tools.json fetcher + ecosystem labels
  tools-fallback.json
  utils.ts
public/
  logo.svg                Wing mark, standalone
  logo-{512,1024}.png     Transparent PNGs
  logo-white-512.png      Reversed, for dark backgrounds
```

## License

[MIT](./LICENSE) © [kaiomp](https://github.com/kaiomp)
