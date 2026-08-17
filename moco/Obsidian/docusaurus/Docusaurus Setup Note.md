---
title: Docusaurus 設定筆記
description: Docusaurus 進階設定與配置筆記
image: >-
  https://lh3.googleusercontent.com/pw/AL9nZEUA9Ifvd5Z8SXDWkeVB6AC4MPGwnXaL6kBXNPoXwOQQ2jOcZ1Jw_0p8TKK8C3ZX0e67_FOY15eDrm7aaXSQJcKtoUzC80SAQEHsaBy6qS2AqNNs5VUFNXBKm439y_1wkvmDl-PnL8ReojnIumNlEvOXBg=w800-no?authuser=0
tags:
  - Docusaurus
  - 設定
  - 多實例
sidebar_position: 10
date_created: 2022-05-24T00:00:00.000Z
date_updated: 2026-08-17T00:00:00.000Z
history:
  - 2026-08-17 多實例踩坑：preset docs/blog、search-local、backdrop-filter、TOC
  - 2024-05-24 Remark Plugin Usage
  - 2022-05-24 初始建立
slug: /obsidian/docusaurus/docusaurus-setup-note/
---

# [Docusaurus] 進階設定筆記

在[搬家到 Docusaurus](/life/2022/05/20/move-to-docusaurus/) 後，發現 Docusaurus 更適合我對於文章整理呈現的想像。進一步把 [kywk.life](https://kywk.github.io) 也轉換到 Docusaurus，隨之有了一些進階需求。

## 多文件實例 (Docs Multi-instance)

想把 kywk.life 中旅行和生活紀錄拆分成不同 Docs, 有各自獨立的側邊導覽和 Tag.
畢竟文章屬性不相同, 拆分開來側邊欄不會過於冗長外, Tag 也不會混在一起.

對於為專案文件出發的 Docusaurus 來說, 類似的需求可能也不少.
雖然系統內建僅支援一份文件, 但可透過官方 plugin 來完成需求.

> The `@docusaurus/plugin-content-docs` plugin can support [multi-instance.](https://docusaurus.io/docs/using-plugins#multi-instance-plugins-and-plugin-ids)
>
> Ref: [Docs Multi-instance | Docusaurus](https://docusaurus.io/docs/docs-multi-instance)

### install plugin

```bash
yarn add @docusaurus/plugin-content-docs
```

### configure

```docusaurus.config.js
module.exports = {
  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'backpacker',
        path: 'backpacker',
        routeBasePath: 'backpacker',
        sidebarPath: require.resolve('./sidebars.js'),
        // ... other options
      },
    ],
  ],
  ...
  themeConfig: {
    navbar: {
      items: [
        {
          to: '/backpacker/way-2-kywk',
          label: 'Lonely Planet',
          position: 'left',
          activeBaseRegex: `/backpacker/`,
        },
        {
          type: 'doc',
          docId: 'way-2-kywk',
          position: 'left',
          label: 'Journal',
        }, ...
      ],
    },
  },
};
```

## 多部落格 (Multiple Blogs)

慢慢把逛 Hacker News / twitter / ... 等看到一些有趣或有用的新聞資訊隨手筆記下來.
而這樣的新聞隨筆不適合放筆記文件, 也不想和主部落格混在一起, 故查了下 Docusaurus 是否支援多個部落格.

> By default, the classic theme assumes only one blog per website
> and hence includes only one instance of the blog plugin.
> If you would like to have multiple blogs on a single website,
> it's possible too! You can add another blog by specifying
> another blog plugin in the plugins option for docusaurus.config.js.
>
> Ref: [Blog | Docusaurus](https://docusaurus.io/docs/blog#multiple-blogs)

`plugin-content-blog` 是預設會安裝的 plugin, 無須另外新增.
需要建立多個部落格, 參考 [multi-instance plugins](https://docusaurus.io/docs/using-plugins#multi-instance-plugins-and-plugin-ids),
替每一個 plugin instance 設定獨立的 plugin ids 即可.

```docusaurus.config.js
module.exports = {
  // ...
  plugins: [
    [
      '@docusaurus/plugin-content-blog',
      {
        /**
         * Required for any multi-instance plugin
         */
        id: 'second-blog',
        /**
         * URL route for the blog section of your site.
         * *DO NOT* include a trailing slash.
         */
        routeBasePath: 'my-second-blog',
        /**
         * Path to data on filesystem relative to site dir.
         */
        path: './my-second-blog',
      },
    ],
  ],
};
```

## 插件系統 (Plugins)

Docusaurus v3 可以使用 MDX plugin 來擴充 Markdown 的格式支援與處理,使用既有
[remark](https://github.com/remarkjs/remark/blob/main/doc/plugins.md#list-of-plugins) /
[rehype](https://github.com/rehypejs/rehype/blob/main/doc/plugins.md#list-of-plugins)
生態圈的 plugin 可以找到多數使用者共同需求的功能來擴展 Docusaurus 文件的產出.

目前所使用的 [[Docusaurus Plugins:Plugins 另行整理於此]].

## 技巧與稍門 (Tips & Tricks)

### GitHub Actions 權限問題

某次 GitHub 版本更新後，Workflow Actions 權限有異動。若出現下列錯誤：

```
Push the commit or tag
  /usr/bin/git push origin gh-pages
  remote: Permission to kywk/kywk.github.io.git denied to github-actions[bot].
  fatal: unable to access 'https://github.com/kywk/kywk.github.io.git/': The requested URL returned error: 403
  Error: Action failed with "The process '/usr/bin/git' failed with exit code 128"
```

到 `Settings` > `Actions` > `General` > `Workflow permissions`，選擇 **Read and write permissions** 即可。

### 多實例站要記得關掉 preset 的預設 docs/blog

`preset-classic` 的 `docs` / `blog` 預設是開啟的。若所有實例都自己在 `plugins` 裡建立，
preset 還會額外生出讀取 `./docs` 與 `./blog` 的預設實例，產生 `/docs`、`/blog` 兩個空路由：

```typescript
presets: [
  ['classic', {
    docs: false,
    blog: false,
    theme: { customCss: './src/css/custom.css' },
  }],
],
```

### 站內搜尋在多實例站的地雷

`@easyops-cn/docusaurus-search-local` 的 `SearchBar` 會呼叫
`useActiveVersion(activePlugin?.pluginId ?? docsPluginIdForPreferredVersion)`。
在 blog 與 404 這類非 docs 頁面沒有 `activePlugin`，fallback 會去找 id 為 `default` 的
docs 實例；多實例站沒有這個 id，SSG 會整批失敗（本站當時 175 頁）。務必指定：

```typescript
docsPluginIdForPreferredVersion: 'backpacker',  // 任一個實際存在的 docs id
docsDir: ['backpacker', 'lifehacker', 'moco'],  // 多實例要逐一列出
docsRouteBasePath: ['backpacker', 'lifehacker', 'moco'],
language: ['en', 'zh'],                          // 中文分詞
```

### `backdrop-filter` 會綁死 fixed 子元素

在 `.navbar` 上用 `backdrop-filter`（毛玻璃效果）會讓它成為 fixed 後代的
**containing block**。Docusaurus 的手機版漢堡選單 `.navbar-sidebar` 是 `.navbar` 的
`position: fixed` 子元素，於是整個選單被壓縮在 navbar 的高度內 —— 看起來像「選單被文章蓋住、
點不到」，而遮罩層也一起失效。解法是選單展開時關掉效果：

```css
.navbar:not(.navbar-sidebar--show) {
  backdrop-filter: blur(12px);
}
```

另外，navbar 高度請設 `--ifm-navbar-height`，不要直接寫 `.navbar { height }`；
Docusaurus 內部的 sticky sidebar 位移與錨點 scroll offset 都依賴那個變數。

### 要隱藏 TOC 請用 frontmatter，不要用 CSS

用 `display: none` 藏 TOC 只是視覺上看不到，DOM 裡的連結還在。若該頁的 heading 被
plugin 換掉（例如 Kanban 看板把 `##` 變成看板欄位、不再產生 heading id），
這些 TOC 連結全部會變成 broken anchors（本站當時 61 個）。正解是：

```yaml
---
hide_table_of_contents: true
---
```

## 相關連結

- [[Docusaurus Plugins]] - 插件使用筆記
- [[Integrate Obsidian and Docusaurus]] - Obsidian 整合指南
- [[Docusaurus v3 Upgrading]] - 版本升級筆記
