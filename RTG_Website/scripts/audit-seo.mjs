#!/usr/bin/env node
/**
 * Validates the page map against the Meta Tag Rules sheet, then validates the
 * built output. Run before every deploy:  npm run audit:seo
 */
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve, join } from 'node:path';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const fails = [];
const warns = [];

// ---- 1. the page map itself ----------------------------------------------
const src = readFileSync(resolve(root, 'src/data/pages.ts'), 'utf8');
const grab = (re) => [...src.matchAll(re)].map((m) => m[1]);
const ids = grab(/^\s+id: "(.*?)"/gm);
const titles = grab(/^\s+title: "(.*?)"/gm);
const descs = grab(/^\s+description: "(.*?)"/gm);
const slugs = grab(/^\s+slug: "(.*?)"/gm);

const dupes = (arr) => arr.filter((v, i) => arr.indexOf(v) !== i);

titles.forEach((t, i) => {
  if (t.length > 60) fails.push(`${ids[i]}: title ${t.length} chars (max 60) — "${t}"`);
});
descs.forEach((d, i) => {
  if (d.length < 150 || d.length > 160)
    warns.push(`${ids[i]}: meta description ${d.length} chars (target 150-160)`);
});
dupes(titles).forEach((t) => fails.push(`duplicate title: "${t}"`));
dupes(descs).forEach(() => fails.push('duplicate meta description'));
dupes(slugs).forEach((s) => fails.push(`duplicate slug: ${s}`));
slugs.forEach((s, i) => {
  if (!s.startsWith('/') || !s.endsWith('/')) fails.push(`${ids[i]}: slug must start and end with "/" — ${s}`);
  if (s !== s.toLowerCase()) fails.push(`${ids[i]}: slug must be lower case — ${s}`);
  if (s.includes('.php') || s.includes('?')) fails.push(`${ids[i]}: slug must not contain .php or a query string`);
});

// ---- 2. the built HTML ----------------------------------------------------
const dist = resolve(root, 'dist');
if (existsSync(dist)) {
  const html = [];
  (function walk(d) {
    for (const f of readdirSync(d)) {
      const p = join(d, f);
      if (statSync(p).isDirectory()) walk(p);
      else if (f.endsWith('.html')) html.push(p);
    }
  })(dist);

  for (const file of html) {
    const body = readFileSync(file, 'utf8');
    const rel = file.slice(dist.length) || '/';
    const h1s = (body.match(/<h1[\s>]/g) || []).length;
    if (h1s !== 1) fails.push(`${rel}: ${h1s} <h1> elements (must be exactly 1)`);
    if (!/rel="canonical"/.test(body)) fails.push(`${rel}: no canonical`);
    if (!/property="og:image"/.test(body)) fails.push(`${rel}: no og:image`);
    const ld = body.match(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/);
    if (!ld) fails.push(`${rel}: no JSON-LD`);
    else {
      try { JSON.parse(ld[1]); } catch { fails.push(`${rel}: JSON-LD is not valid JSON`); }
    }
    // images must carry alt (empty alt is allowed for decorative)
    const imgs = body.match(/<img(?![^>]*\balt=)[^>]*>/g);
    if (imgs) fails.push(`${rel}: ${imgs.length} <img> without an alt attribute`);
  }
  console.log(`Checked ${html.length} built pages.`);
} else {
  warns.push('dist/ not found — run `npm run build` first to audit built output.');
}

warns.forEach((w) => console.warn(`  warn  ${w}`));
fails.forEach((f) => console.error(`  FAIL  ${f}`));
console.log(`\n${fails.length} failures, ${warns.length} warnings.`);
process.exit(fails.length ? 1 : 0);
