---
#id: sdk_open-jdk
title: OpenJDK
description: OpenJDK
tags: [Java, SDK]

sidebar_position: 20
#sidebar_label: Easy
#sidebar_class_name: green

#hide_table_of_contents: true

created: 2023-02-24
updated: 2023-02-24
image: https://lh3.googleusercontent.com/pw/AL9nZEUA9Ifvd5Z8SXDWkeVB6AC4MPGwnXaL6kBXNPoXwOQQ2jOcZ1Jw_0p8TKK8C3ZX0e67_FOY15eDrm7aaXSQJcKtoUzC80SAQEHsaBy6qS2AqNNs5VUFNXBKm439y_1wkvmDl-PnL8ReojnIumNlEvOXBg=w800-no?authuser=0
---

OpenJDK
=======

在 Apple Silicon 架構下開發 Java, 社群與部分框架官方推薦使用 Homebrew 安裝由 Azul 所發佈, 
名為 Zulu 的 OpenJDK 版本. 這個版本同時支援 Intel 和 Apple Silicon 晶片, 
在 Apple Silicon 架構的 Mac 上編譯時, 比起其他 JDK 版本有明顯效能優勢.

```
brew tap homebrew/cask-versions
brew install --cask zulu11
```


JDK Version
-----------

React Native 需要 JDK 11, 可以透過 `javac -version` 命令確認機器上的 JDK 版本.
但若開發不同專案需要不同版本的 JDK 時, 可以在電腦安裝多個 OpenJDK 版本, 
透過環境變數來決定使用版本. 

```
brew tap homebrew/cask-versions
brew install --cask zulu11  // Java 11
brew install --cask zulu8   // Java 1.8
```

``` bash
## OpenJDK
##
export JAVA_8_HOME=$(/usr/libexec/java_home -v1.8)
export JAVA_11_HOME=$(/usr/libexec/java_home -v11)

alias java8='export JAVA_HOME=$JAVA_8_HOME'
alias java11='export JAVA_HOME=$JAVA_11_HOME'

# default to Java 11
java11
```

若要改用 Java 1.8 時, 下指令 `java8` 即可切換.
