const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, 'out');
fs.readdirSync(outDir).forEach(f => {
  if (f.endsWith('.html') && f !== 'index.html' && f !== '404.html' && f !== '_not-found.html') {
    const name = f.replace('.html', '');
    const dir = path.join(outDir, name);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.copyFileSync(path.join(outDir, f), path.join(dir, 'index.html'));
  }
});
