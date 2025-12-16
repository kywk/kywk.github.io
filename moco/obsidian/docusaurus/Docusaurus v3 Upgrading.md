---
title: 'Note: Upgrade to v3'
description: Upgrade to docusaurus v3
image: 'https://i.imgur.com/mErPwqL.png'
tags:
  - Docusaurus
  - HowTo
  - Note
date_created: 2024-01-10T00:00:00.000Z
date_updated: 2024-11-11T00:00:00.000Z
slug: /obsidian/docusaurus/Docusaurus-v3-Upgrading/
---

# [Docusaurus] Upgrade to v3

> 使用 docusaurus 好些時間, 一開始遇到 docusaurus 更新時, 都還會小心確認後再行更新.
> 更新多次沒遇到問題, 近來遇到 docusaurus 提示更新時, 往往無腦跟著提示更新.
>
> 然後, 就炸了.

把 Docusaurus 升級到 v3, 具體功能有哪些尚未了解, 可參考 [Release Note].

## Package Upgrade

直接打 `npm install @docusaurus:latest ...` 會有些相依套件沒有跟著更新, 造成生成失敗.
需要參考官網 [Upgrading to Docusaurus v3 | Docusaurus](https://docusaurus.io/docs/migration/v3) - [Upgrading Dependencies](https://docusaurus.io/docs/migration/v3)
的說明, 手動修改 `package.json` 中的設定升級相依套件, 方能正確執行.

```bash
npm i @docusaurus/core@latest @docusaurus/preset-classic@latest @docusaurus/theme-mermaid@latest @docusaurus/module-type-aliases@latest @docusaurus/tsconfig@latest @docusaurus/types@latest @docusaurus/faster@latest
```

## Bad use of \< \{

```example.md
The object shape looks like {username: string, age: number}

Use Android version <5

You can use a generic type like Array<T>

Follow the template "Road to <YOUR_MINOR_VERSION>"
```

Docusaurus v3 使用 MDX v3 引擎, 對於 Markdown 文件中可能會造成 MDX 誤判的 `<` `{` 有較嚴格的 lint 標準,
升級後一堆文章都因為類似錯誤造成編譯失敗.

官網的 [Common MDX Problem](https://docusaurus.io/blog/preparing-your-site-for-docusaurus-v3#common-mdx-problems) 有發生原因和處理方式.

## v3.6

[Docusaurus 3.6 | Docusaurus](https://docusaurus.io/blog/releases/3.6) Docusaurus 3.6 最大的改進就是效能的提升, 須按裝對應套件與新增設定.

```bash
npm install @docusaurus/faster
```

## Summary

v2 到 v3 升級遇到的問題, 幾乎官網文件都有提及, 耐心跟著文件修正可順利升級.
至於 v3 究竟升級了哪些, 還待研究就是.

- [Announcing Docusaurus 3.0 | Docusaurus](https://docusaurus.io/blog/releases/3.0)
- [Preparing your site for Docusaurus v3 | Docusaurus](https://docusaurus.io/blog/preparing-your-site-for-docusaurus-v3)

[Release Note]: https://github.com/facebook/docusaurus/releases/tag/v3.0.0
