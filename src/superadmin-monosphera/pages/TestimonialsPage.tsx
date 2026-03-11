import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { MessageSquare, Plus, Star, Check, X, Loader, Sparkles, StarOff } from 'lucide-react';

interface Testimonial {
  id: string;
  nome: string;
  email: string;
  rating: number;
  texto: string;
  status: 'aprovado' | 'pendente' | 'rejeitado';
  destaque: boolean;
  created_at: string;
}

const TestimonialsPage: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('todos');
  const [showModal, setShowModal] = useState(false);
  const [saving, setSaving] = useState(false);

  // Form state
  const [formNome, setFormNome] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formRating, setFormRating] = useState(5);
  const [formTexto, setFormTexto] = useState('');
  const [formStatus, setFormStatus] = useState<'aprovado' | 'pendente' | 'rejeitado'>('pendente');

  const fetchTestimonials = useCallback(async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('cms_testimonials')
        .select('*')
        .order('created_at', { ascending: false });

      if (error || !data || data.length === 0) {
        setTestimonials([]);
      } else {
        setTestimonials(data.map((t: any) => ({
          id: t.id,
          nome: t.author || t.nome || '',
          email: t.role || t.email || '',
          rating: t.rating ?? 5,
          texto: t.text || t.texto || '',
          status: (t.status || 'aprovado') as 'aprovado' | 'pendente' | 'rejeitado',
          destaque: t.destaque ?? false,
          created_at: t.created_at || '',
        })));
      }
    } catch {
      setTestimonials([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTestimonials();
  }, [fetchTestimonials]);

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const handleApprove = async (id: string) => {
    try {
      const { error } = await supabase
        .from('cms_testimonials')
        .update({ status: 'aprovado' })
        .eq('id', id);

      if (error) {
        console.error('Erro ao aprovar:', error);
      }
    } catch (err) {
      console.error('Erro ao aprovar:', err);
    }
    // Atualiza localmente independente do resultado do Supabase
    setTestimonials(prev => prev.map(t => t.id === id ? { ...t, status: 'aprovado' } : t));
  };

  const handleReject = async (id: string) => {
    try {
      const { error } = await supabase
        .from('cms_testimonials')
        .update({ status: 'rejeitado' })
        .eq('id', id);

      if (error) {
        console.error('Erro ao rejeitar:', error);
      }
    } catch (err) {
      console.error('Erro ao rejeitar:', err);
    }
    setTestimonials(prev => prev.map(t => t.id === id ? { ...t, status: 'rejeitado' } : t));
  };

  const handleToggleDestaque = async (id: string, currentDestaque: boolean) => {
    const newDestaque = !currentDestaque;
    try {
      const { error } = await supabase
        .from('cms_testimonials')
        .update({ destaque: newDestaque })
        .eq('id', id);

      if (error) {
        console.error('Erro ao atualizar destaque:', error);
      }
    } catch (err) {
      console.error('Erro ao atualizar destaque:', err);
    }
    setTestimonials(prev => prev.map(t => t.id === id ? { ...t, destaque: newDestaque } : t));
  };

  const resetForm = () => {
    setFormNome('');
    setFormEmail('');
    setFormRating(5);
    setFormTexto('');
    setFormStatus('pendente');
  };

  const handleOpenModal = () => {
    resetForm();
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    resetForm();
  };

  const handleSubmitNew = async () => {
    if (!formNome.trim() || !formTexto.trim()) return;

    setSaving(true);
    const newTestimonial: Testimonial = {
      id: crypto.randomUUID(),
      nome: formNome.trim(),
      email: formEmail.trim(),
      rating: formRating,
      texto: formTexto.trim(),
      status: formStatus,
      destaque: false,
      created_at: new Date().toISOString().split('T')[0],
    };

    try {
      const { data: inserted, error } = await supabase
        .from('cms_testimonials')
        .insert([{
          author: newTestimonial.nome,
          role: newTestimonial.email || '',
          text: newTestimonial.texto,
        }])
        .select()
        .single();

      if (error) throw error;
      if (inserted) {
        setTestimonials(prev => [{ ...newTestimonial, id: inserted.id }, ...prev]);
      } else {
        setTestimonials(prev => [newTestimonial, ...prev]);
      }
    } catch (err: any) {
      console.error('Erro ao inserir:', err);
      alert('Erro ao criar depoimento: ' + (err?.message || 'Tente novamente'));
    }
    setSaving(false);
    handleCloseModal();
  };

  const filtered = testimonials.filter(t => {
    if (filter === 'todos') return true;
    if (filter === 'destaque') return t.destaque;
    return t.status === filter;
  });

  const approvedCount = testimonials.filter(t => t.status === 'aprovado').length;
  const pendingCount = testimonials.filter(t => t.status === 'pendente').length;
  const destaqueCount = testimonials.filter(t => t.destaque).length;

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={12}
        className={i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-text-secondary/30'}
      />
    ));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader className="animate-spin text-accent-blue" size={32} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold font-tactical tracking-widest text-text-primary">
            DEPOIMENTOS
          </h1>
          <p className="text-xs font-mono text-text-secondary/50 mt-1">
            Total: {testimonials.length} &bull; Aprovados: {approvedCount} &bull; Pendentes: {pendingCount} &bull; Destaques: {destaqueCount}
          </p>
        </div>
        <button
          onClick={handleOpenModal}
          className="flex items-center gap-2 px-4 py-2 bg-accent-blue/20 border border-accent-blue text-accent-blue rounded-lg text-xs font-tactical hover:bg-accent-blue/30 transition-colors"
        >
          <Plus size={14} /> NOVO DEPOIMENTO
        </button>
      </div>

      {/* Filtros */}
      <div className="flex gap-2 flex-wrap">
        {[
          { key: 'todos', label: 'Todos' },
          { key: 'aprovado', label: 'Aprovados' },
          { key: 'pendente', label: 'Pendentes' },
          { key: 'rejeitado', label: 'Rejeitados' },
          { key: 'destaque', label: 'Destaques' },
        ].map(f => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`px-4 py-2 rounded-lg text-xs font-tactical tracking-wider transition-all ${
              filter === f.key
                ? 'bg-accent-blue/20 border border-accent-blue text-accent-blue'
                : 'bg-bg-tertiary/50 border border-border-color/30 text-text-secondary hover:text-text-primary'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Grid de Depoimentos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((t) => (
          <div
            key={t.id}
            className={`bg-bg-secondary border rounded-lg p-5 transition-all ${
              t.status === 'pendente'
                ? 'border-yellow-500/30'
                : t.status === 'rejeitado'
                ? 'border-red-500/30'
                : t.destaque
                ? 'border-accent-blue/40 shadow-[0_0_15px_rgba(0,212,255,0.1)]'
                : 'border-border-color/30'
            }`}
          >
            {/* Header do Card */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-accent-blue/20 flex items-center justify-center text-xs font-bold text-accent-blue font-tactical">
                  {getInitials(t.nome)}
                </div>
                <div>
                  <h4 className="text-xs font-tactical font-bold text-text-primary">{t.nome}</h4>
                  <p className="text-[10px] font-mono text-text-secondary/40">{t.email}</p>
                </div>
              </div>
              {/* Toggle Destaque */}
              <button
                onClick={() => handleToggleDestaque(t.id, t.destaque)}
                title={t.destaque ? 'Remover destaque' : 'Marcar como destaque'}
                className={`p-1.5 rounded-lg transition-all ${
                  t.destaque
                    ? 'bg-accent-blue/20 text-accent-blue hover:bg-accent-blue/30'
                    : 'bg-bg-tertiary/50 text-text-secondary/40 hover:text-accent-blue hover:bg-accent-blue/10'
                }`}
              >
                {t.destaque ? <Sparkles size={14} /> : <StarOff size={14} />}
              </button>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-1 mb-2">
              {renderStars(t.rating)}
              <span className="text-[10px] font-mono text-text-secondary/50 ml-1">({t.rating}/5)</span>
            </div>

            {/* Texto */}
            <p className="text-[11px] font-mono text-text-secondary/70 leading-relaxed mb-3 line-clamp-3">
              "{t.texto}"
            </p>

            {/* Data */}
            <p className="text-[9px] font-mono text-text-secondary/30 mb-3">
              {new Date(t.created_at + 'T00:00:00').toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
            </p>

            {/* Status Badge + Actions */}
            <div className="flex items-center justify-between">
              <span
                className={`text-[9px] px-2 py-0.5 rounded-full font-tactical tracking-wider ${
                  t.status === 'aprovado'
                    ? 'bg-green-500/20 text-green-400'
                    : t.status === 'rejeitado'
                    ? 'bg-red-500/20 text-red-400'
                    : 'bg-yellow-500/20 text-yellow-400'
                }`}
              >
                {t.status.toUpperCase()}
              </span>
            </div>

            {/* Botoes Approve/Reject para pendentes */}
            {t.status === 'pendente' && (
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => handleApprove(t.id)}
                  className="flex-1 flex items-center justify-center gap-1 px-3 py-1.5 bg-green-500/20 border border-green-500/50 text-green-400 rounded text-[10px] font-tactical hover:bg-green-500/30 transition-colors"
                >
                  <Check size={12} /> Aprovar
                </button>
                <button
                  onClick={() => handleReject(t.id)}
                  className="flex-1 flex items-center justify-center gap-1 px-3 py-1.5 bg-red-500/20 border border-red-500/50 text-red-400 rounded text-[10px] font-tactical hover:bg-red-500/30 transition-colors"
                >
                  <X size={12} /> Rejeitar
                </button>
              </div>
            )}

            {/* Botoes para rejeitados - permitir re-aprovar */}
            {t.status === 'rejeitado' && (
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => handleApprove(t.id)}
                  className="flex-1 flex items-center justify-center gap-1 px-3 py-1.5 bg-green-500/20 border border-green-500/50 text-green-400 rounded text-[10px] font-tactical hover:bg-green-500/30 transition-colors"
                >
                  <Check size={12} /> Aprovar
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12">
          <MessageSquare size={48} className="text-text-secondary mx-auto mb-3 opacity-30" />
          <p className="text-text-secondary font-mono text-sm">Nenhum depoimento encontrado</p>
        </div>
      )}

      {/* Modal Novo Depoimento */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-bg-secondary border border-border-color/30 rounded-xl w-full max-w-lg shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-5 border-b border-border-color/20">
              <h2 className="text-lg font-tactical font-bold tracking-wider text-text-primary">
                NOVO DEPOIMENTO
              </h2>
              <button
                onClick={handleCloseModal}
                className="text-text-secondary hover:text-text-primary transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 space-y-4">
              {/* Nome */}
              <div>
                <label className="text-[9px] font-bold uppercase tracking-[0.2em] font-tactical text-text-secondary/40 block mb-1.5">
                  Nome
                </label>
                <input
                  type="text"
                  value={formNome}
                  onChange={e => setFormNome(e.target.value)}
                  placeholder="Nome do autor"
                  className="w-full bg-bg-primary border border-border-color/30 rounded-lg px-3 py-2 text-sm text-text-primary font-mono focus:outline-none focus:border-accent-blue/50 placeholder:text-text-secondary/30"
                />
              </div>

              {/* Email */}
              <div>
                <label className="text-[9px] font-bold uppercase tracking-[0.2em] font-tactical text-text-secondary/40 block mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  value={formEmail}
                  onChange={e => setFormEmail(e.target.value)}
                  placeholder="email@exemplo.com"
                  className="w-full bg-bg-primary border border-border-color/30 rounded-lg px-3 py-2 text-sm text-text-primary font-mono focus:outline-none focus:border-accent-blue/50 placeholder:text-text-secondary/30"
                />
              </div>

              {/* Rating + Status row */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[9px] font-bold uppercase tracking-[0.2em] font-tactical text-text-secondary/40 block mb-1.5">
                    Rating
                  </label>
                  <select
                    value={formRating}
                    onChange={e => setFormRating(Number(e.target.value))}
                    className="w-full bg-bg-primary border border-border-color/30 rounded-lg px-3 py-2 text-sm text-text-primary font-mono focus:outline-none focus:border-accent-blue/50"
                  >
                    {[5, 4, 3, 2, 1].map(r => (
                      <option key={r} value={r}>{r} estrela{r > 1 ? 's' : ''}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-[9px] font-bold uppercase tracking-[0.2em] font-tactical text-text-secondary/40 block mb-1.5">
                    Status
                  </label>
                  <select
                    value={formStatus}
                    onChange={e => setFormStatus(e.target.value as 'aprovado' | 'pendente' | 'rejeitado')}
                    className="w-full bg-bg-primary border border-border-color/30 rounded-lg px-3 py-2 text-sm text-text-primary font-mono focus:outline-none focus:border-accent-blue/50"
                  >
                    <option value="pendente">Pendente</option>
                    <option value="aprovado">Aprovado</option>
                    <option value="rejeitado">Rejeitado</option>
                  </select>
                </div>
              </div>

              {/* Texto */}
              <div>
                <label className="text-[9px] font-bold uppercase tracking-[0.2em] font-tactical text-text-secondary/40 block mb-1.5">
                  Depoimento
                </label>
                <textarea
                  value={formTexto}
                  onChange={e => setFormTexto(e.target.value)}
                  placeholder="Texto do depoimento..."
                  rows={4}
                  className="w-full bg-bg-primary border border-border-color/30 rounded-lg px-3 py-2 text-sm text-text-primary font-mono focus:outline-none focus:border-accent-blue/50 placeholder:text-text-secondary/30 resize-none"
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-3 p-5 border-t border-border-color/20">
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 rounded-lg text-xs font-tactical text-text-secondary hover:text-text-primary bg-bg-tertiary/50 border border-border-color/30 transition-colors"
              >
                CANCELAR
              </button>
              <button
                onClick={handleSubmitNew}
                disabled={saving || !formNome.trim() || !formTexto.trim()}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-tactical bg-accent-blue/20 border border-accent-blue text-accent-blue hover:bg-accent-blue/30 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {saving ? (
                  <><Loader size={12} className="animate-spin" /> SALVANDO...</>
                ) : (
                  <><Plus size={12} /> CRIAR DEPOIMENTO</>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestimonialsPage;
