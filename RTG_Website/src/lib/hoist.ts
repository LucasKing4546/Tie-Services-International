/**
 * Pays out the homepage hoist line (Hero.astro, .hoist in home.css) as the
 * page scrolls. Booted from 'astro:page-load' in Base.astro.
 *
 * One passive scroll listener, one write per frame, set on the hoist itself
 * rather than <html> so a scroll never restyles the whole document.
 *
 * The payout is capped at the room left inside the hero (measured at rest
 * and whenever the hero resizes), because .hero clips: past that the load used to be cut
 * off. Under reduced motion the line stays at its resting length.
 */

let off: (() => void) | undefined;

// Clear space kept between the load and the bottom of the hero.
const LOAD_AND_MARGIN = 28 + 24;

export function initHoist(): void {
  off?.();
  off = undefined;

  const hoist = document.querySelector<HTMLElement>('.hoist');
  const hero = hoist?.closest<HTMLElement>('.hero');
  if (!hoist || !hero || matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  let max = 0;
  const measure = () => {
    hoist.style.removeProperty('--pay');
    max = Math.max(0, hero.getBoundingClientRect().bottom - hoist.getBoundingClientRect().bottom - LOAD_AND_MARGIN);
  };

  let raf = 0;
  const update = () => {
    raf = 0;
    hoist.style.setProperty('--pay', `${Math.round(Math.min(max, scrollY * 0.55))}px`);
  };
  const queue = () => { if (!raf) raf = requestAnimationFrame(update); };
  // Fires once on observe, then whenever the hero's height changes (fonts
  // arriving, a resize), so the cap is always measured against the real box.
  const ro = new ResizeObserver(() => { measure(); update(); });

  addEventListener('scroll', queue, { passive: true });
  ro.observe(hero);

  off = () => {
    removeEventListener('scroll', queue);
    ro.disconnect();
    cancelAnimationFrame(raf);
  };
}
