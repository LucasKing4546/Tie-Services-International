#!/usr/bin/env node
/**
 * Removes camera metadata (GPS position, device, capture time) from every
 * photograph under src/assets and public, in place. Run after adding a
 * photograph; `npm run audit:protection` fails until it has been.
 *
 * .rotate() with no argument applies the EXIF orientation to the pixels
 * before the tag is dropped, so portrait shots stay portrait. sharp writes
 * no metadata unless asked to. Files that are already clean are not touched,
 * so re-running never re-compresses anything.
 */
import { readFileSync, writeFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve, join } from 'node:path';
import sharp from 'sharp';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
// The EXIF markers of JPEG ("Exif" + two zero bytes), PNG and WebP.
const EXIF = [Buffer.from('457869660000', 'hex'), Buffer.from('eXIf'), Buffer.from('EXIF')];
let n = 0;

async function walk(d) {
  for (const f of readdirSync(d)) {
    const p = join(d, f);
    if (statSync(p).isDirectory()) { await walk(p); continue; }
    if (!/\.(jpe?g|png|webp)$/i.test(f)) continue;
    const buf = readFileSync(p);
    if (!EXIF.some((m) => buf.includes(m))) continue;
    const img = sharp(buf).rotate();
    const out = /\.jpe?g$/i.test(f) ? img.jpeg({ quality: 92, mozjpeg: true }) : img;
    writeFileSync(p, await out.toBuffer());
    console.log('stripped', p.slice(root.length + 1));
    n++;
  }
}

for (const d of ['src/assets', 'public'].map((x) => resolve(root, x)).filter(existsSync)) await walk(d);
console.log(`${n} file(s) cleaned.`);
