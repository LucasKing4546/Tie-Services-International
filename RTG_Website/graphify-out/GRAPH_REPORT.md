# Graph Report - RTG_Website  (2026-10-12)

## Corpus Check
- 174 files · ~3,081,666 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 11 file(s) not represented in the graph (top: .css 9, (none) 1, .xml 1)

## Summary
- 840 nodes · 1289 edges · 125 communities (56 shown, 69 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 10 edges (avg confidence: 0.88)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `8ce35647`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- blocks.ts
- site.js
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
- l-01.mdx
- p-03.mdx
- audit-protection.mjs
- strip-exif.mjs
- gen-stubs.mjs
- c-00.mdx
- c-01.mdx
- c-02.mdx
- c-03.mdx
- c-04.mdx
- s-02.mdx
- a-01.mdx
- s-06.mdx
- c-06.mdx
- s-01.mdx
- s-04.mdx
- c-07.mdx
- l-02.mdx
- s-03.mdx
- s-05.mdx
- s-07.mdx
- x-01.mdx
- y-03.mdx
- e-04.mdx
- e-08.mdx
- e-10.mdx
- l-05.mdx
- z-01.mdx
- z-02.mdx
- z-03.mdx
- z-04.mdx
- ImageSlot.astro
- src_assets_equipment_e04_reel_winch
- page.ts
- src_assets_equipment_e07_aframe_dusk
- src_assets_equipment_e08_knuckle_boom
- src_assets_equipment_e08_proof_load_test
- Base.astro
- Appendix B - Canonical Sources (read these before reinventing)
- 4. DESIGN ENGINEERING DIRECTIVES (Bias Correction)
- Product
- 10. REFERENCE VOCABULARY (Pattern Names the Agent Should Know)
- tasteskill: Anti-Slop Frontend Skill
- seo.ts
- 9. AI TELLS (Forbidden Patterns)
- astro.config.mjs
- 11. REDESIGN PROTOCOL
- 3. DEFAULT ARCHITECTURE & CONVENTIONS
- 6. PERFORMANCE & ACCESSIBILITY GUARDRAILS
- 0. BRIEF INFERENCE (Read the Room Before Anything Else)
- 12. THE BLOCK LIBRARY (Contract - Implementations Land Here Iteratively)
- 5. CONTEXT-AWARE PROACTIVITY
- 8. DARK MODE PROTOCOL
- 7. DIAL DEFINITIONS (Technical Reference)
- depth.ts
- forms.ts
- vercel.json
- src_assets_contact_x01_team
- src_assets_sectors_s02_pipeline_survey
- src_assets_sectors_s02_seabed_tool
- src_assets_sectors_s03_cable_work
- src_assets_sectors_s03_wind_array
- src_assets_sectors_s05_research_deck
- src_assets_sectors_s05_research_vessel
- Site-wide ocean world (homepage first surface)

## God Nodes (most connected - your core abstractions)
1. `[]` - 30 edges
2. `[]` - 28 edges
3. `[]` - 26 edges
4. `[]` - 25 edges
5. `[]` - 24 edges
6. `PageMeta` - 24 edges
7. `[]` - 23 edges
8. `[]` - 22 edges
9. `PageEntry` - 20 edges
10. `mdxComponents` - 18 edges

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

## Communities (125 total, 69 thin omitted)

### Community 0 - "blocks.ts"
Cohesion: 0.08
Nodes (56): trail, jsonLdPage, siblings, jobPostings, [], jsonLdPage, [], contactPoints (+48 more)

### Community 1 - "site.js"
Cohesion: 0.15
Nodes (6): year, FOOTER_NAV, LEGAL_NAV, NAV, PROOF, PROOF_DISPLAY

### Community 2 - "media.ts"
Cohesion: 0.04
Nodes (46): src_assets_equipment_e00_deck_spread, src_assets_equipment_e00_system_overview, src_assets_equipment_e02_deployment_frame, src_assets_equipment_e02_ds01_guarded, src_assets_equipment_e02_ds01_panel, src_assets_equipment_e02_ds38_hpu_b, src_assets_equipment_e02_ds38_winch, src_assets_equipment_e02_hpu (+38 more)

### Community 3 - "rtg3d.ts"
Cohesion: 0.12
Nodes (35): three, MACHINES, destroyHome(), initHome(), finishedWinch(), frame(), makeStage(), onResize() (+27 more)

### Community 4 - "build.py"
Cohesion: 0.08
Nodes (24): collections, datetime, glob, html, json, os, re, build() (+16 more)

### Community 5 - "RTG Website — project guide for Claude Code"
Cohesion: 0.06
Nodes (30): 1. What this is, 2. The workflow — follow this for every feature and every page, 3. Stack and conventions, 3D, 4. The 17 templates, 5. Known gaps — do not paper over these, 6. What must never be published, 7. Design system (+22 more)

### Community 6 - "package.json"
Cohesion: 0.06
Nodes (35): dependencies, astro, @astrojs/mdx, @astrojs/sitemap, @fontsource/jetbrains-mono, @fontsource-variable/archivo, @fontsource-variable/inter, three (+27 more)

### Community 7 - "home.ts"
Cohesion: 0.13
Nodes (11): src_assets_home_home_fleet_vessel, CONDITIONS, EQUIPMENT, HERO, HERO_PROOF, MANUFACTURING, SECTORS, SERVICE (+3 more)

### Community 8 - "RTG design language"
Cohesion: 0.10
Nodes (20): 2.1 Full-bleed hero → rework `PageHero`, 2.2 Numbered sequence with per-step media → the signature device, 2.3 Old-way / RTG-way comparison → `VersusTable`, 2.4 Big bare figures → a `bare` variant of `.stats`, 2.5 End-of-page sibling cards → already built, 2.6 Media-to-text ratio → `FeatureRow`, the one genuinely missing block, Colour, Images (+12 more)

### Community 9 - "Template inventory"
Cohesion: 0.11
Nodes (18): About — 4 pages, Article — 1 page, Careers — 1 page, Case — 4 pages, Contact — 2 pages, Form — 8 pages, Guide — 1 page, Home — 1 page (+10 more)

### Community 10 - "build-page-map.mjs"
Cohesion: 0.13
Nodes (14): xlsx, body, closeIdx, current, head, OUT, pages, pagesStart (+6 more)

### Community 11 - "RTG Website — Build"
Cohesion: 0.15
Nodes (12): Accessibility, Before launch, Blocking — the site should not go live without these, Content depth, Content protection — verified, not just intended, Regenerating, RTG Website — Build, Run it (+4 more)

### Community 12 - "content.config.ts"
Cohesion: 0.15
Nodes (11): ref_astro_content, ref_astro_loaders, card, collections, formField, IDS, imgBrief, link (+3 more)

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

### Community 18 - "p-03.mdx"
Cohesion: 0.22
Nodes (8): And a spares recommendation, How it was proved, The assessment came first, The documentation was reissued, The result, The situation, What was reused, What was upgraded

### Community 19 - "audit-protection.mjs"
Cohesion: 0.22
Nodes (8): ref_node_path, BANNED, ds, EXIF, exts, hits, root, roots

### Community 20 - "strip-exif.mjs"
Cohesion: 0.33
Nodes (5): ref_node_fs, ref_sharp, EXIF, root, walk()

### Community 21 - "gen-stubs.mjs"
Cohesion: 0.33
Nodes (5): ref_node_url, outDir, root, SKIP, PAGES

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

### Community 28 - "s-02.mdx"
Cohesion: 0.40
Nodes (4): <Fig of="cptDepthM" /> working-depth record, Sizing at depth, Track record, What we supply

### Community 29 - "a-01.mdx"
Cohesion: 0.50
Nodes (3): The model, and why it was built that way, What we believe, Where we are

### Community 34 - "s-01.mdx"
Cohesion: 0.50
Nodes (3): Testing, Track record, What we supply

### Community 38 - "s-03.mdx"
Cohesion: 0.33
Nodes (5): Cable handling, Lead times, Site investigation, To specify a tensioner, Vessels of opportunity

### Community 39 - "s-05.mdx"
Cohesion: 0.40
Nodes (4): Design choices, Testing, What we supply, Who we work with

### Community 40 - "s-07.mdx"
Cohesion: 0.50
Nodes (3): Class and acceptance, Security of supply, Traceability and documentation

### Community 86 - "z-01.mdx"
Cohesion: 0.22
Nodes (8): Changes to this notice, How long we keep it, How to contact us or complain, What we collect, Who we are, Who we share it with, Why we hold it, and the lawful basis, Your rights

### Community 87 - "z-02.mdx"
Cohesion: 0.33
Nodes (5): Categories, Changing your mind, Each item named, More about your data, The short version

### Community 88 - "z-03.mdx"
Cohesion: 0.22
Nodes (8): Changes to these terms, Copyright in drawings and technical publications, Documents issued to you, Figures published here, Liability, Links to other websites, Using the site, Who owns this website

### Community 89 - "z-04.mdx"
Cohesion: 0.50
Nodes (3): Known issues, Telling us about a problem, The standard we target

### Community 90 - "ImageSlot.astro"
Cohesion: 0.32
Nodes (4): photo, tiles, mediaFor(), MotionHint

### Community 92 - "page.ts"
Cohesion: 0.31
Nodes (6): OFF_MAP_IDS, OFF_MAP_PAGES, BY_ID, ResolvedPage, resolvePage(), { p }

### Community 96 - "Base.astro"
Cohesion: 0.08
Nodes (19): ref_fontsource_jetbrains_mono_400_css, ref_fontsource_jetbrains_mono_500_css, ref_fontsource_variable_archivo_files_archivo_latin_wght_normal_woff2_url, ref_fontsource_variable_archivo_wght_css, ref_fontsource_variable_inter_files_inter_latin_wght_normal_woff2_url, ref_fontsource_variable_inter_wght_css, canonical, ogImage (+11 more)

### Community 97 - "Appendix B - Canonical Sources (read these before reinventing)"
Cohesion: 0.09
Nodes (21): APPENDICES - Real Source-Backed Reference Material, Appendix A - Install Commands per Design System, Appendix B - Canonical Sources (read these before reinventing), Appendix C - Apple Liquid Glass: Honest Web Approximation, Apple Liquid Glass (Apple platforms only), Atlassian, Bootstrap, Carbon (+13 more)

### Community 98 - "4. DESIGN ENGINEERING DIRECTIVES (Bias Correction)"
Cohesion: 0.17
Nodes (12): 4.10 Quotes & Testimonials, 4.11 Page Theme Lock (Light / Dark Mode Consistency), 4.1 Typography, 4.2 Color Calibration, 4.3 Layout Diversification, 4.4 Materiality, Shadows, Cards, 4.5 Interactive UI States, 4.6 Data & Form Patterns (+4 more)

### Community 99 - "Product"
Cohesion: 0.17
Nodes (11): Accessibility & Inclusion, Brand Commitments, Capabilities and Constraints, Evidence on Hand, Operating Context, Platform, Positioning, Product (+3 more)

### Community 100 - "10. REFERENCE VOCABULARY (Pattern Names the Agent Should Know)"
Cohesion: 0.20
Nodes (10): 10. REFERENCE VOCABULARY (Pattern Names the Agent Should Know), Animation Library Choice, Cards & Containers, Galleries & Media, Hero Paradigms, Layout & Grids, Micro-Interactions & Effects, Navigation & Menus (+2 more)

### Community 101 - "tasteskill: Anti-Slop Frontend Skill"
Cohesion: 0.20
Nodes (10): 13. OUT OF SCOPE, 14. FINAL PRE-FLIGHT CHECK, 1.A Dial Inference (design read → dial values), 1.B Use-Case Presets, 1.C How the Dials Drive Output, 1. THE THREE DIALS (Core Configuration), 2.A When to reach for a real design system (use official packages), 2.B When the brief is an aesthetic, not a system (+2 more)

### Community 102 - "seo.ts"
Cohesion: 0.46
Nodes (7): ancestorsOf(), absolute(), breadcrumbNode(), buildJsonLd(), faqPageJsonLd(), ogImageFor(), organizationNode()

### Community 103 - "9. AI TELLS (Forbidden Patterns)"
Cohesion: 0.25
Nodes (8): 9.A Visual & CSS, 9. AI TELLS (Forbidden Patterns), 9.B Typography, 9.C Layout & Spacing, 9.D Content & Data ("Jane Doe" Effect), 9.E External Resources & Components, 9.F Production-Test Tells (banned outright), 9.G EM-DASH BAN (the single most-violated Tell)

### Community 104 - "astro.config.mjs"
Cohesion: 0.25
Nodes (7): pagesDir, pagesTs, unfinished, ref_astro_config, @astrojs/mdx, @astrojs/sitemap, SITE

### Community 105 - "11. REDESIGN PROTOCOL"
Cohesion: 0.29
Nodes (7): 11.A Detect the Mode (first action), 11.B Audit Before Touching, 11.C Preservation Rules, 11.D Modernisation Levers (priority order), 11.E Decision Tree: Targeted Evolution vs Full Redesign, 11.F What Never Changes Silently, 11. REDESIGN PROTOCOL

### Community 106 - "3. DEFAULT ARCHITECTURE & CONVENTIONS"
Cohesion: 0.29
Nodes (7): 3.A Stack, 3.B State, 3.C Icons, 3.D Emoji Policy, 3. DEFAULT ARCHITECTURE & CONVENTIONS, 3.E Responsiveness & Layout Mechanics, 3.F Dependency Verification (mandatory)

### Community 107 - "6. PERFORMANCE & ACCESSIBILITY GUARDRAILS"
Cohesion: 0.29
Nodes (7): 6.A Hardware Acceleration, 6.B Reduced Motion (mandatory), 6.C Dark Mode (mandatory for any consumer-facing page), 6.D Core Web Vitals Targets, 6.E DOM Cost, 6.F Z-Index Restraint, 6. PERFORMANCE & ACCESSIBILITY GUARDRAILS

### Community 108 - "0. BRIEF INFERENCE (Read the Room Before Anything Else)"
Cohesion: 0.40
Nodes (5): 0.A Read these signals first, 0.B Output a one-line "Design Read" before generating, 0. BRIEF INFERENCE (Read the Room Before Anything Else), 0.C If the brief is ambiguous, ask one question, do not guess, 0.D Anti-Default Discipline

### Community 109 - "12. THE BLOCK LIBRARY (Contract - Implementations Land Here Iteratively)"
Cohesion: 0.40
Nodes (5): 12.A File Location, 12.B Required Frontmatter, 12.C Required Body Sections, 12.D Block-Library Discipline, 12. THE BLOCK LIBRARY (Contract - Implementations Land Here Iteratively)

### Community 110 - "5. CONTEXT-AWARE PROACTIVITY"
Cohesion: 0.40
Nodes (5): 5.A Sticky-Stack - Canonical Skeleton, 5.B Horizontal-Pan - Canonical Skeleton, 5.C Scroll-Reveal Stagger - Canonical Skeleton (lighter alternative), 5. CONTEXT-AWARE PROACTIVITY, 5.D Forbidden Animation Patterns

### Community 111 - "8. DARK MODE PROTOCOL"
Cohesion: 0.40
Nodes (5): 8.A Token Strategy (pick one, stick to it), 8.B Do Not Prescribe Specific Colors Here, 8.C Default Mode, 8.D Test in Both Modes Before Finishing, 8. DARK MODE PROTOCOL

### Community 112 - "7. DIAL DEFINITIONS (Technical Reference)"
Cohesion: 0.50
Nodes (4): 7. DIAL DEFINITIONS (Technical Reference), DESIGN_VARIANCE (Level 1-10), MOTION_INTENSITY (Level 1-10), VISUAL_DENSITY (Level 1-10)

### Community 124 - "Site-wide ocean world (homepage first surface)"
Cohesion: 0.50
Nodes (3): Direction contract, Site-wide ocean world (homepage first surface), Unresolved

## Knowledge Gaps
- **398 isolated node(s):** `pagesDir`, `pagesTs`, `unfinished`, `name`, `version` (+393 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 573 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **69 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `astro` connect `package.json` to `media.ts`?**
  _High betweenness centrality (0.021) - this node is a cross-community bridge._
- **Why does `tasteskill: Anti-Slop Frontend Skill` connect `tasteskill: Anti-Slop Frontend Skill` to `Appendix B - Canonical Sources (read these before reinventing)`, `4. DESIGN ENGINEERING DIRECTIVES (Bias Correction)`, `10. REFERENCE VOCABULARY (Pattern Names the Agent Should Know)`, `9. AI TELLS (Forbidden Patterns)`, `11. REDESIGN PROTOCOL`, `3. DEFAULT ARCHITECTURE & CONVENTIONS`, `6. PERFORMANCE & ACCESSIBILITY GUARDRAILS`, `0. BRIEF INFERENCE (Read the Room Before Anything Else)`, `12. THE BLOCK LIBRARY (Contract - Implementations Land Here Iteratively)`, `5. CONTEXT-AWARE PROACTIVITY`, `8. DARK MODE PROTOCOL`, `7. DIAL DEFINITIONS (Technical Reference)`?**
  _High betweenness centrality (0.014) - this node is a cross-community bridge._
- **What connects `pagesDir`, `pagesTs`, `unfinished` to the rest of the system?**
  _398 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `blocks.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08040293040293041 - nodes in this community are weakly interconnected._
- **Should `media.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.041666666666666664 - nodes in this community are weakly interconnected._
- **Should `rtg3d.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.12091038406827881 - nodes in this community are weakly interconnected._
- **Should `build.py` be split into smaller, more focused modules?**
  _Cohesion score 0.0766488413547237 - nodes in this community are weakly interconnected._