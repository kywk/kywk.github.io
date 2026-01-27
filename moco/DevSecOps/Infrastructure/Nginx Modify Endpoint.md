---
title: 'NGINX: changes URI'
description: NGINX changes endpoint
tags:
  - Infrastructure
  - NGINX
hide_table_of_contents: true
date_created: 2023-01-04T00:00:00.000Z
date_updated: 2023-01-04T00:00:00.000Z
image: >-
  https://lh3.googleusercontent.com/pw/AL9nZEUA9Ifvd5Z8SXDWkeVB6AC4MPGwnXaL6kBXNPoXwOQQ2jOcZ1Jw_0p8TKK8C3ZX0e67_FOY15eDrm7aaXSQJcKtoUzC80SAQEHsaBy6qS2AqNNs5VUFNXBKm439y_1wkvmDl-PnL8ReojnIumNlEvOXBg=w800-no?authuser=0
slug: /devsecops/infrastructure/nginx-modify-endpoint/
---

[NGINX] URL redirect / rewrite / proxy_pass
===========================================

## Summary

Nginx 提供三種主要的 URL 修改方法：

- **Redirect (301/302)**: 瀏覽器重定向，URL 會改變，適用於網站遷移、SEO 優化
- **Rewrite**: 伺服器內部重寫，URL 不變，適用於 URL 美化、路由處理
- **Proxy Pass**: 反向代理轉發，適用於微服務架構、負載平衡

## Best Practices

### 使用情境選擇

| 方法 | 使用時機 | 優點 | 缺點 |
|------|----------|------|------|
| **Redirect** | 網站遷移、強制 HTTPS、SEO 重定向 | 瀏覽器快取、SEO 友善 | 額外 HTTP 請求 |
| **Rewrite** | URL 美化、內部路由、參數轉換 | 透明處理、效能佳 | 除錯困難 |
| **Proxy Pass** | 微服務、負載平衡、API Gateway | 靈活路由、服務分離 | 網路延遲 |

### 效能考量

```nginx
# 優先使用 return 而非 rewrite 進行重定向
# GOOD - 效能較佳
location /old-site {
    return 301 https://new-site.com$request_uri;
}

# AVOID - 效能較差
location /old-site {
    rewrite ^(.*)$ https://new-site.com$1 permanent;
}
```

### 安全性建議

```nginx
# 限制 rewrite 規則的複雜度
location ~ ^/user/([a-zA-Z0-9_-]+)$ {
    # 使用嚴格的正則表達式
    rewrite ^/user/([a-zA-Z0-9_-]+)$ /profile.php?user=$1 last;
}

# 避免在 if 中使用複雜邏輯
# 使用 map 替代複雜的 if 判斷
map $request_uri $new_uri {
    ~^/old/(.+)$ /new/$1;
    default "";
}
```

### 維護性原則

```nginx
# 使用註解說明複雜規則
location /api {
    # 將 v1 API 重定向到 v2，保持向後相容
    rewrite ^/api/v1/(.*)$ /api/v2/$1 last;
    proxy_pass http://api-backend;
}

# 將相關規則分組
# API 路由
location /api/v1 { proxy_pass http://api-v1; }
location /api/v2 { proxy_pass http://api-v2; }

# 靜態資源
location /assets { expires 1y; }
location /images { expires 30d; }
```

Redirect (301/302)
------------------

重定向是將用戶請求導向到不同的 URL，瀏覽器會顯示新的網址。

### Basic Redirects

```nginx
# Permanent redirect (301) - 永久重定向
server {
    listen 80;
    server_name old-domain.com;
    return 301 https://new-domain.com$request_uri;
}

# Temporary redirect (302) - 臨時重定向
location /old-path {
    return 302 /new-path;
}

# Redirect with query parameters - 保留查詢參數的重定向
location /search {
    return 301 /new-search?$args;
}
```

### Conditional Redirects

```nginx
# Redirect based on user agent - 根據用戶代理重定向
if ($http_user_agent ~* "bot|crawler|spider") {
    return 301 /robots.txt;
}

# Redirect based on request method - 根據請求方法重定向
if ($request_method = POST) {
    return 405;
}

# Redirect HTTP to HTTPS - HTTP 強制轉 HTTPS
if ($scheme != "https") {
    return 301 https://$server_name$request_uri;
}
```

Rewrite Rules
-------------

重寫規則是在伺服器內部修改 URL，不會改變瀏覽器中的網址。

### Basic Rewrite

```nginx
# Simple rewrite - 簡單重寫
location /old {
    rewrite ^/old/(.*)$ /new/$1 last;
}

# Rewrite with break - 使用 break 停止繼續處理
location /api {
    rewrite ^/api/v1/(.*)$ /v2/$1 break;
    proxy_pass http://backend;
}

# Internal rewrite (no redirect) - 內部重寫（不重定向）
location /products {
    rewrite ^/products/([0-9]+)$ /product.php?id=$1 last;
}
```

### Advanced Rewrite Patterns

```nginx
# Multiple capture groups - 多個捕獲群組
location /user {
    rewrite ^/user/([^/]+)/profile/([0-9]+)$ /profile.php?user=$1&id=$2 last;
}

# Optional parameters - 可選參數
location /blog {
    rewrite ^/blog/([0-9]{4})/([0-9]{2})/(.+)$ /blog.php?year=$1&month=$2&slug=$3 last;
    rewrite ^/blog/(.+)$ /blog.php?slug=$1 last;
}

# Case insensitive matching - 不區分大小寫的匹配
location ~* /API {
    rewrite ^/api/(.*)$ /api.php?path=$1 last;
}
```

Proxy Pass
----------

代理轉發是將請求轉發到後端伺服器，常用於反向代理和負載平衡。

### Basic Proxy

```nginx
# Simple proxy - 簡單代理
location /api {
    proxy_pass http://backend-server:8080;
}

# Proxy with path modification - 修改路徑的代理
location /api/v1/ {
    proxy_pass http://backend-server:8080/;
}

# Proxy to different path - 代理到不同路徑
location /old-api/ {
    proxy_pass http://backend-server:8080/new-api/;
}
```

### Proxy with Headers

```nginx
# 設定代理標頭，保留原始請求資訊
location /api {
    proxy_pass http://backend;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}
```

### Load Balancing

```nginx
# 定義上游伺服器群組
upstream backend {
    server backend1.example.com:8080;
    server backend2.example.com:8080;
    server backend3.example.com:8080;
}

# 使用負載平衡
location /api {
    proxy_pass http://backend;
}
```

Combined Techniques
-------------------

組合技術可以同時使用多種方法來處理複雜的路由需求。

### Rewrite + Proxy

```nginx
# Rewrite then proxy - 先重寫再代理
location /old-api {
    rewrite ^/old-api/(.*)$ /new-api/$1 break;
    proxy_pass http://backend-server;
}

# Multiple rewrites with proxy - 多重重寫搭配代理
location /service {
    rewrite ^/service/v1/(.*)$ /api/v2/$1 break;
    rewrite ^/service/legacy/(.*)$ /api/v1/$1 break;
    proxy_pass http://backend;
}
```

### Path-based Routing

```nginx
# Route different paths to different backends - 根據路徑路由到不同後端
location /auth/ {
    proxy_pass http://auth-service/;
}

location /users/ {
    proxy_pass http://user-service/;
}

location /orders/ {
    proxy_pass http://order-service/;
}
```

Common Patterns
---------------

常見的應用模式和實務上的使用情境。

### API Versioning

```nginx
# Default to latest version - 預設使用最新版本
location /api {
    rewrite ^/api/(.*)$ /api/v2/$1 last;
}

# Specific version routing - 特定版本路由
location /api/v1 {
    proxy_pass http://api-v1-backend;
}

location /api/v2 {
    proxy_pass http://api-v2-backend;
}
```

### Subdomain Routing

```nginx
# Route subdomains to different paths - 子網域路由
server {
    server_name ~^(?<subdomain>.+)\.example\.com$;
    location / {
        proxy_pass http://backend/$subdomain;
    }
}
```

### Mobile Detection

```nginx
# Redirect mobile users - 行動裝置偵測與重定向
set $mobile_rewrite do_not_perform;

if ($http_user_agent ~* "(android|bb\d+|meego).+mobile|avantgo|bada/") {
    set $mobile_rewrite perform;
}

if ($mobile_rewrite = perform) {
    rewrite ^ https://m.example.com$request_uri redirect;
}
```

Troubleshooting
---------------

除錯和常見問題的解決方法。

### Debug Rewrite Rules

```nginx
# Enable rewrite log - 啟用重寫日誌
error_log /var/log/nginx/error.log notice;
rewrite_log on;

# Test configuration - 測試配置
# nginx -t
```

### Common Issues

```nginx
# Avoid infinite loops - 避免無限迴圈
location /redirect {
    # BAD: causes infinite loop - 錯誤：造成無限迴圈
    # rewrite ^/redirect/(.*)$ /redirect/new/$1 last;
    
    # GOOD: use different path - 正確：使用不同路徑
    rewrite ^/redirect/(.*)$ /new-redirect/$1 last;
}

# Handle trailing slashes - 處理結尾斜線
location /api {
    rewrite ^/api/(.*)$ /api/$1/ last;
    proxy_pass http://backend/;
}
```

See Also
--------

- [How to Create NGINX Rewrite Rules | NGINX](https://www.nginx.com/blog/creating-nginx-rewrite-rules/)
- [Nginx Rewrite URL Rules Examples | DigitalOcean](https://www.digitalocean.com/community/tutorials/nginx-rewrite-url-rules)
- [Nginx reverse proxy + URL rewrite - Server Fault](https://serverfault.com/questions/379675/nginx-reverse-proxy-url-rewrite)
- [Nginx如何進行轉址？ | MagicLen](https://magiclen.org/nginx-rewrite/)
- [Rewrite vs Redirect NGINX - Ubiq BI](https://ubiq.co/tech-blog/rewrite-vs-redirect-nginx/)
