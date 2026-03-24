import { Container } from '@/components/ui/Container'
import { useI18n } from '@/i18n/I18nProvider'

export function Termos() {
  const { language } = useI18n()
  const copy = language === 'pt'
    ? {
        title: 'Termos de Uso',
        intro: 'Ao utilizar o site da Nookweb, você concorda com os seguintes termos.',
        siteTitle: 'Uso do Site',
        siteText: 'O conteúdo deste site é de propriedade da Nookweb e não pode ser reproduzido sem autorização.',
        contactTitle: 'Contato',
        contactText: 'Para dúvidas sobre estes termos, entre em contato através da nossa página de contato.',
      }
    : {
        title: 'Terms of Use',
        intro: 'By using the Nookweb website, you agree to the following terms.',
        siteTitle: 'Website Usage',
        siteText: 'The content of this website belongs to Nookweb and may not be reproduced without authorization.',
        contactTitle: 'Contact',
        contactText: 'For questions about these terms, contact us through our contact page.',
      }
  return (
    <main className="pt-20 sm:pt-24 pb-16 sm:pb-24">
      <Container>
        <article className="max-w-3xl w-full prose prose-neutral overflow-x-hidden">
          <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl">{copy.title}</h1>
          <p className="text-neutral mt-4">
            {copy.intro}
          </p>
          <h2 className="font-serif text-xl sm:text-2xl mt-6 sm:mt-8">{copy.siteTitle}</h2>
          <p className="text-neutral">
            {copy.siteText}
          </p>
          <h2 className="font-serif text-xl sm:text-2xl mt-6 sm:mt-8">{copy.contactTitle}</h2>
          <p className="text-neutral">
            {copy.contactText}
          </p>
        </article>
      </Container>
    </main>
  )
}
