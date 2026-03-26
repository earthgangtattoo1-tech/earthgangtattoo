import { useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown, ChevronUp, Search, ArrowRight, Clock, Shield, MessageCircle, CreditCard, MapPin, Phone, Mail, Heart, Store, Wallet, Palette, HelpCircle } from 'lucide-react'
import { STUDIO } from '../config'
import SEO from '../components/SEO'

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
}

const categoryIcons = {
  General: Store,
  'Pricing & Payment': Wallet,
  Aftercare: Heart,
  'Artists & Design': Palette,
  'Safety & Policies': Shield,
}

const faqData = [
  {
    category: 'General',
    icon: '🏪',
    questions: [
      {
        q: 'Where is Earth Gang Tattoo located?',
        a: `We are located at ${STUDIO.address}, Chiang Mai, Thailand. Look for the red neon sign! We're easy to find in the Hai Ya district of Chiang Mai.`,
      },
      {
        q: 'What are your opening hours?',
        a: `${STUDIO.hours} — ${STUDIO.hoursNote}\nWalk-ins are welcome when available, but appointments are recommended.`,
      },
      {
        q: 'How do I book an appointment?',
        a: `You can book online through our website's booking system, call us at ${STUDIO.phone}, or visit us in person. We recommend booking at least 3-5 days in advance for the best availability. You can also book a free 30-minute consultation!`,
      },
      {
        q: 'Do you accept walk-ins?',
        a: 'Yes, we welcome walk-ins when our artists have availability! However, for custom designs or specific artists, we highly recommend booking an appointment to guarantee your spot.',
      },
    ],
  },
  {
    category: 'Pricing & Payment',
    icon: '💰',
    questions: [
      {
        q: 'How much do tattoos cost?',
        a: 'Our pricing varies based on size and complexity:\n• Small (2-3"): From 2,000 THB\n• Medium (4-6"): From 5,000 THB\n• Large (7-10"): From 10,000 THB\n• Full Sleeve: From 30,000 THB\n• Hourly Rate: 1,500 THB/hour\n\nAll prices include consultation and an aftercare kit.',
      },
      {
        q: 'Is a deposit required?',
        a: 'Yes, a 500 THB non-refundable deposit is required to secure your booking. This deposit goes toward your final tattoo price. The remaining balance is due at the end of your session. We accept cash, PromptPay, and card for the deposit.',
      },
      {
        q: 'What payment methods do you accept?',
        a: 'We accept Cash (pay at studio), PromptPay, and Credit/Debit Cards (Visa, Mastercard). For large pieces, we can also discuss installment plans during your consultation.',
      },
      {
        q: 'Can I get a price quote before booking?',
        a: 'Absolutely! You can get a rough estimate based on size through our booking page. For an accurate quote, we recommend booking a free 30-minute consultation where our artist will discuss your design and provide a detailed price.',
      },
    ],
  },
  {
    category: 'Aftercare',
    icon: '🩹',
    questions: [
      {
        q: 'How do I take care of my new tattoo?',
        a: '1. Keep the bandage on for 2-4 hours\n2. Wash gently with unscented soap and warm water\n3. Pat dry with a clean paper towel (no cloth towels)\n4. Apply a thin layer of the provided aftercare ointment\n5. Moisturize 2-3 times daily for 2 weeks\n6. Avoid direct sunlight for 4 weeks\n7. No swimming, soaking, or excessive sweating for 3 weeks\n8. Do not pick or scratch at scabs',
      },
      {
        q: 'How long does a tattoo take to heal?',
        a: 'Surface healing typically takes 2-3 weeks, but full healing (all layers of skin) can take 4-6 weeks. During the first week, you may experience some redness, swelling, and peeling — this is completely normal.',
      },
      {
        q: 'What should I avoid after getting a tattoo?',
        a: 'For the first 2 weeks: Avoid direct sunlight, swimming pools, hot tubs, saunas, tight clothing over the area, and excessive alcohol. For 4 weeks: Avoid direct sun exposure without SPF 50+ sunscreen.',
      },
      {
        q: 'Do you provide aftercare products?',
        a: 'Yes! Every tattoo session includes a complimentary aftercare kit with premium ointment, unscented soap, and detailed written instructions. We also offer premium aftercare bundles for purchase.',
      },
    ],
  },
  {
    category: 'Artists & Design',
    icon: '🎨',
    questions: [
      {
        q: 'Who are your artists and what are their specialties?',
        a: 'We have two incredible artists:\n• TOON — Traditional · Japanese · Thai · Color · Animals · Largescale\n• RONNIE — Blackwork · Fineline · Anime · Font · Geometric · Minimal · Cybersigilism',
      },
      {
        q: 'Can I bring my own design?',
        a: 'Absolutely! We encourage clients to bring reference images, sketches, or inspiration. Our artists will work with you to adapt your design for the best possible tattoo. We can also create a completely custom design from your description.',
      },
      {
        q: 'What if I want a cover-up?',
        a: 'We specialize in cover-ups! During a consultation, our artist will assess the existing tattoo and discuss your options. Cover-ups typically require a larger, darker design. Pricing starts from 4,000 THB depending on the size and complexity.',
      },
      {
        q: 'Do you do tattoo touch-ups?',
        a: 'Yes, we offer touch-up sessions starting from 500 THB. If a tattoo done by us needs a touch-up due to healing (within 6 months), we offer it at a discounted rate. Touch-ups for work done at other studios are also welcome.',
      },
    ],
  },
  {
    category: 'Safety & Policies',
    icon: '🛡️',
    questions: [
      {
        q: 'Is the studio safe and hygienic?',
        a: 'Safety is our top priority. We follow strict health and safety protocols:\n• Single-use, sterile needles for every client\n• Hospital-grade autoclave sterilization\n• Fresh ink pots for each session\n• Disposable gloves and barrier film\n• Regular health inspections and certifications',
      },
      {
        q: 'What is your cancellation policy?',
        a: 'We require 24 hours notice for cancellations or rescheduling. If you cancel with less than 24 hours notice, your deposit may be forfeited. We understand emergencies happen — just give us a call as soon as possible.',
      },
      {
        q: 'Is there a minimum age requirement?',
        a: 'You must be at least 18 years old to get a tattoo at our studio. We require a valid government-issued ID for all clients. No exceptions.',
      },
    ],
  },
]

function FAQItem({ question, answer, index }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <motion.div
      layout
      className="border border-ink-border rounded-lg overflow-hidden transition-colors duration-300 hover:border-cream-muted/30"
      style={{ background: 'rgba(20, 18, 16, 0.5)' }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-5 flex items-center justify-between text-left gap-4 group cursor-pointer"
        id={`faq-${index}`}
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${index}`}
      >
        <span className="text-cream text-sm font-body font-medium leading-relaxed group-hover:text-cream-soft transition-colors duration-200">
          {question}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="shrink-0"
        >
          <ChevronDown className="w-4 h-4 text-cream-muted group-hover:text-crimson transition-colors duration-200" />
        </motion.span>
      </button>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            id={`faq-answer-${index}`}
            role="region"
            aria-labelledby={`faq-${index}`}
            className="px-6 pb-5 text-cream-muted text-sm font-body leading-relaxed whitespace-pre-line border-t border-ink-border/50 pt-4"
          >
            {answer}
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}

export default function Faq() {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  const categories = ['All', ...faqData.map(f => f.category)]

  const filteredFAQ = faqData
    .filter(cat => activeCategory === 'All' || cat.category === activeCategory)
    .map(cat => ({
      ...cat,
      questions: cat.questions.filter(
        q => !searchTerm || q.q.toLowerCase().includes(searchTerm.toLowerCase()) || q.a.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    }))
    .filter(cat => cat.questions.length > 0)

  return (
    <>
      <SEO title="FAQ — Tattoo Questions Answered" description="Frequently asked questions about Earth Gang Tattoo Chiang Mai. Pricing, aftercare, hours, location, deposits, artist specialties, and booking info. 064-639-4795." path="/faq" />

      <div className="min-h-screen pt-32 pb-32 px-4 sm:px-6 lg:px-8 ink-wash">
        <div className="max-w-4xl mx-auto">

          {/* ── Header ── */}
          <motion.div ref={ref} initial="hidden" animate={isInView ? 'visible' : 'hidden'} className="text-center mb-20">
            <motion.div custom={0} variants={fadeInUp}>
              <span className="label-mono inline-flex items-center gap-2 px-4 py-2 rounded-full border border-crimson/20 bg-crimson/5 text-crimson text-xs tracking-widest uppercase mb-8">
                <MessageCircle className="w-3.5 h-3.5" />
                Got Questions?
              </span>
            </motion.div>
            <motion.h1 custom={1} variants={fadeInUp} className="heading-editorial text-4xl sm:text-5xl lg:text-6xl text-cream">
              Frequently Asked <span className="font-serif text-crimson italic">Questions</span>
            </motion.h1>
            <motion.p custom={2} variants={fadeInUp} className="font-body text-cream-muted mt-5 max-w-2xl mx-auto text-sm leading-relaxed">
              Everything you need to know about our studio, pricing, aftercare, and the tattoo experience at Earth Gang.
            </motion.p>
          </motion.div>

          {/* ── Search ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mb-8"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-cream-dim" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search questions..."
                className="input-ink w-full pl-11 pr-4 py-3.5 rounded-lg font-body text-sm text-cream placeholder:text-cream-dim"
              />
            </div>
          </motion.div>

          {/* ── Category Filter Pills ── */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="flex flex-wrap gap-2 mb-14"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-lg text-xs font-mono tracking-wide uppercase transition-all duration-300 cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-crimson text-cream shadow-lg shadow-crimson/20 border border-crimson'
                    : 'bg-ink-card text-cream-muted hover:bg-ink-elevated hover:text-cream border border-ink-border hover:border-cream-muted/20'
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>

          {/* ── FAQ Sections ── */}
          <div className="space-y-16">
            {filteredFAQ.map((cat, catIdx) => {
              const IconComponent = categoryIcons[cat.category] || HelpCircle
              return (
                <motion.div
                  key={cat.category}
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: catIdx * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  {/* Category Header */}
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-lg">{cat.icon}</span>
                    <div className="flex items-center gap-3 flex-1">
                      <IconComponent className="w-4 h-4 text-crimson shrink-0" />
                      <h2 className="font-body text-sm font-semibold text-cream uppercase tracking-wider">{cat.category}</h2>
                      <span className="label-mono text-[10px] text-cream-dim">{cat.questions.length}</span>
                      <div className="flex-1 h-px divider-ink" />
                    </div>
                  </div>

                  {/* Accordion Items */}
                  <div className="space-y-3">
                    {cat.questions.map((q, i) => (
                      <FAQItem key={i} question={q.q} answer={q.a} index={i} />
                    ))}
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* ── No Results ── */}
          {filteredFAQ.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <Search className="w-12 h-12 text-ink-border mx-auto mb-4" />
              <p className="font-body text-cream-muted text-sm">No questions match your search.</p>
              <button
                onClick={() => { setSearchTerm(''); setActiveCategory('All') }}
                className="mt-4 text-crimson text-xs font-mono uppercase tracking-wider hover:text-crimson-light transition-colors cursor-pointer"
              >
                Clear filters
              </button>
            </motion.div>
          )}

          {/* ── Divider ── */}
          <div className="divider-crimson my-20" />

          {/* ── Quick Info Cards ── */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="grid sm:grid-cols-2 gap-6"
          >
            {/* Hours Card */}
            <div className="card-ink rounded-lg p-8 group hover:border-crimson/20 transition-colors duration-300">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-lg bg-crimson/10 border border-crimson/20 flex items-center justify-center">
                  <Clock className="w-4 h-4 text-crimson" />
                </div>
                <h3 className="font-body text-sm font-semibold text-cream uppercase tracking-wider">Studio Hours</h3>
              </div>
              <p className="text-cream-muted text-sm font-body leading-relaxed">
                {STUDIO.hoursNote}: {STUDIO.hours}
              </p>
              <p className="text-cream-dim text-xs font-body mt-2">
                Walk-ins welcome when available
              </p>
            </div>

            {/* Contact Card */}
            <div className="card-ink rounded-lg p-8 group hover:border-crimson/20 transition-colors duration-300">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-lg bg-crimson/10 border border-crimson/20 flex items-center justify-center">
                  <Phone className="w-4 h-4 text-crimson" />
                </div>
                <h3 className="font-body text-sm font-semibold text-cream uppercase tracking-wider">Contact Us</h3>
              </div>
              <div className="text-cream-muted text-sm font-body space-y-2">
                <span className="flex items-center gap-2.5">
                  <MapPin className="w-3.5 h-3.5 text-cream-dim shrink-0" />
                  {STUDIO.addressShort}
                </span>
                <span className="flex items-center gap-2.5">
                  <Phone className="w-3.5 h-3.5 text-cream-dim shrink-0" />
                  {STUDIO.phone}
                </span>
                <span className="flex items-center gap-2.5">
                  <Mail className="w-3.5 h-3.5 text-cream-dim shrink-0" />
                  {STUDIO.email}
                </span>
              </div>
            </div>
          </motion.div>

          {/* ── CTA ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mt-16 text-center"
          >
            <p className="text-cream-muted text-sm font-body mb-6">
              Still have questions? We're happy to help.
            </p>
            <Link to="/booking" className="btn-crimson inline-flex items-center gap-3 px-10 py-4 rounded-lg font-body font-semibold text-sm tracking-wide uppercase transition-all duration-300">
              Book a Free Consultation
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

        </div>
      </div>
    </>
  )
}
