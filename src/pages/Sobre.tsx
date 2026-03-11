import { Container } from '../components/ui/Container'
import { SectionHeader } from '../components/ui/SectionHeader'
import { Equipe } from '../components/sections/Equipe'

export function Sobre() {
  return (
    <main className="py-12 sm:py-16 md:py-20">
      <Container>
        <SectionHeader
          label="Sobre"
          title="Nookweb"
          subtitle="Holding Digital do Grupo ImpulsoTech."
        />
        <div className="prose prose-lg max-w-3xl w-full overflow-x-hidden">
          <p className="text-neutral">
            A Nookweb é a holding digital e empresa matriz do grupo que inclui a ImpulsoTech.
            Fusão entre as duas empresas criou um ecossistema completo de tecnologia, com a Nookweb
            posicionada como marca premium e centralizadora de todos os serviços digitais do grupo.
          </p>
          <p className="mt-4 text-neutral">
            Metodologia Vibe Coding: IA generativa + no-code + código profissional para entregar
            até 90% mais barato e 10x mais rápido.
          </p>
        </div>
        <Equipe />
      </Container>
    </main>
  )
}
