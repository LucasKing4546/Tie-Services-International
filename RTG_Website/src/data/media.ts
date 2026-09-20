/**
 * Real photography, keyed by the same Image Brief ref an MDX file uses.
 * ImageSlot looks a ref up here: a hit renders an optimised <Image>, a miss
 * renders the placeholder plate.
 *
 * Imported rather than served from public/, so Astro fingerprints each file
 * and sharp emits responsive AVIF/WebP. Originals are camera files up to
 * 6016x4000 and 6.7 MB; none ships raw.
 *
 * PROVENANCE (copyright-sensitive — check this before adding or re-enabling
 * any entry): only photographs RTG demonstrably owns are listed here. The
 * `s01/s04/s06-equipment-*` files are camera originals, unambiguously RTG's
 * own. Other files supplied alongside these read as third-party press or
 * stock (a defence-news article image, a journal cover, another firm's
 * wind-turbine illustration) and are deliberately left out until ownership
 * or licence is confirmed — publishing them would be a copyright exposure
 * (CLAUDE.md §6).
 *
 * IMG-H01-A (homepage hero) shows a client's vessel with the client's name
 * visible on the wheelhouse, published on the user's explicit instruction
 * ("we can use the Fugro picture"). That authorises the photograph only —
 * it does not authorise naming the client in copy; no written permission
 * exists (CLAUDE.md §5.7), so no page text names them.
 *
 * IMG-S02-A/B and IMG-S05-A/B are confirmed third-party (a stock filename,
 * a journal cover, a named institute's own vessel) and are unused by any
 * page. IMG-S02-C and IMG-S05-C replaced them as S-02's and S-05's hero and
 * carry no visible branding. The A/B refs stay registered in case real RTG
 * photography for either sector arrives.
 *
 * IMG-E00-A is a full-vessel cutaway CAD render, not a photograph, and its
 * ownership is unconfirmed — check it alongside the rest of the
 * non-photographic material before launch. IMG-E00-B (a real camera photo)
 * is used as E-00's hero instead; A stays on the page as a supporting image.
 *
 * IMG-X01-A (four RTG staff, named) is registered but not placed on any
 * page: it's a finished graphic with names and roles baked into the image,
 * so PageHero's caption/scrim treatment overlaps it when used as a hero.
 * It needs a plain "meet the team" block, which doesn't exist yet.
 */
import type { ImageMetadata } from 'astro';

import s01a from '../assets/sectors/s01-equipment-a.jpg';
import s01b from '../assets/sectors/s01-equipment-b.jpg';
import s01c from '../assets/sectors/s01-deck-spread.jpg';
import s02a from '../assets/sectors/s02-pipeline-survey.jpg';
import s02b from '../assets/sectors/s02-seabed-tool.jpg';
import s02c from '../assets/sectors/s02-deck-installation.jpg';
// s03a/s03b are stock illustration, not RTG photography — confirmed
// third-party (CLAUDE.md §9.3). Not wired into s-03.mdx; S-03 shows the
// placeholder plate until real photography exists.
import s03a from '../assets/sectors/s03-wind-array.jpg';
import s03b from '../assets/sectors/s03-cable-work.jpg';
import s04a from '../assets/sectors/s04-equipment-a.jpg';
import s04b from '../assets/sectors/s04-equipment-b.jpg';
import s04c from '../assets/sectors/s04-equipment-c.jpg';
import s04d from '../assets/sectors/s04-acquisition.jpg';
import s04e from '../assets/sectors/s04-reel-deck.jpg';
import s05a from '../assets/sectors/s05-research-deck.jpg';
import s05b from '../assets/sectors/s05-research-vessel.jpg';
import s05c from '../assets/sectors/s05-instrument-deployment.jpg';
import s06a from '../assets/sectors/s06-equipment-a.png';
import s06b from '../assets/sectors/s06-rov-launch.webp';
import s06c from '../assets/sectors/s06-dive-spread.jpg';
import s07a from '../assets/sectors/s07-naval-vessel.webp';
import s07b from '../assets/sectors/s07-lars-build-a.jpg';
import s07c from '../assets/sectors/s07-lars-build-b.jpg';

import homeA from '../assets/home/home-fleet-vessel.jpg';
import e00a from '../assets/equipment/e00-system-overview.jpg';
import e00b from '../assets/equipment/e00-deck-spread.jpg';
import e02a from '../assets/equipment/e02-winch-drum.jpg';
import e02b from '../assets/equipment/e02-deployment-frame.jpg';
import e02c from '../assets/equipment/e02-hpu.jpg';
import e02d from '../assets/equipment/e02-ds01-guarded.jpg';
import e02e from '../assets/equipment/e02-ds01-panel.jpg';
import e02f from '../assets/equipment/e02-ds38-hpu-b.jpg';
import e02g from '../assets/equipment/e02-ds38-winch.jpg';
import e03a from '../assets/equipment/e03-compact-winch.jpg';
import e03b from '../assets/equipment/e03-ds83-unit.jpg';
import e03c from '../assets/equipment/e03-ds83-pair.jpg';
import e04a from '../assets/equipment/e04-ds11-overall.jpg';
import e04b from '../assets/equipment/e04-ds11-drive.jpg';
import e04c from '../assets/equipment/e04-ds11-detail.jpg';
import e05a from '../assets/equipment/e05-umbilical-winch.jpg';
import e05b from '../assets/equipment/e05-ds63-aframe.jpg';
import e06a from '../assets/equipment/e06-mooring-winch.jpg';
import e06b from '../assets/equipment/e06-ds80-side.jpg';
import e06c from '../assets/equipment/e06-ds74-a.jpg';
import e06d from '../assets/equipment/e06-ds74-b.jpg';
import e06e from '../assets/equipment/e06-ds74-c.jpg';
import e07a from '../assets/equipment/e07-aframe-deployment.jpg';
import e07b from '../assets/equipment/e07-ds96-a.jpg';
import e07c from '../assets/equipment/e07-ds96-b.jpg';
import e07d from '../assets/equipment/e07-ds96-c.jpg';
import e10a from '../assets/equipment/e10-tracks-gripping.jpg';
import e10b from '../assets/equipment/e10-skid-hpu.jpg';
import l00a from '../assets/lifecycle/l00-deck-work.jpg';
import x01a from '../assets/contact/x01-team.jpg';

export const MEDIA: Record<string, ImageMetadata> = {
  'IMG-H01-A': homeA,
  'IMG-S01-A': s01a,
  'IMG-S01-B': s01b,
  'IMG-S01-C': s01c,
  'IMG-S02-A': s02a,
  'IMG-S02-B': s02b,
  'IMG-S02-C': s02c,
  'IMG-S03-A': s03a,
  'IMG-S03-B': s03b,
  'IMG-S04-A': s04a,
  'IMG-S04-B': s04b,
  'IMG-S04-C': s04c,
  'IMG-S04-D': s04d,
  'IMG-S04-E': s04e,
  'IMG-S05-A': s05a,
  'IMG-S05-B': s05b,
  'IMG-S05-C': s05c,
  'IMG-S06-A': s06a,
  'IMG-S06-B': s06b,
  'IMG-S06-C': s06c,
  'IMG-S07-A': s07a,
  'IMG-S07-B': s07b,
  'IMG-S07-C': s07c,
  'IMG-E00-A': e00a,
  'IMG-E00-B': e00b,
  'IMG-E02-A': e02a,
  'IMG-E02-B': e02b,
  'IMG-E02-C': e02c,
  'IMG-E02-D': e02d,
  'IMG-E02-E': e02e,
  'IMG-E02-F': e02f,
  'IMG-E02-G': e02g,
  'IMG-E03-A': e03a,
  'IMG-E03-B': e03b,
  'IMG-E03-C': e03c,
  'IMG-E04-A': e04a,
  'IMG-E04-B': e04b,
  'IMG-E04-C': e04c,
  'IMG-E05-A': e05a,
  'IMG-E05-B': e05b,
  'IMG-E06-A': e06a,
  'IMG-E06-B': e06b,
  'IMG-E06-C': e06c,
  'IMG-E06-D': e06d,
  'IMG-E06-E': e06e,
  'IMG-E07-A': e07a,
  'IMG-E07-B': e07b,
  'IMG-E07-C': e07c,
  'IMG-E07-D': e07d,
  'IMG-E10-A': e10a,
  'IMG-E10-B': e10b,
  'IMG-L00-A': l00a,
  'IMG-X01-A': x01a,
};

/** The photograph for an Image Brief ref, or undefined while it is unshot. */
export function mediaFor(ref: string): ImageMetadata | undefined {
  return MEDIA[ref];
}

/**
 * The shape of a photograph, so a template can put it where it belongs.
 *
 * Most of RTG's own equipment photographs are portrait despite raw pixel
 * dimensions suggesting landscape — they carry EXIF rotation (orientation 6
 * and 8), and Astro applies it, so width/height here are already correct.
 * A template that assumes landscape will crop the machine in half.
 *
 * Returns undefined ("unknown", not "landscape") when there is no photograph yet.
 */
export function orientationOf(ref: string): 'portrait' | 'square' | 'landscape' | undefined {
  const m = MEDIA[ref];
  if (!m) return undefined;
  const r = m.width / m.height;
  return r < 0.95 ? 'portrait' : r < 1.15 ? 'square' : 'landscape';
}
