const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, 'out');
const pages = ['effects', 'fonts', 'icons', 'libraries', 'templates', 'specials'];

// 1. Create redirect index.html for clean URLs (/effects/ → /effects.html)
pages.forEach(name => {
  const dir = path.join(outDir, name);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'),
    `<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0;url=/${name}.html"><link rel="canonical" href="/${name}.html"></head><body></body></html>`
  );
});

// 2. Fix navigation links to use .html extension
function fixLinks(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');

  pages.forEach(name => {
    // All forms: href="/effects", href="./effects", href="/effects/", href="./effects/"
    const patterns = [
      [`href="/${name}"`, `href="./${name}.html"`],
      [`href="./${name}"`, `href="./${name}.html"`],
      [`href="/${name}/"`, `href="./${name}.html"`],
      [`href="./${name}/"`, `href="./${name}.html"`],
      // RSC payload JSON
      [`"href":"/${name}"`, `"href":"./${name}.html"`],
      [`"href":"./${name}"`, `"href":"./${name}.html"`],
      [`"href":"/${name}/"`, `"href":"./${name}.html"`],
      [`"href":"./${name}/"`, `"href":"./${name}.html"`],
    ];
    patterns.forEach(([from, to]) => {
      content = content.split(from).join(to);
    });
  });

  // Fix specials/[slug] dynamic links (avoid matching .html paths)
  content = content.replace(/href="\/specials\/([^"\/]+?)(?<!\.html)"/g, 'href="./specials/$1.html"');
  content = content.replace(/href="\.\/specials\/([^"\/]+?)(?<!\.html)"/g, 'href="./specials/$1.html"');
  content = content.replace(/"href":"\/specials\/([^"\/]+?)(?<!\.html)"/g, '"href":"./specials/$1.html"');
  content = content.replace(/"href":"\.\/specials\/([^"\/]+?)(?<!\.html)"/g, '"href":"./specials/$1.html"');

  // Fix home link: href="/" → href="./index.html"
  content = content.replace(/href="\/"/g, 'href="./index.html"');
  content = content.replace(/"href":"\/"/g, '"href":"./index.html"');

  // Remove base tag
  content = content.replace(/<base\s+href="[^"]*"\s*\/?>/g, '');

  fs.writeFileSync(filePath, content, 'utf-8');
}

// Fix all root-level HTML files
fs.readdirSync(outDir).forEach(f => {
  if (f.endsWith('.html') && f !== '404.html') {
    fixLinks(path.join(outDir, f));
  }
});

// 3. Handle specials/[id] dynamic routes
const specialsDir = path.join(outDir, 'specials');
if (fs.existsSync(specialsDir)) {
  fs.readdirSync(specialsDir).forEach(f => {
    const full = path.join(specialsDir, f);
    if (f.endsWith('.html') && f !== 'index.html') {
      // Fix links in specials sub-pages
      fixLinks(full);
      // Create redirect: specials/[slug]/index.html → specials/[slug].html
      const slug = f.replace('.html', '');
      const redirectDir = path.join(specialsDir, slug);
      // Don't overwrite if it's an asset directory (like spooky-login-form/)
      if (!fs.existsSync(redirectDir)) {
        fs.mkdirSync(redirectDir, { recursive: true });
      }
      const redirectPath = path.join(redirectDir, 'index.html');
      if (!fs.existsSync(redirectPath)) {
        fs.writeFileSync(redirectPath,
          `<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0;url=/specials/${slug}.html"><link rel="canonical" href="/specials/${slug}.html"></head><body></body></html>`
        );
      }
    }
  });
}

console.log('Done: all links use .html extension, redirect pages created');
