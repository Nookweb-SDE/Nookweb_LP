// Vercel Serverless: api/contact.ts
// Configurar no vercel.json: "rewrites": [{ "source": "/api/:path*", "destination": "/api/:path*" }]
// Variáveis: DATABASE_URL, RESEND_API_KEY, Z_API_INSTANCE, Z_API_TOKEN, CONTACT_EMAIL, WHATSAPP_NUMBER

export const config = { runtime: 'edge' }

interface Body {
  name: string
  email: string
  phone?: string
  company?: string
  service?: string
  budget?: string
  message: string
  consentLgpd: boolean
}

export default async function handler(req: Request) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 })
  }
  let body: Body
  try {
    body = await req.json()
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), { status: 400 })
  }
  if (!body.name || !body.email || !body.message || !body.consentLgpd) {
    return new Response(JSON.stringify({ message: 'Campos obrigatórios: name, email, message, consentLgpd' }), { status: 400 })
  }
  // TODO: inserir no Supabase (tabela leads), enviar email (Resend), disparar WhatsApp (Z-API)
  return new Response(JSON.stringify({ ok: true }), { status: 200, headers: { 'Content-Type': 'application/json' } })
}
