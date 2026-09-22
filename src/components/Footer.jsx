import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import FooterMap from './FooterMap';

function InstagramIcon({ size = 15 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function FacebookIcon({ size = 15 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function YoutubeIcon({ size = 15 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <polygon points="10 15 15 12 10 9 10 15" fill="currentColor" />
    </svg>
  );
}

function ThreadsIcon({ size = 15 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 12a7 7 0 1 0-7 7c2.5 0 4.2-1 5-2.5" />
      <circle cx="12" cy="12" r="3" />
      <path d="M16 8.5c-.8-1-2.2-1.5-4-1.5-3 0-5 2-5 5s2 5 5 5c2 0 3.5-.8 4.2-2.2" />
    </svg>
  );
}

function WhatsAppIcon({ size = 15 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  );
}

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4500);
    }
  };

  return (
    <footer className="bg-[#0D0E12] text-gray-300 border-t border-white/10 shadow-[0_-10px_30px_rgba(0,0,0,0.15)] relative z-10">
      
      {/* ═══════════════════════════════════════════
          1. TOP SUBSCRIBE STRIP (High Contrast Dark Slate)
      ═══════════════════════════════════════════ */}
      <div className="border-b border-white/10 bg-[#14161C]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-7 sm:py-9">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="max-w-md">
              <span className="text-base sm:text-lg font-black font-display tracking-tight text-white block">
                Subscribe to Our Atelier
              </span>
              <p className="text-xs sm:text-[13px] text-gray-400 mt-1 leading-relaxed">
                Receive prime wedding date openings, fine-art print guides & seasonal studio specials.
              </p>
            </div>

            {/* Subscribe Input Form */}
            <form onSubmit={handleSubscribe} className="flex items-center w-full md:w-auto max-w-md min-w-0">
              <div className="relative flex items-center w-full">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Write Email..."
                  required
                  className="w-full bg-[#1C1E26] border border-white/15 text-white text-xs sm:text-sm pl-4 pr-12 py-3 rounded-full outline-none focus:border-coral focus:ring-2 focus:ring-coral/20 shadow-xs transition-all placeholder:text-gray-500"
                />
                <button
                  type="submit"
                  aria-label="Submit newsletter subscription"
                  className="absolute right-1.5 w-8 h-8 rounded-full bg-coral hover:bg-coral-dark text-white flex items-center justify-center transition-transform active:scale-95 shadow-xs cursor-pointer"
                >
                  <ArrowRight size={14} />
                </button>
              </div>
            </form>
          </div>

          {subscribed && (
            <p className="text-xs font-semibold text-emerald-400 mt-2.5 animate-fade-in">
              ✓ Thank you for subscribing! We look forward to connecting with you.
            </p>
          )}
        </div>
      </div>

      {/* ═══════════════════════════════════════════
          2. MAIN MULTI-COLUMN CONTENT AREA (Rich Dark Palette)
      ═══════════════════════════════════════════ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 items-start">
          
          {/* Column 1: Brand Name, Slogan, Bio & Circular Socials (3 Cols) */}
          <div className="lg:col-span-3 space-y-4">
            <div className="flex items-center gap-3.5">
              <img
                src="/logo.png"
                alt="MY3 Studios Logo"
                className="w-12 h-12 sm:w-14 sm:h-14 object-contain filter drop-shadow-md rounded-full bg-white/5 p-1 border border-white/10"
              />
              <div>
                <h3 className="text-2xl font-black font-display tracking-tight text-white">
                  MY3 STUDIOS
                </h3>
                <p className="text-[11px] font-bold uppercase tracking-wider text-coral">
                  Cinematic Wedding &amp; Celebration Atelier
                </p>
              </div>
            </div>

            <div className="w-12 h-[2px] bg-coral/40" />

            <p className="text-xs sm:text-[13px] text-gray-400 leading-relaxed font-normal max-w-sm">
              Capturing sacred traditions, unscripted emotions, and cinematic wedding heirlooms across Nandyal, Kurnool, and South India.
            </p>

            {/* Circular Social Media Badges matching Reference (F, T, Y, T, W) */}
            <div className="pt-2">
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest block mb-3">
                Follow Us
              </span>
              <div className="flex items-center gap-2.5 flex-wrap">
                <a
                  href="https://www.instagram.com/mythri_studio_ndl"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-coral hover:text-white text-gray-300 flex items-center justify-center transition-all duration-200 border border-white/10 hover:scale-105"
                >
                  <InstagramIcon size={14} />
                </a>
                <a
                  href="https://www.facebook.com/profile.php?id=100071005435754"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-coral hover:text-white text-gray-300 flex items-center justify-center transition-all duration-200 border border-white/10 hover:scale-105"
                >
                  <FacebookIcon size={14} />
                </a>
                <a
                  href="https://youtube.com/@mythristudio8857?si=5szrcmSiVDF_36an"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-coral hover:text-white text-gray-300 flex items-center justify-center transition-all duration-200 border border-white/10 hover:scale-105"
                >
                  <YoutubeIcon size={14} />
                </a>
                <a
                  href="https://www.threads.net/@mythri_studio_ndl"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Threads"
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-coral hover:text-white text-gray-300 flex items-center justify-center transition-all duration-200 border border-white/10 hover:scale-105"
                >
                  <ThreadsIcon size={14} />
                </a>
                <a
                  href="https://wa.me/919949395037"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-coral hover:text-white text-gray-300 flex items-center justify-center transition-all duration-200 border border-white/10 hover:scale-105"
                >
                  <WhatsAppIcon size={14} />
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: About / Pages Menu (2 Cols) */}
          <div className="lg:col-span-2 space-y-3.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white font-display">
              About
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-400">
              <li>
                <Link to="/about" className="hover:text-white transition-colors">Who We Are</Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-white transition-colors">Curated Works</Link>
              </li>
              <li>
                <Link to="/pricing" className="hover:text-white transition-colors">Pricing &amp; Packages</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">Reserve Dates</Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-[#FFCE26] text-gray-300 font-semibold transition-colors flex items-center gap-1 mt-1">
                  <span>Admin Portal</span>
                  <span className="text-[9px] bg-white/10 px-1.5 py-0.2 rounded text-[#FFCE26]">Studio</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Services Menu (2 Cols) */}
          <div className="lg:col-span-2 space-y-3.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white font-display">
              Services
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-400">
              <li>
                <Link to="/services" className="hover:text-white transition-colors">Wedding Cinema</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition-colors">Candid Photography</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition-colors">Pre-Wedding Shoots</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition-colors">Luxury Lay-Flat Albums</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition-colors">Traditional Muhurtham</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition-colors">Cradle &amp; 1st Birthday</Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Info (2 Cols) */}
          <div className="lg:col-span-2 space-y-3.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white font-display">
              Contact
            </h4>
            <div className="space-y-3 text-xs text-gray-400">
              <div>
                <span className="font-semibold text-gray-200 block">Direct Call:</span>
                <a href="tel:+919949395037" className="hover:text-coral transition-colors block mt-0.5 text-gray-300">
                  +91 99493 95037
                </a>
                <a href="tel:+917780181436" className="hover:text-coral transition-colors block text-[11px] text-gray-400">
                  +91 77801 81436
                </a>
              </div>

              <div>
                <span className="font-semibold text-gray-200 block">Email:</span>
                <a
                  href="mailto:rmythristudiondl.anji@gmail.com"
                  className="hover:text-coral transition-colors block mt-0.5 truncate text-gray-300"
                  title="rmythristudiondl.anji@gmail.com"
                >
                  rmythristudiondl...
                </a>
              </div>

              <div>
                <span className="font-semibold text-gray-200 block">Studio Location:</span>
                <span className="block mt-0.5 text-gray-400 leading-snug">
                  Nivarthi Bhavan, Opp. National College, Srinivasa Nagar, Nandyal
                </span>
              </div>
            </div>
          </div>

          {/* Column 5: Studio Location Interactive Map (3 Cols) */}
          <div className="lg:col-span-3 space-y-3.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white font-display">
              Studio Location
            </h4>
            <FooterMap />
          </div>

        </div>
      </div>

      {/* ═══════════════════════════════════════════
          3. DARK BOTTOM COPYRIGHT BAR (High Contrast Midnight Strip)
      ═══════════════════════════════════════════ */}
      <div className="bg-[#07080A] text-gray-500 py-4 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          {/* Secondary Links on Left */}
          <div className="flex items-center gap-4 text-gray-400 text-[11px] font-medium flex-wrap">
            <Link to="/about" className="hover:text-white transition-colors">Privacy Policy</Link>
            <span className="text-gray-700">|</span>
            <Link to="/about" className="hover:text-white transition-colors">Our History</Link>
            <span className="text-gray-700">|</span>
            <Link to="/services" className="hover:text-white transition-colors">What We Do</Link>
            <span className="text-gray-700">|</span>
            <Link to="/contact" className="hover:text-white transition-colors">Terms &amp; Conditions</Link>
          </div>

          {/* Copyright Notice on Right */}
          <p className="text-[11px] text-gray-500 font-normal">
            &copy; {currentYear} MY3 Studios. All images &amp; films are protected.
          </p>
        </div>
      </div>

    </footer>
  );
}
