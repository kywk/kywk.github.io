---
title: Basic Setup
description: PostgreSQL basic setup
tags: [SQL/PgSQL]

#sidebar_position: 1
#sidebar_label: Easy
#sidebar_class_name: green

#hide_table_of_contents: true

created: 2023-08-10
updated: 2023-08-10
image: https://lh3.googleusercontent.com/pw/AL9nZEUA9Ifvd5Z8SXDWkeVB6AC4MPGwnXaL6kBXNPoXwOQQ2jOcZ1Jw_0p8TKK8C3ZX0e67_FOY15eDrm7aaXSQJcKtoUzC80SAQEHsaBy6qS2AqNNs5VUFNXBKm439y_1wkvmDl-PnL8ReojnIumNlEvOXBg=w800-no?authuser=0
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

[PGSQL] Basic setup
===================


PostgreSQL Server
-----------------

<Tabs groupId="target-os">
  <TabItem value="docker" label="docker run" default>

### 初始安裝

```bash title="init.sh"
export PGSQL_HOME="$KYWK_HOME/workspace/docker/postgres"

docker run --name postgres -d \
  -v $PGSQL_HOME/data:/var/lib/postgresql/data \
  -p 5432:5432 \
  -e POSTGRES_DB=sandbox \
  -e POSTGRES_USER=admin \
  -e POSTGRES_PASSWORD='pw123456' \
  postgres:15
```

使用 `docker run` 建立 container, 若本機沒有 image, 會自動從 Docker Hub 下載.
- `—name`: container 名字以方便識別 `postgres` (若省略, Docker 會自動以亂數建立)
- `-d`: `d`etach 建立 container 後就脫離目前 process
- `-v`:  `v`olume PostgresSQL 的資料放在 container 內的 `/var/lib/postgresql/data` 目錄. 
  這個設定讓 docker mapping host `~/workspace/docker/postgres` 到 container 內的 `/var/lib/postgresql/data`. 
  如此 container 刪除後, 資料仍然會留在 host.
- `-p`: `p`ort mapping host 與 container post 的對應, 格式為 `host port : container port`.
  PostgreSQL 預設 port 為 `5432`
- -`e`: `e`nvironment 設定 PostgreSQL 所需要的環境變數
  - `POSTGRES_DB`: database 名稱
  - `POSTGRES_USER`: 帳號
  - `POSTGRES_PASSWORD`: 密碼
- `postgress:15`: image 名稱

### 啟用 / 停止服務

```shell
docker start postgres 
docker stop postgres
```

  </TabItem>
  <TabItem value="docker-compose" label="Docker-Compose">

```yaml title="Docker-compose.yml"
version: "3"

services:
  postgres:
    image: postgres:latest
    container_name: MyPostgres
    volumes:
      - ${HOST_DIR}:/var/lib/postgresql/data
    expose:
      - 5432
    ports:
      - ${POSTGRES_PORT}:5432
    environment:
      - POSTGRES_DB=${POSTGRES_DB}
      - POSTGRES_USER=${POSTGRES_USER}
      - POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
```

  </TabItem>
  <TabItem value="macos" label="MacOS">

### 安裝

```
brew install postgresql
```

### 啟用 / 停止服務

```
brew service start postgresql
brew service stop postgresql
```

  </TabItem>
</Tabs>


PostgreSQL Client
-----------------

### CLI client 

<Tabs groupId="target-os">
  <TabItem value="docker" label="docker exec" default>

  </TabItem>
  <TabItem value="homebrew" label="Homebrew">

Install libpq & symlink psql (and other libpq tools) into /usr/local/bin

```shell
brew install libpq
brew link --force libpq
```

  </TabItem>
</Tabs>

### psql connection 

In order to connect to your PostgreSQL server, we’ll need the following connection params:
- Hostname
- Port
- Username
- Password
- Database name

Option 1, the Unix-like cli arguments

```shell
psql -h [HOSTNAME] -p [PORT] -U [USERNAME] -W -d [DATABASENAME]
```

or, make a connection URI as following:
```shell
psql postgres://[USERNAME]:[PASSWORD]@[HOSTNAME]:[PORT]/[DATABASENAME]?sslmode=require
```


DB User
-------




See Also
--------

- [如何使用 Docker 安裝 PostgreSQL ? | 點燈坊](https://old-oomusou.goodjack.tw/docker/postgres/)
- [Docker筆記 - 進入Container，建立並操作 PostgreSQL Container | by Albert Hg | alberthg-docker-notes | Medium](https://medium.com/alberthg-docker-notes/d221ba39aaec)
- 

