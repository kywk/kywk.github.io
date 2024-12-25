---
title: "Redis: 警告與問題排除"
tags:
  - Infra
  - Redis
date_created: 2021-05-06T14:26:31+08:00
image: https://lh3.googleusercontent.com/pw/ACtC-3c20fracgrQ2pPqoqdoDC8B2-TKXBr7gWPBBoYkEjUhibsZSiOx-D0rbH0mw4ioWUPFaggeqZhKvWI-og9IzKmSXItl67QFCpd33vklw9QLZU0FW7ggHE1yuZ7S7NVTUSmrshARmmk-iJQifd72Nb86rQ=w800-no?authuser=0
---

[Redis] 警告訊息排除
==================

啟動 Redis 出現下列警告訊息, 警告說明相當清楚, 如何處理與配置也很清楚, 一一設置即可.


``` shell
cow@sandbox:~/tmp/redis/src# ./redis-server
25572:C 06 May 2021 07:58:52.254 # oO0OoO0OoO0Oo Redis is starting oO0OoO0OoO0Oo
25572:C 06 May 2021 07:58:52.254 # Redis version=5.0.5, bits=64, commit=00000000, modified=0, pid=25572, just started
25572:C 06 May 2021 07:58:52.254 # Warning: no config file specified, using the default config. In order to specify a config file use ./redis-server /path/to/redis.conf
25572:M 06 May 2021 07:58:52.255 * Increased maximum number of open files to 10032 (it was originally set to 1024).
                _._
           _.-``__ ''-._
      _.-``    `.  `_.  ''-._           Redis 5.0.5 (00000000/0) 64 bit
  .-`` .-```.  ```\/    _.,_ ''-._
 (    '      ,       .-`  | `,    )     Running in standalone mode
 |`-._`-...-` __...-.``-._|'` _.-'|     Port: 6379
 |    `-._   `._    /     _.-'    |     PID: 25572
  `-._    `-._  `-./  _.-'    _.-'
 |`-._`-._    `-.__.-'    _.-'_.-'|
 |    `-._`-._        _.-'_.-'    |           http://redis.io
  `-._    `-._`-.__.-'_.-'    _.-'
 |`-._`-._    `-.__.-'    _.-'_.-'|
 |    `-._`-._        _.-'_.-'    |
  `-._    `-._`-.__.-'_.-'    _.-'
      `-._    `-.__.-'    _.-'
          `-._        _.-'
              `-.__.-'

25572:M 06 May 2021 07:58:52.255 # WARNING: The TCP backlog setting of 511 cannot be enforced because /proc/sys/net/core/somaxconn is set to the lower value of 128.
25572:M 06 May 2021 07:58:52.255 # Server initialized
25572:M 06 May 2021 07:58:52.255 # WARNING overcommit_memory is set to 0! Background save may fail under low memory condition. To fix this issue add 'vm.overcommit_memory = 1' to /etc/sysctl.conf and then reboot or run the command 'sysctl vm.overcommit_memory=1' for this to take effect.
25572:M 06 May 2021 07:58:52.255 # WARNING you have Transparent Huge Pages (THP) support enabled in your kernel. This will create latency and memory usage issues with Redis. To fix this issue run the command 'echo never > /sys/kernel/mm/transparent_hugepage/enabled' as root, and add it to your /etc/rc.local in order to retain the setting after a reboot. Redis must be restarted after THP is disabled.
25572:M 06 May 2021 07:58:52.255 * Ready to accept connections
```


同時開啟檔案數量太少
----------------

``` txt
Increased maximum number of open files to 10032 (it was originally set to 1024).
```

第一個訊息是建議把 Redis 程序同時的檔案數量設為 10032. 系統一般預設為 1024.

一個程序同時能打開的檔案數量過多會影響系統其他服務, 過小則可能影響該程序自身效能.
若主機是專門拿來跑 redis-server, 則可檔案上限放大.

以下使用系統級別放大限制, 參考 [fs](https://www.kernel.org/doc/Documentation/sysctl/fs.txt)

``` shell
$ sudo vi /etc/sysctl.conf

fs.file-max = 10032
```

上面修改的配置需重新開機才能生效, 可等本篇所有步驟進行完畢再重新開機.

無須重新開機的話可透過指令去設置或是使用者級別設置方式, 
可參考 [Redis 启动警告解决方法 - 简书](https://www.jianshu.com/p/0048af19a8cb)


TCP backlog setting fail
------------------------

``` txt
WARNING: The TCP backlog setting of 511 cannot be enforced because /proc/sys/net/core/somaxconn is set to the lower value of 128.
```

Redis 嘗試設置 TCP backlog 511 失敗, 因為系統設置為更小的 128.

TCP backlog 詳解可參考: [linux里的backlog详解_沧海一粟-CSDN博客_backlog](https://blog.csdn.net/raintungli/article/details/37913765)
修改系統設置方式如下:

``` shell
$ sudo vi /etc/sysctl.conf

net.core.somaxconn=65535
```


overcommit_memory = 0
---------------------

``` txt
WARNING overcommit_memory is set to 0! Background save may fail under low memory condition. To fix this issue add 'vm.overcommit_memory = 1' to /etc/sysctl.conf and then reboot or run the command 'sysctl vm.overcommit_memory=1' for this to take effect.
```

`overcommit_memory` 參數設定為 `0`. 會造成記憶體不足的情況下, 後台存檔的程序可能失效. 建議修改設定為 `1`.

[有关linux下redis overcommit_memory的问题](https://blog.csdn.net/whycold/article/details/21388455)
修改系統設置方式如下:

``` shell
$ sudo vi /etc/sysctl.conf

vm.overcommit_memory=1
```


Transparent Huge Pages enabled
------------------------------

``` txt
WARNING you have Transparent Huge Pages (THP) support enabled in your kernel. This will create latency and memory usage issues with Redis. To fix this issue run the command 'echo never > /sys/kernel/mm/transparent_hugepage/enabled' as root, and add it to your /etc/rc.local in order to retain the setting after a reboot. Redis must be restarted after THP is disabled.
```

目前系統啟用 `Transparent Huge Pages (THP)` 這可能會造成 redis 效能延遲或記憶體使用問題, 建議關閉 THP 支援.

THP 介紹如下: 
-   [Linux关于透明大页的使用与禁用介绍 - 云+社区 - 腾讯云](https://cloud.tencent.com/developer/article/1721462)
-   [linux 内存管理 Transparent HugePages 透明大页 简介_whatday的专栏-CSDN博客_linux大页内存 透明大页内存](https://blog.csdn.net/whatday/article/details/103028344)

關閉 THP 方法如下:

``` shell
$ sudo vi /etc/rc.local

#!/bin/sh -e

echo never > /sys/kernel/mm/transparent_hugepage/enabled

$ sudo chmod a+x /etc/rc.local
```


See Also
--------

全部修改完後重新開機後, redis 就不會出現相關 WARNING 了.
若系統不方便重新開機, 下列兩個參考資訊都有可以即時生效的設定方式.

-   [Redis 启动警告解决方法 - 简书](https://www.jianshu.com/p/0048af19a8cb)
-   [Redis优化：启动警告问题的解决(必须做的操作) 天道酬勤，行者无疆的技术博客_51CTO博客](https://blog.51cto.com/sf1314/2156127)
