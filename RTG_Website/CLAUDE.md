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
| `About` | 4 | To do | Company, people & facility, QHSE, sustainability. |
| `Legal` | 4 | To do | Privacy, cookies, terms, accessibility. Needs legal review. |
| `Contact` | 2 | To do | Contact and agents. |
| `Ladder` | 1 | **Done** | Contract-manufacturing hub — the scope ladder. |
| `Guide` | 1 | **Done** | "Refurbish, upgrade or replace?" decision guide. |
| `Policy` | 1 | **Done** | "Your IP, protected". Commercially important. |
| `Article` | 1 | To do | EU-origin fabrication. `Article` schema. |
| `Careers` | 1 | To do | |

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

- **Type**: Archivo 800 for display (letter-spacing −3.5%, line-height 0.92),
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
