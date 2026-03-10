import { useMemo, useState } from "react";

type Plan = {
  id: string;
  slug: string;
  name: string;
  description: string;
  price_monthly_usd: number;
  price_yearly_usd: number;
};

const siteConfig = {
  site_name: "Aegis Prime",
  site_tagline: "Advanced Family Monitoring System",
  site_description: "Protect your family with AI-powered monitoring",
};

const plans: Plan[] = [
  {
    id: "1",
    slug: "starter",
    name: "Starter",
    description: "Up to 1 device",
    price_monthly_usd: 9,
    price_yearly_usd: 90,
  },
  {
    id: "2",
    slug: "family",
    name: "Family",
    description: "Up to 5 devices",
    price_monthly_usd: 19,
    price_yearly_usd: 190,
  },
  {
    id: "3",
    slug: "business",
    name: "Business",
    description: "Up to 20 devices",
    price_monthly_usd: 49,
    price_yearly_usd: 490,
  },
];

function fakeCreateSubscription(input: { plan_slug: string; cycle: "monthly" | "yearly"; email: string }) {
  return new Promise<{ client_secret: string; subscription_id: string; status: string }>((resolve, reject) => {
    setTimeout(() => {
      const plan = plans.find((p) => p.slug === input.plan_slug);
      if (!plan) {
        reject(new Error("Plan not found"));
        return;
      }
      if (!input.email.includes("@")) {
        reject(new Error("Email invalido"));
        return;
      }
      resolve({
        client_secret: `pi_${plan.slug}_${input.cycle}_secret_demo`,
        subscription_id: `sub_${Date.now()}`,
        status: "incomplete",
      });
    }, 450);
  });
}

export default function AegisSite1Preview() {
  const [page, setPage] = useState<"home" | "pricing" | "checkout">("home");
  const [selectedPlan, setSelectedPlan] = useState("family");
  const [cycle, setCycle] = useState<"monthly" | "yearly">("monthly");
  const [email, setEmail] = useState("customer@example.com");
  const [loading, setLoading] = useState(false);
  const [backendLog, setBackendLog] = useState("GET /api/v1/site/public-config");
  const [checkoutResult, setCheckoutResult] = useState<string | null>(null);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  const selectedPlanData = useMemo(
    () => plans.find((p) => p.slug === selectedPlan) ?? plans[1],
    [selectedPlan]
  );

  const price = cycle === "monthly" ? selectedPlanData.price_monthly_usd : selectedPlanData.price_yearly_usd;

  const navLinkStyle = (active: boolean) => ({
    color: active ? "#22d3ee" : "#94a3b8",
    textDecoration: "none",
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: "11px",
    padding: 0,
    fontFamily: "inherit",
  });

  const loadPage = (next: "home" | "pricing" | "checkout") => {
    setPage(next);
    if (next === "home") setBackendLog("GET /api/v1/site/public-config");
    if (next === "pricing") setBackendLog("GET /api/v1/site/public-config + GET /plans");
    if (next === "checkout") setBackendLog("POST /api/checkout/create-subscription");
  };

  const handleSubscribe = async () => {
    setLoading(true);
    setCheckoutError(null);
    setCheckoutResult(null);
    try {
      const res = await fakeCreateSubscription({
        plan_slug: selectedPlan,
        cycle,
        email,
      });
      setCheckoutResult(
        `subscription_id=${res.subscription_id} | status=${res.status} | client_secret=${res.client_secret}`
      );
      setBackendLog("POST /api/checkout/create-subscription 200");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Falha ao criar assinatura";
      setCheckoutError(message);
      setBackendLog("POST /api/checkout/create-subscription 400");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        background: "#020617",
        color: "#e2e8f0",
        minHeight: "420px",
        maxHeight: "594px",
        overflowY: "auto",
        fontFamily: "'DM Sans',sans-serif",
      }}
    >
      <header
        style={{
          borderBottom: "1px solid rgba(51,65,85,0.8)",
          padding: "10px 12px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "sticky",
          top: 0,
          zIndex: 3,
          background: "#020617",
        }}
      >
        <button type="button" onClick={() => loadPage("home")} style={navLinkStyle(true)}>
          <span style={{ fontSize: "14px", fontWeight: 700 }}>{siteConfig.site_name}</span>
        </button>
        <nav style={{ display: "flex", gap: "14px" }}>
          <button type="button" onClick={() => loadPage("pricing")} style={navLinkStyle(page === "pricing")}>
            Pricing
          </button>
          <button type="button" onClick={() => loadPage("checkout")} style={navLinkStyle(page === "checkout")}>
            Checkout
          </button>
        </nav>
      </header>

      <div
        style={{
          borderBottom: "1px solid rgba(51,65,85,0.7)",
          padding: "6px 12px",
          fontSize: "9px",
          color: "#94a3b8",
          letterSpacing: "0.08em",
        }}
      >
        BACKEND: {backendLog}
      </div>

      {page === "home" && (
        <main style={{ padding: "22px 14px 20px", textAlign: "center" }}>
          <h1 style={{ fontSize: "22px", lineHeight: 1.2, margin: "0 0 8px", color: "#f8fafc" }}>
            {siteConfig.site_tagline}
          </h1>
          <p style={{ color: "#94a3b8", fontSize: "12px", margin: "0 auto 14px", maxWidth: "430px" }}>
            {siteConfig.site_description}
          </p>
          <button
            type="button"
            onClick={() => loadPage("pricing")}
            style={{
              padding: "8px 16px",
              borderRadius: "8px",
              border: "none",
              background: "#06b6d4",
              color: "#082f49",
              fontWeight: 700,
              fontSize: "11px",
              cursor: "pointer",
            }}
          >
            Ver planos
          </button>
        </main>
      )}

      {page === "pricing" && (
        <main style={{ padding: "16px 12px" }}>
          <h2 style={{ margin: "0 0 8px", fontSize: "18px", color: "#f8fafc" }}>Pricing</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: "8px" }}>
            {plans.map((plan) => (
              <button
                type="button"
                key={plan.id}
                onClick={() => {
                  setSelectedPlan(plan.slug);
                  setCheckoutResult(null);
                  setCheckoutError(null);
                  loadPage("checkout");
                }}
                style={{
                  background: selectedPlan === plan.slug ? "rgba(6,182,212,0.18)" : "rgba(15,23,42,0.8)",
                  border: selectedPlan === plan.slug ? "1px solid #22d3ee" : "1px solid rgba(51,65,85,0.9)",
                  borderRadius: "10px",
                  padding: "10px",
                  textAlign: "left",
                  cursor: "pointer",
                }}
              >
                <div style={{ fontSize: "12px", fontWeight: 700, color: "#f8fafc" }}>{plan.name}</div>
                <div style={{ fontSize: "10px", color: "#94a3b8", margin: "4px 0 8px" }}>{plan.description}</div>
                <div style={{ fontSize: "11px", color: "#22d3ee" }}>${plan.price_monthly_usd.toFixed(2)}/mo</div>
              </button>
            ))}
          </div>
        </main>
      )}

      {page === "checkout" && (
        <main style={{ padding: "16px 12px 22px" }}>
          <h2 style={{ margin: "0 0 8px", fontSize: "18px", color: "#f8fafc" }}>Checkout</h2>
          <p style={{ margin: "0 0 10px", fontSize: "11px", color: "#94a3b8" }}>
            Plano: <strong style={{ color: "#e2e8f0" }}>{selectedPlanData.name}</strong>
          </p>

          <div style={{ display: "flex", gap: "8px", marginBottom: "10px" }}>
            {(["monthly", "yearly"] as const).map((value) => (
              <button
                type="button"
                key={value}
                onClick={() => setCycle(value)}
                style={{
                  borderRadius: "999px",
                  padding: "5px 10px",
                  fontSize: "10px",
                  border: cycle === value ? "1px solid #22d3ee" : "1px solid rgba(51,65,85,0.9)",
                  background: cycle === value ? "rgba(6,182,212,0.18)" : "transparent",
                  color: cycle === value ? "#22d3ee" : "#94a3b8",
                  cursor: "pointer",
                }}
              >
                {value === "monthly" ? "Monthly" : "Yearly"}
              </button>
            ))}
          </div>

          <div style={{ fontSize: "12px", marginBottom: "10px", color: "#e2e8f0" }}>Total: ${price.toFixed(2)}</div>

          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: "100%",
              padding: "8px 10px",
              borderRadius: "8px",
              border: "1px solid rgba(51,65,85,0.9)",
              background: "rgba(15,23,42,0.9)",
              color: "#e2e8f0",
              fontSize: "11px",
              boxSizing: "border-box",
            }}
          />

          <button
            type="button"
            onClick={handleSubscribe}
            disabled={loading}
            style={{
              width: "100%",
              marginTop: "10px",
              padding: "9px 12px",
              borderRadius: "8px",
              border: "none",
              background: "#06b6d4",
              color: "#082f49",
              fontWeight: 700,
              fontSize: "11px",
              cursor: loading ? "default" : "pointer",
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? "Processando..." : "Criar assinatura"}
          </button>

          {checkoutResult && (
            <div
              style={{
                marginTop: "10px",
                border: "1px solid rgba(34,197,94,0.5)",
                background: "rgba(34,197,94,0.12)",
                color: "#bbf7d0",
                borderRadius: "8px",
                padding: "8px",
                fontSize: "9px",
                wordBreak: "break-all",
              }}
            >
              {checkoutResult}
            </div>
          )}

          {checkoutError && (
            <div
              style={{
                marginTop: "10px",
                border: "1px solid rgba(248,113,113,0.5)",
                background: "rgba(239,68,68,0.12)",
                color: "#fecaca",
                borderRadius: "8px",
                padding: "8px",
                fontSize: "10px",
              }}
            >
              {checkoutError}
            </div>
          )}
        </main>
      )}
    </div>
  );
}

