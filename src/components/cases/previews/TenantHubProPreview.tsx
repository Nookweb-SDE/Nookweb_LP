import React from "react";

/* ====== BENTO GRID LAYOUT — Asymmetric cards, giant numbers, dot-grid bg ====== */
const TenantHubProPreview: React.FC = () => {
  const chartBars = [35, 52, 48, 65, 72, 60, 80, 75, 88, 82, 95, 90];
  return (
    <div style={{ background: "#09090B", width: "100%", minHeight: 420, padding: 24, fontFamily: "'Inter',system-ui,sans-serif", color: "#FAFAFA", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle, rgba(99,102,241,0.15) 1px, transparent 1px)", backgroundSize: "24px 24px", opacity: 0.5 }} />
      <div style={{ position: "absolute", top: -100, left: "50%", transform: "translateX(-50%)", width: 400, height: 200, background: "radial-gradient(ellipse, rgba(99,102,241,0.2) 0%, transparent 70%)", filter: "blur(40px)" }} />

      <div style={{ position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: "linear-gradient(135deg, #6366F1, #8B5CF6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 900, color: "#fff" }}>T</div>
            <span style={{ fontSize: 15, fontWeight: 700, letterSpacing: -0.5 }}>TenantHub Pro</span>
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            {["Overview", "Tenants", "Billing"].map((t, i) => (
              <span key={t} style={{ fontSize: 10, padding: "4px 10px", borderRadius: 6, background: i === 0 ? "rgba(99,102,241,0.15)" : "transparent", color: i === 0 ? "#A5B4FC" : "#71717A", border: i === 0 ? "1px solid rgba(99,102,241,0.3)" : "1px solid transparent" }}>{t}</span>
            ))}
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
          <div style={{ gridColumn: "1 / 3", background: "linear-gradient(135deg, rgba(99,102,241,0.08) 0%, rgba(139,92,246,0.04) 100%)", border: "1px solid rgba(99,102,241,0.15)", borderRadius: 16, padding: 24, position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: -20, right: -20, width: 120, height: 120, background: "radial-gradient(circle, rgba(99,102,241,0.15), transparent 70%)" }} />
            <div style={{ fontSize: 11, color: "#A1A1AA", textTransform: "uppercase", letterSpacing: 1.5, fontWeight: 500, marginBottom: 8 }}>Monthly Recurring Revenue</div>
            <div style={{ fontSize: 48, fontWeight: 900, letterSpacing: -2, lineHeight: 1, background: "linear-gradient(135deg, #E0E7FF, #A5B4FC, #6366F1)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>R$89.4k</div>
            <div style={{ display: "flex", gap: 16, marginTop: 12 }}>
              <span style={{ fontSize: 11, color: "#A1A1AA" }}>vs last month <span style={{ color: "#22C55E", fontWeight: 600 }}>+12.4%</span></span>
              <span style={{ fontSize: 11, color: "#A1A1AA" }}>ARR <span style={{ color: "#A5B4FC", fontWeight: 600 }}>R$1.07M</span></span>
            </div>
          </div>

          <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 16, padding: 20, display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <div style={{ fontSize: 10, color: "#71717A", textTransform: "uppercase", letterSpacing: 1.2, marginBottom: 6 }}>Churn Rate</div>
            <div style={{ fontSize: 32, fontWeight: 800, color: "#22C55E", letterSpacing: -1 }}>1.2%</div>
            <div style={{ width: "100%", height: 3, background: "rgba(255,255,255,0.06)", borderRadius: 2, marginTop: 8 }}>
              <div style={{ width: "12%", height: "100%", borderRadius: 2, background: "#22C55E" }} />
            </div>
          </div>

          <div style={{ gridColumn: "1 / 3", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 16, padding: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <span style={{ fontSize: 12, fontWeight: 600, color: "#E4E4E7" }}>Revenue Trend</span>
              <div style={{ display: "flex", gap: 4 }}>
                {["6M", "1Y", "All"].map((p, i) => (
                  <span key={p} style={{ fontSize: 9, padding: "2px 8px", borderRadius: 4, background: i === 1 ? "#6366F1" : "transparent", color: i === 1 ? "#fff" : "#71717A" }}>{p}</span>
                ))}
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "flex-end", gap: 8, height: 80 }}>
              {chartBars.map((v, i) => (
                <div key={i} style={{ flex: 1, height: v + "%", borderRadius: "6px 6px 2px 2px", background: i >= 10 ? "linear-gradient(180deg, #818CF8, #6366F1)" : "rgba(99,102,241,0.2)", boxShadow: i >= 10 ? "0 4px 20px rgba(99,102,241,0.3)" : "none" }} />
              ))}
            </div>
          </div>

          <div style={{ gridRow: "2 / 4", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 16, padding: 20, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <svg viewBox="0 0 100 100" style={{ width: 80, height: 80 }}>
              <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="6" />
              <circle cx="50" cy="50" r="40" fill="none" stroke="url(#npsGrad)" strokeWidth="6" strokeDasharray={`${72 * 2.51} ${100 * 2.51}`} strokeLinecap="round" transform="rotate(-90 50 50)" style={{ filter: "drop-shadow(0 0 8px rgba(99,102,241,0.4))" }} />
              <defs><linearGradient id="npsGrad" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#A5B4FC" /><stop offset="100%" stopColor="#6366F1" /></linearGradient></defs>
              <text x="50" y="47" textAnchor="middle" fontSize="22" fontWeight="900" fill="#FAFAFA">72</text>
              <text x="50" y="62" textAnchor="middle" fontSize="8" fill="#71717A" fontWeight="500">NPS Score</text>
            </svg>
            <div style={{ fontSize: 10, color: "#22C55E", marginTop: 8, fontWeight: 600 }}>{"\u2191"} +5 pts</div>
          </div>

          <div style={{ gridColumn: "1 / 3", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 16, overflow: "hidden" }}>
            <div style={{ padding: "12px 16px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              <span style={{ fontSize: 12, fontWeight: 600, color: "#E4E4E7" }}>Top Tenants</span>
              <span style={{ fontSize: 9, color: "#6366F1" }}>View all {"\u2192"}</span>
            </div>
            {[
              { name: "Acme Corp", mrr: "R$12.4k", users: 342, badge: "Enterprise" },
              { name: "TechFlow", mrr: "R$8.2k", users: 128, badge: "Business" },
              { name: "CloudNine", mrr: "R$15.1k", users: 567, badge: "Enterprise" },
            ].map((t, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", padding: "10px 16px", gap: 12, borderBottom: i < 2 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
                <div style={{ width: 28, height: 28, borderRadius: 8, background: `hsl(${240 + i * 20}, 60%, ${25 + i * 5}%)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "#A5B4FC" }}>{t.name[0]}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: "#E4E4E7" }}>{t.name}</div>
                  <div style={{ fontSize: 9, color: "#71717A" }}>{t.users} users</div>
                </div>
                <span style={{ fontSize: 8, padding: "2px 8px", borderRadius: 99, border: "1px solid rgba(99,102,241,0.2)", color: "#A5B4FC" }}>{t.badge}</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: "#FAFAFA", fontFeatureSettings: "'tnum'" }}>{t.mrr}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TenantHubProPreview;
