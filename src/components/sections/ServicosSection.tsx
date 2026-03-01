import { useState, useRef, useEffect, useCallback } from 'react'
import { LiquidMetalButton } from '@/components/ui/LiquidMetalButton'

/* ════════════════════════════════
   PALETA NOOKWEB
════════════════════════════════ */
const P = {
  orange: '#FF4500',
  orangeAlt: '#FF6D00',
  silver: '#c0c0c0',
  silverB: 'rgba(192,192,192,0.35)',
  metal: '#1a1a1c',
  black: '#000000',
  blackSoft: '#0a0a0a',
  heavy: '#1C1A16',
  neutral: '#767069',
  cream: '#F5F0E8',
  warm: '#F9F9F4',
  surface: '#E7E8E0',
  soft: '#E8E2DD',
  white: '#FFFFFF',
}

/* ════════════════════════════════
   3D CSS SHAPES (laranja + prata)
   aparecem no painel de detalhe
════════════════════════════════ */
function Cube3D({ size = 60, hov }: { size?: number; hov?: boolean }) {
  const h = size / 2
  const face = (tr: string, g: string) => ({
    position: 'absolute' as const,
    width: size,
    height: size,
    background: g,
    transform: tr,
    border: '1px solid rgba(192,192,192,0.3)',
    backfaceVisibility: 'hidden' as const,
  })
  return (
    <div style={{ width: size, height: size, perspective: size * 4 }}>
      <div
        style={{
          width: size,
          height: size,
          position: 'relative',
          transformStyle: 'preserve-3d',
          animation: `rotateCube ${hov ? '1.4s' : '9s'} linear infinite`,
          filter: `drop-shadow(0 0 16px ${P.orange}66)`,
          transition: 'animation-duration 0.3s ease',
        }}
      >
        <div style={face(`translateZ(${h}px)`, `linear-gradient(135deg,${P.orange},${P.orangeAlt})`)} />
        <div style={face(`translateZ(-${h}px) rotateY(180deg)`, `linear-gradient(135deg,rgba(200,75,47,.4),${P.silver}33)`)} />
        <div style={face(`translateX(-${h}px) rotateY(-90deg)`, `linear-gradient(135deg,${P.silver}88,${P.orange}88)`)} />
        <div style={face(`translateX(${h}px)  rotateY(90deg)`, `linear-gradient(135deg,${P.orange}99,${P.silver}66)`)} />
        <div style={face(`translateY(-${h}px) rotateX(90deg)`, `linear-gradient(135deg,#e8e8e8,${P.orange}77)`)} />
        <div style={face(`translateY(${h}px)  rotateX(-90deg)`, `linear-gradient(135deg,${P.metal},${P.orange}44)`)} />
      </div>
    </div>
  )
}
function Gem3D({ size = 60, hov }: { size?: number; hov?: boolean }) {
  const h = size / 2
  const d = 'polygon(50% 0%,100% 50%,50% 100%,0% 50%)'
  const face = (tr: string, g: string) => ({
    position: 'absolute' as const,
    width: size * 0.72,
    height: size * 0.72,
    background: g,
    transform: tr,
    clipPath: d,
    backfaceVisibility: 'hidden' as const,
  })
  return (
    <div style={{ width: size, height: size, perspective: size * 5, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div
        style={{
          width: size * 0.72,
          height: size * 0.72,
          position: 'relative',
          transformStyle: 'preserve-3d',
          animation: `rotateGem ${hov ? '1.1s' : '7s'} linear infinite`,
          filter: `drop-shadow(0 0 20px ${P.orange}88)`,
          transition: 'animation-duration 0.3s ease',
        }}
      >
        <div style={face(`translateZ(${h * 0.5}px)`, `linear-gradient(135deg,#e8e8e8,${P.orange})`)} />
        <div style={face(`translateZ(-${h * 0.5}px) rotateY(180deg)`, `linear-gradient(135deg,${P.orange}99,${P.silver})`)} />
        <div style={face(`translateX(-${h * 0.36}px) rotateY(-90deg)`, `linear-gradient(135deg,${P.orange},${P.orangeAlt})`)} />
        <div style={face(`translateX(${h * 0.36}px) rotateY(90deg)`, `linear-gradient(135deg,${P.orangeAlt},${P.silver}99)`)} />
      </div>
    </div>
  )
}
function Prism3D({ size = 60, hov }: { size?: number; hov?: boolean }) {
  const h = size / 2
  const t = 'polygon(50% 0%,100% 100%,0% 100%)'
  return (
    <div style={{ width: size, height: size, perspective: size * 4 }}>
      <div
        style={{
          width: size,
          height: size,
          position: 'relative',
          transformStyle: 'preserve-3d',
          animation: `rotatePrism ${hov ? '1.6s' : '11s'} linear infinite`,
          filter: `drop-shadow(0 0 14px ${P.orange}55)`,
          transition: 'animation-duration 0.3s ease',
        }}
      >
        <div style={{ position: 'absolute', width: size, height: size, background: `linear-gradient(180deg,#e8e8e8,${P.orange})`, clipPath: t, transform: `translateZ(${h * 0.6}px)`, backfaceVisibility: 'hidden' }} />
        <div style={{ position: 'absolute', width: size, height: size, background: `linear-gradient(180deg,${P.orange}88,${P.silver}55)`, clipPath: t, transform: `translateZ(-${h * 0.6}px) rotateY(180deg)`, backfaceVisibility: 'hidden' }} />
        <div style={{ position: 'absolute', width: h * 1.2, height: size, background: `linear-gradient(90deg,${P.orange}cc,${P.silver}88)`, transform: `translateX(-${h * 0.5}px) rotateY(-60deg)`, backfaceVisibility: 'hidden' }} />
        <div style={{ position: 'absolute', width: h * 1.2, height: size, background: `linear-gradient(90deg,${P.silver}88,${P.orangeAlt}cc)`, transform: `translateX(${h * 0.5}px) rotateY(60deg)`, backfaceVisibility: 'hidden' }} />
      </div>
    </div>
  )
}
function Ring3D({ size = 60, hov }: { size?: number; hov?: boolean }) {
  return (
    <div style={{ width: size, height: size, perspective: size * 3, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div
        style={{
          width: size,
          height: size,
          position: 'relative',
          transformStyle: 'preserve-3d',
          animation: `rotateRing ${hov ? '0.9s' : '6s'} linear infinite`,
          filter: `drop-shadow(0 0 18px ${P.orange}66)`,
          transition: 'animation-duration 0.3s ease',
        }}
      >
        {[...Array(7)].map((_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: size - i * 5,
              height: size - i * 5,
              marginTop: -(size - i * 5) / 2,
              marginLeft: -(size - i * 5) / 2,
              borderRadius: '50%',
              border: `2px solid ${i % 2 === 0 ? P.orange : P.silver}`,
              opacity: 1 - i * 0.1,
              transform: `rotateX(${i * 14}deg) rotateZ(${i * 8}deg)`,
            }}
          />
        ))}
      </div>
    </div>
  )
}
function Sphere3D({ size = 60, hov }: { size?: number; hov?: boolean }) {
  return (
    <div style={{ width: size, height: size, perspective: size * 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div
        style={{
          width: size * 0.85,
          height: size * 0.85,
          position: 'relative',
          borderRadius: '50%',
          background: `radial-gradient(circle at 35% 30%, #e8e8e8, ${P.orange} 50%, ${P.metal})`,
          animation: `rotateSphere ${hov ? '1.2s' : '8s'} linear infinite`,
          boxShadow: `0 0 28px ${P.orange}55, inset 0 -8px 24px ${P.metal}`,
          transition: 'animation-duration 0.3s ease',
        }}
      >
        {[-28, -12, 0, 12, 28].map((y, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              top: `calc(50% + ${y}px - 1px)`,
              left: '5%',
              right: '5%',
              height: '1px',
              background: i === 2 ? `${P.silver}bb` : `${P.silver}44`,
              borderRadius: '50%',
              transform: `scaleX(${Math.cos(Math.abs(y) * Math.PI / 180)})`,
            }}
          />
        ))}
      </div>
    </div>
  )
}

const SHAPES: Record<string, React.ComponentType<{ size?: number; hov?: boolean }>> = {
  cube: Cube3D,
  gem: Gem3D,
  prism: Prism3D,
  ring: Ring3D,
  sphere: Sphere3D,
}

/* ════════════════════════════════
   SVG ICONS (nas linhas)
════════════════════════════════ */
const ICONS: Record<string, (active?: boolean) => React.ReactNode> = {
  web: (a) => (
    <svg width="24" height="24" viewBox="0 0 28 28" fill="none">
      <circle cx="14" cy="14" r="10" stroke={a ? P.orange : P.silver} strokeWidth="1" style={{ transition: 'stroke .4s' }} />
      <line x1="14" y1="4" x2="14" y2="24" stroke={a ? P.orange : P.silver} strokeWidth=".8" style={{ transition: 'stroke .4s' }} />
      <ellipse cx="14" cy="14" rx="5.5" ry="10" stroke={a ? P.orange : P.silver} strokeWidth=".8" style={{ transition: 'stroke .4s' }} />
      <line x1="4" y1="14" x2="24" y2="14" stroke={a ? P.orange : P.silver} strokeWidth=".8" style={{ transition: 'stroke .4s' }} />
    </svg>
  ),
  shop: (a) => (
    <svg width="24" height="24" viewBox="0 0 28 28" fill="none">
      <path d="M5 7h2l3.5 11h9l2.5-7H9" stroke={a ? P.orange : P.silver} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'stroke .4s' }} />
      <circle cx="12" cy="22" r="1.3" stroke={a ? P.orange : P.silver} strokeWidth="1" style={{ transition: 'stroke .4s' }} />
      <circle cx="19.5" cy="22" r="1.3" stroke={a ? P.orange : P.silver} strokeWidth="1" style={{ transition: 'stroke .4s' }} />
    </svg>
  ),
  app: (a) => (
    <svg width="24" height="24" viewBox="0 0 28 28" fill="none">
      <rect x="8" y="3" width="12" height="22" rx="2.5" stroke={a ? P.orange : P.silver} strokeWidth="1" style={{ transition: 'stroke .4s' }} />
      <line x1="12" y1="22" x2="16" y2="22" stroke={a ? P.orange : P.silver} strokeWidth="1" strokeLinecap="round" style={{ transition: 'stroke .4s' }} />
    </svg>
  ),
  cloud: (a) => (
    <svg width="24" height="24" viewBox="0 0 28 28" fill="none">
      <path d="M8 20c-2.5 0-4-1.8-4-4s1.5-4 4-4c0-3.2 2.8-5.8 6-5.8S20 8.8 20 12c2.2 0 4 1.8 4 4s-1.8 4-4 4" stroke={a ? P.orange : P.silver} strokeWidth="1" strokeLinecap="round" style={{ transition: 'stroke .4s' }} />
      <path d="M14 16v6M11.5 19.5L14 16l2.5 3.5" stroke={a ? P.orange : P.silver} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'stroke .4s' }} />
    </svg>
  ),
  erp: (a) => (
    <svg width="24" height="24" viewBox="0 0 28 28" fill="none">
      <rect x="4" y="4" width="8" height="8" rx="1" stroke={a ? P.orange : P.silver} strokeWidth="1" style={{ transition: 'stroke .4s' }} />
      <rect x="16" y="4" width="8" height="8" rx="1" stroke={a ? P.orange : P.silver} strokeWidth="1" style={{ transition: 'stroke .4s' }} />
      <rect x="4" y="16" width="8" height="8" rx="1" stroke={a ? P.orange : P.silver} strokeWidth="1" style={{ transition: 'stroke .4s' }} />
      <rect x="16" y="16" width="8" height="8" rx="1" stroke={a ? P.orange : P.silver} strokeWidth="1" style={{ transition: 'stroke .4s' }} />
      <line x1="12" y1="8" x2="16" y2="8" stroke={a ? P.orange : P.silver} strokeWidth=".6" strokeDasharray="2 2" style={{ transition: 'stroke .4s' }} />
      <line x1="8" y1="12" x2="8" y2="16" stroke={a ? P.orange : P.silver} strokeWidth=".6" strokeDasharray="2 2" style={{ transition: 'stroke .4s' }} />
    </svg>
  ),
  api: (a) => (
    <svg width="24" height="24" viewBox="0 0 28 28" fill="none">
      <circle cx="7" cy="14" r="2.5" stroke={a ? P.orange : P.silver} strokeWidth="1" style={{ transition: 'stroke .4s' }} />
      <circle cx="21" cy="14" r="2.5" stroke={a ? P.orange : P.silver} strokeWidth="1" style={{ transition: 'stroke .4s' }} />
      <line x1="9.5" y1="14" x2="18.5" y2="14" stroke={a ? P.orange : P.silver} strokeWidth="1" style={{ transition: 'stroke .4s' }} />
      <path d="M16 10.5l3.5 3.5-3.5 3.5" stroke={a ? P.orange : P.silver} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'stroke .4s' }} />
    </svg>
  ),
  ai: (a) => (
    <svg width="24" height="24" viewBox="0 0 28 28" fill="none">
      <rect x="7" y="5" width="14" height="16" rx="1.5" stroke={a ? P.orange : P.silver} strokeWidth="1" style={{ transition: 'stroke .4s' }} />
      <circle cx="11" cy="10" r="2" stroke={a ? P.orange : P.silver} strokeWidth="1" style={{ transition: 'stroke .4s' }} />
      <circle cx="17" cy="10" r="2" stroke={a ? P.orange : P.silver} strokeWidth="1" style={{ transition: 'stroke .4s' }} />
      <path d="M10 18h8" stroke={a ? P.orange : P.silver} strokeWidth="1" strokeLinecap="round" style={{ transition: 'stroke .4s' }} />
      <rect x="6" y="4" width="3" height="4" rx=".5" stroke={a ? P.orange : P.silver} strokeWidth=".8" style={{ transition: 'stroke .4s' }} />
      <rect x="19" y="4" width="3" height="4" rx=".5" stroke={a ? P.orange : P.silver} strokeWidth=".8" style={{ transition: 'stroke .4s' }} />
    </svg>
  ),
}

/* ════════════════════════════════
   SERVICES DATA
════════════════════════════════ */
const SERVICES = [
  { id: 1, number: '01', icon: ICONS.web, shape: 'cube' as const, title: 'Sites & Landing Pages', subtitle: 'Presença Digital', description: 'Sites institucionais, landing pages de conversão e one-pages premium que transformam visitantes em clientes.', tags: ['React', 'Next.js', 'SEO', 'Responsivo'] },
  { id: 2, number: '02', icon: ICONS.shop, shape: 'gem' as const, title: 'E-commerce', subtitle: 'Vendas Inteligentes', description: 'Lojas virtuais com IA, gestão de estoque, checkout otimizado e integrações com gateways de pagamento.', tags: ['Shopify', 'Stripe', 'IA', 'Analytics'] },
  { id: 3, number: '03', icon: ICONS.app, shape: 'prism' as const, title: 'Aplicativos', subtitle: 'Mobile & Web', description: 'Apps nativos e PWA, do MVP à escala com milhares de usuários. iOS, Android e multiplataforma.', tags: ['Flutter', 'React Native', 'PWA', 'iOS'] },
  { id: 4, number: '04', icon: ICONS.cloud, shape: 'ring' as const, title: 'SaaS / BaaS / CaaS', subtitle: 'Plataformas Escaláveis', description: 'Plataformas multi-tenant com recorrência e APIs robustas para crescimento exponencial.', tags: ['Multi-tenant', 'API', 'Cloud', 'Scale'] },
  { id: 5, number: '05', icon: ICONS.erp, shape: 'sphere' as const, title: 'ERP / CRM', subtitle: 'Gestão Integrada', description: 'Sistemas de gestão, pipelines de venda e automação de processos para máxima eficiência.', tags: ['Automação', 'Pipeline', 'BI', 'Workflows'] },
  { id: 6, number: '06', icon: ICONS.api, shape: 'ring' as const, title: 'Integrações & API', subtitle: 'Conexão Total', description: 'Webhooks, ETL, middleware e orquestração de dados em tempo real.', tags: ['REST', 'GraphQL', 'Webhooks', 'ETL'] },
  { id: 7, number: '07', icon: ICONS.ai, shape: 'gem' as const, title: 'Inteligência Artificial', subtitle: 'IA Aplicada', description: 'Chatbots, análise preditiva e soluções customizadas com modelos de IA de ponta.', tags: ['LLM', 'NLP', 'Visão', 'Automação'] },
]

/* ════════════════════════════════
   MAIN
════════════════════════════════ */
export function ServicosSection() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [entered, setEntered] = useState(false)
  const [detailKey, setDetailKey] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setTimeout(() => setEntered(true), 250)
  }, [])

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (!containerRef.current) return
    const r = containerRef.current.getBoundingClientRect()
    setMousePos({ x: ((e.clientX - r.left) / r.width - 0.5) * 2, y: ((e.clientY - r.top) / r.height - 0.5) * 2 })
  }, [])

  const handleHover = (i: number) => {
    if (i !== activeIdx) setDetailKey((k) => k + 1)
    setActiveIdx(i)
  }

  const svc = activeIdx !== null ? SERVICES[activeIdx] : null
  const Shape3D = svc ? SHAPES[svc.shape] : null

  return (
    <section
      ref={containerRef}
      onMouseMove={onMouseMove}
      style={{ fontFamily: "'DM Sans',sans-serif", background: P.surface, minHeight: '100vh', position: 'relative', overflow: 'hidden' }}
    >
      <style>{`
        @keyframes revealUp   { from{opacity:0;transform:translateY(36px)} to{opacity:1;transform:translateY(0)} }
        @keyframes detailIn   { from{opacity:0;transform:translateY(12px) scale(.98)} to{opacity:1;transform:translateY(0) scale(1)} }
        @keyframes tagIn      { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:translateY(0)} }
        @keyframes lineGrow   { from{width:0} to{width:32px} }
        @keyframes scaleX     { from{transform:scaleX(0)} to{transform:scaleX(1)} }
        @keyframes marquee    { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        @keyframes shimmer    { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
        @keyframes spinBorder { to{filter:hue-rotate(360deg)} }
        @keyframes ripple     { from{transform:translate(-50%,-50%) scale(0);opacity:1} to{transform:translate(-50%,-50%) scale(1);opacity:0} }
        @keyframes pulseDot   { 0%,100%{transform:scale(1);opacity:1} 50%{transform:scale(1.4);opacity:.7} }
        @keyframes pulseGlow  { 0%,100%{opacity:.08} 50%{opacity:.18} }
        @keyframes floatA     { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-10px,-14px)} }
        @keyframes slowSpin   { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }

        @keyframes rotateCube   { to{transform:rotateX(10deg) rotateY(360deg)} }
        @keyframes rotateGem    { to{transform:rotateX(20deg) rotateY(360deg) rotateZ(10deg)} }
        @keyframes rotatePrism  { to{transform:rotateY(360deg) rotateX(5deg)} }
        @keyframes rotateRing   { to{transform:rotateX(60deg) rotateZ(360deg)} }
        @keyframes rotateSphere { to{transform:rotateY(360deg)} }

        .serv-row {
          position:relative; display:flex; align-items:center; gap:20px;
          padding:20px 0; cursor:pointer;
          border-bottom:1px solid rgba(192,192,192,.22);
          transition:all .45s cubic-bezier(.23,1,.32,1);
        }
        .serv-row::before {
          content:''; position:absolute; left:0;top:0;bottom:0;width:100%;
          background:linear-gradient(90deg,rgba(255,69,0,.04),transparent 50%);
          opacity:0; transition:opacity .4s ease;
        }
        .serv-row:hover::before{opacity:1;}
        .serv-row:hover{padding-left:14px;border-bottom-color:rgba(255,69,0,.2);}
        .serv-row:hover .serv-row-bar{transform:scaleY(1);}
        .serv-row:hover .serv-row-num{color:#FF4500;}
        .serv-row:hover .serv-row-icon{opacity:1;transform:scale(1.1) rotate(-5deg);}
        .serv-row:hover .serv-row-sub{opacity:1;transform:translateX(0);}
        .serv-row:hover .serv-row-arrow{opacity:1;transform:translateX(0);}

        .serv-row-bar{position:absolute;left:0;top:20%;bottom:20%;width:2px;background:#FF4500;transform:scaleY(0);transform-origin:center;transition:transform .4s cubic-bezier(.23,1,.32,1);border-radius:1px;}
        .serv-row-num{font-family:'Space Mono',monospace;font-size:10px;letter-spacing:.1em;color:rgba(192,192,192,.5);min-width:26px;transition:color .4s;}
        .serv-row-icon{opacity:.4;flex-shrink:0;transition:all .45s cubic-bezier(.23,1,.32,1);}
        .serv-row-title{font-family:'Instrument Serif',serif;font-size:clamp(18px,2.4vw,26px);color:#1C1A16;line-height:1.15;font-weight:400;transition:all .4s ease;}
        .serv-row-sub{font-family:'Space Mono',monospace;font-size:9px;color:#FF4500;text-transform:uppercase;letter-spacing:.14em;opacity:0;transform:translateX(-6px);transition:all .45s cubic-bezier(.23,1,.32,1);margin-top:3px;}
        .serv-row-arrow{font-size:16px;color:#FF4500;opacity:0;transform:translateX(-10px);transition:all .45s cubic-bezier(.23,1,.32,1);flex-shrink:0;}

        .serv-detail-in{animation:detailIn .4s cubic-bezier(.23,1,.32,1) both;}
        .serv-tag-in{animation:tagIn .3s ease both;opacity:0;}

        .serv-panel{
          background:linear-gradient(145deg,rgba(249,249,244,.95),rgba(232,226,221,.75));
          border:1px solid rgba(192,192,192,.3);
          backdrop-filter:blur(20px);
          box-shadow:0 1px 0 rgba(255,255,255,.7) inset,0 20px 60px rgba(0,0,0,.04);
          transition:all .5s cubic-bezier(.23,1,.32,1);
        }
        .serv-panel.active{
          border-color:rgba(192,192,192,.5);
          box-shadow:0 1px 0 rgba(255,255,255,.9) inset,0 24px 70px rgba(0,0,0,.06);
        }
      `}</style>

      <svg style={{ position: 'absolute', top: '6%', right: '8%', width: 88, height: 88, animation: 'floatA 14s ease-in-out infinite', opacity: 0.04, zIndex: 0, pointerEvents: 'none' }} viewBox="0 0 88 88" fill="none">
        <circle cx="44" cy="44" r="35" stroke="#c0c0c0" strokeWidth=".5" />
        <circle cx="44" cy="44" r="20" stroke="#c0c0c0" strokeWidth=".5" />
        <circle cx="44" cy="44" r="7" stroke="#c0c0c0" strokeWidth=".5" />
      </svg>

      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%,-50%)',
          fontFamily: "'Instrument Serif',serif",
          fontSize: 'clamp(160px,26vw,380px)',
          fontWeight: 400,
          color: P.heavy,
          opacity: svc?.number?.length ? 0.025 : 0.012,
          lineHeight: 1,
          pointerEvents: 'none',
          zIndex: 0,
          transition: 'all 1.2s cubic-bezier(.23,1,.32,1)',
          fontStyle: 'italic',
          whiteSpace: 'nowrap',
        }}
      >
        {svc ? svc.number : 'NW'}
      </div>

      <div style={{ textAlign: 'center', padding: '68px 24px 16px', position: 'relative', zIndex: 2 }}>
        <div style={{ opacity: entered ? 1 : 0, transform: entered ? 'translateY(0)' : 'translateY(16px)', transition: 'all .8s cubic-bezier(.23,1,.32,1) .1s' }}>
          <span style={{ fontFamily: "'Space Mono',monospace", fontSize: 10, letterSpacing: '.35em', textTransform: 'uppercase', color: P.neutral }}>Serviços</span>
        </div>

        <h2
          style={{
            fontFamily: "'Instrument Serif',serif",
            fontSize: 'clamp(30px,5vw,60px)',
            fontWeight: 400,
            color: P.heavy,
            margin: '14px auto 0',
            lineHeight: 1.05,
            maxWidth: 680,
            opacity: entered ? 1 : 0,
            transform: entered ? 'translateY(0)' : 'translateY(32px)',
            transition: 'all 1s cubic-bezier(.23,1,.32,1) .25s',
          }}
        >
          Do Excel ao Dashboard{' '}
          <em style={{ fontStyle: 'italic', color: P.orange }}>
            em Dias
          </em>
        </h2>

        <p
          style={{
            fontFamily: "'DM Sans',sans-serif",
            fontSize: 14,
            color: P.neutral,
            marginTop: 12,
            opacity: entered ? 1 : 0,
            transform: entered ? 'translateY(0)' : 'translateY(10px)',
            transition: 'all .8s ease .45s',
          }}
        >
          7 categorias cobrindo toda a jornada digital do seu negócio.
        </p>

        <div style={{ maxWidth: 200, margin: '20px auto 0', opacity: entered ? 1 : 0, transition: 'opacity 1s ease .65s' }}>
          <div style={{ height: 1, background: 'linear-gradient(90deg,transparent,rgba(192,192,192,.5),rgba(255,69,0,.15),rgba(192,192,192,.5),transparent)', backgroundSize: '200% 100%', animation: 'shimmer 4s linear infinite' }} />
        </div>
      </div>

      <div style={{ overflow: 'hidden', padding: '18px 0 28px', opacity: entered ? 1 : 0, transition: 'opacity 1s ease .75s', position: 'relative', zIndex: 2 }}>
        <div style={{ display: 'flex', animation: 'marquee 42s linear infinite', width: 'max-content' }}>
          {[...Array(2)].map((_, si) =>
            ['React', 'TypeScript', 'Python', 'Node.js', 'Flutter', 'Next.js', 'Supabase', 'AWS', 'Docker', 'GraphQL', 'Bubble', 'N8N', 'Claude AI'].map((t, i) => (
              <span key={`${si}-${i}`} style={{ fontFamily: "'Space Mono',monospace", fontSize: 10, color: P.heavy, padding: '0 20px', opacity: 0.12, whiteSpace: 'nowrap', letterSpacing: '.1em', textTransform: 'uppercase' }}>
                {t}
                <span style={{ margin: '0 14px', color: P.silver, opacity: 0.4 }}>·</span>
              </span>
            ))
          )}
        </div>
      </div>

      <div style={{ display: 'flex', maxWidth: 1180, margin: '0 auto', padding: '0 36px 48px', gap: 56, position: 'relative', zIndex: 2, minHeight: 520, flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 50%', minWidth: 300 }}>
          {SERVICES.map((s, i) => (
            <div key={s.id} style={{ opacity: entered ? 1 : 0, animation: entered ? `revealUp .6s cubic-bezier(.23,1,.32,1) ${0.85 + i * 0.09}s both` : 'none' }}>
              <div className="serv-row" onMouseEnter={() => handleHover(i)}>
                <div className="serv-row-bar" />
                <span className="serv-row-num">{s.number}</span>
                <div className="serv-row-icon">{s.icon(activeIdx === i)}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="serv-row-title">{s.title}</div>
                  <div className="serv-row-sub">{s.subtitle}</div>
                </div>
                <span className="serv-row-arrow">↗</span>
              </div>
            </div>
          ))}
        </div>

        <div style={{ flex: '1 1 38%', minWidth: 270, position: 'sticky', top: 40, alignSelf: 'flex-start', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 460, perspective: '900px' }}>
          <div
            style={{
              width: '100%',
              maxWidth: 390,
              transform: `rotateY(${mousePos.x * 2.5}deg) rotateX(${-mousePos.y * 1.5}deg)`,
              transition: 'transform .25s ease-out',
              transformStyle: 'preserve-3d',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: 180,
                height: 180,
                transform: 'translate(-50%,-50%)',
                background: svc ? `radial-gradient(circle,rgba(255,69,0,.07) 0%,transparent 70%)` : `radial-gradient(circle,rgba(192,192,192,.04) 0%,transparent 70%)`,
                transition: 'all .8s ease',
                borderRadius: '50%',
                filter: 'blur(35px)',
                animation: 'pulseGlow 5s ease-in-out infinite',
              }}
            />

            <div className={`serv-panel${svc ? ' active' : ''}`} style={{ position: 'relative', zIndex: 1, padding: svc ? 34 : 44, overflow: 'hidden', borderRadius: '20px' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, width: 20, height: 20, borderTop: `1.5px solid ${svc ? P.orange : 'transparent'}`, borderLeft: `1.5px solid ${svc ? P.orange : 'transparent'}`, transition: 'border-color .5s ease' }} />
              <div style={{ position: 'absolute', top: 0, right: 0, width: 20, height: 20, borderTop: `1px solid ${svc ? 'rgba(192,192,192,.4)' : 'transparent'}`, borderRight: `1px solid ${svc ? 'rgba(192,192,192,.4)' : 'transparent'}`, transition: 'border-color .5s ease' }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, width: 20, height: 20, borderBottom: `1px solid ${svc ? 'rgba(192,192,192,.4)' : 'transparent'}`, borderLeft: `1px solid ${svc ? 'rgba(192,192,192,.4)' : 'transparent'}`, transition: 'border-color .5s ease' }} />
              <div style={{ position: 'absolute', bottom: 0, right: 0, width: 20, height: 20, borderBottom: `1.5px solid ${svc ? P.orange : 'transparent'}`, borderRight: `1.5px solid ${svc ? P.orange : 'transparent'}`, transition: 'border-color .5s ease' }} />

              {svc && Shape3D ? (
                <div className="serv-detail-in" key={detailKey}>
                  <div style={{ marginBottom: 20, display: 'flex', alignItems: 'center', gap: 16 }}>
                    <Shape3D size={64} hov />
                    <div>
                      <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 10, color: P.silver, letterSpacing: '.16em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ color: P.orange }}>{svc.number}</span>
                        <span style={{ display: 'inline-block', height: 1, background: P.silver, opacity: 0.3, animation: 'lineGrow .5s ease .15s both' }} />
                        <span style={{ opacity: 0.5 }}>{svc.subtitle}</span>
                      </div>
                      <h3 style={{ fontFamily: "'Instrument Serif',serif", fontSize: 22, fontWeight: 400, color: P.heavy, margin: '6px 0 0', lineHeight: 1.1 }}>{svc.title}</h3>
                    </div>
                  </div>

                  <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13.5, color: P.neutral, lineHeight: 1.7, margin: '0 0 20px' }}>{svc.description}</p>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
                    {svc.tags.map((tag, i) => (
                      <span key={tag} className="serv-tag-in" style={{ fontFamily: "'Space Mono',monospace", fontSize: 9, color: P.heavy, padding: '4px 11px', border: '1px solid rgba(192,192,192,.4)', letterSpacing: '.08em', textTransform: 'uppercase', background: 'rgba(255,255,255,.4)', animationDelay: `${0.08 + i * 0.06}s` }}>{tag}</span>
                    ))}
                  </div>

                  <div style={{ marginTop: 22, height: 2, background: `linear-gradient(90deg,${P.orange},${P.orangeAlt},rgba(192,192,192,.3))`, animation: 'scaleX .6s cubic-bezier(.23,1,.32,1) .12s both', transformOrigin: 'left', opacity: 0.6 }} />
                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: '36px 14px' }}>
                  <svg viewBox="0 0 52 52" fill="none" style={{ width: 52, height: 52, display: 'block', margin: '0 auto 16px', animation: 'slowSpin 24s linear infinite' }}>
                    <circle cx="26" cy="26" r="22" stroke={P.silver} strokeWidth=".5" strokeDasharray="3 5" opacity=".2" />
                  </svg>
                  <div style={{ fontFamily: "'Instrument Serif',serif", fontSize: 18, fontStyle: 'italic', color: P.heavy, opacity: 0.2 }}>Explore nossos serviços</div>
                  <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 9, color: P.silver, marginTop: 8, letterSpacing: '.2em', textTransform: 'uppercase', opacity: 0.35 }}>Passe o mouse para descobrir</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div style={{ textAlign: 'center', paddingBottom: 64, opacity: entered ? 1 : 0, transition: 'opacity 1.2s ease 1.8s', position: 'relative', zIndex: 2 }}>
        <LiquidMetalButton label="Agendar Diagnóstico" to="/contato" size="large" />
      </div>
    </section>
  )
}
