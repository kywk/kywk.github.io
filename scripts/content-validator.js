#!/usr/bin/env node
/**
 * 內容檢查
 *
 * 設計原則：只有「會讓 build 失敗或產出壞掉」的才算 error（exit 1），
 * 其餘一律是 warning。這樣才有資格當 CI 的 gate。
 *
 * 用法：
 *   npm run content:check              檢查（有 error 才 exit 1）
 *   npm run content:check -- --strict  warning 也視為失敗
 *   npm run content:check -- --quiet   只輸出摘要
 */

const fs = require('fs');
const path = require('path');
const { Logger } = require('./logger');
const { docsConfig, blogConfig } = require('../site.config.js');

const CONTEXT = 'ContentValidator';
const ROOT = path.resolve(__dirname, '..');
const CONTENT_DIRS = [...docsConfig.map((d) => d.path), ...blogConfig.map((b) => b.path)];

const args = process.argv.slice(2);
const STRICT = args.includes('--strict');
const QUIET = args.includes('--quiet');

const errors = [];
const warnings = [];
const SHORT_CONTENT_THRESHOLD = 30;

// frontmatter 內不合法的 YAML 縮排字元。Docusaurus 3.10 起改用 @11ty/gray-matter，
// frontmatter 用 tab 縮排會直接丟 YAMLException 讓整個 build 失敗（3.9 可以過）。
const CONTROL_CHARS = /[\x00-\x08\x0b\x0c\x0e-\x1f\x7f]/;

function splitFrontMatter(raw) {
  if (!raw.startsWith('---')) return { frontMatter: null, body: raw };
  const end = raw.indexOf('\n---', 3);
  if (end === -1) return { frontMatter: null, body: raw };
  return { frontMatter: raw.slice(3, end), body: raw.slice(end + 4) };
}

function validateFile(filePath) {
  const rel = path.relative(ROOT, filePath);
  let raw;
  try {
    raw = fs.readFileSync(filePath, 'utf8');
  } catch (error) {
    errors.push(`${rel}: 無法讀取 - ${error.message}`);
    return;
  }

  const { frontMatter, body } = splitFrontMatter(raw);

  // --- error：會讓 build 失敗的 ---
  if (frontMatter !== null) {
    if (frontMatter.includes('\t')) {
      const line = frontMatter.split('\n').findIndex((l) => l.includes('\t')) + 2;
      errors.push(`${rel}:${line}: frontmatter 用了 tab 縮排，YAML 不合法（Docusaurus 3.10 會讓 build 失敗）`);
    }
    // 抓 "foo: : bar" 這種 gray-matter 會直接丟錯的寫法
    for (const [i, l] of frontMatter.split('\n').entries()) {
      if (/^\s*[\w.-]+\s*:\s*:\s/.test(l)) {
        errors.push(`${rel}:${i + 2}: frontmatter 有重複的冒號，gray-matter 會解析失敗`);
      }
    }
  }

  const ctrl = raw.match(CONTROL_CHARS);
  if (ctrl) {
    errors.push(
      `${rel}: 含控制字元 0x${ctrl[0].charCodeAt(0).toString(16)}（HTML minifier 會報錯，複製貼上常見）`,
    );
  }

  // --- warning：品質提醒 ---
  const hasH1 = /^#\s+\S/m.test(body) || /^\S.*\n=+\s*$/m.test(body);
  const hasTitle = frontMatter !== null && /^title\s*:/m.test(frontMatter);
  if (!hasTitle && !hasH1) {
    // 只有「既沒有 title frontmatter、也沒有 H1」時 Docusaurus 才推不出標題。
    // 舊版無條件要求 title，在這個 vault 造成 72 個誤報。
    warnings.push(`${rel}: 沒有 title frontmatter 也沒有 H1，Docusaurus 推不出標題`);
  }

  if (frontMatter !== null && /^tags\s*:/m.test(frontMatter)) {
    for (const [i, l] of frontMatter.split('\n').entries()) {
      const m = l.match(/^\s*-\s*["']?(#[^"'\s]+)["']?\s*$/);
      if (m) {
        warnings.push(
          `${rel}:${i + 2}: tag "${m[1]}" 開頭是 #，會被歸到 "#" 字母群組並產生 href="##" 的壞 anchor`,
        );
      }
    }
  }

  for (const m of body.matchAll(/\[\[([^\]]+)\]\]/g)) {
    const target = m[1].split('|')[0];
    if (/^https?:|^www\./.test(target)) {
      warnings.push(`${rel}: wikilink 指向網址 '${m[0]}'，應該用一般 markdown 連結`);
    }
    if (target.includes(':') && !target.includes('://')) {
      warnings.push(`${rel}: wikilink '${m[0]}' 使用舊的冒號別名語法，現行 aliasDivider 是 |`);
    }
  }

  if (body.trim().length < SHORT_CONTENT_THRESHOLD) {
    warnings.push(`${rel}: 內容過短（${body.trim().length} 字元）`);
  }
}

function scanDirectory(dir) {
  if (!fs.existsSync(dir)) return;
  for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, item.name);
    if (item.isDirectory()) {
      if (item.name.startsWith('.') || item.name === 'node_modules') continue;
      scanDirectory(full);
    } else if (item.isFile() && /\.mdx?$/.test(item.name)) {
      // 舊版只看 .md，漏掉 .mdx
      validateFile(full);
    }
  }
}

Logger.info('Validating content...', CONTEXT);
for (const dir of CONTENT_DIRS) {
  const full = path.join(ROOT, dir);
  if (!fs.existsSync(full)) {
    Logger.warn(`找不到目錄：${dir}`, CONTEXT);
    continue;
  }
  Logger.info(`Scanning ${dir}/`, CONTEXT);
  scanDirectory(full);
}

if (!QUIET) {
  if (errors.length) {
    console.log('\n❌ Errors（會讓 build 失敗）：');
    for (const e of errors) console.log(`   ${e}`);
  }
  if (warnings.length) {
    console.log('\n⚠️  Warnings：');
    for (const w of warnings) console.log(`   ${w}`);
  }
}

console.log('');
Logger.info(`Errors: ${errors.length}, Warnings: ${warnings.length}`, CONTEXT);
if (!errors.length && !warnings.length) console.log('✅ 全部通過');

const failed = errors.length > 0 || (STRICT && warnings.length > 0);
process.exit(failed ? 1 : 0);
