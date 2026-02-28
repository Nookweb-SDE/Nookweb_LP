import { createServer } from 'http';
import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const server = createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  if (req.method === 'POST') {
    const filename = req.url.replace('/', '');
    const chunks = [];
    req.on('data', chunk => chunks.push(chunk));
    req.on('end', () => {
      const buffer = Buffer.concat(chunks);
      const savePath = join(__dirname, filename);
      writeFileSync(savePath, buffer);
      console.log(`Salvo: ${savePath} (${buffer.length} bytes)`);
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('OK');
    });
    return;
  }

  res.writeHead(404);
  res.end();
});

server.listen(3099, '127.0.0.1', () => {
  console.log('Servidor de screenshots rodando em http://127.0.0.1:3099');
});
