import React from 'react';
import { Star, Quote } from 'lucide-react';

export default function TestimonialCard({ testimonial }) {
  return (
    <div className="glass-card rounded-2xl p-6 sm:p-8 flex flex-col justify-between hover:border-gold/30 transition-all duration-300 relative group">
      {/* Decorative Quote Icon */}
      <Quote
        size={36}
        className="absolute top-6 right-6 text-studio-800 group-hover:text-gold/20 transition-colors pointer-events-none"
      />

      <div>
        {/* Star Rating */}
        <div className="flex items-center gap-1 text-gold mb-5">
          {[...Array(testimonial.rating)].map((_, i) => (
            <Star key={i} size={15} fill="#C9A96E" strokeWidth={0} />
          ))}
        </div>

        {/* Quote text */}
        <blockquote className="text-sm sm:text-base text-studio-200 font-light leading-relaxed mb-6 italic">
          "{testimonial.quote}"
        </blockquote>
      </div>

      {/* Author details */}
      <div className="flex items-center gap-3.5 pt-4 border-t border-studio-800/60">
        <img
          src={testimonial.avatar}
          alt={testimonial.author}
          className="w-11 h-11 rounded-full object-cover border border-gold/40"
        />
        <div>
          <h4 className="font-serif text-sm font-semibold text-studio-50">
            {testimonial.author}
          </h4>
          <p className="text-xs text-studio-400">
            {testimonial.context}
          </p>
        </div>
      </div>
    </div>
  );
}
