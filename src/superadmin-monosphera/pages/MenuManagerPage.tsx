import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { Plus, ChevronUp, ChevronDown, Edit, Trash2, Eye, EyeOff, Loader, X, Save, AlertTriangle } from 'lucide-react';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
interface MenuItem {
  id: string;
  label: string;
  href: string;
  sort_order: number;
  parent_id: string | null;
  is_visible: boolean;
  badge: string;
}

type ModalMode = 'create' | 'edit';

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
const MenuManagerPage: React.FC = () => {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'header' | 'footer'>('header');
  const [usingFallback, setUsingFallback] = useState(false);

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<ModalMode>('create');
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [formLabel, setFormLabel] = useState('');
  const [formHref, setFormHref] = useState('');
  const [formBadge, setFormBadge] = useState('');
  const [formType, setFormType] = useState<'header' | 'footer'>('header');
  const [saving, setSaving] = useState(false);

  // ---------------------------------------------------------------------------
  // Fetch menus do Supabase com fallback
  // ---------------------------------------------------------------------------
  const fetchMenus = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('cms_menus')
        .select('*')
        .order('sort_order', { ascending: true });

      if (error) throw error;

      if (data && data.length > 0) {
        // Garante que cada item tem is_visible e badge
        const normalized: MenuItem[] = data.map((m: Record<string, unknown>) => ({
          id: m.id as string,
          label: m.label as string,
          href: m.href as string,
          sort_order: (m.sort_order as number) ?? 0,
          parent_id: m.parent_id as string | null,
          is_visible: m.is_visible !== undefined ? Boolean(m.is_visible) : true,
          badge: (m.badge as string) || '',
        }));
        setItems(normalized);
        setUsingFallback(false);
      } else {
        setItems([]);
        setUsingFallback(false);
      }
    } catch {
      setItems([]);
      setUsingFallback(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMenus();
  }, [fetchMenus]);

  // ---------------------------------------------------------------------------
  // Derived data
  // ---------------------------------------------------------------------------
  const headerItems = items
    .filter((m) => m.parent_id === null)
    .sort((a, b) => a.sort_order - b.sort_order);

  const footerItems = items
    .filter((m) => m.parent_id !== null)
    .sort((a, b) => a.sort_order - b.sort_order);

  const currentItems = activeTab === 'header' ? headerItems : footerItems;

  // ---------------------------------------------------------------------------
  // Modal helpers
  // ---------------------------------------------------------------------------
  const openCreateModal = () => {
    setModalMode('create');
    setEditingItem(null);
    setFormLabel('');
    setFormHref('');
    setFormBadge('');
    setFormType(activeTab);
    setModalOpen(true);
  };

  const openEditModal = (item: MenuItem) => {
    setModalMode('edit');
    setEditingItem(item);
    setFormLabel(item.label);
    setFormHref(item.href);
    setFormBadge(item.badge);
    setFormType(item.parent_id === null ? 'header' : 'footer');
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingItem(null);
    setSaving(false);
  };

  // ---------------------------------------------------------------------------
  // CRUD: Create
  // ---------------------------------------------------------------------------
  const handleCreate = async () => {
    if (!formLabel.trim() || !formHref.trim()) return;
    setSaving(true);

    const relevantItems = formType === 'header' ? headerItems : footerItems;
    const nextOrder = relevantItems.length > 0
      ? Math.max(...relevantItems.map((i) => i.sort_order)) + 1
      : 1;

    const newItem: MenuItem = {
      id: `temp-${Date.now()}`,
      label: formLabel.trim(),
      href: formHref.trim(),
      sort_order: nextOrder,
      parent_id: formType === 'footer' ? 'footer' : null,
      is_visible: true,
      badge: formBadge.trim(),
    };

    try {
      const payload = {
        label: newItem.label,
        href: newItem.href,
        sort_order: newItem.sort_order,
        parent_id: newItem.parent_id,
        is_visible: newItem.is_visible,
        badge: newItem.badge,
      };

      const { data, error } = await supabase
        .from('cms_menus')
        .insert(payload)
        .select()
        .single();

      if (error) throw error;

      if (data) {
        newItem.id = data.id;
      }
    } catch {
      // Supabase falhou — mantém item local com id temporário
    }

    setItems((prev) => [...prev, newItem]);
    closeModal();
  };

  // ---------------------------------------------------------------------------
  // CRUD: Update
  // ---------------------------------------------------------------------------
  const handleUpdate = async () => {
    if (!editingItem || !formLabel.trim() || !formHref.trim()) return;
    setSaving(true);

    const updatedItem: MenuItem = {
      ...editingItem,
      label: formLabel.trim(),
      href: formHref.trim(),
      badge: formBadge.trim(),
      parent_id: formType === 'footer' ? 'footer' : null,
    };

    // Atualiza localmente primeiro
    setItems((prev) =>
      prev.map((i) => (i.id === editingItem.id ? updatedItem : i))
    );

    try {
      const { error } = await supabase
        .from('cms_menus')
        .update({
          label: updatedItem.label,
          href: updatedItem.href,
          badge: updatedItem.badge,
          parent_id: updatedItem.parent_id,
        })
        .eq('id', editingItem.id);

      if (error) throw error;
    } catch {
      // Supabase falhou — mantém alteração local
    }

    closeModal();
  };

  // ---------------------------------------------------------------------------
  // CRUD: Delete
  // ---------------------------------------------------------------------------
  const handleDelete = async (item: MenuItem) => {
    const confirmed = window.confirm(
      `Tem certeza que deseja excluir "${item.label}"?`
    );
    if (!confirmed) return;

    // Remove localmente primeiro
    setItems((prev) => prev.filter((i) => i.id !== item.id));

    try {
      const { error } = await supabase
        .from('cms_menus')
        .delete()
        .eq('id', item.id);

      if (error) throw error;
    } catch {
      // Supabase falhou — item já removido localmente
    }
  };

  // ---------------------------------------------------------------------------
  // Reorder
  // ---------------------------------------------------------------------------
  const handleReorder = async (item: MenuItem, direction: 'up' | 'down') => {
    const list = activeTab === 'header' ? [...headerItems] : [...footerItems];
    const idx = list.findIndex((i) => i.id === item.id);
    if (idx === -1) return;

    const targetIdx = direction === 'up' ? idx - 1 : idx + 1;
    if (targetIdx < 0 || targetIdx >= list.length) return;

    // Swap sort_order
    const tempOrder = list[idx].sort_order;
    list[idx] = { ...list[idx], sort_order: list[targetIdx].sort_order };
    list[targetIdx] = { ...list[targetIdx], sort_order: tempOrder };

    // Atualiza state completo
    const otherItems = items.filter((i) =>
      activeTab === 'header' ? i.parent_id !== null : i.parent_id === null
    );
    setItems([...otherItems, ...list]);

    // Persiste no Supabase
    try {
      await Promise.all([
        supabase
          .from('cms_menus')
          .update({ sort_order: list[idx].sort_order })
          .eq('id', list[idx].id),
        supabase
          .from('cms_menus')
          .update({ sort_order: list[targetIdx].sort_order })
          .eq('id', list[targetIdx].id),
      ]);
    } catch {
      // Supabase falhou — reorder mantido localmente
    }
  };

  // ---------------------------------------------------------------------------
  // Visibility toggle (salva no DB)
  // ---------------------------------------------------------------------------
  const toggleVisibility = async (item: MenuItem) => {
    const newVisibility = !item.is_visible;

    // Atualiza localmente
    setItems((prev) =>
      prev.map((i) =>
        i.id === item.id ? { ...i, is_visible: newVisibility } : i
      )
    );

    // Persiste no Supabase
    try {
      const { error } = await supabase
        .from('cms_menus')
        .update({ is_visible: newVisibility })
        .eq('id', item.id);

      if (error) throw error;
    } catch {
      // Supabase falhou — toggle mantido localmente
    }
  };

  // ---------------------------------------------------------------------------
  // Render: Loading
  // ---------------------------------------------------------------------------
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader className="animate-spin text-accent-blue" size={32} />
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // Render: Main
  // ---------------------------------------------------------------------------
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold font-tactical tracking-widest text-text-primary uppercase">
            GERENCIAR MENUS
          </h1>
          <p className="text-xs font-mono text-text-secondary/50 mt-1">
            Organize os menus do header e footer
          </p>
        </div>
        <button
          onClick={openCreateModal}
          className="flex items-center gap-2 px-4 py-2 bg-accent-blue/20 border border-accent-blue text-accent-blue rounded-lg text-xs font-tactical hover:bg-accent-blue/30 transition-colors tracking-wider"
        >
          <Plus size={14} /> NOVO ITEM
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        {(['header', 'footer'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setActiveTab(t)}
            className={`px-4 py-2 rounded-lg text-xs font-tactical tracking-wider transition-all uppercase ${
              activeTab === t
                ? 'bg-accent-blue/20 border border-accent-blue text-accent-blue'
                : 'bg-bg-tertiary/50 border border-border-color/30 text-text-secondary hover:text-text-primary'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-bg-secondary rounded-lg border border-border-color/30 overflow-hidden">
        {/* Table header */}
        <div className="grid grid-cols-12 gap-4 p-3 bg-bg-tertiary border-b border-border-color text-[10px] font-bold text-text-secondary uppercase tracking-wider font-tactical">
          <div className="col-span-1">Ordem</div>
          <div className="col-span-3">Label</div>
          <div className="col-span-3">Href</div>
          <div className="col-span-2">Badge</div>
          <div className="col-span-1">Visivel</div>
          <div className="col-span-2 text-right">Acoes</div>
        </div>

        {/* Table rows */}
        {currentItems.length === 0 && (
          <div className="p-8 text-center text-text-secondary/40 text-xs font-mono">
            Nenhum item encontrado nesta secao.
          </div>
        )}

        {currentItems.map((item, idx) => (
          <div
            key={item.id}
            className={`grid grid-cols-12 gap-4 p-3 border-b border-border-color/20 hover:bg-bg-tertiary/30 transition-colors items-center ${
              !item.is_visible ? 'opacity-40' : ''
            }`}
          >
            {/* Ordem (reorder buttons) */}
            <div className="col-span-1 flex gap-1">
              <button
                onClick={() => handleReorder(item, 'up')}
                disabled={idx === 0}
                className={`p-0.5 transition-colors ${
                  idx === 0
                    ? 'text-text-secondary/15 cursor-not-allowed'
                    : 'text-text-secondary/40 hover:text-accent-blue'
                }`}
              >
                <ChevronUp size={12} />
              </button>
              <button
                onClick={() => handleReorder(item, 'down')}
                disabled={idx === currentItems.length - 1}
                className={`p-0.5 transition-colors ${
                  idx === currentItems.length - 1
                    ? 'text-text-secondary/15 cursor-not-allowed'
                    : 'text-text-secondary/40 hover:text-accent-blue'
                }`}
              >
                <ChevronDown size={12} />
              </button>
            </div>

            {/* Label */}
            <div className="col-span-3 text-xs font-tactical font-bold text-text-primary">
              {item.label}
            </div>

            {/* Href */}
            <div className="col-span-3 text-[10px] font-mono text-accent-blue truncate">
              {item.href}
            </div>

            {/* Badge */}
            <div className="col-span-2">
              {item.badge ? (
                <span className="px-2 py-0.5 bg-accent-purple/20 text-accent-purple text-[9px] font-tactical font-bold rounded tracking-wider">
                  {item.badge}
                </span>
              ) : (
                <span className="text-text-secondary/20 text-[10px] font-mono">—</span>
              )}
            </div>

            {/* Visibilidade */}
            <div className="col-span-1">
              <button
                onClick={() => toggleVisibility(item)}
                className={`transition-colors ${
                  item.is_visible
                    ? 'text-accent-green hover:text-accent-green/70'
                    : 'text-text-secondary/30 hover:text-text-secondary/50'
                }`}
              >
                {item.is_visible ? <Eye size={14} /> : <EyeOff size={14} />}
              </button>
            </div>

            {/* Ações */}
            <div className="col-span-2 flex justify-end gap-1">
              <button
                onClick={() => openEditModal(item)}
                className="p-1.5 text-accent-blue hover:bg-accent-blue/10 rounded transition-colors"
                title="Editar"
              >
                <Edit size={14} />
              </button>
              <button
                onClick={() => handleDelete(item)}
                className="p-1.5 text-accent-red hover:bg-accent-red/10 rounded transition-colors"
                title="Excluir"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Stats */}
      <div className="flex gap-4">
        <div className="glass-card px-4 py-2 rounded-lg border border-border-color/30">
          <span className="text-[9px] font-tactical text-text-secondary/40 uppercase tracking-widest">
            Header
          </span>
          <span className="ml-2 text-sm font-mono font-bold text-accent-blue">
            {headerItems.length}
          </span>
        </div>
        <div className="glass-card px-4 py-2 rounded-lg border border-border-color/30">
          <span className="text-[9px] font-tactical text-text-secondary/40 uppercase tracking-widest">
            Footer
          </span>
          <span className="ml-2 text-sm font-mono font-bold text-accent-purple">
            {footerItems.length}
          </span>
        </div>
        <div className="glass-card px-4 py-2 rounded-lg border border-border-color/30">
          <span className="text-[9px] font-tactical text-text-secondary/40 uppercase tracking-widest">
            Ocultos
          </span>
          <span className="ml-2 text-sm font-mono font-bold text-accent-yellow">
            {items.filter((i) => !i.is_visible).length}
          </span>
        </div>
      </div>

      {/* ================================================================== */}
      {/* Modal de Criação / Edição                                          */}
      {/* ================================================================== */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-bg-secondary border border-border-color/30 rounded-xl w-full max-w-md shadow-2xl shadow-black/40">
            {/* Modal header */}
            <div className="flex items-center justify-between p-4 border-b border-border-color/20">
              <h2 className="text-sm font-tactical font-bold tracking-widest text-text-primary uppercase">
                {modalMode === 'create' ? 'NOVO ITEM DE MENU' : 'EDITAR ITEM'}
              </h2>
              <button
                onClick={closeModal}
                className="p-1 text-text-secondary/40 hover:text-text-primary transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            {/* Modal body */}
            <div className="p-4 space-y-4">
              {/* Label */}
              <div>
                <label className="block text-[9px] font-tactical font-bold uppercase tracking-[0.2em] text-text-secondary/40 mb-1.5">
                  Label
                </label>
                <input
                  type="text"
                  value={formLabel}
                  onChange={(e) => setFormLabel(e.target.value)}
                  placeholder="Ex: Home, Contato..."
                  className="w-full px-3 py-2 bg-bg-tertiary border border-border-color/30 rounded-lg text-xs font-mono text-text-primary placeholder:text-text-secondary/30 focus:outline-none focus:border-accent-blue/50 transition-colors"
                />
              </div>

              {/* Href */}
              <div>
                <label className="block text-[9px] font-tactical font-bold uppercase tracking-[0.2em] text-text-secondary/40 mb-1.5">
                  Href (URL)
                </label>
                <input
                  type="text"
                  value={formHref}
                  onChange={(e) => setFormHref(e.target.value)}
                  placeholder="Ex: /contato, /planos..."
                  className="w-full px-3 py-2 bg-bg-tertiary border border-border-color/30 rounded-lg text-xs font-mono text-text-primary placeholder:text-text-secondary/30 focus:outline-none focus:border-accent-blue/50 transition-colors"
                />
              </div>

              {/* Badge */}
              <div>
                <label className="block text-[9px] font-tactical font-bold uppercase tracking-[0.2em] text-text-secondary/40 mb-1.5">
                  Badge (opcional)
                </label>
                <input
                  type="text"
                  value={formBadge}
                  onChange={(e) => setFormBadge(e.target.value)}
                  placeholder="Ex: NOVO, BETA..."
                  className="w-full px-3 py-2 bg-bg-tertiary border border-border-color/30 rounded-lg text-xs font-mono text-text-primary placeholder:text-text-secondary/30 focus:outline-none focus:border-accent-blue/50 transition-colors"
                />
              </div>

              {/* Tipo (header / footer) */}
              <div>
                <label className="block text-[9px] font-tactical font-bold uppercase tracking-[0.2em] text-text-secondary/40 mb-1.5">
                  Tipo
                </label>
                <div className="flex gap-2">
                  {(['header', 'footer'] as const).map((t) => (
                    <button
                      key={t}
                      onClick={() => setFormType(t)}
                      className={`flex-1 px-3 py-2 rounded-lg text-xs font-tactical tracking-wider transition-all uppercase ${
                        formType === t
                          ? 'bg-accent-blue/20 border border-accent-blue text-accent-blue'
                          : 'bg-bg-tertiary border border-border-color/30 text-text-secondary hover:text-text-primary'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal footer */}
            <div className="flex justify-end gap-2 p-4 border-t border-border-color/20">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-bg-tertiary border border-border-color/30 text-text-secondary rounded-lg text-xs font-tactical tracking-wider hover:text-text-primary transition-colors"
              >
                CANCELAR
              </button>
              <button
                onClick={modalMode === 'create' ? handleCreate : handleUpdate}
                disabled={saving || !formLabel.trim() || !formHref.trim()}
                className="flex items-center gap-2 px-4 py-2 bg-accent-blue/20 border border-accent-blue text-accent-blue rounded-lg text-xs font-tactical tracking-wider hover:bg-accent-blue/30 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {saving ? (
                  <Loader size={12} className="animate-spin" />
                ) : (
                  <Save size={12} />
                )}
                {modalMode === 'create' ? 'CRIAR' : 'SALVAR'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuManagerPage;
