import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { CreditCard, DollarSign, TrendingUp, TrendingDown, ArrowUpRight, Loader } from 'lucide-react';

interface BillingStat { label: string; value: string; change: string; color: string; }
interface BillingTransaction { id: string; cliente: string; plano: string; valor: string; moeda: string; status: string; data: string; }

const BillingPage: React.FC = () => {
  const [revenueByPlan, setRevenueByPlan] = useState<any[]>([]);
  const [revenueByCountry, setRevenueByCountry] = useState<any[]>([]);
  const [monthlyData, setMonthlyData] = useState<any[]>([]);
  const [recentTransactions, setRecentTransactions] = useState<BillingTransaction[]>([]);
  const [billingStats, setBillingStats] = useState<BillingStat[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const [transactionsRes, statsRes, planRes, countryRes, monthlyRes] = await Promise.all([
        supabase.from('billing_transactions').select('*').order('created_at', { ascending: false }).limit(20),
        supabase.from('billing_stats').select('*').limit(1).single(),
        supabase.from('billing_revenue_by_plan').select('*'),
        supabase.from('billing_revenue_by_country').select('*'),
        supabase.from('billing_monthly_revenue').select('*'),
      ]);

      if (transactionsRes.data?.length) setRecentTransactions(transactionsRes.data);
      if (statsRes.data && !statsRes.error) {
        const s = statsRes.data;
        setBillingStats([
          { label: 'MRR', value: s.mrr ?? '—', change: s.mrr_change ?? '—', color: 'accent-blue' },
          { label: 'ARR', value: s.arr ?? '—', change: s.arr_change ?? '—', color: 'accent-green' },
          { label: 'Churn Rate', value: s.churn_rate ?? '—', change: s.churn_change ?? '—', color: 'accent-yellow' },
          { label: 'LTV Medio', value: s.ltv ?? '—', change: s.ltv_change ?? '—', color: 'accent-purple' },
        ]);
      }
      if (planRes.data?.length) setRevenueByPlan(planRes.data);
      if (countryRes.data?.length) setRevenueByCountry(countryRes.data);
      if (monthlyRes.data?.length) setMonthlyData(monthlyRes.data);

      setLoading(false);
    };
    fetchData();
  }, []);

  const iconMap: Record<string, React.ReactNode> = {
    'MRR': <DollarSign size={18} />,
    'ARR': <TrendingUp size={18} />,
    'Churn Rate': <TrendingDown size={18} />,
    'LTV Medio': <CreditCard size={18} />,
  };

  const stats = billingStats.map(s => ({ ...s, icon: iconMap[s.label] }));
  const maxMonthly = monthlyData.length > 0 ? Math.max(...monthlyData.map(d => typeof d.value === 'number' ? d.value : 0)) : 1;

  const getStatusBadge = (s: string) => { switch (s) { case 'pago': return 'bg-green-500/20 text-green-400'; case 'pendente': return 'bg-yellow-500/20 text-yellow-400'; case 'falhou': return 'bg-red-500/20 text-red-400'; default: return ''; } };

  if (loading) return <div className="flex items-center justify-center h-64"><Loader className="animate-spin text-accent-blue" size={32} /></div>;

  const hasData = billingStats.length > 0 || recentTransactions.length > 0 || monthlyData.length > 0 || revenueByPlan.length > 0 || revenueByCountry.length > 0;
  if (!hasData) {
    return (
      <div className="space-y-6">
        <div><h1 className="text-2xl font-bold font-tactical tracking-widest text-text-primary">FATURAMENTO GLOBAL</h1>
          <p className="text-xs font-mono text-text-secondary/50 mt-1">Metricas financeiras da plataforma</p></div>
        <div className="glass-card border border-border-color/30 rounded-lg p-12 flex flex-col items-center justify-center">
          <CreditCard size={48} className="text-text-secondary/20 mb-4" />
          <p className="text-sm font-tactical text-text-secondary/70">Nenhum dado de faturamento disponivel</p>
          <p className="text-xs font-mono text-text-secondary/40 mt-1">Os dados sao carregados das tabelas billing_* no Supabase</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold font-tactical tracking-widest text-text-primary">FATURAMENTO GLOBAL</h1>
        <p className="text-xs font-mono text-text-secondary/50 mt-1">Metricas financeiras da plataforma</p></div>

      <div className="grid grid-cols-4 gap-4">
        {stats.map(s => (<div key={s.label} className="glass-card border border-border-color/30 rounded-lg p-4"><div className="flex items-center justify-between mb-2"><span className={`text-${s.color}`}>{s.icon}</span><span className="text-[10px] font-mono text-accent-green flex items-center gap-0.5"><ArrowUpRight size={12} />{s.change}</span></div><p className={`text-2xl font-bold font-tactical text-${s.color}`}>{s.value}</p><p className="text-[9px] font-tactical uppercase tracking-widest text-text-secondary/50 mt-1">{s.label}</p></div>))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 glass-card border border-border-color/30 rounded-lg p-6">
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] font-tactical text-text-secondary/50 mb-4">Receita Mensal (MRR)</h3>
          <div className="flex items-end gap-3 h-40">
            {monthlyData.map(d => {
              const val = typeof d.value === 'number' ? d.value : 0;
              return (
              <div key={d.month} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-[9px] font-mono text-accent-blue">{(val/1000).toFixed(0)}k</span>
                <div className="w-full bg-accent-blue/20 rounded-t" style={{ height: `${maxMonthly > 0 ? (val / maxMonthly) * 100 : 0}%` }}><div className="w-full h-full bg-accent-blue/60 rounded-t" /></div>
                <span className="text-[10px] font-mono text-text-secondary/40">{d.month}</span>
              </div>
            );})}
          </div>
        </div>

        <div className="space-y-4">
          <div className="glass-card border border-border-color/30 rounded-lg p-4">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] font-tactical text-text-secondary/50 mb-3">Por Plano</h3>
            {revenueByPlan.map(p => (<div key={p.plan} className="flex items-center gap-2 mb-2"><span className="text-[10px] font-mono text-text-primary w-14">{p.plan}</span><div className="flex-1 h-2 bg-bg-tertiary rounded-full overflow-hidden"><div className="h-full bg-accent-blue/60 rounded-full" style={{ width: `${p.pct}%` }} /></div><span className="text-[9px] font-mono text-text-secondary/40 w-8 text-right">{p.pct}%</span></div>))}
          </div>
          <div className="glass-card border border-border-color/30 rounded-lg p-4">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] font-tactical text-text-secondary/50 mb-3">Por Pais</h3>
            {revenueByCountry.map(c => (<div key={c.pais} className="flex items-center justify-between mb-1.5"><span className="text-[10px]">{c.pais}</span><span className="text-[10px] font-mono text-accent-green">{c.value}</span></div>))}
          </div>
        </div>
      </div>

      <div className="bg-bg-secondary rounded-lg border border-border-color/30 overflow-hidden">
        <div className="p-3 border-b border-border-color/20 bg-bg-tertiary/50"><h3 className="text-xs font-bold uppercase tracking-[0.2em] font-tactical text-text-secondary/50">Ultimas Transacoes</h3></div>
        <div className="grid grid-cols-12 gap-4 p-3 bg-bg-tertiary border-b border-border-color text-[10px] font-bold text-text-secondary uppercase tracking-wider">
          <div className="col-span-1">ID</div><div className="col-span-2">Cliente</div><div className="col-span-2">Plano</div><div className="col-span-2">Valor</div><div className="col-span-1">Moeda</div><div className="col-span-2">Status</div><div className="col-span-2">Data</div>
        </div>
        {recentTransactions.map(t => (
          <div key={t.id} className="grid grid-cols-12 gap-4 p-3 border-b border-border-color/20 hover:bg-bg-tertiary/30 transition-colors items-center">
            <div className="col-span-1 text-[10px] font-mono text-accent-blue">{t.id}</div>
            <div className="col-span-2 text-xs font-mono text-text-primary">{t.cliente}</div>
            <div className="col-span-2 text-[10px] font-mono text-text-secondary">{t.plano}</div>
            <div className="col-span-2 text-xs font-mono text-accent-green font-bold">{t.valor}</div>
            <div className="col-span-1 text-[10px] font-mono text-text-secondary/40">{t.moeda}</div>
            <div className="col-span-2"><span className={`text-[9px] px-2 py-0.5 rounded-full ${getStatusBadge(t.status)}`}>{t.status.toUpperCase()}</span></div>
            <div className="col-span-2 text-[10px] font-mono text-text-secondary/40">{t.data}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BillingPage;
