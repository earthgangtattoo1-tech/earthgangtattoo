// ============================================
// 🔥 EARTH GANG TATTOO — SITE CONFIGURATION
// ============================================
// Change everything about your studio here.
// All pages read from this file — edit once, done.
// ============================================

export const STUDIO = {
  name: 'Earth Gang Tattoo',
  address: '141/3 ถ.กำแพงดิน ต.หายยา อ.เมือง จ.เชียงใหม่ 50100',
  addressShort: 'Chiang Mai, Thailand',
  phone: '064-639-4795',
  phoneRaw: '0646394795',
  email: 'earthgangtattoo@gmail.com',
  hours: '10:00 AM - 10:00 PM',
  hoursNote: 'Open Daily',
  deposit: 500,
  currency: 'THB',
  ceo: 'Nont',
  promptpayId: 'Panyanon Viradecha',
  promptpayPhone: '0646394795',
  promptpayQr: '00020101021226210014COM.GOOGLE.PAY01130066646394795021Panyanon Viradecha5204581353037645405300.006304',
  artists: [
    { id: 'toon', name: 'TOON', specialty: 'TRADITIONAL · JAPANESE · THAI · COLOR · ANIMALS · LARGESCALE', gradient: 'from-rose-900/40 to-pink-900/20', initials: 'T', description: 'Known for bold traditional work, Japanese Irezumi, Thai-inspired designs, vibrant color work, and large-scale pieces with meticulous detail.' },
    { id: 'ronnie', name: 'RONNIE', specialty: 'BLACKWORK · FINELINE · ANIME · FONT · GEOMETRIC · MINIMAL · CYBERSIGILISM', gradient: 'from-red-900/40 to-orange-900/20', initials: 'R', description: 'Specializes in precise blackwork, delicate fineline, anime illustrations, custom typography, geometric patterns, minimal designs, and cutting-edge cybersigilism.' },
  ],
}

const config = {
  // --- Studio Info ---
  studio: {
    name: STUDIO.name,
    tagline: "Chiang Mai's Premier Tattoo Studio",
    description: "Where art meets innovation",
    phone: STUDIO.phone,
    email: STUDIO.email,
    address: STUDIO.address,
    hours: STUDIO.hours,
    hoursNote: STUDIO.hoursNote,
    ceo: STUDIO.ceo,
  },

  // ============================================
  // 👤 ARTISTS — Change names, styles, colors here
  // ============================================
  artists: STUDIO.artists,

  // ============================================
  // 💰 SERVICES & PRICING
  // ============================================
  services: [
    { name: "Small Tattoo", size: "2-3 inches", price: "From 2,000 THB", icon: "✨", value: "small", priceNum: 2000 },
    { name: "Medium Tattoo", size: "4-6 inches", price: "From 5,000 THB", icon: "🎨", value: "medium", priceNum: 5000 },
    { name: "Large Tattoo", size: "7-10 inches", price: "From 10,000 THB", icon: "🔥", value: "large", priceNum: 10000 },
    { name: "Cover-Up", size: "Various", price: "From 4,000 THB", icon: "💫", value: "coverup", priceNum: 4000 },
    { name: "Full Sleeve", size: "Full arm", price: "From 30,000 THB", icon: "⚡", value: "sleeve", priceNum: 30000 },
    { name: "Touch-Up", size: "Existing work", price: "From 500 THB", icon: "✅", value: "touchup", priceNum: 500 },
  ],

  deposit: STUDIO.deposit, // THB — booking deposit amount

  // ============================================
  // ⭐ TESTIMONIALS
  // ============================================
  testimonials: [
    {
      name: "Sarah M.",
      location: "Australia",
      text: "Absolutely incredible experience at Earth Gang. The fine line work is beyond anything I've seen. My tattoo healed perfectly and I've received so many compliments. Will definitely be back!",
      rating: 5,
    },
    {
      name: "James L.",
      location: "United Kingdom",
      text: "An amazing neo-traditional piece on my forearm. The studio is spotless, the vibe is great, and the attention to detail is next level. Best tattoo experience in Chiang Mai, hands down.",
      rating: 5,
    },
    {
      name: "Yuki T.",
      location: "Japan",
      text: "The work is absolutely stunning. My vague idea was turned into something far beyond my expectations. The AI consultation feature helped me nail down the design before I even arrived!",
      rating: 5,
    },
  ],

  // ============================================
  // 🖼️ GALLERY ITEMS
  // ============================================
  galleryCategories: [
    "All", "Fine Line", "Traditional", "Realism",
    "Neo-Traditional", "Geometric", "Japanese",
  ],

  galleryItems: [
    { category: "Fine Line", label: "Delicate Rose", image: "https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?w=400&h=400&fit=crop", size: "small" },
    { category: "Traditional", label: "Classic Anchor", image: "https://images.unsplash.com/photo-1590246815117-c0728ef83a4b?w=400&h=400&fit=crop", size: "small" },
    { category: "Realism", label: "Portrait Study", image: "https://images.unsplash.com/photo-1568515045052-f9a854d70bfd?w=400&h=400&fit=crop", size: "large" },
    { category: "Neo-Traditional", label: "Tiger Flash", image: "https://images.unsplash.com/photo-1542556398-95fb5b9f9309?w=400&h=400&fit=crop", size: "small" },
    { category: "Fine Line", label: "Butterfly Wing", image: "https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?w=500&h=500&fit=crop", size: "small" },
    { category: "Geometric", label: "Sacred Geometry", image: "https://images.unsplash.com/photo-1590246815117-c0728ef83a4b?w=500&h=500&fit=crop", size: "large" },
    { category: "Japanese", label: "Koi Dragon", image: "https://images.unsplash.com/photo-1568515045052-f9a854d70bfd?w=500&h=500&fit=crop", size: "small" },
    { category: "Neo-Traditional", label: "Snake & Rose", image: "https://images.unsplash.com/photo-1542556398-95fb5b9f9309?w=500&h=500&fit=crop", size: "small" },
    { category: "Traditional", label: "Dagger & Heart", image: "https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?w=600&h=600&fit=crop", size: "small" },
    { category: "Realism", label: "Cherry Blossom", image: "https://images.unsplash.com/photo-1590246815117-c0728ef83a4b?w=600&h=600&fit=crop", size: "large" },
    { category: "Fine Line", label: "Moon Phase", image: "https://images.unsplash.com/photo-1568515045052-f9a854d70bfd?w=600&h=600&fit=crop", size: "small" },
    { category: "Japanese", label: "Cherry Wave", image: "https://images.unsplash.com/photo-1542556398-95fb5b9f9309?w=600&h=600&fit=crop", size: "small" },
  ],
}

export default config
