import { useState, useEffect, useRef, Fragment } from 'react'
import { motion } from 'framer-motion'
import { Container } from '@/components/ui/Container'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { LiquidMetalButton } from '@/components/ui/LiquidMetalButton'

/* ══════════════════════════════════════════════════
   Premium comparison matrix
   Score Totals + CTA Row · Paleta clean
══════════════════════════════════════════════════ */

const SCORES = { nookweb: 94, trad: 34, free: 19 }

const ROWS = [
  { criterion: 'Prazo de entrega', nookweb: '2–4 semanas', trad: '3–6 meses', free: 'Indefinido' },
  { criterion: 'Custo inicial', nookweb: 'Até 90% menor', trad: 'R$ 50k+', free: 'Variável' },
  { criterion: 'Escalabilidade', nookweb: 'Alta', trad: 'Alta', free: 'Limitada' },
  { criterion: 'Suporte pós-entrega', nookweb: 'Contínuo', trad: 'Por contrato', free: 'Raramente' },
  { criterion: 'IA integrada', nookweb: 'Nativa', trad: 'Raramente', free: 'Depende' },
  { criterion: 'Flexibilidade de stack', nookweb: 'Total', trad: 'Restrita', free: 'Parcial' },
  { criterion: 'Documentação técnica', nookweb: 'Completa', trad: 'Parcial', free: 'Nenhuma' },
  { criterion: 'Ferramenta própria de gestão', nookweb: 'Impulso Studio', trad: 'Terceiros', free: 'Nenhuma' },
]

const GRID_COLS = 'minmax(160px, 200px) 1fr 1fr 1fr'
const BORDER = '1px solid rgba(28,26,22,0.08)'
const BORDER_NOOK = '1px solid rgba(184,134,11,0.25)'
/* Mesma fonte do CasesSection: Space Mono */
const FONT_SPACE_MONO = { fontFamily: "'Space Mono', monospace", letterSpacing: '2px' } as const

function ScoreTotals({ animate }: { animate: boolean }) {
  const [nookVal, setNookVal] = useState(0)
  const [tradVal, setTradVal] = useState(0)
  const [freeVal, setFreeVal] = useState(0)
  const started = useRef(false)

  useEffect(() => {
    if (!animate || started.current) return
    started.current = true
    let i = 0
    const id = setInterval(() => {
      i++
      setNookVal(Math.round(SCORES.nookweb * i / 40))
      setTradVal(Math.round(SCORES.trad * i / 40))
      setFreeVal(Math.round(SCORES.free * i / 40))
      if (i >= 40) {
        setNookVal(SCORES.nookweb)
        setTradVal(SCORES.trad)
        setFreeVal(SCORES.free)
        clearInterval(id)
      }
    }, 30)
    return () => clearInterval(id)
  }, [animate])

  return (
    <>
      <div className="flex items-center px-6 py-5" style={{ borderRight: BORDER, borderTop: '1px solid rgba(28,26,22,0.1)', background: 'rgba(248,247,245,0.8)' }}>
        <span className="font-mono text-[9px] font-medium tracking-[0.2em] uppercase text-neutral">Score total</span>
      </div>
      <div className="flex flex-col items-center justify-center gap-2 px-6 py-5 text-center" style={{ borderRight: BORDER_NOOK, borderLeft: BORDER_NOOK, borderTop: '1px solid rgba(28,26,22,0.1)', background: 'rgba(249,249,244,0.9)' }}>
        <div className="flex items-baseline justify-center gap-1.5">
          <span className="text-[clamp(28px,3vw,36px)] font-medium leading-none text-heavy" style={FONT_SPACE_MONO}>{nookVal}</span>
          <span className="text-[11px] text-neutral" style={FONT_SPACE_MONO}>/100</span>
        </div>
        <div className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase" style={{ ...FONT_SPACE_MONO, borderColor: 'rgba(184,134,11,0.3)', color: 'rgba(28,26,22,0.9)', background: 'rgba(184,134,11,0.08)' }}>
          <span className="text-[8px]">●</span> Escolha evidente
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-1 px-6 py-5 text-center" style={{ borderRight: BORDER, borderTop: '1px solid rgba(28,26,22,0.1)', background: 'rgba(248,247,245,0.8)' }}>
        <div className="flex items-baseline justify-center gap-1.5">
          <span className="text-[clamp(22px,2.5vw,28px)] font-medium leading-none text-neutral" style={FONT_SPACE_MONO}>{tradVal}</span>
          <span className="text-[11px] text-neutral/70" style={FONT_SPACE_MONO}>/100</span>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-1 px-6 py-5 text-center" style={{ borderTop: '1px solid rgba(28,26,22,0.1)', background: 'rgba(248,247,245,0.8)' }}>
        <div className="flex items-baseline justify-center gap-1.5">
          <span className="text-[clamp(22px,2.5vw,28px)] font-medium leading-none text-neutral" style={FONT_SPACE_MONO}>{freeVal}</span>
          <span className="text-[11px] text-neutral/70" style={FONT_SPACE_MONO}>/100</span>
        </div>
      </div>
    </>
  )
}

export function Comparativo() {
  const [animate, setAnimate] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e?.isIntersecting) {
        setAnimate(true)
        obs.disconnect()
      }
    }, { threshold: 0.12 })
    if (sectionRef.current) obs.observe(sectionRef.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-24">
      <Container>
        <SectionHeader
          label="Comparativo"
          title="Por Que a Nookweb?"
          description="Veja a diferença na prática."
        />

        <motion.div
          className="overflow-hidden rounded-2xl bg-pure shadow-[0_4px_24px_rgba(28,26,22,0.06),0_0_1px_rgba(28,26,22,0.04)]"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
        >
          <div className="overflow-x-auto">
            <div
              className="min-w-[600px] font-sans"
              style={{ display: 'grid', gridTemplateColumns: GRID_COLS }}
            >
              {/* Header — fundo um pouco mais escuro para destacar títulos */}
              <div
                className="flex items-center px-6 py-5"
                style={{
                  borderRight: BORDER,
                  borderBottom: '1px solid rgba(28,26,22,0.12)',
                  background: 'rgba(232,226,221,0.9)',
                }}
              >
                <span className="font-mono text-[9px] font-medium tracking-[0.2em] uppercase text-neutral">
                  Critério
                </span>
              </div>
              <div
                className="flex items-center justify-center px-6 py-5"
                style={{
                  borderRight: BORDER_NOOK,
                  borderLeft: BORDER_NOOK,
                  borderBottom: '1px solid rgba(28,26,22,0.12)',
                  background: 'rgba(225,220,212,0.95)',
                }}
              >
                <span className="text-[9px] font-semibold uppercase text-heavy" style={FONT_SPACE_MONO}>
                  Nookweb
                </span>
              </div>
              <div
                className="flex items-center justify-center px-6 py-5"
                style={{
                  borderRight: BORDER,
                  borderBottom: '1px solid rgba(28,26,22,0.12)',
                  background: 'rgba(232,226,221,0.9)',
                }}
              >
                <span className="text-[9px] font-medium uppercase text-neutral" style={FONT_SPACE_MONO}>
                  Agências
                </span>
              </div>
              <div
                className="flex items-center justify-center px-6 py-5"
                style={{
                  borderBottom: '1px solid rgba(28,26,22,0.12)',
                  background: 'rgba(232,226,221,0.9)',
                }}
              >
                <span className="text-[9px] font-medium uppercase text-neutral" style={FONT_SPACE_MONO}>
                  Freelancers
                </span>
              </div>

              {/* Data rows — mesmo cores, font, tamanho das colunas Score Total e CTA */}
              {ROWS.map((r, i) => (
                <Fragment key={r.criterion}>
                  <div
                    className="flex items-center px-6 py-5 transition-colors hover:bg-soft/40"
                    style={{
                      borderRight: BORDER,
                      borderBottom: i < ROWS.length - 1 ? BORDER : 'none',
                      background: 'rgba(248,247,245,0.8)',
                    }}
                  >
                    <span className="font-mono text-[9px] font-medium tracking-[0.2em] uppercase text-neutral">
                      {r.criterion}
                    </span>
                  </div>
                  <div
                    className="flex items-center justify-center px-6 py-5 transition-colors hover:bg-soft/20"
                    style={{
                      borderRight: BORDER_NOOK,
                      borderLeft: BORDER_NOOK,
                      borderBottom: i < ROWS.length - 1 ? BORDER : 'none',
                      background: 'rgba(249,249,244,0.9)',
                    }}
                  >
                    {r.criterion === 'Ferramenta própria de gestão' ? (
                      <img src="https://studio.impulsotech.dev/impulso-studio-logo.png" alt="Impulso Studio" className="h-6 w-auto object-contain" />
                    ) : (
                      <span className="text-[9px] font-medium uppercase text-heavy" style={FONT_SPACE_MONO}>
                        {r.nookweb}
                      </span>
                    )}
                  </div>
                  <div
                    className="flex items-center justify-center px-6 py-5 transition-colors hover:bg-soft/40"
                    style={{
                      borderRight: BORDER,
                      borderBottom: i < ROWS.length - 1 ? BORDER : 'none',
                      background: 'rgba(248,247,245,0.8)',
                    }}
                  >
                    <span className="text-[9px] font-medium uppercase text-neutral" style={FONT_SPACE_MONO}>
                      {r.trad}
                    </span>
                  </div>
                  <div
                    className="flex items-center justify-center px-6 py-5 transition-colors hover:bg-soft/40"
                    style={{
                      borderBottom: i < ROWS.length - 1 ? BORDER : 'none',
                      background: 'rgba(248,247,245,0.8)',
                    }}
                  >
                    <span className="text-[9px] font-medium uppercase text-neutral" style={FONT_SPACE_MONO}>
                      {r.free}
                    </span>
                  </div>
                </Fragment>
              ))}

              <ScoreTotals animate={animate} />

              {/* CTA Row */}
              <div className="flex items-center px-6 py-5" style={{ borderRight: BORDER, borderTop: BORDER, background: 'linear-gradient(180deg, rgba(232,226,221,0.25) 0%, rgba(232,226,221,0.12) 100%)' }}>
                <span className="font-mono text-[9px] font-medium tracking-[0.2em] uppercase text-neutral">Próximo passo</span>
              </div>
              <div className="flex flex-col items-center justify-center gap-2 px-6 py-5 text-center" style={{ borderRight: '1px solid rgba(184,134,11,0.2)', borderLeft: '1px solid rgba(184,134,11,0.2)', borderTop: BORDER, background: 'rgba(249,249,244,0.6)' }}>
                <LiquidMetalButton label="Agendar Diagnóstico Gratuito" to="/contato" size="large" />
                <span className="text-[9px] text-neutral uppercase" style={FONT_SPACE_MONO}>Sem compromisso · 24h de resposta</span>
              </div>
              <div className="flex flex-col items-center justify-center gap-1 px-6 py-5 text-center opacity-70" style={{ borderRight: BORDER, borderTop: BORDER, background: 'linear-gradient(180deg, rgba(232,226,221,0.25) 0%, rgba(232,226,221,0.12) 100%)' }}>
                <div className="text-[9px] font-medium uppercase text-heavy/70" style={FONT_SPACE_MONO}>Processo seletivo demorado</div>
                <div className="text-[9px] uppercase text-neutral" style={FONT_SPACE_MONO}>Reuniões, propostas, negociações…</div>
              </div>
              <div className="flex flex-col items-center justify-center gap-1 px-6 py-5 text-center opacity-60" style={{ borderTop: BORDER, background: 'linear-gradient(180deg, rgba(232,226,221,0.25) 0%, rgba(232,226,221,0.12) 100%)' }}>
                <div className="text-[9px] font-medium uppercase text-heavy/70" style={FONT_SPACE_MONO}>Busca no LinkedIn/99Freelas</div>
                <div className="text-[9px] uppercase text-neutral" style={FONT_SPACE_MONO}>Sem garantia de entrega ou qualidade</div>
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
