/* ═══════════════════════════════════════════════
   MOBILE MANAGER — Visual para Sites de Alto Impacto
   Dashboard de controle de produção (modo default)
═══════════════════════════════════════════════ */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const IconPlus = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);
export function MobileManagerPreview() {
  const [projects, setProjects] = useState([
    { id: 1, name: "App Academia IronBox", client: "IronBox Academy", deadline: "2024-05-20", status: "Em Desenvolvimento", progress: 65, stack: ["Flutter", "Firebase"], validation: "Semana 3/4" },
    { id: 2, name: "Fintech Neon Blue", client: "Neon Bank", deadline: "2024-06-15", status: "Wireframes", progress: 20, stack: ["React Native", "Node.js"], validation: "Semana 1/4" },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProject, setNewProject] = useState({ name: "", client: "", stack: "", deadline: "" });

  const addProject = (e: React.FormEvent) => {
    e.preventDefault();
    setProjects([
      {
        id: Date.now(),
        ...newProject,
        status: "Iniciando",
        progress: 5,
        stack: newProject.stack.split(",").map((s) => s.trim()),
        validation: "Semana 0/4",
      },
      ...projects,
    ]);
    setIsModalOpen(false);
    setNewProject({ name: "", client: "", stack: "", deadline: "" });
  };

  return (
    <div className="min-h-[420px] max-h-[420px] overflow-y-auto bg-[#0a0a0a] text-white p-3" style={{ fontFamily: "'DM Sans',sans-serif" }}>
      <header className="flex flex-col sm:flex-row justify-between items-start gap-3 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif italic text-[#FF4500]" style={{ fontFamily: "'Instrument Serif',serif" }}>
            Mobile Manager
          </h1>
          <p className="text-[9px] tracking-widest text-[#555] uppercase mt-1" style={{ fontFamily: "'Space Mono',monospace" }}>
            Controle de Produção
          </p>
        </div>
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-[#FF4500] hover:bg-[#e63e00] text-white px-4 py-2 rounded-lg text-xs font-bold transition-all shrink-0"
        >
          <IconPlus /> Novo Projeto
        </button>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <AnimatePresence>
          {projects.map((project) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#111] border border-[#222] rounded-xl p-4 hover:border-[#FF4500]/50 transition-colors"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <span className="text-[9px] text-[#FF4500] uppercase tracking-wider" style={{ fontFamily: "'Space Mono',monospace" }}>
                    {project.status}
                  </span>
                  <h3 className="text-sm font-bold mt-0.5 text-white">{project.name}</h3>
                  <p className="text-[10px] text-[#555]">{project.client}</p>
                </div>
              </div>
              <div className="mb-4">
                <div className="flex justify-between text-[9px] text-[#888] mb-1 uppercase" style={{ fontFamily: "'Space Mono',monospace" }}>
                  <span>Progresso</span>
                  <span>{project.progress}%</span>
                </div>
                <div className="w-full h-1 bg-[#222] rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${project.progress}%` }}
                    transition={{ duration: 0.8 }}
                    className="h-full bg-[#FF4500]"
                  />
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {project.stack.map((s) => (
                  <span key={s} className="px-1.5 py-0.5 bg-[#0a0a0a] border border-[#222] rounded text-[9px] text-[#666]" style={{ fontFamily: "'Space Mono',monospace" }}>
                    {s}
                  </span>
                ))}
              </div>
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#222]">
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-[9px] text-[#888]" style={{ fontFamily: "'Space Mono',monospace" }}>
                    {project.validation}
                  </span>
                </div>
                <span className="text-[9px] text-[#555]" style={{ fontFamily: "'Space Mono',monospace" }}>
                  {project.deadline}
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.form
              onSubmit={addProject}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 30, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-sm bg-[#111] border border-[#222] rounded-2xl p-6 shadow-2xl"
            >
              <h2 className="text-xl text-[#FF4500] mb-4" style={{ fontFamily: "'Instrument Serif',serif" }}>
                Novo Case
              </h2>
              <div className="space-y-3">
                <div>
                  <label className="block text-[9px] text-[#555] uppercase mb-1" style={{ fontFamily: "'Space Mono',monospace" }}>
                    Nome
                  </label>
                  <input
                    required
                    value={newProject.name}
                    onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                    className="w-full bg-[#0a0a0a] border border-[#222] rounded-lg px-3 py-2 text-sm outline-none focus:border-[#FF4500]"
                    placeholder="Ex: App Academia"
                  />
                </div>
                <div>
                  <label className="block text-[9px] text-[#555] uppercase mb-1" style={{ fontFamily: "'Space Mono',monospace" }}>
                    Cliente
                  </label>
                  <input
                    required
                    value={newProject.client}
                    onChange={(e) => setNewProject({ ...newProject, client: e.target.value })}
                    className="w-full bg-[#0a0a0a] border border-[#222] rounded-lg px-3 py-2 text-sm outline-none focus:border-[#FF4500]"
                    placeholder="Nome da Empresa"
                  />
                </div>
                <div>
                  <label className="block text-[9px] text-[#555] uppercase mb-1" style={{ fontFamily: "'Space Mono',monospace" }}>
                    Stack (vírgula)
                  </label>
                  <input
                    required
                    value={newProject.stack}
                    onChange={(e) => setNewProject({ ...newProject, stack: e.target.value })}
                    className="w-full bg-[#0a0a0a] border border-[#222] rounded-lg px-3 py-2 text-sm outline-none focus:border-[#FF4500]"
                    placeholder="Flutter, Firebase"
                  />
                </div>
                <div>
                  <label className="block text-[9px] text-[#555] uppercase mb-1" style={{ fontFamily: "'Space Mono',monospace" }}>
                    Prazo
                  </label>
                  <input
                    required
                    type="date"
                    value={newProject.deadline}
                    onChange={(e) => setNewProject({ ...newProject, deadline: e.target.value })}
                    className="w-full bg-[#0a0a0a] border border-[#222] rounded-lg px-3 py-2 text-sm outline-none focus:border-[#FF4500]"
                  />
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-2 border border-[#222] rounded-lg text-sm hover:border-[#444] transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 bg-[#FF4500] hover:bg-[#e63e00] rounded-lg text-sm font-bold transition-colors"
                >
                  Criar
                </button>
              </div>
            </motion.form>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
