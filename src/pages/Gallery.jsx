import React, { useState, useMemo } from 'react';
import LightboxModal from '../components/LightboxModal';
import { useStudioData } from '../context/StudioDataContext';
import { Camera } from 'lucide-react';

export default function Gallery() {
  const { gallery, galleryCategories } = useStudioData();
  // Default to 'wedding' as shown in the reference screenshot
  const [activeCategory, setActiveCategory] = useState('wedding');
  const [selectedImage, setSelectedImage] = useState(null);

  // Filter gallery items based on active category
  const filteredItems = useMemo(() => {
    if (activeCategory === 'all') return gallery;
    return gallery.filter((item) => item.category === activeCategory);
  }, [activeCategory, gallery]);

  return (
    <div className="w-full bg-[#000000] text-white min-h-screen">
      {/* 1. Header Section */}
      <section className="pt-28 sm:pt-36 pb-10 text-center px-4 sm:px-6 max-w-5xl mx-auto">
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#E59A3D]/10 border border-[#E59A3D]/30 mb-4">
          <img
            src="/logo.png"
            alt="MY3 Studios"
            className="w-5 h-5 object-contain rounded-full"
          />
          <span className="text-xs font-bold text-[#E59A3D] uppercase tracking-wider">
            MY3 Studios • Preserving Every Cherished Chapter
          </span>
        </div>
        <h1 className="font-display font-black tracking-tight text-3xl sm:text-5xl md:text-6xl uppercase text-white leading-tight">
          THE GALLERY COLLECTION
        </h1>
        <div className="w-16 h-1 bg-[#E59A3D] mx-auto mt-4 rounded-full" />
      </section>

      {/* 2. Filter Pills */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5">
          {galleryCategories.map((cat) => {
            const isActive = activeCategory === cat.id;
            const count =
              cat.id === 'all'
                ? gallery.length
                : gallery.filter((item) => item.category === cat.id).length;

            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-6 sm:px-7 py-2.5 rounded-full text-[11px] sm:text-xs uppercase tracking-widest font-bold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-[#E59A3D] text-black shadow-lg scale-102 ring-2 ring-[#E59A3D]/30'
                    : 'bg-[#14161C] hover:bg-[#1A1C24] text-gray-300 hover:text-white border border-white/10 shadow-xs hover:shadow-sm'
                }`}
              >
                <span>{cat.label}</span>
                <span className={`ml-2 text-[10px] font-mono ${isActive ? 'text-black/60' : 'text-gray-500'}`}>
                  ({count})
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* 3. Four-Column Gallery Photo Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6 animate-fade-in">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedImage(item)}
              className="group relative aspect-[3/4] rounded-2xl overflow-hidden bg-[#14161C] shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer border border-white/10"
            >
              {/* Image */}
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />

              {/* Bottom Center Circular Studio Emblem Watermark */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 pointer-events-none transition-transform duration-300 group-hover:scale-110">
                <div className="w-6 h-6 rounded-full bg-black/80 backdrop-blur-sm shadow-sm flex items-center justify-center p-0.5 border border-white/20">
                  <img
                    src="/logo.png"
                    alt="MY3 Studios"
                    className="w-full h-full object-contain rounded-full"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty Category Fallback */}
        {filteredItems.length === 0 && (
          <div className="text-center py-20 bg-[#14161C] rounded-3xl border border-white/10 shadow-sm max-w-xl mx-auto p-8">
            <Camera size={32} className="text-[#E59A3D] mx-auto mb-3" />
            <h4 className="font-display font-bold text-lg text-white">
              No photos found in this category
            </h4>
            <p className="text-xs text-gray-400 mt-1">
              Select another collection tab above to explore our work.
            </p>
          </div>
        )}
      </section>



      {/* Lightbox Modal on Card Click */}
      {selectedImage && (
        <LightboxModal
          item={selectedImage}
          items={filteredItems}
          onClose={() => setSelectedImage(null)}
          onNavigate={setSelectedImage}
        />
      )}
    </div>
  );
}
