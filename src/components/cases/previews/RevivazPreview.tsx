/* ═══════════════════════════════════════════════════════════════════
   REVIVAZ — Clone EXATO dos blocos conexasaude.com.br (header ao footer)
   Mesma ordem e estrutura; paleta e imagens Revivaz; conteúdo solidário.
══════════════════════════════════════════════════════════════════ */

import React, { useState, useEffect } from "react";

const teal900 = "#004D5C";
const teal700 = "#007A8C";
const teal500 = "#00A8BF";
const teal300 = "#00BFD8";
const teal100 = "#D6F4F8";
const teal050 = "#EDF9FB";
const green700 = "#2E7D32";
const green500 = "#4CAF50";
const gray950 = "#0D1117";
const gray800 = "#1F2937";
const gray600 = "#4B5563";
const gray200 = "#E5E7EB";
const gray050 = "#F9FAFB";
const white = "#FFFFFF";

export default function RevivazPreview() {
  const [tabIndex, setTabIndex] = useState(0);
  const [heroRotate, setHeroRotate] = useState(0);
  const [agendarOpen, setAgendarOpen] = useState(false);
  const [agendarConfirmado, setAgendarConfirmado] = useState(false);
  const [receitaEnviada, setReceitaEnviada] = useState(false);
  const [receitaModal, setReceitaModal] = useState(false);
  const [depoIndex, setDepoIndex] = useState(0);
  const [form, setForm] = useState({ tipo: "online" as "presencial" | "online", especialidade: "psicologia" as "psiquiatria" | "psicologia", data: "", hora: "", nome: "", telefone: "", email: "" });

  const heroLines = ["suas consultas", "seus cuidados", "sua vida"];
  useEffect(() => {
    const t = setInterval(() => setHeroRotate((r) => (r + 1) % heroLines.length), 2500);
    return () => clearInterval(t);
  }, []);

  const DEPOIMENTOS = [
    { nome: "Maria S.", cargo: "Paciente Revivaz", quote: "Consegui agendar sem criar conta. A receita chegou no WhatsApp na hora. Atendimento humanizado." },
    { nome: "Dr. Carlos M.", cargo: "Psiquiatra voluntário", quote: "O suporte emocional que nossos pacientes precisavam. A Revivaz trouxe uma plataforma acessível para quem mais precisa." },
    { nome: "Ana R.", cargo: "Paciente Revivaz", quote: "Tornou muito mais fácil manter meus cuidados em dia. Posso me cuidar de onde estiver, com tranquilidade." },
    { nome: "Dra. Paula L.", cargo: "CRM-SP 12345", quote: "Fui cativada pela qualidade assistencial. Tecnologia de ponta e um time de excelência. Satisfação em ser parte da Revivaz." },
  ];

  const GRID_ITENS = [
    { titulo: "Psiquiatria e Psicologia", subtitulo: "Cuidado completo" },
    { titulo: "Agendamento presencial e online", subtitulo: "Cuidado multidisciplinar" },
    { titulo: "Receita por SMS e WhatsApp", subtitulo: "Entrega na hora" },
    { titulo: "Profissionais voluntários selecionados", subtitulo: "Equipe capacitada" },
    { titulo: "Consulta na plataforma ou no consultório", subtitulo: "Ampla rede" },
    { titulo: "Plataforma segura e sempre atualizada", subtitulo: "Tecnologia própria" },
    { titulo: "Protocolos com resultados comprovados", subtitulo: "Rigor científico" },
    { titulo: "Atendimento solidário para quem precisa", subtitulo: "Programa de benefícios" },
  ];

  const SOLUCOES = [
    { num: "01", titulo: "Consulta presencial", subtitulo: "Consulta Presencial", desc: "Atendimento no consultório com horário agendado. Sem fila.", link: "Saiba mais" },
    { num: "02", titulo: "Teleatendimento", subtitulo: "Pronto Atendimento", desc: "Consulta por vídeo chamada, disponível em horários agendados.", link: "Saiba mais" },
    { num: "03", titulo: "Receita digital", subtitulo: "Receita por SMS/WhatsApp", desc: "Receita médica enviada na hora pelo celular.", link: "Saiba mais" },
    { num: "04", titulo: "Atenção contínua", subtitulo: "Atenção primária", desc: "Sessões de terapia e follow-up com o mesmo profissional.", link: "Saiba mais" },
    { num: "05", titulo: "Saúde mental", subtitulo: "Saúde mental", desc: "A maior referência em atendimento solidário em saúde mental.", link: "Saiba mais" },
  ];

  const NEWS = [
    { titulo: "Revivaz e SUS: parceria para reduzir filas", cat: "Atendimento solidário", data: "1 de out." },
    { titulo: "Saúde mental nas periferias: entrevista", cat: "Imprensa", data: "25 de set." },
    { titulo: "Novos profissionais voluntários em 2025", cat: "Imprensa", data: "23 de set." },
  ];

  return (
    <div style={{ width: "100%", minHeight: 420, maxHeight: 594, overflowY: "auto", fontFamily: "'Inter','Nunito',system-ui,sans-serif", fontSize: "12px", background: gray050 }}>
      {/* BLOCO 1 — Top bar (igual Conexa) */}
      <div style={{ background: teal900, color: white, padding: "6px 14px", fontSize: "10px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span>Nota 4,6 na App Store</span>
        <button type="button" style={{ background: "none", border: "none", color: white, textDecoration: "underline", cursor: "pointer", fontFamily: "inherit", fontSize: "10px" }}>Baixe aqui</button>
      </div>

      {/* BLOCO 2 — Header: logo + nav + CTA (igual Conexa) */}
      <header style={{ position: "sticky", top: 0, zIndex: 50, background: white, borderBottom: `1px solid ${gray200}`, padding: "10px 14px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
        <span style={{ fontFamily: "'Nunito',sans-serif", fontWeight: 800, fontSize: "18px", color: teal700 }}>Revivaz</span>
        <div style={{ flex: 1, maxWidth: 280 }}>
          <input type="text" placeholder="O que você procura? (Ex: Psiquiatria, Psicologia...)" style={{ width: "100%", padding: "6px 12px", fontSize: "10px", border: `1px solid ${gray200}`, borderRadius: 9999, outline: "none", boxSizing: "border-box" }} />
        </div>
        <nav style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {["Para pacientes", "Para profissionais", "Contato"].map((l) => (
            <button key={l} type="button" style={{ background: "none", border: "none", cursor: "pointer", fontSize: "10px", fontWeight: 500, color: gray600, fontFamily: "inherit" }}>{l}</button>
          ))}
        </nav>
        <button type="button" onClick={() => { setAgendarOpen(true); setAgendarConfirmado(false); }} style={{ padding: "8px 16px", fontWeight: 700, fontSize: "11px", color: white, background: teal700, border: "none", borderRadius: 9999, cursor: "pointer", fontFamily: "inherit" }}>Agendar consulta</button>
      </header>

      {/* BLOCO 3 — Hero: H1 + carousel "suas consultas/exames/vida" + subtítulo + 2 CTAs (igual Conexa) */}
      <section style={{ backgroundImage: "url('/revivaz/hero.png')", backgroundSize: "cover", backgroundPosition: "center", minHeight: 200, color: white, padding: "28px 14px 32px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(0,77,92,0.88) 0%, rgba(0,122,140,0.7) 100%)" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <h1 style={{ fontFamily: "'Nunito',sans-serif", fontWeight: 900, fontSize: "26px", lineHeight: 1.1, marginBottom: 6 }}>Saúde que conecta</h1>
          <div style={{ fontSize: "14px", fontWeight: 700, marginBottom: 10, minHeight: 22 }}>
            {heroLines[heroRotate]}
          </div>
          <p style={{ fontSize: "11px", opacity: 0.95, lineHeight: 1.5, marginBottom: 16, maxWidth: "95%" }}>
            Cuidado em saúde mental de qualidade, oferecido por psiquiatras e psicólogos em trabalho solidário.
          </p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <button type="button" onClick={() => setAgendarOpen(true)} style={{ padding: "10px 20px", fontWeight: 700, fontSize: "11px", color: teal700, background: white, border: "none", borderRadius: 9999, cursor: "pointer", fontFamily: "inherit" }}>Agendar consulta</button>
            <button type="button" style={{ padding: "10px 20px", fontWeight: 700, fontSize: "11px", color: white, background: "transparent", border: "2px solid rgba(255,255,255,0.8)", borderRadius: 9999, cursor: "pointer", fontFamily: "inherit" }}>Saiba como ativar</button>
          </div>
        </div>
      </section>

      {/* BLOCO 4 — 3 abas (Para empregadores / parceiros / profissionais → Revivaz: Pacientes / Profissionais / Como ativar) */}
      <section style={{ background: white, padding: "14px 14px 0", borderBottom: `1px solid ${gray200}` }}>
        <div style={{ display: "flex", gap: 0 }}>
          {["Para pacientes", "Para profissionais de saúde", "Como ativar"].map((label, i) => (
            <button key={label} type="button" onClick={() => setTabIndex(i)} style={{ padding: "10px 14px", fontSize: "11px", fontWeight: 600, border: "none", borderBottom: `3px solid ${tabIndex === i ? teal700 : "transparent"}`, background: "none", color: tabIndex === i ? teal700 : gray600, cursor: "pointer", fontFamily: "inherit" }}>{label}</button>
          ))}
        </div>
      </section>

      {/* BLOCO 5 — 3 painéis de conteúdo (um por aba), layout igual Conexa */}
      <section style={{ padding: "24px 14px", background: white }}>
        {tabIndex === 0 && (
          <div>
            <h2 style={{ fontFamily: "'Nunito',sans-serif", fontWeight: 700, fontSize: "16px", color: gray950, marginBottom: 10 }}>O futuro do cuidado em saúde mental</h2>
            <p style={{ fontSize: "11px", color: gray600, lineHeight: 1.6, marginBottom: 14 }}>Conheça a melhor experiência de atendimento solidário. Agende presencial ou online, receba receita por WhatsApp e faça parte de uma rede que reduz a fila de espera.</p>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <button type="button" onClick={() => setAgendarOpen(true)} style={{ padding: "10px 18px", fontSize: "11px", fontWeight: 600, color: white, background: teal700, border: "none", borderRadius: 8, cursor: "pointer", fontFamily: "inherit" }}>Agendar consulta</button>
              <button type="button" style={{ padding: "10px 18px", fontSize: "11px", fontWeight: 600, color: teal700, background: teal050, border: `1px solid ${teal100}`, borderRadius: 8, cursor: "pointer", fontFamily: "inherit" }}>Saiba mais</button>
            </div>
          </div>
        )}
        {tabIndex === 1 && (
          <div>
            <h2 style={{ fontFamily: "'Nunito',sans-serif", fontWeight: 700, fontSize: "16px", color: gray950, marginBottom: 10 }}>Lidere a transformação solidária na saúde</h2>
            <p style={{ fontSize: "11px", color: gray600, lineHeight: 1.6, marginBottom: 14 }}>Conheça nossa solução completa. Reduza a fila de espera, aumente o acesso ao cuidado e faça do seu consultório um ponto de atendimento para quem mais precisa.</p>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <button type="button" style={{ padding: "10px 18px", fontSize: "11px", fontWeight: 600, color: white, background: teal700, border: "none", borderRadius: 8, cursor: "pointer", fontFamily: "inherit" }}>Quero ser voluntário</button>
              <button type="button" style={{ padding: "10px 18px", fontSize: "11px", fontWeight: 600, color: teal700, background: teal050, border: `1px solid ${teal100}`, borderRadius: 8, cursor: "pointer", fontFamily: "inherit" }}>Outros parceiros</button>
            </div>
          </div>
        )}
        {tabIndex === 2 && (
          <div>
            <h2 style={{ fontFamily: "'Nunito',sans-serif", fontWeight: 700, fontSize: "16px", color: gray950, marginBottom: 10 }}>Faça parte do futuro da saúde mental</h2>
            <p style={{ fontSize: "11px", color: gray600, lineHeight: 1.6, marginBottom: 14 }}>Otimize a gestão do seu consultório, atenda novos pacientes e faça parte de uma comunidade de profissionais em atendimento solidário.</p>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <button type="button" style={{ padding: "10px 18px", fontSize: "11px", fontWeight: 600, color: white, background: teal700, border: "none", borderRadius: 8, cursor: "pointer", fontFamily: "inherit" }}>Saiba mais</button>
              <button type="button" style={{ padding: "10px 18px", fontSize: "11px", fontWeight: 600, color: teal700, background: "none", border: "none", textDecoration: "underline", cursor: "pointer", fontFamily: "inherit" }}>Precisa de ajuda? Fale com o suporte</button>
            </div>
          </div>
        )}
      </section>

      {/* BLOCO 6 — "Saúde digital do jeito que você precisa" + "Sempre que você precisa" + "Atendimentos 24h..." */}
      <section style={{ padding: "24px 14px", background: gray050, textAlign: "center" }}>
        <div style={{ fontSize: "10px", color: gray600, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>Saúde digital</div>
        <h2 style={{ fontFamily: "'Nunito',sans-serif", fontWeight: 800, fontSize: "18px", color: gray950, marginBottom: 6 }}>do jeito que você precisa</h2>
        <h3 style={{ fontFamily: "'Nunito',sans-serif", fontWeight: 700, fontSize: "15px", color: teal700, marginBottom: 4 }}>Sempre que você precisa</h3>
        <p style={{ fontSize: "11px", color: gray600 }}>Atendimentos por agendamento. Presencial ou online por vídeo.</p>
      </section>

      {/* BLOCO 7 — Dois stats lado a lado (Até 7 min / 2 a 5 dias) */}
      <section style={{ padding: "20px 14px", background: white, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div style={{ textAlign: "center", padding: "16px", background: teal050, borderRadius: 12, border: `1px solid ${teal100}` }}>
          <div style={{ fontSize: "22px", fontWeight: 800, color: teal700, marginBottom: 4 }}>Até 24h</div>
          <div style={{ fontSize: "10px", color: gray600 }}>para conseguir agendar sua consulta</div>
          <div style={{ fontSize: "9px", color: gray600, marginTop: 4, fontStyle: "italic" }}>*Conforme disponibilidade.</div>
        </div>
        <div style={{ textAlign: "center", padding: "16px", background: teal050, borderRadius: 12, border: `1px solid ${teal100}` }}>
          <div style={{ fontSize: "22px", fontWeight: 800, color: teal700, marginBottom: 4 }}>Na hora</div>
          <div style={{ fontSize: "10px", color: gray600 }}>receita por SMS ou WhatsApp após a consulta</div>
          <div style={{ fontSize: "9px", color: gray600, marginTop: 4, fontStyle: "italic" }}>*Enviada pelo profissional.</div>
        </div>
      </section>

      {/* BLOCO 8 — "Muito além de consultas" + parágrafo + "Saiba como ativar" */}
      <section style={{ padding: "24px 14px", background: teal050, borderTop: `1px solid ${gray200}` }}>
        <h2 style={{ fontFamily: "'Nunito',sans-serif", fontWeight: 700, fontSize: "16px", color: gray950, marginBottom: 8 }}>Muito além de consultas</h2>
        <p style={{ fontSize: "11px", color: gray600, lineHeight: 1.6, marginBottom: 12 }}>Temos os melhores recursos para uma jornada integral de saúde mental.</p>
        <button type="button" style={{ padding: "8px 16px", fontSize: "11px", fontWeight: 600, color: white, background: teal700, border: "none", borderRadius: 8, cursor: "pointer", fontFamily: "inherit" }}>Saiba como ativar</button>
      </section>

      {/* BLOCO 9 — Grid de 8 itens (título + subtítulo cada), igual Conexa */}
      <section style={{ padding: "24px 14px", background: white }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 10 }}>
          {GRID_ITENS.map((item, i) => (
            <div key={i} style={{ padding: "12px 14px", background: gray050, borderRadius: 10, border: `1px solid ${gray200}` }}>
              <div style={{ fontSize: "11px", fontWeight: 700, color: gray950, marginBottom: 2 }}>{item.titulo}</div>
              <div style={{ fontSize: "10px", color: gray600 }}>{item.subtitulo}</div>
            </div>
          ))}
        </div>
      </section>

      {/* BLOCO 10 — "Nossas soluções" + intro */}
      <section style={{ padding: "24px 14px", background: gray050 }}>
        <h2 style={{ fontFamily: "'Nunito',sans-serif", fontWeight: 700, fontSize: "16px", color: gray950, marginBottom: 8 }}>Nossas soluções</h2>
        <p style={{ fontSize: "11px", color: gray600, lineHeight: 1.6 }}>Somos um ecossistema completo de promoção e tratamento em saúde mental.</p>
      </section>

      {/* BLOCO 11 — 5 cards numerados (01 a 05), layout igual Conexa */}
      <section style={{ padding: "0 14px 24px", background: gray050 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {SOLUCOES.map((s) => (
            <div key={s.num} style={{ display: "flex", alignItems: "flex-start", gap: 14, padding: "14px", background: white, borderRadius: 12, border: `1px solid ${gray200}` }}>
              <span style={{ fontFamily: "'Nunito',sans-serif", fontWeight: 800, fontSize: "20px", color: teal700, lineHeight: 1 }}>{s.num}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: "12px", fontWeight: 700, color: gray950, marginBottom: 2 }}>{s.titulo}</div>
                <div style={{ fontSize: "10px", color: gray600, marginBottom: 6 }}>{s.subtitulo}</div>
                <p style={{ fontSize: "10px", color: gray600, lineHeight: 1.5, marginBottom: 8 }}>{s.desc}</p>
                <button type="button" style={{ padding: "4px 10px", fontSize: "10px", fontWeight: 600, color: teal700, background: "none", border: "none", cursor: "pointer", fontFamily: "inherit" }}>{s.link}</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* BLOCO 12 — "+2.000 empresas" + "Faça parte" */}
      <section style={{ padding: "28px 14px", background: teal700, color: white, textAlign: "center" }}>
        <div style={{ fontSize: "28px", fontWeight: 800, marginBottom: 6 }}>+500</div>
        <div style={{ fontSize: "11px", marginBottom: 14 }}>profissionais & voluntários oferecem Revivaz para quem precisa</div>
        <button type="button" style={{ padding: "12px 24px", fontSize: "12px", fontWeight: 700, color: teal700, background: white, border: "none", borderRadius: 9999, cursor: "pointer", fontFamily: "inherit" }}>Faça parte</button>
      </section>

      {/* BLOCO 13 — Depoimentos: "Nossa comunidade recomenda" + NPS + carrossel */}
      <section style={{ padding: "24px 14px", background: white }}>
        <h2 style={{ fontFamily: "'Nunito',sans-serif", fontWeight: 700, fontSize: "16px", color: gray950, marginBottom: 6 }}>Nossa comunidade recomenda</h2>
        <div style={{ fontSize: "14px", fontWeight: 800, color: teal700, marginBottom: 4 }}>NPS &gt; 90</div>
        <p style={{ fontSize: "10px", color: gray600, marginBottom: 14 }}>NPS (Net Promoter Score) é o índice de recomendação.</p>
        <div style={{ background: teal050, borderRadius: 12, padding: "14px", border: `1px solid ${gray200}` }}>
          <p style={{ fontSize: "11px", color: gray800, fontStyle: "italic", lineHeight: 1.5, marginBottom: 8 }}>"{DEPOIMENTOS[depoIndex].quote}"</p>
          <div style={{ fontSize: "10px", fontWeight: 600, color: gray950 }}>{DEPOIMENTOS[depoIndex].nome}</div>
          <div style={{ fontSize: "9px", color: gray600 }}>{DEPOIMENTOS[depoIndex].cargo}</div>
          <div style={{ display: "flex", gap: 6, marginTop: 10 }}>
            {DEPOIMENTOS.map((_, i) => (
              <button key={i} type="button" onClick={() => setDepoIndex(i)} style={{ width: 8, height: 8, borderRadius: "50%", border: "none", background: depoIndex === i ? teal700 : gray200, cursor: "pointer" }} />
            ))}
          </div>
        </div>
      </section>

      {/* BLOCO 14 — App: "Sua saúde ainda mais conectada" + App Store + Google Play + avaliações */}
      <section style={{ padding: "24px 14px", background: gray050, textAlign: "center" }}>
        <h2 style={{ fontFamily: "'Nunito',sans-serif", fontWeight: 700, fontSize: "15px", color: gray950, marginBottom: 12 }}>Sua saúde ainda mais conectada no nosso app</h2>
        <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap", marginBottom: 10 }}>
          <button type="button" style={{ padding: "10px 18px", fontSize: "11px", fontWeight: 600, color: white, background: gray950, border: "none", borderRadius: 8, cursor: "pointer", fontFamily: "inherit" }}>Baixe na App Store</button>
          <button type="button" style={{ padding: "10px 18px", fontSize: "11px", fontWeight: 600, color: white, background: gray950, border: "none", borderRadius: 8, cursor: "pointer", fontFamily: "inherit" }}>Baixe no Google Play</button>
        </div>
        <div style={{ fontSize: "10px", color: gray600 }}>+37 mil avaliações · 4.6</div>
      </section>

      {/* BLOCO 15 — Conexa News → Revivaz em foco: título + "Veja tudo" + 3 cards */}
      <section style={{ padding: "24px 14px", background: white }}>
        <h2 style={{ fontFamily: "'Nunito',sans-serif", fontWeight: 700, fontSize: "16px", color: gray950, marginBottom: 6 }}>Revivaz em foco</h2>
        <p style={{ fontSize: "11px", color: gray600, marginBottom: 12 }}>Fique por dentro dos principais acontecimentos e conteúdos da Revivaz.</p>
        <button type="button" style={{ padding: "6px 12px", fontSize: "10px", fontWeight: 600, color: teal700, background: "none", border: "none", marginBottom: 14, cursor: "pointer", fontFamily: "inherit" }}>Veja tudo</button>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {NEWS.map((n, i) => (
            <div key={i} style={{ padding: "12px", background: gray050, borderRadius: 10, border: `1px solid ${gray200}` }}>
              <div style={{ fontSize: "11px", fontWeight: 600, color: gray950, marginBottom: 2 }}>{n.titulo}</div>
              <div style={{ fontSize: "9px", color: gray600 }}>{n.cat} · {n.data}</div>
            </div>
          ))}
        </div>
      </section>

      {/* BLOCO 16 — Footer (multi-coluna igual Conexa) */}
      <footer style={{ background: gray950, color: "rgba(255,255,255,0.7)", padding: "24px 14px 16px", fontSize: "10px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr 1fr", gap: 20, marginBottom: 20 }}>
          <div>
            <div style={{ fontWeight: 700, color: teal300, marginBottom: 8, fontSize: "13px" }}>Revivaz</div>
            <p style={{ lineHeight: 1.5 }}>Atendimento solidário em saúde mental. Psiquiatras e psicólogos conectados a quem mais precisa.</p>
          </div>
          <div>
            <div style={{ fontWeight: 700, color: white, marginBottom: 8 }}>Institucional</div>
            {["Sobre", "Para profissionais", "Contato", "Privacidade"].map((l) => (
              <div key={l} style={{ marginBottom: 4 }}><button type="button" style={{ background: "none", border: "none", color: "inherit", cursor: "pointer", padding: 0, fontFamily: "inherit", fontSize: "10px" }}>{l}</button></div>
            ))}
          </div>
          <div>
            <div style={{ fontWeight: 700, color: white, marginBottom: 8 }}>Contato</div>
            <p>contato@revivaz.com.br</p>
          </div>
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 12, fontSize: "9px" }}>© Revivaz. Atendimento solidário em saúde mental.</div>
      </footer>

      {/* Modal Agendamento (sem login) */}
      {agendarOpen && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }} onClick={(e) => e.target === e.currentTarget && (setAgendarOpen(false))}>
          <div style={{ background: white, borderRadius: 16, maxWidth: 380, width: "100%", maxHeight: "90vh", overflowY: "auto", boxShadow: "0 10px 40px rgba(0,0,0,0.2)" }} onClick={(e) => e.stopPropagation()}>
            <div style={{ padding: "18px 20px", borderBottom: `1px solid ${gray200}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h3 style={{ fontFamily: "'Nunito',sans-serif", fontWeight: 700, fontSize: "16px", color: gray950 }}>Agendar consulta</h3>
              <button type="button" onClick={() => setAgendarOpen(false)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "18px", color: gray600 }}>×</button>
            </div>
            <div style={{ padding: "20px" }}>
              {!agendarConfirmado ? (
                <>
                  <div style={{ marginBottom: 12 }}>
                    <label style={{ display: "block", fontSize: "10px", fontWeight: 600, color: gray600, marginBottom: 4 }}>Tipo</label>
                    <div style={{ display: "flex", gap: 8 }}>
                      {(["presencial", "online"] as const).map((t) => (
                        <button key={t} type="button" onClick={() => setForm({ ...form, tipo: t })} style={{ flex: 1, padding: "8px", fontSize: "11px", fontWeight: 600, border: `2px solid ${form.tipo === t ? teal700 : gray200}`, background: form.tipo === t ? teal050 : white, color: form.tipo === t ? teal700 : gray600, borderRadius: 8, cursor: "pointer", fontFamily: "inherit" }}>{t === "presencial" ? "Presencial" : "Online"}</button>
                      ))}
                    </div>
                  </div>
                  <div style={{ marginBottom: 12 }}>
                    <label style={{ display: "block", fontSize: "10px", fontWeight: 600, color: gray600, marginBottom: 4 }}>Especialidade</label>
                    <select value={form.especialidade} onChange={(e) => setForm({ ...form, especialidade: e.target.value as "psiquiatria" | "psicologia" })} style={{ width: "100%", padding: "8px", fontSize: "11px", border: `1px solid ${gray200}`, borderRadius: 8, fontFamily: "inherit" }}>
                      <option value="psiquiatria">Psiquiatria</option>
                      <option value="psicologia">Psicologia</option>
                    </select>
                  </div>
                  <div style={{ marginBottom: 12 }}>
                    <label style={{ display: "block", fontSize: "10px", fontWeight: 600, color: gray600, marginBottom: 4 }}>Data</label>
                    <input type="date" value={form.data} onChange={(e) => setForm({ ...form, data: e.target.value })} style={{ width: "100%", padding: "8px", fontSize: "11px", border: `1px solid ${gray200}`, borderRadius: 8, boxSizing: "border-box" }} />
                  </div>
                  <div style={{ marginBottom: 12 }}>
                    <label style={{ display: "block", fontSize: "10px", fontWeight: 600, color: gray600, marginBottom: 4 }}>Horário</label>
                    <input type="time" value={form.hora} onChange={(e) => setForm({ ...form, hora: e.target.value })} style={{ width: "100%", padding: "8px", fontSize: "11px", border: `1px solid ${gray200}`, borderRadius: 8, boxSizing: "border-box" }} />
                  </div>
                  <div style={{ marginBottom: 12 }}>
                    <label style={{ display: "block", fontSize: "10px", fontWeight: 600, color: gray600, marginBottom: 4 }}>Nome</label>
                    <input type="text" placeholder="Seu nome" value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })} style={{ width: "100%", padding: "8px", fontSize: "11px", border: `1px solid ${gray200}`, borderRadius: 8, boxSizing: "border-box" }} />
                  </div>
                  <div style={{ marginBottom: 12 }}>
                    <label style={{ display: "block", fontSize: "10px", fontWeight: 600, color: gray600, marginBottom: 4 }}>Telefone (WhatsApp)</label>
                    <input type="tel" placeholder="(11) 99999-9999" value={form.telefone} onChange={(e) => setForm({ ...form, telefone: e.target.value })} style={{ width: "100%", padding: "8px", fontSize: "11px", border: `1px solid ${gray200}`, borderRadius: 8, boxSizing: "border-box" }} />
                  </div>
                  <div style={{ marginBottom: 16 }}>
                    <label style={{ display: "block", fontSize: "10px", fontWeight: 600, color: gray600, marginBottom: 4 }}>E-mail</label>
                    <input type="email" placeholder="seu@email.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} style={{ width: "100%", padding: "8px", fontSize: "11px", border: `1px solid ${gray200}`, borderRadius: 8, boxSizing: "border-box" }} />
                  </div>
                  <button type="button" onClick={() => setAgendarConfirmado(true)} style={{ width: "100%", padding: "12px", fontSize: "12px", fontWeight: 700, color: white, background: teal700, border: "none", borderRadius: 10, cursor: "pointer", fontFamily: "inherit" }}>Confirmar agendamento</button>
                </>
              ) : (
                <div style={{ textAlign: "center", padding: "20px 0" }}>
                  <div style={{ fontSize: "36px", marginBottom: 10 }}>✓</div>
                  <h4 style={{ fontFamily: "'Nunito',sans-serif", fontWeight: 700, fontSize: "16px", color: green700, marginBottom: 8 }}>Agendamento realizado!</h4>
                  <p style={{ fontSize: "11px", color: gray600 }}>Você receberá a confirmação por WhatsApp.</p>
                  <button type="button" onClick={() => setAgendarOpen(false)} style={{ marginTop: 16, padding: "10px 20px", fontSize: "11px", fontWeight: 600, color: white, background: teal700, border: "none", borderRadius: 8, cursor: "pointer", fontFamily: "inherit" }}>Fechar</button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Modal Receita WhatsApp */}
      {receitaModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }} onClick={() => !receitaEnviada && setReceitaModal(false)}>
          <div style={{ background: white, borderRadius: 16, maxWidth: 340, width: "100%", padding: "20px" }} onClick={(e) => e.stopPropagation()}>
            <h3 style={{ fontFamily: "'Nunito',sans-serif", fontWeight: 700, fontSize: "14px", color: gray950, marginBottom: 10 }}>Enviar receita por WhatsApp</h3>
            {!receitaEnviada ? (
              <>
                <p style={{ fontSize: "10px", color: gray600, marginBottom: 12 }}>O profissional envia a receita para o número informado no agendamento.</p>
                <button type="button" onClick={() => { setReceitaEnviada(true); setTimeout(() => { setReceitaModal(false); setReceitaEnviada(false); }, 2000); }} style={{ width: "100%", padding: "10px", fontSize: "11px", fontWeight: 600, color: white, background: green500, border: "none", borderRadius: 8, cursor: "pointer", fontFamily: "inherit" }}>Simular envio</button>
              </>
            ) : (
              <p style={{ fontSize: "12px", color: green700, fontWeight: 600 }}>Receita enviada por WhatsApp.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
