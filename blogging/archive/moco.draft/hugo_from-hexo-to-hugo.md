---
title: "從 Hexo 到 Hugo"
date: 2020-10-14T15:08:05+08:00
images: []
categories: ["hugo"]
tags: ["hugo", "tutorial"]
---

_本文以 Hugo v0.76.2 編寫介紹, 其他版本若步驟或訊息內容不符, 請以官方文件為準_

從 Hexo 到 Hugo
---------------

沒想過會再次開始寫 Blog, 多事的 2020 太多意外, 覺得需要即時一一進行想做的事.  
於是重新開始了 Blog, 把想做的事完成, 紀錄, 然後放水流, 繼續...

雖一直使用 Hexo, 但脫節的這些年 Hexo 改了不少. 
繼續沿用 Hexo 還是換個平台重新來過, 評估了許久.  
之前使用自行修改過後的 Hexi, 和 Hexo 已越來越不相容, 偶爾升版都需解決衝突.

用 [從 Hexo 到 Hugo](https://www.google.com/search?sxsrf=ALeKk032kFJ5VuvMawA5Inq9zUmrYJtn3Q%3A1602060011667&ei=6359X8GUKOSbmAWh8oewDQ&q=%E5%BE%9E+hexo+%E5%88%B0%C2%A0hugo&oq=%E5%BE%9E+hexo+%E5%88%B0%C2%A0hugo&gs_lcp=CgZwc3ktYWIQAzoECCMQJzoHCCMQsAIQJzoFCCEQoAFQi3hYnrcBYIu5AWgEcAB4AYABhAGIAbkMkgEEMjIuMpgBAKABAaoBB2d3cy13aXrAAQE&sclient=psy-ab&ved=0ahUKEwiBtp3PiqLsAhXkDaYKHSH5AdYQ4dUDCA0&uact=5) 餵狗, 
多數人棄坑 Hexo 原因多為效能落差大, 及轉移無痛.  
這些文章中, 個人心路歷程則和 [从 Hexo 到 Hugo - ouuan的博客](https://ouuan.github.io/post/from-hexo-to-hugo/) 較為接近.  
自己工作上的開發也漸漸從 node.js 轉移到 go lang, 部落格平台轉移似乎天注定.



建制環境
-------

官方有提供如何安裝及設定 Hugo 的[說明文件](https://gohugo.io/getting-started/installing/), 
網路上也找得到[中文版文件](https://www.gohugo.org/doc/overview/installing/).  
[使用Hugo+Github Pages建置Blog](https://carrie-lai.github.io/post/createhugoblog/) 這篇寫得挺詳細,
部分內容架構會參考該文, 再以自己的歷程增減補充.

### 安裝 Hugo ###

對於 Mac 開發者來說, [Homebrew](https://brew.sh/) 該是再熟悉不過的工具.
Hugo 有提供 brew 套件, 相當方便的安裝方式.

``` shell
$ brew install hugo
```

安裝完後可透過 `hugo version` 確認版本, 若安裝失敗應該會出現 `command not found` 的錯誤訊息.
若可顯示 Hugo 版本資訊則安裝成功

``` shell
$ brew version
Hugo Static Site Generator v0.76.2/extended darwin/amd64 BuildDate: unknown
```

若透過 brew 安裝的版本不是想要的版本, 也可以自行下載特定版本手動安裝.  
梅干有教學: [MAC平台環境中，下載所需的Hugo版本與手動安裝 | 梅問題．教學網](https://www.minwt.com/webdesign-dev/html/21603.html)

### 初始化 Blog ###

找個地方當作是存放 Blog 的資料夾, 下指令 `hugo new site 目標資料夾路徑`  

``` shell
$ hugo new site test
Congratulations! Your new Hugo site is created in /Users/kywk/Downloads/test.

Just a few more steps and you're ready to go:

1. Download a theme into the same-named folder.
   Choose a theme from https://themes.gohugo.io/ or
   create your own with the "hugo new theme <THEMENAME>" command.
2. Perhaps you want to add some content. You can add single files
   with "hugo new <SECTIONNAME>/<FILENAME>.<FORMAT>".
3. Start the built-in live server via "hugo server".

Visit https://gohugo.io/ for quickstart guide and full documentation.
```

成功的話會看到上述訊息 (依版本不同訊息內容或許不同)  
在 Blog 資料夾也會看到預設得資料結構

``` shell
$ cd test/
$ ls
archetypes  config.toml content     data        layouts     static      themes
```

### 選用 theme ###

主題可以到 [Hugo Themes](https://themes.gohugo.io/) 去找自己喜歡的來用, 都有預覽可以看.

官方教學 [Quick Start | Hugo](https://gohugo.io/getting-started/quick-start/) 是建議使用 git submodule 來安裝與追蹤主題更新,
不過我並沒有打算為部落格建立 git 版控, 所以直接把喜歡的主題 clone 到 themes 資料夾底下.

這個部落格用的是 [coder](https://themes.gohugo.io/hugo-coder/), 指令如下:

```
$ cd themes
$ git clone https://github.com/luizdepra/hugo-coder.git
```

不同主題會有不同主題的配置內容, 主題的說明文件上應該都會說明設定方式, 詳閱並耐心修改.
大部分 Hugo 主題都會有 `exampleSite` 資料夾, 是個參考修改的入口.



搬移 hexo 文件
-------------

以下說明 Hexo 和 Hugo 設計思維不同之處, 並簡單介紹搬移 Hexo 到 Hugo 注意事項.

### 檔案資料夾 ###

Hugo 文章則放在 `content` 資料夾, 直接把 Hexo 站台 `source/_post` 的檔案直接複製到 Hugo 的 `content` 即可.

自己目前是使用 [Obsidian](https://obsidian.md/) 作為筆記管理系統, 部落格文章也都存放在 Obsidian 資料倉儲內.
所幸 UNIXlike 檔案系統的支援, 可以直接建立 Symbolic link, 把 Obsidian 資料夾下的部落格文章 link 到 Hugo 站台.

``` shell
$ cd hugo-site/content
$ ln -sfF ~/Documents/Obsidian/blog blog
```

這樣一來, 我可以使用 Obsidian 來管理部落格文章, 並使用 Hugo 來發佈部落格.

### 草稿 ###

hexo 把放在 `source/_draft` 的文章視為草稿, 發佈時不會產生該資料夾下的文章.  
hugo 則是以文章 Front Matter 中的 `draft` 屬性判斷該篇文章是否為草稿, 預設為非草稿.

``` markdown
---
title: "從 hexo 到 hugo"
date: 2020-10-06T15:08:05+08:00
draft: true
...
---
```

兩者設計各有優缺, 個人喜歡 hugo 的方式, 
文章編輯完直接改設定再發佈即可, 不需要搬移檔案, 操作比較直觀.

### Front Matter ###

hexo 對 Front Matter 寬容度較高, 不一定要包在兩個 `---` 之間, 甚至可以不需要 `---`.  
而 hugo 的 Front Matter 則必須包含在 `---` 之間, 否則會出錯.

``` markdown
---
title: "從 hexo 到 hugo"
date: 2020-10-06T15:08:05+08:00
categories: ["hugo"]
tags: ["hugo", "tutorial"]
---
```

這部份需一一確認文章修改, 或是自行透過熟悉的工具批次比對後修正.

### Tag & shortcodes ###

使用 Markdown 寫文章好處是相容性較高, 使用常見格式在文章主體幾乎都可以不需修改, 直接產生.
但各個 Blog 系統還是有各自的擴充格式, 這部份可能必須手動一一確認修正. 
或參考 [官方 Migrate to Hugo](https://gohugo.io/tools/migrations/) 裡面一些轉換工具的介紹.

Hexo Tag plugin 擴充指令對應到的是 Hugo shortcodes, 都是可以透過簡單指令來插入複雜格式的方法.
格式上 Hexo 的擴充 Tag 格式和 Jekyll 一樣, 格式為 `{% tag_name %}`,
而 Hugo shortcodes 格式則為 `{ {< shortcode_name >} }`

格式轉換上可使用 [ConvertToHugo](https://github.com/coderzh/ConvertToHugo) 來轉換,
若有 Hugo 或選用的主題所沒有的 shortcode, 只能自己手動處理. 
官網有 [Shortcodes](https://gohugo.io/content-management/shortcodes/) 的完整介紹與編寫範例.
一些常用的 shortcode 也容易在網路上找到範例.
把自行編寫或網路下載的 shortcodes 放在 `layouts/shortcodes` 即可.

[kywk/hugo-shortcodes](https://github.com/kywk/hugo-shortcodes) 這專案是個人使用的 shortcodes, 會陸續把 Hexo 內建的 Tag 都移植到 Hugo shortcodes.



預覽
----

-   本地預覽
    ``` shell
    $ hugo server
    ```
    ![](https://lh3.googleusercontent.com/pw/ACtC-3eU2qvxANnWdmA058HjT6_iu-EPvodcn2aG2wPm64F72SZl7-Z41ZbcZkzKmshLIsettRm0GImbyIvRNeOQlXqYX5T38DUHinH1fEZI8MVSoZ3A3Om7o-cWvlxJOzZkA0nD1TjaCYmgaWdi-S1b0ftLOw=w559-h307-no?authuser=0)

    會產生靜態頁面並產生預覽內容, 可以在瀏覽器經由 http://localhost:1313/ 查看,
    且支援熱部署 (livereload), 修改文章或是 CSS 之類的東西時是不用重啟的.

    若檢視部落格內容無誤, 即可產生靜態頁面.

-   產生靜態頁面: 在根目錄下指令
    ``` shell
    $ hugo
    ```
    ![](https://lh3.googleusercontent.com/pw/ACtC-3f6yJMe20dD8OCd3i7lPL30DC16KZ0xS49mlXtMUIZ-BKqlE7gQFBClXb1RT2l9Rptcb_6QjzztyFsC8tqb5oscP8bFTs0WYhqL2cmOTlSeENKW0RnhOfCdst2TuAZUHA6xLkxbj9qEyuLX88vM-hVnUg=w219-h209-no?authuser=0)

    所生成的部落格靜態頁面放在 `public` 資料夾下, 可以直接上傳發佈.



發佈到 github.io
---------------

Hugo 沒有像 Hexo 內建 deploy 的指令, 需自行把檔案上傳網站空間.  

我使用 [GitHub Pages](https://pages.github.com/) 來放置個人網站.  
以下說明假設對 git/GitHub 已有一定程度熟悉, 關於 git 如何安裝, 相關指令細節不介紹.

### 建立 github.io repository ##

GitHub Pages 可以建立個人網站或專案網站, 
基本設置發布流程皆相同, 差別在於 respository 名稱和預設 branch 不同. 
詳盡的說明與步驟在 [Creating a GitHub Pages site - GitHub Docs](https://docs.github.com/en/free-pro-team@latest/github/working-with-github-pages/creating-a-github-pages-site)

__個人網站__

個人網站的網址為 `https://username.github.io`.

大部分相關 Hugo 教學文章都是使用個人網站來介紹, 文章資源相當多.
設定步驟亦相當簡單, 在 GitHub 上新建一個 `username.github.io` 的專案, 
將該專案 clone 到 Hugo 站台資料夾內, 並改名為 public 即可.

``` shell
$ cd $hugo
$ git clone https://github.com/username/username.github.io public
```

__專案網站__

GitHub 允許使用者為每個專案建置該專案網站, 網址為 `https://username.github.io/project`.

GitHub Pages 專案網站預設是使用專案倉儲中的 `gh-pages` 分支. 
直接在既有的的專案中, 新增 `gh-pages` branch 即可.

若想使用其他分支當作網站資料, 可到 GitHub 上去指定 GitHub Pages 所要使用的 branch 名稱和資料夾.

![](https://lh3.googleusercontent.com/pw/ACtC-3eDlmDBVj0CEUuHX1_JPkrxo1Tf_b6UDrFPEu1yWPA6HBhd86DqdS0D8h9aT44Hlgl2C6lztM0ngPo2OihyWatPbNFw-qT7wHyR4NEMDSPN9v6Hktt8va0YeQmvA-kJiMTB3XQ9E-dvTZu_awgnQX-cFg=w589-h277-no?authuser=0)

### 發布 script ##

Hugo 生成的靜態網站文件存放在 `public` 資料夾, 
把該資料夾內所有檔案加入 git, 並 push 到 GitHub 就完成發佈了.  

寫了簡單的 script 來完成上述發佈動作.

``` bash deploy.sh
hugo
cd public
git add .
git commit -m "Updated: `date +'%Y-%m-%d %H:%M:%S'`"
git push -f
cd ..
```



後記
----

除了使用 Hugo 重新開始部落格外, 預計完成兩個 Hugo 主題開發: __fuday__ 及 __rholi__.  
及, 可能的話, 寫個 hexo2hugo 或 hexo2netlify 的主題轉換產生器.

開發歷程筆記和紀錄會整理更新在本部落格, 完成的發表亦然.  
回到寫 blog 的生活, 有種充實感, 比較有目標完成某件事.
