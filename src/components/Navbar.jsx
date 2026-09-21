import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight, Phone, Mail } from 'lucide-react';
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 flex items-center justify-between">
          
          {/* Left: Circular Menu Button & Left Symmetrical Links */}
          <div className="flex items-center space-x-6 sm:space-x-8">
            {/* Dark Circular Hamburger Menu Button */}
            <button
              id="main-menu-btn"
              onClick={() => setIsDrawerOpen(true)}
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#2A2B30] hover:bg-black text-white flex items-center justify-center transition-all duration-200 active:scale-95 shadow-sm hover:shadow-md group"
              aria-label="Open Navigation Menu"
            >
              <Menu size={19} className="group-hover:scale-110 transition-transform" />
            </button>

            {/* Desktop Left Nav Links: Home, About, Pricing */}
            <nav className="hidden md:flex items-center space-x-6 sm:space-x-7">
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  `text-xs lg:text-sm font-bold uppercase tracking-wider transition-colors ${
                    isActive ? 'text-coral' : 'text-charcoal-800 hover:text-coral'
                  }`
                }
              >
                Home
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

          {/* Center: Brand Logo - Prominent, Large & Clearly Visible */}
          <div className="flex-1 flex justify-center px-2 sm:px-4">
            <Link
              to="/"
              className="flex items-center justify-center py-1 group"
              aria-label="MY3 Studio Home"
            >
              <img
                src="/logo.png"
                alt="MY3 Studio Logo"
                className={`w-auto object-contain transition-all duration-300 group-hover:scale-105 filter drop-shadow-md ${
                  isScrolled
                    ? 'h-12 sm:h-14 md:h-16 max-h-[64px]'
                    : 'h-14 sm:h-16 md:h-20 lg:h-22 max-h-[88px]'
                }`}
              />
            </Link>
          </div>

          {/* Right: Symmetrical Links: Services, Gallery, Contact & Language Selector */}
          <div className="flex items-center space-x-6 sm:space-x-8">
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
                to="/contact"
                className={({ isActive }) =>
                  `text-xs lg:text-sm font-bold uppercase tracking-wider transition-colors ${
                    isActive ? 'text-coral' : 'text-charcoal-800 hover:text-coral'
                  }`
                }
              >
                Contact
              </NavLink>
            </nav>
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
          <div className="relative ml-0 w-full max-w-md bg-white h-full shadow-2xl z-10 flex flex-col justify-between p-6 sm:p-8 overflow-y-auto">
            <div>
              {/* Header with prominent logo */}
              <div className="flex items-center justify-between pb-6 border-b border-gray-100">
                <div className="flex items-center space-x-3">
                  <img
                    src="/logo.png"
                    alt="MY3 Studio"
                    className="h-16 sm:h-20 w-auto object-contain filter drop-shadow-sm"
                  />
                  <div>
                    <span className="font-black text-base tracking-widest text-charcoal font-display uppercase block">
                      MY3 STUDIO
                    </span>
                    <span className="text-[10px] text-coral tracking-widest uppercase font-bold">
                      Photography Atelier
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="p-2 rounded-full hover:bg-gray-100 text-charcoal-600 hover:text-charcoal transition-colors"
                  aria-label="Close menu"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Navigation Links with Proper Alignment */}
              <nav className="mt-8 space-y-2">
                <p className="text-[11px] uppercase tracking-widest text-gray-400 font-bold mb-3">
                  Studio Directory
                </p>
                {[
                  { label: 'Home', path: '/' },
                  { label: 'About Us', path: '/about' },
                  { label: 'Our Services', path: '/services' },
                  { label: 'Event Packages & Pricing', path: '/pricing' },
                  { label: 'Client Photo Gallery', path: '/gallery' },
                  { label: 'Contact & Bookings', path: '/contact' },
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
                              ? 'bg-coral-50 text-coral'
                              : 'text-charcoal-800 hover:bg-gray-50 hover:text-coral'
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
                        className="block py-3 px-3.5 rounded-2xl text-base font-bold text-charcoal-800 hover:bg-gray-50 hover:text-coral transition-all"
                      >
                        {item.label}
                      </a>
                    )}
                  </div>
                ))}
              </nav>

              {/* Quick Action Button */}
              <div className="mt-8 pt-6 border-t border-gray-100">
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
            <div className="pt-6 border-t border-gray-100 mt-6 space-y-2.5 text-xs text-charcoal-600">
              <div className="text-[11px] font-bold text-charcoal-900 uppercase tracking-wider">
                Contact Person: Anji
              </div>
              <a
                href="tel:+919949395037"
                className="flex items-center space-x-2 hover:text-coral transition-colors"
              >
                <Phone size={14} className="text-coral" />
                <span>+91 99493 95037 (Anji / WhatsApp)</span>
              </a>
              <a
                href="tel:+917780181436"
                className="flex items-center space-x-2 hover:text-coral transition-colors"
              >
                <Phone size={14} className="text-coral" />
                <span>+91 77801 81436 (Desk)</span>
              </a>
              <a
                href="mailto:rmythristudiondl.anji@gmail.com"
                className="flex items-center space-x-2 hover:text-coral transition-colors"
              >
                <Mail size={14} className="text-coral" />
                <span>rmythristudiondl.anji@gmail.com</span>
              </a>
              <div className="pt-2 flex items-center gap-3">
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
