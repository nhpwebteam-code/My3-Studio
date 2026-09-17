import React, { useState, useMemo } from 'react';
import PageHeader from '../components/PageHeader';
import GalleryCard from '../components/GalleryCard';
import LightboxModal from '../components/LightboxModal';
import { portfolioItems, portfolioCategories } from '../data/portfolio';

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState(null);

  // Filter gallery items based on active category
  const filteredItems = useMemo(() => {
    if (activeCategory === 'all') return portfolioItems;
    return portfolioItems.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="pb-24 space-y-12">
      <PageHeader
        breadcrumb="Portfolio"
        badge="Archive of Works"
        title="Visual Narratives & Monoliths of Light"
        subtitle="Explore our curated documentation of weddings, haute couture, architectural forms, and intimate studio portraiture."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Filter Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
          {portfolioCategories.map((cat) => {
            const count =
              cat.id === 'all'
                ? portfolioItems.length
                : portfolioItems.filter((item) => item.category === cat.id).length;

            const isActive = activeCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2.5 rounded-full text-xs uppercase tracking-wider font-semibold transition-all duration-200 ${
                  isActive
                    ? 'bg-gold text-studio-950 shadow-md shadow-gold/20'
                    : 'bg-studio-900/90 text-studio-300 hover:text-white border border-studio-800 hover:border-studio-700'
                }`}
              >
                <span>{cat.label}</span>
                <span className={`ml-2 text-[10px] font-mono ${isActive ? 'text-studio-900/80' : 'text-studio-500'}`}>
                  ({count})
                </span>
              </button>
            );
          })}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fade-in">
          {filteredItems.map((item) => (
            <GalleryCard key={item.id} item={item} onSelect={setSelectedImage} />
          ))}
        </div>

        {/* Empty state fallback if category has no items */}
        {filteredItems.length === 0 && (
          <div className="text-center py-16 text-studio-400">
            <p className="text-base font-serif">No projects found in this category.</p>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
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
