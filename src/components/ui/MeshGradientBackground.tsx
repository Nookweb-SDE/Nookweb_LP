'use client'

import { MeshGradient } from '@paper-design/shaders-react'

interface MeshGradientBackgroundProps {
  speed?: number
  staticMode?: boolean
  className?: string
}

export function MeshGradientBackground({
  speed = 1.0,
  staticMode = false,
  className = '',
}: MeshGradientBackgroundProps) {
  const pulseClass = staticMode ? '' : 'animate-pulse'
  const overlayStyle = staticMode ? undefined : (dur: number, delay = 0) => ({
    animationDuration: `${dur}s`,
    ...(delay ? { animationDelay: `${delay}s` } : {}),
  })

  return (
    <>
      <MeshGradient
        className={`w-full h-full absolute inset-0 ${className}`.trim()}
        colors={['#000000', '#1a1a1a', '#333333', '#ffffff']}
        speed={staticMode ? 0 : speed}
      />
      <div className="absolute inset-0 pointer-events-none">
        <div
          className={`absolute top-1/4 left-1/3 w-32 h-32 bg-gray-800/5 rounded-full blur-3xl ${pulseClass}`}
          style={overlayStyle?.(3)}
        />
        <div
          className={`absolute bottom-1/3 right-1/4 w-24 h-24 bg-white/2 rounded-full blur-2xl ${pulseClass}`}
          style={overlayStyle?.(2, 1)}
        />
        <div
          className={`absolute top-1/2 right-1/3 w-20 h-20 bg-gray-900/3 rounded-full blur-xl ${pulseClass}`}
          style={overlayStyle?.(4, 0.5)}
        />
      </div>
    </>
  )
}
