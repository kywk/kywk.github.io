"use strict";(self.webpackChunkkywk_me=self.webpackChunkkywk_me||[]).push([["46432"],{71323:function(e,n,t){t.r(n),t.d(n,{metadata:()=>r,contentTitle:()=>o,default:()=>d,assets:()=>c,toc:()=>l,frontMatter:()=>i});var r=JSON.parse('{"id":"devsecops/gitlab/Script merge and tag","title":"Case: Merge & Tag","description":"CI/CD Case: Merge & Tag","source":"@site/moco/devsecops/gitlab/Script merge and tag.md","sourceDirName":"devsecops/gitlab","slug":"/devsecops/gitlab/Script merge and tag","permalink":"/moco/devsecops/gitlab/Script merge and tag","draft":false,"unlisted":false,"tags":[{"inline":true,"label":"GitLab","permalink":"/moco/tags/git-lab"},{"inline":true,"label":"CI/CD","permalink":"/moco/tags/ci-cd"}],"version":"current","frontMatter":{"title":"Case: Merge & Tag","description":"CI/CD Case: Merge & Tag","tags":["GitLab","CI/CD"],"hide_table_of_contents":true,"date_created":"2023-08-10T00:00:00.000Z","date_updated":"2023-08-10T00:00:00.000Z","image":"https://lh3.googleusercontent.com/pw/AL9nZEUA9Ifvd5Z8SXDWkeVB6AC4MPGwnXaL6kBXNPoXwOQQ2jOcZ1Jw_0p8TKK8C3ZX0e67_FOY15eDrm7aaXSQJcKtoUzC80SAQEHsaBy6qS2AqNNs5VUFNXBKm439y_1wkvmDl-PnL8ReojnIumNlEvOXBg=w800-no?authuser=0"},"sidebar":"tutorialSidebar","previous":{"title":"GitLab","permalink":"/moco/category/gitlab"},"next":{"title":"SRE","permalink":"/moco/category/sre"}}'),a=t("85893"),s=t("50065");let i={title:"Case: Merge & Tag",description:"CI/CD Case: Merge & Tag",tags:["GitLab","CI/CD"],hide_table_of_contents:!0,date_created:new Date("2023-08-10T00:00:00.000Z"),date_updated:new Date("2023-08-10T00:00:00.000Z"),image:"https://lh3.googleusercontent.com/pw/AL9nZEUA9Ifvd5Z8SXDWkeVB6AC4MPGwnXaL6kBXNPoXwOQQ2jOcZ1Jw_0p8TKK8C3ZX0e67_FOY15eDrm7aaXSQJcKtoUzC80SAQEHsaBy6qS2AqNNs5VUFNXBKm439y_1wkvmDl-PnL8ReojnIumNlEvOXBg=w800-no?authuser=0"},o="[CI/CD] Merge & tag when released",c={},l=[{value:"Merge requests API",id:"merge-requests-api",level:2},{value:"Merge status",id:"merge-status",level:3},{value:"See Also",id:"see-also",level:2}];function m(e){let n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",pre:"pre",ul:"ul",...(0,s.a)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(n.header,{children:(0,a.jsx)(n.h1,{id:"cicd-merge--tag-when-released",children:"[CI/CD] Merge & tag when released"})}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-bash",children:'#!/bin/bash\n\nwhich jq\nif [ $? -ne 0 ] \nthen\n    echo "jq not found" >&2 \n    exit $?\nfi\n\n\n## create MR to master\n\nNEW_MR_DATA=\'{\n    "source_branch": "release/\'$RELEASE_VERSION\'",\n    "target_branch": "main",\n    "title": "PROD Released"\n}\'\n\ncurl -k --request POST \\\n    --header "PRIVATE-TOKEN: ${CI_TOKEN}" \\\n    --header "Content-Type: application/json" \\\n    --data "$NEW_MR_DATA" \\\n    "${CI_GITLAB}/api/v4/projects/${CI_PROJECT_ID}/merge_requests" \\\n    -o mr.json\n\nmr_iid=`jq \'.["iid"]\' mr.json`\nif [[ "$mr_iid" = "null" ]]\nthen\n    echo "create Merge Request fail: `jq \'.["message"]\' mr.json`" \n    exit -1\nfi\n\n\n## checking merge status\n\necho "sleep 60sec for GitLab checking merge request..."\nsleep 60\n\ncurl -k --request GET \\\n    --header "PRIVATE-TOKEN: ${CI_TOKEN}" \\\n    "${CI_GITLAB}/api/v4/projects/${CI_PROJECT_ID}/merge_requests/${mr_iid}" \\\n    -o mr.json\n\nmr_status=`jq \'.["merge_status"]\' mr.json`\necho $mr_status\nif [[ "$mr_status" != \'"can_be_merged"\' ]]\nthen\n    echo "check merge_status fail: ${mr_status}"\n    exit -1\nfi\n\n\n## approval MR for master\n\nMERGE_DATA=\'{\n    "merge_when_pipeline_succeeds": false,\n    "should_remove_source_branch": true\n}\'\n\ncurl -k --request PUT \\\n    --header "PRIVATE-TOKEN: ${CI_TOKEN}" \\\n    "${CI_GITLAB}/api/v4/projects/${CI_PROJECT_ID}/merge_requests/${mr_iid}/merge" \\\n    -o mr_iid.json\n\nmerge_commit_sha=`jq \'.["merge_commit_sha"]\' mr_iid.json`\nif [[ "$merge_commit_sha" = "null" ]]\nthen\n    echo "merge to main/master fail: `jq \'.["message"]\' mr_iid.json`" \n\n    CLOSE_MR_DATA=\'{\n        "state_event": "close"\n    }\'\n    curl -k --request PUT \\\n        --header "PRIVATE-TOKEN: ${CI_TOKEN}" \\\n        --header "Content-Type: application/json" \\\n        --data "$CLOSE_MR_DATA" \\\n        "${CI_GITLAB}/api/v4/projects/${CI_PROJECT_ID}/merge_requests/${mr_iid}" \n\n    exit -1\nfi\n\n\n## tag version\n\ncurl -k --request POST \\\n    --header "PRIVATE-TOKEN: ${CI_TOKEN}" \\\n    "${CI_GITLAB}/api/v4/projects/${CI_PROJECT_ID}/repository/tags?tag_name=${RELEASE_VERSION}&ref=main" \\\n    -o tag.json\n\ntag_name=`jq \'.["name"]\' tag.json`\nif [[ "$merge_commit_sha" = "null" ]]\nthen\n    echo "tag ${RELEASE_VERSION} fail: `jq \'.["message"]\' tag.json`" \n    exit -1\nfi\n\n\n## create MR from master to develop\n\nDEV_MR_DATA=\'{\n    "source_branch": "main",\n    "target_branch": "develop",\n    "title": "PROD Released"\n}\'\n\ncurl -k --request POST \\\n    --header "PRIVATE-TOKEN: ${CI_TOKEN}" \\\n    --header "Content-Type: application/json" \\\n    --data "$DEV_MR_DATA" \\\n    "${CI_GITLAB}/api/v4/projects/${CI_PROJECT_ID}/merge_requests"\n\n'})}),"\n",(0,a.jsx)(n.h2,{id:"merge-requests-api",children:"Merge requests API"}),"\n",(0,a.jsx)(n.h3,{id:"merge-status",children:(0,a.jsx)(n.a,{href:"https://docs.gitlab.com/ee/api/merge_requests.html#merge-status",children:"Merge status"})}),"\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsx)(n.li,{children:"checking"}),"\n",(0,a.jsx)(n.li,{children:"can_be_merged"}),"\n",(0,a.jsx)(n.li,{children:"cannot_be_merged"}),"\n"]}),"\n",(0,a.jsx)(n.h2,{id:"see-also",children:"See Also"}),"\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsx)(n.li,{children:(0,a.jsx)(n.a,{href:"https://docs.gitlab.com/ee/api/merge_requests.html",children:"Merge requests API | GitLab"})}),"\n"]})]})}function d(e={}){let{wrapper:n}={...(0,s.a)(),...e.components};return n?(0,a.jsx)(n,{...e,children:(0,a.jsx)(m,{...e})}):m(e)}},50065:function(e,n,t){t.d(n,{Z:function(){return o},a:function(){return i}});var r=t(67294);let a={},s=r.createContext(a);function i(e){let n=r.useContext(s);return r.useMemo(function(){return"function"==typeof e?e(n):{...n,...e}},[n,e])}function o(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:i(e.components),r.createElement(s.Provider,{value:n},e.children)}}}]);