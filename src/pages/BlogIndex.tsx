import { Link } from 'react-router-dom'
import { Container } from '../components/ui/Container'
import { SectionHeader } from '../components/ui/SectionHeader'
import { useI18n } from '@/i18n/I18nProvider'

const posts = [
  { slug: 'ia-corporativa-sem-expor-dados', title: 'IA corporativa sem expor dados: como funciona um LLM on-premise', excerpt: 'Sua empresa pode usar IA generativa sem enviar dados confidenciais para a nuvem. Entenda a arquitetura RAG + Ollama.', date: '2026-03-22' },
  { slug: 'mvp-em-semanas-nao-meses', title: 'MVP em semanas, não meses: o método Nookweb', excerpt: 'Como combinamos no-code, IA e código para entregar o primeiro produto funcional em tempo recorde.', date: '2026-03-18' },
  { slug: 'erp-pronto-vs-sob-medida', title: 'ERP pronto vs. sob medida: qual vale mais para sua operação?', excerpt: 'Quando um sistema genérico basta e quando você precisa de um ERP construído para o seu processo.', date: '2026-03-14' },
  { slug: 'e-commerce-inteligente-ia', title: 'E-commerce inteligente: como a IA aumenta o ticket médio', excerpt: 'Recomendações personalizadas, busca semântica e chatbot de vendas — tecnologias acessíveis para lojas online.', date: '2026-03-10' },
  { slug: 'integracoes-api-sem-dor', title: 'Integrações API sem dor: conectando sistemas que não conversam', excerpt: 'Webhooks, middleware e orquestração de dados — o guia prático para eliminar retrabalho entre plataformas.', date: '2026-03-06' },
  { slug: 'saas-do-zero-ao-recorrente', title: 'SaaS do zero ao recorrente: arquitetura multi-tenant na prática', excerpt: 'Os pilares técnicos para construir uma plataforma SaaS escalável com Supabase e Node.js.', date: '2026-03-02' },
  { slug: 'como-escolher-stack', title: 'Como escolher a stack do seu projeto', excerpt: 'Guia rápido para founders que precisam decidir entre no-code, low-code e código personalizado.', date: '2026-02-20' },
  { slug: 'vibe-coding-na-pratica', title: 'Vibe Coding na prática', excerpt: 'IA + no-code + código em um fluxo só. O workflow que usamos para entregar em semanas.', date: '2026-02-18' },
]

export function BlogIndex() {
  const { language } = useI18n()
  const copy = language === 'pt'
    ? { title: 'Conteúdo para você' }
    : { title: 'Content for you' }
  return (
    <main className="py-12 sm:py-16 md:py-20">
      <Container>
        <SectionHeader label="Blog" title={copy.title} />
        <div className="space-y-6 sm:space-y-8">
          {posts.map((p) => (
            <Link
              key={p.slug}
              to={`/blog/${p.slug}`}
              className="block rounded-xl border border-soft bg-pure p-4 sm:p-6 transition hover:shadow-md"
            >
              <span className="font-mono text-sm text-neutral">{p.date}</span>
              <h2 className="mt-2 font-display text-xl sm:text-2xl text-heavy">{p.title}</h2>
              <p className="mt-2 text-neutral">{p.excerpt}</p>
            </Link>
          ))}
        </div>
      </Container>
    </main>
  )
}
