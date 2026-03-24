import { getSupabaseBrowser } from './supabase'

const DEFAULT_BUCKET = 'site-media'

/**
 * Upload de arquivo para o Storage (bucket `site-media` por padrão).
 * Em produção: configure policies (insert) para usuários autenticados ou use Edge Function + service_role.
 */
export async function uploadSiteMedia(file: File, path: string, bucket = DEFAULT_BUCKET) {
  const client = getSupabaseBrowser()
  if (!client) throw new Error('Supabase não configurado.')
  const { data, error } = await client.storage.from(bucket).upload(path, file, {
    cacheControl: '3600',
    upsert: true,
  })
  if (error) throw new Error(error.message)
  const { data: pub } = client.storage.from(bucket).getPublicUrl(data.path)
  return { path: data.path, publicUrl: pub.publicUrl }
}
