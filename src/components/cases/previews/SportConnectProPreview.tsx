/* ═══════════════════════════════════════════════
   SPORTCONNECT PRO — Preview para App 1 (comunidades esportivas)
   Mesma estrutura de case: app preview + Mobile Manager + métricas + resultados
═══════════════════════════════════════════════ */

import { Calendar, Users, Zap, Trophy, CheckCircle, Plus } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BLUE = "#2563EB";
const YELLOW = "#EAB308";

interface Project {
  id: number;
  name: string;
  client: string;
  status: string;
  progress: number;
  stack: string[];
  validation: string;
  deadline: string;
}

function MobileManagerSectionSport() {
  const [projects, setProjects] = useState<Project[]>([
    { id: 1, name: "SportConnect Pro — Comunidades e Eventos Esportivos", client: "SportConnect", status: "Em Desenvolvimento", progress: 72, stack: ["Flutter", "Firebase", "Maps"], validation: "Semana 3/4", deadline: "2024-06-10" },
  ]);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ name: "", client: "", stack: "", deadline: "" });

  const addProject = (e: React.FormEvent) => {
    e.preventDefault();
    setProjects([{
      id: Date.now(),
      ...form,
      status: "Iniciando",
      progress: 5,
      stack: form.stack.split(",").map((s) => s.trim()),
      validation: "Semana 0/4",
    }, ...projects]);
    setModalOpen(false);
    setForm({ name: "", client: "", stack: "", deadline: "" });
  };

  return (
    <section style={{ padding: "12px 16px", background: "#fff", borderTop: "1px solid #e5e7eb" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
        <h2 style={{ fontSize: "14px", fontWeight: 700, color: "#111" }}>Mobile Manager</h2>
        <button
          type="button"
          onClick={() => setModalOpen(true)}
          style={{
            display: "flex", alignItems: "center", gap: "4px",
            padding: "6px 12px", background: BLUE, color: "#fff", border: "none",
            borderRadius: "8px", fontSize: "10px", fontWeight: 700,
          }}
        >
          <Plus size={12} />
          Novo Projeto
        </button>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <AnimatePresence>
          {projects.map((p) => (
            <motion.div
              key={p.id}
              layout
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              style={{
                background: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "10px",
              }}
            >
              <div style={{ fontSize: "9px", color: BLUE, fontWeight: 600, marginBottom: "2px" }}>{p.status}</div>
              <div style={{ fontSize: "11px", fontWeight: 700, color: "#111" }}>{p.name}</div>
              <div style={{ fontSize: "9px", color: "#666", marginBottom: "6px" }}>{p.client}</div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "8px", color: "#888", marginBottom: "4px" }}>
                <span>Progresso</span>
                <span>{p.progress}%</span>
              </div>
              <div style={{ height: "4px", background: "#e5e7eb", borderRadius: "2px", overflow: "hidden" }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${p.progress}%` }}
                  style={{ height: "100%", background: BLUE }}
                />
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "4px", marginTop: "6px" }}>
                {p.stack.map((s) => (
                  <span key={s} style={{ fontSize: "8px", padding: "2px 5px", background: "#dbeafe", borderRadius: "4px", color: "#1e40af" }}>{s}</span>
                ))}
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "6px", fontSize: "8px", color: "#888" }}>
                <span>● Validação: {p.validation}</span>
                <span>{p.deadline}</span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <AnimatePresence>
        {modalOpen && (
          <div style={{ position: "fixed", inset: 0, zIndex: 50, display: "flex", alignItems: "center", justifyContent: "center", padding: "16px" }}>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setModalOpen(false)} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }} />
            <motion.form
              onSubmit={addProject}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              style={{ position: "relative", background: "#fff", borderRadius: "12px", padding: "16px", width: "100%", maxWidth: "280px", boxShadow: "0 20px 40px rgba(0,0,0,0.3)", border: "1px solid #e5e7eb" }}
            >
              <h3 style={{ fontSize: "14px", fontWeight: 700, color: BLUE, marginBottom: "12px" }}>Novo Projeto</h3>
              {[
                { key: "name", label: "Nome", placeholder: "Ex: SportConnect Pro" },
                { key: "client", label: "Cliente", placeholder: "Nome da Empresa" },
                { key: "stack", label: "Stack (vírgula)", placeholder: "Flutter, Firebase" },
                { key: "deadline", label: "Prazo", type: "date" as const },
              ].map(({ key, label, placeholder, type }) => (
                <div key={key} style={{ marginBottom: "8px" }}>
                  <label style={{ display: "block", fontSize: "9px", color: "#666", marginBottom: "2px" }}>{label}</label>
                  <input
                    required
                    type={type ?? "text"}
                    value={(form as Record<string, string>)[key]}
                    onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                    placeholder={placeholder}
                    style={{ width: "100%", padding: "6px 8px", border: "1px solid #e5e7eb", borderRadius: "6px", fontSize: "11px", boxSizing: "border-box" }}
                  />
                </div>
              ))}
              <div style={{ display: "flex", gap: "8px", marginTop: "12px" }}>
                <button type="button" onClick={() => setModalOpen(false)} style={{ flex: 1, padding: "8px", border: "1px solid #e5e7eb", borderRadius: "6px", fontSize: "10px", background: "#f9fafb" }}>Cancelar</button>
                <button type="submit" style={{ flex: 1, padding: "8px", background: BLUE, color: "#fff", border: "none", borderRadius: "6px", fontSize: "10px", fontWeight: 700 }}>Criar</button>
              </div>
            </motion.form>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
const IMG_BASE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663394078707/Zucnh7qKDDq8P2GnzDE2PE";

const sports = [
  { name: "Futebol", members: 3421, events: 67, image: `${IMG_BASE}/sport-futebol-PVQvbFj6odbXhRf26CceGn.webp` },
  { name: "Basketball", members: 2156, events: 45, image: `${IMG_BASE}/sport-basketball-evyDkXoyykP4KuC5BdMkF8.webp` },
  { name: "Surf", members: 1876, events: 31, image: `${IMG_BASE}/sport-surf-9s5efDqDxm73vPnZaVNQBb.webp` },
  { name: "Skate", members: 1654, events: 34, image: `${IMG_BASE}/sport-skate-dvvUgDCpwgQfuHy6R4zdfS.webp` },
  { name: "Airsoft", members: 1243, events: 28, image: `${IMG_BASE}/sport-airsoft-ZJFZGJca2SUT4Q2RNV7UVi.webp` },
  { name: "Paintball", members: 987, events: 22, image: `${IMG_BASE}/sport-paintball-9WQCkYd8vnMa3sqSbHVMV3.webp` },
  { name: "Vôlei", members: 1432, events: 38, image: `${IMG_BASE}/sport-volei-Ch52mXaZwzy4mGdfobUpfU.webp` },
  { name: "Natação", members: 856, events: 19, image: `${IMG_BASE}/sport-natacao-K6f9ZNXT9kMoNkrGLUAt6H.webp` },
];

const eventsData = [
  { sport: "Futebol", title: "Pelada dos Campeões", date: "19 de jul. · 09:00", location: "Campo do Ibirapuera, São Paulo", participants: "18/22", level: "Todos os níveis", image: `${IMG_BASE}/sport-futebol-PVQvbFj6odbXhRf26CceGn.webp` },
  { sport: "Basketball", title: "Torneio 3x3 de Rua", date: "21 de jul. · 14:00", location: "Quadra Central, São Paulo", participants: "24/32", level: "Intermediário", image: `${IMG_BASE}/sport-basketball-evyDkXoyykP4KuC5BdMkF8.webp` },
  { sport: "Surf", title: "Surf Session Matinal", date: "24 de jul. · 06:00", location: "Praia do Rosa, Florianópolis", participants: "12/15", level: "Todos os níveis", image: `${IMG_BASE}/sport-surf-9s5efDqDxm73vPnZaVNQBb.webp` },
  { sport: "Airsoft", title: "Operação Noturna", date: "26 de jul. · 19:00", location: "Campo Tático, Campinas", participants: "18/20", level: "Avançado", image: `${IMG_BASE}/sport-airsoft-ZJFZGJca2SUT4Q2RNV7UVi.webp` },
];

export function SportConnectProPreview() {
  return (
    <div
      style={{
        background: "#f9fafb",
        minHeight: "400px",
        maxHeight: "594px",
        overflowY: "auto",
        fontFamily: "'DM Sans',sans-serif",
      }}
    >
      {/* Hero label */}
      <div style={{ padding: "8px 12px", background: "#eff6ff", borderBottom: "1px solid #dbeafe", textAlign: "center" }}>
        <span style={{ fontSize: "10px", color: BLUE, letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 600 }}>SportConnect Pro · App de comunidades esportivas</span>
      </div>

      {/* Header azul — user + stats */}
      <header
        style={{
          background: BLUE,
          padding: "12px 12px 16px",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
          <div>
            <p style={{ fontSize: "8px", color: "rgba(255,255,255,0.8)", margin: 0 }}>Bem-vindo de volta 👋</p>
            <h1 style={{ fontSize: "13px", fontWeight: 700, color: "#fff", margin: "2px 0 0" }}>Rodrigo</h1>
          </div>
          <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: YELLOW, color: "#1e3a8a", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", fontWeight: 700 }}>R</div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "6px", background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)", borderRadius: "12px", padding: "8px" }}>
          {[
            { Icon: Calendar, value: "23", label: "Eventos" },
            { Icon: Users, value: "5", label: "Grupos" },
            { Icon: Zap, value: "156h", label: "Jogadas" },
            { Icon: Trophy, value: "12", label: "Badges" },
          ].map(({ Icon, value, label }) => (
            <div key={label} style={{ textAlign: "center" }}>
              <Icon size={14} style={{ color: YELLOW, marginBottom: "2px" }} />
              <p style={{ fontSize: "11px", fontWeight: 700, color: "#fff", margin: "0 0 1px" }}>{value}</p>
              <p style={{ fontSize: "7px", color: "rgba(255,255,255,0.8)", margin: 0 }}>{label}</p>
            </div>
          ))}
        </div>
      </header>

      {/* Busca */}
      <div style={{ padding: "8px 12px", marginTop: "-4px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", background: "#fff", padding: "8px 12px", borderRadius: "12px", boxShadow: "0 2px 12px rgba(37,99,235,0.1)" }}>
          <span style={{ fontSize: "14px", color: BLUE }}>🔍</span>
          <span style={{ fontSize: "9px", color: "#9ca3af", flex: 1 }}>Buscar esportes, grupos, eventos...</span>
          <div style={{ width: "24px", height: "24px", background: BLUE, borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", color: "#fff" }}>⚙</div>
        </div>
      </div>

      {/* Banner hero com imagem */}
      <div style={{ padding: "0 12px 12px" }}>
        <div
          style={{
            position: "relative",
            height: "80px",
            borderRadius: "12px",
            overflow: "hidden",
          }}
        >
          <img
            src={`${IMG_BASE}/hero-athletes-XjFNam5askwHxnZxGLxGD8.png`}
            alt="Banner"
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(30,58,138,0.8) 0%, rgba(37,99,235,0.5) 50%, transparent 100%)" }} />
          <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "center", padding: "10px 12px" }}>
            <span style={{ fontSize: "7px", background: YELLOW, color: "#1e3a8a", padding: "2px 6px", borderRadius: "999px", fontWeight: 700, width: "fit-content", marginBottom: "4px" }}>🔥 Em destaque</span>
            <h2 style={{ fontSize: "12px", fontWeight: 700, color: "#fff", margin: 0, lineHeight: 1.2 }}>Encontre sua<br />comunidade esportiva</h2>
            <p style={{ fontSize: "8px", color: "rgba(255,255,255,0.9)", margin: "2px 0 0" }}>+16 esportes disponíveis no Brasil</p>
          </div>
        </div>
      </div>

      {/* Esportes — scroll horizontal com imagens */}
      <section style={{ marginBottom: "12px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 12px 8px" }}>
          <h2 style={{ fontSize: "11px", fontWeight: 700, color: "#111", margin: 0 }}>Esportes</h2>
          <span style={{ fontSize: "9px", color: BLUE, fontWeight: 600 }}>Ver todos</span>
        </div>
        <div style={{ display: "flex", gap: "8px", overflowX: "auto", padding: "0 12px 8px", scrollbarWidth: "none", msOverflowStyle: "none" }}>
          {sports.map((s) => (
            <div key={s.name} style={{ flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
              <div style={{ width: "44px", height: "44px", borderRadius: "10px", overflow: "hidden", border: "2px solid transparent" }}>
                <img src={s.image} alt={s.name} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }} />
              </div>
              <span style={{ fontSize: "8px", fontWeight: 600, color: "#374151", whiteSpace: "nowrap" }}>{s.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Próximos Eventos — cards com imagens */}
      <section style={{ padding: "0 12px 12px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
          <h2 style={{ fontSize: "11px", fontWeight: 700, color: "#111", margin: 0 }}>Próximos Eventos</h2>
          <span style={{ fontSize: "9px", color: BLUE, fontWeight: 600 }}>Ver todos</span>
        </div>
        <div style={{ display: "flex", gap: "6px", overflowX: "auto", marginBottom: "8px", scrollbarWidth: "none" }}>
          {["Todos", "Futebol", "Basketball", "Surf"].map((f) => (
            <span key={f} style={{ fontSize: "8px", padding: "4px 10px", borderRadius: "999px", fontWeight: 600, flexShrink: 0, background: f === "Todos" ? BLUE : "#fff", color: f === "Todos" ? "#fff" : "#6b7280", border: f === "Todos" ? "none" : "1px solid #e5e7eb" }}>{f}</span>
          ))}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px", maxHeight: "140px", overflow: "hidden" }}>
          {eventsData.slice(0, 2).map((e) => (
            <div
              key={e.title}
              style={{
                background: "#fff",
                borderRadius: "12px",
                overflow: "hidden",
                display: "flex",
                boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
              }}
            >
              <div style={{ width: "72px", height: "72px", flexShrink: 0 }}>
                <img src={e.image} alt={e.title} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }} />
              </div>
              <div style={{ flex: 1, padding: "8px 10px", minWidth: 0, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div>
                  <span style={{ fontSize: "7px", background: "#dbeafe", color: BLUE, padding: "2px 6px", borderRadius: "999px", fontWeight: 600 }}>{e.sport}</span>
                  <h3 style={{ fontSize: "10px", fontWeight: 700, color: "#111", margin: "4px 0 2px", lineHeight: 1.2 }}>{e.title}</h3>
                </div>
                <div>
                  <p style={{ fontSize: "7px", color: "#6b7280", margin: "0 0 1px" }}>📅 {e.date}</p>
                  <p style={{ fontSize: "7px", color: "#6b7280", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>📍 {e.location}</p>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "4px" }}>
                    <span style={{ fontSize: "7px", color: "#9ca3af" }}>{e.participants}</span>
                    <span style={{ fontSize: "7px", background: "#fef3c7", color: "#92400e", padding: "2px 6px", borderRadius: "999px", fontWeight: 600 }}>{e.level}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── MOBILE MANAGER ───────────────────────── */}
      <MobileManagerSectionSport />

      {/* ─── MÉTRICAS — Dados do app esportes ─────── */}
      <section style={{ padding: "12px 16px", background: "#f9fafb" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "6px" }}>
          {[
            { Icon: Calendar, value: "847", label: "Eventos este mês" },
            { Icon: Users, value: "12.4k", label: "Usuários ativos" },
            { Icon: Zap, value: "4.8★", label: "Avaliação" },
            { Icon: Trophy, value: "16", label: "Esportes" },
          ].map(({ Icon, value, label }) => (
            <div key={label} style={{ textAlign: "center" }}>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Icon size={16} color={BLUE} strokeWidth={2} />
              </div>
              <div style={{ fontSize: "13px", fontWeight: 700, color: "#111" }}>{value}</div>
              <div style={{ fontSize: "8px", color: "#666" }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── FUNCIONALIDADES ─────────────────────── */}
      <section style={{ padding: "10px 16px", background: "#fff" }}>
        <span style={{ padding: "2px 6px", border: `1px solid ${BLUE}`, borderRadius: "4px", color: BLUE, fontSize: "8px", fontWeight: 600 }}>FUNCIONALIDADES</span>
        <h2 style={{ fontSize: "12px", fontWeight: 700, color: "#111", margin: "4px 0 4px" }}>Encontrar eventos, criar grupos e estatísticas de jogos</h2>
        <p style={{ fontSize: "9px", color: "#666", lineHeight: 1.4, marginBottom: "6px" }}>Comunidades por esporte, inscrição em eventos e histórico de partidas.</p>
        {["Eventos por cidade e esporte", "Grupos e comunidades", "Estatísticas e badges"].map((t) => (
          <div key={t} style={{ display: "flex", alignItems: "center", gap: "4px", marginBottom: "2px" }}>
            <CheckCircle size={12} color={BLUE} />
            <span style={{ fontSize: "9px", color: "#444" }}>{t}</span>
          </div>
        ))}
      </section>

      {/* ─── STACK ───────────────────────────────── */}
      <section style={{ padding: "10px 16px", background: "#f9fafb" }}>
        <h2 style={{ fontSize: "11px", fontWeight: 700, color: "#111", marginBottom: "8px", textAlign: "center" }}>Stack</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "6px" }}>
          {["Flutter", "Firebase", "Maps API", "Push", "Stripe", "CI/CD"].map((n) => (
            <div key={n} style={{ padding: "6px", border: "1px solid #dbeafe", borderRadius: "6px", textAlign: "center", fontSize: "9px", fontWeight: 600, color: "#1e40af", background: "#eff6ff" }}>{n}</div>
          ))}
        </div>
      </section>

      {/* ─── RESULTADOS + CTA ───────────────────── */}
      <section style={{ padding: "12px 16px", background: "linear-gradient(135deg, #1e3a8a, #1e40af)", textAlign: "center" }}>
        <h2 style={{ fontSize: "11px", fontWeight: 700, color: "#fff", marginBottom: "8px" }}>Resultados</h2>
        <blockquote style={{ fontSize: "10px", color: "rgba(255,255,255,0.9)", fontStyle: "italic", marginBottom: "8px" }}>
          "Em 6 semanas tivemos 12 mil usuários e +800 eventos criados. O engajamento nas comunidades é incrível."
        </blockquote>
        <div style={{ fontSize: "9px", color: "rgba(255,255,255,0.6)", marginBottom: "8px" }}>— Carlos Mendes, SportConnect</div>
        <button style={{
          padding: "6px 14px", background: YELLOW, color: "#1e3a8a", border: "none",
          borderRadius: "999px", fontSize: "10px", fontWeight: 700,
        }}>
          Agendar Consultoria
        </button>
      </section>

      {/* Bottom nav */}
      <nav
        style={{
          display: "flex",
          justifyContent: "space-around",
          padding: "8px 0",
          background: "#fff",
          borderTop: "1px solid #e5e7eb",
        }}
      >
        {["🏠 Início", "🔍 Buscar", "👥 Grupos", "📅 Eventos", "👤 Perfil"].map((item) => (
          <span key={item} style={{ fontSize: "8px", color: item.includes("Início") ? BLUE : "#9ca3af", fontWeight: item.includes("Início") ? 600 : 400 }}>
            {item}
          </span>
        ))}
      </nav>
    </div>
  );
}
