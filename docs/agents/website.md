# Docusaurus 網站工程規範

適用於 Docusaurus 設定、插件、主題、路由、樣式、側欄與部署流程。

## 架構約束

- 本站以 Obsidian vault 的 Markdown 為來源，使用多個 docs 實例和 `blog.life/`、`blog.news/` 兩個 blog 集合；不要在預設 `/docs`、`/blog` 再建立重複集合。
- 維持 `zh-TW`、wiki-link、Mermaid、Kanban、Leaflet 與搜尋功能的既有接線。修改 Remark 插件順序或內容處理時，先追蹤目前設定及共用 resolver。
- URL 正規化的唯一實作是 `plugins/remark-slug-normalizer/src/index.js` 的 `deriveSlug()`。不要另寫一套 slug 規則，也不要假設 Remark 階段能修改 Docusaurus 已計算的 permalink。
- Leaflet 資源採頁面需要時載入；若改動地圖元件或資源路徑，同步檢查 `static/js/leaflet-init.js`。
- 搜尋由 `@easyops-cn/docusaurus-search-local` 在 build 時產生索引。不要重建已移除的 `scripts/build-search-index.js`、`static/search-index.json` 或 `src/pages/search.md` 流程。
- 部署由 GitHub Actions 發布 `build/` 至 GitHub Pages；維持 `npm ci`、typecheck、content check、build 的檢查順序和 Node 版本需求。

## 改動方式

- 優先修改現有配置或共用插件，不複製 resolver、slug 邏輯或 route 設定。
- 變更集合路徑、文件命名、插件鏈或連結處理時，追蹤所有 docs/blog 實例與 `scripts/content-links.js`，確認網址、wiki-link 和搜尋索引使用一致的來源。
- `onBrokenLinks` 尚有歷史 warning。只在已確認相關集合的舊連結狀態後調整策略；不要順手將全站策略改成嚴格模式。
- `build/`、`.docusaurus/`、`node_modules/` 是產物或依賴，不手動編輯或提交。

## 變更檢查

- TypeScript／設定變更使用 `npm run typecheck`；內容解析或路由變更按需使用 `npm run content:check`、`npm run content:slug` 與 `npm run build`。
- 搜尋索引只在 production build 產生；要確認搜尋輸出時用 build 結果，不以開發伺服器沒有索引判定故障。
- 若 build 因既有 broken-link warning 或環境限制未通過，指出具體輸出，不把它歸因於本次變更，除非有證據。
