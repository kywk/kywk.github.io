---
title: TypeScript
description: Express + TypeScript
tags:
  - Node.js
  - Nodejs/Express
  - TypeScript
date_created: 2022-09-30T16:00:00.000Z
image: 'https://i.imgur.com/mErPwqL.png'
---

[Express] Using TypeScript
==========================

TypeScript 的型別和屬性宣告, 確實能減少不少 JavaScript 開發時小小疏失導致的錯誤,
尤其在 API Server 時, 接收客戶端資料若沒有驗證型別, 可能會導致意外錯誤發生.
利用 TypeScript 開發 API Server 是個不錯的主意.


建立專案
-------

和所有 Node.js 專案一樣, 使用 npm 初始化新的 `package.json` 不會有錯.

``` shell
npm init
yarn init
```

> `npm` 和 `yarn` 指令依個人習慣擇一即可.

會需要填入一些專案的相關資訊:

- __package name__ 輸入專案名稱, 預設使用資料夾名稱
- __version__ 版本號, 預設 1.0.0
- __description__ 專案的詳細介紹, 可不填
- __entry point__ 專案的程式載入點, 預設 index.js
- __test command__ 專案測試用的指令, 可不填
- __git repository__ 輸入 git 遠端位址, 可不填
- __keywords__ 輸入專案相關的關鍵字, 可不填
- __author__ 輸入專案作者名稱, 可不填
- __license__ 授權相關, 預設 ISC

### --yes ###

若專案不會有發布 npm 的需求, 只想快速產生 `package.json` 來管理套件. 
可加上 `--yes` 快速建立預設值內容如下.

``` json title=package.json
{
  "name": "express-typescript",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "type": "module",
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```


TypeScript
----------

透過 npm 進行安裝 TypeScript. 依實際需求, 通常建議全域安裝.

``` shell
npm i -g typescript
yarn global add typescript
```

若真的沒有其他 TypeScript 專案開發需求, 
以專案角度來說, TypeScript 只是開發上需要, 歸屬於開發依賴套件即可.

``` shell
npm i typescript --save-dev
yarn add typescript --dev
```

### tsconfig.json ###

要透過 TypeScript 指令初始化 `tsconfig.json`

``` shell
$ tsc init
$ npx tsc init

Created a new tsconfig.json with:
  target: es2016
  module: commonjs
  strict: true
  esModuleInterop: true
  skipLibCheck: true
  forceConsistentCasingInFileNames: true
```

> 自從多了 `npx` 之後, 部分 CLI 套件指令可以直接透過 npx 來執行.
> npx 會自動管理與處理套件依賴的下載等, 不一定需要安裝全域套件.

專案資落夾會多一個 `tsconfig.json`, 這個檔案是用來設定編譯選項的. 詳細設定可參考 [官方文件](https://www.typescriptlang.org/tsconfig)

``` json title="tsconfig.json"
{
  "compilerOptions": {
    "incremental": true,               // 啟用增量編譯
    "target": "ES2017",                // 編譯成指定的 JavaScript 版本
    "module": "commonjs",              // 指定編譯成何種模組
    "declaration": true,               // 產生 '.d.ts' 檔
    "sourceMap": true,                 // 產生 '.map' 檔
    "outDir": "./dist",                // 指定編譯後的檔案存放點
    "rootDir": "./src",                // 載入點的位置
    "removeComments": true,            // 移除註解
    "strict": true,                    // 採用嚴格模式
    "baseUrl": "./src",                // 指定匯入檔案的基準路徑
    "esModuleInterop": true,           // 兼容模組
    "experimentalDecorators": true,    // 啟用裝飾器
    "emitDecoratorMetadata": true      // 提供裝飾器 metadata
  },
  "include": ["src/**/*.ts"],          // 納入編譯範圍
  "exclude": ["node_modules", "dist"]  //不納入編譯範圍
}
```


Express
-------

安裝 Express:

``` shell
$ npm i express
$ yarn add express

yarn add v1.22.19
[1/4] 🔍  Resolving packages...
[2/4] 🚚  Fetching packages...
[3/4] 🔗  Linking dependencies...
[4/4] 🔨  Building fresh packages...
success Saved 1 new dependency.
info Direct dependencies
└─ express@4.18.1
info All dependencies
└─ express@4.18.1
✨  Done in 0.88s.
```

若指令順利執行完畢, 可看到 `package.json` 中的 __dependencies__ 多了 __express__, 表示安裝成功. 
接著要取得 Node.js 與 express 的 type 定義檔, 在開發時能夠清楚知道有哪些功能可以使用:

``` shell
npm i @types/node @types/express --save-dev
yarn add @types/node @types/express -D
```

### index.js ###

TypeScript `.ts` 原始檔需經編譯後才可執行, 為方便編譯設置, 建議放 `src` 資料夾下.

```
├── src
|   └── index.ts
├── package.json
└── tsconfig.json
```

``` ts title="index.ts"
import express from 'express';

const app = express();

app.get('/', (req, res, next) => {
    res.send('Hello, World!!');
});

app.listen(3000, () => console.log('http server is running at port 3000.'));
```

### ts-node ###

TypeScript 程式無法直接透過 Node.js 來啟動它, 必須要編譯過後才能透過 Node.js 啟動. 
但每次要測試都要執行一次編譯實在太麻煩了, 所以我們安裝 `ts-node` 來解決這個問題:

``` shell
npm i ts-node --save-dev
yarn add ts-node -D
```

安裝完畢後, 可更改 `package.json` 的配置以透過 npm 的腳本來啟動 Express 專案.
在 `package.json` 中的 script 欄位添加 start 項目:

``` json title=package.json
"scripts": {
  "dev": "ts-node ./src/index.ts"
}
```

``` shell
$ npm run dev
$ yarn run dev

$ ts-node ./src/index.ts
http server is running at port 3000.
```

啟動成功後, 可以在瀏覽器中輸入 `http://localhost:3000` 來檢視結果.


編譯
----

畢竟 ts-node 並不適合用在正式環境中, 還是需要編譯成 JavaScript 再透過 Node.js 來啟動.

要如何對專案進行編譯呢? 直接在專案下 `tsc` 即可編譯專案. 
tsc 會依 `tsconfig.json` 的設置從 __rootDir__ 讀取所有 .ts 檔, 編譯後輸出到 __outDir__ 位置.

``` shell
$ tsc
$ node ./dist/index.js
```
上述指令即可編譯與啟動 Express Server.

可以把相關命令寫入 `package.json` script 裡:
``` json title="package.json"
"scripts": {
  "start": "npm run build && node ./dist/index.js",
  "dev": "ts-node ./src/index.ts",
  "build": "tsc"
}
```

每次要編譯並啟動正式環境就執行:

``` shell
npm start
```


自動化
-----

開發階段若每次修改程式, 需手動停止服務再啟動才可更新. 可配合 `nodemon` 套件來做到程式修改後自動重載的管理.

``` shell
npm i nodemon --save-dev
yarn add nodemon -D
```

`nodemon` 會監看該資料夾裡所有檔案, 若檔案有更改, 則會自動重新執行指令.

``` json title="package.json"
"scripts": {
  "start": "npm run build && node ./dist/index.js",
  "dev": "nodemon --exec ts-node ./src/index.ts",
  "build": "tsc"
}
```

如此一來, 只需要執行一次 `npm run dev` `yarn run dev`,
程式修改時就會自動重新載入. 

### pm2 ###

`nodemon` 除了可以監看檔案變化外, 若 Node.js 程式出錯, 也會重新執行指令, 以確保服務繼續運行.
而在正式環境上, 較常用功能較強大的 `pm2` 來取代 `nodemon` 作為錯誤重啟的監控.


環境變數
-------

開發環境和正式環境長會有不同配置檔, `dotenv` 這個套件可以方便管理環境變數.

``` shell
npm i dotenv
yarn add dotenv
```

通常至少會有 __development__ / __production__ 兩個環境:

```
.
├── src
|   ├── index.ts
|   └── environments
|       ├── development.env
|       └── production.env
├── package.json
└── tsconfig.json
```

透過 npm 的腳本傳入參數來指定現在的環境是 development 還是 production:

``` json title="package.json"
"scripts": {
  "start": "npm run build && NODE_ENV=production node ./dist/index.js",
  "dev": "nodemon --exec NODE_ENV=development ts-node ./src/index.ts",
  "build": "tsc"
}
```

最後調整 `index.ts` 的內容, 透過 NODE_ENV 參數 與 dotenv 來選定環境變數:

``` ts title="index.ts"
import express from 'express';
import path from 'path';
import dotenv from 'dotenv';

const app = express();

dotenv.config({ path: path.resolve(__dirname, `./environments/${ process.env.NODE_ENV }.env`) });

app.get('/', (req, res, next) => {
    res.send('Hello, World!!');
});

app.listen(process.env.PORT, () => console.log(`http server is running at port ${ process.env.PORT }.`));
```

``` shell
$ yarn run dev
yarn run v1.22.19
$ nodemon --exec NODE_ENV=development ts-node ./src/index.ts
[nodemon] 2.0.20
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: ts,json
[nodemon] starting `NODE_ENV=development ts-node ./src/index.ts`
http server is running at port 3000.
```


Troubleshooting
---------------

### fail in prod ###

依上述設定在開發環境下執行沒問題, 但執行 `npm start` 會出現 port undefined 錯誤如下:

``` shell
$ yarn start
yarn run v1.22.19
$ npm run build && NODE_ENV=production node ./dist/index.js

> taostyler@1.0.0 build
> tsc

http server is running at port undefined.
```

主要原因在 `development.env` 及 `production.env` 都放在 `sec/environment` 資料夾下,
測試時執行的 `ts-node ./src/index.ts` 可以讀到相對路徑下的環境設定檔,
而正式環境的指令 `node ./dist/index.js`, 在 `disc` 資料夾下僅有被編譯後的 .js 檔,
並不包含其他設定檔, 靜態資源等... 程式無法讀到對應環境配置檔而出錯.

#### 專案根目錄 ####

解決方法之一是把設定檔和靜態資源檔挪出 `src` 資料夾, 如下:

```
├── config
│   └── env
│     ├── development.env
│     └── production.env
├── dist
├── package.json
├── src
│   └── index.ts
├── tsconfig.json
└── static
```

修改程式, 新增 __ROOT__ 常態變數, 透過 __ROOT__ 相對路徑去讀取環境配置檔或其他設定檔:

``` js
const ROOT = path.resolve(__dirname, `../`)
dotenv.config({ path: `${ ROOT }/config/env/${ process.env.NODE_ENV }.env`});
app.set('ROOT', ROOT)
```

#### copyfiles ####

另一個作法是把相關資源檔複製到 `disc` 資料夾下. 以維持和 `src` 資料夾下相同的結構.

然而 tsc 不支援編譯時候順便複製非 .ts 檔案到 disc 資料夾, 必須自己手動處理相關檔案的複製. 
但可以修改 `package.json` 來簡化相關流程. 調整範例如下:

``` json title="package.json"
// ...
"scripts": {
    "clean": "rimraf dist/",
    "copy-files": "copyfiles -u 1 src/**/*.html src/**/*.css src/**/*.env src/**/*.json dist/",
    "build": "yarn clean && tsc && yarn copy-files"
},
// ...
```

這邊用了兩個 node package 來簡化命令: 
- [rimraf](https://www.npmjs.com/package/rimraf) The UNIX command rm -rf for node.
- [copyfiles](https://www.npmjs.com/package/copyfiles), with a very descriptive name.

``` shell
npm i --save-dev rimraf copyfiles
yarn add -D rimraf copyfiles
```

這樣執行 `npm build` 時除了將 .ts 檔案編譯成 .js 之外, 也會把相關資源檔一起複製到 disc 資料夾下,
部署更新時, 直接更新 disc 資料夾下的檔案即可.

Ref: [tsc: How to copy non-TypeScript files when building - Víctor Colombo](https://vccolombo.github.io/blog/tsc-how-to-copy-non-typescript-files-when-building/)

#### docker / packager ####

上述方法適合專案初期對正式環境的測試使用, 但長期更新維護的專案, 正式環境通常會有更嚴謹的規範.
可能透過 dockerfile 或其他的打包工具, 依專案實際規範而定, 暫不討論.



See Also
--------

除了依本文從零開始建力與配置專案外, 
也可以利用 [typescript-express-starter](https://www.npmjs.com/package/typescript-express-starter) 之類的套件, 
或直接沿用 [greenroach/express-ts-template](https://github.com/greenroach/express-ts-template) 之類的樣板來建立專案.

文章內容步驟可能因版本迭代導致語法錯誤等, 但相關套件若有持續更新, 使用套件或樣板來建立專案, 仍是不錯的選擇.

### References ###

- [[今晚我想來點 Express 佐 MVC 分層架構] DAY 04 - 建置專案 - iT 邦幫忙::一起幫忙解決難題，拯救 IT 人的一天](https://ithelp.ithome.com.tw/articles/10239787)
- [How to set up TypeScript with Node.js and Express - LogRocket Blog](https://blog.logrocket.com/how-to-set-up-node-typescript-express/)
- [Setup a Node Express API with TypeScript (2021) - DEV Community 👩‍💻👨‍💻](https://dev.to/roycechua/setup-a-node-express-api-with-typescript-2021-11o1)
