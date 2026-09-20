import React from 'react';

export default function PageHeader({ title, subtitle, kicker }) {
  return (
    <div className="relative pt-28 pb-12 sm:pt-36 sm:pb-16 border-b border-gray-100 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {kicker && (
          <span className="font-script text-3xl sm:text-4xl text-coral block -mb-1 select-none">
            {kicker}
          </span>
        )}
        <h1 className="font-display font-black text-3xl sm:text-5xl md:text-6xl text-charcoal-900 tracking-tight mb-4">
          {title}
        </h1>
        {subtitle && (
          <p className="text-sm sm:text-base md:text-lg text-charcoal-500 max-w-2xl mx-auto leading-relaxed font-normal">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
