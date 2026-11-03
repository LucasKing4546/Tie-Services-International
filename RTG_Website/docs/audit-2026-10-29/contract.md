# Contract manufacturing audit (C-00 to C-09), review only

Screenshots: `scratchpad/audit/contract/*.png` (full-page desktop 1440 / mobile 390), plus `c08-form-focus.png`, `c08-after-submit.png`, `c08-mobile-form.png`. Scripts: `scratchpad/pw/cm-form.mjs`, `cm-rm.mjs`.

## Integrity summary
| Page | h1 (one, matches workbook) | Status | Gaps / draft |
|---|---|---|---|
| C-00 Ladder | "Contract manufacturing" ✓ | 200, no console errors | none |
| C-01..C-04 Tier | "Tier N: …" ✓ | 200 | none |
| C-05 Service | "Bespoke design" ✓ | 200 | draft: true, skeleton + draft panel |
| C-06 Policy | "Design and IP protection" ✓ | 200 | none, but thin (see below) |
| C-07 Article | "EU-origin fabrication" ✓ | 200 | 1 `<Gap>` (July 2026 safeguard summary), so it is auto-noindexed |
| C-08 Form | "Capacity and lead times" ✓ | 200 | `<Gap>` quarter/year + 4 TO SUPPLY rows |
| C-09 Form | "Send us your documentation" ✓ | 200 | draft: true, **body empty, no form** |

No horizontal overflow at 390. No missing alt. The two "empty links" in report.json are the header/footer logo links (img alt carries the name), a false positive. §6: nothing found (no drum proportions, makes or part numbers; "Panel GA" in C-03 is the client's own document). No §8 banned words or exclamation marks.

## Critical
1. **C-09 has no form. It is the whole section's conversion endpoint.** `src/content/pages/c-09.mdx:1-4` is frontmatter only (`draft: true`), so Form.astro renders no `EnquiryForm` at all: H1, a ~250px empty section, then the draft panel (`contract-manufacturing_send-documentation-desktop.png`). It is the target of every primary CTA in the section: hero buttons on C-00, C-01, C-02, C-03 and C-04, "Request the NDA" on C-06, and y-01. All 7 pages hand an AV02 buyer to a dead end. The workbook blocks "NDA first / what to send by tier / what you get back and when / upload form" are all missing, and the CTA "Submit under NDA" is never used. Fix: author c-09.mdx with a `form:` (company, tier select, scope, file-upload field or a "we will send a secure upload link after NDA" step, name, email) plus the three prose blocks. Until then, point the CTAs at /contact/ or C-08.

## High
2. **Forms have no validation or error states (Form template, C-08 now and C-09 when built).** `EnquiryForm.astro:21` sets `novalidate`, and no script validates. Submitting an empty form navigates to `…/capacity-lead-times/#`, focus drops to `<body>`, and there are 0 `aria-invalid` and 0 error messages (`c08-after-submit.png`). An invalid email ("not-an-email") is accepted silently. Fix: drop `novalidate` for now (native bubbles), or add a small submit handler that sets `aria-invalid`, writes an error `<p id>` under each field (linked with `aria-describedby`), and moves focus to the first invalid field or an error summary.
3. **The IP-protection message does not land on C-06.** `c-06.mdx:12-18` is 5 bullets and one sentence (about 85 words against a 500-word target). There is no lede and no H2 (outline: H1 then footer H3s). Workbook blocks "how files are segregated", "the competitor question answered" and "NDA download" are absent. The competitor question ("you build your own winches, so why would we hand you ours?") is the objection this page exists to answer, and it is never asked. Policy.astro:84-86 claims the page carries it "as flowing prose", which it does not. The only CTA ("Request the NDA") goes to the empty C-09 (item 1). Fix: add a lede, then H2 sections for The commitment / How your files are kept apart / "You make winches too" / Get the NDA, and give the NDA a real request path.
4. **Invisible hero "image" announced to screen readers, and it exposes production briefs.** On C-00..C-04, PageHero.astro:33-37 gives `.phero-media` `role="img"` with the image brief as `aria-label` whenever MEDIA has no photo. The drawing-grid `::before` that used to make it visible is gone (computed `content: none`; only the orphaned `blocks.css:91` `.phero-media::before{background-size…}` remains). Screen readers announce "image, Welder at work, arc light, correct PPE, honest not staged. 1600×900." for something sighted users cannot see, and the right half of the desktop hero is blank. Fix: drop role/aria-label when there is no photo (PageHero.astro:36-37), and delete blocks.css:91 and the stale comment at :65-67. This is site-wide.

## Medium
5. **Tier pages have no sibling-tier navigation.** Tier.astro:59-66 only renders "The other tiers" when `related` is set, and none of c-01..c-04 set it. The doc comment (Tier.astro:9-12) says they "already list exactly its three sibling tiers". A buyer comparing tiers can only go back through the breadcrumb. Fix: add `related: [C-0x, …]` to each tier's frontmatter (or derive the three siblings in the template).
6. **Two-column `.prose.lists` seam (C-00, C-01..C-04).** The right column's first H2 keeps `border-top` and `padding-top:18px` while the left one does not, so "Required from you" sits 18px lower under a hairline the left column lacks (`…structural-fabrication-desktop.png`, `…automation-test-commissioning-desktop.png`). On C-00 the column break also strands "How we protect your design and IP" at the top of the right column, cut off from the IP list it belongs to (`contract-manufacturing-desktop.png`). Source: blocks.css:698-702. Fix: replace CSS columns with a 2-col grid of heading+list groups, or put `break-before:avoid` on the link paragraph and drop the h2 border inside `.lists`.
7. **Workbook blocks missing on the hub and the tiers.** C-00: "what you no longer do", "what we need from you", "references". C-02: "what you no longer do", "reference". C-03: "panel build" is only implied. C-04: "resourcing note". C-07: no headed "what we supply / what we cannot advise on / disclaimer", and Article.astro:3-4 promises a `.warn` disclaimer and `draft: true`, neither of which exists. Fix: add the blocks as short H2+list groups (copy from RTG where it is missing) and correct the stale doc comments.
8. **C-08 left column floats down by about 150px.** `parts-sections.css:137` `.two{align-items:center}` overrides blocks.css:257 `start`, so the gap marker and spec table start well below the form top (`contract-manufacturing_capacity-lead-times-desktop.png`). Fix: `.two:has(.form){align-items:start}`.
9. **C-08 "What happens next" talks about datasheets and GA drawings on a capacity request.** Form.astro:53-57 hard-codes the three steps for every form. Fix: make the steps a frontmatter field (default as now) and give C-08/C-09 their own: reply with slots by tier, then NDA, then a quotation.
10. **The form comes last on mobile.** On C-08 at 390 the form starts about 1,000px below the hero, after the table and the "what happens next" card (`c08-mobile-form.png`). Fix: `order:-1` on the form column under 900px, or put the steps after the form.
11. **No `autocomplete` tokens on the form fields** (WCAG 1.3.5). company/name/email/phone have none (FormField.astro:22). Fix: pass `autocomplete` through FieldSpec (organization, name, email, tel).
12. **Field hints are not programmatically linked.** "What is to be built, and roughly how much of it" is a loose `<p>` (FormField.astro:24). Fix: `id={name+'-hint'}` plus `aria-describedby` on the control.
13. **The closing CTA band is a lone button.** On the tiers, C-06 and C-07, PageEnding renders a CtaBand with no heading or body: just the same button as the hero, floating in about 250px of empty band (`…structural-fabrication-desktop.png` y≈1190). The workbook's per-page CTAs ("Send drawings for a budget quotation", "Discuss a trial assembly", "Discuss a package", "Discuss a full-scope build", "Request our standard NDA") are never used, and all four tiers say "Send documentation". Fix: give each page a `cta:` with heading + workbook label, or suppress the band when it only duplicates the hero.
14. **C-07 byline floats in its own section.** "BY ROMICA TIE GROUP" sits in a `Section size="sm"` (Article.astro byline block) with about 150px of dead water above and below, detached from the body (`contract-manufacturing_eu-origin-fabrication-desktop.png`). There is also no date. The Gap marker butts against the following paragraph with no spacing. Fix: render the byline inside the body section above the prose, and add `published`.

## Low
15. **Hierarchy inversion on C-00:** the tier row titles (~36px) are larger than the section H2 "Four tiers, cumulative" (~30px) above them (`contract-manufacturing-desktop.png`). Fix: drop the IndexRows title size or raise the section head.
16. **Breadcrumbs use workbook `name`s:** "Contract manufacturing hub", "Tier 4 automation, test & commissioning" ("&", no colon) and "Your IP, protected", which disagree with the H1s. Fix: crumb label from `h1` (or a `crumb` field). Site-wide.
17. **Tier names drift on C-08:** the table says "Tier 3: hydraulic and electrical" and "Tier 4: test and commissioning" (c-08.mdx:49-50), while the select and the tier pages use the full names. Fix: use the same four strings.
18. **Hard-coded figures:** "150 Te" in c-00.mdx:27 and c-04.mdx:3, and "12 m and 10 t" in c-00.mdx:18 and c-01.mdx:3, bypass PROOF (the c-04 body correctly uses `<Fig of="loadTestTe"/>`). Fix: use `<Fig>` in bodies, and add machining to PROOF.
19. **`<html lang="en">`** (Base.astro:55) on a British-English site. Fix: `en-GB`. Site-wide.
20. **Heading skip on draft pages:** on C-05 and C-09 the outline goes H1 then H3 (DraftPanel). Fix: make the DraftPanel heading an h2. Site-wide, dev-only.
21. **Consent checkbox is required but unmarked** (EnquiryForm.astro:30): no `*`, while the hint says "Fields marked * are required". Fix: add the marker.
22. **Stale doc comments:** Ladder.astro:12-24 (describes the ScrollTrack/TierCard and `steps` the page no longer uses), Tier.astro:9-12, Policy.astro:84-86, Article.astro:3-8.

## Intentional gaps (not bugs)
C-05 (draft, skeleton), C-07 (`<Gap>` on the safeguard summary), C-08 (`<Gap>` quarter/year, 4 × TO SUPPLY). All render cleanly. C-09 is draft, but it is load-bearing (item 1).

## Checked and fine
- Honeypot `name="website"`: present, off-screen, `tabindex=-1`, `aria-hidden`.
- Form labels are above the fields and associated with them.
- Keyboard order: company, tier, scope, date, name, email, phone, consent, privacy link.
- Focus: a white 2px outline on every control.
- Reduced motion: the H1 reveal is static.
- No overflow at 390.
- Contrast of ink/ink-2 on the teal ramp is fine.
