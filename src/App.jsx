import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { lazy, Suspense } from 'react'
import { useLang } from './i18n/LanguageContext'
import Header from './components/Header'
import Footer from './components/Footer'
const ChatWidget = lazy(() => import('./components/ChatWidget'))
import ScrollToTop from './components/ScrollToTop'

const Home = lazy(() => import('./pages/Home'))
const Booking = lazy(() => import('./pages/Booking'))
const Gallery = lazy(() => import('./pages/Gallery'))
const Consult = lazy(() => import('./pages/Consult'))
const Faq = lazy(() => import('./pages/Faq'))
const Privacy = lazy(() => import('./pages/Privacy'))
const Terms = lazy(() => import('./pages/Terms'))
const NotFound = lazy(() => import('./pages/NotFound'))

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center" role="status" aria-label="Loading page">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 rounded-full border-2 border-ink-border border-t-crimson animate-spin" />
        <span className="label-mono text-cream-dim text-xs">Loading...</span>
      </div>
    </div>
  )
}

function AnimatedRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<PageLoader />}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/consult" element={<Consult />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  )
}

function App() {
  const { t } = useLang()

  return (
    <div className="min-h-screen bg-ink" id="top">
      <a href="#main-content" className="skip-link">{t('shared.skipToContent', 'Skip to main content')}</a>
      <div className="grain-overlay" aria-hidden="true" />
      <Header />
      <main id="main-content" role="main">
        <AnimatedRoutes />
      </main>
      <Footer />
      <Suspense fallback={null}>
        <ChatWidget />
      </Suspense>
      <ScrollToTop />
    </div>
  )
}

export default App
