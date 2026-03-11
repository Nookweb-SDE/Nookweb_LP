'use client'

import { useState, useRef, useEffect } from 'react'

interface LiquidMetalIconButtonProps {
  label: string
  onClick?: () => void
  disabled?: boolean
  highlighted?: boolean
}

export function LiquidMetalIconButton({
  label,
  onClick,
  disabled = false,
  highlighted = false,
}: LiquidMetalIconButtonProps) {
  const SIZE = 36
  const INNER = 32
  const TRANSLATE_Z = 14

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
        console.warn('[Nookweb] Shader unavailable:', e)
      }
    }

    loadShader()
    return () => {
      shaderMount.current?.dispose?.()
      shaderMount.current = null
    }
  }, [])

  const handleMouseEnter = () => {
    if (disabled) return
    setIsHovered(true)
    shaderMount.current?.setSpeed?.(1)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    setIsPressed(false)
    shaderMount.current?.setSpeed?.(0.6)
  }

  const handleClick = () => {
    if (disabled) return
    shaderMount.current?.setSpeed?.(2.4)
    setTimeout(() => shaderMount.current?.setSpeed?.(0.6), 300)
    onClick?.()
  }

  return (
    <div style={{ perspective: '1000px', perspectiveOrigin: '50% 50%' }}>
      <div
        style={{
          position: 'relative',
          width: `${SIZE}px`,
          height: `${SIZE}px`,
          transformStyle: 'preserve-3d',
          transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
          opacity: disabled ? 0.35 : 1,
        }}
      >
        {/* Label layer */}
        <div
          style={{
            position: 'absolute',
            top: 0, left: 0,
            width: `${SIZE}px`,
            height: `${SIZE}px`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transformStyle: 'preserve-3d',
            transform: `translateZ(${TRANSLATE_Z}px)`,
            zIndex: 30,
            pointerEvents: 'none',
          }}
        >
          <span
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '14px',
              fontWeight: 500,
              color: highlighted ? '#FF4500' : '#e8e8e8',
              lineHeight: 1,
              textShadow: '0 1px 2px rgba(0,0,0,0.6), 0 0 1px rgba(0,0,0,0.8)',
              userSelect: 'none',
            }}
          >
            {label}
          </span>
        </div>

        {/* Dark inner pill */}
        <div
          style={{
            position: 'absolute',
            top: 0, left: 0,
            width: `${SIZE}px`,
            height: `${SIZE}px`,
            transformStyle: 'preserve-3d',
            transform: `translateZ(10px) ${isPressed ? 'translateY(1px) scale(0.97)' : 'translateY(0) scale(1)'}`,
            zIndex: 20,
          }}
        >
          <div
            style={{
              width: `${INNER}px`,
              height: `${INNER}px`,
              margin: '2px',
              borderRadius: '100px',
              background: 'linear-gradient(180deg, #202020 0%, #000000 100%)',
              boxShadow: isPressed ? 'inset 0px 2px 4px rgba(0,0,0,0.4)' : 'none',
            }}
          />
        </div>

        {/* Shader shell */}
        <div
          style={{
            position: 'absolute',
            top: 0, left: 0,
            width: `${SIZE}px`,
            height: `${SIZE}px`,
            transformStyle: 'preserve-3d',
            transform: `translateZ(0px) ${isPressed ? 'translateY(1px) scale(0.97)' : 'translateY(0) scale(1)'}`,
            zIndex: 10,
          }}
        >
          <div
            style={{
              height: `${SIZE}px`,
              width: `${SIZE}px`,
              borderRadius: '100px',
              boxShadow: isPressed
                ? '0px 0px 0px 1px rgba(0,0,0,0.5), 0px 1px 2px rgba(0,0,0,0.3)'
                : isHovered
                  ? '0px 0px 0px 1px rgba(0,0,0,0.4), 0px 8px 5px rgba(0,0,0,0.1), 0px 4px 4px rgba(0,0,0,0.15)'
                  : '0px 0px 0px 1px rgba(0,0,0,0.3), 0px 9px 9px rgba(0,0,0,0.12), 0px 2px 5px rgba(0,0,0,0.15)',
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
                width: `${SIZE}px`,
                height: `${SIZE}px`,
              }}
            />
          </div>
        </div>

        {/* Clickable overlay */}
        <button
          type="button"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onMouseDown={() => !disabled && setIsPressed(true)}
          onMouseUp={() => setIsPressed(false)}
          onClick={handleClick}
          disabled={disabled}
          aria-label={label}
          style={{
            position: 'absolute',
            top: 0, left: 0,
            width: `${SIZE}px`,
            height: `${SIZE}px`,
            background: 'transparent',
            border: 'none',
            cursor: disabled ? 'default' : 'pointer',
            padding: 0,
            zIndex: 40,
            transformStyle: 'preserve-3d',
            transform: `translateZ(${TRANSLATE_Z + 5}px)`,
            borderRadius: '100px',
          }}
        />
      </div>
    </div>
  )
}
