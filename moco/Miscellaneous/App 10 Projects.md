---
title: 10 JavaScript Projects
description: 10 JavaScript Projects Coding Challenge 學習心得
tags:
  - JavaScript
  - Web Development
  - Coding Challenge
date_created: 2023-01-01T00:00:00.000Z
slug: /miscellaneous/app-10-projects/
---

# 10 JavaScript Projects - Coding Challenge

觀看 [10 JavaScript Projects in 10 Hours - Coding Challenge](https://www.youtube.com/watch?v=dtKciwk_si4) 影片後，
對於許久沒有從頭撰寫純 JavaScript Web 應用程式的我來說，這是個很好的練習機會。

## 專案概述

### Countdown Timer

**設計參考**: [UI Design Daily - Countdown Timer](https://uidesigndaily.com/posts/sketch-countdown-timer-day-876)

**功能特色**:
- 動態計算未來日期
- 即時倒數計時器
- 響應式設計

**實作心得**:
- 影片中將新年日期寫死為常數，我改為動態計算下一個新年日期
- 優化時間計算邏輯，僅計算當日剩餘時間，理論上可降低計算複雜度
- 比較 `Date.getHours()` / `Date.getMinutes()` / `Date.getSeconds()` 等內建函數與自行運算的效能差異

### Quiz App

**設計參考**: [UI Design Daily - Questionnaire](https://uidesigndaily.com/posts/sketch-questionnaire-choice-submit-day-924)

**功能特色**:
- 動態題目載入
- 互動式答題介面
- 即時分數統計

**實作心得**:
- 整合 [Open Trivia DB](https://opentdb.com/) API 作為題庫來源
- 使用 `document.getElementsByName()` 取得使用者選擇，簡化 DOM 結構
- 探討 `document.getElementsByName()` 與 `document.querySelectorAll()` 的效能差異

### Recipe App

**設計參考**: [UI Design Daily - Recipe App](https://uidesigndaily.com/posts/sketch-recipe-app-food-mobile-day-615)

**功能特色**:
- 點擊查看詳細資訊
- localStorage 收藏功能
- 行動裝置友善介面

**實作心得**:
- 發現 [public-apis](https://github.com/public-apis/public-apis) 這個寶庫，為開發提供豐富的練習資源
- 將食譜改為酒譜 App，更符合個人興趣 😄

## 學習心得

### 開發流程
影片採用「先定題目，再找設計」的方式，從 [UI Design Daily](https://uidesigndaily.com/) 尋找合適版面進行開發。
這種從無到有完整建構 WebApp 的過程，對於有基礎但不知如何找題目練習的開發者很有幫助。

### 技術反思
- **原生開發**: 長期未進行純 JavaScript 前端開發，重新學習許多 CSS 語法和技巧
- **框架思考**: UI Framework 是雙面刃，加速開發的同時也降低了對底層技術的熟悉度
- **程式品質**: 影片作者對 CSS 和 UI 設計一致性的要求值得學習

### 開發工具
- **VSCode + Emmet**: 大幅提升開發效率，需要更深入學習相關技巧
- **版面設計**: 實作過程中版面受影片影響較大，程式架構則保持個人風格

## 開發資源

### 設計資源
- [UI Design Daily](https://uidesigndaily.com/) - 每日免費 UI 設計資源
- [Unsplash](https://unsplash.com/) - 高品質免費圖片
- [Flat UI Colors](https://flatuicolors.com/) - 精選配色方案

### 開發工具
- [CSS Gradient](https://cssgradient.io/) - 漸層背景產生器
- [Eggradients](https://www.eggradients.com/) - 漸層色彩靈感
- [cdnjs](https://cdnjs.com/) - 免費 CDN 服務

### 圖示資源
- [Font Awesome](https://fontawesome.com/) - 經典圖示庫
- [Heroicons](https://heroicons.com/) - 現代 SVG 圖示

### API 資源
- [public-apis](https://github.com/public-apis/public-apis) - 免費 API 集合

## 延伸學習

- [10 JavaScript Projects in 1 Hour - Coding Challenge](https://www.youtube.com/watch?v=8GPPJpiLqHk) - 進階挑戰
