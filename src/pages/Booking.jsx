import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, MapPin, Check, ChevronRight, ChevronLeft, Clock, User, FileText, QrCode, MessageCircle, Banknote } from 'lucide-react'
import { format, addDays, startOfDay, isSameDay, setHours, setMinutes, isBefore } from 'date-fns'
import config, { STUDIO } from '../config'
import SEO from '../components/SEO'
import { sendBookingEmail } from '../emailSender'

const { artists, services, deposit } = config

const serviceOptions = services.map(s => ({
  value: s.value,
  label: `${s.name} (${s.size})`,
  price: s.price,
}))

const timeSlots = []
for (let h = 10; h <= 19; h++) {
  const label = h < 12 ? `${h}:00 AM` : h === 12 ? `12:00 PM` : `${h - 12}:00 PM`
  timeSlots.push({ hour: h, label })
}

function generateRef() {
  return 'EG-' + Date.now().toString(36).toUpperCase() + '-' + Math.random().toString(36).substring(2, 6).toUpperCase()
}

export default function Booking() {
  const [step, setStep] = useState(1)
  const [booking, setBooking] = useState({
    artist: null,
    date: null,
    time: null,
    service: '',
    notes: '',
    name: '',
    email: '',
    phone: '',
    isConsultation: false,
  })
  const [bookings, setBookings] = useState(() => {
    try { return JSON.parse(localStorage.getItem('eg_bookings') || '[]') }
    catch { return [] }
  })
  const [paymentMethod, setPaymentMethod] = useState('cash')
  const [reference, setReference] = useState('')
  const [paymentDone, setPaymentDone] = useState(false)

  const today = startOfDay(new Date())

  const bookedSlots = useMemo(() => {
    return bookings.filter(b =>
      booking.artist && b.artist === booking.artist.id && booking.date && isSameDay(new Date(b.date), booking.date)
    )
  }, [bookings, booking.artist, booking.date])

  const isSlotBooked = (hour) => bookedSlots.some(b => b.hour === hour)
  const next14Days = Array.from({ length: 14 }, (_, i) => addDays(today, i))

  const handleCompleteBooking = async () => {
    const ref = generateRef()
    setReference(ref)
    const newBooking = {
      ...booking,
      date: booking.date.toISOString(),
      hour: booking.time.hour,
      time: booking.time.label,
      artist: { name: booking.artist.name, id: booking.artist.id },
      bookingType: booking.isConsultation ? 'consult' : 'session',
      reference: ref,
      createdAt: new Date().toISOString(),
    }
    const updated = [...bookings, newBooking]
    setBookings(updated)
    localStorage.setItem('eg_bookings', JSON.stringify(updated))

    // Try to submit via API (server-side email with real API key)
    try {
      const apiResult = await sendBookingEmail(newBooking)
      if (apiResult?.emailSent) {
        console.log('Booking confirmed via API')
      } else {
        console.log('Booking saved locally (email not configured)')
      }
    } catch (err) {
      console.log('API unavailable, booking saved locally:', err.message)
    }

    setPaymentDone(true)
    setStep(5)
  }

  const needsPayment = !booking.isConsultation && paymentMethod !== 'cash'

  const steps = booking.isConsultation
    ? [
        { num: 1, label: 'Artist', icon: User },
        { num: 2, label: 'Date & Time', icon: Calendar },
        { num: 3, label: 'Details', icon: FileText },
        { num: 4, label: 'Confirmed', icon: Check },
      ]
    : [
        { num: 1, label: 'Artist', icon: User },
        { num: 2, label: 'Date & Time', icon: Calendar },
        { num: 3, label: 'Details', icon: FileText },
        { num: 4, label: 'Payment', icon: Banknote },
        { num: 5, label: 'Confirmed', icon: Check },
      ]

  return (
    <>
      <SEO title="Book a Tattoo — Free Consultation Available" description="Book your tattoo session online at Earth Gang Tattoo Chiang Mai. Choose from TOON or RONNIE, pick your date & time. Free 30-min consultation available. 500 THB deposit. Cash, PromptPay & Card accepted." path="/booking" />

      <div className="ink-wash min-h-screen pt-32 pb-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">

          {/* ─── Page Header ─── */}
          <div className="text-center mb-12">
            <span className="label-mono text-crimson block mb-4">Reserve Your Session</span>
            <h1 className="heading-editorial text-cream text-4xl sm:text-5xl lg:text-6xl mb-3">
              {booking.isConsultation ? 'Book a Free Consultation' : 'Book Your Session'}
            </h1>
            <p className="text-cream-muted font-body max-w-md mx-auto">
              {booking.isConsultation
                ? 'Free 30-minute consultation — no payment required'
                : `Secure your spot with a ${deposit} THB deposit`}
            </p>
          </div>

          {/* ─── Step Indicator ─── */}
          <div className="mb-14">
            <div className="flex items-center justify-between max-w-lg mx-auto" role="navigation" aria-label="Booking steps">
              {steps.map((s, i) => (
                <div key={s.num} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-500 border ${
                      step >= s.num
                        ? 'bg-crimson border-crimson text-cream shadow-[0_0_20px_rgba(196,30,58,0.35)]'
                        : 'bg-ink-card border-ink-border text-cream-dim'
                    }`}>
                      {step > s.num ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <span className="font-mono text-sm font-semibold">{s.num}</span>
                      )}
                    </div>
                    <span className={`label-mono mt-2.5 ${
                      step >= s.num ? 'text-crimson' : 'text-cream-dim'
                    }`}>{s.label}</span>
                  </div>
                  {i < steps.length - 1 && (
                    <div className={`w-8 sm:w-16 h-px mx-1 sm:mx-2 transition-colors duration-500 ${
                      step > s.num ? 'bg-crimson' : 'bg-ink-border'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* ─── Divider ─── */}
          <div className="divider-crimson mb-10" />

          <AnimatePresence mode="wait">

            {/* ═══════════════════════════════════════
                STEP 1: Booking Type + Artist
            ═══════════════════════════════════════ */}
            {step === 1 && (
              <motion.div
                key="s1"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Booking type toggle */}
                <div className="flex gap-3 mb-10">
                  <button
                    onClick={() => setBooking(b => ({ ...b, isConsultation: false }))}
                    className={`flex-1 p-5 rounded-2xl border transition-all duration-400 text-center ${
                      !booking.isConsultation
                        ? 'border-crimson bg-crimson-glow'
                        : 'border-ink-border bg-ink-card hover:border-ink-hover'
                    }`}
                  >
                    <Banknote className={`w-5 h-5 mx-auto mb-2 ${!booking.isConsultation ? 'text-crimson' : 'text-cream-dim'}`} />
                    <p className={`font-semibold text-sm ${!booking.isConsultation ? 'text-cream' : 'text-cream-soft'}`}>Regular Booking</p>
                    <p className="text-cream-dim text-xs mt-1">Full tattoo session ({deposit} THB deposit)</p>
                  </button>
                  <button
                    onClick={() => setBooking(b => ({ ...b, isConsultation: true }))}
                    className={`flex-1 p-5 rounded-2xl border transition-all duration-400 text-center ${
                      booking.isConsultation
                        ? 'border-gold bg-gold-glow'
                        : 'border-ink-border bg-ink-card hover:border-ink-hover'
                    }`}
                  >
                    <MessageCircle className={`w-5 h-5 mx-auto mb-2 ${booking.isConsultation ? 'text-gold' : 'text-cream-dim'}`} />
                    <p className={`font-semibold text-sm ${booking.isConsultation ? 'text-cream' : 'text-cream-soft'}`}>Free Consultation</p>
                    <p className="text-cream-dim text-xs mt-1">30-min design consultation (no payment)</p>
                  </button>
                </div>

                <span className="label-mono text-cream-dim block mb-4">Choose Your Artist</span>
                <div className="space-y-4">
                  {artists.map((a) => (
                    <button
                      key={a.id}
                      onClick={() => { setBooking(b => ({ ...b, artist: a })); setStep(2) }}
                      className={`card-ink w-full p-5 text-left flex items-center gap-5 group ${
                        booking.artist?.id === a.id ? '!border-crimson !bg-crimson-glow' : ''
                      }`}
                    >
                      <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${a.gradient} flex items-center justify-center shrink-0`}>
                        <span className="text-2xl font-black text-cream/20">{a.initials}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-cream font-semibold text-lg">{a.name}</h3>
                        <p className="text-cream-muted text-sm">{a.specialty}</p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-cream-dim group-hover:text-crimson transition-colors shrink-0" />
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* ═══════════════════════════════════════
                STEP 2: Date & Time
            ═══════════════════════════════════════ */}
            {step === 2 && (
              <motion.div
                key="s2"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="label-mono text-cream-dim block mb-2">Select Date & Time</span>
                <p className="text-cream-soft text-sm mb-5">
                  Available dates for <span className="text-crimson font-semibold">{booking.artist.name}</span>
                </p>

                {/* Date pills */}
                <div className="mb-8">
                  <div className="flex gap-2 overflow-x-auto pb-3 -mx-1 px-1">
                    {next14Days.map((day) => {
                      const selected = booking.date && isSameDay(day, booking.date)
                      const isToday = isSameDay(day, today)
                      return (
                        <button
                          key={day.toISOString()}
                          onClick={() => setBooking(b => ({ ...b, date: day, time: null }))}
                          className={`shrink-0 w-16 py-3 rounded-xl border text-center transition-all duration-300 ${
                            selected
                              ? 'border-crimson bg-crimson text-cream shadow-[0_0_16px_rgba(196,30,58,0.25)]'
                              : 'border-ink-border bg-ink-card hover:border-ink-hover text-cream-soft'
                          }`}
                        >
                          <p className={`text-[10px] uppercase font-medium tracking-wider ${selected ? 'text-cream/70' : 'text-cream-dim'}`}>
                            {format(day, 'EEE')}
                          </p>
                          <p className="text-lg font-bold mt-0.5">{format(day, 'd')}</p>
                          {isToday && <p className="text-[9px] text-crimson font-semibold mt-0.5">Today</p>}
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Time slots */}
                {booking.date && (
                  <div>
                    <p className="text-cream-muted text-sm mb-3">{format(booking.date, 'EEEE, MMMM d, yyyy')}</p>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                      {timeSlots.map((slot) => {
                        const booked = isSlotBooked(slot.hour)
                        const selected = booking.time?.hour === slot.hour
                        const slotDate = setMinutes(setHours(booking.date, slot.hour), 0)
                        const past = isBefore(slotDate, new Date())
                        const disabled = booked || past
                        return (
                          <button
                            key={slot.hour}
                            disabled={disabled}
                            onClick={() => !disabled && setBooking(b => ({ ...b, time: slot }))}
                            className={`py-3 px-2 rounded-xl border text-sm font-medium transition-all duration-300 ${
                              selected
                                ? 'border-crimson bg-crimson text-cream shadow-[0_0_12px_rgba(196,30,58,0.2)]'
                                : disabled
                                  ? 'border-ink-border bg-ink-light text-cream-dim cursor-not-allowed line-through opacity-50'
                                  : 'border-ink-border bg-ink-card text-cream-soft hover:border-ink-hover hover:bg-ink-elevated'
                            }`}
                          >
                            <Clock className="w-3.5 h-3.5 mx-auto mb-1 opacity-70" />
                            {slot.label}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                )}

                {/* Navigation */}
                <div className="flex gap-3 mt-10">
                  <button onClick={() => setStep(1)} className="btn-ghost flex-1 !py-3">
                    <ChevronLeft className="w-4 h-4 mx-auto" />
                  </button>
                  <button
                    disabled={!booking.date || !booking.time}
                    onClick={() => setStep(3)}
                    className="btn-crimson flex-[3] disabled:opacity-30 disabled:cursor-not-allowed disabled:shadow-none disabled:transform-none"
                  >
                    Continue <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* ═══════════════════════════════════════
                STEP 3: Details
            ═══════════════════════════════════════ */}
            {step === 3 && (
              <motion.div
                key="s3"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="label-mono text-cream-dim block mb-2">Your Details</span>
                <p className="text-cream-soft text-sm mb-6">Tell us about yourself and your tattoo</p>

                {/* Booking summary card */}
                <div className="card-ink !transform-none p-5 mb-8">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-cream-dim text-xs uppercase tracking-wider mb-1">Artist</p>
                      <p className="text-cream font-medium">{booking.artist?.name}</p>
                    </div>
                    <div>
                      <p className="text-cream-dim text-xs uppercase tracking-wider mb-1">Date</p>
                      <p className="text-cream font-medium">{booking.date && format(booking.date, 'MMM d, yyyy')}</p>
                    </div>
                    <div>
                      <p className="text-cream-dim text-xs uppercase tracking-wider mb-1">Time</p>
                      <p className="text-cream font-medium">{booking.time?.label}</p>
                    </div>
                    <div>
                      <p className="text-cream-dim text-xs uppercase tracking-wider mb-1">Type</p>
                      <p className={`font-medium ${booking.isConsultation ? 'text-gold' : 'text-crimson'}`}>
                        {booking.isConsultation ? 'Free 30-min Consultation' : `${deposit} THB Deposit`}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Form fields */}
                <div className="space-y-5">
                  <div>
                    <label htmlFor="booking-name" className="label-mono text-cream-dim block mb-2">Full Name *</label>
                    <input
                      id="booking-name"
                      type="text" value={booking.name}
                      onChange={e => setBooking(b => ({ ...b, name: e.target.value }))}
                      placeholder="Your full name"
                      className="input-ink"
                      aria-required="true"
                    />
                  </div>
                  <div>
                    <label htmlFor="booking-email" className="label-mono text-cream-dim block mb-2">Email *</label>
                    <input
                      id="booking-email"
                      type="email" value={booking.email}
                      onChange={e => setBooking(b => ({ ...b, email: e.target.value }))}
                      placeholder="your@email.com"
                      className="input-ink"
                      aria-required="true"
                    />
                  </div>
                  <div>
                    <label htmlFor="booking-phone" className="label-mono text-cream-dim block mb-2">Phone *</label>
                    <input
                      id="booking-phone"
                      type="tel" value={booking.phone}
                      onChange={e => setBooking(b => ({ ...b, phone: e.target.value }))}
                      placeholder="064-639-4795"
                      className="input-ink"
                      aria-required="true"
                    />
                  </div>

                  {!booking.isConsultation && (
                    <div>
                      <label htmlFor="booking-service" className="label-mono text-cream-dim block mb-2">Service Type *</label>
                      <select
                        id="booking-service"
                        value={booking.service}
                        onChange={e => setBooking(b => ({ ...b, service: e.target.value }))}
                        className="input-ink appearance-none"
                      >
                        <option value="" className="bg-ink-light text-cream">Select a service...</option>
                        {serviceOptions.map(s => (
                          <option key={s.value} value={s.value} className="bg-ink-light text-cream">{s.label} — {s.price}</option>
                        ))}
                      </select>
                    </div>
                  )}

                  <div>
                    <label htmlFor="booking-notes" className="label-mono text-cream-dim block mb-2">
                      {booking.isConsultation ? 'Describe your idea / questions' : 'Description / Notes'}
                    </label>
                    <textarea
                      id="booking-notes"
                      value={booking.notes}
                      onChange={e => setBooking(b => ({ ...b, notes: e.target.value }))}
                      placeholder={booking.isConsultation ? 'Tell us about your tattoo idea, preferred style, placement...' : 'Describe your tattoo idea, placement, size, reference images...'}
                      rows={4}
                      className="input-ink resize-none"
                    />
                  </div>
                </div>

                {/* Navigation */}
                <div className="flex gap-3 mt-10">
                  <button onClick={() => setStep(2)} className="btn-ghost flex-1 !py-3">
                    <ChevronLeft className="w-4 h-4 mx-auto" />
                  </button>
                  <button
                    disabled={!booking.name || !booking.email || !booking.phone || (!booking.isConsultation && !booking.service)}
                    onClick={() => {
                      if (booking.isConsultation) {
                        handleCompleteBooking()
                      } else {
                        setStep(4)
                      }
                    }}
                    className="btn-crimson flex-[3] disabled:opacity-30 disabled:cursor-not-allowed disabled:shadow-none disabled:transform-none"
                  >
                    {booking.isConsultation ? 'Confirm Consultation' : 'Continue to Payment'} <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* ═══════════════════════════════════════
                STEP 4: Payment (only for regular bookings)
            ═══════════════════════════════════════ */}
            {step === 4 && !booking.isConsultation && (
              <motion.div
                key="s4"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="label-mono text-cream-dim block mb-2">Secure Payment</span>
                <p className="text-cream-soft text-sm mb-6">Complete your deposit to confirm the booking</p>

                {/* Payment summary */}
                <div className="card-ink !transform-none p-5 mb-8">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-cream-muted text-sm">Booking deposit for {booking.artist?.name}</p>
                    <div className="text-right">
                      <span className="heading-display text-2xl text-cream">{deposit}</span>
                      <span className="text-cream-dim text-sm ml-1">THB</span>
                    </div>
                  </div>
                  <div className="divider-ink mb-3" />
                  <p className="text-cream-dim text-xs">
                    {booking.date && format(booking.date, 'MMM d, yyyy')} at {booking.time?.label} · {serviceOptions.find(s => s.value === booking.service)?.label}
                  </p>
                </div>

                {/* Payment method tabs */}
                <div className="flex gap-2 mb-6">
                  <button
                    onClick={() => setPaymentMethod('promptpay')}
                    className={`flex-1 py-3 px-2 rounded-xl border text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
                      paymentMethod === 'promptpay'
                        ? 'border-crimson bg-crimson-glow text-crimson'
                        : 'border-ink-border bg-ink-card text-cream-dim hover:border-ink-hover hover:text-cream-soft'
                    }`}
                  >
                    <QrCode className="w-4 h-4" /> PromptPay
                  </button>
                  <button
                    onClick={() => setPaymentMethod('cash')}
                    className={`flex-1 py-3 px-2 rounded-xl border text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
                      paymentMethod === 'cash'
                        ? 'border-crimson bg-crimson-glow text-crimson'
                        : 'border-ink-border bg-ink-card text-cream-dim hover:border-ink-hover hover:text-cream-soft'
                    }`}
                  >
                    <Banknote className="w-4 h-4" /> Cash
                  </button>
                </div>

                {/* Payment form content */}
                <AnimatePresence mode="wait">
                  {paymentMethod === 'promptpay' ? (
                    <motion.div
                      key="promptpay"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="text-center py-8"
                    >
                      <div className="inline-block p-4 bg-cream rounded-2xl mb-5">
                        <div className="w-48 h-48 bg-cream-soft rounded-lg flex items-center justify-center">
                          <QrCode className="w-40 h-40 text-ink" />
                        </div>
                      </div>
                      <p className="text-cream-muted text-sm">Scan with your banking app to pay</p>
                      <p className="heading-display text-3xl text-cream mt-2">{deposit} THB</p>
                      <p className="text-cream-dim text-xs mt-2 font-mono">PromptPay: {STUDIO.promptpayId} ({STUDIO.phone})</p>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="cash"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="text-center py-8"
                    >
                      <div className="w-20 h-20 rounded-full bg-gold-glow border-2 border-gold/30 flex items-center justify-center mx-auto mb-5">
                        <Banknote className="w-10 h-10 text-gold" />
                      </div>
                      <p className="text-cream font-semibold text-lg">Pay at Studio</p>
                      <p className="text-cream-muted text-sm mt-2 max-w-xs mx-auto">
                        No online payment needed. Please bring {deposit} THB in cash when you arrive for your session.
                      </p>
                      <p className="text-cream-dim text-xs mt-3 font-mono">
                        {STUDIO.address}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Navigation */}
                <div className="flex gap-3 mt-10">
                  <button onClick={() => setStep(3)} className="btn-ghost flex-1 !py-3">
                    <ChevronLeft className="w-4 h-4 mx-auto" />
                  </button>
                  <button
                    onClick={handleCompleteBooking}
                    className="btn-crimson flex-[3]"
                  >
                    {paymentMethod === 'cash' ? 'Confirm Booking' : `Pay ${deposit} THB & Confirm`}
                  </button>
                </div>
              </motion.div>
            )}

            {/* ═══════════════════════════════════════
                STEP 5 / STEP 4: Confirmation
            ═══════════════════════════════════════ */}
            {((step === 5 && paymentDone) || (step === 4 && booking.isConsultation && paymentDone)) && (
              <motion.div
                key="s5"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="text-center py-8">

                  {/* Confetti particles */}
                  {[...Array(10)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
                      animate={{
                        x: Math.cos((i * Math.PI * 2) / 10) * 140,
                        y: Math.sin((i * Math.PI * 2) / 10) * 140,
                        scale: [0, 1.5, 0],
                        opacity: [1, 1, 0],
                      }}
                      transition={{ duration: 1.2, delay: 0.3 + i * 0.05 }}
                      className="fixed top-1/2 left-1/2 w-3 h-3 rounded-full pointer-events-none z-50"
                      style={{ backgroundColor: i % 2 === 0 ? 'var(--color-crimson)' : 'var(--color-gold)' }}
                    />
                  ))}

                  {/* Success icon */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
                    className="w-20 h-20 rounded-full bg-crimson-glow border-2 border-crimson flex items-center justify-center mx-auto mb-6 shadow-[0_0_40px_rgba(196,30,58,0.2)]"
                  >
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5, type: 'spring' }}>
                      <Check className="w-10 h-10 text-crimson" />
                    </motion.div>
                  </motion.div>

                  <motion.h2
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="heading-editorial text-3xl text-cream"
                  >
                    {booking.isConsultation ? 'Consultation Booked!' : 'Booking Confirmed!'}
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9 }}
                    className="text-cream-muted mt-2"
                  >
                    {booking.isConsultation
                      ? 'Your free 30-minute consultation has been scheduled'
                      : paymentMethod === 'cash'
                        ? 'Your booking is confirmed — pay at studio'
                        : 'Your deposit has been received'
                    }
                  </motion.p>

                  {/* Booking details */}
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.1 }}
                    className="mt-8 p-6 rounded-2xl border border-ink-border bg-ink-card text-left max-w-md mx-auto"
                  >
                    {/* Reference number */}
                    <div className="text-center mb-5">
                      <p className="label-mono text-cream-dim">Booking Reference</p>
                      <p className="text-2xl font-mono font-bold text-crimson mt-1.5 tracking-wider">{reference}</p>
                    </div>
                    <div className="divider-ink mb-5" />

                    {/* Details grid */}
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-cream-dim">Type</span>
                        <span className={`font-medium ${booking.isConsultation ? 'text-gold' : 'text-cream'}`}>
                          {booking.isConsultation ? 'Free 30-min Consultation' : 'Tattoo Session'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-cream-dim">Artist</span>
                        <span className="text-cream font-medium">{booking.artist?.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-cream-dim">Date</span>
                        <span className="text-cream font-medium">{booking.date && format(booking.date, 'EEEE, MMM d, yyyy')}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-cream-dim">Time</span>
                        <span className="text-cream font-medium">{booking.time?.label}</span>
                      </div>
                      {!booking.isConsultation && (
                        <div className="flex justify-between">
                          <span className="text-cream-dim">Service</span>
                          <span className="text-cream font-medium">{serviceOptions.find(s => s.value === booking.service)?.label}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-cream-dim">Name</span>
                        <span className="text-cream font-medium">{booking.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-cream-dim">Email</span>
                        <span className="text-cream font-medium">{booking.email}</span>
                      </div>
                      {!booking.isConsultation && (
                        <>
                          <div className="divider-ink my-2" />
                          <div className="flex justify-between">
                            <span className="text-cream-dim">
                              {paymentMethod === 'cash' ? 'Pay at Studio' : 'Deposit Paid'}
                            </span>
                            <span className={`font-bold ${paymentMethod === 'cash' ? 'text-gold' : 'text-crimson'}`}>
                              {paymentMethod === 'cash' ? `${deposit} THB (cash at studio)` : `${deposit} THB ✓`}
                            </span>
                          </div>
                        </>
                      )}
                    </div>
                  </motion.div>

                  {/* Back to home */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    className="mt-8"
                  >
                    <p className="text-cream-dim text-sm mb-5">
                      {booking.isConsultation
                        ? 'See you at the studio! Bring your reference images and ideas.'
                        : 'A confirmation email has been sent to ' + booking.email
                      }
                    </p>
                    <a href="/" className="btn-crimson">
                      Back to Home
                    </a>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.7 }}
                    className="mt-8 p-6 rounded-2xl border border-ink-border bg-ink-card max-w-md mx-auto"
                  >
                    <p className="text-cream font-semibold text-sm mb-4 flex items-center gap-2">
                      <span>📋</span> Before Your Session
                    </p>
                    <ul className="space-y-2.5 text-cream-muted text-xs">
                      <li className="flex items-start gap-2">
                        <span className="text-crimson mt-0.5">•</span>
                        <span>Eat a good meal and stay hydrated before your appointment</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-crimson mt-0.5">•</span>
                        <span>Bring reference images or inspiration for your design</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-crimson mt-0.5">•</span>
                        <span>Avoid alcohol 24 hours before your session</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-crimson mt-0.5">•</span>
                        <span>Wear comfortable clothing that exposes the area to be tattooed</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-crimson mt-0.5">•</span>
                        <span>Arrive 10 minutes early to discuss your design</span>
                      </li>
                    </ul>
                    <div className="mt-5 pt-4 border-t border-ink-border/50">
                      <a
                        href="https://maps.google.com/?q=18.7879,98.9931"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm text-crimson hover:text-crimson-light transition-colors"
                      >
                        <MapPin className="w-3.5 h-3.5" />
                        Get Directions to Studio
                      </a>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </>
  )
}
