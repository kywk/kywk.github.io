"use strict";(self.webpackChunkblog_kywk=self.webpackChunkblog_kywk||[]).push([[47186],{3905:(e,t,r)=>{r.d(t,{Zo:()=>c,kt:()=>m});var n=r(67294);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function p(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var s=n.createContext({}),l=function(e){var t=n.useContext(s),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},c=function(e){var t=l(e.components);return n.createElement(s.Provider,{value:t},e.children)},g={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},u=n.forwardRef((function(e,t){var r=e.components,o=e.mdxType,a=e.originalType,s=e.parentName,c=p(e,["components","mdxType","originalType","parentName"]),u=l(r),m=o,d=u["".concat(s,".").concat(m)]||u[m]||g[m]||a;return r?n.createElement(d,i(i({ref:t},c),{},{components:r})):n.createElement(d,i({ref:t},c))}));function m(e,t){var r=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=r.length,i=new Array(a);i[0]=u;var p={};for(var s in t)hasOwnProperty.call(t,s)&&(p[s]=t[s]);p.originalType=e,p.mdxType="string"==typeof e?e:o,i[1]=p;for(var l=2;l<a;l++)i[l]=r[l];return n.createElement.apply(null,i)}return n.createElement.apply(null,r)}u.displayName="MDXCreateElement"},20068:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>s,contentTitle:()=>i,default:()=>g,frontMatter:()=>a,metadata:()=>p,toc:()=>l});var n=r(87462),o=(r(67294),r(3905));const a={title:"Get Started",description:"Spring Boot: Get Started",tags:["SpringBoot","beginner"],sidebar_position:10,hide_table_of_contents:!0,created:new Date("2023-02-24T00:00:00.000Z"),updated:new Date("2023-03-24T00:00:00.000Z"),image:"https://lh3.googleusercontent.com/pw/AL9nZEUA9Ifvd5Z8SXDWkeVB6AC4MPGwnXaL6kBXNPoXwOQQ2jOcZ1Jw_0p8TKK8C3ZX0e67_FOY15eDrm7aaXSQJcKtoUzC80SAQEHsaBy6qS2AqNNs5VUFNXBKm439y_1wkvmDl-PnL8ReojnIumNlEvOXBg=w800-no?authuser=0"},i="[SpringBoot] Get started",p={unversionedId:"java/springboot/sb_get-started",id:"java/springboot/sb_get-started",title:"Get Started",description:"Spring Boot: Get Started",source:"@site/blogging/moco/java/springboot/sb_get-started.md",sourceDirName:"java/springboot",slug:"/java/springboot/sb_get-started",permalink:"/moco/java/springboot/sb_get-started",draft:!1,tags:[{label:"SpringBoot",permalink:"/moco/tags/spring-boot"},{label:"beginner",permalink:"/moco/tags/beginner"}],version:"current",sidebarPosition:10,frontMatter:{title:"Get Started",description:"Spring Boot: Get Started",tags:["SpringBoot","beginner"],sidebar_position:10,hide_table_of_contents:!0,created:"2023-02-24T00:00:00.000Z",updated:"2023-03-24T00:00:00.000Z",image:"https://lh3.googleusercontent.com/pw/AL9nZEUA9Ifvd5Z8SXDWkeVB6AC4MPGwnXaL6kBXNPoXwOQQ2jOcZ1Jw_0p8TKK8C3ZX0e67_FOY15eDrm7aaXSQJcKtoUzC80SAQEHsaBy6qS2AqNNs5VUFNXBKm439y_1wkvmDl-PnL8ReojnIumNlEvOXBg=w800-no?authuser=0"},sidebar:"tutorialSidebar",previous:{title:"Awesome Spring Boot",permalink:"/moco/java/springboot/awesome"},next:{title:"SrcTree Structure",permalink:"/moco/java/springboot/sb_src-tree"}},s={},l=[{value:"See Also",id:"see-also",level:2}],c={toc:l};function g(e){let{components:t,...r}=e;return(0,o.kt)("wrapper",(0,n.Z)({},c,r,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"springboot-get-started"},"[SpringBoot]"," Get started"),(0,o.kt)("h2",{id:"see-also"},"See Also"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"https://spring.io/guides/gs/spring-boot/"},"Getting Started | Building an Application with Spring Boot")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"https://blog.miniasp.com/post/2022/09/19/Spring-Boot-Quick-Start-From-Scratch"},"\u5f9e\u7121\u5230\u6709\u4e0a\u624b\u4f60\u7684\u7b2c\u4e00\u500b Spring Boot \u61c9\u7528\u7a0b\u5f0f | The Will Will Web")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"https://ithelp.ithome.com.tw/users/20119569/ironman/2159"},"30\u5929\u5e36\u4f60\u6f6e\u73a9Spring Boot Zone :: \u7b2c 11 \u5c46 iThome \u9435\u4eba\u8cfd")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"https://hackmd.io/@bingdoal/SkNK5YWPw"},"Spring Boot \u521d\u5b78\u7528\u6cd5\u4ecb\u7d39 - HackMD"))))}g.isMDXComponent=!0}}]);