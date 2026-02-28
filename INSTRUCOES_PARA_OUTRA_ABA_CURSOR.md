# NOOKWEB — Instruções para outra aba do Cursor

Use este documento **em outra aba do Cursor** (ou em outro workspace) para rodar ou continuar o projeto.

---

## O que é este projeto

Site institucional completo da **Nookweb** (Holding Digital), conforme PRD v2.0:
- **Stack:** React 18 + TypeScript + Vite + Tailwind CSS + React Router + Framer Motion (opcional) + Supabase
- **Conteúdo:** Home (Hero, Marquee, Metodologia, 7 Serviços, Stats, Cases, Comparativo, Equipe, CTA), páginas Serviços, Cases, Sobre, Blog, Contato, 404
- **Design:** Design system ArtoolsPro (Instrument Serif, DM Sans, Space Mono; cores em CSS variables)

---

## Opção A — Abrir esta pasta no Cursor e rodar

1. **Abra no Cursor** a pasta onde este arquivo está:  
   `Nookweb LP\codigo-nookweb-completo` (ou a pasta **Nookweb LP** e depois entre em `codigo-nookweb-completo`).
2. No terminal:
   ```bash
   npm install
   npm run dev
   ```
3. Acesse **http://localhost:5174** (porta definida no `vite.config.ts`).

---

## Opção B — Copiar o projeto para outro lugar

1. Copie a pasta **nookweb-site** inteira para onde quiser (ex.: `C:\Users\felli\Desktop\nookweb-site`).
2. Abra essa pasta no Cursor.
3. Rode:
   ```bash
   npm install
   npm run dev
   ```

---

## Estrutura do código (para a IA na outra aba)

```
nookweb-site/
├── api/
│   └── contact.ts          # API de contato (Vercel serverless; implementar Supabase + Resend + Z-API)
├── prisma/
│   └── schema.prisma      # Modelos Lead, BlogPost, Case, TeamMember, SiteConfig
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── layout/         # Navbar.tsx, Footer.tsx
│   │   ├── sections/      # Hero, Marquee, Metodologia, Servicos, Stats, Cases, Comparativo, Equipe, CTAFinal
│   │   └── ui/             # Button, Container, SectionHeader, FeatureCard, StatCard, GlassCard
│   ├── lib/
│   │   ├── supabase.ts    # Cliente Supabase (env: VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY)
│   │   └── api.ts         # submitContact() -> POST /api/contact
│   ├── pages/              # Home, ServicosIndex, ServicoDetalhe, CasesIndex, CaseDetalhe, Sobre, BlogIndex, BlogPost, Contato, NotFound
│   ├── types/
│   │   └── index.ts       # Lead, BlogPost, Case, Service, TeamMember, SERVICES[]
│   ├── App.tsx             # Rotas React Router
│   ├── main.tsx
│   └── index.css           # Design system (variáveis CSS)
├── index.html
├── package.json
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json
└── .env.example
```

---

## O que a outra aba pode fazer em seguida

1. **Implementar a API de contato**  
   - Em `api/contact.ts`: inserir lead no Supabase (tabela `leads`), opcionalmente Resend (email) e Z-API (WhatsApp).  
   - Em desenvolvimento, pode usar proxy no Vite para um endpoint local ou inserir direto no Supabase pelo front (se tiver RLS e tabela criada).

2. **Criar tabelas no Supabase**  
   - Rodar migrations do Prisma (ou criar tabelas manualmente conforme `prisma/schema.prisma`).

3. **Adicionar animações**  
   - Scroll reveal, counter na seção Stats, parallax no hero (ex.: Framer Motion ou Intersection Observer).

4. **SEO e deploy**  
   - Meta tags por página (react-helmet-async já está), sitemap.xml, robots.txt, deploy na Vercel (conectar repositório e configurar env).

5. **Vídeo Hero**  
   - Trocar o placeholder do Hero pelo vídeo gerado (Veo 3.1) quando tiver o arquivo.

---

## Variáveis de ambiente

Copie `.env.example` para `.env` e preencha:

- `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY` para o front.
- Para a API (Vercel): `DATABASE_URL`, `RESEND_API_KEY`, `Z_API_INSTANCE`, `Z_API_TOKEN`, `CONTACT_EMAIL`, `WHATSAPP_NUMBER` (conforme PRD).

---

## PRD completo

O documento completo do projeto está em:
`c:\Users\felli\Downloads\NOOKWEB — PRD v2.0 _ Prazo_ 01_03_2026.md`

Use-o como referência de copy, seções, cronograma e requisitos técnicos.

---

**Resumo:** Todo o código do site NOOKWEB está nesta pasta. Abra-a em outra aba do Cursor, rode `npm install` e `npm run dev`, e continue a implementação (API, Supabase, animações, deploy) a partir daqui.
