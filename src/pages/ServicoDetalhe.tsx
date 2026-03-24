import { useParams, Link } from 'react-router-dom'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { services } from '@/data/services'
import { useI18n } from '@/i18n/I18nProvider'

export function ServicoDetalhe() {
  const { language } = useI18n()
  const copy = language === 'pt'
    ? {
        notFound: 'Serviço não encontrado.',
        back: 'Voltar aos serviços',
        cta: 'Falar com a gente',
      }
    : {
        notFound: 'Service not found.',
        back: 'Back to services',
        cta: 'Talk to our team',
      }
  const { slug } = useParams<{ slug: string }>()
  const service = services.find((s) => s.slug === slug)

  if (!service) {
    return (
      <main className="pt-20 sm:pt-24 pb-12 sm:pb-20 text-center px-4">
        <p>{copy.notFound}</p>
        <Link to="/servicos">{copy.back}</Link>
      </main>
    )
  }

  return (
    <main className="pt-20 sm:pt-24 pb-12 sm:pb-20">
      <Container>
        <div className="max-w-3xl w-full">
          {service.stack && service.stack.length > 0 && (
            <span className="font-mono text-sm text-accent-primary">{service.stack.join(' • ')}</span>
          )}
          <h1 className="mt-2 font-display text-3xl sm:text-4xl md:text-5xl text-heavy">{service.name}</h1>
          <p className="mt-6 text-lg text-neutral">{service.description}</p>
          {service.features && service.features.length > 0 && (
            <ul className="mt-4 list-disc list-inside text-neutral">
              {service.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          )}
          <Link to="/contato" className="mt-8 inline-block">
            <Button variant="primary">{copy.cta}</Button>
          </Link>
        </div>
      </Container>
    </main>
  )
}
