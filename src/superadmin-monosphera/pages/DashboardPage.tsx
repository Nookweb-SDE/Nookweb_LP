import React, { useState, useEffect } from 'react';
import { Smartphone, AlertTriangle, Globe, Activity, ArrowUpRight, ArrowDownRight, Loader } from 'lucide-react';

// ========== MOCK DATA — só front, sem backend ==========
const MOCK_STATS = { devices: 12, online: 8, alerts: 3, countries: 5 };
const MOCK_TOP_COUNTRIES = [
  { pais: 'Brasil', pct: 45, users: 1240 },
  { pais: 'EUA', pct: 25, users: 689 },
  { pais: 'Portugal', pct: 12, users: 331 },
  { pais: 'México', pct: 10, users: 276 },
  { pais: 'Argentina', pct: 8, users: 221 },
];
const MOCK_RECENT_ACTIONS = [
  { id: '1', entity_type: 'plan', entity_id: 'Pro', changed_at: new Date(Date.now() - 5 * 60000).toISOString(), changed_by: 'admin@monosphera.com', snapshot: null },
  { id: '2', entity_type: 'faq', entity_id: 'faq-12', changed_at: new Date(Date.now() - 32 * 60000).toISOString(), changed_by: 'Sistema', snapshot: null },
  { id: '3', entity_type: 'settings', entity_id: 'theme', changed_at: new Date(Date.now() - 2 * 3600000).toISOString(), changed_by: 'admin@monosphera.com', snapshot: null },
  { id: '4', entity_type: 'plan', entity_id: 'Básico', changed_at: new Date(Date.now() - 5 * 3600000).toISOString(), changed_by: 'suporte', snapshot: null },
  { id: '5', entity_type: 'faq', entity_id: 'faq-08', changed_at: new Date(Date.now() - 24 * 3600000).toISOString(), changed_by: 'Sistema', snapshot: null },
];
const MOCK_DEVICES_MAP = [
  { id: 'd1', name: 'Celular Maria', lat: 22, lng: 38, online: true },
  { id: 'd2', name: 'Celular João', lat: 48, lng: 25, online: true },
  { id: 'd3', name: 'Celular Ana', lat: 65, lng: 72, online: true },
  { id: 'd4', name: 'Celular Pedro', lat: 35, lng: 80, online: true },
  { id: 'd5', name: 'Celular Carla', lat: 78, lng: 45, online: true },
];
const MOCK_ACTIVITY_FEED = [
  { time: '14:32', msg: 'Dispositivo d1 — localização atualizada', type: 'location' },
  { time: '14:31', msg: 'Dispositivo d3 — app em foreground', type: 'activity' },
  { time: '14:28', msg: 'Dispositivo d2 — localização ativa', type: 'location' },
  { time: '14:25', msg: 'Dispositivo d5 — bateria 78%', type: 'battery' },
  { time: '14:22', msg: 'Dispositivo d4 — localização ativa', type: 'location' },
];

interface StatCard {
  label: string;
  value: string;
  change: string;
  up: boolean;
  icon: React.ReactNode;
  color: string;
}

const DashboardPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const deviceCount = MOCK_STATS.devices;
  const onlineCount = MOCK_STATS.online;
  const alertCount = MOCK_STATS.alerts;
  const countryCount = MOCK_STATS.countries;
  const recentActions = MOCK_RECENT_ACTIONS;
  const topCountries = MOCK_TOP_COUNTRIES;

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(t);
  }, []);

  const stats: StatCard[] = [
    { label: 'Total Dispositivos', value: loading ? '...' : deviceCount.toLocaleString(), change: '+12%', up: true, icon: <Smartphone size={18} />, color: 'accent-blue' },
    { label: 'Dispositivos Online', value: loading ? '...' : onlineCount.toLocaleString(), change: '+5', up: true, icon: <Activity size={18} />, color: 'accent-green' },
    { label: 'Alertas Registrados', value: loading ? '...' : alertCount.toLocaleString(), change: '-2', up: false, icon: <AlertTriangle size={18} />, color: 'accent-yellow' },
    { label: 'Países', value: loading ? '...' : String(countryCount), change: '--', up: true, icon: <Globe size={18} />, color: 'accent-purple' },
  ];

  const growthData = [{ month: 'Jan', value: 8 }, { month: 'Fev', value: 10 }, { month: 'Mar', value: 12 }];
  const maxGrowth = Math.max(...growthData.map(d => d.value));

  const formatActionDate = (iso: string) => {
    try {
      const d = new Date(iso);
      const now = new Date();
      const diffMs = now.getTime() - d.getTime();
      const diffMin = Math.floor(diffMs / 60000);
      if (diffMin < 1) return 'Agora';
      if (diffMin < 60) return `Há ${diffMin} min`;
      const diffH = Math.floor(diffMin / 60);
      if (diffH < 24) return `Há ${diffH}h`;
      return d.toLocaleDateString('pt-BR');
    } catch {
      return iso;
    }
  };

  const getActionColor = (entityType: string) => {
    if (entityType === 'settings') return 'bg-accent-blue';
    if (entityType === 'plan') return 'bg-accent-green';
    if (entityType === 'faq') return 'bg-accent-yellow';
    return 'bg-accent-purple';
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-tactical tracking-widest text-text-primary">DASHBOARD GLOBAL</h1>
        <p className="text-xs font-mono text-text-secondary/50 mt-1">Visão geral da plataforma — dados mock (SaaS 3)</p>
      </div>

      {loading && (
        <div className="flex items-center gap-2 text-accent-blue text-xs font-mono">
          <Loader size={14} className="animate-spin" /> Carregando...
        </div>
      )}

      {/* Layout: Mapa (esquerda) + Dados mock (direita) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Mapa com celulares — localização ativa */}
        <div className="lg:col-span-2 glass-card border border-border-color/30 rounded-lg overflow-hidden">
          <div className="px-4 py-2 border-b border-border-color/30 flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] font-tactical text-text-secondary/50">Mapa — Dispositivos</h3>
            <span className="text-[10px] font-mono text-accent-green flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-accent-green animate-pulse" /> Localização ativa
            </span>
          </div>
          <div className="relative bg-[#0d1117] h-[280px] rounded-b-lg">
            {/* Área do mapa (estilizada) */}
            <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'linear-gradient(rgba(0,212,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.03) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
            {MOCK_DEVICES_MAP.map((d) => (
              <div
                key={d.id}
                className="absolute flex flex-col items-center gap-0.5 transform -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${d.lng}%`, top: `${d.lat}%` }}
              >
                <div className="p-1.5 rounded-lg bg-accent-green/20 border border-accent-green/50 shadow-lg shadow-accent-green/10">
                  <Smartphone size={18} className="text-accent-green" />
                </div>
                <span className="text-[9px] font-mono text-accent-green/90 whitespace-nowrap max-w-[80px] truncate" title={d.name}>{d.name}</span>
                <span className="text-[8px] font-mono text-text-secondary/60">Localização ativa</span>
              </div>
            ))}
          </div>
        </div>

        {/* Painel direito — dados mock SaaS 3 */}
        <div className="space-y-4">
          <div className="glass-card border border-border-color/30 rounded-lg p-4">
            <h3 className="text-[10px] font-bold uppercase tracking-wider font-tactical text-text-secondary/50 mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-green animate-pulse" /> Device telemetry
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between text-[10px] font-mono">
                <span className="text-text-secondary/70">Sinal</span>
                <span className="text-accent-green">Bom</span>
              </div>
              <div className="h-2 bg-bg-tertiary rounded-full overflow-hidden">
                <div className="h-full w-3/4 bg-accent-blue rounded-full" />
              </div>
              <p className="text-[9px] font-mono text-text-secondary/40 mt-2">5 dispositivos com localização ativa</p>
            </div>
          </div>
          <div className="glass-card border border-border-color/30 rounded-lg p-4">
            <h3 className="text-[10px] font-bold uppercase tracking-wider font-tactical text-text-secondary/50 mb-3 flex items-center justify-between">
              Realtime activity feed
              <span className="text-[8px] font-mono text-accent-green">LIVE</span>
            </h3>
            <div className="space-y-2 max-h-[200px] overflow-y-auto">
              {MOCK_ACTIVITY_FEED.map((a, i) => (
                <div key={i} className="flex gap-2 text-[10px] font-mono">
                  <span className="text-text-secondary/50 shrink-0">{a.time}</span>
                  <span className="text-text-secondary/80 truncate">{a.msg}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="glass-card border border-border-color/30 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className={`text-${s.color}`}>{s.icon}</span>
              {s.change !== '--' && (
                <span className={`text-[10px] font-mono flex items-center gap-0.5 ${s.up ? 'text-accent-green' : 'text-accent-red'}`}>
                  {s.up ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}{s.change}
                </span>
              )}
            </div>
            <p className={`text-3xl font-bold font-tactical text-${s.color}`}>{s.value}</p>
            <p className="text-[9px] font-tactical uppercase tracking-widest text-text-secondary/50 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 glass-card border border-border-color/30 rounded-lg p-6">
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] font-tactical text-text-secondary/50 mb-4">Dispositivos</h3>
          <div className="flex items-end gap-3 h-40">
            {growthData.map((d) => (
              <div key={d.month} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-[10px] font-mono text-accent-blue">{d.value}</span>
                <div className="w-full bg-accent-blue/20 rounded-t" style={{ height: `${(d.value / maxGrowth) * 100}%` }}>
                  <div className="w-full h-full bg-accent-blue/60 rounded-t" />
                </div>
                <span className="text-[10px] font-mono text-text-secondary/40">{d.month}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="glass-card border border-border-color/30 rounded-lg p-6 flex flex-col items-center justify-center">
          <Activity size={24} className="text-accent-green mb-2" />
          <p className="text-[9px] font-tactical uppercase tracking-widest text-text-secondary/50">Dispositivos Online Agora</p>
          <p className="text-5xl font-bold font-tactical text-accent-green mt-2 animate-pulse">{onlineCount}</p>
          <p className="text-[10px] font-mono text-text-secondary/40 mt-2">de {deviceCount} total</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="glass-card border border-border-color/30 rounded-lg p-6">
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] font-tactical text-text-secondary/50 mb-4">Top Países (usuários)</h3>
          <div className="space-y-3">
            {topCountries.map((c) => (
              <div key={c.pais} className="flex items-center gap-3">
                <span className="text-sm w-32 font-mono">{c.pais}</span>
                <div className="flex-1 h-2 bg-bg-tertiary rounded-full overflow-hidden">
                  <div className="h-full bg-accent-blue rounded-full" style={{ width: `${c.pct}%` }} />
                </div>
                <span className="text-xs font-mono text-text-secondary w-10 text-right">{c.pct}%</span>
                <span className="text-[10px] font-mono text-text-secondary/40 w-16 text-right">{c.users.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="glass-card border border-border-color/30 rounded-lg p-6">
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] font-tactical text-text-secondary/50 mb-4">Últimas Alterações (CMS)</h3>
          <div className="space-y-3">
            {recentActions.map((a) => (
              <div key={a.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-bg-tertiary/30 transition-colors">
                <div className={`w-2 h-2 rounded-full ${getActionColor(a.entity_type)}`} />
                <div className="flex-1">
                  <p className="text-xs font-tactical font-bold text-text-primary">{a.entity_type} — {a.entity_id}</p>
                  <p className="text-[10px] font-mono text-text-secondary/40">por {a.changed_by}</p>
                </div>
                <span className="text-[9px] font-mono text-text-secondary/30">{formatActionDate(a.changed_at)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
