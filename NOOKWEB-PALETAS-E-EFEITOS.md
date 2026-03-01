# Nookweb — Paletas de cores, efeitos e tipografia (referência para Claude Opus)

---

## 1. PALETAS DE CORES

### 1.1 Variáveis CSS globais (index.css)
| Nome | Variável | Hex | Uso |
|------|----------|-----|-----|
| Superfície | `--surface-main` | `#E7E8E0` | Fundo geral do site |
| Heavy | `--heavy` | `#1C1A16` | Texto principal, títulos escuros |
| Neutral | `--neutral` | `#767069` | Texto secundário |
| Soft | `--soft` | `#E8E2DD` | Fundos suaves |
| Pure | `--pure` | `#FFFFFF` | Branco |
| Pure warm | `--pure-warm` | `#F9F9F4` | Branco quente (fundos, hovers) |
| Accent primary | `--accent-primary` | `#086249` | Verde (CTAs, links — pouco usado) |
| Accent danger | `--accent-danger` | `#9C1C1E` | Vermelho (erros/alertas) |
| Accent warm | `--accent-warm` | `#B8860B` | Dourado |

### 1.2 Hero / seções escuras (globals.css)
| Nome | Variável | Hex | Uso |
|------|----------|-----|-----|
| Hero bg | `--hero-bg` | `#000000` | Fundo preto do hero |
| Hero orange | `--hero-orange` | `#FF4500` | Laranja principal (destaques, bordas) |
| Hero orange 2 | `--hero-orange2` | `#FF6D00` | Laranja secundário (gradientes) |
| Hero cream | `--hero-cream` | `#F5F0E8` | Texto claro no hero |

### 1.3 Paleta P — ServicosSection
| Nome | Hex / RGBA | Uso |
|------|------------|-----|
| orange | `#FF4500` | Destaques, bordas, ícones ativos |
| orangeAlt | `#FF6D00` | Gradientes, variação laranja |
| silver | `#c0c0c0` | Bordas, ícones inativos |
| silverB | `rgba(192,192,192,0.35)` | Bordas suaves |
| metal | `#1a1a1c` | Formas 3D, sombras |
| black | `#000000` | Preto puro |
| blackSoft | `#0a0a0a` | Preto suave |
| heavy | `#1C1A16` | Texto principal, títulos |
| neutral | `#767069` | Texto secundário |
| cream | `#F5F0E8` | Texto claro, realces |
| warm | `#F9F9F4` | Fundos quentes |
| surface | `#E7E8E0` | Fundo da seção |
| soft | `#E8E2DD` | Fundos suaves |
| white | `#FFFFFF` | Branco |

### 1.4 Paleta P — Stats
| Nome | Hex / RGBA | Uso |
|------|------------|-----|
| orange | `#FF4500` | Destaques, bordas, badges |
| orangeAlt | `#FF6D00` | Gradientes |
| silver | `#c0c0c0` | Bordas |
| silverB | `rgba(192,192,192,0.5)` | Bordas cards |
| metalDark | `#1a1a1c` | Fundo cards |
| metalHL | `rgba(255,255,255,0.12)` | Realce metal |
| black | `#000000` | Sombras |
| blackSoft | `#0a0a0a` | Sombras suaves |
| warmWhite | `#F9F9F4` | Texto títulos |
| cream | `#F5F0E8` | Texto hover badges |
| neutral | `#767069` | Descrições |
| white | `#FFFFFF` | Branco |

### 1.5 Electric border / cards especiais (electric-border.css)
| Nome | Variável / valor | Uso |
|------|------------------|-----|
| Electric border | `--electric-border-color: #c0c0c0` | Bordas prata |
| Electric light | `--electric-light-color: #e8e8e8` | Bordas claras |
| Silver bright | `--silver-bright: #e8e8e8` | Realces |
| Neutral 900 | `--color-neutral-900: #1a1a1c` | Fundo escuro de cards |
| Gradient | `rgba(192, 192, 192, 0.15)` | Gradiente bordas |

### 1.6 MeshGradient (Stats/Hero)
**Cores do canvas (MeshGradientBackground):**
- `#000000`
- `#1a1a1a`
- `#333333`
- `#ffffff`

**Overlays de blur:**
- `bg-gray-800/5`, `bg-white/2`, `bg-gray-900/3`

---

## 2. TIPOGRAFIA

### 2.1 Famílias de fonte
| Família | Variável Tailwind | Uso |
|---------|-------------------|-----|
| **DM Sans** | `font-sans` | Corpo, UI, navegação, botões, descrições |
| **Instrument Serif** | `font-serif` / `font-display` | Títulos, headlines, destaques |
| **Space Mono** | `font-mono` | Labels, marquee tech, badges, tags |

**Link Google Fonts:**
```
https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Instrument+Serif:ital@0;1&family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap
```

### 2.2 Tamanhos e pesos por contexto
| Contexto | Fonte | Tamanho | Peso |
|----------|-------|---------|------|
| Label pequeno (Serviços, Stats) | Space Mono | 9–10px | 400–700 |
| Subtítulo laranja (row-sub) | Space Mono | 9px | 400 |
| Corpo / descrição | DM Sans | 13–14px | 400 |
| Título card Stats | Instrument Serif | clamp(22px,2.2vw,28px) | 400 |
| Título H2 Serviços | Instrument Serif | clamp(30px,5vw,60px) | 400 |
| Título H2 Stats | Instrument Serif | clamp(36px,4.5vw,58px) | 400 |
| Hero headline | Instrument Serif | 4xl / 5xl / [4rem] | 400 |
| Número background gigante | Instrument Serif | clamp(160px,26vw,380px) | 400 |
| Badge Metal | Space Mono | 13px | 700 |
| LiquidMetalButton | DM Sans | 14–15px | 500 |

### 2.3 Letter-spacing e transform
- Labels: `0.1em` – `0.35em`
- Uppercase: `textTransform: 'uppercase'` em labels e tags
- Tracking: `tracking-tight`, `tracking-[0.2em]`, `tracking-widest`

---

## 3. EFEITOS E ANIMAÇÕES

### 3.1 Keyframes (ServicosSection)
| Nome | Descrição |
|------|-----------|
| `revealUp` | Entrada: opacity 0→1, translateY 36px→0 |
| `detailIn` | Painel detalhe: opacity 0→1, translateY 12px→0, scale 0.98→1 |
| `tagIn` | Tags: opacity 0→1, translateY 6px→0 |
| `lineGrow` | Linha: width 0→32px |
| `scaleX` | Barra gradiente: scaleX 0→1 |
| `marquee` | Marquee tech: translateX 0→-50% |
| `shimmer` | Gradiente text: background-position -200%→200% |
| `rotateCube` | Cubo 3D: rotateX 10deg + rotateY 360deg |
| `rotateGem` | Gema 3D: rotateX 20deg + rotateY 360deg + rotateZ 10deg |
| `rotatePrism` | Prisma 3D: rotateY 360deg + rotateX 5deg |
| `rotateRing` | Anel 3D: rotateX 60deg + rotateZ 360deg |
| `rotateSphere` | Esfera 3D: rotateY 360deg |
| `floatA` | Decoração SVG: translate (0,0) ↔ (-10px,-14px) |
| `slowSpin` | Spinner placeholder: rotate 0→360deg |
| `pulseGlow` | Brilho ambiente: opacity 0.08↔0.18 |

### 3.2 Keyframes (Stats)
| Nome | Descrição |
|------|-----------|
| `rocketSpin` | Foguete 3D: rotateY 360deg + rotateX 8deg |
| `lightningSpin` | Raio 3D: rotateY 360deg + rotateX 5deg |
| `starSpin` | Estrela 3D: rotateY 360deg + rotateZ 15deg |
| `statsCardIn` | Card entrada: opacity 0→1, translateY 32px→0, scale 0.97→1 |
| `statsShimmer` | Título "resultados reais": background-position -200%→200% |

### 3.3 Keyframes (globals.css / Hero)
| Nome | Descrição |
|------|-----------|
| `marquee` | Hero marquee: translateX 0→-50% |
| `shimmer-gradient` | Texto gradiente animado (DIGITAIS., etc.): background-position -200%→200% |
| `hero-orbit-border` | Borda carrossel: background-position animado |
| `hero-orbit-glow` | Brilho órbita: opacity 0.6↔1, scale 0.98↔1.02 |
| `dot-pulse` | Ponto carrossel: pulso |

### 3.4 Gradientes usados
| Uso | Cores |
|-----|-------|
| Barra laranja Serviços | `linear-gradient(90deg, #FF4500, #FF6D00, rgba(192,192,192,0.3))` |
| Divider shimmer | `linear-gradient(90deg, transparent, rgba(192,192,192,.5), rgba(255,69,0,.15), rgba(192,192,192,.5), transparent)` |
| Formas 3D (face) | `linear-gradient(135deg, #FF4500, #FF6D00)`, `linear-gradient(135deg, #e8e8e8, #FF4500)`, etc. |
| Cards Stats (hover) | `linear-gradient(145deg, #222224, #1a1a1c)` |
| MetalBadge | `radial-gradient(ellipse...)`, `linear-gradient(180deg, #222224 0%, #0f0f11 50%, #1a1a1c 100%)` |
| MetalBadge sheen | `conic-gradient(from ...deg, transparent, rgba(192,192,192,.07), ...)` |

### 3.5 Sombras e bordas
| Elemento | Valor |
|----------|-------|
| Formas 3D drop-shadow | `drop-shadow(0 0 16px #FF450066)` – `drop-shadow(0 0 24px #FF450088)` |
| Card Stats (hover) | `0 32px 72px #000000aa, 0 0 0 1px #FF450022, inset 0 1px 0 rgba(255,255,255,0.12)` |
| Card Stats (normal) | `0 4px 24px #00000055, inset 0 1px 0 rgba(255,255,255,0.12)` |
| MetalBadge (hover) | `0 0 20px rgba(255,69,0,.12), inset 0 1px 0 rgba(255,255,255,.15), 0 6px 24px rgba(0,0,0,.4)` |
| LiquidMetalButton | Box-shadow em camadas (ver componente) |

### 3.6 Easing e transições
- `cubic-bezier(.23,1,.32,1)` — entrada suave
- `cubic-bezier(.34,1.2,.64,1)` — cards Stats
- `transition: all .4s ease` / `.45s` — hovers gerais

---

## 4. COMPONENTES ESPECIAIS

### 4.1 LiquidMetalButton
- Usa shader `@paper-design/shaders` (liquidMetalFragmentShader)
- Dimensões: default 148×46px, large 260×58px
- Cores internas: `#202020`, `#000000`, `#e8e8e8` (texto)

### 4.2 LiquidMetalBadge (Stats — não usado nos novos cards)
- Shader liquid metal
- Dimensões: 130×46px

### 4.3 MetalBadge (Stats — novo)
- CSS puro: gradientes radiais, conic, bordas
- Cores: `#222224`, `#0f0f11`, `#1a1a1c`, `#FF4500` (orb hover)

### 4.4 FeatureCard
- Ícone: gradiente branco, hover para `accent-primary` (#086249)
- Borda hover: `accent-primary/50`

### 4.5 Navbar
- Link hover (modo claro): `text-accent-primary` (#086249)
- Link hover (modo escuro/hero): `text-[#FF4500]`

### 4.7 MeshGradientBackground
- Componente `@paper-design/shaders-react` MeshGradient
- Cores: `['#000000', '#1a1a1a', '#333333', '#ffffff']`
- Overlays blur: `gray-800/5`, `white/2`, `gray-900/3`

---

## 5. RESUMO RÁPIDO (colar no prompt)

```
CORES NOOKWEB:
- Laranja principal: #FF4500
- Laranja secundário: #FF6D00
- Prata: #c0c0c0
- Metal escuro: #1a1a1c
- Fundo geral: #E7E8E0 (surface)
- Texto principal: #1C1A16 (heavy)
- Texto secundário: #767069 (neutral)
- Cream: #F5F0E8
- Warm white: #F9F9F4
- Branco: #FFFFFF
- Preto: #000000, #0a0a0a

TIPOGRAFIA:
- Sans (corpo/UI): DM Sans
- Serif (títulos): Instrument Serif
- Mono (tech/labels): Space Mono

EFEITOS:
- Shimmer gradiente texto: linear-gradient + background-position animado
- Formas 3D: laranja, prata, metal com rotações
- Cards: borda laranja no hover, gradiente escuro
- MetalBadge: gradiente radial, conic shimmer
```

---

*Documento gerado para envio ao Claude Opus. Atualize conforme alterações no projeto.*
