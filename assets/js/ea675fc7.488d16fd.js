"use strict";(self.webpackChunkblog_kywk=self.webpackChunkblog_kywk||[]).push([[52027],{38580:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>s,contentTitle:()=>d,default:()=>u,frontMatter:()=>a,metadata:()=>l,toc:()=>p});var r=i(85893),t=i(11151),o=i(74866),c=i(85162);const a={title:"CLI For macOS",description:"React Native CLI for macOS",tags:["ReactNative","DevEnv","Mac"],sidebar_position:1,date:new Date("2022-08-16T16:00:00.000Z"),image:"https://i.imgur.com/mErPwqL.png"},d="[ReactNative] Setup CLI environment",l={id:"frontend/reactnative/env-setup/rn-env_rn-cli-mac",title:"CLI For macOS",description:"React Native CLI for macOS",source:"@site/moco/frontend/reactnative/env-setup/rn-env_rn-cli-mac.md",sourceDirName:"frontend/reactnative/env-setup",slug:"/frontend/reactnative/env-setup/rn-env_rn-cli-mac",permalink:"/moco/frontend/reactnative/env-setup/rn-env_rn-cli-mac",draft:!1,unlisted:!1,tags:[{label:"ReactNative",permalink:"/moco/tags/react-native"},{label:"DevEnv",permalink:"/moco/tags/dev-env"},{label:"Mac",permalink:"/moco/tags/mac"}],version:"current",sidebarPosition:1,frontMatter:{title:"CLI For macOS",description:"React Native CLI for macOS",tags:["ReactNative","DevEnv","Mac"],sidebar_position:1,date:"2022-08-16T16:00:00.000Z",image:"https://i.imgur.com/mErPwqL.png"},sidebar:"tutorialSidebar",previous:{title:"Environment setup",permalink:"/moco/category/environment-setup"},next:{title:"Running On iOS",permalink:"/moco/frontend/reactnative/env-setup/rn-env_ios-ipa"}},s={},p=[{value:"Installing iOS dependencies",id:"installing-ios-dependencies",level:2},{value:"Node &amp; Watchman",id:"node--watchman",level:3},{value:"Yarn",id:"yarn",level:4},{value:"Xcode",id:"xcode",level:3},{value:"Command Line Tools",id:"command-line-tools",level:4},{value:"iOS Simulator",id:"ios-simulator",level:4},{value:"CocoaPods",id:"cocoapods",level:3},{value:"Apple Silicon",id:"apple-silicon",level:4},{value:"Installing Android dependencies",id:"installing-android-dependencies",level:2},{value:"Node &amp; Watchman",id:"node--watchman-1",level:3},{value:"Yarn",id:"yarn-1",level:4},{value:"Java Development Kit",id:"java-development-kit",level:3},{value:"Android Studio",id:"android-studio",level:3},{value:"1. Install Android Studio",id:"1-install-android-studio",level:4},{value:"2. Install Android SDK",id:"2-install-android-sdk",level:4},{value:"3. ANDROID_SDK_ROOT",id:"3-android_sdk_root",level:4},{value:"React Native CLI",id:"react-native-cli",level:2},{value:"Create new application",id:"create-new-application",level:3},{value:"Using a specific version or template",id:"using-a-specific-version-or-template",level:3},{value:"Running your React Native application",id:"running-your-react-native-application",level:2},{value:"iOS App",id:"ios-app",level:3},{value:"on iOS device",id:"on-ios-device",level:4},{value:"Prepare Android device",id:"prepare-android-device",level:3},{value:"physical device",id:"physical-device",level:4},{value:"virtual device",id:"virtual-device",level:4},{value:"Android App",id:"android-app",level:3},{value:"Modifying your app",id:"modifying-your-app",level:2},{value:"Project src tree",id:"project-src-tree",level:3},{value:"That&#39;s it!",id:"thats-it",level:2},{value:"See Also",id:"see-also",level:2}];function h(e){const n={a:"a",blockquote:"blockquote",br:"br",code:"code",em:"em",h1:"h1",h2:"h2",h3:"h3",h4:"h4",img:"img",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,t.a)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)(n.blockquote,{children:["\n",(0,r.jsxs)(n.p,{children:["\u7db2\u8def\u8cc7\u8a0a\u56e0\u7248\u672c\u65b0\u820a\u8a2d\u5b9a\u6b65\u9a5f\u8207\u8aaa\u660e\u7565\u6709\u51fa\u5165, \u672c\u7bc7\u5728 ",(0,r.jsx)(n.code,{children:"React Native 0.69"})," \u6642\u7de8\u5beb.\n\u5efa\u8b70\u4ee5\u5b98\u65b9\u6587\u4ef6\u70ba\u6e96, \u672c\u6587\u7d14\u4f5c\u70ba\u8a2d\u5b9a\u904e\u7a0b\u8207\u932f\u8aa4\u6392\u9664\u500b\u4eba\u7d00\u9304."]}),"\n"]}),"\n",(0,r.jsx)(n.h1,{id:"reactnative-setup-cli-environment",children:"[ReactNative] Setup CLI environment"}),"\n",(0,r.jsx)(n.p,{children:"React Native \u958b\u767c\u74b0\u5883\u8a2d\u7f6e\u5206\u6210 Expo CLI \u548c React Native CLI \u5169\u7a2e:"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsxs)(n.p,{children:["Expo \u96c6\u6210\u4e86\u8a31\u591a React Native \u958b\u767c\u6240\u9700\u5de5\u5177, \u63d0\u4f9b\u5927\u90e8\u5206 App \u6240\u9700\u529f\u80fd, \u53ef\u4ee5\u5feb\u901f\u5efa\u5236\u57fa\u790e\u958b\u767c\u74b0\u5883.\n\u4e26\u53ef\u900f\u904e\u700f\u89bd\u5668\u6216 ",(0,r.jsx)(n.a,{href:"https://snack.expo.dev",children:"Snack"})," \u4f86\u6aa2\u8996\u6e2c\u8a66 React Native App.\n\u7121\u9808\u82b1\u8cbb\u5927\u91cf\u6642\u9593\u8655\u7406 Xcode / Android Studio \u8a2d\u7f6e, \u5927\u5e45\u7c21\u5316\u958b\u767c\u524d\u7f6e\u4f5c\u696d, \u9069\u5408\u65b0\u624b\u5165\u9580."]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsx)(n.p,{children:"React Native CLI \u5247\u662f\u4f7f\u7528\u539f\u751f\u958b\u767c\u74b0\u5883\u4f86\u5efa\u69cb React Native App. \u4f9d OS \u548c\u767c\u884c\u7248\u672c\u7684\u4e0d\u540c,\n\u8a73\u7d30\u6b65\u9a5f\u4e5f\u4e0d\u76f8\u540c, \u9700\u8981\u8655\u7406 Xcode / Android Studio \u767c\u5e03\u74b0\u5883\u7684\u914d\u7f6e.\n\u7531 React Native CLI \u914d\u7f6e\u7684\u5c08\u6848, iOS / Android \u7684 App entry point \u662f\u5206\u958b\u7684,\n\u53ef\u4ee5\u5b89\u88dd\u5404\u81ea\u5e73\u53f0\u7684 Native packages / libries."}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.p,{children:"\u5b98\u65b9\u5efa\u8b70\u5165\u9580\u65b0\u624b\u9069\u5408 Expo CLI, \u5f9e\u719f\u6089 React Native \u958b\u767c\u958b\u59cb, Expo \u74b0\u5883\u4ea6\u53ef\u9032\u884c\u591a\u6578 App \u529f\u80fd\u958b\u767c.\n\u800c React Native CLI \u5247\u662f\u8f03\u6709\u7d93\u9a57\u6216\u9700\u8981\u66f4\u9032\u63a5\u5e95\u5c64\u529f\u80fd\u7684\u958b\u767c\u8005\u4f7f\u7528."}),"\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.strong,{children:"Target OS"})}),"\n",(0,r.jsxs)(o.Z,{groupId:"target-os",children:[(0,r.jsxs)(c.Z,{value:"iOS",label:"iOS",default:!0,children:[(0,r.jsx)(n.h2,{id:"installing-ios-dependencies",children:"Installing iOS dependencies"}),(0,r.jsxs)(n.p,{children:["\u5fc5\u9808\u5b89\u88dd\u7684\u8edf\u9ad4\u6709 ",(0,r.jsx)(n.code,{children:"Node"}),", ",(0,r.jsx)(n.code,{children:"Watchman"}),", ",(0,r.jsx)(n.code,{children:"Xcode"}),", ",(0,r.jsx)(n.code,{children:"CocoaPods"}),"."]}),(0,r.jsx)(n.p,{children:"\u53ef\u4ee5\u4f7f\u7528\u4efb\u4f55\u7de8\u8f2f\u5668\u4f86\u958b\u767c React Native App (js \u7a0b\u5f0f\u78bc),\n\u4f46\u4ecd\u9700\u8981\u5b89\u88dd Xcode \u4f86\u53d6\u5f97\u7de8\u8b6f iOS App \u6642\u6240\u9700\u8981\u7684\u5de5\u5177\u548c\u74b0\u5883."}),(0,r.jsx)(n.h3,{id:"node--watchman",children:"Node & Watchman"}),(0,r.jsxs)(n.p,{children:["\u900f\u904e ",(0,r.jsx)(n.code,{children:"homebrew"})," \u4f86\u5b89\u88dd ",(0,r.jsx)(n.code,{children:"Node"}),", ",(0,r.jsx)(n.code,{children:"Watchman"})," \u662f\u6700\u65b9\u4fbf\u7684."]}),(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"brew install node\nbrew install watchman\n"})}),(0,r.jsx)(n.p,{children:"\u539f\u672c\u5c31\u6709\u5b89\u88dd Node \u7684\u8a71, \u8981\u6ce8\u610f React Native \u50c5\u652f\u63f4 Node 14 \u4ee5\u4e0a\u7684\u7248\u672c."}),(0,r.jsx)(n.p,{children:"Watchman \u662f Facebook \u63d0\u4f9b\u7684\u6a94\u6848\u7cfb\u7d71\u7684\u8b8a\u66f4\u76e3\u63a7\u5de5\u5177, packager \u53ef\u4ee5\u76e3\u63a7\u6a94\u6848\u8b8a\u5316\u800c\u5373\u6642\u66f4\u65b0,\n\u56e0\u800c\u63d0\u5347\u958b\u767c\u6548\u7387."}),(0,r.jsx)(n.h4,{id:"yarn",children:"Yarn"}),(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.code,{children:"yarn"})," \u662f Facebook \u63d0\u4f9b\u7684 npm \u66ff\u4ee3\u5de5\u5177, \u4e0b\u8f09 npm package \u6642\u6548\u7387\u6bd4\u539f\u751f npm \u597d\u4e0a\u4e0d\u5c11.\nyarn \u5927\u591a\u6578\u7684\u547d\u4ee4\u4f7f\u7528\u90fd\u548c npm \u76f8\u540c, \u5b89\u88dd\u5b8c yarn \u5f8c\u5c31\u53ef\u4ee5\u7528 yarn \u53d6\u4ee3 npm \u4e86."]}),(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"npm install -g yarn\n"})}),(0,r.jsx)(n.h3,{id:"xcode",children:"Xcode"}),(0,r.jsxs)(n.p,{children:["React Native \u9700\u8981 ",(0,r.jsx)(n.code,{children:"Xcode"})," 10 \u4ee5\u4e0a\u7684\u7248\u672c, \u76f4\u63a5\u5f9e ",(0,r.jsx)(n.code,{children:"Mac App Store"})," \u4e0b\u8f09\u5373\u53ef.\n\u5b89\u88dd\u8a2d\u5b9a Xcode \u6642, \u540c\u6642\u6703\u5b89\u88dd ",(0,r.jsx)(n.code,{children:"Xcode IDE"}),", ",(0,r.jsx)(n.code,{children:"Command Line Tools"}),", \u548c ",(0,r.jsx)(n.code,{children:"iOS Simulator"}),".\n\u9019\u4e9b\u662f\u7de8\u8b6f\u548c\u6e2c\u8a66 iOS App \u7684\u5fc5\u8981\u5de5\u5177."]}),(0,r.jsx)(n.h4,{id:"command-line-tools",children:"Command Line Tools"}),(0,r.jsx)(n.p,{children:"Xcode command line tools \u4e2d\u5305\u542b\u4e00\u4e9b\u5e38\u7528\u4e14\u5fc5\u5099\u7684\u5de5\u5177, \u4f8b\u5982 git \u7b49."}),(0,r.jsxs)(n.p,{children:["\u6253\u958b Xcode, \u78ba\u8a8d ",(0,r.jsx)(n.code,{children:"Preferences > Locations > Command Line Tools"})," \u9078\u55ae\u4e2d\u6aa2\u67e5\u662f\u5426\u6709\u67d0\u7248\u672c\u7684 Command Line Tools.\n\u901a\u5e38\u5b89\u88dd ",(0,r.jsx)(n.code,{children:"homebrew"})," \u6642\u540c\u6642\u6703\u5b89\u88dd Command Line Tools, \u9078\u55ae\u4e2d\u53ef\u4ee5\u76f4\u63a5\u9078\u64c7\u624d\u662f."]}),(0,r.jsx)(n.p,{children:(0,r.jsx)(n.img,{src:"https://lh3.googleusercontent.com/pw/AL9nZEX4BN1quNdGXWPnQ3kxcalrXbWkPLXcL2Ao0-szSghxKweB6-bafqNq7rdsdt6fiQtGXspQhH2jEUAu4_u11ZrZGp_cBe7uvrTpS4cg-D0o4jzWY-9TABBEgOToELvVq-fnk-29JAUc9Vkd_pzPk4vbdA=w800-no?authuser=0",alt:"Xcode CLI location"})}),(0,r.jsx)(n.h4,{id:"ios-simulator",children:"iOS Simulator"}),(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.code,{children:"Xcode > Preferences > Component"}),", \u5373\u53ef\u4e0b\u8f09\u5b89\u88dd\u4e0d\u540c\u7248\u672c\u7684 iOS \u6a21\u64ec\u5668."]}),(0,r.jsx)(n.p,{children:(0,r.jsx)(n.img,{src:"https://lh3.googleusercontent.com/pw/AL9nZEU6id3WirII75Pbia_6pcTaHcPO3MV-_yyec6lyD-vZobguDKcg58sCroVPfdVW_x3rh7t1pXfuMrOJpa0cGEwt7HAp5c1fGJ8JcMXwfYDL5kK8OrMbibyc435mGXk903tZ9ZdOIltaaXM3PS1CAkeGWA=w800-no?authuser=0",alt:"iOS Simulator"})}),(0,r.jsxs)(n.p,{children:["\u82e5\u8981\u522a\u9664\u4e0d\u9700\u8981\u7684 iOS \u6a21\u64ec\u5668, \u628a ",(0,r.jsx)(n.code,{children:"/Library/Developer/CoreSimulator/Profiles/Runtimes"})," \u88e1\u7528\u4e0d\u5230\u7684 Runtime \u522a\u6389\u5373\u53ef."]}),(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"https://levelup.gitconnected.com/how-to-remove-old-simulators-from-xcode-634111c3e94b",children:"How To Remove Old Simulators From\xa0Xcode? | Level Up Coding"})}),"\n"]}),(0,r.jsx)(n.h3,{id:"cocoapods",children:"CocoaPods"}),(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.code,{children:"CocoaPods"})," \u662f\u7528 Ruby \u6240\u958b\u767c\u7684\u5957\u4ef6\u7ba1\u7406\u5de5\u5177, \u7528\u4f86\u7ba1\u7406\u76f8\u95dc\u4f9d\u8cf4\u7684\u5957\u4ef6\u7b49.\nReact Native CLI 0.60 \u5f8c\u7684 iOS \u7248\u672c\u90fd\u9700\u8981 CocoaPods."]}),(0,r.jsxs)(n.p,{children:["\u53ef\u900f\u904e ",(0,r.jsx)(n.code,{children:"Ruby gem"})," \u6216 ",(0,r.jsx)(n.code,{children:"Homebrew"})," \u4f86\u5b89\u88dd CocoaPods."]}),(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"sudo gem install cocoapods\n"})}),(0,r.jsx)(n.p,{children:"\u6216"}),(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"brew install cocoapods\n"})}),(0,r.jsx)(n.p,{children:"\u82e5\u6c92\u6709\u5b89\u88dd CocoaPods, React Native CLI \u5728\u5efa\u7acb\u5c08\u6848\u6642\u4ea6\u6703\u8df3\u51fa\u5b89\u88dd\u63d0\u793a\u5982\u4e0b:"}),(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"\u2714 CocoaPods (https://cocoapods.org/) is not installed. CocoaPods is necessary for the iOS project to run correctly. Do you want to install it? \n\u203a Yes, with Gem (sudo maybe need)\n\u203a Yes, with Homebrew\n\u2714 Installing CocoaPods\n\u2807 Installing CocoaPods dependencies (this may take a few minutes)\n"})}),(0,r.jsxs)(n.p,{children:["\u5176\u4ed6\u76f8\u95dc\u8cc7\u8a0a, \u53ef\u53c3\u8003 ",(0,r.jsx)(n.a,{href:"https://guides.cocoapods.org/using/getting-started.html",children:"CocoaPods \u5b98\u7db2"}),"."]}),(0,r.jsx)(n.h4,{id:"apple-silicon",children:"Apple Silicon"}),(0,r.jsxs)(n.p,{children:["Cocoapods \u76ee\u524d\u5728 Apple Silicon \u67b6\u69cb\u4e0a\u53ef\u80fd\u9084\u6709\u4e00\u4e9b\u554f\u984c.\n\u82e5\u5b89\u88dd pods \u4f9d\u8cf4\u51fa\u73fe\u554f\u984c, \u53ef\u4ee5\u5617\u8a66\u5f8c\u7e8c\u6307\u4ee4.\n\u9019\u6703\u5b89\u88dd ",(0,r.jsx)(n.code,{children:"ffi"})," \u5957\u4ef6, \u7528\u4ee5\u5b89\u88dd\u8207\u8f09\u5165 pods \u6642\u9078\u7528\u5408\u9069\u7684\u67b6\u69cb."]}),(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"sudo arch -x86_64 gem install ffi\narch -x86_64 pod install\n"})}),(0,r.jsx)(n.p,{children:"\u6216\u662f\u900f\u904e Homwbrew \u5b89\u88dd CocoaPods \u6bd4\u8f03\u4e0d\u6703\u6709\u554f\u984c."})]}),(0,r.jsxs)(c.Z,{value:"Android",label:"Android",children:[(0,r.jsx)(n.h2,{id:"installing-android-dependencies",children:"Installing Android dependencies"}),(0,r.jsxs)(n.p,{children:["\u5fc5\u9808\u5b89\u88dd\u7684\u8edf\u9ad4\u6709 ",(0,r.jsx)(n.code,{children:"Node"}),", ",(0,r.jsx)(n.code,{children:"Watchman"}),", ",(0,r.jsx)(n.code,{children:"JDK"}),", ",(0,r.jsx)(n.code,{children:"Android Studio"}),"."]}),(0,r.jsx)(n.p,{children:"\u53ef\u4ee5\u4f7f\u7528\u4efb\u4f55\u7de8\u8f2f\u5668\u4f86\u958b\u767c React Native App (js \u7a0b\u5f0f\u78bc),\n\u4f46\u4ecd\u9700\u8981\u5b89\u88dd Android Studio \u4f86\u53d6\u5f97\u7de8\u8b6f Android App \u6642\u6240\u9700\u8981\u7684\u5de5\u5177\u548c\u74b0\u5883."}),(0,r.jsx)(n.h3,{id:"node--watchman-1",children:"Node & Watchman"}),(0,r.jsxs)(n.p,{children:["\u900f\u904e ",(0,r.jsx)(n.code,{children:"homebrew"})," \u4f86\u5b89\u88dd ",(0,r.jsx)(n.code,{children:"Node"}),", ",(0,r.jsx)(n.code,{children:"Watchman"})," \u662f\u6700\u65b9\u4fbf\u7684."]}),(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"brew install node\nbrew install watchman\n"})}),(0,r.jsx)(n.p,{children:"\u539f\u672c\u5c31\u6709\u5b89\u88dd Node \u7684\u8a71, \u8981\u6ce8\u610f React Native \u50c5\u652f\u63f4 Node 14 \u4ee5\u4e0a\u7684\u7248\u672c."}),(0,r.jsx)(n.p,{children:"Watchman \u662f Facebook \u63d0\u4f9b\u7684\u6a94\u6848\u7cfb\u7d71\u7684\u8b8a\u66f4\u76e3\u63a7\u5de5\u5177, packager \u53ef\u4ee5\u76e3\u63a7\u6a94\u6848\u8b8a\u5316\u800c\u5373\u6642\u66f4\u65b0,\n\u56e0\u800c\u63d0\u5347\u958b\u767c\u6548\u7387."}),(0,r.jsx)(n.h4,{id:"yarn-1",children:"Yarn"}),(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.code,{children:"yarn"})," \u662f Facebook \u63d0\u4f9b\u7684 npm \u66ff\u4ee3\u5de5\u5177, \u4e0b\u8f09 npm package \u6642\u6548\u7387\u6bd4\u539f\u751f npm \u597d\u4e0a\u4e0d\u5c11.\nyarn \u5927\u591a\u6578\u7684\u547d\u4ee4\u4f7f\u7528\u90fd\u548c npm \u76f8\u540c, \u5b89\u88dd\u5b8c yarn \u5f8c\u5c31\u53ef\u4ee5\u7528 yarn \u53d6\u4ee3 npm \u4e86."]}),(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"npm install -g yarn\n"})}),(0,r.jsx)(n.h3,{id:"java-development-kit",children:"Java Development Kit"}),(0,r.jsxs)(n.p,{children:["\u5b98\u65b9\u63a8\u85a6\u4f7f\u7528 Homebrew \u5b89\u88dd\u7531 ",(0,r.jsx)(n.em,{children:"Azul"})," \u6240\u767c\u4f48, \u540d\u70ba ",(0,r.jsx)(n.strong,{children:"Zulu"})," \u7684 OpenJDK \u7248\u672c.\n\u9019\u500b\u7248\u672c\u540c\u6642\u652f\u63f4 ",(0,r.jsx)(n.code,{children:"Intel"})," \u548c ",(0,r.jsx)(n.code,{children:"Apple Silicon"})," \u6676\u7247,\n\u5728 Apple Silicon \u67b6\u69cb\u7684 Mac \u4e0a\u7de8\u8b6f\u6642, \u6bd4\u8d77\u5176\u4ed6 JDK \u7248\u672c\u6709\u660e\u986f\u6548\u80fd\u512a\u52e2."]}),(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"brew tap homebrew/cask-versions\nbrew install --cask zulu11\n"})}),(0,r.jsxs)(n.p,{children:["React Native \u9700\u8981 JDK 11. \u53ef\u4ee5\u900f\u904e ",(0,r.jsx)(n.code,{children:"javac -version"})," \u547d\u4ee4\u78ba\u8a8d\u6a5f\u5668\u4e0a\u7684 JDK \u7248\u672c."]}),(0,r.jsx)(n.h3,{id:"android-studio",children:"Android Studio"}),(0,r.jsx)(n.h4,{id:"1-install-android-studio",children:"1. Install Android Studio"}),(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.a,{href:"https://developer.android.com/studio",children:"\u4e0b\u8f09\u4e26\u5b89\u88dd Android Studio"}),".\n\u7b2c\u4e00\u6b21\u6253\u958b Android Studio, \u6703\u8df3\u51fa\u5957\u4ef6\u5b89\u88dd\u7cbe\u9748.\n\u5728\u5b89\u88dd\u904e\u7a0b\u4e2d, \u78ba\u8a8d\u4ee5\u4e0b\u9805\u76ee\u6709\u52fe\u9078\u5b89\u88dd, Next \u7b49\u5019\u5b89\u88dd\u5b8c\u6210\u5373\u53ef."]}),(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"Android SDK"}),"\n",(0,r.jsx)(n.li,{children:"Android SDK Platform"}),"\n",(0,r.jsx)(n.li,{children:"Android Virtual Device"}),"\n"]}),(0,r.jsx)(n.h4,{id:"2-install-android-sdk",children:"2. Install Android SDK"}),(0,r.jsx)(n.p,{children:"Android Studio \u5b89\u88dd\u7cbe\u9748\u9810\u8a2d\u5b89\u88dd\u6700\u65b0\u7248\u7684 Android SDK.\n\u800c\u76ee\u524d React Native native code \u9700\u8981 Android 12 (S) SDK \u7248\u672c.\n\u53ef\u4ee5\u900f\u904e SDK Manager \u624b\u52d5\u5b89\u88dd\u5c0d\u61c9\u7684\u7248\u672c."}),(0,r.jsxs)(n.blockquote,{children:["\n",(0,r.jsx)(n.p,{children:"Android Studio \u2192 More Actions \u2192 SDK Manager"}),"\n"]}),(0,r.jsx)(n.p,{children:(0,r.jsx)(n.img,{src:"https://lh3.googleusercontent.com/pw/AL9nZEXmxh_PV1TE-uS-H_opQRZpfMnWyH9Xr9F_D-tgawjFcNgwCnC6Yru1bqvPgfjQt6rSrednbYfsnuxoyEXrL48VMKW0JdZLHeVlHirM6vddepk2R3GCd57hrR8-rniGXFTrB0JMHVYfKcnOfRc4cOYYIw=w800-no?authuser=0",alt:"Android Studio Welcome"})}),(0,r.jsxs)(n.blockquote,{children:["\n",(0,r.jsx)(n.p,{children:"or Android Studio Preferences \u2192 Appearance & Behavior \u2192 System Settings \u2192 Android SDK."}),"\n"]}),(0,r.jsx)(n.p,{children:(0,r.jsx)(n.img,{src:"https://lh3.googleusercontent.com/pw/AL9nZEUNeFOKI6cs7m88nIMZMJeo1Xx981A4iFhR7eBmSR9W_Yb_1MIiLuqFMqxv1_ZYjWOxrvJSMNUgLAmxvjrtztouUL097VlPbfLCTDRPjLla8ZUYvuyUcpU96X8kG3eSlRkahm4OxEEZTldX7bJTCxzIiQ=w800-no?authuser=0",alt:"Android Studio Preferences"})}),(0,r.jsxs)(n.p,{children:["\u5728 SDK Manager \u4e2d\u9078\u64c7 ",(0,r.jsx)(n.em,{children:"SDK Platform"}),", \u52fe\u9078 ",(0,r.jsx)(n.em,{children:"Show Package Details"}),".\n\u5c55\u958b ",(0,r.jsx)(n.em,{children:"Android 12 (S)"}),", \u52fe\u9078\u4ee5\u4e0b\u5143\u4ef6:"]}),(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"Android SDK Platform 31"}),"\n",(0,r.jsx)(n.li,{children:"Google APIs Intel x86 Atom System Image or\n(for Apple Silicon) Google APIs ARM 64 v8a System Image"}),"\n"]}),(0,r.jsxs)(n.p,{children:["\u7136\u5f8c\u9078\u64c7 ",(0,r.jsx)(n.em,{children:"SDK Tools"}),", \u540c\u6a23\u52fe\u9078 ",(0,r.jsx)(n.em,{children:"Show Package Details"}),".\n\u5c55\u958b ",(0,r.jsx)(n.em,{children:"Android SDK Build-Tools"}),", \u52fe\u9078 React Native \u6240\u9700\u8981\u7684 31.0.0.\n\u4f9d\u500b\u4eba\u958b\u767c\u9700\u6c42, \u53ef\u540c\u6642\u5b89\u88dd\u591a\u500b\u7248\u672c."]}),(0,r.jsxs)(n.p,{children:["\u52fe\u9078\u5b8c\u5f8c, ",(0,r.jsx)(n.code,{children:"Apply"})," or 'OK' \u4ee5\u9032\u884c\u4e0b\u8f09\u5b89\u88dd\u5143\u4ef6."]}),(0,r.jsx)(n.h4,{id:"3-android_sdk_root",children:"3. ANDROID_SDK_ROOT"}),(0,r.jsxs)(n.p,{children:["React Native \u6703\u900f\u904e\u74b0\u5883\u8b8a\u6578\u4f86\u53d6\u5f97 Android SDK \u8def\u5f91\u4f86\u9032\u884c\u7de8\u8b6f\u6307\u4ee4,\n\u5728\u74b0\u5883\u8b8a\u6578\u4e2d\u52a0\u5165\u4ee5\u4e0b\u8a2d\u5b9a:",(0,r.jsx)(n.br,{}),"\n","\u4f9d shell \u4e0d\u540c\u7de8\u8f2f ~/.bash_profile or ~/.zshrc \u6216\u5176\u4ed6\u500b\u4eba\u9069\u7528\u7684\u8a2d\u5b9a\u6a94."]}),(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"export ANDROID_SDK_ROOT=$HOME/Library/Android/sdk\nexport PATH=$PATH:$ANDROID_SDK_ROOT/emulator\nexport PATH=$PATH:$ANDROID_SDK_ROOT/platform-tools\n"})})]})]}),"\n",(0,r.jsx)(n.h2,{id:"react-native-cli",children:"React Native CLI"}),"\n",(0,r.jsxs)(n.p,{children:["React Native \u5c08\u6848\u9700\u8981\u5f15\u7528\u4e0d\u5c11\u76f8\u95dc\u5957\u4ef6, \u96d6\u7136\u53ef\u4ee5\u624b\u52d5\u523b\u5beb ",(0,r.jsx)(n.code,{children:"package.json"})," \u7b49\u5c08\u6848\u57fa\u790e\u9805\u76ee,\n\u4f46\u6700\u65b9\u4fbf\u9084\u662f\u76f4\u63a5\u4f7f\u7528 React Native \u5167\u5efa\u7684\u547d\u4ee4\u5217\u6307\u4ee4\u5efa\u7acb\u65b0\u5c08\u6848."]}),"\n",(0,r.jsxs)(n.blockquote,{children:["\n",(0,r.jsxs)(n.p,{children:["\u95dc\u65bc React Native \u547d\u4ee4, \u904e\u5f80\u7248\u672c\u74b0\u5883\u8a2d\u7f6e\u6559\u5b78\u90fd\u662f\u5728\u672c\u5730\u7aef\u5168\u5c40\u5b89\u88dd ",(0,r.jsx)(n.code,{children:"react-native-cli"})," \u5957\u4ef6.\n\u800c\u5b98\u65b9\u73fe\u5728\u5efa\u8b70 ",(0,r.jsx)(n.code,{children:"npx react-native <command>"})," \u4f86\u9032\u884c CLI \u7684\u76f8\u95dc\u64cd\u4f5c."]}),"\n",(0,r.jsxs)(n.p,{children:["\u82e5\u66fe\u7d93\u5b89\u88dd\u904e react-native-cli \u547d\u4ee4\u5217\u5de5\u5177, \u9700\u5148\u79fb\u9664\u5df2\u907f\u514d\u885d\u7a81.\n",(0,r.jsx)(n.code,{children:"npm uninstall -g react-native-cli"})]}),"\n"]}),"\n",(0,r.jsx)(n.h3,{id:"create-new-application",children:"Create new application"}),"\n",(0,r.jsx)(n.p,{children:"\u76f4\u63a5\u900f\u904e npx \u547d\u4ee4\u4f86\u5efa\u7acb AwesomeProject \u5c08\u6848."}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"npx react-native init AwesomeProject\n"})}),"\n",(0,r.jsxs)(n.blockquote,{children:["\n",(0,r.jsx)(n.p,{children:"\u82e5\u8981\u628a React Native \u96c6\u6210\u5230\u65e2\u6709\u7684 App \u9805\u76ee, \u6d41\u7a0b\u5b8c\u5168\u4e0d\u540c."}),"\n"]}),"\n",(0,r.jsx)(n.h3,{id:"using-a-specific-version-or-template",children:"Using a specific version or template"}),"\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.code,{children:"init"})," \u9810\u8a2d\u6703\u5b89\u88dd\u6700\u65b0\u7248\u7684 React Native \u7248\u672c.\n\u82e5\u8981\u6307\u540d\u7279\u5b9a\u7248\u672c\u7684 React Native, \u5728\u6307\u4ee4\u5f8c\u9762\u52a0\u4e0a ",(0,r.jsx)(n.code,{children:"--version"})," \u53c3\u6578:"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"npx react-native init AwesomeProject --version X.XX.X\n"})}),"\n",(0,r.jsxs)(n.p,{children:["\u4ea6\u53ef\u4f7f\u7528 ",(0,r.jsx)(n.code,{children:"--template"})," \u4f86\u4f7f\u7528\u4e00\u4e9b\u5ba2\u88fd\u5316\u5c08\u6848\u6a23\u677f, \u4f8b\u5982\u652f\u63f4 ",(0,r.jsx)(n.code,{children:"TypeScript"}),":"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"npx react-native init AwesomeTSProject --template react-native-template-typescript\n"})}),"\n",(0,r.jsx)(n.h2,{id:"running-your-react-native-application",children:"Running your React Native application"}),"\n",(0,r.jsxs)(o.Z,{groupId:"target-os",children:[(0,r.jsxs)(c.Z,{value:"iOS",label:"iOS",default:!0,children:[(0,r.jsx)(n.h3,{id:"ios-app",children:"iOS App"}),(0,r.jsxs)(n.p,{children:["\u5728\u5c08\u6848\u8cc7\u6599\u593e\u4e2d\u57f7\u884c ",(0,r.jsx)(n.code,{children:"yarn ios"})," \u6216 ",(0,r.jsx)(n.code,{children:"npx react-native run-ios"})]}),(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"cd AwesomeProject\nyarn ios\n# OR\nyarn react-native run-ios\n"})}),(0,r.jsxs)(n.p,{children:["\u9019\u500b\u6307\u4ee4\u6703\u628a React Native \u5c08\u6848\u539f\u751f\u7684\u90e8\u5206\u9032\u884c\u7de8\u8b6f,\n\u540c\u6642\u518d\u53e6\u4e00\u500b\u547d\u4ee4\u5217\u8d77\u52d5 ",(0,r.jsx)(n.code,{children:"Metro"})," \u670d\u52d9, \u5c0d js code \u7684\u90e8\u5206\u5373\u6642\u5c01\u88dd\u6253\u5305."]}),(0,r.jsx)(n.p,{children:"\u7de8\u8b6f\u6253\u5305\u5b8c\u6210\u5f8c, \u5c31\u53ef\u4ee5\u770b\u5230 iOS \u6a21\u64ec\u5668\u81ea\u52d5\u958b\u555f\u4e26\u57f7\u884c AwesomeProject \u5c08\u6848."}),(0,r.jsx)(n.p,{children:(0,r.jsx)(n.img,{src:"https://lh3.googleusercontent.com/pw/AL9nZEVnph4k7HbleAAPMyLPSIg9Wth9g3td6Ur6IXF3SvAIJpWFlBbXIPhiDBNbLvZ-WiPtnqayqBBUOJdQqjMGwHKKJcE1FN8DXmcox9A1_7DmIXNQ4ZbdzFVY5ejE0oT6xlk7i-Tc4nXnsUtyzOp-cl2Wnw=w800-no",alt:""})}),(0,r.jsxs)(n.p,{children:["\u521d\u6b21\u958b\u555f\u5c08\u6848\u5b8c\u6210\u7de8\u8b6f\u5f8c, \u958b\u767c\u671f\u9593\u4fdd\u6301 metro \u8996\u7a97, \u5247 js \u4fee\u6539\u7684\u9805\u76ee\u53ef\u5373\u6642\u88ab\u6253\u5305\u8f09\u5165.\n\u65e5\u5f8c\u518d\u5ea6\u958b\u555f\u5c08\u6848\u6642, \u82e5\u6c92\u6709\u4fee\u6539 iOS \u8cc7\u6599\u593e\u4e0b\u7684\u6a94\u6848, \u53ef\u4ee5\u4f7f\u7528 ",(0,r.jsx)(n.code,{children:"yarn start"})," \u4ee5\u5feb\u901f\u958b\u555f\u5c08\u6848.\n\u800c iOS \u8cc7\u6599\u593e\u4e2d\u4e0b\u7684\u6a94\u6848\u82e5\u6709\u66f4\u52d5, \u5247\u9700\u518d\u6b21\u57f7\u884c ",(0,r.jsx)(n.code,{children:"yarn ios"})," \u91cd\u65b0\u7de8\u8b6f\u539f\u751f\u9805\u76ee."]}),(0,r.jsx)(n.h4,{id:"on-ios-device",children:"on iOS device"}),(0,r.jsxs)(n.p,{children:["iOS \u5c08\u6848\u9805\u76ee\u8173\u672c\u6703\u81ea\u52d5\u5728 iOS \u6a21\u64ec\u5668\u4e2d\u958b\u555f\u5c08\u6848, \u53ef\u76f4\u63a5\u5229\u7528 iOS \u6a21\u64ec\u5668\u4e2d\u9032\u884c\u958b\u767c\u6e2c\u8a66.\n\u82e5\u8981\u5728\u88dd\u7f6e\u4e0a\u57f7\u884c, \u53e6\u53c3\u8003",(0,r.jsx)(n.a,{href:"#",children:"\u5728 iOS \u88dd\u7f6e\u57f7\u884c"}),"."]})]}),(0,r.jsxs)(c.Z,{value:"Android",label:"Android",children:[(0,r.jsx)(n.h3,{id:"prepare-android-device",children:"Prepare Android device"}),(0,r.jsx)(n.p,{children:"\u5fc5\u9808\u6e96\u5099\u4e00\u50f9 Android \u88dd\u7f6e\u4f86\u57f7\u884c React Native Android app.\nAndroid \u88dd\u7f6e\u4e26\u4e0d\u9650\u4f7f\u7528\u5be6\u9ad4\u624b\u6a5f, Android \u6a21\u64ec\u5668\u6216\u900f\u904e\u5b98\u65b9 AVD \u5efa\u7acb\u865b\u64ec\u88dd\u7f6e\u4ea6\u53ef."}),(0,r.jsx)(n.h4,{id:"physical-device",children:"physical device"}),(0,r.jsx)(n.p,{children:"\u4f7f\u7528 Android \u5be6\u9ad4\u624b\u6a5f\u9032\u884c\u958b\u767c\u6e2c\u8a66, \u628a USB \u9023\u63a5\u624b\u6a5f\u548c\u96fb\u8166,\n\u8ddf\u8457\u5404\u624b\u5b98\u65b9\u6a5f\u8aaa\u660e, \u6253\u958b\u958b\u767c\u8005\u6a21\u5f0f, \u78ba\u8a8d ADB \u53ef\u4ee5\u6b63\u78ba\u8b58\u5225\u88dd\u98fe\u5373\u53ef."}),(0,r.jsx)(n.h4,{id:"virtual-device",children:"virtual device"}),(0,r.jsx)(n.p,{children:"\u5728 Android Studio \u4e2d, \u6253\u958b AVD Manager \u4f86\u9078\u64c7\u53ef\u7528\u7684\u865b\u64ec\u88dd\u7f6e.\n\u6216\u5275\u5efa\u4e00\u500b\u65b0\u7684\u865b\u64ec\u88dd\u7f6e\u4f86\u9032\u884c\u958b\u767c."}),(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.code,{children:"Create Virtual Device..."})," > \u9078\u64c7\u559c\u6b61\u7684\u624b\u6a5f\u6a21\u7248 (\u87a2\u5e55\u5927\u5c0f, dpi... \u7b49) >\n",(0,r.jsx)(n.code,{children:"S API Level 31"})," > Finish \u5373\u53ef. \u865b\u64ec\u88dd\u7f6e\u5efa\u7acb\u5b8c\u6210\u5f8c\u53ef\u5148\u884c\u555f\u52d5\u4e00\u6b21, \u8b93\u88dd\u7f6e\u904b\u884c\u5fc5\u8981\u521d\u59cb\u5316\u8a2d\u5b9a."]}),(0,r.jsx)(n.p,{children:(0,r.jsx)(n.img,{src:"https://lh3.googleusercontent.com/pw/AL9nZEXFgkEImSTaYQmWs5VZzdHR3MnDVxrYIfsv1rhrYixMWcGnkQJ7xm33ZOaA7GbtbG40b2Yl-FdpFpYyo45zUUf5dMy7oKjjABWv1Tb2LSQjdfg5zhrHgm3Kkgr9Irj985fM_HyOxN2dX6RI6lGZKf40JA=w800-no?authuser=0",alt:"AVD manager"})}),(0,r.jsx)(n.p,{children:(0,r.jsx)(n.img,{src:"https://lh3.googleusercontent.com/pw/AL9nZEXV8tr6CQ9MGXW550g1VTGLhfBA_6Fz8BxVv6ELg3_Jz8ge1h-qn4onIXKTlv_UEYc1Jl_pCunfpbhIsvsz0JMqcNhSHfXQSZXibCyzCE4tuV-DtEExdbOWjyoGDrSmhEcViQCkSyR_PaiZ9VOSRAYfRw=w600-no?authuser=0",alt:"AVD"})}),(0,r.jsx)(n.h3,{id:"android-app",children:"Android App"}),(0,r.jsxs)(n.p,{children:["\u7121\u8ad6\u4f7f\u7528\u5be6\u9ad4\u624b\u6a5f\u6216\u4f7f\u7528\u865b\u64ec\u88dd\u7f6e, \u9700\u78ba\u8a8d ",(0,r.jsx)(n.code,{children:"ADB"})," \u53ef\u4ee5\u6b63\u78ba\u8b58\u5225\u88dd\u7f6e, \u624d\u53ef\u9032\u884c\u958b\u767c\u6e2c\u8a66."]}),(0,r.jsx)(n.p,{children:(0,r.jsx)(n.img,{src:"https://lh3.googleusercontent.com/pw/AL9nZEWZgtaODXoQcIde7PYuksSnT1S2bkrBz5bCQN9DipoSr2d8D9Am8RBU-HosroZSotVJ9UgYe8L9Z1IcFMvTDnhHahBRDFVnF3A8xgLUWwxAGLQG_Ff0gIfd1SfOUTcEKubmlUxsm9OuQS3UoIB66oTkVA=w458-h244-no?authuser=0",alt:"adb devices"})}),(0,r.jsx)(n.p,{children:"\u57f7\u884c React Native Android app \u548c iOS \u985e\u4f3c,"}),(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"cd AwesomeProject\nyarn android\n# OR\nyarn react-native run-android\n"})}),(0,r.jsx)(n.p,{children:"\u9019\u6642\u5019\u6703\u958b\u59cb\u7de8\u8b6f\u5c08\u6848, \u7de8\u8b6f\u5b8c\u6210\u5f8c\u6703\u81ea\u52d5\u5728\u6e2c\u8a66\u88dd\u7f6e\u4e0a\u57f7\u884c\u5c08\u6848 App.\n\u7b2c\u4e00\u6b21\u57f7\u884c\u6642, \u9700\u8981\u4e0b\u8f09\u5927\u91cf\u76f8\u95dc\u5957\u4ef6\u4f9d\u8cf4, \u6703\u82b1\u4e0a\u597d\u4e9b\u6642\u9593.\n\u7de8\u8b6f\u6210\u529f\u5f8c, \u9664\u975e\u7248\u672c\u66f4\u65b0\u7b49, \u4e00\u822c\u4f86\u66f8\u5594\u65e5\u5f8c\u7121\u9808\u518d\u4e0b\u8f09\u4e86."}),(0,r.jsx)(n.p,{children:(0,r.jsx)(n.img,{src:"https://lh3.googleusercontent.com/pw/AL9nZEW6RebevudFVEIpTlgQr63t3oHsrjIF4ncYJQ5gGFPWIOyCQrBdXrjyrLUr3G6fN7r6cwu9T4PjWqKA0kICg1OQ0r1XgDJO7ieC1HIb8eWRbuAplp6Y0-V3OEz_DzWg8aF-2jNQ17sXHhLjLyHI9xIr-w=w800-no?authuser=0",alt:"React Native Android app"})})]})]}),"\n",(0,r.jsx)(n.h2,{id:"modifying-your-app",children:"Modifying your app"}),"\n",(0,r.jsx)(n.p,{children:"\u5c08\u6848\u53ef\u4ee5\u6b63\u78ba\u5728\u6a21\u64ec\u5668\u4e0a\u958b\u555f\u5f8c, \u74b0\u5883\u5b89\u88dd\u5c31\u5b8c\u6210, \u53ef\u4ee5\u958b\u59cb\u7de8\u8f2f\u958b\u767c React Native App \u4e86."}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["\u7de8\u8f2f ",(0,r.jsx)(n.code,{children:"App.js"})," \u4efb\u4f55\u6587\u5b57\u7de8\u8f2f\u5668\u7686\u53ef."]}),"\n",(0,r.jsxs)(n.li,{children:["\u5728\u6a21\u64ec\u5668\u4e0a\u91cd\u65b0\u8f09\u5165\u9801\u9762. ",(0,r.jsx)(n.code,{children:"iOS \u2318-R"})," / ",(0,r.jsx)(n.code,{children:"Android R"})," \u5373\u53ef\u770b\u5230\u4fee\u6539\u5f8c\u7684\u9801\u9762."]}),"\n"]}),"\n",(0,r.jsx)(n.h3,{id:"project-src-tree",children:"Project src tree"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"Project Structure\n\n.\n\u251c\u2500\u2500 App.js  # App root component\uff0c\u6240\u6709JS code\u7531\u9019\u88e1\u958b\u59cb\n\u251c\u2500\u2500 android/  # Android native project\n\u251c\u2500\u2500 app.json  # React Native app config\n\u251c\u2500\u2500 index.js  # App entry point\n\u251c\u2500\u2500 ios/  # iOS native project\n\u251c\u2500\u2500 node_modules/  # JS libraries\n\u251c\u2500\u2500 package.json  # JS dependencies\n\u2514\u2500\u2500 yarn.lock\n"})}),"\n",(0,r.jsx)(n.h2,{id:"thats-it",children:"That's it!"}),"\n",(0,r.jsx)(n.p,{children:"Congratulations! You've successfully run and modified your first React Native app."}),"\n",(0,r.jsx)(n.h2,{id:"see-also",children:"See Also"}),"\n",(0,r.jsxs)(n.p,{children:["\u63a5\u624b\u7684\u5c08\u6848\u662f React Native 0.53 \u7248\u672c, \u6709\u4e9b\u74b0\u5883\u8a2d\u7f6e\u6709\u6240\u4e0d\u540c.\n\u7db2\u8def\u8cc7\u8a0a\u56e0\u7248\u672c\u65b0\u820a\u8a2d\u5b9a\u6b65\u9a5f\u8207\u8aaa\u660e\u7565\u6709\u51fa\u5165, \u672c\u6587\u5728 ",(0,r.jsx)(n.code,{children:"React Native 0.69"})," \u6642\u7de8\u5beb."]}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.a,{href:"https://reactnative.dev/docs/environment-setup",children:"Setting up the development environment"})," |\n",(0,r.jsx)(n.a,{href:"https://reactnative.cn/docs/environment-setup",children:"\u642d\u5efa\u5f00\u53d1\u73af\u5883 \xb7 React Native \u4e2d\u6587\u7f51"})]}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"https://www.jablog.site/docs/react-native/setup/",children:"\u5efa\u7f6e React Native \u958b\u767c\u74b0\u5883 | \u5091\u90e8\u843d Jablog"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"https://carsonwah.github.io/15221461803635.html",children:"React Native\u6559\u5b78 Part 1 - \u8a73\u76e1\u65b0\u624b\u5165\u9580 - Carson's Tech Note"})}),"\n"]})]})}function u(e={}){const{wrapper:n}={...(0,t.a)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(h,{...e})}):h(e)}},85162:(e,n,i)=>{i.d(n,{Z:()=>c});i(67294);var r=i(36905);const t={tabItem:"tabItem_Ymn6"};var o=i(85893);function c(e){let{children:n,hidden:i,className:c}=e;return(0,o.jsx)("div",{role:"tabpanel",className:(0,r.Z)(t.tabItem,c),hidden:i,children:n})}},74866:(e,n,i)=>{i.d(n,{Z:()=>S});var r=i(67294),t=i(36905),o=i(12466),c=i(16550),a=i(20469),d=i(91980),l=i(67392),s=i(50012);function p(e){return r.Children.toArray(e).filter((e=>"\n"!==e)).map((e=>{if(!e||(0,r.isValidElement)(e)&&function(e){const{props:n}=e;return!!n&&"object"==typeof n&&"value"in n}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}function h(e){const{values:n,children:i}=e;return(0,r.useMemo)((()=>{const e=n??function(e){return p(e).map((e=>{let{props:{value:n,label:i,attributes:r,default:t}}=e;return{value:n,label:i,attributes:r,default:t}}))}(i);return function(e){const n=(0,l.l)(e,((e,n)=>e.value===n.value));if(n.length>0)throw new Error(`Docusaurus error: Duplicate values "${n.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[n,i])}function u(e){let{value:n,tabValues:i}=e;return i.some((e=>e.value===n))}function x(e){let{queryString:n=!1,groupId:i}=e;const t=(0,c.k6)(),o=function(e){let{queryString:n=!1,groupId:i}=e;if("string"==typeof n)return n;if(!1===n)return null;if(!0===n&&!i)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return i??null}({queryString:n,groupId:i});return[(0,d._X)(o),(0,r.useCallback)((e=>{if(!o)return;const n=new URLSearchParams(t.location.search);n.set(o,e),t.replace({...t.location,search:n.toString()})}),[o,t])]}function j(e){const{defaultValue:n,queryString:i=!1,groupId:t}=e,o=h(e),[c,d]=(0,r.useState)((()=>function(e){let{defaultValue:n,tabValues:i}=e;if(0===i.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(n){if(!u({value:n,tabValues:i}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${n}" but none of its children has the corresponding value. Available values are: ${i.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return n}const r=i.find((e=>e.default))??i[0];if(!r)throw new Error("Unexpected error: 0 tabValues");return r.value}({defaultValue:n,tabValues:o}))),[l,p]=x({queryString:i,groupId:t}),[j,v]=function(e){let{groupId:n}=e;const i=function(e){return e?`docusaurus.tab.${e}`:null}(n),[t,o]=(0,s.Nk)(i);return[t,(0,r.useCallback)((e=>{i&&o.set(e)}),[i,o])]}({groupId:t}),m=(()=>{const e=l??j;return u({value:e,tabValues:o})?e:null})();(0,a.Z)((()=>{m&&d(m)}),[m]);return{selectedValue:c,selectValue:(0,r.useCallback)((e=>{if(!u({value:e,tabValues:o}))throw new Error(`Can't select invalid tab value=${e}`);d(e),p(e),v(e)}),[p,v,o]),tabValues:o}}var v=i(72389);const m={tabList:"tabList__CuJ",tabItem:"tabItem_LNqP"};var g=i(85893);function A(e){let{className:n,block:i,selectedValue:r,selectValue:c,tabValues:a}=e;const d=[],{blockElementScrollPositionUntilNextRender:l}=(0,o.o5)(),s=e=>{const n=e.currentTarget,i=d.indexOf(n),t=a[i].value;t!==r&&(l(n),c(t))},p=e=>{let n=null;switch(e.key){case"Enter":s(e);break;case"ArrowRight":{const i=d.indexOf(e.currentTarget)+1;n=d[i]??d[0];break}case"ArrowLeft":{const i=d.indexOf(e.currentTarget)-1;n=d[i]??d[d.length-1];break}}n?.focus()};return(0,g.jsx)("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,t.Z)("tabs",{"tabs--block":i},n),children:a.map((e=>{let{value:n,label:i,attributes:o}=e;return(0,g.jsx)("li",{role:"tab",tabIndex:r===n?0:-1,"aria-selected":r===n,ref:e=>d.push(e),onKeyDown:p,onClick:s,...o,className:(0,t.Z)("tabs__item",m.tabItem,o?.className,{"tabs__item--active":r===n}),children:i??n},n)}))})}function b(e){let{lazy:n,children:i,selectedValue:t}=e;const o=(Array.isArray(i)?i:[i]).filter(Boolean);if(n){const e=o.find((e=>e.props.value===t));return e?(0,r.cloneElement)(e,{className:"margin-top--md"}):null}return(0,g.jsx)("div",{className:"margin-top--md",children:o.map(((e,n)=>(0,r.cloneElement)(e,{key:n,hidden:e.props.value!==t})))})}function f(e){const n=j(e);return(0,g.jsxs)("div",{className:(0,t.Z)("tabs-container",m.tabList),children:[(0,g.jsx)(A,{...e,...n}),(0,g.jsx)(b,{...e,...n})]})}function S(e){const n=(0,v.Z)();return(0,g.jsx)(f,{...e,children:p(e.children)},String(n))}},11151:(e,n,i)=>{i.d(n,{Z:()=>a,a:()=>c});var r=i(67294);const t={},o=r.createContext(t);function c(e){const n=r.useContext(o);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:c(e.components),r.createElement(o.Provider,{value:n},e.children)}}}]);