import React, { useState, useEffect } from 'react';
import { Smartphone, Search, Battery, Wifi, WifiOff, Loader, RefreshCw } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface DeviceRow {
  id: string;
  device_id: string;
  model: string;
  os_version?: string;
  battery_level: number;
  is_online: boolean;
  last_seen: string;
  owner_name?: string;
  owner_email?: string;
}

const DevicesPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('todos');
  const [devices, setDevices] = useState<DeviceRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDevices();

    // Realtime subscription for device changes
    const channel = supabase
      .channel('admin-devices-realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'devices' }, () => {
        fetchDevices();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchDevices = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('devices')
        .select('*')
        .order('last_seen', { ascending: false });

      if (error) {
        console.error('Erro ao buscar devices:', error);
      } else if (data) {
        setDevices(data);
      }
    } catch (err) {
      console.error('Erro fatal:', err);
    } finally {
      setLoading(false);
    }
  };

  const filtered = devices.filter(d => {
    const matchStatus = filterStatus === 'todos'
      || (filterStatus === 'online' && d.is_online)
      || (filterStatus === 'offline' && !d.is_online);
    const matchSearch = search === ''
      || (d.model || '').toLowerCase().includes(search.toLowerCase())
      || (d.owner_name || '').toLowerCase().includes(search.toLowerCase())
      || (d.device_id || '').toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  const getBatteryColor = (bat: number) => {
    if (bat > 50) return 'bg-accent-green';
    if (bat > 20) return 'bg-accent-yellow';
    return 'bg-accent-red';
  };

  const formatLastSeen = (iso: string) => {
    if (!iso) return '--';
    try {
      const d = new Date(iso);
      const now = new Date();
      const diffMin = Math.floor((now.getTime() - d.getTime()) / 60000);
      if (diffMin < 1) return 'Agora';
      if (diffMin < 60) return `Ha ${diffMin} min`;
      const diffH = Math.floor(diffMin / 60);
      if (diffH < 24) return `Ha ${diffH}h`;
      return d.toLocaleDateString('pt-BR');
    } catch {
      return iso;
    }
  };

  const onlineCount = devices.filter(d => d.is_online).length;
  const offlineCount = devices.length - onlineCount;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold font-tactical tracking-widest text-text-primary">GERENCIAR DISPOSITIVOS</h1>
          <p className="text-xs font-mono text-text-secondary/50 mt-1">
            {loading ? 'Carregando...' : `Total: ${devices.length} dispositivos | ${onlineCount} online | ${offlineCount} offline`}
          </p>
        </div>
        <button
          onClick={fetchDevices}
          className="flex items-center gap-2 px-3 py-2 bg-accent-blue/20 border border-accent-blue text-accent-blue rounded-lg text-xs font-tactical hover:bg-accent-blue/30 transition-colors"
        >
          <RefreshCw size={14} className={loading ? 'animate-spin' : ''} /> ATUALIZAR
        </button>
      </div>

      {loading && (
        <div className="flex items-center gap-2 text-accent-blue text-xs font-mono">
          <Loader size={14} className="animate-spin" /> Buscando dispositivos do Supabase...
        </div>
      )}

      <div className="flex gap-3">
        <div className="flex-1 relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary/40" />
          <input type="text" placeholder="Buscar por modelo, proprietario ou device_id..." value={search} onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-bg-secondary border border-border-color/30 rounded-lg pl-10 pr-4 py-2.5 text-xs font-mono text-text-primary placeholder-text-secondary/30 outline-none focus:border-accent-blue/40" />
        </div>
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}
          className="bg-bg-secondary border border-border-color/30 rounded-lg px-4 py-2.5 text-xs font-mono text-text-secondary outline-none">
          <option value="todos">Todos</option>
          <option value="online">Online</option>
          <option value="offline">Offline</option>
        </select>
      </div>

      <div className="bg-bg-secondary rounded-lg border border-border-color/30 overflow-hidden">
        <div className="grid grid-cols-12 gap-4 p-3 bg-bg-tertiary border-b border-border-color text-[10px] font-bold text-text-secondary uppercase tracking-wider">
          <div className="col-span-3">Modelo</div>
          <div className="col-span-2">Device ID</div>
          <div className="col-span-2">OS</div>
          <div className="col-span-1">Status</div>
          <div className="col-span-2">Ultimo Sync</div>
          <div className="col-span-2">Bateria</div>
        </div>
        {filtered.length === 0 && !loading && (
          <div className="p-6 text-center text-xs font-mono text-text-secondary/40">
            Nenhum dispositivo encontrado
          </div>
        )}
        {filtered.map((d) => (
          <div key={d.id} className="grid grid-cols-12 gap-4 p-3 border-b border-border-color/20 hover:bg-bg-tertiary/30 transition-colors items-center">
            <div className="col-span-3 flex items-center gap-2">
              <Smartphone size={14} className="text-accent-blue" />
              <span className="text-xs font-tactical font-bold text-text-primary truncate">{d.model || 'Desconhecido'}</span>
            </div>
            <div className="col-span-2 text-[10px] font-mono text-text-secondary truncate" title={d.device_id}>
              {d.device_id ? d.device_id.substring(0, 12) + '...' : '--'}
            </div>
            <div className="col-span-2 text-[10px] font-mono text-text-secondary">{d.os_version || '--'}</div>
            <div className="col-span-1">
              <div className="flex items-center gap-1">
                {d.is_online ? <Wifi size={12} className="text-accent-green" /> : <WifiOff size={12} className="text-red-400" />}
                <span className={`text-[9px] font-mono ${d.is_online ? 'text-accent-green' : 'text-red-400'}`}>
                  {d.is_online ? 'ONLINE' : 'OFFLINE'}
                </span>
              </div>
            </div>
            <div className="col-span-2 text-[10px] font-mono text-text-secondary/60">{formatLastSeen(d.last_seen)}</div>
            <div className="col-span-2 flex items-center gap-2">
              <div className="w-16 h-1.5 bg-bg-tertiary rounded-full overflow-hidden">
                <div className={`h-full rounded-full ${getBatteryColor(d.battery_level || 0)}`} style={{ width: `${d.battery_level || 0}%` }} />
              </div>
              <span className="text-[10px] font-mono text-text-secondary">{d.battery_level != null ? `${d.battery_level}%` : '--'}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DevicesPage;
