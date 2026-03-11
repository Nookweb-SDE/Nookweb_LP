import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { History, RotateCcw, Search, Clock, User, ChevronDown, ChevronRight, Eye, Loader, ArrowUpDown, Calendar } from 'lucide-react';

interface VersionChange {
  old: string | null;
  new: string | null;
}

interface VersionEntry {
  id: string;
  entity: string;
  entity_type: string;
  action: 'create' | 'update' | 'delete';
  user: string;
  changes: Record<string, VersionChange>;
  created_at: string;
}

const ENTITY_TYPES = [
  { value: 'all', label: 'Todos' },
  { value: 'plans', label: 'Planos' },
  { value: 'faqs', label: 'FAQs' },
  { value: 'menus', label: 'Menus' },
  { value: 'testimonials', label: 'Depoimentos' },
  { value: 'features', label: 'Features' },
  { value: 'pages', label: 'Paginas' },
  { value: 'languages', label: 'Idiomas' },
  { value: 'settings', label: 'Configuracoes' },
];

export default function VersionHistoryPage() {
  const [search, setSearch] = useState('');
  const [entityFilter, setEntityFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('');
  const [expanded, setExpanded] = useState<string | null>(null);
  const [snapshotView, setSnapshotView] = useState<string | null>(null);
  const [history, setHistory] = useState<VersionEntry[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchHistory = useCallback(async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('cms_version_history')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100);

      if (error || !data || data.length === 0) {
        setHistory([]);
      } else {
        setHistory(data);
      }
    } catch {
      setHistory([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  const filtered = history.filter(h => {
    // Filtro por entity_type
    if (entityFilter !== 'all' && h.entity_type !== entityFilter) return false;

    // Filtro por data
    if (dateFilter) {
      const entryDate = h.created_at.split('T')[0];
      if (entryDate !== dateFilter) return false;
    }

    // Filtro por busca
    if (search) {
      const s = search.toLowerCase();
      if (
        !h.entity.toLowerCase().includes(s) &&
        !h.entity_type.toLowerCase().includes(s) &&
        !h.user.toLowerCase().includes(s) &&
        !h.action.toLowerCase().includes(s)
      ) return false;
    }

    return true;
  });

  // Agrupar por data
  const groupedByDate = filtered.reduce<Record<string, VersionEntry[]>>((acc, entry) => {
    const dateKey = entry.created_at ? entry.created_at.split('T')[0] : 'unknown';
    if (!acc[dateKey]) acc[dateKey] = [];
    acc[dateKey].push(entry);
    return acc;
  }, {});

  const formatDate = (d: string) => {
    if (d === 'unknown') return 'Data desconhecida';
    try {
      const date = new Date(d + 'T00:00:00');
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);

      if (d === today.toISOString().split('T')[0]) return 'Hoje';
      if (d === yesterday.toISOString().split('T')[0]) return 'Ontem';
      return date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
    } catch {
      return d;
    }
  };

  const formatTime = (iso: string) => {
    try {
      const d = new Date(iso);
      return d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    } catch {
      return '--:--';
    }
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case 'create': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'update': return 'bg-accent-blue/20 text-accent-blue border-accent-blue/30';
      case 'delete': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getActionLabel = (action: string) => {
    switch (action) {
      case 'create': return 'CRIADO';
      case 'update': return 'ATUALIZADO';
      case 'delete': return 'DELETADO';
      default: return action.toUpperCase();
    }
  };

  const getEntityBadgeColor = (type: string) => {
    switch (type) {
      case 'plans': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      case 'faqs': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30';
      case 'menus': return 'bg-orange-500/10 text-orange-400 border-orange-500/30';
      case 'testimonials': return 'bg-purple-500/10 text-purple-400 border-purple-500/30';
      case 'features': return 'bg-pink-500/10 text-pink-400 border-pink-500/30';
      case 'pages': return 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30';
      case 'languages': return 'bg-teal-500/10 text-teal-400 border-teal-500/30';
      case 'settings': return 'bg-accent-blue/10 text-accent-blue border-accent-blue/30';
      default: return 'bg-gray-500/10 text-gray-400 border-gray-500/30';
    }
  };

  const getEntityDotColor = (type: string) => {
    switch (type) {
      case 'plans': return 'bg-emerald-400';
      case 'faqs': return 'bg-yellow-400';
      case 'menus': return 'bg-orange-400';
      case 'testimonials': return 'bg-purple-400';
      case 'features': return 'bg-pink-400';
      case 'pages': return 'bg-indigo-400';
      case 'languages': return 'bg-teal-400';
      case 'settings': return 'bg-accent-blue';
      default: return 'bg-gray-400';
    }
  };

  const handleToggleExpand = (id: string) => {
    setExpanded(prev => prev === id ? null : id);
    // Fecha o snapshot view quando colapsa
    if (expanded === id) {
      setSnapshotView(null);
    }
  };

  const handleViewSnapshot = (id: string) => {
    setSnapshotView(prev => prev === id ? null : id);
  };

  const handleRollback = (_entry: VersionEntry) => {
    alert('Rollback requer implementacao no backend. Em breve.');
  };

  return (
    <div className="h-full flex flex-col bg-bg-primary p-6 overflow-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-tactical font-bold tracking-widest text-text-primary">
            HISTORICO DE VERSOES
          </h1>
          <p className="text-xs font-mono text-text-secondary/50 mt-1">
            Timeline de todas as alteracoes no CMS
          </p>
        </div>
        <div className="text-xs text-text-secondary font-mono bg-bg-secondary border border-border-color/30 rounded-lg px-3 py-1.5">
          {loading ? (
            <span className="flex items-center gap-2">
              <Loader size={12} className="animate-spin text-accent-blue" /> Carregando...
            </span>
          ) : (
            <span>{history.length} registros</span>
          )}
        </div>
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        {/* Busca */}
        <div className="relative flex-1 min-w-[200px]">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary/50" />
          <input
            type="text"
            placeholder="Buscar por entidade, tipo, usuario..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-bg-secondary border border-border-color/30 rounded-lg pl-10 pr-4 py-2 text-text-primary text-sm font-mono focus:outline-none focus:border-accent-blue/50 placeholder:text-text-secondary/30"
          />
        </div>

        {/* Filtro por entity_type */}
        <div className="relative">
          <ArrowUpDown size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary/50 pointer-events-none" />
          <select
            value={entityFilter}
            onChange={e => setEntityFilter(e.target.value)}
            className="bg-bg-secondary border border-border-color/30 rounded-lg pl-9 pr-4 py-2 text-text-primary text-sm font-mono focus:outline-none focus:border-accent-blue/50 appearance-none cursor-pointer"
          >
            {ENTITY_TYPES.map(t => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>
        </div>

        {/* Filtro por data */}
        <div className="relative">
          <Calendar size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary/50 pointer-events-none" />
          <input
            type="date"
            value={dateFilter}
            onChange={e => setDateFilter(e.target.value)}
            className="bg-bg-secondary border border-border-color/30 rounded-lg pl-9 pr-4 py-2 text-text-primary text-sm font-mono focus:outline-none focus:border-accent-blue/50 cursor-pointer"
          />
          {dateFilter && (
            <button
              onClick={() => setDateFilter('')}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-text-secondary/50 hover:text-text-primary text-xs"
              title="Limpar filtro de data"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Contadores */}
      <div className="flex gap-3 mb-6 flex-wrap">
        <div className="bg-bg-secondary border border-border-color/30 rounded-lg px-3 py-1.5 text-[10px] font-mono text-text-secondary/60">
          Exibindo: <span className="text-accent-blue font-bold">{filtered.length}</span> de {history.length}
        </div>
        {entityFilter !== 'all' && (
          <div className="bg-accent-blue/10 border border-accent-blue/30 rounded-lg px-3 py-1.5 text-[10px] font-mono text-accent-blue">
            Tipo: {ENTITY_TYPES.find(t => t.value === entityFilter)?.label}
          </div>
        )}
        {dateFilter && (
          <div className="bg-accent-blue/10 border border-accent-blue/30 rounded-lg px-3 py-1.5 text-[10px] font-mono text-accent-blue">
            Data: {new Date(dateFilter + 'T00:00:00').toLocaleDateString('pt-BR')}
          </div>
        )}
      </div>

      {/* Timeline */}
      <div className="space-y-6">
        {Object.entries(groupedByDate).map(([date, entries]) => (
          <div key={date}>
            {/* Separador de data */}
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px flex-1 bg-border-color/20" />
              <span className="text-[10px] text-text-secondary/60 font-mono bg-bg-secondary border border-border-color/20 rounded-full px-3 py-1">
                <Clock size={10} className="inline mr-1.5 -mt-0.5" />
                {formatDate(date)}
              </span>
              <div className="h-px flex-1 bg-border-color/20" />
            </div>

            {/* Entries */}
            <div className="space-y-2">
              {entries.map(entry => {
                const hasChanges = Object.keys(entry.changes).length > 0;
                const isExpanded = expanded === entry.id;
                const isSnapshotOpen = snapshotView === entry.id;

                return (
                  <div
                    key={entry.id}
                    className={`bg-bg-secondary border rounded-xl overflow-hidden transition-all ${
                      isExpanded ? 'border-accent-blue/30' : 'border-border-color/30'
                    }`}
                  >
                    {/* Entry Row */}
                    <button
                      onClick={() => handleToggleExpand(entry.id)}
                      className="w-full flex items-center gap-4 p-4 text-left hover:bg-white/[0.02] transition-colors"
                    >
                      {/* Timeline dot */}
                      <div className={`w-3 h-3 rounded-full shrink-0 ${getEntityDotColor(entry.entity_type)}`} />

                      {/* Time */}
                      <span className="text-[11px] text-text-secondary/60 font-mono w-12 shrink-0">
                        {formatTime(entry.created_at)}
                      </span>

                      {/* Action badge */}
                      <span className={`text-[9px] px-2 py-0.5 rounded-full border font-tactical tracking-wider shrink-0 ${getActionColor(entry.action)}`}>
                        {getActionLabel(entry.action)}
                      </span>

                      {/* Entity type badge */}
                      <span className={`text-[9px] px-2 py-0.5 rounded-full border font-mono shrink-0 ${getEntityBadgeColor(entry.entity_type)}`}>
                        {entry.entity_type}
                      </span>

                      {/* Entity name */}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-tactical text-text-primary truncate">
                          {entry.entity}
                        </p>
                      </div>

                      {/* User */}
                      <div className="flex items-center gap-2 shrink-0">
                        <div className="w-6 h-6 rounded-full bg-accent-blue/20 flex items-center justify-center">
                          <User size={10} className="text-accent-blue" />
                        </div>
                        <span className="text-[10px] text-text-secondary/50 font-mono hidden lg:block">
                          {entry.user}
                        </span>
                      </div>

                      {/* Expand icon */}
                      {isExpanded
                        ? <ChevronDown size={16} className="text-accent-blue shrink-0" />
                        : <ChevronRight size={16} className="text-text-secondary/40 shrink-0" />
                      }
                    </button>

                    {/* Expanded Details */}
                    {isExpanded && (
                      <div className="px-4 pb-4 border-t border-border-color/20">
                        {/* Changes summary */}
                        {hasChanges && (
                          <div className="mt-3 space-y-2">
                            <p className="text-[9px] font-bold uppercase tracking-[0.2em] font-tactical text-text-secondary/40">
                              Alteracoes
                            </p>
                            {Object.entries(entry.changes).map(([field, change]) => (
                              <div key={field} className="flex items-start gap-3 bg-bg-primary rounded-lg p-3">
                                <span className="text-[10px] text-text-secondary font-mono w-32 shrink-0 font-bold">
                                  {field}
                                </span>
                                <div className="flex-1 flex items-center gap-2 flex-wrap">
                                  {change.old !== null && (
                                    <span className="text-[10px] font-mono text-red-400 bg-red-500/10 px-2 py-0.5 rounded line-through">
                                      {change.old}
                                    </span>
                                  )}
                                  {change.old !== null && change.new !== null && (
                                    <span className="text-text-secondary/40 text-[10px]">→</span>
                                  )}
                                  {change.new !== null && (
                                    <span className="text-[10px] font-mono text-green-400 bg-green-500/10 px-2 py-0.5 rounded">
                                      {change.new}
                                    </span>
                                  )}
                                  {change.old === null && change.new !== null && (
                                    <span className="text-[9px] font-mono text-text-secondary/30 ml-1">(novo)</span>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        {!hasChanges && (
                          <div className="mt-3 bg-bg-primary rounded-lg p-3">
                            <p className="text-[10px] font-mono text-text-secondary/40">
                              Nenhum detalhe de alteracao registrado para esta acao.
                            </p>
                          </div>
                        )}

                        {/* Snapshot JSON view */}
                        {isSnapshotOpen && (
                          <div className="mt-3">
                            <p className="text-[9px] font-bold uppercase tracking-[0.2em] font-tactical text-text-secondary/40 mb-2">
                              Snapshot JSON
                            </p>
                            <pre className="bg-bg-primary border border-border-color/20 rounded-lg p-3 text-[10px] font-mono text-accent-blue overflow-x-auto max-h-48 overflow-y-auto">
                              {JSON.stringify(entry, null, 2)}
                            </pre>
                          </div>
                        )}

                        {/* Action buttons */}
                        <div className="flex gap-2 mt-3">
                          <button
                            onClick={() => handleViewSnapshot(entry.id)}
                            className={`flex items-center gap-1.5 text-xs font-tactical tracking-wider transition-colors px-3 py-1.5 rounded-lg ${
                              isSnapshotOpen
                                ? 'text-accent-blue bg-accent-blue/20 border border-accent-blue/30'
                                : 'text-accent-blue hover:text-accent-blue/80 bg-accent-blue/10 hover:bg-accent-blue/20'
                            }`}
                          >
                            <Eye size={12} />
                            {isSnapshotOpen ? 'Ocultar Snapshot' : 'Ver Snapshot'}
                          </button>
                          <button
                            onClick={() => handleRollback(entry)}
                            className="flex items-center gap-1.5 text-xs text-yellow-400 hover:text-yellow-400/80 transition-colors bg-yellow-400/10 hover:bg-yellow-400/20 px-3 py-1.5 rounded-lg font-tactical tracking-wider"
                          >
                            <RotateCcw size={12} />
                            Rollback
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Empty state */}
      {filtered.length === 0 && !loading && (
        <div className="text-center py-12">
          <History size={48} className="text-text-secondary mx-auto mb-3 opacity-30" />
          <p className="text-text-secondary font-mono text-sm">Nenhum registro encontrado</p>
          <p className="text-text-secondary/40 font-mono text-xs mt-1">
            Tente ajustar os filtros de busca
          </p>
        </div>
      )}
    </div>
  );
}
