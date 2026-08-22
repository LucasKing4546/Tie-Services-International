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
 * Four behaviours, one shared observer/rAF budget:
 *   1. reveals (.rl / .fu / .stag) + PROOF-figure count-ups (.ct)
 *   2. parallax media (data-motion="parallax")
 *   3. sticky media / sticky spec rail — pure CSS (position: sticky), no
 *      JS involved; documented here because it is part of the same system.
 *   4. carousels ([data-carousel], Carousel.astro) — prev/next buttons
 *      driving the track's native scroll-snap.
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
  initCarousels(rm);
  if (!rm) initScrollTracks();

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

// --------------------------------------------------------------- carousels
/**
 * Every [data-carousel] (Carousel.astro) gets prev/next buttons that scroll
 * its track by one card-width. The track itself needs no JS at all — CSS
 * scroll-snap already makes it swipe/scroll/drag natively; this only drives
 * the two buttons and keeps their disabled state honest at each scroll end.
 * Buttons stay display:none (blocks.css) until this runs, so a no-JS visit
 * never sees a button that does nothing.
 */
function initCarousels(rm: boolean): void {
  const cars = document.querySelectorAll<HTMLElement>('[data-carousel]');
  if (!cars.length) return;

  cars.forEach((car) => {
    const track = car.querySelector<HTMLElement>('.car-track');
    const prev = car.querySelector<HTMLButtonElement>('.car-prev');
    const next = car.querySelector<HTMLButtonElement>('.car-next');
    if (!track || !prev || !next) return;

    const cardWidth = () => (track.firstElementChild as HTMLElement | null)?.getBoundingClientRect().width ?? track.clientWidth;
    const gap = () => parseFloat(getComputedStyle(track).columnGap || '20') || 20;
    const go = (dir: number) => track.scrollBy({ left: dir * (cardWidth() + gap()), behavior: rm ? 'auto' : 'smooth' });

    const update = () => {
      const max = track.scrollWidth - track.clientWidth;
      prev.disabled = track.scrollLeft <= 2;
      next.disabled = track.scrollLeft >= max - 2;
    };

    prev.addEventListener('click', () => go(-1));
    next.addEventListener('click', () => go(1));
    track.addEventListener('scroll', update, { passive: true });
    update();

    teardownFns.push(() => track.removeEventListener('scroll', update));
  });
}

// ----------------------------------------------------------- scroll tracks
/**
 * [data-scroll-track] (ScrollTrack.astro): the section pins for as long as
 * it takes to pull its rail sideways, so vertical scroll reads the cards
 * horizontally. The homepage has done this since day one via ids hard-wired
 * into home-scroll.ts; this is the generic version, so a template gets the
 * same set-piece by composing a component rather than by writing a scroll
 * module of its own.
 *
 * Not called at all under prefers-reduced-motion, and it bails under 900px:
 * in both cases the rail stays the native horizontally scrollable row it is
 * without any JS, so the cards are always reachable.
 */
function initScrollTracks(): void {
  const tracks = document.querySelectorAll<HTMLElement>('[data-scroll-track]');
  if (!tracks.length) return;

  const items: { wrap: HTMLElement; rail: HTMLElement; fill: HTMLElement | null; dist: number }[] = [];

  const measure = () => {
    items.length = 0;
    tracks.forEach((wrap) => {
      const rail = wrap.querySelector<HTMLElement>('.strack-rail');
      if (!rail) return;
      // Under 900px the CSS reverts to a plain scrollable row — drop the
      // pinning class and every inline style this function set, so a resize
      // down to mobile cannot strand the section at a stale height.
      if (innerWidth < 900) {
        wrap.classList.remove('on');
        wrap.style.height = '';
        rail.style.transform = '';
        return;
      }
      // Only pin when there is genuinely something to travel. A track whose
      // cards already fit — three equipment cards on a wide desktop, say —
      // would otherwise hold a whole viewport hostage and move nothing,
      // which is worse than not pinning at all. It stays a static full-bleed
      // navy band in that case, which is still doing the tonal job.
      const dist = Math.max(0, rail.scrollWidth - innerWidth);
      if (dist === 0) {
        wrap.classList.remove('on');
        wrap.style.height = '';
        rail.style.transform = '';
        return;
      }
      wrap.classList.add('on');
      wrap.style.height = `${innerHeight + dist}px`;
      items.push({ wrap, rail, fill: wrap.querySelector<HTMLElement>('.strack-prog .fill'), dist });
    });
  };

  let ticking = false;
  let live = true;
  const apply = () => {
    ticking = false;
    if (!live) return;
    for (const { wrap, rail, fill, dist } of items) {
      if (dist <= 0) continue;
      const r = wrap.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, -r.top / (r.height - innerHeight)));
      rail.style.transform = `translate3d(${-p * dist}px,0,0)`;
      if (fill) fill.style.width = `${p * 100}%`;
    }
  };
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(apply);
  };
  const onResize = () => { measure(); apply(); };

  measure();
  apply();
  addEventListener('scroll', onScroll, { passive: true });
  addEventListener('resize', onResize);

  teardownFns.push(() => {
    live = false;
    removeEventListener('scroll', onScroll);
    removeEventListener('resize', onResize);
    // Leave no inline height or transform behind for the next page.
    tracks.forEach((wrap) => {
      wrap.classList.remove('on');
      wrap.style.height = '';
      const rail = wrap.querySelector<HTMLElement>('.strack-rail');
      if (rail) rail.style.transform = '';
    });
  });
}
