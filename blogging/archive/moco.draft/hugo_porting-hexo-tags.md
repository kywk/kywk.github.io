---
title: "Porting Hexo tags to Hugo shortcode"
date: 2020-10-24T17:05:52+08:00
images: []
categories: ["hugo"]
tags: ["hugo", "tutorial"]
---

Hexo 標籤
---------

Hexo 標籤外掛是用於在文章中快速插入特定內容的外掛, 有幾種方式擴充:

1.  __內建標籤:__  
    Hexo [內建標籤]((https://hexo.io/zh-tw/docs/tag-plugins))有常用的 Block Quote, Gist, iframe, Youtube, ...
    包含 Markdown 不支援但常用的 HTML 語法, 影音嵌入, 程式片斷嵌入...等.  

    文章使用內建標籤的相容性最高, 不容易因更換主題而導致生成錯誤的情況.
    但不同 Hexo 版本的內建標籤還是可能不同而發生相容性問題.

2.  __標籤外掛:__  
    Hexo 有強大的[外掛系統](https://hexo.io/zh-tw/docs/plugins), 能輕鬆擴展功能而不用修改核心模組的原始碼.  
    標籤亦可透過外掛擴充, [如何製作標籤外掛](https://hexo.io/zh-tw/api/tag.html) 官方有詳細說明.  
    [Plugins | Hexo](https://hexo.io/plugins/) 是官方收集的外掛列表, `hexo-tag` 開頭為標籤外掛.
    通常透過 `npm install PACKAGE_NAME` 來安裝外掛.

    標籤外掛安裝在站台根目錄, 文章使用外掛的標籤和內建標籤一樣是不分主題皆可使用, 
    通常和 Hexo 版本無關, 不會因 Hexo 升版而出現相容問題.

3.  __主題支援:__  
    Hexo 主題可以提供該主題內建支援的標籤, 主題內透過外掛的方式提供擴充的標籤提供文章使用.  
    主題支援的標籤產生的網頁風格型態通常比較美觀. 但更換主題時可能會不支援的問題.



Hugo shortcode
--------------

Hugo shortcode 和 Hexo tags 很像, 也有[內建](https://gohugo.io/content-management/shortcodes/) / 站台外掛 / 主題支援三種方式.
官方有編寫 shortcode 教學 - [Create Your Own Shortcodes | Hugo](https://gohugo.io/templates/shortcode-templates/).

而 Hugo 安裝 shortcode 站台外掛比 Hexo 簡單些, 把相關檔案放在站台 `layouts/shortcodes` 即可, 
不像 Hexo 需透過 `npm install package`.

## kywk/hugo-shortcodes ###

[kywk/hugo-shortcodes](https://github.com/kywk/hugo-shortcodes), 一些 Hexo 內建或常見的 Tag 移植到 Hugo shortcodes 的收集.

### Block Quote ###

在文章中插入引言，可包含作者、來源和標題。

-   Normal quote:
    ```
    {{</* blockquote */>}}
      This is a simple quote.
    {{</* /blockquote */>}}
    ```

    {{< blockquote >}}
      This is a simple quote.
    {{< /blockquote >}}

-   Quote with author
    ```
    {{</* blockquote author="Author2" */>}}
      This is a quote with only an Author named Author2.
    {{</* /blockquote */>}}
    ```

    {{< blockquote author="Author2" >}}
      This is a quote with only an Author named Author2.
    {{< /blockquote >}}

-   Quote with author and source
    ```
    {{</* blockquote author="Author3" source="Source" */>}}
      This is a quote from Author3 and source "source."
    {{</* /blockquote */>}}
    ```

    {{< blockquote author="Author3" source="Source" >}}
      This is a quote from Author3 and source "source."
    {{< /blockquote >}}

-   Quote with author and link
    ```
    {{</* blockquote author="Author4" link="https://www.google.com" */>}}
      This is a quote from Author4 and links to https://www.google.com.
    {{</* /blockquote */>}}
    ```

    {{< blockquote author="Author4" link="https://www.google.com" >}}
      This is a quote from Author4 and links to https://www.google.com.
    {{< /blockquote >}}

-   Quote with author, link and title
    ```
    {{</* blockquote author="Author5" link="https://www.google.com" title="Google" */>}}
      This is a quote from Author5 and links to https://www.google.com with title "Google."
    {{</* /blockquote */>}}
    ```

    {{< blockquote author="Author5" link="https://www.google.com" title="Google" >}}
      This is a quote from Author5 and links to https://www.google.com with title "Google."
    {{< /blockquote >}}

-   Quote with author and a link longer than 32 characters, string is first cut at 32 characters then everything after the last forward slash is removed
    ```
    {{</* blockquote author="Author6" link="https://twitter.com/CryptoGangsta/status/716427930126196737" */>}}
      This is a quote from Author5 and links to https://twitter.com/CryptoGangsta/status/716427930126196737 which is longer than 32 characters.
      <br>And this is a new line in the quote with the HTML br tag.
    {{</* /blockquote */>}}
    ```

    {{< blockquote author="Author6" link="https://twitter.com/CryptoGangsta/status/716427930126196737" >}}
      This is a quote from Author5 and links to https://twitter.com/CryptoGangsta/status/716427930126196737 which is longer than 32 characters.
      <br>And this is a new line in the quote with the HTML br tag.
    {{< /blockquote >}}

-   Test from the Octopress blockquote page at: http://octopress.org/docs/plugins/blockquote/  
    ```
    {{</* blockquote author="@allanbranch" link="https://twitter.com/allanbranch/status/90766146063712256" */>}}
      Over the past 24 hours I've been reflecting on my life & I've realized only one thing. I need a medieval battle axe.
    {{</* /blockquote */>}}
    ```

    {{< blockquote author="@allanbranch" link="https://twitter.com/allanbranch/status/90766146063712256" >}}
      Over the past 24 hours I've been reflecting on my life & I've realized only one thing. I need a medieval battle axe.
    {{< /blockquote >}}

_2020.10.24 Hexo blockquote 參數部分陸續補齊_

### Obsidian (Invisible Block) ###

如[從 Hexo 到 Hugo](https://kywk.github.io/moco/posts/hugo/from-hexo-to-hugo/)
中所提及的, 我的 blog 資料夾是放在 Obsidian Vault 中, 
為了可以正常使用 Obsidian 標籤, 區塊連結, 反向連結等功能, 文章中穿插了不少 Obsidian 的語法.
這些語法雖不會造成 Hugo 錯誤, 但部落格文章中有奇怪的語法總是怪.

做了個 Obsidian shortcode, 區塊內容將放在 `display:disable` 的 div block 中.
只要把 Obsidian 的語法標示放在 Obsidian 區塊中, 
既可享受 Obsidian 帶來的便利功能, 也不影響部落格的閱讀.

```
{{</* obsidian */>}}
  Obsidian tag, link, block id, ... etc here.
{{</* /obsidian */>}}
```

{{< obsidian >}}
  Obsidian tag, link, block id, ... etc here.
{{< /obsidian >}}

