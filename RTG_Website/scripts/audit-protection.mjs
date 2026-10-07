#!/usr/bin/env node
/**
 * Content-protection gate. Enforces the publishing rules in CLAUDE.md §
 * "What must never be published". Run before every deploy — a failure here is
 * a commercial problem, not a styling one.
 */
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve, join } from 'node:path';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

/** Terms that must never appear in public output. */
const BANNED = [
  { re: /drum\s+core\s+diameter/i, why: 'internal drum proportion' },
  { re: /\bcore\s+diameter\b/i,    why: 'internal drum proportion' },
  { re: /drum\s+length/i,          why: 'internal drum proportion' },
  { re: /flange\s+diameter/i,      why: 'internal drum proportion' },
  { re: /\bMOFLON\b/i,             why: 'component manufacturer' },
  { re: /\bFronius\b/i,            why: 'component manufacturer' },
  { re: /\bpart\s+numbers?\b/i,    why: 'component part number' },
];

// Scans everything that can carry public-facing prose, not just the content
// pipeline — a banned term written straight into a component (as
// EquipmentGrid.astro's headline once nearly was) is just as real a leak.
const roots = ['dist', 'public', 'src/content', 'src/data', 'src/components', 'src/layouts', 'src/pages', 'src/lib']
  .map((d) => resolve(root, d)).filter(existsSync);
const hits = [];
const exts = ['.html', '.mdx', '.md', '.ts', '.js', '.css', '.svg', '.xml', '.txt', '.astro', '.json'];

for (const r of roots) {
  (function walk(d) {
    for (const f of readdirSync(d)) {
      const p = join(d, f);
      if (statSync(p).isDirectory()) { walk(p); continue; }
      if (!exts.some((e) => f.endsWith(e))) continue;
      const body = readFileSync(p, 'utf8');
      for (const b of BANNED) {
        if (b.re.test(body)) hits.push(`${p.slice(root.length + 1)}: ${b.why} — matched ${b.re}`);
      }
    }
  })(r);
}

// Photographs must not carry camera metadata (GPS position, device, capture
// time). Astro can emit an imported original unmodified, so the source file
// itself has to be clean. Fix with: npm run strip-exif
const EXIF = [Buffer.from('457869660000', 'hex'), Buffer.from('eXIf'), Buffer.from('EXIF')];
for (const r of ['src/assets', 'public', 'dist'].map((d) => resolve(root, d)).filter(existsSync)) {
  (function walk(d) {
    for (const f of readdirSync(d)) {
      const p = join(d, f);
      if (statSync(p).isDirectory()) { walk(p); continue; }
      if (!/\.(jpe?g|png|webp)$/i.test(f)) continue;
      const buf = readFileSync(p);
      if (EXIF.some((m) => buf.includes(m))) hits.push(`${p.slice(root.length + 1)}: image carries camera metadata — run npm run strip-exif`);
    }
  })(r);
}

// datasheets must never be committed as static files
const ds = resolve(root, 'public/resources/datasheets');
if (existsSync(ds) && readdirSync(ds).length) {
  hits.push('public/resources/datasheets/ contains files — datasheets must be generated per recipient, never served statically');
}

hits.forEach((h) => console.error(`  FAIL  ${h}`));
console.log(`\nContent protection: ${hits.length} violation(s).`);
process.exit(hits.length ? 1 : 0);
