# Homepage (H-01, `/`) audit, 2026-10-29

Screenshots are in `scratchpad/audit/home/`. `vp-{d|m|lap}-NN-<section>.png` are viewport shots at 1440×900, 390×844 and 1366×768. `hoist-{d|m}-<scrollY>.png` were taken after the 9 s sail-in had settled. `int-*.png` are interaction shots, `rm-*.png` are reduced-motion shots, `nojs-full.png` has JS disabled, and `zoom-seam*.png` are taken at 2× DPR. The data is in `home-audit.json` and `report.json`.

Scripts: `scratchpad/pw/home-audit.mjs`, `hoist2.mjs`, `seam.mjs`.

## Integrity
- There is one h1, "Custom deck machinery for research, survey and offshore vessels". It matches the workbook exactly.
- No console errors beyond the expected blocked OneTrust request. There are no images without alt and no horizontal overflow at 390.
- The report's two "empty links" are the header and footer logo links. They contain an `<img alt>`, so this is a false positive.
- There are no `<Gap>` or TO SUPPLY markers on the page, and it is not a draft.
- §6: clean. No drum dimensions, part numbers or GA drawings appear. "Lebus" is a groove system and comes from the copy document.
- **Workbook blocks missing.** `pages.ts` H-01 lists these blocks: Hero, three avatar doors, three avatar strips, proof bar, testimonials, featured case study, bulletin sign-up. The CTA is "Three doors (choose your route)".
  - The page has the Hero and a proof bar (the hero figures).
  - The page has no avatar doors or strips (AV01/02/03 routes), no testimonials, no featured case study and no bulletin sign-up.
  - It renders a different outline instead: story, conditions, showroom, sectors, equipment, finder, tiers, service.
  - No divergence note is recorded in `src/pages/index.astro`, although CLAUDE.md §4 says templates record divergences.
- **Heading outline.** The footer's `h3 Buying / Evidence / Company` follow `h2 Service life support` with no h2 of their own. The footer is shared, so this is cross-site.
- **Showroom heading.** The showroom `h3#mName` ("Winches") sits under `h2 Engineered for offshore conditions`. It is acceptable, but the showroom has no h2 of its own.

## Hoist line and hero
1. **The load and the line are clipped by the hero (High).**
   - `.hero{overflow:clip}` (home.css:6) cuts the paying-out line at the bottom of the hero.
   - The line grows by `0.55 × scrollY` (home.css:28). Past about 400 px of scroll at 1440×900, the load (`.hoist-load`) disappears and the line ends in a hard cut mid-water.
   - Measured at scroll 450: hero bottom 587, load at 610–638. At scroll 700: hero bottom 337, line bottom 499.
   - Evidence: `hoist-d-450.png`, `vp-d-hoist-500.png`. The signature motion breaks just as it starts to read.
   - Fix: cap `--sy` so the line plus load ends above `.hero` bottom, or move the hoist out of the clipped box.
2. **The underwater line is hidden by the front wave (Medium).**
   - `.vessel` (with `.hoist`) sits between `.wv-back` and `.wv-mid` (Waterline.astro:111-114). The opaque mid and front waves therefore paint over the submerged line.
   - The navy/white switch (`--air`, home.css:27) also lands near the bottom of the waterline, not at the surface.
   - Result: the line vanishes for about 50 px under the surface, then reappears below. It looks detached. Evidence: `hoist-d-450.png`, around y 350–405.
   - Fix: render the underwater segment as a sibling after `.wv-front` with a higher z-index, and recalibrate `--air` to the front-wave crest.
3. **A 1 px seam at the waterline on 1× displays (Medium).**
   - `.hero-sky` ends on a fractional pixel (855.73). The sky shows through as a pale hairline across the full width where the front wave meets `<main>`'s water.
   - It does not appear at 2× DPR (`zoom-seam-left.png`).
   - Evidence: `hoist-d-0.png` y≈855, `hoist-d-450.png` y≈405, `hoist-m-450.png` y≈422.
   - Fix: `.wv-front{bottom:-2px}` (or `margin-bottom:-1px` on `.hero-sky`) so the front wave overlaps the seam.
4. **Reduced motion: the hoist still pays out on scroll (Low–Medium).**
   - `hoist.ts:11-27` never checks `prefers-reduced-motion`. `--sy` reaches 600 under `reducedMotion:'reduce'` (`home-audit.json` `rm-hoist-d`).
   - The vessel and waves do stop correctly.
   - Fix: return early when `matchMedia('(prefers-reduced-motion: reduce)')` matches. The same early return also stops wasted writes on ≤820 px, where CSS fixes the line height (home.css:44).
5. **Mobile hero (Low).**
   - About 100 px of dead sky sits between the note and the small vessel (`padding-bottom:200px`, home.css:41).
   - The two CTAs stack at unequal widths, because 186 + 165 + 12 px is wider than 350 px. Evidence: `hoist-m-0.png`.
   - Fix: give both CTAs `flex:1 1 100%` under 420 px, or shorten a label.
6. **Desktop hero (Low).** The h1 runs to 4 lines at 1440 (max-width 17ch, home.css:9). The 9 s `sail-in` means the A-frame and line only arrive about 5 s after load (`vp-d-00-top.png`). Consider about 5 s.

## Statement, conditions, showroom
7. **Showroom spec labels fail contrast (Medium).**
   - `.zf .spec span` is 10 px mono uppercase at `rgba(255,255,255,.5)` (home.css:75-76) on about #183F50. That gives roughly 4.1:1, which is below 4.5:1 for 10 px text.
   - Evidence: `vp-d-04-showcase.png`.
   - Fix: raise to .72 or more and 11–12 px.
8. **3D model palette clashes with the new teal ramp (Medium).**
   - `rtg3d.ts:13-14` (`navy 0x24478C`) renders as a saturated royal blue on the desaturated teal water. It is neither the logo navy nor the ramp.
   - Evidence: `vp-d-04-showcase.png`, `int-showroom-aframe.png`, `int-tier-key3.png`.
   - Fix: retune to a desaturated steel/teal-grey with a red accent, or the logo navy #031d5b, lit lighter.
9. **The showroom can only be turned by dragging (Medium, WCAG 2.5.7).**
   - Rotation is pointer-drag only (`home-scroll.ts:205-220`). It has no keyboard or single-pointer alternative.
   - The only instruction is in the canvas `aria-label` (MachineLift.astro:19). There is no visible "drag to turn" cue.
   - Fix: add ←/→ rotate buttons, or make the canvas focusable with arrow-key rotation.
10. **Showroom changes are not announced (Low).** The machine name, description and spec swap on pick with no `aria-live`. Fix: `aria-live="polite"` on `#mHead`.
11. **Spec values wrap on mobile (Low).** "240 kg to 48 t" breaks before "48 t", and the labels run to 3 lines (`vp-m-04-showcase.png`). Fix: use `white-space:nowrap` on `.spec b`, or 2 columns at 390.
12. **Statement copy (Low).** The "Trusted by industry leaders" heading is a brochure adjective (§8, "evidence beats adjectives"). The sentence under it already carries the evidence ("seven vessels over fourteen years"). Fix: a plainer heading such as "Who we work for".
13. **Conditions copy (Low).** "proof load, brake, render and speed tested" (home.ts:42): "render" reads as a typo. Check it against the copy document (spooling? rendering?).

## Sectors, equipment, finder
14. **Inconsistent H2 scale across sections (Medium).**
   - Rendered sizes at 1440: "Sectors" about 38 px (ScrollTrack `d3`), "Contract manufacturing" about 38 px (`.tier-h`, home.css:179), "Know the duty?" about 38 px.
   - "Equipment" is about 60 px (home.css:271, today's commit), and Story, Conditions and Service are about 56–68 px.
   - The commit message says Equipment was raised to match "Sectors", but Sectors is not at that size. Evidence: `vp-d-05-strack.png` against `vp-d-06-irows.png`.
   - Fix: one section-title size for every home h2.
15. **The Equipment block is too tall (Medium, §7 "compact").**
   - IndexRows is documented for 2–4 rows (IndexRows.astro:40-46). Home feeds it 6 rows at section-heading scale, so it spans about 990 px for six links (`vp-d-06-irows.png`).
   - The row titles at about 44 px nearly equal the 60 px section heading, which flattens the hierarchy.
   - Fix: smaller row titles on home, or a 2-column row list.
16. **Sector cards (Low).**
   - Their radius is 20 px (home.css:121), against §7's 16 px.
   - Hover fills the card red and lifts it 8 px (home.css:123). §7 asks for no scattered hover effects.
   - The Seismic card image (`IMG-S04-D`) is a diagram with numbered callout dots, not a photo, so it reads as an annotated graphic behind text (`vp-d-05-strack.png`, right card).
   - White blurb text over the light top of a photo (S-01, S-03) relies on a .55 overlay. Spot-check its contrast.
17. **Section spacing (Low).**
   - About 150 px of empty water between the Sectors prev/next and the Equipment rule (`vp-d-05-strack.png`, `vp-m-05-strack.png`).
   - About 170 px between the finder form and the tiers.
   - About 200 px under the tiers at 900 px height (`vp-d-08-tiers.png`).
   - The hairline above "Equipment" has no counterpart above "Sectors".
18. **Finder copy (Low).** The lede promises filtering "by application, working load and cable capacity" (FinderEntry.astro:15), but the form only has application and working load. Fix: drop "and cable capacity" or add the field.
19. **Arrow-link tap targets (Low).** The `.arw` links ("Clients and references →", "Contract manufacturing →") are 22 px tall, below the 24 px of WCAG 2.5.8. Fix: `padding-block:2px` or more.

## Tiers (WAI-ARIA tabs + 3D)
Mouse and keyboard work correctly:
- Click selects.
- ←/→ wrap round.
- Home and End work.
- Roving tabindex works.
- `aria-selected` updates.
- The rule fills cumulatively.
- The focus ring is visible (`int-tier-key3.png`).
- The no-JS fallback lists all four tiers.
- Reduced motion snaps the panels.

Issues:

20. **The 3D framing is cropped and drifts (Medium).**
   - At tier 4 the winch is cut by the left edge of the canvas (`int-tier-key3.png`).
   - At tier 1 the base sits low in an empty canvas (`vp-d-08-tiers.png`).
   - The camera eases closer as tiers grow (`home-scroll.ts:280`, `baseDist - tierRot*1.4`), which is the wrong direction for a growing model.
   - Fix: frame on the finished model's bounds, or zoom out, not in, as tiers are added.
21. **Redundant labels (Low).**
   - The tab "01 Structural fabrication", the big "01" and the h3 "Structural fabrication" repeat the same number and name within 150 px (TierLadder.astro:17, 24-25).
   - Fix: drop `.num` now that the tabs carry the number.
22. **Focus can land on the outgoing panel (Low).**
   - Outgoing panels stay `visibility:visible` for .55 s (home.css:107-108).
   - Pressing Tab right after switching tabs focuses the fading panel. That panel then hides, and focus drops to `<body>` (`home-audit.json` `tabAfterTablist`).
   - Fix: `inert` or `tabindex=-1` on non-selected panels immediately.

## Service, seabed, footer
23. **Seabed colour jump (Medium, design).**
   - The near-black teal `--sea-2` abyss jumps to the saturated logo navy #031d5b at a jagged polygon seabed (`vp-d-09-lifecycle.png`).
   - Against the new teal ramp it reads as a step up in brightness and saturation, not a seabed. The angular seabed also clashes with the soft waves at the top.
   - Fix: soften the edge, or carry a short gradient from `--sea-2` into navy.

## Code leftovers from today's changes (Low)
- **home.css orphans:**
  - `.zf .btn.b-red{}` (empty rule, line 163).
  - `.scard .n` (line 125, no such element).
  - `.eq-track > .ecard`, `.ecard.lc`, `.case-vis`, `.lc-ph img` (lines 152-153, 166-167). These are not on this page.
  - `.zw{height:auto!important}` and `.zf{…!important}` (lines 82-85), which are pin-era overrides.
  - "pinned tiers" comments and `pin-grid`/`pin-vis`/`pin-bar` names (lines 98, 174), though nothing pins any more.
  - The `.stmt` comment "navy band with photo, glow and grid" (line 131).
  - `.tier .num{color:var(--panel)}`, overridden at line 141.
- **home.css:49:** the reduced-motion `.zs::before{animation:none}` is declared before the `.zs::before` animation (line 59), so it loses. The global kill in tokens.css:162 masks this.
- **home-scroll.ts stale comments and waste:**
  - Stale comments: "scroll choreography" (line 2), "five WebGL contexts" (line 68, two now), "positions the hoisted panel" (lines 260-262), "continuous render loop" (line 246).
  - Every scroll still calls `poke()` (lines 237-239), so both stages re-render for 1.2 s on any scroll although nothing is scroll-driven now.
  - The rAF loop keeps rescheduling itself every frame while idle (lines 257-264).
  - Fix: stop the loop when `now > wake`, restart it on `poke()`, and drop the scroll listener.
- **Hardcoded figures in `src/data/home.ts`:** `240 kg to 48 t`, `5 to 40 Te`, `5 to 20 Te`, `3.9 m Hs`, `1.5 × WLL`, `2 × 55 kW` (lines 39-58, 68, 82-88). CLAUDE.md §3 says figures come from `PROOF`. Fix: add them to `PROOF` in site.js.
