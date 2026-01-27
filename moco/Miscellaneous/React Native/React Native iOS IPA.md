---
title: Running On iOS
description: Running your app on iOS devices
tags:
  - ReactNative
  - DevEnv
  - iOS
sidebar_position: 2
date_created: 2022-09-05T16:00:00.000Z
image: 'https://i.imgur.com/mErPwqL.png'
slug: /miscellaneous/react-native/react-native-ios-ipa/
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

[ReactNative] Running on iOS devices
===========================

雖然可以透過模擬器進行 App 功能驗證, 但在實體裝置上執行 App 並確認功能仍是必要的, 尤其在第一次發行或版本升級等情況下.

> 使用 Expo 建立的 App, 可直接透過 Expo App 掃描 QRCode 進行預覽. 
> 這邊紀錄使用 React Native CLI 建立的專案如何在 iOS 裝置上安裝測試.



Running your app on iOS devices
-------------------------------

### 1. Plug in your device via USB ###

先連接 iOS 裝置到 Mac 電腦上, iOS 裝置連上電腦時會跳出信任此電腦的提式框, 需信任.
打開 Xcode. 如果專案有使用 CocoaPods, 開啟 `ios/APP.workspace`, 否則就打開 `ios/APP.xcodeproj` 專案檔.

Xcode: `Product > Destination` 選擇所連接的 iOS 裝置.

![iOS device](https://lh3.googleusercontent.com/pw/AL9nZEWrnC2-hZekZyoIjmIZwXjWdkT9TSjJaxcl_RkiXrTzgKMLyLJ9p1-CZCSNrMGAP3KrFwLfAU0o4bh3-zehr-b-IFtno3LBRkaZPFLUudRt6-T8Gh3lnL0YzeAJ-vtq5qaA7qP-NBuoVNGuvhdRUWCvDg=w800-no?authuser=0)

> 第一次在 iOS 裝置上執行 App 時, Xcode 可能會跳出設定提式視窗, 跟著視窗指示註冊裝置即可.

### 2. Configure code signing ###

後續步驟需要有 [Apple Developer account](https://developer.apple.com/), 沒有的話需先註冊.

在 Xcode Project 中找到對應的 project 和 target. 
在 __General__ 分頁中的 __Signing__ 中確認選擇了開發者或團隊帳號.

![](https://lh3.googleusercontent.com/pw/AL9nZEVoJ-FiB5vAg-0_vlqYVkCQBEvdmVaNuO7G4-REdVPzIuIsDIXFWr67hJfP2DgLvLfY-PeYVdoRLQUyuPRNryreeg3R0jNZkbwjO5h9kQgfRsrcBPvSkOs_5Ml0QgHapOMDgJAGXIxp-9X5iY2V3zXU7w=w800-no?authuser=0)

### 3. Build and Run your app

如果設置正確, Xcode 理應該可以看到 build target 為 iOS 裝置.
按下 __Build and Run__ 按鈕 (⌘R) 或 Product 選單中選擇 Run, App 經過編譯後, 就會在裝置上自動執行.

![](https://lh3.googleusercontent.com/pw/AL9nZEXPYmejitTCJi7AiWGf3z4O1Z7aQlW1_ZEGO3SGYoOqZ41rEYHrd_HceCloZNea51UOqy5y0SOb9T_X1lFbQzPALNfWQcQvP_BlKanQ8gxrHbGDJhfpbNDysxXbTQhs2pNMjNMSjO_yGhpQAxCnndkDVg=w686-no?authuser=0)

> 因設置不同, 可能會多次跳出要求存取 Keychain 的提示視窗, 一一輸入障密同意即可.
> _(應該有辦法避免, 確認方式後再更新文章)_

> If you run into any issues, please take a look at Apple's [Launching Your App on a Device docs](https://help.apple.com/xcode/mac/current/#/dev60b6fbbc7).



Connecting to the development server
------------------------------------

### Troubleshooting ###






See Also
--------

-	[Running On Device · React Native](https://reactnative.dev/docs/running-on-device)  
	[在设备上运行 · React Native 中文网](https://reactnative.cn/docs/running-on-device)
-	[Signing & Capabilities workflow - Xcode Help](https://help.apple.com/xcode/mac/current/#/dev60b6fbbc7)
