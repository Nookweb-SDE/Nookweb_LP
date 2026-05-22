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
        src="https://monosphera-aegis.vercel.app/"
        title="Monosphera"
        style={{
          width: "100%",
          height: "594px",
          border: "none",
          overflow: "hidden",
        }}
        sandbox="allow-scripts allow-popups allow-forms"
      />
    </div>
  );
}
