import { createClient, type SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL ?? ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY ?? ''

/** Cliente browser só quando URL e anon key estão definidos (produção / dev com .env). */
export function getSupabaseBrowser(): SupabaseClient | null {
  if (!supabaseUrl || !supabaseAnonKey) return null
  return createClient(supabaseUrl, supabaseAnonKey)
}

export type ContactLeadPayload = {
  name: string
  email: string
  phone?: string
  company?: string
  service?: string
  budget?: string
  message: string
  consentLgpd: boolean
}

/** Insere lead na tabela `public.leads` (requer RLS “Allow anon insert leads”). */
export async function insertContactLead(data: ContactLeadPayload): Promise<void> {
  const client = getSupabaseBrowser()
  if (!client) {
    throw new Error('Supabase não configurado (VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY).')
  }
  const { error } = await client.from('leads').insert({
    name: data.name,
    email: data.email,
    phone: data.phone ?? null,
    company: data.company ?? null,
    service: data.service ?? null,
    budget: data.budget ?? null,
    message: data.message,
    consent_lgpd: data.consentLgpd,
    source: 'contact',
  })
  if (error) throw new Error(error.message)
}
