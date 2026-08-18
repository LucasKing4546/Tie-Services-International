// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { SITE } from './src/data/site.js';

export default defineConfig({
  site: SITE.origin,
  trailingSlash: 'always',
  build: { format: 'directory' },
  integrations: [
    mdx(),
    sitemap({
      // gated pages are indexed but excluded from the sitemap; datasheet paths never appear
      filter: (page) => !page.includes('/resources/datasheets/'),
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
