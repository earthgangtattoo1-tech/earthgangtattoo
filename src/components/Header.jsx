import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useLang } from '../i18n/LanguageContext'
import LanguageSwitch from './LanguageSwitch'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const { t } = useLang()

  const navLinks = [
    { to: '/', label: t('nav.home', 'Home') },
    { to: '/booking', label: t('nav.book', 'Book') },
    { to: '/gallery', label: t('nav.gallery', 'Gallery') },
    { to: '/consult', label: t('nav.consult', 'Style Guide') },
    { to: '/faq', label: t('nav.faq', 'FAQ') },
  ]

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
  }, [location])

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrolled
          ? 'bg-ink/90 backdrop-blur-xl border-b border-ink-border/50'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        <div className="flex items-center justify-between h-20">
          {/* Logo — editorial mark */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-9 h-9 rounded-full border border-crimson/60 flex items-center justify-center group-hover:border-crimson transition-colors duration-500">
                <span className="text-crimson font-display text-sm font-bold">EG</span>
              </div>
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-display font-bold text-[15px] tracking-[0.08em] text-cream uppercase">
                Earth Gang
              </span>
              <span className="font-serif italic text-[11px] tracking-[0.04em] text-cream-muted mt-0.5">
                Tattoo Studio
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1 ml-auto" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`relative px-4 py-2 text-[13px] font-medium tracking-wide transition-colors duration-300 rounded-lg ${
                  location.pathname === link.to
                    ? 'text-crimson'
                    : 'text-cream-muted hover:text-cream-soft'
                }`}
                aria-current={location.pathname === link.to ? 'page' : undefined}
                style={{ fontFamily: 'var(--font-body)' }}
              >
                {link.label}
                {location.pathname === link.to && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute bottom-0 left-3 right-3 h-[2px] bg-crimson rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Right side: Language switch + Book CTA + Instagram */}
          <div className="hidden md:flex items-center gap-2 ml-5">
            <LanguageSwitch />
            <Link
              to="/booking"
              className="inline-flex items-center px-5 py-2.5 text-[13px] font-semibold text-cream bg-crimson rounded-lg hover:bg-crimson-light transition-all duration-300 shadow-lg shadow-crimson/20"
            >
              {t('nav.bookNow', 'Book Now')}
            </Link>
            <a
              href="https://instagram.com/earthgangtattoo"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-ink-border hover:border-crimson transition-all duration-300"
              aria-label="Instagram"
            >
              <svg className="w-4 h-4 text-cream-muted hover:text-crimson" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
            </a>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-lg border border-ink-border bg-ink-light/50 hover:bg-ink-card transition-colors"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
            aria-controls="mobile-nav"
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <svg width="20" height="20" viewBox="0 0 16 16" fill="none" className="text-cream">
                    <path d="M2 2L14 14M14 2L2 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <svg width="20" height="20" viewBox="0 0 16 16" fill="none" className="text-cream">
                    <path d="M1 4H15M1 8H15M1 12H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-nav"
            role="navigation"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden bg-ink/95 backdrop-blur-2xl border-t border-ink-border/50"
          >
            <nav className="px-5 py-6 space-y-1">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                >
                  <Link
                    to={link.to}
                    className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                      location.pathname === link.to
                        ? 'text-crimson bg-crimson-glow'
                        : 'text-cream-muted hover:text-cream-soft hover:bg-ink-card'
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.04 }}
                className="pt-3 flex items-center gap-3"
              >
                <Link
                  to="/booking"
                  className="block px-4 py-3 rounded-lg text-sm font-semibold text-cream bg-crimson text-center flex-1"
                >
                  {t('nav.bookNow', 'Book a Session')}
                </Link>
                <div className="flex-shrink-0">
                  <LanguageSwitch />
                </div>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
