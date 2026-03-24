-- ═══════════════════════════════════════════════════════════════════════════
-- Nookweb — schema inicial Supabase (rodar no SQL Editor do projeto)
-- Depois: Storage → criar bucket "site-media" (público para leitura, se quiser CDN)
-- ═══════════════════════════════════════════════════════════════════════════

-- Extensões úteis
create extension if not exists "pgcrypto";

-- ─── Leads (formulário de contato + futuros formulários) ───────────────────
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  company text,
  service text,
  budget text,
  message text not null,
  consent_lgpd boolean not null default false,
  status text not null default 'new'
    check (status in ('new', 'contacted', 'qualified', 'lost')),
  source text not null default 'contact',
  created_at timestamptz not null default now()
);

create index if not exists leads_email_idx on public.leads (email);
create index if not exists leads_created_at_idx on public.leads (created_at desc);

alter table public.leads enable row level security;

-- Formulário público: só INSERT (anon não lê nem atualiza)
drop policy if exists "Allow anon insert leads" on public.leads;
create policy "Allow anon insert leads"
  on public.leads
  for insert
  to anon, authenticated
  with check (true);

-- Opcional: leitura só para usuários autenticados (painel admin no futuro)
-- drop policy if exists "Allow authenticated read leads" on public.leads;
-- create policy "Allow authenticated read leads"
--   on public.leads for select to authenticated using (true);

-- ─── Metadados de imagens/arquivos de produção (URLs apontam para Storage) ───
create table if not exists public.media_assets (
  id uuid primary key default gen_random_uuid(),
  bucket text not null default 'site-media',
  path text not null,
  public_url text,
  label text,
  alt text,
  kind text not null default 'image'
    check (kind in ('image', 'hero', 'case', 'logo', 'og', 'other')),
  meta jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  unique (bucket, path)
);

create index if not exists media_assets_kind_idx on public.media_assets (kind);

alter table public.media_assets enable row level security;

-- Leitura pública opcional (se o site listar assets por API)
drop policy if exists "Allow public read media_assets" on public.media_assets;
create policy "Allow public read media_assets"
  on public.media_assets
  for select
  to anon, authenticated
  using (true);

-- Escrita: apenas service role / painel (sem policy para anon = sem insert público)
-- Para uploads a partir de um admin autenticado no futuro:
-- create policy "Allow authenticated insert media" on public.media_assets ...

-- ─── Conteúdo chave/valor (CMS leve: textos, flags) ─────────────────────────
create table if not exists public.site_content (
  id uuid primary key default gen_random_uuid(),
  key text not null unique,
  value jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.site_content enable row level security;

drop policy if exists "Allow public read site_content" on public.site_content;
create policy "Allow public read site_content"
  on public.site_content
  for select
  to anon, authenticated
  using (true);

comment on table public.leads is 'Leads do formulário de contato e outros formulários da LP';
comment on table public.media_assets is 'Metadados de arquivos no Storage (bucket site-media)';
comment on table public.site_content is 'Conteúdo editável por chave (JSON) para produção';
