"use strict";(self.webpackChunkkywk_me=self.webpackChunkkywk_me||[]).push([["69106"],{78303:function(e,t,n){n.r(t),n.d(t,{metadata:()=>r,contentTitle:()=>l,default:()=>u,assets:()=>c,toc:()=>i,frontMatter:()=>o});var r=JSON.parse('{"id":"miscellaneous/dart/dart_nsfw-sdk","title":"NSFW SDK","description":"Dart: NSFW SDK","source":"@site/moco/miscellaneous/dart/dart_nsfw-sdk.md","sourceDirName":"miscellaneous/dart","slug":"/miscellaneous/dart/dart_nsfw-sdk","permalink":"/moco/miscellaneous/dart/dart_nsfw-sdk","draft":false,"unlisted":false,"tags":[{"inline":true,"label":"Dart","permalink":"/moco/tags/dart"},{"inline":true,"label":"Backend","permalink":"/moco/tags/backend"},{"inline":true,"label":"Flutter","permalink":"/moco/tags/flutter"}],"version":"current","frontMatter":{"title":"NSFW SDK","description":"Dart: NSFW SDK","tags":["Dart","Backend","Flutter"],"hide_table_of_contents":true,"date_created":"2022-10-31T16:00:00.000Z","image":"https://lh3.googleusercontent.com/pw/AL9nZEUA9Ifvd5Z8SXDWkeVB6AC4MPGwnXaL6kBXNPoXwOQQ2jOcZ1Jw_0p8TKK8C3ZX0e67_FOY15eDrm7aaXSQJcKtoUzC80SAQEHsaBy6qS2AqNNs5VUFNXBKm439y_1wkvmDl-PnL8ReojnIumNlEvOXBg=w800-no?authuser=0"},"sidebar":"tutorialSidebar","previous":{"title":"Get Started","permalink":"/moco/miscellaneous/dart/dart_get-started"},"next":{"title":"Web server","permalink":"/moco/miscellaneous/dart/dart_web-server"}}'),a=n("85893"),s=n("50065");let o={title:"NSFW SDK",description:"Dart: NSFW SDK",tags:["Dart","Backend","Flutter"],hide_table_of_contents:!0,date_created:new Date("2022-10-31T16:00:00.000Z"),image:"https://lh3.googleusercontent.com/pw/AL9nZEUA9Ifvd5Z8SXDWkeVB6AC4MPGwnXaL6kBXNPoXwOQQ2jOcZ1Jw_0p8TKK8C3ZX0e67_FOY15eDrm7aaXSQJcKtoUzC80SAQEHsaBy6qS2AqNNs5VUFNXBKm439y_1wkvmDl-PnL8ReojnIumNlEvOXBg=w800-no?authuser=0"},l="[Dart] NSFW SDK",c={},i=[{value:"See Also",id:"see-also",level:2}];function d(e){let t={h1:"h1",h2:"h2",header:"header",p:"p",strong:"strong",...(0,s.a)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(t.header,{children:(0,a.jsx)(t.h1,{id:"dart-nsfw-sdk",children:"[Dart] NSFW SDK"})}),"\n",(0,a.jsx)(t.p,{children:"\u56E0\u61C9\u5FC5\u7136\u8981\u8DDF\u4E0A\u7684\u6578\u4F4D\u8F49\u578B\u9700\u6C42, \u516C\u53F8\u6C7A\u5B9A\u63A1\u7528 Flutter \u9032\u884C\u65B0 App \u7684\u958B\u767C.\n\u4F46\u56E0\u820A\u7CFB\u7D71 API \u5404\u65B9\u9762\u958B\u767C\u8A2D\u8A08\u90FD\u6709\u6975\u5927\u554F\u984C, \u5718\u968A\u6B77\u7D93\u8A0E\u8AD6\u5F8C, \u6C7A\u8B70\u4E0D\u8B93\u65B0 App \u76F4\u63A5\u4ECB\u63A5\u820A\u7CFB\u7D71."}),"\n",(0,a.jsx)(t.p,{children:"\u7406\u60F3\u4E0A\u662F\u5EFA\u7ACB\u65B0 Web Service, \u5C0D\u5BA2\u6236\u7AEF\u63D0\u4F9B\u5168\u65B0 API,\n\u5C0D\u5167\u4F9D\u9700\u6C42\u4ECB\u63A5\u820A API \u670D\u52D9\u6216\u76F4\u63A5\u5B58\u53D6\u5167\u90E8\u8CC7\u6E90\u7686\u53EF.\n\u7919\u65BC\u7E3D\u7E3D\u653F\u6CBB\u7BA1\u7406\u89D2\u529B\u7B49, \u65B0 Web Servoces \u5EFA\u7F6E\u53EF\u80FD\u9059\u9059\u7121\u671F,\n\u6298\u8877\u65B9\u6848\u5247\u662F\u7528 Dart \u958B\u767C\u5BA2\u6236\u7AEF SDK, \u63D0\u4F9B\u6A19\u6E96 Web Services \u63A5\u53E3,\n\u4EE3\u7406 Flutter App \u547C\u53EB\u820A\u7CFB\u7D71 API, \u8F49\u63DB\u6574\u7406\u8CC7\u6599\u5F8C\u63D0\u4F9B JSON \u7D66\u5BA2\u6236\u7AEF."}),"\n",(0,a.jsxs)(t.p,{children:["\u8166\u6D1E\u5927\u958B\u7684\u60F3\u6CD5\u662F, \u65E2\u7136\u6574\u7406\u8CC7\u6599\u7684\u5143\u4EF6\u90FD\u5BEB\u597D\u4E86, \u6709\u6C92\u6709\u6A5F\u6703\u90A3\u5929\u5EFA\u69CB Web Services \u6642,\n\u53EF\u4EE5\u76F4\u63A5\u6CBF\u7528\u9019\u4E9B\u7A0B\u5F0F\u5143\u4EF6. ",(0,a.jsx)(t.strong,{children:"Dart \u80FD\u5426\u62FF\u4F86\u958B\u767C Web Server?"})]}),"\n",(0,a.jsx)(t.h2,{id:"see-also",children:"See Also"})]})}function u(e={}){let{wrapper:t}={...(0,s.a)(),...e.components};return t?(0,a.jsx)(t,{...e,children:(0,a.jsx)(d,{...e})}):d(e)}},50065:function(e,t,n){n.d(t,{Z:function(){return l},a:function(){return o}});var r=n(67294);let a={},s=r.createContext(a);function o(e){let t=r.useContext(s);return r.useMemo(function(){return"function"==typeof e?e(t):{...t,...e}},[t,e])}function l(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:o(e.components),r.createElement(s.Provider,{value:t},e.children)}}}]);