import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { serve } from '@hono/node-server'
import pg from 'pg'
import nodemailer from 'nodemailer'
import { readFileSync } from 'fs'

const { Pool } = pg

/* ── Lê Docker secret (arquivo) ou env var ── */
function secret(name, envFallback) {
  try { return readFileSync(`/run/secrets/${name}`, 'utf8').trim() } catch {}
  return process.env[envFallback] ?? ''
}

/* ── Configuração ── */
const DB_URL       = process.env.DATABASE_URL?.replace(
  'NOOKWEB_DB_PASS', secret('nookweb_db_password', 'DB_PASSWORD')
)
const ADMIN_TOKEN  = secret('nookweb_admin_token', 'ADMIN_TOKEN')
const SMTP_PASS    = secret('nookweb_smtp_pass', 'SMTP_PASS')
const EVO_KEY      = secret('evolution_api_key', 'EVOLUTION_API_KEY')
const EVO_INSTANCE = process.env.EVOLUTION_INSTANCE ?? 'izai-studio'
const EVO_URL      = process.env.EVOLUTION_URL      ?? 'https://evolution.izai.dev'
const NOTIFY_PHONE = process.env.NOTIFY_PHONE        // 5511965119797
const PORT         = Number(process.env.PORT ?? 3000)

/* ── Banco ── */
const pool = new Pool({ connectionString: DB_URL })

async function initDb() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS testimonials (
      id         SERIAL PRIMARY KEY,
      nome       TEXT NOT NULL,
      cargo      TEXT,
      texto      TEXT NOT NULL,
      rating     INTEGER DEFAULT 5,
      status     TEXT DEFAULT 'pendente',
      destaque   BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `)
  console.log('✅ DB pronto')
}

/* ── Email ── */
const mailer = SMTP_PASS
  ? nodemailer.createTransport({
      host: 'smtp.hostinger.com',
      port: 465,
      secure: true,
      auth: { user: 'admin@nookweb.com.br', pass: SMTP_PASS },
    })
  : null

async function sendEmail(nome, cargo, texto, rating) {
  if (!mailer) return
  const stars = '★'.repeat(rating) + '☆'.repeat(5 - rating)
  const c = cargo ? ` · ${cargo}` : ''
  await mailer.sendMail({
    from: '"Nookweb Site" <admin@nookweb.com.br>',
    to: 'admin@nookweb.com.br',
    subject: `[Depoimento] Novo pendente — ${nome}`,
    html: `
      <div style="font-family:sans-serif;max-width:560px;color:#1C1A16">
        <div style="background:#FF4500;padding:20px 28px;border-radius:10px 10px 0 0">
          <h2 style="color:#fff;margin:0;font-size:18px">Novo depoimento pendente</h2>
        </div>
        <div style="border:1px solid #eee;border-top:none;padding:24px 28px;border-radius:0 0 10px 10px">
          <p style="margin:0 0 4px"><strong>Autor:</strong> ${nome}${c}</p>
          <p style="margin:0 0 16px;color:#FF4500;font-size:16px">${stars}</p>
          <blockquote style="border-left:3px solid #FF4500;margin:0 0 20px;padding:10px 14px;background:#fff8f6;border-radius:0 6px 6px 0;font-style:italic">
            "${texto}"
          </blockquote>
          <p style="font-size:12px;color:#888;margin:0">
            Aprovar: <code>PATCH https://api.nookweb.com.br/admin/testimonials/{id}</code>
            com header <code>Authorization: Bearer ${ADMIN_TOKEN ?? 'SEU_TOKEN'}</code>
          </p>
        </div>
      </div>
    `,
  }).catch(err => console.error('Email erro:', err))
}

/* ── WhatsApp ── */
async function sendWhatsApp(nome, cargo, texto, rating) {
  if (!EVO_KEY || !NOTIFY_PHONE) return
  const stars = '★'.repeat(rating)
  const c = cargo ? ` · ${cargo}` : ''
  const msg =
    `🔔 *Nookweb — Novo depoimento*\n\n` +
    `👤 *${nome}*${c}\n` +
    `${stars} (${rating}/5)\n\n` +
    `"${texto}"\n\n` +
    `_Aprovar via painel admin ou API_`
  await fetch(`${EVO_URL}/message/sendText/${EVO_INSTANCE}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', apikey: EVO_KEY },
    body: JSON.stringify({ number: NOTIFY_PHONE, text: msg }),
  }).catch(err => console.error('WhatsApp erro:', err))
}

/* ── App ── */
const app = new Hono()

app.use('*', cors({ origin: '*' }))

/* saúde */
app.get('/health', c => c.json({ ok: true }))

/* ─ Depoimentos aprovados (público) ─ */
app.get('/testimonials', async c => {
  const { rows } = await pool.query(
    `SELECT id, nome, cargo, texto, rating
     FROM testimonials
     WHERE status = 'aprovado'
     ORDER BY destaque DESC, created_at DESC`
  )
  return c.json(rows)
})

/* ─ Submeter novo depoimento (público) ─ */
app.post('/testimonials', async c => {
  const body = await c.req.json().catch(() => null)
  if (!body?.nome?.trim() || !body?.texto?.trim()) {
    return c.json({ error: 'nome e texto obrigatórios' }, 400)
  }
  const { nome, cargo = '', texto, rating = 5 } = body
  const { rows } = await pool.query(
    `INSERT INTO testimonials (nome, cargo, texto, rating)
     VALUES ($1, $2, $3, $4) RETURNING id`,
    [nome.trim(), cargo.trim(), texto.trim(), Number(rating)]
  )
  /* notificações em paralelo, não bloqueiam a resposta */
  Promise.all([
    sendEmail(nome.trim(), cargo.trim(), texto.trim(), Number(rating)),
    sendWhatsApp(nome.trim(), cargo.trim(), texto.trim(), Number(rating)),
  ])
  return c.json({ ok: true, id: rows[0].id }, 201)
})

/* ─── ADMIN (requer Bearer token) ─── */

function authMiddleware(c, next) {
  const auth = c.req.header('Authorization') ?? ''
  if (!ADMIN_TOKEN || auth !== `Bearer ${ADMIN_TOKEN}`) {
    return c.json({ error: 'Não autorizado' }, 401)
  }
  return next()
}

/* listar todos (admin) */
app.get('/admin/testimonials', authMiddleware, async c => {
  const { rows } = await pool.query(
    `SELECT * FROM testimonials ORDER BY created_at DESC`
  )
  return c.json(rows)
})

/* aprovar / rejeitar / destacar (admin) */
app.patch('/admin/testimonials/:id', authMiddleware, async c => {
  const id = Number(c.req.param('id'))
  const body = await c.req.json().catch(() => ({}))
  const allowed = ['status', 'destaque']
  const sets = [], vals = []
  for (const key of allowed) {
    if (key in body) { sets.push(`${key} = $${sets.length + 1}`); vals.push(body[key]) }
  }
  if (!sets.length) return c.json({ error: 'nada para atualizar' }, 400)
  vals.push(id)
  await pool.query(
    `UPDATE testimonials SET ${sets.join(', ')} WHERE id = $${vals.length}`,
    vals
  )
  return c.json({ ok: true })
})

/* deletar (admin) */
app.delete('/admin/testimonials/:id', authMiddleware, async c => {
  const id = Number(c.req.param('id'))
  await pool.query('DELETE FROM testimonials WHERE id = $1', [id])
  return c.json({ ok: true })
})

/* ── Start ── */
initDb().then(() => {
  serve({ fetch: app.fetch, port: PORT })
  console.log(`🚀 nookweb-api rodando na porta ${PORT}`)
}).catch(err => {
  console.error('Erro ao iniciar:', err)
  process.exit(1)
})
