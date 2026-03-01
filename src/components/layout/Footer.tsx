import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, ArrowRight, Sparkles } from 'lucide-react'
import { LiquidMetalButton } from '@/components/ui/LiquidMetalButton'
import { marqueeTools } from '@/data/marquee'

/* ═══════════════════════════════════════════════
   FOOTER PREMIUM — "Closing act"
   Conceito: Statement final memorável.
   Paleta: CasesSection/Hero (preto, laranja, cream)
   Tipografia: Instrument Serif, DM Sans, Space Mono
═══════════════════════════════════════════════ */

const P = {
  bg: '#000000',
  bgSoft: '#0a0a0a',
  surface: '#141414',
  orange: '#FF4500',
  orangeAlt: '#FF6D00',
  cream: '#F5F0E8',
  warm: '#F9F9F4',
  neutral: 'rgba(255,255,255,0.45)',
  silver: 'rgba(192,192,192,0.4)',
  border: 'rgba(255,255,255,0.06)',
}

const navLinks = [
  { to: '/servicos', label: 'Serviços' },
  { to: '/cases', label: 'Cases' },
  { to: '/sobre', label: 'Sobre' },
  { to: '/blog', label: 'Blog' },
  { to: '/contato', label: 'Contato' },
]

const STATS = [
  { value: '90%', label: 'mais barato' },
  { value: '10×', label: 'mais rápido' },
  { value: '72h', label: 'protótipo' },
]

export function Footer() {
  return (
    <footer
      data-dark-section
      className="relative overflow-hidden"
      style={{
        background: P.bg,
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      {/* ── Top border: linha gradiente 1px (referência CasesSection) ── */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '1px',
          background: `linear-gradient(90deg, transparent, ${P.orange}33, ${P.orange}66, ${P.orange}33, transparent)`,
        }}
      />

      {/* ── Marquee de tech stack ── */}
      <div
        className="footer-marquee-wrapper"
        style={{
          padding: '32px 0',
          borderBottom: `1px solid ${P.border}`,
          overflow: 'hidden',
        }}
      >
        <div
          className="animate-marquee-hero flex gap-16"
          style={{
            width: 'max-content',
            willChange: 'transform',
          }}
        >
          {[...marqueeTools, ...marqueeTools].map((tool, i) => (
            <span
              key={`${tool}-${i}`}
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: '12px',
                letterSpacing: '0.25em',
                color: P.silver,
                textTransform: 'uppercase',
                whiteSpace: 'nowrap',
              }}
            >
              {tool}
            </span>
          ))}
        </div>
      </div>

      {/* ── CTA Block: "Pronto para construir?" ── */}
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '80px 24px 64px',
          textAlign: 'center',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            marginBottom: '20px',
          }}
        >
          <div
            style={{
              width: '2px',
              height: '24px',
              background: `linear-gradient(180deg, ${P.orange}, transparent)`,
            }}
          />
          <span
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: '10px',
              letterSpacing: '0.35em',
              color: P.orange,
              textTransform: 'uppercase',
            }}
          >
            Próximo passo
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
          style={{
            fontFamily: "'Instrument Serif', serif",
            fontSize: 'clamp(36px, 5vw, 64px)',
            fontWeight: 400,
            lineHeight: 1.08,
            letterSpacing: '-1.5px',
            color: P.warm,
            margin: '0 0 28px',
          }}
        >
          Pronto para{' '}
          <em className="footer-shimmer-text" style={{ fontStyle: 'italic' }}>
            construir o próximo
          </em>
          ?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{
            fontSize: '15px',
            color: P.neutral,
            margin: '0 0 36px',
            maxWidth: '420px',
            marginLeft: 'auto',
            marginRight: 'auto',
            lineHeight: 1.6,
          }}
        >
          Agende um diagnóstico gratuito. Sem compromisso.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.25 }}
        >
          <LiquidMetalButton
            label="Agendar Diagnóstico Gratuito"
            to="/contato"
            size="large"
          />
        </motion.div>

        {/* Stats pills */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.35 }}
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '48px',
            marginTop: '48px',
            flexWrap: 'wrap',
          }}
        >
          {STATS.map(({ value, label }) => (
            <div
              key={label}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              <span
                style={{
                  fontFamily: "'Instrument Serif', serif",
                  fontSize: '28px',
                  fontStyle: 'italic',
                  color: P.orange,
                  lineHeight: 1,
                  textShadow: `0 0 20px ${P.orange}44`,
                }}
              >
                {value}
              </span>
              <span
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: '8px',
                  letterSpacing: '0.2em',
                  color: 'rgba(255,255,255,0.25)',
                  textTransform: 'uppercase',
                }}
              >
                {label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* ── Grid: Logo | Nav | Contato ── */}
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 max-w-[1280px] mx-auto px-6 pb-12 pt-16"
        style={{ borderTop: `1px solid ${P.border}` }}
      >
        {/* Col 1: Logo + desc */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ maxWidth: '320px' }}
        >
          <Link
            to="/"
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontSize: '28px',
              fontWeight: 400,
              color: P.cream,
              textDecoration: 'none',
              display: 'inline-block',
              transition: 'color 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = P.orange
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = P.cream
            }}
          >
            Nookweb
          </Link>
          <p
            style={{
              marginTop: '16px',
              fontSize: '14px',
              lineHeight: 1.65,
              color: P.neutral,
            }}
          >
            Holding Digital do Grupo ImpulsoTech. Sistema Certo, Na Hora Certa.
          </p>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginTop: '20px',
            }}
          >
            <Sparkles
              size={14}
              style={{ color: P.orange, flexShrink: 0 }}
              strokeWidth={2}
            />
            <span
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: '10px',
                letterSpacing: '0.15em',
                color: P.silver,
                textTransform: 'uppercase',
              }}
            >
              Criamos Mundos Digitais
            </span>
          </div>
        </motion.div>

        {/* Col 2: Navegação */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <p
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: '9px',
              letterSpacing: '0.25em',
              color: P.silver,
              textTransform: 'uppercase',
              marginBottom: '20px',
            }}
          >
            Navegação
          </p>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {navLinks.map((link) => (
              <li key={link.to} style={{ marginBottom: '12px' }}>
                <Link
                  to={link.to}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '14px',
                    color: P.neutral,
                    textDecoration: 'none',
                    transition: 'color 0.25s ease, transform 0.25s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = P.orange
                    e.currentTarget.style.transform = 'translateX(4px)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = P.neutral
                    e.currentTarget.style.transform = 'translateX(0)'
                  }}
                >
                  <ArrowRight size={12} style={{ opacity: 0.6 }} />
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Col 3: Contato */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <p
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: '9px',
              letterSpacing: '0.25em',
              color: P.silver,
              textTransform: 'uppercase',
              marginBottom: '20px',
            }}
          >
            Contato
          </p>
          <a
            href="mailto:contato@nookweb.com.br"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              fontSize: '14px',
              color: P.neutral,
              textDecoration: 'none',
              transition: 'color 0.25s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = P.orange
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = P.neutral
            }}
          >
            <Mail size={16} />
            contato@nookweb.com.br
          </a>
        </motion.div>
      </div>

      {/* ── Bottom bar: copyright, termos ── */}
      <div
        style={{
          borderTop: `1px solid ${P.border}`,
          padding: '24px 24px 32px',
        }}
      >
        <div className="max-w-[1280px] mx-auto flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 text-center sm:text-left">
          <p
            style={{
              fontSize: '12px',
              color: 'rgba(255,255,255,0.3)',
            }}
          >
            © {new Date().getFullYear()} Nookweb. Todos os direitos reservados.
          </p>
          <div style={{ display: 'flex', gap: '24px' }}>
            <Link
              to="/politica-privacidade"
              style={{
                fontSize: '12px',
                color: 'rgba(255,255,255,0.35)',
                textDecoration: 'none',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = P.orange
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'rgba(255,255,255,0.35)'
              }}
            >
              Privacidade
            </Link>
            <Link
              to="/termos"
              style={{
                fontSize: '12px',
                color: 'rgba(255,255,255,0.35)',
                textDecoration: 'none',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = P.orange
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'rgba(255,255,255,0.35)'
              }}
            >
              Termos
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
