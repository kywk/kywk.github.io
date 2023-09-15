---
title: GitHub Copilot GA
description: 2022.06.24 GitHub Copilot GA
authors: kywk
tags: [github, ai, develop]
image: https://i.imgur.com/mErPwqL.png
hide_table_of_contents: false
---

GitHub Copilot GA
=================

GitHub Copilot
--------------

這幾天開發者社群最大的新聞應該是 GitHub [公告正式開放](https://github.blog/2022-06-21-github-copilot-is-generally-available-to-all-developers/) 
[GitHub Copilot](https://github.com/features/copilot/).
Hacker News 上也討論的沸沸洋洋: [GitHub Copilot is generally available](https://news.ycombinator.com/item?id=31825742)

價錢也出來了，US$10/mo 或是 US$100/year：

> We’re making GitHub Copilot, an AI pair programmer that suggests code in your editor, generally available to all developers for $10 USD/month or $100 USD/year. It will also be free to use for verified students and maintainers of popular open source projects.

書寫程式時, GitHub Copilot AI 會即時跑出建議的修改或是下一行的編寫, 建議的資訊,
不單是幾個字或一行程式, GitHub Copilot 會以最完整的解決方法來協助開發者解決問題.
無論是提供樣板程式碼, 整個單元測試, 甚至是更複雜的演算法等。


Tabnine
-------

早些年前, [Tabnine](https://www.tabnine.com/) 就提供了利用 AI 分析程式碼的自動完成工具.
傳統 IDE 的自動補完, 大多是分析程式碼中的變數, 物件屬性, 函式等, 提供對應的自動完成建議.

而 Tabnine 除了程式庫中的既有程式碼等分析資料外,
也會利用 AI 訓練分析的結果, 提供開發者可能會需要的自動補完推薦. 
長期使用下來, 覺得 Tabnine 確實對開發上是有幫助的.

但 Tabnine 主要僅提供自動完成的推薦, 開發上還是一行行自己輸入.
而 GitHub Copilot 提供更多程式片段, 可能是一整個功能區塊程式樣板等.

可以理解 GitHub Copilot 帶來的便利.
畢竟過往經驗中, 有相當程度功能區塊其實都非常雷同, 
尤其是像 CRUD / Error Handling / unit test / ... 等程式片段.
很多時候開發上確實是複製貼上到不同專案而已.


Amazon CodeWhisperer
--------------------

無獨有偶地, 近日亞馬遜在 re:Mars 公布了一款名為 CodeWhisperer 的自動寫程式輔助工具的預覽版本.

亞馬遜的 CodeWhisperer 是一種能協助軟體工程師擁有更高寫程式效率的 AI 工具,
根據亞馬遜的說法，CodeWhisperer 將不斷檢查工程師所寫的程式碼, 並且提供正確的建議. 


Issues
------

### license ###

目前這個服務被著重討論的問題, 第一個是 license 問題，
Hacker News 上有人提到有些程式碼的授權是有感染性的 GPL 類的,
若 GitHub Copilot 自動完成的程式片段引用了這些程式碼, 是否違反 GPL 規範,
這是個全新的問題, 在法院上還沒有被戰過.

### code quality ###

另一個疑慮是, 學術界針對 Copilot 的[研究論文](https://arxiv.org/pdf/2108.09293.pdf)指出,
在 1,689 個使用 Copilot 建議的程式中, 有 40% 的程式生成的程式碼具有已知的弱點.
而另一篇論文則指出 Github Copilot 事實上加速了劣質程式碼的產生.

所以類似工具的使用, 仍然很依靠工程師對程式碼掌握的程度. 
否則程式產出快速, 但後續除錯的功夫, 可能事倍功半.
(也許之後會有 AI debug 服務吧, 笑)


References
----------

-   [工程師歡呼吧！寫程式 AI 神器 GitHub Copilot 月租費只要 120 | TechOrange 科技報橘](https://buzzorange.com/techorange/2022/06/22/github-copilot-ai-coding/)
    | [亞馬遜也推出了 AI 寫程式助手 CodeWhisperer，和 Github Copilot 有何不同？](https://buzzorange.com/techorange/2022/06/24/amazon-codewhisperer/)
    | [工程師殺手級工具！一秒自動補齊後續程式碼，還支援 23 種程式語言](https://buzzorange.com/techorange/2019/08/02/nice-coding-tool/)
-   [工程師可以偷懶了？Github可幫你寫程式的AI輔助工具Copilot上線，月費只要10美元 | T客邦](https://www.techbang.com/posts/97357-github-launches-ai-tool-copilot-10-a-month-to-help-developers)
-   [GitHub Copilot 宣佈 GA – Gea-Suan Lin's BLOG](https://blog.gslin.org/archives/2022/06/23/10751/github-copilot-%e5%ae%a3%e4%bd%88-ga/)
    | [AWS 也推出了 GitHub Copilot 的競爭對手 Amazon CodeWhisperer](https://blog.gslin.org/archives/2022/06/24/10755/aws-%e4%b9%9f%e6%8e%a8%e5%87%ba%e4%ba%86-github-copilot-%e7%9a%84%e7%ab%b6%e7%88%ad%e5%b0%8d%e6%89%8b-amazon-codewhisperer/)
    | [測試 Neovim + GitHub Copilot](https://blog.gslin.org/archives/2022/06/24/10756/%e6%b8%ac%e8%a9%a6-neovim-github-copilot/)
-   [GitLab與Tabnine合作向開發者提供AI程式碼完成功能 | iThome](https://www.ithome.com.tw/news/149710)
