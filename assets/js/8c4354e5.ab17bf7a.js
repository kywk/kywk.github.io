"use strict";(self.webpackChunkkywk_github_io=self.webpackChunkkywk_github_io||[]).push([[74884],{5191:(e,r,n)=>{n.r(r),n.d(r,{assets:()=>c,contentTitle:()=>s,default:()=>p,frontMatter:()=>a,metadata:()=>i,toc:()=>l});var t=n(85893),o=n(11151);const a={title:"SrcTree Structure",description:"Spring Boot: Code & Folder Structure",tags:["SpringBoot","Beginner"],sidebar_position:10,hide_table_of_contents:!0,date_created:new Date("2023-03-15T00:00:00.000Z"),date_updated:new Date("2023-03-15T00:00:00.000Z"),image:"https://lh3.googleusercontent.com/pw/AL9nZEUA9Ifvd5Z8SXDWkeVB6AC4MPGwnXaL6kBXNPoXwOQQ2jOcZ1Jw_0p8TKK8C3ZX0e67_FOY15eDrm7aaXSQJcKtoUzC80SAQEHsaBy6qS2AqNNs5VUFNXBKm439y_1wkvmDl-PnL8ReojnIumNlEvOXBg=w800-no?authuser=0"},s="[SpringBoot] Project Source Tree Structure",i={id:"java/springboot/sb_src-tree",title:"SrcTree Structure",description:"Spring Boot: Code & Folder Structure",source:"@site/moco/java/springboot/sb_src-tree.md",sourceDirName:"java/springboot",slug:"/java/springboot/sb_src-tree",permalink:"/moco/java/springboot/sb_src-tree",draft:!1,unlisted:!1,tags:[{label:"SpringBoot",permalink:"/moco/tags/spring-boot"},{label:"Beginner",permalink:"/moco/tags/beginner"}],version:"current",sidebarPosition:10,frontMatter:{title:"SrcTree Structure",description:"Spring Boot: Code & Folder Structure",tags:["SpringBoot","Beginner"],sidebar_position:10,hide_table_of_contents:!0,date_created:"2023-03-15T00:00:00.000Z",date_updated:"2023-03-15T00:00:00.000Z",image:"https://lh3.googleusercontent.com/pw/AL9nZEUA9Ifvd5Z8SXDWkeVB6AC4MPGwnXaL6kBXNPoXwOQQ2jOcZ1Jw_0p8TKK8C3ZX0e67_FOY15eDrm7aaXSQJcKtoUzC80SAQEHsaBy6qS2AqNNs5VUFNXBKm439y_1wkvmDl-PnL8ReojnIumNlEvOXBg=w800-no?authuser=0"},sidebar:"tutorialSidebar",previous:{title:"Get Started",permalink:"/moco/java/springboot/sb_get-started"},next:{title:"From Scratch",permalink:"/moco/java/springboot/sb_from-scratch"}},c={},l=[{value:"By feature",id:"by-feature",level:2},{value:"By Layer",id:"by-layer",level:2},{value:"Summary",id:"summary",level:2},{value:"See Also",id:"see-also",level:2}];function d(e){const r={a:"a",code:"code",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...(0,o.a)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(r.h1,{id:"springboot-project-source-tree-structure",children:"[SpringBoot] Project Source Tree Structure"}),"\n",(0,t.jsx)(r.p,{children:"SpringBoot \u61c9\u7528\u7a0b\u5f0f\u958b\u767c\u4f9d\u9760 Spring Framework Annotation \u81ea\u52d5\u627e\u5c0b\u8f09\u5165\u5404\u500b\u529f\u80fd\u5143\u4ef6\u8207\u5b9a\u7fa9\u8a2d\u5b9a."}),"\n",(0,t.jsx)(r.pre,{children:(0,t.jsx)(r.code,{className:"language-java",metastring:'title="Application.java"',children:"@SpringBootApplication\npublic class Application {\n\tpublic static void main(String[] args) {\n\t\tSpringApplication.run(Application.class, args);\n\t}\n}\n"})}),"\n",(0,t.jsxs)(r.p,{children:["Spring \u7684\u9032\u5165\u9ede\u5c31\u5982\u4e0a\u9762\u9019\u6bb5 code ",(0,t.jsx)(r.code,{children:"@SpringBootApplication"})," \u9019\u500b annotation \u662f\u4e00\u5806 annotation \u7684\u7d9c\u5408\u9ad4.\n\u9810\u8a2d\u6240\u6709\u7684 ",(0,t.jsx)(r.code,{children:"Controller"}),", ",(0,t.jsx)(r.code,{children:"Model"}),", ",(0,t.jsx)(r.code,{children:"Service"})," \u7b49\u7b49 Spring \u76f8\u95dc\u7684 annotation \u53ea\u80fd\u4f7f\u7528\u5728\u8207__\u9032\u5165\u9ede\u540c\u76ee\u9304\u6216\u5b50\u76ee\u9304__\u4e0b, \u624d\u80fd\u88ab Spring \u7d66\u6383\u63cf\u5230."]}),"\n",(0,t.jsx)(r.p,{children:"\u56e0\u70ba Spring \u6846\u67b6\u6703\u81ea\u52d5\u6383\u63cf, \u6240\u4ee5\u5c08\u6848\u76ee\u9304\u7d50\u69cb\u53cd\u800c\u6c92\u6709\u7279\u5225\u898f\u5b9a\u6216\u5236\u5f0f\u7d50\u69cb.\n\u800c\u5c08\u6848\u958b\u767c\u7ba1\u7406\u4e0a, \u901a\u5e38\u6709\u5169\u7a2e\u65b9\u5f0f:"}),"\n",(0,t.jsx)(r.h2,{id:"by-feature",children:"By feature"}),"\n",(0,t.jsx)(r.p,{children:"In this approach, all classes pertaining to a certain feature are placed in the same package.\nThe structure by feature looks is shown in below example:"}),"\n",(0,t.jsx)(r.pre,{children:(0,t.jsx)(r.code,{children:"com\n +- gfg\n     +- demo\n         +- MyApplication.java\n         |\n         +- customer\n         |   +- Customer.java\n         |   +- CustomerController.java\n         |   +- CustomerService.java\n         |   +- CustomerRepository.java\n         |\n         +- order\n             +- Order.java\n             +- OrderController.java\n             +- OrderService.java\n             +- OrderRepository.java\n"})}),"\n",(0,t.jsx)(r.p,{children:"The advantages of this structure is as follows:"}),"\n",(0,t.jsxs)(r.ul,{children:["\n",(0,t.jsx)(r.li,{children:"Find a class to be modified is easy."}),"\n",(0,t.jsx)(r.li,{children:"By deleting a particular sub-package, all the classes related to a certain feature can be deleted."}),"\n",(0,t.jsx)(r.li,{children:"Testing and Refactoring is easy."}),"\n",(0,t.jsx)(r.li,{children:"Features can be shipped separately."}),"\n"]}),"\n",(0,t.jsx)(r.h2,{id:"by-layer",children:"By Layer"}),"\n",(0,t.jsx)(r.p,{children:"Another way to place the classes is by layer i.e; all controllers can be placed in controllers package and services under services package and all entities under domain or model etc."}),"\n",(0,t.jsx)(r.pre,{children:(0,t.jsx)(r.code,{children:"com\n +- gfg\n     +- demo\n         +- MyApplication.java\n         |\n         +- domain\n         |   +- Customer.java\n         |   +- Order.java\n         |\n         +- controllers\n         |     +- OrderController.java\n         |   +- CustomerController.java\n         |\n         +- services\n         |    +- CustomerService.java\n         |    +- OrderService.java\n         |\n         +- repositories\n              +- CustomerRepository.java\n              +- OrderRepository.java    \n"})}),"\n",(0,t.jsx)(r.p,{children:"Though the above structure looks feasible and easy to locate classes by a layer.\nIt has few disadvantages when compared to Structure by Feature."}),"\n",(0,t.jsxs)(r.ul,{children:["\n",(0,t.jsx)(r.li,{children:"Features or Modules cannot be shipped separately."}),"\n",(0,t.jsx)(r.li,{children:"Hard to locate a class pertaining to a certain feature."}),"\n",(0,t.jsx)(r.li,{children:"Code Refactoring on a certain feature is difficult since the feature classes located in every layer."}),"\n"]}),"\n",(0,t.jsx)(r.h2,{id:"summary",children:"Summary"}),"\n",(0,t.jsx)(r.p,{children:"\u76f8\u5c0d\u65bc\u5176\u4ed6\u6846\u67b6\u5e38\u898b\u6703\u7528 controller / model / middleware / ... \u7b49\u4f86\u8a2d\u8a08\u5c08\u6848\u76ee\u9304\u7d50\u69cb,\n\u5728 Spring Boot \u4e0b, \u82e5\u529f\u80fd\u8026\u5408\u6027\u4f4e, \u4f9d\u5404\u529f\u80fd\u9700\u6c42\u4f86\u8a2d\u8a08\u5c08\u6848\u76ee\u9304\u7d50\u69cb, \u4f3c\u4e4e\u662f\u66f4\u9069\u5408\u7684\u65b9\u5f0f."}),"\n",(0,t.jsx)(r.h2,{id:"see-also",children:"See Also"}),"\n",(0,t.jsxs)(r.ul,{children:["\n",(0,t.jsx)(r.li,{children:(0,t.jsx)(r.a,{href:"https://www.geeksforgeeks.org/spring-boot-code-structure/",children:"Spring Boot - Code Structure - GeeksforGeeks"})}),"\n",(0,t.jsx)(r.li,{children:(0,t.jsx)(r.a,{href:"https://studygyaan.com/spring-boot/spring-boot-project-folder-structure-and-best-practices",children:"Spring Boot Project - Code & Folder Structure and Best Practices"})}),"\n"]})]})}function p(e={}){const{wrapper:r}={...(0,o.a)(),...e.components};return r?(0,t.jsx)(r,{...e,children:(0,t.jsx)(d,{...e})}):d(e)}},11151:(e,r,n)=>{n.d(r,{Z:()=>i,a:()=>s});var t=n(67294);const o={},a=t.createContext(o);function s(e){const r=t.useContext(a);return t.useMemo((function(){return"function"==typeof e?e(r):{...r,...e}}),[r,e])}function i(e){let r;return r=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:s(e.components),t.createElement(a.Provider,{value:r},e.children)}}}]);