import fs from 'fs';
import path from 'path';
import zlib from 'zlib';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper to write a PNG chunk
function createChunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);

  const typeBuf = Buffer.from(type, 'ascii');
  const body = Buffer.concat([typeBuf, data]);

  const crc = crc32(body);
  const crcBuf = Buffer.alloc(4);
  crcBuf.writeUInt32BE(crc, 0);

  return Buffer.concat([len, body, crcBuf]);
}

// CRC32 implementation
const crcTable = new Uint32Array(256);
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++) {
    c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  }
  crcTable[n] = c;
}

function crc32(buf) {
  let crc = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    crc = crcTable[(crc ^ buf[i]) & 0xff] ^ (crc >>> 8);
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function generatePng(size) {
  const width = size;
  const height = size;
  const rawData = Buffer.alloc(height * (1 + width * 4));

  // Forest green: #176B4D -> R: 23, G: 107, B: 77
  const rBg = 23, gBg = 107, bBg = 77;
  // White shield glyph
  const rFg = 255, gFg = 255, bFg = 255;

  let offset = 0;
  for (let y = 0; y < height; y++) {
    rawData[offset++] = 0; // Filter: None
    const ny = (y / (height - 1)) * 2 - 1; // -1 to 1

    for (let x = 0; x < width; x++) {
      const nx = (x / (width - 1)) * 2 - 1; // -1 to 1

      // Rounded rectangle container
      const cornerRadius = 0.75;
      const ax = Math.abs(nx);
      const ay = Math.abs(ny);
      const isInsideBase = ax < 0.88 && ay < 0.88;

      // Shield shape inside
      // Top curve / flat, tapering down to a point at bottom
      const shieldTop = -0.55;
      const shieldBottom = 0.58;
      const shieldWidth = 0.52;
      let isShield = false;

      if (ny >= shieldTop && ny <= shieldBottom) {
        let maxW;
        if (ny < 0.1) {
          maxW = shieldWidth;
        } else {
          // taper down
          const t = (ny - 0.1) / (shieldBottom - 0.1);
          maxW = shieldWidth * (1 - t * 0.95);
        }
        if (Math.abs(nx) <= maxW) {
          isShield = true;
        }
      }

      if (isInsideBase) {
        if (isShield && (Math.abs(nx) < 0.08 || ny > 0.35 || Math.abs(ny - shieldTop) < 0.1 || Math.abs(Math.abs(nx) - shieldWidth) < 0.1)) {
          // Shield highlight line
          rawData[offset++] = rFg;
          rawData[offset++] = gFg;
          rawData[offset++] = bFg;
          rawData[offset++] = 255;
        } else {
          rawData[offset++] = rBg;
          rawData[offset++] = gBg;
          rawData[offset++] = bBg;
          rawData[offset++] = 255;
        }
      } else {
        // Transparent outside
        rawData[offset++] = 0;
        rawData[offset++] = 0;
        rawData[offset++] = 0;
        rawData[offset++] = 0;
      }
    }
  }

  const deflated = zlib.deflateSync(rawData);

  // PNG Header
  const header = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

  // IHDR
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // Bit depth
  ihdr[9] = 6; // Color type: RGBA
  ihdr[10] = 0; // Compression
  ihdr[11] = 0; // Filter
  ihdr[12] = 0; // Interlace

  return Buffer.concat([
    header,
    createChunk('IHDR', ihdr),
    createChunk('IDAT', deflated),
    createChunk('IEND', Buffer.alloc(0))
  ]);
}

const iconsDir = path.resolve(__dirname, '../extension/icons');
fs.mkdirSync(iconsDir, { recursive: true });

for (const size of [16, 48, 128]) {
  const buf = generatePng(size);
  const filePath = path.join(iconsDir, `icon-${size}.png`);
  fs.writeFileSync(filePath, buf);
  console.log(`Generated ${filePath} (${size}x${size})`);
}

// Also write a clean SVG icon
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 24 24" fill="none">
  <rect width="24" height="24" rx="4" fill="#176B4D"/>
  <path d="M12 4L4 8V13C4 17.5 7.5 21.5 12 22C16.5 21.5 20 17.5 20 13V8L12 4Z" stroke="#FFFFFF" stroke-width="1.75" stroke-linejoin="round"/>
  <path d="M12 8V16M8.5 12H15.5" stroke="#FFFFFF" stroke-width="1.75" stroke-linecap="round"/>
</svg>`;
fs.writeFileSync(path.join(iconsDir, 'icon.svg'), svg, 'utf8');
console.log('Generated icon.svg');
