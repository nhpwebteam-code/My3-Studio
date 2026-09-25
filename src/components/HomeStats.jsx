import React from 'react';
import { studioConfig } from '../data/studioConfig';

export default function HomeStats() {
  return (
    <section className="border-y border-white/10 bg-[#07080A] py-12 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-white/10">
          {studioConfig.stats.map((stat, idx) => (
            <div key={idx} className="pt-4 md:pt-0 px-4">
              <p className="font-sans text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#E59A3D] mb-1 tracking-tight">
                {stat.value}
              </p>
              <p className="text-xs uppercase tracking-widest text-gray-400 font-bold">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
