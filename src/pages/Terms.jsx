import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { FileText, AlertTriangle, Clock, CreditCard, ShieldCheck, Scale, Globe, Mail } from 'lucide-react'
import { STUDIO } from '../config'
import SEO from '../components/SEO'
import { useLang } from '../i18n/LanguageContext'

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function Terms() {
  const { t, lang } = useLang()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const isTh = lang === 'th'

  const sections = isTh ? [
    { icon: FileText, title: t('terms.sections.description.title'), content: t('terms.sections.description.content') },
    { icon: AlertTriangle, title: t('terms.sections.age.title'), content: t('terms.sections.age.content') },
    { icon: Clock, title: t('terms.sections.booking.title'), content: t('terms.sections.booking.content') },
    { icon: CreditCard, title: t('terms.sections.payment.title'), content: t('terms.sections.payment.content') },
    { icon: ShieldCheck, title: t('terms.sections.liability.title'), content: t('terms.sections.liability.content') },
    { icon: Scale, title: t('terms.sections.intellectual.title'), content: t('terms.sections.intellectual.content') },
    { icon: Globe, title: t('terms.sections.law.title'), content: t('terms.sections.law.content') },
  ] : [
    { icon: FileText, title: 'Services', content: 'Earth Gang Tattoo provides professional tattoo services including design consultations, custom sketches, and tattoo sessions. All services are performed by licensed and experienced artists in a sterile, professional environment.' },
    { icon: AlertTriangle, title: 'Age Requirement', content: 'You must be at least 18 years old to receive a tattoo at our studio. A valid government-issued photo ID is required before every session. No exceptions will be made.' },
    { icon: Clock, title: 'Booking Terms', content: `A non-refundable deposit of 500 THB is required to secure your booking. This deposit will be applied toward the total cost of your tattoo. Cancellations or rescheduling require at least 24 hours notice — see our cancellation policy below.` },
    { icon: CreditCard, title: 'Payment Terms', content: 'We accept Cash (pay at studio), PromptPay, and Credit/Debit Cards (Visa, Mastercard). The deposit is deducted from your final session price. Any remaining balance is due at the end of your appointment.' },
    { icon: ShieldCheck, title: 'Liability & Waiver', content: 'Earth Gang Tattoo is not responsible for allergic reactions, infections, or complications that may arise after the tattoo session. Clients are responsible for disclosing any relevant medical conditions before their appointment and following all aftercare instructions provided.' },
    { icon: Scale, title: 'Intellectual Property', content: 'All custom tattoo designs created by our artists remain the intellectual property of Earth Gang Tattoo. Reproduction, resale, or unauthorized distribution of any designs is strictly prohibited without written consent.' },
    { icon: Globe, title: 'Governing Law', content: 'These terms and conditions are governed by and construed in accordance with the laws of the Kingdom of Thailand. Any disputes shall be resolved in the courts of Chiang Mai Province.' },
  ]

  return (
    <>
      <SEO title={isTh ? 'ข้อกำหนดและเงื่อนไข' : 'Terms of Service'} description={isTh ? 'ข้อกำหนดและเงื่อนไขการใช้บริการ Earth Gang Tattoo' : 'Terms of Service for Earth Gang Tattoo Chiang Mai.'} path="/terms" />

      <div className="min-h-screen pt-32 pb-32 px-4 sm:px-6 lg:px-8 ink-wash">
        <div className="max-w-3xl mx-auto">

          {/* Header */}
          <motion.div ref={ref} initial="hidden" animate={isInView ? 'visible' : 'hidden'} className="text-center mb-16">
            <motion.div custom={0} variants={fadeInUp}>
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-crimson/20 bg-crimson-glow mb-8">
                <Scale className="w-3.5 h-3.5 text-crimson" />
                <span className="label-mono text-crimson text-xs">{isTh ? 'ข้อกำหนด' : 'Terms'}</span>
              </div>
            </motion.div>
            <motion.h1 custom={1} variants={fadeInUp} className="heading-editorial text-4xl sm:text-5xl md:text-6xl text-cream mb-6">
              {t('terms.title', 'Terms of Service')}
            </motion.h1>
            <motion.p custom={2} variants={fadeInUp} className="text-cream-muted text-sm max-w-xl mx-auto leading-relaxed">
              {t('terms.intro', 'These terms govern your use of Earth Gang Tattoo services. By booking an appointment, you agree to these terms.')}
            </motion.p>
            <motion.p custom={3} variants={fadeInUp} className="label-mono text-cream-dim text-xs mt-4">
              {t('terms.lastUpdated', 'Last updated: March 26, 2026')}
            </motion.p>
          </motion.div>

          <div className="divider-ink mb-12" />

          {/* Sections */}
          <div className="space-y-12">
            {sections.map((section, i) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-lg bg-crimson/10 border border-crimson/20 flex items-center justify-center">
                    <section.icon className="w-4 h-4 text-crimson" />
                  </div>
                  <h2 className="text-cream font-semibold text-lg">{section.title}</h2>
                </div>
                <p className="text-cream-muted text-sm leading-[1.8] font-light pl-12">
                  {section.content}
                </p>
                {i < sections.length - 1 && <div className="divider-ink opacity-30 mt-8" />}
              </motion.div>
            ))}
          </div>

          <div className="divider-ink my-12" />

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="card-ink p-8 text-center"
          >
            <Mail className="w-6 h-6 text-crimson mx-auto mb-4" />
            <h2 className="text-cream font-semibold text-lg mb-2">{t('terms.sections.contact.title', 'Contact Us')}</h2>
            <p className="text-cream-muted text-sm mb-4">{t('terms.sections.contact.content', 'If you have questions about these terms, please contact us:')}</p>
            <div className="space-y-2 text-cream-soft text-sm">
              <p>{STUDIO.email}</p>
              <p>{STUDIO.phone}</p>
              <p className="text-cream-dim text-xs">{STUDIO.address}</p>
            </div>
          </motion.div>

          <div className="divider-ink my-12" />

          <div className="text-center">
            <Link to="/" className="btn-ghost">
              ← {t('shared.backToHome', 'Back to Home')}
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
