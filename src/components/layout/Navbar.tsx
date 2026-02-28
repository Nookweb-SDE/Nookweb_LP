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
    ? 'bg-transparent'
    : overDark
      ? 'bg-heavy/90 backdrop-blur-md border-b border-white/10'
      : isSolid
        ? 'bg-pure/95 backdrop-blur-xl border-b border-heavy/5 shadow-sm'
        : 'bg-transparent'

  const textLight = overDark

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,border-color,box-shadow] duration-500 ease-out ${headerBg}`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link
          to="/"
          className={`font-serif text-xl transition-colors duration-500 ${textLight ? 'text-white' : 'text-heavy'}`}
        >
          Nookweb
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-sm font-sans transition-colors duration-300 ${
                textLight ? 'text-white/80 hover:text-white' : 'text-heavy/80 hover:text-heavy'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <LiquidMetalButton label="Iniciar Projeto" to="/contato" />
        </div>

        <button
          className={`md:hidden p-2 rounded-lg transition-colors duration-300 ${
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
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
            <div className="px-4 py-4 flex flex-col gap-4">
              {links.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={textLight ? 'text-white hover:text-[#FF4500]' : 'text-heavy hover:text-accent-primary'}
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
