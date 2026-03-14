#!/usr/bin/env node
/**
 * process-specials.mjs
 * Reads ZIP files from a source directory, inlines CSS/JS/images,
 * and outputs self-contained HTML files to public/specials/.
 * Also generates src/data/_specials-manifest.json.
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

const SRC_DIR = '/Users/yageloshri/Downloads/Telegram Desktop';
const OUT_DIR = path.join(ROOT, 'public', 'specials-demos');
const MANIFEST_PATH = path.join(ROOT, 'src', 'data', '_specials-manifest.json');
const TMP_BASE = path.join(ROOT, '.tmp-specials');

const IMAGE_EXTS = new Set(['.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp', '.ico', '.avif']);
const VIDEO_EXTS = new Set(['.mp4', '.webm', '.ogg']);
const MAX_INLINE_SIZE = 3 * 1024 * 1024; // 3MB

function slugify(name) {
  return name
    .toLowerCase()
    .replace(/[()]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function mimeForExt(ext) {
  const map = {
    '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
    '.gif': 'image/gif', '.svg': 'image/svg+xml', '.webp': 'image/webp',
    '.ico': 'image/x-icon', '.avif': 'image/avif',
    '.mp4': 'video/mp4', '.webm': 'video/webm', '.ogg': 'video/ogg',
  };
  return map[ext] || 'application/octet-stream';
}

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function processZip(zipPath) {
  const zipName = path.basename(zipPath, '.zip');
  const slug = slugify(zipName);
  const tmpDir = path.join(TMP_BASE, slug);

  ensureDir(tmpDir);

  // Extract ZIP
  execSync(`unzip -o -q "${zipPath}" -d "${tmpDir}"`);

  // Find the actual content directory (ZIPs have a folder inside)
  let contentDir = tmpDir;
  const entries = fs.readdirSync(tmpDir).filter(e => !e.startsWith('__MACOSX') && !e.startsWith('.'));
  if (entries.length === 1 && fs.statSync(path.join(tmpDir, entries[0])).isDirectory()) {
    contentDir = path.join(tmpDir, entries[0]);
  }

  // Find index.html - check subdirectories and alternative names
  let indexPath = path.join(contentDir, 'index.html');
  if (!fs.existsSync(indexPath)) {
    // Check one level deeper (double-nested dirs or subdirs like Button1/)
    const subEntries = fs.readdirSync(contentDir).filter(e => !e.startsWith('__MACOSX') && !e.startsWith('.') && !e.startsWith('node_modules'));
    for (const sub of subEntries) {
      const subPath = path.join(contentDir, sub);
      if (fs.statSync(subPath).isDirectory()) {
        const candidate = path.join(subPath, 'index.html');
        if (fs.existsSync(candidate)) {
          contentDir = subPath;
          indexPath = candidate;
          break;
        }
      }
    }
    // Still not found? Look for any .html file in contentDir
    if (!fs.existsSync(indexPath)) {
      const htmlFiles = fs.readdirSync(contentDir).filter(f => f.endsWith('.html'));
      if (htmlFiles.length > 0) {
        indexPath = path.join(contentDir, htmlFiles[0]);
      } else {
        console.warn(`  SKIP: No HTML file in ${zipName}`);
        return null;
      }
    }
  }

  let html = fs.readFileSync(indexPath, 'utf-8');

  // Find CSS file (style.css or any .css file)
  let css = '';
  const cssPath = path.join(contentDir, 'style.css');
  if (fs.existsSync(cssPath)) {
    css = fs.readFileSync(cssPath, 'utf-8');
  } else {
    const cssFiles = fs.readdirSync(contentDir).filter(f => f.endsWith('.css'));
    if (cssFiles.length > 0) {
      css = fs.readFileSync(path.join(contentDir, cssFiles[0]), 'utf-8');
      // Replace the link tag for this specific CSS file
      const cssFileName = cssFiles[0];
      const cssEscaped = cssFileName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      html = html.replace(new RegExp(`<link[^>]*href=["'](?:\\.\\/)?${cssEscaped}["'][^>]*\\/?>`, 'gi'), '');
    }
  }

  // Read all JS files (script.js + any library JS files)
  const allFiles = fs.readdirSync(contentDir);
  const jsFiles = allFiles.filter(f => f.endsWith('.js'));
  const jsContents = {};
  for (const jsFile of jsFiles) {
    jsContents[jsFile] = fs.readFileSync(path.join(contentDir, jsFile), 'utf-8');
  }

  // Handle images and videos
  const assetSlugDir = path.join(OUT_DIR, slug);
  const mediaFiles = allFiles.filter(f => {
    const ext = path.extname(f).toLowerCase();
    return IMAGE_EXTS.has(ext) || VIDEO_EXTS.has(ext);
  });

  const assetReplacements = {};
  for (const file of mediaFiles) {
    const filePath = path.join(contentDir, file);
    const stat = fs.statSync(filePath);
    const ext = path.extname(file).toLowerCase();

    if (stat.size < MAX_INLINE_SIZE && IMAGE_EXTS.has(ext)) {
      // Inline as base64
      const data = fs.readFileSync(filePath);
      const b64 = data.toString('base64');
      assetReplacements[file] = `data:${mimeForExt(ext)};base64,${b64}`;
    } else {
      // Copy to public/specials/[slug]/ and reference relatively
      ensureDir(assetSlugDir);
      fs.copyFileSync(filePath, path.join(assetSlugDir, file));
      assetReplacements[file] = `./${slug}/${file}`;
    }
  }

  // Inline CSS: replace <link rel="stylesheet" href="style.css"> with <style>
  if (css) {
    // Replace asset references in CSS (handle both ./file and file)
    for (const [file, replacement] of Object.entries(assetReplacements)) {
      css = css.split(`./${file}`).join(replacement);
      css = css.split(file).join(replacement);
    }
    // Remove the link tag and inject style (handles ./style.css and style.css)
    html = html.replace(/<link[^>]*href=["']\.?\/?\s*style\.css["'][^>]*\/?>/gi, '');
    html = html.replace('</head>', `<style>\n${css}\n</style>\n</head>`);
  }

  // Inline JS: replace <script src="..."> with inline <script>
  for (const [jsFile, jsContent] of Object.entries(jsContents)) {
    let content = jsContent;
    // Replace asset references in JS (handle both ./file and file)
    for (const [file, replacement] of Object.entries(assetReplacements)) {
      content = content.split(`./${file}`).join(replacement);
      content = content.split(file).join(replacement);
    }
    const escaped = jsFile.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const srcPattern = new RegExp(`<script[^>]*src=["'](?:\\.\\/)?${escaped}["'][^>]*>\\s*</script>`, 'gi');
    html = html.replace(srcPattern, `<script>\n${content}\n</script>`);
  }

  // Replace remaining asset references in HTML (handle both ./file and file)
  for (const [file, replacement] of Object.entries(assetReplacements)) {
    html = html.split(`./${file}`).join(replacement);
    html = html.split(file).join(replacement);
  }

  // Add viewport meta if missing
  if (!html.includes('viewport')) {
    html = html.replace('</head>', '<meta name="viewport" content="width=device-width, initial-scale=1.0">\n</head>');
  }

  // Write output
  const outPath = path.join(OUT_DIR, `${slug}.html`);
  fs.writeFileSync(outPath, html, 'utf-8');

  console.log(`  ✓ ${zipName} → ${slug}.html`);
  return { slug, title: zipName };
}

// Main
console.log('Processing specials...');
console.log(`Source: ${SRC_DIR}`);
console.log(`Output: ${OUT_DIR}\n`);

ensureDir(OUT_DIR);
ensureDir(TMP_BASE);

const zipFiles = fs.readdirSync(SRC_DIR)
  .filter(f => f.endsWith('.zip') && f !== 'Archive.zip')
  .sort();

console.log(`Found ${zipFiles.length} ZIP files\n`);

const manifest = [];
for (const zipFile of zipFiles) {
  const result = processZip(path.join(SRC_DIR, zipFile));
  if (result) manifest.push(result);
}

// Write manifest
ensureDir(path.dirname(MANIFEST_PATH));
fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2), 'utf-8');

// Cleanup temp
fs.rmSync(TMP_BASE, { recursive: true, force: true });

console.log(`\nDone! ${manifest.length} specials processed.`);
console.log(`Manifest: ${MANIFEST_PATH}`);
