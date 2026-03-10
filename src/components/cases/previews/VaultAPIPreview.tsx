import React from "react";

/* ====== API DOCS STYLE — Code blocks, syntax colors, endpoint cards ====== */
const VaultAPIPreview: React.FC = () => {
  const endpoints = [
    { method: "POST", path: "/v1/accounts", desc: "Create a new bank account", status: 201 },
    { method: "GET", path: "/v1/balance/:id", desc: "Retrieve account balance", status: 200 },
    { method: "POST", path: "/v1/transfers", desc: "Initiate a wire transfer", status: 200 },
  ];
  const methodBg = (m: string) => m === "POST" ? { bg: "#854D0E", color: "#FDE68A", border: "#92400E" } : { bg: "#064E3B", color: "#6EE7B7", border: "#065F46" };

  return (
    <div style={{ display: "flex", width: "100%", minHeight: 420, fontFamily: "'Inter',system-ui,sans-serif", overflow: "hidden" }}>
      {/* Left: Doc nav */}
      <div style={{ width: 170, background: "#111113", borderRight: "1px solid #27272A", padding: "20px 0", flexShrink: 0 }}>
        <div style={{ padding: "0 16px", marginBottom: 20 }}>
          <div style={{ fontSize: 14, fontWeight: 800, color: "#FDE68A", letterSpacing: -0.3 }}>VaultAPI</div>
          <div style={{ fontSize: 9, color: "#52525B", marginTop: 2 }}>v2.4.1 · REST</div>
        </div>
        <div style={{ fontSize: 8, color: "#52525B", textTransform: "uppercase", letterSpacing: 1.5, padding: "0 16px", marginBottom: 8 }}>Getting Started</div>
        {["Authentication", "Rate Limits", "Errors"].map((t, i) => (
          <div key={i} style={{ padding: "6px 16px", fontSize: 11, color: "#71717A", cursor: "pointer" }}>{t}</div>
        ))}
        <div style={{ fontSize: 8, color: "#52525B", textTransform: "uppercase", letterSpacing: 1.5, padding: "0 16px", margin: "12px 0 8px" }}>Endpoints</div>
        {["Accounts", "Balance", "Transfers", "Webhooks"].map((t, i) => (
          <div key={i} style={{ padding: "6px 16px", fontSize: 11, color: i === 0 ? "#FDE68A" : "#71717A", background: i === 0 ? "rgba(253,230,138,0.05)" : "transparent", borderLeft: i === 0 ? "2px solid #F59E0B" : "2px solid transparent", cursor: "pointer", fontWeight: i === 0 ? 600 : 400 }}>{t}</div>
        ))}
        <div style={{ fontSize: 8, color: "#52525B", textTransform: "uppercase", letterSpacing: 1.5, padding: "0 16px", margin: "12px 0 8px" }}>SDKs</div>
        {["Node.js", "Python", "Go"].map((t, i) => (
          <div key={i} style={{ padding: "6px 16px", fontSize: 11, color: "#71717A" }}>{t}</div>
        ))}
      </div>

      {/* Right: Content */}
      <div style={{ flex: 1, background: "#09090B", padding: 24, overflowY: "auto" }}>
        <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 6 }}>
          <span style={{ fontSize: 8, padding: "2px 8px", borderRadius: 4, background: "#14532D", color: "#86EFAC", fontWeight: 700, fontFamily: "monospace" }}>STABLE</span>
          <span style={{ fontSize: 8, color: "#52525B" }}>Base URL: api.vaultapi.io</span>
        </div>
        <h1 style={{ fontSize: 22, fontWeight: 800, color: "#FAFAFA", margin: "0 0 4px", letterSpacing: -0.5 }}>Accounts</h1>
        <p style={{ fontSize: 11, color: "#71717A", lineHeight: 1.5, margin: "0 0 20px" }}>Create and manage banking accounts via the Vault API.</p>

        {/* Endpoint cards */}
        {endpoints.map((e, i) => {
          const mc = methodBg(e.method);
          return (
            <div key={i} style={{ background: "#111113", border: "1px solid #27272A", borderRadius: 10, marginBottom: 12, overflow: "hidden" }}>
              <div style={{ padding: "10px 14px", display: "flex", alignItems: "center", gap: 10, borderBottom: "1px solid #1C1C1E" }}>
                <span style={{ fontSize: 9, fontWeight: 800, padding: "3px 8px", borderRadius: 4, background: mc.bg, color: mc.color, border: `1px solid ${mc.border}`, fontFamily: "monospace" }}>{e.method}</span>
                <span style={{ fontSize: 12, fontFamily: "'JetBrains Mono',monospace", color: "#E4E4E7", fontWeight: 500 }}>{e.path}</span>
                <span style={{ marginLeft: "auto", fontSize: 9, color: "#52525B" }}>{e.desc}</span>
              </div>
              {i === 0 && (
                <div style={{ padding: "12px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 10, lineHeight: 1.8 }}>
                  <div style={{ color: "#52525B" }}>{"// Request body"}</div>
                  <div>
                    <span style={{ color: "#52525B" }}>{"{"}</span><br/>
                    <span style={{ color: "#71717A" }}>{"  "}</span><span style={{ color: "#FDE68A" }}>"name"</span><span style={{ color: "#52525B" }}>: </span><span style={{ color: "#86EFAC" }}>"Acme Corp"</span><span style={{ color: "#52525B" }}>,</span><br/>
                    <span style={{ color: "#71717A" }}>{"  "}</span><span style={{ color: "#FDE68A" }}>"type"</span><span style={{ color: "#52525B" }}>: </span><span style={{ color: "#86EFAC" }}>"business"</span><span style={{ color: "#52525B" }}>,</span><br/>
                    <span style={{ color: "#71717A" }}>{"  "}</span><span style={{ color: "#FDE68A" }}>"currency"</span><span style={{ color: "#52525B" }}>: </span><span style={{ color: "#86EFAC" }}>"BRL"</span><br/>
                    <span style={{ color: "#52525B" }}>{"}"}</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {/* Response example */}
        <div style={{ background: "#111113", border: "1px solid #27272A", borderRadius: 10, overflow: "hidden" }}>
          <div style={{ padding: "8px 14px", borderBottom: "1px solid #1C1C1E", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 10, fontWeight: 600, color: "#A1A1AA" }}>Response</span>
            <span style={{ fontSize: 9, padding: "2px 6px", borderRadius: 4, background: "#14532D", color: "#86EFAC", fontFamily: "monospace" }}>201</span>
          </div>
          <div style={{ padding: "12px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 10, lineHeight: 1.8 }}>
            <span style={{ color: "#52525B" }}>{"{"}</span><br/>
            <span style={{ color: "#71717A" }}>{"  "}</span><span style={{ color: "#FDE68A" }}>"id"</span><span style={{ color: "#52525B" }}>: </span><span style={{ color: "#86EFAC" }}>"acc_1a2b3c4d"</span><span style={{ color: "#52525B" }}>,</span><br/>
            <span style={{ color: "#71717A" }}>{"  "}</span><span style={{ color: "#FDE68A" }}>"status"</span><span style={{ color: "#52525B" }}>: </span><span style={{ color: "#86EFAC" }}>"active"</span><span style={{ color: "#52525B" }}>,</span><br/>
            <span style={{ color: "#71717A" }}>{"  "}</span><span style={{ color: "#FDE68A" }}>"balance"</span><span style={{ color: "#52525B" }}>: </span><span style={{ color: "#C4B5FD" }}>0.00</span><span style={{ color: "#52525B" }}>,</span><br/>
            <span style={{ color: "#71717A" }}>{"  "}</span><span style={{ color: "#FDE68A" }}>"created_at"</span><span style={{ color: "#52525B" }}>: </span><span style={{ color: "#86EFAC" }}>"2025-03-06T14:30:00Z"</span><br/>
            <span style={{ color: "#52525B" }}>{"}"}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VaultAPIPreview;
