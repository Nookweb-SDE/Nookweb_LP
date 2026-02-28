import { motion } from 'framer-motion'
import { HeroCarousel } from '@/components/ui/HeroCarousel'

const words = ['CRIAMOS', 'MUNDOS', 'DIGITAIS.']

export function Hero() {
  return (
    <section
      data-dark-section
      className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-24 pb-32 bg-hero-dark"
    >
      <div
        className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col min-h-[calc(100vh-6rem)] pb-4">
        <div className="hero-layout flex-1 flex flex-col min-h-0">
          <div className="hero-left">
            <motion.div
              className="mb-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex flex-col gap-1">
                <span
                  className="font-mono text-xs font-bold tracking-[0.2em] uppercase"
                  style={{ color: 'var(--hero-orange)' }}
                >
                  Agência Digital
                </span>
                <span className="text-xs text-white/30">Est. 2024 · São Paulo, BR</span>
              </div>
            </motion.div>

            <div>
              <div className="mb-2">
                {words.map((word, i) => (
                  <motion.span
                    key={word}
                    className="block font-serif text-4xl sm:text-5xl lg:text-[4rem] font-normal leading-[0.9] tracking-tight overflow-hidden"
                    initial={{ opacity: 0, y: '100%' }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.1 + i * 0.1 }}
                    style={{
                      color: i === 2 ? 'var(--hero-orange)' : 'var(--hero-cream)',
                    }}
                  >
                    <span className="block">{word}</span>
                  </motion.span>
                ))}
              </div>

              <motion.div
                className="w-full h-px bg-white/10 my-8 relative overflow-hidden"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                style={{ transformOrigin: 'left' }}
              >
                <span
                  className="absolute left-0 top-0 h-[3px] w-[60px] -mt-px block"
                  style={{ background: 'var(--hero-orange)' }}
                />
              </motion.div>

              <motion.div
                className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <p className="font-sans text-base text-white/50 leading-relaxed max-w-[420px]">
                  Sites, aplicativos, SaaS e BaaS construídos com precisão. Do wireframe ao produto em produção — sem atalhos, sem compromissos.
                </p>
              </motion.div>
            </div>
          </div>

          <div className="hero-right">
            <HeroCarousel />
          </div>
        </div>

        <motion.div
          className="mt-auto pt-8 border-t border-white/[0.06] py-3 overflow-hidden shrink-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <div className="flex gap-0 w-max animate-marquee-hero">
            {[
              'Sites de Alto Impacto',
              'Aplicativos Mobile',
              'Plataformas SaaS',
              'BaaS & Infraestrutura',
              'Automações N8N',
              'UI/UX Design',
              'No-Code + Código Profissional',
              'IA Integrada',
            ]
              .concat([
                'Sites de Alto Impacto',
                'Aplicativos Mobile',
                'Plataformas SaaS',
                'BaaS & Infraestrutura',
                'Automações N8N',
                'UI/UX Design',
                'No-Code + Código Profissional',
                'IA Integrada',
              ])
              .map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-6 px-8 font-sans text-xs font-semibold tracking-widest uppercase text-white/30 whitespace-nowrap"
                >
                  {item}
                  <span style={{ color: 'var(--hero-orange)' }} className="text-[0.5rem]">
                    ◆
                  </span>
                </div>
              ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
