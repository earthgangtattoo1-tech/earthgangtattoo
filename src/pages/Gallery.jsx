import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, MapPin, ImageIcon } from 'lucide-react'
import config, { STUDIO } from '../config'
import SEO from '../components/SEO'
import { useLang } from '../i18n/LanguageContext'

const { galleryCategories, galleryItems } = config

/* ─── Animation Variants ─── */
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
}

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
}

const galleryItem = {
  hidden: { opacity: 0, y: 30, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    y: -15,
    scale: 0.97,
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
  },
}

/* ─── Section Wrapper ─── */
function Section({ children, className = '' }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={fadeInUp}
      className={className}
    >
      {children}
    </motion.section>
  )
}

/* ─── Category Icons ─── */
const categoryIcons = {
  'Fine Line': '✿',
  'Traditional': '⚓',
  'Realism': '👁',
  'Neo-Traditional': '🐉',
  'Geometric': '◉',
  'Japanese': '🌸',
  'Blackwork': '◈',
  'Minimal': '☽',
}

/* ═══════════════════════════════════════════
   GALLERY PAGE
   ═══════════════════════════════════════════ */
export default function Gallery() {
  const [active, setActive] = useState('All')
  const { t, lang } = useLang()

  // Thai category name mapping
  const catNames = {
    'All': t('gallery.categories.0', 'All'),
    'Fine Line': t('gallery.categories.1', 'Fine Line'),
    'Traditional': t('gallery.categories.2', 'Traditional'),
    'Realism': t('gallery.categories.3', 'Realism'),
    'Neo-Traditional': t('gallery.categories.4', 'Neo-Traditional'),
    'Geometric': t('gallery.categories.5', 'Geometric'),
    'Japanese': t('gallery.categories.6', 'Japanese'),
    'Blackwork': lang === 'th' ? 'แบล็กเวิร์ก' : 'Blackwork',
    'Minimal': lang === 'th' ? 'มินิมอล' : 'Minimal',
  }

  const filtered =
    active === 'All'
      ? galleryItems
      : galleryItems.filter((item) => item.category === active)

  return (
    <>
      <SEO
        title="Tattoo Gallery — Chiang Mai Portfolio"
        description="Browse Earth Gang Tattoo's portfolio of fine line, realism, traditional, neo-traditional & watercolor tattoos. See our work from Chiang Mai's top artists TOON & RONNIE."
        path="/gallery"
      />

      <div className="min-h-screen">
        {/* ─── Hero / Page Header ─── */}
        <section className="relative pt-36 pb-16 sm:pt-44 sm:pb-20 overflow-hidden">
          {/* Ink wash background */}
          <div className="absolute inset-0 ink-wash-hero pointer-events-none" />

          <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
            <div className="text-center max-w-3xl mx-auto">
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="label-mono text-crimson mb-5"
              >
                <span className="inline-block w-8 h-px bg-crimson/50 align-middle mr-3" />
                {t('gallery.heroLabel', 'Portfolio')}
                <span className="inline-block w-8 h-px bg-crimson/50 align-middle ml-3" />
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="heading-editorial text-cream text-5xl sm:text-6xl md:text-7xl mb-6"
              >
                {t('gallery.title', 'Our')} <span className="brush-underline text-crimson">{t('gallery.titleAccent', 'Work')}</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-cream-muted text-base sm:text-lg leading-relaxed max-w-xl mx-auto"
              >
                {t('gallery.description', 'Browse our portfolio of custom tattoo work — each piece crafted with passion and precision by our artists in Chiang Mai.')}
              </motion.p>
            </div>
          </div>
        </section>

        <div className="divider-ink max-w-7xl mx-auto" />

        {/* ─── Category Filter Pills ─── */}
        <section className="sticky top-0 z-30 bg-ink/90 backdrop-blur-md border-b border-ink-border/50">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-4">
            <div className="flex flex-wrap items-center gap-2 justify-center">
              {galleryCategories.map((cat) => {
                const isActive = active === cat
                return (
                  <button
                    key={cat}
                    onClick={() => setActive(cat)}
                    className={`
                      px-4 py-2 rounded-xl text-sm font-body font-medium
                      transition-all duration-300 ease-out
                      ${
                        isActive
                          ? 'bg-crimson text-cream shadow-lg shadow-crimson-glow border border-crimson-light/30'
                          : 'bg-ink-card text-cream-muted border border-ink-border hover:text-cream hover:border-ink-hover hover:bg-ink-elevated'
                      }
                    `}
                  >
                    <span className="mr-1.5 opacity-70">
                      {categoryIcons[cat] || '◆'}
                    </span>
                    {cat}
                  </button>
                )
              })}
            </div>
          </div>
        </section>

        {/* ─── Gallery Grid ─── */}
        <section className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-16 sm:py-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5"
            >
              {filtered.map((item, i) => (
                <motion.div
                  key={item.label + item.category}
                  variants={galleryItem}
                  layout
                  whileHover={{ y: -6, transition: { duration: 0.3 } }}
                  className={`
                    group relative aspect-square rounded-2xl overflow-hidden
                    border border-ink-border hover:border-ink-hover
                    cursor-pointer transition-colors duration-500
                    ${item.size === 'large' ? 'md:col-span-2 lg:col-span-2' : ''}
                    ${i === 0 ? 'col-span-2' : ''}
                  `}
                >
                  {/* Image or gradient fallback */}
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={`${item.label} — ${item.category} tattoo by Earth Gang Tattoo Chiang Mai`}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      loading="lazy"
                      style={{ aspectRatio: '1 / 1' }}
                    />
                  ) : (
                    <div
                      className={`absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-110
                        flex flex-col items-center justify-center
                        ${item.artist === 'TOON'
                          ? 'bg-gradient-to-br from-crimson/15 via-ink-card to-rose-950/20'
                          : 'bg-gradient-to-br from-gold/15 via-ink-card to-amber-950/20'
                        }`}
                    >
                      {/* Large centered category emoji */}
                      <span className="text-5xl sm:text-6xl select-none opacity-40 group-hover:opacity-60 transition-opacity duration-500">
                        {categoryIcons[item.category] || '◆'}
                      </span>
                      {/* "Coming Soon" hint */}
                      <span className="mt-3 px-3 py-1 rounded-full border border-ink-border/50 text-cream-dim/50 text-[9px] font-mono uppercase tracking-widest">
                        Coming Soon
                      </span>
                      {/* Label overlaid at bottom */}
                      <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-ink/60 to-transparent">
                        <p className="font-display font-bold text-cream/70 text-xs sm:text-sm tracking-tight uppercase text-center truncate">
                          {item.label}
                        </p>
                        <p className="label-mono text-center mt-0.5 text-[9px] tracking-wider"
                           style={{ color: item.artist === 'TOON' ? 'rgba(220,38,38,0.5)' : 'rgba(234,179,8,0.5)' }}>
                          {item.artist} · {item.category}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex flex-col justify-between p-4 sm:p-5">
                    {/* Top: artist + Book button */}
                    <div className="flex items-center justify-between">
                      {item.artist && (
                        <span className="px-2.5 py-1 rounded-lg bg-crimson/20 backdrop-blur-sm text-cream text-[10px] font-mono uppercase tracking-wider">
                          {item.artist}
                        </span>
                      )}
                      {item.artist && (
                        <Link
                          to={item.artist === 'TOON' ? '/booking?artist=toon' : '/booking?artist=ronnie'}
                          className="px-2.5 py-1 rounded-lg bg-crimson text-cream text-[10px] font-semibold hover:bg-crimson-light transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          Book This Style
                        </Link>
                      )}
                    </div>
                    {/* Bottom: label + category */}
                    <div>
                      <p className="font-display font-bold text-cream text-sm sm:text-base tracking-tight uppercase">
                        {item.label}
                      </p>
                      <p className="label-mono text-crimson mt-1.5 text-[10px] sm:text-[11px]">
                        {item.category}
                      </p>
                    </div>
                  </div>

                  {/* Top-left category badge on hover */}
                  <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                    <span className="px-2.5 py-1 rounded-lg bg-ink-card/70 backdrop-blur-sm text-cream-soft text-[10px] font-mono uppercase tracking-wider border border-ink-border/60">
                      {item.category}
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Empty state */}
          {filtered.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-24"
            >
              <ImageIcon className="w-12 h-12 text-cream-dim/30 mx-auto mb-5" />
              <p className="text-cream-muted text-sm">
                No tattoos found in this category yet.
              </p>
            </motion.div>
          )}
        </section>

        <div className="divider-ink max-w-7xl mx-auto" />

        {/* ─── "Like What You See?" CTA ─── */}
        <Section className="py-20 sm:py-28 px-5 sm:px-8 lg:px-10 max-w-7xl mx-auto">
          <motion.div
            variants={fadeInUp}
            custom={0}
            className="relative max-w-3xl mx-auto overflow-hidden rounded-2xl border border-ink-border"
          >
            {/* Ambient glow background */}
            <div className="absolute inset-0 ink-wash pointer-events-none" />
            <div className="absolute inset-0 bg-ink-card/80 backdrop-blur-sm pointer-events-none" />

            <div className="relative z-10 p-10 sm:p-14 md:p-16 text-center">
              <motion.p
                variants={fadeInUp}
                custom={1}
                className="label-mono text-gold mb-5"
              >
                Ready for your own?
              </motion.p>

              <motion.h2
                variants={fadeInUp}
                custom={2}
                className="heading-editorial text-cream text-3xl sm:text-4xl md:text-5xl mb-6"
              >
                Like What You <span className="text-crimson">See</span>?
              </motion.h2>

              <motion.p
                variants={fadeInUp}
                custom={3}
                className="text-cream-muted text-sm sm:text-base leading-relaxed max-w-lg mx-auto mb-10"
              >
                Let our artists create something unique for you. Book a consultation
                and bring your vision to life — from concept to skin.
              </motion.p>

              <motion.div
                variants={fadeInUp}
                custom={4}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <Link to="/booking" className="btn-crimson">
                  Book a Session
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link to="/consult" className="btn-ghost">
                  Style Guide
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </Section>

        <div className="divider-crimson max-w-7xl mx-auto" />

        {/* ─── Google Maps / Find Us ─── */}
        <Section className="py-20 sm:py-28 px-5 sm:px-8 lg:px-10 max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <motion.div
              variants={fadeInUp}
              custom={0}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-crimson-glow border border-crimson/20 mb-6"
            >
              <MapPin className="w-4 h-4 text-crimson" />
              <span className="label-mono text-crimson text-[11px]">Visit Us</span>
            </motion.div>

            <motion.h2
              variants={fadeInUp}
              custom={1}
              className="heading-editorial text-cream text-3xl sm:text-4xl md:text-5xl mb-4"
            >
              Find Our Studio
            </motion.h2>

            <motion.p
              variants={fadeInUp}
              custom={2}
              className="text-cream-muted text-sm max-w-md mx-auto"
            >
              {STUDIO.address}
            </motion.p>
          </div>

          <motion.div
            variants={fadeInUp}
            custom={3}
            className="rounded-2xl overflow-hidden border border-ink-border shadow-2xl shadow-black/30"
          >
            <div className="relative">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3783.2!2d98.9931!3d18.7879!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTjCsDQ3JzE2LjQiTiA5OMKwNTknMzUuMiJF!5e0!3m2!1sen!2sth!4v1234567890"
                width="100%"
                height="400"
                style={{ border: 0, filter: 'grayscale(0.8) contrast(1.1) brightness(0.7)' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Earth Gang Tattoo Location"
                className="w-full"
              />
              {/* Subtle overlay gradient for ink aesthetic */}
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-ink/20 to-transparent" />
            </div>
          </motion.div>

          {/* Contact row under map */}
          <motion.div
            variants={fadeInUp}
            custom={4}
            className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 text-cream-dim text-xs"
          >
            <span className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-crimson/60" />
              {STUDIO.addressShort}
            </span>
            <span className="hidden sm:block w-1 h-1 rounded-full bg-ink-hover" />
            <span className="font-mono tracking-wide">
              Open Daily {STUDIO.hours}
            </span>
          </motion.div>
        </Section>
      </div>
    </>
  )
}
