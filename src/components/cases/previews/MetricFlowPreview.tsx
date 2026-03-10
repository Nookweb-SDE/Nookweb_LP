import React from "react";

/* ====== SPLIT SCREEN — Dark sidebar + content area, sparklines, condensed ====== */
const MetricFlowPreview: React.FC = () => {
  const navItems = [
    { icon: "\u25C9", label: "Dashboard", active: true },
    { icon: "\u2261", label: "Reports", active: false },
    { icon: "\u2630", label: "Funnels", active: false },
    { icon: "\u2699", label: "Settings", active: false },
  ];
  const metrics = [
    { label: "Active Users", value: "24.8k", spark: [3,5,4,7,6,8,7,9,8,10], change: "+18%", up: true },
    { label: "Sessions", value: "142k", spark: [4,3,5,6,5,7,8,7,9,8], change: "+7.2%", up: true },
    { label: "Bounce Rate", value: "32%", spark: [8,7,6,7,5,6,4,5,4,3], change: "-4.1%", up: true },
    { label: "Avg Duration", value: "4:32", spark: [3,4,5,4,6,5,7,6,7,8], change: "+12%", up: true },
  ];
  const topPages = [
    { page: "/pricing", views: "12.4k", pct: 85 },
    { page: "/features", views: "8.9k", pct: 62 },
    { page: "/docs/api", views: "6.2k", pct: 43 },
    { page: "/blog/launch", views: "4.8k", pct: 33 },
    { page: "/signup", views: "3.1k", pct: 22 },
  ];
  const heatmapData = Array.from({ length: 7 }, () => Array.from({ length: 24 }, () => Math.random()));

  return (
    <div style={{ display: "flex", width: "100%", minHeight: 420, fontFamily: "'JetBrains Mono','SF Mono',monospace", overflow: "hidden" }}>
      {/* Sidebar */}
      <div style={{ width: 160, background: "#020617", borderRight: "1px solid rgba(6,182,212,0.1)", padding: "20px 12px", display: "flex", flexDirection: "column", gap: 4 }}>
        <div style={{ fontSize: 14, fontWeight: 800, color: "#06B6D4", letterSpacing: -0.5, marginBottom: 16, paddingLeft: 8 }}>
          <span style={{ color: "#67E8F9" }}>metric</span>flow
        </div>
        {navItems.map((n, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 10px", borderRadius: 8, background: n.active ? "rgba(6,182,212,0.1)" : "transparent", borderLeft: n.active ? "2px solid #06B6D4" : "2px solid transparent", color: n.active ? "#67E8F9" : "#475569", fontSize: 11, fontWeight: n.active ? 600 : 400, cursor: "pointer" }}>
            <span style={{ fontSize: 12 }}>{n.icon}</span>{n.label}
          </div>
        ))}
        <div style={{ flex: 1 }} />
        <div style={{ padding: "10px 8px", background: "rgba(6,182,212,0.05)", borderRadius: 8, border: "1px solid rgba(6,182,212,0.1)" }}>
          <div style={{ fontSize: 8, color: "#475569", textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>Live Visitors</div>
          <div style={{ fontSize: 20, fontWeight: 800, color: "#67E8F9" }}>847</div>
          <div style={{ display: "flex", gap: 2, marginTop: 4 }}>
            {Array.from({ length: 12 }, (_, i) => (
              <div key={i} style={{ flex: 1, height: 3 + Math.random() * 10, borderRadius: 1, background: `rgba(6,182,212,${0.3 + Math.random() * 0.5})` }} />
            ))}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div style={{ flex: 1, background: "#0B1120", padding: 20, overflow: "hidden" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#E2E8F0", fontFamily: "Inter,system-ui,sans-serif" }}>Real-time Analytics</div>
            <div style={{ fontSize: 9, color: "#475569", marginTop: 2 }}>Updated 3s ago</div>
          </div>
          <div style={{ padding: "4px 12px", borderRadius: 99, background: "rgba(6,182,212,0.1)", border: "1px solid rgba(6,182,212,0.2)", fontSize: 9, color: "#06B6D4", display: "flex", alignItems: "center", gap: 4 }}>
            <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#06B6D4", boxShadow: "0 0 6px #06B6D4" }} />LIVE
          </div>
        </div>

        {/* Metric rows with sparklines */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
          {metrics.map((m, i) => (
            <div key={i} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 10, padding: "12px 14px", display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 8, color: "#64748B", textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>{m.label}</div>
                <div style={{ fontSize: 20, fontWeight: 800, color: "#F1F5F9", letterSpacing: -0.5 }}>{m.value}</div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
                <svg viewBox="0 0 60 20" style={{ width: 50, height: 16 }}>
                  <polyline points={m.spark.map((v, j) => `${j * 6.6},${20 - v * 1.8}`).join(" ")} fill="none" stroke="#06B6D4" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                <span style={{ fontSize: 9, color: m.up ? "#22C55E" : "#EF4444", fontWeight: 600 }}>{m.change}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Heatmap + Top pages side by side */}
        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 10 }}>
          <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 10, padding: 12 }}>
            <div style={{ fontSize: 10, fontWeight: 600, color: "#E2E8F0", marginBottom: 8, fontFamily: "Inter,system-ui,sans-serif" }}>Activity Heatmap</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {heatmapData.map((row, r) => (
                <div key={r} style={{ display: "flex", gap: 2 }}>
                  <span style={{ fontSize: 7, color: "#475569", width: 20, textAlign: "right", marginRight: 4 }}>{["Mon","Tue","Wed","Thu","Fri","Sat","Sun"][r]}</span>
                  {row.map((v, c) => (
                    <div key={c} style={{ flex: 1, height: 8, borderRadius: 1.5, background: v > 0.7 ? "#06B6D4" : v > 0.4 ? "rgba(6,182,212,0.35)" : "rgba(6,182,212,0.08)" }} />
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 10, padding: 12 }}>
            <div style={{ fontSize: 10, fontWeight: 600, color: "#E2E8F0", marginBottom: 10, fontFamily: "Inter,system-ui,sans-serif" }}>Top Pages</div>
            {topPages.map((p, i) => (
              <div key={i} style={{ marginBottom: 8 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 9, marginBottom: 3 }}>
                  <span style={{ color: "#94A3B8" }}>{p.page}</span>
                  <span style={{ color: "#67E8F9", fontWeight: 600 }}>{p.views}</span>
                </div>
                <div style={{ height: 3, borderRadius: 2, background: "rgba(255,255,255,0.04)" }}>
                  <div style={{ width: p.pct + "%", height: "100%", borderRadius: 2, background: i === 0 ? "linear-gradient(90deg, #06B6D4, #67E8F9)" : "rgba(6,182,212,0.3)", boxShadow: i === 0 ? "0 0 8px rgba(6,182,212,0.3)" : "none" }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetricFlowPreview;
