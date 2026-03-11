import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Flame, MousePointer, Eye, Clock, Loader } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  eye: <Eye size={18} />,
  mouse: <MousePointer size={18} />,
  flame: <Flame size={18} />,
  clock: <Clock size={18} />,
};

const HeatmapPage: React.FC = () => {
  const [selectedPage, setSelectedPage] = useState('home');
  const [topElements, setTopElements] = useState<{ selector: string; pagina: string; cliques: number; pct: number }[]>([]);
  const [stats, setStats] = useState<{ label: string; value: string; icon_key: string; color: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const pages = ['home', 'planos', 'parental', 'comercial'];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Buscar top elements
        const { data: elementsData } = await supabase
          .from('analytics_heatmap_elements')
          .select('*')
          .order('cliques', { ascending: false })
          .limit(10);

        if (elementsData && elementsData.length > 0) {
          setTopElements(elementsData);
        }

        // Buscar stats
        const { data: statsData } = await supabase
          .from('analytics_heatmap_stats')
          .select('*')
          .single();

        if (statsData) {
          setStats([
            { label: 'Sessoes Hoje', value: statsData.sessoes_hoje ?? '—', icon_key: 'eye', color: 'accent-blue' },
            { label: 'Cliques Registrados', value: statsData.cliques_registrados ?? '—', icon_key: 'mouse', color: 'accent-green' },
            { label: 'Paginas Rastreadas', value: statsData.paginas_rastreadas ?? '—', icon_key: 'flame', color: 'accent-yellow' },
            { label: 'Tempo Medio', value: statsData.tempo_medio ?? '—', icon_key: 'clock', color: 'accent-purple' },
          ]);
        }
      } catch (err) {
        console.error('HeatmapPage: erro ao buscar dados, usando fallback', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader size={32} className="animate-spin text-accent-blue" />
      </div>
    );
  }

  const hasData = stats.length > 0 || topElements.length > 0;
  if (!hasData) {
    return (
      <div className="space-y-6">
        <div><h1 className="text-2xl font-bold font-tactical tracking-widest text-text-primary">MAPA DE CALOR</h1>
          <p className="text-xs font-mono text-text-secondary/50 mt-1">Analise de cliques e interacoes dos visitantes</p></div>
        <div className="glass-card border border-border-color/30 rounded-lg p-12 flex flex-col items-center justify-center">
          <Flame size={48} className="text-text-secondary/20 mb-4" />
          <p className="text-sm font-tactical text-text-secondary/70">Nenhum dado de mapa de calor disponivel</p>
          <p className="text-xs font-mono text-text-secondary/40 mt-1">Os dados sao carregados das tabelas analytics_heatmap_* no Supabase</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold font-tactical tracking-widest text-text-primary">MAPA DE CALOR</h1>
        <p className="text-xs font-mono text-text-secondary/50 mt-1">Analise de cliques e interacoes dos visitantes</p></div>

      <div className="grid grid-cols-4 gap-4">
        {stats.map(s => (<div key={s.label} className="glass-card border border-border-color/30 rounded-lg p-4"><div className="flex items-center justify-between mb-2"><span className={`text-${s.color}`}>{iconMap[s.icon_key]}</span><span className="text-[9px] font-tactical uppercase tracking-widest text-text-secondary/50">{s.label}</span></div><p className={`text-3xl font-bold font-tactical text-${s.color}`}>{s.value}</p></div>))}
      </div>

      <div className="flex gap-2 mb-4">
        {pages.map(p => (
          <button key={p} onClick={() => setSelectedPage(p)} className={`px-4 py-2 rounded-lg text-xs font-tactical tracking-wider transition-all capitalize ${selectedPage === p ? 'bg-accent-blue/20 border border-accent-blue text-accent-blue' : 'bg-bg-tertiary/50 border border-border-color/30 text-text-secondary hover:text-text-primary'}`}>{p}</button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="glass-card border border-border-color/30 rounded-lg p-6 relative min-h-[400px]">
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] font-tactical text-text-secondary/50 mb-4">Preview — {selectedPage.toUpperCase()}</h3>
          <div className="absolute inset-12 bg-bg-tertiary/20 rounded-lg border border-border-color/10 overflow-hidden">
            <div className="absolute top-[10%] left-[50%] w-20 h-20 rounded-full opacity-60" style={{ background: 'radial-gradient(circle, rgba(255,0,0,0.6) 0%, rgba(255,255,0,0.3) 40%, transparent 70%)' }} />
            <div className="absolute top-[30%] left-[70%] w-16 h-16 rounded-full opacity-50" style={{ background: 'radial-gradient(circle, rgba(255,100,0,0.5) 0%, rgba(255,255,0,0.2) 40%, transparent 70%)' }} />
            <div className="absolute top-[50%] left-[30%] w-24 h-24 rounded-full opacity-70" style={{ background: 'radial-gradient(circle, rgba(255,0,0,0.7) 0%, rgba(255,200,0,0.3) 40%, transparent 70%)' }} />
            <div className="absolute top-[70%] left-[60%] w-12 h-12 rounded-full opacity-40" style={{ background: 'radial-gradient(circle, rgba(0,255,0,0.4) 0%, rgba(255,255,0,0.2) 40%, transparent 70%)' }} />
            <div className="absolute top-[20%] left-[20%] w-14 h-14 rounded-full opacity-45" style={{ background: 'radial-gradient(circle, rgba(255,150,0,0.5) 0%, rgba(255,255,0,0.2) 40%, transparent 70%)' }} />
          </div>
          <div className="absolute bottom-4 left-4 flex gap-3 text-[9px] font-mono text-text-secondary/40">
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500" />Alto</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-yellow-500" />Médio</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500" />Baixo</span>
          </div>
        </div>

        <div className="glass-card border border-border-color/30 rounded-lg p-6">
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] font-tactical text-text-secondary/50 mb-4">Top Elementos Clicados</h3>
          <div className="space-y-2">
            {topElements.map((el, i) => (
              <div key={i} className="flex items-center gap-3 p-2 rounded-lg bg-bg-tertiary/30">
                <span className="text-[10px] font-mono text-text-secondary/40 w-4">{i + 1}</span>
                <div className="flex-1">
                  <code className="text-[10px] font-mono text-accent-blue">{el.selector}</code>
                  <span className="text-[9px] font-mono text-text-secondary/30 ml-2">{el.pagina}</span>
                </div>
                <span className="text-xs font-mono text-text-primary font-bold">{el.cliques.toLocaleString()}</span>
                <span className="text-[10px] font-mono text-text-secondary/40 w-12 text-right">{el.pct}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeatmapPage;
