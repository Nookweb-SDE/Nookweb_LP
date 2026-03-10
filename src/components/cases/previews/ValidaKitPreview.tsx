import React from "react";

/* ====== LAB / A-B TEST — Side-by-side variants, confidence meters, scientific ====== */
const ValidaKitPreview: React.FC = () => {
  const pmf = 72;
  const circumference = 2 * Math.PI * 38;
  const offset = circumference - (pmf / 100) * circumference;
  const variants = [
    { name: "Variant A", conversion: "3.2%", visitors: "5.4k", color: "#7C3AED", wins: false },
    { name: "Variant B", conversion: "5.8%", visitors: "5.6k", color: "#22C55E", wins: true },
  ];

  return (
    <div style={{ background: "#0C0A15", width: "100%", minHeight: 420, fontFamily: "'Inter',system-ui,sans-serif", color: "#E2E8F0", position: "relative", overflow: "hidden", padding: 24 }}>
      {/* Noise texture */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(124,58,237,0.03) 1px, transparent 1px), radial-gradient(rgba(124,58,237,0.03) 1px, transparent 1px)", backgroundSize: "40px 40px", backgroundPosition: "0 0, 20px 20px" }} />

      <div style={{ position: "relative", zIndex: 1 }}>
        {/* Header with PMF ring */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <div>
            <div style={{ fontSize: 9, textTransform: "uppercase", letterSpacing: 2, color: "#A78BFA", fontWeight: 600, marginBottom: 4 }}>{"\uD83E\uDDEA"} Experiment Lab</div>
            <div style={{ fontSize: 22, fontWeight: 900, letterSpacing: -1, color: "#FAFAFA" }}>ValidaKit</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <svg viewBox="0 0 80 80" style={{ width: 56, height: 56 }}>
              <circle cx="40" cy="40" r="38" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="4" />
              <circle cx="40" cy="40" r="38" fill="none" stroke="#7C3AED" strokeWidth="4" strokeDasharray={`${circumference}`} strokeDashoffset={offset} strokeLinecap="round" transform="rotate(-90 40 40)" style={{ filter: "drop-shadow(0 0 6px rgba(124,58,237,0.5))" }} />
              <text x="40" y="37" textAnchor="middle" fontSize="16" fontWeight="900" fill="#C4B5FD">{pmf}</text>
              <text x="40" y="48" textAnchor="middle" fontSize="6" fill="#64748B">PMF Score</text>
            </svg>
          </div>
        </div>

        {/* A/B Test card - the main visual */}
        <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(124,58,237,0.12)", borderRadius: 14, overflow: "hidden", marginBottom: 16 }}>
          <div style={{ padding: "12px 16px", borderBottom: "1px solid rgba(255,255,255,0.05)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 12, fontWeight: 700 }}>Pricing Page Test</span>
              <span style={{ fontSize: 8, padding: "2px 8px", borderRadius: 99, background: "rgba(34,197,94,0.1)", color: "#22C55E", border: "1px solid rgba(34,197,94,0.2)" }}>97% confidence</span>
            </div>
            <span style={{ fontSize: 9, color: "#64748B" }}>Running 14 days</span>
          </div>

          {/* Side-by-side variants */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
            {variants.map((v, i) => (
              <div key={i} style={{ padding: 16, borderRight: i === 0 ? "1px solid rgba(255,255,255,0.05)" : "none", position: "relative" }}>
                {v.wins && <div style={{ position: "absolute", top: 8, right: 8, fontSize: 7, padding: "2px 8px", borderRadius: 4, background: "rgba(34,197,94,0.15)", color: "#22C55E", fontWeight: 700, border: "1px solid rgba(34,197,94,0.25)" }}>{"\u2713"} WINNER</div>}
                <div style={{ fontSize: 10, color: v.color, fontWeight: 600, marginBottom: 8 }}>{v.name}</div>
                {/* Mockup preview rectangle */}
                <div style={{ height: 50, borderRadius: 6, background: `rgba(${i === 0 ? "124,58,237" : "34,197,94"},0.06)`, border: `1px dashed ${v.color}30`, marginBottom: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
                    <div style={{ width: 40, height: 4, borderRadius: 2, background: `${v.color}30` }} />
                    <div style={{ width: 28, height: 4, borderRadius: 2, background: `${v.color}20` }} />
                    <div style={{ width: 32, height: 10, borderRadius: 3, background: `${v.color}25`, marginTop: 2 }} />
                  </div>
                </div>
                <div style={{ fontSize: 8, color: "#64748B", marginBottom: 4 }}>Conversion Rate</div>
                <div style={{ fontSize: 28, fontWeight: 900, color: v.color, letterSpacing: -1, textShadow: v.wins ? `0 0 20px ${v.color}40` : "none" }}>{v.conversion}</div>
                <div style={{ fontSize: 9, color: "#64748B", marginTop: 4 }}>{v.visitors} visitors</div>
              </div>
            ))}
          </div>

          {/* Lift indicator */}
          <div style={{ padding: "10px 16px", background: "rgba(34,197,94,0.04)", borderTop: "1px solid rgba(255,255,255,0.05)", display: "flex", justifyContent: "center", alignItems: "center", gap: 6 }}>
            <span style={{ fontSize: 11, color: "#64748B" }}>Uplift:</span>
            <span style={{ fontSize: 16, fontWeight: 800, color: "#22C55E" }}>+81.2%</span>
            <span style={{ fontSize: 9, color: "#64748B" }}>B over A</span>
          </div>
        </div>

        {/* Bottom experiment list */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10 }}>
          {[
            { name: "Onboarding Flow", stat: "+12%", conf: 82, status: "Running" },
            { name: "CTA Copy", stat: "+18%", conf: 95, status: "Concluded" },
            { name: "Feature Gate", stat: "+4%", conf: 68, status: "Running" },
          ].map((e, i) => (
            <div key={i} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 10, padding: "12px 14px" }}>
              <div style={{ fontSize: 10, fontWeight: 600, color: "#E2E8F0", marginBottom: 6 }}>{e.name}</div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <span style={{ fontSize: 18, fontWeight: 800, color: "#A78BFA" }}>{e.stat}</span>
                <span style={{ fontSize: 8, color: e.conf >= 95 ? "#22C55E" : "#F59E0B" }}>{e.conf}% conf.</span>
              </div>
              <div style={{ height: 2, borderRadius: 1, background: "rgba(255,255,255,0.06)", marginTop: 8 }}>
                <div style={{ width: e.conf + "%", height: "100%", borderRadius: 1, background: e.conf >= 95 ? "#22C55E" : e.conf >= 80 ? "#A78BFA" : "#F59E0B" }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ValidaKitPreview;
