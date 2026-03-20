import React, { useEffect, useMemo, useState } from "react";

type Variant = 0 | 1 | 2;

const CASES = [
  {
    image: "/case-graphics/n8n/n8n-blog-ia.png",
  },
  {
    image: "/case-graphics/n8n/n8n-etl-diario.png",
  },
  {
    image: "/case-graphics/n8n/n8n-baas-certificado.png",
  },
] as const;

interface Props {
  variant?: number;
}

const N8nPortfolioPreview: React.FC<Props> = ({ variant = 0 }) => {
  const index = Math.max(0, Math.min(2, variant)) as Variant;
  const current = CASES[index];
  const baseZoom = useMemo(() => (index === 0 ? 2.2 : 1.6), [index]);
  const [zoom, setZoom] = useState(baseZoom);

  useEffect(() => {
    setZoom(baseZoom);
  }, [baseZoom]);

  const zoomIn = () => setZoom((z) => Math.min(3.2, Number((z + 0.2).toFixed(2))));
  const zoomOut = () => setZoom((z) => Math.max(1, Number((z - 0.2).toFixed(2))));
  const reset = () => setZoom(baseZoom);

  return (
    <div
      style={{
        width: "100%",
        minHeight: 420,
        background: "#0f1116",
        color: "#E5E7EB",
        fontFamily: "'DM Sans', system-ui, sans-serif",
        padding: 16,
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 12,
          overflow: "hidden",
          background: "#111827",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "8px 10px",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
            background: "#0b1220",
          }}
        >
          <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: "rgba(255,255,255,0.6)" }}>
            Zoom: {Math.round(zoom * 100)}%
          </span>
          <div style={{ display: "flex", gap: 6 }}>
            <button type="button" onClick={zoomOut} style={{ fontSize: 11, padding: "4px 8px", borderRadius: 6, border: "1px solid rgba(255,255,255,0.16)", background: "#111827", color: "#E5E7EB" }}>-</button>
            <button type="button" onClick={reset} style={{ fontSize: 11, padding: "4px 8px", borderRadius: 6, border: "1px solid rgba(255,255,255,0.16)", background: "#111827", color: "#E5E7EB" }}>100%</button>
            <button type="button" onClick={zoomIn} style={{ fontSize: 11, padding: "4px 8px", borderRadius: 6, border: "1px solid rgba(255,255,255,0.16)", background: "#111827", color: "#E5E7EB" }}>+</button>
          </div>
        </div>

        <div
          style={{
            width: "100%",
            height: 380,
            overflowX: "auto",
            overflowY: "auto",
            background: "#0f1116",
            scrollbarWidth: "thin",
            padding: 8,
          }}
        >
          <div style={{ width: `${100 * zoom}%`, minWidth: "100%" }}>
            <img
              src={current.image}
              alt={`N8N case ${index + 1}`}
              style={{
                width: "100%",
                height: "auto",
                display: "block",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default N8nPortfolioPreview;
