---
#id: kywk-moco
title: "defar"
description: "defar"
tags: [Go, go-tour]

#sidebar_position: 1
#sidebar_label: Easy
#sidebar_class_name: green

#hide_table_of_contents: true

date: 2022-04-11T20:08:41+08:00
image: "https://lh3.googleusercontent.com/pw/AM-JKLWu8wVpy5iA1V-YEeQHafjhEuZiS8kFPaPu0pj_m6yi09YtCsVYFT8Z6LxtDL57sWDXa8rRZm6B_OsIhWjgBWupJ1ZopYhtDR5PMn-4q8ypuliQvh5KDBfdZmKAxOkIXb4FhRvkuQsRhKiyjB02tR6otw=w860-h480-no?authuser=0s"
---

[Go] Tour: defar 心得筆記
========================

defer 是 golang 的一個特色功能, 在 A Tour of Go 裡的說明如下:

> Defer
> A defer statement defers the execution of a function until the surrounding function returns. The deferred call's arguments are evaluated immediately, but the function call is not executed until the surrounding function returns.

之前在 defer 使用上, 主要是用函數結束前進行 `io.Close` 之類的必要結束動作.
或是替代其他語言中 `try… catch … finally…` 的 `finally`.
仔細了解後才發現 defer 的一些特性, 使用上該多注意.


執行順序
-------

### defer 生效順序 ###

__defer 執行順序是先進後出__, 如下:

``` go
func main() {
    for i := 0; i < 5; i++ {
        defer fmt.Printf("%d\n", i)
    }
}
```
``` 
4
3
2
1
0
```
若透過 defer 呼叫處理的函數有順序關係, 使用上需注意實際執行順序.

### defer/return 順序與回傳值 ###

__先將 return 結果寫入返回值中 -> 接著依序執行 defer 工作 -> 最後函數攜帶返回值退出__

``` go
func deferFunc() int {
    fmt.Println("defer func called")
    return 0
}

func returnFunc() int {
    fmt.Println("return func called")
    return 0
}

func returnAndDefer() int {
    defer deferFunc()
    return returnFunc()
}

func main() {
    returnAndDefer()
}
```
```
eturn func called
defer func called
```

單討論執行順序的話, defer func 在 return 之後執行.  
但若討論到回傳值的話, defer func 可能會影響程式回傳結果, 使用上需注意.

#### pointer ####

最直覺的, return pointer 狀況下, 若 defer func 會更改 pointer 物件內容,
則該物件最終結果會是 defer func 執行後的狀態.

``` go
type Test struct {
    Value int
}

func deferFunc(t *Test) {
    t.Value++
}

func testFunc(i int) *Test {
    result := Test{}
    defer deferFunc(&result)
    result.Value = i
    return &result
}

func main() {
    r := testFunc(5)
    fmt.Println(r.Value)
}
```
```
6
```

#### named return ####

返回值的表達方式, 我們知道根據是否提前聲明有兩種方式:
一種是 `func test() int` 另一種是 `func test() (i int)` ,
兩種情況都來說說:

``` go
func main() {
    fmt.Println("main:", test())
}
func test() int {
    var i int
    defer func() {
        i++
        fmt.Println("defer2的值:", i)
    }()
    defer func() {
        i++
        fmt.Println("defer1的值:", i)
    }()
    return i
}
```
```
defer1的值: 1
defer2的值: 2
main: 0
```
return 時已經先將返回值給記錄下來為 0.  
由於 i 函數內部聲明, 即使 defer 函式更改, 也不會影響 return 的數值.

``` go
func main() {
    fmt.Println("main:", test())
}
func test() (i int) {
    defer func() {
        i++
        fmt.Println("defer2的值:", i)
    }()
    defer func() {
        i++
        fmt.Println("defer1的值:", i)
    }()
    return i
}
```
```
defer1的值: 1
defer2的值: 2
main: 2
```
返回的 i 在函式宣告時定義, 則 defer 對 i 進行的操作會影響最終 i 的值.

### defer 定義和執行 ###

defer 所執行的指令或函式, 會先把參數部分的值確定下來, 之後不會改變.  
等待函式執行結束, 才將之前定義的參數數值帶入邏輯執行.

``` go
func test(i *int) int {
    return *i
}
func main() {
    var i = 1
    // 宣告 defer 的時候，會先確認 test(&i) 的值為 1，後面不會改變
    defer fmt.Println("i1 =", test(&i))
    i++
    // 同上，此時 test(&i) 的值是2，後面不會變
    defer fmt.Println("i2 =", test(&i))
    // 定義 defer 的時候，i 是一個指針類型，地址上的值更動，這裡跟著變
    defer func(i *int) {
        fmt.Println("i3 =", *i)
    }(&i)
    // 宣告 defer 時，i 的值是2，後面不會改變
    defer func(i int) {
        fmt.Println("i4 =", i)
    }(i)
    defer func() {
        // 地址，所以後續跟著變
        var c = &i
        fmt.Println("i5 =", *c)
    }()
    // 執行 i=11 後才調用，此時 i 值已是11
    defer func() {
        fmt.Println("i6 =", i)
    }()
    i = 11
}
```


常見使用場景
----------

### 釋放占用的資源 ###

``` go 
func test() error {
    file, err := os.Open("path")
    if err != nil {
        return err
    }
    // 放在判斷 err 狀態之後
    defer file.Close()

    //...
    return nil
}
```

### 捕捉處理異常 ###

捕捉錯誤的 defer 通常會最先宣告, 以確保執行順序為最後被呼叫.

``` go
func test2() {
    defer func() {
        if err := recover(); err != nil {
            fmt.Println(err)
        }
    }()
    file, err := os.Open("path")
    if err != nil {
        panic(err)
    }
    defer file.Close()

    //...
    return
}
```

### 輸出日志 等收尾工作 ###

``` go
func test3() {
    t1 := time.Now()
    defer func() {
        fmt.Printf("耗時: %f s", time.Now().Sub(t1).Seconds())
    }()

    //...
    return
}
```


常見錯誤
-------

``` go
func test4() error {
    f, err := os.Open("A.txt")
    if err != nil {
        return err
    }
    defer func() { f.Close() }()//錯誤: 關閉是B文件,f引用被重新賦值
    f, err = os.Open("B.txt")
    if err != nil {
        return err
    }
    defer func() { f.Close() }() //關閉是B文件
    list := []int{1, 2}
    for _, i := range list {
        defer fmt.Println(i) //輸出 2 1 //i為值類型參數被復制
        defer func() { fmt.Println(i) }() //錯誤: 輸出 2 2 //函數體內對i引用,留最終值
    }
    return nil
}
```


See Also
--------

-   [Defer, Panic, and Recover - The Go Blog](https://go.dev/blog/defer-panic-and-recover)
-   [Golang 的defer執行規則說明 - WalkonNet](https://walkonnet.com/archives/56570)
-   [Golang中的Defer必掌握的7知識點 - MdEditor](https://www.gushiciku.cn/pl/pQWu/zh-tw)
