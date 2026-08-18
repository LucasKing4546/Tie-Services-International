# RTG Website

The new site for **Romica Tie Group** — marine deck equipment, designed in the UK
and manufactured in Satu Mare, Romania.

69 pages across 17 templates, built with Astro. Static output, no database.

## Getting started

```bash
npm install
npm run dev          # http://localhost:4321
```

## Commands

| Command | Does |
|---|---|
| `npm run dev` | Dev server with hot reload |
| `npm run build` | Static build to `dist/` |
| `npm run preview` | Serve the built output |
| `npm run check` | Astro + TypeScript diagnostics |
| `npm run pagemap` | Regenerate `src/data/pages.ts` from the Page Map workbook |
| `npm run audit` | SEO + content-protection gates — **must pass before deploy** |

## How content works

`research/RTG_Website_Page_Map.xlsx` is the single source of truth for routing
and SEO. It generates `src/data/pages.ts`, which drives every title tag, meta
description, canonical, Open Graph tag and JSON-LD node in the site.

Page prose lives separately in `src/content/pages/*.mdx`, named after the page id
(`s-02.mdx`). A copywriter can edit those without touching code.

**Never hand-edit `src/data/pages.ts`.** Edit the workbook and run `npm run pagemap`.

## Before you write code

Read [`CLAUDE.md`](./CLAUDE.md). It covers the required workflow, the content
protection rules that fail the build, the design system and the known gaps.

Two rules matter most:

1. **Research the approach before implementing**, using the page map and the
   reference material in `research/`.
2. **Use `/feature-dev`** for anything larger than a copy edit — it runs
   exploration, architecture options, implementation and code review.

## Status

Homepage is complete and is the quality bar for the other 16 templates.
See the template table in `CLAUDE.md` §4.
