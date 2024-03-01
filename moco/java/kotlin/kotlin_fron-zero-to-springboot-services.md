---
title: "Note: 30天從零開始 Spring Boot 開發"
description: "Kotlin: Get Started"
tags: [Kotlin, Note]

#sidebar_position: 1
#sidebar_label: Easy
#sidebar_class_name: green

hide_table_of_contents: false

created: 2024-02-10
image: https://lh3.googleusercontent.com/pw/AL9nZEUA9Ifvd5Z8SXDWkeVB6AC4MPGwnXaL6kBXNPoXwOQQ2jOcZ1Jw_0p8TKK8C3ZX0e67_FOY15eDrm7aaXSQJcKtoUzC80SAQEHsaBy6qS2AqNNs5VUFNXBKm439y_1wkvmDl-PnL8ReojnIumNlEvOXBg=w800-no?authuser=0
---

[Kotlin] 30天從零撰寫 Kotlin 語言並應用於 Spring Boot 開發
====================

> 本篇為 [30天從零撰寫 Kotlin 語言並應用於 Spring Boot 開發](https://ithelp.ithome.com.tw/users/20121179/ironman/3005) 筆記, 閱讀與實作過程中的隨手紀錄, 無結構化整理.


Basic in Kotlin
---------------

### 變數型別 ###

> In Kotlin, everything is an object in the sense that we can call member functions and properties on any variable.

#### 變數宣告 ####

Kotlin 在變數宣告時主要會使用到兩種關鍵字 __val__ 和 __var__:

- val 用於唯讀變數，一旦給值就無法再修改
- var 用於需要重新修改數值的情況

```kotlin
fun main() {
	val readOnlyVariable = "鐵人賽第十二屆" // 宣告一個唯讀變數
	var playerName = "選手一號" // 宣告一個可重新修改數值的變數
	playerName = "選手二號" // 重新賦予新數值
}
```

Kotlin 官方這邊也有建議開發者在開發上建議優先使用 __val__, 遇到需要修改數值時再轉為 __var__ 即可.
若使用 __var__ 宣告變數, 開發者若沒有在程式中修改過, Intellij 編輯器也會提示建議改為 __val__.

#### 空值 (null) 型態 ####

Kotlin 預設宣告都只能是非 __null__ 型態, 這樣能夠有效避免開發者經常出現錯誤的問題.
而如果在開發情境上確實有必要使用 __null__ 值, 則可以將變數定義為 __nullable__ 狀態, 在變數的型態定義上加上 ? 即可:

```kotlin
fun main() {
    var test: String? = "鐵人賽"
    test = null
    println(test) // 印出 null
}
```

#### 型別判斷處理 ####

Kotlin 變數上有個特色是型別判斷處理, 允許開發者省略型別定義, 可對於已指派預設值的宣告變數自動定義型別.



See Also
--------

### Resources

- [Kotlin Programming Language](https://kotlinlang.org/)
	- [Kotlin Playground: Edit, Run, Share Kotlin Code Online](https://play.kotlinlang.org/)
