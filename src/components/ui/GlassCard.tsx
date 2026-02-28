export function GlassCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border border-white/20 bg-white/10 p-8 backdrop-blur-xl ${className}`}>
      {children}
    </div>
  )
}
