import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { FileText, Plus, Edit, Eye, Copy, Loader, Trash2, X, Globe, FileCode, LayoutTemplate, PenTool } from 'lucide-react';

/* ───────────────────── Types ───────────────────── */
interface PageItem {
  id: string;
  title: string;
  slug: string;
  template: string;
  status: string;
  created_at: string;
  updated_at: string;
}

interface ModalForm {
  title: string;
  slug: string;
  template: string;
  status: string;
}

const TEMPLATE_OPTIONS = ['landing', 'solucao', 'pricing', 'blog', 'faq', 'texto'];
const STATUS_OPTIONS = ['publicado', 'rascunho'];

const EMPTY_FORM: ModalForm = { title: '', slug: '', template: 'landing', status: 'publicado' };

/* ───────────────────── Helpers ───────────────────── */
const generateId = () => `pg_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
const todayISO = () => new Date().toISOString().split('T')[0];

const formatDate = (dateStr: string | null) => {
  if (!dateStr) return '-';
  return new Date(dateStr).toLocaleDateString('pt-BR');
};

const templateIcon = (t: string) => {
  switch (t) {
    case 'landing': return <Globe size={12} />;
    case 'solucao': return <FileCode size={12} />;
    case 'pricing': return <LayoutTemplate size={12} />;
    case 'blog': return <PenTool size={12} />;
    default: return <FileText size={12} />;
  }
};

const templateColor = (t: string) => {
  switch (t) {
    case 'landing': return 'text-accent-blue bg-accent-blue/10 border-accent-blue/30';
    case 'solucao': return 'text-accent-purple bg-accent-purple/10 border-accent-purple/30';
    case 'pricing': return 'text-accent-green bg-accent-green/10 border-accent-green/30';
    case 'blog': return 'text-accent-yellow bg-accent-yellow/10 border-accent-yellow/30';
    case 'faq': return 'text-cyan-400 bg-cyan-400/10 border-cyan-400/30';
    case 'texto': return 'text-text-secondary bg-text-secondary/10 border-text-secondary/30';
    default: return 'text-text-secondary bg-text-secondary/10 border-text-secondary/30';
  }
};

/* ───────────────────── Component ───────────────────── */
const PagesPage: React.FC = () => {
  const [pages, setPages] = useState<PageItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [usingFallback, setUsingFallback] = useState(false);

  // Modal
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<ModalForm>({ ...EMPTY_FORM });
  const [saving, setSaving] = useState(false);

  /* ─── Fetch ─── */
  const fetchPages = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('cms_pages')
        .select('*')
        .order('created_at', { ascending: true });

      if (error || !data || data.length === 0) {
        setPages([]);
        setUsingFallback(false);
      } else {
        setPages(data);
        setUsingFallback(false);
      }
    } catch {
      setPages([]);
      setUsingFallback(false);
    }
    setLoading(false);
  }, []);

  useEffect(() => { fetchPages(); }, [fetchPages]);

  /* ─── Modal helpers ─── */
  const openCreateModal = () => {
    setForm({ ...EMPTY_FORM });
    setEditingId(null);
    setModalMode('create');
    setModalOpen(true);
  };

  const openEditModal = (page: PageItem) => {
    setForm({ title: page.title, slug: page.slug, template: page.template, status: page.status });
    setEditingId(page.id);
    setModalMode('edit');
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingId(null);
    setForm({ ...EMPTY_FORM });
    setSaving(false);
  };

  /* ─── CRUD ─── */
  const handleSave = async () => {
    if (!form.title.trim() || !form.slug.trim()) return;
    setSaving(true);

    if (usingFallback) {
      // Modo local — sem Supabase
      if (modalMode === 'create') {
        const newPage: PageItem = {
          id: generateId(),
          title: form.title.trim(),
          slug: form.slug.trim(),
          template: form.template,
          status: form.status,
          created_at: todayISO(),
          updated_at: todayISO(),
        };
        setPages(prev => [...prev, newPage]);
      } else if (editingId) {
        setPages(prev =>
          prev.map(p =>
            p.id === editingId
              ? { ...p, title: form.title.trim(), slug: form.slug.trim(), template: form.template, status: form.status, updated_at: todayISO() }
              : p
          )
        );
      }
      closeModal();
      return;
    }

    // Modo Supabase
    try {
      if (modalMode === 'create') {
        const { error } = await supabase.from('cms_pages').insert({
          title: form.title.trim(),
          slug: form.slug.trim(),
          meta_description: form.template,
          content: form.status || '',
          updated_at: todayISO(),
        });
        if (error) throw error;
      } else if (editingId) {
        const { error } = await supabase.from('cms_pages').update({
          title: form.title.trim(),
          slug: form.slug.trim(),
          meta_description: form.template,
          content: form.status || '',
          updated_at: todayISO(),
        }).eq('id', editingId);
        if (error) throw error;
      }
      await fetchPages();
    } catch (err: any) {
      console.error('Erro ao salvar:', err);
      alert('Erro ao salvar: ' + (err?.message || 'Tente novamente'));
    }
    closeModal();
  };

  const handlePreview = (slug: string) => {
    window.open(slug, '_blank');
  };

  const handleDuplicate = async (page: PageItem) => {
    const duplicated: PageItem = {
      ...page,
      id: generateId(),
      title: `${page.title} (Copia)`,
      slug: `${page.slug}-copia`,
      created_at: todayISO(),
      updated_at: todayISO(),
    };

    if (usingFallback) {
      setPages(prev => [...prev, duplicated]);
      return;
    }

    try {
      const { error } = await supabase.from('cms_pages').insert({
        title: duplicated.title,
        slug: duplicated.slug,
        meta_description: duplicated.template,
        content: duplicated.status || '',
        updated_at: duplicated.updated_at,
      });
      if (error) throw error;
      await fetchPages();
    } catch (err) {
      console.error('Erro ao duplicar:', err);
      // Fallback local se Supabase falhar
      setPages(prev => [...prev, duplicated]);
    }
  };

  const handleDelete = async (page: PageItem) => {
    if (!confirm(`Deletar "${page.title}"? Esta acao nao pode ser desfeita.`)) return;

    if (usingFallback) {
      setPages(prev => prev.filter(p => p.id !== page.id));
      return;
    }

    try {
      const { error } = await supabase.from('cms_pages').delete().eq('id', page.id);
      if (error) throw error;
      await fetchPages();
    } catch (err) {
      console.error('Erro ao deletar:', err);
      // Fallback local
      setPages(prev => prev.filter(p => p.id !== page.id));
    }
  };

  /* ─── Stats ─── */
  const totalPages = pages.length;
  const publicadas = pages.filter(p => p.status === 'publicado').length;
  const rascunhos = pages.filter(p => p.status === 'rascunho').length;
  const uniqueTemplates = new Set(pages.map(p => p.template)).size;

  /* ─── Auto-slug ─── */
  const handleTitleChange = (value: string) => {
    setForm(prev => ({
      ...prev,
      title: value,
      slug: modalMode === 'create'
        ? '/' + value
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-|-$/g, '')
        : prev.slug,
    }));
  };

  /* ─── Loading ─── */
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader className="animate-spin text-accent-blue" size={32} />
      </div>
    );
  }

  /* ─── Render ─── */
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold font-tactical tracking-widest text-text-primary">PAGINAS</h1>
          <p className="text-xs font-mono text-text-secondary/50 mt-1">
            {totalPages} paginas do site
            {usingFallback && (
              <span className="ml-2 text-accent-yellow/70">[modo local]</span>
            )}
          </p>
        </div>
        <button
          onClick={openCreateModal}
          className="flex items-center gap-2 px-4 py-2 bg-accent-blue/20 border border-accent-blue text-accent-blue rounded-lg text-xs font-tactical hover:bg-accent-blue/30 transition-colors"
        >
          <Plus size={14} /> NOVA PAGINA
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4">
        <div className="glass-card rounded-lg p-4 border border-border-color/30">
          <div className="text-[10px] font-tactical font-bold uppercase tracking-widest text-text-secondary/50 mb-1">Total Paginas</div>
          <div className="text-2xl font-bold font-mono text-accent-blue">{totalPages}</div>
        </div>
        <div className="glass-card rounded-lg p-4 border border-border-color/30">
          <div className="text-[10px] font-tactical font-bold uppercase tracking-widest text-text-secondary/50 mb-1">Publicadas</div>
          <div className="text-2xl font-bold font-mono text-accent-green">{publicadas}</div>
        </div>
        <div className="glass-card rounded-lg p-4 border border-border-color/30">
          <div className="text-[10px] font-tactical font-bold uppercase tracking-widest text-text-secondary/50 mb-1">Rascunho</div>
          <div className="text-2xl font-bold font-mono text-accent-yellow">{rascunhos}</div>
        </div>
        <div className="glass-card rounded-lg p-4 border border-border-color/30">
          <div className="text-[10px] font-tactical font-bold uppercase tracking-widest text-text-secondary/50 mb-1">Templates</div>
          <div className="text-2xl font-bold font-mono text-accent-purple">{uniqueTemplates}</div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-bg-secondary rounded-lg border border-border-color/30 overflow-hidden">
        {/* Header row */}
        <div className="grid grid-cols-12 gap-4 p-3 bg-bg-tertiary border-b border-border-color text-[10px] font-bold text-text-secondary uppercase tracking-wider">
          <div className="col-span-3">Titulo</div>
          <div className="col-span-2">Slug</div>
          <div className="col-span-2">Template</div>
          <div className="col-span-1">Status</div>
          <div className="col-span-2">Atualizado</div>
          <div className="col-span-2 text-right">Acoes</div>
        </div>

        {/* Rows */}
        {pages.length === 0 ? (
          <div className="p-8 text-center text-text-secondary/40 text-xs font-mono">
            Nenhuma pagina encontrada. Clique em "NOVA PAGINA" para criar.
          </div>
        ) : (
          pages.map((p) => (
            <div
              key={p.id}
              className="grid grid-cols-12 gap-4 p-3 border-b border-border-color/20 hover:bg-bg-tertiary/30 transition-colors items-center group"
            >
              {/* Title */}
              <div className="col-span-3 flex items-center gap-2">
                <FileText size={14} className="text-accent-blue flex-shrink-0" />
                <span className="text-xs font-tactical font-bold text-text-primary truncate">{p.title}</span>
              </div>

              {/* Slug */}
              <div className="col-span-2 text-[10px] font-mono text-accent-blue truncate">{p.slug}</div>

              {/* Template badge */}
              <div className="col-span-2">
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[9px] font-mono font-bold border ${templateColor(p.template)}`}>
                  {templateIcon(p.template)}
                  {p.template}
                </span>
              </div>

              {/* Status */}
              <div className="col-span-1">
                <span className={`inline-block px-2 py-0.5 rounded text-[9px] font-mono font-bold ${
                  p.status === 'publicado'
                    ? 'text-accent-green bg-accent-green/10 border border-accent-green/30'
                    : 'text-accent-yellow bg-accent-yellow/10 border border-accent-yellow/30'
                }`}>
                  {p.status}
                </span>
              </div>

              {/* Updated */}
              <div className="col-span-2 text-[10px] font-mono text-text-secondary/40">
                {formatDate(p.updated_at || p.created_at)}
              </div>

              {/* Actions */}
              <div className="col-span-2 flex justify-end gap-1">
                <button
                  onClick={() => openEditModal(p)}
                  className="p-1.5 text-accent-blue hover:bg-accent-blue/10 rounded transition-colors"
                  title="Editar"
                >
                  <Edit size={14} />
                </button>
                <button
                  onClick={() => handlePreview(p.slug)}
                  className="p-1.5 text-accent-green hover:bg-accent-green/10 rounded transition-colors"
                  title="Preview"
                >
                  <Eye size={14} />
                </button>
                <button
                  onClick={() => handleDuplicate(p)}
                  className="p-1.5 text-accent-purple hover:bg-accent-purple/10 rounded transition-colors"
                  title="Duplicar"
                >
                  <Copy size={14} />
                </button>
                <button
                  onClick={() => handleDelete(p)}
                  className="p-1.5 text-accent-red hover:bg-accent-red/10 rounded transition-colors opacity-0 group-hover:opacity-100"
                  title="Deletar"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* ──────── Modal ──────── */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-bg-secondary rounded-xl border border-border-color/30 w-full max-w-md shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-border-color/20">
              <h2 className="text-sm font-tactical font-bold tracking-widest text-text-primary">
                {modalMode === 'create' ? 'NOVA PAGINA' : 'EDITAR PAGINA'}
              </h2>
              <button
                onClick={closeModal}
                className="p-1 text-text-secondary/50 hover:text-text-primary transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-4 space-y-4">
              {/* Title */}
              <div>
                <label className="block text-[10px] font-tactical font-bold uppercase tracking-widest text-text-secondary/50 mb-1.5">
                  Titulo
                </label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="Nome da pagina"
                  className="w-full px-3 py-2 bg-bg-primary border border-border-color/30 rounded-lg text-xs font-mono text-text-primary placeholder:text-text-secondary/30 focus:outline-none focus:border-accent-blue/50 focus:ring-1 focus:ring-accent-blue/20 transition-colors"
                />
              </div>

              {/* Slug */}
              <div>
                <label className="block text-[10px] font-tactical font-bold uppercase tracking-widest text-text-secondary/50 mb-1.5">
                  Slug
                </label>
                <input
                  type="text"
                  value={form.slug}
                  onChange={(e) => setForm(prev => ({ ...prev, slug: e.target.value }))}
                  placeholder="/minha-pagina"
                  className="w-full px-3 py-2 bg-bg-primary border border-border-color/30 rounded-lg text-xs font-mono text-text-primary placeholder:text-text-secondary/30 focus:outline-none focus:border-accent-blue/50 focus:ring-1 focus:ring-accent-blue/20 transition-colors"
                />
              </div>

              {/* Template + Status */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-tactical font-bold uppercase tracking-widest text-text-secondary/50 mb-1.5">
                    Template
                  </label>
                  <select
                    value={form.template}
                    onChange={(e) => setForm(prev => ({ ...prev, template: e.target.value }))}
                    className="w-full px-3 py-2 bg-bg-primary border border-border-color/30 rounded-lg text-xs font-mono text-text-primary focus:outline-none focus:border-accent-blue/50 focus:ring-1 focus:ring-accent-blue/20 transition-colors"
                  >
                    {TEMPLATE_OPTIONS.map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-tactical font-bold uppercase tracking-widest text-text-secondary/50 mb-1.5">
                    Status
                  </label>
                  <select
                    value={form.status}
                    onChange={(e) => setForm(prev => ({ ...prev, status: e.target.value }))}
                    className="w-full px-3 py-2 bg-bg-primary border border-border-color/30 rounded-lg text-xs font-mono text-text-primary focus:outline-none focus:border-accent-blue/50 focus:ring-1 focus:ring-accent-blue/20 transition-colors"
                  >
                    {STATUS_OPTIONS.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-2 p-4 border-t border-border-color/20">
              <button
                onClick={closeModal}
                className="px-4 py-2 text-xs font-tactical text-text-secondary hover:text-text-primary transition-colors"
              >
                CANCELAR
              </button>
              <button
                onClick={handleSave}
                disabled={saving || !form.title.trim() || !form.slug.trim()}
                className="flex items-center gap-2 px-4 py-2 bg-accent-blue/20 border border-accent-blue text-accent-blue rounded-lg text-xs font-tactical hover:bg-accent-blue/30 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {saving ? <Loader size={12} className="animate-spin" /> : <Plus size={12} />}
                {modalMode === 'create' ? 'CRIAR PAGINA' : 'SALVAR'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PagesPage;
