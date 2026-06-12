import { useState, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { services } from '@/data/services'

// ─── Ícones Lucide mapeados por slug ───────────────────────────────────────
const ICONS: Record<string, string> = {
  sites: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,
  'e-commerce': `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>`,
  aplicativos: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>`,
  saas: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>`,
  'erp-crm': `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/></svg>`,
  integracoes: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>`,
  'inteligencia-artificial': `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.663 17h4.673M12 3v1m6.364 1.636-.707.707M21 12h-1M4 12H3m3.343-5.657-.707-.707m2.828 9.9a5 5 0 1 1 7.072 0l-.548.547A3.374 3.374 0 0 0 14 18.469V19a2 2 0 1 1-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>`,
}

const ICON_COLORS: Record<string, string> = {
  sites: '#FF4500',
  'e-commerce': '#3B82F6',
  aplicativos: '#10B981',
  saas: '#8B5CF6',
  'erp-crm': '#F59E0B',
  integracoes: '#06B6D4',
  'inteligencia-artificial': '#FF4500',
}

function SvgIcon({ slug, size = 22, className = '' }: { slug: string; size?: number; className?: string }) {
  const svg = ICONS[slug] ?? ICONS['sites']
  const sized = svg.replace(/width="22" height="22"/, `width="${size}" height="${size}"`)
  return <span className={className} dangerouslySetInnerHTML={{ __html: sized }} />
}

// ═══════════════════════════════════════════════════════════════
// MODELO A — Dark Grid + Corner Brackets
// ═══════════════════════════════════════════════════════════════
function ModeloA() {
  return (
    <section className="py-20 px-6 bg-[#1C1A16]" id="modelo-a">
      <div className="max-w-6xl mx-auto">
        <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-white/30 mb-3">[ CAPABILITIES ]</p>
        <h2 className="text-4xl sm:text-5xl font-display font-bold text-white mb-3">
          7 formas de transformar<br />seu negócio
        </h2>
        <p className="text-white/40 font-mono text-sm mb-14">Clique em cada serviço para ver detalhes, stack e cases.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((s) => (
            <Link key={s.id} to={`/servicos/${s.slug}`}>
              <motion.div
                className="group relative border border-zinc-800 bg-zinc-950/60 rounded-xl p-6 overflow-hidden transition-colors duration-300 hover:border-zinc-600 cursor-pointer"
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
              >
                {/* Corner brackets on hover */}
                <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute -left-[2px] -top-[2px] h-4 w-4 bg-white" />
                  <div className="absolute -right-[2px] -top-[2px] h-4 w-4 bg-white" />
                  <div className="absolute -left-[2px] -bottom-[2px] h-4 w-4 bg-white" />
                  <div className="absolute -right-[2px] -bottom-[2px] h-4 w-4 bg-white" />
                </div>

                {/* Inner glow */}
                <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `radial-gradient(ellipse at top left, ${ICON_COLORS[s.slug] ?? '#FF4500'}08, transparent 60%)` }} />

                <div className="relative z-10">
                  {/* Icon */}
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-700 bg-zinc-900/70 mb-5"
                    style={{ color: ICON_COLORS[s.slug] ?? '#FF4500' }}>
                    <SvgIcon slug={s.slug} size={20} />
                  </div>

                  <h3 className="text-[15px] font-semibold text-zinc-100 mb-2 leading-snug">{s.name}</h3>
                  <p className="text-sm text-zinc-400 leading-relaxed mb-5">{s.description}</p>

                  {/* Stack pills */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {(s.stack ?? []).slice(0, 3).map((tech) => (
                      <span key={tech} className="px-2 py-0.5 text-[10px] font-mono rounded border border-zinc-700 text-zinc-400 bg-zinc-900/60">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <span className="text-xs font-mono text-white/40 group-hover:text-[#FF4500] transition-colors duration-200">
                    Ver detalhes →
                  </span>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════
// MODELO B — Bento Grid Assimétrico
// ═══════════════════════════════════════════════════════════════
function ModeloB() {
  const bentoLayout = [
    { slug: 'sites', colSpan: 'sm:col-span-2', rowSpan: '' },
    { slug: 'e-commerce', colSpan: '', rowSpan: '' },
    { slug: 'aplicativos', colSpan: '', rowSpan: '' },
    { slug: 'saas', colSpan: '', rowSpan: '' },
    { slug: 'erp-crm', colSpan: 'sm:col-span-2', rowSpan: '' },
    { slug: 'integracoes', colSpan: '', rowSpan: '' },
    { slug: 'inteligencia-artificial', colSpan: 'sm:col-span-2', rowSpan: '' },
  ]

  return (
    <section className="py-20 px-6 bg-[#F9F8F5]" id="modelo-b">
      <div className="max-w-6xl mx-auto">
        <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-[#1C1A16]/30 mb-3">SERVIÇOS</p>
        <h2 className="text-4xl sm:text-5xl font-display font-bold text-[#1C1A16] mb-3">
          7 formas de transformar<br />seu negócio
        </h2>
        <p className="text-[#1C1A16]/40 font-mono text-sm mb-14">Clique em cada serviço para ver detalhes, stack e cases.</p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 auto-rows-[200px]">
          {bentoLayout.map(({ slug, colSpan }) => {
            const s = services.find((sv) => sv.slug === slug)!
            return (
              <Link key={slug} to={`/servicos/${slug}`} className={colSpan}>
                <motion.div
                  className="group relative h-full border border-[#E8E4DC] bg-white rounded-2xl p-7 overflow-hidden hover:border-[#FF4500]/40 hover:shadow-lg transition-all duration-300 cursor-pointer"
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.25 }}
                >
                  {/* Watermark number */}
                  <span className="absolute right-4 bottom-2 text-[100px] font-black text-[#1C1A16]/[0.03] leading-none select-none pointer-events-none">
                    {String(services.indexOf(s) + 1).padStart(2, '0')}
                  </span>

                  <div className="relative z-10 h-full flex flex-col">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#F5F0E8] mb-4"
                      style={{ color: ICON_COLORS[s.slug] ?? '#FF4500' }}>
                      <SvgIcon slug={s.slug} size={18} />
                    </div>
                    <h3 className="text-lg font-semibold text-[#1C1A16] mb-1 leading-snug">{s.name}</h3>
                    <p className="text-sm text-[#1C1A16]/50 leading-relaxed flex-1 line-clamp-2">{s.description}</p>
                    <span className="mt-3 text-xs font-mono text-[#FF4500] opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      Ver mais →
                    </span>
                  </div>
                </motion.div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════
// MODELO C — Lista Editorial Numerada
// ═══════════════════════════════════════════════════════════════
function ModeloC() {
  return (
    <section className="py-20 px-6 bg-white" id="modelo-c">
      <div className="max-w-5xl mx-auto">
        <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-[#1C1A16]/30 mb-3">SERVIÇOS</p>
        <h2 className="text-4xl sm:text-5xl font-display font-bold text-[#1C1A16] mb-16">
          7 formas de transformar<br />seu negócio
        </h2>

        <div className="divide-y divide-[#E8E4DC]">
          {services.map((s, i) => (
            <Link key={s.id} to={`/servicos/${s.slug}`}>
              <motion.div
                className="group grid grid-cols-[64px_1fr_auto] sm:grid-cols-[80px_1fr_200px] items-start gap-6 py-6 cursor-pointer"
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
              >
                {/* Number */}
                <span className="font-mono text-3xl font-black text-[#1C1A16]/10 group-hover:text-[#FF4500]/30 transition-colors duration-300 leading-none pt-1">
                  {String(i + 1).padStart(3, '0')}
                </span>

                {/* Title + desc */}
                <div>
                  <h3 className="text-xl sm:text-2xl font-semibold text-[#1C1A16] mb-1 group-hover:text-[#FF4500] transition-colors duration-200">
                    {s.name}
                  </h3>
                  <p className="text-sm text-[#1C1A16]/50 leading-relaxed max-w-lg">{s.description}</p>
                </div>

                {/* Stack + arrow */}
                <div className="flex flex-col items-end gap-2 pt-1">
                  <div className="flex flex-wrap gap-1 justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    {(s.stack ?? []).slice(0, 2).map((tech) => (
                      <span key={tech} className="px-2 py-0.5 text-[10px] font-mono rounded bg-[#F5F0E8] text-[#1C1A16]/60">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <motion.span
                    className="text-lg text-[#FF4500] font-mono"
                    initial={{ x: 0 }}
                    whileHover={{ x: 6 }}
                  >
                    →
                  </motion.span>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════
// MODELO D — Cards Gradiente com Hover Tilt 3D
// ═══════════════════════════════════════════════════════════════
const CARD_GRADIENTS: Record<string, string> = {
  sites:                    'from-[#FF4500]/20 via-[#FF6D00]/10 to-transparent',
  'e-commerce':             'from-[#3B82F6]/20 via-[#06B6D4]/10 to-transparent',
  aplicativos:              'from-[#10B981]/20 via-[#059669]/10 to-transparent',
  saas:                     'from-[#8B5CF6]/20 via-[#7C3AED]/10 to-transparent',
  'erp-crm':                'from-[#F59E0B]/20 via-[#D97706]/10 to-transparent',
  integracoes:              'from-[#06B6D4]/20 via-[#0284C7]/10 to-transparent',
  'inteligencia-artificial':'from-[#FF4500]/20 via-[#FF6D00]/10 to-transparent',
}

function TiltCard({ s }: { s: typeof services[0] }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [hovering, setHovering] = useState(false)

  const handleMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const cx = e.clientX - rect.left
    const cy = e.clientY - rect.top
    const nx = (cx / rect.width - 0.5) * 2
    const ny = (cy / rect.height - 0.5) * 2
    setTilt({ x: ny * -10, y: nx * 10 })
  }, [])

  return (
    <Link to={`/servicos/${s.slug}`}>
      <div
        ref={cardRef}
        onMouseMove={handleMove}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => { setHovering(false); setTilt({ x: 0, y: 0 }) }}
        style={{
          transform: hovering
            ? `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateZ(8px)`
            : 'perspective(800px) rotateX(0deg) rotateY(0deg) translateZ(0px)',
          transition: hovering ? 'transform 0.1s ease-out' : 'transform 0.4s ease-out',
        }}
        className="group relative border border-white/10 bg-white/[0.04] backdrop-blur-sm rounded-2xl p-6 overflow-hidden cursor-pointer"
      >
        {/* Gradient bg */}
        <div className={`absolute inset-0 bg-gradient-to-br ${CARD_GRADIENTS[s.slug] ?? CARD_GRADIENTS['sites']} opacity-60`} />

        {/* Shine */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 60%)' }} />

        <div className="relative z-10 flex flex-col gap-4">
          {/* Icon with glow */}
          <div className="relative w-fit">
            <div className="absolute inset-0 blur-xl opacity-60 rounded-full"
              style={{ backgroundColor: ICON_COLORS[s.slug] ?? '#FF4500', transform: 'scale(1.5)' }} />
            <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 border border-white/15"
              style={{ color: ICON_COLORS[s.slug] ?? '#FF4500' }}>
              <SvgIcon slug={s.slug} size={22} />
            </div>
          </div>

          <div>
            <h3 className="text-[15px] font-semibold text-white mb-1.5 leading-snug">{s.name}</h3>
            <p className="text-sm text-white/40 leading-relaxed line-clamp-3">{s.description}</p>
          </div>

          {/* Stack */}
          <div className="flex flex-wrap gap-1.5">
            {(s.stack ?? []).slice(0, 3).map((tech) => (
              <span key={tech} className="px-2 py-0.5 text-[10px] font-mono rounded border border-white/10 text-white/40 bg-white/5">
                {tech}
              </span>
            ))}
          </div>

          <span className="text-xs font-mono flex items-center gap-1 mt-1"
            style={{ color: ICON_COLORS[s.slug] ?? '#FF4500' }}>
            Ver mais
            <span className="transition-transform group-hover:translate-x-1 duration-200">→</span>
          </span>
        </div>
      </div>
    </Link>
  )
}

function ModeloD() {
  return (
    <section className="py-20 px-6 bg-[#0D0D0B]" id="modelo-d">
      <div className="max-w-6xl mx-auto">
        <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-white/20 mb-3">SERVIÇOS</p>
        <h2 className="text-4xl sm:text-5xl font-display font-bold text-white mb-3">
          7 formas de transformar<br />seu negócio
        </h2>
        <p className="text-white/30 font-mono text-sm mb-14">Clique em cada serviço para ver detalhes, stack e cases.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((s) => <TiltCard key={s.id} s={s} />)}
        </div>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════
// PÁGINA DE PREVIEW — todos os 4 modelos
// ═══════════════════════════════════════════════════════════════
export function ServicosPreview() {
  return (
    <main className="pt-16">
      {/* Sticky nav entre modelos */}
      <div className="sticky top-16 z-40 bg-black/90 backdrop-blur border-b border-white/10 px-6 py-3 flex gap-4 flex-wrap">
        <span className="text-white/40 text-xs font-mono uppercase tracking-widest mr-2 self-center">Preview →</span>
        {['A', 'B', 'C', 'D'].map((l) => (
          <a key={l} href={`#modelo-${l.toLowerCase()}`}
            className="px-3 py-1.5 text-xs font-mono uppercase tracking-widest border border-white/20 text-white/70 hover:border-[#FF4500] hover:text-[#FF4500] transition-colors rounded">
            Modelo {l}
          </a>
        ))}
      </div>

      {/* Label A */}
      <div className="bg-[#1C1A16] px-6 pt-8 pb-0">
        <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-mono bg-[#FF4500]/20 text-[#FF4500] border border-[#FF4500]/30 rounded">
          MODELO A — Dark Grid + Corner Brackets
        </span>
      </div>
      <ModeloA />

      {/* Label B */}
      <div className="bg-[#F9F8F5] px-6 pt-8 pb-0">
        <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-mono bg-[#1C1A16]/10 text-[#1C1A16]/70 border border-[#1C1A16]/20 rounded">
          MODELO B — Bento Grid Assimétrico
        </span>
      </div>
      <ModeloB />

      {/* Label C */}
      <div className="bg-white px-6 pt-8 pb-0">
        <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-mono bg-[#1C1A16]/10 text-[#1C1A16]/70 border border-[#1C1A16]/20 rounded">
          MODELO C — Lista Editorial Numerada
        </span>
      </div>
      <ModeloC />

      {/* Label D */}
      <div className="bg-[#0D0D0B] px-6 pt-8 pb-0">
        <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-mono bg-[#FF4500]/20 text-[#FF4500] border border-[#FF4500]/30 rounded">
          MODELO D — Cards Gradiente + Hover Tilt 3D
        </span>
      </div>
      <ModeloD />
    </main>
  )
}
