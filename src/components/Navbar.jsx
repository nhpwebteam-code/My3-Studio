import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X, Camera, ArrowUpRight } from 'lucide-react';
import { studioConfig } from '../data/studioConfig';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Close mobile drawer on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Subtle background elevation on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'glass-header border-b border-studio-800/80 py-3.5 shadow-2xl shadow-black/40'
          : 'bg-gradient-to-b from-studio-950/90 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center space-x-3 group" aria-label="Mythri Studios Home">
          <div className="w-10 h-10 rounded-lg bg-studio-900 border border-studio-700 flex items-center justify-center text-gold group-hover:border-gold/60 transition-colors">
            <Camera size={20} strokeWidth={1.8} />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-lg sm:text-xl font-bold tracking-wider text-studio-50">
              MYTHRI
            </span>
            <span className="font-sans text-[10px] tracking-[0.25em] text-gold font-medium -mt-1 uppercase">
              Studios
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
          {studioConfig.navigation.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `transition-colors duration-200 tracking-wide ${
                  isActive
                    ? 'text-gold font-semibold'
                    : 'text-studio-300 hover:text-studio-50'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="hidden md:flex items-center">
          <Link
            to="/contact"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider bg-gold text-studio-950 hover:bg-gold-light transition-all shadow-md hover:shadow-gold/20"
          >
            <span>Book a Session</span>
            <ArrowUpRight size={14} />
          </Link>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded-md text-studio-300 hover:text-white hover:bg-studio-850 transition-colors"
          aria-label="Toggle Navigation Menu"
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden glass-header border-b border-studio-800 px-6 py-6 animate-fade-in">
          <nav className="flex flex-col space-y-4">
            {studioConfig.navigation.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `text-base tracking-wide py-1 ${
                    isActive ? 'text-gold font-semibold' : 'text-studio-300'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <div className="pt-4 border-t border-studio-800">
              <Link
                to="/contact"
                className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl text-xs uppercase tracking-wider font-semibold bg-gold text-studio-950"
              >
                <span>Book a Session</span>
                <ArrowUpRight size={14} />
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
