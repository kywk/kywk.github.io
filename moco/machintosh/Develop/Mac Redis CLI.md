---
title: Redis CLI
image: >-
  https://lh3.googleusercontent.com/pw/ACtC-3cYYtkzJjo_oG7Gzqq8T8XQm4V_qLE3wGWVKOahp6YT4lo-on60NJmjrkkatnizX1b-uID-MCM2ztsXH9z27cMRtql3PA5cpYZYbMfSPuM5Yh3MmqnjnnXYkTg6vtIiBL5SGAQRRAI9zEBIOoyP3tZpuA?authuser=0
tags:
  - Mac
  - DevEnv
  - Redis
  - Homebrew
sidebar_position: 30
date_created: 2024-10-31T00:00:00.000Z
slug: /machintosh/develop/mac-redis-cli/
---

# Redis CLI 安裝與使用

在 macOS 上單獨安裝 Redis CLI 工具的多種方法，適合只需要客戶端連線功能而不需要完整 Redis 伺服器的情況。

## 安裝方法比較

| 方法 | 優點 | 缺點 | 適用情況 |
|------|------|------|----------|
| **Docker** | 無需安裝，版本靈活 | 需要 Docker 環境 | 臨時使用 |
| **Homebrew Tap** | 輕量化，只安裝 CLI | 第三方套件 | 長期使用 |
| **Node.js** | 跨平台，易於管理 | 需要 Node.js 環境 | 前端開發環境 |
| **官方 Redis** | 最新版本，完整功能 | 安裝完整套件 | 需要完整 Redis 功能 |

## Docker 方式（推薦）

### 基本使用
```bash
# 連線到本地 Redis
docker run --rm -it redis:alpine redis-cli

# 連線到遠端 Redis
docker run --rm -it redis:alpine redis-cli -h 192.168.0.8 -p 6379

# 帶密碼連線
docker run --rm -it redis:alpine redis-cli -h redis.example.com -a password
```

### 實用 Alias
```bash
# 加入 ~/.bashrc 或 ~/.zshrc
alias redis-cli='docker run --rm -it redis:alpine redis-cli'

# 使用方式
redis-cli -h localhost -p 6379
```

### 進階用法
```bash
# 使用特定版本
docker run --rm -it redis:7.2-alpine redis-cli

# 挂載本地檔案（用於批次執行）
docker run --rm -it -v $(pwd):/data redis:alpine redis-cli --eval /data/script.lua

# 網路模式（連線到容器化的 Redis）
docker run --rm -it --network host redis:alpine redis-cli
```

## Homebrew Tap 方式

### 安裝步驟
```bash
# 添加第三方 tap
brew tap ringohub/redis-cli

# 更新並檢查環境
brew update && brew doctor

# 安裝 redis-cli
brew install redis-cli
```

### 安全性檢查
```bash
# 檢查套件資訊
brew info redis-cli

# 檢查安裝的檔案
brew list redis-cli

# 檢查套件來源
cat $(brew --repository ringohub/redis-cli)/redis-cli.rb
```

### 套件內容分析
該 Homebrew formula 的主要內容：

```ruby
class RedisCli < Formula
  desc "Install the redis-cli only."
  homepage "https://github.com/aoki/homebrew-redis-cli"
  version "6.0.1"
  url "https://github.com/antirez/redis/archive/#{version}.tar.gz"

  def install
    system "make redis-cli"  # 只編譯 CLI 部分
    bin.install "./src/redis-cli"
  end
end
```

**安全性評估**：
- 使用官方 Redis 原始碼
- 只編譯和安裝 CLI 部分
- 不包含任何惡意程式碼

## Node.js 方式

### 安裝
```bash
# 使用 npm
npm install -g redis-cli

# 使用 yarn
yarn global add redis-cli

# 使用 pnpm
pnpm add -g redis-cli
```

### 使用
```bash
# 基本連線
rdcli -h localhost -p 6379

# 帶密碼連線
rdcli -h redis.example.com -a password
```

### 版本管理
```bash
# 檢查安裝的版本
npm list -g redis-cli

# 更新到最新版本
npm update -g redis-cli

# 移除
npm uninstall -g redis-cli
```

## 官方 Redis 安裝

### 完整安裝
```bash
# 安裝完整 Redis
brew install redis

# 只使用 CLI
redis-cli -h localhost -p 6379

# 停用並移除服務
brew services stop redis
brew uninstall redis
```

## Redis CLI 常用指令

### 連線與認證
```bash
# 基本連線
redis-cli -h hostname -p port

# 密碼認證
redis-cli -h hostname -p port -a password

# 使用 URL 連線
redis-cli -u redis://user:password@hostname:port/database

# SSL/TLS 連線
redis-cli -h hostname -p port --tls --cert cert.pem --key key.pem --cacert ca.pem
```

### 資料庫操作
```bash
# 選擇資料庫
SELECT 1

# 檢查連線狀態
PING

# 查看所有 key
KEYS *

# 查看特定模式的 key
KEYS user:*

# 查看 key 的類型
TYPE keyname

# 查看 key 的值
GET keyname

# 設定 key 的值
SET keyname value

# 刪除 key
DEL keyname
```

### 監控與診斷
```bash
# 查看伺服器資訊
INFO

# 查看特定資訊
INFO memory
INFO replication

# 即時監控指令
MONITOR

# 查看慢查詢
SLOWLOG GET 10

# 查看客戶端連線
CLIENT LIST
```

### 批次操作
```bash
# 執行檔案中的指令
redis-cli < commands.txt

# 執行單一指令
redis-cli SET mykey "Hello World"

# 管道模式
echo "SET key1 value1" | redis-cli --pipe

# 批次匯入資料
redis-cli --pipe < data.txt
```

## 實用腳本

### Redis 連線測試
```bash
#!/bin/bash
# test-redis-connection.sh

HOST="${1:-localhost}"
PORT="${2:-6379}"
PASSWORD="$3"

echo "Testing Redis connection to $HOST:$PORT"

if [[ -n "$PASSWORD" ]]; then
    RESULT=$(redis-cli -h "$HOST" -p "$PORT" -a "$PASSWORD" ping 2>/dev/null)
else
    RESULT=$(redis-cli -h "$HOST" -p "$PORT" ping 2>/dev/null)
fi

if [[ "$RESULT" == "PONG" ]]; then
    echo "✓ Redis connection successful"
    exit 0
else
    echo "✗ Redis connection failed"
    exit 1
fi
```

### Redis 資料備份
```bash
#!/bin/bash
# backup-redis.sh

HOST="localhost"
PORT="6379"
BACKUP_DIR="./redis-backups"
DATE=$(date +%Y%m%d_%H%M%S)

mkdir -p "$BACKUP_DIR"

echo "Starting Redis backup..."

# 備份所有 key
redis-cli -h "$HOST" -p "$PORT" --rdb "$BACKUP_DIR/dump_$DATE.rdb"

# 備份為 JSON 格式
redis-cli -h "$HOST" -p "$PORT" --json KEYS "*" > "$BACKUP_DIR/keys_$DATE.json"

echo "Backup completed: $BACKUP_DIR"
```

### Redis 效能監控
```bash
#!/bin/bash
# monitor-redis.sh

HOST="localhost"
PORT="6379"
INTERVAL=5

echo "Redis Performance Monitor"
echo "========================"

while true; do
    clear
    echo "Redis Status - $(date)"
    echo "Host: $HOST:$PORT"
    echo
    
    # 基本資訊
    redis-cli -h "$HOST" -p "$PORT" INFO server | grep -E "redis_version|uptime_in_seconds"
    
    # 記憶體使用
    redis-cli -h "$HOST" -p "$PORT" INFO memory | grep -E "used_memory_human|used_memory_peak_human"
    
    # 連線數
    redis-cli -h "$HOST" -p "$PORT" INFO clients | grep "connected_clients"
    
    # 指令統計
    redis-cli -h "$HOST" -p "$PORT" INFO stats | grep -E "total_commands_processed|instantaneous_ops_per_sec"
    
    sleep $INTERVAL
done
```

## 疑難排解

### 常見問題

#### 連線被拒絕
```bash
# 檢查 Redis 服務是否運行
telnet hostname 6379

# 檢查防火牆設定
sudo ufw status

# 檢查 Redis 配置
redis-cli CONFIG GET bind
redis-cli CONFIG GET protected-mode
```

#### 認證失敗
```bash
# 檢查是否需要密碼
redis-cli -h hostname -p port INFO server

# 使用正確的密碼格式
redis-cli -h hostname -p port -a "password with spaces"

# 使用 AUTH 指令
redis-cli -h hostname -p port
> AUTH password
```

#### 指令不存在
```bash
# 檢查 redis-cli 是否安裝
which redis-cli

# 檢查 PATH 設定
echo $PATH

# 重新安裝
brew reinstall redis-cli
```

### 效能最佳化

```bash
# 使用管道模式提升效能
redis-cli --pipe < bulk_commands.txt

# 批次操作使用 MULTI/EXEC
redis-cli <<EOF
MULTI
SET key1 value1
SET key2 value2
SET key3 value3
EXEC
EOF

# 使用壓縮減少網路傳輸
redis-cli --latency-history -h hostname -p port
```

## See Also

- [[Docker CLI Snippets]] - Docker 相關指令集合
- [[Awesome CLI]] - 現代化 CLI 工具集合
- [Redis CLI 官方文檔](https://redis.io/docs/ui/cli/)
- [Redis 指令參考](https://redis.io/commands/)
