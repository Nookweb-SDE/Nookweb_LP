import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Container } from '@/components/ui/Container'
import { GlassCard } from '@/components/ui/GlassCard'

export function CTAFinal() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 0.5], ['0%', '15%'])

  return (
    <section ref={ref} data-dark-section className="py-24 bg-heavy overflow-hidden">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
          style={{ y }}
        >
          <GlassCard>
            <h2 className="font-serif text-3xl sm:text-4xl text-pure text-center mb-4">
              Receba um Diagnóstico Gratuito
            </h2>
            <p className="text-pure/80 text-center mb-8">
              Conte-nos sobre seu desafio e receba uma análise personalizada.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contato"
                className="inline-flex items-center justify-center rounded-lg px-6 py-3 font-sans font-medium transition bg-pure text-heavy hover:bg-pure-warm"
              >
                Agendar Diagnóstico
              </Link>
            </div>
          </GlassCard>
        </motion.div>
      </Container>
    </section>
  )
}
