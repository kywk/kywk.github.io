---
#id: kywk-moco
title: "Note: shadowsocks setup"
description: shadowsocks setup
tags: [Mac]

sidebar_position: 60
#sidebar_label: Easy
#sidebar_class_name: green

#hide_table_of_contents: true

created: 2021-03-15T15:33:18+08:00
image: "https://lh3.googleusercontent.com/pw/ACtC-3d0i64fe-5XcNdEIkJXE_ucdKG_74gSGLz5YO2oik795zztBL7450Ff7dEQpMGRBXf7RKVteWTfqKM_efzjXja7JGyS3ZCUoPfkPJN61wfga53Tgo8mcFyWOFi_68TDQUZyNIvhEaUPyKPzgWAWHbwOHA=w1280-h720-no?authuser=0"
---

[Mac] shadowsocks setup 
=======================

因大陸案子關係, 接觸了些大陸網路環境, 也因此接觸到 shadowsocks.  
[Shadowsocks（簡稱SS）](https://zh.wikipedia.org/wiki/Shadowsocks) 
是一種基於Socks5代理方式的加密傳輸協定, 也可以指實現這個協定的各種開發包.
在中國大陸, SS 廣泛用於突破防火長城（GFW）, 以瀏覽被封鎖, 遮蔽或干擾的內容.

Shadowsocks 需找個 VPS 跑 server, 再透過本地端 client 連線.
server 端的設定這篇不談, 僅紀錄 macOS 上安裝與設定 client 的過程.



安裝 shadowsocks-libev
----------------------

Shadowsocks 有不少 client 可用, 我選用 shadowsocks-libev. 
他可以當系統服務, 也可以透過不少 plugin 來擴充功能, 相當強大方便.

透過套件管理工具 homebrew 即可安裝 shadowsocks-libev.

``` shell
$ brew update
$ brew install shadowsocks-libev
...
To have launchd start shadowsocks-libev now and restart at login:
  brew services start shadowsocks-libev
Or, if you don't want/need a background service you can just run:
  /usr/local/opt/shadowsocks-libev/bin/ss-local -c /usr/local/etc/shadowsocks-libev.json
```

出現後面這些訊息表示安裝成功, 先透過 CLI 確認 SS 連線可以正確 work.

``` shell
$ ss-local -s <SERVER_IP> -p <SERVER_PORT> -k <PASSWORD> -b 0.0.0.0 -l 1080-m aes-256-gcm


 2021-03-15 17:28:36 INFO: initializing ciphers... aes-256-gcm
 2021-03-15 17:28:36 INFO: listening at 0.0.0.0:1080
```

出現 `listening at 0.0.0.0:1080` 表示 SS 連線成功, 
可參考後面段落設置 Socks Proxy, 連線上網確認是否正確.



設定 shadowsocks-libev
----------------------

shadowsocks-libev 可以服務方式運行, 
配置文件在 `/usr/local/etc/shadowsocks-libev.json`

``` json
{
    "server":"abc.xyz.com",
    "server_port":8888,
    "local_port":1080,
    "password":"AbCdEfGhIjKlMn",
    "timeout":5,
    "method":"chacha20-ietf-poly1305",
    "mode":"tcp_and_udp",
} 
```

修改後可透過 brew services 啟動服務.

``` shell
$ brew services start shadowsocks-libev 
==> Successfully started `shadowsocks-libev` (label: homebrew.mxcl.shadowsocks-libev)
```



全區代理設定
----------

macOS 可透過全區代理的方式, 讓所有連線都使用 SS 當跳板. 設定方式在:
`系統偏好設定 > 網路 > Wi-Fi > 進階 > 代理`

![](https://lh3.googleusercontent.com/pw/ACtC-3du9pQkxgcpbedOxgve86--0UEyEQFCL63vTq-lq2xKJTunRbwdnK9KYniQK3fCcgXeYznijbOQjGTEowRbOwhgbYrILrh1NIsfm_6vskx_413Bt8-s8dVsoJP1LETT0NuInrjXbT_AiYnTEbe2IDEkuQ=w1336-h1154-no?authuser=0)

![](https://lh3.googleusercontent.com/pw/ACtC-3fnJwLdyl7XqvApKymmHyElVZckPBgMyCaTeSEdmX-mCrTRh3XzRP8z0g9DUcbb0dOkMSTVIXNBqfJZcfwgwaNygIE0vAFjcIkj-Rq8tdVAKGmtodCz-Wc9vnjWPB0zEcaLcDm3UFMe4gpfpMKGEWTFig=w1336-h1154-no?authuser=0)

在 SOCKS 欄位填上本地端對應的資訊即可.



快速開關代理
----------

一般來說不會設定為全區代理, 會透過 PAC 來設定白名單等自動代理. 
但我個人需求比較簡單, 需要處理公務時開啟代理連線管理後台, 處理完畢即可關閉代理.

因此設定了簡單的 alias, 透過 CLI 來快速開關代理. 

``` bash
alias proxyon='brew services restart shadowsocks-libev; networksetup -setsocksfirewallproxy wi-fi localhost 1080'
alias proxyoff='brew services stop shadowsocks-libev; networksetup -setsocksfirewallproxystate wi-fi off'
```

之後需要連線後台時, 在 Ternimal 打 `poxyon` 即可透過代理連線.

``` shell
$  proxyon

==> Successfully started `shadowsocks-libev` (label: homebrew.mxcl.shadowsocks-libev)
```

處理完畢後, 打 `proxyoff` 關閉代理, 回到原生網魯環境.

``` shell
$ proxyoff

Stopping `shadowsocks-libev`... (might take a while)
==> Successfully stopped `shadowsocks-libev` (label: homebrew.mxcl.shadowsocks-libev)
```



See Also
--------

### Reference ###

-   [MacOS使用shadowsocks-libev+Simple-OBFS教程 - YAN LONG - Medium](https://medium.com/@yanlong/macos使用shadowsocks-libev-simple-obfs教程-c10eba9c0758)
-   [ShadowSocks助力macOS科学上网 | Marvin's Blog【程式人生】](https://marvinsblog.net/post/2017-01-15-use-shadowsocks-on-macos/)
-   [Shadowsocks · Mac OS X 配置指南](https://wild-flame.github.io/guides/docs/mac-os-x-setup-guide/shadowsocks)
-   [shadowsocks-libev & acl on macOS](https://placeless.net/blog/shadowsocks-libev-&-acl-on-macos)
-   ['shadowsocks-libev+simple-obfs流量混淆的两种方案' | 无名老卒BLOG](https://www.wumingx.com/tools/shadowsocks_obfs.html)
-   [苹果 macOS 使用 Shadowsocks 设置教程 | Shadowsocks](https://shadowsockshelp.github.io/Shadowsocks/mac.html)
-   [macos - How to set proxy on OS X Terminal permanently? - Ask Different](https://apple.stackexchange.com/questions/226544/how-to-set-proxy-on-os-x-terminal-permanently)
