# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- 主要訪客：技術同行、獨立開發者、背包旅人、攝影愛好者，以及對個人知識管理（PKM / Obsidian）和生活實驗感興趣的探索者。
- 使用情境：尋找特定長程旅行攻略或 Checklist、查閱 DevSecOps 與雲端工程 SOP、瀏覽個人生活隨筆與攝影相簿，或從整體數位花園中獲取靈感。

## Product Purpose

kywk.me 是 kywk 的個人數位花園與公開創作工作室（Digital Garden & Studio）。將 Obsidian Vault 中的真實思維紀錄（旅行、生活實驗、工程實驗、攝影相簿）轉化為對外公開的高品質靜態站台，實踐「Keep walking, keep making」的精神。

## Positioning

不同於單純的工程技術部落格或旅行流水帳，kywk.me 融合了「嚴謹的工程工匠精神（MoCo Lab）」、「Lonely Planet 式的系統化旅行規劃（Backpacker）」、「生活習慣與自動化實驗（Lifehacker）」以及「視覺化光影紀錄（Album）」。以真實的 Obsidian Vault 為單一事實來源（Single Source of Truth），呈現跨領域的思考與實踐。

## Operating Context

- 核心寫作環境：Obsidian（透過 Dropbox 跨裝置同步，包含 Wiki-links、Mermaid 圖表、Kanban 看板、Geo Story Map 等外掛）。
- 發佈與展現環境：Docusaurus v3（React 19 + TypeScript + Custom Plugins），靜態建置部署至 GitHub Pages。
- 閱讀裝置：桌面寬螢幕（便於閱讀多欄資訊與工程文件）、平板與行動裝置（便於旅途中查閱攻略與隨手閱讀）。

## Capabilities and Constraints

- 內容集合體系：
  - Docs 實例：`backpacker/`（旅遊攻略、Checklist）、`lifehacker/`（生活習慣、工具）、`moco/`（DevSecOps、工程手冊）。
  - Blogs 實例：`blog.life/`（生活隨筆）、`blog.news/`（開發者日誌）。
  - 獨立相簿：`plugins/docusaurus-plugin-album`（Pinterest 瀑布流、時間軸、相片燈箱）。
- 技術約束：
  - 保留 Obsidian 原生相容性與現有 URL slug 推導規則（不任意更動路由命名慣例）。
  - 深淺色雙主題（Sunset Warm 色調與 Dark Mode）流暢切換支援。
  - 首頁作為獨立入口頁面（`src/pages/index.js`），必須具備極佳的視覺美感與首屏載入效能，避免龐大第三方重型依賴。

## Brand Commitments

- Slogan：「Keep walking, keep making.」
- 核心基調：溫暖、探索感、工匠精神、真實可信（Sunset Warm 色系，大地色、暖橘金與深墨色調）。
- 不浮誇、無商業虛飾；所有內容均為真實的生活探索與工程實驗成果。

## Evidence on Hand

- 真實內容資產：2,000+ 頁發布內容，涵蓋冰島/四川等長程旅行指南、DevSecOps SOP 流程、數百篇生活日誌與真實攝影集。
- 現有主題設定：`src/css/custom.css`（Sunset Warm 色系 token，暖橘 `#e67e22`、深墨深色底 `#1a1512`、淺暖白 `#fffdfb`）。

## Product Principles

1. **真實與探索引領（Authentic & Exploratory）**：首頁是工作室的櫥窗與導航羅盤，不是制式的公版模板。
2. **跨領域有機交織（Polymath Harmony）**：平衡旅行的自由浪漫、工程的精準嚴謹、攝影的視覺張力與生活的細膩質感。
3. **優雅易讀且清晰高效（Crafted & Navigable）**：資訊層次分明，讓新訪客一目了然站台輪廓，老朋友能快速切入最新主題。
4. **雙主題原生舒適（Dual-Theme First）**：深色如深夜工作室的柔光螢幕，淺色如灑滿陽光的旅行手帳，對比度與層次俱佳。
