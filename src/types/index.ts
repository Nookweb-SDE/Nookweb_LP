export interface Lead {
  id: string
  name: string
  email: string
  phone?: string
  company?: string
  service?: string
  budget?: string
  message?: string
  status: LeadStatus
  consentGiven: boolean
  createdAt: string
  updatedAt: string
}

export type LeadStatus = 'NEW' | 'CONTACTED' | 'QUALIFIED' | 'WON' | 'LOST'

export interface BlogPost {
  id: string
  title: string
  slug: string
  content: string
  excerpt?: string
  category?: string
  author?: string
  tags?: string[]
  published: boolean
  publishedAt?: string
  createdAt: string
  updatedAt: string
}

export interface Case {
  id: string
  title: string
  slug: string
  description?: string
  coverImage?: string
  category?: string
  stack?: string
  results?: string
  testimonial?: string
  published: boolean
  createdAt: string
  updatedAt: string
}

export interface Service {
  id: string
  slug: string
  name: string
  description: string
  icon: string
  features?: string[]
  stack?: string[]
}

export interface TeamMember {
  id: string
  name: string
  role: string
  bio?: string
  photo?: string
  active: boolean
}

export interface SiteConfig {
  id: string
  key: string
  value: string
}
