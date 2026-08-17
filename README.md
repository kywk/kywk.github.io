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
- **URL 正規化**: slug 由 build 時的 hook 依檔案路徑推導，全站規則一致，原始檔不受汙染
- **自動化工具**: 內容驗證、圖片優化、slug 檢查、連結轉換

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
npm run content:check      # 驗證內容（有 error 才失敗，warning 不擋）
npm run content:optimize   # 優化圖片（加 -- --dry-run 只預覽）
npm run content:slug       # 檢查 slug（:fix 清理、:write 寫入）
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
npm run content:check            # 有 error 才 exit 1
npm run content:check -- --strict  # warning 也視為失敗
```
- **error**（會讓 build 失敗）：frontmatter 用 tab 縮排、控制字元、`foo: : bar` 這類重複冒號
- **warning**：既無 `title` frontmatter 又無 H1、tag 開頭是 `#`、舊的 `[[標題:說明]]` 冒號語法、內容過短

**圖片優化**：
```bash
npm run content:optimize -- --dry-run   # 先看會處理哪些、能省多少
npm run content:optimize                # 實際壓縮（就地覆寫，無備份）
```
需安裝 ImageMagick (`brew install imagemagick`) 或 sharp。找不到工具時會明確回報跳過幾張，
不會再假裝「沒有圖片需要壓縮」。

**站內搜尋**：

不需要任何指令。搜尋由 `@easyops-cn/docusaurus-search-local` 提供，索引在 `npm run build`
時自動產生（`build/search-index.json`，目前約 9,500 筆），搜尋頁在 `/search`。

> 舊的 `scripts/build-search-index.js` 已移除：它從未被接進 build 流程，
> 且會產生與外掛衝突的 `static/search-index.json` 與 `src/pages/search.md`。

### URL slug 的產生方式

**規則只有一條，寫在一個地方。** `docusaurus.config.ts` 的 `markdown.parseFrontMatter`
在 build 時由檔案路徑即時推導 slug，**不寫回原始檔**：

1. 取 vault 內的相對路徑，去掉 `.md`/`.mdx`
2. 去掉結尾的 `/index`（`1901 Paul/index.md` → `/1901-paul/`，不會多一段 `/index/`）
3. 每個路徑段：轉小寫 → 空白與底線換成 `-` → 收合連續 `-` → 去掉頭尾 `-` → 移除引號
4. docs 產生 `/a/b/`；blog 產生 `/YYYY/MM/DD/title`（沿用 Docusaurus 的日期結構）

推導函式在 `plugins/remark-slug-normalizer/src/index.js` 的 `deriveSlug()`，
**同時被三個地方使用**：parseFrontMatter hook、`npm run content:slug`、wikilink 的 pageResolver。
三者共用同一份實作，所以「路由」與「`[[wikilink]]` 產生的網址」不可能不一致。

因此：**新增檔案不需要做任何事**，也不需要在 frontmatter 寫 `slug:`。
檔名和資料夾名可以自由使用空格、大小寫、中文。

```bash
npm run content:slug          # 檢查：列出每個檔案的 slug、偵測衝突與殘留設定
npm run content:slug:fix      # 清理：移除檔案裡多餘的 slug frontmatter
npm run content:slug:write    # 寫入：把推導出的 slug 寫回 frontmatter（想在 Obsidian 裡看到時）
```

> 歷史：原本是 `prebuild` 自動跑 `inject-slug-frontmatter.js` 把 slug 寫進檔案，
> 但它只處理「路徑含空格」的檔案，所以 `Utilities/CLI` 這種目錄永遠不會被正規化 ——
> 這是路由大小寫不一致的根因。加上它用 gray-matter 重新序列化整份 frontmatter，
> 會把 `date_created: 2026-07-26` 改寫成 ISO 時間戳並和 Obsidian 來回打架。已移除。

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
- **Remark 插件鏈**: remarkLeaflet → remarkKanban → remarkWikiLink
  （slug 不在 remark 階段處理 —— Docusaurus 在 processDocMetadata 就算好 permalink，
  remark 是之後才在 mdx-loader 跑的，改 frontmatter 已經來不及）
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
| `plugins/remark-slug-normalizer/` | URL slug 推導規則（`deriveSlug`，全站唯一實作） |
| `scripts/slug.js` | slug 檢查／清理／寫入 |
| `scripts/convert-to-wikilinks.js` | Markdown 連結轉 wiki-link |
| `scripts/content-validator.js` | 內容驗證與檢查 |
| `scripts/optimize-images.js` | 圖片壓縮與優化 |

### package.json
- **版本**: 17.71
- **核心依賴**: Docusaurus 3.10.2, React 19.2
- **特殊插件**: remark-wiki-link, gray-matter, @easyops-cn/docusaurus-search-local
- **內容管理**: 自動化驗證、圖片優化、slug 檢查腳本

## Obsidian 整合
- **.obsidian/**: 完整的 Obsidian 配置，包含多個插件
- **同步機制**: 透過 Dropbox 同步，實現跨裝置編輯
- **模板系統**: 使用 Templater 等插件提升編輯效率

## 部署流程
- **GitHub Pages**: 自動部署到 `kywk.github.io`
- **CI/CD**: 透過 `.github/workflows/` 自動化部署
  - `deploy.yml` (push to main) 與 `test-deploy.yml` (PR) 都會依序執行
    `typecheck` → `content:check` → `build`
  - `content:check` 會擋下 deploy，但只在「會讓 build 失敗」的問題上（frontmatter 用 tab
    縮排、控制字元、重複冒號）。品質類提醒是 warning 不擋；要連 warning 一起擋加 `-- --strict`
- **版本控制**: 使用 Git 管理內容版本

## 已知待辦

- **Wiki-link 尚未支援 blog**: `remark-wiki-link` 只掛在 3 個 docs 實例上，
  `blog.news` / `blog.life` 內的 22 個 `[[...]]` 會以原文顯示。要修需要先建立跨 vault 的
  全站索引（含 blog 的日期式 permalink 推導），否則 16 個跨 vault 連結會指向錯誤路由
- **78 條 broken links**: 主要是 wikilink 指向不存在的筆記（40）、舊的 `[[標題:說明]]`
  冒號別名語法（23）、`[[moco/...]]` 帶 vault 前綴（4）。全部修完後可把
  `onBrokenLinks` 從 `warn` 改成 `throw`
- ~~路由大小寫不一致~~：**已解決**。全站 919 個路由現在 0 個含大寫、0 個 `%20`、
  0 個含底線、0 個 doc 路由以 `/index/` 結尾（改造前分別是 98 / 0 / 若干 / 8）
