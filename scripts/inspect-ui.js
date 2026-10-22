import http from 'http';
import fs from 'fs';
import path from 'path';
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '../dist');

const mimeTypes = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
};

const server = http.createServer((req, res) => {
  let reqPath = req.url.split('?')[0];
  if (reqPath === '/') reqPath = '/index.html';

  const filePath = path.join(distDir, reqPath);
  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath);
    res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
    res.end(fs.readFileSync(filePath));
  } else {
    res.writeHead(404);
    res.end('Not found');
  }
});

function captureScreenshot(chromePath, url, outputPath, windowSize) {
  return new Promise((resolve, reject) => {
    const args = [
      '--headless=new',
      '--no-sandbox',
      '--disable-gpu',
      `--window-size=${windowSize}`,
      '--hide-scrollbars',
      `--screenshot=${outputPath}`,
      url,
    ];

    const proc = spawn(chromePath, args);
    proc.on('close', (code) => {
      if (code === 0) resolve();
      else reject(new Error(`Chrome exited with code ${code}`));
    });
    proc.on('error', reject);
  });
}

server.listen(5199, async () => {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const screenshotsDir = path.resolve(__dirname, '../screenshots');
  fs.mkdirSync(screenshotsDir, { recursive: true });

  try {
    console.log('Capturing website-themed layout screenshots...');

    // 1. Dashboard Public Overview
    await captureScreenshot(chromePath, 'http://localhost:5199/?view=dashboard', path.join(screenshotsDir, 'dashboard-website-theme.png'), '1280,850');
    console.log('✓ dashboard-website-theme.png');

    // 2. Pure Extension Popup
    await captureScreenshot(chromePath, 'http://localhost:5199/extension/popup.html', path.join(screenshotsDir, 'popup-website-theme.png'), '390,620');
    console.log('✓ popup-website-theme.png');

    // 3. Extension Simulator Harness
    await captureScreenshot(chromePath, 'http://localhost:5199/', path.join(screenshotsDir, 'simulator-website-theme.png'), '1280,950');
    console.log('✓ simulator-website-theme.png');

    console.log('Capture suite complete.');
  } catch (err) {
    console.error('Error during capture:', err);
  } finally {
    server.close();
  }
});
