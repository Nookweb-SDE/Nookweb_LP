import { execSync } from 'child_process';
import { existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Tenta importar puppeteer
let puppeteer;
try {
  const mod = await import('puppeteer');
  puppeteer = mod.default;
} catch (e) {
  console.log('Puppeteer não encontrado, instalando...');
  execSync('npm install puppeteer', { stdio: 'inherit', cwd: __dirname });
  const mod = await import('puppeteer');
  puppeteer = mod.default;
}

const sites = [
  { file: 'site1.jpg', url: 'https://stripe.com', label: 'Sites de Alto Impacto' },
  { file: 'site2.jpg', url: 'https://expo.dev', label: 'Aplicativos Mobile' },
  { file: 'site3.jpg', url: 'https://vercel.com', label: 'Plataformas SaaS' },
  { file: 'site4.jpg', url: 'https://supabase.com', label: 'BaaS & Infraestrutura' },
  { file: 'site5.jpg', url: 'https://n8n.io', label: 'Automações N8N' },
  { file: 'site6.jpg', url: 'https://figma.com', label: 'UI/UX Design' },
  { file: 'site7.jpg', url: 'https://webflow.com', label: 'No-Code + Código' },
  { file: 'site8.jpg', url: 'https://openai.com', label: 'IA Integrada' },
];

console.log('Iniciando capturas de screenshot...\n');

const browser = await puppeteer.launch({
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
});

for (const site of sites) {
  const outPath = join(__dirname, site.file);
  console.log(`📸 Capturando: ${site.label} (${site.url})`);

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 853 }); // proporção 3:2
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

    await page.goto(site.url, { waitUntil: 'networkidle2', timeout: 30000 });

    // Aguarda um pouco para renderizar
    await new Promise(r => setTimeout(r, 2000));

    // Tira screenshot e salva como JPG
    await page.screenshot({
      path: outPath,
      type: 'jpeg',
      quality: 90,
      clip: { x: 0, y: 0, width: 1280, height: 853 }
    });

    await page.close();
    console.log(`   ✅ Salvo: ${site.file}`);
  } catch (err) {
    console.error(`   ❌ Erro em ${site.url}: ${err.message}`);
  }
}

await browser.close();
console.log('\n✅ Todas as capturas concluídas!');
