import { getSupabaseBrowser, insertContactLead } from './supabase'

const API_BASE = import.meta.env.VITE_API_URL ?? '/api'
const NOTIFY_URL = import.meta.env.VITE_NOTIFY_WEBHOOK_URL ?? ''

/** Fire-and-forget: notifica o admin via webhook (não bloqueia o formulário). */
function notifyAdmin(data: Record<string, unknown>) {
  if (!NOTIFY_URL) return
  fetch(NOTIFY_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ record: data }),
  }).catch(() => {/* silencioso — o lead já foi salvo */})
}

export async function submitContact(data: {
  name: string
  email: string
  phone?: string
  company?: string
  service?: string
  budget?: string
  message: string
  consentLgpd: boolean
}) {
  // 1) Preferência: Supabase direto (LP estática + RLS) — sem servidor obrigatório
  if (getSupabaseBrowser()) {
    await insertContactLead(data)
    notifyAdmin({
      name: data.name,
      email: data.email,
      phone: data.phone ?? null,
      company: data.company ?? null,
      service: data.service ?? null,
      budget: data.budget ?? null,
      message: data.message,
      source: 'contact',
    })
    return { ok: true as const }
  }

  // 2) Fallback: API serverless (Vercel, etc.)
  const res = await fetch(`${API_BASE}/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error((err as { message?: string }).message ?? 'Erro ao enviar mensagem.')
  }
  return res.json()
}
