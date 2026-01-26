---
title: "Rclone: ignore"
description: exclude files when rclone syncing
tags:
  - Utility/Rclone
sidebar_position: 90
hide_table_of_contents: true
date_created: 2023-01-02T00:00:00.000Z
date_updated: 2023-01-02T00:00:00.000Z
image: >-
  https://lh3.googleusercontent.com/pw/AL9nZEUA9Ifvd5Z8SXDWkeVB6AC4MPGwnXaL6kBXNPoXwOQQ2jOcZ1Jw_0p8TKK8C3ZX0e67_FOY15eDrm7aaXSQJcKtoUzC80SAQEHsaBy6qS2AqNNs5VUFNXBKm439y_1wkvmDl-PnL8ReojnIumNlEvOXBg=w800-no?authuser=0
slug: /utilities/cli/rclone-ignore/
---

# Rclone 檔案過濾

Rclone 同步時的檔案過濾機制，支援多種過濾規則來排除不需要同步的檔案和目錄。

## 基本過濾方式

### 命令列參數

```bash
# 排除特定檔案類型
rclone sync source dest --exclude "*.tmp"
rclone sync source dest --exclude "*.log"

# 排除多種檔案類型
rclone sync source dest --exclude "*.tmp" --exclude "*.log" --exclude "*.cache"

# 排除特定目錄
rclone sync source dest --exclude "/temp/"
rclone sync source dest --exclude "node_modules/"
```

### 使用過濾檔案

```bash
# 使用 .rcloneignore 檔案
rclone sync source dest --exclude-from=.rcloneignore

# 指定過濾檔案路徑
rclone sync source dest --exclude-from=/path/to/filter-file.txt
```

## .rcloneignore 檔案格式

### 基本語法

```gitignore
# .rcloneignore 範例

# 註解行以 # 開頭

# 排除特定檔案類型
*.tmp
*.log
*.cache
*.DS_Store

# 排除特定檔案名
Thumbs.db
.localized

# 排除目錄
node_modules/
.git/
.vscode/
__pycache__/

# 排除隱藏檔案和目錄
.*

# 但包含特定隱藏檔案
!.gitignore
!.env.example
```

### 萬用字元規則

| 模式    | 說明               | 範例                                        |
| ------- | ------------------ | ------------------------------------------- |
| `*`     | 匹配任意字元       | `*.txt` 匹配所有 .txt 檔案                  |
| `?`     | 匹配單一字元       | `file?.txt` 匹配 file1.txt, fileA.txt       |
| `**`    | 匹配任意層級目錄   | `**/temp/**` 匹配任何層級的 temp 目錄       |
| `[abc]` | 匹配括號內任一字元 | `file[123].txt` 匹配 file1.txt, file2.txt   |
| `[a-z]` | 匹配範圍內字元     | `[a-z]*.txt` 匹配以小寫字母開頭的 .txt 檔案 |

## 常用過濾規則

### 開發專案過濾

```gitignore
# Node.js 專案
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*
.npm
.yarn-integrity
dist/
build/

# Python 專案
__pycache__/
*.py[cod]
*$py.class
*.so
.Python
build/
develop-eggs/
dist/
.env
venv/

# Java 專案
*.class
*.jar
*.war
*.ear
target/
.gradle/
build/

# IDE 檔案
.vscode/
.idea/
*.swp
*.swo
*~
```

### 系統檔案過濾

```gitignore
# macOS
.DS_Store
.AppleDouble
.LSOverride
Icon?
._*
.Spotlight-V100
.Trashes

# Windows
Thumbs.db
ehthumbs.db
Desktop.ini
$RECYCLE.BIN/

# Linux
*~
.fuse_hidden*
.directory
.Trash-*
```

### 媒體檔案過濾

```gitignore
# 暫存檔案
*.tmp
*.temp
*.bak
*.backup
*.old

# 大型媒體檔案 (選擇性排除)
*.mov
*.mp4
*.avi
*.mkv
*.iso

# 壓縮檔案
*.zip
*.rar
*.7z
*.tar.gz
```

## 進階過濾技巧

### 包含規則 (Whitelist)

```bash
# 只同步特定檔案類型
rclone sync source dest --include "*.md" --include "*.txt"

# 先排除所有，再包含特定檔案
rclone sync source dest --exclude "*" --include "*.important"
```

### 條件過濾

```bash
# 按檔案大小過濾
rclone sync source dest --max-size 100M  # 排除大於 100MB 的檔案
rclone sync source dest --min-size 1k    # 排除小於 1KB 的檔案

# 按修改時間過濾
rclone sync source dest --max-age 30d    # 只同步 30 天內修改的檔案
rclone sync source dest --min-age 1h     # 排除 1 小時內修改的檔案
```

### 複雜過濾組合

```bash
# 組合多種過濾條件
rclone sync source dest \
  --exclude-from=.rcloneignore \
  --max-size 50M \
  --min-age 1h \
  --exclude "*.tmp"
```

## 實用過濾檔案範例

### Obsidian 筆記過濾

```gitignore
# .rcloneignore for Obsidian

# Obsidian 系統檔案
.obsidian/workspace*
.obsidian/cache
.obsidian/logs/
.obsidian/backlink/

# 暫存檔案
*.tmp
.trash/

# 系統檔案
.DS_Store
Thumbs.db

# 大型附件 (選擇性)
*.mp4
*.mov
*.zip
```

### 程式碼專案過濾

```gitignore
# .rcloneignore for Code Projects

# 依賴目錄
node_modules/
vendor/
.gradle/
target/

# 建置輸出
dist/
build/
out/
*.o
*.exe

# IDE 設定
.vscode/settings.json
.idea/workspace.xml

# 日誌檔案
*.log
logs/

# 環境檔案
.env.local
.env.production
```

## 測試過濾規則

### 乾跑模式測試

```bash
# 測試過濾規則，不實際同步
rclone sync source dest --exclude-from=.rcloneignore --dry-run -v

# 只列出會被同步的檔案
rclone ls source --exclude-from=.rcloneignore

# 列出會被排除的檔案
rclone ls source --exclude-from=.rcloneignore --exclude "*" --include "*"
```

### 驗證過濾效果

```bash
# 比較過濾前後的檔案數量
echo "Total files:"
rclone ls source | wc -l

echo "Files after filtering:"
rclone ls source --exclude-from=.rcloneignore | wc -l
```

## 效能考量

### 過濾順序最佳化

```bash
# 先用簡單規則過濾大量檔案
rclone sync source dest \
  --exclude "node_modules/**" \
  --exclude "*.log" \
  --exclude-from=.rcloneignore
```

### 大型目錄處理

```bash
# 對大型目錄使用 --fast-list
rclone sync source dest \
  --exclude-from=.rcloneignore \
  --fast-list
```

## 疑難排解

### 常見問題

```bash
# 檢查過濾規則是否生效
rclone ls source --exclude-from=.rcloneignore -v

# 測試特定檔案是否被過濾
rclone ls source --include "specific-file.txt" --exclude-from=.rcloneignore

# 忽略過濾檔案中的錯誤
rclone sync source dest --exclude-from=.rcloneignore --ignore-errors
```

### 除錯技巧

```bash
# 顯示詳細過濾資訊
rclone sync source dest --exclude-from=.rcloneignore -vv --dry-run

# 只顯示被排除的檔案
rclone ls source --exclude "*" -v
```

## See Also

- [[Rclone Dropbox]] - Rclone Dropbox 同步配置
- [[Awesome CLI]] - 現代化 CLI 工具集合
- [Rclone Filtering Documentation](https://rclone.org/filtering/)
- [Rclone Forum - Filtering Discussion](https://forum.rclone.org/t/how-to-specify-what-folders-to-sync-and-what-to-exclude-include-exclude-filter/21821)
