---
title: Introduction
description: Introduction to React Native
tags:
  - ReactNative
  - Tutorial
sidebar_position: 1
date_created: 2022-08-25T14:05:03+08:00
image: https://i.imgur.com/mErPwqL.png
---
	
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

[ReactNative] Introduction
==========================

React Native
------------

React Native 是 Facebook 開發的框架, 讓開發人員用寫 React 的方式以 JavaScript 開發 App.
React Native 框架負責把 JS 轉成平台原生程式碼.
對網頁開發人員來說, 可以透過網頁技術開發 App, 還可以發佈雙平台的 App, 大幅減少探索的門檻.

### Hello World ###

``` js title="Hello World.js"
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

官網提供的 Hello World 範例中, 真的是只用上了元件的 React. 

### Snack Player ###

可以透過 [Snack - React Native in the browser](https://snack.expo.dev/) 預覽 React Native App 在手機上執行的樣子.

Snack 是由 Expo 所開發的線上工具, 集成了 react-native-web 相容層, 
會盡量把 React Native JS 程式碼轉換成網頁相容的程式碼, 可以直接在網頁上預覽與修改程式.
適合用於學習, 展示 React Native . 



Function and Class Components
-----------------------------

在 JavaScript everything is an object 的基礎背景下, Function 或 Class 皆可當作 React component.

自從 [`React Native 0.59` 引入 `Hook API`](https://reactnative.dev/blog/2019/03/12/releasing-react-native-059) 以後,
函數元件可以和類別元件一樣使用 state 等其他功能. 功能面上來說, 函數元件和類別元件幾乎沒有差異.
開發者可以自行決定把程式需求寫成函數元件或類別元件.

而 [__Hooks__](https://reactjs.org/docs/hooks-intro.html) 是官方未來發展的趨勢, 
官方文件中也預設以函數元件當作範例, 
編寫 React Component 時, 除非有老舊專案仍需使用 Class Component,
否則以 Function Component 加上 Hooks 會是比較好的選擇.

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
