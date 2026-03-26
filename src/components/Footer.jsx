import { MapPin, Clock, Phone, Mail } from 'lucide-react'
import { Link } from 'react-router-dom'
import config, { STUDIO } from '../config'
import { useLang } from '../i18n/LanguageContext'

const { studio } = config

export default function Footer() {
  const { t } = useLang()

  return (
    <footer className="bg-ink-light border-t border-ink-border/50 relative" role="contentinfo">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-20">
        {/* Top row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          {/* Brand — spans 5 cols */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-full border border-crimson/60 flex items-center justify-center">
                <span className="text-crimson font-display text-sm font-bold">EG</span>
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-display font-bold text-[15px] tracking-[0.08em] text-cream uppercase">
                  Earth Gang
                </span>
                <span className="font-serif italic text-[11px] tracking-[0.04em] text-cream-muted mt-0.5">
                  Tattoo Studio
                </span>
              </div>
            </div>
            <p className="text-cream-muted text-sm leading-relaxed max-w-xs">
              {studio.tagline}. {studio.description.toLowerCase()} {t('footer.taglineSuffix', 'in the heart of Chiang Mai\'s old city')}.
            </p>
          </div>

          {/* Quick Links — spans 3 cols */}
          <div className="md:col-span-3">
            <p className="label-mono text-cream-dim mb-5">{t('footer.navigation', 'Navigation')}</p>
            <ul className="space-y-3">
              {[
                { to: '/', label: t('nav.home', 'Home') },
                { to: '/booking', label: t('nav.bookNow', 'Book Now') },
                { to: '/gallery', label: t('nav.gallery', 'Gallery') },
                { to: '/consult', label: t('nav.consult', 'Style Guide') },
                { to: '/faq', label: t('nav.faq', 'FAQ') },
                { to: '/privacy', label: t('nav.privacy', 'Privacy Policy') },
                { to: '/terms', label: t('nav.terms', 'Terms of Service') },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-cream-muted hover:text-crimson text-sm transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Hours & Contact — spans 4 cols */}
          <div className="md:col-span-4">
            <p className="label-mono text-cream-dim mb-5">{t('footer.visitUs', 'Visit Us')}</p>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-crimson shrink-0 mt-0.5" />
                <span className="text-cream-muted text-sm">{STUDIO.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-crimson shrink-0" />
                <a href="tel:+66646394795" className="text-cream-muted hover:text-crimson text-sm transition-colors duration-300">{STUDIO.phone}</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-crimson shrink-0" />
                <a href="mailto:earthgangtattoo@gmail.com" className="text-cream-muted hover:text-crimson text-sm transition-colors duration-300">{STUDIO.email}</a>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-crimson shrink-0" />
                <div>
                  <span className="text-cream-muted text-sm">{t('shared.openDaily', 'Open Daily')}: {STUDIO.hours}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex items-center gap-4 mb-10">
          <a
            href="https://instagram.com/earthgangtattoo"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full border border-ink-border bg-ink-card/50 flex items-center justify-center hover:border-crimson hover:bg-crimson-glow transition-all duration-300 group"
            aria-label="Follow us on Instagram"
          >
            <svg className="w-4 h-4 text-cream-muted group-hover:text-crimson transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
            </svg>
          </a>
          <a
            href="https://line.me/ti/p/~earthgangtattoo"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full border border-ink-border bg-ink-card/50 flex items-center justify-center hover:border-crimson hover:bg-crimson-glow transition-all duration-300 group px-0"
            aria-label="Contact us on LINE"
          >
            <span className="text-cream-muted group-hover:text-crimson text-xs font-bold transition-colors">LINE</span>
          </a>
        </div>

        {/* Bottom row */}
        <div className="border-t border-ink-border/50 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-cream-dim text-xs tracking-wide">
            © 2026 {studio.name}. {t('footer.copyright', 'All rights reserved')}.
          </p>
          <p className="text-cream-dim/60 text-xs">
            {t('footer.crafted', 'Crafted in Chiang Mai with intention')}
          </p>
        </div>
      </div>
    </footer>
  )
}
