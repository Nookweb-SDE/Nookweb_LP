/* ══════════════════════════════════════════════════════════════════
   NOOKLEAD CRM PREVIEW — Réplica fiel do dashboard pós-login
   Telas: Dashboard, Gerar Leads, Pipeline, Campanhas, Integrações,
          Ranking + placeholders
   crm.nooklead.com.br — DiogoPaiva91/Nooklead
══════════════════════════════════════════════════════════════════ */

import { useState } from "react";
import {
  LayoutDashboard, Search, Columns, Send, DollarSign, Settings,
  Zap, BarChart3, Users, CheckCircle, Trophy, CreditCard, Gift,
  Store, Bot, Phone, Sparkles, LogOut, Bell, ChevronLeft,
  TrendingDown, Plus, Calendar, RefreshCw,
} from "lucide-react";

/* ─── Design tokens ────────────────────────────────────────── */
const C = {
  white:     "#FFFFFF",
  bg:        "#F3F4F6",
  border:    "#E5E7EB",
  text:      "#111827",
  textSec:   "#4B5563",
  textMuted: "#9CA3AF",
  blue:      "#2563EB",
  blueBg:    "#EFF6FF",
  blueBg2:   "#DBEAFE",
  green:     "#16A34A",
  greenBg:   "#DCFCE7",
  amber:     "#D97706",
  amberBg:   "#FEF3C7",
  red:       "#DC2626",
  redBg:     "#FEE2E2",
  purple:    "#7C3AED",
  purpleBg:  "#EDE9FE",
  shadow:    "0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)",
  shadowLg:  "0 4px 6px rgba(0,0,0,0.07), 0 2px 4px rgba(0,0,0,0.06)",
};

type Screen = "dashboard" | "leads" | "pipeline" | "campanhas" | "vendas"
            | "integracoes" | "automacoes" | "manager" | "equipe"
            | "aprovacoes" | "ranking" | "planos" | "config";

/* ─── Dashboard mock data ──────────────────────────────────── */
const MOCK_STATS = [
  { label: "Buscas de Lea...",    value: "22",      change: "— 219.978 cré...", up: null,  icon: Search,      iconBg: C.blueBg,   iconColor: C.blue   },
  { label: "Leads Qualific...",   value: "1",       change: "↘ -99.3% vs p...", up: false, icon: Users,       iconBg: C.blueBg,   iconColor: C.blue   },
  { label: "Vendas Fecha...",     value: "0",       change: "↘ -100.0% vs p...",up: false, icon: BarChart3,   iconBg: C.greenBg,  iconColor: C.green  },
  { label: "Taxa Conversão",      value: "0.0%",    change: "↘ -0.7pp vs p...", up: false, icon: TrendingDown,iconBg: C.amberBg,  iconColor: C.amber  },
  { label: "Receita Total",       value: "R$ 0,00", change: "↘ -100.0% vs p...",up: false, icon: DollarSign,  iconBg: C.purpleBg, iconColor: C.purple },
];
const WEEKLY_DATA   = [0, 3, 0, 0, 0, 0, 0];
const WEEKLY_LABELS = ["Ter", "Qua", "Qui", "Sex", "Sáb", "Dom", "Seg"];
const MONTHLY_DATA  = [0, 0, 0, 1];
const MONTHLY_LABELS= ["Jan", "Fev", "Mar", "Abr"];
const ACTIVITIES = [
  { icon: Search,  iconBg: C.blueBg2, iconColor: C.blue,  title: "Busca de leads",          sub: "20 leads selecionados · SP, SAO PAULO", time: "4 dias" },
  { icon: Send,    iconBg: "#E0F2FE", iconColor: "#0284C7",title: "Campanha WhatsApp criada",sub: "Teste Luiz 1",                          time: "6 dias" },
  { icon: Plus,    iconBg: C.greenBg, iconColor: C.green,  title: "Novo lead adicionado",    sub: "IMPULSO TECH",                          time: "6 dias" },
];
const PLAN_LIMITS = [
  { label: "Usuários",               used: 3,  total: 5      },
  { label: "Pipelines",              used: 1,  total: 5      },
  { label: "Buscas de Leads/mês",    used: 22, total: 220000 },
  { label: "Mensagens WhatsApp/mês", used: 0,  total: 40000  },
  { label: "Automações",             used: 0,  total: Infinity},
  { label: "Integrações de Email",   used: 0,  total: 5      },
];

/* ─── Nav ──────────────────────────────────────────────────── */
const NAV_MEUS_LEADS: { key: Screen; label: string; icon: any; badge?: string }[] = [
  { key: "dashboard",   label: "Dashboard",   icon: LayoutDashboard },
  { key: "leads",       label: "Gerar Leads", icon: Search },
  { key: "pipeline",    label: "Pipeline",    icon: Columns },
  { key: "campanhas",   label: "Campanhas",   icon: Send },
  { key: "vendas",      label: "Vendas",      icon: DollarSign },
  { key: "integracoes", label: "Integrações", icon: Settings },
  { key: "automacoes",  label: "Automações",  icon: Zap, badge: "Breve" },
];
const NAV_GESTAO: { key: Screen; label: string; icon: any }[] = [
  { key: "manager",    label: "Dashboard Gerencial", icon: BarChart3 },
  { key: "equipe",     label: "Equipe",              icon: Users },
  { key: "aprovacoes", label: "Aprovações",          icon: CheckCircle },
  { key: "ranking",    label: "Ranking",             icon: Trophy },
];
const NAV_OUTROS: { key: Screen; label: string; icon: any; badge?: string }[] = [
  { key: "planos",  label: "Planos",               icon: CreditCard },
  { key: "config",  label: "Indicações",           icon: Gift },
  { key: "config",  label: "Marketplace",          icon: Store,    badge: "Breve" },
  { key: "config",  label: "SDR Virtual",          icon: Bot,      badge: "Breve" },
  { key: "config",  label: "Ligações IA",          icon: Phone },
  { key: "config",  label: "AI Features",          icon: Sparkles, badge: "Breve" },
  { key: "config",  label: "Configuração Inicial", icon: Settings },
];

/* ─── Helpers ──────────────────────────────────────────────── */
function MiniBar({ data, labels, color = C.blue }: { data: number[]; labels: string[]; color?: string }) {
  const max = Math.max(...data, 1);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "4px", height: "100%" }}>
      <div style={{ display: "flex", alignItems: "flex-end", gap: "5px", flex: 1, minHeight: "70px" }}>
        {data.map((v, i) => (
          <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "flex-end", height: "100%" }}>
            <div style={{ width: "100%", height: v > 0 ? `${Math.max(4, (v/max)*70)}px` : "2px", background: v > 0 ? color : "#E5E7EB", borderRadius: "3px 3px 0 0" }} />
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: "5px", borderTop: `1px solid ${C.border}`, paddingTop: "3px" }}>
        {labels.map((l, i) => (
          <div key={i} style={{ flex: 1, textAlign: "center" }}>
            <span style={{ fontSize: "8px", color: C.textMuted }}>{l}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
function PBar({ used, total }: { used: number; total: number }) {
  const pct = total === Infinity ? 0 : Math.min(100, (used/total)*100);
  return (
    <div style={{ height: "5px", background: "#E5E7EB", borderRadius: "3px", overflow: "hidden" }}>
      <div style={{ height: "100%", width: `${pct}%`, background: C.blue, minWidth: pct > 0 ? "5px" : "0" }} />
    </div>
  );
}

/* ═══ DASHBOARD ══════════════════════════════════════════════ */
function DashboardScreen() {
  const [startDate] = useState("01/03/2026");
  const [endDate]   = useState("31/03/2026");
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
      {/* Date filter */}
      <div style={{ background: C.white, borderRadius: "8px", padding: "10px 14px", boxShadow: C.shadow, display: "flex", alignItems: "center", gap: "14px", flexWrap: "wrap" }}>
        <span style={{ fontSize: "10px", color: C.textSec, fontWeight: 500, display: "flex", alignItems: "center", gap: "4px" }}>
          <Calendar size={11} color={C.textSec} /> Período:
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          {[["Data início", startDate], ["Data fim", endDate]].map(([label, val], i) => (
            <div key={i} style={{ display: "flex", flexDirection: "column", gap: "1px" }}>
              <span style={{ fontSize: "7px", color: C.textMuted }}>{label}</span>
              <div style={{ border: `1px solid ${C.border}`, borderRadius: "5px", padding: "4px 8px", fontSize: "9px", color: C.text, display: "flex", alignItems: "center", gap: "4px", cursor: "pointer" }}>
                <Calendar size={9} color={C.textMuted} /> {val}
              </div>
            </div>
          ))}
          <button type="button" style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: "5px", padding: "5px 9px", fontSize: "9px", color: C.textSec, cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", gap: "3px", marginTop: "10px" }}>
            <RefreshCw size={8} /> Mês atual
          </button>
        </div>
      </div>
      {/* KPI cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: "10px" }}>
        {MOCK_STATS.map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={i} style={{ background: C.white, borderRadius: "10px", padding: "12px 10px", boxShadow: C.shadow }}>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "8px" }}>
                <p style={{ fontSize: "8px", color: C.textSec, fontWeight: 500, lineHeight: 1.4, flex: 1, paddingRight: "3px" }}>{s.label}</p>
                <div style={{ width: "28px", height: "28px", borderRadius: "7px", background: s.iconBg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Icon size={13} color={s.iconColor} />
                </div>
              </div>
              <p style={{ fontSize: "17px", fontWeight: 700, color: C.text, marginBottom: "4px" }}>{s.value}</p>
              <p style={{ fontSize: "7px", color: s.up === false ? C.red : C.textMuted, lineHeight: 1.3 }}>{s.change}</p>
            </div>
          );
        })}
      </div>
      {/* Charts */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
        {[{ title: "Performance Semanal", data: WEEKLY_DATA, labels: WEEKLY_LABELS }, { title: "Performance Mensal", data: MONTHLY_DATA, labels: MONTHLY_LABELS }].map((chart, i) => (
          <div key={i} style={{ background: C.white, borderRadius: "8px", padding: "12px", boxShadow: C.shadow }}>
            <p style={{ fontSize: "10px", fontWeight: 600, color: C.text, marginBottom: "10px" }}>{chart.title}</p>
            <div style={{ height: "100px" }}>
              <MiniBar data={chart.data} labels={chart.labels} color={C.blue} />
            </div>
          </div>
        ))}
      </div>
      {/* Activity + Plan */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "10px" }}>
        <div style={{ background: C.white, borderRadius: "8px", padding: "12px", boxShadow: C.shadow }}>
          <p style={{ fontSize: "10px", fontWeight: 600, color: C.text, marginBottom: "10px" }}>Atividade Recente</p>
          {ACTIVITIES.map((a, i) => {
            const Icon = a.icon;
            return (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "8px", padding: "8px 0", borderTop: i > 0 ? `1px solid ${C.border}` : "none" }}>
                <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: a.iconBg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Icon size={11} color={a.iconColor} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: "9px", fontWeight: 600, color: C.text }}>{a.title}</p>
                  <p style={{ fontSize: "8px", color: C.textSec, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{a.sub}</p>
                </div>
                <span style={{ fontSize: "8px", color: C.textMuted, flexShrink: 0 }}>{a.time}</span>
              </div>
            );
          })}
        </div>
        <div style={{ background: C.white, borderRadius: "8px", padding: "12px", boxShadow: C.shadow, width: "210px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "3px" }}>
            <p style={{ fontSize: "10px", fontWeight: 600, color: C.text }}>Limites do Plano</p>
            <span style={{ fontSize: "8px", fontWeight: 700, color: C.blue, background: C.blueBg, padding: "1px 5px", borderRadius: "3px" }}>Pro+</span>
          </div>
          <p style={{ fontSize: "7px", color: C.textMuted, marginBottom: "7px" }}>Uso atual do seu plano</p>
          <div style={{ background: C.amberBg, borderRadius: "4px", padding: "4px 8px", marginBottom: "8px", display: "flex", alignItems: "center", gap: "4px" }}>
            <Calendar size={9} color={C.amber} />
            <span style={{ fontSize: "8px", color: C.amber, fontWeight: 500 }}>Válido até: 05/04/2026</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
            {PLAN_LIMITS.map((p, i) => (
              <div key={i}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "2px" }}>
                  <span style={{ fontSize: "7px", color: C.textSec }}>{p.label}</span>
                  <span style={{ fontSize: "7px", color: C.textSec, fontWeight: 500 }}>{p.used}/{p.total === Infinity ? "∞" : p.total.toLocaleString("pt-BR")}</span>
                </div>
                <PBar used={p.used} total={p.total === Infinity ? 1 : p.total} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══ GERAR LEADS ════════════════════════════════════════════ */
function LeadsScreen() {
  const [qtd, setQtd] = useState(20);
  const [tab, setTab] = useState<"lista"|"unica">("lista");

  const COMPANIES = [
    { cnpj: "04.195.845/0001-84", nome: "GABRIEL MARTINS ALVES",         sub:"MEI · Simples", tel: true,  email: true,  uf:"SP", mun:"Aguaí", bairro:"Vila Segura" },
    { cnpj: "04.216.861/0001-93", nome: "ANTONIO MARCOS MOR...",          sub:"MEI · Simples", tel: true,  email: true,  uf:"SP", mun:"Aguaí", bairro:"Jardim dos Flores" },
    { cnpj: "04.256.634/0001-16", nome: "RENOSSANDRO CARP...",            sub:"MEI",           tel: false, email: true,  uf:"SP", mun:"Aguaí", bairro:"Jardim Primavera" },
    { cnpj: "04.254.637/0001-85", nome: "ELZINARD DE ARA...",             sub:"MEI",           tel: false, email: true,  uf:"SP", mun:"Aguaí", bairro:"Umt" },
    { cnpj: "04.204.008/0001-23", nome: "GIOVANNI LUIZ DAMBR...",         sub:"MEI",           tel: false, email: true,  uf:"SP", mun:"Aguaí", bairro:"Conj. Hab. Ben. M. Júnior" },
    { cnpj: "04.247.804/0001-39", nome: "KACIQUE FERREIRA PROPE...",      sub:"MEI",           tel: true,  email: true,  uf:"SP", mun:"Aguaí", bairro:"Monte Líbano" },
    { cnpj: "04.247.246/0001-98", nome: "FRANCISCO RUAN DE MO...",        sub:"MEI",           tel: true,  email: true,  uf:"SP", mun:"Aguaí", bairro:"" },
    { cnpj: "04.255.555/0001-86", nome: "PABLO DOUGLAS DE NEL...",        sub:"MEI",           tel: false, email: true,  uf:"SP", mun:"Aguaí", bairro:"Vl. Sen. Teomiro Costa" },
    { cnpj: "04.222.370/0001-21", nome: "GABRIELA THAMIRES DE...",        sub:"MEI",           tel: true,  email: true,  uf:"SP", mun:"Aguaí", bairro:"Vila Suíça" },
    { cnpj: "04.366.968/0001-96", nome: "ADRIANA CRISTINA CARB...",       sub:"MEI",           tel: false, email: true,  uf:"SP", mun:"Aguaí", bairro:"Centro" },
    { cnpj: "04.389.214/0001-98", nome: "JOSANA MACEL DOS SA...",         sub:"MEI · Simples", tel: false, email: true,  uf:"SP", mun:"Aguaí", bairro:"Célula Nova" },
    { cnpj: "04.403.313/0001-97", nome: "LUIS CARLOS OLIVEIRA D...",      sub:"MEI · Simples", tel: true,  email: true,  uf:"SP", mun:"Aguaí", bairro:"Vl. Senador Teomiro" },
    { cnpj: "04.302.098/0001-41", nome: "MARCOS SALERNI",                 sub:"MEI",           tel: false, email: false, uf:"SP", mun:"Aguaí", bairro:"Centro" },
    { cnpj: "04.398.558/0001-49", nome: "LUCAS RODRIGO ALVES D...",       sub:"MEI",           tel: false, email: true,  uf:"SP", mun:"Aguaí", bairro:"" },
    { cnpj: "04.080.386/0001-06", nome: "PAULO SERGIO DUTRA B...",        sub:"MEI",           tel: false, email: true,  uf:"SP", mun:"Aguaí", bairro:"Vila Paraisin" },
    { cnpj: "04.385.634/0001-43", nome: "CARLOS EDUARDO DOS S...",        sub:"MEI",           tel: false, email: false, uf:"SP", mun:"Aguaí", bairro:"Diva Assali" },
    { cnpj: "04.421.040/0001-51", nome: "EDSON FONTES OLIVEIRA...",       sub:"MEI",           tel: false, email: false, uf:"SP", mun:"Aguaí", bairro:"Jardim Center City" },
    { cnpj: "04.421.749/0001-38", nome: "IVAN GABRIEL FURLAN BA...",      sub:"MEI",           tel: false, email: false, uf:"SP", mun:"Aguaí", bairro:"Jardim Vista da Colina" },
    { cnpj: "04.427.168/0001-81", nome: "ADRIANO ORTIZ RODRIG...",        sub:"MEI",           tel: false, email: false, uf:"SP", mun:"Aguaí", bairro:"Chacara Bela Vista" },
    { cnpj: "04.436.027/0001-84", nome: "PAULO APARECIDO MAC...",         sub:"MEI",           tel: false, email: false, uf:"SP", mun:"Aguaí", bairro:"Jardim Vista da Colina 1" },
  ];

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:"10px" }}>
      {/* Title */}
      <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", flexWrap:"wrap", gap:"4px" }}>
        <div>
          <div style={{ display:"flex", alignItems:"center", gap:"7px" }}>
            <h2 style={{ fontSize:"15px", fontWeight:700, color:C.text }}>Gerador de Leads</h2>
            <div style={{ background:"#ECFDF5", border:"1px solid #6EE7B7", borderRadius:"5px", padding:"2px 7px", display:"flex", alignItems:"center", gap:"4px" }}>
              <span style={{ fontSize:"9px" }}>🪙</span>
              <span style={{ fontSize:"7px", color:"#065F46", fontWeight:600 }}>Créditos</span>
              <span style={{ fontSize:"8px", fontWeight:700, color:"#047857" }}>219.978</span>
              <span style={{ fontSize:"7px", color:"#6EE7B7" }}>/</span>
              <span style={{ fontSize:"7px", color:"#047857" }}>220.000</span>
            </div>
            <button type="button" style={{ border:`1px solid ${C.border}`, borderRadius:"4px", padding:"2px 7px", fontSize:"7px", color:C.textSec, background:"white", cursor:"pointer", fontFamily:"inherit", display:"flex", alignItems:"center", gap:"3px" }}>⊙ Tutorial</button>
          </div>
          <p style={{ fontSize:"8px", color:C.textSec, marginTop:"2px" }}>Consulte empresas da base de dados em tempo real e faça buscas detalhadas</p>
        </div>
      </div>
      {/* Tabs */}
      <div style={{ display:"flex", borderBottom:`1px solid ${C.border}` }}>
        {(["lista","unica"] as const).map((t, i) => (
          <button key={t} type="button" onClick={() => setTab(t)} style={{
            padding:"5px 12px", fontSize:"9px", fontWeight: tab === t ? 600 : 400,
            color: tab === t ? C.blue : C.textSec,
            background:"none", border:"none",
            borderBottom: tab === t ? `2px solid ${C.blue}` : "2px solid transparent",
            cursor:"pointer", fontFamily:"inherit", marginBottom:"-1px",
          }}>{["Geração em Lista","Busca Única"][i]}</button>
        ))}
      </div>
      {/* Dicas */}
      <div style={{ background:"#EFF6FF", border:"1px solid #BFDBFE", borderRadius:"6px", padding:"7px 11px" }}>
        <p style={{ fontSize:"8px", fontWeight:600, color:C.blue, marginBottom:"3px" }}>💡 Dica: Para resultados mais rápidos:</p>
        <ul style={{ margin:0, paddingLeft:"13px", display:"flex", flexDirection:"column", gap:"1px" }}>
          <li style={{ fontSize:"7px", color:"#374151" }}>Busca por <b>Razão Social, CNAE ou Natureza Jurídica</b>: Selecione <b>Estado</b> + <b>Município</b></li>
          <li style={{ fontSize:"7px", color:"#374151" }}>Busca por <b>DDD, Datas ou Capital Social</b>: Selecione pelo menos <b>Estado</b></li>
          <li style={{ fontSize:"7px", color:"#374151" }}>Para buscar por <b>CNPJ específico</b>: Use a aba <b>Busca Única</b></li>
        </ul>
      </div>
      {/* Filter card */}
      <div style={{ background:C.white, borderRadius:"8px", border:`1px solid ${C.border}`, padding:"11px 13px", display:"flex", flexDirection:"column", gap:"8px" }}>
        <div style={{ display:"flex", alignItems:"center", gap:"5px" }}>
          <Search size={11} color={C.blue} />
          <span style={{ fontSize:"10px", fontWeight:600, color:C.text }}>Filtros de Busca Inteligente</span>
        </div>
        <p style={{ fontSize:"7px", color:C.textSec, marginTop:"-4px" }}>Defina o perfil exato das empresas que você deseja prospectar</p>
        {/* Row 1 */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"7px" }}>
          <div>
            <label style={{ fontSize:"7px", color:C.textSec, fontWeight:500 }}>Razão social ou Nome fantasia</label>
            <input placeholder="Razão social ou Nome fantasia" style={{ width:"100%", marginTop:"2px", border:`1px solid ${C.border}`, borderRadius:"4px", padding:"4px 7px", fontSize:"7px", fontFamily:"inherit", outline:"none", boxSizing:"border-box" as any }} />
          </div>
          <div>
            <label style={{ fontSize:"7px", color:C.textSec, fontWeight:500 }}>Atividade Principal (CNAE)</label>
            <div style={{ marginTop:"2px", border:`1px solid ${C.border}`, borderRadius:"4px", padding:"4px 7px", fontSize:"7px", color:C.textMuted, display:"flex", justifyContent:"space-between" }}>
              <span>Selecione CNAEs</span><span>▼</span>
            </div>
          </div>
        </div>
        {/* Row 2 */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"7px" }}>
          <div>
            <label style={{ fontSize:"7px", color:C.textSec, fontWeight:500 }}>Natureza Jurídica</label>
            <select style={{ width:"100%", marginTop:"2px", border:`1px solid ${C.border}`, borderRadius:"4px", padding:"4px 7px", fontSize:"7px", color:C.text, fontFamily:"inherit", outline:"none", background:"white" }}>
              <option>Selecione uma natureza jurídica</option>
              <option>MEI</option><option>EIRELI</option><option>LTDA</option><option>S.A.</option>
            </select>
          </div>
          <div>
            <label style={{ fontSize:"7px", color:C.textSec, fontWeight:500 }}>Estado e Município</label>
            <div style={{ marginTop:"2px", border:`1px solid ${C.border}`, borderRadius:"4px", padding:"4px 7px", fontSize:"7px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
              <span style={{ display:"flex", alignItems:"center", gap:"4px" }}>
                <span style={{ color:C.textMuted }}>SP ·</span>
                <span style={{ background:"#DCFCE7", color:"#16A34A", fontSize:"6px", fontWeight:600, padding:"1px 5px", borderRadius:"3px" }}>1 município</span>
              </span>
              <span style={{ fontSize:"10px" }}>📍</span>
            </div>
          </div>
        </div>
        {/* Row 3 */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1.2fr", gap:"7px" }}>
          <div>
            <label style={{ fontSize:"7px", color:C.textSec, fontWeight:500 }}>3. Bairro</label>
            <select style={{ width:"100%", marginTop:"2px", border:`1px solid ${C.border}`, borderRadius:"4px", padding:"4px 7px", fontSize:"7px", color:C.textMuted, fontFamily:"inherit", outline:"none", background:"white" }}>
              <option>Selecione o bairro</option>
            </select>
          </div>
          <div>
            <label style={{ fontSize:"7px", color:C.textSec, fontWeight:500 }}>DDD</label>
            <input placeholder="DDD" style={{ width:"100%", marginTop:"2px", border:`1px solid ${C.border}`, borderRadius:"4px", padding:"4px 7px", fontSize:"7px", fontFamily:"inherit", outline:"none", boxSizing:"border-box" as any }} />
          </div>
          <div>
            <label style={{ fontSize:"7px", color:C.textSec, fontWeight:500 }}>Data Abertura INICIO - FIM</label>
            <div style={{ display:"flex", gap:"3px", marginTop:"2px" }}>
              <input type="date" defaultValue="2025-02-11" style={{ flex:1, border:`1px solid ${C.border}`, borderRadius:"4px", padding:"3px 4px", fontSize:"6px", fontFamily:"inherit", outline:"none", minWidth:0 }} />
              <input type="date" style={{ flex:1, border:`1px solid ${C.border}`, borderRadius:"4px", padding:"3px 4px", fontSize:"6px", fontFamily:"inherit", outline:"none", minWidth:0 }} />
            </div>
            <label style={{ fontSize:"6px", color:C.textMuted, display:"flex", alignItems:"center", gap:"2px", marginTop:"2px" }}>
              <input type="checkbox" style={{ width:"8px", height:"8px" }} /> Mês Atual
            </label>
          </div>
        </div>
        {/* Row 4 */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"7px" }}>
          <div>
            <label style={{ fontSize:"7px", color:C.textSec, fontWeight:500 }}>$ Capital Social INICIO - FIM ℹ</label>
            <div style={{ display:"flex", gap:"3px", marginTop:"2px" }}>
              <input placeholder="0" style={{ width:"50%", border:`1px solid ${C.border}`, borderRadius:"4px", padding:"4px 6px", fontSize:"7px", fontFamily:"inherit", outline:"none" }} />
              <input placeholder="Sem limite" style={{ width:"50%", border:`1px solid ${C.border}`, borderRadius:"4px", padding:"4px 6px", fontSize:"7px", fontFamily:"inherit", outline:"none" }} />
            </div>
          </div>
          <div>
            <div style={{ display:"flex", alignItems:"center", gap:"3px" }}>
              <label style={{ fontSize:"7px", color:C.textSec, fontWeight:500 }}>Quantidade de Leads:</label>
              <span style={{ fontSize:"9px", fontWeight:700, color:C.blue }}>{qtd}</span>
              <span style={{ fontSize:"7px", color:C.textMuted }}>ℹ</span>
            </div>
            <div style={{ display:"flex", alignItems:"center", gap:"5px", marginTop:"3px" }}>
              <span style={{ fontSize:"7px", color:C.blue, fontWeight:700 }}>1</span>
              <input type="range" min={1} max={1000} value={qtd} onChange={e => setQtd(Number(e.target.value))} style={{ flex:1, accentColor:C.blue }} />
              <span style={{ fontSize:"7px", color:C.textMuted }}>1000</span>
            </div>
          </div>
        </div>
        {/* Checkboxes */}
        <div style={{ display:"flex", gap:"10px", flexWrap:"wrap" }}>
          {["Somente celular","Com email","Somente fixo","Somente matriz","Somente filial"].map(label => (
            <label key={label} style={{ display:"flex", alignItems:"center", gap:"3px", fontSize:"7px", color:C.textSec, cursor:"pointer" }}>
              <input type="checkbox" style={{ width:"9px", height:"9px", accentColor:C.blue }} /> {label}
            </label>
          ))}
        </div>
        {/* MEI */}
        <div>
          <label style={{ fontSize:"7px", color:C.textSec, fontWeight:500 }}>MEI (Microempreendedor Individual): ℹ</label>
          <div style={{ display:"flex", gap:"10px", marginTop:"3px" }}>
            {["Todos","Somente MEIs","Excluir MEIs"].map((opt,i) => (
              <label key={opt} style={{ display:"flex", alignItems:"center", gap:"3px", fontSize:"7px", color:C.textSec, cursor:"pointer" }}>
                <input type="radio" name="mei" defaultChecked={i===0} style={{ width:"9px", height:"9px", accentColor:C.blue }} /> {opt}
              </label>
            ))}
          </div>
        </div>
        {/* Buttons */}
        <div style={{ display:"flex", gap:"6px", alignItems:"center" }}>
          <button type="button" style={{ background:C.blue, color:"#fff", border:"none", borderRadius:"5px", padding:"6px 12px", fontSize:"8px", fontWeight:600, cursor:"pointer", fontFamily:"inherit", display:"flex", alignItems:"center", gap:"3px" }}>
            <Search size={9} /> Buscar Empresas
          </button>
          <button type="button" style={{ background:"#ECFDF5", color:"#065F46", border:"1px solid #6EE7B7", borderRadius:"5px", padding:"6px 10px", fontSize:"8px", cursor:"pointer", fontFamily:"inherit", display:"flex", alignItems:"center", gap:"3px" }}>↓ Exportar Excel</button>
          <button type="button" style={{ background:"white", color:C.textSec, border:`1px solid ${C.border}`, borderRadius:"5px", padding:"6px 9px", fontSize:"8px", cursor:"pointer", fontFamily:"inherit" }}>Limpar Filtros</button>
        </div>
      </div>

      {/* ── RESULTS TABLE (sempre visível) ── */}
      <div style={{ background:C.white, borderRadius:"8px", border:`1px solid ${C.border}`, overflow:"hidden" }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"8px 12px", borderBottom:`1px solid ${C.border}` }}>
          <span style={{ fontSize:"10px", fontWeight:600, color:C.text }}>
            Empresas Encontradas <span style={{ color:C.textMuted, fontWeight:400, fontSize:"8px" }}>(147 Final no Banco)</span>
          </span>
          <button type="button" style={{ background:"#10B981", color:"#fff", border:"none", borderRadius:"4px", padding:"3px 9px", fontSize:"8px", fontWeight:600, cursor:"pointer", fontFamily:"inherit", display:"flex", alignItems:"center", gap:"3px" }}>
            ↑ Enviar
          </button>
        </div>
        <div style={{ overflowX:"auto" }}>
          <table style={{ width:"100%", borderCollapse:"collapse", fontSize:"7px" }}>
            <thead>
              <tr style={{ background:"#F9FAFB" }}>
                <th style={{ padding:"5px 8px", width:"16px" }}><input type="checkbox" style={{ width:"9px", height:"9px" }} /></th>
                {["CNPJ","Razão Social","Contato","UF · Município · Bairro","Ações"].map(h => (
                  <th key={h} style={{ padding:"5px 8px", textAlign:"left", fontWeight:600, color:C.textMuted, fontSize:"6px", letterSpacing:"0.04em", whiteSpace:"nowrap" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COMPANIES.map((co, i) => (
                <tr key={i} style={{ borderTop:`1px solid #F3F4F6` }}>
                  <td style={{ padding:"5px 8px" }}><input type="checkbox" style={{ width:"9px", height:"9px" }} /></td>
                  <td style={{ padding:"5px 8px", fontFamily:"monospace", color:C.textSec, fontSize:"6px", whiteSpace:"nowrap" }}>
                    {co.cnpj}
                    <div style={{ fontSize:"5px", color:C.textMuted }}>{co.sub}</div>
                  </td>
                  <td style={{ padding:"5px 8px", fontWeight:500, color:C.text, maxWidth:"110px", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap", fontSize:"7px" }}>{co.nome}</td>
                  <td style={{ padding:"5px 8px" }}>
                    <div style={{ display:"flex", flexDirection:"column", gap:"1px" }}>
                      {co.tel && <a href="#" style={{ color:C.blue, fontSize:"6px", textDecoration:"none" }}>📞 Telefone</a>}
                      {co.email && <a href="#" style={{ color:C.blue, fontSize:"6px", textDecoration:"none" }}>✉ Email</a>}
                    </div>
                  </td>
                  <td style={{ padding:"5px 8px", color:C.textSec, maxWidth:"130px", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap", fontSize:"6px" }}>
                    {co.uf} · {co.mun}{co.bairro ? ` · ${co.bairro}` : ""}
                  </td>
                  <td style={{ padding:"5px 8px" }}>
                    <button type="button" style={{ background:"white", border:`1px solid ${C.border}`, borderRadius:"3px", padding:"2px 6px", fontSize:"6px", color:C.textSec, cursor:"pointer", fontFamily:"inherit", display:"flex", alignItems:"center", gap:"2px" }}>
                      ⚙ Ver Detalhes
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"6px 12px", borderTop:`1px solid ${C.border}` }}>
          <span style={{ fontSize:"7px", color:C.textMuted }}>Página 1 de 8 · 147 total no banco</span>
          <div style={{ display:"flex", gap:"3px" }}>
            {["Anterior","1","2","→"].map((b, i) => (
              <button key={i} type="button" style={{ border:`1px solid ${i===1 ? C.blue : C.border}`, borderRadius:"3px", padding:"2px 5px", fontSize:"6px", color: i===1 ? "#fff" : C.textSec, background: i===1 ? C.blue : "white", cursor:"pointer", fontFamily:"inherit" }}>{b}</button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══ PIPELINE (Kanban) ══════════════════════════════════════ */
function PipelineScreen() {
  const COLS = [
    { id:"novo",       label:"Novo",       count:139, bg:"#EFF6FF", hBg:"#DBEAFE", color:"#1D4ED8",
      cards:[
        { co:"BRASAO COME...",       loc:"ALTO ARAGU...", tags:["Tel","Email","CNPJ"], days:10 },
        { co:"SABRINA SA...",        loc:"ADAMANTIN...",  tags:["Email","CNPJ"],       days:11 },
        { co:"NICOLE MON...",        loc:"ADAMANTIN...",  tags:["Email","CNPJ"],       days:11 },
        { co:"MICAELE BAR...",       loc:"ADAMANTIN...",  tags:["Email","CNPJ"],       days:11 },
      ]
    },
    { id:"qualificado",label:"Qualificado",count:1,   bg:"#F0FDF4", hBg:"#DCFCE7", color:"#16A34A",
      cards:[
        { co:"63.995.459 LEA...", loc:"SÃO PAULO/SP", tags:["CNPJ"],           days:25 },
      ]
    },
    { id:"proposta",   label:"Proposta",   count:1,   bg:"#FFFBEB", hBg:"#FEF3C7", color:"#D97706",
      cards:[
        { co:"65.318.478 GLO...", loc:"SÃO PAULO/SP", tags:["Tel","Email","CNPJ"], days:12 },
      ]
    },
    { id:"negociacao", label:"Negociação", count:1,   bg:"#FFF7F7", hBg:"#FEE2E2", color:"#DC2626",
      cards:[
        { co:"IMPULSO TECH",     loc:"SÃO PAULO/SP", tags:["Tel","Email","CNPJ"], days:8  },
      ]
    },
    { id:"fechado",    label:"Fechado",    count:0,   bg:"#F0FDF4", hBg:"#DCFCE7", color:"#16A34A", cards:[] },
    { id:"perdido",    label:"Perdido",    count:0,   bg:"#FFF7F7", hBg:"#FEE2E2", color:"#DC2626", cards:[] },
  ];
  const tagColors: Record<string, {bg:string,color:string}> = {
    Tel:  { bg:"#DBEAFE", color:"#1D4ED8" },
    Email:{ bg:"#D1FAE5", color:"#065F46" },
    CNPJ: { bg:"#F3F4F6", color:"#374151" },
  };

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:"10px" }}>
      {/* Toolbar */}
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", gap:"6px", flexWrap:"wrap" }}>
        <div style={{ display:"flex", alignItems:"center", gap:"5px" }}>
          <button type="button" style={{ border:`1px solid ${C.border}`, borderRadius:"4px", padding:"4px 8px", fontSize:"8px", color:C.textSec, background:"white", cursor:"pointer", fontFamily:"inherit" }}>📋 Nenhuma view ▼</button>
          <button type="button" style={{ border:`1px solid ${C.border}`, borderRadius:"4px", padding:"4px 8px", fontSize:"8px", color:C.textSec, background:"white", cursor:"pointer", fontFamily:"inherit" }}>Pipeline Padrão ▼</button>
          <div style={{ display:"flex", border:`1px solid ${C.border}`, borderRadius:"4px", overflow:"hidden" }}>
            <button type="button" style={{ padding:"4px 8px", fontSize:"8px", color:C.blue, background:C.blueBg, border:"none", cursor:"pointer", fontFamily:"inherit", fontWeight:600 }}>Kanban</button>
            <button type="button" style={{ padding:"4px 8px", fontSize:"8px", color:C.textSec, background:"white", border:"none", cursor:"pointer", fontFamily:"inherit" }}>Tabela</button>
          </div>
          {["⊟","↕","⚙"].map(ic => (
            <button key={ic} type="button" style={{ border:`1px solid ${C.border}`, borderRadius:"4px", padding:"4px 6px", fontSize:"9px", color:C.textSec, background:"white", cursor:"pointer", fontFamily:"inherit" }}>{ic}</button>
          ))}
        </div>
        <div style={{ display:"flex", gap:"5px" }}>
          <button type="button" style={{ border:`1px solid ${C.border}`, borderRadius:"4px", padding:"4px 9px", fontSize:"8px", color:C.textSec, background:"white", cursor:"pointer", fontFamily:"inherit" }}>Selecionar Leads</button>
          <button type="button" style={{ background:C.blue, color:"#fff", border:"none", borderRadius:"4px", padding:"4px 9px", fontSize:"8px", fontWeight:600, cursor:"pointer", fontFamily:"inherit", display:"flex", alignItems:"center", gap:"3px" }}>
            <Plus size={9} /> Novo Lead
          </button>
        </div>
      </div>
      {/* Kanban */}
      <div style={{ display:"flex", gap:"7px", overflowX:"auto", paddingBottom:"3px" }}>
        {COLS.map(col => (
          <div key={col.id} style={{ minWidth:"120px", flex:1, display:"flex", flexDirection:"column" }}>
            <div style={{ background:col.hBg, borderRadius:"6px 6px 0 0", padding:"5px 9px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
              <div style={{ display:"flex", alignItems:"center", gap:"4px" }}>
                <Users size={10} color={col.color} />
                <span style={{ fontSize:"8px", fontWeight:600, color:col.color }}>{col.label}</span>
                <span style={{ background:col.bg, color:col.color, fontSize:"7px", fontWeight:700, padding:"0px 4px", borderRadius:"8px" }}>{col.count}</span>
              </div>
              <Plus size={10} color={col.color} style={{ cursor:"pointer" }} />
            </div>
            <div style={{ background:col.bg, padding:"5px", minHeight:"150px", display:"flex", flexDirection:"column", gap:"4px", borderRadius:"0 0 6px 6px" }}>
              {col.cards.map((card, j) => (
                <div key={j} style={{ background:"white", borderRadius:"5px", padding:"7px 8px", boxShadow:"0 1px 2px rgba(0,0,0,0.06)", cursor:"pointer" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:"4px", marginBottom:"3px" }}>
                    <div style={{ width:"16px", height:"16px", borderRadius:"3px", background:col.hBg, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"7px", fontWeight:700, color:col.color, flexShrink:0 }}>
                      {card.co[0]}
                    </div>
                    <div style={{ flex:1, minWidth:0 }}>
                      <p style={{ fontSize:"7px", fontWeight:600, color:C.text, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{card.co}</p>
                      <p style={{ fontSize:"6px", color:C.textMuted, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{card.loc}</p>
                    </div>
                  </div>
                  <div style={{ display:"flex", gap:"2px", flexWrap:"wrap", marginBottom:"4px" }}>
                    {card.tags.map(tag => (
                      <span key={tag} style={{ background:tagColors[tag]?.bg ?? "#F3F4F6", color:tagColors[tag]?.color ?? C.textSec, fontSize:"6px", padding:"1px 3px", borderRadius:"2px", fontWeight:500 }}>{tag}</span>
                    ))}
                  </div>
                  <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                    <button type="button" style={{ background:"white", border:`1px solid ${C.border}`, borderRadius:"3px", padding:"2px 5px", fontSize:"6px", color:C.textSec, cursor:"pointer", fontFamily:"inherit" }}>Definir R$</button>
                    <span style={{ fontSize:"6px", color:C.textMuted }}>{card.days} dias</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══ RANKING ════════════════════════════════════════════════ */
function RankingScreen() {
  const users = [
    { rank:1, name:"Ana Paula S.",  pts:2840, vendas:12, meta:88 },
    { rank:2, name:"Carlos Mendes", pts:2150, vendas:9,  meta:75 },
    { rank:3, name:"Diogo",         pts:1920, vendas:8,  meta:68 },
    { rank:4, name:"Marina Santos", pts:1640, vendas:7,  meta:58 },
  ];
  const medals = ["🥇","🥈","🥉","4º"];
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:"12px" }}>
      <h2 style={{ fontSize:"14px", fontWeight:700, color:C.text }}>Ranking de Vendedores</h2>
      <div style={{ background:C.white, borderRadius:"8px", boxShadow:C.shadow, overflow:"hidden" }}>
        {users.map((u, i) => (
          <div key={i} style={{ display:"flex", alignItems:"center", gap:"10px", padding:"10px 14px", borderTop: i>0 ? `1px solid ${C.border}` : "none" }}>
            <span style={{ fontSize:"14px", width:"20px", textAlign:"center" }}>{medals[i]}</span>
            <div style={{ width:"28px", height:"28px", borderRadius:"50%", background:C.blueBg, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"10px", fontWeight:700, color:C.blue }}>{u.name[0]}</div>
            <div style={{ flex:1, minWidth:0 }}>
              <p style={{ fontSize:"10px", fontWeight:600, color:C.text }}>{u.name}</p>
              <div style={{ height:"4px", background:C.border, borderRadius:"2px", marginTop:"3px", overflow:"hidden" }}>
                <div style={{ height:"100%", width:`${u.meta}%`, background:C.blue }} />
              </div>
            </div>
            <div style={{ textAlign:"right" }}>
              <p style={{ fontSize:"10px", fontWeight:700, color:C.amber }}>{u.pts.toLocaleString()} pts</p>
              <p style={{ fontSize:"8px", color:C.textMuted }}>{u.vendas} vendas</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══ CAMPANHAS ══════════════════════════════════════════════ */
function CampanhasScreen() {
  const CAMPS = [
    { name:"Teste Luiz 1",       statusLabel:"Pausado",   statusBg:"#FEF3C7", statusColor:"#D97706", canal:"WhatsApp", desc:"Testando palavras-chave", criada:"03/03/2026", iniciada:"03/03/2026 21:14", cont:1,  env:0,  suc:0,  err:0,  prog:0,  taxa:0   },
    { name:"taste jamison",      statusLabel:"Concluída", statusBg:"#D1FAE5", statusColor:"#065F46", canal:"WhatsApp", desc:"",                         criada:"25/02/2026", iniciada:"25/02/2026 10:25", cont:2,  env:1,  suc:1,  err:1,  prog:50, taxa:100 },
    { name:"prospecção mercado", statusLabel:"Concluída", statusBg:"#D1FAE5", statusColor:"#065F46", canal:"WhatsApp", desc:"",                         criada:"12/02/2026", iniciada:"12/02/2026 11:24", cont:37, env:24, suc:24, err:13, prog:65, taxa:100 },
    { name:"prospecção 1",       statusLabel:"Concluída", statusBg:"#D1FAE5", statusColor:"#065F46", canal:"WhatsApp", desc:"",                         criada:"13/02/2026", iniciada:"13/02/2026 11:17", cont:36, env:23, suc:23, err:13, prog:64, taxa:100 },
  ];
  const KW = ["eu quero","tenho interesse","quero sim","podemos fechar","me interesse","vamos fechar","quero saber mais","quero contratar","fechado","pode mandar","aceito","vamos lá","tô interessado","estou interessado","estou interessada","tô interessada","manda pra mim","quero receber","pode enviar","bora fechar","vamos nessa","pode ser","me interessa","gostei","quero mais informações","quero mais detalhes"];

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:"12px" }}>
      {/* Header */}
      <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", flexWrap:"wrap", gap:"6px" }}>
        <div>
          <h2 style={{ fontSize:"15px", fontWeight:700, color:C.text }}>Campanhas</h2>
          <p style={{ fontSize:"9px", color:C.textSec }}>Gerencie suas campanhas de disparo em massa</p>
        </div>
        <div style={{ display:"flex", gap:"5px" }}>
          <button type="button" style={{ border:`1px solid ${C.border}`, borderRadius:"4px", padding:"4px 8px", fontSize:"8px", color:C.textSec, background:"white", cursor:"pointer", fontFamily:"inherit" }}>Palavras chave</button>
          <button type="button" style={{ border:"1px solid #FCA5A5", borderRadius:"4px", padding:"4px 8px", fontSize:"8px", color:C.red, background:"#FFF1F2", cursor:"pointer", fontFamily:"inherit" }}>Excluir Todas</button>
          <button type="button" style={{ background:C.blue, color:"#fff", border:"none", borderRadius:"4px", padding:"4px 9px", fontSize:"8px", fontWeight:600, cursor:"pointer", fontFamily:"inherit", display:"flex", alignItems:"center", gap:"3px" }}>
            <Plus size={9} /> Nova Campanha
          </button>
        </div>
      </div>
      {/* Status das Integrações */}
      <div style={{ background:C.white, border:`1px solid ${C.border}`, borderRadius:"7px", padding:"10px 12px" }}>
        <p style={{ fontSize:"9px", fontWeight:600, color:C.text, marginBottom:"7px", display:"flex", alignItems:"center", gap:"4px" }}>
          <Zap size={11} color={C.amber} /> Status das Integrações
        </p>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:"8px" }}>
          {[
            { icon:"💬", name:"WhatsApp QR Code",   status:"🟢 Conectado",       color:"#16A34A", btn:null },
            { icon:"📱", name:"WhatsApp Business",  status:"🔴 Desconectado",     color:C.red,     btn:"Configurar" },
            { icon:"✉️", name:"Email SMTP",         status:"⚫ Não configurado",  color:C.textMuted,btn:null, soon:true },
          ].map((int, i) => (
            <div key={i} style={{ border:`1px solid ${C.border}`, borderRadius:"5px", padding:"7px 9px" }}>
              <div style={{ display:"flex", alignItems:"center", gap:"4px", marginBottom:"4px" }}>
                <span style={{ fontSize:"11px" }}>{int.icon}</span>
                <span style={{ fontSize:"8px", fontWeight:600, color:C.text }}>{int.name}</span>
              </div>
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                <span style={{ fontSize:"7px", color:int.color }}>{int.status}</span>
                {int.btn && <button type="button" style={{ background:"white", border:`1px solid ${C.border}`, borderRadius:"3px", padding:"1px 5px", fontSize:"6px", color:C.textSec, cursor:"pointer", fontFamily:"inherit" }}>{int.btn}</button>}
                {int.soon && <span style={{ fontSize:"7px", color:C.blue }}>Em breve</span>}
              </div>
            </div>
          ))}
        </div>
        <div style={{ marginTop:"6px", background:"#F0FDF4", borderRadius:"4px", padding:"4px 9px", display:"flex", alignItems:"center", gap:"4px" }}>
          <span style={{ fontSize:"9px" }}>✅</span>
          <span style={{ fontSize:"8px", color:"#065F46", fontWeight:500 }}>WhatsApp QR Code pronto para campanhas</span>
        </div>
      </div>
      {/* Search */}
      <div style={{ display:"flex", gap:"8px", alignItems:"center" }}>
        <div style={{ flex:1, position:"relative" }}>
          <Search size={10} color={C.textMuted} style={{ position:"absolute", left:"7px", top:"50%", transform:"translateY(-50%)" }} />
          <input placeholder="Buscar campanhas..." style={{ width:"100%", border:`1px solid ${C.border}`, borderRadius:"4px", padding:"5px 8px 5px 22px", fontSize:"8px", fontFamily:"inherit", outline:"none", boxSizing:"border-box" as any }} />
        </div>
        <select style={{ border:`1px solid ${C.border}`, borderRadius:"4px", padding:"5px 7px", fontSize:"8px", fontFamily:"inherit", outline:"none", color:C.text }}>
          <option>Todos os status</option><option>Pausada</option><option>Concluída</option>
        </select>
      </div>
      {/* Resumo Geral */}
      <div style={{ background:C.white, border:`1px solid ${C.border}`, borderRadius:"7px", padding:"9px 12px" }}>
        <p style={{ fontSize:"9px", fontWeight:600, color:C.text, marginBottom:"7px" }}>Resumo Geral</p>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", textAlign:"center" }}>
          {[["4","Total de Campanhas",C.blue],["1","Campanhas Ativas","#10B981"],["76","Total de Contatos",C.purple],["48","Total Enviado",C.amber]].map(([v,l,c], i) => (
            <div key={i} style={{ borderRight: i<3 ? `1px solid #F3F4F6` : "none", padding:"0 8px" }}>
              <p style={{ fontSize:"17px", fontWeight:700, color:c as string }}>{v}</p>
              <p style={{ fontSize:"7px", color:C.textSec }}>{l}</p>
            </div>
          ))}
        </div>
      </div>
      {/* Campaign cards */}
      {CAMPS.map((c, i) => (
        <div key={i} style={{ background:C.white, border:`1px solid ${C.border}`, borderRadius:"7px", padding:"10px 12px", boxShadow:C.shadow }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:"6px", flexWrap:"wrap", gap:"5px" }}>
            <div style={{ display:"flex", alignItems:"center", gap:"6px" }}>
              <span style={{ fontSize:"10px", fontWeight:700, color:C.text }}>{c.name}</span>
              <span style={{ background:c.statusBg, color:c.statusColor, fontSize:"7px", fontWeight:600, padding:"2px 6px", borderRadius:"9px" }}>
                {c.statusLabel === "Pausado" ? "⏸" : "✓"} {c.statusLabel}
              </span>
              <span style={{ fontSize:"8px", color:"#16A34A" }}>💬 {c.canal}</span>
            </div>
            <div style={{ display:"flex", gap:"4px" }}>
              <button type="button" style={{ border:`1px solid ${C.border}`, borderRadius:"3px", padding:"2px 6px", fontSize:"7px", color:C.textSec, background:"white", cursor:"pointer", fontFamily:"inherit" }}>👁 Monitorar</button>
              <button type="button" style={{ border:`1px solid ${C.border}`, borderRadius:"3px", padding:"2px 6px", fontSize:"7px", color:C.textSec, background:"white", cursor:"pointer", fontFamily:"inherit" }}>↑ Contatos</button>
            </div>
          </div>
          {c.desc && <p style={{ fontSize:"8px", color:C.textSec, marginBottom:"3px" }}>{c.desc}</p>}
          <p style={{ fontSize:"7px", color:C.textMuted, marginBottom:"6px" }}>Criada em {c.criada} · Iniciada em {c.iniciada}</p>
          {/* Metrics */}
          <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"5px", marginBottom:"7px" }}>
            {[
              { v:c.cont, l:"Total de Contatos", bg:"#EFF6FF", vc:"#1E3A8A" },
              { v:c.env,  l:"Enviadas",          bg:"#F0FDF4", vc:"#14532D" },
              { v:c.suc,  l:"Sucesso",           bg:"#ECFDF5", vc:"#064E3B" },
              { v:c.err,  l:"Erros",             bg:"#FFF1F2", vc:"#7F1D1D" },
            ].map((m, j) => (
              <div key={j} style={{ background:m.bg, borderRadius:"4px", padding:"5px 7px", textAlign:"center" }}>
                <p style={{ fontSize:"12px", fontWeight:700, color:m.vc }}>{m.v}</p>
                <p style={{ fontSize:"6px", color:m.vc }}>{m.l}</p>
              </div>
            ))}
          </div>
          {/* Progress bars */}
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"8px", marginBottom:"5px" }}>
            {[["Progresso de Envio",c.prog],["Taxa de Sucesso",c.taxa]].map(([label, pct], j) => (
              <div key={j}>
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"2px" }}>
                  <span style={{ fontSize:"7px", color:C.textSec }}>{label}</span>
                  <span style={{ fontSize:"7px", fontWeight:600, color:C.textSec }}>{pct}%</span>
                </div>
                <div style={{ height:"4px", background:"#E5E7EB", borderRadius:"2px", overflow:"hidden" }}>
                  <div style={{ height:"100%", width:`${pct}%`, background: (pct as number) === 100 ? "#16A34A" : C.blue }} />
                </div>
              </div>
            ))}
          </div>
          <div style={{ display:"flex", justifyContent:"space-between" }}>
            <span style={{ fontSize:"7px", color:C.textMuted }}>R$ 0.00 · Rate: 50/h</span>
            {c.statusLabel === "Concluída" && <span style={{ fontSize:"7px", color:"#16A34A", fontWeight:500 }}>Campanha Finalizada</span>}
          </div>
        </div>
      ))}
      {/* Keywords */}
      <div style={{ background:C.white, border:`1px solid ${C.border}`, borderRadius:"7px", padding:"10px 12px" }}>
        <p style={{ fontSize:"9px", fontWeight:600, color:C.text, marginBottom:"3px" }}>Palavras-chave de Interesse</p>
        <p style={{ fontSize:"7px", color:C.textSec, marginBottom:"7px" }}>Quando um contato responder com essas palavras, o lead será movido automaticamente para <b>Qualificado</b></p>
        <div style={{ border:`1px solid ${C.border}`, borderRadius:"4px", padding:"4px 7px", display:"flex", alignItems:"center", gap:"5px", marginBottom:"7px" }}>
          <input placeholder="Digite uma palavra-chave..." style={{ flex:1, border:"none", outline:"none", fontSize:"8px", fontFamily:"inherit", color:C.text }} />
          <button type="button" style={{ background:C.blue, color:"#fff", border:"none", borderRadius:"3px", padding:"2px 7px", fontSize:"7px", fontWeight:600, cursor:"pointer", fontFamily:"inherit" }}>+ Adicionar</button>
        </div>
        <div style={{ display:"flex", flexWrap:"wrap", gap:"4px" }}>
          {KW.map((kw, i) => (
            <span key={i} style={{ background:"#F3F4F6", color:C.textSec, fontSize:"7px", padding:"2px 7px", borderRadius:"10px", display:"flex", alignItems:"center", gap:"3px" }}>
              {kw} <span style={{ color:C.textMuted, cursor:"pointer" }}>×</span>
            </span>
          ))}
        </div>
        <button type="button" style={{ marginTop:"7px", background:"none", border:`1px solid ${C.border}`, borderRadius:"3px", padding:"3px 9px", fontSize:"7px", color:C.textSec, cursor:"pointer", fontFamily:"inherit" }}>Restaurar Padrão</button>
      </div>
    </div>
  );
}

/* ═══ HUB DE INTEGRAÇÕES ════════════════════════════════════ */
function IntegracoesScreen() {
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:"12px" }}>
      {/* Header */}
      <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between" }}>
        <div>
          <h2 style={{ fontSize:"15px", fontWeight:700, color:C.text }}>Hub de Integrações</h2>
          <p style={{ fontSize:"9px", color:C.textSec }}>Conecte suas contas de email e WhatsApp para automatizar comunicações</p>
        </div>
        <button type="button" style={{ border:`1px solid ${C.border}`, borderRadius:"4px", padding:"4px 8px", fontSize:"8px", color:C.textSec, background:"white", cursor:"pointer", fontFamily:"inherit", display:"flex", alignItems:"center", gap:"3px" }}>
          <RefreshCw size={9} /> Atualizar
        </button>
      </div>
      {/* Email */}
      <div style={{ background:C.white, border:`1px solid ${C.border}`, borderRadius:"7px", padding:"10px 12px" }}>
        <p style={{ fontSize:"9px", fontWeight:600, color:C.text, marginBottom:"8px" }}>✉️ Email</p>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"8px" }}>
          {[
            { icon:"G", iconBg:"#FEE2E2", name:"Gmail",   sub:"Google Workspace", btnLabel:"✉ Conectar Gmail",   btnBg:"#DC2626" },
            { icon:"O", iconBg:"#DBEAFE", name:"Outlook", sub:"Microsoft 365",    btnLabel:"📧 Conectar Outlook", btnBg:"#1D4ED8" },
          ].map((int, i) => (
            <div key={i} style={{ border:`1px solid ${C.border}`, borderRadius:"5px", padding:"9px 11px" }}>
              <div style={{ display:"flex", alignItems:"center", gap:"5px", marginBottom:"5px" }}>
                <div style={{ width:"20px", height:"20px", borderRadius:"4px", background:int.iconBg, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"10px", fontWeight:700 }}>{int.icon}</div>
                <div>
                  <p style={{ fontSize:"9px", fontWeight:600, color:C.text }}>{int.name}</p>
                  <p style={{ fontSize:"7px", color:C.textMuted }}>{int.sub}</p>
                </div>
              </div>
              <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"7px" }}>
                <span style={{ fontSize:"8px", color:C.textSec }}>Status:</span>
                <span style={{ fontSize:"7px", color:C.textMuted }}>Não conectado</span>
              </div>
              <button type="button" style={{ width:"100%", background:int.btnBg, color:"#fff", border:"none", borderRadius:"4px", padding:"5px 0", fontSize:"8px", fontWeight:600, cursor:"pointer", fontFamily:"inherit" }}>{int.btnLabel}</button>
            </div>
          ))}
        </div>
      </div>
      {/* WhatsApp */}
      <div style={{ background:C.white, border:`1px solid ${C.border}`, borderRadius:"7px", padding:"10px 12px" }}>
        <p style={{ fontSize:"9px", fontWeight:600, color:C.text, marginBottom:"8px" }}>💬 WhatsApp</p>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"8px" }}>
          {/* QR Code */}
          <div style={{ border:`1px solid ${C.border}`, borderRadius:"5px", padding:"9px 11px" }}>
            <div style={{ display:"flex", alignItems:"center", gap:"5px", marginBottom:"5px" }}>
              <div style={{ width:"20px", height:"20px", borderRadius:"4px", background:"#D1FAE5", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"11px" }}>💬</div>
              <div>
                <p style={{ fontSize:"9px", fontWeight:600, color:C.text }}>WhatsApp (QR Code)</p>
                <p style={{ fontSize:"7px", color:C.textMuted }}>Conexão via WhatsApp Web</p>
              </div>
            </div>
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"7px" }}>
              <span style={{ fontSize:"8px", color:C.textSec }}>Status:</span>
              <span style={{ fontSize:"7px", color:C.textMuted }}>Não conectado</span>
            </div>
            <button type="button" style={{ width:"100%", background:"#16A34A", color:"#fff", border:"none", borderRadius:"4px", padding:"5px 0", fontSize:"8px", fontWeight:600, cursor:"pointer", fontFamily:"inherit" }}>📱 Conectar via QR Code ↗</button>
          </div>
          {/* Business API */}
          <div style={{ border:`1px solid ${C.border}`, borderRadius:"5px", padding:"9px 11px" }}>
            <div style={{ display:"flex", alignItems:"center", gap:"5px", marginBottom:"5px" }}>
              <div style={{ width:"20px", height:"20px", borderRadius:"4px", background:"#D1FAE5", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"11px" }}>📱</div>
              <div>
                <p style={{ fontSize:"9px", fontWeight:600, color:C.text }}>WhatsApp Business API</p>
                <p style={{ fontSize:"7px", color:C.textMuted }}>API Oficial da Meta</p>
              </div>
            </div>
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"5px" }}>
              <span style={{ fontSize:"8px", color:C.textSec }}>Status:</span>
              <span style={{ fontSize:"7px", color:C.textMuted }}>Não conectado</span>
            </div>
            {[
              { l:"Phone Number ID", p:"Ex: 123456789012345", v:"" },
              { l:"Access Token", p:"••••••", t:"password", v:"" },
              { l:"Business Account ID", p:"", v:"dipaivabritto@gmail.com" },
              { l:"Número do WhatsApp (opcional)", p:"Ex: +55 11 99999-9999", v:"" },
            ].map((f, j) => (
              <div key={j} style={{ marginBottom:"4px" }}>
                <label style={{ fontSize:"7px", color:C.textSec }}>{f.l}</label>
                <input type={(f as any).t || "text"} placeholder={f.p} defaultValue={f.v} style={{ width:"100%", marginTop:"1px", border:`1px solid ${C.border}`, borderRadius:"3px", padding:"3px 6px", fontSize:"7px", fontFamily:"inherit", outline:"none", boxSizing:"border-box" as any }} />
              </div>
            ))}
            <button type="button" style={{ width:"100%", marginTop:"4px", background:"#16A34A", color:"#fff", border:"none", borderRadius:"4px", padding:"5px 0", fontSize:"8px", fontWeight:600, cursor:"pointer", fontFamily:"inherit" }}>💾 Salvar e Conectar</button>
          </div>
        </div>
      </div>
      {/* Infobip */}
      <div style={{ background:C.white, border:`1px solid ${C.border}`, borderRadius:"7px", padding:"10px 12px" }}>
        <p style={{ fontSize:"9px", fontWeight:600, color:C.text, marginBottom:"8px" }}>📡 Infobip</p>
        <div style={{ border:`1px solid ${C.border}`, borderRadius:"5px", padding:"9px 11px" }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:"7px" }}>
            <div style={{ display:"flex", alignItems:"center", gap:"5px" }}>
              <div style={{ width:"22px", height:"22px", borderRadius:"5px", background:C.amberBg, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"12px" }}>📦</div>
              <div>
                <p style={{ fontSize:"9px", fontWeight:600, color:C.text }}>Infobip SMS/WhatsApp</p>
                <p style={{ fontSize:"7px", color:C.textMuted }}>Envio de SMS e WhatsApp via API Infobip</p>
              </div>
            </div>
            <span style={{ fontSize:"7px", color:C.textMuted }}>Não configurado</span>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"6px", marginBottom:"7px" }}>
            {[
              { l:"API Base URL", v:"https://api.infobip.com" },
              { l:"API Key", v:"••••••", t:"password" },
              { l:"Sender ID (SMS)", v:"dipaivabritto@gmail.com" },
            ].map((f, j) => (
              <div key={j}>
                <label style={{ fontSize:"7px", color:C.textSec }}>{f.l}</label>
                <input type={(f as any).t || "text"} defaultValue={f.v} style={{ width:"100%", marginTop:"2px", border:`1px solid ${C.border}`, borderRadius:"3px", padding:"3px 6px", fontSize:"7px", fontFamily:"inherit", outline:"none", boxSizing:"border-box" as any }} />
              </div>
            ))}
          </div>
          <div style={{ display:"flex", gap:"5px" }}>
            <button type="button" style={{ background:C.blue, color:"#fff", border:"none", borderRadius:"4px", padding:"4px 10px", fontSize:"8px", fontWeight:600, cursor:"pointer", fontFamily:"inherit" }}>Salvar Configurações</button>
            <button type="button" style={{ background:"white", border:`1px solid ${C.border}`, borderRadius:"4px", padding:"4px 10px", fontSize:"8px", color:C.textSec, cursor:"pointer", fontFamily:"inherit" }}>💬 Testar Conexão</button>
          </div>
        </div>
      </div>
      {/* Solicitar */}
      <div style={{ background:C.white, border:`1px solid ${C.border}`, borderRadius:"7px", padding:"10px 12px" }}>
        <div style={{ display:"flex", alignItems:"center", gap:"5px", marginBottom:"6px" }}>
          <span style={{ fontSize:"16px" }}>✚</span>
          <div>
            <p style={{ fontSize:"9px", fontWeight:600, color:C.text }}>Solicitar Integração</p>
            <p style={{ fontSize:"7px", color:C.textSec }}>Precisa integrar com outro CRM ou sistema? Envie sua solicitação para nossa equipe técnica.</p>
          </div>
        </div>
        <p style={{ fontSize:"7px", color:C.textMuted, marginBottom:"6px" }}>Caso você utilize outro CRM e deseja integrar via API para sincronizar dados e enviar informações automaticamente para nossa plataforma, descreva sua necessidade abaixo.</p>
        <div style={{ display:"flex", flexDirection:"column", gap:"5px", marginBottom:"7px" }}>
          <div>
            <label style={{ fontSize:"7px", color:C.textSec }}>Nome da Integração/CRM</label>
            <input placeholder="Ex: Pipedrive, RD Station, HubSpot, Zoho CRM..." style={{ width:"100%", marginTop:"2px", border:`1px solid ${C.border}`, borderRadius:"3px", padding:"4px 7px", fontSize:"7px", fontFamily:"inherit", outline:"none", boxSizing:"border-box" as any }} />
          </div>
          <div>
            <label style={{ fontSize:"7px", color:C.textSec }}>Descreva sua necessidade</label>
            <textarea placeholder="Descreva quais dados você precisa sincronizar, qual a frequência e qualquer informação que possa nos ajudar..." style={{ width:"100%", marginTop:"2px", border:`1px solid ${C.border}`, borderRadius:"3px", padding:"4px 7px", fontSize:"7px", fontFamily:"inherit", outline:"none", boxSizing:"border-box" as any, minHeight:"40px", resize:"vertical" }} />
          </div>
        </div>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <button type="button" style={{ background:C.blue, color:"#fff", border:"none", borderRadius:"4px", padding:"5px 12px", fontSize:"8px", fontWeight:600, cursor:"pointer", fontFamily:"inherit" }}>📨 Enviar Solicitação</button>
          <span style={{ background:C.blueBg, color:C.blue, fontSize:"7px", fontWeight:600, padding:"2px 7px", borderRadius:"3px" }}>Em Breve</span>
        </div>
      </div>
    </div>
  );
}

/* ═══ PLACEHOLDER ════════════════════════════════════════════ */
function PlaceholderScreen({ title }: { title: string }) {
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:"12px" }}>
      <h2 style={{ fontSize:"14px", fontWeight:700, color:C.text }}>{title}</h2>
      <div style={{ background:C.white, borderRadius:"8px", padding:"28px", boxShadow:C.shadow, textAlign:"center" }}>
        <p style={{ fontSize:"10px", color:C.textMuted }}>Conteúdo de {title}</p>
      </div>
    </div>
  );
}

/* ═══ MAIN ═══════════════════════════════════════════════════ */
export default function NookleadCRMPreview() {
  const [screen, setScreen] = useState<Screen>("dashboard");

  const screenTitle: Record<Screen, string> = {
    dashboard:"Dashboard", leads:"Gerar Leads", pipeline:"Pipeline",
    campanhas:"Campanhas", vendas:"Vendas", integracoes:"Hub de Integrações",
    automacoes:"Automações", manager:"Dashboard Gerencial", equipe:"Equipe",
    aprovacoes:"Aprovações", ranking:"Ranking", planos:"Planos", config:"Configurações",
  };

  return (
    <div style={{ display:"flex", height:"594px", maxHeight:"594px", background:C.bg, fontFamily:"'Inter', system-ui, sans-serif", overflow:"hidden", fontSize:"13px" }}>

      {/* ══ SIDEBAR ══════════════════════════════════════════ */}
           <aside style={{ width:"155px", flexShrink:0, background:C.white, boxShadow:C.shadowLg, display:"flex", flexDirection:"column", zIndex:10, overflowY:"auto" }}>
        {/* Logo */}
        <div style={{ height:"50px", display:"flex", alignItems:"center", justifyContent:"space-between", padding:"0 12px", borderBottom:`1px solid ${C.border}`, flexShrink:0 }}>
          <img src="/nooklead-logo.jpeg" alt="Nooklead" style={{ height:"26px", width:"auto", objectFit:"contain" }} />
          <button type="button" style={{ background:"none", border:"none", cursor:"pointer", color:C.textMuted, padding:"2px" }}>
            <ChevronLeft size={11} />
          </button>
        </div>
        {/* User */}
        <div style={{ padding:"9px 12px", borderBottom:`1px solid ${C.border}`, flexShrink:0 }}>
          <div style={{ display:"flex", alignItems:"center", gap:"7px" }}>
            <div style={{ width:"30px", height:"30px", borderRadius:"50%", background:C.blue, display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontSize:"11px", fontWeight:700, flexShrink:0 }}>D</div>
            <div>
              <p style={{ fontSize:"9px", fontWeight:600, color:C.text }}>Diogo</p>
              <p style={{ fontSize:"7px", color:C.textMuted }}>Master</p>
            </div>
          </div>
        </div>
        {/* Nav */}
        <nav style={{ flex:1, padding:"7px 7px 3px", overflowY:"auto" }}>
          <p style={{ fontSize:"6px", fontWeight:600, color:C.textMuted, letterSpacing:"0.08em", padding:"3px 5px 3px", textTransform:"uppercase" }}>Meus Leads</p>
          {NAV_MEUS_LEADS.map((item, i) => {
            const isActive = screen === item.key;
            const Icon = item.icon;
            return (
              <button key={i} type="button" onClick={() => setScreen(item.key)} style={{
                display:"flex", alignItems:"center", gap:"6px", width:"100%",
                padding:"5px 7px", borderRadius:"5px", border:"none", cursor:"pointer",
                background: isActive ? C.blueBg : "transparent",
                color: isActive ? C.blue : C.textSec,
                fontFamily:"inherit", fontSize:"8px", fontWeight: isActive ? 600 : 400,
                marginBottom:"1px", textAlign:"left",
              }}>
                <Icon size={12} color={isActive ? C.blue : C.textSec} />
                <span style={{ flex:1 }}>{item.label}</span>
                {item.badge && <span style={{ background:C.blueBg2, color:C.blue, fontSize:"6px", fontWeight:600, padding:"1px 4px", borderRadius:"3px" }}>{item.badge}</span>}
              </button>
            );
          })}
          <p style={{ fontSize:"6px", fontWeight:600, color:C.textMuted, letterSpacing:"0.08em", padding:"7px 5px 3px", textTransform:"uppercase" }}>Gestão</p>
          {NAV_GESTAO.map((item, i) => {
            const isActive = screen === item.key;
            const Icon = item.icon;
            return (
              <button key={i} type="button" onClick={() => setScreen(item.key)} style={{
                display:"flex", alignItems:"center", gap:"6px", width:"100%",
                padding:"5px 7px", borderRadius:"5px", border:"none", cursor:"pointer",
                background: isActive ? C.blueBg : "transparent",
                color: isActive ? C.blue : C.textSec,
                fontFamily:"inherit", fontSize:"8px", fontWeight: isActive ? 600 : 400,
                marginBottom:"1px", textAlign:"left",
              }}>
                <Icon size={12} color={isActive ? C.blue : C.textSec} />
                <span style={{ flex:1 }}>{item.label}</span>
              </button>
            );
          })}
          <p style={{ fontSize:"6px", fontWeight:600, color:C.textMuted, letterSpacing:"0.08em", padding:"7px 5px 3px", textTransform:"uppercase" }}>Outros</p>
          {NAV_OUTROS.map((item, i) => {
            const Icon = item.icon;
            return (
              <button key={i} type="button" onClick={() => setScreen(item.key)} style={{
                display:"flex", alignItems:"center", gap:"6px", width:"100%",
                padding:"5px 7px", borderRadius:"5px", border:"none", cursor:"pointer",
                background:"transparent", color:C.textSec,
                fontFamily:"inherit", fontSize:"8px", fontWeight:400,
                marginBottom:"1px", textAlign:"left",
              }}>
                <Icon size={12} color={C.textSec} />
                <span style={{ flex:1 }}>{item.label}</span>
                {item.badge && <span style={{ background:C.blueBg2, color:C.blue, fontSize:"6px", fontWeight:600, padding:"1px 4px", borderRadius:"3px" }}>{item.badge}</span>}
              </button>
            );
          })}
        </nav>
        {/* Logout */}
        <div style={{ padding:"7px", borderTop:`1px solid ${C.border}`, flexShrink:0 }}>
          <button type="button" style={{ display:"flex", alignItems:"center", gap:"6px", width:"100%", padding:"5px 7px", borderRadius:"5px", border:"none", cursor:"pointer", background:"transparent", color:C.textSec, fontFamily:"inherit", fontSize:"8px" }}>
            <LogOut size={12} color={C.textSec} /> Sair
          </button>
        </div>
      </aside>

      {/* ══ MAIN AREA ════════════════════════════════════════ */}
      <div style={{ flex:1, display:"flex", flexDirection:"column", overflow:"hidden", minWidth:0 }}>
        {/* Header */}
        <header style={{ height:"46px", background:C.white, borderBottom:`1px solid ${C.border}`, padding:"0 14px", display:"flex", alignItems:"center", justifyContent:"space-between", flexShrink:0, boxShadow:"0 1px 3px rgba(0,0,0,0.05)" }}>
          <h2 style={{ fontSize:"12px", fontWeight:600, color:C.text }}>{screenTitle[screen]}</h2>
          <div style={{ display:"flex", alignItems:"center", gap:"10px" }}>
            <div style={{ position:"relative", cursor:"pointer" }}>
              <Bell size={15} color={C.textSec} />
              <span style={{ position:"absolute", top:"-4px", right:"-4px", background:C.red, color:"#fff", fontSize:"6px", fontWeight:700, width:"12px", height:"12px", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center" }}>15</span>
            </div>
            <div style={{ display:"flex", alignItems:"center", gap:"5px", border:`1px solid ${C.border}`, borderRadius:"5px", padding:"3px 7px", cursor:"pointer" }}>
              <div style={{ width:"16px", height:"16px", borderRadius:"3px", background:C.blue, display:"flex", alignItems:"center", justifyContent:"center" }}>
                <span style={{ fontSize:"7px", color:"#fff", fontWeight:700 }}>N</span>
              </div>
              <span style={{ fontSize:"8px", fontWeight:500, color:C.text }}>Nooklead</span>
            </div>
          </div>
        </header>
        {/* Content */}
        <div style={{ flex:1, overflowY:"auto", padding:"12px 14px", scrollbarWidth:"thin" }}>
          {screen === "dashboard"   && <DashboardScreen />}
          {screen === "leads"       && <LeadsScreen />}
          {screen === "pipeline"    && <PipelineScreen />}
          {screen === "campanhas"   && <CampanhasScreen />}
          {screen === "integracoes" && <IntegracoesScreen />}
          {screen === "ranking"     && <RankingScreen />}
          {screen === "vendas"      && <PlaceholderScreen title="Vendas" />}
          {screen === "automacoes"  && <PlaceholderScreen title="Automações" />}
          {screen === "manager"     && <PlaceholderScreen title="Dashboard Gerencial" />}
          {screen === "equipe"      && <PlaceholderScreen title="Equipe" />}
          {screen === "aprovacoes"  && <PlaceholderScreen title="Aprovações" />}
          {screen === "planos"      && <PlaceholderScreen title="Planos" />}
          {screen === "config"      && <PlaceholderScreen title="Configurações" />}
        </div>
      </div>
    </div>
  );
}
