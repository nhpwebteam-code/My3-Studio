import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Maximize2 } from 'lucide-react';
import { galleryItems, galleryCategories } from '../data/gallery';
import LightboxModal from './LightboxModal';

export default function ShowcaseGallery() {
  const [activeCategory, setActiveCategory] = useState('wedding');
  const [selectedImage, setSelectedImage] = useState(null);

  // Filter items based on active category
  const filteredItems =
    activeCategory === 'all'
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory);

  // Take up to 8 photos for the home showcase
  const displayItems = filteredItems.slice(0, 8);

  return (
    <section id="portfolio" className="w-full bg-[#FAF7F2] py-20 px-4 sm:px-6 lg:px-8 scroll-mt-24">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* 1. Header Section - Matching Reference Screenshot */}
        <div className="text-center max-w-4xl mx-auto space-y-3">
          <span className="text-[11px] sm:text-xs font-mono tracking-[0.25em] uppercase text-charcoal-500 font-bold block">
            Preserving Every Cherished Chapter
          </span>
          <h2 className="font-serif tracking-[0.18em] sm:tracking-[0.22em] text-3xl sm:text-4xl md:text-5xl uppercase text-charcoal-900 font-normal">
            THE GALLERY COLLECTION
          </h2>
          <div className="w-16 h-0.5 bg-coral mx-auto rounded-full" />
        </div>

        {/* 2. Filter Pills - Only the 5 categories provided */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5">
          {galleryCategories.map((cat) => {
            const isActive = activeCategory === cat.id;
            const count =
              cat.id === 'all'
                ? galleryItems.length
                : galleryItems.filter((item) => item.category === cat.id).length;

            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-6 sm:px-7 py-2.5 rounded-full text-[11px] sm:text-xs uppercase tracking-widest font-bold transition-all duration-200 ${
                  isActive
                    ? 'bg-[#1C1A17] text-white shadow-lg scale-102 ring-2 ring-black/10'
                    : 'bg-white hover:bg-white/90 text-charcoal-700 hover:text-charcoal-950 border border-gray-200/80 shadow-xs hover:shadow-sm'
                }`}
              >
                <span>{cat.label}</span>
                <span className={`ml-2 text-[10px] font-mono ${isActive ? 'text-white/75' : 'text-charcoal-400'}`}>
                  ({count})
                </span>
              </button>
            );
          })}
        </div>

        {/* 3. Four-Column Gallery Photo Grid - Matches Reference Screenshot Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6 animate-fade-in">
          {displayItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedImage(item)}
              className="group relative aspect-[3/4] rounded-2xl overflow-hidden bg-charcoal-100 shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer border border-white/80"
            >
              {/* Image from takeout-1-001 */}
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />

              {/* Hover Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/85 via-charcoal-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-5" />

              {/* Hover Top Badge */}
              <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-charcoal-900 shadow-md">
                  <Maximize2 size={13} />
                </div>
              </div>

              {/* Bottom Center Circular Studio Emblem Watermark (as seen in reference) */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 group-hover:opacity-0 transition-opacity duration-200 pointer-events-none">
                <div className="w-6 h-6 rounded-full bg-white/90 backdrop-blur-sm shadow-sm flex items-center justify-center p-0.5 border border-white">
                  <img
                    src="/logo.png"
                    alt="MY3"
                    className="w-full h-full object-contain rounded-full"
                  />
                </div>
              </div>

              {/* Hover Bottom Title & Category */}
              <div className="absolute bottom-0 left-0 right-0 p-5 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white">
                <span className="text-[10px] uppercase tracking-widest text-coral font-bold block mb-1">
                  {item.categoryLabel}
                </span>
                <h3 className="font-display font-bold text-sm text-white leading-snug line-clamp-2">
                  {item.title}
                </h3>
                <p className="text-[11px] text-white/70 mt-1 flex items-center justify-between">
                  <span>{item.location}</span>
                  <span className="text-coral font-bold flex items-center gap-1">
                    <span>Full View</span>
                    <ArrowRight size={11} />
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* 4. Action Row to Full Gallery */}
        <div className="text-center pt-6">
          <Link
            to="/gallery"
            className="inline-flex items-center gap-2 px-9 py-3.5 rounded-full bg-[#1C1A17] hover:bg-black text-white text-xs font-bold uppercase tracking-widest transition-all shadow-lg hover:shadow-xl hover:scale-102 active:scale-98"
          >
            <span>Explore All 27+ Works in Full Gallery</span>
            <ArrowRight size={14} />
          </Link>
        </div>

      </div>

      {/* Lightbox Modal on Card Click */}
      {selectedImage && (
        <LightboxModal
          item={selectedImage}
          items={filteredItems}
          onClose={() => setSelectedImage(null)}
          onNavigate={setSelectedImage}
        />
      )}
    </section>
  );
}
