import React, { useState } from 'react';
import { X, Play, Star, ShieldCheck } from 'lucide-react';

export default function VideoReviewModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  if (!isOpen) return null;

  const reviewVideos = [
    {
      id: 1,
      title: "Udaipur Royal Wedding Documentation",
      client: "Ananya & Siddharth",
      role: "Bride & Groom",
      videoPoster: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
      rating: 5.0,
      duration: "2:45 min",
      quote: "MY3 Studio captured the very soul of our wedding day. Looking through our frames brings back every tear of joy and laughter.",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    },
    {
      id: 2,
      title: "Paris Couture Week Editorial",
      client: "Vikramaditya Mehta",
      role: "Creative Director, VIRAAT",
      videoPoster: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=80",
      rating: 5.0,
      duration: "3:10 min",
      quote: "His mastery over natural light and razor-sharp timing in high-pressure runway settings is unmatched. The cover photos won international accolades.",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    },
  ];

  const current = reviewVideos[activeTab];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-fade-in">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-charcoal-950/70 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative bg-white w-full max-w-3xl rounded-3xl shadow-2xl border border-gray-100 overflow-hidden z-10 flex flex-col">
        {/* Header */}
        <div className="bg-charcoal px-6 py-4 text-white flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ShieldCheck size={18} className="text-coral" />
            <span className="font-bold text-sm tracking-wide uppercase">Verified Client Video Reviews</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Video Player Box */}
        <div className="relative aspect-video bg-black w-full overflow-hidden group">
          {isPlaying ? (
            <video
              src={current.videoUrl}
              autoPlay
              controls
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="relative w-full h-full">
              <img
                src={current.videoPoster}
                alt={current.title}
                className="w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/80 via-black/30 to-transparent flex items-center justify-center">
                <button
                  onClick={() => setIsPlaying(true)}
                  className="w-20 h-20 rounded-full bg-coral/95 hover:bg-coral text-white flex items-center justify-center pl-1 shadow-2xl hover:scale-110 active:scale-95 transition-all"
                  aria-label="Play client review video"
                >
                  <Play size={32} fill="white" />
                </button>
              </div>

              <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between text-white pointer-events-none">
                <div>
                  <span className="text-xs uppercase tracking-widest text-coral font-bold block mb-1">
                    Client Retrospective
                  </span>
                  <h4 className="text-lg sm:text-xl font-bold font-display">
                    {current.title}
                  </h4>
                </div>
                <span className="text-xs font-mono bg-black/60 px-2.5 py-1 rounded-md backdrop-blur-sm">
                  {current.duration}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Details & Reviews Switcher */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-100">
            <div>
              <div className="flex items-center space-x-1 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className="fill-amber-400 text-amber-400" />
                ))}
                <span className="font-bold text-sm text-charcoal-900 ml-2">5.0 / 5.0 Rating</span>
              </div>
              <p className="font-bold text-base text-charcoal">{current.client}</p>
              <p className="text-xs text-charcoal-500">{current.role}</p>
            </div>

            <div className="flex items-center space-x-2">
              {reviewVideos.map((vid, idx) => (
                <button
                  key={vid.id}
                  onClick={() => {
                    setActiveTab(idx);
                    setIsPlaying(false);
                  }}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                    activeTab === idx
                      ? 'bg-coral text-white shadow-sm'
                      : 'bg-gray-100 text-charcoal-600 hover:bg-gray-200'
                  }`}
                >
                  Story #{idx + 1}
                </button>
              ))}
            </div>
          </div>

          {/* Testimonial Quote */}
          <blockquote className="text-sm sm:text-base text-charcoal-700 italic leading-relaxed border-l-2 border-coral pl-4">
            "{current.quote}"
          </blockquote>

          {/* Customer Reviews Summary Metrics */}
          <div className="grid grid-cols-3 gap-3 text-center bg-gray-50 p-4 rounded-2xl">
            <div>
              <span className="block font-black text-lg text-charcoal font-display">20,000+</span>
              <span className="text-[11px] text-charcoal-500 font-medium">Worldwide Shoots</span>
            </div>
            <div>
              <span className="block font-black text-lg text-coral font-display">4.9 / 5</span>
              <span className="text-[11px] text-charcoal-500 font-medium">Verified Reviews</span>
            </div>
            <div>
              <span className="block font-black text-lg text-charcoal font-display">99.4%</span>
              <span className="text-[11px] text-charcoal-500 font-medium">Referral Rate</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
