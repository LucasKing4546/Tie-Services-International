# Handoff: audit fixes and homepage redesign, state at 2026-11-04

Read this first in a new chat. It picks up the full-site audit from
2026-10-29, the fixes made against it on 2026-11-03, and the homepage
redesign of 2026-11-04 (3D removed).

## Where things are

- **The audit:** `docs/audit-2026-10-29/COMBINED.md` is the ranked list (A = needs
  RTG or the site owner, B = fixable in code). The per-section reports next to it
  have file:line detail. `BRIEF.md` is what the 12 review agents were told.
  Line numbers in the reports are from commit `7e032005` and have drifted.
- **Branch:** `main`. Everything after `7e032005` (the commits below plus this
  handoff) is local and **not pushed**. Push only when the user asks.
- **Build:** `npm run build` passes, 0 SEO failures (53 warnings, all meta
  description length, pre-existing), 0 content-protection violations.
  `npx astro check`: 0 errors.

## Done on 2026-11-03

| Commit | Audit items |
|---|---|
| `de222219` | **B1, B2, part of B15.** Forms: inline errors with `aria-invalid` and `aria-describedby`, focus on the first error, a "not connected yet, nothing sent" status instead of a 404, honeypot dropped silently, `autocomplete` tokens, ~4:1 input borders, per-form `next` steps (datasheet steps only on R-01), top-aligned columns, form first on a phone. New `file` field type. C-09 and X-04 now have forms (still `draft: true`, with Gap markers). |
| `b08045e3` | **B3, B4, B5, B7, B8, B9, B11.** Real figures in the HTML (count-up zeroes them only when animating). Mobile menu button white on red. Header uses the mist colour. Breadcrumbs on a dark chip over photos. MediaBand captions under the photo, no hover zoom. `Prose class="lists"` wraps each h2 group in `.lgrp` so it never splits across columns, and one group stays one column. P-03 placeholder briefs apart. |
| `6e3b47ba` | **B12, B13, B14, B18.** Hoist payout capped inside the hero, still under reduced motion. Empty hero placeholder `aria-hidden`. Accessibility statement no longer mentions pinned sections. Share image: `public/assets/og/default.jpg` (1200x630, logo on sky) until `public/assets/og/<id>.jpg` exists for a page. |
| `903096c4` | **B10.** Family design lists show a figure column only when at least half the designs have it; stray figures move to the tag line. Phone figure labels visually hidden, still read aloud. |
| `18e7f63f` | **B6.** Closing band removed where it only repeated the hero buttons (the user's choice). `endingCta` deleted; a page that sets its own `cta` still gets a band. None do today. |

## Done on 2026-11-04: 3D removed, homepage redesigned

| Commit | What |
|---|---|
| `91329c4a` | 3D gone: `rtg3d.ts`, `home-scroll.ts`, the showroom, the tier winch canvas, the `three` dependency, the z-04 known issue, CLAUDE.md's 3D sections. |
| `e33e935f` | **Homepage hangs off the hoist line** (the user's pick from three structures). The hoist pays out down to the hero's bottom; below it one still line carries on at the hoist's exact x (right side), every section's top rule runs across to it, and the load rests on the footer crest beside "Service life support". On phones the line sits in the right gutter. Folds in **B24**: one h2 size, finder inside Equipment, compact rows, sector rail stops short of the line, tier points beside the lede, phone tabs 2x2. |
| `e079a49c` | Drawn arrow and chevrons (`src/components/site/Icon.astro`) replace every → ‹ › on the site. |

Rules the user set for this work: **existing site text is kept word for
word** (only the 3D showroom text went); no route "doors"; testimonials,
featured case and bulletin sign-up stay off the homepage until RTG supplies
them (a Gap marker would noindex it). The deviation from the page map's H-01
blocks is recorded in `src/pages/index.astro`'s doc comment.

The direction contract is in `.impeccable/surfaces/src-pages-index-astro.md`.
impeccable's finish review ended **ship**. DESIGN.md is written from the
built site by impeccable's documenter. One non-material note stays open: on
a phone the spine has no visible link to the hoist (accepted).

## Still to do in code (B items, medium)

- **B15 rest:** form layout is fixed; nothing else outstanding there.
- **B16:** breadcrumbs and JSON-LD show workbook names ("Sectors hub", "Case studies index", "CS-02 ..."). Hub heading "Everything in X", card links "Read about X →".
- **B17:** card rails have 390/430 px min-heights leaving ~200 px empty; ScrollTrack and Carousel buttons differ.
- **B19:** cookie table unreadable at 390 px; its scroller is not keyboard reachable.
- **B20:** Proof hub opens on an empty draft card (Y-04); blank space on Y-04 and R-02; R-04 linked from nowhere.
- **B21:** tablet header CTA centred; mobile menu doesn't close when focus leaves it.
- **B22:** heading levels (draft panel h3 after h1, footer h3s with no h2, StepList h3s, Legal "On this page" h3); `lang="en"` should be `en-GB`.
- **B23:** design-system drift (21 radius values, ~12 focus-ring overrides, `.stats` defined three times, dead rules); the glyph arrows part is done (`Icon.astro`).
- **B25:** finder: no "Clear filters", placeholder 2.8:1, collapsed mobile filters hide the active count, exact DS match not ranked first.
- **B26:** spec tables styled by three conflicting stylesheets; units orphan on mobile.
- **B27:** sticky datasheet pill covers table rows; 22 px tap targets (`.arw`, finder links).
- **New, from DESIGN.md (2026-11-04), fix first:** the global focus ring (`tokens.css:84`, 3px `--red`) is about 2.3:1 on `--sea-1` and 1.3:1 on `--sea-0`, failing WCAG 1.4.11 (3:1). Under water it should be `--ink` (white), which most component overrides already use. DESIGN.md also lists where the code and CLAUDE.md §7 disagree (card radius 20 vs 16 px, `.fu`/`.stag` entrance motion, the hover set, mono uppercase footer headings); decide which wins.
- **Not in the audit:** Y-04 (vendor pack) and R-02 (catalogues) are Form-template pages with no form.
- **Low items** (copy polish, units, stale comments, figures hard-coded instead of from `PROOF`) are in each section report.

## Do not touch without RTG / the owner (A items)

The user said not to change anything that has to be cleared with RTG. That
covers every A item in `COMBINED.md`: the third-party images (A1-A3), the
sustainability writer's notes (A4), Y-03 approvals (A5), "Lebus" (A6),
conflicting figures and "reply within one working day" (A7), the datasheet
workbook (A8), missing workbook blocks (A9), sector page openings (A10) and
copy that promises things that don't exist (A11). Keep or add Gap markers
for these; don't write around them.

## How the fixes were checked

- The Chrome extension was not connected. Playwright is not a project
  dependency; a cached copy is at
  `C:/Users/lucas/AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules/playwright`
  and `require()` of that path works with the installed Chromium.
- Serve the build with `npx astro preview --port 4329`.
- Block OneTrust in any script (`page.route(/cookielaw|onetrust/, r => r.abort())`),
  or its banner covers the page.
- `docs/audit-2026-10-29/forms-check.cjs` is the form regression check
  (empty submit, error clearing, no-backend notice, honeypot, C-09 upload,
  "what happens next", phone order). Run it with `node` against the preview.

## Open points for the user

- Commit messages: project memory asks for type prefixes (`feature:`, `fix:`,
  `content:`) and small commits. The six commits above use area prefixes
  (`forms:`, `site:`, `equipment:`), and `b08045e3` bundles seven fixes. They
  are unpushed, so they can be reworded or split before pushing if wanted.
- The share card is an upscale of the only logo file (`public/logo-rtg.png`,
  378 px). A vector logo would make it sharp.
