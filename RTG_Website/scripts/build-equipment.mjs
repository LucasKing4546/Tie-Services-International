#!/usr/bin/env node
/**
 * Regenerates src/data/equipment.ts from RTG's datasheet index workbook.
 *
 *   npm run equipment -- "C:/path/to/RTG Build History_Cost.xlsx"
 *
 * The workbook is NOT in the repository and must never be: besides the
 * figures below it holds client and vessel names, costs, drum and flange
 * dimensions and gearbox, motor and slip-ring models (CLAUDE.md §6). This
 * script reads the whitelisted columns in COL and nothing else, so only
 * publishable figures can reach the generated file. Never hand-edit
 * src/data/equipment.ts; correct the workbook and run this again.
 *
 * A row whose description and figures disagree is left out and reported,
 * never guessed at.
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import assert from 'node:assert/strict';
import * as XLSX from 'xlsx';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = resolve(root, 'src/data/equipment.ts');
const WORKBOOK = process.argv[2];

if (!WORKBOOK || !existsSync(WORKBOOK)) {
  console.error('Usage: npm run equipment -- "<path to the datasheet index workbook>"');
  process.exit(1);
}

/** The only columns read. BL is used as a yes/no (a datasheet exists), never emitted. */
const COL = { code: 'A', desc: 'D', category: 'E', wll: 'R', wllTop: 'S', cap: 'W', speed: 'Y', sheet: 'BL' };

/** Catalogue category term -> application facet. Terms that are a machine
 *  type rather than a duty (A-Frame, HPU) carry no application. */
const APPS = {
  survey: 'survey', 'mini survey lars': 'survey', 'ctd': 'survey', 'ctd lars': 'survey', 'sonar pole': 'survey',
  geotechnical: 'geotech', 'corer handling systems': 'geotech',
  seismic: 'seismic', 'array winches': 'seismic', 'gun storage': 'seismic',
  'gun storage and handling': 'seismic', 'seismic gun storage': 'seismic',
  rov: 'rov', 'rov winches': 'rov', 'rov lars': 'rov', 'diver tool basket system': 'rov',
  mooring: 'mooring', tow: 'mooring',
  lift: 'lift', 'man riding': 'lift', 'auxiliary/tugger': 'lift', aerostat: 'lift',
  'man-riding abandonment system': 'lift', 'boom crane': 'lift',
  'pipe and cable laying systems': 'cable', 'cable storage and cable spooler': 'cable',
};

/** Winch duty -> the family page that describes it. */
const WINCH_FAMILY = { geotech: 'E-02', survey: 'E-03', seismic: 'E-04', rov: 'E-05', mooring: 'E-06', lift: 'E-06', cable: 'E-10' };

const text = (v) => (v == null ? '' : String(v).replace(/\s+/g, ' ').trim());
const num = (v) => (text(v) !== '' && Number.isFinite(Number(v)) ? Number(v) : null);
const numbersIn = (s) => (s.match(/\d[\d,]*(?:\.\d+)?/g) ?? []).map((n) => Number(n.replace(/,/g, '')));
/** A datasheet title rounds its load ("5 Te" for 5,657 kg), so load gets a
 *  wide tolerance; a cable length is quoted exactly, so capacity gets a tight one. */
const within = (a, b, tol) => Math.abs(a - b) <= tol * Math.max(a, b);

function typeOf(desc) {
  if (/winch/i.test(desc)) return 'winch';
  if (/lars|frame/i.test(desc)) return 'lars';
  if (/tensioner|spooler/i.test(desc)) return 'other';
  if (/hpu/i.test(desc)) return 'hpu';
  return 'other';
}

function driveOf(desc) {
  if (/electro-?\s?hydraulic/i.test(desc)) return 'electro-hydraulic';
  if (/electric/i.test(desc)) return 'electric';
  if (/hydraulic/i.test(desc)) return 'hydraulic';
  return null;
}

const wb = XLSX.read(readFileSync(WORKBOOK));
const rows = XLSX.utils.sheet_to_json(wb.Sheets['Data Sheet Index'], { header: 'A', defval: null });

const items = [];
const skipped = [];
const seen = new Set();

for (const r of rows) {
  const code = text(r[COL.code]);
  if (!/^DS\d/.test(code)) continue;
  const skip = (why) => skipped.push(`${code}: ${why}`);

  // Tidy the catalogue description's typing, not its content.
  const name = text(r[COL.desc])
    .replace(/[–—]/g, '-').replace(/\s*-\s*DS\d+$/, '').replace(/(\d)Te\b/g, '$1 Te')
    .replace(/\bWInch\b/, 'Winch').replace(/Kw\b/g, 'kW').replace(/\bLars\b/, 'LARS')
    .replace(/\bA\s?-?\s?Frame\b/g, 'A-frame')
    .replace(/(\d+)\s?m\b/g, (_, n) => `${Number(n).toLocaleString('en-GB')} m`)
    .replace(/(\d)\s?kW\b/gi, '$1 kW');
  if (!name) { skip('no description'); continue; }
  if (!text(r[COL.sheet])) { skip('no datasheet listed'); continue; }
  if (seen.has(code)) { skip('duplicate row'); continue; }
  if ([COL.wll, COL.cap, COL.speed].every((c) => text(r[c]) === '')) { skip('no figures'); continue; }

  // Rated load: the first-layer column, else the figure in the description
  // (A-frames and tensioners have no drum, so the column reads N/A).
  const statedTe = name.match(/(\d+(?:\.\d+)?)\s*Te\b/i);
  const statedKg = statedTe ? Number(statedTe[1]) * 1000 : null;
  const colKg = num(r[COL.wll]);
  if (colKg && statedKg && !within(colKg, statedKg, 0.15)) { skip(`description says ${statedTe[1]} Te, load column says ${colKg} kg`); continue; }
  const top = num(r[COL.wllTop]);
  if (colKg && top && top > colKg) { skip(`top-layer load ${top} kg is above first-layer load ${colKg} kg`); continue; }

  const capText = /^n\/?a$/i.test(text(r[COL.cap])) ? '' : text(r[COL.cap]);
  const capNums = numbersIn(capText);
  const capM = capNums.length ? Math.max(...capNums) : null;
  const statedM = numbersIn((name.match(/\d[\d,.]*\s*m\b(?!\/)/gi) ?? []).join(' '));
  if (num(capText) && statedM.length && !statedM.some((m) => within(m, capM, 0.05))) { skip(`description says ${statedM.join(' / ')} m, capacity column says ${capM} m`); continue; }

  const type = typeOf(name);
  const apps = [...new Set(text(r[COL.category]).toLowerCase().split(',').map((t) => APPS[t.trim()]).filter(Boolean))];
  const family =
    type === 'winch' ? (WINCH_FAMILY[apps[0]] ?? 'E-01')
    : type === 'lars' ? 'E-07'
    : type === 'hpu' ? 'E-11'
    : /tensioner|spooler/i.test(name) ? 'E-10'
    : /crane/i.test(name) ? 'E-08' : 'E-09';

  // The datasheet title opens with a rounded load ("7.5 Te WLL") that the
  // load column states exactly (7.36 Te): publish the measured one only.
  const shortName = name
    .replace(/^[\d.]+\s*Te\b\s*(?:WLL\b)?\s*-?\s*/i, '')
    .replace(/(^|\s-\s)WLL\s-\s/i, '$1')
    // ...and so is the cable capacity, when the title leads with the same figure
    .replace(capM ? new RegExp(`^${capM.toLocaleString('en-GB')} m\\s*-\\s*`) : /^$/, '')
    // sentence case, as the site writes headings; HPU, LARS, kW and the like are left alone
    .replace(/(?<=\s)[A-Z][a-z]+(?:-[A-Z]?[a-z]+)*/g, (w) => w.toLowerCase())
    .replace(/-([A-Z])(?=[a-z])/g, (_, c) => `-${c.toLowerCase()}`)
    .replace(/^./, (c) => c.toUpperCase());

  seen.add(code);
  items.push({
    code, name: shortName || name, type, apps, drive: driveOf(name),
    wllKg: colKg ?? statedKg,
    capM,
    cap: capText ? (num(capText) ? `${capM.toLocaleString('en-GB')} m` : `${capText.replace(/\s*x\s*/gi, ' × ').replace(/\d{4,}/g, (n) => Number(n).toLocaleString('en-GB'))} m`) : null,
    speed: num(r[COL.speed]),
    family,
  });
}

items.sort((a, b) => (a.wllKg ?? Infinity) - (b.wllKg ?? Infinity) || (a.capM ?? 0) - (b.capM ?? 0));

for (const it of items) {
  assert.ok(it.code && it.name && it.type, `incomplete row ${it.code}`);
  assert.deepEqual(Object.keys(it), ['code', 'name', 'type', 'apps', 'drive', 'wllKg', 'capM', 'cap', 'speed', 'family']);
}

const range = (test) => {
  const kg = items.filter((i) => test(i) && i.wllKg).map((i) => i.wllKg);
  return { minKg: Math.min(...kg), maxKg: Math.max(...kg) };
};

writeFileSync(OUT, `// AUTO-GENERATED by scripts/build-equipment.mjs from RTG's datasheet index.
// Never hand-edit: correct the workbook and run \`npm run equipment\`.

export type EquipmentType = 'winch' | 'lars' | 'hpu' | 'other';
export type EquipmentApp = 'survey' | 'geotech' | 'seismic' | 'rov' | 'mooring' | 'lift' | 'cable';
export type EquipmentDrive = 'electric' | 'hydraulic' | 'electro-hydraulic';

export interface EquipmentItem {
  /** Datasheet number. */
  code: string;
  name: string;
  type: EquipmentType;
  apps: EquipmentApp[];
  drive: EquipmentDrive | null;
  /** Working load limit, first layer, or the rated load of a machine with no drum. */
  wllKg: number | null;
  /** Cable capacity used for filtering; \`cap\` is the text to show. */
  capM: number | null;
  cap: string | null;
  /** Line speed, m/min. */
  speed: number | null;
  /** Page id of the family page describing this design. */
  family: string;
}

export const EQUIPMENT: EquipmentItem[] = [
${items.map((i) => `  ${JSON.stringify(i)},`).join('\n')}
];
`);

console.log(`Wrote ${items.length} designs to src/data/equipment.ts`);
// The headline ranges in the copy (home.ts, e-00.mdx, the page map) are
// typed by hand: if these two lines change, change the copy to match.
console.log('Winch load range, kg:', range((i) => i.type === 'winch'));
console.log('A-frame load range, kg:', range((i) => /A-frame/.test(i.name)));
console.log(`Left out ${skipped.length}:\n  ${skipped.join('\n  ')}`);
