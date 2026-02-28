import { motion } from 'framer-motion'
import { Container } from '@/components/ui/Container'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { teamMembers } from '@/data/team'

export function EquipeSection() {
  return (
    <section className="py-24 bg-pure-warm/30">
      <Container>
        <SectionHeader
          label="Equipe"
          title="Quem Faz Acontecer"
          description="Profissionais dedicados à transformação digital."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((m, i) => (
            <motion.div
              key={m.id}
              className="group text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="w-32 h-32 mx-auto rounded-full bg-heavy/10 overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-500 flex items-center justify-center text-5xl">
                {m.photo ? (
                  <img src={m.photo} alt={m.name} className="w-full h-full object-cover" />
                ) : (
                  '👤'
                )}
              </div>
              <h3 className="font-sans font-semibold text-heavy mt-4">{m.name}</h3>
              <p className="font-mono text-xs text-accent-primary mt-1">{m.role}</p>
              {m.bio && <p className="text-sm text-neutral mt-2">{m.bio}</p>}
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}
