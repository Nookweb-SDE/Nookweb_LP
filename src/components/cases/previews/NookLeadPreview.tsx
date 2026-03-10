export default function NookLeadPreview() {
  return (
    <div style={{ width: "100%", height: "594px", overflow: "hidden", background: "#071330" }}>
      <iframe
        src="https://nooklead.com.br"
        title="Nooklead"
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
