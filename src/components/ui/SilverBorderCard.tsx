import { LiquidMetalBadge } from '@/components/ui/LiquidMetalBadge'

export interface SilverBorderCardProps {
  badge: string
  title: string
  subtitle: string
  className?: string
}

export function SilverBorderCard({
  badge,
  title,
  subtitle,
  className = '',
}: SilverBorderCardProps) {
  return (
    <div className={`stats-card-wrapper ${className}`}>
      <div className="stats-card">
        <p className="stats-card-title">{title}</p>
        <hr className="stats-card-divider" />
        <p className="stats-card-description">{subtitle}</p>
      </div>
      <div className="stats-card-badge">
        <LiquidMetalBadge label={badge} />
      </div>
    </div>
  )
}
