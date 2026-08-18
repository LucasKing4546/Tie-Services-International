# RTG Website — Build

A complete static build of the new Romica Tie Group site, generated from the
Build Specification, the Page Map workbook and the Case Study Pack.

**69 pages. Zero broken internal links. Every page has a unique title, unique
meta description, canonical, Open Graph, Twitter card and valid JSON-LD.**

---

## Run it

Open `index.html` in a browser, or serve the folder:

```bash
cd rtg-website
python3 -m http.server 8000
```

Then http://localhost:8000

Directory-style URLs (`/sectors/marine-geotechnical/`) work under any web server
that serves `index.html` from a directory. No build step, no dependencies, no
database.

---

## What is here

```
index.html                    Homepage
sectors/                      8 pages   — the market the buyer identifies with
equipment/                    13 pages  — the range, with open Tier 1 specs
lifecycle/                    6 pages   — refurbishment, upgrade, re-certification
contract-manufacturing/       10 pages  — the four-tier scope ladder
yards-integrators/            5 pages   — vendor approval and structural capacity
proof/                        9 pages   — case studies, test facility, references
resources/                    4 pages   — technical notes, gated documents, news
about/ contact/               9 pages
privacy/ cookies/ terms/ accessibility/
assets/css/rtg.css            Design system, one file
assets/js/rtg.js              ~50 lines, no dependencies
robots.txt                    Datasheet paths disallowed, AI crawlers excluded, sitemap declared
sitemap.xml                   68 URLs, correct https host, real lastmod
redirects-apache.txt          37 × 301 from the legacy .php URLs
redirects-nginx.txt           The same map in nginx syntax
```

### Content depth

Roughly 25 pages carry final or near-final copy: the homepage, the contract
manufacturing ladder and all four tier pages, the IP policy, the whole Lifecycle
section, the marine geotechnical sector, the geotechnical winch page (the Tier 1
spec exemplar), certifications, the test facility, the yards hub, the
refurbishment case study, and About.

The remaining pages are **built, styled, navigable and carry their final
metadata**, with the copy shown as a marked outline listing exactly which blocks
belong there. They are not filler — they are a brief a copywriter can work
straight from. Every one is flagged with a dashed red panel so nothing
provisional can reach production unnoticed.

---

## Content protection — verified, not just intended

The build was checked against the rules in Build Specification §06 and passes:

- **No dimensioned general arrangement drawings** anywhere public.
- **No drum core diameter, drum length or flange diameter.** The spec tables show
  performance figures and an overall bounding envelope only. *Publish the box,
  not the arrangement inside it.*
- **No component makes or part numbers** — no slip ring models, no gearmotor
  manufacturers, no welding machine models.
- `robots.txt` disallows datasheet paths and PDF extensions, and excludes
  generative-AI training crawlers.

Re-run the check after any content edit:

```bash
grep -riE "drum core|flange diameter|drum length|MOFLON|Fronius" . --include=*.html
```

It should return nothing.

---

## Before launch

### Blocking — the site should not go live without these

1. **Decide the public brand name and canonical host.** The site currently sells
   "Romica Tie Group", the old title tags said "Romica Engineering LTD", the
   social handles say "Romica Engineering", the datasheets are prefixed "REL",
   and two domains resolve. `HOST` in `site_data.py` is set to
   `https://www.romicatiegroup.com` — change it there and rebuild if that is
   wrong. Every canonical, Open Graph tag, sitemap entry and schema block
   depends on it.
2. **Attach a form handler.** All eight forms validate client-side and then
   stop. They need a server-side endpoint, CRM integration, and an alert to the
   account owner when a known contact submits. The honeypot field
   (`name="website"`) is already in place — reject any submission where it is
   filled.
3. **Build the gated document flow.** Datasheets must be generated on request,
   watermarked per recipient with a unique serial, rasterised, metadata
   stripped, and delivered by a short-lived signed URL. Never a static file path.
4. **Consent management.** Analytics must be genuinely withheld until consent,
   not merely declared to be. UK and EU GDPR both apply.
5. **Legal review** of `/privacy/`, `/cookies/` and `/terms/`. The terms page
   matters commercially as well as legally — a technical drawing generally
   attracts copyright in its own right, and a derived drawing can infringe.
6. **Fill every `<span class="gap">` marker.** They are deliberately loud. Find
   them all with:
   ```bash
   grep -rn 'class="gap"' . --include=*.html
   ```

### Technical

- **Self-host the fonts.** They currently load from Google Fonts, which is a
  performance cost and a GDPR question in the EU. Download Oswald and IBM Plex
  Sans/Mono, serve locally, keep `font-display: swap`.
- **Produce the images.** Every image is a marked placeholder carrying its own
  brief and target dimensions. 18 of the 24 items on the shot list can be
  captured in one day at Satu Mare. Do that before design sign-off, not after.
- **Produce the OG cards.** `assets/og/{page-id}.jpg`, 1200×630, one per page.
  Until they exist, links shared on LinkedIn render without a preview — which is
  the specific failure the current site has.
- **Deploy the 301 map** and verify with a crawl before and after launch. The
  legacy site has search equity that is easy to lose in a rebuild and hard to
  recover.
- **Submit the sitemap** in Search Console against the chosen host, and watch
  coverage for eight weeks.

---

## What RTG alone can supply

This is the critical path. Not design, not development.

| Item | For |
|---|---|
| Written permission to name each client | Case studies, references, testimonials |
| Confirmation the three existing testimonials remain cleared | Homepage, yards hub, testimonials |
| Project 21REL-05 file — assessment scope, components reused, upgrades, tests, cost, turnaround | The refurbishment case study |
| Before/after photographs of 21REL-05 at a matched angle | Same |
| Certificate numbers, issuing bodies and expiry dates for every approval | Certifications page |
| Current insurance limits | Certifications page |
| Refurbishment lead times by scope band | Lifecycle |
| Current capacity by tier | Contract manufacturing |
| RTG's actual tariff and origin position, confirmed with a customs adviser | EU-origin fabrication page |
| Overall envelope and dry weight per equipment configuration | Equipment spec tables |

A case study without a number is a brochure. Where a figure is commercially
sensitive, give it as a ratio or a time — "rebuilt for around a third of
replacement cost, in eleven weeks" persuades; "delivered a successful
refurbishment" does not.

---

## Regenerating

Content lives in `site_build/site_data.py`. Templating, head blocks, schema,
breadcrumbs, sitemap, robots and redirects live in `site_build/build.py`.

```bash
cd site_build && python3 build.py
```

If the site moves to a CMS, `site_data.py` is a clean content model to import
from — one dict per page, with the metadata already written.

### Validation

```bash
# unique titles/metas, single H1, canonical, OG, valid JSON-LD, length limits
python3 site_build/validate.py
```

Last run: 69 pages, 0 duplicate titles, 0 duplicate meta descriptions,
0 broken internal links, 0 protection-rule violations, all titles ≤ 60
characters.

---

## Accessibility

Targets WCAG 2.2 AA. Body text runs at 16.6:1 against the page, headings at
18.8:1, and the lowest contrast anywhere is 5.9:1 on the amber accent. Guard
yellow is used as a background with dark text on it and never as text on white.
Skip link, one H1 per page, visible focus states, full keyboard operation,
`prefers-reduced-motion` honoured, and a print stylesheet.

Alt text is still to be written — it arrives with the photography, and it is a
requirement rather than a nicety.
