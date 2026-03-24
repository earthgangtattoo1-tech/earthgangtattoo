// ============================================
// 🔥 EARTH GANG TATTOO — SITE CONFIGURATION
// ============================================
// Change everything about your studio here.
// All pages read from this file — edit once, done.
// ============================================

const config = {
  // --- Studio Info ---
  studio: {
    name: "Earth Gang Tattoo",
    tagline: "Bangkok's Premier Tattoo Studio",
    description: "Where art meets innovation",
    phone: "+66 2 123 4567",
    email: "hello@earthgangtattoo.com",
    address: "123 Sukhumvit Road, Soi 11\nKhlong Toei, Bangkok 10110",
    bts: "5 min walk from Nana BTS Station",
    hours: [
      { day: "Mon - Fri", time: "11:00 AM - 9:00 PM" },
      { day: "Sat - Sun", time: "10:00 AM - 10:00 PM" },
    ],
  },

  // ============================================
  // 👤 ARTISTS — Change names, styles, colors here
  // ============================================
  artists: [
    {
      id: "aom",                   // internal id (lowercase, no spaces)
      name: "Aom",                 // ← Artist display name
      specialty: "Fine Line & Realism",
      description:
        "Known for incredibly delicate fine line work and photorealistic portraits that capture every detail with surgical precision.",
      gradient: "from-rose-900/40 to-pink-900/20",   // card background gradient
      initials: "A",                                // letter shown on card
    },
    {
      id: "kai",
      name: "Kai",
      specialty: "Traditional & Neo-Traditional",
      description:
        "Brings bold, vibrant traditional tattoos into the modern era with neo-traditional flair and masterful color work.",
      gradient: "from-red-900/40 to-orange-900/20",
      initials: "K",
    },
    {
      id: "mink",
      name: "Mink",
      specialty: "Watercolor & Illustrative",
      description:
        "Creates breathtaking watercolor tattoos that flow like liquid art on skin, blending colors in ways that seem almost magical.",
      gradient: "from-violet-900/40 to-blue-900/20",
      initials: "M",
    },
  ],

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

  deposit: 500, // THB — booking deposit amount

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
      text: "An amazing neo-traditional piece on my forearm. The studio is spotless, the vibe is great, and the attention to detail is next level. Best tattoo experience in Bangkok, hands down.",
      rating: 5,
    },
    {
      name: "Yuki T.",
      location: "Japan",
      text: "The watercolor work is absolutely stunning. My vague idea was turned into something far beyond my expectations. The AI consultation feature helped me nail down the design before I even arrived!",
      rating: 5,
    },
  ],

  // ============================================
  // 🖼️ GALLERY ITEMS
  // ============================================
  galleryCategories: [
    "All", "Fine Line", "Traditional", "Watercolor", "Realism",
    "Neo-Traditional", "Geometric", "Illustrative", "Japanese",
  ],

  galleryItems: [
    { category: "Fine Line", label: "Delicate Rose", gradient: "from-rose-900/60 to-pink-800/30", size: "small" },
    { category: "Traditional", label: "Classic Anchor", gradient: "from-red-900/60 to-orange-800/30", size: "small" },
    { category: "Watercolor", label: "Abstract Wave", gradient: "from-blue-900/60 to-cyan-800/30", size: "large" },
    { category: "Realism", label: "Portrait Study", gradient: "from-gray-800/60 to-gray-700/30", size: "small" },
    { category: "Neo-Traditional", label: "Tiger Flash", gradient: "from-amber-900/60 to-yellow-800/30", size: "small" },
    { category: "Fine Line", label: "Butterfly Wing", gradient: "from-violet-900/60 to-purple-800/30", size: "small" },
    { category: "Geometric", label: "Sacred Geometry", gradient: "from-teal-900/60 to-emerald-800/30", size: "large" },
    { category: "Japanese", label: "Koi Dragon", gradient: "from-sky-900/60 to-blue-800/30", size: "small" },
    { category: "Watercolor", label: "Galaxy Sleeve", gradient: "from-indigo-900/60 to-violet-800/30", size: "small" },
    { category: "Illustrative", label: "Storybook Scene", gradient: "from-fuchsia-900/60 to-pink-800/30", size: "small" },
    { category: "Traditional", label: "Dagger & Heart", gradient: "from-red-900/60 to-rose-800/30", size: "small" },
    { category: "Realism", label: "Cherry Blossom", gradient: "from-pink-900/60 to-rose-800/30", size: "large" },
    { category: "Fine Line", label: "Moon Phase", gradient: "from-slate-800/60 to-zinc-700/30", size: "small" },
    { category: "Neo-Traditional", label: "Snake & Rose", gradient: "from-green-900/60 to-lime-800/30", size: "small" },
    { category: "Japanese", label: "Cherry Wave", gradient: "from-sky-900/60 to-indigo-800/30", size: "small" },
  ],
}

export default config
