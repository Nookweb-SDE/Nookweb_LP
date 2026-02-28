import { Container } from '@/components/ui/Container'
import { MeshGradientBackground } from '@/components/ui/MeshGradientBackground'
import { SilverBorderCard } from '@/components/ui/SilverBorderCard'
import { stats } from '@/data/stats'

export function Stats() {
  return (
    <section
      data-dark-section
      className="relative pt-28 pb-20 md:pt-32 md:pb-24 min-h-[420px] flex flex-col justify-center scroll-mt-20 overflow-hidden bg-hero-dark"
      id="stats"
    >
      <MeshGradientBackground speed={1.0} />
      <Container className="relative z-10">
        <div className="stats-cards-grid">
          {stats.map((s) => (
            <SilverBorderCard
              key={s.title}
              badge={s.value}
              title={s.title}
              subtitle={s.subtitle}
            />
          ))}
        </div>
      </Container>
    </section>
  )
}
