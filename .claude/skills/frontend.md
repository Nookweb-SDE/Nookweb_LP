# Skill: Frontend Expert

## Stack deste projeto
- React 18 + TypeScript + Vite
- Tailwind CSS + globals.css (CSS puro para componentes especiais)
- Fontes: DM Sans, Inter
- Paleta principal: #FF4500 (laranja), #c84b2f (vermelho-laranja), #0a0a0a (fundo escuro)

## Regras de CSS neste projeto
- Classes de componentes visuais complexos → definidas em `src/styles/globals.css`
- Utilitários simples → Tailwind direto no JSX
- Nunca misturar `style={}` inline com classes CSS globais no mesmo elemento
- Animações: usar `@keyframes` no globals.css, não bibliotecas externas (a menos que já instaladas)

## Padrões de componente
- Componentes em `src/components/ui/` = reutilizáveis
- Componentes em `src/components/sections/` = seções da landing page
- Sempre exportar nomeado: `export function NomeDoComponente()`
- Props tipadas com TypeScript interface acima do componente

## Boas práticas visuais
- Glassmorphism: `backdrop-filter: blur(16px) saturate(160%)` + `background: rgba(0,0,0,0.48)`
- Sombras: sempre usar rgba com alpha baixo para suavidade
- Animações CSS: preferir `transform` e `opacity` (GPU-accelerated)
- Responsividade: mobile-first, breakpoint principal `1024px` (lg)
