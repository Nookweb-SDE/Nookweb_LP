import { useParams, Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import { Container } from '../components/ui/Container'

const posts: Record<string, { title: string; body: string; date: string }> = {
  'como-escolher-stack': {
    title: 'Como escolher a stack do seu projeto',
    date: '2026-02-20',
    body: 'Guia rápido para founders.\n\n- Considere o time e o prazo.\n- No-code para MVP rápido; código quando precisar escalar.\n- Supabase e Vercel são ótimos para começar.',
  },
  'vibe-coding-na-pratica': {
    title: 'Vibe Coding na prática',
    date: '2026-02-18',
    body: 'IA + no-code + código em um fluxo só.\n\nUsamos ferramentas como Cursor, Bubble e Supabase para entregar em semanas o que levaria meses.',
  },
}

export function BlogPost() {
  const { slug } = useParams<{ slug: string }>()
  const post = slug ? posts[slug] : null

  if (!post) {
    return (
      <main className="py-20 text-center">
        <p>Post não encontrado.</p>
        <Link to="/blog">Voltar ao blog</Link>
      </main>
    )
  }

  return (
    <main className="py-20">
      <Container>
        <article className="max-w-3xl">
          <Link to="/blog" className="text-accent hover:underline">← Blog</Link>
          <span className="ml-4 font-mono text-sm text-neutral">{post.date}</span>
          <h1 className="mt-4 font-display text-4xl text-heavy">{post.title}</h1>
          <div className="prose prose-lg mt-8 text-neutral">
            <ReactMarkdown>{post.body}</ReactMarkdown>
          </div>
        </article>
      </Container>
    </main>
  )
}
