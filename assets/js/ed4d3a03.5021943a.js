"use strict";(self.webpackChunkblog_kywk=self.webpackChunkblog_kywk||[]).push([[55019],{50145:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>c,contentTitle:()=>l,default:()=>d,frontMatter:()=>o,metadata:()=>i,toc:()=>a});var t=s(85893),r=s(11151);const o={title:"TSC Error",tags:["TypeScript"],created:new Date("2022-05-27T00:00:00.000Z"),categories:["typescript"]},l="[TypeScript] tsc Error Troubleshooting",i={id:"node.js/typescript/ts_tsc-error",title:"TSC Error",description:"\u672c\u7bc7\u96dc\u8a18\u6536\u9304\u958b\u767c\u904e\u7a0b\u4e2d tsc error \u53ca\u554f\u984c\u6392\u9664...",source:"@site/moco/node.js/typescript/ts_tsc-error.md",sourceDirName:"node.js/typescript",slug:"/node.js/typescript/ts_tsc-error",permalink:"/moco/node.js/typescript/ts_tsc-error",draft:!1,unlisted:!1,tags:[{label:"TypeScript",permalink:"/moco/tags/type-script"}],version:"current",frontMatter:{title:"TSC Error",tags:["TypeScript"],created:"2022-05-27T00:00:00.000Z",categories:["typescript"]},sidebar:"tutorialSidebar",previous:{title:"Get Started",permalink:"/moco/node.js/typescript/ts_get-started"},next:{title:"Express",permalink:"/moco/category/express"}},c={},a=[{value:"TS2304: Cannot find name &#39;process&#39;",id:"ts2304-cannot-find-name-process",level:2},{value:"TS2345: Type &#39;T1&#39; is not assignable to type &#39;T2&#39;",id:"ts2345-type-t1-is-not-assignable-to-type-t2",level:2},{value:"null",id:"null",level:3},{value:"TS2531: Object is possibly &#39;null&#39;",id:"ts2531-object-is-possibly-null",level:2}];function p(e){const n={a:"a",blockquote:"blockquote",code:"code",em:"em",h1:"h1",h2:"h2",h3:"h3",p:"p",pre:"pre",...(0,r.a)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.h1,{id:"typescript-tsc-error-troubleshooting",children:"[TypeScript] tsc Error Troubleshooting"}),"\n",(0,t.jsxs)(n.blockquote,{children:["\n",(0,t.jsx)(n.p,{children:"\u672c\u7bc7\u96dc\u8a18\u6536\u9304\u958b\u767c\u904e\u7a0b\u4e2d tsc error \u53ca\u554f\u984c\u6392\u9664..."}),"\n"]}),"\n",(0,t.jsx)(n.h2,{id:"ts2304-cannot-find-name-process",children:"TS2304: Cannot find name 'process'"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-shell",children:"error TS2304: Cannot find name 'process'\n"})}),"\n",(0,t.jsx)(n.p,{children:"You need to make sure that the type definitions for Node are available.\nThe way to do this depends on which version of TypeScript you are using."}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-shell",children:"$ npm install --save-dev @types/node\n"})}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsxs)(n.em,{children:["Ref: ",(0,t.jsx)(n.a,{href:"https://stackoverflow.com/questions/35551185/read-arguments-from-command-line-error-ts2304-cannot-find-name-process",children:"javascript - Read arguments from command line - error TS2304: Cannot find name 'process' - Stack Overflow"})]})}),"\n",(0,t.jsx)(n.h2,{id:"ts2345-type-t1-is-not-assignable-to-type-t2",children:"TS2345: Type 'T1' is not assignable to type 'T2'"}),"\n",(0,t.jsx)(n.h3,{id:"null",children:"null"}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsxs)(n.em,{children:["Ref: ",(0,t.jsx)(n.a,{href:"https://bobbyhadz.com/blog/typescript-type-null-is-not-assignable-to-type",children:"Solve - Type 'null' is not assignable to type in TypeScript | bobbyhadz"})]})}),"\n",(0,t.jsx)(n.h2,{id:"ts2531-object-is-possibly-null",children:"TS2531: Object is possibly 'null'"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-shell",children:"error TS2531: Object is possibly 'null'.\n"})}),"\n",(0,t.jsx)(n.p,{children:"ts \u5728\u7de8\u8b6f\u6642\u8a3a\u65b7\u5230\u7269\u4ef6\u53ef\u80fd\u6703\u7232 null, \u6240\u4ee5\u7d66\u51fa\u4e86\u9019\u6a23\u4e00\u500b\u63d0\u793a: \u5c0d\u8c61\u53ef\u80fd\u7232 null."}),"\n",(0,t.jsxs)(n.p,{children:["\u96d6\u53ef\u4fee\u6539 ",(0,t.jsx)(n.code,{children:"tsconfig.json"})," \u4e2d ",(0,t.jsx)(n.code,{children:"strictNullChecks = false"})," \u8b93\u7de8\u8b6f\u5668\u4e0d\u6aa2\u67e5 null,\n\u4f46\u5c08\u6848\u7ba1\u7406\u4e0a\u9084\u662f\u61c9\u8a72\u56b4\u8b39\u4e00\u4e9b\u770b\u5f85."]}),"\n",(0,t.jsxs)(n.blockquote,{children:["\n",(0,t.jsx)(n.p,{children:'files is defined to be FileList | null so it can be null.\nYou should either check for null (using an if) or\nuse a "Non-null assertion operator" (!) if you are sure it is not null:'}),"\n"]}),"\n",(0,t.jsx)(n.p,{children:"\u5982\u679c\u7a0b\u5f0f\u6d41\u7a0b\u4e2d, \u7269\u4ef6\u53ef\u80fd\u70ba null \u7684\u8a71, \u61c9\u8a72\u8981\u5728\u8b80\u53d6\u7269\u4ef6\u503c\u4e4b\u524d, \u5148\u5224\u65b7\u662f\u5426\u70ba null."}),"\n",(0,t.jsx)(n.p,{children:"\u82e5\u7a0b\u5f0f\u6d41\u7a0b\u53ef\u4ee5\u78ba\u5b9a\u7269\u4ef6\u4e0d\u6703\u662f null \u7684\u8a71, \u89e3\u6c7a\u65b9\u5f0f\u662f\u5728\u7269\u4ef6\u4e4b\u5f8c\u52a0\u4e00\u500b ! .\n\u9a5a\u5606\u865f\u5728 ts \u7de8\u8b6f\u5668\u4e2d, \u662f\u7269\u4ef6 not null \u7684\u65b7\u8a00\u64cd\u4f5c\u7b26,\n\u7de8\u8b6f\u5668\u770b\u5230\u9019\u500b\u7b26\u865f, \u4e0d\u6703\u5728\u7de8\u8b6f\u6642\u6aa2\u67e5\u662f\u5426\u70ba null."}),"\n",(0,t.jsx)(n.p,{children:"! \u53ea\u662f\u544a\u8a34\u7de8\u8b6f\u5668\u5728\u7de8\u8b6f\u4e0d\u8981\u6aa2\u67e5\u662f\u5426\u53ef\u80fd\u70ba null,\n\u958b\u767c\u6642\u8981\u78ba\u8a8d\u6d41\u7a0b\u4e0a\u4e0d\u6703\u9020\u6210 null \u624d\u53ef\u4f7f\u7528, \u5426\u5247\u5be6\u969b\u57f7\u884c\u9084\u662f\u6703\u51fa\u932f."}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsxs)(n.em,{children:["Ref: ",(0,t.jsx)(n.a,{href:"https://stackoverflow.com/questions/49431880/ts2531-object-is-possibly-null",children:"angular - TS2531: Object is possibly 'null' - Stack Overflow"})]})})]})}function d(e={}){const{wrapper:n}={...(0,r.a)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(p,{...e})}):p(e)}},11151:(e,n,s)=>{s.d(n,{Z:()=>i,a:()=>l});var t=s(67294);const r={},o=t.createContext(r);function l(e){const n=t.useContext(o);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function i(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:l(e.components),t.createElement(o.Provider,{value:n},e.children)}}}]);