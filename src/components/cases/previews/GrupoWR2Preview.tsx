export default function GrupoWR2Preview() {
  return (
    <div style={{ width: "100%", height: "594px", overflow: "hidden", background: "#0a0a0a" }}>
      <iframe
        src="https://grupowr2servicos.com.br"
        title="Grupo WR2 Serviços"
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
