import { Container } from '@/components/ui/Container'

export function Termos() {
  return (
    <main className="pt-24 pb-24">
      <Container>
        <article className="max-w-3xl prose prose-neutral">
          <h1 className="font-serif text-4xl">Termos de Uso</h1>
          <p className="text-neutral mt-4">
            Ao utilizar o site da Nookweb, você concorda com os seguintes termos.
          </p>
          <h2 className="font-serif text-2xl mt-8">Uso do Site</h2>
          <p className="text-neutral">
            O conteúdo deste site é de propriedade da Nookweb e não pode ser reproduzido sem autorização.
          </p>
          <h2 className="font-serif text-2xl mt-8">Contato</h2>
          <p className="text-neutral">
            Para dúvidas sobre estes termos, entre em contato através da nossa página de contato.
          </p>
        </article>
      </Container>
    </main>
  )
}
