"use strict";(self.webpackChunkblog_kywk=self.webpackChunkblog_kywk||[]).push([[10020],{3905:(e,t,r)=>{r.d(t,{Zo:()=>p,kt:()=>y});var o=r(67294);function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function s(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,o)}return r}function c(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?s(Object(r),!0).forEach((function(t){n(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):s(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function a(e,t){if(null==e)return{};var r,o,n=function(e,t){if(null==e)return{};var r,o,n={},s=Object.keys(e);for(o=0;o<s.length;o++)r=s[o],t.indexOf(r)>=0||(n[r]=e[r]);return n}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(o=0;o<s.length;o++)r=s[o],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(n[r]=e[r])}return n}var i=o.createContext({}),l=function(e){var t=o.useContext(i),r=t;return e&&(r="function"==typeof e?e(t):c(c({},t),e)),r},p=function(e){var t=l(e.components);return o.createElement(i.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return o.createElement(o.Fragment,{},t)}},m=o.forwardRef((function(e,t){var r=e.components,n=e.mdxType,s=e.originalType,i=e.parentName,p=a(e,["components","mdxType","originalType","parentName"]),m=l(r),y=n,f=m["".concat(i,".").concat(y)]||m[y]||u[y]||s;return r?o.createElement(f,c(c({ref:t},p),{},{components:r})):o.createElement(f,c({ref:t},p))}));function y(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var s=r.length,c=new Array(s);c[0]=m;var a={};for(var i in t)hasOwnProperty.call(t,i)&&(a[i]=t[i]);a.originalType=e,a.mdxType="string"==typeof e?e:n,c[1]=a;for(var l=2;l<s;l++)c[l]=r[l];return o.createElement.apply(null,c)}return o.createElement.apply(null,r)}m.displayName="MDXCreateElement"},60762:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>i,contentTitle:()=>c,default:()=>u,frontMatter:()=>s,metadata:()=>a,toc:()=>l});var o=r(87462),n=(r(67294),r(3905));const s={title:"HTTP: CSRF",description:"Cross Site Request Forgery",tags:["security","HTTP"],created:new Date("2022-09-19T16:00:00.000Z"),image:"https://lh3.googleusercontent.com/pw/AL9nZEUA9Ifvd5Z8SXDWkeVB6AC4MPGwnXaL6kBXNPoXwOQQ2jOcZ1Jw_0p8TKK8C3ZX0e67_FOY15eDrm7aaXSQJcKtoUzC80SAQEHsaBy6qS2AqNNs5VUFNXBKm439y_1wkvmDl-PnL8ReojnIumNlEvOXBg=w800-no?authuser=0"},c="CSRF (Cross Site Request Forgery)",a={unversionedId:"devsecops/security/http_csrf",id:"devsecops/security/http_csrf",title:"HTTP: CSRF",description:"Cross Site Request Forgery",source:"@site/blogging/moco/devsecops/security/http_csrf.md",sourceDirName:"devsecops/security",slug:"/devsecops/security/http_csrf",permalink:"/moco/devsecops/security/http_csrf",draft:!1,tags:[{label:"security",permalink:"/moco/tags/security"},{label:"HTTP",permalink:"/moco/tags/http"}],version:"current",frontMatter:{title:"HTTP: CSRF",description:"Cross Site Request Forgery",tags:["security","HTTP"],created:"2022-09-19T16:00:00.000Z",image:"https://lh3.googleusercontent.com/pw/AL9nZEUA9Ifvd5Z8SXDWkeVB6AC4MPGwnXaL6kBXNPoXwOQQ2jOcZ1Jw_0p8TKK8C3ZX0e67_FOY15eDrm7aaXSQJcKtoUzC80SAQEHsaBy6qS2AqNNs5VUFNXBKm439y_1wkvmDl-PnL8ReojnIumNlEvOXBg=w800-no?authuser=0"},sidebar:"tutorialSidebar",previous:{title:"HTTP: CORS",permalink:"/moco/devsecops/security/http_cors"},next:{title:"SRE",permalink:"/moco/category/sre"}},i={},l=[{value:"\u524d\u8a00",id:"\u524d\u8a00",level:2},{value:"CSRF",id:"csrf",level:2},{value:"See Also",id:"see-also",level:2}],p={toc:l};function u(e){let{components:t,...r}=e;return(0,n.kt)("wrapper",(0,o.Z)({},p,r,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("h1",{id:"csrf-cross-site-request-forgery"},"CSRF (Cross Site Request Forgery)"),(0,n.kt)("blockquote",null,(0,n.kt)("p",{parentName:"blockquote"},"\u4e2d\u6587\u8cc7\u6e90\u512a\u5148\u63a8\u85a6 ",(0,n.kt)("a",{parentName:"p",href:"https://tech-blog.cymetrics.io/posts/jo/zerobased-cross-site-request-forgery/"},"\u96f6\u57fa\u790e\u8cc7\u5b89\u7cfb\u5217\uff08\u4e00\uff09-\u8a8d\u8b58 CSRF\uff08Cross Site Request Forgery\uff09")," \u9019\u7bc7,\n\u6dfa\u986f\u6613\u61c2, \u6613\u65bc\u4e86\u89e3.  "),(0,n.kt)("p",{parentName:"blockquote"},(0,n.kt)("em",{parentName:"p"},"\u672c\u6587\u70ba\u8cc7\u8a0a\u6536\u85cf\u6574\u7406, \u591a\u6578\u5167\u5bb9\u7bc0\u9304\u5176\u4ed6\u53c3\u8003\u8cc7\u6599, \u54ea\u5929\u6211\u8981\u9078\u5e02\u9577\u6642\u8acb\u5225\u62ff\u9019\u500b\u4f86\u6253\u6211."))),(0,n.kt)("h2",{id:"\u524d\u8a00"},"\u524d\u8a00"),(0,n.kt)("p",null,"\u96f6\u57fa\u790e\u8cc7\u5b89\u7cfb\u5217\u524d\u8a00\u7684\u4f8b\u5b50\u633a\u6709\u8da3\u7684, \u6284\u8972\u5982\u4e0b:"),(0,n.kt)("blockquote",null,(0,n.kt)("p",{parentName:"blockquote"},"\u964c\u751f\u4eba\uff1d Hacker / \u83dc\u55ae \uff1d Request\n\u684c\u865f\uff1d cookie / \u8001\u95c6\uff1d web server / \u4f60 \uff1d User"),(0,n.kt)("p",{parentName:"blockquote"},"\u60f3\u50cf\u4f60\u5230\u4e00\u5bb6\u9910\u5ef3\u5403\u98ef, \u964c\u751f\u4eba\u62ff\u4e86\u4e00\u5f35\u6709\u4f60\u684c\u865f\u7684\u83dc\u55ae\u9ede\u9910\u4e4b\u5f8c\u7d66\u8001\u95c6.\n\u7d50\u679c\u8001\u95c6\u554f\u4e5f\u4e0d\u554f\u4fbf\u6536\u4e86\u83dc\u55ae\u4e26\u5c07\u5e33\u8a18\u5230\u4e86\u4f60\u7684\u8eab\u4e0a. \u9019\u5c31\u662f CSRF \u7684\u57fa\u790e\u6982\u5ff5\u3002")),(0,n.kt)("p",null,"\u9019\u500b\u4f8b\u5b50\u4f86\u8aaa, \u4ee5\u5403\u8ca8\u89d2\u5ea6, \u5eda\u623f\u505a\u932f\u55ae, \u559c\u6b61\u7684\u83dc\u8272\u5c31\u6536\u4e0b, \u4e0d\u559c\u6b61\u5c31\u8acb\u670d\u52d9\u751f\u9000\u56de, \u5f71\u97ff\u4e0d\u5927.\n\u4e0d\u904e\u82e5\u662f\u50cf\u4e00\u4e9b\u9152\u5427\u662f\u5831\u684c\u865f\u8a18\u5e33\u7684\u6d88\u8cbb\u6a21\u5f0f, \u722d\u8b70\u5c31\u5927\u4e86..."),(0,n.kt)("p",null,"\u6240\u4ee5\u5230\u5e95\u4ec0\u9ebc\u662f CSRF \u5462?"),(0,n.kt)("h2",{id:"csrf"},"CSRF"),(0,n.kt)("h2",{id:"see-also"},"See Also"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"https://tech-blog.cymetrics.io/posts/jo/zerobased-cross-site-request-forgery/"},"\u96f6\u57fa\u790e\u8cc7\u5b89\u7cfb\u5217\uff08\u4e00\uff09-\u8a8d\u8b58 CSRF\uff08Cross Site Request Forgery\uff09")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"https://blog.techbridge.cc/2017/02/25/csrf-introduction/"},"\u8b93\u6211\u5011\u4f86\u8ac7\u8ac7 CSRF"))))}u.isMDXComponent=!0}}]);