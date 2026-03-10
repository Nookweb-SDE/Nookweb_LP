/* ═══════════════════════════════════════════════
   CASE 1 — Armazém do Manequim
   E-commerce fábrica de manequins — preview centralizado, PT-BR
═══════════════════════════════════════════════ */

import React, { useState } from "react";

const BG = "#F7F5F3";
const TEXT = "#37322F";
const TEXT_MUTED = "rgba(55,50,47,0.80)";
const TEXT_SOFT = "#605A57";
const BORDER = "rgba(55,50,47,0.12)";
const CARD_BG = "#fff";
const MAX_W = "360px"; // conteúdo centralizado com largura máxima

function Badge({ text }: { text: string }) {
  return (
    <span
      style={{
        padding: "4px 10px",
        background: CARD_BG,
        borderRadius: "999px",
        border: `1px solid ${BORDER}`,
        fontSize: "10px",
        fontWeight: 500,
        color: TEXT,
      }}
    >
      {text}
    </span>
  );
}

export function Case1LandingPreview() {
  const [activeCard, setActiveCard] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [activePage, setActivePage] = useState<"catalogo" | "atacado" | "contato">("catalogo");

  const testimonials = [
    { quote: "Pedidos sempre no prazo e manequins de ótima qualidade. Nossa loja nunca mais ficou sem estoque.", name: "Carla Mendes", company: "Boutique Estilo, SP" },
    { quote: "Melhor preço de atacado que encontramos. O catálogo é enorme e o atendimento é excelente.", name: "Ricardo Souza", company: "Moda Center, PE" },
    { quote: "Trabalhamos há 3 anos com o Armazém do Manequim. Produto premium e entrega rápida.", name: "Fernanda Lima", company: "Multi-marcas, RJ" },
  ];

  const faqData = [
    { q: "Qual o prazo de entrega?", a: "Em capitais: 5 a 10 dias úteis. Interior: 10 a 15 dias úteis. Pedidos atacado acima de R$ 5 mil podem ter condições especiais." },
    { q: "Trabalham com pedido mínimo?", a: "Varejo: sem mínimo. Atacado: pedido mínimo de R$ 1.500 ou 20 peças, com desconto progressivo." },
    { q: "Posso encomendar manequins sob medida?", a: "Sim. Temos linha customizada para vitrines e campanhas. Solicite orçamento pelo formulário ou WhatsApp." },
    { q: "Como faço para revender?", a: "Cadastre-se como lojista, envie documentação da empresa e acesse preços de atacado e catálogo completo." },
  ];

  const sec = (content: React.ReactNode, noBorder?: boolean) => (
    <section
      style={{
        padding: "14px 16px",
        borderBottom: noBorder ? "none" : `1px solid ${BORDER}`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      <div style={{ width: "100%", maxWidth: MAX_W, margin: "0 auto" }}>{content}</div>
    </section>
  );

  return (
    <div
      style={{
        background: BG,
        minHeight: "420px",
        maxHeight: "594px",
        overflowY: "auto",
        fontFamily: "'DM Sans',sans-serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* ─── HEADER ───────────────────────────────── */}
      <header
        style={{
          padding: "10px 14px",
          borderBottom: `1px solid ${BORDER}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: BG,
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ fontSize: "14px", fontWeight: 600, color: TEXT }}>Armazém do Manequim</span>
          {[
            { key: "catalogo", label: "Catálogo" },
            { key: "atacado", label: "Atacado" },
            { key: "contato", label: "Contato" },
          ].map((item) => (
            <button
              key={item.key}
              type="button"
              onClick={() => setActivePage(item.key as "catalogo" | "atacado" | "contato")}
              style={{
                fontSize: "11px",
                color: activePage === item.key ? TEXT : TEXT_MUTED,
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
                fontFamily: "inherit",
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
        <button
          style={{
            padding: "6px 12px",
            background: CARD_BG,
            border: `1px solid ${BORDER}`,
            borderRadius: "999px",
            fontSize: "11px",
            fontWeight: 500,
            color: TEXT,
          }}
        >
          Entrar
        </button>
      </header>

      <div
        style={{
          width: "100%",
          padding: "6px 12px",
          borderBottom: `1px solid ${BORDER}`,
          background: CARD_BG,
          fontSize: "9px",
          color: TEXT_SOFT,
          textAlign: "center",
        }}
      >
        Página ativa: {activePage === "catalogo" ? "Catálogo" : activePage === "atacado" ? "Atacado" : "Contato"}
      </div>

      {/* ─── HERO ────────────────────────────────── */}
      {sec(
        <>
          <h1
            style={{
              fontSize: "clamp(16px, 3.5vw, 20px)",
              fontWeight: 400,
              color: TEXT,
              lineHeight: 1.25,
              marginBottom: "8px",
              fontFamily: "'Instrument Serif', serif",
              textAlign: "center",
            }}
          >
            Manequins para sua loja.
            <br />
            Fábrica e e-commerce.
          </h1>
          <p style={{ fontSize: "11px", color: TEXT_MUTED, lineHeight: 1.45, marginBottom: "14px", textAlign: "center" }}>
            Compre no varejo ou atacado. Variedade de modelos, cores e tamanhos. Entrega para todo o Brasil.
          </p>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button
              type="button"
              onClick={() => setActivePage("catalogo")}
              style={{
                padding: "8px 18px",
                background: TEXT,
                color: "#fff",
                border: "none",
                borderRadius: "999px",
                fontSize: "11px",
                fontWeight: 500,
              }}
            >
              Ver catálogo
            </button>
          </div>
        </>
      )}

      {/* ─── DESTAQUES (mock produtos) ───────────── */}
      {sec(
        <div
          style={{
            background: CARD_BG,
            borderRadius: "6px",
            height: "100px",
            boxShadow: "0 0 0 1px rgba(0,0,0,0.06)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span style={{ fontSize: "9px", color: "#828387", textAlign: "center" }}>
            {activeCard === 0 && "Manequins femininos · corpo completo e bustos"}
            {activeCard === 1 && "Manequins masculinos · social e casual"}
            {activeCard === 2 && "Manequins infantis e acessórios"}
          </span>
        </div>
      )}

      {/* ─── ABAS CATÁLOGO ───────────────────────── */}
      <div style={{ display: "flex", width: "100%", borderBottom: `1px solid ${BORDER}` }}>
        {[
          { title: "Feminino", desc: "Corpo, busto e pernas" },
          { title: "Masculino", desc: "Social e casual" },
          { title: "Infantil", desc: "Bebê ao juvenil" },
        ].map((f, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setActiveCard(i)}
            style={{
              flex: 1,
              padding: "10px 6px",
              borderRight: i < 2 ? `1px solid ${BORDER}` : "none",
              textAlign: "center",
              background: activeCard === i ? CARD_BG : "transparent",
              border: "none",
              cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            <div style={{ fontSize: "9px", fontWeight: 600, color: "#49423D", marginBottom: "2px" }}>{f.title}</div>
            <div style={{ fontSize: "8px", color: TEXT_SOFT }}>{f.desc}</div>
          </button>
        ))}
      </div>

      {/* ─── PROVA SOCIAL ────────────────────────── */}
      {sec(
        <>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "8px" }}>
            <Badge text="Quem compra" />
          </div>
          <h2 style={{ fontSize: "13px", fontWeight: 600, color: "#49423D", marginBottom: "4px", textAlign: "center" }}>
            Lojas que confiam no Armazém do Manequim
          </h2>
          <p style={{ fontSize: "10px", color: TEXT_SOFT, lineHeight: 1.4, textAlign: "center" }}>
            Boutiques, multimarcas e redes de moda em todo o Brasil.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "8px", marginTop: "10px" }}>
            {["Boutique Estilo", "Moda Center", "Multi-marcas", "Vitrine SP"].map((nome, i) => (
              <div key={i} style={{ fontSize: "9px", color: TEXT_MUTED, padding: "4px 8px", border: `1px solid ${BORDER}`, borderRadius: "4px" }}>{nome}</div>
            ))}
          </div>
        </>
      )}

      {/* ─── CATEGORIAS / PRODUTOS ───────────────── */}
      {sec(
        <>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "8px" }}>
            <Badge text="Categorias" />
          </div>
          <h2 style={{ fontSize: "14px", fontWeight: 600, color: "#49423D", marginBottom: "4px", textAlign: "center" }}>
            Tudo para montar sua vitrine
          </h2>
          <p style={{ fontSize: "10px", color: TEXT_SOFT, textAlign: "center", marginBottom: "10px" }}>
            Feminino, masculino, infantil, bustos, pernas e acessórios.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
            {[
              { title: "Manequins femininos", desc: "Corpo completo e bustos." },
              { title: "Manequins masculinos", desc: "Social, casual e esportivo." },
              { title: "Infantil", desc: "Bebê ao juvenil." },
              { title: "Acessórios", desc: "Pernas, braços e bases." },
            ].map((b, i) => (
              <div
                key={i}
                style={{
                  padding: "10px",
                  background: CARD_BG,
                  border: `1px solid ${BORDER}`,
                  borderRadius: "6px",
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: "10px", fontWeight: 600, color: TEXT, marginBottom: "2px" }}>{b.title}</div>
                <div style={{ fontSize: "9px", color: TEXT_SOFT }}>{b.desc}</div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* ─── FÁBRICA / DIFERENCIAIS ───────────────── */}
      {sec(
        <>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "8px" }}>
            <Badge text="Nossa fábrica" />
          </div>
          <h2 style={{ fontSize: "14px", fontWeight: 600, color: "#49423D", marginTop: "8px", marginBottom: "4px", textAlign: "center" }}>
            Fabricação própria e preço de fábrica
          </h2>
          <p style={{ fontSize: "10px", color: TEXT_SOFT, textAlign: "center" }}>
            Qualidade controlada, prazos cumpridos e atendimento para varejo e atacado.
          </p>
        </>
      )}

      {/* ─── DEPOIMENTOS ─────────────────────────── */}
      {sec(
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "8px" }}>
            <Badge text="Depoimentos" />
          </div>
          <div style={{ width: "100%", display: "flex", alignItems: "flex-start", gap: "10px" }}>
            <div style={{ flex: 1, textAlign: "center" }}>
              <p style={{ fontSize: "11px", color: "#49423D", fontStyle: "italic", lineHeight: 1.4, marginBottom: "6px" }}>
                "{testimonials[activeTestimonial].quote}"
              </p>
              <div style={{ fontSize: "10px", fontWeight: 600, color: TEXT }}>{testimonials[activeTestimonial].name}</div>
              <div style={{ fontSize: "9px", color: TEXT_SOFT }}>{testimonials[activeTestimonial].company}</div>
            </div>
            <div style={{ display: "flex", gap: "4px", flexShrink: 0 }}>
              <button
                type="button"
                onClick={() => setActiveTestimonial((activeTestimonial - 1 + 3) % 3)}
                style={{ width: "28px", height: "28px", borderRadius: "50%", border: `1px solid ${BORDER}`, background: CARD_BG, cursor: "pointer", fontSize: "12px" }}
              >
                ←
              </button>
              <button
                type="button"
                onClick={() => setActiveTestimonial((activeTestimonial + 1) % 3)}
                style={{ width: "28px", height: "28px", borderRadius: "50%", border: `1px solid ${BORDER}`, background: CARD_BG, cursor: "pointer", fontSize: "12px" }}
              >
                →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── VAREJO E ATACADO ───────────────────── */}
      {sec(
        <>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "8px" }}>
            <Badge text="Preços" />
          </div>
          <h2 style={{ fontSize: "13px", fontWeight: 600, color: "#49423D", marginBottom: "10px", textAlign: "center" }}>
            Compre no varejo ou atacado
          </h2>
          <div style={{ display: "flex", gap: "8px", justifyContent: "center", flexWrap: "wrap" }}>
            {[
              { name: "Varejo", desc: "Sem pedido mínimo", cta: "Ver preços", features: ["Qualquer quantidade", "Frete calculado", "Pagamento seguro"] },
              { name: "Atacado", desc: "A partir de 20 peças", cta: "Solicitar orçamento", features: ["Desconto progressivo", "Preço especial", "Entrega programada"], dark: true },
            ].map((plan, i) => (
              <div
                key={i}
                style={{
                  minWidth: "120px",
                  padding: "10px",
                  background: plan.dark ? TEXT : CARD_BG,
                  color: plan.dark ? "#fff" : TEXT,
                  border: `1px solid ${BORDER}`,
                  borderRadius: "8px",
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: "10px", fontWeight: 600, marginBottom: "2px" }}>{plan.name}</div>
                <div style={{ fontSize: "9px", opacity: 0.9, marginBottom: "6px" }}>{plan.desc}</div>
                <button
                  type="button"
                  onClick={() => setActivePage(plan.dark ? "atacado" : "catalogo")}
                  style={{
                    width: "100%",
                    padding: "6px",
                    fontSize: "9px",
                    fontWeight: 600,
                    border: "none",
                    borderRadius: "999px",
                    background: plan.dark ? CARD_BG : TEXT,
                    color: plan.dark ? TEXT : "#fff",
                    cursor: "pointer",
                    marginBottom: "8px",
                  }}
                >
                  {plan.cta}
                </button>
                {plan.features.map((f, j) => (
                  <div key={j} style={{ fontSize: "8px", opacity: 0.9, marginBottom: "2px" }}>✓ {f}</div>
                ))}
              </div>
            ))}
          </div>
        </>
      )}

      {/* ─── FAQ ─────────────────────────────────── */}
      {sec(
        <>
          <h2 style={{ fontSize: "13px", fontWeight: 600, color: "#49423D", marginBottom: "10px", textAlign: "center" }}>
            Perguntas frequentes
          </h2>
          {faqData.map((item, index) => (
            <div key={index} style={{ borderBottom: `1px solid ${BORDER}` }}>
              <button
                type="button"
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                style={{
                  width: "100%",
                  padding: "10px 0",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "inherit",
                  fontSize: "10px",
                  fontWeight: 500,
                  color: "#49423D",
                  textAlign: "left",
                }}
              >
                {item.q}
                <span style={{ transform: openFaq === index ? "rotate(180deg)" : "none", display: "inline-block" }}>▼</span>
              </button>
              {openFaq === index && (
                <div style={{ paddingBottom: "10px", fontSize: "9px", color: TEXT_SOFT, lineHeight: 1.4 }}>
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </>
      )}

      {/* ─── CTA ─────────────────────────────────── */}
      {sec(
        <>
          <h2 style={{ fontSize: "14px", fontWeight: 600, color: "#49423D", marginBottom: "6px", textAlign: "center" }}>
            Pronto para equipar sua loja?
          </h2>
          <p style={{ fontSize: "10px", color: TEXT_SOFT, marginBottom: "12px", textAlign: "center" }}>
            Consulte o catálogo ou solicite orçamento de atacado. Atendemos todo o Brasil.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: "8px" }}>
            <button
              type="button"
              onClick={() => setActivePage("catalogo")}
              style={{
                padding: "8px 16px",
                background: TEXT,
                color: "#fff",
                border: "none",
                borderRadius: "999px",
                fontSize: "11px",
                fontWeight: 500,
              }}
            >
              Ver catálogo
            </button>
            <button
              type="button"
              onClick={() => setActivePage("atacado")}
              style={{
                padding: "8px 16px",
                background: "transparent",
                color: TEXT,
                border: `1px solid ${BORDER}`,
                borderRadius: "999px",
                fontSize: "11px",
                fontWeight: 500,
              }}
            >
              Orçamento atacado
            </button>
          </div>
        </>
      )}

      {/* ─── FOOTER ──────────────────────────────── */}
      <footer
        style={{
          padding: "16px",
          background: BG,
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        <div style={{ maxWidth: MAX_W, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "12px" }}>
            <div style={{ fontSize: "12px", fontWeight: 600, color: "#49423D", marginBottom: "4px" }}>Armazém do Manequim</div>
            <div style={{ fontSize: "10px", color: TEXT_SOFT }}>Fábrica e e-commerce de manequins</div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px", fontSize: "9px", textAlign: "center" }}>
            <div>
              <div style={{ color: TEXT_SOFT, marginBottom: "4px" }}>Loja</div>
              <div style={{ color: TEXT }}>Catálogo</div>
              <div style={{ color: TEXT }}>Atacado</div>
              <div style={{ color: TEXT }}>Entregas</div>
            </div>
            <div>
              <div style={{ color: TEXT_SOFT, marginBottom: "4px" }}>Empresa</div>
              <div style={{ color: TEXT }}>Sobre nós</div>
              <div style={{ color: TEXT }}>Fábrica</div>
              <div style={{ color: TEXT }}>Contato</div>
            </div>
            <div>
              <div style={{ color: TEXT_SOFT, marginBottom: "4px" }}>Ajuda</div>
              <div style={{ color: TEXT }}>Trocas</div>
              <div style={{ color: TEXT }}>Prazos</div>
              <div style={{ color: TEXT }}>Atacado</div>
            </div>
          </div>
          <div style={{ marginTop: "12px", height: "24px", borderTop: `1px solid ${BORDER}`, opacity: 0.5 }} />
        </div>
      </footer>
    </div>
  );
}
