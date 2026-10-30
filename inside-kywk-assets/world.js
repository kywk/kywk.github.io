// Island bodies, ground materials, bridges, pedestrian graph and building layout.
// Decorative geometry adds no policy, location or schedule claim.
import { WATER_Y, mulberry } from "./environment.js?v=20261026-1";

export const R = 2.02; // hex circumradius (pointy-top, vertex toward ±z)
export const SPACING = 2.28;
export const TOP = 0.65;
export const RING_R = 1.8; // pedestrian walking line (circumradius)
export const INNER = 1.4; // building zone inradius
const SQ3 = Math.sqrt(3);
export const NEIGHBORS = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
  [1, -1],
  [-1, 1],
];

// Ground style per policy theme (decorative surface only)
const BRIDGE_PRIORITY = ["civil", "forest", "institute", "lunch", "family", "youth", "card", "welfare", "trails", "transport", "sport", "education", "renewal", "hakka", "diplomacy"];
const BRIDGE_STYLE = {
  default: { deck: [0xb48560, 0xa77a55], post: 0xfff8f4, handrail: 0x9a7454, arch: 0.09 },
  civil: { deck: [0xd6cbb8, 0xcabfab], post: 0xe6dccb, handrail: 0xe6dccb, arch: 0.07, rail: "wall" },
  trails: { deck: [0xb7a993, 0xa89a84], post: 0x9c8a7a, handrail: 0x9c8a7a, arch: 0.1, rail: "wall" },
  institute: { deck: [0xf2f4f3, 0xe3ebea], post: 0x3e7c8c, handrail: 0xbfe0e2, arch: 0.05, rail: "glass" },
  transport: { deck: [0x6d6a66, 0x5f5c58], post: 0xe8c547, handrail: 0xe8c547, arch: 0.04 },
  forest: { deck: [0x8a6a4e, 0x7a5c42], post: 0x7a5c42, handrail: 0x6b5038, arch: 0.06, log: true },
  lunch: { deck: [0xc9b27a, 0xb89f68], post: 0x9c7a4e, handrail: 0x9c7a4e, arch: 0.06, log: true },
  family: { deck: [0xc9dbe6, 0xb9cfdd], post: 0xffffff, handrail: 0xf2b5c6, arch: 0.08, rail: "planter" },
  welfare: { deck: [0xb48560, 0xa77a55], post: 0xffffff, handrail: 0x8db86f, arch: 0.08, rail: "planter" },
  youth: { deck: [0xdb6a41, 0xf3e2c6], post: 0x211d1d, handrail: 0xe8b04a, arch: 0.1 },
  card: { deck: [0xd4a07e, 0xe6c3a5], post: 0xfff8f4, handrail: 0xdb6a41, arch: 0.09 },
  hakka: { deck: [0xc77b5c, 0xb86e52], post: 0xf2e8d8, handrail: 0x3f5a8a, arch: 0.08, rail: "wall" },
};
export const GROUND = {
  civil: "granite",
  institute: "lawn",
  renewal: "gravel",
  transport: "street",
  education: "gravel",
  lunch: "boardwalk",
  family: "courtyard",
  card: "terracotta",
  welfare: "garden",
  sport: "schoolyard",
  trails: "alpine",
  forest: "forest",
  youth: "softpad",
  diplomacy: "desert",
  hakka: "rubber",
};
const GROUND_TONE = {
  granite: 0xd9cbb4,
  lawn: 0xb9cd98,
  gravel: 0xc7b08f,
  street: 0x9aa4ad,
  meadow: 0xbccf9c,
  terracotta: 0xdcb79a,
  garden: 0xb8cfa8,
  forest: 0x88b074,
  rubber: 0xe8b86d,
  boardwalk: 0x8fc2cc,
  ringtile: 0xf4f1ec,
  schoolyard: 0xd96b4e,
  farmland: 0xa9b878,
  softpad: 0x6fb8c4,
  courtyard: 0xd9cbb8,
  alpine: 0xe8f1f5,
  desert: 0xe8c896,
};

const SHALLOW_TONE = {
  hakka: 0xe8c896,
  civil: 0xc8bfe0,
  institute: 0xa9d6e0,
  renewal: 0xc9c4a8,
  transport: 0x9fc7cf,
  education: 0xd8d4a4,
  lunch: 0x8fc2cc,
  family: 0xd9cfc6,
  card: 0xd9c3a8,
  welfare: 0xb8cfa8,
  sport: 0xd9a494,
  trails: 0xdceaf2,
  forest: 0x8fb89a,
  youth: 0x8fc6c4,
  diplomacy: 0xded0b4,
};
// Walking-ring paving and cliff strata per island (decorative identity only)
export const RING_TINT = {
  civil: 0xc8bfe0,
  institute: 0x9fd0d6,
  renewal: 0xc9b89a,
  transport: 0x9aa4ad,
  education: 0xdcb888,
  lunch: 0x8fc2cc,
  family: 0xd9cbb8,
  card: 0xc99672,
  welfare: 0xb8cfa8,
  sport: 0xd96b4e,
  trails: 0xdceaf2,
  forest: 0x9ab882,
  youth: 0x6fb8c4,
  diplomacy: 0xe6ca9e,
  hakka: 0xe8b86d,
};
const CLIFF = {
  default: [0xb98c68, 0xa77b59, 0x977059, 0x8f8172],
  civil: [0xcbbfae, 0xb9ab97, 0xa89a86, 0x928676],
  institute: [0xbfc8c2, 0xaab5ae, 0x98a39d, 0x86908a],
  trails: [0xd8e8f0, 0xb0c8d8, 0x8aa4b8, 0x6c8294],
  forest: [0x6d8c54, 0x7a684e, 0x665640, 0x544738],
  youth: [0x5a9fa8, 0x4a8b94, 0x3d767e, 0x2f5f66],
  diplomacy: [0xd9b078, 0xc49a62, 0xad844f, 0x946f40],
  sport: [0xc96b4e, 0xb05a40, 0x984933, 0x7d3b29],
  education: [0xc77b5c, 0xb86e52, 0xa86449, 0x8f7564],
  lunch: [0x7aa5b0, 0x68929c, 0x567e87, 0x456b73],
  family: [0xd8cbb8, 0xc5b7a3, 0xb1a38f, 0x9d907d],
  card: [0xd08a64, 0xc27c58, 0xb26f4f, 0x9a7a66],
  welfare: [0x8d9b6a, 0x9a7e5e, 0x8a6f52, 0x7d7468],
  transport: [0x8a9299, 0x777f86, 0x656c73, 0x545a60],
  renewal: [0xb8a07e, 0xa58d6c, 0x93805f, 0x857766],
  hakka: [0xd9aa58, 0xc49748, 0xad833a, 0x95702e],
};
export function axialToWorld(THREE, q, r) {
  return new THREE.Vector3(SQ3 * SPACING * (q + r / 2) - 2, TOP, 1.5 * SPACING * r - 10.26);
}
// unit direction (xz) from axial neighbour delta
export function dirOf(dq, dr) {
  const x = SQ3 * (dq + dr / 2),
    z = 1.5 * dr;
  const l = Math.hypot(x, z);
  return [x / l, z / l];
}
// pointy-top hex vertices (angle 90° = +z)
export function hexVertex(cx, cz, r, k) {
  const a = Math.PI / 2 + (k * Math.PI) / 3;
  return [cx + Math.cos(a) * r, cz + Math.sin(a) * r];
}
// is local point (x,z) inside pointy-top hex with inradius ri
export function insideHex(x, z, ri) {
  const ax = Math.abs(x),
    az = Math.abs(z);
  return ax <= ri && ax * 0.5 + az * 0.8660254 <= ri;
}

function makeTexture(THREE, type) {
  const c = document.createElement("canvas");
  c.width = c.height = 256;
  const g = c.getContext("2d");
  const rnd = mulberry(type.length * 97 + 3);
  const tone = "#" + GROUND_TONE[type].toString(16).padStart(6, "0");
  g.fillStyle = tone;
  g.fillRect(0, 0, 256, 256);
  const speck = (n, cols, rmin, rmax, a = 1) => {
    for (let i = 0; i < n; i++) {
      g.globalAlpha = a * (0.4 + rnd() * 0.6);
      g.fillStyle = cols[Math.floor(rnd() * cols.length)];
      g.beginPath();
      g.arc(rnd() * 256, rnd() * 256, rmin + rnd() * (rmax - rmin), 0, Math.PI * 2);
      g.fill();
    }
    g.globalAlpha = 1;
  };
  const tiles = (sz, grout, jitter, cols) => {
    for (let y = 0; y < 256; y += sz)
      for (let x = 0; x < 256; x += sz) {
        g.fillStyle = cols[Math.floor(rnd() * cols.length)];
        g.fillRect(x + 1, y + 1, sz - 2, sz - 2);
        g.globalAlpha = jitter;
        g.fillStyle = rnd() > 0.5 ? "#ffffff" : "#000000";
        g.fillRect(x + 1, y + 1, sz - 2, sz - 2);
        g.globalAlpha = 1;
      }
    g.strokeStyle = grout;
    g.lineWidth = 2;
    for (let i = 0; i <= 256; i += sz) {
      g.beginPath();
      g.moveTo(i, 0);
      g.lineTo(i, 256);
      g.moveTo(0, i);
      g.lineTo(256, i);
      g.stroke();
    }
  };
  switch (type) {
    case "granite":
      tiles(32, "#bfae95", 0.04, ["#dccfb8", "#d6c7ae", "#e0d3bd", "#d2c2a7"]);
      speck(400, ["#b8a68b", "#efe4d2"], 0.4, 1.1, 0.5);
      break;
    case "street":
      tiles(21, "#b3a796", 0.03, ["#d0c4b3", "#c8bba8", "#d6cbbb"]);
      break;
    case "schoolyard":
      g.fillStyle = "#c9785a";
      g.fillRect(0, 0, 256, 256);
      g.strokeStyle = "#f6eee6";
      g.lineWidth = 3;
      for (let y = 16; y < 256; y += 32) {
        g.beginPath();
        g.moveTo(0, y);
        g.lineTo(256, y);
        g.stroke();
      }
      speck(900, ["#b86c50", "#d68a6a"], 0.4, 1.0, 0.6);
      break;
    case "farmland":
      for (let y = 0; y < 256; y += 16) {
        g.fillStyle = (y / 16) % 2 ? "#9c7a5a" : "#a9c47f";
        g.fillRect(0, y, 256, 16);
      }
      speck(600, ["#8fb37a", "#7f9a6a"], 0.6, 1.6, 0.7);
      break;
    case "softpad":
      for (let y = 0; y < 256; y += 32)
        for (let x = 0; x < 256; x += 32) {
          g.fillStyle = ["#b9d6e6", "#f2c4d0", "#f6e3a6", "#c4e2c4"][((x + y) / 32) % 4];
          g.fillRect(x + 1, y + 1, 30, 30);
        }
      break;
    case "ringtile":
      tiles(18, "#c9c2b8", 0.035, ["#f6f3ee", "#efebe4", "#faf8f4"]);
      break;
    case "terracotta":
      tiles(26, "#b98d6f", 0.05, ["#dcb79a", "#d4ab8c", "#e1c0a4"]);
      break;
    case "boardwalk":
      for (let y = 0; y < 256; y += 16) {
        g.fillStyle = ["#c9a27c", "#bf9771", "#d1ab86"][Math.floor(rnd() * 3)];
        g.fillRect(0, y + 1, 256, 14);
        g.fillStyle = "#a9805e";
        for (let x = (y * 7) % 64; x < 256; x += 64) g.fillRect(x, y + 1, 2, 14);
      }
      break;
    case "rubber":
      g.fillStyle = "#e2a46f";
      g.fillRect(0, 0, 256, 256);
      g.fillStyle = "#e8c06a";
      g.fillRect(0, 0, 128, 128);
      g.fillRect(128, 128, 128, 128);
      speck(1800, ["#c98a59", "#f1c48f", "#d9965f"], 0.5, 1.3, 0.6);
      break;
    case "gravel":
      speck(2600, ["#b29a78", "#d8c4a3", "#a68c6c", "#c9b392"], 0.5, 1.6, 0.8);
      break;
    case "alpine": {
      // Snowy alpine rock with icy blue drift bands, frosty white pebbles and snow tufts
      g.fillStyle = "#e8f1f5";
      g.fillRect(0, 0, 256, 256);
      g.fillStyle = "rgba(180, 205, 222, 0.35)";
      for (let y = 0; y < 256; y += 48) {
        g.beginPath();
        g.moveTo(0, y);
        g.bezierCurveTo(80, y + 20, 160, y - 20, 256, y + 10);
        g.lineTo(256, y + 28);
        g.bezierCurveTo(160, y - 2, 80, y + 38, 0, y + 28);
        g.closePath();
        g.fill();
      }
      speck(900, ["#ffffff", "#f5faff", "#dceaf2"], 1.0, 3.2, 0.85);
      speck(600, ["#8fa3b0", "#a8bcc7", "#c2d4de"], 0.4, 1.2, 0.65);
      break;
    }
    case "desert": {
      // Golden Sahara/Atacama desert sand with wind-rippled dune curves
      g.fillStyle = "#e8c896";
      g.fillRect(0, 0, 256, 256);
      g.strokeStyle = "#d4ad74";
      g.lineWidth = 2;
      for (let y = 8; y < 256; y += 20) {
        g.beginPath();
        g.moveTo(0, y);
        for (let x = 0; x < 256; x += 32) {
          g.quadraticCurveTo(x + 16, y + Math.sin((x + y) * 0.05) * 6, x + 32, y);
        }
        g.stroke();
      }
      speck(1400, ["#d4ad74", "#f2d8a8", "#c89b5c"], 0.4, 1.3, 0.7);
      break;
    }
    default: {
      // grasses
      const deep = type === "forest" ? ["#8ea873", "#a9bf8e", "#7e9866"] : ["#a9bf8e", "#c7d7a8", "#9fb684", "#b5c995"];
      speck(3200, deep, 0.4, 1.4, 0.55);
      if (type !== "forest") speck(70, ["#f3e7a6", "#ffffff", "#f2c4b2", "#d9c6f0"], 0.9, 1.6, 0.85);
    }
  }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.anisotropy = 4;
  return t;
}

// Rocky hex sides with soil strata, built per edge with noise displacement.
function cliffGeometry(THREE, cx, cz, r, yTop, yBot, grassTone, seed, id) {
  const segH = 8,
    segV = 7;
  const posA = [],
    colA = [],
    idx = [];
  const rnd = mulberry(seed);
  const strata = CLIFF[id] || CLIFF.default;
  const strataColors = strata.map((hex) => new THREE.Color(hex));
  const shallowTone = new THREE.Color(SHALLOW_TONE[id] || 0xb9d9d6);
  const waterTone = new THREE.Color(0x9fcfd6);
  const jit = (x, z, y) => Math.sin(x * 7.1 + z * 3.3 + y * 5.7) * 0.5 + Math.sin(x * 2.3 - z * 6.1 + y * 9.1) * 0.5;
  for (let e = 0; e < 6; e++) {
    const [ax, az] = hexVertex(cx, cz, r, e),
      [bx, bz] = hexVertex(cx, cz, r, e + 1);
    const nx = (ax + bx) / 2 - cx,
      nz = (az + bz) / 2 - cz,
      nl = Math.hypot(nx, nz);
    const base = posA.length / 3;
    for (let v = 0; v <= segV; v++) {
      const t = v / segV; // 0 top .. 1 bottom
      const y = yTop + (yBot - yTop) * t;
      const shrink = 1; // vertical skirt: no visible taper wedge
      for (let h = 0; h <= segH; h++) {
        const s = h / segH;
        let x = cx + (ax + (bx - ax) * s - cx) * shrink,
          z = cz + (az + (bz - az) * s - cz) * shrink;
        const out = 0;
        x += (nx / nl) * out;
        z += (nz / nl) * out;
        posA.push(x, y, z);
        // Strata layering per island, fading into shallow/water at bottom
        const sIdx = t * (strataColors.length - 1);
        const i0 = Math.floor(sIdx);
        const i1 = Math.min(strataColors.length - 1, i0 + 1);
        const f = sIdx - i0;
        const baseRock = strataColors[i0].clone().lerp(strataColors[i1], f);
        const c = t > 0.6 ? baseRock.clone().lerp(shallowTone.clone().lerp(waterTone, (t - 0.6) / 0.4), (t - 0.6) / 0.4) : baseRock;
        colA.push(c.r, c.g, c.b);
      }
    }
    for (let v = 0; v < segV; v++)
      for (let h = 0; h < segH; h++) {
        const a = base + v * (segH + 1) + h,
          b = a + 1,
          c = a + segH + 1,
          d = c + 1;
        idx.push(a, c, b, b, c, d);
      }
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.Float32BufferAttribute(posA, 3));
  g.setAttribute("color", new THREE.Float32BufferAttribute(colA, 3));
  g.setIndex(idx);
  g.computeVertexNormals();
  return g;
}

function hexRingGeometry(THREE, rOut, rIn) {
  const s = new THREE.Shape(),
    h = new THREE.Path();
  for (let k = 0; k < 6; k++) {
    const [x, z] = hexVertex(0, 0, rOut, k);
    k ? s.lineTo(x, -z) : s.moveTo(x, -z);
    const [x2, z2] = hexVertex(0, 0, rIn, k);
    k ? h.lineTo(x2, -z2) : h.moveTo(x2, -z2);
  }
  s.closePath();
  h.closePath();
  s.holes.push(h);
  const g = new THREE.ShapeGeometry(s);
  g.rotateX(-Math.PI / 2);
  return g;
}

// Cliff-top band pattern per island: the island's "edge identity" seen in every close-up.
const BAND = {
  civil: ["blocks", "#c8bfe0", "#bfae95"],
  institute: ["glass", "#9fc4c6", "#e6f0ef"],
  renewal: ["hoarding", "#db6a41", "#f2efe8"],
  transport: ["hazard", "#e8c547", "#3b3a42"],
  education: ["mural", "#e8c547", "#58a6a6"],
  lunch: ["tiles", "#68929c", "#8fc2cc"],
  family: ["pastel", "#f2b5c6", "#9fc4e6"],
  card: ["tiles", "#d08a64", "#f2d0b4"],
  welfare: ["ivy", "#8db86f", "#b4c993"],
  sport: ["stripe", "#c8775a", "#ffffff"],
  trails: ["rubble", "#7c8e9b", "#dceaf2"],
  forest: ["moss", "#6f8a62", "#9cc27a"],
  youth: ["graffiti", "#e7a383", "#58a6a6"],
  diplomacy: ["timber", "#c49a62", "#e8c896"],
  hakka: ["blocks", "#c77b5c", "#e9d8c0"],
};
function bandTexture(THREE, id) {
  const [kind, a, b] = BAND[id] || ["blocks", "#c8b8a0", "#b0a088"];
  const c = document.createElement("canvas");
  c.width = 512;
  c.height = 64;
  const g = c.getContext("2d");
  const rnd = mulberry(id.length * 31 + 7);
  g.fillStyle = a;
  g.fillRect(0, 0, 512, 64);
  switch (kind) {
    case "blocks":
    case "tiles":
      for (let y = 0; y < 64; y += 21)
        for (let x = (y / 21) % 2 ? -18 : 0; x < 512; x += 36) {
          g.fillStyle = rnd() < 0.5 ? a : b;
          g.fillRect(x + 1, y + 1, 34, 19);
        }
      break;
    case "glass":
      for (let x = 0; x < 512; x += 32) {
        g.fillStyle = b;
        g.fillRect(x + 2, 6, 26, 52);
        g.fillStyle = "#3e7c8c";
        g.fillRect(x, 0, 2, 64);
      }
      break;
    case "hoarding":
    case "stripe":
      for (let x = 0; x < 512; x += 32) {
        g.fillStyle = (x / 32) % 2 ? a : b;
        g.fillRect(x, 0, 32, 64);
      }
      break;
    case "hazard":
      g.fillStyle = b;
      for (let x = -64; x < 576; x += 32) {
        g.beginPath();
        g.moveTo(x, 64);
        g.lineTo(x + 16, 64);
        g.lineTo(x + 48, 0);
        g.lineTo(x + 32, 0);
        g.fill();
      }
      break;
    case "mural":
    case "graffiti":
    case "pastel":
      for (let k = 0; k < 40; k++) {
        g.fillStyle = [a, b, "#fcea8b", "#db6a41", "#ffffff", "#6f7fb5"][k % 6];
        g.beginPath();
        g.arc(rnd() * 512, rnd() * 64, 6 + rnd() * 14, 0, Math.PI * 2);
        g.fill();
      }
      break;
    case "soil":
    case "ivy":
    case "moss":
      for (let x = 0; x < 512; x += 6) {
        g.fillStyle = b;
        const h = 10 + rnd() * (kind === "soil" ? 14 : 40);
        g.fillRect(x, 0, 5, h);
        g.beginPath();
        g.arc(x + 2.5, h, 3.5, 0, Math.PI * 2);
        g.fill();
      }
      break;
    case "rubble":
      for (let k = 0; k < 90; k++) {
        g.fillStyle = rnd() < 0.5 ? a : b;
        g.beginPath();
        g.ellipse(rnd() * 512, rnd() * 64, 8 + rnd() * 10, 6 + rnd() * 6, 0, 0, Math.PI * 2);
        g.fill();
      }
      break;
    case "timber":
      for (let x = 0; x < 512; x += 24) {
        g.fillStyle = rnd() < 0.5 ? a : b;
        g.fillRect(x + 1, 0, 22, 64);
      }
      break;
  }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.wrapS = THREE.RepeatWrapping;
  t.repeat.set(3, 1);
  return t;
}
export function buildIslands(THREE, scene, D, kit, colors) {
  const centers = new Map(),
    axialMap = new Map(),
    islandViews = new Map();
  for (const i of D.islands) {
    const c = axialToWorld(THREE, ...i.axial);
    centers.set(i.id, c);
    axialMap.set(i.axial.join(","), i.id);
  }
  const textures = {};
  const topMats = {};
  for (const type of new Set(Object.values(GROUND))) {
    textures[type] = makeTexture(THREE, type);
    topMats[type] = new THREE.MeshStandardMaterial({ map: textures[type], roughness: 0.92 });
  }
  const cliffMat = new THREE.MeshLambertMaterial({ vertexColors: true });
  const ringMat = new THREE.MeshStandardMaterial({ map: makeTexture(THREE, "ringtile"), roughness: 0.9, color: 0xf1e7da, polygonOffset: true, polygonOffsetFactor: -1, polygonOffsetUnits: -2 });
  const curbMat = new THREE.MeshStandardMaterial({ color: 0xe4d6c3, roughness: 0.8, polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -4 });
  const foamMat = new THREE.MeshBasicMaterial({ color: 0xf6fbfa, transparent: true, opacity: 0.55, depthWrite: false });
  const neighbors = new Map();
  for (const i of D.islands) {
    const c = centers.get(i.id);
    const type = GROUND[i.id] || "meadow";
    // top surface with world-space UV
    const topGeo = new THREE.CircleGeometry(R - 0.05, 6);
    topGeo.rotateZ(Math.PI / 6);
    topGeo.rotateX(-Math.PI / 2);
    const uv = topGeo.attributes.uv,
      p = topGeo.attributes.position;
    for (let n = 0; n < p.count; n++) uv.setXY(n, (p.getX(n) + c.x) / 2.2, (p.getZ(n) + c.z) / 2.2);
    const topMesh = new THREE.Mesh(topGeo, topMats[type].clone());
    topMesh.position.set(c.x, TOP, c.z);
    topMesh.receiveShadow = true;
    topMesh.userData = { type: "island", id: i.id };
    scene.add(topMesh);
    // pedestrian ring paving + curb
    const rm = ringMat.clone();
    rm.color.setHex(RING_TINT[i.id] || 0xf1e7da);
    const ring = new THREE.Mesh(hexRingGeometry(THREE, RING_R + 0.14, RING_R - 0.14), rm);
    ring.position.set(c.x, TOP + 0.012, c.z);
    ring.receiveShadow = true;
    scene.add(ring);
    const curb = new THREE.Mesh(hexRingGeometry(THREE, R, R - 0.07), curbMat);
    curb.position.set(c.x, TOP + 0.04, c.z);
    scene.add(curb);
    const inner = new THREE.Mesh(hexRingGeometry(THREE, RING_R - 0.14, RING_R - 0.18), curbMat);
    inner.position.set(c.x, TOP + 0.02, c.z);
    scene.add(inner);
    // cliffs
    const cliff = new THREE.Mesh(cliffGeometry(THREE, c.x, c.z, R, TOP + 0.04, WATER_Y - 0.5, GROUND_TONE[type], i.number * 13, i.id), cliffMat);
    cliff.castShadow = true;
    cliff.receiveShadow = true;
    cliff.userData = { type: "island", id: i.id };
    scene.add(cliff);
    const band = new THREE.Mesh(new THREE.CylinderGeometry(R + 0.012, R - 0.002, 0.16, 6, 1, true), new THREE.MeshStandardMaterial({ map: bandTexture(THREE, i.id), roughness: 0.85 }));
    band.position.set(c.x, TOP - 0.04, c.z);
    band.receiveShadow = true;
    scene.add(band);
    const SHALLOW = SHALLOW_TONE;
    const shallow = new THREE.Mesh(hexRingGeometry(THREE, R + 0.7, R - 0.02), new THREE.MeshBasicMaterial({ color: SHALLOW[i.id] || 0xb9d9d6, transparent: true, opacity: 0.55, depthWrite: false }));
    shallow.position.set(c.x, WATER_Y + 0.008, c.z);
    scene.add(shallow);
    const foam = new THREE.Mesh(hexRingGeometry(THREE, R + 0.16, R - 0.02), foamMat);
    foam.position.set(c.x, WATER_Y + 0.012, c.z);
    scene.add(foam);
    // outline (selection)
    const pts = Array.from({ length: 7 }, (_, k) => {
      const [x, z] = hexVertex(c.x, c.z, R + 0.01, k);
      return new THREE.Vector3(x, TOP + 0.07, z);
    });
    const outline = new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), new THREE.LineBasicMaterial({ color: colors.coral }));
    outline.visible = false;
    scene.add(outline);
    const nb = [];
    for (const [dq, dr] of NEIGHBORS) {
      const id = axialMap.get([i.axial[0] + dq, i.axial[1] + dr].join(","));
      nb.push(id ? { id, dq, dr } : { id: null, dq, dr });
    }
    neighbors.set(i.id, nb);
    islandViews.set(i.id, { top: topMesh, cliff, outline, type, topMat: topMats[type], ring, curb, band });
  }
  // bridges between neighbouring islands
  const bridges = [];
  const seen = new Set();
  for (const [id, nb] of neighbors)
    for (const n of nb) {
      if (!n.id) continue;
      const key = [id, n.id].sort().join("|");
      if (seen.has(key)) continue;
      seen.add(key);
      const a = centers.get(id),
        b = centers.get(n.id);
      const [dx, dz] = dirOf(n.dq, n.dr);
      const ri = RING_R * 0.8660254;
      const pa = new THREE.Vector3(a.x + dx * ri, TOP, a.z + dz * ri),
        pb = new THREE.Vector3(b.x - dx * ri, TOP, b.z - dz * ri);
      bridges.push({ a: id, b: n.id, pa, pb });
      kit.setIsland(null);
      const len = pa.distanceTo(pb),
        yaw = Math.atan2(dx, dz);
      const mid = pa.clone().lerp(pb, 0.5);
      // bridge style follows the more characteristic of the two islands
      const owner = BRIDGE_PRIORITY.find((x) => x === id || x === n.id) || id;
      const st = BRIDGE_STYLE[owner] || BRIDGE_STYLE.default;
      for (let s = 0; s <= 8; s++) {
        const t = s / 8;
        const pnt = pa.clone().lerp(pb, t);
        const arch = Math.sin(t * Math.PI) * st.arch;
        const tilt = Math.cos(t * Math.PI) * -st.arch * 2;
        if (st.log) kit.part("cylinder", [pnt.x, TOP + 0.04 + arch, pnt.z], [0.05, 0.32, 0.05], s % 2 ? st.deck[0] : st.deck[1], null, [0, yaw + Math.PI / 2, Math.PI / 2]);
        else kit.hbox(pnt.x, TOP + 0.03 + arch, pnt.z, 0.3, 0.035, len / 9 + 0.01, s % 2 ? st.deck[0] : st.deck[1], null, [tilt, yaw, 0]);
      }
      for (const side of [-1, 1]) {
        const ox = Math.cos(yaw) * 0.15 * side,
          oz = -Math.sin(yaw) * 0.15 * side;
        if (st.rail === "wall") {
          for (let s = 0; s < 4; s++) {
            const t = (s + 0.5) / 4,
              pnt = pa.clone().lerp(pb, t);
            kit.hbox(pnt.x + ox, TOP + 0.1 + Math.sin(t * Math.PI) * st.arch, pnt.z + oz, 0.04, 0.1, len / 4 + 0.02, st.post, null, [Math.cos(t * Math.PI) * -st.arch * 2, yaw, 0]);
          }
          continue;
        }
        for (let s = 0; s <= 4; s++) {
          const t = s / 4,
            pnt = pa.clone().lerp(pb, t);
          kit.hbox(pnt.x + ox, TOP + 0.13 + Math.sin(t * Math.PI) * st.arch, pnt.z + oz, 0.022, 0.16, 0.022, st.post);
          if (st.rail === "planter" && s % 2 === 1) {
            kit.hbox(pnt.x + ox * 1.25, TOP + 0.12 + Math.sin(t * Math.PI) * st.arch, pnt.z + oz * 1.25, 0.08, 0.06, 0.12, 0xb48560, null, [0, yaw, 0]);
            kit.ico(pnt.x + ox * 1.25, TOP + 0.18 + Math.sin(t * Math.PI) * st.arch, pnt.z + oz * 1.25, [0.09, 0.06, 0.12], s % 4 === 1 ? 0xf2b5c6 : 0x8db86f);
          }
        }
        kit.hbox(mid.x + ox, TOP + 0.21 + st.arch * 0.66, mid.z + oz, st.rail === "glass" ? 0.012 : 0.02, st.rail === "glass" ? 0.12 : 0.02, len, st.handrail, null, [0, yaw, 0]);
      }
    }
  return { centers, neighbors, islandViews, bridges, textures, topMats };
}

// Pedestrian graph: 12 ring nodes per island (vertices + edge midpoints), bridges connect edge midpoints.
export function buildGraph(THREE, D, centers, neighbors) {
  const nodes = [],
    adj = [],
    ringIndex = new Map();
  const add = (p, island) => {
    nodes.push({ p, island });
    adj.push([]);
    return nodes.length - 1;
  };
  const link = (a, b) => {
    const d = nodes[a].p.distanceTo(nodes[b].p);
    adj[a].push([b, d]);
    adj[b].push([a, d]);
  };
  for (const i of D.islands) {
    const c = centers.get(i.id),
      ids = [];
    for (let k = 0; k < 6; k++) {
      const [vx, vz] = hexVertex(c.x, c.z, RING_R, k),
        [wx, wz] = hexVertex(c.x, c.z, RING_R, k + 1);
      ids.push(add(new THREE.Vector3(vx, TOP + 0.03, vz), i.id));
      ids.push(add(new THREE.Vector3((vx + wx) / 2, TOP + 0.03, (vz + wz) / 2), i.id));
    }
    for (let k = 0; k < 12; k++) link(ids[k], ids[(k + 1) % 12]);
    ringIndex.set(i.id, ids);
  }
  // edge midpoint index for a direction
  const midFor = (id, dq, dr) => {
    const c = centers.get(id),
      [dx, dz] = dirOf(dq, dr),
      ids = ringIndex.get(id);
    let best = null,
      bd = 1e9;
    for (let k = 1; k < 12; k += 2) {
      const p = nodes[ids[k]].p,
        d = (p.x - c.x - dx * 2) ** 2 + (p.z - c.z - dz * 2) ** 2;
      if (d < bd) {
        bd = d;
        best = ids[k];
      }
    }
    return best;
  };
  for (const [id, nb] of neighbors)
    for (const n of nb) if (n.id && id < n.id) link(midFor(id, n.dq, n.dr), midFor(n.id, -n.dq, -n.dr));
  function shortest(a, b) {
    const dist = new Array(nodes.length).fill(Infinity),
      prev = new Array(nodes.length).fill(-1),
      done = new Array(nodes.length).fill(false);
    dist[a] = 0;
    for (;;) {
      let u = -1,
        best = Infinity;
      for (let i = 0; i < nodes.length; i++)
        if (!done[i] && dist[i] < best) {
          best = dist[i];
          u = i;
        }
      if (u < 0 || u === b) break;
      done[u] = true;
      for (const [v, w] of adj[u])
        if (dist[u] + w < dist[v]) {
          dist[v] = dist[u] + w;
          prev[v] = u;
        }
    }
    const path = [];
    for (let v = b; v >= 0; v = prev[v]) path.unshift(v);
    return path[0] === a ? path : [a];
  }
  // pick the ring node on island `id` closest to world point p
  function nodeNear(id, p) {
    let best = null,
      bd = 1e9;
    for (const n of ringIndex.get(id)) {
      const d = nodes[n].p.distanceToSquared(p);
      if (d < bd) {
        bd = d;
        best = n;
      }
    }
    return best;
  }
  const isEdge = (a, b) => adj[a].some(([v]) => v === b);
  return { nodes, ringIndex, shortest, nodeNear, midFor, isEdge };
}

// Generic slot layout for policy miniatures inside the building zone.
export function slotLayout(n, heroSize) {
  const hh = heroSize / 2,
    heroZ = -0.58;
  for (let s = n <= 4 ? 0.62 : n <= 7 ? 0.56 : n <= 10 ? 0.5 : 0.46; s > 0.3; s -= 0.03) {
    const h = s / 2,
      gapX = s + 0.1,
      gapZ = s + 0.08,
      out = [];
    for (let zi = -4; zi <= 4; zi++)
      for (let xi = -5; xi <= 5; xi++) {
        const z = 0.2 + zi * gapZ,
          x = (xi + (Math.abs(zi) % 2 ? 0.5 : 0)) * gapX;
        const cornersOk = [
          [x - h, z - h],
          [x + h, z - h],
          [x - h, z + h],
          [x + h, z + h],
        ].every(([px, pz]) => insideHex(px, pz, INNER - 0.04));
        if (!cornersOk) continue;
        if (Math.abs(x) < hh + h + 0.06 && Math.abs(z - heroZ) < hh + h + 0.06) continue;
        out.push([x, z]);
      }
    if (out.length >= n) {
      out.sort((a, b) => Math.hypot(a[0], a[1] - 0.25) - Math.hypot(b[0], b[1] - 0.25));
      return { size: s, slots: out.slice(0, n).sort((a, b) => a[1] - b[1] || a[0] - b[0]), heroZ };
    }
  }
  throw new Error("layout overflow " + n);
}

// Keep island rendering resilient when the page and policy data are briefly
// served from different cache generations. A stale hero/composition entry must
// never leave an undefined building in the placement list.
export function resolveIslandPlacements(buildings, composition, heroId) {
  const valid = Array.isArray(buildings)
    ? buildings.filter((building) => building && typeof building.id === "string")
    : [];
  if (!valid.length) return [];

  if (composition && valid.every((building) => Array.isArray(composition[building.id]))) {
    return valid.map((building) => [building, ...composition[building.id]]);
  }

  const hero = valid.find((building) => building.id === heroId) ?? valid[0];
  const others = valid.filter((building) => building !== hero);
  const heroSize = others.length > 8 ? 1.05 : 1.18;
  const layout = slotLayout(others.length, heroSize);
  return [
    [hero, 0, layout.heroZ, heroSize],
    ...others.map((building, index) => [building, layout.slots[index][0], layout.slots[index][1], layout.size]),
  ];
}
