---
title: Album 相簿部落格：全自動化相簿匯入與 RAG 提示詞工程
description: 深度解析 Flickr 歷史相簿遷移的自動化實作、文章 RAG 檢索資料庫、關聯脈絡注入 AI 提示詞架構、多模型調度與跨頻道雙向 Wiki-link 路由修復
tags:
  - Docusaurus
  - Album
  - RAG
  - AI提示詞工程
  - 自動化
  - Wiki-link
sidebar_position: 50
date_created: 2026-10-02T00:00:00.000Z
date_updated: 2026-10-02T00:00:00.000Z
---

# Album 相簿部落格：全自動化相簿匯入與 RAG 提示詞工程

在 [[04 Album Blog Flickr 相簿匯入與自動化整合方案|方案設計篇]] 中，我們確立了以本地快照、Collections 樹狀映射、時序拍攝日期校正以及可插拔 AI 引擎來遷移 481 本 Flickr 歷史相簿。

然而，當面對如此龐大且珍貴的個人攝影紀錄時，純粹「機械式提取相片並排版」會產生一個嚴重的問題：**失去了作者當時身歷其境的記憶與心境**。

幸運的是，在作者深耕多年的 Obsidian 數位大腦中，早已存在數千篇詳實的旅行手札（`backpacker/`）、山林越野紀錄（`lifehacker/mount/`）與生活隨筆（`blog.life/`）。例如在 2014 年前往日本參加富士山馬拉松時，站內便有完整的賽事籌備、東京住宿手記與日光健行遊記。

如何讓自動化匯入管道在生成每一本相簿的內文時，**自動「想起」作者過去寫過的關聯文章**，並在相簿與文章之間編織出無縫的 **雙向知識圖譜連結（Bi-directional Links）**？

本文將深入剖析這套結合格外強大的 **全站文章 RAG 檢索庫**、**動態 Prompt 上下文注入**、**可插拔 CLI AI 調度引擎** 與 **Docusaurus 跨實例 Wiki-link 路由修復** 的工程實作細節。

---

## 🏛 核心系統架構一覽

整個自動化匯入與內容合成管線分為四大核心階段：

```mermaid
flowchart TD
    subgraph Phase 1: 離線資產與知識庫索引
        DB[(Flickr 快照資料庫<br/>481 Albums & 10 Collections)]
        VAULT[公開知識庫筆記<br/>backpacker, lifehacker, blog.life]
        BUILD_IDX[build-vault-index.py]
        RAG_IDX[(vault-articles-index.json<br/>1,018 篇結構化文章)]
        
        VAULT --> BUILD_IDX --> RAG_IDX
    end

    subgraph Phase 2: 相似度比對與 RAG 檢索 (import-flickr-albums.py)
        DB --> MATCHER[關聯文章比對引擎]
        RAG_IDX --> MATCHER
        
        MATCHER -->|計分維度: ID/系列/日期/關鍵字| RANK[Top 1~3 篇關聯手記]
    end

    subgraph Phase 3: Prompt 上下文工程與 AI 生成
        RANK --> PROMPT[Prompt 脈絡注入器]
        F_META[相簿中繼資訊: 地點/系列/挑選相片] --> PROMPT
        
        PROMPT --> ENGINE{CLI AI 引擎調度}
        ENGINE -->|預設| CLI_AGY[agy / Antigravity CLI]
        ENGINE -->|可選| CLI_OPENCODE[opencode]
        ENGINE -->|可選| CLI_PI[pi]
        
        CLI_AGY --> GEN_TXT[感性導言 + 故事短文 + 相關紀錄區塊]
    end

    subgraph Phase 4: 排版寫入與雙向回寫
        GEN_TXT --> ALBUM_MD[blog.album/YYYY/MM-DD-slug.md]
        RANK -->|--update-reciprocal| RECIPROCAL[更新原文章文末<br/>回寫相簿 Wiki-link]
        ALBUM_MD --> DOCU[Docusaurus Plugin Album]
    end
```

---

## 🔍 第一部分：文章 RAG 索引庫與相似度計分機制

### 1. 知識庫索引建置 (`scripts/build-vault-index.py`)

為了讓 Python 腳本能以毫秒級速度比對相簿與筆記，我們撰寫了專用的全站索引建置工具：

- **掃描範疇**：`backpacker/`（背包旅行手札）、`lifehacker/`（極客與登山生活）、`blog.life/`（生活隨筆）。
- **隱私邊界**：嚴格遵守專案 `.gitignore` 與受保護檔案規範（略過機密目錄與標有 `ai-dont-touch` / `NON-AI` 的檔案）。
- **結構化提取**：
  - `file_path`：檔案相對路徑。
  - `base_name`：Obsidian Wiki-link 標準引用名稱（例如 `Index Fujisan Marathon`）。
  - `title`：Frontmatter 標題或首個 H1。
  - `date`：文章發布或記錄日期（標準化為 `YYYY-MM-DD`）。
  - `tags`：分類與標籤清單。
  - `flickr_set_ids` / `flickr_photo_ids`：正規表達式提取內文中引用的舊 Flickr 相簿或相片 ID。
  - `clean_snippet`：去除 Markdown 語法、HTML 標籤後的純文字摘要（前 600 字元）。

執行建置後，產出索引庫 [`scripts/data/vault-articles-index.json`](file:///Users/kywk/obsidian/scripts/data/vault-articles-index.json)，目前收錄全站 **1,018 篇公開手札**。

### 2. 多維度相似度計分演算法（Scoring Algorithm）

當處理特定 Flickr 相簿時，比對器會依據以下權重公式對全量 1,018 篇文章計算相似分數：

| 比對維度 | 計分規則 | 權重 | 說明 |
|---|---|---|---|
| **Flickr ID 命中** | 筆記內文包含相簿 ID 或照片 ID | **+100 分** | 100% 確定為直接關聯筆記 |
| **Collections 系列命中** | 相簿所屬系列名稱（如 `Mt.Fuji marathon`）精確或子字串匹配文章路徑/標題 | **+60 分** | 相同主題行程（如 `1411 Mt Fuji Marathon/`） |
| **日期鄰近度** | 年月精確相同（`YYYY-MM`）<br/>年份相同（`YYYY`） | **+15 分**<br/>**+5 分** | 捕捉同期間發生的活動事件 |
| **地名與關鍵字命中** | 地點標籤（如 `日光`、`河口湖`、`劍岳`、`北大武`）出現在文章標題或標籤中 | **每個關鍵字 +10 分**（上限 30 分） | 主題語意契合 |
| **排除自我** | 文章本身路徑為 `blog.album/` | **-999 分** | 排除相簿自我循環引用 |

若最高評分達 **20 分以上**，即認定為相關手札，取分數最高的前 1～3 篇提取為上下文。

#### 實際命中案例：
* **相簿**：`Mt.Fuji marathon, 2014`（2014-11-26）
* **命中文章**：
  1. `backpacker/1411 Mt Fuji Marathon/Index Fujisan Marathon.md`（分數: 75）
  2. `backpacker/1411 Mt Fuji Marathon/141126_halo-nikko.md`（分數: 75）
  3. `backpacker/1411 Mt Fuji Marathon/note_lodge-tokyo-2014.md`（分數: 75）
* **相簿**：`聖境．北大武 (15.03.22)`（2015-03-21）
* **命中文章**：
  1. `lifehacker/mount/150322_mt-peitawu.md`（分數: 80）

---

## ✍️ 第二部分：AI 提示詞工程（Prompt Injection）

為了讓 AI 能扮演最貼近作者真實思維的「數位分身（Digital Twin）」，我們在 `scripts/import-flickr-albums.py` 中精心設計了上下文注入結構。

### 1. Prompt 模板結構

```markdown
你是一位具備細膩情感與沉穩文字風格的旅遊攝影家與生活記錄者（也是這座個人知識庫網站的作者）。
請為以下相簿撰寫一段優雅、富有畫面感、真實且不煽情的相簿介紹文章。

【相簿中繼資訊】
- 相簿名稱：{title}
- 拍攝日期：{date}
- 拍攝地點：{location}
- 所屬系列/主題：{series}
- 標籤分類：{tags}
- 精選照片張數：{photo_count} 張
- 精選照片列表：
{photos_list}

【作者知識庫關聯文章 (Vault Context)】
{vault_context}
（以上是作者當時在個人筆記中寫下的真實手記片段，請汲取其中的時空背景、旅程細節、心情氛圍，但不要直接生硬抄襲，讓相簿的文字與這些手記相互呼應。）

【輸出規範】
1. 開頭撰寫 1~2 段具有情境感與視覺畫面的短文（約 150-250 字）。
2. 在短文結束後，緊接著加入一行：<!--truncate-->
3. 接著撰寫正文短評（約 100-200 字），引導讀者欣賞接下來的照片。
4. 禁止憑空捏造具體人名或不存在的旅程事件，若無精確資訊則著重在自然景色、光影、節奏與氛圍。
5. 語氣真誠、沉穩，繁體中文（台灣習慣詞彙）。
```

### 2. 防呆與後備降級機制（Fallback Strategy）

CLI 調度過程中，難免遇到模型服務超時、網路偶發波動或指令異常中斷。腳本內建了完整的後備降級邏輯：
- 若 AI 引擎回傳錯誤或逾時（預設 60 秒），管線不會崩潰終止。
- 系統自動啟動 **純文字語意模板引擎**，依據相簿地點、年份與關聯手記自動合成結構化的自然導言，確保批次匯入 100% 成功交付。

---

## 🔌 第三部分：可插拔 CLI AI 調度引擎（Pluggable AI CLI）

使用者在日常維護時可能使用不同的終端 AI 工具。腳本支援透過 `--engine` 參數無縫切換：

```python
def call_ai_engine(engine: str, prompt: str) -> Optional[str]:
    """調度本機已安裝之 CLI AI 引擎"""
    if engine == "agy":
        # Google Antigravity CLI
        cmd = ["agy", "-p", prompt, "--dangerously-skip-permissions"]
    elif engine == "opencode":
        # opencode CLI
        cmd = ["opencode", "run", prompt]
    elif engine == "pi":
        # pi CLI
        cmd = ["pi", "-p", prompt]
    else:
        raise ValueError(f"不支援的 AI 引擎: {engine}")

    result = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True, timeout=90)
    return result.stdout.strip()
```

### 支援的命令列選項

| 參數 | 說明 | 預設值 |
|---|---|---|
| `--limit N` | 限制處理相簿數量 | `10` |
| `--engine <name>` | 指定 AI 引擎 (`agy` / `opencode` / `pi`) | `agy` |
| `--series <keyword>` | 僅處理特定系列名稱之相簿 | 無（全量） |
| `--dry-run` | 僅進行 RAG 比對與預覽，不寫入檔案 | `False` |
| `--update-reciprocal` | 自動在關聯手記文末寫入回向相簿連結 | `False` |
| `--force` | 強制覆寫已存在之相簿文章 | `False` |

---

## 🔗 第四部分：跨實例 Wiki-Link 路由修復與雙向互連

在將文章互連落地的過程中，我們遭遇並徹底解決了 Docusaurus 多實例架構下的經典 Wiki-link 路由解析問題。

### 1. 遭遇問題：Docs ➔ Blog 發生 404

在使用者實測由 `backpacker` 文章連向新生成的 `blog.album` 相簿時，點擊連結跳轉至：
```
/backpacker/11-26-mt-fuji-marathon-2014/ (404 Not Found)
```
而預期的正確路徑應為：
```
/album/2014/11/26/mt-fuji-marathon-2014/
```

### 2. 根因剖析（Root Cause Analysis）

在 `docusaurus.config.ts` 中，`remark-wiki-link` 插件原本透過 `createRemarkPlugins(docDir, routeBase)` 針對每個 docs 實例各自載入其目錄底下的 `fileMap`。

```typescript
// 🔴 修改前：僅能查找單一 docs 實例內之檔案
const fileMap = walkSync(docDir, { globs: ['**/*.md', '**/*.mdx'] });
// 當在 backpacker 遇到 [[11-26-mt-fuji-marathon-2014]] 時，
// fileMap 找不到該相簿，插件走 fallback 邏輯，並直接套用 hrefTemplate:
hrefTemplate: (permalink) => `${routeBase}${permalink}/` 
// 造成強制前綴 /backpacker/，產生 /backpacker/11-26-mt-fuji-marathon-2014/
```

### 3. 架構級解決方案

我們重構了 `docusaurus.config.ts` 的解析邏輯：

1. **共享全站全局路由表（`contentLinkIndex`）**：
   引入 `scripts/content-links.js` 中建立的 `createContentLinkIndex()`，該索引涵蓋全站所有 docs（`backpacker`、`lifehacker`、`moco`）與 blogs（`blog.album`、`blog.life`、`blog.news`）。
2. **條件式 hrefTemplate 解析**：
   在 `docusaurus.config.ts` 中改為：
   ```typescript
   // 🟢 修改後：全站唯一 Content Link Index + 智慧前綴
   createRemarkPlugins: (contentLinkIndex, routeBase) => {
     return [
       [
         remarkWikiLink,
         {
           aliasDivider: '|',
           pageResolver: (name: string) => {
             // 1. 先查全站跨頻道索引
             const resolved = contentLinkIndex.resolve(name);
             if (resolved) {
               return [resolved.permalink]; // 如 /album/2014/11/26/mt-fuji-marathon-2014/
             }
             // 2. Fallback 回傳標準 slug
             return [slugger(name)];
           },
           hrefTemplate: (permalink: string) => {
             // 若已是全站絕對路徑（如 /album/... 或 /moco/...），直接保留！
             if (permalink.startsWith('/')) {
               return permalink;
             }
             // 若為同實例相對路徑，才加上 routeBase
             return `${routeBase}${permalink}/`;
           },
         },
       ],
     ];
   }
   ```
3. **保留 Hash Anchor 錨點支援**：
   在 `scripts/content-links.js` 的 `resolve(name)` 中加入 `#` 切割邏輯，確保如 `[[note_lodge-tokyo-2014#交通]]` 能精確導航至文章特定章節。

修復後執行全站建置，全站跨實例雙向跳轉 **100% 成功通過編譯與路由驗證**！

### 4. 雙向互連回寫機制（Reciprocal Linking）

當指定 `--update-reciprocal` 參數時，腳本會自動讀取命中文章，檢查其文末是否已有相關相簿區塊；若無，則自動追加：

```markdown
## 相關相簿

- [[11-26-mt-fuji-marathon-2014|Mt.Fuji marathon, 2014 (相簿紀錄)]]
```

這使得旅人從部落格相簿欣賞美圖時，能一鍵點進完整遊記；而閱讀技術與行程筆記時，也能隨時點擊回看高畫質影像，讓靜態網站成為真正活絡的知識圖譜。

---

## 📊 首批 10 本相簿匯入成果比對

| 相簿名稱 | 拍攝日期 | 挑選張數 | RAG 關聯命中文章 | 雙向 Wiki-link 驗證 |
|---|---|---|---|---|
| **京都 夢** | `2017-12-07` | 10 張 | `Kensai around` 關聯紀錄 | `/album/2017/12/07/kyoto-dream-171207/` |
| **Mt. Tsurugi Dake** | `2015-07-29` | 4 張 | `lifehacker/mount/` 日本山岳手記 | `/album/2015/07/29/mt-tsurugi-dake/` |
| **聖境．北大武** | `2015-03-21` | 10 張 | `[[150322_mt-peitawu]]`（屏東北大武山紀行） | `/album/2015/03/21/beidawu-mountain/` |
| **FlashMob HK** | `2014-12-26` | 10 張 | `blog.life/2014/` 快閃紀錄 | `/album/2014/12/26/flashmob-hk/` |
| **Mt.Fuji marathon** | `2014-11-26` | 10 張 | `[[Index Fujisan Marathon]]`、`[[141126_halo-nikko]]` | `/album/2014/11/26/mt-fuji-marathon-2014/` |
| **Tokyo 銀杏祭** | `2014-12-01` | 2 張 | `[[note_lodge-tokyo-2014]]`（東京手記） | `/album/2014/12/01/tokyo-ginkgo-festival/` |
| **富士山．河口湖** | `2014-11-29` | 5 張 | `[[Index Fujisan Marathon]]`（河口湖巡禮） | `/album/2014/11/29/fuji-kawaguchiko/` |
| **Nikko 日光 世界遺產** | `2014-11-26` | 10 張 | `[[141126_halo-nikko]]`（日光二社一寺紀行） | `/album/2014/11/26/nikko-world-heritage/` |
| **越野．能高** | `2014-11-22` | 10 張 | `lifehacker/runner/` 能高越嶺越野筆記 | `/album/2014/11/22/trail-nenggao/` |
| **草嶺古道 桃源谷** | `2014-11-06` | 10 張 | `lifehacker/mount/` 草嶺桃源古道手記 | `/album/2014/11/06/caoling-historic-trail/` |

---

## 🎯 總結與維運最佳實踐

這套整合方案成功將「封存於外部平台的冰冷照片」與「儲存於本地 Vault 的鮮活手札」串聯起來，關鍵效益包括：

1. **零維護負擔**：Flickr 不再更新，本地永久快照保障了資產的安全與可重現性。
2. **真實記憶喚醒**：藉由 RAG 檢索，AI 生成的每一篇文字都有所本，不浮誇、不虛構，忠實延續作者的文字脈絡。
3. **極致閱讀體驗**：解決了 Docusaurus 跨實例路由痛點，全站 Wiki-link 自然暢通，兼顧 Obsidian 編輯器與網頁發布的雙重標準。
4. **靈活延伸性**：未來無論切換至任何本機開源模型或新興 AI CLI，管線架構均可即插即用。
