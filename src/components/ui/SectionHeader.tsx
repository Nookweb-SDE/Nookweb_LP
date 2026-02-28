export function SectionHeader({
  label,
  title,
  description,
  subtitle,
}: {
  label?: string
  title: string
  description?: string
  subtitle?: string
}) {
  const desc = description ?? subtitle
  return (
    <div className="text-center max-w-2xl mx-auto mb-12">
      {label && (
        <p className="font-mono text-[10px] sm:text-xs tracking-[0.15em] uppercase text-neutral mb-2">
          {label}
        </p>
      )}
      <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-heavy tracking-tight leading-tight mb-4">
        {title}
      </h2>
      {desc && (
        <p className="text-neutral text-sm sm:text-base leading-relaxed">
          {desc}
        </p>
      )}
    </div>
  )
}
