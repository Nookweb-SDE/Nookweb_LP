/* ═══════════════════════════════════════════════
   CASE PREVIEW RENDERER — Orchestrator
   Recebe caseType (visual) + variant (0 ou 1)
   e renderiza o template correto com os dados corretos
═══════════════════════════════════════════════ */

import { CASE_PREVIEWS } from "@/data/casePreviews";
import { LandingPreview } from "./previews/LandingPreview";
import MonospheraPreview from "./previews/MonospheraPreview";
import NookLeadPreview from "./previews/NookLeadPreview";
import LatEmPreview from "./previews/LatEmPreview";
import ContPixPreview from "./previews/ContPixPreview";
import GrupoWR2Preview from "./previews/GrupoWR2Preview";
import RevivazIframePreview from "./previews/RevivazIframePreview";
import NookpetPreview from "./previews/NookpetPreview";
import MonospheraDashboardPreview from "./previews/MonospheraDashboardPreview";
import { FoodieWagonPreview } from "./previews/FoodieWagonPreview";
import { MinimalAnimatedHeroPreview } from "./previews/MinimalAnimatedHeroPreview";
import { AppPreview } from "./previews/AppPreview";
import { FitConnectPreview } from "./previews/FitConnectPreview";
import { SportConnectProPreview } from "./previews/SportConnectProPreview";
import { DashboardPreview } from "./previews/DashboardPreview";
import { DesignShowcasePreview } from "./previews/DesignShowcasePreview";

// Verticals 03–08 custom previews
import NookleadCRMPreview from "./previews/NookleadCRMPreview";
import MetricFlowPreview from "./previews/MetricFlowPreview";
import EmplyPreview from "./previews/EmplyPreview";
import PayGuardPreview from "./previews/PayGuardPreview";
import VaultAPIPreview from "./previews/VaultAPIPreview";
import FlowSyncPreview from "./previews/FlowSyncPreview";
import AutoPilotPreview from "./previews/AutoPilotPreview";
import HealthBridgePreview from "./previews/HealthBridgePreview";
import EduFlowPreview from "./previews/EduFlowPreview";
import QuickMarketPreview from "./previews/QuickMarketPreview";
import ValidaKitPreview from "./previews/ValidaKitPreview";
import SmartDeskPreview from "./previews/SmartDeskPreview";
import InsightAIPreview from "./previews/InsightAIPreview";
import IACorporativaPreview from "./previews/IACorporativaPreview";

interface Props {
  caseType: string;   // "site" | "app" | "saas" | "baas" | "n8n" | "design" | "lowcode" | "ai"
  variant: number;    // 0 ou 1
}

export function CasePreviewRenderer({ caseType, variant }: Props) {
  const cases = CASE_PREVIEWS[caseType];
  if (!cases) return null;

  const data = cases[variant] ?? cases[0];

  // Sites (01) — Case 1 Brillance (GitHub case1_landingpage) + Foodie + Minimal
  if (data.id === "site-case1-brillance") return <MonospheraPreview />;
  if (data.id === "site-foodie") return <FoodieWagonPreview />;
  if (data.id === "site-minimal-hero") return <MinimalAnimatedHeroPreview />;
  if (data.id === "site-nooklead") return <NookLeadPreview />;
  if (data.id === "site-latem") return <LatEmPreview />;
  if (data.id === "site-contpix") return <ContPixPreview />;
  if (data.id === "site-grupowr2") return <GrupoWR2Preview />;

  // Apps (02)
  if (data.id === "app-fitconnect") return <FitConnectPreview />;
  if (data.id === "app-sportconnect") return <SportConnectProPreview />;
  if (data.id === "app-revivaz") return <RevivazIframePreview />;

  // SaaS (03)
  if (data.id === "saas-nooklead-crm") return <NookleadCRMPreview />;
  if (data.id === "saas-nookpet") return <NookpetPreview />;
  if (data.id === "saas-b") return <MetricFlowPreview />;
  if (data.id === "saas-monosphera-dashboard") return <MonospheraDashboardPreview />;
  if (data.id === "saas-e") return <SmartDeskPreview />;

  // BaaS (04)
  if (data.id === "baas-emply") return <EmplyPreview />;
  if (data.id === "baas-a") return <PayGuardPreview />;
  if (data.id === "baas-b") return <VaultAPIPreview />;

  // N8N (05)
  if (data.id === "n8n-a") return <FlowSyncPreview />;
  if (data.id === "n8n-b") return <AutoPilotPreview />;

  // Design / UI-UX (06)
  if (data.id === "design-a") return <HealthBridgePreview />;
  if (data.id === "design-b") return <EduFlowPreview />;

  // Low-code (07)
  if (data.id === "lowcode-a") return <QuickMarketPreview />;
  if (data.id === "lowcode-b") return <ValidaKitPreview />;

  // IA (08)
  if (data.id === "ai-a") return <SmartDeskPreview />;
  if (data.id === "ai-b") return <InsightAIPreview />;
  if (data.id === "ai-corporativa") return <IACorporativaPreview />;

  // Generic fallbacks
  switch (data.template) {
    case "landing":   return <LandingPreview data={data} />;
    case "app":       return <AppPreview data={data} />;
    case "dashboard": return <DashboardPreview data={data} />;
    case "showcase":  return <DesignShowcasePreview data={data} />;
    default:          return <DashboardPreview data={data} />;
  }
}
