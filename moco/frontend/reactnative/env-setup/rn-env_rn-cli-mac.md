---
title: CLI For macOS
description: React Native CLI for macOS
tags:
  - ReactNative
  - DevEnv
  - Mac
sidebar_position: 1
date_created: 2022-08-17T00:00:00+08:00
cover: https://i.imgur.com/mErPwqL.png
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> 	網路資訊因版本新舊設定步驟與說明略有出入, 本篇在 `React Native 0.69` 時編寫.
> 	建議以官方文件為準, 本文純作為設定過程與錯誤排除個人紀錄. 

[ReactNative] Setup CLI environment 
===================================

React Native 開發環境設置分成 Expo CLI 和 React Native CLI 兩種:

-	Expo 集成了許多 React Native 開發所需工具, 提供大部分 App 所需功能, 可以快速建制基礎開發環境.
	並可透過瀏覽器或 [Snack](https://snack.expo.dev) 來檢視測試 React Native App.
	無須花費大量時間處理 Xcode / Android Studio 設置, 大幅簡化開發前置作業, 適合新手入門.

-	React Native CLI 則是使用原生開發環境來建構 React Native App. 依 OS 和發行版本的不同,
	詳細步驟也不相同, 需要處理 Xcode / Android Studio 發布環境的配置. 
	由 React Native CLI 配置的專案, iOS / Android 的 App entry point 是分開的,
	可以安裝各自平台的 Native packages / libries.

官方建議入門新手適合 Expo CLI, 從熟悉 React Native 開發開始, Expo 環境亦可進行多數 App 功能開發.
而 React Native CLI 則是較有經驗或需要更進接底層功能的開發者使用.

__Target OS__

<Tabs groupId="target-os">
  <TabItem value="iOS" label="iOS" default>

Installing iOS dependencies
---------------------------

必須安裝的軟體有 `Node`, `Watchman`, `Xcode`, `CocoaPods`.

可以使用任何編輯器來開發 React Native App (js 程式碼), 
但仍需要安裝 Xcode 來取得編譯 iOS App 時所需要的工具和環境.


### Node & Watchman ###

透過 `homebrew` 來安裝 `Node`, `Watchman` 是最方便的.

```
brew install node
brew install watchman
```

原本就有安裝 Node 的話, 要注意 React Native 僅支援 Node 14 以上的版本.

Watchman 是 Facebook 提供的檔案系統的變更監控工具, packager 可以監控檔案變化而即時更新,
因而提升開發效率.

#### Yarn ####

`yarn` 是 Facebook 提供的 npm 替代工具, 下載 npm package 時效率比原生 npm 好上不少.
yarn 大多數的命令使用都和 npm 相同, 安裝完 yarn 後就可以用 yarn 取代 npm 了.

```
npm install -g yarn
```


### Xcode ###

React Native 需要 `Xcode` 10 以上的版本, 直接從 `Mac App Store` 下載即可.
安裝設定 Xcode 時, 同時會安裝 `Xcode IDE`, `Command Line Tools`, 和 `iOS Simulator`.
這些是編譯和測試 iOS App 的必要工具.

#### Command Line Tools ####

Xcode command line tools 中包含一些常用且必備的工具, 例如 git 等.

打開 Xcode, 確認 `Preferences > Locations > Command Line Tools` 選單中檢查是否有某版本的 Command Line Tools.
通常安裝 `homebrew` 時同時會安裝 Command Line Tools, 選單中可以直接選擇才是.

![Xcode CLI location](https://lh3.googleusercontent.com/pw/AL9nZEX4BN1quNdGXWPnQ3kxcalrXbWkPLXcL2Ao0-szSghxKweB6-bafqNq7rdsdt6fiQtGXspQhH2jEUAu4_u11ZrZGp_cBe7uvrTpS4cg-D0o4jzWY-9TABBEgOToELvVq-fnk-29JAUc9Vkd_pzPk4vbdA=w800-no?authuser=0)

#### iOS Simulator ####

`Xcode > Preferences > Component`, 即可下載安裝不同版本的 iOS 模擬器.

![iOS Simulator](https://lh3.googleusercontent.com/pw/AL9nZEU6id3WirII75Pbia_6pcTaHcPO3MV-_yyec6lyD-vZobguDKcg58sCroVPfdVW_x3rh7t1pXfuMrOJpa0cGEwt7HAp5c1fGJ8JcMXwfYDL5kK8OrMbibyc435mGXk903tZ9ZdOIltaaXM3PS1CAkeGWA=w800-no?authuser=0)

若要刪除不需要的 iOS 模擬器, 把 `/Library/Developer/CoreSimulator/Profiles/Runtimes` 裡用不到的 Runtime 刪掉即可.
-	[How To Remove Old Simulators From Xcode? | Level Up Coding](https://levelup.gitconnected.com/how-to-remove-old-simulators-from-xcode-634111c3e94b)


### CocoaPods ###

`CocoaPods` 是用 Ruby 所開發的套件管理工具, 用來管理相關依賴的套件等. 
React Native CLI 0.60 後的 iOS 版本都需要 CocoaPods.

可透過 `Ruby gem` 或 `Homebrew` 來安裝 CocoaPods.

```
sudo gem install cocoapods
```
或
```
brew install cocoapods
```

若沒有安裝 CocoaPods, React Native CLI 在建立專案時亦會跳出安裝提示如下:

```
✔ CocoaPods (https://cocoapods.org/) is not installed. CocoaPods is necessary for the iOS project to run correctly. Do you want to install it? 
› Yes, with Gem (sudo maybe need)
› Yes, with Homebrew
✔ Installing CocoaPods
⠇ Installing CocoaPods dependencies (this may take a few minutes)
```

其他相關資訊, 可參考 [CocoaPods 官網](https://guides.cocoapods.org/using/getting-started.html).

#### Apple Silicon ####

Cocoapods 目前在 Apple Silicon 架構上可能還有一些問題. 
若安裝 pods 依賴出現問題, 可以嘗試後續指令.
這會安裝 `ffi` 套件, 用以安裝與載入 pods 時選用合適的架構.

```
sudo arch -x86_64 gem install ffi
arch -x86_64 pod install
```

或是透過 Homwbrew 安裝 CocoaPods 比較不會有問題.

  </TabItem>
  <TabItem value="Android" label="Android">

Installing Android dependencies
-------------------------------

必須安裝的軟體有 `Node`, `Watchman`, `JDK`, `Android Studio`.

可以使用任何編輯器來開發 React Native App (js 程式碼), 
但仍需要安裝 Android Studio 來取得編譯 Android App 時所需要的工具和環境.


### Node & Watchman ###

透過 `homebrew` 來安裝 `Node`, `Watchman` 是最方便的.

```
brew install node
brew install watchman
```

原本就有安裝 Node 的話, 要注意 React Native 僅支援 Node 14 以上的版本.

Watchman 是 Facebook 提供的檔案系統的變更監控工具, packager 可以監控檔案變化而即時更新,
因而提升開發效率.

#### Yarn ####

`yarn` 是 Facebook 提供的 npm 替代工具, 下載 npm package 時效率比原生 npm 好上不少.
yarn 大多數的命令使用都和 npm 相同, 安裝完 yarn 後就可以用 yarn 取代 npm 了.

```
npm install -g yarn
```


### Java Development Kit ###

官方推薦使用 Homebrew 安裝由 _Azul_ 所發佈, 名為 __Zulu__ 的 OpenJDK 版本.
這個版本同時支援 `Intel` 和 `Apple Silicon` 晶片, 
在 Apple Silicon 架構的 Mac 上編譯時, 比起其他 JDK 版本有明顯效能優勢.

```
brew tap homebrew/cask-versions
brew install --cask zulu11
```

React Native 需要 JDK 11. 可以透過 `javac -version` 命令確認機器上的 JDK 版本.


### Android Studio ###

#### 1. Install Android Studio ####

[下載並安裝 Android Studio](https://developer.android.com/studio). 
第一次打開 Android Studio, 會跳出套件安裝精靈. 
在安裝過程中, 確認以下項目有勾選安裝, Next 等候安裝完成即可.
- Android SDK
- Android SDK Platform
- Android Virtual Device

#### 2. Install Android SDK ####

Android Studio 安裝精靈預設安裝最新版的 Android SDK. 
而目前 React Native native code 需要 Android 12 (S) SDK 版本. 
可以透過 SDK Manager 手動安裝對應的版本.

> Android Studio → More Actions → SDK Manager  

![Android Studio Welcome](https://lh3.googleusercontent.com/pw/AL9nZEXmxh_PV1TE-uS-H_opQRZpfMnWyH9Xr9F_D-tgawjFcNgwCnC6Yru1bqvPgfjQt6rSrednbYfsnuxoyEXrL48VMKW0JdZLHeVlHirM6vddepk2R3GCd57hrR8-rniGXFTrB0JMHVYfKcnOfRc4cOYYIw=w800-no?authuser=0)

> or Android Studio Preferences → Appearance & Behavior → System Settings → Android SDK.

![Android Studio Preferences](https://lh3.googleusercontent.com/pw/AL9nZEUNeFOKI6cs7m88nIMZMJeo1Xx981A4iFhR7eBmSR9W_Yb_1MIiLuqFMqxv1_ZYjWOxrvJSMNUgLAmxvjrtztouUL097VlPbfLCTDRPjLla8ZUYvuyUcpU96X8kG3eSlRkahm4OxEEZTldX7bJTCxzIiQ=w800-no?authuser=0)

在 SDK Manager 中選擇 _SDK Platform_, 勾選 _Show Package Details_. 
展開 _Android 12 (S)_, 勾選以下元件:

- Android SDK Platform 31
- Google APIs Intel x86 Atom System Image or 
  (for Apple Silicon) Google APIs ARM 64 v8a System Image

然後選擇 _SDK Tools_, 同樣勾選 _Show Package Details_.
展開 _Android SDK Build-Tools_, 勾選 React Native 所需要的 31.0.0.
依個人開發需求, 可同時安裝多個版本.

勾選完後, `Apply` or 'OK' 以進行下載安裝元件.

#### 3. ANDROID_SDK_ROOT ####

React Native 會透過環境變數來取得 Android SDK 路徑來進行編譯指令,
在環境變數中加入以下設定:  
依 shell 不同編輯 ~/.bash_profile or ~/.zshrc 或其他個人適用的設定檔.

```
export ANDROID_SDK_ROOT=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_SDK_ROOT/emulator
export PATH=$PATH:$ANDROID_SDK_ROOT/platform-tools
```

  </TabItem>
</Tabs>


React Native CLI
----------------

React Native 專案需要引用不少相關套件, 雖然可以手動刻寫 `package.json` 等專案基礎項目, 
但最方便還是直接使用 React Native 內建的命令列指令建立新專案.

> 	關於 React Native 命令, 過往版本環境設置教學都是在本地端全局安裝 `react-native-cli` 套件.
> 	而官方現在建議 `npx react-native <command>` 來進行 CLI 的相關操作.
> 	
> 	若曾經安裝過 react-native-cli 命令列工具, 需先移除已避免衝突.
> 	`npm uninstall -g react-native-cli`

### Create new application ###

直接透過 npx 命令來建立 AwesomeProject 專案.  

```
npx react-native init AwesomeProject
```

> 若要把 React Native 集成到既有的 App 項目, 流程完全不同.

### Using a specific version or template ###

`init` 預設會安裝最新版的 React Native 版本.
若要指名特定版本的 React Native, 在指令後面加上 `--version` 參數:
```
npx react-native init AwesomeProject --version X.XX.X
```

亦可使用 `--template` 來使用一些客製化專案樣板, 例如支援 `TypeScript`:
```
npx react-native init AwesomeTSProject --template react-native-template-typescript
```


Running your React Native application
-------------------------------------

<Tabs groupId="target-os">
  <TabItem value="iOS" label="iOS" default>

### iOS App ###

在專案資料夾中執行 `yarn ios` 或 `npx react-native run-ios`

```
cd AwesomeProject
yarn ios
# OR
yarn react-native run-ios
```

這個指令會把 React Native 專案原生的部分進行編譯, 
同時再另一個命令列起動 `Metro` 服務, 對 js code 的部分即時封裝打包.

編譯打包完成後, 就可以看到 iOS 模擬器自動開啟並執行 AwesomeProject 專案.

![](https://lh3.googleusercontent.com/pw/AL9nZEVnph4k7HbleAAPMyLPSIg9Wth9g3td6Ur6IXF3SvAIJpWFlBbXIPhiDBNbLvZ-WiPtnqayqBBUOJdQqjMGwHKKJcE1FN8DXmcox9A1_7DmIXNQ4ZbdzFVY5ejE0oT6xlk7i-Tc4nXnsUtyzOp-cl2Wnw=w800-no)

初次開啟專案完成編譯後, 開發期間保持 metro 視窗, 則 js 修改的項目可即時被打包載入.
日後再度開啟專案時, 若沒有修改 iOS 資料夾下的檔案, 可以使用 `yarn start` 以快速開啟專案.
而 iOS 資料夾中下的檔案若有更動, 則需再次執行 `yarn ios` 重新編譯原生項目. 

#### on iOS device ####

iOS 專案項目腳本會自動在 iOS 模擬器中開啟專案, 可直接利用 iOS 模擬器中進行開發測試.
若要在裝置上執行, 另參考[在 iOS 裝置執行](#).

  </TabItem>
  <TabItem value="Android" label="Android">

### Prepare Android device ###

必須準備一價 Android 裝置來執行 React Native Android app. 
Android 裝置並不限使用實體手機, Android 模擬器或透過官方 AVD 建立虛擬裝置亦可.

#### physical device ####

使用 Android 實體手機進行開發測試, 把 USB 連接手機和電腦, 
跟著各手官方機說明, 打開開發者模式, 確認 ADB 可以正確識別裝飾即可.

#### virtual device ####

在 Android Studio 中, 打開 AVD Manager 來選擇可用的虛擬裝置.
或創建一個新的虛擬裝置來進行開發.

`Create Virtual Device...` > 選擇喜歡的手機模版 (螢幕大小, dpi... 等) >
`S API Level 31` > Finish 即可. 虛擬裝置建立完成後可先行啟動一次, 讓裝置運行必要初始化設定.

![AVD manager](https://lh3.googleusercontent.com/pw/AL9nZEXFgkEImSTaYQmWs5VZzdHR3MnDVxrYIfsv1rhrYixMWcGnkQJ7xm33ZOaA7GbtbG40b2Yl-FdpFpYyo45zUUf5dMy7oKjjABWv1Tb2LSQjdfg5zhrHgm3Kkgr9Irj985fM_HyOxN2dX6RI6lGZKf40JA=w800-no?authuser=0)

![AVD](https://lh3.googleusercontent.com/pw/AL9nZEXV8tr6CQ9MGXW550g1VTGLhfBA_6Fz8BxVv6ELg3_Jz8ge1h-qn4onIXKTlv_UEYc1Jl_pCunfpbhIsvsz0JMqcNhSHfXQSZXibCyzCE4tuV-DtEExdbOWjyoGDrSmhEcViQCkSyR_PaiZ9VOSRAYfRw=w600-no?authuser=0)

### Android App ###

無論使用實體手機或使用虛擬裝置, 需確認 `ADB` 可以正確識別裝置, 才可進行開發測試.

![adb devices](https://lh3.googleusercontent.com/pw/AL9nZEWZgtaODXoQcIde7PYuksSnT1S2bkrBz5bCQN9DipoSr2d8D9Am8RBU-HosroZSotVJ9UgYe8L9Z1IcFMvTDnhHahBRDFVnF3A8xgLUWwxAGLQG_Ff0gIfd1SfOUTcEKubmlUxsm9OuQS3UoIB66oTkVA=w458-h244-no?authuser=0)

執行 React Native Android app 和 iOS 類似,

```
cd AwesomeProject
yarn android
# OR
yarn react-native run-android
```

這時候會開始編譯專案, 編譯完成後會自動在測試裝置上執行專案 App.
第一次執行時, 需要下載大量相關套件依賴, 會花上好些時間.
編譯成功後, 除非版本更新等, 一般來書喔日後無須再下載了.

![React Native Android app](https://lh3.googleusercontent.com/pw/AL9nZEW6RebevudFVEIpTlgQr63t3oHsrjIF4ncYJQ5gGFPWIOyCQrBdXrjyrLUr3G6fN7r6cwu9T4PjWqKA0kICg1OQ0r1XgDJO7ieC1HIb8eWRbuAplp6Y0-V3OEz_DzWg8aF-2jNQ17sXHhLjLyHI9xIr-w=w800-no?authuser=0)

  </TabItem>
</Tabs>


Modifying your app
------------------

專案可以正確在模擬器上開啟後, 環境安裝就完成, 可以開始編輯開發 React Native App 了.

-	編輯 `App.js` 任何文字編輯器皆可.
- 在模擬器上重新載入頁面. `iOS ⌘-R` / `Android R` 即可看到修改後的頁面.

### Project src tree ###

```
Project Structure

.
├── App.js  # App root component，所有JS code由這裡開始
├── android/  # Android native project
├── app.json  # React Native app config
├── index.js  # App entry point
├── ios/  # iOS native project
├── node_modules/  # JS libraries
├── package.json  # JS dependencies
└── yarn.lock
```


That's it!
----------

Congratulations! You've successfully run and modified your first React Native app.


See Also
--------

接手的專案是 React Native 0.53 版本, 有些環境設置有所不同.
網路資訊因版本新舊設定步驟與說明略有出入, 本文在 `React Native 0.69` 時編寫.

-	[Setting up the development environment](https://reactnative.dev/docs/environment-setup) | 
	[搭建开发环境 · React Native 中文网](https://reactnative.cn/docs/environment-setup)
-	[建置 React Native 開發環境 | 傑部落 Jablog](https://www.jablog.site/docs/react-native/setup/)
-	[React Native教學 Part 1 - 詳盡新手入門 - Carson's Tech Note](https://carsonwah.github.io/15221461803635.html)
