// Adaptive render resolution for the island (app.js).
// When frames run long for a couple of seconds, step the pixel ratio down; when there is clear headroom, step it back up.
// Steps are coarse and slow (≥ 2.5 s apart) so the picture never pumps.
// The frame time is the gap between animation frames, which also stretches when the browser caps the frame rate
// (an energy saver at 30 fps) rather than because drawing is slow. So every step down has to pay off: if frames are
// not at least 10% faster by the next check, that step is undone and the ratio is left alone for a while (lockMs).
//
// 2026-10-25 review fixes:
// - Decisions use the plain mean of the frames since the last change (a fresh window per step), not a running average
//   carried across steps. The running average was still climbing when the first step was taken, so the "before" value
//   was too low and a step that really helped (37 → 30 ms) was judged useless and undone.
// - The first seconds after load (shader compiles, texture uploads, label set-up) are ignored, and the lock after an
//   unhelpful step expires instead of switching the governor off for the rest of the visit.
export function createResolutionGovernor({ max, min, step = 0.25, settleMs = 2500, slowMs = 22, fastMs = 14, minGain = 0.1, warmupMs = 4000, lockMs = 120000 }) {
  let ratio = max,
    windowStart = null,
    sum = 0,
    count = 0,
    meanBeforeStep = null,
    lockedUntil = -Infinity,
    startedAt = null;
  const restart = (now) => {
    windowStart = now;
    sum = 0;
    count = 0;
  };
  const set = (next, now) => {
    ratio = next;
    restart(now);
    return ratio;
  };
  return {
    get ratio() {
      return ratio;
    },
    // Returns the new pixel ratio when it changes, otherwise null.
    sample(now, frameMs, hidden = false) {
      if (startedAt === null) (startedAt = now), restart(now);
      if (now - startedAt < warmupMs) return void restart(now), null; // load-time stutter is not steady-state cost
      if (hidden || frameMs > 250) return null; // tab switches and stalls say nothing about steady-state cost
      sum += frameMs;
      count++;
      if (now - windowStart < settleMs || count < 20) return null;
      const mean = sum / count;
      if (meanBeforeStep !== null) {
        const before = meanBeforeStep;
        meanBeforeStep = null;
        if (mean > before * (1 - minGain)) {
          lockedUntil = now + lockMs; // this step did not pay off (frame-rate cap, CPU-bound): undo it and wait
          return set(Math.min(max, +(ratio + step).toFixed(2)), now);
        }
      }
      if (now < lockedUntil) return void restart(now), null;
      let next = ratio;
      if (mean > slowMs && ratio > min) next = Math.max(min, +(ratio - step).toFixed(2));
      else if (mean < fastMs && ratio < max) next = Math.min(max, +(ratio + step).toFixed(2));
      if (next === ratio) return void restart(now), null;
      if (next < ratio) meanBeforeStep = mean;
      return set(next, now);
    },
  };
}
