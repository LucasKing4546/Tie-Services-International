/**
 * Real photography, keyed by the same Image Brief ref an MDX file already
 * uses. ImageSlot looks a ref up here: a hit renders an optimised <Image>,
 * a miss renders the drawing-sheet placeholder plate exactly as before.
 *
 * Provenance: the `s01/s04/s06-equipment-*` files are camera originals and
 * are unambiguously RTG's own. Several of the rest read as third-party press
 * or stock (a defence-investment article image, what appears to be a journal
 * cover, another firm's wind illustration) and are published here on RTG's
 * instruction — confirm ownership or licence for those before launch.
 *
 * That is why filling a slot needs no schema change and no template edit —
 * a page keeps writing `ref: "IMG-S01-A"` whether the photograph exists yet
 * or not, and the day it lands the page starts showing it.
 *
 * Imported rather than served from public/, so Astro fingerprints each file
 * and sharp emits responsive AVIF/WebP at several widths. The originals are
 * camera files up to 6016x4000 and 6.7 MB; none of them ships raw.
 *
 * Only photographs RTG demonstrably owns are listed here. Several other
 * files supplied alongside these read as third-party press or stock imagery
 * (a defence-news article image, a journal cover, another firm's
 * illustration) and are deliberately left out until provenance is confirmed
 * — publishing them would be a copyright exposure, and CLAUDE.md §6 already
 * flags that this matters commercially as well as legally.
 */
import type { ImageMetadata } from 'astro';

import s01a from '../assets/sectors/s01-equipment-a.jpg';
import s01b from '../assets/sectors/s01-equipment-b.jpg';
import s01c from '../assets/sectors/s01-deck-spread.jpg';
import s02a from '../assets/sectors/s02-pipeline-survey.jpg';
import s02b from '../assets/sectors/s02-seabed-tool.jpg';
import s03a from '../assets/sectors/s03-wind-array.jpg';
import s03b from '../assets/sectors/s03-cable-work.jpg';
import s04a from '../assets/sectors/s04-equipment-a.jpg';
import s04b from '../assets/sectors/s04-equipment-b.jpg';
import s04c from '../assets/sectors/s04-equipment-c.jpg';
import s04d from '../assets/sectors/s04-acquisition.jpg';
import s05a from '../assets/sectors/s05-research-deck.jpg';
import s05b from '../assets/sectors/s05-research-vessel.jpg';
import s06a from '../assets/sectors/s06-equipment-a.png';
import s06b from '../assets/sectors/s06-rov-launch.webp';
import s06c from '../assets/sectors/s06-dive-spread.jpg';
import s07a from '../assets/sectors/s07-naval-vessel.webp';

export const MEDIA: Record<string, ImageMetadata> = {
  'IMG-S01-A': s01a,
  'IMG-S01-B': s01b,
  'IMG-S01-C': s01c,
  'IMG-S02-A': s02a,
  'IMG-S02-B': s02b,
  'IMG-S03-A': s03a,
  'IMG-S03-B': s03b,
  'IMG-S04-A': s04a,
  'IMG-S04-B': s04b,
  'IMG-S04-C': s04c,
  'IMG-S04-D': s04d,
  'IMG-S05-A': s05a,
  'IMG-S05-B': s05b,
  'IMG-S06-A': s06a,
  'IMG-S06-B': s06b,
  'IMG-S06-C': s06c,
  'IMG-S07-A': s07a,
};

/** The photograph for an Image Brief ref, or undefined while it is unshot. */
export function mediaFor(ref: string): ImageMetadata | undefined {
  return MEDIA[ref];
}
