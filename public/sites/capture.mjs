import puppeteer from 'puppeteer';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const sites = [
  { file: 'site1.jpg', url: 'https://stripe.com',        label: 'Sites de Alto Impacto'   },
  { file: 'site2.jpg', url: 'https://expo.dev',           label: 'Aplicativos Mobile'       },
  { file: 'site3.jpg', url: 'https://vercel.com',         label: 'Plataformas SaaS'         },
  { file: 'site4.jpg', url: 'https://supabase.com',       label: 'BaaS & Infraestrutura'    },
  { file: 'site5.jpg', url: 'https://n8n.io',             label: 'Automações N8N'           },
  { file: 'site6.jpg', url: 'https://figma.com',          label: 'UI/UX Design'             },
  { file: 'site7.jpg', url: 'https://webflow.com',        label: 'No-Code + Código'         },
  { file: 'site8.jpg', url: 'https://openai.com',         label: 'IA Integrada'             },
];

console.log('🚀 Iniciando capturas full-page em alta qualidade...\n');

const browser = await puppeteer.launch({
  headless: true,
  args: [
    '--no-sandbox',
    '--disable-setuid-sandbox',
    '--disable-dev-shm-usage',
    '--disable-blink-features=AutomationControlled',
  ],
  defaultViewport: { width: 1440, height: 900, deviceScaleFactor: 2 }, // retina 2x
});

for (const site of sites) {
  const outPath = join(__dirname, site.file);
  console.log(`📸 [${site.label}]  →  ${site.url}`);

  try {
    const page = await browser.newPage();

    // User-agent humano para evitar bloqueios
    await page.setUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'
    );

    await page.goto(site.url, { waitUntil: 'networkidle2', timeout: 45000 });

    // Fecha cookie banners / popovers comuns
    await page.evaluate(() => {
      const selectors = [
        '[id*="cookie"]', '[class*="cookie"]',
        '[id*="consent"]', '[class*="consent"]',
        '[id*="banner"]', '[class*="banner"]',
        '[id*="popup"]',  '[class*="popup"]',
        '[id*="modal"]',  '[class*="modal"]',
      ];
      selectors.forEach(sel => {
        document.querySelectorAll(sel).forEach(el => el.remove());
      });
    });

    // Aguarda renderização final
    await new Promise(r => setTimeout(r, 2500));

    // Captura apenas a parte acima da dobra (above the fold) em alta res
    // 1440×900 @2x = imagem final 2880×1800 → será salva como JPG
    await page.screenshot({
      path: outPath,
      type: 'jpeg',
      quality: 92,
      clip: { x: 0, y: 0, width: 1440, height: 900 },
    });

    await page.close();
    console.log(`   ✅  Salvo: ${site.file}\n`);
  } catch (err) {
    console.error(`   ❌  Erro: ${err.message}\n`);
  }
}

await browser.close();
console.log('✅ Concluído! Todos os screenshots foram salvos.');
