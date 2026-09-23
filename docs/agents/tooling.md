# 內容工具與插件規範

適用於 `scripts/`、`plugins/` 與相關 npm scripts。

## 腳本

- 保持工具可預期且範圍明確；掃描路徑需避開依 `.gitignore` 排除的私人或暫存內容，除非任務明確要求。
- 會寫檔或覆寫素材的功能應提供預覽方式或明確的寫入選項，並在 `--help`／文件中說明。不要讓預設檢查命令暗中改動 vault。
- 修改 frontmatter 時採逐行、欄位級更新，避免解析後重新序列化改變日期、inline list 或其他 Obsidian 格式。
- 內容解析器要考慮 fenced code、inline code 與 frontmatter；轉換不得改動程式碼範例中的文字。
- npm script 名稱、行為或參數改變時，同步更新 `package.json` 及 `README.md`、`SCRIPTS-GUIDE.md` 中受影響說明。

## 插件

- 插件載入優先順序與安裝方式見 `PLUGIN-INSTALL-GUIDE.md`。不要假設只有 `plugins/` 本地副本或只有 npm 套件存在。
- 修改 wiki-link、slug 或頁面索引時，維持 docs、blog、內容檢查工具使用一致的解析規則。
- 修改 Leaflet 或 Kanban 渲染時，保留 Obsidian 原始語法可編輯性；網站渲染不得要求回寫轉換原始筆記。
- 新增依賴前檢查 `package.json`、`package-lock.json`、CI Node 版本及現有功能是否已有相依套件；避免未必要的執行期依賴。
