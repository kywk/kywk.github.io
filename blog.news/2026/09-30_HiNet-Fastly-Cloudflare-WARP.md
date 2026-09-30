---
title: 中華電信連 Fastly 異常與 Cloudflare WARP 解法
description: 近期 HiNet 連往 Fastly CDN 路由異常，導致 Twitter 圖片轉圈與 GitHub Raw 下載卡住。快速筆記問題成因與 Cloudflare WARP 繞道解法。
authors: kywk
tags:
  - Network
  - HiNet
  - Cloudflare
  - Mac
cover: https://lh3.googleusercontent.com/pw/AM-JKLXZZHmidSgMMB2k8blkneclNRysPXLr__G7rZ4hPi2sN0jC67PHAbX1MyFj8hQX_MTZ6bwIMPwCyu2fu1bU0ZXSX09eu-OlSDb4U-9haUS_wgnVPLaCM6WQLsRbsnocF8X5Edmt35rDjytljbNEMsaf8A=w800-no?authuser=0
hide_table_of_contents: true
date_created: 2026-09-30
---

# 中華電信連 Fastly 異常與 Cloudflare WARP 解法

- [推特、GitHub 下載變超慢？中華電信 Fastly 連線異常，Cloudflare WARP 一鍵解決 - electrify.tw](https://electrify.tw/hinet-fastly-twitter-github-slow-cloudflare-warp/)

近期中華電信（HiNet）連線前往 **Fastly CDN**（經香港 / PCCW 海外路徑）出現嚴重壅塞與延遲。

### 現象與成因

- **Twitter 文字秒開、圖片轉圈**：主站與 API 走 Cloudflare 台北節點直連，但圖片（`pbs.twimg.com`）與影片（`video.twimg.com`）託管在 Fastly，連線常卡住 10 餘秒。
- **GitHub Raw 變慢**：`github.com` 主站走微軟骨幹在台北直連，但 `raw.githubusercontent.com` 同樣走 Fastly。
- **改 DNS 無效**：DNS 只負責將網域名稱解析為 IP，實際封包傳輸仍走中華電信那條擁塞的海外海纜。

---

### 解法：Cloudflare WARP 繞道

藉由 **Cloudflare WARP** 將流量封裝送進 Cloudflare 本地節點，改走其全球專用骨幹連往 Fastly，繞過故障的公網線路。

#### 1. 安裝與啟用 (macOS)

```bash
# 安裝
brew install --cask cloudflare-warp
```

- 開啟 `Cloudflare WARP.app`，在系統提示中**允許加入 VPN 設定**。
- 將模式設定為 **WARP**（非僅 1.1.1.1 DNS）。

#### 2. 驗證

```bash
curl -s https://cloudflare.com/cdn-cgi/trace | grep warp
# 輸出 warp=on 即生效
```

---

### 備註

- 免費版 WARP 即可完全解決，無需升級 WARP+。
- 遇網銀或特定對海外 IP 敏感的在地串流，可在選單列隨時「暫停 WARP」。
- 屬暫時性繞道方案，待 HiNet 修復 Fastly 路由後切回直連即可。
