/**
 * Preview do Nookpet — front do marketplace pet (case SaaS 2, Vertical 3).
 * Baseado na pasta Nookpet (área de trabalho). Apenas front, enquadramento perfeito.
 */

import { Search, MapPin, ChevronDown, Star, Shield, Clock, PawPrint, Home, Building2, Footprints, Award, Scissors, Stethoscope, ShoppingBag, Heart } from "lucide-react";

const PURPLE = "#5C2D91";
const ORANGE = "#F97316";
const BG_GRADIENT = "linear-gradient(160deg, #FAF5FF 0%, #FFF7ED 50%, #FAF5FF 100%)";

const SERVICES = [
  { icon: Home, emoji: "🏠", name: "Hospedagem Pet", desc: "Casa confortável para seu pet enquanto você viaja", color: "#8B5CF6", bg: "#F5F3FF" },
  { icon: Building2, emoji: "🏫", name: "Creche Pet", desc: "Atividades e socialização para seu pet durante o dia", color: "#EC4899", bg: "#FDF2F8" },
  { icon: Footprints, emoji: "🐾", name: "Dog Walker", desc: "Passeios diários para manter seu pet ativo e feliz", color: "#F97316", bg: "#FFF7ED" },
  { icon: Award, emoji: "🎓", name: "Adestramento", desc: "Treinamento profissional de comportamento animal", color: "#0EA5E9", bg: "#F0F9FF" },
  { icon: Scissors, emoji: "✂️", name: "Banho & Tosa", desc: "Higiene e estética para seu pet sempre bonito", color: "#10B981", bg: "#F0FDF4" },
  { icon: Stethoscope, emoji: "🩺", name: "Veterinária", desc: "Consultas e cuidados veterinários especializados", color: "#EF4444", bg: "#FEF2F2" },
  { icon: ShoppingBag, emoji: "🛒", name: "Pet Shop", desc: "Produtos, rações e acessórios para seu pet", color: "#D97706", bg: "#FFFBEB" },
  { icon: Heart, emoji: "❤️", name: "Pet Cruza", desc: "Cruzamento responsável e acompanhado com segurança", color: PURPLE, bg: "#F5F0FF" },
];

export default function NookpetPreview() {
  return (
    <div
      style={{
        width: "100%",
        height: "594px",
        overflow: "hidden",
        background: BG_GRADIENT,
        display: "flex",
        flexDirection: "column",
        fontFamily: "Inter, system-ui, sans-serif",
      }}
    >
      {/* Navbar compacta */}
      <header
        style={{
          flexShrink: 0,
          height: 52,
          background: "rgba(255,255,255,0.95)",
          borderBottom: "1px solid #E5E7EB",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 16px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src="/nookpet-logo.png"
            alt="Nookpet"
            style={{ height: 36, width: "auto", display: "block", objectFit: "contain" }}
          />
        </div>
        <nav style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <span style={{ fontSize: 12, color: "#6B7280", fontWeight: 500 }}>Buscar Serviços</span>
          <span style={{ fontSize: 12, color: "#6B7280", fontWeight: 500 }}>Como funciona</span>
          <div style={{ display: "flex", gap: 8 }}>
            <span style={{ fontSize: 11, padding: "6px 12px", border: `1px solid ${PURPLE}`, borderRadius: 8, color: PURPLE, fontWeight: 600 }}>Log In</span>
            <span style={{ fontSize: 11, padding: "6px 12px", background: PURPLE, borderRadius: 8, color: "#fff", fontWeight: 600 }}>Cadastre-se</span>
          </div>
        </nav>
      </header>

      {/* Conteúdo rolável: Hero + Cards de serviços */}
      <div
        style={{
          flex: 1,
          minHeight: 0,
          overflow: "auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <section
          style={{
            flexShrink: 0,
            position: "relative",
            padding: "20px 20px 16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Blobs de fundo */}
          <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: -60, right: -60, width: 220, height: 220, background: "rgba(92,45,145,0.08)", borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%" }} />
            <div style={{ position: "absolute", bottom: -40, left: -40, width: 180, height: 180, background: "rgba(249,115,22,0.08)", borderRadius: "30% 60% 70% 40% / 50% 60% 30% 60%" }} />
          </div>

          <div style={{ position: "relative", zIndex: 1, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, alignItems: "center", maxWidth: 900, width: "100%" }}>
            {/* Coluna esquerda */}
            <div>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  fontSize: 10,
                  fontWeight: 600,
                  color: PURPLE,
                  marginBottom: 10,
                  padding: "4px 10px",
                  background: "rgba(92,45,145,0.08)",
                  borderRadius: 20,
                }}
              >
                <PawPrint size={12} />
                O marketplace pet mais completo do Brasil
              </div>
              <h1 style={{ fontSize: 26, fontWeight: 900, lineHeight: 1.15, marginBottom: 10, color: "#1A1A2E" }}>
                Encontre{" "}
                <span style={{ background: `linear-gradient(90deg, ${PURPLE}, ${ORANGE})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Profissionais</span>
                {" "}de confiança para seu pet
              </h1>
              <p style={{ fontSize: 12, color: "#6B7280", lineHeight: 1.5, marginBottom: 16, maxWidth: 320 }}>
                Conectamos tutores a cuidadores verificados para hospedagem, passeios, banho & tosa e muito mais.
              </p>

              {/* Form de busca */}
              <div
                style={{
                  background: "#fff",
                  borderRadius: 14,
                  boxShadow: "0 6px 24px rgba(92,45,145,0.12)",
                  padding: 6,
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 6,
                  border: "1px solid rgba(92,45,145,0.1)",
                }}
              >
                <div style={{ flex: "1 1 120px", display: "flex", alignItems: "center", position: "relative" }}>
                  <MapPin size={14} color={ORANGE} style={{ position: "absolute", left: 10, pointerEvents: "none" }} />
                  <input
                    type="text"
                    placeholder="Localização"
                    readOnly
                    style={{
                      width: "100%",
                      padding: "8px 8px 8px 32px",
                      border: "none",
                      background: "#FAF5FF",
                      borderRadius: 10,
                      fontSize: 12,
                      color: "#1A1A2E",
                      outline: "none",
                    }}
                  />
                </div>
                <div
                  style={{
                    flex: "1 1 120px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "8px 10px",
                    background: "#FAF5FF",
                    borderRadius: 10,
                    fontSize: 12,
                    color: "#9CA3AF",
                  }}
                >
                  <span>Selecione o serviço</span>
                  <ChevronDown size={12} />
                </div>
                <button
                  type="button"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    padding: "8px 16px",
                    background: PURPLE,
                    color: "#fff",
                    border: "none",
                    borderRadius: 10,
                    fontSize: 12,
                    fontWeight: 600,
                    cursor: "default",
                  }}
                >
                  <Search size={14} />
                  Buscar
                </button>
              </div>

              <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 14 }}>
                {[
                  { icon: Star, text: "+5.000 parceiros", color: "#F59E0B" },
                  { icon: Shield, text: "Verificados", color: "#10B981" },
                  { icon: Clock, text: "Suporte 24/7", color: "#6366F1" },
                ].map(({ icon: Icon, text, color }) => (
                  <div key={text} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: "#6B7280" }}>
                    <Icon size={12} color={color} fill={color} />
                    {text}
                  </div>
                ))}
              </div>
            </div>

            {/* Coluna direita — visual */}
            <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div
                style={{
                  width: 200,
                  height: 200,
                  background: `linear-gradient(135deg, ${PURPLE} 0%, ${ORANGE} 100%)`,
                  borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 16px 40px rgba(92,45,145,0.25)",
                }}
              >
                <span style={{ fontSize: 56 }}>🐾</span>
              </div>
              <div style={{ position: "absolute", top: 0, left: -10, background: "#fff", borderRadius: 12, padding: "8px 12px", boxShadow: "0 4px 16px rgba(0,0,0,0.08)", display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 18 }}>🐕</span>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#1A1A2E" }}>Dog Walker</div>
                  <div style={{ fontSize: 10, color: "#6B7280" }}>Disponível hoje</div>
                </div>
              </div>
              <div style={{ position: "absolute", bottom: 10, right: -16, background: "#fff", borderRadius: 12, padding: "8px 12px", boxShadow: "0 4px 16px rgba(0,0,0,0.08)" }}>
                <div style={{ fontSize: 10, color: "#6B7280", marginBottom: 2 }}>Parceiros ativos</div>
                <div style={{ fontSize: 18, fontWeight: 800, color: PURPLE }}>5.280+</div>
              </div>
            </div>
          </div>
        </section>

        {/* Seção Serviços — 8 cards + CTA (como no Nookpet) */}
        <section style={{ flexShrink: 0, padding: "16px 20px 20px", background: "#fff" }}>
          <p style={{ textAlign: "center", fontSize: 12, color: "#6B7280", marginBottom: 14, maxWidth: 420, margin: "0 auto 14px" }}>
            Escolha entre 8 categorias de serviços com profissionais verificados e avaliados pela comunidade.
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 10,
              marginBottom: 14,
            }}
          >
            {SERVICES.map((s) => (
              <div
                key={s.name}
                style={{
                  padding: 12,
                  background: "#fff",
                  borderRadius: 12,
                  border: "1px solid #E5E7EB",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 10,
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    background: s.bg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 20,
                    flexShrink: 0,
                  }}
                >
                  {s.emoji}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h3 style={{ fontSize: 12, fontWeight: 700, color: "#1A1A2E", marginBottom: 4 }}>{s.name}</h3>
                  <p style={{ fontSize: 10, color: "#6B7280", lineHeight: 1.35 }}>{s.desc}</p>
                  <span style={{ display: "inline-block", marginTop: 6, fontSize: 10, fontWeight: 600, color: s.color }}>
                    Ver profissionais →
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center" }}>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "10px 24px",
                background: PURPLE,
                color: "#fff",
                borderRadius: 12,
                fontSize: 13,
                fontWeight: 600,
              }}
            >
              Ver todos os serviços
            </span>
          </div>
        </section>
      </div>
    </div>
  );
}
