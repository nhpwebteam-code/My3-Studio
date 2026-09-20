import React from 'react';
import { studioConfig } from '../data/studioConfig';

export default function HomeStats() {
  return (
    <section className="border-y border-[#EAE4D9] bg-white/50 backdrop-blur-sm py-12 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-[#EAE4D9]">
          {studioConfig.stats.map((stat, idx) => (
            <div key={idx} className="pt-4 md:pt-0 px-4">
              <p className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-coral mb-1">
                {stat.value}
              </p>
              <p className="text-xs uppercase tracking-widest text-charcoal-600 font-bold">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
