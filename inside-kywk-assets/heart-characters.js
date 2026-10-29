/*
 * HEART 政策島：連回角色測驗。右側清單搜尋框上方放測驗入口；區域卡連到該區的角色結果頁。
 *
 * 點選一區時 app.js 會把區域卡寫進 #card-content，卡片的「政策細項」是一個 .rows，
 * 裡面每個細項是 [data-building] 按鈕。這支腳本用第一個細項的建築 id 認出是哪一區，
 * 那一區有角色就在 .rows 後面加上「這一區在照顧誰」與角色連結。只碰 DOM，不改 app.js。
 *
 * 區域、建築與角色的資料由伺服器放在 #heart-characters-data（HeartController::island），
 * 和角色結果頁的「到政策島逛逛」共用同一張對應表；測驗入口的文字也從那裡來，與測驗頁開頭相同。
 */
import { track as defaultTrack } from "./analytics.js?v=20261022-4";

const STYLE_ID = "heart-characters-style";
const STYLE = `
.heart-characters .row{color:inherit;text-decoration:none}
.heart-characters .row .nm{font-weight:600}
.heart-quiz-entry{display:grid;grid-template-columns:1fr auto;gap:2px 10px;align-items:center;min-height:44px;margin:0 0 10px;padding:10px 12px;border:1px solid #f2c9b3;border-radius:12px;background:#fff6ec;color:inherit;text-decoration:none}
.heart-quiz-entry:hover{border-color:var(--coral)}
.heart-quiz-entry-title{grid-column:1;font-size:14px;font-weight:800}
.heart-quiz-entry-lead{grid-column:1;font-size:11px;line-height:1.5;color:var(--muted)}
.heart-quiz-entry i{grid-column:2;grid-row:1 / span 2;font-style:normal;font-size:18px;color:var(--coral)}
@media (max-width: 800px) {
  .sidebar:not(.full) .heart-quiz-entry { display: none; }
}
`;

const en = () => document.documentElement.lang === "en";

function injectStyle() {
  if (document.getElementById(STYLE_ID)) return;
  const style = document.createElement("style");
  style.id = STYLE_ID;
  style.textContent = STYLE;
  document.head.append(style);
}

/**
 * The district a card belongs to, from the building ids its policy detail list carries.
 *
 * @param {Element} content
 * @param {Record<string, { buildings: string[] }>} districts
 * @returns {string | null}
 */
function districtOf(content, districts) {
  const building = content.querySelector(".rows [data-building]")?.dataset.building;
  if (!building) return null;
  return Object.keys(districts).find((id) => districts[id].buildings?.includes(building)) ?? null;
}

/**
 * Put the quiz entry right before the policy list search, once.
 *
 * @param {Element | null} search
 * @param {{ title: string, lead: string, href: string } | undefined} quiz
 * @param {(name: string, params: Record<string, string>) => void} track
 */
function addQuizEntry(search, quiz, track) {
  if (!search || !quiz || typeof quiz !== "object" || !quiz.href) return;
  if (search.parentElement?.querySelector(".heart-quiz-entry")) return;
  injectStyle();
  const entry = document.createElement("a");
  entry.className = "heart-quiz-entry";
  entry.href = quiz.href;
  entry.target = "_blank";
  entry.rel = "noopener";
  entry.innerHTML = '<span class="heart-quiz-entry-title"></span><span class="heart-quiz-entry-lead"></span><i aria-hidden="true">›</i>';
  entry.querySelector(".heart-quiz-entry-title").textContent = quiz.title;
  entry.querySelector(".heart-quiz-entry-lead").textContent = quiz.lead;
  entry.addEventListener("click", () => track("heart_island_quiz_link", {}));
  search.before(entry);
}

/**
 * @param {{
 *   data?: { quiz?: { title: string, lead: string, href: string }, districts?: Record<string, { buildings: string[], characters: { key: string, label: string, href: string }[] }> },
 *   content?: Element | null,
 *   search?: Element | null,
 *   track?: (name: string, params: Record<string, string>) => void,
 * }} [options]
 */
export function mountHeartCharacters({ data, content = document.querySelector("#card-content"), search = document.querySelector("#search"), track = defaultTrack } = {}) {
  if (!data || typeof data !== "object") return { destroy() {} };
  addQuizEntry(search, data.quiz, track);
  const districts = data.districts && typeof data.districts === "object" ? data.districts : null;
  if (!districts || !content) return { destroy() {} };

  function ensureLinks() {
    if (content.querySelector(".heart-characters")) return;
    const rows = content.querySelector(".rows");
    const district = districtOf(content, districts);
    const characters = district ? districts[district].characters || [] : [];
    if (!rows || !characters.length) return;

    injectStyle();
    const block = document.createElement("div");
    block.className = "heart-characters";
    const heading = document.createElement("h3");
    heading.textContent = en() ? "WHO THIS HELPS" : "這一區在照顧誰";
    const list = document.createElement("div");
    list.className = "rows";
    for (const character of characters) {
      const link = document.createElement("a");
      link.className = "row heart-character-link";
      link.href = character.href;
      link.target = "_blank";
      link.rel = "noopener";
      link.innerHTML = '<span class="dot"></span><span class="nm"></span><span class="ph"></span><i aria-hidden="true">›</i>';
      link.querySelector(".nm").textContent = character.label;
      link.addEventListener("click", () => track("heart_island_character_link", { item_id: district, character: character.key }));
      list.append(link);
    }
    block.append(heading, list);
    rows.after(block);
  }

  const observer = new MutationObserver(ensureLinks);
  observer.observe(content, { childList: true });
  ensureLinks();

  return {
    destroy() {
      observer.disconnect();
    },
  };
}

/** The data block the server injects, or null when it is missing or is not valid JSON. */
export function readData() {
  try {
    return JSON.parse(document.getElementById("heart-characters-data")?.textContent || "null");
  } catch {
    return null;
  }
}

if (document.querySelector("#card-content")) mountHeartCharacters({ data: readData() });
