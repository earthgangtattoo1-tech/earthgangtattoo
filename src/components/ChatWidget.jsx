import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send } from 'lucide-react'
import { STUDIO } from '../config'
import { sendChatMessage } from '../emailSender'

const faqResponses = {
  pricing: {
    keywords: ['price', 'cost', 'how much', 'thb', 'money', 'rates', 'rate', 'expensive', 'cheap', 'afford'],
    answer: '💰 **Pricing**\n\n• Small tattoo (2-3"): Starting from 2,000 THB\n• Medium tattoo (4-6"): Starting from 5,000 THB\n• Large tattoo (7-10"): Starting from 10,000 THB\n• Full sleeve: Starting from 30,000 THB\n• Hourly rate: 1,500 THB/hour\n\nA 500 THB deposit is required to book, which goes toward your final price.',
  },
  aftercare: {
    keywords: ['aftercare', 'care', 'heal', 'healing', 'wash', 'clean', 'ointment', 'moisturize', 'sun', 'swimming'],
    answer: '🩹 **Aftercare Instructions**\n\n1. Keep the bandage on for 2-4 hours\n2. Wash gently with unscented soap & warm water\n3. Pat dry with a clean paper towel\n4. Apply a thin layer of recommended ointment\n5. Moisturize 2-3x daily for 2 weeks\n6. Avoid direct sunlight for 4 weeks\n7. No swimming or soaking for 3 weeks\n\nWe provide a detailed aftercare kit with every session!',
  },
  hours: {
    keywords: ['hours', 'open', 'close', 'when', 'time', 'schedule', 'appointment', 'available'],
    answer: `🕐 **Studio Hours**\n\n• Daily: ${STUDIO.hours}\n• Walk-ins welcome when available\n• Appointments recommended\n\nBook online or call us at ${STUDIO.phone}!`,
  },
  location: {
    keywords: ['location', 'where', 'address', 'direction', 'parking', 'bts', 'mrt', 'find', 'chiang mai', 'thailand'],
    answer: `📍 **Location**\n\n${STUDIO.address}\n\n📍 ${STUDIO.addressShort}\n\nWe're easy to find — look for the crimson glow!`,
  },
  deposit: {
    keywords: ['deposit', 'payment', 'pay', 'card', 'cash', 'transfer', 'promptpay', 'refund', 'cancel'],
    answer: '💳 **Payment & Deposits**\n\n• 500 THB non-refundable deposit to book\n• Deposit goes toward your final price\n• We accept: Cash (pay at studio), PromptPay, Credit/Debit Cards\n• Full payment due at end of session\n• Cancellations: 24h notice required to reschedule',
  },
  pain: {
    keywords: ['pain', 'hurt', 'painful', 'ouch', 'tolerate', 'scared', 'afraid', 'first time'],
    answer: '😌 **Pain & Comfort**\n\nEveryone\'s pain tolerance is different, but here\'s a general guide:\n\n• Least painful: Outer arm, thigh, calf\n• Moderate: Inner arm, shoulder, back\n• More sensitive: Ribs, feet, hands, neck\n\nWe ensure maximum comfort and can take breaks anytime. First-timers are always welcome!',
  },
}

function getResponse(input) {
  const lower = input.toLowerCase()
  for (const category of Object.values(faqResponses)) {
    if (category.keywords.some((kw) => lower.includes(kw))) {
      return category.answer
    }
  }
  return `Thanks for your message! 😊 For detailed inquiries, please call us at **${STUDIO.phone}** or email **${STUDIO.email}**. You can also check our [FAQ page](/faq) for more answers!\n\nAsk me about: pricing, aftercare, hours, location, deposits, or pain levels.`
}

const formatMessage = (text) => {
  return text.split('\n').map((line, i) => {
    let processed = line.replace(/\*\*(.*?)\*\*/g, '<strong class="text-cream font-semibold">$1</strong>')
    processed = processed.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-crimson hover:text-crimson-light transition-colors underline underline-offset-2">$1</a>')
    return (
      <span key={i}>
        <span dangerouslySetInnerHTML={{ __html: processed }} />
        {i < text.split('\n').length - 1 && <br />}
      </span>
    )
  })
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: 1,
      from: 'bot',
      text: "Hey! 👋 Welcome to Earth Gang Tattoo. I'm here to help with any questions about our studio, artists, pricing, or aftercare. What would you like to know?",
    },
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [emailRequested, setEmailRequested] = useState(false)
  const [userEmail, setUserEmail] = useState('')
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  const handleSend = () => {
    if (!input.trim()) return

    const userMsg = { id: Date.now(), from: 'user', text: input.trim() }
    setMessages((prev) => [...prev, userMsg])
    const msgText = input.trim()
    setInput('')
    setIsTyping(true)

    setTimeout(async () => {
      const response = getResponse(msgText)
      setMessages((prev) => [...prev, { id: Date.now() + 1, from: 'bot', text: response }])
      setIsTyping(false)

      // If bot gives the fallback response, offer to forward to studio
      if (response.includes('call us at')) {
        setEmailRequested(true)
      }
    }, 800 + Math.random() * 1200)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleEmailSubmit = async () => {
    if (!userEmail.trim()) return
    try {
      await sendChatMessage('', messages.find(m => m.from === 'user')?.text || '', userEmail.trim())
      setMessages(prev => [...prev, { 
        id: Date.now() + 2, 
        from: 'bot', 
        text: "✅ Message received! We'll get back to you within 24 hours at **" + userEmail.trim() + "**. You can also reach us directly at 📞 064-639-4795." 
      }])
    } catch {
      setMessages(prev => [...prev, { 
        id: Date.now() + 2, 
        from: 'bot', 
        text: "⚠️ Sorry, we couldn't send your message right now. Please email us directly at **earthgangtattoo@gmail.com** or call **064-639-4795**." 
      }])
    }
    setEmailRequested(false)
    setUserEmail('')
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="mb-4 w-[380px] max-w-[calc(100vw-48px)] h-[500px] max-h-[calc(100vh-120px)] rounded-2xl overflow-hidden border border-ink-border shadow-2xl shadow-black/60 flex flex-col bg-ink-card"
                role="dialog"
                aria-label="Live chat"
          >
            {/* Header */}
            <div
              className="px-5 py-4 border-b border-ink-border flex items-center justify-between shrink-0"
              style={{ background: 'linear-gradient(135deg, rgba(185,28,28,0.12) 0%, rgba(15,12,10,0.98) 100%)' }}
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-crimson/15 border border-crimson/20 flex items-center justify-center">
                  <span className="text-sm">🔥</span>
                </div>
                <div>
                  <p className="text-cream text-sm font-display tracking-wide uppercase">Earth Gang</p>
                  <p className="text-cream-muted text-[11px] font-body flex items-center gap-1.5 mt-0.5">
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full inline-block animate-pulse"></span>
                    Online now — typically replies instantly
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-cream-dim hover:text-cream transition-colors duration-200 p-1 rounded-lg hover:bg-ink-hover"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-ink/50 scroll-smooth"
                  aria-live="polite"
                  aria-label="Chat messages">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] px-4 py-3 text-[13px] leading-relaxed font-body ${
                      msg.from === 'user'
                        ? 'bg-crimson text-cream rounded-2xl rounded-br-md shadow-lg shadow-crimson/20'
                        : 'bg-ink-elevated text-cream-soft border border-ink-border rounded-2xl rounded-bl-md'
                    }`}
                  >
                    {formatMessage(msg.text)}
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-ink-elevated border border-ink-border px-5 py-3.5 rounded-2xl rounded-bl-md">
                    <div className="flex gap-1.5">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className="w-2 h-2 bg-cream-dim rounded-full"
                          animate={{ y: [0, -5, 0], opacity: [0.4, 1, 0.4] }}
                          transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Email prompt */}
            {emailRequested && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mx-4 mb-3 p-3 rounded-xl bg-ink-elevated border border-ink-border"
              >
                <p className="text-cream-soft text-xs mb-2">📧 Leave your email so we can follow up:</p>
                <div className="flex gap-2">
                  <input
                    type="email"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleEmailSubmit()}
                    placeholder="your@email.com"
                    className="input-ink flex-1 !py-2 !text-xs !rounded-lg"
                  />
                  <button
                    onClick={handleEmailSubmit}
                    disabled={!userEmail.trim()}
                    className="btn-crimson !px-3 !py-2 !text-xs !rounded-lg disabled:opacity-25"
                  >
                    Send
                  </button>
                </div>
              </motion.div>
            )}

            {/* Input */}
            <div className="p-3 border-t border-ink-border shrink-0 bg-ink-card">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask us anything..."
                  className="input-ink flex-1 rounded-xl px-4 py-2.5 text-sm text-cream placeholder-cream-dim font-body"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim()}
                  className="btn-crimson w-10 h-10 rounded-xl flex items-center justify-center shrink-0 disabled:opacity-25 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4 text-cream" />
                </button>
              </div>
              <p className="text-[10px] text-cream-dim text-center mt-2 font-body opacity-60">
                Powered by Earth Gang Tattoo Studio
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-crimson hover:bg-crimson-light shadow-lg shadow-crimson/30 flex items-center justify-center transition-all duration-300 relative group"
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <X className="w-6 h-6 text-cream" />
            </motion.div>
          ) : (
            <motion.div key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <MessageCircle className="w-6 h-6 text-cream" />
            </motion.div>
          )}
        </AnimatePresence>
        {!isOpen && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-ink shadow-sm shadow-emerald-400/40"
          />
        )}
        {/* Glow ring on hover */}
        <span className="absolute inset-0 rounded-full bg-crimson/0 group-hover:bg-crimson/10 transition-all duration-300 pointer-events-none" />
      </motion.button>
    </div>
  )
}
