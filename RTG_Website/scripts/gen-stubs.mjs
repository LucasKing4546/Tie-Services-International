#!/usr/bin/env node
/**
 * One-off generator for src/content/pages/*.mdx stub files — draft:true,
 * empty body, so DraftPanel renders PageMeta.blocks as the working outline
 * (the reference build's draft() convention). Pages with real ported
 * content are hand-written separately and listed in SKIP so this script
 * never overwrites them.
 *
 * Not a repo script — run once during the initial template build, not part
 * of npm run pagemap.
 */
import { writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { PAGES } from '../src/data/pages.ts';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = resolve(root, 'src/content/pages');
if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });

const SKIP = new Set([
  'S-02', 'E-02', 'E-01', 'R-01', 'C-00', 'C-01', 'C-02', 'C-03', 'C-04',
  'L-00', 'L-01', 'L-02', 'C-06', 'C-07', 'A-01', 'X-01', 'X-02', 'X-03', 'X-04',
  'A-05', 'Z-01', 'Z-02', 'Z-03', 'Z-04', 'P-00', 'P-01', 'P-03', 'P-06',
  'Y-00', 'Y-03', 'R-02',
]);

let written = 0;
for (const p of PAGES) {
  if (SKIP.has(p.id)) continue;
  const file = resolve(outDir, `${p.id.toLowerCase()}.mdx`);
  const content = `---\npageId: ${JSON.stringify(p.id)}\ndraft: true\n---\n`;
  writeFileSync(file, content);
  written++;
}
console.log(`Wrote ${written} stub MDX files (${SKIP.size} left for hand-written content).`);
