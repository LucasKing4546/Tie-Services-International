/**
 * Pays out the homepage hoist line (Hero.astro, .hoist in home.css) as the
 * page scrolls. Booted from 'astro:page-load' in Base.astro.
 *
 * One passive scroll listener, one write per frame, set on the hoist itself
 * rather than <html> so a scroll never restyles the whole document.
 */

let off: (() => void) | undefined;

export function initHoist(): void {
  off?.();
  off = undefined;

  const hoist = document.querySelector<HTMLElement>('.hoist');
  if (!hoist) return;

  let raf = 0;
  const update = () => {
    raf = 0;
    // The hoist only exists in the hero; stop writing once it has scrolled away.
    if (scrollY < innerHeight * 1.5) hoist.style.setProperty('--sy', String(Math.round(scrollY)));
  };
  const queue = () => { if (!raf) raf = requestAnimationFrame(update); };

  addEventListener('scroll', queue, { passive: true });
  update();

  off = () => {
    removeEventListener('scroll', queue);
    cancelAnimationFrame(raf);
  };
}
