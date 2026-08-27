#!/usr/bin/env node
/**
 * Full-page screenshots of every built page, read from the generated
 * sitemap so this always matches whatever `npm run build` actually
 * produced — no separate list of page ids to keep in sync.
 *
 * Prerequisite: `npm run build`, then the built site served at BASE_URL
 * (e.g. via `npm run preview`).
 *
 * Usage: BASE_URL=http://127.0.0.1:4321 node scripts/screenshot-pages.mjs
 */
import { chromium } from 'playwright';
import { readFileSync, existsSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const BASE_URL = process.env.BASE_URL || 'http://127.0.0.1:4321';
const OUT_DIR = resolve(root, process.env.OUT_DIR || 'page-screenshots');
const VIEWPORT_WIDTH = 1440;

if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR, { recursive: true });

/** Reads dist/sitemap-index.xml and every sitemap-N.xml it points to. */
function readSitemapUrls() {
  const indexXml = readFileSync(resolve(root, 'dist/sitemap-index.xml'), 'utf8');
  const sitemapFiles = [...indexXml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);

  const urls = [];
  for (const sitemapUrl of sitemapFiles) {
    const name = sitemapUrl.split('/').pop();
    const xml = readFileSync(resolve(root, 'dist', name), 'utf8');
    for (const m of xml.matchAll(/<loc>(.*?)<\/loc>/g)) urls.push(m[1]);
  }
  return urls;
}

/** '/sectors/marine-geotechnical/' -> 'sectors--marine-geotechnical'; '/' -> 'home' */
function slugFor(url) {
  const { pathname } = new URL(url);
  const trimmed = pathname.replace(/^\/|\/$/g, '');
  return trimmed ? trimmed.replace(/\//g, '--') : 'home';
}

async function main() {
  const urls = readSitemapUrls();
  console.log(`Found ${urls.length} page(s) in the sitemap.`);

  const browser = await chromium.launch({
    args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'],
  });
  const page = await browser.newPage({ viewport: { width: VIEWPORT_WIDTH, height: 1000 } });

  let ok = 0;
  const failures = [];

  for (const url of urls) {
    const { pathname } = new URL(url);
    const localUrl = new URL(pathname, BASE_URL).toString();
    const slug = slugFor(url);
    try {
      await page.goto(localUrl, { waitUntil: 'load', timeout: 30000 });
      await page.waitForTimeout(800); // let idle-loaded 3D/canvas content mount
      await page.screenshot({ path: resolve(OUT_DIR, `${slug}.png`), fullPage: true });
      ok++;
      console.log(`  ok ${slug}.png`);
    } catch (err) {
      failures.push({ url, error: String(err) });
      console.error(`  FAILED ${url}\n    ${err}`);
    }
  }

  await browser.close();

  console.log(`Captured ${ok}/${urls.length} page(s) to ${OUT_DIR}`);
  if (failures.length) {
    console.error(`${failures.length} page(s) failed.`);
    process.exitCode = 1;
  }
}

main();
