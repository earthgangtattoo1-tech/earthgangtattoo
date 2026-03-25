import { useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown, ChevronUp, Search, ArrowRight, Clock, Shield, MessageCircle, CreditCard, MapPin, Phone, Mail, Heart } from 'lucide-react'
import { STUDIO } from '../config'

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
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
        a: 'We have two incredible artists:\n• TOON — Fine Line & Realism: Delicate, precise work with photorealistic detail\n• Roonie — Traditional & Neo-Traditional: Bold, vibrant pieces with masterful color work',
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

function FAQItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border border-white/5 rounded-xl overflow-hidden transition-colors hover:border-white/10">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-5 flex items-center justify-between text-left gap-4"
      >
        <span className="text-white text-sm font-medium">{question}</span>
        {isOpen ? (
          <ChevronUp className="w-4 h-4 text-gray-500 shrink-0" />
        ) : (
          <ChevronDown className="w-4 h-4 text-gray-500 shrink-0" />
        )}
      </button>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="px-6 pb-5 text-gray-400 text-sm leading-relaxed whitespace-pre-line">
            {answer}
          </div>
        </motion.div>
      )}
    </div>
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
      <div className="min-h-screen pt-32 pb-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div ref={ref} initial="hidden" animate={isInView ? 'visible' : 'hidden'} className="text-center mb-16">
          <motion.div custom={0} variants={fadeInUp}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neon-red/10 border border-neon-red/20 mb-6">
              <MessageCircle className="w-4 h-4 text-neon-red" />
              <span className="text-neon-red text-sm font-medium">Got Questions?</span>
            </div>
          </motion.div>
          <motion.h1 custom={1} variants={fadeInUp} className="text-4xl sm:text-5xl font-bold text-white">
            Frequently Asked Questions
          </motion.h1>
          <motion.p custom={2} variants={fadeInUp} className="text-gray-500 mt-5 max-w-2xl mx-auto">
            Find answers to common questions about our studio, pricing, aftercare, and more.
          </motion.p>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-6"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search questions..."
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-neon-red/50 transition-colors"
            />
          </div>
        </motion.div>

        {/* Category filters */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeCategory === cat
                  ? 'bg-neon-red text-white'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* FAQ Sections */}
        <div className="space-y-14">
          {filteredFAQ.map((cat) => (
            <div key={cat.category}>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xl">{cat.icon}</span>
                <h2 className="text-lg font-semibold text-white">{cat.category}</h2>
                <div className="flex-1 h-px bg-white/5" />
              </div>
              <div className="space-y-3">
                {cat.questions.map((q, i) => (
                  <FAQItem key={i} question={q.q} answer={q.a} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* No results */}
        {filteredFAQ.length === 0 && (
          <div className="text-center py-16">
            <Search className="w-12 h-12 text-gray-700 mx-auto mb-4" />
            <p className="text-gray-500">No questions match your search.</p>
          </div>
        )}

        {/* Quick links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-20 grid sm:grid-cols-2 gap-6"
        >
          <div className="p-8 rounded-2xl border border-white/5 bg-white/[0.02]">
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
              <Clock className="w-4 h-4 text-neon-red" /> Studio Hours
            </h3>
            <p className="text-gray-500 text-sm">{STUDIO.hoursNote}: {STUDIO.hours}</p>
          </div>
          <div className="p-8 rounded-2xl border border-white/5 bg-white/[0.02]">
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
              <Phone className="w-4 h-4 text-neon-red" /> Contact Us
            </h3>
            <p className="text-gray-500 text-sm">
              <span className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5" /> {STUDIO.addressShort}</span>
              <span className="flex items-center gap-2 mt-1"><Phone className="w-3.5 h-3.5" /> {STUDIO.phone}</span>
              <span className="flex items-center gap-2 mt-1"><Mail className="w-3.5 h-3.5" /> {STUDIO.email}</span>
            </p>
          </div>
        </motion.div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <p className="text-gray-500 text-sm mb-4">Still have questions? Chat with us instantly!</p>
          <Link
            to="/booking"
            className="inline-flex items-center gap-2 bg-neon-red hover:bg-neon-red-light text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg shadow-neon-red/25"
          >
            Book Now <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
    </>
  )
}
