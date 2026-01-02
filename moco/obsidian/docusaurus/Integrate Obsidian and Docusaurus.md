---
title: Obsidian integration
description: Integrate Obsidian & Docusaurus
image: 'https://i.imgur.com/mErPwqL.png'
tags:
  - Obsidian
  - HowTo
  - Docusaurus
sidebar_position: 10
sidebar_label: Obsidian integration
date_created: 2022-11-01T00:00:00.000Z
date_updated: 2025-09-23T00:00:00.000Z
slug: /obsidian/docusaurus/integrate-obsidian-and-docusaurus/
---

# [Docusaurus] Obsidian Integration

把 Obsidian 和 Docusaurus 整合, 以 Obsidian 當編輯器編寫文章及建立文章知識庫,
同時利用 Docusaurus 作為客製化發佈工具,

## Source tree

Docusaurus 設定彈性很大,
唯一限制是專案必須有 `docs` 資料夾, 且裡面至少要有一個 ".md" 的檔案. 否則會報錯如下:

```shell
❯ rm -rf docs
❯ yarn start
yarn run v1.22.19
$ docusaurus start
[INFO] Starting the development server...
[ERROR] Error: The docs folder does not exist for version "current". A docs folder is expected to be found at docs.
    at getVersionMetadataPaths (/Users/kywk/.node_modules/docusaurus/node_modules/@docusaurus/plugin-content-docs/lib/versions/files.js:123:15)
    at async createVersionMetadata (/Users/kywk/.node_modules/docusaurus/node_modules/@docusaurus/plugin-content-docs/lib/versions/index.js:97:68)
    at async Promise.all (index 0)
    at async readVersionsMetadata (/Users/kywk/.node_modules/docusaurus/node_modules/@docusaurus/plugin-content-docs/lib/versions/index.js:150:30)
    at async Object.pluginContentDocs [as plugin] (/Users/kywk/.node_modules/docusaurus/node_modules/@docusaurus/plugin-content-docs/lib/index.js:32:30)
    at async initializePlugin (/Users/kywk/.node_modules/docusaurus/node_modules/@docusaurus/core/lib/server/plugins/init.js:83:32)
    at async Promise.all (index 0)
    at async initPlugins (/Users/kywk/.node_modules/docusaurus/node_modules/@docusaurus/core/lib/server/plugins/init.js:91:21)
    at async loadPlugins (/Users/kywk/.node_modules/docusaurus/node_modules/@docusaurus/core/lib/server/plugins/index.js:26:21)
    at async load (/Users/kywk/.node_modules/docusaurus/node_modules/@docusaurus/core/lib/server/index.js:76:58)
[INFO] Docusaurus version: 2.2.0
Node version: v16.17.1
error Command failed with exit code 1.
info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.
```

個人專案檔案結構如下, 看得出同時包含 Docusaurus 專案結構以及其他 Obsidian 文章.

````
❯ tree -a -d -L 2
.
├── .docusaurus
│   ├── ...
│   └── docusaurus-plugin-wikigraph
├── .git
├── .github
│   └── workflows
├── .obsidian
│   ├── plugins
│   └── themes
├── _incoming
│   ├── archive
│   └── sandbox
├── _journaling
│   ├── 2023
│   └── 2024
├── _templates
│   └── scripts
├── assets
├── backpacker
│   ├── ...
│   ├── 2401 Egypt
│   ├── Around World
│   └── PIWIW
├── blog.life
│   ├── ...
│   └── 2024
├── blog.news
│   ├── ...
│   └── 2024
├── com.XXXX
│   ├── xxx
│   └── zip_archive
├── docs
├── important
├── lifehacker
│   ├── ...
│   └── taiwan
├── moco
│   ├── ...
│   └── utilities
├── src
│   ├── components
│   ├── css
│   └── pages
└── static
    └── img
```

## Docusaurus

如前述, Docusaurus 設定彈性很大, 只要指定到正確路徑即可.

```typescript
// 建立共用的 remark 插件配置
function createRemarkPlugins(fileMap, routeBase) {
  return [
    [remarkKanban, { pageResolver: createPageResolver(fileMap), hrefTemplate: (permalink) => `${routeBase}${permalink}/` }],
    [remarkWikiLink, {
      pageResolver: createPageResolver(fileMap),
      hrefTemplate: (permalink) => `${routeBase}${permalink}/`,
    }],
  ];
}

// 在 plugins 中使用
plugins: [
  [
    '@docusaurus/plugin-content-docs',
    {
      id: 'moco',
      path: 'moco',
      routeBasePath: 'moco',
      remarkPlugins: createRemarkPlugins(mocoFileMap, '/moco/'),
      sidebarPath: require.resolve('./sidebars.js'),
    },
  ],
  [
    '@docusaurus/plugin-content-blog',
    {
      id: 'news',
      routeBasePath: 'news',
      path: 'blog.news',
      showReadingTime: true,
    },
  ],
],
````

## .gitignore

常見 Docusaurus 發佈到 GitHub 有兩種方式:

1. 本地端手動 `yarn build` 之後手動把整個 `build` 資料夾上傳到伺服器即可.
2. 配置 GitHub Action, 專案 push 上去後觸發 CI/CD, 讓 GitHub 處理建置和發佈.

第二種方式工作流程較為順暢方便. 且若偶爾在沒有 node.js 環境工作,
只要能 push 上 GitHub, 都可以持續發佈更新網站.

但因專案裡同時包含透過 Obsidian 所管理的個人資料,
好好配置 `.gitignore` 避免個人資料不小心放上 GitHub 是相當重要的.

依實際需求把 Obsidian 專案設定和重要個人資料和工作資料加入 `.gitignore` 即可.

```.gitignore
# Obsidian folder
.obsidian/
assets/

# Personal & Working folder
com.A/
com.B/
important/
project/
temporary.md
```

## Obsidian exclude

上述配置, 是讓 Docusaurus 工作時不受 Obsididan 影響.
相對的, Obsidian 也需要設定來避免 Docusaurus 檔案的影響.

Obsidian 0.14.6+ 以後支援 **Excluded files**.
符合 pattern 的檔案將不會被納入 Obsidian 資料庫內.

`Setting > Files & Links > Excluded files` 把 Docusaurus 相關檔案加入即可.

![Docusaurus Excluded files](https://lh3.googleusercontent.com/pw/AL9nZEW9MMhjprzD-lhJs-LqPuIui3xGYg3AJJk5H5HNOjk-EVujiUzyZP7Oa31Ac1F4F84Av_ECyN4y7b3-UHf3k9ccGvYYjpG7MqxsToNuytl9QElvcZqqdkHCTLhpoptnuGAHlCVMJcirsx0-X4CxVO73sw=w800-no?authuser=0)

Ref: [ignore/hide select files and folders](https://forum.obsidian.md/t/config-to-ignore-hide-select-files-and-folders/4186),

## Trick & Tips

### docusaurus draft

隨著 Obsidian 的使用, 在 docusaurus 相關目錄下可能會建立讓 Obsidian 管理的檔案,
例如把 Obsidian 當 Task Manager 的話, 會建立 `Kanban.md`,`TODO.md` 之類的檔案.

這些檔案內容若不想跟著 docusaurus 一起發佈出去. 最簡單的方式就是在 front matter 的部分加上 `draft: true`.
讓 docusaurus 把這類檔案視為草稿, 發佈時會自動忽略.

## See Also

第一階段的整合算是完成, 後續隨著深入使用 Obsidian,
預計會再折騰一番, 以打造量身製作的知識平台.

### Next Step

- [x] support obsidian wikilink [[Wikilink in Docusaurus]] ✅ 2024-05-15
- [x] support obsidian kanban [[remark-obsidian-kanban]] ✅ 2025-09-23
- [ ] docusaurus-plugin-leaflet
- [ ] ignore Obsidian tags
- [ ] support obsidian callouts
