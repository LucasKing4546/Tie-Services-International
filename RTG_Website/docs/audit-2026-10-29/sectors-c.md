# Audit: sectors-c (S-06, S-07 in depth, plus S-01 to S-07 consistency)

Screenshots: `scratchpad/audit/sectors-c/` (full-page `sectors_*-desktop|mobile.png`, viewport `v-*`, mobile montages `mont-s06-m.png` / `mont-s07-m.png`, source contact sheet `sheet-s06s07.png`, focus `focus-*`, reduced motion `rm-*`).
Automated: all 7 pages return 200, exactly one h1 each, h1 text = workbook h1, no img without alt, no horizontal overflow at 1440 or 390, no console errors (only the expected OneTrust ERR_FAILED). The "2 empty links" per page are the header and footer logo links, which have an `<img alt="Romica Tie Group">` inside, so they're fine. Keyboard order is logical, every focus stop shows a 2–3px outline, and nothing stays hidden under `prefers-reduced-motion`.

S-06 and S-07 copy matches `RTG_Website_Copy_Concise.docx` word for word, including the buttons and the related-equipment lists. So differences from the workbook's `cta` and `blocks` come from the copy document and are not template bugs. They're listed under Medium as decisions for the content owner.

Gaps (intentional, not bugs): S-07 has 1 `<Gap>` (class/welding approvals) and is `noindex`. S-06 has no gaps and is indexable. Of the others, S-02, S-03, S-04 and S-05 each have 1 gap and are noindexed. S-01 has none.

---

## Critical

1. **Third-party defence collage ships in the build.** `src/assets/sectors/s07-naval-vessel.webp` is a press/stock collage of warships, a submarine and a drone (see `sheet-s06s07.png`). It is the "defence-news article image" that the `media.ts` header (lines 19–23) says is "deliberately left out". In fact it is imported (`media.ts:63`) and registered as `IMG-S07-A` (`media.ts:113`). No page references it, but `dist/_astro/s07-naval-vessel.BDPnd6xs.webp` is emitted, so it would be published. **Fix:** remove the import, the map entry and the file, as was done for S-02/S-03/S-05.

2. **S-06 media band shows third-party CGI renders captioned as RTG equipment.** `IMG-S06-B` (`s06-rov-launch.webp`) is an underwater render of an ROV over a subsea structure. `IMG-S06-C` (`s06-dive-spread.jpg`) is an underwater render of a branded third-party work-class ROV ("NEXXUS"-style livery). Neither is an RTG photograph, and the `media.ts` provenance note covers only the `s06-equipment-*` files.
   - The captions and alt text are false: "ROV launch and recovery over the side, umbilical under tension." and "Dive and ROV spread rigged on deck." (`s-06.mdx:19-22`). Neither image shows a deck, a launch or an umbilical under tension. That is a WCAG 1.1.1 failure and a misleading claim to a sceptical buyer.
   - `IMG-S06-B` is also the homepage sector card (`src/data/home.ts:73`).
   - **Fix:** drop both from `MEDIA` (S-06 then shows only its hero) until owned photography exists, or confirm the licence and rewrite the captions to describe the renders honestly.

## High

3. **S-07 single-image caption runs past the photo.** At desktop the dark caption bar extends about 440px beyond the right edge of the picture (`v-defence-government-d-02.png`).
   - Cause: in `parts-sections.css:26` and `:29`, the plate is capped (`max-width:min(...)`) but the `.mband-item` still flex-grows to the full row. The figcaption is absolutely positioned against the item (`parts-sections.css:20`, `left:12px;right:12px`), not against the plate.
   - It also affects `e-00.mdx`, the only other single-image band.
   - **Fix:** put the cap on the item instead of the plate, e.g. `.mband-grid[data-count="1"] .mband-item{flex-grow:0;width:min(100%, <same cap>)}`.

4. **S-07 photo has a burned-in camera date stamp.** "2016/05/19" shows in orange on `IMG-S07-C`, visible at both breakpoints. The hero source `s07-lars-build-a.jpg` has "2016/05/13", which is currently cropped out but would show at other ratios. It looks amateur and dates the work. **Fix:** crop or retouch both files, then re-run `strip-exif`.

5. **S-01 has the same caption mismatch as S-06.** `IMG-S01-C` is captioned "Containerised survey spread rigged on deck, ready for mobilisation." (`s-01.mdx:21-22`), but the image is a vessel-and-multibeam bathymetry render. More broadly, `s01-deck-spread`, `s04-acquisition`, `s04-reel-deck`, `s06-rov-launch`, `s06-dive-spread` and `s07-lars-build-*` are not covered by the `media.ts` provenance statement, which vouches only for `s01/s04/s06-equipment-*`. **Fix:** check provenance for each before launch, and make every caption describe what the picture actually shows.

## Medium

6. **S-06 orphaned paragraph.** "Personnel systems are built to the framework required by the operator and their class society…" (`s-06.mdx:33`) belongs to the man-riding bullet. On desktop, CSS columns (`blocks.css:698-702`) flow it to the top of the right column, above "Clients", with no heading. It reads as a stray sentence. **Fix:** make it the last list item, or add `break-before:avoid` on a `ul + p`.

7. **Right column starts lower than the left on all 7 pages.** The first h2 in column 2 keeps its `margin-top:34px`, `padding-top:18px` and top border, while column 1's first h2 has none (`blocks.css:699-701`). So "Class and acceptance" (S-07), "Testing" (S-01), "Sizing at depth" (S-02) and the others sit about 50px below their left-hand neighbours, with a rule above. **Fix:** drop the margin, padding and border on an h2 that starts a column. The simplest route is a 2-column grid with an explicit split, since CSS has no `:first-in-column` selector.

8. **S-07 gap marker sits in the wrong section.** The "class and welding approvals with certificate references" marker (`s-07.mdx:46`) renders under *Security of supply*. It belongs under *Class and acceptance*. **Fix:** move it after the "Full certification dossier" bullet.

9. **S-06 "Clients" block is a bare fragment.** "DeepOcean, Ocean Infinity and Fugro." (`s-06.mdx:35-37`). The same block is headed "Track record" on S-01 and S-02 and "Who we work with" on S-05, and those pages write it as a sentence. **Fix:** use the heading "Track record" and write a full sentence, e.g. "ROV and subsea clients include DeepOcean, Ocean Infinity and Fugro." The names are already in the copy document.

10. **Workbook blocks missing, coming from the copy document.**
    - S-06 has no "Availability framing" block, and "the slip ring boundary" is a single bullet. S-07 has no "Programme requirements" block.
    - Bodies are 106 words (S-06) and 169 (S-07) against workbook targets of 700 and 550. S-04 is the thinnest at 87.
    - The template is deliberately short and the copy document is the source, so this is a content-owner decision. Record it in `Sector.astro`'s doc comment so it isn't "fixed" later.

11. **Ending band repeats the hero buttons with no heading.** On every sector page, `PageEnding` (`Sector.astro:60`) shows the same two buttons as the hero, floating in an empty band. This follows about 170px of empty space after the media band and again after the related rows. On S-06, "Launch and recovery systems" is then linked 3 times: hero, related row and ending. This goes against "compact, one idea per screen". **Fix:** give the ending a one-line prompt, or use the workbook CTA wording there, and tighten the stacked `.sec` padding between MediaBand and IndexRows.

12. **CTA pattern varies across the seven pages (source-driven, but worth one decision).**
    - S-01 is the only page with "Request the datasheet" as the primary button.
    - S-02 and S-04 put the datasheet second.
    - S-03, S-05 and S-06 use an equipment link as the second button. S-07 uses Certifications.
    - S-05 has no datasheet CTA, although the workbook CTA is "Request the research winch datasheets" and S-01 already links the same E-03 datasheet filter.
    - Workbook CTAs that appear nowhere: S-03 "Check tensioner availability", S-07 "Enquire about a programme".
    - **Fix:** settle on primary = "Talk to an engineer" and secondary = the datasheet where one exists. Ask RTG about S-01's order.

13. **S-07 hero h1 runs to 4 lines on desktop.** "Deck machinery / for naval and / government / programmes" wraps 4 times at 1440. Every other sector h1 is 3 lines, and on mobile S-07's hero fills the whole first screen. **Fix:** widen the hero h1 measure slightly (e.g. `max-width:16ch` → `18ch`) or step the display size down for long h1s.

14. **"Lebus grooving" names a make (§6 borderline).** It appears in S-06 (`s-06.mdx:28`), S-01 (`:29`) and S-05 (`:25`), and in the E-05 blurb shown in Related equipment. LeBus is a trade name. **Fix:** confirm with the owner, or say "counter-wound (LeBus-type) grooving" or "parallel-groove drum shells".

## Low

15. **Overlay captions on photos.** Captions use a blurred glass bar over the image (`parts-sections.css:20-24`, `backdrop-filter`) and cover the bottom of each picture. On hover the photo zooms by 1.035 (`:31-34`). §7 bans glows and scattered hover effects, and the taste rules ban labels laid over images. **Fix:** put the caption under the image and remove the hover zoom.

16. **S-04 media band (consistency).** Two portraits and two landscapes, top-aligned, leave a ragged bottom edge with landscape tiles about half the height of the portraits (`sectors_seismic-desktop.png`). Image treatment varies across pages:
    - S-03 has no hero photo and no band.
    - S-02 has a hero but no band.
    - S-07 has a single image.
    - S-04 has four.

    This is accepted while photography is missing, but S-04's row should justify like S-01 and S-06.

17. **List formatting differs on S-05 only.** S-05 alone uses bold lead-in labels ("**Drive:** …"). The other six use plain bullets. Pick one style.

18. **Breadcrumb shows the internal workbook label "Sectors hub".** The hub's h1 is "Deck handling systems for seven offshore sectors" and the nav says "Sectors". The breadcrumb is also 11px mono at 72% white over a photo, which is hard to read. **Fix:** use the label "Sectors" and raise the opacity or size.

19. **Related equipment hierarchy is flat.** Row titles are 40px (`parts-sections.css:41`), the same size as the "Related equipment" h2, so the section heading doesn't lead. On keyboard focus, the outline sits tight against the title's left edge while the hover panel extends wider, giving two misaligned rectangles (`focus-subsea-rov-diving-13.png`).

20. **S-07 related equipment relevance.** Geotechnical and seismic winches are listed for defence buyers. This is copy-document-driven, but LARS, mooring/utility or ROV winches are likelier fits. It's a question for RTG.

21. **Proof bar unit typography.** "250 +" and "150 Te" set the "+" and the unit as superscripts with a gap. "Te" is a unit, not an exponent, so set it on the baseline at a smaller size. This affects every page.

Checked and fine: no §6 drum core, length or flange dimensions, part numbers or GA drawings on S-06 or S-07. No banned words, exclamation marks or em-dashes in the S-06 or S-07 bodies. British spelling throughout. Contrast of body text (`--ink-2` on the sea ramp) and of captions (white on 72% `--sea-2`) passes AA. No colours clashing with the new palette and no leftover depth-gauge space were found.
