import { Container } from '../ui/Container'
import { SectionHeader } from '../ui/SectionHeader'

const team = [
  { name: 'Equipe Nookweb', role: 'Holding', bio: 'Especialistas em Vibe Coding e entrega rápida.' },
]

export function Equipe() {
  return (
    <section className="py-20">
      <Container>
        <SectionHeader label="Equipe" title="Quem faz acontecer" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((m) => (
            <div
              key={m.name}
              className="overflow-hidden rounded-xl border border-soft bg-pure p-6 transition hover:shadow-md"
            >
              <div className="aspect-square rounded-lg bg-soft grayscale transition hover:grayscale-0" />
              <h3 className="mt-4 font-display text-xl text-heavy">{m.name}</h3>
              <p className="font-mono text-sm text-accent">{m.role}</p>
              <p className="mt-2 text-neutral">{m.bio}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
