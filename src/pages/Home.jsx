import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import {
  ChevronRight, Star, Clock, Shield,
  Flame, ArrowRight, Sparkles, Crown
} from 'lucide-react'
import config, { STUDIO } from '../config'
import SEO from '../components/SEO'

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
}

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

export default function Home() {
  const { studio, artists, services, testimonials } = config
  const heroRef = useRef(null)

  return (
    <>
      <SEO title="Best Tattoo Studio in Chiang Mai" description="Earth Gang Tattoo — Chiang Mai's #1 tattoo studio. Fine Line, Realism & Traditional tattoos by TOON & Roonie. Book online, free consultation. 141/3 ถ.กำแพงดิน, Chiang Mai 50100." path="/" />
      <div className="overflow-hidden">
      {/* ===== HERO ===== */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-dark via-dark to-red-950/30" />
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `radial-gradient(circle at 20% 50%, rgba(220, 38, 38, 0.3) 0%, transparent 50%),
                                radial-gradient(circle at 80% 20%, rgba(220, 38, 38, 0.2) 0%, transparent 50%),
                                radial-gradient(circle at 50% 80%, rgba(245, 158, 11, 0.1) 0%, transparent 50%)`,
            }}
          />
          <div className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: '60px 60px',
            }}
          />
        </div>

        <div ref={heroRef} className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mb-6"
          >
            <Flame className="w-16 h-16 text-neon-red mx-auto mb-6" strokeWidth={1} />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter text-white leading-[0.9]"
          >
            EARTH GANG
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-red via-red-400 to-gold">
              TATTOO
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-6 text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto"
          >
            {studio.tagline} — {studio.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/booking"
              className="group inline-flex items-center gap-2 bg-neon-red hover:bg-neon-red-light text-white px-8 py-4 rounded-xl font-semibold text-base transition-all duration-300 shadow-lg shadow-neon-red/25 hover:shadow-neon-red/40 hover:gap-3"
            >
              Book Now
              <ChevronRight className="w-4 h-4" />
            </Link>
            <Link
              to="/consult"
              className="group inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/20 px-8 py-4 rounded-xl font-semibold text-base transition-all duration-300 hover:gap-3"
            >
              <Sparkles className="w-4 h-4 text-gold" />
              AI Design Consult
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto"
          >
            {[
              { num: '5,000+', label: 'Tattoos Done' },
              { num: '12+', label: 'Years Exp' },
              { num: '4.9', label: '⭐ Rating' },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl sm:text-3xl font-bold text-white">{stat.num}</p>
                <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center pt-2">
            <div className="w-1 h-2 bg-white/40 rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* ===== CEO / FOUNDER ===== */}
      <Section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.p variants={fadeInUp} custom={0} className="text-gold text-sm font-semibold uppercase tracking-widest mb-3">
            Founder & CEO
          </motion.p>
          <motion.h2 variants={fadeInUp} custom={1} className="text-4xl sm:text-5xl font-bold text-white">
            Meet {STUDIO.ceo}
          </motion.h2>
          <motion.p variants={fadeInUp} custom={2} className="text-gray-500 mt-4 max-w-2xl mx-auto">
            The visionary behind Earth Gang Tattoo, dedicated to bringing world-class tattoo artistry to Chiang Mai.
          </motion.p>
        </div>

        <motion.div
          variants={fadeInUp}
          custom={3}
          whileHover={{ y: -8, transition: { duration: 0.3 } }}
          className="max-w-2xl mx-auto group relative rounded-2xl overflow-hidden border border-white/5 hover:border-white/10 transition-all duration-500"
          style={{ background: 'linear-gradient(135deg, #111111 0%, #1a1a1a 100%)' }}
        >
          <div className="aspect-[4/3] relative overflow-hidden">
            <img src="/Non.jpg.jpg" alt="Nont - CEO & Founder" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[#111111] to-transparent" />
          </div>

          <div className="p-8 -mt-8 relative text-center">
            <h3 className="text-2xl font-bold text-white">{STUDIO.ceo}</h3>
            <p className="text-gold text-sm font-medium mt-1">Founder & CEO</p>
            <p className="text-gray-500 text-sm mt-3 leading-relaxed">
              With over a decade of experience in the tattoo industry, {STUDIO.ceo} founded Earth Gang Tattoo
              to create a studio where artistry, hygiene, and client experience come first. Every artist on the team
              has been personally selected for their exceptional skill and passion for the craft.
            </p>
            <div className="flex items-center justify-center gap-4 mt-6 text-gray-600 text-sm">
              <span>{STUDIO.addressShort}</span>
              <span className="w-1 h-1 bg-gray-700 rounded-full" />
              <span>{STUDIO.hours}</span>
            </div>
          </div>
        </motion.div>
      </Section>

      {/* ===== ARTISTS ===== */}
      <Section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.p variants={fadeInUp} custom={0} className="text-neon-red text-sm font-semibold uppercase tracking-widest mb-3">
            Our Artists
          </motion.p>
          <motion.h2 variants={fadeInUp} custom={1} className="text-4xl sm:text-5xl font-bold text-white">
            Meet the Team
          </motion.h2>
          <motion.p variants={fadeInUp} custom={2} className="text-gray-500 mt-4 max-w-2xl mx-auto">
            World-class tattoo artists, each with their own signature style and years of experience.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {artists.map((artist, i) => (
            <motion.div
              key={artist.id}
              variants={fadeInUp}
              custom={i + 3}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group relative rounded-2xl overflow-hidden border border-white/5 hover:border-white/10 transition-all duration-500"
              style={{ background: 'linear-gradient(135deg, #111111 0%, #1a1a1a 100%)' }}
            >
              <div className={`aspect-[4/3] bg-gradient-to-br ${artist.gradient} relative overflow-hidden`}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-8xl font-black text-white/10 group-hover:text-white/15 transition-colors duration-500">
                    {artist.initials}
                  </span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[#111111] to-transparent" />
              </div>

              <div className="p-6 -mt-8 relative">
                <h3 className="text-xl font-bold text-white">{artist.name}</h3>
                <p className="text-neon-red text-sm font-medium mt-1">{artist.specialty}</p>
                <p className="text-gray-500 text-sm mt-3 leading-relaxed">{artist.description}</p>
                <Link
                  to="/booking"
                  className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-neon-red mt-4 transition-colors group/link"
                >
                  Book with {artist.name}
                  <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* ===== SERVICES ===== */}
      <Section className="py-24 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neon-red/[0.03] to-transparent" />
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-16">
            <motion.p variants={fadeInUp} custom={0} className="text-neon-red text-sm font-semibold uppercase tracking-widest mb-3">
              Services
            </motion.p>
            <motion.h2 variants={fadeInUp} custom={1} className="text-4xl sm:text-5xl font-bold text-white">
              Our Pricing
            </motion.h2>
            <motion.p variants={fadeInUp} custom={2} className="text-gray-500 mt-4 max-w-2xl mx-auto">
              Transparent pricing with no hidden fees. All prices include consultation and aftercare kit.
            </motion.p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <motion.div
                key={service.value}
                variants={fadeInUp}
                custom={i + 3}
                whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                className="p-6 rounded-2xl border border-white/5 hover:border-neon-red/20 bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-300 group cursor-pointer"
              >
                <div className="flex items-start justify-between">
                  <span className="text-3xl">{service.icon}</span>
                  <Shield className="w-4 h-4 text-gray-700 group-hover:text-neon-red/50 transition-colors" />
                </div>
                <h3 className="text-white font-semibold text-lg mt-4">{service.name}</h3>
                <p className="text-gray-600 text-sm mt-1">{service.size}</p>
                <p className="text-neon-red font-bold text-lg mt-3">{service.price}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ===== TESTIMONIALS ===== */}
      <Section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.p variants={fadeInUp} custom={0} className="text-gold text-sm font-semibold uppercase tracking-widest mb-3">
            Testimonials
          </motion.p>
          <motion.h2 variants={fadeInUp} custom={1} className="text-4xl sm:text-5xl font-bold text-white">
            What Clients Say
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              variants={fadeInUp}
              custom={i + 2}
              className="p-6 rounded-2xl border border-white/5 bg-white/[0.02]"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 text-gold fill-gold" />
                ))}
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">&ldquo;{t.text}&rdquo;</p>
              <div className="mt-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-neon-red/30 to-gold/20 flex items-center justify-center text-white font-bold text-sm">
                  {t.name[0]}
                </div>
                <div>
                  <p className="text-white text-sm font-semibold">{t.name}</p>
                  <p className="text-gray-600 text-xs">{t.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* ===== CTA ===== */}
      <Section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            variants={fadeInUp}
            className="relative p-12 sm:p-16 rounded-3xl overflow-hidden border border-white/5"
            style={{ background: 'linear-gradient(135deg, rgba(220,38,38,0.1) 0%, rgba(10,10,10,0.95) 50%, rgba(245,158,11,0.05) 100%)' }}
          >
            <div className="absolute inset-0 opacity-30"
              style={{
                backgroundImage: `radial-gradient(circle at 0% 0%, rgba(220,38,38,0.3) 0%, transparent 50%)`,
              }}
            />
            <div className="relative">
              <motion.h2 variants={fadeInUp} custom={0} className="text-4xl sm:text-5xl font-bold text-white">
                Ready to Get Inked?
              </motion.h2>
              <motion.p variants={fadeInUp} custom={1} className="text-gray-400 mt-4 max-w-xl mx-auto">
                Book your session today and let our artists bring your vision to life. Walk-ins welcome, appointments preferred.
              </motion.p>
              <motion.div variants={fadeInUp} custom={2} className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/booking"
                  className="group inline-flex items-center gap-2 bg-neon-red hover:bg-neon-red-light text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg shadow-neon-red/25 hover:shadow-neon-red/40"
                >
                  <Clock className="w-4 h-4" />
                  Book Appointment
                </Link>
                <Link
                  to="/consult"
                  className="group inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white border border-white/10 px-8 py-4 rounded-xl font-semibold transition-all duration-300"
                >
                  <Sparkles className="w-4 h-4 text-gold" />
                  Try AI Consultation
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </Section>
    </div>
    </>
  )
}
