# Audit: equipment hubs — `/equipment/` (E-00) and `/equipment/winches/` (E-01)

Review only. No repo files were changed. Evidence is in `scratchpad/audit/equipment-hubs/`: full-page shots `equipment-*.png` and `equipment_winches-*.png`, viewport shots `v-e00-*` and `v-e01-*`, interaction shots `x-*`, `report.json`, and `interact.json`, which holds every filter count, the URL tests, tab order, the ARIA snapshot and link validation. The scripts are `scratchpad/pw/eqhub.mjs` and `eqhero.mjs`.

## What was exercised

- **Every chip:**
  - Type: All 91, Winches 67, LARS 12, Power units 4, Other 8
  - Application: Survey 23, Geotech 14, Seismic 16, ROV 5, Mooring 4, Lift 23, Cable 3
  - Drive: Electric 23, Hydraulic 44, Electro-hydraulic 3
- **Every select option:**
  - Load: ≥1 Te 68, ≥5 Te 36, ≥15 Te 15, ≥30 Te 7
  - Capacity: ≥500 m 42, ≥1,500 m 23, ≥3,000 m 10
- **Combinations:** winch + survey + ≥5 Te gives 2 rows (DS10, DS05). Then HPU + survey + ≥5 Te gives 0 rows, and the empty state appears.
- **Search:** `DS10`, `ds38`, `winch hpu`, `zzz`, padded whitespace, `LW`, `A-frame`. Enter is a no-op and Escape clears the search.
- **URL state:** the URL is written with `replaceState`. Links with filters in the URL load correctly. Invalid values (`?type=foo&wll=7&cap=abc`) fall back to "All" and are stripped from the URL. `#finder` scrolls correctly once the bar appears.
- **Show all:** focus moves to row 13's first link.
- **Keyboard:** tab order is search → chips → selects → rows. Every control shows a visible white outline. Space toggles a chip.
- **Live region:** the count line is `aria-live="polite"`.
- **Links:** all 182 row links resolve to a 200 page with an existing anchor (0 broken).
- **Reduced motion:** the reveals sit at identity.
- **Mobile:** no horizontal overflow, and every finder tap target is at least 44 px tall.

Both pages have exactly one `<h1>`. There are no console errors apart from the blocked cookie script. No images lack `alt`.

**Gaps:** neither page carries a `<Gap>`, TO SUPPLY or draft marker. Both are `draft: false` and therefore indexed. That makes the missing workbook blocks below real defects, not marked gaps.

## Findings

### High

1. **E-01: the "Standard designs in this family" list shows 2 of 67 winch designs.** It only lists DS07 and DS49A, the two whose `family` is E-01 because they have no application. On the P1 Winches hub it reads as "2 designs with a datasheet". Neither row has a view link, and "Search the whole range" goes to unfiltered `/equipment/#finder`.
   - Evidence: `v-e01-d-designs.png`; `FamilyDesigns.astro:23,40-43`; `Hub.astro:126`.
   - Fix: on a hub, list every design in its child families, or replace the list with a link to `/equipment/?type=winch#finder`. Re-home DS07 and DS49A to a real family.

2. **E-01: workbook blocks are missing and the copy is about a tenth of the target length.** The workbook blocks are "Winch families, the spec figures that matter, Lebus grooving, level wind, lead-off angle". There is nothing on lead-off angle. Lebus grooving and level wind appear only as bullet fragments, and "spec figures that matter" is two sentences. The body is about 60 words against a 500-word target. The page is published as finished, with no `<Gap>`.
   - Evidence: `src/content/pages/e-01.mdx:20-30`; `pages.ts:196`.
   - Fix: write the three explainer blocks, or add `<Gap>` markers so the page is noindexed until they exist.

3. **Depth figures contradict each other across public surfaces.**
   - E-01's meta description says "up to 3,500 m capacity" (`pages.ts:191`).
   - E-03 and the CLAUDE.md rule say "300 to 4,000 m".
   - The finder publishes DS10 at 5,000 m and DS05 at 5,500 m (E-03 survey family, `data/equipment.ts`), plus DS34 at 4,000 m.
   - Fix: the owner decides which ceiling stands. Then correct the workbook meta, or drop or flag the 5,000 m and 5,500 m rows in the datasheet index.

### Medium

4. **The finder has no single reset, and the empty state offers no way back.** Getting back to the full list means pressing "All" in three groups and resetting two selects. The empty state only links to the quote form.
   - Evidence: `x-finder-empty.png`; `EquipmentFinder.astro:115-118`.
   - Fix: add a "Clear filters" button. Show it whenever any filter is set, and always in the empty state. It resets `state` and calls `render()`.

5. **Data gaps make the filters leave out designs that belong.**
   - All 12 LARS/A-frames, all 4 HPUs, DS07 and DS49A have `apps: []`. Choosing "Survey" or "ROV and subsea" therefore drops every A-frame.
   - HPUs, LARS and booms have `drive: null`. "Hydraulic" therefore excludes the hydraulic power units. Only 70 of 91 designs carry a drive.
   - Fix: fill `apps` and `drive` in the datasheet index, since `data/equipment.ts` is generated. Otherwise, treat an empty value as matching any application or drive.

6. **Design names from the generated data read like internal shorthand.**
   - Hyphens used as separators: "2.2 kW - 700 m - 1 Ø electric winch", "9 m - over stern boom".
   - Three different multiplication signs: "4x200 m", "2 x 600 m", and "4 × 200 m" in the capacity column.
   - Undefined abbreviations: CT, LW, "W/O LW", HV, "1 Ø".
   - "&" and "+" used for the same thing.
   - "Man riding" should be "Man-riding".
   - Evidence: `v-e00-d-finder.png`; `data/equipment.ts`.
   - Fix: normalise names in `scripts/build-equipment.mjs`, or in the workbook: × with spaces, plain words, no hyphen separators.

7. **Load units are mixed between "t" and "Te".** E-01's H1 and the E-00 Winches card say "48 t". The neighbouring E-00 cards say "40 Te" and "20 Te", and the finder uses Te throughout.
   - Evidence: `e-00.mdx:16`; `pages.ts:193`; `lib/equipment.ts:32`.
   - Fix: pick Te, the unit the site already uses, and change the workbook H1/meta and the E-00 blurb to match.

8. **E-00: the "Handling systems" card describes only tensioners.** It reads "Two-track cable and pipe tensioners, 5 to 20 Te". Handling systems (E-09) also covers the booms, the gravity corer chute, the man-riding system and the deployment pole.
   - Evidence: `e-00.mdx:21-22`; `v-e00-d-cards.png`.
   - Fix: rewrite the blurb to cover the whole family, for example "Tensioners, over-stern and side booms, corer chutes and deployment poles."

9. **E-00: workbook blocks are thin or absent.**
   - "How to specify" is a single sentence: "To size a system we need…".
   - The "Applications cross-cut" block exists only as a filter chip row, with no links to the sector pages.
   - The workbook CTA "Find your configuration" appears nowhere. The hero offers no jump to the finder, which sits about two screens down.
   - Evidence: `e-00.mdx:9-13,33`; `pages.ts:182-183`.
   - Fix: make the hero's secondary CTA "Find your configuration" pointing at `#finder`. Expand "how to specify" into the four inputs with a line each.

10. **The search placeholder uses the browser default grey `#757575` on the dark input, about 2.8:1.** No `::placeholder` rule exists anywhere in `src/`.
    - Evidence: `v-e00-d-finder.png`; `EquipmentFinder.astro:58`.
    - Fix: add `.field input::placeholder{color:var(--ink-2);opacity:.85}` to `tokens.css` or `blocks.css`.

11. **Mobile: figure captions are removed with `display:none`.** Screen readers then hear "240 kg 700 m 35 m/min" with no labels. The datasheet number also runs into the tags as "DS83Electric · Survey".
    - Evidence: `blocks.css:761`; `DesignRow.astro:27`; `interact.json` → `mSRrow`.
    - Fix: hide the captions visually only, with a `.sr-only` pattern instead of `display:none`. Put a real space or separator after `.finder-code-in`.

12. **Mobile: closing "Filters" hides any sign that a filter is active.** The summary still reads just "Filters +", so a visitor sees "23 standard designs" with no visible reason.
    - Evidence: `v-e00-m-filtered-closed.png`; `EquipmentFinder.astro:64`.
    - Fix: show the active count in the summary, for example "Filters (1)", updated in `render()`.

13. **The child-card rail has a fixed `min-height:390px`, leaving about 200 px of dead panel in every card.** The blurbs are only two lines. This works against the "compact" rule.
    - Evidence: `v-e00-d-cards.png`, `v-e01-d-body.png`; `blocks.css:363`.
    - Fix: drop the min-height, or size it to the content, for example `min-height:auto` with links pinned by grid.

14. **E-01's hero has no media, so the right half of the first screen is empty teal.** E-00 has a photo, so the two pages are inconsistent.
    - Evidence: `v-e01-d-hero.png`; `e-01.mdx:4-9`.
    - Fix: add `hero.media` with ref `IMG-E01-A` and the workbook ogBrief "grooved drum close-up". It renders as the drawing-sheet placeholder until the photo arrives.

15. **The breadcrumb shows the internal workbook name "Equipment hub".** This appears in the visible trail on both pages and in the BreadcrumbList JSON-LD. The same applies to every "X hub" name.
    - Evidence: `Breadcrumbs.astro:20`; `seo.ts:30`.
    - Fix: label section hubs with `page.section`, or with `h1`, not `name`.

16. **The proof bar ships "0" in the HTML.** Visitors without JS, crawlers, and screen-reader users who reach it before it scrolls into view get "0 Machines delivered" and "0 Te".
    - Evidence: `ProofBar.astro:32`; `interact.json` → `e01text`.
    - Fix: render the real figure server-side and let `motion.ts` reset it to 0 only when it animates.

17. **The E-00 hero image is busy behind the text at desktop.** The breadcrumb and the end of the H1 sit over white winch frames and reels. Sampled local contrast falls to about 1.2–2:1 behind the crumbs and the "range" glyphs.
    - Evidence: `v-e00-d-hero.png`; `eqhero.mjs` output.
    - Fix: strengthen the left-side scrim, or shift `object-position` so the bright machinery sits right of the text.

### Low

18. **Search does substring matching with no ranking.** "DS10" returns DS105, DS109 and DS107 before DS10. Fix: sort exact code matches first, or match a datasheet-number token exactly.

19. **Missing figures render as an em dash "—".** Screen readers read it as a dash, and power-unit rows show three of them.
    - Fix: show "n/a" with sr-only text such as "not applicable" (`DesignRow.astro:29-31`). For HPUs, consider showing kW in the load column.

20. **Capacity filtering is inconsistent between two-option designs.** DS07 is named "800 m & 2,000 m" but filters at 800 m. DS86 is named "1,000 m" but filters at 2,000 m. Fix: use one rule, the maximum offered, in the data.

21. **The count is stated twice, and the count line doesn't match what's shown.** "91 designs with a datasheet" appears in the lede and "91 STANDARD DESIGNS" in the count line, while only 12 rows are visible.
    - Fix: make the count line say "Showing 12 of 91" until "Show all" is pressed, and drop the number from the lede.

22. **The empty-state link "Tell us the duty" is not underlined.** It differs from the surrounding text only by colour and weight (white vs `#BFD2D8`, about 1.4:1). Fix: underline it, as the other finder links are (`blocks.css:736`).

23. **The desktop filter block runs about 470 px before the first result.** Fix: consider putting Drive and the two selects on one row, or making chips more compact. That keeps results above the fold at 900 px tall.

24. **Copy polish:**
    - Card links capitalise page names mid-sentence: "Read about Winches", "Read about Launch and recovery systems".
    - "48 t" breaks across lines in the Winches card. Use a non-breaking space.
    - "Everything in equipment" reads awkwardly.
    - "Lebus" is LeBus International's trade name. The workbook sanctions it, but the owner should confirm it is fine under §6 ("no component makes").

25. **Code hygiene:**
    - `matchMedia(...).addEventListener('change', sync)` in `EquipmentFinder.astro:201-204` is re-added on every ClientRouter visit and never removed.
    - Select focus is a 2px outline where the other controls use 3px.

## Checked and fine
- Exactly one H1 on each page. Both match the workbook (E-00 "Equipment range"; E-01 "Marine winches, 240 kg to 48 t WLL").
- Heading order is H1 → H2 → H3.
- §6 content: no drum or flange dimensions and no component part numbers. Lebus is noted above.
- No banned words or exclamation marks. British English throughout.
- No horizontal overflow at 390.
- Chips use `aria-pressed`, groups use `fieldset`/`legend`, and inputs have labels.
- No-JS fallback: all rows render and the bar stays hidden.
- Reduced motion is honoured.
