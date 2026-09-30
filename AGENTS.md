# Obsidian Vault 與 kywk.me

使用繁體中文及台灣常用詞彙回覆。這個 repository 同時是 Obsidian vault 與 Docusaurus 網站原始碼；Markdown 檔案可能是個人知識筆記、未發布草稿或公開內容，編輯前先看所屬目錄與 Git 忽略狀態。

## 專案原則

- 保留 Obsidian 可編輯性：優先沿用現有 frontmatter、wiki-link、模板與目錄慣例。不要為了網站輸出而批次重寫筆記或整份序列化 frontmatter。
- 把內容和程式視為不同工作範圍。只修改完成任務所需的檔案；保留工作區既有變更，不做無關整理、搬移或格式化。
- 不推測或補造個人經歷、日期、財務資訊、工作內容及來源。若改寫公開文章，保留原意與作者語氣；有不確定事實時留下問題或標記，不要當成已確認資訊。
- 不把憑證、個資、私人筆記或私有資料帶進公開追蹤檔案、範例、日誌或網站。勿讀取或修改與任務無關的私人目錄。
- `.gitignore` 排除的內容（例如 `important/`、`finance/`、`com.nanshan/`、`_journaling/`、`_incoming/`、`_templates/`、`assets/`、`.obsidian/` 的多數內容）不屬於公開網站內容。不要解除忽略或加入追蹤，除非任務明確要求且已確認內容可公開。
- 新增或移動公開頁面時，同時檢查內部連結、圖片路徑、側欄或相應內容集合；不要只改檔名而留下失效引用。
- 不假設專案說明永遠正確；遇到衝突時先以目前程式、`package.json`、CI 設定和近期文件為準，並修正造成誤導的文件。

## 鐵定律：受保護筆記

AI agent 不得任意異動帶有下列任一標記的檔案：

- frontmatter 有 `ai-dont-touch: true`
- frontmatter `tags` 含 `NON-AI`，或內文出現 `#NON-AI` tag

遇到受保護檔案時：

- **大範圍的改寫或整理指令**（批次改寫、統一格式、重排 frontmatter、「幫我把筆記整理一下」等）一律略過：不修改、不搬移、不刪除，也不移除標記本身。批次作業開始前先盤點受保護檔案，並從目標清單中排除。
- **指令指名該檔案**時，必須先停下來再次確認同意才能修改。原始指令提到檔名不算同意。
- 其他未定義的標記不要自行推定其意義，詢問使用者後再判斷。

批次作業前先盤點已追蹤的受保護檔案：

```bash
git grep -l -i -E 'ai-dont-touch:[[:space:]]*true|NON-AI' -- '*.md' ':(exclude)AGENTS.md'
```

這支只涵蓋已追蹤檔案；若指令範圍包含 `.gitignore` 排除的目錄，對該範圍另外確認。

## 依需載入

只讀本次任務相關的規範與文件，不預載整個 vault。

| 任務 | 先讀 |
|---|---|
| 新增、編輯、整理 Markdown／frontmatter／wiki-link | [內容與 Obsidian 規範](docs/agents/content.md)、[README.md](README.md) |
| 編輯 Docusaurus 設定、主題、路由、樣式或部署 | [網站工程規範](docs/agents/website.md)、[README.md](README.md) |
| 修改 `scripts/` 或 `plugins/` | [工具與插件規範](docs/agents/tooling.md)、[SCRIPTS-GUIDE.md](SCRIPTS-GUIDE.md)、[PLUGIN-INSTALL-GUIDE.md](PLUGIN-INSTALL-GUIDE.md)（按需） |
| 重新命名或搬移已發布頁面 | skill `vault-file-rename`（`.agents/skills/`）、[內容與 Obsidian 規範](docs/agents/content.md)、[網站工程規範](docs/agents/website.md) |
| 為旅遊行程看板加天氣／日出日落卡片 | skill `kanban-travel-schedule`（`.agents/skills/`） |

`.agents/skills/` 是 agent skill 的來源，原本的 `.amazonq/` 規則檔已轉為 skill 並移除。slug 行為一律以 `README.md`、`docusaurus.config.ts` 與 `plugins/remark-slug-normalizer/` 的現況為準，不要在 frontmatter 手動維護 `slug:`。

## 修改後的檢查

- 依變更範圍選擇檢查，不要為單純筆記修改跑網站建置。
- 程式或設定變更可使用 `npm run typecheck`、`npm run content:check`、`npm run content:slug` 及 `npm run build` 中與變更相關的項目。部署前的 CI 流程為 typecheck、content check、build。
- 內容檢查的 warning 和 error 意義不同；除非任務要求嚴格品質檢查，勿把既有 warning 說成建置失敗。
- 若未執行檢查，回報中清楚說明。
