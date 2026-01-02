---
title: HEALTHCHECK 健康檢查
description: Docker health check
tags:
  - Docker/Dockerfile
hide_table_of_contents: true
date_created: 2023-03-15T00:00:00.000Z
date_updated: 2023-03-15T00:00:00.000Z
image: >-
  https://lh3.googleusercontent.com/pw/AL9nZEUA9Ifvd5Z8SXDWkeVB6AC4MPGwnXaL6kBXNPoXwOQQ2jOcZ1Jw_0p8TKK8C3ZX0e67_FOY15eDrm7aaXSQJcKtoUzC80SAQEHsaBy6qS2AqNNs5VUFNXBKm439y_1wkvmDl-PnL8ReojnIumNlEvOXBg=w800-no?authuser=0
slug: /devsecops/docker/dockerfile/dockerfile-healthcheck/
---

[Dockerfile] HEALTHCHECK 健康檢查
================================

前言
----
在沒有 HEALTHCHECK 指令之前, Docker 只能透過 process 是否退出來判斷 container 的狀態.
不過有時候是服務已經無法正常運作了, 但 process 沒有退出, 這樣會導致該服務仍然可以接收用戶請求, 但是無法正常回應.

Health Check
------------
在 Docker 版本 `1.12` 之後提供了 `HEALTHCHECK` 指令, 
可以設定一行 command 用來判斷服務的狀態是否正常, 這樣可以更準確地判斷服務狀態.

Container 啟動後的初始狀態為 `starting`, 在 HEALTHCHECK 指令檢查成功後, 狀態會更改為 `healthy`.
如果連續失敗超過指定次數則會改為 `unhealthy`.

### format ###

- HEALTHCHECK [OPTIONS] CMD command (check container health by running a command inside the container)
- HEALTHCHECK NONE (disable any healthcheck inherited from the base image)

### options ###

- `--interval=DURATION` (_default: 30s_)
- `--timeout=DURATION` (_default: 30s_)
- `--start-period=DURATION` (_default: 0s_)
- `--retries=N` (_default: 3_)





See Also
--------

- [Dockerfile reference](https://docs.docker.com/engine/reference/builder/#healthcheck)
- [Lab #14: Create a Docker Image with HEALTHCHECK instruction | dockerlabs](https://dockerlabs.collabnix.com/beginners/dockerfile/healthcheck.html)
- [HEALTHCHECK 健康检查 - Docker — 从入门到实践](https://yeasy.gitbook.io/docker_practice/image/dockerfile/healthcheck)
- [[Docker] Health Check and Restart Unhealthy Container | wshs0713's blog](https://wshs0713.github.io/posts/b8226bad/)

