import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Container } from '@/components/ui/Container'
import { services } from '@/data/services'
import { useI18n } from '@/lib/i18n'

const ORANGE = '#FF4500'

const ICONS: Record<string, JSX.Element> = {
  sites: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    </svg>
  ),
  'e-commerce': (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
    </svg>
  ),
  aplicativos: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
      <line x1="12" y1="18" x2="12.01" y2="18"/>
    </svg>
  ),
  saas: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
    </svg>
  ),
  'erp-crm': (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3"/>
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/>
    </svg>
  ),
  integracoes: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
    </svg>
  ),
  'inteligencia-artificial': (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2z"/>
      <circle cx="7.5" cy="14.5" r="1.5" fill="currentColor" stroke="none"/>
      <circle cx="16.5" cy="14.5" r="1.5" fill="currentColor" stroke="none"/>
    </svg>
  ),
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
}

const rowVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
}

const SLUG_KEY: Record<string, { name: string; desc: string }> = {
  'sites':                    { name: 'sites_name',       desc: 'sites_desc'       },
  'e-commerce':               { name: 'ecommerce_name',   desc: 'ecommerce_desc'   },
  'aplicativos':              { name: 'aplicativos_name', desc: 'aplicativos_desc' },
  'saas':                     { name: 'saas_name',        desc: 'saas_desc'        },
  'erp-crm':                  { name: 'erp_name',         desc: 'erp_desc'         },
  'integracoes':              { name: 'integracoes_name', desc: 'integracoes_desc' },
  'inteligencia-artificial':  { name: 'ia_name',          desc: 'ia_desc'          },
}

export function ServicosIndex() {
  const { t } = useI18n()

  return (
    <main className="pt-24 sm:pt-28 pb-20 bg-white min-h-screen">
      <Container>
        {/* Header */}
        <div className="mb-14 sm:mb-20">
          <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-[#1C1A16]/30 mb-4">
            {t('servicos', 'label')}
          </p>
          <h1 className="font-sans text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1C1A16] leading-[1.08] mb-4">
            {t('servicos', 'title')}
          </h1>
          <p className="text-[#1C1A16]/40 text-sm font-mono max-w-md">
            {t('servicos', 'subtitle')}
          </p>
        </div>

        {/* Lista */}
        <motion.div
          className="divide-y divide-[#E8E4DC]"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {services.map((s, i) => (
            <motion.div key={s.id} variants={rowVariants}>
              <Link to={`/servicos/${s.slug}`}>
                <motion.div
                  className="group grid grid-cols-[52px_1fr] sm:grid-cols-[80px_1fr_auto] items-start gap-x-6 gap-y-1 py-7 sm:py-8 cursor-pointer"
                  whileHover={{ x: 3 }}
                  transition={{ duration: 0.18 }}
                >
                  {/* Número */}
                  <span className="font-mono text-2xl sm:text-3xl font-black leading-none pt-1 text-[#1C1A16]/15 group-hover:text-[#FF4500] transition-colors duration-300">
                    {String(i + 1).padStart(3, '0')}
                  </span>

                  {/* Título + descrição */}
                  <div className="min-w-0">
                    <div className="flex items-center gap-3 mb-1.5">
                      {/* Ícone inline */}
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex-shrink-0"
                        style={{ color: ORANGE }}>
                        {ICONS[s.slug]}
                      </span>
                      <h2 className="font-sans text-xl sm:text-2xl lg:text-3xl font-semibold text-[#1C1A16] group-hover:text-[#FF4500] transition-colors duration-200 leading-snug">
                        {t('servicesData', SLUG_KEY[s.slug]?.name as any) || s.name}
                      </h2>
                    </div>
                    <p className="text-sm sm:text-[15px] text-[#1C1A16]/50 leading-relaxed max-w-xl pl-[calc(20px+12px)] sm:pl-0">
                      {t('servicesData', SLUG_KEY[s.slug]?.desc as any) || s.description}
                    </p>

                    {/* Stack (mobile — abaixo da descrição) */}
                    <div className="flex flex-wrap gap-1.5 mt-3 sm:hidden opacity-0 group-hover:opacity-100 transition-opacity duration-200 pl-0">
                      {(s.stack ?? []).slice(0, 3).map((tech) => (
                        <span key={tech} className="px-2 py-0.5 text-[10px] font-mono rounded bg-[#F5F0E8] text-[#1C1A16]/60">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Stack + seta (desktop) */}
                  <div className="hidden sm:flex flex-col items-end gap-2 pt-1 min-w-[160px]">
                    <div className="flex flex-wrap gap-1.5 justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      {(s.stack ?? []).slice(0, 3).map((tech) => (
                        <span key={tech} className="px-2 py-0.5 text-[10px] font-mono rounded bg-[#F5F0E8] text-[#1C1A16]/60">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <span className="font-mono text-base transition-all duration-200 flex items-center gap-1"
                      style={{ color: ORANGE }}>
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-150 text-xs">
                        {t('servicos', 'verDetalhes')}
                      </span>
                      <motion.span
                        className="inline-block"
                        initial={{ x: 0 }}
                        whileHover={{ x: 4 }}
                      >
                        →
                      </motion.span>
                    </span>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA bottom */}
        <div className="mt-16 pt-10 border-t border-[#E8E4DC] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <p className="text-[#1C1A16] font-semibold text-lg mb-1">{t('servicos', 'naoEncontrou')}</p>
            <p className="text-[#1C1A16]/50 text-sm">{t('servicos', 'medida')}</p>
          </div>
          <Link
            to="/contato"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#FF4500] text-white text-sm font-mono uppercase tracking-widest rounded-lg hover:bg-[#FF6D00] transition-colors duration-200"
          >
            {t('servicos', 'cta')}
          </Link>
        </div>
      </Container>
    </main>
  )
}
