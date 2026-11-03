# Audit: Lifecycle and Yards & Integrators (10 pages)

Pages: L-00 `/lifecycle/`, L-01, L-02 (Guide), L-03, L-04, L-05 (Form), Y-00 `/yards-integrators/`, Y-01, Y-02, Y-03 (Proof).
Evidence: screenshots in `scratchpad/audit/lifecycle-yards/` (`*-desktop.png`, `*-mobile.png`, `p-*.png` probes), `report.json`.
Probe scripts: `scratchpad/pw/ly-probe.mjs`, `ly-probe2.mjs`.

## Baseline (passes)
- All 10 pages return 200. Each has exactly one h1, and it matches the workbook h1 word for word. No images without alt, no horizontal overflow at 390, no console errors apart from the expected blocked OneTrust request.
- The "2 empty links" in report.json are the header and footer logo links. Both carry an `<img alt="Romica Tie Group">`, so this is a false positive.
- No em-dashes, exclamation marks, §8 banned words or US spellings in l-0*.mdx or y-00..03.mdx.
- §6: no drum core, drum length or flange figures, no component makes or part numbers, no GA drawings.
- Every certification, approval and figure is in `RTG_Website_Copy_Concise` (copy.txt lines 853–899): BV Mode II, the TÜV/DNV/LR WPS approvals, ISO 9606-1, ISO 9712 L2, EN 15614-1, IWE, 100% traceability, 12 m / 10 t, melt-and-pour, 150 Te, and the HHI/Damen/Fassmer/Freire references. Exceptions are listed below.
- Reduced motion: `.rl`, `.fu` and `.stag` content shows at opacity 1 with no transform from the start.
- Keyboard focus is visible: 2px navy on the header, 2px or 3px white under water. Tab order is logical.
- Gap / TO SUPPLY markers (intentional, these pages are noindexed): L-01 (lead-time table), L-03, L-04, Y-00 (inline "RTG to confirm" against the yard references), Y-01, Y-02, Y-03 (4 TO SUPPLY rows). All render cleanly.

## Findings

### Critical
1. **L-05 (P1 lead form): submitting loses the enquiry and lands on a 404.**
   - `EnquiryForm.astro:21` has `novalidate`, `method="post"` and `action="#"`, and no JS submit handler exists anywhere (grep for checkValidity, aria-invalid or submit listeners finds nothing).
   - Clicking "Book an assessment" on an empty form skips the required-field checks and POSTs. The static host answers with the 404 page "That page is not on this deck" (`p-l05-submit-empty.png`).
   - The missing backend is known (§5.2), but this is the visitor's actual experience and it affects all 8 forms.
   - Fix: until the backend exists, either drop `novalidate` or add a submit handler that calls `preventDefault()` and shows an inline "not live yet, email/phone" message.

### High
2. **Y-03 publishes approvals without the certificate number or validity that the copy document makes a condition of publishing.**
   - copy.txt:900 says "Publish only rows with a confirmed certificate number and expiry date."
   - Y-03 shows BV Mode II, welder qualification, WPS, NDT and the other rows with no number and no expiry. The workbook blocks "who issued it" and "validity" are missing for every row.
   - The footnote (`y-03.mdx:42`, "Rows marked to be confirmed are published once RTG supplies…") contradicts the page, which already shows those rows as "To be confirmed".
   - Fix: add an issuer/validity column, with TO SUPPLY wherever validity is unknown. Reword the footnote to "Certificate numbers and expiry dates are added once confirmed by RTG", or hold the page until RTG decides.
3. **Y-03 wording goes beyond the copy document (§8).**
   - `y-03.mdx:29` says "100% on **all** main structural welds". The source says "100% on main structural welds".
   - `y-03.mdx:23` says "DNV **ship rules** Pt.2 Ch.4". The source says "DNV Pt.2 Ch.4".
   - Fix: use the copy document's wording exactly.
4. **L-05 "What happens next" promises a process that is not built and does not fit this form.**
   - `Form.astro:55-56` is hard-coded on all 8 forms: "Datasheets are issued to a named recipient, watermarked with a unique serial" and "General arrangement drawings are issued only against a named project."
   - Gated delivery does not exist yet (§5.3), and neither line is relevant to booking a condition assessment.
   - Fix: let each form supply its own steps through frontmatter, and show the datasheet/GA lines only on the datasheet and GA request forms.
5. **L-05 form fails WCAG 2.2 AA (1.3.5 Identify Input Purpose, plus 1.3.1).**
   - None of the name, email, phone or company inputs has an `autocomplete` value (`FormField.astro:22`).
   - The hints ("Where the equipment is now", "When the equipment can be released") are not tied to their inputs with `aria-describedby`.
   - Fix: add an `autocomplete` value to FieldSpec (name, organization, email, tel). Give each hint an id and reference it from `aria-describedby`.
6. **Workbook blocks are missing without a Gap, so the gap is invisible and L-00 is indexed.**
   - L-00: "Why now (fleet age)" and "lead times" are absent (`l-00.mdx`).
   - Y-00: "capacity" is absent.
   - Y-01: "programme adherence" is absent.
   - L-02: "what an assessment covers" is absent; it has only the CTA.
   - L-03 has no "What class requires" / "equipment we did not build" sections: everything sits in one 4-bullet list with no h2.
   - Fix: add a `<Gap>` for each block the copy document does not cover. On L-02, reuse the six "Assessment covers" bullets from L-05.

### Medium
7. **StepList connector line is broken on the new palette (L-01, L-02).**
   - Each step has a `border-top` hairline. The `::after` connector runs from below the disc to `bottom:-34px` (`parts-content.css:60-61`), so it stops at the next row's hairline and leaves a stub with a 34px gap before the next disc.
   - The result is two competing structures: row rules plus disconnected stubs (`p-l01-steps-d.png`, `p-l01-steps-m.png`).
   - The `--panel-2` dark disc also reads as a heavy blot on the light teal at the top of the page.
   - Fix: pick one. Either drop the connector and keep the rules, or drop the rules and run the connector through to the next disc (`bottom: calc(-1 * padding - var(--nb) - 8px)`). Consider a 1px `--rule` outline disc instead of the dark fill.
8. **Heading levels skip on L-01 and L-02.** Both go h1 → h3 (the step titles) with no h2 (`StepList.astro:26`). L-03, L-04, Y-01 and Y-02 have no h2 at all: h1, then the footer's h3s.
   - Fix: add a visually hidden or real h2 ("How a refurbishment runs" / "Six factors") above StepList, and pass a level prop.
9. **Hub card heading reads as machine output.**
   - `Hub.astro:61` produces "Everything in yards" and "Everything in lifecycle". At `max-width:16ch` (`blocks.css:346`) the second wraps to "Everything / in lifecycle" (`p-l00-track.png`).
   - Fix: use proper headings ("Lifecycle services", "Shipyard services"), or add a `trackHeading` frontmatter field; allow ~22ch.
10. **L-00 and Y-00 have the same template but different layouts.**
    - L-00 shows a 5-card swipe rail; Y-00 shows 3 index rows, because TRACK_MIN = 5 (`ChildCards.astro:34`). A buyer moving between the two hubs sees two designs.
    - On L-00 at 1440 the rail shows 3.4 cards of 430px height, with about 200px empty inside each.
    - Fix: accept the difference but trim the card min-height, or use IndexRows for both hubs.
11. **Card CTA text is clumsy.**
    - `Card.astro:22` builds "Read about Re-certification and class renewal →", which wraps at 1440 and leaves the arrow on a line of its own (`p-l00-track.png`). It also builds "Read about Refurbish, upgrade or replace? →".
    - Fix: put `&nbsp;` before the arrow and use a fixed label ("Read more →" or "Open") instead of repeating the title.
12. **Y-00 intro is visually unbalanced.**
    - The "Approvals:" paragraph is set at lede/display size in the left column, with a bold run-in label. "Yard references:" is body size in the right column next to a mono gap pill (`yards-integrators-desktop.png`).
    - Fix: make both blocks the same scale, e.g. a two-row definition list (Approvals / Yard references). Don't let the first paragraph take the lead-para treatment.
13. **L-00 intro leaves half the screen empty.** The single case-study sentence gets the "two-column lead-para" treatment, so the right column is empty. About 150px of air separates it from the rail (`lifecycle-desktop.png`).
    - Fix: span the sentence across the width or pair it with the CS-02 figure. Tighten the section padding.
14. **L-05 form inputs fail 1.4.11 non-text contrast.**
    - The border is `rgba(220,231,234,.18)` over a 5.5% white fill on a dark panel, which is about 1.6:1 against its surroundings.
    - Labels are 11.5px uppercase mono (`p-l05-focus.png`).
    - Fix: raise the border to about `rgba(220,231,234,.45)` (≥3:1). Labels should be ≥12px, or in sentence case at Inter 14px.
15. **L-05 layout misalignment.** The left column ("Assessment covers") starts about 100px below the top of the form card, leaving an empty band top-left (`lifecycle_condition-assessment-desktop.png`).
    - Fix: `align-items:start` on `.two` for Form.
16. **L-02 Article JSON-LD is incomplete.** It has `name` but no `headline`, `datePublished` or `dateModified`, and `isPartOf` points at the Organization rather than the WebSite.
    - Google's Article rich result requires `headline`.
    - Fix: emit `headline` (page.h1) and `dateModified` (frontmatter `updated`) in `articleJsonLd()`, and point `isPartOf` at `#website`.

### Low
17. **Hardcoded 150 Te where L-03 and Y-00 use `<Fig of="loadTestTe">`.**
    - Locations: `l-00.mdx:19` (card), `l-01.mdx:22` (step), `y-03.mdx:31` ("150 tonnes").
    - CLAUDE.md §3 says to take figures from PROOF. Fix: interpolate them, or note them for the next correction pass.
18. **Section naming drifts.** Nav "Shipyards", footer "Shipyards & integrators", breadcrumb "Yards & integrators hub", h2 "Everything in yards". The breadcrumbs also show "Lifecycle hub" and "Refurbishment & Upgrade" (workbook internal names in title case with &).
    - Fix: use a single public label per section, "Lifecycle" and "Shipyards & integrators", in sentence case.
19. **CTA labels differ from the workbook CTAs.** These follow the copy document's buttons, so they may be intended. Confirm.
    - L-03: "Book an assessment" vs workbook "Arrange re-certification".
    - L-04: "Aftersales and spares" vs "Request a spares quotation".
    - Y-01: "Vendor qualification pack" vs "Discuss a package".
    - Y-02: "Request a quotation" vs "Discuss a newbuild programme".
20. **Short pages repeat the same CTA pair twice in about 500px.** On L-03, L-04, Y-01 and Y-02 the hero buttons are repeated by PageEnding just below a 4-bullet list (`lifecycle_recertification-class-renewal-desktop.png`).
    - Fix: drop the hero CTAs on Service pages whose body is under about 6 lines, or drop the PageEnding buttons.
21. **Y-03 hierarchy is compressed.** The h2 "What can be checked" is set nearly at h1 scale.
    - The "Workshop recognition" note "Bureau Veritas" repeats the value (`y-03.mdx:13`).
    - Table keys are 11px uppercase mono (all caps; §7 says sentence case).
22. **L-01 "Lead times" sits under a rule that spans only the prose width (about half the page)**, while every other rule on the page is full width (`lifecycle_refurbishment-upgrade-desktop.png`).
23. **PageHero placeholders expose the shoot brief to screen readers.**
    - With no photo, `role="img"` uses `aria-label={media.brief}`, so L-01 announces "Before and after of the same machine at a matched angle. 1600×900." (`PageHero.astro:36-37`).
    - Fix: mark the placeholder `aria-hidden="true"`; the brief belongs in a data attribute.
24. **Stale doc comments after today's change.**
    - `ChildCards.astro:25-33` still talks about the "full-bleed navy set-piece" and "the pin refuses to engage".
    - `Form.astro:8-11` says gated pages stay indexable and that Base only noindexes off-map pages. That contradicts §5b.
25. **Home LifecycleSteps (palette check).**
    - The colours are fine on the abyss ground: white h2, `#BFD2D8` lede, red pill, outline button.
    - The component is no longer a set of steps (just heading + lede + 2 CTAs), so the name is stale.
    - It has about 200px of empty space above the heading at 1440 (`p-home-lifecycle-d.png`).
    - The body text duplicates L-00's CS-02 sentence.
