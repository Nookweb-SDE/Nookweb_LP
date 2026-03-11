import { useParams, Link } from 'react-router-dom'
import { Container } from '../components/ui/Container'
import { Button } from '../components/ui/Button'

const cases: Record<string, { tag: string; title: string; description: string; results?: string }> = {
  'saas-vendas': { tag: 'SaaS', title: 'Pipeline de Vendas', description: 'Dashboard e CRM integrado para equipe comercial.', results: 'Aumento de 40% na conversão.' },
  'erp-estoque': { tag: 'ERP', title: 'Gestão de Estoque', description: 'Controle de entrada/saída e alertas automáticos.', results: 'Redução de 60% em rupturas.' },
  'app-field': { tag: 'App', title: 'App de Campo', description: 'PWA para equipe externa com modo offline.', results: 'Entrega em 3 semanas.' },
}

export function CaseDetalhe() {
  const { slug } = useParams<{ slug: string }>()
  const caseItem = slug ? cases[slug] : null

  if (!caseItem) {
    return (
      <main className="py-12 sm:py-20 text-center px-4">
        <p>Case não encontrado.</p>
        <Link to="/cases">Voltar aos cases</Link>
      </main>
    )
  }

  return (
    <main className="py-12 sm:py-16 md:py-20">
      <Container>
        <div className="max-w-3xl w-full">
          <span className="font-mono text-sm text-accent">{caseItem.tag}</span>
          <h1 className="mt-2 font-display text-3xl sm:text-4xl md:text-5xl text-heavy">{caseItem.title}</h1>
          <p className="mt-6 text-lg text-neutral">{caseItem.description}</p>
          {caseItem.results && (
            <p className="mt-4 font-medium text-accent">{caseItem.results}</p>
          )}
          <Link to="/contato" className="mt-8 inline-block">
            <Button variant="primary">Quero um resultado assim</Button>
          </Link>
        </div>
      </Container>
    </main>
  )
}
