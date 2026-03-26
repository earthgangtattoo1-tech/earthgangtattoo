import { createContext, useContext, useState, useCallback, useEffect } from 'react'

// Import translations
import th from './th'

// The default/English text IS the source code (no en.js needed)
const translations = { th }

const LanguageContext = createContext()

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    try {
      // Check localStorage first
      const saved = localStorage.getItem('eg-lang')
      if (saved && translations[saved]) return saved
    } catch {}
    // Default to English
    return 'en'
  })

  useEffect(() => {
    try {
      localStorage.setItem('eg-lang', lang)
    } catch {}
    // Update HTML lang attribute
    document.documentElement.lang = lang === 'en' ? 'en' : 'th'
  }, [lang])

  const t = useCallback((path, fallback = '') => {
    if (lang === 'en') return fallback || path
    const keys = path.split('.')
    let result = translations[lang]
    for (const key of keys) {
      if (result == null) return fallback || path
      result = result[key]
    }
    return result ?? (fallback || path)
  }, [lang])

  const toggleLang = useCallback(() => {
    setLang(prev => prev === 'en' ? 'th' : 'en')
  }, [])

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLang() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLang must be used within LanguageProvider')
  return ctx
}
