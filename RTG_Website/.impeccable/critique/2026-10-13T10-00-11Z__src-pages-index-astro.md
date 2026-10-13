---
target: homepage placement and styling
total_score: 19
max_score: 28
na_heuristics: 7,9,10
p0_count: 0
p1_count: 5
target_identity: "file:C:\\GitHub\\Tie-Services-International\\RTG_Website\\src\\pages\\index.astro"
target_fingerprint: "sha256:efd05e04fd3295ac402b9d05e9537a8d8136079a71f77bbd8827174ac4a71481"
target_path: "C:\\GitHub\\Tie-Services-International\\RTG_Website\\src\\pages\\index.astro"
timestamp: 2026-10-13T10-00-11Z
slug: src-pages-index-astro
---
Method: dual-agent (A: design review, B: detector and measured layout). Viewports 1440, 1280, 820, 390.

## Design health score: 19/28 (Acceptable, 68%). Heuristics 7, 9, 10 n/a.
1 Status 3 · 2 Real world 4 · 3 Control 2 · 4 Consistency 2 · 5 Error prevention 3 · 6 Recognition 3 · 8 Minimalist 2.

## Design specificity verdict
Authored for RTG (sky hero with vessel and hoist, gauge ending at the CPT record, winch assembling per tier). Execution fails below the fold at 1280x720 and on phones. Detector: 0 findings on markup; stylesheets not scanned. No console errors.

## Priority issues
1. [P1] Chat pill (.chat-open, parts-site.css, fixed left 20 bottom 20) and depth readout (.gauge-read, ocean.css, right 28px) sit on content. Chat covers the "Book a condition assessment" CTA at 1280x720, section headings, Equipment rows, footer copyright; readout covers sector card text, Equipment row arrows, tier bullets (13 overlaps at 1440, 21 at 1280). Fix: icon-only or docked chat; metres-only readout under ~1560px. Command: layout.
2. [P1] Horizontal overflow at <=820px: document up to 1108px wide at 820; a 390 phone zooms out to as much as 539px and the menu button leaves the screen. Cause: #showcase .zs::before (lamp) unclipped once .zs goes position:static at max-width:820px in home.css. Fix: keep .zs clipping. Command: adapt.
3. [P1] Phone: #tiers .pin-stick is 879px of content in 844px with overflow hidden (link clipped; tier 04 last bullet collides with the step bar); showroom spec figures and picker sit on the 3D model, model cropped by gutters, heading double-indented (40 vs 20). Fix: under 900px drop the pin and stack tiers; reorder showroom. Command: adapt.
4. [P1] "Sectors" h2 under the fixed header at 1280x720 (top 72 vs header bottom 82) while pinned; hero headline ~14px under the header. Fix: .hz-stick padding-top for the header, trim spacing under 820px height. Command: layout.
5. [P1] Statement text set across the ship photograph (.stmt-bg opacity .38, vertical mask only). Fix: shift and mask the photo or lower opacity. Command: layout.

## Persona red flags
First-timer: no "quotation" or "datasheet" button on the page. Checker: proof figures shown twice with different sets and labels; showroom figures link nowhere. Phone: menu button off screen, tiers pin 3.6 screens with clipped content.

## Minor observations
Heading scale 60/56/40/36 with no rule; .sec.stmt padding 86/56; light shafts above content band the hero type; showroom spec labels 10px at ~3.6:1; picker buttons 36px tall, two arrow links 22px; secondary hero button outline invisible on sky; header CTA floats at 561-1080px; sector cards 20px radius vs documented 16px; sector card hover lift+fill+zoom; breakpoints 820 vs 900. Not checked: contrast over the gradient, canvas content.

## Questions
Why does the seabed hold a stats bar rather than the enquiry? Does the gauge readout earn 110px on a laptop? Would Sectors lose anything as a 4+3 grid?
