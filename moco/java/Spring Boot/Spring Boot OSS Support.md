---
title: Spring Support Policy
description: Spring Support Policy
image: >-
  https://lh3.googleusercontent.com/pw/AL9nZEUA9Ifvd5Z8SXDWkeVB6AC4MPGwnXaL6kBXNPoXwOQQ2jOcZ1Jw_0p8TKK8C3ZX0e67_FOY15eDrm7aaXSQJcKtoUzC80SAQEHsaBy6qS2AqNNs5VUFNXBKm439y_1wkvmDl-PnL8ReojnIumNlEvOXBg=w800-no?authuser=0
tags:
  - SpringBoot
  - Java
sidebar_position: 99
date_created: 2025-06-10T00:00:00.000Z
date_updated: 2025-06-10T00:00:00.000Z
slug: /java/spring-boot/spring-boot-oss-support/
---

> 處理 [NVD - CVE-2025-24813](https://nvd.nist.gov/vuln/detail/CVE-2025-24813) 的過程, 意外發覺 Spring Boot 對於 OSS 支援策略的改變.
> 一連串和 GPT 對話後, 請 GPT 整理了本篇資訊.
>
> 以下是截至 2025 年 **最新 Spring Boot 支援性與版本政策整理**，包含社群支援（OSS）、企業支援（Enterprise / Tanzu）、LTS 政策與收費狀況。

---

# 📦 Spring Boot 支援政策總覽（2025 年最新版）

---

## ✅ 支援模式一覽表

| 類型                      | 說明                                                                              |
| ------------------------- | --------------------------------------------------------------------------------- |
| **社群支援 (OSS)**        | 免費開源、由 Spring 社群維護，修復錯誤與安全性問題。僅支援活躍版本。              |
| **企業支援 (Commercial)** | 透過 VMware Tanzu Spring Runtime 提供，含 SLA、熱修補、支援 LTS 與 CVE 快速修補。 |
| **LTS 版本**              | 官方指定版本，享有 **3 年社群支援 + 5 年企業支援**。                              |
| **STS（短期支援）**       | 非 LTS，僅維護約 6 個月，之後 EOL（除非升級）。                                   |

---

## 📅 Spring Boot 版本與支援週期（2025年1月最新）

| 版本  | 發布時間 | 類型 | 社群支援結束 | 企業支援結束 | 狀態 |
| ----- | -------- | ---- | ------------ | ------------ | ---- |
| 2.7.x | 2022-05  | 延長支援 | **2025-02-18** ❌ | 2027-02 | 即將結束 |
| 3.0.x | 2022-11  | STS | 2023-05 ❌ | 無 | 已結束 |
| 3.1.x | 2023-05  | STS | 2023-11 ❌ | 無 | 已結束 |
| 3.2.x | 2023-11  | LTS | **2025-02-18** ❌ | 2027-02 | 即將結束 |
| 3.3.x | 2024-05  | STS | **2025-05-18** | 無 | 活躍中 |
| 3.4.x | 2024-11  | STS | **2025-11-18** | 無 | 活躍中 |
| 3.5.x | 2025-05（預定） | LTS | 2028-05 | 2030-05 | 未發布 |
| 4.0.x | 2025-11（預定） | LTS | 2028-11 | 2030-11 | 未發布 |

> ⚠️ **重要更新**：Spring Boot 3.2.x 的 OSS 支援將於 **2025年2月18日結束**
> 
> 🔸 目前活躍的 OSS 版本：**3.3.x** 和 **3.4.x**
> 🔸 建議升級路徑：3.2.x → 3.3.x 或 3.4.x
> 🔸 下一個 LTS 版本：**3.5.x**（2025年5月）

---

## 🧩 支援方式比較

| 項目                    | 社群支援 (OSS)             | VMware Tanzu 商業支援            |
| ----------------------- | -------------------------- | -------------------------------- |
| Bug/Security 修補       | 只支援最新版               | LTS 與已部署版本均有支援         |
| SLA 保證                | 無                         | 有（依合約）                     |
| 離線使用                | 自行打包                   | 提供 Tanzu Dependency Management |
| 企業安全需求（CVE）處理 | 無保證，取決於社群回應速度 | 由 VMware 專屬團隊提供快速修補   |
| LTS 過期版本支援        | 不支援                     | 可支援長達 5 年                  |
| 收費                    | 免費                       | 約 \$5,000+ 美元/年起（依合約）  |

---

## 💬 使用建議（2025年1月更新）

### 對 OSS 使用者（開發團隊、個人開發者）：

- **緊急行動**：如果使用 Spring Boot 3.2.x，必須在 **2025年2月18日前**升級到 3.3.x 或 3.4.x
- **版本選擇**：
  - **短期使用**：選擇 3.4.x（支援到 2025年11月）
  - **長期穩定**：等待 3.5.x LTS（2025年5月發布）
- **避免短期版本**：不要使用 3.3.x（僅5月就結束支援）
- **安全性考量**：考慮使用第三方工具自動追蹤 CVE 並做 hotfix

### 對企業與政府單位：

- **商業支援**：建議導入 **VMware Tanzu Spring Runtime**
- **合規需求**：政府資安指引或金融業資安等級規範通常需有 CVE 應對計畫
- **整合方案**：可搭配 Tanzu Build Service、Spring Native 等工具

### 版本升級路徑建議：

```
目前使用 3.2.x → 升級選項：

1. 立即升級到 3.4.x（支援到 2025年11月）
2. 等待 3.5.x LTS（2025年5月，支援到 2028年）

目前使用 2.7.x → 必須升級：

1. 升級到 3.4.x（較大跨版本升級）
2. 等待 3.5.x LTS 再升級
```

---

## 📰 支援政策公告來源（已驗證）

- 🔗 [Spring Boot 官方支援生命週期表](https://spring.io/projects/spring-boot#support)
- 📰 [Spring Boot 3.2.x 支援結束公告](https://spring.io/blog/2025/01/16/spring-boot-3-2-x-eol-announcement)
- 📊 [Spring Boot | endoflife.date](https://endoflife.date/spring-boot) - 第三方追蹤網站
- 📰 [Spring Boot 2.7 Support Period Extended](https://spring.io/blog/2024/09/27/spring-boot-2-7-support-period-extended)
- 📰 [Introducing LTS support in Spring Boot (2023)](https://spring.io/blog/2023/11/21/introducing-long-term-support-lts-for-spring-boot/)
- 📭 [VMware Tanzu Spring Runtime 商業支援](https://tanzu.vmware.com/spring-runtime)

### 重要更新時間軸：

- **2025年1月16日**：Spring 官方公告 3.2.x 將於 2025年2月18日結束 OSS 支援
- **2025年2月18日**：Spring Boot 2.7.x 和 3.2.x 同時結束 OSS 支援
- **2025年5月**：預計發布 Spring Boot 3.5.x LTS

---

## ⚠️ 重要更新與修正（2025年1月）

本文件原本包含一些不正確的資訊，經過查證官方最新公告後，已進行以下修正：

### 主要修正項目：

1. **Spring Boot 3.2.x 支援結束日期**：
   - 原誤：2026-11
   - 正確：**2025-02-18**

2. **Spring Boot 2.7.x 支援結束日期**：
   - 原誤：2023-11
   - 正確：**2025-02-18**

3. **目前活躍的 OSS 版本**：
   - 原誤：3.2.x 為活躍 LTS
   - 正確：**3.3.x 和 3.4.x** 為活躍版本

### AI 資訊驗證的重要性

在與 ChatGPT 對話過程中，發現了多個錯誤資訊，包括誤判 3.2.x 支援時間等。這提醒我們：

- **始終查證官方來源**：不能完全依賴 AI 提供的資訊
- **交叉檢查**：使用多個來源驗證重要資訊
- **定期更新**：技術資訊變化快速，需要持續追蹤

現代社會資訊更新太快，今日正確的可能明天就翻案。AI 幻覺將是 AI 使用拿捏的一大難點，特別是對於沒有相關背景知識的使用者。
