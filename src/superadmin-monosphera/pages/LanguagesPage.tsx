import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Globe, Search, Plus, Check, X, Star, ChevronDown, ChevronUp, Edit2, Eye, EyeOff, Loader } from 'lucide-react';

interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  isPrimary: boolean;
  active: boolean;
  completion: number;
  translatedKeys: number;
  totalKeys: number;
}

export default function LanguagesPage() {
  const [search, setSearch] = useState('');
  const [tab, setTab] = useState<'primary' | 'extended'>('primary');
  const [showExtended, setShowExtended] = useState(false);
  const [languages, setLanguages] = useState<{ primary: Language[]; extended: Language[] }>({ primary: [], extended: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLanguages();
  }, []);

  async function fetchLanguages() {
    setLoading(true);
    try {
      const { data: langData, error } = await supabase
        .from('cms_languages')
        .select('*')
        .order('sort_order');

      if (error || !langData || langData.length === 0) {
        setLanguages({ primary: [], extended: [] });
      } else {
        const mapped = langData.map(l => ({
          code: l.code,
          name: l.name,
          nativeName: l.native_name || l.nativeName,
          flag: l.flag,
          isPrimary: l.is_primary || l.isPrimary,
          active: l.active,
          completion: l.completion,
          translatedKeys: l.translated_keys || l.translatedKeys,
          totalKeys: l.total_keys || l.totalKeys,
        }));
        const primary = mapped.filter(l => l.isPrimary);
        const extended = mapped.filter(l => !l.isPrimary);
        setLanguages({ primary, extended });
      }
    } catch (err) {
      console.error('Erro ao buscar idiomas:', err);
      setLanguages({ primary: [], extended: [] });
    } finally {
      setLoading(false);
    }
  }

  const currentList = tab === 'primary' ? languages.primary : languages.extended;
  const filtered = currentList.filter(l =>
    l.name.toLowerCase().includes(search.toLowerCase()) ||
    l.nativeName.toLowerCase().includes(search.toLowerCase()) ||
    l.code.toLowerCase().includes(search.toLowerCase())
  );

  const totalActive = [...languages.primary, ...languages.extended].filter(l => l.active).length;
  const avgCompletion = languages.primary.length + languages.extended.length > 0
    ? Math.round(
        [...languages.primary, ...languages.extended].reduce((s, l) => s + l.completion, 0) /
        (languages.primary.length + languages.extended.length)
      )
    : 0;

  const toggleActive = (code: string) => {
    const key = tab === 'primary' ? 'primary' : 'extended';
    setLanguages(prev => ({
      ...prev,
      [key]: prev[key].map(l => l.code === code ? { ...l, active: !l.active } : l)
    }));
  };

  const getCompletionColor = (pct: number) => {
    if (pct >= 90) return 'bg-emerald-500';
    if (pct >= 70) return 'bg-accent-blue';
    if (pct >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center bg-bg-primary">
        <Loader className="animate-spin text-accent-blue" size={32} />
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-bg-primary p-6 overflow-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-tactical text-white">Idiomas</h1>
          <p className="text-sm text-text-secondary mt-1">Gerenciamento de traduções e idiomas do site</p>
        </div>
        <button
          className="flex items-center gap-2 bg-accent-blue/20 border border-accent-blue text-accent-blue px-4 py-2 rounded-lg font-medium hover:bg-accent-blue/30 transition-colors disabled:opacity-50"
          disabled
          title="Requer integracao com tabela cms_languages no Supabase"
        >
          <Plus size={16} />
          Adicionar Idioma
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total Idiomas', value: languages.primary.length + languages.extended.length, icon: Globe, color: 'text-accent-blue' },
          { label: 'Primários (Header)', value: languages.primary.length, icon: Star, color: 'text-yellow-400' },
          { label: 'Ativos', value: totalActive, icon: Check, color: 'text-emerald-400' },
          { label: 'Completude Média', value: `${avgCompletion}%`, icon: Globe, color: 'text-purple-400' },
        ].map((stat, i) => (
          <div key={i} className="bg-bg-secondary border border-border-color/30 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-text-secondary font-mono uppercase">{stat.label}</span>
              <stat.icon size={16} className={stat.color} />
            </div>
            <p className={`text-2xl font-tactical ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-4 mb-4">
        <div className="flex bg-bg-secondary rounded-lg p-1 border border-border-color/30">
          {(['primary', 'extended'] as const).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                tab === t ? 'bg-accent-blue text-bg-primary' : 'text-text-secondary hover:text-white'
              }`}
            >
              {t === 'primary' ? `Primários (${languages.primary.length})` : `Estendidos (${languages.extended.length})`}
            </button>
          ))}
        </div>
        <div className="flex-1 relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
          <input
            type="text"
            placeholder="Buscar idioma..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-bg-secondary border border-border-color/30 rounded-lg pl-10 pr-4 py-2 text-white text-sm focus:outline-none focus:border-accent-blue/50"
          />
        </div>
      </div>

      {/* Languages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map(lang => (
          <div
            key={lang.code}
            className={`bg-bg-secondary border rounded-xl p-4 transition-all ${
              lang.active ? 'border-accent-blue/30' : 'border-border-color/30 opacity-60'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{lang.flag}</span>
                <div>
                  <p className="text-white font-medium text-sm">{lang.nativeName}</p>
                  <p className="text-text-secondary text-xs">{lang.name}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {lang.isPrimary && (
                  <Star size={14} className="text-yellow-400 fill-yellow-400" />
                )}
                <button
                  onClick={() => toggleActive(lang.code)}
                  className={`p-1 rounded transition-colors ${
                    lang.active ? 'text-emerald-400 hover:bg-emerald-400/10' : 'text-text-secondary hover:bg-white/5'
                  }`}
                >
                  {lang.active ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
              </div>
            </div>

            <div className="mb-2">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-text-secondary font-mono">{lang.code}</span>
                <span className="text-xs text-text-secondary">{lang.completion}%</span>
              </div>
              <div className="h-2 bg-bg-primary rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${getCompletionColor(lang.completion)}`}
                  style={{ width: `${lang.completion}%` }}
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="text-text-secondary">
                {lang.translatedKeys.toLocaleString()} / {lang.totalKeys.toLocaleString()} chaves
              </span>
              <button className="text-text-secondary/40 cursor-not-allowed flex items-center gap-1" disabled title="Edicao requer integracao">
                <Edit2 size={12} />
                Editar
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Info */}
      <div className="mt-6 bg-bg-secondary border border-border-color/30 rounded-xl p-4">
        <h3 className="text-white font-tactical text-sm mb-2">Detecção Automática por IP</h3>
        <p className="text-text-secondary text-xs">
          O idioma do visitante é detectado automaticamente via Cloudflare <code className="text-accent-blue font-mono">cdn-cgi/trace</code>.
          Idiomas primários aparecem no dropdown do header. Idiomas estendidos ficam disponíveis nas configurações do dashboard.
        </p>
        <div className="flex gap-4 mt-3">
          <div className="text-xs text-text-secondary">
            <span className="text-accent-blue font-mono">20</span> idiomas no header
          </div>
          <div className="text-xs text-text-secondary">
            <span className="text-accent-blue font-mono">80+</span> idiomas estendidos
          </div>
          <div className="text-xs text-text-secondary">
            <span className="text-accent-blue font-mono">195</span> países suportados
          </div>
        </div>
      </div>
    </div>
  );
}
