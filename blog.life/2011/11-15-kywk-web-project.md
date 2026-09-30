---
title: "kywk-web project"
authors: kywk
tags:
  - Misc
  - kywk
hide_table_of_contents: true
---

# kywk-web project

<!--truncate-->

現在這部落格版型用了很久，很喜歡極精簡的畫面。但長期使用與調整下來，卻慢慢失去原本精簡的感覺。文字大小、字型、縮排、細部排版的不一致，都讓畫面看來複雜了點，而逐步增加的樣式也讓 CSS 本身變得複雜難維護。  

  

日前一眼就愛上 [bootstrap from twitter](http://twitter.github.com/bootstrap/)。bootstrap 是個定義 Web Layout 的 CSS，考慮了大部份排版需要的樣式並一貫化。實際規劃 Web Layout 時僅需使用簡單的 class 宣告，即可完成既富有彈性變化，外觀感覺又一致的 HTML Layout。  

  

花了些時間把 Antiline 樣板由 bootstrap 重新架構、加上 HTML5 語意標籤，並將 blogger template 中不會用到的 includes 全拿掉。除了畫面看來精簡外，CSS 樣板本身也相當精簡！日後要加功能或維護都比較容易。  

  

原則上除了逐步增加支援 [schema.org 的樣式](http://endroid.blogspot.com/2011/11/schema-tag-for-blogging.html)　外，這個版型不會再大變動。在 [Reeder for Chrome](http://reederforchrome.tumblr.com/) 裡，看到他對 A Hover 的反白樣式，覺得相當喜歡，也將連結的 Mouse Over 改成反白按鈕。  

  

看起來簡單的修改，卻花了點時間搞。除了 a:link, a:visited, a:hover, a:active 的順序沒注意外，原有的 CSS 結構有些混亂，也都一併修正。想到 [kywk-life](http://kywk.blogspot.com/) [endroid](http://endroid.blogspot.com/) 都使用相同的樣式，就也把樣式表弄成獨立的 CSS，往後僅須修改一處即可。  

  

修改過後的 CSS 跟 template xml 都放在 [kywk-blog](http://code.google.com/p/kywk-web/)。  

這 Project 僅拿來放個人 blog/web 所需要外部引用的 JS, CSS 檔，歡迎提供意見與建議！
