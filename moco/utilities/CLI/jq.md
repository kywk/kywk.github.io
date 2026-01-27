---
title: jq
description: command-line JSON processor.
tags:
  - CLI
sidebar_position: 10
date_created: 2023-08-10
date_updated: 2023-08-10
image: https://lh3.googleusercontent.com/pw/AL9nZEUA9Ifvd5Z8SXDWkeVB6AC4MPGwnXaL6kBXNPoXwOQQ2jOcZ1Jw_0p8TKK8C3ZX0e67_FOY15eDrm7aaXSQJcKtoUzC80SAQEHsaBy6qS2AqNNs5VUFNXBKm439y_1wkvmDl-PnL8ReojnIumNlEvOXBg=w800-no?authuser=0
slug: /utilities/cli/jq/
---

# jq

> [jq](https://jqlang.github.io/jq/) is a lightweight and flexible command-line JSON processor.

強大的 JSON 處理工具，支援查詢、過濾、轉換 JSON 資料，是 API 開發和資料處理的必備工具。

## 基本語法

### 基礎查詢
```bash
# 美化輸出 JSON
echo '{"name":"John","age":30}' | jq .

# 取得特定欄位
echo '{"name":"John","age":30}' | jq '.name'
# 輸出: "John"

# 取得巢狀欄位
echo '{"user":{"name":"John","age":30}}' | jq '.user.name'
# 輸出: "John"
```

### 陣列操作
```bash
# 取得陣列第一個元素
echo '[{"name":"John"},{"name":"Jane"}]' | jq '.[0]'

# 取得所有 name 欄位
echo '[{"name":"John"},{"name":"Jane"}]' | jq '.[].name'

# 陣列長度
echo '[1,2,3,4,5]' | jq 'length'
```

## 進階功能

### 條件過濾
```bash
# 過濾年齡大於 25 的使用者
echo '[{"name":"John","age":30},{"name":"Jane","age":20}]' | jq '.[] | select(.age > 25)'

# 過濾包含特定字串的項目
echo '[{"name":"John"},{"name":"Jane"}]' | jq '.[] | select(.name | contains("Jo"))'
```

### 資料轉換
```bash
# 建立新的 JSON 物件
echo '{"firstName":"John","lastName":"Doe"}' | jq '{fullName: (.firstName + " " + .lastName)}'

# 陣列映射
echo '[1,2,3,4,5]' | jq 'map(. * 2)'

# 排序
echo '[{"name":"John","age":30},{"name":"Jane","age":20}]' | jq 'sort_by(.age)'
```

### 聚合操作
```bash
# 計算總和
echo '[1,2,3,4,5]' | jq 'add'

# 找最大值
echo '[{"age":30},{"age":20},{"age":35}]' | jq 'map(.age) | max'

# 分組
echo '[{"type":"A","value":1},{"type":"B","value":2},{"type":"A","value":3}]' | jq 'group_by(.type)'
```

## 實用範例

### API 資料處理
```bash
# 從 GitHub API 取得 repository 名稱
curl -s "https://api.github.com/users/octocat/repos" | jq '.[].name'

# 取得特定欄位並格式化
curl -s "https://api.github.com/users/octocat/repos" | jq '.[] | {name: .name, stars: .stargazers_count}'
```

### 設定檔處理
```bash
# 讀取 package.json 的依賴
cat package.json | jq '.dependencies'

# 更新 JSON 檔案中的值
jq '.version = "2.0.0"' package.json > package_new.json
```

### 日誌分析
```bash
# 過濾錯誤日誌
cat app.log | jq 'select(.level == "error")'

# 統計不同等級的日誌數量
cat app.log | jq -s 'group_by(.level) | map({level: .[0].level, count: length})'
```

## 常用選項

| 選項 | 說明 |
|------|------|
| `-r` | 原始輸出，不加引號 |
| `-c` | 緊湊輸出，不美化格式 |
| `-s` | 將多個 JSON 輸入合併為陣列 |
| `-e` | 設定退出狀態碼 |
| `--tab` | 使用 tab 縮排 |
| `-f file` | 從檔案讀取 jq 程式 |

## Bash Script 中的注意事項

在 BASH script 使用 jq 時的重要提醒：

```bash
# ❌ 錯誤：字串值會包含引號
VAR=$(echo '{"name":"John"}' | jq '.name')
echo $VAR  # 輸出: "John" (包含引號)

# ✅ 正確：使用 -r 選項去除引號
VAR=$(echo '{"name":"John"}' | jq -r '.name')
echo $VAR  # 輸出: John (不含引號)

# ❌ 注意：null 值會變成字串 "null"
VAR=$(echo '{}' | jq '.nonexistent')
echo $VAR  # 輸出: null (字串)

# ✅ 處理 null 值
VAR=$(echo '{}' | jq -r '.nonexistent // "default"')
echo $VAR  # 輸出: default
```

## 實用 Alias

```bash
# 美化 JSON
alias json='jq .'

# 取得 JSON 的所有 key
alias jkeys='jq -r "keys[]"'

# 壓縮 JSON
alias jmin='jq -c .'
```

## See Also

- [[Awesome CLI]] - 現代化 CLI 工具集合
- [jq 實戰教學 - MyApollo](https://myapollo.com.tw/blog/jq-by-example/)
- [jq : 命令列json處理工具 - Medium](https://medium.com/evan-fang/jq-%E5%91%BD%E4%BB%A4%E5%88%97json%E8%99%95%E7%90%86%E5%B7%A5%E5%85%B7-a553c8940ef5)
- [jq Manual](https://jqlang.github.io/jq/manual/)
