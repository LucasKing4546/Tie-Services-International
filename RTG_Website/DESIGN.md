---
name: Romica Tie Group
description: Heavy marine deck equipment, presented as one continuous descent from the sky to the seabed.
colors:
  navy: "#031d5b"
  red: "#AB3241"
  red-deep: "#8C2635"
  sky: "#DCE7EA"
  sea-surface: "#1F5467"
  sea-shallows: "#1A4B5D"
  sea-shelf: "#164253"
  sea-slope: "#123A4A"
  sea-mid: "#0D2B3B"
  sea-deep: "#0A2231"
  sea-abyss: "#061520"
  ink: "#FFFFFF"
  ink-soft: "#BFD2D8"
  sky-ink: "#0D2B3B"
  sky-ink-soft: "#3B5967"
  header-muted: "#5A6478"
  header-line: "#DFE3EA"
  header-panel: "#F5F6F8"
  rule: "rgba(220,231,234,.18)"
  panel: "rgba(255,255,255,.055)"
  panel-deep: "rgba(6,21,32,.35)"
  line-wet: "rgba(255,255,255,.75)"
typography:
  display:
    fontFamily: "Archivo Variable, Archivo, Helvetica, Arial, sans-serif"
    fontSize: "clamp(36px,5.2vw,76px)"
    fontWeight: 800
    lineHeight: 1.06
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Archivo Variable, Archivo, Helvetica, Arial, sans-serif"
    fontSize: "clamp(30px,4.2vw,60px)"
    fontWeight: 800
    lineHeight: 1.06
    letterSpacing: "-0.035em"
  title:
    fontFamily: "Archivo Variable, Archivo, Helvetica, Arial, sans-serif"
    fontSize: "clamp(24px,3vw,40px)"
    fontWeight: 800
    lineHeight: 1.1
    letterSpacing: "-0.028em"
  figure:
    fontFamily: "Archivo Variable, Archivo, Helvetica, Arial, sans-serif"
    fontSize: "clamp(32px,3.4vw,50px)"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.04em"
    fontFeature: "\"tnum\", \"lnum\""
  lede:
    fontFamily: "Inter Variable, Inter, system-ui, -apple-system, sans-serif"
    fontSize: "clamp(17px,1.5vw,21px)"
    fontWeight: 400
    lineHeight: 1.5
  body:
    fontFamily: "Inter Variable, Inter, system-ui, -apple-system, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.6
  button:
    fontFamily: "Archivo Variable, Archivo, Helvetica, Arial, sans-serif"
    fontSize: "14px"
    fontWeight: 700
    letterSpacing: "-0.01em"
  label:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "11.5px"
    fontWeight: 500
    letterSpacing: "0.16em"
rounded:
  hairline: "2px"
  control: "12px"
  panel: "16px"
  card: "20px"
  pill: "100px"
spacing:
  gutter: "32px"
  gutter-phone: "20px"
  wrap: "1320px"
  prose: "680px"
  section: "clamp(52px,6vw,92px)"
  section-sm: "clamp(40px,4.6vw,68px)"
components:
  button-primary:
    backgroundColor: "{colors.red}"
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: "17px 30px"
  button-primary-hover:
    backgroundColor: "{colors.red-deep}"
  button-light:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.navy}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: "17px 30px"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: "17px 30px"
  button-outline-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.navy}"
  card:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
    padding: "32px 30px"
  callout:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.ink}"
    rounded: "{rounded.panel}"
    padding: "26px 28px"
  input:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "14px 16px"
    height: "50px"
  nav-link:
    textColor: "{colors.navy}"
    rounded: "{rounded.pill}"
    padding: "9px 15px"
  nav-link-active:
    backgroundColor: "{colors.header-panel}"
    textColor: "{colors.red}"
  photo-row-thumb:
    backgroundColor: "{colors.panel}"
    rounded: "{rounded.control}"
    width: "132px"
  case-card:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
    padding: "26px 28px 28px"
  row-disc:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    size: "44px"
  row-disc-hover:
    backgroundColor: "{colors.red}"
  mark-pill:
    backgroundColor: "{colors.red}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "5px 10px"
---

# Design System: Romica Tie Group

## Overview

**Creative North Star: "The Descent"**

Every page is a dive. It opens in pale North Sea mist under a light header bar, crosses an animated waterline, and then darkens without a break, from a teal surface through deep mid-water to near-black, until the footer lands on the seabed in the logo navy. On inner pages the descent is one background on the page's main element, not a stack of coloured bands, so the depth reads as continuous on a page of any length and needs no script. The homepage alone steps down instead: below the waterline each section is its own solid band, one shade deeper than the last, from the teal the hero ends on to the abyss above the seabed footer.

Under the water everything is quiet and technical: white type, faint translucent panels, 1px hairlines, generous rounded cards, fully rounded pill buttons. Colour is held back so the figures can carry the argument. The buyer is a sceptical engineer; the system gives numbers the largest type on the page, sets them in tabular figures, and keeps decoration out of their way. Pages are compact, one idea per screen.

The brand's two colours come from the live RTG stylesheet and keep their own jobs: navy for the logo, header type and the seabed footer; red for fills and marks. The water is a separate, desaturated teal-grey ramp, so the brand navy is never asked to be the sea.

**Key Characteristics:**
- One water gradient on main on inner pages, every section transparent on it; on the homepage, solid bands that only ever step deeper.
- White type under water, deep teal type above it; the header is always the light bar.
- Red is a fill or a mark, never body type under water.
- Flat: no drop shadows anywhere. Depth is the water itself.
- Archivo 800 display, Inter body, JetBrains Mono for small technical labels; sentence case.
- Motion is a budget: waves, the vessel arriving, and quiet entrance reveals.

## Colors

Two palettes that never trade roles: the brand's navy and red, and an ambient teal-grey water ramp.

### Primary
- **Logo Navy** (navy): the logo wordmark, header type, the footer ground and the seabed edge, the vessel hull. Never type on the water and never type on itself.
- **Signal Red** (red): primary button fills, active tab rules, list markers, placeholder labels, text selection. Hovers deepen to **Deep Crimson** (red-deep). Above the water (the sky) red may colour an accented word in a heading, where it holds about 5.5:1.

### Neutral: the water
- **Mist** (sky): the band above the waterline on every page and the full homepage hero. The header bar is this mist at 90% with a 14px backdrop blur.
- **Teal Surface** (sea-surface): the top of the water and the front wave. The lightest ground white type ever sits on (about 8.6:1).
- **Mid-Water** (sea-mid): the gradient's middle stop, at 52% of the page.
- **Abyss** (sea-abyss): the bottom stop and the body background behind everything.
- **Shallows** (sea-shallows), **Shelf** (sea-shelf), **Slope** (sea-slope) and **Deep Water** (sea-deep): homepage band shades only, filling the steps between the three gradient stops. The homepage order is Teal Surface (sectors), Shallows (case studies), Shelf (equipment), Slope (engineered for offshore conditions), Mid-Water (contract manufacturing), Deep Water (service), Abyss (company), then the navy seabed footer.
- **Foam White** (ink) and **Kelp Grey** (ink-soft): the two type colours under water, primary and secondary.
- **Hairline** (rule), **Glass Panel** (panel), **Deep Panel** (panel-deep): white-alpha hairlines, the faint card fill, and the darker fill for drawing-sheet placeholders and the mobile menu bars.

### Neutral: above the water
- **Sky Ink** (sky-ink) and **Sky Ink Soft** (sky-ink-soft): type on the mist. The header instead keeps Logo Navy, with **Header Muted**, **Header Line** and **Header Panel** for its secondary type, hairline and hover fill.

### Named Rules
**The One Water Rule.** On inner pages the page background is the single gradient on main (sea-surface held flat under the waterline, then sea-mid at 52%, then sea-abyss). No section there gets its own opaque background; a tone only ever marks a card or a callout, never a band. The homepage is the one exception: every section below the waterline is a solid band one shade deeper than the one above it, from sea-surface down to sea-abyss. Bands only step darker; never a light band under water.

**The True Colour Rule.** Photographs are shown as taken: no filter, no tint, no overlay (the site owner's call, 2026-11-05). Only photo cards that carry type keep their legibility scrim.

**The Red Is a Mark Rule.** Under the water red fills a button, draws a rule or dots a marker. It never sets type there (it falls to about 2.3:1 on mid-water and 1.3:1 at the surface). Accented type under water is white.

**The Light Bar Rule.** The header is the mist bar on every page, never reversed: the logo is a two-colour mark with no reversed version.

## Typography

**Display Font:** Archivo (variable, self-hosted), falling back to Helvetica, Arial
**Body Font:** Inter (variable, self-hosted), falling back to system-ui
**Label/Mono Font:** JetBrains Mono, 400 and 500

**Character:** A heavy, tightly tracked grotesque for headings and figures against a plain, readable body face; the mono is the engineering annotation on the drawing.

### Hierarchy
- **Display** (800, the hero clamp, 1.06): one per page, the h1 in the hero. The homepage hero runs one step smaller so the vessel fits beside it.
- **Headline** (800, the section clamp, 1.06): section headings. The homepage holds every h2 at one size down the page (clamp(30px,3.6vw,52px)).
- **Title** (800, 1.1): card and sub-section headings.
- **Figure** (800, tabular lining figures, line-height 1): proof figures and stat numerals, the largest thing in their block.
- **Lede** (400, 1.5, max 52ch): the paragraph that opens a section, in Kelp Grey.
- **Body** (400, 17px, 1.6, max 62ch; 72ch inside long prose).
- **Button** (Archivo 700, 14px): buttons, nav links (600) and the arrow links.
- **Label** (JetBrains Mono 500, 11.5px, 0.16em, uppercase): small technical labels only: form field labels, tab numbers, placeholder plates, figure units. Never a line above a heading.

### Named Rules
**The Sentence Case Rule.** Headings are sentence case. Uppercase belongs to the mono label alone.

**The Descender Rule.** Display line-height stays at 1.06 or looser: tighter, a descender on a two-line heading touches the cap height of the line below. Headings use balanced wrapping; paragraphs use pretty wrapping.

**The Tabular Figures Rule.** Every number read as data (stats, spec tables, count-ups, step numbers) uses tabular lining figures so digits never shuffle.

## Layout

A centred container (wrap, 1320px) with a 32px gutter that drops to 20px under 700px. Body copy is set to a narrower measure (prose, 680px) so figures and tables can break wider than the text they belong to.

Sections are compact: vertical padding is the section clamp (smaller sections use section-sm), and the first section after a page hero starts closer. Section heads are asymmetric on wide screens: the heading on the left (about 1.5 parts, max 16ch) and the lede on the right (1 part), bottom-aligned, with no rule beside the lede and no hairline above the head (removed by the site owner, 2026-11-05). Below 901px everything stacks to one column.

Card rails on inner pages (scroll tracks, carousels) are native horizontal scroll-snap rows moved by swipe, drag or their prev/next buttons. Nothing pins and nothing is driven by page scroll. Breakpoints in use: 1080px (desktop nav collapses to the menu), 901/900px (two columns to one), 820px (homepage hero: the proof strip goes two by two), 700px (gutter), 620px (homepage tier columns to one), 560px (header CTA hides; 44px touch targets also apply on coarse pointers), 520px.

The homepage runs in a fixed order under its sky hero: the proof strip (four figures divided by hairlines) just under the surface, then sectors, case studies, equipment with the finder entry form beneath its rows, engineered for offshore conditions, contract manufacturing, service life support, and the family business, which closes on "Request a quotation" and "Talk to an engineer". Its bands use their own padding (clamp(52px,5.4vw,84px)), the first band starting closer.

**The Compact Rule.** One idea per screen. Section padding and display sizes were cut deliberately; do not grow them back.

## Elevation & Depth

The system is flat. There is no box-shadow anywhere in the build. Depth comes from the water: the page darkens as the reader descends, and surfaces separate from it only by a faint translucent fill (panel) and a 1px hairline. Photographs fade up out of the water through a mask rather than starting on a hard edge, and photo cards use a dark teal scrim (a gradient over the image) so white type stays legible. Homepage photographs carry no scrim and never carry type; they are shown in their true colour (The True Colour Rule). The header's 14px backdrop blur is the only blur.

**The No Shadow Rule.** No drop shadows, no glows, no hard offset shadows. If something needs to stand forward, give it a hairline and a panel fill.

**The One Gradient Rule.** The water is the only background gradient (on the homepage the water is stepped bands, not a gradient). Gradients elsewhere are functional only: legibility scrims over photographs and fade masks at photo edges.

## Shapes

Generous, consistent rounding on a flat plane. Photo and link cards, image plates, homepage band photos and case cards take the card radius (20px); callouts, notes, spec tables and draft panels take the panel radius (16px); form controls, menu items and the homepage row thumbnails take the control radius (12px). Every button, nav link and small label is a full pill; circular icon buttons (arrow discs, carousel buttons, the menu button) are true circles. Borders are 1px hairlines in rule; form controls use a 1.5px border strong enough to pass 3:1.

Icons are drawn, never typed: one arrow and two chevrons on a 24px grid, 2px round-capped stroke in currentColor, sized at 1em so they follow the type that holds them, always decorative.

## Components

### Buttons
Confident, rounded and few.
- **Shape:** full pill (pill radius), 1.5px border, 12px gap to an inline icon.
- **Primary:** Signal Red fill, white type, 17px 30px; hover deepens to Deep Crimson and lifts 2px.
- **Light:** a white pill with navy type under water (it inverts to navy with white type above), hover drops to 88% opacity.
- **Outline:** transparent with a hairline border; hover fills with the ink colour and flips the type.
- **Arrow link:** Archivo 700 at 13.5px in the accent colour, a drawn arrow after it; on hover the gap widens from 9px to 15px.
- **Focus:** a solid 3px ring with a 3px offset (see Do's and Don'ts on its colour).

### Cards / Containers
- **Corner Style:** card radius for photo and link cards, panel radius for callouts.
- **Background:** Glass Panel over the water; photo cards put the image under a teal scrim.
- **Shadow Strategy:** none (Elevation & Depth).
- **Border:** 1px white-alpha hairline.
- **Internal Padding:** about 30 to 32px; 24px on phones.
- **Hover:** inner-page link cards lift 8px. Reduced motion removes the lift.

### Inputs / Fields
- **Style:** Glass Panel fill, 1.5px border at about 4:1, control radius, 14px 16px padding, 50px minimum height, 16px type. Labels are mono, small and tracked; selects use a drawn chevron.
- **Focus:** the border goes to ink and a 2px ink ring appears at a 2px offset.
- **Error:** the border turns Signal Red (2px when flagged invalid) and the message is set in ink with a red dot before it: red marks the error, the words carry it.
- **Read-only / Disabled:** dashed border, Kelp Grey type.

### Navigation
- **Header:** fixed mist bar with a hairline foot; it tightens from 22px to 12px vertical padding once scrolled. Links are Archivo 600, 14px, pill-shaped, with a light panel on hover; the current page gets the panel and red type. The primary CTA is a red pill.
- **Mobile:** under 1080px a no-JS disclosure menu: a 44px circular button whose three bars turn into a cross, opening a 20px-radius panel of 12px-radius links.
- **Footer:** the navy seabed, topped by a drawn wave crest with a faint white edge; muted white links that brighten on hover.

### Index Rows
A ruled list of large titles, each with a short blurb and a 56px circular arrow disc. On hover or focus a rounded panel fades in behind the row, the blurb slides 8px, and the disc slides 6px and fills red. Inner pages only: related equipment on sector pages, the tier list on the manufacturing ladder, proof lists, and the fallback for child cards too few to scroll.

### Photo Register (homepage)
The homepage's Sectors and Equipment bands: one ruled row per item, led by a photograph of the work. Each row is a 132px thumbnail at 3/2 and control radius, then the Title-weight name, a Kelp Grey blurb and a 44px circular disc with a drawn arrow. Hover and focus only fill the disc red. A row with no photograph yet shows a small drawing-sheet plate: Deep Panel fill, hairline border, a 14px grid and a red corner tick. The thumbnail drops to 104px under 900px and 84px under 520px, where the disc goes.

### Case-study Grid (homepage)
The four case studies sized by the scale of the work: a feature card whose photograph spans two rows, two stacked cards beside it, and a full-width strip with figure, text and arrow link in a row. Cards are figure-led: an Archivo 800 figure in tabular lining figures (up to 44px, 56px on the feature card) above the title, blurb and arrow link. Glass Panel fill, hairline border, card radius. Hover changes only the border, to 45% white. One column under 900px, photos at 16/10.

### Tier Columns (homepage)
Contract manufacturing's four cumulative tiers side by side, all visible: under a 1.5px ink rule, four columns divided by 1px hairlines, each a linked title (its underline appears on hover), a lede and points marked with a 7px red dash. No tabs, no number labels. Two columns under 1080px, one under 620px.

### Band Photo (homepage)
A photograph standing on its own in a band, at card radius: 16/10 for engineering and service; in contract manufacturing the A-frame photo stands beside the tier register (one ruled row per tier: name and scope left, points right) at its height, and goes 4/3 above it under 900px.

### Waterline (signature)
Three looping wave layers, each twice its box's width, sliding at 22s, 13s and 9s, tinted from mist towards the teal surface; the front wave is exactly the surface colour so it runs into the water with no seam. The homepage hero holds it full height with the vessel riding between the back and front waves; inner pages use a slim 132px band of mist under the header.


## Do's and Don'ts

### Do:
- **Do** keep every inner-page section transparent on the one water gradient; on the homepage, step each band one shade deeper than the last (The One Water Rule).
- **Do** show photographs in their true colour (The True Colour Rule).
- **Do** set type under water in ink or ink-soft only; red stays a fill or a mark.
- **Do** keep the header the light mist bar on every page.
- **Do** give figures the largest type in their block, in Archivo 800 with tabular lining figures.
- **Do** use hairlines (1px, rule) and Glass Panel fills to separate surfaces; card radius 20px for cards, 16px for callouts and tables, pills for buttons.
- **Do** keep the motion budget: waves, the vessel's arrival, and masked line reveals or short fade-ups on entrance. Honour prefers-reduced-motion everywhere.
- **Do** keep masked line reveals padded at the bottom so descenders do not clip.
- **Do** draw icons with Icon.astro's single-stroke paths rather than typing glyphs.
- **Do** use an ink (white) focus ring under the water, where red cannot reach 3:1.

### Don't:
- **Don't** give a section its own opaque background colour outside the homepage band sequence, and never put a lighter band under a darker one.
- **Don't** set red type on the water or navy type on navy.
- **Don't** use drop shadows, glows or textures on surfaces. The drawing-sheet grid belongs only to image placeholders.
- **Don't** drive a carousel, a pin or a content switch from page scroll.
- **Don't** put a mono label above a heading that only repeats it.
- **Don't** set headings in all caps or tighten display line-height below 1.06.
- **Don't** add hover devices beyond the established set (2px button lift, 8px card lift on inner-page link cards, red fill on arrow discs, the index row slide where index rows are used, the border brightening on homepage case cards).
- **Don't** bring in the concept file's hi-vis yellow, anywhere.
- **Don't** grow section padding or display sizes back up.
