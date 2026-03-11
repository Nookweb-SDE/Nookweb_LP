import { Link } from 'react-router-dom'
import { Container } from '../components/ui/Container'
import { Button } from '../components/ui/Button'

export function NotFound() {
  return (
    <main className="flex min-h-[60vh] items-center py-12 sm:py-20 px-4">
      <Container className="text-center">
        <h1 className="font-display text-5xl sm:text-6xl md:text-7xl text-heavy">404</h1>
        <p className="mt-4 text-neutral">Página não encontrada.</p>
        <Link to="/" className="mt-8 inline-block">
          <Button variant="primary">Voltar ao início</Button>
        </Link>
      </Container>
    </main>
  )
}
