// Additional policy miniatures (second visual pass). Symbolic, not architectural designs or locations.
// Each function receives the local helper set from scene-models.js and draws in unit space (~[-0.5,0.5] footprint).
export function extraModel(kind, h) {
  const { b, hb, cy, sphere, ring, p, glow, bulb, seat, person, plant, C, glass, wood, green } = h;
  const teal = 0x3e7c8c,
    teal2 = 0x5f9aa6,
    warm = 0xe9dcc4,
    stone = 0xd2c3ad,
    yel = 0xe8c547;
  switch (kind) {
    // ---------------- 市府核心 ----------------
    case "cityhall": {
      // wide, symmetric two-storey civic office with glass curtain wall and rooftop garden
      b([0, 0.05, 0.02], [1.08, 0.1, 0.66], stone); // podium
      for (const s of [-1, 1]) b([s * 0.33, 0.32, -0.02], [0.4, 0.44, 0.5], warm); // wings
      b([0, 0.36, 0.0], [0.3, 0.52, 0.54], 0xf1e6d3); // centre block
      // glass curtain on wings (front) with mullions
      for (const s of [-1, 1]) {
        glow([s * 0.33, 0.33, 0.235], [0.34, 0.34, 0.012], 0x9fc4c6);
        for (let k = 0; k < 4; k++) hb([s * 0.33 - 0.15 + k * 0.1, 0.33, 0.243], [0.01, 0.34, 0.01], 0x6f6a62);
        hb([s * 0.33, 0.33, 0.243], [0.34, 0.01, 0.01], 0x6f6a62);
      }
      // entrance canopy & columns
      b([0, 0.27, 0.31], [0.34, 0.03, 0.14], C.coral);
      for (const s of [-0.12, -0.04, 0.04, 0.12]) cy([s, 0.17, 0.35], 0.03, 0.2, 0xf6efe3);
      glow([0, 0.15, 0.275], [0.12, 0.17, 0.01], 0xb8d3d1);
      // roof slab, rooftop garden
      for (const s of [-1, 1]) {
        b([s * 0.33, 0.56, -0.02], [0.43, 0.04, 0.53], 0xcfbfa6);
        for (let k = 0; k < 3; k++) plant(s * 0.33 - 0.12 + k * 0.12, -0.05 + (k % 2) * 0.1, 0.16);
      }
      b([0, 0.64, 0.0], [0.33, 0.04, 0.57], 0xcfbfa6);
      // flagless roof sign band
      b([0, 0.68, 0.24], [0.26, 0.06, 0.03], C.ink);
      glow([0, 0.68, 0.258], [0.2, 0.025, 0.006], 0xfcea8b);
      // bike racks and planters in front of podium
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
      // benches with coffee cups around the plaza base
      for (const s of [-1, 1]) {
        b([s * 0.34, 0.08, 0.1], [0.08, 0.04, 0.26], wood);
        b([s * 0.34, 0.04, 0.1], [0.06, 0.06, 0.22], C.ink);
      }
      return true;
    }
    case "kiosk": {
      // EAP point kiosk — vending style booth
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
      // rounded work capsule with antenna and status light (no desk)
      p("rbox", [0, 0.24, -0.04], [0.5, 0.4, 0.38], 0x2f3a46);
      glow([0, 0.26, 0.152], [0.38, 0.2, 0.01], 0x9fd8e6);
      for (let k = 0; k < 4; k++) hb([-0.13 + k * 0.087, 0.26, 0.16], [0.006, 0.18, 0.006], 0x2f3a46);
      cy([0.16, 0.5, -0.1], 0.02, 0.14, C.ink);
      bulb([0.16, 0.58, -0.1], 0.05, 0x9fffd0);
      sphere([-0.12, 0.47, -0.08], [0.14, 0.06, 0.14], 0x58c4dd);
      for (const s of [-1, 1]) cy([s * 0.2, 0.03, 0.1], 0.06, 0.06, 0x58585f);
      return true;
    }
    // ---------------- 台北研究院 ----------------
    case "researchdome": {
      // long-term planning research: glass dome over a city sand-table, researchers round a table
      b([0, 0.05, 0], [0.98, 0.1, 0.84], 0xe8e6df);
      cy([-0.1, 0.18, 0.02], 0.7, 0.18, 0xf7f6f2);
      p("dome", [-0.1, 0.27, 0.02], [0.68, 0.62, 0.68], 0xbfe0e2);
      for (let k = 0; k < 4; k++) ring([-0.1, 0.27, 0.02], 0.34, 0xffffff, [0, (k * Math.PI) / 4, 0]);
      for (let k = 0; k < 9; k++) b([-0.25 + (k % 3) * 0.1, 0.3 + (k % 2) * 0.02, -0.08 + Math.floor(k / 3) * 0.1], [0.06, 0.05 + (k % 3) * 0.04, 0.06], [teal, 0xf2e6d2, C.coral][k % 3]);
      // outdoor sand-table with a tiny hex city and researchers around it
      b([0.24, 0.12, 0.3], [0.34, 0.04, 0.24], wood);
      b([0.24, 0.145, 0.3], [0.3, 0.01, 0.2], 0xd8c39a);
      for (let k = 0; k < 6; k++) p("cylinder", [0.14 + (k % 3) * 0.1, 0.17, 0.25 + Math.floor(k / 3) * 0.1], [0.08, 0.03 + (k % 2) * 0.04, 0.08], [teal, C.coral, 0xe8c547][k % 3]);
      // giant magnifying glass over the sand-table city = research
      ring([0.24, 0.42, 0.3], 0.2, C.ink, [0, 0, 0]);
      p("dome", [0.24, 0.42, 0.3], [0.17, 0.17, 0.03], 0xcfe8ee, [Math.PI / 2, 0, 0]);
      p("box", [0.38, 0.27, 0.3], [0.04, 0.18, 0.04], C.ink, [0, 0, 0.7]);
      person(0.06, 0.4, 0.34);
      person(0.44, 0.36, 0.34);
      person(0.42, 0.14, 0.34);
      // observatory tower
      b([0.36, 0.45, -0.24], [0.16, 0.9, 0.16], 0xffffff);
      for (let k = 0; k < 5; k++) hb([0.36, 0.12 + k * 0.17, -0.157], [0.12, 0.012, 0.01], teal);
      cy([0.36, 0.93, -0.24], 0.2, 0.05, teal);
      p("dome", [0.36, 0.95, -0.24], [0.16, 0.14, 0.16], 0xe6eef0);
      bulb([0.36, 1.08, -0.24], 0.03, 0xff9f8a);
      b([-0.1, 0.13, 0.4], [0.24, 0.16, 0.06], teal);
      glow([-0.1, 0.12, 0.433], [0.14, 0.11, 0.006], 0xd5ecee);
      return true;
    }
    case "childcenter": {
      // child-safety governance centre: shield emblem, three data pipes (education / welfare / police)
      // flowing into a control screen, a raised crossing with a child holding an adult's hand at the door
      b([0.1, 0.22, -0.16], [0.56, 0.42, 0.34], 0xf7f6f2);
      b([0.1, 0.45, -0.16], [0.6, 0.04, 0.38], teal);
      // big shield on the facade
      p("rbox", [0.1, 0.3, 0.02], [0.2, 0.2, 0.03], 0x4a6fa5);
      p("tetra", [0.1, 0.17, 0.02], [0.2, 0.1, 0.03], 0x4a6fa5, [Math.PI, Math.PI / 4, 0]);
      // child pictogram on the shield (not a medical cross)
      sphere([0.1, 0.355, 0.042], 0.035, 0xffffff);
      p("rbox", [0.1, 0.29, 0.042], [0.05, 0.07, 0.01], 0xffffff);
      // small rooftop shield emblem, visible from above
      p("rbox", [0.1, 0.55, -0.16], [0.16, 0.16, 0.03], 0x4a6fa5, [0, 0, Math.PI / 4]);
      sphere([0.1, 0.57, -0.14], 0.03, 0xffffff);
      // control screen on roof edge + three pipes in brand colours
      glow([-0.08, 0.6, -0.16], [0.26, 0.14, 0.02], 0x9fe3e6);
      b([-0.08, 0.6, -0.175], [0.3, 0.18, 0.02], C.ink);
      const pipes = [
        [-0.42, 0.22, 0xe8c547], // education (book yellow)
        [-0.42, 0.02, 0xd76b8a], // welfare (heart pink)
        [-0.42, -0.18, 0x4a6fa5], // police (blue)
      ];
      for (const [x, zz, c] of pipes) {
        p("rbox", [x, 0.12, zz], [0.12, 0.24, 0.12], c);
        p("rbox", [x, 0.27, zz], [0.08, 0.04, 0.08], 0xffffff);
        // pipe rising to the screen
        cy([x, 0.36, zz], 0.035, 0.24, c);
        p("cylinder", [(x - 0.08) / 2, 0.48, (zz - 0.16) / 2], [0.035, Math.hypot(x + 0.08, zz + 0.16), 0.035], c, [Math.PI / 2, 0, Math.atan2(x + 0.08, -(zz + 0.16))]);
      }
      // freestanding guardian shield monument in the forecourt: big blue shield, white child silhouette, three
      // coloured rings (education / welfare / police) — reads as "protecting children" from any angle
      b([0.34, 0.05, 0.3], [0.26, 0.1, 0.2], 0xe9e4da);
      p("rbox", [0.34, 0.47, 0.3], [0.44, 0.44, 0.06], 0x3f63a8);
      p("tetra", [0.34, 0.2, 0.3], [0.44, 0.24, 0.06], 0x3f63a8, [Math.PI, Math.PI / 4, 0]);
      p("rbox", [0.34, 0.47, 0.3], [0.37, 0.37, 0.062], 0x5b80c4);
      // adult + child holding hands, in white, on the shield
      sphere([0.29, 0.6, 0.335], 0.05, 0xffffff);
      p("rbox", [0.29, 0.47, 0.335], [0.07, 0.17, 0.012], 0xffffff);
      sphere([0.4, 0.53, 0.335], 0.04, 0xffffff);
      p("rbox", [0.4, 0.43, 0.335], [0.055, 0.12, 0.012], 0xffffff);
      p("rbox", [0.345, 0.45, 0.335], [0.07, 0.015, 0.012], 0xffffff);
      for (const [dx, c] of [[-0.12, 0xe8c547], [0, 0xd76b8a], [0.12, 0x4a6fa5]]) ring([0.34 + dx, 0.8, 0.3], 0.09, c, [0, 0, 0]);
      // raised zebra crossing at the door with child + adult
      for (let k = 0; k < 5; k++) hb([0.1 - 0.16 + k * 0.08, 0.025, 0.3], [0.05, 0.012, 0.18], k % 2 ? 0xffffff : 0xe8e2d6);
      person(-0.02, 0.32, 0.26);
      person(0.15, 0.32, 0.38);
      return true;
    }
    case "rampcenter": {
      // accessible-city design centre: building with a long switchback ramp, a wheelchair user,
      // tactile paving and a city blueprint on an easel
      b([0.16, 0.22, -0.16], [0.46, 0.44, 0.34], 0xf2efe8);
      b([0.16, 0.46, -0.16], [0.5, 0.04, 0.38], teal2);
      glow([0.16, 0.16, 0.016], [0.16, 0.22, 0.006], 0xd5ecee);
      // big accessibility sign on a pole: white wheelchair figure on blue
      cy([0.42, 0.3, 0.32], 0.02, 0.6, C.ink);
      p("rbox", [0.42, 0.72, 0.32], [0.3, 0.3, 0.03], 0x2f5fb0);
      {
        // International Symbol of Access, drawn flat on the board face: head, back, arm, seat, shin + foot, wheel
        const W = 0xffffff, cx = 0.42, cy0 = 0.72, z = 0.339;
        const bar = (u, v, w, h, rz = 0) => p("box", [cx + u, cy0 + v, z], [w, h, 0.006], W, [0, 0, rz]);
        sphere([cx - 0.03, cy0 + 0.098, z], [0.046, 0.046, 0.008], W); // head
        bar(-0.038, 0.03, 0.026, 0.08, -0.12); // back
        bar(0.005, 0.035, 0.07, 0.02); // arm reaching forward
        bar(0.006, -0.012, 0.09, 0.024); // seat / thigh
        bar(0.052, -0.046, 0.024, 0.07, 0.25); // shin
        bar(0.078, -0.078, 0.046, 0.02); // foot
        ring([cx - 0.035, cy0 - 0.045, z], 0.122, W, [0, 0, 0]); // wheel (two rings = a bolder stroke)
        ring([cx - 0.035, cy0 - 0.045, z], 0.106, W, [0, 0, 0]);
      }
      // switchback ramp to the door
      p("box", [-0.14, 0.06, 0.14], [0.46, 0.025, 0.14], 0xd8d2c6, [0, 0, -0.14]);
      p("box", [-0.14, 0.075, 0.14], [0.46, 0.006, 0.03], 0xe8c547, [0, 0, -0.14]);
      for (const s of [-1, 1]) p("box", [-0.14, 0.15, 0.14 + s * 0.07], [0.46, 0.012, 0.012], C.ink, [0, 0, -0.14]);
      b([0.12, 0.09, 0.1], [0.14, 0.04, 0.16], 0xd8d2c6);
      // wheelchair user on the ramp
      ring([-0.24, 0.13, 0.17], 0.13, C.ink, [0, 0, 0]);
      ring([-0.24, 0.13, 0.11], 0.13, C.ink, [0, 0, 0]);
      b([-0.24, 0.17, 0.14], [0.1, 0.03, 0.08], C.coral);
      person(-0.24, 0.14, 0.3);
      // blueprint easel
      for (const s of [-1, 1]) cy([-0.36 + s * 0.06, 0.16, -0.24], 0.012, 0.32, wood);
      b([-0.36, 0.3, -0.23], [0.2, 0.15, 0.01], 0x2e5f99);
      for (let k = 0; k < 3; k++) hb([-0.36, 0.26 + k * 0.035, -0.224], [0.15, 0.005, 0.004], 0xcfe6ff);
      return true;
    }
    case "loopgarden": {
      // dementia-friendly centre: warm-lit cottage, a looping garden walk with rest benches,
      // an elder walking with a companion, and tall wayfinding posts in distinct colours
      b([-0.2, 0.17, -0.22], [0.42, 0.34, 0.28], 0xfbf3e6);
      p("prism", [-0.2, 0.42, -0.22], [0.46, 0.3, 0.32], C.coral, [0, 0, Math.PI / 2]);
      for (const s of [-1, 1]) glow([-0.2 + s * 0.11, 0.18, -0.077], [0.1, 0.1, 0.006], 0xffd38a);
      ring([0.14, 0.02, 0.14], 0.56, 0xd9cbb4, [Math.PI / 2, 0, 0]);
      ring([0.14, 0.02, 0.14], 0.46, 0xd9cbb4, [Math.PI / 2, 0, 0]);
      cy([0.14, 0.022, 0.14], 0.38, 0.03, 0xa9bf8e);
      plant(0.14, 0.14, 0.3);
      for (let k = 0; k < 6; k++) {
        const a = (k / 6) * Math.PI * 2;
        sphere([0.14 + Math.cos(a) * 0.33, 0.06, 0.14 + Math.sin(a) * 0.33], 0.06, [0xf2b5c6, 0xfcea8b, 0xd9c6f0][k % 3]);
      }
      // wayfinding posts (colour = place)
      for (const [x, zz, c] of [[0.42, -0.12, 0xe8c547], [-0.12, 0.42, 0x5f9aa6], [0.44, 0.38, C.coral]]) {
        cy([x, 0.16, zz], 0.025, 0.32, C.ink);
        sphere([x, 0.34, zz], 0.06, c);
      }
      b([0.4, 0.06, 0.12], [0.16, 0.035, 0.06], wood);
      // forget-me-not sculpture: five blue-violet petals around a yellow heart, on a stem
      cy([-0.36, 0.25, 0.34], 0.025, 0.5, 0x6f8a62);
      for (let k = 0; k < 5; k++) {
        const a = (k / 5) * Math.PI * 2;
        sphere([-0.36 + Math.cos(a) * 0.1, 0.56 + Math.sin(a) * 0.1, 0.36], [0.085, 0.085, 0.035], 0x7f8fe0);
      }
      sphere([-0.36, 0.56, 0.38], 0.05, 0xf2c94c);
      // elder + companion walking together
      person(-0.06, 0.38, 0.36);
      person(0.11, 0.4, 0.38);
      cy([-0.14, 0.1, 0.38], 0.01, 0.2, 0x8a6a4e);
      return true;
    }
    // ---------------- 青年 ----------------
    case "containers": {
      const cols = [0xe8b04a, C.coral, 0x3e7c8c, 0xe7a383, 0xd9c3a0];
      const stack = [
        [-0.2, 0, 0.1, 0],
        [0.2, 0, -0.1, 1],
        [-0.05, 1, -0.05, 2],
        [0.25, 1, 0.12, 3],
        [-0.15, 2, 0.02, 4],
      ];
      for (const [x, lvl, zz, ci] of stack) {
        const y = 0.12 + lvl * 0.24;
        b([x, y, zz], [0.42, 0.22, 0.24], cols[ci], [0, lvl % 2 ? 0.25 : -0.1, 0]);
        for (let k = 0; k < 6; k++) hb([x - 0.17 + k * 0.068, y, zz + 0.123], [0.01, 0.2, 0.006], 0x000000);
        glow([x + 0.08, y + 0.01, zz + 0.125], [0.12, 0.1, 0.006], 0xfff1c8);
      }
      // external stairs & neon sign
      for (let k = 0; k < 5; k++) hb([0.46, 0.05 + k * 0.05, 0.3 - k * 0.05], [0.12, 0.02, 0.05], C.ink);
      glow([-0.15, 0.78, 0.15], [0.26, 0.06, 0.01], 0xffc48a);
      // laptop bar under awning
      b([-0.32, 0.14, 0.38], [0.36, 0.04, 0.1], wood);
      for (let k = 0; k < 3; k++) {
        hb([-0.44 + k * 0.12, 0.17, 0.37], [0.07, 0.006, 0.05], 0x58585f);
        glow([-0.44 + k * 0.12, 0.2, 0.35], [0.07, 0.05, 0.004], 0x9fd8e6);
      }
      return true;
    }
    case "jars": {
      b([0, 0.05, 0], [0.7, 0.1, 0.4], 0x58a6a6);
      for (const s of [-1, 1]) {
        p("cylinder", [s * 0.17, 0.32, 0], [0.24, 0.4, 0.24], 0xd8eef0);
        p("cylinder", [s * 0.17, 0.54, 0], [0.18, 0.05, 0.18], C.ink);
        for (let k = 0; k < (s < 0 ? 4 : 4); k++) cy([s * 0.17, 0.14 + k * 0.045, 0], 0.16, 0.035, 0xe8c547);
      }
      // "+" between jars (matching, no amounts)
      b([0, 0.34, 0.06], [0.1, 0.025, 0.02], C.coral);
      b([0, 0.34, 0.06], [0.025, 0.1, 0.02], C.coral);
      return true;
    }
    case "stage": {
      b([0, 0.07, -0.1], [0.9, 0.14, 0.5], 0x3a3540);
      b([0, 0.145, -0.1], [0.86, 0.01, 0.46], 0xc9a97f);
      // truss + lights
      for (const s of [-1, 1]) hb([s * 0.43, 0.42, -0.3], [0.03, 0.56, 0.03], 0x58585f);
      hb([0, 0.7, -0.3], [0.9, 0.03, 0.03], 0x58585f);
      for (let k = 0; k < 5; k++) bulb([-0.32 + k * 0.16, 0.66, -0.27], 0.04, [0xffd28a, 0xff9fc8, 0x9fd8e6][k % 3]);
      glow([0, 0.4, -0.34], [0.6, 0.3, 0.01], 0xe8c547);
      // paper plane launch ramp pointing outward
      p("box", [0.32, 0.22, 0.28], [0.36, 0.03, 0.12], C.coral, [0, -0.5, 0.35]);
      for (let k = 0; k < 3; k++) p("tetra", [0.42 + k * 0.1, 0.36 + k * 0.08, 0.2 - k * 0.07], [0.08, 0.02, 0.12], 0xffffff, [Math.PI / 2, 0.6, 0]);
      // audience
      for (let k = 0; k < 4; k++) person(-0.3 + k * 0.17, 0.28, 0.3);
      return true;
    }
    // ---------------- 城市外交 ----------------
    case "infinityforum": {
      // a coral ∞ walkway (lemniscate) with a round canopy where the loops cross
      const A = 0.62;
      const pt = (t) => {
        const d = 1 + Math.sin(t) ** 2;
        return [(A * Math.cos(t)) / d, (A * Math.sin(t) * Math.cos(t)) / d];
      };
      for (let k = 0; k < 44; k++) {
        const t0 = (k / 44) * Math.PI * 2,
          t1 = ((k + 1) / 44) * Math.PI * 2;
        const [x0, z0] = pt(t0),
          [x1, z1] = pt(t1);
        const len = Math.hypot(x1 - x0, z1 - z0);
        hb([(x0 + x1) / 2, 0.025, (z0 + z1) / 2 + 0.05], [0.09, 0.02, len + 0.012], k % 2 ? C.coral : 0xe98a66, [0, Math.atan2(x1 - x0, z1 - z0), 0]);
      }
      for (const s of [-1, 1]) {
        cy([s * 0.4, 0.02, 0.05], 0.3, 0.02, 0xa9bf8e);
        plant(s * 0.4, 0.05, 0.22);
      }
      for (let k = 0; k < 5; k++) {
        const a = (k / 5) * Math.PI * 2;
        cy([Math.cos(a) * 0.12, 0.17, 0.05 + Math.sin(a) * 0.12], 0.016, 0.3, 0xffffff);
      }
      p("dome", [0, 0.32, 0.05], [0.36, 0.1, 0.36], 0xf3eadb);
      ring([0, 0.32, 0.05], 0.18, C.coral, [Math.PI / 2, 0, 0]);
      cy([0, 0.1, 0.05], 0.13, 0.02, wood);
      for (let k = 0; k < 4; k++) {
        const a = (k / 4) * Math.PI * 2 + 0.4;
        b([Math.cos(a) * 0.1, 0.06, 0.05 + Math.sin(a) * 0.1], [0.05, 0.05, 0.05], C.coral);
      }
      return true;
    }
    case "terminal": {
      // departures / arrivals hall with a two-way canopy
      b([0, 0.2, -0.16], [0.7, 0.4, 0.26], 0xf2efe8);
      p("box", [0, 0.44, -0.12], [0.8, 0.04, 0.4], 0x5f9aa6, [0.12, 0, 0]);
      glow([-0.17, 0.2, -0.025], [0.18, 0.26, 0.008], 0xd5ecee);
      glow([0.17, 0.2, -0.025], [0.18, 0.26, 0.008], 0xd5ecee);
      // big arrows on the canopy edge: out (coral) / back (teal)
      p("tetra", [-0.2, 0.52, 0.08], [0.1, 0.12, 0.02], C.coral, [Math.PI / 2, 0, Math.PI / 2]);
      hb([-0.27, 0.52, 0.08], [0.1, 0.02, 0.04], C.coral);
      p("tetra", [0.2, 0.52, 0.08], [0.1, 0.12, 0.02], 0x3e7c8c, [Math.PI / 2, 0, -Math.PI / 2]);
      hb([0.27, 0.52, 0.08], [0.1, 0.02, 0.04], 0x3e7c8c);
      // floor guide lines out / in
      for (let k = 0; k < 4; k++) {
        hb([-0.17, 0.006, 0.08 + k * 0.08], [0.04, 0.004, 0.05], C.coral);
        hb([0.17, 0.006, 0.08 + k * 0.08], [0.04, 0.004, 0.05], 0x3e7c8c);
      }
      // luggage cart
      hb([0.36, 0.06, 0.3], [0.16, 0.02, 0.1], 0x58585f);
      for (let k = 0; k < 3; k++) p("rbox", [0.31 + k * 0.05, 0.11 + (k % 2) * 0.03, 0.3], [0.045, 0.1 + (k % 2) * 0.05, 0.08], [C.coral, 0x3e7c8c, 0xe8c547][k]);
      return true;
    }
    case "democrossing": {
      // raised crosswalk, refuge island, tightened corner (per transport policy toolkit)
      hb([0, 0.02, 0], [0.9, 0.04, 0.44], 0x6a6560);
      p("box", [0, 0.055, 0], [0.26, 0.04, 0.44], 0xd9c3a3);
      for (let k = 0; k < 6; k++) hb([0, 0.078, -0.18 + k * 0.072], [0.24, 0.006, 0.036], 0xffffff);
      b([-0.36, 0.06, 0], [0.12, 0.06, 0.1], 0xa9bf8e);
      for (const s of [-1, 1]) {
        cy([s * 0.18, 0.06, 0.28], 0.18, 0.08, 0xd2c3ad);
        cy([s * 0.32, 0.18, 0.28], 0.02, 0.28, C.ink);
        p("rbox", [s * 0.32, 0.34, 0.28], [0.08, 0.08, 0.015], 0xe8c547);
      }
      // signpost with names only
      cy([0.4, 0.25, -0.26], 0.02, 0.5, C.ink);
      p("rbox", [0.4, 0.45, -0.24], [0.18, 0.05, 0.015], 0xffffff, [0, 0.3, 0]);
      p("rbox", [0.4, 0.37, -0.24], [0.18, 0.05, 0.015], 0xffffff, [0, -0.4, 0]);
      return true;
    }
    case "blueprint": {
      b([0, 0.12, 0], [0.56, 0.06, 0.4], wood);
      for (const s of [-1, 1]) for (const t of [-1, 1]) hb([s * 0.24, 0.05, t * 0.16], [0.03, 0.1, 0.03], C.ink);
      p("box", [-0.05, 0.16, 0.0], [0.44, 0.01, 0.32], 0x4a6fa5, [0, 0.05, 0]);
      for (let k = 0; k < 4; k++) hb([-0.2 + k * 0.1, 0.168, 0.0], [0.006, 0.002, 0.28], 0xd5e4f5);
      // miniature institute model on the table
      p("dome", [0.17, 0.165, -0.08], [0.12, 0.1, 0.12], 0xbfe0e2);
      hb([0.24, 0.22, -0.13], [0.03, 0.12, 0.03], 0xffffff);
      cy([-0.2, 0.2, 0.12], 0.035, 0.08, 0xd5e4f5);
      return true;
    }
    case "arrivals": {
      b([0, 0.04, 0], [0.7, 0.08, 0.5], 0xe9dcc4);
      // icon-only board
      for (const s of [-1, 1]) hb([s * 0.22, 0.28, -0.16], [0.03, 0.48, 0.03], C.ink);
      p("rbox", [0, 0.4, -0.16], [0.5, 0.26, 0.03], 0x2f3a46);
      const ic = [C.coral, 0xe8c547, 0x58a6a6, 0x9fd8e6, 0xf2a1a1, 0xffffff];
      for (let k = 0; k < 6; k++) glow([-0.15 + (k % 3) * 0.15, 0.45 - Math.floor(k / 3) * 0.1, -0.142], [0.08, 0.06, 0.004], ic[k]);
      // bench + suitcases
      b([0, 0.12, 0.15], [0.4, 0.04, 0.1], wood);
      for (let k = 0; k < 2; k++) p("rbox", [-0.25 + k * 0.5, 0.12, 0.2], [0.07, 0.15, 0.11], [0x3e7c8c, C.coral][k]);
      return true;
    }
    // ---------------- misc replacements ----------------
    case "workplace": {
      b([0, 0.26, -0.08], [0.6, 0.5, 0.4], 0xf2ebe0);
      b([0, 0.53, -0.08], [0.66, 0.05, 0.46], 0x7aa58f);
      for (let k = 0; k < 3; k++) glow([-0.18 + k * 0.18, 0.32, 0.125], [0.12, 0.14, 0.008], 0xd8ecea);
      b([0, 0.1, 0.13], [0.14, 0.2, 0.01], 0x7aa58f);
      plant(-0.32, 0.24, 0.3);
      seat(0.3, 0.26);
      return true;
    }
    case "rideboard": {
      // riverside bike lane with a quarterly score board (5 bars, no numbers)
      b([0, 0.03, 0.1], [0.9, 0.03, 0.26], 0x8a9a8a);
      for (let k = 0; k < 6; k++) hb([-0.4 + k * 0.16, 0.05, 0.1], [0.08, 0.004, 0.015], 0xffffff);
      for (let k = 0; k < 3; k++) { cy([-0.35 + k * 0.35, 0.18, -0.06], 0.015, 0.3, C.ink); bulb([-0.35 + k * 0.35, 0.34, -0.06], 0.025, 0xfff0c2); }
      b([0.2, 0.32, -0.28], [0.44, 0.28, 0.03], C.ink);
      for (let k = 0; k < 5; k++) b([0.04 + k * 0.08, 0.24 + (0.05 + (k % 3) * 0.03) / 2, -0.262], [0.05, 0.05 + (k % 3) * 0.03, 0.01], [0x8fb37a, 0xe8c547, C.coral, 0x5f9aa6, 0x8fb37a][k]);
      for (const s of [-1, 1]) cy([0.2 + s * 0.18, 0.1, -0.28], 0.015, 0.2, C.ink);
      ring([-0.2, 0.1, 0.1], 0.1, C.ink, [0, 0, 0]);
      ring([-0.06, 0.1, 0.1], 0.1, C.ink, [0, 0, 0]);
      b([-0.13, 0.15, 0.1], [0.14, 0.012, 0.012], C.coral);
      return true;
    }
    case "lawbook": {
      // a big open law book with a meal tray on it
      b([-0.12, 0.08, 0], [0.34, 0.06, 0.46], 0x8b4a3a, [0, 0, 0.08]);
      b([0.12, 0.08, 0], [0.34, 0.06, 0.46], 0x8b4a3a, [0, 0, -0.08]);
      b([-0.12, 0.12, 0], [0.31, 0.03, 0.42], 0xfbf6ea, [0, 0, 0.08]);
      b([0.12, 0.12, 0], [0.31, 0.03, 0.42], 0xfbf6ea, [0, 0, -0.08]);
      for (let k = 0; k < 4; k++) hb([-0.12, 0.14, -0.14 + k * 0.08], [0.22, 0.004, 0.012], 0x9a8a7a);
      b([0.12, 0.17, 0], [0.24, 0.02, 0.18], 0xe7eef0);
      sphere([0.06, 0.2, -0.03], [0.07, 0.04, 0.07], 0xf6e3a8);
      sphere([0.18, 0.2, -0.03], [0.06, 0.04, 0.06], green);
      sphere([0.12, 0.2, 0.05], [0.08, 0.04, 0.05], 0xd9824f);
      return true;
    }
    case "stairlift": {
      // stair with a stair-lift chair on a rail + a wheelchair at the bottom
      for (let k = 0; k < 5; k++) b([-0.25 + k * 0.1, 0.04 + k * 0.05, 0], [0.1, 0.08 + k * 0.1, 0.36], 0xe6dccb);
      p("box", [-0.03, 0.27, -0.2], [0.6, 0.02, 0.02], 0x8a8a90, [0, 0, 0.45]);
      b([-0.08, 0.3, -0.12], [0.12, 0.03, 0.12], C.coral);
      b([-0.12, 0.37, -0.12], [0.03, 0.14, 0.12], C.coral);
      person(-0.08, -0.12, 0.3);
      ring([-0.42, 0.11, 0.2], 0.12, C.ink, [0, 0, 0]);
      ring([-0.42, 0.11, 0.08], 0.12, C.ink, [0, 0, 0]);
      b([-0.42, 0.15, 0.14], [0.1, 0.03, 0.1], 0x3f6fb5);
      p("rbox", [0.3, 0.42, 0.2], [0.1, 0.1, 0.01], 0x3f6fb5);
      return true;
    }
    case "accessgym": {
      // sports hall with ramp entrance, all-gender changing room doors
      b([0.08, 0.2, -0.12], [0.6, 0.4, 0.36], 0xf3efe6);
      p("dome", [0.08, 0.4, -0.12], [0.6, 0.18, 0.36], 0x5f9aa6);
      for (const [x, c] of [[-0.06, 0x4a6fa5], [0.08, 0xd76b8a], [0.22, 0x8fb37a]]) { b([x, 0.13, 0.065], [0.1, 0.22, 0.01], c); sphere([x, 0.29, 0.07], 0.03, 0xffffff); }
      p("box", [-0.3, 0.05, 0.22], [0.4, 0.02, 0.14], 0xd8d2c6, [0, 0, -0.12]);
      ring([-0.38, 0.1, 0.28], 0.1, C.ink, [0, 0, 0]);
      person(-0.38, 0.22, 0.3);
      p("rbox", [-0.3, 0.32, 0.06], [0.1, 0.1, 0.01], 0x3f6fb5);
      return true;
    }
    // ---------------- 三大登山觀光中心（三種不同造型；共用服務：裝備租借、置物櫃、洗鞋、步道看板） ----------------
    case "hikeNorth": {
      // 北劍潭：A 字形木屋登山站、松林、步道入口拱門、夜間燈籠串（連結夜市的意象）
      for (const s of [-1, 1]) p("box", [-0.02 + s * 0.13, 0.25, -0.05], [0.04, 0.56, 0.46], C.coral, [0, 0, s * -0.5]);
      b([-0.02, 0.12, -0.05], [0.3, 0.22, 0.44], 0xc49a6c);
      b([-0.02, 0.17, 0.18], [0.24, 0.3, 0.01], 0xb48560);
      glow([-0.02, 0.14, 0.186], [0.12, 0.16, 0.006], 0xfff1c8);
      b([-0.02, 0.3, 0.19], [0.18, 0.05, 0.01], 0xfff8ee);
      b([-0.02, 0.02, 0.27], [0.36, 0.03, 0.14], 0xb48560);
      for (const [tx, tz, ts] of [[-0.38, -0.3, 1], [0.32, -0.32, 1.2], [-0.42, 0.1, 0.8], [0.4, 0.05, 0.9]]) {
        cy([tx, 0.08, tz], 0.03, 0.14, 0x7a5d44);
        p("cone6", [tx, 0.26 * ts, tz], [0.2 * ts, 0.26 * ts, 0.2 * ts], 0x58785f);
        p("cone6", [tx, 0.4 * ts, tz], [0.14 * ts, 0.22 * ts, 0.14 * ts], 0x6f8a62);
      }
      // trail gate + stepping stones heading back into the pines
      for (const sx of [0.22, 0.38]) cy([sx, 0.15, 0.22], 0.022, 0.3, 0x8a6a4e);
      b([0.3, 0.31, 0.22], [0.24, 0.035, 0.04], 0x8a6a4e);
      for (let k = 0; k < 4; k++) p("ico", [0.3 + k * 0.02, 0.02, 0.12 - k * 0.12], [0.08, 0.02, 0.06], 0xd8ccba);
      // lantern string between two poles
      for (const sx of [-0.4, 0.42]) cy([sx, 0.2, 0.42], 0.012, 0.4, C.ink);
      for (let k = 0; k < 7; k++) bulb([-0.4 + k * 0.137, 0.38 - Math.sin((k / 6) * Math.PI) * 0.05, 0.42], 0.025, [0xffb15c, 0xff7a5c, 0xffd37a][k % 3]);
      // gear rack + lockers
      for (let k = 0; k < 3; k++) p("cylinder", [-0.36 + k * 0.025, 0.12, 0.3], [0.008, 0.24, 0.008], [0x3e7c8c, C.coral, 0xe8c547][k], [0.15, 0, 0.08]);
      for (let k = 0; k < 2; k++) b([0.16 + k * 0.07, 0.09, -0.3], [0.06, 0.18, 0.05], 0x5f9aa6);
      return true;
    }
    case "hikeEast": {
      // 東象山：巨石群、木棧階梯登頂、觀景平台望向城市、玻璃立面的現代遊客中心
      b([0.18, 0.12, 0.16], [0.36, 0.22, 0.24], 0xf2efe8);
      glow([0.18, 0.12, 0.282], [0.32, 0.16, 0.006], 0xbfe0e8);
      for (let k = 0; k < 4; k++) hb([0.04 + k * 0.09, 0.12, 0.288], [0.008, 0.18, 0.006], 0x6f6a62);
      b([0.18, 0.245, 0.16], [0.42, 0.03, 0.3], 0x3e7c8c);
      b([0.18, 0.27, 0.3], [0.2, 0.04, 0.01], 0xfff8ee);
      // boulders (rounded, stacked, like a rocky summit)
      for (const [bx, by, bz, bs, c] of [[-0.25, 0.14, -0.2, 0.3, 0xb7a993], [-0.08, 0.22, -0.3, 0.26, 0xa89a84], [-0.36, 0.3, -0.34, 0.22, 0x9c8f7c], [0.1, 0.12, -0.36, 0.2, 0xb7a993], [-0.18, 0.4, -0.38, 0.16, 0xc2b6a2]])
        p("ico", [bx, by, bz], [bs, bs * 0.9, bs * 0.85], c, [bx * 3, bz * 4, 0.2]);
      // timber stair boardwalk up the boulders
      for (let k = 0; k < 7; k++) p("box", [-0.42 + k * 0.04, 0.04 + k * 0.055, 0.2 - k * 0.07], [0.16, 0.022, 0.07], 0xb48560, [0, 0.55, 0]);
      for (let k = 0; k < 4; k++) cy([-0.48 + k * 0.08, 0.1 + k * 0.1, 0.24 - k * 0.14], 0.01, 0.2, 0x8a6a4e);
      // summit view deck with railing, facing the city
      b([-0.2, 0.5, -0.28], [0.26, 0.025, 0.16], 0xb48560);
      for (let k = 0; k < 4; k++) cy([-0.31 + k * 0.075, 0.56, -0.2], 0.008, 0.1, C.ink);
      hb([-0.2, 0.61, -0.2], [0.26, 0.01, 0.01], C.ink);
      // lockers + boot wash
      for (let k = 0; k < 3; k++) b([0.42, 0.09, 0.0 + k * 0.07], [0.05, 0.18, 0.06], [0x5f9aa6, 0x7aa0b0, 0x5f9aa6][k]);
      b([0.36, 0.04, 0.38], [0.14, 0.05, 0.07], 0xd2c3ad);
      b([0.36, 0.065, 0.38], [0.1, 0.01, 0.04], 0x8fc6d0);
      return true;
    }
    case "hikeSouth": {
      // 南貓空：茶園梯田、雙層翹簷茶屋服務站、纜車塔與兩節車廂
      for (let r = 0; r < 4; r++) {
        b([-0.12, 0.03 + r * 0.06, -0.12 - r * 0.08], [0.7 - r * 0.1, 0.06, 0.1], [0xb48c62, 0xa77f58][r % 2]);
        for (let k = 0; k < 5 - r; k++) sphere([-0.4 + r * 0.05 + k * 0.13, 0.08 + r * 0.06, -0.12 - r * 0.08], [0.07, 0.05, 0.05], [0x5f8f4e, 0x6f9a58][k % 2]);
      }
      // tea-house with two-tier upturned eaves
      b([0.2, 0.11, 0.2], [0.32, 0.2, 0.24], 0xf4ebdd);
      glow([0.2, 0.11, 0.322], [0.18, 0.1, 0.006], 0xfff1c8);
      p("cone6", [0.2, 0.25, 0.2], [0.5, 0.1, 0.42], 0x5a4a3e, [0, Math.PI / 6, 0]);
      b([0.2, 0.31, 0.2], [0.18, 0.06, 0.14], 0xf4ebdd);
      p("cone6", [0.2, 0.37, 0.2], [0.3, 0.08, 0.26], 0x5a4a3e, [0, Math.PI / 6, 0]);
      b([0.2, 0.2, 0.33], [0.16, 0.035, 0.01], 0xfff8ee);
      // gondola tower + cable + two cabins
      for (const [tx, tz, h] of [[0.42, -0.3, 0.7], [-0.42, 0.3, 0.45]]) {
        b([tx, h / 2, tz], [0.05, h, 0.05], 0x8a8a90);
        b([tx, h, tz], [0.16, 0.03, 0.05], 0x8a8a90);
      }
      p("box", [0, 0.58, 0], [0.012, 0.012, Math.hypot(0.84, 0.6)], C.ink, [0.2, Math.atan2(0.84, -0.6), 0]);
      for (const [cx2, cz2, cy2, c] of [[0.18, -0.13, 0.55, C.coral], [-0.2, 0.15, 0.46, 0x3e7c8c]]) {
        hb([cx2, cy2 + 0.06, cz2], [0.008, 0.08, 0.008], C.ink);
        b([cx2, cy2, cz2], [0.1, 0.08, 0.08], c);
        glow([cx2, cy2 + 0.01, cz2 + 0.041], [0.07, 0.035, 0.004], 0xd5ecee);
      }
      // gear rack
      for (let k = 0; k < 3; k++) p("cylinder", [0.42 + k * 0.02, 0.12, 0.3], [0.008, 0.24, 0.008], [0x3e7c8c, C.coral, 0xe8c547][k], [0.15, 0, 0.08]);
      return true;
    }
    case "culturecoin": {
      // 文化幣: a big gold token (theatre-mask emblem) standing on a plinth, ringed by the four things it pays for:
      // a little red-curtain theatre, a gallery easel, an indie-bookshop stall and a kids' cinema screen.
      const gold = 0xe8b04a, goldDark = 0xb8862e;
      b([0, 0.04, 0.02], [0.3, 0.08, 0.18], 0xf3e2c6);
      p("cylinder", [0, 0.36, 0.02], [0.44, 0.06, 0.44], gold, [Math.PI / 2, 0, 0]);
      ring([0, 0.36, 0.054], 0.19, goldDark, [0, 0, 0]);
      // theatre mask on the coin face
      sphere([0, 0.37, 0.058], [0.16, 0.18, 0.02], 0xfff8ee);
      sphere([-0.04, 0.4, 0.07], [0.035, 0.022, 0.01], C.ink);
      sphere([0.04, 0.4, 0.07], [0.035, 0.022, 0.01], C.ink);
      p("torus", [0, 0.33, 0.07], [0.05, 0.03, 0.03], C.coral, [0, 0, Math.PI]);
      // stacked coins at the plinth
      for (let k = 0; k < 4; k++) p("cylinder", [0.2, 0.02 + k * 0.022, 0.16], [0.09, 0.02, 0.09], k % 2 ? gold : goldDark);
      for (let k = 0; k < 2; k++) p("cylinder", [-0.2, 0.02 + k * 0.022, 0.18], [0.09, 0.02, 0.09], k % 2 ? gold : goldDark);
      // mini theatre (back left): frame + red curtains + tiny stage
      b([-0.32, 0.04, -0.28], [0.32, 0.08, 0.2], wood);
      for (const sx of [-0.46, -0.18]) b([sx, 0.22, -0.34], [0.04, 0.3, 0.04], C.ink);
      b([-0.32, 0.38, -0.34], [0.34, 0.05, 0.05], C.ink);
      for (const sx of [-0.4, -0.24]) p("box", [sx, 0.225, -0.305], [0.07, 0.25, 0.015], 0xb83a3a);
      // gallery easel with a painting (back right)
      for (const sx of [0.24, 0.38]) cy([sx, 0.16, -0.3], 0.01, 0.32, wood);
      b([0.31, 0.26, -0.29], [0.18, 0.14, 0.012], 0xfff8ee);
      b([0.29, 0.25, -0.282], [0.08, 0.06, 0.004], 0x5f9aa6);
      sphere([0.35, 0.28, -0.282], [0.03, 0.03, 0.004], 0xe8c547);
      // indie bookshop stall (front left) with striped awning
      b([-0.36, 0.08, 0.3], [0.2, 0.12, 0.12], wood);
      for (let k = 0; k < 5; k++) b([-0.44 + k * 0.04, 0.17, 0.3], [0.03, 0.07, 0.08], [C.coral, 0x3e7c8c, 0xe8c547, 0x6f7fb5, 0x8fb37a][k]);
      for (let k = 0; k < 4; k++) p("box", [-0.42 + k * 0.05, 0.27, 0.32], [0.05, 0.012, 0.16], k % 2 ? 0xfff8ee : C.coral, [0.25, 0, 0]);
      // kids' cinema screen (front right) with a film strip
      b([0.36, 0.2, 0.3], [0.2, 0.13, 0.015], C.ink);
      glow([0.36, 0.2, 0.31], [0.17, 0.1, 0.004], 0xd5ecee);
      for (let k = 0; k < 4; k++) hb([0.29 + k * 0.045, 0.1, 0.31], [0.03, 0.02, 0.004], C.ink);
      for (const sx of [0.28, 0.44]) cy([sx, 0.07, 0.3], 0.01, 0.14, C.ink);
      return true;
    }
    // ---------------- 客家政策 (2026-10-20) ----------------
    // palette: indigo "blue shirt" cloth, red-brick courtyard, terracotta roof tiles, white tung blossom
    case "bogongcare": {
      // 都會伯公照護站: a small U-shaped courtyard house (伙房) with an elder and a child at a shared table
      const brick = 0xc77b5c, tile = 0x9a4f3a, indigo = 0x3f5a8a, wall = 0xf2e8d8;
      hb([0, 0.012, 0.08], [0.62, 0.024, 0.44], 0xd9b08c); // sun-drying yard
      b([0, 0.15, -0.2], [0.62, 0.3, 0.16], wall);
      for (const s of [-1, 1]) b([s * 0.25, 0.13, 0.02], [0.13, 0.26, 0.3], wall);
      p("hip", [0, 0.36, -0.2], [0.7, 0.13, 0.22], tile);
      for (const s of [-1, 1]) p("hip", [s * 0.25, 0.32, 0.02], [0.18, 0.11, 0.36], tile);
      hb([0, 0.1, -0.115], [0.12, 0.2, 0.01], indigo); // indigo door curtain
      for (const s of [-1, 1]) hb([s * 0.12, 0.17, -0.115], [0.06, 0.06, 0.008], 0xd5ecee);
      hb([0, 0.03, -0.2], [0.64, 0.06, 0.18], brick);
      cy([0, 0.12, 0.12], 0.16, 0.025, wood);
      cy([0, 0.06, 0.12], 0.03, 0.1, C.ink);
      person(-0.1, 0.16, 0.34);
      person(0.1, 0.16, 0.24);
      return true;
    }
    case "sisterschools": {
      // 北市中小學結盟: a city school and a hill-town school joined by a path with a small exchange bus
      const roof2 = 0x9a4f3a;
      b([-0.26, 0.14, -0.08], [0.24, 0.28, 0.2], 0xf6e7a8);
      p("hip", [-0.26, 0.31, -0.08], [0.28, 0.08, 0.24], 0x58a6a6);
      for (let k = 0; k < 2; k++) hb([-0.31 + k * 0.1, 0.17, 0.025], [0.06, 0.06, 0.008], 0xd5ecee);
      b([0.27, 0.12, -0.12], [0.22, 0.24, 0.18], 0xf2e8d8);
      p("hip", [0.27, 0.27, -0.12], [0.26, 0.09, 0.22], roof2);
      hb([0.27, 0.08, -0.025], [0.06, 0.16, 0.008], 0x3f5a8a);
      hb([0, 0.01, 0.16], [0.7, 0.012, 0.1], 0xd9cbb4);
      b([0, 0.06, 0.16], [0.18, 0.09, 0.08], C.yellow);
      glow([0, 0.075, 0.2], [0.14, 0.035, 0.005], 0xd5ecee);
      for (const d of [-0.05, 0.05]) cy([d, 0.018, 0.2], 0.035, 0.02, C.ink);
      person(-0.3, 0.2, 0.22);
      person(0.33, 0.2, 0.22);
      return true;
    }
    case "hakkapoints": {
      // 台北通客語集點: a shop front with an indigo awning, a coin stack and a phone-sized points sign
      const indigo = 0x3f5a8a;
      b([0, 0.17, -0.1], [0.5, 0.34, 0.22], 0xf2e8d8);
      p("box", [0, 0.36, 0.04], [0.56, 0.02, 0.18], indigo, [0.35, 0, 0]);
      for (let k = 0; k < 4; k++) hb([-0.21 + k * 0.14, 0.33, 0.12], [0.07, 0.04, 0.008], k % 2 ? 0xf2e8d8 : indigo);
      glow([0, 0.17, 0.012], [0.3, 0.16, 0.006], 0xfff0c2);
      b([0.36, 0.2, 0.12], [0.1, 0.18, 0.03], C.ink);
      glow([0.36, 0.21, 0.137], [0.075, 0.13, 0.004], 0xd5ecee);
      cy([0.36, 0.24, 0.14], 0.035, 0.006, C.yellow);
      for (let k = 0; k < 4; k++) cy([-0.32, 0.02 + k * 0.022, 0.18], 0.09, 0.018, k % 2 ? 0xe8c547 : 0xd9a933);
      person(0.12, 0.2, 0.36);
      return true;
    }
    case "hiringdesk": {
      // 約聘有加分: a city service counter with a headset clerk and a bonus-star plaque
      b([0, 0.2, -0.16], [0.6, 0.4, 0.16], 0xf2efe8);
      hb([0, 0.42, -0.16], [0.64, 0.03, 0.2], 0x3e7c8c);
      b([0, 0.14, 0.04], [0.56, 0.16, 0.12], wood);
      hb([0, 0.225, 0.04], [0.6, 0.02, 0.16], 0xe9dcc4);
      person(-0.12, -0.06, 0.36);
      ring([-0.12, 0.33, -0.06], 0.1, C.ink, [0, 0, 0]);
      b([0.14, 0.27, 0.02], [0.1, 0.08, 0.02], C.ink);
      glow([0.14, 0.27, 0.032], [0.08, 0.06, 0.004], 0xd5ecee);
      p("cone", [0.24, 0.52, -0.08], [0.1, 0.02, 0.1], C.yellow, [Math.PI / 2, 0, 0]);
      b([0.24, 0.52, -0.09], [0.16, 0.16, 0.02], 0x3f5a8a);
      p("tetra", [0.24, 0.52, -0.075], [0.08, 0.08, 0.01], C.yellow, [Math.PI / 2, 0, 0]);
      person(0.1, 0.2, 0.36);
      return true;
    }
    case "hakkaforum": {
      // 世界有客家: a round forum table under a tung-blossom canopy, a small globe at the centre
      cy([0, 0.015, 0], 0.66, 0.03, 0xe9dcc4);
      cy([0, 0.15, 0], 0.4, 0.03, wood);
      cy([0, 0.08, 0], 0.05, 0.14, C.ink);
      sphere([0, 0.22, 0], 0.1, glass);
      ring([0, 0.22, 0], 0.12, C.yellow, [0, 0, 0.35]);
      for (let k = 0; k < 5; k++) {
        const a = (k / 5) * Math.PI * 2;
        seat(Math.cos(a) * 0.28, Math.sin(a) * 0.28);
      }
      for (const s of [-1, 1]) cy([s * 0.36, 0.3, -0.2], 0.03, 0.6, 0x8a6a4e);
      p("box", [0, 0.6, -0.2], [0.8, 0.02, 0.2], 0x3f5a8a);
      for (let k = 0; k < 7; k++) sphere([-0.33 + k * 0.11, 0.62, -0.12 + (k % 2) * 0.04], 0.07, 0xfbf6ee);
      for (let k = 0; k < 7; k++) sphere([-0.33 + k * 0.11, 0.645, -0.12 + (k % 2) * 0.04], 0.025, 0xe8c547);
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
  }
  return false;
}
