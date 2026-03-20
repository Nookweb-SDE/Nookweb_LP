/**
 * Seção IA Corporativa Local — Hero + Side Tabs (pilares).
 * Layout: hero, métricas em frase, tabs à esquerda, painel à direita, CTAs.
 */
import { useState } from 'react'
import { Link } from 'react-router-dom'

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
  const [activeTab, setActiveTab] = useState(0)
  const data = PILLAR_DATA[activeTab]

  return (
    <section
      className="ia-section"
      id="ia-corporativa"
      aria-labelledby="ia-hero-heading"
      data-dark-section
    >
      {/* Hero */}
      <div className="ia-hero">
        <div className="ia-hero__tag">IA Corporativa Local</div>
        <h2 id="ia-hero-heading" className="ia-hero__title">
          IA generativa dentro da sua empresa. <strong>Sem expor dados confidenciais.</strong>
        </h2>
        <p className="ia-hero__sub">
          Operação sob seu controle: infraestrutura local, conhecimento interno
          rastreável e relatórios sem fila de TI.
        </p>
      </div>

      {/* Métricas em frase corrida */}
      <div className="ia-metrics">
        <span className="ia-metrics__value">0%</span> de cloud externo
        <span className="ia-metrics__dot">·</span>
        <span className="ia-metrics__value">3</span> pilares de operação
        <span className="ia-metrics__dot">·</span>
        <span className="ia-metrics__value">≤0</span> dias para implantação
      </div>

      {/* Side Tabs */}
      <div className="ia-tabs">
        <div className="ia-tabs__nav" role="tablist" aria-label="Pilares da IA Corporativa">
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
              <div className="ia-tabs__tab-num">PILAR {pilar.num}</div>
              <div className="ia-tabs__tab-title">{pilar.title}</div>
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
            {data.num}
          </div>
          <div className="ia-tabs__panel-content">
            <h3 className="ia-tabs__panel-title">{data.title}</h3>
            <div className="ia-tabs__panel-line" />
            {data.items.map((item, i) => (
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
          Agendar demonstração →
        </Link>
        <a href="#como-funciona" className="ia-cta-secondary">
          Ver como funciona
        </a>
      </div>
    </section>
  )
}
