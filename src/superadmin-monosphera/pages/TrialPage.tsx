import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Gift, Clock, Users, TrendingUp, ToggleLeft, ToggleRight, Loader } from 'lucide-react';

interface TrialSession { id: number | string; email: string; solucao: string; inicio: string; fim: string; status: string; convertido: boolean; }
interface TrialConfig { solucao: string; ativo: boolean; duracao: number; unidade: string; plano: string; cartao: boolean; emailVerify: boolean; maxEmail: number; blockTemp: boolean; }

const TrialPage: React.FC = () => {
  const [trials, setTrials] = useState<TrialSession[]>([]);
  const [configs, setConfigs] = useState<TrialConfig[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Buscar trials
        const { data: trialsData } = await supabase
          .from('trial_sessions')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(20);

        if (trialsData && trialsData.length > 0) {
          const mappedTrials = trialsData.map((t: any) => ({
            id: t.id,
            email: t.email,
            solucao: t.solucao || t.solution,
            inicio: new Date(t.started_at || t.created_at).toLocaleString('pt-BR'),
            fim: new Date(t.ends_at || t.expires_at).toLocaleString('pt-BR'),
            status: t.status,
            convertido: t.converted || false,
          }));
          setTrials(mappedTrials);
        } else {
          setTrials([]);
        }

        // Buscar configs
        const { data: configsData } = await supabase
          .from('trial_configs')
          .select('*')
          .order('solucao');

        if (configsData && configsData.length > 0) {
          const mappedConfigs = configsData.map((c: any) => ({
            solucao: c.solucao,
            ativo: c.ativo ?? true,
            duracao: c.duracao ?? 24,
            unidade: c.unidade ?? 'horas',
            plano: c.plano ?? 'Premium',
            cartao: c.cartao ?? false,
            emailVerify: c.email_verify ?? c.emailVerify ?? true,
            maxEmail: c.max_email ?? c.maxEmail ?? 3,
            blockTemp: c.block_temp ?? c.blockTemp ?? true,
          }));
          setConfigs(mappedConfigs);
        } else {
          setConfigs([]);
        }
      } catch (err) {
        console.error('Erro ao buscar dados de trial:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const toggleConfig = (idx: number, field: string) => {
    setConfigs(prev => prev.map((c, i) => i === idx ? { ...c, [field]: !(c as any)[field] } : c));
  };

  // Stats calculados dinamicamente
  const totalTrials = trials.length;
  const ativos = trials.filter(t => t.status === 'ativo').length;
  const convertidos = trials.filter(t => t.status === 'convertido').length;
  const expirados = trials.filter(t => t.status === 'expirado').length;
  const taxaConversao = totalTrials > 0 ? ((convertidos / totalTrials) * 100).toFixed(1) : '0.0';

  const stats = [
    { label: 'Trials Ativos', value: String(ativos), icon: <Gift size={18} />, color: 'accent-blue' },
    { label: 'Convertidos', value: `${convertidos} (${taxaConversao}%)`, icon: <TrendingUp size={18} />, color: 'accent-green' },
    { label: 'Expirados', value: String(expirados), icon: <Clock size={18} />, color: 'accent-yellow' },
    { label: 'Media Duracao', value: `${totalTrials}`, icon: <Users size={18} />, color: 'accent-purple' },
  ];

  const getStatusBadge = (s: string) => { switch (s) { case 'ativo': return 'bg-blue-500/20 text-blue-400'; case 'convertido': return 'bg-green-500/20 text-green-400'; case 'expirado': return 'bg-red-500/20 text-red-400'; default: return ''; } };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader size={32} className="animate-spin text-accent-blue" />
      </div>
    );
  }

  const hasData = trials.length > 0 || configs.length > 0;
  if (!hasData) {
    return (
      <div className="space-y-6">
        <div><h1 className="text-2xl font-bold font-tactical tracking-widest text-text-primary">SISTEMA DE TRIAL</h1>
          <p className="text-xs font-mono text-text-secondary/50 mt-1">Configure o trial gratuito por solucao</p></div>
        <div className="glass-card border border-border-color/30 rounded-lg p-12 flex flex-col items-center justify-center">
          <Gift size={48} className="text-text-secondary/20 mb-4" />
          <p className="text-sm font-tactical text-text-secondary/70">Nenhum dado de trial disponivel</p>
          <p className="text-xs font-mono text-text-secondary/40 mt-1">Os dados sao carregados das tabelas trial_sessions e trial_configs no Supabase</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold font-tactical tracking-widest text-text-primary">SISTEMA DE TRIAL</h1>
        <p className="text-xs font-mono text-text-secondary/50 mt-1">Configure o trial gratuito por solucao</p></div>

      <div className="grid grid-cols-4 gap-4">
        {stats.map(s => (<div key={s.label} className="glass-card border border-border-color/30 rounded-lg p-4"><div className="flex items-center justify-between mb-2"><span className={`text-${s.color}`}>{s.icon}</span><span className="text-[9px] font-tactical uppercase tracking-widest text-text-secondary/50">{s.label}</span></div><p className={`text-2xl font-bold font-tactical text-${s.color}`}>{s.value}</p></div>))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {configs.map((c, i) => (
          <div key={c.solucao} className={`glass-card border rounded-lg p-6 ${c.ativo ? 'border-accent-blue/30' : 'border-border-color/30 opacity-50'}`}>
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-tactical font-bold text-text-primary">{c.solucao}</h4>
              <button onClick={() => toggleConfig(i, 'ativo')} className={c.ativo ? 'text-accent-green' : 'text-text-secondary/30'}>
                {c.ativo ? <ToggleRight size={28} /> : <ToggleLeft size={28} />}
              </button>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <input type="number" value={c.duracao} onChange={(e) => setConfigs(prev => prev.map((x, j) => j === i ? { ...x, duracao: Number(e.target.value) || 0 } : x))} className="w-16 bg-bg-tertiary border border-border-color/30 rounded px-2 py-1 text-xs font-mono text-text-primary outline-none text-center" />
                <select value={c.unidade} onChange={(e) => setConfigs(prev => prev.map((x, j) => j === i ? { ...x, unidade: e.target.value } : x))} className="bg-bg-tertiary border border-border-color/30 rounded px-2 py-1 text-xs font-mono text-text-secondary outline-none">
                  <option value="horas">horas</option><option value="dias">dias</option>
                </select>
              </div>
              <div><label className="text-[9px] font-mono text-text-secondary/40 uppercase">Plano durante trial</label>
                <select value={c.plano} onChange={(e) => setConfigs(prev => prev.map((x, j) => j === i ? { ...x, plano: e.target.value } : x))} className="w-full mt-1 bg-bg-tertiary border border-border-color/30 rounded px-2 py-1.5 text-xs font-mono text-text-primary outline-none">{['Starter', 'Plus', 'Premium', 'Ultra', 'Business', 'Enterprise', 'Avancado'].map(p => <option key={p} value={p}>{p}</option>)}</select></div>
              <div className="space-y-2 pt-2 border-t border-border-color/20">
                {[['Exigir cartao', 'cartao'], ['Verificar email', 'emailVerify'], ['Bloquear temp emails', 'blockTemp']].map(([label, field]) => (
                  <div key={field} className="flex items-center justify-between"><span className="text-[10px] font-mono text-text-secondary">{label}</span>
                    <button onClick={() => toggleConfig(i, field)} className={(c as any)[field] ? 'text-accent-blue' : 'text-text-secondary/30'}>{(c as any)[field] ? <ToggleRight size={20} /> : <ToggleLeft size={20} />}</button></div>
                ))}
                <div className="flex items-center justify-between"><span className="text-[10px] font-mono text-text-secondary">Max por email</span>
                  <input type="number" value={c.maxEmail} onChange={(e) => setConfigs(prev => prev.map((x, j) => j === i ? { ...x, maxEmail: Number(e.target.value) || 0 } : x))} className="w-12 bg-bg-tertiary border border-border-color/30 rounded px-2 py-0.5 text-xs font-mono text-text-primary outline-none text-center" /></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-bg-secondary rounded-lg border border-border-color/30 overflow-hidden">
        <div className="p-3 border-b border-border-color/20 bg-bg-tertiary/50"><h3 className="text-xs font-bold uppercase tracking-[0.2em] font-tactical text-text-secondary/50">Trials Recentes</h3></div>
        <div className="grid grid-cols-12 gap-4 p-3 bg-bg-tertiary border-b border-border-color text-[10px] font-bold text-text-secondary uppercase tracking-wider">
          <div className="col-span-3">Email</div><div className="col-span-2">Solucao</div><div className="col-span-2">Inicio</div><div className="col-span-2">Fim</div><div className="col-span-1">Status</div><div className="col-span-2">Convertido</div>
        </div>
        {trials.map(t => (
          <div key={t.id} className="grid grid-cols-12 gap-4 p-3 border-b border-border-color/20 hover:bg-bg-tertiary/30 transition-colors items-center">
            <div className="col-span-3 text-xs font-mono text-text-primary">{t.email}</div>
            <div className="col-span-2 text-[10px] font-mono text-text-secondary">{t.solucao}</div>
            <div className="col-span-2 text-[10px] font-mono text-text-secondary/40">{t.inicio}</div>
            <div className="col-span-2 text-[10px] font-mono text-text-secondary/40">{t.fim}</div>
            <div className="col-span-1"><span className={`text-[9px] px-1.5 py-0.5 rounded-full ${getStatusBadge(t.status)}`}>{t.status.toUpperCase()}</span></div>
            <div className="col-span-2 text-xs font-mono">{t.convertido ? <span className="text-accent-green">&#10003; Sim</span> : <span className="text-text-secondary/30">—</span>}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrialPage;
