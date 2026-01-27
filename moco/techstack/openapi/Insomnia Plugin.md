---
title: Insomnia Plugin Development
description: Insomnia 外掛程式開發指南
tags:
  - OpenAPI
  - API Client
  - Plugin Development
  - Insomnia
sidebar_position: 70
date_created: 2022-11-06T04:01:39.000Z
date_updated: 2025-01-13T00:00:00.000Z
image: >
  https://lh3.googleusercontent.com/pw/AM-JKLU2Ot2TyON1chUA-Qw7qj-OQSRMYNin7jsJsUa3E_jwqq1JbwTZZckUtJmNZmqxY5M4egm-ryt4g3Ope_0EqHBrCDSEHmcy-goHRzWh-ZgguUoy1XKpyS1DNx8aV92vAkAM0zZOW6EZR4KS3W1DClQKhw=w800-no?authuser=0
slug: /techstack/openapi/insomnia-plugin/
---

# Insomnia Plugin Development

Insomnia 支援外掛程式系統擴充功能，使用者可以從 [Plugin Hub](https://insomnia.rest/plugins) 瀏覽社群開發的外掛程式。

## 外掛程式類型

### Request Hooks
- **Before Send**: 請求傳送前的處理
- **After Response**: 回應接收後的處理

### Template Tags
- 動態值生成
- 環境變數處理
- 加密解密功能

### Themes
- 自訂介面主題
- CSS 樣式調整

## 開發環境設定

### 專案結構

```
my-insomnia-plugin/
├── package.json
├── main.js
└── README.md
```

### package.json 設定

```json
{
  "name": "insomnia-plugin-my-plugin",
  "version": "1.0.0",
  "description": "My Insomnia Plugin",
  "main": "main.js",
  "insomnia": {
    "name": "my-plugin",
    "description": "Plugin description"
  }
}
```

## 外掛程式範例

### Template Tag 範例

```javascript
module.exports.templateTags = [{
  name: 'timestamp',
  displayName: 'Timestamp',
  description: 'Generate current timestamp',
  args: [
    {
      displayName: 'Format',
      type: 'enum',
      options: [
        { displayName: 'Unix', value: 'unix' },
        { displayName: 'ISO', value: 'iso' }
      ]
    }
  ],
  async run(context, format) {
    const now = new Date();
    return format === 'unix' ? 
      Math.floor(now.getTime() / 1000) : 
      now.toISOString();
  }
}];
```

### Request Hook 範例

```javascript
module.exports.requestHooks = [
  {
    hook: 'beforeSendRequest',
    async action(context) {
      // 在請求傳送前添加或修改 headers
      context.request.setHeader('X-Custom-Header', 'value');
    }
  }
];
```

## 安裝與測試

### 本地開發

1. 在 Insomnia 中開啟 Preferences
2. 選擇 Plugins 頁籤
3. 點擊 "Reveal Plugins Folder"
4. 將外掛程式複製到該目錄
5. 重新啟動 Insomnia

### 發佈到 npm

```bash
# 發佈到 npm registry
npm publish

# 在 Insomnia 中安裝
npm install insomnia-plugin-my-plugin
```

## 最佳實踐

### 錯誤處理
- 使用 try-catch 包裝非同步操作
- 提供有意義的錯誤訊息
- 避免外掛程式崩潰影響 Insomnia

### 效能考量
- 避免長時間的同步操作
- 使用快取機制
- 減少不必要的 API 呼叫

### 使用者體驗
- 提供清楚的參數說明
- 使用直覺的參數名稱
- 提供預設值

## See Also

### 官方文件
- [Introduction to Plugins | Insomnia Docs](https://docs.insomnia.rest/insomnia/introduction-to-plugins)
- [Plugin API Reference](https://docs.insomnia.rest/insomnia/plugin-apis)

### 開發教學
- [Building custom insomnia plugin. The goal of this project is to build… | by Alex Laptseu | Medium](https://medium.com/@aliaksandr.laptseu/building-custom-insomnia-plugin-e120f8756cf4)
- [How I Built My Own Insomnia Plugin | by Tyler Hawkins | Better Programming](https://betterprogramming.pub/how-i-built-my-own-insomnia-plugin-56ebb9dba5f)

### 相關資源
- [[API Client Tools Comparison]] - API 客戶端工具比較
- [[Awesome OpenAPI]] - OpenAPI 工具整理