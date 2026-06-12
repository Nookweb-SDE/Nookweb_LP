import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'

export type Lang = 'pt' | 'en' | 'fr' | 'ja' | 'zh'

// ─── Traduções ────────────────────────────────────────────────────────────────
const T = {

  // ── Navbar ──
  nav: {
    servicos:       { pt: 'Serviços',        en: 'Services',    fr: 'Services',     ja: 'サービス',         zh: '服务' },
    cases:          { pt: 'Cases',           en: 'Cases',       fr: 'Réalisations', ja: '事例',            zh: '案例' },
    sobre:          { pt: 'Sobre',           en: 'About',       fr: 'À propos',     ja: '会社概要',         zh: '关于我们' },
    blog:           { pt: 'Blog',            en: 'Blog',        fr: 'Blog',         ja: 'ブログ',           zh: '博客' },
    contato:        { pt: 'Contato',         en: 'Contact',     fr: 'Contact',      ja: 'お問い合わせ',      zh: '联系我们' },
    cta:            { pt: 'INICIAR PROJETO', en: 'START PROJECT', fr: 'DÉMARRER',  ja: 'プロジェクト開始',  zh: '开始项目' },
    ctaMobile:      { pt: 'Iniciar Projeto', en: 'Start Project', fr: 'Démarrer', ja: 'プロジェクト開始',   zh: '开始项目' },
    idioma:         { pt: 'Idioma',          en: 'Language',    fr: 'Langue',       ja: '言語',            zh: '语言' },
  },

  // ── Hero ──
  hero: {
    badge:          { pt: 'Agência Digital', en: 'Digital Agency',  fr: 'Agence Digitale',        ja: 'デジタルエージェンシー', zh: '数字机构' },
    est:            { pt: 'Est. 2022 · São Paulo, BR', en: 'Est. 2022 · São Paulo, BR', fr: 'Fondée 2022 · São Paulo, BR', ja: '2022年設立 · サンパウロ', zh: '创立于2022年 · 圣保罗' },
    words:          {
      pt: ['CRIAMOS', 'MUNDOS', 'DIGITAIS.'],
      en: ['WE BUILD', 'DIGITAL', 'WORLDS.'],
      fr: ['CRÉONS', 'MONDES', 'DIGITAUX.'],
      ja: ['デジタル', '世界を', '創造する。'],
      zh: ['打造', '数字', '世界。'],
    },
    sub:            { pt: 'Apps inteligentes até 90% mais barato e 10× mais rápido.', en: 'Smart apps up to 90% cheaper and 10× faster.', fr: 'Applications intelligentes jusqu\'à 90% moins cher.', ja: 'スマートアプリ、90%コスト削減、10倍高速。', zh: '智能应用，成本降低90%，速度提升10倍。' },
    ctaPrimary:     { pt: 'Iniciar projeto', en: 'Start project',  fr: 'Démarrer un projet', ja: 'プロジェクトを開始', zh: '开始项目' },
    ctaSecondary:   { pt: 'Ver cases',       en: 'See cases',      fr: 'Voir les cas',       ja: '事例を見る',       zh: '查看案例' },
  },

  // ── Serviços (página índice) ──
  servicos: {
    label:          { pt: 'Serviços',         en: 'Services',       fr: 'Services',      ja: 'サービス',      zh: '服务' },
    title:          { pt: '7 formas de transformar seu negócio', en: '7 ways to transform your business', fr: '7 façons de transformer votre activité', ja: 'ビジネスを変革する7つの方法', zh: '转变业务的7种方式' },
    subtitle:       { pt: 'Clique em cada serviço para ver detalhes, stack e cases.', en: 'Click each service to see details, stack and cases.', fr: 'Cliquez pour voir les détails, la stack et les cas.', ja: '各サービスをクリックして詳細を確認。', zh: '点击每个服务查看详情和技术栈。' },
    verDetalhes:    { pt: 'ver detalhes',     en: 'see details',    fr: 'voir détails',  ja: '詳細を見る',    zh: '查看详情' },
    naoEncontrou:   { pt: 'Não encontrou o que precisa?', en: "Didn't find what you need?", fr: 'Vous ne trouvez pas ce qu\'il faut ?', ja: '必要なものが見つかりませんか？', zh: '没找到您需要的？' },
    medida:         { pt: 'Fazemos soluções sob medida para qualquer desafio digital.', en: 'We build custom solutions for any digital challenge.', fr: 'Nous créons des solutions sur mesure.', ja: 'どんな課題にもカスタム解決策。', zh: '为任何数字挑战提供定制解决方案。' },
    cta:            { pt: 'Iniciar projeto →', en: 'Start project →', fr: 'Démarrer →', ja: 'プロジェクト開始 →', zh: '开始项目 →' },
  },

  // ── Dados dos serviços (chaves planas: slug_name / slug_desc) ──
  servicesData: {
    sites_name:        { pt: 'Sites & Landing Pages',                      en: 'Sites & Landing Pages',                      fr: 'Sites & Landing Pages',              ja: 'サイト & LP',                    zh: '网站与落地页' },
    sites_desc:        { pt: 'Sites institucionais, landing pages de conversão, portfólios e one-pages premium.', en: 'Institutional sites, conversion landing pages, portfolios and premium one-pagers.', fr: 'Sites institutionnels, landing pages et portfolios premium.', ja: '企業サイト、LP、ポートフォリオ。', zh: '企业网站、落地页及优质单页。' },
    ecommerce_name:    { pt: 'E-commerce',                                 en: 'E-commerce',                                 fr: 'E-commerce',                         ja: 'Eコマース',                      zh: '电子商务' },
    ecommerce_desc:    { pt: 'Lojas virtuais inteligentes com IA, gestão de estoque, pagamentos e logística integrada.', en: 'Smart online stores with AI, inventory management, payments and integrated logistics.', fr: 'Boutiques intelligentes avec IA, gestion des stocks et paiements.', ja: 'AI搭載の通販サイト、在庫管理、決済連携。', zh: '智能网店，含AI、库存管理、支付及物流。' },
    aplicativos_name:  { pt: 'Aplicativos (Mobile/Web)',                   en: 'Apps (Mobile/Web)',                          fr: 'Applications (Mobile/Web)',           ja: 'アプリ（モバイル/Web）',           zh: '应用程序（移动/网页）' },
    aplicativos_desc:  { pt: 'Apps nativos e PWA, do MVP à escala com milhares de usuários.', en: 'Native apps and PWA, from MVP to scale with thousands of users.', fr: 'Apps natifs et PWA, du MVP à la montée en charge.', ja: 'ネイティブアプリとPWA、MVPからスケールまで。', zh: '原生应用及PWA，从MVP到大规模用户。' },
    saas_name:         { pt: 'SaaS / BaaS / CaaS',                        en: 'SaaS / BaaS / CaaS',                         fr: 'SaaS / BaaS / CaaS',                 ja: 'SaaS / BaaS / CaaS',             zh: 'SaaS / BaaS / CaaS' },
    saas_desc:         { pt: 'Plataformas sob demanda com recorrência, multi-tenant e API-first.', en: 'On-demand platforms with recurring billing, multi-tenant and API-first.', fr: 'Plateformes à la demande, multi-tenant et API-first.', ja: 'サブスクリプション、マルチテナント、API優先プラットフォーム。', zh: '按需平台，支持订阅、多租户和API优先。' },
    erp_name:          { pt: 'ERP / CRM',                                  en: 'ERP / CRM',                                  fr: 'ERP / CRM',                          ja: 'ERP / CRM',                      zh: 'ERP / CRM' },
    erp_desc:          { pt: 'Sistemas de gestão integrada, pipelines de venda e automação de processos.', en: 'Integrated management systems, sales pipelines and process automation.', fr: 'Systèmes de gestion intégrée, pipelines de vente et automatisation.', ja: '統合管理システム、販売パイプライン、業務自動化。', zh: '集成管理系统、销售管道及流程自动化。' },
    integracoes_name:  { pt: 'Integrações API',                            en: 'API Integrations',                           fr: 'Intégrations API',                   ja: 'API連携',                        zh: 'API集成' },
    integracoes_desc:  { pt: 'Conexão entre sistemas, webhooks, ETL, middleware e orquestração de dados.', en: 'System connections, webhooks, ETL, middleware and data orchestration.', fr: 'Connexion entre systèmes, webhooks, ETL et orchestration de données.', ja: 'システム連携、ウェブフック、ETL、ミドルウェア。', zh: '系统互联、Webhook、ETL、中间件及数据编排。' },
    ia_name:           { pt: 'IA Corporativa & Inteligência Artificial',   en: 'Corporate AI & Artificial Intelligence',     fr: "IA d'Entreprise & Intelligence Artificielle", ja: '法人AI・人工知能',               zh: '企业AI与人工智能' },
    ia_desc:           { pt: 'IA generativa dentro da sua empresa: modelos on-premise, RAG e chatbots corporativos sem expor dados.', en: 'Generative AI inside your company: on-premise models, RAG and corporate chatbots without exposing data.', fr: 'IA générative en entreprise : modèles on-premise, RAG et chatbots sans exposer les données.', ja: '社内生成AI：オンプレモデル、RAG、法人チャットボット。', zh: '企业内部生成AI：本地模型、RAG及企业聊天机器人，数据不外泄。' },
  },

  // ── Contato ──
  contato: {
    label:          { pt: 'Contato',                       en: 'Contact',                       fr: 'Contact',                       ja: 'お問い合わせ',        zh: '联系我们' },
    title:          { pt: 'Fale conosco',                  en: 'Get in touch',                  fr: 'Contactez-nous',                ja: 'お問い合わせ',        zh: '联系我们' },
    subtitle:       { pt: 'Preencha o formulário e retornaremos em breve.', en: 'Fill out the form and we\'ll get back to you soon.', fr: 'Remplissez le formulaire, nous vous répondrons.', ja: 'フォームにご記入ください。すぐに連絡します。', zh: '填写表格，我们将尽快回复您。' },
    nome:           { pt: 'Nome *',                        en: 'Name *',                        fr: 'Nom *',                         ja: 'お名前 *',           zh: '姓名 *' },
    email:          { pt: 'Email *',                       en: 'Email *',                       fr: 'Email *',                       ja: 'メール *',           zh: '邮箱 *' },
    telefone:       { pt: 'Telefone',                      en: 'Phone',                         fr: 'Téléphone',                     ja: '電話番号',            zh: '电话' },
    empresa:        { pt: 'Empresa',                       en: 'Company',                       fr: 'Entreprise',                    ja: '会社名',             zh: '公司' },
    servico:        { pt: 'Serviço de interesse',          en: 'Service of interest',           fr: 'Service souhaité',              ja: '希望サービス',        zh: '感兴趣的服务' },
    servicoPlaceholder: { pt: 'Selecione um serviço', en: 'Select a service', fr: 'Sélectionner un service', ja: 'サービスを選択', zh: '选择服务' },
    budget:         { pt: 'Budget estimado',               en: 'Estimated budget',              fr: 'Budget estimé',                 ja: '予算',               zh: '预算' },
    budgetOptions:  {
      pt: ['Até R$ 5.000', 'R$ 5.000 – 20.000', 'R$ 20.000 – 50.000', 'Acima de R$ 50.000'],
      en: ['Up to R$ 5,000', 'R$ 5,000 – 20,000', 'R$ 20,000 – 50,000', 'Above R$ 50,000'],
      fr: ['Jusqu\'à R$ 5 000', 'R$ 5 000 – 20 000', 'R$ 20 000 – 50 000', 'Plus de R$ 50 000'],
      ja: ['R$ 5,000まで', 'R$ 5,000 – 20,000', 'R$ 20,000 – 50,000', 'R$ 50,000以上'],
      zh: ['不超过R$ 5,000', 'R$ 5,000 – 20,000', 'R$ 20,000 – 50,000', '超过R$ 50,000'],
    },
    mensagem:       { pt: 'Mensagem *',                    en: 'Message *',                     fr: 'Message *',                     ja: 'メッセージ *',        zh: '留言 *' },
    mensagemPlaceholder: { pt: 'Descreva seu projeto ou dúvida...', en: 'Describe your project or question...', fr: 'Décrivez votre projet...', ja: 'プロジェクトを説明してください...', zh: '描述您的项目或问题...' },
    lgpd:           { pt: 'Concordo com o uso dos meus dados para contato.', en: 'I agree to the use of my data for contact purposes.', fr: 'J\'accepte l\'utilisation de mes données pour le contact.', ja: '連絡目的でデータの使用に同意します。', zh: '我同意将我的数据用于联系目的。' },
    enviar:         { pt: 'Enviar mensagem',               en: 'Send message',                  fr: 'Envoyer le message',            ja: 'メッセージを送る',    zh: '发送消息' },
    sucesso:        { pt: 'Mensagem enviada!',             en: 'Message sent!',                 fr: 'Message envoyé !',              ja: 'メッセージを送信しました！', zh: '消息已发送！' },
    sucessoSub:     { pt: 'Em breve entraremos em contato.', en: 'We\'ll get back to you soon.', fr: 'Nous vous contacterons bientôt.', ja: 'すぐにご連絡します。', zh: '我们将尽快联系您。' },
    erroCurto:      { pt: 'Nome curto demais',             en: 'Name too short',                fr: 'Nom trop court',                ja: '名前が短すぎます',    zh: '名称太短' },
    erroEmail:      { pt: 'Email inválido',                en: 'Invalid email',                 fr: 'Email invalide',                ja: '無効なメール',       zh: '无效邮箱' },
    erroMensagem:   { pt: 'Mensagem curta demais',         en: 'Message too short',             fr: 'Message trop court',            ja: 'メッセージが短すぎます', zh: '消息太短' },
    erroLgpd:       { pt: 'Aceite o uso dos dados.',       en: 'Please accept data usage.',     fr: 'Acceptez l\'utilisation des données.', ja: 'データ使用に同意してください。', zh: '请接受数据使用。' },
  },

  // ── Sobre ──
  sobre: {
    label:          { pt: 'Sobre',                         en: 'About',                         fr: 'À propos',                      ja: '会社概要',           zh: '关于我们' },
    title:          { pt: 'Holding Digital Brasileira',    en: 'Brazilian Digital Holding',     fr: 'Holding Numérique Brésilienne', ja: 'ブラジルのデジタルホールディング', zh: '巴西数字控股公司' },
    subtitle:       { pt: 'Nascemos em 2022 em São Paulo para democratizar tecnologia de ponta para empresas de todos os tamanhos.', en: 'Founded in 2022 in São Paulo to democratize cutting-edge technology for businesses of all sizes.', fr: 'Fondée en 2022 à São Paulo pour démocratiser la technologie de pointe.', ja: '2022年サンパウロ設立。あらゆる規模の企業に最先端技術を。', zh: '2022年成立于圣保罗，为各规模企业普及前沿技术。' },
  },

  // ── Footer ──
  footer: {
    tagline:        { pt: 'Sistema Certo, Na Hora Certa', en: 'Right System, Right Time', fr: 'Le bon système au bon moment', ja: '正しいシステム、正しい時に', zh: '对的系统，对的时间' },
    maisBarato:     { pt: 'mais barato',   en: 'cheaper',   fr: 'moins cher',  ja: 'コスト削減', zh: '更便宜' },
    maisRapido:     { pt: 'mais rápido',   en: 'faster',    fr: 'plus rapide', ja: '高速',      zh: '更快' },
    prototipo:      { pt: 'protótipo',     en: 'prototype', fr: 'prototype',   ja: 'プロトタイプ', zh: '原型' },
    orcamento:      { pt: 'Fazer orçamento', en: 'Get a quote', fr: 'Obtenir un devis', ja: '見積もりを依頼', zh: '获取报价' },
    direitos:       { pt: '© 2025 Nookweb. Todos os direitos reservados.', en: '© 2025 Nookweb. All rights reserved.', fr: '© 2025 Nookweb. Tous droits réservés.', ja: '© 2025 Nookweb. 無断転載禁止。', zh: '© 2025 Nookweb. 保留所有权利。' },
    politica:       { pt: 'Política de Privacidade', en: 'Privacy Policy', fr: 'Politique de confidentialité', ja: 'プライバシーポリシー', zh: '隐私政策' },
    termos:         { pt: 'Termos de Uso', en: 'Terms of Use', fr: 'Conditions d\'utilisation', ja: '利用規約', zh: '使用条款' },
  },

  // ── Stats ──
  stats: {
    maisBarato:     { pt: 'mais barato que agências tradicionais', en: 'cheaper than traditional agencies', fr: 'moins cher que les agences traditionnelles', ja: '従来のエージェンシーより安い', zh: '比传统机构便宜' },
    maisRapido:     { pt: 'mais rápido para produção', en: 'faster to production', fr: 'plus rapide en production', ja: '本番環境への展開が速い', zh: '生产部署更快' },
    prototipo:      { pt: 'para protótipo funcional', en: 'to a functional prototype', fr: 'pour un prototype fonctionnel', ja: '機能プロトタイプまで', zh: '完成功能原型' },
    projetos:       { pt: 'projetos entregues', en: 'projects delivered', fr: 'projets livrés', ja: 'プロジェクト納品', zh: '项目交付' },
    porQueLabel:    { pt: 'Por que a Nookweb', en: 'Why Nookweb', fr: 'Pourquoi Nookweb', ja: 'なぜ Nookweb？', zh: '为什么选择 Nookweb' },
    heading:        { pt: 'Entregamos resultados reais.', en: 'We deliver real results.', fr: 'Nous livrons de vrais résultats.', ja: '本物の成果をお届けします。', zh: '我们交付真实成果。' },
    card1title:     { pt: 'Projetos', en: 'Projects', fr: 'Projets', ja: 'プロジェクト', zh: '项目' },
    card1orange:    { pt: 'Entregues com qualidade', en: 'Delivered with quality', fr: 'Livrés avec qualité', ja: '品質を持って納品', zh: '高质量交付' },
    card1desc:      { pt: 'Entregas realizadas com qualidade e prazo pela Nookweb.', en: 'Deliveries made with quality and on time by Nookweb.', fr: 'Livraisons réalisées avec qualité et dans les délais.', ja: 'Nookwebによる品質とスケジュールを守った納品。', zh: 'Nookweb 按质量和时间交付的项目。' },
    card2title:     { pt: 'Mais Rápido', en: 'Faster', fr: 'Plus Rapide', ja: '高速', zh: '更快速' },
    card2orange:    { pt: 'Até 10x mais veloz', en: 'Up to 10x faster', fr: "Jusqu'à 10x plus vite", ja: '最大10倍高速', zh: '速度提升10倍' },
    card2desc:      { pt: 'Apps inteligentes até 10x mais rápidos que o desenvolvimento tradicional.', en: 'Smart apps up to 10x faster than traditional development.', fr: 'Applications jusqu\'à 10x plus rapides que le développement traditionnel.', ja: '従来の開発より最大10倍高速なスマートアプリ。', zh: '智能应用比传统开发快10倍。' },
    card3title:     { pt: 'Especialistas', en: 'Specialists', fr: 'Spécialistes', ja: 'スペシャリスト', zh: '专家团队' },
    card3orange:    { pt: 'Time sênior multidisciplinar', en: 'Senior multidisciplinary team', fr: 'Équipe senior multidisciplinaire', ja: 'シニア多学際チーム', zh: '资深跨学科团队' },
    card3desc:      { pt: 'Time multidisciplinar de seniores. Do desenho à entrega, com a expertise certa.', en: 'Senior multidisciplinary team. From design to delivery, with the right expertise.', fr: 'Équipe de seniors multidisciplinaires. Du design à la livraison.', ja: 'シニアによる多学際チーム。設計から納品まで。', zh: '资深跨学科团队，从设计到交付，专业到位。' },
  },

  // ── Metodologia ──
  metodologia: {
    label:          { pt: 'Metodologia',    en: 'Methodology',   fr: 'Méthodologie',   ja: '方法論',        zh: '方法论' },
    title:          { pt: 'Como trabalhamos', en: 'How we work', fr: 'Comment on travaille', ja: '私たちの働き方', zh: '我们如何工作' },
  },

  // ── Cases ──
  cases: {
    label:          { pt: 'Cases',          en: 'Cases',         fr: 'Réalisations',   ja: '事例',          zh: '案例' },
    title:          { pt: 'Projetos reais, resultados reais', en: 'Real projects, real results', fr: 'Projets réels, résultats réels', ja: '実際のプロジェクト、実際の結果', zh: '真实项目，真实成果' },
    verTodos:       { pt: 'Ver todos os cases', en: 'See all cases', fr: 'Voir tous les cas', ja: 'すべての事例を見る', zh: '查看所有案例' },
  },

  // ── Depoimentos ──
  depoimentos: {
    label:          { pt: 'Depoimentos',    en: 'Testimonials',  fr: 'Témoignages',    ja: 'お客様の声',     zh: '客户评价' },
    title:          { pt: 'O que nossos clientes dizem', en: 'What our clients say', fr: 'Ce que disent nos clients', ja: 'お客様の声', zh: '客户怎么说' },
    deixar:         { pt: 'Deixar depoimento', en: 'Leave a testimonial', fr: 'Laisser un témoignage', ja: '評価を残す', zh: '留下评价' },
    nome:           { pt: 'Seu nome',          en: 'Your name',          fr: 'Votre nom',             ja: 'お名前',     zh: '您的姓名' },
    cargo:          { pt: 'Cargo / Empresa',   en: 'Role / Company',     fr: 'Poste / Entreprise',    ja: '役職 / 会社', zh: '职位 / 公司' },
    mensagem:       { pt: 'Sua mensagem',      en: 'Your message',       fr: 'Votre message',         ja: 'メッセージ',  zh: '您的留言' },
    enviar:         { pt: 'Enviar',            en: 'Submit',             fr: 'Envoyer',               ja: '送信',       zh: '提交' },
    pendente:       { pt: 'Aguardando aprovação. Obrigado!', en: 'Awaiting approval. Thank you!', fr: 'En attente d\'approbation. Merci !', ja: '承認待ちです。ありがとう！', zh: '等待审批。谢谢！' },
  },

  // ── Geral ──
  geral: {
    verMais:        { pt: 'Ver mais →',    en: 'Learn more →', fr: 'En savoir plus →', ja: '詳細はこちら →', zh: '了解更多 →' },
    voltar:         { pt: '← Voltar',      en: '← Back',       fr: '← Retour',         ja: '← 戻る',        zh: '← 返回' },
    carregando:     { pt: 'Carregando…',   en: 'Loading…',     fr: 'Chargement…',      ja: '読み込み中…',    zh: '加载中…' },
    erro:           { pt: 'Erro ao enviar.', en: 'Error sending.', fr: 'Erreur d\'envoi.', ja: '送信エラー。', zh: '发送错误。' },
    iniciarProjeto: { pt: 'Iniciar Projeto', en: 'Start Project', fr: 'Démarrer', ja: 'プロジェクト開始', zh: '开始项目' },
  },

} as const

// ─── Tipo e helpers ────────────────────────────────────────────────────────────
type Translations = typeof T
type Section = keyof Translations

type LeafKey<S extends Section> = {
  [K in keyof Translations[S]]: Translations[S][K] extends Record<Lang, unknown> ? K : never
}[keyof Translations[S]]

// ─── Context ──────────────────────────────────────────────────────────────────
interface I18nContextValue {
  lang: Lang
  setLang: (l: Lang) => void
  t: <S extends Section>(section: S, key: LeafKey<S>) => string
  tArr: <S extends Section>(section: S, key: keyof Translations[S]) => string[]
}

const I18nContext = createContext<I18nContextValue | null>(null)

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    try { return (localStorage.getItem('nookweb-lang') as Lang) ?? 'pt' } catch { return 'pt' }
  })

  const setLang = useCallback((l: Lang) => {
    setLangState(l)
    try { localStorage.setItem('nookweb-lang', l) } catch {}
  }, [])

  const t = useCallback(<S extends Section>(section: S, key: LeafKey<S>): string => {
    const entry = (T[section] as Record<string, Record<Lang, string>>)[key as string]
    if (!entry) return key as string
    return entry[lang] ?? entry['pt'] ?? key as string
  }, [lang])

  const tArr = useCallback(<S extends Section>(section: S, key: keyof Translations[S]): string[] => {
    const entry = (T[section] as unknown as Record<string, Record<Lang, string[]>>)[key as string]
    if (!entry) return []
    return entry[lang] ?? entry['pt'] ?? []
  }, [lang])

  return (
    <I18nContext.Provider value={{ lang, setLang, t, tArr }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used inside I18nProvider')
  return ctx
}

// ─── Exporta as opções de idioma (mesmas do Navbar) ───────────────────────────
export const LANGUAGE_OPTIONS: { value: Lang; label: string }[] = [
  { value: 'pt', label: 'Português' },
  { value: 'en', label: 'English'   },
  { value: 'fr', label: 'Français'  },
  { value: 'ja', label: '日本語'     },
  { value: 'zh', label: '中文(简体)' },
]
