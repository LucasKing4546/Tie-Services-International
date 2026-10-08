/**
 * Drives the depth gauge (DepthGauge.astro) and the homepage hoist line.
 * Booted from 'astro:page-load' in Base.astro, next to initMotion().
 *
 * One passive scroll listener, one write per frame. The custom properties
 * are set on the two elements that read them, not on <html> — an inherited
 * property changed on the root restyles the whole document every frame.
 */

let off: (() => void) | undefined;

/** The readout's label for a section: its data-zone if it has one, else its
 *  own first heading, cut to fit the readout. */
export function zoneOf(el: HTMLElement): string {
  const text = el.dataset.zone ?? el.querySelector('h2, h3')?.textContent?.replace(/\s+/g, ' ').trim() ?? '';
  return text.length > 26 ? `${text.slice(0, 25).trimEnd()}…` : text;
}

export function initDepth(): void {
  off?.();

  const gauge = document.getElementById('gauge');
  const metres = document.getElementById('gaugeM');
  const zone = document.getElementById('gaugeZ');
  if (!gauge || !metres || !zone) return;

  const max = Number(gauge.dataset.max) || 0;
  const hoist = document.querySelector<HTMLElement>('.hoist');
  // Everything the page is made of, top to bottom, with the label each one
  // shows. A section with no label of its own keeps the one above it.
  const sections = [...document.querySelectorAll<HTMLElement>('main > *, footer.ftr')]
    .map((el) => ({ el, label: zoneOf(el) }))
    .filter((s) => s.label);
  let raf = 0;

  const update = () => {
    raf = 0;
    const span = document.documentElement.scrollHeight - innerHeight;
    const p = span > 0 ? Math.min(1, Math.max(0, scrollY / span)) : 0;
    gauge.style.setProperty('--depth', p.toFixed(4));
    // Squared, so the shallow water gets a fair share of the page instead of
    // the first 200 m flashing past in the first few percent of scroll.
    const m = p >= 1 ? max : Math.round((max * p * p) / 10) * 10;
    metres.textContent = `${m.toLocaleString('en-GB')} m`;
    // The section under the middle of the screen; at the very bottom that is
    // always the last one, however short it is.
    const mid = innerHeight * 0.5;
    const here = p >= 1 ? sections.at(-1) : sections.findLast((s) => s.el.getBoundingClientRect().top <= mid);
    zone.textContent = (here ?? sections[0])?.label ?? '';
    // The hoist only exists in the homepage hero; stop writing once it has
    // scrolled away.
    if (hoist && scrollY < innerHeight * 1.5) hoist.style.setProperty('--sy', String(Math.round(scrollY)));
  };
  const queue = () => { if (!raf) raf = requestAnimationFrame(update); };

  addEventListener('scroll', queue, { passive: true });
  addEventListener('resize', queue);
  update();

  off = () => {
    removeEventListener('scroll', queue);
    removeEventListener('resize', queue);
    cancelAnimationFrame(raf);
  };
}
