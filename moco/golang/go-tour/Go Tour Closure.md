---
title: Closure
description: Closure
tags:
  - Go
  - Go/GoTour
date_created: 2022-04-13T02:05:05.000Z
image: >-
  https://lh3.googleusercontent.com/pw/AM-JKLWu8wVpy5iA1V-YEeQHafjhEuZiS8kFPaPu0pj_m6yi09YtCsVYFT8Z6LxtDL57sWDXa8rRZm6B_OsIhWjgBWupJ1ZopYhtDR5PMn-4q8ypuliQvh5KDBfdZmKAxOkIXb4FhRvkuQsRhKiyjB02tR6otw=w860-h480-no?authuser=0s
slug: /golang/go-tour/go-tour-closure/
---

[Go] Tour: Closure 心得筆記
==========================


匿名函數 Anonymous functions
---------------------------

匿名函式指不需要定義函式名的一種函式實現方式.  
近期熱門的語言中, JavaScript 中很常見匿名函式,
如: 傳統的 callback function, lambda 都是匿名函式的一種.

``` go
type Predicate = func(int) bool

func filter(origin []int, predicate Predicate) []int {
    filtered := []int{}
    for _, elem := range origin {
        if predicate(elem) {
            filtered = append(filtered, elem)
        }
    }
    return filtered
}

func main() {
    data := []int{1, 2, 3, 4, 5, 6, 7, 8, 9, 10}
    fmt.Println(filter(data, func(elem int) bool {
        return elem > 5
    }))
    fmt.Println(filter(data, func(elem int) bool {
        return elem <= 6
    }))
}
```
這段函式和 callback function 類似，傳遞匿名函式給 `filter`.
可以看到在 golang 裡，可用 func 建立匿名函式.
和一般函式一樣, 必須指定參數和回傳值.

golang 無法在函式中宣告另一個函式，但可建立匿名函式後指定給某個變數.
此變數將如同一般變數一樣, 非但可以當作參數來傳遞, 也可以當成返回值.

``` go
func funcA() func(int) int {
    x := 10
    a := func(n int) int {
        return x + n
    }
    return a
}

func main() {
    fmt.Println(funcA()(2)) // 12
}
```
在上面的範例中, 執行 funcA 會傳回一個函式.
這個傳回的函式會將接受的引數指定給參數 n, 並與 x 的值進行相加,
因此最後顯示結果為 12.


閉包 Closure
------------

可以在函式中建立匿名函式, 引發了一個有趣的事實, 先來看個例子:

``` go
type Consumer = func(int)

func forEach(elems []int, consumer Consumer) {
    for _, elem := range elems {
        consumer(elem)
    }
}

func main() {
    numbers := []int{1, 2, 3, 4, 5}
    sum := 0
    forEach(numbers, func(elem int) {
        sum += elem
    })
    fmt.Println(sum) // 15
}
```
呼叫 forEach 函式時, sum 變數被包入匿名函式中傳遞.
而在執行 forEach 迴圈時的過程, 每次呼叫傳入的匿名函式, 就會更改 sum 的值.
因此最後得到加總的值 15.

實際上, 使用 forEach 函式的範例中, 建立了一個閉包.
閉包本質上就是一個匿名函式, sum 變數被閉包包覆, 讓 sum 變數可以存活於閉包的範疇中.

### 何謂閉包？ ###

>   WIKI： 
>   In programming languages, closures (also lexical closures or function closures) are techniques for implementing lexically scoped name binding in languages with first-class functions.
>   A closure is a function value that references variables from outside its body. 

閉包將變數本身關閉在自己的範疇中, 而不是變數的值.
因此閉包能夠讀取其他函式內部變數.
看一下 _Go by Example: Closures_ 中的範例:

``` go
func intSeq() func() int {
    i := 0
    return func() int {
        i++
        return i
    }
}

func main() {
    nextInt := intSeq()

    fmt.Println(nextInt())
    fmt.Println(nextInt())
    fmt.Println(nextInt())

    newInts := intSeq()
    fmt.Println(newInts())
}
```
```    
$ go run closures.go
1
2
3
1
```

呼叫 intSeq() 時會回傳一個匿名函式, 建立函式時同時會保存所使用的變數.
閉包內的變數不會因執行結束而消失, 會持續保存著.
閉包函式被呼叫時, 會使用自身保存的變數來進行相對運算.

而在該閉包函式中的變數, 只能透過對應的匿名函式存取, 無法透過其他方式存取.
一定程度下確保了閉包變數的安全性.

再次呼叫 intSeq() 時會建立新的閉包, 相關變數和先前的閉包彼此獨立.

### 閉包變數存取 ###

``` go
type Getter = func() int
type Setter = func(int)

func x_getter_setter(x int) (Getter, Setter) {
    fmt.Printf("the parameter :_x (%p) = %d\n", &x, x)

    getter := func() int {
        fmt.Printf("getter invoked:_x (%p) = %d\n", &x, x)
        return x
    }
    setter := func(n int) {
        x = n
        fmt.Printf("setter invoked:_x (%p) = %d\n", &x, x)
    }
    return getter, setter
}

func main() {
    getX, setX := x_getter_setter(10)
    getX1, setX1 = x_getter_setter(10)

    fmt.Println("x = ", getX())
    setX(20)
    fmt.Println("x = ",  getX())
    fmt.Println("x1 = ", getX1())
}
```
``` 
10
20
10
```

這個範例中, getX 和 setX 兩個閉包函式是在同次 x_getter_setter 呼叫時所建立的匿名函式.
所存取到的 x 為相同的變數, 因此 setX() 修改後的 x 可被 getX() 讀取.  
而 getX 和 getX1 不是同次呼叫 x_getter_setter 建立的閉包函式, 有各自的 x 變數,
彼此獨立無法相互修改.

### Example: fibonacci ###

``` go
func fibonacci() func() int {
    x, y := 0, 1
    return func() int {
        result := x
        x, y = y, x+y
        return result
    }
}

func main() {
    f := fibonacci()
    for i := 0; i < 10; i++ {
        fmt.Println(f())
    }
}
```
上面範例是 _A Tour of Go_ 中的 fibonacci 練習題.  
呼叫 fibonacci() 時會建立匿名函式, 該匿名函式可以存取 x, y 的值.
重複呼叫閉包函式, 可透過 x, y 的變化, 完成費氏數列的產出.


See Also
--------

-   [What is a Closure? - Calhoun.io](https://www.calhoun.io/what-is-a-closure/#closuresprovidedataisolation)  
    [5 Useful Ways to Use Closures in Go](https://www.calhoun.io/5-useful-ways-to-use-closures-in-go/)  
    [Gotchas and Common Mistakes with Closures in Go](https://www.calhoun.io/gotchas-and-common-mistakes-with-closures-in-go/)
-   [匿名函式與閉包 - openhome.cc](https://openhome.cc/Gossip/Go/Closure.html)
-   [Go by Example: Closures](https://gobyexample.com/closures)
-   [Closure in Golang - 簡書](https://www.jianshu.com/p/3934e62d78a1)
