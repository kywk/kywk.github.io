---
title: "Rclone: Dropbox"
description: Rclone Dropbox
tags:
  - Utility/Rclone
  - Dropbox
sidebar_position: 90
date_created: 2022-09-21T16:00:00.000Z
image: "https://i.imgur.com/mErPwqL.png"
slug: /utilities/cli/rclone-dropbox/
---

# Rclone Dropbox 同步配置

Rclone 與 Dropbox 整合的同步腳本配置，支援多執行緒傳輸和進度顯示。

## 基本配置

### 環境變數設定

```bash
# Rclone 同步參數配置
export RCLONE_CONF="--multi-thread-streams=25 --transfers=25 --checkers=25 --stats=10s --create-empty-src-dirs --progress --progress-terminal-title --delete-before"

# Dropbox 遠端和本地路徑
export DBX_REMOTE="dropbox"
export DBX_LOCAL="$KYWK_HOME"
```

### 參數說明

| 參數                        | 說明                     |
| --------------------------- | ------------------------ |
| `--multi-thread-streams=25` | 多執行緒串流數量         |
| `--transfers=25`            | 同時傳輸檔案數量         |
| `--checkers=25`             | 同時檢查檔案數量         |
| `--stats=10s`               | 每 10 秒顯示統計資訊     |
| `--create-empty-src-dirs`   | 建立空的來源目錄         |
| `--progress`                | 顯示傳輸進度             |
| `--progress-terminal-title` | 在終端標題顯示進度       |
| `--delete-before`           | 傳輸前先刪除目標多餘檔案 |

## 同步腳本

### Obsidian 筆記同步

```bash
# 從 Dropbox 下載到本地
alias pull-obs="rclone sync $DBX_REMOTE:/obsidian $KYWK_HOME/Obsidian --exclude-from=$KYWK_HOME/Obsidian/.rcloneignore $RCLONE_CONF"

# 從本地上傳到 Dropbox
alias push-obs="rclone sync $KYWK_HOME/obsidian $DBX_REMOTE:/obsidian --exclude-from=$KYWK_HOME/Obsidian/.rcloneignore $RCLONE_CONF"
```

### 通用檔案同步

```bash
# 同步當前目錄到 Dropbox 共享資料夾
alias push-here="rclone sync . $DBX_REMOTE:Share/rclone $RCLONE_CONF"

# 雙向同步 (需謹慎使用)
alias bisync-obs="rclone bisync $KYWK_HOME/obsidian $DBX_REMOTE:/obsidian --exclude-from=$KYWK_HOME/Obsidian/.rcloneignore $RCLONE_CONF"
```

## 進階用法

### 乾跑模式 (Dry Run)

```bash
# 預覽同步操作，不實際執行
rclone sync source destination --dry-run $RCLONE_CONF
```

### 增量備份

```bash
# 使用 copy 而非 sync，保留目標端額外檔案
rclone copy $KYWK_HOME/obsidian $DBX_REMOTE:/obsidian-backup $RCLONE_CONF
```

### 檔案過濾

```bash
# 排除特定檔案類型
rclone sync source destination --exclude "*.tmp" --exclude "*.log" $RCLONE_CONF

# 使用過濾檔案
rclone sync source destination --exclude-from=.rcloneignore $RCLONE_CONF
```

## 效能最佳化

### 網路頻寬限制

```bash
# 限制上傳頻寬為 10MB/s
rclone sync source destination --bwlimit 10M $RCLONE_CONF

# 分時段限制頻寬
rclone sync source destination --bwlimit "08:00,512k 19:00,10M 23:00,off" $RCLONE_CONF
```

### 大檔案處理

```bash
# 調整大檔案的分塊大小
rclone sync source destination --dropbox-chunk-size 128M $RCLONE_CONF
```

## 監控與日誌

### 詳細日誌

```bash
# 輸出詳細日誌到檔案
rclone sync source destination $RCLONE_CONF --log-file=rclone.log --log-level INFO
```

### 同步狀態檢查

```bash
# 檢查兩端差異
rclone check source destination

# 列出差異檔案
rclone check source destination --one-way
```

## 安全注意事項

### 備份策略

```bash
# 建立備份後再同步
cp -r important_folder important_folder.backup
rclone sync important_folder $DBX_REMOTE:/backup
```

### 版本控制

```bash
# 啟用 Dropbox 版本控制
rclone sync source destination --backup-dir $DBX_REMOTE:/versions/$(date +%Y%m%d)
```

## 自動化腳本

### 定時同步

```bash
#!/bin/bash
# sync-obsidian.sh

set -euo pipefail

log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $*"
}

log "Starting Obsidian sync..."

# 檢查網路連線
if ! ping -c 1 dropbox.com >/dev/null 2>&1; then
    log "ERROR: No internet connection"
    exit 1
fi

# 執行同步
if rclone sync "$KYWK_HOME/obsidian" "$DBX_REMOTE:/obsidian" \
    --exclude-from="$KYWK_HOME/Obsidian/.rcloneignore" \
    $RCLONE_CONF; then
    log "Sync completed successfully"
else
    log "ERROR: Sync failed"
    exit 1
fi
```

### Crontab 設定

```bash
# 每小時同步一次
0 * * * * /path/to/sync-obsidian.sh >> /var/log/rclone-sync.log 2>&1
```

## See Also

- [[Rclone Ignore]] - Rclone 檔案過濾設定
- [[Awesome CLI]] - 現代化 CLI 工具集合
- [Rclone Documentation](https://rclone.org/docs/)
- [Dropbox Backend](https://rclone.org/dropbox/)
