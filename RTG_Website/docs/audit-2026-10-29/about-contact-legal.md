# Audit: About, Contact, Forms, Legal, 404 (14 pages)

Screenshots are in `scratchpad/audit/about-contact-legal/`. Files named `<page>-desktop|mobile.png` are full pages from snap.mjs. Files named `x-*.png` are targeted shots taken with `pw/acl.mjs`.

Integrity baseline: all 14 pages return 200 (the 404 page returns 404). Each has exactly one h1, there is no horizontal overflow at 390 or 1440, no image is missing alt, and there are no console errors beyond the expected OneTrust block and the 404's own status. The "2 empty links" on every page are the header and footer logo links, which wrap an `<img alt="Romica Tie Group">`, so that is a false positive. With reduced motion on, no content is left hidden.

Gap and draft pages (intentional, not reported as bugs): A-01, A-02 (body is only a Gap), A-03 and A-04 (draft), A-05, X-01, X-02 (TO SUPPLY rows), X-03, X-04 (draft), and Z-01 to Z-04 (draft, legal review).

## Critical

1. **Internal brief text is published as public copy.** On /about/sustainability/ the lede reads "Understatement is the right tone here. The credible claims are design life, refurbishment over replacement, and what the equipment enables." The body reads "No claim goes on this page unless it can be evidenced… for the one already made elsewhere on this site". Both are writer's notes. `cardFrom` reuses the lede as the card blurb, so the same brief text also appears in the "More about RTG" rail on /about/, /about/people-facility/ and /about/qhse/.
   - Evidence: `src/content/pages/a-04.mdx:5` and `a-04.mdx:8`; screenshots `about_sustainability-desktop.png`, `about-desktop.png`.
   - Fix: write a buyer-facing lede, such as "Equipment built for a long service life, and refurbished rather than scrapped." Move the note to a `<Gap>` or delete it.
2. **The aftersales form page has no form.** /contact/aftersales/ shows an h1, empty water and a draft panel listing "form" as a missing block. There is no lede and no fields. /contact/ sends buyers there through the "Aftersales and spares" card. For an operator whose vessel is down, this is a dead end.
   - The earlier static build had a complete aftersales form: equipment, vessel and location, an urgency select ("Vessel is down…"), a "What is happening?" textarea, and a line saying "if urgent and offshore, call" (`research/rtg-website/rtg-website/contact/aftersales/index.html:121`).
   - Evidence: `src/content/pages/x-04.mdx:1-4` (no `form:`, no lede); screenshot `contact_aftersales-desktop.png`.
   - Fix: port that field set into the `form:` frontmatter, plus a lede and an out-of-hours `<Gap>`.

## High

3. **Submitting an empty form shows the 404 page.** `novalidate` turns off the browser's native validation and there is no JavaScript replacement. An empty RFQ submission therefore POSTs to `#`, and the static host answers with "That page is not on this deck." The required fields and the required consent box are never enforced.
   - Evidence: `src/components/blocks/EnquiryForm.astro:21`; screenshot `x-rfq-after-empty-submit.png`.
   - Fix: remove `novalidate` until a JavaScript validator exists, or add a submit handler that calls `reportValidity()` and shows inline messages.
4. **The error state is a red border only, with no message.** `:user-invalid` turns only the border `#AB3241`. The label stays white because `--accent` is white under water, there is no error text, no `aria-invalid` and no `aria-describedby`.
   - This fails WCAG 1.4.1 (use of colour), 3.3.1 (error identification) and 1.4.11 (non-text contrast): red on the panel is about 1.8:1.
   - The valid-state green `#1E7A4F` is hardcoded and also low-contrast.
   - Evidence: `src/styles/parts-site.css:87-90`; screenshot `x-rfq-invalid-state.png`.
   - Fix: add a per-field error `<p id>` below each input, linked with `aria-describedby` and `aria-invalid`, worded like "Enter a work email address". Use a light border or icon colour that reaches 3:1, and keep the wording in text.
5. **Form hints and autofill are not wired up.**
   - `.hint` text ("In metres", "In kg or tonnes") is not tied to its input through `aria-describedby`, so screen readers never announce it.
   - No field sets `autocomplete` (name, organization, email, tel), which fails WCAG 1.3.5.
   - Evidence: `src/components/blocks/FormField.astro:139-141`.
   - Fix: give the hint an id (`${name}-hint`) and reference it. Add an `autocomplete` value to FieldSpec, or map it from the field name.
6. **The reply-time claim contradicts itself.**
   - The form footnote says "We reply to enquiries within one working day" (hardcoded in every form, `EnquiryForm.astro:39`), and the /contact/ lede says the same (`x-01.mdx:3`).
   - Yet the RFQ page carries "RTG to supply: the reply time, in working days" (`x-03.mdx:60`).
   - The figure comes from the superseded static build, not a confirmed source (§8).
   - Fix: put the figure in `PROOF` in `site.js` once RTG confirms it, and use a `<Gap>` until then.
7. **The RFQ form drops the free-text field.** The lede asks the buyer to "Send the duty…", but there is no message or notes textarea. The earlier build had "What do you need?". The privacy notice also says the forms collect "your role" and "anything you write in a message field", and neither field exists.
   - Evidence: `x-03.mdx:7-57`; `z-01.mdx:18`.
   - Fix: add an optional "Anything else (duty, deck, constraints)" textarea, and align the privacy text with the real fields.
8. **Careers is a dead end.** It shows a lede, one Gap and the proof bar. There is no vacancies empty state ("No open roles right now. Send a CV to…"), no apply route, no CTA, and no sibling rail (all three other About pages have one).
   - The workbook blocks "Why here", "current vacancies" and "apply", and the CTA "See current vacancies", are all missing.
   - Evidence: `src/components/templates/Careers.astro:157-172` (renders nothing when `vacancies` is empty); `a-05.mdx`; screenshot `about_careers-desktop.png`.
   - Fix: add an empty-state block whenever `vacancies.length === 0`, with a speculative-application route (or a Gap for the email), plus the ChildCards rail.
9. **The accessibility statement describes features the site no longer has.**
   - It says "On a wide screen some sections hold in place while their content changes as you scroll". Since 7e032005 nothing pins.
   - It also says "Each photograph has a text description", but there is no photography yet.
   - Evidence: `src/content/pages/z-04.mdx:26-27`.
   - Fix: delete the scroll-driven bullet and reword the photography bullet ("Photography is placeholder…").
10. **The cookie table is unreadable at 390 px.** The five-column table compresses the Purpose column to a sliver about 2 characters wide ("Re / wh / ca"). Code chips break mid-identifier ("Chatra.clientI / d"), each line piece keeps its own border, and nothing signals that the table scrolls sideways. The table scrolls (`overflow-x:auto`), but it has no `tabindex`, so keyboard users cannot scroll it.
    - Evidence: `src/styles/parts-content.css:108-112`; screenshot `x-m-table_cookies_.png`.
    - Fix: below 600 px, stack each row as a card using `td::before{content:attr(data-label)}`, or set a `min-width` on the table and add `tabindex="0"` and `role="region"` with a label on the scroller. Give `code` the declaration `white-space:nowrap`.

## Medium

11. **The RFQ left column floats halfway down.** `parts-sections.css:137` sets `.two{align-items:center}`, which overrides `blocks.css:257 align-items:start`. The "What happens next" aside therefore centres against the tall form: it starts at y=1191 while the form starts at y=634. That leaves about 550 px of empty water at top left and defeats the `position:sticky` at `parts-site.css:115`.
    - Screenshots: `contact_request-a-quotation-desktop.png`, `x-rfq-desktop-500.png`.
    - Fix: `.two:has(> .form-side){align-items:start}`.
12. **/about/ is thin against its workbook blocks.**
    - "Our values" is one slogan ("Together we can achieve more.") and "Visit us" is one line with no address or link. Both are one-sentence h2 sections, which §8 calls brochure.
    - The workbook block "where we are going" is missing, and the workbook CTA "Meet the team" is not used.
    - Evidence: `a-01.mdx:23-29`.
    - Fix: merge the two into one short section, link Visit us to /contact/ with the Satu Mare address, and add a Gap for values and outlook.
13. **"Talk to an engineer" appears three times on /about/.** It is in the header, the hero, and again as a lone button above the proof bar. `endingCta` falls back to the hero CTA, so the closing band repeats the hero CTA with no heading or body.
    - Evidence: `src/lib/blocks.ts:92-93`; screenshot `about-desktop.png` at y about 1500.
    - Fix: give A-01 a real `cta` (heading, body, and "Meet the team" pointing to /about/people-facility/), or don't fall back when there is no heading.
14. **The "Enquiry routes" card links read badly.** They say "Read about Request a quotation →" and "Read about Book a condition assessment →". The cards lead to forms, not articles.
    - Evidence: `src/components/blocks/Card.astro:22`.
    - Fix: give each card a `cta` in x-01's `cards`, such as "Request a quotation →", "Book an assessment →" and "Contact aftersales →".
15. **The /contact/agents/ rail falls back to every Form page.** X-02 has no `cards`, so it lists all eight Form pages, including Capacity and lead times and Vendor qualification. Its blurbs also repeat its titles. The workbook blocks "what agents can do" and "escalation to RTG" are missing, and there is no link back to /contact/.
    - Evidence: `Contact.astro:37-39`; `x-02.mdx`.
    - Fix: add a short `cards:` list (Aftersales, Request a quotation, Contact) and two Gap'd prose blocks.
16. **The office cards are inconsistent.** The UK card is titled with the company ("Romica Engineering Ltd") but the Romanian card with the city ("Satu Mare"). Neither address has a country line. The legal pages name the Satu Mare address as RTG's registered office, but the card does not say so. The workbook block "map" is absent.
    - Evidence: `x-01.mdx:27-38`; screenshot `contact-desktop.png`.
    - Fix: title the second card "Romica Tie Group (registered office)", add "United Kingdom" and "Romania" lines, and add a map Gap.
17. **Legal pages: heading order and the opening screen.**
    - "On this page" is an h3 that comes straight after the h1 and before the first h2, so the outline skips a level (`Legal.astro:183`, `level={3}`).
    - "Last updated" sits in its own `Section size="sm"` with about 150 px of water above and below, so the first desktop viewport contains no policy text (`x-privacy-top.png`).
    - Fix: use `level={2}`, or a plain `<p class="mono">` label. Move "Last updated" into the hero under the lede.
18. **Legal reading measure.** Body text is 17 px in a 772 px column, about 85 characters a line, slightly long for policy reading. Tables run 1022 to 1256 px while the text runs 772 px, and the h2 rules sit at a third width. That makes three different left-column measures.
    - Evidence: `parts-content.css:80-112`; screenshot `x-privacy-1800.png`.
    - Fix: cap `.prose` at about 68ch for Legal and let tables match it.
19. **The privacy notice describes a bulletin that does not exist.** "Sending the bulletin" appears in the lawful-basis table and in the rights list, but the site has no newsletter signup anywhere.
    - Evidence: `z-01.mdx:35,61`.
    - Fix: delete those lines, or mark them with a Gap until a bulletin exists.

## Low

20. **Inline Gap chips break badly on mobile.** On /about/ at 390 px, the red diamond is stranded alone at a line end and the chip text wraps into separately bordered fragments.
    - Evidence: screenshot `x-m_about_0.png`; `parts-content.css:33`.
    - Fix: add `box-decoration-break:clone` and `white-space:normal`, and keep the marker with its text using a non-breaking `::before`. Alternatively, make the `.prose .gap` that follows a sentence a block element.
21. **Draft-panel chips and textures.** The chips repeat the workbook's capitalisation ("Policy summary", "standards held", "how it is audited") without normalising it. The panel also uses a grid-line texture, which goes against §7's "no textures" rule (scaffolding, but still visible).
    - Evidence: screenshot `about_qhse-desktop.png`; `DraftPanel.astro` and `parts-content.css:35`.
    - Fix: sentence-case each chip and drop the grid background.
22. **Mixed rail behaviour between pages.** ChildCards on About clips to the container, while ScrollTrack on Contact bleeds to the viewport edge. The two rails behave differently on sibling pages (`about-desktop.png` vs `contact-desktop.png`).
    - Fix: pick one behaviour.
23. **Copy and text details.**
    - Contact.astro's doc comment (lines 9-10) says no address is confirmed, but both addresses are now published.
    - The privacy and accessibility pages use `sales@romica.co.uk`, while the site host is romicatiegroup.com (§5.1, flag only).
    - A-02 is `draft:false` but its whole body is a single Gap. It is noindexed by the Gap rule; fine, just noting it.
24. **Mobile RFQ order.** The "What happens next" aside comes before the form, pushing the first field to about 1.3 screens down (`x-rfq-m-600.png`).
    - Fix: below 900 px, order the form first, or collapse the aside.

No §6 violations, no em dashes, no exclamation marks and no §8 banned words were found in these pages. British spelling is consistent.
