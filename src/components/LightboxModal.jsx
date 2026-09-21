import React, { useEffect, useCallback } from 'react';
import { X } from 'lucide-react';

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

      {/* Modal Main Content Container */}
      <div
        className="relative max-w-6xl max-h-[88vh] w-full flex items-center justify-center z-10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image */}
        <div className="relative overflow-hidden rounded-2xl shadow-2xl max-h-[88vh] flex items-center justify-center">
          <img
            src={item.image}
            alt={item.title || 'Gallery image'}
            className="max-h-[88vh] max-w-full object-contain rounded-2xl border border-gray-800 shadow-2xl"
          />
        </div>
      </div>
    </div>
  );
}
