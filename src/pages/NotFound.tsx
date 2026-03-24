import { Link } from 'react-router-dom'
import { Container } from '../components/ui/Container'
import { Button } from '../components/ui/Button'
import { useI18n } from '@/i18n/I18nProvider'

export function NotFound() {
  const { language } = useI18n()
  const copy = language === 'pt'
    ? {
        text: 'Página não encontrada.',
        cta: 'Voltar ao início',
      }
    : {
        text: 'Page not found.',
        cta: 'Back to home',
      }
  return (
    <main className="flex min-h-[60vh] items-center py-12 sm:py-20 px-4">
      <Container className="text-center">
        <h1 className="font-display text-5xl sm:text-6xl md:text-7xl text-heavy">404</h1>
        <p className="mt-4 text-neutral">{copy.text}</p>
        <Link to="/" className="mt-8 inline-block">
          <Button variant="primary">{copy.cta}</Button>
        </Link>
      </Container>
    </main>
  )
}
