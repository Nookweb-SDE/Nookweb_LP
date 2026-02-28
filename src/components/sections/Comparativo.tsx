import { motion } from 'framer-motion'
import { Container } from '@/components/ui/Container'
import { SectionHeader } from '@/components/ui/SectionHeader'

const rows = [
  { label: 'Custo', nookweb: ' até 90% menor', agencia: ' R$ 50k+', freelancer: ' Variável' },
  { label: 'Prazo', nookweb: ' 2-4 semanas', agencia: ' 3-6 meses', freelancer: ' Indefinido' },
  { label: 'IA integrada', nookweb: ' ✓', agencia: ' Raramente', freelancer: ' Depende' },
  { label: 'Suporte', nookweb: ' ✓ Contínuo', agencia: ' Pós-entrega', freelancer: ' Limitado' },
]

export function Comparativo() {
  return (
    <section className="py-24">
      <Container>
        <SectionHeader
          label="Comparativo"
          title="Por Que a Nookweb?"
          description="Veja a diferença na prática."
        />
        <motion.div
          className="overflow-x-auto rounded-xl border border-heavy/10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <table className="w-full min-w-[600px] text-left">
            <thead>
              <tr className="bg-heavy/5">
                <th className="px-6 py-4 font-mono text-xs uppercase text-neutral"></th>
                <th className="px-6 py-4 font-sans font-semibold text-accent-primary">Nookweb</th>
                <th className="px-6 py-4 font-sans font-semibold text-heavy">Agências Tradicionais</th>
                <th className="px-6 py-4 font-sans font-semibold text-heavy">Freelancers</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.label} className="border-t border-heavy/5 hover:bg-pure-warm/50">
                  <td className="px-6 py-4 font-mono text-xs text-neutral">{r.label}</td>
                  <td className="px-6 py-4 font-sans text-heavy">{r.nookweb}</td>
                  <td className="px-6 py-4 font-sans text-neutral">{r.agencia}</td>
                  <td className="px-6 py-4 font-sans text-neutral">{r.freelancer}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </Container>
    </section>
  )
}
