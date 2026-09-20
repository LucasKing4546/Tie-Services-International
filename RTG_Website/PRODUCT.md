# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users
Technical, sceptical buyers of heavy marine deck equipment, split into three routes: the **Operator** (vessel operations manager wanting new equipment, refurbishment or support), the **Design Authority** (owns the design and IP, wants a factory) and the **Yard & Integrator** (builds or refits vessels, wants capacity and certification). They are judging RTG against a specification, often for a vessel with a sailing date.

## Product Purpose
The marketing and evidence site for Romica Tie Group (RTG): British-designed, Romanian-manufactured winches, launch and recovery systems, cable and pipe tensioners, cranes and power units for research, survey and geotechnical vessels. 70 pages across 17 templates replace a legacy PHP site. Success is a qualified enquiry: a datasheet request or a quotation request.

## Positioning
- Equipment built to the duty (tool, depth, load, deck), not picked from a catalogue, with representative specifications published openly.
- Every machine proof loaded on RTG's own stands, up to 150 Te, before dispatch.
- An honest refurbish-or-replace assessment, including saying when a machine is not worth rebuilding.

## Operating Context
Buyers arrive from sector, equipment or lifecycle routes. Full datasheets and dimensioned general arrangements are never published; they are issued on request, watermarked per recipient. Content arrives from RTG in periodic drops (photography, docx copy, datasheet PDFs) organised by sector or equipment family and is mapped to pages via the page-map workbook and MDX bodies.

## Capabilities and Constraints
- Astro 5 static site, MDX page bodies, page metadata generated from `research/RTG_Website_Page_Map.xlsx` (never hand-edited).
- Never publish dimensioned GA drawings, drum core/length/flange dimensions or component makes and part numbers (enforced by `npm run audit:protection`).
- Never claim a certification, client name or figure not confirmed by RTG; unconfirmed items are marked with a visible gap.
- Undecided: canonical host, form backend, gated datasheet delivery, consent management, self-hosted fonts, legacy URL redirects.

## Brand Commitments
- The RTG logo and the "Romica Tie Group" name (canonical host and legacy "Romica Engineering" naming still to be resolved).
- A plain, evidence-led voice: British English, concrete figures over adjectives, no marketing clichés, no exclamation marks.

## Evidence on Hand
Real camera photography and datasheets for most equipment families (`src/assets/`), sector copy for all seven sectors, verified proof figures in `src/data/site.js` (22 years, 1,500 machines, 250 projects, 50 clients, 3,000 m CPT depth record, 150 Te load test). Absent and not to be fabricated: client permissions, certificate numbers and dates, crane photography and datasheets, contact details, testimonials, most case studies. See `docs/RTG-information-requests.txt`.

## Product Principles
1. Evidence beats adjectives: a claim without a number, a photo or a datasheet is a gap, not copy.
2. Lead with the buyer's problem, not RTG's capability.
3. Show the real machine: every configuration with its own photographs and specification.
4. Publish the box, not the arrangement inside it.
5. Say what is not confirmed, visibly, rather than filling it in.

## Accessibility & Inclusion
Target WCAG 2.2 AA: one h1 per page, skip link, visible focus, full keyboard operation, prefers-reduced-motion honoured.
