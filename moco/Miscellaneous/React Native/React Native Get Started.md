---
title: React Native Introduction
description: React Native 入門介紹與基本概念
tags:
  - React Native
  - Mobile Development
  - Tutorial
sidebar_position: 1
date_created: 2022-08-25T06:05:03.000Z
image: 'https://i.imgur.com/mErPwqL.png'
slug: /miscellaneous/react-native/react-native-get-started/
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# React Native Introduction

## 什麼是 React Native

React Native 是 Facebook 開發的跨平台行動應用開發框架，讓開發者可以使用 JavaScript 和 React 的開發模式來建置原生行動應用程式。

### 核心優勢
- **跨平台開發**: 一套程式碼同時支援 iOS 和 Android
- **原生效能**: 直接編譯為原生組件，效能接近原生 App
- **熱重載**: 開發過程中可即時預覽修改結果
- **生態系統**: 豐富的第三方套件和工具支援

## Hello World 範例

以下是一個簡單的 React Native 應用程式範例：

```js title="HelloWorld.js"
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

這個範例展示了 React Native 的基本組件使用，包括文字、圖片、滾動視圖和輸入框。

## 線上開發環境

### Snack Player

[Snack](https://snack.expo.dev/) 是由 Expo 開發的線上 React Native 開發環境：

- **線上編輯**: 無需安裝，直接在瀏覽器中開發
- **即時預覽**: 支援手機即時預覽和測試
- **分享功能**: 輕鬆分享程式碼和成果
- **學習工具**: 適合初學者學習和實驗

## Component 開發模式

React Native 支援兩種主要的 Component 開發模式：

### Function vs Class Components

自 React Native 0.59 引入 Hook API 後，Function Component 已成為主流開發模式。

**優勢比較**:
- **Function Component + Hooks**: 簡潔、易讀、性能較佳
- **Class Component**: 傳統寫法，適合維護舊專案

<Tabs>
  <TabItem value="func" label="Function Component" default>

``` js title='Hello World function component.js'
import React from 'react';
import { Text, View } from 'react-native';

const HelloWorldApp = () => {
  return (
    <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}>
      <Text>Hello, world!</Text>
    </View>
  );
}

export default HelloWorldApp;
```

  </TabItem>
  <TabItem value="class" label="Class Component">

``` js title="Hello Worls class component"
import React, { Component } from 'react';
import { Text, View } from 'react-native';

class HelloWorldApp extends Component {
  render() {
    return (
      <View style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center"
        }}>
        <Text>Hello, world!</Text>
      </View>
    );
  }
}

export default HelloWorldApp;
```

  </TabItem>
</Tabs>


See Also
--------

- [Releasing React Native 0.59 · React Native](https://reactnative.dev/blog/2019/03/12/releasing-react-native-059)
- [Introducing Hooks – React](https://reactjs.org/docs/hooks-intro.html)   
  [Hook 简介 – React](https://zh-hans.reactjs.org/docs/hooks-intro.html)
