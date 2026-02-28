interface StatCardProps {
  value: string
  label: string
}

export function StatCard({ value, label }: StatCardProps) {
  return (
    <div className="text-center">
      <div className="font-display text-4xl font-normal text-pure md:text-5xl">{value}</div>
      <div className="mt-1 font-mono text-sm uppercase tracking-wider text-pure/70">{label}</div>
    </div>
  )
}
