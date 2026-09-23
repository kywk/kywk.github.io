# 內容與 Obsidian 規範

適用於公開內容目錄（`backpacker/`、`lifehacker/`、`moco/`、`blog.life/`、`blog.news/`）的 Markdown 工作。其他目錄先確認是否為公開且受版本控制的內容。

## 筆記編輯

- 延續原文語言、用詞、格式和作者聲音；採最小必要編輯，不把私人筆記改成面向讀者的文章，除非任務要求。
- 保留 frontmatter 欄位、值型別、日期格式、列表形式與 Obsidian Properties 相容性。只改必要欄位，不用工具重新序列化整份 frontmatter。
- 站內 Obsidian 連結沿用 `[[目標]]` 或 `[[目標|顯示文字]]`。只有相對路徑 `.md` 連結才適用 `npm run content:wikilink`；此工具預設 dry-run，實際寫入須明確加 `-- --write`。
- 新內容依附近同類文件的結構、命名與 frontmatter 為範本。不要只為符合抽象命名規則改名。
- 改檔名或路徑前，搜尋並更新所有 wiki-link、Markdown 相對連結、圖片引用及導航引用；注意別名、同名檔案及大小寫。

## Slug 與網站網址

- slug 由 `plugins/remark-slug-normalizer/` 的 `deriveSlug()` 統一推導，build 時依相對路徑決定；通常不要新增或手改 `slug:` frontmatter。
- 改路徑、slug 推導器或連結解析時，確認 `docusaurus.config.ts`、`scripts/content-links.js` 和 `scripts/slug.js` 共用規則，避免頁面路由與 wiki-link 目標分歧。
- 新增內容後可執行 `npm run content:slug` 檢查路由衝突。`:fix` 與 `:write` 會寫檔，執行前先確認預期變更。

## 圖片與附件

- 網站需用的圖片放在已追蹤且符合該內容集合的公開路徑；根目錄 `assets/` 目前被 `.gitignore` 排除，不能假設其中圖片會發布。
- `npm run content:optimize` 會就地覆寫圖片且沒有備份。先用 `npm run content:optimize -- --dry-run` 預覽，再確認要處理的檔案。

## 驗證

- `npm run content:check` 的 error 可能阻擋 build；warning 是內容品質提醒，預設不阻擋。`-- --strict` 會讓 warning 也失敗。
- 避免對大量既有內容做未要求的批次改寫。若任務包含批次整理，先限制到指定路徑並檢查差異。
