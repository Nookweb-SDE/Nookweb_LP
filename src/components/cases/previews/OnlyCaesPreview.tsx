const IFRAME_URL = "https://onlycaes.bubbleapps.io/version-test?debug_mode=true";

export default function OnlyCaesPreview() {
  return (
    <div
      style={{
        width: "100%",
        minHeight: "420px",
        height: "594px",
        overflow: "hidden",
        background: "#1a1a2e",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "8px 12px",
          background: "rgba(0,0,0,0.6)",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <span style={{ fontSize: "11px", fontWeight: 600, color: "#e0e0e0" }}>OnlyCaes</span>
        <a
          href={IFRAME_URL}
          target="_blank"
          rel="noopener noreferrer"
          style={{ fontSize: "10px", fontWeight: 600, color: "#6366f1", textDecoration: "none" }}
        >
          Abrir em nova aba →
        </a>
      </div>
      <div style={{ flex: 1, position: "relative", overflow: "hidden", minHeight: 0 }}>
        <iframe
          src={IFRAME_URL}
          title="OnlyCaes"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "200%",
            height: "200%",
            border: "none",
            transform: "scale(0.5)",
            transformOrigin: "top left",
            display: "block",
          }}
        />
      </div>
    </div>
  );
}
