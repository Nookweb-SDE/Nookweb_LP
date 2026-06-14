import { useState, useRef, useCallback } from "react";

const BASE = "https://blackiceconfeccoes.com.br";

const SLIDES = [
  {
    type: "video" as const,
    src: `${BASE}/branding/slots/hero-carousel-slide-1.mp4`,
    poster: `${BASE}/branding/slots/hero-carousel-slide-1.png`,
  },
  { type: "image" as const, src: `${BASE}/branding/slots/hero-carousel-slide-2.png` },
  { type: "image" as const, src: `${BASE}/branding/slots/hero-carousel-slide-3.png` },
];

const HERO_H = 420;

export default function BlackIceIframePreview() {
  const [current, setCurrent] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const goTo = useCallback((idx: number) => {
    setCurrent((idx + SLIDES.length) % SLIDES.length);
    setTimeout(() => {
      if (videoRef.current && SLIDES[(idx + SLIDES.length) % SLIDES.length].type === "video") {
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch(() => {});
      }
    }, 50);
  }, []);

  const slide = SLIDES[current];

  return (
    <div style={{ width: "100%", height: "594px", overflow: "hidden", background: "#0a0a0a", position: "relative" }}>

      {/* ── Scrollable container ── */}
      <div
        ref={containerRef}
        style={{
          width: "100%",
          height: "100%",
          overflowY: "scroll",
          overflowX: "hidden",
          overscrollBehavior: "contain",
          scrollbarWidth: "thin",
          scrollbarColor: "rgba(255,69,0,0.3) transparent",
        } as React.CSSProperties}
        onWheel={e => e.stopPropagation()}
        onTouchMove={e => e.stopPropagation()}
      >
        {/* Hero carousel */}
        <div style={{ position: "relative", height: `${HERO_H}px`, overflow: "hidden", background: "#111" }}>

          {/* Anúncio top */}
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0, zIndex: 5,
            background: "rgba(0,0,0,0.75)", backdropFilter: "blur(4px)",
            padding: "5px 12px", textAlign: "center",
            fontFamily: "sans-serif", fontSize: "9px", color: "#fff", letterSpacing: "0.6px",
          }}>
            PAGUE COM PIX E GANHE 3% OFF À VISTA{" "}
            <span style={{ textDecoration: "underline" }}>COMPRAR AGORA</span>
          </div>

          {/* Slide */}
          {slide.type === "video" ? (
            <video
              ref={videoRef}
              key="slide-video"
              src={slide.src}
              poster={slide.poster}
              autoPlay muted loop playsInline
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          ) : (
            <img
              key={slide.src}
              src={slide.src}
              alt={`Black Ice slide ${current + 1}`}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          )}

          {/* Arrows */}
          {(["left", "right"] as const).map(dir => (
            <button
              key={dir}
              onClick={e => { e.stopPropagation(); goTo(current + (dir === "right" ? 1 : -1)); }}
              style={{
                position: "absolute", top: "50%", [dir]: "10px",
                transform: "translateY(-50%)", zIndex: 10,
                background: "rgba(255,255,255,0.15)", backdropFilter: "blur(4px)",
                border: "1px solid rgba(255,255,255,0.3)", borderRadius: "50%",
                width: "28px", height: "28px", display: "flex",
                alignItems: "center", justifyContent: "center",
                cursor: "pointer", color: "#fff", fontSize: "16px",
              }}
            >
              {dir === "left" ? "‹" : "›"}
            </button>
          ))}

          {/* Dots */}
          <div style={{
            position: "absolute", bottom: "10px", left: "50%", transform: "translateX(-50%)",
            display: "flex", gap: "5px", zIndex: 5,
          }}>
            {SLIDES.map((_, i) => (
              <button key={i} onClick={() => goTo(i)} style={{
                width: i === current ? "18px" : "5px", height: "5px",
                borderRadius: "3px", border: "none", cursor: "pointer", padding: 0,
                background: i === current ? "#fff" : "rgba(255,255,255,0.4)",
                transition: "all .3s",
              }} />
            ))}
          </div>
        </div>

        {/* Rest of the home page */}
        <img
          src="/blackice-rest.webp"
          alt="Black Ice — home"
          style={{ width: "100%", display: "block" }}
          loading="lazy"
        />
      </div>

      {/* Bottom fade */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: "60px",
        background: "linear-gradient(to top, #0a0a0a, transparent)",
        pointerEvents: "none", zIndex: 4,
      }} />
    </div>
  );
}
