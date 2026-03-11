import React, { useState } from 'react';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Smartphone,
  DollarSign,
  Settings,
  FileText,
  Menu as MenuIcon,
  HelpCircle,
  MessageSquare,
  BookOpen,
  Flame,
  MousePointer,
  Video,
  TrendingUp,
  Activity,
  CreditCard,
  Gift,
  Globe,
  Shield,
  Mail,
  Plug,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  LogOut,
  ExternalLink,
  Bell,
  Search
} from 'lucide-react';

// ========== SUPER ADMIN PAGES ==========
import DashboardPage from './pages/DashboardPage';
import UsersPage from './pages/UsersPage';
import UserDetailPage from './pages/UserDetailPage';
import DevicesPage from './pages/DevicesPage';
import PlansPage from './pages/PlansPage';
import PlanEditPage from './pages/PlanEditPage';
import FeaturesPage from './pages/FeaturesPage';
import MenuManagerPage from './pages/MenuManagerPage';
import PagesPage from './pages/PagesPage';
import FaqPage from './pages/FaqPage';
import TestimonialsPage from './pages/TestimonialsPage';
import BlogPage from './pages/BlogPage';
import HeatmapPage from './pages/HeatmapPage';
import SessionRecordingsPage from './pages/SessionRecordingsPage';
import FunnelPage from './pages/FunnelPage';
import ActiveUsersPage from './pages/ActiveUsersPage';
import BillingPage from './pages/BillingPage';
import TrialPage from './pages/TrialPage';
import LanguagesPage from './pages/LanguagesPage';
import SettingsPage from './pages/SettingsPage';
import VersionHistoryPage from './pages/VersionHistoryPage';

// ========== NAV ITEMS ==========
interface NavItemConfig {
  id: string;
  label: string;
  icon: React.ReactNode;
  path: string;
  children?: NavItemConfig[];
}

const navSections: { title: string; items: NavItemConfig[] }[] = [
  { title: '', items: [{ id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={18} />, path: '/superadmin-preview' }] },
  {
    title: 'GESTÃO',
    items: [
      { id: 'users', label: 'Usuários', icon: <Users size={18} />, path: '/superadmin-preview/users' },
      { id: 'devices', label: 'Dispositivos', icon: <Smartphone size={18} />, path: '/superadmin-preview/devices' },
      { id: 'plans', label: 'Planos & Preços', icon: <DollarSign size={18} />, path: '/superadmin-preview/plans' },
      { id: 'features', label: 'Funcionalidades', icon: <Settings size={18} />, path: '/superadmin-preview/features' },
    ]
  },
  {
    title: 'CONTEÚDO DO SITE',
    items: [
      { id: 'menus', label: 'Menus', icon: <MenuIcon size={18} />, path: '/superadmin-preview/menus' },
      { id: 'pages', label: 'Páginas', icon: <FileText size={18} />, path: '/superadmin-preview/pages' },
      { id: 'faqs', label: 'FAQs', icon: <HelpCircle size={18} />, path: '/superadmin-preview/faqs' },
      { id: 'testimonials', label: 'Depoimentos', icon: <MessageSquare size={18} />, path: '/superadmin-preview/testimonials' },
      { id: 'blog', label: 'Blog', icon: <BookOpen size={18} />, path: '/superadmin-preview/blog' },
    ]
  },
  {
    title: 'ANALYTICS',
    items: [
      { id: 'heatmap', label: 'Mapa de Calor', icon: <Flame size={18} />, path: '/superadmin-preview/heatmap' },
      { id: 'recordings', label: 'Session Recordings', icon: <Video size={18} />, path: '/superadmin-preview/recordings' },
      { id: 'funnel', label: 'Funil de Conversão', icon: <TrendingUp size={18} />, path: '/superadmin-preview/funnel' },
      { id: 'active-users', label: 'Usuários Ativos', icon: <Activity size={18} />, path: '/superadmin-preview/active-users' },
    ]
  },
  {
    title: 'FINANCEIRO',
    items: [
      { id: 'billing', label: 'Faturamento', icon: <CreditCard size={18} />, path: '/superadmin-preview/billing' },
      { id: 'trial', label: 'Trial', icon: <Gift size={18} />, path: '/superadmin-preview/trial' },
    ]
  },
  {
    title: 'SISTEMA',
    items: [
      { id: 'languages', label: 'Idiomas', icon: <Globe size={18} />, path: '/superadmin-preview/languages' },
      { id: 'settings', label: 'Configurações', icon: <Shield size={18} />, path: '/superadmin-preview/settings' },
      { id: 'history', label: 'Histórico', icon: <FileText size={18} />, path: '/superadmin-preview/history' },
    ]
  },
];

// ========== SUPER ADMIN APP ==========
const SuperAdminApp: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  const location = useLocation();
  const navigate = useNavigate();

  const toggleSection = (title: string) => {
    setExpandedSections(prev => ({ ...prev, [title]: !prev[title] }));
  };

  const isActive = (path: string) => {
    if (path === '/superadmin-preview') return location.pathname === '/superadmin-preview';
    return location.pathname.startsWith(path);
  };

  return (
    <div className="h-screen w-screen bg-bg-primary text-text-primary flex overflow-hidden">
      {/* ===== SIDEBAR ===== */}
      <aside className={`relative flex flex-col h-full transition-all duration-300 shrink-0 ${sidebarCollapsed ? 'w-16' : 'w-56 md:w-72'} bg-bg-secondary border-r border-border-color/30`}>
        {/* Logo */}
        <div className={`flex items-center h-16 border-b border-border-color/20 ${sidebarCollapsed ? 'justify-center px-2' : 'px-5'}`}>
          {sidebarCollapsed ? (
            <span
              className="text-sm font-display font-light tracking-[0.12em] select-none"
              style={{
                background: 'linear-gradient(90deg, #00ff88 0%, #00d4ff 55%, #00a3cc 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >M</span>
          ) : (
            <div>
              <h1
                className="text-sm font-display font-light tracking-[0.12em] select-none"
                style={{
                  background: 'linear-gradient(90deg, #00ff88 0%, #00d4ff 55%, #00a3cc 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >MONOSPHERA</h1>
              <p className="text-[9px] font-mono text-text-secondary/50 tracking-wider">SUPER ADMIN</p>
            </div>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-1 scrollbar-thin">
          {navSections.map((section, si) => (
            <div key={si}>
              {section.title && !sidebarCollapsed && (
                <div className="pt-4 pb-1.5 px-3">
                  <h3 className="text-[9px] font-bold uppercase tracking-[0.2em] font-tactical text-text-secondary/40">
                    {section.title}
                  </h3>
                </div>
              )}
              {section.title && sidebarCollapsed && (
                <div className="my-2 mx-1">
                  <div className="h-px bg-gradient-to-r from-transparent via-border-color/20 to-transparent" />
                </div>
              )}
              {section.items.map(item => (
                <button
                  key={item.id}
                  onClick={() => navigate(item.path)}
                  title={sidebarCollapsed ? item.label : undefined}
                  className={`
                    w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 group
                    ${isActive(item.path)
                      ? 'bg-accent-blue/10 text-accent-blue font-bold border border-accent-blue/20'
                      : 'text-text-secondary/70 hover:bg-bg-tertiary/40 hover:text-text-primary border border-transparent'
                    }
                    ${sidebarCollapsed ? 'justify-center' : ''}
                  `}
                >
                  <div className={`flex-shrink-0 ${isActive(item.path) ? 'text-accent-blue drop-shadow-[0_0_6px_rgba(0,212,255,0.4)]' : ''}`}>
                    {item.icon}
                  </div>
                  {!sidebarCollapsed && (
                    <span className="text-[11px] font-tactical tracking-wide truncate">{item.label}</span>
                  )}
                </button>
              ))}
            </div>
          ))}
        </nav>

        {/* Bottom: Back to site */}
        <div className={`border-t border-border-color/20 p-3 ${sidebarCollapsed ? 'px-2' : ''}`}>
          <Link
            to="/"
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-text-secondary/60 hover:text-accent-blue hover:bg-bg-tertiary/40 transition-all ${sidebarCollapsed ? 'justify-center' : ''}`}
          >
            <ExternalLink size={16} />
            {!sidebarCollapsed && <span className="text-[11px] font-tactical tracking-wide">Voltar ao Site</span>}
          </Link>
        </div>

        {/* Collapse toggle */}
        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="absolute -right-3 top-1/2 -translate-y-1/2 z-30 w-6 h-12 rounded-r-md bg-bg-secondary border border-l-0 border-border-color/30 flex items-center justify-center hover:bg-bg-tertiary hover:border-accent-blue/30 transition-all"
        >
          {sidebarCollapsed ? (
            <ChevronRight size={14} className="text-accent-blue/60" />
          ) : (
            <ChevronLeft size={14} className="text-accent-blue/60" />
          )}
        </button>
      </aside>

      {/* ===== MAIN CONTENT ===== */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-bg-secondary/50 backdrop-blur-sm border-b border-border-color/20 flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <div className="relative" title="Busca global em breve">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary/40" />
              <input
                type="text"
                placeholder="Buscar..."
                disabled
                className="bg-bg-tertiary/30 border border-border-color/20 rounded-lg pl-10 pr-4 py-2 text-xs text-text-secondary/50 placeholder-text-secondary/30 w-48 md:w-72 font-mono cursor-not-allowed"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-text-secondary/60 hover:text-accent-blue transition-colors" title="Notificacoes (em breve)" disabled>
              <Bell size={18} />
            </button>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-accent-blue/20 flex items-center justify-center">
                <span className="text-xs font-tactical font-bold text-accent-blue">SA</span>
              </div>
              {!sidebarCollapsed && (
                <div>
                  <p className="text-xs font-tactical font-bold text-text-primary">Super Admin</p>
                  <p className="text-[9px] font-mono text-text-secondary/50">admin@monosphera.com</p>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto bg-bg-primary p-6">
          <Routes>
            <Route index element={<DashboardPage />} />
            <Route path="users" element={<UsersPage />} />
            <Route path="users/:id" element={<UserDetailPage />} />
            <Route path="devices" element={<DevicesPage />} />
            <Route path="plans" element={<PlansPage />} />
            <Route path="plans/:id" element={<PlanEditPage />} />
            <Route path="features" element={<FeaturesPage />} />
            <Route path="menus" element={<MenuManagerPage />} />
            <Route path="pages" element={<PagesPage />} />
            <Route path="faqs" element={<FaqPage />} />
            <Route path="testimonials" element={<TestimonialsPage />} />
            <Route path="blog" element={<BlogPage />} />
            <Route path="heatmap" element={<HeatmapPage />} />
            <Route path="recordings" element={<SessionRecordingsPage />} />
            <Route path="funnel" element={<FunnelPage />} />
            <Route path="active-users" element={<ActiveUsersPage />} />
            <Route path="billing" element={<BillingPage />} />
            <Route path="trial" element={<TrialPage />} />
            <Route path="languages" element={<LanguagesPage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="history" element={<VersionHistoryPage />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default SuperAdminApp;
