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
 *
 * IMG-H01-A (the homepage hero) shows a client's vessel with the client's
 * name visible on the wheelhouse — published on the user's explicit
 * instruction ("we can use the Fugro picture"). That authorises the
 * photograph. It does not authorise naming the client in copy anywhere on
 * the site — CLAUDE.md §5.7 still requires written permission for that, and
 * none exists yet, so no page text names them.
 *
 * IMG-S02-C and IMG-S05-C replace what had been S-02's and S-05's only
 * hero/media photographs — both of the originals (IMG-S02-A/B,
 * IMG-S05-A/B) are on the pre-launch reverse-image-search list, one of them
 * literally a named third-party research vessel's own photo. The new pair
 * carries no visible branding and is a materially safer default. CLAUDE.md
 * §9.3's 2026-09-18 drop confirms both S02-A/B and S05-A/B as third-party
 * (a stock filename, a journal cover, a named institute's own vessel) with
 * no replacement photography supplied — neither page references A/B any
 * more. The refs stay registered here rather than deleted, since real
 * RTG photography for either sector would slot straight into these ids.
 *
 * IMG-E00-A is a full-vessel cutaway CAD render, not a photograph. It
 * carries no visible branding, but it is not confirmed as RTG's own
 * commissioned artwork either — add it to the pre-launch provenance check
 * alongside the rest of the non-photographic material.
 *
 * IMG-X01-A (four RTG staff, named) is registered but not currently placed
 * on any page. It is a finished graphic — names and roles already set into
 * the image — not a plain photo, and PageHero's H1/lede/scrim treatment
 * overlaps its own captions when tried as a full-bleed hero. It needs a
 * plain, non-overlaid placement (a "meet the team" block) rather than
 * hero.media; that block does not exist yet.
 */
import type { ImageMetadata } from 'astro';

import s01a from '../assets/sectors/s01-equipment-a.jpg';
import s01b from '../assets/sectors/s01-equipment-b.jpg';
import s01c from '../assets/sectors/s01-deck-spread.jpg';
import s02a from '../assets/sectors/s02-pipeline-survey.jpg';
import s02b from '../assets/sectors/s02-seabed-tool.jpg';
import s02c from '../assets/sectors/s02-deck-installation.jpg';
// s03a/s03b are stock illustration, not RTG photography (a wind-turbine/
// subsea-cable graphic and a generic cable-cross-section render) — per
// CLAUDE.md §9.3, the 2026-09-18 drop confirms both as third-party. Kept
// registered for reference but not wired into s-03.mdx; S-03 has no real
// photography yet and shows the honest placeholder plate until it does.
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
import e02a from '../assets/equipment/e02-winch-drum.jpg';
import e02b from '../assets/equipment/e02-deployment-frame.jpg';
import e02c from '../assets/equipment/e02-hpu.jpg';
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
  'IMG-E02-A': e02a,
  'IMG-E02-B': e02b,
  'IMG-E02-C': e02c,
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
 * Worth knowing: most of RTG's own equipment photographs are portrait. They
 * are camera originals carrying EXIF rotation (orientation 6 and 8), so the
 * raw pixel dimensions read as landscape and only the corrected ones are
 * true — Astro applies the rotation, so the width and height here are the
 * real ones. A template that assumes landscape will crop the machine in
 * half.
 *
 * Returns undefined when there is no photograph yet, which a caller should
 * read as "unknown", not as "landscape".
 */
export function orientationOf(ref: string): 'portrait' | 'square' | 'landscape' | undefined {
  const m = MEDIA[ref];
  if (!m) return undefined;
  const r = m.width / m.height;
  return r < 0.95 ? 'portrait' : r < 1.15 ? 'square' : 'landscape';
}
