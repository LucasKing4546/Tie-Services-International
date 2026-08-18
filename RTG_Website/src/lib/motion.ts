/**
 * Shared motion system. Every page boots this — Base.astro runs it on
 * 'astro:page-load', which fires on first load and again after every
 * client-side navigation under the view-transitions router (the listener
 * itself is only ever registered once, per Astro's script-processing model,
 * but the function it calls runs on every navigation). Templates opt in
 * declaratively (a CSS class, or a `data-motion` attribute) rather than
 * writing their own scroll module — see CLAUDE.md and the template plan for
 * why: src/lib/home-scroll.ts shows what 364 lines of DOM-id-coupled scroll
 * code costs to maintain, and this file exists so the other 17 templates
 * never repeat that.
 *
 * Three behaviours, one shared observer/rAF budget:
 *   1. reveals (.rl / .fu / .stag) + PROOF-figure count-ups (.ct)
 *   2. parallax media (data-motion="parallax")
 *   3. sticky media / sticky spec rail — pure CSS (position: sticky), no
 *      JS involved; documented here because it is part of the same system.
 *
 * Progressive enhancement: elements are visible by default (see the
 * `html.js` gate in tokens.css). Nothing here can make content that was
 * visible become permanently invisible — only add a transition it already
 * had.
 *
 * Teardown: initMotion() runs once per navigation, not once per document —
 * every IntersectionObserver and the parallax scroll listener from the
 * PREVIOUS page must be torn down first, or they accumulate for the life of
 * the tab. teardownFns holds exactly the cleanup for the current page.
 */

let booted = false;
let teardownFns: (() => void)[] = [];

export function initMotion(): void {
  teardownFns.forEach((fn) => fn());
  teardownFns = [];

  const html = document.documentElement;
  html.classList.add('js');

  const rm = matchMedia('(prefers-reduced-motion: reduce)').matches;

  initReveals(rm);
  initCounters(rm);
  if (!rm) initParallax();

  booted = true;
}

/** True once initMotion() has run at least once in this document lifetime. */
export function motionBooted(): boolean {
  return booted;
}

// ---------------------------------------------------------------- reveals
function initReveals(rm: boolean): void {
  const targets = document.querySelectorAll('.rl, .fu, .stag');
  if (!targets.length) return;

  if (rm) {
    // .in is what the CSS keys off; reduced-motion also neutralises the
    // transition itself (tokens.css), so this just avoids the observer.
    targets.forEach((el) => el.classList.add('in'));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
  );
  targets.forEach((el) => io.observe(el));
  teardownFns.push(() => io.disconnect());
}

// ---------------------------------------------------------------- counters
function initCounters(rm: boolean): void {
  const targets = document.querySelectorAll<HTMLElement>('.ct');
  if (!targets.length) return;

  const done = new WeakSet<Element>();
  const cio = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting || done.has(entry.target)) return;
        done.add(entry.target);
        const el = entry.target as HTMLElement;
        const to = Number(el.dataset.to ?? 0);
        if (rm) {
          el.textContent = to.toLocaleString('en-GB');
          return;
        }
        const t0 = performance.now();
        const dur = 1400;
        (function tick(now: number) {
          const p = Math.min(1, (now - t0) / dur);
          const k = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(k * to).toLocaleString('en-GB');
          if (p < 1) requestAnimationFrame(tick);
        })(performance.now());
      });
    },
    { threshold: 0.5 },
  );
  targets.forEach((el) => cio.observe(el));
  teardownFns.push(() => cio.disconnect());
}

// ---------------------------------------------------------------- parallax
/**
 * data-motion="parallax" drifts an element against scroll. CSS-first: where
 * `animation-timeline: view()` is supported (see blocks.css / motion.css),
 * the browser drives it and this function only tags eligible elements with
 * a class so the CSS can target them — no JS runs per frame. Where it is
 * not supported, a single shared rAF loop updates only elements currently
 * near the viewport, tracked by one IntersectionObserver.
 */
function initParallax(): void {
  const els = document.querySelectorAll<HTMLElement>('[data-motion="parallax"]');
  if (!els.length) return;

  const supportsScrollTimeline = CSS.supports('animation-timeline: view()');
  els.forEach((el) => el.classList.add('mo-parallax'));
  if (supportsScrollTimeline) return;

  // Fallback: track which parallax elements are near the viewport, and only
  // move those on scroll, so idle sections cost nothing.
  const active = new Set<HTMLElement>();
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const el = entry.target as HTMLElement;
        if (entry.isIntersecting) active.add(el);
        else active.delete(el);
      });
    },
    { rootMargin: '20% 0px 20% 0px' },
  );
  els.forEach((el) => io.observe(el));

  let ticking = false;
  let live = true;
  function apply(): void {
    ticking = false;
    if (!live) return;
    active.forEach((el) => {
      const r = el.getBoundingClientRect();
      const mid = r.top + r.height / 2 - innerHeight / 2;
      const shift = Math.max(-40, Math.min(40, mid * -0.06));
      el.style.setProperty('--parallax-y', `${shift}px`);
    });
  }
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(apply);
  };
  addEventListener('scroll', onScroll, { passive: true });
  apply();

  teardownFns.push(() => {
    live = false;
    io.disconnect();
    removeEventListener('scroll', onScroll);
  });
}
