/**
 * Homepage scroll choreography — the 3D behaviours only. Masked line reveals,
 * count-ups and the header scroll toggle are shared across every template
 * (src/lib/motion.ts + Header.astro) and are not duplicated here.
 *
 * Three behaviours, all driven from one rAF loop so they share a frame budget:
 *   1. pinned manufacturing-tier assembly, built up in 3D one tier at a time
 *   2. horizontal sector track
 *   3. the crane hoisting the machine frame in, then the zoom into it
 *
 * The 3D stages are created lazily by the caller so three.js is only fetched
 * on pages that actually need it.
 *
 * Lifecycle: initHome() runs once per navigation, not once per document. The
 * homepage boots it from 'astro:page-load' (index.astro) for the same reason
 * motion.ts does — under ClientRouter a module's top-level code runs once and
 * never again, so a return trip to / would otherwise land on a dead page. That
 * makes teardown mandatory rather than optional: every listener, observer,
 * timer, rAF loop and WebGL context created here is registered for cleanup and
 * released the next time initHome() runs, on this page or any other. Without
 * it, three navigations would leave three rAF loops and fifteen live WebGL
 * contexts fighting over the browser's cap.
 */
import * as THREE from 'three';
import { buildWinch, buildAFrame, buildHPU, buildCrane, createViewer } from './rtg3d';
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

/** A crane with a live hoist. */
type CraneRig = THREE.Object3D & {
  userData: { rig: { hook: THREE.Object3D; setDrop(d: number): void } };
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

// Release on the way out, not on the way in. initHome() tears the previous
// page down before it builds, which is enough on paper — but that only
// happens when the *next* page's idle callback runs, up to 1.5s after the
// navigation. In that window the old page's five WebGL contexts are still
// live while the new page's five are being created, and a browser that is
// near its context cap (~16 per renderer, shared with the user's other tabs)
// resolves that by silently killing the oldest live contexts — which by then
// can be the ones the new page just made. The canvases stay in the document
// at full size and the scroll heights are still set, so the page looks
// present but renders nothing. Software rendering has no such cap, which is
// why this never shows up in a headless test. Swapping the DOM away is the
// honest moment to hand the contexts back, and it is synchronous.
document.addEventListener('astro:before-swap', () => destroyHome());

export function initHome(): void {
  // Whatever the last navigation left running goes first — including when
  // this call turns out to be on some other page, which is how leaving the
  // homepage releases its WebGL contexts.
  destroyHome();

  // The idle callback that schedules this can outlive the page that queued
  // it, so confirm the homepage is actually in the document before building
  // anything. Every stage below is keyed to an id that only index.astro has.
  if (!document.getElementById('heroGL')) return;

  const cleanups: (() => void)[] = [];

  // Reveals and count-ups are booted site-wide by initMotion() (src/lib/
  // motion.ts) via Base.astro, before this module is even fetched — this
  // function only adds the homepage's 3D on top of that. The header scroll
  // toggle lives in Header.astro's own script, which every page already gets.
  const rm = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ─────────── 3D stages ─────────── */
  const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));
  const ease  = (t: number) => 1 - Math.pow(1 - t, 3);
  const lerp  = (a: number, b: number, t: number) => a + (b-a)*t;

  const SPECS = [
    { name:'Traction &amp; storage winch',
      desc:'Grooved drum, level wind, hydraulic drive and fail-safe band brake — built as one machine on a single skid.',
      spec:[['Tier 1–4','Scope available'],['150 Te','Load tested'],['3,000 m','Proven depth']] },
    { name:'A-frame launch &amp; recovery',
      desc:'Twin-leg fabricated A-frame with luffing cylinders, head sheave and hook block. Class surveyed as a system.',
      spec:[['Twin ram','Luffing'],['Class','Surveyed'],['Bespoke','Geometry']] },
    { name:'Hydraulic power unit',
      desc:'Tank, motor–pump group, valve manifold and air-blast cooling on one skid. Pipework flushed to class.',
      spec:[['15–110 kW','Power range'],['ATEX','On request'],['Flushed','To class']] }
  ];

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
    const io = new IntersectionObserver(es => es.forEach(e => v.onScreen = e.isIntersecting),
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

  /* crane framing — tuned so the boom tip sits high-left and the fall runs
     down the middle of the viewport */
  const CRANE_DIST = 34, CRANE_Y = 1.5, CRANE_LOOK = 0;
  const DROP_OUT = 20.6, DROP_IN = 4.3;          // fall paid out vs hauled home
  let heroV: Stage | null = null, tierV: Stage | null = null, showV: Stage | null = null,
      proofV: Stage | null = null, craneV: Stage | null = null;
  let craneRig: CraneRig | null = null, tierModel: TieredModel | null = null;
  {
    /* hero shows the deck crane — the tier walkthrough below is the winch,
       so the two lead visuals are deliberately different machines */
    heroV  = makeStage('heroGL', buildCrane(), 17.4, 3.0, 0.2);
    tierModel = buildWinch() as unknown as TieredModel;
    tierV  = makeStage('tierGL', tierModel, 15.0, 2.6, -0.5);
    showV  = makeStage('showGL', new THREE.Group(), 20.0, 3.4, -0.4, { shadow: 0.22 });
    proofV = makeStage('proofGL', finishedWinch(), 15.6, 2.6, -0.5, { shadow: 0.20 });
    craneRig = buildCrane({ rig: true }) as unknown as CraneRig;
    craneV = makeStage('craneGL', craneRig, CRANE_DIST, CRANE_Y, CRANE_LOOK, { shadow: 0 });
    craneRig.position.set(-1.5, 4.6, 0);          // sit the crane high in the frame
    if (heroV)  heroV.pivot.rotation.y  = -0.55;
    if (tierV)  tierV.pivot.rotation.y  = -0.62;
    if (showV)  showV.pivot.rotation.y  = 0;
    if (proofV) proofV.pivot.rotation.y = -0.6;
    if (craneV) craneV.pivot.rotation.y = -0.30;
  }

  /* pointer-drag to orbit the hero model */
  (function dragOrbit(){
    const stage = heroV;
    if (!stage) return;
    let down = false, lastX = 0;
    const el = stage.el;
    el.style.cursor = 'grab';
    el.addEventListener('pointerdown', e => { down = true; lastX = e.clientX;
      el.style.cursor = 'grabbing'; el.setPointerCapture(e.pointerId); });
    el.addEventListener('pointermove', e => { if (!down) return;
      stage.drag += (e.clientX - lastX) * 0.008; lastX = e.clientX;
      // frame() (hoisted below) only otherwise runs on scroll — without this
      // call, dragging while the page hasn't scrolled updates stage.drag but
      // is never painted, so the model looks inert until the user scrolls.
      frame(); });
    const up = () => { down = false; el.style.cursor = 'grab'; };
    el.addEventListener('pointerup', up); el.addEventListener('pointercancel', up);
  })();

  /* ── the three machines all live in the scene at once and cross-dissolve,
        so changing machine is a move rather than a cut ── */
  const mName = document.getElementById('mName'), mDesc = document.getElementById('mDesc'),
        mSpec = document.getElementById('mSpec'), mPick = document.getElementById('mPick'),
        mHead = document.getElementById('mHead');
  const machines: Machine[] = [];
  let curModel = 0, userPicked = false, showSpin = -0.7, liftK = 0, zoomK = 0;
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
    if (mPick) [...mPick.children].forEach((btn, k) => btn.classList.toggle('on', k === i));
  }
  if (mPick) mPick.addEventListener('click', e => {
    const b = (e.target as HTMLElement).closest('button') as HTMLElement | null;
    if (b) { userPicked = true; setModel(+(b.dataset.m ?? 0)); }
  });

  /* zoom-into-frame */
  const zw = document.getElementById('showcase'),
        zf = document.getElementById('zFrame'),
        zHint = document.getElementById('zHint');
  if (zw) zw.style.height = '440vh';

  /* pinned tiers */
  const pinWrap = document.getElementById('tiers');
  const tiers   = [...document.querySelectorAll('.tier')];
  const bars    = [...document.querySelectorAll('.pin-bar i')];
  if (pinWrap) pinWrap.style.height = (tiers.length * 90) + 'vh';

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
    /* hero: scroll turns the winch and lifts the camera slightly */
    if (heroV) {
      heroV.pivot.rotation.y = -0.7 + scrollY * 0.0016 + heroV.drag;
      heroV.frame(heroV.baseDist, heroV.baseH + Math.min(scrollY * 0.0016, 1.1), heroV.lookY);
    }

    /* zoom-into-frame showcase */
    if (zw && zf) {
      const r = zw.getBoundingClientRect();
      const p = clamp(-r.top / (r.height - innerHeight), 0, 1);
      const wide = innerWidth >= 821;
      if (wide) {
        /* the crane hauls the payload up into shot; the panel is hung off the
           projected position of the hook block, so the two can never drift */
        liftK = ease(clamp(p / 0.38, 0, 1));            // crane hauls the load in
        zoomK = ease(clamp((p - 0.34) / 0.26, 0, 1));   // then you push into it
        if (craneRig && craneRig.userData.rig)
          craneRig.userData.rig.setDrop(lerp(DROP_OUT, DROP_IN, liftK));
        if (showV) {
          showV.frame(lerp(15.6, 13.2, zoomK), lerp(3.9, 3.2, zoomK), -0.4);
          showSpin = -0.7 + p * 1.1;
        }
        if (craneV) craneV.el.style.opacity = (1 - clamp((zoomK - 0.45) / 0.5, 0, 1)).toFixed(3);
        if (zHint) zHint.style.opacity = p > 0.28 ? '0' : '1';
        if (!userPicked) setModel(p < 0.68 ? 0 : p < 0.84 ? 1 : 2);
      } else {
        zf.style.transform = '';
        if (showV) showV.frame(15.5, 3.4, -0.4);
      }
    }

    /* tiers — the 3D winch builds up one manufacturing stage at a time */
    if (pinWrap) {
      const r = pinWrap.getBoundingClientRect();
      const total = r.height - innerHeight;
      const p = Math.min(1, Math.max(0, -r.top / total));
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
  function onScroll(){ if (!ticking) { ticking = true; requestAnimationFrame(frame); } }
  function onResize(){ sizeHz(); stages.forEach(v => v.resize()); onScroll(); }
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
    const dt = Math.min(0.05, (nowT - lastT) / 1000); lastT = nowT;
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

    /* hang the payload from the hook block */
    if (craneV && zf && innerWidth >= 821 && craneRig && craneRig.userData.rig) {
      const W = craneV.el.clientWidth, H = craneV.el.clientHeight;
      const hp = craneV.project(craneRig.userData.rig.hook);
      const sc = lerp(0.42, 1, zoomK);
      const ax = hp.x * W - W / 2, ay = hp.y * H + 24;   // slung under the hook
      const tx = lerp(ax, 0, zoomK), ty = lerp(ay, 0, zoomK);
      const sway = (1 - liftK) * 1.4 * (1 - zoomK);      // settles as it lands
      zf.style.borderRadius = (48 * (1 - zoomK)).toFixed(1) + 'px';
      zf.style.transform =
        `translate3d(${tx.toFixed(1)}px, ${ty.toFixed(1)}px, 0) scale(${sc.toFixed(4)}) ` +
        `rotate(${sway.toFixed(2)}deg)`;
      zf.style.opacity = liftK > 0.02 ? '1' : '0';
    }

    /* the case-study machine turns on its own — never under reduced motion */
    if (!rm && proofV && proofV.onScreen) proofV.pivot.rotation.y += 0.0022;

    if (heroV  && heroV.onScreen)  heroV.render();
    if (tierV  && tierV.onScreen)  tierV.render();
    if (showV  && showV.onScreen)  showV.render();
    if (proofV && proofV.onScreen) proofV.render();
    if (craneV && craneV.onScreen) craneV.render();
  }

  sizeHz();
  stages.forEach(v => v.resize());
  frame();
  if (stages.length) loop();

  teardown = () => {
    if (raf) cancelAnimationFrame(raf);
    clearTimeout(textTimer);
    cleanups.forEach((fn) => fn());
  };
}
