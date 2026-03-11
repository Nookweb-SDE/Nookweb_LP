import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Activity, Globe, Monitor, Smartphone, Loader } from 'lucide-react';

const ActiveUsersPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [activeByPage, setActiveByPage] = useState<{ page: string; users: number }[]>([]);
  const [activeByRegion, setActiveByRegion] = useState<{ region: string; pct: number; users: number }[]>([]);
  const [activeSessions, setActiveSessions] = useState<{ id: string; pais: string; pagina: string; tempo: string; device: string }[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [sessionsRes, byPageRes, byRegionRes] = await Promise.all([
          supabase.from('active_sessions').select('*').order('created_at', { ascending: false }).limit(20),
          supabase.from('analytics_active_by_page').select('*').order('users', { ascending: false }),
          supabase.from('analytics_active_by_region').select('*').order('pct', { ascending: false }),
        ]);

        // Active Sessions
        if (sessionsRes.data && sessionsRes.data.length > 0) {
          const mappedSessions = sessionsRes.data.map((s: any) => ({
            id: s.id || s.session_id,
            pais: s.pais || s.country_flag || '🌍',
            pagina: s.pagina || s.current_page || 'Home',
            tempo: s.tempo || s.duration || '0:00',
            device: s.device || 'Desktop',
          }));
          setActiveSessions(mappedSessions);
        } else {
          setActiveSessions([]);
        }

        // Active By Page
        if (byPageRes.data && byPageRes.data.length > 0) {
          setActiveByPage(byPageRes.data.map((p: any) => ({
            page: p.page || p.page_name || 'Desconhecida',
            users: p.users || 0,
          })));
        } else {
          setActiveByPage([]);
        }

        // Active By Region
        if (byRegionRes.data && byRegionRes.data.length > 0) {
          setActiveByRegion(byRegionRes.data.map((r: any) => ({
            region: r.region || r.region_name || '🌍 Outros',
            pct: r.pct || 0,
            users: r.users || 0,
          })));
        } else {
          setActiveByRegion([]);
        }
      } catch (err) {
        console.error('ActiveUsersPage: erro ao buscar dados do Supabase, usando fallback', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const maxUsers = activeByPage.length > 0 ? Math.max(...activeByPage.map(p => p.users)) : 1;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader size={32} className="animate-spin text-accent-blue" />
      </div>
    );
  }

  return (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <div><h1 className="text-2xl font-bold font-tactical tracking-widest text-text-primary">USUARIOS ATIVOS</h1>
        <p className="text-xs font-mono text-text-secondary/50 mt-1">Monitoramento em tempo real</p></div>
      <div className="flex items-center gap-2 bg-accent-green/10 border border-accent-green/30 rounded-lg px-4 py-2">
        <div className="w-2 h-2 rounded-full bg-accent-green animate-pulse" />
        <span className="text-[10px] font-mono text-accent-green">Auto-refresh: 5s</span>
      </div>
    </div>

    <div className="glass-card border border-border-color/30 rounded-lg p-8 flex flex-col items-center justify-center">
      <Activity size={32} className="text-accent-green mb-2" />
      <p className="text-[9px] font-tactical uppercase tracking-widest text-text-secondary/50">Ativos Agora</p>
      <p className="text-6xl font-bold font-tactical text-accent-green mt-2 animate-pulse">{activeSessions.length}</p>
      <p className="text-[10px] font-mono text-text-secondary/40 mt-2">em {new Set(activeSessions.map(s => s.pais)).size} paises • {new Set(activeSessions.map(s => s.pagina)).size} paginas</p>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div className="glass-card border border-border-color/30 rounded-lg p-6">
        <h3 className="text-xs font-bold uppercase tracking-[0.2em] font-tactical text-text-secondary/50 mb-4">Por Pagina</h3>
        <div className="space-y-2">
          {activeByPage.map(p => (
            <div key={p.page} className="flex items-center gap-3">
              <span className="text-xs font-mono text-text-primary w-20">{p.page}</span>
              <div className="flex-1 h-3 bg-bg-tertiary rounded-full overflow-hidden">
                <div className="h-full bg-accent-blue/60 rounded-full" style={{ width: `${(p.users / maxUsers) * 100}%` }} />
              </div>
              <span className="text-xs font-mono text-accent-blue w-8 text-right">{p.users}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="glass-card border border-border-color/30 rounded-lg p-6">
        <h3 className="text-xs font-bold uppercase tracking-[0.2em] font-tactical text-text-secondary/50 mb-4">Por Regiao</h3>
        <div className="space-y-2">
          {activeByRegion.map(r => (
            <div key={r.region} className="flex items-center gap-3">
              <span className="text-sm w-28">{r.region}</span>
              <div className="flex-1 h-3 bg-bg-tertiary rounded-full overflow-hidden">
                <div className="h-full bg-accent-purple/60 rounded-full" style={{ width: `${r.pct}%` }} />
              </div>
              <span className="text-xs font-mono text-text-secondary w-8 text-right">{r.pct}%</span>
              <span className="text-[10px] font-mono text-text-secondary/40 w-8 text-right">{r.users}</span>
            </div>
          ))}
        </div>
      </div>
    </div>

    <div className="bg-bg-secondary rounded-lg border border-border-color/30 overflow-hidden">
      <div className="p-3 border-b border-border-color/20 bg-bg-tertiary/50"><h3 className="text-xs font-bold uppercase tracking-[0.2em] font-tactical text-text-secondary/50">Sessoes Ativas</h3></div>
      <div className="grid grid-cols-12 gap-4 p-3 bg-bg-tertiary border-b border-border-color text-[10px] font-bold text-text-secondary uppercase tracking-wider">
        <div className="col-span-2">ID</div><div className="col-span-1">Pais</div><div className="col-span-3">Pagina Atual</div><div className="col-span-2">Tempo</div><div className="col-span-2">Dispositivo</div><div className="col-span-2 text-right">Status</div>
      </div>
      {activeSessions.map(s => (
        <div key={s.id} className="grid grid-cols-12 gap-4 p-3 border-b border-border-color/20 hover:bg-bg-tertiary/30 transition-colors items-center">
          <div className="col-span-2 text-[10px] font-mono text-accent-blue">{s.id}</div>
          <div className="col-span-1 text-sm">{s.pais}</div>
          <div className="col-span-3 text-xs font-mono text-text-primary">{s.pagina}</div>
          <div className="col-span-2 text-[10px] font-mono text-text-secondary">{s.tempo}</div>
          <div className="col-span-2 flex items-center gap-1 text-xs font-mono text-text-secondary">{s.device === 'Desktop' ? <Monitor size={12} /> : <Smartphone size={12} />} {s.device}</div>
          <div className="col-span-2 text-right"><span className="text-[9px] px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 animate-pulse">ATIVO</span></div>
        </div>
      ))}
    </div>
  </div>
  );
};

export default ActiveUsersPage;
