import { useParams, Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import { Container } from '../components/ui/Container'
import { useI18n } from '@/i18n/I18nProvider'

const posts: Record<string, { title: string; body: string; date: string }> = {
  'ia-corporativa-sem-expor-dados': {
    title: 'IA corporativa sem expor dados: como funciona um LLM on-premise',
    date: '2026-03-22',
    body: `Muitas empresas querem usar IA generativa mas esbarram em uma preocupação legítima: **enviar dados confidenciais para APIs externas**. Contratos, relatórios financeiros, dados de clientes — nada disso deveria sair do seu ambiente.

## A solução: LLM on-premise com RAG

A arquitetura que implementamos na Nookweb combina três camadas:

1. **Modelo local (Ollama)** — Um LLM roda dentro da sua infraestrutura, seja em servidor próprio ou nuvem privada. Nenhum dado sai do seu ambiente.
2. **RAG (Retrieval-Augmented Generation)** — Seus documentos internos (PDFs, manuais, wikis) são indexados em um banco vetorial. Quando alguém faz uma pergunta, o sistema busca os trechos relevantes e alimenta o modelo.
3. **Interface conversacional** — Um chat corporativo onde a equipe pergunta em português e recebe respostas com **fontes citadas**, como um analista que leu todos os documentos da empresa.

## Casos de uso reais

- **Jurídico**: "Quais cláusulas do contrato X tratam de rescisão?" — resposta em segundos, com citação do parágrafo.
- **RH**: "Qual a política de home office para o time de engenharia?" — extraído do manual interno.
- **Financeiro**: "Gere um resumo do relatório trimestral" — sem expor números para a OpenAI.

## Stack técnica

| Componente | Tecnologia |
|---|---|
| LLM | Ollama (Llama 3, Mistral) |
| Orquestração | LangChain + N8N |
| Banco vetorial | Supabase pgvector |
| Interface | Open WebUI customizado |
| Deploy | Docker Compose |

## Por que não usar o ChatGPT direto?

O ChatGPT é excelente para uso pessoal. Mas para dados corporativos sensíveis, você precisa de **governança**: saber onde o dado está, quem acessa, e garantir que ele não treina modelos de terceiros. Com LLM on-premise, você tem controle total.

---

*A Nookweb implementa IA corporativa sob medida. Fale conosco para uma demonstração com seus próprios documentos.*`,
  },
  'mvp-em-semanas-nao-meses': {
    title: 'MVP em semanas, não meses: o método Nookweb',
    date: '2026-03-18',
    body: `O maior erro de founders técnicos é construir o produto perfeito antes de validar a ideia. O maior erro de founders não-técnicos é achar que precisa de R$200 mil para ter um MVP.

## O método: camadas de fidelidade

Trabalhamos em **três camadas progressivas**:

### Camada 1 — Protótipo navegável (3-5 dias)
Com Figma e ferramentas de design, criamos um protótipo clicável que parece um app real. Serve para:
- Testar com usuários reais
- Apresentar a investidores
- Validar fluxos antes de escrever uma linha de código

### Camada 2 — MVP funcional (2-4 semanas)
Usando a combinação certa de **no-code + código**, entregamos um produto real:
- **Supabase** para backend (auth, banco, storage)
- **React/Next.js** para frontend performático
- **N8N** para automações e integrações
- **Vercel** para deploy instantâneo

### Camada 3 — Escala (contínuo)
Quando o produto validou e os primeiros clientes chegaram, refatoramos para escalar:
- Migração de no-code para código onde necessário
- Otimização de banco e queries
- Monitoramento e observabilidade

## Quando usar no-code vs. código?

| Cenário | Recomendação |
|---|---|
| Validar ideia rápido | No-code (Bubble, Webflow) |
| App com regras de negócio complexas | Código (React + Supabase) |
| Integrar 5+ sistemas | Código + N8N |
| E-commerce simples | Shopify |
| Plataforma SaaS multi-tenant | Código puro |

## O resultado

Nossos clientes lançam em **semanas** o que agências tradicionais levam **meses**. E gastam uma fração do orçamento, porque só investem pesado depois de validar.

---

*Tem uma ideia? Vamos conversar sobre o melhor caminho para tirá-la do papel.*`,
  },
  'erp-pronto-vs-sob-medida': {
    title: 'ERP pronto vs. sob medida: qual vale mais para sua operação?',
    date: '2026-03-14',
    body: `Toda empresa em crescimento chega a um ponto onde planilhas não dão mais conta. A pergunta natural é: **comprar um ERP de prateleira ou construir um sistema próprio?**

## Quando o ERP pronto funciona

Sistemas como Bling, Tiny ou Omie resolvem bem quando:
- Sua operação segue padrões de mercado (nota fiscal, estoque, financeiro)
- Você tem menos de 50 funcionários
- Não precisa de integrações complexas
- O custo mensal é aceitável a longo prazo

## Quando o ERP sob medida vale mais

O investimento em um sistema próprio se paga quando:
- **Seu processo é seu diferencial** — Se a forma como você opera é o que te diferencia da concorrência, um ERP genérico vai te forçar a se adaptar ao software, e não o contrário.
- **Integrações são críticas** — Conectar ERP de prateleira com seu e-commerce, CRM, WhatsApp e BI pode custar mais que construir do zero.
- **Escala previsível** — Pagar por usuário em ERP SaaS fica caro com 100+ pessoas. Sistema próprio tem custo fixo de infraestrutura.
- **Dados sensíveis** — Alguns setores (saúde, jurídico, financeiro) exigem controle total sobre onde os dados ficam.

## O que construímos

Na Nookweb, entregamos ERPs que incluem:
- **Dashboard em tempo real** — KPIs do negócio atualizados automaticamente
- **Pipeline de vendas** — Do lead ao contrato, com automação de follow-up
- **Gestão financeira** — Contas a pagar/receber, fluxo de caixa, conciliação
- **Automação de processos** — Aprovações, notificações, geração de documentos
- **BI integrado** — Relatórios e gráficos sem precisar de ferramenta externa

## Stack que usamos

- **PostgreSQL** — Banco robusto e escalável
- **Prisma** — ORM type-safe para Node.js
- **React** — Interface rápida e responsiva
- **N8N** — Automações e integrações sem código

---

*Quer entender se um ERP sob medida faz sentido para sua empresa? Agende uma conversa sem compromisso.*`,
  },
  'e-commerce-inteligente-ia': {
    title: 'E-commerce inteligente: como a IA aumenta o ticket médio',
    date: '2026-03-10',
    body: `A maioria das lojas online ainda funciona como um catálogo digital. O cliente busca, filtra, e compra — se encontrar o que quer. A IA muda esse jogo.

## 3 tecnologias que já funcionam

### 1. Busca semântica
Em vez de buscar por palavras exatas, o cliente descreve o que precisa:
- *"vestido para casamento na praia"* → encontra vestidos leves, claros, de tecido fluido
- *"presente para menino de 7 anos que gosta de dinossauros"* → encontra brinquedos, livros e roupas temáticas

A busca semântica usa **embeddings** para entender a intenção, não apenas as palavras.

### 2. Recomendações personalizadas
Diferente do "quem comprou X também comprou Y" básico, IA moderna analisa:
- Histórico de navegação (não só de compras)
- Contexto temporal (inverno → roupas quentes)
- Perfil de comportamento (explorador vs. comprador direto)

Resultado: **recomendações que parecem curadoria**, não algoritmo.

### 3. Chatbot de vendas
Um assistente que:
- Entende o que o cliente quer em linguagem natural
- Sugere produtos do catálogo real
- Responde dúvidas sobre frete, troca e pagamento
- Funciona 24h sem custo de equipe

## Impacto real em números

| Métrica | Antes da IA | Depois da IA |
|---|---|---|
| Taxa de conversão | 1.8% | 3.2% |
| Ticket médio | R$120 | R$185 |
| Tempo médio no site | 2min | 4.5min |
| Abandono de carrinho | 72% | 58% |

*Dados agregados de 3 projetos Nookweb em 2025-2026.*

## Não precisa ser caro

Muitas dessas tecnologias são open-source ou têm custo baixo por transação. O investimento está na **integração inteligente** com sua plataforma — seja Shopify, WooCommerce ou loja custom.

---

*Quer ver como IA pode funcionar na sua loja? Fazemos um diagnóstico gratuito do seu e-commerce.*`,
  },
  'integracoes-api-sem-dor': {
    title: 'Integrações API sem dor: conectando sistemas que não conversam',
    date: '2026-03-06',
    body: `Sua empresa usa 5 sistemas diferentes. Nenhum conversa com o outro. O resultado: **retrabalho, dados duplicados e erros humanos**.

## O problema real

Cenários que vemos toda semana:
- Venda no e-commerce → alguém digita manualmente no ERP
- Lead entra pelo site → alguém copia para o CRM
- Nota fiscal emitida → alguém atualiza a planilha financeira
- Cliente reclama no WhatsApp → alguém abre ticket no suporte

Cada "alguém" é um ponto de falha. E cada cópia manual é uma oportunidade de erro.

## A solução: orquestração de dados

Integrações bem feitas eliminam o trabalho manual e garantem que a **informação flui automaticamente** entre sistemas:

### Webhooks em tempo real
Quando algo acontece no sistema A, o sistema B é notificado instantaneamente:
- Novo pedido → atualiza estoque + dispara nota fiscal + envia e-mail
- Pagamento confirmado → libera acesso + atualiza CRM + notifica equipe

### ETL para dados históricos
Para migrar e sincronizar dados entre sistemas:
- Exporta do sistema legado → transforma → carrega no novo sistema
- Sincronização periódica de catálogos, preços e estoque

### Middleware inteligente
Uma camada intermediária que:
- Traduz formatos entre APIs diferentes
- Trata erros e retentativas automaticamente
- Loga tudo para auditoria

## Ferramentas que usamos

- **N8N** — Automação visual, self-hosted, sem limites de execução
- **APIs REST/GraphQL** — Integrações custom quando o volume exige
- **Supabase Edge Functions** — Lógica serverless para transformações rápidas
- **Zapier** — Para integrações simples e rápidas (quando o custo justifica)

## Exemplo real: e-commerce + ERP + logística

Um cliente nosso vendia em 3 marketplaces + loja própria. Antes: 4 pessoas gerenciando estoque manualmente. Depois da integração: **1 pessoa supervisiona**, o sistema faz o resto.

| Fluxo | Antes | Depois |
|---|---|---|
| Atualização de estoque | Manual, 3x ao dia | Automático, tempo real |
| Emissão de NF | Manual, 1 por 1 | Automática por webhook |
| Rastreio do pedido | E-mail manual | SMS + WhatsApp automático |

---

*Tem sistemas que não conversam? Mapeamos suas integrações e implementamos em semanas.*`,
  },
  'saas-do-zero-ao-recorrente': {
    title: 'SaaS do zero ao recorrente: arquitetura multi-tenant na prática',
    date: '2026-03-02',
    body: `Construir um SaaS é diferente de construir um sistema para um cliente. No SaaS, **cada decisão técnica afeta todos os clientes ao mesmo tempo**. Errar a arquitetura no início custa caro depois.

## Multi-tenant: o conceito central

Multi-tenant significa que **um único sistema serve múltiplos clientes** (tenants), cada um com seus dados isolados. Existem três abordagens:

### 1. Banco compartilhado + coluna tenant_id
- **Prós**: Simples, barato, fácil de manter
- **Contras**: Risco de vazamento de dados se esquecer um WHERE
- **Quando usar**: MVP, até ~100 tenants

### 2. Schema por tenant
- **Prós**: Isolamento melhor, migrations por tenant
- **Contras**: Complexidade operacional
- **Quando usar**: 100-1000 tenants, dados sensíveis

### 3. Banco por tenant
- **Prós**: Isolamento total, compliance máximo
- **Contras**: Custo alto, deploy complexo
- **Quando usar**: Enterprise, regulamentações rígidas

## Stack que recomendamos para começar

| Camada | Tecnologia | Por quê |
|---|---|---|
| Auth | Supabase Auth | Multi-tenant nativo, RLS integrado |
| Banco | PostgreSQL + RLS | Row Level Security garante isolamento |
| API | Node.js + Prisma | Type-safe, migrations automáticas |
| Frontend | React + Vite | Build rápido, ótima DX |
| Billing | Stripe | Assinaturas, trials, invoices |
| Deploy | Vercel + Supabase | Zero DevOps no início |

## Row Level Security: o segredo do isolamento

Com RLS do PostgreSQL, você define políticas no banco que **impedem fisicamente** um tenant de ver dados de outro:

\`\`\`sql
CREATE POLICY tenant_isolation ON orders
  USING (tenant_id = auth.jwt() ->> 'tenant_id');
\`\`\`

Mesmo que o código da aplicação tenha um bug, o banco não retorna dados errados.

## Monetização: como cobrar

Modelos que funcionam:
- **Freemium** — Gratuito com limites, pago para mais recursos
- **Por uso** — Cobra por transação, API call ou armazenamento
- **Por seat** — Cobra por usuário ativo
- **Flat rate** — Preço fixo por plano (básico, pro, enterprise)

O Stripe suporta todos esses modelos nativamente.

---

*Quer transformar sua ideia em um SaaS? Começamos pelo MVP e escalamos juntos.*`,
  },
  'como-escolher-stack': {
    title: 'Como escolher a stack do seu projeto',
    date: '2026-02-20',
    body: `Escolher a stack certa é uma das decisões mais importantes para o sucesso do seu projeto. Não existe resposta universal — depende do contexto.

## Fatores decisivos

### 1. Prazo
Se você precisa lançar em semanas, no-code ou low-code pode ser a melhor escolha. Se o prazo é flexível e o projeto é complexo, código customizado dá mais controle.

### 2. Equipe
Não adianta escolher Rust se seu time só conhece JavaScript. A melhor stack é aquela que seu time domina — ou que você consegue contratar para.

### 3. Escala esperada
- **Até 1.000 usuários**: Qualquer stack funciona. Não otimize antes de ter o problema.
- **1.000 - 100.000**: Escolha tecnologias com ecossistema maduro (React, Node.js, PostgreSQL).
- **100.000+**: Considere microserviços, filas, cache e CDN desde o início.

### 4. Orçamento
No-code reduz custo inicial, mas pode ficar caro com escala. Código customizado tem custo inicial maior, mas custo marginal menor.

## Nossas recomendações por tipo de projeto

| Tipo | Stack recomendada |
|---|---|
| Landing page | Next.js + Vercel |
| MVP rápido | Supabase + React + Vercel |
| E-commerce simples | Shopify |
| E-commerce custom | Next.js + Supabase + Stripe |
| App mobile | React Native ou Flutter |
| SaaS | Node.js + PostgreSQL + React |
| Site institucional | Webflow ou WordPress |

## A regra de ouro

> Comece com a stack mais simples que resolve seu problema. Só adicione complexidade quando o problema exigir.

---

*Não sabe por onde começar? Fazemos uma consultoria de stack gratuita para seu projeto.*`,
  },
  'vibe-coding-na-pratica': {
    title: 'Vibe Coding na prática',
    date: '2026-02-18',
    body: `Vibe Coding é a combinação de **IA generativa + ferramentas no-code + código tradicional** em um fluxo de trabalho que prioriza velocidade sem sacrificar qualidade.

## O workflow

### 1. Ideação com IA
Usamos modelos como Claude e GPT para:
- Gerar estrutura inicial de componentes
- Escrever lógica de negócio a partir de descrições em português
- Criar schemas de banco de dados
- Redigir testes automatizados

### 2. Prototipagem com no-code
Ferramentas visuais para as partes que não precisam de código:
- **Webflow** para landing pages
- **Bubble** para protótipos interativos
- **N8N** para automações

### 3. Código para o que importa
O código entra onde a qualidade e performance são críticas:
- Lógica de negócio complexa
- Integrações com APIs externas
- Otimização de performance
- Testes automatizados

## Ferramentas do nosso dia a dia

- **Cursor** — Editor de código com IA integrada
- **Claude** — Para arquitetura, revisão de código e documentação
- **Supabase** — Backend completo em minutos
- **Vercel** — Deploy automático a cada commit
- **Figma** — Design e protótipos

## O resultado

O que antes levava **3-6 meses**, agora entregamos em **3-6 semanas**. E com qualidade comparável, porque a IA acelera as partes repetitivas enquanto o desenvolvedor foca nas decisões arquiteturais.

## Não é sobre substituir programadores

Vibe Coding não elimina a necessidade de desenvolvedores. Ele **amplifica** a capacidade de cada desenvolvedor, permitindo que uma pessoa faça o trabalho de três — com menos bugs e mais rapidez.

---

*Quer ver Vibe Coding em ação? Agende uma demo e mostramos como funciona no seu contexto.*`,
  },
}

export function BlogPost() {
  const { language } = useI18n()
  const copy = language === 'pt'
    ? {
        notFound: 'Post não encontrado.',
        back: 'Voltar ao blog',
      }
    : {
        notFound: 'Post not found.',
        back: 'Back to blog',
      }
  const { slug } = useParams<{ slug: string }>()
  const post = slug ? posts[slug] : null

  if (!post) {
    return (
      <main className="py-12 sm:py-20 text-center px-4">
        <p>{copy.notFound}</p>
        <Link to="/blog">{copy.back}</Link>
      </main>
    )
  }

  return (
    <main className="py-12 sm:py-16 md:py-20">
      <Container>
        <article className="max-w-3xl w-full overflow-x-hidden">
          <Link to="/blog" className="text-accent hover:underline">← {copy.back}</Link>
          <span className="ml-2 sm:ml-4 font-mono text-sm text-neutral">{post.date}</span>
          <h1 className="mt-4 font-display text-2xl sm:text-3xl md:text-4xl text-heavy">{post.title}</h1>
          <div className="prose prose-lg mt-8 text-neutral">
            <ReactMarkdown>{post.body}</ReactMarkdown>
          </div>
        </article>
      </Container>
    </main>
  )
}
