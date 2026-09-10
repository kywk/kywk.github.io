#!/usr/bin/env node
/**
 * 圖片壓縮
 *
 * 用法：
 *   npm run content:optimize                 實際壓縮（就地覆寫，沒有備份）
 *   npm run content:optimize -- --dry-run    只列出會被處理的檔案與預估結果
 *
 * 需要 ImageMagick（magick / convert）或 sharp 其中之一。
 *
 * 修過的 bug：
 *   1. sharp fallback 原本一律輸出 .jpeg()，卻寫進保留原副檔名的暫存檔再覆蓋原圖
 *      → PNG 會被換成「副檔名是 .png 但內容是 JPEG」的檔案，透明度直接消失。
 *      現在依副檔名選擇輸出格式。
 *   2. sharp 分支是 async 但外層是同步流程，統計數字都在摘要印出後才累加
 *      → 用 sharp 時摘要永遠顯示 0。現在整條流程改為 await。
 *   3. scanDirectory 沒有跳過隱藏目錄／node_modules。
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const IMAGE_DIRS = ['static/img', 'assets', 'backpacker', 'lifehacker', 'moco'];
const MAX_WIDTH = 1920;
const QUALITY = 85;
const SUPPORTED_FORMATS = ['.jpg', '.jpeg', '.png', '.webp'];
const MIN_SIZE = 100 * 1024;

const DRY_RUN = process.argv.slice(2).includes('--dry-run');

let optimizedCount = 0;
let totalSaved = 0;
let skippedNoTool = 0;

const getFileSize = (p) => fs.statSync(p).size;
const formatBytes = (b) => `${(b / 1024 / 1024).toFixed(2)} MB`;

/** 找出可用的 ImageMagick 執行檔（IM7 是 magick，IM6 是 convert） */
function detectImageMagick() {
  for (const bin of ['magick', 'convert']) {
    try {
      execSync(`which ${bin}`, { stdio: 'ignore' });
      return bin;
    } catch {
      /* 試下一個 */
    }
  }
  return null;
}

const MAGICK = detectImageMagick();
let sharpLib = null;
if (!MAGICK) {
  try {
    sharpLib = require('sharp');
  } catch {
    sharpLib = null;
  }
}

async function writeWithSharp(filePath, tempPath, ext) {
  // 依原始副檔名選格式，不要一律轉 JPEG
  const pipeline = sharpLib(filePath).resize(MAX_WIDTH, MAX_WIDTH, {
    fit: 'inside',
    withoutEnlargement: true,
  });
  if (ext === '.png') pipeline.png({ quality: QUALITY });
  else if (ext === '.webp') pipeline.webp({ quality: QUALITY });
  else pipeline.jpeg({ quality: QUALITY });
  await pipeline.toFile(tempPath);
}

async function optimizeImage(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (!SUPPORTED_FORMATS.includes(ext)) return;

  const originalSize = getFileSize(filePath);
  if (originalSize < MIN_SIZE) return;

  if (!MAGICK && !sharpLib) {
    skippedNoTool++;
    return;
  }

  const tempPath = `${filePath}.tmp${ext}`;
  try {
    if (MAGICK) {
      const cmd =
        MAGICK === 'magick'
          ? `magick "${filePath}" -resize "${MAX_WIDTH}x${MAX_WIDTH}>" -quality ${QUALITY} "${tempPath}"`
          : `convert "${filePath}" -resize "${MAX_WIDTH}x${MAX_WIDTH}>" -quality ${QUALITY} "${tempPath}"`;
      execSync(cmd, { stdio: 'ignore' });
    } else {
      await writeWithSharp(filePath, tempPath, ext);
    }

    const newSize = getFileSize(tempPath);
    const saved = originalSize - newSize;

    if (saved > 0) {
      if (DRY_RUN) {
        fs.unlinkSync(tempPath);
        console.log(
          `[DRY-RUN] ${filePath}: ${formatBytes(originalSize)} → ${formatBytes(newSize)} (可省 ${formatBytes(saved)})`,
        );
      } else {
        fs.renameSync(tempPath, filePath);
        console.log(
          `✅ ${filePath}: ${formatBytes(originalSize)} → ${formatBytes(newSize)} (saved ${formatBytes(saved)})`,
        );
      }
      optimizedCount++;
      totalSaved += saved;
    } else {
      fs.unlinkSync(tempPath);
    }
  } catch (error) {
    if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
    console.log(`⚠️  ${filePath}: 壓縮失敗 - ${error.message}`);
  }
}

async function scanDirectory(dir) {
  if (!fs.existsSync(dir)) return;
  for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, item.name);
    if (item.isDirectory()) {
      if (item.name.startsWith('.') || item.name === 'node_modules') continue;
      await scanDirectory(full);
    } else if (item.isFile()) {
      await optimizeImage(full);
    }
  }
}

(async () => {
  console.log(`🖼️  Optimizing images...${DRY_RUN ? '  [DRY-RUN，不會寫檔]' : ''}`);
  console.log(`工具：${MAGICK ? `ImageMagick (${MAGICK})` : sharpLib ? 'sharp' : '無'}\n`);

  for (const dir of IMAGE_DIRS) {
    if (!fs.existsSync(dir)) continue;
    console.log(`Scanning ${dir}/`);
    await scanDirectory(dir);
  }

  console.log('\n📊 Optimization Results:');
  console.log(`${DRY_RUN ? '可壓縮' : '已壓縮'}：${optimizedCount} 張`);
  console.log(`${DRY_RUN ? '可省空間' : '省下空間'}：${formatBytes(totalSaved)}`);
  if (skippedNoTool) {
    console.log(`⚠️  ${skippedNoTool} 張被跳過：找不到 ImageMagick 或 sharp`);
    console.log('   brew install imagemagick   或   npm install --save-dev sharp');
  }
  if (optimizedCount === 0 && !skippedNoTool) console.log('ℹ️  沒有需要壓縮的圖片');
})();
