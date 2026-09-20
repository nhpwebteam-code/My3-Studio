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
              <a
                href="https://www.instagram.com/mythri_studio_ndl"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1 rounded-full bg-white/5 border border-white/10 hover:bg-coral hover:text-white hover:border-coral text-xs text-gray-300 transition-all font-semibold shadow-sm"
              >
                Instagram
              </a>
              <a
                href="https://maps.app.goo.gl/qDx9ZJLWEVtMp7Uv5"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1 rounded-full bg-white/5 border border-white/10 hover:bg-coral hover:text-white hover:border-coral text-xs text-gray-300 transition-all font-semibold shadow-sm"
              >
                Google Maps
              </a>
              <a
                href="https://wa.me/919949395037"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1 rounded-full bg-white/5 border border-white/10 hover:bg-coral hover:text-white hover:border-coral text-xs text-gray-300 transition-all font-semibold shadow-sm"
              >
                WhatsApp
              </a>
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
                { label: 'Our Services', path: '/services' },
                { label: 'Pricing & Packages', path: '/pricing' },
                { label: 'Portfolio Gallery', path: '/gallery' },
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
              Studio Location
            </h4>
            <div className="space-y-3 text-xs sm:text-sm">
              <a
                href="https://maps.app.goo.gl/qDx9ZJLWEVtMp7Uv5"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2.5 group hover:text-white transition-colors"
              >
                <MapPin size={16} className="text-coral shrink-0 mt-0.5" />
                <span className="text-gray-300 group-hover:text-white">
                  Shop No 02, 1st Floor, Nivarthi Bhavan,<br />
                  Opp. National College, Srinivasa Nagar,<br />
                  Nandyala, Andhra Pradesh 518501
                </span>
              </a>
              <div className="pt-2 text-xs">
                <p className="text-white font-semibold uppercase tracking-wider mb-1">
                  Studio Hours
                </p>
                <p className="text-gray-400">Monday – Saturday: 9:30 AM – 8:30 PM</p>
                <p className="text-gray-400">Sunday: 10:00 AM – 6:00 PM (Shoots)</p>
              </div>
            </div>
          </div>

          {/* Col 4: Direct Inquiries */}
          <div>
            <h4 className="text-white text-xs font-bold mb-4 tracking-widest uppercase">
              Direct Inquiries
            </h4>
            <div className="space-y-3 text-xs sm:text-sm mb-5">
              <div className="text-xs text-gray-400">
                <span className="text-white font-bold block">Contact Person: Anji</span>
              </div>
              <a
                href="tel:+919949395037"
                className="flex items-center gap-2 hover:text-coral transition-colors text-gray-300"
              >
                <Phone size={16} className="text-coral shrink-0" />
                <span>+91 99493 95037 (Anji)</span>
              </a>
              <a
                href="tel:+917780181436"
                className="flex items-center gap-2 hover:text-coral transition-colors text-gray-300"
              >
                <Phone size={16} className="text-coral shrink-0" />
                <span>+91 77801 81436 (Desk)</span>
              </a>
              <a
                href="mailto:mythristudiondl@gmail.com"
                className="flex items-center gap-2 hover:text-coral transition-colors text-gray-300"
              >
                <Mail size={16} className="text-coral shrink-0" />
                <span className="truncate">mythristudiondl@gmail.com</span>
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
