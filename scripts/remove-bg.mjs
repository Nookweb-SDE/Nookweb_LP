// Remove black background from logo - make it transparent
import sharp from 'sharp';
import { renameSync, unlinkSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const input = join(__dirname, '../public/impulso-studio-logo.png');
const outputTemp = join(__dirname, '../public/impulso-studio-logo-temp.png');

const img = sharp(input);
const { data, info } = await img.raw().ensureAlpha().toBuffer({ resolveWithObject: true });
const { width, height, channels } = info;

// Make black/near-black pixels transparent (threshold ~80)
for (let i = 0; i < data.length; i += channels) {
  const r = data[i];
  const g = data[i + 1];
  const b = data[i + 2];
  const sum = r + g + b;
  if (sum < 80) {
    data[i + 3] = 0; // alpha = 0
  }
}

await sharp(Buffer.from(data), { raw: { width, height, channels } })
  .png()
  .toFile(outputTemp);

unlinkSync(input);
renameSync(outputTemp, input);
console.log('Background removed:', input);
