/*
 * HEART 政策島：跟 Puma 打陀螺的音效。
 *
 * 全部用 Web Audio 即時合成，不載入音檔。預設靜音：訪客按喇叭打開聲音之前不建立
 * AudioContext。沒有 Web Audio 或任何一步出錯時都安靜地略過，不影響遊戲本身。
 * 頻率、長度、音量都是估計值，調整時同步更新 heart-island-top-sound 的 design 音效表。
 */

const SOUND_KEY = 'heart-top:sound';
const MASTER_VOLUME = 0.6;
const HUM_VOLUME = 0.03;
/**
 * 撞擊聲：低頻三角波的「咚」在筆電、手機喇叭幾乎放不出來，聽得到的主要是中高頻的
 * 木頭脆響「喀」（正弦波加一小段帶通雜訊）。
 *
 * @type {Record<'hit'|'knockout', { thump: number, thumpVol: number, thumpLen: number, crack: number, crackVol: number, crackLen: number, noiseVol: number }>}
 */
const IMPACT = {
  hit: { thump: 220, thumpVol: 0.5, thumpLen: 0.12, crack: 1300, crackVol: 1.3, crackLen: 0.06, noiseVol: 1.1 },
  knockout: { thump: 140, thumpVol: 0.3, thumpLen: 0.2, crack: 950, crackVol: 1.4, crackLen: 0.14, noiseVol: 1.5 },
};
/** 結果音：每個音的頻率（Hz），依序播放。 */
const RESULT_NOTES = {
  win: [523, 659, 784],
  lose: [392, 330, 262],
  tie: [440, 440],
};

/** 訪客有沒有打開聲音；只有存著 {"on":true} 才算開，其餘一律當作靜音。 */
export function readSoundOn(storage) {
  try {
    return JSON.parse(storage.getItem(SOUND_KEY))?.on === true;
  } catch {
    return false;
  }
}

/** 記住訪客的選擇；寫不進去就算了。 */
export function saveSoundOn(storage, on) {
  try {
    storage.setItem(SOUND_KEY, JSON.stringify({ on: on === true }));
  } catch {}
}

function defaultAudioContext() {
  try {
    return window.AudioContext || window.webkitAudioContext;
  } catch {
    return undefined;
  }
}

/**
 * @param {{ AudioContextCtor?: typeof AudioContext }} [options]
 * @return {{ enable(): void, disable(): void, resume(): void, whoosh(quality: number): void, impact(kind: 'hit'|'knockout'): void, land(): void, hum(me: number, puma: number): void, result(kind: 'win'|'lose'|'tie'): void, close(): void }}
 */
export function createTopSound({ AudioContextCtor = defaultAudioContext() } = {}) {
  let ctx = null;
  let master = null;
  let noiseBuffer = null;
  let hums = null;
  let on = false;
  let dead = !AudioContextCtor;

  /** 包住每個播放函式：沒開聲音就不做事，出錯就吞掉。 */
  const play = (fn) => (...args) => {
    if (!on || !ctx) return;
    try {
      fn(...args);
    } catch {}
  };

  const noise = () => {
    if (!noiseBuffer) {
      noiseBuffer = ctx.createBuffer(1, Math.floor(ctx.sampleRate * 0.5), ctx.sampleRate);
      const data = noiseBuffer.getChannelData(0);
      for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
    }
    return noiseBuffer;
  };

  /** 一個很快衰減掉的音。 */
  const tone = (freq, type, delay, duration, volume) => {
    const t = ctx.currentTime + delay;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, t);
    gain.gain.setValueAtTime(volume, t);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + duration);
    osc.connect(gain);
    gain.connect(master);
    osc.start(t);
    osc.stop(t + duration + 0.02);
  };

  /** 一段濾波過的雜訊，濾波頻率從 from 掃到 to。 */
  const hiss = (filterType, from, to, duration, volume) => {
    const t = ctx.currentTime;
    const src = ctx.createBufferSource();
    const filter = ctx.createBiquadFilter();
    const gain = ctx.createGain();
    src.buffer = noise();
    filter.type = filterType;
    filter.Q.setValueAtTime(1.2, t);
    filter.frequency.setValueAtTime(from, t);
    filter.frequency.exponentialRampToValueAtTime(to, t + duration);
    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.linearRampToValueAtTime(volume, t + Math.min(0.03, duration / 3));
    gain.gain.exponentialRampToValueAtTime(0.0001, t + duration);
    src.connect(filter);
    filter.connect(gain);
    gain.connect(master);
    src.start(t);
    src.stop(t + duration + 0.02);
  };

  const stopHum = () => {
    if (!hums) return;
    for (const h of hums) {
      try {
        h.osc.stop();
        h.osc.disconnect();
      } catch {}
    }
    hums = null;
  };

  const startHum = () => {
    hums = [0, 1].map(() => {
      const osc = ctx.createOscillator();
      const filter = ctx.createBiquadFilter();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(600, ctx.currentTime);
      gain.gain.setValueAtTime(0, ctx.currentTime);
      osc.connect(filter);
      filter.connect(gain);
      gain.connect(master);
      osc.start();
      return { osc, gain };
    });
  };

  return {
    enable() {
      if (dead) return;
      try {
        if (!ctx) {
          ctx = new AudioContextCtor();
          master = ctx.createGain();
          master.connect(ctx.destination);
        }
        master.gain.setValueAtTime(MASTER_VOLUME, ctx.currentTime);
        on = true;
        ctx.resume?.()?.catch?.(() => {});
      } catch {
        dead = true;
        on = false;
        ctx = null;
      }
    },
    disable() {
      on = false;
      try {
        stopHum();
        master?.gain.setValueAtTime(0, ctx.currentTime);
      } catch {}
    },
    resume: play(() => {
      ctx.resume?.()?.catch?.(() => {});
    }),
    whoosh: play((quality) => {
      hiss('bandpass', 500, 1200 + 1800 * quality, 0.25, 0.1 + 0.15 * quality);
    }),
    impact: play((kind) => {
      const fx = IMPACT[kind] || IMPACT.hit;
      tone(fx.thump, 'triangle', 0, fx.thumpLen, fx.thumpVol);
      tone(fx.crack, 'sine', 0, fx.crackLen, fx.crackVol);
      hiss('bandpass', 3000, 1500, fx.crackLen * 0.6, fx.noiseVol);
    }),
    land: play(() => {
      tone(90, 'sine', 0, 0.15, 0.6);
    }),
    hum: play((me, puma) => {
      if (me <= 0 && puma <= 0) {
        stopHum();
        return;
      }
      if (!hums) startHum();
      [me, puma].forEach((speed, i) => {
        const s = Math.max(0, speed);
        hums[i].osc.frequency.setTargetAtTime(60 + 120 * s, ctx.currentTime, 0.05);
        hums[i].gain.gain.setTargetAtTime(HUM_VOLUME * s, ctx.currentTime, 0.05);
      });
    }),
    result: play((kind) => {
      (RESULT_NOTES[kind] || []).forEach((freq, i) => tone(freq, 'triangle', i * 0.13, 0.12, 0.25));
    }),
    close() {
      on = false;
      dead = true;
      try {
        stopHum();
        ctx?.close?.()?.catch?.(() => {});
      } catch {}
      ctx = null;
    },
  };
}
