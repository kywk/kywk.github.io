import { extraModel } from "./models-extra.js?v=20261030-2";
// Symbolic policy miniatures. These are not proposed building designs or locations.
// Explicit IDs prevent array ordering from silently changing a policy's visual meaning.
export const sceneSpecs = {
  // 🏔️ Island 03: trails (極境高山與冰原島)
  "trails-north": ["snowpeak", "喜馬拉雅安娜普納雪峰 5,416M、冰川山脊、五色經幡與登山山屋"],
  "trails-history": ["volcano", "冰島極圈火山口、熔岩地熱、瀑布與極光觀測穹頂"],
  "trails-industry": ["glacier", "西伯利亞貝加爾湖藍冰洞、透明冰晶拱門與氣墊船"],
  "trails-east": ["alpineTorii", "日本劍岳岩稜鎖場、富士山雪頂與山頂朱紅鳥居"],
  "trails-south": ["highlandMonastery", "四川川西高原紅房子群、雪山草甸與沙巴神山花崗岩峰"],

  // 🏜️ Island 04: diplomacy (荒漠古文明與世界旅圖島)
  "diplomacy-forum": ["pyramids", "埃及吉薩三大金字塔、人面獅身像、尼羅河綠洲與棕櫚樹"],
  "diplomacy-hoboken": ["moai", "智利復活節島摩艾石像群、百內雙角峰與阿塔卡馬星空"],
  "diplomacy-exchange": ["silkroad", "新疆天山雪嶺、賽里木湖藍水、喀什伊斯蘭圓頂古城與絲路駝隊"],
  "diplomacy-talent": ["euroTrain", "歐亞跨國高鐵列車、拱橋與世界旅圖航站"],

  // 🌲 Island 05: forest (台灣山林與寶島走讀島)
  "forest-law": ["baiyuePeak", "台灣百岳奇萊主北陡峭翠綠山峰、壯闊雲海與三角點標柱"],
  "forest-parks": ["alishanTrain", "阿里山神木群、紅色森林小火車與花東山海鐵道"],
  "forest-consult": ["islandCoast", "澎湖柱狀玄武岩海崖、雙心石滬與白色漁翁島燈塔"],
  "forest-wood": ["mountainCamp", "高山森林野營基地、雙峰帳篷、營火與輕量化裝備架"],

  // 🏃 Island 06: sport (跑者耐力與馬拉松島)
  "sport-bus": ["fujiMarathon", "日本富士山河口湖馬拉松賽道、紅葉楓林與完賽跑者"],
  "sport-hub": ["marathonTrack", "42.195K 國際馬拉松終點拱門、紅土跑道與計時鐘"],
  "sport-river": ["riverTrail", "河濱長距離配速綠道、跨河單車橋與山徑越野坡"],
  "sport-spots": ["runnerGear", "跑者能量補給站、碳板跑鞋展示台與運動恢復中心"],

  // 📚 Island 07: card (書房與深夜電影院島)
  "card-reading": ["grandLibrary", "巨型攤開精裝書冊雕塑、多層原木書牆與溫暖閱讀燈"],
  "card-learning": ["historyRotunda", "社科歷史圓頂圖書廳、地球儀與知識卡片索引櫃"],
  "card-sport": ["natureBooks", "山岳與自然探險木造書閣、松樹庭園與戶外閱讀席"],
  "card-elders": ["midnightCinema", "深夜星空露天電影院、發光巨型銀幕、35mm 放映機與紅絲絨座席"],

  // ☕ Island 08: family (生活駭客與日常系統島)
  "family-station": ["zenGarden", "Way 2 kywk 枯山水庭園、日式木造茶室與指南針日晷"],
  "family-hotline": ["habitMatrix", "Habit Tracking 3D 綠格打卡矩陣牆與量化儀表板"],
  "family-manager": ["makerLab", "Weekend Project 週末造物工坊、3D 印表機與極客工作台"],
  "family-respite": ["coffeeStudio", "手沖咖啡玻璃屋、巨型 V60 濾杯雕塑與極簡書桌"],

  // 🏛️ Island 01: civil (核心中樞島 · Obsidian Vault)
  "civil-office": ["obsidianCitadel", "Obsidian 雙向連結紫水晶聖殿、發光知識圖譜節點與中樞大樓"],
  "civil-flex": ["clocktower", "Slug 自動推導與中英路由鐘塔"],
  "civil-award": ["cicdPipeline", "GitHub Actions 自動化部署火箭發射台與綠燈管線"],
  "civil-health": ["qualityGate", "內容品質巡檢雷達與受保護筆記盾牌守衛站"],
  "civil-ai": ["aipod", "Multi-Agent AI 協作圓頂艙"],

  // 🧪 Island 02: institute (開源造物島 · Side Projects 實驗室)
  "institute-research": ["geoMapDome", "Geo Story Map 3D 立體等高線地形圓頂館與 GPX 航跡光帶"],
  "institute-access": ["tuiTerminal", "Vault Feed Reader 復古綠光終端機巨石與 RSS 訊號塔"],
  "institute-dementia": ["kanbanWall", "Obsidian Kanban 3D 彩色看板牆與任務卡片流"],
  "institute-child": ["albumPrism", "Album Blog 光影稜鏡展館與瀑布流相框矩陣"],

  // ⚙️ Island 09: youth (雲原生與全端架構島)
  "youth-fund": ["dockerStack", "Docker 藍鯨貨櫃叢集與微服務甲板"],
  "youth-ai": ["apiGateway", "Kong API Gateway 流量閘道拱門與多語言引擎"],
  "youth-dream": ["serverCluster", "高可用資料庫圓柱叢集與資安防線機房"],

  // ⚙️ Island 10: education (演算法與專案工坊島)
  "education-class": ["projectWorkshop", "52 Projects 敏捷開發工坊與程式碼看板"],
  "education-teachers": ["algoTree", "BootCamp 3D 發光二元樹與圖論演算法雕塑"],
  "education-ai": ["ragCube", "LLM 提示詞工程與 RAG 向量神經魔方"],
  "education-usr": ["codeForge", "Clean Code 重構熔爐與開源套件封裝站"],

  // ⚙️ Island 11: transport (極客工具與 HomeLab 島)
  "transport-hub": ["homelabRig", "HomeLab 自託管伺服器機櫃、NAS 陣列與三螢幕工作站"],
  "transport-school": ["mechKeyboard", "OhMyUtils 巨型客製化機械鍵盤雕塑與 CLI 終端機"],
  "transport-bus": ["gitSwitchyard", "Git 分支合併鐵道調度場與 Linux 企鵝塔"],
  "transport-scooter": ["macStudio", "Macintosh 鋁合金極簡工作站與黑蘋果硬體核心"],

  // 🎞️ Island 12: hakka (光影畫廊島 · Photo Album)
  "hakka-elders": ["cameraPavilion", "巨型復古單眼／雙眼相機典藏館、大光圈鏡頭與快門鈕"],
  "hakka-schools": ["photoWall", "Pinterest 響應式瀑布流戶外畫廊與燈箱展牆"],
  "hakka-points": ["filmArch", "35mm 底片膠卷拱門與 2004–2026 年份時光軸"],
  "hakka-forum": ["lightStudio", "Golden Hour 黃金時刻追光燈塔與暗房沖印室"],

  // 🎞️ Island 13: welfare (歲月長河島 · Life Blog)
  "welfare-elder": ["hourglassStele", "2008–2026 十八載巨型時光沙漏與年度回顧紀念碑"],
  "welfare-respite": ["timeRiver", "Now or Never 歲月長河、朱紅拱橋與垂柳岸"],
  "welfare-home": ["woodsCabin", "山里山裡：松林靜思原木小屋與溫暖壁爐煙囪"],
  "welfare-care": ["journalMonument", "五十萬字鋼筆手稿紀念碑與異國夜車咖啡座"],

  // 🎞️ Island 14: lunch (技術情報與衝浪島 · News Log)
  "lunch-farm": ["radarTower", "Surfing 新知碟型雷達塔與即時情報中心"],
  "lunch-literacy": ["surfWave", "技術衝浪巨浪雕塑、衝浪板與網站改版里程碑"],
  "lunch-price": ["calcPavilion", "Calculators 互動計算機與數位算盤涼亭"],
  "lunch-subsidy": ["cloudUplink", "雲端 IDE 衛星發射站與行動部署天線"],

  // --- Legacy fallback definitions ---
  "civil-eap": ["kiosk", "EAP 點數自選亭"],
  "renewal-scaffold": ["renewal", "施工鷹架與塔吊"],
  "transport-bridge": ["bridge", "河道、自行車橋與護欄"],
  "transport-maintain": ["rideboard", "河濱車道與每季評分看板"],
  "transport-bike": ["bike", "自行車與充電停靠柱"],
  "education-admin": ["admin", "精簡行政：文件櫃與減量文件"],
  "education-mediation": ["meeting", "親師第三方圓桌"],
  "education-eap": ["counsel", "教師諮商雙座空間"],
  "education-preschool": ["nursery", "幼兒活動室與園長辦公桌"],
  "education-special": ["access", "無障礙學習坡道"],
  "education-prevention": ["safe", "校園安全守護站"],
  "lunch-law": ["lawbook", "攤開的專法書冊與餐盤"],
  "family-courses": ["classroom", "親子課程教室"],
  "family-counsel": ["counsel", "家庭心理諮商雙座空間"],
  "family-home": ["homecare", "住宅與到宅服務提箱"],
  "family-night": ["nightcare", "夜間托育床與月亮標誌"],
  "card-culture": ["culturecoin", "文化幣與多功能展演空間"],
  "card-shops": ["shop", "認證小店的條紋雨棚"],
  "welfare-hourly": ["clockcare", "時鐘與照護服務站"],
  "welfare-shingles": ["vaccine", "疫苗瓶與接種工作台"],
  "welfare-counsel": ["counsel", "心理諮商座椅"],
  "welfare-work": ["workplace", "友善工作空間"],
  "welfare-vaccine": ["vaccine", "兒童疫苗接種工作台"],
  "welfare-child": ["safe", "兒少安全守護站"],
  "welfare-power": ["power", "備援電池與供電設備"],
  "welfare-stairlift": ["stairlift", "樓梯爬梯機與輪椅"],
  "welfare-safety": ["lighting", "安全步道與照明檢視站"],
  "welfare-single": ["phone", "支持專線電話亭"],
  "sport-football": ["football", "足球草坪、球門與看台"],
  "sport-huabo": ["arena", "運動中心與弧形屋頂"],
  "sport-access": ["accessgym", "無障礙運動館"],
  "sport-intern": ["exchange", "海外交流行李與地球"],
  "trails-modern": ["tower", "現代建築與文化路標"],
  "trails-diverse": ["culture", "多元文化交流舞台"],
  "trails-shuttle": ["bus", "捷運接駁小巴"],
  "trails-rights": ["garden", "紀念廣場與步道"],
  "trails-card": ["card", "親子同行卡服務亭"],
  "forest-committee": ["forestmeeting", "樹下治理圓桌"],
  "forest-fund": ["forestfund", "樹木維運與基金堆疊"],
  "forest-twin": ["twin", "實體路樹與數位螢幕"],
  "forest-cool": ["cool", "樹蔭與涼感地圖"],
  "hakka-hiring": ["hiringdesk", "市府服務櫃台"],
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
    if (extraModel(kind, { b, hb, cy, sphere, ring, p, glow, bulb, seat, person, plant, desk, screen, C, glass, wood, green })) return spec;
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
