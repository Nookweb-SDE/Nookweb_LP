import { Container } from '@/components/ui/Container'

export function PoliticaPrivacidade() {
  return (
    <main className="pt-24 pb-24">
      <Container>
        <article className="max-w-3xl prose prose-neutral">
          <h1 className="font-serif text-4xl">Política de Privacidade</h1>
          <p className="text-neutral mt-4">
            Em conformidade com a Lei Geral de Proteção de Dados (LGPD), a Nookweb trata seus dados com segurança e transparência.
          </p>
          <h2 className="font-serif text-2xl mt-8">Coleta de Dados</h2>
          <p className="text-neutral">
            Coletamos apenas os dados necessários para responder às suas solicitações de contato: nome, email, telefone, empresa e mensagem.
          </p>
          <h2 className="font-serif text-2xl mt-8">Uso dos Dados</h2>
          <p className="text-neutral">
            Utilizamos seus dados exclusivamente para contato comercial e para melhorar nossos serviços.
          </p>
          <h2 className="font-serif text-2xl mt-8">Seus Direitos</h2>
          <p className="text-neutral">
            Você pode solicitar acesso, correção ou exclusão dos seus dados a qualquer momento, entrando em contato conosco.
          </p>
        </article>
      </Container>
    </main>
  )
}
