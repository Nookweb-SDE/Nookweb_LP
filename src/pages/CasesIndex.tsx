import { Link } from 'react-router-dom'
import { Container } from '../components/ui/Container'
import { SectionHeader } from '../components/ui/SectionHeader'

const cases = [
  { slug: 'saas-vendas', tag: 'SaaS', title: 'Pipeline de Vendas', description: 'Dashboard e CRM integrado.' },
  { slug: 'erp-estoque', tag: 'ERP', title: 'Gestão de Estoque', description: 'Controle e alertas automáticos.' },
  { slug: 'app-field', tag: 'App', title: 'App de Campo', description: 'PWA para equipe externa.' },
]

export function CasesIndex() {
  return (
    <main className="py-20">
      <Container>
        <SectionHeader label="Cases" title="Resultados que falam" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cases.map((c) => (
            <Link
              key={c.slug}
              to={`/cases/${c.slug}`}
              className="overflow-hidden rounded-xl border border-soft bg-pure transition hover:shadow-md"
            >
              <div className="aspect-video bg-soft" />
              <div className="p-6">
                <span className="font-mono text-xs text-accent">{c.tag}</span>
                <h2 className="mt-2 font-display text-xl text-heavy">{c.title}</h2>
                <p className="mt-1 text-neutral">{c.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </main>
  )
}
