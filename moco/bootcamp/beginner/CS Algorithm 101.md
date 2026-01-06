---
title: '[ALG101] 先別急著寫 Leetcode'
description: '[ALG101] 先別急著寫 Leetcode'
tags:
  - Bootcamp
  - Beginner
  - CS
  - LeetCode
date_created: 2022-05-11T16:00:00.000Z
image: >-
  https://lh3.googleusercontent.com/pw/AL9nZEUA9Ifvd5Z8SXDWkeVB6AC4MPGwnXaL6kBXNPoXwOQQ2jOcZ1Jw_0p8TKK8C3ZX0e67_FOY15eDrm7aaXSQJcKtoUzC80SAQEHsaBy6qS2AqNNs5VUFNXBKm439y_1wkvmDl-PnL8ReojnIumNlEvOXBg=w800-no?authuser=0
slug: /bootcamp/beginner/cs-algorithm-101/
---

在準備刷題找資源時, 看到了 [[ALG101] 先別急著寫 leetcode | Lidemy 鋰學院](https://lidemy.com/p/alg101-leetcode). 
這是胡立製作的一系列免費課程, 談刷題之前有些技能是要學會的, 不然會大幅影響刷題所獲得的經驗值ㄡ.

看完課程簡介和程度測驗後, 程度測驗大部分的題目都可以順利完成, 程度上來說是不必要上這課程的.
但覺得已經好久沒靜下來慢慢消化一套課程, 是個收斂心情的練習. 
所以還是決定把課程走完, 練習題一一完成, 再刷題.


## Unit0 課程簡介 ##

-   確認這堂課是符合自己的需求
-   說明課程進行方式
-   學習使用 [LidemyOJ (LIOJ)](https://oj.lidemy.com/) 
-   Project 0:
    -   [LIOJ1001: A+B](https://oj.lidemy.com/problem/1001) 
        [code](https://github.com/kywk/leetcode/blob/main/node/alg101/lioj1001.js) 
    -   [LIOB1002: 數字比大小](https://oj.lidemy.com/problem/1002) 
        [code](https://github.com/kywk/leetcode/blob/main/node/alg101/lioj1002.js)

這單元內容其實和課堂簡介差不多. 
令我感興趣的是練習題的題目說明, 關於輸入的正整數, 定義很嚴謹. 
是個我很容易覺得一般人都會知道, 不會花心力特別定義的地方. 也是我最容易疏忽的地方.


## Unit1 要學好程式，從不要寫程式開始 ##

-   對於程式 / 題目
    -   有些人用想的就解的開:
        -   解開效率很好
        -   解開了但很慢
        -   想到了，但寫不出來
    -   另一些人想不出來解法 (其實和想得到卻寫不出來一樣)
-   pseudo code: 用抽象概念來表示想法, 不拘泥於程式語言
    -   思考解法, 不寫任何程式碼
    -   把想法寫成 pseudo code
        -   一個個可執行步驟
        -   跳轉重複步驟
    -   轉換 pseudo code 為程式碼
-   [簡單的 FizzBuzz 藏有 深度(google 面試題)](https://bear-1111.medium.com/f5e66e3a97be)


## Unit2：寫程式之前，先學會「看程式」 ##

-   看懂程式碼, 學會像電腦一樣思考
-   把程式執行每個步驟順序寫下, 一步步驗證是否和自己想法一致
-   善用 debugger 工具, 觀察變數變化和執行流程等, 驗證程式執行和自己想法是否相同, 

在國高中參賽時, 很常進行類似這單元的思考練習. 
令我印象深刻的倒是課程實戰練習的講解部份, 敘述相當詳盡. 
是我很沒耐心去落實的動作, 該好好看齊.


## Unit3：寫程式前的最後一步：看懂題目 ##

-   注意題目要求, 弄清題意, 白話文理解題目, 小心陷阱
-   看清楚題目輸入輸出的方式
-   最重要的小事: 輸入範圍
    -   不同範圍 = 不同限制
    -   實務上, 範圍決定方法
-   Example:
    -   [LIOJ1008: 幾個水桶](https://oj.lidemy.com/problem/1008) 
        [code](https://github.com/kywk/leetcode/blob/main/node/alg101/lioj1008.js)  
        Tips: [每日一面 - 求與數字最接近的 2 的 N 次方 - 人人焦點](https://ppfocus.com/0/di33683f2.html)
    -   [LIOJ1004: 聯誼順序比大小](https://oj.lidemy.com/problem/1004)
        [code](https://github.com/kywk/leetcode/blob/main/node/alg101/lioj1004.js)  
        Tips: [BigInt - JavaScript | MDN](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/BigInt)
-   Project 3:
    -   [LIOJ 1010：靈魂伴侶](https://oj.lidemy.com/problem/1010)
        [code](https://github.com/kywk/leetcode/blob/main/node/alg101/lioj1010.js)
    -   [LIOJ 1015：音速小子](https://oj.lidemy.com/problem/1015)
        [code](https://github.com/kywk/leetcode/blob/main/node/alg101/lioj1015.js)
    -   [LIOJ 1017：貪婪的小偷](https://oj.lidemy.com/problem/1017)
        [code](https://github.com/kywk/leetcode/blob/main/node/alg101/lioj1017.js)  
        -   [javascript - How to sort an array of integers correctly - Stack Overflow](https://stackoverflow.com/questions/1063007/how-to-sort-an-array-of-integers-correctly)  
        -   [javascript - How to find the sum of an array of numbers - Stack Overflow](https://stackoverflow.com/questions/1230233/how-to-find-the-sum-of-an-array-of-numbers)
        -   [Array.prototype.splice() - JavaScript | MDN](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Array/splice)

認真該打屁股, 這個單元主要談需仔細理解程式規格書, 也就是細心看題目和輸入限制等.
因此範例作業題目相當簡單, 重心在細心處理輸入部份.  
而自己在範例和作業時犯的錯誤. 還是粗心下未好好閱讀題目限制等. 
這點無論刷題或日後工作, 都是該避免的. 


## Unit4：主角總是最後才登場：寫程式囉 ##

-   把虛擬碼轉換為程式碼過程中, 還不知如何處理的功能區塊, 
    先切割問題, 把功能拆出來為獨立函式, 再逐項實作獨立函式. 
    這樣結構明確, 功能清晰. 
    可以幫助解題時腦袋的思緒更清楚, 日後調整與最佳化函式實作也比較容易.
-   把大問題變成小問題, 把題目簡化，再持續增加難度. 
    遇到問題時先用最簡單, 最基本的條件去解, 再慢慢延伸, 會更容易上手.
-   Example:
    -   [LIOJ 1020：判斷質數](https://oj.lidemy.com/problem/1020)
        [code](https://github.com/kywk/leetcode/blob/main/node/alg101/lioj1020.js)
    -   [LIOJ 1021: 好多星星](https://oj.lidemy.com/problem/1021)
        [code](https://github.com/kywk/leetcode/blob/main/node/alg101/lioj1021.js)
    -   [LIOJ 1022: 印出金字塔](https://oj.lidemy.com/problem/1022)
        [code](https://github.com/kywk/leetcode/blob/main/node/alg101/lioj1022.js)
-   Project 4:   
    -   [LIOJ 1023: 印出聖誕樹](https://oj.lidemy.com/problem/1023)
        [code](https://github.com/kywk/leetcode/blob/main/node/alg101/lioj1023.js)
    -   [LIOJ 1024: NM 乘法表](https://oj.lidemy.com/problem/1024)
        [code](https://github.com/kywk/leetcode/blob/main/node/alg101/lioj1024.js)
    -   [LIOJ 1025：水仙花數](https://oj.lidemy.com/problem/1025)
        [code](https://github.com/kywk/leetcode/blob/main/node/alg101/lioj1025.js)

終究本課程中的題目對我還是太簡單, 在練習耐心聽課和一一解題之餘, 
同時也練習著從數學 / 語言特性 / ...等地方著手, 如何寫出更有效率的程式.

而有些題目拆成功能函式後, 能做的最佳化反而有限. 
以 1021 這題來說, 其實只需一個迴圈就可以解出, 但拆解後, 反而要雙重迴圈才能解.
Global optimization 和 Local optimization 的取捨, 政治語言來說, 水很深.
回頭看這些基本題目, 還是有收穫的.


## Unit5：經典題目解解看 ##

-   不使用內建函式解題
-   Example:
    -   [LIOJ 1026：判斷等比數列](https://oj.lidemy.com/problem/1026)
        [code](https://github.com/kywk/leetcode/blob/main/node/alg101/lioj1026.js)
    -   [LIOJ 1027：信用卡號驗證](https://oj.lidemy.com/problem/1027)
        [code](https://github.com/kywk/leetcode/blob/main/node/alg101/lioj1027.js)
    -   [LIOJ 1028：生命靈數](https://oj.lidemy.com/problem/1028)
        [code](https://github.com/kywk/leetcode/blob/main/node/alg101/lioj1028.js)
    -   [LIOJ 1029：加減乘除](https://oj.lidemy.com/problem/1029)
        [code](https://github.com/kywk/leetcode/blob/main/node/alg101/lioj1029.js)
    -   [LIOJ 1030：判斷迴文](https://oj.lidemy.com/problem/1030)
        [code](https://github.com/kywk/leetcode/blob/main/node/alg101/lioj1030.js)
    -   [LIOJ 1031：完全平方和](https://oj.lidemy.com/problem/1031)
        [code](https://github.com/kywk/leetcode/blob/main/node/alg101/lioj1031.js)  
    -   [LIOJ 1032：平面距離計算](https://oj.lidemy.com/problem/1032)
        [code](https://github.com/kywk/leetcode/blob/main/node/alg101/lioj1032.js)  
        Tips: [在 JavaScript 中將數字四捨五入到小數點後兩位 | D棧 - Delft Stack](https://www.delftstack.com/zh-tw/howto/javascript/javascript-round-to-2-decimal-places/)
    -   [LIOJ 1033：最近點對](https://oj.lidemy.com/problem/1033)
        [code](https://github.com/kywk/leetcode/blob/main/node/alg101/lioj1033.js)  
        _輸出的時候請先輸出 x 比較小的那個點，若是 x 相同，請先輸出 y 比較小的那個點_
    -   [LIOJ 1034：凱薩加密](https://oj.lidemy.com/problem/1034)
        [code](https://github.com/kywk/leetcode/blob/main/node/alg101/lioj1034.js)
    -   [LIOJ 1046：圈圈叉叉](https://oj.lidemy.com/problem/1046)
        [code](https://github.com/kywk/leetcode/blob/main/node/alg101/lioj1046.js)

題型太過簡單直覺, 解題中出現失去耐心及粗心情況. 
培養耐心和細心, 是所以花時間作初學者課程訓練的主因, 這點還很需加強.

有趣的是, 實務經驗愈多, 對題目的想法越有所不同.
以 OOXX 來說, 最早會暴力法列出八個判斷式, 後來會想辦法用迴圈解,
現在回頭解, 反而選擇報立法陳列. 貪圖他所節省下來可能積少成多的效能.


## Unit6：內建函式做做看 ##

-   試著實作內建函數, 進而了解內建函式
-   Project 6:
    -   [LIOJ 1036：Array reverse](https://oj.lidemy.com/problem/1036)
        [code](https://github.com/kywk/leetcode/blob/main/node/alg101/lioj1036.js)
    -   [LIOJ 1037：Array filter](https://oj.lidemy.com/problem/1037)
        [code](https://github.com/kywk/leetcode/blob/main/node/alg101/lioj1037.js)
    -   [LIOJ 1038：Array indexOf](https://oj.lidemy.com/problem/1038)
        [code](https://github.com/kywk/leetcode/blob/main/node/alg101/lioj1038.js)
    -   [LIOJ 1039：Array fill](https://oj.lidemy.com/problem/1039)
        [code](https://github.com/kywk/leetcode/blob/main/node/alg101/lioj1039.js)
    -   [LIOJ 1040：Array join](https://oj.lidemy.com/problem/1040)
        [code](https://github.com/kywk/leetcode/blob/main/node/alg101/lioj1040.js)
    -   [LIOJ 1041：String trim](https://oj.lidemy.com/problem/1041)
        [code](https://github.com/kywk/leetcode/blob/main/node/alg101/lioj1041.js)
    -   [LIOJ 1042：String toLowerCase](https://oj.lidemy.com/problem/1042)
        [code](https://github.com/kywk/leetcode/blob/main/node/alg101/lioj1042.js)
    -   [LIOJ 1043：String endsWith](https://oj.lidemy.com/problem/1043)
        [code](https://github.com/kywk/leetcode/blob/main/node/alg101/lioj1043.js)
    -   [LIOJ 1044：String padEnd](https://oj.lidemy.com/problem/1044)
        [code](https://github.com/kywk/leetcode/blob/main/node/alg101/lioj1044.js)
    -   [LIOJ 1045：String slice](https://oj.lidemy.com/problem/1045)
        [code](https://github.com/kywk/leetcode/blob/main/node/alg101/lioj1045.js)

這單元所選的內建函數練習題要實作的話都很簡單, 
當然實際上這些內建函式功能還比單元練習複雜得多.
而內建函式實作上會有斷地更新, 在實務需求積累的經驗調整改善.
特別對 JavaScript 來說, 內建函式和自己實作, 
還會有 Native libary 和 JIT 的效能差異.
了解並有能力自己實作內建函式的功能是一回事, 工作實務應該還是使用內建函式居多.


## Unit7：國中題目大挑戰 ##

-   解 [NPSC](https://contest.cc.ntu.edu.tw/npsc2019/) 類似的題目, 
    題型上是這整個課程裡面最有趣的單元.  
    [寫給國中生的NPSC解題思維](https://www.cc.ntu.edu.tw/chinese/epaper/0047/20181220_4706.html)
-   Example:    
-   Project 7:
    -   [LIOJ1008: 幾個水桶](https://oj.lidemy.com/problem/1008) 
        [code](https://github.com/kywk/leetcode/blob/main/node/alg101/lioj1008.js)
    -   [LIOJ 1009：Yo！倒著唸！](https://oj.lidemy.com/problem/1009) 
        [code](https://github.com/kywk/leetcode/blob/main/node/alg101/lioj1009.js)
    -   [LIOJ 1013：搭電梯](https://oj.lidemy.com/problem/1013) 
        [code](https://github.com/kywk/leetcode/blob/main/node/alg101/lioj1013.js)  
        Fibonacci numbers:
        -   [費波那契數 - 維基百科，自由的百科全書](https://zh.m.wikipedia.org/zh-tw/%E6%96%90%E6%B3%A2%E9%82%A3%E5%A5%91%E6%95%B0)  
        -   [Program for Fibonacci numbers - GeeksforGeeks](https://www.geeksforgeeks.org/program-for-nth-fibonacci-number/)
        -   [常見程式演算 :: 費式數列](https://openhome.cc/zh-tw/algorithm/basics/fibonacci/)
    -   [LIOJ 1014：不九人世](https://oj.lidemy.com/problem/1014) 
        [code](https://github.com/kywk/leetcode/blob/main/node/alg101/lioj1014.js)
    -   [LIOJ 1016：不合群的人](https://oj.lidemy.com/problem/1016) 
        [code](https://github.com/kywk/leetcode/blob/main/node/alg101/lioj1016.js)

要特別題一下搭電梯這題, 後來的習慣是解提前, 會先思考題型的數學解, 再思考演匴法解.
列出數列尋找規格時, 發覺題目其實是費氏數列.
只靠演算法求解的話, 費氏數列用迴圈或遞迴各有時間和空間複雜度上的優勢.
但列規則時, 覺得應該還有 _Fn = F(n-1) + F(n-2)_ 之外的函式可能.
上網查了下, 果然還有其他遞迴函式解法, 可將時間複雜度從 _O(n^2)_ 降到 _O(logn)_,
兼顧時間和空間複雜度. 推演過程日後該找時間深入了解.

最後的解法混用了迴圈窮舉和遞迴. 當 n 數值小的時候, 直接透過窮舉即可.
n 較大再透過遞迴增加效率.
小技巧是迴圈窮舉運算得到的數值可以快取, 後面程式呼叫時就不需要重複運算.
一些語言中透過 `static` 宣告變數, 以保存變數值.
JS 函式中變數不支援 static, 但 JS 中函式就是個物件, 可以直接宣告物件成員即可.

其他題目倒是引發沒有太多記憶點, 很入門的練習.


## Unit8：初學者只管拿分，誰管你什麼效率 ##

-   至少題目你要解的出來, 先求有__再求好__
-   學習演算法之後會發現更快的解法
-   Project 8:
    -   [LIOJ 1049：陣列最短距離](https://oj.lidemy.com/problem/1049) 
        [code](https://github.com/kywk/leetcode/blob/main/node/alg101/lioj1049.js)
    -   [LIOJ 1050：two sum](https://oj.lidemy.com/problem/1050) 
        [code](https://github.com/kywk/leetcode/blob/main/node/alg101/lioj1050.js)
    -   [LIOJ 1051：逆序數對](https://oj.lidemy.com/problem/1051) 
        [code](https://github.com/kywk/leetcode/blob/main/node/alg101/lioj1051.js)

實務上, 時間複雜度和空間複雜度之外, 影響效率的還有運算式本身運算速度.
_O(C1 * N)_ 和 _+ O(C2 * logN)_ 理論上後者複雜度大.
但若 _C1 >> C1 >> N_ 則前者效能會更好.
實務上除了考慮演算法複雜度外, 還需考慮使用情況與和各種邊界條件. 


## Unit9：未來的路還很漫長，你還差得遠呢 ##

-   [[CS101] 初心者的計概與 coding 火球術 | Lidemy 鋰學院](https://lidemy.com/p/cs101-coding)
-   Project 9:
    -   [LIOJ1003 - 聯誼門票搶起來](https://oj.lidemy.com/problem/1003) 
        [code](https://github.com/kywk/leetcode/blob/main/node/alg101/lioj1049.js)
    -   [LIOJ1004 - 聯誼順序比大小](https://oj.lidemy.com/problem/1004) 
        [code](https://github.com/kywk/leetcode/blob/main/node/alg101/lioj1049.js)
    -   [LIOJ1005 - 聯誼話題相親數](https://oj.lidemy.com/problem/1005) 
        [code](https://github.com/kywk/leetcode/blob/main/node/alg101/lioj1049.js)
    -   [LIOJ1006 - 聯誼坐法排排看](https://oj.lidemy.com/problem/1006) 
        [code](https://github.com/kywk/leetcode/blob/main/node/alg101/lioj1049.js)
    -   [LIOJ1007 - 聯誼排行大比拼](https://oj.lidemy.com/problem/1007) 
        [code](https://github.com/kywk/leetcode/blob/main/node/alg101/lioj1049.js)
    -   [LIOJ1018 - 大平台](https://oj.lidemy.com/problem/1018) 
        [code](https://github.com/kywk/leetcode/blob/main/node/alg101/lioj1049.js)
    -   [LIOJ1019 - 一條路走到黑](https://oj.lidemy.com/problem/1019) 
        [code](https://github.com/kywk/leetcode/blob/main/node/alg101/lioj1049.js)
    -   [LIOJ1052 - 貪婪的小偷 Part2](https://oj.lidemy.com/problem/1052) 
        [code](https://github.com/kywk/leetcode/blob/main/node/alg101/lioj1049.js)  
        Tipds: Dynamic Programming
    -   [LIOJ1053 - 走迷宮](https://oj.lidemy.com/problem/1053) 
        [code](https://github.com/kywk/leetcode/blob/main/node/alg101/lioj1049.js)  
        Tips: Breadth-First Search

多年經驗後回顧基礎課程, 有很多不同想法.
有些題目看似簡單, 深入後其實相當有趣, 偶爾也覺得自己數學理論的不足. 
也藉此檢視, 這些基本的題型中, 
常見的犯錯不外乎對題目規定了解不足, 邊界條件思考不周, 以及偶爾的 typo 等.
都是些基礎低級錯誤, 該戒慎.


## See Also ##

-   [GitHub - Lidemy/ALG101-too-weak-to-leetcode: The course materials for ALG101: Too weak to leetcode](https://github.com/Lidemy/ALG101-too-weak-to-leetcode)
-   [甜不辣馬拉松 – Medium](https://sweetornotspicymarathon.medium.com/)
    [[Lidemy 學習筆記]-先別急著寫 leetcode U7//實作:NPSC題](https://sweetornotspicymarathon.medium.com/2d1adf97b20)
-   [[week 2] 先別急著寫 leetcode - 虛擬碼、Debugger、解題技巧 - HackMD](https://hackmd.io/@Heidi-Liu/note-alg101)
