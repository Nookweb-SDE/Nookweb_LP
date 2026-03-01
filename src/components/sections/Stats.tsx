import { useState, useEffect, useRef } from 'react'
import { MeshGradientBackground } from '@/components/ui/MeshGradientBackground'
import { Container } from '@/components/ui/Container'

const P = {
  orange: '#FF4500',
  orangeAlt: '#FF6D00',
  silver: '#c0c0c0',
  silverB: 'rgba(192,192,192,0.5)',
  metalDark: '#1a1a1c',
  metalHL: 'rgba(255,255,255,0.12)',
  black: '#000000',
  blackSoft: '#0a0a0a',
  warmWhite: '#F9F9F4',
  cream: '#F5F0E8',
  neutral: '#767069',
  white: '#FFFFFF',
}

/* ══════════════════════════════
   3D SHAPES
══════════════════════════════ */

function RocketShape({ hov }: { hov?: boolean }) {
  const size = 72
  const h = size / 2
  return (
    <div style={{ width: size, height: size, perspective: size * 4 }}>
      <div
        style={{
          width: size,
          height: size,
          position: 'relative',
          transformStyle: 'preserve-3d',
          animation: `rocketSpin ${hov ? '1.2s' : '8s'} linear infinite`,
          filter: `drop-shadow(0 0 20px ${P.orange}77)`,
          transition: 'animation-duration .3s',
        }}
      >
        {[0, 60, 120, 180, 240, 300].map((angle, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: size * 0.35,
              height: size,
              background: `linear-gradient(180deg,${i % 2 === 0 ? P.orange : P.orangeAlt} 0%,${P.silver}44 50%,${P.metalDark} 100%)`,
              transform: `rotateY(${angle}deg) translateZ(${h * 0.35}px)`,
              backfaceVisibility: 'hidden',
              border: `1px solid ${P.silverB}`,
            }}
          />
        ))}
        <div
          style={{
            position: 'absolute',
            width: size * 0.7,
            height: size * 0.7,
            top: size * 0.15,
            left: size * 0.15,
            background: `radial-gradient(circle at 35% 30%, #e8e8e8, ${P.orange} 50%, ${P.metalDark})`,
            borderRadius: '50%',
            transform: `translateZ(${h * 0.35}px)`,
            boxShadow: `0 0 20px ${P.orange}55`,
          }}
        />
      </div>
    </div>
  )
}

function LightningShape({ hov }: { hov?: boolean }) {
  return (
    <div style={{ width: 72, height: 72, perspective: 288, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div
        style={{
          position: 'relative',
          transformStyle: 'preserve-3d',
          animation: `lightningSpin ${hov ? '1s' : '7s'} linear infinite`,
          filter: `drop-shadow(0 0 24px ${P.orange}88)`,
          transition: 'animation-duration .3s',
        }}
      >
        {[0, -8, 8].map((z, i) => (
          <svg
            key={i}
            width="48"
            height="64"
            viewBox="0 0 48 64"
            fill="none"
            style={{
              position: i === 0 ? 'relative' : 'absolute',
              top: 0,
              left: 0,
              transform: `translateZ(${z}px)`,
              opacity: i === 0 ? 1 : 0.5,
            }}
          >
            <path
              d="M28 2L8 36h14L18 62l22-34H26L28 2z"
              fill={`url(#lg${i})`}
              stroke={i === 0 ? P.orange : P.silver}
              strokeWidth={i === 0 ? '1.5' : '0.5'}
            />
            <defs>
              <linearGradient id={`lg${i}`} x1="0" y1="0" x2="48" y2="64" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#e8e8e8" />
                <stop offset="50%" stopColor={P.orange} />
                <stop offset="100%" stopColor={P.metalDark} />
              </linearGradient>
            </defs>
          </svg>
        ))}
      </div>
    </div>
  )
}

function StarShape({ hov }: { hov?: boolean }) {
  return (
    <div style={{ width: 72, height: 72, perspective: 288, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div
        style={{
          position: 'relative',
          transformStyle: 'preserve-3d',
          animation: `starSpin ${hov ? '1.1s' : '9s'} linear infinite`,
          filter: `drop-shadow(0 0 22px ${P.orange}77)`,
          transition: 'animation-duration .3s',
        }}
      >
        {[-6, 0, 6].map((z, i) => (
          <svg
            key={i}
            width="64"
            height="64"
            viewBox="0 0 64 64"
            fill="none"
            style={{
              position: i === 1 ? 'relative' : 'absolute',
              top: 0,
              left: 0,
              transform: `translateZ(${z}px)`,
              opacity: i === 1 ? 1 : 0.45,
            }}
          >
            <path
              d="M32 4l5.9 18.1H58L42.1 33.6l5.9 18.1L32 40.2 16 51.7l5.9-18.1L6 22.1h20.1z"
              fill={`url(#starlg${i})`}
              stroke={i === 1 ? P.orange : P.silver}
              strokeWidth={i === 1 ? '1' : '0.5'}
            />
            <defs>
              <linearGradient id={`starlg${i}`} x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#e8e8e8" />
                <stop offset="45%" stopColor={P.orange} />
                <stop offset="100%" stopColor={P.metalDark} />
              </linearGradient>
            </defs>
          </svg>
        ))}
      </div>
    </div>
  )
}

/* ══════════════════════════════
   LIQUID METAL BADGE
══════════════════════════════ */
function MetalBadge({ value }: { value: string }) {
  const [hov, setHov] = useState(false)
  const [pos, setPos] = useState({ x: 50, y: 50 })
  const ref = useRef<HTMLDivElement>(null)

  const onMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const r = ref.current.getBoundingClientRect()
    setPos({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 })
  }

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => {
        setHov(false)
        setPos({ x: 50, y: 50 })
      }}
      onMouseMove={onMove}
      style={{
        position: 'relative',
        overflow: 'hidden',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '10px 28px',
        borderRadius: '100px',
        cursor: 'default',
        background: `radial-gradient(ellipse at ${pos.x}% ${pos.y}%, rgba(255,255,255,${hov ? 0.12 : 0.06}) 0%, transparent 60%), linear-gradient(180deg, #222224 0%, #0f0f11 50%, #1a1a1c 100%)`,
        border: `1px solid rgba(192,192,192,${hov ? 0.6 : 0.3})`,
        boxShadow: hov
          ? `0 0 20px rgba(255,69,0,.12), inset 0 1px 0 rgba(255,255,255,.15), 0 6px 24px rgba(0,0,0,.4)`
          : `inset 0 1px 0 rgba(255,255,255,.08), 0 4px 16px rgba(0,0,0,.3)`,
        transform: hov ? 'translateY(-2px) scale(1.04)' : 'scale(1)',
        transition: 'all .4s cubic-bezier(.23,1,.32,1)',
        minWidth: '80px',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '10%',
          right: '10%',
          height: '40%',
          background: 'linear-gradient(180deg,rgba(255,255,255,.08) 0%,transparent 100%)',
          borderRadius: '100px 100px 50% 50%',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(circle at ${pos.x}% ${pos.y}%, rgba(255,69,0,${hov ? 0.1 : 0}) 0%, transparent 55%)`,
          transition: hov ? 'none' : 'background .5s',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '100px',
          background: `conic-gradient(from ${hov ? pos.x * 3.6 : 180}deg at 50% 50%, transparent 0deg, rgba(192,192,192,.07) 60deg, transparent 120deg, rgba(255,255,255,.04) 200deg, transparent 280deg, rgba(192,192,192,.05) 340deg, transparent 360deg)`,
          pointerEvents: 'none',
        }}
      />
      <span
        style={{
          fontFamily: "'Space Mono',monospace",
          fontSize: '13px',
          fontWeight: 700,
          color: hov ? P.cream : P.silver,
          letterSpacing: '.06em',
          position: 'relative',
          zIndex: 1,
          textShadow: hov ? '0 0 12px rgba(255,69,0,.3)' : 'none',
          transition: 'all .4s ease',
        }}
      >
        {value}
      </span>
    </div>
  )
}

/* ══════════════════════════════
   CARD
══════════════════════════════ */
const CARDS = [
  {
    id: 1,
    shape: 'rocket' as const,
    title: 'Projetos',
    orange: 'Entregues com qualidade',
    desc: 'Entregas realizadas com qualidade e prazo pela Nookweb.',
    badge: '1049+',
  },
  {
    id: 2,
    shape: 'lightning' as const,
    title: 'Mais Rápido',
    orange: 'Até 10x mais veloz',
    desc: 'Apps inteligentes até 10x mais rápidos que o desenvolvimento tradicional.',
    badge: '10X',
  },
  {
    id: 3,
    shape: 'star' as const,
    title: 'Especialistas',
    orange: 'Time sênior multidisciplinar',
    desc: 'Time multidisciplinar de seniores. Do desenho à entrega, com a expertise certa.',
    badge: '28+',
  },
]

const SHAPES: Record<string, React.ComponentType<{ hov?: boolean }>> = {
  rocket: RocketShape,
  lightning: LightningShape,
  star: StarShape,
}

function Card({ card }: { card: (typeof CARDS)[0] }) {
  const [hov, setHov] = useState(false)
  const Shape = SHAPES[card.shape]

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        position: 'relative',
        overflow: 'hidden',
        flex: '1 1 280px',
        maxWidth: '360px',
        background: hov ? `linear-gradient(145deg,#222224,${P.metalDark})` : P.metalDark,
        border: `1px solid ${hov ? P.orange + '55' : P.silverB}`,
        borderRadius: '20px',
        padding: '32px 28px 28px',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0',
        transform: hov ? 'translateY(-8px)' : 'translateY(0)',
        boxShadow: hov
          ? `0 32px 72px ${P.black}aa, 0 0 0 1px ${P.orange}22, inset 0 1px 0 ${P.metalHL}`
          : `0 4px 24px ${P.black}55, inset 0 1px 0 ${P.metalHL}`,
        transition: 'all .45s cubic-bezier(.34,1.2,.64,1)',
        animation: 'statsCardIn .6s ease both',
        animationDelay: `${card.id * 100}ms`,
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '20px',
          pointerEvents: 'none',
          background: `linear-gradient(135deg,${P.metalHL} 0%,transparent 50%,rgba(192,192,192,.1) 100%)`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '160px',
          height: '160px',
          pointerEvents: 'none',
          background: `radial-gradient(circle,${P.orange}${hov ? '16' : '08'} 0%,transparent 70%)`,
          transition: 'all .4s ease',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: '20%',
          width: hov ? '60%' : '0%',
          height: '1px',
          background: `linear-gradient(90deg,transparent,${P.orange},transparent)`,
          transition: 'width .5s ease',
        }}
      />
      <div style={{ marginBottom: '20px', position: 'relative', zIndex: 1 }}>
        <Shape hov={hov} />
      </div>
      <div
        style={{
          width: hov ? '48px' : '24px',
          height: '1px',
          background: `linear-gradient(90deg,${P.orange},${P.orangeAlt})`,
          marginBottom: '14px',
          transition: 'width .4s ease',
          borderRadius: 1,
          position: 'relative',
          zIndex: 1,
        }}
      />
      <h3
        style={{
          fontFamily: "'Instrument Serif',serif",
          fontSize: 'clamp(22px,2.2vw,28px)',
          fontWeight: 400,
          color: hov ? P.cream : P.warmWhite,
          margin: '0 0 10px',
          textAlign: 'center',
          lineHeight: 1.1,
          transition: 'color .3s ease',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {card.title}
      </h3>
      <p
        style={{
          fontFamily: "'Space Mono',monospace",
          fontSize: 10,
          fontWeight: 400,
          color: P.orange,
          letterSpacing: '.14em',
          textTransform: 'uppercase',
          margin: '0 0 14px',
          opacity: hov ? 1 : 0.65,
          transition: 'opacity .3s',
          position: 'relative',
          zIndex: 1,
          textAlign: 'center',
        }}
      >
        {card.orange}
      </p>
      <div
        style={{
          width: '100%',
          height: 1,
          background: 'linear-gradient(90deg,transparent,rgba(192,192,192,.18),transparent)',
          margin: '0 0 14px',
          position: 'relative',
          zIndex: 1,
        }}
      />
      <p
        style={{
          fontFamily: "'DM Sans',sans-serif",
          fontSize: 13,
          color: P.neutral,
          lineHeight: 1.7,
          margin: '0 0 28px',
          textAlign: 'center',
          position: 'relative',
          zIndex: 1,
          flex: 1,
        }}
      >
        {card.desc}
      </p>
      <div style={{ position: 'relative', zIndex: 1 }}>
        <MetalBadge value={card.badge} />
      </div>
    </div>
  )
}

export function Stats() {
  useEffect(() => {
    const s = document.createElement('style')
    s.innerHTML = `
      @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:wght@300;400;500;600;700&family=Space+Mono:wght@400;700&display=swap');
      @keyframes rocketSpin { to{transform:rotateY(360deg) rotateX(8deg);} }
      @keyframes lightningSpin { 0%{transform:rotateY(0deg) rotateX(5deg);} 100%{transform:rotateY(360deg) rotateX(5deg);} }
      @keyframes starSpin { 0%{transform:rotateY(0deg) rotateZ(0deg);} 100%{transform:rotateY(360deg) rotateZ(15deg);} }
      @keyframes statsCardIn { from{opacity:0;transform:translateY(32px) scale(.97)} to{opacity:1;transform:translateY(0) scale(1)} }
      @keyframes statsShimmer { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
    `
    document.head.appendChild(s)
    return () => {
      document.head.removeChild(s)
    }
  }, [])

  return (
    <section
      data-dark-section
      id="stats"
      className="relative min-h-[420px] flex flex-col justify-center scroll-mt-20 overflow-hidden bg-hero-dark"
      style={{ paddingTop: 112, paddingBottom: 96 }}
    >
      <MeshGradientBackground speed={1.0} />
      <Container className="relative z-10">
        <div style={{ textAlign: 'center', marginBottom: 72 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 20 }}>
            <div style={{ width: 32, height: 1, background: `linear-gradient(90deg,transparent,${P.orange})` }} />
            <span style={{ fontFamily: "'Space Mono',monospace", fontSize: 10, color: P.orange, letterSpacing: '4px', textTransform: 'uppercase' }}>
              Por que a Nookweb
            </span>
            <div style={{ width: 32, height: 1, background: `linear-gradient(90deg,${P.orange},transparent)` }} />
          </div>
          <h2
            style={{
              fontFamily: "'Instrument Serif',serif",
              fontSize: 'clamp(36px,4.5vw,58px)',
              fontWeight: 400,
              color: P.warmWhite,
              lineHeight: 1.05,
              letterSpacing: '-1px',
              margin: '0 auto',
              maxWidth: 600,
            }}
          >
            Entregamos{' '}
            <span
              style={{
                fontStyle: 'italic',
                background: `linear-gradient(90deg,${P.orange},${P.orangeAlt},#e8e8e8,${P.orange})`,
                backgroundSize: '200% auto',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                animation: 'statsShimmer 3.5s linear infinite',
              }}
            >
              resultados reais.
            </span>
          </h2>
        </div>
        <div
          style={{
            display: 'flex',
            gap: 20,
            justifyContent: 'center',
            flexWrap: 'wrap',
            alignItems: 'stretch',
          }}
        >
          {CARDS.map((card) => (
            <Card key={card.id} card={card} />
          ))}
        </div>
      </Container>
    </section>
  )
}
