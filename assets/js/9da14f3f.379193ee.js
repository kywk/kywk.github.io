"use strict";(self.webpackChunkblog_kywk=self.webpackChunkblog_kywk||[]).push([[38852],{65033:(e,n,o)=>{o.r(n),o.d(n,{assets:()=>a,contentTitle:()=>s,default:()=>p,frontMatter:()=>r,metadata:()=>c,toc:()=>l});var i=o(85893),t=o(11151);const r={title:"NGINX: container tips",description:"NGINX: container tips",tags:["Infra","NGINX","Docker"],hide_table_of_contents:!0,date_created:new Date("2023-01-04T00:00:00.000Z"),date_updated:new Date("2023-01-04T00:00:00.000Z"),image:"https://lh3.googleusercontent.com/pw/AL9nZEUA9Ifvd5Z8SXDWkeVB6AC4MPGwnXaL6kBXNPoXwOQQ2jOcZ1Jw_0p8TKK8C3ZX0e67_FOY15eDrm7aaXSQJcKtoUzC80SAQEHsaBy6qS2AqNNs5VUFNXBKm439y_1wkvmDl-PnL8ReojnIumNlEvOXBg=w800-no?authuser=0"},s="[Nginx] Container Tips",c={id:"devsecops/infra/nginx_docker-tips",title:"NGINX: container tips",description:"NGINX: container tips",source:"@site/moco/devsecops/infra/nginx_docker-tips.md",sourceDirName:"devsecops/infra",slug:"/devsecops/infra/nginx_docker-tips",permalink:"/moco/devsecops/infra/nginx_docker-tips",draft:!1,unlisted:!1,tags:[{label:"Infra",permalink:"/moco/tags/infra"},{label:"NGINX",permalink:"/moco/tags/nginx"},{label:"Docker",permalink:"/moco/tags/docker"}],version:"current",frontMatter:{title:"NGINX: container tips",description:"NGINX: container tips",tags:["Infra","NGINX","Docker"],hide_table_of_contents:!0,date_created:"2023-01-04T00:00:00.000Z",date_updated:"2023-01-04T00:00:00.000Z",image:"https://lh3.googleusercontent.com/pw/AL9nZEUA9Ifvd5Z8SXDWkeVB6AC4MPGwnXaL6kBXNPoXwOQQ2jOcZ1Jw_0p8TKK8C3ZX0e67_FOY15eDrm7aaXSQJcKtoUzC80SAQEHsaBy6qS2AqNNs5VUFNXBKm439y_1wkvmDl-PnL8ReojnIumNlEvOXBg=w800-no?authuser=0"},sidebar:"tutorialSidebar",previous:{title:"Bash: snippets",permalink:"/moco/devsecops/infra/nexus-repository"},next:{title:"NGINX: Let's Encrypt SSL",permalink:"/moco/devsecops/infra/nginx_lets-encrypt-ssl"}},a={},l=[{value:"Config file",id:"config-file",level:2},{value:"Reload Nginx Inside Docker Container",id:"reload-nginx-inside-docker-container",level:3},{value:"Docker Compose",id:"docker-compose",level:2},{value:"See Also",id:"see-also",level:2}];function d(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",ol:"ol",p:"p",pre:"pre",ul:"ul",...(0,t.a)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.h1,{id:"nginx-container-tips",children:"[Nginx] Container Tips"}),"\n",(0,i.jsx)(n.h2,{id:"config-file",children:"Config file"}),"\n",(0,i.jsx)(n.p,{children:"mount nginx configuration files"}),"\n",(0,i.jsx)(n.h3,{id:"reload-nginx-inside-docker-container",children:"Reload Nginx Inside Docker Container"}),"\n",(0,i.jsxs)(n.ol,{children:["\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsx)(n.p,{children:"Find your container name\nUse docker ps to find your nginx container."}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:["Reload Nginx\nWith ",(0,i.jsx)(n.code,{children:"docker exec -it {container_name} {command}"})," you can directly access your container and execute commands. In my case the name of the container is nginx-server."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"$ docker exec -it nginx-server nginx -s reload\n2016/08/18 09:52:38 [notice] 19#19: signal process started\n$ docker exec -it nginx-server nginx -s reload\n2016/08/18 09:52:38 [notice] 19#19: signal process started\n"})}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.h2,{id:"docker-compose",children:"Docker Compose"}),"\n",(0,i.jsx)(n.h2,{id:"see-also",children:"See Also"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"https://hub.docker.com/_/nginx",children:"nginx - Official Image | Docker Hub"})}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"http://blog.tobiasforkel.de/en/2016/08/18/reload-nginx-inside-docker-container/",children:"Reload Nginx Inside Docker Container \u2013 Tobias Forkel \u2013 Blog \u2013 PHP / Magento Developer located in Melbourne, Australia"})}),"\n"]})]})}function p(e={}){const{wrapper:n}={...(0,t.a)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(d,{...e})}):d(e)}},11151:(e,n,o)=>{o.d(n,{Z:()=>c,a:()=>s});var i=o(67294);const t={},r=i.createContext(t);function s(e){const n=i.useContext(r);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function c(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:s(e.components),i.createElement(r.Provider,{value:n},e.children)}}}]);