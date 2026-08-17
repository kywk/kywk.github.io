/**
 * URL slug 推導規則 —— 全站唯一實作
 *
 * 這個模組同時被兩個地方使用，確保「hook 產生的 slug」與「手動腳本產生的 slug」永遠一致：
 *   1. docusaurus.config.ts 的 markdown.parseFrontMatter（build 時即時推導，權威來源）
 *   2. scripts/slug.js（npm run content:slug，人工檢查／寫入）
 *   3. docusaurus.config.ts 的 wikilink pageResolver（[[...]] 的 URL 也走同一套規則）
 *
 * 註：本檔原本還匯出一個 remarkSlugNormalizer remark 外掛，用來在 remark 階段把 slug
 * 注入 frontmatter。那是無效程式碼 —— Docusaurus 在 loadContent/processDocMetadata
 * 階段就已經算好 permalink，remark 是之後才在 mdx-loader 跑的，改 yaml node 影響不到路由。
 * 已移除，改用 parseFrontMatter hook。
 */

/**
 * 正規化單一路徑段
 *
 *   'Schedule on Egypt' -> 'schedule-on-egypt'
 *   'IDEA_POOL'         -> 'idea-pool'
 *   "Don't DRY"         -> 'dont-dry'
 *   '_Surfing'          -> 'surfing'
 *   'kywk.moco'         -> 'kywk.moco'   （點保留）
 *   '慕士塔格 Muztagh'   -> '慕士塔格-muztagh'（非 ASCII 保留，交給 percent-encoding）
 *
 * @param {string} segment
 * @returns {string}
 */
function normalizeSegment(segment) {
  if (!segment) return '';
  return segment
    .toLowerCase()
    .replace(/['’‘`"“”]/g, '')   // 引號直接移除，不要變成分隔符
    .replace(/[\s_]+/g, '-')     // 空白與底線 -> 分隔符
    .replace(/-{2,}/g, '-')      // 收合連續分隔符
    .replace(/^-+|-+$/g, '');    // 去掉頭尾分隔符
}

/**
 * 正規化整段路徑（逐段處理，空段落丟棄）
 * @param {string} urlPath
 * @returns {string}
 */
function normalizePath(urlPath) {
  if (!urlPath) return '';
  return urlPath
    .split('/')
    .map(normalizeSegment)
    .filter(Boolean)
    .join('/');
}

/**
 * 向後相容用的別名。舊版只做「空白 -> dash + 轉小寫」，現在一併處理底線與引號。
 * @param {string} urlPath
 * @returns {string}
 */
function normalizeSlug(urlPath) {
  if (!urlPath) return urlPath;
  return normalizePath(urlPath);
}

// 與 @docusaurus/plugin-content-blog 的 DATE_FILENAME_REGEX 對齊，
// 這樣推導出來的 blog slug 會保留 Docusaurus 原本的 /YYYY/MM/DD/ 結構。
const BLOG_DATE_FILENAME_REGEX =
  /^(.*)(\d{4}[-/]\d{1,2}[-/]\d{1,2})[-/]?(.*?)(?:\/index)?\.mdx?$/;

function toPosix(p) {
  return String(p).split('\\').join('/');
}

/**
 * 由檔案路徑推導 slug frontmatter 的值。
 *
 * docs 與 blog 的 slug 都是「相對於該 plugin 的 routeBasePath」，開頭的 / 代表
 * plugin 根目錄而非站台根目錄，所以 backpacker 的 /2401-egypt/ 最終會是
 * /backpacker/2401-egypt/。
 *
 * @param {object} params
 * @param {string} params.relPath   相對於專案根目錄的檔案路徑（含副檔名）
 * @param {string[]} params.docsPaths  docs plugin 的 path 清單，例：['backpacker','lifehacker','moco']
 * @param {string[]} params.blogPaths  blog plugin 的 path 清單，例：['blog.news','blog.life']
 * @returns {{kind: 'docs'|'blog'|null, vault: string|null, slug: string|null}}
 */
function deriveSlug({ relPath, docsPaths = [], blogPaths = [] }) {
  const rel = toPosix(relPath).replace(/^\.\//, '');
  if (!/\.mdx?$/.test(rel)) return { kind: null, vault: null, slug: null };

  const match = (vaults) =>
    vaults.find((v) => rel === v || rel.startsWith(`${toPosix(v)}/`));

  const docsVault = match(docsPaths);
  if (docsVault) {
    let inner = rel.slice(toPosix(docsVault).length + 1).replace(/\.mdx?$/, '');
    // dir/index.md 的路由就是 dir 本身，不該多一段 /index/
    inner = inner.replace(/(^|\/)index$/, '');
    const normalized = normalizePath(inner);
    return {
      kind: 'docs',
      vault: docsVault,
      slug: normalized ? `/${normalized}/` : '/',
    };
  }

  const blogVault = match(blogPaths);
  if (blogVault) {
    const inner = rel.slice(toPosix(blogVault).length + 1);
    const dateMatch = inner.match(BLOG_DATE_FILENAME_REGEX);
    if (dateMatch) {
      const [, folder, dateString, text] = dateMatch;
      const slugDate = dateString.replace(/-/g, '/');
      const tail = normalizePath(`${folder}${text}`);
      return {
        kind: 'blog',
        vault: blogVault,
        slug: tail ? `/${slugDate}/${tail}` : `/${slugDate}`,
      };
    }
    const normalized = normalizePath(inner.replace(/\.mdx?$/, ''));
    return {
      kind: 'blog',
      vault: blogVault,
      slug: normalized ? `/${normalized}` : '/',
    };
  }

  return { kind: null, vault: null, slug: null };
}

module.exports = {
  normalizeSegment,
  normalizePath,
  normalizeSlug,
  deriveSlug,
  BLOG_DATE_FILENAME_REGEX,
};
