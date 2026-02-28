const API_BASE = import.meta.env.VITE_API_URL ?? '/api'

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
  const res = await fetch(`${API_BASE}/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.message ?? 'Erro ao enviar mensagem.')
  }
  return res.json()
}
