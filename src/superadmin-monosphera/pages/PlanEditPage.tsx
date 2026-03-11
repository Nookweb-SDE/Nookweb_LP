import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { ArrowLeft, Save, Check, X, ToggleLeft, ToggleRight, Loader } from 'lucide-react';

const allFeatures = [
  'Keylogger', 'GPS Tracking', 'Call Recording', 'Call History', 'Contacts', 'Social Messages',
  'Browser History', 'Media Gallery', 'Installed Apps', 'Timeline', 'Alerts', 'Keyword Monitor',
  'Anti-Cyberbullying', 'Anti-Sextorsao', 'Anti-Predadores',
];

const PlanEditPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState('Premium');
  const [slug, setSlug] = useState('premium-parental');
  const [solution, setSolution] = useState('parental');
  const [priceMonthly, setPriceMonthly] = useState('79.90');
  const [priceAnnual, setPriceAnnual] = useState('63.90');
  const [deviceLimit, setDeviceLimit] = useState('5');
  const [badge, setBadge] = useState('POPULAR');
  const [cta, setCta] = useState('Comecar Agora');
  const [isActive, setIsActive] = useState(true);
  const [sortOrder, setSortOrder] = useState('3');
  const [enabledFeatures, setEnabledFeatures] = useState<string[]>(['Keylogger', 'GPS Tracking', 'Call Recording', 'Call History', 'Contacts', 'Social Messages', 'Browser History', 'Media Gallery', 'Anti-Cyberbullying', 'Anti-Sextorsao', 'Anti-Predadores']);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchPlan = async () => {
      if (!id || id === 'novo') return;
      setLoading(true);
      try {
        const { data: planData } = await supabase
          .from('cms_plans')
          .select('*')
          .eq('id', id)
          .single();

        if (planData) {
          setName(planData.name || '');
          setSlug(planData.slug || '');
          setSolution(planData.solution || 'parental');
          setPriceMonthly(String(planData.price_monthly || planData.priceMonthly || '79.90'));
          setPriceAnnual(String(planData.price_annual || planData.priceAnnual || '63.90'));
          setDeviceLimit(String(planData.device_limit || planData.deviceLimit || '5'));
          setBadge(planData.badge || '');
          setCta(planData.cta_text || planData.cta || 'Comecar Agora');
          setIsActive(planData.is_active !== undefined ? planData.is_active : true);
          setSortOrder(String(planData.sort_order || planData.sortOrder || '1'));
          setEnabledFeatures(planData.features || []);
        }
      } catch (err) {
        console.error('Erro ao buscar plano:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPlan();
  }, [id]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const priceVal = parseFloat(priceMonthly) || 0;
      const payload = {
        name,
        slug: slug || `plan-${solution}-${Date.now()}`,
        price: String(priceVal),
        period: solution,
        highlighted: badge === 'POPULAR',
        sort_order: parseInt(sortOrder) || 0,
      };

      if (id && id !== 'novo') {
        const { error } = await supabase.from('cms_plans').update(payload).eq('id', id);
        if (error) throw error;
        navigate('/superadmin-preview/plans');
        return;
      }
      const { error } = await supabase.from('cms_plans').insert(payload);
      if (error) throw error;
      navigate('/superadmin-preview/plans');
    } catch (err: any) {
      console.error('Erro ao salvar plano:', err);
      alert('Erro ao salvar: ' + (err?.message || 'Tente novamente'));
    } finally {
      setSaving(false);
    }
  };

  const toggleFeature = (f: string) => {
    setEnabledFeatures(prev => prev.includes(f) ? prev.filter(x => x !== f) : [...prev, f]);
  };

  const InputField = ({ label, value, onChange, type = 'text' }: any) => (
    <div>
      <label className="text-[10px] font-mono text-text-secondary/60 block mb-1 uppercase">{label}</label>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)}
        className="w-full bg-bg-tertiary border border-border-color/30 rounded-lg px-3 py-2 text-xs font-mono text-text-primary outline-none focus:border-accent-blue/40" />
    </div>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader size={24} className="animate-spin text-accent-blue" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/superadmin-preview/plans" className="p-2 bg-bg-tertiary border border-border-color/30 rounded-lg hover:border-accent-blue/30 transition-colors"><ArrowLeft size={16} className="text-text-secondary" /></Link>
          <div>
            <h1 className="text-2xl font-bold font-tactical tracking-widest text-text-primary">EDITAR PLANO</h1>
            <p className="text-xs font-mono text-text-secondary/50 mt-1">ID: {id || 'novo'}</p>
          </div>
        </div>
        <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-4 py-2 bg-accent-blue text-bg-primary rounded-lg text-xs font-tactical font-bold hover:bg-accent-blue/80 transition-colors disabled:opacity-50">
          {saving ? <Loader size={14} className="animate-spin" /> : <Save size={14} />} SALVAR
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form */}
        <div className="lg:col-span-2 space-y-4">
          <div className="glass-card border border-border-color/30 rounded-lg p-6 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] font-tactical text-text-secondary/50 mb-2">Informacoes do Plano</h3>
            <div className="grid grid-cols-2 gap-4">
              <InputField label="Nome" value={name} onChange={setName} />
              <InputField label="Slug" value={slug} onChange={setSlug} />
            </div>
            <div>
              <label className="text-[10px] font-mono text-text-secondary/60 block mb-1 uppercase">Solução</label>
              <select value={solution} onChange={(e) => setSolution(e.target.value)}
                className="w-full bg-bg-tertiary border border-border-color/30 rounded-lg px-3 py-2 text-xs font-mono text-text-primary outline-none focus:border-accent-blue/40">
                <option value="parental">Controle Parental</option><option value="comercial">Comercial</option><option value="panico">Panico</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <InputField label="Preco Mensal (R$)" value={priceMonthly} onChange={setPriceMonthly} type="number" />
              <InputField label="Preco Anual (R$)" value={priceAnnual} onChange={setPriceAnnual} type="number" />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <InputField label="Limite Dispositivos" value={deviceLimit} onChange={setDeviceLimit} type="number" />
              <InputField label="Badge" value={badge} onChange={setBadge} />
              <InputField label="Ordem" value={sortOrder} onChange={setSortOrder} type="number" />
            </div>
            <InputField label="Texto CTA" value={cta} onChange={setCta} />
            <div className="flex items-center justify-between mt-2">
              <span className="text-xs font-mono text-text-secondary">Status</span>
              <button onClick={() => setIsActive(!isActive)} className={isActive ? 'text-accent-green' : 'text-text-secondary/30'}>
                {isActive ? <ToggleRight size={28} /> : <ToggleLeft size={28} />}
              </button>
            </div>
          </div>

          <div className="glass-card border border-border-color/30 rounded-lg p-6">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] font-tactical text-text-secondary/50 mb-4">Funcionalidades Incluidas</h3>
            <div className="grid grid-cols-2 gap-2">
              {allFeatures.map((f) => (
                <button key={f} onClick={() => toggleFeature(f)}
                  className={`flex items-center gap-2 p-2 rounded-lg text-xs font-mono transition-all ${enabledFeatures.includes(f) ? 'bg-accent-green/10 border border-accent-green/30 text-accent-green' : 'bg-bg-tertiary/50 border border-border-color/20 text-text-secondary/50'}`}>
                  {enabledFeatures.includes(f) ? <Check size={14} /> : <X size={14} />} {f}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Preview */}
        <div className="glass-card border border-border-color/30 rounded-lg p-6 h-fit sticky top-6">
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] font-tactical text-text-secondary/50 mb-4">Preview do Card</h3>
          <div className="bg-bg-tertiary/50 border border-border-color/20 rounded-lg p-4 relative">
            {badge && <div className="absolute -top-2 right-3 bg-accent-blue text-bg-primary text-[8px] font-tactical font-bold px-2 py-0.5 rounded-full">{badge}</div>}
            <h4 className="text-sm font-tactical font-bold text-text-primary">{name}</h4>
            <div className="mt-2"><span className="text-2xl font-bold font-tactical text-accent-blue">R$ {Number(priceMonthly).toFixed(2).replace('.', ',')}</span><span className="text-[10px] font-mono text-text-secondary/40">/mês</span></div>
            <p className="text-[9px] font-mono text-accent-green mt-1">Anual: R$ {Number(priceAnnual).toFixed(2).replace('.', ',')}/mês</p>
            <p className="text-[9px] font-mono text-text-secondary/40 mt-2">Até {deviceLimit} dispositivos</p>
            <div className="mt-3 space-y-1">
              {enabledFeatures.slice(0, 6).map((f, i) => (
                <div key={i} className="flex items-center gap-1 text-[9px] font-mono text-text-secondary"><Check size={10} className="text-accent-green" /> {f}</div>
              ))}
              {enabledFeatures.length > 6 && <p className="text-[9px] font-mono text-accent-blue">+{enabledFeatures.length - 6} mais...</p>}
            </div>
            <button className="w-full mt-3 px-3 py-1.5 bg-accent-blue text-bg-primary rounded text-[10px] font-tactical font-bold">{cta}</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanEditPage;
