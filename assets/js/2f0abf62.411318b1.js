"use strict";(self.webpackChunkblog_kywk=self.webpackChunkblog_kywk||[]).push([[95227],{31737:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>l,contentTitle:()=>r,default:()=>d,frontMatter:()=>o,metadata:()=>c,toc:()=>h});var i=s(85893),t=s(11151);const o={title:"SSH key & config",description:"SSH key & config",tags:["CLI","Git"],hide_table_of_contents:!0,created:new Date("2023-01-02T09:31:07.000Z"),image:"https://i.imgur.com/mErPwqL.png"},r="[SSH] .ssh/config & id_rsa",c={id:"utilities/cli/ssh_config",title:"SSH key & config",description:"SSH key & config",source:"@site/moco/utilities/cli/ssh_config.md",sourceDirName:"utilities/cli",slug:"/utilities/cli/ssh_config",permalink:"/moco/utilities/cli/ssh_config",draft:!1,unlisted:!1,tags:[{label:"CLI",permalink:"/moco/tags/cli"},{label:"Git",permalink:"/moco/tags/git"}],version:"current",frontMatter:{title:"SSH key & config",description:"SSH key & config",tags:["CLI","Git"],hide_table_of_contents:!0,created:"2023-01-02T09:31:07.000Z",image:"https://i.imgur.com/mErPwqL.png"},sidebar:"tutorialSidebar",previous:{title:"Rclone: ignore",permalink:"/moco/utilities/cli/rclone_ignore"},next:{title:"Tar \u52a0\u5bc6\u6253\u5305",permalink:"/moco/utilities/cli/tar_encript"}},l={},h=[{value:".ssh/config",id:"sshconfig",level:2},{value:"ssh key",id:"ssh-key",level:2},{value:"GitHub SSH key",id:"github-ssh-key",level:2},{value:"See Also",id:"see-also",level:2}];function a(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",li:"li",ol:"ol",p:"p",pre:"pre",ul:"ul",...(0,t.a)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.h1,{id:"ssh-sshconfig--id_rsa",children:"[SSH] .ssh/config & id_rsa"}),"\n",(0,i.jsx)(n.h2,{id:"sshconfig",children:".ssh/config"}),"\n",(0,i.jsx)(n.p,{children:"SSH config \u53ef\u4ee5\u7c21\u5316 SSH \u9023\u7dda\u6642\u7684\u6307\u4ee4, \u9664\u4e86 CLI \u4e0b\u4f7f\u7528\u65b9\u4fbf\u5916,\nCI/CD \u914d\u5408\u9069\u7576\u7684 config \u4e5f\u53ef\u4ee5\u5927\u5e45\u7c21\u5316\u7ba1\u7406\u7684\u8907\u96dc\u5ea6."}),"\n",(0,i.jsx)(n.p,{children:"SSH"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-ssh_config",children:"Host alias-name                          # \u7528\u4f86\u9023\u7dda\u7684 alias \u540d\u7a31\n    HostName server.name                 # host domain \u6216 ip\n    Port port-number                     # host \u7684 SSH port\n    IdentitiesOnly yes                   # \u4f7f\u7528\u6307\u5b9a\u7684 key\n    IdentityFile ~/.ssh/private_ssh_file # \u6307\u5b9a pem \u6216 pub \u7684 key \u8def\u5f91\n    User username-on-remote-machine      # (\u9078\u586b)\u767b\u5165 SSH \u7684 username\uff0c\n                                         #  \u53ea\u9023 git \u7684\u8a71\uff0c\u53ef\u4ee5\u4e0d\u5fc5\u8981\n    ForwardX11 yes                       # (\u9078\u586b) \u555f\u7528\u56de\u50b3 GUI \n"})}),"\n",(0,i.jsx)(n.p,{children:"\u8a2d\u5b9a\u597d\u5f8c, ssh \u6307\u4ee4\u53ef\u4ee5\u7531"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"ssh user@hostname.domain.name -P port -i path-to-key\n"})}),"\n",(0,i.jsx)(n.p,{children:"\u7c21\u5316\u70ba"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"ssh alias-name\n"})}),"\n",(0,i.jsx)(n.h2,{id:"ssh-key",children:"ssh key"}),"\n",(0,i.jsx)(n.p,{children:"...TBD..."}),"\n",(0,i.jsx)(n.h2,{id:"github-ssh-key",children:"GitHub SSH key"}),"\n",(0,i.jsx)(n.p,{children:"\u900f\u904e CLI \u5b58\u53d6\u500b\u4eba GitHub repository \u6642\u5e38\u6703\u8a2d\u5b9a SSH Keys.\n\u800c\u82e5\u8981\u7528\u5169\u500b\u4e0d\u540c\u4f7f\u7528\u8005\u8eab\u5206\u5b58\u53d6\u5c08\u6848, GitHub \u4e0d\u5141\u8a31\u4f7f\u7528\u540c\u4e00\u628a Key.\n\u5fc5\u9808\u70ba\u500b\u5225\u4f7f\u7528\u8005\u5efa\u7acb\u7368\u7acb ssh key \u4e26\u4e0a\u50b3\u8a2d\u5b9a."}),"\n",(0,i.jsx)(n.p,{children:"\u9019\u60c5\u6cc1\u4e0b, ssh alias \u5c31\u8b8a\u5f97\u65b9\u4fbf\u4e86."}),"\n",(0,i.jsxs)(n.ol,{children:["\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsx)(n.p,{children:"\u4f9d\u4f7f\u7528\u8005\u8eab\u5206\u8a2d\u5b9a\u5c0d\u61c9\u7684 SSH host alias \u8207 IdentityFile"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-.ssh/config",children:"Host kywk.github\n    Hostname ssh.github.com\n    User git\n\tIdentityFile ~/.ssh/kywk_rsa\n\nHost cow.github\n\tHostname ssh.github.com\n    User git\n\tIdentityFile ~/.ssh/cow_rsa\n"})}),"\n",(0,i.jsxs)(n.p,{children:["\u5982\u6b64\u4e00\u4f86, \u76f8\u540c\u4e3b\u6a5f\u900f\u904e\u4e0d\u540c alias \u53ef\u4ee5\u6307\u5b9a\u4e0d\u540c\u767b\u5165\u5e33\u865f\u53ca\u5c0d\u61c9\u7684 Key, \u4f7f\u7528\u4e0a\u76f8\u7576\u4fbf\u5229.\n\u5982: ",(0,i.jsx)(n.code,{children:"ssh kywk.github"})," \u5c31\u662f\u4f7f\u7528 kywk_rsa \u9019\u628a key \u4f86\u767b\u5165 ssh.github.com."]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsx)(n.p,{children:"\u4e0d\u540c\u7684 git repository \u4e2d, \u5c0d\u61c9\u7684 remote \u4fee\u6539\u70ba"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-.git/config",children:'[remote "origin"]\n\turl = git@kywk.github:kywk/kywk.github.io.git\n\tfetch = +refs/heads/*:refs/remotes/origin/*\n'})}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-.git/config",children:'[remote "origin"]\n\turl = git@cow.github:cow/sandbox.git\n\tfetch = +refs/heads/*:refs/remotes/origin/*\n'})}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.p,{children:"\u8a2d\u7f6e\u5b8c\u5f8c, \u76f8\u540c\u96fb\u8166\u5b58\u53d6\u4e0d\u540c Github \u5e33\u865f\u7684\u5c08\u6848, \u548c\u4e00\u822c\u64cd\u4f5c\u4e26\u7121\u592a\u4e0d\u540c."}),"\n",(0,i.jsx)(n.h2,{id:"see-also",children:"See Also"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"https://chusiang.gitbooks.io/working-on-gnu-linux/content/20.ssh_config.html",children:"\u589e\u9032 SSH \u4f7f\u7528\u6548\u7387 - ssh_config \xb7 \u5b8c\u5168\u7528 GNU/Linux \u5de5\u4f5c"})}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"https://medium.com/%E6%B5%A6%E5%B3%B6%E5%A4%AA%E9%83%8E%E7%9A%84%E6%B0%B4%E6%97%8F%E7%BC%B8/how-to-setup-ssh-config-%E4%BD%BF%E7%94%A8-ssh-%E8%A8%AD%E5%AE%9A%E6%AA%94-74ad46f99818",children:"How to setup SSH config \uff1a\u4f7f\u7528 SSH \u8a2d\u5b9a\u6a94\u7c21\u5316\u6307\u4ee4\u8207\u9023\u7dda\u7db2\u5740 | by awonwon | \u6d66\u5cf6\u592a\u90ce\u7684\u6c34\u65cf\u7f38 | Medium"})}),"\n"]})]})}function d(e={}){const{wrapper:n}={...(0,t.a)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(a,{...e})}):a(e)}},11151:(e,n,s)=>{s.d(n,{Z:()=>c,a:()=>r});var i=s(67294);const t={},o=i.createContext(t);function r(e){const n=i.useContext(o);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function c(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:r(e.components),i.createElement(o.Provider,{value:n},e.children)}}}]);