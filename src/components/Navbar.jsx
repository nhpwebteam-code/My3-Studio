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
        className={`fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md transition-all duration-300 border-b border-gray-200/90 ${
          isScrolled ? 'py-1.5 sm:py-2 shadow-sm' : 'py-2 sm:py-3'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Left: Circular Menu Button & Left Symmetrical Links */}
          <div className="flex-1 flex items-center justify-start space-x-6 sm:space-x-8">
            {/* Dark Circular Hamburger Menu Button */}
            <button
              id="main-menu-btn"
              onClick={() => setIsDrawerOpen(true)}
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#2A2B30] hover:bg-black text-white flex items-center justify-center transition-all duration-200 active:scale-95 shadow-sm hover:shadow-md group"
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
                      ? 'text-coral after:content-[""] after:absolute after:-bottom-1.5 after:left-0 after:right-0 after:h-[2px] after:bg-coral'
                      : 'text-charcoal-800 hover:text-coral'
                  }`
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/gallery"
                className={({ isActive }) =>
                  `text-xs lg:text-sm font-bold uppercase tracking-wider transition-colors ${
                    isActive ? 'text-coral' : 'text-charcoal-800 hover:text-coral'
                  }`
                }
              >
                Gallery
              </NavLink>
              <NavLink
                to="/pricing"
                className={({ isActive }) =>
                  `text-xs lg:text-sm font-bold uppercase tracking-wider transition-colors ${
                    isActive ? 'text-coral' : 'text-charcoal-800 hover:text-coral'
                  }`
                }
              >
                Pricing
              </NavLink>
            </nav>
          </div>

          {/* Center: Brand Logo - Prominent, Large & Perfectly Centered */}
          <div className="shrink-0 flex justify-center px-2 sm:px-4">
            <Link
              to="/"
              className="flex items-center justify-center py-1 group"
              aria-label="MYTHRI STUDIO Home"
            >
              <img
                src="/navbar-logo.png"
                alt="MYTHRI STUDIO Logo"
                className={`w-auto object-contain transition-all duration-300 group-hover:scale-105 filter drop-shadow-sm ${
                  isScrolled
                    ? 'h-9 sm:h-11 md:h-13 lg:h-14 max-h-[56px]'
                    : 'h-11 sm:h-13 md:h-16 lg:h-18 max-h-[72px]'
                }`}
              />
            </Link>
          </div>

          {/* Right: Symmetrical Links: Services, About, Contact */}
          <div className="flex-1 flex items-center justify-end space-x-6 sm:space-x-8">
            <nav className="hidden md:flex items-center space-x-6 sm:space-x-7">
              <NavLink
                to="/services"
                className={({ isActive }) =>
                  `text-xs lg:text-sm font-bold uppercase tracking-wider transition-colors ${
                    isActive ? 'text-coral' : 'text-charcoal-800 hover:text-coral'
                  }`
                }
              >
                Services
              </NavLink>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `text-xs lg:text-sm font-bold uppercase tracking-wider transition-colors ${
                    isActive ? 'text-coral' : 'text-charcoal-800 hover:text-coral'
                  }`
                }
              >
                About
              </NavLink>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `text-xs lg:text-sm font-bold uppercase tracking-wider transition-colors inline-flex items-center gap-1.5 ${
                    isActive ? 'text-coral' : 'text-charcoal-800 hover:text-coral'
                  }`
                }
              >
                <span>Contact</span>
              </NavLink>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `text-xs lg:text-sm font-bold uppercase tracking-wider transition-colors px-3 py-1 rounded-full border border-coral ${
                    isActive
                      ? 'bg-coral text-white font-extrabold shadow-sm'
                      : 'text-charcoal-800 hover:bg-coral hover:text-white'
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
              className="md:hidden w-10 h-10 rounded-full bg-coral hover:bg-coral-dark text-white flex items-center justify-center transition-all duration-200 active:scale-95 shadow-sm shadow-coral/30"
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
          <div className="relative ml-0 w-full max-w-md bg-white border-r border-gray-200 text-charcoal h-full shadow-2xl z-10 flex flex-col justify-between p-6 sm:p-8 overflow-y-auto">
            <div>
              {/* Header with prominent logo */}
              <div className="flex items-center justify-between pb-6 border-b border-gray-100">
                <div className="flex items-center space-x-3">
                  <div className="w-11 h-11 rounded-full bg-white p-1 border border-gray-200 shadow-sm flex items-center justify-center">
                    <img
                      src="/logo.png"
                      alt="MY3 Studios Official Seal"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <span className="font-display font-black text-sm tracking-tight text-charcoal-900 block">
                      MY3 STUDIOS
                    </span>
                    <span className="text-[10px] text-coral tracking-widest uppercase font-bold">
                      Photography Atelier
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="p-2 rounded-full hover:bg-gray-100 text-charcoal-400 hover:text-charcoal-900 transition-colors cursor-pointer"
                  aria-label="Close menu"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Navigation Links with Matching Desktop Names */}
              <nav className="mt-5 sm:mt-6 space-y-1 sm:space-y-1.5">
                <p className="text-[10px] uppercase tracking-widest text-charcoal-400 font-bold mb-2 px-1">
                  Navigation
                </p>
                {[
                  { label: 'Home', path: '/' },
                  { label: 'Gallery', path: '/gallery' },
                  { label: 'Pricing', path: '/pricing' },
                  { label: 'Services', path: '/services' },
                  { label: 'About', path: '/about' },
                  { label: 'Contact', path: '/contact' },
                  { label: 'Admin', path: '/login' },
                ].map((item, idx) => (
                  <div key={idx}>
                    {item.path ? (
                      <NavLink
                        to={item.path}
                        end={item.path === '/'}
                        onClick={() => setIsDrawerOpen(false)}
                        className={({ isActive }) =>
                          `flex items-center justify-between py-2.5 px-3.5 rounded-xl text-base font-bold transition-all ${
                            isActive
                              ? 'bg-coral-50 text-coral'
                              : 'text-charcoal-800 hover:bg-gray-50 hover:text-coral'
                          }`
                        }
                      >
                        <span>{item.label}</span>
                        <ArrowUpRight size={14} className="opacity-40" />
                      </NavLink>
                    ) : (
                      <a
                        href={item.href}
                        onClick={(e) => {
                          e.preventDefault();
                          handleNavClick(item.href);
                        }}
                        className="flex items-center justify-between py-2.5 px-3.5 rounded-xl text-base font-bold text-charcoal-800 hover:bg-gray-50 hover:text-coral transition-all"
                      >
                        <span>{item.label}</span>
                        <ArrowUpRight size={14} className="opacity-40" />
                      </a>
                    )}
                  </div>
                ))}
              </nav>

              {/* Dedicated 2 Studio Maps Card in Drawer */}
              <div className="mt-6 p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#EAE4D9] space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-charcoal-900 flex items-center gap-1.5">
                    <MapPin size={13} className="text-coral" />
                    <span>2 Studio Maps (Nandyal)</span>
                  </span>
                  <NavLink
                    to="/contact"
                    onClick={() => setIsDrawerOpen(false)}
                    className="text-[10px] text-coral font-bold hover:underline"
                  >
                    View Both Maps &rarr;
                  </NavLink>
                </div>

                {/* 1. Main Studio */}
                <div className="space-y-0.5 text-xs">
                  <div className="flex items-center justify-between font-bold text-charcoal-900">
                    <span>🏛️ 1. Main Studio</span>
                    <a
                      href="https://maps.app.goo.gl/qDx9ZJLWEVtMp7Uv5"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] text-coral font-bold hover:underline inline-flex items-center gap-0.5"
                    >
                      <span>Map</span>
                      <ArrowUpRight size={11} />
                    </a>
                  </div>
                  <p className="text-[11px] text-charcoal-600 leading-snug">
                    Shop No 02, Nivarthi Bhavan, Opp. National College, Srinivasa Nagar
                  </p>
                </div>

                {/* 2. Kid's Studio */}
                <div className="space-y-0.5 text-xs pt-1.5 border-t border-[#EAE4D9]">
                  <div className="flex items-center justify-between font-bold text-charcoal-900">
                    <span>🎈 2. Kid's Studio</span>
                    <a
                      href="https://maps.app.goo.gl/WBiXbYgQa3tuTJQ26?g_st=ac"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] text-coral font-bold hover:underline inline-flex items-center gap-0.5"
                    >
                      <span>Map</span>
                      <ArrowUpRight size={11} />
                    </a>
                  </div>
                  <p className="text-[11px] text-charcoal-600 leading-snug">
                    Bhagatsingh colony, near Noone palle flyover, Raithunagar Road
                  </p>
                </div>
              </div>

              {/* Quick Action Button */}
              <div className="mt-6 pt-4 border-t border-gray-100">
                <button
                  onClick={() => {
                    setIsDrawerOpen(false);
                    if (onOpenBooking) onOpenBooking();
                  }}
                  className="w-full py-4 px-6 rounded-full bg-coral hover:bg-coral-dark text-white font-bold text-xs sm:text-sm tracking-wider uppercase transition-all shadow-lg shadow-coral/30 flex items-center justify-center gap-2 active:scale-95"
                >
                  <span>Book Your Schedule</span>
                  <ArrowUpRight size={16} />
                </button>
              </div>
            </div>

            {/* Drawer Footer info */}
            <div className="pt-5 border-t border-gray-100 mt-5 space-y-2 text-xs text-charcoal-600">
              <div className="text-[11px] font-bold text-charcoal-900 uppercase tracking-wider">
                Direct Contact: Anji
              </div>
              <a
                href="tel:+919949395037"
                className="flex items-center space-x-2 hover:text-coral transition-colors"
              >
                <Phone size={13} className="text-coral" />
                <span>+91 99493 95037 (Main / Anji)</span>
              </a>
              <a
                href="tel:+919848000339"
                className="flex items-center space-x-2 hover:text-coral transition-colors"
              >
                <Phone size={13} className="text-coral" />
                <span>+91 98480 00339 (Kid's Studio)</span>
              </a>
              <a
                href="mailto:mythristudiondl.anji@gmail.com"
                className="flex items-center space-x-2 hover:text-coral transition-colors"
              >
                <Mail size={13} className="text-coral" />
                <span>mythristudiondl.anji@gmail.com</span>
              </a>
              <div className="pt-1 flex items-center gap-3">
                <a
                  href="https://www.instagram.com/mythri_studio_ndl"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-coral hover:underline"
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
