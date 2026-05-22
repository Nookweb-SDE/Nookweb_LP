export default function MonospheraDashboardPreview() {
  return (
    <div style={{ width: "100%", height: "594px", overflow: "hidden", background: "#0a0e14" }}>
      <iframe
        src="https://monosphera-aegis.vercel.app/dashboard-preview"
        title="Monosphera Dashboard"
        style={{ width: "100%", height: "100%", border: "none" }}
      />
    </div>
  );
}
