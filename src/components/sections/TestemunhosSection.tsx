import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const API = import.meta.env.VITE_API_URL ?? 'https://api.nookweb.com.br'

/* ── types ── */
interface Depoimento {
  id: string
  nome: string
  cargo: string
  texto: string
  resultado?: string
  rating: number
}

/* ── fallback ── */
const FALLBACK: Depoimento[] = [
  {
    id: 'f1',
    nome: 'Rafael Costa',
    cargo: 'CEO, Contpix',
    texto: 'Entregaram em 3 semanas o que levaria 6 meses numa agência tradicional. Processo transparente, resultado acima do esperado.',
    resultado: '+240% de conversão',
    rating: 5,
  },
  {
    id: 'f2',
    nome: 'Marina Alves',
    cargo: 'Diretora de Operações, Tecnopano',
    texto: 'O assistente de IA que colocaram no nosso ERP responde quase tudo sozinho. O suporte ficou mais calmo e rápido.',
    resultado: '60% menos tickets',
    rating: 5,
  },
  {
    id: 'f3',
    nome: 'Lucas Ferreira',
    cargo: 'Fundador, Black Ice Modas',
    texto: 'Saímos do zero para uma loja online completa com IA, frete real e Pix em menos de um mês. Sem travamento, sem burocracia.',
    resultado: 'Loja no ar em 18 dias',
    rating: 5,
  },
]

function getInitials(name: string) {
  return name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
}

/* Lucide Quote icon — mesmo SVG do iz.ai */
function QuoteIcon({ style }: { style?: React.CSSProperties }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24" height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={style}
    >
      <path d="M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z" />
      <path d="M5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z" />
    </svg>
  )
}

/* Lucide TrendingUp icon */
function TrendingUpIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16" height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
      <polyline points="16 7 22 7 22 13" />
    </svg>
  )
}

/* ── cores (Nookweb orange substitui teal do iz.ai) ── */
const ORANGE = '#FF4500'
const ORANGE_12 = 'rgba(255,69,0,0.12)'
const ORANGE_45 = 'rgba(255,69,0,0.45)'

/* ════════════════════════════════════════════════════════════════ */
export function TestemunhosSection() {
  const [depoimentos, setDepoimentos] = useState<Depoimento[]>(FALLBACK)
  const [activeIdx, setActiveIdx] = useState(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  /* form */
  const [formNome, setFormNome] = useState('')
  const [formCargo, setFormCargo] = useState('')
  const [formTexto, setFormTexto] = useState('')
  const [formRating, setFormRating] = useState(5)
  const [formHover, setFormHover] = useState(0)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  /* buscar aprovados da própria API */
  useEffect(() => {
    fetch(`${API}/testimonials`)
      .then(r => r.json())
      .then((data: any[]) => {
        if (data?.length > 0) setDepoimentos(data.map(t => ({
          id: String(t.id),
          nome: t.nome || '',
          cargo: t.cargo || '',
          texto: t.texto || '',
          resultado: t.resultado || undefined,
          rating: t.rating ?? 5,
        })))
      })
      .catch(() => { /* usa fallback */ })
  }, [])

  /* auto-rotate */
  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setActiveIdx(prev => (prev + 1) % depoimentos.length)
    }, 5200)
  }, [depoimentos.length])

  useEffect(() => {
    startTimer()
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [startTimer])

  const restartTimer = (idx: number) => {
    setActiveIdx(idx)
    startTimer()
  }

  const active = depoimentos[activeIdx] ?? FALLBACK[0]

  /* submit — POST /testimonials → banco + WhatsApp + email na API */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formNome.trim() || !formTexto.trim()) return
    setSubmitting(true)
    try {
      await fetch(`${API}/testimonials`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome: formNome.trim(),
          cargo: formCargo.trim(),
          texto: formTexto.trim(),
          rating: formRating,
        }),
      })
      setSubmitted(true)
      setFormNome(''); setFormCargo(''); setFormTexto(''); setFormRating(5)
    } catch { /* silencioso */ } finally {
      setSubmitting(false)
    }
  }

  /* ── render ── */
  return (
    <section
      id="depoimentos"
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: 'var(--surface-main)',
        padding: '96px 0 128px',
      }}
    >
      {/* blob decorativo — igual ao iz.ai mas com orange */}
      <div aria-hidden="true" style={{
        pointerEvents: 'none',
        position: 'absolute',
        left: -128, top: -128,
        width: 384, height: 384,
        borderRadius: '50%',
        filter: 'blur(64px)',
        background: ORANGE_12,
      }} />

      {/* grid lines vertical */}
      <div aria-hidden="true" style={{
        pointerEvents: 'none',
        position: 'absolute',
        inset: 0,
        opacity: 0.35,
        backgroundImage: 'linear-gradient(to right, rgba(28,26,22,0.04) 1px, transparent 1px)',
        backgroundSize: '72px 100%',
      }} />

      {/* ── container max-w-5xl ── */}
      <div style={{ position: 'relative', margin: '0 auto', maxWidth: 960, padding: '0 24px' }}>

        {/* label row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ display: 'inline-block', height: 1, width: 32, background: ORANGE, flexShrink: 0 }} />
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            textTransform: 'uppercase' as const,
            letterSpacing: '0.22em',
            color: 'rgba(28,26,22,0.55)',
          }}>
            Depoimentos
          </span>
        </div>

        {/* quote area — relative mt-10 min-h-72 */}
        <div style={{ position: 'relative', marginTop: 40, minHeight: 288 }}>

          {/* Lucide Quote — absolute -left-1 -top-4 h-12 w-12 */}
          <QuoteIcon style={{
            position: 'absolute',
            left: -4, top: -16,
            width: 48, height: 48,
            color: ORANGE,
            opacity: 0.5,
          }} />

          {/* animated blockquote */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } }}
              exit={{ opacity: 0, y: -12, transition: { duration: 0.22 } }}
            >
              <blockquote style={{ maxWidth: 760, paddingTop: 24, margin: 0 }}>
                <p style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(28px, 3.8vw, 52px)',
                  lineHeight: 1.18,
                  letterSpacing: '-0.01em',
                  color: 'var(--heavy)',
                  margin: 0,
                }}>
                  {active.texto}
                </p>
              </blockquote>

              {/* author + result card row */}
              <div style={{
                marginTop: 40,
                display: 'flex',
                flexWrap: 'wrap' as const,
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 32,
              }}>
                {/* figcaption */}
                <figcaption style={{ display: 'flex', alignItems: 'center', gap: 16, margin: 0 }}>
                  <span style={{
                    display: 'flex',
                    width: 48, height: 48,
                    flexShrink: 0,
                    alignItems: 'center', justifyContent: 'center',
                    borderRadius: '50%',
                    fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 500,
                    background: ORANGE_12,
                    color: ORANGE,
                    boxShadow: `${ORANGE} 0px 0px 0px 1px inset`,
                  }}>
                    {getInitials(active.nome)}
                  </span>
                  <span style={{ display: 'flex', flexDirection: 'column' as const }}>
                    <span style={{
                      fontFamily: 'var(--font-sans)', fontSize: 15,
                      fontWeight: 600, color: 'var(--heavy)',
                    }}>
                      {active.nome}
                    </span>
                    <span style={{
                      fontFamily: 'var(--font-sans)', fontSize: 13,
                      color: 'rgba(28,26,22,0.5)',
                    }}>
                      {active.cargo}
                    </span>
                  </span>
                </figcaption>

                {/* result card — rounded-2xl bg-white/70 backdrop-blur */}
                {active.resultado && (
                  <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: 12,
                    borderRadius: 16,
                    padding: '16px 20px',
                    background: 'rgba(255,255,255,0.7)',
                    backdropFilter: 'blur(8px)',
                    boxShadow: `${ORANGE_45} 0px 0px 0px 1px inset`,
                  }}>
                    <span style={{
                      display: 'flex', width: 36, height: 36,
                      alignItems: 'center', justifyContent: 'center',
                      borderRadius: 8,
                      background: ORANGE_12,
                      color: ORANGE,
                    }}>
                      <TrendingUpIcon />
                    </span>
                    <span style={{ display: 'flex', flexDirection: 'column' as const }}>
                      <span style={{
                        fontFamily: 'var(--font-mono)', fontSize: 10,
                        textTransform: 'uppercase' as const, letterSpacing: '0.2em',
                        color: 'rgba(28,26,22,0.5)',
                      }}>
                        Resultado
                      </span>
                      <span style={{
                        fontFamily: 'var(--font-sans)', fontSize: 15,
                        fontWeight: 600, color: 'var(--heavy)',
                      }}>
                        {active.resultado}
                      </span>
                    </span>
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── navegação por avatares — mt-14 border-t pt-8 ── */}
        <div style={{
          marginTop: 56,
          display: 'flex', alignItems: 'center', gap: 20,
          borderTop: '1px solid rgba(28,26,22,0.08)',
          paddingTop: 32,
        }}>
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: 10,
            textTransform: 'uppercase' as const, letterSpacing: '0.2em',
            color: 'rgba(28,26,22,0.45)',
          }}>
            Clientes
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {depoimentos.map((d, i) => {
              const isActive = i === activeIdx
              return (
                <button
                  key={d.id}
                  onClick={() => restartTimer(i)}
                  title={d.nome}
                  style={{
                    display: 'flex', width: 44, height: 44,
                    alignItems: 'center', justifyContent: 'center',
                    borderRadius: '50%',
                    border: 'none',
                    fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 500,
                    cursor: 'pointer',
                    transition: 'box-shadow 0.25s, background 0.25s, color 0.25s',
                    background: isActive ? ORANGE_12 : 'rgba(28,26,22,0.06)',
                    color: isActive ? ORANGE : 'rgba(28,26,22,0.4)',
                    /* active: double ring; inactive: inset border — igual iz.ai */
                    boxShadow: isActive
                      ? `${ORANGE} 0px 0px 0px 2px, ${ORANGE_12} 0px 0px 0px 5px`
                      : 'rgba(28,26,22,0.08) 0px 0px 0px 1px inset',
                    outline: 'none',
                  }}
                >
                  {getInitials(d.nome)}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* ════ FORMULÁRIO ════ */}
      <div style={{
        marginTop: 80,
        borderTop: '1px solid rgba(28,26,22,0.06)',
        background: '#fff',
        padding: '56px 24px',
      }}>
        <div style={{
          maxWidth: 960, margin: '0 auto',
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          gap: 60, alignItems: 'start',
        }}>

          {/* copy */}
          <div>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              fontFamily: 'var(--font-mono)', fontSize: 10,
              letterSpacing: '0.22em', textTransform: 'uppercase' as const,
              color: ORANGE, marginBottom: 16,
            }}>
              <span style={{ display: 'inline-block', height: 1, width: 24, background: ORANGE }} />
              Seu depoimento
            </span>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(26px, 3vw, 40px)',
              fontWeight: 400, color: 'var(--heavy)',
              lineHeight: 1.18, letterSpacing: '-0.01em',
              marginBottom: 16,
            }}>
              Trabalhou com a{' '}
              <em style={{ color: ORANGE, fontStyle: 'italic' }}>Nookweb</em>?
            </h2>
            <p style={{
              fontFamily: 'var(--font-sans)', fontSize: 15,
              color: 'rgba(28,26,22,0.5)', lineHeight: 1.6,
            }}>
              Compartilhe sua experiência. Depoimentos são revisados pela equipe e publicados em até 24h.
            </p>
          </div>

          {/* form */}
          {submitted ? (
            <div style={{
              border: `1px solid rgba(255,69,0,0.2)`,
              borderRadius: 16, padding: 32,
              background: 'rgba(255,69,0,0.04)',
              textAlign: 'center' as const,
            }}>
              <div style={{
                width: 48, height: 48, borderRadius: '50%',
                background: ORANGE_12, color: ORANGE,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 22, fontWeight: 700, margin: '0 auto 16px',
              }}>✓</div>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: 'var(--heavy)', marginBottom: 8 }}>
                Obrigado pelo depoimento!
              </p>
              <p style={{ fontSize: 14, color: 'rgba(28,26,22,0.5)' }}>
                Vamos revisar e publicar em breve.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' as const, gap: 12 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <input
                  required
                  placeholder="Seu nome"
                  value={formNome}
                  onChange={e => setFormNome(e.target.value)}
                  style={inputStyle}
                />
                <input
                  placeholder="Empresa / Cargo"
                  value={formCargo}
                  onChange={e => setFormCargo(e.target.value)}
                  style={inputStyle}
                />
              </div>
              <textarea
                required
                placeholder="Conte sua experiência com a Nookweb…"
                value={formTexto}
                onChange={e => setFormTexto(e.target.value)}
                rows={4}
                style={{ ...inputStyle, resize: 'none' as const }}
              />

              {/* rating */}
              <div>
                <p style={{
                  fontFamily: 'var(--font-mono)', fontSize: 10,
                  letterSpacing: '0.18em', textTransform: 'uppercase' as const,
                  color: 'rgba(28,26,22,0.45)', marginBottom: 8,
                }}>
                  Avaliação
                </p>
                <div style={{ display: 'flex', gap: 4 }}>
                  {[1, 2, 3, 4, 5].map(n => (
                    <button
                      key={n}
                      type="button"
                      onMouseEnter={() => setFormHover(n)}
                      onMouseLeave={() => setFormHover(0)}
                      onClick={() => setFormRating(n)}
                      style={{
                        background: 'none', border: 'none', cursor: 'pointer',
                        fontSize: 22, padding: 0, lineHeight: 1,
                        color: n <= (formHover || formRating) ? ORANGE : 'rgba(28,26,22,0.15)',
                        transition: 'color 0.15s',
                      }}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  background: submitting ? ORANGE_45 : ORANGE,
                  color: '#fff', border: 'none', borderRadius: 12,
                  padding: '13px 24px',
                  cursor: submitting ? 'not-allowed' : 'pointer',
                  fontFamily: 'var(--font-mono)', fontSize: 11,
                  fontWeight: 700, letterSpacing: '0.1em',
                  textTransform: 'uppercase' as const,
                  transition: 'background 0.2s',
                  alignSelf: 'flex-start' as const,
                  marginTop: 4,
                }}
              >
                {submitting ? 'Enviando…' : 'Enviar depoimento →'}
              </button>
            </form>
          )}
        </div>
      </div>

    </section>
  )
}

const inputStyle: React.CSSProperties = {
  background: 'rgba(28,26,22,0.03)',
  border: '1px solid rgba(28,26,22,0.1)',
  borderRadius: 10,
  padding: '11px 14px',
  fontFamily: 'var(--font-sans)',
  fontSize: 14,
  color: 'var(--heavy)',
  outline: 'none',
  width: '100%',
}
