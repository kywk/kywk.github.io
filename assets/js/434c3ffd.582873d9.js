"use strict";(self.webpackChunkblog_kywk=self.webpackChunkblog_kywk||[]).push([[87709],{3905:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>d});var r=n(67294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},l=Object.keys(e);for(r=0;r<l.length;r++)n=l[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(r=0;r<l.length;r++)n=l[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var i=r.createContext({}),p=function(e){var t=r.useContext(i),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},c=function(e){var t=p(e.components);return r.createElement(i.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,l=e.originalType,i=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),m=p(n),d=a,g=m["".concat(i,".").concat(d)]||m[d]||u[d]||l;return n?r.createElement(g,o(o({ref:t},c),{},{components:n})):r.createElement(g,o({ref:t},c))}));function d(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var l=n.length,o=new Array(l);o[0]=m;var s={};for(var i in t)hasOwnProperty.call(t,i)&&(s[i]=t[i]);s.originalType=e,s.mdxType="string"==typeof e?e:a,o[1]=s;for(var p=2;p<l;p++)o[p]=n[p];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},8286:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>i,default:()=>d,frontMatter:()=>s,metadata:()=>p,toc:()=>u});var r=n(87462),a=(n(67294),n(3905)),l=n(74866),o=n(85162);const s={title:"Get Started",description:"TypeScript: Get Started",tags:["TypeScript","beginner"],created:new Date("2022-05-26T16:00:00.000Z"),image:"https://i.imgur.com/mErPwqL.png"},i="[TypeScript] Get started",p={unversionedId:"node.js/typescript/ts_get-started",id:"node.js/typescript/ts_get-started",title:"Get Started",description:"TypeScript: Get Started",source:"@site/blogging/moco/node.js/typescript/ts_get-started.md",sourceDirName:"node.js/typescript",slug:"/node.js/typescript/ts_get-started",permalink:"/moco/node.js/typescript/ts_get-started",draft:!1,tags:[{label:"TypeScript",permalink:"/moco/tags/type-script"},{label:"beginner",permalink:"/moco/tags/beginner"}],version:"current",frontMatter:{title:"Get Started",description:"TypeScript: Get Started",tags:["TypeScript","beginner"],created:"2022-05-26T16:00:00.000Z",image:"https://i.imgur.com/mErPwqL.png"},sidebar:"tutorialSidebar",previous:{title:"Awesome TypeScript",permalink:"/moco/node.js/typescript/awesome"},next:{title:"TSC Error",permalink:"/moco/node.js/typescript/ts_tsc-error"}},c={},u=[{value:"TypeScript",id:"typescript",level:2},{value:"Install",id:"install",level:3},{value:"Hello World",id:"hello-world",level:3},{value:"Project",id:"project",level:2},{value:"tsconfig.json",id:"tsconfigjson",level:3},{value:"package.json",id:"packagejson",level:3},{value:".files",id:"files",level:3},{value:"\u5c0f\u7d50",id:"\u5c0f\u7d50",level:2},{value:"See Also",id:"see-also",level:2}],m={toc:u};function d(e){let{components:t,...n}=e;return(0,a.kt)("wrapper",(0,r.Z)({},m,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"typescript-get-started"},"[TypeScript]"," Get started"),(0,a.kt)("h2",{id:"typescript"},"TypeScript"),(0,a.kt)("p",null,"TypeScript \u662f\u7531\u5fae\u8edf\u958b\u767c, \u63d0\u4f9b\u578b\u5225\u7cfb\u7d71\u548c ES6 \u652f\u63f4\u7684 JavaScript \u64f4\u5145.\n\u5b83\u53ef\u4ee5\u7de8\u8b6f\u6210\u6a19\u6e96\u7684 JavaScript, \u7de8\u8b6f\u5f8c\u7684 JavaScript \u53ef\u4ee5\u5728\u4efb\u4f55\u652f\u63f4 JavaScript \u7684\u74b0\u5883\u4e2d\u57f7\u884c."),(0,a.kt)("p",null,"\u5b98\u7db2\u5b9a\u7fa9\u5982\u4e0b:"),(0,a.kt)("blockquote",null,(0,a.kt)("p",{parentName:"blockquote"},"TypeScript is a typed superset of JavaScript that compiles to plain JavaScript. Any browser. Any host. Any OS. Open source.")),(0,a.kt)("h3",{id:"install"},"Install"),(0,a.kt)("p",null,"TypeScript \u7de8\u8b6f\u5668\u662f npm \u7684\u5957\u4ef6, \u9700\u5148\u6e96\u5099 Node.js \u958b\u767c\u74b0\u5883. ",(0,a.kt)("a",{parentName:"p",href:"../node.js/js_get-started.md"},"([Node.js] Get Started)"),(0,a.kt)("br",{parentName:"p"}),"\n","\u6e96\u5099\u597d\u5f8c, \u900f\u904e\u4e0b\u5217\u6307\u4ee4\u5b89\u88dd TypeScript \u7de8\u8b6f\u5668."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell"},"$ npm install -g typescript\n")),(0,a.kt)("h3",{id:"hello-world"},"Hello World"),(0,a.kt)("p",null,"TypeScript \u7684\u6a94\u6848\u4ee5 ",(0,a.kt)("inlineCode",{parentName:"p"},".ts")," \u7d50\u5c3e, \u9700\u7de8\u8b6f\u6210 ",(0,a.kt)("inlineCode",{parentName:"p"},".js")," \u6a94\u6848\u624d\u80fd\u88ab JavaScript Runtime \u57f7\u884c."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-ts",metastring:'title="hello.ts"',title:'"hello.ts"'},"function sayHello(person: string) {\n    return 'Hello, ' + person;\n}\n\nlet user = 'Tom';\nconsole.log(sayHello(user));\n")),(0,a.kt)("p",null,"\u7136\u5f8c\u57f7\u884c"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell"},"$ tsc hello.ts\n")),(0,a.kt)("p",null,"\u6703\u5f97\u5230 hello.js \u5982\u4e0b:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js",metastring:'title="hello.js"',title:'"hello.js"'},"function sayHello(person) {\n    return 'Hello, ' + person;\n}\nvar user = 'Tom';\nconsole.log(sayHello(user));\n")),(0,a.kt)("p",null,"\u6b64\u6642\u53ef\u4ee5\u900f\u904e\u4efb\u4f55 JS runtime \u57f7\u884c hello.js"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell"},"$ node ./hello.js\nHello, Tom\n")),(0,a.kt)("h2",{id:"project"},"Project"),(0,a.kt)("h3",{id:"tsconfigjson"},"tsconfig.json"),(0,a.kt)("p",null,"TypeScript \u958b\u767c\u9700\u8981\u7de8\u8b6f\u5f8c\u624d\u80fd\u88ab\u57f7\u884c, \u800c tsc \u7de8\u8b6f\u5668\u6709\u8a31\u591a\u8a2d\u5b9a\u53ef\u4ee5\u4f9d\u5c08\u6848\u9700\u6c42\u8abf\u6574.\n\u9664\u4e86\u90fd\u900f\u904e CLI \u9010\u4e00\u8f38\u5165\u547d\u4ee4\u8207\u53c3\u6578\u5916, \u901a\u5e38\u6703\u5728\u5c08\u6848\u6839\u76ee\u9304\u65b0\u589e ",(0,a.kt)("inlineCode",{parentName:"p"},"tsconfig.json")," \u6a94\u6848,\n\u6240\u6709\u6709\u95dc TS \u7684\u7de8\u8b6f\u8a2d\u5b9a\u90fd\u6703\u5beb\u5728 ",(0,a.kt)("inlineCode",{parentName:"p"},"tsconfig.json")," \u6a94\u6848\u4e2d."),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"tsconfig.json")," \u662f\u4e00\u500b\u6a19\u6e96\u7684 JSON \u6a94, \u4e0d\u80fd\u662f\u7a7a\u767d\u6a94\u6848. \u53ef\u4ee5\u662f\u4e00\u500b\u7a7a\u7684 JSON \u7269\u4ef6\u5982\u4e0b,\n\u6b64\u6642 tsc \u6703\u63a1\u7528\u9810\u8a2d\u7de8\u8b6f\u8a2d\u5b9a, \u53bb\u7de8\u8b6f\u5c08\u6848\u8cc7\u6599\u593e\u4e0b\u6240\u6709\u5305\u542b ",(0,a.kt)("inlineCode",{parentName:"p"},".ts")," \u7684\u6a94\u6848."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell"},'$ echo "{}" >> tsconfig.json\n')),(0,a.kt)("p",null,"\u4e00\u822c\u4f7f\u7528\u4e0a, \u6703\u900f\u904e ",(0,a.kt)("inlineCode",{parentName:"p"},"tsc --init")," \u4f86\u5efa\u7acb\u9810\u8a2d\u7684 ",(0,a.kt)("inlineCode",{parentName:"p"},"tsconfig.json"),",\n\u4f9d\u958b\u767c\u74b0\u5883\u7248\u672c\u4e0d\u540c, \u53ef\u80fd\u4e0d\u540c\u7684\u9810\u8a2d\u8a2d\u5b9a. "),(0,a.kt)(l.Z,{mdxType:"Tabs"},(0,a.kt)(o.Z,{value:"shell",label:"Shell",default:!0,mdxType:"TabItem"},(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell"},"$ tsc --init\n\nCreated a new tsconfig.json with:\n\n  target: es2016\n  module: commonjs\n  strict: true\n  esModuleInterop: true\n  skipLibCheck: true\n  forceConsistentCasingInFileNames: true\n\nYou can learn more at https://aka.ms/tsconfig.json\n"))),(0,a.kt)(o.Z,{value:"json",label:"tsconfig.json",mdxType:"TabItem"},(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-json"},'{\n  "compilerOptions": {\n    /* Visit https://aka.ms/tsconfig.json to read more about this file */\n\n    /* Projects */\n    /* Language and Environment */\n    "target": "es2016",                                  /* Set the JavaScript language version for emitted JavaScript and include compatible library declarations. */\n\n    /* Modules */\n    "module": "commonjs",                                /* Specify what module code is generated. */\n\n    /* Interop Constraints */\n    "esModuleInterop": true,                             /* Emit additional JavaScript to ease support for importing CommonJS modules. This enables `allowSyntheticDefaultImports` for type compatibility. */\n    "forceConsistentCasingInFileNames": true,            /* Ensure that casing is correct in imports. */\n\n    /* Type Checking */\n    "strict": true,                                      /* Enable all strict type-checking options. */\n\n    /* Completeness */\n    "skipLibCheck": true                                 /* Skip type checking all .d.ts files. */\n  }\n}\n')))),(0,a.kt)("p",null,"\u800c\u4e0d\u540c\u958b\u767c\u6846\u67b6\u6216\u4e0d\u540c\u7248\u672c\u7684\u958b\u767c\u74b0\u5883, \u5efa\u8b70\u7684\u7de8\u8b6f\u8a2d\u5b9a\u4e5f\u6709\u6240\u4e0d\u540c."),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://github.com/tsconfig/bases"},"tsconfig/bases: Hosts TSConfigs to extend in a TypeScript app, tuned to a particular runtime environment"),"\n\u9019\u500b GitHub \u5c08\u6848\u6536\u9304\u4e86\u5e38\u898b\u7684\u958b\u767c\u6846\u67b6\u4e0b\u5efa\u8b70\u7684 ",(0,a.kt)("inlineCode",{parentName:"p"},"tsconfig.json")," \u8a2d\u5b9a.\n\u9664\u4e86\u900f\u904e ",(0,a.kt)("inlineCode",{parentName:"p"},"tsc --init")," \u5efa\u7acb\u9810\u8a2d ",(0,a.kt)("inlineCode",{parentName:"p"},"tsconfig.json")," \u5916,\n\u4e5f\u53ef\u4ee5\u6839\u64da\u5c08\u6848\u6846\u67b6, \u627e\u5230\u63a8\u85a6\u7684 ",(0,a.kt)("inlineCode",{parentName:"p"},"tsconfig.json")," \u4e0b\u8f09\u653e\u7f6e\u65bc\u5c08\u6848\u8cc7\u6599\u593e."),(0,a.kt)("h3",{id:"packagejson"},"package.json"),(0,a.kt)("p",null,"\u96d6\u7136\u5fae\u8edf\u4e0d\u65b7\u63a8\u52d5\u6574\u5408\u6027 IDE \u5c0d TypeScript \u7684\u539f\u751f\u652f\u63f4,\n\u4f46 TypeScript \u958b\u767c\u74b0\u5883\u5927\u591a\u9084\u662f\u4f9d\u8cf4\u65bc JavaScript (Node.js),\n\u8a31\u591a\u958b\u767c\u6846\u67b6\u4e5f\u662f\u6cbf\u7528 Node.js \u4e0a\u7684\u8cc7\u6e90.\n\u56e0\u6b64 TypeScript \u5c08\u6848\u901a\u5e38\u9084\u662f\u6703\u5efa\u7acb ",(0,a.kt)("inlineCode",{parentName:"p"},"package.json")),(0,a.kt)(l.Z,{mdxType:"Tabs"},(0,a.kt)(o.Z,{value:"npm",label:"npm",default:!0,mdxType:"TabItem"},(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell"},"$ npm init\nThis utility will walk you through creating a package.json file.\nIt only covers the most common items, and tries to guess sensible defaults.\n...\n"))),(0,a.kt)(o.Z,{value:"yarn",label:"yarn",mdxType:"TabItem"},(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell"},"$ yarn init\nyarn init v1.22.18\nquestion name (sandbox): \n...\n")))),(0,a.kt)("h3",{id:"files"},".files"),(0,a.kt)("p",null,"\u8a31\u591a Node.js \u5e38\u7528\u7684\u958b\u767c\u5de5\u5177\u5982 ESLine, Jest, ...\u7b49,\n\u5728 TypeScript \u90fd\u662f\u9069\u7528\u7684.\n\u5c08\u6848\u6839\u76ee\u9304\u9664\u4e86 ",(0,a.kt)("inlineCode",{parentName:"p"},"tsconfig.json")," \u548c ",(0,a.kt)("inlineCode",{parentName:"p"},"package.json")," \u5916,\n\u53ef\u80fd\u9084\u6709\u8a31\u591a\u76f8\u95dc\u958b\u767c\u5de5\u5177\u7684\u914d\u7f6e\u8a2d\u5b9a\u6a94. "),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://dev.to/0xkoji/create-an-npm-package-template-with-typescript-and-rollup-js-294a"},"Create an npm package template with TypeScript and rollup.js - DEV Community"),"\n\u9019\u7bc7\u6587\u7ae0\u9010\u6b65\u4ecb\u7d39\u4e86 TypeScript \u5c08\u6848\u5982\u4f55\u914d\u7f6e.",(0,a.kt)("br",{parentName:"p"}),"\n","\u800c ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/ryansonshine/typescript-npm-package-template"},"ryansonshine/typescript-npm-package-template: Boilerplate to kickstart creating an npm package using TypeScript"),"\n\u5247\u662f\u958b\u767c\u8005\u5206\u4eab\u4e86\u4ed6\u500b\u4eba TypeScript \u57fa\u672c\u5c08\u6848\u914d\u7f6e.",(0,a.kt)("br",{parentName:"p"}),"\n","\u90fd\u662f\u503c\u5f97\u53c3\u8003\u7684\u8cc7\u6e90."),(0,a.kt)("h2",{id:"\u5c0f\u7d50"},"\u5c0f\u7d50"),(0,a.kt)("p",null,"...TBD..."),(0,a.kt)("h2",{id:"see-also"},"See Also"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"https://willh.gitbook.io/typescript-tutorial/"},"TypeScript \u65b0\u624b\u6307\u5357")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"https://docs.microsoft.com/zh-tw/learn/modules/typescript-get-started/"},"\u958b\u59cb\u4f7f\u7528 TypeScript - Learn | Microsoft Docs")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"https://ithelp.ithome.com.tw/users/20120053/ironman/2273"},"Typescript \u521d\u5fc3\u8005\u624b\u672d :: \u7b2c 11 \u5c46 iThome \u9435\u4eba\u8cfd")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"tsconfig.json"),(0,a.kt)("ul",{parentName:"li"},(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"https://typescript.bootcss.com/tsconfig-json.html"},"tsconfig.json - TypeScript \u4e2d\u6587\u624b\u518c")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"https://ithelp.ithome.com.tw/articles/10216636"},"\u3010Day 03\u3011 TypeScript \u7de8\u8b6f\u8a2d\u5b9a - tsconfig.json - iT \u90a6\u5e6b\u5fd9::\u4e00\u8d77\u5e6b\u5fd9\u89e3\u6c7a\u96e3\u984c\uff0c\u62ef\u6551 IT \u4eba\u7684\u4e00\u5929"))))))}d.isMDXComponent=!0},85162:(e,t,n)=>{n.d(t,{Z:()=>o});var r=n(67294),a=n(86010);const l="tabItem_Ymn6";function o(e){let{children:t,hidden:n,className:o}=e;return r.createElement("div",{role:"tabpanel",className:(0,a.Z)(l,o),hidden:n},t)}},74866:(e,t,n)=>{n.d(t,{Z:()=>j});var r=n(87462),a=n(67294),l=n(86010),o=n(12466),s=n(76775),i=n(91980),p=n(67392),c=n(50012);function u(e){return function(e){var t;return(null==(t=a.Children.map(e,(e=>{if(!e||(0,a.isValidElement)(e)&&function(e){const{props:t}=e;return!!t&&"object"==typeof t&&"value"in t}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)})))?void 0:t.filter(Boolean))??[]}(e).map((e=>{let{props:{value:t,label:n,attributes:r,default:a}}=e;return{value:t,label:n,attributes:r,default:a}}))}function m(e){const{values:t,children:n}=e;return(0,a.useMemo)((()=>{const e=t??u(n);return function(e){const t=(0,p.l)(e,((e,t)=>e.value===t.value));if(t.length>0)throw new Error(`Docusaurus error: Duplicate values "${t.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[t,n])}function d(e){let{value:t,tabValues:n}=e;return n.some((e=>e.value===t))}function g(e){let{queryString:t=!1,groupId:n}=e;const r=(0,s.k6)(),l=function(e){let{queryString:t=!1,groupId:n}=e;if("string"==typeof t)return t;if(!1===t)return null;if(!0===t&&!n)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return n??null}({queryString:t,groupId:n});return[(0,i._X)(l),(0,a.useCallback)((e=>{if(!l)return;const t=new URLSearchParams(r.location.search);t.set(l,e),r.replace({...r.location,search:t.toString()})}),[l,r])]}function f(e){const{defaultValue:t,queryString:n=!1,groupId:r}=e,l=m(e),[o,s]=(0,a.useState)((()=>function(e){let{defaultValue:t,tabValues:n}=e;if(0===n.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(t){if(!d({value:t,tabValues:n}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${t}" but none of its children has the corresponding value. Available values are: ${n.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return t}const r=n.find((e=>e.default))??n[0];if(!r)throw new Error("Unexpected error: 0 tabValues");return r.value}({defaultValue:t,tabValues:l}))),[i,p]=g({queryString:n,groupId:r}),[u,f]=function(e){let{groupId:t}=e;const n=function(e){return e?`docusaurus.tab.${e}`:null}(t),[r,l]=(0,c.Nk)(n);return[r,(0,a.useCallback)((e=>{n&&l.set(e)}),[n,l])]}({groupId:r}),k=(()=>{const e=i??u;return d({value:e,tabValues:l})?e:null})();(0,a.useLayoutEffect)((()=>{k&&s(k)}),[k]);return{selectedValue:o,selectValue:(0,a.useCallback)((e=>{if(!d({value:e,tabValues:l}))throw new Error(`Can't select invalid tab value=${e}`);s(e),p(e),f(e)}),[p,f,l]),tabValues:l}}var k=n(72389);const y="tabList__CuJ",h="tabItem_LNqP";function b(e){let{className:t,block:n,selectedValue:s,selectValue:i,tabValues:p}=e;const c=[],{blockElementScrollPositionUntilNextRender:u}=(0,o.o5)(),m=e=>{const t=e.currentTarget,n=c.indexOf(t),r=p[n].value;r!==s&&(u(t),i(r))},d=e=>{var t;let n=null;switch(e.key){case"Enter":m(e);break;case"ArrowRight":{const t=c.indexOf(e.currentTarget)+1;n=c[t]??c[0];break}case"ArrowLeft":{const t=c.indexOf(e.currentTarget)-1;n=c[t]??c[c.length-1];break}}null==(t=n)||t.focus()};return a.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,l.Z)("tabs",{"tabs--block":n},t)},p.map((e=>{let{value:t,label:n,attributes:o}=e;return a.createElement("li",(0,r.Z)({role:"tab",tabIndex:s===t?0:-1,"aria-selected":s===t,key:t,ref:e=>c.push(e),onKeyDown:d,onClick:m},o,{className:(0,l.Z)("tabs__item",h,null==o?void 0:o.className,{"tabs__item--active":s===t})}),n??t)})))}function v(e){let{lazy:t,children:n,selectedValue:r}=e;const l=(Array.isArray(n)?n:[n]).filter(Boolean);if(t){const e=l.find((e=>e.props.value===r));return e?(0,a.cloneElement)(e,{className:"margin-top--md"}):null}return a.createElement("div",{className:"margin-top--md"},l.map(((e,t)=>(0,a.cloneElement)(e,{key:t,hidden:e.props.value!==r}))))}function S(e){const t=f(e);return a.createElement("div",{className:(0,l.Z)("tabs-container",y)},a.createElement(b,(0,r.Z)({},e,t)),a.createElement(v,(0,r.Z)({},e,t)))}function j(e){const t=(0,k.Z)();return a.createElement(S,(0,r.Z)({key:String(t)},e))}}}]);