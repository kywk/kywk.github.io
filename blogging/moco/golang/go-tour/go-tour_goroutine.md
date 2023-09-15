---
#id: kywk-moco
title: "Goroutine"
description: "Goroutine"
tags: [Go, go-tour]

#sidebar_position: 1
#sidebar_label: Easy
#sidebar_class_name: green

#hide_table_of_contents: true

date: 2022-04-20T15:45:04+08:00
image: "https://lh3.googleusercontent.com/pw/AM-JKLWu8wVpy5iA1V-YEeQHafjhEuZiS8kFPaPu0pj_m6yi09YtCsVYFT8Z6LxtDL57sWDXa8rRZm6B_OsIhWjgBWupJ1ZopYhtDR5PMn-4q8ypuliQvh5KDBfdZmKAxOkIXb4FhRvkuQsRhKiyjB02tR6otw=w860-h480-no?authuser=0s"
---

[Go] Tour: Goroutine 心得筆記
============================

_本篇大多參考於 [Go 的並發：Goroutine 與 Channel 介紹 - Limitless Ping](https://peterhpchen.github.io/2020/03/08/goroutine-and-channel.html),
加上一些個人理解與整理. 強烈建議參閱原文, 圖文並茂, 敘事條理分明的好文章._


Threading
---------

先來了解執行緒.  
單執行緒情況下, 程式碼會依序執行.

``` go
func say(s string) {
    for i := 0; i < 5; i++ {
        time.Sleep(100 * time.Millisecond)
        fmt.Println(s)
    }
}

func main() {
    begin := time.Now()
    say("world")
    say("hello")
    diff := time.Now().Sub(begin)
    fmt.Printf("spent %d ms", diff.Milliseconds())
}
```
``` shell
world
world
world
world
world
hello
hello
hello
hello
hello
spent 1000 ms
```
這個例子中, 會先執行完 `say("world")` 才執行 `say("hello")`.  

有時程式中個別函式之間並無先後順序關係, 若可以善用多執行緒執行, 則可大幅提升執行效率.
一般來說, Go 多執行緒最多可以同時執行和 CPU 數量相等的 Goroutine.

``` go
func say(s string) {
    for i := 0; i < 5; i++ {
        time.Sleep(100 * time.Millisecond)
        fmt.Println(s)
    }
}

func main() {
    begin := time.Now()
    go say("world")
    say("hello")
    diff := time.Now().Sub(begin)
    fmt.Printf("spent %d ms", diff.Milliseconds())
}
```
``` shell
world
hello
world
hello
hello
world
world
hello
hello
spent 500 ms
```
`say("world")` 會在另一個執行緒 (Goroutine) 上, 和 `main` 程序同時執行.


Goroutine 介紹
--------------

Goroutine 類似 golang 的 thread, 讓 Go 可以多工處理, 
main function 本身就是一個 Goroutine, 
常見會和 Channel 搭配協同工作, 可以簡化 Goroutine 操作.

建立一個 Goroutine 就等於建立一個新執行緒.
建立 Goroutine 相當簡單, 僅需在函式呼叫前加 `go` 前綴聲明即可.

``` go 
go f(x, y, z)
```


LifeCycle
---------

在 golang 中, 當 main Goroutine 結束後, 其他 Goroutine 都會強制結束.
因此 Goroutine 生命週期從被建立時開始, 到函式執行結束返回或 main Goroutine 結束時一起結束.

``` go
func say(s string) {
    for i := 0; i < 5; i++ {
        time.Sleep(100 * time.Millisecond)
        fmt.Println(s)
    }
}

func main() {
    begin := time.Now()
    go say("world")
    go say("hello")
    time.Sleep(200 * time.Millisecond)
    diff := time.Now().Sub(begin)
    fmt.Printf("spent %d ms", diff.Milliseconds())
}
```
``` shell
world
hello
world
spent 200 ms
```
這段程式共有 `main`, `say("world")`, `say("hello")` 三個 Goroutine. 
main Goroutune 僅需花費 200ms, 少於其他兩個 `say` Goroutine, 
當 main 結束時, 另外兩個 Goroutine 會跟著強制停止.

用 `time.Sleep` 雖然可以延後 main 結束時間, 讓其他 Goroutine 有機會執行完成.
但若 sleep 時間太短, 仍無法讓其他 Goroutine 完成.
而如果 sleep 時間太長, 則會影響程式效率. 
除非程式執行時間有所限制, 否則用 `time.Sleep` 來等候 Goroutine 並非好方法.


等候 Goroutine
--------------

若程式必須等候所有 Goroutine 執行完畢, 透過 sleep 等候是不可靠的. 
Go 裡面的常見等候方式有 `sync.WaitGroup` 或 `channel`.

### sync.WaitGroup ###

> Package sync provides basic synchronization primitives such as mutual exclusion locks. Other than the Once and WaitGroup types, most are intended for use by low-level library routines. Higher-level synchronization is better done via channels and communication.

Go 內建 `sync` 套件可以管理多個 Goroutine 之間的執行狀態.  
在上面例子中, 若程式需等候所有 Goroutine 執行結束後才能結束, 可使用 `sync.WaitGroup`.

``` go
func say(s string, wg *sync.WaitGroup) {
    defer wg.Done()

    for i := 0; i < 5; i++ {
        time.Sleep(100 * time.Millisecond)
        fmt.Println(s)
    }
}

func main() {
    wg := new(sync.WaitGroup)
    wg.Add(2)

    go say("world", wg)
    go say("hello", wg)

    wg.Wait()
}
```
-   建立和需要等候的 Goroutine 數量相同的 `WaitGroup` counter.
-   將 `WaitGroup` 傳入 Goroutine 中, 在函式執行結束時呼叫 `wg.Done()` 將 counter 減一.  
    常見會在函式最前面使用 `defer wg.Done()`, 以確保 Goroutine 結束時 `wg.Done()` 會被執行. 
-   `wg.Wait()` 會等候到 counter 為零為止.

`WaitGroup` 使用上相對簡單, 但要注意手動配置數量符合的 counter.

### channel ###

channel 通常拿來做 Goroutine 之間溝通訊息時使用, 
但因其阻塞特性, 亦可拿來當作等候 Goroutine 的方法.

``` go
func say(s string, c chan string) {
    for i := 0; i < 5; i++ {
        time.Sleep(100 * time.Millisecond)
        fmt.Println(s)
    }
    c <- "FINISH"
}

func main() {
    ch := make(chan string)

    go say("world", ch)
    go say("hello", ch)

    <-ch
    <-ch
}
```
-   建立了一個 channel 用以溝通訊息.
-   建立了 `say()` Goroutine, 傳入 channel.
-   main 函式中等候 channel 的資料, 此時若 channel 裡面沒有資料, 會阻塞程式執行.
    直到某個 Goroutine 執行到 `c <- "FINISH"` 時才會繼續執行.
-   本例中建立了兩個 Goroutine, 所以需要讀取兩次 channel 資料.

Channel 阻塞的方法為 Go 語言中等待的主要方式.  

要注意的是, Goroutine 常會和 Channel 搭配做訊息溝通, 
若傳入的 Channel 會拿來溝通訊息, 同時也當作阻塞等待的話, 需要注意傳回值的判斷等.


共享變數
-------

多執行緒下使用相同變數時, 要特別注意競爭問題.

``` go
func main() {
    total := 0
    for i := 0; i < 1000; i++ {
        go func() {
            total++
        }()
    }
    time.Sleep(time.Second)
    fmt.Println(total)
}
```
``` Shell
981
```
在 for 迴圈中建立的閉包參照了同一個 total 變數. 
多執行緒情況下, 可能導致實際運行狀況如下:
1.  假設此時 total 值為 70
2.   `goroutine1` 讀取 total (70), 運算 total++ = 71
3.  `goroutine2` 讀取 total (70), 運算 total++ = 71
4.  `goroutine2` 寫回 total 值 71
5.  `goroutine1` 寫回 total 值 71

`goroutine1` 和 `goroutine2` 同時進行加法運算, 並先後將計算後的值寫回記憶過, 可能導致運算錯誤. 
在多個 goroutine 裡對同一個變數 total 做加法運算, 在賦值時無法確保其為安全的而導致運算錯誤,
此問題稱為 __Race Condition__.

在執行緒間使用同樣的變數時, 最重要的是確保變數在當前的正確性.  
Go 裡面有幾個常見方法:

### sync.Mutex (互斥鎖) ### 

`sync.Mutex` (互斥鎖) 是 sync 套件中用以確保 critical section 正確性的工具物件.
互斥鎖提供兩個方法: 
-   Lock
-   Unlock
在 Lock 及 Unlock 中間, 會使其他的 Goroutine 等待, 確保此區塊中的變數安全.

`sync.Mutex` 相當簡易好用, 宣告變數後, 在要需保護的程式區段前後分別加上 Lock / Unlock 即可.
如下:

``` go
func main() {
    total := 0
    mux := sync.Mutex{}
    for i := 0; i < 1000; i++ {
        go func() {
            mux.Lock()
            total++
            mux.Unlock()
        }()
    }
    time.Sleep(time.Second)
    mux.Lock()
    fmt.Println(total)
    mux.Unlock()
}
```

### 藉由 Channel 保證變數的安全性 ###

因為 Channel 推入及拉出時阻塞與等待的特性, 也可以把共享變數存入 Channel 之中, 
拉出來做計算的值會保證是安全的. 

``` go
func main() {
    total := 0
    ch := make(chan int, 1)
    ch <- total
    for i := 0; i < 1000; i++ {
        go func() {
            ch <- <-ch + 1
        }()
    }
    time.Sleep(time.Second)
    fmt.Println(<-ch)
}
```
1.  將 total 資料寫入 Channel 之中.
2.  `goroutine1` 從 Channel 中讀取資料進行運算.
3.  `goroutine2` 要從 Channel 讀資料時, 因 Channel 中已無資料, 需等候.
4.  `goroutine1` 把運算結果寫回 Channel.
5.  `goroutine2` 等到 Channel 中有資料, 拉出後結束等待, 繼續做運算.
6.  ...

Channel 阻塞的特性, 搭配 Goroutine 可以用來作流程管控等功能.
但 Channel 還有其他特性, 拿 Channel 當作溝通資料之外的用途時, 仍需特別注意.


小結
----

善用 Goroutine 多執行緒特性可以避免等候, 增進程式效率.
需要等候的時機, 也可用 `time.Sleep`, `sync.WaitGroup` 或 Channel 的方式處理. 

而在多執行緒程式中常要注意的 Race Condition, 
在 Go 裡可以很簡單的用 `sync.Mutex` 和 Channel 來管理. 

相對其他語言, Go 在多執行緒上的創建和管理都相當簡單, 大幅降低程式複雜度.
而 Channel 的阻塞特性, 在多執行緒中發揮方便強大的能力, 後篇繼續討論 Channel.


[_續: Go: Goroutine 和 Channel 心得筆記_](go-tour_channel.md)
