export default function MonospheraPreview() {
  return (
    <div
      style={{
        background: "#0a0e14",
        minHeight: "420px",
        maxHeight: "594px",
        overflow: "hidden",
      }}
    >
      <iframe
        src="/monosphera/index.html"
        title="Monosphera"
        style={{
          width: "100%",
          height: "594px",
          border: "none",
          overflow: "hidden",
        }}
        sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
      />
    </div>
  );
}
