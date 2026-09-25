import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight, Phone, Mail, MapPin } from 'lucide-react';
import { studioConfig } from '../data/studioConfig';

export default function Navbar({ onOpenBooking }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (target) => {
    setIsDrawerOpen(false);
    if (target.startsWith('#')) {
      const el = document.querySelector(target);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 bg-black/95 backdrop-blur-md transition-all duration-300 border-b border-white/10 ${
          isScrolled ? 'py-1.5 sm:py-2 shadow-lg shadow-black/60' : 'py-2 sm:py-3'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 flex items-center justify-between">
          
          {/* Left: Circular Menu Button & Left Symmetrical Links */}
          <div className="flex items-center space-x-6 sm:space-x-8">
            {/* Dark Circular Hamburger Menu Button with Gold Border */}
            <button
              id="main-menu-btn"
              onClick={() => setIsDrawerOpen(true)}
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-black border border-[#E59A3D] hover:bg-[#E59A3D] text-white hover:text-black flex items-center justify-center transition-all duration-200 active:scale-95 shadow-sm group"
              aria-label="Open Navigation Menu"
            >
              <Menu size={19} className="group-hover:scale-110 transition-transform" />
            </button>

            {/* Desktop Left Nav Links: Home, Gallery, Pricing */}
            <nav className="hidden md:flex items-center space-x-6 sm:space-x-7">
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  `text-xs lg:text-sm font-bold uppercase tracking-wider transition-all relative ${
                    isActive
                      ? 'text-[#E59A3D] after:content-[""] after:absolute after:-bottom-1.5 after:left-0 after:right-0 after:h-[2px] after:bg-[#E59A3D]'
                      : 'text-gray-300 hover:text-[#E59A3D]'
                  }`
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/gallery"
                className={({ isActive }) =>
                  `text-xs lg:text-sm font-bold uppercase tracking-wider transition-colors ${
                    isActive ? 'text-[#E59A3D]' : 'text-gray-300 hover:text-[#E59A3D]'
                  }`
                }
              >
                Gallery
              </NavLink>
              <NavLink
                to="/pricing"
                className={({ isActive }) =>
                  `text-xs lg:text-sm font-bold uppercase tracking-wider transition-colors ${
                    isActive ? 'text-[#E59A3D]' : 'text-gray-300 hover:text-[#E59A3D]'
                  }`
                }
              >
                Pricing
              </NavLink>
            </nav>
          </div>

          {/* Center: Brand Logo - Prominent, Large & Clearly Visible */}
          <div className="flex-1 flex justify-center px-2 sm:px-4">
            <Link
              to="/"
              className="flex items-center justify-center py-1 group"
              aria-label="MY3 Studios Home"
            >
              <img
                src="/logo.png"
                alt="MY3 Studios Logo"
                className={`w-auto object-contain transition-all duration-300 group-hover:scale-105 filter drop-shadow-md ${
                  isScrolled
                    ? 'h-12 sm:h-14 md:h-16 max-h-[64px]'
                    : 'h-14 sm:h-16 md:h-20 lg:h-22 max-h-[88px]'
                }`}
              />
            </Link>
          </div>

          {/* Right: Symmetrical Links: Services, About, Contact */}
          <div className="flex items-center space-x-6 sm:space-x-8">
            <nav className="hidden md:flex items-center space-x-6 sm:space-x-7">
              <NavLink
                to="/services"
                className={({ isActive }) =>
                  `text-xs lg:text-sm font-bold uppercase tracking-wider transition-colors ${
                    isActive ? 'text-[#E59A3D]' : 'text-gray-300 hover:text-[#E59A3D]'
                  }`
                }
              >
                Services
              </NavLink>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `text-xs lg:text-sm font-bold uppercase tracking-wider transition-colors ${
                    isActive ? 'text-[#E59A3D]' : 'text-gray-300 hover:text-[#E59A3D]'
                  }`
                }
              >
                About
              </NavLink>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `text-xs lg:text-sm font-bold uppercase tracking-wider transition-colors inline-flex items-center gap-1.5 ${
                    isActive ? 'text-[#E59A3D]' : 'text-gray-300 hover:text-[#E59A3D]'
                  }`
                }
              >
                <span>Contact</span>
              </NavLink>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `text-xs lg:text-sm font-bold uppercase tracking-wider transition-colors px-3 py-1 rounded-full border border-[#E59A3D] ${
                    isActive
                      ? 'bg-[#E59A3D] text-black font-extrabold shadow-sm'
                      : 'text-white hover:bg-[#E59A3D] hover:text-black'
                  }`
                }
                title="Admin Studio Portal"
              >
                <span>Admin</span>
              </NavLink>
            </nav>

            {/* Mobile Right: Symmetrical Action Button to perfectly balance the logo */}
            <button
              onClick={() => {
                if (onOpenBooking) onOpenBooking();
              }}
              className="md:hidden w-10 h-10 rounded-full bg-[#E59A3D] hover:bg-[#c98028] text-black flex items-center justify-center transition-all duration-200 active:scale-95 shadow-sm shadow-[#E59A3D]/30"
              aria-label="Book a Session"
              title="Book Schedule"
            >
              <ArrowUpRight size={17} />
            </button>
          </div>
        </div>
      </header>

      {/* Slide-over Full Drawer (Triggered by Circular Menu Button) */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 flex animate-fade-in">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-charcoal-950/60 backdrop-blur-sm transition-opacity"
            onClick={() => setIsDrawerOpen(false)}
          />

          {/* Drawer Content */}
          <div className="relative ml-0 w-full max-w-md bg-[#0D0E12] border-r border-white/10 text-white h-full shadow-2xl z-10 flex flex-col justify-between p-6 sm:p-8 overflow-y-auto">
            <div>
              {/* Header with prominent logo */}
              <div className="flex items-center justify-between pb-6 border-b border-white/10">
                <div className="flex items-center space-x-3">
                  <div className="w-11 h-11 rounded-full bg-[#14161C] p-1 border border-white/15 shadow-sm flex items-center justify-center">
                    <img
                      src="/logo.png"
                      alt="MY3 Studios Official Seal"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <span className="font-display font-black text-sm tracking-tight text-white block">
                      MY3 STUDIOS
                    </span>
                    <span className="text-[10px] text-[#E59A3D] tracking-widest uppercase font-bold">
                      Photography Atelier
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                  aria-label="Close menu"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Navigation Links with Proper Alignment */}
              <nav className="mt-8 space-y-2">
                <p className="text-[11px] uppercase tracking-widest text-gray-400 font-bold mb-3">
                  Studios Directory
                </p>
                {[
                  { label: 'Home', path: '/' },
                  { label: 'Client Photo Gallery', path: '/gallery' },
                  { label: 'Event Packages & Pricing', path: '/pricing' },
                  { label: 'Our Services', path: '/services' },
                  { label: 'About Us', path: '/about' },
                  { label: '🗺️ Studio Maps (Main & Kid\'s)', path: '/contact' },
                  { label: 'Contact & Bookings', path: '/contact' },
                  { label: 'Admin Portal (Login / CRUD)', path: '/login' },
                ].map((item, idx) => (
                  <div key={idx}>
                    {item.path ? (
                      <NavLink
                        to={item.path}
                        end={item.path === '/'}
                        onClick={() => setIsDrawerOpen(false)}
                        className={({ isActive }) =>
                          `block py-3 px-3.5 rounded-2xl text-base font-bold transition-all ${
                            isActive
                              ? 'bg-[#E59A3D]/15 text-[#E59A3D]'
                              : 'text-gray-200 hover:bg-white/5 hover:text-[#E59A3D]'
                          }`
                        }
                      >
                        {item.label}
                      </NavLink>
                    ) : (
                      <a
                        href={item.href}
                        onClick={(e) => {
                          e.preventDefault();
                          handleNavClick(item.href);
                        }}
                        className="block py-3 px-3.5 rounded-2xl text-base font-bold text-gray-200 hover:bg-white/5 hover:text-[#E59A3D] transition-all"
                      >
                        {item.label}
                      </a>
                    )}
                  </div>
                ))}
              </nav>

              {/* Dedicated 2 Studio Maps Card in Drawer */}
              <div className="mt-6 p-3.5 rounded-2xl bg-[#0D0E12] border border-white/10 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
                    <MapPin size={13} className="text-[#E59A3D]" />
                    <span>2 Studio Maps (Nandyal)</span>
                  </span>
                  <NavLink
                    to="/contact"
                    onClick={() => setIsDrawerOpen(false)}
                    className="text-[10px] text-[#E59A3D] font-bold hover:underline"
                  >
                    View Both Maps &rarr;
                  </NavLink>
                </div>

                {/* 1. Main Studio */}
                <div className="space-y-0.5 text-xs">
                  <div className="flex items-center justify-between font-bold text-white">
                    <span>🏛️ 1. Main Studio</span>
                    <a
                      href="https://maps.app.goo.gl/qDx9ZJLWEVtMp7Uv5"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] text-[#E59A3D] font-bold hover:underline inline-flex items-center gap-0.5"
                    >
                      <span>Map</span>
                      <ArrowUpRight size={11} />
                    </a>
                  </div>
                  <p className="text-[11px] text-gray-400 leading-snug">
                    Shop No 02, Nivarthi Bhavan, Opp. National College, Srinivasa Nagar
                  </p>
                </div>

                {/* 2. Kid's Studio */}
                <div className="space-y-0.5 text-xs pt-1.5 border-t border-white/10">
                  <div className="flex items-center justify-between font-bold text-white">
                    <span>🎈 2. Kid's Studio</span>
                    <a
                      href="https://maps.app.goo.gl/WBiXbYgQa3tuTJQ26?g_st=ac"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] text-[#E59A3D] font-bold hover:underline inline-flex items-center gap-0.5"
                    >
                      <span>Map</span>
                      <ArrowUpRight size={11} />
                    </a>
                  </div>
                  <p className="text-[11px] text-gray-400 leading-snug">
                    Bhagatsingh colony, near Noone palle flyover, Raithunagar Road
                  </p>
                </div>
              </div>

              {/* Quick Action Button */}
              <div className="mt-6 pt-4 border-t border-white/10">
                <button
                  onClick={() => {
                    setIsDrawerOpen(false);
                    if (onOpenBooking) onOpenBooking();
                  }}
                  className="w-full py-4 px-6 rounded-full bg-[#E59A3D] hover:bg-[#c98028] text-black font-bold text-xs sm:text-sm tracking-wider uppercase transition-all shadow-lg shadow-[#E59A3D]/20 flex items-center justify-center gap-2 active:scale-95"
                >
                  <span>Book Your Schedule</span>
                  <ArrowUpRight size={16} />
                </button>
              </div>
            </div>

            {/* Drawer Footer info */}
            <div className="pt-5 border-t border-white/10 mt-5 space-y-2 text-xs text-gray-400">
              <div className="text-[11px] font-bold text-white uppercase tracking-wider">
                Direct Contact: Anji
              </div>
              <a
                href="tel:+919949395037"
                className="flex items-center space-x-2 hover:text-[#E59A3D] transition-colors"
              >
                <Phone size={13} className="text-[#E59A3D]" />
                <span>+91 99493 95037 (Main / Anji)</span>
              </a>
              <a
                href="tel:+919848000339"
                className="flex items-center space-x-2 hover:text-[#E59A3D] transition-colors"
              >
                <Phone size={13} className="text-[#E59A3D]" />
                <span>+91 98480 00339 (Kid's Studio)</span>
              </a>
              <a
                href="mailto:mythristudiondl.anji@gmail.com"
                className="flex items-center space-x-2 hover:text-[#E59A3D] transition-colors"
              >
                <Mail size={13} className="text-[#E59A3D]" />
                <span>mythristudiondl.anji@gmail.com</span>
              </a>
              <div className="pt-1 flex items-center gap-3">
                <a
                  href="https://www.instagram.com/mythri_studio_ndl"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-[#E59A3D] hover:underline"
                >
                  Instagram: @mythri_studio_ndl
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
