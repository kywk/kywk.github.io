---
title: oha
description: 以 Rust 撰寫的現代化 HTTP 負載測試工具，支援即時 TUI 顯示
image: https://lh3.googleusercontent.com/pw/AL9nZEUA9Ifvd5Z8SXDWkeVB6AC4MPGwnXaL6kBXNPoXwOQQ2jOcZ1Jw_0p8TKK8C3ZX0e67_FOY15eDrm7aaXSQJcKtoUzC80SAQEHsaBy6qS2AqNNs5VUFNXBKm439y_1wkvmDl-PnL8ReojnIumNlEvOXBg=w800-no?authuser=0
tags: [CLI, HTTP, Testing]
sidebar_position: 10
hide_table_of_contents: true
date_created: 2026-07-26
date_updated: 2026-07-26
---

# oha

## Overview

oha 是一款以 Rust 撰寫的現代化 HTTP 負載測試工具，最大特色是測試過程中提供即時 TUI（Terminal User Interface）顯示，讓你在終端機中即時觀察延遲分佈、請求狀態和吞吐量變化。

主要特點：
- 🦀 **Rust 撰寫** — 高效能、低資源消耗
- 📊 **即時 TUI 顯示** — 測試過程中即時呈現 histogram 和統計數據
- 🌐 **HTTP/2 & HTTP/3 支援** — 支援現代 HTTP 協定
- 🎯 **簡潔語法** — 無需複雜設定檔，命令列即可完成所有操作

## Install

```bash
# macOS (Homebrew)
brew install oha

# Cargo (Rust)
cargo install oha

# Arch Linux
pacman -S oha

# Docker
docker run --rm ghcr.io/hatoo/oha http://host.docker.internal:8080
```

## Basic Usage

最簡單的用法，對目標 URL 發送 200 個請求（預設）：

```bash
oha http://localhost:8080
```

指定請求數量和併發數：

```bash
# 發送 1000 個請求，50 個併發連線
oha -n 1000 -c 50 http://localhost:8080

# 持續測試 30 秒
oha -z 30s -c 100 http://localhost:8080

# 限制 QPS（每秒請求數）
oha -z 30s -c 50 -q 500 http://localhost:8080
```

## Advanced Options

### HTTP 方法與自訂 Header

```bash
# POST 請求附帶 JSON body
oha -m POST -H "Content-Type: application/json" -d '{"key":"value"}' http://localhost:8080/api

# 自訂多個 Header
oha -H "Authorization: Bearer token123" -H "X-Custom: value" http://localhost:8080
```

### 協定與連線控制

```bash
# 使用 HTTP/2
oha --http2 http://localhost:8080

# 使用 HTTP/3 (QUIC)
oha --http3 https://localhost:8443

# 啟用延遲校正（Coordinated Omission 修正）
oha --latency-correction -z 30s http://localhost:8080

# 設定連線逾時
oha --timeout 10s http://localhost:8080
```

### 輸出格式

```bash
# 輸出 JSON 格式（適合 CI/CD pipeline）
oha -j http://localhost:8080

# 停用即時 TUI（僅顯示最終結果）
oha --no-tui -n 500 http://localhost:8080
```

## Output Format

oha 的即時 TUI 顯示包含：

- **即時 Histogram** — 回應時間分佈的直方圖
- **百分位延遲** — p50 / p90 / p95 / p99 / p99.9
- **狀態碼統計** — 各 HTTP 狀態碼的數量與比例
- **吞吐量** — 每秒請求數 (RPS) 即時變化
- **錯誤統計** — 逾時、連線失敗等錯誤彙總

測試結束後的摘要報告包含完整的延遲百分位數據、成功率和平均吞吐量。

## Comparison

| 特性 | oha | ab | wrk | hey | vegeta |
|------|-----|-----|-----|-----|--------|
| 語言 | Rust | C | C | Go | Go |
| 即時 TUI | ✅ | ❌ | ❌ | ❌ | ❌ |
| HTTP/2 | ✅ | ❌ | ❌ | ✅ | ✅ |
| HTTP/3 | ✅ | ❌ | ❌ | ❌ | ❌ |
| 腳本擴展 | ❌ | ❌ | Lua | ❌ | ❌ |
| 恆定速率 | -q 限制 | ❌ | ❌ | -q 限制 | ✅ (核心功能) |

- **oha vs ab** — oha 提供現代 TUI 介面與 HTTP/2 支援，ab 已停止更新且不支援現代協定
- **oha vs wrk** — oha 語法更簡潔，無需撰寫 Lua 腳本；wrk 適合需要複雜請求邏輯的場景
- **oha vs hey** — 兩者定位相似（簡單好用），oha 多了即時 TUI 和 HTTP/3；hey 以 Go 撰寫，安裝方式不同
- **oha vs vegeta** — vegeta 專注於恆定速率測試（constant-rate），適合模擬固定流量；oha 預設為最大吞吐量測試（max-throughput），適合壓力測試

## See Also

- [oha GitHub](https://github.com/hatoo/oha)
- [wrk - HTTP benchmarking tool](https://github.com/wg/wrk)
- [hey - HTTP load generator](https://github.com/rakyll/hey)
- [vegeta - HTTP load testing tool](https://github.com/tsenart/vegeta)
