import { Hero } from '@/components/sections/Hero'
import { Marquee } from '@/components/sections/Marquee'
import { Metodologia } from '@/components/sections/Metodologia'
import { ServicosSection } from '@/components/sections/ServicosSection'
import { Stats } from '@/components/sections/Stats'
import { CasesSection } from '@/components/sections/CasesSection'
import { Comparativo } from '@/components/sections/Comparativo'

export function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <Metodologia />
      <ServicosSection />
      <Stats />
      <CasesSection />
      <Comparativo />
    </>
  )
}
