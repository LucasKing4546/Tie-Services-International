/**
 * Shared motion system, booted once per navigation from 'astro:page-load'
 * (Base.astro) — including client-side navigations under the view-transitions
 * router, where a module's top-level code runs once but this function must
 * run again. Templates opt in declaratively (a CSS class or a `data-motion`
 * attribute) rather than writing their own scroll module.
 *
 * Five behaviours, one shared observer/rAF budget:
 *   1. reveals (.rl / .fu / .stag) + PROOF-figure count-ups (.ct)
 *   2. parallax media (data-motion="parallax")
 *   3. sticky media / sticky spec rail — pure CSS (position: sticky), no JS
 *      involved; documented here because it is part of the same system.
 *   4. carousels ([data-carousel], Carousel.astro, and [data-scroll-track],
 *      ScrollTrack.astro) — prev/next buttons driving the row's native
 *      scroll-snap. Page scroll never moves a carousel.
 *   5. before/after compare ([data-compare], CompareSlot.astro) — a
 *      draggable divider revealing one image over another. A control, not
 *      an animation, so it alone still runs under prefers-reduced-motion.
 *
 * Progressive enhancement: elements are visible by default (the `html.js`
 * gate in tokens.css) — nothing here can make visible content permanently
 * invisible, only add a transition it already had.
 *
 * Teardown: every IntersectionObserver and scroll listener from the
 * PREVIOUS page must be torn down before this runs again, or they
 * accumulate for the life of the tab. teardownFns holds exactly the current
 * page's cleanup.
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
  initCompare(rm);

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
 * `animation-timeline: view()` is supported (blocks.css / motion.css), the
 * browser drives it and this just tags elements with a class — no JS per
 * frame. Otherwise a single shared rAF loop updates only elements near the
 * viewport, tracked by one IntersectionObserver.
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
 * [data-carousel] (Carousel.astro) and [data-scroll-track] (ScrollTrack.astro):
 * CSS scroll-snap handles the actual swipe/drag natively — this only drives
 * the prev/next buttons and keeps their disabled state honest at each scroll
 * end. Buttons stay display:none (blocks.css) until this runs, so a no-JS
 * visit never sees a button that does nothing.
 */
function initCarousels(rm: boolean): void {
  const cars = document.querySelectorAll<HTMLElement>('[data-carousel], [data-scroll-track]');
  if (!cars.length) return;

  cars.forEach((car) => {
    const track = car.querySelector<HTMLElement>('.car-track, .strack-rail');
    const prev = car.querySelector<HTMLButtonElement>('.car-prev, .strack-prev');
    const next = car.querySelector<HTMLButtonElement>('.car-next, .strack-next');
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

// ------------------------------------------------------- before/after compare
/**
 * [data-compare] (CompareSlot.astro): a divider the visitor drags to reveal
 * one image over another. The only non-visitor-driven behaviour is a
 * one-shot entrance sweep, announcing the control as draggable.
 *
 * Runs under prefers-reduced-motion too, unlike the pin/track choreography
 * above — this is a control, not an animation. Only the entrance sweep is
 * suppressed (its CSS transition is disabled in the same media query), so a
 * reduced-motion visitor gets a divider that simply starts at the halfway
 * point.
 */
function initCompare(rm: boolean): void {
  const wraps = document.querySelectorAll<HTMLElement>('[data-compare]');
  if (!wraps.length) return;

  wraps.forEach((wrap) => {
    const frame = wrap.querySelector<HTMLElement>('.cmp-frame');
    const reveal = wrap.querySelector<HTMLElement>('.cmp-reveal');
    const handle = wrap.querySelector<HTMLButtonElement>('.cmp-handle');
    if (!frame || !reveal || !handle) return;

    const beforeLabel = wrap.querySelector('.cmp-tag-before')?.textContent?.trim() ?? 'before';
    const afterLabel = wrap.querySelector('.cmp-tag-after')?.textContent?.trim() ?? 'after';

    wrap.classList.add('on');

    // The clipped plate is absolutely positioned, so it no longer inherits
    // the frame's width — pin it explicitly, or the revealed image squashes
    // as the divider moves rather than being uncovered by it.
    const sizeReveal = () => {
      reveal.style.setProperty('--cmp-w', `${frame.clientWidth}px`);
    };
    sizeReveal();

    let pct = 50;
    const setPct = (next: number) => {
      // Never let either side disappear completely: a fully-collapsed plate
      // reads as a broken image rather than as a comparison at its extreme.
      pct = Math.min(96, Math.max(4, next));
      reveal.style.width = `${pct}%`;
      handle.style.left = `${pct}%`;
      handle.setAttribute('aria-valuenow', String(Math.round(pct)));
      handle.setAttribute(
        'aria-valuetext',
        `${Math.round(pct)}% ${beforeLabel.toLowerCase()}, ${100 - Math.round(pct)}% ${afterLabel.toLowerCase()}`,
      );
    };

    const pctFromX = (x: number) => {
      const r = frame.getBoundingClientRect();
      return r.width ? ((x - r.left) / r.width) * 100 : 50;
    };

    // Dragging starts only on pointerdown on the handle. The move listener
    // sits on the frame instead, so the pointer can stray off the 46px
    // handle mid-drag without dropping it — but it does nothing until
    // `dragging` is set, or a plain swipe across the image on a phone
    // would hijack scroll.
    let dragging = false;
    const down = (e: PointerEvent) => {
      dragging = true;
      handle.setPointerCapture(e.pointerId);
      wrap.classList.remove('sweep');
      setPct(pctFromX(e.clientX));
      e.preventDefault();
    };
    const move = (e: PointerEvent) => {
      if (dragging) setPct(pctFromX(e.clientX));
    };
    const up = () => { dragging = false; };

    const onKey = (e: KeyboardEvent) => {
      const step = e.shiftKey ? 10 : 4;
      let handled = true;
      if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') setPct(pct - step);
      else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') setPct(pct + step);
      else if (e.key === 'Home') setPct(0);
      else if (e.key === 'End') setPct(100);
      else handled = false;
      if (handled) {
        wrap.classList.remove('sweep');
        e.preventDefault();
      }
    };

    handle.addEventListener('pointerdown', down);
    frame.addEventListener('pointermove', move);
    handle.addEventListener('pointerup', up);
    handle.addEventListener('pointercancel', up);
    handle.addEventListener('keydown', onKey);
    addEventListener('resize', sizeReveal);

    setPct(50);

    teardownFns.push(() => {
      handle.removeEventListener('pointerdown', down);
      frame.removeEventListener('pointermove', move);
      handle.removeEventListener('pointerup', up);
      handle.removeEventListener('pointercancel', up);
      handle.removeEventListener('keydown', onKey);
      removeEventListener('resize', sizeReveal);
      wrap.classList.remove('on', 'sweep');
    });

    if (rm) return;

    // Entrance sweep: open from one side to the middle the first time the
    // control comes on screen, so it is visibly a divider. Same
    // observe-once-then-unobserve shape as initReveals().
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        io.unobserve(entry.target);
        wrap.classList.add('sweep');
        setPct(88);
        requestAnimationFrame(() => requestAnimationFrame(() => setPct(50)));
      });
    }, { threshold: 0.35 });
    io.observe(wrap);
    teardownFns.push(() => io.disconnect());
  });
}
