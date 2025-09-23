# Development Notes

## 專案概述
將 Obsidian Kanban 插件整合到 Docusaurus，讓 markdown 檔案能渲染為互動式看板。

## 核心實作
- **插件類型**: Remark 插件 (非 Docusaurus 插件)
- **觸發條件**: frontmatter 包含 `kanban-plugin: board`
- **轉換邏輯**: H2 標題 → 看板欄位，任務列表 → 卡片
- **樣式處理**: 隱藏 TOC，全寬顯示，CSS 內嵌

## 關鍵配置
```typescript
const { remarkKanban } = require("./remark-obsidian-kanban/src/index.js");

remarkPlugins: [
  remarkKanban, // 必須放第一位
  // ... 其他插件
],
```

## 檔案結構
```
remark-obsidian-kanban/
├── package.json          # NPM 套件配置
├── src/index.js          # 主要插件邏輯
├── README.md             # 英文說明
├── README-CH.md          # 中文說明
└── DEVELOPMENT.md        # 開發筆記
```

## 已完成功能
- ✅ Kanban 檔案偵測 (`kanban-plugin: board`)
- ✅ H2 標題轉欄位
- ✅ 任務列表轉卡片
- ✅ 任務計數顯示
- ✅ TOC 隱藏 + 全寬顯示
- ✅ Kanban settings 過濾
- ✅ 勾選狀態支援

## 待辦事項 (TODO)
- [ ] 改善卡片樣式設計
- [ ] 支援拖拽功能
- [ ] 支援更多 Obsidian Kanban 語法
- [ ] 效能優化
- [ ] 單元測試
- [ ] 發布到 NPM

## 除錯要點
1. 插件必須放在 remarkPlugins 第一位
2. 使用 remark 插件而非 Docusaurus 插件
3. frontmatter 偵測: `kanban-plugin: board`
4. CSS 樣式需內嵌到 HTML 中

## 開發指令
```bash
npm run build    # 測試建置
npm start        # 本地開發
```