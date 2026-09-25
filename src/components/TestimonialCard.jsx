import React from 'react';
import { Quote, CheckCircle2 } from 'lucide-react';

export default function TestimonialCard({ testimonial }) {
  return (
    <div className="bg-[#14161C] rounded-3xl p-6 sm:p-8 flex flex-col justify-between border border-white/10 hover:border-[#E59A3D]/40 transition-all duration-300 relative group shadow-sm hover:shadow-xl hover:shadow-black/50">
      {/* Decorative Quote Icon */}
      <Quote
        size={36}
        className="absolute top-6 right-6 text-white/5 group-hover:text-[#E59A3D]/20 transition-colors pointer-events-none"
      />

      <div>
        {/* Verified Badge */}
        <div className="flex items-center justify-between mb-5">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-gray-300 bg-white/5 border border-white/10 px-3 py-1 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            Verified Client
          </span>
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#E59A3D] bg-[#E59A3D]/10 border border-[#E59A3D]/20 px-2.5 py-0.5 rounded-full">
            <CheckCircle2 size={12} />
            <span>Verified Patron</span>
          </span>
        </div>

        {/* Quote text */}
        <blockquote className="text-sm sm:text-base text-gray-300 font-normal leading-relaxed mb-6 italic">
          "{testimonial.quote}"
        </blockquote>
      </div>

      {/* Author details */}
      <div className="flex items-center gap-3.5 pt-4 border-t border-white/10">
        <img
          src={testimonial.avatar}
          alt={testimonial.author}
          className="w-11 h-11 rounded-full object-cover border-2 border-[#E59A3D]/40"
        />
        <div>
          <h4 className="font-display text-sm font-bold text-white">
            {testimonial.author}
          </h4>
          <p className="text-xs text-gray-400 font-medium">
            {testimonial.context}
          </p>
        </div>
      </div>
    </div>
  );
}
