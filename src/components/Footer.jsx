import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';

function InstagramIcon({ size = 16, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function FacebookIcon({ size = 16, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function YoutubeIcon({ size = 16, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <polygon points="10 15 15 12 10 9 10 15" fill="currentColor" />
    </svg>
  );
}

function ThreadsIcon({ size = 16, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M19 12a7 7 0 1 0-7 7c2.5 0 4.2-1 5-2.5" />
      <circle cx="12" cy="12" r="3" />
      <path d="M16 8.5c-.8-1-2.2-1.5-4-1.5-3 0-5 2-5 5s2 5 5 5c2 0 3.5-.8 4.2-2.2" />
    </svg>
  );
}

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0A0A0C] text-gray-300 pt-16 pb-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 mb-12">
          
          {/* Column 1: Studio Brand & Profile */}
          <div className="md:col-span-4 lg:col-span-5 space-y-4">
            <div>
              <h3 className="font-serif tracking-[0.2em] text-xl sm:text-2xl uppercase text-[#D4A373] font-bold">
                MY3 STUDIO
              </h3>
              <span className="text-[10px] tracking-[0.25em] uppercase text-[#C49B71] block mt-1.5 font-mono font-semibold">
                FINE ART WEDDING & PORTRAIT STUDIO
              </span>
            </div>
            <p className="text-xs sm:text-[13px] text-gray-400 font-light leading-relaxed max-w-md pt-2">
              Capturing iconic love stories, high fashion editorial portraiture, and luxury destination celebrations across Nandyal and South India.
            </p>
          </div>

          {/* Column 2: Studio Enquiries & Location */}
          <div className="md:col-span-4 lg:col-span-4 space-y-4">
            <h4 className="text-[11px] font-mono tracking-[0.25em] text-[#C49B71] uppercase font-bold mb-4">
              STUDIO ENQUIRIES
            </h4>
            <div className="space-y-3.5 text-xs text-gray-300">
              {/* Email */}
              <div className="flex items-center gap-2.5">
                <Mail size={14} className="text-[#C49B71] shrink-0" />
                <a
                  href="mailto:rmythristudiondl.anji@gmail.com"
                  className="hover:text-white transition-colors"
                >
                  rmythristudiondl.anji@gmail.com
                </a>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-2.5">
                <Phone size={14} className="text-[#C49B71] shrink-0" />
                <a
                  href="tel:+919949395037"
                  className="hover:text-white transition-colors"
                >
                  +91 99493 95037
                </a>
                <span className="text-gray-600">/</span>
                <a
                  href="tel:+917780181436"
                  className="hover:text-white transition-colors"
                >
                  +91 77801 81436
                </a>
              </div>

              {/* Location */}
              <div className="flex items-start gap-2.5 pt-1">
                <MapPin size={14} className="text-[#C49B71] shrink-0 mt-0.5" />
                <a
                  href="https://maps.app.goo.gl/qDx9ZJLWEVtMp7Uv5"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors leading-relaxed text-gray-400 hover:underline"
                >
                  Shop No 02, 1st Floor, Nivarthi Bhavan,<br />
                  Opp. National College, Srinivasa Nagar,<br />
                  Nandyala, Andhra Pradesh 518501
                </a>
              </div>
            </div>
          </div>

          {/* Column 3: Connect With Us (Social Cards matching pattern) */}
          <div className="md:col-span-4 lg:col-span-3 space-y-3">
            <h4 className="text-[11px] font-mono tracking-[0.25em] text-[#C49B71] uppercase font-bold mb-4">
              CONNECT WITH US
            </h4>
            <div className="space-y-2.5">
              {/* Instagram Card */}
              <a
                href="https://www.instagram.com/mythri_studio_ndl"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3.5 p-3 rounded-xl bg-[#141416] border border-white/5 hover:border-[#C49B71]/40 hover:bg-[#18181B] transition-all group shadow-xs"
              >
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-gray-300 group-hover:text-[#D4A373] transition-colors shrink-0">
                  <InstagramIcon size={16} />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-xs font-bold text-white block">Instagram</span>
                  <span className="text-[11px] text-gray-500 font-mono block truncate">
                    @mythri_studio_ndl
                  </span>
                </div>
              </a>

              {/* Facebook Card */}
              <a
                href="https://www.facebook.com/profile.php?id=100071005435754"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3.5 p-3 rounded-xl bg-[#141416] border border-white/5 hover:border-[#C49B71]/40 hover:bg-[#18181B] transition-all group shadow-xs"
              >
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-gray-300 group-hover:text-[#D4A373] transition-colors shrink-0">
                  <FacebookIcon size={16} />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-xs font-bold text-white block">Facebook</span>
                  <span className="text-[11px] text-gray-500 font-mono block truncate">
                    Mythri Studio Nandyal
                  </span>
                </div>
              </a>

              {/* YouTube Card */}
              <a
                href="https://youtube.com/@mythristudio8857?si=5szrcmSiVDF_36an"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3.5 p-3 rounded-xl bg-[#141416] border border-white/5 hover:border-[#C49B71]/40 hover:bg-[#18181B] transition-all group shadow-xs"
              >
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-gray-300 group-hover:text-[#D4A373] transition-colors shrink-0">
                  <YoutubeIcon size={16} />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-xs font-bold text-white block">YouTube</span>
                  <span className="text-[11px] text-gray-500 font-mono block truncate">
                    @mythristudio8857
                  </span>
                </div>
              </a>

              {/* Threads Card */}
              <a
                href="https://www.threads.net/@mythri_studio_ndl"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3.5 p-3 rounded-xl bg-[#141416] border border-white/5 hover:border-[#C49B71]/40 hover:bg-[#18181B] transition-all group shadow-xs"
              >
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-gray-300 group-hover:text-[#D4A373] transition-colors shrink-0">
                  <ThreadsIcon size={16} />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-xs font-bold text-white block">Threads</span>
                  <span className="text-[11px] text-gray-500 font-mono block truncate">
                    @mythri_studio_ndl
                  </span>
                </div>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Quick Links */}
        <div className="border-t border-white/10 pt-8 mt-12 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <p>© {currentYear} MY3 Studio. All Rights Reserved. Fine Art Wedding & Celebration Atelier.</p>
          <div className="flex items-center gap-6">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <Link to="/gallery" className="hover:text-white transition-colors">Gallery</Link>
            <Link to="/pricing" className="hover:text-white transition-colors">Pricing</Link>
            <Link to="/about" className="hover:text-white transition-colors">About</Link>
            <Link to="/contact" className="hover:text-white transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
