/**
 * Drives the depth gauge (DepthGauge.astro) and the homepage hoist line.
 * Booted from 'astro:page-load' in Base.astro, next to initMotion().
 *
 * One passive scroll listener, one write per frame. The custom properties
 * are set on the two elements that read them, not on <html> — an inherited
 * property changed on the root restyles the whole document every frame.
 */

let off: (() => void) | undefined;

/** Upper bound of each zone in metres; anything deeper is the last name. */
const ZONES: [number, string][] = [
  [10, 'Surface'],
  [200, 'Sunlight zone'],
  [1000, 'Twilight zone'],
];

export function zoneAt(m: number, max: number): string {
  if (m >= max) return 'Seabed';
  return ZONES.find(([limit]) => m < limit)?.[1] ?? 'Midnight zone';
}

export function initDepth(): void {
  off?.();

  const gauge = document.getElementById('gauge');
  const metres = document.getElementById('gaugeM');
  const zone = document.getElementById('gaugeZ');
  if (!gauge || !metres || !zone) return;

  const max = Number(gauge.dataset.max) || 0;
  const hoist = document.querySelector<HTMLElement>('.hoist');
  let raf = 0;

  const update = () => {
    raf = 0;
    const span = document.documentElement.scrollHeight - innerHeight;
    const p = span > 0 ? Math.min(1, Math.max(0, scrollY / span)) : 0;
    gauge.style.setProperty('--depth', p.toFixed(4));
    // Squared, so the shallow zones get a fair share of the page instead of
    // the first 200 m flashing past in the first few percent of scroll.
    const m = p >= 1 ? max : Math.round((max * p * p) / 10) * 10;
    metres.textContent = `${m.toLocaleString('en-GB')} m`;
    zone.textContent = zoneAt(m, max);
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
