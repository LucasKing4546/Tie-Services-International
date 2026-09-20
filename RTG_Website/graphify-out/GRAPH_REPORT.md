# Graph Report - RTG_Website  (2026-09-20)

## Corpus Check
- 171 files · ~3,636,507 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 5 file(s) not represented in the graph (top: .css 3, (none) 1, .xml 1)

## Summary
- 698 nodes · 1159 edges · 96 communities (42 shown, 54 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 11 edges (avg confidence: 0.88)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `a98439a3`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- blocks.ts
- Base.astro
- media.ts
- rtg3d.ts
- build.py
- RTG Website — project guide for Claude Code
- package.json
- home.ts
- RTG design language
- Template inventory
- build-page-map.mjs
- RTG Website — Build
- content.config.ts
- tsconfig.json
- audit-seo.mjs
- motion.ts
- The test suite
- How it runs
- p-03.mdx
- audit-protection.mjs
- screenshot-pages.mjs
- gen-stubs.mjs
- c-00.mdx
- c-01.mdx
- c-02.mdx
- c-03.mdx
- c-04.mdx
- One winch, five duties
- s-02.mdx
- a-01.mdx
- l-00.mdx
- s-06.mdx
- c-06.mdx
- e-02.mdx
- s-01.mdx
- s-04.mdx
- c-07.mdx
- l-02.mdx
- s-03.mdx
- s-05.mdx
- s-07.mdx
- x-01.mdx
- y-03.mdx
- e-00.mdx
- e-03.mdx
- e-04.mdx
- e-05.mdx
- e-06.mdx
- e-07.mdx
- e-08.mdx
- e-10.mdx
- ImageSlot.astro
- src_assets_equipment_e04_reel_winch
- orientationOf
- src_assets_equipment_e07_aframe_dusk
- src_assets_equipment_e08_knuckle_boom
- src_assets_equipment_e08_proof_load_test

## God Nodes (most connected - your core abstractions)
1. `[]` - 33 edges
2. `[]` - 30 edges
3. `[]` - 28 edges
4. `[]` - 26 edges
5. `[]` - 25 edges
6. `[]` - 25 edges
7. `[]` - 24 edges
8. `PageMeta` - 24 edges
9. `[]` - 23 edges
10. `PageEntry` - 20 edges

## Surprising Connections (you probably didn't know these)
- `Routing` --references--> `entryFor()`  [INFERRED]
  CLAUDE.md → src/lib/content.ts
- `3D` --references--> `createViewer()`  [INFERRED]
  CLAUDE.md → src/lib/rtg3d.ts
- `9.2 Steps, per page` --references--> `pagesByTemplate()`  [INFERRED]
  CLAUDE.md → src/data/pages.ts
- `ResolvedPage` --references--> `PageMeta`  [EXTRACTED]
  src/lib/page.ts → src/data/pages.ts
- `tiles` --calls--> `mediaFor()`  [EXTRACTED]
  src/components/blocks/MediaBand.astro → src/data/media.ts

## Import Cycles
- None detected.

## Communities (96 total, 54 thin omitted)

### Community 0 - "blocks.ts"
Cohesion: 0.09
Nodes (53): trail, jsonLdPage, siblings, jobPostings, [], jsonLdPage, [], contactPoints (+45 more)

### Community 1 - "Base.astro"
Cohesion: 0.07
Nodes (29): ref_astro_config, @astrojs/mdx, @astrojs/sitemap, year, ancestorsOf(), OFF_MAP_IDS, OFF_MAP_PAGES, FOOTER_NAV (+21 more)

### Community 2 - "media.ts"
Cohesion: 0.04
Nodes (53): src_assets_contact_x01_team, src_assets_equipment_e00_deck_spread, src_assets_equipment_e00_system_overview, src_assets_equipment_e02_deployment_frame, src_assets_equipment_e02_ds01_guarded, src_assets_equipment_e02_ds01_panel, src_assets_equipment_e02_ds38_hpu_b, src_assets_equipment_e02_ds38_winch (+45 more)

### Community 3 - "rtg3d.ts"
Cohesion: 0.13
Nodes (35): three, CraneRig, destroyHome(), initHome(), finishedWinch(), frame(), makeStage(), onResize() (+27 more)

### Community 4 - "build.py"
Cohesion: 0.08
Nodes (24): collections, datetime, glob, html, json, os, re, build() (+16 more)

### Community 5 - "RTG Website — project guide for Claude Code"
Cohesion: 0.06
Nodes (30): 1. What this is, 2. The workflow — follow this for every feature and every page, 3. Stack and conventions, 3D, 4. The 17 templates, 5. Known gaps — do not paper over these, 6. What must never be published, 7. Design system (+22 more)

### Community 6 - "package.json"
Cohesion: 0.06
Nodes (30): dependencies, astro, @astrojs/mdx, @astrojs/sitemap, three, description, devDependencies, @astrojs/check (+22 more)

### Community 7 - "home.ts"
Cohesion: 0.10
Nodes (13): doubled, EQUIPMENT, HERO_STATS, LIFECYCLE, MACHINES, MARQUEE, SECTORS, Stat (+5 more)

### Community 8 - "RTG design language"
Cohesion: 0.10
Nodes (20): 2.1 Full-bleed hero → rework `PageHero`, 2.2 Numbered sequence with per-step media → the signature device, 2.3 Old-way / RTG-way comparison → `VersusTable`, 2.4 Big bare figures → a `bare` variant of `.stats`, 2.5 End-of-page sibling cards → already built, 2.6 Media-to-text ratio → `FeatureRow`, the one genuinely missing block, Colour, Images (+12 more)

### Community 9 - "Template inventory"
Cohesion: 0.11
Nodes (18): About — 4 pages, Article — 1 page, Careers — 1 page, Case — 4 pages, Contact — 2 pages, Form — 8 pages, Guide — 1 page, Home — 1 page (+10 more)

### Community 10 - "build-page-map.mjs"
Cohesion: 0.14
Nodes (13): body, closeIdx, current, head, OUT, pages, pagesStart, root (+5 more)

### Community 11 - "RTG Website — Build"
Cohesion: 0.15
Nodes (12): Accessibility, Before launch, Blocking — the site should not go live without these, Content depth, Content protection — verified, not just intended, Regenerating, RTG Website — Build, Run it (+4 more)

### Community 12 - "content.config.ts"
Cohesion: 0.17
Nodes (10): ref_astro_content, ref_astro_loaders, card, collections, formField, IDS, imgBrief, link (+2 more)

### Community 13 - "tsconfig.json"
Cohesion: 0.17
Nodes (11): astro/tsconfigs/strict, compilerOptions, baseUrl, paths, exclude, extends, include, @components/* (+3 more)

### Community 14 - "audit-seo.mjs"
Cohesion: 0.17
Nodes (9): descs, dist, fails, ids, root, slugs, src, titles (+1 more)

### Community 15 - "motion.ts"
Cohesion: 0.30
Nodes (10): initCarousels(), initCompare(), initCounters(), initMotion(), initParallax(), apply(), initPinStages(), initReveals() (+2 more)

### Community 16 - "The test suite"
Cohesion: 0.20
Nodes (9): Class witness and the dossier, Dynamic functional load, For contract manufacturing clients, Render test, Speed test, Static brake holding, Static structural proof load, System checks (+1 more)

### Community 17 - "How it runs"
Cohesion: 0.22
Nodes (8): 1. Condition assessment, 2. Rework and reuse, 3. Upgrade while it is apart, 4. Test to the same regime as a new machine, 5. Reissue the documentation, 6. A spares recommendation based on what we found, How it runs, Lead times

### Community 18 - "p-03.mdx"
Cohesion: 0.22
Nodes (8): And a spares recommendation, How it was proved, The assessment came first, The documentation was reissued, The result, The situation, What was reused, What was upgraded

### Community 19 - "audit-protection.mjs"
Cohesion: 0.25
Nodes (7): ref_node_fs, BANNED, ds, exts, hits, root, roots

### Community 20 - "screenshot-pages.mjs"
Cohesion: 0.32
Nodes (7): ref_node_url, ref_playwright, main(), OUT_DIR, readSitemapUrls(), root, slugFor()

### Community 21 - "gen-stubs.mjs"
Cohesion: 0.33
Nodes (5): ref_node_path, outDir, root, SKIP, PAGES

### Community 22 - "c-00.mdx"
Cohesion: 0.33
Nodes (5): Built inside the EU, Built to classification design approval, Four tiers. Cumulative., Start small, Your design stays yours

### Community 23 - "c-01.mdx"
Cohesion: 0.40
Nodes (4): How it is proven, What we do, What you no longer do, Where this sits

### Community 24 - "c-02.mdx"
Cohesion: 0.40
Nodes (4): How it is proven, What we do, What you no longer do, Where this sits

### Community 25 - "c-03.mdx"
Cohesion: 0.40
Nodes (4): How it is proven, What we do, What you no longer do, Where this sits

### Community 26 - "c-04.mdx"
Cohesion: 0.40
Nodes (4): How it is proven, What we do, What you no longer do, Where this sits

### Community 27 - "One winch, five duties"
Cohesion: 0.40
Nodes (4): Electric or hydraulic, One winch, five duties, The figure that actually matters, The five families

### Community 28 - "s-02.mdx"
Cohesion: 0.40
Nodes (4): A captive tool is a hostile geometry, Three thousand metres, What we build for it, Why your winch gets weaker and faster as it spools in

### Community 29 - "a-01.mdx"
Cohesion: 0.50
Nodes (3): The model, and why it was built that way, What we believe, Where we are

### Community 30 - "l-00.mdx"
Cohesion: 0.50
Nodes (3): Start with an honest assessment, What we do, Why this matters more than it used to

### Community 31 - "s-06.mdx"
Cohesion: 0.40
Nodes (4): Availability is the specification, Certification at delivery is not certification in service, Handling people is a different design problem, Why we do not supply the slip ring

### Community 34 - "s-01.mdx"
Cohesion: 0.50
Nodes (3): Proven in service, The problem, as it usually gets described to us, What we build for it

### Community 38 - "s-03.mdx"
Cohesion: 0.33
Nodes (5): Cable handling, Lead times, Self-contained skids for vessels of opportunity, Site investigation, The problem, as it usually gets described to us

### Community 39 - "s-05.mdx"
Cohesion: 0.40
Nodes (4): Institutions we work with, Slow-speed control, The range, Why the winch is part of the instrument

### Community 40 - "s-07.mdx"
Cohesion: 0.40
Nodes (4): Class, Security of supply, The problem, as it usually gets described to us, Traceability and documentation

### Community 51 - "e-00.mdx"
Cohesion: 0.50
Nodes (3): Three ways in, What we need to size anything, Why the figures on these pages are representative

### Community 52 - "e-03.mdx"
Cohesion: 0.50
Nodes (3): Applications, Drive comparison, Level wind options

### Community 56 - "e-07.mdx"
Cohesion: 0.33
Nodes (5): Configurations, Deck seating and loading, Motion compensation options, Request the general arrangement, Sea state

### Community 57 - "e-08.mdx"
Cohesion: 0.50
Nodes (3): Applications, Class and proof load, The range

### Community 59 - "e-10.mdx"
Cohesion: 0.40
Nodes (4): Fail-safe braking, How it is built, Squeeze versus line tension, explained, What decides which unit

### Community 90 - "ImageSlot.astro"
Cohesion: 0.22
Nodes (5): src_assets_home_home_fleet_vessel, photo, tiles, mediaFor(), MotionHint

## Knowledge Gaps
- **297 isolated node(s):** `name`, `version`, `private`, `type`, `description` (+292 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 446 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **54 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `[]` connect `blocks.ts` to `Base.astro`, `ImageSlot.astro`, `media.ts`, `orientationOf`?**
  _High betweenness centrality (0.059) - this node is a cross-community bridge._
- **Why does `astro` connect `package.json` to `media.ts`?**
  _High betweenness centrality (0.031) - this node is a cross-community bridge._
- **What connects `name`, `version`, `private` to the rest of the system?**
  _297 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `blocks.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08686868686868687 - nodes in this community are weakly interconnected._
- **Should `Base.astro` be split into smaller, more focused modules?**
  _Cohesion score 0.06659619450317125 - nodes in this community are weakly interconnected._
- **Should `media.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.037037037037037035 - nodes in this community are weakly interconnected._
- **Should `rtg3d.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.1251778093883357 - nodes in this community are weakly interconnected._