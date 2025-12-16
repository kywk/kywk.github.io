---
title: Express CORS
description: Express CORS
tags:
  - Node.js
  - Nodejs/Express
  - Security
date_created: 2022-09-29T00:00:00+08:00
image: https://i.imgur.com/mErPwqL.png
---

[Express] CORS
==============

Express 框架中, 要處理 [[CORS|CORS 規範設定]], 
可以依程式需求手動配置 `res.header()`, 或是使用 [express/cors](https://github.com/expressjs/cors) 套件.



Manually
--------

### Allow-Origin: * ###

要允許不同 Origin 存取資料, Server 端在 response header 加上 `Access-Control-Allow-Origin`.
Express 框架語法如下:


``` js
app.use((req, res, next)=> {
  res.header('Access-Control-Allow-Origin', *)
  res.header('Access-Control-Allow-Credentials', false)
  next()
})
````

如果 Access-Control-Allow-Origin 設定為* (接受任何跨領域的讀取), 
`Access-Control-Allow-Credentials` 只能設定為 false, 
[說明連結](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS/Errors/CORSNotSupportingCredentials)

### use credentials ###

因為設定 `Access-Control-Allow-Credentials` 為 false, 所以 client 不能傳送 cookie.
若需要跨 subdomain 存取 cookies credentials, 可以使用白名單的設計.

``` js
const allowedOrigins = ['http://xxx.star.com.tw', 'http://yyy.star.com.tw', 'http://zzz.star.com.tw']
const origin = req.headers.origin
if (allowedOrigins.indexOf(origin) > -1){
   res.setHeader('Access-Control-Allow-Origin', origin)
}
res.header('Access-Control-Allow-Credentials', true)
```

如果符合 allowedOrigins 就可以接受 Credentials.



express/cors
------------

Express 處理 CORS 設定雖然簡單, 但寫在程式中寫死 header 設置, 在維護修改都比較麻煩. 
不同開發環境部署上也比較沒有彈性.

Express 官方自己出了一個套件 [express/cors](https://github.com/expressjs/cors) 方便大家在 Node.js 上設定 CORS:

``` shell
npm install --save cors
```

``` js
var cors = require(cors)
app.use(cors())
```

這樣就完成了. 但不是最好的配置方式, 因為 cors 預設為開好開滿, 所有跨域請求都接受:

``` json
{
  "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204
} 
```

比較好的作法應該是授權指定的網域, 請求方法等, 針對需求去設定:

``` js
const corsOptions = {
  origin: [
    'http://www.example.com',
    'http://localhost:8080',
  ],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
```

注意 cors options 為一標準的 JSON 格式,
可以載入外部 config.json 檔使用, 就可以完成不同開發環境下的不同配置需求了.

### 參數 ###

- __origin__ 設置可存取的網域, 也就是設置 _Access-Control-Allow-Origin_ 參數.  
  可接受的資料型別為 `Boolean` | `String` | `RegExp` | `Array<String|RegExp>` | `Function`
- __methods__ 設置可存取的方法, 也就是設置 _Access-Control-Allow-Methods_ 參數.  
  可以接受的參數格式: `GET, POST,DELETE` 這種用逗號隔開的. 
  也接受 `Array<String>` 的格式, 如: `['GET', 'POST']`
- __allowedHeaders__ 設置可存取的 Header，也就是設置 _Access-Control-Allow-Headers_ 參數,  
  可以接受的參數格式: `Content-Type,Authorization` 這種用逗號隔開的.
  也接受 `Array<String>` 的格式, 如: `'Content-Type', 'Authorization'`
- __exposedHeaders__ 設置瀏覽器可檢視的其他 Header 項目, 也就是設置 _Access-Control-Expose-Headers_ 參數.
  可以接受的參數格式: `Content-Range,X-Content-Range` 這種用逗號隔開的.
  也接受 `Array<String>` 的格式, 如: `['Content-Range', 'X-Content-Range']`
- __credentials__ 設置是否傳送 cookie, 也就是設置 _Access-Control-Allow-Credentials_ 參數.
  資料型別 `Boolean`.
- __maxAge__ 設置合法期間, 使瀏覽器在這段期間內不必發送 OPTION 請求, 也就是設置 _Access-Control-Max-Age_ 參數.
  資料型別 `Number` 且需整數
- __preflightContinue__ 傳遞 OPTION 請求的 response 到下一個 handler
- __optionsSuccessStatus__ 設置當 OPTION 請求成功時, 回傳的 HTTP Code



See Also
--------

### References ###

- [[CORS]]
- [Cors Express端的設定. 最近工作上做了一個平台專門將圖片轉檔，現在這個平台要開始串接到網站上，由clie… | by Tinghuan Wang | summer's code life | Medium](https://medium.com/summers-life/cros-express%E7%AB%AF%E7%9A%84%E8%A8%AD%E5%AE%9A-f94c9a3199a1)
