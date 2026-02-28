import { motion } from 'framer-motion'

interface Icon3DProps {
  children: React.ReactNode
  size?: number
  className?: string
}

export function Icon3D({ children, size = 32, className = '' }: Icon3DProps) {
  return (
    <motion.div
      className={`inline-flex items-center justify-center [perspective:600px] ${className}`}
      whileHover={{ scale: 1.12, rotateY: 8, rotateX: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      style={{ transformStyle: 'preserve-3d' }}
    >
      <span
        className="flex items-center justify-center"
        style={{
          width: size,
          height: size,
          filter: 'drop-shadow(0 3px 6px rgba(0,0,0,0.2))',
        }}
      >
        {children}
      </span>
    </motion.div>
  )
}
