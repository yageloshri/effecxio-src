#!/bin/bash
# Effecxio — Icon Libraries Downloader
# הרץ מתיקיית הפרויקט: bash download-icons.sh

set -e
ICONS_DIR="public/icon-libraries"
mkdir -p "$ICONS_DIR"

echo "📦 מוריד ספריות אייקונים..."

# ══════════════════════
# 1. LUCIDE
# ══════════════════════
echo "⬇️  Lucide..."
curl -L "https://github.com/lucide-icons/lucide/archive/refs/heads/main.zip" \
  -o /tmp/lucide.zip 2>/dev/null
mkdir -p "$ICONS_DIR/lucide"
unzip -q /tmp/lucide.zip "*/icons/*.svg" -d /tmp/lucide-extract 2>/dev/null || true
find /tmp/lucide-extract -name "*.svg" -exec cp {} "$ICONS_DIR/lucide/" \;
rm -rf /tmp/lucide.zip /tmp/lucide-extract
COUNT=$(ls "$ICONS_DIR/lucide/" | wc -l)
echo "✅ Lucide: $COUNT אייקונים"

# ══════════════════════
# 2. TABLER ICONS
# ══════════════════════
echo "⬇️  Tabler Icons..."
curl -L "https://github.com/tabler/tabler-icons/archive/refs/heads/main.zip" \
  -o /tmp/tabler.zip 2>/dev/null
mkdir -p "$ICONS_DIR/tabler"
unzip -q /tmp/tabler.zip "*/icons/outline/*.svg" -d /tmp/tabler-extract 2>/dev/null || \
unzip -q /tmp/tabler.zip "*/icons/*.svg" -d /tmp/tabler-extract 2>/dev/null || true
find /tmp/tabler-extract -name "*.svg" -exec cp {} "$ICONS_DIR/tabler/" \;
rm -rf /tmp/tabler.zip /tmp/tabler-extract
COUNT=$(ls "$ICONS_DIR/tabler/" | wc -l)
echo "✅ Tabler: $COUNT אייקונים"

# ══════════════════════
# 3. HEROICONS
# ══════════════════════
echo "⬇️  Heroicons..."
curl -L "https://github.com/tailwindlabs/heroicons/archive/refs/heads/master.zip" \
  -o /tmp/heroicons.zip 2>/dev/null
mkdir -p "$ICONS_DIR/heroicons-outline" "$ICONS_DIR/heroicons-solid"
unzip -q /tmp/heroicons.zip "*/src/24/outline/*.svg" -d /tmp/heroicons-extract 2>/dev/null || true
unzip -q /tmp/heroicons.zip "*/src/24/solid/*.svg" -d /tmp/heroicons-extract 2>/dev/null || true
find /tmp/heroicons-extract -path "*/outline/*.svg" -exec cp {} "$ICONS_DIR/heroicons-outline/" \;
find /tmp/heroicons-extract -path "*/solid/*.svg" -exec cp {} "$ICONS_DIR/heroicons-solid/" \;
rm -rf /tmp/heroicons.zip /tmp/heroicons-extract
COUNT=$(ls "$ICONS_DIR/heroicons-outline/" | wc -l)
echo "✅ Heroicons: $COUNT אייקונים (outline + solid)"

# ══════════════════════
# 4. PHOSPHOR
# ══════════════════════
echo "⬇️  Phosphor Icons..."
curl -L "https://github.com/phosphor-icons/core/archive/refs/heads/main.zip" \
  -o /tmp/phosphor.zip 2>/dev/null
mkdir -p "$ICONS_DIR/phosphor"
unzip -q /tmp/phosphor.zip "*/assets/regular/*.svg" -d /tmp/phosphor-extract 2>/dev/null || \
unzip -q /tmp/phosphor.zip "*/raw/regular/*.svg" -d /tmp/phosphor-extract 2>/dev/null || true
find /tmp/phosphor-extract -name "*.svg" -exec cp {} "$ICONS_DIR/phosphor/" \;
rm -rf /tmp/phosphor.zip /tmp/phosphor-extract
COUNT=$(ls "$ICONS_DIR/phosphor/" | wc -l)
echo "✅ Phosphor: $COUNT אייקונים"

# ══════════════════════
# 5. ICONOIR
# ══════════════════════
echo "⬇️  Iconoir..."
curl -L "https://github.com/iconoir-icons/iconoir/archive/refs/heads/main.zip" \
  -o /tmp/iconoir.zip 2>/dev/null
mkdir -p "$ICONS_DIR/iconoir"
unzip -q /tmp/iconoir.zip "*/icons/regular/*.svg" -d /tmp/iconoir-extract 2>/dev/null || \
unzip -q /tmp/iconoir.zip "*/icons/*.svg" -d /tmp/iconoir-extract 2>/dev/null || true
find /tmp/iconoir-extract -name "*.svg" -exec cp {} "$ICONS_DIR/iconoir/" \;
rm -rf /tmp/iconoir.zip /tmp/iconoir-extract
COUNT=$(ls "$ICONS_DIR/iconoir/" | wc -l)
echo "✅ Iconoir: $COUNT אייקונים"

# ══════════════════════
# 6. RADIX ICONS
# ══════════════════════
echo "⬇️  Radix Icons..."
curl -L "https://github.com/radix-ui/icons/archive/refs/heads/master.zip" \
  -o /tmp/radix.zip 2>/dev/null
mkdir -p "$ICONS_DIR/radix"
unzip -q /tmp/radix.zip "*/packages/radix-icons/icons/*.svg" -d /tmp/radix-extract 2>/dev/null || \
unzip -q /tmp/radix.zip "*/icons/*.svg" -d /tmp/radix-extract 2>/dev/null || true
find /tmp/radix-extract -name "*.svg" -exec cp {} "$ICONS_DIR/radix/" \;
rm -rf /tmp/radix.zip /tmp/radix-extract
COUNT=$(ls "$ICONS_DIR/radix/" | wc -l)
echo "✅ Radix: $COUNT אייקונים"

# ══════════════════════
# 7. BOOTSTRAP ICONS
# ══════════════════════
echo "⬇️  Bootstrap Icons..."
curl -L "https://github.com/twbs/icons/releases/latest/download/bootstrap-icons.zip" \
  -o /tmp/bootstrap.zip 2>/dev/null || \
curl -L "https://github.com/twbs/icons/archive/refs/heads/main.zip" \
  -o /tmp/bootstrap.zip 2>/dev/null
mkdir -p "$ICONS_DIR/bootstrap"
unzip -q /tmp/bootstrap.zip "*/icons/*.svg" -d /tmp/bootstrap-extract 2>/dev/null || \
unzip -q /tmp/bootstrap.zip "*.svg" -d /tmp/bootstrap-extract 2>/dev/null || true
find /tmp/bootstrap-extract -name "*.svg" -exec cp {} "$ICONS_DIR/bootstrap/" \;
rm -rf /tmp/bootstrap.zip /tmp/bootstrap-extract
COUNT=$(ls "$ICONS_DIR/bootstrap/" | wc -l)
echo "✅ Bootstrap: $COUNT אייקונים"

# ══════════════════════
# סיכום
# ══════════════════════
echo ""
echo "═══════════════════════════════"
echo "✅ הורדה הושלמה!"
echo "═══════════════════════════════"
echo ""
for dir in "$ICONS_DIR"/*/; do
  name=$(basename "$dir")
  count=$(ls "$dir" 2>/dev/null | wc -l)
  echo "  $name: $count אייקונים"
done
echo ""
TOTAL=$(find "$ICONS_DIR" -name "*.svg" | wc -l)
echo "  סה״כ: $TOTAL אייקונים"
echo ""

# ══════════════════════════════════════════════
# צור index JSON לכל ספרייה
# ══════════════════════════════════════════════
echo "📝 בונה index.json..."
node -e "
const fs = require('fs');
const path = require('path');
const dir = '$ICONS_DIR';
const libs = {};
for (const lib of fs.readdirSync(dir)) {
  const libPath = path.join(dir, lib);
  if (!fs.statSync(libPath).isDirectory()) continue;
  const files = fs.readdirSync(libPath).filter(f => f.endsWith('.svg'));
  libs[lib] = { count: files.length, icons: files.map(f => f.replace('.svg', '')) };
}
fs.writeFileSync(path.join(dir, 'index.json'), JSON.stringify(libs, null, 2));
console.log('✅ index.json נוצר');
"

echo ""
echo "🎉 הכל מוכן!"
echo ""
