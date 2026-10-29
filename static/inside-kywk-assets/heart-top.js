/*
 * HEART 政策島：跟島主 kywk 切磋陀螺。
 *
 * 點政策島上的 Puma 會打開他的角色介紹卡（app.js 的 pumaCard，頭像格帶 .puma-tile），
 * 這支腳本看到這張卡就在裡面放一顆入口按鈕，按下開出二維浮層小遊戲。只碰 DOM，
 * 不碰政策島的 three.js 或 heart-me.js。一局的規則在 heart-top-game.js。
 *
 * 浮層只能用關閉按鈕收起，不在 window／document 上掛鍵盤 listener：heart-me.js 與
 * app.js 都拿 Esc 處理自己的狀態，這裡不跟它們搶。
 */
import { track } from "./analytics.js?v=20261022-4";
import {
  pullTension, pullSpeed, pullQuality, keyTension, spinSeconds, pumaSeconds, outcome, spinState, readBest, saveBest,
  aimPosition, hitQuality, collide, PUMA_X,
} from "./heart-top-game.js?v=20261024-2";
import { createTopSound, readSoundOn, saveSoundOn } from "./heart-top-sound.js?v=20261024-3";

const PUMA_FACE = '/img/logo.svg';
const STAGE_W = 360;
const STAGE_H = 200;
const MAX_TURNS_PER_SECOND = 9;
const AIM_START = aimPosition(0);
/** jsdom 之類量不到寬度時，拉繩區當作跟舞台一樣寬。 */
const ROPE_FALLBACK_PX = STAGE_W;
/** 拉滿程度不到這個值就往左拉，不算甩出，避免手指抖一下就出手。 */
const MIN_THROW_TENSION = 0.1;
/** 一顆陀螺畫出來的寬度，換算成 0 到 1 的地面座標（腰寬約 72px ÷ 舞台 360px）。 */
const TOP_WIDTH = 0.2;

/**
 * 釘中特效的時間與大小，單位是秒與 px；打倒時每一項都加大一級。
 *
 * @type {Record<'hit'|'knockout', { freeze: number, slide: number, fly: number, lift: number, shake: number, amp: number, rays: number, rayLife: number, chips: number, chipLife: number }>}
 */
const FX = {
  hit: { freeze: 0.08, slide: 0.35, fly: 0, lift: 0, shake: 0.3, amp: 4, rays: 8, rayLife: 0.3, chips: 10, chipLife: 0.5 },
  knockout: { freeze: 0.14, slide: 0.35, fly: 0.6, lift: 46, shake: 0.45, amp: 9, rays: 12, rayLife: 0.45, chips: 18, chipLife: 0.7 },
};
/** 釘中那一刻訪客的陀螺貼在 島主的陀螺左邊，碰撞點在兩顆中間。 */
const IMPACT_ME_X = PUMA_X - TOP_WIDTH;
const IMPACT_X = PUMA_X - TOP_WIDTH / 2;
/** 打倒時 島主的陀螺落地的時間（秒），落地聲在這之後的第一格播。 */
const LAND_SECONDS = FX.knockout.freeze + FX.knockout.fly;
/** drawTop 倒下時的角度；撞飛時多轉一整圈才接到這個角度，落地不會跳格。 */
const FALL_ANGLE = Math.PI / 2.3;
const easeOut = (p) => 1 - (1 - p) ** 3;
const lerp = (a, b, p) => a + (b - a) * p;

/**
 * 出手後 elapsed 秒時，兩顆陀螺的位置、島主的陀螺抬多高與轉幾度、畫面位移多少、是否還在頓格。
 * 只影響畫面；釘中時 島主的陀螺從原位 PUMA_X、訪客的陀螺從貼在它左邊的 IMPACT_ME_X 往外彈到 meX／pumaX。
 *
 * @param {number} elapsed
 * @param {{ kind: 'miss'|'hit'|'knockout', meX: number, pumaX: number }} round
 * @param {boolean} reduced 訪客偏好減少動態時不震動
 * @return {{ meX: number, pumaX: number, lift: number, roll: number, shakeX: number, shakeY: number, frozen: boolean }}
 */
export function impactPose(elapsed, { kind, meX, pumaX }, reduced) {
  const pose = { meX, pumaX, lift: 0, roll: 0, shakeX: 0, shakeY: 0, frozen: false };
  const fx = FX[kind];
  if (!fx) return pose;

  const fromMe = IMPACT_ME_X;
  const fromPuma = PUMA_X;
  pose.frozen = elapsed < fx.freeze;
  const after = Math.max(0, elapsed - fx.freeze);
  pose.meX = lerp(fromMe, meX, easeOut(Math.min(1, after / fx.slide)));
  if (kind === 'knockout') {
    const p = Math.min(1, after / fx.fly);
    pose.pumaX = lerp(fromPuma, pumaX, easeOut(p));
    pose.lift = p < 1 ? 4 * fx.lift * p * (1 - p) : 0;
    pose.roll = p * (Math.PI * 2 + FALL_ANGLE);
  } else {
    pose.pumaX = lerp(fromPuma, pumaX, easeOut(Math.min(1, after / fx.slide)));
  }
  if (!reduced && elapsed < fx.shake) {
    const decay = (1 - elapsed / fx.shake) ** 2;
    pose.shakeX = fx.amp * decay * Math.sin(elapsed * 90);
    pose.shakeY = fx.amp * 0.6 * decay * Math.cos(elapsed * 73);
  }
  return pose;
}

/** 碰撞點的星芒、木屑與火花。粒子的方向與速度只看序號，不吃亂數。 */
function drawBurst(ctx, elapsed, kind, cx, cy) {
  const fx = FX[kind];
  ctx.save();
  // 頓格時碰撞點亮一下
  if (elapsed < fx.freeze + 0.06) {
    ctx.globalAlpha = 1 - elapsed / (fx.freeze + 0.06);
    ctx.fillStyle = '#fff8f4';
    ctx.beginPath();
    ctx.arc(cx, cy, kind === 'knockout' ? 30 : 20, 0, Math.PI * 2);
    ctx.fill();
  }
  if (elapsed < fx.rayLife) {
    const t = elapsed / fx.rayLife;
    ctx.globalAlpha = 1 - t;
    ctx.strokeStyle = '#e8c547';
    ctx.lineCap = 'round';
    ctx.lineWidth = kind === 'knockout' ? 4 : 3;
    const reach = kind === 'knockout' ? 110 : 70;
    for (let i = 0; i < fx.rays; i++) {
      const a = (i / fx.rays) * Math.PI * 2 + 0.2;
      const r0 = 12 + reach * easeOut(t);
      const r1 = r0 + 14 + 10 * (i % 2);
      ctx.beginPath();
      ctx.moveTo(cx + Math.cos(a) * r0, cy + Math.sin(a) * r0 * 0.7);
      ctx.lineTo(cx + Math.cos(a) * r1, cy + Math.sin(a) * r1 * 0.7);
      ctx.stroke();
    }
  }
  if (elapsed < fx.chipLife) {
    ctx.globalAlpha = 1 - elapsed / fx.chipLife;
    const boost = kind === 'knockout' ? 1.4 : 1;
    for (let i = 0; i < fx.chips; i++) {
      // 往上半圈噴出，受重力往下掉
      const a = Math.PI + ((i + 0.5) / fx.chips) * Math.PI;
      const v = (i % 3 === 0 ? 190 : i % 3 === 1 ? 140 : 100) * boost;
      const x = cx + Math.cos(a) * v * elapsed;
      const y = cy + Math.sin(a) * v * elapsed + 0.5 * 520 * elapsed * elapsed;
      if (i % 2) {
        ctx.fillStyle = '#e8c547';
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(a + elapsed * 14);
        ctx.fillStyle = WOOD_DARK;
        ctx.fillRect(-3, -1.5, 6, 3);
        ctx.restore();
      }
    }
  }
  ctx.restore();
}

const en = () => document.documentElement.lang === 'en';
const tr = (zh, eng) => (en() ? eng : zh);
const secs = (s) => s.toFixed(1);

/** 喇叭圖示：靜音時旁邊畫一個 ×，有聲音時畫兩道聲波。 */
const speakerIcon = (on) => `<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M3 9v6h4l5 4V5L7 9H3z" fill="currentColor"/>${on
  ? '<path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>'
  : '<path d="M16 9.5l5 5M21 9.5l-5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>'}</svg>`;

/**
 * 拉繩區右端的小陀螺：外形與 drawTop 相同（topBody 的路徑），繩圈畫在圓錐的繩溝上，
 * 第 i 圈在 --p 超過 i/8 時淡入，由靠近鐵釘的一圈往上纏。
 */
const ROPE_TOP_BODY = 'M-30-70C-36-60-34-48-24-36Q-12-22-4-12L4-12Q12-22 24-36C34-48 36-60 30-70Z';
const ROPE_TOP_COILS = 8;
function ropeTop() {
  const coils = Array.from({ length: ROPE_TOP_COILS }, (_, i) => {
    // 從釘子上方往上：y 由 -16 到 -44，寬度跟著圓錐變寬
    const y = -16 - i * 4;
    const half = 6 + (i / (ROPE_TOP_COILS - 1)) * 22;
    return `<path class="coil" style="--k:${(i / ROPE_TOP_COILS).toFixed(3)}" d="M${-half} ${y}Q0 ${y + 5} ${half} ${y}" fill="none" stroke="#6e461f" stroke-width="2.4" stroke-linecap="round"/>`;
  }).join('');
  const box = el('span', { class: 'ht-rope-top', 'aria-hidden': 'true' });
  box.innerHTML = `<svg viewBox="-40 -82 80 84" width="40" height="42">
<defs><linearGradient id="ht-rope-wood" x1="0" x2="1"><stop offset="0" stop-color="${WOOD_DARK}"/><stop offset=".45" stop-color="${WOOD}"/><stop offset="1" stop-color="${WOOD_DARK}"/></linearGradient>
<clipPath id="ht-rope-clip"><path d="${ROPE_TOP_BODY}"/></clipPath></defs>
<path d="M-2.5-13H2.5L.8 0H-.8Z" fill="${NAIL}"/>
<path d="${ROPE_TOP_BODY}" fill="url(#ht-rope-wood)"/>
<g clip-path="url(#ht-rope-clip)">${bandStripes(ME_BAND).map(([color, y, h]) => `<rect x="-40" y="${y}" width="80" height="${h}" fill="${color}"/>`).join('')}<rect x="-40" y="-49" width="80" height="2" fill="#211d1d"/>${coils}</g>
<ellipse cx="0" cy="-70" rx="30" ry="${(30 * VIEW_SQUASH).toFixed(2)}" fill="#e2b67c" stroke="${WOOD_DARK}"/>
<circle cx="0" cy="-70" r="3" fill="#5d514b"/>
</svg>`;
  return box;
}

function localStore() {
  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

const CSS = `
.ht-open{display:inline-flex;align-items:center;gap:6px;margin:4px 0 12px;padding:7px 14px;border:1px solid #db6a41;border-radius:999px;background:#fff8f4;color:#a5442a;font:inherit;font-weight:700;cursor:pointer}
.ht-open:hover{background:#db6a41;color:#fff8f4}
.ht-overlay{position:fixed;inset:0;z-index:1000;display:grid;place-items:center;padding:16px;background:rgba(33,29,29,.45)}
.ht-box{width:min(400px,100%);box-sizing:border-box;background:#fff8f4;border-radius:18px;padding:16px;box-shadow:0 18px 50px #211d1d40;color:#3d3431;font-family:"Noto Sans TC",system-ui,sans-serif}
.ht-head{display:flex;justify-content:space-between;align-items:center;margin-bottom:8px}
.ht-head h2{margin:0;font-size:18px}
@property --p{syntax:'<number>';inherits:true;initial-value:0}
.ht-tools{display:flex;gap:6px}
.ht-close,.ht-sound{flex:none;display:grid;place-items:center;box-sizing:border-box;width:32px;height:32px;min-height:0;padding:0;border:0;border-radius:50%;background:#efe2d6;color:#3d3431;font-size:18px;line-height:1;cursor:pointer}
.ht-sides{display:flex;justify-content:space-around;align-items:flex-end;font-size:13px;font-weight:700}
.ht-sides span{display:flex;flex-direction:column;align-items:center;gap:2px}
.ht-face{width:52px;height:52px;border-radius:50%;background:#eef4e7;display:grid;place-items:center;font-size:22px}
.ht-puma .ht-face{background:#eef4e7 url(${PUMA_FACE}) center/cover no-repeat}
.ht-stage{display:block;width:100%;height:auto;aspect-ratio:${STAGE_W}/${STAGE_H};background:#f3e7dc;border-radius:12px;margin:6px 0 10px}
.ht-rope{--t:0;--p:0;position:relative;height:44px;border-radius:999px;background:#efe2d6;overflow:hidden;touch-action:none;user-select:none;-webkit-user-select:none;-webkit-touch-callout:none;cursor:grab}
.ht-rope.is-thrown{transition:--p .35s ease-out}
.ht-rope:focus-visible{outline:2px solid #db6a41;outline-offset:2px}
.ht-rope-fill{position:absolute;left:0;top:0;bottom:0;width:calc(var(--t) * 100%);background:#f3c9b5}
.ht-rope-line{position:absolute;top:20px;height:4px;left:calc(18px + var(--p) * (100% - 84px));right:44px;border-radius:2px;background:repeating-linear-gradient(-60deg,#a8743c 0 3px,#d7a463 3px 6px);background-position:calc(var(--p) * 60px) 0}
.ht-rope-hint{position:absolute;left:calc(50% - 20px);top:50%;transform:translate(-50%,-50%);padding:2px 10px;border-radius:999px;background:#efe2d6;font-size:12px;font-weight:700;color:#78685e;white-space:nowrap;pointer-events:none;transition:opacity .15s}
.ht-rope.is-pulling .ht-rope-hint{opacity:0}
.ht-rope-knob{position:absolute;top:8px;left:calc(6px + var(--p) * (100% - 84px));width:24px;height:24px;border:2px solid #db6a41;border-radius:50%;background:#fff8f4;box-sizing:border-box}
.ht-rope.is-full .ht-rope-knob{background:#db6a41}
.ht-rope-top{position:absolute;right:6px;top:1px;width:40px;height:42px;pointer-events:none}
.ht-rope-top .coil{opacity:clamp(0, (var(--p) - var(--k)) * 8, 1)}
.ht-status{min-height:2.8em;margin:10px 0 4px;font-size:14px;line-height:1.4}
.ht-best{margin:0 0 10px;font-size:12px;color:#78685e}
.ht-actions{display:flex;gap:8px}
.ht-actions button{flex:1;min-height:44px;border:0;border-radius:999px;font:inherit;font-weight:700;cursor:pointer}
.ht-again{background:#211d1d;color:#fff8f4}
`;

function injectStyle() {
  if (document.getElementById('ht-style')) return;
  const style = document.createElement('style');
  style.id = 'ht-style';
  style.textContent = CSS;
  document.head.append(style);
}

function el(tag, attrs = {}, ...children) {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === 'class') node.className = v;
    else if (k === 'text') node.textContent = v;
    else node.setAttribute(k, v);
  }
  node.append(...children);
  return node;
}

// 視角：從側邊略往下看，視線和地面約夾 15 度，所以水平的圓都畫成扁橢圓
const VIEW_SQUASH = Math.sin((15 * Math.PI) / 180);
const WOOD = '#d7a463';
const WOOD_DARK = '#a8743c';
const NAIL = '#8d969c';
/**
 * 訪客陀螺的色帶：仿「洋流」布條，橘、白、橘三道（[顏色, 高度]，由上往下，合計 10 與 Puma 的單色帶同高）。
 * 拉繩區的小陀螺是訪客要甩出去的那顆，用同一條色帶。
 */
const ME_BAND = [['#df7e2c', 3], ['#fff8f4', 4], ['#df7e2c', 3]];
const BAND_TOP = -60;

/** 色帶由上往下的每一道：[顏色, y, 高度]。單一顏色就是一整道。 */
function bandStripes(band) {
  let y = BAND_TOP;
  return (typeof band === 'string' ? [[band, 10]] : band).map(([color, h]) => {
    const stripe = [color, y, h];
    y += h;
    return stripe;
  });
}

/** 台灣傳統木陀螺的外形：頂面微凸，腰部最寬，往下收成圓錐，尖端是鐵釘。座標原點在釘尖。 */
function topBody(ctx) {
  ctx.beginPath();
  ctx.moveTo(-30, -70);
  ctx.bezierCurveTo(-36, -60, -34, -48, -24, -36);
  ctx.quadraticCurveTo(-12, -22, -4, -12);
  ctx.lineTo(4, -12);
  ctx.quadraticCurveTo(12, -22, 24, -36);
  ctx.bezierCurveTo(34, -48, 36, -60, 30, -70);
  ctx.closePath();
}

/** 一顆陀螺：木頭本體加一圈色帶（單色或 ME_BAND 那樣的條紋）、圓錐上的繩溝、鐵釘；頂面與側面的記號隨轉角移動，看得出在轉；倒下時躺平。撞飛途中由呼叫端另畫影子。 */
function drawTop(ctx, x, band, angle, tilt, fallen, shadow = true) {
  const stripes = bandStripes(band);
  const ground = STAGE_H - 34;
  ctx.save();
  ctx.translate(x, ground);

  // 地上的影子：倒下時拉長
  if (shadow) {
    ctx.fillStyle = 'rgba(61,52,49,.18)';
    ctx.beginPath();
    ctx.ellipse(fallen ? 30 : 0, 2, fallen ? 46 : 26, 26 * VIEW_SQUASH, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.rotate(fallen ? FALL_ANGLE : tilt);

  // 鐵釘
  ctx.fillStyle = NAIL;
  ctx.beginPath();
  ctx.moveTo(-2.5, -13);
  ctx.lineTo(2.5, -13);
  ctx.lineTo(0.8, 0);
  ctx.lineTo(-0.8, 0);
  ctx.closePath();
  ctx.fill();

  // 本體：木頭漸層
  const wood = ctx.createLinearGradient(-34, 0, 34, 0);
  wood.addColorStop(0, WOOD_DARK);
  wood.addColorStop(0.45, WOOD);
  wood.addColorStop(1, WOOD_DARK);
  topBody(ctx);
  ctx.fillStyle = wood;
  ctx.fill();

  ctx.save();
  topBody(ctx);
  ctx.clip();
  // 腰上的色帶與細線
  for (const [color, y, h] of stripes) {
    ctx.fillStyle = color;
    ctx.fillRect(-40, y, 80, h);
  }
  ctx.fillStyle = '#211d1d';
  ctx.fillRect(-40, -49, 80, 2);
  // 圓錐上的繩溝
  ctx.strokeStyle = 'rgba(80,50,25,.45)';
  ctx.lineWidth = 1;
  for (let y = -42; y > -16; y -= 5) {
    ctx.beginPath();
    ctx.ellipse(0, y, 40, 40 * VIEW_SQUASH, 0, 0, Math.PI);
    ctx.stroke();
  }
  // 側面的記號：繞著轉軸跑，跑到背面時看不到
  for (let i = 0; i < 3; i++) {
    const a = angle + (i * Math.PI * 2) / 3;
    if (Math.sin(a) < 0) continue;
    ctx.fillStyle = `rgba(255,248,244,${(0.25 + 0.45 * Math.sin(a)).toFixed(2)})`;
    ctx.fillRect(Math.cos(a) * 26 - 2, -60, 4, 10);
  }
  ctx.restore();

  // 頂面：微凸的扁橢圓，中心點與一道記號跟著轉
  ctx.fillStyle = '#e2b67c';
  ctx.beginPath();
  ctx.ellipse(0, -70, 30, 30 * VIEW_SQUASH, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = WOOD_DARK;
  ctx.lineWidth = 1;
  ctx.stroke();
  ctx.strokeStyle = stripes[0][0];
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(0, -70);
  ctx.lineTo(Math.cos(angle) * 24, -70 + Math.sin(angle) * 24 * VIEW_SQUASH);
  ctx.stroke();
  ctx.fillStyle = '#5d514b';
  ctx.beginPath();
  ctx.ellipse(0, -70, 3, 3 * VIEW_SQUASH + 1, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

export function mountHeartTop({
  storage = localStore(),
  rng = Math.random,
  now = () => performance.now(),
  raf = (cb) => requestAnimationFrame(cb),
  caf = (id) => cancelAnimationFrame(id),
  reducedMotion = () => {
    try {
      return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
    } catch {
      return false;
    }
  },
  createSound = createTopSound,
  eventTime = (e) => e.timeStamp,
} = {}) {
  const content = document.querySelector('#card-content');
  let game = null;

  function openGame() {
    if (game) return;
    injectStyle();

    const canvas = el('canvas', { class: 'ht-stage', width: String(STAGE_W), height: String(STAGE_H) });
    const status = el('p', { class: 'ht-status', 'aria-live': 'polite' });
    const best = el('p', { class: 'ht-best' });
    const rope = el('div', {
      class: 'ht-rope', role: 'slider', tabindex: '0',
      'aria-valuemin': '0', 'aria-valuemax': '100', 'aria-valuenow': '0',
      'aria-label': tr('拉繩：往右拉蓄力，往左拉回甩出', 'Rope: pull right to wind up, pull left to throw'),
    },
    el('i', { class: 'ht-rope-fill' }),
    el('i', { class: 'ht-rope-line' }),
    el('span', { class: 'ht-rope-hint', 'aria-hidden': 'true', text: tr('→ 往右纏繩　← 拉回甩出', '→ wind　← snap back') }),
    el('i', { class: 'ht-rope-knob' }),
    ropeTop());
    const again = el('button', { class: 'ht-again', type: 'button', text: tr('再一局', 'Play again') });
    const close = el('button', { class: 'ht-close', type: 'button', 'aria-label': tr('關閉', 'Close'), text: '×' });
    const soundBtn = el('button', { class: 'ht-sound', type: 'button', 'aria-label': tr('音效', 'Sound') });
    const overlay = el('div', { class: 'ht-overlay', role: 'dialog', 'aria-modal': 'true', 'aria-labelledby': 'ht-title' },
      el('div', { class: 'ht-box' },
        el('div', { class: 'ht-head' }, el('h2', { id: 'ht-title', text: tr('跟島主 kywk 切磋陀螺', 'Spin tops with Puma') }), el('span', { class: 'ht-tools' }, soundBtn, close)),
        el('div', { class: 'ht-sides' },
          el('span', { class: 'ht-me' }, el('i', { class: 'ht-face', text: '☺' }), tr('你', 'You')),
          el('span', { class: 'ht-puma' }, el('i', { class: 'ht-face' }), 'Puma')),
        canvas,
        rope,
        status, best,
        el('div', { class: 'ht-actions' }, again)));

    let ctx = null;
    try {
      ctx = canvas.getContext('2d');
    } catch {}

    // aiming → pulling → spinning → done；關閉時整局作廢。pulling 是按住拉繩、還沒甩出
    const round = { phase: 'aiming', aimAt: 0, aim: AIM_START, kind: 'miss', meX: AIM_START, pumaX: PUMA_X, reduced: false, landed: false, mine: 0, puma: 0, spinAt: 0, frame: 0, turnMe: 0, turnPuma: 0, last: 0 };
    const WAITING = ['aiming', 'pulling'];
    /** 這次拉繩：按下的指標、起點、往右最遠的距離（拉繩區寬度的比例）與到達的時間。 */
    let pull = null;
    /** 鍵盤拉繩：之前已拉到的程度，以及 → 目前按下的時間（沒按著時是 null）。 */
    let keyPull = null;
    const keyPullTension = (t) => Math.min(1, keyPull.base + (keyPull.downAt === null ? 0 : keyTension(t - keyPull.downAt)));

    /** 畫面上繩子的位置：往右拉時纏上小陀螺，往左拉回時抽出來；跟拉滿程度分開，拉回時會變小。 */
    const showPull = (p) => {
      rope.style.setProperty('--p', String(p));
    };

    const showTension = (tension) => {
      rope.classList.toggle('is-pulling', round.phase !== 'aiming');
      rope.style.setProperty('--t', String(tension));
      rope.setAttribute('aria-valuenow', String(Math.round(tension * 100)));
      rope.classList.toggle('is-full', tension >= 1);
    };

    const updateAim = (t) => {
      round.aim = aimPosition(t - round.aimAt);
      canvas.dataset.aim = String(Math.round(round.aim * 100) / 100);
    };

    // 預設靜音；偏好是開的話，在打開浮層這次點擊裡就建立 AudioContext
    const sound = createSound();
    let soundOn = readSoundOn(storage);
    const showSound = () => {
      soundBtn.setAttribute('aria-pressed', String(soundOn));
      soundBtn.innerHTML = speakerIcon(soundOn);
    };

    const showBest = (value) => {
      best.textContent = value === null ? tr('最佳紀錄：還沒有', 'Best spin: none yet') : tr(`最佳紀錄：${secs(value)} 秒`, `Best spin: ${secs(value)} s`);
    };

    const drawGround = () => {
      ctx.clearRect(0, 0, STAGE_W, STAGE_H);
      ctx.fillStyle = '#e4d3c4';
      ctx.fillRect(0, STAGE_H - 34, STAGE_W, 34);
    };

    /** 地上的準星：扁橢圓的圈，按住拉繩時變實線。 */
    const drawAim = () => {
      const x = STAGE_W * round.aim;
      const y = STAGE_H - 34 + 2;
      ctx.save();
      ctx.strokeStyle = '#211d1d';
      ctx.lineWidth = 2;
      if (round.phase === 'aiming') ctx.setLineDash([4, 3]);
      ctx.beginPath();
      ctx.ellipse(x, y, 16, 16 * VIEW_SQUASH + 1, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    };

    const draw = (elapsed) => {
      if (!ctx) return;
      drawGround();
      const pumaX = STAGE_W * round.pumaX;
      if (WAITING.includes(round.phase)) {
        drawAim();
        // 出手前 島主的陀螺保持全速、不晃
        drawTop(ctx, pumaX, '#db6a41', round.turnPuma, 0, false);
        return;
      }
      const pose = impactPose(elapsed, round, round.reduced);
      ctx.save();
      ctx.translate(pose.shakeX, pose.shakeY);
      drawGround();
      const st = spinState(elapsed, round.mine);
      drawTop(ctx, STAGE_W * pose.meX, ME_BAND, round.turnMe, st.wobble * 0.45 * Math.sin(elapsed * 7), st.fallen);
      const x = STAGE_W * pose.pumaX;
      if (round.kind === 'knockout' && pose.roll < Math.PI * 2 + FALL_ANGLE) {
        // 撞飛途中：繞著從腰部移向釘尖的支點翻滾，落地時剛好接上 drawTop 倒下的姿勢
        const ground = STAGE_H - 34;
        const pivot = ground - 40 * (1 - pose.roll / (Math.PI * 2 + FALL_ANGLE));
        // 影子留在地上，抬得越高越小越淡
        const k = 1 - pose.lift / (FX.knockout.lift * 1.6);
        ctx.fillStyle = `rgba(61,52,49,${(0.18 * k).toFixed(3)})`;
        ctx.beginPath();
        ctx.ellipse(x, ground + 2, 26 * k, 26 * VIEW_SQUASH * k, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.save();
        ctx.translate(x, pivot - pose.lift);
        ctx.rotate(pose.roll);
        ctx.translate(-x, -pivot);
        drawTop(ctx, x, '#db6a41', round.turnPuma, 0, false, false);
        ctx.restore();
      } else {
        const sp = spinState(elapsed, round.puma);
        drawTop(ctx, x, '#db6a41', round.turnPuma, sp.wobble * 0.45 * Math.sin(elapsed * 7 + 1.7), sp.fallen);
      }
      if (round.kind !== 'miss') drawBurst(ctx, elapsed, round.kind, STAGE_W * IMPACT_X, STAGE_H - 70);
      ctx.restore();
    };

    const turnStep = (dt) => MAX_TURNS_PER_SECOND * Math.PI * 2 * dt;

    const tick = () => {
      const t = now();
      const dt = Math.max(0, (t - round.last) / 1000);
      round.last = t;
      if (WAITING.includes(round.phase)) {
        updateAim(t);
        if (keyPull) {
          showTension(keyPullTension(t));
          showPull(keyPullTension(t));
        }
        round.turnPuma += turnStep(dt);
        draw(0);
        round.frame = raf(tick);
        return;
      }
      if (round.phase !== 'spinning') return;
      const elapsed = (t - round.spinAt) / 1000;
      // 頓格時轉角不前進；計時照常，finish 不會延後
      const speedMe = spinState(elapsed, round.mine).speed;
      const speedPuma = spinState(elapsed, round.puma).speed;
      if (!impactPose(elapsed, round, round.reduced).frozen) {
        round.turnMe += speedMe * turnStep(dt);
        round.turnPuma += speedPuma * turnStep(dt);
      }
      draw(elapsed);
      if (round.kind === 'knockout' && !round.landed && elapsed >= LAND_SECONDS) {
        round.landed = true;
        sound.land();
      }
      // 結算那一格交給 finish 停掉嗡嗡聲，這裡不再多送一次
      if (elapsed >= Math.max(round.mine, round.puma)) finish();
      else {
        sound.hum(speedMe, speedPuma);
        round.frame = raf(tick);
      }
    };

    const resetRound = () => {
      caf(round.frame);
      const t = now();
      Object.assign(round, { phase: 'aiming', aimAt: t, kind: 'miss', meX: AIM_START, pumaX: PUMA_X, turnMe: 0, last: t });
      updateAim(t);
      pull = null;
      keyPull = null;
      rope.classList.remove('is-thrown');
      showTension(0);
      showPull(0);
      again.hidden = true;
      // 不必先點拉繩區，方向鍵就能直接拉；剛打開時浮層還沒放進頁面，focus 會在 append 之後再做一次
      rope.focus({ preventScroll: true });
      status.textContent = tr('準星經過 島主的陀螺時，按住拉繩往右拉，再往左拉回甩出去。用鍵盤的話，按 → 纏繩、按 ← 甩出。', 'Pull the rope right, then snap it back left as the aim passes under Puma\'s top. On a keyboard, press → to wind and ← to throw.');
      draw(0);
      round.frame = raf(tick);
    };

    const startPull = (e) => {
      sound.resume();
      if (round.phase !== 'aiming') return;
      if (e.pointerId !== undefined && rope.setPointerCapture) {
        try {
          rope.setPointerCapture(e.pointerId);
        } catch {}
      }
      round.phase = 'pulling';
      pull = { id: e.pointerId, startX: e.clientX, peak: 0, peakAt: eventTime(e), width: rope.getBoundingClientRect().width || ROPE_FALLBACK_PX };
      showTension(0);
    };

    /** 往右拉更新最遠點；從最遠點拉回一半以上就甩出，速度用兩個事件的時間戳記計算。 */
    const movePull = (e) => {
      // 只看按下拉繩的那根手指，另一根手指碰到拉繩區不算
      if (round.phase !== 'pulling' || !pull || e.pointerId !== pull.id) return;
      const dx = (e.clientX - pull.startX) / pull.width;
      const t = eventTime(e);
      showPull(pullTension(dx));
      if (dx >= pull.peak) {
        pull.peak = dx;
        pull.peakAt = t;
        showTension(pullTension(dx));
        return;
      }
      const tension = pullTension(pull.peak);
      if (tension < MIN_THROW_TENSION || pull.peak - dx < pull.peak / 2) return;
      const seconds = Math.max(1, t - pull.peakAt) / 1000;
      throwTop(pullQuality(tension, pullSpeed((pull.peak - dx) / seconds)));
    };

    /** 沒拉回就放開：這次指標拉繩作廢。別的指標放開、或正在用鍵盤拉時都不受影響。 */
    const cancelPull = (e) => {
      if (round.phase !== 'pulling' || !pull || e.pointerId !== pull.id) return;
      round.phase = 'aiming';
      pull = null;
      showTension(0);
      showPull(0);
    };

    /** 鍵盤：按住 → 逐步拉滿（放開停住，再按接著加），按 ← 甩出，拉回速度算滿速。 */
    const keyDown = (e) => {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      e.preventDefault();
      if (e.repeat) return;
      sound.resume();
      const t = now();
      if (e.key === 'ArrowRight') {
        if (round.phase === 'aiming') {
          round.phase = 'pulling';
          keyPull = { base: 0, downAt: null };
        }
        if (!keyPull || keyPull.downAt !== null) return;
        keyPull.downAt = t;
        return;
      }
      if (round.phase !== 'pulling' || !keyPull) return;
      const tension = keyPullTension(t);
      if (tension > 0) throwTop(pullQuality(tension, 1));
    };

    const keyUp = (e) => {
      if (e.key !== 'ArrowRight' || !keyPull || keyPull.downAt === null) return;
      keyPull.base = keyPullTension(now());
      keyPull.downAt = null;
      showTension(keyPull.base);
      showPull(keyPull.base);
    };

    const throwTop = (quality) => {
      caf(round.frame);
      const t = now();
      updateAim(t);
      pull = null;
      keyPull = null;
      // 甩出去：繩子一口氣從小陀螺上抽完
      rope.classList.add('is-thrown');
      showPull(0);
      const hit = collide({ quality, hit: hitQuality(round.aim), mine: spinSeconds(quality, rng), puma: pumaSeconds(rng) });
      Object.assign(round, { mine: hit.mine, puma: hit.puma, kind: hit.kind, meX: round.aim, pumaX: PUMA_X, landed: false });
      sound.whoosh(quality);
      if (hit.kind !== 'miss') sound.impact(hit.kind);
      // 釘中就把兩顆撞開：訪客的往左彈，Puma 的往右退；打倒時倒下的陀螺往右躺，少退一點免得出界
      if (hit.kind !== 'miss') {
        round.meX = IMPACT_ME_X - 0.1;
        round.pumaX = PUMA_X + (hit.kind === 'knockout' ? 0.08 : 0.1);
      } else if (Math.abs(round.aim - PUMA_X) < TOP_WIDTH) {
        // 沒釘中但落得太近：擺到 Puma 旁邊一個陀螺寬的地方，免得畫面上看起來像撞到了
        round.meX = round.aim < PUMA_X ? PUMA_X - TOP_WIDTH : PUMA_X + TOP_WIDTH;
      }
      round.reduced = reducedMotion();
      round.phase = 'spinning';
      round.spinAt = t;
      round.last = t;
      status.textContent = {
        knockout: tr('釘倒了！', 'Knocked out!'),
        hit: tr('釘中了！看誰撐得久……', 'Nailed it! Who lasts longer…'),
        miss: tr('沒釘中，看誰撐得久……', 'Missed. Who lasts longer…'),
      }[round.kind];
      round.frame = raf(tick);
    };

    const finish = () => {
      round.phase = 'done';
      const result = outcome(round.mine, round.puma);
      const head = { win: tr('你贏了！', 'You win!'), lose: tr('Puma 贏了！', 'Puma wins!'), tie: tr('平手！', 'A tie!') }[result];
      const nail = { knockout: tr('釘倒了！', 'Knocked out!'), hit: tr('釘中了！', 'Nailed it!'), miss: '' }[round.kind];
      status.textContent = `${nail}${head} ${tr(`你 ${secs(round.mine)} 秒，Puma ${secs(round.puma)} 秒。`, `You ${secs(round.mine)} s, Puma ${secs(round.puma)} s.`)}`;
      showBest(saveBest(storage, round.mine));
      sound.hum(0, 0);
      sound.result(result);
      again.hidden = false;
      track("heart_island_top_play", { result, hit: round.kind });
    };

    const closeGame = () => {
      caf(round.frame);
      round.phase = 'closed';
      document.removeEventListener('visibilitychange', onVisibility);
      sound.close();
      overlay.remove();
      game = null;
    };

    rope.addEventListener('pointerdown', startPull);
    rope.addEventListener('pointermove', movePull);
    rope.addEventListener('pointerup', cancelPull);
    rope.addEventListener('pointercancel', cancelPull);
    rope.addEventListener('contextmenu', (e) => e.preventDefault());
    rope.addEventListener('keydown', keyDown);
    rope.addEventListener('keyup', keyUp);
    again.addEventListener('click', resetRound);
    close.addEventListener('click', closeGame);
    // 背景分頁的 requestAnimationFrame 會暫停，嗡嗡聲就會停在最後的音量一直響；回到前景後下一格 tick 會接上
    const onVisibility = () => {
      if (document.hidden) sound.hum(0, 0);
    };
    document.addEventListener('visibilitychange', onVisibility);
    soundBtn.addEventListener('click', () => {
      soundOn = !soundOn;
      saveSoundOn(storage, soundOn);
      if (soundOn) sound.enable();
      else sound.disable();
      showSound();
    });

    showBest(readBest(storage));
    showSound();
    if (soundOn) sound.enable();
    resetRound();
    document.body.append(overlay);
    rope.focus({ preventScroll: true });
    game = { close: closeGame };
    track("heart_island_top_open");
  }

  function ensureEntry() {
    if (!content.querySelector('.puma-tile') || content.querySelector('.ht-open')) return;
    injectStyle();
    const btn = el('button', { class: 'ht-open', type: 'button', text: tr('跟島主 kywk 切磋陀螺', 'Spin tops with Puma') });
    btn.addEventListener('click', openGame);
    const after = content.querySelector('p.lede') || content.querySelector('.card-head');
    if (after) after.after(btn);
    else content.append(btn);
  }

  const observer = new MutationObserver(ensureEntry);
  observer.observe(content, { childList: true });
  ensureEntry();

  return {
    destroy() {
      observer.disconnect();
      if (game) game.close();
    },
  };
}

if (document.querySelector('#card-content')) mountHeartTop();
