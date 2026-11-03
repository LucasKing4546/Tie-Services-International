# Audit brief (shared by every review agent)

Repo: C:\GitHub\Tie-Services-International\RTG_Website — Astro 5 static site for Romica Tie Group (RTG), marine deck equipment.

**REVIEW ONLY. Do not edit, create or delete any file in the repo.** Other agents are auditing other sections in parallel.

## Read first
- The repo's `CLAUDE.md`: §2 Definition of done, §4 template notes, §5 known gaps, §6 banned content, §7 design system, §8 tone.
- `src/data/pages.ts` (generated, read-only): for each of your pages its title, meta, h1, CTA and `blocks` list — the content blocks the page must contain.
- The template component in `src/components/templates/` for your pages (its doc comment records deliberate divergences from the plan) and the page bodies in `src/content/pages/<id>.mdx`.

## Context: what changed today (commit 7e032005)
- Carousels / card rails (`ScrollTrack`, `Carousel`) no longer move with page scroll; they are swipe/drag + prev/next buttons. Nothing pins.
- The water is now the ambient teal concept palette: `--sky #DCE7EA` mist, `--sea-0 #1F5467`, `--sea-1 #0D2B3B`, `--sea-2 #061520`, `--ink-2 #BFD2D8`. Header stays a light bar with logo navy; footer is solid logo navy `#031d5b`; red `#AB3241` for fills/buttons only. No yellow.
- The depth gauge was removed. Product pages lost their "Applications" tag lists (deliberate).
Look for leftovers of these: odd empty space, orphaned styles, seams, colours that clash with the new ramp.

## Tools
1. Invoke the Skill tool with skill `impeccable` (use its critique / audit guidance) and skill `design-taste-frontend`. Apply their checklists to what you see.
2. The built site is served at http://localhost:4330 (already running — never start or stop servers).
   Screenshot helper (pass several paths at once):
   ```
   cd "C:/Users/lucas/AppData/Local/Temp/claude/C--GitHub-Tie-Services-International-RTG-Website/897be5d4-7576-46f8-931f-98c3e59754b1/scratchpad/pw" && node snap.mjs ../audit/<your-dir> /path/one/ /path/two/
   ```
   Writes full-page desktop (1440) and mobile (390) PNGs plus `report.json` (h1s, heading outline, imgs without alt, horizontal overflow, RTG-to-supply gap text, console errors, empty links). Ignore one `net::ERR_FAILED` per page — the cookie banner script is deliberately blocked. View PNGs with the Read tool. Full-page shots can be very tall; for detail write your own small playwright-core script in that same `pw` folder (copy snap.mjs's launch code) to take viewport-sized shots at scroll positions, test hover/focus, keyboard order, interactive widgets, forms, and `page.emulateMedia({ reducedMotion: 'reduce' })`.
3. Read the source for everything you flag so findings cite file:line.

## Check
- **Integrity:** exactly one h1 matching the workbook h1's intent; every workbook block present; heading order; broken links/images; console errors.
- **Design:** hierarchy, spacing rhythm, alignment, type scale, density ("compact, one idea per screen"), contrast on the teal ramp, §7 rules (no shadows/glows/textures, 1px hairline cards with 16px radius, pill buttons, no red text on water, sentence-case headings).
- **Gaps:** `<Gap>` / "RTG to supply" / TO SUPPLY markers and draft pages are intentional. Do not report them as bugs — list which of your pages carry them, and flag only if they look broken or ugly.
- **Formatting:** typos, British English, §8 banned words, exclamation marks, orphan words, awkward line breaks, table formatting, list formatting.
- **Visual formatting** at desktop AND mobile (390): overflow, cramped or broken layouts, image cropping, tap target size.
- **Accessibility:** visible focus, keyboard operation, reduced motion, alt text, contrast (WCAG 2.2 AA).
- **Consistency** across your pages and with the rest of the site.
- **§6:** no drum core diameter / drum length / flange diameter, no component makes or part numbers, no GA drawings.

## Output
Write the full report to `C:/Users/lucas/AppData/Local/Temp/claude/C--GitHub-Tie-Services-International-RTG-Website/897be5d4-7576-46f8-931f-98c3e59754b1/scratchpad/audit/<your-dir>.md`.
Then reply with a concise list (max ~25 items) ranked **Critical / High / Medium / Low**. Each item: page(s), what's wrong, evidence (screenshot name or file:line), one-line fix. No praise; skip anything that is fine.
