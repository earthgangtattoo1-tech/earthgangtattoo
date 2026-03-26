import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { Shield, UserCheck, Lock, Eye, Database, Mail, Clock, Globe } from 'lucide-react'
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

export default function Privacy() {
  const { t, lang } = useLang()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const isTh = lang === 'th'

  const sections = isTh ? [
    { icon: Database, title: t('privacy.sections.collection.title'), content: t('privacy.sections.collection.content') },
    { icon: UserCheck, title: t('privacy.sections.usage.title'), content: t('privacy.sections.usage.content') },
    { icon: Lock, title: t('privacy.sections.sharing.title'), content: t('privacy.sections.sharing.content') },
    { icon: Shield, title: t('privacy.sections.security.title'), content: t('privacy.sections.security.content') },
    { icon: Eye, title: t('privacy.sections.retention.title'), content: t('privacy.sections.retention.content') },
    { icon: Eye, title: t('privacy.sections.rights.title'), content: t('privacy.sections.rights.content') },
    { icon: Eye, title: t('privacy.sections.compliance.title'), content: t('privacy.sections.compliance.content') },
  ] : [
    { icon: Database, title: 'Information We Collect', content: 'Personal information you provide through our booking forms: name, email, phone number, appointment details, and tattoo design preferences. We also collect anonymous website usage data through cookies and analytics tools to improve your experience on our site.' },
    { icon: UserCheck, title: 'How We Use Your Information', content: 'To process and manage your booking appointments. To communicate with you about your appointment and send confirmations via email. To improve our services and website experience through analytics. To comply with legal obligations.' },
    { icon: Lock, title: 'Data Sharing', content: 'We do not sell, trade, or rent your personal information to third parties. Your data is only shared with service providers necessary to operate our booking system (e.g., email delivery services). We will never share your data for marketing purposes without your explicit consent.' },
    { icon: Shield, title: 'Data Security', content: 'We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. All data transmissions are encrypted using industry-standard protocols.' },
    { icon: Eye, title: 'Data Retention', content: 'We retain your personal information only for as long as necessary to fulfill the purposes outlined in this policy. Booking records are kept for up to 2 years after your last interaction with us. You may request earlier deletion of your data at any time — see "Your Rights" below.' },
    { icon: Eye, title: 'Your Rights', content: 'You have the right to access, correct, or delete your personal information at any time. You may also request data portability or restrict processing of your data. You can opt out of any marketing communications. To exercise these rights, please contact us directly.' },
    { icon: Eye, title: 'GDPR & PDPA Compliance', content: 'Earth Gang Tattoo operates in compliance with the Thai Personal Data Protection Act (PDPA) B.E. 2562 (2019). For our international clients, we also align our practices with the EU General Data Protection Regulation (GDPR). This includes lawful basis for processing, data minimization, and your right to lodge a complaint with the relevant supervisory authority.' },
  ]

  return (
    <>
      <SEO title={isTh ? 'นโยบายความเป็นส่วนตัว' : 'Privacy Policy'} description={isTh ? 'นโยบายความเป็นส่วนตัว Earth Gang Tattoo เชียงใหม่' : 'Privacy Policy for Earth Gang Tattoo Chiang Mai.'} path="/privacy" />

      <div className="min-h-screen pt-32 pb-32 px-4 sm:px-6 lg:px-8 ink-wash">
        <div className="max-w-3xl mx-auto">

          {/* Header */}
          <motion.div ref={ref} initial="hidden" animate={isInView ? 'visible' : 'hidden'} className="text-center mb-16">
            <motion.div custom={0} variants={fadeInUp}>
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-crimson/20 bg-crimson-glow mb-8">
                <Shield className="w-3.5 h-3.5 text-crimson" />
                <span className="label-mono text-crimson text-xs">{isTh ? 'ความเป็นส่วนตัว' : 'Privacy'}</span>
              </div>
            </motion.div>
            <motion.h1 custom={1} variants={fadeInUp} className="heading-editorial text-4xl sm:text-5xl md:text-6xl text-cream mb-6">
              {t('privacy.title', 'Privacy Policy')}
            </motion.h1>
            <motion.p custom={2} variants={fadeInUp} className="text-cream-muted text-sm max-w-xl mx-auto leading-relaxed">
              {t('privacy.intro', 'At Earth Gang Tattoo, we take your privacy seriously. This policy explains how we collect, use, and protect your information.')}
            </motion.p>
            <motion.p custom={3} variants={fadeInUp} className="label-mono text-cream-dim text-xs mt-4">
              {t('privacy.lastUpdated', 'Last updated: March 26, 2026')}
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
            <h2 className="text-cream font-semibold text-lg mb-2">{t('privacy.sections.contact.title', 'Contact Us')}</h2>
            <p className="text-cream-muted text-sm mb-4">{t('privacy.sections.contact.content', 'If you have questions about our privacy practices, please contact us:')}</p>
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
