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
slug: /java/springboot/OSS-Support/
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

## 📅 Spring Boot 版本與支援週期

| 版本  | 發布時間        | 類型       | 社群支援結束 | 企業支援結束     |
| ----- | --------------- | ---------- | ------------ | ---------------- |
| 2.7.x | 2022-05         | 過渡支援   | 2023-11 ✅   | 2025（延長支援） |
| 3.0.x | 2022-11         | STS        | 2023-05 ❌   | 無               |
| 3.1.x | 2023-05         | STS        | 2023-11 ❌   | 無               |
| 3.2.x | 2023-11         | ✅ **LTS** | **2026-11**  | **2028-11**      |
| 3.3.x | 2024-05         | STS        | 2024-11 ❌   | 無               |
| 3.4.x | 2024-11         | STS        | 2025-05 ❌   | 無               |
| 3.5.x | 2025-05         | ✅ **LTS** | **2028-05**  | **2030-05**      |
| 4.0.x | 2025-11（預定） | ✅ **LTS** | **2028-11**  | **2030-11**      |

> 🔸 最新 LTS 為 **3.5.x**
> 🔸 下一版 LTS 為 **4.0.x**（預計 2025 年底發布）
> 🔸 非 LTS 的 minor 版本僅提供半年支援

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

## 💬 使用建議

### 對 OSS 使用者（開發團隊、個人開發者）：

- **選用 LTS（3.2 或 3.5）版本**，避免短期版本（如 3.3、3.4）。
- 利用官方公告時間表提前規劃升級，避免踩到支援中斷的地雷。
- 若對安全性要求高，可考慮透過第三方方式自動追蹤 CVE 並做 hotfix。

### 對企業與政府單位：

- 建議導入 **VMware Tanzu Spring Runtime** 或其他支援通路。
- 像「政府資安指引」或「金融業資安等級規範」通常需有 CVE 應對計畫，此方案可提供快速修補與 SLA。
- 可搭配 Tanzu Build Service、Spring Native 等工具實現穩定部署。

---

## 📰 支援政策公告來源

- 🔗 [Spring Boot 官方支援生命週期表（2025）](https://spring.io/projects/spring-boot#support)
  - [Spring Boot 2.7 Support Period Extended](https://spring.io/blog/2024/09/27/spring-boot-2-7-support-period-extended)
- 📰 [Spring Blog: Introducing LTS support in Spring Boot (2023)](https://spring.io/blog/2023/11/21/introducing-long-term-support-lts-for-spring-boot/)
- 🧾 [VMware Tanzu Spring Runtime 商業支援介紹](https://tanzu.vmware.com/spring-runtime)

---

## AI 誤區

其實在對話過程中, ChatGPT 犯了不少錯誤, 包括誤判斷 `3.2.x` 仍支援到 `2026-11` 等. 有趣的是後面附上的參考連結 [Spring Boot | endoflife.date](https://endoflife.date/spring-boot) 一點進去就看到 3.2.x 大大的紅燈.
進一步的對話與逼問候, ChatGPT 才更新了今年二月的資訊並給出 **相對正確** 的回答.

事實上, 上述資訊仍有些誤區, 但已可相對忽略. 現代社會資訊更新太快, 今日正確的可能明天就翻案.
更值得關注的是, AI 幻覺將是 AI 使用拿捏的一大難點, 萬一對話的是個人沒有任何經驗/背景知識的, 如何驗證?
