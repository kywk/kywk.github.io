/*
 * HEART 政策島：跟 Puma 打陀螺 — 一局的規則。
 *
 * 只放純函式，不碰 DOM；隨機數由呼叫端傳入。數值是估計值，測試站實玩後再調，
 * 改常數時要一起改 heart-island-top spec 的 Example 表。畫面在 heart-top.js。
 */

/** 往右拉到拉繩區寬度的這個比例就算拉滿；估計值，測試站試玩後再調。 */
const PULL_FULL_FRACTION = 0.6;
/** 拉回速度到每秒這麼多個拉繩區寬度就算滿速；估計值，測試站試玩後再調。 */
const PULL_FULL_SPEED = 3;
/** 鍵盤按住 → 拉滿要多久。 */
const KEY_FULL_MS = 600;
/** 鍵盤每按一下 → 至少加這麼多，一下一下點也拉得動。 */
const KEY_TAP_TENSION = 0.1;
const BASE_SECONDS = 4;
const QUALITY_SECONDS = 8;
const JITTER_SECONDS = 0.3;
const PUMA_MIN_SECONDS = 9;
const PUMA_RANGE_SECONDS = 2.5;
const TIE_SECONDS = 0.05;
const AIM_PERIOD_MS = 1600;
const AIM_MIN = 0.1;
const AIM_RANGE = 0.8;
/** Puma 的陀螺站的位置，和準星同樣用 0 到 1 對應地面寬度。 */
export const PUMA_X = 0.68;
const HIT_RADIUS = 0.1;
const KNOCKOUT_IMPACT = 0.6;
const HIT_SLOWDOWN = 0.6;
const HIT_COST_SECONDS = 1;

const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));

/** 拉滿程度：往右拉的最遠距離（拉繩區寬度的比例）換算成 0 到 1。 */
export function pullTension(dxFraction) {
  return clamp(dxFraction / PULL_FULL_FRACTION, 0, 1);
}

/** 拉回速度係數：每秒幾個拉繩區寬度換算成 0 到 1。 */
export function pullSpeed(widthsPerSecond) {
  return clamp(widthsPerSecond / PULL_FULL_SPEED, 0, 1);
}

/** 出手品質：拉得越滿、拉回越快越好。 */
export function pullQuality(tension, speed) {
  return tension * speed;
}

/** 鍵盤按一下 → 增加的拉滿程度：至少 0.1，按住越久越多。 */
export function keyTension(heldMs) {
  return Math.min(1, Math.max(KEY_TAP_TENSION, heldMs / KEY_FULL_MS));
}

/** 訪客陀螺的轉動秒數。 */
export function spinSeconds(quality, rng) {
  return BASE_SECONDS + QUALITY_SECONDS * quality * quality + (rng() * 2 - 1) * JITTER_SECONDS;
}

/** Puma 陀螺的轉動秒數：偏強，訪客要出手很準才贏得了。 */
export function pumaSeconds(rng) {
  return PUMA_MIN_SECONDS + PUMA_RANGE_SECONDS * rng();
}

/** 從訪客的角度看這一局：轉得比較久的贏，差距在 0.05 秒內算平手。 */
export function outcome(mine, puma) {
  // 先四捨五入到毫秒，避免 10.3 - 10.25 這類浮點誤差跨過門檻
  const diff = Math.round((mine - puma) * 1000) / 1000;
  if (Math.abs(diff) <= TIE_SECONDS) return 'tie';
  return diff > 0 ? 'win' : 'lose';
}

/** 轉到第 elapsed 秒時的樣子：轉速線性遞減，晃動依經過比例的平方增加。 */
export function spinState(elapsed, total) {
  const t = total > 0 ? elapsed / total : 1;
  return {
    speed: Math.max(0, 1 - t),
    wobble: Math.min(1, t * t),
    fallen: elapsed >= total,
  };
}

/** 瞄準時地上的準星：在 0.1 與 0.9 之間來回，瞄準開始那一刻在 0.1。 */
export function aimPosition(elapsedMs) {
  const phase = ((elapsedMs % AIM_PERIOD_MS) + AIM_PERIOD_MS) % AIM_PERIOD_MS / AIM_PERIOD_MS;
  return AIM_MIN + AIM_RANGE * (phase < 0.5 ? phase * 2 : 2 - phase * 2);
}

/** 落點離 Puma 的陀螺多近：正中是 1，超出命中範圍是 0（沒釘中）。 */
export function hitQuality(aim) {
  // 先四捨五入到 1e-9，避免 0.78 - 0.68 這類浮點誤差跨過邊界
  const d = Math.round(Math.abs(aim - PUMA_X) * 1e9) / 1e9;
  return d < HIT_RADIUS ? 1 - d / HIT_RADIUS : 0;
}

/**
 * 甩出那一刻的碰撞：撞擊力 = 出手品質 × 準度。夠大就把 Puma 的陀螺打倒；
 * 不夠就讓它掉轉速。只要釘中，訪客的陀螺也少轉 1 秒。
 */
export function collide({ quality, hit, mine, puma }) {
  if (!(hit > 0)) return { mine, puma, kind: 'miss' };
  const impact = quality * hit;
  const after = Math.max(BASE_SECONDS, mine - HIT_COST_SECONDS);
  if (impact >= KNOCKOUT_IMPACT) return { mine: after, puma: 0, kind: 'knockout' };
  return { mine: after, puma: puma * (1 - HIT_SLOWDOWN * impact), kind: 'hit' };
}

const BEST_KEY = 'heart-top:v1';

/** 本機最佳秒數；沒有紀錄、格式不對或讀不到 storage 時回 null。 */
export function readBest(storage) {
  try {
    const best = JSON.parse(storage.getItem(BEST_KEY))?.best;
    return typeof best === 'number' && Number.isFinite(best) ? best : null;
  } catch {
    return null;
  }
}

/** 比紀錄久才寫入（取到小數一位），回傳寫入後的最佳秒數；寫入失敗不影響遊戲。 */
export function saveBest(storage, seconds) {
  const current = readBest(storage);
  const rounded = Math.round(seconds * 10) / 10;
  if (current !== null && rounded <= current) return current;
  try {
    storage.setItem(BEST_KEY, JSON.stringify({ best: rounded }));
  } catch {}
  return rounded;
}
