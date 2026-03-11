import React, { useState, useEffect } from 'react';
import { HelpCircle, Plus, Search, ChevronDown, ChevronUp, Edit, Trash2, Eye, EyeOff, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Faq {
  id: string;
  question: string;
  answer: string;
  sort_order: number;
  created_at: string;
}

// Extrai categoria do prefixo da question: "[Geral] Pergunta..."
const extractCategory = (question: string): string => {
  const match = question.match(/^\[([^\]]+)\]\s*/);
  return match ? match[1] : 'Geral';
};

const stripCategory = (question: string): string => {
  return question.replace(/^\[([^\]]+)\]\s*/, '');
};

const categories = ['Todos', 'Geral', 'Parental', 'Comercial', 'Panico'];

const FaqPage: React.FC = () => {
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterCat, setFilterCat] = useState('Todos');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const fetchFaqs = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('cms_faqs')
      .select('*')
      .order('sort_order', { ascending: true });

    if (!error && data) {
      setFaqs(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  const handleAdd = async () => {
    const question = prompt('Pergunta (use [Categoria] no início, ex: [Geral] Como usar?):');
    if (!question) return;
    const answer = prompt('Resposta:');
    if (!answer) return;

    const maxOrder = faqs.length > 0 ? Math.max(...faqs.map(f => f.sort_order || 0)) : 0;

    const { error } = await supabase
      .from('cms_faqs')
      .insert({ question, answer, sort_order: maxOrder + 1 });

    if (!error) fetchFaqs();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir esta FAQ?')) return;
    const { error } = await supabase.from('cms_faqs').delete().eq('id', id);
    if (!error) setFaqs(prev => prev.filter(f => f.id !== id));
  };

  const handleEdit = async (faq: Faq) => {
    const question = prompt('Editar pergunta:', faq.question);
    if (!question) return;
    const answer = prompt('Editar resposta:', faq.answer);
    if (!answer) return;

    const { error } = await supabase
      .from('cms_faqs')
      .update({ question, answer })
      .eq('id', faq.id);

    if (!error) fetchFaqs();
  };

  // Mapeamento: question→pergunta, answer→resposta, categoria extraída do prefixo
  const mappedFaqs = faqs.map(f => ({
    id: f.id,
    pergunta: stripCategory(f.question),
    resposta: f.answer,
    categoria: extractCategory(f.question),
    order: f.sort_order,
  }));

  const visibleCount = mappedFaqs.length;
  const filtered = mappedFaqs.filter(f =>
    (filterCat === 'Todos' || f.categoria === filterCat) &&
    (search === '' || f.pergunta.toLowerCase().includes(search.toLowerCase()))
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 size={32} className="animate-spin text-accent-blue" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div><h1 className="text-2xl font-bold font-tactical tracking-widest text-text-primary">FAQS</h1>
          <p className="text-xs font-mono text-text-secondary/50 mt-1">Total: {faqs.length} • Categorias: {categories.length - 1} • Visiveis: {visibleCount}</p></div>
        <button onClick={handleAdd} className="flex items-center gap-2 px-4 py-2 bg-accent-blue/20 border border-accent-blue text-accent-blue rounded-lg text-xs font-tactical hover:bg-accent-blue/30 transition-colors"><Plus size={14} /> NOVA FAQ</button>
      </div>

      <div className="flex gap-3">
        <div className="flex-1 relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary/40" />
          <input type="text" placeholder="Buscar perguntas..." value={search} onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-bg-secondary border border-border-color/30 rounded-lg pl-10 pr-4 py-2.5 text-xs font-mono text-text-primary placeholder-text-secondary/30 outline-none focus:border-accent-blue/40" />
        </div>
        <div className="flex gap-1">
          {categories.map(c => (
            <button key={c} onClick={() => setFilterCat(c)} className={`px-3 py-2 rounded-lg text-[10px] font-tactical tracking-wider transition-all ${filterCat === c ? 'bg-accent-blue/20 border border-accent-blue text-accent-blue' : 'bg-bg-tertiary/50 border border-border-color/30 text-text-secondary hover:text-text-primary'}`}>{c}</button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        {filtered.map((faq) => (
          <div key={faq.id} className="glass-card border rounded-lg overflow-hidden border-border-color/30">
            <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-bg-tertiary/20 transition-colors" onClick={() => setExpandedId(expandedId === faq.id ? null : faq.id)}>
              <div className="flex items-center gap-3 flex-1">
                <HelpCircle size={16} className="text-accent-blue flex-shrink-0" />
                <span className="text-xs font-tactical font-bold text-text-primary">{faq.pergunta}</span>
                <span className="text-[9px] px-2 py-0.5 rounded-full bg-accent-blue/10 text-accent-blue flex-shrink-0">{faq.categoria}</span>
              </div>
              <div className="flex items-center gap-2 ml-4">
                <button onClick={(e) => { e.stopPropagation(); handleEdit(faqs.find(f => f.id === faq.id)!); }} className="text-accent-blue hover:bg-accent-blue/10 p-1 rounded"><Edit size={14} /></button>
                <button onClick={(e) => { e.stopPropagation(); handleDelete(faq.id); }} className="text-accent-red hover:bg-accent-red/10 p-1 rounded"><Trash2 size={14} /></button>
                {expandedId === faq.id ? <ChevronUp size={14} className="text-text-secondary" /> : <ChevronDown size={14} className="text-text-secondary" />}
              </div>
            </div>
            {expandedId === faq.id && (
              <div className="px-4 pb-4 pt-0 ml-9">
                <p className="text-xs font-mono text-text-secondary/70 leading-relaxed">{faq.resposta}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FaqPage;
