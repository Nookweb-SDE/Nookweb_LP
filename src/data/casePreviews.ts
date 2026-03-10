/* ═══════════════════════════════════════════════
   CASE PREVIEWS DATA — 16 cases (2 por vertical)
   Usado pelo CasePreviewRenderer na CasesSection
═══════════════════════════════════════════════ */

export interface CasePalette {
  bg: string;
  accent: string;
  accentSoft: string;
  text: string;
  textMuted: string;
  card: string;
  border: string;
}

export interface HeroSection {
  type: "hero";
  title: string;
  subtitle: string;
  ctaText: string;
  bgGradient: string;
  metrics?: { value: string; label: string }[];
}

export interface MetricsSection {
  type: "metrics";
  items: { value: string; label: string; color?: string }[];
}

export interface FeaturesSection {
  type: "features";
  title: string;
  items: { icon: string; title: string; desc: string }[];
}

export interface CardsSection {
  type: "cards";
  title?: string;
  items: { title: string; price?: string; desc: string; badge?: string; gradient: string }[];
}

export interface ChartSection {
  type: "chart";
  title: string;
  chartType: "line" | "bar" | "ring";
  data: number[];
  labels?: string[];
}

export interface TestimonialSection {
  type: "testimonial";
  items: { quote: string; author: string; role: string; stars: number }[];
}

export interface TableSection {
  type: "table";
  title: string;
  headers: string[];
  rows: { cells: string[]; status?: string; statusColor?: string }[];
}

export interface KpiRow {
  type: "kpi";
  items: { label: string; value: string; change?: string; changeColor?: string }[];
}

export interface NavSection {
  type: "nav";
  logo: string;
  links: string[];
  ctaText?: string;
}

export interface AppStatusBar {
  type: "statusBar";
  time: string;
}

export interface AppTabBar {
  type: "tabBar";
  tabs: { icon: string; label: string; active?: boolean }[];
}

export interface AppMapSection {
  type: "appMap";
  pins: { x: number; y: number; label?: string; active?: boolean }[];
  userLocation?: { x: number; y: number };
}

export interface AppCardList {
  type: "appCards";
  title?: string;
  items: { title: string; subtitle: string; badge?: string; badgeColor?: string; value?: string }[];
}

export interface ChatSection {
  type: "chat";
  messages: { from: "user" | "ai"; text: string; time?: string }[];
}

export interface CodeBlock {
  type: "code";
  title: string;
  lines: { text: string; color?: string }[];
}

export interface WorkflowSection {
  type: "workflow";
  nodes: { label: string; color: string; icon: string }[];
}

export interface DeviceMockup {
  type: "deviceMockup";
  devices: { frame: "phone" | "tablet" | "desktop"; title: string; gradient: string; elements: string[] }[];
}

export interface ColorPalette {
  type: "colorPalette";
  colors: { name: string; hex: string }[];
}

export type CaseSection =
  | HeroSection | MetricsSection | FeaturesSection | CardsSection
  | ChartSection | TestimonialSection | TableSection | KpiRow
  | NavSection | AppStatusBar | AppTabBar | AppMapSection | AppCardList
  | ChatSection | CodeBlock | WorkflowSection | DeviceMockup | ColorPalette;

export interface CasePreviewData {
  id: string;
  clientName: string;
  clientTagline: string;
  template: "landing" | "app" | "dashboard" | "showcase";
  palette: CasePalette;
  sections: CaseSection[];
}

// Map: caseType → [variantA, variantB, ...]
export type CasePreviewMap = Record<string, CasePreviewData[]>;

export const CASE_PREVIEWS: CasePreviewMap = {

  /* ═══ 01. SITES DE ALTA CONVERSÃO — Case 1 Brillance + Foodie + Minimal (3 variants) ═══ */
  site: (() => {
    const case1Brillance: CasePreviewData = {
      id: "site-case1-brillance",
      clientName: "Monosphera",
      clientTagline: "Proteção inteligente para sua família",
      template: "landing",
      palette: { bg: "#F7F5F3", accent: "#37322F", accentSoft: "rgba(55,50,47,0.08)", text: "#37322F", textMuted: "#605A57", card: "#FFFFFF", border: "rgba(55,50,47,0.12)" },
      sections: [],
    };
    const foodie: CasePreviewData = {
      id: "site-foodie",
      clientName: "The Foodie Wagon",
      clientTagline: "Landing de alta conversão",
      template: "landing",
      palette: { bg: "#0a0a0f", accent: "#FBBF24", accentSoft: "rgba(251,191,36,0.15)", text: "#F5F5F0", textMuted: "#94a3b8", card: "#14141a", border: "rgba(251,191,36,0.12)" },
      sections: [
        { type: "nav", logo: "The Foodie Wagon", links: ["Speisekarte", "Standort", "Kontakt"], ctaText: "Bestellen" },
        { type: "hero", title: "THE FOODIE WAGON", subtitle: "Premium Halal Burger, knuspriges Fried Chicken und authentische Currywurst – direkt vom Foodtruck zu dir.", ctaText: "Speisekarte ansehen", bgGradient: "linear-gradient(135deg, #0a0a0f, #1a1a24)", metrics: [{ value: "11+", label: "BURGER" }, { value: "10+", label: "DIPS" }, { value: "100%", label: "HALAL" }] },
        { type: "metrics", items: [{ value: "Jeden Samstag", label: "Am Westpark 7, Ingolstadt" }, { value: "11:00 - 20:00", label: "Öffnungszeiten" }] },
        { type: "cards", title: "Unsere Burger", items: [{ title: "Cheesy Buffalo", price: "10,50€", desc: "Beef Patty 140g, Käse, Burger Sauce", badge: "★ 4.9", gradient: "linear-gradient(135deg, #78350f, #92400e)" }, { title: "Angry Bull", price: "12,00€", desc: "Beef Patty, Chili Cheese, Jalapeno", badge: "★ 4.8", gradient: "linear-gradient(135deg, #92400e, #b45309)" }, { title: "Crunchy Chicken", price: "8,50€", desc: "Chicken Strips, Käse, Salat", badge: "★ 4.9", gradient: "linear-gradient(135deg, #854d0e, #a16207)" }] },
        { type: "testimonial", items: [{ quote: "Die besten Halal Burger in Ingolstadt!", author: "Stammkunde", role: "Google Review", stars: 5 }] },
      ],
    };
    const minimal: CasePreviewData = {
      id: "site-minimal-hero",
      clientName: "Marketplace de Arte",
      clientTagline: "Hero de alta conversão — marketplaces",
      template: "landing",
      palette: { bg: "#050506", accent: "#6366f1", accentSoft: "rgba(99,102,241,0.15)", text: "#fafafa", textMuted: "#a1a1aa", card: "#18181b", border: "rgba(255,255,255,0.08)" },
      sections: [],
    };
    const nooklead: CasePreviewData = {
      id: "site-nooklead",
      clientName: "Nooklead",
      clientTagline: "Plataforma de prospecção B2B com IA",
      template: "landing",
      palette: { bg: "#060B14", accent: "#00C37F", accentSoft: "rgba(0,195,127,0.12)", text: "#F0F4FF", textMuted: "#8892A4", card: "#0D1526", border: "rgba(255,255,255,0.07)" },
      sections: [],
    };
    const latem: CasePreviewData = {
      id: "site-latem",
      clientName: "Lá tem",
      clientTagline: "Atacadista de Materiais de Construção",
      template: "landing",
      palette: { bg: "#ffffff", accent: "#e53e3e", accentSoft: "rgba(229,62,62,0.1)", text: "#1a202c", textMuted: "#718096", card: "#f7fafc", border: "rgba(0,0,0,0.08)" },
      sections: [],
    };
    const contpix: CasePreviewData = {
      id: "site-contpix",
      clientName: "ContPix",
      clientTagline: "Contabilidade digital e gestão financeira",
      template: "landing",
      palette: { bg: "#0a0a0a", accent: "#6366f1", accentSoft: "rgba(99,102,241,0.12)", text: "#ffffff", textMuted: "#9ca3af", card: "#111111", border: "rgba(255,255,255,0.08)" },
      sections: [],
    };
    const grupowr2: CasePreviewData = {
      id: "site-grupowr2",
      clientName: "Grupo WR2 Serviços",
      clientTagline: "Serviços especializados de alta performance",
      template: "landing",
      palette: { bg: "#0a0a0a", accent: "#f59e0b", accentSoft: "rgba(245,158,11,0.12)", text: "#ffffff", textMuted: "#9ca3af", card: "#111111", border: "rgba(255,255,255,0.08)" },
      sections: [],
    };
    return [contpix, foodie, minimal, latem, nooklead, case1Brillance, grupowr2];
  })(),

  /* ═══ 02. APLICATIVOS MOBILE ═══ */
  app: [
    {
      id: "app-sportconnect",
      clientName: "AppConnect Pro",
      clientTagline: "App mobile — comunidades, eventos e estatísticas",
      template: "app",
      palette: { bg: "#ffffff", accent: "#2563EB", accentSoft: "rgba(37,99,235,0.15)", text: "#1e3a8a", textMuted: "#64748b", card: "#f8fafc", border: "rgba(37,99,235,0.2)" },
      sections: [],
    },
    {
      id: "app-fitconnect",
      clientName: "ConnectApp",
      clientTagline: "App social — 50k usuários em 4 semanas",
      template: "app",
      palette: { bg: "#0f172a", accent: "#EAB308", accentSoft: "rgba(234,179,8,0.15)", text: "#FFFFFF", textMuted: "#94a3b8", card: "#1e293b", border: "rgba(234,179,8,0.2)" },
      sections: [],
    },
    {
      id: "app-revivaz",
      clientName: "Revivaz",
      clientTagline: "Saúde mental solidária",
      template: "app",
      palette: { bg: "#F8FAFC", accent: "#0D9488", accentSoft: "rgba(13,148,136,0.12)", text: "#0F172A", textMuted: "#64748B", card: "#FFFFFF", border: "#E2E8F0" },
      sections: [],
    },
  ],

  /* ═══ 03. PLATAFORMAS SAAS — Multi-vertical ═══ */
  saas: [
    {
      id: "saas-nooklead-crm",
      clientName: "Nooklead CRM",
      clientTagline: "Plataforma SaaS de geração e gestão de leads",
      template: "dashboard",
      palette: { bg: "#F8FAFC", accent: "#2563EB", accentSoft: "rgba(37,99,235,0.08)", text: "#0F172A", textMuted: "#64748B", card: "#FFFFFF", border: "#E2E8F0" },
      sections: [],
    },
    {
      id: "saas-onlycaes",
      clientName: "OnlyCaes",
      clientTagline: "Plataforma SaaS — version-test",
      template: "dashboard",
      palette: { bg: "#F8FAFC", accent: "#6366f1", accentSoft: "rgba(99,102,241,0.12)", text: "#0F172A", textMuted: "#64748B", card: "#FFFFFF", border: "#E2E8F0" },
      sections: [],
    },
    {
      id: "saas-b",
      clientName: "MetricFlow",
      clientTagline: "Analytics white-label",
      template: "dashboard",
      palette: { bg: "#0F172A", accent: "#06B6D4", accentSoft: "rgba(6,182,212,0.1)", text: "#FFFFFF", textMuted: "#94A3B8", card: "#1E293B", border: "rgba(255,255,255,0.06)" },
      sections: [
        { type: "nav", logo: "MetricFlow", links: ["Dashboard", "Tenants", "Billing"] },
        { type: "kpi", items: [{ label: "MRR", value: "$124.8k", change: "+12.4%", changeColor: "#06B6D4" }, { label: "Usuários", value: "12,384", change: "+8.2%", changeColor: "#10B981" }, { label: "Churn", value: "1.2%", change: "▼0.3%", changeColor: "#10B981" }, { label: "NPS", value: "72", change: "+5pts", changeColor: "#06B6D4" }] },
        { type: "chart", title: "Crescimento de Usuários", chartType: "line", data: [4200, 5100, 6300, 7800, 8900, 9600, 11200, 12384], labels: ["Wk1", "Wk2", "Wk3", "Wk4", "Wk5", "Wk6", "Wk7", "Wk8"] },
        { type: "table", title: "Tenants Ativos", headers: ["Tenant", "Plano", "MRR"], rows: [{ cells: ["Acme Corp", "Enterprise", "$12.4k"], status: "Enterprise", statusColor: "#8B5CF6" }, { cells: ["TechFlow", "Pro", "$4.2k"], status: "Pro", statusColor: "#06B6D4" }, { cells: ["NovaLabs", "Starter", "$890"], status: "Starter", statusColor: "#64748B" }, { cells: ["DataPrime", "Pro", "$6.1k"], status: "Pro", statusColor: "#06B6D4" }] },
      ],
    },
  ],

  /* ═══ 04. BAAS & INFRAESTRUTURA ═══ */
  baas: [
    {
      id: "baas-emply",
      clientName: "Emply",
      clientTagline: "Plataforma fintech PIX — gestão de cobranças e PDV",
      template: "dashboard",
      palette: { bg: "#F8F9FA", accent: "#09AA29", accentSoft: "#E8F8EC", text: "#1F2937", textMuted: "#6B7280", card: "#FFFFFF", border: "#CBD5E1" },
      sections: [],
    },
    {
      id: "baas-a",
      clientName: "PayGuard",
      clientTagline: "Infra bancária completa",
      template: "dashboard",
      palette: { bg: "#0D1117", accent: "#10B981", accentSoft: "rgba(16,185,129,0.1)", text: "#FFFFFF", textMuted: "#8B949E", card: "#161B22", border: "rgba(255,255,255,0.06)" },
      sections: [
        { type: "nav", logo: "PayGuard", links: ["Dashboard", "Transações", "KYC", "Compliance"] },
        { type: "kpi", items: [{ label: "Uptime", value: "99.97%", changeColor: "#10B981" }, { label: "Transações/dia", value: "48.2k", change: "+12%", changeColor: "#10B981" }, { label: "KYC Aprovados", value: "94.8%" }, { label: "Latência P99", value: "187ms" }] },
        { type: "table", title: "Transações PIX — Tempo Real", headers: ["ID", "De → Para", "Valor", "Status"], rows: [{ cells: ["TX-8F3A", "João → Maria", "R$2.450", "✓ Concluído"], status: "✓", statusColor: "#10B981" }, { cells: ["TX-9C4D", "Empresa X → Pedro", "R$18.900", "⏳ Processando"], status: "⏳", statusColor: "#F59E0B" }, { cells: ["TX-7B2E", "Ana → Carlos", "R$890", "✓ Concluído"], status: "✓", statusColor: "#10B981" }, { cells: ["TX-5A1F", "Lucas → Bia", "R$3.200", "✓ Concluído"], status: "✓", statusColor: "#10B981" }] },
        { type: "code", title: "KYC Pipeline — Auto-aprovado", lines: [{ text: "✓ Documentos recebidos (CPF + RG)", color: "#10B981" }, { text: "✓ Validação facial — match 99.2%", color: "#10B981" }, { text: "✓ Consulta bureau — Score 847", color: "#10B981" }, { text: "✓ Aprovação automática — 8.7s", color: "#10B981" }] },
      ],
    },
    {
      id: "baas-b",
      clientName: "VaultAPI",
      clientTagline: "API monitoring & SLA",
      template: "dashboard",
      palette: { bg: "#0A0E14", accent: "#F59E0B", accentSoft: "rgba(245,158,11,0.1)", text: "#FFFFFF", textMuted: "#6B7280", card: "#131920", border: "rgba(255,255,255,0.05)" },
      sections: [
        { type: "nav", logo: "> VaultAPI", links: ["monitoring", "webhooks", "sla"] },
        { type: "kpi", items: [{ label: "Uptime", value: "99.9%", changeColor: "#22C55E" }, { label: "P99 Latency", value: "187ms" }, { label: "Error Rate", value: "0.03%" }, { label: "Regions", value: "3" }] },
        { type: "chart", title: "Response Time (P50/P95/P99)", chartType: "line", data: [45, 52, 48, 55, 42, 50, 47, 53], labels: ["00h", "03h", "06h", "09h", "12h", "15h", "18h", "21h"] },
        { type: "code", title: "Webhook Stream — LIVE", lines: [{ text: "[14:32:18] POST /webhook ✓ 200 23ms", color: "#22C55E" }, { text: "[14:32:15] POST /webhook ✓ 200 18ms", color: "#22C55E" }, { text: "[14:32:12] POST /webhook ✗ 500 retry", color: "#EF4444" }, { text: "[14:32:08] POST /webhook ✓ 200 12ms", color: "#22C55E" }, { text: "[14:31:55] POST /webhook ✓ 200 8ms", color: "#22C55E" }] },
        { type: "metrics", items: [{ value: "AWS", label: "Lambda" }, { value: "RDS", label: "Database" }, { value: "CF", label: "CDN" }, { value: "S3", label: "Storage" }] },
      ],
    },
  ],

  /* ═══ 05. AUTOMACOES N8N ═══ */
  n8n: [
    {
      id: "n8n-a",
      clientName: "FlowSync",
      clientTagline: "Workflow automation",
      template: "dashboard",
      palette: { bg: "#FAFBFC", accent: "#7C3AED", accentSoft: "rgba(124,58,237,0.08)", text: "#111827", textMuted: "#6B7280", card: "#FFFFFF", border: "#E5E7EB" },
      sections: [
        { type: "nav", logo: "⚡ FlowSync", links: ["Workflows", "Execuções", "Integrações"] },
        { type: "kpi", items: [{ label: "Workflows", value: "12", changeColor: "#7C3AED" }, { label: "Execuções/mês", value: "28.4k", change: "+22%", changeColor: "#14B8A6" }, { label: "Sucesso", value: "98.7%", changeColor: "#10B981" }, { label: "Economia", value: "−80%" }] },
        { type: "workflow", nodes: [{ label: "HubSpot CRM", color: "#FF7A59", icon: "👥" }, { label: "Filtrar", color: "#7C3AED", icon: "⚙️" }, { label: "Google Sheets", color: "#0F9D58", icon: "📊" }, { label: "Gmail", color: "#EA4335", icon: "✉️" }, { label: "Slack", color: "#4A154B", icon: "💬" }] },
        { type: "table", title: "Últimas Execuções", headers: ["Workflow", "Duração", "Status"], rows: [{ cells: ["CRM → Sheets → Email", "1.2s", "✓ Sucesso"], status: "✓", statusColor: "#10B981" }, { cells: ["Onboarding Auto", "3.4s", "✓ Sucesso"], status: "✓", statusColor: "#10B981" }, { cells: ["Relatório Semanal", "8.1s", "✓ Sucesso"], status: "✓", statusColor: "#10B981" }, { cells: ["Follow-up D+3", "1.8s", "↻ Retry"], status: "↻", statusColor: "#F59E0B" }] },
      ],
    },
    {
      id: "n8n-b",
      clientName: "AutoPilot",
      clientTagline: "Time savings analytics",
      template: "dashboard",
      palette: { bg: "#F8FAFC", accent: "#F97316", accentSoft: "rgba(249,115,22,0.08)", text: "#111827", textMuted: "#6B7280", card: "#FFFFFF", border: "#E5E7EB" },
      sections: [
        { type: "nav", logo: "🤖 AutoPilot", links: ["Dashboard", "Economia", "Relatórios"] },
        { type: "hero", title: "847 horas economizadas este mês", subtitle: "Equivalente a R$127.050 em produtividade recuperada.", ctaText: "", bgGradient: "linear-gradient(135deg, #FFF7ED, #FFEDD5)" },
        { type: "kpi", items: [{ label: "Workflows", value: "12" }, { label: "Execuções", value: "28.4k", change: "+22%", changeColor: "#F97316" }, { label: "Horas salvas", value: "847h", changeColor: "#F97316" }, { label: "Sucesso", value: "98.7%" }] },
        { type: "chart", title: "Execuções por Semana", chartType: "bar", data: [1800, 2100, 2400, 2200, 2600, 2800, 3100, 2900, 3200, 3400, 3100, 3600], labels: ["S1", "S2", "S3", "S4", "S5", "S6", "S7", "S8", "S9", "S10", "S11", "S12"] },
        { type: "metrics", items: [{ value: "HubSpot", label: "12.4k eventos" }, { value: "Sheets", label: "8.7k linhas" }, { value: "Gmail", label: "4.2k emails" }, { value: "Slack", label: "2.1k msgs" }] },
      ],
    },
  ],

  /* ═══ 06. UI/UX DESIGN ═══ */
  design: [
    {
      id: "design-a",
      clientName: "HealthApp",
      clientTagline: "Design system — app com telemedicina",
      template: "showcase",
      palette: { bg: "#FAFAFA", accent: "#0D9488", accentSoft: "rgba(13,148,136,0.08)", text: "#1E293B", textMuted: "#64748B", card: "#FFFFFF", border: "#E2E8F0" },
      sections: [
        { type: "hero", title: "HealthBridge", subtitle: "App de saúde com agendamento inteligente, prontuário digital e telemedicina.", ctaText: "", bgGradient: "linear-gradient(135deg, #F0FDFA, #CCFBF1)" },
        { type: "metrics", items: [{ value: "3×", label: "Engajamento" }, { value: "14", label: "Telas" }, { value: "4wk", label: "Sprint" }] },
        { type: "deviceMockup", devices: [{ frame: "phone", title: "Onboarding", gradient: "linear-gradient(135deg, #0D9488, #14B8A6)", elements: ["Sua saúde em suas mãos", "● ○ ○", "Começar →"] }, { frame: "phone", title: "Dashboard", gradient: "linear-gradient(135deg, #F0FDFA, #FFFFFF)", elements: ["Olá, Maria 👋", "Dr. Santos · 14:00", "BPM 72 · Passos 6.2k"] }, { frame: "phone", title: "Teleconsulta", gradient: "linear-gradient(135deg, #0D9488, #065F53)", elements: ["📹 Teleconsulta", "Dr. Santos", "🎤  📹  📞"] }] },
        { type: "colorPalette", colors: [{ name: "Primary", hex: "#0D9488" }, { name: "Secondary", hex: "#F97066" }, { name: "Success", hex: "#22C55E" }, { name: "Background", hex: "#FAFAFA" }] },
      ],
    },
    {
      id: "design-b",
      clientName: "EduFlow",
      clientTagline: "UI/UX — plataforma de aprendizado",
      template: "showcase",
      palette: { bg: "#FFFFFF", accent: "#EAB308", accentSoft: "rgba(234,179,8,0.1)", text: "#1E293B", textMuted: "#64748B", card: "#F8FAFC", border: "#E2E8F0" },
      sections: [
        { type: "hero", title: "EduFlow", subtitle: "Plataforma de aprendizado com experiência personalizada e gamificação.", ctaText: "", bgGradient: "linear-gradient(135deg, #1E293B, #334155)" },
        { type: "metrics", items: [{ value: "3×", label: "Engajamento" }, { value: "89%", label: "Conclusão" }, { value: "18", label: "Telas" }] },
        { type: "deviceMockup", devices: [{ frame: "phone", title: "Onboarding", gradient: "linear-gradient(135deg, #EAB308, #CA8A04)", elements: ["Qual seu objetivo?", "Development", "Design", "Marketing"] }, { frame: "tablet", title: "Dashboard", gradient: "linear-gradient(135deg, #F8FAFC, #FFFFFF)", elements: ["Continue aprendendo", "UX Design · 60%", "🔥 12 dias de streak"] }, { frame: "desktop", title: "Aula", gradient: "linear-gradient(135deg, #1E293B, #334155)", elements: ["▶ Vídeo da aula", "Fundamentos de Design", "Próxima aula →"] }] },
        { type: "colorPalette", colors: [{ name: "Primary", hex: "#EAB308" }, { name: "Navy", hex: "#1E293B" }, { name: "White", hex: "#FFFFFF" }, { name: "Gray", hex: "#F8FAFC" }] },
      ],
    },
  ],

  /* ═══ 07. LOW-CODE ═══ */
  lowcode: [
    {
      id: "lowcode-a",
      clientName: "QuickMarket",
      clientTagline: "Marketplace MVP",
      template: "dashboard",
      palette: { bg: "#FFFFFF", accent: "#059669", accentSoft: "rgba(5,150,105,0.08)", text: "#111827", textMuted: "#6B7280", card: "#FFFFFF", border: "#E5E7EB" },
      sections: [
        { type: "nav", logo: "quickmarket", links: ["Produtos", "Categorias", "Ofertas"], ctaText: "Vender" },
        { type: "cards", title: "Mais vendidos", items: [{ title: "Fone Bluetooth Pro X", price: "R$189", desc: "★ 4.8 · 847 vendas", gradient: "linear-gradient(135deg, #DBEAFE, #BFDBFE)" }, { title: "Mouse Ergonômico", price: "R$129", desc: "★ 4.6 · 523 vendas", gradient: "linear-gradient(135deg, #FEE2E2, #FECACA)" }, { title: "Hub USB-C 7 portas", price: "R$89", desc: "★ 4.9 · 1.2k vendas", gradient: "linear-gradient(135deg, #D1FAE5, #A7F3D0)" }, { title: "Webcam 4K Ultra", price: "R$349", desc: "★ 4.7 · 312 vendas", gradient: "linear-gradient(135deg, #FEF3C7, #FDE68A)" }] },
        { type: "metrics", items: [{ value: "🔒", label: "Pagamento seguro" }, { value: "🚚", label: "Frete rastreável" }, { value: "↩️", label: "Devolução grátis" }] },
      ],
    },
    {
      id: "lowcode-b",
      clientName: "ValidaKit",
      clientTagline: "Validação de produto",
      template: "dashboard",
      palette: { bg: "#FAFBFF", accent: "#7C3AED", accentSoft: "rgba(124,58,237,0.08)", text: "#111827", textMuted: "#6B7280", card: "#FFFFFF", border: "#E5E7EB" },
      sections: [
        { type: "nav", logo: "ValidaKit ✓", links: ["Dashboard", "Pesquisas", "Insights"] },
        { type: "kpi", items: [{ label: "Respostas", value: "847", change: "+23%", changeColor: "#7C3AED" }, { label: "NPS", value: "72", changeColor: "#14B8A6" }, { label: "Conclusão", value: "89%", changeColor: "#10B981" }, { label: "Tempo médio", value: "2m34s" }] },
        { type: "chart", title: "Product-Market Fit", chartType: "ring", data: [78], labels: ["PMF Score"] },
        { type: "features", title: "Insights Automáticos", items: [{ icon: "✅", title: "PMF confirmado", desc: "78% seriam 'muito desapontados' sem o produto." }, { icon: "📊", title: "Feature mais pedida", desc: "Integração com Slack — mencionada 23×." }, { icon: "⚠️", title: "Segmento fraco", desc: "Freelancers: NPS 45, abaixo da média geral." }] },
      ],
    },
  ],

  /* ═══ 08. IA INTEGRADA ═══ */
  ai: [
    {
      id: "ai-a",
      clientName: "SmartDesk",
      clientTagline: "Atendimento com IA",
      template: "dashboard",
      palette: { bg: "#111827", accent: "#8B5CF6", accentSoft: "rgba(139,92,246,0.12)", text: "#FFFFFF", textMuted: "#9CA3AF", card: "#1F2937", border: "rgba(255,255,255,0.06)" },
      sections: [
        { type: "nav", logo: "SmartDesk", links: ["Tickets", "IA Chat", "CRM"] },
        { type: "kpi", items: [{ label: "Tickets/dia", value: "247" }, { label: "IA resolveu", value: "73%", changeColor: "#8B5CF6" }, { label: "Tempo médio", value: "1.8s", changeColor: "#10B981" }, { label: "Satisfação", value: "4.8★" }] },
        { type: "chat", messages: [{ from: "user", text: "Qual o prazo de entrega do meu pedido?", time: "14:30" }, { from: "ai", text: "Seu pedido #4821 está em transporte. Previsão: amanhã até 18h. Posso ajudar com mais algo?", time: "14:30" }, { from: "user", text: "Posso trocar o endereço?", time: "14:31" }, { from: "ai", text: "Claro! Seu endereço atual é Rua Augusta, 1200 - SP. Qual seria o novo endereço? 📍", time: "14:31" }] },
        { type: "metrics", items: [{ value: "−70%", label: "Tickets manuais" }, { value: "24/7", label: "Disponível" }, { value: "1.8s", label: "Resposta IA" }] },
      ],
    },
    {
      id: "ai-b",
      clientName: "InsightAI",
      clientTagline: "Inteligência preditiva",
      template: "dashboard",
      palette: { bg: "#0F172A", accent: "#10B981", accentSoft: "rgba(16,185,129,0.1)", text: "#FFFFFF", textMuted: "#94A3B8", card: "#1E293B", border: "rgba(255,255,255,0.06)" },
      sections: [
        { type: "nav", logo: "InsightAI", links: ["Dashboard", "Previsões", "Relatórios"] },
        { type: "kpi", items: [{ label: "Leads processados", value: "247", change: "+18%", changeColor: "#10B981" }, { label: "Conversão", value: "34%", changeColor: "#F59E0B" }, { label: "Ticket médio", value: "R$2.8k", change: "+12%", changeColor: "#10B981" }, { label: "Precisão", value: "92.4%" }] },
        { type: "code", title: "Relatório Semanal — Gerado por IA", lines: [{ text: "→ 247 leads processados (+18% vs anterior)", color: "#10B981" }, { text: "→ Taxa conversão: 34% (meta: 30% ✓)", color: "#10B981" }, { text: "→ Ticket médio: R$2.840 (+12%)", color: "#10B981" }, { text: "⚠ Onboarding D+3: queda 22% engajamento", color: "#F59E0B" }, { text: "⚠ Follow-up pós-demo: 38% sem resposta", color: "#F59E0B" }, { text: "1. Ativar follow-up D+2 (+15% conversão)", color: "#FFFFFF" }, { text: "2. A/B test onboarding: simplificar etapa 3", color: "#FFFFFF" }] },
        { type: "chart", title: "Previsão de Leads — 7 dias", chartType: "line", data: [32, 38, 42, 35, 45, 48, 52], labels: ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"] },
      ],
    },
  ],
};
