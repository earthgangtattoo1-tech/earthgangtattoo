import { useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { Search, ArrowRight, MapPin } from 'lucide-react'
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

const categoryEmojis = {
  'Fine Line': '✿',
  'Traditional': '⚓',
  'Realism': '👁',
  'Neo-Traditional': '🐉',
  'Geometric': '◉',
  'Japanese': '🌸',
}

export default function Gallery() {
  const [active, setActive] = useState('All')
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  const filtered = active === 'All' ? galleryItems : galleryItems.filter(i => i.category === active)

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
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

        <motion.div ref={ref} initial="hidden" animate={isInView ? 'visible' : 'hidden'} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((item, i) => (
            <motion.div
              key={item.label}
              custom={i}
              variants={fadeInUp}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className={`group relative aspect-square rounded-2xl overflow-hidden border border-white/5 hover:border-white/10 cursor-pointer ${
                item.size === 'large' ? 'md:col-span-2 lg:col-span-2' : ''
              }`}
            >
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.label}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
              ) : (
                <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient || 'from-gray-800 to-gray-900'} transition-transform duration-500 group-hover:scale-110`} />
              )}

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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center"
        >
          <div className="p-10 rounded-2xl border border-white/5 bg-white/[0.02] max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-3">Like What You See?</h3>
            <p className="text-gray-500 mb-6">Let our artists create something unique for you. Book a consultation and bring your vision to life.</p>
            <Link
              to="/booking"
              className="inline-flex items-center gap-2 bg-neon-red hover:bg-neon-red-light text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg shadow-neon-red/25"
            >
              Book a Session <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>

        {/* Visit Us — Google Maps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-16"
        >
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neon-red/10 border border-neon-red/20 mb-4">
              <MapPin className="w-4 h-4 text-neon-red" />
              <span className="text-neon-red text-sm font-medium">Visit Us</span>
            </div>
            <h3 className="text-2xl font-bold text-white">Find Our Studio in Chiang Mai</h3>
            <p className="text-gray-500 mt-2 text-sm">141/3 ถ.กำแพงดิน ต.หายยา อ.เมือง จ.เชียงใหม่ 50100</p>
          </div>
          <div className="rounded-2xl overflow-hidden border border-white/5">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3783.2!2d98.9931!3d18.7879!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTjCsDQ3JzE2LjQiTiA5OMKwNTknMzUuMiJF!5e0!3m2!1sen!2sth!4v1234567890"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Earth Gang Tattoo Location"
            />
          </div>
        </motion.div>
      </div>
    </div>
  )
}
