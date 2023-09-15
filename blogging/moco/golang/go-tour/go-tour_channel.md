---
#id: kywk-moco
title: "Goroutine / Channel"
description: "Goroutine / Channel"
tags: [Go, go-tour]

#sidebar_position: 1
#sidebar_label: Easy
#sidebar_class_name: green

#hide_table_of_contents: true

date: 2022-04-21T12:03:41+08:00
image: "https://lh3.googleusercontent.com/pw/AM-JKLWu8wVpy5iA1V-YEeQHafjhEuZiS8kFPaPu0pj_m6yi09YtCsVYFT8Z6LxtDL57sWDXa8rRZm6B_OsIhWjgBWupJ1ZopYhtDR5PMn-4q8ypuliQvh5KDBfdZmKAxOkIXb4FhRvkuQsRhKiyjB02tR6otw=w860-h480-no?authuser=0s"
---

[Go] Tour: Goroutine 和 Channel 心得筆記
======================================

[_承: Go: Goroutine 心得筆記_](go-tour_goroutine.md)


Channel 介紹
-----------

前篇藉由兩個在多執行緒中重要的議題: 等待及變數共享, 帶出 Channel 強大的處理能力, 接著深入了解 Channel.

Channel 可以想成一條管線, 這條管線可以寫入數值, 也可以將數值讀取出來.

建立 Channel
``` go
ch := make(chan int) // 建立 int 型別的 Channel
```

推入 / 拉出 Channel 內的值, 使用 `<-` 箭頭運算子:
-   Channel 在 <- 左邊：將箭頭右邊的數值推入 Channel 中
``` go
ch <- v    // Send v to channel ch.
v := <-ch  // Receive from ch, and assign value to v.
```

### Channel 的阻塞 ###

Channel 會等待至另一端完成推入 / 拉出的動作後才會繼續往下處理, 
這樣的特性使其可以在 Goroutines 間同步的處理資料, 可以不使用明確的 `mutex.Lock`, `mutex.Unlock` 等方法.

而 Channel 什麼情況下會阻塞呢?
一般來說, Goroutine 使用 Channel 時有兩種情況會造成阻塞:
-   將資料寫入 Channel 後, 
    寫入資料的 Goroutine 會等待 Channel 資料被其他 Goroutine 拉取後才能繼續執行.
-   若當 Channel 中沒有資料, 但要從中讀取時, 
    讀取資料的 Goroutine 會等待其他 Goroutine 寫入資料, 
    並等候自己拉取完成才能往下執行.

### 寫入資料到 Channel 時的等待情境 ###

``` go
func main() {
    ch := make(chan string)

    go func() { // calculate goroutine
        fmt.Println("calculate goroutine starts calculating")
        time.Sleep(time.Second) // Heavy calculation
        fmt.Println("calculate goroutine ends calculating")

        ch <- "FINISH" // goroutine 執行會在此被迫等待

        fmt.Println("calculate goroutine finished")
    }()

    time.Sleep(2 * time.Second) // 使 main 比 goroutine 慢
    fmt.Println(<-ch)
    time.Sleep(time.Second)
    fmt.Println("main goroutine finished")
}
```
``` 
calculate goroutine starts calculating
calculate goroutine ends calculating
FINISH
calculate goroutine finished
main goroutine finished
```
此例使用 `time.Sleep` 強迫 main 執行慢於 calculate, 現在來觀察輸出的結果:
-   calculate 會先執行並且計算完成
-   calculate 將 `FINISH` 訊號推入 Channel
-   但由於目前 main 還未拉取 Channel 中的資料, 所以 calculate 會被迫等待. 
    因此 calculate 的最後一行 `fmt.Println("main goroutine finished")` 沒有馬上輸出在畫面上
-   main 拉取了 Channel 中的資料
-   calculate 執行 `fmt.Println("main goroutine finished")` 並結束
-   main 執行完成

### 從 Channel 讀取資料時的等待情境 ###

``` go
func main() {
    ch := make(chan string)

    go func() { // calculate goroutine
        fmt.Println("calculate goroutine starts calculating")
        time.Sleep(time.Second) // Heavy calculation
        fmt.Println("calculate goroutine ends calculating")

        ch <- "FINISH" // goroutine 執行會在此被迫等待

        fmt.Println("calculate goroutine finished")
    }()

    //time.Sleep(2 * time.Second) // 使 main 比 goroutine 慢
    fmt.Println(<-ch)
    time.Sleep(time.Second)
    fmt.Println("main goroutine finished")
}
```
``` 
calculate goroutine starts calculating
calculate goroutine ends calculating
calculate goroutine finished
FINISH
main goroutine finished
```
這例子中把 main 中的 `time.Sleep(2 * time.Second)` 註解掉. 
-   main 讀取資料時, calculate 還沒將資料推入 Channel 中, main 需要等待.
    因此 main 的最後一行 `fmt.println` 沒有馬上輸出在畫面上
-   calculate 執行並且計算完成
-   calculate 將 `FINISH` 推入 Channel
-   calculate 執行完成
-   main 拉取了 Channel 中的資料並且執行完成

### Unbuffered Channel ###

前面所說的 Channel 阻塞情況都是屬於 Unbuffered Channel, 此種 Channel 只要
-   寫入一個資料會造成寫入方的等待
-   讀取時沒有資料會造成讀取時的等待

Unbuffered Channel 的問題是: 如果寫方執行時間較讀取方短, 寫入資料後會造成寫入方被迫等待資料讀取後才能繼續處理, 
如果寫入資料後續的程式無須等候資料被讀取可以正確執行執行, 這樣的等待是不必要且可以被避免的.

為了解決寫入時等待問題, 可以使用另一種 Channel: Buffered Channel.


Buffered Channel
----------------

``` go
ch := make(chan int, 100)
```
Buffered Channel 的宣告需在第二個參數中定義 buffer 的長度, 
它只會讓 Buffered 中資料填滿以後才會阻塞寫入造成等待. 

以上例來說: 第 101 個資料推入的時候, 推入方的 Goroutine 才會等待.

下面例子分別使用 Buffered Channel 跟 Unbuffered Channel 的差別:

``` go
func main() {
    ch := make(chan int)
    ch <- 1 // 等到天荒地老
    fmt.Println(<-ch)
}
```
``` 
fatal error: all goroutines are asleep - deadlock!

goroutine 1 [chan send]:
main.main()
    /tmp/sandbox3906241671/prog.go:11 +0x37

Program exited.
```
上例使用 Unbuffered Channel:
-   只有一條 Goroutine: main
-   推入 1 後因為還沒有其他 Goroutine 拉取 Channel 中的資料, 所以進入阻塞狀態.
-   因為 main 已經在推入資料時阻塞, 拉取的程式永遠不會被執行, 造成死結.

在相同的情況下，Buffered Channel 並不會被阻塞：

``` GO
func main() {
    ch := make(chan int, 1)
    ch <- 1
    fmt.Println(<-ch)
}
```
``` 
1
```
原因是:
-   推入 1 後 Channel 內的資料數為1並沒有超過 Buffer 的長度1, 所以不會被阻塞.
-   因為沒有阻塞, 下一行拉取的程式碼可以被執行, 並完成執行.

### Buffer size ###

``` go
func main() {
    ch := make(chan int, 5)
    for i:=0 ; i < 6; i++ {
        ch <- i
        fmt.Println(i)
    }
    fmt.Println('FINISH')
}
```
``` 
0
1
2
3
4
fatal error: all goroutines are asleep - deadlock!

goroutine 1 [chan send]:
```
-   建立一個 Buffer 長度 5 筆資料的 Channel
-   寫入前五筆資料時不會阻塞, 
    寫入第六筆資料時, 因 Buffer 已滿, 造成寫入資料阻塞. 
-   因沒有其他 Goroutine 在執行, 所以寫入阻塞造成 deadlock. 程式錯誤.

``` go
func main() {
    ch := make(chan int, 5)
    go func() {
        fmt.Println("Read data Goroutine")
        fmt.Println("Read i:", <-ch)
    }()
    for i := 0; i < 6; i++ {
        ch <- i
        fmt.Println(i)
    }
    fmt.Println("FINISH. current first data on buffer is: ", <- ch)
}
``` 
``` 
0
1
2
3
4
Read data Goroutine
Read i: 0
5
FINISH. current first data on buffer is:  1
```
-   承前例. 寫入前五筆資料時不會阻塞, 而寫入第六筆資料時造成 main 阻塞.
-   程式執行讀取資料的 Goroutine. Buffer 第一筆資料被拉取, 
    所以 Buffer 空出一筆資料可以推入.
-   main 推入第六筆資料, 程式正確結束. 此時 Channel 第一筆資料為 `1`


Close channel
-------------

從 Channel 拉取資料時, 可以藉由第二個回傳值確認 Channel 是否被關閉, 常會在迴圈中使用. 
如果被關閉的話代表此 Channel 已經不再使用, 可以結束迴圈.

``` go
func main() {
    c := make(chan int)
    go func() {
        for i := 0; i < 10; i++ {
            fmt.Println("push i:", i)
            c <- i
        }
        close(c) // 關閉 Channel
    }()
    for {
        v, ok := <-c
        if !ok { // 判斷 Channel 是否關閉
            break
        }
        fmt.Println("read i:", v)
    }
}
```
``` 
0
1
2
3
4
5
6
7
8
9
```

如果對 Closed Channel 推入資料的話會造成 Panic：
``` go
func main() {
    c := make(chan int)
    close(c)
    c <- 0 // Panic!!!
}
```
``` 
panic: send on closed channel
```

__為了避免將資料推入已關閉的 Channel 中造成 Panic, Channel 的關閉應該由推入的 Goroutine 處理.__

### 使用 range 巡訪 channel ###

在迴圈中拉取 Channel 中的資料, 除了可以用第二回傳值判斷 Channel 是否關閉, 
`range` 也是可以巡覽 Channel 的. 終止條件為 Channel 的狀態為已關閉的.

``` go
func main() {
    c := make(chan int)
    go func() {
        for i := 0; i < 5; i++ {
            fmt.Println("push i:", i)
            c <- i
        }
        close(c) // 關閉 Channel
    }()
    for i := range c { // 在 close 後跳出迴圈
        fmt.Println("read i:", i)
    }
}
```
``` 
push i: 0
push i: 1
read i: 0
read i: 1
push i: 2
push i: 3
read i: 2
read i: 3
push i: 4
read i: 4
````
使用 `range` 來巡訪 Channel 資料時, 同樣會造成讀取資料和推入資料的阻塞. 
如上, 對於 Unbuddered Channel 寫入和讀取資料, 
push 和 read 兩個 Goroutine 會相互阻塞, 可能影響效能.

可搭配 Buffered Channel 使用, 適當情況下會減少阻塞, 提升效能.

``` go
func main() {
    c := make(chan int, 5)
    go func() {
        for i := 0; i < 8; i++ {
            fmt.Println("push i:", i)
            c <- i
        }
        close(c) // 關閉 Channel
    }()
    for i := range c { // 在 close 後跳出迴圈
        fmt.Println("read i:", i)
    }
}
```
``` 
push i: 0
push i: 1
push i: 2
push i: 3
push i: 4
push i: 5
push i: 6
read i: 0
read i: 1
read i: 2
read i: 3
read i: 4
read i: 5
read i: 6
push i: 7
read i: 7
```
另外要注意的是, `range` 結束條件和 buffer size 無關, 
上例中 buffer size 為 5 的 Channel, 透過 `range` 仍可讀出 8 筆資料.
`range` 結束僅以 channel close 為準.


Select
------

在 Channel 推入/拉取時, 因 Channel 阻塞的特性, 會有一段等待的時間而造成 Goroutine 無法回應. 
如果此 Goroutine 是負責處理畫面的, 使用者就會看到畫面 lag 的情況, 這是我們不想見的情況.

例如之前提到的例子:
```go
func main() {
    ch := make(chan string)

    go func() {
        fmt.Println("calculate goroutine starts calculating")
        time.Sleep(time.Second) // Heavy calculation
        fmt.Println("calculate goroutine ends calculating")

        ch <- "FINISH"

        fmt.Println("calculate goroutine finished")
    }()

    fmt.Println("main goroutine is waiting for channel to receive value")
    fmt.Println(<-ch) // goroutine 執行會在此被迫等待
    fmt.Println("main goroutine finished")
}
```
``` 
main goroutine is waiting for channel to receive value # main goroutine 阻塞
calculate goroutine starts calculating
calculate goroutine ends calculating
calculate goroutine finished
FINISH # main goroutine 解除阻塞
main goroutine finished
```

main goroutine 要拉取 `ch` 的資料時會被迫等待.
這時無法回饋目前的狀態給使用者, 造成卡頓.

這時可以使用 Go 提供的 `select` 語法, 
讓開發者可以很輕鬆的處理 Channel 的多種情況, 包括阻塞時的處理.

``` go
func main() {
    ch := make(chan string)

    go func() {
        fmt.Println("calculate goroutine starts calculating")
        time.Sleep(time.Second) // Heavy calculation
        fmt.Println("calculate goroutine ends calculating")

        ch <- "FINISH"
        time.Sleep(time.Second)
        fmt.Println("calculate goroutine finished")
    }()

    for {
        select {
        case <-ch: // Channel 中有資料執行此區域
            fmt.Println("main goroutine finished")
            return
        default: // Channel 阻塞的話執行此區域
            fmt.Println("WAITING...")
            time.Sleep(500 * time.Millisecond)
        }
    }
}
```
``` 
WAITING... # main goroutine 在阻塞時可以回應
calculate goroutine starts calculating
WAITING... # main goroutine 在阻塞時可以回應
WAITING... # main goroutine 在阻塞時可以回應
calculate goroutine ends calculating
main goroutine finished # main goroutine 解除阻塞並結束程式
```
將剛剛的例子改為 `select` 來處理, 可以使 Channel 的推入/拉取不會阻塞:
-   會在沒有阻塞的情況下才會執行對應的區塊
-   `case <-ch:` 會等到沒有阻塞情況時 (`ch` 內有資料) 才會執行
-   `default:` 在所有的 `case` 都阻塞的情況下執行

因為有 `default` 可以設置, 當 Channel 阻塞時也可以藉由 `default` 輸出資訊讓使用者知道.


小結
----

Channel 是 Goroutine 的好幫手, 前篇善用 Channel 的阻塞特性, 
可以用來管理 Goroutine 共用變數存取等控制.

本篇說明 Channel 的阻塞時機 (推入阻塞及拉取阻塞),
以及 Unbuffered 及 Buffered Channel 對阻塞的差別.
則可藉由 Unbuffered Channel 降低效能上的損失.

Channel 傳回的第二個參數: ok, 可以判斷此 Channel 是否已經關閉, 
並被 range 用在結束巡覽的判斷中.

最後, select 可以 Channel 在阻塞時讓 Goroutine 保持非阻塞的狀態避免卡頓.

__藉由 Goroutine 及 Channel 簡單的語法但是強大的能力使工程師開發多工程式的時候可以寫出優雅又易於維護的代碼, 是 Go 語言的優勢之一__


See Also
--------

-   [Go 的並發：Goroutine 與 Channel 介紹 - Limitless Ping](https://peterhpchen.github.io/2020/03/08/goroutine-and-channel.html)
-   [Channel 與Goroutine - Golang 筆記](https://easonwang.gitbook.io/golang/ji-ben-yu-fa/channel)
-   [使用 Go Channel 及 Goroutine 時機 - 小惡魔 - AppleBOY](https://blog.wu-boy.com/2020/01/when-to-use-go-channel-and-goroutine/)
-   [[Golang] goroutines, channels, and concurrency](https://pjchender.dev/golang/goroutine-channels-concurrency/)
-   [Goroutine和channel的详细理解（一） - 精彩每一天](http://www.hangdaowangluo.com/archives/2504)
