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
  const { pathname } = useLocation()
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

  const textLight = overDark

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,border-color,box-shadow] duration-500 ease-out navbar-safe-top ${headerBg}`}
    >
      <nav className="max-w-7xl mx-auto w-full px-3 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-2">
        <Link
          to="/"
          className={`font-mono text-xs md:text-sm font-semibold uppercase tracking-wider transition-colors duration-500 ${textLight ? 'text-white' : 'text-heavy'}`}
        >
          NOOKWEB®
        </Link>

        <div className="hidden md:flex items-center gap-3 sm:gap-4 md:gap-8">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`group relative text-xs md:text-sm font-mono uppercase tracking-wider ${
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
          <div className="ml-2 lg:ml-4">
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
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
