# Audit: equipment-other (E-07 to E-12)

Pages: `/equipment/launch-recovery-systems/` (E-07 Product), `/equipment/cranes-lifting/` (E-08 Product), `/equipment/handling-systems/` (E-09 Hub), `/equipment/handling-systems/cable-pipe-tensioners/` (E-10 Product), `/equipment/power-units/` (E-11 Product), `/equipment/portable-containerised/` (E-12 Product).

Screenshots: `scratchpad/audit/equipment-other/*.png` (full page), `scratchpad/audit/equipment-other/detail/*.png` (per-section crops plus `ten-vp-*.png` viewport shots and `focus-*.png`).

## Passes (not repeated below)
- Every page: 200, exactly one h1 matching the workbook h1, no images without alt, no horizontal overflow at 390, and no console errors apart from the expected blocked OneTrust request.
- The two "empty links" reported per page are the header and footer logo links. Their `<img alt="Romica Tie Group">` gives them an accessible name, so they are fine.
- §6: no drum core, drum length or flange figures; no makes or part numbers in e-07 to e-12. I checked the skid photo (e10-skid-hpu.jpg) at full resolution: no legible motor nameplate. The only sticker is RTG's own.
- No §8 banned words, no exclamation marks, no em or en dashes in the copy.
- Keyboard: the tab order is logical and every focusable element shows a 2px outline. Under `prefers-reduced-motion` no content stays hidden (opacity 0).
- TO SUPPLY rows render as a "To be confirmed" pill. It looks clean and is not broken.

## Gap / draft markers (intentional, listed only)
- E-07: Gap on motion compensation options.
- E-08: Gap on capacity, reach and drive for each crane type.
- E-09: Gap on system types, integration and deck layout.
- E-10: two TO SUPPLY rows in the 15 Te table (max tension, parking brake).
- E-11: Gap on power range, pressure, cooling, cleanliness class and zones.
- E-12: Gap on example configurations and spec table.

All six pages are therefore noindexed (§5b).

## Critical
None.

## High
1. **Single-photo MediaBand caption runs past the photo** (E-10, twice). The dark caption plate spans the full 1240px figure, but the photo is capped at about 800 to 900px. The plate continues into open water on the right.
   - Evidence: `detail/equipment_handling-systems_cable-pipe-tensioners-d-05.png`, `detail/ten-vp-mband2.png`.
   - Cause: `src/styles/parts-sections.css:26` sets `align-items:stretch` on a 1-item band, and line 29 caps only the plate. The figcaption at line 20 is positioned against the figure, not the plate.
   - Fix: shrink the figure to the plate, e.g. `.mband-grid[data-count="1"] .mband-item{width:fit-content;max-width:100%}`, or move the cap to `.mband-item`.
   - This affects every Product or Sector page with a 1-photo band, not just E-10.
2. **Power units family list is all dashes** (E-11). 4 rows × 3 figures = 12 cells, every one "—". The headers are "working load / cable capacity / line speed", which do not apply to an HPU. It reads as a broken table on a revenue page.
   - Evidence: `equipment_power-units-desktop.png`.
   - Source: `DesignRow.astro:29-31` hard-codes the three winch columns; the `src/data/equipment.ts:112-117` HPUs have nulls.
   - Fix: give rows a per-type figure set (kW, pressure and flow for `hpu`; WLL and outreach for `lars`), or hide any column that is null across the whole family.
3. **The LARS and Handling family lists have the same problem.** 5 of the 6 visible E-07 rows and 5 of the 6 E-09 rows show "— cable capacity — line speed".
   - Evidence: `detail/equipment_launch-recovery-systems-d-08.png`, `equipment_handling-systems-desktop.png`.
   - Fix: same as item 2.
4. **The tensioner family lists a winch** (E-10). "Standard designs in this family" includes DS15 "2 x 600 m - electric winch, 375 kg" and the DS59 cable spooler. This sits under an h1 that promises "Two-track tensioners, 5 to 20 Te".
   - Source: `src/data/equipment.ts:33,96` (`family:"E-10"`).
   - Fix: reassign these to E-09 or the winch family in the source workbook and regenerate.
5. **Same two photos repeated 5 times** (E-10).
   - IMG-E10-A is used for the hero, config 1 and the config-2 band; IMG-E10-B for the config-1 band and config 2 (`e-10.mdx:7,51,54,90,92`).
   - E-07 also uses IMG-E07-B for both the hero and the config-1 photo (`e-07.mdx:7,48`).
   - Fix: give each image one slot. Drop `media` items that repeat the hero, and drop a band that only repeats the other config's photo.
6. **Workbook blocks missing** (revenue pages, P1):
   - E-12: no "case study link" and no "charter-hull problem" prose. The body is one list plus a Gap, with no h2 at all (`e-12.mdx:13-20`).
   - E-10: no "availability" content, and "squeeze versus line tension explained" is only a bullet (`e-10.mdx:101-102`).
   - E-08 and E-11: no gated-datasheet route at all. E-08 has `datasheetPageId` but no specs, so no req-bar; E-11 has no `product` block.
   - Fix: E-12 should link P-03 or the relevant case study and add a short "charter-hull problem" paragraph. Add a "Request the datasheet" CTA to E-08 and E-11.

## Medium
7. **Thin pages with empty hero halves** (E-08, E-11, E-12; E-09 too). There is no hero media, so the right 55% of the first screen is empty water. Below it sits one list and then the ending, which repeats the same two hero buttons.
   - Evidence: `equipment_portable-containerised-desktop.png`, `equipment_power-units-desktop.png`, `equipment_cranes-lifting-desktop.png`.
   - Fix: until photography arrives, use the Skeleton/ImageSlot placeholder in the hero, as other templates do, so the gap reads as intentional.
8. **The workbook CTA never appears** on any of the six pages: "Send us your deck arrangement", "Request the full datasheet", "Talk to an engineer", "Check availability", "Talk about your next mobilisation".
   - Cause: no mdx sets `cta:`, so `endingCta()` (`src/lib/blocks.ts:92`) repeats the hero pair. Every ending is a duplicate of the hero.
   - Fix: add a `cta:` per page from `pages.ts`.
9. **The E-10 tables contradict each other and the H1.**
   - The 10 Te and 15 Te units share an identical dry weight (17,500 kg) and identical cabin weight and envelope (`e-10.mdx:40-48` vs `79-87`).
   - The 15 Te "Maximum tension" is TO SUPPLY, but the family row for DS57 shows "15 Te working load" (`equipment.ts:98`).
   - Row sets differ: Track length appears only in 10 Te, Power unit only in 15 Te, although the lede says both have an integrated power unit.
   - The h1 and meta claim "5 to 20 Te", but only 10 and 15 Te units are evidenced.
   - Fix: confirm against DS57 and the 10 Te datasheet, align the row sets, and confirm the 5 and 20 Te ends exist or narrow the h1 and meta (workbook).
10. **Load terminology is mixed.**
    - E-07 shows "Working load limit 20 Te" with the note "12 Te safe working load", and 40 Te WLL with "20 Te SWL" (`e-07.mdx:18-20,57-59`).
    - E-10 says "minimum 1.8 × SWL" with no SWL row (`e-10.mdx:27,105`).
    - Family rows say "working load".
    - A sceptical buyer will read WLL ≠ SWL as an error. Fix: state what each figure is (e.g. "static / dynamic", "in sea state 5") and use one term per page.
11. **Spec values wrap with the unit orphaned at 390.** For example "5,900 × 2,400 × 2,950 / mm" and "0 to 1,200 m/hr (20 / m/min)".
    - Evidence: `detail/equipment_handling-systems_cable-pipe-tensioners-m-04.png`.
    - Fix: put `&nbsp;` before units in SpecTable values (or `white-space:nowrap` on number+unit spans).
12. **Family list figures lose their labels on mobile.** `blocks.css:761` hides `.finder-fig small`, leaving "1.2 Te 1,700 m 60 m/min" and bare "— —" with no meaning.
    - Evidence: `detail/equipment_launch-recovery-systems-m-08.png`.
    - Fix: keep the labels (smaller), or render "1,700 m cable" inline.
13. **"Request datasheet" targets are 22px tall** (below the WCAG 2.2 2.5.8 minimum of 24px). This applies to every family row on E-07, E-09, E-10 and E-11, and to "Specification above →".
    - Fix: give `.finder-links a` `padding-block:4px` or `min-height:24px`.
14. **Hub index rows have empty blurbs** (E-09). All four cards have `blurb: ""` (`e-09.mdx:14-23`), so each row is a heading plus an arrow with 40% of the width empty. "5 to / 20 Te" also breaks across lines.
    - Evidence: `equipment_handling-systems-desktop.png`.
    - Fix: write one-line blurbs, and add `text-wrap:balance` or a nbsp in "20&nbsp;Te".
15. **E-07 gallery captions are brief text, and probably swapped.** "The same A-frame raised." is under the photo where the frame is tilted outboard. "The same A-frame, full view." is under the upright one.
    - Evidence: `detail/equipment_launch-recovery-systems-d-05.png`.
    - Source: `e-07.mdx:50-53`.
    - Fix: write real captions, e.g. "Outboard at 20°, on the test frame" and "Upright, on the test frame".

## Low
16. **The E-08 range list has no heading while "Certification" gets an h2.** The two columns read unevenly and the outline skips the range (`e-08.mdx:18-26`). Fix: add `## Range`.
17. **Long config h2s break badly.** "10 Te unit, self- / contained / on one skid" splits across 3 lines at the hyphen; "15 Te electro-hydraulic unit with integrated power unit" runs to 4 lines.
    - Evidence: `detail/...tensioners-d-04.png`.
    - Fix: shorter captions, or a `label` used as the heading.
18. **StatsStrip is inconsistent between configs.** Config 1 has a strip; config 2 has none, because its tension is TO SUPPLY and its speed string is over 14 characters. Units are styled small in "20 Te" but not in "0 to 10 Te". On mobile, the 2-item strip leaves a third of the row empty and wraps its labels into 3 lines. Fix: accept it, or always render the strip with at least the dry weight.
19. **Units and formatting.**
    - "m/hr" should be "m/h"; "380/480 V" should be "380 to 480 V" (`e-10.mdx:22,39`).
    - Design names use a spaced hyphen as a separator ("4.4 m - side deployment boom") and "Man riding" should be "Man-riding" (equipment workbook).
    - Spec-table row labels are all-caps mono throughout. That is legible, but long labels like "CONTROL CABIN ENVELOPE L×W×H" wrap on mobile.
20. **Two different `?equipment=` values for the same page.** The hero uses "Launch and recovery systems"; the req-bar uses the page name "Launch & Recovery Systems" (`Product.astro:71` vs `e-07.mdx:11`). Fix: use one source.
21. **Breadcrumbs mix case.** "Equipment hub / Handling Systems / Cable & Pipe Tensioners" breaks the sentence-case rule. They come from the workbook `name`.
22. **Hover effects on the gallery.** Image zoom and caption lift on non-interactive photos (`parts-sections.css:31-35`) go against §7 "do not add scattered hover effects", and the blurred glass caption plate sits close to the "no glows" rule.
23. **Stale comment.** `Product.astro:150-151` mentions "the depth readout", which was removed today.
24. **The req-bar overlaps table rows on mobile** (fixed bottom pill over row content, `detail/...tensioners-m-04.png`). This is expected for a sticky bar. Consider `padding-bottom` on `main` while it is visible.
