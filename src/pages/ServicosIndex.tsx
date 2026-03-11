import { Link } from 'react-router-dom'
import { Container } from '@/components/ui/Container'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { services } from '@/data/services'

export function ServicosIndex() {
  return (
    <main className="pt-20 sm:pt-24 pb-12 sm:pb-20">
      <Container>
        <SectionHeader
          label="Serviços"
          title="7 formas de transformar seu negócio"
          subtitle="Clique em cada serviço para ver detalhes, stack e cases."
        />
        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <Link
              key={s.id}
              to={`/servicos/${s.slug}`}
              className="rounded-xl border border-soft bg-pure p-6 shadow-sm transition hover:border-accent-primary hover:shadow-md"
            >
              <span className="text-3xl">{s.icon}</span>
              <h2 className="mt-4 font-display text-2xl text-heavy">{s.name}</h2>
              <p className="mt-2 text-neutral">{s.description}</p>
              <span className="mt-4 inline-block text-accent-primary">Ver mais →</span>
            </Link>
          ))}
        </div>
      </Container>
    </main>
  )
}
