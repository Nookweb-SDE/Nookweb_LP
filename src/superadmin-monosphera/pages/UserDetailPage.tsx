import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, User, Smartphone, CreditCard, TrendingUp, Edit, Ban, Eye, Loader } from 'lucide-react';
import { supabase } from '../lib/supabase';

const UserDetailPage: React.FC = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<Record<string, any> | null>(null);
  const [devicesData, setDevicesData] = useState<any[]>([]);
  const [paymentsData, setPaymentsData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) { setLoading(false); return; }
      setLoading(true);

      try {
        // Buscar dados do usuario
        const { data: userRow } = await supabase
          .from('users')
          .select('*')
          .eq('id', id)
          .single();

        if (userRow) {
          setUserData({
            nome: userRow.name || userRow.nome || 'Usu\u00E1rio',
            email: userRow.email || '',
            telefone: userRow.phone || userRow.telefone || '',
            pais: userRow.country || userRow.pais || '',
            idioma: userRow.language || userRow.idioma || '',
            plano: userRow.plan || userRow.plano || '',
            preco: userRow.price || userRow.preco || '',
            vencimento: userRow.billing_date ? new Date(userRow.billing_date).toLocaleDateString('pt-BR') : '',
            status: userRow.status || 'ativo',
            ltv: userRow.ltv || '',
            tempoCliente: userRow.customer_since || '',
            tickets: userRow.support_tickets || 0,
          });
        } else {
          setUserData(null);
        }

        // Buscar devices do usuario
        const { data: devicesRows } = await supabase
          .from('devices')
          .select('*')
          .eq('owner_id', id);

        if (devicesRows?.length) {
          setDevicesData(devicesRows.map((d: any) => ({
            modelo: d.model || d.modelo,
            os: d.os || '',
            status: d.is_online ? 'online' : 'offline',
            lastSync: d.last_seen ? new Date(d.last_seen).toLocaleString('pt-BR') : '',
          })));
        } else {
          setDevicesData([]);
        }

        // Buscar pagamentos
        const { data: paymentsRows } = await supabase
          .from('billing_transactions')
          .select('*')
          .eq('user_id', id)
          .order('created_at', { ascending: false })
          .limit(10);

        if (paymentsRows?.length) {
          setPaymentsData(paymentsRows.map((p: any) => ({
            id: p.id,
            valor: p.valor || `R$ ${p.amount}`,
            data: new Date(p.created_at).toLocaleDateString('pt-BR'),
            status: p.status || 'pago',
          })));
        } else {
          setPaymentsData([]);
        }
      } catch (err) {
        console.error('UserDetailPage: erro ao buscar dados', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader size={32} className="animate-spin text-accent-blue" />
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="space-y-6">
        <Link to="/superadmin-preview/users" className="inline-flex items-center gap-2 text-accent-blue hover:text-accent-blue/80">
          <ArrowLeft size={16} /> Voltar
        </Link>
        <div className="glass-card border border-border-color/30 rounded-lg p-12 flex flex-col items-center justify-center">
          <User size={48} className="text-text-secondary/20 mb-4" />
          <p className="text-sm font-tactical text-text-secondary/70">Usuario nao encontrado</p>
          <p className="text-xs font-mono text-text-secondary/40 mt-1">ID: {id || '—'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/superadmin-preview/users" className="p-2 bg-bg-tertiary border border-border-color/30 rounded-lg hover:border-accent-blue/30 transition-colors">
            <ArrowLeft size={16} className="text-text-secondary" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold font-tactical tracking-widest text-text-primary">{userData.nome}</h1>
            <p className="text-xs font-mono text-text-secondary/50 mt-1">ID: {id || '1'} &bull; {userData.email}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-3 py-2 bg-accent-yellow/10 border border-accent-yellow/30 text-accent-yellow/70 rounded-lg text-xs font-tactical opacity-60 cursor-not-allowed" disabled title="Em breve"><Edit size={14} /> Alterar Plano</button>
          <button className="flex items-center gap-2 px-3 py-2 bg-accent-purple/10 border border-accent-purple/30 text-accent-purple/70 rounded-lg text-xs font-tactical opacity-60 cursor-not-allowed" disabled title="Em breve"><Eye size={14} /> Impersonate</button>
          <button className="flex items-center gap-2 px-3 py-2 bg-accent-red/10 border border-accent-red/30 text-accent-red/70 rounded-lg text-xs font-tactical opacity-60 cursor-not-allowed" disabled title="Use a lista de usuarios para suspender"><Ban size={14} /> Suspender</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Info Pessoal */}
        <div className="glass-card border border-border-color/30 rounded-lg p-6">
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] font-tactical text-text-secondary/50 mb-4 flex items-center gap-2"><User size={14} /> Info Pessoal</h3>
          <div className="space-y-3">
            {[['Nome', userData.nome], ['Email', userData.email], ['Telefone', userData.telefone], ['Pais', userData.pais], ['Idioma', userData.idioma]].map(([k, v]) => (
              <div key={k}><p className="text-[9px] font-mono text-text-secondary/40 uppercase">{k}</p><p className="text-xs font-mono text-text-primary">{v}</p></div>
            ))}
          </div>
        </div>

        {/* Plano */}
        <div className="glass-card border border-border-color/30 rounded-lg p-6">
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] font-tactical text-text-secondary/50 mb-4 flex items-center gap-2"><CreditCard size={14} /> Plano Atual</h3>
          <div className="space-y-3">
            <div><p className="text-[9px] font-mono text-text-secondary/40 uppercase">Plano</p><p className="text-lg font-tactical font-bold text-accent-blue">{userData.plano}</p></div>
            <div><p className="text-[9px] font-mono text-text-secondary/40 uppercase">Preco</p><p className="text-xs font-mono text-text-primary">{userData.preco}</p></div>
            <div><p className="text-[9px] font-mono text-text-secondary/40 uppercase">Proximo Vencimento</p><p className="text-xs font-mono text-text-primary">{userData.vencimento}</p></div>
            <div><p className="text-[9px] font-mono text-text-secondary/40 uppercase">Status</p><span className="text-[10px] px-2 py-0.5 rounded-full bg-green-500/20 text-green-400">{userData.status.toUpperCase()}</span></div>
          </div>
        </div>

        {/* Metricas */}
        <div className="glass-card border border-border-color/30 rounded-lg p-6">
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] font-tactical text-text-secondary/50 mb-4 flex items-center gap-2"><TrendingUp size={14} /> Metricas</h3>
          <div className="space-y-3">
            <div><p className="text-[9px] font-mono text-text-secondary/40 uppercase">LTV</p><p className="text-lg font-tactical font-bold text-accent-green">{userData.ltv}</p></div>
            <div><p className="text-[9px] font-mono text-text-secondary/40 uppercase">Tempo como Cliente</p><p className="text-xs font-mono text-text-primary">{userData.tempoCliente}</p></div>
            <div><p className="text-[9px] font-mono text-text-secondary/40 uppercase">Tickets de Suporte</p><p className="text-xs font-mono text-text-primary">{userData.tickets}</p></div>
          </div>
        </div>
      </div>

      {/* Devices */}
      <div className="glass-card border border-border-color/30 rounded-lg p-6">
        <h3 className="text-xs font-bold uppercase tracking-[0.2em] font-tactical text-text-secondary/50 mb-4 flex items-center gap-2"><Smartphone size={14} /> Dispositivos ({devicesData.length})</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {devicesData.map((d, i) => (
            <div key={i} className="bg-bg-tertiary/50 border border-border-color/20 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-tactical font-bold text-text-primary">{d.modelo}</span>
                <span className={`w-2 h-2 rounded-full ${d.status === 'online' ? 'bg-accent-green animate-pulse' : 'bg-red-400'}`} />
              </div>
              <p className="text-[10px] font-mono text-text-secondary/50">{d.os}</p>
              <p className="text-[10px] font-mono text-text-secondary/30 mt-1">Sync: {d.lastSync}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Payments */}
      <div className="glass-card border border-border-color/30 rounded-lg p-6">
        <h3 className="text-xs font-bold uppercase tracking-[0.2em] font-tactical text-text-secondary/50 mb-4">Historico de Pagamentos</h3>
        <div className="bg-bg-secondary rounded-lg border border-border-color/20 overflow-hidden">
          <div className="grid grid-cols-4 gap-4 p-3 bg-bg-tertiary text-[10px] font-bold text-text-secondary uppercase tracking-wider">
            <div>ID</div><div>Valor</div><div>Data</div><div className="text-right">Status</div>
          </div>
          {paymentsData.map((p) => (
            <div key={p.id} className="grid grid-cols-4 gap-4 p-3 border-b border-border-color/10 text-xs font-mono items-center">
              <div className="text-accent-blue">{p.id}</div>
              <div className="text-text-primary">{p.valor}</div>
              <div className="text-text-secondary/60">{p.data}</div>
              <div className="text-right"><span className="text-[10px] px-2 py-0.5 rounded-full bg-green-500/20 text-green-400">PAGO</span></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserDetailPage;
