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
- Designed in the UK, built and tested in Satu Mare, Romania. A family business in
  deck machinery since 1978; Romica Tie Group itself dates from 2003.
- **Copy source:** `RTG_Website_Copy_Concise.docx` (Draft 1, October 2026) is the
  text for 52 of the 70 pages. Where it contradicts itself on a figure, the lower,
  datasheet-backed value is used: survey 300 to 4,000 m, and "since 1978" rather
  than "50 years".
- **Equipment figures:** `src/data/equipment.ts` is generated from RTG's datasheet
  index workbook (`npm run equipment -- "<path>"`) and feeds the finder on the
  Equipment hub. The workbook holds client names, costs and component makes and
  is never committed. The headline ranges follow it: winches 240 kg to 48 t,
  A-frames 5 to 40 Te (decided by the site owner on 2026-10-13).
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
                          page), home.css (homepage only), ocean.css
                          (the water, waterline, depth gauge, seabed).
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
npm run build      # static build to dist/, then both audits — a failed audit fails the build
npm run strip-exif # remove camera metadata (GPS, device) from photos — run after adding any image
npm run check      # astro + TypeScript diagnostics
npm run pagemap    # regenerate src/data/pages.ts from the workbook
npm run equipment -- "<workbook>"  # regenerate src/data/equipment.ts from the datasheet index
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
| `About` | 4 | **Done** | Company, people & facility, QHSE, sustainability. A-01 and A-02 carry the copy document's text with RTG-to-supply markers; A-03 and A-04 stay draft. |
| `Legal` | 4 | **Done** | Privacy, cookies, terms, accessibility. All four still draft — needs legal review, none have real policy text yet. |
| `Contact` | 2 | **Done** | Contact and agents. Office addresses are published; named contacts, phones, emails and agents are still RTG-to-supply markers. |
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
   not merely declared to be. UK and EU GDPR both apply. The Chatra chat
   script is the only third party and loads only when the visitor presses
   "Chat with us" (`Base.astro`); there is still no general consent banner.
5a. **No security headers.** The host is undecided (not Vercel), so no
   `Content-Security-Policy`, `frame-ancestors` or `X-Content-Type-Options`
   is set anywhere. They have to be configured on whichever host is chosen.
5b. **Unfinished pages are noindexed.** Any page that is `draft: true` or
   still carries a `<Gap>` / `TO SUPPLY` marker gets `noindex` and is left out
   of the sitemap (`Base.astro`, `astro.config.mjs`). It clears itself when
   the page is finished. The pages are still built and reachable by URL.
5. **No photography yet.** Every image is a placeholder. 3D models in
   `lib/rtg3d.ts` are procedural stand-ins built from published product
   categories — they are **not CAD** and their proportions are indicative.
6. **Alt text is unwritten.** It arrives with the photography. It is a
   requirement, not a nicety.
7. **Client names are published as written in the copy document.** Decided by
   the site owner on 2026-10-08, overriding the earlier hold-back rule. The
   document itself still describes names as "subject to written permission", so
   that permission remains RTG's to hold. Names not in the document are still
   not to be added.
7a. **Only RTG can supply**: certificate
   numbers and expiry dates; insurance limits; refurbishment lead times by scope
   band; current capacity by tier; the tariff and origin position confirmed with
   a customs adviser; overall envelope and dry weight per configuration.
8. ~~Fonts load from Google.~~ Done: Archivo, Inter and JetBrains Mono are
   self-hosted through @fontsource packages, imported in `Base.astro`.
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

The site is an ocean descent. The homepage opens above the water (pale sky,
navy type), crosses an animated waterline, and every page then darkens
continuously to the seabed at the footer. A depth gauge on the right edge reads
the descent, from 0 m to `PROOF.cptDepthM`.

**The descent is one background, not per-section colours**: `<main>` carries a
single gradient (`--sea-0` → `--sea-1` → `--sea-2`, `src/styles/ocean.css`) and
every section sits transparent on it. Do not give a section its own opaque
background. `Section`'s `tone="off"` / `tone="navy"` are faint translucent panels.

Palette is the brand navy and red from the live RTG stylesheet, unchanged.

| Token | Value | Use |
|---|---|---|
| `--navy` | `#031d5b` | The water at mid-depth; type above the waterline. |
| `--red` | `#AB3241` | Fills and marks only: primary buttons, rules, bullets, the gauge bob. Never type on navy (about 2.3:1). |
| `--sky` | `#EEF2FA` | Above the waterline: homepage hero and the header bar. |
| `--sea-0` / `--sea-1` / `--sea-2` | `#17409a` / navy / `#010a24` | Surface, mid-water, seabed. `--sea-0` is the lightest ground white type sits on. |
| `--ink`, `--ink-2` | white, white 76% | Text. Always use these, never `--navy` or `--muted`, for type. |
| `--rule`, `--panel`, `--panel-2` | white alphas / dark alpha | Hairlines and faint panels. |
| `--accent` | white under water, red above | Accented type. |

The semantic tokens default to their under-water values. The `.above` class
(homepage hero) and `.hdr` restore the light values, so the same component CSS
works in both. The header stays a light bar on every page because the logo has
no reversed version.

- **Type**: Archivo 800 for display (letter-spacing −3.5%, line-height 1.06 — it
  was 0.92, which is tight enough that a descender nearly touches the cap of
  the line below on any two-line heading),
  Inter for body, JetBrains Mono for small technical labels. Sentence case,
  never all-caps headings.
- **Minimal surfaces: no drop shadows, no textures, no glows, no stock-photo
  collages.** The one gradient is the water itself. Cards use
  1px hairline borders and 16px radius. Buttons are fully rounded pills.
- **Never navy text on navy, never red text on navy.**
- **Motion budget, five pieces:** waves, the vessel arriving, the hoist line, the
  depth gauge, surface light fading with depth. Masked reveals are the only
  entrance motion. Do not add scattered hover effects.
- **Compact.** Pages are meant to be short: one idea per screen. Section padding
  and display sizes were cut for this; do not grow them back.
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
- Never claim a certification, approval or figure that is not in the copy document
  or confirmed in `research/`. If it is unconfirmed, mark it and flag it. Client
  names: only those the copy document lists (§5.7).

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

### 9.3 Current intake

None open. The September 2026 folder (`Claude website/`) was superseded by
`RTG_Website_Copy_Concise.docx` (§1), which replaced the text of 52 pages in
October 2026. What is still missing is marked on each page: run
`grep -rn "<Gap>|TO SUPPLY" src/content/pages` for the live list. The 18 pages
the document does not cover (C-05, C-09, Y-04, P-02, P-04, P-05, R-00 to R-04,
A-03, A-04, X-04, Z-01 to Z-04) keep their earlier text.

## graphify

This project has a knowledge graph at graphify-out/ with god nodes, community structure, and cross-file relationships.

Rules:
- For codebase questions, first run `graphify query "<question>"` when graphify-out/graph.json exists. Use `graphify path "<A>" "<B>"` for relationships and `graphify explain "<concept>"` for focused concepts. These return a scoped subgraph, usually much smaller than GRAPH_REPORT.md or raw grep output.
- If graphify-out/wiki/index.md exists, use it for broad navigation instead of raw source browsing.
- Read graphify-out/GRAPH_REPORT.md only for broad architecture review or when query/path/explain do not surface enough context.
- After modifying code, run `graphify update .` to keep the graph current (AST-only, no API cost).
