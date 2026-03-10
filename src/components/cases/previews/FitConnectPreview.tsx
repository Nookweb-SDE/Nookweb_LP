/* ═══════════════════════════════════════════════
   FITCONNECT CASE — Estrutura conforme anexos
   Anexo 2: Hero com 3 celulares flutuantes
   Anexo 1: Abaixo do hero — Mobile Manager (cards + modal)
   Anexo 3: Estrutura geral do site
═══════════════════════════════════════════════ */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Users, Star, Rocket, CheckCircle, Plus } from "lucide-react";

/* Dourado/amarelo conforme mockup dos 3 celulares */
const ACCENT = "#EAB308";

/* ─── MOBILE MANAGER (Anexo 1) ────────────────── */
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

function MobileManagerSection() {
  const [projects, setProjects] = useState<Project[]>([
    { id: 1, name: "IronBox Academy — App de Check-in e Treinos", client: "IronBox Academy", status: "Em Desenvolvimento", progress: 65, stack: ["Flutter", "Firebase", "Maps"], validation: "Semana 3/4", deadline: "2024-05-20" },
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
            display: "flex",
            alignItems: "center",
            gap: "4px",
            padding: "6px 12px",
            background: ACCENT,
            color: "#111",
            border: "none",
            borderRadius: "8px",
            fontSize: "10px",
            fontWeight: 700,
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
                background: "#f9fafb",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                padding: "10px",
              }}
            >
              <div style={{ fontSize: "9px", color: ACCENT, fontWeight: 600, marginBottom: "2px" }}>{p.status}</div>
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
                  style={{ height: "100%", background: ACCENT }}
                />
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "4px", marginTop: "6px" }}>
                {p.stack.map((s) => (
                  <span key={s} style={{ fontSize: "8px", padding: "2px 5px", background: "#e5e7eb", borderRadius: "4px", color: "#555" }}>{s}</span>
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

      {/* Modal Cadastro (Anexo 1) */}
      <AnimatePresence>
        {modalOpen && (
          <div style={{ position: "fixed", inset: 0, zIndex: 50, display: "flex", alignItems: "center", justifyContent: "center", padding: "16px" }}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setModalOpen(false)}
              style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}
            />
            <motion.form
              onSubmit={addProject}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                position: "relative",
                background: "#fff",
                borderRadius: "12px",
                padding: "16px",
                width: "100%",
                maxWidth: "280px",
                boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
                border: "1px solid #e5e7eb",
              }}
            >
              <h3 style={{ fontSize: "14px", fontWeight: 700, color: ACCENT, marginBottom: "12px" }}>Novo Projeto</h3>
              {[
                { key: "name", label: "Nome", placeholder: "Ex: App Academia IronBox" },
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
                    style={{
                      width: "100%",
                      padding: "6px 8px",
                      border: "1px solid #e5e7eb",
                      borderRadius: "6px",
                      fontSize: "11px",
                      boxSizing: "border-box",
                    }}
                  />
                </div>
              ))}
              <div style={{ display: "flex", gap: "8px", marginTop: "12px" }}>
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  style={{ flex: 1, padding: "8px", border: "1px solid #e5e7eb", borderRadius: "6px", fontSize: "10px", background: "#f9fafb" }}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  style={{ flex: 1, padding: "8px", background: ACCENT, color: "#111", border: "none", borderRadius: "6px", fontSize: "10px", fontWeight: 700 }}
                >
                  Criar
                </button>
              </div>
            </motion.form>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

export function FitConnectPreview() {
  return (
    <div style={{
      background: "#fff",
      minHeight: "400px",
      maxHeight: "594px",
      overflowY: "auto",
      fontFamily: "'DM Sans',sans-serif",
    }}>
      {/* ─── HERO — Background academia ─────────── */}
      <section style={{
        backgroundImage: "url('/hero-academia.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
        padding: "16px",
        overflow: "hidden",
        minHeight: "180px",
      }}>
        {/* Overlay escuro para legibilidade */}
        <div style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to bottom, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.7) 100%)",
        }} />
        <div style={{
          position: "absolute",
          inset: 0,
          opacity: 0.06,
          backgroundImage: "radial-gradient(circle at 50% 50%, " + ACCENT + " 0%, transparent 70%)",
        }} />
        <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "140px", gap: "8px" }}>
          <img
            src="/hero-phones-mockup.png"
            alt="FitConnect — 3 telas do app"
            style={{ maxWidth: "220px", width: "85%", height: "auto", objectFit: "contain" }}
          />
          <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.5)", letterSpacing: "0.15em", textTransform: "uppercase" }}>IronBox Academy · App de academia</span>
        </div>
      </section>

      {/* ─── MOBILE MANAGER (Anexo 1) — Abaixo do hero ─ */}
      <MobileManagerSection />

      {/* ─── MÉTRICAS — Dados do app academia ─────── */}
      <section style={{ padding: "12px 16px", background: "#f9fafb" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "6px" }}>
          {[
            { Icon: Clock, value: "2.847", label: "Check-ins hoje" },
            { Icon: Users, value: "1.240", label: "Alunos ativos" },
            { Icon: Star, value: "4.9★", label: "Avaliação" },
            { Icon: Rocket, value: "89%", label: "Frequência" },
          ].map(({ Icon, value, label }) => (
            <div key={label} style={{ textAlign: "center" }}>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Icon size={16} color={ACCENT} strokeWidth={2} />
              </div>
              <div style={{ fontSize: "13px", fontWeight: 700, color: "#111" }}>{value}</div>
              <div style={{ fontSize: "8px", color: "#666" }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── O QUE O APP ENTREGA ─────────────────── */}
      <section style={{ padding: "10px 16px", background: "#fff" }}>
        <span style={{ padding: "2px 6px", border: `1px solid ${ACCENT}`, borderRadius: "4px", color: ACCENT, fontSize: "8px", fontWeight: 600 }}>FUNCIONALIDADES</span>
        <h2 style={{ fontSize: "12px", fontWeight: 700, color: "#111", margin: "4px 0 4px" }}>Check-in por geolocalização e treinos personalizados</h2>
        <p style={{ fontSize: "9px", color: "#666", lineHeight: 1.4, marginBottom: "6px" }}>Alunos reservam horários, recebem lembretes e acompanham evolução.</p>
        {["Check-in automático na academia", "Lembretes de treino push", "Planos e pagamento in-app"].map((t) => (
          <div key={t} style={{ display: "flex", alignItems: "center", gap: "4px", marginBottom: "2px" }}>
            <CheckCircle size={12} color={ACCENT} />
            <span style={{ fontSize: "9px", color: "#444" }}>{t}</span>
          </div>
        ))}
      </section>

      {/* ─── TECNOLOGIAS ────────────────────────── */}
      <section style={{ padding: "10px 16px", background: "#f9fafb" }}>
        <h2 style={{ fontSize: "11px", fontWeight: 700, color: "#111", marginBottom: "8px", textAlign: "center" }}>Stack</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "6px" }}>
          {["Flutter", "Firebase", "Maps API", "FCM Push", "Stripe", "CI/CD"].map((n) => (
            <div key={n} style={{ padding: "6px", border: "1px solid #e5e7eb", borderRadius: "6px", textAlign: "center", fontSize: "9px", fontWeight: 600, color: "#111" }}>{n}</div>
          ))}
        </div>
      </section>

      {/* ─── RESULTADOS + CTA ───────────────────── */}
      <section style={{ padding: "12px 16px", background: "linear-gradient(135deg, #1f2937, #111827)", textAlign: "center" }}>
        <h2 style={{ fontSize: "11px", fontWeight: 700, color: "#fff", marginBottom: "8px" }}>Resultados</h2>
        <blockquote style={{ fontSize: "10px", color: "rgba(255,255,255,0.9)", fontStyle: "italic", marginBottom: "8px" }}>
          "Check-in por geolocalização e lembretes de treino aumentaram a frequência em 40%. Os alunos adoram."
        </blockquote>
        <div style={{ fontSize: "9px", color: "rgba(255,255,255,0.6)", marginBottom: "8px" }}>— Paulo Costa, IronBox Academy</div>
        <button style={{
          padding: "6px 14px",
          background: ACCENT,
          color: "#111",
          border: "none",
          borderRadius: "999px",
          fontSize: "10px",
          fontWeight: 700,
        }}>
          Agendar Consultoria
        </button>
      </section>
    </div>
  );
}
