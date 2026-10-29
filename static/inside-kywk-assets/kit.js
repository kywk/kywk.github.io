// Instanced part kit: every static part is collected by geometry kind and drawn as one InstancedMesh.
import { RoundedBoxGeometry } from "../vendor/three/examples/jsm/geometries/RoundedBoxGeometry.js";

export function createKit(THREE, top) {
  const geo = {
    box: new THREE.BoxGeometry(1, 1, 1),
    rbox: new RoundedBoxGeometry(1, 1, 1, 2, 0.12),
    cylinder: new THREE.CylinderGeometry(0.5, 0.5, 1, 14),
    cone: new THREE.ConeGeometry(0.5, 1, 10),
    cone6: new THREE.ConeGeometry(0.5, 1, 6),
    sphere: new THREE.SphereGeometry(0.5, 12, 8), // 2026-10-26: 14×10 → 12×8 (−33% triangles on ~850 small round parts; same look at map scale)
    ico: new THREE.IcosahedronGeometry(0.5, 1),
    dome: new THREE.SphereGeometry(0.5, 18, 9, 0, Math.PI * 2, 0, Math.PI / 2),
    torus: new THREE.TorusGeometry(0.5, 0.055, 6, 24),
    tetra: new THREE.ConeGeometry(0.5, 1, 4),
    // hip roof: square pyramid whose base is exactly a 1×1 square aligned to the axes, so any w×d scale stays a clean
    // rectangle (a scaled, 45°-turned round cone made lumpy, broken-looking roofs)
    hip: new THREE.ConeGeometry(0.5, 1, 4).rotateY(Math.PI / 4).scale(Math.SQRT2, 1, Math.SQRT2),
    prism: new THREE.CylinderGeometry(0.5, 0.5, 1, 3),
    glowbox: new THREE.BoxGeometry(1, 1, 1),
    glowsphere: new THREE.SphereGeometry(0.5, 10, 8),
    leaf: (() => {
      // lumpy low-poly foliage clump: icosahedron with deterministic vertex jitter
      const g = new THREE.IcosahedronGeometry(0.5, 1);
      const pos = g.attributes.position;
      const v = new THREE.Vector3();
      for (let i = 0; i < pos.count; i++) {
        v.fromBufferAttribute(pos, i);
        const n = Math.sin(v.x * 12.9 + v.y * 78.2 + v.z * 37.7) * 43758.5;
        const j = 1 + ((n - Math.floor(n)) - 0.5) * 0.16;
        v.multiplyScalar(j);
        pos.setXYZ(i, v.x, v.y, v.z);
      }
      // merge duplicate vertices' normals smoothly enough but keep facets visible
      g.computeVertexNormals();
      return g;
    })(),
    trunk: new THREE.CylinderGeometry(0.32, 0.5, 1, 9),
  };
  const glowKinds = new Set(["glowbox", "glowsphere"]);
  const SMALL = new Set(["tuft", "pebble", "flowers", "planter", "bin", "bench", "bikeRack", "doorPath", "bush", "bunting", "fern", "rock", "veg", "lamp"]);
  const batches = new Map();
  const visual = new Map();
  const footprints = []; // {owner, island, minX,maxX,minZ,maxZ}
  let currentIsland = null;
  let decorCount = new Map(); // island -> {count, types:Set}
  let decorTag = null; // when set, parts are counted as decor for an island/type
  function part(kind, pos, scale, color, owner = null, rotation = null) {
    const entry = { pos: new THREE.Vector3(...pos), scale: new THREE.Vector3(...scale), color: new THREE.Color(color), owner, rotation: rotation || [0, 0, 0], island: currentIsland };
    const key = decorTag && SMALL.has(decorTag.type) ? kind + "|lod" : kind;
    if (!batches.has(key)) batches.set(key, []);
    batches.get(key).push(entry);
    return entry;
  }
  const k = {
    geo,
    top,
    part,
    batches,
    visual,
    footprints,
    setIsland: (id) => (currentIsland = id),
    box: (x, y, z, w, h, d, c, o, r) => part(w > 0.07 && h > 0.07 && d > 0.07 ? "rbox" : "box", [x, y, z], [w, h, d], c, o, r),
    hbox: (x, y, z, w, h, d, c, o, r) => part("box", [x, y, z], [w, h, d], c, o, r),
    cyl: (x, y, z, w, h, c, o, r) => part("cylinder", [x, y, z], [w, h, w], c, o, r),
    sphere: (x, y, z, s, c, o) => part("sphere", [x, y, z], Array.isArray(s) ? s : [s, s, s], c, o),
    ico: (x, y, z, s, c, o) => part("ico", [x, y, z], Array.isArray(s) ? s : [s, s, s], c, o),
    glow: (x, y, z, w, h, d, c, o) => part("glowbox", [x, y, z], [w, h, d], c, o),
    bulb: (x, y, z, s, c = 0xfff0c2, o) => part("glowsphere", [x, y, z], [s, s, s], c, o),
    decor(island, type, fn) {
      const prev = decorTag;
      decorTag = { island, type };
      const before = countAll();
      fn();
      const added = countAll() - before;
      if (!decorCount.has(island)) decorCount.set(island, { count: 0, types: new Set(), vignette: 0, vignetteTypes: new Set() });
      const dc = decorCount.get(island);
      if (type.startsWith("v:")) {
        dc.vignette += 1;
        dc.vignetteTypes.add(type);
      } else {
        dc.count += 1;
        dc.types.add(type);
      }
      decorTag = prev;
      return added;
    },
    decorStats: () => Object.fromEntries([...decorCount].map(([i, v]) => [i, { scatter: v.count, scatterTypes: v.types.size, vignette: v.vignette, vignetteTypes: [...v.vignetteTypes] }])),
  };
  function countAll() {
    let n = 0;
    for (const v of batches.values()) n += v.length;
    return n;
  }
  k.build = function build(scene, mats) {
    const dummy = new THREE.Object3D();
    const meshes = [];
    for (const [key, items] of batches) {
      const kind = key.split("|")[0];
      // depth priority per part kind: decals / panels / windows drawn onto other parts win their shared faces
      const PRI = { glowbox: -6, glowsphere: -3, box: -3, prism: -1, tetra: -1, hip: 0, cylinder: -1, rbox: 0, cone: 0, cone6: 0, torus: -1, sphere: 0.5, ico: 0.5, leaf: 0.5, dome: 0, trunk: 0 };
      const base = glowKinds.has(kind) ? mats.glow : mats.solid;
      const pr = PRI[kind] ?? 0;
      let material = base;
      if (pr !== 0) {
        material = base.clone();
        (base.userData.clones ||= []).push(material);
        material.polygonOffset = true;
        material.polygonOffsetFactor = pr * 0.5;
        material.polygonOffsetUnits = pr * 2;
      }
      // 2026-10-26: big batches are split into spatial groups (k-d split on x then z) so the camera can cull the parts it
      // does not see. An InstancedMesh is drawn whole or not at all; in close-up views only ~10% of the city's
      // triangles are on screen, but every batch used to be drawn in full. Small batches stay as one mesh.
      for (const group of splitSpatially(items, 160, 4)) {
        const mesh = buildBatch(key, kind, material, group);
        scene.add(mesh);
        meshes.push(mesh);
      }
    }
    return meshes;
    function buildBatch(key, kind, material, items) {
      const mesh = new THREE.InstancedMesh(geo[kind], material, items.length);
      mesh.userData.lod = key.endsWith("|lod");
      mesh.castShadow = !glowKinds.has(kind);
      mesh.receiveShadow = true;
      items.forEach((p, n) => {
        dummy.position.copy(p.pos);
        // tiny deterministic size jitter so two same-kind parts never share an exact face (z-fighting)
        dummy.scale.copy(p.scale).multiplyScalar(1 + (((n * 7) % 9) - 4) * 0.0018);
        dummy.rotation.set(...p.rotation);
        dummy.updateMatrix();
        mesh.setMatrixAt(n, dummy.matrix);
        mesh.setColorAt(n, p.color);
        if (p.owner && visual.has(p.owner)) visual.get(p.owner).parts.push({ mesh, index: n, color: p.color });
      });
      mesh.userData = { type: "buildingBatch", items, kind, lod: key.endsWith("|lod") };
      mesh.computeBoundingSphere();
      return mesh;
    }
  };
  // split a list of parts into spatially coherent groups: halve along the longer horizontal axis at the median,
  // recursively, while a group is larger than `max` (at most `depth` levels → up to 2^depth groups)
  function splitSpatially(items, max, depth) {
    if (items.length <= max || depth <= 0) return [items];
    let minX = Infinity, maxX = -Infinity, minZ = Infinity, maxZ = -Infinity;
    for (const p of items) {
      if (p.pos.x < minX) minX = p.pos.x;
      if (p.pos.x > maxX) maxX = p.pos.x;
      if (p.pos.z < minZ) minZ = p.pos.z;
      if (p.pos.z > maxZ) maxZ = p.pos.z;
    }
    const axis = maxX - minX >= maxZ - minZ ? "x" : "z";
    const sorted = [...items].sort((a, b) => a.pos[axis] - b.pos[axis]);
    const mid = sorted.length >> 1;
    return [...splitSpatially(sorted.slice(0, mid), max, depth - 1), ...splitSpatially(sorted.slice(mid), max, depth - 1)];
  }
  return k;
}
