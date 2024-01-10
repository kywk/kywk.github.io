---
title: "NGINX: Let's Encrypt SSL"
tags: [Infra, NGINX]

created: 2021-04-25T20:40:21+08:00
image: "https://lh3.googleusercontent.com/pw/ACtC-3dlde6AddUGr3W5sFOvL0D8daOPkJQdjAiPB8u9xRorMWgPcie0_c6Gt7reWYvL9IMqe4M6NLpwn-FvoBAkNpmRWwZ0SrKJFibtnC6IxzmdSWEtY1u_dMmf4b0YnUewWCkHbEyWCd3Nzod1tiNwb0IiQQ=w800-no?authuser=0"
categories: [SRE]
---

[Nginx] 手動 Let's Encrypt SSL 憑證與設定
======================================

在 Google, Apple 等科技巨頭主導下, HTTPS 已成網站服務必備.
而合格 https CA 憑證的申請是要費用的, 因此出現 Let's Encrypt 這樣的服務.
Let's Encrypt 是由多家公司與非營利組織共同創立的數位憑證認證機構, 
目標就是要讓網站可以免費, 申請簡單與自動化流程的憑證服務.

網路上相當多 [Let’s Encrypt 憑證的申請教學](https://xenby.com/b/101-教學-申請lets-encrypt憑證與啟用https-nginx),
這些教學大多數都是利用官方 `certbot` 進行申請,
為了避免 `certbot` 版本不同的差異, 只要找篇近期一些的文章跟著作即可成功.

為確保所申請憑證的 DNS 確實為申請者擁有, 
`certbot` 自動更新時需要能透過標準 http request 存取驗證資訊,
網站管理員必須把 `certbot` 執行當下所產生的隨機碼放置網站上特定位置, 
以提供 Let's Encrypt 主機存取驗證.

而這次情況是專案主機所在網路防火牆封鎖對外的 80 Port, 
無法自動申請, 需手動申請憑證與驗證.


手動申請憑證
----------

手動下載 [certbot](https://certbot.eff.org), 放置主機上.
或利用套件管理安裝亦可.

手動申請指令與說明如下:

``` shell
$ ./certbot-auto certonly --manual --no-self-upgrade --dry-run --preferred-challenge dns -d www.abc.com 
```

-   `certonly --manual` 手動申請. 自行配置 HTTP 伺服器, 或 HTTP 伺服器在其他主機上.
-   `--no-self-upgrade` 不自動更新 certbot. 
    certbot 啟動時會先到 Server 檢查有沒有新版自動下載更新, 加上這個指令可強制不更新.
-   `--dry-run` 為避免濫用, Let's Encrypt 有驗證次數的限制, 加上 --dry-run 可以使用 stage 環境健行配置的測試.
    [官方文件在此](https://letsencrypt.org/docs/rate-limits/)

    There is a __Failed Validation__ limit of __5 failures__ per account, per hostname, per hour. 
    This limit is higher on our [staging environment](https://letsencrypt.org/docs/staging-environment/), 
    so you can use that environment to debug connectivity problems. 
    Exceeding the Failed Validations limit is reported with the error message `too many failed authorizations recently`.
-   `--preferred-challenge dns` Port 80 被封鎖無法從外部連入, 所以採用 DNS Record 驗證.
-   `-d www.abc.com` 最後這邊是自己的域名.

![](https://lh3.googleusercontent.com/pw/ACtC-3d-aDmRoy2x3HClJlSGM-Ho-8XfyqNcGoOfWrof5nxSIpGHLSt-YfZAhe1cDblZrANtXjWOdnQg2FhfY9Y1PYvjO3SvyiJI2YhCFjTLb1yMpczNcGkEDIlxFB2_2x6wZ40zvzSGhLfOAlWEyoYpsGY0-A=w644-h392-no?authuser=0)

輸入後 certbot 會產生一組需配置到 DNS TXT Record 的值.  
例如專案是利用 CloudFlare 當 DNS, 就在後台新增一組 TXT Record.

![](https://lh3.googleusercontent.com/pw/ACtC-3dhwYkZM8hVg9SYU9Rz4iPAK4F3sgvckO4QW2MtkUa2DpKEI_H7gyZWghuhmLwFLpgmaDY0WXur7ORh90E5j5bHdRGW01eyyeQM-h6mvkvteypJHwDnSdjZxOAvMOYRmtFEit3pLX3teKkaAWOBwH70UA=w795-h111-no?authuser=0)

設置好後按 Enter, Let's Encrypt 主機會去查 `_acme-challenge.www.abc.com` 的值, 
若相符則會核發對應的憑證.

取得憑證後即可把剛剛的 DNS Record 移除, 
畢竟下次申請時內容需要替換, 留著沒意義. 


Nginx 設定
---------

取得憑證後把相關憑證檔案放在 nginx 可以存取的資料夾下, 
修改 `/etc/nginx/sites-enabled/deafult` 
新增 SSL 憑證相關配置如下:

```
server{
  server_name www.abc.com;
  listen 8888 ssl;
  ssl_certificate /etc/letsencrypt/cert/www.abc.com/fullchain1.pem;
  ssl_certificate_key /etc/letsencrypt/cert/www.abc.com/privkey1.pem;
  ssl_dhparam /etc/ssl/certs/dhparams.pem;
  ssl_protocols SSLv3 TLSv1 TLSv1.1 TLSv1.2;
  ssl_ciphers HIGH:!aNULL:!MD5;
}
```

修改後重啟 Nginx 即可.

``` shell
$ sudo nginx -t
$ sudo nginx -s reload
```


See Also
--------

-   [[教學] 申請Let’s Encrypt憑證與啟用https (Nginx) | 辛比誌](https://xenby.com/b/101-教學-申請lets-encrypt憑證與啟用https-nginx)
-   [解析 Certbot（Let's encrypt） 使用方式 | DEVLOG of andyyou](https://andyyou.github.io/2019/04/13/how-to-use-certbot/)
-   [acme.sh 自動化申請和更新 Let's Encrypt 萬用 SSL 憑證教學 | KJie Notes](https://www.kjnotes.com/devtools/103)
-   [域名在80端口无法访问的情况下通过certbot生成证书_起梦成长的博客-CSDN博客](https://blog.csdn.net/qq_34083928/article/details/85044202)
