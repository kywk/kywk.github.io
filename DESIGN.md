---
name: "Modernist Cartography Gazette"
description: "kywk.me - 現代主義探險公報與工匠數位工作室設計系統"
colors:
  primary: "#e26d2d"
  primary-dark: "#c85317"
  primary-dark-theme: "#f5b041"
  neutral-bg: "#fffdfb"
  neutral-bg-dark: "#1a1512"
  surface-bg: "#fef9f3"
  surface-bg-dark: "#231c17"
  accent-teal: "#2e6b68"
  accent-amber: "#d97706"
  text-main: "#2d1e14"
  text-main-dark: "#f5efe9"
  text-muted: "#786c63"
  text-muted-dark: "#a8988b"
  status-live: "#10b981"
  border-hairline: "rgba(45, 30, 20, 0.12)"
  border-hairline-dark: "rgba(245, 176, 65, 0.14)"
typography:
  display:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Noto Sans TC', sans-serif"
    fontSize: "clamp(2.6rem, 5.2vw, 3.8rem)"
    fontWeight: 800
    lineHeight: 1.1
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Noto Sans TC', sans-serif"
    fontSize: "clamp(1.8rem, 3.2vw, 2.3rem)"
    fontWeight: 800
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  title-lg:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Noto Sans TC', sans-serif"
    fontSize: "1.6rem"
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: "-0.015em"
  title:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Noto Sans TC', sans-serif"
    fontSize: "1.35rem"
    fontWeight: 700
    lineHeight: 1.35
  title-sm:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Noto Sans TC', sans-serif"
    fontSize: "1.12rem"
    fontWeight: 600
    lineHeight: 1.4
  body-lg:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Noto Sans TC', sans-serif"
    fontSize: "1.15rem"
    fontWeight: 400
    lineHeight: 1.8
  body:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Noto Sans TC', sans-serif"
    fontSize: "1.05rem"
    fontWeight: 400
    lineHeight: 1.75
    letterSpacing: "0.02em"
  body-sm:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Noto Sans TC', sans-serif"
    fontSize: "0.96rem"
    fontWeight: 400
    lineHeight: 1.7
  caption:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Noto Sans TC', sans-serif"
    fontSize: "0.88rem"
    fontWeight: 400
    lineHeight: 1.6
  micro:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Noto Sans TC', sans-serif"
    fontSize: "0.78rem"
    fontWeight: 600
    letterSpacing: "0.06em"
  monospace:
    fontFamily: "JetBrains Mono, Fira Code, SF Mono, Consolas, monospace"
    fontSize: "0.85rem"
    fontWeight: 500
    letterSpacing: "0.04em"
rounded:
  sm: "8px"
  md: "10px"
  lg: "12px"
  card: "14px"
  xl: "16px"
  pill: "999px"
spacing:
  xs: "0.5rem"
  sm: "0.85rem"
  md: "1.5rem"
  lg: "2.5rem"
  xl: "4.5rem"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "#ffffff"
    rounded: "{rounded.sm}"
    padding: "0.8rem 1.6rem"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.text-main}"
    rounded: "{rounded.sm}"
    padding: "0.8rem 1.4rem"
---

# Design System: Modernist Cartography Gazette

## Overview

kywk.me 的首頁視覺體系「現代主義探險公報（Modernist Cartography Gazette）」將個人數位花園從傳統模板昇華為兼具「探險家航海圖集」與「工匠發佈終端」的雙軸工作室門戶。

本系統以真實的 Obsidian Vault 為單一事實來源，將長程旅行攻略（Backpacker）、生活習慣與手作實驗（Lifehacker）、DevSecOps 工程 SOP（MoCo Lab）以及全螢幕時光相簿（Album）以非對稱拓撲佈局整合，創造出嚴謹、高密度且溫潤易讀的視覺語法。

## Colors

本站採 Sunset Warm 暖色系作為基調，堅持深淺雙主題原生調和：

- **Primary（日落探險橘 `#e26d2d` / 暗色 `#f5b041`）**：象徵暮色航標與工程火光，用於核心呼叫行動（CTA）、關鍵高亮與重要狀態。
- **Accent Teal（高山冷杉藍綠 `#2e6b68` / 暗色 `#48a9a6`）**：象徵高山湖泊與次級航路，用於旅行航跡、StoryMap 標籤與生活日誌。
- **Ground & Surface（象牙暖白 `#fffdfb` 與玄武岩深墨 `#1a1512`）**：淺色如灑滿陽光的厚磅旅行手帳，深色如深夜工作室的柔光螢幕，避免死黑與刺眼純白。
- **Telemetry Tint**：等寬座標、遙測標籤與程式碼段落採用微透背景（`rgba(45, 30, 20, 0.04)` / 暗色 `rgba(0, 0, 0, 0.35)`），維持高資訊密度的清晰度。

## Typography

- **Display & Headings**：使用 Inter 搭配 Noto Sans TC。大標題維持 -0.025em 緊湊字距，以字重與比例傳遞重量，拒絕無意義的漸層字體裝飾。
- **Body & Prose**：中文內文最佳化行高（1.75–1.8），每行控制在 65–75 個字元（ch），保留極佳的長文舒適閱讀節奏。
- **Telemetry & Cartography**：採用 JetBrains Mono 等寬字體呈現經緯度座標（25°02'09"N 121°34'15"E）、更新修訂版本（V17.71）以及文章篇數計數，體現嚴謹的量測美感。

## Layout

- **全寬等高線與數位光網舞台（Full-Bleed Contour & Digital Mesh Hero Stage）**：首屏借鏡 Neo-Mirai 的層疊構圖張力，底層為暖金日落山稜插畫與橫跨畫面的多層次 SVG 等高線及數位光網星座節點，左側以柔和漸層融接紙面，承載西方現代測繪徽章（Survey Crest）、三行大尺度宣言標題與 Backpacker / Album 雙核心行動入口；右側浮現真實航線與相簿觀景座標錨點。
- **四大不重複資訊舞台（Zero-Redundancy Four-Stage Architecture）**：全頁嚴格收斂為四個職責單一的舞台——（1）Hero 旅途與光影主視覺、（2）三大知識庫主線（Backpacker / Lifehacker / MoCo Lab）、（3）Side Projects 開源外掛與工具造物矩陣、（4）光影畫廊與雙軌日誌（Photo Album / Life Blog / News Log），相同頻道絕不跨區重複。
- **非對稱拓撲（Asymmetric Grid Topology）**：徹底摒棄「三張一模一樣的卡片」模板慣性。Backpacker 作為 12 欄全寬支配性卡片（Dominant Lead Card），右側配以量測數據面板；Lifehacker 與重整後的 MoCo Lab 則以對稱 6 欄承接；動態頻道採用左 7 欄相簿主卡、右 5 欄雙部落格上下堆疊的 7:5 黃金比例。
- **工程規格矩陣（Side Projects Spec Matrix）**：雙欄展示個人開源維護的 Obsidian 與 Docusaurus 外掛（`geo-story-map`、`vault-feed-reader`、`docusaurus-kit` 看板與任務套件、`docusaurus-plugin-album`），未來可彈性擴充其他實驗專案。

## Elevation & Depth

- 嚴格遵守「單一維度原則」：陰影與邊框不重複疊加。
- 採用自然物理柔光分層：
  - 微層次（`--gaz-shadow-sm`）：用於預設卡片與標籤。
  - 聚焦層次（`--gaz-shadow-md`）：用於懸停時的溫和浮凸（translateY: -3px）。
- 嚴禁未經磨損的硬邊像素陰影（No hard 4px 4px 0 box-shadows）。

## Shapes

- 容器與卡片圓角控制在 12px–16px，確保現代主義結構的利落感。
- 小型按鈕與互動膠囊採用 8px–10px 圓角。
- 快速篩選 Tag 採用 999px Full Pill。

## Components

1. **Gazette Masthead**：頂部航行數據條，整合經緯度、海拔高度、呼吸指示燈（Beacon Pulse）與全站 1,846 篇筆記同步計數器。
2. **Cartographic Survey Crest & Contour Mesh**：左側西方現代測繪山稜羅盤徽章與垂直高程刻度，搭配橫貫 Hero 畫面的 SVG 等高線、旅途山徑虛線與數位光網節點。
3. **Side Projects Spec Card**：呈現外掛名稱、npm/plugin 套件識別碼、架構筆記連結與 GitHub 原始碼入口的雙層規格面板。
4. **Authored SVG System**：所有圖標均以手刻 2px stroke 的幾何 SVG 組成（羅盤、手帳、終端機、相機、地圖指針、RSS 訊號、看板），嚴禁 Emoji 濫充圖標。

## Do's and Don'ts

### Do
- 保持雙主題色彩的舒適對比度（常規文字 ≥ 4.5:1，標題 ≥ 3:1）。
- 讓標題自帶份量，開門見山傳遞資訊。
- 所有連結與導向使用全站已驗證之正規化路徑（如 `/backpacker/lonely-planet/`、`/album/`）。
- 確保微互動具備平滑回饋（`250ms cubic-bezier(0.4, 0, 0.2, 1)`）。

### Don't
- 禁止使用任何 Eyebrow / Kicker 標籤架在主標題上方。
- 禁止使用文字漸層色（Gradient text）。
- 禁止使用三欄均分、內容貧乏的模板卡片。
- 禁止在沒有實際地圖或繪圖需求時引入高開銷第三方重量級依賴。
