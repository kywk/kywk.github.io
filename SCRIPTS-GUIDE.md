# 內容管理腳本使用指南

## 🚀 快速開始

### 安裝依賴
```bash
npm install
```

### 圖片優化依賴 (選擇一種)
```bash
# 方案 1: ImageMagick (推薦)
brew install imagemagick

# 方案 2: Sharp (npm 套件)
npm install sharp --save-dev
```

## 📋 腳本總覽

| 指令 | 功能 | 說明 |
|------|------|------|
| `npm run content:check` | 內容驗證 | 檢查 frontmatter、連結、檔案格式 |
| `npm run content:optimize` | 圖片優化 | 壓縮圖片，節省空間 |
| `npm run content:index` | 搜尋索引 | 建立全站搜尋功能 |
| `npm run content:slug` | 注入 Slug | 為含空格路徑的檔案注入 slug |
| `npm run content:wikilink` | 轉換連結 | Markdown 連結轉 Wiki 連結 |
| `npm run deploy:preview` | 預覽部署 | 建置並本地預覽 |

## 🔍 詳細使用說明

### 1. 內容驗證 (`content:check`)

**功能**：
- ✅ 檢查必填 frontmatter 欄位 (title)
- ✅ 偵測可疑的 wiki 連結 (包含 http/www)
- ✅ 找出需要 slug 的檔案 (路徑含空格但無 slug)
- ✅ 檢查內容長度 (< 50 字元會警告)
- ✅ 驗證 Markdown 解析錯誤

**使用時機**：
- 新增內容後
- 部署前檢查
- 定期內容品質檢查

**範例輸出**：
```
🔍 Validating content...

Scanning backpacker/
Scanning lifehacker/
Scanning moco/

📊 Validation Results:
Total issues found: 3

🚨 Issues:
❌ backpacker/2401 Egypt/day1.md: Missing required field 'title'
⚠️  lifehacker/mount/玉山攻略.md: File path contains spaces but no slug defined
⚠️  moco/ai/intro.md: Content too short (25 chars)
```

### 2. 圖片優化 (`content:optimize`)

**功能**：
- 🖼️ 調整圖片最大寬度至 1920px
- 🗜️ 壓縮品質至 85%
- 📁 掃描多個目錄 (static/img, assets, content 目錄)
- 📊 顯示節省的檔案大小
- ⚡ 跳過小於 100KB 的檔案

**支援格式**：JPG, JPEG, PNG, WebP

**範例輸出**：
```
🖼️  Optimizing images...

Scanning static/img/
Scanning assets/
Scanning backpacker/

✅ backpacker/2401 Egypt/pyramid.jpg: 3.2 MB → 1.8 MB (saved 1.4 MB)
✅ static/img/hero.png: 2.1 MB → 1.2 MB (saved 0.9 MB)

📊 Optimization Results:
Images optimized: 15
Total space saved: 12.3 MB
```

### 3. 搜尋索引 (`content:index`)

**功能**：
- 🔍 掃描所有 Markdown 檔案
- 📝 提取標題、內容、標籤、摘要
- 🗂️ 生成 JSON 搜尋索引
- 🌐 建立搜尋頁面 (`src/pages/search.md`)
- 📊 統計各分類文件數量

**生成檔案**：
- `static/search-index.json` - 搜尋資料
- `src/pages/search.md` - 搜尋頁面

**範例輸出**：
```
🔍 Building search index...

Indexing backpacker/
Indexing lifehacker/
Indexing moco/

📊 Search Index Results:
Total documents indexed: 494
Categories:
  - moco: 248 documents
  - backpacker: 146 documents
  - lifehacker: 100 documents

✅ Search index saved to static/search-index.json
✅ Search page created at src/pages/search.md
```

### 4. 注入 Slug (`content:slug`)

**功能**：
- 🔗 為路徑含空格的檔案自動注入 `slug` frontmatter
- 📝 將空格轉換為破折號 (SEO 友善)
- ⚡ 跳過已有 slug 的檔案
- 🎯 僅處理 backpacker, lifehacker, moco 目錄

**使用時機**：
- 新增含空格的檔案/資料夾後
- URL 出現 %20 編碼時

**範例**：
```
檔案路徑: backpacker/2401 Egypt/Day 1 Cairo.md
注入 slug: /2401-Egypt/Day-1-Cairo/
```

**範例輸出**：
```
🔗 Injecting slug frontmatter...

Processing backpacker/2401 Egypt/Day 1 Cairo.md
✅ Added slug: /2401-Egypt/Day-1-Cairo/

📊 Results:
Files processed: 12
Slugs injected: 8
Skipped (already has slug): 4
```

### 5. 轉換連結 (`content:wikilink`)

**功能**：
- 🔄 將 Markdown 連結 `[text](./file.md)` 轉為 Wiki 連結 `[[file|text]]`
- 📝 簡化同名連結為 `[[file]]`
- 🎯 僅處理相對路徑 (./ 或 ../) 的 .md 連結
- 🔍 保持 Obsidian 相容性

**轉換範例**：
```
[玉山攻略](./mount/玉山攻略.md) → [[玉山攻略]]
[登山裝備](./equipment/gear.md) → [[gear|登山裝備]]
```

**範例輸出**：
```
🔄 Converting Markdown links to wiki-links...

Processing lifehacker/mount/百岳清單.md
✅ Converted: [玉山攻略](./玉山攻略.md) → [[玉山攻略]]

📊 Results:
Files processed: 45
Links converted: 23
```

### 6. 預覽部署 (`deploy:preview`)

**功能**：
- 🏗️ 執行完整建置 (`npm run build`)
- 🌐 啟動本地伺服器 (`npm run serve`)
- 👀 預覽最終部署結果

**使用時機**：
- 部署前最終檢查
- 測試建置結果

## 🔄 建議工作流程

### 日常內容更新
```bash
# 1. 新增內容後檢查
npm run content:check

# 2. 處理空格檔名 (如有需要)
npm run content:slug

# 3. 轉換連結格式 (如有需要)
npm run content:wikilink

# 4. 優化圖片
npm run content:optimize

# 5. 更新搜尋索引
npm run content:index
```

### 部署前檢查
```bash
# 完整檢查與預覽
npm run content:check && npm run deploy:preview
```

### Git Hook 自動化
在 `.git/hooks/pre-commit` 加入：
```bash
#!/bin/sh
npm run content:check
npm run content:slug
```

## ⚠️ 注意事項

1. **圖片優化**需要安裝 ImageMagick 或 Sharp
2. **內容驗證**失敗會終止程序 (exit code 1)
3. **搜尋索引**會覆蓋現有的搜尋頁面
4. **Slug 注入**僅處理特定目錄，避免影響系統檔案
5. **連結轉換**僅處理相對路徑，保持外部連結不變

## 🐛 故障排除

### 圖片優化失敗
```bash
# 檢查 ImageMagick 安裝
which convert

# 或安裝 Sharp
npm install sharp --save-dev
```

### 內容驗證錯誤
- 檢查 frontmatter 格式
- 確認必填欄位存在
- 修正 wiki 連結語法

### 搜尋功能無效
- 確認 `static/search-index.json` 存在
- 檢查 `src/pages/search.md` 是否正確生成
- 重新執行 `npm run content:index`
