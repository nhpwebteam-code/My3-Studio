import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export default function PageHeader({ badge, title, subtitle, breadcrumb }) {
  return (
    <div className="relative pt-32 pb-16 md:pt-40 md:pb-24 border-b border-studio-850/80 overflow-hidden bg-gradient-to-b from-studio-900/60 to-studio-950">
      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Breadcrumb */}
        {breadcrumb && (
          <div className="flex items-center justify-center space-x-2 text-xs uppercase tracking-widest text-studio-400 mb-4">
            <Link to="/" className="hover:text-gold transition-colors">Home</Link>
            <ChevronRight size={12} className="text-studio-600" />
            <span className="text-gold">{breadcrumb}</span>
          </div>
        )}

        {/* Category badge */}
        {badge && (
          <span className="inline-block px-3 py-1 rounded-full text-[11px] font-semibold tracking-widest uppercase bg-gold/10 text-gold border border-gold/25 mb-4">
            {badge}
          </span>
        )}

        {/* Page Title */}
        <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-normal text-studio-50 max-w-3xl mx-auto tracking-tight mb-4">
          {title}
        </h1>

        {/* Subtitle */}
        {subtitle && (
          <p className="text-sm sm:text-base md:text-lg text-studio-400 max-w-2xl mx-auto leading-relaxed font-light">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
