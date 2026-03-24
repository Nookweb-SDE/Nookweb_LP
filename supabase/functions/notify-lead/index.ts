// Supabase Edge Function: notify-lead
// Triggered by Database Webhook on INSERT into public.leads
// Sends email notification to admin@nookweb.com.br via Resend
//
// Required secrets (set via Supabase Dashboard > Edge Functions > Secrets):
//   RESEND_API_KEY — API key from resend.com

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const ADMIN_EMAIL = "admin@nookweb.com.br"
const FROM_EMAIL = "Nookweb <noreply@nookweb.com.br>"

interface LeadRecord {
  id: string
  name: string
  email: string
  phone: string | null
  company: string | null
  service: string | null
  budget: string | null
  message: string
  consent_lgpd: boolean
  source: string
  created_at: string
}

interface WebhookPayload {
  type: "INSERT"
  table: string
  record: LeadRecord
  schema: string
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
}

function buildEmailHtml(lead: LeadRecord): string {
  const fields = [
    ["Nome", lead.name],
    ["Email", lead.email],
    ["Telefone", lead.phone],
    ["Empresa", lead.company],
    ["Serviço", lead.service],
    ["Orçamento", lead.budget],
    ["Mensagem", lead.message],
    ["Fonte", lead.source],
    ["Data", new Date(lead.created_at).toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" })],
  ]

  const rows = fields
    .filter(([, v]) => v)
    .map(([label, value]) => `<tr><td style="padding:8px 12px;font-weight:600;vertical-align:top;color:#555">${label}</td><td style="padding:8px 12px">${escapeHtml(value!)}</td></tr>`)
    .join("")

  return `
    <div style="font-family:system-ui,sans-serif;max-width:600px;margin:0 auto">
      <h2 style="color:#FF4500">Novo lead — Nookweb</h2>
      <table style="width:100%;border-collapse:collapse;border:1px solid #eee;border-radius:8px">
        ${rows}
      </table>
      <p style="margin-top:16px;font-size:12px;color:#999">ID: ${lead.id}</p>
    </div>`
}

serve(async (req) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 })
  }

  const apiKey = Deno.env.get("RESEND_API_KEY")
  if (!apiKey) {
    console.error("RESEND_API_KEY not set")
    return new Response(JSON.stringify({ error: "Email service not configured" }), { status: 500 })
  }

  let payload: WebhookPayload
  try {
    payload = await req.json()
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), { status: 400 })
  }

  if (payload.type !== "INSERT" || payload.table !== "leads") {
    return new Response(JSON.stringify({ ok: true, skipped: true }), { status: 200 })
  }

  const lead = payload.record

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [ADMIN_EMAIL],
        reply_to: lead.email,
        subject: `Novo lead: ${lead.name}${lead.company ? ` — ${lead.company}` : ""}`,
        html: buildEmailHtml(lead),
      }),
    })

    if (!res.ok) {
      const err = await res.text()
      console.error("Resend error:", err)
      return new Response(JSON.stringify({ error: "Email send failed" }), { status: 502 })
    }

    return new Response(JSON.stringify({ ok: true }), { status: 200 })
  } catch (err) {
    console.error("Email error:", err)
    return new Response(JSON.stringify({ error: "Internal error" }), { status: 500 })
  }
})
