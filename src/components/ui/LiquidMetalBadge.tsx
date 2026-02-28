'use client'

import { useRef, useEffect } from 'react'

interface LiquidMetalBadgeProps {
  label: string
}

const WIDTH = 130
const HEIGHT = 46
const INNER_WIDTH = 126
const INNER_HEIGHT = 42

export function LiquidMetalBadge({ label }: LiquidMetalBadgeProps) {
  const shaderRef = useRef<HTMLDivElement>(null)
  const shaderMount = useRef<{ dispose: () => void; setSpeed?: (n?: number) => void } | null>(null)

  useEffect(() => {
    const styleId = 'shader-canvas-style-nookweb'
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style')
      style.id = styleId
      style.textContent = `
        .shader-container-nookweb canvas {
          width: 100% !important;
          height: 100% !important;
          display: block !important;
          position: absolute !important;
          top: 0 !important;
          left: 0 !important;
          border-radius: 100px !important;
        }
      `
      document.head.appendChild(style)
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
              u_repetition: 4,
              u_softness: 0.5,
              u_shiftRed: 0.3,
              u_shiftBlue: 0.3,
              u_distortion: 0,
              u_contour: 0,
              u_angle: 45,
              u_scale: 8,
              u_shape: 1,
              u_offsetX: 0.1,
              u_offsetY: -0.1,
            },
            undefined,
            0.6
          )
        }
      } catch (e) {
        console.warn('[Nookweb] Shader badge unavailable, using fallback:', e)
      }
    }

    loadShader()

    return () => {
      shaderMount.current?.dispose?.()
      shaderMount.current = null
    }
  }, [])

  return (
    <div style={{ perspective: '1000px', perspectiveOrigin: '50% 50%' }}>
      <div
        style={{
          position: 'relative',
          width: `${WIDTH}px`,
          height: `${HEIGHT}px`,
          transformStyle: 'preserve-3d',
          pointerEvents: 'none',
          cursor: 'default',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: `${WIDTH}px`,
            height: `${HEIGHT}px`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transformStyle: 'preserve-3d',
            transform: 'translateZ(20px)',
            zIndex: 30,
            pointerEvents: 'none',
          }}
        >
          <span
            style={{
              fontSize: '14px',
              color: '#e8e8e8',
              fontWeight: 500,
              textShadow: '0 1px 2px rgba(0,0,0,0.6), 0 0 1px rgba(0,0,0,0.8)',
              whiteSpace: 'nowrap',
              textTransform: 'uppercase',
            }}
          >
            {label}
          </span>
        </div>

        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: `${WIDTH}px`,
            height: `${HEIGHT}px`,
            transformStyle: 'preserve-3d',
            transform: 'translateZ(10px)',
            zIndex: 20,
          }}
        >
          <div
            style={{
              width: `${INNER_WIDTH}px`,
              height: `${INNER_HEIGHT}px`,
              margin: '2px',
              borderRadius: '100px',
              background: 'linear-gradient(180deg, #202020 0%, #000000 100%)',
            }}
          />
        </div>

        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: `${WIDTH}px`,
            height: `${HEIGHT}px`,
            transformStyle: 'preserve-3d',
            transform: 'translateZ(0px)',
            zIndex: 10,
          }}
        >
          <div
            style={{
              height: `${HEIGHT}px`,
              width: `${WIDTH}px`,
              borderRadius: '100px',
              boxShadow:
                '0px 0px 0px 1px rgba(0, 0, 0, 0.3), 0px 36px 14px 0px rgba(0, 0, 0, 0.02), 0px 20px 12px 0px rgba(0, 0, 0, 0.08), 0px 9px 9px 0px rgba(0, 0, 0, 0.12), 0px 2px 5px 0px rgba(0, 0, 0, 0.15)',
              background: 'transparent',
            }}
          >
            <div
              ref={shaderRef}
              className="shader-container-nookweb"
              style={{
                borderRadius: '100px',
                overflow: 'hidden',
                position: 'relative',
                width: `${WIDTH}px`,
                maxWidth: `${WIDTH}px`,
                height: `${HEIGHT}px`,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
