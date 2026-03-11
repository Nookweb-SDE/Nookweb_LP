import { Link } from 'react-router-dom'
import { Container } from '../components/ui/Container'
import { SectionHeader } from '../components/ui/SectionHeader'

const posts = [
  { slug: 'como-escolher-stack', title: 'Como escolher a stack do seu projeto', excerpt: 'Guia rápido para founders.', date: '2026-02-20' },
  { slug: 'vibe-coding-na-pratica', title: 'Vibe Coding na prática', excerpt: 'IA + no-code + código em um fluxo só.', date: '2026-02-18' },
]

export function BlogIndex() {
  return (
    <main className="py-12 sm:py-16 md:py-20">
      <Container>
        <SectionHeader label="Blog" title="Conteúdo para você" />
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
