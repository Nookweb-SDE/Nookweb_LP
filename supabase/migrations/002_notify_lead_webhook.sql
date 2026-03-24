-- ═══════════════════════════════════════════════════════════════════════════
-- Trigger: envia webhook para notify-lead quando um lead é inserido
-- Usa extensão pg_net (já disponível no Supabase por padrão)
-- Rodar no SQL Editor do Supabase Dashboard
-- ═══════════════════════════════════════════════════════════════════════════

create extension if not exists pg_net with schema extensions;

-- Função que dispara o webhook
create or replace function public.notify_lead_webhook()
returns trigger
language plpgsql
security definer
as $$
declare
  payload jsonb;
  webhook_url text := 'https://nookweb.com.br/webhook/lead';
  secret text := 'nookweb-lead-webhook-2026';
  body_text text;
  signature text;
begin
  payload := jsonb_build_object(
    'type', 'INSERT',
    'table', 'leads',
    'record', row_to_json(NEW)::jsonb
  );

  body_text := payload::text;
  signature := encode(
    extensions.hmac(body_text::bytea, secret::bytea, 'sha256'),
    'hex'
  );

  perform extensions.http_post(
    url := webhook_url,
    body := payload,
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'X-Webhook-Signature', signature
    )
  );

  return NEW;
end;
$$;

-- Trigger na tabela leads
drop trigger if exists on_lead_insert_notify on public.leads;
create trigger on_lead_insert_notify
  after insert on public.leads
  for each row
  execute function public.notify_lead_webhook();
