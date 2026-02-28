'use client'

import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'

interface LiquidMetalButtonProps {
  label?: string
  to?: string
  href?: string
  onClick?: () => void
}

const WIDTH = 142
const HEIGHT = 46
const INNER_WIDTH = 138
const INNER_HEIGHT = 42

export function LiquidMetalButton({
  label = 'Iniciar Projeto',
  to = '/contato',
  href,
  onClick,
}: LiquidMetalButtonProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isPressed, setIsPressed] = useState(false)
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
        console.warn('[Nookweb] Shader unavailable, using fallback:', e)
      }
    }

    loadShader()

    return () => {
      shaderMount.current?.dispose?.()
      shaderMount.current = null
    }
  }, [])

  const handleMouseEnter = () => {
    setIsHovered(true)
    shaderMount.current?.setSpeed?.(1)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    setIsPressed(false)
    shaderMount.current?.setSpeed?.(0.6)
  }

  const handleClick = () => {
    shaderMount.current?.setSpeed?.(2.4)
    setTimeout(() => shaderMount.current?.setSpeed?.(0.6), 300)
    onClick?.()
  }

  const content = (
    <div style={{ perspective: '1000px', perspectiveOrigin: '50% 50%' }}>
      <div
        style={{
          position: 'relative',
          width: `${WIDTH}px`,
          height: `${HEIGHT}px`,
          transformStyle: 'preserve-3d',
          transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
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
            gap: '6px',
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
            }}
          >
            {label}
          </span>
          <svg width="14" height="14" fill="none" stroke="#e8e8e8" strokeWidth="2" viewBox="0 0 24 24" style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.5))' }}>
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </div>

        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: `${WIDTH}px`,
            height: `${HEIGHT}px`,
            transformStyle: 'preserve-3d',
            transform: `translateZ(10px) ${isPressed ? 'translateY(1px) scale(0.98)' : 'translateY(0) scale(1)'}`,
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
              boxShadow: isPressed
                ? 'inset 0px 2px 4px rgba(0, 0, 0, 0.4), inset 0px 1px 2px rgba(0, 0, 0, 0.3)'
                : 'none',
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
            transform: `translateZ(0px) ${isPressed ? 'translateY(1px) scale(0.98)' : 'translateY(0) scale(1)'}`,
            zIndex: 10,
          }}
        >
          <div
            style={{
              height: `${HEIGHT}px`,
              width: `${WIDTH}px`,
              borderRadius: '100px',
              boxShadow: isPressed
                ? '0px 0px 0px 1px rgba(0, 0, 0, 0.5), 0px 1px 2px 0px rgba(0, 0, 0, 0.3)'
                : isHovered
                  ? '0px 0px 0px 1px rgba(0, 0, 0, 0.4), 0px 12px 6px 0px rgba(0, 0, 0, 0.05), 0px 8px 5px 0px rgba(0, 0, 0, 0.1), 0px 4px 4px 0px rgba(0, 0, 0, 0.15), 0px 1px 2px 0px rgba(0, 0, 0, 0.2)'
                  : '0px 0px 0px 1px rgba(0, 0, 0, 0.3), 0px 36px 14px 0px rgba(0, 0, 0, 0.02), 0px 20px 12px 0px rgba(0, 0, 0, 0.08), 0px 9px 9px 0px rgba(0, 0, 0, 0.12), 0px 2px 5px 0px rgba(0, 0, 0, 0.15)',
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

        {to || href ? (
          <div
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onMouseDown={() => setIsPressed(true)}
            onMouseUp={() => setIsPressed(false)}
            onClick={handleClick}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: `${WIDTH}px`,
              height: `${HEIGHT}px`,
              background: 'transparent',
              cursor: 'pointer',
              zIndex: 40,
              transformStyle: 'preserve-3d',
              transform: 'translateZ(25px)',
              borderRadius: '100px',
            }}
            aria-hidden
          />
        ) : (
          <button
            type="button"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onMouseDown={() => setIsPressed(true)}
            onMouseUp={() => setIsPressed(false)}
            onClick={handleClick}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: `${WIDTH}px`,
              height: `${HEIGHT}px`,
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              zIndex: 40,
              transformStyle: 'preserve-3d',
              transform: 'translateZ(25px)',
              borderRadius: '100px',
            }}
            aria-label={label}
          />
        )}
      </div>
    </div>
  )

  if (to) {
    return (
      <Link to={to} className="inline-block" style={{ textDecoration: 'none' }}>
        {content}
      </Link>
    )
  }
  if (href) {
    return (
      <a href={href} className="inline-block" style={{ textDecoration: 'none' }}>
        {content}
      </a>
    )
  }
  return <div className="inline-block">{content}</div>
}
