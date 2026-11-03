# Audit: equipment / winches (E-02 to E-06, Product template)

Pages: `/equipment/winches/geotechnical-coring/` (E-02, P1), `/survey-oceanographic/` (E-03, P1), `/seismic/` (E-04, P2), `/rov-tow-umbilical/` (E-05, P1), `/mooring-utility/` (E-06, P3).
Evidence: `equipment-winches/*.png` (full page, 1440 + 390), `equipment-winches/d/*.png` (config rows, prose band, mobile tables, focus), `report.json`, `detail.json`.

Fine on all five: one h1 each, matching the workbook h1. No horizontal overflow at 390. No console errors apart from the blocked cookie script. Every img has alt (the "empty links" in report.json are the logo links, which are named by the img alt). Visible focus on every link checked. Reduced motion: no hidden reveals, and counters jump straight to their final value.

Markers (intentional): E-02 has 1 TO SUPPLY row (chute envelope). E-04 has a `<Gap>` (duty rating, L10 life). E-06 has 3 TO SUPPLY rows (two dry weights and one height). E-02, E-04 and E-06 are therefore `noindex`. E-03 and E-05 are indexed.

## Critical
None.

## High
1. **All five: every headline figure ships as "0" in the HTML.** `StatsStrip.astro:26` renders `<span class="ct" data-to="30000">0</span>`, and `motion.ts:83-112` fills the value in only on intersection. Crawlers, no-JS visitors, reader mode, translation tools and AT (before scroll) all read "0 kg working load limit". Confirmed in `dist/equipment/winches/mooring-utility/index.html`. Fix: server-render the real value and let motion.ts reset it to 0 only when it is about to animate.
2. **E-02, E-03, E-05, E-06: the feature-list band is half empty on desktop.** The bullets fill the left column and the right half is blank (`d/e05-d-prose.png`, `d/e06-d-prose.png`). Cause: `.prose.lists{columns:2}` plus `ul{break-inside:avoid}` (`blocks.css:698-702`), so a body that is a single list never reaches column 2. Only E-04 fills both columns, because its Duty rating h2 and Gap go there. Today's Applications removal didn't cause it (Applications was a separate section after FamilyDesigns), but this is the band that now reads as hollow. Fix: let a lone list flow, e.g. `.prose.lists > ul{break-inside:auto}` with `li{break-inside:avoid}`, or use `columns:1` when the body has no h2.
3. **E-02 (P1) is noindexed because of one row on a secondary item.** "Overall envelope, stowed and deployed: TO SUPPLY" (`e-02.mdx:102-103`) sits on the gravity corer chute, which `equipment.ts:77` files under family E-09, not E-02. Per §5b, that one row keeps the main coring page out of search. Fix: get the figure from RTG, or drop the row (footprint is already given) until it arrives.

## Medium
4. **E-03: the brake figure contradicts its own note.** "Static brake holding, top layer 250 kg, minimum 1.5 × WLL" against a WLL of 170 kg gives 1.47×, since 1.5 × 170 = 255 (`e-03.mdx:30-32`). Fix: check DS83 and correct either the value or the note.
5. **E-03: DS83 capacity disagrees between the table and the family list on the same page.** The table says 1,250 m at 6 mm (`e-03.mdx:25`). "Standard designs in this family" says 700 m and names it "2.2 kW - 700 m - 1 Ø electric winch" (`equipment.ts:28`). Fix: align with the datasheet. Show capacity at a stated diameter in both, or keep the 700 m reference and say so.
6. **E-02, E-05: the published configurations are missing from the finder.** DS38 (E-02 config 2) and DS63 (E-05's only config) are not in `equipment.ts`. So:
   - there is no "Specification above →" cross-link;
   - E-05's family list shows 2 designs, neither of them the one on the page;
   - the finder cannot find either machine.

   Fix: add DS38 and DS63 to the datasheet index and regenerate.
7. **E-03, E-05, E-06 (+ hub finder): raw datasheet titles are shown as product names.** Examples: "2.2 kW - 700 m - 1 Ø electric winch", "4x200 m - dual drum electric winch" (E-03), "3 x 400 m - hydraulic winch & HPU" (E-05), "Hydraulic winch W/O LW" (E-06, `equipment.ts:107`). They mix hyphen separators, "x"/"×", "Ø" and "W/O LW" jargon, and differ from the page's own captions ("…without level wind"). Fix: normalise the names in the `npm run equipment` generator, not by hand.
8. **E-05: the published envelope leaves out the level wind, which the page says every winch has.** The row reads "Overall envelope 1,750 × 2,436 × 1,756 mm, without level wind" (`e-05.mdx:39-41`), while the bullet says "controlled level wind on every winch" (`e-05.mdx:57`). §6's "publish the box" means the real deck box. Fix: publish the envelope with the level wind fitted (as E-02 does), or both.
9. **E-02, E-05: "Lebus" is a trademark, which brushes §6's "no component makes" rule.** It appears in "Lebus shell drums" (`e-02.mdx:116`) and "Lebus shell grooving" (`e-05.mdx:57`), and in the E-05 meta description in the workbook. LeBus is a manufacturer's registered name, even though the industry uses it as a generic term. Fix: the site owner should decide. The safe wording is "counter-balanced (Lebus-type) grooved shell" or "two-step grooved drum shell".
10. **All five: the spec table is styled by three conflicting layers.** They are `blocks.css:520-539`, `parts-content.css:3-27` and `ocean.css:60-62`. The results:
    - zebra fill and hover bands (parts-content), despite the blocks.css comment "no outer box or zebra fill";
    - 4px inline padding (ocean.css), so the label text sits right against the edge of each zebra band (`d/e02-d-cfg2.png`);
    - th width 44% overriding the 56% rule;
    - mono UPPERCASE 12px labels, which wrap the long ones ("STATIC BRAKE HOLDING, FIRST LAYER") to 2 lines at 390 (`d/e03-m-table.png`).

    Fix: collapse to one rule set. Either drop the zebra or give the cells real padding, and consider sentence-case labels for the long keys.
11. **Inconsistent row labels and ranges across the five pages:**
    - Lead-off angle sometimes has no axis: E-06 gives "−3.37° to +10.62°" with no "vertical" (`e-06.mdx:35,74`), and E-04 gives vertical only. The others give horizontal and vertical.
    - Envelope and weight keys vary: "Overall envelope L×W×H", "Winch envelope L×W×H" (E-02 cfg 2), "Overall envelope L×W" + "Overall height" (E-06 cfg 2); "Dry weight, without cable", "Winch dry weight, without cable", "Dry weight (empty)".
    - E-06 cfg 1 has a "Rendering" row but cfg 2 (same drive, same valve per the bullet) does not.

    Fix: settle on one vocabulary (Lead-off angle, horizontal / vertical; Overall envelope L×W×H; Dry weight, without cable) and add the missing axis.
12. **All five: FamilyDesigns link targets are 22px tall.** "Request datasheet" is 123×22 and "Specification above →" is 147×22. The two are stacked in one cell on the "Specification above" row (E-02, E-03, E-04), so the 2.5.8 spacing exception is doubtful. Fix: give them `min-height:24px` (ideally 44 on touch) or pad the hit area.
13. **E-05 (P1): two workbook blocks are covered by one bullet each.** "The slip ring boundary explained" and "cable protection" (`pages.ts` E-05 blocks; `e-05.mdx:57-59`) each get a single bullet, and the page is the shortest of the five (4,788 px). Don't invent content. If RTG has the slip-ring scope split (who supplies, who tests), it belongs here; otherwise mark it as a Gap.
14. **E-02, E-04 (desktop): the configuration h2s are display-size in a half-width column.** "12 Te WLL, 2,300 m hydraulic winch with power unit" runs to 4 lines (`d/e02-d-cfg2.png`), and the others to 3. That works against "compact, one idea per screen". Fix: step the frow h2 down one size, or set the caption as a short name with the WLL/capacity in the stats.

## Low
15. **Te captions don't match the kg values in the tables or the finder:**
    - E-02 caption "2.75 Te" vs 2,760 kg in the table and "2.76 Te" in the family list;
    - E-04 "2.1 Te" vs "2.11 Te" in the family list;
    - E-05 "3.5 Te" vs 3,586 kg (3.6 Te);
    - E-03 "0.24 Te WLL" heading for a 240 kg winch (kg would read more naturally).

    Fix: round consistently, or derive the caption from the first-layer WLL.
16. **E-03, E-06: hyphens used for ranges.** "220-254 V" (`e-03.mdx:36`) and "32-36 mm" (`e-06.mdx:27,66`). Fix: use en dashes ("220–254 V", "32–36 mm").
17. **E-02: the configuration nav pills are uneven.** "2.75 Te WLL / 12 Te WLL / 5 Te WLL hydraulic gravity corer chute" comes from `caption.split(',')[0]` (`Product.astro:102`), because E-02 sets no `label`. E-06 does set one. Fix: add a `label` to each E-02 spec ("2.75 Te electric", "12 Te hydraulic + HPU", "Gravity corer chute").
18. **All five: the sticky "Request the datasheet" pill covers content.** It sits over the spec values at the bottom of the viewport on desktop (`d/e02-d-cfg2.png`, "…with level wind fitted" is hidden) and over the last table row on mobile (`d/e03-m-table.png`). Nothing reserves space for it. Fix: add bottom padding to main while the bar is shown, or move it aside while a table's last rows are in view.
19. **Product.astro has two stale comments.**
    - Lines 150-151 still say the pill "leaves the corners to… the depth readout"; the depth gauge was removed today.
    - Line 163 says the bar shows when the "first spec table" enters, but the selector list matches the `.frow` first in document order, so it fires on the row's top edge.

    Fix: update both comments.
20. **E-04: the Duty rating gap chip breaks badly.** "life." wraps onto a second line as a broken inline box (`d/e04-d-prose.png`). Fix: `box-decoration-break:clone` or `display:inline-block` for prose gaps.
21. **E-04: the footnote repeats the first bullet.** "the drum barrel is mounted directly on a slew-ring bearing" (`e-04.mdx:41`) duplicates `e-04.mdx:56`. Also, the workbook meta promises "high line speeds", but the only configuration runs at 15 m/min. Fix: drop the clause from the footnote, and flag the meta to the workbook owner.
22. **All five: media-band photos are announced twice.** The alt text equals the visible caption, so screen readers read the same sentence twice (e.g. "The same winch, second view."). Context-free alts such as "The same winch, front view" are also weak. Fix: `alt=""` where a figcaption carries the text, or write distinct alts when real alt text arrives (§5.6).
23. **E-02: the two datasheet buttons prefill the form with different names.** The hero and ending CTAs send `equipment=Geotechnical and coring winches` (`e-02.mdx:11`); the sticky bar sends `Geotechnical & Coring Winches` (`page.name`, `Product.astro:71`). The same split exists on all five pages. Fix: use one source, either drop the hand-written query from the frontmatter or use `page.name` everywhere.
24. **Desktop: a large empty gap between the bullets band and the first configuration.** It is about 150 px, roughly Section bottom padding plus frow top padding (`d/e06-d-prose.png`, `d/e04-d-prose.png`). Fix: trim one of the paddings when a Section is followed directly by a frow.

## §6
- No drum core diameter, drum length or flange diameter; every mm figure is an overall envelope, a footprint or a cable diameter.
- No part numbers. "Drum flange drilled for stoppering off" (`e-02.mdx:119`) names a feature, not a dimension.
- No GA drawings.
- The only make-like term is "Lebus" (item 9).
