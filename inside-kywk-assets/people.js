// Chibi pedestrians. Flow walkers take their role from flows[].walker and their badge from flows[].carry.
// Ambient figures are decorative, belong to no flow, and open no policy card.
import { RoundedBoxGeometry } from "../vendor/three/examples/jsm/geometries/RoundedBoxGeometry.js";
import { mulberry } from "./environment.js?v=20261026-1";

export const ROLE_LABEL = {
  "civil-servant": ["Vault 維護者", "Vault Keeper"],
  researcher: ["開源造物者", "Open-Source Maker"],
  elder: ["資深旅人", "Veteran Traveler"],
  child: ["好奇探索者", "Curious Explorer"],
  parent: ["生活系統師", "Life Architect"],
  cyclist: ["極客騎士", "Geek Cyclist"],
  farmer: ["技術衝浪手", "Tech Surfer"],
  citizen: ["花園漫步者", "Garden Walker"],
  hiker: ["高山徒步者", "Alpine Trekker"],
  worker: ["架構工程師", "System Engineer"],
  officeworker: ["專注寫作者", "Focused Writer"],
  traveller: ["跨國背包客", "Backpacker"],
  youth: ["全端開發者", "Full-Stack Dev"],
  puma: ["kywk（島主 · 數位探險家）", "kywk (Explorer & Maker)"],
  wheelchair: ["無障礙探索者", "Accessible Explorer"],
  islandlord: ["技能島守護者", "Vault Navigator"],
};
export const CARRY_LABEL = {
  bed: ["山屋紀錄", "Mountain Hut Log"],
  crosswalk: ["等高線軌跡", "Contour Track"],
  energy: ["系統動能", "System Energy"],
  clock: ["時光膠囊", "Time Capsule"],
  blueprint: ["架構藍圖", "Architecture Blueprint"],
  folder: ["雙向連結筆記", "Wiki-Link Notes"],
  globe: ["世界航跡", "World Trail"],
  schoolbag: ["探索行囊", "Daypack"],
  towel: ["完賽毛巾", "Finisher Towel"],
  dumbbell: ["配速課表", "Pace Plan"],
  cards: ["讀書卡片", "Reading Cards"],
  "book-heart": ["隨筆手稿", "Essay Manuscript"],
  counseling: ["靈感火花", "Spark of Idea"],
  chip: ["AI 與容器", "AI & Container"],
  sapling: ["百岳林相", "Alpine Flora"],
  basket: ["開源套件", "Open-Source Kit"],
  passport: ["旅人護照", "Travel Passport"],
};

const SKIN = [0xf3cfae, 0xe6b48f, 0xcf9670, 0xf0c4a0];
const HAIR = [0x2e2522, 0x4a3426, 0x1f1d22, 0x6b4a33];
const CASUAL = [0x6f7fb5, 0x58a6a6, 0xe8c547, 0xf2a1a1, 0x8fb37a, 0xb58fd0];

export function createPeople(THREE, scene, opts) {
  const { graph, flowsData, paths, islandsMap, centers, top, reduced, quality, colors } = opts;
  const rnd = mulberry(41);
  const G = {
    // 2026-10-26: ~200 residents × ~25 parts are drawn every frame (never culled: they are everywhere), ~460K triangles.
    // Rounded boxes 2 → 1 bevel segment, head 16×12 → 14×10, hair cap 16×8 → 14×7: about 45% fewer triangles,
    // no visible difference at map scale.
    leg: new RoundedBoxGeometry(1, 1, 1, 1, 0.3),
    body: new THREE.CapsuleGeometry(0.5, 0.6, 4, 10),
    arm: new RoundedBoxGeometry(1, 1, 1, 1, 0.35),
    head: new THREE.SphereGeometry(0.5, 14, 10),
    cap: new THREE.SphereGeometry(0.5, 14, 7, 0, Math.PI * 2, 0, Math.PI * 0.55),
    eye: new THREE.SphereGeometry(0.5, 8, 6),
    box: new RoundedBoxGeometry(1, 1, 1, 1, 0.2),
    cyl: new THREE.CylinderGeometry(0.5, 0.5, 1, 10),
    cone: new THREE.ConeGeometry(0.5, 1, 14),
    torus: new THREE.TorusGeometry(0.5, 0.09, 6, 18),
    band: new THREE.CylinderGeometry(0.5, 0.5, 1, 32, 1, true), // smooth open band (the island keeper's visor)
    brim: new THREE.SphereGeometry(0.5, 24, 12),
    shadow: new THREE.CircleGeometry(0.5, 20),
  };
  G.shadow.rotateX(-Math.PI / 2);
  const mat = new THREE.MeshStandardMaterial({ roughness: 0.7 });
  const shadowMat = new THREE.MeshBasicMaterial({ color: 0x2a2018, transparent: true, opacity: 0.22, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -4, polygonOffsetUnits: -8 });
  // slots: one InstancedMesh per geometry; capacity grows per registration
  const slotDefs = {};
  const people = [];
  function plan(role, kind, opts2) {
    // returns list of part descriptors (geometry, local offset, scale, colour, animation channel)
    const P = [];
    const skin = SKIN[Math.floor(rnd() * SKIN.length)];
    let hair = HAIR[Math.floor(rnd() * HAIR.length)];
    let shirt = CASUAL[Math.floor(rnd() * CASUAL.length)],
      pants = [0x3b3a42, 0x4a5a78, 0x6b5a4a][Math.floor(rnd() * 3)];
    let sc = 1;
    if (role === "child") sc = 0.78;
    if (role === "elder") hair = 0xd9d4cc;
    if (role === "researcher") shirt = 0xfbfbf7;
    if (role === "civil-servant") shirt = 0xf4efe6;
    if (role === "farmer") shirt = 0x8fb37a;
    if (role === "worker") shirt = 0x4a5a78;
    if (role === "puma") {
      // easter-egg figure: curly dark hair, white shirt under a campaign-orange vest, navy trousers, white trainers
      sc = 1.16;
      shirt = 0xfbfbf7;
      pants = 0x2f3a4a;
      hair = 0x241c1a;
    }
    if (role === "islandlord") {
      // easter-egg figure (2026-10-26): loose wavy hair, golf outfit — sky-blue polo, khaki chinos, white visor and shoes
      sc = 1.08;
      shirt = 0x9fcbe3; // polo
      pants = 0xcdb68e; // khaki chinos
      hair = 0x2a221f;
    }
    const add = (g, off, s, c, ch = null, r = null) => P.push({ g, off, s, c, ch, r });
    // legs (pivot at hip y=.13)
    add("leg", [-0.032, 0.065, 0], [0.05, 0.13, 0.058], pants, "legL");
    add("leg", [0.032, 0.065, 0], [0.05, 0.13, 0.058], pants, "legR");
    const shoe = role === "puma" || role === "islandlord" ? 0xf6f4ef : 0x2a2524; // Puma wears white trainers (the island keeper, golf shoes)
    add("box", [-0.032, 0.012, 0.012], [0.055, 0.025, 0.085], shoe, "legL");
    add("box", [0.032, 0.012, 0.012], [0.055, 0.025, 0.085], shoe, "legR");
    // body
    if (role === "researcher") add("body", [0, 0.185, 0], [0.13, 0.14, 0.11], shirt);
    else add("body", [0, 0.2, 0], [0.135, 0.11, 0.115], shirt);
    if (role === "civil-servant") {
      add("box", [0, 0.205, 0.004], [0.128, 0.11, 0.104], colors.coral); // vest
      add("box", [0, 0.2, 0.056], [0.03, 0.04, 0.008], 0xffffff); // badge
      add("box", [0, 0.235, 0.054], [0.006, 0.05, 0.004], 0x3e7c8c); // lanyard
    }
    if (role === "worker") {
      add("box", [0, 0.205, 0.003], [0.128, 0.11, 0.104], 0xf2a33a);
      add("box", [0, 0.2, 0.0], [0.13, 0.014, 0.106], 0xf5f5ef);
    }
    // arms (pivot at shoulder y=.255)
    add("arm", [-0.077, 0.205, 0], [0.034, 0.1, 0.038], shirt === 0xf4efe6 ? colors.coral : shirt, "armL");
    add("arm", [0.077, 0.205, 0], [0.034, 0.1, 0.038], shirt === 0xf4efe6 ? colors.coral : shirt, "armR");
    add("eye", [-0.077, 0.15, 0], [0.034, 0.034, 0.034], skin, "armL");
    add("eye", [0.077, 0.15, 0], [0.034, 0.034, 0.034], skin, "armR");
    // head
    add("head", [0, 0.345, 0], [0.19, 0.178, 0.172], skin, "head");
    // hair: a shell clearly larger than the head (the old near-equal shell z-fought and read as bald patches),
    // tipped back so a fringe sits above the eyes; plus a per-person style
    const hatted = ["child", "cyclist", "hiker", "worker", "farmer", "puma", "islandlord"].includes(role);
    if (role === "islandlord") add("cap", [0, 0.372, -0.008], [0.2, 0.15, 0.198], hair, "head", [0.12, 0, 0]); // smaller shell: its rim stays hidden under the visor band
    else add("cap", [0, 0.352, -0.006], [0.206, hatted ? 0.17 : 0.19, 0.204], hair, "head", [-0.32, 0, 0]);
    if (!hatted) {
      const styles = role === "elder" ? ["short", "bun", "short"] : role === "youth" ? ["beanie", "long", "pony", "puff"] : ["short", "long", "bun", "pony", "short", "puff"];
      const st = opts2?.hairStyle || styles[Math.floor(rnd() * styles.length)];
      if (st === "long") add("box", [0, 0.31, -0.07], [0.19, 0.13, 0.05], hair, "head", [0.12, 0, 0]);
      if (st === "bun") add("eye", [0, 0.44, -0.07], [0.075, 0.07, 0.07], hair, "head");
      if (st === "pony") add("eye", [0, 0.33, -0.115], [0.055, 0.1, 0.05], hair, "head", [0.35, 0, 0]);
      if (st === "puff") for (const [dx, dy] of [[-0.07, 0.4], [0.07, 0.4], [0, 0.435]]) add("eye", [dx, dy, -0.02], [0.09, 0.08, 0.09], hair, "head");
      if (st === "beanie") {
        const knit = [0xdb6a41, 0x58a6a6, 0xe8c547, 0x6f7fb5][Math.floor(rnd() * 4)];
        add("cap", [0, 0.376, -0.008], [0.222, 0.17, 0.218], knit, "head", [-0.2, 0, 0]);
        add("eye", [0, 0.465, -0.02], [0.045, 0.045, 0.045], 0xfff8f0, "head");
      }
    }
    add("eye", [-0.036, 0.348, 0.081], [0.021, 0.027, 0.012], 0x221c1c, "head");
    add("eye", [0.036, 0.348, 0.081], [0.021, 0.027, 0.012], 0x221c1c, "head");
    add("eye", [-0.056, 0.324, 0.074], [0.024, 0.013, 0.008], 0xf2a1a1, "head");
    add("eye", [0.056, 0.324, 0.074], [0.024, 0.013, 0.008], 0xf2a1a1, "head");
    // carried item held in front (flow walkers), coloured by carry type
    const CARRY_PROP = {
      bed: ["box", [0.09, 0.05, 0.06], 0xffffff],
      crosswalk: ["box", [0.1, 0.015, 0.07], 0xf2efe8],
      energy: ["box", [0.05, 0.07, 0.04], 0xf1c232],
      clock: ["cyl", [0.07, 0.025, 0.07], 0xf1c232],
      folder: ["box", [0.08, 0.06, 0.015], 0x3e7c8c],
      globe: ["eye", [0.075, 0.075, 0.075], 0x5f9aa6],
      towel: ["box", [0.08, 0.03, 0.05], 0xfbfbf7],
      dumbbell: ["cyl", [0.025, 0.1, 0.025], 0x3b3a42],
      cards: ["box", [0.07, 0.045, 0.012], 0xe8c547],
      "book-heart": ["box", [0.07, 0.08, 0.02], colors.coral],
      counseling: ["eye", [0.06, 0.05, 0.03], 0xffffff],
      chip: ["box", [0.06, 0.012, 0.06], 0x2f5a46],
    };
    if (kind && CARRY_PROP[kind]) {
      const [g, s, c] = CARRY_PROP[kind];
      add(g, [0, 0.19, 0.085], s, c, "carry");
      if (kind === "dumbbell") for (const d of [-0.045, 0.045]) add("cyl", [d, 0.19, 0.085], [0.045, 0.02, 0.045], 0x3b3a42, "carry");
    }
    // role accessories
    switch (role) {
      case "civil-servant":
        add("box", [0.1, 0.2, 0.02], [0.02, 0.08, 0.06], 0x3e7c8c, "armR");
        break;
      case "researcher":
        add("cyl", [-0.1, 0.19, 0.02], [0.03, 0.12, 0.03], 0x7fa8d8, "armL");
        add("eye", [0, 0.352, 0.086], [0.09, 0.012, 0.008], 0x2e2522, "head"); // glasses bar
        break;
      case "elder":
        add("cyl", [0.105, 0.09, 0.03], [0.012, 0.18, 0.012], 0x7a5a3e, "armR");
        add("box", [0, 0.21, 0.0], [0.13, 0.1, 0.11], 0x9c8a6a);
        break;
      case "child":
        add("cap", [0, 0.39, 0], [0.205, 0.13, 0.195], 0xf1c232, "head");
        add("cyl", [0, 0.39, 0.02], [0.24, 0.008, 0.22], 0xf1c232, "head");
        add("box", [0, 0.2, -0.07], [0.1, 0.11, 0.05], [colors.coral, 0x4a6fa5, 0x58a6a6][Math.floor(rnd() * 3)]);
        break;
      case "parent":
        // stroller ahead
        // stroller well ahead of the parent: body on four wheels, handle reaching back to the hands
        add("box", [0, 0.1, 0.25], [0.1, 0.08, 0.14], 0x6f7fb5, "stroller");
        add("cap", [0, 0.14, 0.21], [0.11, 0.1, 0.1], 0x58a6a6, "stroller");
        for (const [dx, dz] of [
          [-0.05, 0.2],
          [0.05, 0.2],
          [-0.05, 0.3],
          [0.05, 0.3],
        ])
          add("torus", [dx, 0.03, dz], [0.045, 0.045, 0.045], 0x2a2524, "wheelX");
        add("box", [0, 0.06, 0.25], [0.08, 0.01, 0.12], 0x2a2524, "stroller");
        add("box", [0, 0.17, 0.13], [0.008, 0.008, 0.12], 0x2a2524, "stroller", [0.6, 0, 0]);
        break;
      case "cyclist":
        add("cap", [0, 0.385, 0], [0.205, 0.12, 0.195], 0xe8c547, "head");
        break;
      case "farmer":
        add("cone", [0, 0.415, 0], [0.34, 0.07, 0.34], 0xd8b878, "head");
        add("cyl", [0.11, 0.15, 0.02], [0.08, 0.06, 0.08], 0x9c7a4e, "armR");
        add("eye", [0.11, 0.19, 0.02], [0.06, 0.04, 0.06], 0x7fa35e, "armR");
        break;
      case "hiker":
        add("box", [0, 0.21, -0.075], [0.11, 0.14, 0.07], 0xc06a3a);
        add("cyl", [0.1, 0.12, 0.03], [0.01, 0.24, 0.01], 0x4a4a52, "armR");
        add("cap", [0, 0.39, 0], [0.214, 0.1, 0.206], 0x58a6a6, "head");
        break;
      case "worker":
        add("cap", [0, 0.395, 0], [0.21, 0.13, 0.2], 0xf1c232, "head");
        add("cyl", [0, 0.39, 0.02], [0.22, 0.01, 0.22], 0xf1c232, "head");
        break;
      case "traveller":
        add("box", [0.11, 0.08, 0.0], [0.05, 0.13, 0.1], [colors.coral, 0x3e7c8c, 0xe8c547][Math.floor(rnd() * 3)], "trolley");
        add("cyl", [0.11, 0.17, 0.0], [0.008, 0.06, 0.008], 0x2a2524, "trolley");
        break;
      case "officeworker":
        add("cyl", [0.1, 0.16, 0.03], [0.03, 0.05, 0.03], 0xf6efe3, "armR");
        break;
      case "youth":
        add("box", [0, 0.21, -0.07], [0.1, 0.1, 0.05], 0x2f3a46);
        break;
      case "puma": {
        // curly hair: a ring of small curls around the crown + a few on top
        for (let k = 0; k < 10; k++) {
          const a = (k / 10) * Math.PI * 2;
          if (Math.cos(a) > 0.82) continue; // keep the face clear
          add("eye", [Math.sin(a) * 0.088, 0.385, Math.cos(a) * 0.08 - 0.008], [0.062, 0.058, 0.062], hair, "head");
        }
        for (const [dx, dz] of [[-0.035, -0.02], [0.035, -0.02], [0, 0.03], [0, -0.06]]) add("eye", [dx, 0.43, dz], [0.066, 0.056, 0.066], hair, "head");
        // glasses: two thin dark rims over the eyes, a bridge, and arms back to the ears
        for (const dx of [-0.038, 0.038]) add("torus", [dx, 0.35, 0.09], [0.05, 0.044, 0.05], 0x211d1d, "head");
        add("box", [0, 0.352, 0.091], [0.026, 0.006, 0.006], 0x211d1d, "head");
        for (const dx of [-0.093, 0.093]) add("box", [dx, 0.352, 0.045], [0.006, 0.006, 0.09], 0x211d1d, "head");
        add("box", [0, 0.205, 0.004], [0.13, 0.112, 0.106], colors.coral); // vest
        add("box", [0, 0.235, 0.058], [0.03, 0.05, 0.004], 0xfbfbf7); // open collar
        add("eye", [0.035, 0.225, 0.06], [0.026, 0.026, 0.01], 0x58a6a6); // small wave pin
        // soapbox, shown only while he stops at a policy island
        add("box", [0, 0.035, 0], [0.2, 0.07, 0.16], 0xb48560, "soap");
        add("box", [0, 0.035, 0.081], [0.12, 0.03, 0.004], 0xfff1de, "soap");
        break;
      }
      case "islandlord": {
        // textured quiff (reference photo): longer hair on top lifted off the forehead and swept back and over to his left,
        // a little overhang above the faded side, a few textured ends at the back
        // loose waves under a visor (2026-10-26): every wave sits on the crown, above the visor band and inside its
        // outline, so no hair sticks out at the sides or the back; the back of the head is the smooth hair shell
        {
          const W2 = 0x352b27;
          for (let k = 0; k < 8; k++) {
            const a = (k / 8) * Math.PI * 2 + 0.2;
            if (Math.cos(a) > 0.8) continue; // the front is covered by the fringe
            add("eye", [Math.sin(a) * 0.06, 0.414, Math.cos(a) * 0.056 - 0.012], [0.07, 0.042, 0.052], k % 3 ? hair : W2, "head", [Math.cos(a) * 0.3, a, -Math.sin(a) * 0.3]);
          }
          for (const [x, z, sx, ry] of [[-0.028, -0.02, 0.08, 0.4], [0.032, -0.028, 0.076, -0.5], [0.0, 0.025, 0.084, 0.15], [0.008, -0.058, 0.074, 0.9]])
            add("eye", [x, 0.435, z], [sx, 0.044, 0.06], hair, "head", [0, ry, 0]); // waves on top
          for (const [x, y, z, rz, c] of [[-0.03, 0.43, 0.042, 0.35, hair], [0.02, 0.436, 0.046, -0.25, W2], [0.05, 0.424, 0.034, -0.5, hair]])
            add("eye", [x, y, z], [0.064, 0.03, 0.04], c, "head", [-0.35, 0, rz]); // wavy fringe, above the band
        }
        // golf outfit (refined 2026-10-26): sky-blue polo with a soft white collar, a three-button placket, a small coral
        // chest logo and slim side seams; short sleeves with ribbed cuffs (bare forearms); khaki chinos with front creases
        // and back pockets, a tan belt with a silver buckle; a one-piece white visor (no dark band) with a coral logo;
        // a white glove; white golf shoes with tan saddles and dark soles; a driver held in the left hand.
        const POLO = shirt, WHITE = 0xf7f6f2, RIB = 0x8fbfda, SEAM = 0x8cb9d2, CORAL = colors.coral;
        for (const pt of P) if (pt.g === "arm") pt.c = skin; // short sleeves: bare forearms
        for (const ch of ["armL", "armR"]) {
          const x = ch === "armL" ? -0.077 : 0.077;
          add("arm", [x, 0.232, 0], [0.04, 0.05, 0.043], POLO, ch); // sleeve
          add("box", [x, 0.207, 0], [0.042, 0.009, 0.045], RIB, ch); // ribbed cuff
        }
        // collar: a soft band and two rounded points lying on the chest
        add("cyl", [0, 0.283, -0.004], [0.092, 0.018, 0.084], WHITE);
        for (const sx of [-1, 1]) add("eye", [0.018 * sx, 0.27, 0.05], [0.036, 0.012, 0.03], WHITE, null, [0.55, 0, -0.45 * sx]);
        add("box", [0, 0.24, 0.0585], [0.016, 0.046, 0.004], RIB); // placket
        for (const y of [0.255, 0.24, 0.225]) add("eye", [0, y, 0.0612], [0.006, 0.006, 0.003], WHITE); // buttons
        add("eye", [0.04, 0.235, 0.0595], [0.016, 0.012, 0.004], CORAL); // chest logo
        for (const sx of [-1, 1]) add("box", [0.069 * sx, 0.19, 0], [0.003, 0.09, 0.05], SEAM); // side seams
        // belt and trousers
        add("cyl", [0, 0.137, 0], [0.137, 0.015, 0.117], 0x9a6b44); // belt
        add("box", [0, 0.137, 0.0585], [0.018, 0.013, 0.004], 0xd3d6da); // buckle
        for (const ch of ["legL", "legR"]) {
          const x = ch === "legL" ? -0.032 : 0.032;
          add("box", [x, 0.072, 0.0295], [0.003, 0.1, 0.002], 0xb59f78, ch); // front crease
          add("box", [x, 0.112, -0.0295], [0.024, 0.022, 0.002], 0xb59f78, ch); // back pocket
          add("box", [x, 0.013, 0.0], [0.057, 0.018, 0.04], 0xb88a5f, ch); // shoe saddle
          add("box", [x, 0.001, 0.012], [0.056, 0.004, 0.086], 0x3a3438, ch); // sole
        }
        // visor: one white piece — a band round the head and a curved brim, small coral logo on the front
        add("band", [0, 0.376, -0.004], [0.214, 0.044, 0.206], WHITE, "head"); // smooth band, wide enough to hide the hair shell edge
        add("band", [0, 0.376, -0.004], [0.206, 0.044, 0.198], 0xeceae4, "head"); // inner face (the band is open), slightly shaded
        add("brim", [0, 0.36, 0.1], [0.166, 0.014, 0.094], WHITE, "head", [-0.18, 0, 0]);
        add("eye", [0, 0.376, 0.097], [0.022, 0.014, 0.006], CORAL, "head", [-0.05, 0, 0]);
        add("eye", [-0.077, 0.15, 0], [0.038, 0.038, 0.038], WHITE, "armL"); // glove
        // driver in the left hand: steel shaft angled to the ground, black grip, rounded black head
        add("cyl", [-0.1, 0.085, 0.035], [0.006, 0.15, 0.006], 0xc4c8ce, "armL", [0.25, 0, -0.22]);
        add("cyl", [-0.086, 0.15, 0.02], [0.011, 0.035, 0.011], 0x1f1d22, "armL", [0.25, 0, -0.22]);
        add("eye", [-0.119, 0.014, 0.054], [0.034, 0.022, 0.042], 0x1f1d22, "armL", [0, 0.4, 0]);
        break;
      }
      case "citizen":
        if (kind === "passport") {
          add("box", [0.11, 0.08, 0.0], [0.05, 0.13, 0.1], [colors.coral, 0x3e7c8c][Math.floor(rnd() * 2)], "trolley");
          add("cyl", [0.11, 0.17, 0.0], [0.008, 0.06, 0.008], 0x2a2524, "trolley");
        }
        if (kind === "sapling") {
          add("cyl", [0, 0.17, 0.07], [0.04, 0.04, 0.04], 0x9c7a4e, "carry");
          add("cone", [0, 0.24, 0.07], [0.07, 0.12, 0.07], 0x7fa35e, "carry");
        }
        break;
    }
    if (role === "cyclist") {
      // riding pose: the rider sits on the saddle (body lifted), hands on the bars, feet on the pedals
      const LIFT = 0.095;
      for (const pt of P) {
        pt.off = [pt.off[0], pt.off[1] + LIFT, pt.off[2] - 0.01];
        if (pt.ch === "legL") pt.ch = "pedalL";
        else if (pt.ch === "legR") pt.ch = "pedalR";
        else if (pt.ch === "armL" || pt.ch === "armR") pt.ch = "ride" + pt.ch.slice(3);
        else if (pt.ch === "carry") pt.off = [pt.off[0], pt.off[1] - 0.02, pt.off[2] + 0.06];
      }
      const frame = colors.coral,
        dark = 0x2a2524;
      for (const dz of [-0.15, 0.15]) {
        add("torus", [0, 0.078, dz], [0.155, 0.155, 0.155], dark, "wheelX");
        add("box", [0, 0.078, dz], [0.006, 0.13, 0.012], 0xbfbfc4, "spoke");
        add("box", [0, 0.078, dz], [0.006, 0.012, 0.13], 0xbfbfc4, "spoke");
      }
      add("box", [0, 0.14, 0.0], [0.022, 0.022, 0.28], frame); // top tube
      add("box", [0, 0.11, -0.07], [0.02, 0.09, 0.02], frame, null); // seat tube
      add("box", [0, 0.15, 0.13], [0.02, 0.15, 0.02], frame); // fork / head tube
      add("box", [0, 0.088, 0.055], [0.012, 0.012, 0.14], frame, null, [0.5, 0, 0]);
      add("box", [0, 0.162, -0.05], [0.05, 0.018, 0.07], dark); // saddle (just under the hips)
      add("box", [0, 0.255, 0.135], [0.13, 0.014, 0.014], dark); // handlebar
      add("cyl", [0, 0.068, 0.0], [0.035, 0.012, 0.035], 0x8a8a90, "crank");
      add("box", [0.04, 0.068, 0.0], [0.012, 0.012, 0.06], 0x8a8a90, "crankR");
      add("box", [-0.04, 0.068, 0.0], [0.012, 0.012, 0.06], 0x8a8a90, "crankL");
      add("box", [0.0, 0.16, 0.135], [0.05, 0.04, 0.04], 0x7aa0b0); // front basket
    }
    if (role === "wheelchair") {
      // seated on a wheelchair: legs fold forward from the hip (constant angle), arms push the rims while moving
      for (const pt of P) {
        if (pt.ch === "legL") pt.ch = "sitL";
        else if (pt.ch === "legR") pt.ch = "sitR";
      }
      const frame = 0x3e7c8c, dark = 0x2a2524, steel = 0xbfbfc4, seat = 0x3b3a42;
      for (const x of [-0.102, 0.102]) {
        add("torus", [x, 0.1, -0.015], [0.2, 0.2, 0.2], dark, "wheelX"); // big rear wheels
        add("torus", [x * 1.12, 0.1, -0.015], [0.165, 0.165, 0.165], steel, "wheelX"); // push rims
        add("box", [x, 0.1, -0.015], [0.006, 0.17, 0.012], steel, "spoke");
        add("box", [x, 0.1, -0.015], [0.006, 0.012, 0.17], steel, "spoke");
        add("torus", [x * 0.68, 0.024, 0.15], [0.048, 0.048, 0.048], dark, "wheelX"); // front casters
        add("box", [x * 0.84, 0.1, 0.06], [0.012, 0.012, 0.19], frame); // side rails
        add("box", [x * 0.84, 0.07, 0.15], [0.012, 0.07, 0.012], frame); // caster forks
        add("box", [x * 0.7, 0.275, -0.085], [0.012, 0.012, 0.045], dark); // push handles
      }
      add("box", [0, 0.116, 0.0], [0.15, 0.02, 0.125], seat); // seat
      add("box", [0, 0.2, -0.074], [0.145, 0.13, 0.014], seat); // backrest
      add("box", [0, 0.042, 0.165], [0.11, 0.012, 0.05], frame); // footrest
    }
    return { parts: P, scale: sc };
  }

  // ---------- routes ----------
  const routeCache = new Map();
  function routeFor(from, to, salt) {
    const key = `${from}>${to}>${salt}`;
    if (routeCache.has(key)) return routeCache.get(key);
    const fromIsland = islandsMap.has(from) ? from : nearestIsland(centers.get(from));
    const toIsland = islandsMap.has(to) ? to : nearestIsland(centers.get(to));
    const ringA = graph.ringIndex.get(fromIsland),
      ringB = graph.ringIndex.get(toIsland);
    const a = islandsMap.has(from) ? ringA[(salt * 5) % 12] : graph.nodeNear(fromIsland, centers.get(from));
    const b = islandsMap.has(to) ? ringB[(salt * 7 + 3) % 12] : graph.nodeNear(toIsland, centers.get(to));
    const ids = graph.shortest(a, b);
    const pts = ids.map((n) => graph.nodes[n].p.clone());
    // lateral offset so two-way traffic doesn't overlap
    const off = ((salt % 3) - 1) * 0.07;
    const res = [];
    for (let k = 0; k < pts.length; k++) {
      const prev = pts[Math.max(0, k - 1)],
        next = pts[Math.min(pts.length - 1, k + 1)];
      const d = new THREE.Vector3().subVectors(next, prev).setY(0).normalize();
      res.push(pts[k].clone().add(new THREE.Vector3(-d.z * off, 0, d.x * off)));
    }
    const lens = [0];
    for (let k = 1; k < res.length; k++) lens.push(lens[k - 1] + res[k].distanceTo(res[k - 1]));
    const r = { pts: res, lens, total: lens[lens.length - 1], islands: new Set(ids.map((n) => graph.nodes[n].island)) };
    routeCache.set(key, r);
    return r;
  }
  function nearestIsland(p) {
    let best = null,
      bd = 1e9;
    for (const id of islandsMap.keys()) {
      const d = centers.get(id).distanceToSquared(p);
      if (d < bd) {
        bd = d;
        best = id;
      }
    }
    return best;
  }
  function sample(route, s) {
    if (route.total < 0.001) return { p: route.pts[0].clone(), dir: new THREE.Vector3(0, 0, 1) };
    let k = 1;
    while (k < route.lens.length - 1 && route.lens[k] < s) k++;
    const a = route.pts[k - 1],
      b = route.pts[k],
      seg = route.lens[k] - route.lens[k - 1] || 1;
    const t = Math.min(1, Math.max(0, (s - route.lens[k - 1]) / seg));
    return { p: a.clone().lerp(b, t), dir: new THREE.Vector3().subVectors(b, a).setY(0).normalize() };
  }

  // ---------- flow walkers ----------
  // One canonical walkway route per connection branch: the drawn line and every walker on that branch share it,
  // so people never walk a different path from the one shown, and no branch is drawn as a straight line over water.
  paths.forEach((p, idx) => (p.route = routeFor(p.from, p.to, idx * 3 + 1))); // salt ≡ 1 (mod 3) → no lateral offset
  // 2026-10-25: a branch whose route collapses onto its own island (an off-map port such as 社區, whose nearest island is
  // the source island itself) has nowhere to walk: F8 運動 → 社區 was 0.9 long and its walkers just paced on the sport tile.
  // Such branches get no walkers and no drawn line (app.js skips them too); the flow keeps its other branches.
  const MIN_BRANCH = 1.5;
  for (const p of paths) p.degenerate = p.route.total < MIN_BRANCH;
  const flowEdges = new Map();
  for (const p of paths) {
    if (p.degenerate) continue;
    if (!flowEdges.has(p.flow)) flowEdges.set(p.flow, []);
    flowEdges.get(p.flow).push(p);
  }
  const perFlow = quality === "low" ? 2 : 4;
  const WHEELCHAIR_FLOWS = { F8: 2, F3: 4 };
  for (const f of flowsData) {
    const edges = flowEdges.get(f.id) || [];
    if (!edges.length) continue;
    // every branch gets at least one walker (capped), so a fan-out connection such as 市府核心 → all tiles is fully walked
    const n = Math.max(perFlow, Math.min(edges.length, quality === "low" ? 4 : 14));
    for (let k = 0; k < n; k++) {
      const e = edges[k % edges.length];
      const route = e.route;
      // 2026-10-25: wheelchair users on the connections whose policies are about accessibility —
      // F8 社區運動（運動小巴優先照顧行動不便者、場館無障礙）every other walker, F3 台北研究院（無障礙城市設計中心）one in four
      const every = WHEELCHAIR_FLOWS[f.id];
      const role = every && k % every === 1 ? "wheelchair" : f.walker;
      const pl = plan(role, f.carry);
      people.push({ kind: "flow", flow: f.id, role, carry: f.carry, from: e.from, to: e.to, route, plan: pl, phase: rnd(), speed: (f.walker === "cyclist" ? 0.62 : 0.32) + rnd() * 0.08, s: 0, dirSign: 1 });
    }
  }
  // ---------- ambient figures ----------
  const ambientSpots = opts.ambientSpots || [];
  const POSES = ["sit", "read", "wave", null, "sit", "read"];
  for (const a of ambientSpots) {
    const pl = plan(a.role, null);
    // stationary figures do something in place: picnic-sit, read, wave
    const pose = a.pose !== undefined ? a.pose : !a.wander && !["traveller", "worker", "cyclist"].includes(a.role) ? POSES[Math.floor(rnd() * POSES.length)] : null;
    if (pose === "boxes") {
      pl.parts.push({ g: "box", off: [0, 0.2, 0.09], s: [0.11, 0.09, 0.08], c: 0xc9a27a, ch: "carry" });
      pl.parts.push({ g: "box", off: [0, 0.2, 0.131], s: [0.06, 0.012, 0.002], c: 0xb0855c, ch: "carry" });
    }
    if (pose === "skate") {
      // rider stands on the deck; the deck runs along the facing direction
      for (const pt of pl.parts) pt.off = [pt.off[0], pt.off[1] + 0.032, pt.off[2]];
      pl.parts.push({ g: "box", off: [0, 0.022, 0], s: [0.08, 0.014, 0.24], c: [0xdb6a41, 0x3e7c8c, 0x211d1d][Math.floor(rnd() * 3)], ch: null });
      for (const [dx, dz] of [[-0.03, -0.08], [0.03, -0.08], [-0.03, 0.08], [0.03, 0.08]]) pl.parts.push({ g: "eye", off: [dx, 0.009, dz], s: [0.018, 0.018, 0.018], c: 0xf2efe8, ch: null });
    }
    if (pose === "read") pl.parts.push({ g: "box", off: [0, 0.21, 0.085], s: [0.08, 0.06, 0.015], c: [0xdb6a41, 0x3e7c8c, 0xe8c547][Math.floor(rnd() * 3)], ch: "carry", r: [-0.5, 0, 0] });
    people.push({ kind: "ambient", role: a.role, island: a.island, pos: a.pos, yaw: a.yaw || 0, plan: pl, phase: rnd(), wander: a.wander || 0, pose });
  }

  // ---------- easter egg: Puma walks the 14 policy islands in number order, pausing at each on his soapbox ----------
  if (opts.puma !== false) {
    const order = [...islandsMap.values()].sort((a, b) => a.number - b.number).map((i) => i.id);
    // each island's stop = its walkway-ring node nearest the viewer (south side), so legs join end-to-start with no jumps
    const stopNode = new Map(order.map((id) => [id, graph.ringIndex.get(id).reduce((a, b) => (graph.nodes[b].p.z > graph.nodes[a].p.z ? b : a))]));
    const legs = order.map((id, k) => {
      const next = order[(k + 1) % order.length];
      const ids = graph.shortest(stopNode.get(id), stopNode.get(next));
      const pts = ids.map((n) => graph.nodes[n].p.clone());
      // step off the walkway a little toward the island centre to stop (clear of the lamp posts on the ring)
      const inward = (isl, q) => q.clone().lerp(centers.get(isl).clone().setY(q.y), 0.1);
      pts.unshift(inward(id, pts[0]));
      pts.push(inward(next, pts[pts.length - 1]));
      const lens = [0];
      for (let j = 1; j < pts.length; j++) lens.push(lens[j - 1] + pts[j].distanceTo(pts[j - 1]));
      return { pts, lens, total: lens[lens.length - 1] };
    });
    people.push({ kind: "puma", role: "puma", order, legs, leg: 0, s: 0, wait: 3, plan: plan("puma", null), phase: rnd(), speed: 0.42, pose: "wave", waiting: true });
  }
  // ---------- easter egg (2026-10-25): the island keeper, present on about 1 visit in 100 (decided by app.js) ----------
  // He strolls between islands in a shuffled order and pauses to wave. Uses Math.random so the seeded city stays identical.
  if (opts.islandLord) {
    const ids = [...islandsMap.keys()];
    for (let k = ids.length - 1; k > 0; k--) {
      const j = Math.floor(Math.random() * (k + 1));
      [ids[k], ids[j]] = [ids[j], ids[k]];
    }
    const stop = (id) => graph.ringIndex.get(id)[Math.floor(Math.random() * 12)];
    const stops = ids.map(stop);
    const legs = ids.map((id, k) => {
      const nodes = graph.shortest(stops[k], stops[(k + 1) % ids.length]);
      const pts = nodes.map((n) => graph.nodes[n].p.clone());
      if (pts.length < 2) pts.push(pts[0].clone());
      const lens = [0];
      for (let j = 1; j < pts.length; j++) lens.push(lens[j - 1] + pts[j].distanceTo(pts[j - 1]));
      return { pts, lens, total: lens[lens.length - 1] };
    });
    people.push({ kind: "lord", role: "islandlord", order: ids, legs, leg: 0, s: 0, wait: 2, plan: plan("islandlord", null), phase: Math.random(), speed: 0.36, pose: "wave", waiting: true });
  }

  // allocate instanced meshes
  const counts = {};
  for (const w of people) for (const pt of w.plan.parts) counts[pt.g] = (counts[pt.g] || 0) + 1;
  const meshes = {};
  for (const [g, n] of Object.entries(counts)) {
    const m = new THREE.InstancedMesh(G[g], mat, n);
    m.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    m.castShadow = false; // 2026-10-25: walkers use their blob shadows (shadowMesh); the shadow map is static (app.js)
    m.frustumCulled = false;
    m.userData = { type: "walker", owners: [] };
    scene.add(m);
    meshes[g] = { mesh: m, n: 0 };
  }
  const shadowMesh = new THREE.InstancedMesh(G.shadow, shadowMat, people.length);
  shadowMesh.frustumCulled = false;
  shadowMesh.renderOrder = 1;
  scene.add(shadowMesh);
  for (const [pi, w] of people.entries())
    for (const pt of w.plan.parts) {
      const slot = meshes[pt.g];
      pt.idx = slot.n++;
      slot.mesh.setColorAt(pt.idx, new THREE.Color(pt.c));
      slot.mesh.userData.owners[pt.idx] = pi;
    }
  for (const s of Object.values(meshes)) s.mesh.instanceColor.needsUpdate = true;

  // ---------- carry badges (sprites) ----------
  const badgeTex = new Map();
  function badge(kind) {
    if (badgeTex.has(kind)) return badgeTex.get(kind);
    const c = document.createElement("canvas");
    c.width = c.height = 128;
    const g = c.getContext("2d");
    g.fillStyle = "#ffffff";
    g.beginPath();
    g.arc(64, 64, 56, 0, Math.PI * 2);
    g.fill();
    g.lineWidth = 8;
    g.strokeStyle = "#db6a41";
    g.stroke();
    g.fillStyle = "#211d1d";
    g.strokeStyle = "#211d1d";
    g.lineWidth = 7;
    g.lineCap = g.lineJoin = "round";
    drawGlyph(g, kind);
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    badgeTex.set(kind, t);
    return t;
  }
  const badgeMats = new Map();
  const sprites = [];
  for (const w of people) {
    if (w.kind !== "flow") continue;
    if (!badgeMats.has(w.carry)) badgeMats.set(w.carry, new THREE.SpriteMaterial({ map: badge(w.carry), depthTest: true, transparent: true, alphaTest: 0.35 }));
    const s = new THREE.Sprite(badgeMats.get(w.carry));
    s.scale.set(0.11, 0.11, 0.11);
    scene.add(s);
    w.sprite = s;
    sprites.push(s);
  }

  // ---------- animation ----------
  const dummy = new THREE.Object3D(),
    base = new THREE.Matrix4(),
    local = new THREE.Matrix4(),
    tmp = new THREE.Matrix4(),
    piv = new THREE.Matrix4(),
    unpiv = new THREE.Matrix4(),
    rot = new THREE.Matrix4(),
    scl = new THREE.Matrix4(),
    spinM = new THREE.Matrix4(),
    hide = new THREE.Matrix4().makeScale(0, 0, 0);
  const pivots = { sitL: 0.13, sitR: 0.13, legL: 0.13, legR: 0.13, armL: 0.255, armR: 0.255, head: 0.27, pedalL: 0.225, pedalR: 0.225, rideL: 0.35, rideR: 0.35 };
  let filter = null,
    showBadges = true,
    badgeFocus = null;
  const state = { positions: [] };
  for (const w of people) if (w.kind === "flow") w.s = w.phase * w.route.total;

  function update(dt, time, motion, zoom = 1) {
    for (const [pi, w] of people.entries()) {
      let p,
        dir,
        moving = 0,
        visible = true;
      if (w.kind === "flow") {
        visible = !filter || filter.has(w.flow);
        if (motion) {
          w.wait = (w.wait || 0) - dt;
          if (w.wait <= 0) {
            w.s += w.dirSign * w.speed * dt;
            if (w.s >= w.route.total) {
              w.s = w.route.total;
              w.dirSign = -1;
              w.wait = 1.4;
            } else if (w.s <= 0) {
              w.s = 0;
              w.dirSign = 1;
              w.wait = 1.4;
            }
          }
        }
        const smp = sample(w.route, w.s);
        p = smp.p;
        dir = smp.dir.multiplyScalar(w.dirSign);
        moving = motion && w.wait <= 0 ? 1 : 0;
      } else if (w.kind === "puma" || w.kind === "lord") {
        if (motion) {
          if (w.wait > 0) w.wait -= dt;
          else {
            w.s += w.speed * dt;
            const L = w.legs[w.leg];
            if (w.s >= L.total) {
              w.leg = (w.leg + 1) % w.legs.length;
              w.s = 0;
              w.wait = w.kind === "puma" ? 6 : 4.5; // Puma 在肥皂箱上站 6 秒，「市政建言」按鈕才點得到
            }
          }
        }
        w.waiting = w.wait > 0;
        w.pose = w.waiting ? "wave" : null;
        w.atIsland = w.order[w.leg];
        const smp = sample(w.legs[w.leg], w.s);
        p = smp.p;
        // while stopped, face the camera-side (south) so the wave reads
        dir = w.waiting ? new THREE.Vector3(0, 0, 1) : smp.dir;
        moving = motion && !w.waiting ? 1 : 0;
      } else {
        const sk = w.pose === "skate";
        const tt = (motion ? time : 0) * (sk ? 0.85 : 0.4) + w.phase * 6;
        const wob = w.wander ? Math.sin(tt) * w.wander : 0;
        p = new THREE.Vector3(w.pos[0] + wob, w.pos[1] ? w.pos[1] : top + 0.03, w.pos[2]);
        // a skater rolls back and forth along x and turns at each end
        dir = sk ? new THREE.Vector3(Math.cos(tt) >= 0 ? 1 : -1, 0, 0.0001) : new THREE.Vector3(Math.sin(w.yaw), 0, Math.cos(w.yaw));
        moving = !sk && w.wander && motion ? 0.5 : 0;
      }
      const yaw = Math.atan2(dir.x, dir.z);
      const ph = (time * 9 + w.phase * 20) * moving;
      const bob = moving ? Math.abs(Math.sin(ph)) * 0.012 : 0;
      const sc = w.plan.scale * 0.8 * zoom;
      w.drawScale = sc;
      const lift = w.kind === "puma" && w.waiting ? 0.07 * sc : 0;
      dummy.position.set(p.x, p.y + bob + lift - (w.pose === "sit" ? 0.105 * sc : 0), p.z);
      dummy.rotation.set(0, yaw, 0);
      dummy.scale.setScalar(visible ? sc : 0);
      dummy.updateMatrix();
      base.copy(dummy.matrix);
      w.world = p;
      for (const pt of w.plan.parts) {
        let ang = 0,
          axis = "x";
        if (moving) {
          if (pt.ch === "legL") ang = Math.sin(ph) * 0.55;
          if (pt.ch === "legR") ang = -Math.sin(ph) * 0.55;
          if (pt.ch === "armL") ang = -Math.sin(ph) * 0.45;
          if (pt.ch === "armR") ang = Math.sin(ph) * 0.45;
        }
        if (pt.ch === "head") ang = Math.sin(time * 1.3 + w.phase * 9) * 0.06;
        if (w.pose === "sit" && (pt.ch === "legL" || pt.ch === "legR")) ang = -1.5;
        if (pt.ch === "sitL" || pt.ch === "sitR") ang = -1.2; // wheelchair: thighs forward, feet on the footrest
        if ((w.pose === "read" || w.pose === "boxes") && (pt.ch === "armL" || pt.ch === "armR")) ang = -0.95;
        if (w.pose === "skate" && (pt.ch === "armL" || pt.ch === "armR")) {
          axis = "z";
          ang = pt.ch === "armR" ? 0.75 : -0.75;
        }
        if (w.pose === "wave" && pt.ch === "armR") {
          axis = "z";
          ang = 2.5 + Math.sin(time * 5 + w.phase * 9) * 0.35;
        }
        // cyclists: thighs forward over the pedals, alternating pedal stroke; arms reach the bars
        const pedal = time * 7 + w.phase * 20;
        if (pt.ch === "pedalL") ang = -1.0 + (moving ? Math.sin(pedal) * 0.42 : 0.2);
        if (pt.ch === "pedalR") ang = -1.0 - (moving ? Math.sin(pedal) * 0.42 : 0.2);
        if (pt.ch === "rideL" || pt.ch === "rideR") ang = -1.05;
        // a part's own offset/rotation/scale never changes: compose it once, then copy (was 4 allocations per part per frame)
        if (!pt.L0) pt.L0 = new THREE.Matrix4().compose(new THREE.Vector3(...pt.off), pt.r ? new THREE.Quaternion().setFromEuler(new THREE.Euler(...pt.r)) : new THREE.Quaternion(), new THREE.Vector3(...pt.s));
        local.copy(pt.L0);
        if (pt.ch === "wheelX") local.multiply(rot.makeRotationY(Math.PI / 2));
        if (pt.ch === "spoke" || pt.ch === "crankL" || pt.ch === "crankR") {
          // spin about the axle (x axis) at the part's own centre
          const spin = (moving ? time * (pt.ch === "spoke" ? 14 : 7) : 0) + w.phase * 20 + (pt.ch === "crankL" ? Math.PI : 0);
          const cx = pt.ch === "spoke" ? pt.off[0] : 0, cy = pt.off[1], cz = pt.off[2];
          tmp.makeTranslation(cx, cy, cz).multiply(rot.makeRotationX(spin)).multiply(spinM.makeTranslation(-cx, -cy, -cz));
          if (pt.ch !== "spoke") tmp.multiply(spinM.makeTranslation(0, 0, 0.03));
          local.premultiply(tmp);
        }
        if (ang && pivots[pt.ch] !== undefined) {
          const py = pivots[pt.ch];
          // sideways (z-axis) swings pivot at the shoulder itself, not the body's centre line — otherwise a raised
          // arm swung through the torso and vanished (waving Puma on his soapbox)
          const px = axis === "z" && (pt.ch === "armL" || pt.ch === "armR") ? (pt.ch === "armL" ? -0.077 : 0.077) : 0;
          piv.makeTranslation(px, py, 0);
          unpiv.makeTranslation(-px, -py, 0);
          if (axis === "z") rot.makeRotationZ(ang);
          else rot.makeRotationX(ang);
          tmp.multiplyMatrices(piv, rot).multiply(unpiv).multiply(local);
          local.copy(tmp);
        }
        if (pt.ch === "soap") {
          if (!w.waiting) local.makeScale(0, 0, 0);
          else local.premultiply(rot.makeTranslation(0, -0.07, 0)); // the box stays on the ground while he stands on it
        }
        tmp.multiplyMatrices(base, local);
        meshes[pt.g].mesh.setMatrixAt(pt.idx, tmp);
      }
      dummy.position.set(p.x, p.y + 0.02, p.z);
      dummy.rotation.set(0, 0, 0);
      dummy.scale.setScalar(visible ? 0.2 * sc : 0);
      dummy.updateMatrix();
      shadowMesh.setMatrixAt(pi, dummy.matrix);
      if (w.sprite) {
        w.sprite.visible = visible && showBadges && (!badgeFocus || w.from === badgeFocus || w.to === badgeFocus || !!filter);
        w.sprite.position.set(p.x, p.y + 0.6 * sc + 0.03 + bob, p.z);
      }
    }
    for (const s of Object.values(meshes)) s.mesh.instanceMatrix.needsUpdate = true;
    shadowMesh.instanceMatrix.needsUpdate = true;
  }
  return {
    people,
    meshes: Object.values(meshes).map((s) => s.mesh),
    update,
    setFilter(set) {
      filter = set && set.size ? set : null;
    },
    setBadges(v, focus = null) {
      showBadges = v;
      badgeFocus = focus;
    },
    personFromHit(mesh, instanceId) {
      const pi = mesh.userData.owners?.[instanceId];
      return pi === undefined ? null : pi;
    },
    routeIslands: () => people.filter((w) => w.kind === "flow").map((w) => ({ flow: w.flow, islands: [...w.route.islands] })),
    sample: (w, u) => sample(w.route, u * w.route.total),
  };
}

function drawGlyph(g, kind) {
  const L = (pts) => {
    g.beginPath();
    pts.forEach(([x, y], i) => (i ? g.lineTo(x, y) : g.moveTo(x, y)));
    g.stroke();
  };
  const R = (x, y, w, h, fill = false) => {
    g.beginPath();
    g.roundRect(x, y, w, h, 6);
    fill ? g.fill() : g.stroke();
  };
  const C = (x, y, r, fill = false) => {
    g.beginPath();
    g.arc(x, y, r, 0, Math.PI * 2);
    fill ? g.fill() : g.stroke();
  };
  switch (kind) {
    case "bed":
      R(30, 62, 68, 20);
      L([[30, 50], [30, 92]]);
      L([[98, 70], [98, 92]]);
      R(36, 54, 18, 10, true);
      break;
    case "crosswalk":
      for (let i = 0; i < 4; i++) R(34 + i * 16, 36, 8, 56, true);
      break;
    case "energy":
      g.beginPath();
      g.moveTo(70, 26);
      g.lineTo(42, 70);
      g.lineTo(62, 70);
      g.lineTo(54, 102);
      g.lineTo(88, 54);
      g.lineTo(66, 54);
      g.closePath();
      g.fill();
      break;
    case "clock":
      C(64, 64, 32);
      L([[64, 64], [64, 44]]);
      L([[64, 64], [80, 72]]);
      break;
    case "blueprint":
      R(34, 40, 60, 48);
      L([[46, 52], [82, 52]]);
      L([[46, 64], [70, 64]]);
      L([[46, 76], [78, 76]]);
      break;
    case "folder":
      R(32, 44, 64, 46);
      L([[32, 52], [56, 52], [62, 44]]);
      break;
    case "globe":
      C(64, 64, 32);
      L([[32, 64], [96, 64]]);
      g.beginPath();
      g.ellipse(64, 64, 14, 32, 0, 0, Math.PI * 2);
      g.stroke();
      break;
    case "schoolbag":
      R(40, 46, 48, 50);
      L([[52, 46], [52, 36], [76, 36], [76, 46]]);
      L([[40, 66], [88, 66]]);
      break;
    case "towel":
      R(38, 34, 52, 60);
      L([[38, 80], [90, 80]]);
      break;
    case "dumbbell":
      L([[40, 64], [88, 64]]);
      R(30, 48, 12, 32, true);
      R(86, 48, 12, 32, true);
      break;
    case "cards":
      R(30, 44, 44, 32);
      R(54, 56, 44, 32);
      break;
    case "book-heart":
      R(34, 40, 30, 52);
      R(64, 40, 30, 52);
      g.fillStyle = "#db6a41";
      g.beginPath();
      g.arc(58, 30, 9, Math.PI, 0);
      g.arc(76, 30, 9, Math.PI, 0);
      g.lineTo(67, 46);
      g.closePath();
      g.fill();
      break;
    case "counseling":
      R(30, 36, 50, 34);
      R(52, 62, 46, 30);
      break;
    case "chip":
      R(42, 42, 44, 44);
      for (let i = 0; i < 3; i++) {
        L([[50 + i * 14, 32], [50 + i * 14, 42]]);
        L([[50 + i * 14, 86], [50 + i * 14, 96]]);
      }
      break;
    case "sapling":
      L([[64, 98], [64, 56]]);
      g.beginPath();
      g.ellipse(52, 50, 14, 8, -0.6, 0, Math.PI * 2);
      g.fill();
      g.beginPath();
      g.ellipse(76, 44, 14, 8, 0.6, 0, Math.PI * 2);
      g.fill();
      break;
    case "basket":
      L([[32, 60], [96, 60], [86, 96], [42, 96], [32, 60]]);
      g.beginPath();
      g.arc(64, 60, 24, Math.PI, 0);
      g.stroke();
      break;
    case "passport":
      R(42, 30, 44, 68);
      C(64, 58, 12);
      L([[52, 84], [76, 84]]);
      break;
    default:
      C(64, 64, 20, true);
  }
}
