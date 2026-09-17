import React from 'react';
import { Maximize2, MapPin } from 'lucide-react';

export default function GalleryCard({ item, onSelect }) {
  return (
    <div
      onClick={() => onSelect(item)}
      className="group relative cursor-pointer overflow-hidden rounded-xl bg-studio-900 border border-studio-800/80 transition-all duration-500 hover:border-gold/50 hover:shadow-2xl hover:shadow-black/60"
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
        <div className="absolute inset-0 bg-gradient-to-t from-studio-950 via-studio-950/40 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300" />
      </div>

      {/* Top Badge */}
      <div className="absolute top-3.5 left-3.5 z-10">
        <span className="px-2.5 py-1 rounded-md text-[10px] uppercase tracking-wider font-semibold bg-studio-950/80 text-studio-200 border border-studio-700/60 backdrop-blur-md">
          {item.categoryLabel}
        </span>
      </div>

      {/* Expand Icon */}
      <div className="absolute top-3.5 right-3.5 z-10 opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
        <div className="w-8 h-8 rounded-full bg-studio-950/80 border border-gold/40 text-gold flex items-center justify-center backdrop-blur-md">
          <Maximize2 size={14} />
        </div>
      </div>

      {/* Bottom Info Overlay */}
      <div className="absolute bottom-0 inset-x-0 p-5 z-10">
        <p className="text-[11px] font-mono text-gold mb-1 tracking-wider uppercase">
          {item.year} • {item.client}
        </p>
        <h3 className="font-serif text-lg md:text-xl text-studio-50 font-medium group-hover:text-white transition-colors">
          {item.title}
        </h3>
        {item.location && (
          <div className="flex items-center gap-1.5 text-xs text-studio-400 mt-1 opacity-80">
            <MapPin size={12} className="text-gold" />
            <span>{item.location}</span>
          </div>
        )}
      </div>
    </div>
  );
}
