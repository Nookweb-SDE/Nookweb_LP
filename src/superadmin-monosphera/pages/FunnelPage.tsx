import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { TrendingUp, ArrowDown, Loader } from 'lucide-react';

const FunnelPage: React.FC = () => {
  const [period, setPeriod] = useState('30d');
  const [funnelData, setFunnelData] = useState<{ stage: string; value: number; pct: number; color: string }[]>([]);
  const [funnelBySolution, setFunnelBySolution] = useState<{ name: string; visitors: number; signups: number; trials: number; purchases: number }[]>([]);
  const [loading, setLoading] = useState(true);
  const periods = [{ id: '7d', label: '7 dias' }, { id: '30d', label: '30 dias' }, { id: '90d', label: '90 dias' }, { id: '1y', label: '1 ano' }];

  useEffect(() => {
    fetchData();
  }, [period]);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Buscar dados do funil global
      const { data: globalData, error: globalError } = await supabase
        .from('analytics_funnel')
        .select('*')
        .order('sort_order');

      if (!globalError && globalData && globalData.length > 0) {
        setFunnelData(globalData.map((item: any) => ({
          stage: item.stage,
          value: item.value,
          pct: item.pct,
          color: item.color || 'bg-accent-blue',
        })));
      } else {
        setFunnelData([]);
      }

      // Buscar dados por solução
      const { data: solutionData, error: solutionError } = await supabase
        .from('analytics_funnel_by_solution')
        .select('*');

      if (!solutionError && solutionData && solutionData.length > 0) {
        setFunnelBySolution(solutionData.map((item: any) => ({
          name: item.name,
          visitors: item.visitors,
          signups: item.signups,
          trials: item.trials,
          purchases: item.purchases,
        })));
      } else {
        setFunnelBySolution([]);
      }
    } catch (err) {
      console.error('Erro ao buscar dados do funil:', err);
      setFunnelData([]);
      setFunnelBySolution([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader className="animate-spin text-accent-blue" size={32} />
      </div>
    );
  }

  const hasData = funnelData.length > 0 || funnelBySolution.length > 0;
  if (!hasData) {
    return (
      <div className="space-y-6">
        <div><h1 className="text-2xl font-bold font-tactical tracking-widest text-text-primary">FUNIL DE CONVERSAO</h1>
          <p className="text-xs font-mono text-text-secondary/50 mt-1">Analise do funil de vendas</p></div>
        <div className="glass-card border border-border-color/30 rounded-lg p-12 flex flex-col items-center justify-center">
          <TrendingUp size={48} className="text-text-secondary/20 mb-4" />
          <p className="text-sm font-tactical text-text-secondary/70">Nenhum dado de funil disponivel</p>
          <p className="text-xs font-mono text-text-secondary/40 mt-1">Os dados sao carregados das tabelas analytics_funnel e analytics_funnel_by_solution no Supabase</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div><h1 className="text-2xl font-bold font-tactical tracking-widest text-text-primary">FUNIL DE CONVERSAO</h1>
          <p className="text-xs font-mono text-text-secondary/50 mt-1">Analise do funil de vendas</p></div>
        <div className="flex gap-1">
          {periods.map(p => (
            <button key={p.id} onClick={() => setPeriod(p.id)} className={`px-3 py-1.5 rounded-lg text-[10px] font-tactical tracking-wider transition-all ${period === p.id ? 'bg-accent-blue/20 border border-accent-blue text-accent-blue' : 'bg-bg-tertiary/50 border border-border-color/30 text-text-secondary'}`}>{p.label}</button>
          ))}
        </div>
      </div>

      {/* Main Funnel */}
      <div className="glass-card border border-border-color/30 rounded-lg p-8">
        <h3 className="text-xs font-bold uppercase tracking-[0.2em] font-tactical text-text-secondary/50 mb-8 text-center">Funil Global</h3>
        <div className="max-w-2xl mx-auto space-y-2">
          {funnelData.map((stage, i) => (
            <div key={stage.stage}>
              <div className="flex items-center gap-4">
                <span className="text-xs font-tactical font-bold text-text-primary w-24">{stage.stage}</span>
                <div className="flex-1 flex justify-center">
                  <div className={`${stage.color} h-12 rounded-lg flex items-center justify-center transition-all`} style={{ width: `${Math.max(stage.pct, 15)}%` }}>
                    <span className="text-xs font-mono font-bold text-bg-primary">{stage.value.toLocaleString()}</span>
                  </div>
                </div>
                <span className="text-xs font-mono text-text-secondary w-16 text-right">{stage.pct}%</span>
              </div>
              {i < funnelData.length - 1 && (
                <div className="flex items-center justify-center gap-2 py-1">
                  <ArrowDown size={12} className="text-text-secondary/30" />
                  <span className="text-[9px] font-mono text-text-secondary/30">
                    {((funnelData[i + 1].value / stage.value) * 100).toFixed(1)}% conversão
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* By Solution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {funnelBySolution.map(sol => {
          const stages = [
            { label: 'Visitantes', value: sol.visitors, color: 'bg-accent-blue/60' },
            { label: 'Cadastro', value: sol.signups, color: 'bg-accent-purple/60' },
            { label: 'Trial', value: sol.trials, color: 'bg-accent-yellow/60' },
            { label: 'Compra', value: sol.purchases, color: 'bg-accent-green/60' },
          ];
          return (
            <div key={sol.name} className="glass-card border border-border-color/30 rounded-lg p-6">
              <h4 className="text-xs font-bold uppercase tracking-[0.2em] font-tactical text-accent-blue mb-4">{sol.name}</h4>
              <div className="space-y-2">
                {stages.map(s => (
                  <div key={s.label} className="flex items-center gap-2">
                    <span className="text-[9px] font-mono text-text-secondary/50 w-16">{s.label}</span>
                    <div className="flex-1 h-4 bg-bg-tertiary rounded overflow-hidden">
                      <div className={`h-full ${s.color} rounded`} style={{ width: `${(s.value / sol.visitors) * 100}%` }} />
                    </div>
                    <span className="text-[10px] font-mono text-text-primary w-14 text-right">{s.value.toLocaleString()}</span>
                  </div>
                ))}
              </div>
              <div className="mt-3 pt-3 border-t border-border-color/20">
                <span className="text-[10px] font-mono text-accent-green">Taxa total: {((sol.purchases / sol.visitors) * 100).toFixed(1)}%</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FunnelPage;
