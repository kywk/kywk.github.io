---
title: "Sequelize: Migration Seeds"
description: Sequelize Migration Seeds
tags:
  - Node.js
  - ORM
  - Nodejs/Sequelize
date_created: 2022-09-15T00:00:00+08:00
image: https://lh3.googleusercontent.com/pw/AL9nZEUA9Ifvd5Z8SXDWkeVB6AC4MPGwnXaL6kBXNPoXwOQQ2jOcZ1Jw_0p8TKK8C3ZX0e67_FOY15eDrm7aaXSQJcKtoUzC80SAQEHsaBy6qS2AqNNs5VUFNXBKm439y_1wkvmDl-PnL8ReojnIumNlEvOXBg=w800-no?authuser=0
---

[Node.js] Sequelize Migration Seeds
===================================

Sequelize 是 Node.js 下相當主流的 ORM 套件.
ORM 使用與否的爭論大概也和 `Space VS Tab`, `Vi VS Emacs` ... 一樣的永無止盡.

而 Sequelize 2 之後推出 sequelize-cli 中的 Migration 功能, 
透過一次又一次的維護檔, 確保移植時有相同的建構過程,
確實能解決程式開發階段對資料庫操作的常見困擾:

- 出問題回不到上個版本？
- 忘記做了哪些修改？
- 改了 schema 沒人知道？



什麼是 Migraiton ?
-----------------

- __Migration__ 是用來描述 「資料庫的結構掌什麼樣子」 的檔案, 隨著專案開發過程中對資料庫的修改而逐漸增加.
- 可以理解成資料庫格式變更的版本控制.

![migration files](https://lh3.googleusercontent.com/pw/AL9nZEXTj9J5V07uQ7uWqG_O5kIuauTbX5mOu-pJ8RqJDe5CEPgkF4tHAR294BcbwsGbKdu0NbOqNCik91U8vG-fUtBbt6jVSr6tMuzjaQOIs5ZWTrx59xYN5phxsHd4GPEyX7oDNLn6KAT8Kr4u2f-dAO4lRg=w600-no?authuser=0)

### 操作行為 ###

Migration 是拿來變動資料表的, 所以會有幾種動作在這裡處理.

- 變動資料表
- 變動欄位
- 變動資料表關聯

### 可以幹嘛 ###

- 紀錄操作過程
- 降低人為操作錯誤的可能
- 環境部署或是更換資料庫的時候，快速達成同步
- 錯誤發生時，可以快速回到正確的版本



環境安裝與設置
-----------

### sequelize-cli ###

sequelize-cli 可系統全域安裝或安裝在專案項目, 依實際需求而定.
``` shell
npm install --save-dev sequelize-cli 
```
亦直接透過 `npx sequelize ` 執行.

### Project bootstrapping ###

``` shell
npx sequelize-cli init
```

This will create following folders

- `config`, contains config file, which tells CLI how to connect with database
- `models`, contains all models for your project
- `migrations`, contains all migration files
- `seeders`, contains all seed files

![tree](https://lh3.googleusercontent.com/pw/AL9nZEVtWoXHl5m1PaPaMRoSgGYsCk8GxIE78CKElbigXOZj63pXqjmkjyDwnH-Vkk1cErjHsB_xFg_CJsdt6a5l2f-7_8wM046gAZDPcZK2Gc0-6LxwLxATYh81BU5m2V1NE_EscAE3DeLFXH1mb0JntUErkw=w314-no?authuser=0)

### configure ###

修改 config/config.json 裡頭連接 DB 的相關配置. 

``` json title="config.json"
"development": {
    "username": "user",
    "password": "password",
    "database": "database name",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
```  

設定完後即可利用 sequelize 來操作 DB. 如新建一張 user table
```
sequelize model:generate --name user --attributes name:string,mail:string
```



基本使用指令
---------

透過下列指令可新增 migration, 並且想好 migration message.

```
sequelize migration:create --name <migration message>
```
就會產生檔案 `migrations/<YYYYMMDDHHMMSS>-<migration message>.js`.
用自己習慣的編輯器去修改 js, 搭配 [Query Interface](https://sequelize.org/docs/v6/other-topics/query-interface/) 語法去建立或調整資料庫 Schema 修改.

```
sequelize db:migrate
```
這個指令會自動執行到最後一個 migration.js 檔案裡面的 `up()`, 為資料庫欄位逐次修改調整過程.

```
sequelize db:migrate:undo
```
則執行 js 檔案裡面的 `down()`, 內容為對應修改的還原語法.

### 指令列表 ###

``` 
Sequelize CLI [Node: 16.17.0, CLI: 6.4.1, ORM: 6.21.6]

sequelize <command>

Commands:
  sequelize db:migrate                        Run pending migrations
  sequelize db:migrate:schema:timestamps:add  Update migration table to have timestamps
  sequelize db:migrate:status                 List the status of all migrations
  sequelize db:migrate:undo                   Reverts a migration
  sequelize db:migrate:undo:all               Revert all migrations ran
  sequelize db:seed                           Run specified seeder
  sequelize db:seed:undo                      Deletes data from the database
  sequelize db:seed:all                       Run every seeder
  sequelize db:seed:undo:all                  Deletes data from the database
  sequelize db:create                         Create database specified by configuration
  sequelize db:drop                           Drop database specified by configuration
  sequelize init                              Initializes project
  sequelize init:config                       Initializes configuration
  sequelize init:migrations                   Initializes migrations
  sequelize init:models                       Initializes models
  sequelize init:seeders                      Initializes seeders
  sequelize migration:generate                Generates a new migration file
  sequelize migration:create                  Generates a new migration file
  sequelize model:generate                    Generates a model and its migration
  sequelize model:create                      Generates a model and its migration
  sequelize seed:generate                     Generates a new seed file
  sequelize seed:create                       Generates a new seed file

Options:
  --version  Show version number                                                           [boolean]
  --help     Show help
```



檔案架構
-------

`up()` `down()` 都回傳 promise

``` js title="migration-<DATA>-<MESSAGE>.js"
'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    // 要增加內容的動作
  },

  down: (queryInterface, Sequelize) => {
    // 要減少內容的動作
  }
};
```

### Query Interface 常用方法 ###

- 變動資料表
  - 新增資料表 `createTable(tableName, attributes, options)`
  - 刪除資料表 `dropTable(tableName, options)`
  - 刪除所有資料表 `dropAllTables(options)`
  - 重新命名資料表 `renameTable(before, after, options)`
  - 顯示資料表陣列 `showAllTables(options)`
    - tableNames 的 datatype Array
  - 顯示資料表 schema `describeTable(tableName, options)`
- 變動欄位
  - 增加欄位 `addColumn(tableName, attributeName, dataTypeOrOptions, options)`
  - 刪除欄位 `removeColumn(tableName, attributeName, options)`
  - 修改欄位設定 `changeColumn(tableName, attributeName, dataTypeOrOptions, options)`
  - 重新命名欄位 `renameColumn(tableName, attrNameBefore, attrNameAfter, options)`
- 變動索引(資料表屬性的功能)
  - 建立索引 `addIndex(tableName, attributes, options)`
  - 移除索引 `removeIndex(tableName, indexNameOrAttributes, options)`

### SQL 語法 ###

除了呼叫 Query Interface 外, 使用 `queryInterface.sequelize.query(SQL 語法)` 的用法,
可以直接執行 SQL 語法, 補足 Query Interface 方法的不足.
或因故不想透過 Sequelize ORM 語法時, 可直接使用標準 SQL 來更改資料庫 Schema.

``` js
up: (queryInterface, Sequelize) => {
  return queryInterface.method(
      //...
    }).then(() => {
      queryInterface.sequelize.query(`UPDATE table SET column=field`)
    })
}
```



進階使用
-------

### 回朔版本 ###

可以建立也可以回溯

- sequelize db:migrate:undo  一次退一個版本
- sequelize db:migrate:undo:all 退到初始狀態
- sequelize db:migrate:undo:all --to XXXXXXXXXXXXXX-create-user.js 退到指定版本

### 資料表關聯 ###

在 queryInterface.createTable / addColumn 中, 
在 attributes 定義欄位的物件中, 寫 reference 決定資料庫變動後, 關聯是否存在.

``` js
return queryInterface.addColumn(
  'tableName',
  'fieldName',
  {
    type: Sequelize.INTEGER.UNSIGNED,
    references: {
      model: 'tableName',
      key: 'fieldName'
    },
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE'
    //...
  })
},
```

### Hook ###

當呼叫 add/set 函數時, beforeUpdate/afterUpdate 也會執行.
唯一可以執行 beforeDestroy/afterDestroy 的方式, 就是設定 associations 屬性 onDelete: ‘cascade’.
參考: http://docs.sequelizejs.com/manual/tutorial/hooks.html

呼叫 association 時設定 hook 選項, ex: `onUpdate`, `onDelete`.
預設所有的關聯, 更新用 CASCADE, 刪除用 SET NULL, 除了 n:m 關聯, 用 CASCADE 刪除.

1. `RESTRICT`, 同 NO ACTION
2. `CASCADE`, 同步 update/delete 更新子表 foreign key
3. `NO ACTION`, 不允許主表 update/delete
4. `SET DEFAULT`, 子表 foreign key 設為 default (Innodb not use)
5. `SET NULL`, 子表 foreign key 設為 null

Available constraints:

- UNIQUE
  ``` js
  queryInterface.addConstraint('Users', ['email'], {
    type: 'unique',
    name: 'custom_unique_constraint_name'
  });  
  ```
- DEFAULT (MSSQL only)
  ``` js
  queryInterface.addConstraint('Users', ['roles'], {
    type: 'default',
    defaultValue: 'guest'
  });
  ```
- CHECK (MySQL - Ignored by the database engine)
  ``` js
  queryInterface.addConstraint('Users', ['roles'], {
    type: 'check',
    where: {
       roles: ['user', 'admin', 'moderator', 'guest']
    }
  });
  ```
- FOREIGN KEY
  ``` js
  queryInterface.addConstraint('Posts', ['username'], {
    type: 'foreign key',
    name: 'custom_fkey_constraint_name',
    references: { //Required field
      table: 'target_table_name',
      field: 'target_column_name'
    },
    onDelete: 'cascade',
    onUpdate: 'cascade'
  });
  ```
- PRIMARY KEY
  ``` js
  queryInterface.addConstraint('Users', ['username'], {
     type: 'primary key',
     name: 'custom_primary_constraint_name'
  });
  ```



See Also
--------

雖然 Migration 是 Sequelize 所推出的, 但 sequelize-cli 可獨立使用.
使用 Sequelize Migration 來管理專案資料庫格式架構和程式中是否使用 Sequelize ORM 並無關係.

不喜使用 ORM 的開發者或既有的專案, 無須改變存取資料庫的方式,
程式可以不透過 Sequelize ORM, 自行處理資料庫存取介面.
專案也可以不依賴 `qequelize-cli`, 
直接透過 `npx sequelize COMMAND [OPTIONS]` 來執行 Sequelize Migration.

### Reference ###

- [Migrations | Sequelize](https://sequelize.org/docs/v6/other-topics/migrations/)  
  [Query Interface](https://sequelize.org/docs/v6/other-topics/query-interface/)
- [Sequelize Migration - 《Chris 技術筆記》](https://dwatow.github.io/2018/09-24-sequelize/sequelize-migration/)
- [透過 sequelize 來達成 DB Schema Migration - HackMD](https://hackmd.io/@TSMI_E7ORNeP8YBbWm-lFA/ryCtaVW_M?print-pdf)
