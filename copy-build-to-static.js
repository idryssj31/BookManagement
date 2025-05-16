// copy-build-to-static.js
const fs = require('fs');
const path = require('path');

const src = path.join(__dirname, 'build');
const dest = path.join(__dirname, 'src', 'main', 'resources', 'static');

function copyRecursiveSync(srcDir, destDir) {
  if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });
  for (const item of fs.readdirSync(srcDir)) {
    const srcPath = path.join(srcDir, item);
    const destPath = path.join(destDir, item);
    if (fs.lstatSync(srcPath).isDirectory()) {
      copyRecursiveSync(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

copyRecursiveSync(src, dest);
console.log('Copie terminée !');