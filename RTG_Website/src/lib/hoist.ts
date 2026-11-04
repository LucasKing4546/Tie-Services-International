/**
 * Pays out the homepage hoist line (Hero.astro, .hoist in home.css) as the
 * page scrolls. Booted from 'astro:page-load' in Base.astro.
 *
 * One passive scroll listener, one write per frame, set on the hoist itself
 * rather than <html> so a scroll never restyles the whole document.
 *
 * The payout is capped at the bottom of the hero (measured at rest and
 * whenever the hero resizes), where the page spine (.home-spine in
 * home.css) takes the line on, so at full payout the two read as one line
 * (on a phone the hoist is held short by CSS and --pay has no effect).
 * Under reduced motion the line is drawn at full length and never moves.
 */

let off: (() => void) | undefined;

export function initHoist(): void {
  off?.();
  off = undefined;

  const hoist = document.querySelector<HTMLElement>('.hoist');
  const hero = hoist?.closest<HTMLElement>('.hero');
  if (!hoist || !hero) return;
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches;

  let max = 0;
  const measure = () => {
    hoist.style.removeProperty('--pay');
    // +6: the vessel bobs the hoist by up to 5px; overshooting a little
    // (the hero clips it) means the join with the spine never opens a gap.
    max = Math.max(0, hero.getBoundingClientRect().bottom - hoist.getBoundingClientRect().bottom + 6);
  };

  let raf = 0;
  const update = () => {
    raf = 0;
    hoist.style.setProperty('--pay', `${Math.round(still ? max : Math.min(max, scrollY * 0.55))}px`);
  };
  const queue = () => { if (!raf) raf = requestAnimationFrame(update); };
  // Fires once on observe, then whenever the hero's height changes (fonts
  // arriving, a resize), so the cap is always measured against the real box.
  const ro = new ResizeObserver(() => { measure(); update(); });

  if (!still) addEventListener('scroll', queue, { passive: true });
  ro.observe(hero);

  off = () => {
    removeEventListener('scroll', queue);
    ro.disconnect();
    cancelAnimationFrame(raf);
  };
}
