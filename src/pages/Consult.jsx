import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Sparkles, Send, Loader, RotateCcw, Palette, MessageSquare } from 'lucide-react'
import config from '../config'

const { artists } = config

// Find artist by specialty keywords
function findArtist(keywords) {
  return artists.find(a =>
    keywords.some(k => a.specialty.toLowerCase().includes(k) || a.name.toLowerCase().includes(k))
  ) || artists[0]
}

const quickPrompts = [
  { label: '🌹 Fine Line Rose', prompt: 'Fine Line Rose tattoo design', style: 'fine line' },
  { label: '🐉 Traditional Dragon', prompt: 'Traditional Dragon tattoo design', style: 'traditional' },
  { label: '🦋 Watercolor Butterfly', prompt: 'Watercolor Butterfly tattoo design', style: 'watercolor' },
  { label: '⬡ Geometric Mandala', prompt: 'Geometric Mandala tattoo design', style: 'geometric' },
  { label: '✍️ Script Quote', prompt: 'Script Quote tattoo design', style: 'script' },
  { label: '👁 Portrait Realism', prompt: 'Portrait Realism tattoo design', style: 'realism' },
  { label: '🌊 Japanese Wave', prompt: 'Japanese Wave tattoo design', style: 'japanese' },
  { label: '☀️ Minimalist Sun', prompt: 'Minimalist Sun tattoo design', style: 'minimalist' },
]

// ============================================================
// Mock AI consultation generator
// In production, replace with a real Anthropic Claude API call:
//
//   import Anthropic from '@anthropic-ai/sdk'
//   const anthropic = new Anthropic({ apiKey: import.meta.env.VITE_ANTHROPIC_API_KEY })
//   const response = await anthropic.messages.create({
//     model: 'claude-sonnet-4-20250514',
//     max_tokens: 1024,
//     messages: [{ role: 'user', content: `Tattoo consultation for: "${prompt}"` }]
//   })
//   return response.content[0].text
// ============================================================
function generateConsultation(prompt) {
  const consultations = {
    'fine line': {
      artist: findArtist(['fine line']),
      style: 'Fine Line',
      description: `Based on your interest in a **fine line** design, our artist **TOON** specializing in fine line work would be perfect for this piece. Fine line work requires exceptional precision and a steady hand.\n\n**Design Recommendations:**\n• Fine line work looks best at **small to medium sizes** (2-5 inches)\n• **Ideal placements**: Inner forearm, behind the ear, collarbone, ankle, or ribcage\n• Fine lines heal beautifully but require careful aftercare\n\n**Session Details:**\n• **Estimated time**: 2-3 hours for most fine line pieces\n• **Pricing**: Starting from 3,000 THB depending on complexity\n• **Sessions needed**: Usually 1 session for smaller pieces`,
    },
    'traditional': {
      artist: findArtist(['traditional']),
      style: 'Traditional / Neo-Traditional',
      description: `A **traditional** piece is a timeless choice! Our artist **Roonie** specializes in both classic traditional and the more modern neo-traditional style.\n\n**Design Recommendations:**\n• Traditional tattoos feature **bold outlines and limited color palettes**\n• Neo-traditional adds more **dimension, detail, and color gradients**\n• **Ideal placements**: Upper arm, thigh, back, or chest for maximum impact\n• Bold designs age beautifully over time\n\n**Session Details:**\n• **Estimated time**: 3-5 hours for a medium piece\n• **Pricing**: Starting from 5,000 THB\n• **Sessions needed**: 1-2 sessions for most designs`,
    },
    'watercolor': {
      artist: findArtist(['traditional', 'fine line']),
      style: 'Watercolor',
      description: `A **watercolor** tattoo is a stunning, artistic choice! Our artists can create pieces that look like they're flowing with liquid color on your skin.\n\n**Design Recommendations:**\n• Watercolor pieces need **enough space to breathe** — minimum 4 inches recommended\n• Works beautifully with **no black outline** for that authentic painted look\n• **Ideal placements**: Forearm, shoulder blade, thigh, or calf\n• Combines well with fine line accents\n\n**Session Details:**\n• **Estimated time**: 3-6 hours depending on size\n• **Pricing**: Starting from 6,000 THB\n• **Sessions needed**: Often 1-2 sessions`,
    },
    'geometric': {
      artist: findArtist(['fine line', 'traditional']),
      style: 'Geometric',
      description: `**Geometric** tattoos are incredibly popular and visually striking. Our artists can create everything from simple geometric shapes to complex sacred geometry patterns.\n\n**Design Recommendations:**\n• Precision is key — geometric designs require **clean, mathematically precise lines**\n• Can range from minimal single shapes to **full mandala sleeves**\n• **Ideal placements**: Forearm (geometric bands), back (large mandalas), chest\n• Dotwork shading adds incredible depth\n\n**Session Details:**\n• **Estimated time**: 3-8 hours depending on complexity\n• **Pricing**: Starting from 4,000 THB (simple) to 25,000+ THB (sleeve)\n• **Sessions needed**: 1-3 sessions for complex pieces`,
    },
    'script': {
      artist: findArtist(['fine line', 'realism']),
      style: 'Script / Lettering',
      description: `**Script and lettering** tattoos are deeply personal. Our artist **TOON** has a talent for creating elegant, custom typography that flows beautifully on the skin.\n\n**Design Recommendations:**\n• Script works at almost **any size** but needs enough space to be readable\n• **Ideal placements**: Inner arm, ribs, collarbone, along the spine, or foot\n• We can work with custom fonts or design lettering from scratch\n• Consider adding a small decorative element (flourish, date, etc.)\n\n**Session Details:**\n• **Estimated time**: 1-2 hours for most script pieces\n• **Pricing**: Starting from 2,000 THB\n• **Sessions needed**: Usually 1 session`,
    },
    'realism': {
      artist: findArtist(['realism']),
      style: 'Photorealism',
      description: `**Photorealistic** tattoos are the pinnacle of tattoo artistry. Our artist **TOON** creates incredibly detailed, lifelike portraits and scenes.\n\n**Design Recommendations:**\n• Realism requires a **reference photo** for best results\n• **Minimum size**: 4 inches — smaller pieces lose detail over time\n• **Ideal placements**: Upper arm, thigh, back, or chest (flat surfaces work best)\n• Black & grey realism tends to age better than full color\n\n**Session Details:**\n• **Estimated time**: 4-8+ hours depending on complexity\n• **Pricing**: Starting from 8,000 THB\n• **Sessions needed**: 2-4 sessions for detailed portraits`,
    },
    'japanese': {
      artist: findArtist(['traditional', 'neo']),
      style: 'Japanese / Irezumi',
      description: `**Japanese tattoo art** (Irezumi) has a rich history spanning centuries. Our artist **Roonie** creates stunning Japanese-inspired pieces with bold imagery.\n\n**Design Recommendations:**\n• Classic motifs include **koi fish, dragons, cherry blossoms, waves, and tigers**\n• Japanese pieces work exceptionally well as **large-scale work** (sleeves, back pieces)\n• Bold outlines with vibrant color fill\n• **Ideal placements**: Full sleeve, back panel, thigh, or chest\n\n**Session Details:**\n• **Estimated time**: 5-10+ hours for large pieces\n• **Pricing**: Starting from 10,000 THB\n• **Sessions needed**: 3-6 sessions for a full sleeve`,
    },
    'minimalist': {
      artist: findArtist(['fine line']),
      style: 'Minimalist',
      description: `**Minimalist** tattoos are clean, subtle, and incredibly popular in 2026. Our artist **TOON** excels at creating simple yet powerful designs.\n\n**Design Recommendations:**\n• Less is more — **simple shapes, thin lines, and negative space**\n• Perfect for first-time tattoo clients\n• **Ideal placements**: Wrist, ankle, behind ear, finger, or collarbone\n• Works in black ink or can incorporate subtle color\n\n**Session Details:**\n• **Estimated time**: 30 min - 1.5 hours\n• **Pricing**: Starting from 1,500 THB\n• **Sessions needed**: Usually 1 session`,
    },
  }

  const lower = prompt.toLowerCase()
  for (const [key, data] of Object.entries(consultations)) {
    if (lower.includes(key) || lower.includes(data.style.toLowerCase())) {
      return { artist: data.artist.name, style: data.style, description: data.description }
    }
  }

  return {
    artist: 'Our Team',
    style: 'Custom Design',
    description: `Thank you for your interest in a custom tattoo design! Based on your idea of a "${prompt}", our team would love to bring this vision to life.\n\n**Our Recommendation:**\n• We'd suggest scheduling an **in-person or video consultation** to discuss your design in detail\n• Bring any **reference images** that inspire you\n• Consider the **placement and sizing** carefully — we can advise on what works best\n\n**Next Steps:**\n1. Book a consultation through our booking page\n2. Our artist will create a **custom sketch** based on your idea\n3. We'll review and refine the design together\n4. Schedule your tattoo session once you're happy with the design\n\n**General Pricing:**\n• Custom designs start from 3,000 THB\n• Complex pieces: 8,000 - 30,000+ THB\n• Hourly rate available for ongoing work\n\nFeel free to book a session and mention this consultation — our artists TOON and Roonie will be ready to discuss your design!`,
  }
}

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function Consult() {
  const [selectedPrompt, setSelectedPrompt] = useState('')
  const [customPrompt, setCustomPrompt] = useState('')
  const [result, setResult] = useState(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  const handleGenerate = () => {
    const prompt = selectedPrompt || customPrompt
    if (!prompt.trim()) return

    setIsGenerating(true)
    setResult(null)

    setTimeout(() => {
      const consultation = generateConsultation(prompt)
      setResult(consultation)
      setIsGenerating(false)
    }, 1500 + Math.random() * 1000)
  }

  const handleReset = () => {
    setSelectedPrompt('')
    setCustomPrompt('')
    setResult(null)
  }

  const formatResult = (text) => {
    return text.split('\n').map((line, i) => {
      let processed = line.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>')
      processed = processed.replace(/"(.*?)"/g, '<em class="text-gold">"$1"</em>')
      return (
        <p key={i} className={line.trim() === '' ? 'h-2' : ''}>
          {line.trim() !== '' && <span dangerouslySetInnerHTML={{ __html: processed }} />}
        </p>
      )
    })
  }

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div ref={ref} initial="hidden" animate={isInView ? 'visible' : 'hidden'} className="text-center mb-12">
          <motion.div custom={0} variants={fadeInUp}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neon-red/10 border border-neon-red/20 mb-6">
              <Sparkles className="w-4 h-4 text-neon-red" />
              <span className="text-neon-red text-sm font-medium">AI-Powered</span>
            </div>
          </motion.div>
          <motion.h1 custom={1} variants={fadeInUp} className="text-4xl sm:text-5xl font-bold text-white">
            Design Consultation
          </motion.h1>
          <motion.p custom={2} variants={fadeInUp} className="text-gray-500 mt-4 max-w-2xl mx-auto">
            Get instant design guidance from our AI consultation tool. Select a style or describe your dream tattoo and get expert recommendations.
          </motion.p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mb-8">
          <p className="text-gray-400 text-sm mb-3 flex items-center gap-2">
            <Palette className="w-4 h-4" /> Quick style selection
          </p>
          <div className="flex flex-wrap gap-2">
            {quickPrompts.map((qp) => (
              <button
                key={qp.label}
                onClick={() => { setSelectedPrompt(qp.prompt); setCustomPrompt('') }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedPrompt === qp.prompt
                    ? 'bg-neon-red text-white'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/5'
                }`}
              >
                {qp.label}
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="mb-8">
          <p className="text-gray-400 text-sm mb-3 flex items-center gap-2">
            <MessageSquare className="w-4 h-4" /> Or describe your own idea
          </p>
          <div className="flex gap-3">
            <input
              type="text"
              value={customPrompt}
              onChange={(e) => { setCustomPrompt(e.target.value); setSelectedPrompt('') }}
              onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
              placeholder="e.g., 'A minimalist mountain landscape with fine line detail'"
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-neon-red/50 transition-colors"
            />
            <button
              onClick={handleGenerate}
              disabled={isGenerating || (!selectedPrompt && !customPrompt.trim())}
              className="px-6 py-3 rounded-xl bg-neon-red hover:bg-neon-red-light text-white font-semibold disabled:opacity-30 disabled:hover:bg-neon-red transition-all flex items-center gap-2 shrink-0"
            >
              {isGenerating ? <Loader className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              Generate
            </button>
          </div>
        </motion.div>

        <AnimatePresence>
          {isGenerating && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="text-center py-16">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Loader className="w-5 h-5 text-neon-red animate-spin" />
                <p className="text-gray-400">Generating your consultation...</p>
              </div>
              <div className="flex justify-center gap-1.5">
                {[0, 1, 2].map((i) => (
                  <motion.div key={i} className="w-2 h-2 bg-neon-red/50 rounded-full"
                    animate={{ y: [0, -8, 0], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
                  />
                ))}
              </div>
            </motion.div>
          )}

          {result && !isGenerating && (
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="px-3 py-1.5 rounded-full bg-neon-red/10 border border-neon-red/20">
                  <span className="text-neon-red text-sm font-medium">Recommended Artist: {result.artist}</span>
                </div>
                <div className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
                  <span className="text-gray-400 text-sm">{result.style}</span>
                </div>
              </div>

              <div className="p-6 sm:p-8 rounded-2xl border border-white/5 bg-white/[0.02]">
                <div className="prose prose-invert prose-sm max-w-none text-gray-400 leading-relaxed">
                  {formatResult(result.description)}
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button onClick={handleReset} className="flex-1 py-3 rounded-xl border border-white/10 text-gray-400 hover:bg-white/5 transition-colors flex items-center justify-center gap-2">
                  <RotateCcw className="w-4 h-4" /> New Consultation
                </button>
                <a href="/booking" className="flex-[2] py-3 rounded-xl bg-neon-red hover:bg-neon-red-light text-white font-semibold transition-all flex items-center justify-center gap-2">
                  <Sparkles className="w-4 h-4" /> Book with {result.artist}
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="text-gray-700 text-xs text-center mt-12">
          AI consultations provide general guidance. For detailed designs, we recommend an in-person consultation with our artists TOON and Roonie.
        </motion.p>
      </div>
    </div>
  )
}
