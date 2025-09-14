# kywk.me - Obsidian + Docusaurus 整合系統

這是一個結合 Obsidian 本地編輯器與 Docusaurus 網站生成器的個人知識管理與發布系統。

## 專案架構

### 📁 內容組織
- **backpacker/**: 旅遊記錄與遊記
- **lifehacker/**: 生活技巧、登山、攝影、閱讀等
- **moco/**: 技術文件 (程式開發、工具使用)
- **blog.life/**: 個人生活部落格
- **blog.news/**: 技術新聞與資訊

### 🔧 技術特色
- **Wiki Link 支援**: 使用 `remark-wiki-link` 插件，支援 Obsidian 的 `[[]]` 連結語法
- **多文檔站點**: 透過多個 `@docusaurus/plugin-content-docs` 實例管理不同主題
- **雙部落格系統**: 分離個人生活 (life) 和技術資訊 (news)
- **Mermaid 圖表**: 支援流程圖和圖表渲染
- **中文本地化**: 預設語言設為 `zh-TW`

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

### 其他指令
```bash
npm run serve          # 本地預覽建置結果
npm run clear          # 清除快取
npm run typecheck      # TypeScript 類型檢查
```

## 重要配置

### docusaurus.config.ts
- **多文檔配置**: 每個主題 (backpacker, lifehacker, moco) 都有獨立的文檔實例
- **Wiki Link 解析**: 自動將 `[[]]` 語法轉換為 Docusaurus 連結
- **部署設定**: 配置 GitHub Pages 部署參數

### package.json
- **版本**: 17.71
- **核心依賴**: Docusaurus 3.7.0, React 19.0.0
- **特殊插件**: remark-wiki-link, remark-oembed

## Obsidian 整合
- **.obsidian/**: 完整的 Obsidian 配置，包含多個插件
- **同步機制**: 透過 Dropbox 同步，實現跨裝置編輯
- **模板系統**: 使用 Templater 等插件提升編輯效率

## 部署流程
- **GitHub Pages**: 自動部署到 `kywk.github.io`
- **CI/CD**: 透過 `.github/workflows/` 自動化部署
- **版本控制**: 使用 Git 管理內容版本
