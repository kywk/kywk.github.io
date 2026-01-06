---
slug: /ai/新增旅遊景點檔案-prompt/
---
新增旅遊景點檔案 Prompt

## 基本要求

為 [國家/地區] 新增以下景點檔案，參考現有格式創建：

## 檔案規範

檔名格式：「景點中文 英文」.md

## YAML frontmatter 必須包含：

- title: 景點中文 英文
- tags: 包含地區標籤 (如 Chile/Patagonia, Chile/Norte, Chile/Santiago)
- location: 使用 Google Maps 查找的真實座標
- mapmarker: 景點用 default，餐廳用 restaurant
- web 或 wiki: 官網或維基百科連結（如有）
- hide_table_of_contents: true

## 內容結構：

- 景點介紹段落（引用格式）
- 景點介紹 或 ## 餐廳特色
- 推薦菜色（餐廳）或相關子景點
- 交通方式
- 注意事項
- See Also（空白）

## 重要注意事項

- 座標驗證：每個景點必須使用 Google Maps 查找的真實座標，避免重疊
- 標籤分類：根據地理位置使用正確的地區標籤
- 餐廳特殊處理：
	- 加入 Restaurant 標籤
	- 使用 restaurant mapmarker
	- 包含推薦菜色、營業資訊等
- 內容準確性：根據實際情況描述景點特色，避免通用模板內容
- 範例景點類型
	- 自然景觀：國家公園、山峰、湖泊、沙漠
	- 城市景點：廣場、教堂、市場、博物館
	- 餐廳店家：當地特色餐廳、咖啡廳、烘焙坊
