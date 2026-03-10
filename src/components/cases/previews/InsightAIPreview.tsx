import React from "react";

/* ====== MISSION CONTROL — Central gauge, radar aesthetic, surrounding panels ====== */
const InsightAIPreview: React.FC = () => {
  const accuracy = 93.5;
  const circumference = 2 * Math.PI * 52;
  const offset = circumference - (accuracy / 100) * circumference;
  const radarPoints = [85, 92, 78, 96, 88, 90];
  const radarLabels = ["Sentiment", "Demand", "Anomaly", "Churn", "Pricing", "Trends"];
  const radarR = 40;
  const radarCenter = 55;
  const radarCoords = radarPoints.map((v, i) => {
    const angle = (i / radarPoints.length) * 2 * Math.PI - Math.PI / 2;
    const r = (v / 100) * radarR;
    return { x: radarCenter + r * Math.cos(angle), y: radarCenter + r * Math.sin(angle) };
  });
  const radarPath = radarCoords.map((c, i) => `${i === 0 ? "M" : "L"}${c.x} ${c.y}`).join(" ") + " Z";
  const insights = [
    { type: "alert", icon: "\u26A0", text: "Revenue anomaly: 23% spike from organic traffic", color: "#F59E0B" },
    { type: "risk", icon: "\u25CF", text: "12 enterprise accounts showing churn signals", color: "#EF4444" },
    { type: "opp", icon: "\u2191", text: "Mobile converts 3x better on new pricing page", color: "#10B981" },
  ];

  return (
    <div style={{ background: "#060D0A", width: "100%", minHeight: 420, fontFamily: "'JetBrains Mono','SF Mono',monospace", color: "#A3E4C8", position: "relative", overflow: "hidden" }}>
      {/* Scan lines */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(16,185,129,0.02) 3px, rgba(16,185,129,0.02) 4px)", pointerEvents: "none" }} />
      {/* Center glow */}
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(16,185,129,0.06), transparent 60%)" }} />

      <div style={{ position: "relative", zIndex: 1, padding: 20 }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <div>
            <div style={{ fontSize: 8, color: "#10B981", textTransform: "uppercase", letterSpacing: 3 }}>SYSTEM ONLINE</div>
            <div style={{ fontSize: 18, fontWeight: 900, color: "#ECFDF5", fontFamily: "'Inter',system-ui,sans-serif", letterSpacing: -0.5 }}>InsightAI</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#10B981", boxShadow: "0 0 8px #10B981" }} />
            <span style={{ fontSize: 9, color: "#10B981" }}>4 Models Active</span>
          </div>
        </div>

        {/* Main grid: Radar + Gauge + Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 14 }}>
          {/* Radar chart */}
          <div style={{ background: "rgba(16,185,129,0.03)", border: "1px solid rgba(16,185,129,0.1)", borderRadius: 12, padding: 14, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ fontSize: 8, color: "#10B981", textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 8 }}>Model Accuracy</div>
            <svg viewBox="0 0 110 110" style={{ width: 100, height: 100 }}>
              {/* Grid rings */}
              {[20, 30, 40].map((r, i) => (
                <circle key={i} cx={radarCenter} cy={radarCenter} r={r} fill="none" stroke="rgba(16,185,129,0.08)" strokeWidth="0.5" />
              ))}
              {/* Grid lines */}
              {radarLabels.map((_, i) => {
                const angle = (i / radarLabels.length) * 2 * Math.PI - Math.PI / 2;
                return <line key={i} x1={radarCenter} y1={radarCenter} x2={radarCenter + radarR * Math.cos(angle)} y2={radarCenter + radarR * Math.sin(angle)} stroke="rgba(16,185,129,0.08)" strokeWidth="0.5" />;
              })}
              <path d={radarPath} fill="rgba(16,185,129,0.12)" stroke="#10B981" strokeWidth="1.5" style={{ filter: "drop-shadow(0 0 4px rgba(16,185,129,0.4))" }} />
              {radarCoords.map((c, i) => (
                <circle key={i} cx={c.x} cy={c.y} r="2.5" fill="#34D399" />
              ))}
              {radarLabels.map((l, i) => {
                const angle = (i / radarLabels.length) * 2 * Math.PI - Math.PI / 2;
                const x = radarCenter + (radarR + 12) * Math.cos(angle);
                const y = radarCenter + (radarR + 12) * Math.sin(angle);
                return <text key={i} x={x} y={y} textAnchor="middle" dominantBaseline="middle" fontSize="5" fill="#64748B">{l}</text>;
              })}
            </svg>
          </div>

          {/* Central gauge */}
          <div style={{ background: "rgba(16,185,129,0.03)", border: "1px solid rgba(16,185,129,0.1)", borderRadius: 12, padding: 14, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <svg viewBox="0 0 120 120" style={{ width: 110, height: 110 }}>
              <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(16,185,129,0.06)" strokeWidth="5" />
              <circle cx="60" cy="60" r="52" fill="none" stroke="#10B981" strokeWidth="5" strokeDasharray={`${circumference}`} strokeDashoffset={offset} strokeLinecap="round" transform="rotate(-90 60 60)" style={{ filter: "drop-shadow(0 0 10px rgba(16,185,129,0.5))" }} />
              <circle cx="60" cy="60" r="42" fill="none" stroke="rgba(16,185,129,0.04)" strokeWidth="1" />
              <text x="60" y="54" textAnchor="middle" fontSize="24" fontWeight="900" fill="#ECFDF5" fontFamily="Inter,sans-serif">{accuracy}</text>
              <text x="60" y="54" textAnchor="middle" fontSize="8" fontWeight="400" fill="#ECFDF5" dy="2">%</text>
              <text x="60" y="72" textAnchor="middle" fontSize="7" fill="#64748B">Overall Accuracy</text>
            </svg>
            <div style={{ fontSize: 9, color: "#10B981", marginTop: 4, fontFamily: "'Inter',sans-serif" }}>{"\u2191"} +2.4% this month</div>
          </div>

          {/* Stats panel */}
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              { label: "PREDICTIONS/DAY", value: "48.2k", sub: "4 models" },
              { label: "INSIGHTS GEN.", value: "127", sub: "this week" },
              { label: "DATA PROCESSED", value: "2.8TB", sub: "+340GB today" },
            ].map((s, i) => (
              <div key={i} style={{ flex: 1, background: "rgba(16,185,129,0.03)", border: "1px solid rgba(16,185,129,0.1)", borderRadius: 10, padding: "10px 12px" }}>
                <div style={{ fontSize: 7, color: "#64748B", letterSpacing: 1.5, marginBottom: 4 }}>{s.label}</div>
                <div style={{ fontSize: 18, fontWeight: 800, color: "#34D399", fontFamily: "'Inter',sans-serif", letterSpacing: -0.5, textShadow: "0 0 12px rgba(16,185,129,0.3)" }}>{s.value}</div>
                <div style={{ fontSize: 8, color: "#52525B", marginTop: 2 }}>{s.sub}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Insights feed */}
        <div style={{ background: "rgba(16,185,129,0.02)", border: "1px solid rgba(16,185,129,0.08)", borderRadius: 10, overflow: "hidden" }}>
          <div style={{ padding: "8px 14px", borderBottom: "1px solid rgba(16,185,129,0.08)", fontSize: 8, color: "#10B981", textTransform: "uppercase", letterSpacing: 1.5 }}>{"\u25C9"} Live Insights Feed</div>
          {insights.map((ins, i) => (
            <div key={i} style={{ padding: "10px 14px", borderBottom: i < insights.length - 1 ? "1px solid rgba(16,185,129,0.05)" : "none", display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 10, color: ins.color, filter: `drop-shadow(0 0 4px ${ins.color})` }}>{ins.icon}</span>
              <span style={{ fontSize: 10, color: "#94A3B8", flex: 1, fontFamily: "'Inter',sans-serif" }}>{ins.text}</span>
              <span style={{ fontSize: 8, color: "#52525B" }}>now</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InsightAIPreview;
