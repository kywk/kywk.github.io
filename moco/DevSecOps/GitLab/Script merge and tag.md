---
title: "Case: Merge & Tag"
description: "CI/CD Case: Merge & Tag"
tags:
  - GitLab
  - CI/CD
hide_table_of_contents: true
date_created: 2023-08-10T00:00:00.000Z
date_updated: 2023-08-10T00:00:00.000Z
image: >-
  https://lh3.googleusercontent.com/pw/AL9nZEUA9Ifvd5Z8SXDWkeVB6AC4MPGwnXaL6kBXNPoXwOQQ2jOcZ1Jw_0p8TKK8C3ZX0e67_FOY15eDrm7aaXSQJcKtoUzC80SAQEHsaBy6qS2AqNNs5VUFNXBKm439y_1wkvmDl-PnL8ReojnIumNlEvOXBg=w800-no?authuser=0
slug: /devsecops/gitlab/script-merge-and-tag/
---

# [CI/CD] Merge & tag when released

## Summary

這是一個 GitLab CI/CD 自動化腳本，用於處理產品發布時的 merge 和 tag 操作。

### 主要功能

1. **創建 MR**: 從 `release/{version}` 分支向 `main` 分支創建 Merge Request
2. **檢查狀態**: 等待並驗證 MR 是否可以合併 (`can_be_merged`)
3. **執行合併**: 自動合併 MR 並刪除源分支
4. **創建標籤**: 在 `main` 分支上創建版本標籤
5. **回流開發**: 創建從 `main` 到 `develop` 的 MR

### 技術細節

- 使用 GitLab REST API 進行所有操作
- 需要 `CI_TOKEN` 環境變量進行認證
- 使用 `jq` 解析 JSON 響應
- 包含錯誤處理和失敗時的清理邏輯
- 60 秒等待時間確保 GitLab 完成狀態檢查

### 適用場景

適合 GitFlow 工作流程中的自動化發布流程，確保代碼從發布分支正確合併到主分支並同步回開發分支。

## Code

```bash
#!/bin/bash

which jq
if [ $? -ne 0 ]
then
    echo "jq not found" >&2
    exit $?
fi


## create MR to master

NEW_MR_DATA='{
    "source_branch": "release/'$RELEASE_VERSION'",
    "target_branch": "main",
    "title": "PROD Released"
}'

curl -k --request POST \
    --header "PRIVATE-TOKEN: ${CI_TOKEN}" \
    --header "Content-Type: application/json" \
    --data "$NEW_MR_DATA" \
    "${CI_GITLAB}/api/v4/projects/${CI_PROJECT_ID}/merge_requests" \
    -o mr.json

mr_iid=`jq '.["iid"]' mr.json`
if [[ "$mr_iid" = "null" ]]
then
    echo "create Merge Request fail: `jq '.["message"]' mr.json`"
    exit -1
fi


## checking merge status

echo "sleep 60sec for GitLab checking merge request..."
sleep 60

curl -k --request GET \
    --header "PRIVATE-TOKEN: ${CI_TOKEN}" \
    "${CI_GITLAB}/api/v4/projects/${CI_PROJECT_ID}/merge_requests/${mr_iid}" \
    -o mr.json

mr_status=`jq '.["merge_status"]' mr.json`
echo $mr_status
if [[ "$mr_status" != '"can_be_merged"' ]]
then
    echo "check merge_status fail: ${mr_status}"
    exit -1
fi


## approval MR for master

MERGE_DATA='{
    "merge_when_pipeline_succeeds": false,
    "should_remove_source_branch": true
}'

curl -k --request PUT \
    --header "PRIVATE-TOKEN: ${CI_TOKEN}" \
    "${CI_GITLAB}/api/v4/projects/${CI_PROJECT_ID}/merge_requests/${mr_iid}/merge" \
    -o mr_iid.json

merge_commit_sha=`jq '.["merge_commit_sha"]' mr_iid.json`
if [[ "$merge_commit_sha" = "null" ]]
then
    echo "merge to main/master fail: `jq '.["message"]' mr_iid.json`"

    CLOSE_MR_DATA='{
        "state_event": "close"
    }'
    curl -k --request PUT \
        --header "PRIVATE-TOKEN: ${CI_TOKEN}" \
        --header "Content-Type: application/json" \
        --data "$CLOSE_MR_DATA" \
        "${CI_GITLAB}/api/v4/projects/${CI_PROJECT_ID}/merge_requests/${mr_iid}"

    exit -1
fi


## tag version

curl -k --request POST \
    --header "PRIVATE-TOKEN: ${CI_TOKEN}" \
    "${CI_GITLAB}/api/v4/projects/${CI_PROJECT_ID}/repository/tags?tag_name=${RELEASE_VERSION}&ref=main" \
    -o tag.json

tag_name=`jq '.["name"]' tag.json`
if [[ "$merge_commit_sha" = "null" ]]
then
    echo "tag ${RELEASE_VERSION} fail: `jq '.["message"]' tag.json`"
    exit -1
fi


## create MR from master to develop

DEV_MR_DATA='{
    "source_branch": "main",
    "target_branch": "develop",
    "title": "PROD Released"
}'

curl -k --request POST \
    --header "PRIVATE-TOKEN: ${CI_TOKEN}" \
    --header "Content-Type: application/json" \
    --data "$DEV_MR_DATA" \
    "${CI_GITLAB}/api/v4/projects/${CI_PROJECT_ID}/merge_requests"

```

## Merge requests API

### [Merge status](https://docs.gitlab.com/ee/api/merge_requests.html#merge-status)

- checking
- can_be_merged
- cannot_be_merged

## See Also

- [Merge requests API | GitLab](https://docs.gitlab.com/ee/api/merge_requests.html)
