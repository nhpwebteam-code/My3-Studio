import React from 'react';

export default function PageHeader({ title, subtitle, kicker }) {
  return (
    <div className="relative pt-28 pb-12 sm:pt-36 sm:pb-16 border-b border-white/10 bg-transparent">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {kicker && (
          <span className="font-script text-3xl sm:text-4xl text-[#E59A3D] block -mb-1 select-none">
            {kicker}
          </span>
        )}
        <h1 className="font-display font-black text-3xl sm:text-5xl md:text-6xl text-white tracking-tight mb-4">
          {title}
        </h1>
        {subtitle && (
          <p className="text-sm sm:text-base md:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed font-normal">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
