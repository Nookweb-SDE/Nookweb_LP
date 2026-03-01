import { useState, useEffect, useRef, useCallback } from "react";
import { LiquidMetalButton } from "@/components/ui/LiquidMetalButton";

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
const CASES = [
  {
    id: 1, num: "01", cat: "Sites",
    title: "Sites de Alto Impacto",
    tagline: "+240% de conversão",
    result: "+240%", resultLabel: "Taxa de conversão",
    desc: "One-page premium com animações GSAP, prova social dinâmica e A/B testing — entregou leads qualificados em 48h do launch.",
    tags: ["React", "GSAP", "Analytics", "SEO"],
    visual: "site",
  },
  {
    id: 2, num: "02", cat: "Apps",
    title: "Aplicativos Mobile",
    tagline: "Validação em 4 semanas",
    result: "4wk",   resultLabel: "Do wireframe ao ar",
    desc: "Nativo iOS/Android com autenticação, geolocalização e notificações push. Validação de mercado antes do investimento total.",
    tags: ["Flutter", "Firebase", "Maps API"],
    visual: "app",
  },
  {
    id: 3, num: "03", cat: "SaaS",
    title: "Plataformas SaaS",
    tagline: "Multi-tenant com recorrência",
    result: "12k",   resultLabel: "Usuários/mês",
    desc: "White-label com billing automático, onboarding guiado e painel de métricas por tenant — do zero a produção em 8 semanas.",
    tags: ["Next.js", "Supabase", "Stripe", "AWS"],
    visual: "saas",
  },
  {
    id: 4, num: "04", cat: "BaaS",
    title: "BaaS & Infraestrutura",
    tagline: "Infra bancária em semanas",
    result: "99.9%", resultLabel: "Uptime garantido",
    desc: "BaaS com KYC automatizado, transações PIX, webhooks e painel de compliance. Deploy em AWS com SLA enterprise.",
    tags: ["Node.js", "AWS Lambda", "Stripe", "KYC"],
    visual: "baas",
  },
  {
    id: 5, num: "05", cat: "N8N",
    title: "Automações N8N",
    tagline: "Workflows sem código",
    result: "−80%",  resultLabel: "Tempo manual",
    desc: "Integrações entre CRM, Google Sheets, e-mail e APIs. Automação de onboarding, follow-up e relatórios recorrentes.",
    tags: ["N8N", "Webhooks", "Zapier", "APIs"],
    visual: "n8n",
  },
  {
    id: 6, num: "06", cat: "UI/UX",
    title: "UI/UX Design",
    tagline: "Interfaces que convertem",
    result: "3×",   resultLabel: "Engajamento",
    desc: "Pesquisa de usuário, wireframes, protótipos Figma e design system. Do conceito à entrega para o time de dev.",
    tags: ["Figma", "Protopie", "Research", "Design System"],
    visual: "design",
  },
  {
    id: 7, num: "07", cat: "Low-code",
    title: "Low-code",
    tagline: "MVP em semanas, não meses",
    result: "6wk",  resultLabel: "Time to market",
    desc: "Plataformas como Airtable, Bubble e Glide. Validação rápida, sem contratar equipe de desenvolvimento.",
    tags: ["Airtable", "Bubble", "Glide", "Notion"],
    visual: "lowcode",
  },
  {
    id: 8, num: "08", cat: "IA",
    title: "IA Integrada",
    tagline: "Chatbot + análise preditiva",
    result: "−70%",  resultLabel: "Tickets manuais",
    desc: "Pipeline de IA integrado ao CRM: triagem de leads, atendimento automatizado e relatórios gerados por LLM em tempo real.",
    tags: ["Claude API", "N8N", "Python", "Webhooks"],
    visual: "ai",
  },
];

/* ─── ABSTRACT SVG VISUALS ───────────────────── */
function Visual({ type, active }: { type: string; active: boolean }) {
  const o = active ? P.orange : "rgba(192,192,192,0.25)";
  const o2 = active ? P.orangeAlt : "rgba(192,192,192,0.12)";
  const fill = active ? "rgba(255,69,0,0.12)" : "rgba(255,255,255,0.03)";

  const map: Record<string, React.ReactNode> = {
    erp: (
      <svg viewBox="0 0 200 140" fill="none" style={{width:"100%",height:"100%"}}>
        <defs>
          <linearGradient id="eg" x1="0" y1="0" x2="200" y2="140" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor={active?P.orange:"#c0c0c0"} stopOpacity=".6"/>
            <stop offset="100%" stopColor={active?P.orangeAlt:"#e8e8e8"} stopOpacity=".2"/>
          </linearGradient>
        </defs>
        {[{x:20,h:60},{x:52,h:90},{x:84,h:50},{x:116,h:110},{x:148,h:75}].map((b,i)=>(
          <g key={i}>
            <rect x={b.x} y={140-b.h-10} width="24" height={b.h} rx="3"
              fill={i===3?fill:"rgba(255,255,255,0.03)"} stroke={i===3?o:o2} strokeWidth={i===3?"1":"0.5"}/>
            {i===3 && <rect x={b.x} y={140-b.h-10} width="24" height={b.h*.4} rx="3" fill={active?"rgba(255,69,0,0.18)":"rgba(255,255,255,0.04)"}/>}
          </g>
        ))}
        {[30,60,90,120].map((y,i)=>(
          <line key={i} x1="10" x2="180" y1={y} y2={y} stroke="rgba(255,255,255,0.05)" strokeWidth=".5" strokeDasharray="4 4"/>
        ))}
        <polyline points="20,100 52,70 84,85 116,30 148,55" stroke={o} strokeWidth={active?"1.5":"0.8"} fill="none" strokeLinejoin="round"/>
        {active && <polyline points="20,100 52,70 84,85 116,30 148,55" stroke={P.orange} strokeWidth="1" fill="none" opacity=".3" strokeLinejoin="round" style={{filter:"blur(3px)"}}/>}
        {[{x:20,y:100},{x:52,y:70},{x:84,y:85},{x:116,y:30},{x:148,y:55}].map((p,i)=>(
          <circle key={i} cx={p.x+12} cy={p.y} r={i===3?4:2.5}
            fill={i===3?P.orange:"rgba(255,255,255,0.15)"} stroke={i===3?P.orangeAlt:"transparent"} strokeWidth="1"/>
        ))}
      </svg>
    ),
    saas: (
      <svg viewBox="0 0 200 140" fill="none" style={{width:"100%",height:"100%"}}>
        <circle cx="100" cy="70" r="22" stroke={o} strokeWidth="1" fill={fill}/>
        <circle cx="100" cy="70" r="12" stroke={o2} strokeWidth=".7" fill="rgba(255,255,255,0.02)"/>
        <circle cx="100" cy="70" r="4" fill={active?P.orange:"rgba(192,192,192,0.3)"}/>
        <ellipse cx="100" cy="70" rx="50" ry="18" stroke="rgba(255,255,255,0.06)" strokeWidth=".5" strokeDasharray="3 3"/>
        <ellipse cx="100" cy="70" rx="70" ry="28" stroke="rgba(255,255,255,0.04)" strokeWidth=".5" strokeDasharray="4 4"/>
        {[0,72,144,216,288].map((a,i)=>{
          const r=50, ax=100+r*Math.cos(a*Math.PI/180), ay=70+18*Math.sin(a*Math.PI/180);
          return (
            <g key={i}>
              <line x1="100" y1="70" x2={ax} y2={ay} stroke={o2} strokeWidth=".4" strokeDasharray="2 3"/>
              <circle cx={ax} cy={ay} r={i===0?6:4} fill={i===0?fill:"rgba(255,255,255,0.04)"}
                stroke={i===0?o:o2} strokeWidth={i===0?"1":".5"}/>
            </g>
          );
        })}
        {[["TENANT A",30,30],["TENANT B",150,28],["TENANT C",155,115],["TENANT D",20,112]].map(([l,x,y],i)=>(
          <text key={i} x={x} y={y} fontSize="7" fill={o2} fontFamily="monospace" opacity=".7">{l as string}</text>
        ))}
      </svg>
    ),
    app: (
      <svg viewBox="0 0 200 140" fill="none" style={{width:"100%",height:"100%"}}>
        <rect x="68" y="8" width="64" height="124" rx="10" stroke={o} strokeWidth="1" fill="rgba(255,255,255,0.02)"/>
        <rect x="68" y="8" width="64" height="20" rx="10" fill={fill} stroke={o} strokeWidth=".5"/>
        <rect x="84" y="12" width="32" height="8" rx="4" fill="rgba(0,0,0,.6)" stroke={o2} strokeWidth=".5"/>
        <rect x="76" y="34" width="48" height="24" rx="3" fill={fill} stroke={o2} strokeWidth=".5"/>
        <rect x="76" y="64" width="20" height="14" rx="2" fill="rgba(255,255,255,0.04)" stroke={o2} strokeWidth=".5"/>
        <rect x="100" y="64" width="24" height="14" rx="2" fill={fill} stroke={o} strokeWidth=".5"/>
        <rect x="76" y="82" width="48" height="8" rx="2" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.05)" strokeWidth=".4"/>
        <rect x="76" y="94" width="30" height="8" rx="2" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.05)" strokeWidth=".4"/>
        <rect x="88" y="118" width="24" height="3" rx="1.5" fill={active?"rgba(255,69,0,0.5)":"rgba(255,255,255,0.1)"}/>
        <circle cx="40" cy="50" r="16" stroke={o2} strokeWidth=".5" fill="rgba(255,255,255,0.02)" strokeDasharray="2 3"/>
        <circle cx="160" cy="95" r="12" stroke={o2} strokeWidth=".5" fill="rgba(255,255,255,0.02)" strokeDasharray="2 3"/>
        <line x1="56" y1="50" x2="68" y2="50" stroke={o2} strokeWidth=".5" strokeDasharray="2 2"/>
        <line x1="132" y1="88" x2="148" y2="95" stroke={o2} strokeWidth=".5" strokeDasharray="2 2"/>
      </svg>
    ),
    ai: (
      <svg viewBox="0 0 200 140" fill="none" style={{width:"100%",height:"100%"}}>
        {[30,60,90].map((y,i)=>(
          <circle key={`l1-${i}`} cx="30" cy={y+10} r="8" stroke={o2} strokeWidth=".8" fill={fill}/>
        ))}
        {[20,50,80,110].map((y,i)=>(
          <circle key={`l2-${i}`} cx="85" cy={y+5} r="8" stroke={o} strokeWidth="1" fill={i===1?fill:"rgba(255,255,255,0.02)"}/>
        ))}
        {[30,60,90].map((y,i)=>(
          <circle key={`l3-${i}`} cx="140" cy={y+10} r="8" stroke={o2} strokeWidth=".8" fill={fill}/>
        ))}
        <circle cx="178" cy="65" r="10" stroke={o} strokeWidth="1.2" fill={fill}/>
        {active && <circle cx="178" cy="65" r="10" stroke={P.orange} strokeWidth="1" fill="none" opacity=".3" style={{filter:"blur(4px)"}}/>}
        {[40,70,100].map((y1,i)=>
          [25,55,85,115].map((y2,j)=>(
            <line key={`${i}-${j}`} x1="38" y1={y1} x2="77" y2={y2} stroke="rgba(255,255,255,0.04)" strokeWidth=".4"/>
          ))
        )}
        {[25,55,85,115].map((y1,i)=>
          [40,70,100].map((y2,j)=>(
            <line key={`${i}-${j}`} x1="93" y1={y1} x2="132" y2={y2} stroke={i===1?"rgba(255,69,0,0.15)":"rgba(255,255,255,0.04)"} strokeWidth=".4"/>
          ))
        )}
        {[40,70,100].map((y,i)=>(
          <line key={i} x1="148" y1={y} x2="168" y2="65" stroke={o2} strokeWidth=".5"/>
        ))}
        {active && <circle cx="85" cy="55" r="5" fill={P.orange} opacity=".6"/>}
      </svg>
    ),
    site: (
      <svg viewBox="0 0 200 140" fill="none" style={{width:"100%",height:"100%"}}>
        <rect x="10" y="10" width="180" height="120" rx="6" stroke={o} strokeWidth="1" fill="rgba(255,255,255,0.02)"/>
        <rect x="10" y="10" width="180" height="22" rx="6" fill={fill} stroke={o} strokeWidth=".5"/>
        {[18,25,32].map((cx,i)=>(
          <circle key={i} cx={cx} cy="21" r="3" fill={i===0?P.orange+"44":o2}/>
        ))}
        <rect x="46" y="15" width="100" height="12" rx="3" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.08)" strokeWidth=".5"/>
        <rect x="18" y="38" width="120" height="14" rx="2" fill={fill}/>
        <rect x="18" y="56" width="80" height="8" rx="2" fill="rgba(255,255,255,0.04)"/>
        <rect x="18" y="68" width="90" height="8" rx="2" fill="rgba(255,255,255,0.03)"/>
        <rect x="18" y="82" width="50" height="18" rx="4" fill={active?"rgba(255,69,0,0.25)":"rgba(255,255,255,0.05)"} stroke={o} strokeWidth=".8"/>
        <rect x="148" y="36" width="36" height="52" rx="3" fill="rgba(255,255,255,0.04)" stroke={o2} strokeWidth=".5"/>
        <text x="156" y="108" fontSize="9" fill={o} fontFamily="monospace" fontWeight="700">+240%</text>
        <polyline points="148,118 158,112 168,115 178,103" stroke={o} strokeWidth="1" fill="none" strokeLinejoin="round"/>
      </svg>
    ),
    baas: (
      <svg viewBox="0 0 200 140" fill="none" style={{width:"100%",height:"100%"}}>
        {[0,1,2].map(i=>(
          <g key={i}>
            <ellipse cx="100" cy={35+i*28} rx="55" ry="14" fill={i===0?fill:"rgba(255,255,255,0.02)"} stroke={i===0?o:o2} strokeWidth={i===0?"1":".5"}/>
            <rect x="45" y={35+i*28} width="110" height="14" fill={i===0?"rgba(255,69,0,0.06)":"rgba(255,255,255,0.01)"} stroke={i===0?o:o2} strokeWidth={i===0?".8":".4"}/>
            <ellipse cx="100" cy={49+i*28} rx="55" ry="14" fill="transparent" stroke={i===0?o:o2} strokeWidth={i===0?"1":".5"}/>
          </g>
        ))}
        {active && (
          <g transform="translate(82,52)">
            <line x1="0" y1="8" x2="8" y2="0" stroke={P.orange} strokeWidth="1.5" strokeLinecap="round"/>
            <line x1="8" y1="0" x2="16" y2="8" stroke={P.orange} strokeWidth="1.5" strokeLinecap="round"/>
            <line x1="0" y1="8" x2="8" y2="16" stroke={P.orange} strokeWidth="1.5" strokeLinecap="round"/>
            <line x1="8" y1="16" x2="16" y2="8" stroke={P.orange} strokeWidth="1.5" strokeLinecap="round"/>
          </g>
        )}
        <text x="76" y="126" fontSize="9" fill={o} fontFamily="monospace">99.9% SLA</text>
        <circle cx="70" cy="123" r="3" fill={active?P.orange:"rgba(192,192,192,0.3)"}/>
      </svg>
    ),
    n8n: (
      <svg viewBox="0 0 200 140" fill="none" style={{width:"100%",height:"100%"}}>
        {[[40,50],[90,35],[90,65],[140,50]].map(([cx,cy],i)=>(
          <g key={i}>
            <rect x={cx-14} y={cy-10} width="28" height="20" rx="4" fill={i===1?fill:"rgba(255,255,255,0.02)"} stroke={i===1?o:o2} strokeWidth=".8"/>
            <line x1={cx+14} y1={cy} x2={cx+26} y2={cy} stroke={o2} strokeWidth=".6" strokeDasharray="2 2"/>
          </g>
        ))}
        <path d="M66 50 L76 50 M76 50 L76 35 L84 35" stroke={o} strokeWidth=".8" fill="none" strokeLinecap="round"/>
        <path d="M76 50 L76 65 L84 65" stroke={o} strokeWidth=".8" fill="none" strokeLinecap="round"/>
        <path d="M116 50 L126 50" stroke={o} strokeWidth=".8" fill="none" strokeLinecap="round"/>
        {active && <circle cx="90" cy="50" r="4" fill={P.orange} opacity=".8"/>}
      </svg>
    ),
    design: (
      <svg viewBox="0 0 200 140" fill="none" style={{width:"100%",height:"100%"}}>
        <rect x="50" y="30" width="100" height="80" rx="6" stroke={o} strokeWidth="1" fill={fill}/>
        <rect x="58" y="42" width="40" height="8" rx="2" fill="rgba(255,255,255,0.06)" stroke={o2} strokeWidth=".5"/>
        <rect x="58" y="56" width="60" height="8" rx="2" fill="rgba(255,255,255,0.04)" stroke={o2} strokeWidth=".5"/>
        <circle cx="75" cy="95" r="6" fill={active?P.orange+"44":"rgba(255,255,255,0.08)"} stroke={o} strokeWidth=".8"/>
        <circle cx="95" cy="95" r="6" fill={active?P.orangeAlt+"33":"rgba(255,255,255,0.06)"} stroke={o2} strokeWidth=".5"/>
        <circle cx="115" cy="95" r="6" fill="rgba(255,255,255,0.04)" stroke={o2} strokeWidth=".5"/>
        <rect x="120" y="38" width="22" height="60" rx="3" fill="rgba(255,255,255,0.03)" stroke={o2} strokeWidth=".5"/>
        <rect x="128" y="38" width="22" height="45" rx="3" fill={fill} stroke={o} strokeWidth=".5"/>
      </svg>
    ),
    lowcode: (
      <svg viewBox="0 0 200 140" fill="none" style={{width:"100%",height:"100%"}}>
        {[[35,40],[75,40],[115,40],[155,40],[55,85],[95,85],[135,85]].map(([x,y],i)=>(
          <rect key={i} x={x} y={y} width={i<4?"28":"36"} height={i<4?"22":"18"} rx="3"
            fill={i===2?fill:"rgba(255,255,255,0.03)"} stroke={i===2?o:o2} strokeWidth={i===2?"1":".5"}/>
        ))}
        <line x1="63" y1="62" x2="73" y2="75" stroke={o2} strokeWidth=".5"/>
        <line x1="103" y1="62" x2="103" y2="75" stroke={o2} strokeWidth=".5"/>
        <line x1="143" y1="62" x2="133" y2="75" stroke={o2} strokeWidth=".5"/>
        {active && <rect x="113" y="38" width="28" height="22" rx="3" fill="none" stroke={P.orange} strokeWidth="1.2" strokeDasharray="3 2"/>}
      </svg>
    ),
  };

  return map[type] || map.site;
}

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
  const [active,  setActive]  = useState(0);
  const [entered, setEntered] = useState(false);
  const [transitioning, setTransitioning] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const c = CASES[active];

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

    `;
    document.head.appendChild(s);

    setTimeout(() => setEntered(true), 150);
    return () => { document.head.removeChild(s); };
  }, []);

  const changeCase = useCallback((idx: number) => {
    if (idx === active || transitioning) return;
    setTransitioning(true);
    setTimeout(() => {
      setActive(idx);
      setTimeout(() => setTransitioning(false), 400);
    }, 160);
  }, [active, transitioning]);

  return (
    <section
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
      }}
    >
      {/* ── TOP BORDER ── */}
      <div style={{ position:"absolute", top:0, left:0, right:0, height:"1px", background:`linear-gradient(90deg,transparent,${P.orange}33,${P.orange}66,${P.orange}33,transparent)` }}/>
      <div style={{ position:"absolute", bottom:0, left:0, right:0, height:"1px", background:`linear-gradient(90deg,transparent,rgba(255,255,255,0.07),transparent)` }}/>

      <div style={{ maxWidth:"1280px", margin:"0 auto", padding:"80px 48px", width:"100%", position:"relative", zIndex:1 }}>

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
              Projetos que{" "}
              <em style={{
                fontStyle:"italic",
                background:`linear-gradient(90deg,${P.orange},${P.orangeAlt},#e8e8e8,${P.orange})`,
                backgroundSize:"200% auto",
                WebkitBackgroundClip:"text",
                WebkitTextFillColor:"transparent",
                animation:"shimmer 4s linear infinite",
              }}>transformam</em>
              <br/>negócios reais.
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
        <div style={{ display:"grid", gridTemplateColumns:"400px 1fr", gap:"48px", alignItems:"start" }}>

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
              <div style={{
                height:"240px",
                background:`linear-gradient(135deg,rgba(255,255,255,0.02),rgba(255,69,0,0.04))`,
                borderBottom:`1px solid rgba(255,255,255,0.05)`,
                position:"relative",
                display:"flex",
                alignItems:"center",
                justifyContent:"center",
                padding:"24px 40px",
                overflow:"hidden",
              }}>

                <div style={{
                  position:"absolute", right:"24px", bottom:"-20px",
                  fontFamily:"'Instrument Serif',serif",
                  fontSize:"120px", fontStyle:"italic",
                  fontWeight:"400", lineHeight:1,
                  color:P.cream, opacity:.04,
                  pointerEvents:"none", userSelect:"none",
                  transition:"opacity .5s ease",
                }}>{c.num}</div>

                <div
                  key={active}
                  style={{
                    width:"220px", height:"150px",
                    position:"relative", zIndex:1,
                    animation:"fadeSlideIn .5s ease both",
                  }}
                >
                  <Visual type={c.visual} active={!transitioning} />
                </div>

                <div style={{
                  position:"absolute", top:"16px", right:"16px",
                  fontFamily:"'Space Mono',monospace",
                  fontSize:"9px", letterSpacing:"3px", textTransform:"uppercase",
                  color:P.orange,
                  background:"rgba(255,69,0,0.1)",
                  border:"1px solid rgba(255,69,0,0.25)",
                  padding:"4px 12px", borderRadius:"100px",
                }}>{c.cat}</div>

                <div style={{
                  position:"absolute", top:"18px", left:"20px",
                  fontFamily:"'Space Mono',monospace", fontSize:"10px",
                  color:"rgba(255,255,255,0.2)", letterSpacing:"2px",
                }}>{c.num}</div>
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
                }}>{c.desc}</p>

                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:"12px" }}>
                  <div style={{ display:"flex", gap:"7px", flexWrap:"wrap" }}>
                    {c.tags.map(t=>(
                      <span key={t} style={{
                        fontFamily:"'Space Mono',monospace",
                        fontSize:"9px", letterSpacing:"1px",
                        color:"rgba(255,255,255,0.3)",
                        border:"1px solid rgba(255,255,255,0.08)",
                        padding:"3px 10px", borderRadius:"4px",
                      }}>{t}</span>
                    ))}
                  </div>

                  <div style={{ display:"flex", gap:"8px" }}>
                    {[
                      { label:"←", action:()=>changeCase((active-1+CASES.length)%CASES.length) },
                      { label:"→", action:()=>changeCase((active+1)%CASES.length) },
                    ].map(({ label, action },i)=>(
                      <button key={i} onClick={action} style={{
                        width:"36px", height:"36px", borderRadius:"50%",
                        background:"rgba(255,255,255,0.04)",
                        border:"1px solid rgba(255,255,255,0.1)",
                        color:"rgba(255,255,255,0.5)",
                        fontSize:"14px", cursor:"pointer",
                        display:"flex", alignItems:"center", justifyContent:"center",
                        transition:"all .3s ease",
                        fontFamily:"inherit",
                      }}
                        onMouseEnter={e=>{e.currentTarget.style.borderColor=P.orange;e.currentTarget.style.color=P.orange;e.currentTarget.style.background="rgba(255,69,0,0.08)";}}
                        onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(255,255,255,0.1)";e.currentTarget.style.color="rgba(255,255,255,0.5)";e.currentTarget.style.background="rgba(255,255,255,0.04)";}}
                      >{label}</button>
                    ))}

                    <LiquidMetalButton label="Ver case ↗" to="/cases" size="compact" />
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
              ["72h","Primeiro protótipo"],
              ["8","Verticais"],
              ["0","Lock-in"],
            ].map(([v,l],i)=>(
              <div key={i} style={{ animation:`floatY ${2.5+i*.5}s ease-in-out infinite`, animationDelay:`${i*.25}s` }}>
                <div style={{ fontFamily:"'Instrument Serif',serif", fontSize:"28px", fontStyle:"italic", color:P.orange, lineHeight:1, textShadow:`0 0 20px ${P.orange}44` }}>{v}</div>
                <div style={{ fontFamily:"'Space Mono',monospace", fontSize:"8px", color:"rgba(255,255,255,0.25)", letterSpacing:"2px", marginTop:"4px", textTransform:"uppercase" }}>{l}</div>
              </div>
            ))}
          </div>

          <LiquidMetalButton label="Ver todos os cases →" to="/cases" size="wide" />
        </div>
      </div>
    </section>
  );
}
