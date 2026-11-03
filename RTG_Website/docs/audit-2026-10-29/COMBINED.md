# RTG site audit: combined findings (2026-10-29)

12 review agents, 70 pages plus the shared design system. Review only, nothing changed.
Detailed reports, with file:line and screenshots, are next to this file:
home, equipment-hubs, equipment-winches, equipment-other, sectors-a/b/c, contract,
lifecycle-yards, proof-resources, about-contact-legal, design-system.

**What passed everywhere:**
- One h1 per page, matching the workbook.
- No horizontal overflow at 390 px.
- No missing alt text and no console errors.
- No §6 drum dimensions, part numbers or GA drawings.
- No banned words, exclamation marks or em dashes.
- Reduced motion honoured (except the hoist line).
- The finder works: 182 of 182 links resolve.
- Client names and claims on the proof pages match the copy document.

---

## A. Needs RTG / owner decision (content, rights, figures)

| # | Sev | Issue | Where |
|---|---|---|---|
| A1 | Critical | **Third-party defence collage ships in the build.** It is registered in media.ts (IMG-S07-A) and emitted to dist, though no page uses it. | media.ts:63,113 |
| A2 | Critical | **Third-party ROV CGI renders captioned as RTG equipment.** | S-06 (IMG-S06-B/C), homepage sector card |
| A3 | High | **Images whose ownership is not established:**<br>• S-04: Sercel acquisition diagram (IMG-S04-D).<br>• S-04: reel-deck photo from a slide deck, with "19" burned in.<br>• S-01: CGI vessel render captioned "Containerised survey spread on deck" (IMG-S01-C).<br>• S-07: camera date stamps "2016/05/19". | media.ts, s-0x.mdx |
| A4 | Critical | **Sustainability page publishes writer's notes as copy** ("Understatement is the right tone here…"). The same lede appears on the About card rails. | a-04.mdx:5,8 |
| A5 | High | **Y-03 shows approvals without certificate number or expiry**, which the copy document requires before publishing. Its wording also goes beyond the copy document ("all main structural welds", "DNV ship rules"). | y-03.mdx:23,29,42 |
| A6 | Medium | **"Lebus" grooving is a trade name** (§6 makes). It appears in about 10 places: e-01/02/05, s-01/05/06, home.ts, the workbook. | sitewide |
| A7 | High | **Figures that contradict each other:**<br>• Depth ceiling: 3,500 m (E-01 meta) vs 4,000 m (E-03, CLAUDE.md) vs 5,000/5,500 m (finder DS10/DS05).<br>• E-03 brake: 250 kg shown, but "1.5 × WLL 170" gives 255.<br>• DS83: 1,250 m vs 700 m.<br>• E-10: the 10 Te and 15 Te units have identical weights; 15 Te tension is TO SUPPLY yet listed at 15 Te.<br>• E-07: WLL and SWL mixed.<br>• Reply time "one working day" is unconfirmed. | e-01/03/07/10, equipment.ts, x-01/x-03 |
| A8 | High | **Datasheet index (regenerate after fixing):**<br>• E-10 family includes a winch (DS15) and a spooler (DS59).<br>• DS38 and DS63 are missing.<br>• A-frames, HPUs, DS07 and DS49A have no application or drive, so filters hide them.<br>• E-01 lists only 2 of 67 winch designs.<br>• Design names are internal shorthand ("W/O LW", "1 Ø", "4x200"). | build-equipment.mjs / workbook |
| A9 | High | **Workbook blocks missing with no Gap marker:**<br>• Homepage: 6 blocks (avatar doors and strips, testimonials, featured case, bulletin).<br>• Sectors: S-01/02/04/05/06/07 problem blocks; every sector body is 87 to 310 words against targets of 550 to 900.<br>• Contract manufacturing: C-00/02/04/06/07.<br>• Equipment: E-01/05/10/12.<br>• Lifecycle and yards: L-00/02/03, Y-00/01.<br>• Proof: P-06.<br>• About and careers: A-01, A-05. | per page |
| A10 | Medium | **No sector page leads with the buyer's problem (§8)**; each opens with a capability list. | s-01…s-07 |
| A11 | Medium | **Copy that promises things that don't exist:**<br>• "capacity published quarterly" (S-03).<br>• Privacy notice mentions a "bulletin" and a "role/message" field.<br>• R-03 shows an internal WordPress note.<br>• "CS-02" workbook code shown to buyers (S-02, L-00). | |

## B. Broken or below standard: fixable in code now

### Critical
| # | Issue | Where |
|---|---|---|
| B1 | **All 8 forms.**<br>• `novalidate` plus `action="#"` with no script, so an empty submit skips the required fields and lands on the 404 page.<br>• No error messages and no `aria-invalid`; red border only, at 1.8:1.<br>• No `autocomplete`; hints not linked with `aria-describedby`.<br>• "What happens next" is hard-coded to datasheets on every form. | EnquiryForm.astro:21, FormField.astro, Form.astro:53-57, parts-site.css:87-90 |
| B2 | **C-09 "Send documentation" has no form**, though it is the main CTA on 7 pages. **X-04 Aftersales has no form**, though /contact/ links there. | c-09.mdx, x-04.mdx |

### High
| # | Issue | Where |
|---|---|---|
| B3 | **Count-up figures render "0" in the HTML** (ProofBar about 40 pages, StatsStrip on products). | ProofBar.astro:31, StatsStrip.astro:26, motion.ts |
| B4 | **Mobile menu CTA** is navy on red, 2.45:1. | tokens.css:214 |
| B5 | **Header bar** is still the old off-white `rgba(238,242,250,.9)`, so there is a seam against the mist hero. | tokens.css:170 |
| B6 | **Closing CTA band** is headless and repeats the hero buttons on about 40 pages ("Talk to an engineer" ×3). The workbook CTAs are unused. P-00/07/08 have no CTA at all. | lib/blocks.ts:92, CtaBand |
| B7 | **Hero breadcrumbs over photos** measure 2–3:1. H1 sits over bright areas (S-05, E-00). | blocks.css:73-80 |
| B8 | **MediaBand:**<br>• Single-photo caption runs past the photo (S-07, E-10, E-00).<br>• S-04 strip is ragged.<br>• Blur-glass captions cover the photos and photos zoom on hover (§7). | parts-sections.css:20-35, blocks.css:153 |
| B9 | **Two-column `.prose.lists`:**<br>• Right column sits 10–50 px lower, with a stray rule.<br>• A body that is a single list leaves the right half empty (E-02/03/05/06).<br>• Lines get stranded at column tops (S-06, C-00). | blocks.css:698-702 |
| B10 | **Family design lists:**<br>• Winch-only columns show dashes for HPUs, A-frames and handling systems (E-07/09/11).<br>• Mobile figure labels use `display:none`, so readers lose their meaning. | DesignRow.astro:29-31, blocks.css:761 |
| B11 | **P-03 before/after placeholders**: the captions overlap. | blocks.css:375-391 |
| B12 | **Homepage hoist line** is clipped by the hero after about 400 px and vanishes under the waves. It ignores reduced motion. | home.css:6,27-28, hoist.ts |
| B13 | **Empty hero placeholder** has `role="img"` and reads the shoot brief aloud. | PageHero.astro:36-37 |
| B14 | **Accessibility statement** still says sections pin while scrolling (stale since today). | z-04.mdx:26-27 |

### Medium
| # | Issue | Where |
|---|---|---|
| B15 | **Form layouts:**<br>• `.two{align-items:center}` pushes the left column down by 100–550 px.<br>• The form comes last on mobile.<br>• Input borders are 1.5:1. | parts-sections.css:137 |
| B16 | **Breadcrumbs and JSON-LD show workbook names** ("Sectors hub", "Case studies index", "CS-02 …"). Hub heading reads "Everything in X"; card links read "Read about X →". | Breadcrumbs.astro:20, Hub.astro:61, Card.astro:22 |
| B17 | **Card rails:** 390/430 px min-height leaves about 200 px empty per card. ScrollTrack and Carousel buttons differ. | blocks.css:363, layout.css:97 |
| B18 | **og:image returns 404 site-wide** (`/assets/og/*.jpg`). | Base.astro |
| B19 | **Cookie table is unreadable at 390 px** and its scroller can't be reached by keyboard. | parts-content.css:108-112 |
| B20 | **Proof hub:**<br>• Opens on an empty draft card (Y-04).<br>• Y-04 and R-02 have about 250 px of blank space.<br>• R-04 Resources is linked from nowhere. | Hub.astro, Form.astro:44 |
| B21 | **Tablet header:** the CTA is centred. **Mobile menu** doesn't close when focus leaves. | Header.astro |
| B22 | **Heading levels:**<br>• Draft panel h3 straight after the h1.<br>• Footer h3s without an h2.<br>• StepList h3s; Legal "On this page" h3.<br>• `lang="en"` should be `en-GB`. | various |
| B23 | **Design-system drift:**<br>• 21 radius values.<br>• About 12 focus-ring overrides.<br>• Heading line-height and tracking overridden.<br>• Scattered hover lifts.<br>• `.stats` defined three times.<br>• Dead rules and classes.<br>• Hidden eyebrows still rendered. | tokens/layout/parts-* css |
| B24 | **Homepage:**<br>• 3D models are royal blue `0x24478C`, which clashes with teal.<br>• Tier winch framing crops at tier 4.<br>• Home h2s come in 4 sizes.<br>• Equipment block is about 990 px tall.<br>• Showroom is drag-only (WCAG 2.5.7) and its 10 px labels are low contrast. | rtg3d.ts:13, home.css, home-scroll.ts |
| B25 | **Finder:**<br>• No "Clear filters".<br>• Placeholder contrast 2.8:1.<br>• Collapsed mobile filters don't show the active count.<br>• Exact DS match isn't ranked first. | EquipmentFinder.astro |
| B26 | **Spec tables:** styled by three conflicting stylesheets (zebra rows, 4 px padding, mono labels wrapping). Units orphan on mobile. | blocks.css:520, parts-content.css:3, ocean.css:60 |
| B27 | **Sticky datasheet pill** covers table rows. **Tap targets of 22 px** (`.arw` links, finder links). | |

Low items (copy polish, dashes, units, stale comments, hard-coded figures not from PROOF) are in each section report.
