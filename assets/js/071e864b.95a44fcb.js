"use strict";(self.webpackChunkkywk_github_io=self.webpackChunkkywk_github_io||[]).push([[41924],{24038:(e,o,n)=>{n.r(o),n.d(o,{assets:()=>l,contentTitle:()=>c,default:()=>d,frontMatter:()=>r,metadata:()=>s,toc:()=>a});var t=n(85893),i=n(11151);const r={title:"Rclone: Dropbox",description:"Rclone Dropbox",tags:["Utility/Rclone","Dropbox"],date:new Date("2022-09-21T16:00:00.000Z"),image:"https://i.imgur.com/mErPwqL.png"},c="[Rclone] Dropbox",s={id:"utilities/cli/rclone_dropbox",title:"Rclone: Dropbox",description:"Rclone Dropbox",source:"@site/moco/utilities/cli/rclone_dropbox.md",sourceDirName:"utilities/cli",slug:"/utilities/cli/rclone_dropbox",permalink:"/moco/utilities/cli/rclone_dropbox",draft:!1,unlisted:!1,tags:[{label:"Utility/Rclone",permalink:"/moco/tags/utility-rclone"},{label:"Dropbox",permalink:"/moco/tags/dropbox"}],version:"current",frontMatter:{title:"Rclone: Dropbox",description:"Rclone Dropbox",tags:["Utility/Rclone","Dropbox"],date:"2022-09-21T16:00:00.000Z",image:"https://i.imgur.com/mErPwqL.png"},sidebar:"tutorialSidebar",previous:{title:"./jq",permalink:"/moco/utilities/cli/jq_snippets"},next:{title:"Rclone: ignore",permalink:"/moco/utilities/cli/rclone_ignore"}},l={},a=[];function p(e){const o={code:"code",h1:"h1",pre:"pre",...(0,i.a)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(o.h1,{id:"rclone-dropbox",children:"[Rclone] Dropbox"}),"\n",(0,t.jsx)(o.pre,{children:(0,t.jsx)(o.code,{children:'## rclone sync\n##\nexport RCLONE_CONF=" --multi-thread-streams=25 --transfers=25 --checkers=25 --stats=10s --create-empty-src-dirs --progress --progress-terminal-title --delete-before "\n\n# export DBX_REMOTE=dropbox\n# export DBX_LOCAL=$KYWK_HOME\n\n# obsidian\n# alias pull-obs="rclone sync $DBX_REMOTE:/obsidian $KYWK_HOME/Obsidian --exclude-from=$KYWK_HOME/Obsidian/.rcloneignore $RCLONE_CONF"\n# alias push-obs="rclone sync $KYWK_HOME/obsidian $DBX_REMOTE:/obsidian --exclude-from=$KYWK_HOME/Obsidian/.rcloneignore $RCLONE_CONF"\n\n# wildcard\n# alias push-here="rclone sync . $DBX_REMOTE:Share/rclone  $RCLONE_CONF"\n'})})]})}function d(e={}){const{wrapper:o}={...(0,i.a)(),...e.components};return o?(0,t.jsx)(o,{...e,children:(0,t.jsx)(p,{...e})}):p(e)}},11151:(e,o,n)=>{n.d(o,{Z:()=>s,a:()=>c});var t=n(67294);const i={},r=t.createContext(i);function c(e){const o=t.useContext(r);return t.useMemo((function(){return"function"==typeof e?e(o):{...o,...e}}),[o,e])}function s(e){let o;return o=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:c(e.components),t.createElement(r.Provider,{value:o},e.children)}}}]);