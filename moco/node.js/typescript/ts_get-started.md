---
title: "Get Started"
description: "TypeScript: Get Started"
tags: [TypeScript, Beginner]

#sidebar_position: 1
#sidebar_label: Easy
#sidebar_class_name: green

#hide_table_of_contents: true

created: 2022-05-27T00:00:00+08:00
image: https://i.imgur.com/mErPwqL.png
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

[TypeScript] Get started
========================

TypeScript
----------

TypeScript 是由微軟開發, 提供型別系統和 ES6 支援的 JavaScript 擴充. 
它可以編譯成標準的 JavaScript, 編譯後的 JavaScript 可以在任何支援 JavaScript 的環境中執行.

官網定義如下:

> TypeScript is a typed superset of JavaScript that compiles to plain JavaScript. Any browser. Any host. Any OS. Open source.

### Install ###

TypeScript 編譯器是 npm 的套件, 需先準備 Node.js 開發環境. [([Node.js] Get Started)](../node.js/js_get-started.md)  
準備好後, 透過下列指令安裝 TypeScript 編譯器.

``` shell
$ npm install -g typescript
```

### Hello World ###

TypeScript 的檔案以 `.ts` 結尾, 需編譯成 `.js` 檔案才能被 JavaScript Runtime 執行.

```ts title="hello.ts"
function sayHello(person: string) {
    return 'Hello, ' + person;
}

let user = 'Tom';
console.log(sayHello(user));
```
然後執行

``` shell
$ tsc hello.ts
```
會得到 hello.js 如下:

```js title="hello.js"
function sayHello(person) {
    return 'Hello, ' + person;
}
var user = 'Tom';
console.log(sayHello(user));
```
此時可以透過任何 JS runtime 執行 hello.js

``` shell
$ node ./hello.js
Hello, Tom
```


Project
-------

### tsconfig.json ###

TypeScript 開發需要編譯後才能被執行, 而 tsc 編譯器有許多設定可以依專案需求調整.
除了都透過 CLI 逐一輸入命令與參數外, 通常會在專案根目錄新增 `tsconfig.json` 檔案,
所有有關 TS 的編譯設定都會寫在 `tsconfig.json` 檔案中.

`tsconfig.json` 是一個標準的 JSON 檔, 不能是空白檔案. 可以是一個空的 JSON 物件如下,
此時 tsc 會採用預設編譯設定, 去編譯專案資料夾下所有包含 `.ts` 的檔案.

``` shell 
$ echo "{}" >> tsconfig.json
```

一般使用上, 會透過 `tsc --init` 來建立預設的 `tsconfig.json`, 
依開發環境版本不同, 可能不同的預設設定. 

<Tabs>
  <TabItem value="shell" label="Shell" default>

```shell
$ tsc --init

Created a new tsconfig.json with:

  target: es2016
  module: commonjs
  strict: true
  esModuleInterop: true
  skipLibCheck: true
  forceConsistentCasingInFileNames: true

You can learn more at https://aka.ms/tsconfig.json
```
  </TabItem>
  <TabItem value="json" label="tsconfig.json">

```json
{
  "compilerOptions": {
    /* Visit https://aka.ms/tsconfig.json to read more about this file */

    /* Projects */
    /* Language and Environment */
    "target": "es2016",                                  /* Set the JavaScript language version for emitted JavaScript and include compatible library declarations. */

    /* Modules */
    "module": "commonjs",                                /* Specify what module code is generated. */

    /* Interop Constraints */
    "esModuleInterop": true,                             /* Emit additional JavaScript to ease support for importing CommonJS modules. This enables `allowSyntheticDefaultImports` for type compatibility. */
    "forceConsistentCasingInFileNames": true,            /* Ensure that casing is correct in imports. */

    /* Type Checking */
    "strict": true,                                      /* Enable all strict type-checking options. */

    /* Completeness */
    "skipLibCheck": true                                 /* Skip type checking all .d.ts files. */
  }
}
```
  </TabItem>
</Tabs>

而不同開發框架或不同版本的開發環境, 建議的編譯設定也有所不同.

[tsconfig/bases: Hosts TSConfigs to extend in a TypeScript app, tuned to a particular runtime environment](https://github.com/tsconfig/bases)
這個 GitHub 專案收錄了常見的開發框架下建議的 `tsconfig.json` 設定. 
除了透過 `tsc --init` 建立預設 `tsconfig.json` 外, 
也可以根據專案框架, 找到推薦的 `tsconfig.json` 下載放置於專案資料夾.

### package.json ###

雖然微軟不斷推動整合性 IDE 對 TypeScript 的原生支援, 
但 TypeScript 開發環境大多還是依賴於 JavaScript (Node.js),
許多開發框架也是沿用 Node.js 上的資源. 
因此 TypeScript 專案通常還是會建立 `package.json`

<Tabs>
  <TabItem value="npm" label="npm" default>

```shell
$ npm init
This utility will walk you through creating a package.json file.
It only covers the most common items, and tries to guess sensible defaults.
...
```
  </TabItem>
  <TabItem value="yarn" label="yarn">

```shell
$ yarn init
yarn init v1.22.18
question name (sandbox): 
...
```
  </TabItem>
</Tabs>

### .files ###

許多 Node.js 常用的開發工具如 ESLine, Jest, ...等, 
在 TypeScript 都是適用的. 
專案根目錄除了 `tsconfig.json` 和 `package.json` 外, 
可能還有許多相關開發工具的配置設定檔. 

[Create an npm package template with TypeScript and rollup.js - DEV Community](https://dev.to/0xkoji/create-an-npm-package-template-with-typescript-and-rollup-js-294a)
這篇文章逐步介紹了 TypeScript 專案如何配置.  
而 [ryansonshine/typescript-npm-package-template: Boilerplate to kickstart creating an npm package using TypeScript](https://github.com/ryansonshine/typescript-npm-package-template)
則是開發者分享了他個人 TypeScript 基本專案配置.  
都是值得參考的資源.



小結
----

...TBD...


See Also
--------

-   [TypeScript 新手指南](https://willh.gitbook.io/typescript-tutorial/)
-   [開始使用 TypeScript - Learn | Microsoft Docs](https://docs.microsoft.com/zh-tw/learn/modules/typescript-get-started/)
-   [Typescript 初心者手札 :: 第 11 屆 iThome 鐵人賽](https://ithelp.ithome.com.tw/users/20120053/ironman/2273)
-   __tsconfig.json__
    -   [tsconfig.json - TypeScript 中文手册](https://typescript.bootcss.com/tsconfig-json.html)
    -   [【Day 03】 TypeScript 編譯設定 - tsconfig.json - iT 邦幫忙::一起幫忙解決難題，拯救 IT 人的一天](https://ithelp.ithome.com.tw/articles/10216636)
