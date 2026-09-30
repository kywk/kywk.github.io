# kywk.me - Obsidian + Docusaurus 整合系統

以 Obsidian 作為編輯器、Docusaurus 作為發佈工具的個人知識庫。
本檔案只記錄**會咬人的**規則；細節請見 [SCRIPTS-GUIDE.md](./SCRIPTS-GUIDE.md)
與 [PLUGIN-INSTALL-GUIDE.md](./PLUGIN-INSTALL-GUIDE.md)。

## 內容組織

| 目錄 | 內容 | 檔案數 |
| --- | --- | --- |
| `backpacker/` | 旅遊記錄與遊記 | 191 |
| `lifehacker/` | 生活技巧、登山、攝影、閱讀 | 304 |
| `moco/` | 技術文件 | 272 |
| `blog.life/` | 個人生活部落格 | 523 |
| `blog.news/` | 技術新聞與資訊 | 54 |

發佈內容共 1,344 個 Markdown，build 產出約 2,067 頁。
Vault 內另有未發佈的 `_incoming/`、`_journaling/` 等，全庫約 2,511 個 `.md`。

## 技術特色

- **Wiki Link**: `remark-wiki-link` 處理 `[[]]` 與 `[[target|display]]`
- **多文檔實例**: backpacker／lifehacker／moco 各自一個 `@docusaurus/plugin-content-docs`
- **雙部落格**: life 與 news 分離
- **站內搜尋**: `@easyops-cn/docusaurus-search-local`，索引於 build 時產生，無外部服務
- **URL 正規化**: slug 於 build 時由路徑推導，**不寫回原始檔**（見下）
- **中文本地化**: `zh-TW`；Mermaid 圖表

## Obsidian 外掛

**Kanban** — `remark-obsidian-kanban`，偵測 `kanban-plugin: board` frontmatter 渲染看板。

**Geo Story Map** — `@story-map/remark-story-map`（0.5.0），**全站唯一的 Leaflet runtime**。
原本自製的 `remark-obsidian-leaflet` 與 `static/js/leaflet-init.js` 已於 2026-09-30 刪除。

| 圍欄區塊 | 形態 | 渲染 |
| --- | --- | --- |
| ` ```story-map ` | 故事：投影片 + 版型 + 面板 | `<StoryMap />` |
| ` ```leaflet ` | 純地圖：只有地圖與標記 | `<GeoMap />` |

```markdown
```leaflet
id: my-map
lat: 25.0330
long: 121.5654
defaultZoom: 12
markerFolder: backpacker/trip/places
```
```

- 舊 ` ```leaflet ` 區塊沿用歷史 key，既有筆記不需改寫；
  `markerFolder` 遞迴讀取含 `location` 的筆記，`mapzoom: [min, max]` 轉成標記縮放可見範圍
- 標記連結走既有的 `contentLinkIndex`，不另實作 slug 規則
- Leaflet 與 `leaflet.css` 只從 client bundle 載入，頁面上沒有地圖時完全不下載；
  `docusaurus build` 期間不會建立 Leaflet 實例
- 主題橋接（`src/css/story-map-theme.css`）**light 與 dark 都要宣告**：
  `map.theme: auto` 預設跟的是 `prefers-color-scheme`（作業系統），不是 Docusaurus 存在
  localStorage 的主題；只寫 dark 會在「系統深色但站台淺色」時失效

逐項相容度見 [leaflet-compatibility.md](https://github.com/kywk/story-map/blob/main/docs/leaflet-compatibility.md)。

## 開發指令

```bash
npm install          # 安裝依賴（Node >= 20.19，見下）
npm start            # 本地開發伺服器，熱重載
npm run build        # 建置至 build/
npm run serve        # 預覽建置結果
npm run typecheck    # TypeScript 型別檢查
npm run clear        # 清快取
npm run deploy       # 建置並部署到 gh-pages

npm run content:check      # 驗證內容（有 error 才失敗；-- --strict 連 warning 也擋）
npm run content:optimize   # 圖片優化（-- --dry-run 先預覽）
npm run content:slug       # slug 檢查（:fix 清理、:write 寫回 frontmatter）
npm run content:wikilink   # Markdown 連結轉 wiki-link
```

`content:check` 的 **error** 會讓 build 失敗（frontmatter 用 tab 縮排、控制字元、
`foo: : bar` 重複冒號）；**warning** 是品質提醒，不擋。
`content:optimize` 需 ImageMagick 或 sharp，找不到工具會明確回報，不會假裝已完成。

## ⚠️ 會咬人的規則

### Node 必須 >= 20.19

`engines.node` 是 `>=20.19.0`，這是**必要**而非保守：
`plugins/remark-obsidian-kanban` 以 `require()` 載入 ESM-only 的 `unist-util-visit@5`，
需要 Node 20.19 起才有的 `require(esm)`，在 Node 18 上直接 `ERR_REQUIRE_ESM`。

三處 pinning 一致：CI `20.19.0`、`volta` `20.20.2`、`engines`。
另設 `packageManager: npm@10.9.8`——**不要改用 pnpm**，理由見下。

### 依賴必須在站台宣告，不能靠提升

`loadPlugin()` 依序嘗試 `npm 套件名` → `localPath` → `./plugins/<name>` → `.../src/index.js`。
以路徑載入的插件**其自己的 `dependencies` 不會被 npm 安裝**。

`remark-obsidian-kanban` 宣告了 `unist-util-visit`，但站台也必須宣告一份，否則只是
碰巧靠 `@story-map/remark-story-map` 等其他套件提升上來而可用。npm 的扁平佈局掩蓋了這點；
pnpm 的嚴格隔離會讓它直接 `MODULE_NOT_FOUND`。`@docusaurus/theme-common` 與
`@docusaurus/plugin-content-docs`（被 swizzle 過的 `src/theme` 直接匯入）同理。

### slug 由路徑推導，不寫回檔案

規則只有一份，在 `plugins/remark-slug-normalizer/src/index.js` 的 `deriveSlug()`，
由 parseFrontMatter hook、`content:slug`、wikilink pageResolver **三處共用**，
所以路由與 `[[wikilink]]` 產生的網址不可能不一致。

每個路徑段：轉小寫 → 空白與底線換 `-` → 收合連續 `-` → 去頭尾 `-` → 移除引號與括號。
結尾的 `/index` 直接去掉（`1901 Paul/index.md` → `/1901-paul/`）。

**括號必須移除**：React Router 5 用的 `path-to-regexp` v1 會把 `( )` 當成正規表達式群組，
帶括號的網址永遠匹配不到 route。

新增檔案不需要做任何事，也不需要在 frontmatter 寫 `slug:`。

### slug 不在 remark 階段處理

Remark 插件鏈為 remarkKanban → remarkWikiLink → remarkStoryMap。
slug 必須在 `parseFrontMatter` 解決：Docusaurus 在 `processDocMetadata` 就把 permalink
算好，remark 是之後才在 mdx-loader 跑的，改 frontmatter 已經來不及。

## 插件

| 檔案 | 說明 |
| --- | --- |
| `plugins/remark-obsidian-kanban/` | Kanban 看板渲染（獨立 npm 套件） |
| `plugins/remark-slug-normalizer/` | slug 推導規則（全站唯一實作） |
| `plugins/rehype-obsidian-tasks/` | Obsidian task 標記渲染（僅本站台） |
| `plugins/remark-story-map-loader.cjs` | 以原生 `require(esm)` 載入 remark-story-map，繞過 jiti 破壞 zod v4 具名匯出 |
| `plugins/story-map-client/` | 註冊 StoryMap 瀏覽器 client module 與全頁檢視 |
| `scripts/content-links.js` | wikilink 索引與 route resolver |
| `scripts/slug.js` / `content-validator.js` / `optimize-images.js` / `convert-to-wikilinks.js` | 見 SCRIPTS-GUIDE.md |

`preset-classic` 的預設 docs/blog 已關閉（`docs: false, blog: false`），避免多出
`/docs`、`/blog` 空路由。效能 flags 見
[Docusaurus v3 升級筆記](moco/Obsidian/Docusaurus/Docusaurus%20v3%20Upgrading.md)。

## Obsidian 整合

- **.obsidian/**: 完整 Obsidian 配置；透過 Dropbox 跨裝置同步
- **模板系統**: Templater（`_templates` 與 `_templates/scripts`）
- **地圖外掛**: `obsidian-leaflet-plugin` 已於 2026-09-30 **解除安裝**
  （`community-plugins.json` 已移除、插件目錄已刪除），改用 `geo-story-map` v0.5.0。
  既有筆記的 `location`、`mapmarker`、`mapzoom` 與 ` ```leaflet ` 區塊都繼續沿用，不需改寫。
  實際 vault 狀態見 [Obsidian Plugins Overview](moco/Obsidian/Plugins/Obsidian%20Plugins%20Overview.md)

## 部署

- **GitHub Pages**: user site，服務於 `https://kywk.github.io/` 根路徑
- **CI**: `deploy.yml`（push main）與 `test-deploy.yml`（PR）皆執行
  `npm ci` → `typecheck` → `content:check` → `build` → deploy
- **依賴必須來自 registry**：`package-lock.json` 有進版控且 CI 走 `npm ci`，
  `file:` 指向本機路徑的 tarball 在 runner 上無法解析，會讓整條 deploy 卡住
- **不做舊網址轉址**：vault 改名或搬動檔案會使已發佈網址失效，個人站點刻意不維護，
  維持零成本

## 已知待辦

- `onBrokenLinks` 目前是 `warn`。全站清理完成後可改成 `throw`：
  待處理的是舊 backpacker／moco wikilink、舊的 `[[標題:說明]]` 冒號別名語法與歷史路徑
  （blog wikilink 已改由全站索引嚴格解析，未解析會直接使 blog build 失敗）
