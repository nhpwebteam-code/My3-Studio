import React from 'react';
import { Maximize2, MapPin } from 'lucide-react';

export default function GalleryCard({ item, onSelect }) {
  return (
    <div
      onClick={() => onSelect(item)}
      className="group relative cursor-pointer overflow-hidden rounded-2xl bg-gray-100 border border-gray-200 transition-all duration-500 hover:border-coral/50 hover:shadow-2xl"
    >
      {/* Image container */}
      <div className="relative overflow-hidden aspect-[4/5] sm:aspect-auto">
        <img
          src={item.image}
          alt={item.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Ambient Dark Gradient on Hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/85 via-charcoal-950/30 to-transparent opacity-60 group-hover:opacity-85 transition-opacity duration-300" />
      </div>

      {/* Top Badge */}
      <div className="absolute top-3.5 left-3.5 z-10">
        <span className="px-3 py-1 rounded-full text-[10px] uppercase tracking-wider font-bold bg-white/90 text-charcoal shadow-sm backdrop-blur-md">
          {item.categoryLabel}
        </span>
      </div>

      {/* Expand Icon */}
      <div className="absolute top-3.5 right-3.5 z-10 opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
        <div className="w-9 h-9 rounded-full bg-coral text-white flex items-center justify-center shadow-lg">
          <Maximize2 size={15} />
        </div>
      </div>

      {/* Bottom Info Overlay */}
      <div className="absolute bottom-0 inset-x-0 p-5 z-10 text-white">
        <p className="text-[11px] font-mono text-coral-light mb-1 tracking-wider uppercase font-bold">
          {item.year} • {item.client}
        </p>
        <h3 className="font-display text-lg md:text-xl font-bold group-hover:text-white transition-colors">
          {item.title}
        </h3>
        {item.location && (
          <div className="flex items-center gap-1.5 text-xs text-gray-300 mt-1">
            <MapPin size={12} className="text-coral" />
            <span>{item.location}</span>
          </div>
        )}
      </div>
    </div>
  );
}
