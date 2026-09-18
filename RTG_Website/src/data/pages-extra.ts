// Pages that exist in the built site but aren't part of the Page Map workbook
// (currently just the 404). Kept separate from src/data/pages.ts (auto-generated
// — never hand-edit) so npm run pagemap never touches this file, and so
// scripts/audit-seo.mjs — which regex-scans pages.ts for duplicate titles/slugs —
// can't raise a false duplicate against these records.
import type { PageMeta } from './pages';

export const OFF_MAP_PAGES: PageMeta[] = [
  {
    id: 'X-404',
    section: 'System',
    name: 'Page not found',
    slug: '/404/',
    template: 'Legal', // never dispatched through the template router
    avatar: 'ALL',
    access: 'Open',
    priority: 'P3',
    title: 'Page Not Found | RTG',
    description: 'The page you were looking for does not exist. Find your way back to the equipment range, sectors we serve or contact RTG directly.',
    h1: 'That page is not on this deck.',
    primaryKeyword: null,
    secondaryKeywords: [],
    schema: 'WebPage',
    ogBrief: null,
    blocks: [],
    cta: null,
    words: null,
    source: 'New',
    status: 'Done',
  },
];

export const OFF_MAP_IDS = new Set(OFF_MAP_PAGES.map((p) => p.id));
