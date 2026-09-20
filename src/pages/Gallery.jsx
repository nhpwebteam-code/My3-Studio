import React, { useState, useMemo } from 'react';
import PageHeader from '../components/PageHeader';
import GalleryCard from '../components/GalleryCard';
import LightboxModal from '../components/LightboxModal';
import { galleryItems, galleryCategories } from '../data/gallery';

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState(null);

  // Filter gallery items based on active category
  const filteredItems = useMemo(() => {
    if (activeCategory === 'all') return galleryItems;
    return galleryItems.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="pb-24 space-y-12 bg-white">
      <PageHeader
        kicker="Client Celebrations"
        title="Studio Gallery Archive"
        subtitle="Explore our real client photography across weddings, pre-wedding ceremonies, milestone birthdays, and portraits."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Filter Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
          {galleryCategories.map((cat) => {
            const count =
              cat.id === 'all'
                ? galleryItems.length
                : galleryItems.filter((item) => item.category === cat.id).length;

            const isActive = activeCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2.5 rounded-full text-xs uppercase tracking-wider font-bold transition-all duration-200 ${
                  isActive
                    ? 'bg-coral text-white shadow-md shadow-coral/30'
                    : 'bg-gray-100 text-charcoal-700 hover:bg-gray-200 border border-gray-200'
                }`}
              >
                <span>{cat.label}</span>
                <span className={`ml-2 text-[10px] font-mono ${isActive ? 'text-white/80' : 'text-charcoal-400'}`}>
                  ({count})
                </span>
              </button>
            );
          })}
        </div>

        {/* Gallery Grid - Responsive Masonry/Grid of 43 Client Photos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fade-in">
          {filteredItems.map((item) => (
            <GalleryCard key={item.id} item={item} onSelect={setSelectedImage} />
          ))}
        </div>

        {/* Empty state fallback */}
        {filteredItems.length === 0 && (
          <div className="text-center py-16 text-charcoal-400">
            <p className="text-base font-display">No photographs found in this category.</p>
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
