# RTG Website — project guide for Claude Code

This file governs how work is done in this repository. Read it before touching
anything.

---

## 1. What this is

The new website for **Romica Tie Group (RTG)** — a British-designed,
Romanian-manufactured maker of heavy marine deck equipment: winches, launch and
recovery systems, cable and pipe tensioners, deck cranes and hydraulic power
units for offshore research, hydrographic survey and geotechnical vessels.

- **70 pages** across **17 templates**, defined in `research/RTG_Website_Page_Map.xlsx`.
- Designed in the UK, built and tested in Satu Mare, Romania. Trading since 2003.
- Replaces a legacy PHP site that has no meta descriptions, no canonicals, no
  structured data, three `<h1>` elements on the homepage and a sitemap pointing
  at the wrong host over the wrong protocol.

The buyer is technical and sceptical: a vessel operations manager, a naval
architect, or a shipyard procurement lead. **Evidence beats adjectives.** A case
study without a number is a brochure.

### The three buyer routes (avatars)

Every page is tagged with the avatar it serves. This drives filtering and tone.

| Code | Avatar | Wants |
|---|---|---|
| `AV01` | The Operator | Runs vessels. New equipment, refurbishment, support. |
| `AV02` | The Design Authority | Owns the design and the IP. Wants a factory. |
| `AV03` | The Yard & Integrator | Builds or refits vessels. Wants capacity and certification. |
| `ALL` | All three | Homepage, about, legal. |

---

## 2. The workflow — follow this for every feature and every page

**Two steps, in order, every time. Do not skip step 1.**

### Step 1 — Research the best approach first

Before writing any code for a page or feature, research how it should be done.
That means, as appropriate to the task:

- Read the relevant rows of `src/data/pages.ts` for the page you are building —
  the workbook already specifies the title, meta description, H1, keywords,
  schema type, CTA, target word count and the **content blocks** the page must contain.
- Read the corresponding section of `research/rtg-website/` — the earlier static
  build is a **content and structure reference only**. Do not copy its markup or
  its design; it is superseded. Its `site_build/site_data.py` is useful as a
  content model and its README documents decisions worth knowing.
- Look at how the closest existing template in this repo already solves the
  problem, and match it.
- Where a genuinely new technique is needed (a scroll behaviour, an accessibility
  pattern, a schema type, an image strategy), search for current best practice
  before choosing. State the options and the trade-off before implementing.

Write down the conclusion before implementing. If a decision is load-bearing and
ambiguous, ask rather than guess.

### Step 2 — Implement and review with `/feature-dev`

Use the **feature-dev plugin** for the implementation itself:

```
/feature-dev Build the About template (A-01…A-04)
```

It runs a 7-phase workflow — discovery, codebase exploration, clarifying
questions, architecture options, implementation, quality review, summary — and
launches `code-explorer`, `code-architect` and `code-reviewer` agents at the
appropriate phases. Let it complete the review phase; do not stop at
implementation.

Plugin: <https://github.com/anthropics/claude-code/tree/main/plugins/feature-dev>

**Use it for**: any new template, any multi-file change, anything with an
architectural decision.
**Skip it for**: typo fixes, copy edits, single-value changes.

### Definition of done for any page or template

- [ ] `npm run build` passes
- [ ] `npm run audit` passes (SEO + content protection, zero failures)
- [ ] Exactly one `<h1>`, matching the intent of the workbook `h1` field
- [ ] Every content block listed in the workbook is present
- [ ] Every image has an `alt` (empty `alt=""` only if genuinely decorative)
- [ ] Keyboard operable, visible focus, honours `prefers-reduced-motion`
- [ ] No banned content (§6)

---

## 3. Stack and conventions

| Thing | Choice | Why |
|---|---|---|
| Framework | **Astro 5**, static output | Zero JS by default. 70 mostly-static pages stay fast; 3D loads only where used. |
| Language | TypeScript, strict | |
| Content | MDX per page in `src/content/pages/` | A copywriter can edit prose without touching code. |
| Metadata | `src/data/pages.ts` | Generated from the workbook. **Single source of truth.** |
| 3D | three.js, lazily imported | ~500 kB — never on the critical path. |
| Styling | Plain CSS with custom properties | No framework. Tokens in `src/styles/tokens.css`. |

### Directory map

```
src/
  data/pages.ts          AUTO-GENERATED from the workbook. Never hand-edit.
  data/pages-extra.ts    Off-map pages the workbook doesn't cover (404).
  data/site.js           Host, nav, verified proof figures (PROOF, PROOF_DISPLAY).
  data/home.ts           Homepage content as data.
  content.config.ts      The MDX frontmatter schema (Zod, .strict()) shared by all 70 pages.
  content/pages/*.mdx    Page bodies. Named after the page id, lower case.
  layouts/Base.astro     The entire <head>: title, meta, canonical, OG, JSON-LD.
  components/site/       Header, Footer.
  components/home/       Homepage-only sections.
  components/blocks/     The shared block library every template composes
                          from (PageHero, Section, CardGrid, SpecTable,
                          ProofBar, PageEnding, FeaturedCase, EnquiryForm...).
                          Only PageHero ever renders an <h1>.
  components/templates/  One component per TemplateName (Sector.astro,
                          Product.astro...). Props are always
                          { page: PageMeta; entry: CollectionEntry<'pages'> }.
                          Fallback.astro is the temporary stand-in for any
                          template not yet built.
  lib/rtg3d.ts            Procedural 3D models of RTG equipment.
  lib/home-scroll.ts      Homepage scroll choreography (3D only — motion.ts
                          below owns everything shared).
  lib/motion.ts           Shared reveal/count-up/parallax system every page
                          boots on 'astro:page-load'. Templates opt in
                          declaratively (a class, a data-motion attribute).
  lib/seo.ts              JSON-LD graph builders — buildJsonLd, articleJsonLd,
                          faqPageJsonLd.
  lib/content.ts          entryFor/childEntries/cardFrom — resolves page ids
                          to their MDX entries or to render-ready cards.
  lib/blocks.ts           Shared prop types for the block library (CardItem,
                          SpecRow, Step...).
  lib/page.ts             resolvePage() — checks pages.ts then pages-extra.ts.
  lib/mdx.ts              mdxComponents map (Gap, Fig, Note, SpecTable...)
                          every MDX body gets with no import.
  styles/                 tokens.css (global), blocks.css (every non-Home
                          page), home.css (homepage only).
  pages/[...slug].astro   The routing dispatcher — see below.
  pages/index.astro, 404.astro  The two explicit route files.
scripts/                 Page-map regeneration and pre-deploy audits.
research/                Source material. Read-only reference.
```

### Routing

Every page except Home (`index.astro`) and 404 renders through one dynamic
route, `src/pages/[...slug].astro`. Its `getStaticPaths()` walks every row in
`PAGES`, resolves the matching MDX entry via `entryFor()` (which throws,
naming the page id, if the body is missing), and dispatches on
`PageMeta.template` to the matching component in `components/templates/`.
Template names not yet built (§4) point at `Fallback.astro` instead, so
every workbook page always has a real URL — swapping a real template in
later is a one-line change to the dispatcher's `TEMPLATES` map, not a
routing change.

### Rules

- **Never hand-edit `src/data/pages.ts`.** Edit the workbook, run `npm run pagemap`.
- **Never put SEO metadata in MDX frontmatter.** It comes from the page map.
- Every page renders through `Base.astro` with a `pageId`. An unknown id throws
  at build time — that is deliberate, it catches typos.
- Numbers shown on the site come from `PROOF` in `src/data/site.js`, so one
  correction propagates everywhere. Do not hardcode a figure in a component.
- Import via aliases: `@components/…`, `@layouts/…`, `@lib/…`, `@data/…`.

### Commands

```bash
npm run dev        # local dev server
npm run build      # static build to dist/
npm run check      # astro + TypeScript diagnostics
npm run pagemap    # regenerate src/data/pages.ts from the workbook
npm run audit      # SEO + content-protection gates — must pass before deploy
```

---

## 4. The 17 templates

Build order follows workbook priority: **P1 earns revenue or unblocks a sale.**

| Template | Pages | Status | Notes |
|---|---|---|---|
| `Home` | 1 | **Done** | Full 3D scroll choreography. Reference for quality bar. |
| `Hub` | 11 | **Done** | Section landing pages. Sectors, Equipment, Winches, Proof, Resources… |
| `Sector` | 7 | **Done** | S-01…S-07. The market the buyer identifies with. P1. |
| `Product` | 10 | **Done** | Equipment detail with open Tier 1 spec tables. `Product` schema. P1. |
| `Service` | 6 | **Done** | Lifecycle and contract-manufacturing services. |
| `Tier` | 4 | **Done** | The four-tier scope ladder, C-01…C-04. |
| `Form` | 8 | **Done** | Eight forms. See §5 — none of them have a backend yet. |
| `Case` | 4 | **Done** | Case studies. P-03 has real data; the rest need RTG input. |
| `Proof` | 4 | **Done** | Certifications, test facility, references, testimonials. |
| `About` | 4 | **Done** | Company, people & facility, QHSE, sustainability. Only A-01 has real prose; A-02–A-04 stay draft — RTG-only facts (headcount, facility, certificate numbers). |
| `Legal` | 4 | **Done** | Privacy, cookies, terms, accessibility. All four still draft — needs legal review, none have real policy text yet. |
| `Contact` | 2 | **Done** | Contact and agents. Both still draft — no office address, phone, email or named contact confirmed anywhere. |
| `Ladder` | 1 | **Done** | Contract-manufacturing hub — the scope ladder. |
| `Guide` | 1 | **Done** | "Refurbish, upgrade or replace?" decision guide. |
| `Policy` | 1 | **Done** | "Your IP, protected". Commercially important. |
| `Article` | 1 | **Done** | EU-origin fabrication. `Article` schema. |
| `Careers` | 1 | **Done** | No real vacancies yet — `vacancies: []` until RTG supplies real openings; a JobPosting node is only ever emitted per vacancy, never for an empty list. |

Get the exact page list for a template with `pagesByTemplate('Sector')`. A
template's own component doc comment records where it deliberately diverges
from the plan's original block description to match how the content was
actually authored (Ladder, Tier, Service, Guide all do this for one block
each) — read it before assuming the plan text is exactly what the code does.

---

## 5. Known gaps — do not paper over these

These are real and unresolved. Flag them; do not invent content to fill them.

1. **The canonical host is undecided.** `SITE.origin` is set to
   `https://www.romicatiegroup.com`. The site sells "Romica Tie Group", the old
   title tags said "Romica Engineering LTD", social handles say "Romica
   Engineering", datasheets are prefixed "REL", and two domains resolve. Every
   canonical, OG tag, sitemap entry and schema node depends on this.
2. **No form backend.** Eight forms are specified. They need a server endpoint,
   CRM integration and an alert to the account owner. A honeypot field named
   `website` must be present and any submission that fills it rejected.
3. **Gated documents are not built.** Datasheets must be generated on request,
   watermarked per recipient with a unique serial, rasterised, metadata
   stripped, and delivered by a short-lived signed URL. Never a static file path.
4. **Consent management.** Analytics must be genuinely withheld until consent,
   not merely declared to be. UK and EU GDPR both apply.
5. **No photography yet.** Every image is a placeholder. 3D models in
   `lib/rtg3d.ts` are procedural stand-ins built from published product
   categories — they are **not CAD** and their proportions are indicative.
6. **Alt text is unwritten.** It arrives with the photography. It is a
   requirement, not a nicety.
7. **Only RTG can supply**: written permission to name each client; certificate
   numbers and expiry dates; insurance limits; refurbishment lead times by scope
   band; current capacity by tier; the tariff and origin position confirmed with
   a customs adviser; overall envelope and dry weight per configuration.
8. **Fonts load from Google.** Self-host before launch — performance cost and a
   GDPR question in the EU.
9. **The 301 map** from the legacy `.php` URLs must be deployed and verified with
   a crawl before and after launch.

---

## 6. What must never be published

This is a commercial constraint, not a style preference. `npm run audit:protection`
enforces it and **fails the build**.

- **No dimensioned general arrangement drawings.** Ever, anywhere public. They
  are issued only to a named recipient against a named project, watermarked and
  rasterised.
- **No internal drum proportions** — drum core diameter, drum length, flange
  diameter. Publish performance figures and an overall bounding envelope instead.
  *Publish the box, not the arrangement inside it.*
- **No component makes or part numbers** — slip ring models, gearmotor
  manufacturers, welding machine models. Use generic descriptions.
- A technical drawing generally attracts copyright in its own right, and a
  derived drawing can infringe. This matters commercially as well as legally.

---

## 7. Design system

Palette taken from the live RTG stylesheet. Roughly **70% white, 25% navy, 5% red**.

| Token | Value | Use |
|---|---|---|
| `--navy` | `#031d5b` | All headings and body type; full-bleed inverted sections. |
| `--red` | `#AB3241` | Accent only: one word in a headline, primary buttons, mono labels, bullets. |
| `--white` | `#FFFFFF` | The dominant canvas. |
| `--off` | `#F5F6F8` | Alternating section backgrounds. |
| `--line` | `#DFE3EA` | Hairline borders. |
| `--muted` | `#5A6478` | Body text on white. |

- **Type**: Archivo 800 for display (letter-spacing −3.5%, line-height 1.06 — it
  was 0.92, which is tight enough that a descender nearly touches the cap of
  the line below on any two-line heading),
  Inter for body, JetBrains Mono for small technical labels. Sentence case,
  never all-caps headings.
- **No gradients, no drop shadows on cards, no stock-photo collages.** Cards use
  1px hairline borders and 16px radius. Buttons are fully rounded pills.
- **Never navy text on navy.** Never red for long runs of body text.
- Masked line reveals (`.rl`) need `padding-bottom` inside the mask or descenders
  clip — this is already handled in `tokens.css`, do not remove it.
- Target **WCAG 2.2 AA**. One `h1` per page, skip link, visible focus, full
  keyboard operation, `prefers-reduced-motion` honoured.

### 3D

`src/lib/rtg3d.ts` builds four machines procedurally: traction winch, A-frame
LARS, hydraulic power unit and deck crane. `buildCrane({ rig: true })` returns a
crane with a live hoist whose hook can carry a DOM payload.

- Always lazily import. Never on the critical path.
- Always gate rendering on visibility — `createViewer()` exposes a `visible`
  flag; `home-scroll.ts` layers its own `onScreen` field on top of that per
  stage, driven by an `IntersectionObserver`. Only render while on screen.
- Honour `prefers-reduced-motion`.
- When real CAD becomes available, export decimated GLB with all internal
  geometry stripped (which also satisfies §6) and swap it in; the scene, lighting
  and scroll wiring stay as they are.

---

## 8. Tone of voice

Write the way the buyer talks, not the way a brochure does.

- Concrete over abstract. "Rebuilt for around a third of replacement cost, in
  eleven weeks" persuades; "delivered a successful refurbishment" does not.
- Where a figure is commercially sensitive, give a ratio or a time instead.
- Lead with the buyer's problem, not RTG's capability.
- No exclamation marks. No "cutting-edge", "world-class", "state-of-the-art",
  "seamless", "leverage", "solutions provider".
- British English throughout: "recognised", "metre", "programme", "tonne".
- Never claim a certification, approval, client name or figure that is not
  confirmed in `research/`. If it is unconfirmed, mark it and flag it.

---

## 9. Bringing in a content drop (photography, copy, specs)

RTG periodically hands over a folder of real material — camera photography,
docx write-ups, datasheet PDFs, sometimes video — organised by sector or
equipment family rather than by page id. This section is the fixed workflow
for turning that into page content, and §9.3 is the current intake.

### 9.1 How the site actually takes real content

Three content types, three fixed destinations. None of them need a template
change — every template already renders real content the moment it exists
and falls back to an honest placeholder until then.

**Body copy.** Every page's `<Gap>...</Gap>` marker in its `.mdx` (see
`src/components/blocks/Gap.astro`) states in plain English exactly what is
missing there — run `grep -rn "<Gap>" src/content/pages` to list them all.
RTG's own docx write-ups already use the same convention (`RTG TO SUPPLY:
...`, sometimes literally marked `<span class="gap">`), so treat each docx
as a drop-in draft for the block it names: adapt it to the page's existing
voice (§8) and structure (its `blocks` list in `src/data/pages.ts`), replace
the `<Gap>` with the real prose, and leave any part the docx doesn't cover
as a `<Gap>` still. Never delete a `<Gap>` without replacing it with the
thing it asked for.

**Photography.** Import the chosen file into `src/assets/<section>/` and
register it in `src/data/media.ts` under a ref matching what the page
frontmatter already asks for — sector pages use `IMG-<PAGE-ID>-<letter>`
(e.g. `IMG-S03-B`), a convention introduced after the original workbook's
generic `IMG-NN` numbering (§9.2 Image Brief) and now the pattern to follow
for new pages. `ImageSlot.astro` looks the ref up in `MEDIA` — a hit
renders the real photo, a miss keeps the drawing-sheet placeholder, so
adding the entry is the only step; no page or template edit. Before
registering anything, check it's actually RTG's own: `media.ts`'s file
header already documents which supplied images read as third-party
press/stock and are deliberately excluded pending a reverse-image-search
before launch — apply the same test to anything new, and never include a
recognisable vessel or client name in the alt text / brief without the
written permission §5.7 and §8 already require.

**Specs and datasheets.** A docx spec table (e.g. a "Specification Table" or
numbered datasheet like `DS57`) is the source for the `specs` rows in that
page's frontmatter — use it to replace `TO SUPPLY` placeholders
(`grep -rn "TO SUPPLY" src/content/pages`) with real, publishable figures:
working load limit, line speed, envelope, weight, supply requirements. Pull
only what §6 allows onto a public page — never drum core diameter, drum
length or flange diameter, never a part number or make. The PDFs themselves
are not published anywhere yet: gated datasheet delivery (§5.3) doesn't
exist, so they stay out of `public/` and are only ever the source for the
figures above, not a static file to link to.

### 9.2 Steps, per page

1. Find the page id(s) the folder maps to — §9.3 for the current drop, or
   `pagesByTemplate()` / `src/data/pages.ts` generally.
2. Open that page's `.mdx`, read its `<Gap>` markers and its `blocks` list
   in `pages.ts` — that is the outline the new copy has to fill.
3. Draft the body against that outline from the supplied docx, closing every
   `<Gap>` the material actually answers.
4. Pick the photography, import and register it, matching or introducing
   the `IMG-<PAGE-ID>-<letter>` refs the frontmatter needs.
5. Pull real figures from the datasheet into `specs`, clearing the
   `TO SUPPLY` rows that are now answered.
6. `npm run build && npm run audit` — the Definition of Done in §2 still
   applies to a content-only change.
7. Route through `/feature-dev` (§2 Step 2) only if the page needs a
   structural change (new block type, new template). A straight content
   backfill into an already-built template doesn't need the full 7-phase
   workflow, but still gets a final read-through against §6 and §8 before
   it's called done.

### 9.3 Current intake — folder received 2026-09-18

Source: `Claude website/` (Sectors, Equipment, plus a duplicate
`RTG_Website_Page_Map.xlsx` — checked cell-for-cell identical to
`research/RTG_Website_Page_Map.xlsx`, so it changes nothing and needs no
`npm run pagemap` run).

**Sectors** — text and hero/media photography already exist for all seven
sector pages (`IMG-S0X-*` registered in `media.ts`); this drop mostly
confirms or extends that rather than starting from nothing.

| Folder | Page(s) | Already there | This drop adds | Still open |
|---|---|---|---|---|
| `Sectors/Intro.docx` | S-00 | Full body, no `<Gap>` | Cross-check only | — |
| `Sectors/Ocean survey&Hydrography/` | S-01 | Full body + 3 photos wired | Matching docx set (CTAs, proof, technical note) — spot-check against current copy | — |
| `Sectors/Marine Geotechnical/` | S-02 | Full body + 3 photos wired | Nothing new for the open gap | `<Gap>`: operator/vessel/year for the 3,000 m depth record — needs RTG's direct, clearance-checked answer, not in this folder |
| `Sectors/Ofshore wind subsea cables/` | S-03 | Draft; hero/media wired | **"The problem of the sector in buyer's words.docx" directly closes the open `<Gap>`** (verified — matches almost word for word); `Cable handling`, `Lead times`, `Self-contained skids`, `Site Investigation` docx cover the rest of the page's blocks | The two images in this folder (`Exsto-illustration…`, `Renewable-with-DBM…`) are third-party stock, not RTG's — don't register them; still needs real RTG photography |
| `Sectors/Seismic/` | S-04 | Full body + 5 photos wired | Extra photography (7 files) — spare/replacement stock only, no open gap to close | — |
| `Sectors/Oceanographic Research/` | S-05 | Draft; hero/media wired | No direct "buyer's words" docx here — `Why the winch is part of the instrument`, `The range`, `Slow speed control`, `Institutions served` are source material to draft the `<Gap>` from, not a drop-in | Still needs drafting, not just pasting |
| `Sectors/Subsea, ROV & Diving/` | S-06 | Full body + 3 photos wired | — | — |
| `Sectors/Defence & Government/` | S-07 | Draft; 1 photo wired | **"Traceability and documentation.docx" directly closes the open `<Gap>`** (verified match); `Class`, `Programme requirements`, `Security of supply` docx cover the rest; 2 unused real defence-vessel photos available | Extra care on what's shown/named — defence sector, §5.7 permission rule applies in full |

**Equipment** — the hub and most product pages are still bare stubs
(`draft: true`, frontmatter only, no body). This is where most of the new
work is.

| Folder | Page(s) | Already there | This drop adds | Still open |
|---|---|---|---|---|
| `Equipment/Section introduction.docx`, `Range tiles-Main .docx` | E-00 | 8-line stub, `draft: true` | Both docx map straight onto this page — the range-tiles doc already lists the same six families/URLs as the site nav. Cleanest, lowest-risk page to close first | — |
| `Equipment/Winches/` (top level) | E-01 | Full body, not draft | — | — |
| `Equipment/Winches/Geotechnical Coring/` | E-02 | Full body + specs, but hero/media still uses unregistered generic refs (`IMG-05`, `IMG-07`); 2 `TO SUPPLY` spec rows | 11 real photos + 3 datasheets (`DS01`, `DS38`, `DS61`) — enough to register real `IMG-E02-*` photography and fill the envelope/weight specs | — |
| `Equipment/Winches/Survey Oceanographic/` | E-03 | 4-line stub, `draft: true` | `Applications.docx` + 1 datasheet (`DS83`) + 3 photos | Needs a full page draft, not just a media/spec fix |
| `Equipment/Winches/Seismic/` | E-04 | 4-line stub, `draft: true` | 1 datasheet (`DS11`) + 7 photos, no copy docx | Needs drafting — cross-reference S-04's sector copy, no dedicated Equipment write-up supplied |
| `Equipment/Winches/ROV Tow Umbilical/` | E-05 | 4-line stub, `draft: true` | 1 datasheet (`DS63`) + 2 photos, no copy docx | Needs drafting |
| `Equipment/Winches/Mooring Utility/` | E-06 | 4-line stub, `draft: true` | 2 datasheets (`DS74`, `DS80`) + 7 photos, no copy docx | Needs drafting |
| `Equipment/Launch & Recovery Systems/` | E-07 | 4-line stub, `draft: true` | **Folder is empty** | Nothing supplied yet — flag to RTG |
| `Equipment/Cranes & Lifting/` | E-08 | Frontmatter only (`pageId` + `draft: true`), the barest page on the site | `Applications`, `Class and proof load`, `Range` docx (all verified, publication-ready) + 2 datasheets (`DS33`, `DS96`) + 9 photos. The `Range.docx` itself carries its own `RTG TO SUPPLY` marker for capacity/reach ranges per crane family — carry that through as this page's `<Gap>` rather than guessing figures | Build this page from scratch off these three docx |
| `Equipment/Handling Systems/` (hub level) | E-09 | Frontmatter only, `draft: true` | No hub-level docx supplied | Needs drafting |
| `Equipment/Handling Systems/Cable pipe tensioners/` | E-10 | 4-line stub, `draft: true` | `Applications`, `Failsafe braking`, `Squeeze vs line tension explained` docx + a `Specification Table.docx` (verified — a complete numbered 10 Te datasheet, ready to drop into `specs` almost as-is) + 2 photos + 1 large datasheet docx (`DS57`, has embedded diagrams — extract text only, don't reuse the diagrams per §6) | Build this page from scratch |
| `Equipment/Power Units/` | E-11 | 4-line stub, `draft: true` | **Folder is empty** | Nothing supplied yet |
| `Equipment/Portable & Containerised/` | E-12 | 4-line stub, `draft: true` | **Folder is empty** | Nothing supplied yet |
| `Equipment/1003040004.JPG` (loose, top level) | — | — | One unsorted general equipment photo | Needs a look before it's assigned anywhere |

**Datasheet PDFs generally** (11 across the folders above: `DS33`, `DS96`,
`DS57`, `DS74`, `DS80`, `DS63`, `DS11`, `DS83`, `DS01`, `DS61`, `DS38`) —
each is the source for the numeric rows on its product page's `specs`
table, never a file to publish directly (§5.3, §6).

**Video** — `Sectors/Marine Geotechnical/RTG_traction_winch_refurbishment
(1).mp4` is a candidate for L-01's refurbishment content and/or P-06's open
`<Gap>` asking for a 60–90 s load-test clip — watch it first to see which
it actually is before assigning it; it isn't an automatic fit for either.

Delete a row from this table once its page is built and closes the gap it
names, so this section stays a live to-do rather than a permanent record.

## graphify

This project has a knowledge graph at graphify-out/ with god nodes, community structure, and cross-file relationships.

Rules:
- For codebase questions, first run `graphify query "<question>"` when graphify-out/graph.json exists. Use `graphify path "<A>" "<B>"` for relationships and `graphify explain "<concept>"` for focused concepts. These return a scoped subgraph, usually much smaller than GRAPH_REPORT.md or raw grep output.
- If graphify-out/wiki/index.md exists, use it for broad navigation instead of raw source browsing.
- Read graphify-out/GRAPH_REPORT.md only for broad architecture review or when query/path/explain do not surface enough context.
- After modifying code, run `graphify update .` to keep the graph current (AST-only, no API cost).
