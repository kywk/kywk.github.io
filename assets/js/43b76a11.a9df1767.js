"use strict";(self.webpackChunkblog_kywk=self.webpackChunkblog_kywk||[]).push([[24528],{3905:(e,r,t)=>{t.d(r,{Zo:()=>s,kt:()=>d});var n=t(67294);function o(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function i(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,n)}return t}function c(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?i(Object(t),!0).forEach((function(r){o(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):i(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function l(e,r){if(null==e)return{};var t,n,o=function(e,r){if(null==e)return{};var t,n,o={},i=Object.keys(e);for(n=0;n<i.length;n++)t=i[n],r.indexOf(t)>=0||(o[t]=e[t]);return o}(e,r);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)t=i[n],r.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}var a=n.createContext({}),p=function(e){var r=n.useContext(a),t=r;return e&&(t="function"==typeof e?e(r):c(c({},r),e)),t},s=function(e){var r=p(e.components);return n.createElement(a.Provider,{value:r},e.children)},u={inlineCode:"code",wrapper:function(e){var r=e.children;return n.createElement(n.Fragment,{},r)}},b=n.forwardRef((function(e,r){var t=e.components,o=e.mdxType,i=e.originalType,a=e.parentName,s=l(e,["components","mdxType","originalType","parentName"]),b=p(t),d=o,m=b["".concat(a,".").concat(d)]||b[d]||u[d]||i;return t?n.createElement(m,c(c({ref:r},s),{},{components:t})):n.createElement(m,c({ref:r},s))}));function d(e,r){var t=arguments,o=r&&r.mdxType;if("string"==typeof e||o){var i=t.length,c=new Array(i);c[0]=b;var l={};for(var a in r)hasOwnProperty.call(r,a)&&(l[a]=r[a]);l.originalType=e,l.mdxType="string"==typeof e?e:o,c[1]=l;for(var p=2;p<i;p++)c[p]=t[p];return n.createElement.apply(null,c)}return n.createElement.apply(null,t)}b.displayName="MDXCreateElement"},3737:(e,r,t)=>{t.r(r),t.d(r,{assets:()=>a,contentTitle:()=>c,default:()=>u,frontMatter:()=>i,metadata:()=>l,toc:()=>p});var n=t(87462),o=(t(67294),t(3905));const i={title:"Rclone: Dropbox",description:"Rclone Dropbox",tags:["rclone","dropbox"],date:new Date("2022-09-21T16:00:00.000Z"),image:"https://i.imgur.com/mErPwqL.png"},c="[Rclone] Dropbox",l={unversionedId:"utilities/cli/rclone_dropbox",id:"utilities/cli/rclone_dropbox",title:"Rclone: Dropbox",description:"Rclone Dropbox",source:"@site/blogging/moco/utilities/cli/rclone_dropbox.md",sourceDirName:"utilities/cli",slug:"/utilities/cli/rclone_dropbox",permalink:"/moco/utilities/cli/rclone_dropbox",draft:!1,tags:[{label:"rclone",permalink:"/moco/tags/rclone"},{label:"dropbox",permalink:"/moco/tags/dropbox"}],version:"current",frontMatter:{title:"Rclone: Dropbox",description:"Rclone Dropbox",tags:["rclone","dropbox"],date:"2022-09-21T16:00:00.000Z",image:"https://i.imgur.com/mErPwqL.png"},sidebar:"tutorialSidebar",previous:{title:"./jq",permalink:"/moco/utilities/cli/jq_snippets"},next:{title:"Rclone: ignore",permalink:"/moco/utilities/cli/rclone_ignore"}},a={},p=[],s={toc:p};function u(e){let{components:r,...t}=e;return(0,o.kt)("wrapper",(0,n.Z)({},s,t,{components:r,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"rclone-dropbox"},"[Rclone]"," Dropbox"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},'## rclone sync\n##\nexport RCLONE_CONF=" --multi-thread-streams=25 --transfers=25 --checkers=25 --stats=10s --create-empty-src-dirs --progress --progress-terminal-title --delete-before "\n\n# export DBX_REMOTE=dropbox\n# export DBX_LOCAL=$KYWK_HOME\n\n# obsidian\n# alias pull-obs="rclone sync $DBX_REMOTE:/obsidian $KYWK_HOME/Obsidian --exclude-from=$KYWK_HOME/Obsidian/.rcloneignore $RCLONE_CONF"\n# alias push-obs="rclone sync $KYWK_HOME/obsidian $DBX_REMOTE:/obsidian --exclude-from=$KYWK_HOME/Obsidian/.rcloneignore $RCLONE_CONF"\n\n# wildcard\n# alias push-here="rclone sync . $DBX_REMOTE:Share/rclone  $RCLONE_CONF"\n')))}u.isMDXComponent=!0}}]);