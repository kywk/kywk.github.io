---
title: 'Sequelize: Seeds'
description: Sequelize Seeds - 資料庫測試資料與初始資料管理
tags:
  - Node.js
  - ORM
  - Nodejs/Sequelize
date_created: 2022-09-14T16:00:00.000Z
image: >-
  https://lh3.googleusercontent.com/pw/AL9nZEUA9Ifvd5Z8SXDWkeVB6AC4MPGwnXaL6kBXNPoXwOQQ2jOcZ1Jw_0p8TKK8C3ZX0e67_FOY15eDrm7aaXSQJcKtoUzC80SAQEHsaBy6qS2AqNNs5VUFNXBKm439y_1wkvmDl-PnL8ReojnIumNlEvOXBg=w800-no?authuser=0
slug: /javascript/package/sequelize-migration-seeds/
---

[Node.js] Sequelize Seeds
=========================

Seeds 是 Sequelize 用來管理測試資料和初始資料的機制。
透過 Seeders，可以快速建立開發或測試環境所需的資料，確保團隊成員擁有一致的資料狀態。



什麼是 Seeds ?
-------------

- __Seeds__ 是用來填充資料庫初始資料或測試資料的檔案
- 與 Migration 不同，Seeds 主要處理「資料內容」而非「資料結構」
- 適合用於開發環境、測試環境的資料準備

### 使用場景

- 開發環境的測試資料
- 應用程式的初始資料（如預設管理員帳號、系統設定）
- Demo 展示用的範例資料
- 單元測試或整合測試的固定資料集



建立 Seeder
----------

### 產生 Seeder 檔案

```bash
sequelize seed:generate --name demo-users
```

會在 `seeders/` 目錄下產生檔案：`<YYYYMMDDHHMMSS>-demo-users.js`

### 執行 Seeders

```bash
# 執行所有 seeders
sequelize db:seed:all

# 執行特定 seeder
sequelize db:seed --seed <YYYYMMDDHHMMSS>-demo-users.js
```

### 復原 Seeders

```bash
# 復原最近一次的 seeder
sequelize db:seed:undo

# 復原特定 seeder
sequelize db:seed:undo --seed <YYYYMMDDHHMMSS>-demo-users.js

# 復原所有 seeders
sequelize db:seed:undo:all
```



Seeder 檔案結構
--------------

Seeder 檔案同樣包含 `up()` 和 `down()` 方法：

```js title="seeders/<TIMESTAMP>-demo-users.js"
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [
      {
        name: 'John Doe',
        email: 'john@example.com',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Jane Smith',
        email: 'jane@example.com',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
```

### 常用方法

- `bulkInsert(tableName, records, options)` - 批次新增資料
- `bulkDelete(tableName, where, options)` - 批次刪除資料
- `bulkUpdate(tableName, values, where, options)` - 批次更新資料



實用範例
-------

### 使用 Model 建立資料

```js
const { User } = require('../models');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await User.bulkCreate([
      { name: 'Admin', email: 'admin@example.com', role: 'admin' },
      { name: 'User', email: 'user@example.com', role: 'user' }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await User.destroy({ where: { email: ['admin@example.com', 'user@example.com'] } });
  }
};
```

### 條件式刪除

```js
module.exports = {
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', {
      email: { [Sequelize.Op.like]: '%@example.com' }
    }, {});
  }
};
```

### 關聯資料的 Seed

```js
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // 先建立 Users
    const users = await queryInterface.bulkInsert('Users', [
      { name: 'John', email: 'john@example.com', createdAt: new Date(), updatedAt: new Date() }
    ], { returning: true });

    // 再建立關聯的 Posts
    await queryInterface.bulkInsert('Posts', [
      {
        title: 'First Post',
        content: 'Hello World',
        userId: users[0].id,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Posts', null, {});
    await queryInterface.bulkDelete('Users', null, {});
  }
};
```



注意事項
-------

### Seeds 不會自動追蹤執行狀態

與 Migration 不同，Sequelize 預設不會追蹤哪些 Seeds 已經執行過。
這意味著執行 `db:seed:all` 可能會重複插入資料。

解決方案：
- 在 Seeder 中加入檢查邏輯，避免重複插入
- 使用 `db:seed:undo:all` 清空後再重新執行
- 考慮使用 [sequelize-cli-typescript](https://github.com/manuelbieh/sequelize-cli-typescript) 等擴充套件

### 生產環境使用建議

- Seeds 主要用於開發和測試環境
- 生產環境的初始資料建議透過 Migration 或專門的部署腳本處理
- 避免在生產環境執行 `db:seed:undo:all`，可能會清空重要資料



See Also
--------

### 相關文章

- [[Sequelize Migration]] - 資料庫結構變更管理

### Reference

- [Migrations | Sequelize](https://sequelize.org/docs/v6/other-topics/migrations/)
- [Query Interface | Sequelize](https://sequelize.org/docs/v6/other-topics/query-interface/)
- [Sequelize CLI Documentation](https://github.com/sequelize/cli)
