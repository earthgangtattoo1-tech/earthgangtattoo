import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Sparkles, Send, RotateCcw, Palette, MessageSquare } from 'lucide-react'
import config from '../config'
import SEO from '../components/SEO'

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
// Curated Style Guide Generator
// Provides expert tattoo style recommendations based on
// our artists' specialties and studio experience.
// ============================================================
function generateConsultation(prompt) {
  const consultations = {
    'fine line': {
      artist: findArtist(['fineline']),
      style: 'Fine Line',
      description: `Based on your interest in a **fine line** design, our artist **RONNIE** would be perfect for this piece. Fine line work requires exceptional precision and a steady hand.\n\n**Design Recommendations:**\n• Fine line work looks best at **small to medium sizes** (2-5 inches)\n• **Ideal placements**: Inner forearm, behind the ear, collarbone, ankle, or ribcage\n• Fine lines heal beautifully but require careful aftercare\n\n**Session Details:**\n• **Estimated time**: 2-3 hours for most fine line pieces\n• **Pricing**: Starting from 3,000 THB depending on complexity\n• **Sessions needed**: Usually 1 session for smaller pieces`,
    },
    'traditional': {
      artist: findArtist(['traditional']),
      style: 'Traditional / Japanese',
      description: `A **traditional** piece is a timeless choice! Our artist **TOON** specializes in traditional, Japanese, Thai-inspired, and large-scale work.\n\n**Design Recommendations:**\n• Traditional tattoos feature **bold outlines and rich color palettes**\n• Japanese pieces work great as **large-scale work** (sleeves, back pieces)\n• **Ideal placements**: Upper arm, thigh, back, or chest for maximum impact\n• Bold designs age beautifully over time\n\n**Session Details:**\n• **Estimated time**: 3-5 hours for a medium piece\n• **Pricing**: Starting from 5,000 THB\n• **Sessions needed**: 1-2 sessions for most designs`,
    },
    'watercolor': {
      artist: findArtist(['fineline']),
      style: 'Watercolor',
      description: `A **watercolor** tattoo is a stunning, artistic choice! Our artist **RONNIE** can create pieces that look like they're flowing with liquid color on your skin.\n\n**Design Recommendations:**\n• Watercolor pieces need **enough space to breathe** — minimum 4 inches recommended\n• Works beautifully with **no black outline** for that authentic painted look\n• **Ideal placements**: Forearm, shoulder blade, thigh, or calf\n• Combines well with fine line accents\n\n**Session Details:**\n• **Estimated time**: 3-6 hours depending on size\n• **Pricing**: Starting from 6,000 THB\n• **Sessions needed**: Often 1-2 sessions`,
    },
    'geometric': {
      artist: findArtist(['geometric', 'fineline']),
      style: 'Geometric',
      description: `**Geometric** tattoos are incredibly popular and visually striking. Our artist **RONNIE** can create everything from simple geometric shapes to complex sacred geometry patterns.\n\n**Design Recommendations:**\n• Precision is key — geometric designs require **clean, mathematically precise lines**\n• Can range from minimal single shapes to **full mandala sleeves**\n• **Ideal placements**: Forearm (geometric bands), back (large mandalas), chest\n• Dotwork shading adds incredible depth\n\n**Session Details:**\n• **Estimated time**: 3-8 hours depending on complexity\n• **Pricing**: Starting from 4,000 THB (simple) to 25,000+ THB (sleeve)\n• **Sessions needed**: 1-3 sessions for complex pieces`,
    },
    'script': {
      artist: findArtist(['font']),
      style: 'Script / Lettering',
      description: `**Script and lettering** tattoos are deeply personal. Our artist **RONNIE** has a talent for creating elegant, custom typography that flows beautifully on the skin.\n\n**Design Recommendations:**\n• Script works at almost **any size** but needs enough space to be readable\n• **Ideal placements**: Inner arm, ribs, collarbone, along the spine, or foot\n• We can work with custom fonts or design lettering from scratch\n• Consider adding a small decorative element (flourish, date, etc.)\n\n**Session Details:**\n• **Estimated time**: 1-2 hours for most script pieces\n• **Pricing**: Starting from 2,000 THB\n• **Sessions needed**: Usually 1 session`,
    },
    'realism': {
      artist: findArtist(['traditional']),
      style: 'Photorealism',
      description: `**Realism** tattoos are the pinnacle of tattoo artistry. Our artist **TOON** creates detailed, bold pieces with rich color and animal designs.\n\n**Design Recommendations:**\n• Realism requires a **reference photo** for best results\n• **Minimum size**: 4 inches — smaller pieces lose detail over time\n• **Ideal placements**: Upper arm, thigh, back, or chest (flat surfaces work best)\n• Bold color realism tends to age well\n\n**Session Details:**\n• **Estimated time**: 4-8+ hours depending on complexity\n• **Pricing**: Starting from 8,000 THB\n• **Sessions needed**: 2-4 sessions for detailed pieces`,
    },
    'japanese': {
      artist: findArtist(['japanese', 'traditional']),
      style: 'Japanese / Irezumi',
      description: `**Japanese tattoo art** (Irezumi) has a rich history spanning centuries. Our artist **TOON** creates stunning Japanese-inspired pieces with bold imagery.\n\n**Design Recommendations:**\n• Classic motifs include **koi fish, dragons, cherry blossoms, waves, and tigers**\n• Japanese pieces work exceptionally well as **large-scale work** (sleeves, back pieces)\n• Bold outlines with vibrant color fill\n• **Ideal placements**: Full sleeve, back panel, thigh, or chest\n\n**Session Details:**\n• **Estimated time**: 5-10+ hours for large pieces\n• **Pricing**: Starting from 10,000 THB\n• **Sessions needed**: 3-6 sessions for a full sleeve`,
    },
    'minimalist': {
      artist: findArtist(['minimal', 'fineline']),
      style: 'Minimalist',
      description: `**Minimalist** tattoos are clean, subtle, and incredibly popular. Our artist **RONNIE** excels at creating simple yet powerful designs.\n\n**Design Recommendations:**\n• Less is more — **simple shapes, thin lines, and negative space**\n• Perfect for first-time tattoo clients\n• **Ideal placements**: Wrist, ankle, behind ear, finger, or collarbone\n• Works in black ink or can incorporate subtle color\n\n**Session Details:**\n• **Estimated time**: 30 min - 1.5 hours\n• **Pricing**: Starting from 1,500 THB\n• **Sessions needed**: Usually 1 session`,
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
    description: `Thank you for your interest in a custom tattoo design! Based on your idea of a "${prompt}", our team would love to bring this vision to life.\n\n**Our Recommendation:**\n• We'd suggest scheduling an **in-person or video consultation** to discuss your design in detail\n• Bring any **reference images** that inspire you\n• Consider the **placement and sizing** carefully — we can advise on what works best\n\n**Next Steps:**\n1. Book a consultation through our booking page\n2. Our artist will create a **custom sketch** based on your idea\n3. We'll review and refine the design together\n4. Schedule your tattoo session once you're happy with the design\n\n**General Pricing:**\n• Custom designs start from 3,000 THB\n• Complex pieces: 8,000 - 30,000+ THB\n• Hourly rate available for ongoing work\n\nFeel free to book a session and mention this consultation — our artists TOON and RONNIE will be ready to discuss your design!`,
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
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  const handleGenerate = () => {
    const prompt = selectedPrompt || customPrompt
    if (!prompt.trim()) return
    setResult(generateConsultation(prompt))
  }

  const handleReset = () => {
    setSelectedPrompt('')
    setCustomPrompt('')
    setResult(null)
  }

  const formatResult = (text) => {
    return text.split('\n').map((line, i) => {
      let processed = line.replace(/\*\*(.*?)\*\*/g, '<strong class="text-cream">$1</strong>')
      processed = processed.replace(/"(.*?)"/g, '<em class="text-gold">"$1"</em>')
      return (
        <p key={i} className={line.trim() === '' ? 'h-2' : ''}>
          {line.trim() !== '' && <span dangerouslySetInnerHTML={{ __html: processed }} />}
        </p>
      )
    })
  }

  return (
    <>
      <SEO title="Tattoo Style Guide — Explore Styles" description="Explore tattoo styles and get expert recommendations from Earth Gang Tattoo Chiang Mai. Fine Line, Traditional, Japanese, Geometric and more. Curated by TOON & RONNIE." path="/consult" />
      <div className="min-h-screen pt-32 pb-32 px-4 sm:px-6 lg:px-8 ink-wash">
      <div className="max-w-4xl mx-auto">

        {/* ── Page Header ── */}
        <motion.div ref={ref} initial="hidden" animate={isInView ? 'visible' : 'hidden'} className="text-center mb-16">
          <motion.div custom={0} variants={fadeInUp}>
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-crimson/20 bg-crimson-glow mb-8">
              <Sparkles className="w-3.5 h-3.5 text-crimson" />
              <span className="label-mono text-crimson">Style Guide</span>
            </div>
          </motion.div>
          <motion.h1 custom={1} variants={fadeInUp} className="heading-editorial text-4xl sm:text-5xl md:text-6xl text-cream mb-6">
            Design Consultation
          </motion.h1>
          <motion.p custom={2} variants={fadeInUp} className="text-cream-muted text-lg max-w-2xl mx-auto leading-relaxed">
            Explore our curated style guides and get expert recommendations for placement, sizing &amp; pricing — powered by our artists&apos; experience.
          </motion.p>
          <motion.div custom={3} variants={fadeInUp} className="mt-8">
            <div className="divider-ink max-w-xs mx-auto" />
          </motion.div>
        </motion.div>

        {/* ── Quick Style Selection Pills ── */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mb-10">
          <p className="label-mono text-cream-muted mb-4 flex items-center gap-2">
            <Palette className="w-3.5 h-3.5 text-crimson" /> Quick style selection
          </p>
          <div className="flex flex-wrap gap-2">
            {quickPrompts.map((qp) => (
              <button
                key={qp.label}
                onClick={() => { setSelectedPrompt(qp.prompt); setCustomPrompt('') }}
                className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                  selectedPrompt === qp.prompt
                    ? 'bg-crimson text-cream shadow-lg shadow-crimson/20'
                    : 'bg-ink-card text-cream-muted border border-ink-border hover:border-ink-hover hover:text-cream-soft hover:bg-ink-elevated'
                }`}
              >
                {qp.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* ── Custom Prompt Input ── */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="mb-12">
          <p className="label-mono text-cream-muted mb-4 flex items-center gap-2">
            <MessageSquare className="w-3.5 h-3.5 text-crimson" /> Or describe your own idea
          </p>
          <div className="flex gap-3">
            <input
              type="text"
              value={customPrompt}
              onChange={(e) => { setCustomPrompt(e.target.value); setSelectedPrompt('') }}
              onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
              placeholder="e.g., 'A minimalist mountain landscape with fine line detail'"
              className="input-ink flex-1"
            />
            <button
              onClick={handleGenerate}
              disabled={!selectedPrompt && !customPrompt.trim()}
              className="btn-crimson shrink-0 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:transform-none"
            >
              <Send className="w-4 h-4" />
              Generate
            </button>
          </div>
        </motion.div>

        {/* ── Result Display ── */}
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Artist + Style Badges */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-crimson/25 bg-crimson-glow">
                <Sparkles className="w-3.5 h-3.5 text-crimson" />
                <span className="text-sm font-medium text-crimson">Recommended Artist: <span className="text-cream font-semibold">{result.artist}</span></span>
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-ink-border bg-ink-card">
                <Palette className="w-3.5 h-3.5 text-gold" />
                <span className="text-sm text-cream-muted">{result.style}</span>
              </div>
            </div>

            {/* Result Card */}
            <div className="card-ink p-8 sm:p-10 [&:hover]:transform-none [&:hover]:translate-y-0">
              <div className="text-cream-soft leading-relaxed space-y-1">
                {formatResult(result.description)}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mt-8">
              <button onClick={handleReset} className="btn-ghost flex-1">
                <RotateCcw className="w-4 h-4" /> New Consultation
              </button>
              <a href="/booking" className="btn-crimson flex-[2]">
                <Sparkles className="w-4 h-4" /> Book with {result.artist}
              </a>
            </div>
          </motion.div>
        )}

        {/* ── Footer Disclaimer ── */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="mt-16 text-center">
          <div className="divider-ink max-w-xs mx-auto mb-6" />
          <p className="text-cream-dim text-xs leading-relaxed max-w-lg mx-auto">
            Style guides are curated by our artists based on their experience. For detailed designs and personalized advice, we recommend an in-person consultation with our artists TOON and RONNIE.
          </p>
        </motion.div>

      </div>
    </div>
    </>
  )
}
