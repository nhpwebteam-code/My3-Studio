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
      desc: "Delivered in 30-sheet or 60-sheet formats with lay-flat binding, custom calendars, and display frames.",
    },
    {
      icon: Film,
      title: "Full 4K Video & Drone Visuals",
      desc: "Complete ceremony editing, cinematic teasers, live LED wall support, and aerial 4K drone cinematography.",
    },
    {
      icon: HeartHandshake,
      title: "Transparent Client Packages",
      desc: "Clear upfront pricing with no hidden charges, plus flexible add-ons tailored to your celebration schedule.",
    },
  ];

  return (
    <section id="about" className="w-full bg-gradient-to-br from-[#14161C] via-[#0D0E12] to-[#07080A] text-white py-20 sm:py-28 px-4 sm:px-6 lg:px-12 scroll-mt-24 shadow-inner">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column (5 cols): Framed & Taped Photo Card */}
          <div className="lg:col-span-5 relative flex flex-col items-center justify-center">
            {/* Taped Matting Card */}
            <div className="relative w-full max-w-[370px] sm:max-w-[410px] mx-auto bg-[#14161C] p-3.5 sm:p-4 rounded-sm shadow-[0_25px_50px_rgba(0,0,0,0.5)] -rotate-1 hover:rotate-0 transition-transform duration-500 group border border-white/10">
              
              {/* Top Washi Tape Element */}
              <div className="w-24 h-6 bg-[#E59A3D]/60 shadow-sm mx-auto -mt-6 mb-3 rounded-xs transform -rotate-1 pointer-events-none" />

              {/* Photo Area */}
              <div className="relative overflow-hidden bg-charcoal-100 aspect-[4/5]">
                <img
                  src="/photographer-bw.png"
                  alt="MY3 Studio Lead Photographer"
                  className="w-full h-full object-cover object-top filter contrast-105 group-hover:scale-103 transition-transform duration-700 ease-out"
                />
              </div>

              {/* Bottom Matting Caption */}
              <div className="pt-3 pb-1 text-center">
                <span className="font-script text-2xl text-[#E59A3D] block -mb-1 select-none">
                  hi, we're my3 studio
                </span>
                <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-gray-400">
                  Est. 2018 • Professional Visual Storytellers
                </span>
              </div>
            </div>

            {/* Subtle Floating Experience Badge */}
            <div className="absolute -bottom-4 right-2 sm:-bottom-4 sm:right-6 bg-[#0D0E12]/90 backdrop-blur-md text-white rounded-2xl p-4 shadow-2xl border border-white/10 flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#E59A3D] text-black flex items-center justify-center font-display font-black text-xl shadow-md">
                8+
              </div>
              <div>
                <span className="block font-black text-sm text-white leading-tight">
                  Years of Craft
                </span>
                <span className="text-xs text-gray-400">
                  500+ Celebrations Captured
                </span>
              </div>
            </div>
          </div>

          {/* Right Column (7 cols): Editorial Narrative & Feature Highlights */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <span className="font-script text-3xl sm:text-4xl text-[#E59A3D] block -mb-2 select-none">
                Behind the Lens
              </span>
              <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-white leading-tight tracking-tight">
                Authentic Emotion, Natural Light & Meaningful Memories
              </h2>
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-normal pt-2">
                We believe great photography isn't about stiff poses or artificial expressions. It's about capturing how your celebration actually felt — the laughter during haldi, the happy tears during the vows, and the joyous dance floor energy with your closest friends.
              </p>
              <p className="text-sm sm:text-base text-gray-400 leading-relaxed font-normal">
                With over 8 years of dedicated experience covering multi-day weddings, milestone birthdays, and family celebrations across India, our team combines traditional ritual coverage with modern candid moments and cinematic 4K drone visuals.
              </p>
            </div>

            {/* Feature Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {highlights.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 flex items-start gap-3.5 hover:bg-white/10 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#E59A3D]/20 text-[#E59A3D] flex items-center justify-center shrink-0 mt-0.5 border border-[#E59A3D]/30">
                      <Icon size={18} />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-white mb-1">
                        {item.title}
                      </h4>
                      <p className="text-xs text-gray-400 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Minimalist Editorial Buttons */}
            <div className="pt-3 flex flex-wrap items-center gap-4">
              <Link
                to="/about"
                className="px-8 py-3.5 border border-white/20 hover:border-[#E59A3D] text-white hover:bg-[#E59A3D] hover:text-black tracking-[0.2em] uppercase text-xs font-bold transition-all duration-300 shadow-sm"
              >
                Learn More About Us
              </Link>

              <Link
                to="/pricing"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#E59A3D] hover:bg-[#d08a2f] text-black tracking-[0.2em] uppercase text-xs font-bold transition-all duration-300 shadow-xl shadow-black/20"
              >
                <span>View Official Packages</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
