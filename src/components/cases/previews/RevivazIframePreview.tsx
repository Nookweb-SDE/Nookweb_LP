export default function RevivazIframePreview() {
  return (
    <div style={{ width: "100%", height: "594px", overflow: "hidden", background: "#0a0e14" }}>
      <iframe
        src="https://revivaz.vercel.app/"
        title="Revivaz — Saúde mental solidária"
        style={{
          width: "200%",
          height: "200%",
          border: "none",
          transform: "scale(0.5)",
          transformOrigin: "top left",
          display: "block",
        }}
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
      />
    </div>
  );
}
