const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, 'out');

// 1. Copy .html files to dir/index.html for clean URL routing
fs.readdirSync(outDir).forEach(f => {
  if (f.endsWith('.html') && f !== 'index.html' && f !== '404.html' && f !== '_not-found.html') {
    const name = f.replace('.html', '');
    const dir = path.join(outDir, name);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.copyFileSync(path.join(outDir, f), path.join(dir, 'index.html'));
  }
});

// 2. Fix relative links to absolute in all HTML files
function fixHtmlLinks(dir) {
  fs.readdirSync(dir, { withFileTypes: true }).forEach(entry => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      fixHtmlLinks(full);
    } else if (entry.name.endsWith('.html')) {
      let html = fs.readFileSync(full, 'utf-8');
      // Replace href="./foo" with href="/foo" (relative to absolute)
      html = html.replace(/href="\.\//g, 'href="/');
      // Replace href="../foo" with href="/foo"
      html = html.replace(/href="\.\.\/([^"]*)"/g, 'href="/$1"');
      fs.writeFileSync(full, html, 'utf-8');
    }
  });
}
fixHtmlLinks(outDir);
