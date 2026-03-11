/**
 * Preview IA Corporativa Local — inspirado em soluções on-premise, RAG e relatórios self-service.
 * Paleta Nookweb: laranja (#FF4500), prata, fundo escuro, cream.
 */

import React from "react";
import { Cpu, FileText, BarChart3, Shield, Server, Database } from "lucide-react";

const ORANGE = "#FF4500";
const ORANGE_ALT = "#FF6D00";
const SILVER = "rgba(192,192,192,0.5)";
const CREAM = "#F5F0E8";
const BG = "#0a0e14";
const CARD = "#141414";
const BORDER = "rgba(255,255,255,0.06)";

const PILLARS = [
  {
    icon: Server,
    title: "IA Corporativa Local",
    items: ["LLM no servidor da empresa", "Zero API externa para dados sensíveis", "Chat via intranet"],
    color: ORANGE,
  },
  {
    icon: FileText,
    title: "Base de Conhecimento (RAG)",
    items: ["PDFs, planilhas, wikis", "Fontes citadas em toda resposta", "Rastreabilidade por documento"],
    color: ORANGE_ALT,
  },
  {
    icon: BarChart3,
    title: "Relatórios Self-Service",
    items: ["Pergunta em português → SQL", "Dashboard em minutos", "Export Excel e PDF"],
    color: CREAM,
  },
];

const STATS = [
  { value: "0%", label: "cloud externo\npara dado sensível" },
  { value: "3", label: "pilares de\noperação" },
  { value: "≤0", label: "dias para\nimplantação" },
];

const USE_CASES = [
  { sector: "Portos & Logística", q: "Contratos que vencem em 45 dias e cláusulas de aviso?" },
  { sector: "Indústria", q: "Procedimento para falha no sensor temperatura linha 3?" },
  { sector: "Saúde", q: "Pendências de guia bloqueando faturamento por convênio?" },
];

export default function IACorporativaPreview() {
  return (
    <div
      style={{
        width: "100%",
        height: "594px",
        overflow: "hidden",
        background: BG,
        fontFamily: "'DM Sans', sans-serif",
        display: "flex",
        flexDirection: "column",
        color: CREAM,
      }}
    >
      {/* Header */}
      <div
        style={{
          flexShrink: 0,
          padding: "14px 16px",
          borderBottom: `1px solid ${BORDER}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: ORANGE, boxShadow: `0 0 10px ${ORANGE}` }} />
          <span style={{ fontSize: 13, fontWeight: 700, color: CREAM, letterSpacing: "0.02em" }}>IA Corporativa Local</span>
        </div>
        <span style={{ fontSize: 9, color: SILVER, letterSpacing: "0.15em", textTransform: "uppercase" }}>On-premise · RAG · Self-service</span>
      </div>

      {/* Hero line */}
      <div style={{ flexShrink: 0, padding: "16px 16px 12px" }}>
        <p
          style={{
            fontSize: 11,
            lineHeight: 1.5,
            color: SILVER,
            maxWidth: 480,
          }}
        >
          IA generativa dentro da sua empresa. Sem expor dados confidenciais. Operação sob seu controle.
        </p>
      </div>

      {/* Stats row */}
      <div
        style={{
          display: "flex",
          gap: 12,
          padding: "0 16px 14px",
          flexWrap: "wrap",
        }}
      >
        {STATS.map(({ value, label }) => (
          <div
            key={label}
            style={{
              flex: "1 1 80px",
              minWidth: 70,
              background: CARD,
              border: `1px solid ${BORDER}`,
              borderRadius: 10,
              padding: "10px 12px",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: 18, fontWeight: 800, color: ORANGE, fontFamily: "'Instrument Serif', serif", fontStyle: "italic" }}>{value}</div>
            <div style={{ fontSize: 8, color: SILVER, letterSpacing: "0.05em", textTransform: "uppercase", marginTop: 4, whiteSpace: "pre-line" }}>{label}</div>
          </div>
        ))}
      </div>

      {/* Three pillars */}
      <div
        style={{
          flex: 1,
          minHeight: 0,
          overflow: "auto",
          padding: "0 16px 16px",
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 10,
        }}
      >
        {PILLARS.map(({ icon: Icon, title, items, color }) => (
          <div
            key={title}
            style={{
              background: CARD,
              border: `1px solid ${BORDER}`,
              borderRadius: 12,
              padding: 12,
              display: "flex",
              flexDirection: "column",
              gap: 8,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 28, height: 28, borderRadius: 8, background: `${color}22`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon size={14} color={color} strokeWidth={2} />
              </div>
              <span style={{ fontSize: 10, fontWeight: 700, color: CREAM }}>{title}</span>
            </div>
            <ul style={{ margin: 0, paddingLeft: 14, fontSize: 9, color: SILVER, lineHeight: 1.6 }}>
              {items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Use cases strip */}
      <div
        style={{
          flexShrink: 0,
          padding: "10px 16px 14px",
          borderTop: `1px solid ${BORDER}`,
          background: "rgba(0,0,0,0.2)",
        }}
      >
        <div style={{ fontSize: 8, color: ORANGE, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 8 }}>Casos de uso</div>
        <div style={{ display: "flex", gap: 10, overflowX: "auto", paddingBottom: 4 }}>
          {USE_CASES.map(({ sector, q }) => (
            <div
              key={sector}
              style={{
                flexShrink: 0,
                width: 160,
                padding: "8px 10px",
                background: CARD,
                border: `1px solid ${BORDER}`,
                borderRadius: 8,
              }}
            >
              <div style={{ fontSize: 9, fontWeight: 600, color: ORANGE, marginBottom: 4 }}>{sector}</div>
              <div style={{ fontSize: 8, color: SILVER, lineHeight: 1.4 }}>"{q}"</div>
            </div>
          ))}
        </div>
      </div>

      {/* Stack pills */}
      <div
        style={{
          flexShrink: 0,
          padding: "8px 16px 14px",
          display: "flex",
          flexWrap: "wrap",
          gap: 6,
        }}
      >
        {["Ollama", "Open WebUI", "Supabase", "LangChain", "Docker", "N8N"].map((tech) => (
          <span
            key={tech}
            style={{
              fontSize: 8,
              padding: "4px 8px",
              background: "rgba(255,69,0,0.12)",
              border: `1px solid rgba(255,69,0,0.25)`,
              borderRadius: 6,
              color: ORANGE,
              letterSpacing: "0.05em",
            }}
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}
