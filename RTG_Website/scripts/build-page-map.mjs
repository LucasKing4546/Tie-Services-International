#!/usr/bin/env node
/**
 * Regenerates src/data/pages.ts from the Page Map workbook.
 *
 *   npm run pagemap
 *
 * The workbook is the source of truth for routing and SEO. Edit it, run this,
 * commit the result. Never hand-edit src/data/pages.ts.
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import * as XLSX from 'xlsx';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const WORKBOOK = resolve(root, 'research/RTG_Website_Page_Map.xlsx');
const OUT = resolve(root, 'src/data/pages.ts');

if (!existsSync(WORKBOOK)) {
  console.error(`Workbook not found at ${WORKBOOK}`);
  process.exit(1);
}

const wb = XLSX.read(readFileSync(WORKBOOK));
const rows = XLSX.utils.sheet_to_json(wb.Sheets['Page Map'], { defval: null });

const list = (v) =>
  v ? String(v).split(/[;\n]/).map((s) => s.trim()).filter(Boolean) : [];
const s = (v) => (v == null || String(v).trim() === '' ? null : String(v).trim());

const pages = rows
  .filter((r) => s(r['Page ID']) && s(r['Page ID']) !== 'TOTALS')
  .map((r) => ({
    id: s(r['Page ID']),
    section: s(r['Section']),
    name: s(r['Page name']),
    slug: s(r['URL slug']),
    template: s(r['Template']),
    avatar: s(r['Avatar']),
    access: s(r['Access']),
    priority: s(r['Pri']),
    title: s(r['Title tag']),
    description: s(r['Meta description']),
    h1: s(r['H1']),
    primaryKeyword: s(r['Primary keyword']),
    secondaryKeywords: list(r['Secondary keywords']),
    schema: s(r['Schema']),
    ogBrief: s(r['OG image brief']),
    blocks: list(r['Key content blocks']),
    cta: s(r['Primary CTA']),
    words: typeof r['Words'] === 'number' ? r['Words'] : null,
    source: s(r['Source']),
    status: s(r['Status']),
  }));

// Preserve the hand-written header (types + helper functions) from the existing
// file so this script only ever replaces the data array.
const current = readFileSync(OUT, 'utf8');
const head = current.slice(0, current.indexOf('export const PAGES'));
const tail = current.slice(current.indexOf('];') + 2);

const body = pages
  .map(
    (p) => `  {
    id: ${JSON.stringify(p.id)}, section: ${JSON.stringify(p.section)}, name: ${JSON.stringify(p.name)},
    slug: ${JSON.stringify(p.slug)}, template: ${JSON.stringify(p.template)}, avatar: ${JSON.stringify(p.avatar)},
    access: ${JSON.stringify(p.access)}, priority: ${JSON.stringify(p.priority)},
    title: ${JSON.stringify(p.title)},
    description: ${JSON.stringify(p.description)},
    h1: ${JSON.stringify(p.h1)},
    primaryKeyword: ${JSON.stringify(p.primaryKeyword)},
    secondaryKeywords: ${JSON.stringify(p.secondaryKeywords)},
    schema: ${JSON.stringify(p.schema)}, ogBrief: ${JSON.stringify(p.ogBrief)},
    blocks: ${JSON.stringify(p.blocks)},
    cta: ${JSON.stringify(p.cta)}, words: ${p.words ?? 'null'},
    source: ${JSON.stringify(p.source)}, status: ${JSON.stringify(p.status)},
  },`,
  )
  .join('\n');

writeFileSync(OUT, `${head}export const PAGES: PageMeta[] = [\n${body}\n];${tail}`);
console.log(`Wrote ${pages.length} pages to src/data/pages.ts`);
