import React from 'react';
import { Link } from 'react-router-dom';
import { Check, ArrowRight, Clock } from 'lucide-react';

export default function ServiceCard({ service }) {
  return (
    <div className="flex flex-col rounded-2xl bg-studio-900/90 border border-studio-800 hover:border-gold/50 transition-all duration-300 overflow-hidden group shadow-lg">
      {/* Service Cover Image */}
      <div className="relative h-52 sm:h-60 overflow-hidden">
        <img
          src={service.coverImage}
          alt={service.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-studio-900 via-studio-900/30 to-transparent" />
        
        {/* Starting Price Pill */}
        <div className="absolute bottom-4 left-4 z-10">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-studio-950/90 text-gold border border-gold/30 backdrop-blur-md">
            Starts at {service.startingPrice}
          </span>
        </div>
      </div>

      {/* Body Content */}
      <div className="p-6 sm:p-7 flex flex-col flex-grow">
        <div className="flex items-center gap-2 text-xs text-studio-400 mb-2">
          <Clock size={13} className="text-gold" />
          <span>{service.duration}</span>
        </div>

        <h3 className="font-serif text-xl sm:text-2xl text-studio-100 font-semibold mb-2 group-hover:text-white transition-colors">
          {service.title}
        </h3>

        <p className="text-xs sm:text-sm text-studio-400 leading-relaxed mb-6">
          {service.description}
        </p>

        {/* Deliverables list */}
        <div className="border-t border-studio-800/80 pt-5 mb-6 flex-grow">
          <p className="text-[11px] font-mono uppercase tracking-wider text-studio-300 mb-3">
            Inclusions & Deliverables:
          </p>
          <ul className="space-y-2">
            {service.deliverables.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs text-studio-300">
                <Check size={14} className="text-gold shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Card Footer Action */}
        <Link
          to="/contact"
          state={{ selectedService: service.id }}
          className="inline-flex items-center justify-between w-full px-4 py-3 rounded-xl bg-studio-850 hover:bg-gold hover:text-studio-950 text-studio-200 text-xs font-semibold uppercase tracking-wider transition-all duration-200 border border-studio-750 group/btn"
        >
          <span>Inquire for {service.title.split(' ')[0]}</span>
          <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
