# Performance de Imagens — Nookweb LP

**Data:** 2026-06-11  
**Abordagem aprovada:** C — Conversão one-time + pipeline automático (vite-imagemin)  
**Restrição:** Layout 100% intocado

---

## Diagnóstico

| Grupo | Tamanho atual | Estimativa pós-otimização |
|---|---|---|
| `public/revivaz/*.png` | ~27 MB | ~2.5 MB |
| `public/sites/*.jpg` | ~11 MB | ~1.5 MB |
| Outros PNG (`public/*.png`) | ~2.5 MB | ~400 KB |
| **Total** | **~43 MB** | **~5 MB** |

Problemas adicionais identificados:
- Zero `loading="lazy"` nas imagens
- Sem `fetchpriority` no LCP (Hero Carousel)
- `CasePreviewRenderer` (~30 componentes) carrega junto com o bundle inicial
- Sem compressão no pipeline de build (Vite config vazia)

---

## Seção 1 — Conversão one-time (PNG/JPG → WebP)

**Ferramenta:** `cwebp` (já instalado no Linux)

**Qualidade por tipo:**
- Fotos/screenshots: `q=82` — visualmente idêntico, máxima compressão
- Logos e UI com texto: `q=90` — nitidez garantida
- Casos especiais com transparência: WebP lossless (`-lossless`)

**Arquivos a converter:**
- `public/revivaz/team.png` (13 MB)
- `public/revivaz/hero-alt.png` (6 MB)
- `public/revivaz/hero.png` (5.9 MB)
- `public/revivaz/partners.png` (2.3 MB)
- `public/sites/site1.jpg` até `site8.jpg` (~11 MB total)
- `public/latem-mascot.png` (496 KB)
- `public/latem-logo.png` (468 KB)
- `public/monosphera-screenshot.png` (340 KB)
- `public/neural-texture.png` (236 KB)
- `public/logo-saas-imovel.png` (208 KB)
- `public/impulso-studio-logo.png` (168 KB)
- `public/impulso-studio-logo2.png` (168 KB)
- `public/hero-phones-mockup.png` (136 KB)
- `public/hero-academia.png` (84 KB)
- `public/monosphera-dashboard-v3.png` (88 KB)
- `public/logo-emply.png` (100 KB)
- `public/nookpet-logo.png`
- `public/v0-logo.png` (56 KB)
- `public/nooklead-logo.jpeg` (36 KB)
- `public/cases/monosphera-cover.jpg`
- `public/case-graphics/n8n/*.png`

**Após conversão:** remover originais. Atualizar todas as referências `.png`/`.jpg`/`.jpeg` → `.webp` no código.

---

## Seção 2 — Lazy loading + prioridade LCP

**Hero Carousel** (`HeroCarousel.tsx` + `heroCarousel.ts`):
- `fetchpriority="high"` + `loading="eager"` nas imagens do carousel
- São LCP — carregam imediatamente

**Todas as outras imagens:**
- `loading="lazy"` em todos os `<img>` de case previews
- Arquivos afetados: `RevivazPreview.tsx`, `LatEmPreview.tsx`, `FitConnectPreview.tsx`, `NookpetPreview.tsx`, `EmplyPreview.tsx`, `NookleadCRMPreview.tsx`

**CLS prevention:**
- Adicionar `width` e `height` explícitos nos `<img>` que ainda não têm

---

## Seção 3 — Code splitting dos case previews

`CasePreviewRenderer` agrega ~30 componentes pesados. Converter para lazy:

```tsx
// CasesSection.tsx ou onde for usado
const CasePreviewRenderer = React.lazy(
  () => import('@/components/cases/CasePreviewRenderer')
)
// Envolver com <Suspense fallback={<div />}>
```

Resultado: bundle inicial menor, case previews só carregam sob demanda.

---

## Seção 4 — Pipeline vite-imagemin

**Instalar:**
```
npm install -D vite-plugin-imagemin
```

**Configurar em `vite.config.ts`:**
```ts
import viteImagemin from 'vite-plugin-imagemin'

plugins: [
  react(),
  viteImagemin({
    webp: { quality: 82 },
    optipng: { optimizationLevel: 7 },
    mozjpeg: { quality: 82 },
    svgo: { plugins: [{ name: 'removeViewBox', active: false }] },
  }),
]
```

Ativa só no build (`NODE_ENV=production`). Dev não é afetado.  
Impacto no build: +15–30s por build.

---

## Arquivos que serão modificados

| Arquivo | Mudança |
|---|---|
| `public/**` | Todos PNG/JPG removidos, WebP adicionados |
| `src/data/heroCarousel.ts` | `.jpg` → `.webp` |
| `src/components/ui/HeroCarousel.tsx` | `fetchpriority` + `loading="eager"` |
| `src/components/cases/previews/RevivazPreview.tsx` | `.png` → `.webp` + `loading="lazy"` |
| `src/components/cases/previews/LatEmPreview.tsx` | `.png` → `.webp` + `loading="lazy"` |
| `src/components/cases/previews/FitConnectPreview.tsx` | `.png` → `.webp` + `loading="lazy"` |
| `src/components/cases/previews/NookpetPreview.tsx` | `.png` → `.webp` + `loading="lazy"` |
| `src/components/cases/previews/EmplyPreview.tsx` | `.png` → `.webp` + `loading="lazy"` |
| `src/components/cases/previews/NookleadCRMPreview.tsx` | `.jpeg` → `.webp` + `loading="lazy"` |
| `src/components/sections/CasesSection.tsx` | React.lazy() no CasePreviewRenderer |
| `vite.config.ts` | vite-plugin-imagemin adicionado |
| `package.json` | devDependency adicionada |

---

## O que NÃO muda

- Layout de nenhuma seção
- Animações (framer-motion)
- Cores, fontes, espaçamentos
- SVGs (já são leves, não precisam de conversão)
- Arquivo `nooklead-logo.ico` (favicon, formato necessário)
