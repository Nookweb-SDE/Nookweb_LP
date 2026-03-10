import React from "react";

/* ====== BLUEPRINT NODE GRAPH — Grid background, connected nodes, bezier ====== */
const FlowSyncPreview: React.FC = () => {
  const nodes = [
    { id: 1, label: "Webhook", sub: "Trigger", x: 60, y: 80, color: "#22D3EE", icon: "\u26A1" },
    { id: 2, label: "Filter", sub: "Condition", x: 220, y: 40, color: "#FBBF24", icon: "\u2699" },
    { id: 3, label: "Map Data", sub: "Transform", x: 220, y: 130, color: "#A78BFA", icon: "\u21C4" },
    { id: 4, label: "Postgres", sub: "Database", x: 380, y: 80, color: "#34D399", icon: "\u26C1" },
    { id: 5, label: "Slack", sub: "Notify", x: 540, y: 40, color: "#F87171", icon: "\u2709" },
    { id: 6, label: "REST API", sub: "HTTP Call", x: 540, y: 130, color: "#60A5FA", icon: "\u21D2" },
  ];
  const edges = [[1,2],[1,3],[2,4],[3,4],[4,5],[4,6]];

  return (
    <div style={{ background: "#0F0B1E", width: "100%", minHeight: 420, fontFamily: "'Inter',system-ui,sans-serif", color: "#E2E8F0", position: "relative", overflow: "hidden" }}>
      {/* Blueprint grid */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(124,58,237,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.06) 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
      <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(124,58,237,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.12) 1px, transparent 1px)", backgroundSize: "100px 100px" }} />

      <div style={{ position: "relative", zIndex: 1, padding: 20 }}>
        {/* Top bar */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 28, height: 28, borderRadius: 6, background: "linear-gradient(135deg, #7C3AED, #A78BFA)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: 13, color: "#fff" }}>{"\u2B21"}</span>
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700 }}>FlowSync</div>
              <div style={{ fontSize: 9, color: "#64748B" }}>Visual Workflow Builder</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            <span style={{ padding: "4px 10px", borderRadius: 6, background: "rgba(34,211,238,0.1)", border: "1px solid rgba(34,211,238,0.2)", color: "#22D3EE", fontSize: 9 }}>12 Active</span>
            <span style={{ padding: "4px 10px", borderRadius: 6, background: "rgba(251,191,36,0.1)", border: "1px solid rgba(251,191,36,0.2)", color: "#FBBF24", fontSize: 9 }}>1 Paused</span>
          </div>
        </div>

        {/* Node graph canvas */}
        <div style={{ background: "rgba(15,11,30,0.8)", border: "1px solid rgba(124,58,237,0.15)", borderRadius: 12, padding: 16, marginBottom: 14 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <span style={{ fontSize: 10, fontWeight: 600, color: "#C4B5FD" }}>User Onboarding Flow</span>
            <div style={{ display: "flex", gap: 4 }}>
              <span style={{ width: 20, height: 20, borderRadius: 4, background: "rgba(255,255,255,0.05)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: "#71717A" }}>+</span>
              <span style={{ width: 20, height: 20, borderRadius: 4, background: "rgba(255,255,255,0.05)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: "#71717A" }}>{"\u2212"}</span>
            </div>
          </div>
          <svg viewBox="0 0 620 180" style={{ width: "100%", height: 160 }}>
            <defs>
              <filter id="fsGlow"><feGaussianBlur stdDeviation="4" /><feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge></filter>
            </defs>
            {edges.map(([from, to], i) => {
              const f = nodes.find(n => n.id === from)!;
              const t = nodes.find(n => n.id === to)!;
              const mx = (f.x + t.x) / 2;
              return <path key={i} d={`M${f.x + 50} ${f.y} C${mx} ${f.y} ${mx} ${t.y} ${t.x - 10} ${t.y}`} fill="none" stroke="rgba(167,139,250,0.25)" strokeWidth="2" strokeDasharray="6 4" />;
            })}
            {nodes.map((n) => (
              <g key={n.id}>
                <rect x={n.x - 20} y={n.y - 28} width={80} height={56} rx={10} fill="rgba(255,255,255,0.04)" stroke={n.color + "50"} strokeWidth="1.5" />
                <rect x={n.x - 20} y={n.y - 28} width={80} height={2} rx={1} fill={n.color} opacity="0.6" />
                <text x={n.x + 20} y={n.y - 2} textAnchor="middle" fontSize="14" fill={n.color}>{n.icon}</text>
                <text x={n.x + 20} y={n.y + 14} textAnchor="middle" fontSize="9" fill="#E2E8F0" fontWeight="600">{n.label}</text>
                <text x={n.x + 20} y={n.y + 24} textAnchor="middle" fontSize="7" fill="#64748B">{n.sub}</text>
              </g>
            ))}
          </svg>
        </div>

        {/* Stats bar */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10 }}>
          {[
            { label: "Executions/day", val: "14.2k", sub: "+24%", accent: "#A78BFA" },
            { label: "Success Rate", val: "99.1%", sub: "+0.2%", accent: "#34D399" },
            { label: "Avg Duration", val: "2.3s", sub: "-0.8s", accent: "#22D3EE" },
          ].map((s, i) => (
            <div key={i} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 10, padding: "12px 14px" }}>
              <div style={{ fontSize: 8, color: "#64748B", textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>{s.label}</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
                <span style={{ fontSize: 22, fontWeight: 800, color: s.accent, letterSpacing: -0.5 }}>{s.val}</span>
                <span style={{ fontSize: 9, color: "#22C55E", fontWeight: 600 }}>{"\u2191"}{s.sub}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FlowSyncPreview;
