import {
  Globe,
  ShoppingCart,
  Smartphone,
  Cloud,
  Settings,
  Link2,
  Bot,
  Monitor,
  Palette,
  Sparkles,
  BarChart3,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export const serviceIcons: Record<string, LucideIcon> = {
  sites: Globe,
  'e-commerce': ShoppingCart,
  aplicativos: Smartphone,
  saas: Cloud,
  'erp-crm': Settings,
  integracoes: Link2,
  'inteligencia-artificial': Bot,
}

export const metodologiaIcons: Record<string, LucideIcon> = {
  Design: Palette,
  'Sistemas Web': Monitor,
  Apps: Smartphone,
  'Inteligência Artificial': Sparkles,
}

export const caseIcons: Record<string, LucideIcon> = {
  ERP: BarChart3,
  SaaS: Cloud,
  App: Smartphone,
}
