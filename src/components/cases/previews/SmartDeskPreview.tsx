import React from "react";

/* ====== CHAT APP INTERFACE — Sidebar conversations + bubbles + typing indicator ====== */
const SmartDeskPreview: React.FC = () => {
  const conversations = [
    { name: "Maria Santos", msg: "Meu pedido não chegou...", time: "2m", unread: 2, ai: true },
    { name: "João Silva", msg: "Como altero meu plano?", time: "8m", unread: 0, ai: true },
    { name: "Ana Costa", msg: "Preciso de reembolso", time: "15m", unread: 1, ai: false },
    { name: "Pedro Lima", msg: "API key expirou", time: "1h", unread: 0, ai: true },
    { name: "Carla Dias", msg: "Bug no checkout mobile", time: "2h", unread: 0, ai: false },
  ];
  const messages = [
    { role: "user", text: "Meu pedido #4521 ainda não chegou, já tem 5 dias" },
    { role: "ai", text: "Encontrei seu pedido! Ele está em trânsito via Correios. Rastreio: BR123456789. Previsão de entrega: amanhã até 14h." },
    { role: "user", text: "Posso alterar o endereço de entrega?" },
    { role: "ai", text: "Sim! O pedido ainda permite alteração. Qual o novo endereço?" },
  ];

  return (
    <div style={{ display: "flex", width: "100%", minHeight: 420, fontFamily: "'Inter',system-ui,sans-serif", overflow: "hidden" }}>
      {/* Conversations sidebar */}
      <div style={{ width: 200, background: "#0E0B16", borderRight: "1px solid rgba(139,92,246,0.1)", display: "flex", flexDirection: "column" }}>
        <div style={{ padding: "16px 14px 12px", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <span style={{ fontSize: 14, fontWeight: 800, color: "#FAFAFA" }}>SmartDesk</span>
            <span style={{ fontSize: 8, padding: "2px 6px", borderRadius: 4, background: "rgba(139,92,246,0.15)", color: "#C4B5FD" }}>AI</span>
          </div>
          <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 6, padding: "6px 10px", fontSize: 10, color: "#52525B" }}>{"\uD83D\uDD0D"} Search conversations...</div>
        </div>

        <div style={{ flex: 1, overflow: "hidden" }}>
          {conversations.map((c, i) => (
            <div key={i} style={{ padding: "10px 14px", display: "flex", gap: 8, alignItems: "flex-start", borderBottom: "1px solid rgba(255,255,255,0.03)", background: i === 0 ? "rgba(139,92,246,0.08)" : "transparent", borderLeft: i === 0 ? "2px solid #8B5CF6" : "2px solid transparent", cursor: "pointer" }}>
              <div style={{ width: 28, height: 28, borderRadius: "50%", background: `hsl(${260 + i * 30}, 50%, ${30 + i * 5}%)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, color: "#C4B5FD", flexShrink: 0 }}>{c.name[0]}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 10, fontWeight: 600, color: "#E2E8F0" }}>{c.name}</span>
                  <span style={{ fontSize: 8, color: "#52525B" }}>{c.time}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 2 }}>
                  {c.ai && <span style={{ fontSize: 7, color: "#8B5CF6" }}>{"\u2728"}</span>}
                  <span style={{ fontSize: 9, color: "#71717A", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{c.msg}</span>
                </div>
              </div>
              {c.unread > 0 && <span style={{ width: 16, height: 16, borderRadius: "50%", background: "#8B5CF6", color: "#fff", fontSize: 8, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{c.unread}</span>}
            </div>
          ))}
        </div>

        {/* Stats at bottom */}
        <div style={{ padding: "10px 14px", borderTop: "1px solid rgba(255,255,255,0.05)", background: "rgba(139,92,246,0.03)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 9 }}>
            <span style={{ color: "#52525B" }}>AI resolved</span>
            <span style={{ color: "#C4B5FD", fontWeight: 700 }}>87%</span>
          </div>
          <div style={{ height: 3, borderRadius: 2, background: "rgba(255,255,255,0.04)", marginTop: 4 }}>
            <div style={{ width: "87%", height: "100%", borderRadius: 2, background: "linear-gradient(90deg, #8B5CF6, #C4B5FD)" }} />
          </div>
        </div>
      </div>

      {/* Chat area */}
      <div style={{ flex: 1, background: "#0A0812", display: "flex", flexDirection: "column" }}>
        {/* Chat header */}
        <div style={{ padding: "12px 16px", borderBottom: "1px solid rgba(255,255,255,0.05)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 28, height: 28, borderRadius: "50%", background: "hsl(260,50%,30%)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, color: "#C4B5FD" }}>M</div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 600, color: "#E2E8F0" }}>Maria Santos</div>
              <div style={{ fontSize: 8, color: "#8B5CF6" }}>{"\u2728"} AI handling · Ticket #4892</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <span style={{ fontSize: 8, padding: "3px 8px", borderRadius: 4, background: "rgba(34,197,94,0.1)", color: "#22C55E", border: "1px solid rgba(34,197,94,0.2)" }}>{"\u2713"} Resolved in 48s</span>
          </div>
        </div>

        {/* Messages */}
        <div style={{ flex: 1, padding: 16, display: "flex", flexDirection: "column", gap: 10, overflow: "hidden" }}>
          {messages.map((m, i) => (
            <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start", gap: 6 }}>
              {m.role === "ai" && (
                <div style={{ width: 22, height: 22, borderRadius: 6, background: "linear-gradient(135deg, #8B5CF6, #7C3AED)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, flexShrink: 0 }}>{"\u2728"}</div>
              )}
              <div style={{
                maxWidth: "75%", padding: "10px 14px", fontSize: 11, lineHeight: 1.5,
                borderRadius: m.role === "user" ? "12px 12px 2px 12px" : "12px 12px 12px 2px",
                background: m.role === "user" ? "rgba(139,92,246,0.15)" : "rgba(255,255,255,0.04)",
                border: m.role === "user" ? "1px solid rgba(139,92,246,0.25)" : "1px solid rgba(255,255,255,0.06)",
                color: m.role === "user" ? "#DDD6FE" : "#CBD5E1",
              }}>
                {m.text}
              </div>
            </div>
          ))}
          {/* Typing indicator */}
          <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
            <div style={{ width: 22, height: 22, borderRadius: 6, background: "linear-gradient(135deg, #8B5CF6, #7C3AED)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10 }}>{"\u2728"}</div>
            <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: "8px 14px", display: "flex", gap: 4 }}>
              {[0, 1, 2].map(d => (
                <div key={d} style={{ width: 5, height: 5, borderRadius: "50%", background: "#8B5CF6", opacity: 0.4 + d * 0.2 }} />
              ))}
            </div>
          </div>
        </div>

        {/* Input area */}
        <div style={{ padding: "12px 16px", borderTop: "1px solid rgba(255,255,255,0.05)", display: "flex", gap: 8, alignItems: "center" }}>
          <div style={{ flex: 1, background: "rgba(255,255,255,0.04)", borderRadius: 10, padding: "8px 14px", fontSize: 10, color: "#52525B", border: "1px solid rgba(255,255,255,0.06)" }}>Type a message...</div>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: "linear-gradient(135deg, #8B5CF6, #7C3AED)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, cursor: "pointer", boxShadow: "0 4px 12px rgba(139,92,246,0.3)" }}>{"\u2191"}</div>
        </div>
      </div>
    </div>
  );
};

export default SmartDeskPreview;
