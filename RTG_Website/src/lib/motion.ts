/**
 * Shared motion system, booted once per navigation from 'astro:page-load'
 * (Base.astro) — including client-side navigations under the view-transitions
 * router, where a module's top-level code runs once but this function must
 * run again. Templates opt in declaratively (a CSS class or a `data-motion`
 * attribute) rather than writing their own scroll module.
 *
 * Seven behaviours, one shared observer/rAF budget:
 *   1. reveals (.rl / .fu / .stag) + PROOF-figure count-ups (.ct)
 *   2. parallax media (data-motion="parallax")
 *   3. sticky media / sticky spec rail — pure CSS (position: sticky), no JS
 *      involved; documented here because it is part of the same system.
 *   4. carousels ([data-carousel], Carousel.astro) — prev/next buttons
 *      driving the track's native scroll-snap.
 *   5. scroll tracks ([data-scroll-track], ScrollTrack.astro) — a pinned
 *      band whose cards move sideways as the page scrolls down.
 *   6. pinned stages ([data-pin-stages], PinnedStages.astro) — a pinned
 *      section whose stages cross-fade one at a time as the page scrolls.
 *   7. before/after compare ([data-compare], CompareSlot.astro) — a
 *      draggable divider revealing one image over another.
 *
 * 5 and 6 generalise the homepage's own set-pieces (home-scroll.ts keeps its
 * own 3D-coupled copies). 7 is a control, not an animation, so it alone
 * still runs under prefers-reduced-motion.
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
  initScrollTracks(rm);
  initPinStages(rm);
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
 * [data-carousel] (Carousel.astro): CSS scroll-snap handles the actual
 * swipe/scroll/drag natively — this only drives the prev/next buttons and
 * keeps their disabled state honest at each scroll end. Buttons stay
 * display:none (blocks.css) until this runs, so a no-JS visit never sees a
 * button that does nothing.
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
 * [data-scroll-track] (ScrollTrack.astro): the section pins while its rail
 * is pulled sideways, so vertical scroll reads the cards horizontally — the
 * generic version of the homepage's hard-wired .hz-track. The pin/transform
 * machinery bails under 900px and under prefers-reduced-motion (rm), leaving
 * the rail as a native horizontally scrollable row. That fallback has no
 * visible affordance beyond a hidden-scrollbar drag/swipe, so unlike the pin
 * machinery, the prev/next buttons are wired unconditionally (mirroring
 * initCarousels()) and adapt to whichever mode is active:
 *   pinned   -> stepping a card scrolls the page (1:1 scroll-to-transform)
 *   fallback -> steps the rail's own native scroll, like a Carousel
 */
function initScrollTracks(rm: boolean): void {
  const tracks = document.querySelectorAll<HTMLElement>('[data-scroll-track]');
  if (!tracks.length) return;

  tracks.forEach((wrap) => {
    const rail = wrap.querySelector<HTMLElement>('.strack-rail');
    const prev = wrap.querySelector<HTMLButtonElement>('.strack-prev');
    const next = wrap.querySelector<HTMLButtonElement>('.strack-next');
    if (!rail || !prev || !next) return;
    const step = () => {
      const card = rail.firstElementChild as HTMLElement | null;
      const gap = parseFloat(getComputedStyle(rail).columnGap || '22') || 22;
      return (card?.getBoundingClientRect().width ?? rail.clientWidth) + gap;
    };
    const go = (dir: 1 | -1) => {
      const behavior = rm ? 'auto' : 'smooth';
      // Pinned: the transform is exactly `wrapTop - scrollY` (dist cancels
      // out of the p = -rectTop/dist, transform = -p*dist algebra), so one
      // page-scroll pixel always moves the rail by one pixel — stepping a
      // card is just scrolling the window by a card's width.
      if (wrap.classList.contains('on')) scrollBy({ top: dir * step(), behavior });
      else rail.scrollBy({ left: dir * step(), behavior });
    };
    prev.addEventListener('click', () => go(-1));
    next.addEventListener('click', () => go(1));
  });

  // Buttons above already cover the rm/no-JS-state case; nothing below need run.
  if (rm) return;

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
      // Only pin when there's genuinely something to travel — a track whose
      // cards already fit (e.g. three cards on a wide desktop) would
      // otherwise hold a whole viewport hostage and move nothing; it stays
      // a static full-bleed navy band instead, which still does the tonal job.
      //
      // rail.clientWidth, not innerWidth: clientWidth already excludes the
      // page's vertical scrollbar (~15-17px on Windows/Chrome) the way
      // innerWidth does not, so innerWidth would understate the travel
      // distance by exactly that much and strand the last card short of
      // the visible edge.
      //
      // Measured from geometry, not rail.scrollWidth: once pinned the rail
      // is overflow:visible (blocks.css), and Chrome's scrollWidth on such
      // an element omits trailing padding — which would clip the last card
      // short. Rail and last card share the same translation so it cancels
      // out of the difference between them; scrollLeft is only ever
      // non-zero before this track has first been pinned and zeroed below.
      const last = rail.lastElementChild;
      const padRight = parseFloat(getComputedStyle(rail).paddingRight) || 0;
      const content = last
        ? last.getBoundingClientRect().right -
          rail.getBoundingClientRect().left +
          rail.scrollLeft +
          padRight
        : 0;
      const dist = Math.max(0, content - rail.clientWidth);
      // MIN_PIN_DIST, not dist === 0: the pin lasts exactly `dist` px of
      // scroll, so a small dist buys a pin so brief a normal scroll gesture
      // blows straight through it — the section just reads as vanishing
      // with the last card still cut off. Below this floor it stays the
      // static row (native scroll + prev/next buttons) instead of pinning
      // for a fraction of a second.
      const MIN_PIN_DIST = 200;
      if (dist < MIN_PIN_DIST) {
        wrap.classList.remove('on');
        wrap.style.height = '';
        rail.style.transform = '';
        return;
      }
      wrap.classList.add('on');
      // The rail is a native scroll container in the fallback state, so it
      // can pick up a real scrollLeft before this runs (page-load, focus, a
      // diagonal trackpad gesture). Once pinned, position is 100% owned by
      // the transform below, so any leftover offset must be zeroed here or
      // it stacks with the transform and the cards render offset.
      rail.scrollLeft = 0;
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

  // window 'resize' alone misses browser zoom in some engines, but the
  // rail's CSS layout (including a calc()-based side padding) recomputes
  // regardless — leaving `dist` and the wrap's inline height stale against
  // the rail's new width, so the transform moves it the wrong amount and
  // blank track shows past the last correctly-placed card. A ResizeObserver
  // on the rail catches any actual size change regardless of cause.
  const ro = new ResizeObserver(onResize);
  tracks.forEach((wrap) => {
    const rail = wrap.querySelector<HTMLElement>('.strack-rail');
    if (rail) ro.observe(rail);
  });

  teardownFns.push(() => {
    live = false;
    removeEventListener('scroll', onScroll);
    removeEventListener('resize', onResize);
    ro.disconnect();
    // Leave no inline height or transform behind for the next page.
    tracks.forEach((wrap) => {
      wrap.classList.remove('on');
      wrap.style.height = '';
      const rail = wrap.querySelector<HTMLElement>('.strack-rail');
      if (rail) rail.style.transform = '';
    });
  });
}

// ------------------------------------------------------------ pinned stages
/**
 * [data-pin-stages] (PinnedStages.astro): the section holds the viewport
 * while scroll position selects which of its stages is showing, one at a
 * time — the generic version of the homepage's pinned manufacturing-tier
 * walkthrough (home-scroll.ts), minus the 3D model it drives there.
 *
 * Bails to the plain stacked column under reduced motion, below 900px, or
 * with too little to walk through. Unlike initScrollTracks() there's no
 * prev/next fallback affordance needed — every stage is simply on the page.
 */
function initPinStages(rm: boolean): void {
  const wraps = document.querySelectorAll<HTMLElement>('[data-pin-stages]');
  if (!wraps.length) return;

  const MIN_STAGES = 2;
  // Scroll length granted to each stage. The pin lasts (STAGE_VH * n - 100)vh,
  // so this also sets how brisk the walkthrough feels; 70 gives a six-stage
  // section roughly half a viewport of scroll per stage.
  const STAGE_VH = 70;
  // Same reasoning as ScrollTrack's MIN_PIN_DIST: a pin shorter than this is
  // over before it registers as one, which reads worse than not pinning.
  const MIN_PIN_TRAVEL = 240;

  const items: {
    wrap: HTMLElement;
    stages: HTMLElement[];
    /** The progress dashes and the index rows are marked in lockstep with
     *  the active stage, so they're carried together as one list of "things
     *  that track the index" rather than queried separately per frame. */
    marks: HTMLElement[][];
  }[] = [];

  const marksOf = (wrap: HTMLElement) => [
    [...wrap.querySelectorAll<HTMLElement>('.pstage-bar i')],
    [...wrap.querySelectorAll<HTMLElement>('.pstage-index li')],
  ];

  const reset = (wrap: HTMLElement) => {
    const list = wrap.querySelector<HTMLElement>('.pstage-list');
    wrap.classList.remove('on');
    wrap.style.height = '';
    if (list) {
      list.style.minHeight = '';
      [...list.children].forEach((s) => s.classList.remove('on'));
    }
    marksOf(wrap).forEach((row) => row.forEach((m) => m.classList.remove('on')));
  };

  // Guards the ResizeObserver below against its own writes: measure() sets
  // the list's min-height, and the observer watches the list, so without
  // this the two would drive each other in a loop.
  let measuring = false;

  const measure = () => {
    measuring = true;
    items.length = 0;
    wraps.forEach((wrap) => {
      const list = wrap.querySelector<HTMLElement>('.pstage-list');
      if (!list) return;
      // Measure in the unpinned state — reset() puts every stage back into
      // normal flow first, so the heights read here are the real content
      // heights rather than whatever the previous pin left behind.
      reset(wrap);
      const stages = [...list.children] as HTMLElement[];
      const marks = marksOf(wrap);
      if (rm || innerWidth < 900 || stages.length < MIN_STAGES) return;
      if (innerHeight * (STAGE_VH / 100) * stages.length - innerHeight < MIN_PIN_TRAVEL) return;

      // Stages aren't hand-length-matched like the homepage's four tiers —
      // a Product spec table can be two rows or twelve. Every stage is
      // absolutely positioned once pinned, so the box needs an explicit
      // height: the tallest stage's, or a longer one clips against overflow:hidden.
      const tallest = Math.max(...stages.map((s) => s.getBoundingClientRect().height));
      list.style.minHeight = `${Math.ceil(tallest)}px`;
      wrap.classList.add('on');
      wrap.style.height = `${STAGE_VH * stages.length}vh`;
      stages.forEach((s, i) => s.classList.toggle('on', i === 0));
      marks.forEach((row) => row.forEach((m, i) => m.classList.toggle('on', i === 0)));
      items.push({ wrap, stages, marks });
    });
    requestAnimationFrame(() => { measuring = false; });
  };

  measure();

  // Under reduced motion measure() has already reset every section to the
  // stacked column; there is nothing to drive, so bind no listeners at all.
  if (rm) {
    teardownFns.push(() => wraps.forEach(reset));
    return;
  }

  let ticking = false;
  let live = true;
  const apply = () => {
    ticking = false;
    if (!live) return;
    for (const { wrap, stages, marks } of items) {
      const r = wrap.getBoundingClientRect();
      const travel = r.height - innerHeight;
      if (travel <= 0) continue;
      const p = Math.min(1, Math.max(0, -r.top / travel));
      // The 0.999 keeps p === 1 (the very last pixel of the pin) from
      // indexing one past the end — lifted from home-scroll.ts, same reason.
      const idx = Math.min(stages.length - 1, Math.floor(p * stages.length * 0.999));
      stages.forEach((s, i) => s.classList.toggle('on', i === idx));
      // Dashes fill cumulatively (how far through you are); the index marks
      // only the stage you are actually on.
      marks[0].forEach((m, i) => m.classList.toggle('on', i <= idx));
      marks[1].forEach((m, i) => m.classList.toggle('on', i === idx));
    }
  };
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(apply);
  };
  const onResize = () => { measure(); apply(); };

  apply();
  addEventListener('scroll', onScroll, { passive: true });
  addEventListener('resize', onResize);

  // Same reasoning as the scroll-track observer above: a web font swapping
  // in or an image reflowing changes a stage's height without firing
  // 'resize', which would leave the measured min-height too short and clip
  // the tallest stage.
  const ro = new ResizeObserver(() => {
    if (measuring) return;
    onResize();
  });
  wraps.forEach((wrap) => {
    const list = wrap.querySelector<HTMLElement>('.pstage-list');
    if (list) ro.observe(list);
  });

  teardownFns.push(() => {
    live = false;
    removeEventListener('scroll', onScroll);
    removeEventListener('resize', onResize);
    ro.disconnect();
    wraps.forEach(reset);
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
