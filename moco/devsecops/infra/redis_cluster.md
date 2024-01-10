---
title: "Redis: Cluster 建製"
tags: [Infra, Redis]

created: 2021-05-07T09:30:26+08:00
image: "https://lh3.googleusercontent.com/pw/ACtC-3fIlrxgO6AX1o_tNuiD0YfrwpojgHUZa_OSpR36XoOZ_Ojz9q0Bw9yZ2V9QwSKUqApRMEIPWetv9AQd4TsfGgE0AaZXj7IJ2NV6ffvWj7N_Fjo2EzJ7BaCjZ7Fxx702zh6ZnykZAOChtRM-P1Zr9t0SYQ=w800-no?authuser=0"
---

[Redis] 建製 Redis Cluster
=========================

Redis-Cluster 為無中心化架構, 每個節點都會儲存數據以及整個叢集狀態, 每個節點都會和其他節點建立連線.
一組 Redis Cluster 由多個獨立 Redis 節點組成, 
官方建議六個節點, 其中三個為主節點 (master) 三個為從節點 (slave).


安裝 Redis
---------

略. 可透過不同系統的套件管理程式安裝, 或參考[官方文件](https://redis.io/download)下載 source tar ball 編譯安裝.

``` shell
$ wget https://download.redis.io/releases/redis-6.2.3.tar.gz
$ tar xzf redis-6.2.3.tar.gz
$ cd redis-6.2.3
$ make
```

編譯後執行檔在 `src/redis-server`, 可試著執行開啟 redis 服務.

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

出現 __Ready to accept connections__ 後表示 Redis 程式可正常運作, 
可再依需要把執行檔複製到 `/usr/local/bin' 之類系統資料夾中.

而警告訊息的排除可參考: [Redis 警告訊息排除](redis_troubleshooting.md) 


準備 config
-----------

官方建議使用六個 node 來建 redis cluster, 
實際業務運行上通常為六台獨立的主機, 使用同一份 config 部署到六台主機即可.

> 本地測試在同一台主機上跑六個不同 redis-server instance, 分別使用 Port: 7001 ~ 7006. 因此需準備六份 config. 

``` shell
$ mkdir 7001 7002 7003 7004 7005 7006
$ vi 7001/redis.config
```

``` cfg
port 7001
cluster-enabled yes
cluster-config-file nodes_7001.conf
cluster-node-timeout 5000
appendonly yes
daemonize yes
bind x.x.x.x
requirepass password
masterauth password
```

基本需要的設置內容與簡單說明如下:

-   __port__ _7001_  
    Redis-Server instance 所服務的 port, 相同主機的話需錯開.
-   __cluster-enabled__ _yes_  
    啟用 redis cluster
-   __cluster-config-file__ _nodes_7001.conf_  
    每個 node 需要獨立的 cluster 設定檔.
    僅需指定檔名, 無須設定檔案內容.
    redis-cluster 運作時會自行維護與修改該檔案內容.
-   __cluster-node-timeout__ _5000_  
    node 判斷失效的時間
-   __appendonly__ _yes_  
    啟用 aof

設定檔有上述內容, 基本上就可以執行一個 redis-cluster node 了.
而一些常見的額外設定如下:

-   __daemonize__ _yes_  
    背景執行
-   __bind__ _x.x.x.x_  
    允許 listen 特定 ip 的連線
-   __requirepass__ _password_   
    密碼設定
-   __masterauth__ _password_   
    從 master 的密碼

![](https://lh3.googleusercontent.com/pw/ACtC-3cIjjFhS63ywfyKTBTR55SdYX1NTTwgKzdEjZ9LqEuyrjRM2yUSQ7nWOw_zki8AQLXzLJLjRuseunT-LcW5QTEt6Jg7D18Gf3S5B8yGy_ittXXp19pD8FCj33nBdo-pZbKl2BkLTPK0rzOo5ntxgCUoFQ=w502no?authuser=0)


啟動
----

透過 `redis-server` 搭配各個設定檔, 逐一啟動不同的 redis-server instance

``` shell
$ redis-server 7001/redif.conf
$ redis-server 7002/redif.conf
$ redis-server 7003/redif.conf
$ redis-server 7004/redif.conf
$ redis-server 7005/redif.conf
$ redis-server 7006/redif.conf
```


加入 cluster
-----------

只是把各個 redis-server instance 跑起來, 彼此尚不是 cluster 裡面的 node,
需下指令建理 cluster.

``` shell
$ redis-cli --cluster create 127.0.0.1:7001 127.0.0.1:7002 127.0.0.1:7003 127.0.0.1:7004 127.0.0.1:7005 127.0.0.1:7006 --cluster-replicas 1
```

-   __redis-cli__   
    redis CLI 控制程式, 除了集成一些控制項目外, 也是個完整的 redis-client.
-   __--cluster create__ _x.x.x.x:port1 ... x.x.x.x:port6_  
    利用這些 redis-server instance 建立 redis-cluster.
-   __--cluster-replicas__ _1_  
    一個 master 節點搭配一個 slave 節點.  
    因上述指令共有六個節點, 所以會建構出三個 master 節點搭配三個 slave 節點.


See Also
--------

以上是最常見的 Redis Cluster 建製方法, 也是官方建議的方案.
關於 Redis Cluster 進一步資訊, [Redis初步學習整理——第五節Cluster叢集部署、主從複製、哨兵模式_資料庫_程式人生](https://www.796t.com/article.php?id=192567)
是個相當不錯的文章, 值得一讀.

其他參考資料陳列於下:

-   [Redis cluster tutorial – Redis](https://redis.io/topics/cluster-tutorial)
-   [Centos 7 部署Redis 三主三從叢集 - tw511教學網](https://tw511.com/a/01/6479.html)
-   [建立 Redis Cluster (Redis 5) - Yowko's Notes](https://blog.yowko.com/create-redis-cluster/)
-   [Redis 集群架設. 前言 | by 徐子函 | Medium](https://medium.com/@zihansyu/redis-集群架設-ff641c97232c)
