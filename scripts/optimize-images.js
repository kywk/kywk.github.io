#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const IMAGE_DIRS = ['static/img', 'assets', 'backpacker', 'lifehacker', 'moco'];
const MAX_WIDTH = 1920;
const QUALITY = 85;
const SUPPORTED_FORMATS = ['.jpg', '.jpeg', '.png', '.webp'];

let optimizedCount = 0;
let totalSaved = 0;

function getFileSize(filePath) {
  return fs.statSync(filePath).size;
}

function formatBytes(bytes) {
  return (bytes / 1024 / 1024).toFixed(2) + ' MB';
}

function optimizeImage(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (!SUPPORTED_FORMATS.includes(ext)) return;
  
  const originalSize = getFileSize(filePath);
  if (originalSize < 100 * 1024) return; // Skip files < 100KB
  
  const tempPath = filePath + '.tmp';
  
  try {
    // Check if ImageMagick is available
    execSync('which convert', { stdio: 'ignore' });
    
    // Optimize with ImageMagick
    const cmd = `convert "${filePath}" -resize "${MAX_WIDTH}x${MAX_WIDTH}>" -quality ${QUALITY} "${tempPath}"`;
    execSync(cmd, { stdio: 'ignore' });
    
    const newSize = getFileSize(tempPath);
    const saved = originalSize - newSize;
    
    if (saved > 0) {
      fs.renameSync(tempPath, filePath);
      optimizedCount++;
      totalSaved += saved;
      console.log(`✅ ${filePath}: ${formatBytes(originalSize)} → ${formatBytes(newSize)} (saved ${formatBytes(saved)})`);
    } else {
      fs.unlinkSync(tempPath);
    }
    
  } catch (error) {
    if (fs.existsSync(tempPath)) {
      fs.unlinkSync(tempPath);
    }
    
    // Fallback: Try with sharp if available
    try {
      const sharp = require('sharp');
      
      sharp(filePath)
        .resize(MAX_WIDTH, MAX_WIDTH, { 
          fit: 'inside',
          withoutEnlargement: true 
        })
        .jpeg({ quality: QUALITY })
        .toFile(tempPath)
        .then(() => {
          const newSize = getFileSize(tempPath);
          const saved = originalSize - newSize;
          
          if (saved > 0) {
            fs.renameSync(tempPath, filePath);
            optimizedCount++;
            totalSaved += saved;
            console.log(`✅ ${filePath}: ${formatBytes(originalSize)} → ${formatBytes(newSize)} (saved ${formatBytes(saved)})`);
          } else {
            fs.unlinkSync(tempPath);
          }
        })
        .catch(() => {
          console.log(`⚠️  ${filePath}: Optimization failed`);
        });
        
    } catch (sharpError) {
      console.log(`⚠️  ${filePath}: No optimization tools available (install ImageMagick or Sharp)`);
    }
  }
}

function scanDirectory(dir) {
  if (!fs.existsSync(dir)) return;
  
  const items = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const item of items) {
    const fullPath = path.join(dir, item.name);
    
    if (item.isDirectory()) {
      scanDirectory(fullPath);
    } else if (item.isFile()) {
      optimizeImage(fullPath);
    }
  }
}

console.log('🖼️  Optimizing images...\n');

IMAGE_DIRS.forEach(dir => {
  if (fs.existsSync(dir)) {
    console.log(`Scanning ${dir}/`);
    scanDirectory(dir);
  }
});

console.log(`\n📊 Optimization Results:`);
console.log(`Images optimized: ${optimizedCount}`);
console.log(`Total space saved: ${formatBytes(totalSaved)}`);

if (optimizedCount === 0) {
  console.log('ℹ️  No images needed optimization');
} else {
  console.log('✅ Image optimization completed!');
}
