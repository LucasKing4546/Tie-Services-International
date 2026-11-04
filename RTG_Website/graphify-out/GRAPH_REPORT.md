# Graph Report - RTG_Website  (2026-11-04)

## Corpus Check
- 194 files · ~3,126,334 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 11 file(s) not represented in the graph (top: .css 9, (none) 1, .xml 1)

## Summary
- 969 nodes · 1406 edges · 139 communities (67 shown, 72 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 21 edges (avg confidence: 0.92)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `91329c4a`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- blocks.ts
- site_data.py
- media.ts
- Contract manufacturing audit (C-00 to C-09), review only
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
- l-01.mdx
- audit-protection.mjs
- build-equipment.mjs
- ref_node_fs
- c-00.mdx
- c-01.mdx
- c-02.mdx
- c-03.mdx
- c-04.mdx
- s-02.mdx
- a-01.mdx
- s-06.mdx
- s-01.mdx
- s-04.mdx
- l-02.mdx
- s-03.mdx
- s-05.mdx
- s-07.mdx
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
- lib/equipment.ts
- src_assets_equipment_e07_aframe_dusk
- src_assets_equipment_e08_knuckle_boom
- src_assets_equipment_e08_proof_load_test
- Base.astro
- Appendix B - Canonical Sources (read these before reinventing)
- 4. DESIGN ENGINEERING DIRECTIVES (Bias Correction)
- Product
- 10. REFERENCE VOCABULARY (Pattern Names the Agent Should Know)
- tasteskill: Anti-Slop Frontend Skill
- Homepage (H-01, `/`) audit, 2026-10-29
- 9. AI TELLS (Forbidden Patterns)
- Audit: equipment-other (E-07 to E-12)
- 11. REDESIGN PROTOCOL
- 3. DEFAULT ARCHITECTURE & CONVENTIONS
- 6. PERFORMANCE & ACCESSIBILITY GUARDRAILS
- By equipment family
- 12. THE BLOCK LIBRARY (Contract - Implementations Land Here Iteratively)
- 5. CONTEXT-AWARE PROACTIVITY
- 8. DARK MODE PROTOCOL
- 7. DIAL DEFINITIONS (Technical Reference)
- 2026-10-13T10-00-11Z__src-pages-index-astro.md
- 2026-10-13T16-18-36Z__src-components-templates-product-astro.md
- vercel.json
- src_assets_contact_x01_team
- src_assets_sectors_s02_pipeline_survey
- src_assets_sectors_s02_seabed_tool
- src_assets_sectors_s03_cable_work
- src_assets_sectors_s03_wind_array
- src_assets_sectors_s05_research_deck
- src_assets_sectors_s05_research_vessel
- Findings
- Homepage (H-01)
- Findings
- Audit brief (shared by every review agent)
- B. Broken or below standard: fixable in code now
- ProofBar.astro
- site.js
- src_lib_blocks_type
- Audit: equipment / winches (E-02 to E-06, Product template)
- forms-check.cjs
- 0. BRIEF INFERENCE (Read the Room Before Anything Else)
- scripts
- astro.config.mjs
- dependencies
- forms.ts
- devDependencies

## God Nodes (most connected - your core abstractions)
1. `[]` - 29 edges
2. `[]` - 28 edges
3. `[]` - 26 edges
4. `[]` - 25 edges
5. `PageMeta` - 25 edges
6. `[]` - 23 edges
7. `[]` - 21 edges
8. `PageEntry` - 20 edges
9. `mdxComponents` - 18 edges
10. `Template inventory` - 18 edges

## Surprising Connections (you probably didn't know these)
- `Routing` --references--> `entryFor()`  [INFERRED]
  CLAUDE.md → src/lib/content.ts
- `Critical` --references--> `cardFrom()`  [INFERRED]
  docs/audit-2026-10-29/about-contact-legal.md → src/lib/content.ts
- `Medium` --references--> `articleJsonLd()`  [INFERRED]
  docs/audit-2026-10-29/lifecycle-yards.md → src/lib/seo.ts
- `Medium` --references--> `render()`  [INFERRED]
  docs/audit-2026-10-29/equipment-hubs.md → research/rtg-website/rtg-website/site_build/build.py
- `Low` --references--> `cta()`  [INFERRED]
  docs/audit-2026-10-29/proof-resources.md → research/rtg-website/rtg-website/site_build/site_data.py

## Import Cycles
- None detected.

## Communities (139 total, 72 thin omitted)

### Community 0 - "blocks.ts"
Cohesion: 0.09
Nodes (53): trail, common, string, lists, jsonLdPage, siblings, [], jsonLdPage (+45 more)

### Community 1 - "site_data.py"
Cohesion: 0.05
Nodes (36): Audit: About, Contact, Forms, Legal, 404 (14 pages), Critical, High, Low, Medium, Audit: Proof and Resources (15 pages), High, Low (+28 more)

### Community 2 - "media.ts"
Cohesion: 0.04
Nodes (46): src_assets_equipment_e00_deck_spread, src_assets_equipment_e00_system_overview, src_assets_equipment_e02_deployment_frame, src_assets_equipment_e02_ds01_guarded, src_assets_equipment_e02_ds01_panel, src_assets_equipment_e02_ds38_hpu_b, src_assets_equipment_e02_ds38_winch, src_assets_equipment_e02_hpu (+38 more)

### Community 3 - "Contract manufacturing audit (C-00 to C-09), review only"
Cohesion: 0.22
Nodes (8): Checked and fine, Contract manufacturing audit (C-00 to C-09), review only, Critical, High, Integrity summary, Intentional gaps (not bugs), Low, Medium

### Community 4 - "build.py"
Cohesion: 0.09
Nodes (27): collections, datetime, Audit: equipment hubs — `/equipment/` (E-00) and `/equipment/winches/` (E-01), Checked and fine, Findings, High, Low, Medium (+19 more)

### Community 5 - "RTG Website — project guide for Claude Code"
Cohesion: 0.07
Nodes (28): 1. What this is, 2. The workflow — follow this for every feature and every page, 3. Stack and conventions, 4. The 17 templates, 5. Known gaps — do not paper over these, 6. What must never be published, 7. Design system, 8. Tone of voice (+20 more)

### Community 6 - "package.json"
Cohesion: 0.15
Nodes (12): description, name, private, type, version, astro, @astrojs/check, @fontsource/jetbrains-mono (+4 more)

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
Cohesion: 0.14
Nodes (13): body, closeIdx, current, head, OUT, pages, pagesStart, root (+5 more)

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
Cohesion: 0.13
Nodes (15): Baseline (passes), Critical, Design-system audit: shared tokens, CSS, header/footer, blocks, type, Gaps present (intentional, not bugs), High, Low, Medium, Scores (impeccable audit) (+7 more)

### Community 19 - "audit-protection.mjs"
Cohesion: 0.22
Nodes (8): ref_node_url, BANNED, ds, EXIF, exts, hits, root, roots

### Community 20 - "build-equipment.mjs"
Cohesion: 0.11
Nodes (13): ref_node_assert_strict, APPS, COL, items, num(), OUT, root, rows (+5 more)

### Community 21 - "ref_node_fs"
Cohesion: 0.18
Nodes (10): ref_node_fs, ref_node_path, ref_sharp, outDir, root, SKIP, EXIF, root (+2 more)

### Community 22 - "c-00.mdx"
Cohesion: 0.40
Nodes (4): Approvals, EU manufacture, Getting started, IP protection

### Community 26 - "c-04.mdx"
Cohesion: 0.50
Nodes (3): Deliverables, Required from you, Testing

### Community 28 - "s-02.mdx"
Cohesion: 0.40
Nodes (4): <Fig of="cptDepthM" /> working-depth record, Sizing at depth, Track record, What we supply

### Community 29 - "a-01.mdx"
Cohesion: 0.50
Nodes (3): Our values, RTG today, Visit us

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

### Community 92 - "lib/equipment.ts"
Cohesion: 0.15
Nodes (22): extra, tags, designs, figs, EQUIPMENT, EquipmentApp, EquipmentDrive, EquipmentItem (+14 more)

### Community 96 - "Base.astro"
Cohesion: 0.06
Nodes (31): ref_fontsource_jetbrains_mono_400_css, ref_fontsource_jetbrains_mono_500_css, ref_fontsource_variable_archivo_files_archivo_latin_wght_normal_woff2_url, ref_fontsource_variable_archivo_wght_css, ref_fontsource_variable_inter_files_inter_latin_wght_normal_woff2_url, ref_fontsource_variable_inter_wght_css, ancestorsOf(), OFF_MAP_IDS (+23 more)

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

### Community 102 - "Homepage (H-01, `/`) audit, 2026-10-29"
Cohesion: 0.22
Nodes (8): Code leftovers from today's changes (Low), Hoist line and hero, Homepage (H-01, `/`) audit, 2026-10-29, Integrity, Sectors, equipment, finder, Service, seabed, footer, Statement, conditions, showroom, Tiers (WAI-ARIA tabs + 3D)

### Community 103 - "9. AI TELLS (Forbidden Patterns)"
Cohesion: 0.25
Nodes (8): 9.A Visual & CSS, 9. AI TELLS (Forbidden Patterns), 9.B Typography, 9.C Layout & Spacing, 9.D Content & Data ("Jane Doe" Effect), 9.E External Resources & Components, 9.F Production-Test Tells (banned outright), 9.G EM-DASH BAN (the single most-violated Tell)

### Community 104 - "Audit: equipment-other (E-07 to E-12)"
Cohesion: 0.25
Nodes (7): Audit: equipment-other (E-07 to E-12), Critical, Gap / draft markers (intentional, listed only), High, Low, Medium, Passes (not repeated below)

### Community 105 - "11. REDESIGN PROTOCOL"
Cohesion: 0.29
Nodes (7): 11.A Detect the Mode (first action), 11.B Audit Before Touching, 11.C Preservation Rules, 11.D Modernisation Levers (priority order), 11.E Decision Tree: Targeted Evolution vs Full Redesign, 11.F What Never Changes Silently, 11. REDESIGN PROTOCOL

### Community 106 - "3. DEFAULT ARCHITECTURE & CONVENTIONS"
Cohesion: 0.29
Nodes (7): 3.A Stack, 3.B State, 3.C Icons, 3.D Emoji Policy, 3. DEFAULT ARCHITECTURE & CONVENTIONS, 3.E Responsiveness & Layout Mechanics, 3.F Dependency Verification (mandatory)

### Community 107 - "6. PERFORMANCE & ACCESSIBILITY GUARDRAILS"
Cohesion: 0.29
Nodes (7): 6.A Hardware Acceleration, 6.B Reduced Motion (mandatory), 6.C Dark Mode (mandatory for any consumer-facing page), 6.D Core Web Vitals Targets, 6.E DOM Cost, 6.F Z-Index Restraint, 6. PERFORMANCE & ACCESSIBILITY GUARDRAILS

### Community 108 - "By equipment family"
Cohesion: 0.12
Nodes (16): Application information (archived 2026-10-29), By equipment family, Claude plugins for social media posts (searched 2026-10-29), E-01 Winches (hub): "Marine Winches | Survey, Geotechnical, Seismic & ROV | RTG", E-02 Geotechnical & Coring Winches: "Geotechnical & Coring Winches | CPT & Piston Corer | RTG", E-03 Survey & Oceanographic Winches: "Survey & Oceanographic Winches | 300 to 4,000 m | RTG", E-04 Seismic Winches: "Seismic Winches & Source Handling | RTG", E-05 ROV, Tow & Umbilical Winches: "ROV, Tow & Umbilical Winches | RTG" (+8 more)

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

### Community 113 - "2026-10-13T10-00-11Z__src-pages-index-astro.md"
Cohesion: 0.29
Nodes (6): Design health score: 19/28 (Acceptable, 68%). Heuristics 7, 9, 10 n/a., Design specificity verdict, Minor observations, Persona red flags, Priority issues, Questions

### Community 114 - "2026-10-13T16-18-36Z__src-components-templates-product-astro.md"
Cohesion: 0.40
Nodes (4): Design health score: 26/36 (Good, 72%). Heuristic 10 n/a., Detector and measurements, Fixed in this pass, Open

### Community 123 - "Findings"
Cohesion: 0.25
Nodes (7): Audit: Lifecycle and Yards & Integrators (10 pages), Baseline (passes), Critical, Findings, High, Low, Medium

### Community 124 - "Homepage (H-01)"
Cohesion: 0.50
Nodes (3): Direction contract, Homepage (H-01), Unresolved

### Community 125 - "Findings"
Cohesion: 0.25
Nodes (7): Audit: sectors-b (S-03, S-04, S-05), Critical, Findings, High, Low, Medium, What passed

### Community 126 - "Audit brief (shared by every review agent)"
Cohesion: 0.29
Nodes (6): Audit brief (shared by every review agent), Check, Context: what changed today (commit 7e032005), Output, Read first, Tools

### Community 127 - "B. Broken or below standard: fixable in code now"
Cohesion: 0.29
Nodes (6): A. Needs RTG / owner decision (content, rights, figures), B. Broken or below standard: fixable in code now, Critical, High, Medium, RTG site audit: combined findings (2026-10-29)

### Community 128 - "ProofBar.astro"
Cohesion: 0.43
Nodes (6): statDigits(), statDigits(), isNumericStat(), statDigits(), statLead(), statSuffix()

### Community 129 - "site.js"
Cohesion: 0.15
Nodes (7): year, CONSENT, FOOTER_NAV, LEGAL_NAV, NAV, PROOF, PROOF_DISPLAY

### Community 131 - "Audit: equipment / winches (E-02 to E-06, Product template)"
Cohesion: 0.29
Nodes (6): §6, Audit: equipment / winches (E-02 to E-06, Product template), Critical, High, Low, Medium

### Community 132 - "forms-check.cjs"
Cohesion: 0.33
Nodes (5): c_users_lucas_appdata_local_npm_cache_npx_e41f203b7505f1fb_node_modules_playwright_index_chromium, assert, { chromium }, ext_users_lucas_appdata_local_npm_cache_npx_e41f203b7505f1fb_node_modules_playwright_index_js, ref_assert

### Community 133 - "0. BRIEF INFERENCE (Read the Room Before Anything Else)"
Cohesion: 0.40
Nodes (5): 0.A Read these signals first, 0.B Output a one-line "Design Read" before generating, 0. BRIEF INFERENCE (Read the Room Before Anything Else), 0.C If the brief is ambiguous, ask one question, do not guess, 0.D Anti-Default Discipline

### Community 134 - "scripts"
Cohesion: 0.18
Nodes (11): scripts, audit, audit:protection, audit:seo, build, check, dev, equipment (+3 more)

### Community 135 - "astro.config.mjs"
Cohesion: 0.25
Nodes (7): pagesDir, pagesTs, unfinished, ref_astro_config, @astrojs/mdx, @astrojs/sitemap, SITE

### Community 136 - "dependencies"
Cohesion: 0.29
Nodes (7): dependencies, astro, @astrojs/mdx, @astrojs/sitemap, @fontsource/jetbrains-mono, @fontsource-variable/archivo, @fontsource-variable/inter

### Community 137 - "forms.ts"
Cohesion: 0.48
Nodes (5): errLine(), initForms(), message(), PREFILL, showError()

### Community 138 - "devDependencies"
Cohesion: 0.50
Nodes (4): devDependencies, @astrojs/check, typescript, xlsx

## Knowledge Gaps
- **477 isolated node(s):** `pagesDir`, `pagesTs`, `unfinished`, `{ chromium }`, `assert` (+472 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 679 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **72 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cardFrom()` connect `blocks.ts` to `site_data.py`, `lib/equipment.ts`?**
  _High betweenness centrality (0.077) - this node is a cross-community bridge._
- **Why does `Critical` connect `site_data.py` to `blocks.ts`?**
  _High betweenness centrality (0.076) - this node is a cross-community bridge._
- **What connects `pagesDir`, `pagesTs`, `unfinished` to the rest of the system?**
  _477 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `blocks.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08658008658008658 - nodes in this community are weakly interconnected._
- **Should `site_data.py` be split into smaller, more focused modules?**
  _Cohesion score 0.04609929078014184 - nodes in this community are weakly interconnected._
- **Should `media.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.041666666666666664 - nodes in this community are weakly interconnected._
- **Should `build.py` be split into smaller, more focused modules?**
  _Cohesion score 0.08505747126436781 - nodes in this community are weakly interconnected._