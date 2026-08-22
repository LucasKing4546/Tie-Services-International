/**
 * Shared prop types for src/components/blocks/*. Kept independent of the
 * Zod schema in content.config.ts (rather than inferred via z.infer) because
 * these describe what a block COMPONENT accepts, not what frontmatter must
 * contain — a template composes blocks from several sources (frontmatter,
 * PageMeta, other MDX entries via lib/content.ts), and a block should not
 * care which.
 */
import type { CollectionEntry } from 'astro:content';

export type PageEntry = CollectionEntry<'pages'>;
export type PageData = PageEntry['data'];

export type Link = { label: string; href: string };

/** A resolved, render-ready card — see lib/content.ts:cardFrom() for how a
 *  frontmatter `card` entry (pageId, or title+href) becomes one of these. */
export interface CardItem {
  title: string;
  href: string;
  blurb?: string;
  meta?: string;
  cta?: string;
  /** Raw <svg> path/shape markup, viewBox 0 0 24 24 — see src/data/home.ts
   *  for the existing icon convention. Rendered with set:html. */
  icon?: string;
}

export type SpecRow = { k: string; v: string; note?: string };

export interface SpecTableData {
  caption: string;
  rows: SpecRow[];
  footnote?: string;
}

export interface ImgBrief {
  ref: string;
  brief: string;
  ratio?: string;
}

export type FieldType = 'text' | 'email' | 'tel' | 'number' | 'date' | 'textarea' | 'select';

export interface FieldSpec {
  label: string;
  name: string;
  type: FieldType;
  options: string[];
  hint?: string;
  required: boolean;
}

export interface Step {
  n?: string;
  title: string;
  body?: string;
  points: string[];
  /** Optional picture-background treatment — used by Ladder.astro's scope-
   *  ladder carousel (TierCard.astro). Absent for every other StepList
   *  consumer (Service, Tier, Guide), which render the plain numbered row. */
  media?: ImgBrief;
}

export type SectionTone = 'default' | 'off' | 'navy';
export type SectionSize = 'lg' | 'sm';

/** Emits the right data-motion attribute so no template hand-writes one —
 *  see src/lib/motion.ts. */
export type MotionHint = 'parallax' | 'sticky' | 'none';

/**
 * Splits a stat value like "1,500" or "250+" into the leading digits (for
 * the .ct count-up span) and a trailing suffix rendered as plain text next
 * to it. Shared by Stats.astro and ProofBar.astro so the split logic — and
 * any future fix to it — exists in exactly one place.
 */
export const isNumericStat = (v: string): boolean => /^[\d,]+/.test(v);
export const statDigits = (v: string): string => v.replace(/[^\d]/g, '');
export const statSuffix = (v: string): string => v.replace(/^[\d,]+/, '');
