import { sceneSpecs, createPolicyModel } from "./scene-models.js?v=20261030-2";
import { createKit } from "./kit.js?v=20261026-1";
import { createEnvironment } from "./environment.js?v=20261026-1";
import { buildIslands, buildGraph, resolveIslandPlacements, hexVertex, GROUND, R, TOP } from "./world.js?v=20261030-3";
import { buildDecor, bez } from "./decor.js?v=20261030-3";
import { createPeople, ROLE_LABEL, CARRY_LABEL } from "./people.js?v=20261030-3";
import { icon, HEART_COLORS } from "./icons.js?v=20261023-1";
import { track } from "./analytics.js?v=20261022-4";
import { createResolutionGovernor } from "./resolution.js?v=20261025-2";
const $ = (s) => document.querySelector(s),
  $$ = (s) => [...document.querySelectorAll(s)];
const params = new URLSearchParams(location.search),
  english = params.get("lang") === "en",
  portrait = params.get("ratio") === "9x16";
const reduced = matchMedia("(prefers-reduced-motion: reduce)"),
  app = $("#app");
const tr = (zh, en) => (english ? en : zh),
  txt = (v) => (typeof v === "string" ? v : (english ? v?.en || v?.zh : v?.zh) || "");
const esc = (v) => String(v ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
if (portrait) document.body.classList.add("ratio");
if (english) {
  document.documentElement.lang = "en";
  $$("[data-en]").forEach((e) => (e.innerHTML = e.dataset.en));
  $("#search").placeholder = "Search policies, keywords…";

  $$(".tg").forEach((b) => {
    const t = b.querySelector("span")?.dataset.en;
    if (t) {
      b.title = t;
      b.setAttribute("aria-label", t);
    }
  });
  const tn = { 360: "Dawn", 720: "Day", 1080: "Dusk", 1260: "Night" };
  $$("[data-time]").forEach((b) => {
    b.title = tn[b.dataset.time];
    b.setAttribute("aria-label", tn[b.dataset.time]);
  });
}
try {
  const [THREE, { OrbitControls }, { CSS2DRenderer, CSS2DObject }, D] = await Promise.all([
    import("../vendor/three/build/three.module.js"),
    import("../vendor/three/examples/jsm/controls/OrbitControls.js"),
    import("../vendor/three/examples/jsm/renderers/CSS2DRenderer.js"),
    fetch("./policies.json?v=20261030-2").then((r) => {
      if (!r.ok) throw Error(`policies.json: ${r.status}`);
      return r.json();
    }),
  ]);
  window.__HEART_POLICIES__ = D;
  const colors = { coral: 0xe26d2d, ink: 0x2d1e14, cream: 0xfffdfb, yellow: 0xfdedd6, stone: 0xc5b5a7, green: 0x4d8b55, teal: 0x2e6b68 };
  const islands = new Map(D.islands.map((i) => [i.id, i])),
    buildings = new Map(D.islands.flatMap((i) => i.buildings.map((b) => [b.id, { ...b, island: i.id }]))),
    sources = new Map(D.sources.map((s) => [s.id, s])),
    flows = new Map(D.flows.map((f) => [f.id, f])),
    quotes = new Map(D.quotes.map((q) => [q.id, q]));
  const debug = params.get("debug"),
    debugIsland = params.get("island"),
    quality =
      params.get("quality") ||
      (innerWidth <= 800 || /Mobi|Android/i.test(navigator.userAgent) ? "medium" : "high");
  if (debug) document.body.classList.add("debug");
  const scene = new THREE.Scene(),
    stage = $("#stage");
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance", preserveDrawingBuffer: !!debug });
  renderer.setClearColor(0x000000, 0);
  renderer.setPixelRatio(portrait ? 1 : Math.min(devicePixelRatio, quality === "high" ? 1.75 : 1.4));
  renderer.shadowMap.enabled = !debug;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  // 2026-10-25: the shadow map holds only static geometry (buildings, trees, islands); moving people, ferries and the
  // avatar use soft blob shadows instead. So it is re-rendered only when something that casts actually changes —
  // the sun's 10-minute step, or the near-camera detail (LOD) switching — instead of redrawing ~2M triangles every frame.
  renderer.shadowMap.autoUpdate = false;
  renderer.shadowMap.needsUpdate = true;
  let shadowSig = "";
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.0;
  stage.appendChild(renderer.domElement);
  renderer.domElement.tabIndex = 0;
  renderer.domElement.setAttribute(
    "aria-label",
    tr("3D 技能島，可用方向鍵旋轉；右側清單提供完整鍵盤操作", "3D skill islands. Arrow keys rotate; use the index for full keyboard access."),
  );
  const labelRenderer = new CSS2DRenderer();
  labelRenderer.domElement.id = "labels";
  stage.appendChild(labelRenderer.domElement);
  const camera = new THREE.PerspectiveCamera(32, 1, 0.3, 320),
    controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = !reduced.matches;
  controls.dampingFactor = 0.07;
  controls.enablePan = false;
  controls.minPolarAngle = THREE.MathUtils.degToRad(25);
  controls.maxPolarAngle = THREE.MathUtils.degToRad(70);
  controls.minDistance = 3;
  controls.maxDistance = 70;
  controls.maxTargetRadius = 18;

  // ---------- world ----------
  const top = TOP;
  const kit = createKit(THREE, top);
  const { centers, neighbors, bridges, islandViews: islandBodies } = buildIslands(THREE, scene, D, kit, colors);
  const cityCenter = new THREE.Vector3();
  for (const i of D.islands) cityCenter.add(centers.get(i.id));
  cityCenter.divideScalar(D.islands.length);
  const env = createEnvironment(THREE, scene, { reduced, quality, cityCenter });
  const pickables = [],
    visual = kit.visual;
  function tree(x, z, size = 0.55, owner = null) {
    kit.part("trunk", [x, top + size * 0.38, z], [0.09, size * 0.76, 0.09], 0x89705c, owner);
    for (const [dx, dy, dz, ss, c] of [
      [0, 1.02, 0, 0.7, 0x86a56c],
      [-0.25, 0.84, 0.08, 0.52, 0x728f5f],
      [0.24, 0.88, -0.1, 0.55, 0x7f9a6a],
      [0.05, 0.86, 0.26, 0.5, 0x7a9664],
      [0.06, 1.2, 0.04, 0.4, 0xa3bf86],
    ])
      kit.part("leaf", [x + dx * size, top + dy * size, z + dz * size], [ss * size, ss * size * 0.88, ss * size], c, owner, [dx * 5, dz * 7, dy]);
  }
  function roof(x, y, z, w, d, owner) {
    // clean hip roof sitting on a thin eave band of the same footprint
    kit.part("hip", [x, y + 0.012, z], [w, 0.26, d], colors.coral, owner);
    kit.hbox(x, y - 0.13, z, w * 1.02, 0.03, d * 1.02, 0xa34e34, owner);
  }
  function house(x, z, w, h, owner, color = 0xf4ebdd) {
    kit.box(x, top + h / 2, z, w, h, w * 0.8, color, owner);
    roof(x, top + h + 0.13, z, w * 1.16, w * 0.96, owner);
    kit.hbox(x, top + h * 0.25, z + w * 0.415, w * 0.2, h * 0.5, 0.028, colors.ink, owner);
    for (const dx of [-0.29, 0.29]) {
      kit.part("glowbox", [x + w * dx, top + h * 0.67, z + w * 0.41], [w * 0.2, h * 0.26, 0.025], 0xa8c4c2, owner);
      kit.hbox(x + w * dx, top + h * 0.52, z + w * 0.45, w * 0.26, 0.025, 0.075, 0xf4ebdd, owner);
    }
    for (const dz of [-0.2, 0.16]) kit.part("glowbox", [x + w * 0.51, top + h * 0.62, z + w * dz], [0.02, h * 0.29, w * 0.18], 0xa8c4c2, owner);
    kit.hbox(x - w * 0.23, top + h + 0.2, z - w * 0.16, w * 0.12, 0.23, w * 0.14, colors.stone, owner);
  }
  function scaffold() {}
  const buildPolicyModel = createPolicyModel({ part: kit.part, top, colors, tree, house, scaffold });
  const COMPOSE = {};
  const PLOT = {
    schoolyard: 0xe6d8c8,
    farmland: 0xd3c4aa,
    softpad: 0xf4ece4,
    granite: 0xcdbb9f,
    lawn: 0xd3c4aa,
    gravel: 0xb8a07e,
    street: 0xbfb2a0,
    meadow: 0xd3c4aa,
    terracotta: 0xcfa88a,
    garden: 0xd3c4aa,
    forest: 0xc9b99f,
    rubber: 0xd99560,
    boardwalk: 0xa9b8b6,
    alpine: 0xdceaf2,
    desert: 0xe6ca9e,
    courtyard: 0xd9cbb8,
  };
  const districtHeroes = {
    civil: "civil-office",
    institute: "institute-research",
    trails: "trails-north",
    diplomacy: "diplomacy-forum",
    forest: "forest-law",
    sport: "sport-hub",
    card: "card-reading",
    family: "family-hotline",
    youth: "youth-fund",
    education: "education-teachers",
    transport: "transport-school",
    hakka: "hakka-elders",
    welfare: "welfare-elder",
    lunch: "lunch-farm",
  };
  const silhouetteMode = debug === "silhouette";
  for (const i of D.islands) {
    const c = centers.get(i.id);
    kit.setIsland(i.id);
    const comp = COMPOSE[i.id];
    const usesComposition = comp && i.buildings.every((b) => Array.isArray(comp[b.id]));
    const placements = resolveIslandPlacements(i.buildings, comp, districtHeroes[i.id]);
    for (const [b, lx, lz, size, fpk = 0.5, fpz = 0.5] of placements) {
      const x = c.x + lx,
        z = c.z + lz;
      visual.set(b.id, { id: b.id, center: new THREE.Vector3(x, top + 0.35, z), parts: [], size });
      kit.footprints.push({ owner: b.id, island: i.id, minX: x - size * fpk, maxX: x + size * fpk, minZ: z - size * fpz, maxZ: z + size * fpz });
      buildPolicyModel(b.id, x, z, size, usesComposition ? {} : { plot: PLOT[GROUND[i.id]] });
    }
  }
  // Landmark signs on the skill island models
  const SIGNS = {
    'civil-office': ['Obsidian Vault 中樞', 0x7a5ea8],
    'civil-flex': ['自動 Slug 鐘塔', 0x2e6b68],
    'civil-award': ['CI/CD 火箭發射台', 0x44a340],
    'civil-ai': ['Multi-Agent 協作艙', 0xe26d2d],
    'institute-research': ['Geo Story Map 地形館', 0x2e6b68],
    'institute-access': ['Vault Feed Reader', 0x4d8b55],
    'institute-dementia': ['Kanban & Tasks 看板', 0xd97706],
    'institute-child': ['Album Blog 光影稜鏡', 0x7a5ea8],
    'trails-north': ['安娜普納 5,416M 雪峰', 0x38bdf8],
    'trails-history': ['冰島極圈火山口', 0xe26d2d],
    'trails-industry': ['貝加爾湖藍冰洞', 0x0db7ed],
    'trails-east': ['日本劍岳與富士山', 0xd93829],
    'trails-south': ['川西高原紅房子群', 0xb8322a],
    'diplomacy-forum': ['吉薩三大金字塔', 0xd97706],
    'diplomacy-hoboken': ['復活節島摩艾石像', 0xe26d2d],
    'diplomacy-exchange': ['喀什古城與絲路', 0x2e6b68],
    'diplomacy-talent': ['歐亞跨國高鐵列車', 0xe26d2d],
    'forest-law': ['奇萊主北壯闊雲海', 0x4d8b55],
    'forest-parks': ['阿里山神木與小火車', 0xc9362b],
    'forest-consult': ['澎湖玄武岩與石滬', 0x2e6b68],
    'forest-wood': ['高山雙峰野營營地', 0xe26d2d],
    'sport-hub': ['42.195K 馬拉松終點', 0xe26d2d],
    'sport-bus': ['富士山河口湖馬拉松', 0xd93829],
    'sport-river': ['河濱長距離配速綠道', 0x2e6b68],
    'sport-spots': ['碳板跑鞋能量補給站', 0x4d8b55],
    'card-reading': ['巨型精裝書冊圖書館', 0x7a5ea8],
    'card-learning': ['社科歷史圓頂圖書廳', 0x2e6b68],
    'card-sport': ['山岳探險木造書閣', 0xd97706],
    'card-elders': ['深夜露天星空電影院', 0x7a5ea8],
    'family-hotline': ['Habit 3D 打卡矩陣牆', 0x44a340],
    'family-station': ['Way 2 kywk 枯山水', 0x4d8b55],
    'family-manager': ['Weekend Project 工坊', 0x2e6b68],
    'family-respite': ['V60 手沖咖啡玻璃屋', 0xd97706],
    'youth-fund': ['Docker 藍鯨貨櫃叢集', 0x2496ed],
    'youth-ai': ['Kong API 流量閘道', 0x00e5ff],
    'youth-dream': ['高可用資料庫機房', 0x2e6b68],
    'education-teachers': ['3D 發光二元樹雕塑', 0x2e6b68],
    'education-class': ['52 Projects 敏捷工坊', 0xd97706],
    'education-ai': ['RAG 向量神經魔方', 0x7a5ea8],
    'education-usr': ['Clean Code 重構熔爐', 0xe26d2d],
    'transport-school': ['OhMyUtils 機械鍵盤', 0xe26d2d],
    'transport-hub': ['HomeLab 42U 機櫃', 0x2e6b68],
    'transport-bus': ['Git 鐵道調度場', 0x44a340],
    'transport-scooter': ['Mac Studio 工作站', 0xd8dad9],
    'hakka-elders': ['復古相機光影典藏館', 0xd97706],
    'hakka-schools': ['Pinterest 瀑布流畫廊', 0xd97706],
    'hakka-points': ['35mm 底片膠卷時光軸', 0x7a5ea8],
    'hakka-forum': ['黃金時刻追光燈塔', 0xe8c547],
    'welfare-elder': ['2008–2026 時光沙漏', 0x7a5ea8],
    'welfare-respite': ['Now or Never 歲月長河', 0xe26d2d],
    'welfare-home': ['山里山裡松林原木屋', 0x4d8b55],
    'welfare-care': ['五十萬字鋼筆手稿碑', 0xd97706],
    'lunch-farm': ['Surfing 新知碟型雷達塔', 0x2e6b68],
    'lunch-literacy': ['技術衝浪巨浪雕塑', 0x0db7ed],
    'lunch-price': ['互動計算機算盤涼亭', 0xd97706],
    'lunch-subsidy': ['雲端 IDE 衛星發射站', 0x38bdf8],
  };
  const signGroup = new THREE.Group();
  const signPlaneGeo = new THREE.PlaneGeometry(1, 1);
  const postMats = [];
  for (const [id, [label, col]] of Object.entries(SIGNS)) {
    const v = visual.get(id);
    if (!v || silhouetteMode) continue;
    const cv = document.createElement("canvas");
    cv.width = 64 * Math.max(4, label.length + 1);
    cv.height = 96;
    const g = cv.getContext("2d");
    g.fillStyle = "#fffdf8";
    g.beginPath();
    g.roundRect(0, 0, cv.width, cv.height, 18);
    g.fill();
    g.fillStyle = "#" + col.toString(16).padStart(6, "0");
    g.fillRect(0, 0, 22, cv.height);
    g.fillStyle = "#211d1d";
    g.font = "800 56px 'Noto Sans TC','PingFang TC',sans-serif";
    g.textBaseline = "middle";
    g.fillText(label, 40, cv.height / 2 + 2);
    const tex = new THREE.CanvasTexture(cv);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 4;
    const w = Math.min(0.9, 0.085 * label.length + 0.12) * Math.max(0.8, v.size || 0.6),
      h = (w * cv.height) / cv.width;
    const m = new THREE.Mesh(signPlaneGeo, new THREE.MeshStandardMaterial({ map: tex, emissive: 0xffffff, emissiveMap: tex, emissiveIntensity: 0.3, roughness: 0.7, side: THREE.DoubleSide }));
    m.scale.set(w, h, 1);
    const sz = v.size || 0.6;
    m.position.set(v.center.x, top + sz * 0.62 + h / 2, v.center.z + sz * 0.42);
    m.rotation.y = 0.42;
    m.userData.item = id;
    m.userData.island = buildings.get(id)?.island || null;
    signGroup.add(m);
    for (const d of [-w * 0.42, w * 0.42]) postMats.push(new THREE.Matrix4().compose(new THREE.Vector3(v.center.x + d * Math.cos(0.42), top + (sz * 0.62) / 2, v.center.z + sz * 0.42 - d * Math.sin(0.42)), new THREE.Quaternion(), new THREE.Vector3(1, sz * 0.62 + 0.02, 1)));
  }
  const posts = new THREE.InstancedMesh(new THREE.CylinderGeometry(0.012, 0.012, 1, 6), new THREE.MeshStandardMaterial({ color: 0x211d1d }), Math.max(1, postMats.length));
  postMats.forEach((m, n) => posts.setMatrixAt(n, m));
  signGroup.add(posts);
  scene.add(signGroup);
  // Renewal: a construction-site showcase. Decorative only — no counts, floors, areas or dates.
  const renewalGhosts = new THREE.Group();
  var renewalSign = null;
  // 2026-10-15: renewal tile paused and removed from launch; the construction-site showcase lives in app_backup_20261015_prerenewal.js
  // City diplomacy: exchange-cycle board at the pier (text from the policy summary wording)
  {
    const c = centers.get("diplomacy");
    const cv = document.createElement("canvas");
    cv.width = 512;
    cv.height = 256;
    const g = cv.getContext("2d");
    g.fillStyle = "#2f3a46";
    g.fillRect(0, 0, 512, 256);
    g.fillStyle = "#fcea8b";
    g.font = "700 30px 'Noto Sans TC','PingFang TC',sans-serif";
    g.fillText(tr("世界旅圖・遠方航跡", "World Trails · Backpacker"), 26, 52);
    const rows = [
      [tr("啟程", "Depart"), "#e26d2d", tr("223 篇跨國探險指南", "223 Expedition Guides")],
      [tr("快門", "Frame"), "#d97706", tr("491 輯光影故事集", "491 Photo Stories")],
      [tr("沉澱", "Write"), "#2e6b68", tr("把遠方帶回數位花園", "Bring trails into the Vault")],
    ];
    rows.forEach(([k, col, v], n) => {
      const y = 100 + n * 52;
      g.fillStyle = col;
      g.beginPath();
      g.roundRect(26, y - 30, 104, 40, 10);
      g.fill();
      g.fillStyle = "#fff";
      g.font = "700 26px 'Noto Sans TC','PingFang TC',sans-serif";
      g.fillText(k, 44, y);
      g.fillStyle = "#e9eef0";
      g.font = "500 26px 'Noto Sans TC','PingFang TC',sans-serif";
      g.fillText(v, 150, y);
    });
    const tex = new THREE.CanvasTexture(cv);
    tex.colorSpace = THREE.SRGBColorSpace;
    const board = new THREE.Mesh(new THREE.PlaneGeometry(0.62, 0.31), new THREE.MeshStandardMaterial({ map: tex, emissive: 0xffffff, emissiveMap: tex, emissiveIntensity: 0.35, roughness: 0.6 }));
    board.position.set(c.x + 0.55, top + 0.48, c.z + 1.0);
    board.rotation.y = -0.35;
    if (!debug) scene.add(board);
    kit.setIsland("diplomacy");
    kit.decor("diplomacy", "landmark:board", () => {
      for (const d of [-0.27, 0.27]) kit.cyl(c.x + 0.55 + d * Math.cos(0.35), top + 0.24, c.z + 1.0 + d * Math.sin(0.35), 0.02, 0.48, colors.ink);
    });
    kit.footprints.push({ owner: "_board", island: "diplomacy", minX: c.x + 0.25, maxX: c.x + 0.85, minZ: c.z + 0.88, maxZ: c.z + 1.12 });
  }
  // City diplomacy landmark: an upright ∞ sculpture (decorative, echoes the "infinite city" network name)
  {
    const c = centers.get("diplomacy");
    kit.setIsland("diplomacy");
    kit.decor("diplomacy", "landmark:infinity", () => {
      const x = c.x,
        z = c.z - 1.08;
      kit.cyl(x, top + 0.04, z, 0.62, 0.08, 0xe9dcc4);
      for (const s of [-1, 1]) {
        kit.part("torus", [x + s * 0.19, top + 0.36, z], [0.4, 0.4, 1.6], colors.coral, null, [0, 0, 0]);
      }
      kit.sphere(x, top + 0.36, z, 0.06, 0xfcea8b);
      for (const s of [-1, 1]) kit.cyl(x + s * 0.19, top + 0.1, z, 0.03, 0.12, colors.ink);
    });
    kit.footprints.push({ owner: "_landmark", island: "diplomacy", minX: c.x - 0.45, maxX: c.x + 0.45, minZ: c.z - 1.2, maxZ: c.z - 0.96 });
  }
  const routeTags = [];
  const WATER_Y_ = -0.18;
  const decor = silhouetteMode ? { ambientSpots: [] } : buildDecor(THREE, kit, D, centers, neighbors, kit.footprints, colors, { heightAt: env.heightAt });
  if (!silhouetteMode)
    decor.ambientSpots.push(
      ...(centers.has("renewal") ? [
        [-1.02, -0.02],
        [0.98, 0.72],
        [-0.38, -1.05],
        [0.42, -1.02],
      ] : []).map(([x, z]) => ({ role: "worker", island: "renewal", pos: [centers.get("renewal").x + x, 0, centers.get("renewal").z + z], yaw: x * 3, wander: 0.04 })),
      // residents moving boxes once, from the moving truck toward the planned forecourt (renewal: "move only once")
      ...(centers.has("renewal") ? [
        [-0.15, -1.0, 0.0],
        [0.15, 0.05, 0.35],
      ] : []).map(([x, z, yaw]) => ({ role: "citizen", island: "renewal", pos: [centers.get("renewal").x + x, 0, centers.get("renewal").z + z], yaw, wander: 0.1, pose: "boxes" })),
      ...[0, 1].map((k) => ({ role: "hiker", island: "trails", pos: [centers.get("trails").x - 0.4 + k * 0.8, 0, centers.get("trails").z + 1.75], yaw: Math.PI / 2, wander: 0.25 })),
    );
  // warm light pools under lamps at night (additive, decorative)
  const poolTex = (() => {
    const c = document.createElement("canvas");
    c.width = c.height = 64;
    const g = c.getContext("2d");
    const grd = g.createRadialGradient(32, 32, 0, 32, 32, 32);
    grd.addColorStop(0, "rgba(255,214,150,1)");
    grd.addColorStop(1, "rgba(255,214,150,0)");
    g.fillStyle = grd;
    g.fillRect(0, 0, 64, 64);
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
  })();
  const poolMat = new THREE.MeshBasicMaterial({ map: poolTex, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -4, polygonOffsetUnits: -8 });
  const poolGeo = new THREE.PlaneGeometry(1.15, 1.15).rotateX(-Math.PI / 2);
  const pools = new THREE.InstancedMesh(poolGeo, poolMat, Math.max(1, (decor.lampSpots || []).length));
  (decor.lampSpots || []).forEach(([x, y, z], n) => {
    const m = new THREE.Matrix4().makeTranslation(x, Math.max(y, top) + 0.06, z);
    pools.setMatrixAt(n, m);
  });
  pools.renderOrder = 3;
  if (!debug) scene.add(pools);
  // A1: soft warm glow over each island at night + rotating lighthouse beams + string lights
  // warm window spill under every policy model
  const spillMat = new THREE.MeshBasicMaterial({ map: poolTex, color: 0xffc98a, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -4, polygonOffsetUnits: -8 });
  const spill = new THREE.InstancedMesh(new THREE.PlaneGeometry(1, 1).rotateX(-Math.PI / 2), spillMat, visual.size);
  [...visual.values()].forEach((v, n) => spill.setMatrixAt(n, new THREE.Matrix4().compose(new THREE.Vector3(v.center.x, top + 0.065, v.center.z), new THREE.Quaternion(), new THREE.Vector3(2.2 * (v.size || 0.6), 1, 2.2 * (v.size || 0.6)))));
  spill.renderOrder = 3;
  if (!debug) scene.add(spill);
  const islandGlowGeo = new THREE.PlaneGeometry(4.2, 4.2).rotateX(-Math.PI / 2);
  const islandGlowMat = poolMat.clone();
  const islandGlow = new THREE.InstancedMesh(islandGlowGeo, islandGlowMat, D.islands.length);
  D.islands.forEach((i, n) => islandGlow.setMatrixAt(n, new THREE.Matrix4().makeTranslation(centers.get(i.id).x, top + 0.07, centers.get(i.id).z)));
  islandGlow.renderOrder = 3;
  if (!debug) scene.add(islandGlow);
  const beamMat = new THREE.MeshBasicMaterial({ color: 0xfff1c4, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide });
  const beamGeo = new THREE.ConeGeometry(0.45, 2.6, 16, 1, true).translate(0, -1.3, 0).rotateZ(Math.PI / 2);
  const beams = [];
  for (const [x, y, z] of decor.lighthouses || []) {
    const b = new THREE.Mesh(beamGeo, beamMat);
    b.position.set(x, y, z);
    b.renderOrder = 4;
    if (!debug) scene.add(b);
    beams.push(b);
  }
  const stringMat = new THREE.MeshBasicMaterial({ color: 0xffd58a, transparent: true, opacity: 0 });
  const stringGeo = new THREE.SphereGeometry(0.03, 6, 4);
  const strings = new THREE.InstancedMesh(stringGeo, stringMat, Math.max(1, (decor.stringLights || []).length));
  (decor.stringLights || []).forEach(([x, y, z], n) => strings.setMatrixAt(n, new THREE.Matrix4().makeTranslation(x, y, z)));
  if (!debug) scene.add(strings);
  // partner-city name tags at sea-route ends (names from the city-diplomacy policy page only)
  // partner-city name tags removed (2026-10-14); the hill-tower and rowhouse models stay
  // two ferries shuttling out and back along the exchange routes (animation only)
  const ferries = [];
  (decor.routes || []).slice(0, 2).forEach((r, k) => {
    const g = new THREE.Group();
    const hull = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.09, 0.5), new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.6 }));
    hull.position.y = 0.04;
    const cabin = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.1, 0.22), new THREE.MeshStandardMaterial({ color: k % 2 ? 0x3e7c8c : colors.coral, roughness: 0.6 }));
    cabin.position.set(0, 0.13, -0.05);
    const crate = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.07, 0.08), new THREE.MeshStandardMaterial({ color: 0xc9a27a }));
    crate.position.set(0, 0.12, 0.15);
    const lamp = new THREE.Mesh(new THREE.SphereGeometry(0.05, 8, 6), new THREE.MeshBasicMaterial({ color: 0xfff0c2, transparent: true, opacity: 0 }));
    lamp.position.set(0, 0.24, -0.05);
    g.add(hull, cabin, crate, lamp);
    g.traverse((m) => (m.castShadow = false)); // moving: kept out of the static shadow map (a boat's shadow on water is barely visible)
    g.position.set(r.start[0], WATER_Y_ + 0.02, r.start[1]);
    if (!debug) scene.add(g);
    ferries.push({ g, r, phase: k * 0.37, crate, lamp });
  });
  // materials for the instanced kit
  const solidMat = new THREE.MeshStandardMaterial({ roughness: 0.78, metalness: 0 });
  const glowMat = new THREE.MeshStandardMaterial({ roughness: 0.4, emissive: 0xffc777, emissiveIntensity: 0 });
  const setGlow = (v) => {
    glowMat.emissiveIntensity = v;
    for (const m of glowMat.userData.clones || []) m.emissiveIntensity = v;
  };
  const staticMeshes = kit.build(scene, { solid: silhouetteMode ? new THREE.MeshBasicMaterial({ color: 0x000000 }) : solidMat, glow: silhouetteMode ? new THREE.MeshBasicMaterial({ color: 0x000000 }) : glowMat });
  pickables.push(...staticMeshes);
  for (const v of islandBodies.values()) pickables.push(v.top, v.cliff);
  // island sides use the sea's own material, so the edge below the rim reads as water from every angle and time
  if (!debug) for (const v of islandBodies.values()) v.cliff.material = env.waterMat;
  // island labels hang on the front cliff
  const shortNames = { civil: "Vault 中樞", institute: "開源造物", trails: "極境高山", diplomacy: "荒漠古文明", forest: "台灣山林", sport: "跑者馬拉松", card: "書房電影院", family: "生活駭客", youth: "雲原生全端", education: "演算法工坊", transport: "極客工具", hakka: "光影畫廊", welfare: "歲月長河", lunch: "技術情報" };
  const islandViews = new Map();
  for (const i of D.islands) {
    const c = centers.get(i.id),
      body = islandBodies.get(i.id);
    const el = document.createElement("button");
    el.className = "island-label";
    el.innerHTML = `<strong>${String(i.number).padStart(2, "0")}</strong>${esc(english ? txt(i.name) : shortNames[i.id])}`;
    el.setAttribute("aria-label", txt(i.name));
    el.onclick = () => selectIsland(i.id);
    const label = new CSS2DObject(el);
    label.position.set(c.x, top - 0.25, c.z + R + 0.05);
    scene.add(label);
    islandViews.set(i.id, { ...body, label, el });
  }
  const portPositions = { housing: [-7.0, 0.8, 7.5], "street-retail": [-7.7, 0.8, 5.4], police: [7.0, 0.8, 0.8], community: [1.0, 0.8, 12.5], farm: [7.0, 0.8, -6.6] };
  const portViews = new Map();
  for (const p of D.ports) {
    const c = new THREE.Vector3(...portPositions[p.id]);
    centers.set(p.id, c);
    const el = document.createElement("span");
    el.className = "port-label";
    el.textContent = txt(p.name);
    const label = new CSS2DObject(el);
    label.position.copy(c);
    label.visible = false;
    scene.add(label);
    portViews.set(p.id, label);
  }
  // flow edges (same evidence rules as before), drawn along the real walking routes
  const graph = buildGraph(THREE, D, centers, neighbors);
  const paths = [];
  for (const f of D.flows)
    for (const from of f.from)
      for (const to of f.to) {
        if (f.excludedEdges?.includes(to) || from === to) continue;
        const tier = f.edgeNotes?.find((e) => e.to === to)?.tier || f.evidenceTier;
        if (tier === "unverified_no_animation") continue;
        if (!centers.get(from) || !centers.get(to)) continue;
        paths.push({ flow: f.id, from, to, tier });
      }
  const islandsMap = islands;
  // 2026-10-26 彩蛋：技能島守護者大約每 10 次造訪出現 1 次；網址加 ?islandlord 或 #islandlord 可強制出現（預覽、QA 用）
  window.__heartTrack = (name) => track(name);
  const islandLord = Math.random() < 0.1 || /[?&#]islandlord\b/.test(location.search + location.hash);
  const peopleSys = createPeople(THREE, scene, { graph, flowsData: D.flows, paths, islandsMap, centers, top, reduced, quality, colors, ambientSpots: decor.ambientSpots, islandLord });
  for (const m of peopleSys.meshes) pickables.push(m);
  for (const p of paths) {
    if (p.degenerate) continue; // 路線縮在同一座島上（例如 F8 運動 → 社區）：不畫線、不派人（見 people.js）
    const pts = (p.route ? p.route.pts : [centers.get(p.from), centers.get(p.to)]).map((v) => v.clone().setY(top + 0.06));
    const curve = new THREE.CurvePath();
    for (let k = 1; k < pts.length; k++) curve.add(new THREE.LineCurve3(pts[k - 1], pts[k]));
    if (!curve.curves.length) continue;
    const pathMat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      uniforms: { uTime: { value: 0 }, uMode: { value: p.tier === "official_explicit" ? 0 : p.tier === "official_thematic" ? 1 : 2 }, uColor: { value: new THREE.Color(colors.coral) }, uReduced: { value: reduced.matches ? 1 : 0 }, uLen: { value: curve.getLength() } },
      vertexShader: "varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}",
      fragmentShader:
        "varying vec2 vUv;uniform float uTime,uMode,uReduced,uLen;uniform vec3 uColor;void main(){float u=vUv.x*uLen*5.0-uTime*1.4*(1.0-uReduced);if(uMode>1.5&&fract(u)>.3)discard;if(uMode>.5&&uMode<1.5&&fract(u)>.6)discard;float pulse=.6+.4*smoothstep(.0,.5,fract(u*.2));gl_FragColor=vec4(uColor*pulse+.15,.82);}",
    });
    const mesh = new THREE.Mesh(new THREE.TubeGeometry(curve, Math.max(24, pts.length * 6), 0.035, 5, false), pathMat);
    mesh.visible = false;
    mesh.renderOrder = 2;
    mesh.userData = { type: "flow", id: p.flow };
    scene.add(mesh);
    pickables.push(mesh);
    p.mesh = mesh;
  }
  const flowPaths = paths.filter((p) => p.mesh);

  // ---------- debug renders (QA only) ----------
  if (debug) {
    for (const v of islandBodies.values()) {
      v.ring.visible = debug !== "silhouette";
      v.curb.visible = debug !== "silhouette";
    }
    env.setVisible(false);
    for (const m of peopleSys.meshes) m.visible = debug === "ground";
    if (debug === "occupancy" || debug === "silhouette") for (const m of peopleSys.meshes) m.visible = false;
    if (debug === "occupancy") for (const [id, v] of islandBodies) if (id === debugIsland) v.top.material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    if (debug === "silhouette") for (const v of islandBodies.values()) v.top.material = new THREE.MeshBasicMaterial({ color: 0xffffff });
    if (debug !== "ground") for (const v of islandBodies.values()) (v.cliff.visible = false), (v.band.visible = false);
    if (debug !== "ground") {
      renderer.toneMapping = THREE.NoToneMapping;
      scene.add(new THREE.AmbientLight(0xffffff, 1.6));
    }
    if ((debug === "occupancy" || debug === "silhouette") && centers.get(debugIsland)) {
      const c = centers.get(debugIsland);
      const pad = 0.02;
      renderer.localClippingEnabled = false;
      renderer.clippingPlanes = [
        new THREE.Plane(new THREE.Vector3(1, 0, 0), -(c.x - R - pad)),
        new THREE.Plane(new THREE.Vector3(-1, 0, 0), c.x + R + pad),
        new THREE.Plane(new THREE.Vector3(0, 0, 1), -(c.z - R - pad)),
        new THREE.Plane(new THREE.Vector3(0, 0, -1), c.z + R + pad),
      ];
      const s = R * 1.05;
      debugCam = new THREE.OrthographicCamera(-s, s, s, -s, 0.1, 100);
      if (debug === "occupancy") {
        debugCam.position.set(c.x, 30, c.z);
        debugCam.up.set(0, 0, -1);
        debugCam.lookAt(c.x, 0, c.z);
      } else {
        debugCam.top = 3.2;
        debugCam.bottom = -0.2;
        debugCam.position.set(c.x, top + 1.5, c.z + 20);
        debugCam.lookAt(c.x, top + 1.5, c.z);
        debugCam.top = 1.75;
        debugCam.bottom = -1.75;
      }
      debugCam.updateProjectionMatrix();
    }
  }
  const dummy = new THREE.Object3D();
  var debugCam = debugCam || null;
  function setGhosts(v) {
    renewalGhosts.traverse((o) => (o.visible = v));
    renewalGhosts.visible = v;
  }
  setGhosts(false);
  let selectedIsland = null,
    selectedBuilding = null,
    selectedFlows = new Set(),
    selectedHeart = new Set(),
    mode = "day",
    termIndex = 0,
    dayPlaying = false,
    dayMinutes = 600,
    fly = null,
    tourActive = false,
    tourPlaying = false,
    tourSeconds = 0,
    tourCue = -1,
    treeMode = "policies",
    motionTime = 0,
    dirty = true,
    selectedWalker = null;
  let lastTime = performance.now(),
    fpsFrames = 0,
    fpsStart = lastTime,
    fps = 0;
  const safeSel = [".brand", ".hero-note", ".toolbar", ".hud", ".card:not([hidden])", ".controls", ".log.open", ".map-meta", "#sidebar", ".tour-caption", ".tour-controls", ".mascot"];
  let lastClip = -1e9,
    clipSig = "",
    clipCost = 0;
  function labelSignature() {
    // inline styles only (no layout): which CSS2D labels are shown, plus selection, panels and viewport
    let shown = 0;
    for (const el of labelRenderer.domElement.children) if (el.style.display !== "none") shown++;
    return `${shown}|${selectedIsland}|${selectedBuilding}|${[...selectedFlows].join()}|${document.body.className}|${innerWidth}x${innerHeight}`;
  }
  // 2026-10-25 rewrite: same decisions as before, but without layout thrashing. The old version wrote a style and then
  // measured, label by label and offset by offset (dozens of forced layouts per call, ~5ms when following the avatar).
  // Now: (1) read every rect once, (2) work out each label's natural box from its current box minus its current margins
  // (sizes of the shrunk "number only"/"mini" variants are measured once and cached), (3) decide arithmetically,
  // (4) write only what changed. Moving a label by a margin moves its box by exactly that much (labels are absolutely
  // positioned and centred by CSS2DRenderer), so the arithmetic matches what measuring would have returned.
  const boxAt = (cx, cy, w, h, dx = 0, dy = 0) => ({ left: cx - w / 2 + dx, right: cx + w / 2 + dx, top: cy - h / 2 + dy, bottom: cy + h / 2 + dy, width: w, height: h });
  function variantSize(el, cls, key, on = true) {
    // measure the size of a label with a class switched on (e.g. "numonly", "mini") or off (its full size) once;
    // the text never changes, so the cache holds (full sizes are refreshed whenever a label is seen at full size)
    if (el[key]) return el[key];
    const had = el.classList.contains(cls);
    if (had !== on) el.classList.toggle(cls, on);
    const r = el.getBoundingClientRect();
    if (had !== on) el.classList.toggle(cls, had);
    return (el[key] = [r.width, r.height]);
  }
  const setStyle = (el, k, v) => { if (el.style[k] !== v) el.style[k] = v; };
  const setClass = (el, c, on) => { if (el.classList.contains(c) !== on) el.classList.toggle(c, on); };
  let cachedUiRects = null,
    cachedStageRect = null,
    cachedUiSig = "",
    uiRectsTime = -1e9;
  function clipLabels() {
    // ---- 1. read: UI rects, then every label's current box (one layout for everything)
    const now = performance.now();
    const uiSig = `${selectedIsland}|${selectedBuilding}|${document.body.className}|${innerWidth}x${innerHeight}`;
    if (!cachedUiRects || uiSig !== cachedUiSig || now - uiRectsTime > 200) {
      cachedUiSig = uiSig;
      uiRectsTime = now;
      cachedUiRects = safeSel.flatMap((s) => [...document.querySelectorAll(s)]).map((e) => e.getBoundingClientRect()).filter((r) => r.width && r.height);
      for (const b of document.querySelectorAll(".toolbar button, .hud button, .toggles button")) {
        const r = b.getBoundingClientRect();
        if (r.width && r.height) cachedUiRects.push(r);
      }
      cachedStageRect = stage.getBoundingClientRect();
    }
    const ui = cachedUiRects;
    const sr = cachedStageRect;
    const over = (a, q, m = 2) => a.right > q.left - m && a.left < q.right + m && a.bottom > q.top - m && a.top < q.bottom + m;
    const isl = [];
    for (const v of islandViews.values()) if (v.el.style.display !== "none") isl.push(v.el);
    const pins = [];
    for (const v of pinViews.values()) if (v.el.style.display !== "none") pins.push(v.el);
    const extras = pumaExtra && pumaExtra.el.style.display !== "none" ? [pumaExtra.el] : [];
    const tags = [];
    for (const o of nameTags) if (o.visible && o.element.style.display !== "none") tags.push(o.element);
    const cur = new Map();
    for (const el of [...isl, ...pins, ...tags]) cur.set(el, el.getBoundingClientRect());
    for (const el of extras) cur.set(el, el.firstElementChild.getBoundingClientRect());
    // natural centre = current centre minus the margins we applied last time
    const centre = (el) => {
      const r = cur.get(el);
      return [(r.left + r.right) / 2 - (parseFloat(el.style.marginLeft) || 0), (r.top + r.bottom) / 2 - (parseFloat(el.style.marginTop) || 0)];
    };
    // full-size boxes are re-cached whenever a label is currently full size (so a language switch updates them)
    for (const el of isl) if (!el.classList.contains("numonly")) { const r = cur.get(el); if (r.width) el._full = [r.width, r.height]; }
    for (const el of pins) if (!el.classList.contains("mini")) { const r = cur.get(el); if (r.width) el._full = [r.width, r.height]; }

    // ---- 2. decide
    // island labels: selected first, then active, then by number; hide those under UI or colliding with a kept label
    const rank = (el) => (el.classList.contains("selected") ? 0 : el.classList.contains("dim") ? 2 : 1);
    isl.sort((a, b) => rank(a) - rank(b));
    const keptIsl = [];
    const islOut = new Map();
    for (const el of isl) {
      if (!cur.get(el).width && !el._full) continue;
      const [cx, cy] = centre(el);
      const full = el._full || variantSize(el, "numonly", "_full", false);
      // hysteresis: a shown label needs a clear overlap to hide, a hidden one needs clear space to come back
      const m = el.dataset.vis === "0" ? 8 : -2;
      const bad = (rr) => ui.some((q) => over(rr, q, m)) || keptIsl.some((q) => over(rr, q, 3 + m)) || rr.left < sr.left - m || rr.right > sr.right + m || rr.top < sr.top - m;
      let r = boxAt(cx, cy, full[0], full[1]);
      let hit = bad(r), dx = 0, dy = 0, numonly = false;
      // 先試上次用的位移：鏡頭移動時標籤不會在幾個位置之間跳來跳去
      const offs = [[0, 26], [0, -26], [-46, 0], [46, 0], [-46, -14], [46, 14], [0, 50]];
      const last = el.dataset.off === undefined ? -1 : +el.dataset.off;
      const order = offs.map((_, i) => i);
      if (last >= 0 && last < offs.length) order.splice(order.indexOf(last), 1), order.unshift(last);
      let used = -1;
      for (const i of order) {
        if (!hit) break;
        [dx, dy] = offs[i];
        r = boxAt(cx, cy, full[0], full[1], dx, dy);
        hit = bad(r);
        if (!hit) used = i;
      }
      if (hit) {
        // last resort: shrink to the number badge only (full name on hover / in the list)
        const small = variantSize(el, "numonly", "_num");
        numonly = true;
        for (const [ox, oy] of [[0, 0], [0, 22], [0, -22], [-30, 0], [30, 0]]) {
          [dx, dy] = [ox, oy];
          r = boxAt(cx, cy, small[0], small[1], dx, dy);
          hit = bad(r);
          if (!hit) break;
        }
        if (hit) (numonly = false), (dx = dy = 0), (r = boxAt(cx, cy, full[0], full[1]));
      }
      if (!hit) keptIsl.push(r);
      islOut.set(el, { dx, dy, numonly, hit, used, r });
    }
    // item pins
    pins.sort((a, b) => (b.classList.contains("hot") || b.classList.contains("sel") ? 1 : 0) - (a.classList.contains("hot") || a.classList.contains("sel") ? 1 : 0));
    const keptPins = [];
    const pinOut = new Map();
    for (const el of pins) {
      if (!cur.get(el).width) continue;
      const [cx, cy] = centre(el);
      const forced = el.classList.contains("hot") || el.classList.contains("sel");
      const full = el._full || variantSize(el, "mini", "_full", false);
      const mini0 = el.classList.contains("compact") && !forced; // compact pins are always the small badge
      let mini = mini0;
      let size = mini ? variantSize(el, "mini", "_mini") : full;
      let r = boxAt(cx, cy, size[0], size[1]);
      // hysteresis: a pin that was collapsed last frame needs clear space (8px) to expand again
      const pm = el.dataset.mini === "1" ? 8 : -2;
      const hits = (rr) => ui.some((q) => over(rr, q, pm)) || (!forced && keptPins.some((q) => over(rr, q, 1 + pm)));
      let hit = hits(r);
      if (hit && !forced) {
        // collapse to the number badge; a badge is never dropped unless it sits under the UI
        mini = true;
        size = variantSize(el, "mini", "_mini");
        r = boxAt(cx, cy, size[0], size[1]);
        hit = ui.some((q) => over(r, q));
      }
      let dx = 0, slid = false;
      if (hit) {
        // still under a panel: slide the badge just clear of the panel edge (left or right)
        const q = ui.find((q) => over(r, q));
        const toRight = q.right + 6 - r.left,
          toLeft = q.left - 6 - r.right;
        // keep sliding to the same side as last frame unless the other side is clearly shorter
        // and never onto a side that would push it off the stage
        const fitsR = r.right + toRight <= sr.right - 2,
          fitsL = r.left + toLeft >= sr.left + 2;
        let side = el.dataset.side === "L" ? (Math.abs(toRight) + 40 < Math.abs(toLeft) ? "R" : "L") : el.dataset.side === "R" ? (Math.abs(toLeft) + 40 < Math.abs(toRight) ? "L" : "R") : Math.abs(toRight) < Math.abs(toLeft) ? "R" : "L";
        if (side === "R" && !fitsR && fitsL) side = "L";
        else if (side === "L" && !fitsL && fitsR) side = "R";
        el.dataset.side = side;
        const d = side === "R" ? toRight : toLeft;
        if (Math.abs(d) < 260) {
          dx = d;
          slid = true;
          r = boxAt(cx, cy, size[0], size[1], dx, 0);
          hit = ui.some((qq) => over(r, qq)) || r.left < sr.left || r.right > sr.right;
        }
      }
      if (!hit) keptPins.push(r);
      pinOut.set(el, { mini, mini0, dx, slid, hit });
    }
    // other islands' labels give way to the explored island's item pins
    if (keptPins.length)
      for (const [el, o] of islOut) {
        if (el.classList.contains("selected") || o.hit) continue;
        if (keptPins.some((q) => over(o.r, q, 2))) o.hit = true;
      }

    // ---- 3. write (only what changed)
    for (const [el, o] of islOut) {
      setClass(el, "numonly", o.numonly);
      setStyle(el, "marginLeft", o.dx ? o.dx + "px" : "");
      setStyle(el, "marginTop", o.dy ? o.dy + "px" : "");
      setStyle(el, "visibility", o.hit ? "hidden" : "");
      el.dataset.vis = o.hit ? "0" : "1";
      el.dataset.off = String(o.used);
    }
    for (const [el, o] of pinOut) {
      setClass(el, "mini", o.mini);
      setClass(el, "slid", o.slid);
      setStyle(el, "marginLeft", o.dx ? o.dx + "px" : "");
      setStyle(el, "visibility", o.hit ? "hidden" : "");
      el.dataset.mini = o.mini && !el.classList.contains("compact") ? "1" : "0";
    }
    for (const el of extras) {
      const r = cur.get(el);
      if (!r.width) continue;
      setStyle(el, "visibility", ui.some((q) => over(r, q, 2)) || r.top < sr.top ? "hidden" : "");
    }
    const rects = [...ui, ...keptIsl, ...keptPins];
    for (const el of tags) {
      const r = cur.get(el);
      if (!r.width) continue;
      const m = el.dataset.vis === "0" ? 8 : -3;
      const hit = rects.some((q) => over(r, q, m)) || r.left < sr.left - m || r.right > sr.right + m || r.top < sr.top - m;
      setStyle(el, "visibility", hit ? "hidden" : "");
      el.dataset.vis = hit ? "0" : "1";
    }
  }
  function zoomFactor() {
    // toy-city legibility: figures grow slightly when the camera pulls far back
    const d = camera.position.distanceTo(controls.target);
    return Math.min(1.45, Math.max(1, d / 20));
  }
  function updateWalkers() {
    peopleSys.setFilter(selectedFlows.size ? selectedFlows : null);
    peopleSys.update(0, motionTime, false, zoomFactor());
  }

  function resize() {
    const w = stage.clientWidth,
      h = stage.clientHeight;
    if (!w || !h) return;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    if (portrait) {
      renderer.setPixelRatio(1);
      renderer.setSize(1080, 1920, false);
      renderer.domElement.style.width = "100%";
      renderer.domElement.style.height = "100%";
    } else renderer.setSize(w, h);
    labelRenderer.setSize(w, h);
    dirty = true;
  }
  new ResizeObserver(resize).observe(stage);
  function overviewPosition() {
    const aspect = stage.clientWidth / stage.clientHeight;
    const dist = aspect < 0.85 ? 56 : aspect < 1.3 ? 38 : 28.5;
    return overviewTarget().add(new THREE.Vector3(0.24, 0.33, 0.87).normalize().multiplyScalar(dist));
  }
  function overviewTarget() {
    const narrow = stage.clientWidth / stage.clientHeight < 0.85;
    return cityCenter.clone().setY(0.3).add(new THREE.Vector3(0, 0, narrow ? 5.5 : 1.9)); // no bottom panel any more: city sits centred
  }
  function flyTo(id = "all") {
    if (id === "all-card") {
      // whole-city view with the detail card open: slide the city right so west-side tiles are not hidden under the card
      const shift = new THREE.Vector3();
      if (stage.clientWidth > 800 && !tourActive) {
        // measure where the westmost tile lands on screen, then slide just enough to clear the card's right edge
        const sr = stage.getBoundingClientRect();
        const cardRight = Math.max(390, ($("#card") && !$("#card").hidden ? $("#card").getBoundingClientRect().right : 390)) - sr.left + 40;
        const cam = camera.clone();
        const leftmost = (dx) => {
          const t = overviewTarget().add(new THREE.Vector3(dx, 0, 0));
          cam.position.copy(overviewPosition().add(new THREE.Vector3(dx, 0, 0)));
          cam.lookAt(t);
          cam.updateMatrixWorld();
          let m = Infinity;
          for (const c of centers.values()) {
            const v = c.clone().setY(top).add(new THREE.Vector3(-R * 0.75, 0, 0)).project(cam);
            m = Math.min(m, ((v.x + 1) / 2) * sr.width);
          }
          return m;
        };
        const x0 = leftmost(0),
          x1 = leftmost(-4);
        const perUnit = (x1 - x0) / 4;
        if (x0 < cardRight && perUnit > 1) shift.x = -Math.min(8, (cardRight - x0) / perUnit);
      }
      const target = overviewTarget().add(shift),
        pos = overviewPosition().add(shift);
      if (reduced.matches) {
        camera.position.copy(pos);
        controls.target.copy(target);
        controls.update();
        dirty = true;
      } else fly = { time: performance.now(), from: camera.position.clone(), to: pos, old: controls.target.clone(), target };
      return;
    }
    if (id === "diplomacy" && decor.routeEnds?.length) {
      const c = centers.get("diplomacy");
      const mid = decor.routeEnds.reduce((s, [x, z]) => s.add(new THREE.Vector3(x, 0, z)), new THREE.Vector3()).divideScalar(decor.routeEnds.length);
      const target = c.clone().lerp(mid, 0.38).setY(0.4);
      if (stage.clientWidth > 800 && !tourActive) target.add(new THREE.Vector3(-2.2, 0, 0.6));
      const pos = target.clone().add(new THREE.Vector3(-2.4, 10.5, 9.5));
      if (reduced.matches) {
        camera.position.copy(pos);
        controls.target.copy(target);
        controls.update();
        dirty = true;
      } else fly = { time: performance.now(), from: camera.position.clone(), to: pos, old: controls.target.clone(), target };
      return;
    }
    const detail = visual.get(id);
    const target =
      id === "all" ? overviewTarget() : detail ? detail.center.clone() : centers.get(id)?.clone() || new THREE.Vector3();
    target.y = id === "all" ? 0.3 : detail ? top + 0.3 : 0.7;
    const off = detail ? new THREE.Vector3(1.6, 2.5, 3.2) : new THREE.Vector3(2.75, 5.3, 6.2);
    let pos = id === "all" ? overviewPosition() : target.clone().add(off);
    if (id !== "all") {
      // full-height canvas: nudge the subject up, clear of the bottom time panel
      const up = new THREE.Vector3(off.x, 0, off.z).normalize().multiplyScalar(detail ? 0.3 : 0.9);
      target.add(up);
      pos.add(up);
    }
    if (id !== "all" && stage.clientWidth > 800 && !tourActive) {
      // keep the subject clear of the detail card on the left
      const right = new THREE.Vector3(off.z, 0, -off.x).normalize().multiplyScalar(detail ? 0.75 : 1.5);
      target.sub(right);
      pos = pos.sub(right);
    }
    if (reduced.matches) {
      camera.position.copy(pos);
      controls.target.copy(target);
      controls.update();
      dirty = true;
    } else fly = { time: performance.now(), from: camera.position.clone(), to: pos, old: controls.target.clone(), target };
  }
  function sourceLinks(ids) {
    return `<div class="sources">${[...new Set(ids)]
      .map((id) => {
        const s = sources.get(id);
        return s && s.url ? `<a href="${esc(s.url)}" target="_blank" rel="noopener noreferrer">↗ ${esc(txt(s.title) || id)}</a>` : "";
      })
      .join("")}</div>`;
  }
  const cardFooter = () =>
    "";
  var cardFull = false;
  function cardShow(html) {
    $("#card-content").innerHTML = html + cardFooter();
    $("#card").hidden = false;
    document.body.classList.add("card-open");
    $("#sidebar").classList.remove("mobile-open");
    document.body.classList.remove("m-time");
    $$(".mob-only[aria-pressed]").forEach((b) => b.setAttribute("aria-pressed", "false"));
    $("#card-content").scrollTop = 0;
    $("#card-content")
      .querySelectorAll("[data-building]")
      .forEach((b) => (b.onclick = () => selectBuilding(b.dataset.building)));
    $("#card-content")
      .querySelectorAll("[data-flow]")
      .forEach((b) => (b.onclick = () => selectFlow(b.dataset.flow)));
    $("#card-content")
      .querySelectorAll("[data-island]")
      .forEach((b) => (b.onclick = () => selectIsland(b.dataset.island)));
    $("#card-content")
      .querySelectorAll(matchMedia("(hover: hover) and (pointer: fine)").matches ? "[data-hover-flow]" : "[data-hover-flow-none]")
      .forEach((b) => {
        b.onmouseenter = () => {
          for (const p of flowPaths) p.mesh.visible = selectedFlows.has(p.flow) || p.flow === b.dataset.hoverFlow;
          dirty = true;
        };
        b.onmouseleave = () => {
          for (const p of flowPaths) p.mesh.visible = selectedFlows.has(p.flow) || showAllFlows;
          dirty = true;
        };
      });
    $("#card").scrollTop = 0;
    const tt = $("#card-content [data-thumb]");
    if (tt && !thumbCache.has(tt.dataset.thumb) && params.get("thumbs") !== "0")
      setTimeout(() => {
        const url = thumbnail(tt.dataset.thumb);
        if (url && tt.isConnected) tt.insertAdjacentHTML("afterbegin", `<img src="${url}" alt="">`), tt.querySelector(":scope > .ico")?.remove();
      }, 60);
  }
  // ---------- HUD: status, display toggles, island dock, city log ----------
  let showAllFlows = false,
    frozen = false,
    showNames = false;
  const nameTags = [];
  function updateHud() {
    const h = Math.floor(dayMinutes / 60),
      m = Math.floor(dayMinutes % 60);
    const period = dayMinutes < 330 || dayMinutes >= 1170 ? tr("夜晚", "Night") : dayMinutes < 480 ? tr("清晨", "Dawn") : dayMinutes < 1020 ? tr("白天", "Day") : tr("黃昏", "Dusk");
    const on = peopleSys.people.filter((w) => w.kind === "flow" && (!selectedFlows.size || selectedFlows.has(w.flow))).length;
    // rebuild the counters only when they change; the clock ticks ~10×/s and only needs its own text updated
    const timeTxt = `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
    const statusKey = `${on}|${selectedFlows.size}|${english}`;
    const st = $("#status");
    if (st.dataset.k !== statusKey || !st.querySelector(".st.time")) {
      st.dataset.k = statusKey;
      st.innerHTML = [
        [D.islands.length, tr("座技能島", "skill islands"), "#db6a41"],
        [buildings.size, tr("座地標", "landmarks"), "#b8920f"],
        [D.flows.length, tr("條知識流", "flows"), "#3e7c8c"],
        [on, selectedFlows.size ? tr("位在此協作線上", "on this connection") : tr("位探索者在路上", "explorers walking"), "#5e9a6f"],
      ]
        .map(([n, l, c]) => `<span class="st" style="--c:${c}"><i></i><b>${n}</b>${l}</span>`)
        .join("") + `<span class="st time"><b>${timeTxt}</b><span class="per">${period}</span></span>`;
    } else {
      const t = st.querySelector(".st.time");
      if (t.firstChild.textContent !== timeTxt) t.firstChild.textContent = timeTxt;
      if (t.lastChild.textContent !== period) t.lastChild.textContent = period;
    }
    $$("[data-time]").forEach((b) => { const v = String(Math.abs(Number(b.dataset.time) - dayMinutes) < 1); if (b.getAttribute("aria-pressed") !== v) b.setAttribute("aria-pressed", v); });
  }
  $$("[data-time]").forEach(
    (b) =>
      (b.onclick = () => {
        // jump to that light; the clock keeps running from there
        dayMinutes = Number(b.dataset.time);
        updateDay();
        dirty = true;
      }),
  );
  const toggleState = { names: false, badges: true, flows: false, freeze: false, bird: false, log: false };
  function setToggle(k, v) {
    toggleState[k] = v;
    $(`[data-toggle="${k}"]`)?.setAttribute("aria-pressed", String(v));
    if (k === "names") showNames = v;
    if (k === "badges") badgesOn = v;
    if (k === "flows") {
      showAllFlows = v;
      for (const p of flowPaths) p.mesh.visible = v || selectedFlows.has(p.flow);
    }
    if (k === "freeze") frozen = v;
    if (k === "bird") {
      const t = controls.target.clone();
      const pos = v ? t.clone().add(new THREE.Vector3(0.01, 42, 6)) : overviewPosition();
      controls.maxPolarAngle = THREE.MathUtils.degToRad(v ? 70 : 70);
      controls.minPolarAngle = THREE.MathUtils.degToRad(v ? 5 : 25);
      if (reduced.matches) camera.position.copy(pos);
      else fly = { time: performance.now(), from: camera.position.clone(), to: pos, old: controls.target.clone(), target: v ? t : overviewTarget() };
    }
    if (k === "log") {
      $("#log").classList.toggle("open", v);
      document.body.classList.toggle("log-open", v);
      if (v) renderLog();
    }
    dirty = true;
  }
  let badgesOn = true;
  $$("[data-toggle]").forEach(
    (b) =>
      (b.onclick = () => {
        setToggle(b.dataset.toggle, !toggleState[b.dataset.toggle]);
        track("heart_island_toggle", { toggle: b.dataset.toggle, active: toggleState[b.dataset.toggle] });
      }),
  );
  $("#log-close").onclick = () => setToggle("log", false);
  // dock
  for (const i of D.islands) {
    const b = document.createElement("button");
    b.className = "dock-btn";
    b.innerHTML = `${icon(i.id)}<span class="tip">${esc(english ? txt(i.name) : shortNames[i.id])}</span>`;
    b.setAttribute("aria-label", txt(i.name));
    b.onclick = () => selectIsland(i.id);
    $("#dock").appendChild(b);
  }
  // name tags (CSS2D, only near the camera)
  const pumaLordIndices = [];
  for (const [pi, w] of peopleSys.people.entries()) {
    if (w.kind === "puma" || w.kind === "lord") pumaLordIndices.push(pi);
    const el = document.createElement("button");
    el.className = "name-tag" + (w.kind === "flow" ? " bubble" : w.kind === "puma" ? " puma-tag" : w.kind === "lord" ? " puma-tag lord-tag" : " ambient");
    el.innerHTML = w.kind === "puma"
      ? `<i>✦</i><b class="pn">kywk</b><span class="stop"></span>`
      : w.kind === "lord"
      ? `<i>✦</i><b class="pn">${esc(tr("島主", "Keeper"))}</b>`
      : w.kind === "flow" ? `<i>${roleGlyph(w.role)}</i><span class="doing">${esc(tr("正在搬", "Carrying"))} <b>${esc(tr(...(CARRY_LABEL[w.carry] || [w.carry, w.carry])))}</b></span>` : `<i>${roleGlyph(w.role)}</i>${esc(tr(...ROLE_LABEL[w.role]))}`;
    el.tabIndex = -1;
    if (w.kind === "flow") el.title = `${tr(...ROLE_LABEL[w.role])}｜${english ? nameOf(w.from) : shortNames[w.from] || nameOf(w.from)} ↔ ${english ? nameOf(w.to) : shortNames[w.to] || nameOf(w.to)}｜${w.flow} ${txt(D.flows.find((f) => f.id === w.flow)?.text || "")}`;
    el.onclick = () => selectWalker(pi);
    const o = new CSS2DObject(el);
    o.visible = false;
    scene.add(o);
    nameTags.push(o);
  }
  // 2026-10-30：kywk 頭上的思考雲（數位花園探索語錄），
  // 以及他站上肥皂箱時的「關於島主」按鈕
  // 語錄與出處
  const PUMA_QUOTES = [
    ["WALK THE TRAIL. FRAME THE LIGHT. BUILD THE SYSTEM.", "kywk.me"],
    ["有些事現在不做，一輩子都不會做了 — Now or Never.", "kywk.me"],
    ["Obsidian 負責自由生長，Docusaurus 負責優雅展演。", "kywk.me"],
    ["從喜馬拉雅 5,416M 到終端機游標，探索的本質從未改變。", "kywk.me"],
    ["1,858 篇筆記與日誌，都是這座技能島的一磚一瓦。", "kywk.me"],
    ["Keep walking, keep running, keep making.", "kywk.me"],
  ];
  const CLOUD_FIRST = 300, CLOUD_EVERY = 300, CLOUD_FOR = 30; // 秒：載入 5 分鐘後第一次出現，之後每 5 分鐘一次，每次 30 秒
  const pumaIdx = peopleSys.people.findIndex((w) => w.kind === "puma");
  const pumaExtra = (() => {
    if (pumaIdx < 0) return null;
    const el = document.createElement("div");
    el.className = "puma-extra";
    el.innerHTML = `<div class="px-col"><div class="puma-cloud" hidden><span class="q"></span><small class="src"></small><i class="d1"></i><i class="d2"></i></div><a class="puma-advice" hidden href="/life/about/" target="_top">${esc(tr("關於島主", "About kywk"))} ↗</a></div>`;
    el.querySelector(".puma-advice").addEventListener("click", () => track("heart_island_advice_click"));
    const o = new CSS2DObject(el);
    o.visible = false;
    scene.add(o);
    return { o, el, cloud: el.querySelector(".puma-cloud"), q: el.querySelector(".q"), src: el.querySelector(".src"), btn: el.querySelector(".puma-advice"), shown: -1, cloudOn: false, btnOn: false };
  })();
  const pumaT0 = performance.now();
  let pumaForce = -1; // QA：強制顯示第幾句（heartCity.debug.pumaQuote(k)）
  function updatePumaExtra(now) {
    if (!pumaExtra) return;
    const w = peopleSys.people[pumaIdx];
    const t = pumaForce >= 0 ? pumaForce * CLOUD_EVERY : (now - pumaT0) / 1000 - CLOUD_FIRST;
    const cycle = Math.floor(t / CLOUD_EVERY);
    const near = camera.position.distanceTo(controls.target) < 26; // 跟 Puma 名牌一樣，鏡頭拉近才出現
    const cloudOn = near && t >= 0 && t - cycle * CLOUD_EVERY < CLOUD_FOR;
    const btnOn = near && !!w.waiting;
    const X = pumaExtra;
    if (cloudOn && X.shown !== cycle) {
      X.shown = cycle;
      const [quote, from] = PUMA_QUOTES[cycle % PUMA_QUOTES.length];
      X.q.textContent = quote;
      X.src.textContent = from ? tr(`出自：${from}`, `From: ${from}`) : "";
    }
    if (cloudOn !== X.cloudOn) X.cloud.hidden = !(X.cloudOn = cloudOn);
    if (btnOn !== X.btnOn) X.btn.hidden = !(X.btnOn = btnOn);
    X.o.visible = !!w.world && !tourActive && (cloudOn || btnOn);
    if (X.o.visible) X.o.position.set(w.world.x, w.world.y + 0.5 * (w.drawScale || 0.9), w.world.z); // 與名牌同一個錨點，CSS 再往上推到名牌上方
  }
  // city log
  const logFlow = $("#log-flow");
  logFlow.innerHTML = `<option value="">${tr("全部協作線", "All connections")}</option>` + D.flows.map((f) => `<option value="${f.id}">${f.id}｜${esc(txt(f.text)).slice(0, 18)}</option>`).join("");
  const logItems = [];
  function pushLog(w, type) {
    const kind = { depart: tr("出發", "Depart"), arrive: tr("抵達", "Arrive"), handoff: tr("交接", "Hand-off") }[type];
    const dest = type === "depart" ? (w.dirSign > 0 ? w.to : w.from) : w.dirSign > 0 ? w.from : w.to;
    const key = `${w.flow}|${w.role}|${type}|${type === "depart" ? (w.dirSign > 0 ? w.to : w.from) : w.dirSign > 0 ? w.from : w.to}`;
    if (logItems.slice(0, 24).some((x) => x.key === key)) return;
    const cm = Math.floor(dayMinutes) % 1440,
      ss = String(Math.floor(motionTime) % 60).padStart(2, "0");
    const hh = String(Math.floor(cm / 60)).padStart(2, "0"),
      mm = String(cm % 60).padStart(2, "0") + ":" + ss;
    logItems.unshift({ key, flow: w.flow, time: `${hh}:${mm}`, island: type === "depart" ? (w.dirSign > 0 ? w.to : w.from) : dest, html: `<li data-type="${type}"><span class="lp ${type}">${kind}</span><span class="lt"><b title="${esc(txt(D.flows.find((f) => f.id === w.flow)?.text || ""))}">${w.flow}</b>｜${esc(tr(...ROLE_LABEL[w.role]))} ${type === "depart" ? tr("前往", "to") : tr("抵達", "at")} ${esc(nameOf(type === "depart" ? (w.dirSign > 0 ? w.to : w.from) : dest))}<span class="nw"> · ${esc(tr(...(CARRY_LABEL[w.carry] || [w.carry, w.carry])))}</span></span></li>` });
    if (logItems.length > 60) logItems.pop();
    if ($("#log").classList.contains("open")) renderLog();
  }
  const HEART_LABEL = {
    T: "Trails 遠方航跡（Backpacker 223 篇）",
    H: "Hacks 生活系統（Lifehacker 302 篇）",
    E: "Engineering 工程造物（MoCo 262 篇 + 4 開源專案）",
    A: "Album 光影記憶（攝影相簿 491 輯）",
    R: "Reflections 歲月日誌（Life 526 + News 54 篇）",
  };
  const HEART_SHORT = {
    T: "Trails 遠方航跡",
    H: "Hacks 生活系統",
    E: "Engineering 工程造物",
    A: "Album 光影記憶",
    R: "Reflections 歲月日誌",
  };
  function renderOverview() {
    const heartCount = {};
    for (const i of D.islands) for (const h of (i.heart || [])) heartCount[h] = (heartCount[h] || 0) + 1;
    const walking = peopleSys.people.filter((w) => w.kind === "flow").length;
    $("#overview-panel").innerHTML = `<div class="stat-row four">${[
      [1858, tr("篇已發布筆記", "published notes"), "#e26d2d"],
      [D.islands.length, tr("座技能島", "skill islands"), "#2e6b68"],
      [buildings.size, tr("座主題地標", "landmarks"), "#d97706"],
      [D.flows.length, tr("條知識網絡", "knowledge flows"), "#4d8b55"],
    ]
      .map(([n, l, c]) => `<div class="stat" style="--accent:${c}"><b>${n}</b><span class="lbl">${l}</span></div>`)
      .join("")}</div>
      <div class="stat-row three" style="margin-top:10px;">
        <div class="stat" style="--accent:#e26d2d"><b>223</b><span class="lbl">Backpacker 航跡</span></div>
        <div class="stat" style="--accent:#4d8b55"><b>302</b><span class="lbl">Lifehacker 系統</span></div>
        <div class="stat" style="--accent:#2e6b68"><b>262+4</b><span class="lbl">MoCo 工程+開源</span></div>
      </div>
      <div class="stat-row two" style="margin-top:8px;">
        <div class="stat" style="--accent:#d97706"><b>491</b><span class="lbl">Album 光影畫廊</span></div>
        <div class="stat" style="--accent:#7a5ea8"><b>580</b><span class="lbl">Life &amp; News 歲月日誌</span></div>
      </div>
      <h4>HEART 核心維度</h4><div class="heart-bars">${"HEART".split("").map((h) => `<div><span class="pill heart" style="--c:${HEART_COLORS[h]}"><i></i>${HEART_SHORT[h] || h}</span><i class="bar"><b style="width:${((heartCount[h] || 0) / D.islands.length) * 100}%;background:${HEART_COLORS[h]}"></b></i><em>${heartCount[h] || 0}</em></div>`).join("")}</div>
      <p class="small">${tr("五大面向標記的技能島分布（可點選下方篩選）。", "Distribution of skill islands tagged with the 5 core dimensions.")}</p>
      <h4>${tr("技能島清單", "SKILL ISLANDS")}</h4><div class="mini-list">${D.islands.map((i) => `<button data-island-ov="${i.id}">${icon(i.id, "sm")}<span>${esc(shortNames[i.id] || txt(i.name))}</span><em>${i.buildings.length}</em></button>`).join("")}</div>`;
    $$("[data-island-ov]").forEach((b) => (b.onclick = () => selectIsland(b.dataset.islandOv)));
  }
  $$("[data-logtab]").forEach(
    (b) =>
      (b.onclick = () => {
        $$("[data-logtab]").forEach((x) => x.setAttribute("aria-selected", String(x === b)));
        const ov = b.dataset.logtab === "overview";
        $("#overview-panel").hidden = !ov;
        $("#log-body").hidden = ov;
        if (ov) renderOverview();
      }),
  );
  function renderLog() {
    const f = logFlow.value;
    $("#log-list").innerHTML = logItems
      .filter((x) => !f || x.flow === f)
      .slice(0, 30)
      .map((x) => x.html.replace("<li ", `<li data-t="${x.time}" `).replace('<span class="lt">', `<span class="lt"><time>${x.time}</time>${islands.has(x.island) ? icon(x.island, "sm") : ""}`))
      .join("");
  }
  logFlow.onchange = renderLog;
  const lastWait = new Map();
  function tickLog() {
    for (const w of peopleSys.people) {
      if (w.kind !== "flow") continue;
      const waiting = (w.wait || 0) > 0;
      const prev = lastWait.get(w);
      if (prev !== undefined && prev !== waiting) {
        if (waiting) pushLog(w, w.s >= w.route.total - 0.001 ? "arrive" : "handoff");
        else pushLog(w, "depart");
      }
      lastWait.set(w, waiting);
    }
  }
  // seed the log so it is never empty on open
  for (const w of peopleSys.people.filter((w) => w.kind === "flow").slice(0, 12)) pushLog(w, "depart");
  function flowButtons(ids, from = null) {
    return `<div class="flow-chips">${ids
      .map((id) => {
        const f = flows.get(id);
        if (!f) return "";
        const others = [...f.from, ...f.to].filter((x) => x !== from && islands.has(x));
        const dir = f.from.includes(from) ? "→" : "←";
        const dest = others.length ? `${dir} ${shortNames[others[0]] || nameOf(others[0])}` + (others.length > 1 ? ` ${tr("等", "+")}${others.length}${tr("處", "")}` : "") : "";
        return `<button class="flow-chip" data-flow="${id}" data-hover-flow="${id}"><b>${id}</b><span>${esc(dest)}</span><i aria-hidden="true">↗</i></button>`;
      })
      .join("")}</div>`;
  }
  function heartPills(list) {
    return (list || []).length
      ? list.map((h) => `<span class="pill heart" style="--c:${HEART_COLORS[h] || '#e26d2d'}" title="${esc(HEART_LABEL[h] || h)}"><i></i>${esc(HEART_SHORT[h] || h)}</span>`).join("")
      : "";
  }
  const NUM_RE = /[0-9０-９][0-9０-９,，.．]*\s*(?:萬|億|千)?\s*(?:公尺|公里|公頃|萬元|億元|元|歲|年|所|人|次|座|處|點|分鐘|個月|%|％|班|位|週|項|倍|成|棵|個|間|床|天|小時)?/;
  let tiledFacts = new Set();
  function statTiles(facts) {
    tiledFacts = new Set();
    const tiles = [];
    for (const f of facts) {
      const t = txt(f);
      if (f.tile && !f.tile.zh) continue; // explicitly not a tile (e.g. "台北 101" is a place, not a number)
      // a fact may name its own tile headline (e.g. "尖峰時段" instead of the first number found)
      const m = f.tile ? [txt(f.tile)] : t.match(NUM_RE);
      if (m && tiles.length < 3) tiledFacts.add(t), tiles.push(`<div class="stat${f.tile ? " long named" : ""}" style="--accent:${["#db6a41", "#3e7c8c", "#b8920f"][tiles.length]}"><b>${esc(m[0].trim())}</b><span class="lbl">${esc(t)}</span></div>`);
    }
    return tiles.length ? `<div class="stat-row">${tiles.join("")}</div>` : "";
  }
  const _cCoral = new THREE.Color(colors.coral),
    _cYellow = new THREE.Color(colors.yellow),
    _cUnknown = new THREE.Color(0xb8b0ac),
    _cDim = new THREE.Color(0xcfc5bf),
    _cWork = new THREE.Color();
  function highlight() {
    for (const [id, v] of islandViews) {
      const i = islands.get(id),
        dim = selectedHeart.size && i.heart.length && !i.heart.some((h) => selectedHeart.has(h));
      if (!debug) v.top.material.color.set(dim ? 0x9a9590 : 0xffffff);
      v.outline.visible = selectedIsland === id;
      v.el.classList.toggle("selected", selectedIsland === id);
      {
        const c = centers.get(id);
        if (selectedIsland === id) v.label.position.set(c.x, top + 0.06, c.z + R * 0.8);
        else v.label.position.set(c.x, top - 0.25, c.z + R + 0.05);
      }
      v.el.classList.toggle("dim", !!dim || (!!selectedIsland && selectedIsland !== id));
    }
    document.querySelectorAll("#tree details[data-isl]").forEach((d) => {
      const cur = d.dataset.isl === selectedIsland;
      if (cur && !d.classList.contains("current")) {
        // scroll only the list itself (scrollIntoView would also scroll the page on mobile)
        const tree = d.closest("#tree");
        if (tree && tree.clientHeight) {
          const top = d.offsetTop - tree.offsetTop,
            bottom = top + d.offsetHeight;
          if (top < tree.scrollTop || bottom > tree.scrollTop + tree.clientHeight) tree.scrollTo({ top: Math.max(0, top - tree.clientHeight / 3), behavior: reduced.matches || innerWidth <= 800 ? "auto" : "smooth" });
        }
      }
      d.classList.toggle("current", cur);
    });
    for (const b of buildings.values()) {
      const active = dayLightIds.has(b.id) && mode === "day",
        selected = b.id === selectedBuilding || b.id === hoverBuilding,
        unknown = mode === "term" && !b.phase?.stages?.length;
      const i = islands.get(b.island),
        dim = selectedHeart.size && i.heart.length && !i.heart.some((h) => selectedHeart.has(h));
      for (const p of visual.get(b.id).parts) {
        if (selected) _cWork.copy(p.color).lerp(_cCoral, 0.22);
        else if (unknown) _cWork.copy(_cUnknown);
        else _cWork.copy(p.color);
        if (active && !selected) _cWork.lerp(_cYellow, 0.22);
        if (dim) _cWork.lerp(_cDim, 0.8);
        p.mesh.setColorAt(p.index, _cWork);
      }
    }
    for (const m of staticMeshes) if (m.instanceColor) m.instanceColor.needsUpdate = true;
    dirty = true;
  }
  function showFlows(ids) {
    selectedFlows = new Set(ids);
    for (const p of flowPaths) p.mesh.visible = selectedFlows.has(p.flow) || showAllFlows;
    if (typeof updateHud === "function") updateHud();
    setGhosts(selectedIsland === "renewal");
    for (const [id, label] of portViews)
      label.visible =
        paths.some((p) => selectedFlows.has(p.flow) && (p.from === id || p.to === id));
    if ($("#legend")) $("#legend").hidden = !selectedFlows.size; // 2026-10-24：圖例已移除
    document.body.classList.toggle("flows-on", !!selectedFlows.size);
    updateWalkers();
    dirty = true;
  }
  // ---------- A7: numbered item pins for the explored island ----------
  let hoverBuilding = null;
  const canHover = matchMedia("(hover: hover) and (pointer: fine)").matches;
  const pinGroup = new THREE.Group();
  scene.add(pinGroup);
  const pinViews = new Map();
  const pinLineMat = new THREE.LineBasicMaterial({ color: colors.coral, transparent: true, opacity: 0.85, depthTest: false });
  const CIRC = "①②③④⑤⑥⑦⑧⑨⑩⑪⑫⑬⑭⑮⑯⑰⑱⑲⑳";
  function showPins(islandId) {
    for (const v of pinViews.values()) {
      pinGroup.remove(v.label, v.line);
      v.line.geometry.dispose();
    }
    pinViews.clear();
    if (!islandId) return syncSigns(), (dirty = true);
    const isl = islands.get(islandId);
    const n = isl.buildings.length;
    isl.buildings.forEach((b, k) => {
      const v = visual.get(b.id);
      if (!v) return;
      const base = v.center.clone().setY(top + Math.min(0.62, Math.max(0.32, (v.size || 0.6) * 0.6)));
      const lift = 0.32 + (k % 2) * 0.2 + (n > 8 ? (k % 3) * 0.1 : 0);
      const tip = base.clone().add(new THREE.Vector3(0, lift, 0));
      const geo = new THREE.BufferGeometry().setFromPoints([base, tip]);
      const line = new THREE.Line(geo, pinLineMat);
      line.renderOrder = 6;
      const el = document.createElement("button");
      el.className = "item-pin" + (n > 7 ? " compact" : "");
      el.dataset.pin = b.id;
      el.innerHTML = `<b>${CIRC[k] || k + 1}</b><span>${esc(txt(b.name))}</span>`;
      el.setAttribute("aria-label", txt(b.name));
      el.onclick = (e) => (e.stopPropagation(), selectBuilding(b.id));
      if (canHover) {
        el.onmouseenter = () => hoverItem(b.id, true);
        el.onmouseleave = () => hoverItem(b.id, false);
      }
      const label = new CSS2DObject(el);
      label.position.copy(tip);
      pinGroup.add(line, label);
      pinViews.set(b.id, { label, line, el, tip, base });
    });
    syncSigns();
    dirty = true;
  }
  function syncSigns() {
    for (const m of signGroup.children) if (m.userData.item) m.visible = !pinViews.has(m.userData.item);
  }
  function hoverItem(id, on) {
    hoverBuilding = on ? id : null;
    for (const [bid, v] of pinViews) v.el.classList.toggle("hot", on && bid === id);
    document.querySelectorAll(`#tree [data-id="${id}"]`).forEach((b) => b.classList.toggle("hot", on));
    highlight();
  }
  window.__pins = { showPins, pinViews, hoverItem };
  // The guided tour moves the camera on its own; only a viewer's own picks count.
  function trackSelect(type, id) {
    if (!tourActive) track("heart_island_select", { item_type: type, item_id: id });
  }
  function selectIsland(id, { silent = false } = {}) {
    const i = islands.get(id);
    if (!i) return;
    clearWalker();
    selectedIsland = id;
    selectedBuilding = null;
    showPins(id);
    document.querySelectorAll("#tree details[data-isl]").forEach((d) => {
      if (d.dataset.isl !== id && d.open) d.open = false;
    });
    highlight();
    flyTo(id);
    showFlows([]);
    const fl = D.flows.filter((f) => f.from.includes(id) || f.to.includes(id)).map((f) => f.id);
    const islUrl = i.url || "";
    cardShow(
      `<div class="card-head"><div class="icon-tile">${icon(id)}</div><div><div class="eyebrow">SKILL ISLAND ${String(i.number).padStart(2, "0")} · ${esc(tr("技能島", "ISLAND"))}</div><h2>${esc(txt(i.name))}</h2></div></div>
      <p class="lede">${esc(txt(i.summary))}</p>${txt(i.vision) ? `<blockquote class="vision">「${esc(txt(i.vision))}」</blockquote>` : ""}<div class="pills">${heartPills(i.heart)}<span class="pill soft">${i.buildings.length} ${tr("個模組", "items")}</span><span class="pill soft">${fl.length} ${tr("條知識流", "connections")}</span></div>
      ${islUrl ? `<a class="card-goto-btn" href="${islUrl}" target="_top">${tr("前往閱讀專區 →", "Read Section →")}</a>` : ""}
      ${(() => {
        const phases = new Set(i.buildings.map(shortPhase));
        const same = phases.size === 1 && !!shortPhase(i.buildings[0]);
        return `<h3>${tr("核心模組", "CORE MODULES")}</h3>${same ? `<p class="shared-phase"><b>${tr("時程／狀態", "Status")}</b>${esc([...phases][0])}</p>` : ""}<div class="rows">${i.buildings.map((b) => `<button class="row" data-building="${b.id}"><span class="dot"></span><span class="nm">${esc(txt(b.name))}</span><span class="ph">${same ? "" : esc(stageChip(b))}</span><i aria-hidden="true">›</i></button>`).join("")}</div>`;
      })()}
      <h3>${tr("知識網絡串聯", "CONNECTED WITH")}</h3>${flowButtons(fl, id)}
      <h3>${tr("筆記來源", "SOURCES")}</h3>${sourceLinks(i.sources)}`,
    );
    if (!silent) trackSelect("island", id);
  }
  const STAGE_CHIP = { "m1-8": "核心基礎", "m8-18": "自動流水線", "m18-28": "全站串聯", year1: "2004–2008", "year1-2": "2013–2016", "year2-3": "2017–2020", "year3-4": "2021–2023", "year5-8": "2024–2026", "year4+": "持續演進", short: "日常迭代", mid: "季度專案", long: "長年累積", stage1: "第一階段", stage2: "第二階段", stage3: "第三階段", ay117: "2026 紀元" };
  function stageChip(b) {
    const st = b.phase?.stages || [];
    if (!st.length) return "";
    const a = STAGE_CHIP[st[0]] || "",
      z = STAGE_CHIP[st[st.length - 1]] || "";
    return st.length > 1 && a !== z ? `${a}起` : a;
  }
  function shortPhase(b) {
    return b.phase ? txt(b.phase.label) || "" : "";
  }
  function selectBuilding(id) {
    const b = buildings.get(id);
    if (!b) return;
    clearWalker();
    selectedIsland = b.island;
    selectedBuilding = id;
    if (![...pinViews.keys()].includes(id)) showPins(b.island);
    for (const [bid, v] of pinViews) v.el.classList.toggle("sel", bid === id);
    highlight();
    flyTo(id);
    showFlows([]);
    const isl = islands.get(b.island);
    const itemUrl = b.url || (isl && isl.url) || "";
    cardShow(
      `<div class="card-head"><div class="icon-tile thumb" data-thumb="${b.id}">${thumbCache.has(b.id) ? `<img src="${thumbCache.get(b.id)}" alt="">` : icon(b.island)}<span class="badge-ico">${icon(b.island, "sm")}</span></div><div><div class="eyebrow">${esc(txt(isl.name))} · ${tr("核心模組", "MODULE")}</div><h2>${esc(txt(b.name))}</h2></div></div>
      <div class="pills">${heartPills(isl.heart)}<span class="pill status">${tr("知識模組", "Module")}</span>${b.who ? `<span class="pill soft">${esc(tr("領域：", "Domain: "))}${esc(txt(b.who))}</span>` : ""}</div>
      ${itemUrl ? `<a class="card-goto-btn" href="${itemUrl}" target="_top">${tr("前往閱讀專區 →", "Read Section →")}</a>` : ""}
      ${b.plain ? `<p class="plain">${esc(txt(b.plain))}</p>` : ""}
      ${statTiles(b.facts)}
      <h3>${tr("核心特點", "KEY POINTS")}</h3><ul class="facts">${b.facts.filter((f) => !tiledFacts.has(txt(f))).map((f) => `<li>${esc(txt(f))}</li>`).join("") || `<li>${esc(txt(b.facts[0]))}</li>`}</ul>
      ${b.phase ? `<h3>${tr("演進階段", "EVOLUTION")}</h3>${timelineBar(b)}` : ""}
      <h3>${tr("知識網絡串聯", "CONNECTED WITH")}</h3>${flowButtons(b.flows, b.island)}
      <h3>${tr("筆記來源", "SOURCES")}</h3>${sourceLinks(b.sources)}`,
    );
    trackSelect("building", id);
  }
  const thumbRT = new THREE.WebGLRenderTarget(160, 160, { samples: 4 });
  thumbRT.texture.colorSpace = THREE.SRGBColorSpace;
  const thumbCam = new THREE.PerspectiveCamera(30, 1, 0.05, 60);
  const thumbCache = new Map();
  function portrait(w) {
    if (!w.world || params.get("thumbs") === "0") return null;
    const sc = w.drawScale || 0.8;
    const c = w.world.clone().add(new THREE.Vector3(0, 0.3 * sc, 0));
    thumbCam.position.copy(c).add(new THREE.Vector3(0.38, 0.22, 0.62).multiplyScalar(sc));
    thumbCam.lookAt(c);
    const wasRing = selRing.visible;
    selRing.visible = false;
    renderer.setRenderTarget(thumbRT);
    renderer.render(scene, thumbCam);
    const px = new Uint8Array(160 * 160 * 4);
    renderer.readRenderTargetPixels(thumbRT, 0, 0, 160, 160, px);
    renderer.setRenderTarget(null);
    selRing.visible = wasRing;
    const cv = document.createElement("canvas");
    cv.width = cv.height = 160;
    const g = cv.getContext("2d"),
      img = g.createImageData(160, 160);
    for (let y = 0; y < 160; y++) img.data.set(px.subarray((159 - y) * 640, (160 - y) * 640), y * 640);
    g.putImageData(img, 0, 0);
    return cv.toDataURL("image/jpeg", 0.85);
  }
  function thumbnail(id) {
    if (thumbCache.has(id)) return thumbCache.get(id);
    const v = visual.get(id);
    if (!v) return null;
    const s = v.size || 0.6;
    const c = v.center.clone().setY(top + s * 0.28);
    thumbCam.position.copy(c).add(new THREE.Vector3(0.95, 0.85, 1.35).multiplyScalar(s * 1.55));
    thumbCam.lookAt(c);
    const prevLabels = labelRenderer.domElement.style.visibility;
    for (const m of peopleSys.meshes) m.visible = false;
    renderer.setRenderTarget(thumbRT);
    renderer.render(scene, thumbCam);
    const px = new Uint8Array(160 * 160 * 4);
    renderer.readRenderTargetPixels(thumbRT, 0, 0, 160, 160, px);
    renderer.setRenderTarget(null);
    for (const m of peopleSys.meshes) m.visible = true;
    const cv = document.createElement("canvas");
    cv.width = cv.height = 160;
    const g = cv.getContext("2d"),
      img = g.createImageData(160, 160);
    for (let y = 0; y < 160; y++) img.data.set(px.subarray((159 - y) * 640, (160 - y) * 640), y * 640);
    g.putImageData(img, 0, 0);
    const url = cv.toDataURL("image/jpeg", 0.85);
    thumbCache.set(id, url);
    dirty = true;
    return url;
  }
  const STAGE_SEG = { "m1-8": [1, 2], "m8-18": [2], "m18-28": [2, 3], year1: [2], "year1-2": [2], "year2-3": [2, 3], "year3-4": [3], "year5-8": [4], "year4+": [3, 4] };
  function stageSegs(b) {
    const out = new Set();
    for (const st of b.phase?.stages || []) for (const n of STAGE_SEG[st] || []) out.add(n);
    return out;
  }
  function timelineBar(b) {
    if (!b.phase) return "";
    const label = txt(b.phase.label) || "";
    const on = stageSegs(b);
    const segs = D.termTimeline.map((t, n) => (english ? ["Inauguration", "6 months", "Years 1–2", "Years 3–4", "Years 5–8"][n] : txt(t.label)));
    const bar = on.size ? `<div class="timeline">${segs.map((t, n) => `<span class="${on.has(n) ? "on" : ""}">${esc(t)}</span>`).join("")}</div>` : "";
    return `${bar}<div class="phase">${esc(label)}</div>`;
  }
  const tierLabels = {
    official_explicit: ["公開知識庫", "Published Vault"],
    official_thematic: ["政策主題串聯", "Linked policy themes"],
    transcript_pending: ["候選人受訪", "Candidate interview"],
    mixed: ["知識庫與隨筆日誌", "Vault and Journals"],
  };
  function tierLabel(t) {
    return tr(...(tierLabels[t] || [t, t]));
  }
  function nameOf(id) {
    return txt(islands.get(id)?.name || D.ports.find((p) => p.id === id)?.name) || id;
  }
  function quoteHTML(q) {
    return `<div class="quote"><p>「${esc(txt(q.text))}」</p><p class="small">${esc(txt(q.program))} · ${esc(q.timecode)}</p><a href="${esc(q.url)}" target="_blank" rel="noopener noreferrer">${tr("前往閱讀 ↗", "Read more ↗")}</a></div>`;
  }
  function selectFlow(id) {
    const f = flows.get(id);
    if (!f) return;
    clearWalker();
    selectedBuilding = null;
    selectedIsland = f.from.find((x) => islands.has(x)) || null;
    highlight();
    showFlows([id]);
    flyTo("all-card");
    const walkersOn = peopleSys.people.filter((w) => w.kind === "flow" && w.flow === id);
    cardShow(
      `<div class="card-head"><div class="icon-tile flow"><b>${id}</b></div><div><div class="eyebrow">CONNECTION · ${tr("協作線", "CONNECTION")}</div><h2>${esc(txt(f.text))}</h2></div></div>
      <div class="pills"><span class="pill">${esc(tierLabel(f.evidenceTier))}</span><span class="pill soft">${walkersOn.length} ${tr("位市民在這條線上", "residents on this line")}</span></div>
      <div class="route"><div>${f.from.map((x) => `<span class="stop">${islands.has(x) ? icon(x, "sm") : ""}${esc(nameOf(x))}</span>`).join("")}</div><i aria-hidden="true">→</i><div>${f.to.map((x) => `<span class="stop">${islands.has(x) ? icon(x, "sm") : ""}${esc(nameOf(x))}</span>`).join("")}</div></div>
      <div class="stat-row"><div class="stat" style="--accent:#db6a41"><span class="lbl">${tr("搬運圖示", "Badge")}</span><b>${esc(tr(...(CARRY_LABEL[f.carry] || [f.carry, f.carry])))}</b></div><div class="stat" style="--accent:#3e7c8c"><span class="lbl">${tr("角色", "Carrier")}</span><b>${esc(tr(...(ROLE_LABEL[f.walker] || [f.walker, f.walker])))}</b></div></div>
      ${f.edgeNotes?.length ? `<h3>${tr("各段依據", "BASIS BY BRANCH")}</h3><ul class="facts">${f.edgeNotes.map((e) => `<li>${esc(nameOf(e.to))}：${esc(tierLabel(e.tier))}</li>`).join("")}</ul>` : ""}
      <h3>${tr("關係出處", "SOURCES")}</h3>${sourceLinks(f.sources)}${f.quotes.map((qid) => quoteHTML(quotes.get(qid))).join("")}`,
    );
    trackSelect("flow", id);
  }
  function renderTree() {
    const q = $("#search").value.trim().toLowerCase(),
      root = $("#tree");
    root.innerHTML = "";
    if (treeMode === "flows") {
      D.flows
        .filter((f) => JSON.stringify(f).toLowerCase().includes(q))
        .forEach((f) => {
          const b = document.createElement("button");
          b.className = "flow-item";
          b.innerHTML = `<b>${f.id}</b>${esc(txt(f.text))}<br><span class="count">${esc(tierLabel(f.evidenceTier))}</span>`;
          b.onclick = () => selectFlow(f.id);
          root.appendChild(b);
        });
    } else
      for (const i of D.islands) {
        const matchName = JSON.stringify(i.name).toLowerCase().includes(q),
          bs = i.buildings.filter((b) => matchName || JSON.stringify(b).toLowerCase().includes(q));
        if (!bs.length) continue;
        const details = document.createElement("details");
        details.open = !!q;
        if (q) details.dataset.auto = "1"; // opened by the search filter, not by the reader
        details.dataset.isl = i.id;
        if (i.id === selectedIsland) details.classList.add("current");
        details.innerHTML = `<summary><span class="index">${String(i.number).padStart(2, "0")}</span><span class="item-name">${esc(english ? txt(i.name) : shortNames[i.id])}</span><span class="count">${bs.length} ↗</span></summary><div class="children"><button class="island-open">${tr("探索此技能島", "Explore this island")} ↗</button>${bs.map((b) => `<button data-id="${b.id}"><b class="pin-no">${CIRC[i.buildings.indexOf(b)] || ""}</b>${esc(txt(b.name))}</button>`).join("")}</div>`;
        details.querySelector(".island-open").onclick = () => selectIsland(i.id);
        details.querySelectorAll("[data-id]").forEach((b) => {
          b.onclick = () => selectBuilding(b.dataset.id);
          if (canHover) {
            b.onmouseenter = () => hoverItem(b.dataset.id, true);
            b.onmouseleave = () => hoverItem(b.dataset.id, false);
            b.onfocus = () => hoverItem(b.dataset.id, true);
            b.onblur = () => hoverItem(b.dataset.id, false);
          }
        });
        details.addEventListener("toggle", () => {
          if (details.dataset.auto) return void delete details.dataset.auto;
          if (details.open) {
            root.querySelectorAll("details[open]").forEach((o) => o !== details && (o.open = false));
            if (selectedIsland !== i.id) selectIsland(i.id);
            else showPins(i.id);
          }
        });
        root.appendChild(details);
      }
    if (!root.children.length) root.textContent = tr("沒有符合的項目", "No matching items");
  }
  $("#search").oninput = renderTree;
  // `change` fires once the viewer commits a query (Enter or leaving the field), not per keystroke.
  $("#search").addEventListener("change", () => {
    const term = $("#search").value.trim();
    if (term) track("heart_island_search", { search_term: term });
  });
  for (const mode of ["policies", "flows"])
    $("#tab-" + mode).onclick = () => {
      treeMode = mode;
      $("#tab-policies").classList.toggle("active", mode === "policies");
      $("#tab-flows").classList.toggle("active", mode === "flows");
      renderTree();
      track("heart_island_list_tab", { tab: mode });
    };
  renderTree();
  let dayLightIds = new Set();
  let dayLightKey = "";
  function updateDay(fromClock = false) {
    const value = Math.floor(dayMinutes),
      h = Math.floor(value / 60),
      m = value % 60;
    $("#clock").value = `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
    $("#day").value = value;
    const now = value,
      mins = (s) => {
        const [h, m] = s.split(":").map(Number);
        return h * 60 + m;
      };
    const active = D.dayCycle.filter((s) => now >= mins(s.from) && now < mins(s.to));
    dayLightIds = new Set(active.flatMap((s) => s.lights));
    const lightKey = [...dayLightIds].join();
    const lightsChanged = lightKey !== dayLightKey;
    dayLightKey = lightKey;
    $("#day-note").textContent =
      active.map((s) => txt(s.label)).join(" / ") || tr("城市日常", "City life");
    env.setTime(value);
    // night balance: windows and lamps glow, but the ground keeps its detail (no wash-out)
    setGlow(env.night * 3.2);
    poolMat.opacity = env.night * 0.5;
    spillMat.opacity = env.night * 0.22;
    islandGlowMat.opacity = env.night * 0.1;
    beamMat.opacity = 0; // beams read as white streaks from above; lighthouse lamps glow instead
    stringMat.opacity = env.night * 0.85;
    for (const f of ferries) f.lamp.material.opacity = env.night;
    document.body.classList.toggle("night", env.night > 0.5);
    if (typeof updateHud === "function") updateHud();
    // the running clock calls this about 10×/s; highlight() walks every building part, so only redo it when the set of
    // lit-up places actually changed (other callers — sliders, panels — always refresh)
    if (!fromClock || lightsChanged) highlight();
  }
  $("#day").oninput = (e) => {
    dayMinutes = Number(e.target.value);
    updateDay();
  };
  $("#day-play").onclick = () => {
    dayPlaying = !dayPlaying;
    $("#day-play").textContent = dayPlaying ? "Ⅱ" : "▶";
    $("#day-play").setAttribute("aria-label", dayPlaying ? tr("暫停一天", "Pause day") : tr("播放一天", "Play day"));
    dirty = true;
  };
  function setPanel(next) {
    mode = next;
    $$("[data-panel]").forEach((b) => {
      b.classList.toggle("active", b.dataset.panel === next);
      b.setAttribute("aria-selected", b.dataset.panel === next);
    });
    $$(".panel").forEach((p) => p.classList.toggle("active", p.id === "panel-" + next));
    if (next !== "day") {
      dayPlaying = false;
      $("#day-play").textContent = "▶";
      env.setTime(720);
      setGlow(0);
    } else updateDay();
    highlight();
  }
  $$("[data-panel]").forEach(
    (b) =>
      (b.onclick = () => {
        setPanel(b.dataset.panel);
        track("heart_island_panel", { panel: b.dataset.panel });
      }),
  );
  const termEN = ["Inauguration", "6 months", "Years 1–2", "Years 3–4", "Years 5–8"];
  function setTerm(index) {
    termIndex = index;
    $$("#term-buttons button").forEach((b, n) => b.classList.toggle("active", n === index));
    const text =
      index === 1
        ? tr(
            "",
            "",
          )
        : tr(
            "",
            "",
          );
    $("#term-note").textContent = text;
    const termList = [];
    for (const b of buildings.values()) {
      if (stageSegs(b).has(index)) termList.push(b);
    }
    if (index === 1) flyTo("civil");
    else flyTo("all");
    highlight();
    if (index !== 0)
      cardShow(
        `<div class="eyebrow">TERM / ${esc(english ? termEN[index] : txt(D.termTimeline[index].label))}</div><h2>${tr("數位花園演進階段", "Evolution stages")}</h2><p class="small">${esc(text)}</p>${termList.length ? termList.map((b) => `<h3>${esc(txt(b.name))}</h3><p>${esc(txt(b.phase.label))}</p><button data-building="${b.id}">${tr("查看內容與來源", "Details and source")} ↗</button>`).join("") : `<p>${tr("此區間沒有可精確對應的官方時程。", "No official schedule can be precisely mapped to this interval.")}</p>`}<p class="small">${tr("", "Only items with stated stages are listed; qualitative phases are not converted.")}</p>`,
      );
  }
  D.termTimeline.forEach((t, n) => {
    const b = document.createElement("button");
    b.textContent = english ? termEN[n] : txt(t.label);
    b.className = n === 0 ? "active" : "";
    b.onclick = () => setTerm(n);
    $("#term-buttons").appendChild(b);
  });
  for (const h of "HEART") {
    const b = document.createElement("button");
    b.textContent = `${h} ${HEART_SHORT[h] || ""}`;
    b.title = HEART_LABEL[h] || h;
    b.setAttribute("aria-pressed", "false");
    b.onclick = () => {
      selectedHeart.has(h) ? selectedHeart.delete(h) : selectedHeart.add(h);
      b.setAttribute("aria-pressed", selectedHeart.has(h));
      highlight();
      track("heart_island_heart_filter", { heart_letter: h, active: selectedHeart.has(h) });
    };
    $("#heart-buttons").appendChild(b);
  }
  const reset = document.createElement("button");
  reset.textContent = tr("全部", "All");
  reset.className = "reset";
  reset.onclick = () => {
    selectedHeart.clear();
    $$("#heart-buttons [aria-pressed]").forEach((b) => b.setAttribute("aria-pressed", "false"));
    highlight();
    track("heart_island_heart_filter", { heart_letter: "all", active: false });
  };
  $("#heart-buttons").appendChild(reset);
  var followAnchor = null;
  function clearWalker() {
    followAnchor = null;
    selectedWalker = null;
    selRing.visible = false;
  }
  function home() {
    clearWalker();
    document.body.classList.remove("card-open");
    selectedIsland = null;
    selectedBuilding = null;
    showPins(null);
    $("#card").hidden = true;
    showFlows([]);
    highlight();
    flyTo("all");
  }
  $("#home").onclick = home;
  $("#card").addEventListener("click", (e) => {
    const link = e.target.closest(".sources a, .quote a");
    if (link) track("heart_island_source_click", { link_url: link.href });
  });
  $("#card-close").onclick = () => {
    document.body.classList.remove("card-open");
    $("#card").hidden = true;
    selectedBuilding = null;
    highlight();
  };
  $("#sidebar-toggle").onclick = () => {
    if (innerWidth <= 800) $("#sidebar").classList.toggle("mobile-open");
    else app.classList.toggle("sidebar-hidden");
  };
  $("#mobile-close").onclick = () => $("#sidebar").classList.remove("mobile-open");
  const ray = new THREE.Raycaster();
  ray.params.Line = { threshold: 0.1 };
  let down = null;
  renderer.domElement.addEventListener("pointerdown", () => document.body.classList.add("interacted"), { once: true });
  setTimeout(() => document.body.classList.add("interacted"), 12000);
  renderer.domElement.addEventListener("pointerdown", (e) => {
    down = { x: e.clientX, y: e.clientY };
    fly = null;
  });
  renderer.domElement.addEventListener("pointerup", (e) => {
    if (tourActive || !down || Math.hypot(e.clientX - down.x, e.clientY - down.y) > 6) return;
    const rect = renderer.domElement.getBoundingClientRect();
    ray.setFromCamera(
      new THREE.Vector2(((e.clientX - rect.left) / rect.width) * 2 - 1, (-(e.clientY - rect.top) / rect.height) * 2 + 1),
      camera,
    );
    const hits = ray.intersectObjects(pickables, false).filter((h) => h.object.visible);
    for (const hit of hits) {
      const u = hit.object.userData;
      if (u.type === "buildingBatch") {
        const owner = u.items[hit.instanceId]?.owner;
        if (owner) {
          selectBuilding(owner);
          return;
        }
      } else if (u.type === "walker") {
        const pi = peopleSys.personFromHit(hit.object, hit.instanceId);
        if (pi !== null) {
          selectWalker(pi);
          return;
        }
      } else if (u.type === "flow") {
        selectFlow(u.id);
        return;
      } else if (u.type === "island") {
        selectIsland(u.id);
        return;
      }
    }
  });
  renderer.domElement.addEventListener("keydown", (e) => {
    if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(e.key) || tourActive) return;
    e.preventDefault();
    const offset = camera.position.clone().sub(controls.target),
      s = new THREE.Spherical().setFromVector3(offset);
    s.theta += e.key === "ArrowLeft" ? 0.12 : e.key === "ArrowRight" ? -0.12 : 0;
    s.phi = THREE.MathUtils.clamp(
      s.phi + (e.key === "ArrowUp" ? -0.07 : e.key === "ArrowDown" ? 0.07 : 0),
      controls.minPolarAngle,
      controls.maxPolarAngle,
    );
    camera.position.copy(controls.target).add(new THREE.Vector3().setFromSpherical(s));
    controls.update();
    dirty = true;
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Tab" && !$("#intro").hidden) {
      e.preventDefault();
      (document.activeElement === $("#intro-next") ? $("#intro-skip") : $("#intro-next")).focus();
      return;
    }
    if (e.key === "Escape") {
      if (tourActive) stopTour();
      else if (!$("#intro").hidden) closeIntro();
      else {
        $("#card").hidden = true;
        document.body.classList.remove("card-open");
        $("#sidebar").classList.remove("mobile-open");
      }
    }
    if (e.code === "Space" && tourActive && !["INPUT", "BUTTON"].includes(document.activeElement.tagName)) {
      e.preventDefault();
      toggleTour();
    }
    if (e.key.toLowerCase() === "h" && tourActive) app.classList.toggle("capture");
  });
  const introSteps = [
    [
      "每座島嶼是一塊技能領域",
      `${D.islands.length} 個等大六邊形，構成 kywk 的技能島與數位花園。點擊任一島嶼，或用右側清單探索知識模組。`,
      "Each island is a skill domain",
      `${D.islands.length} hexagons form kywk's skill-island city. Select an island or use the knowledge index.`,
    ],
    [
      "居民穿梭在不同領域之間",
      "選取島嶼即可看見跨領域協作流向。點擊路上穿梭的居民，能看見他正在搬運什麼靈感與造物。",
      "Residents carry knowledge across islands",
      "Select an island to reveal cross-domain knowledge flows, or click a traveler to inspect their cargo.",
    ],
    [
      "島嶼的一天伴隨光影流轉",
      "上方可隨時切換清晨、正午、黃昏與深夜光影；也可點擊鳥瞰全景或暫停動畫。",
      "Day and night flow with cartographic light",
      "Switch between dawn, daylight, dusk and night, or toggle top-down view to survey the whole vault.",
    ],
  ];
  let introStep = 0;
  function showIntro() {
    const s = introSteps[introStep];
    $("#intro-count").textContent = `INSIDE KYWK / 0${introStep + 1}`;
    $("#intro-title").textContent = english ? s[2] : s[0];
    $("#intro-body").textContent = english ? s[3] : s[1];
    $("#intro-next").textContent = introStep === 2 ? tr("走進技能島 →", "Enter the island →") : tr("下一步 →", "Next →");
    $("#intro-skip").textContent = tr("略過", "Skip");
    $("#intro").hidden = false;
    $("#intro-next").focus();
  }
  function closeIntro() {
    $("#intro").hidden = true;
    try {
      localStorage.setItem("heart-city-onboarded", "1");
    } catch {}
    renderer.domElement.focus();
  }
  $("#intro-next").onclick = () => {
    if (introStep === 2) {
      closeIntro();
      track("heart_island_intro", { action: "complete" });
    } else {
      introStep++;
      showIntro();
    }
  };
  $("#intro-skip").onclick = () => {
    closeIntro();
    track("heart_island_intro", { action: "skip", step: introStep + 1 });
  };
  $("#help").onclick = () => {
    introStep = 0;
    showIntro();
  };
  function startTour() {
    closeIntro();
    tourActive = true;
    tourPlaying = !reduced.matches;
    tourSeconds = 0;
    tourCue = -1;
    app.classList.add("tour");
    controls.enabled = false;
    $("#card").hidden = true;
    dayPlaying = false;
    selectedHeart.clear();
    $$("#heart-buttons [aria-pressed]").forEach((b) => b.setAttribute("aria-pressed", "false"));
    mode = "day";
    updateTour(true);
    resize();
    $("#tour-pause").textContent = tourPlaying ? tr("暫停", "Pause") : tr("播放", "Play");
    $("#tour-replay").textContent = tr("重播", "Replay");
    $("#tour-exit").textContent = tr("離開", "Exit");
    dirty = true;
    track("heart_island_tour_start");
  }
  function stopTour() {
    tourActive = false;
    tourPlaying = false;
    app.classList.remove("tour", "capture");
    controls.enabled = true;
    setPanel("day");
    home();
    resize();
  }
  function toggleTour() {
    tourPlaying = !tourPlaying;
    $("#tour-pause").textContent = tourPlaying ? tr("暫停", "Pause") : tr("播放", "Play");
    dirty = true;
  }
  function updateTour(force = false) {
    const n = Math.min(
      D.tour.cues.length - 1,
      D.tour.cues.findIndex((c) => tourSeconds >= c.from && tourSeconds < c.to) === -1
        ? D.tour.cues.length - 1
        : D.tour.cues.findIndex((c) => tourSeconds >= c.from && tourSeconds < c.to),
    );
    $("#tour-time").textContent = `${String(Math.floor(tourSeconds)).padStart(2, "0")} / 78`;
    if (n !== tourCue || force) {
      tourCue = n;
      const cue = D.tour.cues[n];
      selectedIsland = cue.target === "all" ? null : cue.target;
      selectedBuilding = null;
      showFlows(cue.flows);
      flyTo(cue.target);
      dayMinutes = cue.target === "lunch" ? 720 : cue.target === "family" ? 1200 : cue.target === "card" ? 900 : 480;
      updateDay();
      const q = cue.quotes.map((id) => quotes.get(id));
      $("#tour-caption").innerHTML = q.length
        ? `${q.map((q) => `<div class="quote-text">「${esc(txt(q.text))}」</div><div class="quote-source">${esc(txt(q.program))} · ${esc(q.timecode)}</div>`).join("")}`
        : `<div class="caption">${esc(txt(cue.caption))}</div><div class="tour-stage">${cue.target === "transport" ? tr("目標：第 5–8 年", "Target: years 5–8") : n === D.tour.cues.length - 1 ? "kywk.me · INSIDE KYWK" : ""}</div>`;
      highlight();
    }
  }
  $("#tour-pause").onclick = toggleTour;
  $("#tour-replay").onclick = startTour;
  $("#tour-exit").onclick = stopTour;
  controls.addEventListener("change", () => {
    dirty = true;
  });
  reduced.addEventListener("change", () => {
    controls.enableDamping = !reduced.matches;
    for (const p of flowPaths) p.mesh.material.uniforms.uReduced.value = reduced.matches ? 1 : 0;
    if (reduced.matches) {
      fly = null;
      dayPlaying = false;
      tourPlaying = false;
      $("#day-play").textContent = "▶";
      $("#tour-pause").textContent = tr("播放", "Play");
    }
    dirty = true;
  });
  // Read-only QA snapshot plus explicit navigation hooks used for reproducible local screenshots.
  function walkerScreenStats() {
    const w = renderer.domElement.clientWidth,
      h = renderer.domElement.clientHeight;
    const blockers = pickables.filter((m) => m.userData.type === "buildingBatch" || m.userData.type === "island");
    let visible = 0,
      total = 0,
      minPx = Infinity;
    const r2 = new THREE.Raycaster();
    for (const p of peopleSys.people) {
      if (p.kind !== "flow" || !p.world) continue;
      total++;
      const head = p.world.clone().setY(p.world.y + 0.41 * (p.drawScale || 0.8));
      const foot = p.world.clone();
      const a = head.clone().project(camera),
        f = foot.clone().project(camera);
      if (Math.abs(a.x) > 1 || Math.abs(a.y) > 1 || a.z > 1) continue;
      const px = Math.abs(a.y - f.y) * 0.5 * h;
      const dir = head.clone().sub(camera.position);
      const dist = dir.length();
      r2.set(camera.position, dir.normalize());
      r2.far = dist - 0.05;
      const hit = r2.intersectObjects(blockers, false)[0];
      if (hit) continue;
      if (px < 1) continue;
      visible++;
      minPx = Math.min(minPx, px);
    }
    return { total, visible, minHeightPx: Math.round(minPx * 10) / 10 };
  }
  function selectWalker(index) {
    const w = peopleSys.people[index];
    if (!w) return;
    if (w.kind === "puma" || w.kind === "lord") {
      selectedWalker = index;
      selRing.visible = true;
      followAnchor = null;
      const at = (w.world || new THREE.Vector3()).clone();
      const off = new THREE.Vector3(0.9, 2.5, 2.3); // higher angle so buildings don't hide him
      const target = at.clone();
      let pos = target.clone().add(off);
      if (stage.clientWidth > 800) {
        const right = new THREE.Vector3(off.z, 0, -off.x).normalize().multiplyScalar(0.6);
        target.sub(right);
        pos.sub(right);
      } else {
        // phones: the card covers the lower half, so aim in front of him and he sits in the upper half
        const fwd = new THREE.Vector3(0.2, 0, 0.5);
        target.add(fwd);
        pos.add(fwd);
      }
      if (reduced.matches) {
        camera.position.copy(pos);
        controls.target.copy(target);
      } else fly = { time: performance.now(), from: camera.position.clone(), to: pos, old: controls.target.clone(), target };
      cardShow(w.kind === "lord" ? lordCard(w) : pumaCard(w));
      if (w.kind === "lord") track("heart_island_lord_found");
      return;
    }
    if (w.kind !== "flow") {
      cardShow(`<div class="card-head"><div class="icon-tile role">${roleGlyph(w.role)}</div><div><div class="eyebrow">${esc(tr("城市居民", "City resident"))}</div><h2>${esc(tr(...ROLE_LABEL[w.role]))}</h2></div></div>`);
      return;
    }
    selectedWalker = index;
    selRing.visible = true;
    const f = flows.get(w.flow);
    showFlows([w.flow]);
    const at = w.world || w.route.pts[0];
    const target = at.clone();
    const off = new THREE.Vector3(1.6, 1.9, 2.4);
    let pos = target.clone().add(off);
    if (stage.clientWidth > 800) {
      const right = new THREE.Vector3(off.z, 0, -off.x).normalize().multiplyScalar(0.7);
      target.sub(right);
      pos.sub(right);
    }
    if (reduced.matches) {
      camera.position.copy(pos);
      controls.target.copy(target);
    } else fly = { time: performance.now(), from: camera.position.clone(), to: pos, old: controls.target.clone(), target };
    cardShow(walkerCard(w, f));
    requestAnimationFrame(() => {
      try {
        const url = portrait(w),
          t = document.querySelector("#card .icon-tile.role");
        if (url && t) {
          t.classList.add("portrait");
          t.innerHTML = `<img src="${url}" alt=""><span class="glyph">${roleGlyph(w.role)}</span>`;
        }
      } catch {}
    });
  }
  // 彩蛋角色：技能島守護者（虛構角色）
  function lordCard(w) {
    const stops = w.order.map((id) => `<span class="pill soft">${String(islands.get(id).number).padStart(2, "0")} ${esc(english ? txt(islands.get(id).name) : shortNames[id])}</span>`).join("");
    return `<div class="card-head"><div class="icon-tile role puma-tile lord-tile">✦</div><div><div class="eyebrow">${esc(tr("彩蛋角色・10% 機率出現", "EASTER EGG · 10% CHANCE"))}</div><h2>${esc(tr("技能島守護者（Obsidian 領航員）", "The Vault Navigator"))}</h2></div></div>
      <p class="lede">${esc(tr("恭喜，你遇到技能島守護者了！他只有 10% 的機率出現在島上，負責巡視 1,858 篇公開筆記的雙向連結。", "Lucky you: the Vault Navigator turns up on only 1 visit in 10, patrolling 1,858 published notes."))}</p>
      <h3>${esc(tr("關於守護者", "ABOUT"))}</h3>
      <ul class="facts">
        <li>${esc(tr("穿梭在三大知識庫與三個時間流日誌之間，確保每一條 [[Wiki-Link]] 與自動推導的 Slug 都暢行無阻。", "Travels across the 3 knowledge bases and 3 log streams, keeping every Wiki-Link and slug intact."))}</li>
        <li>${esc(tr("左手拿著 GPX 等高線地圖、右手握著終端機鍵盤，偶爾會在極境山徑島與開源造物島之間駐足。", "Carries a GPX contour map in one hand and a mechanical keyboard in the other."))}</li>
        <li>${esc(tr("每天在 14 座技能島之間巡島，哪條知識協作線有新靈感，他總是第一個知道。", "He patrols all 14 skill islands every day and is always the first to spot a new connection."))}</li>
      </ul>
      <h3>${esc(tr("守護者私房推薦", "NAVIGATOR RECOMMENDS"))}</h3>
      <p>${esc(tr("守護者最近都在開源造物實驗室打磨 Docusaurus 與 Obsidian 工具組，一起來逛逛吧。", "Lately he spends his time crafting open-source Obsidian & Docusaurus tools."))}</p>
      <p><a class="card-goto-btn" href="/moco/Docusaurus/" target="_top">${esc(tr("前往 Docusaurus 開源造物專區 →", "Visit Open-Source Lab →"))}</a></p>
      <h3>${esc(tr("今天的巡島路線", "TODAY'S ROUTE"))}</h3><div class="pills">${stops}</div>`;
  }
  function pumaCard(w) {
    const stops = w.order.map((id) => `<span class="pill soft">${String(islands.get(id).number).padStart(2, "0")} ${esc(english ? txt(islands.get(id).name) : shortNames[id])}</span>`).join("");
    return `<div class="card-head"><div class="icon-tile role puma-tile">✦</div><div><div class="eyebrow">${esc(tr("島主", "ISLAND EXPLORER"))}</div><h2>${esc(tr("kywk（島主 · 數位探險家）", "kywk (Explorer & Maker)"))}</h2></div></div>
      <p class="lede">${esc(tr(`你找到他了。他會照 01 到 ${String(D.islands.length).padStart(2, "0")} 的順序，一格一格巡訪每一座技能島；每到一處，就站上肥皂箱跟大家分享探險筆記，再往下一座島嶼出發。`, `You found him. He walks the ${D.islands.length} skill islands in order, 01 to ${String(D.islands.length).padStart(2, "0")}; at each island he shares expedition notes, then moves on.`))}</p>
      <h3>${esc(tr("關於島主", "ABOUT"))}</h3>
      <ul class="facts">
        <li>${esc(tr("kywk — 數位探險家、軟體工程師、長程徒步者、攝影愛好者。", "kywk — Software engineer, long-distance trekker, photographer, lifehacker."))}</li>
        <li>${esc(tr("從喜馬拉雅安娜普納 5,416M 到終端機游標，在代碼、鏡頭與山海間穿梭。", "From Annapurna Circuit 5,416m to the terminal prompt, exploring code, optics, and mountains."))}</li>
        <li>${esc(tr("維護 kywk.me 數位花園：Obsidian Vault 雙向連結 × Docusaurus 現代出版。", "Maintains kywk.me digital garden: Obsidian Vault bidirectional links meets Docusaurus publishing."))}</li>
        <li>${esc(tr("座右銘：「有些事現在不做，一輩子都不會做了 — Now or Never.」", "Motto: \"Now or Never.\""))}</li>
        <li>${esc(tr("累計 1,858 篇原創筆記與日誌，打造這座交織知識與實踐的技能島。", "1,858 published notes and logs form the foundation of this skill island."))}</li>
      </ul>
      <a class="card-goto-btn" href="/life/about/" target="_top">前往閱讀島主介紹 →</a>
      <h3>${esc(tr("巡島航跡", "EXPEDITION ROUTE"))}</h3><div class="pills">${stops}</div>`;
  }
  const selRing = new THREE.Mesh(new THREE.RingGeometry(0.11, 0.15, 28).rotateX(-Math.PI / 2), new THREE.MeshBasicMaterial({ color: colors.coral, transparent: true, opacity: 0.9, depthWrite: false }));
  selRing.visible = false;
  selRing.renderOrder = 4;
  scene.add(selRing);
  function walkerCard(w, f) {
    const prog = w.route.total ? Math.round((w.s / w.route.total) * 100) : 0;
    return `<div class="card-head"><div class="icon-tile role">${roleGlyph(w.role)}</div><div><div class="eyebrow">${esc(tr("協作線上的市民", "Resident on a connection"))}</div><h2>${esc(tr(...ROLE_LABEL[w.role]))}</h2><div class="pills"><span class="pill flow">${f.id}</span><span class="pill">${esc(tierLabel(f.evidenceTier))}</span></div></div></div>
    <div class="stat-row"><div class="stat${tr(...(CARRY_LABEL[w.carry] || [w.carry, w.carry])).length > 4 ? " long" : ""}" style="--accent:#db6a41"><span class="lbl">${esc(tr("正在搬", "Carrying"))}</span><b>${esc(tr(...(CARRY_LABEL[w.carry] || [w.carry, w.carry])))}</b></div><div class="stat${(shortNames[w.from] || "").length > 4 ? " long" : ""}" style="--accent:#3e7c8c"><span class="lbl">${esc(tr("從", "From"))}</span><b>${esc(english ? nameOf(w.from) : shortNames[w.from] || nameOf(w.from))}</b></div><div class="stat${(shortNames[w.to] || "").length > 4 ? " long" : ""}" style="--accent:#e8c547"><span class="lbl">${esc(tr("到", "To"))}</span><b>${esc(english ? nameOf(w.to) : shortNames[w.to] || nameOf(w.to))}</b></div></div>
    <p class="doing"><i></i>${esc(w.wait > 0 ? tr("在", "At ") + nameOf(w.s >= w.route.total - 0.001 ? w.to : w.from) + tr("交接", ", handing over") : tr("正在前往 ", "Heading to ") + nameOf(w.dirSign > 0 ? w.to : w.from))}</p>
    <h3>${esc(tr("路程", "Route"))}</h3><div class="meter"><i style="width:${prog}%"></i></div>
    <h3>${esc(tr("這條協作在說什麼", "About this connection"))}</h3><p>${esc(txt(f.text))}</p>
    <h3>${esc(tr("關係出處", "SOURCES"))}</h3>${sourceLinks(f.sources)}${f.quotes.map((id) => quoteHTML(quotes.get(id))).join("")}`;
  }
  function roleGlyph(role) {
    const m = { "civil-servant": "樞", researcher: "源", elder: "閱", child: "奇", parent: "活", cyclist: "極", farmer: "浪", citizen: "漫", hiker: "山", worker: "架", officeworker: "筆", youth: "碼", traveller: "旅" };
    return `<span>${m[role] || "人"}</span>`;
  }
  // Ground height for add-ons (the 「我的角色」 avatar): static scene only — walkers, connection lines, labels and
  // see-through effects are skipped — and instanced meshes get fresh bounds once, so islet tops and plazas are hit.
  let groundMeshes = null;
  const groundRay = new THREE.Raycaster();
  function groundAt(x, z, fromY = 3, maxDrop = 6) {
    if (!groundMeshes) {
      const skip = new Set([...peopleSys.meshes, ...flowPaths.map((p) => p.mesh)]);
      groundMeshes = [];
      scene.traverse((o) => {
        if (!o.isMesh || skip.has(o) || o.isSprite) return;
        const m = o.material;
        if (!m || Array.isArray(m) || m.transparent || m.depthWrite === false || m.isShaderMaterial) return;
        if (o.isInstancedMesh) o.computeBoundingSphere();
        groundMeshes.push(o);
      });
    }
    groundRay.set(new THREE.Vector3(x, fromY, z), new THREE.Vector3(0, -1, 0));
    groundRay.far = maxDrop;
    const shown = (o) => { for (let p = o; p; p = p.parent) if (!p.visible) return false; return true; };
    for (const h of groundRay.intersectObjects(groundMeshes, false)) {
      if (!shown(h.object)) continue;
      // a top surface, not the side of a wall or a trunk
      const ny = h.face ? h.face.normal.clone().transformDirection(h.object.matrixWorld).y : 1;
      if (ny > 0.5 || h.object.isInstancedMesh) return h.point.y;
    }
    return null;
  }
  groundAt(0, 0); // snapshot the site's own meshes now, before any add-on (the avatar) puts its figures in the scene
  window.heartCity = {
    groundAt,
    pedestrianRoutes: peopleSys.people
      .filter((w) => w.kind === "flow")
      .map((w) =>
        Array.from({ length: 120 }, (_, n) => {
          const { p } = peopleSys.sample(w, n / 120);
          return { x: p.x, z: p.z, footY: p.y };
        }),
      ),
    footprints: kit.footprints,
    routeIslands: peopleSys.routeIslands,
    districtHeroes,
    sceneModels: Object.fromEntries(
      [...visual].map(([id, v]) => [id, { kind: sceneSpecs[id][0], description: sceneSpecs[id][1], parts: v.parts.length, island: buildings.get(id).island }]),
    ),
    view: (id, dx = 1.2, dy = 1.1, dz = 1.6, ox = 0, oz = 0) => {
      // QA close-up: look at an island (or [x,z]) from a fixed offset
      const c = Array.isArray(id) ? new THREE.Vector3(id[0], 0, id[1]) : centers.get(id).clone();
      const t = c.setY(top + 0.25).add(new THREE.Vector3(ox, 0, oz));
      fly = null;
      controls.target.copy(t);
      camera.position.copy(t).add(new THREE.Vector3(dx, dy, dz));
      controls.update();
      dirty = true;
    },
    nudge: (deg) => {
      // QA: turn the current view a little around its own target (simulates a slow finger drag)
      const off = camera.position.clone().sub(controls.target).applyAxisAngle(new THREE.Vector3(0, 1, 0), THREE.MathUtils.degToRad(deg));
      fly = null;
      camera.position.copy(controls.target).add(off);
      controls.update();
      dirty = true;
    },
    orbit: (deg) => {
      // rotate the overview camera around the city centre (QA shots of all four sides)
      const t = overviewTarget();
      const off = overviewPosition().sub(t);
      off.applyAxisAngle(new THREE.Vector3(0, 1, 0), THREE.MathUtils.degToRad(deg));
      fly = null;
      camera.position.copy(t).add(off);
      controls.target.copy(t);
      controls.update();
      dirty = true;
    },
    debug: {
      walkerScreenStats,
      pumaQuote: (k = 0) => {
        pumaForce = k;
        dirty = true;
      },
      people: () => peopleSys.people.map((w, i) => ({ i, kind: w.kind, role: w.role, flow: w.flow, pos: w.world ? [w.world.x, w.world.y, w.world.z] : null })),
      islets: () => (decor.islets || []).map((o) => ({ ...o, screen: (() => { const v = new THREE.Vector3(o.x, 0.3, o.z).project(camera); return [Math.round(((v.x + 1) / 2) * innerWidth), Math.round(((1 - v.y) / 2) * innerHeight)]; })() })),
      timeClip: (n = 5) => {
        const t = performance.now();
        for (let k = 0; k < n; k++) clipLabels();
        return +((performance.now() - t) / n).toFixed(2);
      },
      flowRouteCheck: () => {
        // QA: every drawn branch follows the walkway graph, and every walker on a branch walks exactly that line
        const key = (v) => `${v.x.toFixed(3)},${v.z.toFixed(3)}`;
        const nodeAt = new Map(graph.nodes.map((n, i) => [key(n.p), i]));
        const bad = [];
        let branches = 0, walkers = 0, unwalked = [];
        for (const p of paths) {
          if (!p.mesh) continue;
          branches++;
          const pts = p.route.pts;
          for (let k = 1; k < pts.length; k++) {
            const a = nodeAt.get(key(pts[k - 1])), b = nodeAt.get(key(pts[k]));
            if (a == null || b == null || !graph.isEdge(a, b)) { bad.push([p.flow, p.from, p.to, "off-walkway", k]); break; }
          }
          const ws = peopleSys.people.filter((w) => w.kind === "flow" && w.flow === p.flow && w.from === p.from && w.to === p.to);
          if (!ws.length) unwalked.push(`${p.flow}:${p.from}>${p.to}`);
          for (const w of ws) { walkers++; if (w.route !== p.route) bad.push([p.flow, p.from, p.to, "walker-off-line"]); }
        }
        return { branches, walkers, bad, unwalked };
      },
      flowAudit: () =>
        paths.map((p) => {
          const pts = p.route.pts, a = pts[0], b = pts[pts.length - 1];
          const near = (v) => { let best = null, bd = 1e9; for (const id of islands.keys()) { const d = Math.hypot(centers.get(id).x - v.x, centers.get(id).z - v.z); if (d < bd) { bd = d; best = id; } } return [best, +bd.toFixed(2)]; };
          const ws = peopleSys.people.filter((w) => w.kind === "flow" && w.flow === p.flow && w.from === p.from && w.to === p.to);
          return { flow: p.flow, from: p.from, to: p.to, len: +p.route.total.toFixed(2), ratio: +(p.route.total / Math.max(0.01, Math.hypot(a.x - b.x, a.z - b.z))).toFixed(2), start: near(a), end: near(b), toDist: +Math.hypot(centers.get(p.to).x - b.x, centers.get(p.to).z - b.z).toFixed(2), fromDist: +Math.hypot(centers.get(p.from).x - a.x, centers.get(p.from).z - a.z).toFixed(2), via: [...p.route.islands], walkers: ws.map((w) => w.role) };
        }),
      firstWalker: (flow) => peopleSys.people.findIndex((w) => w.kind === "flow" && w.flow === flow),
      decorStats: () => kit.decorStats(),
      envStats: () => env.stats,
      renewalLabels: () => !renewalSign ? [] : [...renewalGhosts.children.filter((o) => o.isCSS2DObject).map((o) => o.element.textContent), renewalSign.element.textContent],
      coast: () => decor.coastStats,
      center: (id) => [centers.get(id).x, centers.get(id).z, R],
      puma: () => {
        const i = peopleSys.people.findIndex((w) => w.kind === "puma");
        const w = peopleSys.people[i];
        return { index: i, at: w?.atIsland, waiting: w?.waiting, leg: w?.leg, legs: w?.legs.map((l) => +l.total.toFixed(2)), world: w?.world && [+w.world.x.toFixed(2), +w.world.z.toFixed(2)] };
      },
      pins: () => [...pinViews.keys()],
      routes: () => ({ routes: decor.routes, ends: decor.routeEnds, diplomacy: [centers.get("diplomacy").x, centers.get("diplomacy").z], R }),
      bridges: () => bridges.map((b) => ({ a: b.a, b: b.b, pa: [b.pa.x, b.pa.z], pb: [b.pb.x, b.pb.z], ca: [centers.get(b.a).x, centers.get(b.a).z], cb: [centers.get(b.b).x, centers.get(b.b).z] })),
      luminance: () => {
        renderer.render(scene, camera);
        const gl = renderer.getContext();
        const w = gl.drawingBufferWidth,
          h = gl.drawingBufferHeight;
        const px = new Uint8Array(w * h * 4);
        gl.readPixels(0, 0, w, h, gl.RGBA, gl.UNSIGNED_BYTE, px);
        let sum = 0,
          n = 0;
        for (let i = 0; i < px.length; i += 4 * 7) {
          sum += 0.2126 * px[i] + 0.7152 * px[i + 1] + 0.0722 * px[i + 2];
          n++;
        }
        return sum / n;
      },
      lightKinds: () => ({ windows: kit.batches.get("glowbox")?.length || 0, bulbs: kit.batches.get("glowsphere")?.length || 0, lampPools: (decor.lampSpots || []).length, lighthouses: (decor.lighthouses || []).length, strings: (decor.stringLights || []).length, ferryLamps: ferries.length }),
      cyclist: () => {
        const w = peopleSys.people.find((p) => p.role === "cyclist");
        if (!w) return null;
        const P = w.plan.parts;
        const saddle = P.find((p) => p.g === "box" && Math.abs(p.off[1] - 0.162) < 0.001);
        const hip = P.find((p) => p.ch === "pedalL" && p.g === "leg");
        const bar = P.find((p) => p.g === "box" && Math.abs(p.off[1] - 0.255) < 0.001);
        const arm = P.find((p) => p.ch === "rideL" && p.g === "arm");
        return { saddleTop: saddle.off[1] + saddle.s[1] / 2, hipBottom: hip.off[1] + 0.065 - 0.065 * 2 + 0.13 - 0.065, pedalChannels: P.filter((p) => p.ch === "pedalL" || p.ch === "pedalR").length, rideArms: P.filter((p) => p.ch === "rideL" || p.ch === "rideR").length, barY: bar.off[1], shoulderY: arm.off[1] + 0.05 };
      },
      trees: () => ({ leaf: kit.batches.get("leaf")?.length || 0, bigTrees: kit.decorStats ? Object.values(kit.decorStats()).length : 0, smoothCrowns: (kit.batches.get("sphere") || []).filter((p) => p.scale.x > 0.3 && p.scale.y > 0.25 && p.color.g > p.color.r * 1.15 && p.color.g > p.color.b * 1.2).length }),
    },
    get state() {
      return {
        islands: islands.size,
        buildings: buildings.size,
        flows: flows.size,
        walkers: peopleSys.people.filter((w) => w.kind === "flow").length,
        ambient: peopleSys.people.filter((w) => w.kind === "ambient").length,
        visibleWalkers: peopleSys.people.filter((w) => w.kind === "flow" && (!selectedFlows.size || selectedFlows.has(w.flow))).length,
        selectedIsland,
        selectedBuilding,
        selectedFlows: [...selectedFlows],
        tourActive,
        tourSeconds,
        reducedMotion: reduced.matches,
        quality,
        drawBuffer: [renderer.domElement.width, renderer.domElement.height],
        fps,
        drawCalls: renderer.info.render.calls,
        triangles: renderer.info.render.triangles,
        excludedRetailAnimated: flowPaths.some((p) => p.to === "street-retail"),
        cameraElevation:
          90 - THREE.MathUtils.radToDeg(new THREE.Spherical().setFromVector3(camera.position.clone().sub(controls.target)).phi),
      };
    },
    selectIsland,
    selectBuilding,
    selectFlow,
    selectWalker,
    // 2026-10-24：外掛（角色）接手鏡頭前，停掉站方進行中的鏡頭飛行與居民追隨，避免兩邊同時移動鏡頭
    onFrame(fn) {
      frameHooks.add(fn);
      return () => frameHooks.delete(fn);
    },
    releaseCamera() {
      fly = null;
      if (selectedWalker !== null) clearWalker();
    },
    home,
    startTour,
    stopTour,
    setTime(m) {
      setPanel("day");
      dayMinutes = m;
      updateDay();
      dirty = true;
    },
    peopleCloseup() {
      const c = centers.get("civil");
      const target = new THREE.Vector3(c.x - 0.9, top + 0.2, c.z + 1.9);
      fly = null;
      camera.position.copy(target.clone().add(new THREE.Vector3(1.4, 1.15, 2.3)));
      controls.target.copy(target);
      controls.update();
      showBadgesForce = true;
      dirty = true;
    },
    horizonView() {
      fly = null;
      controls.maxPolarAngle = THREE.MathUtils.degToRad(80);
      controls.minPolarAngle = THREE.MathUtils.degToRad(60);
      controls.target.copy(cityCenter).add(new THREE.Vector3(0, 3.0, -10));
      camera.position.copy(cityCenter.clone().add(new THREE.Vector3(4, 5.2, 24)));
      controls.update();
      dirty = true;
    },
    openLog() {
      setToggle("log", true);
    },
    seekTour(seconds) {
      if (!tourActive) startTour();
      tourSeconds = Math.max(0, Math.min(78, seconds));
      tourPlaying = false;
      $("#tour-pause").textContent = tr("播放", "Play");
      updateTour(true);
      dirty = true;
    },
  };
  let showBadgesForce = false;
  // 2026-10-24：外掛（角色）的每幀更新改由這裡呼叫，排在鏡頭控制與繪製之前；
  // 原本外掛自己用 requestAnimationFrame，會排在站方繪製之後，名牌與鏡頭比畫面晚一幀，移動時會抖動閃爍
  const frameHooks = new Set();
  // 2026-10-25: adaptive resolution (busy laptop GPU, big retina window); the rules live in resolution.js.
  const prMax = renderer.getPixelRatio();
  const resolution = createResolutionGovernor({ max: prMax, min: Math.min(prMax, 1) });
  function adaptResolution(now, frameMs, idle) {
    const next = resolution.sample(now, frameMs, idle);
    if (next === null) return;
    renderer.setPixelRatio(next);
    resize();
    dirty = true;
  }
  const _followDelta = new THREE.Vector3(),
    _tagProj = new THREE.Vector3();
  let wasNamesNow = false,
    lastSunX = NaN,
    lastSunY = NaN,
    lastSunZ = NaN,
    lastLodOn = null;
  function animate(now) {
    requestAnimationFrame(animate);
    if (!debug) adaptResolution(now, now - lastTime, document.hidden || frozen || !dirty);
    for (const f of frameHooks) {
      try {
        if (f(now)) dirty = true;
      } catch (e) {
        console.warn("frame hook", e);
        frameHooks.delete(f);
      }
    }
    const dt = Math.min(0.08, (now - lastTime) / 1000);
    lastTime = now;
    fpsFrames++;
    if (now - fpsStart > 1200) {
      fps = Math.round((fpsFrames * 1000) / (now - fpsStart));
      fpsFrames = 0;
      fpsStart = now;
    }
    if (fly) {
      const t = Math.min(1, (now - fly.time) / 800),
        v = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      camera.position.lerpVectors(fly.from, fly.to, v);
      controls.target.lerpVectors(fly.old, fly.target, v);
      if (t === 1) fly = null;
      dirty = true;
    }
    // the city clock runs on its own (about 2.4 minutes per day); 暫停 freezes it with everything else
    if (dayPlaying && !frozen && !tourActive) {
      const before = Math.floor(dayMinutes);
      dayMinutes = (dayMinutes + dt * 10) % 1440;
      if (Math.floor(dayMinutes) !== before) updateDay(true);
    }
    if (tourActive && tourPlaying) {
      tourSeconds = Math.min(78, tourSeconds + dt);
      updateTour();
      if (tourSeconds === 78) {
        tourPlaying = false;
        $("#tour-pause").textContent = tr("播放", "Play");
      }
    }
    if (!reduced.matches && !frozen) {
      motionTime += dt;
      for (const p of flowPaths) if (p.mesh.visible) p.mesh.material.uniforms.uTime.value = motionTime;
      peopleSys.setFilter(selectedFlows.size ? selectedFlows : null);
      peopleSys.update(dt, motionTime, true, zoomFactor());
      env.update(dt, true);
      if (typeof tickLog === "function") tickLog(dt);
      dirty = true;
    }
    const camDist = camera.position.distanceTo(controls.target);
    labelRenderer.domElement.classList.toggle("compact", camDist > 24);
    document.body.classList.toggle("zoomed", camDist < 22);
    const lodOn = camDist < 26;
    signGroup.visible = camDist > 5.5 && camDist < 22 && !tourActive;
    if (signGroup.visible) for (const m of signGroup.children) if (m.userData.item) m.visible = !pinViews.has(m.userData.item) && m.position.distanceToSquared(camera.position) > (m.visible ? 16.0 : 19.36) && (!selectedIsland || m.userData.island === selectedIsland);
    for (const m of staticMeshes) if (m.userData.lod && m.visible !== lodOn) m.visible = lodOn;
    for (const o of routeTags) o.visible = selectedIsland === "diplomacy" || selectedFlows.has("F5") || selectedFlows.has("F15");
    for (const [n, b] of beams.entries()) b.rotation.y = motionTime * 0.6 + n * 1.3;
    for (const f of ferries) {
      const t = (motionTime * 0.035 + f.phase) % 1,
        u = t < 0.5 ? t * 2 : 2 - t * 2; // out then back
      const sx = f.r.start[0],
        sz = f.r.start[1],
        ex = f.r.end[0],
        ez = f.r.end[1];
      const tt = 0.04 + u * 0.92;
      const [px, pz] = bez(f.r, tt),
        [qx, qz] = bez(f.r, Math.min(1, tt + 0.01));
      f.g.position.x = px;
      f.g.position.z = pz;
      f.g.rotation.y = Math.atan2(qx - px, qz - pz) + (t < 0.5 ? 0 : Math.PI);
      f.crate.visible = t >= 0.5; // returns carrying cargo
    }
    peopleSys.setBadges(badgesOn && (showBadgesForce || camDist < 16), selectedIsland);
    if (selectedWalker !== null && peopleSys.people[selectedWalker]?.world) {
      const w = peopleSys.people[selectedWalker];
      if (!fly && !reduced.matches && !frozen && followAnchor) {
        // gently follow the selected resident
        _followDelta.subVectors(w.world, followAnchor);
        controls.target.add(_followDelta);
        camera.position.add(_followDelta);
      }
      if (!followAnchor) followAnchor = new THREE.Vector3();
      followAnchor.copy(w.world);
      selRing.position.set(w.world.x, w.world.y + 0.012, w.world.z);
      selRing.scale.setScalar((w.drawScale || 0.8) / 0.8);
    }
    updatePumaExtra(now);
    const namesNow = (showNames || showBadgesForce) && camDist < 14;
    if (!namesNow && wasNamesNow) {
      for (const o of nameTags) {
        o.visible = false;
        o.userData.wasShown = false;
      }
    }
    wasNamesNow = namesNow;
    {
      const cand = [];
      const indices = namesNow ? null : pumaLordIndices;
      const len = indices ? indices.length : nameTags.length;
      for (let idx = 0; idx < len; idx++) {
        const pi = indices ? indices[idx] : idx;
        const o = nameTags[pi];
        const w = peopleSys.people[pi];
        const isPuma = w.kind === "puma" || w.kind === "lord";
        const vis = isPuma ? !!w.world && camDist < 26 && !tourActive : namesNow && w.world && (w.kind !== "flow" || !selectedFlows.size || selectedFlows.has(w.flow)) && w.world.distanceToSquared(controls.target) < 20.25;
        o.visible = false;
        if (!vis) continue;
        if (w.kind === "puma") {
          const stop = w.waiting ? `${String(islands.get(w.atIsland).number).padStart(2, "0")} ${english ? txt(islands.get(w.atIsland).name) : shortNames[w.atIsland]}` : "";
          if (o.userData.stop !== stop) {
            o.userData.stop = stop;
            o.element.querySelector(".stop").textContent = stop ? tr("走訪 ", "at ") + stop : "";
            o.element.classList.toggle("talking", !!stop);
          }
        }
        o.position.set(w.world.x, w.world.y + 0.5 * (w.drawScale || 0.8), w.world.z);
        const sp = _tagProj.copy(o.position).project(camera);
        const pri = (isPuma ? -200 : 0) + (pi === selectedWalker ? -100 : 0) + (w.kind === "flow" ? 0 : 10) + sp.z - (o.userData.wasShown ? 5 : 0);
        cand.push({ o, x: ((sp.x + 1) / 2) * innerWidth, y: ((1 - sp.y) / 2) * innerHeight, pri, wd: w.kind === "flow" ? 170 : isPuma ? 130 : 90 });
      }
      cand.sort((a, b) => a.pri - b.pri);
      const kept = [];
      for (const c of cand) {
        if (kept.some((k) => Math.abs(k.y - c.y) < 40 && Math.abs(k.x - c.x) < (k.wd + c.wd) / 2 + 10)) continue;
        kept.push(c);
        c.o.visible = true;
      }
      for (const c of cand) c.o.userData.wasShown = c.o.visible;
    }

    controls.update();
    env.cullClouds?.(camera);
    if (dirty) {
      const sp = env.sun.position;
      const sx = Math.round(sp.x * 100),
        sy = Math.round(sp.y * 100),
        sz = Math.round(sp.z * 100);
      if (sx !== lastSunX || sy !== lastSunY || sz !== lastSunZ || lodOn !== lastLodOn) {
        lastSunX = sx;
        lastSunY = sy;
        lastSunZ = sz;
        lastLodOn = lodOn;
        renderer.shadowMap.needsUpdate = true;
      }
      renderer.render(scene, debugCam || camera);
      labelRenderer.render(scene, camera);
      // Label collision checks measure every label (write → read → forced layout, ~120 per frame when zoomed in).
      // Run them about 8×/s, or at once when the shown labels, the selection or the layout change.
      // 跑得快的裝置（上次 < 3ms）每幀都檢查，標籤跟著鏡頭移動時才不會先壓到介面、隔一下才消失（看起來像閃一下）
      const sig = labelSignature();
      if (clipCost < 3 || now - lastClip > 120 || sig !== clipSig) {
        const t0 = performance.now();
        clipLabels();
        clipCost = clipCost * 0.7 + (performance.now() - t0) * 0.3;
        lastClip = now;
        clipSig = sig;
      }
      dirty = false;
    }
  }
  // ---------- mobile chrome: time panel / layers bar on demand, half-height index sheet ----------
  const isMobile = () => innerWidth <= 800;
  const setMobPanel = (which) => {
    for (const k of ["time"]) {
      const on = which === k && !document.body.classList.contains("m-" + k);
      document.body.classList.toggle("m-" + k, on);
      $("#mob-" + k)?.setAttribute("aria-pressed", String(on));
    }
    dirty = true;
  };
  $("#mob-time").onclick = () => setMobPanel("time");
  const sheet = $("#sidebar");
  $("#sheet-handle").onclick = () => sheet.classList.toggle("full");
  // phone detail card: two sizes — one third of the screen (map stays visible) or full screen; the choice sticks
  {
    const card = $("#card");
    const setCardFull = (full) => {
      cardFull = full;
      card.classList.toggle("full", full);
      $("#card-handle").setAttribute("aria-expanded", String(full));
      dirty = true;
    };
    window.__setCardFull = setCardFull;
    $("#card-handle").onclick = () => setCardFull(!cardFull);
    let y0 = null;
    const h = $("#card-handle");
    h.addEventListener("touchstart", (e) => (y0 = e.touches[0].clientY), { passive: true });
    h.addEventListener("touchend", (e) => {
      if (y0 === null) return;
      const dy = e.changedTouches[0].clientY - y0;
      y0 = null;
      if (dy < -30) setCardFull(true);
      else if (dy > 30) cardFull ? setCardFull(false) : $("#card-close").click();
    });
    setCardFull(false);
  }
  {
    let y0 = null;
    const h = $("#sheet-handle");
    h.addEventListener("touchstart", (e) => (y0 = e.touches[0].clientY), { passive: true });
    h.addEventListener("touchend", (e) => {
      if (y0 === null) return;
      const dy = e.changedTouches[0].clientY - y0;
      y0 = null;
      if (dy < -30) sheet.classList.add("full");
      else if (dy > 30) sheet.classList.contains("full") ? sheet.classList.remove("full") : sheet.classList.remove("mobile-open");
    });
  }
  new MutationObserver(() => {
    if (!sheet.classList.contains("mobile-open") && sheet.classList.contains("full")) sheet.classList.remove("full");
  }).observe(sheet, { attributes: true, attributeFilter: ["class"] });
  const syncBrand = () => {
    const br = document.querySelector(".brand");
    if (!br || !br.offsetParent) return;
    const r = br.getBoundingClientRect(),
      st = document.documentElement.style;
    st.setProperty("--brand-bottom", Math.round(r.bottom) + "px");
    st.setProperty("--brand-left", Math.round(r.left) + "px");
    st.setProperty("--brand-w", Math.round(r.width) + "px");
    // right-hand button group: its left edge bounds the top bar (add-ons such as 「我的角色」 can widen it)
    const tb = document.querySelector("nav.toolbar");
    if (tb && tb.offsetParent) st.setProperty("--toolbar-left", Math.round(tb.getBoundingClientRect().left) + "px");
  };
  syncBrand();
  addEventListener("resize", syncBrand);
  {
    const br = document.querySelector(".brand");
    if (br) new ResizeObserver(syncBrand).observe(br, { box: "border-box" });
    const tb = document.querySelector("nav.toolbar");
    if (tb) new ResizeObserver(syncBrand).observe(tb, { box: "border-box" });
    new MutationObserver(() => requestAnimationFrame(syncBrand)).observe(document.body, { attributes: true, attributeFilter: ["class"] });
  }
  // touch screens: fire the tap on touchend ourselves. Mobile browsers sometimes spend the first tap on an emulated
  // :hover (or lose it when the label under the finger moves a pixel), which made buttons need two taps.
  if (!matchMedia("(hover: hover) and (pointer: fine)").matches) {
    let t0 = null;
    document.addEventListener(
      "touchstart",
      (e) => {
        const el = e.touches.length === 1 ? e.target.closest?.("button, summary") : null;
        t0 = el ? { el, x: e.touches[0].clientX, y: e.touches[0].clientY, t: performance.now() } : null;
      },
      { passive: true, capture: true },
    );
    document.addEventListener("touchmove", (e) => {
      if (t0 && Math.hypot(e.touches[0].clientX - t0.x, e.touches[0].clientY - t0.y) > 10) t0 = null;
    }, { passive: true, capture: true });
    document.addEventListener(
      "touchend",
      (e) => {
        const s = t0;
        t0 = null;
        if (!s || !e.cancelable || s.el.disabled || !s.el.isConnected) return;
        const p = e.changedTouches[0];
        if (Math.hypot(p.clientX - s.x, p.clientY - s.y) > 10 || performance.now() - s.t > 700) return;
        e.preventDefault(); // suppress the emulated hover/click pair; we deliver exactly one click
        s.el.click();
      },
      { passive: false, capture: true },
    );
  }
  document.fonts?.ready?.then(syncBrand);
  resize();
  camera.position.copy(overviewPosition());
  controls.target.copy(overviewTarget());
  controls.update();
  updateDay();
  updateWalkers();
  $("#loading").hidden = true;
  // time panel removed (2026-10-15): the clock always runs unless the viewer pauses or prefers reduced motion
  dayPlaying = !reduced.matches && params.get("clock") !== "stop";
  requestAnimationFrame(animate);
  const focus = params.get("focus");
  if (focus) {
    const i = D.islands.find((i) => i.id === focus || txt(i.name).includes(focus) || i.name.zh.includes(focus));
    if (i) selectIsland(i.id, { silent: true });
  } else {
    let seen = false;
    try {
      seen = localStorage.getItem("heart-city-onboarded") === "1";
    } catch {}
    if (!seen) showIntro();
  }
} catch (error) {
  console.error(error);
  $("#loading").innerHTML =
    `<h2>INSIDE KYWK</h2><p>${tr("城市載入失敗，請重新整理頁面。", "The city could not load. Serve this folder over a local HTTP server.")}</p><p>${esc(error.message)}</p>`;
}
