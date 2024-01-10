---
title: "Docusaurus: 設定筆記"
description: "Docusaurus 設定筆記"
tags: [Docusaurus]

#sidebar_position: 1
#sidebar_label: Easy
#sidebar_class_name: green

#hide_table_of_contents: true

created: 2022-05-24
updated: 2023-09-15
image: https://i.imgur.com/mErPwqL.png
---

[Docusaurus] 設定筆記
===================

[搬家到 Docusaurus 後](/moco/blog/2022/05/20/move-to-docusaurus/),
覺得 Docusaurus 真的更適合我對於文章整理呈現的想像, 撥空把 [kywk.life](https://kywk.github.io) 也轉換倒 docusaurus,
隨之有了一些進階需求.


Docs Multi-instance
-------------------

想把 kywk.life 中旅行和生活紀錄拆分成不同 Docs, 有各自獨立的側邊導覽和 Tag.
畢竟文章屬性不相同, 拆分開來側邊欄不會過於冗長外, Tag 也不會混在一起.

對於為專案文件出發的 Docusaurus 來說, 類似的需求可能也不少.
雖然系統內建僅支援一份文件, 但可透過官方 plugin 來完成需求.

> The `@docusaurus/plugin-content-docs` plugin can support [multi-instance.](https://docusaurus.io/docs/using-plugins#multi-instance-plugins-and-plugin-ids)
>
> Ref: [Docs Multi-instance | Docusaurus](https://docusaurus.io/docs/docs-multi-instance)

### install plugin ###

### configure ##

``` docusaurus.config.js
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


Multiple Blogs
--------------

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

``` docusaurus.config.js
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


Tip & Trick
-----------

### GitHub Action Permission denied

某次 GitHub 的版本之後, Workflow Actions 權限有異動.
若出現下列錯誤:

```
Push the commit or tag
  /usr/bin/git push origin gh-pages
  remote: Permission to kywk/kywk.github.io.git denied to github-actions[bot].
  fatal: unable to access 'https://github.com/kywk/kywk.github.io.git/': The requested URL returned error: 403
  Error: Action failed with "The process '/usr/bin/git' failed with exit code 128"
```

到 `Settings` > `Actions` > `General` > `Workflow permissions`, 選 __Read and write permission__ 即可.


See Also
--------

...TBD...
