# Supabase — Nookweb LP

Este guia prepara **formulários**, **dados** e **base para imagens** em produção.

## 1. Criar o projeto

1. Acesse [supabase.com](https://supabase.com) e crie um projeto (região próxima ao Brasil, ex.: `South America`).
2. Anote:
   - **Project URL** → `VITE_SUPABASE_URL`
   - **anon public** → `VITE_SUPABASE_ANON_KEY`
   - (Opcional para scripts/admin no servidor) **service_role** → **nunca** no front-end; só em variáveis de servidor.

## 2. Rodar o SQL das tabelas

1. No painel: **SQL Editor** → **New query**.
2. Cole o conteúdo de `supabase/migrations/001_initial_nookweb.sql` e execute (**Run**).

Isso cria:

| Tabela | Uso |
|--------|-----|
| `leads` | Envios do formulário de contato (insert público via RLS). |
| `media_assets` | Registro de imagens/arquivos (URL + metadados). |
| `site_content` | Pares chave/JSON para textos ou flags da produção. |

## 3. Storage (imagens)

1. **Storage** → **New bucket**  
   - Nome: `site-media`  
   - Público: **sim** se quiser URL direta no site; **não** se só URLs assinadas.
2. **Policies** do bucket (ajuste conforme o fluxo):
   - Para um painel admin futuro: upload só com usuário autenticado ou Edge Function com `service_role`.
   - Leitura pública: policy de `SELECT` para `anon` no bucket público.

Os metadados (título, alt, tipo) ficam em `media_assets`; o arquivo fica no bucket.

## 4. Variáveis no projeto (`.env` local e Vercel/host)

```env
VITE_SUPABASE_URL=https://xxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbG...
```

Copie de: **Project Settings → API**.

## 5. Prisma + mesmo banco (opcional)

Se quiser usar **Prisma** apontando para o Postgres do Supabase:

1. **Project Settings → Database** → copie a **Connection string** (URI), modo **Transaction** ou **Session**.
2. No `.env` do servidor (não commitar):

```env
DATABASE_URL="postgresql://postgres.[ref]:[PASSWORD]@aws-0-[region].pooler.supabase.com:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres.[ref]:[PASSWORD]@aws-0-[region].pooler.supabase.com:5432/postgres"
```

Depois: `npx prisma db push` ou migrações alinhadas ao `schema.prisma` (ajuste nomes de colunas se necessário).

## 6. Acesso para outro dev

No Supabase: **Project Settings → Access** ou convide por e-mail na organização.  
Para só criar tabelas: role com permissão no SQL Editor ou use o mesmo arquivo de migração no repositório.

## 7. Segurança

- **anon key** no site só com **RLS** ativo (já configurado para `leads`: insert permitido, leitura não pública).
- **service_role** só em backend/CI — nunca em `VITE_*`.
