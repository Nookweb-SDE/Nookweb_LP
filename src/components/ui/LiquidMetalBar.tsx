'use client'

import { useRef, useEffect } from 'react'

interface LiquidMetalBarProps {
  /** Conteúdo interno (ex: barra gradiente) — o liquid metal fica em volta */
  children?: React.ReactNode
  /** Altura do container em px (mínimo 10 para shader + barra) */
  height?: number
  className?: string
  style?: React.CSSProperties
}

const WRAPPER_HEIGHT = 12

export function LiquidMetalBar({
  children,
  height = WRAPPER_HEIGHT,
  className,
  style,
}: LiquidMetalBarProps) {
  const shaderRef = useRef<HTMLDivElement>(null)
  const shaderMount = useRef<{ dispose: () => void } | null>(null)

  useEffect(() => {
    const styleId = 'shader-bar-style-nookweb'
    if (!document.getElementById(styleId)) {
      const el = document.createElement('style')
      el.id = styleId
      el.textContent = `
        .shader-bar-nookweb canvas {
          width: 100% !important;
          height: 100% !important;
          display: block !important;
          position: absolute !important;
          top: 0 !important;
          left: 0 !important;
          border-radius: 100px !important;
        }
      `
      document.head.appendChild(el)
    }

    const loadShader = async () => {
      try {
        const { liquidMetalFragmentShader, ShaderMount } = await import('@paper-design/shaders')

        if (shaderRef.current) {
          if (shaderMount.current?.dispose) shaderMount.current.dispose()

          shaderMount.current = new ShaderMount(
            shaderRef.current,
            liquidMetalFragmentShader,
            {
              u_repetition: 6,
              u_softness: 0.5,
              u_shiftRed: 0.3,
              u_shiftBlue: 0.3,
              u_distortion: 0,
              u_contour: 0,
              u_angle: 90,
              u_scale: 8,
              u_shape: 0,
              u_offsetX: 0,
              u_offsetY: 0,
            },
            undefined,
            0.5
          )
        }
      } catch (e) {
        console.warn('[Nookweb] Shader bar unavailable:', e)
      }
    }

    loadShader()

    return () => {
      shaderMount.current?.dispose?.()
      shaderMount.current = null
    }
  }, [])

  return (
    <div
      className={className}
      style={{
        position: 'relative',
        width: '100%',
        height: `${height}px`,
        overflow: 'hidden',
        borderRadius: '100px',
        animation: 'scaleX .6s cubic-bezier(.23,1,.32,1) .12s both',
        transformOrigin: 'left',
        ...style,
      }}
    >
      <div
        ref={shaderRef}
        className="shader-bar-nookweb"
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '100px',
          overflow: 'hidden',
          pointerEvents: 'none',
        }}
      />
      {children && (
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: '50%',
            transform: 'translateY(-50%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
          }}
        >
          {children}
        </div>
      )}
    </div>
  )
}
