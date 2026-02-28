import { motion } from 'framer-motion'
import { marqueeTools } from '@/data/marquee'

export function Marquee() {
  return (
    <section className="py-12 border-y border-heavy/10 overflow-hidden">
      <motion.div
        className="flex gap-12 sm:gap-16 w-max"
        animate={{ x: [0, -1440] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      >
        {[...marqueeTools, ...marqueeTools, ...marqueeTools].map((tool, i) => (
          <span
            key={`${tool}-${i}`}
            className="text-xl sm:text-2xl font-mono text-neutral/60 hover:text-accent-primary transition-colors grayscale hover:grayscale-0 whitespace-nowrap"
          >
            {tool}
          </span>
        ))}
      </motion.div>
    </section>
  )
}
