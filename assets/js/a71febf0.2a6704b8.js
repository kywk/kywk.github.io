"use strict";(self.webpackChunkblog_kywk=self.webpackChunkblog_kywk||[]).push([[52234],{39773:(e,s,n)=>{n.r(s),n.d(s,{assets:()=>o,contentTitle:()=>l,default:()=>h,frontMatter:()=>t,metadata:()=>d,toc:()=>c});var r=n(85893),i=n(11151);const t={title:"Redis: Cluster \u5efa\u88fd",tags:["Infra","Redis"],created:new Date("2021-05-07T01:30:26.000Z"),image:"https://lh3.googleusercontent.com/pw/ACtC-3fIlrxgO6AX1o_tNuiD0YfrwpojgHUZa_OSpR36XoOZ_Ojz9q0Bw9yZ2V9QwSKUqApRMEIPWetv9AQd4TsfGgE0AaZXj7IJ2NV6ffvWj7N_Fjo2EzJ7BaCjZ7Fxx702zh6ZnykZAOChtRM-P1Zr9t0SYQ=w800-no?authuser=0"},l="[Redis] \u5efa\u88fd Redis Cluster",d={id:"devsecops/infra/redis_cluster",title:"Redis: Cluster \u5efa\u88fd",description:"Redis-Cluster \u70ba\u7121\u4e2d\u5fc3\u5316\u67b6\u69cb, \u6bcf\u500b\u7bc0\u9ede\u90fd\u6703\u5132\u5b58\u6578\u64da\u4ee5\u53ca\u6574\u500b\u53e2\u96c6\u72c0\u614b, \u6bcf\u500b\u7bc0\u9ede\u90fd\u6703\u548c\u5176\u4ed6\u7bc0\u9ede\u5efa\u7acb\u9023\u7dda.",source:"@site/moco/devsecops/infra/redis_cluster.md",sourceDirName:"devsecops/infra",slug:"/devsecops/infra/redis_cluster",permalink:"/moco/devsecops/infra/redis_cluster",draft:!1,unlisted:!1,tags:[{label:"Infra",permalink:"/moco/tags/infra"},{label:"Redis",permalink:"/moco/tags/redis"}],version:"current",frontMatter:{title:"Redis: Cluster \u5efa\u88fd",tags:["Infra","Redis"],created:"2021-05-07T01:30:26.000Z",image:"https://lh3.googleusercontent.com/pw/ACtC-3fIlrxgO6AX1o_tNuiD0YfrwpojgHUZa_OSpR36XoOZ_Ojz9q0Bw9yZ2V9QwSKUqApRMEIPWetv9AQd4TsfGgE0AaZXj7IJ2NV6ffvWj7N_Fjo2EzJ7BaCjZ7Fxx702zh6ZnykZAOChtRM-P1Zr9t0SYQ=w800-no?authuser=0"},sidebar:"tutorialSidebar",previous:{title:"NGINX: Snippets",permalink:"/moco/devsecops/infra/nginx_snippets"},next:{title:"Redis: \u8b66\u544a\u8207\u554f\u984c\u6392\u9664",permalink:"/moco/devsecops/infra/redis_troubleshooting"}},o={},c=[{value:"\u5b89\u88dd Redis",id:"\u5b89\u88dd-redis",level:2},{value:"\u6e96\u5099 config",id:"\u6e96\u5099-config",level:2},{value:"\u555f\u52d5",id:"\u555f\u52d5",level:2},{value:"\u52a0\u5165 cluster",id:"\u52a0\u5165-cluster",level:2},{value:"See Also",id:"see-also",level:2}];function a(e){const s={a:"a",blockquote:"blockquote",br:"br",code:"code",em:"em",h1:"h1",h2:"h2",img:"img",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,i.a)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(s.h1,{id:"redis-\u5efa\u88fd-redis-cluster",children:"[Redis] \u5efa\u88fd Redis Cluster"}),"\n",(0,r.jsx)(s.p,{children:"Redis-Cluster \u70ba\u7121\u4e2d\u5fc3\u5316\u67b6\u69cb, \u6bcf\u500b\u7bc0\u9ede\u90fd\u6703\u5132\u5b58\u6578\u64da\u4ee5\u53ca\u6574\u500b\u53e2\u96c6\u72c0\u614b, \u6bcf\u500b\u7bc0\u9ede\u90fd\u6703\u548c\u5176\u4ed6\u7bc0\u9ede\u5efa\u7acb\u9023\u7dda.\n\u4e00\u7d44 Redis Cluster \u7531\u591a\u500b\u7368\u7acb Redis \u7bc0\u9ede\u7d44\u6210,\n\u5b98\u65b9\u5efa\u8b70\u516d\u500b\u7bc0\u9ede, \u5176\u4e2d\u4e09\u500b\u70ba\u4e3b\u7bc0\u9ede (master) \u4e09\u500b\u70ba\u5f9e\u7bc0\u9ede (slave)."}),"\n",(0,r.jsx)(s.h2,{id:"\u5b89\u88dd-redis",children:"\u5b89\u88dd Redis"}),"\n",(0,r.jsxs)(s.p,{children:["\u7565. \u53ef\u900f\u904e\u4e0d\u540c\u7cfb\u7d71\u7684\u5957\u4ef6\u7ba1\u7406\u7a0b\u5f0f\u5b89\u88dd, \u6216\u53c3\u8003",(0,r.jsx)(s.a,{href:"https://redis.io/download",children:"\u5b98\u65b9\u6587\u4ef6"}),"\u4e0b\u8f09 source tar ball \u7de8\u8b6f\u5b89\u88dd."]}),"\n",(0,r.jsx)(s.pre,{children:(0,r.jsx)(s.code,{className:"language-shell",children:"$ wget https://download.redis.io/releases/redis-6.2.3.tar.gz\n$ tar xzf redis-6.2.3.tar.gz\n$ cd redis-6.2.3\n$ make\n"})}),"\n",(0,r.jsxs)(s.p,{children:["\u7de8\u8b6f\u5f8c\u57f7\u884c\u6a94\u5728 ",(0,r.jsx)(s.code,{children:"src/redis-server"}),", \u53ef\u8a66\u8457\u57f7\u884c\u958b\u555f redis \u670d\u52d9."]}),"\n",(0,r.jsx)(s.pre,{children:(0,r.jsx)(s.code,{className:"language-shell",children:"cow@sandbox:~/tmp/redis/src# ./redis-server\n25572:C 06 May 2021 07:58:52.254 # oO0OoO0OoO0Oo Redis is starting oO0OoO0OoO0Oo\n25572:C 06 May 2021 07:58:52.254 # Redis version=5.0.5, bits=64, commit=00000000, modified=0, pid=25572, just started\n25572:C 06 May 2021 07:58:52.254 # Warning: no config file specified, using the default config. In order to specify a config file use ./redis-server /path/to/redis.conf\n25572:M 06 May 2021 07:58:52.255 * Increased maximum number of open files to 10032 (it was originally set to 1024).\n                _._\n           _.-``__ ''-._\n      _.-``    `.  `_.  ''-._           Redis 5.0.5 (00000000/0) 64 bit\n  .-`` .-```.  ```\\/    _.,_ ''-._\n (    '      ,       .-`  | `,    )     Running in standalone mode\n |`-._`-...-` __...-.``-._|'` _.-'|     Port: 6379\n |    `-._   `._    /     _.-'    |     PID: 25572\n  `-._    `-._  `-./  _.-'    _.-'\n |`-._`-._    `-.__.-'    _.-'_.-'|\n |    `-._`-._        _.-'_.-'    |           http://redis.io\n  `-._    `-._`-.__.-'_.-'    _.-'\n |`-._`-._    `-.__.-'    _.-'_.-'|\n |    `-._`-._        _.-'_.-'    |\n  `-._    `-._`-.__.-'_.-'    _.-'\n      `-._    `-.__.-'    _.-'\n          `-._        _.-'\n              `-.__.-'\n\n25572:M 06 May 2021 07:58:52.255 # WARNING: The TCP backlog setting of 511 cannot be enforced because /proc/sys/net/core/somaxconn is set to the lower value of 128.\n25572:M 06 May 2021 07:58:52.255 # Server initialized\n25572:M 06 May 2021 07:58:52.255 # WARNING overcommit_memory is set to 0! Background save may fail under low memory condition. To fix this issue add 'vm.overcommit_memory = 1' to /etc/sysctl.conf and then reboot or run the command 'sysctl vm.overcommit_memory=1' for this to take effect.\n25572:M 06 May 2021 07:58:52.255 # WARNING you have Transparent Huge Pages (THP) support enabled in your kernel. This will create latency and memory usage issues with Redis. To fix this issue run the command 'echo never > /sys/kernel/mm/transparent_hugepage/enabled' as root, and add it to your /etc/rc.local in order to retain the setting after a reboot. Redis must be restarted after THP is disabled.\n25572:M 06 May 2021 07:58:52.255 * Ready to accept connections\n"})}),"\n",(0,r.jsxs)(s.p,{children:["\u51fa\u73fe ",(0,r.jsx)(s.strong,{children:"Ready to accept connections"})," \u5f8c\u8868\u793a Redis \u7a0b\u5f0f\u53ef\u6b63\u5e38\u904b\u4f5c,\n\u53ef\u518d\u4f9d\u9700\u8981\u628a\u57f7\u884c\u6a94\u8907\u88fd\u5230 `/usr/local/bin' \u4e4b\u985e\u7cfb\u7d71\u8cc7\u6599\u593e\u4e2d."]}),"\n",(0,r.jsxs)(s.p,{children:["\u800c\u8b66\u544a\u8a0a\u606f\u7684\u6392\u9664\u53ef\u53c3\u8003: ",(0,r.jsx)(s.a,{href:"/moco/devsecops/infra/redis_troubleshooting",children:"Redis \u8b66\u544a\u8a0a\u606f\u6392\u9664"})]}),"\n",(0,r.jsx)(s.h2,{id:"\u6e96\u5099-config",children:"\u6e96\u5099 config"}),"\n",(0,r.jsx)(s.p,{children:"\u5b98\u65b9\u5efa\u8b70\u4f7f\u7528\u516d\u500b node \u4f86\u5efa redis cluster,\n\u5be6\u969b\u696d\u52d9\u904b\u884c\u4e0a\u901a\u5e38\u70ba\u516d\u53f0\u7368\u7acb\u7684\u4e3b\u6a5f, \u4f7f\u7528\u540c\u4e00\u4efd config \u90e8\u7f72\u5230\u516d\u53f0\u4e3b\u6a5f\u5373\u53ef."}),"\n",(0,r.jsxs)(s.blockquote,{children:["\n",(0,r.jsx)(s.p,{children:"\u672c\u5730\u6e2c\u8a66\u5728\u540c\u4e00\u53f0\u4e3b\u6a5f\u4e0a\u8dd1\u516d\u500b\u4e0d\u540c redis-server instance, \u5206\u5225\u4f7f\u7528 Port: 7001 ~ 7006. \u56e0\u6b64\u9700\u6e96\u5099\u516d\u4efd config."}),"\n"]}),"\n",(0,r.jsx)(s.pre,{children:(0,r.jsx)(s.code,{className:"language-shell",children:"$ mkdir 7001 7002 7003 7004 7005 7006\n$ vi 7001/redis.config\n"})}),"\n",(0,r.jsx)(s.pre,{children:(0,r.jsx)(s.code,{className:"language-cfg",children:"port 7001\ncluster-enabled yes\ncluster-config-file nodes_7001.conf\ncluster-node-timeout 5000\nappendonly yes\ndaemonize yes\nbind x.x.x.x\nrequirepass password\nmasterauth password\n"})}),"\n",(0,r.jsx)(s.p,{children:"\u57fa\u672c\u9700\u8981\u7684\u8a2d\u7f6e\u5167\u5bb9\u8207\u7c21\u55ae\u8aaa\u660e\u5982\u4e0b:"}),"\n",(0,r.jsxs)(s.ul,{children:["\n",(0,r.jsxs)(s.li,{children:[(0,r.jsx)(s.strong,{children:"port"})," ",(0,r.jsx)(s.em,{children:"7001"}),(0,r.jsx)(s.br,{}),"\n","Redis-Server instance \u6240\u670d\u52d9\u7684 port, \u76f8\u540c\u4e3b\u6a5f\u7684\u8a71\u9700\u932f\u958b."]}),"\n",(0,r.jsxs)(s.li,{children:[(0,r.jsx)(s.strong,{children:"cluster-enabled"})," ",(0,r.jsx)(s.em,{children:"yes"}),(0,r.jsx)(s.br,{}),"\n","\u555f\u7528 redis cluster"]}),"\n",(0,r.jsxs)(s.li,{children:[(0,r.jsx)(s.strong,{children:"cluster-config-file"})," ",(0,r.jsx)(s.em,{children:"nodes_7001.conf"}),(0,r.jsx)(s.br,{}),"\n","\u6bcf\u500b node \u9700\u8981\u7368\u7acb\u7684 cluster \u8a2d\u5b9a\u6a94.\n\u50c5\u9700\u6307\u5b9a\u6a94\u540d, \u7121\u9808\u8a2d\u5b9a\u6a94\u6848\u5167\u5bb9.\nredis-cluster \u904b\u4f5c\u6642\u6703\u81ea\u884c\u7dad\u8b77\u8207\u4fee\u6539\u8a72\u6a94\u6848\u5167\u5bb9."]}),"\n",(0,r.jsxs)(s.li,{children:[(0,r.jsx)(s.strong,{children:"cluster-node-timeout"})," ",(0,r.jsx)(s.em,{children:"5000"}),(0,r.jsx)(s.br,{}),"\n","node \u5224\u65b7\u5931\u6548\u7684\u6642\u9593"]}),"\n",(0,r.jsxs)(s.li,{children:[(0,r.jsx)(s.strong,{children:"appendonly"})," ",(0,r.jsx)(s.em,{children:"yes"}),(0,r.jsx)(s.br,{}),"\n","\u555f\u7528 aof"]}),"\n"]}),"\n",(0,r.jsx)(s.p,{children:"\u8a2d\u5b9a\u6a94\u6709\u4e0a\u8ff0\u5167\u5bb9, \u57fa\u672c\u4e0a\u5c31\u53ef\u4ee5\u57f7\u884c\u4e00\u500b redis-cluster node \u4e86.\n\u800c\u4e00\u4e9b\u5e38\u898b\u7684\u984d\u5916\u8a2d\u5b9a\u5982\u4e0b:"}),"\n",(0,r.jsxs)(s.ul,{children:["\n",(0,r.jsxs)(s.li,{children:[(0,r.jsx)(s.strong,{children:"daemonize"})," ",(0,r.jsx)(s.em,{children:"yes"}),(0,r.jsx)(s.br,{}),"\n","\u80cc\u666f\u57f7\u884c"]}),"\n",(0,r.jsxs)(s.li,{children:[(0,r.jsx)(s.strong,{children:"bind"})," ",(0,r.jsx)(s.em,{children:"x.x.x.x"}),(0,r.jsx)(s.br,{}),"\n","\u5141\u8a31 listen \u7279\u5b9a ip \u7684\u9023\u7dda"]}),"\n",(0,r.jsxs)(s.li,{children:[(0,r.jsx)(s.strong,{children:"requirepass"})," ",(0,r.jsx)(s.em,{children:"password"}),(0,r.jsx)(s.br,{}),"\n","\u5bc6\u78bc\u8a2d\u5b9a"]}),"\n",(0,r.jsxs)(s.li,{children:[(0,r.jsx)(s.strong,{children:"masterauth"})," ",(0,r.jsx)(s.em,{children:"password"}),(0,r.jsx)(s.br,{}),"\n","\u5f9e master \u7684\u5bc6\u78bc"]}),"\n"]}),"\n",(0,r.jsx)(s.p,{children:(0,r.jsx)(s.img,{src:"https://lh3.googleusercontent.com/pw/ACtC-3cIjjFhS63ywfyKTBTR55SdYX1NTTwgKzdEjZ9LqEuyrjRM2yUSQ7nWOw_zki8AQLXzLJLjRuseunT-LcW5QTEt6Jg7D18Gf3S5B8yGy_ittXXp19pD8FCj33nBdo-pZbKl2BkLTPK0rzOo5ntxgCUoFQ=w502no?authuser=0",alt:""})}),"\n",(0,r.jsx)(s.h2,{id:"\u555f\u52d5",children:"\u555f\u52d5"}),"\n",(0,r.jsxs)(s.p,{children:["\u900f\u904e ",(0,r.jsx)(s.code,{children:"redis-server"})," \u642d\u914d\u5404\u500b\u8a2d\u5b9a\u6a94, \u9010\u4e00\u555f\u52d5\u4e0d\u540c\u7684 redis-server instance"]}),"\n",(0,r.jsx)(s.pre,{children:(0,r.jsx)(s.code,{className:"language-shell",children:"$ redis-server 7001/redif.conf\n$ redis-server 7002/redif.conf\n$ redis-server 7003/redif.conf\n$ redis-server 7004/redif.conf\n$ redis-server 7005/redif.conf\n$ redis-server 7006/redif.conf\n"})}),"\n",(0,r.jsx)(s.h2,{id:"\u52a0\u5165-cluster",children:"\u52a0\u5165 cluster"}),"\n",(0,r.jsx)(s.p,{children:"\u53ea\u662f\u628a\u5404\u500b redis-server instance \u8dd1\u8d77\u4f86, \u5f7c\u6b64\u5c1a\u4e0d\u662f cluster \u88e1\u9762\u7684 node,\n\u9700\u4e0b\u6307\u4ee4\u5efa\u7406 cluster."}),"\n",(0,r.jsx)(s.pre,{children:(0,r.jsx)(s.code,{className:"language-shell",children:"$ redis-cli --cluster create 127.0.0.1:7001 127.0.0.1:7002 127.0.0.1:7003 127.0.0.1:7004 127.0.0.1:7005 127.0.0.1:7006 --cluster-replicas 1\n"})}),"\n",(0,r.jsxs)(s.ul,{children:["\n",(0,r.jsxs)(s.li,{children:[(0,r.jsx)(s.strong,{children:"redis-cli"}),(0,r.jsx)(s.br,{}),"\n","redis CLI \u63a7\u5236\u7a0b\u5f0f, \u9664\u4e86\u96c6\u6210\u4e00\u4e9b\u63a7\u5236\u9805\u76ee\u5916, \u4e5f\u662f\u500b\u5b8c\u6574\u7684 redis-client."]}),"\n",(0,r.jsxs)(s.li,{children:[(0,r.jsx)(s.strong,{children:"--cluster create"})," ",(0,r.jsxs)(s.em,{children:["x.x.x.x",":port1"," ... x.x.x.x:port6"]}),(0,r.jsx)(s.br,{}),"\n","\u5229\u7528\u9019\u4e9b redis-server instance \u5efa\u7acb redis-cluster."]}),"\n",(0,r.jsxs)(s.li,{children:[(0,r.jsx)(s.strong,{children:"--cluster-replicas"})," ",(0,r.jsx)(s.em,{children:"1"}),(0,r.jsx)(s.br,{}),"\n","\u4e00\u500b master \u7bc0\u9ede\u642d\u914d\u4e00\u500b slave \u7bc0\u9ede.",(0,r.jsx)(s.br,{}),"\n","\u56e0\u4e0a\u8ff0\u6307\u4ee4\u5171\u6709\u516d\u500b\u7bc0\u9ede, \u6240\u4ee5\u6703\u5efa\u69cb\u51fa\u4e09\u500b master \u7bc0\u9ede\u642d\u914d\u4e09\u500b slave \u7bc0\u9ede."]}),"\n"]}),"\n",(0,r.jsx)(s.h2,{id:"see-also",children:"See Also"}),"\n",(0,r.jsxs)(s.p,{children:["\u4ee5\u4e0a\u662f\u6700\u5e38\u898b\u7684 Redis Cluster \u5efa\u88fd\u65b9\u6cd5, \u4e5f\u662f\u5b98\u65b9\u5efa\u8b70\u7684\u65b9\u6848.\n\u95dc\u65bc Redis Cluster \u9032\u4e00\u6b65\u8cc7\u8a0a, ",(0,r.jsx)(s.a,{href:"https://www.796t.com/article.php?id=192567",children:"Redis\u521d\u6b65\u5b78\u7fd2\u6574\u7406\u2014\u2014\u7b2c\u4e94\u7bc0Cluster\u53e2\u96c6\u90e8\u7f72\u3001\u4e3b\u5f9e\u8907\u88fd\u3001\u54e8\u5175\u6a21\u5f0f_\u8cc7\u6599\u5eab_\u7a0b\u5f0f\u4eba\u751f"}),"\n\u662f\u500b\u76f8\u7576\u4e0d\u932f\u7684\u6587\u7ae0, \u503c\u5f97\u4e00\u8b80."]}),"\n",(0,r.jsx)(s.p,{children:"\u5176\u4ed6\u53c3\u8003\u8cc7\u6599\u9673\u5217\u65bc\u4e0b:"}),"\n",(0,r.jsxs)(s.ul,{children:["\n",(0,r.jsx)(s.li,{children:(0,r.jsx)(s.a,{href:"https://redis.io/topics/cluster-tutorial",children:"Redis cluster tutorial \u2013 Redis"})}),"\n",(0,r.jsx)(s.li,{children:(0,r.jsx)(s.a,{href:"https://tw511.com/a/01/6479.html",children:"Centos 7 \u90e8\u7f72Redis \u4e09\u4e3b\u4e09\u5f9e\u53e2\u96c6 - tw511\u6559\u5b78\u7db2"})}),"\n",(0,r.jsx)(s.li,{children:(0,r.jsx)(s.a,{href:"https://blog.yowko.com/create-redis-cluster/",children:"\u5efa\u7acb Redis Cluster (Redis 5) - Yowko's Notes"})}),"\n",(0,r.jsx)(s.li,{children:(0,r.jsx)(s.a,{href:"https://medium.com/@zihansyu/redis-%E9%9B%86%E7%BE%A4%E6%9E%B6%E8%A8%AD-ff641c97232c",children:"Redis \u96c6\u7fa4\u67b6\u8a2d. \u524d\u8a00 | by \u5f90\u5b50\u51fd | Medium"})}),"\n"]})]})}function h(e={}){const{wrapper:s}={...(0,i.a)(),...e.components};return s?(0,r.jsx)(s,{...e,children:(0,r.jsx)(a,{...e})}):a(e)}},11151:(e,s,n)=>{n.d(s,{Z:()=>d,a:()=>l});var r=n(67294);const i={},t=r.createContext(i);function l(e){const s=r.useContext(t);return r.useMemo((function(){return"function"==typeof e?e(s):{...s,...e}}),[s,e])}function d(e){let s;return s=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:l(e.components),r.createElement(t.Provider,{value:s},e.children)}}}]);