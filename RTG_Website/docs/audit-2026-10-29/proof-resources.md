# Audit: Proof and Resources (15 pages)

Screenshots, desktop 1440 and mobile 390: `scratchpad/audit/proof-resources/*.png`. Detail shots are named `x-*.png`. The checks are in `report.json`.

## Summary
- **Integrity:** all 15 pages return 200. Each has exactly one h1, and it matches the workbook h1. There are no console errors (only the expected OneTrust ERR_FAILED), no images without alt and no horizontal overflow at 390. The two "empty links" in report.json are false positives: they are the header and footer logo links, which carry an `<img alt>`.
- **Claims:** every client name on P-01 and P-07 matches the copy document: Fugro, HHI, and the P-07 lists word for word. "Re-certified" (P-01), "21REL-05", the test suite and "1.5 × WLL" (P-06) also come from the copy document. I found no unconfirmed certification or figure.
- **§5.3:** none of my pages links to a static datasheet, catalogue or pack file. There are no .pdf, .docx or .zip hrefs in dist. R-01 is a request form with the `website` honeypot present. It posts to `action="#"`, which is the known no-backend gap §5.2.
- **§6:** clean. No drum or flange dimensions, no makes, no GA drawings. R-01 describes the GA as issued per request only.
- **Copy:** no em/en dashes, exclamation marks or banned words, and spelling is British throughout.
- **Reduced motion:** honoured. Under `reduce`, `.rl`/`.fu` sit at opacity 1 with no transform.
- **Keyboard:** the P-03 compare handle is `role=slider` and responds to arrow keys (it reached `aria-valuenow` 38). P-01 rows show a 3px white focus outline. Track buttons are 44×44.

### Pages with intentional Gap / TO SUPPLY / draft markers (not counted as bugs)
- **Draft:** P-02, P-04, P-05, Y-04, R-00, R-02, R-03, R-04.
- **Gaps:** P-01 (headline figures), P-03 (assessment, reused, upgraded, tested, result), P-06 (video), P-07 (research institutions, permission), P-08 (attribution, two more testimonials).
- **Live and indexed:** only P-00 and R-01. P-01 also shows its own Gap marker.

---

## High

1. **P-03: the before/after placeholder captions overlap and can't be read.**
   - The "before" plate sits over the "after" plate. Its background is the translucent `var(--panel)` (blocks.css:556), so both shoot-brief captions print on top of each other.
   - On mobile, the IMG-16A and IMG-16B tags also stack.
   - This is on the only case study with real data.
   - Evidence: `x-p03-cmp-kbd.png`, `x-p03-cmp-mobile.png`; blocks.css:375-391.
   - Fix: give `.cmp-reveal .imgslot` an opaque ground (`background:var(--sea-1)`), or hide the base plate's caption while neither plate is a photo.
2. **R-01 (shared EnquiryForm): no `autocomplete` tokens, and hint text isn't linked to its field.**
   - The name, email and company fields have no `autocomplete`, which fails WCAG 1.3.5 (AA).
   - "We send the datasheet to this address…" and "What are you looking at?" have no `aria-describedby`. dist has 0 occurrences.
   - Evidence: EnquiryForm.astro.
   - Fix: add `autocomplete="name|email|organization"` and `aria-describedby` pointing at each hint id.
3. **P-00, P-07 and P-08 have no closing CTA.**
   - The workbook specifies one for each:
     - P-00: "Read the case studies"
     - P-07: "Ask for a reference in your sector"
     - P-08: "Talk to us"
   - None of these pages sets `cta` or hero `ctas`, so `endingCta()` (lib/blocks.ts:92) returns nothing. Each page ends on the proof bar and then the footer.
   - Fix: add `cta:` frontmatter to p-00.mdx, p-07.mdx and p-08.mdx.
4. **Y-04 and R-02: an empty `<Section>` leaves about 250px of blank space under the h1.**
   - Form.astro:44-74 always renders the Section and its `.two` wrapper, even when there is no body and no form.
   - Evidence: `proof_vendor-qualification-pack-desktop.png`.
   - Fix: render the Section only when `hasBody(entry) || data.form`.
5. **P-00 Track record: the draft Y-04 Vendor qualification pack leads the card track.**
   - Children come out in pages.ts row order, and Y-04 is row 635, before P-00. So an empty draft page sits ahead of Case studies, the order the copy document gives.
   - The cards are 430px tall but hold two lines of text, which works against "compact".
   - The workbook block "case study tiles" (individual cases) isn't present; there is one "Case studies" card instead.
   - Evidence: `proof-desktop.png`; Hub.astro:46-47, 115-124.
   - Fix: put curated `cards` first, in their frontmatter order. Drop the min-height on cards with no media. Optionally add the four case rows.

## Medium

6. **P-00: figures are hardcoded instead of read from PROOF.**
   - The lede "more than 1,500 deck machines and 250 projects for over 50 clients" (p-00.mdx:3) and the card blurb "150 Te" (p-00.mdx:11) are written out by hand.
   - Three versions of the same figure now coexist on one page: "more than 1,500" in the lede, "1,500" in the proof bar, "around 1,500" in the meta description.
   - Fix: build the lede from `PROOF`, or use `<Fig>`, and align the "+" with "more than".
7. **Internal workbook names show up in the UI and in BreadcrumbList JSON-LD.**
   - Visible examples:
     - Breadcrumbs: "Proof hub", "Case studies index", "CS-02 Refurbishment 21REL-05", "Vessel & client references", "Resources hub".
     - Hub headings: "Everything in case studies index", "Everything in proof".
     - Row title: "Technical notes index".
   - Evidence: Breadcrumbs.astro:20, seo.ts BreadcrumbList, Hub.astro:60-61, ChildCards.astro:44.
   - Fix: label crumbs, cards and headings from the h1 or nav label, and rephrase the hub heading (for example, "In this section").
8. **R-04 and P-01 point readers at empty pages, and one row makes an unsupported claim.**
   - On R-04, three of four rows lead to empty drafts (R-00, R-02, R-03). On P-01, three of four do (P-02, P-04, P-05).
   - The R-04 row blurbs are the meta descriptions (ChildCards.astro:46). The News row says "Updated monthly", but R-03 has no posts.
   - Fix: give R-04's cards a `blurb` in frontmatter without "Updated monthly", or hold drafts out of the list until they have content.
9. **R-04 is orphaned.**
   - `/resources/` is linked only from its own children's breadcrumbs: no header nav entry, no footer link (site.js nav).
   - Fix: add Resources to the footer (or the nav).
10. **R-01: the GA-drawing promise contradicts the form.**
    - The page says "General arrangement drawings are issued only against a named project" (Form.astro:56), but "Vessel or project" is optional (r-01.mdx:12).
    - That "What happens next" list is hardcoded datasheet copy, so it will be wrong on the catalogue and VQP forms.
    - Fix: make the project field required, or reword. Move the steps into frontmatter.
11. **R-01: headings run h1 → h3 → h2.**
    - The Note "Why we do it this way" renders as an h3 before the h2 "What happens next".
    - Fix: render the Note heading as h2, or make it a non-heading `<p class="note-h">`.
12. **R-01 mobile: the form starts about 2.5 screens down,** under the prose, the note and "What happens next".
    - Evidence: `resources_datasheets-mobile.png`.
    - Fix: below 768px, order the form before `.form-next`.
13. **P-06 is missing the workbook block "The stands".**
    - Only the h1 mentions the stands; there are no per-stand capacities. The page has no Gap marker for it either.
    - Fix: add `<Gap>RTG to supply: each stand's capacity and footprint.</Gap>`.
14. **P-07: client lists are long comma runs in 16px Archivo 800.**
    - They are hard to scan, and on mobile the value column is 189px wide.
    - Evidence: `proof_references-mobile.png`; computed `td` is 800 weight.
    - Fix: Inter 500, or one name per inline chip/list item.
15. **P-08 shows two opening quote marks.**
    - The `blockquote::before` “ glyph (parts-content.css:100) appears as well as the literal “…” in p-08.mdx:6.
    - P-08 also uses a markdown blockquote, not the template's `quotes` (which has the attribution slot), although the Proof.astro doc comment says P-08 uses `quotes`.
    - Fix: move it to `quotes:` frontmatter and drop the literal marks.
16. **Draft cases P-02, P-04 and P-05 all show a "Before and after photography: to be written" skeleton** (Case.astro:97-98, Skeleton.astro:24).
    - Before/after isn't a block of P-04 or P-05, and "to be written" is the wrong verb for photography.
    - Fix: skeleton only the workbook blocks, and use "to be supplied" for media.
17. **Hub draft "Section introduction" skeleton renders after the card list** (Hub.astro:128). On R-04 the "intro" sits below the rows.
    - Fix: move it above the ChildCards.
18. **Image-slot accessible names read out production notes.**
    - Examples: "…as IMG-16a. 1600×900." (ImageSlot via CompareSlot; PageHero.astro:36-37 on the P-03 and P-06 hero backgrounds).
    - Fix: strip refs and pixel sizes from `aria-label`. Real alt text is the known gap §5.6.

## Low

19. **Article JSON-LD on P-03 and P-06 has no `headline`, `datePublished` or `image`** (seo.ts:84-91; no `article.published` in frontmatter). Fix: add `headline: page.h1` and dates.
20. **P-03 and P-06 end on a bare row of buttons that repeats the hero CTAs**, with no heading. Evidence: `proof_test-facility-desktop.png` at about y1550. Fix: give `cta` a heading/body, or drop the repeat.
21. **The compare handle's focus ring is a full-height 46px box around the divider,** so three vertical lines appear (`x-p03-cmp-kbd.png`).
    - Fix: `.cmp-handle:focus-visible{outline:none}` and rely on the grip ring (blocks.css:405).
    - The comment at blocks.css:395-398 mentions a drop shadow that no longer exists.
22. **P-03 spec table:** the caption "Project" repeats the first row's label "Project" (p-03.mdx:25-26). Fix: caption "At a glance".
23. **Case.astro:66-68 uses inline `style="color:#fff"` and `text-align:center`,** bypassing tokens. Inactive today. Fix: move it to a class.
24. **R-03's draft outline shows an internal dev note on a public URL:** "must be merged onto the main domain from the WordPress subsite". It comes from the workbook blocks. Fix: filter it in the outline, or reword it in the workbook.
25. **Pages with no h2:** P-06, P-07 and P-08 have none, so the footer h3s follow the h1 directly. P-03's body uses bold run-in labels, not headings. Fix: give the proof sections a visually-hidden or real h2.

Known launch blocker (not new): the R-01 form submits to `#` (§5.2).
