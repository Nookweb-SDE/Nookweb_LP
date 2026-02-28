import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Container } from '@/components/ui/Container'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Icon3D } from '@/components/ui/Icon3D'
import { serviceIcons } from '@/components/ui/ServiceIcon'
import { services } from '@/data/services'

export function ServicosSection() {
  return (
    <section className="py-24">
      <Container>
        <SectionHeader
          label="Serviços"
          title="Do Excel ao Dashboard em Dias"
          description="7 categorias cobrindo toda a jornada digital do seu negócio."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map((s, i) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 40, scale: 0.92 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.55, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
              className={
                i === 0 ? 'sm:col-span-2 lg:row-span-2' :
                i === 2 ? 'lg:col-span-2' :
                i === 4 ? 'lg:col-span-2' : ''
              }
            >
              <Link
                to={`/servicos/${s.slug}`}
                className="group block h-full min-h-[140px] p-6 rounded-2xl bg-white/40 backdrop-blur-xl border border-white/60 shadow-lg shadow-heavy/5 hover:shadow-xl hover:shadow-accent-primary/10 hover:border-accent-primary/30 transition-all duration-500 hover:-translate-y-1"
              >
                <div className="mb-3 w-12 h-12 flex items-center justify-center">
                  <Icon3D size={28}>
                    {(() => {
                      const Icon = serviceIcons[s.slug]
                      return Icon ? <Icon size={28} strokeWidth={1.5} className="text-heavy" /> : null
                    })()}
                  </Icon3D>
                </div>
                <h3 className="font-sans font-semibold text-heavy group-hover:text-accent-primary transition-colors">
                  {s.name}
                </h3>
                <p className={`text-sm text-neutral mt-2 ${i === 0 ? 'line-clamp-3' : 'line-clamp-2'}`}>{s.description}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}
