import { motion } from 'framer-motion'
import { useLang } from '../i18n/LanguageContext'

export default function LanguageSwitch() {
  const { lang, toggleLang } = useLang()

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleLang}
      className={`
        flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-mono tracking-wider
        border transition-all duration-300 cursor-pointer
        ${lang === 'th'
          ? 'border-gold/40 bg-gold-glow text-gold'
          : 'border-ink-border bg-ink-card/50 text-cream-dim hover:text-cream-muted hover:border-ink-hover'
        }
      `}
      aria-label={lang === 'en' ? 'Switch to Thai' : 'สลับเป็น English'}
    >
      <span>{lang === 'en' ? '🇹🇭' : '🇬🇧'}</span>
      <span>{lang === 'en' ? 'TH' : 'EN'}</span>
    </motion.button>
  )
}
