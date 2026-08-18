/**
 * Resolves a page id against the workbook first, then the off-map records
 * (currently just 404). Base.astro uses this instead of calling page()
 * directly so it can tell the two apart — an off-map page always renders
 * noindex, regardless of its (unused) `access` field.
 */
import { page as lookupPage, type PageMeta } from '@data/pages';
import { OFF_MAP_PAGES, OFF_MAP_IDS } from '@data/pages-extra';

const BY_ID = new Map(OFF_MAP_PAGES.map((p) => [p.id, p]));

export interface ResolvedPage {
  p: PageMeta;
  /** True for pages outside the Page Map workbook (e.g. 404) — always noindex. */
  offMap: boolean;
}

export function resolvePage(id: string): ResolvedPage {
  if (OFF_MAP_IDS.has(id)) {
    const p = BY_ID.get(id);
    if (!p) throw new Error(`Unknown off-map page id "${id}". Check src/data/pages-extra.ts.`);
    return { p, offMap: true };
  }
  return { p: lookupPage(id), offMap: false };
}
