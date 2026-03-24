import { Container } from '@/components/ui/Container'
import { useI18n } from '@/i18n/I18nProvider'

export function PoliticaPrivacidade() {
  const { language } = useI18n()
  const copy = language === 'pt'
    ? {
        title: 'Política de Privacidade',
        intro: 'Em conformidade com a Lei Geral de Proteção de Dados (LGPD), a Nookweb trata seus dados com segurança e transparência.',
        dataTitle: 'Coleta de Dados',
        dataText: 'Coletamos apenas os dados necessários para responder às suas solicitações de contato: nome, email, telefone, empresa e mensagem.',
        usageTitle: 'Uso dos Dados',
        usageText: 'Utilizamos seus dados exclusivamente para contato comercial e para melhorar nossos serviços.',
        rightsTitle: 'Seus Direitos',
        rightsText: 'Você pode solicitar acesso, correção ou exclusão dos seus dados a qualquer momento, entrando em contato conosco.',
      }
    : {
        title: 'Privacy Policy',
        intro: 'In compliance with data protection laws, Nookweb handles your data with security and transparency.',
        dataTitle: 'Data Collection',
        dataText: 'We collect only the necessary data to respond to your contact requests: name, email, phone, company and message.',
        usageTitle: 'Data Usage',
        usageText: 'Your data is used exclusively for business contact and service improvement.',
        rightsTitle: 'Your Rights',
        rightsText: 'You may request access, correction or deletion of your data at any time by contacting us.',
      }
  return (
    <main className="pt-20 sm:pt-24 pb-16 sm:pb-24">
      <Container>
        <article className="max-w-3xl w-full prose prose-neutral overflow-x-hidden">
          <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl">{copy.title}</h1>
          <p className="text-neutral mt-4">
            {copy.intro}
          </p>
          <h2 className="font-serif text-xl sm:text-2xl mt-6 sm:mt-8">{copy.dataTitle}</h2>
          <p className="text-neutral">
            {copy.dataText}
          </p>
          <h2 className="font-serif text-xl sm:text-2xl mt-6 sm:mt-8">{copy.usageTitle}</h2>
          <p className="text-neutral">
            {copy.usageText}
          </p>
          <h2 className="font-serif text-xl sm:text-2xl mt-6 sm:mt-8">{copy.rightsTitle}</h2>
          <p className="text-neutral">
            {copy.rightsText}
          </p>
        </article>
      </Container>
    </main>
  )
}
