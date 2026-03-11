import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { DollarSign, Edit, Check, X, Star, Plus, Loader, Zap, Crown, Rocket, Briefcase, Building2, Users, User, Heart, Shield } from 'lucide-react';

interface Plan {
  id: string;
  name: string;
  price: number;
  period: string;
  highlighted: boolean;
  sort_order: number;
  created_at: string;
}

const fallbackPlans: Plan[] = [
  // Parental
  { id: 'fb-parental-1', name: 'Básico', price: 29.90, period: 'parental', highlighted: false, sort_order: 1, created_at: new Date().toISOString() },
  { id: 'fb-parental-2', name: 'Premium', price: 79.90, period: 'parental', highlighted: true, sort_order: 2, created_at: new Date().toISOString() },
  { id: 'fb-parental-3', name: 'Ultra', price: 129.90, period: 'parental', highlighted: false, sort_order: 3, created_at: new Date().toISOString() },
  // Comercial
  { id: 'fb-comercial-1', name: 'Starter', price: 99.90, period: 'comercial', highlighted: false, sort_order: 1, created_at: new Date().toISOString() },
  { id: 'fb-comercial-2', name: 'Business', price: 199.90, period: 'comercial', highlighted: true, sort_order: 2, created_at: new Date().toISOString() },
  { id: 'fb-comercial-3', name: 'Enterprise', price: 399.90, period: 'comercial', highlighted: false, sort_order: 3, created_at: new Date().toISOString() },
  // Pânico
  { id: 'fb-panico-1', name: 'Individual', price: 19.90, period: 'panico', highlighted: false, sort_order: 1, created_at: new Date().toISOString() },
  { id: 'fb-panico-2', name: 'Familia', price: 39.90, period: 'panico', highlighted: true, sort_order: 2, created_at: new Date().toISOString() },
  { id: 'fb-panico-3', name: 'Empresa', price: 89.90, period: 'panico', highlighted: false, sort_order: 3, created_at: new Date().toISOString() },
];

const getPlanIcon = (name: string) => {
  const lower = name.toLowerCase();
  if (lower.includes('basico') || lower.includes('básico') || lower.includes('starter') || lower.includes('individual')) return <Zap size={20} />;
  if (lower.includes('premium') || lower.includes('business') || lower.includes('familia') || lower.includes('família')) return <Crown size={20} />;
  if (lower.includes('ultra') || lower.includes('enterprise') || lower.includes('empresa')) return <Rocket size={20} />;
  return <DollarSign size={20} />;
};

const getTabIcon = (id: string) => {
  switch (id) {
    case 'parental': return <Shield size={14} />;
    case 'comercial': return <Briefcase size={14} />;
    case 'panico': return <Heart size={14} />;
    default: return null;
  }
};

const PlansPage: React.FC = () => {
  const navigate = useNavigate();
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('parental');

  const tabs = [
    { id: 'parental', label: 'Controle Parental' },
    { id: 'comercial', label: 'Comercial' },
    { id: 'panico', label: 'Panico' },
  ];

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const { data, error } = await supabase
          .from('cms_plans')
          .select('*')
          .order('sort_order', { ascending: true });

        if (error || !data || data.length === 0) {
          setPlans(fallbackPlans);
        } else {
          setPlans(data);
        }
      } catch {
        setPlans(fallbackPlans);
      } finally {
        setLoading(false);
      }
    };
    fetchPlans();
  }, []);

  const filteredPlans = plans.filter(p => p.period === activeTab);

  const totalPlans = plans.length;
  const tabCount = filteredPlans.length;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex flex-col items-center gap-3">
          <Loader className="animate-spin text-accent-blue" size={32} />
          <span className="text-xs font-mono text-text-secondary/50">Carregando planos...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold font-tactical tracking-widest text-text-primary">
            PLANOS E PRECOS
          </h1>
          <p className="text-xs font-mono text-text-secondary/50 mt-1">
            Total: {totalPlans} planos &bull; {tabs.find(t => t.id === activeTab)?.label}: {tabCount}
          </p>
        </div>
        <button
          onClick={() => navigate('/superadmin-preview/plans/novo')}
          className="flex items-center gap-2 px-4 py-2 bg-accent-blue/20 border border-accent-blue text-accent-blue rounded-lg text-xs font-tactical hover:bg-accent-blue/30 transition-colors"
        >
          <Plus size={14} /> NOVO PLANO
        </button>
      </div>

      {/* Tabs por solução */}
      <div className="flex gap-2">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-tactical tracking-wider transition-all ${
              activeTab === t.id
                ? 'bg-accent-blue/20 border border-accent-blue text-accent-blue'
                : 'bg-bg-tertiary/50 border border-border-color/30 text-text-secondary hover:text-text-primary'
            }`}
          >
            {getTabIcon(t.id)}
            {t.label}
          </button>
        ))}
      </div>

      {/* Grid de Planos */}
      {filteredPlans.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <DollarSign size={40} className="text-text-secondary/20 mb-3" />
          <p className="text-sm font-tactical text-text-secondary/50">Nenhum plano cadastrado para esta solucao</p>
          <button
            onClick={() => navigate('/superadmin-preview/plans/novo')}
            className="mt-4 flex items-center gap-2 px-4 py-2 bg-accent-blue/20 border border-accent-blue text-accent-blue rounded-lg text-xs font-tactical hover:bg-accent-blue/30 transition-colors"
          >
            <Plus size={14} /> Criar Primeiro Plano
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPlans.map((plan) => (
            <div
              key={plan.id}
              className={`bg-bg-secondary border rounded-xl p-6 relative transition-all hover:border-accent-blue/40 ${
                plan.highlighted
                  ? 'border-accent-blue/50 shadow-[0_0_20px_rgba(0,212,255,0.08)]'
                  : 'border-border-color/30'
              }`}
            >
              {/* Badge Popular */}
              {plan.highlighted && (
                <div className="absolute -top-2.5 right-4 bg-accent-blue text-bg-primary text-[9px] font-tactical font-bold px-3 py-0.5 rounded-full tracking-wider flex items-center gap-1">
                  <Star size={10} /> POPULAR
                </div>
              )}

              {/* Ícone do Plano */}
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 ${
                plan.highlighted ? 'bg-accent-blue/20 text-accent-blue' : 'bg-bg-tertiary text-text-secondary/60'
              }`}>
                {getPlanIcon(plan.name)}
              </div>

              {/* Nome */}
              <h4 className="text-lg font-tactical font-bold text-text-primary tracking-wider">
                {plan.name}
              </h4>

              {/* Preço */}
              <div className="mt-2 mb-4">
                <span className="text-3xl font-bold font-tactical text-accent-blue">
                  R$ {plan.price.toFixed(2).replace('.', ',')}
                </span>
                <span className="text-xs font-mono text-text-secondary/40">/mês</span>
              </div>

              {/* Meta info */}
              <div className="flex items-center gap-2 mb-4">
                <span className="text-[9px] font-mono text-text-secondary/40 bg-bg-tertiary/50 px-2 py-0.5 rounded">
                  {plan.period.toUpperCase()}
                </span>
                <span className="text-[9px] font-mono text-text-secondary/40 bg-bg-tertiary/50 px-2 py-0.5 rounded">
                  #{plan.sort_order}
                </span>
              </div>

              {/* Botão Editar */}
              <button
                onClick={() => navigate(`/superadmin-preview/plans/${plan.id}`)}
                className="w-full px-4 py-2 bg-accent-blue/20 border border-accent-blue text-accent-blue rounded-lg text-xs font-tactical hover:bg-accent-blue/30 transition-colors flex items-center justify-center gap-2"
              >
                <Edit size={14} /> Editar
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PlansPage;
