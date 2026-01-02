---
title: CLI Snippets
description: Docker command snippets
tags:
  - Docker
hide_table_of_contents: true
date_created: 2023-01-04T00:00:00.000Z
date_updated: 2023-01-04T00:00:00.000Z
image: >-
  https://lh3.googleusercontent.com/pw/AL9nZEUA9Ifvd5Z8SXDWkeVB6AC4MPGwnXaL6kBXNPoXwOQQ2jOcZ1Jw_0p8TKK8C3ZX0e67_FOY15eDrm7aaXSQJcKtoUzC80SAQEHsaBy6qS2AqNNs5VUFNXBKm439y_1wkvmDl-PnL8ReojnIumNlEvOXBg=w800-no?authuser=0
slug: /devsecops/docker/docker-cli-snippets/
---

[Docker] Command Snippets
=========================

### docker attach ###

Attach local standard input, output, and error streams to a running container

``` bash
docker attach [OPTIONS] CONTAINER
```

- `CTRL-c` sends a __SIGINT__ to the container.
- `CTRL-p CTRL-q` key sequence to detach from the container.


### docker commit ###

Create a new image from a container’s changes

``` bash
docker commit [OPTIONS] CONTAINER [REPOSITORY[:TAG]]
```


See Also
--------

__[Docker Documentation](https://docs.docker.com/)__
- [Environment variables in Compose | Docker Documentation](https://docs.docker.com/compose/environment-variables/)
- [Day-9 熟悉 Docker 進階功能 - iT 邦幫忙::一起幫忙解決難題，拯救 IT 人的一天](https://ithelp.ithome.com.tw/articles/10243101)
