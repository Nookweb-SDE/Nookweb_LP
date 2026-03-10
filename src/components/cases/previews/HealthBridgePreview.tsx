import React from "react";

/* ====== PHONE MOCKUP — Device frame + floating feature callouts ====== */
const HealthBridgePreview: React.FC = () => {
  const features = [
    { icon: "\uD83D\uDCC5", title: "Smart Scheduling", side: "left", top: 60 },
    { icon: "\uD83D\uDD12", title: "HIPAA Secure", side: "left", top: 160 },
    { icon: "\uD83D\uDCCA", title: "Health Analytics", side: "right", top: 80 },
    { icon: "\uD83D\uDCAC", title: "Telemedicine", side: "right", top: 180 },
  ];

  return (
    <div style={{ background: "linear-gradient(180deg, #042F2E 0%, #0A1A19 50%, #040E0D 100%)", width: "100%", minHeight: 420, fontFamily: "'Inter',system-ui,sans-serif", color: "#CCFBF1", position: "relative", overflow: "hidden", display: "flex", flexDirection: "column", alignItems: "center", padding: "28px 20px 20px" }}>
      {/* Ambient glow */}
      <div style={{ position: "absolute", top: "30%", left: "50%", transform: "translate(-50%,-50%)", width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(13,148,136,0.15), transparent 70%)", filter: "blur(40px)" }} />

      {/* Title */}
      <div style={{ textAlign: "center", marginBottom: 24, position: "relative", zIndex: 2 }}>
        <div style={{ fontSize: 11, color: "#0D9488", textTransform: "uppercase", letterSpacing: 3, fontWeight: 600, marginBottom: 6 }}>Healthcare Platform</div>
        <div style={{ fontSize: 28, fontWeight: 900, letterSpacing: -1, color: "#F0FDFA" }}>HealthBridge</div>
        <div style={{ fontSize: 11, color: "#5EEAD4", marginTop: 4, opacity: 0.7 }}>Connecting patients to care, seamlessly.</div>
      </div>

      {/* Phone + features layout */}
      <div style={{ position: "relative", width: "100%", maxWidth: 500, flex: 1, display: "flex", justifyContent: "center" }}>
        {/* Feature callouts - LEFT */}
        {features.filter(f => f.side === "left").map((f, i) => (
          <div key={i} style={{ position: "absolute", left: 10, top: f.top, display: "flex", alignItems: "center", gap: 8, zIndex: 3 }}>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#F0FDFA" }}>{f.title}</div>
              <div style={{ width: 40, height: 1, background: "rgba(13,148,136,0.4)", marginLeft: "auto", marginTop: 4 }} />
            </div>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(13,148,136,0.15)", border: "1px solid rgba(13,148,136,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>{f.icon}</div>
          </div>
        ))}

        {/* Feature callouts - RIGHT */}
        {features.filter(f => f.side === "right").map((f, i) => (
          <div key={i} style={{ position: "absolute", right: 10, top: f.top, display: "flex", alignItems: "center", gap: 8, zIndex: 3 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(13,148,136,0.15)", border: "1px solid rgba(13,148,136,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>{f.icon}</div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#F0FDFA" }}>{f.title}</div>
              <div style={{ width: 40, height: 1, background: "rgba(13,148,136,0.4)", marginTop: 4 }} />
            </div>
          </div>
        ))}

        {/* Phone mockup */}
        <div style={{ width: 180, borderRadius: 24, background: "#0F1F1E", border: "3px solid #1A3A38", boxShadow: "0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(13,148,136,0.1)", overflow: "hidden", zIndex: 2, position: "relative" }}>
          {/* Status bar */}
          <div style={{ height: 28, background: "#0A1716", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <div style={{ width: 60, height: 5, borderRadius: 99, background: "#1A3A38" }} />
          </div>

          {/* App content */}
          <div style={{ padding: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <div>
                <div style={{ fontSize: 8, color: "#5EEAD4" }}>Olá, Ana</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: "#F0FDFA" }}>Seu Painel</div>
              </div>
              <div style={{ width: 24, height: 24, borderRadius: "50%", background: "linear-gradient(135deg, #0D9488, #14B8A6)" }} />
            </div>

            {/* Next appointment card */}
            <div style={{ background: "linear-gradient(135deg, rgba(13,148,136,0.2), rgba(20,184,166,0.1))", borderRadius: 10, padding: 10, marginBottom: 10, border: "1px solid rgba(13,148,136,0.2)" }}>
              <div style={{ fontSize: 7, color: "#5EEAD4", textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>Próxima consulta</div>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#F0FDFA" }}>Dr. Silva</div>
              <div style={{ fontSize: 9, color: "#99F6E4" }}>Cardiologia · 14:00</div>
            </div>

            {/* Vitals mini cards */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, marginBottom: 10 }}>
              {[
                { label: "Heart", val: "72", unit: "bpm", color: "#F87171" },
                { label: "SpO2", val: "98", unit: "%", color: "#22D3EE" },
                { label: "Press.", val: "120/80", unit: "", color: "#A78BFA" },
                { label: "Temp.", val: "36.5", unit: "°C", color: "#34D399" },
              ].map((v, i) => (
                <div key={i} style={{ background: "rgba(255,255,255,0.03)", borderRadius: 8, padding: "6px 8px", border: "1px solid rgba(255,255,255,0.05)" }}>
                  <div style={{ fontSize: 7, color: "#64748B" }}>{v.label}</div>
                  <div style={{ fontSize: 14, fontWeight: 800, color: v.color }}>{v.val}<span style={{ fontSize: 8, fontWeight: 400 }}>{v.unit}</span></div>
                </div>
              ))}
            </div>

            {/* Quick actions */}
            <div style={{ display: "flex", gap: 6, justifyContent: "center" }}>
              {["\uD83D\uDCC5", "\uD83D\uDCAC", "\uD83D\uDC8A"].map((ic, i) => (
                <div key={i} style={{ width: 32, height: 32, borderRadius: 8, background: "rgba(13,148,136,0.1)", border: "1px solid rgba(13,148,136,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>{ic}</div>
              ))}
            </div>
          </div>

          {/* Bottom nav */}
          <div style={{ display: "flex", justifyContent: "space-around", padding: "8px 0", borderTop: "1px solid rgba(255,255,255,0.05)", marginTop: 6 }}>
            {["\u2302", "\uD83D\uDCC5", "\uD83D\uDCAC", "\u2699"].map((ic, i) => (
              <span key={i} style={{ fontSize: 12, color: i === 0 ? "#14B8A6" : "#3F3F46" }}>{ic}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom stats */}
      <div style={{ display: "flex", gap: 24, justifyContent: "center", marginTop: 16, position: "relative", zIndex: 2 }}>
        {[
          { label: "Patients", val: "4.8k" },
          { label: "Satisfaction", val: "4.9/5" },
          { label: "Wait Time", val: "8min" },
        ].map((s, i) => (
          <div key={i} style={{ textAlign: "center" }}>
            <div style={{ fontSize: 18, fontWeight: 800, color: "#2DD4BF" }}>{s.val}</div>
            <div style={{ fontSize: 9, color: "#5EEAD4", opacity: 0.6 }}>{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HealthBridgePreview;
