import React from "react";

/* ====== MAGAZINE EDITORIAL — Multi-column, large display type, pull quotes ====== */
const EduFlowPreview: React.FC = () => {
  const courses = [
    { title: "React Avançado", students: "1.2k", tag: "Popular", cover: "#1E293B" },
    { title: "Node.js Mastery", students: "890", tag: "New", cover: "#1C1917" },
    { title: "UI/UX Design", students: "2.1k", tag: "Trending", cover: "#172554" },
  ];

  return (
    <div style={{ background: "#FFFBEB", width: "100%", minHeight: 420, fontFamily: "'Georgia','Times New Roman',serif", color: "#1C1917", position: "relative", overflow: "hidden" }}>
      {/* Top accent bar */}
      <div style={{ height: 4, background: "linear-gradient(90deg, #EAB308, #F59E0B, #D97706)" }} />

      <div style={{ padding: "20px 24px" }}>
        {/* Magazine header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", borderBottom: "2px solid #1C1917", paddingBottom: 12, marginBottom: 20 }}>
          <div>
            <div style={{ fontSize: 32, fontWeight: 900, letterSpacing: -1.5, lineHeight: 1, fontFamily: "'Georgia',serif", color: "#1C1917" }}>EduFlow</div>
            <div style={{ fontSize: 10, fontFamily: "'Inter',sans-serif", color: "#78716C", letterSpacing: 3, textTransform: "uppercase", marginTop: 4 }}>Learning Management System</div>
          </div>
          <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 9, color: "#A8A29E" }}>Edition 2025 · Vol. 3</div>
        </div>

        {/* Feature hero */}
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 20, marginBottom: 20 }}>
          <div>
            <div style={{ fontSize: 9, fontFamily: "'Inter',sans-serif", textTransform: "uppercase", letterSpacing: 2, color: "#D97706", fontWeight: 600, marginBottom: 8 }}>Featured Story</div>
            <div style={{ fontSize: 22, fontWeight: 700, lineHeight: 1.2, color: "#1C1917", marginBottom: 10 }}>87% dos alunos concluem os cursos na nossa plataforma</div>
            <div style={{ fontSize: 12, lineHeight: 1.7, color: "#57534E", fontStyle: "italic", borderLeft: "3px solid #EAB308", paddingLeft: 14 }}>
              "A taxa de conclusão é 3x maior que a média do mercado, provando que design instrucional importa."
            </div>
            <div style={{ display: "flex", gap: 20, marginTop: 14, fontFamily: "'Inter',sans-serif" }}>
              {[
                { n: "4.8k", l: "Alunos" },
                { n: "24", l: "Cursos" },
                { n: "R$92k", l: "Revenue" },
              ].map((s, i) => (
                <div key={i}>
                  <div style={{ fontSize: 20, fontWeight: 900, color: "#D97706", fontFamily: "'Inter',sans-serif" }}>{s.n}</div>
                  <div style={{ fontSize: 9, color: "#A8A29E", textTransform: "uppercase", letterSpacing: 1 }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar column */}
          <div style={{ borderLeft: "1px solid #E7E5E4", paddingLeft: 16 }}>
            <div style={{ fontSize: 9, fontFamily: "'Inter',sans-serif", textTransform: "uppercase", letterSpacing: 2, color: "#D97706", fontWeight: 600, marginBottom: 12 }}>Top Rated</div>
            {[
              { title: "React Avançado", rating: "4.9", students: "1.2k alunos" },
              { title: "Node.js Mastery", rating: "4.8", students: "890 alunos" },
              { title: "UI/UX Design", rating: "4.7", students: "2.1k alunos" },
              { title: "DevOps Pro", rating: "4.9", students: "560 alunos" },
            ].map((c, i) => (
              <div key={i} style={{ padding: "8px 0", borderBottom: i < 3 ? "1px solid #F5F5F4" : "none" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <span style={{ fontSize: 12, fontWeight: 600, color: "#1C1917" }}>{c.title}</span>
                  <span style={{ fontSize: 10, color: "#D97706", fontFamily: "'Inter',sans-serif", fontWeight: 700 }}>{"\u2605"} {c.rating}</span>
                </div>
                <div style={{ fontSize: 9, color: "#A8A29E", fontFamily: "'Inter',sans-serif", marginTop: 2 }}>{c.students}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Course cards row - magazine style */}
        <div style={{ borderTop: "1px solid #E7E5E4", paddingTop: 16 }}>
          <div style={{ fontSize: 9, fontFamily: "'Inter',sans-serif", textTransform: "uppercase", letterSpacing: 2, color: "#D97706", fontWeight: 600, marginBottom: 12 }}>Latest Courses</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
            {courses.map((c, i) => (
              <div key={i} style={{ overflow: "hidden", borderRadius: 8, border: "1px solid #E7E5E4" }}>
                <div style={{ height: 60, background: c.cover, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                  <span style={{ fontSize: 24, opacity: 0.3 }}>{"\uD83D\uDCDA"}</span>
                  <span style={{ position: "absolute", top: 6, right: 6, fontSize: 8, padding: "2px 6px", borderRadius: 4, background: "#EAB308", color: "#1C1917", fontWeight: 700, fontFamily: "'Inter',sans-serif" }}>{c.tag}</span>
                </div>
                <div style={{ padding: "10px 12px", background: "#fff" }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "#1C1917", marginBottom: 2 }}>{c.title}</div>
                  <div style={{ fontSize: 9, color: "#A8A29E", fontFamily: "'Inter',sans-serif" }}>{c.students} alunos matriculados</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EduFlowPreview;
