#!/usr/bin/env node
/**
 * Slug 檢查／維護工具
 *
 * slug 的權威來源是 docusaurus.config.ts 的 markdown.parseFrontMatter，它在 build 時
 * 由檔案路徑即時推導，不寫回檔案。這支腳本用「同一個」推導函式
 * （plugins/remark-slug-normalizer/src/index.js 的 deriveSlug），所以這裡列出的
 * slug 與實際產生的路由必然一致。
 *
 * 用法：
 *   npm run content:slug              檢查：列出每個檔案的 slug，偵測衝突與殘留的 slug frontmatter
 *   npm run content:slug:fix          清理：移除檔案裡多餘的 slug frontmatter（hook 已接管）
 *   npm run content:slug:write        寫入：把推導出的 slug 寫回 frontmatter（想在 Obsidian 裡看到時用）
 *
 * 額外參數：
 *   --json      以 JSON 輸出（給其他工具用）
 *   --quiet     只輸出摘要與問題，不逐檔列出
 *
 * 寫檔一律採「逐行插入／替換」，不用 gray-matter 重新序列化 ——
 * 後者會把 `date_created: 2026-07-26` 改寫成 `2026-07-26T00:00:00.000Z`、
 * 把 inline 的 `tags: [a, b]` 展開成 block list，跟 Obsidian 來回打架。
 */

const fs = require('fs');
const path = require('path');
const { deriveSlug } = require('../plugins/remark-slug-normalizer/src/index.js');
const { docsConfig, blogConfig } = require('../site.config.js');

const ROOT = path.resolve(__dirname, '..');
const DOCS_PATHS = docsConfig.map((doc) => doc.path);
const BLOG_PATHS = blogConfig.map((blog) => blog.path);
const ROUTE_BASE = new Map([
  ...docsConfig.map((doc) => [doc.path, `/${doc.routeBasePath}`]),
  ...blogConfig.map((blog) => [blog.path, `/${blog.routeBasePath}`]),
]);

const args = process.argv.slice(2);
const MODE = args.includes('--write') ? 'write' : args.includes('--fix') ? 'fix' : 'check';
const AS_JSON = args.includes('--json');
const QUIET = args.includes('--quiet');

/** 遞迴收集 markdown 檔案 */
function collect(dir, out = []) {
  for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, item.name);
    if (item.isDirectory()) {
      if (item.name.startsWith('.') || item.name === 'node_modules') continue;
      collect(full, out);
    } else if (item.isFile() && /\.mdx?$/.test(item.name)) {
      out.push(full);
    }
  }
  return out;
}

/** 切出 frontmatter 的行範圍。沒有 frontmatter 時回傳 null。 */
function frontMatterRange(lines) {
  if (lines[0] !== '---') return null;
  for (let i = 1; i < lines.length; i++) {
    if (lines[i] === '---') return { start: 1, end: i }; // [start, end)
  }
  return null;
}

function findSlugLine(lines, range) {
  if (!range) return -1;
  for (let i = range.start; i < range.end; i++) {
    if (/^slug\s*:/.test(lines[i])) return i;
  }
  return -1;
}

const results = [];
const byRoute = new Map();

for (const vault of [...DOCS_PATHS, ...BLOG_PATHS]) {
  const dir = path.join(ROOT, vault);
  if (!fs.existsSync(dir)) {
    console.warn(`[WARN] 找不到目錄：${vault}`);
    continue;
  }
  for (const file of collect(dir)) {
    const relPath = path.relative(ROOT, file).split(path.sep).join('/');
    const { kind, vault: matched, slug } = deriveSlug({
      relPath,
      docsPaths: DOCS_PATHS,
      blogPaths: BLOG_PATHS,
    });
    if (!slug) continue;

    const raw = fs.readFileSync(file, 'utf-8');
    const lines = raw.split('\n');
    const range = frontMatterRange(lines);
    const slugLineIndex = findSlugLine(lines, range);
    const existing =
      slugLineIndex === -1 ? null : lines[slugLineIndex].replace(/^slug\s*:\s*/, '').trim().replace(/^["']|["']$/g, '');

    const route = `${ROUTE_BASE.get(matched)}${slug}`.replace(/\/{2,}/g, '/');
    if (!byRoute.has(route)) byRoute.set(route, []);
    byRoute.get(route).push(relPath);

    results.push({ relPath, kind, vault: matched, slug, route, existing, slugLineIndex, lines, raw, range });
  }
}

// ---- 問題偵測 ----
const collisions = [...byRoute.entries()].filter(([, files]) => files.length > 1);
const stale = results.filter((r) => r.existing !== null && r.existing !== r.slug);
const redundant = results.filter((r) => r.existing === r.slug);
const missing = results.filter((r) => r.existing === null);

// ---- 套用變更 ----
let changed = 0;
if (MODE === 'fix') {
  for (const r of results) {
    if (r.slugLineIndex === -1) continue;
    const lines = r.lines.slice();
    lines.splice(r.slugLineIndex, 1);
    // frontmatter 被清空的話（只有 slug 一行）連整個 frontmatter 一起移除
    const body = lines.slice(1, r.range.end - 1);
    const emptyFrontMatter = body.every((l) => l.trim() === '');
    const next = emptyFrontMatter ? lines.slice(r.range.end).join('\n').replace(/^\n+/, '') : lines.join('\n');
    fs.writeFileSync(path.join(ROOT, r.relPath), next, 'utf-8');
    changed++;
  }
} else if (MODE === 'write') {
  for (const r of results) {
    if (r.existing === r.slug) continue;
    let next;
    if (r.slugLineIndex !== -1) {
      const lines = r.lines.slice();
      lines[r.slugLineIndex] = `slug: ${r.slug}`;
      next = lines.join('\n');
    } else if (r.range) {
      const lines = r.lines.slice();
      lines.splice(r.range.end, 0, `slug: ${r.slug}`);
      next = lines.join('\n');
    } else {
      next = `---\nslug: ${r.slug}\n---\n\n${r.raw.replace(/^\n+/, '')}`;
    }
    fs.writeFileSync(path.join(ROOT, r.relPath), next, 'utf-8');
    changed++;
  }
}

// ---- 輸出 ----
if (AS_JSON) {
  console.log(
    JSON.stringify(
      {
        mode: MODE,
        total: results.length,
        changed,
        collisions: collisions.map(([route, files]) => ({ route, files })),
        stale: stale.map((r) => ({ file: r.relPath, existing: r.existing, derived: r.slug })),
        files: results.map((r) => ({ file: r.relPath, kind: r.kind, slug: r.slug, route: r.route })),
      },
      null,
      2,
    ),
  );
} else {
  if (!QUIET && MODE === 'check') {
    for (const r of results) {
      const mark = r.existing === null ? ' ' : r.existing === r.slug ? '=' : '!';
      console.log(`${mark} ${r.route.padEnd(60)} ${r.relPath}`);
    }
    console.log('');
    console.log('  （空白 = 檔案沒有 slug frontmatter，= 一致，! 與推導值不同）');
    console.log('');
  }

  console.log(`模式：${MODE}`);
  console.log(`掃描檔案：${results.length}`);
  console.log(`  沒有 slug frontmatter：${missing.length}（正常，hook 會即時推導）`);
  console.log(`  slug 與推導值一致：${redundant.length}（多餘，可用 content:slug:fix 清掉）`);
  console.log(`  slug 與推導值不同：${stale.length}（會被 hook 覆蓋，等於失效設定）`);
  if (MODE !== 'check') console.log(`  已修改檔案：${changed}`);

  if (stale.length) {
    console.log('\n⚠️  以下檔案的 slug 與推導值不同（hook 會覆蓋它）：');
    for (const r of stale) console.log(`   ${r.relPath}\n       檔案內: ${r.existing}\n       推導值: ${r.slug}`);
  }

  if (collisions.length) {
    console.log('\n❌ slug 衝突（多個檔案會產生同一個路由）：');
    for (const [route, files] of collisions) {
      console.log(`   ${route}`);
      for (const f of files) console.log(`       ${f}`);
    }
  } else {
    console.log('\n✅ 沒有 slug 衝突');
  }
}

process.exit(collisions.length ? 1 : 0);
