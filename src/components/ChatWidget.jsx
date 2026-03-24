import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send } from 'lucide-react'

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
    answer: '🕐 **Studio Hours**\n\n• Monday - Friday: 11:00 AM - 9:00 PM\n• Saturday - Sunday: 10:00 AM - 10:00 PM\n• Walk-ins welcome when available\n• Appointments recommended\n\nBook online or call us at +66 2 123 4567!',
  },
  location: {
    keywords: ['location', 'where', 'address', 'direction', 'parking', 'bts', 'mrt', 'find', 'bangkok', 'sukhumvit'],
    answer: '📍 **Location**\n\n123 Sukhumvit Road, Soi 11\nKhlong Toei, Bangkok 10110\n\n🚇 5 min walk from Nana BTS Station\n🚗 Street parking available\n\nWe\'re on the 2nd floor, look for the red neon sign!',
  },
  deposit: {
    keywords: ['deposit', 'payment', 'pay', 'card', 'cash', 'transfer', 'promptpay', 'refund', 'cancel'],
    answer: '💳 **Payment & Deposits**\n\n• 500 THB non-refundable deposit to book\n• Deposit goes toward your final price\n• We accept: Cash, PromptPay, Credit/Debit Cards\n• Full payment due at end of session\n• Cancellations: 24h notice required to reschedule',
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
  return "Thanks for your message! 😊 For detailed inquiries, please call us at **+66 2 123 4567** or email **hello@earthgangtattoo.com**. You can also check our [FAQ page](/faq) for more answers!\n\nAsk me about: pricing, aftercare, hours, location, deposits, or pain levels."
}

const formatMessage = (text) => {
  return text.split('\n').map((line, i) => {
    let processed = line.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>')
    processed = processed.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-neon-red hover:underline">$1</a>')
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
    setInput('')
    setIsTyping(true)

    setTimeout(() => {
      const response = getResponse(userMsg.text)
      setMessages((prev) => [...prev, { id: Date.now() + 1, from: 'bot', text: response }])
      setIsTyping(false)
    }, 800 + Math.random() * 1200)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
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
            transition={{ duration: 0.2 }}
            className="mb-4 w-[360px] max-w-[calc(100vw-48px)] h-[480px] max-h-[calc(100vh-120px)] rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/50 flex flex-col"
            style={{ background: 'linear-gradient(135deg, #111111 0%, #0a0a0a 100%)' }}
          >
            {/* Header */}
            <div className="px-4 py-4 border-b border-white/5 flex items-center justify-between shrink-0"
              style={{ background: 'linear-gradient(135deg, rgba(220,38,38,0.15) 0%, rgba(17,17,17,0.95) 100%)' }}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-neon-red/20 flex items-center justify-center">
                  <span className="text-sm">🔥</span>
                </div>
                <div>
                  <p className="text-white text-sm font-semibold">Earth Gang Tattoo</p>
                  <p className="text-green-400 text-[11px] flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full inline-block"></span>
                    Online now
                  </p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-white transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl text-[13px] leading-relaxed ${
                      msg.from === 'user'
                        ? 'bg-neon-red text-white rounded-br-md'
                        : 'bg-white/5 text-gray-300 rounded-bl-md'
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
                  <div className="bg-white/5 px-4 py-3 rounded-2xl rounded-bl-md">
                    <div className="flex gap-1.5">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className="w-2 h-2 bg-gray-500 rounded-full"
                          animate={{ y: [0, -5, 0] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 border-t border-white/5 shrink-0">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask us anything..."
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-neon-red/50 transition-colors"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim()}
                  className="w-10 h-10 rounded-xl bg-neon-red hover:bg-neon-red-light disabled:opacity-30 disabled:hover:bg-neon-red flex items-center justify-center transition-all duration-200 shrink-0"
                >
                  <Send className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-neon-red hover:bg-neon-red-light shadow-lg shadow-neon-red/30 flex items-center justify-center transition-all duration-300 relative"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X className="w-6 h-6 text-white" />
            </motion.div>
          ) : (
            <motion.div key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <MessageCircle className="w-6 h-6 text-white" />
            </motion.div>
          )}
        </AnimatePresence>
        {!isOpen && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-dark"
          />
        )}
      </motion.button>
    </div>
  )
}
