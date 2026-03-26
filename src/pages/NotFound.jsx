import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Home, ArrowRight } from 'lucide-react'
import SEO from '../components/SEO'
import { useLang } from '../i18n/LanguageContext'

export default function NotFound() {
  const { t } = useLang()

  return (
    <>
      <SEO title="Page Not Found" description="The page you're looking for doesn't exist. Return to Earth Gang Tattoo Chiang Mai." path="/404" />

      <div className="min-h-screen flex items-center justify-center px-6 ink-wash-hero">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-md"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="heading-display text-[clamp(6rem,15vw,10rem)] text-ink-border leading-none"
          >
            404
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="heading-editorial text-cream text-3xl sm:text-4xl mt-2 mb-4"
          >
            {t('notFound.title', 'Page Not')} <span className="text-crimson">{t('notFound.title', 'Page Not').split(' ').pop()}</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-cream-muted text-sm mb-8"
          >
            {t('notFound.subtitle', 'The ink didn\'t stick to this page. Let\'s get you back to the studio.')}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Link to="/" className="btn-crimson group">
              <Home className="w-4 h-4" />
              <span>{t('shared.backToHome', 'Back to Home')}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </>
  )
}
