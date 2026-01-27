---
title: Tar 加密打包
description: Tar 加密打包
tags:
  - CLI
sidebar_position: 50
hide_table_of_contents: true
date_created: 2020-12-10T00:00:00.000Z
image: "https://i.imgur.com/mErPwqL.png"
slug: /utilities/cli/tar-encrypt-tarball/
---

# Tar 加密打包

在雲端儲存時代，檔案加密變得越來越重要。Tar 結合 OpenSSL 提供了一個簡單有效的檔案加密打包解決方案，特別適合敏感資料的備份和傳輸。

## 背景與需求

### 雲端儲存安全考量

網路上免費的團隊硬碟服務，雖然創建者是管理員，但實際上所有檔案仍受服務提供商的機構管理員管轄。管理員雖然無法直接存取檔案，但有權將檔案擁有者轉移給他人。

對於個人敏感檔案，建議進行加密壓縮後再上傳雲端。

### Tar 的限制

Tar 本身支援多種壓縮方式（gzip, bz2, xz 等），但**不支援加密功能**。在命令列環境下要實現加密打包，需要結合其他工具，最常用的是 OpenSSL。

## 基本加密打包

### 加密語法

```bash
# 基本加密打包（不壓縮）
tar cvf - FILE_OR_DIRECTORY | openssl des3 -salt -k PASSWORD -out encrypted.tar

# 加密並壓縮
tar czf - FILE_OR_DIRECTORY | openssl des3 -salt -k PASSWORD -out encrypted.tar.gz
```

### 參數說明

#### Tar 參數

| 參數  | 說明                          |
| ----- | ----------------------------- |
| `c`   | create - 創建新的 tarball     |
| `v`   | verbose - 顯示處理過程        |
| `f -` | file - 輸出到標準輸出（管道） |
| `z`   | gzip - 使用 gzip 壓縮         |

#### OpenSSL 參數

| 參數          | 說明                       |
| ------------- | -------------------------- |
| `des3`        | 使用 3DES 加密演算法       |
| `-salt`       | 添加隨機鹽值，防範字典攻擊 |
| `-k PASSWORD` | 指定加密密碼               |
| `-out FILE`   | 指定輸出檔案名稱           |

## 解密與還原

### 解密語法

```bash
# 解密並解包
openssl des3 -d -k PASSWORD -salt -in encrypted.tar | tar xvf -

# 解密壓縮檔案
openssl des3 -d -k PASSWORD -salt -in encrypted.tar.gz | tar xzf -
```

### 解密參數

| 參數       | 說明               |
| ---------- | ------------------ |
| `-d`       | decrypt - 解密模式 |
| `-in FILE` | 指定輸入檔案       |

## 進階加密選項

### 更安全的加密演算法

```bash
# 使用 AES-256-CBC（推薦）
tar czf - FILES | openssl aes-256-cbc -salt -k PASSWORD -out encrypted.tar.gz

# 解密 AES-256-CBC
openssl aes-256-cbc -d -k PASSWORD -salt -in encrypted.tar.gz | tar xzf -
```

### 使用金鑰檔案

```bash
# 生成隨機金鑰檔案
openssl rand -base64 32 > encryption.key

# 使用金鑰檔案加密
tar czf - FILES | openssl aes-256-cbc -salt -kfile encryption.key -out encrypted.tar.gz

# 使用金鑰檔案解密
openssl aes-256-cbc -d -salt -kfile encryption.key -in encrypted.tar.gz | tar xzf -
```

### 密碼提示輸入

```bash
# 互動式密碼輸入（更安全）
tar czf - FILES | openssl aes-256-cbc -salt -out encrypted.tar.gz

# 解密時提示輸入密碼
openssl aes-256-cbc -d -salt -in encrypted.tar.gz | tar xzf -
```

## 實用腳本與 Alias

### 基本 Alias 設定

```bash
# ~/.bashrc 或 ~/.zshrc

# 加密 alias（使用固定密碼）
alias encrypt-tar='openssl aes-256-cbc -salt -k YOUR_PASSWORD'
alias decrypt-tar='openssl aes-256-cbc -d -salt -k YOUR_PASSWORD'

# 使用方式
tar czf - important_files/ | encrypt-tar -out backup.tar.gz.enc
decrypt-tar -in backup.tar.gz.enc | tar xzf -
```

### 進階加密腳本

```bash
#!/bin/bash
# encrypt-backup.sh

set -euo pipefail

if [[ $# -lt 2 ]]; then
    echo "Usage: $0 <source> <output>"
    echo "Example: $0 ~/Documents backup.tar.gz.enc"
    exit 1
fi

SOURCE="$1"
OUTPUT="$2"

# 檢查來源是否存在
if [[ ! -e "$SOURCE" ]]; then
    echo "Error: Source '$SOURCE' does not exist"
    exit 1
fi

# 提示輸入密碼
echo "Creating encrypted backup of '$SOURCE'..."
echo "Please enter encryption password:"

# 執行加密打包
if tar czf - "$SOURCE" | openssl aes-256-cbc -salt -out "$OUTPUT"; then
    echo "Backup created successfully: $OUTPUT"
    echo "File size: $(du -h "$OUTPUT" | cut -f1)"
else
    echo "Error: Backup failed"
    exit 1
fi
```

### 解密腳本

```bash
#!/bin/bash
# decrypt-backup.sh

set -euo pipefail

if [[ $# -lt 1 ]]; then
    echo "Usage: $0 <encrypted_file> [output_directory]"
    exit 1
fi

ENCRYPTED_FILE="$1"
OUTPUT_DIR="${2:-.}"  # 預設為當前目錄

# 檢查加密檔案是否存在
if [[ ! -f "$ENCRYPTED_FILE" ]]; then
    echo "Error: Encrypted file '$ENCRYPTED_FILE' not found"
    exit 1
fi

# 建立輸出目錄
mkdir -p "$OUTPUT_DIR"
cd "$OUTPUT_DIR"

echo "Decrypting '$ENCRYPTED_FILE'..."
echo "Please enter decryption password:"

# 執行解密
if openssl aes-256-cbc -d -salt -in "$ENCRYPTED_FILE" | tar xzf -; then
    echo "Files extracted successfully to: $(pwd)"
else
    echo "Error: Decryption failed"
    exit 1
fi
```

## 批次處理

### 批次加密多個目錄

```bash
#!/bin/bash
# batch-encrypt.sh

PASSWORD="your-secure-password"
OUTPUT_DIR="encrypted_backups"

mkdir -p "$OUTPUT_DIR"

for dir in */; do
    if [[ -d "$dir" ]]; then
        output_file="$OUTPUT_DIR/${dir%/}.tar.gz.enc"
        echo "Encrypting $dir -> $output_file"

        tar czf - "$dir" | openssl aes-256-cbc -salt -k "$PASSWORD" -out "$output_file"

        if [[ $? -eq 0 ]]; then
            echo "✓ Success: $output_file"
        else
            echo "✗ Failed: $dir"
        fi
    fi
done
```

### 定時備份腳本

```bash
#!/bin/bash
# scheduled-backup.sh

BACKUP_SOURCE="$HOME/Documents"
BACKUP_DEST="$HOME/Dropbox/Encrypted_Backups"
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="backup_$DATE.tar.gz.enc"
PASSWORD_FILE="$HOME/.backup_password"

# 檢查密碼檔案
if [[ ! -f "$PASSWORD_FILE" ]]; then
    echo "Error: Password file not found: $PASSWORD_FILE"
    exit 1
fi

mkdir -p "$BACKUP_DEST"

echo "Starting backup: $(date)"
echo "Source: $BACKUP_SOURCE"
echo "Destination: $BACKUP_DEST/$BACKUP_FILE"

# 執行備份
if tar czf - "$BACKUP_SOURCE" | openssl aes-256-cbc -salt -kfile "$PASSWORD_FILE" -out "$BACKUP_DEST/$BACKUP_FILE"; then
    echo "Backup completed successfully: $(date)"
    echo "File size: $(du -h "$BACKUP_DEST/$BACKUP_FILE" | cut -f1)"

    # 清理超過 30 天的備份
    find "$BACKUP_DEST" -name "backup_*.tar.gz.enc" -mtime +30 -delete
else
    echo "Backup failed: $(date)"
    exit 1
fi
```

## 安全性考量

### 密碼管理

```bash
# 使用環境變數（較安全）
export BACKUP_PASSWORD="your-secure-password"
tar czf - FILES | openssl aes-256-cbc -salt -k "$BACKUP_PASSWORD" -out encrypted.tar.gz

# 從檔案讀取密碼（最安全）
echo "your-secure-password" > ~/.backup_password
chmod 600 ~/.backup_password
tar czf - FILES | openssl aes-256-cbc -salt -kfile ~/.backup_password -out encrypted.tar.gz
```

### 金鑰強度建議

```bash
# 生成強密碼
openssl rand -base64 32

# 生成更長的金鑰
openssl rand -hex 64

# 使用 passphrase 生成金鑰
echo -n "your-long-passphrase" | openssl dgst -sha256 -binary | openssl base64
```

### 檔案完整性驗證

```bash
# 加密前計算校驗和
tar czf - FILES | tee >(openssl aes-256-cbc -salt -k PASSWORD -out encrypted.tar.gz) | sha256sum > checksum.txt

# 解密後驗證
openssl aes-256-cbc -d -k PASSWORD -salt -in encrypted.tar.gz | sha256sum -c checksum.txt
```

## 效能最佳化

### 壓縮演算法比較

```bash
# gzip（速度快，壓縮率中等）
tar czf - FILES | openssl aes-256-cbc -salt -k PASSWORD -out backup.tar.gz.enc

# bzip2（速度慢，壓縮率高）
tar cjf - FILES | openssl aes-256-cbc -salt -k PASSWORD -out backup.tar.bz2.enc

# xz（速度最慢，壓縮率最高）
tar cJf - FILES | openssl aes-256-cbc -salt -k PASSWORD -out backup.tar.xz.enc
```

### 大檔案處理

```bash
# 使用 pv 顯示進度
tar czf - LARGE_DIRECTORY | pv | openssl aes-256-cbc -salt -k PASSWORD -out large_backup.tar.gz.enc

# 分割大檔案
tar czf - LARGE_DIRECTORY | openssl aes-256-cbc -salt -k PASSWORD | split -b 1G - backup.tar.gz.enc.

# 合併並解密
cat backup.tar.gz.enc.* | openssl aes-256-cbc -d -salt -k PASSWORD | tar xzf -
```

## 疑難排解

### 常見錯誤

```bash
# 密碼錯誤
# Error: bad decrypt
# 解決：檢查密碼是否正確

# 檔案損壞
# Error: invalid padding
# 解決：檢查檔案完整性，重新下載

# 權限問題
# Error: Permission denied
# 解決：檢查檔案權限
chmod 644 encrypted.tar.gz.enc
```

### 除錯技巧

```bash
# 測試加密/解密流程
echo "test data" | openssl aes-256-cbc -salt -k "password" | openssl aes-256-cbc -d -salt -k "password"

# 檢查 tar 檔案完整性
tar tzf backup.tar.gz  # 列出內容但不解壓

# 驗證加密檔案
file encrypted.tar.gz.enc  # 應該顯示 "data"
```

## 現代化替代方案

### 使用 GPG

```bash
# GPG 對稱加密（推薦）
tar czf - FILES | gpg --symmetric --cipher-algo AES256 --output backup.tar.gz.gpg

# GPG 解密
gpg --decrypt backup.tar.gz.gpg | tar xzf -
```

### 使用 7zip

```bash
# 7zip 加密壓縮
7z a -p"password" -mhe=on backup.7z FILES/

# 7zip 解密
7z x backup.7z
```

## See Also

- [[Awesome CLI]] - 現代化 CLI 工具集合
- [[Rclone Dropbox]] - 雲端同步工具
- [OpenSSL 官方文檔](https://www.openssl.org/docs/)
- [Tar 手冊](https://www.gnu.org/software/tar/manual/)

## See Also

- [GNU / Linux 各種壓縮與解壓縮指令 | 凍仁的筆記](http://note.drx.tw/2008/04/command.html)
- [tar命令加密壓縮 - IT閱讀](https://www.itread01.com/content/1551377067.html)
- [Linux tar加密壓縮解壓 - IT閱讀](https://www.itread01.com/content/1547949421.html)
- [第二十四個夏天後: [Linux] 使用 Openssl 做簡易的(DES3)加密、解密 @ Ubuntu 14.04](http://blog.changyy.org/2014/06/linux-openssl-des3-ubuntu-1404.html)
