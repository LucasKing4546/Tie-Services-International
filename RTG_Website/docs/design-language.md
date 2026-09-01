# RTG design language

Derived from a page-by-page study of **[iCOMAT](https://icomat.co.uk)** (Awwwards
SOTD, by Rejouice) — homepage, `/tech`, `/industries`, `/solutions` — and adapted to
RTG's own brand and buyer.

## The one rule that governs this document

**Take the mechanics, not the identity.**

iCOMAT is the closest live analogue to RTG: technical, industrial, B2B, selling an
advanced manufacturing process to sceptical engineers who buy on evidence. What is
worth taking is *how it structures a page* — the ratio of media to text, the way a
process is shown rather than described, the way a claim is immediately followed by a
number. What is not worth taking is *how it looks* — its palette, its type, its
photography, its voice. Copying a look wholesale is what reads as templated, and the
research consensus on B2B is that the sites which convert are selective rather than
trend-chasing.

So: every structural module below is borrowed. Every surface decision below is RTG's
own, and most of it already exists in `tokens.css` and `blocks.css`.

---

## Part 1 — What iCOMAT actually does (observed, not assumed)

Five devices appear on **every single page**. That repetition is the system.

| # | Device | Where |
|---|---|---|
| 1 | **Full-bleed hero, headline over media, dark scrim** | Home, tech, industries, solutions |
| 2 | **A numbered sequence with an image per step** — O1–O7, O1–O4, O1–O3, 01→04 | Every page. The signature move |
| 3 | **Two-column "the old way / our way" comparison** | Home (×2), tech (×2), solutions |
| 4 | **Big bare figures** — 65% lighter, 10×, 5,000, 2X/3X/6X — set large, *no card, no fill, no border* | Home, tech, solutions |
| 5 | **End-of-page thumbnail cards linking to sibling pages** | Every page |

Supporting characteristics:

- **Image-to-text ratio 55–70% visual.** Text is the minority element. On `/tech`'s
  process section it reaches ~85% image.
- **Display headings at 8–12vw.** Far larger than RTG currently sets.
- **Generous whitespace around text blocks**, tight grouping within them.
- **Alternating light / dark section tone**, with full-bleed media as the third beat.
- **Dark footer.**
- Spec data as a **side-by-side comparison table with tab-aligned figures**, headline
  metric pulled out ("65% weight reduction").

---

## Part 2 — What transfers to RTG, and how

### 2.1 Full-bleed hero → rework `PageHero`

Media fills the band; the `h1` sits over it behind a navy scrim. Where there is no
photograph the existing drawing-sheet plate shows through the scrim, so a page with
no art still reads as deliberate rather than broken.

- Display scale rises to `clamp(44px, 7.5vw, 116px)`. `.d2` currently tops out at 80px.
- Scrim: navy `.72 → .35`, angled so the type sits on the dense end. Never a flat
  wash — the photograph has to survive it.
- `PageHero` stays the only place an `<h1>` is emitted. Unchanged.

### 2.2 Numbered sequence with per-step media → the signature device

Lean on this hardest, because **RTG already has three-quarters of it**: `steps[]` in
`content.config.ts` already carries an optional `media` field, `StepList` renders the
numbered rows, and `PinnedStages` already does the pinned one-at-a-time reveal with a
live index.

The only missing piece is the image per step. Add it to `StepList` and the O1–O7
pattern exists across Service, Guide, Ladder and Sector at once.

RTG's numbering is already set in `decimal-leading-zero` JetBrains Mono — closer to a
drawing sheet than iCOMAT's "O1". Keep it.

### 2.3 Old-way / RTG-way comparison → `VersusTable`

Two columns, no heavy chrome, RTG's column marked with the red rule. This suits RTG's
argument better than it suits iCOMAT's, because RTG's entire pitch is a comparison:
rebuild vs replace, tier 1 vs tier 4, EU-origin vs elsewhere, slip-ring supplied vs
specified. The Guide and the Ladder are already written as comparisons in prose.

**Constraint:** the "old way" column describes an approach, never a named competitor.

### 2.4 Big bare figures → a `bare` variant of `.stats`

`.stats` today is a bordered, boxed grid with hairline dividers. iCOMAT's numbers
have no fill, no border and no card — just the figure at display scale over a mono
label. That reads as more confident and it suits `PROOF`'s six real figures.

Add the variant rather than replacing the boxed one; the boxed grid still earns its
place on a busy ground.

### 2.5 End-of-page sibling cards → already built

`CardGrid`/`Carousel`/`ChildCards` already do this, and the boss's standing
instruction is carousels rather than grids. **No change needed** — a device RTG
already has, which iCOMAT independently validates.

### 2.6 Media-to-text ratio → `FeatureRow`, the one genuinely missing block

The single biggest gap. iCOMAT's backbone is a repeating "copy one side, large media
the other, sides alternating" row. RTG has no such block, which is exactly why its
pages read as documents.

`FeatureRow.astro`: copy column at `--wrap-prose` measure, media column full-height,
`reverse` prop to alternate. Three or four down a page moves the ratio from ~20%
visual to ~60% without writing a single new page of copy.

---

## Part 3 — What does NOT transfer

| Rejected | Why |
|---|---|
| iCOMAT's palette and type | RTG owns navy `#031d5b` / red `#AB3241` / white, with Archivo + Inter + JetBrains Mono. Adopting theirs is borrowing a brand |
| Client logo grid (Joby, BAE, Hyundai, ESA) | RTG has **no cleared client names** (CLAUDE.md §5.7). Build the strip; leave the slots empty until permission exists |
| Trademarked tagline treatment | Theirs |
| Centred body copy | iCOMAT centres several text blocks. RTG's prose is left-set at a fixed measure and stays there — it reads as a technical document, which is the point |
| Mesh gradients / glassmorphism | Considered and rejected: SaaS-dashboard aesthetic, fights "heavy machinery, not a startup" |
| Momentum / smooth-scroll hijacking | Fights the pinned scroll-track and pinned-stage machinery already built; breaks keyboard expectations |

---

## Part 4 — What RTG has that iCOMAT does not, and must keep

These are the site's own signature and they are stronger than anything on offer to
borrow.

- **The drawing-sheet grid** — on the hero, on `.sec.off`, and as the `ImageSlot`
  placeholder plate. RTG's signature texture, drawn from the buyer's own documents
  rather than from a design trend.
- **Numbered section rules** (`.sechd`, `.strack-head`) — a page reads as a controlled
  document. Arrived at independently; iCOMAT confirms the instinct.
- **`<Gap>` / "TO SUPPLY"** — an unconfirmed figure shown as a controlled omission
  rather than invented. No competitor does this, and for this buyer it is proof of
  discipline.
- **Honest `ImageSlot` placeholders** — `<figure role="img">`, never a broken `<img>`.
- **Carousels over grids** — the boss's explicit standing instruction.
- **Procedural 3D** (`rtg3d.ts`) — the homepage already does something iCOMAT cannot.

---

## Part 5 — Specification

### Type scale

| Token | Current | New | Use |
|---|---|---|---|
| `--d-hero` | — | `clamp(44px,7.5vw,116px)` | Full-bleed hero `h1` only |
| `.d1` | `clamp(46px,8.4vw,124px)` | unchanged | Homepage statements |
| `.d2` | `clamp(34px,5.6vw,80px)` | unchanged | Section leads |
| `.d3` | `clamp(24px,3vw,40px)` | unchanged | Block headings |
| `--d-figure` | — | `clamp(56px,7vw,104px)` | Bare stat figures |

Body copy, `.lede`, `.mono` and both measures (`--wrap` 1320, `--wrap-prose` 680) are
unchanged. Sentence case throughout; never all-caps headings.

### Tone rhythm

Every page: **navy hero → white → off → media band → white → navy close.** Never more
than two same-tone sections consecutively. Same-tone joins already collapse their
shared padding (`.sec.off + .sec.off`).

### Colour

Unchanged from CLAUDE.md §7 — roughly 70% white, 25% navy, 5% red. Red stays an
accent: one word, one rule, one button, one active state. Never a body-copy colour,
never a large fill.

Three agreed exceptions to "no gradients / no shadows", all monochrome navy, none on
a card: the `CompareSlot` drag handle's shadow, the pinned-stage vignette, and the
headline-figure vignette.

### Motion

Reuse `src/lib/motion.ts` and its teardown-safe pattern. No new scroll module, no
momentum library.

- Media reveals: `clip-path` wipe on `--e-heavy`, slower and longer than the current
  fade-up. `--e-heavy` exists to "read as mass" — correct for full-bleed media.
- Parallax inside full-bleed bands (`data-motion="parallax"`, already built).
- Everything behind `prefers-reduced-motion` and the `html.js` gate. Content is never
  hidden by CSS alone.

### Images

`astro:assets` (`<Image>`/`<Picture>`, sharp) — responsive `srcset`, AVIF/WebP,
explicit width/height, lazy below the fold. Supplied originals run to 6016×4000 and
6.5 MB and cannot ship raw.

---

## Part 6 — Module inventory

| Module | Status | Notes |
|---|---|---|
| `PageHero` full-bleed | **Rework** | Media + scrim + `--d-hero` |
| `FeatureRow` | **New** | The backbone. Alternating copy/media |
| `MediaBand` | **New** | Full-bleed media, optional heading over, optional video |
| `Statement` | **New** | One sentence at display scale over media |
| `VersusTable` | **New** | Old way / RTG way |
| `StepList` + per-step media | **Upgrade** | Schema field already exists |
| `.stats.bare` | **Upgrade** | Chrome-free figures |
| `LogoStrip` | **New, empty** | Reuse the `.mq` marquee animation from `home.css` |
| Footer → dark | **Rework** | Currently white |
| `PinnedStages` | Built | Pinned one-at-a-time reveal |
| `CompareSlot` | Built | Before/after divider |
| `ScrollTrack` | Built | Carousel band |
| `CardGrid` / `ChildCards` | Built | Sibling cards — no change |

## Verification

`npm run check`, `npm run build`, `npm run audit` (0 failures, 0 protection
violations) per step. Then the Playwright sweep across all 69 pages: no horizontal
overflow at 1440px or 390px, no page errors, no `h1` duplicated as an `h2`, every
page carrying a non-white band. Plus `prefers-reduced-motion` and JS-disabled passes,
since those regress silently.
