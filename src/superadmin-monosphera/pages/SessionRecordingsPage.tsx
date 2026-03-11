import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Video, Search, Play, Clock, Monitor, Smartphone as Phone, Globe, Loader } from 'lucide-react';

interface Recording {
  id: string;
  pais: string;
  paginas: number;
  duracao: string;
  device: string;
  data: string;
  status: string;
}

const SessionRecordingsPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [recordings, setRecordings] = useState<Recording[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecordings();
  }, []);

  const fetchRecordings = async () => {
    try {
      setLoading(true);
      const { data: recordingsData } = await supabase
        .from('session_recordings')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(20);

      setRecordings(recordingsData?.length ? recordingsData.map(r => ({
        id: r.id || r.recording_id,
        pais: r.pais || r.country_flag || '\u{1F30D}',
        paginas: r.paginas || r.page_count || 0,
        duracao: r.duracao || r.duration || '0:00',
        device: r.device || 'Desktop',
        data: new Date(r.created_at).toLocaleString('pt-BR'),
        status: r.status || 'completo',
      })) : []);
    } catch {
      setRecordings([]);
    } finally {
      setLoading(false);
    }
  };

  // Calcular stats dinamicamente dos dados
  const totalRecordings = recordings.length;
  const avgDurationSeconds = recordings.length > 0
    ? recordings.reduce((acc, r) => {
        const parts = r.duracao.split(':');
        return acc + (parseInt(parts[0] || '0') * 60) + parseInt(parts[1] || '0');
      }, 0) / recordings.length
    : 0;
  const avgMinutes = Math.floor(avgDurationSeconds / 60);
  const avgSeconds = Math.round(avgDurationSeconds % 60);
  const uniqueCountries = new Set(recordings.map(r => r.pais)).size;
  const activeCount = recordings.filter(r => r.status === 'ativo').length;

  const stats = [
    { label: 'Gravacoes Hoje', value: String(totalRecordings), icon: <Video size={18} />, color: 'accent-blue' },
    { label: 'Duracao Media', value: `${avgMinutes}:${String(avgSeconds).padStart(2, '0')}`, icon: <Clock size={18} />, color: 'accent-green' },
    { label: 'Paises', value: String(uniqueCountries), icon: <Globe size={18} />, color: 'accent-purple' },
    { label: 'Ativos', value: String(activeCount), icon: <Play size={18} />, color: 'accent-yellow' },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader size={32} className="animate-spin text-accent-blue" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold font-tactical tracking-widest text-text-primary">SESSION RECORDINGS</h1>
        <p className="text-xs font-mono text-text-secondary/50 mt-1">Gravacoes de sessoes dos visitantes</p></div>

      <div className="grid grid-cols-4 gap-4">
        {stats.map(s => (<div key={s.label} className="glass-card border border-border-color/30 rounded-lg p-4"><div className="flex items-center justify-between mb-2"><span className={`text-${s.color}`}>{s.icon}</span><span className="text-[9px] font-tactical uppercase tracking-widest text-text-secondary/50">{s.label}</span></div><p className={`text-3xl font-bold font-tactical text-${s.color}`}>{s.value}</p></div>))}
      </div>

      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary/40" />
        <input type="text" placeholder="Buscar por ID ou pais..." value={search} onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-bg-secondary border border-border-color/30 rounded-lg pl-10 pr-4 py-2.5 text-xs font-mono text-text-primary placeholder-text-secondary/30 outline-none focus:border-accent-blue/40" />
      </div>

      <div className="bg-bg-secondary rounded-lg border border-border-color/30 overflow-hidden">
        <div className="grid grid-cols-12 gap-4 p-3 bg-bg-tertiary border-b border-border-color text-[10px] font-bold text-text-secondary uppercase tracking-wider">
          <div className="col-span-1">ID</div><div className="col-span-1">Pais</div><div className="col-span-2">Paginas</div><div className="col-span-2">Duracao</div><div className="col-span-2">Dispositivo</div><div className="col-span-2">Data</div><div className="col-span-2 text-right">Acoes</div>
        </div>
        {recordings.map(r => (
          <div key={r.id} className="grid grid-cols-12 gap-4 p-3 border-b border-border-color/20 hover:bg-bg-tertiary/30 transition-colors items-center">
            <div className="col-span-1 text-[10px] font-mono text-accent-blue">{r.id}</div>
            <div className="col-span-1 text-sm">{r.pais}</div>
            <div className="col-span-2 text-xs font-mono text-text-secondary">{r.paginas} paginas</div>
            <div className="col-span-2 text-xs font-mono text-text-primary">{r.duracao}</div>
            <div className="col-span-2 flex items-center gap-1 text-xs font-mono text-text-secondary">
              {r.device === 'Desktop' ? <Monitor size={12} /> : <Phone size={12} />} {r.device}
            </div>
            <div className="col-span-2 text-[10px] font-mono text-text-secondary/40">{r.data}</div>
            <div className="col-span-2 flex justify-end gap-2">
              <span className={`text-[9px] px-2 py-0.5 rounded-full ${r.status === 'ativo' ? 'bg-green-500/20 text-green-400 animate-pulse' : 'bg-blue-500/20 text-blue-400'}`}>{r.status.toUpperCase()}</span>
              <button className="p-1.5 text-accent-blue hover:bg-accent-blue/10 rounded transition-colors" title="Reproduzir (requer player)" disabled><Play size={14} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SessionRecordingsPage;
