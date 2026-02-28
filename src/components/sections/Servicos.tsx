import { Link } from 'react-router-dom'
import { Container } from '@/components/ui/Container'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { services } from '@/data/services'

export function Servicos() {
  return (
    <section className="bg-pure-warm py-20">
      <Container>
        <SectionHeader
          label="Serviços"
          title="7 formas de transformar seu negócio"
          subtitle="Do site ao ERP com IA: cobrimos toda a jornada digital."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <Link
              key={s.id}
              to={`/servicos/${s.slug}`}
              className="group rounded-xl border border-soft bg-pure p-6 shadow-sm transition hover:border-accent-primary hover:shadow-md"
            >
              <span className="text-2xl">{s.icon}</span>
              <h3 className="mt-3 font-display text-xl text-heavy group-hover:text-accent-primary">{s.name}</h3>
              <p className="mt-2 text-sm text-neutral">{s.description}</p>
              {s.stack && s.stack.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {s.stack.map((tag: string) => (
                    <span key={tag} className="rounded bg-soft px-2 py-0.5 font-mono text-xs text-heavy">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </Link>
          ))}
        </div>
      </Container>
    </section>
  )
}
