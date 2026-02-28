/**
 * Uso: node capture-url.mjs <url> <numero>
 * Ex:  node capture-url.mjs https://meusite.com.br 1
 * Salva como site1.jpg na pasta atual
 */
import puppeteer from 'puppeteer';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const url    = process.argv[2];
const numero = process.argv[3];

if (!url || !numero) {
  console.error('Uso: node capture-url.mjs <url> <numero>');
  process.exit(1);
}

const outFile = `site${numero}.jpg`;
const outPath = join(__dirname, outFile);

console.log(`\n📸 Capturando site${numero}: ${url}`);

const browser = await puppeteer.launch({
  headless: true,
  args: [
    '--no-sandbox',
    '--disable-setuid-sandbox',
    '--disable-dev-shm-usage',
    '--disable-blink-features=AutomationControlled',
  ],
  defaultViewport: {
    width: 1440,
    height: 900,
    deviceScaleFactor: 2,   // resolução 2x (retina) = imagem 2880×1800
  },
});

const page = await browser.newPage();

await page.setUserAgent(
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'
);

// Ignora erros de certificado (útil para sistemas internos/staging)
await page.setBypassCSP(true);

try {
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 45000 });
} catch {
  // Se networkidle2 falhar, tenta com load normal
  await page.goto(url, { waitUntil: 'load', timeout: 30000 });
}

// Remove cookie banners / modais comuns
await page.evaluate(() => {
  const sel = [
    '[id*="cookie"]','[class*="cookie"]',
    '[id*="consent"]','[class*="consent"]',
    '[id*="banner"]','[class*="banner"]',
    '[id*="popup"]','[class*="popup"]',
    '[id*="overlay"]','[class*="overlay"]',
  ];
  sel.forEach(s => document.querySelectorAll(s).forEach(el => el.remove()));
}).catch(() => {});

// Aguarda renderização completa
await new Promise(r => setTimeout(r, 3000));

// Screenshot do viewport superior (above the fold) — 1440×900 @2x
await page.screenshot({
  path: outPath,
  type: 'jpeg',
  quality: 95,
  clip: { x: 0, y: 0, width: 1440, height: 900 },
});

await browser.close();

console.log(`✅ Salvo: ${outFile}  (resolução 2880×1800 @2x, JPEG 95%)\n`);
