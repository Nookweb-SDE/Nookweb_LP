/* ═══════════════════════════════════════════════════════════════
   EMPLY PREVIEW — Réplica fiel do frontend LuizM2/Emply
   Baseado em: theme.css, home.tsx, dashboard.tsx, sidebar.tsx,
               sidebar-item.tsx, logo.tsx, pdv-home.tsx
   Design tokens extraídos diretamente do theme.css original
═══════════════════════════════════════════════════════════════ */

import { useState } from "react";
import {
  LayoutDashboard,
  ShoppingCart,
  FileText,
  Wallet,
  Settings,
  Users,
  RefreshCw,
  ChevronLeft,
  Eye,
  EyeOff,
  TrendingUp,
  TrendingDown,
  DollarSign,
  BarChart3,
  Receipt,
  Clock,
  Crown,
  Medal,
  Award,
  Lock,
  ArrowRight,
  ArrowDownLeft,
  ArrowUpRight,
  CheckCircle2,
  AlertCircle,
  XCircle,
  CalendarDays,
  Zap,
  Package,
  MonitorSmartphone,
  ChevronRight,
} from "lucide-react";

/* ─── Design Tokens — extraídos de theme.css ─────────────── */
const T = {
  bg:              "#F8F9FA",     /* --background */
  white:           "#FFFFFF",     /* --card */
  primary:         "#09AA29",     /* --mp-primary */
  primaryHover:    "#078A21",
  primaryLight:    "#E8F8EC",     /* --mp-primary-light */
  secondary:       "#F68633",     /* --mp-secondary */
  secondaryLight:  "#FFF5ED",
  text:            "#1F2937",     /* --mp-text */
  textSec:         "#4B5563",     /* --mp-text-secondary */
  textMuted:       "#6B7280",     /* --mp-text-tertiary */
  textDim:         "#9CA3AF",     /* --mp-text-muted */
  heading:         "#111827",     /* --mp-heading */
  border:          "#CBD5E1",     /* --border */
  borderLight:     "#E2E8F0",
  blue:            "#3B82F6",
  blueBg:          "#EFF6FF",
  purple:          "#8B5CF6",
  purpleBg:        "#F5F3FF",
  amber:           "#D97706",
  amberBg:         "#FFFBEB",
  red:             "#E53E3E",
  redBg:           "#FEF2F2",
  green:           "#09AA29",
  greenBg:         "#E8F8EC",
  shadowCard:      "0 2px 8px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02)",
};

/* ─── MOCK DATA fiel à estrutura real das interfaces ──────── */
const MOCK = {
  company: { nomeFantasia: "TechCorp Serviços", cnpj: "12.345.678/0001-99" },
  month: "Março 2026",
  balance: { available: 2475080, blocked: 320000 }, /* em centavos como no backend */
  kpis: {
    revenue: 8742050, revenueTrend: 12.4,
    transactions: 342, transactionsTrend: 8.2,
    ticket: 25560, ticketTrend: 3.7,
    conversion: 76.4,
    charges_paid_month_count: 156,
    charges_paid_month_amount: 8742050,
    charges_pending: 24,
    clients_total: 318,
  },
  /* picos_horario — estrutura: { hora, valor, pct } */
  picosHorario: [
    { hora: "08h", valor: 120000, pct: 10 },
    { hora: "09h", valor: 340000, pct: 29 },
    { hora: "10h", valor: 580000, pct: 49 },
    { hora: "11h", valor: 720000, pct: 61 },
    { hora: "12h", valor: 910000, pct: 77 },
    { hora: "13h", valor: 860000, pct: 73 },
    { hora: "14h", valor: 1020000, pct: 86 },
    { hora: "15h", valor: 1180000, pct: 100 },
    { hora: "16h", valor: 940000, pct: 80 },
    { hora: "17h", valor: 760000, pct: 64 },
    { hora: "18h", valor: 520000, pct: 44 },
    { hora: "19h", valor: 280000, pct: 24 },
  ],
  picosDia: [
    { dia: "Seg", valor: 2100000, pct: 65 },
    { dia: "Ter", valor: 1850000, pct: 57 },
    { dia: "Qua", valor: 2400000, pct: 74 },
    { dia: "Qui", valor: 3220000, pct: 100 },
    { dia: "Sex", valor: 2980000, pct: 92 },
    { dia: "Sáb", valor: 1640000, pct: 51 },
    { dia: "Dom", valor: 820000, pct: 25 },
  ],
  /* seller_ranking — estrutura: { nome, vendas, valor, ticket_medio, posicao } */
  sellerRanking: [
    { nome: "Ana Paula S.", vendas: 89, valor: 2275000, ticket_medio: 25562, posicao: 1 },
    { nome: "Carlos Mendes", vendas: 71, valor: 1842000, ticket_medio: 25944, posicao: 2 },
    { nome: "Marina Santos", vendas: 58, valor: 1489000, ticket_medio: 25672, posicao: 3 },
    { nome: "João Ferreira", vendas: 42, valor: 1073000, ticket_medio: 25548, posicao: 4 },
  ],
  /* recent_charges */
  recentCharges: [
    { id: "cob-001", type: "PIX", status: "PAID", amount_cents: 485000, description: "Supermercado Bom Preço", due_date: "05/03/2026", created_at: "2h atrás" },
    { id: "cob-002", type: "PIX", status: "PENDING", amount_cents: 120000, description: "Academia FitLife", due_date: "10/03/2026", created_at: "4h atrás" },
    { id: "cob-003", type: "PIX", status: "PENDING", amount_cents: 89050, description: "Restaurante da Vila", due_date: "12/03/2026", created_at: "1d atrás" },
    { id: "cob-004", type: "PIX", status: "PAID", amount_cents: 340000, description: "Farmácia Central", due_date: "01/03/2026", created_at: "1d atrás" },
    { id: "cob-005", type: "PIX", status: "OVERDUE", amount_cents: 65000, description: "Pet Shop Animal", due_date: "28/02/2026", created_at: "3d atrás" },
  ],
  /* recent_transactions */
  recentTransactions: [
    { id: "tx-1", type: "PIX_IN", entry_type: "CREDIT", status: "COMPLETED", amount_cents: 485000, description: "PIX Recebido", counterpart_name: "Supermercado Bom Preço", counterpart_bank: "Itaú", created_at: "há 2h" },
    { id: "tx-2", type: "PIX_IN", entry_type: "CREDIT", status: "COMPLETED", amount_cents: 340000, description: "PIX Recebido", counterpart_name: "Farmácia Central", counterpart_bank: "Bradesco", created_at: "há 5h" },
    { id: "tx-3", type: "PIX_OUT", entry_type: "DEBIT", status: "COMPLETED", amount_cents: 200000, description: "Saque", counterpart_name: "Conta Corrente", counterpart_bank: null, created_at: "há 1d" },
    { id: "tx-4", type: "PIX_IN", entry_type: "CREDIT", status: "COMPLETED", amount_cents: 125000, description: "PIX Recebido", counterpart_name: "Loja Vestuário", counterpart_bank: "Nubank", created_at: "há 1d" },
  ],
  /* PDV stats */
  pdvStats: { vendas_hoje: 14, valor_hoje_cents: 532000, ticket_medio_cents: 38000, vendas_mes: 342, valor_mes_cents: 8742050 },
  recentVendas: [
    { id: "vd-441", sale_number: 441, client_name: "Supermercado Bom Preço", total_cents: 38000, status: "PAGO", items: [{}], created_at: "Há 12 min" },
    { id: "vd-440", sale_number: 440, client_name: "Academia FitLife", total_cents: 75000, status: "PAGO", items: [{}, {}], created_at: "Há 28 min" },
    { id: "vd-439", sale_number: 439, client_name: null, total_cents: 22000, status: "PAGO", items: [{}], created_at: "Há 45 min" },
    { id: "vd-438", sale_number: 438, client_name: "Restaurante da Vila", total_cents: 120000, status: "PENDENTE", items: [{}, {}, {}], created_at: "Há 1h" },
  ],
};

/* ─── Utils ────────────────────────────────────────────────── */
const fmtBRL = (cents: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(cents / 100);

const chargeStatusConfig: Record<string, { label: string; color: string; bg: string }> = {
  PENDING:  { label: "Pendente",  color: T.amber,   bg: T.amberBg },
  PAID:     { label: "Pago",      color: T.primary,  bg: T.primaryLight },
  CANCELLED:{ label: "Cancelado", color: T.textMuted,bg: T.borderLight },
  FAILED:   { label: "Falhou",    color: T.red,      bg: T.redBg },
  OVERDUE:  { label: "Vencido",   color: T.red,      bg: T.redBg },
};

/* ─── Shared sub-components ────────────────────────────────── */
function StatusBadge({ status }: { status: string }) {
  const cfg = chargeStatusConfig[status] ?? { label: status, color: T.textMuted, bg: T.borderLight };
  return (
    <span style={{
      background: cfg.bg, color: cfg.color,
      fontSize: "9px", fontWeight: 600, padding: "2px 7px", borderRadius: "20px",
    }}>{cfg.label}</span>
  );
}

function PosicaoIcon({ posicao }: { posicao: number }) {
  const size = 12;
  if (posicao === 1) return <Crown size={size} color="#F59E0B" />;
  if (posicao === 2) return <Medal size={size} color="#94A3B8" />;
  if (posicao === 3) return <Award size={size} color="#92400E" />;
  return <span style={{ fontSize: "9px", fontWeight: 700, color: T.textMuted, width: "12px", textAlign: "center" }}>{posicao}º</span>;
}

/* ═══ SCREEN: HOME — baseado em home.tsx ════════════════════ */
function HomeScreen() {
  const [balanceVisible, setBalanceVisible] = useState(true);
  const { balance, kpis, recentCharges, recentTransactions } = MOCK;

  const cards = [
    {
      label: "Saldo disponível",
      value: balanceVisible ? fmtBRL(balance.available) : "••••••",
      sub: balance.blocked > 0 ? `Bloqueado: ${fmtBRL(balance.blocked)}` : null,
      right: (
        <button type="button" onClick={() => setBalanceVisible(v => !v)}
          style={{ background: "none", border: "none", cursor: "pointer", color: T.textMuted, padding: "2px" }}>
          {balanceVisible ? <Eye size={13} /> : <EyeOff size={13} />}
        </button>
      ),
      wide: true,
    },
    {
      label: "Recebido no mês",
      value: balanceVisible ? fmtBRL(kpis.charges_paid_month_amount) : "••••••",
      sub: `${kpis.charges_paid_month_count} cobranças pagas`,
      icon: <TrendingUp size={14} color={T.primary} />, iconBg: T.primaryLight,
    },
    {
      label: "Pendentes",
      value: String(kpis.charges_pending),
      sub: "Cobranças aguardando",
      icon: <Clock size={14} color={T.amber} />, iconBg: T.amberBg,
    },
    {
      label: "Clientes",
      value: String(kpis.clients_total),
      sub: "Cadastrados",
      icon: <Users size={14} color={T.purple} />, iconBg: T.purpleBg,
    },
  ];

  const quickActions = [
    { title: "Nova venda",    desc: "PDV e lançamentos",  icon: <Receipt size={14} color={T.blue} />,    iconBg: T.blueBg },
    { title: "Nova cobrança", desc: "Gere cobranças PIX", icon: <DollarSign size={14} color={T.primary} />, iconBg: T.primaryLight },
    { title: "Novo cliente",  desc: "Cadastre clientes",  icon: <Users size={14} color={T.purple} />,    iconBg: T.purpleBg },
    { title: "Extrato",       desc: "Movimentações",      icon: <FileText size={14} color={T.amber} />,  iconBg: T.amberBg },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <p style={{ fontSize: "12px", fontWeight: 700, color: T.heading, lineHeight: 1.3 }}>Olá, bem-vindo!</p>
          <p style={{ fontSize: "9px", color: T.textMuted, marginTop: "1px" }}>{MOCK.company.nomeFantasia}</p>
        </div>
        <button type="button" style={{
          display: "flex", alignItems: "center", gap: "4px",
          background: T.white, border: `1px solid ${T.border}`, borderRadius: "6px",
          padding: "4px 8px", fontSize: "9px", color: T.textMuted, cursor: "pointer", fontFamily: "inherit",
        }}>
          <RefreshCw size={10} />
          Atualizar
        </button>
      </div>

      {/* KPI Cards 2x2 */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "7px" }}>
        {cards.map((c, i) => (
          <div key={i} style={{
            background: T.white, border: `1px solid ${T.borderLight}`, borderRadius: "8px",
            padding: "10px 12px", boxShadow: T.shadowCard,
          }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "6px" }}>
              <span style={{ fontSize: "9px", color: T.textMuted, fontWeight: 500 }}>{c.label}</span>
              {c.right ? c.right : c.icon ? (
                <div style={{ width: "24px", height: "24px", borderRadius: "6px", background: (c as any).iconBg, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {c.icon}
                </div>
              ) : null}
            </div>
            <p style={{ fontSize: i === 0 ? "15px" : "14px", fontWeight: 700, color: T.heading, lineHeight: 1 }}>{c.value}</p>
            {c.sub && <p style={{ fontSize: "8px", color: T.textMuted, marginTop: "3px" }}>{c.sub}</p>}
          </div>
        ))}
      </div>

      {/* Ações rápidas */}
      <div>
        <p style={{ fontSize: "10px", fontWeight: 700, color: T.heading, marginBottom: "8px" }}>Ações rápidas</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px" }}>
          {quickActions.map((a, i) => (
            <div key={i} style={{
              background: T.white, border: `1px solid ${T.borderLight}`, borderRadius: "8px",
              padding: "10px", display: "flex", alignItems: "center", gap: "8px", cursor: "pointer",
              boxShadow: T.shadowCard,
            }}>
              <div style={{ width: "28px", height: "28px", borderRadius: "8px", background: a.iconBg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                {a.icon}
              </div>
              <div>
                <p style={{ fontSize: "9px", fontWeight: 600, color: T.heading, lineHeight: 1.2 }}>{a.title}</p>
                <p style={{ fontSize: "8px", color: T.textMuted, marginTop: "1px" }}>{a.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Últimas cobranças */}
      <div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
          <p style={{ fontSize: "10px", fontWeight: 700, color: T.heading }}>Últimas cobranças</p>
          <span style={{ fontSize: "9px", color: T.primary, fontWeight: 500, display: "flex", alignItems: "center", gap: "2px" }}>
            Ver todas <ChevronRight size={10} />
          </span>
        </div>
        <div style={{ background: T.white, border: `1px solid ${T.borderLight}`, borderRadius: "8px", overflow: "hidden", boxShadow: T.shadowCard }}>
          {recentCharges.slice(0, 3).map((c, i) => {
            const cfg = chargeStatusConfig[c.status] ?? chargeStatusConfig.PENDING;
            return (
              <div key={c.id} style={{
                display: "flex", alignItems: "center", gap: "8px", padding: "9px 12px",
                borderTop: i > 0 ? `1px solid ${T.borderLight}` : "none",
              }}>
                <div style={{ width: "28px", height: "28px", borderRadius: "8px", background: cfg.bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  {c.status === "PAID" ? <CheckCircle2 size={13} color={T.primary} /> :
                   c.status === "OVERDUE" ? <AlertCircle size={13} color={T.red} /> :
                   <Clock size={13} color={T.amber} />}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: "9px", fontWeight: 600, color: T.heading, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{c.description}</p>
                  <p style={{ fontSize: "8px", color: T.textMuted }}>{c.created_at}</p>
                </div>
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <p style={{ fontSize: "9px", fontWeight: 700, color: T.heading }}>{fmtBRL(c.amount_cents)}</p>
                  <StatusBadge status={c.status} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Últimas transações */}
      <div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
          <p style={{ fontSize: "10px", fontWeight: 700, color: T.heading }}>Últimas transações</p>
          <span style={{ fontSize: "9px", color: T.primary, fontWeight: 500, display: "flex", alignItems: "center", gap: "2px" }}>
            Ver extrato <ChevronRight size={10} />
          </span>
        </div>
        <div style={{ background: T.white, border: `1px solid ${T.borderLight}`, borderRadius: "8px", overflow: "hidden", boxShadow: T.shadowCard }}>
          {recentTransactions.map((tx, i) => {
            const isIn = tx.entry_type === "CREDIT";
            return (
              <div key={tx.id} style={{
                display: "flex", alignItems: "center", gap: "8px", padding: "9px 12px",
                borderTop: i > 0 ? `1px solid ${T.borderLight}` : "none",
              }}>
                <div style={{ width: "28px", height: "28px", borderRadius: "8px", background: isIn ? T.primaryLight : T.redBg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  {isIn ? <ArrowDownLeft size={13} color={T.primary} /> : <ArrowUpRight size={13} color={T.red} />}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: "9px", fontWeight: 600, color: T.heading, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{tx.counterpart_name}</p>
                  <p style={{ fontSize: "8px", color: T.textMuted }}>{tx.description} · {tx.created_at}</p>
                </div>
                <p style={{ fontSize: "9px", fontWeight: 700, color: isIn ? T.primary : T.heading, flexShrink: 0 }}>
                  {isIn ? "+" : "-"}{fmtBRL(tx.amount_cents)}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ═══ SCREEN: DASHBOARD — baseado em dashboard.tsx ══════════ */
function DashboardScreen() {
  const [showSaldo, setShowSaldo] = useState(true);
  const [picoView, setPicoView] = useState<"horario" | "dia">("horario");
  const { balance, kpis, picosHorario, picosDia, sellerRanking } = MOCK;

  const currentPicos = picoView === "horario" ? picosHorario : picosDia;
  const picoMax = Math.max(...currentPicos.map(p => p.valor));
  const peakPico = currentPicos.reduce((a, b) => a.valor > b.valor ? a : b);

  const indicadores = [
    { label: "Receita do Mês",    value: fmtBRL(kpis.revenue),      trend: kpis.revenueTrend,      up: true,  icon: <DollarSign size={14} color={T.primary} />, iconBg: T.primaryLight },
    { label: "Transações",        value: String(kpis.transactions),  trend: kpis.transactionsTrend, up: true,  icon: <Receipt size={14} color={T.blue} />,      iconBg: T.blueBg },
    { label: "Ticket Médio",      value: fmtBRL(kpis.ticket),       trend: kpis.ticketTrend,       up: true,  icon: <TrendingUp size={14} color={T.purple} />, iconBg: T.purpleBg },
    { label: "Taxa de Conversão", value: `${kpis.conversion}%`,     trend: null,                   up: true,  icon: <BarChart3 size={14} color={T.amber} />,   iconBg: T.amberBg },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "13px" }}>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{ width: "28px", height: "28px", borderRadius: "8px", background: T.primaryLight, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <LayoutDashboard size={14} color={T.primary} />
          </div>
          <div>
            <p style={{ fontSize: "13px", fontWeight: 700, color: T.heading, lineHeight: 1.2 }}>Dashboard</p>
            <p style={{ fontSize: "8px", color: T.textMuted }}>{MOCK.company.nomeFantasia}</p>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "4px", background: T.bg, border: `1px solid ${T.borderLight}`, borderRadius: "6px", padding: "3px 8px" }}>
          <CalendarDays size={10} color={T.textMuted} />
          <span style={{ fontSize: "8px", color: T.textMuted }}>{MOCK.month}</span>
        </div>
      </div>

      {/* Saldo Card — gradient background igual ao dashboard.tsx */}
      <div style={{
        borderRadius: "8px", border: `1px solid ${T.borderLight}`, overflow: "hidden", boxShadow: T.shadowCard,
        background: "linear-gradient(135deg, #E8F8EC 0%, #F0FFF4 50%, #FFFBF5 100%)",
      }}>
        <div style={{ padding: "12px 14px" }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "5px", marginBottom: "6px" }}>
                <Wallet size={13} color={T.primary} />
                <span style={{ fontSize: "9px", fontWeight: 600, color: "#374151" }}>Saldo da Conta</span>
                <button type="button" onClick={() => setShowSaldo(v => !v)}
                  style={{ background: "none", border: "none", cursor: "pointer", padding: "1px", color: "#6B7280" }}>
                  {showSaldo ? <Eye size={11} /> : <EyeOff size={11} />}
                </button>
              </div>
              <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
                <div>
                  <p style={{ fontSize: "8px", color: "#6B7280", marginBottom: "2px" }}>Disponível</p>
                  <p style={{ fontSize: "16px", fontWeight: 700, color: T.heading, letterSpacing: "-0.02em" }}>
                    {showSaldo ? fmtBRL(balance.available) : "••••••"}
                  </p>
                </div>
                <div>
                  <p style={{ fontSize: "8px", color: "#6B7280", marginBottom: "2px", display: "flex", alignItems: "center", gap: "3px" }}>
                    <Lock size={8} color="#94A3B8" /> Bloqueado
                  </p>
                  <p style={{ fontSize: "12px", fontWeight: 600, color: "#4B5563" }}>
                    {showSaldo ? fmtBRL(balance.blocked) : "••••"}
                  </p>
                </div>
              </div>
            </div>
            <button type="button" style={{
              background: "rgba(255,255,255,0.8)", border: `1px solid ${T.border}`, borderRadius: "6px",
              padding: "4px 8px", fontSize: "8px", color: T.textSec, cursor: "pointer", fontFamily: "inherit",
              display: "flex", alignItems: "center", gap: "3px",
            }}>
              Ver extrato <ArrowRight size={9} />
            </button>
          </div>
        </div>
      </div>

      {/* Indicadores — 4 cards */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "6px" }}>
        {indicadores.map((ind, i) => (
          <div key={i} style={{
            background: T.white, border: `1px solid ${T.borderLight}`, borderRadius: "8px",
            padding: "10px", boxShadow: T.shadowCard, position: "relative", overflow: "hidden",
          }}>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
              <div>
                <p style={{ fontSize: "7px", color: T.textMuted, letterSpacing: "0.04em", textTransform: "uppercase", marginBottom: "4px" }}>{ind.label}</p>
                <p style={{ fontSize: "11px", fontWeight: 700, color: T.heading, lineHeight: 1 }}>{ind.value}</p>
                {ind.trend !== null && (
                  <div style={{ display: "flex", alignItems: "center", gap: "2px", marginTop: "4px" }}>
                    <span style={{
                      display: "flex", alignItems: "center", gap: "1px",
                      fontSize: "8px", fontWeight: 600, padding: "1px 4px", borderRadius: "20px",
                      background: ind.up ? T.primaryLight : T.redBg,
                      color: ind.up ? T.primary : T.red,
                    }}>
                      {ind.up ? <TrendingUp size={8} /> : <TrendingDown size={8} />}
                      {ind.trend}%
                    </span>
                  </div>
                )}
              </div>
              <div style={{ width: "24px", height: "24px", borderRadius: "6px", background: ind.iconBg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                {ind.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Picos de Vendas + Ranking — 2 colunas */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>

        {/* Picos de Vendas */}
        <div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "6px" }}>
            <p style={{ fontSize: "9px", fontWeight: 700, color: T.heading }}>Picos de Vendas</p>
            <div style={{ display: "flex", background: "#F3F4F6", borderRadius: "6px", padding: "2px" }}>
              {(["horario", "dia"] as const).map(v => (
                <button key={v} type="button" onClick={() => setPicoView(v)} style={{
                  padding: "2px 6px", fontSize: "7px", fontWeight: 500, borderRadius: "4px", border: "none", cursor: "pointer",
                  background: picoView === v ? T.white : "transparent",
                  color: picoView === v ? T.heading : T.textMuted,
                  boxShadow: picoView === v ? "0 1px 2px rgba(0,0,0,0.06)" : "none",
                  fontFamily: "inherit",
                }}>
                  {v === "horario" ? "Por Hora" : "Por Dia"}
                </button>
              ))}
            </div>
          </div>
          <div style={{ background: T.white, border: `1px solid ${T.borderLight}`, borderRadius: "8px", padding: "10px", boxShadow: T.shadowCard }}>
            {/* Bar chart */}
            <div style={{ display: "flex", alignItems: "flex-end", gap: "2px", height: "60px" }}>
              {currentPicos.map((p, i) => {
                const isMax = p.valor === picoMax;
                const h = Math.max(3, Math.round((p.valor / picoMax) * 56));
                return (
                  <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end", height: "100%" }}>
                    <div style={{
                      width: "100%", height: `${h}px`, borderRadius: "2px 2px 0 0",
                      background: isMax ? T.primary : `${T.primary}50`,
                      minHeight: "3px",
                    }} />
                  </div>
                );
              })}
            </div>
            {/* X labels */}
            <div style={{ display: "flex", gap: "2px", marginTop: "4px", borderTop: `1px solid ${T.borderLight}`, paddingTop: "4px" }}>
              {currentPicos.map((p, i) => (
                <div key={i} style={{ flex: 1, textAlign: "center" }}>
                  <span style={{ fontSize: "6px", color: T.textMuted }}>{"hora" in p ? (p as any).hora : (p as any).dia}</span>
                </div>
              ))}
            </div>
            {/* Peak */}
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "6px", paddingTop: "5px", borderTop: `1px solid ${T.borderLight}` }}>
              <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                <Clock size={9} color={T.primary} />
                <span style={{ fontSize: "8px", color: T.textMuted }}>
                  Pico: <strong style={{ color: T.heading }}>{"hora" in peakPico ? (peakPico as any).hora : (peakPico as any).dia}</strong>
                </span>
              </div>
              <span style={{ fontSize: "8px", fontWeight: 700, color: T.primary }}>{fmtBRL(peakPico.valor)}</span>
            </div>
          </div>
        </div>

        {/* Ranking Atendentes */}
        <div>
          <p style={{ fontSize: "9px", fontWeight: 700, color: T.heading, marginBottom: "6px" }}>Vendas por Atendente</p>
          <div style={{ background: T.white, border: `1px solid ${T.borderLight}`, borderRadius: "8px", overflow: "hidden", boxShadow: T.shadowCard }}>
            {sellerRanking.map((s, i) => {
              const barW = sellerRanking[0].valor > 0 ? (s.valor / sellerRanking[0].valor) * 100 : 0;
              return (
                <div key={i} style={{ padding: "8px 10px", borderTop: i > 0 ? `1px solid ${T.borderLight}` : "none" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <div style={{ width: "14px", flexShrink: 0, display: "flex", justifyContent: "center" }}>
                      <PosicaoIcon posicao={s.posicao} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2px" }}>
                        <span style={{ fontSize: "9px", fontWeight: 600, color: T.heading, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{s.nome}</span>
                        <span style={{ fontSize: "9px", fontWeight: 700, color: T.heading, marginLeft: "4px", flexShrink: 0 }}>{fmtBRL(s.valor)}</span>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "3px" }}>
                        <span style={{ fontSize: "7px", color: T.textMuted }}>{s.vendas} vendas</span>
                        <span style={{ fontSize: "7px", color: T.textMuted }}>Ticket: {fmtBRL(s.ticket_medio)}</span>
                      </div>
                      <div style={{ height: "3px", background: "#F3F4F6", borderRadius: "2px", overflow: "hidden" }}>
                        <div style={{ height: "100%", width: `${barW}%`, background: `${T.primary}70`, borderRadius: "2px" }} />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Atalhos Rápidos */}
      <div>
        <p style={{ fontSize: "9px", fontWeight: 700, color: T.heading, marginBottom: "7px" }}>Atalhos Rápidos</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "6px" }}>
          {[
            { title: "Abrir Caixa",   desc: "PDV",         icon: <ShoppingCart size={13} color={T.primary} />, iconBg: T.primaryLight },
            { title: "Nova Cobrança", desc: "BolePix",     icon: <FileText size={13} color={T.blue} />,       iconBg: T.blueBg },
            { title: "Relatórios",    desc: "Exportar",    icon: <BarChart3 size={13} color={T.purple} />,    iconBg: T.purpleBg },
            { title: "Equipe",        desc: "Atendentes",  icon: <Users size={13} color={T.amber} />,         iconBg: T.amberBg },
          ].map((a, i) => (
            <div key={i} style={{ background: T.white, border: `1px solid ${T.borderLight}`, borderRadius: "8px", padding: "9px", cursor: "pointer", boxShadow: T.shadowCard }}>
              <div style={{ width: "26px", height: "26px", borderRadius: "7px", background: a.iconBg, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "6px" }}>
                {a.icon}
              </div>
              <p style={{ fontSize: "8px", fontWeight: 600, color: T.heading }}>{a.title}</p>
              <p style={{ fontSize: "7px", color: T.textMuted, marginTop: "1px" }}>{a.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══ SCREEN: PDV — baseado em pdv-home.tsx ════════════════ */
function PDVScreen() {
  const { pdvStats, recentVendas } = MOCK;

  const stats = [
    { label: "Vendas Hoje",    value: String(pdvStats.vendas_hoje),    sub: fmtBRL(pdvStats.valor_hoje_cents),           icon: <ShoppingCart size={14} color={T.primary} />, iconBg: T.primaryLight },
    { label: "Ticket Médio",   value: fmtBRL(pdvStats.ticket_medio_cents), sub: "Média por venda hoje",               icon: <TrendingUp size={14} color={T.blue} />,    iconBg: T.blueBg },
    { label: "Vendas no Mês",  value: String(pdvStats.vendas_mes),     sub: fmtBRL(pdvStats.valor_mes_cents),           icon: <BarChart3 size={14} color={T.purple} />,   iconBg: T.purpleBg },
    { label: "Última Venda",   value: "Há 12 min",                     sub: "Supermercado Bom Preço · R$ 380,00",       icon: <Clock size={14} color={T.amber} />,        iconBg: T.amberBg },
  ];

  const quickActions = [
    { title: "Abrir Caixa",        desc: "Iniciar atendimento",    icon: <ShoppingCart size={13} color={T.primary} />,        iconBg: T.primaryLight },
    { title: "Modo Fullscreen",    desc: "Ideal para tablet",      icon: <MonitorSmartphone size={13} color={T.blue} />,      iconBg: T.blueBg },
    { title: "Histórico de Vendas",desc: "Consultar vendas",       icon: <Receipt size={13} color={T.purple} />,             iconBg: T.purpleBg },
    { title: "Catálogo",           desc: "Produtos e preços",      icon: <Package size={13} color={T.amber} />,              iconBg: T.amberBg },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "13px" }}>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <div style={{ width: "28px", height: "28px", borderRadius: "8px", background: T.primaryLight, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Zap size={14} color={T.primary} />
        </div>
        <div>
          <p style={{ fontSize: "13px", fontWeight: 700, color: T.heading }}>PDV PIX</p>
          <p style={{ fontSize: "8px", color: T.textMuted }}>Ponto de venda com pagamento instantâneo via PIX</p>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "6px" }}>
        {stats.map((s, i) => (
          <div key={i} style={{ background: T.white, border: `1px solid ${T.borderLight}`, borderRadius: "8px", padding: "10px", boxShadow: T.shadowCard }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <p style={{ fontSize: "7px", color: T.textMuted, textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: "4px" }}>{s.label}</p>
                <p style={{ fontSize: "11px", fontWeight: 700, color: T.heading }}>{s.value}</p>
                <p style={{ fontSize: "7px", color: T.textMuted, marginTop: "2px" }}>{s.sub}</p>
              </div>
              <div style={{ width: "24px", height: "24px", borderRadius: "6px", background: s.iconBg, display: "flex", alignItems: "center", justifyContent: "center" }}>
                {s.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Atalhos Rápidos */}
      <div>
        <p style={{ fontSize: "9px", fontWeight: 700, color: T.heading, marginBottom: "7px" }}>Atalhos Rápidos</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "6px" }}>
          {quickActions.map((a, i) => (
            <div key={i} style={{ background: T.white, border: `1px solid ${T.borderLight}`, borderRadius: "8px", padding: "9px", cursor: "pointer", boxShadow: T.shadowCard }}>
              <div style={{ width: "26px", height: "26px", borderRadius: "7px", background: a.iconBg, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "6px" }}>
                {a.icon}
              </div>
              <p style={{ fontSize: "8px", fontWeight: 600, color: T.heading, lineHeight: 1.3 }}>{a.title}</p>
              <p style={{ fontSize: "7px", color: T.textMuted, marginTop: "1px" }}>{a.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Atividade Recente */}
      <div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "7px" }}>
          <p style={{ fontSize: "9px", fontWeight: 700, color: T.heading }}>Atividade Recente</p>
          <span style={{ fontSize: "9px", color: T.primary, fontWeight: 500, display: "flex", alignItems: "center", gap: "2px" }}>
            Ver todas <ArrowRight size={9} />
          </span>
        </div>
        <div style={{ background: T.white, border: `1px solid ${T.borderLight}`, borderRadius: "8px", overflow: "hidden", boxShadow: T.shadowCard }}>
          {recentVendas.map((v, i) => {
            const isPago = v.status === "PAGO";
            const isPendente = v.status === "PENDENTE";
            return (
              <div key={v.id} style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "9px 12px", borderTop: i > 0 ? `1px solid ${T.borderLight}` : "none",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", minWidth: 0 }}>
                  <div style={{
                    width: "28px", height: "28px", borderRadius: "7px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                    background: isPago ? "#F0FFF4" : isPendente ? T.amberBg : T.redBg,
                  }}>
                    {isPago ? <CheckCircle2 size={13} color={T.green} /> : isPendente ? <Clock size={13} color={T.amber} /> : <XCircle size={13} color={T.red} />}
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                      <p style={{ fontSize: "9px", fontWeight: 600, color: T.heading, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {v.client_name ?? "Sem cliente"}
                      </p>
                      <span style={{ fontSize: "8px", color: T.textMuted }}>#{v.sale_number}</span>
                    </div>
                    <p style={{ fontSize: "7px", color: T.textMuted }}>{v.items.length} {v.items.length === 1 ? "item" : "itens"} · {v.created_at}</p>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", flexShrink: 0 }}>
                  <StatusBadge status={v.status} />
                  <span style={{ fontSize: "9px", fontWeight: 600, color: T.heading }}>{fmtBRL(v.total_cents)}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ═══ SCREEN: COBRANÇAS ════════════════════════════════════ */
function CobrancasScreen() {
  const { recentCharges } = MOCK;
  const totalPago = recentCharges.filter(c => c.status === "PAID").reduce((s, c) => s + c.amount_cents, 0);
  const totalPendente = recentCharges.filter(c => c.status === "PENDING").reduce((s, c) => s + c.amount_cents, 0);
  const totalVencido = recentCharges.filter(c => c.status === "OVERDUE").reduce((s, c) => s + c.amount_cents, 0);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "13px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <p style={{ fontSize: "13px", fontWeight: 700, color: T.heading }}>Cobranças BolePix</p>
          <p style={{ fontSize: "8px", color: T.textMuted }}>Gerencie cobranças PIX dos seus clientes</p>
        </div>
        <button type="button" style={{
          background: T.primary, color: "#fff", border: "none", borderRadius: "6px",
          padding: "5px 10px", fontSize: "9px", fontWeight: 700, cursor: "pointer", fontFamily: "inherit",
        }}>+ Nova Cobrança</button>
      </div>

      {/* Stats 3 cards */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "7px" }}>
        {[
          { label: "Pagas",     value: fmtBRL(totalPago),     color: T.primary },
          { label: "Pendentes", value: fmtBRL(totalPendente), color: T.amber },
          { label: "Vencidas",  value: fmtBRL(totalVencido),  color: T.red },
        ].map((s, i) => (
          <div key={i} style={{ background: T.white, border: `1px solid ${T.borderLight}`, borderRadius: "8px", padding: "10px", boxShadow: T.shadowCard }}>
            <p style={{ fontSize: "8px", color: T.textMuted, marginBottom: "4px" }}>{s.label}</p>
            <p style={{ fontSize: "10px", fontWeight: 700, color: s.color }}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div style={{ background: T.white, border: `1px solid ${T.borderLight}`, borderRadius: "8px", overflow: "hidden", boxShadow: T.shadowCard }}>
        <div style={{ padding: "8px 12px", borderBottom: `1px solid ${T.borderLight}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: "9px", fontWeight: 700, color: T.heading }}>Cobranças Recentes</span>
          <span style={{ fontSize: "8px", color: T.textMuted }}>{recentCharges.length} registros</span>
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: T.bg }}>
              {["ID", "Cliente", "Valor", "Vencimento", "Status"].map(h => (
                <th key={h} style={{ padding: "5px 10px", textAlign: "left", fontSize: "8px", color: T.textMuted, fontWeight: 600, letterSpacing: "0.05em" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {recentCharges.map((c) => (
              <tr key={c.id} style={{ borderTop: `1px solid ${T.borderLight}` }}>
                <td style={{ padding: "7px 10px", fontSize: "8px", color: T.textMuted, fontFamily: "monospace" }}>{c.id}</td>
                <td style={{ padding: "7px 10px", fontSize: "9px", fontWeight: 600, color: T.heading }}>{c.description}</td>
                <td style={{ padding: "7px 10px", fontSize: "9px", fontWeight: 700, color: T.heading }}>{fmtBRL(c.amount_cents)}</td>
                <td style={{ padding: "7px 10px", fontSize: "8px", color: T.textMuted }}>{c.due_date}</td>
                <td style={{ padding: "7px 10px" }}><StatusBadge status={c.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ═══ SCREEN: FINANCEIRO ════════════════════════════════════ */
function FinanceiroScreen() {
  const { recentTransactions } = MOCK;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "13px" }}>
      <div>
        <p style={{ fontSize: "13px", fontWeight: 700, color: T.heading }}>Extrato Financeiro</p>
        <p style={{ fontSize: "8px", color: T.textMuted }}>Movimentações da conta PIX · {MOCK.month}</p>
      </div>

      {/* Summary */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "7px" }}>
        <div style={{ background: T.white, border: `1px solid ${T.borderLight}`, borderRadius: "8px", padding: "12px", boxShadow: T.shadowCard }}>
          <p style={{ fontSize: "8px", color: T.textMuted, marginBottom: "4px" }}>Entradas no mês</p>
          <p style={{ fontSize: "16px", fontWeight: 800, color: T.primary }}>{fmtBRL(MOCK.kpis.revenue)}</p>
          <p style={{ fontSize: "8px", color: T.textMuted, marginTop: "3px", display: "flex", alignItems: "center", gap: "2px" }}>
            <TrendingUp size={9} color={T.primary} /> 12,4% vs mês ant.
          </p>
        </div>
        <div style={{ background: T.white, border: `1px solid ${T.borderLight}`, borderRadius: "8px", padding: "12px", boxShadow: T.shadowCard }}>
          <p style={{ fontSize: "8px", color: T.textMuted, marginBottom: "4px" }}>Saídas no mês</p>
          <p style={{ fontSize: "16px", fontWeight: 800, color: T.red }}>{fmtBRL(280000)}</p>
          <p style={{ fontSize: "8px", color: T.textMuted, marginTop: "3px" }}>Saques e devoluções</p>
        </div>
      </div>

      {/* Transactions */}
      <div>
        <p style={{ fontSize: "9px", fontWeight: 700, color: T.heading, marginBottom: "7px" }}>Lançamentos Recentes</p>
        <div style={{ background: T.white, border: `1px solid ${T.borderLight}`, borderRadius: "8px", overflow: "hidden", boxShadow: T.shadowCard }}>
          {recentTransactions.map((tx, i) => {
            const isIn = tx.entry_type === "CREDIT";
            return (
              <div key={tx.id} style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "10px 12px", borderTop: i > 0 ? `1px solid ${T.borderLight}` : "none",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: isIn ? T.primaryLight : T.redBg, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {isIn ? <ArrowDownLeft size={14} color={T.primary} /> : <ArrowUpRight size={14} color={T.red} />}
                  </div>
                  <div>
                    <p style={{ fontSize: "10px", fontWeight: 600, color: T.heading }}>{tx.description}</p>
                    <p style={{ fontSize: "8px", color: T.textMuted }}>{tx.counterpart_name} · {tx.created_at}</p>
                  </div>
                </div>
                <p style={{ fontSize: "11px", fontWeight: 700, color: isIn ? T.primary : T.red }}>
                  {isIn ? "+" : ""}{fmtBRL(tx.amount_cents)}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ═══ NAV CONFIG — baseado em sidebar.tsx (GERENTE role) ══ */
type Screen = "home" | "dashboard" | "pdv" | "cobrancas" | "financeiro";

const NAV_ITEMS: { key: Screen; label: string; icon: React.ReactNode }[] = [
  { key: "home",       label: "Início",     icon: <LayoutDashboard size={15} /> },
  { key: "dashboard",  label: "Dashboard",  icon: <BarChart3 size={15} /> },
  { key: "pdv",        label: "PDV",        icon: <ShoppingCart size={15} /> },
  { key: "cobrancas",  label: "Cobranças",  icon: <FileText size={15} /> },
  { key: "financeiro", label: "Financeiro", icon: <Wallet size={15} /> },
];

const NAV_EXTRA = [
  { label: "Clientes",     icon: <Users size={13} /> },
  { label: "Assinaturas",  icon: <RefreshCw size={13} /> },
  { label: "Config.",      icon: <Settings size={13} /> },
];

/* ═══ MAIN EXPORT ══════════════════════════════════════════ */
export default function EmplyPreview() {
  const [screen, setScreen]     = useState<Screen>("home");
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div style={{
      display: "flex", height: "594px", maxHeight: "594px",
      background: T.bg,
      fontFamily: "'Poppins', system-ui, -apple-system, sans-serif",
      overflow: "hidden",
      fontSize: "13px",
    }}>

      {/* ══ SIDEBAR — fiel a sidebar.tsx ══════════════════════ */}
      <aside style={{
        width: collapsed ? "52px" : "148px",
        flexShrink: 0,
        background: T.white,
        boxShadow: "2px 0 8px rgba(0,0,0,0.04)",
        display: "flex",
        flexDirection: "column",
        borderRight: `1px solid ${T.borderLight}`,
        transition: "width 0.25s cubic-bezier(0.4,0,0.2,1)",
      }}>

        {/* Header com Logo — fiel a logo.tsx */}
        <div style={{
          height: "52px", display: "flex", alignItems: "center",
          justifyContent: "center", padding: "0 10px", gap: "6px",
          borderBottom: `1px solid ${T.borderLight}`, flexShrink: 0,
          position: "relative",
        }}>
          <img
            src="/logo-emply.png"
            alt="Emply"
            style={{ height: collapsed ? "20px" : "24px", width: "auto", objectFit: "contain" }}
          />
          {!collapsed && (
            <button type="button" onClick={() => setCollapsed(c => !c)} style={{
              position: "absolute", right: "8px",
              width: "18px", height: "18px", display: "flex", alignItems: "center", justifyContent: "center",
              background: "none", border: "none", cursor: "pointer", color: T.textMuted, borderRadius: "4px",
            }}>
              <ChevronLeft size={11} />
            </button>
          )}
          {collapsed && (
            <button type="button" onClick={() => setCollapsed(c => !c)} style={{
              position: "absolute", right: "6px",
              width: "16px", height: "16px", display: "flex", alignItems: "center", justifyContent: "center",
              background: "none", border: "none", cursor: "pointer", color: T.textMuted, borderRadius: "4px",
            }}>
              <ChevronLeft size={10} style={{ transform: "rotate(180deg)" }} />
            </button>
          )}
        </div>

        {/* Nav Items — fiel a sidebar-item.tsx */}
        <nav style={{ flex: 1, padding: "8px 6px", display: "flex", flexDirection: "column", gap: "1px", overflowY: "auto" }}>
          {NAV_ITEMS.map(item => {
            const isActive = screen === item.key;
            return (
              <button key={item.key} type="button" onClick={() => setScreen(item.key)} style={{
                display: "flex", alignItems: "center", gap: "8px",
                padding: collapsed ? "8px" : "7px 10px",
                borderRadius: "7px",
                background: isActive ? T.primary : "transparent",
                border: "none", cursor: "pointer", width: "100%",
                justifyContent: collapsed ? "center" : "flex-start",
                color: isActive ? "#fff" : T.textMuted,
                fontFamily: "inherit", fontSize: "9px", fontWeight: isActive ? 600 : 400,
                transition: "background 0.15s, color 0.15s",
              }}>
                <span style={{ color: isActive ? "#fff" : T.textMuted, flexShrink: 0 }}>{item.icon}</span>
                {!collapsed && <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.label}</span>}
              </button>
            );
          })}

          {/* Separator + extra items */}
          <div style={{ borderTop: `1px solid ${T.borderLight}`, margin: "4px 0", paddingTop: "4px", display: "flex", flexDirection: "column", gap: "1px" }}>
            {NAV_EXTRA.map((item, i) => (
              <button key={i} type="button" style={{
                display: "flex", alignItems: "center", gap: "8px",
                padding: collapsed ? "7px" : "6px 10px",
                borderRadius: "7px", background: "transparent", border: "none", cursor: "pointer",
                width: "100%", justifyContent: collapsed ? "center" : "flex-start",
                color: T.textMuted, fontFamily: "inherit", fontSize: "9px",
              }}>
                <span style={{ color: T.textMuted, flexShrink: 0 }}>{item.icon}</span>
                {!collapsed && <span>{item.label}</span>}
              </button>
            ))}
          </div>
        </nav>

        {/* Footer Dica — fiel a sidebar.tsx */}
        {!collapsed && (
          <div style={{ padding: "8px", borderTop: `1px solid ${T.borderLight}`, flexShrink: 0 }}>
            <div style={{ background: T.primaryLight, borderRadius: "7px", padding: "8px" }}>
              <p style={{ fontSize: "8px", fontWeight: 600, color: T.primary, marginBottom: "2px" }}>💡 Dica</p>
              <p style={{ fontSize: "7px", color: T.textSec, lineHeight: 1.5 }}>Use atalhos para navegar mais rápido</p>
            </div>
          </div>
        )}
      </aside>

      {/* ══ MAIN AREA ══════════════════════════════════════════ */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>

        {/* Header */}
        <header style={{
          height: "52px", background: T.white, borderBottom: `1px solid ${T.borderLight}`,
          padding: "0 16px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ fontSize: "9px", color: T.textMuted }}>{MOCK.company.nomeFantasia}</span>
            <span style={{ fontSize: "9px", color: T.textDim }}>·</span>
            <span style={{ fontSize: "9px", color: T.textMuted }}>{MOCK.company.cnpj}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{ width: "26px", height: "26px", borderRadius: "50%", background: T.primaryLight, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Users size={12} color={T.primary} />
            </div>
            <div>
              <span style={{ fontSize: "9px", fontWeight: 600, color: T.heading, display: "block" }}>Admin Master</span>
              <span style={{ fontSize: "7px", color: T.textMuted }}>Gerente</span>
            </div>
          </div>
        </header>

        {/* Content */}
        <div style={{ flex: 1, overflowY: "auto", padding: "14px 16px", scrollbarWidth: "thin" }}>
          {screen === "home"       && <HomeScreen />}
          {screen === "dashboard"  && <DashboardScreen />}
          {screen === "pdv"        && <PDVScreen />}
          {screen === "cobrancas"  && <CobrancasScreen />}
          {screen === "financeiro" && <FinanceiroScreen />}
        </div>
      </div>
    </div>
  );
}
