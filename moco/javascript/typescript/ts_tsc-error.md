---
title: TSC Error
tags:
  - TypeScript
date_created: 2022-05-27
categories:
  - typescript
---

[TypeScript] tsc Error Troubleshooting
======================================

> 本篇雜記收錄開發過程中 tsc error 及問題排除...


TS2304: Cannot find name 'process'
----------------------------------

``` shell
error TS2304: Cannot find name 'process'
```

You need to make sure that the type definitions for Node are available. 
The way to do this depends on which version of TypeScript you are using.

``` shell
$ npm install --save-dev @types/node
```

_Ref: [javascript - Read arguments from command line - error TS2304: Cannot find name 'process' - Stack Overflow](https://stackoverflow.com/questions/35551185/read-arguments-from-command-line-error-ts2304-cannot-find-name-process)_


TS2345: Type 'T1' is not assignable to type 'T2'
------------------------------------------------

### null ###

_Ref: [Solve - Type 'null' is not assignable to type in TypeScript | bobbyhadz](https://bobbyhadz.com/blog/typescript-type-null-is-not-assignable-to-type)_


TS2531: Object is possibly 'null'
---------------------------------

``` shell
error TS2531: Object is possibly 'null'.
````

ts 在編譯時診斷到物件可能會爲 null, 所以給出了這樣一個提示: 對象可能爲 null.

雖可修改 `tsconfig.json` 中 `strictNullChecks = false` 讓編譯器不檢查 null, 
但專案管理上還是應該嚴謹一些看待.

> files is defined to be FileList | null so it can be null.
> You should either check for null (using an if) or 
> use a "Non-null assertion operator" (!) if you are sure it is not null:

如果程式流程中, 物件可能為 null 的話, 應該要在讀取物件值之前, 先判斷是否為 null.

若程式流程可以確定物件不會是 null 的話, 解決方式是在物件之後加一個 ! .
驚嘆號在 ts 編譯器中, 是物件 not null 的斷言操作符,
編譯器看到這個符號, 不會在編譯時檢查是否為 null.

! 只是告訴編譯器在編譯不要檢查是否可能為 null,
開發時要確認流程上不會造成 null 才可使用, 否則實際執行還是會出錯.

_Ref: [angular - TS2531: Object is possibly 'null' - Stack Overflow](https://stackoverflow.com/questions/49431880/ts2531-object-is-possibly-null)_
