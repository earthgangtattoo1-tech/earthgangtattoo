import { MapPin, Clock, Phone, Camera, Mail, Flame } from 'lucide-react'
import { Link } from 'react-router-dom'
import config, { STUDIO } from '../config'

const { studio } = config

export default function Footer() {
  return (
    <footer className="bg-dark-light border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Flame className="w-6 h-6 text-neon-red" />
              <div className="flex flex-col leading-none">
                <span className="text-lg font-black tracking-wider text-white">EARTH GANG</span>
                <span className="text-[10px] font-light tracking-[0.3em] text-neon-red uppercase">Tattoo</span>
              </div>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed mt-4">
              {studio.tagline}, {studio.description.toLowerCase()}.
            </p>
            <div className="flex gap-3 mt-6">
              <a href="#" className="w-10 h-10 rounded-lg bg-white/5 hover:bg-neon-red/20 hover:text-neon-red flex items-center justify-center text-gray-500 transition-all duration-300">
                <Camera className="w-4 h-4" />
              </a>
              <a href={`tel:${STUDIO.phoneRaw}`} className="w-10 h-10 rounded-lg bg-white/5 hover:bg-neon-red/20 hover:text-neon-red flex items-center justify-center text-gray-500 transition-all duration-300">
                <Phone className="w-4 h-4" />
              </a>
              <a href={`mailto:${STUDIO.email}`} className="w-10 h-10 rounded-lg bg-white/5 hover:bg-neon-red/20 hover:text-neon-red flex items-center justify-center text-gray-500 transition-all duration-300">
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { to: '/', label: 'Home' },
                { to: '/booking', label: 'Book Now' },
                { to: '/gallery', label: 'Gallery' },
                { to: '/consult', label: 'AI Consult' },
                { to: '/faq', label: 'FAQ' },
              ].map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-gray-500 hover:text-neon-red text-sm transition-colors duration-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Studio Info */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Visit Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-neon-red mt-0.5 shrink-0" />
                <span className="text-gray-500 text-sm">{STUDIO.address}</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-neon-red mt-0.5 shrink-0" />
                <span className="text-gray-500 text-sm">{STUDIO.phone}</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-neon-red mt-0.5 shrink-0" />
                <span className="text-gray-500 text-sm">{STUDIO.email}</span>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Hours</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-neon-red shrink-0" />
                <div className="text-sm">
                  <p className="text-gray-400">{STUDIO.hoursNote}</p>
                  <p className="text-gray-500">{STUDIO.hours}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/5 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-xs">
            © 2026 {studio.name}. All rights reserved.
          </p>
          <p className="text-gray-700 text-xs">
            Designed with 🔥 in Chiang Mai
          </p>
        </div>
      </div>
    </footer>
  )
}
