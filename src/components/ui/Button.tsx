import { ButtonHTMLAttributes } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost' | 'cta-white'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  children: React.ReactNode
  className?: string
}

const variants: Record<Variant, string> = {
  primary: 'bg-accent text-pure hover:opacity-90',
  secondary: 'bg-heavy text-pure hover:bg-neutral',
  ghost: 'bg-transparent text-heavy border border-heavy hover:bg-soft',
  'cta-white': 'bg-pure text-heavy hover:bg-pure-warm',
}

export function Button({ variant = 'primary', children, className = '', ...props }: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-lg px-6 py-3 font-sans font-medium transition ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
