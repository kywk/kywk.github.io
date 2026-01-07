---
sidebar_position: 0
title: Awesome OpenAPI
description: OpenAPI 規範相關工具與資源整理
tags:
  - OpenAPI
  - API
  - Documentation
  - Tools
date_created: 2025-01-13T00:00:00.000Z
date_updated: 2025-01-13T00:00:00.000Z
slug: /techstack/openapi/awesome-openapi/
---

# Awesome OpenAPI Resources

OpenAPI 規範 (原 Swagger) 相關工具、資源與最佳實踐整理。

## 官方資源

### 核心規範
- [OpenAPI Specification](https://spec.openapis.org/oas/latest.html) - 官方規範文件
- [OpenAPI Initiative](https://www.openapis.org/) - 官方組織
- [Swagger.io](https://swagger.io/) - Swagger 官方網站

### 官方工具
- [Swagger UI](https://swagger.io/tools/swagger-ui/) - API 文件展示工具
- [Swagger Editor](https://editor.swagger.io/) - 線上編輯器
- [Swagger Codegen](https://swagger.io/tools/swagger-codegen/) - 程式碼生成器

## 開發工具

### 編輯器與 IDE
- [Swagger Editor](https://editor.swagger.io/) - 官方線上編輯器
- [Stoplight Studio](https://stoplight.io/studio/) - 視覺化 API 設計工具
- [Insomnia Designer](https://insomnia.rest/products/designer) - API 設計工具
- [VSCode OpenAPI Extension](https://marketplace.visualstudio.com/items?itemName=42Crunch.vscode-openapi) - VSCode 擴充套件

### API 客戶端
- [[API Client Tools Comparison]] - API 客戶端工具比較
- [[Insomnia Plugin Development]] - Insomnia 外掛開發

### 模擬與測試
- [Prism](https://stoplight.io/open-source/prism) - API 模擬伺服器
- [Dredd](https://dredd.org/) - API 測試工具
- [Schemathesis](https://schemathesis.readthedocs.io/) - 基於屬性的測試

## 程式碼生成

### 多語言支援
- [OpenAPI Generator](https://openapi-generator.tech/) - 多語言程式碼生成器
- [Swagger Codegen](https://swagger.io/tools/swagger-codegen/) - 官方程式碼生成器

### 特定語言
- **JavaScript/TypeScript**: [openapi-typescript](https://github.com/drwpow/openapi-typescript)
- **Java**: [Spring Boot OpenAPI](https://springdoc.org/)
- **Python**: [FastAPI](https://fastapi.tiangolo.com/) - 原生支援 OpenAPI
- **Go**: [oapi-codegen](https://github.com/deepmap/oapi-codegen)

## 文件生成

### 靜態文件
- [Redoc](https://redoc.ly/) - 美觀的 API 文件
- [Slate](https://github.com/slatedocs/slate) - 靜態文件生成器
- [GitBook](https://www.gitbook.com/) - 文件平台

### 互動式文件
- [Swagger UI](https://swagger.io/tools/swagger-ui/) - 官方互動式文件
- [RapiDoc](https://rapidocweb.com/) - 輕量級互動式文件
- [Elements](https://stoplight.io/open-source/elements) - Stoplight 開源組件

## 驗證與品質

### 規範驗證
- [Spectral](https://stoplight.io/open-source/spectral) - OpenAPI 規範檢查器
- [swagger-parser](https://github.com/APIDevTools/swagger-parser) - JavaScript 解析器
- [openapi3](https://github.com/Nexmo/openapi3) - Python 驗證器

### API 品質檢查
- [42Crunch API Security Audit](https://42crunch.com/) - API 安全檢查
- [Insomnia CLI](https://docs.insomnia.rest/inso-cli/introduction) - 命令列工具

## 逆向工程

### 從現有 API 生成規範
- [mitmproxy2swagger](https://github.com/alufers/mitmproxy2swagger) - 從 HAR 檔案生成 OpenAPI
- [API Parrot](https://github.com/apiparrot/apiparrot) - 自動逆向工程 REST API
- [har-to-openapi](https://github.com/jonluca/har-to-openapi) - HAR 轉 OpenAPI

## 最佳實踐

### 設計原則
- RESTful API 設計規範
- 版本控制策略
- 錯誤處理標準化
- 安全性考量

### 組織與維護
- 模組化設計 (多檔案結構)
- 元件重用 ($ref)
- 文件即程式碼 (Docs as Code)
- CI/CD 整合

## 工具集合

### 綜合資源
- [OpenAPI.Tools](https://openapi.tools/) - 開源工具清單
- [APIs.guru](https://apis.guru/) - 公開 API 規範收集
- [Public APIs](https://github.com/public-apis/public-apis) - 公開 API 清單

## See Also

### 相關技術
- [GraphQL](https://graphql.org/) - 另一種 API 查詢語言
- [gRPC](https://grpc.io/) - 高效能 RPC 框架
- [AsyncAPI](https://www.asyncapi.com/) - 非同步 API 規範

### 學習資源
- [OpenAPI 3.0 Tutorial](https://support.smartbear.com/swaggerhub/docs/tutorials/openapi-3-tutorial.html)
- [API Design Guide](https://cloud.google.com/apis/design) - Google API 設計指南
- [RESTful API Design Best Practices](https://restfulapi.net/) - REST API 設計最佳實踐

### 新聞與趨勢
- [可以吃 HAR 檔把 API 的規格 (Swagger) 寫出來的 mitmproxy2swagger – Gea-Suan Lin's BLOG](https://blog.gslin.org/archives/2025/01/03/12178/)
- [Show HN: API Parrot – Automatically Reverse Engineer HTTP APIs | Hacker News](https://news.ycombinator.com/item?id=42565821)
- [MitmProxy2Swagger: Automagically reverse-engineer REST APIs | Hacker News](https://news.ycombinator.com/item?id=42572662)