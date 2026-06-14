// Vercel Serverless: api/testimonials.ts
// Variáveis necessárias no Vercel:
//   SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY (service role, não anon)
//   RESEND_API_KEY
//   CONTACT_EMAIL (padrão: admin@nookweb.com.br)

export const config = { runtime: 'edge' }

interface Body {
  nome: string
  cargo?: string
  texto: string
  rating: number
}

export default async function handler(req: Request) {
  if (req.method !== 'POST') {
    return json({ error: 'Method not allowed' }, 405)
  }

  let body: Body
  try {
    body = await req.json()
  } catch {
    return json({ error: 'JSON inválido' }, 400)
  }

  if (!body.nome?.trim() || !body.texto?.trim()) {
    return json({ error: 'nome e texto são obrigatórios' }, 400)
  }

  const supabaseUrl = (globalThis as any).process?.env?.SUPABASE_URL
    ?? (globalThis as any).env?.SUPABASE_URL
    ?? ''
  const supabaseKey = (globalThis as any).process?.env?.SUPABASE_SERVICE_ROLE_KEY
    ?? (globalThis as any).env?.SUPABASE_SERVICE_ROLE_KEY
    ?? ''
  const resendKey = (globalThis as any).process?.env?.RESEND_API_KEY
    ?? (globalThis as any).env?.RESEND_API_KEY
    ?? ''
  const contactEmail = (globalThis as any).process?.env?.CONTACT_EMAIL
    ?? (globalThis as any).env?.CONTACT_EMAIL
    ?? 'admin@nookweb.com.br'

  /* ── 1. Inserir no Supabase ── */
  if (!supabaseUrl || !supabaseKey) {
    return json({ error: 'Supabase não configurado' }, 500)
  }

  const insertRes = await fetch(`${supabaseUrl}/rest/v1/cms_testimonials`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': supabaseKey,
      'Authorization': `Bearer ${supabaseKey}`,
      'Prefer': 'return=representation',
    },
    body: JSON.stringify({
      author: body.nome.trim(),
      role: body.cargo?.trim() ?? '',
      text: body.texto.trim(),
      rating: body.rating ?? 5,
      status: 'pendente',
      destaque: false,
    }),
  })

  if (!insertRes.ok) {
    const err = await insertRes.text()
    return json({ error: `Erro ao salvar: ${err}` }, 500)
  }

  /* ── 2. Enviar e-mail de notificação via Resend ── */
  if (resendKey) {
    const cargo = body.cargo?.trim() ? ` · ${body.cargo.trim()}` : ''
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${resendKey}`,
      },
      body: JSON.stringify({
        from: 'Nookweb Site <noreply@nookweb.com.br>',
        to: [contactEmail],
        subject: `[Nookweb] Novo depoimento pendente — ${body.nome.trim()}`,
        html: `
          <div style="font-family:sans-serif;max-width:560px;margin:0 auto">
            <h2 style="color:#FF4500;margin-bottom:4px">Novo depoimento recebido</h2>
            <p style="color:#666;font-size:13px;margin-top:0">Aguardando aprovação no painel Supabase</p>
            <hr style="border:none;border-top:1px solid #eee;margin:20px 0">
            <p><strong>Autor:</strong> ${body.nome.trim()}${cargo}</p>
            <p><strong>Avaliação:</strong> ${'★'.repeat(body.rating ?? 5)}</p>
            <blockquote style="border-left:3px solid #FF4500;margin:16px 0;padding:12px 16px;background:#fff8f6;border-radius:0 8px 8px 0">
              ${body.texto.trim()}
            </blockquote>
            <hr style="border:none;border-top:1px solid #eee;margin:20px 0">
            <p style="font-size:12px;color:#999">
              Para aprovar: acesse o Supabase → tabela <code>cms_testimonials</code> → altere <code>status</code> para <code>aprovado</code>.
            </p>
          </div>
        `,
      }),
    }).catch(() => { /* não bloquear se email falhar */ })
  }

  return json({ ok: true })
}

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })
}
