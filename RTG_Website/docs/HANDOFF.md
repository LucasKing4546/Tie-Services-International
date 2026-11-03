# Handoff: audit fixes, state at 2026-11-03

Read this first in a new chat. It picks up the full-site audit from
2026-10-29 and the fixes made against it on 2026-11-03.

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

## Next big job: remove the 3D, redesign the homepage layout

**The site owner's decision (2026-11-03): the 3D models are going, so the
homepage needs a whole new layout.** This is a design job, not a deletion:
the homepage's sections were built around the models, and taking them out
leaves the page without its structure. Run it as a new feature (CLAUDE.md
§2: research first, then `/feature-dev`), and ask the user about the
direction before building.

What depends on the 3D today:
- `src/lib/rtg3d.ts`: the four procedural machines (traction winch, A-frame LARS, HPU, deck crane).
- `src/lib/home-scroll.ts`: the tier winch driven by the Tiers tabs, and the equipment showroom.
- `src/components/home/TierLadder.astro` (Tiers tabs + winch) and `src/components/home/MachineLift.astro` (showroom).
- `src/pages/index.astro`, `src/data/home.ts`, `src/styles/home.css`, and a comment in `src/layouts/Base.astro` (the boot script) that names `home-scroll.ts`.
- The `three` dependency in `package.json` can go once nothing imports it.
- `src/content/pages/z-04.mdx`: the "Three-dimensional models" known issue comes out with them.
- CLAUDE.md §1/§3/§7 describe the 3D (stack table, `lib/` map, the "3D" subsection); update them in the same change.

Effects on the rest of this list: **B24 mostly falls away** (model colour,
tier-4 crop, drag-only showroom). Its other points (four h2 sizes on the
homepage, the 990 px Equipment block) feed into the redesign brief. The
hoist line and the vessel in the hero are not 3D (SVG + CSS) and are part of
the §7 motion budget; whether they stay is a question for the redesign.

## Still to do in code (B items, medium)

- **B15 rest:** form layout is fixed; nothing else outstanding there.
- **B16:** breadcrumbs and JSON-LD show workbook names ("Sectors hub", "Case studies index", "CS-02 ..."). Hub heading "Everything in X", card links "Read about X →".
- **B17:** card rails have 390/430 px min-heights leaving ~200 px empty; ScrollTrack and Carousel buttons differ.
- **B19:** cookie table unreadable at 390 px; its scroller is not keyboard reachable.
- **B20:** Proof hub opens on an empty draft card (Y-04); blank space on Y-04 and R-02; R-04 linked from nowhere.
- **B21:** tablet header CTA centred; mobile menu doesn't close when focus leaves it.
- **B22:** heading levels (draft panel h3 after h1, footer h3s with no h2, StepList h3s, Legal "On this page" h3); `lang="en"` should be `en-GB`.
- **B23:** design-system drift (21 radius values, ~12 focus-ring overrides, `.stats` defined three times, dead rules).
- **B24 (superseded by the homepage redesign above):** homepage 3D models royal blue `0x24478C` clash with teal; tier winch crops at tier 4; four h2 sizes; Equipment block ~990 px tall; showroom drag-only (WCAG 2.5.7) with low-contrast 10 px labels.
- **B25:** finder: no "Clear filters", placeholder 2.8:1, collapsed mobile filters hide the active count, exact DS match not ranked first.
- **B26:** spec tables styled by three conflicting stylesheets; units orphan on mobile.
- **B27:** sticky datasheet pill covers table rows; 22 px tap targets (`.arw`, finder links).
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
