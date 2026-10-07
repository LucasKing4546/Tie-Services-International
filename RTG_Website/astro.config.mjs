// @ts-check
import { readFileSync, readdirSync } from 'node:fs';
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { SITE } from './src/data/site.js';

// Slugs of pages that are still a working outline — draft: true, or carrying
// a <Gap> / TO SUPPLY marker. Base.astro noindexes the same pages (UNFINISHED
// in src/lib/content.ts); keep the two tests in step. Read from disk because
// content collections aren't available to the config.
const pagesDir = new URL('./src/content/pages/', import.meta.url);
const pagesTs = readFileSync(new URL('./src/data/pages.ts', import.meta.url), 'utf8');
const unfinished = new Set(
  readdirSync(pagesDir).flatMap((f) => {
    const mdx = readFileSync(new URL(f, pagesDir), 'utf8');
    if (!/^draft:\s*true/m.test(mdx) && !/<Gap\b|TO SUPPLY/.test(mdx)) return [];
    const id = mdx.match(/^pageId:\s*"?([^"\s]+)/m)?.[1];
    const slug = id && pagesTs.match(new RegExp(`id: "${id}",[^\\n]*\\n\\s*slug: "([^"]+)"`))?.[1];
    return slug ? [slug] : [];
  }),
);

export default defineConfig({
  site: SITE.origin,
  trailingSlash: 'always',
  build: { format: 'directory' },
  integrations: [
    mdx(),
    sitemap({
      // datasheet paths never appear; unfinished pages stay out until they're done
      filter: (page) => !page.includes('/resources/datasheets/') && !unfinished.has(new URL(page).pathname),
    }),
  ],
  vite: {
    build: {
      // three.js is large — keep it in its own chunk so only 3D pages pay for it
      // the 3D bundle is deliberately large and lazily imported only on pages
      // that use it, so the default 500 kB warning is noise here
      chunkSizeWarningLimit: 700,
    },
  },
});
