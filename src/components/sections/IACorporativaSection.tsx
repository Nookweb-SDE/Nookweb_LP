/**
 * Seção IA Corporativa Local — Hero + Side Tabs (pilares).
 * Layout: hero, métricas em frase, tabs à esquerda, painel à direita, CTAs.
 */
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useI18n } from '@/i18n/I18nProvider'

const PILLAR_DATA = [
  {
    num: '01',
    title: 'IA Corporativa Local',
    items: [
      'LLM rodando localmente com Ollama',
      'Zero API externa para dados sensíveis',
      'Gestão de acesso por perfil interno',
      'Chat corporativo para toda equipe via intranet',
    ],
  },
  {
    num: '02',
    title: 'Base de Conhecimento (RAG)',
    items: [
      'Ingestão de PDFs, planilhas, docs e wikis',
      'Fontes citadas em toda resposta',
      'Rastreabilidade por documento e trecho',
      'Escopo focado no contexto da empresa',
    ],
  },
  {
    num: '03',
    title: 'Relatórios Self-Service',
    items: [
      'Pergunta em português vira SQL e dashboard',
      'Conexão direta com Supabase PostgreSQL',
      'Dashboard interativo em minutos',
      'Exportação para Excel e PDF',
    ],
  },
]

export function IACorporativaSection() {
  const { language } = useI18n()
  const isPt = language === 'pt'
  const copy = isPt
    ? {
        sectionTag: 'IA Corporativa Local',
        heroTitleA: 'IA generativa dentro da sua empresa.',
        heroTitleB: 'Sem expor dados confidenciais.',
        heroSub: 'Operação sob seu controle: infraestrutura local, conhecimento interno rastreável e relatórios sem fila de TI.',
        metrics: ['de cloud externo', 'pilares de operação', 'dias para implantação'],
        tablist: 'Pilares da IA Corporativa',
        pillar: 'PILAR',
        ctaPrimary: 'Agendar demonstração →',
        ctaSecondary: 'Ver como funciona',
      }
    : {
        sectionTag: 'Local Corporate AI',
        heroTitleA: 'Generative AI inside your company.',
        heroTitleB: 'Without exposing confidential data.',
        heroSub: 'Operations under your control: local infrastructure, traceable internal knowledge and reports without IT bottlenecks.',
        metrics: ['external cloud', 'operational pillars', 'days to deploy'],
        tablist: 'Corporate AI pillars',
        pillar: 'PILLAR',
        ctaPrimary: 'Book a demo →',
        ctaSecondary: 'See how it works',
      }
  const [activeTab, setActiveTab] = useState(0)
  const data = PILLAR_DATA[activeTab]
  const dataView = isPt
    ? data
    : ({
        ...data,
        title:
          data.num === '01'
            ? 'Local Corporate AI'
            : data.num === '02'
              ? 'Knowledge Base (RAG)'
              : 'Self-Service Reports',
        items:
          data.num === '01'
            ? [
                'LLM running locally with Ollama',
                'Zero external API for sensitive data',
                'Internal role-based access control',
                'Corporate chat for the entire team via intranet',
              ]
            : data.num === '02'
              ? [
                  'Ingestion of PDFs, spreadsheets, docs and wikis',
                  'Cited sources in every response',
                  'Traceability by document and excerpt',
                  'Scope focused on company context',
                ]
              : [
                  'Question in natural language becomes SQL and dashboard',
                  'Direct connection with Supabase PostgreSQL',
                  'Interactive dashboard in minutes',
                  'Export to Excel and PDF',
                ],
      })

  return (
    <section
      className="ia-section"
      id="ia-corporativa"
      aria-labelledby="ia-hero-heading"
      data-dark-section
    >
      {/* Hero */}
      <div className="ia-hero">
        <div className="ia-hero__tag">{copy.sectionTag}</div>
        <h2 id="ia-hero-heading" className="ia-hero__title">
          {copy.heroTitleA} <strong>{copy.heroTitleB}</strong>
        </h2>
        <p className="ia-hero__sub">
          {copy.heroSub}
        </p>
      </div>

      {/* Métricas em frase corrida */}
      <div className="ia-metrics">
        <span className="ia-metrics__value">0%</span> {copy.metrics[0]}
        <span className="ia-metrics__dot">·</span>
        <span className="ia-metrics__value">3</span> {copy.metrics[1]}
        <span className="ia-metrics__dot">·</span>
        <span className="ia-metrics__value">≤0</span> {copy.metrics[2]}
      </div>

      {/* Side Tabs */}
      <div className="ia-tabs">
        <div className="ia-tabs__nav" role="tablist" aria-label={copy.tablist}>
          {PILLAR_DATA.map((pilar, index) => (
            <button
              key={pilar.num}
              type="button"
              role="tab"
              aria-selected={activeTab === index}
              aria-controls="ia-panel-content"
              id={`ia-tab-${index}`}
              className={`ia-tabs__tab ${activeTab === index ? 'active' : ''}`}
              data-tab={index}
              onClick={() => setActiveTab(index)}
            >
              <div className="ia-tabs__tab-num">{copy.pillar} {pilar.num}</div>
              <div className="ia-tabs__tab-title">
                {isPt
                  ? pilar.title
                  : pilar.num === '01'
                    ? 'Local Corporate AI'
                    : pilar.num === '02'
                      ? 'Knowledge Base (RAG)'
                      : 'Self-Service Reports'}
              </div>
            </button>
          ))}
        </div>

        <div
          className="ia-tabs__panel"
          role="tabpanel"
          id="ia-panel-content"
          aria-labelledby={`ia-tab-${activeTab}`}
        >
          <div className="ia-tabs__panel-bg-num" aria-hidden="true">
            {dataView.num}
          </div>
          <div className="ia-tabs__panel-content">
            <h3 className="ia-tabs__panel-title">{dataView.title}</h3>
            <div className="ia-tabs__panel-line" />
            {dataView.items.map((item, i) => (
              <div key={item} className="ia-tabs__item" style={{ animationDelay: `${i * 0.1}s` }}>
                <span className="ia-tabs__item-arrow" aria-hidden="true">→</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTAs */}
      <div className="ia-cta-row">
        <Link to="/contato" className="ia-cta-primary">
          {copy.ctaPrimary}
        </Link>
        <a href="#como-funciona" className="ia-cta-secondary">
          {copy.ctaSecondary}
        </a>
      </div>
    </section>
  )
}
