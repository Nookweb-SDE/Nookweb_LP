import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { LiquidMetalButton } from '@/components/ui/LiquidMetalButton'

const links = [
  { to: '/servicos', label: 'Serviços' },
  { to: '/cases', label: 'Cases' },
  { to: '/sobre', label: 'Sobre' },
  { to: '/blog', label: 'Blog' },
  { to: '/contato', label: 'Contato' },
]

const SCROLL_THRESHOLD = 80
const HEADER_HEIGHT = 64

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [overDarkSection, setOverDarkSection] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [language, setLanguage] = useState('pt')
  const [langOpen, setLangOpen] = useState(false)
  const { pathname } = useLocation()
  const languageOptions = [
    { value: 'pt', label: 'Português' },
    { value: 'en', label: 'English' },
    { value: 'fr', label: 'Français' },
    { value: 'ja', label: '日本語' },
    { value: 'zh', label: '中文(简体)' },
  ]
  const activeLanguageLabel = languageOptions.find((opt) => opt.value === language)?.label ?? 'Português'
  const isHome = pathname === '/'
  const onHero = isHome && !scrolled
  const isSolid = scrolled
  const overDark = overDarkSection || onHero

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > SCROLL_THRESHOLD)
    handler()
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => {
    const checkOverDark = () => {
      const els = document.querySelectorAll('[data-dark-section]')
      const anyUnderHeader = Array.from(els).some((el) => {
        const rect = el.getBoundingClientRect()
        return rect.top < HEADER_HEIGHT && rect.bottom > 0
      })
      setOverDarkSection(anyUnderHeader)
    }
    checkOverDark()
    const t = setTimeout(checkOverDark, 100)
    window.addEventListener('scroll', checkOverDark, { passive: true })
    return () => {
      clearTimeout(t)
      window.removeEventListener('scroll', checkOverDark)
    }
  }, [pathname])

  const headerBg = onHero
    ? 'bg-transparent border-b border-transparent shadow-none backdrop-blur-0'
    : overDark
      ? 'bg-black/85 backdrop-blur-md border-b border-white/10'
      : isSolid
        ? 'bg-pure/95 backdrop-blur-xl border-b border-heavy/5 shadow-sm'
        : 'bg-transparent'
  const languageButtonBg = onHero
    ? 'bg-black/50'
    : overDark
      ? 'bg-black/70'
      : isSolid
        ? 'bg-transparent'
        : 'bg-transparent'

  const textLight = overDark

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,border-color,box-shadow] duration-500 ease-out navbar-safe-top ${headerBg}`}
    >
      <nav className="max-w-7xl mx-auto w-full px-4 sm:px-7 lg:px-10 h-16 sm:h-[72px] flex items-center justify-between gap-3">
        <Link
          to="/"
          className={`font-mono text-sm md:text-[15px] font-semibold uppercase tracking-[0.08em] transition-colors duration-500 ${textLight ? 'text-white' : 'text-heavy'}`}
        >
          NOOKWEB®
        </Link>

        <div className="hidden md:flex items-center gap-5 lg:gap-7 h-full">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`group relative h-full inline-flex items-center text-[11px] md:text-xs font-mono uppercase tracking-[0.1em] font-medium leading-none ${
                textLight ? 'text-white/60' : 'text-heavy/60'
              }`}
            >
              <span className="nav-link-text inline-block">
                {link.label}
              </span>
              <motion.span
                className="absolute left-0 bottom-0 h-[2px] w-full block origin-left"
                style={{
                  background: textLight ? 'var(--hero-orange, #FF4500)' : 'var(--accent-primary, currentColor)',
                }}
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              />
            </Link>
          ))}
          <div className="relative ml-3">
            <button
              type="button"
              onClick={() => setLangOpen((v) => !v)}
              className={`h-8 px-3 rounded-md border text-[11px] font-mono uppercase tracking-[0.08em] ${
                textLight ? `text-white/80 border-white/25 ${languageButtonBg}` : `text-heavy/80 border-heavy/25 ${languageButtonBg}`
              }`}
              aria-label="Selecionar idioma"
              aria-expanded={langOpen}
            >
              {activeLanguageLabel}
            </button>
            {langOpen && (
              <div
                className="absolute right-0 mt-2 min-w-[140px] rounded-md border border-white/15 bg-black/95 shadow-2xl overflow-hidden z-[70]"
              >
                {languageOptions.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => {
                      setLanguage(opt.value)
                      setLangOpen(false)
                    }}
                    className={`w-full text-left px-3 py-2 text-xs font-mono transition-colors ${
                      language === opt.value ? 'text-white bg-white/10' : 'text-white/75 hover:bg-white/10'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="ml-8 lg:ml-10 pl-4 border-l border-white/20">
            <LiquidMetalButton label="INICIAR PROJETO" to="/contato" textStyle="mono" />
          </div>
        </div>

        <button
          className={`md:hidden min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg font-sans transition-colors duration-300 ${
            textLight ? 'text-white hover:bg-white/10' : 'text-heavy hover:bg-heavy/5'
          }`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={mobileOpen}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <>
                <rect x="4" y="4" width="7" height="7" fill="currentColor" stroke="none" />
                <rect x="13" y="4" width="7" height="7" fill="currentColor" stroke="none" />
                <rect x="4" y="13" width="7" height="7" fill="currentColor" stroke="none" />
                <rect x="13" y="13" width="7" height="7" fill="currentColor" stroke="none" />
              </>
            )}
          </svg>
        </button>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`md:hidden border-t ${textLight ? 'bg-heavy border-white/10' : 'bg-pure border-heavy/5'}`}
          >
            <div className="px-4 py-4 flex flex-col gap-1 font-sans">
              {links.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`min-h-[44px] flex items-center px-3 rounded-lg ${textLight ? 'text-white hover:text-[#FF4500] hover:bg-white/10' : 'text-heavy hover:text-accent-primary hover:bg-heavy/5'}`}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <LiquidMetalButton
                label="Iniciar Projeto"
                to="/contato"
                onClick={() => setMobileOpen(false)}
              />
              <div className="pt-2 mt-2 border-t border-white/10">
                <label className={`block text-[10px] font-mono uppercase tracking-[0.12em] mb-2 ${textLight ? 'text-white/60' : 'text-heavy/60'}`}>
                  Idioma
                </label>
                <div className="flex flex-wrap gap-2">
                  {languageOptions.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setLanguage(opt.value)}
                      className={`px-3 py-2 rounded-md border text-xs font-mono ${
                        language === opt.value
                          ? 'text-white bg-white/10 border-white/25'
                          : 'text-white/75 border-white/15 hover:bg-white/10'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
