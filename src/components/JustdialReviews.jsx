import React, { useState, useEffect, useRef } from 'react';
import { Quote, ShieldCheck, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { testimonials } from '../data/testimonials';

/**
 * ReviewsSection — showcases real Mythri Studio reviews
 * with Justdial 4.9/5 rating badge, animated auto-scroll cards,
 * and individual review details.
 */
export default function JustdialReviews() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const intervalRef = useRef(null);

  const reviews = testimonials;

  // Auto-rotate reviews every 5 seconds
  useEffect(() => {
    if (isAutoPlaying) {
      intervalRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % reviews.length);
      }, 5000);
    }
    return () => clearInterval(intervalRef.current);
  }, [isAutoPlaying, reviews.length]);

  const goTo = (idx) => {
    setActiveIndex(idx);
    setIsAutoPlaying(false);
    // Resume auto-play after 10s of inactivity
    clearInterval(intervalRef.current);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goNext = () => goTo((activeIndex + 1) % reviews.length);
  const goPrev = () => goTo((activeIndex - 1 + reviews.length) % reviews.length);

  return (
    <section
      id="justdial-reviews"
      className="relative py-20 sm:py-28 bg-[#FAF7F2] overflow-hidden scroll-mt-24"
    >
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 right-0 w-[500px] h-[500px] bg-coral/[0.03] rounded-full blur-[100px]" />
        <div className="absolute -bottom-24 -left-16 w-96 h-96 bg-orange-50/50 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ─── Section Header ─── */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-14 gap-6">
          <div>
            <span className="font-script text-3xl sm:text-4xl text-coral block -mb-1 select-none">
              Client Love
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-charcoal-900 tracking-tight">
              What Our Families Say
            </h2>
          </div>

          {/* Justdial Rating Badge */}
          <div className="flex items-center gap-4 lg:gap-6">
            <div className="flex flex-col items-end">
              <div className="flex items-center gap-2">
                <span className="text-3xl sm:text-4xl font-black text-charcoal-900 font-display tracking-tight">
                  4.9
                </span>
                <div className="flex flex-col">
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                    Top Rated on Justdial
                  </span>
                  <span className="text-[11px] text-charcoal-500 font-medium mt-1">
                    15+ Verified Client Ratings
                  </span>
                </div>
              </div>
            </div>

            <a
              href="https://www.justdial.com/Nandyal/Mythri-Studio-Nandyal/9999P8514-8514-181022124920-M7R5_BZDET/reviews"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white border border-[#EAE4D9] shadow-sm text-xs font-bold text-charcoal-700 hover:border-coral/50 hover:text-coral transition-all hover:shadow-md"
            >
              <ShieldCheck size={14} className="text-green-500" />
              <span>100% Verified Reviews</span>
              <ExternalLink size={11} className="opacity-50" />
            </a>
          </div>
        </div>

        {/* ─── Rating Trend Bar ─── */}
        <div className="mb-12 bg-white rounded-2xl border border-[#EAE4D9] shadow-sm p-5 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-charcoal-700">
              Recent Rating Trend
            </h4>
            <span className="text-[11px] font-semibold text-coral bg-coral-50 px-3 py-1 rounded-full">
              Consistently Top Rated
            </span>
          </div>
          <div className="flex items-end gap-1.5 sm:gap-2 h-16">
            {[1.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0].map((rating, i) => (
              <div
                key={i}
                className="group relative flex-1 flex flex-col items-center"
              >
                <div
                  className={`w-full rounded-t-lg transition-all duration-300 group-hover:opacity-100 ${
                    rating >= 4
                      ? 'bg-gradient-to-t from-coral to-orange-400'
                      : 'bg-charcoal-200'
                  }`}
                  style={{ height: `${(rating / 5) * 100}%`, minHeight: '4px' }}
                />
                {/* Tooltip on hover */}
                <div className="absolute -top-7 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-charcoal-900 text-white text-[10px] font-bold px-2 py-0.5 rounded whitespace-nowrap pointer-events-none">
                  {rating}/5
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between mt-2">
            <span className="text-[10px] text-charcoal-400">Oldest</span>
            <span className="text-[10px] text-charcoal-400">Most Recent</span>
          </div>
        </div>

        {/* ─── Reviews Cards ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Featured Review (Large) */}
          <div className="lg:col-span-7">
            <div
              className="relative bg-white rounded-3xl p-8 sm:p-10 border border-[#EAE4D9] shadow-sm hover:shadow-xl transition-all duration-500 min-h-[320px] flex flex-col justify-between overflow-hidden group"
              key={activeIndex}
            >
              {/* Decorative Quote */}
              <Quote
                size={80}
                className="absolute -top-2 -right-2 text-coral/[0.06] group-hover:text-coral/10 transition-colors pointer-events-none"
              />

              <div className="relative">
                {/* Verified Badge */}
                <div className="flex items-center gap-2 mb-6">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
                    <ShieldCheck size={13} />
                    Verified Review
                  </span>
                </div>

                {/* Quote */}
                <blockquote
                  className="text-lg sm:text-xl md:text-2xl text-charcoal-800 font-serif italic leading-relaxed mb-8"
                  style={{
                    animation: 'reviewFadeIn 0.5s ease-out',
                  }}
                >
                  "{reviews[activeIndex].quote}"
                </blockquote>
              </div>

              {/* Author */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <img
                    src={reviews[activeIndex].avatar}
                    alt={reviews[activeIndex].author}
                    className="w-12 h-12 rounded-full object-cover border-2 border-coral/30 shadow-sm"
                  />
                  <div>
                    <h4 className="font-display text-sm font-bold text-charcoal-900">
                      {reviews[activeIndex].author}
                    </h4>
                    <p className="text-xs text-charcoal-500 font-medium">
                      {reviews[activeIndex].context}
                    </p>
                  </div>
                </div>

                {/* Navigation Arrows */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={goPrev}
                    className="w-10 h-10 rounded-full border border-[#EAE4D9] hover:border-coral hover:text-coral text-charcoal-500 flex items-center justify-center transition-all active:scale-90"
                    aria-label="Previous review"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    onClick={goNext}
                    className="w-10 h-10 rounded-full border border-[#EAE4D9] hover:border-coral hover:text-coral text-charcoal-500 flex items-center justify-center transition-all active:scale-90"
                    aria-label="Next review"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>

              {/* Dots */}
              <div className="flex items-center justify-center gap-2 mt-6">
                {reviews.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === activeIndex
                        ? 'w-8 bg-coral'
                        : 'w-1.5 bg-charcoal-200 hover:bg-charcoal-300'
                    }`}
                    aria-label={`Go to review ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Side Review Cards (Small Stack) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {reviews.map((review, i) => (
              <button
                key={review.id}
                onClick={() => goTo(i)}
                className={`text-left p-5 rounded-2xl border transition-all duration-300 group/card ${
                  i === activeIndex
                    ? 'bg-coral-50/50 border-coral/40 shadow-md ring-1 ring-coral/10'
                    : 'bg-white border-[#EAE4D9] hover:border-coral/30 shadow-sm hover:shadow-md'
                }`}
              >
                <div className="flex items-start gap-3">
                  <img
                    src={review.avatar}
                    alt={review.author}
                    className={`w-10 h-10 rounded-full object-cover border-2 shrink-0 ${
                      i === activeIndex ? 'border-coral' : 'border-gray-200'
                    }`}
                  />
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4
                        className={`text-sm font-bold truncate ${
                          i === activeIndex
                            ? 'text-coral'
                            : 'text-charcoal-900 group-hover/card:text-coral'
                        }`}
                      >
                        {review.author}
                      </h4>
                      <div className="flex items-center gap-1 shrink-0">
                        <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded">{review.rating}.0</span>
                      </div>
                    </div>
                    <p className="text-xs text-charcoal-500 font-medium mb-1.5">
                      {review.context}
                    </p>
                    <p className="text-xs text-charcoal-600 line-clamp-2 leading-relaxed">
                      "{review.quote}"
                    </p>
                  </div>
                </div>
              </button>
            ))}

            {/* View All Reviews */}
            <a
              href="https://www.justdial.com/Nandyal/Mythri-Studio-Nandyal/9999P8514-8514-181022124920-M7R5_BZDET/reviews"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-3.5 rounded-2xl border border-dashed border-[#EAE4D9] hover:border-coral/40 text-charcoal-500 hover:text-coral transition-all text-xs font-bold uppercase tracking-wider"
            >
              <span>Read All 15 Verified Client Reviews</span>
              <ExternalLink size={12} />
            </a>
          </div>
        </div>
      </div>

      {/* Animation keyframe injected inline */}
      <style>{`
        @keyframes reviewFadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
