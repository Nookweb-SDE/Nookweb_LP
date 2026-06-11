# Performance de Imagens — Nookweb LP

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reduzir de ~43 MB para ~5 MB os assets da LP convertendo PNG/JPG → WebP, adicionando lazy loading, code splitting nos case previews e pipeline vite-imagemin, sem alterar nenhum layout.

**Architecture:** Conversão one-time via `cwebp` CLI + atualização de referências no código. React.lazy() isola os ~30 case preview components do bundle inicial. vite-plugin-imagemin comprime automaticamente novas imagens em cada build futuro.

**Tech Stack:** cwebp 1.3.2, vite-plugin-imagemin, React.lazy + Suspense, Vite 5

---

## Mapa de arquivos

| Arquivo | Mudança |
|---|---|
| `public/revivaz/*.png` | Converter → WebP, remover originais |
| `public/sites/*.jpg` | Converter → WebP, remover originais |
| `public/*.png` / `public/*.jpg` / `public/*.jpeg` | Converter → WebP, remover originais |
| `src/data/heroCarousel.ts` | `.jpg` → `.webp` |
| `src/components/ui/HeroCarousel.tsx` | `fetchpriority="high"` + `loading="eager"` no `<img>` |
| `src/components/cases/previews/RevivazPreview.tsx` | `.png` → `.webp` + `loading="lazy"` |
| `src/components/cases/previews/LatEmPreview.tsx` | `.png` → `.webp` + `loading="lazy"` |
| `src/components/cases/previews/FitConnectPreview.tsx` | `.png` → `.webp` + `loading="lazy"` |
| `src/components/cases/previews/NookpetPreview.tsx` | `.png` → `.webp` + `loading="lazy"` |
| `src/components/cases/previews/EmplyPreview.tsx` | `.png` → `.webp` + `loading="lazy"` |
| `src/components/cases/previews/NookleadCRMPreview.tsx` | `.jpeg` → `.webp` + `loading="lazy"` |
| `src/components/cases/previews/N8nPortfolioPreview.tsx` | `.png` → `.webp` + `loading="lazy"` |
| `src/components/sections/CasesSection.tsx` | React.lazy() + Suspense no CasePreviewRenderer |
| `vite.config.ts` | vite-plugin-imagemin adicionado |
| `package.json` | devDependency vite-plugin-imagemin |

---

## Task 1: Converter imagens revivaz (27 MB → ~2.5 MB)

**Files:**
- Modify: `public/revivaz/` (converter PNG → WebP, remover originais)

- [ ] **Step 1: Converter os 4 PNGs do revivaz**

```bash
cd "/home/almirante/Área de trabalho/Nookweb/Nookweb_LP/public/revivaz"
cwebp -q 82 team.png -o team.webp
cwebp -q 82 hero-alt.png -o hero-alt.webp
cwebp -q 82 hero.png -o hero.webp
cwebp -q 82 partners.png -o partners.webp
```

- [ ] **Step 2: Verificar tamanhos pós-conversão**

```bash
du -sh /home/almirante/Área\ de\ trabalho/Nookweb/Nookweb_LP/public/revivaz/*.webp
```
Esperado: cada arquivo < 1 MB (team.png era 13 MB, deve virar ~800 KB)

- [ ] **Step 3: Remover originais**

```bash
rm "/home/almirante/Área de trabalho/Nookweb/Nookweb_LP/public/revivaz/team.png"
rm "/home/almirante/Área de trabalho/Nookweb/Nookweb_LP/public/revivaz/hero-alt.png"
rm "/home/almirante/Área de trabalho/Nookweb/Nookweb_LP/public/revivaz/hero.png"
rm "/home/almirante/Área de trabalho/Nookweb/Nookweb_LP/public/revivaz/partners.png"
```

- [ ] **Step 4: Commit**

```bash
cd "/home/almirante/Área de trabalho/Nookweb/Nookweb_LP"
git add public/revivaz/
git commit -m "perf: converter revivaz PNG → WebP (27 MB → ~2.5 MB)"
```

---

## Task 2: Converter imagens sites (11 MB → ~1.5 MB)

**Files:**
- Modify: `public/sites/` (converter JPG → WebP, remover originais)

- [ ] **Step 1: Converter os 8 JPGs do carousel**

```bash
cd "/home/almirante/Área de trabalho/Nookweb/Nookweb_LP/public/sites"
for f in site1.jpg site2.jpg site3.jpg site4.jpg site5.jpg site6.jpg site7.jpg site8.jpg; do
  cwebp -q 82 "$f" -o "${f%.jpg}.webp"
done
```

- [ ] **Step 2: Verificar tamanhos**

```bash
du -sh "/home/almirante/Área de trabalho/Nookweb/Nookweb_LP/public/sites/"*.webp
```
Esperado: cada arquivo < 300 KB (site2.jpg era 2.6 MB)

- [ ] **Step 3: Remover originais**

```bash
rm "/home/almirante/Área de trabalho/Nookweb/Nookweb_LP/public/sites/"*.jpg
```

- [ ] **Step 4: Commit**

```bash
cd "/home/almirante/Área de trabalho/Nookweb/Nookweb_LP"
git add public/sites/
git commit -m "perf: converter sites JPG → WebP (11 MB → ~1.5 MB)"
```

---

## Task 3: Converter demais imagens da raiz de public/

**Files:**
- Modify: `public/*.png`, `public/*.jpg`, `public/*.jpeg`

- [ ] **Step 1: Converter logos e screenshots (q=90 para nitidez)**

```bash
cd "/home/almirante/Área de trabalho/Nookweb/Nookweb_LP/public"
cwebp -q 90 latem-mascot.png -o latem-mascot.webp
cwebp -q 90 latem-logo.png -o latem-logo.webp
cwebp -q 90 monosphera-screenshot.png -o monosphera-screenshot.webp
cwebp -q 90 neural-texture.png -o neural-texture.webp
cwebp -q 90 logo-saas-imovel.png -o logo-saas-imovel.webp
cwebp -q 90 impulso-studio-logo.png -o impulso-studio-logo.webp
cwebp -q 90 impulso-studio-logo2.png -o impulso-studio-logo2.webp
cwebp -q 90 hero-phones-mockup.png -o hero-phones-mockup.webp
cwebp -q 90 hero-academia.png -o hero-academia.webp
cwebp -q 90 monosphera-dashboard-v3.png -o monosphera-dashboard-v3.webp
cwebp -q 90 logo-emply.png -o logo-emply.webp
cwebp -q 90 nookpet-logo.png -o nookpet-logo.webp
cwebp -q 90 v0-logo.png -o v0-logo.webp
cwebp -q 82 nooklead-logo.jpeg -o nooklead-logo.webp
```

- [ ] **Step 2: Converter n8n case-graphics**

```bash
cd "/home/almirante/Área de trabalho/Nookweb/Nookweb_LP/public/case-graphics/n8n"
cwebp -q 90 n8n-baas-certificado.png -o n8n-baas-certificado.webp
cwebp -q 90 n8n-blog-ia.png -o n8n-blog-ia.webp
cwebp -q 90 n8n-etl-diario.png -o n8n-etl-diario.webp
```

- [ ] **Step 3: Converter cases/**

```bash
cd "/home/almirante/Área de trabalho/Nookweb/Nookweb_LP/public/cases"
cwebp -q 82 monosphera-cover.jpg -o monosphera-cover.webp
```

- [ ] **Step 4: Remover originais**

```bash
cd "/home/almirante/Área de trabalho/Nookweb/Nookweb_LP/public"
rm latem-mascot.png latem-logo.png monosphera-screenshot.png neural-texture.png \
   logo-saas-imovel.png impulso-studio-logo.png impulso-studio-logo2.png \
   hero-phones-mockup.png hero-academia.png monosphera-dashboard-v3.png \
   logo-emply.png nookpet-logo.png v0-logo.png nooklead-logo.jpeg
rm case-graphics/n8n/n8n-baas-certificado.png case-graphics/n8n/n8n-blog-ia.png case-graphics/n8n/n8n-etl-diario.png
rm cases/monosphera-cover.jpg
```

- [ ] **Step 5: Verificar total**

```bash
du -sh "/home/almirante/Área de trabalho/Nookweb/Nookweb_LP/public"
```
Esperado: < 6 MB (era 43 MB)

- [ ] **Step 6: Commit**

```bash
cd "/home/almirante/Área de trabalho/Nookweb/Nookweb_LP"
git add public/
git commit -m "perf: converter todos PNG/JPG raiz → WebP"
```

---

## Task 4: Atualizar referências no código — heroCarousel + HeroCarousel

**Files:**
- Modify: `src/data/heroCarousel.ts`
- Modify: `src/components/ui/HeroCarousel.tsx`

- [ ] **Step 1: Atualizar heroCarousel.ts**

Em `src/data/heroCarousel.ts`, substituir todas as extensões `.jpg` por `.webp`:

```ts
export const HERO_CAROUSEL_ITEMS: { label: string; image?: string }[] = [
  { label: 'Sites de Alto Impacto', image: '/sites/site1.webp' },
  { label: 'Aplicativos Mobile', image: '/sites/site2.webp' },
  { label: 'Plataformas SaaS', image: '/sites/site3.webp' },
  { label: 'BaaS & Infraestrutura', image: '/sites/site4.webp' },
  { label: 'Automações N8N', image: '/sites/site5.webp' },
  { label: 'UI/UX Design', image: '/sites/site6.webp' },
  { label: 'Low-code', image: '/sites/site7.webp' },
  { label: 'IA Integrada', image: '/sites/site8.webp' },
]
```

- [ ] **Step 2: Adicionar fetchpriority e loading no HeroCarousel.tsx**

No JSX do `<img>` dentro de `HeroCarousel.tsx` (linha ~75), mudar de:

```tsx
<img src={item.image} alt="" className="hero-orbit-item-img" />
```

Para:

```tsx
<img
  src={item.image}
  alt=""
  className="hero-orbit-item-img"
  loading="eager"
  fetchPriority="high"
/>
```

- [ ] **Step 3: Commit**

```bash
cd "/home/almirante/Área de trabalho/Nookweb/Nookweb_LP"
git add src/data/heroCarousel.ts src/components/ui/HeroCarousel.tsx
git commit -m "perf: hero carousel → WebP + fetchpriority high"
```

---

## Task 5: Atualizar referências nos case previews

**Files:**
- Modify: `src/components/cases/previews/RevivazPreview.tsx`
- Modify: `src/components/cases/previews/LatEmPreview.tsx`
- Modify: `src/components/cases/previews/FitConnectPreview.tsx`
- Modify: `src/components/cases/previews/NookpetPreview.tsx`
- Modify: `src/components/cases/previews/EmplyPreview.tsx`
- Modify: `src/components/cases/previews/NookleadCRMPreview.tsx`
- Modify: `src/components/cases/previews/N8nPortfolioPreview.tsx`

- [ ] **Step 1: RevivazPreview.tsx — trocar extensões nos dados**

Substituir nos arrays de dados (linhas 257-273) todas as ocorrências de `.png` por `.webp`:

```tsx
// FEATURES array (linhas 257-260)
{ icon: Brain, title: "Psiquiatria", ..., img: "/revivaz/team.webp", imgPos: "center" },
{ icon: Calendar, title: "Agendamento fácil", ..., img: "/revivaz/hero-alt.webp", imgPos: "center" },
{ icon: FileText, title: "Receita digital", ..., img: "/revivaz/partners.webp", imgPos: "center calc(50% + 10px)" },
{ icon: Users, title: "Voluntários", ..., img: "/revivaz/hero.webp", imgPos: "center" },

// NEWS array (linhas 271-273)
{ title: "Revivaz e SUS...", ..., img: "/revivaz/partners.webp" },
{ title: "Saúde mental...", ..., img: "/revivaz/hero-alt.webp" },
{ title: "Novos profissionais...", ..., img: "/revivaz/team.webp" },
```

- [ ] **Step 2: RevivazPreview.tsx — trocar extensões nos `<img>` e adicionar lazy**

Linha 343 — mudar de:
```tsx
<img src="/revivaz/team.png" alt="Equipe" style={{ width: "100%", height: 140, objectFit: "cover", objectPosition: "top center", display: "block" }} />
```
Para:
```tsx
<img src="/revivaz/team.webp" alt="Equipe" loading="lazy" style={{ width: "100%", height: 140, objectFit: "cover", objectPosition: "top center", display: "block" }} />
```

Linha 430 — mesma mudança (segunda ocorrência de `/revivaz/team.png`).

Linha ~412 (dentro do map de FEATURES) — adicionar `loading="lazy"` no `<img src={img}`:
```tsx
<img src={img} alt={title} loading="lazy" style={{ width: "100%", height: 120, objectFit: "cover", objectPosition: imgPos, display: "block" }} />
```

Linha ~545 (dentro do map de NEWS) — adicionar `loading="lazy"`:
```tsx
<img src={n.img} alt={n.title} loading="lazy" style={{ width: "100%", height: 90, objectFit: "cover", objectPosition: "top center", display: "block" }} />
```

- [ ] **Step 3: LatEmPreview.tsx**

Linha 103:
```tsx
<img src="/latem-logo.webp" alt="Lá tem Costa Marta" style={{ height:"48px", width:"auto", objectFit:"contain" }} />
```

Linha 250 — adicionar extensão e lazy:
```tsx
src="/latem-mascot.webp"
loading="lazy"
```

Linha 444:
```tsx
<img src="/latem-logo.webp" alt="Lá tem" style={{ height:"52px", width:"auto", objectFit:"contain", marginBottom:"10px", filter:"brightness(0) invert(1)", opacity:0.9 }} />
```

- [ ] **Step 4: FitConnectPreview.tsx linha 225-227**

```tsx
<img
  src="/hero-phones-mockup.webp"
  loading="lazy"
  ...demais props inalteradas...
/>
```

- [ ] **Step 5: NookpetPreview.tsx linha 83-85**

```tsx
<img
  src="/nookpet-logo.webp"
  ...demais props inalteradas...
/>
```

- [ ] **Step 6: EmplyPreview.tsx linha 867-869**

```tsx
<img
  src="/logo-emply.webp"
  loading="lazy"
  ...demais props inalteradas...
/>
```

- [ ] **Step 7: NookleadCRMPreview.tsx linha 931**

```tsx
<img src="/nooklead-logo.webp" alt="Nooklead" style={{ height:"26px", width:"auto", objectFit:"contain" }} />
```

- [ ] **Step 8: N8nPortfolioPreview.tsx linhas 7, 10, 13**

```tsx
{ ..., image: "/case-graphics/n8n/n8n-blog-ia.webp", ... },
{ ..., image: "/case-graphics/n8n/n8n-etl-diario.webp", ... },
{ ..., image: "/case-graphics/n8n/n8n-baas-certificado.webp", ... },
```
E nos `<img>` que usam essas referências, adicionar `loading="lazy"`.

- [ ] **Step 9: Commit**

```bash
cd "/home/almirante/Área de trabalho/Nookweb/Nookweb_LP"
git add src/components/cases/previews/
git commit -m "perf: case previews → WebP + loading lazy"
```

---

## Task 6: React.lazy() no CasePreviewRenderer

**Files:**
- Modify: `src/components/sections/CasesSection.tsx`

- [ ] **Step 1: Trocar import estático por lazy**

No topo de `src/components/sections/CasesSection.tsx`, mudar:

```tsx
// ANTES (linha 4)
import { CasePreviewRenderer } from "@/components/cases/CasePreviewRenderer";
```

Para:

```tsx
import { lazy, Suspense } from "react";
const CasePreviewRenderer = lazy(
  () => import("@/components/cases/CasePreviewRenderer")
);
```

(Manter os outros imports existentes intactos — apenas substituir esta linha.)

- [ ] **Step 2: Envolver uso com Suspense**

Localizar onde `<CasePreviewRenderer .../>` é renderizado (linha ~493) e envolver:

```tsx
<Suspense fallback={<div style={{ width: "100%", height: "100%" }} />}>
  <CasePreviewRenderer caseType={c.visual} variant={caseVariant} />
</Suspense>
```

- [ ] **Step 3: Verificar que `useState` já está importado (não duplicar)**

O arquivo já importa de `"react"` na linha 1. Garantir que o import de `lazy` e `Suspense` seja adicionado ao import existente ou em linha separada — não duplicar o import de `react`.

- [ ] **Step 4: Commit**

```bash
cd "/home/almirante/Área de trabalho/Nookweb/Nookweb_LP"
git add src/components/sections/CasesSection.tsx
git commit -m "perf: React.lazy() no CasePreviewRenderer — code splitting"
```

---

## Task 7: Instalar e configurar vite-plugin-imagemin

**Files:**
- Modify: `package.json`
- Modify: `vite.config.ts`

- [ ] **Step 1: Instalar o plugin**

```bash
cd "/home/almirante/Área de trabalho/Nookweb/Nookweb_LP"
npm install -D vite-plugin-imagemin
```

Esperado: instalado sem erros, `package.json` atualizado com `"vite-plugin-imagemin"` em `devDependencies`.

- [ ] **Step 2: Atualizar vite.config.ts**

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import viteImagemin from 'vite-plugin-imagemin'

function monospheraDashboardFallback() {
  return {
    name: 'monosphera-dashboard-fallback',
    configureServer(server: any) {
      const middleware = (req: any, res: any, next: () => void) => {
        const url = req.url?.split('?')[0] ?? ''
        if (url.startsWith('/monosphera-dashboard') && !url.includes('/assets/') && !url.includes('.')) {
          req.url = '/monosphera-dashboard/index.html'
        }
        next()
      }
      server.middlewares.stack.unshift({ route: '', handle: middleware })
    },
  }
}

export default defineConfig({
  plugins: [
    react(),
    monospheraDashboardFallback(),
    viteImagemin({
      webp: { quality: 85 },
      optipng: { optimizationLevel: 7 },
      mozjpeg: { quality: 82 },
      svgo: {
        plugins: [{ name: 'removeViewBox', active: false }],
      },
    }),
  ],
  resolve: { alias: { '@': path.resolve(__dirname, './src') } },
  server: {
    port: 5174,
    open: true,
  },
})
```

- [ ] **Step 3: Testar build**

```bash
cd "/home/almirante/Área de trabalho/Nookweb/Nookweb_LP"
npm run build
```

Esperado: build completa sem erros. Pode levar +15-30s a mais que o normal.

- [ ] **Step 4: Commit**

```bash
git add vite.config.ts package.json package-lock.json
git commit -m "perf: vite-plugin-imagemin — pipeline automático de compressão no build"
```

---

## Task 8: Verificação final e push

- [ ] **Step 1: Verificar tamanho total do public/**

```bash
du -sh "/home/almirante/Área de trabalho/Nookweb/Nookweb_LP/public"
```
Esperado: < 6 MB (era 43 MB)

- [ ] **Step 2: Subir dev server e conferir visualmente**

```bash
cd "/home/almirante/Área de trabalho/Nookweb/Nookweb_LP"
npm run dev
```

Abrir `http://localhost:5174` e verificar:
- Hero Carousel carrega com imagens WebP
- Case previews abrem normalmente ao clicar
- Nenhum layout quebrado

- [ ] **Step 3: Push para origin**

```bash
cd "/home/almirante/Área de trabalho/Nookweb/Nookweb_LP"
git push origin main
```
