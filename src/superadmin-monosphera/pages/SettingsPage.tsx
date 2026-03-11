import React, { useState, useEffect } from 'react';
import { Settings, Save, Globe, Mail, Image, Search, Shield, Bell, Database, Server, Link as LinkIcon, Loader, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

// All settings keys that we manage
const SETTINGS_KEYS = {
  // Empresa
  company_name: 'Monosphera',
  company_legal_name: 'Monosphera Tecnologia Ltda',
  company_cnpj: '12.345.678/0001-90',
  company_email: 'contato@monosphera.com',
  company_phone: '+55 11 99999-9999',
  company_address: 'Av. Paulista, 1000 - Sao Paulo, SP',
  company_website: 'https://monosphera.com',
  // Social
  social_instagram: '@monosphera',
  social_facebook: 'monosphera',
  social_twitter: '@monosphera',
  social_linkedin: 'monosphera',
  social_youtube: 'monosphera',
  social_tiktok: '@monosphera',
  // Branding
  brand_primary_color: '#00D9FF',
  brand_secondary_color: '#0A0E27',
  brand_accent_color: '#7B61FF',
  brand_logo_url: '/logo-monosphera.svg',
  brand_logo_dark_url: '/logo-monosphera-dark.svg',
  brand_favicon_url: '/favicon.ico',
  // SEO
  seo_title: 'Monosphera - Plataforma Global de Protecao e Inteligencia',
  seo_description: 'A mais completa plataforma de seguranca digital, monitoramento familiar e protecao empresarial do mundo.',
  seo_keywords: 'seguranca digital, monitoramento, protecao familiar, controle parental',
  seo_og_image: '/og-image.png',
  seo_gtm_id: 'GTM-XXXXXXX',
  seo_clarity_id: 'XXXXXXXXXX',
  // SMTP
  smtp_host: 'smtp.sendgrid.net',
  smtp_port: '587',
  smtp_user: 'apikey',
  smtp_password: '',
  smtp_from_name: 'Monosphera',
  smtp_from_email: 'noreply@monosphera.com',
  smtp_encryption: 'TLS',
};

type SettingsMap = Record<string, string>;

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState('empresa');
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [settings, setSettings] = useState<SettingsMap>({ ...SETTINGS_KEYS });

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: fetchErr } = await supabase
        .from('cms_settings')
        .select('key, value');

      if (fetchErr) {
        console.error('Erro ao carregar configuracoes:', fetchErr);
        setError('Erro ao carregar configuracoes. Usando valores padrao.');
        return;
      }

      if (data && data.length > 0) {
        const loaded: SettingsMap = { ...SETTINGS_KEYS };
        data.forEach((row: { key: string; value: string }) => {
          loaded[row.key] = row.value;
        });
        setSettings(loaded);
      }
    } catch (err) {
      console.error('Erro fatal:', err);
      setError('Erro ao conectar com o banco de dados.');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    try {
      // Upsert all settings as key-value pairs
      const rows = Object.entries(settings).map(([key, value]) => ({
        key,
        value: value || '',
      }));

      const { error: upsertErr } = await supabase
        .from('cms_settings')
        .upsert(rows, { onConflict: 'key' });

      if (upsertErr) {
        console.error('Erro ao salvar:', upsertErr);
        setError('Erro ao salvar configuracoes: ' + upsertErr.message);
        return;
      }

      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (err) {
      console.error('Erro fatal ao salvar:', err);
      setError('Erro ao salvar configuracoes.');
    } finally {
      setSaving(false);
    }
  };

  const updateSetting = (key: string, value: string) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const sections = [
    { id: 'empresa', label: 'Empresa', icon: Shield },
    { id: 'social', label: 'Redes Sociais', icon: LinkIcon },
    { id: 'branding', label: 'Logo & Cores', icon: Image },
    { id: 'seo', label: 'SEO Global', icon: Search },
    { id: 'smtp', label: 'E-mail (SMTP)', icon: Mail },
    { id: 'notificacoes', label: 'Notificacoes', icon: Bell },
  ];

  const InputField = ({ label, settingKey, type = 'text' }: { label: string; settingKey: string; type?: string }) => (
    <div>
      <label className="block text-xs text-text-secondary font-mono uppercase mb-1">{label}</label>
      <input
        type={type}
        value={settings[settingKey] || ''}
        onChange={e => updateSetting(settingKey, e.target.value)}
        className="w-full bg-bg-primary border border-border-color/30 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-accent-blue/50"
      />
    </div>
  );

  return (
    <div className="h-full flex flex-col bg-bg-primary p-6 overflow-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-tactical text-white">Configuracoes</h1>
          <p className="text-sm text-text-secondary mt-1">
            Configuracoes gerais da plataforma (cms_settings)
          </p>
        </div>
        <div className="flex items-center gap-3">
          {loading && (
            <span className="flex items-center gap-2 text-accent-blue text-xs font-mono">
              <Loader size={14} className="animate-spin" /> Carregando...
            </span>
          )}
          <button
            onClick={handleSave}
            disabled={saving}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
              saved ? 'bg-emerald-500 text-white' : saving ? 'bg-accent-blue/50 text-bg-primary' : 'bg-accent-blue text-bg-primary hover:bg-accent-blue/80'
            }`}
          >
            <Save size={16} />
            {saved ? 'Salvo!' : saving ? 'Salvando...' : 'Salvar Alteracoes'}
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-4 flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-xs font-mono">
          <AlertCircle size={14} /> {error}
        </div>
      )}

      <div className="flex gap-6 flex-1">
        {/* Sidebar */}
        <div className="w-56 shrink-0">
          <div className="bg-bg-secondary border border-border-color/30 rounded-xl p-2">
            {sections.map(s => (
              <button
                key={s.id}
                onClick={() => setActiveSection(s.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  activeSection === s.id
                    ? 'bg-accent-blue/10 text-accent-blue'
                    : 'text-text-secondary hover:text-white hover:bg-white/5'
                }`}
              >
                <s.icon size={16} />
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 bg-bg-secondary border border-border-color/30 rounded-xl p-6">
          {activeSection === 'empresa' && (
            <div>
              <h2 className="text-lg font-tactical text-white mb-4">Informacoes da Empresa</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField label="Nome Comercial" settingKey="company_name" />
                <InputField label="Razao Social" settingKey="company_legal_name" />
                <InputField label="CNPJ" settingKey="company_cnpj" />
                <InputField label="E-mail" settingKey="company_email" />
                <InputField label="Telefone" settingKey="company_phone" />
                <InputField label="Website" settingKey="company_website" />
                <div className="md:col-span-2">
                  <InputField label="Endereco" settingKey="company_address" />
                </div>
              </div>
            </div>
          )}

          {activeSection === 'social' && (
            <div>
              <h2 className="text-lg font-tactical text-white mb-4">Redes Sociais</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField label="Instagram" settingKey="social_instagram" />
                <InputField label="Facebook" settingKey="social_facebook" />
                <InputField label="Twitter / X" settingKey="social_twitter" />
                <InputField label="LinkedIn" settingKey="social_linkedin" />
                <InputField label="YouTube" settingKey="social_youtube" />
                <InputField label="TikTok" settingKey="social_tiktok" />
              </div>
            </div>
          )}

          {activeSection === 'branding' && (
            <div>
              <h2 className="text-lg font-tactical text-white mb-4">Logo & Identidade Visual</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {[
                  { label: 'Cor Primaria', key: 'brand_primary_color' },
                  { label: 'Cor Secundaria', key: 'brand_secondary_color' },
                  { label: 'Cor Accent', key: 'brand_accent_color' },
                ].map(c => (
                  <div key={c.key}>
                    <label className="block text-xs text-text-secondary font-mono uppercase mb-1">{c.label}</label>
                    <div className="flex items-center gap-2">
                      <div
                        className="w-10 h-10 rounded-lg border border-border-color/30"
                        style={{ backgroundColor: settings[c.key] || '#000' }}
                      />
                      <input
                        type="text"
                        value={settings[c.key] || ''}
                        onChange={e => updateSetting(c.key, e.target.value)}
                        className="flex-1 bg-bg-primary border border-border-color/30 rounded-lg px-3 py-2 text-white text-sm font-mono focus:outline-none focus:border-accent-blue/50"
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { label: 'Logo (Claro)', key: 'brand_logo_url' },
                  { label: 'Logo (Escuro)', key: 'brand_logo_dark_url' },
                  { label: 'Favicon', key: 'brand_favicon_url' },
                ].map(f => (
                  <div key={f.key}>
                    <label className="block text-xs text-text-secondary font-mono uppercase mb-1">{f.label}</label>
                    <div className="bg-bg-primary border border-dashed border-border-color/30 rounded-lg p-6 text-center">
                      <Image size={24} className="text-text-secondary mx-auto mb-2" />
                      <p className="text-xs text-text-secondary">{settings[f.key] || '--'}</p>
                      <button className="text-xs text-accent-blue/60 opacity-70 cursor-not-allowed" disabled title="Upload em breve">Upload</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'seo' && (
            <div>
              <h2 className="text-lg font-tactical text-white mb-4">SEO & Analytics</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs text-text-secondary font-mono uppercase mb-1">Meta Title</label>
                  <input
                    type="text"
                    value={settings.seo_title || ''}
                    onChange={e => updateSetting('seo_title', e.target.value)}
                    className="w-full bg-bg-primary border border-border-color/30 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-accent-blue/50"
                  />
                  <p className="text-xs text-text-secondary mt-1">{(settings.seo_title || '').length}/60 caracteres</p>
                </div>
                <div>
                  <label className="block text-xs text-text-secondary font-mono uppercase mb-1">Meta Description</label>
                  <textarea
                    value={settings.seo_description || ''}
                    onChange={e => updateSetting('seo_description', e.target.value)}
                    rows={3}
                    className="w-full bg-bg-primary border border-border-color/30 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-accent-blue/50 resize-none"
                  />
                  <p className="text-xs text-text-secondary mt-1">{(settings.seo_description || '').length}/160 caracteres</p>
                </div>
                <InputField label="Keywords" settingKey="seo_keywords" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputField label="Google Tag Manager ID" settingKey="seo_gtm_id" />
                  <InputField label="Microsoft Clarity ID" settingKey="seo_clarity_id" />
                </div>
              </div>
            </div>
          )}

          {activeSection === 'smtp' && (
            <div>
              <h2 className="text-lg font-tactical text-white mb-4">Configuracao de E-mail (SMTP)</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField label="Host SMTP" settingKey="smtp_host" />
                <InputField label="Porta" settingKey="smtp_port" />
                <InputField label="Usuario" settingKey="smtp_user" />
                <InputField label="Senha" settingKey="smtp_password" type="password" />
                <InputField label="Nome do Remetente" settingKey="smtp_from_name" />
                <InputField label="E-mail Remetente" settingKey="smtp_from_email" />
                <div>
                  <label className="block text-xs text-text-secondary font-mono uppercase mb-1">Criptografia</label>
                  <select
                    value={settings.smtp_encryption || 'TLS'}
                    onChange={e => updateSetting('smtp_encryption', e.target.value)}
                    className="w-full bg-bg-primary border border-border-color/30 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-accent-blue/50"
                  >
                    <option value="TLS">TLS</option>
                    <option value="SSL">SSL</option>
                    <option value="NONE">Nenhuma</option>
                  </select>
                </div>
              </div>
              <button className="mt-4 flex items-center gap-2 text-sm text-accent-blue/60 opacity-70 cursor-not-allowed" disabled title="Requer integracao SMTP">
                <Mail size={14} />
                Enviar E-mail de Teste
              </button>
            </div>
          )}

          {activeSection === 'notificacoes' && (
            <div>
              <h2 className="text-lg font-tactical text-white mb-4">Notificacoes do Sistema</h2>
              <div className="space-y-4">
                {[
                  { label: 'Novo usuario registrado', desc: 'Receber e-mail quando um novo usuario se cadastrar', enabled: true },
                  { label: 'Novo pagamento recebido', desc: 'Notificar sobre pagamentos confirmados', enabled: true },
                  { label: 'Trial expirado', desc: 'Alerta quando um periodo trial expirar', enabled: true },
                  { label: 'Alerta de seguranca', desc: 'Tentativas de login suspeitas ou atividade anormal', enabled: true },
                  { label: 'Dispositivo offline', desc: 'Quando um dispositivo monitorado ficar offline por mais de 24h', enabled: false },
                  { label: 'Erro no sistema', desc: 'Erros criticos na aplicacao', enabled: true },
                  { label: 'Relatorio semanal', desc: 'Resumo semanal de metricas por e-mail', enabled: false },
                  { label: 'Feedback de usuario', desc: 'Quando um usuario enviar feedback ou avaliacao', enabled: true },
                ].map((n, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-bg-primary rounded-lg border border-border-color/20">
                    <div>
                      <p className="text-white text-sm font-medium">{n.label}</p>
                      <p className="text-text-secondary text-xs mt-0.5">{n.desc}</p>
                    </div>
                    <button
                      disabled
                      title="Toggles em breve"
                      className={`w-12 h-6 rounded-full relative opacity-70 cursor-not-allowed ${
                        n.enabled ? 'bg-accent-blue' : 'bg-border-color/50'
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-full bg-white absolute top-0.5 transition-all ${
                          n.enabled ? 'left-6' : 'left-0.5'
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
