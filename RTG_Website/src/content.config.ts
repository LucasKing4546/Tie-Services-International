import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Page bodies. One MDX file per page, named after its Page Map id in lower case
 * (e.g. s-02.mdx). SEO metadata does NOT live here — it comes from
 * src/data/pages.ts so the workbook stays the single source of truth.
 */
const pages = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/pages' }),
  schema: z.object({
    /** Page Map id this body belongs to, e.g. 'S-02' */
    pageId: z.string(),
    /** Optional deck shown under the H1 */
    lede: z.string().optional(),
    /** Marks copy that is still a brief rather than final text */
    draft: z.boolean().default(false),
    updated: z.coerce.date().optional(),
  }),
});

export const collections = { pages };
