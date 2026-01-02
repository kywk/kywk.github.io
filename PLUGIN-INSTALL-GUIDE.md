# 插件安裝與使用指南

本專案支援三種插件安裝方式，系統會自動按優先順序載入：

## 1. NPM 安裝 (推薦)

```bash
npm install remark-obsidian-kanban
npm install remark-obsidian-leaflet  
npm install remark-slug-normalizer
```

## 2. 手動 Clone 到 plugins 目錄

```bash
cd plugins/
git clone https://github.com/kywk/remark-obsidian-kanban.git
git clone https://github.com/kywk/remark-obsidian-leaflet.git
git clone https://github.com/kywk/remark-slug-normalizer.git
```

## 3. 本地開發模式

直接在 `plugins/` 目錄下開發，使用現有的目錄結構：

```
plugins/
├── remark-obsidian-kanban/
│   └── src/index.js
├── remark-obsidian-leaflet/
│   └── src/index.js
└── remark-slug-normalizer/
    └── src/index.js
```

## 載入優先順序

系統會按以下順序嘗試載入插件：

1. `npm install` 安裝的套件
2. 本地開發路徑 `./plugins/plugin-name/src/index.js`
3. 手動 clone 的套件 `./plugins/plugin-name`
4. 手動 clone 的完整路徑 `./plugins/plugin-name/src/index.js`

## 驗證安裝

執行建置命令查看載入日誌：

```bash
npm run build
```

成功載入的插件會顯示：
```
[PluginLoader] Plugin loaded from: remark-obsidian-kanban
```

## 開發建議

- **生產環境**：使用 NPM 安裝
- **開發測試**：使用手動 clone 或本地開發
- **貢獻代碼**：Fork 後 clone 到 plugins 目錄開發