import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

console.log('--- Building TRACEShield AI Chrome Extension ---');

// 1. Run Vite extension build
execSync('npx vite build --config vite.extension.config.ts', {
  cwd: rootDir,
  stdio: 'inherit',
});

const distExtension = path.join(rootDir, 'dist-extension');

// 2. Ensure manifest.json is in dist-extension
fs.copyFileSync(
  path.join(rootDir, 'extension/manifest.json'),
  path.join(distExtension, 'manifest.json')
);
console.log('✓ Copied manifest.json');

// 3. Ensure icons are in dist-extension/icons
const iconsDest = path.join(distExtension, 'icons');
fs.mkdirSync(iconsDest, { recursive: true });
const iconsSrc = path.join(rootDir, 'extension/icons');
for (const file of fs.readdirSync(iconsSrc)) {
  fs.copyFileSync(path.join(iconsSrc, file), path.join(iconsDest, file));
}
console.log('✓ Copied icons to dist-extension/icons');

// 4. If popup.html is nested under dist-extension/extension/popup.html, move/copy it to root
const nestedPopup = path.join(distExtension, 'extension/popup.html');
const rootPopup = path.join(distExtension, 'popup.html');

if (fs.existsSync(nestedPopup)) {
  let content = fs.readFileSync(nestedPopup, 'utf8');
  // Fix relative script and link paths if needed
  content = content.replace(/(href|src)="(\.\.\/)+assets\//g, '$1="./assets/');
  fs.writeFileSync(rootPopup, content, 'utf8');
  console.log('✓ Standardized dist-extension/popup.html');
}

console.log('\nTRACEShield AI Extension successfully built in dist-extension/ !');
console.log('Ready to load unpacked into Chrome:');
console.log('1. Go to chrome://extensions');
console.log('2. Enable "Developer mode"');
console.log('3. Click "Load unpacked" and select "dist-extension"\n');
