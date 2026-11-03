# Audit: sectors-b (S-03, S-04, S-05)

Pages: `/sectors/offshore-wind-subsea-cables/` (S-03), `/sectors/seismic/` (S-04), `/sectors/oceanographic-research/` (S-05).
Template `src/components/templates/Sector.astro`; bodies `src/content/pages/s-03..s-05.mdx`.
Evidence PNGs in `scratchpad/audit/sectors-b/` (full-page `sectors_*-desktop|mobile.png`, viewport `x-*`, `y-*`, `z-seismic-d-band.png`).
Scripts: `scratchpad/pw/sb-detail.mjs`, `sb-contrast.mjs`, `sb-rel.mjs`, `sb-band.mjs`.

## What passed
- One `<h1>` per page, each matching the workbook h1 word for word. Heading order is H1, then H2s, then the footer H3s.
- No horizontal overflow at 390 or 1440. No console errors apart from the deliberately blocked cookie script.
- Every `<img>` has alt text. The two "empty links" in report.json are the header and footer logo links, which contain an `<img alt="Romica Tie Group">`. That is a false positive.
- Keyboard: tab order is logical. Focus outlines are visible: 2px navy on the header, 2px white under water, 3px white on the index rows. No tap targets under 24px.
- Related-equipment rows are visible after a normal scroll and after jumping with the End key. In the snap helper's desktop shot of S-04 the rows are blank. That is an artefact of its 600px scroll steps: the `stag` reveal had not fired before the shot. Real users don't see it.
- No drum core, drum length or flange diameter. No GA drawings. No exclamation marks or §8 banned words. Spelling is British.
- Open markers (intentional, not bugs):
  - S-03: "Lead times" Gap.
  - S-04: "Duty rating" Gap.
  - S-05: "Who we work with" institution-names Gap.
  - All three are `draft: false` but still carry a Gap, so per §5b they are noindexed.

## Findings

### Critical
None.

### High
1. **S-04: third-party illustration published.**
   - `IMG-S04-D` (`src/assets/sectors/s04-acquisition.jpg`) is Sercel's acquisition diagram. Commit d1811d45 calls it the "Sercel-cropped source".
   - The `media.ts:16-23` header says third-party press and stock material is excluded. The provenance note only vouches for the `s0x-equipment-*` files, so this one is undocumented.
   - Fix: confirm a licence or remove it from `s-04.mdx:23-24` and `media.ts:107`.
2. **S-04: slide number baked into a photo.** `s04-reel-deck.jpg` (`IMG-S04-E`) has "19" in the top-right corner. It is visible in the band tile (`z-seismic-d-band.png`, top-right of the fourth tile). It also comes from a slide deck, so provenance is unrecorded, and it shows a third-party "NOREQ" liferaft. Fix: crop the corner out and confirm the photo is RTG's own.
3. **S-04: media band is not justified.** At 1440 the tiles measure 280x373, 280x421, 304x187 and 332x187, leaving a ragged row with a large empty area under the two landscape tiles (`z-seismic-d-band.png`).
   - Cause: `blocks.css:153` sets `min-width:min(280px,100%)`. That forces the portrait tiles wider than their flex-grow share, which breaks the equal-height maths `MediaBand.astro:25-28` relies on.
   - Fix: drop the min-width when tiles fit in one row, or give `.mband-plate` one fixed height with `object-fit:cover`.
4. **S-04 and S-05: workbook blocks missing.**
   - S-04 has no "The problem" block and no "proof" block (no case or reference). The `blocks` list is at `pages.ts:126`.
   - S-05 has no "Why a winch is part of the instrument" block (`pages.ts:140`). "Slow-speed control" only appears as a list item.
   - Fix: add both S-04 blocks and the S-05 block, or record the divergence in `Sector.astro`'s doc comment.
5. **All three pages: none leads with the buyer's problem (§8).** Every lede states RTG's capability (`s-03.mdx:3`, `s-04.mdx:3`, `s-05.mdx:3`) and the body opens with "What we supply" or a capability list. Fix: open each lede with the operator's problem, e.g. seismic: downtime mid-survey; research: a cast that doesn't repeat; wind: a crushed cable or a late spread.
6. **S-05 desktop: hero breadcrumb fails contrast.**
   - The crumbs are white at 0.72 opacity, about 11px mono, over bright fog (`x-oceanographic-research-d-hero.png`).
   - The background measured about 4.2:1 even against solid white. With the alpha applied it comes out around 3:1, below the 4.5:1 AA needs.
   - Cause: the left and bottom scrim is at its weakest at the top of the hero (`blocks.css:73-76`).
   - Fix: add a top-left stop to the scrim, or raise the crumb opacity on photo heroes.

### Medium
7. **S-05 desktop: hero H1 contrast and crop.**
   - Parts of "Research winches" sit on near-white mist. The worst 5% of pixels behind the H1 measure under 3:1.
   - The image's subject (the CTD frame) is hidden behind "repeatable casts" and the lede. On mobile it is under the CTA buttons (`x-oceanographic-research-m-hero.png`).
   - Fix: set `object-position` to move the subject right on desktop, and strengthen the scrim over the upper-left text block.
8. **S-04 and S-05: hard seam at the bottom of photo heroes.**
   - The top of the photo fades into the water through `mask-image` (`ocean.css:45`). The bottom has no fade: the photo ends in a straight line.
   - It ends on a scrim darkened to `--sea-2` (0.82 alpha), right above the lighter `--sea-0` ground of the next section. The result is a dark-to-light step on the "one continuous descent" (`x-seismic-d-hero.png` around y=810, `x-oceanographic-research-d-hero.png` around y=780).
   - Fix: give the bottom the same transparent fade, or end the scrim on `--sea-0`.
9. **S-04: caption plates cover the photos.**
   - The `figcaption` is an absolutely placed dark plate with `backdrop-filter: blur` (`parts-sections.css:20-23`). On the 187px landscape tiles it covers about 45% of the image, including the reel itself.
   - The blur is a glass effect, against §7's minimal surfaces.
   - It also contradicts `MediaBand.astro:3-4` ("the brief under each").
   - Fix: put the caption under the image, as `blocks.css:166` already styles it.
10. **S-04: alt text is announced twice.** ImageSlot uses `alt={brief}` (`ImageSlot.astro:75`) and the same brief is the `<figcaption>`, so screen readers hear every caption twice. Fix: `alt=""` inside a captioned figure, or write a distinct alt.
11. **S-05 (and the E-05 card on S-04 and S-05): a component make is named.** "Lebus grooved drums" (`s-05.mdx:25`, and the E-05 related-row blurb). LeBus is a trademark of LeBus International, and §6 bans component makes. Fix: "helically grooved (two-start) drums". The term also appears in e-01, e-02, e-05, s-01, s-06, home.ts and the workbook, so fix it sitewide.
12. **S-03: claim with nothing behind it.** "Fabrication and assembly capacity is published quarterly." (`s-03.mdx:44`). No page or link publishes it, and §5.7a lists "current capacity by tier" as RTG-to-supply. Fix: delete the sentence or fold it into the Gap.
13. **All three: workbook CTAs not used, and the ending repeats the hero.**
    - The workbook CTAs are:
      - S-03: "Check tensioner availability"
      - S-04: "Request the seismic range"
      - S-05: "Request the research winch datasheets" (`pages.ts:113,127,141`)
    - The pages use "Talk to an engineer" plus a link to the equipment page or datasheet.
    - `endingCta()` (`blocks.ts:92-93`) then repeats the same two buttons verbatim in the ending band.
    - S-05 has no datasheet route at all.
    - Fix: set `cta:` in each page's frontmatter to the workbook CTA.

### Low
14. **S-03: no hero media and no media band.** The page differs from the rest of the set: a bare teal hero with an empty right half (`sectors_offshore-wind-subsea-cables-desktop.png`). Expected, since S-03 has no photography yet (`media.ts:33-36`). Fix: add a `hero.media` ref (`IMG-S03-A`) so the placeholder plate shows what's needed and the layout matches S-04 and S-05.
15. **All three: column tops don't line up.** In the two-column lists, the right column's first H2 has a hairline above it and sits about 10-20px lower than the left column's first H2 (`blocks.css:699-701` with CSS columns). Fix: drop the border-top on the H2 that starts a column, or use a two-track grid.
16. **S-04 and S-05: Gap markers look rough.** The long Gaps render as a ragged stack of mono chips, one box per line (S-04 "Duty rating", five lines). On S-05 the red marker dot is stranded at the end of the prose line and the chip wraps below it. Intentional, but untidy. Fix: render the Gap as a block (not inline) when it stands alone in a paragraph.
17. **S-05 mobile: breadcrumb wraps.** "OCEANOGRAPHIC RESEARCH" drops to its own line as an orphaned chip (`x-oceanographic-research-m-hero.png`). Fix: truncate the current crumb or allow the chip to be shorter on mobile.
18. **S-04: the related equipment differs between widths in the full-page desktop capture.** This is a snapshot artefact only (see "What passed"). No fix is needed. It is noted in case another reviewer flags it from the same PNG.
