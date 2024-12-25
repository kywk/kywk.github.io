---
title: Redis CLI
image: https://lh3.googleusercontent.com/pw/ACtC-3cYYtkzJjo_oG7Gzqq8T8XQm4V_qLE3wGWVKOahp6YT4lo-on60NJmjrkkatnizX1b-uID-MCM2ztsXH9z27cMRtql3PA5cpYZYbMfSPuM5Yh3MmqnjnnXYkTg6vtIiBL5SGAQRRAI9zEBIOoyP3tZpuA?authuser=0
tags:
  - Mac
  - DevEnv
  - Redis
  - Homebrew
sidebar_position: 30
date_created: 2024-10-31
---

# Redis CLI Only

## Docker

過往 redis-cli 會隨著 redis 一併安裝, 後來多改用 docker 跑 redis 後, 需要 redis-cli 突然發覺系統並未安裝.
雖可透過 docker 來執行 redis-cli,

```
docker run --rm -it redis:alpine redis-cli -h 192.168.0.8
```

## homebrew

但若想安裝最基本的 redis-cli, 而不想要有 redis-server, 仍可透過以下方式安裝:

```
brew tap ringohub/redis-cli
brew update && brew doctor
brew install redis-cli
```

### brew info

而關於第三方套件安全性疑慮, 可利用 `brew info redis-cli` 檢查該套件到底執行或安裝了什麼東西.

```
❯ brew info redis-cli
==> ringohub/redis-cli/redis-cli: stable 6.0.1
Install the redis-cli only.
https://github.com/aoki/homebrew-redis-cli
Installed
/opt/homebrew/Cellar/redis-cli/6.0.1 (6 files, 267KB) *
  Built from source on 2024-10-30 at 10:53:40
From: https://github.com/ringohub/homebrew-redis-cli/blob/HEAD/redis-cli.rb
```

進一步看腳本內容, 主要是下載官方 redis 檔案後, 只安裝了 redis-cli 的工具程式. 安全性應該不是問題.

```
class RedisCli < Formula
  desc "Install the redis-cli only."
  homepage "https://github.com/aoki/homebrew-redis-cli"
  version "6.0.1"
  sha256 "e5aaf79ecea4cac64a838d4d2b597a5ecc19e50d2fcdf233295053fe12a9349d"
  url "https://github.com/antirez/redis/archive/#{version}.tar.gz"

  def install
    system "make redis-cli"
    bin.install "./src/redis-cli"
  end

  test do
    system "#{bin}/redis-cli"
  end
end
```

## node.js

若電腦有 node.js 環境, 亦可安裝 [redis-cli npm](https://www.npmjs.com/package/redis-cli) 套件.

```
npm install -g redis-cli
yarn global add redis-cli
```

Refs: [macos - Mac(os x): Is there a way to install ONLY redis-cli? - Stack Overflow](https://stackoverflow.com/questions/39704273/macos-x-is-there-a-way-to-install-only-redis-cli)
