---
title: 'Bash: snippets'
description: Notes of Moo Cow
tags:
  - Bash
  - CLI
sidebar_position: 50
date_created: 2023-08-10T00:00:00.000Z
date_updated: 2023-08-10T00:00:00.000Z
image: >-
  https://lh3.googleusercontent.com/pw/AL9nZEUA9Ifvd5Z8SXDWkeVB6AC4MPGwnXaL6kBXNPoXwOQQ2jOcZ1Jw_0p8TKK8C3ZX0e67_FOY15eDrm7aaXSQJcKtoUzC80SAQEHsaBy6qS2AqNNs5VUFNXBKm439y_1wkvmDl-PnL8ReojnIumNlEvOXBg=w800-no?authuser=0
slug: /utilities/cli/bash-snippets/
---

# Bash Snippets

Bash 腳本開發中的常用程式碼片段和技巧整理。

## 數值處理

### 數值檢查
```bash
# 檢查變數是否為數字
if [[ $var =~ ^[0-9]+$ ]]; then
    echo "$var is a number"
fi

# 使用 case 檢查
case $var in
    ''|*[!0-9]*) echo "Not a number" ;;
    *) echo "Is a number" ;;
esac

# 檢查浮點數
if [[ $var =~ ^[0-9]+\.?[0-9]*$ ]]; then
    echo "$var is a valid number"
fi
```

### 數值運算
```bash
# 整數運算
result=$((a + b))
result=$((a * b))
result=$((a / b))

# 浮點數運算 (使用 bc)
result=$(echo "scale=2; $a / $b" | bc)

# 比較數值
if (( a > b )); then
    echo "a is greater than b"
fi
```

## 字串處理

### 字串比較
```bash
# 基本比較
if [[ "$str1" == "$str2" ]]; then
    echo "Strings are equal"
fi

if [[ "$str1" != "$str2" ]]; then
    echo "Strings are not equal"
fi

# 模式匹配
if [[ "$filename" == *.txt ]]; then
    echo "Text file"
fi

# 包含檢查
if [[ "$string" == *"substring"* ]]; then
    echo "Contains substring"
fi
```

### 字串操作
```bash
# 字串長度
length=${#string}

# 子字串擷取
substring=${string:start:length}
substring=${string:5:3}  # 從位置 5 開始取 3 個字元

# 字串替換
new_string=${string/old/new}      # 替換第一個
new_string=${string//old/new}     # 替換所有

# 大小寫轉換
uppercase=${string^^}
lowercase=${string,,}
```

## 陣列操作

### 陣列基礎
```bash
# 宣告陣列
array=("apple" "banana" "cherry")

# 存取元素
echo ${array[0]}        # 第一個元素
echo ${array[@]}        # 所有元素
echo ${#array[@]}       # 陣列長度

# 新增元素
array+=("date")

# 遍歷陣列
for item in "${array[@]}"; do
    echo "$item"
done
```

### 關聯陣列
```bash
# 宣告關聯陣列
declare -A config
config["host"]="localhost"
config["port"]="3306"

# 存取
echo ${config["host"]}

# 遍歷
for key in "${!config[@]}"; do
    echo "$key: ${config[$key]}"
done
```

## 檔案與目錄操作

### 檔案檢查
```bash
# 檔案存在檢查
if [[ -f "$filename" ]]; then
    echo "File exists"
fi

# 目錄存在檢查
if [[ -d "$dirname" ]]; then
    echo "Directory exists"
fi

# 檔案權限檢查
if [[ -r "$filename" ]]; then
    echo "File is readable"
fi

if [[ -w "$filename" ]]; then
    echo "File is writable"
fi

if [[ -x "$filename" ]]; then
    echo "File is executable"
fi
```

### 檔案操作
```bash
# 安全地建立目錄
mkdir -p "$directory"

# 複製並保持權限
cp -p "source" "destination"

# 遞迴複製
cp -r "source_dir" "destination_dir"

# 安全地移除檔案
[[ -f "$filename" ]] && rm "$filename"
```

## 錯誤處理

### 基本錯誤處理
```bash
# 設定嚴格模式
set -euo pipefail

# 檢查命令執行結果
if command -v git >/dev/null 2>&1; then
    echo "Git is installed"
else
    echo "Git is not installed" >&2
    exit 1
fi

# 函數錯誤處理
function safe_command() {
    if ! command "$@"; then
        echo "Command failed: $*" >&2
        return 1
    fi
}
```

### 陷阱處理
```bash
# 清理函數
cleanup() {
    echo "Cleaning up..."
    [[ -f "$temp_file" ]] && rm "$temp_file"
}

# 設定陷阱
trap cleanup EXIT
trap 'echo "Script interrupted" >&2; exit 1' INT TERM
```

## 時間與延遲

### Sleep 命令
```bash
# 基本延遲
sleep 5          # 5 秒
sleep 0.5        # 0.5 秒

# 帶單位的延遲 (並非所有系統都支援)
sleep 5s         # 5 秒
sleep 2m         # 2 分鐘
sleep 1h         # 1 小時
sleep 1d         # 1 天
```

### 時間戳記
```bash
# 當前時間戳記
timestamp=$(date +%s)

# 格式化時間
formatted_time=$(date '+%Y-%m-%d %H:%M:%S')

# 計算執行時間
start_time=$(date +%s)
# ... 執行命令 ...
end_time=$(date +%s)
execution_time=$((end_time - start_time))
echo "Execution time: ${execution_time} seconds"
```

## 輸入輸出

### 讀取使用者輸入
```bash
# 基本輸入
read -p "Enter your name: " name
echo "Hello, $name!"

# 隱藏輸入 (密碼)
read -s -p "Enter password: " password
echo

# 設定預設值
read -p "Enter port [3000]: " port
port=${port:-3000}
```

### 輸出重導向
```bash
# 標準輸出和錯誤輸出
echo "Info message"
echo "Error message" >&2

# 同時輸出到檔案和終端
command 2>&1 | tee output.log

# 靜默執行
command >/dev/null 2>&1
```

## 函數與模組化

### 函數定義
```bash
# 基本函數
function greet() {
    local name="$1"
    echo "Hello, $name!"
}

# 帶返回值的函數
function add() {
    local a="$1"
    local b="$2"
    echo $((a + b))
}

result=$(add 5 3)
```

### 參數處理
```bash
# 處理命令列參數
while [[ $# -gt 0 ]]; do
    case $1 in
        -h|--help)
            show_help
            exit 0
            ;;
        -v|--verbose)
            VERBOSE=1
            shift
            ;;
        -f|--file)
            FILE="$2"
            shift 2
            ;;
        *)
            echo "Unknown option: $1" >&2
            exit 1
            ;;
    esac
done
```

## 實用工具函數

### 日誌函數
```bash
function log() {
    local level="$1"
    shift
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] [$level] $*"
}

function log_info() {
    log "INFO" "$@"
}

function log_error() {
    log "ERROR" "$@" >&2
}
```

### 進度顯示
```bash
function show_progress() {
    local current="$1"
    local total="$2"
    local width=50
    local percentage=$((current * 100 / total))
    local completed=$((current * width / total))
    
    printf "\r["
    printf "%*s" $completed | tr ' ' '='
    printf "%*s" $((width - completed)) | tr ' ' '-'
    printf "] %d%% (%d/%d)" $percentage $current $total
}
```

## 最佳實踐

### 腳本模板
```bash
#!/bin/bash

# 嚴格模式
set -euo pipefail

# 腳本資訊
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SCRIPT_NAME="$(basename "$0")"

# 清理函數
cleanup() {
    # 清理暫存檔案
    [[ -n "${TEMP_DIR:-}" ]] && [[ -d "$TEMP_DIR" ]] && rm -rf "$TEMP_DIR"
}

# 設定陷阱
trap cleanup EXIT

# 主程式
main() {
    # 腳本邏輯
    echo "Script started"
}

# 執行主程式
main "$@"
```

## See Also

- [[Awesome CLI]] - 現代化 CLI 工具集合
- [Bash Reference Manual](https://www.gnu.org/software/bash/manual/)
- [ShellCheck](https://www.shellcheck.net/) - Bash 腳本檢查工具
