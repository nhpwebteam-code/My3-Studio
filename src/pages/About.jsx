import React from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import HomeStats from '../components/HomeStats';
import AboutProcess from '../components/AboutProcess';
import { teamMembers } from '../data/team';
import { studioConfig } from '../data/studioConfig';

export default function About() {
  return (
    <div className="pb-24 space-y-20 bg-[#FAF7F2] text-charcoal min-h-screen">
      <PageHeader
        kicker="Behind The Lens"
        title="About MY3 Studio"
        subtitle="Dedicated to authentic wedding stories, vibrant birthday celebrations, and timeless portraits."
      />

      {/* Studio Figures & Trust Counter */}
      <HomeStats />

      {/* Origin Story & Vision (Warm Earthy Editorial Card) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#6E6054] via-[#65574B] to-[#57493E] text-[#FAF7F2] p-8 sm:p-14 lg:p-16 rounded-3xl shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left: Taped Matting Card */}
            <div className="lg:col-span-5 relative flex flex-col items-center justify-center">
              <div className="relative w-full max-w-[360px] sm:max-w-[390px] bg-white p-3.5 sm:p-4 rounded-sm shadow-[0_25px_50px_rgba(0,0,0,0.4)] -rotate-1 hover:rotate-0 transition-transform duration-500 group">
                {/* Washi Tape */}
                <div className="w-24 h-6 bg-[#d9c9b4]/85 shadow-sm mx-auto -mt-6 mb-3 rounded-xs transform -rotate-1 pointer-events-none" />

                <div className="relative overflow-hidden bg-charcoal-100 aspect-[4/5]">
                  <img
                    src="/photographer-bw.png"
                    alt="MY3 Studio Lead Photographer"
                    className="w-full h-full object-cover object-top filter contrast-105 group-hover:scale-103 transition-transform duration-700"
                  />
                </div>

                <div className="pt-3 pb-1 text-center">
                  <span className="font-script text-2xl text-coral block -mb-1 select-none">
                    hi, we're my3 studio
                  </span>
                  <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-charcoal-600">
                    EST. {studioConfig.establishedYear} • PROFESSIONAL EVENT COVERAGE
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Editorial Narrative */}
            <div className="lg:col-span-7 space-y-6 text-[#E7DFD5] font-normal leading-relaxed text-sm sm:text-base">
              <span className="font-script text-3xl sm:text-4xl text-[#E8A578] block -mb-2 select-none">
                Our Story
              </span>
              <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-[#FAF7F2] leading-tight tracking-tight">
                Real Smiles, Genuine Emotions & True Colors
              </h2>
              <p>
                We believe great photography isn't about stiff poses or artificial filters. It's about capturing how your celebration actually felt — the laughter during haldi, the happy tears during the vows, and the joyous dance floor energy with your closest friends.
              </p>
              <p>
                With over 8 years of experience covering multi-day weddings, birthday milestones, and family gatherings, our team combines traditional rituals coverage with modern candid moments and cinematic drone visuals.
              </p>
              <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-md border-l-4 border-coral text-[#FAF7F2] text-sm font-semibold shadow-inner">
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

      {/* The Team / Artists */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="font-script text-3xl text-coral block -mb-1 select-none">
            Our Crew
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-charcoal-900 tracking-tight">
            Meet the Team
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamMembers.map((member, idx) => (
            <div
              key={idx}
              className="rounded-3xl bg-white border border-[#EAE4D9] overflow-hidden group hover:border-coral/40 hover:shadow-xl transition-all duration-300 flex flex-col shadow-sm"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/80 via-transparent to-transparent" />
              </div>
              <div className="p-6 flex-grow flex flex-col justify-between">
                <div>
                  <p className="text-[11px] font-mono text-coral uppercase tracking-wider font-bold mb-1">
                    {member.role}
                  </p>
                  <h3 className="font-display font-bold text-xl text-charcoal-900 mb-2">
                    {member.name}
                  </h3>
                  <p className="text-xs text-charcoal-600 leading-relaxed font-normal mb-4">
                    {member.bio}
                  </p>
                </div>
                <div className="pt-3 border-t border-gray-100 text-[11px] text-charcoal-500">
                  <span className="font-bold text-charcoal-700">Specialty:</span> {member.specialty}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-[#EAE4D9] rounded-3xl p-8 sm:p-12 text-center shadow-sm">
          <h3 className="font-display font-black text-2xl sm:text-3xl text-charcoal-900 mb-3">
            Ready to Plan Your Celebration?
          </h3>
          <p className="text-sm text-charcoal-600 max-w-xl mx-auto mb-6 font-normal">
            Review our official event packages or get in touch directly with our team to reserve your date.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/pricing"
              className="px-8 py-3.5 rounded-full bg-coral hover:bg-coral-dark text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-coral/30"
            >
              Explore Packages & Pricing
            </Link>
            <Link
              to="/contact"
              className="px-8 py-3.5 rounded-full bg-white hover:bg-gray-50 text-charcoal-800 border border-gray-300 hover:border-coral font-bold text-xs uppercase tracking-wider transition-all"
            >
              Contact Atelier
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
