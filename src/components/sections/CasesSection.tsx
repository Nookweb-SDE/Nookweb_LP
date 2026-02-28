import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Container } from '@/components/ui/Container'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Icon3D } from '@/components/ui/Icon3D'
import { caseIcons } from '@/components/ui/ServiceIcon'

const casesData = [
  { slug: 'erp-gestao', tag: 'ERP', title: 'Sistema de Gestão Integrada', description: 'Dashboard e automações para PME.' },
  { slug: 'saas-plataforma', tag: 'SaaS', title: 'Plataforma sob Demanda', description: 'Multi-tenant com recorrência.' },
  { slug: 'app-mvp', tag: 'App', title: 'App Mobile MVP', description: 'Validação em 4 semanas.' },
]

export function CasesSection() {
  return (
    <section className="py-24 bg-pure-warm/30">
      <Container>
        <SectionHeader
          label="Cases"
          title="Resultados Que Falam"
          description="Projetos que transformaram planilhas em sistemas inteligentes."
        />
        <div className="grid md:grid-cols-3 gap-6">
          {casesData.map((c, i) => (
            <motion.div
              key={c.slug}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <Link
                to={`/cases/${c.slug}`}
                className="block group overflow-hidden rounded-2xl bg-white/40 backdrop-blur-xl border border-white/60 shadow-lg shadow-heavy/5 hover:shadow-xl hover:shadow-accent-primary/10 hover:border-accent-primary/20 transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1"
              >
                <div className="aspect-video bg-gradient-to-br from-heavy/5 to-accent-primary/5 flex items-center justify-center overflow-hidden">
                  <Icon3D size={48}>
                    {(() => {
                      const Icon = caseIcons[c.tag]
                      return Icon ? <Icon size={48} strokeWidth={1.5} className="text-heavy" /> : null
                    })()}
                  </Icon3D>
                </div>
                <div className="p-6">
                  <span className="font-mono text-xs text-accent-primary">{c.tag}</span>
                  <h3 className="font-sans font-semibold text-heavy mt-2 group-hover:text-accent-primary transition-colors">
                    {c.title}
                  </h3>
                  <p className="text-sm text-neutral mt-1">{c.description}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link
            to="/cases"
            className="inline-flex items-center gap-2 text-accent-primary font-medium hover:underline"
          >
            Ver todos os cases →
          </Link>
        </div>
      </Container>
    </section>
  )
}
