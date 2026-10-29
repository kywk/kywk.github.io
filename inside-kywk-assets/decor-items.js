// Island-specific edge vignettes: small scenic objects placed along each island's outer zone.
// Each type name is unique to its island so every district has surroundings of its own.
// fn(kit, x, z, y, yaw, rnd) — purely decorative.
const ink = 0x211d1d,
  coral = 0xdb6a41,
  wood = 0xb48560,
  teal = 0x3e7c8c,
  yel = 0xe8c547,
  leaf = 0x8fa67a;
const R = (k, x, z, w, h, d, c, yaw = 0, y = 0) => k.box(x, y + h / 2, z, w, h, d, c, null, [0, yaw, 0]);
const H = (k, x, z, w, h, d, c, yaw = 0, y = 0) => k.hbox(x, y + h / 2, z, w, h, d, c, null, [0, yaw, 0]);
const pole = (k, x, z, h, y, c = ink) => k.cyl(x, y + h / 2, z, 0.016, h, c);
const off = (x, z, yaw, d) => [x + Math.sin(yaw) * d, z + Math.cos(yaw) * d];

export const EDGE_ITEMS = {
  civil: [
    ["v:civil-coffeeCart", (k, x, z, y, yaw) => { R(k, x, z, 0.2, 0.14, 0.12, coral, yaw, y); H(k, x, z, 0.24, 0.02, 0.16, 0xfff1de, yaw, y + 0.2); pole(k, x, z, 0.2, y + 0.06, 0xd9cbb4); }],
    ["v:civil-newsKiosk", (k, x, z, y, yaw) => { R(k, x, z, 0.14, 0.18, 0.12, 0x7aa58f, yaw, y); H(k, x, z, 0.18, 0.02, 0.16, coral, yaw, y + 0.18); }],
    ["v:civil-flowerTub", (k, x, z, y) => { k.cyl(x, y + 0.05, z, 0.16, 0.1, 0xd9cbb4); k.ico(x, y + 0.13, z, [0.15, 0.08, 0.15], 0xf2b5c6); }],
    ["v:civil-shadeTree", (k, x, z, y) => { k.cyl(x, y + 0.12, z, 0.03, 0.24, 0x8a6a4e); k.ico(x, y + 0.3, z, [0.22, 0.18, 0.22], 0x7f9a6a); k.cyl(x, y + 0.01, z, 0.18, 0.02, 0xbfae95); }],
    ["v:civil-bikeShelter", (k, x, z, y, yaw) => { for (const d of [-0.1, 0.1]) pole(k, ...off(x, z, yaw + Math.PI / 2, d), 0.18, y); H(k, x, z, 0.28, 0.02, 0.14, teal, yaw, y + 0.18); for (let j = 0; j < 3; j++) k.part("torus", [x, y + 0.04, z], [0.06, 0.06, 0.06], 0x6b6f6c, null, [0, yaw + j * 0.2, 0]); }],
  ],
  institute: [
    ["v:inst-sensorPole", (k, x, z, y) => { pole(k, x, z, 0.4, y); k.box(x, y + 0.38, z, 0.07, 0.05, 0.07, teal); k.bulb(x, y + 0.42, z, 0.025, 0x9fffd0); }],
    ["v:inst-readingTable", (k, x, z, y) => { k.cyl(x, y + 0.09, z, 0.2, 0.02, wood); k.cyl(x, y + 0.045, z, 0.025, 0.09, ink); k.hbox(x + 0.03, y + 0.105, z, 0.07, 0.008, 0.05, 0xffffff); }],
    ["v:inst-miniGreenhouse", (k, x, z, y, yaw) => { R(k, x, z, 0.24, 0.14, 0.16, 0xd5ecee, yaw, y); k.part("prism", [x, y + 0.19, z], [0.17, 0.24, 0.17], 0xbfe0e2, null, [0, yaw, Math.PI / 2]); }],
    ["v:inst-weatherVane", (k, x, z, y) => { pole(k, x, z, 0.36, y); k.hbox(x, y + 0.36, z, 0.14, 0.01, 0.01, ink); k.part("tetra", [x + 0.07, y + 0.36, z], [0.04, 0.04, 0.01], coral, null, [0, 0, -Math.PI / 2]); }],
    ["v:inst-solarBench", (k, x, z, y, yaw) => { H(k, x, z, 0.24, 0.05, 0.08, wood, yaw, y + 0.05); H(k, x, z, 0.26, 0.012, 0.12, 0x2f3a46, yaw, y + 0.2); for (const d of [-0.1, 0.1]) pole(k, ...off(x, z, yaw + Math.PI / 2, d), 0.2, y, 0x9aa6a6); }],
  ],
  renewal: [
    ["v:renew-barrier", (k, x, z, y, yaw) => { for (const d of [-0.08, 0.08]) R(k, ...off(x, z, yaw + Math.PI / 2, d), 0.05, 0.1, 0.05, 0xf2efe8, yaw, y); H(k, x, z, 0.24, 0.04, 0.02, coral, yaw, y + 0.07); }],
    ["v:renew-sandPile", (k, x, z, y) => k.ico(x, y + 0.04, z, [0.2, 0.09, 0.18], 0xd8c39a)],
    ["v:renew-toolbox", (k, x, z, y, yaw) => { R(k, x, z, 0.14, 0.07, 0.08, coral, yaw, y); H(k, x, z, 0.08, 0.02, 0.01, ink, yaw, y + 0.08); }],
    ["v:renew-hardhats", (k, x, z, y) => { for (let j = 0; j < 3; j++) k.part("dome", [x + (j - 1) * 0.06, y, z], [0.05, 0.045, 0.05], yel); }],
  ],
  transport: [
    ["v:tr-youbikeDock", (k, x, z, y, yaw) => { for (let j = 0; j < 3; j++) { const [px, pz] = off(x, z, yaw + Math.PI / 2, (j - 1) * 0.07); k.hbox(px, y + 0.06, pz, 0.02, 0.12, 0.02, 0x58585f); k.part("torus", [px, y + 0.05, pz + 0.04], [0.07, 0.07, 0.07], ink, null, [0, yaw, 0]); k.hbox(px, y + 0.08, pz + 0.04, 0.01, 0.01, 0.1, yel, null, [0, yaw, 0]); } }],
    ["v:tr-busStopSign", (k, x, z, y, yaw) => { pole(k, x, z, 0.36, y); R(k, x, z, 0.1, 0.12, 0.02, coral, yaw, y + 0.3); }],
    ["v:tr-chargingPost", (k, x, z, y, yaw) => { R(k, x, z, 0.06, 0.16, 0.05, 0x5f9aa6, yaw, y); k.bulb(...off(x, z, yaw, 0.03), 0.015, 0x9fffd0); }],
    ["v:tr-scooterBay", (k, x, z, y, yaw) => { H(k, x, z, 0.26, 0.006, 0.14, 0xffffff, yaw, y); R(k, x, z, 0.06, 0.06, 0.14, 0x58a6a6, yaw, y + 0.03); }],
    ["v:tr-trafficCone", (k, x, z, y) => { k.part("cone", [x, y + 0.05, z], [0.06, 0.1, 0.06], 0xf2a33a); }],
  ],
  education: [
    ["v:edu-flowerBed", (k, x, z, y) => { R(k, x, z, 0.24, 0.05, 0.12, wood, 0, y); for (let j = 0; j < 4; j++) k.sphere(x - 0.08 + j * 0.055, y + 0.07, z, 0.03, [0xf2b5c6, yel, 0xffffff, 0xd9c6f0][j]); }],
    ["v:edu-schoolBell", (k, x, z, y) => { pole(k, x - 0.05, z, 0.26, y, wood); pole(k, x + 0.05, z, 0.26, y, wood); k.hbox(x, y + 0.26, z, 0.14, 0.02, 0.02, wood); k.part("dome", [x, y + 0.2, z], [0.05, 0.05, 0.05], yel, null, [Math.PI, 0, 0]); }],
    ["v:edu-noticeBoard", (k, x, z, y, yaw) => { for (const d of [-0.08, 0.08]) pole(k, ...off(x, z, yaw + Math.PI / 2, d), 0.22, y, wood); R(k, x, z, 0.2, 0.12, 0.02, 0x7aa58f, yaw, y + 0.12); }],
    ["v:edu-hopscotch", (k, x, z, y, yaw) => { for (let j = 0; j < 4; j++) k.hbox(...off(x, z, yaw, -0.09 + j * 0.06), y + 0.004, 0.05, 0.004, 0.05, j % 2 ? yel : 0xffffff, null, [0, yaw, 0]); }],
  ],
  lunch: [
    ["v:lunch-vegPlot", (k, x, z, y) => { R(k, x, z, 0.24, 0.04, 0.16, 0x7a5a42, 0, y); for (let j = 0; j < 3; j++) k.ico(x - 0.07 + j * 0.07, y + 0.07, z, [0.06, 0.05, 0.06], [0x8fb37a, 0xa9c47f, 0x7f9a6a][j]); }],
    ["v:lunch-compost", (k, x, z, y, yaw) => { R(k, x, z, 0.12, 0.1, 0.12, 0x6f8a62, yaw, y); H(k, x, z, 0.13, 0.015, 0.13, ink, yaw, y + 0.1); }],
    ["v:lunch-scarecrow", (k, x, z, y) => { pole(k, x, z, 0.3, y, wood); k.hbox(x, y + 0.22, z, 0.16, 0.015, 0.015, wood); k.sphere(x, y + 0.31, z, 0.04, 0xead7a6); k.part("cone", [x, y + 0.35, z], [0.12, 0.04, 0.12], 0xd8b878); }],
    ["v:lunch-produceCrate", (k, x, z, y, yaw) => { R(k, x, z, 0.12, 0.06, 0.09, wood, yaw, y); for (let j = 0; j < 3; j++) k.sphere(x - 0.03 + j * 0.03, y + 0.075, z, 0.025, [coral, yel, 0x8fb37a][j]); }],
  ],
  family: [
    ["v:fam-springRider", (k, x, z, y) => { k.cyl(x, y + 0.04, z, 0.012, 0.08, 0x9aa6a6); k.sphere(x, y + 0.11, z, [0.08, 0.06, 0.12], yel); k.sphere(x, y + 0.15, z + 0.05, 0.035, yel); }],
    ["v:fam-parkedStroller", (k, x, z, y, yaw) => { R(k, x, z, 0.08, 0.07, 0.12, 0x6f7fb5, yaw, y + 0.04); k.part("dome", [x, y + 0.11, z], [0.09, 0.08, 0.09], 0x58a6a6); for (const d of [-0.04, 0.04]) k.part("torus", [x + d, y + 0.025, z], [0.04, 0.04, 0.04], ink, null, [0, yaw + Math.PI / 2, 0]); }],
    ["v:fam-miniSlide", (k, x, z, y, yaw) => { R(k, x, z, 0.08, 0.16, 0.08, yel, yaw, y); k.part("box", [...off(x, z, yaw, 0.1).slice(0, 1), y + 0.08, off(x, z, yaw, 0.1)[1]], [0.06, 0.012, 0.2], coral, null, [0.6, yaw, 0]); }],
    ["v:fam-picnicBlanket", (k, x, z, y, yaw) => { H(k, x, z, 0.22, 0.006, 0.16, 0xf2a1a1, yaw, y); k.sphere(x + 0.04, y + 0.03, z, 0.03, 0xffffff); }],
  ],
  card: [
    ["v:card-ticketBooth", (k, x, z, y, yaw) => { R(k, x, z, 0.14, 0.2, 0.14, 0xf2efe8, yaw, y); k.part("cone", [x, y + 0.24, z], [0.2, 0.08, 0.2], coral); }],
    ["v:card-bookStack", (k, x, z, y) => { for (let j = 0; j < 4; j++) k.hbox(x, y + 0.015 + j * 0.03, z, 0.1, 0.025, 0.07, [coral, yel, teal, 0x6f7fb5][j], null, [0, j * 0.2, 0]); }],
    ["v:card-readingBench", (k, x, z, y, yaw) => { H(k, x, z, 0.22, 0.04, 0.07, wood, yaw, y + 0.04); k.hbox(x, y + 0.085, z, 0.06, 0.012, 0.045, 0xffffff, null, [0, yaw, 0]); }],
    ["v:card-posterBoard", (k, x, z, y, yaw) => { for (const d of [-0.06, 0.06]) pole(k, ...off(x, z, yaw + Math.PI / 2, d), 0.24, y); R(k, x, z, 0.16, 0.14, 0.015, 0xf2a1a1, yaw, y + 0.12); }],
  ],
  welfare: [
    ["v:wel-gardenBox", (k, x, z, y) => { R(k, x, z, 0.16, 0.07, 0.16, wood, 0, y); k.ico(x, y + 0.1, z, [0.13, 0.07, 0.13], 0xd9c6f0); }],
    ["v:wel-handrail", (k, x, z, y, yaw) => { for (const d of [-0.1, 0, 0.1]) pole(k, ...off(x, z, yaw + Math.PI / 2, d), 0.12, y, teal); H(k, x, z, 0.24, 0.012, 0.012, teal, yaw + Math.PI / 2, y + 0.12); }],
    ["v:wel-birdFeeder", (k, x, z, y) => { pole(k, x, z, 0.26, y, wood); k.part("cone6", [x, y + 0.28, z], [0.1, 0.05, 0.1], coral); k.box(x, y + 0.24, z, 0.06, 0.04, 0.06, 0xf2efe8); }],
    ["v:wel-restBench", (k, x, z, y, yaw) => { H(k, x, z, 0.2, 0.03, 0.07, 0xb48560, yaw, y + 0.06); H(k, x, z, 0.2, 0.06, 0.012, 0xb48560, yaw, y + 0.1); for (const d of [-0.11, 0.11]) H(k, ...off(x, z, yaw + Math.PI / 2, d), 0.012, 0.03, 0.06, teal, yaw, y + 0.1); }],
  ],
  sport: [
    ["v:sp-hoop", (k, x, z, y, yaw) => { pole(k, x, z, 0.34, y, 0x58585f); R(k, ...off(x, z, yaw, 0.02), 0.14, 0.1, 0.012, 0xffffff, yaw, y + 0.3); k.part("torus", [...off(x, z, yaw, 0.07).slice(0, 1), y + 0.31, off(x, z, yaw, 0.07)[1]], [0.06, 0.06, 0.06], coral, null, [Math.PI / 2, 0, 0]); }],
    ["v:sp-markerCones", (k, x, z, y) => { for (let j = 0; j < 4; j++) k.part("cone", [x - 0.09 + j * 0.06, y + 0.02, z], [0.035, 0.04, 0.035], [coral, yel][j % 2]); }],
    ["v:sp-waterFountain", (k, x, z, y) => { k.cyl(x, y + 0.08, z, 0.06, 0.16, 0x9aa6a6); k.cyl(x, y + 0.17, z, 0.09, 0.02, 0xd5ecee); }],
    ["v:sp-ballRack", (k, x, z, y, yaw) => { R(k, x, z, 0.14, 0.08, 0.07, 0x58585f, yaw, y); for (let j = 0; j < 3; j++) k.sphere(x - 0.04 + j * 0.04, y + 0.1, z, 0.025, [0xffffff, coral, yel][j]); }],
  ],
  trails: [
    ["v:tr-trailSign", (k, x, z, y, yaw) => { pole(k, x, z, 0.3, y, wood); k.hbox(x, y + 0.26, z, 0.14, 0.04, 0.012, wood, null, [0, yaw + 0.3, 0]); k.hbox(x, y + 0.2, z, 0.12, 0.04, 0.012, wood, null, [0, yaw - 0.4, 0]); }],
    ["v:tr-teaShrubs", (k, x, z, y, yaw) => { for (let j = 0; j < 4; j++) k.ico(...off(x, z, yaw + Math.PI / 2, -0.09 + j * 0.06), y + 0.035, [0.05, 0.035, 0.04], 0x6f8a62); }],
    ["v:tr-stoneLantern", (k, x, z, y) => { k.box(x, y + 0.03, z, 0.07, 0.06, 0.07, 0xb7a993); k.cyl(x, y + 0.1, z, 0.03, 0.08, 0xb7a993); k.part("cone6", [x, y + 0.17, z], [0.09, 0.05, 0.09], 0x9c8a7a); }],
    ["v:tr-hikerRest", (k, x, z, y, yaw) => { R(k, x, z, 0.14, 0.05, 0.06, 0x9c8a7a, yaw, y); k.ico(...off(x, z, yaw, 0.08), y + 0.03, [0.06, 0.04, 0.05], 0xb7a993); }],
  ],
  forest: [
    ["v:fo-sapling", (k, x, z, y) => { k.cyl(x, y + 0.03, z, 0.06, 0.06, 0x8a6a4e); k.part("cone6", [x, y + 0.13, z], [0.07, 0.15, 0.07], 0x7f9a6a); for (const d of [-0.03, 0.03]) pole(k, x + d, z + 0.03, 0.14, y, wood); }],
    ["v:fo-mushrooms", (k, x, z, y) => { for (let j = 0; j < 3; j++) { k.cyl(x + j * 0.04, y + 0.02, z, 0.012, 0.04, 0xf2efe8); k.part("dome", [x + j * 0.04, y + 0.035, z], [0.035, 0.025, 0.035], [coral, 0xe8c547, coral][j]); } }],
    ["v:fo-stump", (k, x, z, y) => { k.cyl(x, y + 0.03, z, 0.12, 0.06, 0xa77a55); k.cyl(x, y + 0.061, z, 0.1, 0.004, 0xd9b48a); }],
    ["v:fo-birdhouse", (k, x, z, y) => { pole(k, x, z, 0.26, y, wood); k.box(x, y + 0.27, z, 0.06, 0.06, 0.06, coral); k.part("cone6", [x, y + 0.32, z], [0.09, 0.05, 0.09], 0x8a6a4e); }],
  ],
  youth: [
    ["v:yo-graffitiPanel", (k, x, z, y, yaw) => { R(k, x, z, 0.24, 0.16, 0.03, [yel, coral, 0x58a6a6][Math.floor(Math.abs(x * 13)) % 3], yaw, y); }],
    ["v:yo-speaker", (k, x, z, y, yaw) => { R(k, x, z, 0.08, 0.12, 0.07, ink, yaw, y); k.cyl(...off(x, z, yaw, 0.036), y + 0.07, 0.04, 0.005, 0x58585f); }],
    ["v:yo-beanbags", (k, x, z, y) => { for (let j = 0; j < 2; j++) k.ico(x + j * 0.09, y + 0.04, z, [0.08, 0.06, 0.08], [0xf2a1a1, 0x9fc4e6][j]); }],
    ["v:yo-neonPole", (k, x, z, y) => { pole(k, x, z, 0.3, y); k.glow(x, y + 0.31, z, 0.12, 0.05, 0.015, 0xff8fbf); }],
  ],
  diplomacy: [
    ["v:dip-bollard", (k, x, z, y) => { k.cyl(x, y + 0.04, z, 0.05, 0.08, ink); k.cyl(x, y + 0.085, z, 0.065, 0.015, ink); }],
    ["v:dip-lifebuoy", (k, x, z, y, yaw) => { for (const d of [-0.05, 0.05]) pole(k, ...off(x, z, yaw + Math.PI / 2, d), 0.2, y, 0xf2efe8); k.part("torus", [x, y + 0.15, z], [0.1, 0.1, 0.1], coral, null, [0, yaw, 0]); }],
    ["v:dip-telescope", (k, x, z, y, yaw) => { pole(k, x, z, 0.16, y, 0x58585f); k.part("cylinder", [x, y + 0.18, z], [0.03, 0.12, 0.03], teal, null, [1.2, yaw, 0]); }],
    ["v:dip-suitcases", (k, x, z, y, yaw) => { for (let j = 0; j < 2; j++) R(k, ...off(x, z, yaw + Math.PI / 2, j * 0.07), 0.05, 0.1 + j * 0.03, 0.08, [coral, teal][j], yaw, y); }],
    ["v:dip-ropeCoil", (k, x, z, y) => k.part("torus", [x, y + 0.012, z], [0.08, 0.08, 0.18], 0xd8c39a, null, [Math.PI / 2, 0, 0])],
  ],
};
