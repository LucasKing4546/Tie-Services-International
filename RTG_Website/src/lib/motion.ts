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
 * Six behaviours, one shared observer/rAF budget:
 *   1. reveals (.rl / .fu / .stag) + PROOF-figure count-ups (.ct)
 *   2. parallax media (data-motion="parallax")
 *   3. sticky media / sticky spec rail — pure CSS (position: sticky), no
 *      JS involved; documented here because it is part of the same system.
 *   4. carousels ([data-carousel], Carousel.astro) — prev/next buttons
 *      driving the track's native scroll-snap.
 *   5. scroll tracks ([data-scroll-track], ScrollTrack.astro) — a pinned
 *      band whose cards move sideways as the page scrolls down.
 *   6. pinned stages ([data-pin-stages], PinnedStages.astro) — a pinned
 *      section whose stages cross-fade one at a time as the page scrolls.
 *
 * 5 and 6 are the homepage's own set-pieces generalised out of
 * home-scroll.ts so any template can compose them; the homepage keeps its
 * own 3D-coupled copies.
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
  initScrollTracks(rm);
  initPinStages(rm);

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
 * The pin/transform machinery bails under 900px and is skipped entirely
 * under prefers-reduced-motion (rm) — in both cases the rail stays the
 * native horizontally scrollable row it is without any JS. But that
 * fallback has no visible affordance beyond a hidden-scrollbar drag/swipe,
 * which reduced-motion and mouse-only desktop visitors have no obvious way
 * to discover — so unlike the pin machinery, the prev/next buttons are
 * wired unconditionally (mirroring initCarousels()'s .car-nav), and mirror
 * whichever mode the track is actually in:
 *   pinned  -> stepping a card means scrolling the page, not the rail — see
 *              the 1:1 scroll-to-transform mapping below
 *   fallback -> steps the rail's own native scroll, exactly like a Carousel
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

  // The pin/transform choreography itself still has no reason to run under
  // reduced motion or to touch a track with no JS-driven state — the
  // buttons above already cover both.
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
      // Only pin when there is genuinely something to travel. A track whose
      // cards already fit — three equipment cards on a wide desktop, say —
      // would otherwise hold a whole viewport hostage and move nothing,
      // which is worse than not pinning at all. It stays a static full-bleed
      // navy band in that case, which is still doing the tonal job.
      // rail.clientWidth, not innerWidth: clientWidth already excludes the
      // page's vertical scrollbar the way innerWidth does not (~15-17px on
      // Windows/Chrome), so using innerWidth here understates how far the
      // rail needs to travel by exactly that much — the tail end of the
      // last card never quite reaches the visible edge.
      //
      // Measured from geometry rather than rail.scrollWidth: once pinned the
      // rail is overflow:visible (blocks.css explains why the clip has to sit
      // on .strack-stick instead), and scrollWidth on an element with no
      // scrolling box omits the trailing padding in Chrome — which would stop
      // the last card one side-inset short of where it belongs. The rail and
      // its last card carry the same translation, so it cancels out of the
      // difference between them; scrollLeft can only be non-zero on the first
      // pass, before this track has ever been pinned and zeroed below.
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
      // scroll (that's the whole point of the sticky-container-height
      // trick), so a small dist — a 4-tile track missing the last tile by
      // only a sliver, say — buys a pin so brief a normal scroll gesture
      // blows straight through it. The release and the reveal happen close
      // enough together that the last card never registers as shown; it
      // just reads as the section vanishing with the last card still cut
      // off. Below this floor it isn't a real scroll-driven "moment" either
      // way, so it stays the static row (native scroll + the prev/next
      // buttons) rather than pinning for a fraction of a second.
      const MIN_PIN_DIST = 200;
      if (dist < MIN_PIN_DIST) {
        wrap.classList.remove('on');
        wrap.style.height = '';
        rail.style.transform = '';
        return;
      }
      wrap.classList.add('on');
      // .strack-rail is a native scroll container in the fallback state (for
      // no-JS and the sub-900px row) so it can pick up a real scrollLeft
      // before this ever runs — a page-load scroll tick, a focus, a
      // diagonal trackpad gesture. Once pinned, position is 100% owned by
      // the transform below (this is how the homepage's .hz-track avoids
      // the problem entirely: it is never a scroll container in the first
      // place), so any leftover native offset must be zeroed here or it
      // silently stacks with the transform and the cards render offset.
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

  // window 'resize' alone is not enough: it does not fire reliably for
  // browser zoom in every engine, but the rail's own layout — including its
  // responsive side padding (a calc() against 100vw) — recomputes live from
  // CSS regardless. Left to the resize listener only, a zoom change leaves
  // `dist` and the wrap's inline height stale against a rail that has
  // already relaid-out at the new effective width, so the transform moves
  // it by the wrong amount relative to where the cards actually now sit —
  // a card correctly positioned, then a stretch of blank track where the
  // rest should be. A ResizeObserver on the rail catches any actual size
  // change regardless of what caused it.
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
 * time. This is the homepage's pinned manufacturing-tier walkthrough
 * (home-scroll.ts, hard-wired to #tiers/.tier/.pin-bar) generalised — the
 * scroll-fraction-to-index maths below is the same, minus the 3D model it
 * drives in lockstep there. DOM only, so a template with no 3D still gets
 * the set-piece.
 *
 * Bails to the plain stacked column under reduced motion, below 900px, or
 * with too little to walk through. Unlike initScrollTracks() there is no
 * prev/next affordance to wire in the fallback state, because the fallback
 * is not a hidden-overflow rail — every stage is simply on the page.
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

      // Stages are not hand-length-matched copy the way the homepage's four
      // tiers are — a Product spec table can be two rows or twelve. Every
      // stage is absolutely positioned once pinned, so the box needs an
      // explicit height, and it has to be the tallest stage's or the
      // longest one is clipped by the pinned section's overflow:hidden.
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
