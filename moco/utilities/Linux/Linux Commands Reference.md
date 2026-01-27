---
title: 'Linux 基礎指令參考手冊'
description: 'Linux 系統常用指令完整參考，包含檔案操作、系統管理、網路工具等'
tags:
  - Linux
  - Commands
  - Reference
date_created: 2024-12-19T00:00:00.000Z
slug: /utilities/linux/linux-commands-reference/
---

# Linux 基礎指令參考手冊

本手冊整理 Linux 系統中最常用的指令，適合初學者學習和日常查詢使用。

## 檔案與目錄操作

### 基本導航

```bash
# 顯示當前目錄
pwd

# 列出目錄內容
ls                    # 基本列表
ls -la               # 詳細資訊，包含隱藏檔案
ls -lh               # 人類可讀的檔案大小
ls -lt               # 按修改時間排序
ls -lS               # 按檔案大小排序

# 切換目錄
cd /path/to/directory # 切換到指定目錄
cd ~                 # 切換到家目錄
cd -                 # 切換到上一個目錄
cd ..                # 切換到上層目錄
```

### 檔案操作

```bash
# 創建檔案
touch filename.txt           # 創建空檔案
echo "content" > file.txt   # 創建並寫入內容
echo "more" >> file.txt     # 追加內容

# 複製檔案
cp source.txt dest.txt      # 複製檔案
cp -r source_dir dest_dir   # 遞迴複製目錄
cp -p file.txt backup.txt   # 保留檔案屬性

# 移動/重新命名
mv oldname.txt newname.txt  # 重新命名
mv file.txt /path/to/dest/  # 移動檔案

# 刪除檔案
rm filename.txt             # 刪除檔案
rm -f filename.txt          # 強制刪除
rm -r directory/            # 遞迴刪除目錄
rm -rf directory/           # 強制遞迴刪除
```

### 目錄操作

```bash
# 創建目錄
mkdir dirname               # 創建目錄
mkdir -p path/to/nested/dir # 創建巢狀目錄

# 刪除目錄
rmdir dirname               # 刪除空目錄
rm -rf dirname              # 刪除目錄及內容

# 目錄大小
du -h dirname               # 顯示目錄大小
du -sh *                    # 顯示當前目錄下各項目大小
```

## 檔案內容查看

### 基本查看

```bash
# 查看檔案內容
cat filename.txt            # 顯示完整內容
less filename.txt           # 分頁顯示（推薦）
more filename.txt           # 分頁顯示（基本版）
head filename.txt           # 顯示前 10 行
head -n 20 filename.txt     # 顯示前 20 行
tail filename.txt           # 顯示後 10 行
tail -f filename.txt        # 即時監控檔案變化
```

### 檔案搜尋

```bash
# 在檔案中搜尋文字
grep "pattern" filename.txt         # 基本搜尋
grep -i "pattern" filename.txt      # 忽略大小寫
grep -r "pattern" directory/        # 遞迴搜尋目錄
grep -n "pattern" filename.txt      # 顯示行號
grep -v "pattern" filename.txt      # 反向搜尋（不包含）

# 搜尋檔案
find /path -name "*.txt"            # 按檔名搜尋
find /path -type f -size +100M      # 搜尋大於 100MB 的檔案
find /path -mtime -7                # 搜尋 7 天內修改的檔案
locate filename                     # 快速檔案定位（需更新資料庫）
```

## 檔案權限與所有權

### 權限管理

```bash
# 查看權限
ls -l filename.txt

# 修改權限（數字模式）
chmod 755 filename.txt      # rwxr-xr-x
chmod 644 filename.txt      # rw-r--r--
chmod 600 filename.txt      # rw-------

# 修改權限（符號模式）
chmod +x filename.txt       # 添加執行權限
chmod -w filename.txt       # 移除寫入權限
chmod u+x,g-w filename.txt  # 複合操作

# 遞迴修改權限
chmod -R 755 directory/
```

### 所有權管理

```bash
# 修改所有者
sudo chown user:group filename.txt
sudo chown user filename.txt
sudo chown :group filename.txt

# 遞迴修改所有權
sudo chown -R user:group directory/
```

## 系統資訊與監控

### 系統資訊

```bash
# 系統資訊
uname -a                    # 完整系統資訊
hostnamectl                 # 主機資訊（systemd）
lsb_release -a             # 發行版資訊
cat /etc/os-release        # 作業系統資訊

# 硬體資訊
lscpu                      # CPU 資訊
lsmem                      # 記憶體資訊
lsblk                      # 儲存裝置
lsusb                      # USB 裝置
lspci                      # PCI 裝置
```

### 系統監控

```bash
# 處理程序監控
ps aux                     # 顯示所有處理程序
ps -ef                     # 另一種格式
top                        # 即時處理程序監控
htop                       # 增強版 top（需安裝）
pgrep process_name         # 搜尋處理程序 PID
pkill process_name         # 終止處理程序

# 系統資源
free -h                    # 記憶體使用情況
df -h                      # 磁碟使用情況
iostat                     # I/O 統計（需安裝 sysstat）
vmstat                     # 虛擬記憶體統計
```

### 網路監控

```bash
# 網路連線
netstat -tuln              # 顯示監聽埠
ss -tuln                   # 現代版 netstat
lsof -i :80               # 查看特定埠使用情況

# 網路介面
ip addr show               # 顯示網路介面
ip route show              # 顯示路由表
ping google.com            # 測試連線
traceroute google.com      # 追蹤路由
```

## 壓縮與解壓縮

### tar 檔案

```bash
# 創建壓縮檔
tar -czf archive.tar.gz directory/     # gzip 壓縮
tar -cjf archive.tar.bz2 directory/    # bzip2 壓縮
tar -cJf archive.tar.xz directory/     # xz 壓縮

# 解壓縮
tar -xzf archive.tar.gz                # 解壓 gzip
tar -xjf archive.tar.bz2               # 解壓 bzip2
tar -xJf archive.tar.xz                # 解壓 xz

# 查看壓縮檔內容
tar -tzf archive.tar.gz                # 列出內容
tar -xzf archive.tar.gz file.txt       # 解壓特定檔案
```

### 其他壓縮格式

```bash
# zip 檔案
zip -r archive.zip directory/          # 創建 zip
unzip archive.zip                      # 解壓 zip
unzip -l archive.zip                   # 列出 zip 內容

# 7z 檔案（需安裝 p7zip）
7z a archive.7z directory/             # 創建 7z
7z x archive.7z                        # 解壓 7z
```

## 文字處理

### 基本文字工具

```bash
# 文字統計
wc filename.txt            # 行數、字數、字元數
wc -l filename.txt         # 僅行數
wc -w filename.txt         # 僅字數

# 文字排序
sort filename.txt          # 排序
sort -r filename.txt       # 反向排序
sort -n filename.txt       # 數字排序
sort -u filename.txt       # 排序並去重

# 去除重複
uniq filename.txt          # 去除相鄰重複行
sort filename.txt | uniq   # 完全去重
```

### 進階文字處理

```bash
# cut - 欄位擷取
cut -d',' -f1,3 file.csv   # 擷取 CSV 第 1、3 欄
cut -c1-10 filename.txt    # 擷取每行前 10 個字元

# awk - 文字處理
awk '{print $1}' file.txt  # 印出第一欄
awk -F',' '{print $2}' file.csv  # 指定分隔符

# sed - 文字替換
sed 's/old/new/g' file.txt # 全域替換
sed -i 's/old/new/g' file.txt  # 直接修改檔案
```

## 系統服務管理

### systemd 服務

```bash
# 服務狀態
systemctl status service_name          # 查看服務狀態
systemctl is-active service_name       # 檢查是否運行
systemctl is-enabled service_name      # 檢查是否開機啟動

# 服務控制
sudo systemctl start service_name      # 啟動服務
sudo systemctl stop service_name       # 停止服務
sudo systemctl restart service_name    # 重新啟動服務
sudo systemctl reload service_name     # 重新載入配置

# 開機啟動
sudo systemctl enable service_name     # 設定開機啟動
sudo systemctl disable service_name    # 取消開機啟動

# 查看日誌
journalctl -u service_name             # 查看服務日誌
journalctl -f                          # 即時查看系統日誌
```

## 環境變數與別名

### 環境變數

```bash
# 查看環境變數
env                        # 顯示所有環境變數
echo $PATH                 # 顯示特定變數
printenv HOME              # 另一種方式

# 設定環境變數
export VAR_NAME="value"    # 臨時設定
echo 'export VAR_NAME="value"' >> ~/.bashrc  # 永久設定
```

### 別名設定

```bash
# 查看別名
alias                      # 顯示所有別名

# 設定別名
alias ll='ls -la'          # 臨時別名
echo "alias ll='ls -la'" >> ~/.bashrc  # 永久別名

# 移除別名
unalias ll
```

## 實用技巧

### 指令組合

```bash
# 管道（Pipe）
ls -la | grep "txt"        # 列出 txt 檔案
ps aux | grep firefox      # 搜尋 firefox 處理程序
cat file.txt | sort | uniq # 排序並去重

# 重導向
command > output.txt       # 輸出到檔案（覆蓋）
command >> output.txt      # 輸出到檔案（追加）
command 2> error.log       # 錯誤輸出到檔案
command &> all.log         # 所有輸出到檔案
```

### 快捷鍵

```bash
# 指令列編輯
Ctrl + A                   # 移到行首
Ctrl + E                   # 移到行尾
Ctrl + U                   # 刪除游標前所有字元
Ctrl + K                   # 刪除游標後所有字元
Ctrl + L                   # 清除螢幕

# 處理程序控制
Ctrl + C                   # 中斷當前程序
Ctrl + Z                   # 暫停當前程序
bg                         # 將暫停的程序放到背景
fg                         # 將背景程序帶到前景
```

### 歷史指令

```bash
# 指令歷史
history                    # 顯示指令歷史
!!                         # 執行上一個指令
!n                         # 執行第 n 個歷史指令
!string                    # 執行最近以 string 開頭的指令
Ctrl + R                   # 搜尋歷史指令
```

## 參考資源

### 線上手冊
```bash
man command_name           # 查看指令手冊
info command_name          # 查看 info 文件
command_name --help        # 查看簡短說明
```

### 推薦學習資源
- [Linux Command Line Basics](https://ubuntu.com/tutorials/command-line-for-beginners)
- [The Linux Documentation Project](https://tldp.org/)
- [Arch Wiki](https://wiki.archlinux.org/) - 詳細的技術文件