import { Link } from 'react-router-dom'
import { Container } from '../ui/Container'
import { SectionHeader } from '../ui/SectionHeader'

const cases = [
  { slug: 'saas-vendas', tag: 'SaaS', title: 'Pipeline de Vendas', description: 'Dashboard e CRM integrado para equipe comercial.' },
  { slug: 'erp-estoque', tag: 'ERP', title: 'Gestão de Estoque', description: 'Controle de entrada/saída e alertas automáticos.' },
  { slug: 'app-field', tag: 'App', title: 'App de Campo', description: 'PWA para equipe externa com offline.' },
]

export function Cases() {
  return (
    <section className="py-20">
      <Container>
        <SectionHeader label="Cases" title="Resultados que falam" subtitle="Projetos que entregamos para nossos clientes." />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cases.map((c) => (
            <Link
              key={c.slug}
              to={`/cases/${c.slug}`}
              className="group overflow-hidden rounded-xl border border-soft bg-pure shadow-sm transition hover:shadow-md"
            >
              <div className="aspect-video bg-soft" />
              <div className="p-6">
                <span className="font-mono text-xs text-accent">{c.tag}</span>
                <h3 className="mt-2 font-display text-xl text-heavy group-hover:text-accent">{c.title}</h3>
                <p className="mt-1 text-neutral">{c.description}</p>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link to="/cases" className="text-accent hover:underline">Ver todos os cases →</Link>
        </div>
      </Container>
    </section>
  )
}
