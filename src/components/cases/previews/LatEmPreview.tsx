/* ══════════════════════════════════════════════════════════════════
   LÁ TEM COSTA MARTA — Réplica fiel do e-commerce B2B
   Cores: Navy #01034a · Amarelo #fdd700
   github.com/Furia300/LATEM (fork de DiogoPaiva91/LATEM)
══════════════════════════════════════════════════════════════════ */

import { useState } from "react";
import {
  Search, ShoppingCart, Phone, Mail, Truck, CreditCard,
  ShieldCheck, PhoneCall, ArrowRight, User, MapPin,
  Facebook, Instagram, Linkedin, ChevronDown, X, Star,
} from "lucide-react";

/* ── Paleta ────────────────────────────────────────────────────── */
const NAVY   = "#01034a";
const YELLOW = "#fdd700";
const WHITE  = "#ffffff";
const MUTED  = "#6b7280";
const BG     = "#f9fafb";
const BORDER = "#e5e7eb";

/* ── Mock produtos ─────────────────────────────────────────────── */
const PRODUCTS = [
  { id:1, name:"Cimento CP II-E 50kg VOTORANTIM", cat:"Estrutura", price:"32,90", unit:"sc", img:"https://cdn.leroymerlin.com.br/products/cimento_votoran_obras_especiais_50kg_89869654_2f60_600x600.jpg", badge:"Mais vendido" },
  { id:2, name:"Tijolo Cerâmico 6 furos (pct 50un)", cat:"Estrutura", price:"74,90", unit:"pct", img:"https://cdn.leroymerlin.com.br/products/tijolo_de_ceramica_6_furos_frisado_cepazzi_91799260_e68c_600x600.jpg", badge:null },
  { id:3, name:"Furadeira de Impacto 750W Bosch", cat:"Ferramentas", price:"189,90", unit:"un", img:"https://cdn.leroymerlin.com.br/products/furadeira_bosch_750w_1_2_gsb_13_bivolt_92235570_be32_600x600.jpg", badge:"Destaque" },
  { id:4, name:"Tinta Látex PVA Branco 18L Suvinil", cat:"Pintura", price:"89,90", unit:"gl", img:"https://cdn.leroymerlin.com.br/products/tinta_latex_fosca_classica_interior_exterior_neve_18l_85431353_f6de_600x600.jpg", badge:null },
  { id:5, name:"Tubo PVC Esgoto 100mm × 6m", cat:"Hidráulica", price:"45,80", unit:"br", img:"https://cdn.leroymerlin.com.br/products/cano_pvc_para_esgoto_100mm_ou_4_3m_tigre_86009581_d937_600x600.jpeg", badge:null },
  { id:6, name:"Vergalhão CA-50 Ø10mm × 12m", cat:"Estrutura", price:"67,50", unit:"br", img:"https://cdn.leroymerlin.com.br/products/vergalhao_ca_50_10mm__3_8__arcelormittal_90892823_0001_600x600.jpg", badge:null },
  { id:7, name:"Piso Cerâmico 60×60 Portobello (m²)", cat:"Pisos", price:"39,90", unit:"m²", img:"https://cdn.leroymerlin.com.br/products/porc_esm_ac_ret_int_60x60_cetim_bianc_m2_90691356_000100_600x600.jpg", badge:"Oferta" },
  { id:8, name:"Mangueira de Borracha ½\" × 50m", cat:"Hidráulica", price:"54,90", unit:"rl", img:"https://cdn.leroymerlin.com.br/products/mangueira_jardim_antitorcao_emborrachada_preta_1_2_50m_1567381320_c037_600x600.jpg", badge:null },
];

const CATEGORIES = [
  { icon:"https://img.icons8.com/3d-fluency/94/lightning-bolt.png", name:"Elétrica" },
  { icon:"https://img.icons8.com/3d-fluency/94/water.png", name:"Hidráulica" },
  { icon:"https://img.icons8.com/3d-fluency/94/maintenance.png", name:"Ferramentas" },
  { icon:"https://img.icons8.com/3d-fluency/94/paint-bucket.png", name:"Pintura" },
  { icon:"https://img.icons8.com/3d-fluency/94/brick-wall.png", name:"Estrutura" },
  { icon:"https://img.icons8.com/3d-fluency/94/floor-plan.png", name:"Pisos" },
  { icon:"https://img.icons8.com/3d-fluency/94/home.png", name:"Cobertura" },
  { icon:"https://img.icons8.com/3d-fluency/94/screw.png", name:"Fixação" },
  { icon:"https://img.icons8.com/3d-fluency/94/door.png", name:"Esquadrias" },
];

/* ── Componente principal ──────────────────────────────────────── */
export default function LatEmPreview() {
  const [cartCount, setCartCount] = useState(0);
  const [page, setPage] = useState<"home"|"catalog"|"cart">("home");
  const [cartItems, setCartItems] = useState<{id:number; qty:number}[]>([]);
  const [catOpen, setCatOpen] = useState(false);

  const addToCart = (id: number) => {
    setCartCount(c => c + 1);
    setCartItems(prev => {
      const ex = prev.find(i => i.id === id);
      if (ex) return prev.map(i => i.id === id ? {...i, qty: i.qty+1} : i);
      return [...prev, {id, qty:1}];
    });
  };

  const cartTotal = cartItems.reduce((sum, ci) => {
    const p = PRODUCTS.find(p => p.id === ci.id);
    if (!p) return sum;
    return sum + parseFloat(p.price.replace(",",".")) * ci.qty;
  }, 0);

  /* ── helpers de estilo ──────────────────────────────────────── */
  const s = {
    // layout
    wrap: { fontFamily:"'Inter', system-ui, sans-serif", height:"594px", maxHeight:"594px", overflowY:"auto" as const, overflowX:"hidden" as const, background:WHITE, fontSize:"13px" } as React.CSSProperties,
    // topbar
    topbar: { background:NAVY, color:WHITE, padding:"5px 16px", fontSize:"10px", display:"flex", justifyContent:"space-between", alignItems:"center" } as React.CSSProperties,
    // header
    header: { background:WHITE, boxShadow:"0 1px 3px rgba(0,0,0,0.1)", padding:"10px 16px", position:"sticky" as const, top:0, zIndex:50 } as React.CSSProperties,
    // navBar
    navBar: { background:"rgba(1,3,74,0.04)", borderTop:`1px solid rgba(1,3,74,0.07)`, borderBottom:`1px solid rgba(1,3,74,0.07)`, padding:"7px 16px", display:"flex", gap:"20px", fontSize:"11px", fontWeight:500, color: NAVY, position:"relative" as const } as React.CSSProperties,
    // hero
    hero: { background:NAVY, padding:"32px 16px", textAlign:"center" as const, position:"relative" as const, overflow:"hidden" } as React.CSSProperties,
  };

  return (
    <div style={s.wrap}>

      {/* ══ TOP BAR ══════════════════════════════════════════════ */}
      <div style={s.topbar}>
        <div style={{ display:"flex", gap:"12px", alignItems:"center" }}>
          <span style={{ display:"flex", alignItems:"center", gap:"3px" }}><Phone size={9}/> (11) 9999-9999</span>
          <span style={{ display:"flex", alignItems:"center", gap:"3px" }}><Mail size={9}/> contato@latematacadista.com.br</span>
        </div>
        <div style={{ display:"flex", gap:"10px" }}>
          <span style={{ color:YELLOW, cursor:"pointer", fontSize:"9px", border:`1px solid rgba(253,215,0,0.3)`, padding:"1px 5px", borderRadius:"3px" }}>Admin (Dev)</span>
          <span style={{ cursor:"pointer" }}>Área do Cliente</span>
          <span style={{ cursor:"pointer" }}>Dúvidas</span>
        </div>
      </div>

      {/* ══ HEADER ════════════════════════════════════════════════ */}
      <header style={s.header}>
        <div style={{ display:"flex", alignItems:"center", gap:"12px" }}>
          {/* Logo real */}
          <div style={{ flexShrink:0, cursor:"pointer" }} onClick={() => setPage("home")}>
            <img src="/latem-logo.png" alt="Lá tem Costa Marta" style={{ height:"48px", width:"auto", objectFit:"contain" }} />
          </div>

          {/* Search */}
          <div style={{ flex:1, position:"relative" }}>
            <input
              placeholder="O que você procura hoje? (Ex: Cimento, Furadeira...)"
              style={{ width:"100%", padding:"8px 40px 8px 14px", borderRadius:"99px", border:`1.5px solid rgba(1,3,74,0.15)`, fontSize:"11px", outline:"none", background:"#f3f4f6", boxSizing:"border-box" as any }}
            />
            <button type="button" style={{ position:"absolute", right:"3px", top:"3px", background:YELLOW, border:"none", borderRadius:"99px", width:"28px", height:"28px", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer" }}>
              <Search size={12} color={NAVY} />
            </button>
          </div>

          {/* User + Cart */}
          <div style={{ display:"flex", gap:"8px", alignItems:"center" }}>
            <button type="button" style={{ background:"none", border:"none", cursor:"pointer", display:"flex", alignItems:"center", gap:"5px", color:NAVY, padding:"4px 7px", borderRadius:"6px" }}>
              <User size={16} color={NAVY} />
              <div style={{ textAlign:"left" as any }}>
                <div style={{ fontSize:"8px", color:MUTED }}>Olá, visitante</div>
                <div style={{ fontSize:"9px", fontWeight:700 }}>Entre ou Cadastre-se</div>
              </div>
            </button>
            <button type="button" onClick={() => setPage("cart")} style={{ position:"relative" as any, background:"none", border:"none", cursor:"pointer", padding:"6px" }}>
              <ShoppingCart size={20} color={NAVY} />
              {cartCount > 0 && (
                <span style={{ position:"absolute", top:"0", right:"0", background:YELLOW, color:NAVY, fontSize:"8px", fontWeight:700, borderRadius:"99px", width:"16px", height:"16px", display:"flex", alignItems:"center", justifyContent:"center" }}>
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Nav */}
        <div style={s.navBar}>
          <span onClick={() => setPage("home")} style={{ cursor:"pointer" }}>Home</span>
          <div style={{ position:"relative" }}>
            <span onClick={() => setCatOpen(v => !v)} style={{ cursor:"pointer", display:"flex", alignItems:"center", gap:"3px" }}>
              Categorias <ChevronDown size={11} />
            </span>
            {catOpen && (
              <div style={{ position:"absolute", top:"100%", left:0, background:WHITE, border:`1px solid ${BORDER}`, borderRadius:"8px", padding:"6px 0", zIndex:100, width:"180px", boxShadow:"0 4px 12px rgba(0,0,0,0.1)" }}>
                {["Elétrica","Hidráulica","Ferramentas","Pintura","Pisos e Revestimentos"].map(c => (
                  <div key={c} onClick={() => { setPage("catalog"); setCatOpen(false); }} style={{ padding:"6px 14px", cursor:"pointer", fontSize:"11px", color:NAVY }} onMouseEnter={e => (e.currentTarget.style.background="#f3f4f6")} onMouseLeave={e => (e.currentTarget.style.background="transparent")}>{c}</div>
                ))}
                <div onClick={() => { setPage("catalog"); setCatOpen(false); }} style={{ padding:"6px 14px", cursor:"pointer", fontSize:"11px", color:NAVY, fontWeight:700, borderTop:`1px solid ${BORDER}`, marginTop:"4px" }}>Ver Todas</div>
              </div>
            )}
          </div>
          <span onClick={() => setPage("catalog")} style={{ cursor:"pointer" }}>Todos os Produtos</span>
          <span style={{ cursor:"pointer", color:NAVY, fontWeight:600 }}>Seja Cliente</span>
          <span style={{ cursor:"pointer" }}>Sobre Nós</span>
        </div>
      </header>

      {/* ══ CART PAGE ═════════════════════════════════════════════ */}
      {page === "cart" && (
        <div style={{ padding:"20px 16px" }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:"16px" }}>
            <h2 style={{ fontSize:"18px", fontWeight:700, color:NAVY }}>Seu Carrinho</h2>
            <button type="button" onClick={() => setPage("home")} style={{ background:"none", border:"none", cursor:"pointer", color:MUTED }}><X size={18}/></button>
          </div>
          {cartItems.length === 0 ? (
            <div style={{ textAlign:"center", padding:"40px 0", color:MUTED }}>
              <ShoppingCart size={40} style={{ opacity:0.2, margin:"0 auto 12px" }} />
              <p>Seu carrinho está vazio</p>
              <button type="button" onClick={() => setPage("catalog")} style={{ marginTop:"12px", background:NAVY, color:WHITE, border:"none", borderRadius:"8px", padding:"8px 18px", cursor:"pointer", fontFamily:"inherit", fontWeight:600 }}>Ver Produtos</button>
            </div>
          ) : (
            <>
              {cartItems.map(ci => {
                const p = PRODUCTS.find(pr => pr.id === ci.id)!;
                return (
                  <div key={ci.id} style={{ display:"flex", gap:"10px", padding:"10px 0", borderBottom:`1px solid ${BORDER}`, alignItems:"center" }}>
                    <div style={{ width:"48px", height:"48px", background:"#f3f4f6", borderRadius:"8px", overflow:"hidden", flexShrink:0, display:"flex", alignItems:"center", justifyContent:"center" }}><img src={p.img} alt={p.name} style={{ width:"85%", height:"85%", objectFit:"contain" }} /></div>
                    <div style={{ flex:1, minWidth:0 }}>
                      <p style={{ fontSize:"11px", fontWeight:600, color:NAVY, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{p.name}</p>
                      <p style={{ fontSize:"10px", color:MUTED }}>{ci.qty}x R$ {p.price}</p>
                    </div>
                    <p style={{ fontWeight:700, color:NAVY, fontSize:"12px", flexShrink:0 }}>R$ {(parseFloat(p.price.replace(",",".")) * ci.qty).toFixed(2).replace(".",",")}</p>
                  </div>
                );
              })}
              <div style={{ marginTop:"16px", padding:"12px", background:"#f9fafb", borderRadius:"10px" }}>
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"6px" }}>
                  <span style={{ fontSize:"11px", color:MUTED }}>Total do pedido</span>
                  <span style={{ fontSize:"14px", fontWeight:700, color:NAVY }}>R$ {cartTotal.toFixed(2).replace(".",",")}</span>
                </div>
                {cartTotal < 600 && (
                  <p style={{ fontSize:"9px", color:"#dc2626", marginBottom:"8px" }}>⚠️ Pedido mínimo R$ 600,00 — faltam R$ {(600 - cartTotal).toFixed(2).replace(".",",")}</p>
                )}
                <button type="button" disabled={cartTotal < 600} style={{ width:"100%", background: cartTotal >= 600 ? YELLOW : "#e5e7eb", color: cartTotal >= 600 ? NAVY : MUTED, border:"none", borderRadius:"8px", padding:"10px 0", fontWeight:700, fontSize:"12px", cursor: cartTotal >= 600 ? "pointer" : "not-allowed", fontFamily:"inherit" }}>
                  Finalizar Pedido
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {/* ══ CATALOG PAGE ══════════════════════════════════════════ */}
      {page === "catalog" && (
        <div style={{ padding:"16px" }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:"14px" }}>
            <h2 style={{ fontSize:"18px", fontWeight:700, color:NAVY }}>Catálogo de Produtos</h2>
            <button type="button" onClick={() => setPage("home")} style={{ fontSize:"10px", color:MUTED, background:"none", border:"none", cursor:"pointer", fontFamily:"inherit", display:"flex", alignItems:"center", gap:"3px" }}>← Voltar</button>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"10px" }}>
            {PRODUCTS.map(p => (
              <div key={p.id} style={{ background:WHITE, borderRadius:"10px", border:`1px solid ${BORDER}`, overflow:"hidden", display:"flex", flexDirection:"column" }}>
                <div style={{ background:"#f3f4f6", height:"80px", position:"relative", overflow:"hidden", display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <img src={p.img} alt={p.name} style={{ width:"85%", height:"85%", objectFit:"contain" }} />
                  {p.badge && <span style={{ position:"absolute", top:"6px", right:"6px", background: p.badge==="Oferta" ? "#dc2626" : NAVY, color:p.badge==="Oferta" ? WHITE : YELLOW, fontSize:"7px", fontWeight:700, padding:"1px 5px", borderRadius:"4px" }}>{p.badge}</span>}
                </div>
                <div style={{ padding:"8px" }}>
                  <div style={{ fontSize:"7px", color:MUTED, textTransform:"uppercase", fontWeight:600, letterSpacing:"0.05em", marginBottom:"2px" }}>{p.cat}</div>
                  <p style={{ fontSize:"10px", fontWeight:600, color:NAVY, lineHeight:1.3, minHeight:"30px" }}>{p.name}</p>
                  <div style={{ display:"flex", alignItems:"baseline", gap:"2px", margin:"6px 0 4px" }}>
                    <span style={{ fontSize:"9px", color:MUTED }}>R$</span>
                    <span style={{ fontSize:"16px", fontWeight:700, color:NAVY }}>{p.price}</span>
                    <span style={{ fontSize:"8px", color:MUTED }}>/{p.unit}</span>
                  </div>
                  <button type="button" onClick={() => addToCart(p.id)} style={{ width:"100%", background:NAVY, color:WHITE, border:"none", borderRadius:"6px", padding:"5px 0", fontSize:"9px", fontWeight:600, cursor:"pointer", fontFamily:"inherit", display:"flex", alignItems:"center", justifyContent:"center", gap:"4px" }}>
                    <ShoppingCart size={9} /> Adicionar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ══ HOME PAGE ═════════════════════════════════════════════ */}
      {page === "home" && (
        <>
          {/* HERO */}
          <section style={s.hero}>
            {/* Grid pattern */}
            <div style={{ position:"absolute", inset:0, backgroundImage:"linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)", backgroundSize:"30px 30px" }} />
            {/* Floating dots */}
            <div style={{ position:"absolute", top:"18px", left:"30px", width:"5px", height:"5px", background:YELLOW, borderRadius:"50%", opacity:0.9 }} />
            <div style={{ position:"absolute", bottom:"30px", right:"30px", width:"7px", height:"7px", background:`${YELLOW}80`, borderRadius:"50%" }} />
            <div style={{ position:"absolute", top:"50px", right:"22%", width:"3px", height:"3px", background:`${YELLOW}50`, borderRadius:"50%" }} />

            {/* Mascote — posicionado no canto inferior direito igual ao site original */}
            <img
              src="/latem-mascot.png"
              alt="TheTeo"
              style={{ position:"absolute", bottom:"-10px", right:"0", width:"130px", objectFit:"contain", dropShadow:"drop-shadow(0 4px 12px rgba(0,0,0,0.4))", zIndex:0, pointerEvents:"none", opacity:0.92 }}
            />

            <div style={{ position:"relative", zIndex:1, maxWidth:"72%" }}>
              <h1 style={{ fontSize:"36px", fontWeight:900, color:WHITE, lineHeight:1.05, marginBottom:"10px", fontFamily:"'Barlow', sans-serif", textAlign:"center" as const }}>
                Precisou? <span style={{ color:YELLOW }}>Lá tem</span>
              </h1>
              <p style={{ fontSize:"14px", fontWeight:700, color:"rgba(250,250,250,0.95)", marginBottom:"18px", textAlign:"center" as const, lineHeight:1.4 }}>
                O fornecedor onde seu depósito ou loja de materiais de construção encontra tudo em um só lugar
              </p>
              <div style={{ display:"flex", gap:"10px", justifyContent:"center", marginBottom:"22px" }}>
                <button type="button" onClick={() => setPage("catalog")} style={{ background:YELLOW, color:NAVY, border:"none", borderRadius:"10px", padding:"10px 22px", fontWeight:700, fontSize:"13px", cursor:"pointer", fontFamily:"inherit", boxShadow:"0 0 20px rgba(253,215,0,0.35)", display:"flex", alignItems:"center", gap:"5px" }}>
                  Ver produtos <ArrowRight size={14}/>
                </button>
                <button type="button" style={{ background:"rgba(255,255,255,0.1)", color:WHITE, border:"1px solid rgba(255,255,255,0.2)", borderRadius:"10px", padding:"10px 22px", fontWeight:600, fontSize:"13px", cursor:"pointer", fontFamily:"inherit" }}>
                  Fale conosco
                </button>
              </div>
              {/* Stats */}
              <div style={{ display:"grid", gridTemplateColumns:"1fr auto 1fr auto 1fr", borderTop:"1px solid rgba(255,255,255,0.1)", paddingTop:"16px", maxWidth:"440px", margin:"0 auto" }}>
                <div style={{ textAlign:"center" as any }}>
                  <div style={{ fontSize:"22px", fontWeight:900, color:WHITE, fontFamily:"'Barlow', sans-serif" }}>+10 mil</div>
                  <div style={{ fontSize:"8px", color:"rgba(255,255,255,0.5)", textTransform:"uppercase" as const, letterSpacing:"0.06em" }}>Produtos disponíveis</div>
                </div>
                <div style={{ width:"1px", background:"rgba(255,255,255,0.1)" }} />
                <div style={{ textAlign:"center" as any }}>
                  <div style={{ fontSize:"22px", fontWeight:900, color:YELLOW, fontFamily:"'Barlow', sans-serif" }}>R$ 600</div>
                  <div style={{ fontSize:"8px", color:"rgba(255,255,255,0.5)", textTransform:"uppercase" as const, letterSpacing:"0.06em" }}>Pedido mínimo</div>
                </div>
                <div style={{ width:"1px", background:"rgba(255,255,255,0.1)" }} />
                <div style={{ textAlign:"center" as any }}>
                  <div style={{ fontSize:"22px", fontWeight:900, color:YELLOW, fontFamily:"'Barlow', sans-serif" }}>100%</div>
                  <div style={{ fontSize:"8px", color:"rgba(255,255,255,0.5)", textTransform:"uppercase" as const, letterSpacing:"0.06em" }}>Atacado</div>
                </div>
              </div>
            </div>
          </section>

          {/* FEATURES BAR */}
          <section style={{ background:WHITE, borderTop:`1px solid ${BORDER}`, borderBottom:`1px solid ${BORDER}`, padding:"14px 16px" }}>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"8px" }}>
              {[
                { Icon:Truck,       title:"Entrega Rápida",      sub:"Frota própria para toda região" },
                { Icon:CreditCard,  title:"Pagamento Flexível",  sub:"Boleto, PIX e Cartão BNDES" },
                { Icon:ShieldCheck, title:"Compra Segura",       sub:"Seus dados protegidos" },
                { Icon:PhoneCall,   title:"Suporte Dedicado",    sub:"Equipe especializada" },
              ].map(({ Icon, title, sub }) => (
                <div key={title} style={{ display:"flex", alignItems:"center", gap:"8px" }}>
                  <div style={{ width:"34px", height:"34px", borderRadius:"99px", background:`rgba(1,3,74,0.07)`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                    <Icon size={15} color={NAVY} />
                  </div>
                  <div>
                    <div style={{ fontSize:"10px", fontWeight:700, color:NAVY }}>{title}</div>
                    <div style={{ fontSize:"8px", color:MUTED }}>{sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* CATEGORIES */}
          <section style={{ padding:"20px 16px 10px", background:BG }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:"12px" }}>
              <div>
                <h2 style={{ fontSize:"18px", fontWeight:900, color:NAVY, fontFamily:"'Barlow', sans-serif", marginBottom:"2px" }}>Categorias</h2>
                <p style={{ fontSize:"10px", color:MUTED }}>Encontre tudo o que precisa para sua obra</p>
              </div>
              <button type="button" onClick={() => setPage("catalog")} style={{ border:`1px solid ${BORDER}`, background:WHITE, borderRadius:"7px", padding:"4px 10px", fontSize:"10px", color:NAVY, cursor:"pointer", fontFamily:"inherit" }}>Ver Todas</button>
            </div>
            <div style={{ display:"flex", gap:"8px", overflowX:"auto", paddingBottom:"8px" }}>
              {CATEGORIES.map(cat => (
                <div key={cat.name} onClick={() => setPage("catalog")} style={{ minWidth:"80px", cursor:"pointer", flexShrink:0 }}>
                  <div style={{ width:"64px", height:"64px", background:WHITE, borderRadius:"12px", border:`1px solid rgba(1,3,74,0.06)`, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:"5px", boxShadow:"0 2px 6px rgba(0,0,0,0.08)" }}>
                    <img src={cat.icon} alt={cat.name} style={{ width:"38px", height:"38px", objectFit:"contain" }} />
                  </div>
                  <p style={{ fontSize:"9px", fontWeight:700, color:NAVY, textAlign:"center", lineHeight:1.2 }}>{cat.name}</p>
                </div>
              ))}
            </div>
          </section>

          {/* FEATURED PRODUCTS */}
          <section style={{ padding:"20px 16px", background:"rgba(1,3,74,0.02)" }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"14px" }}>
              <div>
                <h2 style={{ fontSize:"18px", fontWeight:900, color:NAVY, fontFamily:"'Barlow', sans-serif" }}>Destaques da Semana</h2>
                <div style={{ width:"60px", height:"4px", background:YELLOW, borderRadius:"99px", marginTop:"4px" }} />
              </div>
              <button type="button" onClick={() => setPage("catalog")} style={{ background:"none", border:"none", color:NAVY, fontWeight:700, fontSize:"11px", cursor:"pointer", fontFamily:"inherit", display:"flex", alignItems:"center", gap:"3px" }}>
                Ver Catálogo Completo <ArrowRight size={12}/>
              </button>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"10px" }}>
              {PRODUCTS.slice(0,4).map(p => (
                <div key={p.id} style={{ background:WHITE, borderRadius:"12px", border:`1px solid ${BORDER}`, overflow:"hidden", display:"flex", flexDirection:"column", boxShadow:"0 1px 3px rgba(0,0,0,0.05)" }}>
                  <div style={{ background:"#f9fafb", height:"90px", position:"relative", overflow:"hidden", display:"flex", alignItems:"center", justifyContent:"center" }}>
                    <img src={p.img} alt={p.name} style={{ width:"90%", height:"90%", objectFit:"contain" }} />
                    {p.badge && <span style={{ position:"absolute", top:"7px", right:"7px", background:p.badge==="Mais vendido"?NAVY:"#dc2626", color:p.badge==="Mais vendido"?YELLOW:WHITE, fontSize:"6px", fontWeight:700, padding:"2px 5px", borderRadius:"4px" }}>{p.badge}</span>}
                  </div>
                  <div style={{ padding:"10px", flex:1, display:"flex", flexDirection:"column" }}>
                    <div style={{ fontSize:"7px", color:MUTED, textTransform:"uppercase", fontWeight:600, letterSpacing:"0.05em" }}>{p.cat}</div>
                    <p style={{ fontSize:"10px", fontWeight:600, color:NAVY, lineHeight:1.3, flex:1, marginTop:"3px" }}>{p.name}</p>
                    <div style={{ display:"flex", gap:"3px", alignItems:"baseline", margin:"8px 0 6px" }}>
                      <span style={{ fontSize:"9px", color:MUTED }}>R$</span>
                      <span style={{ fontSize:"18px", fontWeight:700, color:NAVY }}>{p.price}</span>
                      <span style={{ fontSize:"8px", color:MUTED }}>/{p.unit}</span>
                    </div>
                    <div style={{ display:"flex", gap:"1px", marginBottom:"7px" }}>
                      {[1,2,3,4,5].map(s => <Star key={s} size={8} fill={YELLOW} color={YELLOW}/>)}
                    </div>
                    <button type="button" onClick={() => addToCart(p.id)} style={{ width:"100%", background:NAVY, color:WHITE, border:"none", borderRadius:"7px", padding:"6px 0", fontWeight:700, fontSize:"9px", cursor:"pointer", fontFamily:"inherit", display:"flex", alignItems:"center", justifyContent:"center", gap:"4px" }}>
                      <ShoppingCart size={9}/> Adicionar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* WHY US */}
          <section style={{ padding:"24px 16px", background:WHITE }}>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"20px", alignItems:"center" }}>
              {/* Left — image mockup */}
              <div style={{ position:"relative" }}>
                <div style={{ borderRadius:"16px", height:"160px", overflow:"hidden" }}>
                  <img src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80" alt="Depósito de materiais" style={{ width:"100%", height:"100%", objectFit:"cover" }} />
                </div>
                <div style={{ position:"absolute", bottom:"10px", right:"10px", background:NAVY, padding:"8px 12px", borderRadius:"10px", zIndex:2, boxShadow:"0 4px 12px rgba(0,0,0,0.3)" }}>
                  <div style={{ fontSize:"22px", fontWeight:900, color:YELLOW, fontFamily:"'Barlow',sans-serif", lineHeight:1 }}>15+</div>
                  <div style={{ fontSize:"9px", color:"rgba(255,255,255,0.85)", textTransform:"uppercase", letterSpacing:"0.06em", fontWeight:700, marginTop:"2px" }}>Anos de Mercado</div>
                </div>
              </div>
              {/* Right — text */}
              <div>
                <div style={{ background:YELLOW+"30", border:`1px solid ${YELLOW}80`, borderRadius:"6px", display:"inline-block", padding:"2px 10px", fontSize:"8px", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.08em", color:NAVY, marginBottom:"8px" }}>
                  Por que a Lá Tem?
                </div>
                <h2 style={{ fontSize:"17px", fontWeight:900, color:NAVY, fontFamily:"'Barlow',sans-serif", lineHeight:1.2, marginBottom:"8px" }}>
                  Qualidade de ponta para quem constrói o futuro
                </h2>
                <p style={{ fontSize:"10px", color:MUTED, lineHeight:1.6, marginBottom:"12px" }}>
                  Nossa missão é facilitar o dia a dia do lojista e do construtor, entregando não apenas produtos, mas soluções completas.
                </p>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"8px" }}>
                  {[
                    { Icon:ShieldCheck, title:"Garantia Total",  sub:"Produtos certificados pelas melhores marcas." },
                    { Icon:Truck,       title:"Logística Ágil",  sub:"Entrega em até 48h para toda a região." },
                  ].map(({ Icon, title, sub }) => (
                    <div key={title} style={{ display:"flex", gap:"8px", padding:"8px", borderRadius:"8px", background:BG }}>
                      <div style={{ width:"28px", height:"28px", background:YELLOW+"30", borderRadius:"7px", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                        <Icon size={13} color={NAVY}/>
                      </div>
                      <div>
                        <div style={{ fontSize:"9px", fontWeight:700, color:NAVY, marginBottom:"1px" }}>{title}</div>
                        <div style={{ fontSize:"8px", color:MUTED, lineHeight:1.3 }}>{sub}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section style={{ background:NAVY, padding:"28px 16px", textAlign:"center", position:"relative", overflow:"hidden" }}>
            <div style={{ position:"absolute", inset:0, backgroundImage:"linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)", backgroundSize:"24px 24px" }} />
            <div style={{ position:"relative", zIndex:1 }}>
              <div style={{ background:YELLOW, color:NAVY, display:"inline-block", borderRadius:"99px", padding:"3px 14px", fontSize:"9px", fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:"12px" }}>
                PARCERIA B2B
              </div>
              <h2 style={{ fontSize:"20px", fontWeight:900, color:WHITE, fontFamily:"'Barlow',sans-serif", lineHeight:1.1, marginBottom:"8px" }}>
                Impulsione seu negócio com preços diretos de <span style={{ color:YELLOW }}>fábrica</span>
              </h2>
              <p style={{ fontSize:"10px", color:"rgba(255,255,255,0.7)", maxWidth:"400px", margin:"0 auto 16px", lineHeight:1.6 }}>
                Cadastre seu CNPJ agora e tenha acesso imediato a condições exclusivas de faturamento, frete grátis e suporte especializado.
              </p>
              <div style={{ display:"flex", gap:"10px", justifyContent:"center" }}>
                <button type="button" style={{ background:YELLOW, color:NAVY, border:"none", borderRadius:"10px", padding:"10px 20px", fontWeight:700, fontSize:"12px", cursor:"pointer", fontFamily:"inherit", display:"flex", alignItems:"center", gap:"5px" }}>
                  Cadastrar minha Loja <ArrowRight size={13}/>
                </button>
                <button type="button" style={{ background:"rgba(255,255,255,0.1)", color:WHITE, border:"1px solid rgba(255,255,255,0.2)", borderRadius:"10px", padding:"10px 20px", fontWeight:600, fontSize:"12px", cursor:"pointer", fontFamily:"inherit" }}>
                  Falar com Consultor
                </button>
              </div>
            </div>
          </section>

          {/* FOOTER */}
          <footer style={{ background:NAVY, color:WHITE, padding:"24px 16px 14px" }}>
            <div style={{ display:"grid", gridTemplateColumns:"1.2fr 1fr 1fr 1fr", gap:"16px", marginBottom:"16px" }}>
              {/* Logo col */}
              <div>
                <img src="/latem-logo.png" alt="Lá tem" style={{ height:"52px", width:"auto", objectFit:"contain", marginBottom:"10px", filter:"brightness(0) invert(1)", opacity:0.9 }} />
                <p style={{ fontSize:"9px", color:"rgba(255,255,255,0.6)", lineHeight:1.6, maxWidth:"140px" }}>
                  Sua parceira de confiança na distribuição de materiais de construção.
                </p>
                <div style={{ display:"flex", gap:"7px", marginTop:"10px" }}>
                  {[Facebook, Instagram, Linkedin].map((Icon, i) => (
                    <div key={i} style={{ width:"26px", height:"26px", background:"rgba(255,255,255,0.07)", borderRadius:"99px", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer" }}>
                      <Icon size={12} color={WHITE}/>
                    </div>
                  ))}
                </div>
              </div>
              {/* Institucional */}
              <div>
                <h4 style={{ fontSize:"11px", fontWeight:700, color:YELLOW, marginBottom:"8px", fontFamily:"'Barlow',sans-serif" }}>Institucional</h4>
                {["Sobre Nós","Trabalhe Conosco","Termos de Uso","Política de Privacidade"].map(l => (
                  <div key={l} style={{ fontSize:"9px", color:"rgba(255,255,255,0.6)", marginBottom:"5px", cursor:"pointer", display:"flex", alignItems:"center", gap:"4px" }}>
                    <span style={{ width:"3px", height:"3px", background:`${YELLOW}60`, borderRadius:"50%" }} />{l}
                  </div>
                ))}
              </div>
              {/* Contato */}
              <div>
                <h4 style={{ fontSize:"11px", fontWeight:700, color:YELLOW, marginBottom:"8px", fontFamily:"'Barlow',sans-serif" }}>Contato</h4>
                <div style={{ fontSize:"9px", color:"rgba(255,255,255,0.7)", display:"flex", flexDirection:"column", gap:"7px" }}>
                  <span style={{ display:"flex", gap:"5px" }}><MapPin size={10} color={YELLOW} style={{ flexShrink:0, marginTop:"1px" }}/>Av. José Maria Whitaker, 2106 — Planalto Paulista, SP</span>
                  <span style={{ display:"flex", gap:"5px" }}><Phone size={10} color={YELLOW}/>(11) 9999-9999</span>
                  <span style={{ display:"flex", gap:"5px" }}><Mail size={10} color={YELLOW}/>contato@latematacadista.com.br</span>
                </div>
              </div>
              {/* Pagamentos */}
              <div>
                <h4 style={{ fontSize:"11px", fontWeight:700, color:YELLOW, marginBottom:"8px", fontFamily:"'Barlow',sans-serif" }}>Pagamentos</h4>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"4px" }}>
                  {["PIX","BOLETO","CARTÃO","BNDES"].map(m => (
                    <div key={m} style={{ background:WHITE, borderRadius:"4px", padding:"4px 6px", display:"flex", alignItems:"center", justifyContent:"center" }}>
                      <span style={{ fontSize:"7px", fontWeight:700, color:"#1f2937" }}>{m}</span>
                    </div>
                  ))}
                </div>
                <div style={{ display:"flex", alignItems:"center", gap:"5px", marginTop:"8px", background:"rgba(255,255,255,0.06)", borderRadius:"6px", padding:"5px 8px", border:"1px solid rgba(255,255,255,0.1)" }}>
                  <ShieldCheck size={11} color="#4ade80"/>
                  <div>
                    <div style={{ fontSize:"7px", color:"rgba(255,255,255,0.5)", textTransform:"uppercase", lineHeight:1 }}>Site</div>
                    <div style={{ fontSize:"9px", fontWeight:700, color:WHITE }}>Seguro</div>
                  </div>
                </div>
              </div>
            </div>
            <div style={{ borderTop:"1px solid rgba(255,255,255,0.1)", paddingTop:"10px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
              <span style={{ fontSize:"8px", color:"rgba(255,255,255,0.4)" }}>© 2026 Lá tem Costa Marta. Todos os direitos reservados. CNPJ: 00.000.000/0001-00</span>
              <span style={{ fontSize:"8px", color:"rgba(255,255,255,0.4)" }}>Desenvolvido com <span style={{ color:YELLOW, fontWeight:700 }}>Nookweb</span></span>
            </div>
          </footer>
        </>
      )}
    </div>
  );
}
