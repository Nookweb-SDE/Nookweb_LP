'use client'

import { useState, useRef, useEffect, useCallback, type MouseEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'

interface LiquidMetalButtonProps {
  label?: string
  to?: string
  href?: string
  onClick?: () => void
  /** 'compact' = cards | 'default' = header | 'wide' = footer | 'large' = CTAs */
  size?: 'compact' | 'default' | 'wide' | 'large'
  textStyle?: 'default' | 'mono'
}

const SIZES = {
  compact: { width: 128, height: 42, innerWidth: 124, innerHeight: 38, fontSize: 12, translateZ: 18 },
  default: { width: 148, height: 46, innerWidth: 144, innerHeight: 42, fontSize: 14, translateZ: 20 },
  wide: { width: 178, height: 46, innerWidth: 174, innerHeight: 42, fontSize: 14, translateZ: 20 },
  large: { width: 260, height: 58, innerWidth: 254, innerHeight: 54, fontSize: 15, translateZ: 24 },
} as const

export function LiquidMetalButton({
  label = 'Iniciar Projeto',
  to = '/contato',
  href,
  onClick,
  size = 'default',
  textStyle = 'default',
}: LiquidMetalButtonProps) {
  const navigate = useNavigate()
  const { width, height, innerWidth, innerHeight, fontSize, translateZ } = SIZES[size]
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
        .shader-container-nookweb {
          pointer-events: none !important;
        }
        .shader-container-nookweb canvas {
          width: 100% !important;
          height: 100% !important;
          display: block !important;
          position: absolute !important;
          top: 0 !important;
          left: 0 !important;
          border-radius: 100px !important;
          pointer-events: none !important;
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

  const runClickFeedback = useCallback(() => {
    shaderMount.current?.setSpeed?.(2.4)
    setTimeout(() => shaderMount.current?.setSpeed?.(0.6), 300)
  }, [])

  const handleStandaloneClick = () => {
    runClickFeedback()
    onClick?.()
  }

  const handleLinkClick = useCallback(
    (e: MouseEvent<HTMLAnchorElement>) => {
      runClickFeedback()
      onClick?.()
      e.preventDefault()
      navigate(to)
    },
    [navigate, onClick, runClickFeedback, to]
  )

  const handleHrefClick = useCallback(
    (e: MouseEvent<HTMLAnchorElement>) => {
      if (!href) return
      runClickFeedback()
      onClick?.()
      e.preventDefault()
      window.open(href, '_blank', 'noopener,noreferrer')
    },
    [href, onClick, runClickFeedback]
  )

  /** Apenas camadas visuais + overlay invisível para modo botão (sem to/href) */
  const renderStack = (withStandaloneHitLayer: boolean) => (
    <div style={{ perspective: '1000px', perspectiveOrigin: '50% 50%' }}>
      <div
        style={{
          position: 'relative',
          width: `${width}px`,
          height: `${height}px`,
          transformStyle: 'preserve-3d',
          transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: `${width}px`,
            height: `${height}px`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transformStyle: 'preserve-3d',
            transform: `translateZ(${translateZ}px)`,
            zIndex: 30,
            pointerEvents: 'none',
          }}
        >
          <span
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: `${fontSize}px`,
              fontWeight: 500,
              color: '#e8e8e8',
              lineHeight: 1,
              letterSpacing: '0.01em',
              textAlign: 'center',
              textShadow: '0 1px 2px rgba(0,0,0,0.6), 0 0 1px rgba(0,0,0,0.8)',
              whiteSpace: 'nowrap',
              ...(textStyle === 'mono'
                ? {
                    fontFamily: "'Space Mono', monospace",
                    fontSize: `${Math.max(10, fontSize - 2)}px`,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase' as const,
                  }
                : {}),
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
            width: `${width}px`,
            height: `${height}px`,
            transformStyle: 'preserve-3d',
            transform: `translateZ(10px) ${isPressed ? 'translateY(1px) scale(0.98)' : 'translateY(0) scale(1)'}`,
            zIndex: 20,
            pointerEvents: 'none',
          }}
        >
          <div
            style={{
              width: `${innerWidth}px`,
              height: `${innerHeight}px`,
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
            width: `${width}px`,
            height: `${height}px`,
            transformStyle: 'preserve-3d',
            transform: `translateZ(0px) ${isPressed ? 'translateY(1px) scale(0.98)' : 'translateY(0) scale(1)'}`,
            zIndex: 10,
            pointerEvents: 'none',
          }}
        >
          <div
            style={{
              height: `${height}px`,
              width: `${width}px`,
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
                width: `${width}px`,
                maxWidth: `${width}px`,
                height: `${height}px`,
                pointerEvents: 'none',
              }}
            />
          </div>
        </div>

        {withStandaloneHitLayer ? (
          <button
            type="button"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onMouseDown={() => setIsPressed(true)}
            onMouseUp={() => setIsPressed(false)}
            onClick={handleStandaloneClick}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: `${width}px`,
              height: `${height}px`,
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              zIndex: 40,
              transformStyle: 'preserve-3d',
              transform: `translateZ(${translateZ + 5}px)`,
              borderRadius: '100px',
            }}
            aria-label={label}
          />
        ) : (
          /* Hit layer for Link/anchor wrapping — ensures clicks reach the parent <a> */
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: `${width}px`,
              height: `${height}px`,
              zIndex: 40,
              cursor: 'pointer',
              borderRadius: '100px',
            }}
          />
        )}
      </div>
    </div>
  )

  const linkStyle = { textDecoration: 'none' as const, cursor: 'pointer' as const }

  if (href) {
    return (
      <a
        href={href}
        className="inline-block"
        style={linkStyle}
        onClick={handleHrefClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
      >
        {renderStack(false)}
      </a>
    )
  }
  if (to) {
    return (
      <Link
        to={to}
        className="inline-block"
        style={linkStyle}
        onClick={handleLinkClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
      >
        {renderStack(false)}
      </Link>
    )
  }

  return <div className="inline-block">{renderStack(true)}</div>
}
