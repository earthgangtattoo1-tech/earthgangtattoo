import { useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { Search, ArrowRight } from 'lucide-react'
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
              <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} transition-transform duration-500 group-hover:scale-110`} />

              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-6xl opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                  {item.category === 'Fine Line' ? '✿' :
                   item.category === 'Traditional' ? '⚓' :
                   item.category === 'Watercolor' ? '🌊' :
                   item.category === 'Realism' ? '👁' :
                   item.category === 'Neo-Traditional' ? '🐉' :
                   item.category === 'Geometric' ? '◉' :
                   item.category === 'Japanese' ? '🌸' :
                   item.category === 'Illustrative' ? '🎨' : '◆'}
                </span>
              </div>

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
      </div>
    </div>
  )
}
