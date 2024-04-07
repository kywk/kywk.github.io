---
title: Get Started
description: "Go: Get Started"
tags:
  - Go
  - Beginner
date_created: 2022-05-25T00:00:00+08:00
image: https://lh3.googleusercontent.com/pw/AL9nZEUA9Ifvd5Z8SXDWkeVB6AC4MPGwnXaL6kBXNPoXwOQQ2jOcZ1Jw_0p8TKK8C3ZX0e67_FOY15eDrm7aaXSQJcKtoUzC80SAQEHsaBy6qS2AqNNs5VUFNXBKm439y_1wkvmDl-PnL8ReojnIumNlEvOXBg=w800-no?authuser=0
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

[Go] Get started with Go
========================


Get started
-----------

### Helo World ###

``` go
// hello.go
package main

import "fmt"

func main() {
    fmt.Println("hello world")
}
```

Go CLI 執行的切入點 `package main` 和 `func main()`, 否則會報錯如下.

``` shell
$ go run ./main.go
package command-line-arguments is not a main package

$ go run ./main.go
# command-line-arguments
runtime.main_main·f: function main is undeclared in the main package
```

### External package ###

<Tabs>
  <TabItem value="init mod" label="init mod" default>

``` shell
$ go mod init example/hello
go: creating new go.mod: module example/hello

$ cat go.mod
module example/hello

go 1.18
```
  </TabItem>
  <TabItem value="main.go" label="main.go">

``` go 
package main

import (
    "example/hello/foo"
    "fmt"
)

func main() {
    fmt.Println(foo.Foo())
}
```
  </TabItem>
  <TabItem value="foo/foo.go" label="foo/foo.go">

``` go
package foo

func Foo() string {
    return "this is foo package unfer hello"
}
```
  </TabItem>
  <TabItem value="test" label="test">

``` shell
$ go run ./main.go
this is foo func
````
  </TabItem>
</Tabs>


#### relative path ####

Go 同資料夾內所有檔案屬於相同 package, 若要拆成不同 package 必須放置不同資料夾.  
在 Go Module 正式導入後, Go 不再支援相對路徑引用 package, 
package 需放在 Module 之下, 透過 Module 匯入. 
直接夠過相對路徑匯入 package 會報錯如下: 

``` shell
$ go run ./main.go
main.go:4:2: "./foo" is relative, but relative import paths are not supported in module mode
````


Environment
-----------

### GOPATH ###
...TBD...


IDE Setting
-----------

### Goland ###
...TBD...

### VS Code ###
...TBD...


小結
----

從頭開始了解語言有個明顯好處. 
過去在公司開發維護專案時, 有時會太過於 follow 專案 SOP, 以及相關 Scripts, 
即使這些 SOP scripts 是自己編寫維護, 
但長期下來有些腳本內容僅為了解決當下問題而修改, 忽略了語言背後基礎的規範等.
而自己過於習慣使用這些腳本, 也忘了如何 From scratch.

重新了解語言基礎規範後, 也許日後要再製作 SCP scripts, 
會更清楚自己在做些什麼, 清楚必要與不必要, 寫出更完善的 SOP scripts.


See Also
--------

### Get Started ###

-   [Tutorial: Get started with Go - The Go Programming Language](https://go.dev/doc/tutorial/getting-started)

### Module ###

-   [Go語言重新開始，Go Modules 的前世今生與基本使用 | IT人](https://iter01.com/638052.html)
-   [go modules 終於不會再被GOPATH綁死了 - iT 邦幫忙::一起幫忙解決難題，拯救 IT 人的一天](https://ithelp.ithome.com.tw/articles/10217414)
-   [【Golang】還在把 library 放在專案裡？該跟上使用 Go Module 了！ | by Zam Huang | Medium](https://zamhuang.medium.com/4185df23442a)
