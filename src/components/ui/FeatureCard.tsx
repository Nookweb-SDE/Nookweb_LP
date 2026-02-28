import { useRef } from 'react'
import { motion } from 'framer-motion'
import { useMousePosition } from '@/hooks/useMousePosition'
import { Icon3D } from './Icon3D'

export function FeatureCard({
  icon,
  title,
  description,
}: {
  icon?: React.ReactNode
  title: string
  description: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const { x, y } = useMousePosition(ref)

  return (
    <motion.div
      ref={ref}
      className="relative p-5 sm:p-6 rounded-2xl bg-white/[0.25] backdrop-blur-[24px] backdrop-saturate-150 border border-white/50 shadow-[0_8px_32px_rgba(0,0,0,0.06),0_1px_0_rgba(255,255,255,0.5)_inset] hover:shadow-[0_12px_48px_rgba(0,0,0,0.08),0_1px_0_rgba(255,255,255,0.6)_inset] transition-all duration-500 group overflow-hidden"
      whileHover={{ y: -8, scale: 1.02 }}
    >
      <div
        className="absolute pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 w-40 h-40 rounded-full bg-accent-primary/20 blur-3xl -translate-x-1/2 -translate-y-1/2"
        style={{ left: x, top: y }}
      />
      {icon != null && (
        <div className="relative z-10 w-14 h-14 rounded-xl bg-gradient-to-br from-white/90 to-white/60 flex items-center justify-center mb-4 shadow-[0_8px_32px_rgba(0,0,0,0.08),0_2px_8px_rgba(0,0,0,0.04)] border border-white/80 group-hover:from-accent-primary group-hover:to-accent-primary/80 group-hover:border-accent-primary/50 transition-all duration-300">
          <span className="text-heavy group-hover:text-pure transition-colors">
            <Icon3D>{icon}</Icon3D>
          </span>
        </div>
      )}
      <h3 className="relative z-10 font-sans font-semibold text-heavy mb-2">{title}</h3>
      <p className="relative z-10 text-sm text-neutral leading-relaxed">{description}</p>
    </motion.div>
  )
}
