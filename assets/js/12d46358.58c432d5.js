"use strict";(self.webpackChunkkywk_github_io=self.webpackChunkkywk_github_io||[]).push([[25860],{27485:(n,e,a)=>{a.r(e),a.d(e,{assets:()=>c,contentTitle:()=>o,default:()=>u,frontMatter:()=>i,metadata:()=>l,toc:()=>t});var r=a(85893),s=a(11151);const i={title:"Manjaro: \u5b89\u88dd\u7d00\u9304",description:"Manjaro: \u5b89\u88dd\u7d00\u9304",tags:["Linux/Manjaro","Linux","kywk"],date:new Date("2022-05-11T04:01:39.000Z"),image:"https://lh3.googleusercontent.com/pw/AM-JKLU2Ot2TyON1chUA-Qw7qj-OQSRMYNin7jsJsUa3E_jwqq1JbwTZZckUtJmNZmqxY5M4egm-ryt4g3Ope_0EqHBrCDSEHmcy-goHRzWh-ZgguUoy1XKpyS1DNx8aV92vAkAM0zZOW6EZR4KS3W1DClQKhw=w800-no?authuser=0"},o="[Manjaro] \u7cfb\u7d71\u5b89\u88dd\u7d00\u9304 2022.May",l={id:"utilities/linux_manjaro-setup",title:"Manjaro: \u5b89\u88dd\u7d00\u9304",description:"Manjaro: \u5b89\u88dd\u7d00\u9304",source:"@site/moco/utilities/linux_manjaro-setup.md",sourceDirName:"utilities",slug:"/utilities/linux_manjaro-setup",permalink:"/moco/utilities/linux_manjaro-setup",draft:!1,unlisted:!1,tags:[{label:"Linux/Manjaro",permalink:"/moco/tags/linux-manjaro"},{label:"Linux",permalink:"/moco/tags/linux"},{label:"kywk",permalink:"/moco/tags/kywk"}],version:"current",frontMatter:{title:"Manjaro: \u5b89\u88dd\u7d00\u9304",description:"Manjaro: \u5b89\u88dd\u7d00\u9304",tags:["Linux/Manjaro","Linux","kywk"],date:"2022-05-11T04:01:39.000Z",image:"https://lh3.googleusercontent.com/pw/AM-JKLU2Ot2TyON1chUA-Qw7qj-OQSRMYNin7jsJsUa3E_jwqq1JbwTZZckUtJmNZmqxY5M4egm-ryt4g3Ope_0EqHBrCDSEHmcy-goHRzWh-ZgguUoy1XKpyS1DNx8aV92vAkAM0zZOW6EZR4KS3W1DClQKhw=w800-no?authuser=0"},sidebar:"tutorialSidebar",previous:{title:"ChromeOS: Notes",permalink:"/moco/utilities/chromeos_note"},next:{title:"Xfce: macOS looks",permalink:"/moco/utilities/linux_xfce-macos-looks"}},c={},t=[{value:"First impression",id:"first-impression",level:2},{value:"Package Manager",id:"package-manager",level:2},{value:"Pamac",id:"pamac",level:3},{value:"AUR",id:"aur",level:4},{value:"Pacman",id:"pacman",level:3},{value:"Yay",id:"yay",level:3},{value:"Snap",id:"snap",level:3},{value:"Look and Feel",id:"look-and-feel",level:2},{value:"macOS BigSur Like",id:"macos-bigsur-like",level:2},{value:"See Also",id:"see-also",level:2}];function h(n){const e={a:"a",blockquote:"blockquote",br:"br",code:"code",em:"em",h1:"h1",h2:"h2",h3:"h3",h4:"h4",img:"img",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,s.a)(),...n.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(e.h1,{id:"manjaro-\u7cfb\u7d71\u5b89\u88dd\u7d00\u9304-2022may",children:"[Manjaro] \u7cfb\u7d71\u5b89\u88dd\u7d00\u9304 2022.May"}),"\n",(0,r.jsx)(e.p,{children:(0,r.jsxs)(e.strong,{children:["Updated: ",(0,r.jsx)(e.a,{href:"../../life/2022/11-07-bye-manjaro.md",children:"2022.11.07 \u66ab\u6642\u68c4\u7528 Manjaro"})]})}),"\n",(0,r.jsx)(e.p,{children:"\u56e0\u7de3\u969b\u6703\u5165\u624b ThinkPad T470, i7-7500u / 16G / 128+256 SSD / \u96d9\u96fb\u6c60\u7684\u898f\u683c,\n\u9375\u76e4\u624b\u611f, \u6574\u6a5f\u8cea\u611f... \u7b49, \u4ecd\u820a\u662f\u90a3\u719f\u6089\u7684 ThinkPad T \u7cfb\u5217\u8868\u73fe."}),"\n",(0,r.jsx)(e.p,{children:"\u539f\u672c\u5b89\u88dd\u4e86 Win 10 / macOS BigSur \u96d9\u7cfb\u7d71\u4f7f\u7528.\n\u4f46\u9ed1\u860b\u679c\u4e0b CPU \u8017\u96fb / \u559a\u9192 / LCD \u4eae\u5ea6\u8abf\u6574\u7b49\u4e00\u76f4\u6709\u554f\u984c, \u4e5f\u6c92\u592a\u591a\u6642\u9593\u9032\u4e00\u6b65\u6298\u9a30.\n\u5076\u7136\u6c7a\u5b9a\u8f49\u5f80 Win 10 / Linux \u96d9\u7cfb\u7d71\u4f7f\u7528. \u91cd\u6eab Linux Desktop, \u91cd\u65b0\u719f\u6089 Linux \u74b0\u5883\u4e0b\u7684\u5de5\u4f5c\u65e5\u5e38."}),"\n",(0,r.jsx)(e.p,{children:"\u8a31\u4e45\u6c92\u4f7f\u7528 Linux \u7576\u684c\u9762\u74b0\u5883,\n\u5728 Xubuntu 22.04 / elementary OS 6.1 / ... \u7b49\u5404\u7a2e LiveUSB \u5e7e\u756a\u6e2c\u8a66\u5f8c,\n\u6700\u7d42\u6c7a\u5b9a\u843d\u8173\u8a55\u50f9\u76f8\u7576\u4e0d\u932f\u7684 Manjaro."}),"\n",(0,r.jsx)(e.p,{children:(0,r.jsx)(e.img,{src:"https://lh3.googleusercontent.com/pw/AM-JKLWCIDA7C0whwtLICjA-S34CPQh8BAk35XzE4U7yy3-JgN-hC_aEMYdFSc6Z-x3reElOjdWF4E0C-ORdgwHVMrzKLyj_i08T0kYNaYTRGX82fXY9BPLlBCPsHinzNEX9MMO5DpP5EUIvYMZ-eJXRkVO1bQ=w800-no?authuser=0",alt:""})}),"\n",(0,r.jsx)(e.p,{children:"\u7db2\u8def\u4e0a\u6709\u8a31\u591a\u5404\u500b\u7cfb\u7d71\u7684\u4e3b\u5ba2\u89c0\u8a55\u50f9\u548c\u5206\u6790,\n\u4f7f\u7528 Manjaro \u4e3b\u8981\u56e0\u70ba\u4ed6\u662f\u57fa\u65bc Arch Linux \u884d\u7533\u767c\u5c55\u7684\u684c\u9762\u74b0\u5883.\n\u4e0d\u60f3\u518d\u4f7f\u7528 ubuntu \u7684\u5617\u9bae\u5fc3\u614b, \u52a0\u4e0a LiveUSB \u6642\u89ba\u5f97\u9806\u773c, \u76f8\u7576\u4e3b\u89c0\u5370\u8c61\u6240\u4f5c\u7684\u6c7a\u5b9a."}),"\n",(0,r.jsx)(e.h2,{id:"first-impression",children:"First impression"}),"\n",(0,r.jsx)(e.p,{children:"\u6709\u6bb5\u671f\u9593 ubuntu GNOME \u684c\u9762\u98a8\u683c\u6539\u4f86\u6539\u53bb,\n\u8cc7\u6e90\u8017\u7528\u591a\u4e5f\u4e0d\u597d\u770b, \u5be6\u7528\u7f8e\u89c0\u90fd\u672a\u4ee4\u4eba\u6eff\u610f.\n\u81ea\u5f9e\u63db\u4e86 xubuntu \u5f8c\u5c31\u611b\u4e0a\u4ed6\u7684\u8f15\u5de7. \u5be6\u7528\u4e4b\u9918, \u597d\u597d\u5ba2\u88fd\u8abf\u6574, \u4e5f\u633a\u8cde\u5fc3\u6085\u76ee\u7684."}),"\n",(0,r.jsxs)(e.p,{children:["\u9019\u56de\u7e7c\u7e8c\u9078\u7528 Manjaro Xfce \u7248, \u4f7f\u7528 Live USB \u5b89\u88dd\u5b8c\u7cfb\u7d71\u5f8c, \u719f\u6089\u7684\u754c\u9762\u56de\u4f86\u4e86.",(0,r.jsx)(e.br,{}),"\n\u800c\u5305\u542b\u986f\u5361 / Wifi / \u85cd\u82bd\u7b49\u7b46\u96fb\u7684\u4e3b\u8981\u786c\u9ad4\u8a2d\u5099\u90fd\u53ef\u4ee5\u6b63\u5e38\u5de5\u4f5c. \u5927\u5e45\u964d\u4f4e Linux \u7684\u5b78\u7fd2\u66f2\u7dda.\n\u81f3\u65bc\u6307\u7d0b\u8fa8\u8b58, \u8b80\u5361\u6a5f\u7b49\u56e0\u5c1a\u7121\u9700\u6c42, \u5c1a\u672a\u9032\u4e00\u6b65\u6e2c\u8a66."]}),"\n",(0,r.jsx)(e.p,{children:(0,r.jsx)(e.img,{src:"https://lh3.googleusercontent.com/pw/AM-JKLU6RW7IsT8PDr8j618y8gH-3egMOi53AUE-l8Rvbu9V5XHzDtBNbPsA9j63MgVMRWCaZ3GllYeidOuydk3A8wGf3osEZnrmRZYe0FExyBsnC3fvpS3llxsVBvsWBTnk0iYgeF5HIjFEvgYoH8GB3P212A=w800-no?authuser=0",alt:""})}),"\n",(0,r.jsx)(e.h2,{id:"package-manager",children:"Package Manager"}),"\n",(0,r.jsxs)(e.p,{children:["\u7b2c\u4e00\u6b21\u4f7f\u7528 Manjaro / Arch Linux \u7cfb\u7d71, \u5b89\u88dd\u8edf\u9ad4\u6642\u90fd\u5f97\u5148 Google \u4e00\u756a.\n\u5982: ",(0,r.jsx)(e.em,{children:"manjaro install chrome"}),", ",(0,r.jsx)(e.em,{children:"manjaro install dropbox"}),"... \u7b49."]}),"\n",(0,r.jsxs)(e.p,{children:["\u7db2\u8def\u4e0a\u56de\u7b54\u548c\u6559\u5b78\u5404\u6709\u4e0d\u540c, \u9032\u800c\u6162\u6162\u4e86\u89e3 Manjaro / Arch Linux \u5957\u4ef6\u7ba1\u7406.",(0,r.jsx)(e.br,{}),"\nManjaro \u4e0a\u6709\u5e7e\u7a2e\u4e0d\u540c\u7684\u5957\u4ef6\u7ba1\u7406\u65b9\u5f0f, \u5b98\u65b9\u8ad6\u58c7\u6709\u8457\u8a31\u591a\u8a0e\u8ad6:",(0,r.jsx)(e.br,{}),"\n",(0,r.jsx)(e.a,{href:"https://archived.forum.manjaro.org/t/pacman-vs-pamac-vs-yay/122495/2",children:"Pacman vs Pamac vs Yay - Newbie Corner - Manjaro Linux Forum"})]}),"\n",(0,r.jsxs)(e.blockquote,{children:["\n",(0,r.jsx)(e.p,{children:"They all install packages:"}),"\n",(0,r.jsxs)(e.p,{children:[(0,r.jsx)(e.strong,{children:"pamac"})," is Manjaro's package manager and it can install packages from the Manjaro repos or AUR",(0,r.jsx)(e.br,{}),"\n",(0,r.jsx)(e.strong,{children:"pacman"})," is the package manager from Arch. It can only install packages from the repos.",(0,r.jsx)(e.br,{}),"\n",(0,r.jsx)(e.strong,{children:"yay"})," is a wrapper that can install packages from the Manjaro repos or AUR."]}),"\n",(0,r.jsx)(e.p,{children:"Feel free to use whichever you prefer"}),"\n",(0,r.jsx)(e.p,{children:'EDIT: pamac also has a GUI version available pamac-manager which is in the menus as "Add/Remove Software"'}),"\n"]}),"\n",(0,r.jsx)(e.p,{children:"Manjaro \u4e26\u4e0d\u4f7f\u7528 Arch \u7684\u5957\u4ef6\u5eab, \u800c\u662f\u4f7f\u7528\u81ea\u884c\u7dad\u8b77\u7684\u8edf\u4ef6\u5eab.\n\u5b98\u65b9\u8868\u793a\u4ed6\u5011\u6703\u5c0d\u8edf\u9ad4\u9032\u884c\u8f03\u8a73\u7d30\u7684\u6e2c\u8a66\u5f8c\u624d\u4e0a\u67b6,\n\u597d\u8655\u662f\u7cfb\u7d71\u8f03\u70ba\u7a69\u5b9a\u6709\u4fdd\u969c, \u4f46\u7f3a\u9ede\u5247\u662f\u90e8\u4efd\u8edf\u9ad4\u66f4\u65b0\u6703\u8f03\u6162. (\u53ef\u900f\u904e AUR \u89e3\u6c7a, \u5982\u5f8c\u6558\u8ff0)"}),"\n",(0,r.jsx)(e.h3,{id:"pamac",children:"Pamac"}),"\n",(0,r.jsxs)(e.p,{children:[(0,r.jsx)(e.a,{href:"https://wiki.manjaro.org/index.php/Pamac",children:"Pamac (Add/Remove Software)"}),"\n\u662f Manjaro \u9810\u8a2d\u7684 Package Manager, \u6709 GUI \u754c\u9762.",(0,r.jsx)(e.br,{}),"\nManjaro Desktop \u5b89\u88dd\u5b8c\u6210\u5f8c, \u53ef\u5728 Application \u9078\u55ae\u4e0a\u627e\u5230."]}),"\n",(0,r.jsx)(e.p,{children:(0,r.jsx)(e.img,{src:"https://lh3.googleusercontent.com/pw/AM-JKLW7hPZ9Hjx3TMb2mo5O21FMrQ3-GDHI0YfAdwBcjcSr9XIkGswayNGGub1aY2JXnCDn1SWxvX9OKFSW1vpEr4X5qIa7vE7L8u65_RIs1mVcUR8rhzfA6Tw-zU6bdBIpBeItDDGS-RCWEuINuyzUFF0-xA=w800-no?authuser=0",alt:""})}),"\n",(0,r.jsxs)(e.p,{children:["pamac \u7684 GUI \u754c\u9762\u7c21\u5316\u4e86\u521d\u5b78\u8005\u5c0d Linux \u5957\u4ef6\u7ba1\u7406\u7684\u9580\u6abb, \u754c\u9762\u7c21\u55ae\u4f46\u529f\u80fd\u9f4a\u5168.",(0,r.jsx)(e.br,{}),"\n\u6e05\u6670\u5217\u51fa\u4e86\u5df2\u5b89\u88dd\u548c\u53ef\u66f4\u65b0\u7684\u5957\u4ef6 / \u5206\u985e\u641c\u5c0b / \u7c21\u4ecb\u548c\u76f8\u4f9d\u6027\u7b49\u7684\u8cc7\u8a0a, \u90fd\u76f8\u7576\u660e\u78ba\u5be6\u7528."]}),"\n",(0,r.jsx)(e.h4,{id:"aur",children:"AUR"}),"\n",(0,r.jsxs)(e.p,{children:[(0,r.jsx)(e.a,{href:"https://aur.archlinux.org/",children:(0,r.jsx)(e.strong,{children:"Arch User Repository (AUR)"})}),"\n\u662f Arch Linux \u793e\u7fa4\u7dad\u8b77\u7684\u5957\u4ef6\u5eab.\nAUR \u7531\u793e\u7fa4\u7d44\u7e54\u548c\u5206\u4eab\u65b0\u8edf\u9ad4, \u53ef\u4ee5\u8c50\u5bcc Arch Linux \u4e0a\u7684\u8edf\u9ad4\u8cc7\u6e90,\n\u85c9\u7531\u793e\u7fa4\u529b\u91cf, \u52a0\u901f\u4e3b\u6d41\u8edf\u9ad4\u9032\u5165\u5b98\u65b9\u5957\u4ef6\u5eab\u7684\u6642\u9593."]}),"\n",(0,r.jsxs)(e.p,{children:["AUR \u4e5f\u662f\u958b\u767c\u4eba\u54e1\u5728\u65b0\u8edf\u9ad4\u88ab\u7d0d\u5165 Arch \u5b98\u65b9\u5957\u4ef6\u4e4b\u524d, \u5411 Arch Limux \u63d0\u4f9b\u8edf\u9ad4\u7684\u9014\u5f91.\n",(0,r.jsx)(e.a,{href:"https://zhuanlan.zhihu.com/p/129855163",children:(0,r.jsx)(e.em,{children:"\u4ec0\u4e48\u662f Arch \u7528\u6237\u4ed3\u5e93\uff08AUR\uff09\u4ee5\u53ca\u5982\u4f55\u4f7f\u7528\uff1f | Linux \u4e2d\u56fd - \u77e5\u4e4e"})}),"\n\u9019\u7bc7\u6587\u7ae0\u4e2d\u6709\u5c0d AUR \u8f03\u9032\u968e\u8aaa\u660e."]}),"\n",(0,r.jsxs)(e.p,{children:["\u793e\u7fa4\u7dad\u8b77\u7684 AUR \u5b89\u5168\u98a8\u96aa\u76f8\u5c0d\u8f03\u9ad8. \u4e5f\u66fe\u767c\u751f\u88ab\u503c\u5165\u60e1\u610f\u7a0b\u5f0f\u4e8b\u4ef6:\n",(0,r.jsx)(e.a,{href:"https://www.ithome.com.tw/news/124481",children:"Arch Linux\u7684AUR\u5132\u5b58\u5eab\u90e8\u4efd\u5957\u4ef6\u7a0b\u5f0f\u78bc\u88ab\u52a0\u6599\uff0c\u52ff\u8f15\u5ffd\u793e\u7fa4\u7a0b\u5f0f\u78bc\u5132\u5b58\u5eab\u5b89\u5168\u98a8\u96aa | iThome"}),(0,r.jsx)(e.br,{}),"\n\u5b98\u65b9\u4e5f\u63d0\u9192\u4f7f\u7528\u8005\u4e0d\u8981\u592a\u76f8\u4fe1 AUR \u4e0a\u7684\u5167\u5bb9."]}),"\n",(0,r.jsxs)(e.p,{children:["Manjaro Linux \u9810\u8a2d\u4e26\u4e0d\u4f7f\u7528 AUR \u5957\u4ef6\u5eab, \u53ef\u5728 Pamac GUI \u4e0a\u555f\u7528:",(0,r.jsx)(e.br,{}),"\n",(0,r.jsx)(e.code,{children:"Perfreences > Third Party > Enable AUR"})]}),"\n",(0,r.jsx)(e.p,{children:(0,r.jsx)(e.img,{src:"https://lh3.googleusercontent.com/pw/AM-JKLU-EID0jSUZ0NO6JivrL_ytloDPc_CbS_7C8dYPqN_dl1j15ciwc3rEF_YfTWQqR5ViTmu7yyYUrVa1aDvD_TKcL4AaIQl0oZZCQsCgAaTpOPe0mLsyg8T2EorQAGgxfUImUgHnyLm7YH6uKeH_C7SJ-Q=w600-no?authuser=0",alt:""})}),"\n",(0,r.jsx)(e.h3,{id:"pacman",children:"Pacman"}),"\n",(0,r.jsxs)(e.p,{children:[(0,r.jsx)(e.a,{href:"https://wiki.manjaro.org/index.php/Pacman_Overview",children:"Pacman"}),"\n\u662f Arch Linux \u4e0a\u7684 package manager,",(0,r.jsx)(e.br,{}),"\nManjaro \u662f\u57fa\u65bc Arch Linux \u884d\u7533\u767c\u5c55\u800c\u4f86, \u5b98\u65b9\u5c0d Pacman \u8aaa\u660e\u5982\u4e0b:"]}),"\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"Pacman is already installed in Manjaro Linux by default"}),"\n",(0,r.jsx)(e.li,{children:"Pacman is mainly developed/maintained by Arch Linux developers"}),"\n",(0,r.jsx)(e.li,{children:"Pacman can only be used from the command line."}),"\n",(0,r.jsx)(e.li,{children:"Pacman can only use the official Manjaro repository.\nThere are separate articles available for accessing the Arch User Repository(AUR),\nusing flatpaks and using snaps"}),"\n"]}),"\n",(0,r.jsxs)(e.p,{children:["\u5b98\u65b9\u6587\u4ef6\u611f\u89ba\u8d77\u4f86, Manjaro \u4e0a\u96d6\u4fdd\u7559\u4e86 ",(0,r.jsx)(e.code,{children:"pacman"}),". \u4f46\u4e26\u4e0d\u7279\u5225\u5efa\u8b70\u4f7f\u7528."]}),"\n",(0,r.jsxs)(e.p,{children:["\u7136\u800c pacman \u4e0a\u6709\u4e9b pamac \u6240\u6c92\u6709\u7684\u9032\u968e\u529f\u80fd, \u5be6\u52d9\u4e0a\u5e38\u662f pacman / pamac \u6df7\u7528\u7684.",(0,r.jsx)(e.br,{}),"\n\u7db2\u8def\u4e0a\u8a31\u591a\u6587\u4ef6\u4e5f\u5e38\u53ef\u898b pacman \u548c pamac \u4ea4\u932f\u4f7f\u7528\u7684\u60c5\u6cc1."]}),"\n",(0,r.jsx)(e.h3,{id:"yay",children:"Yay"}),"\n",(0,r.jsxs)(e.p,{children:["Yay \u662f\u7528 Go \u5beb\u7684 AUR Helper.",(0,r.jsx)(e.br,{}),"\nAUR \u4e0a\u7684\u5957\u4ef6\u5305\u539f\u5247\u4e0a\u662f\u9700\u8981\u7de8\u8b6f\u5f8c\u5b89\u88dd\u7684,\nAUR Helper \u4e3b\u8981\u5354\u52a9 AUR \u5957\u4ef6\u4e0b\u8f09\u7de8\u8b6f\u5b89\u88dd\u6d41\u7a0b.\nYay \u53ea\u9700\u4e00\u500b\u547d\u4ee4\u5373\u53ef\u66f4\u8f15\u9b06\u5730\u5b89\u88dd, \u66f4\u65b0\u6216\u522a\u9664, \u70ba\u591a\u6578\u7528\u6236\u9a30\u51fa\u5728\u7cfb\u7d71\u4e0a\u82b1\u8cbb\u7684\u6642\u9593."]}),"\n",(0,r.jsx)(e.p,{children:"Manjaro \u9810\u8a2d\u4e26\u4e0d\u6703\u5b89\u88dd yay, \u9700\u624b\u52d5\u5b89\u88dd:"}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-shell",children:"sudo pacman -Syu\nsudo pacman -S yay\n"})}),"\n",(0,r.jsx)(e.h3,{id:"snap",children:"Snap"}),"\n",(0,r.jsxs)(e.p,{children:["Snap \u662f ",(0,r.jsx)(e.a,{href:"https://blog.longwin.com.tw/2016/07/ubuntu-linux-common-package-snap-2016/",children:"Ubuntu \u63a8\u7684\u901a\u7528 Linux \u5957\u4ef6\u683c\u5f0f"}),".\nSnap \u4e0d\u662f\u8981\u53d6\u4ee3\u539f\u672c\u7684\u5957\u4ef6\u7ba1\u7406\u7cfb\u7d71, \u4e3b\u8981\u662f\u7528\u4f86\u767c\u4f48\u7ba1\u7406\u7b2c\u4e09\u65b9\u5957\u4ef6 (\u4e0d\u7ba1\u6709\u6c92\u6709 Open Source)."]}),"\n",(0,r.jsxs)(e.p,{children:["Linux \u7cfb\u7d71\u662f\u5426\u8981\u652f\u63f4 Snap \u96d6\u6709\u722d\u8b70, \u5982 ",(0,r.jsx)(e.a,{href:"https://www.ithome.com.tw/news/138756",children:"Linux Mint\u6c7a\u5b9a\u4e0d\u652f\u63f4Ubuntu Snap"}),",",(0,r.jsx)(e.br,{}),"\n\u76ee\u524d\u53ef\u5728 Arch, Debian, Fedora, Ubuntu, ... \u7b49\u74b0\u5883\u4f7f\u7528."]}),"\n",(0,r.jsx)(e.p,{children:"Manjaro \u4e5f\u652f\u63f4 Snap \u683c\u5f0f, \u9700\u81ea\u884c\u5b89\u88dd\u76f8\u95dc\u5957\u4ef6\u7ba1\u7406\u7a0b\u5f0f:"}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-shell",children:"sudo pacman -S snapd\nsudo systemctl enable --now snapd.socket\nsudo ln -s /var/lib/snapd/snap /snap\nsudo snap install snap-store\n"})}),"\n",(0,r.jsxs)(e.p,{children:["Ref: ",(0,r.jsx)(e.a,{href:"https://snapcraft.io/install/snap-store/manjaro",children:"Install Snap Store on Manjaro Linux using the Snap Store | Snapcraft"})]}),"\n",(0,r.jsx)(e.h2,{id:"look-and-feel",children:"Look and Feel"}),"\n",(0,r.jsxs)(e.p,{children:['\u6211\u7684 T470 \u87a2\u5e55\u662f 14" FullHD, \u9810\u8a2d\u89e3\u6790\u5ea6\u6587\u5b57\u504f\u5c0f,\n\u5728 Windows 10 \u4e0b\u7e2e\u653e\u70ba 125% \u5f8c\u6bd4\u8f03\u6e05\u695a\u9806\u773c.\nXfce \u4e0b\u8abf\u6574\u7e2e\u653e\u7684\u8a2d\u5b9a\u53ef\u5f9e ',(0,r.jsx)(e.code,{children:"Setting > Apperance > Fonts"})," \u4e2d\u7684 DPI \u8abf\u6574."]}),"\n",(0,r.jsxs)(e.p,{children:["\u5b89\u88dd\u5b8c\u5f8c\u9810\u8a2d\u662f 96, \u5c0d\u6211\u4f86\u8aaa\u5b57\u9ad4\u592a\u5c0f\u4e86, \u8abf\u6574\u5230 128 \u5f8c\u6bd4\u8f03\u8212\u670d.\n",(0,r.jsx)(e.img,{src:"https://lh3.googleusercontent.com/pw/AM-JKLUAXnzZ8Uo1Cdfj2sVsg4qHcvlQLkjxYg75KlHUFs5FSr62i_-z2O-InoZyCcXfvk-5sBlFYrWwrjnuoGQzFyHWWNb2-qlEwaINwwNoucLUEo4XJaqrbo5BRHIiz5Q5RFA3n2MNUPmi5GkKr3rsPqfKHQ=w734-no?authuser=0",alt:""})]}),"\n",(0,r.jsx)(e.h2,{id:"macos-bigsur-like",children:"macOS BigSur Like"}),"\n",(0,r.jsxs)(e.p,{children:["\u525b\u5b89\u88dd\u5b8c\u7cfb\u7d71\u548c\u4e00\u4e9b\u5e38\u7528\u8edf\u9ad4\u5f8c, Youtube \u63a8\u85a6\u5f71\u7247\u4e0a\u8df3\u51fa ",(0,r.jsx)(e.a,{href:"https://www.youtube.com/watch?v=uvvoJU69uNo",children:"UPDATE : How to Customize Your Xfce Desktop Look Like macOS Big Sur | Version 2.0 - YouTube"}),"\n\u770b\u4f86\u7db2\u8def\u8db3\u8de1\u8ffd\u8e64\u771f\u7684\u7121\u6240\u4e0d\u5728."]}),"\n",(0,r.jsx)(e.p,{children:"\u4e0d\u904e macOS BigSur \u7cfb\u7d71\u6a23\u5f0f\u771f\u7684\u597d\u770b, \u4e5f\u9069\u5408\u9577\u671f\u4f7f\u7528 MacBook \u7684\u6211.\n\u8ddf\u8457\u5f71\u7247\u4e00\u6b65\u6b65\u8a2d\u5b9a\u5b89\u88dd, \u5957\u7528\u6559\u5b78\u4e2d\u7684\u4e3b\u984c:"}),"\n",(0,r.jsx)(e.p,{children:(0,r.jsx)(e.a,{href:"/moco/utilities/linux_xfce-macos-looks",children:"[Xfce] \u684c\u9762 macOS \u5316\u8a2d\u5b9a\u8a18\u9304"})}),"\n",(0,r.jsx)(e.h2,{id:"see-also",children:"See Also"}),"\n",(0,r.jsxs)(e.p,{children:["\u91cd\u56de Linux \u684c\u9762\u74b0\u5883, \u521d\u6b65\u611f\u89ba Linux \u5728\u684c\u9762\u4f7f\u7528\u4e0b\u5df2\u812b\u80ce\u63db\u9aa8.",(0,r.jsx)(e.br,{}),"\n\u5c0d Manjaro + xfce + BigSur theme \u76f8\u7576\u6eff\u610f.\n\u76ee\u524d\u9664\u4e86 Hotcorner \u548c screenshot \u5c1a\u627e\u4e0d\u5230\u5408\u7528\u8edf\u9ad4\u5916,\n\u5176\u9918\u548c\u81ea\u5df1\u5728 macOS \u4e0b\u7684\u4f7f\u7528\u5df2\u76f8\u53bb\u4e0d\u9060,\n\u7562\u7adf\u5e38\u7528\u7684\u5c31\u662f\u958b\u767c\u5de5\u5177, \u9019\u4e9b\u8edf\u9ad4\u5728\u5404\u5e73\u53f0\u90fd\u662f\u652f\u63f4\u7684."]}),"\n",(0,r.jsx)(e.p,{children:"\u672c\u6587\u5373\u662f Manjaro \u4e0b\u5b8c\u6210.\n\u4e5f\u8a31\u65e5\u5f8c\u6703\u6539\u8b8a\u5fc3\u610f, \u7b49\u65e5\u5e38\u4f7f\u7528\u4e00\u6bb5\u6642\u9593\u5f8c\u518d\u5beb\u7bc7\u5fc3\u5f97\u56de\u9867, \u4ee5\u53ca\u914d\u7f6e\u4e0a\u7684\u8abf\u6574\u5427."}),"\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsxs)(e.li,{children:["Manjaro user note\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(e.li,{children:["Desktop Theme / Tweak\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:(0,r.jsx)(e.a,{href:"https://linux265.com/news/6612.html",children:"\u6559\u4f60\u5982\u4f55\u5c06 Manjaro xfce \u7f8e\u5316\u7684\u50cf MacOS"})}),"\n",(0,r.jsx)(e.li,{children:(0,r.jsx)(e.a,{href:"https://blog.csdn.net/weixin_30599769/article/details/101364443",children:"Manjaro\u5b89\u88c5\u3001\u7f8e\u5316 - \u4e11\u5fc3\u75bc"})}),"\n"]}),"\n"]}),"\n"]})]})}function u(n={}){const{wrapper:e}={...(0,s.a)(),...n.components};return e?(0,r.jsx)(e,{...n,children:(0,r.jsx)(h,{...n})}):h(n)}},11151:(n,e,a)=>{a.d(e,{Z:()=>l,a:()=>o});var r=a(67294);const s={},i=r.createContext(s);function o(n){const e=r.useContext(i);return r.useMemo((function(){return"function"==typeof n?n(e):{...e,...n}}),[e,n])}function l(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(s):n.components||s:o(n.components),r.createElement(i.Provider,{value:e},n.children)}}}]);