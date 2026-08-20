import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { PAGES } from './data/pages';

const IDS = new Set(PAGES.map((p) => p.id));
const knownId = (label: string) =>
  z.string().refine((v) => IDS.has(v), (v) => ({ message: `${label}: unknown page id "${v}"` }));

const link = z.object({
  label: z.string(),
  href: z.string().startsWith('/'),
});

/** A card either points at a workbook page (preferred — title/href/blurb are
 *  derived from PageMeta by the template) or carries its own title + href. */
const card = z
  .object({
    pageId: z.string().optional(),
    title: z.string().optional(),
    blurb: z.string().optional(),
    href: z.string().optional(),
    meta: z.string().optional(),
    cta: z.string().optional(),
  })
  .superRefine((c, ctx) => {
    if (!c.pageId && !(c.title && c.href)) {
      ctx.addIssue({ code: 'custom', message: 'card needs either pageId, or title + href' });
    }
    if (c.pageId && !IDS.has(c.pageId)) {
      ctx.addIssue({ code: 'custom', message: `card: unknown pageId "${c.pageId}"` });
    }
  });

const imgBrief = z.object({
  /** Image Brief ref from the workbook, e.g. 'IMG-05' */
  ref: z.string(),
  brief: z.string(),
  /** CSS aspect-ratio, e.g. '4/3'. Defaults to 4/3 in ImageSlot.astro. */
  ratio: z.string().optional(),
});

/** One spec table. Templates render several on a Product page with more than
 *  one configuration (E-07 launch and recovery systems, for instance). */
const specTable = z.object({
  caption: z.string().default('Representative specification'),
  rows: z
    .array(
      z.object({
        k: z.string(),
        /** The literal string "TO SUPPLY" renders <Gap> instead of raw text —
         *  never write HTML into frontmatter. See CLAUDE.md §6: publish the
         *  box, not the arrangement inside it — no drum core diameter, drum
         *  length, flange diameter, or component make/part number. */
        v: z.string(),
        note: z.string().optional(),
      }),
    )
    .min(1),
  footnote: z.string().optional(),
});

const formField = z
  .object({
    label: z.string(),
    name: z.string().regex(/^[a-z][a-z0-9_]*$/, 'field name must be lower_snake_case'),
    // No 'file'/'upload' type yet — C-09 (send-documentation)'s workbook block
    // list calls for an "upload form" and will need one added here before its
    // real content can be written. A stub today, so not yet a live gap.
    type: z.enum(['text', 'email', 'tel', 'number', 'date', 'textarea', 'select']).default('text'),
    /** Populated only when type is 'select'. */
    options: z.array(z.string()).default([]),
    hint: z.string().optional(),
    required: z.boolean().default(false),
  })
  .refine((f) => f.type !== 'select' || f.options.length > 0, {
    message: 'a select field needs options',
    path: ['options'],
  });

/**
 * Page bodies. One MDX file per page, named after its Page Map id in lower
 * case (e.g. s-02.mdx). SEO metadata does NOT live here — it comes from
 * src/data/pages.ts so the workbook stays the single source of truth.
 * .strict() enforces that: an unrecognised key (a stray `title`,
 * `description` or `h1` pasted into frontmatter) fails content loading
 * instead of silently vanishing.
 *
 * Structured block fields are one flat object shared across all 17
 * templates rather than a per-template discriminated union — see the
 * template design notes. List fields default to [] so templates can .map()
 * under strict TypeScript with no null guards; .optional() is reserved for
 * fields whose absence is meaningful (a case study with no client name yet,
 * a product with no article dates).
 */
const pages = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/pages' }),
  schema: z
    .object({
      // ---- core ----
      pageId: knownId('pageId'),
      /** Optional deck shown under the H1 */
      lede: z.string().optional(),
      /** Marks copy that is still a brief rather than final text */
      draft: z.boolean().default(false),
      updated: z.coerce.date().optional(),

      // ---- shell ----
      eyebrow: z.string().optional(),
      hero: z
        .object({
          media: imgBrief.optional(),
          ctas: z.array(link).default([]),
          tall: z.boolean().default(false),
        })
        .default({}),
      /** Show the site-wide proof bar. Templates supply their own default
       *  when this is left unset. */
      proofBar: z.boolean().optional(),

      // ---- generic blocks — any template may use any of these ----
      cards: z.array(card).default([]),
      tags: z.array(z.string()).default([]),
      specs: z.array(specTable).default([]),
      notes: z.array(z.object({ heading: z.string().optional(), body: z.string() })).default([]),
      quotes: z
        .array(z.object({ text: z.string(), attribution: z.string(), context: z.string().optional() }))
        .default([]),
      steps: z
        .array(
          z.object({
            n: z.string().optional(),
            title: z.string(),
            body: z.string().optional(),
            points: z.array(z.string()).default([]),
          }),
        )
        .default([]),
      faqs: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
      stats: z
        .array(z.object({ value: z.string(), label: z.string(), accent: z.boolean().default(false) }))
        .default([]),
      media: z.array(imgBrief).default([]),
      /** Page ids resolved to cards via page() — used instead of hand-typed
       *  cards wherever the choice is editorial but the facts are the map's. */
      related: z.array(knownId('related')).default([]),
      featured: card.optional(),
      /** Overrides PageMeta.blocks in the draft-outline panel when a page
       *  needs a different working outline than the workbook block list. */
      outline: z.array(z.string()).default([]),
      cta: z
        .object({
          heading: z.string(),
          body: z.string().optional(),
          primary: link,
          secondary: link.optional(),
        })
        .optional(),

      // ---- template-specific ----
      /** Form template. Field schemas are transcribed from the reference
       *  build's FORMS list — see research/rtg-website/rtg-website/
       *  site_build/site_data.py:1406. No backend exists yet (CLAUDE.md §5.2):
       *  `action` defaults to '#', and the honeypot field is emitted by
       *  EnquiryForm.astro itself, never written per page. */
      form: z
        .object({
          intro: z.string().optional(),
          fields: z.array(formField).min(1),
          submit: z.string().default('Send'),
          consent: z.boolean().default(true),
          action: z.string().default('#'),
        })
        .optional(),

      /** Product template. */
      product: z
        .object({
          category: z.string().optional(),
          drive: z.array(z.string()).default([]),
          /** A cross-cut facet, not a top-level taxonomy — see the workbook's
           *  Meta Tag Rules sheet: "Applications" is shown only on equipment
           *  pages, "Sectors" stays the top-level term. */
          applications: z.array(z.string()).default([]),
          datasheetPageId: knownId('product.datasheetPageId').default('R-01'),
        })
        .optional(),

      /** Case, Guide, Policy, Article — anything rendering an Article JSON-LD node. */
      article: z
        .object({
          published: z.coerce.date().optional(),
          revised: z.coerce.date().optional(),
          author: z.string().default('Romica Tie Group'),
        })
        .optional(),

      /** Case template. client/vessel stay unset until permission to name
       *  them is confirmed in research/ (CLAUDE.md §5.7) — never invent one. */
      caseStudy: z
        .object({
          client: z.string().optional(),
          vessel: z.string().optional(),
          year: z.string().optional(),
          headline: z.object({ value: z.string(), label: z.string() }),
          sector: z.string().optional(),
        })
        .optional(),

      /** Contact template (X-01). */
      offices: z
        .array(
          z.object({
            name: z.string(),
            country: z.string(),
            addressLines: z.array(z.string()).default([]),
            phone: z.string().optional(),
            email: z.string().optional(),
            people: z
              .array(z.object({ name: z.string(), role: z.string(), email: z.string().optional() }))
              .default([]),
          }),
        )
        .default([]),

      /** Contact template (X-02, agents by region). */
      agents: z
        .array(
          z.object({
            region: z.string(),
            company: z.string(),
            country: z.string(),
            email: z.string().optional(),
            phone: z.string().optional(),
          }),
        )
        .default([]),

      /** Careers template. A JobPosting node is emitted per vacancy — never
       *  when this is empty, since a JobPosting with no real datePosted /
       *  validThrough is a Search Console error, not a harmless placeholder. */
      vacancies: z
        .array(
          z.object({
            title: z.string(),
            discipline: z.string(),
            location: z.string(),
            employmentType: z.string().default('FULL_TIME'),
            summary: z.string(),
            posted: z.coerce.date().optional(),
            validThrough: z.coerce.date().optional(),
          }),
        )
        .default([]),
    })
    .strict(),
});

export const collections = { pages };
