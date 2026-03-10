/* ═══════════════════════════════════════════════
   FOODIE WAGON PREVIEW — Código extraído do v0
   Layout exato: header + hero com burger à direita
═══════════════════════════════════════════════ */

import { ArrowRight } from "lucide-react";
import { useState } from "react";

const P = {
  bg: "#0a0a0f",
  bgCard: "#14141a",
  accent: "#FBBF24",
  accentSoft: "rgba(251,191,36,0.15)",
  text: "#F5F5F0",
  textMuted: "#94a3b8",
  border: "rgba(251,191,36,0.12)",
  halalGreen: "#22c55e",
};

export function FoodieWagonPreview() {
  const [activeView, setActiveView] = useState<"pedido" | "cardapio" | "local">("pedido");

  return (
    <div style={{
      background: P.bg,
      minHeight: "420px",
      fontFamily: "'DM Sans',system-ui,sans-serif",
    }}>
      {/* ─── HERO ────────────────────────────────── */}
      <section style={{
        position: "relative",
        padding: "24px 16px 24px",
        overflow: "hidden",
      }}>
        {/* Glow atrás do burger */}
        <div style={{
          position: "absolute",
          top: "20%",
          right: "5%",
          width: "200px",
          height: "200px",
          borderRadius: "50%",
          background: P.accent,
          opacity: 0.12,
          filter: "blur(60px)",
        }} />
        <div style={{
          position: "absolute",
          bottom: "10%",
          right: "15%",
          width: "120px",
          height: "120px",
          borderRadius: "50%",
          background: P.accent,
          opacity: 0.08,
          filter: "blur(40px)",
        }} />

        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "16px",
          alignItems: "center",
          maxWidth: "100%",
          margin: "0 auto",
          position: "relative",
          zIndex: 1,
        }}>
          {/* Left: conteúdo */}
          <div>
            {/* Halal badge */}
            <div style={{
              display: "inline-flex",
              flexDirection: "column",
              alignItems: "center",
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              background: P.halalGreen,
              color: "#fff",
              fontSize: "6px",
              fontWeight: 700,
              justifyContent: "center",
              marginBottom: "12px",
              lineHeight: 1.1,
            }}>
              <span style={{ fontFamily: "serif", fontSize: "10px" }}>حلال</span>
              <span>HALAL</span>
            </div>

            {/* Título */}
            <h1 style={{
              fontSize: "clamp(22px, 4vw, 32px)",
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              margin: 0,
            }}>
              <span style={{ color: P.accent }}>HAMBURGUERIA</span>
              <br />
              <span style={{ color: P.text }}>PREMIUM</span>
            </h1>
            <p style={{
              fontSize: "11px",
              color: P.textMuted,
              marginTop: "4px",
              marginBottom: "8px",
              letterSpacing: "0.02em",
            }}>
              Onde o sabor chega até você
            </p>
            <p style={{
              fontSize: "10px",
              color: P.textMuted,
              lineHeight: 1.5,
              marginBottom: "12px",
              maxWidth: "280px",
            }}>
              Hamburgueres premium, frango frito crocante e currywurst autêntico – direto do food truck para você.
            </p>

            {/* CTAs */}
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              <button
                type="button"
                onClick={() => setActiveView("pedido")}
                style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                background: activeView === "pedido" ? P.accent : "transparent",
                color: activeView === "pedido" ? "#000" : P.accent,
                padding: "8px 14px",
                borderRadius: "6px",
                fontSize: "11px",
                fontWeight: 600,
                cursor: "pointer",
                boxShadow: `0 2px 10px ${P.accentSoft}`,
                border: `1px solid ${P.accent}`,
                fontFamily: "inherit",
              }}>
                Fazer pedido
                <ArrowRight size={12} />
              </button>
              <button
                type="button"
                onClick={() => setActiveView("cardapio")}
                style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                border: `1px solid ${P.accent}`,
                color: activeView === "cardapio" ? "#000" : P.accent,
                background: activeView === "cardapio" ? P.accent : "transparent",
                padding: "6px 12px",
                borderRadius: "6px",
                fontSize: "10px",
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "inherit",
              }}>
                Ver cardápio
              </button>
              <button
                type="button"
                onClick={() => setActiveView("local")}
                style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                border: `1px solid ${P.border}`,
                color: activeView === "local" ? P.text : P.textMuted,
                background: activeView === "local" ? "rgba(255,255,255,0.08)" : "transparent",
                padding: "6px 12px",
                borderRadius: "6px",
                fontSize: "10px",
                fontWeight: 500,
                cursor: "pointer",
                fontFamily: "inherit",
              }}>
                Onde estamos
              </button>
            </div>
          </div>

          {/* Right: burger image */}
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}>
            <img
              src="/case-graphics/tasty%20burger.svg"
              alt="Hambúrguer Premium Halal"
              style={{
                width: "clamp(120px, 100%, 200px)",
                maxHeight: "160px",
                objectFit: "contain",
                filter: "drop-shadow(0 0 40px rgba(251,191,36,0.2))",
              }}
            />
          </div>
        </div>
      </section>

      <div
        style={{
          margin: "0 12px 12px",
          border: `1px solid ${P.border}`,
          borderRadius: "10px",
          background: "rgba(255,255,255,0.03)",
          padding: "10px 12px",
          color: P.text,
        }}
      >
        <div style={{ fontSize: "10px", color: P.textMuted, marginBottom: "6px", letterSpacing: "0.08em" }}>
          WEBVIEW ATIVA
        </div>
        {activeView === "pedido" && <div style={{ fontSize: "11px" }}>Checkout aberto: combo premium + bebida + molho especial.</div>}
        {activeView === "cardapio" && <div style={{ fontSize: "11px" }}>Cardápio aberto: burgers, chicken, currywurst e adicionais.</div>}
        {activeView === "local" && <div style={{ fontSize: "11px" }}>Localização: Westpark 7, Ingolstadt · Sábado 11:00-20:00.</div>}
      </div>

      {/* Stats row */}
      <div style={{
        display: "flex",
        justifyContent: "center",
        gap: "24px",
        padding: "12px",
        borderTop: `1px solid ${P.border}`,
        background: P.bgCard,
      }}>
        {[
          { value: "11+", label: "BURGERS" },
          { value: "10+", label: "MOLHOS" },
          { value: "100%", label: "HALAL" },
        ].map((stat, i) => (
          <div key={i} style={{ textAlign: "center" }}>
            <div style={{ fontSize: "16px", fontWeight: 700, color: P.accent }}>{stat.value}</div>
            <div style={{ fontSize: "11px", color: P.textMuted, letterSpacing: "0.1em", marginTop: "4px" }}>{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
