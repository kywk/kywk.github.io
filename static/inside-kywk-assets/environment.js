// Non-policy scenery: sky, light, water, basin terrain, clouds.
// Everything here is decorative and carries no policy, geographic or schedule claim.
import { SimplexNoise } from "../vendor/three/examples/jsm/math/SimplexNoise.js";
import { mergeGeometries } from "../vendor/three/examples/jsm/utils/BufferGeometryUtils.js";

export const WATER_Y = -0.18;

// Day keyframes (minutes): sky top, horizon, sun colour, sun intensity, hemi sky, hemi ground, hemi intensity, night factor, water
const KEYS = [
  // [min, skyTop, horizon, sunColor, sunI, hemiSky, hemiGround, hemiI, night, water]
  [0, 0x1e2c58, 0x3f4f80, 0xb4c2ff, 1.15, 0x94a2d8, 0x64566a, 1.85, 1, 0x5a88b2],
  [300, 0x26365f, 0x4c5688, 0xb8c4ff, 1.0, 0x96a4da, 0x66586c, 1.85, 1, 0x5c8ab4],
  [360, 0x7f8fc4, 0xf6c3a6, 0xffb48a, 1.3, 0xf3c6b5, 0x6b5a5a, 1.1, 0.55, 0x8fb7c4],
  [450, 0xa9d1ea, 0xfbe6d3, 0xffe2c4, 2.4, 0xeaf2f6, 0x8a7a68, 1.25, 0, 0x9fcfd6],
  [720, 0x9fd0ec, 0xf4eee3, 0xfff1de, 2.9, 0xeef6fa, 0x8f8270, 1.35, 0, 0xa9d8db],
  [960, 0xa6cfe6, 0xf8e7d2, 0xffe3c0, 2.5, 0xf1efe8, 0x8a7a66, 1.25, 0, 0x9fcbd2],
  [1065, 0x8b8fc4, 0xf7b98f, 0xff9f6a, 1.8, 0xf6d2bc, 0x7d6660, 1.2, 0.3, 0x93a9bd],
  [1140, 0x5a5e9e, 0xd99aa6, 0xff9a7a, 1.3, 0xc0b2e0, 0x655868, 1.35, 0.75, 0x6a7cab],
  [1260, 0x22325f, 0x445488, 0xc0ccff, 1.2, 0x98a8dc, 0x685a6e, 1.9, 1, 0x5a88b2],
  [1440, 0x1e2c58, 0x3f4f80, 0xb4c2ff, 1.15, 0x94a2d8, 0x64566a, 1.85, 1, 0x5a88b2],
];

export function createEnvironment(THREE, scene, { reduced, quality, cityCenter }) {
  const noise = new SimplexNoise({ random: mulberry(7) });
  const env = { night: 0, uniforms: { uNight: { value: 0 }, uTime: { value: 0 } }, stats: {} };
  const cx = cityCenter.x,
    cz = cityCenter.z;

  // ---------- Sky dome ----------
  const skyMat = new THREE.ShaderMaterial({
    side: THREE.BackSide,
    depthWrite: false,
    fog: false,
    uniforms: { uTop: { value: new THREE.Color() }, uHorizon: { value: new THREE.Color() }, uSunDir: { value: new THREE.Vector3(0, 1, 0) }, uSun: { value: new THREE.Color() }, uNight: env.uniforms.uNight },
    vertexShader: `varying vec3 vDir; void main(){ vDir = normalize(position); gl_Position = projectionMatrix*modelViewMatrix*vec4(position,1.0); }`,
    fragmentShader: `uniform vec3 uTop,uHorizon,uSun,uSunDir; uniform float uNight; varying vec3 vDir;
      float hash(vec3 p){ return fract(sin(dot(p, vec3(12.9898,78.233,37.719)))*43758.5453); }
      void main(){
        float h = clamp(vDir.y, -0.2, 1.0);
        vec3 col = mix(uHorizon, uTop, smoothstep(-0.02, 0.55, h));
        float sd = max(dot(normalize(vDir), normalize(uSunDir)), 0.0);
        col += uSun * pow(sd, 18.0) * 0.35 * (1.0 - uNight*0.6);
        vec3 cell = floor(vDir*180.0);
        float star = step(0.9965, hash(cell)) * smoothstep(0.08, 0.5, h) * uNight;
        col += vec3(star*0.8);
        gl_FragColor = vec4(col, 1.0);
      }`,
  });
  const sky = new THREE.Mesh(new THREE.SphereGeometry(170, 32, 16), skyMat);
  sky.position.set(cx, 0, cz);
  sky.renderOrder = -10;
  scene.add(sky);
  scene.fog = new THREE.Fog(0xf4eee3, 42, 150);

  // ---------- Lights ----------
  const hemi = new THREE.HemisphereLight(0xeef6fa, 0x8f8270, 1.3);
  scene.add(hemi);
  const sun = new THREE.DirectionalLight(0xfff1de, 2.8);
  sun.castShadow = true;
  const sm = quality === "high" ? 2048 : 1024;
  sun.shadow.mapSize.set(sm, sm);
  Object.assign(sun.shadow.camera, { left: -20, right: 20, top: 22, bottom: -22, near: 1, far: 90 });
  sun.shadow.bias = -0.0006;
  sun.shadow.normalBias = 0.045;
  sun.shadow.radius = 3;
  sun.target.position.set(cx, 0, cz);
  scene.add(sun, sun.target);
  const fill = new THREE.DirectionalLight(0xbfd6ff, 0.35);
  fill.position.set(cx + 20, 18, cz - 25);
  scene.add(fill);

  // ---------- Water ----------
  const waterMat = new THREE.ShaderMaterial({
    fog: true,
    transparent: false,
    uniforms: THREE.UniformsUtils.merge([THREE.UniformsLib.fog, { uColor: { value: new THREE.Color(0xa4d4da) }, uDeep: { value: new THREE.Color(0x6fa9b8) }, uTime: { value: 0 }, uNight: { value: 0 }, uCenter: { value: new THREE.Vector2(cx, cz) } }]),
    vertexShader: `#include <fog_pars_vertex>
      varying vec3 vW; void main(){ vec4 w = modelMatrix*vec4(position,1.0); vW = w.xyz; vec4 mvPosition = viewMatrix*w; gl_Position = projectionMatrix*mvPosition;
      #include <fog_vertex>
      }`,
    fragmentShader: `#include <fog_pars_fragment>
      uniform vec3 uColor,uDeep; uniform float uTime,uNight; uniform vec2 uCenter; varying vec3 vW;
      void main(){
        float d = length(vW.xz-uCenter);
        // calm, anti-aliased stylised water: broad colour drift + soft swell, glints fade out where they would alias
        float w1 = sin(vW.x*0.35 + uTime*0.35 + sin(vW.z*0.27)) * sin(vW.z*0.31 - uTime*0.28);
        float w2 = sin((vW.x*0.6+vW.z)*1.1 + uTime*0.7) * sin(vW.x*0.9 - vW.z*0.4);
        float aa = clamp(1.0 - fwidth(w2) * 3.0, 0.0, 1.0);
        vec3 col = mix(uColor, uDeep, smoothstep(9.0, 38.0, d) * 0.5);
        col = mix(col, uColor * 1.06, (1.0 - smoothstep(4.0, 12.0, d)) * 0.25);
        col += w1 * 0.018 + w2 * 0.006 * aa;
        float glint = smoothstep(0.975, 1.0, w2 * 0.5 + 0.5) * 0.06 * (1.0 - uNight) * aa * (1.0 - smoothstep(18.0, 40.0, d));
        col += glint;
        gl_FragColor = vec4(col,1.0);
        #include <fog_fragment>
      }`,
  });
  const water = new THREE.Mesh(new THREE.CircleGeometry(160, 64), waterMat);
  water.rotation.x = -Math.PI / 2;
  water.position.set(cx, WATER_Y, cz);
  water.receiveShadow = false;
  scene.add(water);
  env.water = water;
  env.waterMat = waterMat;

  // ---------- Basin terrain (abstract Taipei basin rim) ----------
  // Directions: -z north (Yangmingshan/Qixing), +x east (Nangang hills), -x west (Guanyin across the river), +z south (Maokong terraces).
  const features = [
    { x: cx - 12, z: cz - 42, r: 13, h: 8, shape: "dome" }, // Qixing-like volcanic dome
    { x: cx + 6, z: cz - 42, r: 16, h: 7, shape: "ridge" },
    { x: cx - 26, z: cz - 32, r: 12, h: 8, shape: "ridge" },
    { x: cx - 37, z: cz - 6, r: 9, h: 8.5, shape: "dome" }, // Guanyin-like reclining peaks
    { x: cx - 40, z: cz + 3, r: 8, h: 7, shape: "dome" },
    { x: cx - 35, z: cz + 11, r: 7, h: 5.5, shape: "dome" },
    { x: cx + 31, z: cz - 13, r: 11, h: 6, shape: "ridge" }, // Nangang / four-beast hills
    { x: cx + 36, z: cz + 5, r: 10, h: 5, shape: "ridge" },
    { x: cx + 27, z: cz + 26, r: 14, h: 5.5, shape: "terrace" }, // Maokong tea terraces
    { x: cx - 5, z: cz + 46, r: 18, h: 5, shape: "ridge" },
  ];
  const size = 170,
    seg = quality === "low" ? 120 : quality === "medium" ? 160 : 210;
  const tg = new THREE.PlaneGeometry(size, size, seg, seg);
  tg.rotateX(-Math.PI / 2);
  const pos = tg.attributes.position,
    col = new Float32Array(pos.count * 3);
  const C = (h) => new THREE.Color(h);
  const cShore = C(0xd9c9a3),
    cField = C(0xaec493),
    cGrass = C(0xa3b986),
    cForest = C(0x6f8a62),
    cForest2 = C(0x5d7656),
    cRock = C(0xb2a38d),
    cTea = C(0x93ad74),
    cBed = C(0x8fb3ad);
  // A9: the whole basin rim sits at 2/3 of its former distance; the camera-facing (+z) side is kept low
  const K = 2 / 3;
  const heightAt = (wx, wz) => {
    const x = cx + (wx - cx) / K,
      z = cz + (wz - cz) / K;
    const dx = x - cx,
      dz = (z - cz) * 0.92;
    const d = Math.hypot(dx, dz);
    let rim = smooth(25, 50, d);
    let h = -1.6 + rim * (3.5 + 6 * fbm(noise, x * 0.03, z * 0.03, 4) + 2.2 * Math.abs(noise.noise(x * 0.07, z * 0.07)));
    for (const f of features) {
      const fd = Math.hypot(x - f.x, (z - f.z) * (f.shape === "ridge" ? 1.6 : 1));
      if (fd > f.r * 1.6) continue;
      let k = Math.max(0, 1 - fd / f.r);
      k = f.shape === "dome" ? Math.pow(k, 1.25) * (1 - 0.15 * Math.pow(1 - k, 6)) : k * k * (3 - 2 * k);
      let fh = f.h * k * (0.85 + 0.25 * noise.noise(x * 0.11, z * 0.11));
      if (f.shape === "terrace") fh = Math.floor(fh / 0.55) * 0.55 + Math.min(0.12, fh % 0.55);
      h += fh;
    }
    // keep the foreground (toward the default camera) as low coastal hills so it never hides the city
    const ang = Math.atan2(wx - cx, wz - cz); // 0 = +z (camera side)
    const front = Math.max(0, Math.cos(ang - 0.27));
    if (h > 0) h *= 1 - 0.72 * Math.pow(front, 2.2);
    return h;
  };
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i) + cx,
      z = pos.getZ(i) + cz;
    const h = heightAt(x, z);
    pos.setXYZ(i, x, h, z);
  }
  tg.computeVertexNormals();
  const nrm = tg.attributes.normal;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i),
      y = pos.getY(i),
      z = pos.getZ(i),
      slope = 1 - nrm.getY(i);
    const n = noise.noise(x * 0.25, z * 0.25) * 0.5 + 0.5;
    let c;
    if (y < WATER_Y + 0.02) c = cBed.clone();
    else if (y < WATER_Y + 0.18) c = cShore.clone().lerp(cField, smooth(WATER_Y + 0.04, WATER_Y + 0.18, y));
    else if (y < 2.2) c = cField.clone().lerp(cGrass, smooth(0.2, 1.6, y) * 0.8 + n * 0.2);
    else if (y < 9) c = cGrass.clone().lerp(n > 0.5 ? cForest : cForest2, smooth(1.6, 4, y));
    else c = cForest2.clone().lerp(cRock, smooth(9, 14, y));
    // meadow clearings, shaded gullies and lit ridges so slopes are not one flat green wall
    const patch = noise.noise(x * 0.11 + 7, z * 0.11 - 3);
    if (y > 1.2 && y < 7 && patch > 0.45) c.lerp(new THREE.Color(0xb3c48c), 0.45);
    const nx = nrm.getX(i), nz = nrm.getZ(i);
    const facing = (nx * 0.3 + nz * 0.85); // faces toward the default camera / sun side
    c.offsetHSL(0, 0, facing * 0.035);
    if (slope > 0.35 && y > 2.5) c.lerp(cRock, 0.3 + (slope - 0.35) * 0.8);
    const tea = Math.hypot(x - (cx + 27 * K), z - (cz + 26 * K)) < 16 * K && y > 0.6;
    if (tea) c.lerp(cTea, 0.5 + 0.3 * (Math.sin(y * 11) * 0.5 + 0.5));
    c.offsetHSL(0, 0, (n - 0.5) * 0.05);
    col[i * 3] = c.r;
    col[i * 3 + 1] = c.g;
    col[i * 3 + 2] = c.b;
  }
  tg.setAttribute("color", new THREE.BufferAttribute(col, 3));
  const terrain = new THREE.Mesh(tg, new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.95, flatShading: true }));
  terrain.receiveShadow = true;
  scene.add(terrain);
  env.terrain = terrain;

  // Forest instancing on the rim
  const rnd = mulberry(11);
  const lumpy = (r, det, seed) => {
    const g = new THREE.IcosahedronGeometry(r, det);
    const p = g.attributes.position, v = new THREE.Vector3();
    for (let i = 0; i < p.count; i++) {
      v.fromBufferAttribute(p, i);
      const n = Math.sin(v.x * 17.1 + v.y * 41.3 + v.z * 23.7 + seed) * 43758.5;
      v.multiplyScalar(1 + ((n - Math.floor(n)) - 0.5) * 0.22);
      p.setXYZ(i, v.x, v.y, v.z);
    }
    g.computeVertexNormals();
    return g;
  };
  const treeGeoA = mergeGeometries([
    new THREE.ConeGeometry(0.5, 0.95, 7).translate(0, 0.72, 0),
    new THREE.ConeGeometry(0.38, 0.8, 7).translate(0, 1.12, 0),
    new THREE.ConeGeometry(0.24, 0.6, 7).translate(0, 1.45, 0),
  ]);
  const treeGeoB = mergeGeometries([lumpy(0.48, 0, 1).translate(0, 0.78, 0), lumpy(0.36, 0, 2).translate(0.28, 0.64, 0.08), lumpy(0.34, 0, 3).translate(-0.24, 0.66, -0.1), lumpy(0.3, 0, 4).translate(0.05, 1.08, 0.04)]);
  const treeMax = quality === "low" ? 2400 : quality === "medium" ? 4200 : 7000;
  const tA = new THREE.InstancedMesh(treeGeoA, new THREE.MeshStandardMaterial({ roughness: 0.9, flatShading: true }), treeMax);
  const tB = new THREE.InstancedMesh(treeGeoB, new THREE.MeshStandardMaterial({ roughness: 0.9, flatShading: true }), Math.round(treeMax * 0.45));
  const dummy = new THREE.Object3D();
  let na = 0,
    nb = 0;
  const treeCols = [0x6f8a62, 0x7f9a6a, 0x88a173, 0x6a8460, 0x93aa7a].map((h) => new THREE.Color(h));
  const nbMax = Math.round(treeMax * 0.45);
  for (let k = 0; k < treeMax * 40 && na + nb < treeMax + nbMax - 2; k++) {
    const x = cx + (rnd() - 0.5) * size * 0.9,
      z = cz + (rnd() - 0.5) * size * 0.9;
    const d = Math.hypot(x - cx, (z - cz) * 0.92);
    if (d < 16 || d > 52) continue;
    const y = heightAt(x, z);
    if (y < 0.5 || y > 12.5) continue;
    if (Math.hypot(x - (cx + 27 * K), z - (cz + 26 * K)) < 13 * K && rnd() < 0.85) continue; // tea terraces stay open
    const grove = noise.noise(x * 0.09, z * 0.09);
    const density = smooth(0.5, 2.0, y) * (grove > 0.0 ? 1.0 : grove > -0.3 ? 0.5 : 0.14);
    if (rnd() > density) continue;
    const s = 0.3 + rnd() * 0.32;
    dummy.position.set(x, y - 0.12, z);
    dummy.scale.set(s, s * (0.8 + rnd() * 0.5), s);
    dummy.rotation.set(0, rnd() * 6.28, 0);
    dummy.updateMatrix();
    const c = treeCols[Math.floor(rnd() * treeCols.length)].clone().offsetHSL(0, 0, (rnd() - 0.5) * 0.06 - smooth(3, 10, y) * 0.06);
    if ((rnd() < (y > 4 ? 0.75 : 0.4)) && na < treeMax) {
      tA.setMatrixAt(na, dummy.matrix);
      tA.setColorAt(na++, c);
    } else if (nb < nbMax) {
      tB.setMatrixAt(nb, dummy.matrix);
      tB.setColorAt(nb++, c);
    }
  }
  // rock outcrops on steeper / higher ground
  const rockGeo = new THREE.DodecahedronGeometry(0.8, 0);
  const rocks = new THREE.InstancedMesh(rockGeo, new THREE.MeshStandardMaterial({ color: 0x9d968a, roughness: 1, flatShading: true }), 260);
  let nr = 0;
  for (let k = 0; k < 6000 && nr < 260; k++) {
    const x = cx + (rnd() - 0.5) * size * 0.9,
      z = cz + (rnd() - 0.5) * size * 0.9;
    const y = heightAt(x, z);
    if (y < 3.5) continue;
    const sl = Math.abs(heightAt(x + 0.8, z) - y) + Math.abs(heightAt(x, z + 0.8) - y);
    if (sl < 0.7 && rnd() > 0.15) continue;
    const s = 0.35 + rnd() * 0.8;
    dummy.position.set(x, y - 0.5 * s, z);
    dummy.scale.set(s * (0.9 + rnd() * 0.4), s * 0.8, s * (0.9 + rnd() * 0.3));
    dummy.rotation.set(rnd() * 0.3, rnd() * 6, rnd() * 0.3);
    dummy.updateMatrix();
    rocks.setMatrixAt(nr++, dummy.matrix);
  }
  rocks.count = nr;
  rocks.receiveShadow = true;
  scene.add(rocks);
  tA.count = na;
  tB.count = nb;
  // short trunks under the round trees so none float
  const trunkGeo = new THREE.CylinderGeometry(0.09, 0.12, 0.5, 5);
  trunkGeo.translate(0, 0.2, 0);
  const trunks = new THREE.InstancedMesh(trunkGeo, new THREE.MeshStandardMaterial({ color: 0x7a5d44, roughness: 1 }), nb + na);
  const mtmp = new THREE.Matrix4();
  for (let n = 0; n < nb; n++) {
    tB.getMatrixAt(n, mtmp);
    trunks.setMatrixAt(n, mtmp);
  }
  for (let n = 0; n < na; n++) {
    tA.getMatrixAt(n, mtmp);
    trunks.setMatrixAt(nb + n, mtmp);
  }
  // 2026-10-26: the hillside forest (~900K triangles) was three InstancedMeshes drawn whole every frame, even in
  // close-ups where none of it is on screen. Split each into sectors around the city (12 directions × near/far ring)
  // so the camera culls what it does not see.
  const sectorOf = (x, z) => {
    const a = Math.atan2(z - cz, x - cx);
    const sec = Math.floor(((a + Math.PI) / (Math.PI * 2)) * 12) % 12;
    return sec * 2 + (Math.hypot(x - cx, z - cz) > 32 ? 1 : 0);
  };
  const splitForest = (mesh, receive) => {
    const groups = new Map();
    const m = new THREE.Matrix4(), c = new THREE.Color(), v = new THREE.Vector3();
    for (let i = 0; i < mesh.count; i++) {
      mesh.getMatrixAt(i, m);
      v.setFromMatrixPosition(m);
      const k = sectorOf(v.x, v.z);
      if (!groups.has(k)) groups.set(k, []);
      groups.get(k).push(i);
    }
    const out = [];
    for (const idx of groups.values()) {
      const g = new THREE.InstancedMesh(mesh.geometry, mesh.material, idx.length);
      idx.forEach((i, n) => {
        mesh.getMatrixAt(i, m);
        g.setMatrixAt(n, m);
        if (mesh.instanceColor) {
          mesh.getColorAt(i, c);
          g.setColorAt(n, c);
        }
      });
      g.castShadow = false;
      g.receiveShadow = receive;
      g.computeBoundingSphere();
      scene.add(g);
      out.push(g);
    }
    return out;
  };
  const forestParts = [...splitForest(trunks, false), ...splitForest(tA, true), ...splitForest(tB, true)];

  // (A8) no real-landmark silhouettes in the scene

  // ---------- A1: hillside village lights (night only) ----------
  const villageMat = new THREE.MeshBasicMaterial({ color: 0xffd38a, transparent: true, opacity: 0, fog: false });
  const villageGeo = new THREE.SphereGeometry(0.07, 6, 4);
  const villages = new THREE.InstancedMesh(villageGeo, villageMat, 260);
  {
    const vr = mulberry(31);
    const m4 = new THREE.Matrix4();
    let nv = 0;
    for (let k = 0; k < 6000 && nv < 260; k++) {
      const a = vr() * Math.PI * 2,
        r = 17 + vr() * 26;
      const x = cx + Math.sin(a) * r,
        z = cz + Math.cos(a) * r;
      const y = heightAt(x, z);
      if (y < 0.3 || y > 7) continue;
      // clustered hamlets: accept points near a few cluster centres
      if (Math.sin(a * 7.0 + r * 0.45) < 0.55) continue;
      m4.makeTranslation(x, y + 0.12, z);
      villages.setMatrixAt(nv++, m4);
    }
    villages.count = nv;
  }
  scene.add(villages);
  // warm light reflections on the water around the city (night only)
  const reflTex = (() => {
    const c = document.createElement("canvas");
    c.width = 16;
    c.height = 64;
    const g = c.getContext("2d");
    const grd = g.createLinearGradient(0, 0, 0, 64);
    grd.addColorStop(0, "rgba(255,206,140,0)");
    grd.addColorStop(0.5, "rgba(255,206,140,1)");
    grd.addColorStop(1, "rgba(255,206,140,0)");
    g.fillStyle = grd;
    g.fillRect(0, 0, 16, 64);
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
  })();
  const reflMat = new THREE.MeshBasicMaterial({ map: reflTex, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false, fog: false });
  const refl = new THREE.InstancedMesh(new THREE.PlaneGeometry(0.12, 1.4).rotateX(-Math.PI / 2), reflMat, 90);
  {
    const rr = mulberry(57);
    const m4 = new THREE.Matrix4(),
      q = new THREE.Quaternion();
    for (let k = 0; k < 90; k++) {
      const a = (k / 90) * Math.PI * 2 + rr() * 0.05,
        r = 6.5 + rr() * 3.5;
      q.setFromAxisAngle(new THREE.Vector3(0, 1, 0), a);
      m4.compose(new THREE.Vector3(cx + Math.sin(a) * r, WATER_Y + 0.02, cz + Math.cos(a) * r), q, new THREE.Vector3(1, 1, 0.6 + rr() * 0.8));
      refl.setMatrixAt(k, m4);
    }
  }
  refl.renderOrder = 2;
  // (night water streaks read as rendering glitches from high views — not added to the scene)
  // ---------- Far ridgelines (layered, hazier with distance) ----------
  const ridgeLayers = [];
  for (const [rad, hmin, hmax, seed, tint] of [
    [74 * K, 9, 17, 3, 0.3],
    [100 * K, 12, 23, 9, 0.55],
    [130 * K, 15, 30, 17, 0.78],
  ]) {
    const segs = 220;
    const posR = [],
      idxR = [];
    for (let k = 0; k <= segs; k++) {
      const a = (k / segs) * Math.PI * 2;
      const n = fbm(noise, Math.cos(a) * 3 + seed, Math.sin(a) * 3 - seed, 5);
      const peak = Math.pow(Math.abs(noise.noise(Math.cos(a) * 9 + seed, Math.sin(a) * 9)), 0.7);
      const h = hmin + (hmax - hmin) * (0.55 * n + 0.45 * peak);
      const x = cx + Math.cos(a) * rad,
        z = cz + Math.sin(a) * rad * 0.92;
      posR.push(x, -2, z, x, h, z);
      if (k < segs) {
        const i = k * 2;
        idxR.push(i, i + 1, i + 2, i + 1, i + 3, i + 2);
      }
    }
    const gR = new THREE.BufferGeometry();
    gR.setAttribute("position", new THREE.Float32BufferAttribute(posR, 3));
    gR.setIndex(idxR);
    const mR = new THREE.MeshBasicMaterial({ color: 0x8fa6a8, fog: false, side: THREE.DoubleSide });
    const meshR = new THREE.Mesh(gR, mR);
    meshR.renderOrder = -5;
    scene.add(meshR);
    ridgeLayers.push({ mesh: meshR, mat: mR, tint });
  }
  // ---------- Clouds ----------
  const cloudMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 1, emissive: 0xfff4ea, emissiveIntensity: 0.25 });
  const cloudGeo = new THREE.IcosahedronGeometry(1, 2);
  const clouds = new THREE.Group();
  const cr = mulberry(23);
  const cloudCount = 12;
  let lobes = 0;
  const cloudList = [];
  for (let k = 0; k < cloudCount; k++) {
    const g = new THREE.Group();
    const n = 6 + Math.floor(cr() * 6);
    const w = 2.4 + cr() * 2.6;
    for (let j = 0; j < n; j++) {
      const m = new THREE.Mesh(cloudGeo, cloudMat);
      const t = j / (n - 1) - 0.5;
      const s = (0.8 + cr() * 0.8) * (1 - Math.abs(t) * 0.9);
      m.position.set(t * w * 2 + (cr() - 0.5) * 0.6, s * 0.35 + cr() * 0.4, (cr() - 0.5) * 1.6);
      m.scale.set(s * 1.25, s * 0.9, s * 1.05);
      g.add(m);
      lobes++;
    }
    // a few lower, offset lobes so the underside is irregular rather than flat
    for (let j = 0; j < 3; j++) {
      const m = new THREE.Mesh(cloudGeo, cloudMat);
      const s = 0.45 + cr() * 0.35;
      m.position.set((cr() - 0.5) * w * 1.4, -0.12 - cr() * 0.18, (cr() - 0.5) * 1.2);
      m.scale.set(s * 1.3, s * 0.7, s);
      g.add(m);
    }
    const near = false;
    const ang = near ? -Math.PI * 0.9 + (k - cloudCount + 4) * 0.55 : -Math.PI * 0.95 + (k / cloudCount) * Math.PI * 1.25 + (cr() - 0.5) * 0.3;
    const rad = near ? 12 + cr() * 3 : 18 + cr() * 14;
    g.position.set(cx + Math.cos(ang) * rad, near ? 6.2 + cr() : (k % 3 === 0 ? 7.5 : k % 2 ? 9 : 11.5) + cr() * 2, cz + Math.sin(ang) * rad * 0.9 - (near ? 2 : 8));
    if (near) g.scale.setScalar(0.45);
    g.userData = { speed: 0.15 + cr() * 0.2, home: g.position.x };
    if (!near) g.scale.setScalar(0.8 + cr() * 0.4);
    clouds.add(g);
    cloudList.push(g);
  }
  scene.add(clouds);
  env.ridgeMeanDist = (74 + 100 + 130) / 3 * K;
  env.ridgeMeanDistBase = (74 + 100 + 130) / 3;
  env.stats = { ridgeMeanDist: (74 + 100 + 130) / 3 * K, ridgeMeanDistBase: (74 + 100 + 130) / 3, landmark: false, clouds: cloudCount, minLobes: Math.min(...cloudList.map((g) => g.children.length)), terrainTriangles: seg * seg * 2, trees: na + nb };

  // Low morning mist layer
  const mistTex = makeMistTexture(THREE);
  const mistMat = new THREE.MeshBasicMaterial({ map: mistTex, transparent: true, opacity: 0, depthWrite: false, fog: false });
  const mist = new THREE.Group();
  for (let k = 0; k < 7; k++) {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(36, 9), mistMat);
    m.rotation.x = -Math.PI / 2;
    m.position.set(cx + (k - 3) * 7, 0.4 + k * 0.05, cz - 18 + (k % 3) * 6);
    mist.add(m);
  }
  // mist planes read as stripes over the sea from high views; keep the group (API) but never show it
  mist.visible = false;

  const ca = new THREE.Color(),
    cb = new THREE.Color();
  function lerpKey(min) {
    let i = 0;
    while (i < KEYS.length - 2 && KEYS[i + 1][0] <= min) i++;
    const a = KEYS[i],
      b = KEYS[i + 1],
      t = (min - a[0]) / (b[0] - a[0]);
    const mix = (p, q) => ca.setHex(p).lerp(cb.setHex(q), t).clone();
    return {
      top: mix(a[1], b[1]),
      horizon: mix(a[2], b[2]),
      sunC: mix(a[3], b[3]),
      sunI: a[4] + (b[4] - a[4]) * t,
      hs: mix(a[5], b[5]),
      hg: mix(a[6], b[6]),
      hi: a[7] + (b[7] - a[7]) * t,
      night: a[8] + (b[8] - a[8]) * t,
      water: mix(a[9], b[9]),
    };
  }
  env.setTime = (minutes) => {
    const k = lerpKey(((minutes % 1440) + 1440) % 1440);
    skyMat.uniforms.uTop.value.copy(k.top);
    skyMat.uniforms.uHorizon.value.copy(k.horizon);
    skyMat.uniforms.uSun.value.copy(k.sunC);
    if (scene.fog) scene.fog.color.copy(k.horizon);
    hemi.color.copy(k.hs);
    hemi.groundColor.copy(k.hg);
    hemi.intensity = k.hi;
    sun.color.copy(k.sunC);
    sun.intensity = k.sunI;
    // sun arc: rises east (+x), sets west, always from the camera-facing side for readable shadows
    // sun direction moves in 10-minute steps so the shadow map does not shimmer while time plays
    const tq = Math.round(minutes / 10) * 10;
    const t = (tq - 360) / 720;
    const az = Math.PI * (0.15 + 0.7 * Math.min(1, Math.max(0, t)));
    const el = 0.35 + Math.sin(Math.min(1, Math.max(0, t)) * Math.PI) * 0.75;
    const dir = new THREE.Vector3(Math.cos(az) * Math.cos(el), Math.sin(el), 0.55 * Math.cos(el) + 0.35).normalize();
    sun.position.set(cx + dir.x * 40, dir.y * 40, cz + dir.z * 40);
    skyMat.uniforms.uSunDir.value.copy(dir);
    waterMat.uniforms.uColor.value.copy(k.water);
    waterMat.uniforms.uDeep.value.copy(k.water).multiplyScalar(0.72);
    waterMat.uniforms.uNight.value = k.night;
    env.night = k.night;
    env.uniforms.uNight.value = k.night;
    for (const r of ridgeLayers) r.mat.color.setHex([0x5f826c, 0x7b98a0, 0x9fb4c4][ridgeLayers.indexOf(r)]).lerp(k.horizon, r.tint * 0.75).lerp(new THREE.Color(0x101830), k.night * 0.35);
    cloudMat.color.copy(k.horizon).lerp(new THREE.Color(0xffffff), 0.65 - k.night * 0.35).lerp(new THREE.Color(0x8e9bb5), k.night * 0.7);
    cloudMat.emissive.copy(k.sunC).lerp(new THREE.Color(0x9aa3b4), k.night);
    cloudMat.emissiveIntensity = 0.12 + (1 - k.night) * 0.12;
    const morning = Math.max(0, 1 - Math.abs(minutes - 400) / 110);
    mistMat.opacity = 0;
    villageMat.opacity = k.night;
    reflMat.opacity = Math.max(0, k.night - 0.8) * 1.2;
    env.timeInfo = k;
  };
  env.cullClouds = (cam) => {
    // never let a cloud sit right in front of the lens (orbit / low views)
    for (const g of cloudList) g.visible = g.position.distanceTo(cam.position) > 9 + g.scale.x * 3;
  };
  env.update = (dt, motion) => {
    if (!motion) return;
    env.uniforms.uTime.value += dt;
    waterMat.uniforms.uTime.value += dt;
    for (const g of cloudList) {
      g.position.x += g.userData.speed * dt;
      if (g.position.x > g.userData.home + 18) g.position.x = g.userData.home - 18;
    }
  };
  env.setVisible = (v) => {
    for (const o of [sky, water, terrain, ...forestParts, clouds, ...ridgeLayers.map((r) => r.mesh)]) o.visible = v;
    scene.fog = v ? scene.fog || new THREE.Fog(0xf4eee3, 42, 150) : null;
  };
  env.heightAt = heightAt;
  env.sun = sun;
  env.hemi = hemi;
  return env;
}

function smooth(a, b, x) {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
}
function fbm(n, x, z, o) {
  let s = 0,
    a = 0.5,
    f = 1;
  for (let i = 0; i < o; i++) {
    s += a * n.noise(x * f, z * f);
    f *= 2;
    a *= 0.5;
  }
  return s * 0.5 + 0.5;
}
export function mulberry(a) {
  return function () {
    let t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function makeMistTexture(THREE) {
  const c = document.createElement("canvas");
  c.width = 256;
  c.height = 64;
  const g = c.getContext("2d");
  const grd = g.createRadialGradient(128, 32, 4, 128, 32, 128);
  grd.addColorStop(0, "rgba(255,255,255,0.9)");
  grd.addColorStop(1, "rgba(255,255,255,0)");
  g.fillStyle = grd;
  g.fillRect(0, 0, 256, 64);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}
