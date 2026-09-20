import React, { useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, Camera, MapPin } from 'lucide-react';

export default function LightboxModal({ item, items, onClose, onNavigate }) {
  const currentIndex = items.findIndex((i) => i.id === item.id);

  const handlePrevious = useCallback(() => {
    const prevIndex = (currentIndex - 1 + items.length) % items.length;
    onNavigate(items[prevIndex]);
  }, [currentIndex, items, onNavigate]);

  const handleNext = useCallback(() => {
    const nextIndex = (currentIndex + 1) % items.length;
    onNavigate(items[nextIndex]);
  }, [currentIndex, items, onNavigate]);

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrevious();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlePrevious, handleNext, onClose]);

  // Prevent background scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-2xl p-4 sm:p-6 md:p-8 animate-fade-in"
      onClick={onClose}
    >
      {/* Top Close and Counter bar */}
      <div className="absolute top-4 inset-x-4 sm:inset-x-8 flex items-center justify-between z-20">
        <span className="text-xs uppercase tracking-widest text-gray-400 font-mono">
          {currentIndex + 1} / {items.length}
        </span>
        <button
          onClick={onClose}
          className="p-2 rounded-full bg-[#181818] border border-gray-700 text-gray-300 hover:text-coral hover:border-coral transition-colors"
          aria-label="Close Lightbox"
        >
          <X size={20} />
        </button>
      </div>

      {/* Navigation arrows */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          handlePrevious();
        }}
        className="absolute left-3 sm:left-6 p-3 rounded-full bg-[#181818]/90 border border-gray-800 text-gray-300 hover:text-coral hover:border-coral/50 transition-colors z-20"
        aria-label="Previous Image"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          handleNext();
        }}
        className="absolute right-3 sm:right-6 p-3 rounded-full bg-[#181818]/90 border border-gray-800 text-gray-300 hover:text-coral hover:border-coral/50 transition-colors z-20"
        aria-label="Next Image"
      >
        <ChevronRight size={24} />
      </button>

      {/* Modal Main Content Container */}
      <div
        className="relative max-w-5xl max-h-[85vh] w-full flex flex-col items-center z-10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image */}
        <div className="relative overflow-hidden rounded-2xl shadow-2xl max-h-[68vh] flex items-center justify-center">
          <img
            src={item.image}
            alt={item.title}
            className="max-h-[68vh] max-w-full object-contain rounded-2xl border border-gray-800"
          />
        </div>

        {/* Details Caption Bar */}
        <div className="w-full mt-4 text-center sm:text-left bg-[#141414] border border-gray-800 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 shadow-2xl">
          <div>
            <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
              <span className="text-xs uppercase tracking-wider font-semibold text-coral">
                {item.categoryLabel}
              </span>
              <span className="text-gray-600">•</span>
              <span className="text-xs text-gray-400 font-mono">{item.client}</span>
            </div>
            <h2 className="font-display font-bold text-xl sm:text-2xl text-white">{item.title}</h2>
            {item.description && (
              <p className="text-xs sm:text-sm text-gray-400 mt-1 max-w-xl">{item.description}</p>
            )}
          </div>

          {/* Technical Specs */}
          <div className="flex flex-wrap sm:flex-col gap-2 text-xs text-gray-400 sm:text-right border-t sm:border-t-0 border-gray-800 pt-2 sm:pt-0">
            {item.camera && (
              <div className="flex items-center sm:justify-end gap-1.5">
                <Camera size={13} className="text-coral" />
                <span>{item.camera}</span>
              </div>
            )}
            {item.location && (
              <div className="flex items-center sm:justify-end gap-1.5">
                <MapPin size={13} className="text-coral" />
                <span>{item.location}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
