---
title: 10 JavaScript Projects
tags: [web, js, bootcamp]
---

# 10 JavaScript Projects - Coding Challenge

看到 [10 JavaScript Projects in 10 Hours - Coding Challenge](https://www.youtube.com/watch?v=dtKciwk_si4) 影片,
對於很久沒重頭寫 Web 端純 JavaScript code 來說, 覺得是個不錯的練習, 故重造輪子.

<!--<YouTube youTubeId="dtKciwk_si4" />-->


Countdown Timer
---------------

-   Design: [https://uidesigndaily.com/posts/sketch-countdown-timer-day-876](https://uidesigndaily.com/posts/sketch-countdown-timer-day-876)
-   future date
-   timer
-   [Code](#)

### note ###

-   影片中的新年日期常數寫死, 我改用當前日期去計算下一個新年日期.
-   影片中倒數的小時, 分, 秒都是用當前時間到新年日期的秒數計算得知.
    我僅計算當下時間到隔天所剩餘時間.
    理論上計算複雜度會比影片的計算少, 實際上仍需跑 benchmark 才能確定.
    也許 `Date.getHours()` / `Date.getMinutes()` / `Date.getSeconds()`...
    等內建函數效能比想像中慢, 自己運算可能更快也說不定.


Quiz App
--------

-   Design: [https://uidesigndaily.com/posts/sketch-questionnaire-choice-submit-day-924](https://uidesigndaily.com/posts/sketch-questionnaire-choice-submit-day-924)
-   questions from obj
-   select answer
-   at the end show score
-   [Code](#)

### note ###

-   題庫來源透過 [Open Trivia DB: Free to use, user-contributed trivia question database.](https://opentdb.com/) API 取得.
-   在抓取 Radio input 時, 透過 `document.getElementsByName()` 取得使用者選擇的答案.
    DOM 結構上和影片中減少一個ˊ class 屬性.
    但不確定 `document.getElementsByName()` 和 `document.querySelectAll()` 實際效能是否有差異.


Recipe App
----------

-   Design: [https://uidesigndaily.com/posts/sketch-recipe-app-food-mobile-day-615](https://uidesigndaily.com/posts/sketch-recipe-app-food-mobile-day-615)
-   recipe info on click
-   fav recipe (w/ localStorage)
-   [Code](#)

### note ###

-   居然有 [public-apis](https://github.com/public-apis/public-apis),
    對於開發取得練習資源真是太方便了.
-   把食譜改成酒譜 App, 比較符合我的個性. :p



Summary
-------

-   影片中先定下題目, 再去 [UI Design Daily](https://uidesigndaily.com/) 找適當的版面來進行,
    從無到有完整刻出一個個 WebApp, 對於有些基本基礎, 但不知如何找題目進行練習這個找題目的過程是很有幫助的.
-   不透過框架進行前端開發真的太久, 一些 CSS 語法也是看影片才知道可以這樣使用.
    UI Framework 是兩面刀刃, 加速開發之餘卻也減低了對底層基礎的熟悉.
-   影片中對於版面 CSS 和 UI 設計的一致性真的挺要求的, 是個認真的前端工程師.
    自己對於版面就容易得過且過.
-   看了影片後的實作, 排版上受影片影響很大, 而程式架構還比較維持自己想法進行.
-   VSCode + Emmt 很方便, 要更加熟悉一下一些使用 tips.



See Also
--------

影片中用到許多前端設計的資源網站. 整理如下:

-   [UI Design Daily | Weekly FREE UI resources straight to your inbox](https://uidesigndaily.com/)
-   [Beautiful Free Images & Pictures | Unsplash](https://unsplash.com/)
-   [Gradient Background Colors - Eggradients.com](https://www.eggradients.com/)
-   [CSS Gradient — Generator, Maker, and Background](https://cssgradient.io/)
-   [Palettes | Flat UI Colors 🎨 280 handpicked colors ready for COPY & PASTE](https://flatuicolors.com/)
-   [public-apis/public-apis: A collective list of free APIs](https://github.com/public-apis/public-apis)
-   [cdnjs - The #1 free and open source CDN built to make life easier for developers](https://cdnjs.com/)
-   [Font Awesome](https://fontawesome.com/)
-   [Heroicons](https://heroicons.com/)

其他類似的前端 Coding Challenge:

-   [10 JavaScript Projects in 1 Hour - Coding Challenge 🔥 - YouTube](https://www.youtube.com/watch?v=8GPPJpiLqHk)
