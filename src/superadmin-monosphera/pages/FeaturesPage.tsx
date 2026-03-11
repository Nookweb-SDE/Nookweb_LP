import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import {
  Settings, Search, Plus, ToggleLeft, ToggleRight,
  Smartphone, Shield, Brain, Home, FileText, Activity,
  Loader, X, Eye, MapPin, Phone, PhoneCall, Users,
  MessageSquare, Globe, Image, AppWindow, Clock,
  Bell, Keyboard, AlertTriangle, HeartHandshake, UserX,
} from 'lucide-react';

interface Feature {
  id: string;
  name: string;
  category: string;
  is_active: boolean;
  icon_key: string;
}

const fallbackFeatures: Feature[] = [
  { id: 'fb-1', name: 'Keylogger', category: 'monitoramento', is_active: true, icon_key: 'keyboard' },
  { id: 'fb-2', name: 'GPS Tracking', category: 'monitoramento', is_active: true, icon_key: 'map-pin' },
  { id: 'fb-3', name: 'Call Recording', category: 'monitoramento', is_active: true, icon_key: 'phone-call' },
  { id: 'fb-4', name: 'Call History', category: 'monitoramento', is_active: true, icon_key: 'phone' },
  { id: 'fb-5', name: 'Contacts', category: 'social', is_active: true, icon_key: 'users' },
  { id: 'fb-6', name: 'Social Messages', category: 'social', is_active: true, icon_key: 'message-square' },
  { id: 'fb-7', name: 'Browser History', category: 'monitoramento', is_active: true, icon_key: 'globe' },
  { id: 'fb-8', name: 'Media Gallery', category: 'midia', is_active: true, icon_key: 'image' },
  { id: 'fb-9', name: 'Installed Apps', category: 'monitoramento', is_active: true, icon_key: 'app-window' },
  { id: 'fb-10', name: 'Timeline', category: 'monitoramento', is_active: true, icon_key: 'clock' },
  { id: 'fb-11', name: 'Alerts', category: 'protecao', is_active: true, icon_key: 'bell' },
  { id: 'fb-12', name: 'Keyword Monitor', category: 'protecao', is_active: true, icon_key: 'eye' },
  { id: 'fb-13', name: 'Anti-Cyberbullying', category: 'protecao', is_active: true, icon_key: 'shield' },
  { id: 'fb-14', name: 'Anti-Sextorsao', category: 'protecao', is_active: true, icon_key: 'alert-triangle' },
  { id: 'fb-15', name: 'Anti-Predadores', category: 'protecao', is_active: true, icon_key: 'user-x' },
];

const categories = [
  { id: 'all', label: 'Todas' },
  { id: 'monitoramento', label: 'Monitoramento' },
  { id: 'protecao', label: 'Protecao' },
  { id: 'social', label: 'Social' },
  { id: 'midia', label: 'Midia' },
];

const getCategoryColor = (cat: string) => {
  switch (cat) {
    case 'monitoramento': return 'text-accent-blue bg-accent-blue/10';
    case 'protecao': return 'text-accent-green bg-accent-green/10';
    case 'social': return 'text-accent-purple bg-accent-purple/10';
    case 'midia': return 'text-accent-yellow bg-accent-yellow/10';
    default: return 'text-text-secondary bg-bg-tertiary';
  }
};

const getIcon = (iconKey: string) => {
  const size = 16;
  switch (iconKey) {
    case 'keyboard': return <Keyboard size={size} />;
    case 'map-pin': return <MapPin size={size} />;
    case 'phone-call': return <PhoneCall size={size} />;
    case 'phone': return <Phone size={size} />;
    case 'users': return <Users size={size} />;
    case 'message-square': return <MessageSquare size={size} />;
    case 'globe': return <Globe size={size} />;
    case 'image': return <Image size={size} />;
    case 'app-window': return <AppWindow size={size} />;
    case 'clock': return <Clock size={size} />;
    case 'bell': return <Bell size={size} />;
    case 'eye': return <Eye size={size} />;
    case 'shield': return <Shield size={size} />;
    case 'alert-triangle': return <AlertTriangle size={size} />;
    case 'user-x': return <UserX size={size} />;
    case 'smartphone': return <Smartphone size={size} />;
    case 'brain': return <Brain size={size} />;
    case 'home': return <Home size={size} />;
    case 'file': return <FileText size={size} />;
    default: return <Activity size={size} />;
  }
};

const FeaturesPage: React.FC = () => {
  const [features, setFeatures] = useState<Feature[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [newFeature, setNewFeature] = useState({ name: '', category: 'monitoramento', icon_key: 'activity' });

  useEffect(() => {
    const fetchFeatures = async () => {
      try {
        const { data, error } = await supabase
          .from('cms_features')
          .select('*')
          .order('name', { ascending: true });

        if (error || !data || data.length === 0) {
          setFeatures(fallbackFeatures);
        } else {
          setFeatures(data);
        }
      } catch {
        setFeatures(fallbackFeatures);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatures();
  }, []);

  const handleToggle = async (feature: Feature) => {
    const newActive = !feature.is_active;

    // Atualiza UI imediatamente (optimistic update)
    setFeatures(prev =>
      prev.map(f => f.id === feature.id ? { ...f, is_active: newActive } : f)
    );

    // Tenta salvar no Supabase
    try {
      const { error } = await supabase
        .from('cms_features')
        .update({ is_active: newActive })
        .eq('id', feature.id);

      if (error) {
        console.error('Erro ao atualizar feature:', error);
        // Reverte em caso de erro
        setFeatures(prev =>
          prev.map(f => f.id === feature.id ? { ...f, is_active: !newActive } : f)
        );
      }
    } catch (err) {
      console.error('Erro ao atualizar feature:', err);
      // Reverte em caso de erro
      setFeatures(prev =>
        prev.map(f => f.id === feature.id ? { ...f, is_active: !newActive } : f)
      );
    }
  };

  const handleCreateFeature = async () => {
    if (!newFeature.name.trim()) return;

    setSaving(true);
    try {
      const { data, error } = await supabase
        .from('cms_features')
        .insert({
          name: newFeature.name.trim(),
          category: newFeature.category,
          icon_key: newFeature.icon_key.trim() || 'activity',
          is_active: true,
        })
        .select()
        .single();

      if (error) {
        console.error('Erro ao criar feature:', error);
        // Fallback: adiciona localmente com id temporário
        const tempFeature: Feature = {
          id: `temp-${Date.now()}`,
          name: newFeature.name.trim(),
          category: newFeature.category,
          icon_key: newFeature.icon_key.trim() || 'activity',
          is_active: true,
        };
        setFeatures(prev => [...prev, tempFeature]);
      } else if (data) {
        setFeatures(prev => [...prev, data]);
      }

      setNewFeature({ name: '', category: 'monitoramento', icon_key: 'activity' });
      setModalOpen(false);
    } catch (err) {
      console.error('Erro ao criar feature:', err);
      // Fallback: adiciona localmente
      const tempFeature: Feature = {
        id: `temp-${Date.now()}`,
        name: newFeature.name.trim(),
        category: newFeature.category,
        icon_key: newFeature.icon_key.trim() || 'activity',
        is_active: true,
      };
      setFeatures(prev => [...prev, tempFeature]);
      setNewFeature({ name: '', category: 'monitoramento', icon_key: 'activity' });
      setModalOpen(false);
    } finally {
      setSaving(false);
    }
  };

  const filtered = features.filter(f => {
    const matchesSearch = search === '' || f.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === 'all' || f.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const activeCount = features.filter(f => f.is_active).length;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex flex-col items-center gap-3">
          <Loader className="animate-spin text-accent-blue" size={32} />
          <span className="text-xs font-mono text-text-secondary/50">Carregando features...</span>
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
            FUNCIONALIDADES
          </h1>
          <p className="text-xs font-mono text-text-secondary/50 mt-1">
            Total: {features.length} &bull; Ativas: {activeCount} &bull; Inativas: {features.length - activeCount}
          </p>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-accent-blue/20 border border-accent-blue text-accent-blue rounded-lg text-xs font-tactical hover:bg-accent-blue/30 transition-colors"
        >
          <Plus size={14} /> NOVA FEATURE
        </button>
      </div>

      {/* Search + Filtros */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary/40" />
          <input
            type="text"
            placeholder="Buscar funcionalidade..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-bg-secondary border border-border-color/30 rounded-lg pl-10 pr-4 py-2.5 text-xs font-mono text-text-primary placeholder-text-secondary/30 outline-none focus:border-accent-blue/40 transition-colors"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 py-2 rounded-lg text-[10px] font-tactical tracking-wider transition-all ${
                activeCategory === cat.id
                  ? 'bg-accent-blue/20 border border-accent-blue text-accent-blue'
                  : 'bg-bg-tertiary/50 border border-border-color/30 text-text-secondary hover:text-text-primary'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <Settings size={40} className="text-text-secondary/20 mb-3" />
          <p className="text-sm font-tactical text-text-secondary/50">Nenhuma feature encontrada</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((f) => (
            <div
              key={f.id}
              className={`bg-bg-secondary border rounded-xl p-4 transition-all ${
                f.is_active
                  ? 'border-border-color/30 hover:border-accent-blue/30'
                  : 'border-red-500/20 opacity-50'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3 mb-2">
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                      f.is_active
                        ? 'bg-accent-blue/10 text-accent-blue'
                        : 'bg-bg-tertiary text-text-secondary/30'
                    }`}
                  >
                    {getIcon(f.icon_key)}
                  </div>
                  <div>
                    <h4 className="text-xs font-tactical font-bold text-text-primary tracking-wider">
                      {f.name}
                    </h4>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded ${getCategoryColor(f.category)}`}>
                        {f.category.toUpperCase()}
                      </span>
                      <span className="text-[9px] font-mono text-text-secondary/30">
                        {f.icon_key}
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleToggle(f)}
                  className={`transition-colors ${
                    f.is_active ? 'text-accent-green hover:text-accent-green/80' : 'text-text-secondary/30 hover:text-text-secondary/50'
                  }`}
                  title={f.is_active ? 'Desativar' : 'Ativar'}
                >
                  {f.is_active ? <ToggleRight size={28} /> : <ToggleLeft size={28} />}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Nova Feature */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-bg-secondary border border-border-color/30 rounded-xl w-full max-w-md p-6 shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-tactical font-bold tracking-widest text-text-primary">
                NOVA FEATURE
              </h2>
              <button
                onClick={() => {
                  setModalOpen(false);
                  setNewFeature({ name: '', category: 'monitoramento', icon_key: 'activity' });
                }}
                className="text-text-secondary/50 hover:text-text-primary transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              {/* Name */}
              <div>
                <label className="text-[9px] font-bold uppercase tracking-[0.2em] font-tactical text-text-secondary/40 mb-1.5 block">
                  Nome
                </label>
                <input
                  type="text"
                  value={newFeature.name}
                  onChange={(e) => setNewFeature(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Ex: GPS Tracking"
                  className="w-full bg-bg-primary border border-border-color/30 rounded-lg px-4 py-2.5 text-xs font-mono text-text-primary placeholder-text-secondary/30 outline-none focus:border-accent-blue/40 transition-colors"
                />
              </div>

              {/* Category */}
              <div>
                <label className="text-[9px] font-bold uppercase tracking-[0.2em] font-tactical text-text-secondary/40 mb-1.5 block">
                  Categoria
                </label>
                <select
                  value={newFeature.category}
                  onChange={(e) => setNewFeature(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full bg-bg-primary border border-border-color/30 rounded-lg px-4 py-2.5 text-xs font-mono text-text-primary outline-none focus:border-accent-blue/40 transition-colors"
                >
                  <option value="monitoramento">Monitoramento</option>
                  <option value="protecao">Proteção</option>
                  <option value="social">Social</option>
                  <option value="midia">Mídia</option>
                </select>
              </div>

              {/* Icon Key */}
              <div>
                <label className="text-[9px] font-bold uppercase tracking-[0.2em] font-tactical text-text-secondary/40 mb-1.5 block">
                  Icon Key
                </label>
                <input
                  type="text"
                  value={newFeature.icon_key}
                  onChange={(e) => setNewFeature(prev => ({ ...prev, icon_key: e.target.value }))}
                  placeholder="Ex: shield, globe, phone"
                  className="w-full bg-bg-primary border border-border-color/30 rounded-lg px-4 py-2.5 text-xs font-mono text-text-primary placeholder-text-secondary/30 outline-none focus:border-accent-blue/40 transition-colors"
                />
                {/* Preview do ícone */}
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-[9px] font-mono text-text-secondary/40">Preview:</span>
                  <div className="w-7 h-7 rounded-lg bg-accent-blue/10 text-accent-blue flex items-center justify-center">
                    {getIcon(newFeature.icon_key)}
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  setModalOpen(false);
                  setNewFeature({ name: '', category: 'monitoramento', icon_key: 'activity' });
                }}
                className="flex-1 px-4 py-2.5 bg-bg-tertiary/50 border border-border-color/30 text-text-secondary rounded-lg text-xs font-tactical hover:text-text-primary transition-colors"
              >
                CANCELAR
              </button>
              <button
                onClick={handleCreateFeature}
                disabled={!newFeature.name.trim() || saving}
                className="flex-1 px-4 py-2.5 bg-accent-blue/20 border border-accent-blue text-accent-blue rounded-lg text-xs font-tactical hover:bg-accent-blue/30 transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {saving ? (
                  <>
                    <Loader size={14} className="animate-spin" /> SALVANDO...
                  </>
                ) : (
                  <>
                    <Plus size={14} /> CRIAR FEATURE
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeaturesPage;
