---
title: Plain Text Accounting
description: Plain Text Accounting
tags:
  - Obsidian
  - PKM
  - Accounting
sidebar_position: 1
hide_table_of_contents: true
date_created: 2024-12-29T00:00:00.000Z
date_updated: 2024-12-29T00:00:00.000Z
image: 'https://i.imgur.com/mErPwqL.png'
slug: /obsidian/plain-text-accounting/
---

# [Plain Text Accounting](https://plaintextaccounting.org/)

## 概述

Plain Text Accounting (PTA) 是一種使用純文字檔案進行記帳和財務管理的方法。在 Obsidian 中實現 PTA，可以結合筆記系統的優勢，建立一個高效且透明的個人財務管理系統。

## 核心概念

### 為什麼選擇 Plain Text Accounting

#### 優點
- **可讀性**：人類可直接閱讀和編輯
- **永久性**：純文字格式不會過時
- **版本控制**：可以使用 Git 等工具追蹤變更
- **跨平台**：在任何作業系統上都可使用
- **自動化**：可以編寫腳本自動處理
- **透明性**：所有資料都是明文儲存

#### 適用場景
- 個人財務管理
- 小型企業記帳
- 投資組合追蹤
- 預算規劃和控制
- 稅務申報準備

### 雙式記帳原理

#### 基本概念
- **帳戶 (Account)**：資產、負債、權益、收入、支出的分類
- **交易 (Transaction)**：資金在帳戶間的移轉
- **分錄 (Posting)**：交易中各帳戶的金額變動
- **平衡原則**：每筆交易的借方和貸方金額必須相等

#### 帳戶類型
```
資產 (Assets)     - 現金、銀行存款、投資、不動產等
負債 (Liabilities) - 信用卡、貸款、應付帳款等
權益 (Equity)     - 所有者權益、留存盈餘等
收入 (Income)     - 薪水、投資收益、其他收入
支出 (Expenses)   - 生活費、交通費、娛樂費等
```

## Obsidian 中的實現

### 檔案結構

```
Accounting/
├── Accounts/           # 帳戶設定和說明
│   ├── Assets.md
│   ├── Liabilities.md
│   ├── Income.md
│   └── Expenses.md
├── Transactions/       # 交易記錄
│   ├── 2024/
│   │   ├── 01-January.md
│   │   ├── 02-February.md
│   │   └── ...
├── Reports/            # 報表和分析
│   ├── Monthly-Summary.md
│   ├── Budget-Tracking.md
│   └── Investment-Portfolio.md
├── Templates/          # 模板檔案
│   ├── Transaction-Template.md
│   └── Monthly-Template.md
└── Scripts/            # 自動化腳本
    ├── import-bank-data.py
    └── generate-reports.py
```

### 交易記錄格式

#### 基本交易格式
```markdown
## 2024-01-15 購買生活用品

```ledger
2024-01-15 全聯購物
    Expenses:Food:Groceries     $85.50
    Assets:Bank:Checking       -$85.50
```

**說明**：在全聯購買生鮮食品，從支票帳戶支付 $85.50
```

#### 複雜交易範例
```markdown
## 2024-01-20 薪水入帳

```ledger
2024-01-20 公司薪水
    Assets:Bank:Checking        $3,200.00
    Assets:Bank:Savings           $800.00
    Income:Salary              -$4,500.00
    Liabilities:Tax:Federal       $350.00
    Liabilities:Tax:State         $150.00
```

**說明**：
- 總薪水 $4,500
- 支票帳戶存入 $3,200
- 儲蓄帳戶存入 $800
- 預留聯邦稅 $350
- 預留州稅 $150
```

### Properties 整合

#### 交易筆記 Properties
```yaml
---
title: "2024-01 交易記錄"
type: "transaction-log"
month: "2024-01"
total_income: 4500.00
total_expenses: 2850.75
net_income: 1649.25
currency: "USD"
tags: ["accounting", "monthly"]
date_created: 2024-01-01
date_updated: 2024-01-31
---
```

#### 帳戶筆記 Properties
```yaml
---
title: "支票帳戶"
account_type: "asset"
account_code: "1001"
bank_name: "第一銀行"
account_number: "****1234"
current_balance: 5420.50
currency: "USD"
date_opened: 2020-03-15
tags: ["banking", "checking"]
---
```

## 實際應用案例

### 個人月度預算

```markdown
# 2024-01 月度預算與實際

## 收入預算
| 項目 | 預算 | 實際 | 差異 |
|------|------|------|------|
| 薪水 | $4,500 | $4,500 | $0 |
| 副業 | $500 | $650 | +$150 |
| 投資收益 | $200 | $180 | -$20 |
| **總計** | **$5,200** | **$5,330** | **+$130** |

## 支出預算
| 類別 | 預算 | 實際 | 差異 |
|------|------|------|------|
| 房租 | $1,200 | $1,200 | $0 |
| 食物 | $400 | $450 | -$50 |
| 交通 | $200 | $180 | +$20 |
| 娛樂 | $300 | $280 | +$20 |
| 其他 | $200 | $220 | -$20 |
| **總計** | **$2,300** | **$2,330** | **-$30** |

## 結餘
- **預算結餘**：$2,900
- **實際結餘**：$3,000
- **差異**：+$100
```

### 投資組合追蹤

```markdown
# 投資組合追蹤

## 投資帳戶概覽

### 股票投資
| 股票代號 | 持有股數 | 成本價 | 現價 | 未實現損益 |
|----------|----------|----------|----------|----------|
| AAPL | 10 | $150.00 | $175.50 | +$255.00 |
| GOOGL | 5 | $2,800.00 | $2,750.00 | -$250.00 |
| TSLA | 8 | $220.00 | $245.00 | +$200.00 |

### 基金投資
| 基金名稱 | 投資金額 | 現值 | 報酬率 |
|----------|----------|----------|----------|
| S&P 500 ETF | $5,000 | $5,250 | +5.0% |
| 國際股票基金 | $3,000 | $2,950 | -1.7% |

## 月度投資記錄

```ledger
2024-01-15 購買 AAPL 股票
    Assets:Investment:Stocks:AAPL    $1,500.00
    Assets:Bank:Checking            -$1,500.00

2024-01-20 股息收入
    Assets:Bank:Checking               $25.50
    Income:Investment:Dividends       -$25.50
```
```

### 小企業記帳

```markdown
# 小企業月度財務報表

## 損益表 (2024-01)

### 營業收入
```ledger
2024-01-05 客戶 A 付款
    Assets:Bank:Business           $2,500.00
    Income:Sales:Consulting       -$2,500.00

2024-01-15 客戶 B 付款
    Assets:Bank:Business           $1,800.00
    Income:Sales:Development      -$1,800.00
```

### 營業支出
```ledger
2024-01-10 辦公室租金
    Expenses:Office:Rent             $800.00
    Assets:Bank:Business            -$800.00

2024-01-20 軟體訂閱費
    Expenses:Software:Subscriptions  $150.00
    Assets:Bank:Business            -$150.00
```
```

## 工具和插件

### Obsidian 插件

#### Dataview
用於生成財務報表和統計：

```dataview
TABLE 
  sum(rows.amount) as "總金額",
  length(rows) as "交易筆數"
FROM "Accounting/Transactions"
WHERE contains(file.name, "2024-01")
GROUP BY category
SORT sum(rows.amount) DESC
```

#### Templater
自動化交易記錄建立：

```javascript


## 2026-01-25 null

```ledger
2026-01-25 null
    Expenses:    $null
    Assets:Bank:Checking    -$null
```
```

### 外部工具

#### Ledger CLI
- **安裝**：`brew install ledger`
- **基本用法**：
  ```bash
  # 查看帳戶餘額
  ledger -f transactions.ledger balance
  
  # 查看月度報表
  ledger -f transactions.ledger register --monthly
  
  # 查看特定帳戶
  ledger -f transactions.ledger balance Assets:Bank
  ```

#### hledger
- **安裝**：`brew install hledger`
- **Web 介面**：`hledger-web`
- **報表生成**：
  ```bash
  # 損益表
  hledger incomestatement
  
  # 資產負債表
  hledger balancesheet
  
  # 現金流量表
  hledger cashflow
  ```

#### Beancount
- **Python 實現**：更強大的稅務和投資功能
- **Fava Web UI**：美觀的網頁介面
- **安裝**：`pip install beancount fava`

## 最佳實踐

### 記帳習慣
1. **每日記錄**：養成每天記錄交易的習慣
2. **定期對帳**：每月與銀行帳單核對
3. **分類一致**：使用一致的帳戶命名和分類
4. **備份重要**：定期備份財務資料

### 帳戶設計
1. **階層結構**：使用冒號分隔的階層帳戶
   ```
   Assets:Bank:Checking
   Assets:Bank:Savings
   Expenses:Food:Groceries
   Expenses:Food:Restaurants
   ```

2. **命名規範**：
   - 使用英文命名以確保相容性
   - 避免特殊字元和空格
   - 使用有意義的名稱

3. **帳戶編號**：可以使用數字編號系統
   ```
   1000-1999: 資產
   2000-2999: 負債
   3000-3999: 權益
   4000-4999: 收入
   5000-5999: 支出
   ```

### 自動化建議
1. **銀行資料匯入**：使用 CSV 匯入腳本
2. **定期交易**：自動生成重複交易
3. **報表生成**：使用腳本自動生成月報
4. **提醒系統**：設定記帳和對帳提醒

## 常見問題解答

### Q: 為什麼不使用 Excel 或專業財務軟體？
A: Plain Text Accounting 提供更好的數據控制、版本管理和自動化能力，且不會被特定軟體綁定。

### Q: 如何處理多幣別交易？
A: 在金額後面指定幣別代號，例如：`$100 USD`、`€85 EUR`。

### Q: 如何處理投資的市值變動？
A: 使用價格文件記錄每日市價，或使用工具自動更新。

### Q: 如何處理稅務申報？
A: 使用特定的稅務分類標籤，年底生成稅務報表。

## See Also

### 相關文件
- [[Obsidian Properties]] - 屬性系統使用
- [[Obsidian Task Management]] - 任務管理系統
- [[Obsidian Customization Latest]] - 整體客製化設定

### 官方資源
- [Plain Text Accounting 官網](https://plaintextaccounting.org/)
- [Ledger CLI 文件](https://ledger-cli.org/)
- [hledger 文件](https://hledger.org/)
- [Beancount 文件](https://beancount.github.io/)

### 社群資源
- [Personal Accounting plugin for Obsidian](https://forum.obsidian.md/t/personal-accounting-plugin-for-obsidian/5361)
- [Plain Text Accounting Reddit](https://www.reddit.com/r/plaintextaccounting/)
- [Ledger CLI 中文教學](https://github.com/rolfschr/GSWL-book)

### 相關工具
- [Ledger CLI](https://ledger-cli.org/) - 原始的 PTA 工具
- [hledger](https://hledger.org/) - Haskell 實現的版本
- [Beancount](https://beancount.github.io/) - Python 實現的版本
- [Fava](https://github.com/beancount/fava) - Beancount 的 Web 介面
