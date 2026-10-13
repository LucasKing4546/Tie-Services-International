/**
 * The standard-design vocabulary and helpers, shared by the finder
 * (EquipmentFinder.astro), the per-family lists (FamilyDesigns.astro) and
 * the homepage form that links into the finder (FinderEntry.astro). The
 * label keys are the values the finder reads from the query string.
 */
import { getCollection } from 'astro:content';
import type { EquipmentApp, EquipmentDrive, EquipmentItem } from '@data/equipment';
import { page } from '@data/pages';

export const EQUIPMENT_APPS: Record<EquipmentApp, string> = {
  survey: 'Survey',
  geotech: 'Geotechnical',
  seismic: 'Seismic',
  rov: 'ROV and subsea',
  mooring: 'Mooring and tow',
  lift: 'Lift and utility',
  cable: 'Cable lay',
};

export const EQUIPMENT_DRIVES: Record<EquipmentDrive, string> = {
  electric: 'Electric',
  hydraulic: 'Hydraulic',
  'electro-hydraulic': 'Electro-hydraulic',
};

/** Minimum working load bands, Te. Bands, not a slider: most designs sit
 *  under 5 Te, so a linear slider would spend nearly all its travel on a
 *  handful of rows. */
export const EQUIPMENT_LOADS = [1, 5, 15, 30];

export const formatLoad = (kg: number): string => (kg < 1000 ? `${kg} kg` : `${Number((kg / 1000).toFixed(2))} Te`);

/** "Electric · Survey": a design's drive and duties, for the line under its name. */
export const designTags = (e: EquipmentItem): string =>
  [e.drive && EQUIPMENT_DRIVES[e.drive], ...e.apps.map((a) => EQUIPMENT_APPS[a])].filter(Boolean).join(' · ');

/** The datasheet number a page cites: "DS38 and DS38A" is one design, DS38. */
const designNumber = (e: EquipmentItem): string => e.code.split(' ')[0];

/** The id of a design's row in its family list (FamilyDesigns.astro). */
export const designAnchor = (e: EquipmentItem): string => designNumber(e).toLowerCase();

/** The datasheet request form, carrying this design's name (lib/forms.ts
 *  pre-fills the field). Never a file: datasheets stay gated (CLAUDE.md §5.3). */
export const datasheetRequest = (e: EquipmentItem): string =>
  `${page('R-01').slug}?equipment=${encodeURIComponent(`${e.code} ${e.name}`)}`;

/** Datasheet number -> the spec table published for it, as a link. Product.astro
 *  numbers a page's tables #config-1, #config-2... in frontmatter order. */
export async function specTableLinks(): Promise<Map<string, string>> {
  const links = new Map<string, string>();
  for (const entry of await getCollection('pages')) {
    entry.data.specs.forEach((s, i) => {
      if (s.datasheet) links.set(s.datasheet, `${page(entry.data.pageId).slug}#config-${i + 1}`);
    });
  }
  return links;
}

/** Where a design lives on the site: its own spec table if it has one, else
 *  its row in its family's list. Either way the link lands on the design. */
export const designLink = (e: EquipmentItem, tables: Map<string, string>): { href: string; label: string } => {
  const table = tables.get(designNumber(e));
  return table
    ? { href: table, label: 'View specification' }
    : { href: `${page(e.family).slug}#${designAnchor(e)}`, label: 'View in family' };
};
