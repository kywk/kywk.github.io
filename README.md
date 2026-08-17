# kywk.me - Obsidian + Docusaurus 整合系統

這是一個結合 Obsidian 本地編輯器與 Docusaurus 網站生成器的個人知識管理與發布系統。

## 專案架構

### 📁 內容組織
- **backpacker/**: 旅遊記錄與遊記 (142 檔案)
- **lifehacker/**: 生活技巧、登山、攝影、閱讀等 (84 檔案)
- **moco/**: 技術文件 (程式開發、工具使用) (224 檔案)
- **blog.life/**: 個人生活部落格 (42 檔案)
- **blog.news/**: 技術新聞與資訊 (52 檔案)
- **總計**: 1,777 Markdown 檔案（含未發佈的 `_incoming/`、`_journaling/` 等），實際產出 916 頁

### 🔧 技術特色
- **Wiki Link 支援**: 使用 `remark-wiki-link` 插件，支援 Obsidian 的 `[[]]` 連結語法及 `[[target|display]]` 別名語法
- **多文檔站點**: 透過多個 `@docusaurus/plugin-content-docs` 實例管理不同主題
- **雙部落格系統**: 分離個人生活 (life) 和技術資訊 (news)
- **Mermaid 圖表**: 支援流程圖和圖表渲染
- **中文本地化**: 預設語言設為 `zh-TW`
- **站內搜尋**: `@easyops-cn/docusaurus-search-local` 純靜態全文搜尋，含中文分詞，索引於 build 時自動產生（無外部服務）
- **自動化工具**: 內容驗證、圖片優化、slug 注入、連結轉換

### 🎯 Obsidian 插件支援

#### Kanban 看板
透過 `remark-obsidian-kanban` 插件，支援 Obsidian Kanban 格式：
- 自動偵測 `kanban-plugin: board` frontmatter
- 將 Markdown 任務列表渲染為互動式看板
- 支援 wiki-link 連結解析

#### Leaflet 地圖
透過 `remark-obsidian-leaflet` 插件，支援互動式地圖：
- 使用 `leaflet` 程式碼區塊定義地圖
- 支援 `markerFolder` 自動讀取含 `location` frontmatter 的 Markdown 檔案
- 深色/淺色主題自動切換
- 地圖標記支援中文標題和連結
- **按需載入**: Leaflet CSS/JS 不掛全域，由 `static/js/leaflet-init.js` 偵測到頁面上有地圖才注入（全站僅 3 頁需要）

範例：
```markdown
\`\`\`leaflet
id: my-map
lat: 25.0330
long: 121.5654
defaultZoom: 12
markerFolder: backpacker/trip/places
\`\`\`
```

## 開發指令

### 安裝依賴
```bash
npm install
```

### 本地開發
```bash
npm start
```
啟動本地開發伺服器，支援熱重載

### 建置網站
```bash
npm run build
```
生成靜態網站檔案至 `build/` 目錄

### 部署到 GitHub Pages
```bash
npm run deploy
```
自動建置並部署到 `gh-pages` 分支

### 內容管理指令
```bash
npm run content:check      # 驗證內容格式與連結
npm run content:optimize   # 優化圖片大小與品質
npm run content:slug       # 注入 slug frontmatter
npm run content:wikilink   # 轉換 Markdown 連結為 wiki-link
npm run deploy:preview     # 建置並預覽部署結果
```

> 📖 詳細使用說明請參考 [SCRIPTS-GUIDE.md](./SCRIPTS-GUIDE.md)

### 其他指令
```bash
npm run serve          # 本地預覽建置結果
npm run clear          # 清除快取
npm run typecheck      # TypeScript 類型檢查
```

## ⚠️ 重要注意事項

### 內容管理自動化

**內容驗證**：
```bash
npm run content:check
```
檢查 frontmatter 必填欄位、wiki 連結、檔案路徑等問題。

**圖片優化**：
```bash
npm run content:optimize
```
自動壓縮圖片，需安裝 ImageMagick (`brew install imagemagick`) 或 Sharp。

**站內搜尋**：

不需要任何指令。搜尋由 `@easyops-cn/docusaurus-search-local` 提供，索引在 `npm run build`
時自動產生（`build/search-index.json`，目前約 9,500 筆），搜尋頁在 `/search`。

> 舊的 `scripts/build-search-index.js` 已移除：它從未被接進 build 流程，
> 且會產生與外掛衝突的 `static/search-index.json` 與 `src/pages/search.md`。

### 檔名/資料夾名稱含空格的處理

Docusaurus 預設會將檔案路徑中的空格編碼為 `%20`，導致 URL 不美觀。本專案透過 `slug` frontmatter 注入來解決此問題。

**新增含空格的檔案時，需執行：**
```bash
npm run content:slug
```

> ⚠️ 這個步驟原本掛在 `prebuild`，每次 build 都會改寫內容檔（本機 build 完 working tree
> 就變髒）。目前 450 個檔案都已注入完成（`450 scanned, 0 modified`），因此已從 `prebuild`
> 移除，改為手動執行。

此腳本會：
- 掃描 `backpacker/`、`lifehacker/`、`moco/` 目錄
- 為路徑含空格的 Markdown 檔案自動注入正規化的 `slug` frontmatter
- 將空格轉換為破折號 (例如：`2401 Egypt` → `/2401-Egypt/`)
- 已有 `slug` 的檔案會被跳過

**建議**：新增檔案時直接使用破折號或底線命名，避免空格。

### Markdown 連結轉 Wiki-link

為維持 Obsidian 相容性，專案內部連結應使用 wiki-link 格式 `[[file]]` 而非 Markdown 格式 `[text](./file.md)`。

**轉換 Markdown 連結為 wiki-link：**
```bash
npm run content:wikilink
```

此腳本會：
- 將 `[text](./file.md)` 轉換為 `[[file|text]]`
- 若連結文字與檔名相同，簡化為 `[[file]]`
- 僅處理相對路徑 (`./` 或 `../`) 的 `.md` 連結


## 重要配置

### docusaurus.config.ts
- **多文檔配置**: 每個主題 (backpacker, lifehacker, moco) 都有獨立的文檔實例
- **preset-classic 的預設 docs/blog 已關閉** (`docs: false, blog: false`)，避免多出 `/docs`、`/blog` 空路由
- **Wiki Link 解析**: 自動將 `[[]]` 語法轉換為 Docusaurus 連結（⚠️ 目前只掛在 docs 實例，blog 尚未支援，詳見下方待辦）
- **Remark 插件鏈**: remarkSlugNormalizer → remarkLeaflet → remarkKanban → remarkWikiLink
- **效能 flags**: `future.faster` 全開 + `future.v4.removeLegacyPostBuildHeadAttribute`
  （`ssgWorkerThreads` 的前置條件），詳見 [Docusaurus v3 升級筆記](./moco/Obsidian/docusaurus/Docusaurus%20v3%20Upgrading.md)
- **部署設定**: 配置 GitHub Pages 部署參數

### 自訂插件

本專案支援多種插件安裝方式：

**安裝方式**：
1. **NPM 安裝** (推薦): `npm install remark-obsidian-kanban remark-obsidian-leaflet remark-slug-normalizer`
2. **手動 Clone**: 直接 clone 到 `plugins/` 目錄
3. **本地開發**: 在 `plugins/` 目錄下直接開發

系統會自動按優先順序載入可用的插件。詳細說明請參考 [PLUGIN-INSTALL-GUIDE.md](./PLUGIN-INSTALL-GUIDE.md)。

| 檔案 | 說明 |
|------|------|
| `plugins/remark-obsidian-kanban/` | Obsidian Kanban 看板渲染 |
| `plugins/remark-obsidian-leaflet/` | Obsidian Leaflet 地圖渲染 |
| `plugins/remark-slug-normalizer/` | URL slug 正規化 (統一模組) |
| `scripts/inject-slug-frontmatter.js` | 批次注入 slug frontmatter |
| `scripts/convert-to-wikilinks.js` | Markdown 連結轉 wiki-link |
| `scripts/content-validator.js` | 內容驗證與檢查 |
| `scripts/optimize-images.js` | 圖片壓縮與優化 |

### package.json
- **版本**: 17.71
- **核心依賴**: Docusaurus 3.10.2, React 19.2
- **特殊插件**: remark-wiki-link, gray-matter, @easyops-cn/docusaurus-search-local
- **內容管理**: 自動化驗證、優化、slug 注入腳本

## Obsidian 整合
- **.obsidian/**: 完整的 Obsidian 配置，包含多個插件
- **同步機制**: 透過 Dropbox 同步，實現跨裝置編輯
- **模板系統**: 使用 Templater 等插件提升編輯效率

## 部署流程
- **GitHub Pages**: 自動部署到 `kywk.github.io`
- **CI/CD**: 透過 `.github/workflows/` 自動化部署
  - `deploy.yml` (push to main) 與 `test-deploy.yml` (PR) 都會依序執行
    `typecheck` → `content:check` → `build`
  - `content:check` 目前是 `continue-on-error`（只輸出報告不擋 deploy），因為還有 113 個
    既有內容問題。其中 72 個是「Missing required field 'title'」—— 這條規則對本站不適用
    （Docusaurus 會從 H1 推導標題），待放寬規則後再改成阻擋
- **版本控制**: 使用 Git 管理內容版本

## 已知待辦

- **Wiki-link 尚未支援 blog**: `remark-wiki-link` 只掛在 3 個 docs 實例上，
  `blog.news` / `blog.life` 內的 22 個 `[[...]]` 會以原文顯示。要修需要先建立跨 vault 的
  全站索引（含 blog 的日期式 permalink 推導），否則 16 個跨 vault 連結會指向錯誤路由
- **85 條 broken links**: 主要是 wikilink 指向不存在的筆記（40）、舊的 `[[標題:說明]]`
  冒號別名語法（23）、`[[moco/...]]` 帶 vault 前綴（4）。全部修完後可把
  `onBrokenLinks` 從 `warn` 改成 `throw`
- **路由大小寫不一致**: slug 注入只處理過部分檔案，導致同一目錄下
  `/moco/utilities/cli/yazi/`（小寫）與 `/moco/Utilities/CLI/fzf/`（原大小寫）並存，
  而 wikilink resolver 一律轉小寫 → `[[fzf]]`、`[[OpenJDK]]`、`[[TOGO]]` 等會連錯。
  要統一小寫會改動既有 URL，需另行評估
