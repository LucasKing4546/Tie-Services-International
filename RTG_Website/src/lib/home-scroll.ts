/**
 * Homepage scroll choreography — the 3D behaviours only. Masked line reveals,
 * count-ups and the header scroll toggle are shared across every template
 * (src/lib/motion.ts + Header.astro) and are not duplicated here.
 *
 * Three behaviours, all driven from one rAF loop so they share a frame budget:
 *   1. pinned manufacturing-tier assembly, built up in 3D one tier at a time
 *   2. horizontal sector track
 *   3. the equipment showroom: one machine in open water, turned by drag
 *
 * 3D stages are created lazily by the caller so three.js is only fetched on
 * pages that need it.
 *
 * Lifecycle: initHome() runs once per navigation, not once per document —
 * under ClientRouter a module's top-level code runs once and never again, so
 * a return trip to / would otherwise land on a dead page. That makes
 * teardown mandatory: every listener, observer, timer, rAF loop and WebGL
 * context created here is registered for cleanup and released the next time
 * initHome() runs, on this page or any other, or navigations would leave
 * stacking rAF loops and WebGL contexts fighting over the browser's cap.
 */
import * as THREE from 'three';
import { buildWinch, buildAFrame, buildHPU, createViewer } from './rtg3d';
import { MACHINES } from '@data/home';
import type { ViewerOpts } from './rtg3d';

type Viewer = ReturnType<typeof createViewer>;

/** A viewer plus the per-stage state the homepage attaches to it. */
interface Stage extends Viewer {
  el: HTMLCanvasElement;
  onScreen: boolean;
  drag: number;
  spin: number;
  baseDist: number;
  baseH: number;
  lookY: number;
}

/** A winch whose four manufacturing tiers can be revealed independently. */
type TieredModel = THREE.Object3D & {
  userData: { tiers: (THREE.Object3D & { userData: { want?: number; have?: number } })[] };
};

/** One machine on the showcase carousel. */
interface Machine {
  wrap: THREE.Group;
  spin: THREE.Group;
  x: number;
  s: number;
  yOff: number;
}

/** Cleanup for the currently-booted homepage, or null when none is live. */
let teardown: (() => void) | null = null;

/** Release everything the last initHome() built. Safe to call at any time. */
export function destroyHome(): void {
  if (!teardown) return;
  const fn = teardown;
  teardown = null;
  fn();
}

// Release on the way out, not on the way in: initHome() tears the previous
// page down before building, but that only fires when the *next* page's
// idle callback runs, up to 1.5s after navigation. In that window the old
// page's five WebGL contexts are still live while the new page's five are
// being created — near the browser's context cap (~16 per renderer, shared
// with other tabs), the browser resolves that by silently killing the
// oldest contexts, which by then can be the new page's. Canvases stay in
// the document at full size and scroll heights stay set, so the page looks
// present but renders nothing (software rendering has no cap, so this never
// shows in a headless test). Swapping the DOM away is the honest,
// synchronous moment to hand the contexts back.
document.addEventListener('astro:before-swap', () => destroyHome());

export function initHome(): void {
  // Whatever the last navigation left running goes first — including when
  // this call turns out to be on some other page, which is how leaving the
  // homepage releases its WebGL contexts.
  destroyHome();

  // The idle callback that schedules this can outlive the page that queued
  // it, so confirm the homepage is actually in the document before building
  // anything. Every stage below is keyed to an id that only index.astro has.
  if (!document.getElementById('tierGL')) return;

  const cleanups: (() => void)[] = [];

  // This function only adds the homepage's 3D on top of the shared motion
  // system Base.astro already booted.
  const rm = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ─────────── 3D stages ─────────── */
  const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));
  const ease  = (t: number) => 1 - Math.pow(1 - t, 3);
  const lerp  = (a: number, b: number, t: number) => a + (b-a)*t;

  const SPECS = MACHINES;

  /* Render on demand. Nothing here moves unless the visitor scrolls, drags,
     resizes or picks a machine, so the loop only draws for a short window
     after one of those (long enough for the eased moves to settle) and is
     otherwise idle. Drawing every frame regardless kept five WebGL scenes
     busy at the display's refresh rate and made the whole page stutter. */
  let wake = 0;
  const poke = () => { wake = performance.now() + 1200; };

  const stages: Stage[] = [];
  function makeStage(
    canvasId: string, model: THREE.Object3D,
    dist: number, height: number, lookY: number, opts?: ViewerOpts,
  ): Stage | null {
    const cv = document.getElementById(canvasId) as HTMLCanvasElement | null;
    if (!cv) return null;
    const v = createViewer(cv, opts || {}) as Stage;
    v.setModel(model);
    v.frame(dist, height, lookY);
    v.baseDist = dist; v.baseH = height; v.lookY = lookY;
    v.el = cv; v.spin = 0; v.drag = 0; v.onScreen = false;
    const io = new IntersectionObserver(es => { es.forEach(e => v.onScreen = e.isIntersecting); poke(); },
      { rootMargin: '120px' });
    io.observe(cv);
    cleanups.push(() => { io.disconnect(); v.dispose(); });
    stages.push(v);
    return v;
  }

  /* the tier-4 group is the load-test rig — a fixture, not part of the machine,
     so it only appears in the manufacturing-tier walkthrough */
  function finishedWinch(){
    const m = buildWinch();
    m.userData.tiers[3].visible = false;
    return m;
  }

  let tierV: Stage | null = null, showV: Stage | null = null;
  let tierModel: TieredModel | null = null;
  {
    tierModel = buildWinch() as unknown as TieredModel;
    tierV  = makeStage('tierGL', tierModel, 15.0, 2.6, -0.5);
    showV  = makeStage('showGL', new THREE.Group(), 20.0, 3.4, -0.4, { shadow: 0.22 });
    if (tierV)  tierV.pivot.rotation.y  = -0.62;
    if (showV)  showV.pivot.rotation.y  = 0;
  }

  /* ── the three machines all live in the scene at once and cross-dissolve,
        so changing machine is a move rather than a cut ── */
  const mName = document.getElementById('mName'), mDesc = document.getElementById('mDesc'),
        mSpec = document.getElementById('mSpec'), mPick = document.getElementById('mPick'),
        mHead = document.getElementById('mHead');
  const machines: Machine[] = [];
  /* the machine only changes when a pill is clicked; it starts at a
     three-quarter view and turns when dragged — nothing here is driven by
     scroll position */
  let showSpin = -0.7;
  let curModel = 0;
  let textTimer: ReturnType<typeof setTimeout> | undefined;

  const GAP = 19;                       // world-space spacing on the carousel
  if (showV) {
    const fleet: [THREE.Object3D, number, number][] = [
      [finishedWinch(), 1.00, 0.00],
      [buildAFrame(),   1.00, 0.00],
      [buildHPU(),      1.06, 0.10],
    ];
    fleet.forEach(([mdl, s0, yOff], i) => {
      const wrap = new THREE.Group(), spin = new THREE.Group();
      spin.add(mdl); wrap.add(spin);
      wrap.position.x = i * GAP;
      showV.pivot.add(wrap);
      machines.push({ wrap, spin, x: i * GAP, s: s0, yOff });
    });
  }
  const specHTML = (s: { spec: string[][] }) => s.spec.map(([b, l]: string[]) => `<div><b>${b}</b><span>${l}</span></div>`).join('');
  if (mSpec) mSpec.innerHTML = specHTML(SPECS[0]);

  function setModel(i: number){
    if (i === curModel || !machines.length) return;
    curModel = i;
    poke();
    const s = SPECS[i];
    if (mHead) mHead.style.opacity = '0';
    if (mSpec) mSpec.style.opacity = '0';
    clearTimeout(textTimer);
    textTimer = setTimeout(() => {
      if (mName) mName.innerHTML = s.name;
      if (mDesc) mDesc.textContent = s.desc;
      if (mSpec) { mSpec.innerHTML = specHTML(s); mSpec.style.opacity = '1'; }
      if (mHead) mHead.style.opacity = '1';
    }, 210);
    if (mPick) [...mPick.children].forEach((btn, k) => {
      btn.classList.toggle('on', k === i);
      btn.setAttribute('aria-pressed', String(k === i));
    });
  }
  if (mPick) mPick.addEventListener('click', e => {
    const b = (e.target as HTMLElement).closest('button') as HTMLElement | null;
    if (b) setModel(+(b.dataset.m ?? 0));
  });

  /* showroom: drag anywhere on the stage (not on its buttons) to turn the
     machine. pan-y is left to the browser so the page still scrolls. */
  const zf = document.getElementById('zFrame');
  if (zf && showV) {
    showV.frame(13.6, 3.2, -0.4);
    let lastX: number | null = null;
    zf.addEventListener('pointerdown', e => {
      if ((e.target as HTMLElement).closest('button,a')) return;
      lastX = e.clientX; zf.setPointerCapture(e.pointerId); zf.classList.add('drag');
    });
    zf.addEventListener('pointermove', e => {
      if (lastX == null) return;
      showSpin += (e.clientX - lastX) * 0.008; lastX = e.clientX;
      poke();
    });
    const up = () => { lastX = null; zf.classList.remove('drag'); };
    zf.addEventListener('pointerup', up); zf.addEventListener('pointercancel', up);
  }

  /* pinned tiers */
  const pinWrap = document.getElementById('tiers');
  const tiers   = [...document.querySelectorAll('.tier')];
  const bars    = [...document.querySelectorAll('.pin-bar i')];
  // Under 900px the CSS lists the four tiers one under another, unpinned.
  function sizePin(){ if (pinWrap) pinWrap.style.height = innerWidth < 900 ? '' : (tiers.length * 90) + 'vh'; }
  sizePin();

  /* horizontal sectors */
  const hzWrap = document.getElementById('sectors');
  const track  = document.getElementById('hzTrack');
  const fill   = document.getElementById('hzFill');
  let hzDist = 0;
  function sizeHz(){
    if (!hzWrap || !track) return;
    if (innerWidth < 900) { hzWrap.style.height = ''; track.style.transform = ''; return; }
    hzDist = Math.max(0, track.scrollWidth - innerWidth);
    hzWrap.style.height = (innerHeight + hzDist) + 'px';
  }

  function frame(){
    /* tiers — the 3D winch builds up one manufacturing stage at a time */
    if (pinWrap) {
      const r = pinWrap.getBoundingClientRect();
      const total = r.height - innerHeight;
      const p = total > 0 ? Math.min(1, Math.max(0, -r.top / total)) : 1;
      const idx = Math.min(tiers.length - 1, Math.floor(p * tiers.length * 0.999));
      tiers.forEach((t, i) => t.classList.toggle('on', i === idx));
      bars.forEach((b, i) => b.classList.toggle('on', i <= idx));
      if (tierV && tierModel) {
        tierModel.userData.tiers.forEach((g, i) => { g.userData.want = i <= idx ? 1 : 0; });
        tierV.pivot.rotation.y = -0.62 + p * 1.15;
        tierV.frame(tierV.baseDist - p * 1.4, tierV.baseH, tierV.lookY);
      }
    }

    /* horizontal */
    if (hzWrap && track && innerWidth >= 900 && hzDist > 0) {
      const r = hzWrap.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, -r.top / (r.height - innerHeight)));
      track.style.transform = `translate3d(${-p * hzDist}px,0,0)`;
      if (fill) fill.style.width = (p * 100) + '%';
    }
    ticking = false;
  }

  let ticking = false;
  function onScroll(){ poke(); if (!ticking) { ticking = true; requestAnimationFrame(frame); } }
  function onResize(){ sizePin(); sizeHz(); stages.forEach(v => v.resize()); onScroll(); }
  addEventListener('scroll', onScroll, {passive:true});
  addEventListener('resize', onResize);
  cleanups.push(() => {
    removeEventListener('scroll', onScroll);
    removeEventListener('resize', onResize);
  });

  /* continuous render loop — only draws stages that are on screen */
  if (tierModel) tierModel.userData.tiers.forEach((g, i) => {
    g.userData.want = i === 0 ? 1 : 0; g.userData.have = i === 0 ? 1 : 0;
  });

  const smooth = (t: number) => t * t * (3 - 2 * t);

  let lastT = performance.now();
  let raf = 0;
  function loop(){
    raf = requestAnimationFrame(loop);
    const nowT = performance.now();
    /* No frame-rate cap while live: this loop also positions the hoisted
       panel, and drawing at half the display rate made the browser drop
       three times as many frames during scroll (measured at 120 Hz). */
    const dt = Math.min(0.05, (nowT - lastT) / 1000); lastT = nowT;
    if (nowT > wake) return;
    const aMove = 1 - Math.exp(-dt * 6.0);
    const aTier = 1 - Math.exp(-dt * 7.0);

    /* manufacturing tiers build up */
    if (tierModel) tierModel.userData.tiers.forEach(g => {
      const want = g.userData.want == null ? 1 : g.userData.want;
      g.userData.have = lerp(g.userData.have == null ? want : g.userData.have, want, aTier);
      const h = g.userData.have;
      g.visible = h > 0.02;
      g.scale.setScalar(lerp(0.86, 1, h));
      g.position.y = lerp(-0.55, 0, h);
    });

    /* machines ride a carousel — each keeps its own space, so nothing ever
       renders through anything else, and the settled one is fully solid */
    machines.forEach((m, i) => {
      m.x = lerp(m.x, (i - curModel) * GAP, aMove);
      const d = Math.min(1, Math.abs(m.x) / GAP);
      m.wrap.position.x = m.x;                       // always update, even when hidden
      m.wrap.position.y = m.yOff - 1.1 * d;
      m.wrap.scale.setScalar(m.s * (1 - 0.16 * d));
      m.spin.rotation.y = showSpin;
      m.wrap.visible = d < 1.3;                      // they simply leave the frame
    });

    if (tierV  && tierV.onScreen)  tierV.render();
    if (showV  && showV.onScreen)  showV.render();
  }

  sizeHz();
  stages.forEach(v => v.resize());
  frame();
  poke();
  if (stages.length) loop();

  teardown = () => {
    if (raf) cancelAnimationFrame(raf);
    clearTimeout(textTimer);
    cleanups.forEach((fn) => fn());
  };
}
