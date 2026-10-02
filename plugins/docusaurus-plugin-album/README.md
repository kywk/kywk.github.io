# Docusaurus Plugin Album (`docusaurus-plugin-album`)

以視覺為導向的 Docusaurus 攝影相簿外掛程式。

## 🌟 特性

- **Pinterest 瀑布流版型**：依據自然長寬比自動錯落分欄排版，滑鼠懸停（Hover）平滑浮現文章標題與元資訊。
- **Google Photos 式時光軸滑桿**：右側膠囊浮動標尺，快速依年份/月份穿梭時光並平滑錨點捲動。
- **Hero Header 沉浸式內頁**：滿版封面大圖、拍攝地點（📍）與相簿系列（📁）自訂標籤徽章。
- **零依賴全螢幕相片燈箱**：支援鍵盤左右鍵循環輪播、ESC 退出、背景滾動鎖定，並嚴格排除作者大頭貼（Avatar Exclusion）。
- **完全隔離與原生無痛**：底層包裝 `@docusaurus/plugin-content-blog`，所有 Markdown 解析與元資料無縫相容。

## 📦 安裝與配置

在 `docusaurus.config.ts` 載入外掛：

```typescript
// docusaurus.config.ts
import path from 'path';

export default {
  plugins: [
    [
      path.resolve(__dirname, 'plugins/docusaurus-plugin-album'),
      {
        id: 'album',
        path: 'blog.album',
        routeBasePath: 'album',
      },
    ],
  ],
};
```
