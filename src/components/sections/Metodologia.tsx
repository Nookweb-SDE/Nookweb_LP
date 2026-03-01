import { motion } from 'framer-motion'
import { FeatureCard } from '@/components/ui/FeatureCard'
import { Container } from '@/components/ui/Container'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { metodologiaIcons } from '@/components/ui/ServiceIcon'

const features = [
  { key: 'Design', title: 'Design', description: 'Interfaces premium e experienciais que convertem.' },
  { key: 'Sistemas Web', title: 'Sistemas Web', description: 'Sites, landing pages e portais sob medida.' },
  { key: 'Apps', title: 'Apps', description: 'Mobile, PWA e aplicações escaláveis.' },
  { key: 'Inteligência Artificial', title: 'Inteligência Artificial', description: 'IA integrada em chatbots, análise e automação.' },
]

export function Metodologia() {
  return (
    <section className="py-24 bg-pure-warm/50">
      <Container>
        <SectionHeader
          label="Metodologia"
          title="Low-code, IA e Código Profissional"
          description="Do no-code ao código nativo: React, Python, Java, Node.js e mais. Escolhemos a stack certa para cada projeto."
        />
        <div className="grid sm:grid-cols-2 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.key}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <FeatureCard
                icon={(() => {
                  const Icon = metodologiaIcons[f.key]
                  return Icon ? <Icon size={24} strokeWidth={1.5} className="text-heavy" /> : null
                })()}
                title={f.title}
                description={f.description}
              />
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}
