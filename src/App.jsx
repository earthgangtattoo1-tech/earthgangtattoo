import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Header from './components/Header'
import Footer from './components/Footer'
import ChatWidget from './components/ChatWidget'
import Home from './pages/Home'
import Booking from './pages/Booking'
import Gallery from './pages/Gallery'
import Consult from './pages/Consult'
import Faq from './pages/Faq'

function AnimatedRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/consult" element={<Consult />} />
        <Route path="/faq" element={<Faq />} />
      </Routes>
    </AnimatePresence>
  )
}

function App() {
  return (
    <div className="min-h-screen bg-dark">
      <Header />
      <AnimatedRoutes />
      <Footer />
      <ChatWidget />
    </div>
  )
}

export default App
