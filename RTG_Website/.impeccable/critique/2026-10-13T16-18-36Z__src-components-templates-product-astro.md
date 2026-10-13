---
target: equipment pages E-00 to E-12
total_score: 26
max_score: 36
na_heuristics: 10
p0_count: 0
p1_count: 0
target_identity: "file:C:\\GitHub\\Tie-Services-International\\RTG_Website\\src\\components\\templates\\Product.astro"
target_fingerprint: "sha256:391ac5bbfab26df1274c82f7a614cdbac34807172ed104025c5ccded0714d2a8"
target_path: "C:\\GitHub\\Tie-Services-International\\RTG_Website\\src\\components\\templates\\Product.astro"
timestamp: 2026-10-13T16-18-36Z
slug: src-components-templates-product-astro
---
Method: dual-agent (A: design review from screenshots, B: detector and measured layout). Thirteen equipment pages E-00 to E-12 at 1440, 1024 and 390 wide.

## Design health score: 26/36 (Good, 72%). Heuristic 10 n/a.
1 Status 3, 2 Real world 3, 3 Control 3, 4 Consistency 2, 5 Error prevention 3, 6 Recognition 3, 7 Flexibility 3, 8 Minimalist 3, 9 Error recovery 3.

## Detector and measurements
Detector: 0 findings. No horizontal overflow, no broken links (141 checked), no console errors, no missing alt, no distorted images, one h1 per page, finder counts match visible rows for all 17 chips.

## Fixed in this pass
E-10 headline stat read "10 to 10 Te" (count-up mangled a range); E-03 h1 clipped "oceanographic"; finder "Show all" button showed the browser's grey face; E-06 configuration chips both read "30 Te WLL"; lone photo bands ran up to 1256px tall; uneven gap before photo bands (172 vs 86px); phone breadcrumbs scrolled out of sight; "Applications" heading larger than configuration headings; product h1 held to a narrow column with no photo beside it; finder row link wrapping and mixed labels; datasheet names with unspaced units; sub-hub track heading said "Everything in equipment"; E-07 pill label differed from its hero button; phone hero text on unscrimmed photos.

## Open
1. [P2] Finder on a phone: rows are about 216px tall, so "Show all" on winches is about 18 screens, and the filter block is a full screen above the results it changes.
2. [P2] E-08, E-11, E-12 are thin beside their siblings (no image, no spec table; E-11 and E-12 have no Applications section and no h2), and E-08 and E-11 offer "Request the datasheet" with nothing on the page to say what it covers.
3. [P2] Finder names carry the datasheet's rounded load beside the measured one ("7.5 Te WLL" beside 7.36 Te).
4. [P2] The datasheet pill and, at 1024 wide, the depth readout pass over body text and footer links while scrolling.
5. [P3] Hub card titles are Title Case with "&" (from the page map names) against sentence-case h1s; stats strip leaves one stat alone on a second row on phones; tap targets under 44px tall in footer and breadcrumb links.
