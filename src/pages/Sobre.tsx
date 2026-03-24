import { Container } from '../components/ui/Container'
import { SectionHeader } from '../components/ui/SectionHeader'
import { Equipe } from '../components/sections/Equipe'
import { useI18n } from '@/i18n/I18nProvider'

export function Sobre() {
  const { language } = useI18n()
  const copy = language === 'pt'
    ? {
        label: 'Sobre',
        subtitle: 'Holding Digital do Grupo ImpulsoTech.',
        p1: 'A Nookweb é a holding digital e empresa matriz do grupo que inclui a ImpulsoTech. Fusão entre as duas empresas criou um ecossistema completo de tecnologia, com a Nookweb posicionada como marca premium e centralizadora de todos os serviços digitais do grupo.',
        p2: 'Metodologia Vibe Coding: IA generativa + no-code + código profissional para entregar até 90% mais barato e 10x mais rápido.',
      }
    : {
        label: 'About',
        subtitle: 'Digital Holding from Grupo ImpulsoTech.',
        p1: 'Nookweb is the digital holding and parent company of the group that includes ImpulsoTech. The merger created a complete technology ecosystem, with Nookweb positioned as the premium brand that centralizes the group digital services.',
        p2: 'Vibe Coding methodology: generative AI + no-code + professional code to deliver up to 90% cheaper and 10x faster.',
      }
  return (
    <main className="py-12 sm:py-16 md:py-20">
      <Container>
        <SectionHeader
          label={copy.label}
          title="Nookweb"
          subtitle={copy.subtitle}
        />
        <div className="prose prose-lg max-w-3xl w-full overflow-x-hidden">
          <p className="text-neutral">
            {copy.p1}
          </p>
          <p className="mt-4 text-neutral">
            {copy.p2}
          </p>
        </div>
        <Equipe />
      </Container>
    </main>
  )
}
