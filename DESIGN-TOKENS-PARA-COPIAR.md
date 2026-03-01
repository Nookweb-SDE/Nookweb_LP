# Nookweb — Paletas de cores e tipografia (copiar e colar para o Claude/Opus)

---

## PALETA DE CORES

### Cores principais (index.css / Tailwind)
| Nome | Variável CSS | Hex | Uso |
|------|----------------|-----|-----|
| Superfície | `--surface-main` | `#E7E8E0` | Fundo geral do site |
| Heavy | `--heavy` | `#1C1A16` | Texto principal, títulos escuros |
| Neutral | `--neutral` | `#767069` | Texto secundário |
| Soft | `--soft` | `#E8E2DD` | Fundos suaves |
| Pure | `--pure` | `#FFFFFF` | Branco |
| Pure warm | `--pure-warm` | `#F9F9F4` | Branco quente (fundos, hovers) |
| Accent primary | `--accent-primary` | `#086249` | Verde, CTAs, links |
| Accent danger | `--accent-danger` | `#9C1C1E` | Vermelho, erros/alertas |
| Accent warm | `--accent-warm` | `#B8860B` | Dourado |

### Hero / seções escuras (globals.css)
| Nome | Variável CSS | Hex | Uso |
|------|----------------|-----|-----|
| Hero bg | `--hero-bg` | `#000000` | Fundo preto do hero |
| Hero orange | `--hero-orange` | `#FF4500` | Laranja principal (destaques, bordas) |
| Hero orange 2 | `--hero-orange2` | `#FF6D00` | Laranja secundário (gradientes) |
| Hero cream | `--hero-cream` | `#F5F0E8` | Texto claro no hero |

### Electric border / cards (electric-border.css)
| Nome | Variável / valor | Uso |
|------|-------------------|-----|
| Electric border | `#c0c0c0` | Bordas prata |
| Electric light | `#e8e8e8` | Bordas claras |
| Silver bright | `#e8e8e8` | Realces |
| Neutral 900 | `#1a1a1c` | Fundo escuro de cards |

### Tailwind (classes de cor no código)
- `bg-surface` / `text-heavy` / `text-neutral` / `bg-soft` / `bg-pure` / `text-pure`
- `bg-accent` ou `accent-primary` / `accent-danger` / `accent-warm`
- `bg-hero-dark` (usa `--hero-bg`)
- Opacidades: `text-white/50`, `border-white/10`, `bg-heavy/90`, etc.

---

## TIPOGRAFIA

### Famílias (Google Fonts)
- **DM Sans** — sans-serif (corpo, UI, navegação, botões)
- **Instrument Serif** — serif (títulos, headlines, destaque)
- **Space Mono** — monospace (labels, marquee de tech, “Agência Digital”)

Link Google Fonts:
```
https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Instrument+Serif:ital@0;1&family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap
```

### Uso no Tailwind
- `font-sans` → DM Sans
- `font-serif` → Instrument Serif  
- `font-mono` → Space Mono

### Tamanhos comuns no site
- Labels / pequeno: `text-xs`, `text-[10px]`
- Corpo: `text-sm`, `text-base`
- Subtítulos: `text-lg`, `text-xl`
- Títulos de seção: `text-2xl`, `text-3xl`, `text-4xl`, `text-5xl`
- Hero headline: `text-4xl sm:text-5xl lg:text-[4rem]`
- Tracking: `tracking-tight`, `tracking-[0.2em]`, `tracking-widest`
- Peso: `font-normal`, `font-medium` (500), `font-semibold` (600), `font-bold` (700)

---

## RESUMO RÁPIDO (colar no prompt)

```
CORES NOOKWEB:
- Fundo geral: #E7E8E0 (surface-main)
- Texto principal: #1C1A16 (heavy)
- Texto secundário: #767069 (neutral)
- Branco: #FFFFFF (pure), #F9F9F4 (pure-warm)
- Verde CTA: #086249 (accent-primary)
- Vermelho: #9C1C1E (accent-danger)
- Dourado: #B8860B (accent-warm)
- Hero fundo: #000000 | Laranja: #FF4500, #FF6D00 | Texto claro: #F5F0E8 (cream)
- Bordas/cards escuros: #1a1a1c, #e8e8e8 (prata)

TIPOGRAFIA:
- Sans (corpo/UI): DM Sans
- Serif (títulos): Instrument Serif
- Mono (tech/labels): Space Mono
```

---

*Arquivo gerado para uso com Claude/Opus ao redesenhar o bloco de Serviços.*
