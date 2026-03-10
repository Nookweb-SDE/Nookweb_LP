import React from "react";

/* ====== E-COMMERCE GRID — Product cards, clean white, star ratings ====== */
const QuickMarketPreview: React.FC = () => {
  const products = [
    { name: "Premium UI Kit", price: "R$197", oldPrice: "R$297", rating: 4.9, reviews: 342, tag: "Best Seller", color: "#059669" },
    { name: "API Starter Pack", price: "R$349", oldPrice: null, rating: 4.8, reviews: 156, tag: "New", color: "#6366F1" },
    { name: "Dashboard Pro", price: "R$129", oldPrice: "R$199", rating: 4.7, reviews: 891, tag: "-35%", color: "#F59E0B" },
    { name: "Auth Module", price: "R$249", oldPrice: null, rating: 4.9, reviews: 234, tag: "Popular", color: "#EF4444" },
    { name: "E-mail Templates", price: "R$79", oldPrice: "R$149", rating: 4.6, reviews: 567, tag: "-47%", color: "#8B5CF6" },
    { name: "Form Builder", price: "R$159", oldPrice: null, rating: 4.8, reviews: 189, tag: "New", color: "#06B6D4" },
  ];
  const cats = ["All", "Templates", "Plugins", "UI Kits", "Modules"];

  return (
    <div style={{ background: "#FAFAFA", width: "100%", minHeight: 420, fontFamily: "'Inter',system-ui,sans-serif", color: "#1F2937", overflow: "hidden" }}>
      {/* Top bar */}
      <div style={{ background: "#fff", borderBottom: "1px solid #E5E7EB", padding: "12px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 24, height: 24, borderRadius: 6, background: "#059669", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, color: "#fff", fontWeight: 900 }}>Q</div>
          <span style={{ fontSize: 14, fontWeight: 800, letterSpacing: -0.3 }}>QuickMarket</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ background: "#F3F4F6", borderRadius: 8, padding: "6px 14px", display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ fontSize: 11, color: "#9CA3AF" }}>{"\uD83D\uDD0D"} Search products...</span>
          </div>
          <div style={{ position: "relative" }}>
            <span style={{ fontSize: 16 }}>{"\uD83D\uDED2"}</span>
            <span style={{ position: "absolute", top: -4, right: -6, width: 14, height: 14, borderRadius: "50%", background: "#EF4444", color: "#fff", fontSize: 8, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>3</span>
          </div>
        </div>
      </div>

      <div style={{ padding: "16px 20px" }}>
        {/* Categories */}
        <div style={{ display: "flex", gap: 6, marginBottom: 16 }}>
          {cats.map((c, i) => (
            <span key={c} style={{ fontSize: 10, padding: "5px 12px", borderRadius: 99, background: i === 0 ? "#059669" : "#fff", color: i === 0 ? "#fff" : "#6B7280", border: i === 0 ? "none" : "1px solid #E5E7EB", fontWeight: i === 0 ? 600 : 400, cursor: "pointer" }}>{c}</span>
          ))}
        </div>

        {/* Product grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
          {products.map((p, i) => (
            <div key={i} style={{ background: "#fff", borderRadius: 12, border: "1px solid #E5E7EB", overflow: "hidden", transition: "all 0.2s" }}>
              {/* Product image placeholder */}
              <div style={{ height: 70, background: `linear-gradient(135deg, ${p.color}15, ${p.color}08)`, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                <div style={{ width: 36, height: 36, borderRadius: 8, background: `${p.color}20`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <div style={{ width: 20, height: 20, borderRadius: 4, background: `${p.color}40` }} />
                </div>
                <span style={{ position: "absolute", top: 6, left: 6, fontSize: 8, padding: "2px 6px", borderRadius: 4, background: p.tag.startsWith("-") ? "#FEE2E2" : p.tag === "New" ? "#DBEAFE" : p.tag === "Best Seller" ? "#D1FAE5" : "#FEF3C7", color: p.tag.startsWith("-") ? "#DC2626" : p.tag === "New" ? "#2563EB" : p.tag === "Best Seller" ? "#059669" : "#D97706", fontWeight: 700 }}>{p.tag}</span>
              </div>
              <div style={{ padding: "10px 12px" }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#111827", marginBottom: 4 }}>{p.name}</div>
                <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 6 }}>
                  <span style={{ fontSize: 10, color: "#F59E0B" }}>{"\u2605".repeat(Math.floor(p.rating))}</span>
                  <span style={{ fontSize: 9, color: "#9CA3AF" }}>{p.rating} ({p.reviews})</span>
                </div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
                  <span style={{ fontSize: 15, fontWeight: 800, color: "#059669" }}>{p.price}</span>
                  {p.oldPrice && <span style={{ fontSize: 10, color: "#D1D5DB", textDecoration: "line-through" }}>{p.oldPrice}</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuickMarketPreview;
