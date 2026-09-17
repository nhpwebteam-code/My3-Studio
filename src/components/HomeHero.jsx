import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { studioConfig } from '../data/studioConfig';

export default function HomeHero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Editorial Background Image with Dark Vignette */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2000&q=85"
          alt="Mythri Studios Atmosphere"
          className="w-full h-full object-cover opacity-25 scale-105 filter brightness-75"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-studio-950 via-studio-950/70 to-studio-950/90" />
      </div>

      {/* Decorative center radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-gold/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-studio-900/80 border border-gold/30 text-gold text-xs font-semibold uppercase tracking-widest mb-6 backdrop-blur-md">
          <Sparkles size={13} />
          <span>{studioConfig.tagline}</span>
        </div>

        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal text-studio-50 tracking-tight leading-[1.08] mb-6">
          Capturing the <span className="italic font-light text-gold-light">Poetry</span> of Light & Stillness
        </h1>

        <p className="text-base sm:text-lg md:text-xl text-studio-300 max-w-2xl mx-auto font-light leading-relaxed mb-10">
          {studioConfig.shortBio}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/portfolio"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-xs uppercase tracking-widest font-semibold bg-gold text-studio-950 hover:bg-gold-light transition-all shadow-xl hover:shadow-gold/20"
          >
            <span>Explore Portfolio</span>
            <ArrowRight size={15} />
          </Link>

          <Link
            to="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-xs uppercase tracking-widest font-semibold bg-studio-900/90 text-studio-200 border border-studio-700 hover:border-gold/60 hover:text-white transition-all backdrop-blur-md"
          >
            <span>Book Studio Session</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
