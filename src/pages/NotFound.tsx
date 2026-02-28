import { Link } from 'react-router-dom'
import { Container } from '../components/ui/Container'
import { Button } from '../components/ui/Button'

export function NotFound() {
  return (
    <main className="flex min-h-[60vh] items-center py-20">
      <Container className="text-center">
        <h1 className="font-display text-6xl text-heavy">404</h1>
        <p className="mt-4 text-neutral">Página não encontrada.</p>
        <Link to="/" className="mt-8 inline-block">
          <Button variant="primary">Voltar ao início</Button>
        </Link>
      </Container>
    </main>
  )
}
