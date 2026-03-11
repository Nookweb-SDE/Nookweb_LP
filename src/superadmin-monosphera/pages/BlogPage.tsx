import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { BookOpen, Plus, Search, Edit, Eye, Trash2, Loader, X } from 'lucide-react';

interface BlogPost {
  id: number;
  titulo: string;
  slug: string;
  categoria: string;
  status: string;
  excerpt: string;
  data: string;
  views: number;
  is_fallback?: boolean;
}

interface ModalForm {
  titulo: string;
  categoria: string;
  status: string;
  excerpt: string;
}

const generateSlug = (titulo: string): string => {
  return titulo
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
};

const emptyForm: ModalForm = {
  titulo: '',
  categoria: '',
  status: 'rascunho',
  excerpt: '',
};

const BlogPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('todos');
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [form, setForm] = useState<ModalForm>(emptyForm);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const { data: postsData } = await supabase
        .from('cms_blog_posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (postsData?.length) {
        setPosts(
          postsData.map((p) => ({
            id: p.id,
            titulo: p.titulo || p.title,
            slug: p.slug || generateSlug(p.titulo || p.title || ''),
            categoria: p.categoria || p.category,
            status: p.status,
            excerpt: p.excerpt || '',
            data: new Date(p.created_at).toLocaleDateString('pt-BR'),
            views: p.views || 0,
            is_fallback: false,
          }))
        );
      } else {
        setPosts([]);
      }
    } catch {
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  // --- CRUD handlers ---

  const handleOpenCreate = () => {
    setEditingPost(null);
    setForm(emptyForm);
    setModalOpen(true);
  };

  const handleOpenEdit = (post: BlogPost) => {
    setEditingPost(post);
    setForm({
      titulo: post.titulo,
      categoria: post.categoria,
      status: post.status,
      excerpt: post.excerpt,
    });
    setModalOpen(true);
  };

  const handlePreview = (post: BlogPost) => {
    const slug = post.slug || generateSlug(post.titulo);
    window.open('/blog/' + slug, '_blank');
  };

  const handleDelete = async (post: BlogPost) => {
    if (!confirm('Excluir post "' + post.titulo + '"?')) return;

    try {
      const { error } = await supabase.from('cms_blog_posts').delete().eq('id', post.id);
      if (error) throw error;
      await fetchPosts();
    } catch (err) {
      console.error('Erro ao excluir post:', err);
      alert('Erro ao excluir post. Tente novamente.');
    }
  };

  const handleSave = async () => {
    if (!form.titulo.trim()) {
      alert('O titulo e obrigatorio.');
      return;
    }
    if (!form.categoria.trim()) {
      alert('A categoria e obrigatoria.');
      return;
    }

    setSaving(true);
    const slug = generateSlug(form.titulo);

    try {
      if (editingPost) {
        // --- UPDATE ---
        if (editingPost.is_fallback) {
          // Update fallback post locally
          setPosts((prev) =>
            prev.map((p) =>
              p.id === editingPost.id
                ? { ...p, titulo: form.titulo, slug, categoria: form.categoria, status: form.status, excerpt: form.excerpt }
                : p
            )
          );
        } else {
          const { error } = await supabase
            .from('cms_blog_posts')
            .update({
              titulo: form.titulo,
              slug,
              categoria: form.categoria,
              status: form.status,
              excerpt: form.excerpt,
            })
            .eq('id', editingPost.id);

          if (error) throw error;
          await fetchPosts();
        }
      } else {
        // --- INSERT ---
        const { error } = await supabase.from('cms_blog_posts').insert({
          titulo: form.titulo,
          slug,
          categoria: form.categoria,
          status: form.status,
          excerpt: form.excerpt,
          views: 0,
        });

        if (error) throw error;
        await fetchPosts();
      }

      setModalOpen(false);
      setEditingPost(null);
      setForm(emptyForm);
    } catch (err) {
      console.error('Erro ao salvar post:', err);
      alert('Erro ao salvar post. Tente novamente.');
    } finally {
      setSaving(false);
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditingPost(null);
    setForm(emptyForm);
  };

  // --- Stats ---
  const totalPosts = posts.length;
  const publicados = posts.filter((p) => p.status === 'publicado').length;
  const rascunhos = posts.filter((p) => p.status === 'rascunho').length;
  const totalViews = posts.reduce((sum, p) => sum + p.views, 0);

  const stats = [
    { label: 'Posts', value: totalPosts.toString(), color: 'accent-blue' },
    { label: 'Publicados', value: publicados.toString(), color: 'accent-green' },
    { label: 'Rascunhos', value: rascunhos.toString(), color: 'accent-yellow' },
    { label: 'Views Total', value: totalViews.toLocaleString('pt-BR'), color: 'accent-purple' },
  ];

  // --- Filtro ---
  const filtered = posts.filter(
    (p) =>
      (filterStatus === 'todos' || p.status === filterStatus) &&
      (search === '' || p.titulo.toLowerCase().includes(search.toLowerCase()))
  );

  // --- Loading state ---
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader size={32} className="animate-spin text-accent-blue" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold font-tactical tracking-widest text-text-primary">BLOG</h1>
          <p className="text-xs font-mono text-text-secondary/50 mt-1">Gerencie os posts do blog</p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="flex items-center gap-2 px-4 py-2 bg-accent-blue/20 border border-accent-blue text-accent-blue rounded-lg text-xs font-tactical hover:bg-accent-blue/30 transition-colors"
        >
          <Plus size={14} /> NOVO POST
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="glass-card border border-border-color/30 rounded-lg p-4">
            <p className="text-[9px] font-tactical uppercase tracking-widest text-text-secondary/50">{s.label}</p>
            <p className={`text-3xl font-bold font-tactical text-${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Search + Filter */}
      <div className="flex gap-3">
        <div className="flex-1 relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary/40" />
          <input
            type="text"
            placeholder="Buscar posts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-bg-secondary border border-border-color/30 rounded-lg pl-10 pr-4 py-2.5 text-xs font-mono text-text-primary placeholder-text-secondary/30 outline-none focus:border-accent-blue/40"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="bg-bg-secondary border border-border-color/30 rounded-lg px-4 py-2.5 text-xs font-mono text-text-secondary outline-none"
        >
          <option value="todos">Todos</option>
          <option value="publicado">Publicados</option>
          <option value="rascunho">Rascunhos</option>
        </select>
      </div>

      {/* Posts Table */}
      <div className="bg-bg-secondary rounded-lg border border-border-color/30 overflow-hidden">
        <div className="grid grid-cols-12 gap-4 p-3 bg-bg-tertiary border-b border-border-color text-[10px] font-bold text-text-secondary uppercase tracking-wider">
          <div className="col-span-4">Titulo</div>
          <div className="col-span-2">Categoria</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-1">Data</div>
          <div className="col-span-1">Views</div>
          <div className="col-span-2 text-right">Acoes</div>
        </div>

        {filtered.length === 0 && (
          <div className="p-8 text-center">
            <p className="text-xs font-mono text-text-secondary/40">Nenhum post encontrado.</p>
          </div>
        )}

        {filtered.map((p) => (
          <div
            key={`${p.is_fallback ? 'fb' : 'db'}-${p.id}`}
            className="grid grid-cols-12 gap-4 p-3 border-b border-border-color/20 hover:bg-bg-tertiary/30 transition-colors items-center"
          >
            <div className="col-span-4 text-xs font-tactical font-bold text-text-primary truncate">{p.titulo}</div>
            <div className="col-span-2 text-[10px] font-mono text-text-secondary">{p.categoria}</div>
            <div className="col-span-2">
              <span
                className={`text-[9px] px-2 py-0.5 rounded-full ${
                  p.status === 'publicado' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                }`}
              >
                {p.status.toUpperCase()}
              </span>
            </div>
            <div className="col-span-1 text-[10px] font-mono text-text-secondary/40">{p.data}</div>
            <div className="col-span-1 text-[10px] font-mono text-text-secondary">{p.views.toLocaleString()}</div>
            <div className="col-span-2 flex justify-end gap-1">
              <button
                onClick={() => handleOpenEdit(p)}
                title="Editar"
                className="p-1.5 text-accent-blue hover:bg-accent-blue/10 rounded transition-colors"
              >
                <Edit size={14} />
              </button>
              <button
                onClick={() => handlePreview(p)}
                title="Preview"
                className="p-1.5 text-accent-green hover:bg-accent-green/10 rounded transition-colors"
              >
                <Eye size={14} />
              </button>
              <button
                onClick={() => handleDelete(p)}
                title="Excluir"
                className="p-1.5 text-accent-red hover:bg-accent-red/10 rounded transition-colors"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal CRUD */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-bg-secondary rounded-lg border border-border-color/30 p-6 w-full max-w-lg space-y-5">
            {/* Modal Header */}
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold font-tactical tracking-widest text-text-primary">
                {editingPost ? 'EDITAR POST' : 'NOVO POST'}
              </h2>
              <button
                onClick={handleCloseModal}
                className="p-1.5 text-text-secondary/50 hover:text-text-primary hover:bg-bg-tertiary rounded transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Titulo */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-tactical uppercase tracking-widest text-text-secondary/60">
                Titulo
              </label>
              <input
                type="text"
                value={form.titulo}
                onChange={(e) => setForm((f) => ({ ...f, titulo: e.target.value }))}
                placeholder="Digite o titulo do post..."
                className="w-full bg-bg-tertiary border border-border-color/30 rounded-lg px-4 py-2.5 text-xs font-mono text-text-primary placeholder-text-secondary/30 outline-none focus:border-accent-blue/40"
              />
            </div>

            {/* Categoria */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-tactical uppercase tracking-widest text-text-secondary/60">
                Categoria
              </label>
              <input
                type="text"
                value={form.categoria}
                onChange={(e) => setForm((f) => ({ ...f, categoria: e.target.value }))}
                placeholder="Ex: Seguranca Digital, Educacao, Guias..."
                className="w-full bg-bg-tertiary border border-border-color/30 rounded-lg px-4 py-2.5 text-xs font-mono text-text-primary placeholder-text-secondary/30 outline-none focus:border-accent-blue/40"
              />
            </div>

            {/* Status */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-tactical uppercase tracking-widest text-text-secondary/60">
                Status
              </label>
              <select
                value={form.status}
                onChange={(e) => setForm((f) => ({ ...f, status: e.target.value }))}
                className="w-full bg-bg-tertiary border border-border-color/30 rounded-lg px-4 py-2.5 text-xs font-mono text-text-secondary outline-none focus:border-accent-blue/40"
              >
                <option value="rascunho">Rascunho</option>
                <option value="publicado">Publicado</option>
              </select>
            </div>

            {/* Excerpt */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-tactical uppercase tracking-widest text-text-secondary/60">
                Excerpt
              </label>
              <textarea
                value={form.excerpt}
                onChange={(e) => setForm((f) => ({ ...f, excerpt: e.target.value }))}
                placeholder="Resumo do post..."
                rows={3}
                className="w-full bg-bg-tertiary border border-border-color/30 rounded-lg px-4 py-2.5 text-xs font-mono text-text-primary placeholder-text-secondary/30 outline-none focus:border-accent-blue/40 resize-none"
              />
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 bg-bg-tertiary border border-border-color/30 text-text-secondary rounded-lg text-xs font-tactical hover:bg-bg-tertiary/80 transition-colors"
              >
                CANCELAR
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 px-5 py-2 bg-accent-blue/20 border border-accent-blue text-accent-blue rounded-lg text-xs font-tactical hover:bg-accent-blue/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving && <Loader size={12} className="animate-spin" />}
                {editingPost ? 'SALVAR' : 'CRIAR POST'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogPage;
