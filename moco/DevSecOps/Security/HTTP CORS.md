---
title: 'HTTP: CORS'
description: Cross-Origin Resource Sharing
tags:
  - Security
  - HTTP
date_created: 2022-09-27T16:00:00.000Z
image: >-
  https://lh3.googleusercontent.com/pw/AL9nZEUA9Ifvd5Z8SXDWkeVB6AC4MPGwnXaL6kBXNPoXwOQQ2jOcZ1Jw_0p8TKK8C3ZX0e67_FOY15eDrm7aaXSQJcKtoUzC80SAQEHsaBy6qS2AqNNs5VUFNXBKm439y_1wkvmDl-PnL8ReojnIumNlEvOXBg=w800-no?authuser=0
---

[HTTP Security] CORS 跨來源資源共用
=================================

TL;DR;
------
- 預設的情況下, 瀏覽器同源會遵守同源政策 (same-origin policy), 並不允許跨域請求 (cross-origin). 在 server 未允許的情況下, 會得到 blocked by CORS policy 的錯誤.
- 如果 client 希望能過取得跨域的資源, 需要由 server 在 response header 中帶上 Access-Control-Allow-Origin 的欄位.



Preface
-------

對接 API 時, 若沒有特別設定, 前後端在各自環境下測試 API 對接, 可能會出現這樣錯誤:

``` js
fetch('https://www.google.com')
  .then(function (response) {
    // Do something ...
  })
  .catch(function (error) {
    // Do something else ...
  });
```
![CORS Error](https://lh3.googleusercontent.com/pw/AL9nZEXnybLT4zenchkhyl9NJ2hieXVMncqW8q3HqVe9oqz6Zt9quSaZEya2m4Du9z8zEx_H3WHZTWOs3LqpIhByluwpxbSSAAkL35UCS-ySCmGy_6fTaxP2AUFhOMZER6uDggsMsg3-WfyMozjJAV5OgFpHRQ=w800-no?authuser=0)

若放到正式環境上, 可能又沒有這問題了. 這是什麼狀況呢? 仔細看錯誤訊息如下:

> access to XMLHttpRequest at 連結A from origin 連結B has been blocked by 
> CORS policy: response to preflight request doesn't pass access control 
> check: No 'Access-control-allow-origin' header is present on the requested resource

這錯誤訊息就是在說 傳送過去的 XMLhttpRequest 違反 __CORS 規範__ 而無法存取.
需檢查 Web Server 上 `Access-Control-Allow-Origin` header 相關設定.



同源政策 (same-origin policy)
----------------------------

在開始 CORS 之前, 要先知道瀏覽器的 Same Origin Policy (同源政策).

基於安全性考量, 程式碼所發出的跨來源 HTTP 請求會受到限制. 
例如，XMLHttpRequest 及 Fetch 都遵守同源政策 (same-origin policy).
這代表網路應用程式所使用的 API 除非有回傳 CORS 標頭 (例如: Access-Control-Allow-Origin).
否則只能請求與應用程式相同來源的 HTTP 資源.

在這個情況下, 其實請求 (request) 已經發出去了, 而瀏覽器其實也拿到回應 (response), 
但是瀏覽器基於同源政策, 因此不把拿到的回應給你的 JavaScript 去做進一步的處理.

![SOP](https://lh3.googleusercontent.com/pw/AL9nZEWj4UovyqqZGfZ4wJ6kqunnG9DcEEBelar-mSVEp1q6sHsQsA6kWp3g1trGUIjU_r7U3gnsHJVHlaXN94O6g0lM1qiK7_zgRBXqM_19cVwUayBD71jgdLvB8xzht8CXB1oDOZnIfH7bGsMX9j-7nKr3Pg=w800-no?authuser=0)

### 同源/跨來源 怎麼判定 ###

當兩個網址的 schema(protocol) + host + port 皆相同, 就是同源 (Same-Origin).
只要有一者不同, 就是跨來源 (Cross-origin)

![](https://lh3.googleusercontent.com/pw/AL9nZEVUhjFUeoqGpDPYEToLfD4SwVLQ4n_XXj31hjxLS8-tJ5K7p1jOCBzeRUnGVAttFclhteedW7WKRH8MsEIicSeC8qdoHqV6zhP9z-jwBGR5kJIF4adAvn-b-_4JWX5M3LxEHdwJWLXW60VTdE5WCgfXUw=w800-no?authuser=0)

一般來說跨來源寫 (Cross-origin writes), 跨來源嵌入 (Cross-origin embedding) 是被允許的, 
而跨來源讀取 (Cross-origin reads) 是受限制的.
而實際上, 跨來源請求資源是相當常見的情況, CORS 就是為了解決跨來源共用資源的規範.



CORS
----

> 跨來源資源共用（Cross-Origin Resource Sharing (CORS)）是一種使用額外 HTTP 
> 標頭令目前瀏覽網站的使用者代理取得存取其他來源（網域）伺服器特定資源權限的機制。
> 當使用者代理請求一個不是目前文件來源——例如來自於不同網域（domain）、通訊協定（protocol）
> 或通訊埠（port）的資源時，會建立一個跨來源 HTTP 請求（cross-origin HTTP request）。

![MDN](https://lh3.googleusercontent.com/pw/AL9nZEUorKltDHOVdRmD4-3b0Me9z43CO4r4op9hqkBK_0Rf0pAjAmqEWnWVBam0tLDfW1acNfh-90-oq_gJ7zvDmOVH1k1uVVzMq_1TWSKf8trGx5aMT8vBidFG--I8HSN8zRWvuWuJd_mqAwkkaIeEDKVigw=w800-no?authuser=0)

### 開啟跨來源請求 ###

若要開啟跨來源請求, 必須在伺服器端做一些設定, 像是在 Response Header 加上 Access-Control-Allow-Origin

```
Access-Control-Allow-Origin: *                    # 允許所有網站發送的請求
Access-Control-Allow-Origin: http://foo.example   # 只允許 http://foo.example 的請求
```

這裡 __*__ 就表示 __接受所有不同來源__ 的跨域請求. 
當瀏覽器接受到伺服器的回應時, 會去比對這個內容, 
如果目前的 Origin 符合 Access-Control-Allow-Origin 所定義的規則的話, 瀏覽器才會把回應給你.

另外還有其他和跨域請求時可用的 Header 像是:

```
Access-Control-Allow-Headers:
Access-Control-Allow-Methods: ["GET", "POST", "PUT"]
Access-Control-Expose-Headers: X-My-Custom-Header, X-Another-Custom-Header
Access-Control-Max-Age: <delta-seconds>
Access-Control-Allow-Credentials: true
```
- `Access-Control-Allow-Headers` 指定哪些 HTTP 標頭可以於實際請求中使用。
- `Access-Control-Allow-Methods` 存取資源所允許的方法，用來回應預檢請求。
- `Access-Control-Expose-Headers` 瀏覽器能夠存取伺服器回應當中哪些標頭。
- `Access-Control-Max-Age` 預檢請求之結果可以被快取的秒數。
- `Access-Control-Allow-Credentials` 用於驗證請求中。


簡單請求與預檢請求
--------------

跨來源請求又可以分成 __簡單請求 (simple request)__ 和 __預檢請求 (preflight request)__.

### 簡單請求 (Simple Request) ###

簡單請求有一些規範, 基本上使用的一定要是 __GET__, __HEAD__, __POST__ 方法, 
並且 __不能有客制的 header, 僅允許特定的標頭和內容__, 如此才算是簡單請求.

> 備註
> 雖然稱作是簡單請求, 但它依然會遵循 同源政策 (Same Origin Policy) 的規範.

### 預檢請求 (Preflight Request) ###

預檢請求通常是在發送會帶有副作用的 HTTP 請求方法前, 規範瀏覽器要先發送預檢請求, 
預檢請求會以 __HTTP OPTIONS__ 的方法送出, 以向伺服器確認後續的請求能否傳送, 
如果預檢請求沒有通過, 那麼後續真正要發送的實際請求 (例如: POST, PUT, DELETE 等等) 就不會發送了.

預檢請求和簡單請求有一點不同, 如果是簡單請求而被 CORS 攔下來的話, 實際上請求已經發送出去, 只是被瀏覽器擋下來不給你.
但若是預檢請求, 發送預檢請求後若沒有通過, 真正要發送的請求是不會發送出去的. 
也就是說 __一旦預檢請求完成, 真正的請求才會被送出__.

預檢請求流程
![](https://lh3.googleusercontent.com/pw/AL9nZEXhd4MKbvV-pajME2eFrFHtijSF-VypCrAFozNQQkuLFv-yxDpAU7g8RNi9xX5SpEa1-Rhby91cIH5yI9P5zUdpfKgn9g5_sHNc7Kbs5ak17PTeLHLda0Fc3qwBTUn2WSpjABM2IMi--OHxO2eV6Sapmw=w521-h553-no?authuser=0)

#### 用戶端向伺服器端發送預檢請求 (瀏覽器會自動發送) ####

```
OPTIONS /resources/post-here/ HTTP/1.1
Host: bar.other
Origin: http://foo.example
Access-Control-Request-Method: POST
Access-Control-Request-Headers: X-PINGOTHER, Content-Type
```

- [Access-Control-Request-Method](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Request-Method) 
  標頭會告訴伺服器之後送出的實際請求會是 POST 方法.
- [Access-Control-Request-Headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Request-Headers) 
  標頭則是通知伺服器實際請求會帶有一個自定義的 X-PINGOTHER 標頭.

#### 伺服器回應預檢請求 ####

在這些資訊下, 接著伺服器將會確定是否接受請求, 並傳送以下回覆:
```
HTTP/1.1 200 OK
Server: Apache/2.0.61 (Unix)
Access-Control-Allow-Origin: http://foo.example
Access-Control-Allow-Methods: POST, GET, OPTIONS
Access-Control-Allow-Headers: X-PINGOTHER, Content-Type
Access-Control-Max-Age: 86400
```
- Access-Control-Allow-Methods 標頭表示伺服器可以接受 POST, GET, OPTIONS 方法.
- Access-Control-Allow-Headers 標頭及其值 _X-PINGOTHER, Content-Type_ 表示伺服器允許在實際請求中使用以上這兩個標頭.
- [Access-Control-Max-Age](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Max-Age) 
  提供了本次預檢請求回應所可以快取的秒數, 如此將可避免瀏覽器不斷發送 preflight request.
  在此範例中 86400 秒即為 24 小時. 
  每一個瀏覽器都有預設的最大值, 當 Access-Control-Max-Age 較預設值大時會優先採用預設值.



Cookie & Credentials
--------------------

Cookie, Authorization Header 和 TLS 的憑證, 預設也只會自動帶入到同源所發出的請求中.

有時我們的 Cookie 會需要發送到不同來源 (origin) 的位置, 
例如 server 的 URL 是 https://api.example.com , 但 client 的 URL 是 https://dev.example.com .
因為 subdomain 不同的緣故, 會被認定是不同的 origin. 
因此 client 對 server 所發送的請求並不會自動帶上 Cookie.

要解決這個問題, 如果 client 使用的是 fetch API, 則需要加上 `credentials: include;` 的 options.
否則 fetch 預設不會傳送 cross-origin cookies.
``` js
// client
fetch('https://api.example.com', {
  credentials: 'include',
});
```

而 server 則是要回傳 `Access-Control-Allow-Credentials` 的 header 在 response 中：
``` js
headers.Set("Access-Control-Allow-Credentials", "true")
```


See Also
--------

遇到 CORS 的問題, 可以歸納出這樣的 SOP:

1. 如果是「簡單」的跨來源請求, 常見開發環境下整合測試需求. 
   後端 GET/POST/HEAD 方法本身加上 `Access-Control-Allow-Origin` header.
2. 非「簡單」跨來源請求, 在後端 OPTIONS 加上 `Access-Control-Allow-Methods` 及 `Access-Control-Allow-Headers` header. 
   另外, 在後端方法本身加上 `Access-Control-Allow-Origin` header.
2. 需要使用 cookie 的情況下, 前端要加上 credentials: 'include' 或是 withCredentials 參數,
   後端要加上 `Access-Control-Allow-Credentials` header, 而且 `Access-Control-Allow-Origin` header 不能用 *.

簡單整理 CORS 相關資料, 進階了解推薦閱讀 [CORS 完全手冊](https://blog.huli.tw/2021/02/19/cors-guide-1/).
而常見的後端語言中, 除了依需求手刻加上 header 外, 也有專門處理 CORS 相關套件可加速開發與方便部署配置.

- [[Express CORS]]

### References ###

- [Cross-origin resource sharing - Wikipedia](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
- [跨來源資源共用（CORS） - HTTP | MDN](https://developer.mozilla.org/zh-TW/docs/Web/HTTP/CORS)
- [CORS 完全手冊（一）：為什麼會發生 CORS 錯誤？ - Huli](https://blog.huli.tw/2021/02/19/cors-guide-1/)  
  [CORS 完全手冊（二）：如何解決 CORS 問題？ - Huli](https://blog.huli.tw/2021/02/19/cors-guide-2/)  
  [CORS 完全手冊（三）：CORS 詳解 - Huli](https://blog.huli.tw/2021/02/19/cors-guide-3/)  
  [CORS 完全手冊（四）：一起看規範 - Huli](https://blog.huli.tw/2021/02/19/cors-guide-4/)  
  [CORS 完全手冊（五）：跨來源的安全性問題 - Huli](https://blog.huli.tw/2021/02/19/cors-guide-5/)  
  [CORS 完全手冊（六）：總結、後記與遺珠 - Huli](https://blog.huli.tw/2021/02/19/cors-guide-6/)
- [[Web] 同源政策與跨來源資源共用（CORS） | PJCHENder 未整理筆記](https://pjchender.dev/webdev/web-cors/)
- [DAY04 - API串接常見問題 - CORS - 概念篇 (1) - iT 邦幫忙::一起幫忙解決難題，拯救 IT 人的一天](https://ithelp.ithome.com.tw/articles/10267360)  
  [DAY05 - API串接常見問題 - CORS - 概念篇 (2) - iT 邦幫忙::一起幫忙解決難題，拯救 IT 人的一天](https://ithelp.ithome.com.tw/articles/10267489)  
  [DAY06 - API串接常見問題 - CORS - 解決CORS問題篇 - iT 邦幫忙::一起幫忙解決難題，拯救 IT 人的一天](https://ithelp.ithome.com.tw/articles/10268821)
- [原來 CORS 沒有我想像中的簡單](https://blog.techbridge.cc/2018/08/18/cors-issue/)  
- [網站安全🔒 Same Origin Policy 同源政策 ! 一切安全的基礎 | by Jayden Lin | 程式猿吃香蕉 | Medium](https://medium.com/%E7%A8%8B%E5%BC%8F%E7%8C%BF%E5%90%83%E9%A6%99%E8%95%89/same-origin-policy-%E5%90%8C%E6%BA%90%E6%94%BF%E7%AD%96-%E4%B8%80%E5%88%87%E5%AE%89%E5%85%A8%E7%9A%84%E5%9F%BA%E7%A4%8E-36432565a226)
- [簡單弄懂同源政策 (Same Origin Policy) 與跨網域 (CORS) | by Hannah Lin | Starbugs Weekly 星巴哥技術專欄 | Medium](https://medium.com/starbugs/%E5%BC%84%E6%87%82%E5%90%8C%E6%BA%90%E6%94%BF%E7%AD%96-same-origin-policy-%E8%88%87%E8%B7%A8%E7%B6%B2%E5%9F%9F-cors-e2e5c1a53a19)
- [Day8-什麼是CROS (Cross-Origin Resource Sharing) - iT 邦幫忙::一起幫忙解決難題，拯救 IT 人的一天](https://ithelp.ithome.com.tw/articles/10204004)
