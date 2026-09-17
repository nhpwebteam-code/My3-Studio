import React from 'react';
import { Link } from 'react-router-dom';
import { Camera, Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';
import { studioConfig } from '../data/studioConfig';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-studio-950 border-t border-studio-800 text-studio-400 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Col 1: Studio Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-lg bg-studio-900 border border-studio-700 flex items-center justify-center text-gold">
                <Camera size={18} />
              </div>
              <span className="font-serif text-xl font-bold tracking-wider text-studio-50">
                MYTHRI STUDIOS
              </span>
            </div>
            <p className="text-sm leading-relaxed text-studio-400">
              {studioConfig.shortBio}
            </p>
            <div className="flex items-center gap-3 pt-2">
              {studioConfig.socials.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1 rounded bg-studio-900 hover:bg-studio-800 border border-studio-800 text-xs text-studio-300 hover:text-gold transition-colors"
                >
                  {social.name}
                </a>
              ))}
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="font-serif text-studio-100 text-base font-semibold mb-4 tracking-wider uppercase text-xs text-gold">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              {studioConfig.navigation.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="hover:text-gold transition-colors inline-block"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Studio Location & Hours */}
          <div>
            <h4 className="font-serif text-studio-100 text-base font-semibold mb-4 tracking-wider uppercase text-xs text-gold">
              Studio & Atelier
            </h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2.5">
                <MapPin size={16} className="text-gold shrink-0 mt-0.5" />
                <span>
                  {studioConfig.contact.address.street},<br />
                  {studioConfig.contact.address.city}, {studioConfig.contact.address.state}
                </span>
              </div>
              <div className="pt-2">
                <p className="text-xs text-studio-300 font-medium uppercase tracking-wider mb-1">
                  Atelier Hours
                </p>
                {studioConfig.contact.hours.slice(0, 2).map((h, i) => (
                  <p key={i} className="text-xs text-studio-400">
                    <span className="text-studio-300">{h.days}:</span> {h.time}
                  </p>
                ))}
              </div>
            </div>
          </div>

          {/* Col 4: Direct Inquiries */}
          <div>
            <h4 className="font-serif text-studio-100 text-base font-semibold mb-4 tracking-wider uppercase text-xs text-gold">
              Direct Inquiries
            </h4>
            <div className="space-y-3 text-sm mb-5">
              <a
                href={`mailto:${studioConfig.contact.email}`}
                className="flex items-center gap-2 hover:text-gold transition-colors"
              >
                <Mail size={16} className="text-gold shrink-0" />
                <span className="truncate">{studioConfig.contact.email}</span>
              </a>
              <a
                href={`tel:${studioConfig.contact.phone}`}
                className="flex items-center gap-2 hover:text-gold transition-colors"
              >
                <Phone size={16} className="text-gold shrink-0" />
                <span>{studioConfig.contact.phoneDisplay}</span>
              </a>
            </div>
            <Link
              to="/contact"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-gold hover:text-gold-light uppercase tracking-wider group"
            >
              <span>Request Private Consultation</span>
              <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-studio-900/80 flex flex-col sm:flex-row items-center justify-between text-xs text-studio-500 gap-4">
          <p>© {currentYear} {studioConfig.name}. All rights reserved.</p>
          <p className="tracking-wide">
            Designed for timeless visual storytelling.
          </p>
        </div>
      </div>
    </footer>
  );
}
