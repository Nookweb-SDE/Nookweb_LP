import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Hero } from '@/components/sections/Hero'
import { Marquee } from '@/components/sections/Marquee'
import { Metodologia } from '@/components/sections/Metodologia'
import { ServicosSection } from '@/components/sections/ServicosSection'
import { Stats } from '@/components/sections/Stats'
import { IACorporativaSection } from '@/components/sections/IACorporativaSection'
import { CasesSection } from '@/components/sections/CasesSection'
import { Comparativo } from '@/components/sections/Comparativo'

export function Home() {
  const location = useLocation()

  useEffect(() => {
    if (location.hash !== '#cases') return
    const el = document.getElementById('cases')
    if (!el) return
    const t = window.requestAnimationFrame(() => {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
    return () => window.cancelAnimationFrame(t)
  }, [location.pathname, location.hash])

  return (
    <>
      <Hero />
      <Marquee />
      <Metodologia />
      <ServicosSection />
      <Stats />
      <IACorporativaSection />
      <CasesSection />
      <Comparativo />
    </>
  )
}
