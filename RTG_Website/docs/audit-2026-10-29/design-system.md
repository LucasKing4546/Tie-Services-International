# Design-system audit: shared tokens, CSS, header/footer, blocks, type

Scope: src/styles/*, src/components/site/*, src/components/blocks/* (shared), src/lib/motion.ts.
Sample pages: `/`, `/equipment/`, `/sectors/seismic/`, `/contract-manufacturing/`, `/proof/case-studies/traction-winch-refurbishment/`, `/contact/`, `/privacy/`.
Evidence: screenshots in `scratchpad/audit/design-system/` (full-page `*-desktop.png` / `*-mobile.png`, plus detail shots `x-*.png`). Scripts: `scratchpad/pw/ds-detail.mjs`, `ds2.mjs`, `ds3.mjs`, `orphans.mjs`.

## Baseline (passes)
- `npm run check`: 0 errors, 0 warnings, 5 hints. None are new today: unused `eyebrow` and `updated` props in PageHero.astro:26, unused `clamp`/`ease`/`smooth` in home-scroll.ts:96/97/253, and the implicit `is:inline` on Base.astro:106. Today's commit only touched `data-zone` in PageHero.
- Every sample page: one h1, matching the workbook. No horizontal overflow at 390 or 1440, no images without alt, no console errors. The 2 "empty links" per page are the header and footer logo links (img alt "Romica Tie Group"), which is a false positive.
- Skip link works: it is the first Tab stop, targets `#main`, and the `<main id="main">` exists.
- Escape closes the mobile menu and returns focus to the toggle. The menu also closes on click-away and on navigation.
- Old blues: none left (#17409a, #010a24, rgba(1,10,36…), rgba(2,14,44…), rgba(3,29,91…) all absent). The only old cool value is the header bar (H2).
- Reduced motion: reveals resolve, the wave stops, hero parallax is not attached (motion.ts gates it on `!rm`) and the counters jump to their final value.
- z-index stays sane: header 400, skip 500, everything else between -3 and 3.

## Critical
None.

## High
**H1. Mobile/tablet menu CTA has navy text on a red pill (2.45:1, fails WCAG 1.4.3).** Affects every page at ≤1080px. `.mnav-panel a{color:var(--ink)}` (tokens.css:214, specificity 0,1,1) beats `.b-red{color:#fff}` (tokens.css:117). Inside `.hdr`, `--ink` is navy. The desktop nav has its own override (`.nav .btn.b-red`, tokens.css:189) and the panel has none. Evidence: x-m-menu.png. Fix: add `.mnav-panel .btn.b-red{color:#fff}`, or scope the link colour as `.mnav-panel a:not(.btn)`.

**H2. The header bar is the old cool off-white `rgba(238,242,250,.9)` (#EEF2FA), not the new mist.** tokens.css:170. On the homepage it meets the `--sky #DCE7EA` hero along a hard, visible two-tone seam at y≈100 (x-hdr-top-home.png, x-rm-home.png). On inner pages it sits over a 132px sky band in a different tint (x-hdr-top-privacy.png). It is the last colour that is not on the new ramp. Fix: `background:color-mix(in srgb,var(--sky) 92%,transparent)` and drop the border on `.above` pages, or use `--sky` outright.

**H3. ProofBar figures ship as "0" in the HTML.** ProofBar.astro:31 renders `<span class="ct" data-to=…>0</span>`. The real number only appears after JS and an IntersectionObserver hit. With no JS, in reader mode, in link-preview scrapers and for any non-rendering crawler, every page claims "0 Machines delivered". Screen readers can also catch the value mid-count. This contradicts motion.ts's own promise that "nothing here can make visible content permanently invisible", and affects every page that shows the proof band (about 40). Fix: render the final value server-side and have `initCounters` reset it to 0 only when it starts animating.

**H4. Every closing CTA band is headless.** All 40 pages with `.cta` render just two buttons, with no heading or body. `endingCta()` (src/lib/blocks.ts:92) falls back to the hero CTAs with no heading, and CtaBand.astro:17 then drops the text block. The result is a lone pair of pills floating in ~190px of padding, repeating the hero buttons word for word (contract-manufacturing-desktop.png, sectors_seismic-desktop.png). With the header CTA that makes three identical "Talk to an engineer" buttons on one page. It is the weakest moment on the page, and it is where the page should convert. Fix: give `endingCta` a default heading (e.g. "Tell us the duty" plus one line), or fold the buttons into the ProofBar section and drop the extra band.

## Medium
**M1. Tablet header (561–1080px): the CTA floats in the middle.** `.hdr-in{justify-content:space-between}` with three children (logo, `.nav` holding only the CTA, the menu button) puts the CTA in the centre of the bar (x-hdr-820.png). Fix: `.nav{margin-left:auto}` below 1080px.

**M2. The open mobile menu doesn't follow focus.** Tabbing past the last panel link moves focus to the breadcrumb and hero links underneath, while the panel stays open over them (2.4.11 Focus Not Obscured). Header.astro:62–78 has no `focusout` handler. Fix: close on `focusout` when `relatedTarget` is outside `#mnav`.

**M3. Form validation states are invisible under water.** The invalid border is red on `--sea-1` (2.29:1) and the valid border is #1E7A4F (2.77:1), both under the 3:1 non-text minimum (parts-site.css:87–88). The "error" label colour is `var(--accent)`, which is white under water, the same as the normal label (parts-site.css:90). So the only error signal is a faint border. The default input border `--rule` is about 1.5:1, so the field edge also fails 1.4.11. Fix: use a light error tone such as #FF8A95, add an error icon or text, and raise the input border alpha to about .45.

**M4. Two focus-ring systems are fighting.** tokens.css:84 sets a 3px red ring globally, surfaces.css:6 replaces it with 2px `--ink`, and then about 12 component rules re-set it at 2px or 3px in white or ink (layout.css:100, parts-sections.css:54/93/107/123, parts-site.css:48/86, home.css:124/191, blocks.css:405/720/773). blocks.css:617 still sets a red outline on `.field:focus`, which parts-site.css:84 then removes. The rings that result are fine (white or navy), but the system isn't. Fix: delete tokens.css:84 and blocks.css:617, keep one `:focus-visible` token (3px `--ink`), and drop the per-component copies that only repeat it.

**M5. The §7 display line-height of 1.06 and the −3.5% tracking are overridden on most headings.** The base is right (tokens.css:93), but section heads use `.sechd .d2/.d3` at line-height 1.02 and −.04em (layout.css:15), and the same goes for `.frow-copy h2` (layout.css:35), `.cta .d3` (layout.css:71), `.irows-title` 1.05 (parts-sections.css:41) and `.case h2` 1.04 (parts-sections.css:87). `.phero h1` sets −.04em (layout.css:81) and re-declares the `--d-hero` clamp. Across the CSS there are 13 different negative letter-spacing values. Fix: remove those line-height and letter-spacing overrides so the global 1.06/−.035em applies. Keep 1.0 only on single-line numerals (`.stat b`, `.lc-n`).

**M6. Scattered hover motion, which §7 bans.** Global `.btn:hover{translateY(-2px)}` (tokens.css:116), `.strack .ecard:hover` going to a red fill plus `translateY(-8px)` (layout.css:97), `.faq > div:hover` lift plus a red badge (parts-site.css:125–126), `.car-btn:hover` lift (parts-sections.css:122), footer links `translateX(4px)` (parts-site.css:46), the logo lift (parts-site.css:7), the mobile-menu arrow nudge (parts-site.css:27) and `.arw` gap growth (tokens.css:131). Fix: keep colour or border changes only, and delete the transforms.

**M7. ScrollTrack and Carousel do one job with two looks.** Buttons: `.strack-btn` is 44px with a .28 white ring, transparent, and a red hover (blocks.css:356–361). `.car-btn` is 52px, `--panel-2` filled with an `--ink` ring and a red hover plus lift (parts-sections.css:120–124). Cards: `.strack .ecard` is rgba(.06) and flips to solid red on hover (layout.css:94–97), while `.car .ecard` uses `--panel` (parts-sections.css:101). On contact-mobile.png the disabled `.car-btn` at opacity .32 is barely visible. Fix: one rail-button style and one card style for both.

**M8. Card radius is off-scale.** §7 says cards use 16px. In use: 20px (`.imgslot`, `.mband-item`, `.strack .ecard`, `.car .ecard`, `.frow-plate`, `.lc-band`, the footer blurb card, `.form-next`), 22px (`.form`, `.quote`, `.mnav-panel`), 24px (`.tier-card`, `.cta`), 18px (`.irows-list a::before`, blocks.css:266, the tokens mnav panel), plus 12px and 14px. That is 21 distinct radius values. Fix: `--r-card:16px` and `--r-inner:12px`, with pills at 100px, and nothing else.

**M9. MediaBand renders a ragged row, and its captions cover the photos.** On `/sectors/seismic/` the four mixed-ratio tiles align to the top, leaving about 250px of dead water under the two landscape tiles (x-seismic-mband.png). The caption plates sit over the photos with a backdrop blur (parts-sections.css:20–24) and cover 30–45% of the landscape shots. That is a frosted surface, which goes against §7's "minimal surfaces". Fix: put the caption under the photo, and either give the row a common height with `object-fit:cover` or use a 2-up grid.

**M10. Hero parallax on every inner page goes beyond the §7 motion budget.** PageHero.astro:35 puts `data-motion="parallax"` on the hero photo (blocks.css:628–634). §7 lists three motion pieces (waves, vessel, hoist) and allows masked reveals as the only entrance motion. Sticky media (`.frow-media` blocks.css:118, `[data-motion="sticky"]` blocks.css:639, `.form-side` parts-site.css:115) also cuts against today's "nothing pins". Fix: drop the parallax attribute. The owner should decide whether sticky media counts as pinning.

**M11. The CSS is a stack of override layers.** tokens → blocks → surfaces → layout → parts-site → parts-content, each "loaded last; overrides by specificity". `.stats` is defined three times (blocks.css ~279, layout.css:58–82, then again at layout.css:108–132, with `border-top:0` undoing the line it set earlier). `.sec` padding is 112px in blocks.css:10 and a clamp in layout.css:5. `.ftr` padding is set in tokens.css:232 and again in parts-site.css:34. `.mnav-panel` radius and padding are set in both tokens.css:211 and parts-site.css:24. This is why H1 and M4 happened. Fix: fold each component's final values into one place, one block per file.

## Low
**L1. Dead and orphaned CSS left by today's removals:**
- Empty rules: `.hdr .nav .btn:hover{}`, `.hdr .nav .btn:active{}`, `.mnav-btn:hover{}`, `.form > .btn:hover{}` (parts-site.css:17,18,20,101); `.zf .btn.b-red{}` (home.css:163); `.tier-card .imgslot,.cmp-frame .imgslot{}`, `.case > .imgslot{}`, `.sec.off .imgslot-shot{}` (parts-sections.css). Stray `;}` and blank lines also remain where shadows were stripped (parts-site.css:12,14,85,89,100; layout.css:96).
- Classes no longer in any markup: `.eq-track` (blocks.css:330–331, home.css:152–153), `.lc-band` (blocks.css:454–460, parts-sections.css:138), `.case-vis` and `.lc-ph` (home.css:166–167), `.tier-eyebrow` (ocean.css:56).
- Unused token: `--off-2`.
- Stale comments: blocks.css:5 ("marquee, pinned tiers, horizontal track"); parts-site.css:2 ("Shadows are navy-tinted, two layers"); ocean.css:4 ("from the surface navy"); home.css:98/175 ("pinned tiers") and the class names `.pin-grid`, `.pin-vis`, `.pin-bar`, `.pin-copy` for what are now tabs.

**L2. Eyebrows are rendered and then hidden.** ocean.css:56 `display:none`s `.sechd > .mono`, `.frow-copy > .mono` and `.strack-head .mono`. The markup still ships them. Remove them in the components instead.

**L3. Hard-coded sea colours.** rgba(6,21,32,…) and rgba(13,43,59,…) appear about 20 times (blocks.css:75–76/488, layout.css:85–86/135, parts-sections.css:22/72, home.css:146, parts-content.css:119), along with inline `rgba(255,255,255,.72)` in CtaBand.astro:19/26 and `style="color:#fff"` in Case.astro:67. Use `color-mix(in srgb,var(--sea-2) N%,transparent)`.

**L4. Footer:**
- Column titles are `<h3>` with no `<h2>` above them, so they nest under the page's last section in the outline (Footer.astro:23). Use `<h2>` styled the same, or `<p>`.
- Bottom padding is 84px, or 76px on mobile, below the legal row (parts-site.css:34/53). That is dead navy space on a "compact" site.
- The jagged seabed in saturated logo navy is lighter and bluer than the `--sea-2` abyss above it, so the descent ends by brightening. It was an owner decision, noted only because it reads as a hue clash with the teal ramp (sectors_seismic-desktop.png).

**L5. Proof-band suffix spacing.** "250 +" and "150 Te" render with a gap and the `.u` suffix at a different size (contract-manufacturing-desktop.png), while the label below reads "50+ clients". Tighten `.stat b .u` or drop the space.

**L6. Breadcrumbs show workbook names.** "SECTORS HUB" and "CONTRACT MANUFACTURING HUB" come from `item.name` (Breadcrumbs.astro:20). The crumbs are also 11px uppercase mono, which is small for a navigation aid.

**L7. Decorative dot in the homepage hero button** ("Find your sector •", `.btn .dot` tokens.css:127). It carries no meaning.

**L8. Small tap targets.** `.arw` links are 22px tall (home "Clients and references", "Contract manufacturing"), and inline prose links on `/privacy/` are 21px. That is under the 24px of 2.5.8 unless the spacing exception applies.

**L9. Header scroll class uses a raw `scroll` listener.** Header.astro:41. It is passive and cheap, but an IntersectionObserver on a sentinel would match the rest of motion.ts.

## Gaps present (intentional, not bugs)
- `/sectors/seismic/`: Duty rating "RTG to supply" (1).
- `/contact/`: named contact, phone and email per office (1).
- `/proof/case-studies/traction-winch-refurbishment/`: 5 markers.
- `/privacy/`: 5 markers, and the page is draft.

They render as monospace pills with a red dot. They read as deliberate and are not broken.

## Scores (impeccable audit)
| Dimension | Score | Key finding |
|---|---|---|
| Accessibility | 2 | Mobile CTA contrast 2.45:1; form states under 3:1; focus can leave the open menu |
| Performance | 3 | Fine; parallax adds an extra scroll animation |
| Responsive | 3 | Tablet header CTA centred; ragged MediaBand |
| Theming | 2 | Header off-ramp colour; about 20 literal sea values; 21 radii; 13 tracking values |
| Implementation integrity | 2 | Override layers, empty or dead rules, two carousel looks |
| **Total** | **12/20** | Acceptable: significant clean-up needed |
