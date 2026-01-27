---
title: 'Ubuntu: NGINX + PHP'
tags:
  - Infrastructure
  - Linux/Ubuntu
  - NGINX
  - PHP
date_created: 2021-03-16T08:58:20.000Z
image: >-
  https://lh3.googleusercontent.com/pw/ACtC-3eEjuPzkzGlfvO-sUeB3BeuDd4MxMyUP2r4vJp53f2rK8p-vaRCNdC-UxOMDAQhANNfSTQr9fD4wJBSuDu3dXYIoMYDjaLJV6Np0KQZxnfY0VOm-JrNfVj_c0AjrP0jFEBKnJJrw8qAr8quoeHa5OuKJA=w750-h375-no?authuser=0
slug: /devsecops/infrastructure/ubuntu-nginx-php/
---

[Ubuntu] 利用 NGINX 伺服器執行 PHP 程式
====================================

長期以來 Apache Server 的效能與承載數低落, 加上層出不窮的漏洞, 
許多人陸續投向 Event-based Server 的懷抱, 例如 Nginx.

Nginx 是一個免費開源且穩定高效的 Web 伺服器程式, 擁有反向代理及負載平衡的功能, 
藉由 Non-blocking 與 epool 的特性, 大幅提昇了連線服務量與速度, 成為近年來最為廣泛運用的選擇.

但是 Nginx 只是單純的 HTTP Server, 如果要執行程式, 還得藉助 CGI 的幫忙.
Nginx 可以透過 FastCGI 去執行 PHP 程式, 且內建 FastCGI 快取功能.
而第一步需要實現的是如何讓 Nginx 正確的呼叫 PHP.

### CGI ###

CGI (Common Gateway Interface) 是用於網頁伺服器的介面標準, 
支援 CGI 的網頁伺服器會將其所接收到的 HTTP 請求的內容設成環境變數, 
作為某支程式時的環境變數以及標準輸入 (stdin) 輸入的資料.
而該程式標準輸出 (stdout) 的資料則會被網頁伺服器拿來回應給客戶端.

網頁伺服器每次使用 CGI 執行程式時, 都需要建立出新的行程 (fork process), 
就像在終端機直接用檔案路徑去執行某支程式.
可想而知, 這樣的方式在應付多個 HTTP 請求時是沒有效率的。

### FastCGI ###

FastCGI 則是在網頁伺服器和 CGI程式之間再加一個管理員.

網頁伺服器要把 HTTP 請求交給管理員處理, 管理員負責分配 CGI 程式的執行資源,
使系統不會每次遇到請求就開一個行程去跑 CGI 程式, 以改善運作效率.

### FPM(FastCGI Process Manager) ###

FPM(php-fpm) 是 PHP 目前的 FastCGI 實作.



Installation
------------

### Nginx ###

在 Ubuntu 上安裝 Nginx 和安裝其他軟體一樣, 直接透過 `apt` 安裝即可.

``` shell
$ sudo apt install nginx
```

Nginx 預設會啟用 HTTP, 佔用 TCP 連接埠為 HTTP 預設的 80.
可以使用以下指令來查看 Nginx 是否有確實安裝成功.

``` shell
$ sudo netstat -tlnp | grep nginx
```

![](https://lh3.googleusercontent.com/pw/ACtC-3dV-nWgkfyACFUd4j0DDN0tmvWuOrhO8zprZsVWg7MbXfwzDYPOzYQtdvB0cqqPozf_-yzMW55AfkWGDc0sbFfm19rltX5FBkYcCP-qZ4T2JCl5auRbEaftoxXWyAKw5p4oIaCCGdpZGFuLr-vAcpO0Gg=w1214-h130-no?authuser=0)
如上圖, 如果有看到連接埠 80 有被監聽, 就表示 Nginx 安裝成功.

Nginx 所以監聽任意網路介面上的 80 連接埠, 是因為預設的設定檔 `(/etc/nginx/sites-available/default)` 中, 
有設一個會去監聽任意網路介面, 且連接埠為 80 的 __虛擬主機 (Virtual Host)__.
有關於 Nginx 進一步的設定與配置說明, 可以參考
[使用Ubuntu Server架設Nginx伺服器 | MagicLen](https://magiclen.org/ubuntu-server-nginx/)

### PHP ###

PHP 是腳本式程式語言, 需要有 PHP 執行環境才可以被執行.

``` shell
$ sudo apt install php-cli
```

安裝完 `php-cli` 套件後, 可以使用 `php` 指令來執行 PHP 程式.

-   查看 PHP 的版本:

    ``` shell
    $ php -v
    ```
    ![](https://lh3.googleusercontent.com/pw/ACtC-3eYw_TsLcSEZ9pglabIbB0nJqs0KKJNq9y9qjjhZgWAAxpQ2LdxFH0eGKnc1Tjsr9h_0lDQhgYKvfGp0XSovF8ZsNVLA5IOJHWxZvjL1M_5YZWlbORRURJDRo7LkpWc-r9QB18sx9aYqDVEoF0Qms0jnQ=w802-h172-no?authuser=0)

-   執行 PHP 程式:
    ![](https://lh3.googleusercontent.com/pw/ACtC-3eOPeyqs8L6qvl7AxoPmInMY2pLWaoHAys9miug_nA6ACVhHqGbeHiBduAsPlWu_Rtb7iL-q4fM_2v25jmURV33rzqQvaxCRDHhshKE3RLSNlDAV8ESb4iy59NV7sbosIDFrpnSU7u3rHyNBK_Mktb50w=w784-h326-no?authuser=0)

`php` 設定檔的路徑是 `/etc/php/<PHP版本號碼>/cli/php.ini`,
詳細設定說明可參考官方文件或 [使用Ubuntu Server透過Nginx伺服器執行PHP程式 | MagicLen](https://magiclen.org/ubuntu-server-nginx-php/).

### PHP-FPM ###

``` shell
$ sudo apt install php-fpm
```

FPM 預設只會監聽 Unix Domain Socket(UDS，或稱 IPC Socket), UDS 檔案路徑為 `/run/php/php<PHP版本號碼>-fpm.sock`. 
例如 PHP 7.4 UDS 檔案路徑就是 `/run/php/php7.4-fpm.sock`.

如果要確認 FPM 有沒有安裝並啟用成功, 可以利用 `socat` 這個指令工具來進行.
安裝 socat：

``` shell
$ sudo apt install socat
```

執行以下指令來判斷 FPM 是否正常工作:

``` shell
$ echo /dev/null | sudo socat unix:/var/run/php/php-fpm.sock - && echo "Working!" || echo "Not working!"
```
![](https://lh3.googleusercontent.com/pw/ACtC-3fQR-dRGQoBBDsbMbaJLBMuWu4qRTgsg6AVJaQ8nxsL1268iPR1UTrC3-4EhX8IQee8-v0rWO_ZAhvMja7kwfLB0UcnMwu24oRcChfdJ2FkzNWfe7vxR2p9EIZtf5c5WqaeD7X-PzxQGewrE7qp8A7bXw=w928-h128-no?authuser=0)



Configuration
-------------

### Nginx ###

順利安裝完之後開始修改 Nginx Server 設定檔, 如下:

``` shell
$ sudo vim /etc/nginx/nginx.conf
```

```
user www-data;
worker_processes auto;
pid /run/nginx.pid;
include /etc/nginx/modules-enabled/*.conf;

events {
    use epoll;
    worker_connections 2048;
}

http {
    sendfile on;
    tcp_nopush on;
    tcp_nodelay on;
    keepalive_timeout 65;
    types_hash_max_size 2048;
    server_tokens off;

    include /etc/nginx/mime.types;
    default_type application/octet-stream;

    ssl_protocols TLSv1 TLSv1.1 TLSv1.2 TLSv1.3; # Dropping SSLv3, ref: POODLE
    ssl_prefer_server_ciphers on;

    access_log /var/log/nginx/access.log;
    error_log /var/log/nginx/error.log;

    gzip on;

    include /etc/nginx/conf.d/*.conf;
    include /etc/nginx/sites-enabled/*;
}
```

幾個重要的參數:
-   __user__: Nginx Server 啟動所使用的使用者 (ubuntu 預設用 www-data)
-   __pid__: ProcessID 存放位置 ( ubuntu 預設在 /run/nginx.pid)
-   __worker_processes__: 開啟的程序數量, 請對應 CPU 核心數進行調整, 或維持預設的 auto
-   __use epoll__: 啟動 epoll 會快很多，效果不錯
-   __worker_connections__: 每個程序最高可以開啟的連線數
-   __server_tokens off__: 移除 Nginx 版本資訊
-   __access_log, error_log__: HTTP Log 存放的位置

上面是 Ngnix Server 整體的設定, 接下來要進行 Virtual Host 配置.

``` shell
$ sudo vim /etc/nginx/sites-available/default
```

```
server {
    listen 80 default_server;
    listen [::]:80 default_server;

    root /var/www/html;

    # Add index.php to the list if you are using PHP
    index index.html index.htm index.php index.nginx-debian.html;

    server_name _;

    # set expiration of assets to MAX for caching
    location ~* \.(ico|css|js|gif|jpe?g|png|ogg|ogv|svg|svgz|eot|otf|woff)(\?.+)?$ {
        expires max;
        log_not_found off;
    }

    # framework rewrite
    location / {
        try_files $uri $uri/ /index.php =404;
    }

    # pass PHP scripts to FastCGI server
    location ~* \.php$ {
        #include snippets/fastcgi-php.conf;
        fastcgi_pass 127.0.0.1:9000;
        fastcgi_index index.php;
        fastcgi_split_path_info ^(.+\.php)(.*)$;
        include fastcgi_params;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
    }
}
```

幾個參數設定說明:
-   __server_name__: 同 Apache ServerName 可以用來指定 Virtual Host (虛擬主機)
-   __root__: 網頁所擺放的位置
-   __location /__ Selection (framework rewrite): 
    用 `try_files $uri $uri/ /index.php;` 來嘗試讀取開啟.
    如果檔案不存在就轉為呼叫 index.php.
    做的事情與常用的 Apache Rewrite Module 差不多.
    主要是為了將 Request 導給 Framework (如 Codeigniter, Zend Framework 等等),
    若沒有使用 PHP Framwwork, 可以無須設定.
-   __location ~ \.php$__ Selection (pass PHP scripts to FastCGI server):
    設定要將 `.php` 檔案直接交由 FPM 來處理.
    詳細的設定說明可以參考 [Nginx WIKI](https://www.nginx.com/resources/wiki/).
    -   __fastcgi_pass__ 指向 PHP-FPM 開啟的服務位置, 需和後面的 PHP-FPM 設定相同,

### 設定 FPM ###

FPM 設定檔放置於 `/etc/php/<PHP版本號碼>/fpm/` 目錄下, 
例如 PHP 7.4 就是在 `/etc/php/7.4/fpm/` 目錄.

FPM 設定檔目錄中有個 `pool.d` 目錄, 用來放置每個「池」 (Pool) 的設定檔.
一個池就是一個 FastCGI 的管理區域 (或者說管理員). 
預設為 `www` 池, 設定檔檔名為 `www.conf`:

``` shell
$ sudo vim /etc/php/7.4/fpm/pool.d/www.conf
```

``` ini
[www]
user = www-data
group = www-data
 
listen = 127.0.0.1:9000
listen.backlog = 65535
listen.owner = www-data
listen.group = www-data
 
request_terminate_timeout = 600s
 
pm = dynamic
pm.max_children = 5
pm.start_servers = 2
pm.min_spare_servers = 1
pm.max_spare_servers = 3
```

-   __listen__: 設定從哪個地方接收 Nginx fastcgi_pass 請求, 要和前面 Nginx 的設定相同.
    預設是 `/run/php/php<PHP版本號碼>-fpm.sock`.
    PHP-FPM 可以透過 TCP Socket 或者是 UNIX Kernel Socket.
    Kernel Socket 速度會比較快, 但是經過壓力測試後 Kernel Socket 反而常常掉包, 
    穩定性不如 TCP Socket 來的優異. 故這邊設為本地端的 TCP Socket.
-   __request_terminate_timeout__: 設定表示 PHP 的執行時間, 超過這個週期就會結束.
    設太短容易遇到檔案上傳時間比較久就 GG 了.
-   __pm__: 設定子行程的數量要固定還是浮動. 
    -   static 是固定為最大數量(pm.max_children).
    -   dynamic 是動態調整, 預設是 dynamic.
    -   ondemand 是行程開完就關.
-   __pm.max_children__: 設定子行程的最大數量, 預設是5.
    這個數量建議設為處理器的數量再根據每個子行程的記憶體用量乘上某個倍數 (例如記憶體剩得少就乘2，記憶體剩得多就乘4).

### Start Nginx + PHP ###

最後啟動 Nginx 與 PHP-FPM 服務:

``` shell
$ sudo service php7.4-fpm restart
$ sudo service nginx restart
```

開啟瀏覽器試看看, Ubuntu 裝起來的 Nginx Welcome 畫面如下：

![](https://lh3.googleusercontent.com/pw/ACtC-3euV0DG5x_6NEszyLYrW1cW8cFj6p7qapfHbldw0am_PCAEX3lYENsxrPIBCA4gCCt37f-GBJv5Gs6138SYf8sf4l_wmKGbv1HbnmUH-q8uUWMHCnZ7cylYvCLxiXSwrzIgQ3K2EgX8Ido8J0jd0ZTbLw=w1088-h508-no?authuser=0)


See Also
--------

整體來說 Nginx 安裝蠻容易的, 但要調校的好又是另外一件事.
設定的不洽當, 在高流量時 Nginx 常會送你 502 Bad Gateway.

又例如 Nginx 可以將 FastCGI 服務回應的資料快取成檔案, 
這樣下次如果又有一樣的請求，Nginx 就直接從檔案系統中撈出來回應，
不必再轉送給 FastCGI 服務處理, 可加快反應.
Cache 的設置相當考驗 SRE 對 PHP 服務了解程度, 並非所有服務都適合開設 Cache.
這另篇再討論了.

需要花蠻多時間嘗試調整參數, 搭配效能測試工具來檢查, 讓伺服器發揮最大效用.

-   [使用Ubuntu Server透過Nginx伺服器執行PHP程式 | MagicLen](https://magiclen.org/ubuntu-server-nginx-php/)
-   [無堅不摧，唯快不破！快改用 Nginx + PHP-FPM 取代 Apache 吧！ - Soul & Shell Blog](https://blog.toright.com/posts/3890/無堅不摧，唯快不破！快改用-nginx-php-fpm-取代-apache-吧！.html)
-   [[教學] 安裝LEMP(Linux+Nginx+Mysql+PHP)環境 | 辛比誌](https://xenby.com/b/137-教學-安裝lemplinuxnginxmysqlphp環境)
