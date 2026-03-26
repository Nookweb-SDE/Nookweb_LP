import { lazy, Suspense } from 'react'
import nookwebN from '@/assets/nookweb-logo-n.svg'

const LiquidMetal = lazy(() =>
  import('@paper-design/shaders-react').then((m) => ({ default: m.LiquidMetal }))
)

interface NookwebLogoProps {
  isScrolled: boolean
  overDark: boolean
}

export function NookwebLogo({ isScrolled, overDark }: NookwebLogoProps) {
  const textColor = overDark ? 'text-white' : 'text-heavy'

  return (
    <span className="inline-flex items-baseline gap-0">
      {/* "N" with liquid metal shader — Netflix-style large N */}
      <span
        className="relative inline-block shrink-0"
        style={{
          width: '28px',
          height: '32px',
          marginRight: '-9px',
          verticalAlign: 'baseline',
          top: '4.5px',
        }}
      >
        <span
          className="absolute inset-0"
          style={{
            WebkitMaskImage: `url(${nookwebN})`,
            WebkitMaskSize: 'contain',
            WebkitMaskRepeat: 'no-repeat',
            WebkitMaskPosition: 'center',
            maskImage: `url(${nookwebN})`,
            maskSize: 'contain',
            maskRepeat: 'no-repeat',
            maskPosition: 'center',
          }}
        >
          <Suspense
            fallback={
              <span className={`block w-full h-full ${overDark ? 'bg-white' : 'bg-black'}`} />
            }
          >
            <LiquidMetal
              repetition={4}
              softness={0.5}
              shiftRed={0.3}
              shiftBlue={0.3}
              distortion={0}
              contour={0}
              angle={45}
              scale={8}
              shape={1}
              offsetX={0.1}
              offsetY={-0.1}
              speed={0.6}
              minPixelRatio={8}
              style={{ width: '100%', height: '100%', display: 'block' }}
            />
          </Suspense>
        </span>
      </span>

      {/* "OOKWEB®" in same mono font as header */}
      <span
        className={`font-mono text-[17px] md:text-[19px] font-semibold uppercase tracking-[0.08em] transition-colors duration-500 ${textColor}`}
      >
        OOKWEB
      </span>
    </span>
  )
}
