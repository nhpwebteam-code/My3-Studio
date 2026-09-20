import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Camera, Film, Award, HeartHandshake } from 'lucide-react';

export default function AboutSection() {
  const highlights = [
    {
      icon: Camera,
      title: "Authentic & Candid Coverage",
      desc: "No stiff poses or artificial expressions. We capture spontaneous laughter, rituals, and emotions naturally.",
    },
    {
      icon: Award,
      title: "Lay-Flat Archival Albums",
      desc: "Delivered in 30-sheet or 60-sheet formats with lay-flat binding, custom calendars, and large display frames.",
    },
    {
      icon: Film,
      title: "Full 4K Video & Drone Visuals",
      desc: "Complete ceremony editing, cinematic teasers, live LED wall support, and aerial 4K drone cinematography.",
    },
    {
      icon: HeartHandshake,
      title: "Transparent Client Packages",
      desc: "Clear upfront pricing with no hidden charges, plus flexible add-ons tailored to your event schedule.",
    },
  ];

  return (
    <section id="about" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-28">
      {/* Header aligned with other sections */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4 border-b border-gray-100 pb-6">
        <div>
          <span className="font-script text-3xl sm:text-4xl text-coral block -mb-1 select-none">
            About Us
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-charcoal-900 tracking-tight">
            Meet MY3 Photography Studio
          </h2>
        </div>
        <p className="text-sm text-charcoal-500 max-w-md font-medium">
          Over 8 years of dedicated wedding, birthday, and celebration visual storytelling with a team of seasoned photographers and cinematographers.
        </p>
      </div>

      {/* 2-Column Aligned Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Column (5 cols): Photographer Visual Feature (Backgroundless Cutout) */}
        <div className="lg:col-span-5 relative flex flex-col items-center justify-center">
          <div className="relative w-full max-w-[380px] sm:max-w-[420px] mx-auto flex flex-col items-center">
            <img
              src="/photographer-bw.png"
              alt="MY3 Studio Lead Photographer"
              className="w-full h-auto object-contain filter contrast-105 drop-shadow-[0_20px_35px_rgba(0,0,0,0.2)]"
            />

            {/* Bottom Caption Overlay */}
            <div className="w-full mt-3 p-4 rounded-2xl bg-white border border-gray-200 shadow-lg">
              <span className="text-[11px] font-mono font-bold text-coral uppercase tracking-widest block mb-0.5">
                Lead Visual Director
              </span>
              <h4 className="font-display text-lg font-bold text-charcoal-900">
                MY3 Studio & Associate Team
              </h4>
              <p className="text-xs text-charcoal-500 mt-0.5">
                Bengaluru • Available for Worldwide Destinations
              </p>
            </div>
          </div>

          {/* Floating Experience Badge */}
          <div className="absolute -bottom-4 right-2 sm:-bottom-4 sm:right-4 bg-white rounded-2xl p-4 shadow-xl border border-gray-100 flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-coral text-white flex items-center justify-center font-display font-black text-xl shadow-md">
              8+
            </div>
            <div>
              <span className="block font-black text-sm text-charcoal-900 leading-tight">
                Years of Craft
              </span>
              <span className="text-xs text-charcoal-500">
                500+ Celebrations Captured
              </span>
            </div>
          </div>
        </div>

        {/* Right Column (7 cols): Studio Story & Highlights */}
        <div className="lg:col-span-7 space-y-8">
          <div className="space-y-4">
            <h3 className="font-display text-2xl sm:text-3xl font-black text-charcoal-900 leading-snug">
              Preserving Your Celebrations with Natural Energy and Modern Elegance
            </h3>
            <p className="text-sm sm:text-base text-charcoal-600 leading-relaxed font-normal">
              We started our studio with a simple focus: capturing real moments rather than stiff poses. Whether you are hosting a traditional 2-day wedding, an intimate milestone birthday, or a grand reception, our crew blends into your festivities to document the genuine smiles, spontaneous laughter, and heartwarming rituals.
            </p>
            <p className="text-sm sm:text-base text-charcoal-600 leading-relaxed font-normal">
              Every package is built around delivering complete peace of mind — including professional equipment, backup cameras, high-speed 64 GB pen drives, lay-flat albums, and prompt delivery.
            </p>
          </div>

          {/* Feature Grid with Impeccable Alignment */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {highlights.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="p-4 rounded-2xl bg-gray-50/80 border border-gray-200 flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-coral-50 text-coral flex items-center justify-center shrink-0 mt-0.5">
                    <Icon size={18} />
                  </div>
                  <div>
                    <h5 className="font-bold text-sm text-charcoal-900 mb-1">
                      {item.title}
                    </h5>
                    <p className="text-xs text-charcoal-500 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Action Row */}
          <div className="pt-2 flex flex-wrap items-center gap-4">
            <a
              href="#pricing"
              className="px-7 py-3 rounded-full bg-coral hover:bg-coral-dark text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-coral/30"
            >
              View Official Packages
            </a>
            <Link
              to="/about"
              className="inline-flex items-center gap-1.5 px-6 py-3 rounded-full border border-gray-300 hover:border-coral text-charcoal-800 hover:text-coral font-bold text-xs uppercase tracking-wider transition-all group"
            >
              <span>Full Studio Story</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
