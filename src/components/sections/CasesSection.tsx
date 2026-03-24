import { useState, useEffect, useRef, useCallback } from "react";
import { LiquidMetalButton } from "@/components/ui/LiquidMetalButton";
import { LiquidMetalIconButton } from "@/components/ui/LiquidMetalIconButton";
import { CasePreviewRenderer } from "@/components/cases/CasePreviewRenderer";
import { CASE_PREVIEWS } from "@/data/casePreviews";
import { getCasesHref, isCasesModalRouteEnabled } from "@/config/casesModal";
import { useI18n } from "@/i18n/I18nProvider";

/* ═══════════════════════════════════════════════
   CONCEITO: "INTELLIGENCE DOSSIER"
   Seção escura (pattern interruption) — contraste
   máximo com as seções claras ao redor.
   
   UX / PNL aplicado:
   ▸ Efeito Zeigarnik → teaser visível, detalhe via hover
   ▸ Ancoragem numérica → números grandes guiam o olho
   ▸ Prova social → resultado sempre à vista
   ▸ Interrupção de padrão → dark block chama atenção
   ▸ Micro-commitment → hover ativa curiosidade
   ▸ Split-screen → F-pattern de leitura natural
═══════════════════════════════════════════════ */

const P = {
  bg:       "#000000",
  bgSoft:   "#0a0a0a",
  surface:  "#141414",
  border:   "rgba(255,255,255,0.06)",
  orange:   "#FF4500",
  orangeAlt:"#FF6D00",
  silver:   "#c0c0c0",
  silverDim:"rgba(192,192,192,0.35)",
  heavy:    "#1C1A16",
  cream:    "#F5F0E8",
  warm:     "#F9F9F4",
  neutral:  "rgba(255,255,255,0.45)",
  white:    "#FFFFFF",
  metalHL:  "rgba(255,255,255,0.07)",
};

/* ─── CASE DATA ────────────────────────────────
   Alinhado às 8 categorias do Hero Carousel
   (HERO_CAROUSEL_ITEMS em src/data/heroCarousel.ts)
──────────────────────────────────────────────── */
/* Tipos de solução — genéricos e escaláveis (sem nichos fixos) */
const CASES = [
  {
    id: 1, num: "01", cat: "Sites",
    title: "Sites de Alta Conversão",
    tagline: "Landings que convertem",
    result: "+240%", resultLabel: "Taxa de conversão",
    desc: "One-page premium com animações GSAP, prova social dinâmica e A/B testing. Tipo: landing de alto impacto — entrega leads qualificados em 48h do launch.",
    tags: ["React", "GSAP", "Analytics", "SEO"],
    visual: "site",
  },
  {
    id: 2, num: "02", cat: "Apps",
    title: "Aplicativos Mobile",
    tagline: "Nativo iOS + Android",
    result: "4wk",   resultLabel: "Do wireframe ao ar",
    desc: "Tipo: app mobile nativo — autenticação, geolocalização e push. Validação de mercado antes do investimento total.",
    tags: ["Flutter", "Firebase", "Maps API"],
    visual: "app",
  },
  {
    id: 3, num: "03", cat: "SaaS",
    title: "Plataformas SaaS",
    tagline: "Fintech, logística, educação, saúde, B2B",
    result: "12k",   resultLabel: "Usuários/mês",
    desc: "SaaS para múltiplos segmentos — fintech, logística, educação, saúde, marketplaces B2B, CRM interno, automação de vendas e painéis operacionais. Arquitetura multi-tenant, billing white-label e analytics em tempo real. Do conceito à escala em 8 semanas.",
    tags: ["Next.js", "Supabase", "Stripe", "AWS"],
    visual: "saas",
  },
  {
    id: 4, num: "04", cat: "BaaS",
    title: "BaaS & Infraestrutura",
    tagline: "APIs e compliance",
    result: "99.9%", resultLabel: "Uptime garantido",
    desc: "Tipo: infra bancária — KYC, transações, webhooks e painel de compliance. Deploy em AWS com SLA enterprise.",
    tags: ["Node.js", "AWS Lambda", "Stripe", "KYC"],
    visual: "baas",
  },
  {
    id: 5, num: "05", cat: "N8N",
    title: "Automações N8N Reais",
    tagline: "BaaS · ETL diário · Blog com IA",
    result: "−80%",  resultLabel: "Tempo manual",
    desc: "Tipo: orquestração n8n com 3 casos reais: (1) fluxo de BaaS com certificado por ambiente, (2) automação ETL de carga diária com split de entidades e persistência, e (3) pipeline de blog com IA (conteúdo + imagem + watermark + resposta por webhook).",
    tags: ["N8N", "BaaS", "ETL", "OpenAI", "DALL-E", "Webhook"],
    visual: "n8n",
  },
  {
    id: 6, num: "06", cat: "UI/UX",
    title: "UI/UX Design",
    tagline: "Interfaces que convertem",
    result: "3×",   resultLabel: "Engajamento",
    desc: "Tipo: design system completo — pesquisa, wireframes, Figma e protótipos. Do conceito à entrega para o time de dev.",
    tags: ["Figma", "Protopie", "Research", "Design System"],
    visual: "design",
  },
  {
    id: 7, num: "07", cat: "Low-code",
    title: "Low-code",
    tagline: "MVP em semanas",
    result: "6wk",  resultLabel: "Time to market",
    desc: "Tipo: validação rápida — Airtable, Bubble, Glide. Protótipos funcionais sem contratar equipe de desenvolvimento.",
    tags: ["Airtable", "Bubble", "Glide", "Notion"],
    visual: "lowcode",
  },
  {
    id: 8, num: "08", cat: "IA",
    title: "IA Corporativa Local",
    tagline: "On-premise · RAG · Self-service",
    result: "0%",   resultLabel: "Dado sensível em cloud",
    desc: "IA generativa dentro da empresa: LLM local (Ollama), base de conhecimento própria com RAG, relatórios em português que viram SQL e dashboard. Privacidade e controle operacional totais.",
    tags: ["Ollama", "RAG", "Supabase", "LangChain"],
    visual: "ai",
  },
];

const N8N_VARIANT_CONTENT = [
  {
    desc: "Tipo: pipeline de blog com IA — gatilho por webhook, geração de conteúdo com assistente de IA, criação de imagem (DALL-E), aplicação de watermark/composição e resposta automatizada.",
    tags: ["N8N", "OpenAI", "DALL-E", "Webhook", "Composição"],
  },
  {
    desc: "Tipo: automação ETL de carga diária — valida quantidade, consulta origem, faz split por entidade (contato, escolaridade, endereço e socio), persiste os dados e dispara callback HTTP.",
    tags: ["N8N", "ETL", "Carga Diária", "Split", "HTTP Request"],
  },
  {
    desc: "Tipo: fluxo de BaaS com certificado — orquestração visual de etapas certificadas entre blocos/ambientes, padronizando execução, roteamento e controle operacional.",
    tags: ["N8N", "BaaS", "Certificação", "Orquestração"],
  },
] as const;

/* ─── ANIMATED RESULT NUMBER ─────────────────── */
function AnimResult({ value, label, active }: { value: string; label: string; active: boolean }) {
  const [displayed, setDisplayed] = useState("—");
  const prev = useRef<string | null>(null);

  useEffect(() => {
    if (!active) return;
    if (prev.current === value) return;
    prev.current = value;
    let i = 0;
    const chars = "0123456789+−×%kwk".split("");
    const target = value;
    const inter = setInterval(() => {
      i++;
      if (i > 12) { setDisplayed(target); clearInterval(inter); return; }
      setDisplayed(
        target.split("").map((c, idx) =>
          idx < Math.floor((i/12)*target.length)
            ? c
            : chars[Math.floor(Math.random()*chars.length)]
        ).join("")
      );
    }, 45);
    return () => clearInterval(inter);
  }, [value, active]);

  return (
    <div style={{ textAlign:"center" }}>
      <div style={{
        fontFamily:"'Instrument Serif',serif",
        fontSize:"clamp(48px,5vw,72px)",
        fontWeight:"400",
        lineHeight:"1",
        color: active ? P.orange : "rgba(255,255,255,0.12)",
        textShadow: active ? `0 0 40px ${P.orange}55` : "none",
        fontStyle:"italic",
        letterSpacing:"-2px",
        transition:"color .6s ease, text-shadow .6s ease",
        fontVariantNumeric:"tabular-nums",
      }}>{active ? displayed : "—"}</div>
      <div style={{
        fontFamily:"'Space Mono',monospace",
        fontSize:"9px",
        color: active ? "rgba(255,255,255,0.45)" : "rgba(255,255,255,0.12)",
        letterSpacing:"3px", textTransform:"uppercase",
        marginTop:"8px",
        transition:"color .5s ease",
      }}>{label}</div>
    </div>
  );
}

/* ─── SCAN LINE COMPONENT ─────────────────────── */
function ScanLine({ active }: { active: boolean }) {
  return active ? (
    <div style={{
      position:"absolute", left:0, right:0, height:"1px",
      background:`linear-gradient(90deg,transparent,${P.orange}88,transparent)`,
      animation:"scanDown 3s ease-in-out infinite",
      pointerEvents:"none", zIndex:3,
    }}/>
  ) : null;
}

/* ─── MAIN COMPONENT ─────────────────────────── */
export function CasesSection() {
  const { language } = useI18n();
  const isPt = language === "pt";
  const copy = isPt
    ? {
        titleA: "Projetos que",
        titleB: "transformam",
        titleC: "negócios reais.",
        firstPrototype: "Primeiro protótipo",
        verticals: "Verticais",
        lockin: "Lock-in",
        allCases: "Ver todos os cases →",
      }
    : {
        titleA: "Projects that",
        titleB: "transform",
        titleC: "real businesses.",
        firstPrototype: "First prototype",
        verticals: "Verticals",
        lockin: "Lock-in",
        allCases: "See all cases →",
      };
  const [active,  setActive]  = useState(0);
  const [entered, setEntered] = useState(false);
  const [transitioning, setTransitioning] = useState(false);
  const [caseVariant, setCaseVariant] = useState(0);
  const [previewFading, setPreviewFading] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const previewScrollRef = useRef<HTMLDivElement>(null);
  const c = CASES[active];
  const variantCount = CASE_PREVIEWS[c.visual]?.length ?? 2;
  const n8nVariant = N8N_VARIANT_CONTENT[caseVariant] ?? N8N_VARIANT_CONTENT[0];
  const resolvedDesc = c.visual === "n8n" ? n8nVariant.desc : c.desc;
  const resolvedTags = c.visual === "n8n" ? [...n8nVariant.tags] : c.tags;

  useEffect(() => {
    if (caseVariant >= variantCount) setCaseVariant(0);
  }, [variantCount, caseVariant]);

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,700&family=Instrument+Serif:ital@0;1&family=Space+Mono:wght@400;700&display=swap";
    document.head.appendChild(link);

    const s = document.createElement("style");
    s.textContent = `
      @keyframes panelIn  { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
      @keyframes rowIn    { from{opacity:0;transform:translateX(-16px)} to{opacity:1;transform:translateX(0)} }
      @keyframes shimmer  { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
      @keyframes scanDown { 0%{top:0;opacity:0} 10%{opacity:1} 90%{opacity:.5} 100%{top:100%;opacity:0} }
      @keyframes pulse    { 0%,100%{opacity:.7;transform:scale(1)} 50%{opacity:1;transform:scale(1.12)} }
      @keyframes floatY   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-5px)} }
      @keyframes fadeSlideIn { from{opacity:0;transform:translateX(20px)} to{opacity:1;transform:translateX(0)} }
      @keyframes orb      { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(-15px,-20px) scale(1.05)} }

      .case-preview-scroll::-webkit-scrollbar { width: 8px; }
      .case-preview-scroll::-webkit-scrollbar-track { background: rgba(255,255,255,0.04); border-radius: 4px; }
      .case-preview-scroll::-webkit-scrollbar-thumb { background: rgba(255,69,0,0.4); border-radius: 4px; }
      .case-preview-scroll::-webkit-scrollbar-thumb:hover { background: rgba(255,69,0,0.6); }
    `;
    document.head.appendChild(s);

    setTimeout(() => setEntered(true), 150);
    return () => { document.head.removeChild(s); };
  }, []);

  const changeCase = useCallback((idx: number) => {
    if (idx === active || transitioning) return;
    setCaseVariant(0);
    setTransitioning(true);
    setTimeout(() => {
      setActive(idx);
      setTimeout(() => setTransitioning(false), 400);
    }, 160);
  }, [active, transitioning]);

  const switchVariant = useCallback((v: number) => {
    if (v === caseVariant || v < 0 || v >= variantCount) return;
    setPreviewFading(true);
    setTimeout(() => {
      setCaseVariant(v);
      if (previewScrollRef.current) previewScrollRef.current.scrollTop = 0;
      setTimeout(() => setPreviewFading(false), 50);
    }, 150);
  }, [caseVariant, variantCount]);

  return (
    <section
      id="cases"
      ref={sectionRef}
      data-dark-section
      className="bg-hero-dark"
      style={{
        position:"relative",
        overflow:"hidden",
        fontFamily:"'DM Sans',sans-serif",
        minHeight:"100vh",
        display:"flex",
        flexDirection:"column",
        justifyContent:"center",
        scrollMarginTop: "calc(4.5rem + env(safe-area-inset-top, 0px))",
      }}
    >
      {/* ── TOP BORDER ── */}
      <div style={{ position:"absolute", top:0, left:0, right:0, height:"1px", background:`linear-gradient(90deg,transparent,${P.orange}33,${P.orange}66,${P.orange}33,transparent)` }}/>
      <div style={{ position:"absolute", bottom:0, left:0, right:0, height:"1px", background:`linear-gradient(90deg,transparent,rgba(255,255,255,0.07),transparent)` }}/>

      <div className="cases-section-inner">

        {/* ══ HEADER ══ */}
        <div style={{
          display:"grid", gridTemplateColumns:"1fr auto",
          alignItems:"end", marginBottom:"56px",
          gap:"32px",
          opacity:entered?1:0, animation:entered?"panelIn .7s ease both":"none",
        }}>
          <div>
            <div style={{ display:"flex", alignItems:"center", gap:"14px", marginBottom:"16px" }}>
              <div style={{ width:"1px", height:"28px", background:`linear-gradient(180deg,${P.orange},transparent)` }}/>
              <span style={{ fontFamily:"'Space Mono',monospace", fontSize:"10px", color:P.orange, letterSpacing:"5px", textTransform:"uppercase" }}>CASES</span>
              <div style={{ flex:1, height:"1px", background:`linear-gradient(90deg,rgba(255,69,0,0.2),transparent)`, maxWidth:"80px" }}/>
            </div>

            <h2 style={{
              fontFamily:"'Instrument Serif',serif",
              fontSize:"clamp(38px,4.5vw,64px)",
              fontWeight:"400",
              lineHeight:"1.04",
              letterSpacing:"-1.5px",
              color:P.warm,
              margin:0,
            }}>
              {copy.titleA}{" "}
              <em style={{
                fontStyle:"italic",
                background:`linear-gradient(90deg,${P.orange},${P.orangeAlt},#e8e8e8,${P.orange})`,
                backgroundSize:"200% auto",
                WebkitBackgroundClip:"text",
                WebkitTextFillColor:"transparent",
                animation:"shimmer 4s linear infinite",
              }}>{copy.titleB}</em>
              <br/>{copy.titleC}
            </h2>
          </div>

          <div style={{ textAlign:"right", paddingBottom:"6px" }}>
            <div style={{ fontFamily:"'Instrument Serif',serif", fontSize:"56px", fontWeight:"400", fontStyle:"italic", color:"rgba(255,255,255,0.06)", lineHeight:1, letterSpacing:"-2px" }}>
              {String(active+1).padStart(2,"0")}
              <span style={{ fontSize:"20px", letterSpacing:"-1px" }}>/0{CASES.length}</span>
            </div>
          </div>
        </div>

        {/* ══ MAIN: LEFT LIST + RIGHT STAGE ══ */}
        <div className="cases-main-grid">

          {/* ─── LEFT: NUMBERED LIST ─── */}
          <div style={{ position:"relative" }}>
            <div style={{ position:"absolute", left:"32px", top:"16px", bottom:"16px", width:"1px", background:"rgba(255,255,255,0.05)" }}/>
            <div style={{
              position:"absolute", left:"32px", top:"16px", width:"1px",
              background:`linear-gradient(180deg,${P.orange},${P.orangeAlt})`,
              height:`${((active+0.5)/CASES.length)*100}%`,
              transition:"height .6s cubic-bezier(.23,1,.32,1)",
            }}/>

            {CASES.map((item, i) => {
              const isActive = i === active;
              const delay = i * 80;
              return (
                <div
                  key={item.id}
                  onClick={() => changeCase(i)}
                  style={{
                    position:"relative",
                    display:"flex",
                    alignItems:"center",
                    gap:"18px",
                    padding:"18px 16px 18px 56px",
                    cursor:"pointer",
                    borderRadius:"12px",
                    background: isActive ? "rgba(255,255,255,0.04)" : "transparent",
                    border: isActive ? "1px solid rgba(255,69,0,0.15)" : "1px solid transparent",
                    marginBottom:"6px",
                    transition:"all .35s cubic-bezier(.23,1,.32,1)",
                    opacity:entered?1:0,
                    animation:entered?`rowIn .5s ease ${delay}ms both`:"none",
                  }}
                  onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = "rgba(255,255,255,0.025)"; }}
                  onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = "transparent"; }}
                >
                  <div style={{
                    position:"absolute", left:"26px",
                    width:"13px", height:"13px", borderRadius:"50%",
                    background: isActive ? P.orange : "transparent",
                    border:`1px solid ${isActive?P.orange:"rgba(255,255,255,0.15)"}`,
                    boxShadow: isActive ? `0 0 16px ${P.orange}66` : "none",
                    transition:"all .35s ease",
                    animation: isActive ? "pulse 2s ease-in-out infinite" : "none",
                    zIndex:2,
                  }}/>

                  <span style={{
                    fontFamily:"'Space Mono',monospace",
                    fontSize:"10px", letterSpacing:"2px",
                    color: isActive ? P.orange : "rgba(255,255,255,0.2)",
                    transition:"color .35s ease",
                    minWidth:"20px",
                  }}>{item.num}</span>

                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{
                      fontFamily:"'Instrument Serif',serif",
                      fontSize:"clamp(15px,1.5vw,18px)",
                      fontWeight:"400",
                      color: isActive ? P.warm : "rgba(255,255,255,0.35)",
                      lineHeight:"1.2",
                      letterSpacing:"-.3px",
                      transition:"color .35s ease",
                      whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis",
                    }}>{item.title}</div>

                    <div style={{
                      fontFamily:"'Space Mono',monospace",
                      fontSize:"9px",
                      color: isActive ? P.orange : "rgba(255,255,255,0.15)",
                      letterSpacing:"2px", textTransform:"uppercase",
                      marginTop:"3px",
                      transition:"color .35s ease",
                    }}>{item.cat} · {item.tagline}</div>
                  </div>

                  <div style={{
                    fontFamily:"'Space Mono',monospace",
                    fontSize:"11px", fontWeight:"700",
                    color: isActive ? P.orange : "rgba(255,255,255,0.12)",
                    background: isActive ? "rgba(255,69,0,0.12)" : "transparent",
                    border:`1px solid ${isActive?"rgba(255,69,0,0.25)":"transparent"}`,
                    padding:"3px 8px", borderRadius:"6px",
                    transition:"all .35s ease",
                    whiteSpace:"nowrap",
                  }}>{item.result}</div>

                  {isActive && (
                    <div style={{
                      position:"absolute", bottom:0, left:"56px", right:"16px", height:"1px",
                      background:`linear-gradient(90deg,${P.orange}66,transparent)`,
                    }}/>
                  )}
                </div>
              );
            })}
          </div>

          {/* ─── RIGHT: FEATURE STAGE ─── */}
          <div style={{
            position:"relative",
            background:"rgba(255,255,255,0.025)",
            border:`1px solid ${P.border}`,
            borderRadius:"20px",
            overflow:"hidden",
            minHeight:"520px",
            display:"flex",
            flexDirection:"column",
          }}>
            <ScanLine active={!transitioning} />

            <div style={{
              flex:1, display:"flex", flexDirection:"column",
              opacity: transitioning ? 0 : 1,
              transform: transitioning ? "translateY(8px)" : "translateY(0)",
              transition:"opacity .3s ease, transform .3s ease",
            }}>
              {/* ─── PREVIEW MODE: scrollable case preview (sempre visível) ─── */}
              <div
                ref={previewScrollRef}
                className="case-preview-scroll"
                style={{
                  height:"420px",
                  overflowY:"auto",
                  overflowX:"hidden",
                  position:"relative",
                  borderBottom:`1px solid rgba(255,255,255,0.05)`,
                  scrollbarWidth:"thin",
                  scrollbarColor:"rgba(255,69,0,0.3) transparent",
                }}
              >
                {/* Sticky top bar: category badge + variant indicator */}
                <div style={{
                  position:"sticky", top:0, zIndex:5,
                  display:"flex", justifyContent:"space-between", alignItems:"center",
                  padding:"6px 12px",
                  background:"rgba(0,0,0,0.7)",
                  backdropFilter:"blur(8px)",
                  WebkitBackdropFilter:"blur(8px)",
                  borderBottom:"1px solid rgba(255,255,255,0.06)",
                }}>
                  <span style={{
                    fontFamily:"'Space Mono',monospace",
                    fontSize:"8px", letterSpacing:"2px", textTransform:"uppercase",
                    color:P.orange,
                    background:"rgba(255,69,0,0.12)",
                    border:"1px solid rgba(255,69,0,0.2)",
                    padding:"2px 8px", borderRadius:"100px",
                  }}>{c.cat}</span>
                  <span style={{
                    fontFamily:"'Space Mono',monospace",
                    fontSize:"8px", letterSpacing:"1px",
                    color:"rgba(255,255,255,0.4)",
                  }}>{caseVariant + 1}/{variantCount}</span>
                </div>

                {/* Preview content with fade transition */}
                <div style={{
                  opacity: previewFading ? 0 : 1,
                  transition:"opacity .15s ease",
                }}>
                  <CasePreviewRenderer caseType={c.visual} variant={caseVariant} />
                </div>
              </div>

              <div style={{ padding:"32px 36px", flex:1, display:"flex", flexDirection:"column" }}>
                <div style={{ display:"grid", gridTemplateColumns:"1fr auto", gap:"24px", alignItems:"start", marginBottom:"20px" }}>
                  <div>
                    <h3 style={{
                      fontFamily:"'Instrument Serif',serif",
                      fontSize:"clamp(22px,2.2vw,28px)",
                      fontWeight:"400", letterSpacing:"-.5px", lineHeight:"1.1",
                      color:P.warm, margin:"0 0 8px",
                    }}>{c.title}</h3>

                    <p style={{
                      fontFamily:"'DM Sans',sans-serif",
                      fontSize:"12px", fontWeight:"600",
                      color:P.orange, letterSpacing:".8px",
                      textTransform:"uppercase", margin:0,
                    }}>{c.tagline}</p>
                  </div>

                  <div style={{ animation:"floatY 3s ease-in-out infinite" }}>
                    <AnimResult value={c.result} label={c.resultLabel} active={!transitioning} />
                  </div>
                </div>

                <div style={{ height:"1px", background:`linear-gradient(90deg,${P.orange}55,rgba(255,255,255,0.04) 50%,transparent)`, marginBottom:"20px" }}/>

                <p style={{
                  fontFamily:"'DM Sans',sans-serif",
                  fontSize:"14px", lineHeight:"1.75",
                  color:P.neutral,
                  margin:"0 0 24px", flex:1,
                }}>{resolvedDesc}</p>

                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:"12px" }}>
                  <div style={{ display:"flex", gap:"7px", flexWrap:"wrap" }}>
                    {resolvedTags.map(t=>(
                      <span key={t} style={{
                        fontFamily:"'Space Mono',monospace",
                        fontSize:"9px", letterSpacing:"1px",
                        color:"rgba(255,255,255,0.3)",
                        border:"1px solid rgba(255,255,255,0.08)",
                        padding:"3px 10px", borderRadius:"4px",
                      }}>{t}</span>
                    ))}
                  </div>

                  <div style={{ display:"flex", gap:"8px", alignItems:"center" }}>
                    <span style={{
                      fontFamily:"'Space Mono',monospace",
                      fontSize:"9px", color:"rgba(255,255,255,0.35)",
                      letterSpacing:"1px", padding:"0 2px",
                    }}>{caseVariant + 1}/{variantCount}</span>
                    <LiquidMetalIconButton
                      label="←"
                      onClick={()=>switchVariant((caseVariant - 1 + variantCount) % variantCount)}
                      disabled={caseVariant === 0}
                      highlighted={caseVariant === 0}
                    />
                    <LiquidMetalIconButton
                      label="→"
                      onClick={()=>switchVariant((caseVariant + 1) % variantCount)}
                      disabled={caseVariant === variantCount - 1}
                      highlighted={caseVariant === variantCount - 1}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div style={{
              position:"absolute", bottom:0, left:0, right:0, height:"2px",
              background:"rgba(255,255,255,0.04)",
            }}>
              <div style={{
                height:"100%",
                width:`${((active+1)/CASES.length)*100}%`,
                background:`linear-gradient(90deg,${P.orange},${P.orangeAlt})`,
                transition:"width .6s cubic-bezier(.23,1,.32,1)",
                boxShadow:`0 0 10px ${P.orange}66`,
              }}/>
            </div>
          </div>
        </div>

        {/* ══ FOOTER ROW ══ */}
        <div style={{
          marginTop:"56px",
          display:"flex", justifyContent:"space-between", alignItems:"center",
          borderTop:"1px solid rgba(255,255,255,0.05)",
          paddingTop:"32px",
          opacity:entered?1:0,
          animation:entered?"panelIn .7s ease .4s both":"none",
          flexWrap:"wrap", gap:"20px",
        }}>
          <div style={{ display:"flex", gap:"40px" }}>
            {[
              ["72h", copy.firstPrototype],
              ["8", copy.verticals],
              ["0", copy.lockin],
            ].map(([v,l],i)=>(
              <div key={i} style={{ animation:`floatY ${2.5+i*.5}s ease-in-out infinite`, animationDelay:`${i*.25}s` }}>
                <div style={{ fontFamily:"'Instrument Serif',serif", fontSize:"28px", fontStyle:"italic", color:P.orange, lineHeight:1, textShadow:`0 0 20px ${P.orange}44` }}>{v}</div>
                <div style={{ fontFamily:"'Space Mono',monospace", fontSize:"8px", color:"rgba(255,255,255,0.25)", letterSpacing:"2px", marginTop:"4px", textTransform:"uppercase" }}>{l}</div>
              </div>
            ))}
          </div>

          {isCasesModalRouteEnabled() && (
            <LiquidMetalButton label={copy.allCases} to={getCasesHref()} size="wide" />
          )}
        </div>
      </div>
    </section>
  );
}
