import { useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { Search, ArrowRight, MapPin, Phone, Mail, Clock, Navigation } from 'lucide-react'
import config from '../config'

const { galleryCategories, galleryItems } = config

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function Gallery() {
  const [active, setActive] = useState('All')
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  const filtered = active === 'All' ? galleryItems : galleryItems.filter(i => i.category === active)

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-neon-red text-sm font-semibold uppercase tracking-widest mb-3">
            Our Work
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl sm:text-5xl font-bold text-white">
            Gallery
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-gray-500 mt-4 max-w-2xl mx-auto">
            Browse our portfolio of custom tattoo work. Each piece is crafted with passion and precision by our talented artists.
          </motion.p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {galleryCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                active === cat
                  ? 'bg-neon-red text-white'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid with real images */}
        <motion.div ref={ref} initial="hidden" animate={isInView ? 'visible' : 'hidden'} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((item, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={fadeInUp}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="group relative aspect-square rounded-2xl overflow-hidden border border-white/5 hover:border-white/10 cursor-pointer"
            >
              <img
                src={item.image}
                alt={item.label}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <p className="text-white font-semibold text-sm">{item.label}</p>
                <p className="text-gray-400 text-xs mt-0.5">{item.category}</p>
              </div>
              <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-sm text-white text-[10px] font-medium border border-white/10">
                  {item.category}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <Search className="w-12 h-12 text-gray-700 mx-auto mb-4" />
            <p className="text-gray-500">No tattoos found in this category yet.</p>
          </div>
        )}

        {/* Map Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-16"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Find Us</h2>
            <p className="text-gray-500">Visit our studio in Chiang Mai</p>
          </div>
          
          {/* Contact Cards */}
          <div className="grid sm:grid-cols-3 gap-4 mb-8">
            <div className="p-5 rounded-2xl border border-white/5 bg-white/[0.02] flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-neon-red/10 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-neon-red" />
              </div>
              <div>
                <p className="text-gray-500 text-xs">Address</p>
                <p className="text-white text-sm font-medium">141/3 ถ.กำแพงดิน, Chiang Mai</p>
              </div>
            </div>
            <a href="tel:0646394795" className="p-5 rounded-2xl border border-white/5 bg-white/[0.02] flex items-center gap-4 hover:border-white/10 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-neon-red/10 flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5 text-neon-red" />
              </div>
              <div>
                <p className="text-gray-500 text-xs">Phone</p>
                <p className="text-white text-sm font-medium">064-639-4795</p>
              </div>
            </a>
            <div className="p-5 rounded-2xl border border-white/5 bg-white/[0.02] flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-neon-red/10 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5 text-neon-red" />
              </div>
              <div>
                <p className="text-gray-500 text-xs">Hours</p>
                <p className="text-white text-sm font-medium">10:00 AM - 10:00 PM Daily</p>
              </div>
            </div>
          </div>

          {/* Google Map */}
          <div className="rounded-2xl overflow-hidden border border-white/5">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3783.2065!2d98.99312!3d18.78793!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTjCsDQ3JzE2LjUiTiA5OMKwNTknMzUuMiJF!5e0!3m2!1sen!2sth!4v1700000000000"
              width="100%"
              height="400"
              style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(0.95) contrast(0.9)' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Earth Gang Tattoo Location"
            />
          </div>

          {/* Get Directions Button */}
          <div className="text-center mt-6">
            <a
              href="https://www.google.com/maps/search/141%2F3+%E0%B8%96.%E0%B8%81%E0%B8%B3%E0%B9%81%E0%B8%9E%E0%B8%87%E0%B8%94%E0%B8%B4%E0%B8%99+%E0%B8%95.%E0%B8%AB%E0%B8%B2%E0%B8%A2%E0%B8%A2%E0%B8%B2+%E0%B8%AD.%E0%B9%80%E0%B8%A1%E0%B8%B7%E0%B8%AD%E0%B8%87+%E0%B8%88.%E0%B9%80%E0%B8%8A%E0%B8%B5%E0%B8%A2%E0%B8%87%E0%B9%83%E0%B8%AB%E0%B8%A1%E0%B9%88+50100"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white border border-white/10 px-6 py-3 rounded-xl font-medium transition-all duration-200"
            >
              <Navigation className="w-4 h-4 text-neon-red" />
              Get Directions on Google Maps
            </a>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="p-10 rounded-2xl border border-white/5 bg-white/[0.02] max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-3">Like What You See?</h3>
            <p className="text-gray-500 mb-6">Let our artists create something unique for you. Book a consultation and bring your vision to life.</p>
            <Link to="/booking"
              className="inline-flex items-center gap-2 bg-neon-red hover:bg-neon-red-light text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg shadow-neon-red/25">
              Book a Session <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
