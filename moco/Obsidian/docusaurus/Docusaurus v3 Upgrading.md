---
title: Docusaurus v3 升級筆記
description: Docusaurus v2 升級到 v3 的完整指南與問題解決
image: 'https://i.imgur.com/mErPwqL.png'
tags:
  - Docusaurus
  - 升級
  - v3
  - v4
  - 版本移轉
date_created: 2024-01-10T00:00:00.000Z
date_updated: 2026-08-17T00:00:00.000Z
slug: /obsidian/docusaurus/docusaurus-v3-upgrading/
---

# [Docusaurus] v3 升級筆記

> 使用 Docusaurus 好些時間，一開始遇到 Docusaurus 更新時，都還會小心確認後再行更新。
> 更新多次沒遇到問題，近來遇到 Docusaurus 提示更新時，往往無腦跟著提示更新。
>
> 然後，就炸了。

本文記錄將 Docusaurus 從 v2 升級到 v3 的完整過程與遇到的問題解決方法，並持續補充 v3 各版本升級（目前到 3.10.2）的踩坑紀錄。

## 升級步驟

### 1. 套件升級 (Package Upgrade)

直接打 `npm install @docusaurus:latest ...` 會有些相依套件沒有跟著更新, 造成生成失敗.
需要參考官網 [Upgrading to Docusaurus v3 | Docusaurus](https://docusaurus.io/docs/migration/v3) - [Upgrading Dependencies](https://docusaurus.io/docs/migration/v3)
的說明, 手動修改 `package.json` 中的設定升級相依套件, 方能正確執行.

```bash
npm i @docusaurus/core@latest @docusaurus/preset-classic@latest @docusaurus/theme-mermaid@latest @docusaurus/module-type-aliases@latest @docusaurus/tsconfig@latest @docusaurus/types@latest @docusaurus/faster@latest
```

### 2. MDX 語法問題解決

```example.md
The object shape looks like {username: string, age: number}

Use Android version <5

You can use a generic type like Array<T>

Follow the template "Road to <YOUR_MINOR_VERSION>"
```

Docusaurus v3 使用 MDX v3 引擎，對於 Markdown 文件中可能會造成 MDX 誤判的 `<` `{` 有較嚴格的 lint 標準。升級後一堆文章都因為類似錯誤造成編譯失敗。

**常見問題範例**：

**解決方法**：官網的 [Common MDX Problems](https://docusaurus.io/blog/preparing-your-site-for-docusaurus-v3#common-mdx-problems) 有發生原因和處理方式。

### 3. 效能提升 (v3.6+)

[Docusaurus 3.6 | Docusaurus](https://docusaurus.io/blog/releases/3.6) Docusaurus 3.6 最大的改進就是效能的提升, 須按裝對應套件與新增設定.

```bash
npm install @docusaurus/faster
```

### 4. 3.9 → 3.10 (2026-08)

3.10.x 是為 v4 鋪路的版本，有兩個會直接讓 build 失敗的變更。

**`future.experimental_faster` 改名為 `future.faster`**

faster 已從 experimental 畢業，舊名在 3.10 會 typecheck 失敗（錯誤訊息會誤導你改成
`experimental_router`）：

```typescript
future: {
  faster: {                       // 原本是 experimental_faster
    swcJsLoader: true,
    swcJsMinimizer: true,
    swcHtmlMinimizer: true,
    lightningCssMinimizer: true,
    rspackBundler: true,
    mdxCrossCompilerCache: true,
    rspackPersistentCache: true,
    ssgWorkerThreads: true,       // 需搭配下方 v4 flag
  },
  v4: {
    removeLegacyPostBuildHeadAttribute: true,
  },
},
```

`ssgWorkerThreads` 會硬性檢查 `v4.removeLegacyPostBuildHeadAttribute` 是否開啟
（`configValidation.js` 直接 throw）。實測 920 頁：cold build 17.5s → 14.4s，
第二次因 rspack persistent cache 降到 8.0s。

**frontmatter 用 tab 縮排會炸掉 build**

3.10 把 frontmatter parser 從 `gray-matter` 換成 `@11ty/gray-matter`，
YAML 縮排用 tab 會直接丟 `YAMLException: tab characters must not be used in indentation`
（3.9 可以過）。這是 Obsidian 存檔的常見樣式，升級前先掃一遍：

```python
# 找出 frontmatter 內含 tab 的檔案（不能用 rg 直接抓，
# 內文的 --- 分隔線會讓 multiline pattern 產生大量誤判）
import pathlib
for p in pathlib.Path('.').rglob('*.md'):
    if 'node_modules' in p.parts or 'build' in p.parts: continue
    t = p.read_text(encoding='utf-8', errors='ignore')
    if not t.startswith('---'): continue
    end = t.find('\n---', 3)
    if end > 0 and '\t' in t[3:end]: print(p)
```

**其他 v4 準備 flag（`future.v4`）**

| Flag | 影響 |
|------|------|
| `removeLegacyPostBuildHeadAttribute` | 無 plugin 用 `postBuild({head})` 就零風險，且是 `ssgWorkerThreads` 前置條件 |
| `useCssCascadeLayers` | Docusaurus/Infima CSS 進 `@layer`，自己的 `custom.css` 維持 unlayered 而一律勝出。注意 `!important` 優先序會**反轉**（layered important > unlayered important） |
| `siteStorageNamespacing` | localStorage key 加站點 namespace，既有訪客的深/淺色偏好會重置一次 |
| `fasterByDefault` | 等同 `faster: true`，已逐項列出就不需要 |
| `mdx1CompatDisabledByDefault` | 要先把 `:::tip 標題` 全部改成 `:::tip[標題]`。注意這個 preprocessor 對 `.md`（CommonMark）也會跑，不是只影響 `.mdx` |

另外 `siteConfig.onBrokenMarkdownLinks` 已棄用（v4 移除），改放
`siteConfig.markdown.hooks.onBrokenMarkdownLinks`。

## 升級總結

v2 到 v3 升級遇到的問題，幾乎官網文件都有提及。耐心跟著文件修正可順利升級。

**主要改進**：
- 更快的編譯速度
- 更嚴格的 MDX 語法檢查
- 更好的效能優化

**參考資源**：

- [Announcing Docusaurus 3.0 | Docusaurus](https://docusaurus.io/blog/releases/3.0)
- [Preparing your site for Docusaurus v3 | Docusaurus](https://docusaurus.io/blog/preparing-your-site-for-docusaurus-v3)

[Release Note]: https://github.com/facebook/docusaurus/releases/tag/v3.0.0
