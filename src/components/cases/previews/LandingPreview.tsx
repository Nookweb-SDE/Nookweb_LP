/* ═══════════════════════════════════════════════
   LANDING PREVIEW — Sites de Alto Impacto
   Inspirado em v0-foodie-wagon
   Vortex Capital, Bloom Botanica
═══════════════════════════════════════════════ */

import { ArrowRight } from "lucide-react";
import type { CasePreviewData, CaseSection } from "@/data/casePreviews";

interface Props { data: CasePreviewData }

function NavBar({ s, p }: { s: Extract<CaseSection, { type: "nav" }>; p: CasePreviewData["palette"] }) {
  return (
    <header style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "12px 20px", borderBottom: `1px solid ${p.border}`,
      background: p.card,
    }}>
      <span style={{ fontWeight: 700, fontSize: "18px", color: p.accent, fontFamily: "'Instrument Serif',serif" }}>{s.logo}</span>
      <nav style={{ display: "flex", gap: "20px" }}>
        {s.links.map(l => (
          <span key={l} style={{ fontSize: "14px", color: p.textMuted, fontFamily: "'DM Sans',sans-serif" }}>{l}</span>
        ))}
      </nav>
      {s.ctaText && (
        <span style={{
          fontSize: "13px", background: p.accent, color: p.bg,
          padding: "8px 16px", borderRadius: "8px", fontWeight: 600,
          fontFamily: "'DM Sans',sans-serif",
        }}>{s.ctaText}</span>
      )}
    </header>
  );
}

function HeroBlock({ s, p }: { s: Extract<CaseSection, { type: "hero" }>; p: CasePreviewData["palette"] }) {
  const isDark = p.bg.startsWith("#0") || p.bg.startsWith("rgb(0");
  return (
    <section style={{
      position: "relative", minHeight: "320px", display: "flex", alignItems: "center",
      padding: "28px 24px", background: s.bgGradient, overflow: "hidden",
    }}>
      {/* Orbs — Foodie style */}
      <div style={{
        position: "absolute", top: "20%", left: "8%",
        width: "120px", height: "120px", borderRadius: "50%",
        background: p.accent, opacity: 0.15, filter: "blur(40px)",
      }} />
      <div style={{
        position: "absolute", bottom: "20%", right: "8%",
        width: "140px", height: "140px", borderRadius: "50%",
        background: p.accent, opacity: 0.1, filter: "blur(50px)",
      }} />
      <div style={{
        position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
        width: "160px", height: "160px", borderRadius: "50%",
        background: p.accent, opacity: 0.06, filter: "blur(60px)",
      }} />

      <div style={{
        display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px",
        alignItems: "center", maxWidth: "900px", margin: "0 auto", width: "100%",
      }}>
        {/* Left — conteúdo */}
        <div style={{ position: "relative", zIndex: 1 }}>
          <h1 style={{
            fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 700, color: p.text,
            fontFamily: "'Instrument Serif',serif", lineHeight: "1.15",
            marginBottom: "12px", letterSpacing: "-0.02em",
          }}>{s.title}</h1>
          <p style={{
            fontSize: "15px", color: p.textMuted, fontFamily: "'DM Sans',sans-serif",
            lineHeight: "1.6", marginBottom: "20px",
          }}>{s.subtitle}</p>
          {s.ctaText && (
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <span style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                background: p.accent, color: isDark ? "#000" : "#FFF",
                padding: "12px 20px", borderRadius: "8px", fontSize: "14px", fontWeight: 600,
                fontFamily: "'DM Sans',sans-serif",
                boxShadow: `0 4px 14px ${p.accentSoft}`,
              }}>
                {s.ctaText}
              </span>
              <span style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                border: `2px solid ${p.accent}`, color: p.accent,
                padding: "10px 18px", borderRadius: "8px", fontSize: "14px", fontWeight: 600,
                fontFamily: "'DM Sans',sans-serif",
              }}>
                Ver mais
                <ArrowRight size={18} />
              </span>
            </div>
          )}
          {s.metrics && (
            <div style={{
              display: "flex", gap: "32px", marginTop: "28px", paddingTop: "24px",
              borderTop: `1px solid ${p.border}`,
            }}>
              {s.metrics.map((m, i) => (
                <div key={i}>
                  <div style={{ fontSize: "24px", fontWeight: 700, color: p.accent, fontFamily: "'DM Sans',sans-serif" }}>{m.value}</div>
                  <div style={{ fontSize: "12px", color: p.textMuted, fontFamily: "'DM Sans',sans-serif", marginTop: "2px" }}>{m.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right — hero visual (Foodie: produto/decorativo) */}
        <div style={{
          position: "relative", zIndex: 1,
          display: "flex", alignItems: "center", justifyContent: "center",
          height: "200px",
        }}>
          <div
            className="animate-case-float"
            style={{
              width: "140px", height: "140px", borderRadius: "20px",
              background: `linear-gradient(135deg, ${p.accent}40, ${p.accentSoft})`,
              border: `2px solid ${p.accent}50`,
              boxShadow: `0 0 60px ${p.accentSoft}, inset 0 0 40px ${p.accentSoft}`,
            }}
          />
        </div>
      </div>
    </section>
  );
}

function KpiCards({ s, p }: { s: Extract<CaseSection, { type: "kpi" }>; p: CasePreviewData["palette"] }) {
  return (
    <div style={{
      display: "grid", gridTemplateColumns: `repeat(${Math.min(s.items.length, 4)}, 1fr)`,
      gap: "16px", padding: "24px",
    }}>
      {s.items.map((item, i) => (
        <div key={i} style={{
          background: p.card, border: `1px solid ${p.border}`,
          borderRadius: "12px", padding: "20px", textAlign: "center",
        }}>
          <div style={{ fontSize: "12px", color: p.textMuted, fontFamily: "'DM Sans',sans-serif", marginBottom: "8px" }}>{item.label}</div>
          <div style={{ fontSize: "22px", fontWeight: 700, color: p.text, fontFamily: "'DM Sans',sans-serif" }}>{item.value}</div>
          {item.change && <div style={{ fontSize: "13px", color: item.changeColor || p.accent, marginTop: "6px", fontWeight: 600 }}>{item.change}</div>}
        </div>
      ))}
    </div>
  );
}

function MetricsRow({ s, p }: { s: Extract<CaseSection, { type: "metrics" }>; p: CasePreviewData["palette"] }) {
  return (
    <div style={{
      display: "flex", justifyContent: "center", gap: "48px",
      padding: "28px", background: p.card, borderTop: `1px solid ${p.border}`,
    }}>
      {s.items.map((item, i) => (
        <div key={i} style={{ textAlign: "center" }}>
          <div style={{ fontSize: "24px", fontWeight: 700, color: item.color || p.accent, fontFamily: "'DM Sans',sans-serif" }}>{item.value}</div>
          <div style={{ fontSize: "13px", color: p.textMuted, fontFamily: "'DM Sans',sans-serif", marginTop: "4px" }}>{item.label}</div>
        </div>
      ))}
    </div>
  );
}

function FeaturesBlock({ s, p }: { s: Extract<CaseSection, { type: "features" }>; p: CasePreviewData["palette"] }) {
  return (
    <div style={{ padding: "32px" }}>
      {s.title && <div style={{ fontSize: "20px", fontWeight: 700, color: p.text, marginBottom: "20px", fontFamily: "'Instrument Serif',serif" }}>{s.title}</div>}
      <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
        {s.items.map((item, i) => (
          <div key={i} style={{
            display: "flex", gap: "16px", background: p.card,
            border: `1px solid ${p.border}`, borderRadius: "12px",
            padding: "18px 20px", alignItems: "flex-start",
          }}>
            <span style={{ fontSize: "22px", flexShrink: 0 }}>{item.icon}</span>
            <div>
              <div style={{ fontSize: "15px", fontWeight: 600, color: p.text, fontFamily: "'DM Sans',sans-serif" }}>{item.title}</div>
              <div style={{ fontSize: "13px", color: p.textMuted, fontFamily: "'DM Sans',sans-serif", lineHeight: "1.5", marginTop: "6px" }}>{item.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CardsGrid({ s, p }: { s: Extract<CaseSection, { type: "cards" }>; p: CasePreviewData["palette"] }) {
  const cols = Math.min(s.items.length, 3);
  return (
    <div style={{ padding: "32px" }}>
      {s.title && <div style={{ fontSize: "20px", fontWeight: 700, color: p.text, marginBottom: "20px", fontFamily: "'Instrument Serif',serif" }}>{s.title}</div>}
      <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: "20px" }}>
        {s.items.map((item, i) => (
          <div key={i} style={{
            background: p.card, border: `1px solid ${p.border}`,
            borderRadius: "12px", overflow: "hidden",
          }}>
            <div style={{ height: "100px", background: item.gradient, display: "flex", alignItems: "center", justifyContent: "center" }}>
              {item.badge && <span style={{ fontSize: "14px", color: p.text, fontWeight: 600, background: "rgba(255,255,255,0.9)", padding: "6px 12px", borderRadius: "8px" }}>{item.badge}</span>}
            </div>
            <div style={{ padding: "18px" }}>
              <div style={{ fontSize: "15px", fontWeight: 600, color: p.text, fontFamily: "'DM Sans',sans-serif" }}>{item.title}</div>
              {item.price && <div style={{ fontSize: "20px", fontWeight: 700, color: p.accent, fontFamily: "'DM Sans',sans-serif", marginTop: "8px" }}>{item.price}</div>}
              <div style={{ fontSize: "13px", color: p.textMuted, fontFamily: "'DM Sans',sans-serif", marginTop: "6px" }}>{item.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TestimonialBlock({ s, p }: { s: Extract<CaseSection, { type: "testimonial" }>; p: CasePreviewData["palette"] }) {
  return (
    <div style={{ padding: "32px" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
        {s.items.map((item, i) => (
          <div key={i} style={{
            background: p.card, border: `1px solid ${p.border}`,
            borderRadius: "14px", padding: "24px 28px",
          }}>
            <div style={{ display: "flex", gap: "4px", marginBottom: "14px" }}>
              {Array.from({ length: item.stars }).map((_, si) => (
                <span key={si} style={{ fontSize: "16px", color: p.accent }}>★</span>
              ))}
            </div>
            <div style={{ fontSize: "15px", color: p.text, fontFamily: "'DM Sans',sans-serif", lineHeight: "1.6", fontStyle: "italic" }}>"{item.quote}"</div>
            <div style={{ marginTop: "16px", display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{
                width: "36px", height: "36px", borderRadius: "50%",
                background: `linear-gradient(135deg, ${p.accent}, ${p.accentSoft})`,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <span style={{ fontSize: "14px", color: p.bg, fontWeight: 700 }}>{item.author[0]}</span>
              </div>
              <div>
                <div style={{ fontSize: "14px", fontWeight: 600, color: p.text }}>{item.author}</div>
                <div style={{ fontSize: "12px", color: p.textMuted }}>{item.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function RenderSection({ section, palette }: { section: CaseSection; palette: CasePreviewData["palette"] }) {
  switch (section.type) {
    case "nav":          return <NavBar s={section} p={palette} />;
    case "hero":         return <HeroBlock s={section} p={palette} />;
    case "kpi":          return <KpiCards s={section} p={palette} />;
    case "metrics":      return <MetricsRow s={section} p={palette} />;
    case "features":     return <FeaturesBlock s={section} p={palette} />;
    case "cards":        return <CardsGrid s={section} p={palette} />;
    case "testimonial":  return <TestimonialBlock s={section} p={palette} />;
    default: return null;
  }
}

export function LandingPreview({ data }: Props) {
  return (
    <div style={{ background: data.palette.bg, minHeight: "600px", fontFamily: "'DM Sans',sans-serif" }}>
      {data.sections.map((section, i) => (
        <RenderSection key={i} section={section} palette={data.palette} />
      ))}
      <div style={{
        padding: "32px", textAlign: "center",
        borderTop: `1px solid ${data.palette.border}`,
      }}>
        <div style={{ fontSize: "20px", fontWeight: 700, color: data.palette.text, fontFamily: "'Instrument Serif',serif", marginBottom: "10px" }}>Pronto para começar?</div>
        <div style={{ fontSize: "14px", color: data.palette.textMuted, marginBottom: "20px" }}>Entre em contato e transforme sua ideia.</div>
        <span style={{
          display: "inline-block", background: data.palette.accent, color: data.palette.bg,
          padding: "12px 24px", borderRadius: "8px", fontSize: "14px", fontWeight: 600,
        }}>Fale conosco →</span>
      </div>
      <div style={{ height: "24px" }} />
    </div>
  );
}
