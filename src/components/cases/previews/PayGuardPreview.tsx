import React from "react";

/* ====== TERMINAL FINTECH — Monospace, code-like tx log, green-on-dark ====== */
const PayGuardPreview: React.FC = () => {
  const logs = [
    { time: "14:23:01", type: "SUCCESS", msg: "PIX R$1.250,00 → Acme Corp", id: "tx_8842aF3" },
    { time: "14:23:05", type: "SUCCESS", msg: "CARD R$340,00 → TechFlow", id: "tx_8841bK9" },
    { time: "14:23:12", type: "PENDING", msg: "BOLETO R$89,90 → DataPrime", id: "tx_8840cL2" },
    { time: "14:23:18", type: "SUCCESS", msg: "PIX R$2.100,00 → CloudNine", id: "tx_8839dM7" },
    { time: "14:23:25", type: "BLOCKED", msg: "CARD R$750,00 → Suspicious IP", id: "tx_8838eN1" },
    { time: "14:23:28", type: "SUCCESS", msg: "PIX R$480,00 → InnoTech", id: "tx_8837fP4" },
    { time: "14:23:31", type: "SUCCESS", msg: "CARD R$1.890,00 → MegaStore", id: "tx_8836gQ8" },
  ];
  const typeColor = (t: string) => t === "SUCCESS" ? "#22C55E" : t === "PENDING" ? "#EAB308" : "#EF4444";

  return (
    <div style={{ background: "#0A0A0A", width: "100%", minHeight: 420, fontFamily: "'JetBrains Mono','SF Mono','Fira Code',monospace", color: "#A3A3A3", position: "relative", overflow: "hidden" }}>
      {/* Scanline effect */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,0,0.015) 2px, rgba(0,255,0,0.015) 4px)", pointerEvents: "none" }} />

      {/* Terminal header bar */}
      <div style={{ background: "#171717", borderBottom: "1px solid #262626", padding: "8px 16px", display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{ display: "flex", gap: 6 }}>
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#EF4444" }} />
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#EAB308" }} />
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#22C55E" }} />
        </div>
        <span style={{ flex: 1, textAlign: "center", fontSize: 10, color: "#525252" }}>payguard@gateway ~ /transactions</span>
      </div>

      <div style={{ padding: 16 }}>
        {/* ASCII-style header */}
        <div style={{ fontSize: 9, color: "#22C55E", marginBottom: 12, lineHeight: 1.4, opacity: 0.7 }}>
          {"╔══════════════════════════════════════════════╗"}<br/>
          {"║  PAYGUARD v3.2.1 — Payment Gateway Monitor   ║"}<br/>
          {"╚══════════════════════════════════════════════╝"}
        </div>

        {/* Stats line */}
        <div style={{ display: "flex", gap: 24, marginBottom: 16, padding: "10px 0", borderBottom: "1px dashed #262626" }}>
          {[
            { k: "VOLUME_24H", v: "R$ 2.4M", c: "#22C55E" },
            { k: "APPROVAL_RATE", v: "98.7%", c: "#22C55E" },
            { k: "FRAUD_BLOCKED", v: "R$ 34k", c: "#EF4444" },
            { k: "AVG_LATENCY", v: "45ms", c: "#06B6D4" },
          ].map((s, i) => (
            <div key={i}>
              <div style={{ fontSize: 8, color: "#525252" }}>{s.k}=</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: s.c, textShadow: `0 0 10px ${s.c}40` }}>{s.v}</div>
            </div>
          ))}
        </div>

        {/* Live transaction log */}
        <div style={{ fontSize: 9, color: "#525252", marginBottom: 6 }}>$ tail -f /var/log/transactions.log</div>
        <div style={{ background: "#0F0F0F", border: "1px solid #1A1A1A", borderRadius: 6, padding: 12, marginBottom: 16 }}>
          {logs.map((l, i) => (
            <div key={i} style={{ display: "flex", gap: 8, marginBottom: i < logs.length - 1 ? 4 : 0, fontSize: 10, lineHeight: 1.6 }}>
              <span style={{ color: "#525252" }}>[{l.time}]</span>
              <span style={{ color: typeColor(l.type), fontWeight: 700, minWidth: 56, textShadow: `0 0 8px ${typeColor(l.type)}30` }}>{l.type}</span>
              <span style={{ color: "#A3A3A3", flex: 1 }}>{l.msg}</span>
              <span style={{ color: "#3F3F46" }}>{l.id}</span>
            </div>
          ))}
          <div style={{ marginTop: 6, display: "flex", alignItems: "center" }}>
            <span style={{ color: "#22C55E", fontSize: 10 }}>{">"}</span>
            <span style={{ width: 6, height: 14, background: "#22C55E", marginLeft: 4, opacity: 0.8 }} />
          </div>
        </div>

        {/* Bottom status bar */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
          {[
            { title: "PIX", pct: 58, color: "#22C55E", txs: "1.2k/min" },
            { title: "CARD", pct: 28, color: "#06B6D4", txs: "890/min" },
            { title: "BOLETO", pct: 14, color: "#EAB308", txs: "120/min" },
          ].map((ch, i) => (
            <div key={i} style={{ background: "#111111", border: "1px solid #1A1A1A", borderRadius: 6, padding: "10px 12px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ fontSize: 9, color: ch.color, fontWeight: 700 }}>{ch.title}</span>
                <span style={{ fontSize: 8, color: "#525252" }}>{ch.txs}</span>
              </div>
              <div style={{ height: 4, background: "#1A1A1A", borderRadius: 2 }}>
                <div style={{ width: ch.pct + "%", height: "100%", borderRadius: 2, background: ch.color, boxShadow: `0 0 6px ${ch.color}40` }} />
              </div>
              <div style={{ fontSize: 18, fontWeight: 800, color: ch.color, marginTop: 6, textShadow: `0 0 12px ${ch.color}30` }}>{ch.pct}%</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PayGuardPreview;
