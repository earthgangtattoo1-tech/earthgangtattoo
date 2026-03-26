import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import {
  Star, Clock, ArrowRight, Sparkles, Crown,
  MapPin, Timer, Flame, ChevronDown,
  Quote, Users, Award, CalendarDays
} from 'lucide-react'
import config, { STUDIO } from '../config'
import SEO from '../components/SEO'

// ─── Animation Variants ───────────────────────────────────────────
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
}

const fadeIn = {
  hidden: { opacity: 0 },
  visible: (i = 0) => ({
    opacity: 1,
    transition: { duration: 0.8, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
}

const slideInLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: (i = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
}

const slideInRight = {
  hidden: { opacity: 0, x: 60 },
  visible: (i = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
}

const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: (i = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
}

// ─── Reusable Section Wrapper ─────────────────────────────────────
function Section({ children, className = '', variants: v = fadeInUp }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={v}
      className={className}
    >
      {children}
    </motion.section>
  )
}

// ─── Diamond Separator ────────────────────────────────────────────
function Diamond() {
  return (
    <span className="inline-block w-1.5 h-1.5 rotate-45 bg-cream-dim mx-4 md:mx-6 flex-shrink-0" />
  )
}

// ─── HOME ─────────────────────────────────────────────────────────
export default function Home() {
  const { studio, artists, services, testimonials } = config
  const heroRef = useRef(null)
  const [hoveredArtist, setHoveredArtist] = useState(null)

  return (
    <>
      <SEO
        title="Earth Gang Tattoo — Fine Line & Traditional Tattoos Chiang Mai"
        description="Earth Gang Tattoo — Chiang Mai's #1 tattoo studio. Fine Line, Realism & Traditional tattoos by TOON & RONNIE. Book online, free consultation. 141/3 ถ.กำแพงดิน, Chiang Mai 50100."
        path="/"
      />
      <div className="overflow-hidden">

        {/* ═══════════════════════════════════════════════════════════
            HERO — Full viewport, editorial, ink-stained atmosphere
            ═══════════════════════════════════════════════════════════ */}
        <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden ink-wash-hero">
          {/* Background image — emotional hook */}
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?w=1600&h=900&fit=crop"
              alt=""
              className="w-full h-full object-cover opacity-[0.08]"
              aria-hidden="true"
            />
          </div>
          {/* Animated ambient blobs */}
          <div className="absolute inset-0 pointer-events-none">
            <motion.div
              animate={{
                x: [0, 30, -20, 0],
                y: [0, -20, 30, 0],
                scale: [1, 1.1, 0.95, 1],
              }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-crimson/[0.06] blur-[120px]"
            />
            <motion.div
              animate={{
                x: [0, -25, 15, 0],
                y: [0, 25, -15, 0],
                scale: [1, 0.9, 1.1, 1],
              }}
              transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
              className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-gold/[0.04] blur-[100px]"
            />
          </div>

          {/* Subtle grid texture */}
          <div
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage: `linear-gradient(rgba(237,230,221,0.5) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(237,230,221,0.5) 1px, transparent 1px)`,
              backgroundSize: '80px 80px',
            }}
          />

          {/* Content */}
          <div ref={heroRef} className="relative z-10 text-center px-6 max-w-6xl mx-auto">
            {/* Label */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="label-mono text-cream-dim mb-8 tracking-[0.3em]"
            >
              Chiang Mai, Thailand
            </motion.p>

            {/* Main heading */}
            <h1 className="mb-2">
              <motion.span
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="heading-display text-[clamp(3rem,10vw,9rem)] text-cream block leading-[0.88]"
              >
                Earth Gang
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="heading-editorial text-[clamp(3rem,10vw,9rem)] text-crimson block leading-[1.05] mt-1"
              >
                Tattoo
              </motion.span>
            </h1>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.65 }}
              className="mt-10 text-cream-muted text-base sm:text-lg max-w-xl mx-auto font-light leading-relaxed"
            >
              {studio.tagline} — {studio.description}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.85 }}
              className="mt-12 flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link to="/booking" className="btn-crimson group">
                <Clock className="w-4 h-4" />
                <span>Book a Session</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link to="/consult" className="btn-ghost group">
                <Sparkles className="w-4 h-4 text-gold" />
                <span>Style Guide</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </motion.div>

            {/* Stats — horizontal with diamond separators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.1 }}
              className="mt-20 md:mt-24 flex items-center justify-center flex-wrap"
            >
              {[
                { num: '5,000+', label: 'Tattoos Done' },
                { num: '12+', label: 'Years Experience' },
                { num: '4.9', label: 'Client Rating' },
              ].map((stat, i) => (
                <span key={stat.label} className="flex items-center">
                  {i > 0 && <Diamond />}
                  <span className="flex flex-col items-center">
                    <span className="font-display text-2xl sm:text-3xl font-extrabold text-cream tracking-tight">
                      {stat.num}
                    </span>
                    <span className="label-mono text-cream-dim mt-1">{stat.label}</span>
                  </span>
                </span>
              ))}
            </motion.div>

            {/* Pricing summary strip */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.3 }}
              className="mt-8 px-6 py-3 rounded-full border border-ink-border/60 bg-ink-card/30 backdrop-blur-sm"
            >
              <div className="flex items-center justify-center flex-wrap gap-x-4 gap-y-1 text-xs">
                <span className="text-cream-dim">Small <span className="text-cream-muted font-semibold ml-1">฿2,000</span></span>
                <span className="text-ink-hover">·</span>
                <span className="text-cream-dim">Medium <span className="text-cream-muted font-semibold ml-1">฿5,000</span></span>
                <span className="text-ink-hover">·</span>
                <span className="text-cream-dim">Large <span className="text-cream-muted font-semibold ml-1">฿10,000</span></span>
                <span className="text-ink-hover">·</span>
                <span className="text-cream-dim">Sleeve <span className="text-cream-muted font-semibold ml-1">฿30,000</span></span>
              </div>
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <span className="label-mono text-cream-dim text-[0.6rem]">Scroll</span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ChevronDown className="w-4 h-4 text-cream-dim" strokeWidth={1.5} />
            </motion.div>
          </motion.div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            SECTION 01 — CEO / FOUNDER
            Asymmetric layout: oversized type + offset portrait
            ═══════════════════════════════════════════════════════════ */}
        <Section
          className="py-28 md:py-36 lg:py-44 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto"
          variants={fadeIn}
        >
          <div className="mb-14">
            <motion.p variants={fadeInUp} custom={0} className="label-mono text-crimson mb-4">
              01 — About
            </motion.p>
          </div>

          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left column — Large text */}
            <motion.div variants={slideInLeft} custom={1} className="lg:col-span-7">
              <h2 className="heading-display text-cream text-[clamp(2.5rem,5vw,4.5rem)] leading-[0.92] mb-6">
                Meet
                <br />
                <span className="heading-editorial text-crimson text-[clamp(2.5rem,5vw,4.5rem)]">
                  {STUDIO.ceo}
                </span>
              </h2>
              <p className="label-mono text-gold mb-8">Founder &amp; CEO</p>
              <div className="max-w-xl space-y-5 text-cream-muted text-sm leading-[1.8] font-light">
                <p>
                  With over a decade of experience in the tattoo industry, {STUDIO.ceo} founded Earth Gang Tattoo
                  to create a studio where artistry, hygiene, and client experience come first.
                </p>
                <p>
                  Every artist on the team has been personally selected for their exceptional skill
                  and passion for the craft. This isn't just a studio — it's a commitment to
                  pushing the boundaries of what ink can do.
                </p>
              </div>

              {/* Location & Hours chips */}
              <div className="mt-10 flex flex-wrap gap-4">
                <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-full border border-ink-border bg-ink-card/50">
                  <MapPin className="w-3.5 h-3.5 text-crimson" strokeWidth={1.5} />
                  <span className="text-cream-muted text-xs">{STUDIO.addressShort}</span>
                </div>
                <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-full border border-ink-border bg-ink-card/50">
                  <Timer className="w-3.5 h-3.5 text-gold" strokeWidth={1.5} />
                  <span className="text-cream-muted text-xs">{STUDIO.hours}</span>
                </div>
              </div>
            </motion.div>

            {/* Right column — Offset portrait */}
            <motion.div variants={slideInRight} custom={2} className="lg:col-span-5 lg:pt-12">
              <div className="relative max-w-sm mx-auto lg:mr-0">
                {/* Decorative frame lines */}
                <div className="absolute -top-4 -left-4 w-24 h-24 border-t-2 border-l-2 border-ink-border rounded-tl-2xl" />
                <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-2 border-r-2 border-ink-border rounded-br-2xl" />
                <div className="relative overflow-hidden rounded-2xl border border-ink-border bg-ink-card">
                  <div className="aspect-[4/5] overflow-hidden">
                    <img
                      src="/nont-founder.jpg"
                      alt={`${STUDIO.ceo} — CEO & Founder`}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  {/* Gradient overlay at bottom */}
                  <div className="absolute bottom-0 inset-x-0 h-1/3 bg-gradient-to-t from-ink to-transparent" />
                </div>
                {/* Floating badge */}
                <div className="absolute -bottom-3 -left-3 bg-ink-card border border-ink-border rounded-xl px-4 py-3 shadow-xl shadow-black/30">
                  <div className="flex items-center gap-2">
                    <Crown className="w-4 h-4 text-gold" />
                    <span className="text-cream text-xs font-semibold">Since 2012</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </Section>

        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="divider-ink" />
        </div>

        {/* ═══════════════════════════════════════════════════════════
            SECTION 02 — ARTISTS
            Dramatic portrait cards with hover reveals
            ═══════════════════════════════════════════════════════════ */}
        <Section
          className="py-28 md:py-36 lg:py-44 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto"
          variants={fadeIn}
        >
          <div className="mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <motion.p variants={fadeInUp} custom={0} className="label-mono text-crimson mb-4">
                02 — Artists
              </motion.p>
              <motion.h2 variants={fadeInUp} custom={1} className="heading-display text-cream text-[clamp(2rem,4vw,3.5rem)] leading-[0.92]">
                The
                <br />
                <span className="heading-editorial text-crimson">Collective</span>
              </motion.h2>
            </div>
            <motion.p variants={fadeInUp} custom={2} className="text-cream-muted text-sm max-w-sm leading-relaxed font-light">
              World-class tattoo artists, each with their own signature style
              and years of dedicated practice.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {artists.map((artist, i) => (
              <motion.div
                key={artist.id}
                variants={scaleIn}
                custom={i + 3}
                onMouseEnter={() => setHoveredArtist(artist.id)}
                onMouseLeave={() => setHoveredArtist(null)}
                className="group relative"
              >
                {/* Card */}
                <div className="card-ink overflow-hidden relative">
                  {/* Portrait area */}
                  <div className="relative aspect-[3/4] overflow-hidden bg-ink-light">
                    {/* Large initial */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="font-display text-[12rem] font-extrabold text-ink-elevated/60 group-hover:text-crimson/[0.08] transition-colors duration-700 select-none">
                        {artist.initials}
                      </span>
                    </div>
                    {/* Gradient overlays */}
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-card via-transparent to-transparent" />
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                      style={{
                        background: 'radial-gradient(ellipse at center bottom, rgba(196,30,58,0.15) 0%, transparent 70%)',
                      }}
                    />
                    {/* Artist number */}
                    <div className="absolute top-6 right-6">
                      <span className="label-mono text-cream-dim/40 text-[0.65rem]">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>
                  </div>

                  {/* Info panel */}
                  <div className="relative p-8 lg:p-10 -mt-16">
                    <h3 className="heading-display text-cream text-2xl md:text-3xl leading-none">
                      {artist.name}
                    </h3>
                    <div className="mt-3 flex items-center gap-3">
                      <div className="w-8 h-px bg-crimson" />
                      <span className="label-mono text-gold text-[0.6rem]">{artist.specialty}</span>
                    </div>
                    <p className="mt-6 text-cream-muted text-sm leading-[1.8] font-light">
                      {artist.description}
                    </p>

                    {/* Hover-reveal CTA */}
                    <div className="mt-8 overflow-hidden">
                      <motion.div
                        initial={false}
                        animate={{
                          y: hoveredArtist === artist.id ? 0 : 40,
                          opacity: hoveredArtist === artist.id ? 1 : 0,
                        }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <Link
                          to="/booking"
                          className="inline-flex items-center gap-2 text-sm text-cream hover:text-crimson transition-colors group/link font-medium"
                        >
                          <span>Book with {artist.name}</span>
                          <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                        </Link>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Section>

        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="divider-crimson" />
        </div>

        {/* ═══════════════════════════════════════════════════════════
            SECTION 03 — SERVICES
            Editorial grid — 2 large + 4 small, magazine layout
            ═══════════════════════════════════════════════════════════ */}
        <Section
          className="py-28 md:py-36 lg:py-44 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto"
          variants={fadeIn}
        >
          <div className="mb-20">
            <motion.p variants={fadeInUp} custom={0} className="label-mono text-crimson mb-4">
              03 — Services
            </motion.p>
            <motion.div variants={fadeInUp} custom={1} className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <h2 className="heading-display text-cream text-[clamp(2rem,4vw,3.5rem)] leading-[0.92]">
                Pricing &amp;
                <br />
                <span className="heading-editorial text-crimson">Services</span>
              </h2>
              <p className="text-cream-muted text-sm max-w-sm leading-relaxed font-light">
                Transparent pricing with no hidden fees. All prices include
                consultation and aftercare kit.
              </p>
            </motion.div>
          </div>

          {/* Editorial grid: 2 featured (top) + 4 standard (bottom) */}
          <div className="space-y-6">
            {/* Top row — 2 featured services */}
            <div className="grid sm:grid-cols-2 gap-6">
              {services.slice(0, 2).map((service, i) => (
                <motion.div
                  key={service.value}
                  variants={fadeInUp}
                  custom={i + 2}
                  whileHover={{ y: -4, transition: { duration: 0.3 } }}
                  className="group card-ink p-8 lg:p-10 relative overflow-hidden"
                >
                  {/* Accent corner */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-crimson/[0.06] rounded-bl-[60px]" />
                  <div className="relative">
                    <span className="text-3xl block mb-6">{service.icon}</span>
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-cream font-semibold text-lg">{service.name}</h3>
                        <p className="text-cream-dim text-xs mt-1 label-mono">{service.size}</p>
                      </div>
                      <span className="heading-display text-crimson text-xl whitespace-nowrap">
                        {service.price}
                      </span>
                    </div>
                    <div className="mt-6 divider-ink opacity-50" />
                    <p className="mt-6 text-cream-muted text-xs leading-relaxed">
                      Includes free consultation, custom design sketch, premium ink, and aftercare kit.
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Bottom row — 4 standard services */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.slice(2).map((service, i) => (
                <motion.div
                  key={service.value}
                  variants={fadeInUp}
                  custom={i + 4}
                  whileHover={{ y: -3, transition: { duration: 0.25 } }}
                  className="group card-ink p-7 relative"
                >
                  <span className="text-2xl block mb-5">{service.icon}</span>
                  <h3 className="text-cream font-semibold text-sm">{service.name}</h3>
                  <p className="text-cream-dim text-[0.65rem] mt-1 label-mono">{service.size}</p>
                  <p className="text-crimson font-bold text-base mt-4">{service.price}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Booking note */}
          <motion.div variants={fadeInUp} custom={8} className="mt-14 text-center">
            <p className="text-cream-dim text-xs label-mono">
              Walk-ins welcome · Appointments preferred · 500 THB deposit required
            </p>
          </motion.div>
        </Section>

        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="divider-ink" />
        </div>

        {/* ═══════════════════════════════════════════════════════════
            SECTION 04 — TESTIMONIALS
            Masonry-inspired layout with varied card sizes
            ═══════════════════════════════════════════════════════════ */}
        <Section
          className="py-28 md:py-36 lg:py-44 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto"
          variants={fadeIn}
        >
          <div className="mb-20 text-center">
            <motion.p variants={fadeInUp} custom={0} className="label-mono text-gold mb-4">
              04 — Voices
            </motion.p>
            <motion.h2 variants={fadeInUp} custom={1} className="heading-display text-cream text-[clamp(2rem,4vw,3.5rem)] leading-[0.92]">
              What They
              <br />
              <span className="heading-editorial text-gold">Say</span>
            </motion.h2>
          </div>

          {/* Masonry-like grid: first card spans 2 cols on md */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-start">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                variants={fadeInUp}
                custom={i + 2}
                className={`${i === 0 ? 'md:col-span-2 lg:col-span-1' : ''} card-ink p-8 lg:p-10 relative group`}
              >
                {/* Quote mark */}
                <Quote className="w-8 h-8 text-crimson/20 mb-6" strokeWidth={1} />

                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="w-3.5 h-3.5 text-gold fill-gold" />
                  ))}
                </div>

                {/* Quote text */}
                <p className="text-cream-soft text-sm leading-[1.85] font-light italic">
                  &ldquo;{t.text}&rdquo;
                </p>

                {/* Author */}
                <div className="mt-8 flex items-center gap-3 pt-6 border-t border-ink-border/50">
                  <div className="w-10 h-10 rounded-full bg-ink-elevated border border-ink-border flex items-center justify-center">
                    <span className="text-cream font-semibold text-sm">{t.name[0]}</span>
                  </div>
                  <div>
                    <p className="text-cream text-sm font-medium">{t.name}</p>
                    <p className="text-cream-dim text-[0.65rem] label-mono">{t.location}</p>
                  </div>
                </div>

                {/* Hover accent line */}
                <div className="absolute bottom-0 left-8 right-8 h-px bg-crimson/0 group-hover:bg-crimson/30 transition-colors duration-500" />
              </motion.div>
            ))}

            {/* Extra credibility card */}
            <motion.div
              variants={fadeInUp}
              custom={5}
              className="card-ink p-8 lg:p-10 flex flex-col items-center justify-center text-center ink-wash-gold"
            >
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 text-gold fill-gold" />
                ))}
              </div>
              <p className="heading-display text-cream text-5xl lg:text-6xl leading-none mb-2">
                4.9
              </p>
              <p className="text-cream-muted text-sm mt-2">Average Rating</p>
              <a
                href="https://www.google.com/maps/place/Earth+Gang+Tattoo/@18.7879,98.9931,15z/data=!4m8!3m7!1s0x0%3A0x0!2zMTjCsDQ3JzE2LjQiTiA5OMKwNTknMzUuMiJF!5e0!3m2!1sen!2sth"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cream-dim text-xs label-mono mt-1 hover:text-crimson transition-colors duration-300"
              >
                Based on 200+ reviews →
              </a>
            </motion.div>
          </div>
        </Section>

        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="divider-crimson" />
        </div>

        {/* ═══════════════════════════════════════════════════════════
            SECTION 05 — CTA
            Dramatic ink-wash background, editorial close
            ═══════════════════════════════════════════════════════════ */}
        <Section
          className="py-28 md:py-36 lg:py-44 px-6 sm:px-8 lg:px-12 relative"
          variants={fadeIn}
        >
          {/* Full-bleed atmospheric background */}
          <div className="absolute inset-0 ink-wash-hero" />
          <div className="absolute inset-0 bg-ink/60" />
          <div
            className="absolute inset-0 opacity-[0.015]"
            style={{
              backgroundImage: `radial-gradient(circle, rgba(237,230,221,0.4) 1px, transparent 1px)`,
              backgroundSize: '24px 24px',
            }}
          />

          <div className="relative z-10 max-w-5xl mx-auto">
            {/* Large editorial heading */}
            <div className="text-center">
              <motion.p variants={fadeInUp} custom={0} className="label-mono text-gold mb-8">
                05 — Begin
              </motion.p>
              <motion.h2
                variants={fadeInUp}
                custom={1}
                className="heading-display text-cream text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.88] mb-6"
              >
                Ready to
                <br />
                <span className="heading-editorial text-crimson text-[clamp(2.5rem,6vw,5.5rem)]">
                  Get Inked?
                </span>
              </motion.h2>
              <motion.p
                variants={fadeInUp}
                custom={2}
                className="text-cream-muted text-base max-w-lg mx-auto leading-relaxed font-light mt-4"
              >
                Book your session today and let our artists bring your vision to life.
                Walk-ins welcome, appointments preferred.
              </motion.p>

              <motion.div variants={fadeInUp} custom={3} className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/booking" className="btn-crimson group">
                  <CalendarDays className="w-4 h-4" />
                  <span>Book Appointment</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
                <Link to="/consult" className="btn-ghost group">
                  <Sparkles className="w-4 h-4 text-gold" />
                  <span>Try Style Guide</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </motion.div>

              {/* Quick info strip */}
              <motion.div
                variants={fadeInUp}
                custom={5}
                className="mt-16 flex items-center justify-center flex-wrap gap-x-6 gap-y-3 text-cream-dim text-xs"
              >
                <span className="flex items-center gap-2">
                  <MapPin className="w-3 h-3 text-cream-dim/60" strokeWidth={1.5} />
                  {STUDIO.addressShort}
                </span>
                <span className="hidden sm:inline w-1 h-1 rounded-full bg-cream-dim/30" />
                <span className="flex items-center gap-2">
                  <Timer className="w-3 h-3 text-cream-dim/60" strokeWidth={1.5} />
                  {STUDIO.hours}
                </span>
                <span className="hidden sm:inline w-1 h-1 rounded-full bg-cream-dim/30" />
                <span className="flex items-center gap-2">
                  <Flame className="w-3 h-3 text-cream-dim/60" strokeWidth={1.5} />
                  Open Daily
                </span>
              </motion.div>
            </div>
          </div>
        </Section>

      </div>
    </>
  )
}
