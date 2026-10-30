// Thematic 3D Miniatures: Sculpted mountains, natural landscapes & architectural landmarks.
// Each model draws in unit space (~[-0.5, 0.5] footprint, y >= 0).
export function extraModel(kind, h) {
  const { b, hb, cy, sphere, ring, p, glow, bulb, seat, person, plant, C, glass, wood, green } = h;
  const teal = 0x3e7c8c,
    teal2 = 0x5f9aa6,
    warm = 0xe9dcc4,
    stone = 0xd2c3ad,
    yel = 0xe8c547;

  // Geometric convenience wrappers
  const cone6 = (a, s, c, r) => p("cone6", a, Array.isArray(s) ? s : [s, s, s], c, r);
  const cone = (a, s, c, r) => p("cone", a, Array.isArray(s) ? s : [s, s, s], c, r);
  const ico = (a, s, c, r) => p("ico", a, Array.isArray(s) ? s : [s, s, s], c, r);
  const tetra = (a, s, c, r) => p("tetra", a, Array.isArray(s) ? s : [s, s, s], c, r);
  const prism = (a, s, c, r) => p("prism", a, Array.isArray(s) ? s : [s, s, s], c, r);
  const leaf = (a, s, c, r) => p("leaf", a, Array.isArray(s) ? s : [s, s, s], c, r);
  const dome = (a, s, c, r) => p("dome", a, Array.isArray(s) ? s : [s, s, s], c, r);
  const trunk = (a, s, c, r) => p("trunk", a, Array.isArray(s) ? s : [s, s, s], c, r);
  const desk = (xx = 0, zz = 0) => {
    b([xx, 0.28, zz], [0.38, 0.04, 0.24], wood);
    for (const d of [-0.14, 0.14]) b([xx + d, 0.14, zz], [0.025, 0.28, 0.18], C.cream);
  };
  const screen = (xx = 0, zz = 0) => {
    b([xx, 0.47, zz], [0.29, 0.23, 0.045], C.ink);
    b([xx, 0.47, zz + 0.025], [0.25, 0.18, 0.008], glass);
    b([xx, 0.33, zz], [0.025, 0.1, 0.025], C.ink);
    for (let j = 0; j < 3; j++) b([xx - 0.055 + j * 0.055, 0.45, zz + 0.032], [0.028, 0.035 + j * 0.035, 0.008], C.yellow);
  };

  switch (kind) {
    // =========================================================================
    // 🏔️ Island 03: trails (極境高山與冰原島)
    // =========================================================================
    case "snowpeak": {
      // Annapurna Himalayan double massif with glacier ridge, prayer flags & basecamp
      cone6([0.05, 0.45, -0.05], [0.95, 0.95, 0.95], 0x7c8a96); // main peak base
      cone6([0.05, 0.98, -0.05], [0.55, 0.65, 0.55], 0xffffff); // snow cap
      cone6([0.05, 1.25, -0.05], [0.28, 0.35, 0.28], 0xf0f8ff); // summit ice spire
      cone6([-0.36, 0.35, 0.12], [0.65, 0.72, 0.65], 0x687784); // secondary peak base
      cone6([-0.36, 0.7, 0.12], [0.38, 0.44, 0.38], 0xffffff); // secondary snow cap
      // Rocky arête ridge boulders
      ico([-0.16, 0.42, 0.04], 0.24, 0x5b6873);
      ico([0.22, 0.32, -0.12], 0.22, 0x687580);
      ico([-0.05, 0.22, 0.18], 0.2, 0x788691);
      // Alpine basecamp hut with A-frame wood roof
      b([0.32, 0.1, 0.26], [0.26, 0.18, 0.22], wood);
      prism([0.32, 0.24, 0.26], [0.28, 0.24, 0.14], 0xe26d2d, [0, 0, Math.PI / 2]);
      cy([0.4, 0.3, 0.22], 0.03, 0.14, 0x3d3a38); // stove chimney
      bulb([0.32, 0.1, 0.38], 0.05, 0xfce88b); // warm porch light
      // Tibetan 5-color prayer flags strung across the ridge
      const flagCols = [0x3e7c8c, 0xffffff, 0xd93829, 0x4d8b55, 0xf2c94c];
      for (let k = 0; k < 5; k++) {
        hb([-0.22 + k * 0.08, 0.68 - Math.abs(k - 2) * 0.04, 0.05], [0.03, 0.04, 0.01], flagCols[k]);
      }
      // Winding snow trail
      for (let t = 0; t < 6; t++) {
        hb([0.26 - t * 0.07, 0.04 + t * 0.03, 0.18 - t * 0.04], [0.06, 0.02, 0.05], 0xe8f1f5);
      }
      return true;
    }
    case "volcano": {
      // Iceland volcanic caldera with glowing magma, cascading waterfall & aurora igloo
      cone6([0, 0.34, -0.06], [0.92, 0.68, 0.92], 0x3a383d); // basalt cone
      cone6([0, 0.34, -0.06], [0.86, 0.68, 0.86], 0x48464a); // basalt texture
      cy([0, 0.64, -0.06], 0.36, 0.08, 0x2e2c30); // crater rim
      cy([0, 0.67, -0.06], 0.26, 0.04, 0xff4818); // fiery magma pool
      bulb([0, 0.69, -0.06], 0.12, 0xff9a26); // glowing magma core
      // Cascading blue glacial waterfall down side
      b([0.24, 0.36, 0.12], [0.12, 0.44, 0.16], 0x7fd4e6, [0.35, 0.3, 0]);
      b([0.28, 0.18, 0.22], [0.14, 0.24, 0.14], 0x9be8f5);
      // Geothermal turquoise hot spring lagoon
      cy([0.32, 0.04, 0.28], 0.38, 0.06, 0x8fe8f2);
      cy([0.32, 0.05, 0.28], 0.28, 0.04, 0x56d2e6);
      sphere([0.28, 0.08, 0.25], 0.04, 0xffffff); // steam bubble
      sphere([0.36, 0.09, 0.31], 0.05, 0xffffff); // steam bubble
      // Aurora glass observation igloo
      cy([-0.3, 0.06, 0.26], 0.26, 0.06, 0x2e2d30); // dark base
      dome([-0.3, 0.09, 0.26], [0.24, 0.22, 0.24], 0xa6e8e8); // glass geodesic dome
      bulb([-0.3, 0.1, 0.26], 0.07, 0xfcea8b); // warm interior light
      return true;
    }
    case "glacier": {
      // Baikal Lake blue ice cave, translucent ice crystal arches & hovercraft
      b([0, 0.04, 0], [1.02, 0.08, 0.88], 0xb8ecff); // frozen ice lake slab
      cy([0, 0.06, 0], 0.88, 0.04, 0x8edbf5); // clear blue lake sheet
      // Translucent ice-blue crystal spires
      cone6([-0.22, 0.36, -0.15], [0.34, 0.68, 0.34], 0x72c8e8);
      cone6([0.18, 0.42, -0.18], [0.38, 0.78, 0.38], 0x9fe3f8);
      cone6([-0.38, 0.28, 0.08], [0.28, 0.52, 0.28], 0x58bfe0);
      cone6([0.36, 0.32, -0.05], [0.32, 0.6, 0.32], 0xaee8fa);
      // Natural ice cave arch
      ring([0, 0.35, -0.05], 0.38, 0x8edbf5, [0, 0, 0]);
      ring([0, 0.35, -0.05], 0.44, 0xe0f7ff, [0, 0, 0]);
      // Snow drifts and pressure ridges
      ico([-0.12, 0.1, -0.25], 0.18, 0xf5faff);
      ico([0.28, 0.08, 0.12], 0.16, 0xf5faff);
      // Red expedition hovercraft
      b([0.15, 0.1, 0.26], [0.34, 0.1, 0.2], 0xd93829);
      b([0.15, 0.05, 0.26], [0.38, 0.05, 0.24], 0x222224); // rubber skirt
      b([0.12, 0.17, 0.26], [0.18, 0.08, 0.14], 0x8fe8f2); // glass cabin
      ring([0.3, 0.16, 0.22], 0.06, 0x222224, [0, Math.PI / 2, 0]); // twin rear props
      ring([0.3, 0.16, 0.3], 0.06, 0x222224, [0, Math.PI / 2, 0]);
      return true;
    }
    case "alpineTorii": {
      // Mt. Fuji symmetrical snow cone, Tsurugi-dake rock crags & vermilion Torii gate
      cone6([0.05, 0.46, -0.12], [0.96, 0.9, 0.96], 0x55667a); // Fuji base
      cone6([0.05, 0.78, -0.12], [0.55, 0.48, 0.55], 0xffffff); // Fuji snow summit
      // Sharp Tsurugi rock arête crags
      ico([-0.35, 0.35, 0.05], 0.28, 0x48515c);
      ico([-0.22, 0.44, -0.08], 0.22, 0x3d444d);
      // Vermilion Japanese Torii gate at trailhead
      const toriiRed = 0xd93829;
      cy([-0.28, 0.18, 0.26], 0.038, 0.36, toriiRed); // left post
      cy([-0.06, 0.18, 0.26], 0.038, 0.36, toriiRed); // right post
      b([-0.17, 0.36, 0.26], [0.34, 0.035, 0.05], toriiRed); // kasagi lintel
      b([-0.17, 0.39, 0.26], [0.36, 0.02, 0.055], 0x1f1d1d); // black top cap
      b([-0.17, 0.3, 0.26], [0.28, 0.025, 0.035], toriiRed); // nuki tie beam
      // Japanese stone lantern (toro)
      b([0.08, 0.12, 0.28], [0.08, 0.18, 0.08], 0x8c8984);
      bulb([0.08, 0.15, 0.28], 0.03, 0xfce88b);
      // Conifer alpine pine trees
      cone6([0.35, 0.22, 0.2], [0.26, 0.4, 0.26], 0x44634d);
      cone6([0.35, 0.34, 0.2], [0.18, 0.3, 0.18], 0x557a60);
      return true;
    }
    case "highlandMonastery": {
      // Sichuan highland Tibetan red monastic cabins, golden stupa roof & Mt Kinabalu peak
      b([0, 0.06, 0], [1.0, 0.12, 0.88], 0x9ab068); // highland green-gold plateau
      // Jagged granite snow peak backdrop
      cone6([0.28, 0.5, -0.16], [0.65, 0.98, 0.65], 0x8a8680);
      cone6([0.28, 0.86, -0.16], [0.32, 0.38, 0.32], 0xffffff);
      // Main Tibetan Red Temple with Golden Stupa Roof
      b([-0.2, 0.22, 0.05], [0.42, 0.3, 0.38], 0xb8322a);
      tetra([-0.2, 0.42, 0.05], [0.46, 0.18, 0.42], 0xf2c94c); // golden hip roof
      cone([-0.2, 0.54, 0.05], [0.09, 0.14, 0.09], 0xf2c94c); // golden spire
      // Cluster of 4 terraced Tibetan crimson red monastic cabins
      const cabins = [
        [-0.38, 0.12, -0.12],
        [-0.05, 0.14, -0.16],
        [-0.36, 0.14, 0.24],
        [-0.1, 0.12, 0.28],
      ];
      for (const [cx, cyy, cz] of cabins) {
        b([cx, cyy, cz], [0.2, 0.16, 0.18], 0xa62b24);
        b([cx, cyy + 0.09, cz], [0.22, 0.03, 0.2], 0x5a1814); // dark red roof
        hb([cx, cyy + 0.02, cz + 0.092], [0.06, 0.06, 0.01], 0xfff8ec); // white window
      }
      // White Tibetan Chorten (Stupa)
      cy([0.2, 0.12, 0.22], 0.14, 0.12, 0xf6efe6);
      sphere([0.2, 0.2, 0.22], 0.12, 0xf6efe6);
      cone([0.2, 0.3, 0.22], [0.09, 0.16, 0.09], 0xf2c94c);
      return true;
    }

    // =========================================================================
    // 🏜️ Island 04: diplomacy (荒漠古文明與世界旅圖島)
    // =========================================================================
    case "pyramids": {
      // Giza 3 Golden Sandstone Pyramids, Great Sphinx, Nile River & oasis palms
      tetra([0.05, 0.48, -0.1], [0.85, 0.95, 0.85], 0xe2b66d); // Great Pyramid Khufu
      tetra([0.05, 0.88, -0.1], [0.22, 0.22, 0.22], 0xfce88b); // golden pyramidion cap
      tetra([-0.36, 0.36, 0.08], [0.62, 0.72, 0.62], 0xd4a459); // Khafre Pyramid
      tetra([0.35, 0.25, 0.2], [0.44, 0.5, 0.44], 0xc6934b); // Menkaure Pyramid
      // Great Sphinx sandstone miniature
      b([-0.18, 0.1, 0.32], [0.24, 0.12, 0.14], 0xd9b382); // body
      sphere([-0.26, 0.18, 0.32], 0.08, 0xd9b382); // head & headdress
      // Nile River oasis strip
      b([0.22, 0.03, 0.36], [0.4, 0.03, 0.16], 0x4fa4b8);
      // White felucca sailboat
      b([0.18, 0.05, 0.36], [0.1, 0.03, 0.05], 0xffffff);
      prism([0.18, 0.12, 0.36], [0.06, 0.12, 0.04], 0xffffff, [0, 0, Math.PI / 2]); // lateen sail
      // Oasis palm trees
      for (const [px, pz] of [[0.06, 0.28], [0.38, 0.36]]) {
        cy([px, 0.12, pz], 0.03, 0.22, 0x8a623a);
        cone6([px, 0.24, pz], [0.24, 0.12, 0.24], 0x4d8b55);
      }
      return true;
    }
    case "moai": {
      // Easter Island Moai monoliths with red pukao & Torres del Paine granite horns
      // Torres del Paine twin jagged granite horns
      cone6([0.16, 0.52, -0.18], [0.55, 1.05, 0.55], 0x8c969e);
      cone6([0.16, 0.9, -0.18], [0.28, 0.45, 0.28], 0xd8ccb8);
      cone6([-0.24, 0.46, -0.22], [0.46, 0.92, 0.46], 0x7a838b);
      // Stone Ahu ceremonial platform
      b([0, 0.07, 0.14], [0.88, 0.1, 0.24], 0x6e6862);
      // 3 Iconic Easter Island Moai statues
      const moaiX = [-0.26, 0.0, 0.26];
      for (let k = 0; k < 3; k++) {
        const mx = moaiX[k];
        const mh = 0.36 + (k === 1 ? 0.06 : 0);
        b([mx, 0.12 + mh * 0.3, 0.14], [0.16, mh * 0.6, 0.14], 0x8a847e); // torso
        b([mx, 0.12 + mh * 0.72, 0.15], [0.14, mh * 0.42, 0.16], 0x9c9690); // head & heavy brow
        hb([mx, 0.12 + mh * 0.68, 0.24], [0.04, mh * 0.22, 0.04], 0xaba49e); // long nose
        cy([mx, 0.12 + mh * 0.96, 0.14], 0.09, 0.08, 0xb84a39); // red pukao topknot
      }
      // Atacama desert stargazing observatory dome
      dome([0.36, 0.14, 0.28], [0.18, 0.18, 0.18], 0xf4f1ea);
      hb([0.36, 0.18, 0.35], [0.03, 0.14, 0.03], 0x1f1d1d); // slit
      bulb([0.36, 0.12, 0.28], 0.05, 0x38bdf8);
      return true;
    }
    case "silkroad": {
      // Tianshan snow peaks, Sayram Lake sapphire water, Kashgar turquoise Islamic dome
      cone6([0.22, 0.48, -0.15], [0.75, 0.95, 0.75], 0x6e7e8c); // Tianshan base
      cone6([0.22, 0.86, -0.15], [0.38, 0.42, 0.38], 0xffffff); // snow cap
      // Sayram Lake sapphire alpine waters
      cy([0.26, 0.04, 0.2], 0.42, 0.05, 0x2e6b9c);
      cy([0.26, 0.05, 0.2], 0.32, 0.04, 0x3b82c4);
      // Kashgar mud-brick ancient city walls & gate
      b([-0.2, 0.16, 0.05], [0.46, 0.28, 0.32], 0xd9b382);
      b([-0.2, 0.28, 0.05], [0.48, 0.04, 0.34], 0xc79e6d);
      // Turquoise-glazed Islamic dome & golden crescent
      dome([-0.2, 0.36, 0.05], [0.26, 0.28, 0.26], 0x3e9aa6);
      cone([-0.2, 0.52, 0.05], [0.07, 0.12, 0.07], 0xf2c94c);
      // Minaret tower
      cy([-0.38, 0.3, 0.12], 0.09, 0.58, 0xd9b382);
      dome([-0.38, 0.59, 0.12], [0.1, 0.1, 0.1], 0x3e9aa6);
      // Camel caravan (2 camels on dune)
      for (const [cx, cz] of [[-0.08, 0.28], [0.06, 0.32]]) {
        b([cx, 0.1, cz], [0.12, 0.08, 0.07], 0xc49a62); // body
        sphere([cx, 0.16, cz], 0.05, 0xc49a62); // hump
        cy([cx - 0.06, 0.14, cz], 0.025, 0.09, 0xc49a62); // neck
      }
      return true;
    }
    case "euroTrain": {
      // Eurasian railway stone viaduct, high-speed train & world terminal
      b([0, 0.28, -0.05], [0.98, 0.06, 0.18], 0xc8bca8); // viaduct deck
      for (const vx of [-0.3, 0.0, 0.3]) {
        b([vx, 0.14, -0.05], [0.12, 0.24, 0.16], 0xaba090); // piers
        ring([vx, 0.22, -0.05], 0.16, 0x9e9485, [0, 0, 0]); // arch
      }
      // Sleek Eurostar bullet train
      b([-0.05, 0.35, -0.05], [0.76, 0.09, 0.12], 0xf7f6f2); // train body
      b([-0.05, 0.34, 0.012], [0.76, 0.02, 0.005], 0xe26d2d); // orange stripe
      b([0.33, 0.36, -0.05], [0.06, 0.06, 0.11], 0x222629); // cab windshield
      // World globe monument on pedestal
      cy([0.28, 0.1, 0.26], 0.18, 0.12, 0x3d3a42);
      sphere([0.28, 0.22, 0.26], 0.13, 0x4fa4b8);
      ring([0.28, 0.22, 0.26], 0.15, 0xe8c547, [0.3, 0.2, 0]);
      // Terminal glass canopy
      b([-0.15, 0.12, 0.25], [0.38, 0.2, 0.24], 0x86a8a6);
      return true;
    }

    // =========================================================================
    // 🌲 Island 05: forest (台灣山林與寶島走讀島)
    // =========================================================================
    case "baiyuePeak": {
      // Taiwan Qilai Main & North peaks, Sea of Clouds & summit triangulation pillar
      cone6([0, 0.55, -0.1], [0.95, 1.1, 0.95], 0x4d7c58); // steep Qilai main peak
      cone6([0, 0.55, -0.1], [0.88, 1.08, 0.88], 0x3e5244); // dark slate rock facets
      cone6([-0.36, 0.42, 0.1], [0.65, 0.84, 0.65], 0x5e8f66); // Qilai North peak
      ico([-0.18, 0.5, -0.02], 0.22, 0x3e4a40); // knife-edge ridge boulder
      // Majestic billowy Sea of Clouds wrapping around waist
      const clouds = [
        [-0.4, 0.38, -0.2],
        [-0.15, 0.42, 0.26],
        [0.25, 0.4, 0.2],
        [0.38, 0.44, -0.15],
        [0.05, 0.46, 0.28],
        [-0.3, 0.44, 0.22],
      ];
      for (const [cx, cyy, cz] of clouds) {
        sphere([cx, cyy, cz], [0.22, 0.14, 0.22], 0xffffff);
        sphere([cx + 0.04, cyy + 0.03, cz], [0.16, 0.1, 0.16], 0xf2f6fa);
      }
      // Summit triangulation post (一等三角點)
      b([0, 1.12, -0.1], [0.06, 0.08, 0.06], 0xded8ce);
      hb([0, 1.18, -0.1], [0.015, 0.06, 0.015], 0x1f1d1d);
      return true;
    }
    case "alishanTrain": {
      // Ancient Taiwan Red Cypress sacred tree, forest tracks & Alishan red train
      // Giant sacred tree
      trunk([0.22, 0.45, -0.1], [0.36, 0.9, 0.36], 0x6e523e);
      leaf([0.22, 0.88, -0.1], [0.72, 0.6, 0.72], 0x42734a);
      leaf([0.24, 1.12, -0.1], [0.52, 0.45, 0.52], 0x52875b);
      leaf([0.18, 1.25, -0.08], [0.35, 0.3, 0.35], 0x6aa675);
      // Railway tracks curving through moss
      b([-0.15, 0.04, 0.12], [0.65, 0.02, 0.32], 0x5a483a); // ties
      hb([-0.15, 0.06, 0.08], [0.68, 0.02, 0.02], 0x8a8a92); // rail 1
      hb([-0.15, 0.06, 0.16], [0.68, 0.02, 0.02], 0x8a8a92); // rail 2
      // Alishan Crimson Forest Locomotive
      b([-0.16, 0.15, 0.12], [0.44, 0.18, 0.18], 0xc9362b);
      b([-0.16, 0.25, 0.12], [0.46, 0.04, 0.2], 0x222224); // black roof
      cy([-0.04, 0.3, 0.12], 0.04, 0.1, 0x222224); // exhaust smokestack
      b([-0.16, 0.18, 0.212], [0.38, 0.02, 0.005], 0xfce88b); // yellow stripe
      bulb([-0.38, 0.16, 0.12], 0.05, 0xfce88b); // front brass headlight
      return true;
    }
    case "islandCoast": {
      // Penghu hexagonal basalt cliff columns, Twin-Hearts Stone Weir & lighthouse
      // Hexagonal basalt column cluster
      const cols = [
        [0.0, -0.1, 0.45],
        [0.12, -0.18, 0.52],
        [-0.12, -0.12, 0.48],
        [0.22, -0.06, 0.38],
        [-0.22, -0.05, 0.35],
      ];
      for (const [bx, bz, bh] of cols) {
        cone6([bx, bh / 2, bz], [0.18, bh, 0.18], 0x5a5652);
      }
      // Shallow sea with Twin-Hearts Stone Weir (雙心石滬)
      b([-0.16, 0.03, 0.2], [0.56, 0.03, 0.44], 0x68c4d0);
      ring([-0.22, 0.05, 0.18], 0.14, 0x8a8278, [0, 0, 0]);
      ring([-0.12, 0.05, 0.24], 0.14, 0x8a8278, [0, 0, 0]);
      // White Yuwengdao Lighthouse
      cone([0.28, 0.35, -0.06], [0.22, 0.65, 0.22], 0xffffff); // white tower
      cy([0.28, 0.68, -0.06], 0.14, 0.06, 0x222428); // gallery deck
      bulb([0.28, 0.72, -0.06], 0.07, 0xfce88b); // glowing beacon
      dome([0.28, 0.76, -0.06], [0.12, 0.08, 0.12], 0x222428); // dome roof
      return true;
    }
    case "mountainCamp": {
      // High mountain forest campsite, 2 pitched tents, warm campfire & gear rack
      b([0, 0.04, 0], [0.96, 0.06, 0.86], 0xa69580); // timber campsite clearing
      // Sunset orange alpine A-frame tent
      prism([0.18, 0.16, -0.1], [0.38, 0.28, 0.42], 0xe26d2d, [0, 0, Math.PI / 2]);
      // Forest green lightweight ridge tent
      prism([-0.24, 0.14, 0.16], [0.32, 0.24, 0.36], 0x4d8b55, [0, 0, Math.PI / 2]);
      // Glowing campfire with stone ring
      for (let k = 0; k < 6; k++) {
        const a = (k / 6) * Math.PI * 2;
        ico([0.02 + Math.cos(a) * 0.1, 0.07, 0.15 + Math.sin(a) * 0.1], 0.04, 0x6e6862);
      }
      bulb([0.02, 0.1, 0.15], 0.08, 0xff9436); // fire core
      cone([0.02, 0.14, 0.15], [0.06, 0.1, 0.06], 0xff5a26); // flames
      // Trekking poles & backpack rack
      hb([-0.3, 0.16, -0.15], [0.03, 0.3, 0.03], 0x222224);
      b([-0.3, 0.18, -0.12], [0.1, 0.14, 0.08], 0xe26d2d); // backpack
      // Pine trees
      cone6([0.38, 0.25, 0.2], [0.26, 0.45, 0.26], 0x3d6647);
      cone6([-0.38, 0.22, -0.22], [0.24, 0.4, 0.24], 0x3d6647);
      return true;
    }

    // =========================================================================
    // 🏃 Island 06: sport (跑者耐力與馬拉松島)
    // =========================================================================
    case "fujiMarathon": {
      // Kawaguchiko Marathon course, Mt. Fuji backdrop, autumn momiji maples
      cone6([0, 0.44, -0.22], [0.86, 0.88, 0.86], 0x4f6b8a);
      cone6([0, 0.76, -0.22], [0.5, 0.45, 0.5], 0xffffff); // snow cap
      b([0, 0.03, -0.02], [0.92, 0.04, 0.2], 0x5aa8b8); // Lake Kawaguchiko
      // Winding asphalt marathon road with white stripe
      b([0, 0.04, 0.18], [0.94, 0.04, 0.18], 0x3a393e);
      hb([0, 0.062, 0.18], [0.9, 0.005, 0.015], 0xffffff);
      // Autumn red/amber maple trees
      sphere([-0.3, 0.22, 0.26], 0.16, 0xd94a2b);
      sphere([0.28, 0.24, 0.25], 0.18, 0xe8832a);
      // Marathon runners
      person(-0.1, 0.18, 0.34);
      person(0.12, 0.18, 0.34);
      return true;
    }
    case "marathonTrack": {
      // 42.195K Finish Line gantry arch, red oval track & digital timer clock
      b([0, 0.04, 0], [1.02, 0.06, 0.86], 0xd95f43); // terracotta red track
      // White running lane markers
      for (const dz of [-0.22, 0.0, 0.22]) {
        hb([0, 0.071, dz], [0.92, 0.005, 0.015], 0xffffff);
      }
      // Grand Finish Line Gantry Arch
      cy([-0.38, 0.35, 0.05], 0.06, 0.65, 0x2d1e14);
      cy([0.38, 0.35, 0.05], 0.06, 0.65, 0x2d1e14);
      b([0, 0.65, 0.05], [0.84, 0.12, 0.1], 0xe26d2d);
      glow([0, 0.65, 0.105], [0.42, 0.06, 0.015], 0xfcea8b); // digital clock
      // Finish banner ribbon
      b([0, 0.36, 0.05], [0.65, 0.08, 0.02], 0xffffff);
      person(-0.06, 0.05, 0.34); // finishing runner
      return true;
    }
    case "riverTrail": {
      // River pace greenway, arched bridge & switchback trail hill
      b([0, 0.03, -0.06], [0.96, 0.04, 0.32], 0x6ab8c9); // river
      // Modern arched pedestrian / bike bridge
      b([0.05, 0.18, -0.06], [0.26, 0.04, 0.44], 0xf2ede4);
      hb([0.05 - 0.13, 0.24, -0.06], [0.015, 0.08, 0.44], 0xd93829); // railings
      hb([0.05 + 0.13, 0.24, -0.06], [0.015, 0.08, 0.44], 0xd93829);
      // Greenway path with distance milestone
      b([0, 0.04, 0.22], [0.94, 0.04, 0.18], 0x8ab88a);
      b([0.32, 0.1, 0.28], [0.08, 0.14, 0.08], 0xffffff); // KM 20 marker
      // Trail hill
      cone6([-0.32, 0.2, -0.22], [0.35, 0.4, 0.35], 0x5a8a66);
      return true;
    }
    case "runnerGear": {
      // Athletic pavilion, giant carbon-plated shoe trophy & hydration table
      b([-0.2, 0.22, -0.1], [0.45, 0.38, 0.36], 0xf4eee4);
      b([-0.2, 0.22, 0.085], [0.38, 0.28, 0.015], glass); // glass facade
      // Elevated trophy podium with giant sculpted running shoe
      cy([0.16, 0.12, 0.16], 0.28, 0.18, 0x2d1e14);
      b([0.16, 0.25, 0.16], [0.34, 0.07, 0.14], 0xffffff); // thick foam sole
      b([0.16, 0.32, 0.16], [0.32, 0.08, 0.13], 0xe26d2d); // bright neon upper
      b([0.16, 0.28, 0.16], [0.34, 0.01, 0.14], 0x1f1d1d); // carbon plate line
      // Hydration drink station table
      b([-0.18, 0.1, 0.26], [0.35, 0.12, 0.12], 0x3d3a42);
      for (let k = 0; k < 3; k++) cy([-0.26 + k * 0.08, 0.18, 0.26], 0.025, 0.04, 0x38bdf8);
      return true;
    }

    // =========================================================================
    // 📚 Island 07: card (書房與深夜電影院島)
    // =========================================================================
    case "grandLibrary": {
      // Monumental open hardcover book sculpture, tall bookshelves & reading lamp
      // Center giant open book
      b([0, 0.14, 0.06], [0.74, 0.05, 0.52], 0x8b4a3a, [0.1, 0, 0]); // leather cover
      b([-0.18, 0.2, 0.06], [0.32, 0.08, 0.46], 0xfff8ec, [0.1, 0, -0.15]); // left page block
      b([0.18, 0.2, 0.06], [0.32, 0.08, 0.46], 0xfff8ec, [0.1, 0, 0.15]); // right page block
      hb([0, 0.24, 0.06], [0.02, 0.02, 0.46], 0xd93829); // red ribbon bookmark
      // Floor-to-ceiling mahogany bookshelf backdrop
      b([0, 0.45, -0.24], [0.94, 0.8, 0.16], 0x5a3424);
      // Colorful rows of book spines
      const bookCols = [0xd94a2b, 0x3e7c8c, 0xe8c547, 0x4d8b55, 0x7a5ea8];
      for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 7; col++) {
          hb([-0.36 + col * 0.12, 0.2 + row * 0.24, -0.155], [0.08, 0.18, 0.01], bookCols[(row + col) % 5]);
        }
      }
      // Brass banker's reading lamp
      cy([0.3, 0.18, 0.24], 0.02, 0.18, 0xcaa24a);
      cy([0.3, 0.26, 0.24], 0.08, 0.04, 0x3d7e52); // green glass shade
      bulb([0.3, 0.25, 0.24], 0.03, 0xfce88b);
      return true;
    }
    case "historyRotunda": {
      // Neo-Cartography Rotunda Library, turquoise dome & giant brass globe
      cy([0, 0.28, -0.05], 0.52, 0.52, 0xf2ece1); // rotunda drum
      for (let k = 0; k < 8; k++) {
        const a = (k / 8) * Math.PI * 2;
        cy([Math.cos(a) * 0.54, 0.28, -0.05 + Math.sin(a) * 0.54], 0.04, 0.52, 0xd9cfc0);
      }
      dome([0, 0.55, -0.05], [0.56, 0.36, 0.56], 0x3e7c8c); // turquoise copper dome
      cone([0, 0.78, -0.05], [0.08, 0.14, 0.08], 0xe8c547); // golden finial
      // Giant brass world globe
      cy([0.28, 0.1, 0.26], 0.16, 0.14, 0x4a4744);
      sphere([0.28, 0.25, 0.26], 0.14, 0x3e7c8c);
      ring([0.28, 0.25, 0.26], 0.16, 0xe8c547, [0.35, 0.2, 0]);
      // Zettelkasten card index cabinet
      b([-0.28, 0.18, 0.25], [0.24, 0.28, 0.16], 0x7a4c32);
      return true;
    }
    case "natureBooks": {
      // Warm timber A-frame mountain book pavilion, journals & telescope
      prism([0, 0.32, -0.05], [0.58, 0.55, 0.5], 0x8a5a3a, [0, 0, Math.PI / 2]); // A-frame roof
      b([0, 0.2, -0.05], [0.48, 0.38, 0.44], 0xf0e6d6);
      b([0, 0.24, 0.18], [0.34, 0.24, 0.015], glass); // glass gable
      bulb([0, 0.24, 0.1], 0.06, 0xfce88b); // warm interior light
      // Stargazer telescope on tripod
      cy([0.26, 0.18, 0.26], 0.03, 0.28, 0x3d3a38, [0.4, 0.3, 0]);
      sphere([0.26, 0.34, 0.26], 0.05, 0xcaa24a);
      // Surrounding alpine boulders & pines
      ico([-0.3, 0.1, 0.22], 0.16, 0x7a7772);
      cone6([-0.32, 0.26, -0.25], [0.26, 0.44, 0.26], 0x44634d);
      return true;
    }
    case "midnightCinema": {
      // Open-air midnight cinema, glowing screen, 35mm projector & red velvet seats
      b([0, 0.45, -0.2], [0.96, 0.66, 0.08], 0x1f1d24); // screen frame
      glow([0, 0.45, -0.155], [0.88, 0.58, 0.015], 0xd8ecff); // glowing cinema screen
      // 35mm Projector booth at rear
      b([0, 0.22, 0.32], [0.18, 0.32, 0.16], 0x2b2927);
      ring([0, 0.4, 0.32], 0.09, 0xc8bca8, [0, 0, 0]); // spinning reels
      ring([0, 0.5, 0.34], 0.08, 0xc8bca8, [0, 0, 0]);
      // Projection light beam cone
      cone([0, 0.44, 0.06], [0.36, 0.5, 0.36], 0xf0f8ff, [Math.PI / 2, 0, 0]);
      // Stepped rows of plush red velvet theater seats
      for (const sz of [0.02, 0.16]) {
        for (const sx of [-0.26, 0.0, 0.26]) {
          b([sx, 0.08 + (sz > 0.1 ? 0.04 : 0), sz], [0.2, 0.12, 0.1], 0xb82626);
        }
      }
      return true;
    }

    // =========================================================================
    // ☕ Island 08: family (生活駭客與日常系統島)
    // =========================================================================
    case "zenGarden": {
      // Japanese Zen rock garden, raked sand, cedar tea pavilion & sundial
      b([0, 0.04, 0], [0.98, 0.06, 0.88], 0xf2ece1); // raked sand base
      // Concentric ripple rings around moss stones
      ring([0.15, 0.075, 0.1], 0.22, 0xe0d4c2, [0, 0, 0]);
      ring([0.15, 0.075, 0.1], 0.32, 0xe0d4c2, [0, 0, 0]);
      ico([0.15, 0.12, 0.1], 0.14, 0x6a8c54); // moss stone
      ico([0.28, 0.1, 0.02], 0.1, 0x7a7772);
      ico([0.05, 0.09, 0.18], 0.09, 0x7a7772);
      // Minimalist Japanese cedar tea pavilion (chashitsu)
      b([-0.22, 0.18, -0.12], [0.46, 0.28, 0.42], 0xd8caa8);
      p("hip", [-0.22, 0.34, -0.12], [0.52, 0.14, 0.48], 0x6e4735); // hip roof
      // Brass compass sundial
      cy([0.22, 0.12, 0.26], 0.14, 0.08, 0xcaa24a);
      hb([0.22, 0.18, 0.26], [0.015, 0.08, 0.04], 0x1f1d1d, [0.3, 0, 0]); // gnomon
      return true;
    }
    case "habitMatrix": {
      // 3D GitHub-style green habit contribution matrix wall & streak flame
      b([0, 0.4, -0.05], [0.96, 0.68, 0.12], 0x181c20); // dark monolith wall
      // 5x7 grid of 3D cubes with GitHub green shades
      const greens = [0x243328, 0x39d353, 0x26a641, 0x006d32, 0x39d353, 0x26a641, 0x006d32];
      for (let row = 0; row < 5; row++) {
        for (let col = 0; col < 7; col++) {
          const c = greens[(row * 3 + col * 2 + 1) % greens.length];
          b([-0.36 + col * 0.12, 0.16 + row * 0.11, 0.02], [0.09, 0.08, 0.04], c);
        }
      }
      // Sculpted streak flame emblem at top
      cone([0.36, 0.78, 0.02], [0.12, 0.18, 0.12], 0xff7a26);
      bulb([0.36, 0.74, 0.02], 0.06, 0xffbe3b);
      // Dashboard dial
      ring([-0.32, 0.76, 0.02], 0.08, 0x38bdf8, [0, 0, 0]);
      return true;
    }
    case "makerLab": {
      // Weekend Project maker garage, 3D printer gantry & workbench
      b([-0.1, 0.24, -0.05], [0.75, 0.42, 0.48], 0xe8e2d8);
      b([-0.1, 0.26, 0.192], [0.65, 0.32, 0.015], glass); // glass garage wall
      // 3D printer gantry sculpture
      b([0.28, 0.22, 0.18], [0.32, 0.36, 0.26], 0xe26d2d); // orange frame
      b([0.28, 0.2, 0.18], [0.26, 0.02, 0.22], 0x222224); // build plate
      bulb([0.28, 0.26, 0.18], 0.06, 0x38bdf8); // glowing print head
      // Workbench with dual monitors
      desk(-0.15, -0.08);
      screen(-0.25, -0.08);
      screen(-0.05, -0.08);
      return true;
    }
    case "coffeeStudio": {
      // Timber & glass pour-over cafe, giant V60 dripper, gooseneck kettle & steam
      b([-0.15, 0.22, -0.05], [0.56, 0.38, 0.44], 0xd9c2a7);
      b([-0.15, 0.24, 0.172], [0.46, 0.28, 0.015], glass);
      // Giant V60 Dripper monument on pedestal
      cy([0.26, 0.12, 0.18], 0.22, 0.16, 0x3d352e); // wooden stand
      cone([0.26, 0.32, 0.18], [0.26, 0.22, 0.26], 0xffffff, [Math.PI, 0, 0]); // V60 white cone
      cy([0.26, 0.22, 0.18], 0.16, 0.12, 0x86a8a6); // glass server carafe
      // Gooseneck kettle
      cy([0.1, 0.28, 0.18], 0.09, 0.15, 0x4a4744);
      // Rising aroma steam spheres
      sphere([0.26, 0.44, 0.18], 0.05, 0xffffff);
      sphere([0.28, 0.52, 0.2], 0.04, 0xffffff);
      return true;
    }

    // =========================================================================
    // 🏛️ Island 01: civil (核心中樞島 · Obsidian Vault)
    // =========================================================================
    case "obsidianCitadel": {
      // Obsidian Amethyst Crystal Temple, floating neural graph nodes & headquarters
      b([0, 0.08, 0], [1.06, 0.14, 0.84], 0x3a3545); // dark obsidian podium
      // Symmetric Modernist wings
      b([-0.32, 0.28, 0.02], [0.36, 0.42, 0.5], 0xf0eaf5);
      b([0.32, 0.28, 0.02], [0.36, 0.42, 0.5], 0xf0eaf5);
      // Center Towering Faceted Purple Obsidian Crystal
      cone6([0, 0.65, 0], [0.42, 1.05, 0.42], 0x6b3fa0); // deep amethyst body
      cone6([0, 1.15, 0], [0.26, 0.45, 0.26], 0xb388eb); // bright crystal crown
      // Floating neural knowledge-graph nodes & link bars
      const nodes = [
        [-0.26, 0.72, 0.18, 0xb388eb],
        [0.26, 0.76, 0.18, 0x8a56c8],
        [-0.18, 0.95, -0.15, 0x38bdf8],
        [0.18, 0.98, -0.15, 0xb388eb],
      ];
      for (const [nx, ny, nz, nc] of nodes) {
        bulb([nx, ny, nz], 0.07, nc);
        hb([nx * 0.5, ny * 0.85, nz * 0.5], [0.015, ny * 0.3, 0.015], 0xb388eb);
      }
      return true;
    }
    case "cicdPipeline": {
      // 3-stage automated CI/CD pipeline, launch pad & deployment rocket
      // 3 stage cylinders (typecheck -> check -> build)
      const stages = [-0.35, -0.1, 0.15];
      for (let k = 0; k < 3; k++) {
        cy([stages[k], 0.14, 0.18], 0.13, 0.18, 0x44a340);
        bulb([stages[k], 0.24, 0.18], 0.05, 0x8ff59e); // glowing green status LED
      }
      // Glowing connecting pipeline
      hb([-0.1, 0.14, 0.18], [0.55, 0.035, 0.035], 0x38bdf8);
      // Launch pad & gantry tower
      cy([0.26, 0.08, -0.15], 0.38, 0.12, 0x3d3a42);
      b([0.42, 0.45, -0.15], [0.1, 0.85, 0.1], 0xe26d2d); // gantry truss
      // Deployment Rocket
      cy([0.26, 0.45, -0.15], 0.14, 0.6, 0xffffff);
      cone([0.26, 0.82, -0.15], [0.15, 0.24, 0.15], 0xe26d2d); // nose cone
      ring([0.26, 0.55, -0.15], 0.15, 0x38bdf8, [0, 0, 0]); // glowing stage ring
      return true;
    }
    case "qualityGate": {
      // Golden shield archway, laser scan bar & protected note vault
      b([0, 0.38, 0], [0.76, 0.68, 0.18], 0x2e6b68); // gateway portal
      b([0, 0.22, 0], [0.42, 0.42, 0.22], 0xf6efe6); // arch opening
      // Large sculpted golden shield emblem
      b([0, 0.52, 0.1], [0.34, 0.4, 0.05], 0xe8c547);
      ico([0, 0.52, 0.13], 0.1, 0x6b3fa0); // central obsidian jewel
      // Scanning laser bar
      glow([0, 0.26, 0.1], [0.48, 0.02, 0.02], 0x00e5ff);
      // Roof inspection dish
      dome([0, 0.76, 0], [0.18, 0.1, 0.18], 0x3d3a42);
      return true;
    }

    // =========================================================================
    // 🧪 Island 02: institute (開源造物島 · Side Projects 實驗室)
    // =========================================================================
    case "geoMapDome": {
      // Geodesic dome, 3D relief contour terrain table & glowing GPX track
      dome([0, 0.38, -0.05], [0.84, 0.74, 0.84], 0x86a8a6); // translucent dome
      cy([0, 0.14, -0.05], 0.62, 0.2, 0x2b2927); // round exhibition table
      // Stepped relief mountain model on table
      cone6([0, 0.28, -0.05], [0.46, 0.25, 0.46], 0x4d7c58);
      cone6([0, 0.38, -0.05], [0.28, 0.18, 0.28], 0x8a8680);
      cone6([0, 0.45, -0.05], [0.14, 0.12, 0.14], 0xffffff); // snow summit
      // Glowing neon orange GPX track ribbon
      ring([0, 0.32, -0.05], 0.34, 0xe26d2d, [0.3, 0.2, 0]);
      bulb([0.15, 0.36, 0.05], 0.04, 0xfce88b); // GPX waypoint pin
      return true;
    }
    case "tuiTerminal": {
      // Retro CRT TUI terminal monolith, glowing phosphor screen & RSS radio mast
      b([-0.1, 0.38, -0.05], [0.65, 0.68, 0.36], 0x1e242b); // terminal casing
      glow([-0.1, 0.42, 0.135], [0.52, 0.42, 0.015], 0x2ebd60); // phosphor green screen
      // CRT scanline frame
      b([-0.1, 0.42, 0.14], [0.54, 0.02, 0.01], 0x3d444d);
      // RSS Transmission Mast
      cy([0.32, 0.48, 0.15], 0.04, 0.9, 0xd4a459);
      for (let k = 0; k < 3; k++) {
        ring([0.32, 0.72 + k * 0.1, 0.15], 0.1 + k * 0.06, 0xe26d2d, [0, 0, 0]);
      }
      return true;
    }
    case "kanbanWall": {
      // 3D 3-column Kanban board monument with floating colorful task cards
      b([0, 0.4, 0], [0.96, 0.68, 0.1], 0x282c34); // board frame
      // Column 1: To Do (coral)
      b([-0.3, 0.66, 0.055], [0.26, 0.06, 0.02], 0xe26d2d);
      b([-0.3, 0.52, 0.06], [0.24, 0.12, 0.02], 0xfff8ec);
      b([-0.3, 0.36, 0.06], [0.24, 0.12, 0.02], 0xfff8ec);
      // Column 2: In Progress (teal)
      b([0, 0.66, 0.055], [0.26, 0.06, 0.02], 0x2e6b68);
      b([0, 0.48, 0.06], [0.24, 0.14, 0.02], 0xfff8ec);
      bulb([0.08, 0.48, 0.08], 0.04, 0xfce88b); // weather badge
      // Column 3: Done (green)
      b([0.3, 0.66, 0.055], [0.26, 0.06, 0.02], 0x44a340);
      b([0.3, 0.52, 0.06], [0.24, 0.12, 0.02], 0xfff8ec);
      b([0.3, 0.36, 0.06], [0.24, 0.12, 0.02], 0xfff8ec);
      b([0.3, 0.2, 0.06], [0.24, 0.12, 0.02], 0xfff8ec);
      return true;
    }
    case "albumPrism": {
      // Optical triangular prism pavilion, rainbow spectrum beam & photo frames
      prism([0, 0.38, -0.08], [0.62, 0.68, 0.55], 0x86a8a6); // glass prism
      // Refracted rainbow light beam
      const rainbow = [0xd93829, 0xf2c94c, 0x44a340, 0x38bdf8, 0x7a5ea8];
      for (let k = 0; k < 5; k++) {
        hb([0.18 + k * 0.05, 0.38, 0.08], [0.03, 0.55, 0.015], rainbow[k], [0, 0.4, 0]);
      }
      // Staggered gallery picture frames
      b([-0.28, 0.22, 0.22], [0.22, 0.28, 0.03], 0x3d3a42);
      b([-0.28, 0.22, 0.238], [0.18, 0.24, 0.01], 0xe26d2d); // sunset photo
      b([0.28, 0.24, 0.22], [0.26, 0.2, 0.03], 0x3d3a42);
      b([0.28, 0.24, 0.238], [0.22, 0.16, 0.01], 0x4fa4b8); // ocean photo
      return true;
    }

    // =========================================================================
    // ⚙️ Island 09: youth (雲原生與全端架構島)
    // =========================================================================
    case "dockerStack": {
      // Marine ship deck with stacked Docker blue/teal shipping containers & crane
      b([0, 0.06, 0], [1.02, 0.1, 0.84], 0x3d444d); // cargo deck
      // Stacked shipping containers
      b([-0.2, 0.18, -0.1], [0.46, 0.18, 0.22], 0x2496ed); // Docker blue
      b([0.22, 0.18, -0.05], [0.46, 0.18, 0.22], 0x2e6b68); // Teal
      b([-0.06, 0.35, -0.08], [0.48, 0.18, 0.22], 0x0db7ed); // Cyan
      b([0.18, 0.35, 0.16], [0.42, 0.18, 0.2], 0xe26d2d); // Orange
      b([-0.12, 0.52, 0.05], [0.44, 0.18, 0.2], 0x38bdf8); // Light blue top
      // Container hoisting crane
      b([0.42, 0.42, -0.22], [0.08, 0.75, 0.08], 0xfce88b);
      b([0.28, 0.78, -0.22], [0.38, 0.06, 0.06], 0xfce88b);
      return true;
    }
    case "apiGateway": {
      // Cyber neon twin-pillar gateway with streaming multi-language data nodes
      b([-0.32, 0.42, 0], [0.16, 0.82, 0.22], 0x1e242b); // left pillar
      b([0.32, 0.42, 0], [0.16, 0.82, 0.22], 0x1e242b); // right pillar
      glow([0, 0.76, 0], [0.55, 0.1, 0.18], 0x00e5ff); // neon header
      // Data packets streaming through the portal: Go, Java, TypeScript
      bulb([-0.14, 0.42, 0], 0.09, 0x00acd7); // Go cyan
      bulb([0, 0.45, 0], 0.09, 0xe76f51); // Java orange-red
      bulb([0.14, 0.42, 0], 0.09, 0x3178c6); // TS blue
      // Glowing stream rail
      glow([0, 0.22, 0], [0.72, 0.02, 0.02], 0x00e5ff);
      return true;
    }
    case "serverCluster": {
      // 3 Stacked database drum cylinders & server racks with LED indicators
      cy([-0.2, 0.28, -0.08], 0.34, 0.54, 0x2e6b68);
      ring([-0.2, 0.28, -0.08], 0.36, 0x00e5ff, [0, 0, 0]); // glowing cyan data ring
      cy([0.18, 0.35, -0.12], 0.36, 0.66, 0x235250);
      ring([0.18, 0.35, -0.12], 0.38, 0x00e5ff, [0, 0, 0]);
      cy([0.05, 0.22, 0.2], 0.28, 0.4, 0x38bdf8);
      ring([0.05, 0.22, 0.2], 0.3, 0xffffff, [0, 0, 0]);
      // Security firewall shield in foreground
      b([-0.28, 0.18, 0.22], [0.24, 0.3, 0.04], 0x3d3a42);
      ico([-0.28, 0.22, 0.25], 0.08, 0x44a340);
      return true;
    }

    // =========================================================================
    // ⚙️ Island 10: education (演算法與專案工坊島)
    // =========================================================================
    case "projectWorkshop": {
      // Industrial red-brick agile studio, sawtooth roof & code kanban
      b([-0.1, 0.26, -0.05], [0.74, 0.46, 0.48], 0xa6523f); // brick studio
      // Sawtooth glass skylights
      for (const sx of [-0.3, -0.1, 0.1]) {
        prism([sx, 0.54, -0.05], [0.18, 0.16, 0.46], 0x86a8a6, [0, 0, Math.PI / 2]);
      }
      // Standing dev desk with dual screens
      desk(0.24, 0.2);
      screen(0.18, 0.2);
      screen(0.3, 0.2);
      // Sprint burndown chart whiteboard
      b([-0.28, 0.18, 0.24], [0.26, 0.22, 0.02], 0xffffff);
      hb([-0.28, 0.18, 0.252], [0.22, 0.02, 0.005], 0xd93829);
      return true;
    }
    case "algoTree": {
      // 3D Binary Tree / Graph network sculpture with glowing nodes & cyber links
      cy([0, 0.06, 0], 0.82, 0.1, 0x3d3a42); // stone plinth
      // Root node at top
      bulb([0, 0.85, 0], 0.13, 0xfce88b);
      // Child nodes
      bulb([-0.26, 0.58, 0], 0.1, 0x38bdf8);
      bulb([0.26, 0.58, 0], 0.1, 0xe26d2d);
      // Leaf nodes
      bulb([-0.4, 0.3, -0.06], 0.08, 0x44a340);
      bulb([-0.13, 0.3, 0.06], 0.08, 0x44a340);
      bulb([0.13, 0.3, -0.06], 0.08, 0x44a340);
      bulb([0.4, 0.3, 0.06], 0.08, 0x44a340);
      // Angled branch links
      cy([-0.13, 0.72, 0], 0.02, 0.32, 0xc8bca8, [0, 0, 0.5]);
      cy([0.13, 0.72, 0], 0.02, 0.32, 0xc8bca8, [0, 0, -0.5]);
      cy([-0.33, 0.44, -0.03], 0.016, 0.32, 0xc8bca8, [0, 0, 0.45]);
      cy([-0.2, 0.44, 0.03], 0.016, 0.32, 0xc8bca8, [0, 0, -0.45]);
      cy([0.2, 0.44, -0.03], 0.016, 0.32, 0xc8bca8, [0, 0, 0.45]);
      cy([0.33, 0.44, 0.03], 0.016, 0.32, 0xc8bca8, [0, 0, -0.45]);
      return true;
    }
    case "ragCube": {
      // 3x3 Rubik's Tensor Cube, AI neural core & embeddings pedestal
      cy([0, 0.1, 0], 0.58, 0.16, 0x222428); // dark neural pedestal
      ring([0, 0.12, 0], 0.62, 0x38bdf8, [0, 0, 0]); // glowing ring
      // 3x3 tensor cube facets
      const cubeColors = [0x7a5ea8, 0xe26d2d, 0x38bdf8, 0xfce88b, 0x44a340, 0xffffff];
      for (let ix = -1; ix <= 1; ix++) {
        for (let iy = -1; iy <= 1; iy++) {
          for (let iz = -1; iz <= 1; iz++) {
            if (ix === 0 && iy === 0 && iz === 0) continue;
            const cc = cubeColors[Math.abs(ix * 3 + iy * 2 + iz) % cubeColors.length];
            b([ix * 0.14, 0.45 + iy * 0.14, iz * 0.14], [0.12, 0.12, 0.12], cc);
          }
        }
      }
      bulb([0, 0.45, 0], 0.1, 0x00e5ff); // glowing neural core
      return true;
    }
    case "codeForge": {
      // Refactoring forge furnace, anvil & conveyor of golden packages
      b([-0.22, 0.28, -0.08], [0.42, 0.52, 0.38], 0x2e2d30); // stone furnace
      bulb([-0.22, 0.22, 0.1], 0.09, 0xff7a26); // furnace flame
      // Anvil on timber block
      cy([0.18, 0.1, 0.1], 0.16, 0.16, 0x6e523e);
      b([0.18, 0.22, 0.1], [0.28, 0.1, 0.14], 0x5a585e); // anvil horn
      // Conveyor belt with golden packages
      b([0.02, 0.08, 0.26], [0.68, 0.06, 0.14], 0x222224);
      b([-0.18, 0.14, 0.26], [0.1, 0.08, 0.1], 0xe8c547);
      b([0.05, 0.14, 0.26], [0.1, 0.08, 0.1], 0xe8c547);
      b([0.22, 0.14, 0.26], [0.1, 0.08, 0.1], 0xe8c547);
      return true;
    }

    // =========================================================================
    // ⚙️ Island 11: transport (極客工具與 HomeLab 島)
    // =========================================================================
    case "homelabRig": {
      // 42U Server rack cabinet, triple-monitor battlestation & NAS tower
      b([-0.2, 0.45, -0.08], [0.38, 0.85, 0.38], 0x1a1c20); // 42U rack
      b([-0.2, 0.45, 0.112], [0.32, 0.78, 0.015], glass);
      // Blinking LEDs
      for (let k = 0; k < 6; k++) {
        bulb([-0.3 + (k % 2) * 0.08, 0.2 + k * 0.1, 0.115], 0.02, k % 2 ? 0x44a340 : 0x38bdf8);
      }
      // Triple monitor battlestation desk
      desk(0.2, 0.15);
      b([0.2, 0.46, 0.15], [0.26, 0.16, 0.03], 0x1e242b); // center monitor
      b([0.06, 0.46, 0.17], [0.22, 0.16, 0.03], 0x1e242b, [0, 0.3, 0]); // left angled
      b([0.34, 0.46, 0.17], [0.22, 0.16, 0.03], 0x1e242b, [0, -0.3, 0]); // right angled
      // NAS tower
      b([0.38, 0.14, -0.15], [0.14, 0.22, 0.18], 0x2d3139);
      return true;
    }
    case "mechKeyboard": {
      // Giant custom mechanical keyboard sculpture & glowing CLI screen
      b([0, 0.16, 0.08], [0.94, 0.14, 0.54], 0x2d3139, [0.18, 0, 0]); // angled chassis
      // 3D keycaps: Esc coral, Enter teal, Alphas cream
      b([-0.36, 0.25, -0.08], [0.08, 0.06, 0.08], 0xe26d2d, [0.18, 0, 0]); // ESC
      b([0.34, 0.2, 0.14], [0.12, 0.06, 0.08], 0x2e6b68, [0.18, 0, 0]); // ENTER
      b([0, 0.18, 0.26], [0.38, 0.05, 0.08], 0x2e6b68, [0.18, 0, 0]); // SPACE
      // Keycap matrix
      for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 6; c++) {
          b([-0.26 + c * 0.1, 0.23 - r * 0.03, -0.04 + r * 0.1], [0.07, 0.05, 0.07], 0xfffdfb, [0.18, 0, 0]);
        }
      }
      // Glowing CLI screen display at back
      glow([0, 0.48, -0.22], [0.74, 0.34, 0.03], 0x1e242b);
      hb([0, 0.48, -0.2], [0.65, 0.03, 0.005], 0xfcea8b); // amber prompt line
      return true;
    }
    case "gitSwitchyard": {
      // Branching & merging railway switchyard tracks with commit nodes & Linux penguin
      b([0, 0.04, 0], [0.98, 0.06, 0.86], 0x6e6862); // switchyard ground
      // Branching tracks
      b([-0.3, 0.07, 0], [0.1, 0.02, 0.78], 0x3d3a42); // main line
      b([0.1, 0.07, 0], [0.1, 0.02, 0.78], 0x3d3a42); // feat branch
      // Glowing commit nodes
      bulb([-0.3, 0.12, -0.22], 0.06, 0x44a340); // main commit
      bulb([-0.3, 0.12, 0.0], 0.06, 0x44a340);
      bulb([-0.3, 0.12, 0.22], 0.06, 0x44a340);
      bulb([0.1, 0.12, -0.1], 0.06, 0xe26d2d); // feat commit
      bulb([0.1, 0.12, 0.1], 0.06, 0xe26d2d);
      // Switch signal tower
      cy([0.34, 0.35, 0.1], 0.04, 0.65, 0x222224);
      bulb([0.34, 0.68, 0.1], 0.06, 0x44a340); // green signal
      return true;
    }
    case "macStudio": {
      // Aluminum Mac Studio cube, Pro Display XDR & OpenCore motherboard circuit
      b([0, 0.04, 0], [0.96, 0.06, 0.86], 0x1f2428); // motherboard circuit plinth
      // Gold tracing lines
      hb([0, 0.072, 0], [0.82, 0.005, 0.02], 0xe8c547);
      hb([0, 0.072, 0], [0.02, 0.005, 0.72], 0xe8c547);
      // Silver Aluminum Mac Studio cube
      b([-0.18, 0.18, 0.12], [0.34, 0.22, 0.34], 0xd8dad9);
      hb([-0.18, 0.18, 0.292], [0.05, 0.05, 0.005], 0x1a1c20); // Apple logo
      // Pro Display XDR on silver stand
      cy([-0.05, 0.28, -0.15], 0.025, 0.44, 0xd8dad9);
      b([-0.05, 0.48, -0.14], [0.64, 0.38, 0.03], 0x1a1c20); // display glass
      glow([-0.05, 0.48, -0.122], [0.6, 0.34, 0.008], 0x38bdf8); // macOS wallpaper glow
      return true;
    }

    // =========================================================================
    // 🎞️ Island 12: hakka (光影畫廊島 · Photo Album)
    // =========================================================================
    case "cameraPavilion": {
      // Vintage SLR/Rangefinder Camera building, multi-ring lens & red shutter button
      b([0, 0.24, 0], [0.84, 0.38, 0.46], 0x232225); // black leatherette body
      b([0, 0.45, 0], [0.86, 0.08, 0.48], 0xd8dad9); // silver top plate
      // Large protruding multi-ring camera lens barrel
      cy([0, 0.24, 0.28], 0.28, 0.18, 0x1a1c20);
      cy([0, 0.24, 0.34], 0.29, 0.03, 0xd8dad9); // silver aperture ring
      cy([0, 0.24, 0.37], 0.22, 0.02, 0x244259); // multi-coated glass element
      ring([0, 0.24, 0.37], 0.24, 0x7a5ea8, [0, 0, 0]); // purple anti-reflective flare
      // Red shutter release button on top
      cy([0.26, 0.52, 0.08], 0.06, 0.08, 0xd93829);
      // Silver rangefinder window
      b([-0.24, 0.45, 0.245], [0.1, 0.05, 0.015], 0x86a8a6);
      return true;
    }
    case "photoWall": {
      // Pinterest responsive masonry gallery partition walls & illuminated frames
      b([-0.18, 0.32, -0.1], [0.55, 0.58, 0.06], 0xf4eee4);
      b([0.18, 0.32, 0.1], [0.55, 0.58, 0.06], 0xf4eee4);
      // Staggered gallery picture frames with landscape photos
      const photos = [
        [-0.32, 0.44, -0.06, 0xd94a2b], // sunset
        [-0.1, 0.28, -0.06, 0x4fa4b8], // sea
        [-0.1, 0.48, -0.06, 0x4d8b55], // mountain
        [0.1, 0.42, 0.14, 0x7a5ea8], // night sky
        [0.32, 0.3, 0.14, 0xe8c547], // gold field
        [0.32, 0.5, 0.14, 0x38bdf8], // alpine lake
      ];
      for (const [px, py, pz, pc] of photos) {
        b([px, py, pz], [0.18, 0.15, 0.02], 0x1f1d1d); // frame
        hb([px, py, pz + 0.012], [0.15, 0.12, 0.005], pc); // photo
      }
      return true;
    }
    case "filmArch": {
      // 35mm film strip archway & 2004-2026 timeline milestone pillars
      ring([0, 0.38, 0], 0.45, 0x1f1d1d, [0, 0, 0]); // film arch
      ring([0, 0.38, 0], 0.48, 0xd9aa58, [0, 0, 0]); // amber border
      // 5 chronological timeline pillars (2004, 2010, 2015, 2020, 2026)
      const milestones = [-0.36, -0.18, 0.0, 0.18, 0.36];
      for (let k = 0; k < 5; k++) {
        b([milestones[k], 0.12 + k * 0.04, 0.26], [0.08, 0.2 + k * 0.08, 0.08], 0xd9b382);
        bulb([milestones[k], 0.24 + k * 0.08, 0.26], 0.03, 0xfce88b);
      }
      return true;
    }
    case "lightStudio": {
      // Golden Hour beacon overlook tower & traditional photo darkroom
      cone6([0, 0.48, -0.06], [0.44, 0.9, 0.44], 0xd9b382); // stone tower
      cy([0, 0.88, -0.06], 0.22, 0.06, 0x3d3a42); // gallery
      bulb([0, 0.94, -0.06], 0.16, 0xffaa26); // Golden Hour glowing beacon
      // Darkroom studio cabin with red safelight window
      b([-0.25, 0.16, 0.22], [0.38, 0.26, 0.32], 0x4a3d35);
      glow([-0.25, 0.18, 0.385], [0.1, 0.1, 0.01], 0xd93829); // red darkroom safelight
      return true;
    }

    // =========================================================================
    // 🎞️ Island 13: welfare (歲月長河島 · Life Blog)
    // =========================================================================
    case "hourglassStele": {
      // 2008-2026 Glass Hourglass monument & Annual Review granite stele
      // Monumental glass hourglass
      cy([0.18, 0.06, 0.1], 0.28, 0.06, 0x6e4735); // base
      cy([0.18, 0.58, 0.1], 0.28, 0.06, 0x6e4735); // top
      cone([0.18, 0.46, 0.1], [0.24, 0.18, 0.24], 0xb8ecff, [Math.PI, 0, 0]); // upper glass
      cone([0.18, 0.18, 0.1], [0.24, 0.18, 0.24], 0xb8ecff); // lower glass
      cone([0.18, 0.14, 0.1], [0.18, 0.08, 0.18], 0xfce88b); // sand pile
      // Annual Review engraved granite stele
      b([-0.22, 0.4, -0.05], [0.38, 0.74, 0.14], 0x3d3a42);
      for (let k = 0; k < 6; k++) {
        hb([-0.22, 0.2 + k * 0.09, 0.025], [0.26, 0.02, 0.005], 0xe8d5bb);
      }
      return true;
    }
    case "timeRiver": {
      // Now or Never river of time, vermilion arched bridge & weeping willows
      b([0, 0.03, 0], [0.98, 0.04, 0.44], 0x6ab4c9); // river
      // Vermilion arched wooden footbridge
      b([0.05, 0.18, 0], [0.26, 0.04, 0.52], 0xd93829);
      hb([0.05 - 0.13, 0.25, 0], [0.015, 0.09, 0.52], 0xd93829);
      hb([0.05 + 0.13, 0.25, 0], [0.015, 0.09, 0.52], 0xd93829);
      // Weeping willow trees along bank
      sphere([-0.32, 0.28, -0.2], 0.24, 0x9cc27a);
      sphere([0.35, 0.28, 0.22], 0.22, 0x9cc27a);
      // Signpost: Now or Never
      cy([-0.22, 0.16, 0.26], 0.02, 0.26, 0x6e523e);
      b([-0.22, 0.28, 0.26], [0.16, 0.08, 0.03], 0xcaa24a);
      return true;
    }
    case "woodsCabin": {
      // Shan-li mountain log cabin, stone chimney with smoke & tall conifers
      b([-0.05, 0.2, 0], [0.56, 0.36, 0.46], 0x8a5a3a); // cedar log cabin
      prism([-0.05, 0.44, 0], [0.62, 0.2, 0.5], 0x5c3a24, [0, 0, Math.PI / 2]); // shingle roof
      // Stone fireplace chimney
      b([0.22, 0.32, 0.05], [0.14, 0.55, 0.14], 0x6e6a64);
      sphere([0.22, 0.64, 0.05], 0.06, 0xffffff); // smoke puff
      sphere([0.24, 0.72, 0.07], 0.05, 0xffffff);
      // Warm glowing windows
      bulb([-0.05, 0.2, 0.235], 0.06, 0xfce88b);
      // Surrounding conifers
      cone6([-0.36, 0.3, -0.2], [0.28, 0.52, 0.28], 0x3d6647);
      cone6([0.35, 0.26, -0.2], [0.24, 0.44, 0.24], 0x3d6647);
      return true;
    }
    case "journalMonument": {
      // 500,000-word fountain pen nib monument & night-train cafe car
      // Giant golden fountain pen nib
      prism([-0.18, 0.36, -0.05], [0.22, 0.62, 0.14], 0xe8c547);
      b([-0.18, 0.12, -0.05], [0.16, 0.16, 0.12], 0x1f1d1d); // black grip
      // Writing scroll parchment
      b([-0.18, 0.05, 0.14], [0.34, 0.02, 0.26], 0xfff8ec);
      // Vintage dark green night-train carriage cafe
      b([0.2, 0.18, 0.12], [0.46, 0.22, 0.2], 0x224b38);
      b([0.2, 0.28, 0.12], [0.48, 0.03, 0.22], 0x1f1d1d); // roof
      glow([0.2, 0.18, 0.225], [0.38, 0.1, 0.01], 0xfcea8b); // lit carriage windows
      return true;
    }

    // =========================================================================
    // 🎞️ Island 14: lunch (技術情報與衝浪島 · News Log)
    // =========================================================================
    case "radarTower": {
      // Tech radar dish communications tower & intelligence bunker
      cy([0, 0.42, -0.08], 0.1, 0.8, 0x4a525d); // lattice mast
      dome([0, 0.78, -0.08], [0.44, 0.18, 0.44], 0xf4f1ea, [0.4, 0, 0]); // tilted parabolic dish
      cone([0, 0.86, -0.02], [0.08, 0.14, 0.08], 0xe26d2d); // feed horn
      ring([0, 0.88, 0.05], 0.22, 0x00e5ff, [0.4, 0, 0]); // signal waves
      // Hexagonal operations station
      cone6([0, 0.14, -0.08], [0.54, 0.24, 0.54], 0x2e6b68);
      return true;
    }
    case "surfWave": {
      // Sculpted curling ocean wave sculpture with yellow surfboard & website milestone
      // Breaking ocean wave curl
      cy([0, 0.28, 0], 0.52, 0.5, 0x24627d); // deep ocean base
      dome([0, 0.44, 0], [0.48, 0.36, 0.48], 0x48bfe3); // translucent turquoise curl
      // White sea foam crest & spray
      sphere([0.15, 0.58, 0.15], 0.14, 0xffffff);
      sphere([-0.1, 0.56, 0.2], 0.12, 0xffffff);
      sphere([0.26, 0.62, 0.1], 0.08, 0xffffff);
      // Aerodynamic yellow surfboard riding the wave
      b([0.1, 0.46, 0.24], [0.26, 0.03, 0.1], 0xfce88b, [0.4, 0.3, -0.3]);
      // Site redesign milestone monument
      b([-0.28, 0.14, 0.26], [0.22, 0.24, 0.08], 0x3d3a42);
      return true;
    }
    case "calcPavilion": {
      // Retro scientific calculator pad, LCD screen & wooden abacus pavilion
      b([-0.12, 0.18, 0.05], [0.48, 0.16, 0.58], 0x2c3038, [0.18, 0, 0]); // chassis
      glow([-0.12, 0.25, -0.15], [0.38, 0.08, 0.02], 0x86c29d); // LCD screen
      // 3D keypads
      for (let r = 0; r < 4; r++) {
        for (let c = 0; c < 3; c++) {
          b([-0.24 + c * 0.12, 0.23 - r * 0.03, -0.02 + r * 0.11], [0.08, 0.04, 0.07], [0x38bdf8, 0xe26d2d, 0xf6efe6][(r + c) % 3], [0.18, 0, 0]);
        }
      }
      // Wooden abacus pavilion
      b([0.28, 0.24, 0.15], [0.28, 0.38, 0.18], 0x7a4c32);
      for (let k = 0; k < 3; k++) cy([0.28, 0.15 + k * 0.08, 0.15], 0.04, 0.14, 0xcaa24a); // beads
      return true;
    }
    case "cloudUplink": {
      // Floating stylized cloud platform, glowing uplink beam & satellite dish
      // Cloud platform (overlapping white spheres)
      sphere([-0.12, 0.36, -0.05], 0.24, 0xffffff);
      sphere([0.12, 0.38, -0.05], 0.26, 0xffffff);
      sphere([0, 0.44, -0.05], 0.28, 0xffffff);
      sphere([0.22, 0.34, 0.08], 0.2, 0xf0f7ff);
      sphere([-0.2, 0.34, 0.08], 0.2, 0xf0f7ff);
      // Glowing vertical uplink beam
      glow([0, 0.22, 0], [0.08, 0.44, 0.08], 0x00e5ff);
      // Satellite antenna on cloud
      cy([0, 0.62, -0.05], 0.03, 0.28, 0xd8dad9);
      dome([0, 0.74, -0.05], [0.2, 0.08, 0.2], 0xffffff, [0.5, 0, 0]);
      // Ground laptop terminal
      b([0, 0.06, 0.26], [0.22, 0.02, 0.16], 0x222224);
      b([0, 0.14, 0.2], [0.22, 0.14, 0.015], 0x38bdf8, [0.3, 0, 0]);
      return true;
    }

    // =========================================================================
    // Legacy & Existing Visual Models (Fallbacks & Shared Modules)
    // =========================================================================
    case "cityhall": {
      b([0, 0.05, 0.02], [1.08, 0.1, 0.66], stone); // podium
      for (const s of [-1, 1]) b([s * 0.33, 0.32, -0.02], [0.4, 0.44, 0.5], warm); // wings
      b([0, 0.36, 0.0], [0.3, 0.52, 0.54], 0xf1e6d3); // centre block
      for (const s of [-1, 1]) {
        glow([s * 0.33, 0.33, 0.235], [0.34, 0.34, 0.012], 0x9fc4c6);
        for (let k = 0; k < 4; k++) hb([s * 0.33 - 0.15 + k * 0.1, 0.33, 0.243], [0.01, 0.34, 0.01], 0x6f6a62);
        hb([s * 0.33, 0.33, 0.243], [0.34, 0.01, 0.01], 0x6f6a62);
      }
      b([0, 0.27, 0.31], [0.34, 0.03, 0.14], C.coral);
      for (const s of [-0.12, -0.04, 0.04, 0.12]) cy([s, 0.17, 0.35], 0.03, 0.2, 0xf6efe3);
      glow([0, 0.15, 0.275], [0.12, 0.17, 0.01], 0xb8d3d1);
      for (const s of [-1, 1]) {
        b([s * 0.33, 0.56, -0.02], [0.43, 0.04, 0.53], 0xcfbfa6);
        for (let k = 0; k < 3; k++) plant(s * 0.33 - 0.12 + k * 0.12, -0.05 + (k % 2) * 0.1, 0.16);
      }
      b([0, 0.64, 0.0], [0.33, 0.04, 0.57], 0xcfbfa6);
      b([0, 0.68, 0.24], [0.26, 0.06, 0.03], C.ink);
      glow([0, 0.68, 0.258], [0.2, 0.025, 0.006], 0xfcea8b);
      for (let k = 0; k < 4; k++) ring([-0.42 + k * 0.06, 0.13, 0.4], 0.07, C.ink, [0, 0, 0]);
      for (const s of [-1, 1]) {
        b([s * 0.28, 0.13, 0.42], [0.12, 0.06, 0.06], 0xb79a7b);
        sphere([s * 0.28, 0.18, 0.42], [0.12, 0.08, 0.06], green);
      }
      return true;
    }
    case "clocktower": {
      b([0, 0.04, 0], [0.5, 0.08, 0.5], stone);
      b([0, 0.6, 0], [0.22, 1.1, 0.22], 0xf1e6d3);
      for (const s of [-1, 1]) hb([s * 0.112, 0.6, 0], [0.012, 1.1, 0.23], C.coral);
      b([0, 1.2, 0], [0.28, 0.1, 0.28], C.coral);
      for (const [dx, dz, ry] of [[0, 0.112, 0]]) {
        p("cylinder", [dx, 0.98, dz], [0.17, 0.02, 0.17], 0xfcea8b, [Math.PI / 2, ry, 0]);
        hb([dx * 1.08, 1.01, dz * 1.08], [0.012, 0.07, 0.012], C.ink);
        hb([dx * 1.08 + (ry ? 0 : 0.02), 0.98, dz * 1.08 + (ry ? 0.02 : 0)], ry ? [0.012, 0.012, 0.05] : [0.05, 0.012, 0.012], C.ink);
      }
      p("cone", [0, 1.38, 0], [0.24, 0.26, 0.24], 0xa34e34);
      bulb([0, 1.53, 0], 0.04);
      for (const s of [-1, 1]) {
        b([s * 0.34, 0.08, 0.1], [0.08, 0.04, 0.26], wood);
        b([s * 0.34, 0.04, 0.1], [0.06, 0.06, 0.22], C.ink);
      }
      return true;
    }
    case "kiosk": {
      b([0, 0.28, -0.05], [0.42, 0.56, 0.32], 0x7aa58f);
      glow([0, 0.36, 0.115], [0.3, 0.22, 0.01], 0xd8f0e2);
      for (let k = 0; k < 3; k++) sphere([-0.09 + k * 0.09, 0.36, 0.125], [0.05, 0.05, 0.01], [C.coral, 0xfcea8b, 0xffffff][k]);
      b([0, 0.13, 0.12], [0.3, 0.06, 0.02], C.ink);
      b([0, 0.6, -0.05], [0.46, 0.05, 0.36], C.ink);
      seat(0.28, 0.25);
      plant(-0.3, 0.25, 0.3);
      return true;
    }
    case "podium": {
      cy([0, 0.05, 0], 0.7, 0.1, stone);
      for (const [x, h] of [
        [-0.2, 0.12],
        [0, 0.2],
        [0.2, 0.08],
      ])
        b([x, 0.1 + h / 2, -0.05], [0.18, h, 0.18], x === 0 ? C.coral : 0xe8d5bb);
      cy([0, 0.38, -0.05], 0.025, 0.16, 0xcaa24a);
      p("cone", [0, 0.5, -0.05], [0.14, 0.12, 0.14], 0xe8c547, [Math.PI, 0, 0]);
      sphere([0, 0.56, -0.05], 0.05, 0xe8c547);
      for (const s of [-1, 1]) {
        cy([s * 0.3, 0.2, 0.2], 0.02, 0.4, C.ink);
        sphere([s * 0.3, 0.42, 0.2], 0.06, 0xfcea8b);
      }
      return true;
    }
    case "clinicpod": {
      b([0, 0.22, -0.06], [0.56, 0.44, 0.36], 0xf6f1ea);
      b([0, 0.46, -0.06], [0.6, 0.05, 0.4], 0x8fb3ad);
      glow([-0.13, 0.25, 0.125], [0.16, 0.16, 0.01], 0xcfe6e6);
      b([0.15, 0.16, 0.125], [0.12, 0.3, 0.01], 0x8fb3ad);
      b([0.15, 0.34, 0.13], [0.1, 0.03, 0.012], C.coral);
      b([0.15, 0.34, 0.13], [0.03, 0.1, 0.012], C.coral);
      seat(-0.28, 0.26);
      return true;
    }
    case "aipod": {
      cy([0, 0.04, 0], 0.58, 0.08, stone);
      cy([0, 0.22, 0], 0.46, 0.28, 0xf1e8dc);
      glow([0, 0.24, 0.22], [0.24, 0.14, 0.01], 0x00e5ff);
      cy([0, 0.4, 0], 0.5, 0.08, teal);
      p("cone", [0, 0.55, 0], [0.38, 0.22, 0.38], 0x2e6b68);
      bulb([0, 0.69, 0], 0.05, 0xfcea8b);
      return true;
    }
    case "researchdome": {
      b([0, 0.04, 0], [0.94, 0.08, 0.94], stone);
      p("dome", [0, 0.34, 0], [0.72, 0.54, 0.72], 0xb6d5d2);
      cy([0, 0.12, 0], 0.76, 0.14, 0xe8dfd0);
      cy([0, 0.18, 0], 0.34, 0.14, wood);
      for (let k = 0; k < 4; k++) {
        const a = (k / 4) * Math.PI * 2;
        seat(Math.cos(a) * 0.26, Math.sin(a) * 0.26);
      }
      return true;
    }
    case "admin": {
      b([-0.15, 0.22, -0.1], [0.2, 0.44, 0.26], 0x8a9aa6);
      for (let k = 0; k < 3; k++) hb([-0.15, 0.1 + k * 0.14, 0.035], [0.12, 0.012, 0.01], C.ink);
      b([0.15, 0.25, 0], [0.32, 0.04, 0.22], wood);
      for (const s of [-1, 1]) hb([0.15 + s * 0.13, 0.12, 0], [0.02, 0.24, 0.18], 0xd2c3ad);
      for (let k = 0; k < 3; k++) hb([0.08 + k * 0.01, 0.29 + k * 0.02, 0.02], [0.14, 0.015, 0.1], 0xffffff);
      cy([0.25, 0.3, 0.05], 0.05, 0.06, C.coral);
      seat(0.15, 0.25);
      return true;
    }
    case "childcenter": {
      b([0, 0.22, -0.05], [0.72, 0.44, 0.44], 0xf6efe6);
      p("hip", [0, 0.48, -0.05], [0.78, 0.16, 0.5], C.coral);
      for (let k = 0; k < 3; k++) {
        const cx = -0.22 + k * 0.22;
        glow([cx, 0.24, 0.175], [0.14, 0.18, 0.01], 0x9fc4c6);
      }
      return true;
    }
    case "rampcenter": {
      b([0, 0.22, -0.05], [0.65, 0.44, 0.45], 0xf0e6d6);
      b([-0.18, 0.06, 0.22], [0.32, 0.12, 0.22], 0xd2c3ad, [0.15, 0, 0]);
      return true;
    }
    case "loopgarden": {
      b([0, 0.04, 0], [0.88, 0.08, 0.88], 0xbccf9c);
      ring([0, 0.06, 0], 0.34, 0xdcb79a, [0, 0, 0]);
      plant(0, 0, 0.35);
      return true;
    }
    case "containers": {
      b([-0.15, 0.14, 0], [0.42, 0.22, 0.22], 0x2e6b68);
      b([0.18, 0.14, 0], [0.42, 0.22, 0.22], 0xe26d2d);
      return true;
    }
    case "jars": {
      cy([-0.16, 0.18, 0], 0.18, 0.32, 0xe8c547);
      cy([0.16, 0.18, 0], 0.18, 0.32, 0x3e7c8c);
      return true;
    }
    case "stage": {
      b([0, 0.08, 0], [0.85, 0.14, 0.65], wood);
      b([0, 0.42, -0.25], [0.85, 0.55, 0.06], 0x3d3a42);
      return true;
    }
    case "infinityforum": {
      ring([-0.18, 0.05, 0], 0.22, 0xdcb79a, [0, 0, 0]);
      ring([0.18, 0.05, 0], 0.22, 0xdcb79a, [0, 0, 0]);
      cy([0, 0.12, 0], 0.18, 0.1, wood);
      return true;
    }
    case "terminal": {
      b([0, 0.22, 0], [0.85, 0.44, 0.45], 0xf2ece1);
      b([0, 0.24, 0.23], [0.7, 0.28, 0.015], glass);
      return true;
    }
    case "democrossing": {
      b([0, 0.04, 0], [0.92, 0.06, 0.4], 0x3a393e);
      for (let k = 0; k < 5; k++) hb([-0.32 + k * 0.16, 0.075, 0], [0.08, 0.01, 0.28], 0xffffff);
      return true;
    }
    case "arrivals": {
      b([0, 0.25, 0], [0.82, 0.48, 0.4], 0x3e7c8c);
      glow([0, 0.26, 0.205], [0.65, 0.28, 0.01], 0xd8ecff);
      return true;
    }
    case "workplace": {
      b([0, 0.24, 0], [0.72, 0.46, 0.42], 0xf6efe6);
      desk(0, 0.1);
      return true;
    }
    case "stairlift": {
      b([0, 0.2, 0], [0.45, 0.4, 0.4], 0xd2c3ad);
      return true;
    }
    case "accessgym": {
      b([0, 0.24, 0], [0.78, 0.46, 0.44], 0x5f9aa6);
      return true;
    }
    case "hikeNorth": {
      prism([0, 0.28, 0], [0.55, 0.5, 0.45], wood, [0, 0, Math.PI / 2]);
      return true;
    }
    case "hikeEast": {
      ico([-0.15, 0.2, 0], 0.3, 0x7a7772);
      b([0.2, 0.2, 0], [0.35, 0.38, 0.32], 0xf2ece1);
      return true;
    }
    case "hikeSouth": {
      b([0, 0.18, 0], [0.55, 0.32, 0.42], wood);
      p("hip", [0, 0.38, 0], [0.62, 0.14, 0.48], 0xc9362b);
      return true;
    }
    case "culturecoin": {
      cy([0, 0.14, 0], 0.38, 0.22, 0xe8c547);
      ring([0, 0.14, 0], 0.4, 0xd4a459, [0, 0, 0]);
      return true;
    }
    case "bogongcare": {
      b([0, 0.2, 0], [0.68, 0.38, 0.42], 0xd9b382);
      p("hip", [0, 0.42, 0], [0.74, 0.14, 0.48], 0x3f5a8a);
      return true;
    }
    case "sisterschools": {
      b([-0.22, 0.22, 0], [0.36, 0.42, 0.34], 0xf2ece1);
      b([0.22, 0.22, 0], [0.36, 0.42, 0.34], 0xd9b382);
      return true;
    }
    case "hakkapoints": {
      b([0, 0.2, 0], [0.55, 0.38, 0.36], 0xf6efe6);
      b([0, 0.4, 0], [0.6, 0.05, 0.4], 0x3f5a8a);
      return true;
    }
    case "hiringdesk": {
      desk(0, 0);
      person(0, -0.15, 0.36);
      return true;
    }
    case "hakkaforum": {
      cy([0, 0.14, 0], 0.42, 0.04, wood);
      b([0, 0.5, 0], [0.72, 0.04, 0.4], 0x3f5a8a);
      return true;
    }
  }
  return false;
}
