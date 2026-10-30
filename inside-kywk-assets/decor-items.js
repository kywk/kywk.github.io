// Island-specific edge vignettes: small scenic objects placed along each island's outer zone.
// Each type name is unique to its island so every district has surroundings of its own.
const ink = 0x2d1e14,
  coral = 0xe26d2d,
  wood = 0xb48560,
  teal = 0x2e6b68,
  yel = 0xd97706,
  purple = 0x7a5ea8,
  green = 0x4d8b55;
const R = (k, x, z, w, h, d, c, yaw = 0, y = 0) => k.box(x, y + h / 2, z, w, h, d, c, null, [0, yaw, 0]);
const H = (k, x, z, w, h, d, c, yaw = 0, y = 0) => k.hbox(x, y + h / 2, z, w, h, d, c, null, [0, yaw, 0]);
const pole = (k, x, z, h, y, c = ink) => k.cyl(x, y + h / 2, z, 0.016, h, c);
const off = (x, z, yaw, d) => [x + Math.sin(yaw) * d, z + Math.cos(yaw) * d];

export const EDGE_ITEMS = {
  civil: [
    ["v:civil-crystalShard", (k, x, z, y) => { k.cyl(x, y + 0.03, z, 0.14, 0.05, 0xd9cbb4); k.part("cone6", [x, y + 0.16, z], [0.1, 0.24, 0.1], purple); k.bulb(x, y + 0.3, z, 0.025, 0xd9c6f0); }],
    ["v:civil-graphNode", (k, x, z, y) => { pole(k, x, z, 0.26, y, teal); k.sphere(x, y + 0.28, z, 0.05, coral); }],
    ["v:civil-flowerTub", (k, x, z, y) => { k.cyl(x, y + 0.05, z, 0.16, 0.1, 0xd9cbb4); k.ico(x, y + 0.13, z, [0.15, 0.08, 0.15], green); }],
    ["v:civil-shadeTree", (k, x, z, y) => { k.cyl(x, y + 0.12, z, 0.03, 0.24, 0x8a6a4e); k.ico(x, y + 0.3, z, [0.22, 0.18, 0.22], 0x7f9a6a); k.cyl(x, y + 0.01, z, 0.18, 0.02, 0xbfae95); }],
  ],
  institute: [
    ["v:inst-sensorPole", (k, x, z, y) => { pole(k, x, z, 0.38, y); k.box(x, y + 0.36, z, 0.07, 0.05, 0.07, teal); k.bulb(x, y + 0.4, z, 0.025, 0x9fffd0); }],
    ["v:inst-mapTable", (k, x, z, y) => { k.cyl(x, y + 0.09, z, 0.2, 0.02, wood); k.cyl(x, y + 0.045, z, 0.025, 0.09, ink); k.part("cone6", [x, y + 0.13, z], [0.1, 0.07, 0.1], green); }],
    ["v:inst-miniDome", (k, x, z, y) => { k.cyl(x, y + 0.03, z, 0.16, 0.05, 0xe8e6df); k.part("dome", [x, y + 0.06, z], [0.14, 0.12, 0.14], 0xbfe0e2); }],
    ["v:inst-solarBench", (k, x, z, y, yaw) => { H(k, x, z, 0.22, 0.04, 0.08, wood, yaw, y + 0.04); H(k, x, z, 0.24, 0.012, 0.12, teal, yaw, y + 0.18); }],
  ],
  trails: [
    ["v:tr-snowCairn", (k, x, z, y) => { for (let j = 0; j < 4; j++) k.ico(x, y + 0.03 + j * 0.045, z, [0.1 - j * 0.018, 0.045, 0.1 - j * 0.018], j === 3 ? 0xffffff : 0x9aa6b2); }],
    ["v:tr-iceCrystal", (k, x, z, y) => { k.part("cone6", [x, y + 0.14, z], [0.09, 0.26, 0.09], 0x8fd8f0); k.part("cone6", [x + 0.05, y + 0.09, z + 0.03], [0.06, 0.16, 0.06], 0xbfefff); }],
    ["v:tr-trailSign", (k, x, z, y, yaw) => { pole(k, x, z, 0.3, y, wood); k.hbox(x, y + 0.26, z, 0.14, 0.04, 0.012, coral, null, [0, yaw + 0.3, 0]); k.hbox(x, y + 0.2, z, 0.12, 0.04, 0.012, teal, null, [0, yaw - 0.4, 0]); }],
    ["v:tr-stoneLantern", (k, x, z, y) => { k.box(x, y + 0.03, z, 0.07, 0.06, 0.07, 0xb7a993); k.cyl(x, y + 0.1, z, 0.03, 0.08, 0xb7a993); k.part("cone6", [x, y + 0.17, z], [0.09, 0.05, 0.09], 0xffffff); }],
  ],
  diplomacy: [
    ["v:dip-obelisk", (k, x, z, y) => { k.box(x, y + 0.03, z, 0.1, 0.06, 0.1, 0xd4a459); k.part("cone", [x, y + 0.18, z], [0.07, 0.26, 0.07], 0xe2b66d); }],
    ["v:dip-cactus", (k, x, z, y) => { k.cyl(x, y + 0.12, z, 0.035, 0.24, 0x5c8f52); k.cyl(x + 0.05, y + 0.14, z, 0.022, 0.1, 0x5c8f52); k.cyl(x - 0.05, y + 0.11, z, 0.022, 0.08, 0x5c8f52); }],
    ["v:dip-telescope", (k, x, z, y, yaw) => { pole(k, x, z, 0.16, y, 0x58585f); k.part("cylinder", [x, y + 0.18, z], [0.03, 0.12, 0.03], teal, null, [1.2, yaw, 0]); }],
    ["v:dip-suitcases", (k, x, z, y, yaw) => { for (let j = 0; j < 2; j++) R(k, ...off(x, z, yaw + Math.PI / 2, j * 0.07), 0.05, 0.1 + j * 0.03, 0.08, [coral, teal][j], yaw, y); }],
  ],
  forest: [
    ["v:fo-sapling", (k, x, z, y) => { k.cyl(x, y + 0.03, z, 0.05, 0.06, 0x8a6a4e); k.part("cone6", [x, y + 0.14, z], [0.09, 0.18, 0.09], green); }],
    ["v:fo-mushrooms", (k, x, z, y) => { for (let j = 0; j < 3; j++) { k.cyl(x + j * 0.04, y + 0.02, z, 0.012, 0.04, 0xf2efe8); k.part("dome", [x + j * 0.04, y + 0.035, z], [0.035, 0.025, 0.035], [coral, yel, coral][j]); } }],
    ["v:fo-stump", (k, x, z, y) => { k.cyl(x, y + 0.03, z, 0.12, 0.06, 0xa77a55); k.cyl(x, y + 0.061, z, 0.1, 0.004, 0xd9b48a); }],
    ["v:fo-cloudStone", (k, x, z, y) => { k.ico(x, y + 0.05, z, [0.12, 0.09, 0.1], 0x6d8c54); k.sphere(x + 0.05, y + 0.08, z, 0.04, 0xffffff); }],
  ],
  sport: [
    ["v:sp-kmPost", (k, x, z, y, yaw) => { pole(k, x, z, 0.24, y, coral); R(k, x, z, 0.09, 0.07, 0.02, 0xffffff, yaw, y + 0.2); }],
    ["v:sp-markerCones", (k, x, z, y) => { for (let j = 0; j < 4; j++) k.part("cone", [x - 0.09 + j * 0.06, y + 0.02, z], [0.035, 0.04, 0.035], [coral, yel][j % 2]); }],
    ["v:sp-waterTable", (k, x, z, y, yaw) => { R(k, x, z, 0.18, 0.07, 0.08, 0xf2efe8, yaw, y); for (let j = 0; j < 3; j++) k.cyl(x - 0.05 + j * 0.05, y + 0.085, z, 0.015, 0.03, 0x58c4dd); }],
    ["v:sp-hurdle", (k, x, z, y, yaw) => { H(k, x, z, 0.16, 0.02, 0.02, coral, yaw, y + 0.08); for (const d of [-0.07, 0.07]) pole(k, ...off(x, z, yaw + Math.PI / 2, d), 0.09, y, ink); }],
  ],
  card: [
    ["v:card-bookStack", (k, x, z, y) => { for (let j = 0; j < 4; j++) k.hbox(x, y + 0.015 + j * 0.03, z, 0.11, 0.025, 0.08, [coral, yel, teal, purple][j], null, [0, j * 0.2, 0]); }],
    ["v:card-readingBench", (k, x, z, y, yaw) => { H(k, x, z, 0.22, 0.04, 0.07, wood, yaw, y + 0.04); k.hbox(x, y + 0.085, z, 0.06, 0.012, 0.045, 0xffffff, null, [0, yaw, 0]); }],
    ["v:card-readingLamp", (k, x, z, y) => { pole(k, x, z, 0.28, y, wood); k.part("cone", [x, y + 0.29, z], [0.09, 0.05, 0.09], yel); k.bulb(x, y + 0.26, z, 0.025, 0xfff0c2); }],
    ["v:card-filmReel", (k, x, z, y, yaw) => { k.part("torus", [x, y + 0.08, z], [0.07, 0.07, 0.07], ink, null, [0, yaw, 0]); pole(k, x, z, 0.08, y, ink); }],
  ],
  family: [
    ["v:fam-zenStones", (k, x, z, y) => { k.cyl(x, y + 0.005, z, 0.16, 0.01, 0xf2ece1); k.ico(x - 0.03, y + 0.04, z, [0.07, 0.06, 0.06], 0x7a807c); k.ico(x + 0.04, y + 0.025, z + 0.02, [0.05, 0.04, 0.05], green); }],
    ["v:fam-coffeeStand", (k, x, z, y, yaw) => { R(k, x, z, 0.14, 0.1, 0.09, wood, yaw, y); k.part("cone", [x, y + 0.13, z], [0.05, 0.05, 0.05], 0xffffff, null, [Math.PI, 0, 0]); }],
    ["v:fam-habitCube", (k, x, z, y) => { for (let j = 0; j < 3; j++) k.box(x - 0.05 + j * 0.05, y + 0.03, z, 0.04, 0.04, 0.04, [0x9be9a8, 0x40c463, 0x216e39][j]); }],
    ["v:fam-bonsai", (k, x, z, y) => { k.box(x, y + 0.02, z, 0.1, 0.04, 0.07, teal); k.ico(x, y + 0.08, z, [0.09, 0.06, 0.08], green); }],
  ],
  youth: [
    ["v:yo-miniContainer", (k, x, z, y, yaw) => { R(k, x, z, 0.18, 0.09, 0.09, 0x2496ed, yaw, y); R(k, x, z, 0.18, 0.09, 0.09, teal, yaw + 0.15, y + 0.09); }],
    ["v:yo-serverNode", (k, x, z, y, yaw) => { R(k, x, z, 0.09, 0.18, 0.09, ink, yaw, y); k.bulb(x, y + 0.16, z, 0.02, 0x38bdf8); }],
    ["v:yo-dbDrum", (k, x, z, y) => { for (let j = 0; j < 2; j++) k.cyl(x, y + 0.04 + j * 0.06, z, 0.07, 0.045, teal); }],
    ["v:yo-neonPole", (k, x, z, y) => { pole(k, x, z, 0.28, y); k.glow(x, y + 0.29, z, 0.12, 0.04, 0.015, 0x38bdf8); }],
  ],
  education: [
    ["v:edu-treeNode", (k, x, z, y) => { pole(k, x, z, 0.16, y, teal); k.sphere(x, y + 0.18, z, 0.04, yel); k.sphere(x - 0.05, y + 0.09, z, 0.03, coral); k.sphere(x + 0.05, y + 0.09, z, 0.03, green); }],
    ["v:edu-tensorBlock", (k, x, z, y) => { k.box(x, y + 0.05, z, 0.09, 0.09, 0.09, purple); k.bulb(x, y + 0.12, z, 0.02, 0xfcea8b); }],
    ["v:edu-codeBoard", (k, x, z, y, yaw) => { for (const d of [-0.07, 0.07]) pole(k, ...off(x, z, yaw + Math.PI / 2, d), 0.2, y, wood); R(k, x, z, 0.18, 0.11, 0.02, ink, yaw, y + 0.1); }],
    ["v:edu-packageBox", (k, x, z, y, yaw) => { R(k, x, z, 0.09, 0.08, 0.09, yel, yaw, y); H(k, x, z, 0.095, 0.01, 0.03, coral, yaw, y + 0.08); }],
  ],
  transport: [
    ["v:tr-keycapStool", (k, x, z, y) => { for (let j = 0; j < 2; j++) k.box(x - 0.04 + j * 0.08, y + 0.03, z, 0.06, 0.05, 0.06, j ? coral : 0xf2efe8); }],
    ["v:tr-nasMini", (k, x, z, y, yaw) => { R(k, x, z, 0.08, 0.12, 0.1, ink, yaw, y); k.bulb(...off(x, z, yaw, 0.05), 0.015, 0x5ebd7a); }],
    ["v:tr-gitBranch", (k, x, z, y) => { k.cyl(x - 0.04, y + 0.02, z, 0.03, 0.03, coral); k.cyl(x + 0.04, y + 0.02, z, 0.03, 0.03, teal); H(k, x, z, 0.08, 0.01, 0.01, ink, 0, y + 0.02); }],
    ["v:tr-macCube", (k, x, z, y, yaw) => { R(k, x, z, 0.09, 0.05, 0.09, 0xd8dad9, yaw, y); }],
  ],
  hakka: [
    ["v:hk-tripodCam", (k, x, z, y, yaw) => { pole(k, x, z, 0.18, y, ink); R(k, x, z, 0.06, 0.045, 0.05, ink, yaw, y + 0.18); k.bulb(...off(x, z, yaw, 0.03), 0.018, yel); }],
    ["v:hk-photoStand", (k, x, z, y, yaw) => { R(k, x, z, 0.16, 0.12, 0.02, 0xffffff, yaw, y + 0.06); R(k, x, z, 0.12, 0.08, 0.024, coral, yaw, y + 0.08); }],
    ["v:hk-lightUmbrella", (k, x, z, y) => { pole(k, x, z, 0.24, y, ink); k.part("cone6", [x, y + 0.26, z], [0.14, 0.06, 0.14], 0xffffff); }],
    ["v:hk-filmCanister", (k, x, z, y) => { k.cyl(x, y + 0.05, z, 0.045, 0.09, yel); k.cyl(x, y + 0.1, z, 0.05, 0.015, ink); }],
  ],
  welfare: [
    ["v:wel-timeStone", (k, x, z, y) => { k.box(x, y + 0.08, z, 0.08, 0.16, 0.04, 0xd9cbb4); k.sphere(x, y + 0.18, z, 0.025, yel); }],
    ["v:wel-lanternPost", (k, x, z, y) => { pole(k, x, z, 0.24, y, wood); k.bulb(x, y + 0.24, z, 0.03, 0xfff0c2); }],
    ["v:wel-birdFeeder", (k, x, z, y) => { pole(k, x, z, 0.26, y, wood); k.part("cone6", [x, y + 0.28, z], [0.1, 0.05, 0.1], coral); k.box(x, y + 0.24, z, 0.06, 0.04, 0.06, 0xf2efe8); }],
    ["v:wel-restBench", (k, x, z, y, yaw) => { H(k, x, z, 0.2, 0.03, 0.07, wood, yaw, y + 0.06); H(k, x, z, 0.2, 0.06, 0.012, wood, yaw, y + 0.1); }],
  ],
  lunch: [
    ["v:lu-miniDish", (k, x, z, y) => { pole(k, x, z, 0.18, y, ink); k.part("dome", [x, y + 0.2, z], [0.1, 0.05, 0.1], 0xffffff, null, [Math.PI * 0.75, 0, 0]); }],
    ["v:lu-surfboard", (k, x, z, y, yaw) => { k.part("box", [x, y + 0.12, z], [0.05, 0.24, 0.015], coral, null, [0.2, yaw, 0]); }],
    ["v:lu-signalBeacon", (k, x, z, y) => { pole(k, x, z, 0.26, y, teal); k.bulb(x, y + 0.28, z, 0.03, 0x38bdf8); }],
    ["v:lu-abacusFrame", (k, x, z, y, yaw) => { R(k, x, z, 0.14, 0.1, 0.02, wood, yaw, y + 0.04); }],
  ],
};
