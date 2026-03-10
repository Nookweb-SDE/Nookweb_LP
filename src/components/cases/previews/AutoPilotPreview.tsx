import React from "react";

/* ====== TIMELINE / KANBAN — Horizontal flow, step cards, warm orange ====== */
const AutoPilotPreview: React.FC = () => {
  const automations = [
    {
      name: "Lead Nurture", status: "running", steps: [
        { label: "New Lead", icon: "\u2709", done: true },
        { label: "Enrich Data", icon: "\uD83D\uDD0D", done: true },
        { label: "Score Lead", icon: "\u2B50", done: true },
        { label: "Send Email", icon: "\uD83D\uDCE7", done: false },
        { label: "Follow Up", icon: "\uD83D\uDD14", done: false },
      ], saved: "42h"
    },
    {
      name: "Invoice Automation", status: "running", steps: [
        { label: "Due Date", icon: "\uD83D\uDCC5", done: true },
        { label: "Gen Invoice", icon: "\uD83D\uDCC4", done: true },
        { label: "Send", icon: "\u2709", done: false },
      ], saved: "18h"
    },
    {
      name: "Weekly Report", status: "idle", steps: [
        { label: "Collect", icon: "\uD83D\uDCCA", done: false },
        { label: "Aggregate", icon: "\u2699", done: false },
        { label: "Format", icon: "\uD83C\uDFA8", done: false },
        { label: "Deliver", icon: "\uD83D\uDCE8", done: false },
      ], saved: "8h"
    },
  ];

  return (
    <div style={{ background: "#1A0F00", backgroundImage: "radial-gradient(ellipse at 50% 0%, rgba(249,115,22,0.08), transparent 60%)", width: "100%", minHeight: 420, fontFamily: "'Inter',system-ui,sans-serif", color: "#FED7AA", position: "relative", overflow: "hidden", padding: 24 }}>
      {/* Warm ambient */}
      <div style={{ position: "absolute", top: -80, right: -80, width: 300, height: 300, borderRadius: "50%", background: "rgba(249,115,22,0.04)", filter: "blur(60px)" }} />

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24, position: "relative" }}>
        <div>
          <div style={{ fontSize: 24, fontWeight: 900, color: "#FFF7ED", letterSpacing: -1 }}>AutoPilot</div>
          <div style={{ fontSize: 11, color: "#92400E", marginTop: 2 }}>No-Code Business Automation</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 36, fontWeight: 900, color: "#F97316", letterSpacing: -2, lineHeight: 1, textShadow: "0 0 30px rgba(249,115,22,0.3)" }}>136h</div>
          <div style={{ fontSize: 9, color: "#92400E", marginTop: 4, textTransform: "uppercase", letterSpacing: 1 }}>saved this month</div>
        </div>
      </div>

      {/* Automation timeline cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {automations.map((a, ai) => {
          const progressPct = Math.round((a.steps.filter(s => s.done).length / a.steps.length) * 100);
          return (
            <div key={ai} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(249,115,22,0.1)", borderRadius: 14, padding: 16, position: "relative", overflow: "hidden" }}>
              {/* Top accent line based on progress */}
              <div style={{ position: "absolute", top: 0, left: 0, width: progressPct + "%", height: 2, background: "linear-gradient(90deg, #F97316, #FB923C)", boxShadow: "0 0 10px rgba(249,115,22,0.4)" }} />

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: "#FFF7ED" }}>{a.name}</span>
                  <span style={{ fontSize: 8, padding: "2px 8px", borderRadius: 99, background: a.status === "running" ? "rgba(249,115,22,0.15)" : "rgba(161,161,170,0.1)", color: a.status === "running" ? "#FB923C" : "#71717A", border: `1px solid ${a.status === "running" ? "rgba(249,115,22,0.3)" : "rgba(161,161,170,0.15)"}` }}>{a.status === "running" ? "\u25CF Running" : "\u25CB Idle"}</span>
                </div>
                <div style={{ fontSize: 10, color: "#92400E" }}>
                  Saved <span style={{ color: "#F97316", fontWeight: 700 }}>{a.saved}</span>/mo
                </div>
              </div>

              {/* Horizontal timeline steps */}
              <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
                {a.steps.map((step, si) => (
                  <React.Fragment key={si}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, minWidth: 56 }}>
                      <div style={{
                        width: 36, height: 36, borderRadius: 10,
                        background: step.done ? "rgba(249,115,22,0.15)" : "rgba(255,255,255,0.03)",
                        border: step.done ? "1.5px solid rgba(249,115,22,0.4)" : "1.5px dashed rgba(255,255,255,0.1)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 16,
                        boxShadow: step.done ? "0 0 12px rgba(249,115,22,0.2)" : "none",
                      }}>{step.icon}</div>
                      <span style={{ fontSize: 8, color: step.done ? "#FED7AA" : "#52525B", fontWeight: step.done ? 600 : 400, textAlign: "center" }}>{step.label}</span>
                    </div>
                    {si < a.steps.length - 1 && (
                      <div style={{ flex: 1, height: 2, background: step.done ? "rgba(249,115,22,0.3)" : "rgba(255,255,255,0.05)", minWidth: 12, marginTop: -14, borderRadius: 1 }} />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom CTA */}
      <div style={{ marginTop: 16, display: "flex", justifyContent: "center" }}>
        <div style={{ padding: "8px 24px", borderRadius: 99, background: "linear-gradient(135deg, #F97316, #EA580C)", fontSize: 11, fontWeight: 700, color: "#fff", boxShadow: "0 4px 20px rgba(249,115,22,0.4)", cursor: "pointer", letterSpacing: 0.3 }}>+ New Automation</div>
      </div>
    </div>
  );
};

export default AutoPilotPreview;
