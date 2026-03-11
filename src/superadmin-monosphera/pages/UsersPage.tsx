import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Search, Download, Filter, Eye, Edit, Ban, ChevronLeft, ChevronRight, Loader, Globe, UserCheck, UserX, Shield } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface UserRow {
  id: string;
  name: string;
  email: string;
  country: string;
  plan: string;
  status: string;
  devices: number;
  created_at: string;
}

const ITEMS_PER_PAGE = 10;

const UsersPage: React.FC = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('todos');
  const [filterPlan, setFilterPlan] = useState('todos');
  const [users, setUsers] = useState<UserRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .order('created_at', { ascending: false });

      if (error || !data || data.length === 0) {
        setUsers([]);
      } else {
        const mapped: UserRow[] = data.map((row: any) => ({
          id: row.id,
          name: row.name || row.nome || 'Sem nome',
          email: row.email || '',
          country: row.country || row.pais || '',
          plan: row.plan || row.plano || 'B\u00E1sico',
          status: row.status || 'ativo',
          devices: row.devices_count || row.devices || 0,
          created_at: row.created_at || '',
        }));
        setUsers(mapped);
      }
    } catch (err) {
      console.error('UsersPage: erro ao buscar usuarios', err);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  // --- Stats ---
  const totalUsers = users.length;
  const activeUsers = users.filter(u => u.status === 'ativo').length;
  const suspendedUsers = users.filter(u => u.status === 'suspenso').length;
  const uniqueCountries = new Set(users.map(u => u.country)).size;

  // --- Filtro ---
  const filtered = users.filter(u => {
    const matchStatus = filterStatus === 'todos' || u.status === filterStatus;
    const matchPlan = filterPlan === 'todos' || u.plan === filterPlan;
    const matchSearch = search === '' ||
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchPlan && matchSearch;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const paginated = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  // Reset pagina quando filtro muda
  useEffect(() => {
    setCurrentPage(1);
  }, [search, filterStatus, filterPlan]);

  // --- Status Badge ---
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'ativo': return 'bg-green-500/20 text-green-400';
      case 'suspenso': return 'bg-red-500/20 text-red-400';
      case 'inativo': return 'bg-yellow-500/20 text-yellow-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  // --- Plan Badge ---
  const getPlanBadge = (plan: string) => {
    switch (plan) {
      case 'Enterprise': return 'bg-accent-purple/20 text-accent-purple';
      case 'Ultra': return 'bg-accent-blue/20 text-accent-blue';
      case 'Business': return 'bg-accent-yellow/20 text-accent-yellow';
      case 'Premium': return 'bg-accent-green/20 text-accent-green';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  // --- Exportar CSV ---
  const handleExportCSV = () => {
    const headers = ['ID', 'Nome', 'Email', 'Pa\u00EDs', 'Plano', 'Status', 'Dispositivos', 'Criado em'];
    const rows = filtered.map(u => [
      u.id,
      u.name,
      u.email,
      u.country,
      u.plan,
      u.status,
      String(u.devices),
      u.created_at ? new Date(u.created_at).toLocaleDateString('pt-BR') : '--',
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(r => r.map(cell => `"${cell}"`).join(',')),
    ].join('\n');

    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `monosphera_usuarios_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // --- Ver Detalhes ---
  const handleViewDetails = (userId: string) => {
    navigate('/superadmin-preview/users/' + userId);
  };

  // --- Editar ---
  const handleEdit = (userId: string) => {
    navigate('/superadmin-preview/users/' + userId);
  };

  // --- Suspender ---
  const handleSuspend = async (user: UserRow) => {
    const newStatus = user.status === 'suspenso' ? 'ativo' : 'suspenso';
    const action = newStatus === 'suspenso' ? 'suspender' : 'reativar';
    const confirmed = window.confirm(`Deseja ${action} o usu\u00E1rio "${user.name}" (${user.email})?`);
    if (!confirmed) return;

    try {
      const { error } = await supabase
        .from('users')
        .update({ status: newStatus })
        .eq('id', user.id);

      if (error) {
        alert('Erro ao atualizar status: ' + error.message);
        return;
      }
    } catch (err: any) {
      alert('Erro ao atualizar status: ' + (err?.message || 'Tente novamente'));
      return;
    }

    // Atualiza lista local
    setUsers(prev => prev.map(u => u.id === user.id ? { ...u, status: newStatus } : u));
  };

  // --- Unique plans for filter ---
  const uniquePlans = Array.from(new Set(users.map(u => u.plan))).sort();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold font-tactical tracking-widest text-text-primary">GERENCIAR USUARIOS</h1>
          <p className="text-xs font-mono text-text-secondary/50 mt-1">
            {loading ? 'Carregando...' : `Total: ${users.length} usuarios registrados`}
          </p>
        </div>
        <button
          onClick={handleExportCSV}
          className="flex items-center gap-2 px-4 py-2 bg-accent-blue/20 border border-accent-blue text-accent-blue rounded-lg text-xs font-tactical hover:bg-accent-blue/30 transition-colors"
        >
          <Download size={14} /> EXPORTAR CSV
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-bg-secondary border border-border-color/30 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-accent-blue/10 rounded-lg">
              <Users size={18} className="text-accent-blue" />
            </div>
            <div>
              <p className="text-[9px] font-mono text-text-secondary/40 uppercase tracking-wider">Total Usuarios</p>
              <p className="text-xl font-tactical font-bold text-text-primary">{totalUsers}</p>
            </div>
          </div>
        </div>
        <div className="bg-bg-secondary border border-border-color/30 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-accent-green/10 rounded-lg">
              <UserCheck size={18} className="text-accent-green" />
            </div>
            <div>
              <p className="text-[9px] font-mono text-text-secondary/40 uppercase tracking-wider">Ativos</p>
              <p className="text-xl font-tactical font-bold text-accent-green">{activeUsers}</p>
            </div>
          </div>
        </div>
        <div className="bg-bg-secondary border border-border-color/30 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-accent-red/10 rounded-lg">
              <UserX size={18} className="text-accent-red" />
            </div>
            <div>
              <p className="text-[9px] font-mono text-text-secondary/40 uppercase tracking-wider">Suspensos</p>
              <p className="text-xl font-tactical font-bold text-accent-red">{suspendedUsers}</p>
            </div>
          </div>
        </div>
        <div className="bg-bg-secondary border border-border-color/30 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-accent-purple/10 rounded-lg">
              <Globe size={18} className="text-accent-purple" />
            </div>
            <div>
              <p className="text-[9px] font-mono text-text-secondary/40 uppercase tracking-wider">Paises</p>
              <p className="text-xl font-tactical font-bold text-accent-purple">{uniqueCountries}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex items-center gap-2 text-accent-blue text-xs font-mono">
          <Loader size={14} className="animate-spin" /> Buscando dados de usuarios...
        </div>
      )}

      {/* Filtros */}
      <div className="flex gap-3">
        <div className="flex-1 relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary/40" />
          <input
            type="text"
            placeholder="Buscar por nome ou email..."
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
          <option value="todos">Todos Status</option>
          <option value="ativo">Ativos</option>
          <option value="suspenso">Suspensos</option>
          <option value="inativo">Inativos</option>
        </select>
        <select
          value={filterPlan}
          onChange={(e) => setFilterPlan(e.target.value)}
          className="bg-bg-secondary border border-border-color/30 rounded-lg px-4 py-2.5 text-xs font-mono text-text-secondary outline-none"
        >
          <option value="todos">Todos Planos</option>
          {uniquePlans.map(plan => (
            <option key={plan} value={plan}>{plan}</option>
          ))}
        </select>
      </div>

      {/* Tabela */}
      <div className="bg-bg-secondary rounded-lg border border-border-color/30 overflow-hidden">
        <div className="grid grid-cols-12 gap-4 p-3 bg-bg-tertiary border-b border-border-color text-[10px] font-bold text-text-secondary uppercase tracking-wider">
          <div className="col-span-2">Nome</div>
          <div className="col-span-2">Email</div>
          <div className="col-span-1">Pais</div>
          <div className="col-span-1">Plano</div>
          <div className="col-span-1">Status</div>
          <div className="col-span-1">Devices</div>
          <div className="col-span-2">Cadastro</div>
          <div className="col-span-2 text-right">Acoes</div>
        </div>
        {paginated.length === 0 && !loading && (
          <div className="p-6 text-center text-xs font-mono text-text-secondary/40">Nenhum usuario encontrado</div>
        )}
        {paginated.map((u) => (
          <div key={u.id} className="grid grid-cols-12 gap-4 p-3 border-b border-border-color/20 hover:bg-bg-tertiary/30 transition-colors items-center">
            <div className="col-span-2 text-xs font-tactical font-bold text-text-primary truncate">{u.name}</div>
            <div className="col-span-2 text-[10px] font-mono text-text-secondary truncate">{u.email}</div>
            <div className="col-span-1 text-[10px] font-mono text-text-secondary truncate">{u.country}</div>
            <div className="col-span-1">
              <span className={`text-[9px] px-2 py-0.5 rounded-full ${getPlanBadge(u.plan)}`}>
                {u.plan.toUpperCase()}
              </span>
            </div>
            <div className="col-span-1">
              <span className={`text-[9px] px-2 py-0.5 rounded-full ${getStatusBadge(u.status)}`}>
                {u.status.toUpperCase()}
              </span>
            </div>
            <div className="col-span-1 text-xs font-mono text-text-secondary text-center">{u.devices}</div>
            <div className="col-span-2 text-[10px] font-mono text-text-secondary/40">
              {u.created_at ? new Date(u.created_at).toLocaleDateString('pt-BR') : '--'}
            </div>
            <div className="col-span-2 flex justify-end gap-1">
              <button
                onClick={() => handleViewDetails(u.id)}
                className="p-1.5 text-accent-blue hover:bg-accent-blue/10 rounded transition-colors"
                title="Ver detalhes"
              >
                <Eye size={14} />
              </button>
              <button
                onClick={() => handleEdit(u.id)}
                className="p-1.5 text-accent-yellow hover:bg-accent-yellow/10 rounded transition-colors"
                title="Editar"
              >
                <Edit size={14} />
              </button>
              <button
                onClick={() => handleSuspend(u)}
                className={`p-1.5 rounded transition-colors ${
                  u.status === 'suspenso'
                    ? 'text-accent-green hover:bg-accent-green/10'
                    : 'text-accent-red hover:bg-accent-red/10'
                }`}
                title={u.status === 'suspenso' ? 'Reativar' : 'Suspender'}
              >
                {u.status === 'suspenso' ? <Shield size={14} /> : <Ban size={14} />}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Paginacao */}
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-mono text-text-secondary/40">
          Mostrando {paginated.length} de {filtered.length}
        </span>
        <div className="flex gap-1">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-2 bg-bg-tertiary border border-border-color/30 rounded text-text-secondary hover:text-text-primary transition-colors disabled:opacity-30"
          >
            <ChevronLeft size={14} />
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).slice(0, 5).map(page => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-2 rounded text-xs font-mono transition-colors ${
                currentPage === page
                  ? 'bg-accent-blue/20 border border-accent-blue text-accent-blue'
                  : 'bg-bg-tertiary border border-border-color/30 text-text-secondary hover:text-text-primary'
              }`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="p-2 bg-bg-tertiary border border-border-color/30 rounded text-text-secondary hover:text-text-primary transition-colors disabled:opacity-30"
          >
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default UsersPage;
