---
title: Border Collie
description: Resource Management Gantt
tags:
  - 52Projects
  - VibeCoding
  - DogStack
  - Antigravity
image: "https://i.imgur.com/mErPwqL.png"
sidebar_position: 0
date_created: 2025-12-17T00:00:00.000Z
date_updated: 2026-01-06T00:00:00.000Z
slug: /52-projects/border-collie/border-collie/
---

## 序

Border Collie 是一個現代化的專案管理與人力資源甘特圖工具，專為快速編輯與視覺化設計。透過純文字格式定義專案，即時轉換為互動式甘特圖，提供專案甘特圖與人力甘特圖雙視角，幫助團隊快速掌握人員忙碌/空閒時間，方便進行新專案時程規劃。

## 專案開發

### Day 0 - 專案啟動

提交 [[52 Projects/Border Collie/Idea|Idea]] 給 Antigravity，產出第一版原型。隨即展開密集測試與問題修復循環，修復歷程詳見 [[52 Projects/Border Collie/Ticket|Ticket]]。

### Day 1 - 介面優化

初期使用體驗發現介面不夠直觀，陸續加入關鍵改善：

- **今日標記紅線**：清楚標示當前時間點
- **階段串接視覺化**：甘特圖用箭頭方式呈現階段過渡關係
- **凍結窗格設計**：專案/人員名稱（首欄）與日期（首列）固定顯示，參考 Excel 操作習慣

### Day 2 - 功能深化

實際使用中發現團隊協作痛點，針對性加入管理功能：

- **隱藏人員功能**：團隊人員過多時，可隱藏特定成員以專注討論核心資源配置
- **專案暫停功能**：模擬專案暫停情境，快速評估可釋出的人力資源

### Day 3 - 工作區管理

解決資料覆蓋問題：在缺乏工作區設計的情況下，誤點他人分享連結會覆蓋本地資料。因此新增 [[Idea Workspace|Workspace]]
多工作區管理功能，支援專案隔離與安全分享。

## Summary

Border Collie 經過三個階段的迭代開發，從基礎甘特圖功能逐步演進為功能完整的專案管理工具：

**核心功能**：
- 雙視圖切換（專案甘特圖 / 人力甘特圖）
- 純文字編輯與即時預覽
- 今日標記與凍結窗格
- 隱藏/顯示與專案暫停功能
- 多工作區管理與分享機制

**技術特色**：
- 純前端 SPA（Vue 3 + TypeScript）
- Glassmorphism 現代化 UI 設計
- GitHub Gist 雲端同步支援
- 多格式匯出（PNG/SVG/PPT）

## Thoughts

**從使用者角度開發的價值**  
過去工作多是依據需求規格進行開發，往往產出的工具並非自己真正需要的。這次為了解決自身痛點而開發，在使用過程中發現問題並持續改善，這種「開發即使用」的循環讓產品更貼近實際需求。

**AI 輔助開發的突破**  
受到 [MUKI SPACE](https://www.facebook.com/mukispace) 與 Inner Note 的啟發，開始嘗試透過 Vibe Coding 進行 AI 輔助開發。令人驚喜的是，能夠產出如此成熟度的專案，而非以往常見的概念驗證或玩具級產品。

**AI 工具的實用主義**  
與其不斷追逐和堆積各種 AI 工具，不如選擇合適的工具盡早落地使用。實際應用比理論研究更能帶來價值。

## Next Step

**編輯器增強**
- [ ] 專案整體時程調整功能：支援往前/往後移動 n 週，避免逐一編輯各階段日期

**後端整合**
- [ ] 參考 [[Sheltie]] 架構，導入協同編輯與後端儲存機制
- [ ] 簡化分享流程，支援即時資料同步

## See Also

### 人

- [[52 Projects/Border Collie/Idea|Idea]]
- [[Idea Workspace]]
- [[52 Projects/Border Collie/Ticket|Ticket]]

### AI

- [[52 Projects/Border Collie/README|README]]
- [[Prompt Init]]
- [[Prompt Workspace]]
- [[Prompt Dual Layout]]
