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

// Hand-written pages only. Everything else — including pages once reserved
// here for future hand-writing but never actually written — gets a stub, so
// the site is never blocked on unwritten prose. Ids drop out of this set as
// their MDX gets hand-written for real.
const SKIP = new Set([
  'S-02', 'E-02', 'E-01', 'R-01', 'C-00', 'C-01', 'C-02', 'C-03', 'C-04',
  'L-00', 'L-01', 'L-02', 'C-06', 'C-07', 'P-00', 'P-03', 'P-06',
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
