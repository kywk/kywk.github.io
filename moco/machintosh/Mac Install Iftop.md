---
title: 'Note: iftop 安裝失敗解決'
description: macOS 上安裝 iftop 網路監控工具的問題與解決方式
tags:
  - Mac
  - CLI
sidebar_position: 60
hide_table_of_contents: true
date_created: 2020-12-07T08:48:04.000Z
image: >-
  https://lh3.googleusercontent.com/pw/ACtC-3fnLstA2rsbmbt0hI7IWqhfzOU17UzGFO6pEIfoC2_x_l526rOlZ3_p4RbWvVFWlT6uMlnPMzjCSxDILtn7Er5Ch0JPYJReE0BhmCXqJh6TsqrygLrL17dcz1Dyq3eJ7MZhHDqQhvWbX3zJvneD1CRanA=w800-no?authuser=0
slug: /machintosh/mac-install-iftop/
---

# [Mac] iftop 安裝失敗與解決方式

測試 Rclone 伺服器端傳輸時發覺 macOS 並無 iftop 指令，習慣性地用 brew 安裝了。

## 問題描述

### 安裝 iftop

```shell
brew install iftop
```

安裝完成後提示 iftop 這個指令需要用 root 權限執行：

```
iftop requires root privileges so you will need to run `sudo iftop`.
You should be certain that you trust any software you grant root privileges.
```

### 執行錯誤

然而使用 `sudo iftop` 之後卻出現 command not found 的錯誤：

```shell
sudo iftop
# sudo: iftop: command not found
```

## 問題原因

Homebrew 將 iftop 安裝在 `/usr/local/sbin` 目錄下，但該目錄不在系統的 PATH 環境變數中，導致即使使用 sudo 也無法找到指令。

## 解決方式

### 方法一：修改系統 PATH（推薦）

編輯系統 PATH 設定檔：

```shell
sudo vim /etc/paths
```

在檔案中加入 `/usr/local/sbin`：

```
/usr/local/bin
/usr/local/sbin
/usr/bin
/bin
/usr/sbin
/sbin
```

存檔後重啟終端機，即可正常使用 iftop。

![](https://lh3.googleusercontent.com/pw/ACtC-3dGa69B3UVBKt_TYzNt4-nTxPn8WbSfDK1nVlQ7PXOXDIwwV9pQbliqr6_vH69TMj-FOUY26BG_CiFLDHo6pXTGOE6dtYMESpYQD-8jucaCbnZ3qObEMzdsFbm62I_Omdvzz-Q_unLNo2CVRxQPkyDsAw=w1208-h894-no?authuser=0)

### 方法二：使用完整路徑

直接使用完整路徑執行：

```shell
sudo /usr/local/sbin/iftop
```

### 方法三：建立 alias

在 `~/.zshrc` 或 `~/.bashrc` 中加入：

```bash
alias iftop='sudo /usr/local/sbin/iftop'
```

## iftop 基本使用

### 常用參數

```shell
# 監控特定網路介面
sudo iftop -i en0

# 不顯示 DNS 解析
sudo iftop -n

# 顯示連接埠號碼
sudo iftop -P

# 組合使用
sudo iftop -i en0 -nP
```

### 互動式快捷鍵

- `h` - 顯示說明
- `n` - 切換 DNS 解析
- `s` - 切換來源主機顯示
- `d` - 切換目的主機顯示
- `p` - 切換連接埠顯示
- `q` - 退出

## 替代工具

如果不想修改系統 PATH，也可以考慮使用其他網路監控工具：

- **nettop** - macOS 內建工具
- **bmon** - 頻寬監控工具
- **vnstat** - 網路流量統計

```shell
# 安裝替代工具
brew install bmon vnstat
```

## 參考資料

- [一次 macbook 安裝 iftop 失敗的經歷及解決方式](https://blog.csdn.net/hl449006540/article/details/86753227)
- [iftop - display bandwidth usage on an interface](https://www.ex-parrot.com/pdw/iftop/)
