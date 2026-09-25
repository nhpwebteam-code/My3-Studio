import React from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import HomeStats from '../components/HomeStats';
import AboutProcess from '../components/AboutProcess';
import { studioConfig } from '../data/studioConfig';

export default function About() {
  return (
    <div className="pb-24 space-y-20 bg-[#000000] text-white min-h-screen">
      <PageHeader
        kicker="Behind The Lens"
        title="About MY3 Studios"
        subtitle="Dedicated to authentic wedding stories, vibrant birthday celebrations, and timeless portraits."
      />

      {/* Studio Figures & Trust Counter */}
      <HomeStats />

      {/* Origin Story & Vision (Dark Cinematic Card) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#14161C] via-[#1A1C24] to-[#0D0E12] text-white p-8 sm:p-14 lg:p-16 rounded-3xl shadow-2xl border border-white/10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left: Taped Matting Card */}
            <div className="lg:col-span-5 relative flex flex-col items-center justify-center">
              <div className="relative w-full max-w-[360px] sm:max-w-[390px] bg-[#14161C] p-3.5 sm:p-4 rounded-sm shadow-[0_25px_50px_rgba(0,0,0,0.6)] -rotate-1 hover:rotate-0 transition-transform duration-500 group border border-white/10">
                {/* Washi Tape */}
                <div className="w-24 h-6 bg-[#E59A3D]/60 shadow-sm mx-auto -mt-6 mb-3 rounded-xs transform -rotate-1 pointer-events-none" />

                <div className="relative overflow-hidden bg-charcoal-100 aspect-[4/5]">
                  <img
                    src="/photographer-bw.png"
                    alt="MY3 Studios Lead Photographer"
                    className="w-full h-full object-cover object-top filter contrast-105 group-hover:scale-103 transition-transform duration-700"
                  />
                </div>

                <div className="pt-3 pb-1 text-center flex flex-col items-center">
                  <img
                    src="/logo.png"
                    alt="MY3 Studios Official Seal"
                    className="w-10 h-10 object-contain mb-1 drop-shadow-sm"
                  />
                  <span className="font-script text-2xl text-[#E59A3D] block -mb-1 select-none">
                    hi, we're my3 studios
                  </span>
                  <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-gray-400">
                    EST. {studioConfig.establishedYear} • PROFESSIONAL EVENT COVERAGE
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Editorial Narrative */}
            <div className="lg:col-span-7 space-y-6 text-gray-300 font-normal leading-relaxed text-sm sm:text-base">
              <span className="font-script text-3xl sm:text-4xl text-[#E59A3D] block -mb-2 select-none">
                Our Story
              </span>
              <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-white leading-tight tracking-tight">
                Real Smiles, Genuine Emotions & True Colors
              </h2>
              <p>
                We believe great photography isn't about stiff poses or artificial filters. It's about capturing how your celebration actually felt — the laughter during haldi, the happy tears during the vows, and the joyous dance floor energy with your closest friends.
              </p>
              <p>
                With over 8 years of experience covering multi-day weddings, birthday milestones, and family gatherings, our team combines traditional rituals coverage with modern candid moments and cinematic drone visuals.
              </p>
              <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-md border-l-4 border-[#E59A3D] text-white text-sm font-semibold shadow-inner">
                "We take care of every detail — from photography and videography to custom printed albums and frames you'll cherish for a lifetime."
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* The 4-step Process */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AboutProcess />
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#14161C] border border-white/10 rounded-3xl p-8 sm:p-12 text-center shadow-sm">
          <h3 className="font-display font-black text-2xl sm:text-3xl text-white mb-3">
            Ready to Plan Your Celebration?
          </h3>
          <p className="text-sm text-gray-400 max-w-xl mx-auto mb-6 font-normal">
            Review our official event packages or get in touch directly with our team to reserve your date.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/pricing"
              className="px-8 py-3.5 rounded-full bg-[#E59A3D] hover:bg-[#d08a2f] text-black font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-[#E59A3D]/30"
            >
              Explore Packages & Pricing
            </Link>
            <Link
              to="/contact"
              className="px-8 py-3.5 rounded-full bg-white/5 hover:bg-white/10 text-white border border-white/20 hover:border-[#E59A3D] font-bold text-xs uppercase tracking-wider transition-all"
            >
              Contact Atelier
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
