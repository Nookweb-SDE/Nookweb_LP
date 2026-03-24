import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'
import { defaultLanguage, translations, type Language } from './translations'

type I18nContextValue = {
  language: Language
  setLanguage: (lang: Language) => void
  t: (path: string) => string
  list: (path: string) => string[]
}

const I18nContext = createContext<I18nContextValue | null>(null)

function getNestedValue(source: unknown, path: string): unknown {
  return path.split('.').reduce<unknown>((acc, segment) => {
    if (acc && typeof acc === 'object' && segment in (acc as Record<string, unknown>)) {
      return (acc as Record<string, unknown>)[segment]
    }
    return undefined
  }, source)
}

function getInitialLanguage(): Language {
  try {
    const saved = localStorage.getItem('nw-lang')
    if (
      saved === 'pt' ||
      saved === 'en' ||
      saved === 'zh' ||
      saved === 'hi' ||
      saved === 'es' ||
      saved === 'fr' ||
      saved === 'ar' ||
      saved === 'ru'
    ) {
      return saved
    }
  } catch {}
  return defaultLanguage
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, internalSetLanguage] = useState<Language>(getInitialLanguage)

  const setLanguage = (lang: Language) => {
    internalSetLanguage(lang)
    try {
      localStorage.setItem('nw-lang', lang)
    } catch {}
  }

  const value = useMemo<I18nContextValue>(() => {
    const t = (path: string) => {
      const activeValue = getNestedValue(translations[language], path)
      if (typeof activeValue === 'string') return activeValue
      const fallbackValue = getNestedValue(translations[defaultLanguage], path)
      return typeof fallbackValue === 'string' ? fallbackValue : path
    }

    const list = (path: string) => {
      const activeValue = getNestedValue(translations[language], path)
      if (Array.isArray(activeValue)) return activeValue.map(String)
      const fallbackValue = getNestedValue(translations[defaultLanguage], path)
      return Array.isArray(fallbackValue) ? fallbackValue.map(String) : []
    }

    return { language, setLanguage, t, list }
  }, [language])

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) {
    throw new Error('useI18n deve ser usado dentro de I18nProvider')
  }
  return ctx
}
