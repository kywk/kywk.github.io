// Decorative scatter, waterfront ledges, themed surroundings and islets.
// Purely scenic: no item here represents a policy, a facility location or a schedule.
import { R, TOP, RING_R, NEIGHBORS, dirOf, hexVertex, insideHex } from "./world.js?v=20261030-2";
import { WATER_Y, mulberry } from "./environment.js?v=20261026-1";
import { EDGE_ITEMS } from "./decor-items.js?v=20261030-2";
let THREE;

export function buildDecor(T, kit, D, centers, neighbors, footprints, colors, opts = {}) {
  const heightAt = opts.heightAt || (() => -1);
  THREE = T;
  const rnd = mulberry(99);
  const ambientSpots = [];
  const diplomacyMarkers = [];
  const C = colors;
  const W = WATER_Y;
  const { box, hbox, cyl, sphere, ico, part, bulb, glow } = kit;
  const TREE_GREENS = [0x9cc27a, 0xa9c98a, 0x8db86f, 0xb3cf8e, 0x86ad6a];
  let treeIsland = null;
  // rounded broadleaf canopy: tapered trunk with branch stubs, a root mound, and 4–6 lumpy clumps
  // (shadow side darker & cooler, crown lighter) so no tree reads as a single smooth ball
  const canopy = (x, z, s, y, g) => {
    const base = new THREE.Color(g);
    const dark = base.clone().offsetHSL(0.02, -0.05, -0.09).getHex(),
      mid = base.getHex(),
      light = base.clone().offsetHSL(-0.01, 0.04, 0.08).getHex();
    part("dome", [x, y, z], [s * 0.42, s * 0.09, s * 0.42], 0x8a7058);
    part("trunk", [x, y + s * 0.33, z], [s * 0.2, s * 0.66, s * 0.2], 0x8a6a4e);
    part("trunk", [x + s * 0.1, y + s * 0.58, z + s * 0.04], [s * 0.08, s * 0.3, s * 0.08], 0x8a6a4e, null, [0.2, 0, -0.7]);
    part("trunk", [x - s * 0.09, y + s * 0.62, z - s * 0.03], [s * 0.07, s * 0.26, s * 0.07], 0x8a6a4e, null, [-0.2, 0, 0.7]);
    const n = 4 + Math.floor(rnd() * 3);
    for (let t = 0; t < n; t++) {
      const a = (t / n) * Math.PI * 2 + rnd() * 0.6;
      const r = s * (0.24 + rnd() * 0.12);
      const lo = t % 2 === 0;
      const k = s * (0.5 + rnd() * 0.22);
      part("leaf", [x + Math.cos(a) * r, y + s * (lo ? 0.82 : 0.98) + rnd() * s * 0.08, z + Math.sin(a) * r], [k, k * 0.86, k], lo ? dark : mid, null, [rnd(), rnd() * 6, rnd()]);
    }
    part("leaf", [x, y + s * 1.12, z], [s * 0.62, s * 0.52, s * 0.62], light, null, [rnd(), rnd() * 6, 0]);
    part("leaf", [x + s * 0.12, y + s * 1.2, z + s * 0.14], [s * 0.34, s * 0.3, s * 0.34], base.clone().offsetHSL(-0.02, 0.06, 0.13).getHex());
  };
  const tree = (x, z, s = 0.4, y = TOP, tint = 0) => {
    const g = TREE_GREENS[(tint + Math.floor(rnd() * TREE_GREENS.length)) % TREE_GREENS.length];
    const style = {
      trails: "conifer",
      forest: "conifer",
      diplomacy: "palm",
      welfare: "willow",
      card: "blossom",
      family: "clipped",
      sport: "poplar",
      civil: "clipped",
      institute: "topiary",
      hakka: "blossom",
      lunch: "palm",
      youth: "palm",
      education: "poplar",
    }[treeIsland];
    if (style === "conifer") {
      const h = s * (1.3 + rnd() * 0.8);
      cyl(x, y + h * 0.15, z, s * 0.1, h * 0.3, 0x7a5d44);
      for (let t = 0; t < 3; t++) part("cone6", [x, y + h * (0.35 + t * 0.22), z], [s * (0.9 - t * 0.22), h * 0.42, s * (0.9 - t * 0.22)], [0x5f826c, 0x6f8a62, 0x58785f][t]);
      return;
    }
    if (style === "poplar") {
      cyl(x, y + s * 0.2, z, s * 0.09, s * 0.4, 0x9a7454);
      part("leaf", [x, y + s * 0.95, z], [s * 0.5, s * 1.3, s * 0.5], g, null, [0, rnd() * 6, 0]);
      part("leaf", [x + s * 0.06, y + s * 1.3, z + s * 0.05], [s * 0.3, s * 0.6, s * 0.3], new THREE.Color(g).offsetHSL(0, 0.04, 0.08).getHex());
      return;
    }
    if (style === "topiary" || style === "clipped") {
      cyl(x, y + s * 0.3, z, s * 0.08, s * 0.6, 0x9a7454);
      if (style === "clipped") {
        part("leaf", [x, y + s * 0.82, z], [s * 0.78, s * 0.62, s * 0.78], 0x86ad6a, null, [0, rnd() * 6, 0]);
        part("leaf", [x, y + s * 1.08, z], [s * 0.5, s * 0.4, s * 0.5], 0xa3c486, null, [0, rnd() * 6, 0]);
      }
      else {
        part("leaf", [x, y + s * 0.7, z], [s * 0.55, s * 0.55, s * 0.55], 0x86ad6a, null, [rnd(), rnd() * 6, 0]);
        part("leaf", [x, y + s * 1.15, z], [s * 0.38, s * 0.38, s * 0.38], 0xa9c98a, null, [rnd(), rnd() * 6, 0]);
      }
      kit.box(x, y + 0.05, z, s * 0.4, 0.1, s * 0.4, 0xd08a64);
      return;
    }
    if (style === "palm") {
      cyl(x, y + s * 0.55, z, s * 0.07, s * 1.1, 0xb48560);
      for (let t = 0; t < 5; t++) {
        const a = (t / 5) * Math.PI * 2;
        part("box", [x + Math.cos(a) * s * 0.28, y + s * 1.08, z + Math.sin(a) * s * 0.28], [s * 0.6, s * 0.04, s * 0.18], 0x7fae6a, null, [0, -a, -0.35]);
      }
      return;
    }
    if (style === "willow") {
      cyl(x, y + s * 0.35, z, s * 0.11, s * 0.7, 0x8a6a4e);
      part("leaf", [x, y + s * 0.85, z], [s * 1.1, s * 0.6, s * 1.1], 0x9cc27a, null, [0, rnd() * 6, 0]);
      part("leaf", [x, y + s * 1.02, z], [s * 0.7, s * 0.4, s * 0.7], 0xb3cf8e, null, [0, rnd() * 6, 0]);
      for (let t = 0; t < 6; t++) {
        const a = (t / 6) * Math.PI * 2;
        cyl(x + Math.cos(a) * s * 0.75, y + s * 0.55, z + Math.sin(a) * s * 0.75, s * 0.08, s * 0.5, 0x9cc27a);
      }
      return;
    }
    canopy(x, z, s, y, g);
    if (style === "blossom") for (let t = 0; t < 7; t++) sphere(x + (rnd() - 0.5) * s, y + s * (0.7 + rnd() * 0.5), z + (rnd() - 0.5) * s, s * 0.22, [0xf2b5c6, 0xf7cfda, 0xffffff][t % 3]);
    if (style === "fruit") for (let t = 0; t < 6; t++) sphere(x + (rnd() - 0.5) * s * 0.9, y + s * (0.65 + rnd() * 0.5), z + s * 0.35 + (rnd() - 0.5) * s * 0.3, s * 0.1, [0xf2a33a, 0xdb6a41][t % 2]);
  };
  const bush = (x, z, s = 0.12, y = TOP) => {
    const g = [0x9cc27a, 0xa9c98a, 0x8db86f][Math.floor(rnd() * 3)];
    part("leaf", [x, y + s * 0.42, z], [s, s * 0.8, s], g, null, [rnd(), rnd() * 6, 0]);
    part("leaf", [x + s * 0.55, y + s * 0.32, z + s * 0.2], [s * 0.7, s * 0.6, s * 0.7], new THREE.Color(g).offsetHSL(0, 0, 0.04).getHex());
  };
  const flowers = (x, z, y = TOP) => {
    for (let k = 0; k < 5; k++) sphere(x + (rnd() - 0.5) * 0.14, y + 0.03, z + (rnd() - 0.5) * 0.14, 0.03, [0xf2b5c6, 0xfcea8b, 0xffffff, 0xd9c6f0, 0xf4a46a][Math.floor(rnd() * 5)]);
    ico(x, y + 0.015, z, [0.12, 0.03, 0.12], 0x8fa67a);
  };
  const pebble = (x, z, y = TOP) => ico(x, y + 0.012, z, [0.05 + rnd() * 0.04, 0.025, 0.05], [0xc9bba6, 0xb7a993, 0xd8ccba][Math.floor(rnd() * 3)]);
  const lampSpots = [];
  const lighthouses = [];
  const stringLights = [];
  const lamp = (x, z, y = TOP) => {
    lampSpots.push([x, y, z]);
    cyl(x, y + 0.18, z, 0.016, 0.36, 0x4a514d);
    hbox(x, y + 0.365, z, 0.05, 0.012, 0.05, 0x4a514d);
    bulb(x, y + 0.345, z, 0.035);
  };
  const bench = (x, z, yaw = 0, y = TOP) => {
    hbox(x, y + 0.07, z, 0.22, 0.02, 0.07, 0xb48560, null, [0, yaw, 0]);
    hbox(x - Math.cos(yaw) * 0 + Math.sin(yaw) * -0.035, y + 0.11, z - Math.cos(yaw) * 0.035, 0.22, 0.06, 0.012, 0xb48560, null, [0, yaw, 0]);
    for (const s of [-1, 1]) hbox(x + Math.cos(yaw) * 0.085 * s, y + 0.035, z - Math.sin(yaw) * 0.085 * s, 0.018, 0.07, 0.06, 0x7a807c, null, [0, yaw, 0]);
  };
  const bin = (x, z, y = TOP) => {
    cyl(x, y + 0.05, z, 0.05, 0.1, 0x5f7d6e);
    cyl(x, y + 0.105, z, 0.056, 0.012, C.ink);
  };
  const bikeRack = (x, z, yaw = 0, y = TOP) => {
    for (let k = 0; k < 3; k++) part("torus", [x + Math.cos(yaw) * (k - 1) * 0.05, y + 0.03, z - Math.sin(yaw) * (k - 1) * 0.05], [0.055, 0.055, 0.055], 0x7a807c, null, [0, yaw + Math.PI / 2, 0]);
  };
  const planter = (x, z, y = TOP) => {
    box(x, y + 0.04, z, 0.14, 0.08, 0.14, 0xb79a7b);
    ico(x, y + 0.1, z, [0.12, 0.08, 0.12], 0x8fa67a);
  };

  // ---------- footprint test ----------
  const fpByIsland = new Map();
  for (const f of footprints) {
    if (!fpByIsland.has(f.island)) fpByIsland.set(f.island, []);
    fpByIsland.get(f.island).push(f);
  }
  const blocked = (id, x, z, m = 0.05) => (fpByIsland.get(id) || []).some((f) => x > f.minX - m && x < f.maxX + m && z > f.minZ - m && z < f.maxZ + m);
  const occupied = new Map(); // island -> [[x,z,r]]
  const free = (id, x, z, r) => {
    const list = occupied.get(id) || [];
    if (list.some(([a, b, rr]) => Math.hypot(a - x, b - z) < r + rr)) return false;
    list.push([x, z, r]);
    occupied.set(id, list);
    return true;
  };

  // keep the youth island's skate strip and stage-front audience spots clear of trees and vignettes
  if (centers.get("youth")) {
    const yc = centers.get("youth");
    for (const dx of [-1.06, -0.8, -0.54]) free("youth", yc.x + dx, yc.z + 1.04, 0.2);
    free("youth", yc.x + 0.3, yc.z + 1.33, 0.3);
  }
  for (const i of D.islands) {
    const c = centers.get(i.id);
    kit.setIsland(i.id);
    treeIsland = i.id;
    const nb = neighbors.get(i.id);
    // --- band furniture: lamps at ring vertices (pushed to outer band), planters between ---
    for (let k = 0; k < 6; k++) {
      const [vx, vz] = hexVertex(c.x, c.z, RING_R + 0.1, k);
      kit.decor(i.id, "lamp", () => lamp(vx, vz));
    }
    for (let k = 0; k < 6; k++) {
      // edge k between vertex k and k+1; skip bridge edges
      const [ax, az] = hexVertex(c.x, c.z, RING_R + 0.1, k),
        [bx, bz] = hexVertex(c.x, c.z, RING_R + 0.1, k + 1);
      const mx = (ax + bx) / 2 - c.x,
        mz = (az + bz) / 2 - c.z;
      const isBridge = nb.some((n) => n.id && (() => {
        const [dx, dz] = dirOf(n.dq, n.dr);
        return dx * mx + dz * mz > 1.2;
      })());
      for (const t of [0.27, 0.73]) {
        const x = ax + (bx - ax) * t,
          z = az + (bz - az) * t;
        kit.decor(i.id, "planter", () => (k % 2 ? planter(x, z) : bush(x, z, 0.08)));
      }
      if (!isBridge) {
        kit.decor(i.id, "flowers", () => flowers(c.x + mx, c.z + mz));
      }
    }
    // --- a few big round canopy trees along the outer zone (B-style greenery) ---
    {
      let made = 0;
      for (let k = 0; k < 12 && made < 6; k++) {
        const a = Math.PI / 2 + (k * Math.PI) / 6 + (rnd() - 0.5) * 0.3;
        const r = 1.18 + rnd() * 0.12;
        const lx = Math.cos(a) * r,
          lz = Math.sin(a) * r;
        if (!insideHex(lx, lz, 1.36)) continue;
        const x = c.x + lx,
          z = c.z + lz;
        if (blocked(i.id, x, z, 0.2)) continue;
        if (!free(i.id, x, z, 0.24)) continue;
        kit.decor(i.id, "bigTree", () => tree(x, z, 0.36 + rnd() * 0.12));
        made++;
      }
    }
    // --- island-specific edge vignettes (outer zone, inside the walking ring) ---
    {
      const items = EDGE_ITEMS[i.id] || [];
      const cands = [];
      for (let k = 0; k < 2400; k++) {
        const lx = (rnd() - 0.5) * 2.9,
          lz = (rnd() - 0.5) * 2.9;
        if (!insideHex(lx, lz, 1.42) || insideHex(lx, lz, 0.7)) continue;
        cands.push([lx, lz]);
      }
      let placedE = 0;
      for (const [lx, lz] of cands) {
        if (placedE >= 14 || !items.length) break;
        const x = c.x + lx,
          z = c.z + lz;
        if (blocked(i.id, x, z, 0.12)) continue;
        if (!free(i.id, x, z, 0.13)) continue;
        const [type, fn] = items[placedE % items.length];
        const yaw = Math.atan2(lx, lz) + Math.PI;
        kit.decor(i.id, type, () => fn(kit, x, z, TOP, yaw, rnd));
        placedE++;
      }
    }
    // --- stepping-stone paths from each building front to the walking ring ---
    for (const f of fpByIsland.get(i.id) || []) {
      const fx = (f.minX + f.maxX) / 2;
      for (let zz = f.maxZ + 0.06; zz < c.z + 1.6; zz += 0.1) {
        const lx = fx - c.x,
          lz = zz - c.z;
        if (!insideHex(lx, lz, 1.42)) break;
        if ((fpByIsland.get(i.id) || []).some((o) => o !== f && fx > o.minX - 0.04 && fx < o.maxX + 0.04 && zz > o.minZ - 0.04 && zz < o.maxZ + 0.04)) break;
        free(i.id, fx, zz, 0.05);
        kit.decor(i.id, "doorPath", () => kit.hbox(fx, TOP + 0.006, zz, 0.11, 0.008, 0.07, 0xe9dcc8));
      }
    }
    // --- inner scatter (Poisson-ish) ---
    let placed = 0,
      tries = 0;
    const MIX = {
      forest: ["tree", "tree", "bush", "tree", "fern", "tree", "flowers", "tree", "pebble", "tree", "bush", "fern"],
      trails: ["tree", "rock", "bush", "tree", "rock", "pebble", "fern", "tree", "flowers", "rock"],
      lunch: ["veg", "veg", "bush", "flowers", "veg", "tree", "pebble", "veg", "planter"],
      welfare: ["flowers", "flowers", "bush", "bench", "flowers", "tree", "planter", "flowers", "bush"],
      youth: ["planter", "bench", "bikeRack", "flowers", "bin", "bush", "planter", "tree"],
      civil: ["planter", "tree", "bench", "bush", "planter", "tree", "flowers"],
    };
    const types = MIX[i.id] || ["bush", "flowers", "bush", "tree", "pebble", "flowers", "bench", "bush", "planter", "tree", "bin", "flowers", "bikeRack"];
    while (placed < (i.id === "forest" ? 64 : ["civil", "institute", "transport"].includes(i.id) ? 26 : 40) && tries < 2200) {
      tries++;
      const lx = (rnd() - 0.5) * 2.9,
        lz = (rnd() - 0.5) * 2.9;
      if (!insideHex(lx, lz, 1.4)) continue;
      const x = c.x + lx,
        z = c.z + lz;
      if (blocked(i.id, x, z, 0.04)) continue;
      const t = types[placed % types.length];
      const r = t === "tree" ? (i.id === "forest" ? 0.12 : 0.16) : t === "bench" ? 0.13 : 0.07;
      if (blocked(i.id, x, z, r)) continue;
      if (!free(i.id, x, z, r)) continue;
      placed++;
      kit.decor(i.id, t, () => {
        if (t === "bush") bush(x, z, 0.07 + rnd() * 0.05);
        else if (t === "flowers") flowers(x, z);
        else if (t === "pebble") pebble(x, z);
        else if (t === "tree") tree(x, z, (i.id === "forest" ? 0.34 : 0.26) + rnd() * 0.12);
        else if (t === "fern") ico(x, TOP + 0.05, z, [0.14, 0.1, 0.14], [0x6f8a62, 0x7f9a6a][Math.floor(rnd() * 2)]);
        else if (t === "rock") ico(x, TOP + 0.05, z, [0.12 + rnd() * 0.06, 0.09, 0.11], [0x9c8a7a, 0xb7a993][Math.floor(rnd() * 2)]);
        else if (t === "veg") {
          hbox(x, TOP + 0.02, z, 0.16, 0.04, 0.1, 0x7a5a42);
          for (let q = 0; q < 3; q++) ico(x - 0.05 + q * 0.05, TOP + 0.06, z, [0.045, 0.04, 0.045], [0x8fb37a, 0xa9c47f, 0xdb6a41][q]);
        }
        else if (t === "bin") bin(x, z);
        else if (t === "bench") bench(x, z, Math.round(rnd() * 3) * (Math.PI / 2));
        else if (t === "bikeRack") bikeRack(x, z, Math.round(rnd()) * (Math.PI / 2));
        else planter(x, z);
      });
    }
    // grass tufts everywhere free (tiny)
    for (let k = 0; k < 40; k++) {
      const lx = (rnd() - 0.5) * 2.9,
        lz = (rnd() - 0.5) * 2.9;
      if (!insideHex(lx, lz, 1.42)) continue;
      const x = c.x + lx,
        z = c.z + lz;
      if (blocked(i.id, x, z, 0.02)) continue;
      kit.decor(i.id, "tuft", () => ico(x, TOP + 0.01, z, [0.05, 0.02, 0.05], 0x93ab76));
    }
  }

  // ---------- pennant bunting strung between corner lamps (card, family, education, youth) ----------
  const BUNT = { card: [0xdb6a41, 0xe8c547, 0x58a6a6, 0xf2a1a1], youth: [0xdb6a41, 0xe8b04a, 0xf3e2c6, 0x3e7c8c] };
  for (const [id, cols] of Object.entries(BUNT)) {
    const c = centers.get(id);
    kit.setIsland(id);
    for (let k = 0; k < 6; k++) {
      const [ax, az] = hexVertex(c.x, c.z, RING_R + 0.1, k),
        [bx, bz] = hexVertex(c.x, c.z, RING_R + 0.1, k + 1);
      kit.decor(id, "bunting", () => {
        const n = 9;
        for (let s = 1; s < n; s++) {
          const t = s / n,
            sag = Math.sin(t * Math.PI) * 0.08;
          const x = ax + (bx - ax) * t,
            z = az + (bz - az) * t;
          part("tetra", [x, TOP + 0.33 - sag, z], [0.06, 0.07, 0.012], cols[s % cols.length], null, [Math.PI, Math.atan2(bx - ax, bz - az) + Math.PI / 2, 0]);
        }
        const len = Math.hypot(bx - ax, bz - az);
        part("box", [(ax + bx) / 2, TOP + 0.33, (az + bz) / 2], [0.006, 0.006, len], 0x5a4a3e, null, [0, Math.atan2(bx - ax, bz - az), 0]);
      });
    }
  }
  // ---------- island-specific edge trims and canal features ----------
  const TRIM = {
    civil: { kind: "balustrade", c: 0xe6d8c2, c2: 0xcdbb9f },
    institute: { kind: "glassrail", c: 0x3e7c8c, c2: 0xcfe6e6 },
    renewal: { kind: "barrier", c: 0xdb6a41, c2: 0xf2efe8 },
    transport: { kind: "bollards", c: 0xe8c547, c2: 0x3b3a42 },
    education: { kind: "picket", c: 0xf6e7a8, c2: 0xffffff },
    lunch: { kind: "bamboo", c: 0xc9b27a, c2: 0x9c7a4e },
    family: { kind: "picket", c: 0xf2b5c6, c2: 0x9fc4e6 },
    card: { kind: "planterwall", c: 0xd4a07e, c2: 0x9cc27a },
    welfare: { kind: "hedge", c: 0x8db86f, c2: 0x9cc27a },
    sport: { kind: "trackedge", c: 0xc8775a, c2: 0xffffff },
    trails: { kind: "stonewall", c: 0xb7a993, c2: 0x9c8a7a },
    forest: { kind: "ferns", c: 0x7f9a6a, c2: 0x9a7454 },
    youth: { kind: "paintwall", c: 0xe8c547, c2: 0x58a6a6 },
    diplomacy: { kind: "pilings", c: 0x8a6a4e, c2: 0xd8c39a },
    hakka: { kind: "stonewall", c: 0xc77b5c, c2: 0xe2cdb3 },
  };
  const CANAL = {
    welfare: "barge",
    family: "duck",
    forest: "duck",
    lunch: "raft",
    sport: "kayak",
    education: "paperboat",
    youth: "lantern",
    card: "paperboat",
    trails: "stones",
    institute: "buoy",
    civil: "barge",
    transport: "ferry",
    diplomacy: "buoy",
    renewal: "boom",
    hakka: "paperboat",
  };
  for (const i of D.islands) {
    const c = centers.get(i.id),
      T = TRIM[i.id];
    if (!T) continue;
    kit.setIsland(i.id);
    treeIsland = i.id;
    const nb = neighbors.get(i.id);
    const bridgeDirs = nb.filter((n) => n.id).map((n) => dirOf(n.dq, n.dr));
    for (let e = 0; e < 6; e++) {
      const [ax, az] = hexVertex(c.x, c.z, R - 0.05, e),
        [bx, bz] = hexVertex(c.x, c.z, R - 0.05, e + 1);
      const mx = (ax + bx) / 2 - c.x,
        mz = (az + bz) / 2 - c.z,
        ml = Math.hypot(mx, mz);
      const hasBridge = bridgeDirs.some(([dx, dz]) => (dx * mx + dz * mz) / ml > 0.95);
      const yaw = Math.atan2(bx - ax, bz - az);
      const N = 9;
      for (let s = 0; s <= N; s++) {
        const t = s / N;
        if (hasBridge && Math.abs(t - 0.5) < 0.17) continue;
        const x = ax + (bx - ax) * t,
          z = az + (bz - az) * t;
        const seg = Math.hypot(bx - ax, bz - az) / N;
        kit.decor(i.id, "trim:" + T.kind, () => {
          switch (T.kind) {
            case "balustrade":
              cyl(x, TOP + 0.09, z, 0.05, 0.16, T.c);
              if (s < N) hbox(x + (bx - ax) / N / 2, TOP + 0.175, z + (bz - az) / N / 2, 0.05, 0.03, seg, T.c2, null, [0, yaw, 0]);
              break;
            case "glassrail":
              cyl(x, TOP + 0.07, z, 0.014, 0.14, T.c);
              if (s < N) hbox(x + (bx - ax) / N / 2, TOP + 0.08, z + (bz - az) / N / 2, 0.008, 0.1, seg, T.c2, null, [0, yaw, 0]);
              break;
            case "barrier":
              if (s < N) box(x + (bx - ax) / N / 2, TOP + 0.05, z + (bz - az) / N / 2, 0.05, 0.08, seg * 0.85, s % 2 ? T.c : T.c2, null, [0, yaw, 0]);
              break;
            case "bollards":
              cyl(x, TOP + 0.05, z, 0.04, 0.09, T.c2);
              cyl(x, TOP + 0.08, z, 0.042, 0.02, T.c);
              break;
            case "picket":
              for (const q of [0, 0.5]) if (s < N || q === 0) {
                const px = x + ((bx - ax) / N) * q,
                  pz = z + ((bz - az) / N) * q;
                hbox(px, TOP + 0.09, pz, 0.035, 0.17, 0.035, (s * 2 + q * 2) % 2 ? T.c : T.c2, null, [0, yaw, 0]);
                part("tetra", [px, TOP + 0.19, pz], [0.05, 0.04, 0.05], (s * 2 + q * 2) % 2 ? T.c : T.c2, null, [0, yaw + Math.PI / 4, 0]);
              }
              if (s < N) for (const hh of [0.06, 0.13]) hbox(x + (bx - ax) / N / 2, TOP + hh, z + (bz - az) / N / 2, 0.016, 0.022, seg, T.c2, null, [0, yaw, 0]);
              break;
            case "bamboo":
              for (const d of [-0.025, 0.025]) cyl(x + Math.cos(yaw) * d, TOP + 0.1, z - Math.sin(yaw) * d, 0.022, 0.2 + (s % 3) * 0.03, T.c);
              if (s < N) for (const hh of [0.08, 0.15]) hbox(x + (bx - ax) / N / 2, TOP + hh, z + (bz - az) / N / 2, 0.016, 0.016, seg, T.c2, null, [0, yaw, 0]);
              break;
            case "planterwall":
              if (s < N) {
                box(x + (bx - ax) / N / 2, TOP + 0.06, z + (bz - az) / N / 2, 0.12, 0.11, seg * 0.92, T.c, null, [0, yaw, 0]);
                sphere(x + (bx - ax) / N / 2, TOP + 0.14, z + (bz - az) / N / 2, [0.11, 0.08, seg * 0.48], [0x9cc27a, 0xf2b5c6, 0xfcea8b][s % 3]);
              }
              break;
            case "hedge":
              if (s < N) sphere(x + (bx - ax) / N / 2, TOP + 0.09, z + (bz - az) / N / 2, [0.16, 0.16, seg * 0.66], s % 2 ? T.c : T.c2);
              break;
            case "trackedge":
              if (s < N) {
                hbox(x + (bx - ax) / N / 2, TOP + 0.01, z + (bz - az) / N / 2, 0.08, 0.012, seg, T.c, null, [0, yaw, 0]);
                hbox(x + (bx - ax) / N / 2, TOP + 0.017, z + (bz - az) / N / 2, 0.006, 0.004, seg, T.c2, null, [0, yaw, 0]);
              }
              break;
            case "stonewall":
              ico(x, TOP + 0.04, z, [0.09 + rnd() * 0.03, 0.07, 0.08], rnd() < 0.5 ? T.c : T.c2);
              break;
            case "ferns":
              ico(x, TOP + 0.07, z, [0.17, 0.13, 0.17], [0x7f9a6a, 0x6f8a62, 0x8db86f][s % 3]);
              if (s % 3 === 0) tree(x, z, 0.3 + rnd() * 0.1);
              if (s % 4 === 1) part("cylinder", [x, TOP + 0.03, z], [0.04, 0.16, 0.04], T.c2, null, [Math.PI / 2, yaw, 0]);
              break;
            case "paintwall":
              if (s < N) box(x + (bx - ax) / N / 2, TOP + 0.09, z + (bz - az) / N / 2, 0.05, 0.16, seg * 0.94, [0xe8b04a, 0xf3e2c6, 0xdb6a41, 0x3e7c8c][s % 4], null, [0, yaw, 0]);
              break;
            case "pilings":
              cyl(x, TOP - 0.02, z, 0.045, 0.2, T.c);
              if (s % 2 === 0 && s < N) part("cylinder", [x + (bx - ax) / N, TOP + 0.05, z + (bz - az) / N], [0.012, seg * 2, 0.012], T.c2, null, [Math.PI / 2, yaw, 0]);
              break;
          }
        });
      }
      // canal features on the water just outside this edge (away from bridge centre)
      const feat = CANAL[i.id];
      for (const t of [0.15, 0.32, 0.68, 0.85]) {
        const ox = (mx / ml) * 0.24,
          oz = (mz / ml) * 0.24;
        const x = ax + (bx - ax) * t + ox,
          z = az + (bz - az) * t + oz;
        kit.decor(i.id, "canal:" + feat, () => canalFeature(kit, feat, x, z, yaw, rnd));
      }
    }
  }
  // ---------- waterfront ledges and themed surroundings ----------
  const islandIds = D.islands.map((i) => i.id);
  const nearOther = (id, x, z, clear) => islandIds.some((o) => o !== id && Math.hypot(centers.get(o).x - x, centers.get(o).z - z) < R + clear);
  const ledgeInfo = new Map();
  for (const i of D.islands) {
    const c = centers.get(i.id);
    const nb = neighbors.get(i.id);
    const ledges = [];
    for (const n of nb) {
      if (n.id) continue;
      const [dx, dz] = dirOf(n.dq, n.dr);
      const inr = R * 0.8660254;
      const mx = c.x + dx * (inr + 0.34),
        mz = c.z + dz * (inr + 0.34);
      const yaw = Math.atan2(dx, dz);
      const tx = Math.cos(yaw),
        tz = -Math.sin(yaw); // along edge
      const ends = [-0.75, 0.75].map((s) => [mx + tx * s + dx * 0.3, mz + tz * s + dz * 0.3]);
      if (ends.some(([x, z]) => nearOther(i.id, x, z, 0.5)) || nearOther(i.id, mx, mz, 0.4)) continue;
      ledges.push({ mx, mz, dx, dz, tx, tz, yaw });
    }
    ledgeInfo.set(i.id, ledges);
    kit.setIsland(i.id);
    treeIsland = i.id;
    const theme = THEMES[i.id];
    for (const [li, L] of ledges.entries()) {
      const ledgeTop = W + 0.13;
      const BASE = { trails: "rocks", forest: "mangrove", education: "beach", family: "playdock", welfare: "pond", civil: "terrace", institute: "amphi", lunch: "farmshore", youth: "seawall", card: "playdock" };
      const base = BASE[i.id] || "slab";
      kit.decor(i.id, "v:ledge:" + base, () => {
        const along = (u, v) => [L.mx + L.tx * u + L.dx * v, L.mz + L.tz * u + L.dz * v];
        if (base === "rocks") {
          // rocky shore with a trailhead ramp, no paved slab
          for (let s = 0; s < 16; s++) {
            const [x, z] = along(-0.8 + rnd() * 1.6, -0.25 + rnd() * 0.6);
            ico(x, W + 0.04 + rnd() * 0.08, z, [0.12 + rnd() * 0.16, 0.1 + rnd() * 0.12, 0.12 + rnd() * 0.14], [0x9c8a7a, 0xb7a993, 0x8f8172, 0xa59a8a][s % 4]);
          }
          for (let s = 0; s < 6; s++) {
            const [x, z] = along(-0.1 + s * 0.12, -0.28 + s * 0.02);
            hbox(x, W + 0.15 + (5 - s) * 0.075, z, 0.14, 0.04, 0.14, 0xb7a993, null, [0, L.yaw, 0]);
          }
          return;
        }
        if (base === "mangrove") {
          for (let s = 0; s < 9; s++) {
            const [x, z] = along(-0.75 + s * 0.19, -0.05 + (s % 2) * 0.22);
            for (let r = 0; r < 3; r++) part("cylinder", [x + (r - 1) * 0.04, W + 0.06, z], [0.02, 0.16, 0.02], 0x7a5d44, null, [0, 0, (r - 1) * 0.35]);
            tree(x, z, 0.28 + rnd() * 0.08, W + 0.12, 1);
          }
          for (let s = 0; s < 8; s++) {
            const [x, z] = along(-0.7 + s * 0.2, 0.3);
            hbox(x, W + 0.09, z, 0.2, 0.025, 0.12, s % 2 ? 0xa77a55 : 0xb48560, null, [0, L.yaw, 0]);
          }
          return;
        }
        if (base === "farmshore") {
          const [x0, z0] = along(0, 0.02);
          ico(x0, W + 0.02, z0, [1.8, 0.12, 0.62], 0x9c7a5a);
          for (let r = 0; r < 3; r++)
            for (let s = 0; s < 7; s++) {
              const [x, z] = along(-0.6 + s * 0.2, -0.15 + r * 0.17);
              ico(x, W + 0.12, z, [0.07, 0.06, 0.07], [0x8fb37a, 0xa9c47f, 0x6f8a62][r]);
            }
          for (let s = 0; s < 3; s++) {
            const [x, z] = along(-0.5 + s * 0.5, 0.33);
            kit.box(x, W + 0.05, z, 0.22, 0.06, 0.14, 0xb48560, null, [0, L.yaw, 0]);
            sphere(x, W + 0.1, z, [0.08, 0.05, 0.06], [0xdb6a41, 0xe8c547, 0x8fb37a][s]);
          }
          return;
        }
        if (base === "seawall") {
          for (let s = 0; s < 8; s++) {
            const [x, z] = along(-0.75 + s * 0.215, 0.2);
            kit.box(x, W + 0.15, z, 0.2, 0.3, 0.12, [0xdb6a41, 0xf3e2c6, 0xe8b04a, 0xe7a383, 0x3e7c8c][s % 5], null, [0, L.yaw, 0]);
          }
          for (let s = 0; s < 4; s++) {
            const [x, z] = along(-0.6 + s * 0.4, -0.05);
            ico(x, W + 0.06, z, [0.16, 0.1, 0.14], 0x9c8a7a);
          }
          return;
        }
        if (base === "amphi") {
          for (let s = 0; s < 4; s++) {
            const [x, z] = along(0, -0.22 + s * 0.13);
            kit.hbox(x, W + 0.24 - s * 0.055, z, 1.5 - s * 0.12, 0.05, 0.12, s % 2 ? 0xe6edea : 0xcfd8d3, null, [0, L.yaw, 0]);
          }
          const [bx, bz] = along(0, 0.36);
          cyl(bx, W + 0.05, bz, 0.4, 0.06, 0x3e7c8c);
          for (const u of [-0.6, 0.6]) {
            const [x, z] = along(u, 0.3);
            cyl(x, W + 0.3, z, 0.02, 0.4, 0x3e7c8c);
            bulb(x, W + 0.52, z, 0.03, 0x9fffd0);
          }
          return;
        }
        if (base === "instruments") {
          for (let s = 0; s < 3; s++) {
            const [x, z] = along(-0.55 + s * 0.55, 0.15 + (s % 2) * 0.15);
            cyl(x, W + 0.06, z, 0.16, 0.12, 0xf2efe8);
            cyl(x, W + 0.3, z, 0.02, 0.4, 0x3e7c8c);
            sphere(x, W + 0.52, z, 0.05, 0x3e7c8c);
            bulb(x, W + 0.58, z, 0.03, 0x9fffd0);
            kit.hbox(x, W + 0.4, z, 0.18, 0.01, 0.01, 0x211d1d);
          }
          const [px, pz] = along(0, -0.15);
          kit.hbox(px, W + 0.12, pz, 1.4, 0.03, 0.16, 0xcfd8d3, null, [0, L.yaw, 0]);
          return;
        }
        if (base === "playdock") {
          const [x0, z0] = along(0, 0.02);
          kit.hbox(x0, W + 0.1, z0, 1.6, 0.06, 0.6, i.id === "card" ? 0x8fc8cf : 0xf2d0b4, null, [0, L.yaw, 0]);
          for (let s = 0; s < 6; s++) {
            const [x, z] = along(-0.65 + s * 0.26, 0.0);
            sphere(x, W + 0.17, z, 0.06, [0xdb6a41, 0xe8c547, 0x58a6a6, 0xf2a1a1][s % 4]);
          }
          const [sx, sz] = along(0.45, 0.12);
          kit.box(sx, W + 0.24, sz, 0.12, 0.24, 0.12, 0xe8c547);
          kit.part("box", [sx - L.tx * 0.14, W + 0.22, sz - L.tz * 0.14], [0.08, 0.02, 0.3], 0xdb6a41, null, [0.55, L.yaw + Math.PI / 2, 0]);
          return;
        }
        if (base === "beach" || base === "pond") {
          const [x0, z0] = along(0, 0.02);
          ico(x0, W + 0.02, z0, [1.9, 0.12, 0.7], base === "beach" ? 0xead7a6 : 0xb4c993);
          if (base === "beach") {
            for (let s = 0; s < 3; s++) {
              const [x, z] = along(-0.55 + s * 0.5, -0.05);
              cyl(x, W + 0.25, z, 0.018, 0.36, 0x8a6a4e);
              part("cone", [x, W + 0.44, z], [0.36, 0.1, 0.36], [0xdb6a41, 0xe8c547, 0x58a6a6][s]);
            }
            for (let s = 0; s < 4; s++) {
              const [x, z] = along(-0.6 + s * 0.38, 0.2);
              hbox(x, W + 0.1, z, 0.08, 0.008, 0.16, [0xf2a1a1, 0x9fc4e6, 0xfcea8b, 0xffffff][s], null, [0, L.yaw, 0]);
            }
          } else {
            const [px, pz] = along(0, 0.05);
            cyl(px, W + 0.07, pz, 0.9, 0.012, 0x8fc8cf);
            for (let s = 0; s < 7; s++) {
              const [x, z] = along(-0.35 + rnd() * 0.7, -0.08 + rnd() * 0.26);
              cyl(x, W + 0.082, z, 0.09, 0.006, 0x7f9a6a);
              if (s % 2) sphere(x, W + 0.1, z, 0.03, 0xf2b5c6);
            }
            for (const s of [-0.65, 0.65]) {
              const [x, z] = along(s, -0.05);
              hbox(x, W + 0.15, z, 0.2, 0.025, 0.07, 0xb48560, null, [0, L.yaw, 0]);
            }
          }
          return;
        }
        // paved slab (default) or terrace with fountain
        hbox(L.mx, (ledgeTop + W - 0.12) / 2, L.mz, 1.7, ledgeTop - W + 0.12, 0.64, new THREE.Color(theme.ledge).offsetHSL(0, 0, -0.08).getHex(), null, [0, L.yaw, 0]);
        hbox(L.mx, ledgeTop - 0.01, L.mz, 1.68, 0.03, 0.62, theme.ledge, null, [0, L.yaw, 0]);
        hbox(L.mx + L.dx * 0.31, ledgeTop + 0.03, L.mz + L.dz * 0.31, 1.66, 0.05, 0.03, 0xe4d6c3, null, [0, L.yaw, 0]);
        const seam = new THREE.Color(theme.ledge).offsetHSL(0, 0, -0.06).getHex();
        for (let s = -3; s <= 3; s++) hbox(L.mx + L.tx * s * 0.24, ledgeTop + 0.006, L.mz + L.tz * s * 0.24, 0.012, 0.004, 0.6, seam, null, [0, L.yaw, 0]);
        if (base === "terrace") {
          for (const u of [-0.7, -0.35, 0.35, 0.7]) {
            const [x, z] = along(u, 0.24);
            cyl(x, ledgeTop + 0.3, z, 0.012, 0.6, 0x5a4a3e);
            kit.hbox(x + L.tx * 0.05, ledgeTop + 0.48, z + L.tz * 0.05, 0.1, 0.2, 0.008, [0xdb6a41, 0xfcea8b][Math.abs(u * 10) % 2 > 0.5 ? 1 : 0], null, [0, L.yaw, 0]);
          }
          const [fx, fz] = along(0, 0.02);
          cyl(fx, ledgeTop + 0.03, fz, 0.42, 0.05, 0xe6d8c2);
          cyl(fx, ledgeTop + 0.056, fz, 0.36, 0.01, 0x8fc8cf);
          cyl(fx, ledgeTop + 0.13, fz, 0.05, 0.16, 0xe6d8c2);
          sphere(fx, ledgeTop + 0.22, fz, [0.1, 0.05, 0.1], 0xcfe6e6);
          return;
        }
        hbox(L.mx - L.dx * 0.25, ledgeTop + 0.02, L.mz - L.dz * 0.25, 1.6, 0.04, 0.1, 0x9fb684, null, [0, L.yaw, 0]);
        for (let s = -3; s <= 3; s++) {
          const bx = L.mx + L.tx * (s * 0.23 + 0.05) - L.dx * 0.25,
            bz = L.mz + L.tz * (s * 0.23 + 0.05) - L.dz * 0.25;
          sphere(bx, ledgeTop + 0.07, bz, [0.09, 0.07, 0.08], [0x9cc27a, 0x8db86f, 0xa9c98a][(s + 3) % 3]);
        }
        for (const s of [-0.7, 0, 0.7]) cyl(L.mx + L.tx * s + L.dx * 0.29, ledgeTop + 0.04, L.mz + L.tz * s + L.dz * 0.29, 0.035, 0.06, C.ink);
        if (li % 2 === 0)
          for (let s = 0; s < 7; s++) {
            const u = 0.25 + s * 0.085,
              v = -0.24,
              yTopStep = TOP - (s + 0.5) * ((TOP - ledgeTop) / 7);
            const hgt = Math.max(0.03, yTopStep - ledgeTop);
            hbox(L.mx + L.tx * u + L.dx * v, ledgeTop + hgt / 2, L.mz + L.tz * u + L.dz * v, 0.09, hgt, 0.16, 0xd2c3ad, null, [0, L.yaw, 0]);
          }
      });
      const P = (u, v) => [L.mx + L.tx * u + L.dx * v, L.mz + L.tz * u + L.dz * v];
      if (base === "slab" || base === "playdock") theme.fn({ P, L, y: ledgeTop, li, id: i.id, kit, markers: diplomacyMarkers, helpers: { tree, bush, flowers, lamp, bench, bin, bikeRack, planter, pebble }, rnd, C, ambientSpots, W, nearOther });
    }
    // themed items on top band (unique per island) — around island at band corners
    if (theme.top) theme.top({ c, id: i.id, kit, helpers: { tree, bush, flowers, lamp, bench, bin, bikeRack, planter, pebble }, rnd, C, ambientSpots });
  }

  // ---------- islets (organic, non-hexagonal, decorative) ----------
  const islets = [];
  const isletInfo = [];
  const cc = new THREE.Vector3();
  for (const v of centers.values()) cc.add(v);
  cc.divideScalar(centers.size);
  let tries = 0;
  kit.setIsland(null);
  while (islets.length < 12 && tries++ < 600) {
    // evenly spread around the city (one per 30°), jittered
    const a = (islets.length / 12) * Math.PI * 2 + (rnd() - 0.5) * 0.35,
      r = 10 + rnd() * 4.5;
    const x = cc.x + Math.cos(a) * r * 1.05,
      z = cc.z + Math.sin(a) * r * 0.95;
    if (islandIds.some((o) => Math.hypot(centers.get(o).x - x, centers.get(o).z - z) < R + 2.4)) continue;
    if (islets.some(([ix, iz]) => Math.hypot(ix - x, iz - z) < 3)) continue;
    islets.push([x, z]);
    const s = 0.6 + rnd() * 0.9;
    const theme = ["grove", "lighthouse", "sandbar", "rocks", "teahill", "pavilion", "currentShip", "windmill", "fishhut", "orchardIslet", "rocks", "pavilion"][islets.length - 1];
    isletInfo.push({ x, z, s, theme });
    kit.decor("_islets", "islet:" + theme, () => {
      const sand = theme === "sandbar";
      cyl(x, W + 0.02, z, s * (sand ? 1.6 : 2.2), 0.32, 0xd9c9a3);
      if (!sand) ico(x, W + 0.16, z, [s * 1.9, s * 0.55, s * 1.7], theme === "rocks" ? 0xb7a993 : 0xa9bf8e);
      if (theme === "grove" || theme === "pavilion") for (let k = 0; k < 2 + Math.floor(s * 3); k++) tree(x + (rnd() - 0.5) * s * 1.2, z + (rnd() - 0.5) * s * 1.0, 0.35 + rnd() * 0.3, W + 0.35);
      if (theme === "rocks") for (let k = 0; k < 6; k++) ico(x + (rnd() - 0.5) * s * 1.6, W + 0.25 + rnd() * 0.2, z + (rnd() - 0.5) * s * 1.4, [0.3 + rnd() * 0.3, 0.25 + rnd() * 0.3, 0.3], [0x9c8a7a, 0xb7a993, 0x8f8172][k % 3]);
      if (theme === "lighthouse") {
        cyl(x, W + 0.75, z, 0.32, 1.0, 0xffffff);
        for (let k = 0; k < 3; k++) cyl(x, W + 0.4 + k * 0.32, z, 0.33, 0.1, 0xdb6a41);
        cyl(x, W + 1.32, z, 0.26, 0.16, 0x3e7c8c);
        bulb(x, W + 1.32, z, 0.12, 0xfff0c2);
        lighthouses.push([x, W + 1.32, z]);
        part("cone6", [x, W + 1.5, z], [0.36, 0.22, 0.36], 0xdb6a41);
        tree(x + s * 0.6, z + s * 0.3, 0.4, W + 0.35);
      }
      if (sand) {
        ico(x, W + 0.17, z, [s * 1.5, s * 0.16, s * 1.2], 0xead7a6);
        for (let k = 0; k < 3; k++) reeds(kit, x + (k - 1) * s * 0.45, z - s * 0.35 + (k % 2) * 0.12, W + 0.24, rnd);
        for (let k = 0; k < 3; k++) kit.hbox(x - 0.3 + k * 0.28, W + 0.255, z + s * 0.3, 0.16, 0.01, 0.26, [0xdb6a41, 0x3e7c8c, 0xe8b04a][k], null, [0, 0.2, 0]);
        for (let k = 0; k < 2; k++) {
          cyl(x + (k - 0.5) * 0.5, W + 0.45, z, 0.02, 0.5, 0x8a6a4e);
          part("cone", [x + (k - 0.5) * 0.5, W + 0.68, z], [0.4, 0.14, 0.4], [0xdb6a41, 0xe8c547][k]);
        }
      }
      if (theme === "windmill") {
        for (let k = 0; k < 2; k++) {
          const tx = x + (k - 0.5) * s * 0.9, tz = z + (k - 0.5) * 0.3;
          cyl(tx, W + 0.9, tz, 0.05, 1.3, 0xf6f4ef);
          kit.box(tx, W + 1.55, tz + 0.06, 0.1, 0.08, 0.12, 0xf6f4ef);
          for (let b = 0; b < 3; b++) part("box", [tx, W + 1.55, tz + 0.13], [0.04, 0.62, 0.012], 0xffffff, null, [0, 0, (b * Math.PI * 2) / 3 + k]);
        }
      }
      if (theme === "fishhut") {
        for (let k = 0; k < 2; k++) {
          kit.box(x + (k - 0.5) * 0.6, W + 0.48, z, 0.42, 0.34, 0.36, [0xf4ebdd, 0xe9dcc4][k]);
          part("hip", [x + (k - 0.5) * 0.6, W + 0.78, z], [0.5, 0.26, 0.44], [0x5f9aa6, 0xdb6a41][k]);
        }
        for (let k = 0; k < 4; k++) hbox(x + s * 0.9 + k * 0.28, W + 0.14, z + 0.3, 0.3, 0.04, 0.24, k % 2 ? 0xa77a55 : 0xb48560);
        for (let k = 0; k < 3; k++) cyl(x - s * 0.7 + k * 0.12, W + 0.5, z - 0.4, 0.012, 0.5, 0x8a6a4e);
      }
      if (theme === "orchardIslet") for (let k = 0; k < 5; k++) {
        const ox = x + (k - 2) * 0.32, oz = z + ((k % 2) - 0.5) * 0.4;
        cyl(ox, W + 0.45, oz, 0.035, 0.22, 0x8a6a4e);
        part("leaf", [ox, W + 0.64, oz], [0.3, 0.24, 0.3], [0x8db86f, 0x9cc27a][k % 2]);
        sphere(ox + 0.08, W + 0.62, oz + 0.1, 0.035, 0xf2a33a);
      }
      if (theme === "teahill") for (let r = 0; r < 4; r++) cyl(x, W + 0.3 + r * 0.12, z, s * (1.7 - r * 0.35), 0.1, [0x93ad74, 0x86a26a][r % 2]);
      if (theme === "reeds") for (let k = 0; k < 4; k++) reeds(kit, x + (rnd() - 0.5) * s * 1.4, z + (rnd() - 0.5) * s * 1.2, W + 0.25, rnd);
      if (theme === "currentShip") {
        for (let k = 0; k < 80; k++) rnd(); // 原本的蘆葦小島用掉 80 個亂數；照樣消耗，後面的船、海岸景物位置才不會變
        currentShip(kit, x, z, W, s);
      }
      if (theme === "pavilion") {
        for (const [dx, dz] of [
          [-0.15, -0.15],
          [0.15, -0.15],
          [-0.15, 0.15],
          [0.15, 0.15],
        ])
          cyl(x + dx, W + 0.55, z + dz, 0.025, 0.3, 0xa34e34);
        part("cone6", [x, W + 0.78, z], [0.55, 0.2, 0.55], 0xa34e34);
      }
    });
  }
  // a few boats & buoys in open water
  for (let k = 0; k < 16; k++) {
    const a = (k / 16) * Math.PI * 2 + (rnd() - 0.5) * 0.3,
      r = 9 + rnd() * 6;
    const x = cc.x + Math.cos(a) * r,
      z = cc.z + Math.sin(a) * r;
    if (islandIds.some((o) => Math.hypot(centers.get(o).x - x, centers.get(o).z - z) < R + 1)) continue;
    kit.decor("_islets", "boat", () => boat(kit, x, z, rnd() * 6.28, W, rnd));
  }
  // ---------- A8: coastal scenery all the way round (8 sectors × 3 vignettes) ----------
  const COAST = ["fishingVillage", "pier", "wetland", "beach", "lookout", "seaRocks", "orchard", "floatGarden"];
  const coastStats = Array.from({ length: 8 }, () => ({ types: new Set(), items: 0 }));
  for (let k = 0; k < 24; k++) {
    const a = (k / 24) * Math.PI * 2 + 0.07;
    // march outward to the shoreline of the terrain
    let r = 11, y = -1;
    while (r < 40 && (y = heightAt(cc.x + Math.sin(a) * r, cc.z + Math.cos(a) * r)) < W + 0.12) r += 0.25;
    if (r >= 40) continue;
    const type = COAST[(k * 3 + Math.floor(k / 8)) % COAST.length];
    const dx = Math.sin(a), dz = Math.cos(a);
    const sx = cc.x + dx * r, sz = cc.z + dz * r; // shoreline point
    const yaw = Math.atan2(dx, dz) + Math.PI; // facing the city
    const land = (d) => [cc.x + dx * (r + d), cc.z + dz * (r + d)];
    const sector = Math.floor((((Math.atan2(dx, dz) + Math.PI * 2) % (Math.PI * 2)) / (Math.PI * 2)) * 8) % 8;
    const before = kit.batches ? [...kit.batches.values()].reduce((n, v) => n + v.length, 0) : 0;
    kit.decor("_coast", "coast:" + type, () => {
      const gy = (x, z) => Math.max(W, heightAt(x, z));
      if (type === "fishingVillage") {
        for (let j = 0; j < 4; j++) {
          const [x, z] = land(0.8 + (j % 2) * 0.9);
          const ox = Math.cos(a) * (j - 1.5) * 0.9, oz = -Math.sin(a) * (j - 1.5) * 0.9;
          const yy = gy(x + ox, z + oz);
          box(x + ox, yy + 0.22, z + oz, 0.5, 0.44, 0.42, [0xf4ebdd, 0xe9dcc4, 0xf2e2cf][j % 3], null, [0, yaw, 0]);
          part("hip", [x + ox, yy + 0.59, z + oz], [0.58, 0.3, 0.5], [0xdb6a41, 0xa34e34, 0x5f9aa6][j % 3], null, [0, yaw, 0]);
          glow(x + ox + Math.sin(yaw) * 0.215, yy + 0.24, z + oz + Math.cos(yaw) * 0.215, 0.1, 0.1, 0.01, 0xffe2a8);
        }
        for (let j = 0; j < 2; j++) boat(kit, sx - dx * (0.8 + j * 0.5) + Math.cos(a) * (j - 0.5) * 0.9, sz - dz * (0.8 + j * 0.5) - Math.sin(a) * (j - 0.5) * 0.9, yaw + 1.2, W, rnd, false);
      } else if (type === "pier") {
        for (let j = 0; j < 7; j++) {
          const x = sx - dx * j * 0.32, z = sz - dz * j * 0.32;
          hbox(x, W + 0.16, z, 0.36, 0.05, 0.3, j % 2 ? 0xb48560 : 0xa77a55, null, [0, yaw, 0]);
          if (j % 2 === 0) for (const sd of [-1, 1]) cyl(x + Math.cos(a) * sd * 0.17, W + 0.05, z - Math.sin(a) * sd * 0.17, 0.05, 0.3, 0x7a5d44);
        }
        cyl(sx - dx * 2.2, W + 0.5, sz - dz * 2.2, 0.02, 0.7, 0x211d1d);
        bulb(sx - dx * 2.2, W + 0.88, sz - dz * 2.2, 0.06, 0xfff0c2);
        boat(kit, sx - dx * 2.0 + Math.cos(a) * 0.5, sz - dz * 2.0 - Math.sin(a) * 0.5, yaw + 1.57, W, rnd, true);
      } else if (type === "wetland") {
        for (let j = 0; j < 7; j++) reeds(kit, sx - dx * (0.3 + rnd() * 1.2) + Math.cos(a) * (rnd() - 0.5) * 2.2, sz - dz * (0.3 + rnd() * 1.2) - Math.sin(a) * (rnd() - 0.5) * 2.2, W + 0.02, rnd);
        for (let j = 0; j < 3; j++) {
          const x = sx - dx * (1.2 + j * 0.3), z = sz - dz * (1.2 + j * 0.3) + (j - 1) * 0.4;
          cyl(x, W + 0.12, z, 0.02, 0.16, 0xf6efe3);
          sphere(x, W + 0.24, z, [0.08, 0.06, 0.12], 0xffffff);
        }
        for (let j = 0; j < 4; j++) hbox(sx + dx * 0.2 + Math.cos(a) * (j - 1.5) * 0.3, gy(sx, sz) + 0.06, sz + dz * 0.2 - Math.sin(a) * (j - 1.5) * 0.3, 0.28, 0.03, 0.2, 0xb48560, null, [0, yaw + Math.PI / 2, 0]);
      } else if (type === "beach") {
        ico(sx - dx * 0.2, W + 0.05, sz - dz * 0.2, [1.6, 0.12, 0.9], 0xead7a6);
        for (let j = 0; j < 3; j++) {
          const x = sx + Math.cos(a) * (j - 1) * 0.6, z = sz - Math.sin(a) * (j - 1) * 0.6;
          cyl(x, W + 0.32, z, 0.02, 0.5, 0x8a6a4e);
          part("cone", [x, W + 0.58, z], [0.42, 0.14, 0.42], [0xdb6a41, 0xe8b04a, 0x3e7c8c][j], null);
          hbox(x + 0.18, W + 0.1, z, 0.16, 0.01, 0.3, [0xffffff, 0xf3e2c6, 0xe7a383][j], null, [0, yaw, 0]);
        }
      } else if (type === "lookout") {
        const [x, z] = land(0.9);
        const yy = gy(x, z);
        for (const [ox, oz] of [[-0.2, -0.2], [0.2, -0.2], [-0.2, 0.2], [0.2, 0.2]]) cyl(x + ox, yy + 0.4, z + oz, 0.035, 0.8, 0x8a6a4e);
        hbox(x, yy + 0.82, z, 0.6, 0.05, 0.6, 0xb48560);
        part("cone6", [x, yy + 1.15, z], [0.8, 0.4, 0.8], 0xa34e34);
        for (let j = 0; j < 4; j++) box(x - dx * (0.4 + j * 0.25), gy(x, z) + 0.02, z - dz * (0.4 + j * 0.25), 0.2, 0.04, 0.12, 0xd2c3ad, null, [0, yaw, 0]);
      } else if (type === "seaRocks") {
        for (let j = 0; j < 5; j++) ico(sx - dx * (0.6 + rnd() * 1.4) + Math.cos(a) * (rnd() - 0.5) * 1.8, W + 0.15, sz - dz * (0.6 + rnd() * 1.4) - Math.sin(a) * (rnd() - 0.5) * 1.8, [0.35 + rnd() * 0.35, 0.3 + rnd() * 0.45, 0.35 + rnd() * 0.3], [0x9c8a7a, 0xb7a993, 0x8f8172][j % 3]);
        const [x, z] = [sx - dx * 1.6, sz - dz * 1.6];
        cyl(x, W + 0.45, z, 0.16, 0.7, 0xffffff);
        cyl(x, W + 0.45, z, 0.17, 0.12, 0xdb6a41);
        bulb(x, W + 0.86, z, 0.08, 0xfff0c2);
        lighthouses.push([x, W + 0.86, z]);
      } else if (type === "orchard") {
        for (let j = 0; j < 6; j++) {
          const [x, z] = land(0.8 + (j % 2) * 0.7);
          const ox = Math.cos(a) * (Math.floor(j / 2) - 1) * 0.7, oz = -Math.sin(a) * (Math.floor(j / 2) - 1) * 0.7;
          const yy = gy(x + ox, z + oz);
          cyl(x + ox, yy + 0.12, z + oz, 0.04, 0.24, 0x8a6a4e);
          part("leaf", [x + ox, yy + 0.34, z + oz], [0.32, 0.26, 0.32], [0x8db86f, 0x9cc27a][j % 2]);
          for (let f = 0; f < 3; f++) sphere(x + ox + (rnd() - 0.5) * 0.2, yy + 0.32 + rnd() * 0.08, z + oz + 0.14, 0.035, 0xf2a33a);
        }
      } else if (type === "floatGarden") {
        for (let j = 0; j < 3; j++) {
          const x = sx - dx * (1.0 + j * 0.55) + Math.cos(a) * (j - 1) * 0.5, z = sz - dz * (1.0 + j * 0.55) - Math.sin(a) * (j - 1) * 0.5;
          cyl(x, W + 0.04, z, 0.42, 0.08, 0xb48560);
          for (let f = 0; f < 4; f++) sphere(x + (rnd() - 0.5) * 0.3, W + 0.12, z + (rnd() - 0.5) * 0.3, 0.08, [0xf2b5c6, 0xfcea8b, 0x9cc27a, 0xffffff][f]);
        }
      }
    });
    const after = kit.batches ? [...kit.batches.values()].reduce((n, v) => n + v.length, 0) : 0;
    coastStats[sector].types.add(type);
    coastStats[sector].items += Math.max(1, after - before);
  }
  // islets and boats also count toward their sector
  for (const [x, z] of islets) {
    const sct = Math.floor((((Math.atan2(x - cc.x, z - cc.z) + Math.PI * 2) % (Math.PI * 2)) / (Math.PI * 2)) * 8) % 8;
    coastStats[sct].types.add("islet");
    coastStats[sct].items += 1;
  }
  // route ends: partner-city islets, positions handed to app.js for name tags
  const routeEnds = [];
  const routes = [];
  for (const { P, L } of diplomacyMarkers) {
    for (const [side, k] of [
      [-2.4, 5],
      [2.6, 5],
    ]) {
      const [x, z] = P(side + Math.sin(k * 0.35) * 0.15, 1.3 + k * 0.42);
      // generic partner-city islet (no real landmarks): a small quay and a few blocks
      const which = routeEnds.length; // 0: Seoul-like hill tower, 1: Hoboken-like rowhouses & pier
      kit.decor("_islets", "partnerIslet", () => {
        cyl(x, WATER_Y + 0.02, z, 2.4, 0.3, 0xd9c9a3);
        ico(x, WATER_Y + 0.14, z, [2.1, 0.4, 1.9], 0xa9bf8e);
        if (which % 2 === 0) {
          // green hill with a slender broadcast tower and curved-roof houses (generic, no logos)
          ico(x - 0.15, WATER_Y + 0.4, z - 0.15, [1.1, 0.7, 1.0], 0x8db86f);
          cyl(x - 0.15, WATER_Y + 1.15, z - 0.15, 0.05, 0.9, 0xf2efe8);
          cyl(x - 0.15, WATER_Y + 1.5, z - 0.15, 0.24, 0.14, 0xf2efe8);
          sphere(x - 0.15, WATER_Y + 1.42, z - 0.15, [0.16, 0.08, 0.16], 0xdb6a41);
          cyl(x - 0.15, WATER_Y + 1.75, z - 0.15, 0.02, 0.4, 0xdb6a41);
          for (let b = 0; b < 3; b++) {
            const bx = x + 0.35 + b * 0.18,
              bz = z + 0.35 - b * 0.12;
            box(bx, WATER_Y + 0.42, bz, 0.18, 0.12, 0.14, 0xf4ebdd);
            part("prism", [bx, WATER_Y + 0.53, bz], [0.24, 0.24, 0.1], 0x4a5a6a, null, [Math.PI / 2, 0, Math.PI / 2]);
          }
        } else {
          // brick rowhouses facing a pier, with a riverside walk
          for (let b = 0; b < 5; b++) {
            const bx = x - 0.5 + b * 0.22,
              h = 0.42 + (b % 2) * 0.08;
            box(bx, WATER_Y + 0.3 + h / 2, z - 0.1, 0.2, h, 0.26, [0xa85c46, 0xb8694f, 0x9c5340][b % 3]);
            for (let r = 0; r < 2; r++) glow(bx, WATER_Y + 0.42 + r * 0.16, z + 0.031, 0.06, 0.07, 0.01, 0xfff1c8);
            hbox(bx, WATER_Y + 0.3 + h + 0.02, z - 0.1, 0.22, 0.03, 0.28, 0x5a4a3e);
          }
          for (let s = 0; s < 6; s++) hbox(x - 0.1, WATER_Y + 0.1, z + 0.6 + s * 0.16, 0.3, 0.03, 0.14, s % 2 ? 0xa77a55 : 0xb48560);
        }
        tree(x - 0.75, z + 0.45, 0.32, WATER_Y + 0.3);
        tree(x + 0.8, z - 0.45, 0.3, WATER_Y + 0.3);
        cyl(x + 0.6, WATER_Y + 0.55, z + 0.55, 0.02, 0.5, 0x211d1d);
        part("prism", [x + 0.7, WATER_Y + 0.72, z + 0.55], [0.18, 0.2, 0.02], 0x3e7c8c, null, [0, 0, -Math.PI / 2]);
      });
      routeEnds.push([x, z]);
      const cv = seaCurve(P, which);
      routes.push({ start: cv.start, ctrl: cv.ctrl, end: cv.end, islet: [x, z] });
    }
  }
  // string lights along every island's outer edge (night only; drawn by app.js)
  for (const i of D.islands) {
    const c = centers.get(i.id);
    for (let e = 0; e < 6; e++) {
      const [ax, az] = hexVertex(c.x, c.z, R - 0.02, e),
        [bx, bz] = hexVertex(c.x, c.z, R - 0.02, e + 1);
      for (let s2 = 0; s2 < 8; s2++) {
        const t = (s2 + 0.5) / 8;
        stringLights.push([ax + (bx - ax) * t, TOP + 0.3 - Math.sin(t * Math.PI * 4) * 0.025, az + (bz - az) * t]);
      }
    }
  }
  return { islets: isletInfo, lighthouses, stringLights, ambientSpots, ledgeInfo, lampSpots, routeEnds, routes, coastStats: coastStats.map((c) => ({ types: [...c.types], items: c.items })) };
}

function canalFeature(kit, kind, x, z, yaw, rnd) {
  const W = WATER_Y;
  switch (kind) {
    case "lily":
      for (let k = 0; k < 3; k++) kit.cyl(x + (rnd() - 0.5) * 0.18, W + 0.008, z + (rnd() - 0.5) * 0.18, 0.08, 0.008, 0x7f9a6a);
      kit.sphere(x, W + 0.025, z, 0.03, 0xf2b5c6);
      break;
    case "stones":
      for (let k = 0; k < 3; k++) kit.cyl(x + Math.sin(yaw) * (k - 1) * 0.1, W + 0.03, z + Math.cos(yaw) * (k - 1) * 0.1, 0.08, 0.05, 0xb7a993);
      break;
    case "barge":
      kit.box(x, W + 0.03, z, 0.14, 0.05, 0.24, 0xe6d8c2, null, [0, yaw, 0]);
      kit.sphere(x, W + 0.09, z, [0.1, 0.07, 0.18], 0xf2b5c6);
      break;
    case "duck":
      kit.sphere(x, W + 0.03, z, [0.07, 0.045, 0.1], 0xfff8f0);
      kit.sphere(x, W + 0.075, z + 0.04, 0.035, 0xfff8f0);
      kit.hbox(x, W + 0.075, z + 0.075, 0.02, 0.012, 0.03, 0xf2a33a);
      break;
    case "raft":
      kit.box(x, W + 0.02, z, 0.18, 0.03, 0.14, 0xb48560, null, [0, yaw, 0]);
      kit.ico(x, W + 0.06, z, [0.07, 0.05, 0.07], 0x8fb37a);
      break;
    case "kayak":
      kit.sphere(x, W + 0.02, z, [0.05, 0.03, 0.22], 0xdb6a41);
      kit.hbox(x, W + 0.05, z, 0.16, 0.006, 0.012, 0x3b3a42, null, [0, yaw + 0.6, 0]);
      break;
    case "paperboat":
      kit.part("prism", [x, W + 0.03, z], [0.08, 0.05, 0.1], 0xffffff, null, [0, yaw, Math.PI]);
      kit.part("tetra", [x, W + 0.06, z], [0.05, 0.05, 0.05], 0xfffdf6, null, [0, yaw, 0]);
      break;
    case "lantern":
      kit.cyl(x, W + 0.012, z, 0.08, 0.012, 0xb48560);
      kit.glow(x, W + 0.05, z, 0.05, 0.06, 0.05, 0xffb36b);
      break;
    case "buoy":
      kit.cyl(x, W + 0.04, z, 0.06, 0.08, 0xdb6a41);
      kit.cyl(x, W + 0.08, z, 0.06, 0.015, 0xffffff);
      break;
    case "ferry":
      kit.box(x, W + 0.03, z, 0.1, 0.05, 0.22, 0xf2efe8, null, [0, yaw, 0]);
      kit.box(x, W + 0.075, z, 0.07, 0.04, 0.1, 0x3e7c8c, null, [0, yaw, 0]);
      break;
    case "boom":
      for (let k = 0; k < 4; k++) kit.cyl(x + Math.sin(yaw) * (k - 1.5) * 0.06, W + 0.015, z + Math.cos(yaw) * (k - 1.5) * 0.06, 0.04, 0.03, k % 2 ? 0xf2a33a : 0xffffff);
      break;
  }
}
// A10: shared geometry for the diplomacy sea routes (pier head → partner-islet quay)
const ISLET_SIDES = [-2.4, 2.6],
  PIER_SIDES = [0.05, 0.35];
export function seaCurve(P, k) {
  const start = P(PIER_SIDES[k], 0.8);
  const isl = P(ISLET_SIDES[k] + Math.sin(5 * 0.35) * 0.15, 1.3 + 5 * 0.42);
  const dx = start[0] - isl[0],
    dz = start[1] - isl[1],
    dl = Math.hypot(dx, dz);
  const end = [isl[0] + (dx / dl) * 1.25, isl[1] + (dz / dl) * 1.25];
  const out = P(PIER_SIDES[k] + (ISLET_SIDES[k] - PIER_SIDES[k]) * 0.35, 2.2);
  return { start, ctrl: out, end, islet: isl };
}
export function bez(c, t) {
  const u = 1 - t;
  return [u * u * c.start[0] + 2 * u * t * c.ctrl[0] + t * t * c.end[0], u * u * c.start[1] + 2 * u * t * c.ctrl[1] + t * t * c.end[1]];
}
function boat(kit, x, z, yaw, W, rnd, sail = true) {
  const col = [0xffffff, 0xdb6a41, 0x3e7c8c][Math.floor(rnd() * 3)];
  kit.box(x, W + 0.05, z, 0.16, 0.08, 0.42, col, null, [0, yaw, 0]);
  kit.hbox(x, W + 0.095, z, 0.12, 0.012, 0.34, 0xb48560, null, [0, yaw, 0]);
  if (sail) {
    kit.cyl(x, W + 0.32, z, 0.012, 0.48, 0x5a4a3e);
    kit.part("prism", [x + Math.sin(yaw) * 0.04, W + 0.32, z + Math.cos(yaw) * 0.04], [0.26, 0.42, 0.01], 0xfff8f0, null, [0, yaw + Math.PI / 2, 0]);
  }
}
// 2026-10-25：「洋流號」宣傳車（原本空白的蘆葦小島）：橘色皮卡改裝成木船——船身木板、麻繩飾邊、救生圈、甲板上的船舵、
// 車頂兩支大聲公；後方是紅底白浪的舞台背板、兩支紅色長旗與紅白三角旗串
function currentShip(kit, x, z, W, s) {
  const { box, hbox, cyl, sphere, part } = kit;
  const G = W + 0.52; // 小島頂上鋪平的廣場高度
  cyl(x, G - 0.03, z + 0.1, s * 1.55, 0.06, 0xe6d6b6); // 鋪平的沙色廣場
  const ox = x - 0.05, oz = z + 0.25; // 車子中心（稍微往鏡頭這側）
  const ORANGE = 0xd9773f, WOOD = 0xb5774a, WOOD2 = 0x9f6a42, ROPE = 0xe9d8b4, DARK = 0x2a2524, GLASS = 0x3b4652, WHITE = 0xf6f4ef, RED = 0xd8442f;
  // 車輪與白色輪拱
  for (const dx of [-0.32, 0.31])
    for (const dz of [-0.21, 0.21]) {
      cyl(ox + dx, G + 0.11, oz + dz, 0.22, 0.09, DARK, null, [Math.PI / 2, 0, 0]);
      cyl(ox + dx, G + 0.11, oz + dz * 1.03, 0.1, 0.095, 0xcfd3d6, null, [Math.PI / 2, 0, 0]);
      hbox(ox + dx, G + 0.235, oz + dz * 1.02, 0.27, 0.035, 0.06, WHITE);
    }
  // 底盤與車身：車頭橘色烤漆，後段（貨斗）包成木船
  box(ox, G + 0.25, oz, 1.0, 0.17, 0.44, ORANGE);
  box(ox + 0.33, G + 0.37, oz, 0.34, 0.09, 0.42, ORANGE); // 引擎蓋
  hbox(ox + 0.505, G + 0.27, oz, 0.02, 0.12, 0.36, 0x3a3533); // 水箱罩
  for (const dz of [-0.15, 0.15]) hbox(ox + 0.51, G + 0.33, oz + dz, 0.015, 0.035, 0.07, 0xfffbe8); // 頭燈
  hbox(ox + 0.515, G + 0.2, oz, 0.025, 0.05, 0.44, 0x4a4a4e); // 保險桿
  box(ox + 0.02, G + 0.46, oz, 0.42, 0.2, 0.42, ORANGE); // 駕駛艙
  for (const sz of [-1, 1]) hbox(ox + 0.03, G + 0.48, oz + sz * 0.212, 0.34, 0.1, 0.006, GLASS); // 側窗
  hbox(ox + 0.235, G + 0.47, oz, 0.006, 0.12, 0.36, GLASS, null, [0, 0, -0.35]); // 擋風玻璃
  // 木船船身：貨斗兩側與尾端的木板、麻繩飾邊、船首往前延伸到車門
  for (const sz of [-1, 1]) {
    for (let k = 0; k < 3; k++) hbox(ox - 0.25, G + 0.3 + k * 0.065, oz + sz * 0.226, 0.52, 0.058, 0.012, k % 2 ? WOOD2 : WOOD);
    hbox(ox, G + 0.29, oz + sz * 0.229, 1.0, 0.018, 0.012, ROPE); // 麻繩飾邊
    hbox(ox - 0.25, G + 0.5, oz + sz * 0.229, 0.52, 0.016, 0.014, ROPE);
  }
  for (let k = 0; k < 3; k++) hbox(ox - 0.506, G + 0.3 + k * 0.065, oz, 0.012, 0.058, 0.46, k % 2 ? WOOD2 : WOOD); // 船尾
  // 救生圈（面向鏡頭的那一側）
  part("torus", [ox - 0.38, G + 0.4, oz + 0.245], [0.15, 0.15, 0.3], 0xff6b3d);
  for (const a of [0, Math.PI / 2, Math.PI, Math.PI * 1.5]) hbox(ox - 0.38 + Math.cos(a) * 0.072, G + 0.4 + Math.sin(a) * 0.072, oz + 0.247, 0.026, 0.026, 0.02, WHITE, null, [0, 0, a]);
  // 舷窗（船尾側邊的小圓窗）
  cyl(ox - 0.47, G + 0.4, oz + 0.235, 0.06, 0.01, 0xe9e2d0, null, [Math.PI / 2, 0, 0]);
  // 甲板與欄杆
  hbox(ox - 0.25, G + 0.52, oz, 0.54, 0.025, 0.46, 0xc9a274);
  for (const dx of [-0.5, -0.33, -0.16, 0]) for (const sz of [-1, 1]) cyl(ox + dx, G + 0.6, oz + sz * 0.22, 0.016, 0.14, 0xe9e2d0);
  for (const sz of [-1, 1]) hbox(ox - 0.25, G + 0.67, oz + sz * 0.22, 0.52, 0.015, 0.015, 0xe9e2d0);
  // 船舵：木製舵輪立在甲板前端
  cyl(ox - 0.08, G + 0.6, oz, 0.03, 0.14, 0x8a5a36);
  part("torus", [ox - 0.06, G + 0.72, oz], [0.18, 0.18, 0.5], 0x8a5a36, null, [0, Math.PI / 2, 0]);
  for (let k = 0; k < 4; k++) hbox(ox - 0.06, G + 0.72, oz, 0.012, 0.19, 0.012, 0x8a5a36, null, [(k * Math.PI) / 4, 0, 0]);
  // 車頂兩支大聲公與架子
  hbox(ox + 0.02, G + 0.575, oz, 0.08, 0.02, 0.36, DARK);
  for (const sz of [-1, 1]) {
    hbox(ox + 0.06, G + 0.62, oz + sz * 0.15, 0.1, 0.075, 0.08, 0x1f1d1f);
    part("cone", [ox + 0.13, G + 0.62, oz + sz * 0.15], [0.07, 0.06, 0.07], 0x1f1d1f, null, [0, 0, -Math.PI / 2]);
  }
  // 車牌
  hbox(ox + 0.52, G + 0.2, oz, 0.01, 0.04, 0.09, 0xfff1de);
  // 後方舞台背板：紅底、白色浪花、兩側紅色長旗
  const bz = z - 0.75;
  box(x, G + 0.42, bz, 1.9, 0.8, 0.05, RED);
  for (let k = 0; k < 6; k++) sphere(x - 0.8 + k * 0.32, G + 0.1, bz + 0.035, [0.34, 0.16, 0.05], WHITE); // 底部浪花
  for (let k = 0; k < 3; k++) sphere(x + 0.45 + k * 0.13, G + 0.32 + k * 0.1, bz + 0.035, [0.2 - k * 0.04, 0.09, 0.05], WHITE); // 捲起的大浪
  hbox(x, G + 0.84, bz + 0.03, 1.9, 0.025, 0.02, WHITE); // 背板上緣白條
  for (const sx of [-1, 1]) {
    cyl(x + sx * 1.02, G + 0.55, bz + 0.05, 0.03, 1.1, 0xdcdcdc);
    hbox(x + sx * 1.02 - sx * 0.09, G + 0.68, bz + 0.07, 0.16, 0.6, 0.012, RED);
    for (let k = 0; k < 3; k++) hbox(x + sx * 1.02 - sx * 0.09, G + 0.86 - k * 0.15, bz + 0.078, 0.07, 0.07, 0.006, WHITE); // 長旗上的白字塊
  }
  // 紅白三角旗串：從兩支旗桿拉到背板中間，微微下垂
  for (const sx of [-1, 1])
    for (let k = 0; k < 7; k++) {
      const t = (k + 0.5) / 7, px = x + sx * (1.02 - t * 1.02), py = G + 1.08 - Math.sin(t * Math.PI) * 0.1;
      part("tetra", [px, py, bz + 0.12], [0.07, 0.09, 0.015], k % 2 ? WHITE : RED, null, [Math.PI, 0, 0]);
    }
  for (const sx of [-1, 1]) hbox(x + sx * 0.51, G + 1.11, bz + 0.12, 1.02, 0.006, 0.006, 0x8a8a8a, null, [0, 0, sx * 0.1]);
}
function reeds(kit, x, z, W, rnd) {
  for (let k = 0; k < 6; k++) kit.cyl(x + (rnd() - 0.5) * 0.3, W + 0.12, z + (rnd() - 0.5) * 0.3, 0.012, 0.22 + rnd() * 0.12, 0x9cae6e);
  kit.ico(x, W + 0.02, z, [0.28, 0.03, 0.24], 0x93ab76);
}
function egret(kit, x, z, W) {
  kit.sphere(x, W + 0.12, z, [0.06, 0.05, 0.1], 0xffffff);
  kit.cyl(x, W + 0.05, z, 0.008, 0.1, 0x2a2524);
  kit.sphere(x, W + 0.2, z + 0.05, 0.03, 0xffffff);
  kit.hbox(x, W + 0.2, z + 0.085, 0.008, 0.008, 0.04, 0xe8c547);
}
function lily(kit, x, z, W, rnd) {
  for (let k = 0; k < 4; k++) kit.cyl(x + (rnd() - 0.5) * 0.4, W + 0.01, z + (rnd() - 0.5) * 0.4, 0.09, 0.01, 0x7f9a6a);
  kit.sphere(x, W + 0.03, z, 0.035, 0xf2b5c6);
}
function buoy(kit, x, z, W) {
  kit.cyl(x, W + 0.05, z, 0.07, 0.1, 0xdb6a41);
  kit.cyl(x, W + 0.1, z, 0.07, 0.02, 0xffffff);
}

// Themed surroundings: fn() decorates each waterfront ledge; top() adds island-unique band pieces.
// Every item is scenic and must not be read as a policy facility.
const THEMES = {
  // 客家政策 (2026-10-20): tung-blossom trees and an indigo cloth line along the waterfront; elders and kids on the ledge
  hakka: {
    ledge: 0xd9b08c,
    fn({ P, y, kit, helpers: h, L, li, ambientSpots }) {
      kit.decor("hakka", "v:tungTrees", () => {
        for (const u of [-0.55, 0.55]) {
          const [x, z] = P(u, 0.02);
          kit.cyl(x, y + 0.12, z, 0.03, 0.24, 0x7a5c42);
          kit.ico(x, y + 0.3, z, [0.24, 0.16, 0.24], 0x8fae7a);
          for (let k = 0; k < 6; k++) kit.sphere(x + Math.cos(k) * 0.09, y + 0.37 + (k % 2) * 0.03, z + Math.sin(k) * 0.09, 0.035, 0xfbf6ee);
        }
      });
      if (li % 2 === 0)
        kit.decor("hakka", "v:clothLine", () => {
          const [x, z] = P(0, -0.05);
          for (const d of [-0.22, 0.22]) kit.cyl(x + L.tx * d, y + 0.13, z + L.tz * d, 0.012, 0.26, 0x7a5c42);
          kit.hbox(x, y + 0.255, z, 0.46, 0.006, 0.006, 0x211d1d, null, [0, L.yaw, 0]);
          for (let k = 0; k < 3; k++) {
            const [cx, cz] = P(-0.13 + k * 0.13, -0.05);
            kit.hbox(cx, y + 0.2, cz, 0.1, 0.1, 0.008, [0x3f5a8a, 0xd76b8a, 0x3f5a8a][k], null, [0, L.yaw, 0]);
          }
        });
      else {
        const [x, z] = P(0.1, 0.05);
        h.bench(x, z, L.yaw, y);
        kit.decor("hakka", "v:bambooBaskets", () => {
          for (let k = 0; k < 3; k++) {
            const [bx, bz] = P(-0.28 + k * 0.1, -0.08);
            kit.cyl(bx, y + 0.035, bz, 0.08, 0.07, [0xc9b27a, 0xb89f68, 0xc9b27a][k]);
            kit.ico(bx, y + 0.08, bz, [0.06, 0.03, 0.06], [0x8fae7a, 0xe8c547, 0xd76b8a][k]);
          }
        });
      }
      kit.decor("hakka", "v:lanternPost", () => {
        const [x, z] = P(0.32, -0.12);
        kit.cyl(x, y + 0.16, z, 0.014, 0.32, 0x7a5c42);
        kit.hbox(x, y + 0.31, z, 0.12, 0.012, 0.012, 0x7a5c42, null, [0, L.yaw, 0]);
        kit.sphere(x, y + 0.26, z, [0.07, 0.09, 0.07], 0xd76b4a);
        kit.bulb(x, y + 0.26, z, 0.03);
      });
    },
  },
  civil: {
    ledge: 0xd9cbb4,
    fn({ P, L, y, kit, helpers: h, rnd }) {
      for (let u = -0.6; u <= 0.61; u += 0.3) kit.decor("civil", "v:streetTree", () => h.tree(...P(u, 0.1), 0.24, y));
      kit.decor("civil", "v:coffeeCart", () => {
        const [x, z] = P(0.15, -0.08);
        kit.box(x, y + 0.09, z, 0.2, 0.14, 0.12, 0xdb6a41);
        kit.hbox(x, y + 0.2, z, 0.24, 0.02, 0.16, 0xfff1de);
        for (const d of [-0.07, 0.07]) kit.part("torus", [x + d, y + 0.03, z + 0.06], [0.05, 0.05, 0.05], 0x211d1d);
      });
      kit.decor("civil", "v:bikeRack", () => h.bikeRack(...P(-0.35, -0.12), L.yaw, y));
      kit.decor("civil", "v:bench", () => h.bench(...P(0.5, -0.12), L.yaw, y));
    },
    top({ c, kit, helpers: h, ambientSpots }) {
      ambientSpots.push({ role: "officeworker", island: "civil", pos: [c.x - 0.15, 0, c.z + 0.28], yaw: 0.4 });
      ambientSpots.push({ role: "officeworker", island: "civil", pos: [c.x + 0.2, 0, c.z + 0.3], yaw: -0.6 });
    },
  },
  institute: {
    ledge: 0xcfd8d3,
    fn({ P, y, kit, helpers: h, rnd }) {
      kit.decor("institute", "v:greenhouse", () => {
        const [x, z] = P(-0.45, 0);
        kit.box(x, y + 0.12, z, 0.34, 0.24, 0.22, 0xd5ecee);
        kit.part("prism", [x, y + 0.29, z], [0.24, 0.34, 0.24], 0xbfe0e2, null, [0, 0, Math.PI / 2]);
        for (let k = 0; k < 3; k++) kit.ico(x - 0.1 + k * 0.1, y + 0.05, z, [0.07, 0.06, 0.07], 0x7f9a6a);
      });
      kit.decor("institute", "v:readingTable", () => {
        const [x, z] = P(0.25, -0.05);
        kit.cyl(x, y + 0.1, z, 0.22, 0.02, 0xb48560);
        kit.cyl(x, y + 0.05, z, 0.03, 0.1, 0x211d1d);
        kit.hbox(x + 0.03, y + 0.115, z, 0.08, 0.01, 0.06, 0xffffff);
      });
      kit.decor("institute", "v:sensorPole", () => {
        const [x, z] = P(0.6, 0.1);
        kit.cyl(x, y + 0.25, z, 0.018, 0.5, 0x211d1d);
        kit.box(x, y + 0.48, z, 0.08, 0.06, 0.08, 0x3e7c8c);
        kit.bulb(x, y + 0.53, z, 0.03, 0x9fffd0);
      });
      for (const u of [-0.7, 0.0]) kit.decor("institute", "v:bush", () => h.bush(...P(u, 0.18), 0.08, y));
    },
  },
  renewal: {
    ledge: 0xc7b08f,
    fn({ P, y, kit, helpers: h, rnd, ambientSpots, L, li }) {
      kit.decor("renewal", "v:communityGarden", () => {
        for (let k = 0; k < 4; k++) {
          const [x, z] = P(-0.6 + k * 0.4, -0.12);
          kit.box(x, y + 0.04, z, 0.3, 0.07, 0.16, 0xb48560);
          kit.ico(x, y + 0.1, z, [0.26, 0.07, 0.13], [0x8fb37a, 0xa9c47f, 0xf2b5c6, 0x9cc27a][k]);
        }
      });
      kit.decor("renewal", "v:shadeCanopy", () => {
        const [x, z] = P(0.35, 0.12);
        for (const d of [-0.2, 0.2]) kit.cyl(x + L.tx * d, y + 0.15, z + L.tz * d, 0.015, 0.3, 0x211d1d);
        kit.box(x, y + 0.31, z, 0.5, 0.03, 0.24, 0xf2a33a, null, [0, L.yaw, 0]);
        kit.hbox(x, y + 0.07, z, 0.4, 0.03, 0.08, 0xb48560, null, [0, L.yaw, 0]);
      });
      if (li === 0)
        for (const [u, v] of [
          [0.25, 0.1],
          [0.45, 0.14],
          [-0.3, 0.12],
        ]) {
          const [x, z] = P(u, v);
          ambientSpots.push({ role: "officeworker", island: "renewal", pos: [x, y + 0.02, z], yaw: L.yaw + Math.PI });
        }
      for (let k = 0; k < 4; k++) kit.decor("renewal", "v:cone", () => {
        const [x, z] = P(-0.6 + k * 0.4, 0.15);
        kit.part("cone", [x, y + 0.06, z], [0.07, 0.12, 0.07], 0xf2a33a);
        kit.cyl(x, y + 0.07, z, 0.045, 0.015, 0xffffff);
      });
      kit.decor("renewal", "v:boxes", () => {
        for (let k = 0; k < 4; k++) {
          const [x, z] = P(0.3 + (k % 2) * 0.14, -0.08 + Math.floor(k / 2) * 0.12);
          kit.box(x, y + 0.05 + Math.floor(k / 2) * 0.0, z, 0.12, 0.1, 0.1, 0xc9a27a);
        }
      });
      kit.decor("renewal", "v:coveredWalk", () => {
        const [x, z] = P(-0.25, -0.12);
        for (const d of [-0.2, 0.2]) kit.cyl(x + d, y + 0.12, z, 0.015, 0.24, 0x211d1d);
        kit.hbox(x, y + 0.25, z, 0.5, 0.02, 0.16, 0xf2a33a);
      });
    },
  },
  transport: {
    ledge: 0x9c9690,
    fn({ P, y, kit, helpers: h, L }) {
      kit.decor("transport", "v:bikeLane", () => {
        const [x, z] = P(0, 0.05);
        kit.hbox(x, y + 0.012, z, 1.6, 0.012, 0.2, 0x7aa58f, null, [0, L.yaw, 0]);
        for (let k = 0; k < 6; k++) {
          const [x2, z2] = P(-0.7 + k * 0.28, 0.05);
          kit.hbox(x2, y + 0.02, z2, 0.1, 0.004, 0.012, 0xffffff, null, [0, L.yaw, 0]);
        }
      });
      kit.decor("transport", "v:youbike", () => {
        for (let k = 0; k < 3; k++) {
          const [x, z] = P(0.45 + k * 0.1, -0.15);
          for (const d of [-0.04, 0.04]) kit.part("torus", [x, y + 0.05, z + d], [0.08, 0.08, 0.08], 0x211d1d, null, [0, L.yaw + Math.PI / 2, 0]);
          kit.hbox(x, y + 0.07, z, 0.01, 0.01, 0.1, 0xe8c547, null, [0, L.yaw, 0]);
        }
      });
      kit.decor("transport", "v:busSign", () => {
        const [x, z] = P(-0.6, -0.15);
        kit.cyl(x, y + 0.2, z, 0.015, 0.4, 0x211d1d);
        kit.box(x, y + 0.38, z, 0.12, 0.1, 0.02, 0xdb6a41, null, [0, L.yaw, 0]);
      });
      kit.decor("transport", "v:leveeSteps", () => {
        for (let s = 0; s < 3; s++) {
          const [x, z] = P(-0.2, 0.22 + s * 0.05);
          kit.hbox(x, y - s * 0.06, z, 0.5, 0.05, 0.06, 0xd2c3ad, null, [0, L.yaw, 0]);
        }
      });
    },
  },
  education: {
    ledge: 0xd9cbb4,
    fn({ P, y, kit, helpers: h, L }) {
      kit.decor("education", "v:track", () => {
        const [x, z] = P(0, 0.02);
        kit.hbox(x, y + 0.01, z, 1.5, 0.012, 0.36, 0xc8775a, null, [0, L.yaw, 0]);
        for (const v of [-0.08, 0.08]) {
          const [x2, z2] = P(0, 0.02 + v);
          kit.hbox(x2, y + 0.018, z2, 1.5, 0.004, 0.008, 0xffffff, null, [0, L.yaw, 0]);
        }
      });
      kit.decor("education", "v:schoolWall", () => {
        for (let k = 0; k < 6; k++) {
          const [x, z] = P(-0.7 + k * 0.28, -0.25);
          kit.box(x, y + 0.07, z, 0.25, 0.14, 0.04, k % 2 ? 0xe8c547 : 0xf2efe8, null, [0, L.yaw, 0]);
        }
      });
      for (const u of [-0.5, 0.5]) kit.decor("education", "v:flowerBed", () => h.flowers(...P(u, 0.24), y));
    },
  },
  lunch: {
    ledge: 0x9c7a5a,
    fn({ P, y, kit, L, rnd }) {
      for (let r = 0; r < 3; r++)
        kit.decor("lunch", "v:vegRows", () => {
          const [x, z] = P(-0.25, -0.15 + r * 0.15);
          kit.hbox(x, y + 0.02, z, 0.9, 0.04, 0.08, 0x7a5a42, null, [0, L.yaw, 0]);
          for (let k = 0; k < 6; k++) {
            const [x2, z2] = P(-0.65 + k * 0.16, -0.15 + r * 0.15);
            kit.ico(x2, y + 0.07, z2, [0.07, 0.06, 0.07], [0x8fb37a, 0x7f9a6a, 0xa9c47f][r]);
          }
        });
      kit.decor("lunch", "v:rainBarrel", () => {
        const [x, z] = P(0.45, 0.1);
        kit.cyl(x, y + 0.08, z, 0.1, 0.16, 0x3e7c8c);
      });
      kit.decor("lunch", "v:bambooFence", () => {
        for (let k = 0; k < 7; k++) {
          const [x, z] = P(0.35 + k * 0.05, -0.2);
          kit.cyl(x, y + 0.09, z, 0.014, 0.18, 0xc9b27a);
        }
      });
    },
  },
  family: {
    ledge: 0xdcc7a8,
    fn({ P, y, kit, L }) {
      kit.decor("family", "v:slide", () => {
        const [x, z] = P(-0.4, 0);
        kit.box(x, y + 0.14, z, 0.12, 0.28, 0.12, 0xe8c547);
        kit.part("box", [x + L.tx * 0.16, y + 0.13, z + L.tz * 0.16], [0.08, 0.02, 0.34], 0xdb6a41, null, [0.55, L.yaw + Math.PI / 2, 0]);
      });
      kit.decor("family", "v:swing", () => {
        const [x, z] = P(0.15, 0);
        for (const d of [-0.12, 0.12]) kit.cyl(x + L.tx * d, y + 0.15, z + L.tz * d, 0.015, 0.3, 0x58a6a6);
        kit.hbox(x, y + 0.3, z, 0.28, 0.02, 0.02, 0x58a6a6, null, [0, L.yaw, 0]);
        kit.hbox(x, y + 0.08, z, 0.08, 0.012, 0.05, 0xdb6a41, null, [0, L.yaw, 0]);
      });
      kit.decor("family", "v:sandbox", () => {
        const [x, z] = P(0.55, 0.05);
        kit.box(x, y + 0.03, z, 0.26, 0.06, 0.26, 0xb48560);
        kit.hbox(x, y + 0.055, z, 0.22, 0.01, 0.22, 0xead7a6);
      });
      kit.decor("family", "v:laundry", () => {
        const [x, z] = P(-0.7, 0.15);
        for (const d of [-0.1, 0.1]) kit.cyl(x + L.tx * d, y + 0.12, z + L.tz * d, 0.01, 0.24, 0x211d1d);
        for (let k = 0; k < 3; k++) kit.hbox(x + L.tx * (-0.06 + k * 0.06), y + 0.18, z + L.tz * (-0.06 + k * 0.06), 0.04, 0.07, 0.005, [0xf2a1a1, 0xffffff, 0x9fc4e6][k], null, [0, L.yaw, 0]);
      });
    },
  },
  card: {
    ledge: 0xdcb79a,
    fn({ P, y, kit, L }) {
      kit.decor("card", "v:bookCart", () => {
        const [x, z] = P(-0.4, 0);
        kit.box(x, y + 0.08, z, 0.26, 0.08, 0.12, 0xb48560, null, [0, L.yaw, 0]);
        for (let k = 0; k < 5; k++) kit.hbox(x + L.tx * (-0.09 + k * 0.045), y + 0.16, z + L.tz * (-0.09 + k * 0.045), 0.03, 0.09, 0.08, [0xdb6a41, 0xe8c547, 0x58a6a6, 0x6f7fb5, 0xf2a1a1][k], null, [0, L.yaw, 0]);
      });
      kit.decor("card", "v:posterColumn", () => {
        const [x, z] = P(0.1, -0.1);
        kit.cyl(x, y + 0.22, z, 0.1, 0.44, 0xf2efe8);
        kit.cyl(x, y + 0.3, z, 0.105, 0.16, 0xdb6a41);
        kit.part("cone", [x, y + 0.48, z], [0.14, 0.08, 0.14], 0x211d1d);
      });
      kit.decor("card", "v:pool", () => {
        const [x, z] = P(0.55, 0.05);
        kit.box(x, y + 0.03, z, 0.4, 0.06, 0.26, 0xf2efe8, null, [0, L.yaw, 0]);
        kit.hbox(x, y + 0.062, z, 0.34, 0.006, 0.2, 0x7fc8d6, null, [0, L.yaw, 0]);
      });
    },
  },
  welfare: {
    ledge: 0xc9d1b4,
    fn({ P, y, kit, helpers: h, L }) {
      kit.decor("welfare", "v:communityGarden", () => {
        for (let k = 0; k < 3; k++) {
          const [x, z] = P(-0.55 + k * 0.22, 0);
          kit.box(x, y + 0.05, z, 0.18, 0.1, 0.18, 0xb48560);
          kit.ico(x, y + 0.12, z, [0.15, 0.08, 0.15], [0x8fb37a, 0xd9c6f0, 0xfcea8b][k]);
        }
      });
      kit.decor("welfare", "v:handrailPath", () => {
        const [x, z] = P(0.3, 0.15);
        kit.hbox(x, y + 0.012, z, 0.7, 0.01, 0.12, 0xd9cbb4, null, [0, L.yaw, 0]);
        kit.hbox(x, y + 0.12, z + 0, 0.7, 0.012, 0.012, 0x3e7c8c, null, [0, L.yaw, 0]);
        for (let k = 0; k < 4; k++) {
          const [x2, z2] = P(0.0 + k * 0.2, 0.15);
          kit.cyl(x2, y + 0.06, z2, 0.012, 0.12, 0x3e7c8c);
        }
      });
      kit.decor("welfare", "v:shelter", () => {
        const [x, z] = P(0.55, -0.15);
        for (const d of [-0.12, 0.12]) kit.cyl(x + L.tx * d, y + 0.13, z + L.tz * d, 0.015, 0.26, 0x211d1d);
        kit.box(x, y + 0.27, z, 0.34, 0.03, 0.14, 0x7aa58f, null, [0, L.yaw, 0]);
        h.bench(x, z, L.yaw, y);
      });
    },
  },
  sport: {
    ledge: 0xa9bf8e,
    fn({ P, y, kit, L, rnd, W }) {
      kit.decor("sport", "v:joggingTrack", () => {
        const [x, z] = P(0, 0.1);
        kit.hbox(x, y + 0.01, z, 1.55, 0.012, 0.16, 0xc8775a, null, [0, L.yaw, 0]);
      });
      kit.decor("sport", "v:bleachers", () => {
        for (let s = 0; s < 3; s++) {
          const [x, z] = P(-0.4, -0.12 - s * 0.06);
          kit.box(x, y + 0.04 + s * 0.05, z, 0.5, 0.05, 0.07, [0xdb6a41, 0xf2efe8, 0x3e7c8c][s], null, [0, L.yaw, 0]);
        }
      });
      kit.decor("sport", "v:goal", () => {
        const [x, z] = P(0.5, -0.1);
        for (const d of [-0.1, 0.1]) kit.cyl(x + L.tx * d, y + 0.07, z + L.tz * d, 0.012, 0.14, 0xffffff);
        kit.hbox(x, y + 0.14, z, 0.22, 0.012, 0.012, 0xffffff, null, [0, L.yaw, 0]);
      });
      // wetland with egrets beyond the ledge (Guandu-like)
      for (let k = 0; k < 3; k++) kit.decor("sport", "v:wetland", () => reeds(kit, ...P(-0.6 + k * 0.6, 0.65 + (k % 2) * 0.2), W, rnd));
      for (let k = 0; k < 2; k++) kit.decor("sport", "v:egret", () => egret(kit, ...P(-0.3 + k * 0.6, 0.75), W));
    },
  },
  trails: {
    ledge: 0x9c8a7a,
    fn({ P, y, kit, helpers: h, L, rnd }) {
      kit.decor("trails", "v:trailhead", () => {
        const [x, z] = P(-0.45, 0);
        for (const d of [-0.14, 0.14]) kit.cyl(x + L.tx * d, y + 0.17, z + L.tz * d, 0.03, 0.34, 0x8a6a4e);
        kit.box(x, y + 0.36, z, 0.36, 0.06, 0.06, 0xa34e34, null, [0, L.yaw, 0]);
      });
      for (let s = 0; s < 4; s++) kit.decor("trails", "v:teaTerrace", () => {
        const [x, z] = P(0.35, -0.2 + s * 0.12);
        kit.hbox(x, y + 0.03 + s * 0.035, z, 0.6, 0.06, 0.1, 0x93ad74, null, [0, L.yaw, 0]);
        for (let k = 0; k < 4; k++) {
          const [x2, z2] = P(0.13 + k * 0.15, -0.2 + s * 0.12);
          kit.ico(x2, y + 0.08 + s * 0.035, z2, [0.08, 0.05, 0.06], 0x6f8a62);
        }
      });
      kit.decor("trails", "v:hotSpringSteam", () => {
        const [x, z] = P(-0.75, 0.15);
        kit.cyl(x, y + 0.02, z, 0.24, 0.04, 0xb7a993);
        kit.cyl(x, y + 0.04, z, 0.2, 0.01, 0x9fd8e6);
        for (let k = 0; k < 3; k++) kit.ico(x + (k - 1) * 0.04, y + 0.12 + k * 0.08, z, [0.08 + k * 0.03, 0.06, 0.08], 0xffffff);
      });
      kit.decor("trails", "v:stoneSteps", () => {
        for (let s = 0; s < 5; s++) {
          const [x, z] = P(-0.1, 0.25 - s * 0.05);
          kit.hbox(x, y + 0.02 + s * 0.03, z, 0.14, 0.03, 0.05, 0xb7a993, null, [0, L.yaw, 0]);
        }
      });
    },
  },
  forest: {
    ledge: 0x8fa67a,
    fn({ P, y, kit, helpers: h, L, rnd }) {
      for (let k = 0; k < 3; k++) kit.decor("forest", "v:woods", () => h.tree(...P(-0.65 + k * 0.25, 0.1), 0.32 + rnd() * 0.12, y));
      kit.decor("forest", "v:nursery", () => {
        for (let k = 0; k < 8; k++) {
          const [x, z] = P(0.2 + (k % 4) * 0.12, -0.1 + Math.floor(k / 4) * 0.14);
          kit.cyl(x, y + 0.03, z, 0.05, 0.06, 0x8a6a4e);
          kit.part("cone6", [x, y + 0.12, z], [0.06, 0.13, 0.06], 0x7f9a6a);
        }
      });
      kit.decor("forest", "v:logPile", () => {
        for (let k = 0; k < 5; k++) {
          const [x, z] = P(-0.15, -0.15);
          kit.part("cylinder", [x + L.tx * ((k % 3) - 1) * 0.07, y + 0.035 + (k > 2 ? 0.06 : 0), z + L.tz * ((k % 3) - 1) * 0.07], [0.06, 0.26, 0.06], 0xa77a55, null, [Math.PI / 2, L.yaw, 0]);
        }
      });
      kit.decor("forest", "v:birdhouse", () => {
        const [x, z] = P(0.7, 0.2);
        kit.cyl(x, y + 0.15, z, 0.012, 0.3, 0x8a6a4e);
        kit.box(x, y + 0.32, z, 0.07, 0.07, 0.07, 0xdb6a41);
        kit.part("cone6", [x, y + 0.38, z], [0.1, 0.06, 0.1], 0x8a6a4e);
      });
    },
  },
  youth: {
    ledge: 0xd9a77a,
    fn({ P, y, kit, L, rnd, ambientSpots, id }) {
      kit.decor("youth", "v:graffitiWall", () => {
        for (let k = 0; k < 4; k++) {
          const [x, z] = P(-0.6 + k * 0.22, -0.2);
          kit.box(x, y + 0.13, z, 0.21, 0.26, 0.04, [0xe8c547, 0xdb6a41, 0x58a6a6, 0xf3e2c6][k], null, [0, L.yaw, 0]);
        }
      });
      kit.decor("youth", "v:skateRamp", () => {
        const [x, z] = P(0.35, 0.05);
        kit.part("box", [x, y + 0.06, z], [0.4, 0.02, 0.2], 0xb7a993, null, [0.35, L.yaw, 0]);
        kit.box(x, y + 0.04, z, 0.4, 0.08, 0.06, 0xb7a993, null, [0, L.yaw, 0]);
      });
      kit.decor("youth", "v:marketTent", () => {
        const [x, z] = P(-0.15, 0.15);
        for (const d of [-0.12, 0.12]) kit.cyl(x + L.tx * d, y + 0.11, z + L.tz * d, 0.012, 0.22, 0x211d1d);
        kit.part("prism", [x, y + 0.26, z], [0.3, 0.32, 0.22], 0xfff1de, null, [0, L.yaw, Math.PI / 2]);
        kit.box(x, y + 0.08, z, 0.26, 0.04, 0.14, 0xb48560, null, [0, L.yaw, 0]);
      });
      kit.decor("youth", "v:neon", () => {
        const [x, z] = P(0.65, -0.18);
        kit.cyl(x, y + 0.2, z, 0.015, 0.4, 0x211d1d);
        kit.glow(x, y + 0.42, z, 0.18, 0.08, 0.02, 0xe7a383);
      });
    },
    top({ c, ambientSpots }) {
      // open-air dream stage audience + a skater on the free strip west of the stage (clear of every model footprint)
      ambientSpots.push({ role: "youth", island: "youth", pos: [c.x - 0.8, 0, c.z + 1.04], yaw: Math.PI / 2, wander: 0.24, pose: "skate" });
      ambientSpots.push({ role: "youth", island: "youth", pos: [c.x + 0.12, 0, c.z + 1.32], yaw: Math.PI, pose: "sit" });
      ambientSpots.push({ role: "youth", island: "youth", pos: [c.x + 0.5, 0, c.z + 1.36], yaw: Math.PI - 0.25, pose: "wave" });
    },
  },
  diplomacy: {
    ledge: 0xb48560,
    top({ c, ambientSpots, kit }) {
      for (const [x, z, yaw] of [
        [-0.25, -0.25, 2.6],
        [0.35, -0.2, -2.4],
        [-0.45, 0.25, 0.4],
      ])
        ambientSpots.push({ role: "traveller", island: "diplomacy", pos: [c.x + x, 0, c.z + z], yaw, wander: 0.08 });
    },
    fn({ P, y, kit, L, rnd, W, li, markers, ambientSpots }) {
      kit.decor("diplomacy", "v:jetty", () => {
        for (let k = 0; k < 6; k++) {
          const [x, z] = P(0.2, 0.3 + k * 0.12);
          kit.hbox(x, y - 0.02, z, 0.22, 0.03, 0.1, k % 2 ? 0xa77a55 : 0xb48560, null, [0, L.yaw, 0]);
        }
        for (let k = 0; k < 3; k++) {
          const [x, z] = P(0.2 + 0.13, 0.35 + k * 0.25);
          kit.cyl(x, y - 0.1, z, 0.03, 0.3, 0x8a6a4e);
        }
      });
      if (li === 0) {
        markers.push({ P, L });
        for (const [u, v, yaw] of [
          [0.05, 0.1, 0.3],
          [0.3, 0.15, -0.4],
          [0.45, -0.05, 2.8],
        ]) {
          const [x, z] = P(u, v);
          ambientSpots.push({ role: "traveller", island: "diplomacy", pos: [x, y + 0.02, z], yaw: L.yaw + yaw });
        }
        kit.decor("diplomacy", "v:shelter", () => {
          const [x, z] = P(-0.45, 0.05);
          for (const d of [-0.16, 0.16]) kit.cyl(x + L.tx * d, y + 0.16, z + L.tz * d, 0.015, 0.32, 0x211d1d);
          kit.box(x, y + 0.33, z, 0.44, 0.03, 0.2, 0x3e7c8c, null, [0, L.yaw, 0]);
          kit.hbox(x, y + 0.07, z, 0.36, 0.03, 0.08, 0xb48560, null, [0, L.yaw, 0]);
        });
      }
      if (li === 0) kit.decor("diplomacy", "v:seaRoute", () => {
        // A10: dashed routes run from the Taipei pier head to each partner islet's quay
        for (const [k, col] of [
          [0, 0xdb6a41],
          [1, 0x3e7c8c],
        ]) {
          const c = seaCurve(P, k);
          for (let j = 1; j < 22; j++) {
            const t = j / 22;
            const [x, z] = bez(c, t),
              [x2, z2] = bez(c, t + 0.01);
            kit.hbox(x, W + 0.012, z, 0.07, 0.008, 0.2, col, null, [0, Math.atan2(x2 - x, z2 - z), 0]);
          }
          // quay markers at both ends
          for (const [x, z] of [c.start, c.end]) {
            kit.cyl(x, W + 0.12, z, 0.06, 0.28, col);
            kit.bulb(x, W + 0.3, z, 0.05, 0xfff0c2);
          }
        }
      });
      kit.decor("diplomacy", "v:sailboat", () => boat(kit, ...P(-0.3, 0.9), L.yaw + 0.4, W, rnd));
      kit.decor("diplomacy", "v:sailboat", () => boat(kit, ...P(0.55, 1.1), L.yaw - 0.3, W, rnd));
      kit.decor("diplomacy", "v:buoy", () => buoy(kit, ...P(-0.7, 0.6), W));
      kit.decor("diplomacy", "v:luggageCart", () => {
        const [x, z] = P(-0.4, -0.05);
        kit.hbox(x, y + 0.05, z, 0.22, 0.02, 0.12, 0x58585f, null, [0, L.yaw, 0]);
        for (let k = 0; k < 3; k++) kit.box(x + L.tx * (-0.06 + k * 0.06), y + 0.12, z + L.tz * (-0.06 + k * 0.06), 0.05, 0.12, 0.09, [0xdb6a41, 0x3e7c8c, 0xe8c547][k], null, [0, L.yaw, 0]);
      });
      if (li === 0)
        kit.decor("diplomacy", "v:balloon", () => {
          const [x, z] = P(-0.75, 0.4);
          kit.sphere(x, y + 1.0, z, [0.24, 0.28, 0.24], 0xdb6a41);
          kit.sphere(x, y + 1.0, z, [0.245, 0.08, 0.245], 0xfff1de);
          for (const d of [-0.04, 0.04]) kit.cyl(x + d, y + 0.8, z, 0.006, 0.16, 0x5a4a3e);
          kit.box(x, y + 0.7, z, 0.08, 0.06, 0.08, 0xb48560);
        });
    },
  },
};
