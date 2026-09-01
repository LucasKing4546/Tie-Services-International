/* ==========================================================================
 RTG3D — procedural 3D models of RTG deck equipment, built on three.js
 Models are derived from the product categories on romicatiegroup.com:
   · Traction / storage winch  (WINCHES → Mooring, Traction)
   · A-frame LARS              (A-FRAMES, CRANES AND LIFTING)
   · Hydraulic power unit      (HYDRAULIC POWER UNITS, 15–110 KW)
 Palette matches the RTG brand: navy #031d5b, crimson #AB3241, steel greys.
 ========================================================================== */
import * as THREE from 'three';

const C = {
  navy:    0x24478C,
  navyDk:  0x18315F,
  red:     0xB03A49,
  steel:   0xCFD7E2,
  steelDk: 0x93A0B2,
  dark:    0x46536A,
  wire:    0xA6B0BE,
  pale:    0xEDF1F6
};

const M = {
  paint:   new THREE.MeshStandardMaterial({ color: C.navy,    metalness: 0.22, roughness: 0.38 }),
  paintDk: new THREE.MeshStandardMaterial({ color: C.navyDk,  metalness: 0.22, roughness: 0.42 }),
  steel:   new THREE.MeshStandardMaterial({ color: C.steel,   metalness: 0.78, roughness: 0.22 }),
  steelDk: new THREE.MeshStandardMaterial({ color: C.steelDk, metalness: 0.72, roughness: 0.30 }),
  red:     new THREE.MeshStandardMaterial({ color: C.red,     metalness: 0.20, roughness: 0.36 }),
  dark:    new THREE.MeshStandardMaterial({ color: C.dark,    metalness: 0.55, roughness: 0.38 }),
  wire:    new THREE.MeshStandardMaterial({ color: C.wire,    metalness: 0.85, roughness: 0.26 }),
  pale:    new THREE.MeshStandardMaterial({ color: C.pale,    metalness: 0.15, roughness: 0.50 })
};

/* ---------- primitive helpers ---------- */
type Mat = THREE.Material;
type Mesh = THREE.Mesh;

function mark<T extends THREE.Object3D>(m: T): T {
  m.castShadow = true; m.receiveShadow = true; return m;
}

function box(w: number, h: number, d: number, mtl: Mat,
  x?: number, y?: number, z?: number, rz?: number): Mesh {
  const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mtl);
  m.position.set(x || 0, y || 0, z || 0);
  if (rz) m.rotation.z = rz;
  return mark(m);
}
function cylX(r: number, len: number, mtl: Mat,
  x?: number, y?: number, z?: number, seg?: number): Mesh {
  const m = new THREE.Mesh(new THREE.CylinderGeometry(r, r, len, seg || 36), mtl);
  m.rotation.z = Math.PI / 2;
  m.position.set(x || 0, y || 0, z || 0);
  return mark(m);
}
function cylY(r: number, len: number, mtl: Mat,
  x?: number, y?: number, z?: number, seg?: number): Mesh {
  const m = new THREE.Mesh(new THREE.CylinderGeometry(r, r, len, seg || 36), mtl);
  m.position.set(x || 0, y || 0, z || 0);
  return mark(m);
}
function cylZ(r: number, len: number, mtl: Mat,
  x?: number, y?: number, z?: number, seg?: number): Mesh {
  const m = new THREE.Mesh(new THREE.CylinderGeometry(r, r, len, seg || 36), mtl);
  m.rotation.x = Math.PI / 2;
  m.position.set(x || 0, y || 0, z || 0);
  return mark(m);
}
function torusX(r: number, tube: number, mtl: Mat, x?: number): Mesh {
  const m = new THREE.Mesh(new THREE.TorusGeometry(r, tube, 12, 48), mtl);
  m.rotation.y = Math.PI / 2;
  m.position.x = x || 0;
  return mark(m);
}

/* a member running between two points in the XY plane */
function rod(x1: number, y1: number, x2: number, y2: number, r: number,
  mtl: Mat, z?: number, seg?: number): Mesh {
  const dx = x2 - x1, dy = y2 - y1, len = Math.hypot(dx, dy);
  const m = new THREE.Mesh(new THREE.CylinderGeometry(r, r, len, seg || 24), mtl);
  m.rotation.z = Math.atan2(dy, dx) - Math.PI / 2;
  m.position.set((x1 + x2) / 2, (y1 + y2) / 2, z || 0);
  return mark(m);
}

/* helical wire rope spooled on a drum, axis along X */
function helix(radius: number, len: number, turns: number, tubeR: number, mtl: Mat): Mesh {
  class Helix extends THREE.Curve<THREE.Vector3> {
    // @types/three marks Curve's constructor protected; re-expose it here
    public constructor() { super(); }
    override getPoint(t: number, tp: THREE.Vector3 = new THREE.Vector3()): THREE.Vector3 {
      const a = t * Math.PI * 2 * turns;
      return tp.set(-len / 2 + t * len, Math.sin(a) * radius, Math.cos(a) * radius);
    }
  }
  const g = new THREE.TubeGeometry(new Helix(), Math.ceil(turns * 13), tubeR, 7, false);
  return mark(new THREE.Mesh(g, mtl));
}

/* fabricated side-frame pedestal, extruded plate, axis-normal along X */
function framePlate(xCentre: number, thick?: number): Mesh {
  thick = thick || 0.18;
  const s = new THREE.Shape();
  s.moveTo(-1.42, -2.25); s.lineTo(1.42, -2.25); s.lineTo(1.42, -1.92);
  s.lineTo(0.60, -0.30);  s.lineTo(0.60, 0.46);  s.lineTo(-0.60, 0.46);
  s.lineTo(-0.60, -0.30); s.lineTo(-1.42, -1.92); s.closePath();
  const hole = new THREE.Path(); hole.absarc(0, 0, 0.34, 0, Math.PI * 2, false);
  s.holes.push(hole);
  const g = new THREE.ExtrudeGeometry(s, {
    depth: thick, bevelEnabled: true, bevelSize: 0.012, bevelThickness: 0.012, bevelSegments: 1
  });
  g.rotateY(Math.PI / 2);
  g.translate(xCentre - thick / 2, 0, 0);
  return mark(new THREE.Mesh(g, M.paint));
}

/* ======================================================================
   MODEL 1 — Traction / storage winch
   Returned with four tier groups so the assembly can be revealed in stages.
   ====================================================================== */
function buildWinch() {
  const root = new THREE.Group();
  const t1 = new THREE.Group(); // structural fabrication
  const t2 = new THREE.Group(); // mechanical assembly
  const t3 = new THREE.Group(); // hydraulic & electrical
  const t4 = new THREE.Group(); // automation, test & commissioning
  root.add(t1, t2, t3, t4);

  /* ---- T1 · structural steel ---- */
  t1.add(box(5.0, 0.32, 2.9, M.paintDk, 0, -2.42, 0));          // skid deck
  t1.add(box(5.2, 0.16, 0.34, M.red, 0, -2.62, 1.24));          // painted edge
  t1.add(box(5.2, 0.16, 0.34, M.red, 0, -2.62, -1.24));
  [-2.1, -0.7, 0.7, 2.1].forEach(x => t1.add(box(0.24, 0.30, 2.6, M.steelDk, x, -2.66, 0)));
  t1.add(framePlate(1.52));
  t1.add(framePlate(-1.34));
  t1.add(box(0.26, 0.26, 2.5, M.paint, 0, -1.30, 0));           // cross brace
  t1.add(box(3.4, 0.22, 0.22, M.paint, 0, -1.95, 1.05));
  t1.add(box(3.4, 0.22, 0.22, M.paint, 0, -1.95, -1.05));
  [-2.3, 2.3].forEach(x => {                                     // lifting eyes
    const e = new THREE.Mesh(new THREE.TorusGeometry(0.16, 0.05, 8, 20), M.red);
    e.position.set(x, -2.12, 0); mark(e); t1.add(e);
    t1.add(box(0.2, 0.3, 0.16, M.paint, x, -2.32, 0));
  });

  /* ---- T2 · mechanical ---- */
  t2.add(cylX(0.30, 4.3, M.steelDk, 0.1, 0, 0));                 // main shaft
  t2.add(cylX(1.02, 2.72, M.steel, 0.1, 0, 0, 48));              // drum barrel
  t2.add(cylX(1.62, 0.15, M.paint, 1.44, 0, 0, 48));             // flanges
  t2.add(cylX(1.62, 0.15, M.paint, -1.24, 0, 0, 48));
  t2.add(torusX(1.60, 0.05, M.red, 1.52));
  t2.add(torusX(1.60, 0.05, M.red, -1.32));
  const w1 = helix(1.12, 2.45, 16, 0.072, M.wire); w1.position.x = 0.1; t2.add(w1);
  const w2 = helix(1.26, 2.10, 13, 0.072, M.wire); w2.position.x = 0.1; t2.add(w2);
  t2.add(cylX(0.44, 0.30, M.steelDk, 1.72, 0, 0));               // bearing housings
  t2.add(cylX(0.44, 0.30, M.steelDk, -1.52, 0, 0));
  t2.add(box(0.86, 1.02, 1.02, M.paint, 2.28, 0, 0));            // gearbox
  t2.add(box(0.94, 0.16, 1.10, M.steelDk, 2.28, -0.55, 0));
  t2.add(cylX(0.82, 0.09, M.steelDk, -1.95, 0, 0, 40));          // brake disc
  t2.add(box(0.26, 0.44, 0.30, M.red, -1.95, 0.62, 0));          // brake caliper
  t2.add(cylX(0.10, 3.5, M.steelDk, 0.1, -0.72, 1.72));          // level-wind bar
  t2.add(cylX(0.07, 3.5, M.steel, 0.1, -1.02, 1.72));            // lead screw
  t2.add(box(0.48, 0.52, 0.48, M.paint, -0.35, -0.86, 1.72));    // level-wind carriage
  t2.add(torusX(0.20, 0.045, M.red, -0.35));
  t2.children[t2.children.length - 1].position.set(-0.35, -0.86, 1.72);

  /* ---- T3 · hydraulic & electrical ---- */
  t3.add(cylX(0.38, 0.78, M.steelDk, 2.98, 0, 0));               // hydraulic motor
  t3.add(cylX(0.20, 0.30, M.red, 3.44, 0, 0));
  t3.add(box(1.9, 0.22, 1.5, M.paintDk, -3.55, -2.34, 0));       // HPU skid
  t3.add(box(1.6, 0.92, 1.2, M.paint, -3.55, -1.76, 0));         // oil tank
  t3.add(box(1.66, 0.10, 1.26, M.steelDk, -3.55, -1.26, 0));
  t3.add(cylX(0.30, 0.86, M.steel, -3.55, -0.96, 0));            // electric motor
  t3.add(cylX(0.17, 0.34, M.steelDk, -2.98, -0.96, 0));          // pump
  t3.add(box(0.10, 0.62, 1.0, M.red, -4.42, -1.10, 0));          // cooler
  [-0.34, -0.12, 0.10, 0.32].forEach(z =>
    t3.add(box(0.06, 0.56, 0.05, M.steelDk, -4.48, -1.10, z)));
  // pipe run from HPU to motor
  t3.add(cylY(0.065, 1.05, M.steel, -2.72, -1.35, 0.24));
  t3.add(cylX(0.065, 5.4, M.steel, 0.0, -0.83, 0.24));
  t3.add(cylY(0.065, 1.05, M.steel, -2.72, -1.35, -0.24));
  t3.add(cylX(0.065, 5.4, M.steel, 0.0, -0.83, -0.24));
  t3.add(box(0.78, 1.14, 0.36, M.paint, 3.22, -1.30, 0.9));      // control cabinet
  t3.add(box(0.62, 0.44, 0.03, M.dark, 3.22, -1.02, 0.72));
  t3.add(box(0.12, 0.12, 0.03, M.red, 3.22, -1.52, 0.72));
  t3.add(box(0.16, 1.05, 0.16, M.steelDk, 3.22, -2.05, 0.9));

  /* ---- T4 · automation, test & commissioning ---- */
  t4.add(box(0.22, 0.22, 0.22, M.red, 1.72, 0.52, 0));           // sensors
  t4.add(box(0.22, 0.22, 0.22, M.red, -1.52, 0.52, 0));
  t4.add(box(0.18, 0.18, 0.18, M.red, 2.28, 0.62, 0));
  t4.add(cylX(0.035, 3.3, M.dark, 0.4, 0.60, 0));                // instrument conduit
  t4.add(box(0.44, 0.30, 0.03, M.pale, 0, -2.28, 1.47));         // class plate
  // load-test line running off the drum
  const rope = cylY(0.06, 3.2, M.wire, 0.1, 1.55, 1.22);
  t4.add(rope);
  t4.add(box(0.34, 0.34, 0.20, M.red, 0.1, 3.20, 1.22));         // load cell
  const shackle = new THREE.Mesh(new THREE.TorusGeometry(0.22, 0.06, 10, 24), M.steelDk);
  shackle.position.set(0.1, 3.52, 1.22); mark(shackle); t4.add(shackle);

  root.userData.tiers = [t1, t2, t3, t4];
  return root;
}

/* ======================================================================
   MODEL 2 — A-frame launch & recovery system
   ====================================================================== */
function buildAFrame() {
  const root = new THREE.Group();
  const lean = Math.atan(0.85 / 4.0);

  // skid base
  root.add(box(4.2, 0.30, 3.0, M.paintDk, 0, -2.40, 0));
  root.add(box(4.4, 0.16, 0.32, M.red, 0, -2.60, 1.30));
  root.add(box(4.4, 0.16, 0.32, M.red, 0, -2.60, -1.30));
  [-1.5, 0, 1.5].forEach(x => root.add(box(0.24, 0.28, 2.7, M.steelDk, x, -2.62, 0)));

  // four legs, two A-frames at z = ±0.85
  [-0.85, 0.85].forEach(z => {
    [1, -1].forEach(s => {
      const leg = box(0.30, 4.30, 0.30, M.paint, s * 0.98, -0.10, z, s * lean);
      root.add(leg);
      // hinge pin at the foot
      root.add(cylZ(0.20, 0.5, M.steelDk, s * 1.42, -2.18, z));
    });
  });

  // top beam and head
  root.add(box(1.5, 0.34, 2.35, M.paint, 0, 2.02, 0));
  root.add(box(1.1, 0.20, 2.55, M.steelDk, 0, 1.80, 0));
  // cross bracing
  root.add(box(2.7, 0.20, 0.20, M.paint, 0, 0.55, 0.85));
  root.add(box(2.7, 0.20, 0.20, M.paint, 0, 0.55, -0.85));
  root.add(box(0.20, 0.20, 1.9, M.paint, 1.30, -1.20, 0));
  root.add(box(0.20, 0.20, 1.9, M.paint, -1.30, -1.20, 0));

  // luffing cylinders
  [1, -1].forEach(s => {
    const body = new THREE.Mesh(new THREE.CylinderGeometry(0.20, 0.20, 1.7, 24), M.paint);
    body.position.set(s * 1.72, -1.30, 0); body.rotation.z = s * 0.36; mark(body); root.add(body);
    const rod = new THREE.Mesh(new THREE.CylinderGeometry(0.10, 0.10, 1.5, 20), M.steel);
    rod.position.set(s * 1.32, -0.20, 0); rod.rotation.z = s * 0.36; mark(rod); root.add(rod);
    root.add(cylZ(0.13, 0.42, M.red, s * 1.96, -2.10, 0));
  });

  // head sheave in its cheek plates, slung under the top beam
  root.add(cylZ(0.42, 0.22, M.steel, 0, 1.22, 0, 40));
  root.add(cylZ(0.47, 0.06, M.steelDk, 0, 1.22, 0.15, 40));
  root.add(cylZ(0.47, 0.06, M.steelDk, 0, 1.22, -0.15, 40));
  root.add(box(0.20, 0.55, 0.62, M.paint, 0, 1.55, 0));           // sheave hanger
  root.add(cylZ(0.09, 0.5, M.red, 0, 1.22, 0, 20));               // pin
  // fall wire + hook block
  root.add(cylY(0.055, 2.1, M.wire, 0, 0.15, 0));
  root.add(box(0.46, 0.55, 0.42, M.paintDk, 0, -1.05, 0));
  root.add(cylZ(0.26, 0.16, M.steel, 0, -0.92, 0, 28));
  const hook = new THREE.Mesh(new THREE.TorusGeometry(0.20, 0.06, 10, 22, Math.PI * 1.4), M.red);
  hook.position.set(0, -1.52, 0); mark(hook); root.add(hook);

  return root;
}

/* ======================================================================
   MODEL 3 — Hydraulic power unit
   ====================================================================== */
function buildHPU() {
  const root = new THREE.Group();

  root.add(box(4.4, 0.30, 2.6, M.paintDk, 0, -2.40, 0));         // skid
  root.add(box(4.6, 0.16, 0.32, M.red, 0, -2.60, 1.10));
  root.add(box(4.6, 0.16, 0.32, M.red, 0, -2.60, -1.10));
  [-1.7, 0, 1.7].forEach(x => root.add(box(0.24, 0.28, 2.3, M.steelDk, x, -2.62, 0)));

  root.add(box(3.5, 1.35, 2.0, M.paint, -0.2, -1.55, 0));         // oil tank
  root.add(box(3.6, 0.10, 2.1, M.steelDk, -0.2, -0.85, 0));       // tank lid
  root.add(box(0.55, 0.34, 0.30, M.red, -1.55, -0.72, 0.75));     // filler / breather
  root.add(cylY(0.10, 0.4, M.steel, 1.25, -0.66, 0.72));          // level gauge
  root.add(box(0.42, 0.60, 0.06, M.dark, -0.2, -1.45, 1.02));     // sight glass

  // motor + pump group on top of the tank
  root.add(box(2.5, 0.14, 1.1, M.steelDk, -0.4, -0.74, 0));       // bedplate
  root.add(cylX(0.44, 1.35, M.steel, -1.05, -0.32, 0, 40));       // electric motor
  root.add(cylX(0.47, 0.14, M.steelDk, -0.34, -0.32, 0, 40));
  root.add(box(0.5, 0.62, 0.62, M.paint, -1.90, -0.32, 0));       // terminal box
  root.add(cylX(0.26, 0.62, M.steelDk, 0.18, -0.32, 0, 28));      // pump
  root.add(cylX(0.16, 0.30, M.red, 0.60, -0.32, 0, 24));

  // manifold + valve stack
  root.add(box(0.7, 0.9, 0.8, M.dark, 1.42, -0.70, 0));
  [0.22, -0.06, -0.34].forEach(y => {
    root.add(cylX(0.13, 0.5, M.red, 1.88, y - 0.4, 0, 20));
  });
  // pipe runs
  root.add(cylX(0.09, 1.2, M.steel, 0.85, -0.32, 0.30));
  root.add(cylY(0.09, 0.9, M.steel, 1.42, -0.02, 0.30));
  root.add(cylX(0.09, 1.1, M.steel, 0.9, -0.95, -0.34));

  // air-blast cooler
  root.add(box(0.22, 1.15, 1.6, M.paint, -2.25, -1.35, 0));
  [-0.6, -0.3, 0, 0.3, 0.6].forEach(z =>
    root.add(box(0.10, 1.0, 0.07, M.steelDk, -2.40, -1.35, z)));
  root.add(cylX(0.34, 0.22, M.steelDk, -2.48, -1.35, 0, 28));

  // control cabinet
  root.add(box(0.9, 1.6, 0.6, M.paint, 2.05, -1.30, -0.7));
  root.add(box(0.72, 0.60, 0.04, M.dark, 2.05, -0.95, -0.42));
  root.add(box(0.14, 0.14, 0.04, M.red, 1.82, -1.55, -0.42));
  root.add(box(0.14, 0.14, 0.04, M.pale, 2.10, -1.55, -0.42));

  // lifting eyes
  [-1.9, 1.9].forEach(x => [1, -1].forEach(s => {
    const e = new THREE.Mesh(new THREE.TorusGeometry(0.15, 0.045, 8, 18), M.red);
    e.position.set(x, -2.10, s * 1.0); mark(e); root.add(e);
    root.add(box(0.18, 0.28, 0.14, M.paint, x, -2.30, s * 1.0));
  }));

  return root;
}

/* ======================================================================
   MODEL 4 — Deck / boom crane   (A-FRAMES, CRANES AND LIFTING)
   ====================================================================== */
function buildCrane(opts?: { rig?: boolean }) {
  const root = new THREE.Group();
  const g = new THREE.Group();
  root.add(g);

  const ANG = 0.60, HX = 0.60, HY = -0.30, L = 5.9;
  const cx = HX + Math.cos(ANG) * L / 2, cy = HY + Math.sin(ANG) * L / 2;
  const tx = HX + Math.cos(ANG) * L,     ty = HY + Math.sin(ANG) * L;

  // skid + pedestal
  g.add(box(4.4, 0.30, 3.0, M.paintDk, 0, -2.42, 0));
  g.add(box(4.6, 0.16, 0.32, M.red, 0, -2.62, 1.34));
  g.add(box(4.6, 0.16, 0.32, M.red, 0, -2.62, -1.34));
  [-1.5, 0, 1.5].forEach(x => g.add(box(0.24, 0.28, 2.7, M.steelDk, x, -2.64, 0)));
  g.add(cylY(1.00, 1.30, M.paint,   0, -1.62, 0, 40));   // pedestal
  g.add(cylY(1.14, 0.12, M.steelDk, 0, -2.20, 0, 40));   // base flange
  g.add(cylY(1.10, 0.22, M.steel,   0, -0.90, 0, 40));   // slew ring
  g.add(cylY(1.16, 0.06, M.red,     0, -0.90, 0, 40));

  // machinery house
  g.add(box(2.10, 1.30, 1.90, M.paint,   -0.45, -0.12, 0));
  g.add(box(2.18, 0.10, 1.98, M.steelDk, -0.45,  0.58, 0));
  g.add(box(0.72, 0.52, 0.05, M.dark,    -1.24,  0.04, 0.96));  // window
  g.add(box(0.16, 0.16, 0.05, M.red,     -0.14, -0.34, 0.96));
  [0.96, -0.96].forEach(z => {
    g.add(box(2.05, 0.05, 0.05, M.red, -0.45, 0.92, z));         // roof rail
    [-1.4, -0.45, 0.5].forEach(x => g.add(box(0.05, 0.34, 0.05, M.red, x, 0.75, z)));
  });

  // boom
  const boom = box(L, 0.46, 0.46, M.paint, cx, cy, 0, ANG);
  g.add(boom);
  [0.30, -0.30].forEach(z => g.add(box(L - 0.3, 0.15, 0.10, M.paint, cx, cy, z, ANG)));
  g.add(cylZ(0.30, 0.72, M.steelDk, HX, HY, 0, 28));              // heel pin
  g.add(cylZ(0.13, 0.80, M.red,     HX, HY, 0, 20));

  // boom-tip sheave
  g.add(cylZ(0.30, 0.34, M.steel,   tx, ty, 0, 30));
  g.add(cylZ(0.35, 0.07, M.steelDk, tx, ty,  0.21, 30));
  g.add(cylZ(0.35, 0.07, M.steelDk, tx, ty, -0.21, 30));

  // luffing cylinder, house to boom underside
  const bx = HX + Math.cos(ANG) * 2.45, by = HY + Math.sin(ANG) * 2.45;
  [0.42, -0.42].forEach(z => {
    g.add(rod(-0.15, 0.30, bx * 0.55, by * 0.55 + 0.15, 0.19, M.paint,   z, 22));
    g.add(rod(bx * 0.45, by * 0.45 + 0.12, bx, by, 0.10, M.steel, z, 20));
  });
  g.add(cylZ(0.14, 1.05, M.red, -0.15, 0.30, 0, 20));

  if (opts && opts.rig) {
    /* live hoist: the fall pays out and hauls in, and the hook block is
       exposed so the page can hang a real payload from it */
    const wg = new THREE.CylinderGeometry(0.055, 0.055, 1, 10);
    wg.translate(0, -0.5, 0);                       // origin at the top of the wire
    const wire = mark(new THREE.Mesh(wg, M.wire));
    wire.position.set(tx, ty, 0);

    const hookG = new THREE.Group();
    hookG.add(box(0.52, 0.58, 0.46, M.paintDk, 0, 0, 0));
    hookG.add(cylZ(0.27, 0.16, M.steel, 0, 0.14, 0, 26));
    const hk = new THREE.Mesh(new THREE.TorusGeometry(0.20, 0.06, 10, 22, Math.PI * 1.4), M.red);
    hk.position.set(0, -0.46, 0); mark(hk); hookG.add(hk);
    g.add(wire, hookG);

    root.userData.rig = {
      hook: hookG,
      setDrop(d: number) {
        d = Math.max(0.5, d);
        wire.scale.y = d;
        hookG.position.set(tx, ty - d, 0);
      }
    };
    root.userData.rig.setDrop(4);
  } else {
    // static hoist fall + hook block
    g.add(cylY(0.05, 3.85, M.wire, tx, ty - 1.93, 0));
    g.add(box(0.44, 0.52, 0.40, M.paintDk, tx, ty - 4.10, 0));
    g.add(cylZ(0.24, 0.14, M.steel, tx, ty - 3.98, 0, 26));
    const hook = new THREE.Mesh(new THREE.TorusGeometry(0.19, 0.055, 10, 22, Math.PI * 1.4), M.red);
    hook.position.set(tx, ty - 4.52, 0); mark(hook); g.add(hook);
  }

  g.position.x = -2.0;
  return root;
}

/* ======================================================================
   Viewer — one WebGL context per canvas, renders only when on screen
   ====================================================================== */
function envTexture(renderer: THREE.WebGLRenderer) {
  const cv = document.createElement('canvas');
  cv.width = 16; cv.height = 256;
  const g = cv.getContext('2d');
  if (!g) throw new Error('2D context unavailable for the environment map');
  const grd = g.createLinearGradient(0, 0, 0, 256);
  grd.addColorStop(0.00, '#ffffff');
  grd.addColorStop(0.42, '#f2f6fb');
  grd.addColorStop(0.58, '#d3dceb');
  grd.addColorStop(1.00, '#9aa6b8');
  g.fillStyle = grd; g.fillRect(0, 0, 16, 256);
  const tex = new THREE.CanvasTexture(cv);
  tex.mapping = THREE.EquirectangularReflectionMapping;
  const pm = new THREE.PMREMGenerator(renderer);
  const rt = pm.fromEquirectangular(tex);
  pm.dispose(); tex.dispose();
  return rt.texture;
}

export interface ViewerOpts { fov?: number; shadow?: number }

function createViewer(canvas: HTMLCanvasElement, opts?: ViewerOpts) {
  opts = opts || {};
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas, antialias: true, alpha: true, powerPreference: 'high-performance'
  });
  renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.28;

  const scene = new THREE.Scene();
  scene.environment = envTexture(renderer);

  const camera = new THREE.PerspectiveCamera(opts.fov || 34, 1, 0.1, 200);

  scene.add(new THREE.HemisphereLight(0xffffff, 0xccd6e4, 1.05));
  const key = new THREE.DirectionalLight(0xffffff, 2.7);
  key.position.set(7, 11, 8);
  key.castShadow = true;
  key.shadow.mapSize.set(1024, 1024);
  const cam = key.shadow.camera;
  cam.left = -9; cam.right = 9; cam.top = 9; cam.bottom = -9; cam.near = 1; cam.far = 40;
  key.shadow.bias = -0.0012;
  scene.add(key);
  const fill = new THREE.DirectionalLight(0xe4ecfa, 1.15);
  fill.position.set(-8, 4, -6); scene.add(fill);
  const rim = new THREE.DirectionalLight(0xffffff, 1.35);
  rim.position.set(-4, 3, -9); scene.add(rim);
  const front = new THREE.DirectionalLight(0xffffff, 0.55);
  front.position.set(2, 1.5, 10); scene.add(front);

  const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(60, 60),
    new THREE.ShadowMaterial({ opacity: opts.shadow == null ? 0.16 : opts.shadow })
  );
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = -2.78;
  ground.receiveShadow = true;
  scene.add(ground);

  const pivot = new THREE.Group();
  scene.add(pivot);

  const api = {
    renderer, scene, camera, pivot,
    visible: false,
    setModel(model: THREE.Object3D) {
      while (pivot.children.length) pivot.remove(pivot.children[0]);
      pivot.add(model);
      (api as { model?: THREE.Object3D }).model = model;
    },
    resize() {
      const w = canvas.clientWidth || 1, h = canvas.clientHeight || 1;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    },
    frame(dist: number, height: number, lookY?: number) {
      camera.position.set(0, height, dist);
      camera.lookAt(0, lookY || 0, 0);
    },
    render() { renderer.render(scene, camera); },
    /* Hand the WebGL context back. Each viewer owns one context and browsers
       cap how many can be live at once (Chrome drops the oldest at ~16), so a
       viewer that is thrown away must release rather than wait for GC — under
       client-side navigation the homepage can be built several times in one
       document lifetime. Only the environment map is disposed alongside it:
       geometries are rebuilt per model, but the materials in M are shared
       module-wide and disposing those would break the next build. */
    dispose() {
      const env = scene.environment;
      if (env) env.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
    },
    /* where an object lands on the canvas, as 0..1 fractions — used to hang
       DOM content off a point in the 3D scene */
    project(obj: THREE.Object3D) {
      const v = new THREE.Vector3();
      obj.getWorldPosition(v);
      v.project(camera);
      return { x: v.x * 0.5 + 0.5, y: -v.y * 0.5 + 0.5 };
    }
  };

  api.resize();
  return api;
}

export { buildWinch, buildAFrame, buildHPU, buildCrane, createViewer, M as MATS, C as COLORS };
