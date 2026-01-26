---
title: Tricks and Tips
description: Trick and Tips for VSCode
tags:
  - VSCode
  - Tips
date_created: 2023-01-24T00:00:00.000Z
date_updated: 2023-01-24T00:00:00.000Z
image: >-
  https://lh3.googleusercontent.com/pw/AL9nZEUA9Ifvd5Z8SXDWkeVB6AC4MPGwnXaL6kBXNPoXwOQQ2jOcZ1Jw_0p8TKK8C3ZX0e67_FOY15eDrm7aaXSQJcKtoUzC80SAQEHsaBy6qS2AqNNs5VUFNXBKm439y_1wkvmDl-PnL8ReojnIumNlEvOXBg=w800-no?authuser=0
slug: /utilities/vscode/vscode-tricks-and-tips/
---

# VSCode 使用技巧與秘訣

Visual Studio Code 的實用技巧、快捷鍵和設定最佳化，提升程式開發效率和使用體驗。

## 基本設定

### 文字顯示設定

```json
{
  // 自動換行
  "editor.wordWrap": "on",

  // 顯示空白字元
  "editor.renderWhitespace": "boundary",

  // 顯示行號
  "editor.lineNumbers": "on",

  // 顯示縮排參考線
  "editor.renderIndentGuides": true,

  // 字體大小
  "editor.fontSize": 14,

  // 行高
  "editor.lineHeight": 1.5
}
```

### 編輯增強

```json
{
  // 自動儲存
  "files.autoSave": "afterDelay",
  "files.autoSaveDelay": 1000,

  // 格式化設定
  "editor.formatOnSave": true,
  "editor.formatOnPaste": true,

  // 自動修復
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
    "source.organizeImports": true
  },

  // Tab 設定
  "editor.tabSize": 2,
  "editor.insertSpaces": true,
  "editor.detectIndentation": true
}
```

## 快捷鍵大全

### 文件操作

| 快捷鍵         | 功能               | 備註 |
| -------------- | ------------------ | ---- |
| `Ctrl+N`       | 新建文件           |      |
| `Ctrl+O`       | 開啟文件           |      |
| `Ctrl+S`       | 儲存文件           |      |
| `Ctrl+Shift+S` | 另存新檔           |      |
| `Ctrl+W`       | 關閉當前標籤       |      |
| `Ctrl+Shift+T` | 重新開啟關閉的標籤 |      |
| `Ctrl+Tab`     | 在標籤間切換       |      |
| `Ctrl+P`       | 快速開啟檔案       |      |

### 編輯操作

| 快捷鍵            | 功能              | 備註 |
| ----------------- | ----------------- | ---- |
| `Ctrl+Z`          | 復原              |      |
| `Ctrl+Y`          | 重做              |      |
| `Ctrl+X`          | 剪下              |      |
| `Ctrl+C`          | 複製              |      |
| `Ctrl+V`          | 貼上              |      |
| `Ctrl+A`          | 全選              |      |
| `Ctrl+F`          | 尋找              |      |
| `Ctrl+H`          | 取代              |      |
| `F3` / `Shift+F3` | 尋找下一個/上一個 |      |

### 選取與游標

| 快捷鍵         | 功能              | 備註           |
| -------------- | ----------------- | -------------- |
| `Ctrl+L`       | 選取整行          |                |
| `Ctrl+D`       | 選取相同內容      | 多次按下可多選 |
| `Ctrl+Shift+L` | 選取所有相同內容  |                |
| `Alt+Click`    | 多游標選取        |                |
| `Ctrl+Alt+↑/↓` | 在上/下行新增游標 |                |
| `Shift+Alt+→`  | 擴展選取          |                |
| `Shift+Alt+←`  | 縮小選取          |                |

### 行操作

| 快捷鍵              | 功能           | 備註 |
| ------------------- | -------------- | ---- |
| `Ctrl+Shift+K`      | 刪除整行       |      |
| `Ctrl+Enter`        | 在下方插入新行 |      |
| `Ctrl+Shift+Enter`  | 在上方插入新行 |      |
| `Alt+↑/↓`           | 移動行         |      |
| `Shift+Alt+↑/↓`     | 複製行         |      |
| `Ctrl+]` / `Ctrl+[` | 縮排/取消縮排  |      |

### 顯示與導航

| 快捷鍵         | 功能         | 備註 |
| -------------- | ------------ | ---- |
| `Ctrl+Shift+E` | 顯示檔案總管 |      |
| `Ctrl+Shift+F` | 顯示搜尋     |      |
| `Ctrl+Shift+G` | 顯示 Git     |      |
| `Ctrl+Shift+D` | 顯示除錯     |      |
| `Ctrl+Shift+X` | 顯示擴充套件 |      |
| `Ctrl+Shift+P` | 命令面板     |      |
| `Ctrl+Shift+M` | 問題面板     |      |
| `Ctrl+``       | 終端機       |      |

## 進階技巧

### 多游標編輯

```javascript
// 同時編輯多個相同的變數名稱
1. 選取變數名稱
2. 按 Ctrl+D 選取下一個相同的
3. 繼續按 Ctrl+D 選取更多
4. 開始編輯，所有選取的內容會同時變更
```

### 程式碼折疊

```json
{
  // 自動折疊設定
  "editor.foldingStrategy": "auto",
  "editor.showFoldingControls": "always"

  // 折疊快捷鍵
  // Ctrl+Shift+[ : 折疊當前區塊
  // Ctrl+Shift+] : 展開當前區塊
  // Ctrl+K Ctrl+0 : 折疊所有區塊
  // Ctrl+K Ctrl+J : 展開所有區塊
}
```

### 工作區設定

```json
// .vscode/settings.json
{
  // 排除檔案和資料夾
  "files.exclude": {
    "**/node_modules": true,
    "**/dist": true,
    "**/.git": true,
    "**/.DS_Store": true
  },

  // 搜尋排除
  "search.exclude": {
    "**/node_modules": true,
    "**/dist": true
  },

  // 監視檔案排除
  "files.watcherExclude": {
    "**/node_modules/**": true,
    "**/dist/**": true
  }
}
```

## 語言特定設定

### JavaScript/TypeScript

```json
{
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.tabSize": 2
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.tabSize": 2
  },
  "typescript.preferences.importModuleSpecifier": "relative",
  "typescript.suggest.autoImports": true
}
```

### Python

```json
{
  "[python]": {
    "editor.defaultFormatter": "ms-python.black-formatter",
    "editor.tabSize": 4,
    "editor.insertSpaces": true
  },
  "python.defaultInterpreterPath": "./venv/bin/python",
  "python.linting.enabled": true,
  "python.linting.pylintEnabled": true
}
```

### HTML/CSS

```json
{
  "[html]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.tabSize": 2
  },
  "[css]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.tabSize": 2
  },
  "emmet.includeLanguages": {
    "javascript": "javascriptreact",
    "typescript": "typescriptreact"
  }
}
```

## 檔案關聯設定

### 自定義檔案關聯

```json
{
  "files.associations": {
    "*.env.*": "dotenv",
    "*.config.js": "javascript",
    "Dockerfile.*": "dockerfile",
    "*.yml": "yaml",
    "*.yaml": "yaml"
  }
}
```

### 語言模式設定

```json
{
  "files.defaultLanguage": "markdown",
  "files.autoGuessEncoding": true,
  "files.encoding": "utf8"
}
```

## 終端機設定

### 終端機配置

```json
{
  "terminal.integrated.shell.osx": "/bin/zsh",
  "terminal.integrated.shell.linux": "/bin/bash",
  "terminal.integrated.shell.windows": "C:\\Windows\\System32\\cmd.exe",
  "terminal.integrated.fontSize": 14,
  "terminal.integrated.cursorStyle": "line",
  "terminal.integrated.cursorBlinking": true
}
```

### 終端機快捷鍵

| 快捷鍵         | 功能            |
| -------------- | --------------- |
| `Ctrl+``       | 開啟/關閉終端機 |
| `Ctrl+Shift+`` | 新建終端機      |
| `Ctrl+Shift+5` | 分割終端機      |
| `Alt+←/→`      | 在終端機間切換  |

## 除錯設定

### 基本除錯配置

```json
// .vscode/launch.json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Launch Node.js",
      "type": "node",
      "request": "launch",
      "program": "${workspaceFolder}/app.js",
      "console": "integratedTerminal",
      "internalConsoleOptions": "neverOpen"
    },
    {
      "name": "Launch Chrome",
      "type": "chrome",
      "request": "launch",
      "url": "http://localhost:3000",
      "webRoot": "${workspaceFolder}/src"
    }
  ]
}
```

### 除錯快捷鍵

| 快捷鍵      | 功能          |
| ----------- | ------------- |
| `F5`        | 開始除錯      |
| `F9`        | 設定/移除斷點 |
| `F10`       | 單步執行      |
| `F11`       | 進入函數      |
| `Shift+F11` | 跳出函數      |
| `Shift+F5`  | 停止除錯      |

## 任務設定

### 自定義任務

```json
// .vscode/tasks.json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "npm start",
      "type": "shell",
      "command": "npm start",
      "group": "build",
      "presentation": {
        "echo": true,
        "reveal": "always",
        "focus": false,
        "panel": "shared"
      },
      "problemMatcher": []
    },
    {
      "label": "npm test",
      "type": "shell",
      "command": "npm test",
      "group": "test"
    }
  ]
}
```

### 任務快捷鍵

| 快捷鍵                          | 功能         |
| ------------------------------- | ------------ |
| `Ctrl+Shift+P` 然後輸入 "Tasks" | 執行任務     |
| `Ctrl+Shift+B`                  | 執行建置任務 |

## 實用技巧

### 快速導航

```bash
# 快速開啟檔案
Ctrl+P 然後輸入檔案名

# 跳轉到特定行
Ctrl+G 然後輸入行號

# 跳轉到符號
Ctrl+Shift+O 然後輸入符號名

# 在所有檔案中搜尋符號
Ctrl+T 然後輸入符號名
```

### 程式碼片段

```json
// 自定義程式碼片段
{
  "Console Log": {
    "prefix": "cl",
    "body": ["console.log('$1', $1);"],
    "description": "Console log with variable name"
  },
  "React Functional Component": {
    "prefix": "rfc",
    "body": [
      "import React from 'react';",
      "",
      "const $1 = () => {",
      "  return (",
      "    <div>",
      "      $2",
      "    </div>",
      "  );",
      "};",
      "",
      "export default $1;"
    ],
    "description": "React functional component"
  }
}
```

### 文字換行控制

```bash
# 快捷鍵
Alt+Z  # 切換文字換行開/關

# 設定檔中配置
"editor.wordWrap": "on"           # 開啟換行
"editor.wordWrap": "off"          # 關閉換行
"editor.wordWrap": "wordWrapColumn" # 按指定列數換行
"editor.wordWrapColumn": 80        # 設定換行列數
```

### 效能最佳化

```json
{
  // 關閉不需要的功能
  "editor.minimap.enabled": false,
  "editor.renderLineHighlight": "none",
  "editor.occurrencesHighlight": false,

  // 減少自動儲存頻率
  "files.autoSave": "onWindowChange",

  // 關閉遠端擴充套件推薦
  "extensions.ignoreRecommendations": true,

  // 減少檔案監視
  "files.watcherExclude": {
    "**/node_modules/**": true
  }
}
```

## 疑難排解

### 常見問題

```bash
# VSCode 啟動緩慢
1. 檢查擴充套件數量
2. 停用不必要的擴充套件
3. 清理工作區快取

# 設定同步問題
1. 檢查網路連線
2. 重新登入 Microsoft 帳號
3. 手動備份設定檔案

# 擴充套件不工作
1. 重新啟動 VSCode
2. 更新擴充套件
3. 檢查擴充套件相容性
```

### 效能監控

```bash
# 檢查 VSCode 效能
1. 開啟命令面板 (Ctrl+Shift+P)
2. 執行 "Developer: Reload Window"
3. 執行 "Developer: Show Running Extensions"
4. 檢查啟動時間和記憶體使用
```

## See Also

- [[VSCode Extensions]] - VSCode 擴充套件推薦
- [[Awesome CLI]] - 現代化 CLI 工具集合
- [VSCode 官方文檔](https://code.visualstudio.com/docs)
- [VSCode 快捷鍵參考](https://code.visualstudio.com/shortcuts/keyboard-shortcuts-windows.pdf)
