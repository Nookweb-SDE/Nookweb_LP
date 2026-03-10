/* Flowing rays light — versão leve com animações, sem feTurbulence */

export function FlowingRaysBackgroundLight() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1200 800"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <radialGradient id="mh-light-neon1" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.95)" />
            <stop offset="40%" stopColor="rgba(251,146,60,0.9)" />
            <stop offset="100%" stopColor="rgba(249,115,22,0)" />
          </radialGradient>
          <radialGradient id="mh-light-neon2" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(251,146,60,0.9)" />
            <stop offset="60%" stopColor="rgba(234,88,12,0.5)" />
            <stop offset="100%" stopColor="rgba(234,88,12,0)" />
          </radialGradient>
          <radialGradient id="mh-light-glow" cx="30%" cy="50%" r="70%">
            <stop offset="0%" stopColor="rgba(249,115,22,0.12)" />
            <stop offset="50%" stopColor="rgba(251,146,60,0.06)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0)" />
          </radialGradient>
          <linearGradient id="mh-light-thread1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(0,0,0,0.9)" />
            <stop offset="20%" stopColor="rgba(249,115,22,0.6)" />
            <stop offset="80%" stopColor="rgba(249,115,22,0.6)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0.9)" />
          </linearGradient>
          <linearGradient id="mh-light-thread2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(0,0,0,0.9)" />
            <stop offset="20%" stopColor="rgba(251,146,60,0.5)" />
            <stop offset="80%" stopColor="rgba(251,146,60,0.5)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0.9)" />
          </linearGradient>
          <filter id="mh-light-blur" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="10" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
            </feMerge>
          </filter>
          <filter id="mh-light-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <g>
          {/* Elipse suave de fundo */}
          <ellipse cx="350" cy="400" rx="450" ry="250" fill="url(#mh-light-glow)" filter="url(#mh-light-blur)" opacity="0.7" />

          {/* 8 raios animados — leve e elegante */}
          <path id="r1" d="M50 720 Q250 600 450 550 Q650 500 850 520 Q1050 540 1200 400" stroke="url(#mh-light-thread1)" strokeWidth="1" fill="none" opacity="0.7" />
          <circle r="2.5" fill="url(#mh-light-neon1)" filter="url(#mh-light-glow)">
            <animateMotion dur="4.5s" repeatCount="indefinite"><mpath href="#r1" /></animateMotion>
          </circle>

          <path id="r2" d="M100 740 Q300 620 500 570 Q700 520 900 540 Q1100 560 1250 420" stroke="url(#mh-light-thread2)" strokeWidth="1.2" fill="none" opacity="0.6" />
          <circle r="2" fill="url(#mh-light-neon2)" filter="url(#mh-light-glow)">
            <animateMotion dur="5.2s" repeatCount="indefinite"><mpath href="#r2" /></animateMotion>
          </circle>

          <path id="r3" d="M30 700 Q200 580 380 530 Q560 480 750 500 Q940 520 1200 380" stroke="url(#mh-light-thread1)" strokeWidth="0.8" fill="none" opacity="0.6" />
          <circle r="1.8" fill="url(#mh-light-neon1)" filter="url(#mh-light-glow)">
            <animateMotion dur="5.8s" repeatCount="indefinite"><mpath href="#r3" /></animateMotion>
          </circle>

          <path id="r4" d="M80 730 Q280 640 480 590 Q680 540 880 560 Q1080 580 1220 440" stroke="url(#mh-light-thread2)" strokeWidth="1" fill="none" opacity="0.5" />
          <circle r="2.2" fill="url(#mh-light-neon2)" filter="url(#mh-light-glow)">
            <animateMotion dur="4.2s" repeatCount="indefinite"><mpath href="#r4" /></animateMotion>
          </circle>

          <path id="r5" d="M150 735 Q350 650 550 600 Q750 550 950 570 Q1150 590 1280 450" stroke="url(#mh-light-thread1)" strokeWidth="0.9" fill="none" opacity="0.6" />
          <circle r="2" fill="url(#mh-light-neon1)" filter="url(#mh-light-glow)">
            <animateMotion dur="5.5s" repeatCount="indefinite"><mpath href="#r5" /></animateMotion>
          </circle>

          <path id="r6" d="M60 710 Q240 590 420 540 Q600 490 790 510 Q980 530 1180 390" stroke="url(#mh-light-thread2)" strokeWidth="1.1" fill="none" opacity="0.5" />
          <circle r="2.4" fill="url(#mh-light-neon2)" filter="url(#mh-light-glow)">
            <animateMotion dur="4.8s" repeatCount="indefinite"><mpath href="#r6" /></animateMotion>
          </circle>

          <path id="r7" d="M120 725 Q320 630 520 580 Q720 530 920 550 Q1120 570 1240 430" stroke="url(#mh-light-thread1)" strokeWidth="0.7" fill="none" opacity="0.5" />
          <circle r="1.5" fill="url(#mh-light-neon1)" filter="url(#mh-light-glow)">
            <animateMotion dur="6s" repeatCount="indefinite"><mpath href="#r7" /></animateMotion>
          </circle>

          <path id="r8" d="M40 715 Q220 600 400 550 Q580 500 770 520 Q960 540 1160 400" stroke="url(#mh-light-thread2)" strokeWidth="1" fill="none" opacity="0.6" />
          <circle r="2.1" fill="url(#mh-light-neon2)" filter="url(#mh-light-glow)">
            <animateMotion dur="4.5s" repeatCount="indefinite"><mpath href="#r8" /></animateMotion>
          </circle>
        </g>
      </svg>
    </div>
  );
}
