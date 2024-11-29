---
title: Core and Native Components
description: Core Components and Native Components
tags:
  - ReactNative
  - Tutorial
sidebar_position: 2
date_created: 2022-08-29T14:05:03+08:00
cover: https://i.imgur.com/mErPwqL.png
---
	
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

[ReactNative] Core and Native Components
========================================

React Native 使用 React 元件和平台原生功能來開發 Android 及 iOS App 的框架.
在 React Native 框架下, 開發者使用 JavaScript 去呼叫存取平台 API 處理資料和運算邏輯,
並使用 React 元件來描繪介面 UI 外觀與 UX 互動行為.


Views and mobile development
----------------------------

iOS 和 Android App 開發中, `View` 是 UI 最基本的組成元件:
可用來顯示文字, 圖片, 或是使用者輸入等的矩形元件.
App 上看得到的各種元件 (一段文字, 一個按鈕... 等) 都是各種 View.



Native Component
----------------

移動平台的開發中, 不同平台有各自支援的原生開發工具與程式語言. 
在 Android 中使用 Kotlin 或 Java 來編寫 UI View,
而 iOS 開發則是使用 Swift 或 Objective-C.
在 React Native 框架下, 則是使用 JavaScript 語言調用 React component 進行開發. 
程式執行時, React Native 替這些 React component 創建對應的 Android / iOS / Web UI View.

實際上 React Native component 就是對 Platform native component 的一種封裝, 
因此使用 React Native 開發的應用程式 UI / UX / Performance 和原生語言開發的程式幾乎一樣.
這類透過平台 UI Library 所支援 view 為 __Native Component__.

React Native 官方提供了許多基礎的 Native Component, 稱之為 __Core Components__.
透過這些核心元件, 已經可以開發多數應用程式所需 UI View 了.

除了官方提供的核心元件外, React Native 允許開發者開發與擴展屬於自己的 Native Component, 以滿足應用程式需求.
而相當活躍的 React Native 生態, 社群也發展貢獻了不少 Native Component, 收錄於 [native.directory](https://native.directory/).



Core Component
--------------

React Native 有許多核心元件, 包括表單控制, 活動指示器... 等等. 
依 React Native 版本不同可能有所差別, 可參考官方說明 [Core Components and APIs](https://reactnative.dev/docs/components-and-apis).

以下是最常用的核心元件, 及在個平台對應的 Native UI Component 列表:

| REACT NATIVE UI COMPONENT | ANDROID VIEW   | IOS VIEW         | WEB ANALOG |
|---------------------------|----------------|------------------|------------|
| < View >                  | < ViewGroup >  | < UIView >       | A non-scrolling < div > |
| < Text >                  | < TextView >   | < UITextView >   | < p > |
| < Image >                 | < ImageView >  | < UIImageView >  | < img > |
| < ScrollView >            | < ScrollView > | < UIScrollView > | < div > |
| < TextInput >             | < EditText >   | < UITextField >  | < input type="text" > |

透過這些基礎元件, 即可完成一些基本 App 應用的開發.

``` js title="Hello World"
import React from 'react';
import { View, Text, Image, ScrollView, TextInput } from 'react-native';

const App = () => {
  return (
    <ScrollView>
      <Text>Some text</Text>
      <View>
        <Text>Some more text</Text>
        <Image
          source={{
            uri: 'https://reactnative.dev/docs/assets/p_cat2.png',
          }}
          style={{ width: 200, height: 200 }}
        />
      </View>
      <TextInput
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1
        }}
        defaultValue="You can type in me"
      />
    </ScrollView>
  );
}

export default App;
```



See Also
--------

- [native.directory – An App Developers Blog](https://native.directory/)
- [Core Components and APIs](https://reactnative.dev/docs/components-and-apis)
