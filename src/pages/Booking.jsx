import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, CreditCard, Shield, Lock, Check, ChevronRight, ChevronLeft, Clock, User, FileText, QrCode, Banknote, Video } from 'lucide-react'
import { format, addDays, startOfDay, isSameDay, setHours, setMinutes, isBefore } from 'date-fns'
import { STUDIO } from '../config'
import config from '../config'

const { services, artists } = config
const timeSlots = []
for (let h = 10; h <= 21; h++) {
  const label = h < 12 ? `${h}:00 AM` : h === 12 ? `12:00 PM` : `${h - 12}:00 PM`
  timeSlots.push({ hour: h, label })
}
const lastSlot = timeSlots[timeSlots.length - 1] // 9:00 PM

function generateRef() {
  return 'EG-' + Date.now().toString(36).toUpperCase() + '-' + Math.random().toString(36).substring(2, 6).toUpperCase()
}

export default function Booking() {
  const [step, setStep] = useState(1)
  const [bookingType, setBookingType] = useState('') // '' | 'tattoo' | 'consult'
  const [booking, setBooking] = useState({
    artist: null,
    date: null,
    time: null,
    service: '',
    notes: '',
    name: '',
    email: '',
    phone: '',
  })
  const [bookings, setBookings] = useState(() => {
    try { return JSON.parse(localStorage.getItem('eg_bookings') || '[]') } catch { return [] }
  })
  const [cardForm, setCardForm] = useState({ number: '', expiry: '', cvv: '', name: '' })
  const [paymentMethod, setPaymentMethod] = useState('card')
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

  const handleCompleteBooking = () => {
    const ref = generateRef()
    setReference(ref)
    const newBooking = {
      ...booking,
      date: booking.date.toISOString(),
      hour: booking.time.hour,
      reference: ref,
      bookingType,
      createdAt: new Date().toISOString(),
    }
    const updated = [...bookings, newBooking]
    setBookings(updated)
    localStorage.setItem('eg_bookings', JSON.stringify(updated))
    setPaymentDone(true)
    setStep(5)
  }

  const formatCard = (val) => val.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim().slice(0, 19)
  const formatExpiry = (val) => {
    const clean = val.replace(/\D/g, '').slice(0, 4)
    return clean.length > 2 ? clean.slice(0, 2) + '/' + clean.slice(2) : clean
  }

  const isFreeConsult = bookingType === 'consult'
  const isCashPayment = paymentMethod === 'cash'
  const skipPayment = isFreeConsult || isCashPayment

  const steps = bookingType === 'consult'
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
        { num: 4, label: 'Payment', icon: CreditCard },
        { num: 5, label: 'Confirmed', icon: Check },
      ]

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Booking type selection */}
        {!bookingType && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-3xl sm:text-4xl font-bold text-white text-center mb-2">Book Your Session</h1>
            <p className="text-gray-500 text-center mb-10">Choose how you'd like to proceed</p>
            <div className="grid sm:grid-cols-2 gap-6 max-w-xl mx-auto">
              <button
                onClick={() => setBookingType('tattoo')}
                className="p-8 rounded-2xl border border-white/5 hover:border-neon-red/30 bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-300 text-left group"
              >
                <div className="w-14 h-14 rounded-xl bg-neon-red/10 flex items-center justify-center mb-4 group-hover:bg-neon-red/20 transition-colors">
                  <CreditCard className="w-7 h-7 text-neon-red" />
                </div>
                <h3 className="text-xl font-bold text-white">Tattoo Booking</h3>
                <p className="text-gray-500 text-sm mt-2">Book a tattoo session with a 500 THB deposit that goes toward your final price.</p>
                <p className="text-neon-red text-sm font-semibold mt-4 flex items-center gap-1">
                  Book Now <ChevronRight className="w-4 h-4" />
                </p>
              </button>
              <button
                onClick={() => setBookingType('consult')}
                className="p-8 rounded-2xl border border-white/5 hover:border-gold/30 bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-300 text-left group"
              >
                <div className="w-14 h-14 rounded-xl bg-gold/10 flex items-center justify-center mb-4 group-hover:bg-gold/20 transition-colors">
                  <Video className="w-7 h-7 text-gold" />
                </div>
                <h3 className="text-xl font-bold text-white">Free Consultation</h3>
                <p className="text-gray-500 text-sm mt-2">30-minute free design consultation. Discuss your idea with our artist before committing.</p>
                <p className="text-gold text-sm font-semibold mt-4 flex items-center gap-1">
                  Free <Check className="w-4 h-4" />
                </p>
              </button>
            </div>
          </motion.div>
        )}

        {/* Progress */}
        {bookingType && (
          <div className="mb-12">
            <button onClick={() => { if (step === 1) { setBookingType('') } }} className="text-gray-500 hover:text-white text-sm mb-4 flex items-center gap-1 transition-colors">
              <ChevronLeft className="w-4 h-4" /> Back
            </button>
            <h1 className="text-3xl sm:text-4xl font-bold text-white text-center mb-2">
              {isFreeConsult ? 'Free Design Consultation' : 'Book Your Session'}
            </h1>
            <p className="text-gray-500 text-center mb-8">
              {isFreeConsult ? '30 minutes — completely free' : 'Secure your spot with a 500 THB deposit'}
            </p>
            <div className="flex items-center justify-between max-w-lg mx-auto">
              {steps.map((s, i) => (
                <div key={s.num} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                      (isFreeConsult ? step >= s.num : step >= s.num) ? 'bg-neon-red text-white' : 'bg-white/5 text-gray-600 border border-white/10'
                    }`}>
                      {((isFreeConsult ? step > s.num : step > s.num) || (isFreeConsult && step === 4 && s.num === 4)) ? <Check className="w-4 h-4" /> : <s.icon className="w-4 h-4" />}
                    </div>
                    <span className={`text-[10px] mt-2 ${step >= s.num ? 'text-white' : 'text-gray-600'}`}>{s.label}</span>
                  </div>
                  {i < steps.length - 1 && (
                    <div className={`w-8 sm:w-16 h-0.5 mx-1 sm:mx-2 transition-colors duration-300 ${step > s.num ? 'bg-neon-red' : 'bg-white/10'}`} />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <AnimatePresence mode="wait">
          {/* STEP 1: Artist */}
          {step === 1 && bookingType && (
            <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
              <h2 className="text-xl font-semibold text-white mb-6">Choose Your Artist</h2>
              <div className="space-y-4">
                {artists.map((a) => (
                  <button
                    key={a.id}
                    onClick={() => { setBooking(b => ({ ...b, artist: a })); setStep(2) }}
                    className="w-full p-5 rounded-2xl border transition-all duration-300 text-left flex items-center gap-5 border-white/5 bg-white/[0.02] hover:border-white/10 hover:bg-white/[0.04]"
                  >
                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${a.gradient} flex items-center justify-center shrink-0`}>
                      <span className="text-2xl font-black text-white/20">{a.initials}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white font-semibold text-lg">{a.name}</h3>
                      <p className="text-gray-500 text-sm">{a.specialty}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-600" />
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 2: Date & Time */}
          {step === 2 && (
            <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
              <h2 className="text-xl font-semibold text-white mb-6">Select Date & Time</h2>
              <div className="mb-8">
                <p className="text-gray-400 text-sm mb-3">Available dates for <span className="text-neon-red">{booking.artist?.name}</span></p>
                <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1">
                  {next14Days.map((day) => {
                    const selected = booking.date && isSameDay(day, booking.date)
                    const isToday = isSameDay(day, today)
                    return (
                      <button
                        key={day.toISOString()}
                        onClick={() => setBooking(b => ({ ...b, date: day, time: null }))}
                        className={`shrink-0 w-16 py-3 rounded-xl border text-center transition-all duration-200 ${
                          selected ? 'border-neon-red bg-neon-red text-white' : 'border-white/5 bg-white/[0.02] hover:border-white/10'
                        }`}
                      >
                        <p className="text-[10px] uppercase font-medium text-inherit opacity-60">{format(day, 'EEE')}</p>
                        <p className="text-lg font-bold text-inherit mt-0.5">{format(day, 'd')}</p>
                        {isToday && <p className="text-[9px] text-neon-red font-semibold mt-0.5">Today</p>}
                      </button>
                    )
                  })}
                </div>
              </div>
              {booking.date && (
                <div>
                  <p className="text-gray-400 text-sm mb-3">{format(booking.date, 'EEEE, MMMM d, yyyy')}</p>
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
                          className={`py-3 px-2 rounded-xl border text-sm font-medium transition-all duration-200 ${
                            selected ? 'border-neon-red bg-neon-red text-white'
                              : disabled ? 'border-white/5 bg-white/[0.01] text-gray-700 cursor-not-allowed line-through'
                              : 'border-white/5 bg-white/[0.02] text-gray-300 hover:border-white/10 hover:bg-white/[0.04]'
                          }`}
                        >
                          <Clock className="w-3.5 h-3.5 mx-auto mb-1" />
                          {slot.label}
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}
              <div className="flex gap-3 mt-8">
                <button onClick={() => setStep(1)} className="flex-1 py-3 rounded-xl border border-white/10 text-gray-400 hover:bg-white/5 transition-colors">
                  <ChevronLeft className="w-4 h-4 mx-auto" />
                </button>
                <button
                  disabled={!booking.date || !booking.time}
                  onClick={() => setStep(3)}
                  className="flex-[3] py-3 rounded-xl bg-neon-red text-white font-semibold hover:bg-neon-red-light disabled:opacity-30 disabled:hover:bg-neon-red transition-all flex items-center justify-center gap-2"
                >
                  Continue <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 3: Details */}
          {step === 3 && (
            <motion.div key="s3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
              <h2 className="text-xl font-semibold text-white mb-6">
                {isFreeConsult ? 'Consultation Details' : 'Booking Details'}
              </h2>
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 mb-6">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div><p className="text-gray-500">Artist</p><p className="text-white font-medium">{booking.artist?.name}</p></div>
                  <div><p className="text-gray-500">Date</p><p className="text-white font-medium">{booking.date && format(booking.date, 'MMM d, yyyy')}</p></div>
                  <div><p className="text-gray-500">Time</p><p className="text-white font-medium">{booking.time?.label}</p></div>
                  <div><p className="text-gray-500">Duration</p><p className="text-white font-medium">{isFreeConsult ? '30 mins (Free)' : '60+ mins'}</p></div>
                </div>
              </div>
              <div className="space-y-5">
                <div>
                  <label className="text-sm text-gray-400 block mb-1.5">Full Name *</label>
                  <input type="text" value={booking.name} onChange={e => setBooking(b => ({ ...b, name: e.target.value }))} placeholder="Your full name"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-neon-red/50 transition-colors" />
                </div>
                <div>
                  <label className="text-sm text-gray-400 block mb-1.5">Email *</label>
                  <input type="email" value={booking.email} onChange={e => setBooking(b => ({ ...b, email: e.target.value }))} placeholder="your@email.com"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-neon-red/50 transition-colors" />
                </div>
                <div>
                  <label className="text-sm text-gray-400 block mb-1.5">Phone / LINE ID *</label>
                  <input type="tel" value={booking.phone} onChange={e => setBooking(b => ({ ...b, phone: e.target.value }))} placeholder="064-639-4795 or LINE ID"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-neon-red/50 transition-colors" />
                </div>
                {!isFreeConsult && (
                  <div>
                    <label className="text-sm text-gray-400 block mb-1.5">Service Type *</label>
                    <select value={booking.service} onChange={e => setBooking(b => ({ ...b, service: e.target.value }))}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-neon-red/50 transition-colors appearance-none">
                      <option value="" className="bg-dark">Select a service...</option>
                      {services.map(s => (
                        <option key={s.value} value={s.value} className="bg-dark">{s.label || s.name} — {s.price}</option>
                      ))}
                    </select>
                  </div>
                )}
                <div>
                  <label className="text-sm text-gray-400 block mb-1.5">{isFreeConsult ? 'Describe your tattoo idea' : 'Description / Notes'}</label>
                  <textarea value={booking.notes} onChange={e => setBooking(b => ({ ...b, notes: e.target.value }))}
                    placeholder={isFreeConsult ? 'Tell us about the tattoo you have in mind, placement, size, style preference...' : 'Describe your tattoo idea, placement, size, reference images...'}
                    rows={4}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-neon-red/50 transition-colors resize-none" />
                </div>
              </div>
              <div className="flex gap-3 mt-8">
                <button onClick={() => setStep(2)} className="flex-1 py-3 rounded-xl border border-white/10 text-gray-400 hover:bg-white/5 transition-colors">
                  <ChevronLeft className="w-4 h-4 mx-auto" />
                </button>
                <button
                  disabled={!booking.name || !booking.email || !booking.phone || (!isFreeConsult && !booking.service)}
                  onClick={() => {
                    if (skipPayment) { handleCompleteBooking() }
                    else { setStep(4) }
                  }}
                  className="flex-[3] py-3 rounded-xl bg-neon-red text-white font-semibold hover:bg-neon-red-light disabled:opacity-30 disabled:hover:bg-neon-red transition-all flex items-center justify-center gap-2"
                >
                  {skipPayment ? <><Check className="w-4 h-4" /> Confirm {isFreeConsult ? 'Consultation' : 'Booking'}</> : <>Continue to Payment <ChevronRight className="w-4 h-4" /></>}
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 4: Payment (tattoo booking only) */}
          {step === 4 && !isFreeConsult && (
            <motion.div key="s4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
              <h2 className="text-xl font-semibold text-white mb-6">Secure Payment</h2>
              <div className="p-5 rounded-xl border border-white/5 bg-white/[0.02] mb-6">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-gray-400">Booking deposit for {booking.artist?.name}</p>
                  <p className="text-2xl font-bold text-white">500 <span className="text-sm text-gray-500">THB</span></p>
                </div>
                <div className="text-xs text-gray-600">
                  {booking.date && format(booking.date, 'MMM d, yyyy')} at {booking.time?.label} • {services.find(s => s.value === booking.service)?.name}
                </div>
              </div>

              <div className="flex gap-3 mb-6">
                <button onClick={() => setPaymentMethod('card')}
                  className={`flex-1 py-3 rounded-xl border text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
                    paymentMethod === 'card' ? 'border-neon-red bg-neon-red/10 text-white' : 'border-white/5 text-gray-400 hover:border-white/10'
                  }`}>
                  <CreditCard className="w-4 h-4" /> Card
                </button>
                <button onClick={() => setPaymentMethod('promptpay')}
                  className={`flex-1 py-3 rounded-xl border text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
                    paymentMethod === 'promptpay' ? 'border-neon-red bg-neon-red/10 text-white' : 'border-white/5 text-gray-400 hover:border-white/10'
                  }`}>
                  <QrCode className="w-4 h-4" /> PromptPay
                </button>
                <button onClick={() => setPaymentMethod('cash')}
                  className={`flex-1 py-3 rounded-xl border text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
                    paymentMethod === 'cash' ? 'border-neon-red bg-neon-red/10 text-white' : 'border-white/5 text-gray-400 hover:border-white/10'
                  }`}>
                  <Banknote className="w-4 h-4" /> Cash
                </button>
              </div>

              <AnimatePresence mode="wait">
                {paymentMethod === 'card' ? (
                  <motion.div key="card" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
                    <div>
                      <label className="text-sm text-gray-400 block mb-1.5">Card Number</label>
                      <input type="text" value={cardForm.number} onChange={e => setCardForm(f => ({ ...f, number: formatCard(e.target.value) }))} placeholder="4242 4242 4242 4242" maxLength={19}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-neon-red/50 transition-colors font-mono tracking-wider" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm text-gray-400 block mb-1.5">Expiry</label>
                        <input type="text" value={cardForm.expiry} onChange={e => setCardForm(f => ({ ...f, expiry: formatExpiry(e.target.value) }))} placeholder="MM/YY" maxLength={5}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-neon-red/50 transition-colors font-mono" />
                      </div>
                      <div>
                        <label className="text-sm text-gray-400 block mb-1.5">CVV</label>
                        <input type="password" value={cardForm.cvv} onChange={e => setCardForm(f => ({ ...f, cvv: e.target.value.replace(/\D/g, '').slice(0, 4) }))} placeholder="•••" maxLength={4}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-neon-red/50 transition-colors font-mono" />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm text-gray-400 block mb-1.5">Name on Card</label>
                      <input type="text" value={cardForm.name} onChange={e => setCardForm(f => ({ ...f, name: e.target.value }))} placeholder="Full name"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-neon-red/50 transition-colors" />
                    </div>
                  </motion.div>
                ) : paymentMethod === 'promptpay' ? (
                  <motion.div key="promptpay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center py-8">
                    <div className="inline-block p-4 bg-white rounded-2xl mb-4">
                      <QrCode className="w-48 h-48 text-gray-800" />
                    </div>
                    <p className="text-gray-400 text-sm">Scan with your banking app to pay</p>
                    <p className="text-2xl font-bold text-white mt-2">500 THB</p>
                    <p className="text-gray-600 text-xs mt-1">PromptPay: {STUDIO.promptpayId}</p>
                    <p className="text-gray-600 text-xs">{STUDIO.promptpayPhone}</p>
                  </motion.div>
                ) : (
                  <motion.div key="cash" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center py-8">
                    <div className="w-20 h-20 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center mx-auto mb-4">
                      <Banknote className="w-10 h-10 text-green-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white">Pay at the Studio</h3>
                    <p className="text-gray-400 text-sm mt-2">No online payment needed. Pay 500 THB deposit in cash when you arrive for your appointment.</p>
                    <p className="text-2xl font-bold text-white mt-4">500 THB</p>
                    <p className="text-gray-600 text-xs mt-1">Cash only at studio</p>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex items-center justify-center gap-4 mt-6 text-gray-600 text-xs">
                <div className="flex items-center gap-1"><Lock className="w-3.5 h-3.5" /> SSL Encrypted</div>
                <div className="flex items-center gap-1"><Shield className="w-3.5 h-3.5" /> Secure Payment</div>
              </div>

              <div className="flex gap-3 mt-8">
                <button onClick={() => setStep(3)} className="flex-1 py-3 rounded-xl border border-white/10 text-gray-400 hover:bg-white/5 transition-colors">
                  <ChevronLeft className="w-4 h-4 mx-auto" />
                </button>
                <button
                  onClick={handleCompleteBooking}
                  disabled={paymentMethod === 'card' && (!cardForm.number || !cardForm.expiry || !cardForm.cvv)}
                  className="flex-[3] py-3 rounded-xl bg-neon-red text-white font-semibold hover:bg-neon-red-light disabled:opacity-30 disabled:hover:bg-neon-red transition-all flex items-center justify-center gap-2"
                >
                  <Lock className="w-4 h-4" /> {isCashPayment ? 'Confirm Booking (Cash)' : `Pay 500 THB & Confirm`}
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 5: Confirmation */}
          {step >= 4 && paymentDone && (
            <motion.div key="s5" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
              <div className="text-center py-8">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
                  className="w-20 h-20 rounded-full bg-green-500/10 border-2 border-green-500 flex items-center justify-center mx-auto mb-6">
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5, type: 'spring' }}>
                    <Check className="w-10 h-10 text-green-500" />
                  </motion.div>
                </motion.div>
                <motion.h2 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="text-2xl font-bold text-white">
                  {isFreeConsult ? 'Consultation Booked!' : 'Booking Confirmed!'}
                </motion.h2>
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }} className="text-gray-500 mt-2">
                  {isFreeConsult ? 'Your free 30-min consultation is confirmed' : 'Your deposit has been received'}
                </motion.p>
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 }}
                  className="mt-8 p-6 rounded-2xl border border-white/5 bg-white/[0.02] text-left max-w-md mx-auto">
                  <div className="text-center mb-4">
                    <p className="text-gray-500 text-xs uppercase tracking-wider">Booking Reference</p>
                    <p className="text-2xl font-mono font-bold text-neon-red mt-1">{reference}</p>
                  </div>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between"><span className="text-gray-500">Type</span><span className="text-white font-medium">{isFreeConsult ? 'Free Consultation (30 min)' : 'Tattoo Session'}</span></div>
                    <div className="flex justify-between"><span className="text-gray-500">Artist</span><span className="text-white font-medium">{booking.artist?.name}</span></div>
                    <div className="flex justify-between"><span className="text-gray-500">Date</span><span className="text-white font-medium">{booking.date && format(booking.date, 'EEEE, MMM d, yyyy')}</span></div>
                    <div className="flex justify-between"><span className="text-gray-500">Time</span><span className="text-white font-medium">{booking.time?.label}</span></div>
                    {!isFreeConsult && (
                      <div className="flex justify-between"><span className="text-gray-500">Service</span><span className="text-white font-medium">{services.find(s => s.value === booking.service)?.name}</span></div>
                    )}
                    <div className="flex justify-between"><span className="text-gray-500">Name</span><span className="text-white font-medium">{booking.name}</span></div>
                    <div className="flex justify-between"><span className="text-gray-500">Email</span><span className="text-white font-medium">{booking.email}</span></div>
                    <div className="border-t border-white/5 pt-3 flex justify-between">
                      <span className="text-gray-500">{isFreeConsult ? 'Fee' : 'Deposit Paid'}</span>
                      <span className="text-green-400 font-bold">{isFreeConsult ? 'Free ✓' : `${isCashPayment ? '500 THB (Cash at studio)' : '500 THB ✓'}`}</span>
                    </div>
                  </div>
                </motion.div>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} className="mt-8">
                  <p className="text-gray-600 text-sm mb-4">A confirmation email has been sent to {booking.email}</p>
                  <a href="/" className="inline-flex items-center gap-2 bg-neon-red hover:bg-neon-red-light text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300">
                    Back to Home
                  </a>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
