import { extraModel } from "./models-extra.js?v=20261023-1";
// Symbolic policy miniatures. These are not proposed building designs or locations.
// Explicit IDs prevent array ordering from silently changing a policy's visual meaning.
export const sceneSpecs = {
  "civil-office": ["cityhall", "雙翼市政辦公樓、玻璃帷幕與屋頂花園"],
  "civil-flex": ["clocktower", "彈性上下班鐘塔"],
  "civil-eap": ["kiosk", "EAP 點數自選亭"],
  "civil-award": ["podium", "廣場專案獎勵頒獎台"],
  "civil-health": ["clinicpod", "健檢小診間"],
  "civil-ai": ["aipod", "AI 支援小隊工作艙"],
  "institute-child": ["childcenter", "盾牌標誌的中心：教育、社政、警政三條資料管線匯入中控螢幕，門口有牽手過馬路的孩子"],
  "institute-access": ["rampcenter", "無障礙坡道、輪椅使用者與城市設計藍圖"],
  "institute-dementia": ["loopgarden", "暖光小屋、環狀花園步道、長者與陪伴者、彩色定向柱"],
  "institute-research": ["researchdome", "玻璃圓頂研究館、城市沙盤與圍桌研究員"],
  "renewal-scaffold": ["renewal", "施工鷹架與塔吊"],
  "transport-school": ["crossing", "校門、行穿線與交通緩衝"],
  "transport-bus": ["busstop", "公車與駕駛休息候車亭"],
  "transport-bridge": ["bridge", "河道、自行車橋與護欄"],
  "transport-maintain": ["rideboard", "河濱車道與每季評分看板"],
  "transport-bike": ["bike", "自行車與充電停靠柱"],
  "transport-scooter": ["scooter", "共享機車與停車格"],
  "transport-hub": ["hub", "單車架、飲水與休憩站"],
  "education-class": ["classroom", "小班座位與教學黑板"],
  "education-teachers": ["teachers", "雙教師講桌與學生座位"],
  "education-admin": ["admin", "精簡行政：文件櫃與減量文件"],
  "education-mediation": ["meeting", "親師第三方圓桌"],
  "education-eap": ["counsel", "教師諮商雙座空間"],
  "education-preschool": ["nursery", "幼兒活動室與園長辦公桌"],
  "education-special": ["access", "無障礙學習坡道"],
  "education-prevention": ["safe", "校園安全守護站"],
  "education-ai": ["computer", "AI 教學螢幕"],
  "education-usr": ["campus", "大學與社區合作廣場"],
  "lunch-law": ["lawbook", "攤開的專法書冊與餐盤"],
  "lunch-farm": ["farm", "在地蔬菜田畦"],
  "lunch-literacy": ["foodclass", "菜圃與食農教學桌"],
  "lunch-price": ["meal", "餐盤與餐費調節刻度"],
  "lunch-subsidy": ["subsidy", "餐盤與補助支持符號"],
  "family-station": ["service", "一站式家庭服務櫃台"],
  "family-hotline": ["phone", "育兒專線電話亭"],
  "family-manager": ["meeting", "個管師與家庭諮詢桌"],
  "family-courses": ["classroom", "親子課程教室"],
  "family-respite": ["nursery", "臨托嬰兒床與遊戲積木"],
  "family-counsel": ["counsel", "家庭心理諮商雙座空間"],
  "family-home": ["homecare", "住宅與到宅服務提箱"],
  "family-night": ["nightcare", "夜間托育床與月亮標誌"],
  "card-culture": ["culturecoin", "印著戲劇面具的金色文化幣，四周是它能使用的地方：小劇場、畫展畫架、獨立書店書攤、兒童電影銀幕"],
  "card-sport": ["court", "運動球場與點數標誌"],
  "card-reading": ["books", "分齡書冊與閱讀禮袋"],
  "card-learning": ["classroom", "家庭共同學習桌"],
  "card-shops": ["shop", "認證小店的條紋雨棚"],
  "card-elders": ["generations", "高低座椅與祖孫閱讀桌"],
  "welfare-elder": ["card", "敬老交通卡與服務閘口"],
  "welfare-respite": ["care", "臨時托老照護床與座椅"],
  "welfare-home": ["homecare", "到宅醫療提箱與住宅"],
  "welfare-hourly": ["clockcare", "時鐘與照護服務站"],
  "welfare-care": ["care", "住宿長照床與扶手"],
  "welfare-shingles": ["vaccine", "疫苗瓶與接種工作台"],
  "welfare-counsel": ["counsel", "心理諮商座椅"],
  "welfare-work": ["workplace", "友善工作空間"],
  "welfare-vaccine": ["vaccine", "兒童疫苗接種工作台"],
  "welfare-child": ["safe", "兒少安全守護站"],
  "welfare-power": ["power", "備援電池與供電設備"],
  "welfare-stairlift": ["stairlift", "樓梯爬梯機與輪椅"],
  "welfare-safety": ["lighting", "安全步道與照明檢視站"],
  "welfare-single": ["phone", "支持專線電話亭"],
  "sport-bus": ["bus", "社區運動接駁小巴"],
  "sport-spots": ["fitness", "社區健身器材"],
  "sport-river": ["river", "河濱步道與休憩植栽"],
  "sport-hub": ["hub", "運動飲水休憩站"],
  "sport-football": ["football", "足球草坪、球門與看台"],
  "sport-huabo": ["arena", "運動中心與弧形屋頂"],
  "sport-access": ["accessgym", "無障礙坡道與性別友善更衣室的運動館"],
  "sport-intern": ["exchange", "海外交流行李與航線地球"],
  "trails-north": ["hikeNorth", "A 字形木屋登山站、松林、步道入口拱門、燈籠串、登山杖架與置物櫃"],
  "trails-east": ["hikeEast", "巨石群、木棧階梯、山頂觀景平台、玻璃立面遊客中心、置物櫃與洗鞋台"],
  "trails-south": ["hikeSouth", "茶園梯田、翹簷茶屋服務站、纜車塔與車廂、登山杖架"],
  "trails-history": ["heritage", "歷史街屋與解說牌"],
  "trails-modern": ["tower", "現代建築與文化路標"],
  "trails-industry": ["factory", "工業遺構、煙囪與步道"],
  "trails-diverse": ["culture", "多元文化交流舞台"],
  "trails-shuttle": ["bus", "捷運接駁小巴"],
  "trails-rights": ["garden", "紀念廣場與步道"],
  "trails-card": ["card", "親子同行卡服務亭"],
  "forest-law": ["law", "樹木與法規冊"],
  "forest-committee": ["forestmeeting", "樹下治理圓桌"],
  "forest-fund": ["forestfund", "樹木維運與基金堆疊"],
  "forest-parks": ["garden", "口袋公園與環狀步道"],
  "forest-twin": ["twin", "實體路樹與數位螢幕"],
  "forest-cool": ["cool", "樹蔭與涼感地圖"],
  "forest-consult": ["forestmeeting", "樹木移除前協作圓桌"],
  "forest-wood": ["wood", "回收原木與再利用木料架"],
  "youth-fund": ["jars", "自存與市府配合的兩個存錢罐（不示金額）"],
  "youth-ai": ["containers", "貨櫃共享工作空間與 AI 筆電吧台"],
  "youth-dream": ["stage", "露天圓夢舞台與紙飛機發射坡"],
  "diplomacy-forum": ["infinityforum", "∞ 形步道交會處的論壇圓桌"],
  "diplomacy-exchange": ["terminal", "出發／抵達雙向閘門與行李"],
  "diplomacy-hoboken": ["democrossing", "抬升斑馬線與行人庇護島示範路口"],
  "diplomacy-talent": ["arrivals", "抵達大廳圖示看板與行李"],
  "hakka-elders": ["bogongcare", "伙房式照護站：禾埕、藍布門簾，長輩與孩子同桌"],
  "hakka-schools": ["sisterschools", "城市學校與客庄學校，中間是互訪小巴"],
  "hakka-points": ["hakkapoints", "藍布遮陽的友善店家、集點螢幕與代幣"],
  "hakka-hiring": ["hiringdesk", "市府服務櫃台、耳機櫃員與加分星章"],
  "hakka-forum": ["hakkaforum", "油桐花棚下的圓桌論壇與小地球"],
};

export function createPolicyModel({ part, top, colors, tree, house, scaffold }) {
  return function build(id, x, z, scale = 0.78, opts = {}) {
    const spec = sceneSpecs[id];
    if (!spec) throw new Error(`Missing policy scene: ${id}`);
    const [kind] = spec,
      C = colors,
      glass = 0x86a8a6,
      wood = 0xb48560,
      green = C.green;
    // A common exhibition scale keeps dense policy tiles legible.

    const p = (g, a, s, c, r) =>
      part(
        g,
        [x + a[0] * scale, top + a[1] * scale, z + a[2] * scale],
        s.map((v) => v * scale),
        c,
        id,
        r,
      );
    const b = (a, s, c = C.cream, r) => p(s[0] * scale > 0.05 && s[1] * scale > 0.05 && s[2] * scale > 0.05 ? "rbox" : "box", a, s, c, r);
    const hb = (a, s, c, r) => p("box", a, s, c, r);
    const glow = (a, s, c) => p("glowbox", a, s, c);
    const bulb = (a, sz, c = 0xfff0c2) => p("glowsphere", a, [sz, sz, sz], c);
    const cy = (a, w, h, c) => p("cylinder", a, [w, h, w], c);
    const sphere = (a, s, c) => p("sphere", a, Array.isArray(s) ? s : [s, s, s], c);
    const ring = (a, s, c, r = [Math.PI / 2, 0, 0]) => p("torus", a, [s, s, s], c, r);
    const person = (xx, zz, h = 0.38) => {
      const shirt = [C.coral, 0x58a6a6, 0xe8c547, 0x6f7fb5, 0xf2a1a1][Math.abs(Math.round((xx * 7 + zz * 13) * 10)) % 5];
      for (const d of [-0.025, 0.025]) p("box", [xx + d, h * 0.16, zz], [0.035, h * 0.32, 0.04], 0x3b3a42);
      p("rbox", [xx, h * 0.5, zz], [0.11, h * 0.38, 0.08], shirt);
      p("sphere", [xx, h * 0.84, zz], [0.12, 0.12, 0.12], [0xf1c7a3, 0xe0ac85, 0xc68863][Math.abs(Math.round(xx * 100)) % 3]);
      // hair shell clearly larger than the head (a near-equal shell let the scalp show through as bald patches)
      const k = Math.abs(Math.round((xx * 31 + zz * 17) * 10));
      const hc = [0x3b2f2a, 0x1f1d22, 0x5a3d2b, 0x2e2522][k % 4];
      p("dome", [xx, h * 0.84 + 0.004, zz - 0.006], [0.134, 0.13, 0.134], hc);
      const st = k % 3;
      if (st === 1) p("sphere", [xx, h * 0.84 + 0.05, zz - 0.04], [0.05, 0.05, 0.05], hc); // bun
      if (st === 2) p("rbox", [xx, h * 0.8, zz - 0.045], [0.11, 0.08, 0.035], hc); // shoulder-length
    };
    const seat = (xx, zz) => {
      b([xx, 0.14, zz], [0.18, 0.06, 0.19], C.coral);
      b([xx, 0.25, zz - 0.08], [0.18, 0.2, 0.04], C.coral);
      for (const d of [-0.06, 0.06]) b([xx + d, 0.06, zz], [0.02, 0.12, 0.12], C.ink);
    };
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
    const roof = (h = 0.67) => {
      for (const xx of [-0.34, 0.34]) b([xx, h / 2, -0.2], [0.035, h, 0.035], C.ink);
      b([0, h, -0.08], [0.8, 0.055, 0.64], C.coral);
    };
    const clock = () => {
      cy([0, 0.38, 0], 0.16, 0.7, C.cream);
      p("cylinder", [0, 0.82, 0.02], [0.45, 0.07, 0.45], C.ink, [Math.PI / 2, 0, 0]);
      p("cylinder", [0, 0.82, 0.063], [0.38, 0.012, 0.38], C.yellow, [Math.PI / 2, 0, 0]);
      b([0, 0.89, 0.076], [0.02, 0.16, 0.012], C.ink);
      b([0.06, 0.82, 0.076], [0.14, 0.02, 0.012], C.ink);
    };
    const cross = (xx, yy, zz) => {
      b([xx, yy, zz], [0.23, 0.06, 0.035], C.coral);
      b([xx, yy, zz], [0.06, 0.23, 0.035], C.coral);
    };
    const book = (xx, yy, zz, col = C.coral) => {
      b([xx, yy, zz], [0.22, 0.3, 0.055], col, [0, 0, -0.12]);
      b([xx + 0.012, yy, zz + 0.034], [0.17, 0.25, 0.013], C.cream, [0, 0, -0.12]);
    };
    const coin = (xx = 0, zz = 0) => {
      for (let j = 0; j < 4; j++) cy([xx, 0.06 + j * 0.045, zz], 0.24, 0.04, C.yellow);
    };
    const plant = (xx, zz, s = 0.45) => tree(x + xx * scale, z + zz * scale, s * scale, id);
    const globe = () => {
      sphere([0, 0.63, 0], [0.43, 0.43, 0.43], glass);
      ring([0, 0.63, 0], 0.5, C.cream, [0, 0, 0.35]);
      ring([0, 0.63, 0], 0.44, C.yellow, [0, Math.PI / 2, 0]);
      cy([0, 0.3, 0], 0.04, 0.3, C.ink);
      cy([0, 0.14, 0], 0.25, 0.04, C.ink);
    };
    const road = () => {
      b([0, 0.035, 0], [0.87, 0.04, 0.68], 0x918780);
      for (let j = 0; j < 4; j++) b([-0.3 + j * 0.2, 0.06, 0], [0.1, 0.01, 0.024], C.yellow);
    };
    const bus = () => {
      b([0, 0.23, 0], [0.68, 0.27, 0.28], C.coral);
      b([0, 0.39, 0], [0.67, 0.05, 0.3], C.cream);
      for (let j = 0; j < 4; j++) b([-0.24 + j * 0.16, 0.29, 0.148], [0.12, 0.12, 0.012], glass);
      b([0.347, 0.29, 0], [0.012, 0.14, 0.22], glass);
      for (const xx of [-0.22, 0.22])
        for (const zz of [-0.15, 0.15]) p("cylinder", [xx, 0.12, zz], [0.14, 0.035, 0.14], C.ink, [Math.PI / 2, 0, 0]);
      b([0.35, 0.17, 0.09], [0.013, 0.04, 0.06], C.yellow);
    };
    const bike = (zz = 0, motor = false) => {
      for (const xx of [-0.2, 0.2]) ring([xx, 0.14, zz], 0.24, C.ink, [0, 0, 0]);
      b([0, 0.18, zz], [0.34, 0.035, 0.035], C.coral, [0, 0, 0.32]);
      b([-0.1, 0.23, zz], [0.025, 0.22, 0.025], C.ink, [0, 0, 0.3]);
      b([0.18, 0.28, zz], [0.025, 0.33, 0.025], C.ink, [0, 0, -0.2]);
      b([-0.09, 0.36, zz], [0.15, 0.04, 0.09], C.ink);
      b([0.23, 0.43, zz], [0.12, 0.025, 0.025], C.ink);
      if (motor) b([0, 0.22, zz], [0.27, 0.17, 0.13], C.yellow);
    };
    const court = (football = false) => {
      b([0, 0.04, 0], [0.92, 0.07, 0.67], green);
      for (const zz of [-0.29, 0.29]) b([0, 0.081, zz], [0.85, 0.012, 0.014]);
      for (const xx of [-0.41, 0, 0.41]) b([xx, 0.081, 0], [0.013, 0.012, 0.6]);
      ring([0, 0.087, 0], 0.22, C.cream);
      for (const xx of [-0.43, 0.43]) {
        b([xx, 0.2, 0], [0.025, 0.025, 0.31]);
        for (const zz of [-0.15, 0.15]) b([xx, 0.14, zz], [0.025, 0.18, 0.025]);
        if (football) for (let j = 0; j < 5; j++) b([xx, 0.14, -0.12 + j * 0.06], [0.012, 0.15, 0.012]);
      }
      if (football) for (let j = 0; j < 3; j++) b([0, 0.08 + j * 0.07, -0.39 - j * 0.05], [0.72, 0.06, 0.05], C.stone);
    };
    const bed = () => {
      b([0, 0.19, 0], [0.31, 0.13, 0.55], C.cream);
      b([0, 0.265, 0.07], [0.32, 0.025, 0.34], C.coral);
      b([0, 0.28, -0.18], [0.23, 0.055, 0.12], C.yellow);
      for (const xx of [-0.18, 0.18]) {
        b([xx, 0.28, 0], [0.025, 0.025, 0.5], C.ink);
        for (const zz of [-0.2, 0.2]) b([xx, 0.16, zz], [0.025, 0.25, 0.025], C.ink);
      }
    };
    const nursery = () => {
      bed();
      for (let j = 0; j < 4; j++) for (const xx of [-0.18, 0.18]) b([xx, 0.35, -0.2 + j * 0.13], [0.025, 0.2, 0.025], C.cream);
      b([-0.18, 0.46, 0], [0.025, 0.03, 0.57], C.cream);
      b([0.18, 0.46, 0], [0.025, 0.03, 0.57], C.cream);
      for (let j = 0; j < 3; j++) b([0.31, 0.08 + j * 0.035, -0.12 + j * 0.13], [0.12, 0.14, 0.12], j % 2 ? C.yellow : C.coral);
    };
    const meeting = () => {
      cy([0, 0.27, 0], 0.42, 0.04, wood);
      cy([0, 0.14, 0], 0.04, 0.26, C.ink);
      for (const [xx, zz] of [
        [-0.3, 0],
        [0.3, 0],
        [0, -0.3],
      ]) {
        seat(xx, zz);
        person(xx, zz, 0.38);
      }
    };
    const farm = () => {
      b([0, 0.04, 0], [0.72, 0.08, 0.63], wood);
      for (let row = 0; row < 3; row++) {
        b([-0.24 + row * 0.24, 0.09, 0], [0.08, 0.06, 0.58], 0x715944);
        for (let j = 0; j < 4; j++) sphere([-0.24 + row * 0.24, 0.16, -0.23 + j * 0.15], [0.15, 0.17, 0.13], green);
      }
    };
    const river = () => {
      b([0, 0.04, 0], [0.9, 0.045, 0.3], glass);
      for (let j = 0; j < 4; j++) b([-0.3 + j * 0.2, 0.067, 0.015], [0.1, 0.008, 0.012], C.cream);
      b([0, 0.065, 0.27], [0.9, 0.055, 0.19], C.stone);
    };
    const classroom = (dual = false) => {
      b([0, 0.32, -0.3], [0.73, 0.49, 0.04], green);
      b([0, 0.56, -0.27], [0.77, 0.025, 0.06], wood);
      for (const xx of [-0.18, 0.18])
        for (const zz of [0.08, 0.32]) {
          b([xx, 0.21, zz], [0.23, 0.035, 0.15], wood);
          b([xx, 0.11, zz], [0.04, 0.2, 0.06]);
          seat(xx, zz + 0.12);
        }
      person(-0.2, -0.12);
      if (dual) person(0.2, -0.12);
    };
    if (opts.plot) p("box", [0, 0.022, 0], [opts.plotW || 0.98, 0.03, opts.plotD || 0.84], opts.plot);
    if (extraModel(kind, { b, hb, cy, sphere, ring, p, glow, bulb, seat, person, plant, C, glass, wood, green })) return spec;
    switch (kind) {
      case "renewal":
        for (const xx of [-0.3, 0.3]) for (const zz of [-0.25, 0.25]) b([xx, 0.5, zz], [0.03, 1, 0.03], C.ink);
        for (let j = 0; j < 4; j++) {
          b([0, 0.08 + j * 0.3, 0], [0.65, 0.035, 0.55]);
          b([0, 0.22 + j * 0.3, 0.27], [0.62, 0.025, 0.025], C.coral, [0, 0, 0.25]);
        }
        // green safety netting wraps the frame (no countable floors)
        p("box", [0, 0.56, 0.285], [0.66, 1.0, 0.012], 0x7fa38a);
        p("box", [0.33, 0.56, 0], [0.012, 1.0, 0.56], 0x6f957b);
        p("box", [-0.33, 0.56, 0], [0.012, 1.0, 0.56], 0x6f957b);
        for (let j = 0; j < 6; j++) hb([0, 0.12 + j * 0.18, 0.293], [0.66, 0.006, 0.004], 0x5f856b);
        b([0.4, 0.72, -0.18], [0.06, 1.44, 0.06], C.coral);
        b([0.12, 1.44, -0.18], [1, 0.05, 0.06], C.coral);
        b([-0.3, 1.25, -0.18], [0.02, 0.38, 0.02], C.ink);
        b([0.48, 1.36, -0.18], [0.19, 0.14, 0.17], C.ink);
        break;
      case "office":
      case "computer":
      case "research":
      case "laptop":
      case "talent":
        desk();
        screen();
        seat(0, 0.28);
        if (kind === "office") {
          b([-0.38, 0.35, -0.3], [0.045, 0.7, 0.6]);
          b([0, 0.4, -0.32], [0.7, 0.6, 0.04], glass);
          plant(0.34, 0.24, 0.36);
        } else if (kind === "research") {
          book(-0.32, 0.22, -0.14);
          b([0.31, 0.27, -0.1], [0.16, 0.5, 0.18], C.stone);
        } else if (kind === "laptop") coin(0.34, 0.2);
        else if (kind === "talent") {
          ring([0.3, 0.66, -0.12], 0.23, C.coral, [0, 0, 0]);
        }
        break;
      case "clock":
        clock();
        break;
      case "clockcare":
        clock();
        seat(-0.31, 0.2);
        seat(0.31, 0.2);
        cross(0.32, 0.5, -0.12);
        break;
      case "counsel":
        seat(-0.25, 0);
        seat(0.25, 0);
        cy([0, 0.2, 0.12], 0.18, 0.035, wood);
        plant(0.3, -0.27, 0.45);
        b([0, 0.32, -0.36], [0.82, 0.6, 0.04], C.cream);
        break;
      case "award":
        cy([0, 0.08, 0], 0.65, 0.12, C.coral);
        cy([0, 0.29, 0], 0.055, 0.3, wood);
        p("cone", [0, 0.5, 0], [0.32, 0.3, 0.32], C.yellow, [Math.PI, 0, 0]);
        for (const xx of [-0.19, 0.19]) ring([xx, 0.48, 0], 0.18, C.yellow, [0, 0, 0]);
        break;
      case "clinic":
      case "care":
        bed();
        b([0.3, 0.24, -0.12], [0.15, 0.43, 0.17]);
        cross(0.3, 0.37, -0.025);
        if (kind === "care") seat(-0.32, 0.1);
        break;
      case "access":
        b([-0.18, 0.16, 0], [0.4, 0.3, 0.57]);
        b([0.26, 0.095, 0.05], [0.5, 0.04, 0.32], C.stone, [0, 0, 0.36]);
        ring([-0.18, 0.4, 0.15], 0.27, C.ink, [0, 0, 0]);
        b([-0.18, 0.48, 0.1], [0.18, 0.06, 0.15], C.coral);
        b([-0.27, 0.57, 0.1], [0.04, 0.22, 0.16], C.coral);
        b([0.16, 0.25, 0.25], [0.63, 0.025, 0.025], C.ink, [0, 0, 0.36]);
        break;
      case "garden":
        ring([0, 0.04, 0], 0.68, C.stone);
        plant(0, -0.1, 0.6);
        seat(0.28, 0.22);
        break;
      case "safe":
        roof();
        b([0, 0.32, -0.28], [0.52, 0.54, 0.045]);
        ring([0, 0.43, -0.24], 0.3, C.coral, [0, 0, 0]);
        person(-0.15, 0.14);
        person(0.14, 0.15, 0.26);
        break;
      case "crossing":
        road();
        for (let j = 0; j < 6; j++) b([-0.26 + j * 0.1, 0.065, 0.13], [0.04, 0.012, 0.35]);
        for (const xx of [-0.34, 0.34]) {
          b([xx, 0.27, -0.26], [0.06, 0.5, 0.06]);
          b([xx, 0.52, -0.26], [0.12, 0.12, 0.04], C.yellow);
        }
        b([0, 0.57, -0.26], [0.77, 0.1, 0.08], C.coral);
        break;
      case "bus":
        road();
        bus();
        break;
      case "busstop":
        bus();
        for (const xx of [-0.34, 0.34]) b([xx, 0.3, -0.28], [0.025, 0.6, 0.025]);
        b([0, 0.61, -0.28], [0.85, 0.04, 0.29], C.coral);
        b([0, 0.34, -0.4], [0.7, 0.4, 0.025], glass);
        break;
      case "bridge":
        river();
        b([0, 0.3, 0], [0.85, 0.07, 0.26], C.cream);
        for (const xx of [-0.32, 0.32]) b([xx, 0.18, 0], [0.065, 0.28, 0.21], C.stone);
        for (const zz of [-0.15, 0.15]) {
          b([0, 0.48, zz], [0.87, 0.025, 0.025], C.coral);
          for (let j = 0; j < 7; j++) b([-0.39 + j * 0.13, 0.39, zz], [0.02, 0.18, 0.02], C.coral);
        }
        break;
      case "bike":
      case "scooter":
        road();
        bike(0.1, kind === "scooter");
        for (const xx of [-0.3, 0, 0.3]) {
          b([xx, 0.17, -0.22], [0.06, 0.3, 0.08], C.cream);
          b([xx, 0.3, -0.22], [0.08, 0.07, 0.1], C.yellow);
        }
        break;
      case "hub":
        roof();
        bike(0.19);
        b([-0.25, 0.21, -0.21], [0.14, 0.4, 0.14], glass);
        cy([-0.25, 0.42, -0.21], 0.18, 0.025, C.cream);
        seat(0.23, -0.15);
        break;
      case "classroom":
      case "teachers":
        classroom(kind === "teachers");
        break;
      case "meeting":
      case "service":
        meeting();
        if (kind === "service") {
          b([0, 0.25, 0.29], [0.72, 0.4, 0.15], C.cream);
          b([0, 0.48, 0.29], [0.8, 0.045, 0.22], C.coral);
        }
        break;
      case "nursery":
      case "nightcare":
        nursery();
        if (kind === "nightcare") {
          b([-0.3, 0.45, -0.27], [0.025, 0.9, 0.025], C.ink);
          ring([-0.3, 0.86, -0.26], 0.26, C.yellow, [0, 0, 0]);
          sphere([-0.25, 0.9, -0.25], [0.17, 0.17, 0.05], C.cream);
        }
        break;
      case "campus":
        for (const xx of [-0.3, 0.3]) {
          b([xx, 0.26, 0], [0.22, 0.5, 0.36]);
          b([xx, 0.53, 0], [0.27, 0.06, 0.42], C.coral);
        }
        b([0, 0.44, -0.12], [0.42, 0.08, 0.2]);
        person(0, 0.2);
        break;
      case "kitchen":
        b([0, 0.26, -0.17], [0.82, 0.46, 0.28], C.cream);
        b([0, 0.51, -0.17], [0.88, 0.035, 0.32], C.ink);
        for (const xx of [-0.23, 0.1]) {
          cy([xx, 0.57, -0.17], 0.18, 0.1, C.stone);
          cy([xx, 0.63, -0.17], 0.19, 0.025, C.cream);
        }
        b([0, 0.9, -0.17], [0.82, 0.15, 0.35], C.stone);
        b([0, 1.02, -0.17], [0.14, 0.12, 0.14], C.stone);
        cy([0.26, 0.08, 0.22], 0.26, 0.025, C.cream);
        break;
      case "farm":
        farm();
        break;
      case "foodclass":
        farm();
        desk(0, 0.3);
        book(0, 0.43, 0.3, green);
        break;
      case "meal":
      case "subsidy":
        b([0, 0.12, 0], [0.74, 0.1, 0.49], C.stone);
        for (const xx of [-0.22, 0, 0.22]) {
          cy([xx, 0.18, 0], 0.2, 0.03, C.cream);
          sphere([xx, 0.22, 0], [0.14, 0.08, 0.14], xx === 0 ? green : C.yellow);
        }
        coin(0.29, -0.26);
        if (kind === "meal") {
          b([-0.3, 0.4, -0.24], [0.07, 0.6, 0.07], C.coral);
          for (let j = 0; j < 4; j++) b([-0.24, 0.22 + j * 0.13, -0.24], [0.12, 0.02, 0.025], C.ink);
        }
        break;
      case "homecare":
        house(x - 0.08, z, 0.4, 0.4, id);
        b([0.32, 0.14, 0.24], [0.28, 0.24, 0.13]);
        ring([0.32, 0.29, 0.24], 0.13, C.ink, [0, 0, 0]);
        cross(0.32, 0.15, 0.315);
        break;
      case "phone":
        roof(0.8);
        b([0, 0.37, -0.16], [0.35, 0.6, 0.12], C.yellow);
        b([0, 0.48, -0.087], [0.23, 0.16, 0.015], glass);
        for (const xx of [-0.11, 0.11]) b([xx, 0.31, -0.06], [0.065, 0.18, 0.06], C.ink);
        b([0, 0.27, -0.06], [0.22, 0.05, 0.06], C.ink);
        break;
      case "culture":
        b([0, 0.09, 0], [0.85, 0.17, 0.6], wood);
        for (const xx of [-0.35, 0.35]) b([xx, 0.43, -0.23], [0.14, 0.65, 0.1], C.coral);
        b([0, 0.77, -0.23], [0.84, 0.1, 0.13], C.coral);
        person(0, 0);
        break;
      case "court":
      case "football":
        court(kind === "football");
        break;
      case "books":
      case "law":
        for (let j = 0; j < 3; j++) book(-0.24 + j * 0.22, 0.22, 0, j % 2 ? C.yellow : C.coral);
        if (kind === "law") plant(0.22, -0.2, 0.6);
        else {
          b([0, 0.16, 0.25], [0.4, 0.28, 0.14], wood);
          ring([0, 0.34, 0.25], 0.2, C.ink, [0, 0, 0]);
        }
        break;
      case "shop":
        b([0, 0.26, 0], [0.64, 0.5, 0.44]);
        b([0, 0.3, 0.23], [0.48, 0.28, 0.02], glass);
        for (let j = 0; j < 6; j++) b([-0.3 + j * 0.12, 0.54, 0.15], [0.12, 0.045, 0.47], j % 2 ? C.cream : C.coral, [0.18, 0, 0]);
        sphere([0.22, 0.68, 0.14], [0.14, 0.14, 0.05], C.yellow);
        break;
      case "generations":
        desk();
        seat(-0.27, 0.2);
        seat(0.26, 0.2);
        person(-0.27, 0.2, 0.44);
        person(0.26, 0.2, 0.27);
        book(0, 0.44, 0);
        break;
      case "card":
        b([0, 0.42, 0], [0.7, 0.45, 0.055], C.yellow, [0, 0, -0.15]);
        b([-0.19, 0.46, 0.04], [0.12, 0.11, 0.025], C.coral);
        for (let j = 0; j < 2; j++) b([0.12, 0.4 + j * 0.07, 0.04], [0.26, 0.02, 0.015], C.ink);
        b([0, 0.08, 0], [0.64, 0.13, 0.23], C.stone);
        break;
      case "vaccine":
        desk();
        cy([-0.15, 0.46, 0], 0.17, 0.3, glass);
        cy([-0.15, 0.63, 0], 0.18, 0.06, C.coral);
        b([-0.15, 0.48, 0.09], [0.12, 0.1, 0.015], C.cream);
        b([0.2, 0.47, 0], [0.045, 0.3, 0.045], C.cream, [0, 0, -0.25]);
        b([0.15, 0.69, 0], [0.02, 0.19, 0.02], C.ink, [0, 0, -0.25]);
        cross(-0.15, 0.49, 0.106);
        break;
      case "power":
        for (const xx of [-0.2, 0.2]) {
          b([xx, 0.3, 0], [0.28, 0.55, 0.32], C.ink);
          b([xx, 0.6, 0], [0.12, 0.06, 0.15], C.stone);
          b([xx, 0.35, 0.17], [0.16, 0.3, 0.02], C.yellow);
        }
        b([0, 0.1, 0.27], [0.7, 0.025, 0.025], C.coral);
        break;
      case "lighting":
        road();
        for (const xx of [-0.3, 0.3]) {
          b([xx, 0.4, -0.2], [0.025, 0.8, 0.025], C.ink);
          b([xx, 0.8, -0.13], [0.22, 0.035, 0.22], C.yellow);
          cy([xx, 0.068, 0.1], 0.28, 0.01, C.yellow);
        }
        break;
      case "fitness":
        for (const xx of [-0.28, 0.28]) b([xx, 0.32, 0], [0.045, 0.64, 0.045], C.coral);
        b([0, 0.65, 0], [0.62, 0.045, 0.045], C.ink);
        b([0, 0.24, 0.24], [0.5, 0.06, 0.16], wood);
        person(0, -0.05);
        break;
      case "river":
        river();
        plant(-0.28, -0.25, 0.48);
        seat(0.24, 0.3);
        break;
      case "arena":
        court();
        p("dome", [0, 0.44, -0.1], [0.92, 0.62, 0.66], C.cream);
        for (const xx of [-0.36, 0.36]) b([xx, 0.25, -0.1], [0.045, 0.5, 0.045], C.coral);
        break;
      case "exchange":
      case "forum":
        globe();
        if (kind === "forum") {
          meeting();
        } else {
          b([0.3, 0.22, 0.2], [0.22, 0.35, 0.14], C.coral);
          ring([0.3, 0.43, 0.2], 0.12, C.ink, [0, 0, 0]);
          person(-0.3, 0.1);
        }
        break;
      case "mountain": {
        // trailhead hiking-service centre: timber lodge with a gable roof and big windows, a trail gate arch
        // opening onto a zig-zag stone path up a wooded slope, gear-rental rack (trekking poles), lockers,
        // a boot-wash basin and a trail map board. Variant by centre: north = pines, east = city view deck,
        // south = tea terraces.
        const variant = id.endsWith("north") ? 0 : id.endsWith("east") ? 1 : 2;
        // wooded slope behind (low, irregular, not a stacked cone)
        p("leaf", [-0.18, 0.12, -0.3], [0.86, 0.34, 0.44], 0x8fa67a, [0.2, 0.4, 0]);
        p("leaf", [0.22, 0.1, -0.34], [0.6, 0.28, 0.38], 0x9cb684, [0, 1.1, 0.1]);
        p("ico", [-0.36, 0.2, -0.36], [0.24, 0.2, 0.2], 0xb7a993);
        if (variant === 0) for (const [tx, tz] of [[-0.42, -0.22], [-0.05, -0.42], [0.32, -0.36]]) { cy([tx, 0.18, tz], 0.03, 0.12, 0x7a5d44); p("cone6", [tx, 0.33, tz], [0.16, 0.3, 0.16], 0x5f826c); }
        if (variant === 2) for (let r = 0; r < 3; r++) b([0.18, 0.05 + r * 0.06, -0.18 - r * 0.07], [0.5 - r * 0.08, 0.05, 0.08], [0x93ad74, 0x86a26a][r % 2]);
        // zig-zag stone trail up the slope
        for (let k = 0; k < 6; k++) p("box", [-0.3 + (k % 2) * 0.16, 0.05 + k * 0.045, -0.06 - k * 0.055], [0.16, 0.025, 0.07], 0xd8ccba, [0, k % 2 ? -0.5 : 0.5, 0]);
        // trail gate arch with sign
        for (const sx of [-0.42, -0.2]) cy([sx, 0.17, 0.02], 0.025, 0.34, 0x8a6a4e);
        b([-0.31, 0.35, 0.02], [0.3, 0.04, 0.05], 0x8a6a4e);
        b([-0.31, 0.29, 0.03], [0.18, 0.06, 0.012], 0x5f826c);
        // timber lodge
        b([0.2, 0.16, 0.12], [0.42, 0.3, 0.28], 0xc49a6c);
        for (let k = 0; k < 4; k++) hb([0.2, 0.06 + k * 0.07, 0.262], [0.42, 0.008, 0.006], 0xa77a55);
        p("prism", [0.2, 0.38, 0.12], [0.38, 0.5, 0.3], variant === 1 ? 0x3e7c8c : C.coral, [-Math.PI / 2, 0, Math.PI / 2]);
        glow([0.12, 0.17, 0.264], [0.14, 0.12, 0.008], 0xfff1c8);
        hb([0.3, 0.12, 0.264], [0.07, 0.17, 0.008], C.ink);
        // porch deck + sign board over the door
        b([0.2, 0.025, 0.32], [0.46, 0.03, 0.1], 0xb48560);
        b([0.2, 0.33, 0.272], [0.22, 0.05, 0.01], 0xfff8ee);
        // gear rental rack with trekking poles and a backpack
        b([0.46, 0.1, 0.36], [0.03, 0.18, 0.12], 0x8a6a4e);
        for (let k = 0; k < 4; k++) p("cylinder", [0.44 - k * 0.012, 0.15, 0.31 + k * 0.03], [0.008, 0.26, 0.008], [0x3e7c8c, C.coral, 0xe8c547, 0x3b3a42][k], [0.12, 0, 0.1]);
        b([0.47, 0.07, 0.43], [0.06, 0.09, 0.05], 0xdb6a41);
        // lockers + boot-wash basin with tap
        for (let k = 0; k < 3; k++) b([-0.04 + k * 0.07, 0.11, 0.28], [0.06, 0.2, 0.05], [0x5f9aa6, 0x7aa0b0, 0x5f9aa6][k]);
        b([-0.1, 0.05, 0.42], [0.18, 0.06, 0.08], 0xd2c3ad);
        b([-0.1, 0.075, 0.42], [0.14, 0.01, 0.05], 0x8fc6d0);
        cy([-0.1, 0.12, 0.38], 0.012, 0.08, 0x8a8a90);
        // trail map board
        for (const sx of [-0.46, -0.3]) cy([sx, 0.1, 0.32], 0.012, 0.2, C.ink);
        b([-0.38, 0.2, 0.32], [0.18, 0.11, 0.012], 0xf6efe3);
        for (let k = 0; k < 3; k++) hb([-0.38, 0.17 + k * 0.025, 0.327], [0.12 - k * 0.03, 0.006, 0.003], [0x5f826c, C.coral, 0x3e7c8c][k]);
        if (variant === 1) { // view deck toward the city
          for (const sx of [0.34, 0.46]) cy([sx, 0.22, -0.1], 0.015, 0.44, 0x8a6a4e);
          b([0.4, 0.44, -0.1], [0.2, 0.025, 0.14], 0xb48560);
        }
        person(-0.2, 0.2, 0.34);
        break;
      }
      case "heritage":
        house(x, z, 0.48, 0.45, id);
        b([-0.33, 0.2, 0.22], [0.14, 0.26, 0.035], wood);
        break;
      case "tower":
        for (let j = 0; j < 5; j++) b([0, 0.11 + j * 0.2, 0], [0.42 - j * 0.055, 0.18, 0.4 - j * 0.055], j % 2 ? glass : C.cream);
        b([0, 1.12, 0], [0.025, 0.22, 0.025], C.ink);
        break;
      case "factory":
        b([0, 0.23, 0], [0.62, 0.42, 0.42], wood);
        cy([-0.22, 0.54, -0.12], 0.11, 0.9, wood);
        for (const xx of [-0.15, 0.1, 0.27]) b([xx, 0.29, 0.22], [0.11, 0.15, 0.012], glass);
        break;
      case "forestmeeting":
        plant(0, -0.23, 0.75);
        meeting();
        break;
      case "forestfund":
        plant(-0.18, -0.1, 0.7);
        coin(0.24, 0.2);
        break;
      case "twin":
        plant(-0.25, 0, 0.65);
        desk(0.25, 0.06);
        screen(0.25, 0.06);
        break;
      case "cool":
        plant(-0.2, -0.12, 0.8);
        b([0.15, 0.14, 0.2], [0.55, 0.035, 0.42], glass, [0.2, 0, 0]);
        for (let j = 0; j < 3; j++) b([0.02 + j * 0.13, 0.16, 0.2], [0.045, 0.012, 0.4], C.yellow, [0.2, 0, 0]);
        break;
      case "wood":
        for (let j = 0; j < 5; j++) p("cylinder", [-0.24 + j * 0.12, 0.13, 0], [0.11, 0.62, 0.11], wood, [Math.PI / 2, 0, 0]);
        for (const xx of [-0.3, 0.3]) b([xx, 0.26, 0], [0.035, 0.45, 0.65], C.ink);
        break;
      case "fund":
        coin(-0.23, 0);
        coin(0, 0.15);
        coin(0.23, 0);
        b([0, 0.36, -0.15], [0.7, 0.28, 0.05], C.coral);
        break;
      case "launch":
        cy([0, 0.13, 0], 0.64, 0.22, C.stone);
        cy([0, 0.51, 0], 0.24, 0.55, C.cream);
        p("cone", [0, 0.89, 0], [0.25, 0.25, 0.25], C.coral);
        ring([0, 0.55, 0.13], 0.12, glass, [0, 0, 0]);
        for (const xx of [-0.16, 0.16]) b([xx, 0.32, 0], [0.09, 0.27, 0.11], C.coral, [0, 0, xx]);
        break;
      default:
        throw new Error(`Unimplemented model ${kind}`);
    }
    return spec;
  };
}
