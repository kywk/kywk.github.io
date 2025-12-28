# kywk.me - Obsidian + Docusaurus 整合系統

這是一個結合 Obsidian 本地編輯器與 Docusaurus 網站生成器的個人知識管理與發布系統。

## 專案架構

### 📁 內容組織
- **backpacker/**: 旅遊記錄與遊記 (146 檔案)
- **lifehacker/**: 生活技巧、登山、攝影、閱讀等 (100 檔案)
- **moco/**: 技術文件 (程式開發、工具使用) (248 檔案)
- **blog.life/**: 個人生活部落格
- **blog.news/**: 技術新聞與資訊
- **總計**: 1,625+ Markdown 檔案，專案大小 158MB

### 🔧 技術特色
- **Wiki Link 支援**: 使用 `remark-wiki-link` 插件，支援 Obsidian 的 `[[]]` 連結語法及 `[[target|display]]` 別名語法
- **多文檔站點**: 透過多個 `@docusaurus/plugin-content-docs` 實例管理不同主題
- **雙部落格系統**: 分離個人生活 (life) 和技術資訊 (news)
- **Mermaid 圖表**: 支援流程圖和圖表渲染
- **中文本地化**: 預設語言設為 `zh-TW`
- **內容搜尋**: 客戶端全文搜尋功能
- **自動化工具**: 內容驗證、圖片優化、搜尋索引建立

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
npm run content:index      # 建立搜尋索引
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

**搜尋索引**：
```bash
npm run content:index
```
建立全站搜尋功能，生成 JSON 索引和搜尋頁面。

### 檔名/資料夾名稱含空格的處理

Docusaurus 預設會將檔案路徑中的空格編碼為 `%20`，導致 URL 不美觀。本專案透過 `slug` frontmatter 注入來解決此問題。

**新增含空格的檔案時，需執行：**
```bash
npm run content:slug
```

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
- **Wiki Link 解析**: 自動將 `[[]]` 語法轉換為 Docusaurus 連結
- **Remark 插件鏈**: remarkSlugNormalizer → remarkLeaflet → remarkKanban → remarkWikiLink
- **部署設定**: 配置 GitHub Pages 部署參數

### 自訂插件
| 檔案 | 說明 |
|------|------|
| `plugins/remark-obsidian-kanban/` | Obsidian Kanban 看板渲染 |
| `plugins/remark-obsidian-leaflet/` | Obsidian Leaflet 地圖渲染 |
| `plugins/remark-slug-normalizer/` | URL slug 正規化 (統一模組) |
| `scripts/inject-slug-frontmatter.js` | 批次注入 slug frontmatter |
| `scripts/convert-to-wikilinks.js` | Markdown 連結轉 wiki-link |
| `scripts/content-validator.js` | 內容驗證與檢查 |
| `scripts/optimize-images.js` | 圖片壓縮與優化 |
| `scripts/build-search-index.js` | 搜尋索引建立 |

### package.json
- **版本**: 17.71
- **核心依賴**: Docusaurus 3.9.2, React 19.2.0
- **特殊插件**: remark-wiki-link, gray-matter
- **內容管理**: 自動化驗證、優化、索引腳本

## Obsidian 整合
- **.obsidian/**: 完整的 Obsidian 配置，包含多個插件
- **同步機制**: 透過 Dropbox 同步，實現跨裝置編輯
- **模板系統**: 使用 Templater 等插件提升編輯效率

## 部署流程
- **GitHub Pages**: 自動部署到 `kywk.github.io`
- **CI/CD**: 透過 `.github/workflows/` 自動化部署
- **版本控制**: 使用 Git 管理內容版本
