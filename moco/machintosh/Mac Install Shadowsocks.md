---
title: 'Note: Shadowsocks Setup'
description: macOS 上安裝和配置 Shadowsocks 代理工具
tags:
  - Mac
  - Network
sidebar_position: 60
date_created: 2021-03-15T07:33:18.000Z
image: >-
  https://lh3.googleusercontent.com/pw/ACtC-3d0i64fe-5XcNdEIkJXE_ucdKG_74gSGLz5YO2oik795zztBL7450Ff7dEQpMGRBXf7RKVteWTfqKM_efzjXja7JGyS3ZCUoPfkPJN61wfga53Tgo8mcFyWOFi_68TDQUZyNIvhEaUPyKPzgWAWHbwOHA=w1280-h720-no?authuser=0
slug: /machintosh/mac-install-shadowsocks/
---

# [Mac] Shadowsocks Setup

因大陸案子關係，接觸了些大陸網路環境，也因此接觸到 Shadowsocks。

[Shadowsocks（簡稱 SS）](https://zh.wikipedia.org/wiki/Shadowsocks) 是一種基於 Socks5 代理方式的加密傳輸協定，也可以指實現這個協定的各種開發包。在中國大陸，SS 廣泛用於突破防火長城（GFW），以瀏覽被封鎖、遮蔽或干擾的內容。

Shadowsocks 需找個 VPS 跑 server，再透過本地端 client 連線。server 端的設定這篇不談，僅紀錄 macOS 上安裝與設定 client 的過程。

## 安裝 shadowsocks-libev

Shadowsocks 有不少 client 可用，我選用 shadowsocks-libev。它可以當系統服務，也可以透過不少 plugin 來擴充功能，相當強大方便。

透過套件管理工具 Homebrew 即可安裝 shadowsocks-libev：

```shell
brew update
brew install shadowsocks-libev
```

安裝成功後會顯示以下訊息：

```
To have launchd start shadowsocks-libev now and restart at login:
  brew services start shadowsocks-libev
Or, if you don't want/need a background service you can just run:
  /usr/local/opt/shadowsocks-libev/bin/ss-local -c /usr/local/etc/shadowsocks-libev.json
```

## 測試連線

先透過 CLI 確認 SS 連線可以正確運作：

```shell
ss-local -s <SERVER_IP> -p <SERVER_PORT> -k <PASSWORD> -b 0.0.0.0 -l 1080 -m aes-256-gcm
```

出現以下訊息表示 SS 連線成功：

```
2021-03-15 17:28:36 INFO: initializing ciphers... aes-256-gcm
2021-03-15 17:28:36 INFO: listening at 0.0.0.0:1080
```

## 配置 shadowsocks-libev

shadowsocks-libev 可以服務方式運行，配置文件在 `/usr/local/etc/shadowsocks-libev.json`：

```json
{
    "server": "your-server.example.com",
    "server_port": 8388,
    "local_port": 1080,
    "password": "your-password-here",
    "timeout": 5,
    "method": "chacha20-ietf-poly1305",
    "mode": "tcp_and_udp"
}
```

### 配置說明

- **server**: 伺服器地址
- **server_port**: 伺服器端口
- **local_port**: 本地監聽端口（預設 1080）
- **password**: 連線密碼
- **timeout**: 連線超時時間（秒）
- **method**: 加密方式（推薦 chacha20-ietf-poly1305 或 aes-256-gcm）
- **mode**: 傳輸模式（tcp_and_udp 或 tcp_only）

修改後可透過 brew services 啟動服務：

```shell
brew services start shadowsocks-libev
# ==> Successfully started `shadowsocks-libev` (label: homebrew.mxcl.shadowsocks-libev)
```

## 系統代理設定

### 全域代理

macOS 可透過全域代理的方式，讓所有連線都使用 SS 當跳板。設定路徑：

`系統偏好設定 > 網路 > Wi-Fi > 進階 > 代理`

![](https://lh3.googleusercontent.com/pw/ACtC-3du9pQkxgcpbedOxgve86--0UEyEQFCL63vTq-lq2xKJTunRbwdnK9KYniQK3fCcgXeYznijbOQjGTEowRbOwhgbYrILrh1NIsfm_6vskx_413Bt8-s8dVsoJP1LETT0NuInrjXbT_AiYnTEbe2IDEkuQ=w1336-h1154-no?authuser=0)

在 SOCKS 代理欄位填入：
- **SOCKS 代理伺服器**: localhost
- **連接埠**: 1080

![](https://lh3.googleusercontent.com/pw/ACtC-3fnJwLdyl7XqvApKymmHyElVZckPBgMyCaTeSEdmX-mCrTRh3XzRP8z0g9DUcbb0dOkMSTVIXNBqfJZcfwgwaNygIE0vAFjcIkj-Rq8tdVAKGmtodCz-Wc9vnjWPB0zEcaLcDm3UFMe4gpfpMKGEWTFig=w1336-h1154-no?authuser=0)

### 快速開關代理

一般來說不會設定為全域代理，會透過 PAC 來設定白名單等自動代理。但我個人需求比較簡單，需要處理公務時開啟代理連線管理後台，處理完畢即可關閉代理。

因此設定了簡單的 alias，透過 CLI 來快速開關代理：

```bash
# 加入 ~/.zshrc 或 ~/.bashrc
alias proxyon='brew services restart shadowsocks-libev; networksetup -setsocksfirewallproxy wi-fi localhost 1080'
alias proxyoff='brew services stop shadowsocks-libev; networksetup -setsocksfirewallproxystate wi-fi off'
```

#### 開啟代理

```shell
proxyon
# ==> Successfully started `shadowsocks-libev` (label: homebrew.mxcl.shadowsocks-libev)
```

#### 關閉代理

```shell
proxyoff
# Stopping `shadowsocks-libev`... (might take a while)
# ==> Successfully stopped `shadowsocks-libev` (label: homebrew.mxcl.shadowsocks-libev)
```

## 進階設定

### PAC 自動代理

使用 PAC（Proxy Auto-Config）可以根據規則自動選擇是否使用代理：

1. 建立 PAC 檔案 `proxy.pac`
2. 在系統代理設定中選擇「自動代理配置」
3. 填入 PAC 檔案路徑

### 使用 simple-obfs 混淆

安裝 simple-obfs 插件以增加流量混淆：

```shell
brew install simple-obfs
```

修改配置檔加入 plugin 設定：

```json
{
    "server": "your-server.example.com",
    "server_port": 8388,
    "local_port": 1080,
    "password": "your-password-here",
    "timeout": 5,
    "method": "chacha20-ietf-poly1305",
    "mode": "tcp_and_udp",
    "plugin": "obfs-local",
    "plugin_opts": "obfs=http;obfs-host=www.bing.com"
}
```

## 疑難排解

### 連線失敗

檢查服務狀態：

```shell
brew services list | grep shadowsocks
```

查看日誌：

```shell
tail -f /usr/local/var/log/shadowsocks-libev.log
```

### 端口被佔用

檢查端口使用情況：

```shell
lsof -i :1080
```

### 重新啟動服務

```shell
brew services restart shadowsocks-libev
```

## 參考資料

- [MacOS 使用 shadowsocks-libev+Simple-OBFS 教程](https://medium.com/@yanlong/macos使用shadowsocks-libev-simple-obfs教程-c10eba9c0758)
- [ShadowSocks 助力 macOS 科學上網](https://marvinsblog.net/post/2017-01-15-use-shadowsocks-on-macos/)
- [Shadowsocks · Mac OS X 配置指南](https://wild-flame.github.io/guides/docs/mac-os-x-setup-guide/shadowsocks)
- [shadowsocks-libev & acl on macOS](https://placeless.net/blog/shadowsocks-libev-&-acl-on-macos)
- [How to set proxy on OS X Terminal permanently?](https://apple.stackexchange.com/questions/226544/how-to-set-proxy-on-os-x-terminal-permanently)
