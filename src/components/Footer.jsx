import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';
import { studioConfig } from '../data/studioConfig';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0E0F12] text-gray-300 pt-16 pb-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Col 1: Studio Brand */}
          <div className="space-y-4">
            <div className="flex flex-col space-y-2">
              <img
                src="/logo.png"
                alt="MY3 Studio Logo"
                className="h-16 sm:h-20 w-auto object-contain self-start filter drop-shadow-md"
              />
              <div>
                <span className="font-display text-lg font-black tracking-widest text-white block">
                  MY3 STUDIO
                </span>
                <span className="text-[10px] tracking-widest text-coral uppercase font-bold -mt-0.5 block">
                  Photography Atelier
                </span>
              </div>
            </div>
            <p className="text-xs sm:text-sm leading-relaxed text-gray-400 font-normal">
              Preserving authentic human narrative, light poetry, and celebration stories through fine art photography and 4K cinematography.
            </p>
            <div className="flex items-center gap-2 pt-2">
              {['Instagram', 'Pinterest', 'Vimeo', 'Behance'].map((name) => (
                <a
                  key={name}
                  href="#"
                  className="px-3 py-1 rounded-full bg-white/5 border border-white/10 hover:bg-coral hover:text-white hover:border-coral text-xs text-gray-300 transition-all font-semibold shadow-sm"
                >
                  {name}
                </a>
              ))}
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="text-white text-xs font-bold mb-4 tracking-widest uppercase">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm font-medium">
              {[
                { label: 'Home', path: '/' },
                { label: 'About Us', path: '/about' },
                { label: 'Pricing & Packages', path: '/pricing' },
                { label: 'Portfolio Gallery', path: '/gallery' },
                { label: 'FAQ', path: '/pricing' },
                { label: 'Contact & Booking', path: '/contact' },
              ].map((item, idx) => (
                <li key={idx}>
                  <Link to={item.path} className="text-gray-400 hover:text-coral transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Studio Location & Hours */}
          <div>
            <h4 className="text-white text-xs font-bold mb-4 tracking-widest uppercase">
              Studio & Atelier
            </h4>
            <div className="space-y-3 text-xs sm:text-sm">
              <div className="flex items-start gap-2.5">
                <MapPin size={16} className="text-coral shrink-0 mt-0.5" />
                <span className="text-gray-300">
                  42 Heritage Boulevard, Art Quarter,<br />
                  Bengaluru, KA 560001
                </span>
              </div>
              <div className="pt-2 text-xs">
                <p className="text-white font-semibold uppercase tracking-wider mb-1">
                  Atelier Hours
                </p>
                <p className="text-gray-400">Tuesday – Saturday: 10:00 AM – 7:00 PM</p>
                <p className="text-gray-400">Sunday: By Prior Appointment</p>
              </div>
            </div>
          </div>

          {/* Col 4: Direct Inquiries */}
          <div>
            <h4 className="text-white text-xs font-bold mb-4 tracking-widest uppercase">
              Direct Inquiries
            </h4>
            <div className="space-y-3 text-xs sm:text-sm mb-5">
              <a
                href={`mailto:${studioConfig.contact.email}`}
                className="flex items-center gap-2 hover:text-coral transition-colors text-gray-300"
              >
                <Mail size={16} className="text-coral shrink-0" />
                <span className="truncate">{studioConfig.contact.email}</span>
              </a>
              <a
                href={`tel:${studioConfig.contact.phone}`}
                className="flex items-center gap-2 hover:text-coral transition-colors text-gray-300"
              >
                <Phone size={16} className="text-coral shrink-0" />
                <span>{studioConfig.contact.phoneDisplay}</span>
              </a>
            </div>
            <Link
              to="/contact"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-coral hover:text-white uppercase tracking-wider group transition-colors"
            >
              <span>Schedule Atelier Consultation</span>
              <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <p>© {currentYear} MY3 Photography Studio. All rights reserved.</p>
          <p className="tracking-wide text-gray-400">
            Editorial Photography & Fine Art Visuals.
          </p>
        </div>
      </div>
    </footer>
  );
}
