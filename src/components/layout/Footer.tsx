import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, ArrowRight, Sparkles } from 'lucide-react'
import { LiquidMetalButton } from '@/components/ui/LiquidMetalButton'
import { marqueeTools } from '@/data/marquee'
import { getCasesHref } from '@/config/casesModal'
import { useI18n } from '@/i18n/I18nProvider'

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

/* ── Loss Counter: animated "money lost" ticker ── */
const CURRENCY_BY_LANG: Record<string, { currency: string; locale: string }> = {
  pt: { currency: 'BRL', locale: 'pt-BR' },
  en: { currency: 'USD', locale: 'en-US' },
  es: { currency: 'USD', locale: 'es-MX' },
  fr: { currency: 'EUR', locale: 'fr-FR' },
  zh: { currency: 'CNY', locale: 'zh-CN' },
  hi: { currency: 'INR', locale: 'hi-IN' },
  ar: { currency: 'AED', locale: 'ar-AE' },
  ru: { currency: 'RUB', locale: 'ru-RU' },
}

function LossCounter({ label, lang }: { label: string; lang: string }) {
  const [value, setValue] = useState(0)
  const [hov, setHov] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setValue((v) => v + 487)
    }, 600)
    return () => clearInterval(interval)
  }, [])

  const { currency, locale } = CURRENCY_BY_LANG[lang] ?? CURRENCY_BY_LANG.pt
  const formatted = value.toLocaleString(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        position: 'relative',
        overflow: 'hidden',
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0',
        padding: '32px 40px 28px',
        borderRadius: '20px',
        width: '100%',
        maxWidth: '360px',
        background: hov ? `linear-gradient(145deg,#222224,#1a1a1c)` : '#1a1a1c',
        border: `1px solid ${hov ? P.orange + '55' : 'rgba(192,192,192,0.5)'}`,
        cursor: 'default',
        transform: hov ? 'translateY(-8px)' : 'translateY(0)',
        boxShadow: hov
          ? `0 32px 72px rgba(0,0,0,0.67), 0 0 0 1px ${P.orange}22, inset 0 1px 0 rgba(255,255,255,0.12)`
          : `0 4px 24px rgba(0,0,0,0.33), inset 0 1px 0 rgba(255,255,255,0.12)`,
        transition: 'all .45s cubic-bezier(.34,1.2,.64,1)',
      }}
    >
      {/* Gradient overlay — matches Stats card */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '20px',
          pointerEvents: 'none',
          background: 'linear-gradient(135deg,rgba(255,255,255,0.12) 0%,transparent 50%,rgba(192,192,192,0.1) 100%)',
        }}
      />
      {/* Orange radial glow top-right */}
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
      {/* Bottom orange line on hover */}
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
      {/* Counter value */}
      <span
        style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: 'clamp(28px, 4.5vw, 42px)',
          fontWeight: 700,
          color: P.orange,
          lineHeight: 1,
          animation: 'countTick 0.6s ease-in-out infinite',
          textShadow: `0 0 30px ${P.orange}44, 0 0 60px ${P.orange}22`,
          letterSpacing: '0.02em',
          position: 'relative',
          zIndex: 1,
          marginBottom: '12px',
        }}
      >
        {formatted}
      </span>
      {/* Divider */}
      <div
        style={{
          width: hov ? '48px' : '24px',
          height: '1px',
          background: `linear-gradient(90deg,${P.orange},${P.orangeAlt})`,
          marginBottom: '12px',
          transition: 'width .4s ease',
          borderRadius: 1,
          position: 'relative',
          zIndex: 1,
        }}
      />
      {/* Label */}
      <span
        style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: '9px',
          letterSpacing: '0.18em',
          color: hov ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.35)',
          textTransform: 'uppercase',
          textAlign: 'center',
          position: 'relative',
          zIndex: 1,
          transition: 'color .3s ease',
        }}
      >
        {label}
      </span>
    </div>
  )
}

export function Footer() {
  const { t, language } = useI18n()
  const navLinks = [
    { to: '/servicos', label: t('nav.links.services') },
    { to: getCasesHref(), label: t('nav.links.cases') },
    { to: '/sobre', label: t('nav.links.about') },
    { to: '/blog', label: t('nav.links.blog') },
    { to: '/contato', label: t('nav.links.contact') },
  ]
  const stats = [
    { value: '90%', label: t('footer.stats.cheaper') },
    { value: '10×', label: t('footer.stats.faster') },
    { value: '72h', label: t('footer.stats.prototype') },
  ]

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

      {/* ── CTA Block: "O Custo de Não Agir" — Loss Aversion ── */}
      <div
        className="footer-cta-block"
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '48px 16px 36px',
          textAlign: 'center',
        }}
      >
        <style>{`
          @keyframes countTick {
            0% { transform: scale(1); }
            50% { transform: scale(1.03); }
            100% { transform: scale(1); }
          }
        `}</style>

        {/* Section label */}
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
            {t('footer.nextStep')}
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
          style={{
            fontFamily: "'Instrument Serif', serif",
            fontSize: 'clamp(32px, 5vw, 58px)',
            fontWeight: 400,
            lineHeight: 1.1,
            letterSpacing: '-1.5px',
            color: P.warm,
            margin: '0 0 8px',
          }}
        >
          {t('footer.lossTitle')}
        </motion.h2>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.23, 1, 0.32, 1] }}
          style={{
            fontFamily: "'Instrument Serif', serif",
            fontSize: 'clamp(32px, 5vw, 58px)',
            fontWeight: 400,
            lineHeight: 1.1,
            letterSpacing: '-1.5px',
            color: P.orange,
            fontStyle: 'italic',
            margin: '0 0 28px',
            textShadow: `0 0 40px ${P.orange}33`,
          }}
        >
          {t('footer.lossEmphasis')}
        </motion.h2>

        {/* Loss counter */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{ marginBottom: '28px' }}
        >
          <LossCounter label={t('footer.lossCounter')} lang={language} />
        </motion.div>

        {/* Sub-headline */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.25 }}
          style={{
            fontSize: '15px',
            color: P.neutral,
            margin: '0 auto 36px',
            maxWidth: '460px',
            lineHeight: 1.65,
          }}
        >
          {t('footer.lossSub')}
        </motion.p>

        {/* CTA button — LiquidMetal → WhatsApp */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <LiquidMetalButton
            label={t('footer.whatsappButton')}
            href="https://wa.me/5511960630085"
            size="large"
          />
        </motion.div>

        {/* Stats pills */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex justify-center gap-6 sm:gap-10 md:gap-12 lg:gap-16 mt-8 sm:mt-10 md:mt-12 flex-wrap"
        >
          {stats.map(({ value, label }) => (
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
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12 max-w-[1280px] mx-auto px-4 sm:px-6 pb-8 sm:pb-12 pt-10 sm:pt-16"
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
              fontFamily: "'Space Mono', monospace",
              fontSize: '15px',
              fontWeight: 600,
              color: '#ffffff',
              textDecoration: 'none',
              display: 'inline-block',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              transition: 'color 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = P.orange
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#ffffff'
            }}
          >
            NOOKWEB®
          </Link>
          <p
            style={{
              marginTop: '16px',
              fontSize: '14px',
              lineHeight: 1.65,
              color: P.neutral,
            }}
          >
            {t('footer.companyLine')}
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
              {t('footer.tagline')}
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
            {t('footer.navigation')}
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
            {t('footer.contact')}
          </p>
          <a
            href="mailto:parceria@nookweb.com.br"
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
            parceria@nookweb.com.br
          </a>
        </motion.div>
      </div>

      {/* ── Bottom bar: copyright, termos ── */}
      <div
        style={{
          borderTop: `1px solid ${P.border}`,
          padding: '20px 16px 24px',
        }}
      >
        <div className="max-w-[1280px] mx-auto flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 text-center sm:text-left px-4 sm:px-6">
          <p
            style={{
              fontSize: '12px',
              color: 'rgba(255,255,255,0.3)',
            }}
          >
            © {new Date().getFullYear()} Nookweb. {t('footer.rights')}
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
              {t('footer.privacy')}
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
              {t('footer.terms')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
